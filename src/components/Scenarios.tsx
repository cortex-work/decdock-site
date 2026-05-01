interface CapabilityCard {
  title: string
  description: string
}

const capabilities: CapabilityCard[] = [
  {
    title: 'Capture decisions',
    description:
      'Turn scattered conversations and documents into source-linked decision records without asking teams to maintain another manual decision log.',
  },
  {
    title: 'Identify ownership signals',
    description:
      'Highlight the people, teams, and accountability signals connected to a decision so ownership is easier to review.',
  },
  {
    title: 'Keep source context',
    description:
      'Keep the decision linked to the original meeting, message, or document context instead of flattening it into a disconnected summary.',
  },
  {
    title: 'Surface reviewable follow-up risks',
    description:
      'Show decisions that may be stale, unclear, conflicting, or missing confirmation so teams know what deserves a second look.',
  },
]

export default function Scenarios() {
  return (
    <section id="what-decdock-does" className="section-band-soft py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid gap-5 lg:grid-cols-[0.95fr_0.98fr] lg:items-start">
          <div>
            <div className="eyebrow-plain">What Decdock does</div>
            <h2 className="max-w-[16ch] font-display text-[38px] font-[600] leading-[1.08] text-[var(--text-strong)]">
              Decision memory without becoming another work tool.
            </h2>
          </div>
          <div className="max-w-[52ch] space-y-3 text-[14.5px] leading-[1.75] text-[var(--text-body)] lg:pt-9">
            <p>
              Decdock turns scattered workplace conversations and documents into
              source-linked decision records. It helps teams track decisions, ownership
              signals, context, and follow-up risks without asking people to maintain
              another manual decision log.
            </p>
            <p>
              It is not a task manager and not general enterprise search. The focus is
              decision memory: what was decided, who appears responsible, what source
              context supports it, and what may need review later.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((card) => (
            <article key={card.title} className="page-panel-strong rounded-[26px] p-6">
              <span className="chip-soft mb-4">Capability</span>
              <h3 className="mb-4 text-[20px] font-semibold leading-[1.25] text-[var(--text-strong)]">
                {card.title}
              </h3>
              <p className="text-[14px] leading-[1.75] text-[var(--text-body)]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
