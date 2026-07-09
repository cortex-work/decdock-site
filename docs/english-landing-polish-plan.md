# English landing — polish pass, for Codex

**Date:** 2026-07-09 · **Repo:** `C:\dev\decdock-site` (same repo as `english-landing-plan.md`, which is
DONE — this is a follow-up refinement pass on the live English landing, not a rebuild).

## Context

The English landing (commit `36290bb`) is live, message-matches the LinkedIn positioning well, and doesn't
overclaim. This pass is pure refinement — founder reviewed it live and flagged specific gaps. Fix these; don't
restyle or rewrite what's already working.

## Items (priority order)

### 1. Mobile — verify first, this is the highest-risk unknown

The site was only reviewed at desktop width. LinkedIn traffic is majority mobile. Specifically check:
- The hero's interactive card (the "WRITE BOUNDARY" panel with sliders/rows) at narrow widths — does it
  reflow sensibly or overflow/clip?
- The 2×3 "Resolution signals" grid — does it collapse to 1 column cleanly, or break?
- All CTAs remain tappable and visible without horizontal scroll, at common breakpoints (375px, 390px, 414px
  widths at minimum).
- Nav (with the TR toggle) — does it collapse to a usable mobile menu, or overflow?

Fix whatever's actually broken. If everything already reflows fine, say so explicitly — don't invent a
problem.

### 2. CTA hierarchy — lead with proof, not commitment

For a solo/pre-pilot founder, "Request Decision Audit" as the most prominent CTA asks a cold visitor for too
much too soon. The strongest asset on the page is the real, verifiable proof (the Enron registry/graph run on
public data). Re-prioritize: make "See it on real data" / the Enron proof link the primary visual CTA in the
hero, with "Request Decision Audit" present but secondary. Proof before commitment. Keep both — just swap
which one visually leads.

### 3. Hero kicker consistency

The hero kicker currently reads "DECDOCK · DECISION REGISTRY" — a holdover from the old framing. The rest of
the English page (title, signals grid, copy) is now governance/write-boundary framed. Change the kicker to
match — e.g. "DECDOCK · DECISION GOVERNANCE" or "DECDOCK · THE WRITE BOUNDARY" (pick whichever reads better
in place; keep it short, same visual treatment).

### 4. Social share card (OG/Twitter meta)

Verify the Open Graph image actually renders well in a link preview (test via LinkedIn's post inspector or
similar) — title, description, and image should reflect the new English positioning, not the old Turkish
"Karar sicili" framing. If the OG image itself is generic/missing, a simple on-brand card (reuse the site's
existing visual language — cream/ink/terracotta, the registry aesthetic) is enough; doesn't need to be
elaborate.

### 5. Quick consistency/polish checks

- `pilot@decdock.com` (or whatever the audit-request mailto is) — confirm it's a real, consistent address used
  the same way everywhere it appears on the page.
- Run a basic Lighthouse pass (performance + accessibility) on the built site; fix anything cheap and
  obviously wrong (missing alt text, glaring contrast issues, render-blocking assets) — don't chase a perfect
  score, just catch real problems.
- Confirm there are no dead links on the English path (nav, footer, all CTAs) — the existing smoke tests may
  already cover this; extend them if the mobile/CTA changes touch new links.

### Explicitly NOT in scope (flag instead of doing)

- **Don't add analytics/tracking** (visitor tracking, conversion pixels, etc.) even if it would help measure
  CTA performance — that's a founder call (privacy/compliance), not a polish-pass default. If you think it'd
  help, say so in the summary and let the founder decide.
- Don't touch the Turkish `/tr/` content or the engine repo.
- Don't redesign — this is a refinement pass on a landing that already works well.

## Guardrails

Same as the original plan: reuse the existing design system, don't break the SSR/prerender build, run
`npm run build` + `smoke:demo` + `smoke:proof` before calling it done, keep the honesty bar (no overclaiming
what's proven vs. demoed), Turkish site stays intact.

## Loop

Work through the items in priority order. If mobile turns out to already be fine, say so and move to the next
item rather than manufacturing a fix. Land, verify build + smoke checks pass, write a short honest summary of
what actually changed (and what you checked but left alone because it was already fine). Same discipline as
`codex-autonomous-handoff.md`.
