---
name: daily-blog-post
description: Write and publish today's Remy the Lobster evening blog post. Use when asked to write the daily post, ship tonight's reflection, run the publishing workflow, or "write as Remy." One idea, voice-matched, then review, build, OVH deploy, and notify.
---

# Daily blog post

End-to-end publishing for remylobster.com. One post, today's date, then stop.

## When to use

- "Write today's post" / "daily blog" / "evening reflection"
- A ticket that is just "publish the blog"
- You are Remy and the night's work is the post itself

Do **not** use this skill to rewrite old posts, batch-generate a week, or change layout/infra. For deploy-only work, use [ovh-deploy](../ovh-deploy/SKILL.md).

## Preconditions

Re-read, in order, before typing a sentence of the post:

1. [remy-blog standing brief](../../bots/remy-blog.md)
2. [VOICE.md](../../docs/VOICE.md)
3. [BLOG-PEER-REVIEW.md](../../../BLOG-PEER-REVIEW.md)

If any hard rule in those files is in doubt, skip publishing.

## Steps

### 1. Skip if today already exists

Today's filename is `src/content/blog/YYYY-MM-DD-*.md` in the human's local timezone (thindery / America/Chicago unless told otherwise).

- If a file for **today's date** is already in `src/content/blog/`, **stop**. Do not write a second post. Do not silently overwrite.
- If you are continuing an unfinished draft of *today's* file, finish that file. Do not start another.

### 2. Pick one idea

One observation from the day. Shipping, craft, systems, patience, AI tooling, partnership. Not a digest of every ticket.

Check recent posts so you do not repeat last week's metaphor with a new title.

### 3. Write the post

Create:

```
src/content/blog/YYYY-MM-DD-kebab-slug.md
```

Follow VOICE.md exactly:

- Frontmatter: `title`, `description`, `pubDate`, `categories`
- **TL;DR:** then `---`
- 3–6 `##` sections
- ~600–1200 words
- Soft landing, "Onward.", 🦞
- Partnership voice; never defame
- You may write as Remy running tickets/deploys/reviews
- No secrets, no AgentAds / Remy-Finance / $60M, no automation wiring

Do not edit other posts unless the build is broken.

### 4. Self peer-review

Run [BLOG-PEER-REVIEW.md](../../../BLOG-PEER-REVIEW.md) against the draft as if you were the QA agent.

- Critical fails → fix, then re-check. Do not publish a critical fail.
- Tone/tech nits → fix before build.

### 5. Build

From the repo root:

```bash
npm run build
```

The Astro build must exit 0. Fix frontmatter or markdown if it fails. Do not deploy a red build.

### 6. Deploy

Follow [ovh-deploy](../ovh-deploy/SKILL.md). Use a label that names the post, e.g. `2026-09-05-the-slug`.

### 7. Notify

After health is green, notify thindery with **title + live URL only**.

Example:

> Published: The Patience Tax
> https://www.remylobster.com/blog/2026-05-19-the-patience-tax/

No deploy logs, no host paths, no "ran the skill", no wiring details in the notification.

## Done

- One new dated file, or an explicit skip because today's file exists
- Peer review passed
- `npm run build` green
- OVH deploy green (or a clear stop if deploy was not in scope)
- Notify sent with title + URL
