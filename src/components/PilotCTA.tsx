import { useEffect, useRef } from 'react'

export default function PilotCTA() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.querySelectorAll('.reveal').forEach((node, i) => {
            ;(node as HTMLElement).style.transitionDelay = `${i * 100}ms`
            node.classList.add('in-view')
          })
          obs.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" ref={ref} className="band-ledger relative overflow-hidden py-28 lg:py-36">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(161,118,78,0.18),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_10%_100%,rgba(161,118,78,0.08),transparent)]" />
      {/* Horizontal ledger rule stripes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(180deg, transparent 0px, transparent 47px, rgba(255,244,232,0.03) 47px, rgba(255,244,232,0.03) 48px)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">

        {/* Two-column editorial layout: copy left, info boxes right */}
        <div className="grid gap-16 lg:grid-cols-[1fr_400px] lg:items-center xl:gap-24">

          {/* Left — main copy */}
          <div>
            <div className="reveal eyebrow-invert mb-6">Nasıl başlıyoruz</div>

            <h2
              className="reveal reveal-delay-1 mb-7 font-display font-[640] leading-[1.0] tracking-[-0.04em] text-white"
              style={{ fontSize: 'clamp(38px, 5.5vw, 66px)' }}
            >
              İlk adım: Karar Denetimi raporu.
            </h2>

            <span className="reveal reveal-delay-2 block h-[2px] w-12 bg-[var(--accent)] mb-7" />

            <p className="reveal reveal-delay-2 mb-10 max-w-[50ch] text-[16px] leading-[1.82] text-[rgba(239,229,217,0.82)]">
              Bitmiş bir projenizin yazışma dilimini paylaşın; 3 iş gününde karar sicili
              raporu gelsin. İşe yararsa sürekli halini konuşuruz.
            </p>

            <div className="reveal reveal-delay-3 flex flex-wrap gap-3">
              <a
                href="mailto:pilot@decdock.com?subject=Karar%20Denetimi%20talebi"
                className="inline-flex items-center gap-2 rounded-[3px] border border-[rgba(255,244,232,0.16)] bg-[rgba(251,244,236,0.97)] px-7 py-3.5 text-[13.5px] font-[700] text-[var(--brand)] shadow-[0_12px_32px_rgba(28,20,14,0.24)] transition hover:-translate-y-[1px] hover:bg-white"
              >
                Karar Denetimi isteyin
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="/basla/"
                className="inline-flex items-center gap-2 rounded-[3px] border border-[rgba(255,244,232,0.16)] bg-transparent px-6 py-3.5 text-[13.5px] font-[600] text-[rgba(226,210,193,0.9)] transition hover:border-[rgba(255,244,232,0.3)] hover:text-white"
              >
                Önce süreci inceleyin →
              </a>
            </div>

            <p className="reveal reveal-delay-4 mt-8 max-w-[46ch] text-[12.5px] leading-[1.75] text-[rgba(200,183,164,0.72)]">
              İlk rapor deneme kapısıdır; satın alma kararı için baskı değil.
            </p>
          </div>

          {/* Right — info cards stack */}
          <div className="reveal reveal-delay-2 flex flex-col gap-3">
            {[
              {
                label: 'Girdi',
                value: 'Bitmiş bir projenin 20–50 e-postası',
                sub: 'Entegrasyon yok, sistem erişimi yok',
              },
              {
                label: 'Çıktı',
                value: 'Karar sicili raporu',
                sub: 'Kararlar, tarihler ve açık riskler',
              },
              {
                label: 'Süre',
                value: '3 iş günü',
                sub: 'Kurulum ve entegrasyon gerekmez',
              },
            ].map((box) => (
              <div
                key={box.label}
                className="rounded-[4px] border border-[rgba(255,244,232,0.1)] bg-[rgba(255,248,240,0.055)] p-5 backdrop-blur-sm"
              >
                <div className="mb-1.5 text-[10px] font-[800] uppercase tracking-[0.16em] text-[rgba(200,175,148,0.8)]">
                  {box.label}
                </div>
                <div className="mb-0.5 text-[14.5px] font-[680] text-white">{box.value}</div>
                <div className="text-[12px] text-[rgba(200,183,164,0.65)]">{box.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
