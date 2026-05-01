export default function PilotCTA() {
  return (
    <section id="contact" className="section-band py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="page-panel-dark relative overflow-hidden rounded-[32px] px-8 py-16 text-center md:px-16 md:py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(255,248,239,0.14),transparent_72%)]" />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[rgba(161,118,78,0.1)] blur-3xl" />

          <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-[rgba(226,210,193,0.72)]">
            Current stage
          </div>

          <h2 className="mx-auto mb-5 max-w-[14ch] font-display text-[40px] font-[600] leading-[1.08] tracking-[-0.03em] text-white">
            Early-stage, pilot-ready, and focused on selected teams.
          </h2>

          <p className="mx-auto mb-10 max-w-[42rem] text-[17px] leading-[1.8] text-[rgba(239,230,220,0.84)]">
            Decdock is currently in an early pilot-ready stage. We are working with
            selected teams to validate decision extraction, review workflows, and
            decision memory in real workplace contexts.
          </p>

          <div className="mx-auto mb-10 grid max-w-4xl gap-4 text-left md:grid-cols-3">
            <div className="rounded-[22px] border border-[rgba(255,247,240,0.14)] bg-[rgba(255,248,240,0.06)] p-5">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[rgba(226,210,193,0.72)]">
                Company / Product
              </div>
              <div className="text-[15px] font-semibold text-white">Decdock</div>
            </div>

            <div className="rounded-[22px] border border-[rgba(255,247,240,0.14)] bg-[rgba(255,248,240,0.06)] p-5">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[rgba(226,210,193,0.72)]">
                Category
              </div>
              <div className="text-[15px] font-semibold text-white">
                Decision memory and accountability software
              </div>
            </div>

            <div className="rounded-[22px] border border-[rgba(255,247,240,0.14)] bg-[rgba(255,248,240,0.06)] p-5">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[rgba(226,210,193,0.72)]">
                Stage
              </div>
              <div className="text-[15px] font-semibold text-white">Early-stage / pilot-ready</div>
            </div>
          </div>

          <a
            href="mailto:pilot@decdock.com"
            className="inline-flex items-center justify-center rounded-[0.9rem] border border-[rgba(255,247,240,0.18)] bg-[rgba(250,244,237,0.96)] px-8 py-3.5 text-[14px] font-semibold text-[var(--brand)] shadow-[0_16px_30px_rgba(33,26,21,0.16)] transition hover:-translate-y-[1px] hover:bg-[rgba(252,246,240,1)]"
          >
            Contact us - pilot@decdock.com
          </a>

          <p className="mt-7 text-[13px] text-[rgba(210,195,180,0.74)]">
            Decdock works from selected sources, keeps reviewable signals visible, and
            does not ask teams to hand over an entire workspace.
          </p>
        </div>
      </div>
    </section>
  )
}
