export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line-soft)] bg-[rgba(244,238,230,0.82)] shadow-[0_10px_30px_rgba(43,35,29,0.06)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-[15px] font-semibold tracking-tight text-[var(--text-strong)] transition-opacity hover:opacity-80">
          Decdock
        </a>

        <div className="flex items-center gap-5">
          <a
            href="#how-it-works"
            className="hidden text-[13px] font-medium text-[var(--text-body)] transition-colors hover:text-[var(--text-strong)] sm:block"
          >
            How it works
          </a>
          <a
            href="mailto:pilot@decdock.com"
            className="button-primary px-4 py-2 text-[13px] font-semibold"
          >
            Request pilot
          </a>
        </div>
      </div>
    </header>
  )
}
