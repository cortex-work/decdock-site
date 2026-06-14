import { useEffect, useRef } from 'react'

interface AudienceCard {
  title: string
  description: string
  emphasized?: boolean
}

const audiences: AudienceCard[] = [
  {
    title: 'Genel Müdür / CEO',
    description:
      '"Bu kararı kim almıştı, neye dayanarak?" sorusuna e-posta arşivi kazmadan, saniyeler içinde kaynaklı cevap.',
  },
  {
    title: 'COO / Operasyon',
    description:
      '"Karar alındı ama top kimde?" boşluğu kapanır: sahipsiz kararlar ve düşen toplar kendiliğinden görünür olur.',
  },
  {
    title: 'Holding iştirakleri',
    description:
      'Denetim, raporlama ve kurumsal yönetim için kaynağa bağlı karar izi — kim onayladı, ne zaman, hangi gerekçeyle.',
  },
  {
    title: 'Proje-yoğun ekipler',
    description:
      'Aynı konunun ikinci kez toplantıya gelmesi azalır: eski karar, vereni ve gerekçesiyle bir arama uzağınızda.',
  },
  {
    title: 'Kararları e-postada alınan her şirket',
    description:
      'Karar iziniz yazışmalarda yaşıyorsa Decdock onu sicile çevirir — kimseye yeni bir araç öğretmeden.',
    emphasized: true,
  },
]

export default function Differentiation() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.querySelectorAll('.reveal').forEach((node, i) => {
            ;(node as HTMLElement).style.transitionDelay = `${i * 90}ms`
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
    <section id="who-it-is-for" ref={ref} className="band-paper relative overflow-hidden py-24 lg:py-28">
      {/* Editorial section number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-10 select-none font-display text-[130px] font-[700] leading-none text-[rgba(161,118,78,0.04)] lg:text-[180px]"
      >
        05
      </span>

      <div className="relative mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <div className="reveal eyebrow-plain">Kimin için</div>
            <h2
              className="reveal reveal-delay-1 max-w-[14ch] font-display font-[640] leading-[1.04] tracking-[-0.03em] text-[var(--text-strong)]"
              style={{ fontSize: 'clamp(30px, 3.8vw, 46px)' }}
            >
              Kararları araçlara dağılan şirketler için.
            </h2>
          </div>
          <p className="reveal reveal-delay-2 max-w-[50ch] text-[14.5px] leading-[1.8] text-[var(--text-body)] lg:pb-1">
            Decdock; 30–300 çalışanlı, karar yoğun ve formal yazışma kültürü olan
            şirketler için tasarlandı: üretim, lojistik, finans hizmetleri, mühendislik,
            danışmanlık ve holding iştirakleri.
          </p>
        </div>

        {/* Audience grid — first 4 + full-width emphasized card */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {audiences.slice(0, 4).map((audience, i) => (
            <article
              key={audience.title}
              className={`reveal reveal-delay-${i + 1} panel relative overflow-hidden rounded-[4px] border-t-2 border-t-[var(--line-medium)] p-6`}
            >
              <h3 className="mb-3 text-[16px] font-[700] leading-[1.25] text-[var(--text-strong)]">
                {audience.title}
              </h3>
              <p className="text-[13.5px] leading-[1.75] text-[var(--text-body)]">
                {audience.description}
              </p>
            </article>
          ))}
        </div>

        {/* Emphasized card — full-width dark */}
        {audiences[4] && (
          <article className="reveal reveal-delay-5 relative mt-4 overflow-hidden rounded-[4px] border border-[rgba(255,244,232,0.08)] bg-[linear-gradient(145deg,#2c2620_0%,#211c17_100%)] p-8 md:p-10">
            {/* Subtle texture overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_-10%,rgba(161,118,78,0.15),transparent)]" />
            {/* Ledger line motif */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,rgba(161,118,78,0.4),transparent)]" />

            <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="eyebrow-invert mb-4">Kimin için</div>
                <h3 className="mb-3 max-w-[22ch] font-display text-[22px] font-[640] leading-[1.2] tracking-[-0.025em] text-white md:text-[26px]">
                  {audiences[4].title}
                </h3>
                <p className="max-w-[52ch] text-[14.5px] leading-[1.78] text-[rgba(239,229,217,0.82)]">
                  {audiences[4].description}
                </p>
              </div>
              <a
                href="mailto:pilot@decdock.com?subject=Karar%20Denetimi%20talebi"
                className="inline-flex shrink-0 items-center gap-2 self-end rounded-[3px] border border-[rgba(255,244,232,0.18)] bg-[rgba(251,244,236,0.96)] px-6 py-3 text-[13px] font-[700] text-[var(--brand)] shadow-[0_8px_24px_rgba(28,20,14,0.2)] transition hover:-translate-y-[1px] hover:bg-white lg:self-center"
              >
                Karar Denetimi isteyin
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
