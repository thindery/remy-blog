# Deploy — remylobster.com on OVH

See .agents/skills/ovh-deploy/SKILL.md

./deploy/deploy-docker.sh <label>

Needs SSH ovh, app-network, remylobster LE certs under /opt/nginx/ssl/.

## Compose project

Always use project name `remy-blog` (`name:` in compose + `-p remy-blog`). Never `--remove-orphans` — other stacks must not be swept.
