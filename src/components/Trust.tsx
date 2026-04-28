const principles = [
  {
    title: 'Provenance-first',
    description:
      'Every decision record links to its source: the meeting, the message, the document. No claims without a reference. No orphaned conclusions.',
  },
  {
    title: 'Human review before ratification',
    description:
      'Decisions are surfaced for human confirmation before they are treated as ratified. The system assists judgment. It does not replace it.',
  },
  {
    title: 'Confidence-aware',
    description:
      'Each record carries a confidence level derived from signal strength. Uncertain decisions are separated from firm ones and never merged or hidden.',
  },
  {
    title: 'Owner-aware',
    description:
      'Ownership is tracked over time. When it becomes ambiguous because of team changes, departures, or reorgs, the system flags it instead of silently failing.',
  },
  {
    title: 'Lightweight surfacing',
    description:
      'Built for busy teams. Decisions surface through existing workflows, not through a dashboard that requires daily visits to deliver value.',
  },
  {
    title: 'Designed for governance',
    description:
      'Accountability and traceability are in the architecture, not bolted on. Decdock Core is built for organizations where decisions have consequences.',
  },
]

export default function Trust() {
  return (
    <section className="section-band-soft py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="eyebrow-plain">Trust and governance</div>
        <div className="mb-16 grid gap-5 lg:grid-cols-2 lg:items-end">
          <h2 className="max-w-[14ch] font-display text-[38px] font-[600] leading-[1.08] tracking-[-0.03em] text-[var(--text-strong)]">
            Built for organizations where decisions have consequences.
          </h2>
          <p className="max-w-[54ch] text-[16px] leading-[1.8] text-[var(--text-body)]">
            Governance and human review are not add-ons in Decdock Core. They are
            the architecture. No blind automation. No false confidence.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => (
            <div key={principle.title} className="page-panel rounded-[24px] p-6">
              <h3 className="mb-2.5 text-[15px] font-semibold text-[var(--text-strong)]">{principle.title}</h3>
              <p className="text-[14px] leading-[1.75] text-[var(--text-body)]">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
