interface FAQItem {
  question: string
  answer: string
}

const items: FAQItem[] = [
  {
    question: 'Verimiz güvende mi? KVKK tarafı nasıl işliyor?',
    answer:
      'Decdock izleme sistemi değildir; yalnız sizin seçtiğiniz, bitmiş bir dilimi işler. Veri tek amaçla kullanılır (rapor üretimi), teslim sonrası ham veri imha edilir ve bu yazılı olarak teyit edilir. İK, disiplin ve hukuki ihtilaf içerikleri ilk dilimde zaten kabul edilmez.',
  },
  {
    question: 'Çalışanlar bunu gözetim olarak algılamaz mı?',
    answer:
      'Sicil "kim ne yaptı"yı değil, "ne kararlaştırıldı"yı gösterir. Sahipsiz karar bulgusu bile kişiye değil sürece işaret eder. Decdock bir suçlama aracı değil, bağlam aracıdır — amaç geçmişi sorgulamak değil, kurumsal hafızayı korumaktır.',
  },
  {
    question: 'Copilot veya benzeri araçlar bunu zaten yapmıyor mu?',
    answer:
      'Onlar "bu hafta ne konuşuldu?" sorusunu özetler; özet o anda tüketilir ve kaybolur. Decdock "ne kararlaştırıldı, kim onayladı, hâlâ geçerli mi?" sorusunun kalıcı ve denetlenebilir kaydını tutar — her kayıt kaynağındaki cümleye bağlıdır. Ayrıca öneriyi karardan ayırır; özet araçları bu ayrımı yapmaz.',
  },
  {
    question: 'Ya yanlış bir şeyi karar diye yazarsa?',
    answer:
      'Emin olmadığını sicile yazmaz: her aday ikinci bir doğrulamadan geçer, onaylanmamış ifadeler ayrı bir inceleme listesinde şeffafça durur. Rapor tesliminden önce de her satır insan kontrolünden geçer. İlke basit: ya güvenilir biçimde vardır, ya gösterilmez.',
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="section-band-soft py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid gap-5 lg:grid-cols-[0.95fr_0.98fr] lg:items-start">
          <div>
            <div className="eyebrow-plain">Sık sorulanlar</div>
            <h2 className="max-w-[16ch] font-display text-[38px] font-[600] leading-[1.08] text-[var(--text-strong)]">
              Sormadan cevaplayalım.
            </h2>
          </div>
          <p className="max-w-[52ch] text-[14.5px] leading-[1.75] text-[var(--text-body)] lg:pt-9">
            Bu dört soru her görüşmede geliyor — gelmesi de doğru. Kısa cevapları
            burada, uzun cevapları görüşmede.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.question} className="page-panel rounded-[24px] p-6">
              <h3 className="mb-3 text-[17px] font-semibold leading-[1.35] text-[var(--text-strong)]">
                {item.question}
              </h3>
              <p className="text-[14px] leading-[1.75] text-[var(--text-body)]">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
