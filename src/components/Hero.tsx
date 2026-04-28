interface MetaRowProps {
  label: string
  value: string
  dot?: 'amber' | 'green'
}

function MetaRow({ label, value, dot }: MetaRowProps) {
  const dotColors = {
    amber: 'bg-[var(--warning)]',
    green: 'bg-[var(--success)]',
  }

  return (
    <div className="flex items-center gap-2">
      <span className="w-[108px] shrink-0 text-[11.5px] text-[var(--text-faint)]">{label}</span>
      <div className="flex items-center gap-2">
        {dot && <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotColors[dot]}`} />}
        <span className="text-[12.5px] text-[var(--text-strong)]">{value}</span>
      </div>
    </div>
  )
}

function DecisionCard() {
  return (
    <div className="relative mx-auto max-w-[420px] select-none">
      <div className="pointer-events-none absolute inset-0 -z-10 translate-y-5 rounded-[30px] border border-[var(--line-soft)] bg-[rgba(255,255,255,0.26)] shadow-[0_16px_40px_rgba(24,30,37,0.06)]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-[30px] border border-[var(--line-soft)] bg-[rgba(255,255,255,0.34)]"
        style={{ transform: 'rotate(2.4deg) translateY(12px) translateX(10px)' }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-[30px] border border-[var(--line-soft)] bg-[rgba(255,255,255,0.45)]"
        style={{ transform: 'rotate(1.1deg) translateY(6px) translateX(4px)' }}
      />
      <div className="pointer-events-none absolute -inset-10 -z-20 rounded-full bg-[radial-gradient(circle,rgba(217,204,184,0.55),rgba(179,195,211,0.22),transparent_72%)] blur-3xl" />

      <div className="relative overflow-hidden rounded-[28px] border border-[var(--line-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(246,241,232,0.96))] shadow-card-lg">
        <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0))]" />

        <div className="relative flex items-center justify-between border-b border-[var(--line-soft)] px-5 py-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-faint)]">
              Decision record
            </span>
            <div className="mt-0.5 text-[11px] text-[var(--text-faint)]">Executive sync &middot; March 14, 2026</div>
          </div>
          <span className="rounded-full border border-[rgba(92,131,104,0.16)] bg-[rgba(233,243,236,0.95)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--success)]">
            Active
          </span>
        </div>

        <div className="px-5 py-5">
          <p className="text-[15px] font-[600] leading-snug text-[var(--text-strong)]">
            Pricing structure to be revised for Q2 2026. Final approval required before January 31.
          </p>
        </div>

        <div className="space-y-2.5 border-t border-[var(--line-soft)] px-5 py-4">
          <MetaRow label="Owner" value="CFO - Finance" />
          <MetaRow label="Source" value="Executive sync - Zoom" />
          <MetaRow label="Review state" value="Pending confirmation" dot="amber" />
          <MetaRow label="Confidence" value="High" dot="green" />
        </div>

        <div className="border-t border-[var(--line-soft)] px-5 py-4">
          <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-faint)]">
            Source trail
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="surface-tag px-2.5 py-1 text-[11px] font-medium text-[var(--text-body)]">
              Executive sync
            </span>
            <span className="text-[12px] text-[var(--text-faint)]">&rarr;</span>
            <span className="surface-tag px-2.5 py-1 text-[11px] font-medium text-[var(--text-body)]">
              Follow-up email
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-16 lg:pb-32 lg:pt-24">
      <div className="page-panel relative overflow-hidden rounded-[32px] px-8 py-10 lg:px-10 lg:py-12 xl:px-14 xl:py-14">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3),transparent_72%)] lg:block" />
        <div className="pointer-events-none absolute left-10 top-0 h-32 w-32 rounded-full bg-[rgba(255,255,255,0.34)] blur-3xl" />

        <div className="grid items-center gap-14 lg:grid-cols-[1fr_420px] xl:gap-20">
          <div className="relative">
            <div className="eyebrow mb-7">Decdock Core &middot; Early access</div>

            <h1 className="mb-6 max-w-[11ch] font-display text-[48px] font-[600] leading-[1.02] tracking-[-0.035em] text-[var(--text-strong)] sm:text-[56px] xl:text-[66px]">
              Your company makes hundreds of decisions.{' '}
              <span className="text-[rgba(34,49,66,0.58)]">Most of them disappear.</span>
            </h1>

            <p className="mb-10 max-w-[540px] text-[17px] leading-[1.8] text-[var(--text-body)]">
              Decdock Core captures organizational decisions with source context,
              ownership, and review state, then surfaces them when they matter most.
            </p>

            <div className="mb-12 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:pilot@decdock.com"
                className="button-primary px-6 py-3 text-[14px] font-semibold"
              >
                Request pilot access
              </a>
              <a
                href="#how-it-works"
                className="button-secondary px-6 py-3 text-[14px] font-medium"
              >
                See how it works
              </a>
            </div>

            <p className="text-[13px] text-[var(--text-muted)]">
              Designed for COOs, Chiefs of Staff, and operations leaders.
            </p>
          </div>

          <div className="hidden lg:block">
            <DecisionCard />
          </div>
        </div>
      </div>
    </section>
  )
}
