export default function PilotCTA() {
  return (
    <section className="section-band py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="page-panel-dark relative overflow-hidden rounded-[32px] px-8 py-16 text-center md:px-16 md:py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_72%)]" />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[rgba(166,119,70,0.12)] blur-3xl" />

          <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-[rgba(214,224,237,0.72)]">
            Early access
          </div>

          <h2 className="mx-auto mb-5 max-w-[13ch] font-display text-[40px] font-[600] leading-[1.08] tracking-[-0.03em] text-white">
            We are preparing early pilots with decision-heavy teams.
          </h2>

          <p className="mx-auto mb-10 max-w-[38rem] text-[17px] leading-[1.8] text-[rgba(223,231,238,0.84)]">
            If you lead operations, product, or a fast-growing team where decisions
            scatter across tools and teams, we would like to talk.
          </p>

          <a
            href="mailto:pilot@decdock.com"
            className="inline-flex items-center justify-center rounded-[0.9rem] border border-[rgba(255,255,255,0.22)] bg-[rgba(255,255,255,0.94)] px-8 py-3.5 text-[14px] font-semibold text-[var(--brand)] shadow-[0_16px_30px_rgba(15,22,30,0.16)] transition hover:-translate-y-[1px] hover:bg-[rgba(255,255,255,1)]"
          >
            Contact us - pilot@decdock.com
          </a>

          <p className="mt-7 text-[13px] text-[rgba(186,201,216,0.8)]">
            Designed for COOs, Chiefs of Staff, product leaders, and engineering managers
            at fast-growing companies.
          </p>
        </div>
      </div>
    </section>
  )
}
