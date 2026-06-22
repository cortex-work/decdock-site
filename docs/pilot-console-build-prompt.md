# Decdock Pilot Console — Build Prompt (for Codex)

> Bu, Codex'e verilecek uygulama promptudur. Karar: standalone Next.js + Neon + Drizzle, Vercel.
> Decdock motoruna BAĞLANMAYACAK — bu bir altyapı yatırımıdır; rapor üretimi simüledir.
> Kaynak tasarım/spec: `pilot-console-v0.md` (bu klasörde) + mevcut mock bileşenler (aşağıda).

---

## 0. Mission

Build a **production-grade, standalone "Pilot Console"** web app for Decdock — a real **internal ops/admin panel** + a real **customer panel**, backed by a real database (Neon Postgres). Every button must do something real (persisted to DB, audited). This is an **infrastructure investment**: it is NOT yet connected to Decdock's extraction engine or any LLM. Report generation is **simulated** (see §7). Build the data model, flows, auth, and cost/safety guardrails correctly now so the engine can be wired in later behind an adapter layer.

Tone of the product UI: calm, editorial, "auditable record" feeling. Reuse the existing parchment design system (§3.4).

## 1. What already exists — DO NOT rebuild or touch

- **Marketing site** (`decdock.com`): a separate Vite/React/Tailwind site on GitHub Pages. **Leave it completely alone.** The console is a separate app on its own deploy.
- **Authoritative spec**: `docs/pilot-console-v0.md` — read it fully. It defines roles, cost rules, coupon model, job states, retention, auth model, and route layout. This prompt operationalizes it. If this prompt and the spec disagree, **this prompt wins**; note the conflict.
- **Visual reference only** (port the *look*, replace ALL logic with real backend): the marketing repo's mock components `OpsConsole.tsx`, `CustomerWorkspace.tsx`, `AuthEntry.tsx`. They are front-end-only mockups with dead buttons — your job is the real version.
- **Neon account** already exists (`DATABASE_URL` in env). Use it.

## 2. Hard constraints — DO NOT

1. **No LLM, no Decdock engine call, no external AI API.** Report "generation" is simulated (§7). Keep a conceptual adapter mapping (§9) but do not implement real extraction.
2. **Honesty (product value: "uydurma yok").** A simulated report must NEVER present fabricated "decisions" as if extracted. It must be clearly labeled simulated and only show *real* upload metadata (file/email counts, senders, sizes). No fake confidence scores, no invented owners.
3. **Ops panel must not be publicly obvious.** Unauthenticated access to any ops route returns **404** (not 401/redirect). Login lives at a non-guessable, env-configured slug. No links to it from anywhere. `noindex,nofollow`. (§6)
4. **Never log or store raw secrets.** Passwords → argon2id hash. Coupon codes & access tokens → store **hash + last 4 chars only**; show raw value **once** at creation. No raw secrets in logs, audit rows, or emails.
5. **Cost kill-switch is mandatory even with no LLM.** Build the guardrail as a habit: a global monthly spend cap (`app_settings.max_monthly_spend_usd`) and per-job hard cap; a job can never enter `processing` if its estimate exceeds the approved limit OR the remaining monthly budget.
6. **No raw customer data for training/calibration.** State this promise in-product (§8). Raw uploaded text is used only to produce that account's report and is deleted per retention policy.
7. **TypeScript strict.** No `any` escapes. Validate every API input with zod.

## 3. Stack & architecture (decided)

