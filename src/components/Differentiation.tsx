const distinctions = [
  'Decisions, not just information',
  'Ownership, not just attribution',
  'Review state, not just capture',
  'Provenance-first, not pattern-first',
]

export default function Differentiation() {
  return (
    <section className="border-t border-[#E4E2DB] py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.09em] text-[#B87A3A]">
          What makes it different
        </div>
        <h2 className="mb-16 font-display text-[34px] font-[800] leading-[1.12] tracking-[-0.02em] text-[#1A1916] max-w-lg">
          Not search. Not summaries. Decision memory.
        </h2>

        {/* Three-column comparison */}
        <div className="mb-8 grid gap-5 md:grid-cols-3">
          {/* Enterprise search */}
          <div className="rounded-xl border border-[#E4E2DB] bg-white p-6">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9B978F]">
              Enterprise search
            </div>
            <h3 className="mb-3 text-[18px] font-semibold text-[#1A1916]">Finds information</h3>
            <p className="text-[14px] leading-[1.7] text-[#57554F]">
              Search helps you find what's already there — when you know what to look for.
              It surfaces documents and messages. It doesn't tell you which decisions
              still hold, who owns them, or whether they've been superseded.
            </p>
          </div>

          {/* AI meeting summaries */}
          <div className="rounded-xl border border-[#E4E2DB] bg-white p-6">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9B978F]">
              Meeting summaries
            </div>
            <h3 className="mb-3 text-[18px] font-semibold text-[#1A1916]">Compresses conversations</h3>
            <p className="text-[14px] leading-[1.7] text-[#57554F]">
              Summaries reduce reading time. You still have to interpret them for
              decisions. They don't track ownership, follow validity over time, or
              surface when something needs review.
            </p>
          </div>

          {/* Decdeck Core — highlighted */}
          <div className="rounded-xl border border-[#1C3450] bg-[#1C3450] p-6">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7A98B8]">
              Decdeck Core
            </div>
            <h3 className="mb-3 text-[18px] font-semibold text-white">
              Tracks decisions as living memory
            </h3>
            <p className="text-[14px] leading-[1.7] text-[#A8C0D8]">
              Decdeck Core treats decisions as first-class records — not text to be
              retrieved. Each record carries source, owner, confidence, and review state.
              It surfaces them when relevant. It flags when they're at risk.
            </p>
          </div>
        </div>

        {/* Key distinctions */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {distinctions.map((d) => (
            <div
              key={d}
              className="flex items-center gap-2.5 rounded-lg border border-[#E4E2DB] bg-white px-4 py-3"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#B87A3A]" />
              <span className="text-[13px] font-medium text-[#1A1916]">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
