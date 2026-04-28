export default function PilotCTA() {
  return (
    <section className="border-t border-[#E4E2DB] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-2xl bg-[#1C3450] px-8 py-16 text-center md:px-16 md:py-20">
          {/* Label */}
          <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#7A98B8]">
            Early access
          </div>

          {/* Headline */}
          <h2 className="mx-auto mb-5 max-w-xl font-display text-[34px] font-[800] leading-[1.12] tracking-[-0.02em] text-white">
            We are preparing early pilots with decision-heavy teams.
          </h2>

          {/* Body */}
          <p className="mx-auto mb-10 max-w-lg text-[17px] leading-[1.7] text-[#A8C0D8]">
            If you lead operations, product, or a fast-growing team where decisions
            scatter across tools and teams — we'd like to talk.
          </p>

          {/* CTA */}
          <a
            href="mailto:pilot@decdock.com"
            className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3.5 text-[14px] font-semibold text-[#1C3450] transition-colors hover:bg-[#F0EDE8]"
          >
            Contact us &mdash; pilot@decdock.com
          </a>

          {/* Audience note */}
          <p className="mt-7 text-[13px] text-[#5A7898]">
            Designed for COOs, Chiefs of Staff, product leaders, and engineering managers
            at fast-growing companies.
          </p>
        </div>
      </div>
    </section>
  )
}
