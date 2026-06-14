export default function Footer() {
  return (
    <footer className="band-deep border-t border-[var(--line-medium)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row sm:gap-4">
        <div className="flex flex-col items-center gap-0.5 sm:items-start">
          <span className="text-[13.5px] font-[780] tracking-[-0.02em] text-[var(--text-strong)]">Decdock</span>
          <span className="text-[12px] text-[var(--text-faint)]">Şirketinizin karar sicili</span>
        </div>

        <span className="text-[12px] text-[var(--text-faint)]">
          &copy; 2026 Decdock. Tüm hakları saklıdır.
        </span>

        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-5" aria-label="Alt navigasyon">
          {[
            { href: '/urun/', label: 'Ürün detayı' },
            { href: '/basla/', label: 'Süreç' },
            { href: '/karsilastirma/', label: 'Karşılaştırma' },
            { href: 'mailto:pilot@decdock.com', label: 'pilot@decdock.com' },
            {
              href: 'https://www.linkedin.com/company/decdock',
              label: 'LinkedIn',
              external: true,
            },
          ].map((l) => (
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
    </footer>
  )
}
