import { useEffect, useRef } from 'react'

const roiSignals = [
  'Aynı kararın tekrar tartışıldığı yerler',
  'Sahibi belirsiz kalan kararlar',
  'Geçerliliği değişmiş ama kaydı güncellenmemiş kararlar',
  'Denetimde veya devir teslimde kanıtı aranan kararlar',
]

const deploymentModels = [
  {
    title: 'Pilot rapor modu',
    description:
      'Seçili ve sınırlı veri işlenir. Ham veri yalnız Karar Denetimi raporu için kullanılır; teslim sonrası silme ve yazılı teyit süreci baştan tanımlanır.',
  },
  {
    title: 'Yönetilen bulut',
    description:
      'Decdock izole müşteri alanında çalışır. Bölge, saklama süresi, şifreleme, erişim kayıtları ve veri silme politikası sözleşmede netleşir.',
  },
  {
    title: 'Müşteri ortamı',
    description:
      'Daha hassas yapılarda Decdock müşterinin kendi bulut hesabında veya kendi sunucularında konumlanabilir. Veri, kurumun belirlediği sınırlar içinde kalır.',
  },
]

const accessRoles = [
  {
    title: 'Yöneticiler',
    description:
      'Kendi sorumluluk alanları için karar özeti, açık riskler, sahipsiz kayıtlar ve haftalık/aylık digest görür.',
  },
  {
    title: 'Ekipler',
    description:
      'Kendi yetkileri dahilindeki karar geçmişini arar; kaynağı, tarihi, onaylayanı ve güncel durumu görür.',
  },
  {
    title: 'Admin',
    description:
      'Kaynak kapsamını, kullanıcı yetkilerini, saklama süresini ve hangi ekiplerin hangi karar alanlarını göreceğini yönetir.',
  },
]

export default function BuyerQuestions() {
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
    <section id="buyer-questions" ref={ref} className="band-cream relative overflow-hidden py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-60"
        style={{
          backgroundImage:
            'repeating-linear-gradient(180deg, transparent 0px, transparent 47px, rgba(94,86,80,0.045) 47px, rgba(94,86,80,0.045) 48px)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="reveal eyebrow-plain">Satın alma soruları</div>
            <h2
              className="reveal reveal-delay-1 max-w-[17ch] font-display font-[640] leading-[1.04] text-[var(--text-strong)]"
              style={{ fontSize: 'clamp(30px, 3.8vw, 46px)' }}
            >
              İlk görüşmede üç şeyi netleştiririz.
            </h2>
          </div>
          <p className="reveal reveal-delay-2 max-w-[56ch] text-[14.5px] leading-[1.8] text-[var(--text-body)] lg:pb-1">
            Decdock bir “AI özeti” vaadiyle başlamaz. Önce karar kaybının nerede
            yaşandığını, verinin nerede duracağını ve kimin neyi göreceğini açıkça
            tanımlar.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="reveal panel-strong rounded-[4px] p-7 lg:p-8">
            <div className="mb-3 text-[11px] font-[800] uppercase tracking-[0.16em] text-[var(--accent)]">
              01 · ROI
            </div>
            <h3 className="mb-4 font-display text-[25px] font-[640] leading-[1.14] text-[var(--text-strong)]">
              Evrensel kazanç rakamı uydurmayız.
            </h3>
            <p className="mb-6 text-[14px] leading-[1.8] text-[var(--text-body)]">
              Her şirketin karar hacmi, ekip yapısı ve hata maliyeti farklıdır. Decdock
              bunun yerine karar kaybının nerede maliyete döndüğünü görünür kılar; para
              karşılığını müşteri kendi gerçek örnekleriyle hesaplar.
            </p>
            <div className="grid gap-2">
              {roiSignals.map((signal) => (
                <div
                  key={signal}
                  className="flex items-start gap-3 border-t border-[var(--line-soft)] pt-3 text-[13px] leading-[1.65] text-[var(--text-body)]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="reveal reveal-delay-1 panel rounded-[4px] p-7 lg:p-8">
            <div className="mb-3 text-[11px] font-[800] uppercase tracking-[0.16em] text-[var(--accent)]">
              02 · Veri güvenliği
            </div>
            <h3 className="mb-4 font-display text-[25px] font-[640] leading-[1.14] text-[var(--text-strong)]">
              Veri modeli şirketin hassasiyetine göre seçilir.
            </h3>
            <p className="mb-6 text-[14px] leading-[1.8] text-[var(--text-body)]">
              Başlangıçta en düşük riskli yol sınırlı veriyle rapor modudur. Daha sonra
              yönetilen bulut veya müşteri ortamında kurulum seçenekleri birlikte
              değerlendirilir.
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              {deploymentModels.map((model) => (
                <div
                  key={model.title}
                  className="rounded-[4px] border border-[var(--line-soft)] bg-[rgba(251,246,239,0.58)] p-4"
                >
                  <h4 className="mb-2 text-[13px] font-[760] text-[var(--text-strong)]">
                    {model.title}
                  </h4>
                  <p className="text-[12.5px] leading-[1.68] text-[var(--text-body)]">
                    {model.description}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <article className="reveal reveal-delay-2 panel-dark mt-4 rounded-[4px] p-7 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <div className="eyebrow-invert mb-4">03 · Yetki ve kullanım</div>
              <h3 className="mb-4 font-display text-[27px] font-[640] leading-[1.12] text-white">
                Herkes kullanır; herkes aynı şeyi görmez.
              </h3>
              <p className="text-[14px] leading-[1.8] text-[rgba(239,229,217,0.8)]">
                Decdock şirketin karar hafızasıdır; erişim ise organizasyon şeması,
                rol ve kaynak kapsamına göre sınırlandırılır. Amaç daha çok veri açmak
                değil, doğru kişiye doğru karar bağlamını göstermektir.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {accessRoles.map((role) => (
                <div
                  key={role.title}
                  className="rounded-[4px] border border-[rgba(255,244,232,0.11)] bg-[rgba(255,248,240,0.055)] p-4"
                >
                  <h4 className="mb-2 text-[13px] font-[760] text-white">{role.title}</h4>
                  <p className="text-[12.5px] leading-[1.68] text-[rgba(239,229,217,0.72)]">
                    {role.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
