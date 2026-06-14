import { useEffect, useRef } from 'react'

type NodeKind = 'candidate' | 'ratified' | 'conflict' | 'superseding'

interface ChainNode {
  kind: NodeKind
  date: string
  badge: string
  title: string
  body: string
  quote?: string
  meta?: Array<{ label: string; value: string }>
  link?: string
}

const nodes: ChainNode[] = [
  {
    kind: 'candidate',
    date: '3 Mart',
    badge: 'Sicile girmedi',
    title: 'Öneri — karar değil',
    body:
      'Selin: "Frigo araç kiralayarak kapasiteyi geçici artırabiliriz bence." Decdock bunu sicile yazmadı: kişisel görüş, onay yok. Gerekçesi görünür kaldı.',
  },
  {
    kind: 'ratified',
    date: '12 Mart',
    badge: 'Onaylı karar',
    title: 'Soğuk zincir kapasitesi Seçenek B ile artırılacak',
    body: 'Kısmi filo yenileme + depo genişletme. Q2 bütçesine işlendi.',
    quote:
      '"İki senaryoyu inceledim. Onaylıyorum — Seçenek B ile ilerliyoruz, Q2 bütçesine işleyin."',
    meta: [
      { label: 'Onaylayan', value: 'Esra Tekin — CFO' },
      { label: 'Kaynak', value: 'Bütçe e-posta zinciri, m04' },
    ],
  },
  {
    kind: 'conflict',
    date: '28 Nisan',
    badge: 'Çelişki uyarısı',
    title: 'Yeni mesaj eski kararla çelişiyor',
    body:
      "Operasyon kanalında \"filo yenilemeyi durduralım, tamamen kiralamayla gidelim\" yazıldı. Decdock uyardı: bu konu 12 Mart'ta karara bağlanmıştı. İki kayıt yan yana, karar vereni ve gerekçesiyle.",
    link: '12 Mart kaydına bağlı',
  },
  {
    kind: 'superseding',
    date: '9 Mayıs',
    badge: 'Revize karar',
    title: "Filo yenileme 2027'ye ertelendi; 2026 kiralama ile yürüyecek",
    body: 'Yeni karar sicile işlendi ve eski kararın yerini aldı — zincir kopmadı.',
    quote:
      '"Nakit akışını koruyalım. Karar verildi: yenileme 2027\'ye, bu yıl kiralama."',
    meta: [
      { label: 'Onaylayan', value: 'Murat Aksoy — Operasyon Direktörü' },
      { label: 'Durum', value: '12 Mart kararını geçersiz kıldı' },
    ],
    link: 'Önceki karara bağlı — gerekçesiyle',
  },
]

const kindStyles: Record<NodeKind, { dot: string; badge: string; card: string; accentBar: string }> = {
  candidate: {
    dot: 'border-[var(--text-faint)] bg-[var(--page)]',
    badge: 'border-[var(--line-medium)] bg-[rgba(244,238,230,0.92)] text-[var(--text-muted)]',
    card: 'border-dashed border-[var(--line-medium)] bg-[rgba(244,238,230,0.52)]',
    accentBar: '',
  },
  ratified: {
    dot: 'border-[var(--success)] bg-[var(--success)]',
    badge: 'border-[rgba(92,117,96,0.28)] bg-[rgba(235,242,235,0.95)] text-[var(--success)]',
    card: 'border-[var(--line-soft)] bg-[linear-gradient(175deg,rgba(251,246,239,0.99),rgba(242,234,222,0.97))] shadow-[var(--shadow-card)]',
    accentBar: 'border-t-2 border-t-[var(--success)]',
  },
  conflict: {
    dot: 'border-[var(--warning)] bg-[var(--warning)]',
    badge: 'border-[rgba(160,112,72,0.3)] bg-[rgba(247,238,227,0.95)] text-[var(--warning)]',
    card: 'border-[rgba(160,112,72,0.28)] bg-[rgba(248,240,230,0.88)]',
    accentBar: 'border-t-2 border-t-[var(--warning)]',
  },
  superseding: {
    dot: 'border-[var(--accent)] bg-[var(--accent)]',
    badge: 'border-[rgba(161,118,78,0.28)] bg-[rgba(247,238,227,0.95)] text-[var(--accent)]',
    card: 'border-[var(--line-soft)] bg-[linear-gradient(175deg,rgba(251,246,239,0.99),rgba(242,234,222,0.97))] shadow-[var(--shadow-card)]',
    accentBar: 'border-t-2 border-t-[var(--accent)]',
  },
}

