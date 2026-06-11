interface AudienceCard {
  title: string
  description: string
  emphasized?: boolean
}

const audiences: AudienceCard[] = [
  {
    title: 'Genel Müdür / CEO',
    description:
      '"Bu kararı kim almıştı, neye dayanarak?" sorusuna e-posta arşivi kazmadan, saniyeler içinde kaynaklı cevap.',
  },
  {
    title: 'COO / Operasyon',
    description:
      '"Karar alındı ama top kimde?" boşluğu kapanır: sahipsiz kararlar ve düşen toplar kendiliğinden görünür olur.',
  },
  {
    title: 'Holding iştirakleri',
    description:
      'Denetim, raporlama ve kurumsal yönetim için kaynağa bağlı karar izi — kim onayladı, ne zaman, hangi gerekçeyle.',
  },
  {
    title: 'Proje-yoğun ekipler',
    description:
      'Aynı konunun ikinci kez toplantıya gelmesi azalır: eski karar, vereni ve gerekçesiyle bir arama uzağınızda.',
  },
  {
    title: 'Kararları e-postada alınan her şirket',
    description:
      'Karar iziniz yazışmalarda yaşıyorsa Decdock onu sicile çevirir — kimseye yeni bir araç öğretmeden.',
    emphasized: true,
  },
]

export default function Differentiation() {
  return (
    <section id="who-it-is-for" className="section-band py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid gap-5 lg:grid-cols-[0.95fr_0.98fr] lg:items-start">
          <div>
            <div className="eyebrow-plain">Kimin için</div>
            <h2 className="max-w-[14ch] font-display text-[38px] font-[600] leading-[1.08] text-[var(--text-strong)]">
              Kararları araçlara dağılan şirketler için.
            </h2>
          </div>
          <p className="max-w-[52ch] text-[14.5px] leading-[1.75] text-[var(--text-body)] lg:pt-9">
            Decdock; 30–300 çalışanlı, karar yoğun ve formal yazışma kültürü olan
            şirketler için tasarlandı: üretim, lojistik, finans hizmetleri, mühendislik,
            danışmanlık ve holding iştirakleri.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className={
                audience.emphasized
                  ? 'page-panel-dark relative overflow-hidden rounded-[24px] p-6'
                  : 'page-panel rounded-[24px] p-6'
              }
            >
              {audience.emphasized && (
                <div className="pointer-events-none absolute inset-x-8 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(255,248,239,0.12),transparent_70%)]" />
              )}
              <h3
                className={
                  audience.emphasized
                    ? 'mb-3 text-[18px] font-semibold text-white'
                    : 'mb-3 text-[18px] font-semibold text-[var(--text-strong)]'
                }
              >
                {audience.title}
              </h3>
              <p
                className={
                  audience.emphasized
                    ? 'text-[14px] leading-[1.7] text-[rgba(239,230,220,0.84)]'
                    : 'text-[14px] leading-[1.7] text-[var(--text-body)]'
                }
              >
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
