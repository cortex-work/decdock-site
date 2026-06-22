/**
 * TransformationBand — "one-glance" section placed right after Hero.
 * Shows the DecisionFlow diagram as the visual centerpiece.
 * Uses band-deep for contrast after the hero (band-paper / parchment).
 */
import { useEffect, useRef } from 'react'
import DecisionFlow from './DecisionFlow'

export default function TransformationBand() {
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
    <section
      id="transformation"
      ref={ref}
      className="band-deep relative overflow-hidden py-20 lg:py-28"
    >
      {/* Editorial ghost number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-8 select-none font-display text-[120px] font-[700] leading-none text-[rgba(161,118,78,0.045)] lg:text-[160px]"
      >
        00
      </span>

      <div className="relative mx-auto max-w-6xl px-6">

        {/* Header — eyebrow + one-line headline */}
        <div className="mb-12 text-center lg:mb-14">
          <div className="reveal eyebrow-plain">Tek bakışta</div>
          <h2
            className="reveal reveal-delay-1 mx-auto mb-4 font-display font-[640] leading-[1.04] tracking-[-0.035em] text-[var(--text-strong)]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', maxWidth: '25ch' }}
          >
            Dağınık yazışmadan, karar sanılanları ayıran denetlenebilir sicile.
          </h2>
        </div>

        {/* Diagram — full-width visual hero */}
        <div className="reveal reveal-delay-2 mx-auto max-w-4xl">
          <DecisionFlow />
        </div>

      </div>

      {/* Bottom separator */}
      <div className="section-rule mt-20 lg:mt-28" />
    </section>
  )
}
