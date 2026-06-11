import DecisionFlow from './DecisionFlow'

interface StepCard {
  step: string
  title: string
  description: string
  tags: string[]
}

const steps: StepCard[] = [
  {
    step: '1',
    title: 'Bitmiş bir projenin yazışmalarını paylaşın',
    description:
      'Tüm şirket verisi değil: bitmiş bir projenin 20–50 e-postalık dilimi yeter. Kurulum yok, entegrasyon yok, sistem erişimi yok.',
    tags: ['Seçili dilim', 'E-posta', 'Toplantı notları'],
  },
  {
    step: '2',
    title: 'Decdock karar sinyallerini çıkarır',
    description:
      'Yazışmalardan karar, onaylayan, tarih ve bağlam sinyalleri çıkarılır — her biri kaynaktaki cümleye bağlı kalır.',
    tags: ['Karar', 'Onaylayan', 'Kaynak alıntısı'],
  },
  {
    step: '3',
    title: 'İkinci geçiş: "karar mı, karar sanılan mı?"',
    description:
      'Her aday ikinci bir doğrulamadan geçer: bu gerçekten onaylanmış bir karar mı? Emin olunmayan sicile yazılmaz, inceleme listesinde şeffafça durur.',
    tags: ['Doğrulama', 'İnceleme listesi'],
  },
  {
    step: '4',
    title: 'Karar sicili elinizde',
    description:
      'İlk teslimat rapor olarak gelir. Sürekli versiyonda sicil aranabilir kalır, yeni kararlar kendiliğinden işlenir ve haftalık özet gelir.',
    tags: ['Rapor', 'Aranabilir', 'Haftalık özet'],
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-band-muted py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid gap-5 lg:grid-cols-[0.9fr_0.98fr] lg:items-start">
          <div>
            <div className="eyebrow-plain">Nasıl çalışır</div>
            <h2 className="max-w-[16ch] font-display text-[38px] font-[600] leading-[1.08] text-[var(--text-strong)]">
              Kurulum istemeyen basit bir akış.
            </h2>
          </div>
          <p className="max-w-[52ch] text-[14.5px] leading-[1.75] text-[var(--text-body)] lg:pt-9">
            Decdock geniş bir kurumsal kurulumla değil, odaklı bir dilimle başlar:
            seçtiğiniz kaynaklar, incelenebilir sinyaller ve kaynağa bağlı kayıtlar.
            İlk değer 3 iş gününde elinizde olur.
          </p>
        </div>

        <DecisionFlow />

        <div className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-4 md:items-stretch">
          {steps.map((item, index) => {
            const flowClass =
              index === 0
                ? 'flow-step-one'
                : index === 1
                  ? 'flow-step-two'
                  : index === 2
                    ? 'flow-step-three'
                    : ''

            return (
              <article
                key={item.step}
                className={`flow-card ${index === 1 ? 'flow-card-center' : ''} ${flowClass}`.trim()}
              >
                <div className="mb-4 text-[12px] font-semibold text-[var(--accent)]">
                  {item.step}. {item.title}
                </div>
                <p className="mb-5 text-[14px] leading-[1.72] text-[var(--text-body)]">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="surface-tag px-3 py-1.5 text-[12px] font-medium text-[var(--text-body)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
