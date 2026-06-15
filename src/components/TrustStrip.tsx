import { useEffect, useRef } from 'react'

interface TrustItem {
  title: string
  description: string
  glyph: string
}

const items: TrustItem[] = [
  {
    glyph: '○',
    title: 'İzleme yok',
    description:
      'Decdock tüm iletişimi okumaz, insanları izlemez, performans ölçmez. Yalnız sizin seçtiğiniz kaynaklardan kararlar işlenir — konu kişi değil, karar. Kapsamı her zaman siz belirlersiniz.',
  },
  {
    glyph: '◇',
    title: 'Veri tek amaç için',
    description:
      'KVKK uyumlu işlenir. İçeriğiniz yalnız karar sicili üretiminde kullanılır; model eğitiminde kullanılmaz, üçüncü taraflarla paylaşılmaz.',
  },
  {
    glyph: '△',
    title: 'İmha ve yazılı teyit',
    description:
      'Rapor tesliminde ham veri tüm kopyalarıyla silinir ve yazılı olarak teyit edilir. Sürekli üründe saklama süresini sizin politikanız belirler.',
  },
  {
    glyph: '□',
    title: 'Kapsam dışı içerik',
    description:
      'İK disiplin süreçleri, hukuki ihtilaf ve sağlık verisi işlenmez — ilk dilimde reddedilir. Sicil suçlama aracı değil, bağlam aracıdır.',
  },
]

export default function TrustStrip() {
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
      { threshold: 0.08 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="trust" ref={ref} className="band-deep relative overflow-hidden py-24 lg:py-28">
      {/* Faint ledger motif — horizontal rule stripes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        style={{
          backgroundImage:
            'repeating-linear-gradient(180deg, transparent 0px, transparent 47px, rgba(94,86,80,0.04) 47px, rgba(94,86,80,0.04) 48px)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <div className="reveal eyebrow-plain">Güvenlik ve gizlilik</div>
            <h2
              className="reveal reveal-delay-1 max-w-[18ch] font-display font-[640] leading-[1.04] tracking-[-0.03em] text-[var(--text-strong)]"
              style={{ fontSize: 'clamp(28px, 3.6vw, 44px)' }}
            >
              İlk rapordan sürekli sicile: aynı ilkeler.
            </h2>
          </div>
          <p className="reveal reveal-delay-2 max-w-[50ch] text-[14.5px] leading-[1.8] text-[var(--text-body)] lg:pb-1">
            Güven, sonradan eklenen bir özellik değil; ürünün kuruluş ilkesi.{' '}
            <span className="font-[680] text-[var(--text-strong)]">Amaç suçlamak değil, hatırlamak — konu kişi değil, karar.</span>{' '}
            Bu dört kural tek seferlik raporda da, sürekli çalışan sicilde de aynen geçerlidir.
          </p>
        </div>

        {/* Cards with geometric glyphs */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, i) => (
            <article
              key={item.title}
              className={`reveal reveal-delay-${i + 1} panel relative overflow-hidden rounded-[4px] p-6`}
            >
              {/* Geometric glyph — serif editorial mark */}
              <div
                aria-hidden="true"
                className="mb-5 font-display text-[28px] font-[300] text-[var(--accent)]"
                style={{ lineHeight: 1 }}
              >
                {item.glyph}
              </div>
              <h3 className="mb-3 text-[16px] font-[700] text-[var(--text-strong)]">
                {item.title}
              </h3>
              <p className="text-[13px] leading-[1.75] text-[var(--text-body)]">
                {item.description}
              </p>
              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[linear-gradient(90deg,var(--accent-soft),transparent_60%)]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
