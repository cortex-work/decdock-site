const sourceSignals = ['Meetings', 'Messages', 'Documents']

const contextFields = [
  { label: 'Source', value: 'Where it came from' },
  { label: 'Owner', value: 'Who is accountable' },
  { label: 'Review', value: 'Whether it still stands' },
]

const outcomeSignals = ['Stale', 'Conflicting', 'Ownerless']

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-band-muted py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="eyebrow-plain">How Decdock Core works</div>
            <h2 className="max-w-[16ch] font-display text-[38px] font-[600] leading-[1.08] text-[var(--text-strong)]">
              From scattered discussion to a clear decision record.
            </h2>
          </div>
          <p className="max-w-[58ch] text-[16px] leading-[1.8] text-[var(--text-body)]">
            Decdock Core keeps what was decided attached to its source, owner, and review state.
          </p>
        </div>

        <div className="relative">
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            viewBox="0 0 1000 260"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className="flow-line-base" d="M275 130 C355 130 385 130 455 130" />
            <path className="flow-line-base" d="M545 130 C615 130 645 130 725 130" />
            <path className="flow-line-emphasis flow-line-emphasis-first" d="M275 130 C355 130 385 130 455 130" pathLength="1" />
            <path className="flow-line-emphasis flow-line-emphasis-second" d="M545 130 C615 130 645 130 725 130" pathLength="1" />
            <circle className="flow-node flow-node-first" cx="455" cy="130" r="3.5" />
            <circle className="flow-node flow-node-second" cx="725" cy="130" r="3.5" />
          </svg>

          <div className="relative grid gap-4 md:grid-cols-[1fr_1.08fr_1fr] md:items-stretch">
            <article className="flow-card flow-step-one">
              <div className="mb-4 text-[12px] font-semibold text-[var(--accent)]">1. Decisions happen</div>
              <h3 className="mb-3 text-[20px] font-semibold text-[var(--text-strong)]">
                Across the tools teams already use.
              </h3>
              <p className="mb-5 text-[14px] leading-[1.65] text-[var(--text-body)]">
                Important decisions show up in meetings, messages, and documents.
              </p>
              <div className="flex flex-wrap gap-2">
                {sourceSignals.map((signal) => (
                  <span key={signal} className="surface-tag px-3 py-1.5 text-[12px] font-medium text-[var(--text-body)]">
                    {signal}
                  </span>
                ))}
              </div>
            </article>

            <div className="flow-mobile-arrow md:hidden" aria-hidden="true" />

            <article className="flow-card flow-card-center flow-step-two">
              <div className="mb-4 text-[12px] font-semibold text-[var(--accent)]">2. Decdock Core keeps the record</div>
              <h3 className="mb-4 text-[20px] font-semibold text-[var(--text-strong)]">
                Source, owner, and review state stay attached.
              </h3>
              <div className="mb-3 text-[11px] font-semibold uppercase text-[var(--text-faint)]">
                Decision record
              </div>
              <p className="mb-4 text-[14px] font-semibold leading-[1.55] text-[var(--text-strong)]">
                Packaging speed stays reduced until seal failures stabilize.
              </p>
              <div className="space-y-2">
                {contextFields.map((field) => (
                  <div key={field.label} className="flex items-start justify-between gap-4 border-t border-[var(--line-soft)] pt-2">
                    <span className="text-[12px] text-[var(--text-muted)]">{field.label}</span>
                    <span className="text-right text-[12px] font-medium text-[var(--text-strong)]">{field.value}</span>
                  </div>
                ))}
              </div>
            </article>

            <div className="flow-mobile-arrow md:hidden" aria-hidden="true" />

            <article className="flow-card flow-step-three">
              <div className="mb-4 text-[12px] font-semibold text-[var(--accent)]">3. Teams revisit what matters</div>
              <h3 className="mb-3 text-[20px] font-semibold text-[var(--text-strong)]">
                Teams can see what still needs attention.
              </h3>
              <p className="mb-5 text-[14px] leading-[1.65] text-[var(--text-body)]">
                They can revisit decisions that are stale, conflicting, or ownerless.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {outcomeSignals.map((signal) => (
                  <span key={signal} className="rounded-[12px] border border-[var(--line-soft)] bg-[rgba(248,243,236,0.72)] px-2 py-2 text-center text-[12px] font-medium text-[var(--text-body)]">
                    {signal}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
