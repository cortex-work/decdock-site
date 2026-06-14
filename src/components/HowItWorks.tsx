import { useEffect, useRef } from 'react'

interface StepCard {
  step: string
  title: string
  description: string
  tags: string[]
}

const steps: StepCard[] = [
  {
    step: '1',
    title: 'Bitmiş bir projenin yazışmalarını paylaşın',
    description:
      'Tüm şirket verisi değil: bitmiş bir projenin 20–50 e-postalık dilimi yeter. Kurulum yok, entegrasyon yok, sistem erişimi yok.',
    tags: ['Seçili dilim', 'E-posta', 'Toplantı notları'],
  },
  {
    step: '2',
    title: 'Decdock karar sinyallerini çıkarır',
    description:
      'Yazışmalardan karar, onaylayan, tarih ve bağlam sinyalleri çıkarılır — her biri kaynaktaki cümleye bağlı kalır.',
    tags: ['Karar', 'Onaylayan', 'Kaynak alıntısı'],
  },
  {
    step: '3',
    title: '"Karar mı, karar sanılan mı?" ikinci geçiş',
    description:
      'Her aday ikinci bir doğrulamadan geçer: bu gerçekten onaylanmış bir karar mı? Emin olunmayan sicile yazılmaz; gerekçesi görünür kalır.',
    tags: ['Doğrulama', 'Sicil dışı adaylar'],
  },
  {
    step: '4',
    title: 'Karar sicili elinizde',
    description:
      'İlk teslimat rapor olarak gelir. Sürekli versiyonda sicil aranabilir kalır, yeni kararlar kendiliğinden işlenir ve haftalık özet gelir.',
    tags: ['Rapor', 'Aranabilir', 'Haftalık özet'],
  },
]

export default function HowItWorks() {
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
    <section id="how-it-works" ref={ref} className="band-cream relative overflow-hidden py-24 lg:py-28">
      {/* Editorial section number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-10 select-none font-display text-[130px] font-[700] leading-none text-[rgba(161,118,78,0.04)] lg:text-[180px]"
      >
        04
      </span>

      <div className="relative mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <div className="reveal eyebrow-plain">Nasıl çalışır</div>
            <h2
              className="reveal reveal-delay-1 max-w-[16ch] font-display font-[640] leading-[1.04] tracking-[-0.03em] text-[var(--text-strong)]"
              style={{ fontSize: 'clamp(30px, 3.8vw, 46px)' }}
            >
              Kurulum istemeyen basit bir akış.
            </h2>
          </div>
          <p className="reveal reveal-delay-2 max-w-[50ch] text-[14.5px] leading-[1.8] text-[var(--text-body)] lg:pb-1">
            Geniş kurumsal kurulum değil, odaklı bir dilim:
            seçtiğiniz kaynaklar, incelenebilir sinyaller, kaynağa bağlı kayıtlar.
            İlk değer 3 iş gününde elinizde olur.
          </p>
        </div>

        {/* Step cards — slight stagger heights */}
        <div className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-4 md:items-stretch">
          {steps.map((item, index) => {
            const flowClass =
              index === 0
                ? 'flow-step-one'
                : index === 1
                  ? 'flow-step-two'
                  : index === 2
                    ? 'flow-step-three'
                    : ''

            return (
              <article
                key={item.step}
                className={`flow-card ${index === 1 ? 'flow-card-center' : ''} ${flowClass}`.trim()}
              >
                {/* Step number — italic serif */}
                <div className="mb-5 flex items-baseline gap-2">
                  <span className="font-display text-[32px] font-[640] italic leading-none tracking-[-0.03em] text-[var(--accent)]">
                    {item.step}
                  </span>
                  <div className="h-px flex-1 bg-[var(--line-soft)]" />
                </div>
                <h3 className="mb-3 text-[14px] font-[700] leading-[1.32] text-[var(--text-strong)]">
                  {item.title}
                </h3>
                <p className="mb-5 text-[13px] leading-[1.75] text-[var(--text-body)]">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="chip"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
