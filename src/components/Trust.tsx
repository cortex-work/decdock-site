const principles = [
  {
    title: 'Provenance-first',
    description:
      'Every decision record links to its source — the meeting, the message, the document. No claims without a reference. No orphaned conclusions.',
  },
  {
    title: 'Human review before ratification',
    description:
      'Decisions are surfaced for human confirmation before they are treated as ratified. The system assists judgment. It does not replace it.',
  },
  {
    title: 'Confidence-aware',
    description:
      'Each record carries a confidence level derived from signal strength. Uncertain decisions are separated from firm ones — never merged or hidden.',
  },
  {
    title: 'Owner-aware',
    description:
      'Ownership is tracked over time. When it becomes ambiguous — because of team changes, departures, or reorgs — the system flags it rather than silently failing.',
  },
  {
    title: 'Lightweight surfacing',
    description:
      'Built for busy teams. Decisions surface through existing workflows — not through a dashboard that requires daily visits to deliver value.',
  },
  {
    title: 'Designed for governance',
    description:
      'Accountability and traceability are in the architecture, not bolted on. Decdock Core is built for organizations where decisions have consequences.',
  },
]

export default function Trust() {
  return (
    <section className="border-t border-[#E4E2DB] bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.09em] text-[#B87A3A]">
          Trust and governance
        </div>
        <div className="mb-16 grid gap-4 lg:grid-cols-2 lg:items-end">
          <h2 className="font-display text-[34px] font-[800] leading-[1.12] tracking-[-0.02em] text-[#1A1916]">
            Built for organizations where decisions have consequences.
          </h2>
          <p className="text-[16px] leading-[1.7] text-[#57554F]">
            Governance and human review are not add-ons in Decdock Core — they are
            the architecture. No blind automation. No false confidence.
          </p>
        </div>

        {/* Principles grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="rounded-xl border border-[#E4E2DB] p-6">
              <h3 className="mb-2 text-[15px] font-semibold text-[#1A1916]">{p.title}</h3>
              <p className="text-[14px] leading-[1.7] text-[#57554F]">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
