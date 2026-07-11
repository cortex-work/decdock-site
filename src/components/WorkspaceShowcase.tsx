import { useEffect, useRef, useState } from 'react'

/**
 * WorkspaceShowcase — the large, interactive product scene for the hero.
 * A Teams/Slack-style workspace: department channels on the left; for each, a real
 * decision moment and Decdock reacting inline with a source-linked review candidate.
 * Precision-first: on ordinary chatter Decdock stays silent (see the #general channel).
 * Illustrative concept — Decdock proposes, a human decides.
 */

interface Msg {
  initials: string
  name: string
  role: string
  time: string
  text: string
  tone: 'a' | 'b'
}

interface Row {
  label: string
  value: string
  strong?: boolean
}

interface Reaction {
  signal: string
  headline: string
  rows: Row[]
  chip: string
}

interface Channel {
  id: string
  dept: string
  messages: Msg[]
  reaction?: Reaction
}

const channels: Channel[] = [
  {
    id: 'general',
    dept: 'Everyday chatter',
    messages: [
      {
        initials: 'DK',
        name: 'Dan Kelly',
        role: 'Ops',
        time: '09:12',
        text: 'Coffee machine on the 3rd floor is fixed 🎉',
        tone: 'a',
      },
      {
        initials: 'MT',
        name: 'Mark Torres',
        role: 'FP&A',
        time: '09:14',
        text: 'Nice. Standup moved to 10:30 today.',
        tone: 'b',
      },
    ],
  },
  {
    id: 'pricing',
    dept: 'Sales & RevOps',
    messages: [
      {
        initials: 'BA',
        name: 'Ben Archer',
        role: 'RevOps',
        time: '14:22',
        text: 'Closing Apollo today — I’m offering a 25% enterprise discount to land it this quarter.',
        tone: 'a',
      },
    ],
    reaction: {
      signal: 'Supersession',
      headline: 'This may override a decision that is still in force.',
      rows: [
        { label: 'In force', value: 'Mar 4 — Emma Cole (CFO) capped enterprise discounts at 20%.' },
        { label: 'Now', value: '25% would supersede the 20% cap.', strong: true },
        { label: 'Source', value: '#finance · Mar 4 thread' },
      ],
      chip: 'Review candidate — not a verdict',
    },
  },
  {
    id: 'finance',
    dept: 'Finance',
    messages: [
      {
        initials: 'MT',
        name: 'Mark Torres',
        role: 'FP&A',
        time: '11:05',
        text: 'The 2026 marketing budget is +5% vs last year, per the March sign-off.',
        tone: 'a',
      },
      {
        initials: 'DR',
        name: 'Dana Reed',
        role: 'Finance Lead',
        time: '11:07',
        text: 'We froze the 2026 marketing budget in April. No increase.',
        tone: 'b',
      },
    ],
    reaction: {
      signal: 'Conflict',
      headline: 'Two live decisions disagree. Both kept, flagged.',
      rows: [
        { label: 'Claim A', value: 'Mar — marketing budget +5%.' },
        { label: 'Claim B', value: 'Apr — marketing budget frozen.', strong: true },
        { label: 'Status', value: 'Not auto-resolved. Human review required.' },
      ],
      chip: 'Conflict surfaced — nothing overwritten',
    },
  },
  {
    id: 'legal',
    dept: 'Legal & Compliance',
    messages: [
      {
        initials: 'AY',
        name: 'Alice Young',
        role: 'Legal',
        time: '09:48',
        text: 'Applying the vendor NDA carve-out again for the new contract.',
        tone: 'a',
      },
    ],
    reaction: {
      signal: 'Exception drift',
      headline: 'A time-bounded exception is behaving like policy.',
      rows: [
        { label: 'Exception', value: 'NDA carve-out — approved by GC for the Q3 pilot only.' },
        { label: 'Drift', value: 'Still applied two quarters past its bound. Never revoked.', strong: true },
        { label: 'Source', value: '#legal · Q3 approval thread' },
      ],
      chip: 'Review — has this quietly become policy?',
    },
  },
  {
    id: 'product',
    dept: 'Product & Eng',
    messages: [
      {
        initials: 'KA',
        name: 'Kyle Adams',
        role: 'Product',
        time: '16:10',
        text: 'Shipping the new onboarding as the default for everyone.',
        tone: 'a',
      },
    ],
    reaction: {
      signal: 'Supersession',
      headline: 'This may override an earlier decision.',
      rows: [
        { label: 'In force', value: 'Jan — keep the legacy flow default until migration completes.' },
        { label: 'Now', value: 'New onboarding as default supersedes the Jan call.', strong: true },
        { label: 'Status', value: 'Keep both until reviewed.' },
      ],
      chip: 'Review candidate — not a verdict',
    },
  },
  {
    id: 'exec',
    dept: 'CEO Office',
    messages: [
      {
        initials: 'SE',
        name: 'Sara Evans',
        role: 'Chief of Staff',
        time: '13:31',
        text: 'Who approved the vendor switch — and did they have the authority at the time?',
        tone: 'a',
      },
    ],
    reaction: {
      signal: 'Authority at time',
      headline: 'The approver’s authority window does not cover the date.',
      rows: [
        { label: 'Decision', value: 'Vendor switch approved Feb 3.' },
        { label: 'Authority', value: 'Signed by A. Miller — held VP Ops through Jan 31 only.', strong: true },
        { label: 'Check', value: 'Signed outside their role window.' },
      ],
      chip: 'Review authority — evaluated at decision time',
    },
  },
  {
    id: 'people',
    dept: 'HR & Ops',
    messages: [
      {
        initials: 'IP',
        name: 'Ian Price',
        role: 'People Ops',
        time: '10:20',
        text: 'Remote policy is 2 days in-office, per our handbook.',
        tone: 'a',
      },
    ],
    reaction: {
      signal: 'Stale candidate',
      headline: 'A newer memo may have replaced this.',
      rows: [
        { label: 'Recorded', value: 'Remote policy — 2 days in-office.' },
        { label: 'Risk', value: 'A May memo may supersede it. No confirmed replacement logged.', strong: true },
        { label: 'Status', value: 'Flagged stale — verify before trusting.' },
      ],
      chip: 'Stale candidate — review before memory write',
    },
  },
]

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(mq.matches)
    const on = () => setReduce(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduce
}

