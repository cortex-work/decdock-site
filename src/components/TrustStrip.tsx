interface TrustItem {
  title: string
  description: string
}

const items: TrustItem[] = [
  {
    title: 'İzleme yok',
    description:
      'Decdock tüm iletişimi okumaz. Yalnız sizin seçtiğiniz kaynaklar işlenir — bugün rapor dilimi, yarın bağladığınız kanallar. Kapsamı her zaman siz belirlersiniz.',
  },
  {
    title: 'Veri tek amaç için',
    description:
      'İçeriğiniz yalnız karar sicili üretiminde kullanılır; model eğitiminde kullanılmaz, üçüncü taraflarla paylaşılmaz.',
  },
  {
    title: 'İmha ve yazılı teyit',
    description:
      'Rapor tesliminde ham veri tüm kopyalarıyla silinir ve yazılı olarak teyit edilir. Sürekli üründe saklama süresini sizin politikanız belirler.',
  },
  {
    title: 'Kapsam dışı içerik',
    description:
      'İK disiplin süreçleri, hukuki ihtilaf ve sağlık verisi işlenmez — ilk dilimde reddedilir. Sicil suçlama aracı değil, bağlam aracıdır.',
  },
]

export default function TrustStrip() {
  return (
    <section id="trust" className="section-band-muted py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.95fr_0.98fr] lg:items-start">
          <div>
            <div className="eyebrow-plain">Güvenlik ve gizlilik</div>
            <h2 className="max-w-[18ch] font-display text-[34px] font-[600] leading-[1.1] text-[var(--text-strong)] sm:text-[38px]">
              İlk rapordan sürekli sicile: aynı ilkeler.
            </h2>
          </div>
          <p className="max-w-[52ch] text-[14.5px] leading-[1.75] text-[var(--text-body)] lg:pt-9">
            Güven, sonradan eklenen bir özellik değil; ürünün kuruluş ilkesi. Bu dört
            kural tek seferlik raporda da, sürekli çalışan sicilde de aynen geçerlidir.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.title}
              className="page-panel relative overflow-hidden rounded-[24px] border-t-2 border-t-[var(--accent-soft)] p-6"
            >
              <span
                className="mb-4 block h-2.5 w-2.5 rotate-45 bg-[var(--accent)]"
                aria-hidden="true"
              />
              <h3 className="mb-3 text-[17px] font-semibold text-[var(--text-strong)]">
                {item.title}
              </h3>
              <p className="text-[13.5px] leading-[1.7] text-[var(--text-body)]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
