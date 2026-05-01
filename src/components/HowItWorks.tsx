interface StepCard {
  step: string
  title: string
  description: string
  tags: string[]
}

const steps: StepCard[] = [
  {
    step: '1',
    title: 'Connect or upload selected sources',
    description:
      'Teams start with a limited project, team, or workflow rather than the entire company workspace.',
    tags: ['Selected scope', 'Email', 'Slack or Teams', 'Project docs'],
  },
  {
    step: '2',
    title: 'Extract decision signals',
    description:
      'Decdock analyzes selected conversations and documents to identify decision, ownership, and context signals.',
    tags: ['Decision', 'Ownership', 'Context'],
  },
  {
    step: '3',
    title: 'Review and confirm',
    description:
      'Teams can confirm, edit, or reject extracted decision candidates before they become part of the decision memory.',
    tags: ['Confirm', 'Edit', 'Reject'],
  },
  {
    step: '4',
    title: 'Maintain decision memory',
    description:
      'Confirmed decisions remain searchable, source-linked, and ready for future review when conditions or ownership change.',
    tags: ['Source-linked', 'Searchable', 'Review-ready'],
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-band-muted py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="eyebrow-plain">How it works</div>
            <h2 className="max-w-[16ch] font-display text-[38px] font-[600] leading-[1.08] text-[var(--text-strong)]">
              A simple workflow for building decision memory.
            </h2>
          </div>
          <p className="max-w-[58ch] text-[16px] leading-[1.8] text-[var(--text-body)]">
            Decdock is designed for focused pilots: selected sources, reviewable
            signals, and clear source-linked records instead of broad workspace indexing.
          </p>
        </div>

        <div className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-4 md:items-stretch">
          {steps.map((item, index) => {
            const flowClass =
              index === 0
                ? 'flow-step-one'
                : index === 1
                  ? 'flow-step-two'
                  : index === 2
                    ? 'flow-step-three'
                    : ''

            return (
              <article
                key={item.step}
                className={`flow-card ${index === 1 ? 'flow-card-center' : ''} ${flowClass}`.trim()}
              >
                <div className="mb-4 text-[12px] font-semibold text-[var(--accent)]">
                  {item.step}. {item.title}
                </div>
                <p className="mb-5 text-[14px] leading-[1.72] text-[var(--text-body)]">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="surface-tag px-3 py-1.5 text-[12px] font-medium text-[var(--text-body)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
