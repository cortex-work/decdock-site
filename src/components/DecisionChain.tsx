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
      'Selin: "Frigo araç kiralayarak kapasiteyi geçici artırabiliriz bence." Decdock bunu sicile yazmadı: kişisel görüş, onay yok. İnceleme listesinde şeffafça duruyor.',
  },
  {
    kind: 'ratified',
    date: '12 Mart',
    badge: 'Onaylı karar',
    title: 'Soğuk zincir kapasitesi Seçenek B ile artırılacak',
    body: 'Kısmi filo yenileme + depo genişletme. Q2 bütçesine işlendi.',
    quote: '"İki senaryoyu inceledim. Onaylıyorum — Seçenek B ile ilerliyoruz, Q2 bütçesine işleyin."',
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
      'Operasyon kanalında "filo yenilemeyi durduralım, tamamen kiralamayla gidelim" yazıldı. Decdock uyardı: bu konu 12 Mart\'ta karara bağlanmıştı. İki kayıt yan yana, karar vereni ve gerekçesiyle.',
    link: '12 Mart kaydına bağlı',
  },
  {
    kind: 'superseding',
    date: '9 Mayıs',
    badge: 'Revize karar',
    title: 'Filo yenileme 2027\'ye ertelendi; 2026 kiralama ile yürüyecek',
    body: 'Yeni karar sicile işlendi ve eski kararın yerini aldı — zincir kopmadı.',
    quote: '"Nakit akışını koruyalım. Karar verildi: yenileme 2027\'ye, bu yıl kiralama."',
    meta: [
      { label: 'Onaylayan', value: 'Murat Aksoy — Operasyon Direktörü' },
      { label: 'Durum', value: '12 Mart kararını geçersiz kıldı' },
    ],
    link: 'Önceki karara bağlı — gerekçesiyle',
  },
]

const kindStyles: Record<
  NodeKind,
  { dot: string; badge: string; card: string }
> = {
  candidate: {
    dot: 'border-[var(--text-faint)] bg-[var(--page)]',
    badge: 'border-[var(--line-strong)] bg-[rgba(244,238,230,0.9)] text-[var(--text-muted)]',
    card: 'border-dashed border-[var(--line-strong)] bg-[rgba(247,241,234,0.5)]',
  },
  ratified: {
    dot: 'border-[var(--success)] bg-[var(--success)]',
    badge: 'border-[rgba(101,125,104,0.3)] bg-[rgba(238,242,237,0.95)] text-[var(--success)]',
    card: 'border-[var(--line-soft)] bg-[linear-gradient(180deg,rgba(250,245,239,0.98),rgba(243,236,227,0.96))] shadow-card',
  },
  conflict: {
    dot: 'border-[var(--warning)] bg-[var(--warning)]',
    badge: 'border-[rgba(169,123,82,0.3)] bg-[rgba(247,239,228,0.95)] text-[var(--warning)]',
    card: 'border-[rgba(169,123,82,0.32)] bg-[rgba(248,241,232,0.85)]',
  },
  superseding: {
    dot: 'border-[var(--accent)] bg-[var(--accent)]',
    badge: 'border-[rgba(161,118,78,0.3)] bg-[rgba(247,239,228,0.95)] text-[var(--accent)]',
    card: 'border-[var(--line-soft)] bg-[linear-gradient(180deg,rgba(250,245,239,0.98),rgba(243,236,227,0.96))] shadow-card',
  },
}

function ChainCard({ node }: { node: ChainNode }) {
  const s = kindStyles[node.kind]
  return (
    <article className={`relative rounded-[22px] border p-5 ${s.card}`}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${s.badge}`}
        >
          {node.badge}
        </span>
        {node.link && (
          <span className="text-[11px] font-medium text-[var(--text-faint)]">
            ⛓ {node.link}
          </span>
        )}
      </div>

      <h3 className="mb-2 text-[16px] font-semibold leading-[1.35] text-[var(--text-strong)]">
        {node.title}
      </h3>
      <p className="text-[13.5px] leading-[1.7] text-[var(--text-body)]">{node.body}</p>

      {node.quote && (
        <p className="mt-3 border-l-2 border-[var(--accent-soft)] pl-3 text-[12.5px] italic leading-[1.6] text-[var(--text-body)]">
          {node.quote}
        </p>
      )}

      {node.meta && (
        <div className="mt-4 space-y-1.5 border-t border-[var(--line-soft)] pt-3">
          {node.meta.map((m) => (
            <div key={m.label} className="flex items-center gap-2">
              <span className="w-[88px] shrink-0 text-[11px] text-[var(--text-faint)]">
                {m.label}
              </span>
              <span className="text-[12px] font-medium text-[var(--text-strong)]">
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
  return (
    <section id="decision-chain" className="section-band py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.92fr_0.96fr] lg:items-start">
          <div>
            <div className="eyebrow-plain">Karar zinciri</div>
            <h2 className="max-w-[16ch] font-display text-[34px] font-[600] leading-[1.08] text-[var(--text-strong)] sm:text-[38px]">
              Tek konu, üç ay, dört dönüm noktası.
            </h2>
          </div>
          <p className="max-w-[52ch] text-[14.5px] leading-[1.75] text-[var(--text-body)] lg:pt-9">
            Gerçek hayatta karar tek bir cümle değildir: önerilir, onaylanır, biri
            unutup tersini söyler, sonra revize edilir. Decdock bu zinciri kopmadan
            tutar. "Soğuk zincir kapasitesi" konusunun üç aylık izi:
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          {/* Dikey zincir çizgisi */}
          <div
            className="pointer-events-none absolute bottom-6 left-[17px] top-2 w-px bg-[linear-gradient(180deg,var(--line-strong),var(--accent-soft))] sm:left-[88px]"
            aria-hidden="true"
          />

          <div className="space-y-6">
            {nodes.map((node) => {
              const s = kindStyles[node.kind]
              return (
                <div
                  key={node.date}
                  className="relative grid grid-cols-[36px_1fr] gap-4 sm:grid-cols-[72px_36px_1fr] sm:gap-3"
                >
                  <div className="hidden pt-4 text-right text-[12px] font-semibold text-[var(--text-muted)] sm:block">
                    {node.date}
                  </div>
                  <div className="relative pt-4">
                    <span
                      className={`relative z-10 block h-3 w-3 rounded-full border-2 ${s.dot}`}
                      style={{ marginLeft: '6px' }}
                    />
                  </div>
                  <div>
                    <div className="mb-1.5 text-[12px] font-semibold text-[var(--text-muted)] sm:hidden">
                      {node.date}
                    </div>
                    <ChainCard node={node} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-3xl rounded-[18px] border border-[rgba(161,118,78,0.2)] bg-[rgba(247,239,228,0.8)] px-5 py-4 text-center text-[14px] font-medium leading-[1.7] text-[var(--text-strong)]">
          Yeni gelen bir yönetici bu zinciri 30 saniyede okur: ne önerildi, ne
          kararlaştırıldı, kim onayladı, neden değişti. Kimse rapor yazmadı — zincir
          yazışmalardan kendiliğinden çıktı.
        </p>
      </div>
    </section>
  )
}
