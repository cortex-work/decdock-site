import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

const auditMailto =
  'mailto:pilot@decdock.com?subject=Request%20Decision%20Audit'

const navLinks = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#signals', label: 'Resolution signals' },
  { href: '/enron-proof/', label: 'Enron proof' },
  { href: '/enron-graph/', label: 'Live graph' },
  { href: '/tr/', label: 'TR' },
]

const signalCards = [
  {
    label: 'Duplicate',
    title: 'One decision, many mentions',
    body:
      'Repeated records collapse into one registry entry while the source trail stays visible.',
  },
  {
    label: 'Contradiction',
    title: 'Two live claims disagree',
    body:
      'The registry does not pretend certainty. It flags the conflicting sides for review.',
  },
  {
    label: 'Supersession',
    title: 'A later decision replaces an older one',
    body:
      'Strict dates matter: a replacement must be newer, sourced, and linked to what it changes.',
  },
  {
    label: 'Authorized exception',
    title: 'A policy break may still be valid',
    body:
      'Exceptions are kept with authority, conditions, and source context instead of being flattened.',
  },
  {
    label: 'Exception drift',
    title: 'Yesterday\'s exception becomes today\'s habit',
    body:
      'The system can surface when a one-off exception starts behaving like a new policy.',
  },
  {
    label: 'Authority at time',
    title: 'Who could approve this then?',
    body:
      'Authority is evaluated in the time window of the decision, not as a timeless org chart claim.',
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Extract from a bounded archive',
    body:
      'Start with a selected slice of email or meeting notes. Decdock reads for source-linked decision candidates, not employee surveillance.',
  },
  {
    step: '02',
    title: 'Resolve the decision memory',
    body:
      'Duplicates, contradictions, supersession, authority, and exception candidates are separated before anything is treated as durable memory.',
  },
  {
    step: '03',
    title: 'Review the write boundary',
    body:
      'The output is a registry and graph a human can inspect. Verified writes can become governed memory; uncertain items stay visible as review work.',
  },
]

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  )
}

function LogoMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="20" height="20" rx="3" stroke="var(--accent)" strokeWidth="1.4" />
      <line x1="5" y1="7" x2="17" y2="7" stroke="var(--accent)" strokeLinecap="round" strokeWidth="1.1" />
      <line x1="5" y1="11" x2="13" y2="11" stroke="var(--text-muted)" strokeLinecap="round" strokeWidth="1.1" />
      <line x1="5" y1="15" x2="15" y2="15" stroke="var(--text-muted)" strokeLinecap="round" strokeWidth="1.1" />
    </svg>
  )
}

function EnglishNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line-soft)] bg-[rgba(242,236,227,0.9)] backdrop-blur-xl shadow-[0_8px_28px_rgba(40,32,24,0.07)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-[14px]">
        <a
          href="/"
          className="flex items-center gap-2.5 text-[var(--text-strong)] transition-opacity hover:opacity-75"
          aria-label="Decdock home"
        >
          <LogoMark />
          <span className="text-[14px] font-[780]">Decdock</span>
        </a>

        <nav className="hidden items-center justify-end gap-x-5 gap-y-2 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <a href="/enron-proof/" className="btn-primary ml-0 px-4 py-2 text-[0.75rem] sm:ml-2">
            See real proof
          </a>
        </nav>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
              aria-label="Open menu"
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
              className="fixed bottom-0 right-0 top-0 z-[101] flex w-[82vw] max-w-[320px] flex-col bg-[var(--page)] p-8 shadow-[-2px_0_40px_rgba(40,32,24,0.18)]"
              aria-describedby={undefined}
            >
              <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>
              <div className="mb-8 flex items-center justify-between">
                <span className="text-[14px] font-[780] text-[var(--text-strong)]">Decdock</span>
                <Dialog.Close asChild>
                  <button
                    className="flex h-8 w-8 items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-strong)]"
                    aria-label="Close menu"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
                    </svg>
                  </button>
                </Dialog.Close>
              </div>
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {navLinks.map((link) => (
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
              <div className="mt-auto grid gap-3 pt-8">
                <a
                  href="/enron-proof/"
                  className="btn-primary w-full py-3 text-[0.8rem]"
                  onClick={() => setOpen(false)}
                >
                  See it on real data
                </a>
                <a
                  href={auditMailto}
                  className="btn-ghost w-full py-3 text-[0.8rem]"
                  onClick={() => setOpen(false)}
                >
                  Request Decision Audit
                </a>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  )
}

function WriteBoundaryPanel() {
  return (
    <div className="panel-strong relative overflow-hidden rounded-[6px] p-5 shadow-[var(--shadow-card-lg)]">
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-[var(--line-soft)] pb-4">
        <div>
          <div className="text-[10px] font-[800] uppercase text-[var(--text-faint)]">
            Write boundary
          </div>
          <div className="mt-1 text-[15px] font-[720] text-[var(--text-strong)]">
            Only reviewed decisions return to memory
          </div>
        </div>
        <span className="rounded-[3px] border border-[rgba(92,117,96,0.24)] bg-[rgba(236,241,236,0.95)] px-2 py-1 text-[10px] font-[800] uppercase text-[var(--success)]">
          Verified
        </span>
      </div>

      <div className="grid gap-3">
        {[
          ['Sources', 'emails, notes, threads'],
          ['Resolver', 'dedupe, conflict, supersede'],
          ['Registry', 'source-linked decisions'],
        ].map(([title, body], index) => (
          <div key={title} className="grid grid-cols-[92px_1fr] items-center gap-3">
            <div className="rounded-[4px] border border-[var(--line-soft)] bg-[rgba(251,246,239,0.74)] px-3 py-2">
              <div className="text-[10px] font-[800] uppercase text-[var(--accent)]">{title}</div>
              <div className="mt-1 text-[11px] leading-[1.35] text-[var(--text-muted)]">{body}</div>
            </div>
            <div className="relative h-12 rounded-[4px] border border-[var(--line-soft)] bg-[rgba(244,238,230,0.62)]">
              <div className="absolute left-3 top-1/2 h-px w-[calc(100%-24px)] -translate-y-1/2 bg-[var(--accent-soft)]" />
              <span
                className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-[var(--success)] bg-[var(--page)]"
                style={{ left: `${24 + index * 26}%` }}
              />
              <span
                className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-[var(--accent)] bg-[var(--page)]"
                style={{ left: `${49 + index * 12}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[4px] border border-[rgba(161,118,78,0.22)] bg-[rgba(247,239,228,0.82)] p-4">
        <div className="mb-2 text-[10px] font-[800] uppercase text-[var(--accent)]">
          Example review
        </div>
        <p className="text-[13px] font-[560] leading-[1.72] text-[var(--text-strong)]">
          Later policy update supersedes an older threshold. Same-date disagreement stays a conflict,
          not a false replacement.
        </p>
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 pb-24 pt-20 lg:grid-cols-[1fr_420px] lg:items-center lg:pb-32 lg:pt-28 xl:gap-20">
        <div>
          <div className="mb-7 flex items-center gap-3">
            <span className="eyebrow text-[var(--accent-deep)]">Decdock - The write boundary</span>
            <span className="hidden h-px w-12 bg-[var(--accent-soft)] sm:block" />
          </div>
          <h1
            className="mb-7 max-w-[11ch] font-display text-[48px] font-[640] leading-[1.02] text-[var(--text-strong)] sm:text-[60px] lg:text-[76px] xl:text-[82px]"
          >
            Resolve decisions, not just store them.
          </h1>
          <span className="ledger-rule" />
          <p className="mb-4 max-w-[58ch] text-[16px] leading-[1.82] text-[var(--text-body)]">
            Decdock turns messy emails and meeting notes into a governed decision registry:
            what was decided, who had authority, what changed, and which exceptions were valid
            at the time.
          </p>
          <p className="mb-8 max-w-[62ch] text-[13px] font-[700] uppercase text-[var(--text-body)]">
            Duplicate - contradiction - supersession - authorized exception - exception drift - authority at time
          </p>
          <div className="mb-5 flex flex-wrap gap-3">
            <a href="/enron-proof/" className="btn-primary">
              See it on real data
              <ArrowIcon />
            </a>
            <a href={auditMailto} className="btn-ghost">
              Request Decision Audit
              <ArrowIcon />
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/enron-graph/"
              className="group inline-flex max-w-[350px] items-center justify-between gap-4 rounded-[6px] border border-[var(--line-soft)] bg-[rgba(253,248,241,0.72)] px-4 py-3.5 text-[13px] font-[680] text-[var(--accent-deep)] shadow-[0_10px_28px_rgba(40,32,24,0.05)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent-soft)] hover:bg-[rgba(253,248,241,0.95)]"
            >
              See the decision graph live
              <ArrowIcon />
            </a>
            <a href="/demo/" className="btn-ghost">
              Watch in 60s
              <ArrowIcon />
            </a>
          </div>
        </div>

        <WriteBoundaryPanel />
      </div>
      <div className="section-rule" />
    </section>
  )
}

function ProofSection() {
  return (
    <section className="band-deep relative overflow-hidden py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="eyebrow-plain text-[var(--accent-deep)]">Public proof</div>
            <h2
              className="mb-5 max-w-[16ch] font-display text-[32px] font-[640] leading-[1.06] text-[var(--text-strong)] lg:text-[44px]"
            >
              The proof path is source first.
            </h2>
            <p className="max-w-[54ch] text-[14.5px] leading-[1.82] text-[var(--text-body)]">
              The English proof pages show a Decdock run over the public Enron email archive:
              source-linked records, conflicts, and strict newer-than-older supersession edges.
              The claim is intentionally narrow: candidate memory and review signals a human can verify.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {[
              ['Real archive', 'public Enron email'],
              ['Source-linked', 'record to thread'],
              ['Honest drift', 'conflict vs supersede'],
            ].map(([label, value]) => (
              <div key={label} className="panel rounded-[4px] p-5">
                <div className="mb-2 text-[10px] font-[800] uppercase text-[var(--text-faint)]">
                  {label}
                </div>
                <div className="font-display text-[24px] font-[640] leading-[1.1] text-[var(--text-strong)]">
                  {value}
                </div>
              </div>
            ))}
            <a href="/enron-proof/" className="btn-primary md:col-span-2">
              Open the decision registry
              <ArrowIcon />
            </a>
            <a href="/enron-graph/" className="btn-ghost">
              Open the graph
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function SignalSection() {
  return (
    <section id="signals" className="band-paper relative overflow-hidden py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="eyebrow-plain text-[var(--accent-deep)]">Resolution signals</div>
            <h2
              className="max-w-[15ch] font-display text-[32px] font-[640] leading-[1.06] text-[var(--text-strong)] lg:text-[44px]"
            >
              The registry keeps disagreement visible.
            </h2>
          </div>
          <p className="max-w-[56ch] text-[14.5px] leading-[1.82] text-[var(--text-body)]">
            A decision memory system should not launder yesterday's error into today's context.
            Decdock separates the cases that need review before they become governed memory.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {signalCards.map((card) => (
            <article key={card.label} className="panel relative overflow-hidden rounded-[4px] p-6">
              <div className="chip mb-4">{card.label}</div>
              <h3 className="mb-3 text-[17px] font-[720] leading-[1.25] text-[var(--text-strong)]">
                {card.title}
              </h3>
              <p className="text-[13.5px] leading-[1.78] text-[var(--text-body)]">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="band-cream relative overflow-hidden py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="eyebrow-plain text-[var(--accent-deep)]">How it works</div>
            <h2
              className="max-w-[14ch] font-display text-[32px] font-[640] leading-[1.06] text-[var(--text-strong)] lg:text-[44px]"
            >
              Extract backward from decisions.
            </h2>
          </div>
          <p className="max-w-[58ch] text-[14.5px] leading-[1.82] text-[var(--text-body)]">
            The workflow starts from a bounded corpus and ends in a reviewable registry. No new
            API surface, no broad system access, no claim that the machine declares final truth.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {processSteps.map((item) => (
            <article key={item.step} className="panel-strong rounded-[4px] p-6">
              <div className="mb-5 flex items-baseline gap-3">
                <span className="font-display text-[32px] font-[640] italic leading-none text-[var(--accent)]">
                  {item.step}
                </span>
                <div className="h-px flex-1 bg-[var(--line-soft)]" />
              </div>
              <h3 className="mb-3 text-[16px] font-[720] leading-[1.3] text-[var(--text-strong)]">
                {item.title}
              </h3>
              <p className="text-[13.5px] leading-[1.78] text-[var(--text-body)]">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section id="contact" className="band-ledger relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_390px] lg:items-center">
        <div>
          <div className="eyebrow-invert">Start small</div>
          <h2
            className="mb-6 max-w-[13ch] font-display text-[38px] font-[640] leading-[1.05] text-white lg:text-[56px]"
          >
            Bring one finished archive.
          </h2>
          <p className="mb-8 max-w-[55ch] text-[16px] leading-[1.82] text-[rgba(239,229,217,0.82)]">
            A Decision Audit turns a bounded slice of email or meeting notes into a draft registry:
            sourced decisions, review items, and the places where memory changed or conflicted.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={auditMailto}
              className="inline-flex items-center gap-2 rounded-[3px] border border-[rgba(255,244,232,0.16)] bg-[rgba(251,244,236,0.97)] px-7 py-3.5 text-[13.5px] font-[700] text-[var(--brand)] shadow-[0_12px_32px_rgba(28,20,14,0.24)] transition hover:-translate-y-[1px] hover:bg-white"
            >
              Request Decision Audit
              <ArrowIcon />
            </a>
            <a
              href="/enron-proof/"
              className="inline-flex items-center gap-2 rounded-[3px] border border-[rgba(255,244,232,0.16)] bg-transparent px-6 py-3.5 text-[13.5px] font-[600] text-[rgba(226,210,193,0.9)] transition hover:border-[rgba(255,244,232,0.3)] hover:text-white"
            >
              See proof first
              <ArrowIcon />
            </a>
          </div>
        </div>

        <div className="grid gap-3">
          {[
            ['Input', 'A selected project archive'],
            ['Output', 'Registry, graph, and review summary'],
            ['Boundary', 'Human review before durable memory'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[4px] border border-[rgba(255,244,232,0.1)] bg-[rgba(255,248,240,0.055)] p-5">
              <div className="mb-1.5 text-[10px] font-[800] uppercase text-[rgba(200,175,148,0.8)]">
                {label}
              </div>
              <div className="text-[14.5px] font-[680] text-white">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EnglishFooter() {
  return (
    <footer className="band-deep border-t border-[var(--line-medium)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="text-[13.5px] font-[780] text-[var(--text-strong)]">Decdock</span>
            <span className="text-[12px] text-[var(--text-faint)]">Decision registry for governed memory</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-4 text-[12px]" aria-label="Footer navigation">
            <a href="/enron-proof/" className="text-[var(--text-muted)] hover:text-[var(--text-strong)]">
              Enron proof
            </a>
            <a href="/enron-graph/" className="text-[var(--text-muted)] hover:text-[var(--text-strong)]">
              Decision graph
            </a>
            <a href="/tr/" className="text-[var(--text-muted)] hover:text-[var(--text-strong)]">
              Turkish site
            </a>
            <a href="mailto:pilot@decdock.com" className="text-[var(--text-muted)] hover:text-[var(--text-strong)]">
              pilot@decdock.com
            </a>
          </nav>
        </div>
        <p className="max-w-4xl text-[12px] leading-[1.75] text-[var(--text-faint)]">
          Decdock is not a surveillance system or a truth oracle. It produces source-linked
          candidate memory and honest review signals. The public proof path is strongest today
          for extraction, identity reconciliation, and strict supersession; broader governance
          signals remain review-first and are expanded through pilots.
        </p>
      </div>
    </footer>
  )
}

export default function EnglishLanding() {
  return (
    <div className="relative min-h-screen bg-[var(--page)] text-[var(--text-strong)]">
      <EnglishNav />
      <main>
        <HeroSection />
        <ProofSection />
        <SignalSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <EnglishFooter />
    </div>
  )
}
