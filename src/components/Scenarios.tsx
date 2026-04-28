interface Scenario {
  type: string
  situation: string
  problem: string
  withDecdock: string
}

const scenarios: Scenario[] = [
  {
    type: 'Stale decision',
    situation:
      'Leadership agrees in a meeting that pricing will change next quarter.',
    problem:
      'Two months later, the decision is buried in meeting notes and Slack threads. No one remembers who owns it, what was exactly agreed, or whether it was ever acted on.',
    withDecdock:
      'Decdock Core captures the decision at source with owner, context, and review state. It resurfaces automatically as the deadline approaches.',
  },
  {
    type: 'Conflicting decisions',
    situation:
      'A product team agrees to pause a feature due to customer risk.',
    problem:
      'Three months later, a different team restarts similar work without visibility into the earlier decision. Two workstreams now conflict silently until late in the cycle.',
    withDecdock:
      'Decdock Core surfaces the existing decision when related work begins and flags the potential conflict before duplicate effort compounds.',
  },
  {
    type: 'Owner drift',
    situation:
      'Operations assigns clear ownership for a process change after a reorg.',
    problem:
      'After further team restructuring, nobody knows who owns the decision anymore. It drifts without anyone noticing until something goes wrong.',
    withDecdock:
      'Decdock Core tracks owner changes over time. When a decision becomes effectively ownerless, it is flagged for reassignment instead of being silently abandoned.',
  },
  {
    type: 'Decision validity',
    situation:
      'A company has hundreds of meeting summaries, docs, and channel archives.',
    problem:
      'There is no living view of which decisions are still valid, which are superseded, and which are simply forgotten. All of it looks the same in search.',
    withDecdock:
      'Decdock Core distinguishes remembered information from accountable decisions and tracks the current standing of each one, not just its existence.',
  },
]

export default function Scenarios() {
  return (
    <section className="section-band-muted py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="eyebrow-plain">Real scenarios</div>
        <div className="mb-16 grid gap-5 lg:grid-cols-2 lg:items-end">
          <h2 className="max-w-[12ch] font-display text-[38px] font-[600] leading-[1.08] tracking-[-0.03em] text-[var(--text-strong)]">
            This is not hypothetical. It happens every week.
          </h2>
          <p className="max-w-[54ch] text-[16px] leading-[1.8] text-[var(--text-body)]">
            Four ways decisions get lost and what Decdock Core does about each one.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {scenarios.map((scenario) => (
            <div key={scenario.type} className="page-panel rounded-[26px] p-6">
              <span className="chip-soft mb-4">{scenario.type}</span>

              <p className="mb-4 text-[15px] font-[600] leading-snug text-[var(--text-strong)]">
                &ldquo;{scenario.situation}&rdquo;
              </p>

              <p className="mb-5 border-b border-[var(--line-soft)] pb-5 text-[14px] leading-[1.75] text-[var(--text-body)]">
                {scenario.problem}
              </p>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] shadow-[0_8px_18px_rgba(30,43,57,0.18)]">
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
                <p className="text-[14px] leading-[1.7] text-[var(--text-strong)]">
                  <span className="font-semibold">With Decdock Core: </span>
                  {scenario.withDecdock}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
