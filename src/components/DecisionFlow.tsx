/**
 * DecisionFlow — vertical, symmetric pipeline diagram (schema-vertical-v2).
 *
 * Centered spine is the axis of symmetry:
 *   (1) Kaynak okunur → (2) Çıkarım motoru → [aday hunisi] → (3) Doğrulama kapısı
 * The gate has two symmetric flanking outputs:
 *   left  — ✗ Karar sanılan (muted, dashed): sicile girmez
 *   right — 🔗 Kaynağa bağlı (sage): onaylayan + alıntı
 * Then ✓ ONAYLI KARAR → symmetric fork into two mirrored product panels:
 *   4 · Toplu çekim (sage)      Belgeler → Denetim raporu
 *   5 · Sürekli (terracotta)    Karar sicili → Haftalık digest
 *
 * Animation: ambient CSS only — flowing dashed connectors (stroke-dashoffset),
 * a gate pulse, and pulsing candidate dots. No rAF. Entrance handled by the
 * parent TransformationBand .reveal observer. prefers-reduced-motion disables
 * all motion. Layout is responsive (single tree); only the 2-way fork swaps to
 * a simple arrow on mobile, where the panels stack.
 *
 * a11y/SEO: <figure> has aria-label; full step text is in the DOM + sr-only.
 */

/* ─── Icons ──────────────────────────────────────────────────────────────── */
const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="2" y="3.5" width="14" height="11" rx="1.5" stroke="var(--text-muted)" strokeWidth="1.3" />
    <path d="M2.5 5l6.5 4.5L15.5 5" stroke="var(--text-muted)" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)
const IconEngine = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="3.2" stroke="var(--text-muted)" strokeWidth="1.3" />
    <path d="M9 1.6v2.3M9 14.1v2.3M1.6 9h2.3M14.1 9h2.3M3.8 3.8l1.6 1.6M12.6 12.6l1.6 1.6M14.2 3.8l-1.6 1.6M5.4 12.6l-1.6 1.6"
      stroke="var(--accent)" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
)
const IconGate = () => (
  <svg width="22" height="22" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M9 1.8l5.6 2.2v3.3c0 3.4-2.4 5.8-5.6 7-3.2-1.2-5.6-3.6-5.6-7V4z" stroke="var(--accent)" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M6.4 8.7l1.9 1.9 3.3-3.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconFolder = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M2.5 4.5A1.5 1.5 0 014 3h3l1.5 1.6H14A1.5 1.5 0 0115.5 6v7.5A1.5 1.5 0 0114 15H4a1.5 1.5 0 01-1.5-1.5z"
      stroke="var(--text-muted)" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
)
const IconDoc = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="3.5" y="2" width="11" height="14" rx="1.5" stroke="var(--success)" strokeWidth="1.3" />
    <path d="M6 6h6M6 9h6M6 12h4" stroke="var(--success)" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)
const IconGrid = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="2.5" y="3" width="13" height="12" rx="1.5" stroke="var(--text-muted)" strokeWidth="1.3" />
    <path d="M2.5 6.5h13M6 6.5V15" stroke="var(--text-muted)" strokeWidth="1.2" />
  </svg>
)
const IconDigest = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="2" y="4" width="14" height="10" rx="1.5" stroke="var(--accent)" strokeWidth="1.3" />
    <path d="M2.5 5l6.5 4.5L15.5 5" stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)
