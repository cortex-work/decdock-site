interface RecordSnapshot {
  label: string
  decision: string
  source: string
  owner: string
  reviewState: string
  sourceTrail: string
  whyItMatters: string
}

const records: RecordSnapshot[] = [
  {
    label: 'Manufacturing / quality',
    decision:
      'Keep the Line 4 packaging speed reduced until the seal failure rate stays below 1.5% for two consecutive shifts.',
    source: 'Quality Review - March 12, Manchester Plant',
    owner: 'Emily Ward, Production Manager',
    reviewState: 'Review overdue',
    sourceTrail: 'Quality Review -> shift supervisor note -> maintenance Teams thread',
    whyItMatters:
      'The speed reduction was introduced as a temporary quality fix. Two weeks later, the line is still running slower because nobody confirmed whether the seal issue was resolved.',
  },
  {
    label: 'Manager / ownership',
    decision:
      'Move weekly onboarding follow-ups from People Ops to Regional Managers for the next hiring cycle.',
    source: 'Hiring Planning Meeting - April 9, London Office',
    owner: 'Laura Mitchell, Head of People',
    reviewState: 'Needs confirmation',
    sourceTrail: 'Hiring Planning Meeting -> onboarding checklist update -> regional managers thread',
    whyItMatters:
      'The ownership change was discussed once and then spread across follow-up messages. New managers may not know whether the change is official, temporary, or still valid.',
  },
  {
    label: 'Forgotten project decision',
    decision:
      'Pause the customer portal redesign until support tickets about login issues drop.',
    source: 'Product Review - February 18, New York',
    owner: 'Daniel Brooks, Product Manager',
    reviewState: 'Stale',
    sourceTrail: 'Product Review -> support ticket summary -> Slack thread',
    whyItMatters:
      'The redesign was paused for a support-related reason. Later, a new sprint plan brought the same work back without the original context.',
  },
]

function Field({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="grid gap-1 border-t border-[var(--line-soft)] pt-3">
      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-faint)]">
        {label}
      </div>
      <div className="text-[13px] leading-[1.6] text-[var(--text-strong)]">{value}</div>
    </div>
  )
}

export default function Scenarios() {
  return (
    <section className="section-band-soft py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <div className="eyebrow-plain">What Decdock Core keeps</div>
            <h2 className="max-w-[14ch] font-display text-[38px] font-[600] leading-[1.08] text-[var(--text-strong)]">
              Decision records, kept in context.
            </h2>
          </div>
          <p className="max-w-[56ch] text-[16px] leading-[1.8] text-[var(--text-body)]">
            The product keeps everyday internal decisions visible after they spread across follow-up notes, threads, and tool updates.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {records.map((record) => (
            <article key={record.label} className="page-panel-strong rounded-[26px] p-6">
              <span className="chip-soft mb-4">{record.label}</span>

              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-faint)]">
                Decision
              </div>
              <p className="mb-5 text-[15px] font-semibold leading-[1.6] text-[var(--text-strong)]">
                {record.decision}
              </p>

              <div className="space-y-3">
                <Field label="Source" value={record.source} />
                <Field label="Owner" value={record.owner} />
                <Field label="Review state" value={record.reviewState} />
                <Field label="Source trail" value={record.sourceTrail} />
                <Field label="Why it matters" value={record.whyItMatters} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
