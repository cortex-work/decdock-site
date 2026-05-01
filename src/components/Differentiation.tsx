interface AudienceCard {
  title: string
  description: string
  emphasized?: boolean
}

const audiences: AudienceCard[] = [
  {
    title: 'Founders',
    description:
      'Keep important operating decisions from disappearing into follow-up threads and document edits.',
  },
  {
    title: 'COOs and chiefs of staff',
    description:
      'Maintain accountability and context when operational decisions cross meetings, email, and docs.',
  },
  {
    title: 'Product and operations teams',
    description:
      'Revisit the decisions behind project changes, pauses, and ownership handoffs.',
  },
  {
    title: 'Project-heavy teams',
    description:
      'Keep source-linked records for work that spans channels, stakeholders, and repeated follow-up.',
  },
  {
    title: 'Teams spread across email, chat, and documents',
    description:
      'Decdock is useful when the real decision trail lives across multiple conversations and shared files.',
    emphasized: true,
  },
]

export default function Differentiation() {
  return (
    <section id="who-it-is-for" className="section-band py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid gap-5 lg:grid-cols-[0.95fr_0.98fr] lg:items-start">
          <div>
            <div className="eyebrow-plain">Who it is for</div>
            <h2 className="max-w-[14ch] font-display text-[38px] font-[600] leading-[1.08] text-[var(--text-strong)]">
              Built for teams where decisions spread across tools.
            </h2>
          </div>
          <p className="max-w-[52ch] text-[14.5px] leading-[1.75] text-[var(--text-body)] lg:pt-9">
            Decdock is for founders, COOs, chiefs of staff, product and operations
            teams, project-heavy groups, and other teams where decisions are split
            across email, chat, and documents.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className={
                audience.emphasized
                  ? 'page-panel-dark relative overflow-hidden rounded-[24px] p-6'
                  : 'page-panel rounded-[24px] p-6'
              }
            >
              {audience.emphasized && (
                <div className="pointer-events-none absolute inset-x-8 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(255,248,239,0.12),transparent_70%)]" />
              )}
              <h3
                className={
                  audience.emphasized
                    ? 'mb-3 text-[18px] font-semibold text-white'
                    : 'mb-3 text-[18px] font-semibold text-[var(--text-strong)]'
                }
              >
                {audience.title}
              </h3>
              <p
                className={
                  audience.emphasized
                    ? 'text-[14px] leading-[1.7] text-[rgba(239,230,220,0.84)]'
                    : 'text-[14px] leading-[1.7] text-[var(--text-body)]'
                }
              >
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
