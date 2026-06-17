import * as Accordion from '@radix-ui/react-accordion'
import { useEffect, useRef } from 'react'

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
    question: 'Özet veya toplantı asistanları bunu zaten yapmıyor mu?',
    answer:
      'Onlar "bu hafta ne konuşuldu?" sorusunu özetler; özet o anda tüketilir ve kaybolur. Decdock "ne kararlaştırıldı, kim onayladı, hâlâ geçerli mi?" sorusunun kalıcı ve denetlenebilir kaydını tutar — her kayıt kaynağındaki cümleye bağlıdır. Ayrıca öneriyi karardan ayırır; özet araçları bu ayrımı yapmaz.',
  },
  {
    question: 'Ya yanlış bir şeyi karar diye yazarsa?',
    answer:
      'Emin olmadığını sicile yazmaz: her aday ikinci bir doğrulamadan geçer, onaylanmamış ifadeler sicil dışı kalır ve gerekçesi görünür olur. İlke basit: ya güvenilir biçimde vardır, ya gösterilmez.',
  },
]

export default function FAQ() {
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
      { threshold: 0.08 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="faq" ref={ref} className="band-cream relative overflow-hidden py-24 lg:py-28">
      {/* Editorial section number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-10 select-none font-display text-[130px] font-[700] leading-none text-[rgba(161,118,78,0.04)] lg:text-[180px]"
      >
        06
      </span>

      <div className="relative mx-auto max-w-6xl px-6">

        {/* Asymmetric header */}
        <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_1.6fr] lg:items-end">
          <div>
            <div className="reveal eyebrow-plain">Sık sorulanlar</div>
            <h2
              className="reveal reveal-delay-1 max-w-[14ch] font-display font-[640] leading-[1.04] tracking-[-0.03em] text-[var(--text-strong)]"
              style={{ fontSize: 'clamp(28px, 3.6vw, 44px)' }}
            >
              Sormadan cevaplayalım.
            </h2>
          </div>
          <p className="reveal reveal-delay-2 max-w-[50ch] text-[14.5px] leading-[1.8] text-[var(--text-body)] lg:pb-1">
            Bu dört soru her görüşmede geliyor — gelmesi de doğru. Kısa cevapları
            burada, uzun cevapları görüşmede.
          </p>
        </div>

        {/*
          Radix Accordion — all answer text stays in the DOM for SEO.
          Radix renders content with data-state="closed" but it remains
          in the HTML; only the animated height hides it visually.
          This satisfies the prerender + SEO requirement.
        */}
        <Accordion.Root
          type="single"
          collapsible
          className="reveal reveal-delay-2 grid gap-0 overflow-hidden rounded-[4px] border border-[var(--line-soft)] bg-[linear-gradient(180deg,rgba(251,246,239,0.96),rgba(242,234,222,0.93))]"
        >
          {items.map((item, i) => (
            <Accordion.Item
              key={item.question}
              value={`item-${i}`}
              className={i > 0 ? 'border-t border-[var(--line-soft)]' : ''}
            >
              <Accordion.Header asChild>
                <h3>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-[rgba(161,118,78,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2">
                    <span className="text-[15px] font-[680] leading-[1.38] text-[var(--text-strong)]">
                      {item.question}
                    </span>
                    {/* Chevron — rotates open */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0 text-[var(--accent)] transition-transform duration-200 group-data-[state=open]:rotate-180"
                    >
                      <path
                        d="M3 6l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Accordion.Trigger>
                </h3>
              </Accordion.Header>
              <Accordion.Content
                data-radix-accordion-content
                className="px-6 pb-5 text-[14px] leading-[1.8] text-[var(--text-body)]"
              >
                {item.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
