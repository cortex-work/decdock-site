const scatterSources = [
  {
    label: 'Leadership meetings',
    detail: 'Captured in notes, shared once, rarely revisited.',
  },
  {
    label: 'Slack and Teams threads',
    detail: 'Buried under hundreds of subsequent messages.',
  },
  {
    label: 'Email chains',
    detail: 'Context split across inboxes and reply threads with no single record.',
  },
  {
    label: 'Documents and wikis',
    detail: 'A snapshot in time, not updated when the decision evolves.',
  },
  {
    label: 'Project and tracking tools',
    detail: 'Comments that reference decisions, not the decisions themselves.',
  },
]

export default function Problem() {
  return (
    <section className="section-band-soft py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <div className="eyebrow-plain">The problem</div>
            <h2 className="mb-5 max-w-[14ch] font-display text-[38px] font-[600] leading-[1.08] tracking-[-0.03em] text-[var(--text-strong)]">
              Companies do not lose decisions because people are careless.
            </h2>
            <p className="mb-6 text-[17px] font-medium leading-[1.75] text-[var(--text-body)]">
              They lose them because decisions live everywhere and nowhere.
            </p>
            <p className="mb-6 max-w-[58ch] text-[15px] leading-[1.8] text-[var(--text-body)]">
              A decision made in Tuesday&apos;s meeting lives in the notes. It travels to a
              Slack thread. Someone references it in a doc. Two months later, the person
              who owns it has moved to a new team. No one is certain it still stands.
              No one knows what was actually agreed.
            </p>
            <p className="max-w-[58ch] text-[15px] leading-[1.8] text-[var(--text-body)]">
              The cost is not a single missed decision. It is the slow accumulation of
              stale ownership, invisible conflicts, and forgotten commitments,
              compounding across every team and every quarter.
            </p>
          </div>

          <div className="page-panel-strong rounded-[28px] p-6 sm:p-7">
            <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-faint)]">
              Where decisions scatter
            </div>
            <div className="space-y-3">
              {scatterSources.map((source) => (
                <div
                  key={source.label}
                  className="rounded-[20px] border border-[var(--line-soft)] bg-[rgba(255,255,255,0.56)] p-4 shadow-[0_10px_28px_rgba(25,32,40,0.05)]"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                    <div className="text-[14px] font-semibold text-[var(--text-strong)]">{source.label}</div>
                  </div>
                  <div className="pl-5 text-[13.5px] leading-[1.7] text-[var(--text-body)]">{source.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
