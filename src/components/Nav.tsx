'use client'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

const links = [
  { href: '/#how-it-works', label: 'Nasıl çalışır' },
  { href: '/#faq', label: 'Sık sorulanlar' },
  { href: '/karar-grafi/', label: 'Karar ağı' },
  { href: '/demo-canli/', label: 'Canlı demo' },
  { href: '/demo/', label: '60 sn tanıtım' },
  { href: '/urun/', label: 'Ürün detayı' },
  { href: '/karsilastirma/', label: 'Karşılaştırma' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line-soft)] bg-[rgba(242,236,227,0.86)] backdrop-blur-xl shadow-[0_8px_28px_rgba(40,32,24,0.07)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-[14px]">
        <a
          href="/"
          className="flex items-center gap-2.5 text-[var(--text-strong)] transition-opacity hover:opacity-75"
          aria-label="Decdock ana sayfa"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="20" height="20" rx="3" stroke="var(--accent)" strokeWidth="1.4" />
            <line x1="5" y1="7" x2="17" y2="7" stroke="var(--accent)" strokeWidth="1.1" strokeLinecap="round" />
            <line x1="5" y1="11" x2="13" y2="11" stroke="var(--text-muted)" strokeWidth="1.1" strokeLinecap="round" />
            <line x1="5" y1="15" x2="15" y2="15" stroke="var(--text-muted)" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          <span className="text-[14px] font-[780] tracking-[-0.02em]">Decdock</span>
        </a>

        <nav className="hidden items-center gap-5 sm:flex" aria-label="Ana navigasyon">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <a
            href="mailto:pilot@decdock.com?subject=Karar%20Denetimi%20talebi"
            className="btn-primary ml-2 px-4 py-2 text-[0.75rem]"
          >
            Karar Denetimi isteyin
          </a>
        </nav>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] sm:hidden"
              aria-label="Menüyü aç"
            >
              <span
                className="block h-[1.5px] w-5 bg-[var(--text-strong)] transition-all duration-200"
                style={open ? { transform: 'rotate(45deg) translate(4px, 4px)' } : {}}
              />
              <span
                className="block h-[1.5px] w-5 bg-[var(--text-strong)] transition-all duration-200"
                style={open ? { opacity: 0 } : {}}
              />
              <span
                className="block h-[1.5px] w-5 bg-[var(--text-strong)] transition-all duration-200"
                style={open ? { transform: 'rotate(-45deg) translate(4px, -4px)' } : {}}
              />
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay data-radix-dialog-overlay className="fixed inset-0 z-[100]" />
            <Dialog.Content
              className="fixed bottom-0 right-0 top-0 z-[101] flex w-[78vw] max-w-[320px] flex-col bg-[var(--page)] p-8 shadow-[-2px_0_40px_rgba(40,32,24,0.18)]"
              aria-describedby={undefined}
            >
              <Dialog.Title className="sr-only">Navigasyon menüsü</Dialog.Title>
              <div className="mb-8 flex items-center justify-between">
                <span className="text-[14px] font-[780] tracking-[-0.02em] text-[var(--text-strong)]">Decdock</span>
                <Dialog.Close asChild>
                  <button
                    className="flex h-8 w-8 items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-strong)]"
                    aria-label="Kapat"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </Dialog.Close>
              </div>
              <nav className="flex flex-col gap-1" aria-label="Mobil navigasyon">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-[3px] px-3 py-3 text-[15px] font-medium text-[var(--text-body)] transition-colors hover:bg-[rgba(161,118,78,0.08)] hover:text-[var(--text-strong)]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto pt-8">
                <a
                  href="mailto:pilot@decdock.com?subject=Karar%20Denetimi%20talebi"
                  className="btn-primary w-full py-3 text-[0.8rem]"
                  onClick={() => setOpen(false)}
                >
                  Karar Denetimi isteyin
                </a>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  )
}
