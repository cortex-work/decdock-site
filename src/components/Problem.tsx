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
    detail: 'Context split across inboxes and reply threads — no single record.',
  },
  {
    label: 'Documents and wikis',
    detail: 'A snapshot in time. Not updated when the decision evolves.',
  },
  {
    label: 'Project and tracking tools',
    detail: 'Comments that reference decisions, not the decisions themselves.',
  },
]

export default function Problem() {
  return (
    <section className="border-t border-[#E4E2DB] bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* Left: framing */}
          <div>
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.09em] text-[#B87A3A]">
              The problem
            </div>
            <h2 className="mb-5 font-display text-[34px] font-[800] leading-[1.12] tracking-[-0.02em] text-[#1A1916]">
              Companies don't lose decisions because people are careless.
            </h2>
            <p className="mb-6 text-[17px] font-medium leading-[1.65] text-[#57554F]">
              They lose them because decisions live everywhere — and nowhere.
            </p>
            <p className="mb-6 text-[15px] leading-[1.75] text-[#57554F]">
              A decision made in Tuesday's meeting lives in the notes. It travels to a
              Slack thread. Someone references it in a doc. Two months later, the person
              who owns it has moved to a new team. No one is certain it still stands.
              No one knows what was actually agreed.
            </p>
            <p className="text-[15px] leading-[1.75] text-[#57554F]">
              The cost isn't a single missed decision. It's the slow accumulation of
              stale ownership, invisible conflicts, and forgotten commitments — compounding
              across every team, every quarter.
            </p>
          </div>

          {/* Right: scatter sources */}
          <div>
            <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.09em] text-[#9B978F]">
              Where decisions scatter
            </div>
            <div className="space-y-3">
              {scatterSources.map((s) => (
                <div
                  key={s.label}
                  className="flex items-start gap-4 rounded-lg border border-[#E4E2DB] bg-[#F8F7F4] p-4"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B87A3A]" />
                  <div>
                    <div className="text-[14px] font-semibold text-[#1A1916]">{s.label}</div>
                    <div className="mt-0.5 text-[13px] text-[#57554F]">{s.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
