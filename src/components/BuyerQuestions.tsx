import { useEffect, useRef } from 'react'

const trustPoints = [
  {
    label: '01 · ROI',
    title: 'Evrensel rakam uydurmuyoruz.',
    body:
      'Karar kaybının nerede maliyete döndüğünü görünür kılarız; para karşılığını müşteri kendi örnekleriyle hesaplar.',
  },
  {
    label: '02 · Veri',
    title: 'En düşük riskli rapor moduyla başlarız.',
    body:
      'Seçili ve sınırlı veri işlenir; bölge, saklama süresi ve silme teyidi sözleşmede netleşir.',
  },
  {
    label: '03 · Erişim',
    title: 'Herkes kullanır; herkes aynı şeyi görmez.',
    body:
      'Erişim organizasyon şeması, rol ve kaynak kapsamına göre sınırlandırılır.',
  },
]

export default function BuyerQuestions() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.querySelectorAll('.reveal').forEach((node, i) => {
            ;(node as HTMLElement).style.transitionDelay = `${i * 80}ms`
            node.classList.add('in-view')
          })
          obs.disconnect()
        }
      },
      { threshold: 0.06 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="buyer-questions" ref={ref} className="band-cream relative overflow-hidden py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-60"
        style={{
          backgroundImage:
            'repeating-linear-gradient(180deg, transparent 0px, transparent 47px, rgba(94,86,80,0.045) 47px, rgba(94,86,80,0.045) 48px)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="reveal eyebrow-plain">Satın alma soruları</div>
            <h2
              className="reveal reveal-delay-1 max-w-[17ch] font-display font-[640] leading-[1.04] text-[var(--text-strong)]"
              style={{ fontSize: 'clamp(30px, 3.8vw, 46px)' }}
            >
              Üç şeyi netleştiririz.
            </h2>
          </div>
          <p className="reveal reveal-delay-2 max-w-[56ch] text-[14.5px] leading-[1.8] text-[var(--text-body)] lg:pb-1">
            Önce karar kaybının nerede olduğunu, verinin nerede duracağını ve kimin neyi göreceğini netleştiririz.
          </p>
        </div>

        <article className="reveal panel-strong rounded-[4px] p-7 lg:p-8">
          <div className="grid gap-5 md:grid-cols-3">
            {trustPoints.map((point, index) => (
              <div
                key={point.label}
                className={`border-t border-[var(--line-soft)] pt-4 md:border-t-0 md:pt-0 ${index > 0 ? 'md:border-l md:pl-5' : ''}`}
              >
                <div className="mb-3 text-[11px] font-[800] uppercase tracking-[0.16em] text-[var(--accent)]">
                  {point.label}
                </div>
                <h3 className="mb-3 text-[17px] font-[720] leading-[1.24] text-[var(--text-strong)]">
                  {point.title}
                </h3>
                <p className="text-[13.5px] leading-[1.72] text-[var(--text-body)]">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
