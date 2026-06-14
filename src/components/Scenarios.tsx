import { useEffect, useRef } from 'react'

interface CapabilityCard {
  index: number
  title: string
  description: string
}

const capabilities: CapabilityCard[] = [
  {
    index: 1,
    title: 'Kararları yakalar',
    description:
      'Yazışmalarınızdan kararları çıkarır: karar metni, tarih ve kaynaktan birebir alıntı. Kimseden log tutmasını, etiketlemesini, not yazmasını istemez.',
  },
  {
    index: 2,
    title: 'Onaylayanı gösterir',
    description:
      '"Kim söyledi" değil, "kim onayladı": her kararın yanında onaylayan kişi durur. Sahiplik ve hesap verebilirlik tahmine değil kayda dayanır.',
  },
  {
    index: 3,
    title: '"Karar sanılanı" ayırır',
    description:
      'Asıl tehlike kaybolan karar değil, karar sanılan şeydir. Öneri, niyet ve takvim konuşması sicile girmez — kayıt dışı kalır, gerekçesi görünür olur.',
  },
  {
    index: 4,
    title: 'Riskleri işaretler',
    description:
      'Sahibi belirsiz kalmış kararlar, birbiriyle çelişen yönler ve yeniden açılan konular kendiliğinden işaretlenir — siz sormadan.',
  },
]

export default function Scenarios() {
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
    <section id="what-decdock-does" ref={ref} className="band-cream relative overflow-hidden py-24 lg:py-28">
      {/* Faint background number — editorial texture */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-8 top-12 select-none font-display text-[160px] font-[700] leading-none text-[rgba(161,118,78,0.05)] lg:text-[220px]"
      >
        01
      </span>

      <div className="relative mx-auto max-w-6xl px-6">

        {/* ── Section header — editorial two-col ───────────────── */}
        <div className="mb-16 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <div className="reveal eyebrow-plain">Decdock ne yapar</div>
            <h2 className="reveal reveal-delay-1 max-w-[14ch] font-display font-[640] leading-[1.04] tracking-[-0.03em] text-[var(--text-strong)]"
                style={{ fontSize: 'clamp(34px, 4.2vw, 50px)' }}>
              Özet değil; denetlenebilir karar sicili.
            </h2>
          </div>
          <div className="reveal reveal-delay-2 lg:pb-1">
            <span className="ledger-rule" />
            <div className="max-w-[50ch] space-y-3 text-[14.5px] leading-[1.8] text-[var(--text-body)]">
              <p>
                Decdock, dağınık yazışmaları kaynağa bağlı karar kayıtlarına çevirir.
                Sorduğu soru "bu hafta ne konuşuldu?" değildir:{' '}
                <strong className="font-[680] text-[var(--text-strong)]">
                  ne kararlaştırıldı, kim onayladı, hâlâ geçerli mi?
                </strong>
              </p>
              <p>
                Görev yöneticisi değildir, kurumsal arama değildir, toplantı not aracı
                değildir. Tek odağı karar hafızasıdır — ve emin olmadığı hiçbir şeyi
                kesin gerçek gibi göstermez.
              </p>
            </div>
          </div>
        </div>

        {/* ── Capability cards — asymmetric irregular grid ─────── */}
        {/* Large first card + 3 smaller ones */}
        <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr_1fr] lg:grid-rows-2">

          {/* Card 1 — full height left */}
          <article
            className="reveal reveal-delay-1 panel relative overflow-hidden rounded-[4px] p-7 lg:row-span-2"
          >
            {/* Background large numeral */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-4 right-4 select-none font-display text-[80px] font-[700] leading-none text-[rgba(161,118,78,0.07)]"
            >
              {capabilities[0]?.index}
            </span>
            <div className="chip mb-5">Yetenek {capabilities[0]?.index}</div>
            <h3 className="mb-5 font-display text-[26px] font-[640] leading-[1.15] tracking-[-0.025em] text-[var(--text-strong)]">
              {capabilities[0]?.title}
            </h3>
            <p className="text-[14.5px] leading-[1.82] text-[var(--text-body)]">
              {capabilities[0]?.description}
            </p>
          </article>

          {/* Cards 2–4 — right 2-col grid */}
          {capabilities.slice(1).map((card, i) => (
            <article
              key={card.title}
              className={`reveal reveal-delay-${i + 2} panel-muted relative overflow-hidden rounded-[4px] p-6`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 right-3 select-none font-display text-[56px] font-[700] leading-none text-[rgba(161,118,78,0.06)]"
              >
                {card.index}
              </span>
              <div className="chip mb-4">Yetenek {card.index}</div>
              <h3 className="mb-3 text-[17px] font-[680] leading-[1.25] text-[var(--text-strong)]">
                {card.title}
              </h3>
              <p className="text-[13.5px] leading-[1.78] text-[var(--text-body)]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