### 3.1 Stack
- **Next.js (App Router), TypeScript strict, React Server Components where natural.**
- **Tailwind CSS** with the parchment token set (§3.4).
- **Drizzle ORM** + **Neon serverless HTTP driver** (`@neondatabase/serverless` + `drizzle-orm/neon-http`). Migrations via `drizzle-kit`.
- **Auth**: DB-backed sessions in an **httpOnly, Secure, SameSite=Lax cookie**. Hash passwords with **argon2id** (`@node-rs/argon2`). TOTP scaffolding via `otplib` (optional second factor; see §6). Do **not** use a heavy auth framework; a small, audited custom session module is clearer for two distinct realms.
- **Validation**: zod at every route/server-action boundary.
- **Email**: provider-agnostic **outbox** table + a `sendEmail` adapter. If `RESEND_API_KEY` is set, send via Resend from `rapor@decdock.com`; otherwise queue only and surface pending items in the ops panel for manual relay (§7.4).
- **Runtime note (important for Vercel/Neon):** DB + auth routes run on the **Node.js runtime** (`export const runtime = 'nodejs'`) — argon2 native bindings and the Neon driver need it. The **Edge middleware** only does the lightweight cookie-presence + ops 404 gate; it must not import the DB or argon2.

### 3.2 Deploy & cost
- Deploy to **Vercel** (smoothest for Next + Neon + Cron; free Hobby tier to start). Use **Vercel Cron** for the retention sweeper.
- **Keep it portable**: it is a standard Next.js app — avoid Vercel-only APIs except Cron (and isolate Cron behind one function so it can be swapped for Netlify Scheduled Functions / a Node cron later). Note in README that Hobby tier is non-commercial; moving to Pro or Netlify/Cloudflare/self-host is a one-config change.
- Custom domain is optional for v0 — ship on the platform domain first; `app.decdock.com` can be added later via DNS.

### 3.3 Repo & route layout
- New repo: **`decdock-console`** (separate from the marketing repo).
- Route groups:
  - `(customer)` → `/login`, `/register`, `/recover`, `/verify`, `/app/o/[orgId]/...`
  - `(ops)` → ops login at `/[OPS_LOGIN_SLUG]` (from env), ops app under `/ops/...` (404-gated).
- Resource URLs use **opaque prefixed IDs** (`org_`, `usr_`, `cpn_`, `upl_`, `job_`, `rep_`, `tok_`, `aud_`), never sequential integers.

### 3.4 Design system (port from the marketing site)
Parchment editorial look. CSS variables:
```
--page:#f4eee6; --ink:#2b2420; --body:#574f48; --muted:#8a7d71;
--accent:#9c6e44; --accent-d:#84592f; --success:#5c7560; --warning:#a86f3d;
--line:rgba(74,66,58,0.16); --pane:#fdfaf5;
```
Fonts: **Newsreader** (display/serif headings), **Manrope** (body), **JetBrains Mono** (codes/IDs/tokens). Buttons, panels, chips, badges should match the existing `OpsConsole.tsx`/`CustomerWorkspace.tsx` aesthetic (rounded panels, eyebrow labels, soft shadows). Customer workspace uses a dark sidebar; ops uses a light control-tower layout.

## 4. Data model (Drizzle / Postgres — starting schema, refine as needed)

Enums:
- `user_role`: `account_owner | company_admin | team_lead`
- `job_status`: `draft | uploaded | estimated | awaiting_admin_approval | requires_special_approval | approved | processing | report_ready | failed | cancelled | deleted`
- `coupon_kind`: `trial | special`
- `coupon_status`: `active | used | expired | revoked`
- `token_status`: `active | revoked | expired`
- `retention_policy`: `delete_after_report | delete_after_7_days | delete_after_30_days | manual_review_required`
- `upload_status`: `received | parsing | parsed | failed | deleted`
- `actor_type`: `ops | customer | system`
- `deployment_pref`: `managed_pilot | customer_cloud | private_on_prem`
- `email_status`: `queued | sent | failed | suppressed`

