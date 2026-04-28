export default function Footer() {
  return (
    <footer className="section-band py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <span className="text-[14px] font-semibold tracking-tight text-[var(--text-strong)]">Decdock</span>
        <span className="text-[13px] text-[var(--text-faint)]">
          &copy; 2026 Decdock. All rights reserved.
        </span>
        <a
          href="mailto:pilot@decdock.com"
          className="text-[13px] text-[var(--text-body)] transition-colors hover:text-[var(--text-strong)]"
        >
          pilot@decdock.com
        </a>
      </div>
    </footer>
  )
}
