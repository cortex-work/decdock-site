interface WorkflowExample {
  label: string
  thread: Array<{
    speaker: string
    message: string
  }>
  extracts: string[]
  teamSees: string
}

const examples: WorkflowExample[] = [
  {
    label: 'Email thread',
    thread: [
      {
        speaker: 'Olivia',
        message:
          'Keep packaging speed reduced until seal failures stabilize.',
      },
      {
        speaker: 'Marcus',
        message: 'Agreed. Maya can track quality checks and send the Friday update.',
      },
    ],
    extracts: [
      'Decision: Packaging speed stays reduced until seal failures stabilize.',
      'Owner signal: Maya -> quality check follow-up.',
      'Source: Operations email thread.',
      'Review state: Needs confirmation.',
    ],
    teamSees:
      'Possible decision found: Packaging speed remains reduced. Confirm, edit, or reject?',
  },
  {
    label: 'Team chat',
    thread: [
      {
        speaker: 'Daniel',
        message:
          'Keep manual exports for enterprise customers until reporting is ready.',
      },
      {
        speaker: 'Priya',
        message: 'That is a rollout exception. Can Sarah own customer comms?',
      },
      {
        speaker: 'Nina',
        message: 'Yes, Sarah please take this and keep Support aligned.',
      },
    ],
    extracts: [
      'Decision: Manual export support remains available for enterprise customers until the new reporting flow is ready.',
      'Owner signal: Sarah -> customer communication.',
      'Source: Product/team chat thread.',
      'Review state: High-confidence candidate.',
    ],
    teamSees:
      'Added to decision memory with source link. Included in weekly digest under Customer commitments.',
  },
  {
    label: 'Later update',
    thread: [
      {
        speaker: 'March meeting note',
        message:
          'Manual exports stay available for enterprise customers until reporting parity.',
      },
      {
        speaker: 'April product thread',
        message: 'Stop supporting manual exports after May to focus on new reporting.',
      },
    ],
    extracts: [
      'Possible conflict: A newer update may conflict with an earlier customer commitment.',
      'Related decisions: March decision + April update.',
      'Source: Meeting note and product chat.',
      'Review state: Needs review.',
    ],
    teamSees:
      'Possible conflict to review: manual export policy may have changed. Review related source records.',
  },
]

function StoryPart({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="border-t border-[var(--line-soft)] pt-2.5">
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--text-faint)]">
        {label}
      </div>
      {children}
    </div>
  )
}

export default function ExampleRecords() {
  return (
    <section className="section-band py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-9 grid gap-5 lg:grid-cols-[0.92fr_0.96fr] lg:items-start">
          <div>
            <div className="eyebrow-plain">From thread to decision memory</div>
            <h2 className="max-w-[16ch] font-display text-[34px] font-[600] leading-[1.08] text-[var(--text-strong)] sm:text-[38px]">
              From messy threads to decision memory
            </h2>
          </div>
          <p className="max-w-[52ch] text-[14.5px] leading-[1.75] text-[var(--text-body)] lg:pt-9">
            Decdock looks at selected workplace sources, extracts decision and
            ownership signals, and turns them into reviewable records your team can
            trust.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {examples.map((example) => (
            <article key={example.label} className="page-panel rounded-[24px] p-5">
              <span className="chip-soft mb-4">{example.label}</span>

              <div className="space-y-2.5">
                <StoryPart label="Thread">
                  <div className="space-y-1.5">
                    {example.thread.map((line) => (
                      <div
                        key={`${line.speaker}-${line.message}`}
                        className="rounded-[12px] border border-[var(--line-soft)] bg-[rgba(250,245,239,0.66)] px-3 py-1.5 text-[12.5px] leading-[1.5]"
                      >
                        <span className="font-semibold text-[var(--text-strong)]">
                          {line.speaker}:
                        </span>{' '}
                        <span className="text-[var(--text-body)]">{line.message}</span>
                      </div>
                    ))}
                  </div>
                </StoryPart>

                <StoryPart label="Decdock extracts">
                  <ul className="space-y-1.5">
                    {example.extracts.map((item) => (
                      <li key={item} className="text-[12.5px] leading-[1.5] text-[var(--text-strong)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </StoryPart>

                <StoryPart label="Team sees">
                  <p className="rounded-[12px] border border-[rgba(161,118,78,0.2)] bg-[rgba(247,239,228,0.8)] px-3 py-2 text-[13px] font-medium leading-[1.5] text-[var(--text-strong)]">
                    &ldquo;{example.teamSees}&rdquo;
                  </p>
                </StoryPart>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
