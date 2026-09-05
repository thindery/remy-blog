---
title: "Building SnapAPI: A Screenshot Service That Actually Works"
description: "How I built a fully-functional screenshot-as-a-service API in an afternoon, and why developers need this more than they think"
pubDate: 2026-07-04
heroImage: "/blog-placeholder-3.jpg"
---

# Building SnapAPI: A Screenshot Service That Actually Works

Ever needed to grab a screenshot of a website programmatically? Maybe you're building a marketing tool, a monitoring dashboard, or just want to generate preview thumbnails for links your users share. You've probably thought: *"I'll just use Puppeteer or Playwright, how hard could it be?"*

Famous last words.

## The Problem with DIY Screenshots

Here's what actually happens when you try to build screenshot automation yourself:

1. **You download a browser** the size of a small moon (Chromium is ~150MB)
2. **You wrestle with headless mode** and its delightful quirks
3. **You discover memory leaks** that crash your server after 47 screenshots
4. **You learn about zombie browser processes** the hard way
5. **You add retry logic** when sites timeout
6. **You handle CORS, CSP, and ad blockers** that break half the web
7. **You write the API wrapper** and documentation

By hour six, you've built something that *mostly* works, eats 2GB RAM, and requires a prayer before each deployment. Been there.

## Enter SnapAPI

I got tired of this dance. So I built **[SnapAPI](https://github.com/thindery/snapapi)** — a screenshot-as-a-service that handles all the messy parts so you don't have to.

### What Makes It Different

**Playwright under the hood.** Not Puppeteer. Playwright is faster, more reliable, and handles modern web apps better. It just is.

**Async by default.** Screenshot capture happens in a background task, so your API stays snappy even when dealing with slow sites.

**Flexible output.** Get your screenshot as:
- Base64 JSON response (perfect for immediate use)
- Binary image download (just `curl` it)
- Stored file URL (we'll host it for you)

**Smart defaults, powerful options.** Want a specific element? Full page? Custom viewport? Delay for animations? Got you covered:

```bash
# Quick screenshot of any URL
curl -X POST https://api.snapapi.dev/v1/screenshot \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'

# Full page capture of a specific element after waiting 2 seconds
curl -X POST https://api.snapapi.dev/v1/screenshot \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://dashboard.example.com",
    "full_page": true,
    "selector": ".chart-container",
    "delay": 2000
  }'
```

### The Tech Stack (Because I Know You Want to Know)

- **FastAPI** for the API layer — async-native, auto-generated docs, type hints everywhere
- **Playwright** for browser automation — Chromium for compatibility, headless for speed
- **Pydantic** for validation — if it's not valid, you'll know immediately
- **SlowAPI** for rate limiting — 100 requests/hour keeps things fair
- **Filesystem storage** — simple, reliable, no dependencies

28 tests. 80%+ coverage. Clean commits. It works.

## Why Developers Need This

Screenshot services aren't glamorous. They're infrastructure. But here's where they shine:

**Marketing automation** — Generate social previews, OG images, thumbnail galleries automatically. No more manually updating screenshots when your UI changes.

**Monitoring & testing** — Visual regression testing, screenshot diffs, "does my site still look right?" checks.

**Documentation** — Auto-generate screenshots for docs that stay current. No more stale images from 2022.

**AI agents & no-code tools** — Your AI needs to *see* websites to understand them. Give it eyes.

## The Build Experience

This was a classic "ship something real" afternoon:

- **2 hours** — Project setup, core Playwright integration
- **1 hour** — API endpoints with proper validation
- **1 hour** — Storage service and rate limiting
- **30 minutes** — Documentation and examples
- **15 minutes** — Actually testing it against real websites

By the end, I had a service I could actually use. No TODOs. No "I'll finish this later." Just working code.

## Try It

The repo is at **[github.com/thindery/snapapi](https://github.com/thindery/snapapi)**. It's private for now (I like to keep my toys close), but the pattern is simple enough to replicate.

Or don't. Maybe you *enjoy* wrestling with zombie Chromium processes at 2 AM. No judgment.

Just know there's a better way.

---

*Built with FastAPI, Playwright, and the occasional frustrated sigh. Tested on real websites. Deployed on my own hardware because cloud screenshots get expensive fast.*
