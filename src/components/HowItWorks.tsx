const steps = [
  {
    number: '01',
    title: 'Capture',
    description:
      'Decdeck Core connects to where your team works — meetings, messages, email, and documents. It identifies decisions as they happen, without requiring manual entry or process change.',
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
      'When a decision becomes relevant — a deadline approaches, ownership changes, or a related decision conflicts — Decdeck Core brings it forward for human review.',
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
    <section id="how-it-works" className="border-t border-[#E4E2DB] py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.09em] text-[#B87A3A]">
          How it works
        </div>
        <div className="mb-16 grid gap-4 lg:grid-cols-2 lg:items-end">
          <h2 className="font-display text-[34px] font-[800] leading-[1.12] tracking-[-0.02em] text-[#1A1916]">
            From scattered signals to structured memory.
          </h2>
          <p className="text-[16px] leading-[1.7] text-[#57554F]">
            Three layers. No manual entry. No disruption to how your team works.
            Decdeck Core operates in the background and surfaces only what matters.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="mb-4 font-display text-[42px] font-[800] leading-none tracking-tight text-[#E4E2DB]">
                {step.number}
              </div>
              <h3 className="mb-3 text-[19px] font-semibold text-[#1A1916]">{step.title}</h3>
              <p className="text-[14.5px] leading-[1.7] text-[#57554F]">{step.description}</p>
            </div>
          ))}
        </div>

        {/* What every record contains */}
        <div className="rounded-xl border border-[#E4E2DB] bg-white p-7">
          <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.09em] text-[#9B978F]">
            What every decision record contains
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recordFields.map((f) => (
              <div key={f.label}>
                <div className="mb-1 text-[14px] font-semibold text-[#1A1916]">{f.label}</div>
                <div className="text-[13px] leading-[1.55] text-[#57554F]">{f.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
