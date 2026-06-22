import { useEffect, useRef } from 'react'

interface MetaRowProps {
  label: string
  value: string
  dot?: 'green'
}

function MetaRow({ label, value, dot }: MetaRowProps) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-[1px] w-[100px] shrink-0 text-[10.5px] font-medium uppercase tracking-[0.08em] text-[var(--text-faint)]">
        {label}
      </span>
      <div className="flex items-center gap-1.5">
        {dot === 'green' && (
          <span className="mt-px h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--success)]" />
        )}
        <span className="text-[12px] font-[560] text-[var(--text-strong)]">{value}</span>
      </div>
    </div>
  )
}

function DecisionCard() {
  return (
    <div className="relative select-none" aria-hidden="true">
      {/* Stacked card shadows */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-[6px] border border-[var(--line-soft)] bg-[rgba(244,237,228,0.38)]"
        style={{ transform: 'rotate(3.2deg) translateY(14px) translateX(12px)' }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-[6px] border border-[var(--line-soft)] bg-[rgba(247,241,233,0.58)]"
        style={{ transform: 'rotate(1.5deg) translateY(7px) translateX(5px)' }}
      />

      {/* Halo */}
      <div className="pointer-events-none absolute -inset-12 -z-20 rounded-full bg-[radial-gradient(circle,rgba(210,196,180,0.45),rgba(180,160,138,0.16),transparent_70%)] blur-3xl" />

      <div className="relative overflow-hidden rounded-[6px] border border-[var(--line-soft)] bg-[linear-gradient(175deg,rgba(253,248,241,0.99)_0%,rgba(242,234,222,0.98)_100%)] shadow-[var(--shadow-card-lg)]">

        {/* Top sheen */}
        <div className="absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(255,252,248,0.5),transparent)]" />

        {/* Stamp */}
        <div
          className="stamp-animate pointer-events-none absolute right-4 top-14 z-10 rounded-[3px] border-2 border-[rgba(92,117,96,0.55)] px-2 py-[3px] text-[9px] font-[800] uppercase tracking-[0.2em] text-[rgba(92,117,96,0.82)]"
        >
          Sicile işlendi
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-[var(--line-soft)] px-5 py-3.5">
          <div>
            <div className="text-[9.5px] font-[800] uppercase tracking-[0.14em] text-[var(--text-faint)]">
              Karar kaydı · KD-2026-0312
            </div>
            <div className="mt-0.5 text-[11px] text-[var(--text-faint)]">
              Tedarikçi seçimi &middot; 12 Mart 2026
            </div>
          </div>
          <span className="rounded-[3px] border border-[rgba(92,117,96,0.22)] bg-[rgba(236,241,236,0.95)] px-2 py-0.5 text-[9.5px] font-[800] uppercase tracking-[0.1em] text-[var(--success)]">
            Onaylı
          </span>
        </div>

        {/* Decision text */}
        <div className="px-5 py-4">
          <p className="text-[14.5px] font-[640] leading-snug text-[var(--text-strong)]">
            2026 lojistik sözleşmesi KargoPlus ile yapılacak; SLA taahhüdü ve Anadolu
            kapsaması belirleyici oldu.
          </p>
        </div>

        {/* Meta rows */}
        <div className="space-y-2 border-t border-[var(--line-soft)] px-5 py-4">
          <MetaRow label="Onaylayan" value="Murat Aksoy — Operasyon Direktörü" dot="green" />
          <MetaRow label="Kaynak" value="E-posta zinciri — Tedarikçi seçimi" />
          <MetaRow label="Tarih" value="12 Mart 2026" />
        </div>

        {/* Source quote */}
        <div className="border-t border-[var(--line-soft)] px-5 py-4">
          <div className="mb-2 text-[9.5px] font-[800] uppercase tracking-[0.14em] text-[var(--text-faint)]">
            Kaynak alıntısı
          </div>
          <p className="border-l-2 border-[var(--accent-soft)] pl-3 text-[11.5px] italic leading-[1.65] text-[var(--text-body)]">
            "Karar verildi: 2026 sözleşmesini KargoPlus ile yapıyoruz. SLA taahhüdü ve
            Anadolu kapsaması belirleyici oldu. Onaylıyorum."
          </p>
        </div>

        {/* Ledger-line footer texture */}
        <div className="h-[3px] bg-[linear-gradient(90deg,var(--accent-soft),transparent_80%)]" />
      </div>
    </div>
  )
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)

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
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed paper gradient + subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_20%,rgba(255,250,244,0.5),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(226,218,207,0.3))]" />

      <div ref={ref} className="relative mx-auto max-w-6xl px-6 pb-28 pt-20 lg:pb-36 lg:pt-28">

        {/* ── ASYMMETRIC HERO GRID ──────────────────────────────── */}
        <div className="grid gap-16 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] xl:gap-24 items-center">

          {/* Left column — copy */}
          <div>
            {/* Eyebrow */}
            <div className="reveal mb-8 flex items-center gap-3">
              <span className="eyebrow">Decdock &middot; Karar sicili</span>
              <span className="hidden sm:block h-px w-12 bg-[var(--accent-soft)]" />
            </div>

            {/* Headline — large, editorial, left-weight */}
            <h1 className="reveal reveal-delay-1 mb-7 font-display font-[640] leading-[0.98] tracking-[-0.04em] text-[var(--text-strong)]"
                style={{ fontSize: 'clamp(52px, 7.5vw, 84px)' }}>
              <span className="block">&ldquo;Bu kararı</span>
              <span className="block text-[var(--accent)]">kim almıştı?&rdquo;</span>
            </h1>

            {/* Ledger rule — brand signature */}
            <span className="reveal reveal-delay-2 ledger-rule" />

            {/* Body */}
            <p className="reveal reveal-delay-2 mb-4 max-w-[52ch] text-[16px] leading-[1.82] text-[var(--text-body)]">
              Kararlar e-postalarda ve toplantılarda alınıp kayboluyor. Decdock,
              yazışmalarınızdan şirketinizin karar sicilini çıkarır: ne kararlaştırıldı,
              kim onayladı, ne zaman — kaynağından birebir alıntıyla.
            </p>

            <p className="reveal reveal-delay-3 mb-8 text-[11.5px] font-[700] uppercase tracking-[0.12em] text-[var(--text-faint)]">
              E-posta ve toplantı notlarıyla başlar &middot; İzleme değil, seçtiğiniz kaynaklar &middot; KVKK uyumlu
            </p>

            {/* CTAs */}
            <div className="reveal reveal-delay-3 mb-4 flex flex-wrap gap-3">
              <a
                href="mailto:pilot@decdock.com?subject=Karar%20Denetimi%20talebi"
                className="btn-primary"
              >
                Karar Denetimi isteyin
              </a>
              <a href="/demo/" className="btn-ghost">
                60 saniyede izleyin
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            {/* Live surfaces */}
            <div className="reveal reveal-delay-3 mb-10 grid max-w-[620px] gap-3 sm:grid-cols-2">
              <a
                href="/karar-grafi/"
                className="group rounded-[6px] border border-[var(--line-soft)] bg-[rgba(253,248,241,0.72)] px-4 py-3.5 shadow-[0_10px_28px_rgba(40,32,24,0.05)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent-soft)] hover:bg-[rgba(253,248,241,0.95)]"
              >
                <span className="block text-[10px] font-[800] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                  Karar Grafı
                </span>
                <span className="mt-1 flex items-center justify-between gap-3 text-[13px] font-[680] text-[var(--accent)]">
                  Kararların ağını canlı gör
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
              <a
                href="/demo-canli/"
                className="group rounded-[6px] border border-[var(--line-soft)] bg-[rgba(253,248,241,0.72)] px-4 py-3.5 shadow-[0_10px_28px_rgba(40,32,24,0.05)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent-soft)] hover:bg-[rgba(253,248,241,0.95)]"
              >
                <span className="block text-[10px] font-[800] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                  Canlı Demo
                </span>
                <span className="mt-1 flex items-center justify-between gap-3 text-[13px] font-[680] text-[var(--accent)]">
                  Çalışan sicili gez
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            </div>

            {/* Trust footnote */}
            <p className="reveal reveal-delay-4 max-w-[50ch] text-[13px] leading-[1.8] text-[var(--text-faint)]">
              İlk adım kurulum değil: bitmiş bir projenizin 20–50 e-postasını paylaşın,
              3 iş günü içinde karar sicili raporunuzu teslim edelim.
              Entegrasyon yok, sistem erişimi yok.
            </p>
          </div>

          {/* Right column — artifact card */}
          <div className="reveal reveal-delay-2 hidden lg:block">
            <DecisionCard />
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="section-rule" />
    </section>
  )
}
