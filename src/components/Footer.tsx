export default function Footer() {
  return (
    <footer className="border-t border-[#E4E2DB] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <span className="text-[14px] font-semibold tracking-tight text-[#1A1916]">Decdeck</span>
        <span className="text-[13px] text-[#9B978F]">
          &copy; 2026 Decdeck. All rights reserved.
        </span>
        <a
          href="mailto:pilot@decdeck.com"
          className="text-[13px] text-[#57554F] transition-colors hover:text-[#1A1916]"
        >
          pilot@decdeck.com
        </a>
      </div>
    </footer>
  )
}
