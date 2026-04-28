const distinctions = [
  'Decisions, not just information',
  'Ownership, not just attribution',
  'Review state, not just capture',
  'Provenance-first, not pattern-first',
]

export default function Differentiation() {
  return (
    <section className="section-band py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="eyebrow-plain">What makes it different</div>
        <h2 className="mb-16 max-w-[12ch] font-display text-[38px] font-[600] leading-[1.08] tracking-[-0.03em] text-[var(--text-strong)]">
          Not search. Not summaries. Decision memory.
        </h2>

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          <div className="page-panel rounded-[26px] p-6">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-faint)]">
              Enterprise search
            </div>
            <h3 className="mb-3 text-[18px] font-semibold text-[var(--text-strong)]">Finds information</h3>
            <p className="text-[14px] leading-[1.75] text-[var(--text-body)]">
              Search helps you find what is already there when you know what to look for.
              It surfaces documents and messages. It does not tell you which decisions
              still hold, who owns them, or whether they have been superseded.
            </p>
          </div>

          <div className="page-panel rounded-[26px] p-6">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-faint)]">
              Meeting summaries
            </div>
            <h3 className="mb-3 text-[18px] font-semibold text-[var(--text-strong)]">Compresses conversations</h3>
            <p className="text-[14px] leading-[1.75] text-[var(--text-body)]">
              Summaries reduce reading time. You still have to interpret them for
              decisions. They do not track ownership, follow validity over time, or
              surface when something needs review.
            </p>
          </div>

          <div className="page-panel-dark relative overflow-hidden rounded-[26px] p-6">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(255,248,239,0.12),transparent_70%)]" />
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[rgba(226,210,193,0.72)]">
              Decdock Core
            </div>
            <h3 className="mb-3 text-[18px] font-semibold text-white">
              Tracks decisions as living memory
            </h3>
            <p className="text-[14px] leading-[1.75] text-[rgba(239,230,220,0.84)]">
              Decdock Core treats decisions as first-class records, not text to be
              retrieved. Each record carries source, owner, confidence, and review state.
              It surfaces them when relevant. It flags when they are at risk.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {distinctions.map((distinction) => (
            <div
              key={distinction}
              className="surface-tag flex items-center gap-2.5 px-4 py-3"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
              <span className="text-[13px] font-medium text-[var(--text-strong)]">{distinction}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
