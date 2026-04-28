export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E4E2DB] bg-[#F8F7F4]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Wordmark */}
        <a href="/" className="text-[15px] font-semibold tracking-tight text-[#1A1916] hover:opacity-80 transition-opacity">
          Decdock
        </a>

        {/* Right side */}
        <div className="flex items-center gap-5">
          <a
            href="#how-it-works"
            className="hidden sm:block text-[13px] font-medium text-[#57554F] transition-colors hover:text-[#1A1916]"
          >
            How it works
          </a>
          <a
            href="mailto:pilot@decdock.com"
            className="rounded-md bg-[#1C3450] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#152840]"
          >
            Request pilot access
          </a>
        </div>
      </div>
    </header>
  )
}