const PanelArrow = ({ color }: { color: string }) => (
  <svg width="26" height="14" viewBox="0 0 26 14" aria-hidden="true" className="shrink-0" style={{ color }}>
    <path d="M0 7h18m0 0l-5-4m5 4l-5 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ─── Small building blocks ──────────────────────────────────────────────── */
const Badge = ({ num }: { num: number }) => (
  <span
    className="absolute -top-[11px] left-[18px] flex h-6 w-6 items-center justify-center rounded-full bg-[var(--text-strong)] text-[11px] font-[800] leading-none text-white"
    style={{ boxShadow: '0 3px 8px rgba(43,35,29,0.25)' }}
    aria-hidden="true"
  >{num}</span>
)
const IconBox = ({ children, accent }: { children: React.ReactNode; accent?: boolean }) => (
  <span
    className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[9px] border"
    style={{
      borderColor: accent ? 'rgba(161,118,78,0.4)' : 'var(--line-medium)',
      background: accent
        ? 'linear-gradient(180deg,rgba(161,118,78,0.16),rgba(161,118,78,0.05))'
        : 'linear-gradient(180deg,rgba(161,118,78,0.10),rgba(161,118,78,0.03))',
    }}
    aria-hidden="true"
  >{children}</span>
)

function SpineNode({ num, icon, title, sub, width }: {
  num: number; icon: React.ReactNode; title: string; sub: string; width: string
}) {
  return (
    <div
      className={`relative mx-auto flex items-center gap-3.5 rounded-[10px] border border-[var(--line-medium)] bg-[var(--surface-strong)] px-5 py-3.5 ${width}`}
      style={{ boxShadow: '0 12px 30px rgba(43,35,29,0.07), inset 0 1px 0 rgba(255,255,255,0.6)' }}
    >
      <Badge num={num} />
      <IconBox>{icon}</IconBox>
      <div className="min-w-0">
        <div className="text-[14px] font-[700] leading-tight text-[var(--text-strong)]">{title}</div>
        <div className="mt-0.5 text-[11.5px] leading-snug text-[var(--text-faint)]">{sub}</div>
      </div>
    </div>
  )
}

/* Vertical flowing connector (centered in the spine). */
function VConn({ h = 34, color = 'var(--accent)', arrow = false }: { h?: number; color?: string; arrow?: boolean }) {
  return (
    <svg width="40" height={h} viewBox={`0 0 40 ${h}`} aria-hidden="true" className="block shrink-0">
      <path className="df-flow" style={{ stroke: color }} d={`M20 2 V ${arrow ? h - 8 : h - 1}`} />
      {arrow && <path d={`M20 ${h} l-5 -8 h10 z`} style={{ fill: color }} />}
    </svg>
  )
}

/* Product panel node (no number badge). */
function PNode({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div
      className="flex flex-1 items-center gap-2.5 rounded-[9px] border border-[var(--line-medium)] bg-[var(--surface-strong)] px-3 py-2.5"
      style={{ minWidth: 0, boxShadow: '0 5px 14px rgba(43,35,29,0.05)' }}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] border border-[var(--line-soft)] bg-[rgba(161,118,78,0.06)]" aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[12.5px] font-[700] leading-tight text-[var(--text-strong)]">{title}</div>
        <div className="mt-0.5 text-[10.5px] leading-snug text-[var(--text-faint)]">{sub}</div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════════════════════ */
export default function DecisionFlow() {
  return (
    <figure
      className="relative select-none"
      aria-label="Decdock karar yolu: kaynak okunur, çıkarım motoru karar adaylarını ayıklar, doğrulama kapısı onaylı kararı süzer; karar sanılan ifadeler sicile girmez, onaylı kararlar onaylayan ve kaynak alıntısıyla saklanır. Onaylı karar iki biçimde kullanılır: toplu çekimle tek seferlik denetim raporu veya sürekli güncellenen karar sicili ile haftalık digest."
    >
      <style>{`
        .df-flow { fill:none; stroke-width:2; stroke-linecap:round; stroke-dasharray:5 7; animation:dfFlow 1.1s linear infinite; }
        @keyframes dfFlow { to { stroke-dashoffset:-24; } }
        .df-gate { animation:dfGate 3.4s ease-in-out infinite; }
        @keyframes dfGate {
          0%,100% { box-shadow:0 0 0 0 rgba(161,118,78,0.30), 0 16px 36px rgba(43,35,29,0.12); }
          50%     { box-shadow:0 0 0 8px rgba(161,118,78,0.0), 0 16px 36px rgba(43,35,29,0.12); }
        }
        .df-dot { animation:dfDot 1.8s ease-in-out infinite; }
        @keyframes dfDot { 0%,100% { opacity:.3; transform:scale(.8); } 50% { opacity:.9; transform:scale(1.15); } }
        @media (prefers-reduced-motion: reduce) {
          .df-flow, .df-gate, .df-dot { animation:none !important; }
          .df-flow { stroke-dashoffset:0; }
        }
      `}</style>

      <div className="flex flex-col items-center">

        {/* 1 — Kaynak */}
        <SpineNode num={1} icon={<IconMail />} title="Kaynak okunur" sub="E-posta zinciri · toplantı notu" width="w-full max-w-[300px]" />
        <VConn h={34} color="var(--accent)" arrow />

        {/* 2 — Çıkarım */}
        <SpineNode num={2} icon={<IconEngine />} title="Çıkarım motoru" sub="Yazışmadan karar adaylarını ayıklar" width="w-full max-w-[340px]" />
        <VConn h={24} color="var(--accent)" />

        {/* candidates */}
        <div className="flex justify-center gap-3">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line-medium)] bg-[var(--surface-strong)] px-3.5 py-1.5 text-[11px] font-[700] text-[var(--text-body)]"
              style={{ boxShadow: '0 4px 12px rgba(43,35,29,0.05)' }}
            >
              <span className="df-dot h-1.5 w-1.5 rounded-full bg-[var(--accent)]" style={{ animationDelay: `${i * 0.3}s` }} aria-hidden="true" />
              aday
            </span>
          ))}
        </div>

        {/* funnel 3 → 1 */}
        <svg width="340" height="50" viewBox="0 0 340 50" aria-hidden="true" className="block max-w-full">
          <path className="df-flow" style={{ stroke: 'var(--accent)' }} d="M76 2 C76 30 170 18 170 40" />
          <path className="df-flow" style={{ stroke: 'var(--accent)' }} d="M170 2 V40" />
          <path className="df-flow" style={{ stroke: 'var(--accent)' }} d="M264 2 C264 30 170 18 170 40" />
          <path d="M170 49 l-5 -8 h10 z" style={{ fill: 'var(--accent)' }} />
        </svg>

        {/* 3 — GATE with symmetric flanking outputs */}
        <div className="grid w-full items-center gap-3 sm:gap-0 sm:[grid-template-columns:1fr_auto_1fr]">
          {/* reject (left on desktop, below on mobile) */}
          <div className="order-2 flex items-center justify-center sm:order-1 sm:justify-end">
            <div className="max-w-[200px] rounded-[9px] border border-dashed border-[var(--line-medium)] bg-[rgba(94,86,80,0.04)] px-3 py-2.5 text-[10.5px] leading-snug text-[var(--text-faint)]">
              <b className="mb-0.5 flex items-center gap-1.5 font-[800] text-[var(--text-body)]">
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
                Karar sanılan
              </b>
              öneri · rica · niyet · takvim — sicile girmez, gerekçesiyle ayrılır
            </div>
            <span className="hidden h-0 w-7 border-t border-dashed border-[var(--line-medium)] sm:block" aria-hidden="true" />
          </div>

          {/* gate */}
          <div
            className="df-gate relative order-1 mx-auto flex w-full max-w-[360px] items-center gap-3.5 rounded-[12px] px-6 py-4 sm:order-2"
            style={{ border: '1.5px solid rgba(161,118,78,0.55)', background: 'linear-gradient(180deg,#fdfaf4,#f4ecdd)' }}
          >
            <Badge num={3} />
            <IconBox accent><IconGate /></IconBox>
            <div className="min-w-0">
              <div className="text-[14px] font-[700] leading-tight text-[var(--text-strong)]">Doğrulama + sınıflandırma</div>
              <div className="mt-1 text-[11px] font-[600] italic leading-snug text-[var(--accent-deep)]">“Ratife edilmiş karar mı? Kim onayladı?”</div>
            </div>
          </div>

          {/* evidence (right on desktop, below on mobile) */}
          <div className="order-3 flex items-center justify-center sm:justify-start">
            <span className="mr-0 hidden h-[2px] w-7 rounded sm:block" style={{ background: 'linear-gradient(90deg,var(--success),transparent)' }} aria-hidden="true" />
            <div className="max-w-[200px] rounded-[9px] border px-3 py-2.5 text-[10.5px] leading-snug" style={{ borderColor: 'rgba(92,117,96,0.3)', background: 'rgba(92,117,96,0.07)', color: 'var(--success)' }}>
              <b className="mb-0.5 flex items-center gap-1.5 font-[800]">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M5.6 8.4l2.8-2.8M5.9 4.1l1-1a2.1 2.1 0 013 3l-1 1M8.1 9.9l-1 1a2.1 2.1 0 01-3-3l1-1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                Kaynağa bağlı
              </b>
              her karar, onaylayan kişi ve kaynaktaki alıntıyla saklanır
            </div>
          </div>
        </div>

        <VConn h={34} color="var(--success)" arrow />

        {/* accept pill */}
        <div
          className="inline-flex items-center gap-2 rounded-full border text-[12px] font-[800] tracking-[0.04em]"
          style={{ borderColor: 'rgba(92,117,96,0.28)', background: 'rgba(92,117,96,0.10)', color: 'var(--success)', boxShadow: '0 6px 16px rgba(43,35,29,0.06)', padding: '7px 18px' }}
        >
          ✓ ONAYLI KARAR <span className="font-[600] text-[var(--success)] opacity-80">· ne · kim · ne zaman</span>
        </div>

        {/* fork — desktop SVG / mobile arrow */}
        <svg width="900" height="60" viewBox="0 0 900 60" aria-hidden="true" className="hidden w-full max-w-[900px] sm:block">
          <path className="df-flow" style={{ stroke: 'var(--success)' }} d="M450 2 V18 Q450 30 432 30 H234 Q216 30 216 42 V52" />
          <path className="df-flow" style={{ stroke: 'var(--accent)' }} d="M450 2 V18 Q450 30 468 30 H666 Q684 30 684 42 V52" />
          <path d="M216 59 l-5 -8 h10 z" style={{ fill: 'var(--success)' }} />
          <path d="M684 59 l-5 -8 h10 z" style={{ fill: 'var(--accent)' }} />
        </svg>
        <div className="sm:hidden"><VConn h={30} color="var(--success)" arrow /></div>

        {/* product panels (mirrored) */}
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-9">
          {/* 4 · Toplu çekim (sage) */}
          <div
            className="relative overflow-hidden rounded-[14px] border p-[18px]"
            style={{ borderColor: 'rgba(92,117,96,0.3)', background: 'linear-gradient(180deg,rgba(92,117,96,0.09),rgba(251,246,239,0.96))', boxShadow: '0 14px 34px rgba(43,35,29,0.08)' }}
          >
            <span className="mb-3.5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10.5px] font-[800] uppercase tracking-[0.1em]" style={{ borderColor: 'rgba(92,117,96,0.32)', background: 'rgba(92,117,96,0.14)', color: 'var(--success)' }}>
              4 · Toplu çekim
            </span>
            <div className="flex items-center gap-2.5">
              <PNode icon={<IconFolder />} title="Belgeler" sub="bitmiş proje" />
              <PanelArrow color="var(--success)" />
              <PNode icon={<IconDoc />} title="Denetim raporu" sub="tek seferlik" />
            </div>
            <p className="mt-3 text-[11.5px] leading-relaxed text-[var(--text-body)]">
              <b style={{ color: 'var(--success)' }}>Kurulum yok.</b> Bitmiş projenin dosyalarını verirsiniz, karar sicilini rapor olarak alırsınız.
            </p>
          </div>

          {/* 5 · Sürekli (terracotta) */}
          <div
            className="relative overflow-hidden rounded-[14px] border p-[18px]"
            style={{ borderColor: 'rgba(161,118,78,0.3)', background: 'linear-gradient(180deg,rgba(161,118,78,0.08),rgba(251,246,239,0.96))', boxShadow: '0 14px 34px rgba(43,35,29,0.08)' }}
          >
            <span className="mb-3.5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10.5px] font-[800] uppercase tracking-[0.1em]" style={{ borderColor: 'rgba(161,118,78,0.3)', background: 'rgba(161,118,78,0.14)', color: 'var(--accent)' }}>
              5 · Sürekli
            </span>
            <div className="flex items-center gap-2.5">
              <PNode icon={<IconGrid />} title="Karar sicili" sub="dashboard" />
              <PanelArrow color="var(--accent)" />
              <PNode icon={<IconDigest />} title="Haftalık digest" sub="otomatik" />
            </div>
            <p className="mt-3 text-[11.5px] leading-relaxed text-[var(--text-body)]">
              <b style={{ color: 'var(--accent)' }}>Bağlı kaynak.</b> Sicil kendini günceller; sahipsizlik ve çelişki anında görünür, haftada bir özet gelir.
            </p>
          </div>
        </div>
      </div>

      {/* SEO / screen-reader text */}
      <p className="sr-only">
        Süreç adımları: (1) Kaynak okunur — e-posta zinciri ve toplantı notu.
        (2) Çıkarım motoru — yazışmadan karar adaylarını ayıklar.
        (3) Doğrulama ve sınıflandırma — ratife edilmiş karar mı, kim onayladı?
        Karar sanılan ifadeler (öneri, rica, niyet, takvim) sicile girmez, gerekçesiyle ayrılır.
        Onaylı her karar onaylayan kişi ve kaynaktaki alıntıyla saklanır.
        Onaylı karar iki biçimde kullanılır:
        4 · Toplu çekim — belgeleri verirsiniz, tek seferlik Karar Denetimi raporu alırsınız, kurulum yok.
        5 · Sürekli — karar sicili dashboard kendini günceller ve haftalık digest gelir.
      </p>
    </figure>
  )
}
