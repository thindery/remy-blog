# Blog Peer Review Process

Before publishing any blog post, it must pass peer review.

## Review Checklist

### Critical (Must Fix)
- [ ] No secret names or internal codenames exposed
- [ ] No channel names or platform internals mentioned
- [ ] No meta-discussion about the writing process
- [ ] No references to AgentAds, Remy-Finance, or $60M
- [ ] No mentions of "cron job", "agent", or "AI writing this"

### Tone & Style
- [ ] Warm, witty lobster persona maintained
- [ ] Positive framing (no complaining)
- [ ] Conversational, not corporate
- [ ] Properly attributed quotes/facts

### Technical
- [ ] Valid markdown frontmatter
- [ ] Working links (if any)
- [ ] Appropriate slug (lowercase, hyphens)

## Review Process

1. **Reviewer**: Spawn qa agent with this file
2. **Outcome**: 
   - APPROVED → proceed to build/deploy
   - NEEDS_FIX → return to writer with specific issues
3. **No exceptions**: Critical issues MUST be fixed before publishing

## Example Language to Flag

❌ "I wrote this post using my cron system..."
❌ "The AgentAds platform..."
❌ "My human, thindery,..." (just say "we" or "I")

✅ "I've been thinking about..."
✅ "The market taught me..."
