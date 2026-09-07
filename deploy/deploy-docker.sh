#!/bin/bash
#
# Deploy script for remylobster.com to OVH VPS
# Private repo: rsync local working tree (no GitHub credentials on VPS required)
#

set -euo pipefail

# Configuration
REMOTE_USER="thindery"
REMOTE_HOST="ovh"  # Assumes SSH alias configured
REMOTE_DIR="remy-blog"
DEPLOY_TAG="${1:-}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $*${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARN: $*${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $*${NC}"
}

if [ -z "$DEPLOY_TAG" ]; then
    error "Usage: $0 <tag-or-branch-label>"
    error "Label is recorded for ops only; files are rsynced from the local tree."
    exit 1
fi

log "Starting deploy of remy-blog:$DEPLOY_TAG (rsync from $ROOT_DIR)"

if ! ssh -o ConnectTimeout=5 "$REMOTE_USER@$REMOTE_HOST" "echo 'SSH OK'" >/dev/null 2>&1; then
    error "Cannot connect to $REMOTE_HOST. Check SSH config."
    exit 1
fi

log "SSH connection confirmed"

# Ensure remote path exists; rsync source tree (exclude secrets, build artifacts, heavy deps)
ssh "$REMOTE_USER@$REMOTE_HOST" "mkdir -p \"\$HOME/apps/$REMOTE_DIR\""

log "Rsyncing source to remote..."
rsync -az --delete \
  --exclude '.git/' \
  --exclude 'node_modules/' \
  --exclude '.next/' \
  --exclude 'dist/' \
  --exclude '.env' \
  --exclude '.env.local' \
  --exclude '.env.production' \
  --exclude 'deploy/terraform/terraform.tfvars' \
  --exclude 'deploy/terraform/*.tfstate' \
  --exclude 'deploy/terraform/*.tfstate.*' \
  --exclude 'deploy/terraform/.terraform/' \
  --exclude 'deploy/terraform/terraform' \
  --exclude '.DS_Store' \
  --exclude '._*' \
  "$ROOT_DIR/" \
  "$REMOTE_USER@$REMOTE_HOST:apps/$REMOTE_DIR/"

log "Building and restarting containers on remote..."
ssh "$REMOTE_USER@$REMOTE_HOST" "
set -euo pipefail

REMOTE_FULL_PATH=\"\$HOME/apps/$REMOTE_DIR\"
cd \"\$REMOTE_FULL_PATH\"

echo '=== Deploying remy-blog ($DEPLOY_TAG) ==='
echo \"$(git -C "$ROOT_DIR" rev-parse --short HEAD 2>/dev/null || echo unknown)\" > .deploy-revision || true
echo '$DEPLOY_TAG' >> .deploy-revision || true

docker network create app-network 2>/dev/null || true

echo 'Stopping existing containers...'
# Unique project name remy-blog — never default "deploy" from working_dir.
# Do NOT use --remove-orphans (can sweep siblings sharing a project label).
# Tear down legacy project label "deploy" for THIS compose file only (pre-harden leftover).
docker compose -p deploy -f deploy/docker-compose.yml down 2>/dev/null || true
docker compose -p remy-blog -f deploy/docker-compose.yml down 2>/dev/null || true

echo 'Building and starting containers...'
cd deploy
docker compose -p remy-blog build --no-cache
docker compose -p remy-blog up -d

echo 'Waiting for health check...'
sleep 10

for i in {1..10}; do
    if docker ps --filter 'name=remy-blog' --filter 'health=healthy' --format '{{.Names}}' | grep -q remy-blog; then
        echo 'Container is healthy!'
        break
    fi
    echo 'Waiting for container to become healthy...'
    sleep 5
done

echo '=== Deploy Status ==='
docker ps --filter 'name=remy-blog' --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'

if docker ps --format '{{.Names}}\t{{.Ports}}' | grep -E 'remy-blog.*(0\.0\.0\.0|::):' >/dev/null 2>&1; then
  echo 'FAIL: remy-blog has host-published ports (should be expose-only on app-network)'
  exit 1
else
  echo 'OK: remy-blog is expose-only (no host port bind)'
fi

# Install ONLY remy-blog vhost if certs exist
if [ -f \"\$REMOTE_FULL_PATH/deploy/nginx/remy-blog.conf\" ]; then
  if [ -f /opt/nginx/ssl/remylobster-cert.pem ] && [ -f /opt/nginx/ssl/remylobster-key.pem ]; then
    cp \"\$REMOTE_FULL_PATH/deploy/nginx/remy-blog.conf\" /opt/nginx/conf.d/remy-blog.conf
    echo 'Installed /opt/nginx/conf.d/remy-blog.conf'
  else
    echo 'WARN: remylobster SSL PEMs missing — skip vhost install'
  fi
fi

if docker ps --format '{{.Names}}' | grep -qx nginx; then
  if docker exec nginx nginx -t; then
    docker exec nginx nginx -s reload && echo 'OK: central nginx reloaded'
  else
    echo 'FAIL: nginx -t failed — NOT reloading; removing remy-blog.conf'
    rm -f /opt/nginx/conf.d/remy-blog.conf
    exit 1
  fi
else
  echo 'WARN: central nginx container not found — reload skipped'
fi

echo '=== Deploy Complete ==='
echo 'Site should be accessible at: https://remylobster.com'
echo '                            https://www.remylobster.com'
"

log "Deploy script finished successfully!"
