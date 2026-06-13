export default function Footer() {
  return (
    <footer className="section-band py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="text-[14px] font-semibold tracking-tight text-[var(--text-strong)]">Decdock</span>
          <span className="text-[13px] text-[var(--text-faint)]">Şirketinizin karar sicili</span>
        </div>
        <span className="text-[13px] text-[var(--text-faint)]">&copy; 2026 Decdock. Tüm hakları saklıdır.</span>
        <div className="flex items-center gap-4">
          <a
            href="/urun/"
            className="text-[13px] text-[var(--text-body)] transition-colors hover:text-[var(--text-strong)]"
          >
            Ürün detayı
          </a>
          <a
            href="/basla/"
            className="text-[13px] text-[var(--text-body)] transition-colors hover:text-[var(--text-strong)]"
          >
            Süreç
          </a>
          <a
            href="/karsilastirma/"
            className="text-[13px] text-[var(--text-body)] transition-colors hover:text-[var(--text-strong)]"
          >
            Karşılaştırma
          </a>
          <a
            href="mailto:pilot@decdock.com"
            className="text-[13px] text-[var(--text-body)] transition-colors hover:text-[var(--text-strong)]"
          >
            pilot@decdock.com
          </a>
          <a
            href="https://www.linkedin.com/company/decdock"
            className="text-[13px] text-[var(--text-body)] transition-colors hover:text-[var(--text-strong)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
