const mainLinks: Array<{ href: string; label: string; external?: boolean }> = [
  { href: '/urun/', label: 'Ürün detayı' },
  { href: '/basla/', label: 'Süreç' },
  { href: '/karsilastirma/', label: 'Karşılaştırma' },
  { href: 'mailto:pilot@decdock.com', label: 'pilot@decdock.com' },
  { href: 'https://www.linkedin.com/company/decdock', label: 'LinkedIn', external: true },
]

const guideLinks: Array<{ href: string; label: string }> = [
  { href: '/karar-sicili/', label: 'Karar sicili nedir?' },
  { href: '/karar-takibi/', label: 'Kararlar nasıl takip edilir?' },
  { href: '/kurumsal-hafiza/', label: 'Kurumsal hafıza' },
  { href: '/rag-vs-karar-sicili/', label: 'Yapay zekâ asistanından farkı' },
]

export default function Footer() {
  return (
    <footer className="band-deep border-t border-[var(--line-medium)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">

        {/* Top row */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-4">
          <div className="flex flex-col items-center gap-0.5 sm:items-start">
            <span className="text-[13.5px] font-[780] tracking-[-0.02em] text-[var(--text-strong)]">Decdock</span>
            <span className="text-[12px] text-[var(--text-faint)]">Şirketinizin karar sicili</span>
            <a
              href="mailto:founder@decdock.com"
              className="mt-1 text-[12px] text-[var(--text-muted)] transition-colors hover:text-[var(--text-strong)]"
            >
              Sorularınız için: founder@decdock.com
            </a>
          </div>

          <span className="text-[12px] text-[var(--text-faint)]">
            &copy; 2026 Decdock. Tüm hakları saklıdır.
          </span>

          <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-5" aria-label="Alt navigasyon">
            {mainLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[12px] text-[var(--text-muted)] transition-colors hover:text-[var(--text-strong)]"
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Guides row — internal links so the rehber pages aren't orphaned */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-[var(--line-soft)] pt-5 sm:justify-start">
          <span className="text-[11px] font-[700] uppercase tracking-[0.1em] text-[var(--text-faint)]">Rehberler</span>
          {guideLinks.map((g) => (
            <a
              key={g.href}
              href={g.href}
              className="text-[12px] text-[var(--text-muted)] transition-colors hover:text-[var(--text-strong)]"
            >
              {g.label}
            </a>
          ))}
        </div>

      </div>
    </footer>
  )
}
