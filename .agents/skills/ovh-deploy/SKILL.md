---
name: ovh-deploy
description: Deploy the remy-blog static site to OVH (Docker + host nginx). Use when publishing a post, shipping a frontend change, or cutting remylobster.com over to the OVH host. Peak-collective static pattern. Do not use for other containers or vhosts.
---

# OVH deploy — remy-blog

Peak-collective **static** pattern. This site is pre-built HTML in a Docker nginx container, with a host nginx vhost in front. It is **not** a Vercel deploy.

## Scope (hard)

You may touch **only**:

- The **remy-blog** Docker container / compose stack for this repo
- Host vhost **`/opt/nginx/conf.d/remy-blog.conf`**

You may **not** edit other containers, other vhosts, shared nginx.conf, fail2ban, or unrelated compose files.

Repo copies of the vhost and compose live under `deploy/` (`deploy/nginx/remy-blog.conf`, `deploy/docker-compose.yml`, `deploy/nginx.conf`, `Dockerfile`). Keep those aligned; do not "improve" another site's pattern while you are here.

## Preconditions

- `npm run build` has already succeeded in this checkout (or the deploy script builds — still do not ship a known-red tree).
- You are deploying **this** repo to remylobster.com, nothing else.
- Read [deploy/README.md](../../../deploy/README.md) if you need the short operator view.

## Deploy

From the repo root on the machine that can reach the OVH host:

```bash
./deploy/deploy-docker.sh <label>
```

`<label>` is a short tag for logs and image tags — post slug, ticket, or date. Example: `2026-09-05-patience-tax`.

Do not invent a second entrypoint (`docker compose` by hand, `vercel --prod`, scp of `dist/`). The script is the interface.

## Host nginx

After the container is up, the host vhost must be the remy-blog file only.

1. Install / refresh **`/opt/nginx/conf.d/remy-blog.conf`** from `deploy/nginx/remy-blog.conf` (or the script's equivalent). Do not edit neighboring files in `conf.d/`.
2. **`nginx -t`** on the host.
3. If **`nginx -t` fails**:
   - **Remove** the remy-blog vhost you just wrote (`/opt/nginx/conf.d/remy-blog.conf`)
   - **Do not reload** nginx
   - Stop and report the test error
4. If **`nginx -t` passes**: reload nginx (the script's reload path, or `nginx -s reload` only after a green test).

Never reload on a failed test. Never leave a broken remy-blog vhost in `conf.d/`.

## TLS

Certificates on OVH are already named:

- `remylobster-cert.pem`
- `remylobster-cert` key (the matching `remylobster` key file on the host)

Do not request a new CA flow, do not overwrite another site's certs, do not commit keys. If TLS is wrong, stop and say so.

## Health, then DNS

1. Confirm the container is healthy and the vhost serves the new build (HTTP 200 on `/` and the post URL if you just published).
2. **Only after health is green**, DNS cutover (if not already pointing here):

   Cloudflare, zone remylobster.com:

   - `A` `@` → `15.204.254.25` — **proxied**
   - `A` `www` → `15.204.254.25` — **proxied**

3. Do not flip DNS onto a red container or a failed `nginx -t`.

## What not to do

- `vercel --prod` / Netlify as the primary ship path
- Touch any vhost except remy-blog
- Reload nginx after a failed `nginx -t`
- Leave a broken `remy-blog.conf` in place "to debug later"
- Print secrets, cert material, or SSH details into the blog, the PR, or the notify message

## Done

- `./deploy/deploy-docker.sh <label>` completed
- `nginx -t` passed before reload, or vhost removed and no reload
- Health green
- DNS touched only if cutover was still pending and health was green

## Compose safety

- Project name must be **`remy-blog`** (`name:` in `deploy/docker-compose.yml` and `-p remy-blog` in the script).
- **Never** `docker compose down --remove-orphans` on this host — it can remove unrelated containers that share a project label.

