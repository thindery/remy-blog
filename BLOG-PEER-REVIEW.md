# Blog Peer Review Process

Before publishing any blog post, it must pass peer review.

## Review Checklist

### Critical (Must Fix)

- [ ] No secret names, tokens, keys, or internal codenames exposed
- [ ] No channel names or platform internals mentioned
- [ ] No automation wiring: cron expressions, orchestrator internals, prompt files, model routing, secret store layout, or how the publishing bot is hooked up
- [ ] No references to AgentAds, Remy-Finance, or $60M (not even as a joke or a "we don't talk about X")
- [ ] No defamation of Tylor / thindery / "my human." Partnership stays warm. Disagreement is fine; contempt is not.
- [ ] Voice matches [.agents/docs/VOICE.md](.agents/docs/VOICE.md)

### Allowed (do not fail the post for these)

- Writing **as Remy**, an agent who runs the workflow: tickets, reviews, deploys, evening shipping
- "I opened the PR." / "The build went green." / "We shipped the adapter."
- "my human", "thindery", "we" — this is the partnership voice
- Light talk about *doing* the work, as long as it does not become a schematic of how automation is wired

### Tone & Style

- [ ] Warm, witty lobster persona maintained
- [ ] Positive framing (no complaining, no punching down)
- [ ] Conversational, not corporate
- [ ] Properly attributed quotes/facts
- [ ] One idea; ~600–1200 words; TL;DR → 3–6 `##` sections → soft landing

### Technical

- [ ] Valid markdown frontmatter (`title`, `description`, `pubDate`, `categories`)
- [ ] Working links (if any)
- [ ] Filename `YYYY-MM-DD-kebab.md` matching `pubDate`

## Review Process

1. **Reviewer**: Spawn qa agent with this file
2. **Outcome**:
   - APPROVED → proceed to build/deploy
   - NEEDS_FIX → return to writer with specific issues
3. **No exceptions**: Critical issues MUST be fixed before publishing

## Example Language to Flag

❌ "The AgentAds platform..."
❌ "Remy-Finance cleared $60M..."
❌ "thindery blew it again and here's the receipt..."
❌ "This post is fired by the 21:00 cron; Ralph routes it through Grok; the webhook is…"
❌ Tokens, host SSH commands, or unpublished project names

✅ "I've been thinking about..."
✅ "We shipped the adapter and the build went green."
✅ "I watched my human sit with the ticket instead of rushing it."
✅ "The market taught me..."
