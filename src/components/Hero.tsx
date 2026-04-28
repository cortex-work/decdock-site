// Hero — decision card visual on the right; copy on the left

interface MetaRowProps {
  label: string
  value: string
  dot?: 'amber' | 'green'
}

function MetaRow({ label, value, dot }: MetaRowProps) {
  const dotColors = { amber: 'bg-[#D4883A]', green: 'bg-[#4A9E72]' }
  return (
    <div className="flex items-center gap-1">
      <span className="w-[108px] shrink-0 text-[11.5px] text-[#9B978F]">{label}</span>
      <div className="flex items-center gap-1.5">
        {dot && <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotColors[dot]}`} />}
        <span className="text-[12.5px] text-[#1A1916]">{value}</span>
      </div>
    </div>
  )
}

function DecisionCard() {
  return (
    <div className="relative select-none">
      {/* Ghost cards stacked behind */}
      <div
        className="absolute inset-0 rounded-xl border border-[#E4E2DB] bg-white"
        style={{ transform: 'rotate(2.8deg) translateY(10px) translateX(8px)', opacity: 0.3 }}
      />
      <div
        className="absolute inset-0 rounded-xl border border-[#E4E2DB] bg-white"
        style={{ transform: 'rotate(1.3deg) translateY(5px) translateX(4px)', opacity: 0.55 }}
      />

      {/* Main card */}
      <div className="relative overflow-hidden rounded-xl border border-[#E4E2DB] bg-white shadow-card-lg">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-[#F0EDE6] px-5 py-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9B978F]">
              Decision Record
            </span>
            <div className="mt-0.5 text-[11px] text-[#B4B0A7]">Executive sync · March 14, 2026</div>
          </div>
          <span className="rounded-full bg-[#EBF4F0] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#3A8A5C]">
            Active
          </span>
        </div>

        {/* Decision text */}
        <div className="px-5 py-5">
          <p className="text-[14.5px] font-[550] leading-snug text-[#1A1916]">
            Pricing structure to be revised for Q2 2026. Final approval required before January 31.
          </p>
        </div>

        {/* Metadata */}
        <div className="space-y-2.5 border-t border-[#F0EDE6] px-5 py-4">
          <MetaRow label="Owner" value="CFO · Finance" />
          <MetaRow label="Source" value="Executive sync — Zoom" />
          <MetaRow label="Review state" value="Pending confirmation" dot="amber" />
          <MetaRow label="Confidence" value="High" dot="green" />
        </div>

        {/* Source trail */}
        <div className="border-t border-[#F0EDE6] px-5 py-4">
          <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9B978F]">
            Source trail
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded border border-[#E4E2DB] bg-[#F8F7F4] px-2.5 py-1 text-[11px] font-medium text-[#57554F]">
              Executive sync
            </span>
            <span className="text-[12px] text-[#C8C4BC]">→</span>
            <span className="rounded border border-[#E4E2DB] bg-[#F8F7F4] px-2.5 py-1 text-[11px] font-medium text-[#57554F]">
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
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-20 lg:pb-28 lg:pt-28">
      <div className="grid items-center gap-16 lg:grid-cols-[1fr_420px] xl:gap-24">
        {/* Copy */}
        <div>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#E4E2DB] bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.09em] text-[#B87A3A]">
            Decdock Core&nbsp;·&nbsp;Early access
          </div>

          <h1 className="mb-6 font-display text-[46px] font-[800] leading-[1.05] tracking-[-0.03em] text-[#1A1916] xl:text-[56px]">
            Your company makes hundreds of decisions.{' '}
            <span className="text-[#8A8680]">Most of them disappear.</span>
          </h1>

          <p className="mb-10 max-w-[500px] text-[17px] leading-[1.7] text-[#57554F]">
            Decdock Core captures organizational decisions — with source context,
            ownership, and review state — and surfaces them when they matter most.
          </p>

          <div className="mb-12 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:pilot@decdock.com"
              className="inline-flex items-center justify-center rounded-md bg-[#1C3450] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#152840]"
            >
              Request pilot access
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-md border border-[#E4E2DB] bg-white px-6 py-3 text-[14px] font-medium text-[#57554F] transition-colors hover:border-[#CCCABD] hover:text-[#1A1916]"
            >
              See how it works
            </a>
          </div>

          <p className="text-[13px] text-[#9B978F]">
            Designed for COOs, Chiefs of Staff, and operations leaders.
          </p>
        </div>

        {/* Decision card — hidden on small screens */}
        <div className="hidden lg:block">
          <DecisionCard />
        </div>
      </div>
    </section>
  )
}
