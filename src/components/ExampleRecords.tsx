interface WorkflowExample {
  label: string
  thread: Array<{
    speaker: string
    message: string
  }>
  extracts: string[]
  teamSees: string
}

const examples: WorkflowExample[] = [
  {
    label: 'Onaylı karar',
    thread: [
      {
        speaker: 'Selin',
        message:
          'Bütçe revizyonu için iki senaryo hazırladık, ekte. Görüşünüzü bekliyoruz.',
      },
      {
        speaker: 'Esra (CFO)',
        message:
          'İnceledim. Onaylıyorum — 2026 pazarlama bütçesi %5 artışla kesinleşti.',
      },
    ],
    extracts: [
      'Karar: 2026 pazarlama bütçesi %5 artışla kesinleşti.',
      'Onaylayan: Esra — CFO.',
      'Kaynak: Bütçe revizyonu e-posta zinciri.',
      'Alıntı: "Onaylıyorum — %5 artışla kesinleşti."',
    ],
    teamSees:
      'Sicile işlendi: karar, onaylayan ve kaynak alıntısıyla birlikte aranabilir durumda.',
  },
  {
    label: '"Karar sanılan"',
    thread: [
      {
        speaker: 'Selin',
        message:
          'Pazarlama kalemini %10 kısabiliriz diye düşünüyorum, ama tabii karar sizin.',
      },
      {
        speaker: 'Murat',
        message: 'Pazartesi 14:00 uygun, toplantı ayarlandı. Orada değerlendiririz.',
      },
    ],
    extracts: [
      'Sicile YAZILMADI: öneri, onaylanmamış.',
      'Gerekçe: kişisel görüş olarak ifade edilmiş, onay yok.',
      '"Toplantı ayarlandı" karar değil, takvim koordinasyonu.',
      'Durum: sicil dışı, gerekçesi görünür.',
    ],
    teamSees:
      'Ekibin yarısı bunu "karar" diye hatırlayacaktı. Decdock karar ile karar sanılanı ayırır.',
  },
  {
    label: 'Tekrar açılan konu',
    thread: [
      {
        speaker: 'Mart kararı',
        message:
          'Kurumsal müşteriler için manuel rapor desteği yeni sistem hazır olana kadar sürecek.',
      },
      {
        speaker: 'Nisan mesajı',
        message: 'Manuel raporları mayıstan sonra tamamen kapatalım derim.',
      },
    ],
    extracts: [
      'Uyarı: bu konu Mart’ta karara bağlanmıştı.',
      'Olası çelişki: müşteri taahhüdü ile yeni öneri.',
      'İlgili kayıtlar: Mart kararı + Nisan mesajı yan yana.',
      'Durum: incelenmeli.',
    ],
    teamSees:
      'O toplantı ya hiç yapılmaz ya beş dakika sürer: eski karar, vereni ve gerekçesiyle önünüzde.',
  },
]

function StoryPart({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="border-t border-[var(--line-soft)] pt-2.5">
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--text-faint)]">
        {label}
      </div>
      {children}
    </div>
  )
}

export default function ExampleRecords() {
  return (
    <section className="section-band py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-9 grid gap-5 lg:grid-cols-[0.92fr_0.96fr] lg:items-start">
          <div>
            <div className="eyebrow-plain">Yazışmadan sicile</div>
            <h2 className="max-w-[16ch] font-display text-[34px] font-[600] leading-[1.08] text-[var(--text-strong)] sm:text-[38px]">
              Dağınık zincirden karar kaydına
            </h2>
          </div>
          <p className="max-w-[52ch] text-[14.5px] leading-[1.75] text-[var(--text-body)] lg:pt-9">
            Decdock seçtiğiniz kaynaklara bakar, karar ve sahiplik sinyallerini çıkarır
            ve bunları ekibinizin güvenebileceği, kaynağa bağlı kayıtlara çevirir.
            Üç gerçekçi örnek:
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {examples.map((example) => (
            <article key={example.label} className="page-panel rounded-[24px] p-5">
              <span className="chip-soft mb-4">{example.label}</span>

              <div className="space-y-2.5">
                <StoryPart label="Yazışma">
                  <div className="space-y-1.5">
                    {example.thread.map((line) => (
                      <div
                        key={`${line.speaker}-${line.message}`}
                        className="rounded-[12px] border border-[var(--line-soft)] bg-[rgba(250,245,239,0.66)] px-3 py-1.5 text-[12.5px] leading-[1.5]"
                      >
                        <span className="font-semibold text-[var(--text-strong)]">
                          {line.speaker}:
                        </span>{' '}
                        <span className="text-[var(--text-body)]">{line.message}</span>
                      </div>
                    ))}
                  </div>
                </StoryPart>

                <StoryPart label="Decdock'un çıkardığı">
                  <ul className="space-y-1.5">
                    {example.extracts.map((item) => (
                      <li key={item} className="text-[12.5px] leading-[1.5] text-[var(--text-strong)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </StoryPart>

                <StoryPart label="Ekibin gördüğü">
                  <p className="rounded-[12px] border border-[rgba(161,118,78,0.2)] bg-[rgba(247,239,228,0.8)] px-3 py-2 text-[13px] font-medium leading-[1.5] text-[var(--text-strong)]">
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
