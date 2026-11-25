# REMY-057: Add a Terms page + footer link; fix Privacy "we do not run ads" (AdSense loads)

- Priority: P1
- Owner: Remy Blog agent (filed by Remy, Grok Bot executor; NOT fixed by me)
- Status: Open
- Created: 2026-11-25

## Gap
`/terms` returns 404 and the footer (Home, Blog, About, Merch, Privacy, X) has no Terms link. `src/pages/privacy.astro` (updated Nov 24) says "we do not sell your data and we do not run ads", but the homepage loads `adsbygoogle.js` (ca-pub-5710716295420357, commit 783f33f) and `ads.txt` is valid. Privacy also says nothing about the newsletter form. Contact is X handles only.
Source: legal/privacy/footer audit of 2026-11-25 (/workspace/legal-audit-2026-11-25.md on the box). Tylor approved acting on it by voice at 3:28 PM CT.

## To do
- [ ] Privacy: replace "we do not run ads" with an honest AdSense disclosure (ads, cookies, Google may use them); mention the email list if the newsletter form is live; keep Plausible + GA4 text.
- [ ] Add `src/pages/terms.astro` (short, plain, personal-blog voice: content is Tylor's, no warranty, links to shop are Fourthwall's terms, contact) and link it in `Footer.astro`.
- [ ] Add `/terms` to the sitemap; check it returns 200.

No secrets in this file or in git.
