interface Scenario {
  type: string
  situation: string
  problem: string
  withDecdeck: string
}

const scenarios: Scenario[] = [
  {
    type: 'Stale decision',
    situation:
      'Leadership agrees in a meeting that pricing will change next quarter.',
    problem:
      'Two months later, the decision is buried in meeting notes and Slack threads. No one remembers who owns it, what was exactly agreed, or whether it was ever acted on.',
    withDecdeck:
      'Decdeck Core captures the decision at source — with owner, context, and review state. It resurfaces automatically as the deadline approaches.',
  },
  {
    type: 'Conflicting decisions',
    situation:
      'A product team agrees to pause a feature due to customer risk.',
    problem:
      'Three months later, a different team restarts similar work without visibility into the earlier decision. Two workstreams now conflict — silently, until late in the cycle.',
    withDecdeck:
      'Decdeck Core surfaces the existing decision when related work begins and flags the potential conflict — before duplicate effort compounds.',
  },
  {
    type: 'Owner drift',
    situation:
      'Operations assigns clear ownership for a process change after a reorg.',
    problem:
      'After further team restructuring, nobody knows who owns the decision anymore. It drifts without anyone noticing — until something goes wrong.',
    withDecdeck:
      'Decdeck Core tracks owner changes over time. When a decision becomes effectively ownerless, it is flagged for reassignment — not silently abandoned.',
  },
  {
    type: 'Decision validity',
    situation:
      'A company has hundreds of meeting summaries, docs, and channel archives.',
    problem:
      'There is no living view of which decisions are still valid, which are superseded, and which are simply forgotten. All of it looks the same in search.',
    withDecdeck:
      'Decdeck Core distinguishes remembered information from accountable decisions — and tracks the current standing of each one, not just its existence.',
  },
]

export default function Scenarios() {
  return (
    <section className="border-t border-[#E4E2DB] bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.09em] text-[#B87A3A]">
          Real scenarios
        </div>
        <div className="mb-16 grid gap-4 lg:grid-cols-2 lg:items-end">
          <h2 className="font-display text-[34px] font-[800] leading-[1.12] tracking-[-0.02em] text-[#1A1916]">
            This isn't hypothetical. It happens every week.
          </h2>
          <p className="text-[16px] leading-[1.7] text-[#57554F]">
            Four ways decisions get lost — and what Decdeck Core does about each one.
          </p>
        </div>

        {/* Scenario cards */}
        <div className="grid gap-5 md:grid-cols-2">
          {scenarios.map((s) => (
            <div
              key={s.type}
              className="rounded-xl border border-[#E4E2DB] bg-[#F8F7F4] p-6"
            >
              {/* Type badge */}
              <span className="mb-4 inline-block rounded-full border border-[#E4E2DB] bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.07em] text-[#57554F]">
                {s.type}
              </span>

              {/* Situation */}
              <p className="mb-4 text-[15px] font-[550] leading-snug text-[#1A1916]">
                "{s.situation}"
              </p>

              {/* Problem */}
              <p className="mb-5 border-b border-[#E4E2DB] pb-5 text-[14px] leading-[1.65] text-[#57554F]">
                {s.problem}
              </p>

              {/* Resolution */}
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1C3450]">
                  <svg width="10" height="8" fill="none" viewBox="0 0 10 8" aria-hidden="true">
                    <path
                      d="M1 4l2.5 2.5L9 1"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="text-[14px] leading-[1.65] text-[#1A1916]">
                  <span className="font-semibold">With Decdeck Core: </span>
                  {s.withDecdeck}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