function Avatar({ initials, tone }: { initials: string; tone: 'a' | 'b' }) {
  const cls =
    tone === 'a'
      ? 'bg-[rgba(161,118,78,0.16)] text-[var(--accent-deep)]'
      : 'bg-[rgba(92,117,96,0.16)] text-[var(--success)]'
  return (
    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10.5px] font-[800] ${cls}`}>
      {initials}
    </span>
  )
}

export default function WorkspaceShowcase() {
  const reduce = usePrefersReducedMotion()
  // Open on a firing channel (index 1 = #pricing) so the first frame lands a real catch.
  const [active, setActive] = useState(1)
  const [platform, setPlatform] = useState<'Microsoft Teams' | 'Slack'>('Microsoft Teams')
  const paused = useRef(false)

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % channels.length)
    }, 5000)
    return () => clearInterval(t)
  }, [reduce])

  const ch = channels[active] as Channel

  return (
    <div
      className="relative mx-auto w-full max-w-5xl"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {/* Halo */}
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] bg-[radial-gradient(ellipse_at_center,rgba(210,196,180,0.4),rgba(180,160,138,0.12),transparent_72%)] blur-3xl" />

      <div className="overflow-hidden rounded-[12px] border border-[var(--line-soft)] bg-[linear-gradient(180deg,rgba(253,248,241,0.99),rgba(242,234,222,0.98))] shadow-[var(--shadow-card-lg)]">
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-[var(--line-soft)] bg-[rgba(247,241,233,0.72)] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[rgba(0,0,0,0.14)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[rgba(0,0,0,0.09)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[rgba(0,0,0,0.09)]" />
          </div>
          <span className="ml-1 text-[12px] font-[750] text-[var(--text-strong)]">Acme Inc · Decdock</span>
          <div className="ml-auto flex items-center gap-1 rounded-[999px] border border-[var(--line-soft)] bg-[rgba(253,248,241,0.8)] p-0.5">
            {(['Microsoft Teams', 'Slack'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPlatform(p)}
                className={`rounded-[999px] px-2.5 py-1 text-[10.5px] font-[750] transition-colors ${
                  platform === p
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-[var(--text-faint)] hover:text-[var(--text-body)]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar / channel rail */}
          <div className="shrink-0 border-b border-[var(--line-soft)] bg-[rgba(244,238,230,0.5)] md:w-[212px] md:border-b-0 md:border-r">
            <div className="hidden px-4 pt-4 text-[10px] font-[800] uppercase tracking-[0.12em] text-[var(--text-faint)] md:block">
              Channels
            </div>
            <div className="flex gap-1 overflow-x-auto px-2 py-2 md:flex-col md:px-2 md:py-2">
              {channels.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`group flex shrink-0 items-center gap-2 rounded-[6px] px-3 py-2 text-left transition-colors md:w-full ${
                    i === active ? 'bg-[rgba(161,118,78,0.13)]' : 'hover:bg-[rgba(161,118,78,0.06)]'
                  }`}
                >
                  <span
                    className={`text-[13px] font-[750] ${
                      i === active ? 'text-[var(--accent-deep)]' : 'text-[var(--text-faint)]'
                    }`}
                  >
                    #
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block whitespace-nowrap text-[12.5px] font-[680] ${
                        i === active ? 'text-[var(--text-strong)]' : 'text-[var(--text-body)]'
                      }`}
                    >
                      {c.id}
                    </span>
                    <span className="hidden whitespace-nowrap text-[10px] text-[var(--text-faint)] md:block">
                      {c.dept}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Main pane */}
          <div className="min-w-0 flex-1">
            {/* Channel header */}
            <div className="flex items-center gap-2 border-b border-[var(--line-soft)] px-5 py-3">
              <span className="text-[14px] font-[800] text-[var(--text-faint)]">#</span>
              <span className="text-[13.5px] font-[750] text-[var(--text-strong)]">{ch.id}</span>
              <span className="text-[11.5px] text-[var(--text-faint)]">· {ch.dept}</span>
              <span className="ml-auto flex items-center gap-1.5 text-[10px] font-[700] uppercase tracking-[0.1em] text-[var(--text-faint)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                live
              </span>
            </div>

            {/* Conversation + reaction (re-mounts on channel change to animate) */}
            <div key={ch.id} className="showcase-in space-y-3.5 px-5 py-5" style={{ minHeight: 300 }}>
              {ch.messages.map((m) => (
                <div key={m.name} className="flex items-start gap-2.5">
                  <Avatar initials={m.initials} tone={m.tone} />
                  <div className="min-w-0">
                    <div className="mb-0.5 flex items-baseline gap-2">
                      <span className="text-[12.5px] font-[750] text-[var(--text-strong)]">{m.name}</span>
                      <span className="text-[10.5px] text-[var(--text-faint)]">{m.role} · {m.time}</span>
                    </div>
                    <div
                      className={`rounded-[8px] px-3 py-2 text-[13px] leading-[1.55] ${
                        m.tone === 'b'
                          ? 'bg-[rgba(244,238,230,0.9)] text-[var(--text-strong)]'
                          : 'bg-[rgba(244,238,230,0.62)] text-[var(--text-body)]'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}

              {ch.reaction ? (
                /* Decdock reaction */
                <div className="flex items-start gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[var(--accent)] text-[11px] font-[800] text-white">
                    D
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="text-[12.5px] font-[750] text-[var(--text-strong)]">Decdock</span>
                      <span className="rounded-[3px] bg-[rgba(161,118,78,0.14)] px-1.5 py-[1px] text-[9px] font-[800] uppercase tracking-[0.08em] text-[var(--accent-deep)]">
                        bot
                      </span>
                      <span className="rounded-[3px] border border-[var(--accent-soft)] bg-[rgba(247,238,227,0.8)] px-1.5 py-[1px] text-[9px] font-[800] uppercase tracking-[0.08em] text-[var(--accent-deep)]">
                        {ch.reaction.signal}
                      </span>
                    </div>
                    <div className="rounded-[8px] border border-[var(--accent-soft)] border-l-[3px] border-l-[var(--accent)] bg-[rgba(251,246,239,0.96)] px-4 py-3">
                      <p className="text-[13px] font-[680] leading-[1.5] text-[var(--text-strong)]">{ch.reaction.headline}</p>
                      <div className="mt-2.5 grid gap-1.5 border-t border-[var(--line-soft)] pt-2.5 text-[11.5px]">
                        {ch.reaction.rows.map((r) => (
                          <div key={r.label} className="flex items-start gap-3">
                            <span className="w-[62px] shrink-0 font-[800] uppercase tracking-[0.04em] text-[var(--text-faint)]">
                              {r.label}
                            </span>
                            <span className={r.strong ? 'font-[640] text-[var(--text-strong)]' : 'text-[var(--text-body)]'}>
                              {r.value}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-[3px] border border-[rgba(92,117,96,0.24)] bg-[rgba(236,241,236,0.95)] px-2 py-0.5 text-[9.5px] font-[800] uppercase tracking-[0.05em] text-[var(--success)]">
                          {ch.reaction.chip}
                        </span>
                        <button
                          type="button"
                          className="rounded-[4px] border border-[var(--line-medium)] bg-[rgba(253,248,241,0.9)] px-2.5 py-1 text-[10.5px] font-[700] text-[var(--text-body)] transition-colors hover:border-[var(--accent-soft)] hover:text-[var(--text-strong)]"
                        >
                          Open in registry
                        </button>
                        <span className="text-[10.5px] font-[700] text-[var(--accent-deep)]">View source →</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Quiet state — precision-first: nothing to resolve */
                <div className="flex items-center gap-2.5 rounded-[8px] border border-dashed border-[var(--line-medium)] bg-[rgba(244,238,230,0.35)] px-4 py-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-faint)]" />
                  <span className="text-[11.5px] leading-[1.5] text-[var(--text-faint)]">
                    Nothing to resolve here — Decdock stays silent unless a decision conflicts, supersedes, or drifts.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] leading-[1.6] text-[var(--text-faint)]">
        Illustration of point-of-decision surfacing. Decdock stays quiet on everyday chatter and speaks up only
        when a decision needs resolving — it proposes, a human decides.
      </p>
    </div>
  )
}
