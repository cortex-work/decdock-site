const steps = [
  { n: '1', title: 'Yazışma', sub: 'seçili kaynak' },
  { n: '2', title: 'Decdock çıkarır', sub: 'karar sinyalleri' },
  { n: '3', title: 'Doğrulama', sub: 'karar mı, aday mı?' },
  { n: '4', title: 'Karar sicili', sub: 'kaynağa bağlı kayıt' },
]

const NODE_X = [80, 330, 580, 830]

export default function DecisionFlow() {
  return (
    <div className="mb-12">
      <style>{`
        .df-ring {
          transform-box: fill-box;
          transform-origin: center;
          animation: dfRing 3.4s cubic-bezier(0.22,1,0.36,1) infinite;
        }
        @keyframes dfRing {
          0% { transform: scale(1); opacity: 0.45; }
          60% { transform: scale(1.65); opacity: 0; }
          100% { transform: scale(1.65); opacity: 0; }
        }
        .df-stamp {
          transform-box: fill-box;
          transform-origin: center;
          animation: dfStamp 7s cubic-bezier(0.22,1,0.36,1) infinite;
        }
        @keyframes dfStamp {
          0%, 78% { transform: rotate(-8deg) scale(0.9); opacity: 0; }
          84% { transform: rotate(-8deg) scale(1.12); opacity: 1; }
          88%, 100% { transform: rotate(-8deg) scale(1); opacity: 1; }
        }
        .df-draw {
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          animation: dfDraw 1.6s ease-out forwards;
        }
        @keyframes dfDraw { to { stroke-dashoffset: 0; } }
        .df-step-node { animation: dfNodeIn 0.5s ease-out backwards; }
        @keyframes dfNodeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) {
          .df-ring, .df-stamp, .df-draw, .df-step-node { animation: none !important; }
          .df-stamp { opacity: 1; transform: rotate(-8deg); }
          .df-draw { stroke-dashoffset: 0; }
          .df-dot { display: none; }
        }
      `}</style>

      <div className="hidden sm:block">
        <svg
          viewBox="0 0 1040 330"
          className="h-auto w-full select-none"
          role="img"
          aria-label="Decdock süreci: yazışmalardan karar sinyalleri çıkarılır, doğrulamadan geçer, karar sanılanlar sicile alınmaz, güvenilir kayıtlar karar siciline eklenir."
        >
          <path
            id="dfMainPath"
            className="df-draw"
            d="M 80 140 C 160 110, 250 110, 330 140 S 500 170, 580 140 S 750 110, 830 140"
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="1.5"
          />
          <path
            id="dfBranchPath"
            d="M 580 140 C 605 195, 628 226, 674 246"
            fill="none"
            stroke="#a39588"
            strokeWidth="1.3"
            strokeDasharray="4 4"
          />
          <path
            id="dfGrayPath"
            d="M 80 140 C 160 110, 250 110, 330 140 S 500 170, 580 140 C 605 195, 628 226, 674 246"
            fill="none"
            stroke="none"
          />

          <circle className="df-dot" r="5" fill="var(--success)" opacity="0.9">
            <animateMotion dur="7s" repeatCount="indefinite" rotate="0">
              <mpath href="#dfMainPath" />
            </animateMotion>
          </circle>
          <circle className="df-dot" r="5" fill="var(--accent)" opacity="0.85">
            <animateMotion dur="7s" begin="3.5s" repeatCount="indefinite">
              <mpath href="#dfMainPath" />
            </animateMotion>
          </circle>
          <circle className="df-dot" r="4.5" fill="#93867b" opacity="0.85">
            <animateMotion dur="7s" begin="1.8s" repeatCount="indefinite">
              <mpath href="#dfGrayPath" />
            </animateMotion>
          </circle>

          {steps.map((s, i) => {
            const x = NODE_X[i] ?? 80
            const labelAbove = i === 2

            return (
              <g key={s.n}>
                <circle
                  className="df-ring"
                  style={{ animationDelay: `${i * 0.45}s` }}
                  cx={x}
                  cy={140}
                  r={15}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.2"
                />
                <circle cx={x} cy={140} r={15} fill="#faf5ef" stroke="var(--accent)" strokeWidth="1.5" />
                <text
                  x={x}
                  y={145.5}
                  textAnchor="middle"
                  fontFamily="Newsreader, Georgia, serif"
                  fontStyle="italic"
                  fontWeight="600"
                  fontSize="15"
                  fill="var(--text-strong)"
                >
                  {s.n}
                </text>
                <text
                  x={x}
                  y={labelAbove ? 96 : 186}
                  textAnchor="middle"
                  fontFamily="Manrope, sans-serif"
                  fontWeight="600"
                  fontSize="15"
                  fill="var(--text-strong)"
                >
                  {s.title}
                </text>
                <text
                  x={x}
                  y={labelAbove ? 114 : 206}
                  textAnchor="middle"
                  fontFamily="Manrope, sans-serif"
                  fontSize="11.5"
                  fill="var(--text-muted)"
                >
                  {s.sub}
                </text>
              </g>
            )
          })}

          <g className="df-stamp">
            <rect
              x={856}
              y={84}
              width={74}
              height={26}
              rx={6}
              fill="rgba(238,242,237,0.95)"
              stroke="rgba(101,125,104,0.6)"
              strokeWidth="2"
            />
            <text
              x={893}
              y={101}
              textAnchor="middle"
              fontFamily="Manrope, sans-serif"
              fontWeight="800"
              fontSize="10.5"
              letterSpacing="1.5"
              fill="rgba(101,125,104,0.9)"
            >
              SİCİL ✓
            </text>
          </g>

          <g>
            <rect
              x={668}
              y={226}
              width={244}
              height={60}
              rx={14}
              fill="rgba(247,241,234,0.85)"
              stroke="#a39588"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
            <text x={688} y={251} fontFamily="Manrope, sans-serif" fontWeight="600" fontSize="13.5" fill="var(--text-strong)">
              Sicil dışı adaylar
            </text>
            <text x={688} y={270} fontFamily="Manrope, sans-serif" fontSize="10.5" fill="var(--text-muted)">
              "karar sanılan"lar — gerekçesi görünür
            </text>
          </g>
        </svg>
      </div>

      <div className="sm:hidden">
        <ol className="relative ml-1 space-y-0">
          {steps.map((s, i) => (
            <li key={s.n} className="df-step-node relative pl-12 pb-7" style={{ animationDelay: `${i * 0.12}s` }}>
              {i < steps.length - 1 && (
                <span
                  className="absolute left-[15px] top-9 h-[calc(100%-22px)] w-px bg-[linear-gradient(180deg,var(--accent-soft),var(--line-strong))]"
                  aria-hidden="true"
                />
              )}
              <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--accent)] bg-[#faf5ef] font-display text-[14px] font-semibold italic text-[var(--text-strong)]">
                {s.n}
              </span>
              <div className="pt-1">
                <div className="text-[15px] font-semibold text-[var(--text-strong)]">{s.title}</div>
                <div className="text-[12px] text-[var(--text-muted)]">{s.sub}</div>
                {i === 2 && (
                  <div className="mt-2 inline-block rounded-[10px] border border-dashed border-[#a39588] bg-[rgba(247,241,234,0.85)] px-3 py-1.5 text-[11px] text-[var(--text-body)]">
                    ↳ "karar sanılan"lar → <strong>sicil dışı</strong> — gerekçesi görünür
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