function ChainCard({ node }: { node: ChainNode }) {
  const s = kindStyles[node.kind]
  return (
    <article className={`relative overflow-hidden rounded-[4px] border p-5 ${s.card} ${s.accentBar}`}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-[3px] border px-2 py-0.5 text-[9.5px] font-[800] uppercase tracking-[0.12em] ${s.badge}`}
        >
          {node.badge}
        </span>
        {node.link && (
          <span className="text-[10.5px] font-[560] text-[var(--text-faint)]">
            ⛓ {node.link}
          </span>
        )}
      </div>

      <h3 className="mb-2 text-[15px] font-[680] leading-[1.32] text-[var(--text-strong)]">
        {node.title}
      </h3>
      <p className="text-[13px] leading-[1.72] text-[var(--text-body)]">{node.body}</p>

      {node.quote && (
        <p className="mt-3 border-l-2 border-[var(--accent-soft)] pl-3 text-[12px] italic leading-[1.62] text-[var(--text-body)]">
          {node.quote}
        </p>
      )}

      {node.meta && (
        <div className="mt-4 space-y-1.5 border-t border-[var(--line-soft)] pt-3">
          {node.meta.map((m) => (
            <div key={m.label} className="flex items-start gap-2">
              <span className="mt-px w-[84px] shrink-0 text-[10.5px] font-medium uppercase tracking-[0.07em] text-[var(--text-faint)]">
                {m.label}
              </span>
              <span className="text-[11.5px] font-[620] text-[var(--text-strong)]">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </article>
  )
}

export default function DecisionChain() {
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
      { threshold: 0.06 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="decision-chain" ref={ref} className="band-deep relative overflow-hidden py-24 lg:py-28">
      {/* Editorial section number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-10 select-none font-display text-[130px] font-[700] leading-none text-[rgba(161,118,78,0.05)] lg:text-[180px]"
      >
        03
      </span>

      <div className="relative mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <div className="reveal eyebrow-plain">Karar zinciri</div>
            <h2
              className="reveal reveal-delay-1 max-w-[16ch] font-display font-[640] leading-[1.04] tracking-[-0.03em] text-[var(--text-strong)]"
              style={{ fontSize: 'clamp(30px, 3.8vw, 46px)' }}
            >
              Tek konu, üç ay, dört dönüm noktası.
            </h2>
          </div>
          <p className="reveal reveal-delay-2 max-w-[50ch] text-[14.5px] leading-[1.8] text-[var(--text-body)] lg:pb-1">
            Gerçek hayatta karar tek bir cümle değildir: önerilir, onaylanır, biri
            unutup tersini söyler, sonra revize edilir. Decdock bu zinciri kopmadan
            tutar. "Soğuk zincir kapasitesi" konusunun üç aylık izi:
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical spine */}
          <div
            className="pointer-events-none absolute bottom-8 left-[17px] top-2 w-px bg-[linear-gradient(180deg,var(--line-medium),var(--accent-soft))] sm:left-[88px]"
            aria-hidden="true"
          />

          <div className="space-y-5">
            {nodes.map((node, i) => {
              const s = kindStyles[node.kind]
              return (
                <div
                  key={node.date}
                  className={`reveal reveal-delay-${i + 1} relative grid grid-cols-[36px_1fr] gap-4 sm:grid-cols-[72px_36px_1fr] sm:gap-3`}
                >
                  <div className="hidden pt-[18px] text-right text-[11px] font-[700] uppercase tracking-[0.08em] text-[var(--text-muted)] sm:block">
                    {node.date}
                  </div>
                  <div className="relative pt-[18px]">
                    <span
                      className={`relative z-10 block h-3 w-3 rounded-full border-2 ${s.dot}`}
                      style={{ marginLeft: '6px' }}
                    />
                  </div>
                  <div>
                    <div className="mb-1.5 text-[11px] font-[700] uppercase tracking-[0.08em] text-[var(--text-muted)] sm:hidden">
                      {node.date}
                    </div>
                    <ChainCard node={node} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Closing callout */}
        <p className="reveal mx-auto mt-12 max-w-3xl rounded-[4px] border border-[rgba(161,118,78,0.18)] bg-[rgba(247,239,228,0.82)] px-6 py-5 text-center text-[14px] font-[560] leading-[1.78] text-[var(--text-strong)]">
          Yeni gelen bir yönetici bu zinciri 30 saniyede okur: ne önerildi, ne
          kararlaştırıldı, kim onayladı, neden değişti. Kimse rapor yazmadı — zincir
          yazışmalardan kendiliğinden çıktı.
        </p>
      </div>
    </section>
  )
}
