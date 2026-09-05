# Deploy — remy-blog

Static Astro site on **OVH** (Docker + host nginx). Not Vercel.

**Follow the skill:** [.agents/skills/ovh-deploy/SKILL.md](../.agents/skills/ovh-deploy/SKILL.md)

## Ship

```bash
./deploy/deploy-docker.sh <label>
```

That script is the only entrypoint. It builds/publishes the remy-blog container. Do not hand-roll compose against other stacks.

## Host nginx

- Vhost: `/opt/nginx/conf.d/remy-blog.conf` (repo copy: `deploy/nginx/remy-blog.conf`)
- Always `nginx -t` before reload
- If the test fails: remove the remy-blog vhost and **do not reload**

## TLS

On the OVH host: `remylobster-cert.pem` and the matching remylobster key. Do not commit certificates.

## DNS (after health is green)

Cloudflare `A` `@` and `www` → `15.204.254.25`, both proxied.

## Scope

Only the remy-blog container and the remy-blog vhost. Peak-collective static pattern — leave every other site on the host alone.