Tables (columns abbreviated; add `createdAt`/`updatedAt` timestamptz defaults everywhere):
- **accounts** — `id(org_)`, `companyName`, `status(pending_verification|active|suspended)`, `defaultMaxEstimatedCostUsd` (default 1.20), `retentionPolicy` (default `delete_after_30_days`), `deploymentPref` (default `managed_pilot`), `notificationEmail`.
- **users** — `id(usr_)`, `accountId`, `email`, `role`, `emailVerifiedAt`. Unique `(accountId, email)`.
- **ops_users** — `id(ops_)`, `email` (unique), `passwordHash`, `opsSecondKeyHash` (the "ikinci anahtar"), `totpSecret` (nullable), `role(super_admin|ops)`, `lastLoginAt`. **No public registration** — seeded only.
- **customer_sessions** / **ops_sessions** — separate tables. `id`, `subjectId`, `expiresAt`, `createdAt`, `userAgent`, `ipHash`. Cookie holds the session id only.
- **email_verifications** — `id`, `email`, `accountId`, `codeHash` (or magic-link token hash), `expiresAt`, `consumedAt`. Short TTL.
- **access_tokens** — `id(tok_)`, `accountId`, `userId`, `tokenHash`, `last4`, `status`, `expiresAt`, `lastUsedAt`. The customer's workspace "second key".
- **coupons** — `id(cpn_)`, `codeHash`, `last4`, `kind`, `discountPercent`(nullable), `maxUses`, `maxUsesPerAccount`, `usedCount`, `maxMb`, `maxEmails`, `maxFiles`, `maxEstimatedTokens`, `maxEstimatedCostUsd`, `allowedPlan`(nullable), `generatedByOpsUserId`, `generationReason`, `expiresAt`, `status`.
- **uploads** — `id(upl_)`, `accountId`, `fileName`, `sizeBytes`, `fileCount`, `format`, `status`, `emailCount`, `charCount`, `extractedText` (text, capped — see §5.1), `parseError`(nullable). Raw text deleted on retention.
- **report_jobs** — `id(job_)`, `accountId`, `uploadId`, `couponId`(nullable), `status`, `estimatedInputTokens`, `estimatedOutputTokens`, `estimatedCostUsd`, `approvedCostLimitUsd`(nullable), `actualCostUsd`(nullable), `requiresAdminApproval`(bool), `requiresSpecialApproval`(bool), `approvedByOpsUserId`(nullable), `approvedAt`(nullable), `rejectionReason`(nullable).
- **reports** — `id(rep_)`, `jobId`, `accountId`, `title`, `summary`, `htmlContent` (text), `costUsd`, `deliveredAt`, `isSimulated`(bool, default true).
- **audit_log** — `id(aud_)`, `actorType`, `actorId`(nullable), `action`, `targetType`, `targetId`, `metadata`(jsonb, **no raw secrets/raw content**), `ipHash`, `userAgent`, `createdAt`. **Append-only** (no update/delete in app code).
- **email_outbox** — `id(eml_)`, `toEmail`, `subject`, `bodyText`, `bodyHtml`, `kind`(verification|token|report_ready|...), `status`, `relatedId`, `sentAt`, `providerMessageId`(nullable). Secure links/codes here are single-use and reference hashes, not stored raw long-term.
- **app_settings** — single-row config: `maintenanceMode`(bool), `disableNewPilots`(bool), `maxMonthlySpendUsd`(default e.g. 25), `currentMonthSpendUsd`(default 0), `currentMonthKey`(e.g. `2026-06`).

Add indexes on every `accountId`, `status`, and `(actorType, createdAt)` for the audit timeline.

## 5. Feature spec — every button is real

