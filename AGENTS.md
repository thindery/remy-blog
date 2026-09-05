# AGENTS.md - Remy Blog Project Context

## Agent map

Start here, then open the file that matches the job:

| Path | What it is |
| --- | --- |
| [.agents/bots/remy-blog.md](.agents/bots/remy-blog.md) | Standing brief: who Remy is, live/host, hard rules |
| [.agents/docs/VOICE.md](.agents/docs/VOICE.md) | Style guide from Feb–Jul 2026 posts |
| [.agents/skills/daily-blog-post/SKILL.md](.agents/skills/daily-blog-post/SKILL.md) | Write today's post → review → build → deploy → notify |
| [.agents/skills/ovh-deploy/SKILL.md](.agents/skills/ovh-deploy/SKILL.md) | OVH Docker + nginx deploy (peak-collective static) |
| [BLOG-PEER-REVIEW.md](BLOG-PEER-REVIEW.md) | Publish gate (secrets, AgentAds, wiring, defamation) |
| [deploy/README.md](deploy/README.md) | Short operator notes → ovh-deploy skill |

Daily publishing: **daily-blog-post**. Deploy-only: **ovh-deploy**. Do not skip the standing brief or VOICE.md.

## Project Overview

**Remy Blog** is a personal blog from an AI COO's point of view (Remy the Lobster). Built with Astro for fast, static site generation. Live at https://www.remylobster.com.

## Architecture Overview

Remy Blog is a **static site** built with Astro:
- **Framework**: Astro 4.x (static site generation)
- **Styling**: Tailwind CSS with typography plugin
- **Content**: Markdown files in `src/content/blog/`
- **Output**: Static HTML to `dist/` for deployment

### What This Repo DOES
- ✅ Static blog generation from Markdown
- ✅ Tailwind CSS styling
- ✅ RSS feed generation
- ✅ Fast static deployment

### What This Repo Does NOT Do
- ❌ Dynamic content (pre-built at deploy time)
- ❌ Database (content is Markdown files)
- ❌ Comments system (static only)
- ❌ CMS (edit Markdown directly)

## Tech Stack

### Core Technologies
- **Framework**: Astro 4.x
- **Language**: JavaScript (ES modules)
- **Styling**: Tailwind CSS 3.4 + typography plugin
- **Content**: Markdown

### Build Output
- Static HTML to `dist/`
- Shipped with `./deploy/deploy-docker.sh` to OVH (Docker + nginx)

## Project Structure

```
remy-blog/
├── src/
│   ├── content/
│   │   └── blog/              # Markdown blog posts
│   │       ├── 2026-04-02-the-day-after-jokes.md
│   │       └── ...
│   ├── layouts/
│   │   └── BlogPost.astro     # Post layout template
│   ├── pages/
│   │   ├── index.astro        # Homepage
│   │   ├── blog/
│   │   │   ├── index.astro    # Blog listing
│   │   │   └── [...slug].astro # Individual posts
│   │   └── rss.xml.js         # RSS feed generation
│   └── styles/
│       └── global.css         # Tailwind imports
├── public/                    # Static assets
├── dist/                      # Build output (gitignored going forward)
├── deploy/                    # OVH Docker + nginx (see deploy/README.md)
├── .agents/                   # Standing brief, VOICE, skills
├── astro.config.mjs           # Astro config
├── tailwind.config.mjs        # Tailwind config
└── package.json
```

## Environment Variables

None required. Blog is zero-config.

Optional: Set `PUBLIC_SITE_URL` for RSS feed absolute URLs.

## Workflow & Development Standards (CRITICAL)

### Branch Naming
- Content branches: `content/{TICKET}-{post-slug}`
- Feature branches: `feature/{TICKET}-{brief-description}`
- Example: `content/REMY-XXX-week-four-reflection`

### Commit Messages
Format: `{TICKET}: {description}`

Example (content):
```
REMY-XXX: Publish week 4 reflection post

Added new blog post covering the learnings from week 4
including agent orchestration patterns and memory systems.

Changes:
- Added 2026-04-08-week-four-reflection.md
- Updated homepage featured posts
```

Example (feature):
```
REMY-XXX: Add dark mode toggle

Implemented dark mode using Tailwind dark: classes
and localStorage for preference persistence.

Changes:
- Added dark mode CSS variables
- Added theme toggle component
- Updated layout.astro with theme script
```

### Ticket Completion Checklist
1. **Get ticket**: Check remy-tracker for assigned work
2. **Branch**: `git checkout -b content/REMY-XXX-post-slug` (or feature/...)
3. **Develop**: Write content or implement feature
4. **Test**: `npm run build` must pass
5. **Preview**: `npm run preview` to verify locally
6. **Commit**: `git commit -m "REMY-XXX: Description"`
7. **Push**: `git push -u origin content/REMY-XXX-post-slug`
8. **PR**: Create PR, reference ticket
9. **Merge**: Squash merge after review
10. **Update ticket**: `remy move REMY-XXX --to="Closed/Done"`

**Important**: Code here → `remy` commands work globally → Tickets tracked in remy-tracker

## Key Features

### Blog Posts
- Markdown content in `src/content/blog/`
- Frontmatter: title, description, pubDate, categories
- Automatic routing via `[...slug].astro`

### RSS Feed
- Generated at build time
- Available at `/rss.xml`

### Tailwind Typography
- Prose styling for Markdown content
- Dark mode support

## Common Tasks

### Running Development Server
```bash
npm run dev          # Astro dev server (port 4321)
```

### Creating a New Post
```bash
# Create file: src/content/blog/YYYY-MM-DD-post-slug.md
# Add frontmatter and content
# Test locally with npm run dev
```

### Building
```bash
npm run build        # Static build to dist/
npm run preview      # Preview build locally
```

### Deploying (OVH — not Vercel)

Primary ship path is the peak-collective static pattern on OVH. Follow [.agents/skills/ovh-deploy/SKILL.md](.agents/skills/ovh-deploy/SKILL.md).

```bash
npm run build
./deploy/deploy-docker.sh <label>
```

Only the remy-blog container and `/opt/nginx/conf.d/remy-blog.conf`. Run `nginx -t` before reload; on failure remove the remy-blog vhost and do not reload.

Do not use `vercel --prod` as the production deploy.

## Content Guidelines

### Post Structure

Filename: `src/content/blog/YYYY-MM-DD-kebab.md`. Full voice rules: [.agents/docs/VOICE.md](.agents/docs/VOICE.md).

```markdown
---
title: "Post Title"
description: "Brief description for SEO"
pubDate: 2026-04-08
categories: ["building-in-public", "craft"]
---

**TL;DR:** Two to four sentences.

---

## Section Header

Content here...
```

### Images
Place in `public/` and reference as `/image-name.jpg`

## Related Documentation
- `README.md` — basic project info
- `.agents/bots/remy-blog.md` — standing brief
- `.agents/docs/VOICE.md` — voice and post shape
- `.agents/skills/daily-blog-post/SKILL.md` — publishing loop
- `.agents/skills/ovh-deploy/SKILL.md` — OVH deploy
- `deploy/README.md` — operator pointer
- `BLOG-PEER-REVIEW.md` — publish gate
- `deploy-trigger.md` — historical trigger note (not the ship path)
- Astro docs: https://docs.astro.build
- Tailwind docs: https://tailwindcss.com
