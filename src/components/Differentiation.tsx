export default function Differentiation() {
  return (
    <section className="section-band py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="eyebrow-plain">Why this is not search or summaries</div>
        <h2 className="mb-12 max-w-[13ch] font-display text-[38px] font-[600] leading-[1.08] text-[var(--text-strong)]">
          Decdock Core tracks the decision itself.
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="page-panel rounded-[24px] p-6">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-faint)]">
              Search
            </div>
            <h3 className="mb-3 text-[18px] font-semibold text-[var(--text-strong)]">
              Finds documents
            </h3>
            <p className="text-[14px] leading-[1.65] text-[var(--text-body)]">
              Search can find the note or thread. It does not keep the decision, owner, or review state together.
            </p>
          </div>

          <div className="page-panel rounded-[24px] p-6">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-faint)]">
              Summaries
            </div>
            <h3 className="mb-3 text-[18px] font-semibold text-[var(--text-strong)]">
              Compress conversations
            </h3>
            <p className="text-[14px] leading-[1.65] text-[var(--text-body)]">
              Summaries shorten the reading. Teams still have to work out whether a decision was real, current, and assigned.
            </p>
          </div>

          <div className="page-panel-dark relative overflow-hidden rounded-[24px] p-6">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(255,248,239,0.12),transparent_70%)]" />
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[rgba(226,210,193,0.72)]">
              Decdock Core
            </div>
            <h3 className="mb-3 text-[18px] font-semibold text-white">
              Keeps the decision in context
            </h3>
            <p className="text-[14px] leading-[1.65] text-[rgba(239,230,220,0.84)]">
              Decdock Core keeps the decision, source, owner, and review state together - then highlights what may need review later.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
