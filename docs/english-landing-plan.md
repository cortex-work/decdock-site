# English landing — plan for Codex

**Date:** 2026-07-09 · **Repo:** `C:\dev\decdock-site` (React + Vite + Tailwind + SSR/prerender, deploys to
decdock.com via GitHub Pages / CNAME + `dist`). NOTE: this is the **marketing site** repo — separate from the
engine repo `C:\dev\Decdock`. Work here, not there.

## Why (the concrete problem)

The founder just launched English-language outreach on LinkedIn (a "Write Boundary" post + comments + DMs to
an international decision-context / knowledge-graph audience). Those posts drive to **decdock.com** — which
currently serves a **Turkish** landing page ("Karar sicili · Bu kararı kim almıştı?"). An English visitor
clicking through from the post lands on a Turkish page and bounces. The site is otherwise complete and
polished; the gap is **language + message-match**, not content that doesn't exist.

There is already partial English infrastructure to build on: `scripts/proof/build-en.mjs` and the
`enron-proof` / `enron-graph` pages (English) exist alongside their Turkish `enron-kanit` / `enron-grafi`
counterparts. Extend that same approach to the **main landing page** rather than inventing a new mechanism.

## Founder decisions (defaults set; founder may override — confirm if unsure)

1. **Language strategy — default: bilingual, English-default for international entry.** Keep Turkish (the
   founder has a Turkish network too), but the entry that LinkedIn links to must render in English. Simplest
   acceptable v1: an English landing that decdock.com serves by default (with a path or toggle back to
   Turkish). Do **not** delete the Turkish version.
2. **Positioning — default: realign the English copy to the LinkedIn framing.** The current site leads with
   "decision registry / who made this decision / audit." The traffic arriving from the posts is primed for
   **the write boundary / decision governance / resolving decisions** framing. Lead the English landing with
   that hook (duplicate · contradiction · supersession · authorized-exception · exception-drift ·
   authority-at-time — "resolving decisions, not just storing them"), then keep the concrete proof the site
   already has (extracts decisions from emails, who approved, when, with source quotes; the Enron proof; the
   live decision graph). Governance-first hook → concrete proof underneath.

## Scope (v1 — the high-value slice)

- An **English landing page** that message-matches the LinkedIn positioning, reusing the site's existing
  design system (Tailwind theme, components, the registry/graph aesthetic — keep it on-brand, don't restyle).
- Wire it so **an international visitor lands in English** (English-default entry, or language detection/toggle
  — implementer's call, but the LinkedIn-linked URL must be English).
- Reuse the existing English proof/graph pages (`enron-proof`, `enron-graph`) as the "See it on real data"
  CTA targets, so the English path is coherent end-to-end (no dead links back into Turkish-only pages).
- Keep all CTAs working in English (Request Decision Audit, Watch in 60s, See decision graph live).

## Guardrails

- **Message-match, don't overclaim.** The English copy must stay consistent with what the engine actually
  does and what we've measured honestly (see the engine repo's `moat-real-validation-baseline.md`): the moat
  signals are real and demoed, but validated-on-real-public-data is supersession + identity; don't imply the
  governance signals are proven on public benchmarks. Same honesty bar as the posts.
- Reuse the existing design system and build/deploy pipeline (`npm run build` → prerender → dist). Don't
  introduce a new framework or break the SSR/prerender flow. Run the existing smoke checks
  (`smoke:demo`, `smoke:proof`) before considering it done.
- Keep the Turkish site intact and reachable.
- Copy quality matters — this is founder-facing / prospect-facing. Tight, honest, native English. No machine-
  translated Turkish.

## Loop

Land the English landing + entry wiring, verify the build + smoke checks pass and the English path has no dead
links, write a short summary of what changed and how decdock.com now serves English. Flag the two founder
decisions above if the defaults don't feel right rather than guessing on brand voice. Under the same working
discipline as the engine repo's `codex-autonomous-handoff.md` (verify-first, honest, no overclaiming).
