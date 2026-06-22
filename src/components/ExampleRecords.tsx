import { useEffect, useRef } from 'react'

interface WorkflowExample {
  label: string
  labelKind: 'approved' | 'rejected' | 'conflict'
  thread: Array<{ speaker: string; message: string }>
  extracts: string[]
  teamSees: string
}

const examples: WorkflowExample[] = [
  {
    label: 'Onaylı karar',
    labelKind: 'approved',
    thread: [
      {
        speaker: 'Selin',
        message: 'Bütçe revizyonu ekte. Görüşünüzü bekliyoruz.',
      },
      {
        speaker: 'Esra (CFO)',
        message: 'İnceledim. Onaylıyorum — 2026 pazarlama bütçesi %5 artışla kesinleşti.',
      },
    ],
    extracts: [
      'Karar: 2026 pazarlama bütçesi %5 artışla kesinleşti.',
      'Onaylayan: Esra — CFO.',
      'Alıntı: "Onaylıyorum — %5 artışla kesinleşti."',
    ],
    teamSees:
      'Sicile işlendi: karar aranabilir durumda.',
  },
  {
    label: '"Karar sanılan"',
    labelKind: 'rejected',
    thread: [
      {
        speaker: 'Selin',
        message:
          'Pazarlama kalemini %10 kısabiliriz diye düşünüyorum.',
      },
      {
        speaker: 'Murat',
        message: 'Pazartesi 14:00 uygun, toplantı ayarlandı. Orada değerlendiririz.',
      },
    ],
    extracts: [
      'Sicile YAZILMADI: öneri, onaylanmamış.',
      '"Toplantı ayarlandı" karar değil, takvim koordinasyonu.',
      'Durum: sicil dışı, gerekçesi görünür.',
    ],
    teamSees:
      'Karar ile karar sanılan ayrıldı.',
  },
  {
    label: 'Tekrar açılan konu',
    labelKind: 'conflict',
    thread: [
      {
        speaker: 'Mart kararı',
        message:
          'Manuel rapor desteği yeni sistem hazır olana kadar sürecek.',
      },
      {
        speaker: 'Nisan mesajı',
        message: 'Manuel raporları mayıstan sonra tamamen kapatalım derim.',
      },
    ],
    extracts: [
      'Uyarı: bu konu Mart\'ta karara bağlanmıştı.',
      'İlgili kayıtlar: Mart kararı + Nisan mesajı yan yana.',
      'Durum: incelenmeli.',
    ],
    teamSees:
      'Eski karar ve yeni öneri yan yana görünür.',
  },
]

const kindBadge: Record<WorkflowExample['labelKind'], string> = {
  approved: 'border-[rgba(92,117,96,0.28)] bg-[rgba(235,242,235,0.95)] text-[var(--success)]',
  rejected: 'border-[var(--line-medium)] bg-[rgba(244,238,230,0.92)] text-[var(--text-muted)]',
  conflict: 'border-[rgba(160,112,72,0.3)] bg-[rgba(247,238,227,0.95)] text-[var(--warning)]',
}

const kindAccent: Record<WorkflowExample['labelKind'], string> = {
  approved: 'border-t-[var(--success)]',
  rejected: 'border-t-[var(--line-medium)]',
  conflict: 'border-t-[var(--warning)]',
}

interface StoryPartProps {
  label: string
  children: React.ReactNode
}

function StoryPart({ label, children }: StoryPartProps) {
  return (
    <div className="border-t border-[var(--line-soft)] pt-3">
      <div className="mb-2 text-[9.5px] font-[800] uppercase tracking-[0.14em] text-[var(--text-faint)]">
        {label}
      </div>
      {children}
    </div>
  )
}

export default function ExampleRecords() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.querySelectorAll('.reveal').forEach((node, i) => {
            ;(node as HTMLElement).style.transitionDelay = `${i * 80}ms`
            node.classList.add('in-view')
          })
          obs.disconnect()
        }
      },
      { threshold: 0.06 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="band-paper relative overflow-hidden py-24 lg:py-28">
      {/* Editorial background number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-8 top-10 select-none font-display text-[140px] font-[700] leading-none text-[rgba(161,118,78,0.04)] lg:text-[200px]"
      >
        02
      </span>

      <div className="relative mx-auto max-w-6xl px-6">

        {/* Header — off-center offset */}
        <div className="mb-14 grid gap-6 lg:grid-cols-[0.85fr_1.1fr] lg:items-end">
          <div>
            <div className="reveal eyebrow-plain">Yazışmadan sicile</div>
            <h2
              className="reveal reveal-delay-1 max-w-[16ch] font-display font-[640] leading-[1.04] tracking-[-0.03em] text-[var(--text-strong)]"
              style={{ fontSize: 'clamp(30px, 3.8vw, 46px)' }}
            >
              Dağınık zincirden karar kaydına
            </h2>
          </div>
          <p className="reveal reveal-delay-2 max-w-[50ch] text-[14.5px] leading-[1.8] text-[var(--text-body)] lg:pb-1">
            Aynı yazışma içinden üç farklı sonuç: sicile giren karar, dışarıda kalan
            öneri ve yeniden açılan konu.
          </p>
        </div>

        {/* Cards — varied heights on purpose */}
        <div className="grid gap-5 lg:grid-cols-3">
          {examples.map((example, i) => (
            <article
              key={example.label}
              className={`reveal reveal-delay-${i + 1} panel relative overflow-hidden rounded-[4px] border-t-2 p-5 ${kindAccent[example.labelKind]}`}
            >
              <span
                className={`mb-4 inline-flex rounded-[3px] border px-2 py-0.5 text-[9.5px] font-[800] uppercase tracking-[0.12em] ${kindBadge[example.labelKind]}`}
              >
                {example.label}
              </span>

              <div className="space-y-3">
                <StoryPart label="Yazışma">
                  <div className="space-y-1.5">
                    {example.thread.map((line) => (
                      <div
                        key={`${line.speaker}-${line.message.slice(0, 20)}`}
                        className="rounded-[3px] border border-[var(--line-soft)] bg-[rgba(251,246,239,0.7)] px-3 py-2 text-[12px] leading-[1.55]"
                      >
                        <span className="font-[700] text-[var(--text-strong)]">{line.speaker}:</span>{' '}
                        <span className="text-[var(--text-body)]">{line.message}</span>
                      </div>
                    ))}
                  </div>
                </StoryPart>

                <StoryPart label="Decdock'un çıkardığı">
                  <ul className="space-y-1">
                    {example.extracts.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-[12px] leading-[1.55] text-[var(--text-strong)]"
                      >
                        <span className="mt-[3px] shrink-0 text-[var(--accent)]">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </StoryPart>

                <StoryPart label="Ekibin gördüğü">
                  <p className="rounded-[3px] border border-[rgba(161,118,78,0.18)] bg-[rgba(247,239,228,0.82)] px-3 py-2.5 text-[12.5px] font-[560] italic leading-[1.58] text-[var(--text-strong)]">
                    &ldquo;{example.teamSees}&rdquo;
                  </p>
                </StoryPart>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