### 5.1 Preflight & cost estimate (real, from real text)
On upload, parse the file(s) to plain text server-side (support `.txt .md .eml .mbox .zip`; for `.eml/.mbox` strip MIME/headers/quoted noise — a dependency-free parser exists in the engine repo's `scripts/report/eml-parse.mjs` as reference logic; reimplement minimally). Then compute, from the **actual parsed text** (better than the old mock heuristic):
- `estimatedInputTokens ≈ ceil(charCount / 4)`
- `estimatedOutputTokens ≈ max(8000, emailCount * 420)`
- Haiku price model: **$1.00 / 1M input**, **$5.00 / 1M output**.
- `estimatedCostUsd = input/1e6*1 + output/1e6*5`
- Limits: `defaultApprovalThresholdUsd = 1.20`, `hardTrialLimitUsd = 1.50`, plus per-coupon `maxEstimatedCostUsd`. Practical caps: 50 emails, 5 MB text, 1,000,000 input tokens (whichever first).
- Routing: `≤ threshold` → `awaiting_admin_approval`; `> threshold && ≤ active hard cap` → `requires_special_approval`; `> hard cap` → blocked (cannot approve). Show a live cost meter + per-limit pills.
- Cap `uploads.extractedText` length (e.g. reject/truncate beyond ~1.2M chars) to protect the DB and enforce the token cap.

### 5.2 Customer flows (each → real DB + audit)
1. **Register** (`/register`): email + company + optional coupon → create `account(pending_verification)` + `user(account_owner)`; validate coupon if given; queue verification (magic-link or 6-digit code) to outbox. Generic response (no account enumeration).
2. **Verify** (`/verify`): consume code/link → mark `emailVerifiedAt` → **issue a workspace access token shown ONCE** (copy-to-clipboard) → create session → land on `/app/o/[orgId]`.
3. **Login** (`/login`): email + access token → hash-compare → session. Wrong/again → generic message. Rate-limited.
4. **Recover** (`/recover`): "I lost my token" → revoke active tokens, queue new-token issuance (flag `manual_review_required` accounts for ops approval). Generic message. Never says whether the account exists.
5. **Workspace overview** (`/app/o/[orgId]`): real counts (ready/pending reports, active token, retention), latest report card, decision rows **only from a real report** (or empty state if none).
6. **Uploads** (`/app/o/[orgId]/uploads`): list real uploads; **New upload** → multipart file input → server parse → preflight → create `report_job`. Show parse result + estimated cost + resulting status. Reject disallowed types/oversize with clear errors.
7. **Reports** (`/app/o/[orgId]/reports` + `/reports/[reportId]`): list; detail shows the stored HTML in-panel + **Download PDF** (print-optimized; see §7) + **Download source summary**. Only `report_ready` reports are openable.
8. **Settings**: edit retention policy, notification email, deployment preference — persisted + audited.
9. **Access**: show active token (last4 + lastUsed); **Request rotation** → revoke + issue new (one-time reveal), audited.
10. **Logout**.

### 5.3 Ops flows (hidden; each → real DB + audit)
1. **Login** at `/[OPS_LOGIN_SLUG]`: email + password + ops second key (+ TOTP if enabled). Rate-limited. Generic failures.
2. **Dashboard / Job queue**: list `report_jobs` grouped by status; each → detail: account, upload metadata, preflight numbers, coupon, sensitivity. Actions:
   - **Approve** (only if ≤ approved limit & ≤ remaining monthly budget) → `approved` → auto `processing` → `report_ready` (simulated, §7) → queue `report_ready` email.
   - **Special-approve**: raise `approvedCostLimitUsd` (≤ hard cap or coupon cap) with a required reason.
   - **Reject** (reason) / **Request more info** / **Delete upload/data** (purges raw text, audited).
3. **Accounts**: list/detail; set `defaultMaxEstimatedCostUsd`; view users/tokens/uploads/reports; **view-as-customer (read-only)** for support (audited).
4. **Coupons**: **Generate** (limit, kind, reason, expiry, optional max emails/MB/files) → code shown **once** (copy) → store hash+last4; list; **Revoke**.
5. **Audit log**: filterable timeline (actor, action, target type, date range).
6. **Email outbox**: view queued/sent; if no provider configured, show pending magic-links/codes/tokens so the founder can relay them via a separate channel (this doubles as the spec's "hassas pilotlarda token ayrı kanaldan verilir"); **Mark sent**.
7. **Settings / kill-switch**: toggle `disableNewPilots`, `maintenanceMode`; set `maxMonthlySpendUsd`; view `currentMonthSpendUsd` gauge.

## 6. Auth & ops-hiding (decided: app-level, not obvious, no platform gate)

- **Two separate realms**: customer (passwordless: email + workspace token) and ops (email + password + ops second key). Separate session tables + separate cookies (`dc_sess` / `dc_ops`). Never accept one realm's session for the other.
- **Ops invisibility (cheap but effective):**
  - Edge middleware: any request to `/ops/*` **without a valid ops session → return 404** (render the normal not-found page; do not reveal existence, do not redirect to a login).
  - The ops **login page lives at `/[OPS_LOGIN_SLUG]`** where `OPS_LOGIN_SLUG` is a non-guessable env value (e.g. a 24-char random slug). Not linked anywhere. `noindex,nofollow` on all ops + auth pages.
  - Ops accounts are **seeded only** (no registration, no public recovery form that confirms existence).
  - argon2id passwords; ops second key hashed too; TOTP optional (scaffold it, default off — keep it "abartmadan").
  - Rate-limit ops login attempts (lockout/backoff). Audit every ops login (success & failure, ip hash).
- **Customer security**: email alone never opens the workspace — the access token is a required second factor. Hash tokens; rotate on demand; generic responses; audit every token issue/use/revoke.
- **General**: httpOnly+Secure+SameSite cookies; CSRF protection on mutations (server actions or double-submit token); zod-validate all inputs; no account enumeration on login/register/recover.

## 7. Simulated report generation (no engine, no LLM)

When a job is approved → `processing` → `report_ready`:
- Generate a **branded HTML report** in the parchment "Karar Sicili" style (cover, method/limits, CTA). It must carry a clear banner: **"Bu rapor simülasyondur — Decdock motoru bu kuruluma bağlı değildir."**
- Content is grounded in **real upload metadata only**: number of emails/files parsed, distinct senders, date range, size. **Do not invent decisions, owners, or confidence.** Optionally list parsed email subjects/senders as a neutral "structure preview." (Honesty rule, §2.2.)
- Store HTML in `reports.htmlContent` with `isSimulated=true`. Set `actualCostUsd = estimatedCostUsd` and **increment `app_settings.currentMonthSpendUsd`** (so the spend ledger behaves end-to-end now).
- **PDF**: for v0, deliver via a **print-optimized stylesheet** ("Download PDF" opens a print view). Avoid bundling headless Chromium on serverless. Note a serverless PDF lib as a later upgrade.
- Then queue a `report_ready` email (secure, time-limited link to the in-panel report; **never attach raw PDF**).

## 7b. Claude's infra additions ("şaşırt" — build these too)

These are deliberate infrastructure investments that match what Decdock *is* (auditable, cost-disciplined, privacy-first):
1. **Audit log as a first-class, append-only feature** with an ops timeline UI. Decdock sells auditable records — the console should eat its own dog food.
2. **Real cost ledger + global kill-switch** (`app_settings`): monthly cap + current spend; every approval checks remaining budget; nothing can exceed it. A runaway bug cannot run up a bill — a good habit *before* any LLM exists.
3. **One-time secret reveal** for coupons & access tokens (hash + last4 stored; raw shown once, copyable).
4. **Email outbox + manual-delivery surfacing** — the full flow works with zero email provider configured; pending links/tokens are visible to ops for out-of-band delivery (also the secure path for sensitive pilots).
5. **Enforced job state machine**: a transition table; illegal transitions return 409 and are audited. (Allowed: draft→uploaded→estimated→{awaiting_admin_approval|requires_special_approval}→approved→processing→report_ready; plus →failed/cancelled/deleted from sensible states.)
6. **Retention sweeper** (Vercel Cron, daily): purges raw `extractedText` per each account's `retentionPolicy`; writes audit rows; **never** deletes operational metadata or audit history.
7. **Seed script**: your ops account (from env), a `demo-org`, one completed simulated report, one pending job — so panels are never empty in dev.
8. **Rate limiting** on register/login/recover/upload (simple fixed-window in Postgres, or Upstash if `UPSTASH_*` set) — the spec's abuse control.
9. **Customer-visible activity log** (optional, transparency = trust): the account's own audit slice, read-only, in the customer panel.

## 8. Security & privacy checklist (must all hold)
- argon2id for passwords/keys; SHA-256 (or hash+last4) for tokens/coupons; raw secrets shown once, never logged.
- httpOnly/Secure/SameSite cookies; CSRF on mutations; zod on all inputs; no SQL string-building (Drizzle params only).
- No account enumeration anywhere. Audit every sensitive action with ip **hash** (not raw IP) + UA.
- Per-account data isolation: every query filtered by `accountId`; customer can never read another org (verify in middleware + queries).
- In-product KVKK/usage promise text: *"Ham müşteri verisini model eğitimi veya genel ürün kalibrasyonu için kullanmayız. İçerik incelemesi gerekirse açık izin, süre sınırı ve audit log ile."*
- Secrets only in env (`DATABASE_URL`, `OPS_LOGIN_SLUG`, `SESSION_SECRET`, `OPS_SEED_EMAIL`, `OPS_SEED_PASSWORD`, optional `RESEND_API_KEY`, `UPSTASH_*`). Provide `.env.example`.

## 9. Conceptual adapter map (keep for later engine wiring — do not implement)
```
pilot_request            -> tenant / workspace
upload                   -> raw source / import batch
report_job               -> extraction run / processing job
report                   -> digest / report artifact
coupon                   -> billing credit / usage guard
team_lead.assign_owner   -> claim owner update      (future)
team_lead.resolve_conflict -> review item / supersession (future)
audit_log                -> governance event
```
Isolate all "report processing" behind a single `processReportJob(jobId)` function whose body is the simulation today and the engine adapter tomorrow.

## 10. Build order (phases — ship each working)
1. **Scaffold**: Next.js + Tailwind + Drizzle + Neon; schema + first migration; session module + argon2; `.env.example`; seed script.
2. **Customer auth + workspace shell**: register → verify → token issue → login → org-scoped workspace (overview/empty states).
3. **Upload → preflight → job**: real parse, real cost estimate, job creation + state machine.
4. **Ops console**: hidden login + 404 gate; job queue + approve/special/reject/delete; coupon generate/revoke; accounts; audit timeline; outbox; kill-switch.
5. **Simulated report + delivery**: `processReportJob`, report HTML, print-PDF, report_ready email (outbox), spend ledger increment.
6. **Infra extras + cron**: retention sweeper, rate limiting, view-as, customer activity log.
7. **Polish + deploy**: design pass to match parchment system; README; deploy to Vercel + Neon; verify acceptance criteria.

## 11. Definition of Done
- `pnpm typecheck`, `pnpm lint`, `pnpm build` all green; TS strict, no `any`.
- Every button/link in both panels performs a real, persisted, audited action (no dead handlers).
- Full customer flow works end-to-end: register → verify → upload → preflight → (ops approves) → report_ready → view/download.
- Full ops flow works: hidden login, job approval/rejection, coupon gen (one-time reveal), audit timeline, kill-switch, outbox.
- **Ops invisibility verified**: hitting `/ops` or any ops route while logged out returns **404**; the login slug is env-driven and unlinked; ops pages are `noindex`.
- No secret is ever logged or stored raw; tokens/coupons are hash+last4; passwords argon2id.
- Cost guard holds: a job over its approved limit or over remaining monthly budget cannot enter `processing`.
- Retention sweeper, seed script, and rate limiting work. Minimal tests for: cost-estimate math, job state-machine transitions, ops 404 gate, account isolation.
- `README.md` documents env vars, local setup (Neon), seeding, and deploy.

## 12. Deliverables
A `decdock-console` repo containing: the Next.js app, Drizzle schema + migrations, seed script, `.env.example`, the above tests, and a README. Ship it deployable to Vercel + the existing Neon database.
