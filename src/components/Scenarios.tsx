interface CapabilityCard {
  title: string
  description: string
}

const capabilities: CapabilityCard[] = [
  {
    title: 'Kararları yakalar',
    description:
      'Yazışmalarınızdan kararları çıkarır: karar metni, tarih ve kaynaktan birebir alıntı. Kimseden log tutmasını, etiketlemesini, not yazmasını istemez.',
  },
  {
    title: 'Onaylayanı gösterir',
    description:
      '"Kim söyledi" değil, "kim onayladı": her kararın yanında onaylayan kişi durur. Sahiplik ve hesap verebilirlik tahmine değil kayda dayanır.',
  },
  {
    title: '"Karar sanılanı" ayırır',
    description:
      'Asıl tehlike kaybolan karar değil, karar sanılan şeydir. Öneri, niyet ve takvim konuşması sicile girmez — kayıt dışı kalır, gerekçesi görünür olur.',
  },
  {
    title: 'Riskleri işaretler',
    description:
      'Sahibi belirsiz kalmış kararlar, birbiriyle çelişen yönler ve yeniden açılan konular kendiliğinden işaretlenir — siz sormadan.',
  },
]

export default function Scenarios() {
  return (
    <section id="what-decdock-does" className="section-band-soft py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid gap-5 lg:grid-cols-[0.95fr_0.98fr] lg:items-start">
          <div>
            <div className="eyebrow-plain">Decdock ne yapar</div>
            <h2 className="max-w-[16ch] font-display text-[38px] font-[600] leading-[1.08] text-[var(--text-strong)]">
              Özet değil; denetlenebilir karar sicili.
            </h2>
          </div>
          <div className="max-w-[52ch] space-y-3 text-[14.5px] leading-[1.75] text-[var(--text-body)] lg:pt-9">
            <p>
              Decdock, dağınık yazışmaları kaynağa bağlı karar kayıtlarına çevirir.
              Sorduğu soru "bu hafta ne konuşuldu?" değildir: <strong>ne
              kararlaştırıldı, kim onayladı, hâlâ geçerli mi?</strong>
            </p>
            <p>
              Görev yöneticisi değildir, kurumsal arama değildir, toplantı not aracı
              değildir. Tek odağı karar hafızasıdır — ve emin olmadığı hiçbir şeyi
              kesin gerçek gibi göstermez.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((card) => (
            <article key={card.title} className="page-panel-strong rounded-[26px] p-6">
              <span className="chip-soft mb-4">Yetenek</span>
              <h3 className="mb-4 text-[20px] font-semibold leading-[1.25] text-[var(--text-strong)]">
                {card.title}
              </h3>
              <p className="text-[14px] leading-[1.75] text-[var(--text-body)]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
