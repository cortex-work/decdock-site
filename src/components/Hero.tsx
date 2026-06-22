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
    <div className="relative">
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

        {/* Source thread */}
        <div className="relative border-b border-[var(--line-soft)] px-5 py-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-[9.5px] font-[800] uppercase tracking-[0.14em] text-[var(--text-faint)]">
              Kaynak · dağınık e-posta zinciri
            </div>
            <div
              className="stamp-animate pointer-events-none shrink-0 rounded-[3px] border-2 border-[rgba(92,117,96,0.55)] px-2 py-[3px] text-[9px] font-[800] uppercase tracking-[0.2em] text-[rgba(92,117,96,0.82)]"
            >
              Sicile işlendi
            </div>
          </div>
          <div className="space-y-2 rounded-[4px] border border-[var(--line-soft)] bg-[rgba(244,238,230,0.54)] px-3 py-3 font-mono text-[11px] leading-[1.55] text-[var(--text-muted)]">
            <p><span className="font-[700] text-[var(--text-body)]">Selin:</span> Apollo lansmanı için pazarlama bütçesini netleştirelim.</p>
            <p><span className="font-[700] text-[var(--text-body)]">Burak:</span> Finans uygun — kontrollü artış mantıklı.</p>
            <p><span className="font-[700] text-[var(--text-body)]">Esra:</span> Onaylıyorum — pazarlama bütçesi %5 artışla kesinleşti.</p>
          </div>
        </div>

        {/* Transformation */}
        <div className="relative flex items-center justify-center gap-2 border-b border-[var(--line-soft)] px-5 py-3">
          <span aria-hidden="true" className="font-display text-[18px] leading-none text-[var(--accent)]">
            ↓
          </span>
          <span className="rounded-[999px] border border-[rgba(161,118,78,0.22)] bg-[rgba(247,238,227,0.8)] px-3 py-1 text-[9.5px] font-[800] uppercase tracking-[0.14em] text-[var(--accent)]">
            Decdock · okur, doğrular, işler
          </span>
        </div>

        {/* Clean decision record */}
        <div className="relative flex items-center justify-between border-b border-[var(--line-soft)] px-5 py-3.5">
          <div>
            <div className="text-[9.5px] font-[800] uppercase tracking-[0.14em] text-[var(--text-faint)]">
              Karar kaydı · KD-2026-0312
            </div>
            <div className="mt-0.5 text-[11px] text-[var(--text-faint)]">
              Pazarlama bütçesi &middot; 12 Mart 2026
            </div>
          </div>
          <span className="rounded-[3px] border border-[rgba(92,117,96,0.22)] bg-[rgba(236,241,236,0.95)] px-2 py-0.5 text-[9.5px] font-[800] uppercase tracking-[0.1em] text-[var(--success)]">
            Onaylı
          </span>
        </div>

        <div className="px-5 py-4">
          <p className="text-[14.5px] font-[640] leading-snug text-[var(--text-strong)]">
            Pazarlama bütçesi 2026&apos;da %5 artırıldı.
          </p>
        </div>

        <div className="space-y-2 border-t border-[var(--line-soft)] px-5 py-4">
          <MetaRow label="Onaylayan" value="Esra Tekin — CFO" dot="green" />
          <MetaRow label="Tarih" value="12 Mart 2026" />
          <MetaRow label="Kaynak" value="E-posta zinciri — Pazarlama bütçesi" />
        </div>

        {/* Source quote */}
        <div className="border-t border-[var(--line-soft)] px-5 py-4">
          <div className="mb-2 text-[9.5px] font-[800] uppercase tracking-[0.14em] text-[var(--text-faint)]">
            Kaynak alıntısı
          </div>
          <p className="border-l-2 border-[var(--accent-soft)] pl-3 text-[11.5px] italic leading-[1.65] text-[var(--text-body)]">
            "…pazarlama bütçesi %5 artışla kesinleşti."
          </p>
          <p className="mt-3 text-[10.5px] font-[650] uppercase tracking-[0.12em] text-[var(--text-faint)]">
            kaynaktaki cümleye birebir bağlı
          </p>
        </div>

        {/* Ledger-line footer texture */}
        <div className="h-[3px] bg-[linear-gradient(90deg,var(--accent-soft),transparent_80%)]" />
      </div>

      <a
        href="/demo-canli/"
        className="btn-primary mt-4 flex w-full items-center justify-center px-5 py-3 text-center text-[13px]"
      >
        Bunun gibi onlarcasını canlı demoda gör →
      </a>
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
              Kararlar e-posta ve toplantılarda kaybolur. Decdock karar sicilini çıkarır:
              ne kararlaştırıldı, kim onayladı, ne zaman — kaynağından birebir alıntıyla.
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

            {/* Live graph */}
            <div className="reveal reveal-delay-3 mb-10 max-w-[310px]">
              <a
                href="/karar-grafi/"
                className="group block rounded-[6px] border border-[var(--line-soft)] bg-[rgba(253,248,241,0.72)] px-4 py-3.5 shadow-[0_10px_28px_rgba(40,32,24,0.05)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent-soft)] hover:bg-[rgba(253,248,241,0.95)]"
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
            </div>

            {/* Trust footnote */}
            <p className="reveal reveal-delay-4 max-w-[50ch] text-[13px] leading-[1.8] text-[var(--text-faint)]">
              20–50 e-postayla başlarız; izleme, entegrasyon, sistem erişimi yok.
            </p>
          </div>

          {/* Right column — artifact card */}
          <div className="reveal reveal-delay-2 mx-auto w-full max-w-[440px] lg:block">
            <DecisionCard />
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="section-rule" />
    </section>
  )
}
