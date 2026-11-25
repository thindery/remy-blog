# REMY-057: Add a Terms page + footer link; fix Privacy "we do not run ads" (AdSense loads)

- Priority: P1
- Owner: Remy Blog agent (filed by Remy, Grok Bot executor; NOT fixed by me)
- Status: Done
- Created: 2026-11-25

## Gap
`/terms` returns 404 and the footer (Home, Blog, About, Merch, Privacy, X) has no Terms link. `src/pages/privacy.astro` (updated Nov 24) says "we do not sell your data and we do not run ads", but the homepage loads `adsbygoogle.js` (ca-pub-5710716295420357, commit 783f33f) and `ads.txt` is valid. Privacy also says nothing about the newsletter form. Contact is X handles only.
Source: legal/privacy/footer audit of 2026-11-25 (/workspace/legal-audit-2026-11-25.md on the box). Tylor approved acting on it by voice at 3:28 PM CT.

## To do
- [x] Privacy: replace "we do not run ads" with an honest AdSense disclosure (ads, cookies, Google may use them); mention the email list if the newsletter form is live; keep Plausible + GA4 text.
- [x] Add `src/pages/terms.astro` (short, plain, personal-blog voice: content is Tylor's, no warranty, links to shop are Fourthwall's terms, contact) and link it in `Footer.astro`.
- [x] Add `/terms` to the sitemap; check it returns 200.

No secrets in this file or in git.

## Progress (2026-11-25, not Done)

Implemented and tested on branch `fix/REMY-057-terms-privacy` in worktree `/Users/thindery/projects/remy-blog-REMY-057`, based on `legal/audit-2026-11-25` (0616d7d), which matches live remylobster.com (AdSense ca-pub-5710716295420357, Merch nav, latest post 2026-11-25-the-day-before-the-long-weekend, Privacy still said "we do not run ads" as of this work).

Code changes:
- Privacy: removed "we do not run ads"; added AdSense disclosure (Google/partners cookies, links to Google ad policy, Ads Settings, and aboutads.info). Kept "we do not sell your data" and the Plausible + GA4 section. Last updated set to November 25, 2026.
- Added `src/pages/terms.astro` (personal-blog voice: content by Tylor, no warranty / not advice, merch shop at shop.remylobster.com governed by Fourthwall's Merchandise Terms of Service, contact via @thindery / @RemyLobster). Linked Terms next to Privacy in `Footer.astro`. Added `/terms` to `public/sitemap.xml`.
- Newsletter: the homepage form is a stub (`alert('Thanks for subscribing! (Feature coming soon)')` with no backend). Privacy does not mention an email list.

Tests (local only; nothing deployed):
- `npm run build` passed (221 pages). `dist/terms/index.html` exists. Footer `/terms` link present on built home, blog, about, privacy, and terms pages. Built sitemap includes `/terms`. Built privacy HTML no longer contains "do not run ads". Build still has the Nov 25 post, AdSense, Merch, GA4, and Plausible.
- `astro preview` on 127.0.0.1:4377: `/terms`, `/terms/`, `/privacy`, and `/privacy/` all returned 200.

Not deployed, not merged, ticket stays Open until Tylor gives an explicit OK and there is live evidence. Suggested later deploy (from this worktree only, after that OK): `./deploy/deploy-docker.sh remy-057-terms-privacy`

## Done — live evidence (2026-11-25, 4:07 PM CT)

Merged and deployed after Tylor's OK ("ensure all work is getting merged and deployed. i test it once live", 4:05 PM CT).

- PR: https://github.com/thindery/remy-blog/pull/5
- Merge SHA on main: `aba17baf66b4795eb47ebbbf82fff498d98fa3f6` (normal merge of `148dc5e`; `origin/main` had not moved past `0616d7d`)
- Deployed from worktree `/Users/thindery/projects/remy-blog-REMY-057` at `aba17ba` via `./deploy/deploy-docker.sh remy-057-terms-privacy`. Script finished successfully at 4:07 PM CT. Container `remy-blog` healthy, expose-only (80/tcp). `nginx -t` passed; central nginx reloaded. Only `/opt/nginx/conf.d/remy-blog.conf` was installed.

Live (https://www.remylobster.com, HTTP 200):
- `/terms/` — title “Terms | Remy the Lobster”; text includes content by Tylor, no warranty, Fourthwall merch terms, @thindery / @RemyLobster; footer Terms + Privacy links.
- `/privacy/` — last updated November 25, 2026; AdSense paragraph present (“This site shows ads through Google AdSense”); does not contain “do not run ads”; Plausible + GA4 kept; footer Terms link present.
- Homepage — “The Day Before the Long Weekend” still latest; AdSense `ca-pub-5710716295420357`; Merch → shop.remylobster.com; GA4; Plausible; footer Terms link.
- `/sitemap.xml` includes `https://www.remylobster.com/terms/`.
- Same content confirmed from inside the `remy-blog` container.

Other sites still up after deploy (host nginx + public curl): www.peak-collective.com 200, peak-collective.com 301 (www redirect), www.peakcollective.com 200, www.justwithai.com 200, www.shipinaday.com 200. Sibling containers remained healthy (peak-collective Up 4 hours, plus justwithai, shipinaday, drillgarden, etc.).

