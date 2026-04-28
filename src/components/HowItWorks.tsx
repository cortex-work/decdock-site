const steps = [
  {
    number: '01',
    title: 'Capture',
    description:
      'Decdock Core connects to where your team works: meetings, messages, email, and documents. It identifies decisions as they happen, without requiring manual entry or process change.',
  },
  {
    number: '02',
    title: 'Structure',
    description:
      'Each decision is preserved as a structured record: what was agreed, who decided, where it came from, and what confidence level to assign. Not a transcript. Not a summary.',
  },
  {
    number: '03',
    title: 'Surface',
    description:
      'When a decision becomes relevant, a deadline approaches, ownership changes, or a related decision conflicts, Decdock Core brings it forward for human review.',
  },
]

const recordFields = [
  { label: 'Decision text', sub: 'What was agreed, in its own words' },
  { label: 'Source provenance', sub: 'Where it came from, with reference link' },
  { label: 'Owner attribution', sub: 'Who holds accountability' },
  { label: 'Review state', sub: 'Whether it still stands, pending or confirmed' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-band py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="eyebrow-plain">How it works</div>
        <div className="mb-16 grid gap-5 lg:grid-cols-2 lg:items-end">
          <h2 className="max-w-[14ch] font-display text-[38px] font-[600] leading-[1.08] tracking-[-0.03em] text-[var(--text-strong)]">
            From scattered signals to structured memory.
          </h2>
          <p className="max-w-[54ch] text-[16px] leading-[1.8] text-[var(--text-body)]">
            Three layers. No manual entry. No disruption to how your team works.
            Decdock Core operates in the background and surfaces only what matters.
          </p>
        </div>

        <div className="mb-12 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="page-panel rounded-[26px] p-6">
              <div className="mb-5 font-display text-[44px] font-[600] leading-none tracking-[-0.04em] text-[rgba(36,56,75,0.18)]">
                {step.number}
              </div>
              <h3 className="mb-3 text-[19px] font-semibold text-[var(--text-strong)]">{step.title}</h3>
              <p className="text-[14.5px] leading-[1.75] text-[var(--text-body)]">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="page-panel-strong rounded-[28px] p-7">
          <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-faint)]">
            What every decision record contains
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recordFields.map((field) => (
              <div key={field.label} className="rounded-[18px] bg-[rgba(248,243,236,0.72)] p-4">
                <div className="mb-1.5 text-[14px] font-semibold text-[var(--text-strong)]">{field.label}</div>
                <div className="text-[13.5px] leading-[1.65] text-[var(--text-body)]">{field.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
