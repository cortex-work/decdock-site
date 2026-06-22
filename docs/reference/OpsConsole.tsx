import { useEffect, useState } from 'react'

const HAIKU_INPUT_USD_PER_MTOK = 1
const HAIKU_OUTPUT_USD_PER_MTOK = 5
const DEFAULT_APPROVAL_THRESHOLD_USD = 1.2
const HARD_TRIAL_LIMIT_USD = 1.5
const DEFAULT_MAX_EMAILS = 50
const DEFAULT_MAX_TEXT_MB = 5
const DEFAULT_MAX_INPUT_TOKENS = 1_000_000

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

const numberFormatter = new Intl.NumberFormat('tr-TR')

type GeneratedCoupon = {
  code: string
  maxCostUsd: number
  expiresAt: string
  reason: string
}

const pipeline = [
  {
    label: 'Upload',
    detail: 'Dosya alındı, ekler hariç metin gövdesi sayıldı.',
    state: 'done',
  },
  {
    label: 'Preflight',
    detail: 'MB, email sayısı, token ve tahmini maliyet hesaplandı.',
    state: 'done',
  },
  {
    label: 'Admin onayı',
    detail: 'Limit uygunsa rapor işi beklemeye alınır.',
    state: 'active',
  },
  {
    label: 'Rapor üretimi',
    detail: 'Onaydan sonra Haiku job otomatik başlar.',
    state: 'waiting',
  },
  {
    label: 'Teslim',
    detail: 'rapor@decdock.com güvenli HTML/PDF linkini gönderir.',
    state: 'waiting',
  },
]

const adapterMap = [
  ['pilot_request', 'tenant / workspace'],
  ['upload', 'raw source / import batch'],
  ['report_job', 'extraction run / processing job'],
  ['report', 'digest report artifact'],
  ['coupon', 'billing credit / usage guard'],
  ['audit_log', 'governance event'],
]

function estimateInputTokens(emailCount: number, textMb: number) {
  const tokensFromEmails = emailCount * 2_200
  const tokensFromText = textMb * 220_000

  return Math.ceil(Math.max(tokensFromEmails, tokensFromText))
}

function estimateOutputTokens(emailCount: number) {
  return Math.ceil(Math.max(8_000, emailCount * 420))
}

function estimateCostUsd(inputTokens: number, outputTokens: number) {
  const inputCost = (inputTokens / 1_000_000) * HAIKU_INPUT_USD_PER_MTOK
  const outputCost = (outputTokens / 1_000_000) * HAIKU_OUTPUT_USD_PER_MTOK

  return inputCost + outputCost
}

function buildCouponCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = new Uint8Array(10)
  const cryptoApi = globalThis.crypto

  if (cryptoApi) {
    cryptoApi.getRandomValues(bytes)
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * alphabet.length)
    }
  }

  return `PILOT-${Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join('')}`
}

function formatUsd(value: number) {
  return usdFormatter.format(value)
}

function formatTokens(value: number) {
  return numberFormatter.format(value)
}

export default function OpsConsole() {
  const [couponLimitUsd, setCouponLimitUsd] = useState(HARD_TRIAL_LIMIT_USD)
  const [couponReason, setCouponReason] = useState('İlk karar denetimi pilotu')
  const [generatedCoupon, setGeneratedCoupon] = useState<GeneratedCoupon | null>(null)
  const [verifiedEmail, setVerifiedEmail] = useState('pilot@customer.com')
  const [emailCount, setEmailCount] = useState(35)
  const [textMb, setTextMb] = useState(0.9)
  const [reportSent, setReportSent] = useState(false)

  useEffect(() => {
    const previousTitle = document.title
    const robotsTag = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    const previousRobots = robotsTag?.content

    document.title = 'Decdock Ops Console'
    if (robotsTag) {
      robotsTag.content = 'noindex, nofollow'
    }

    return () => {
      document.title = previousTitle
      if (robotsTag && previousRobots) {
        robotsTag.content = previousRobots
      }
    }
  }, [])

  const inputTokens = estimateInputTokens(emailCount, textMb)
  const outputTokens = estimateOutputTokens(emailCount)
  const estimatedCostUsd = estimateCostUsd(inputTokens, outputTokens)
  const activeLimitUsd = generatedCoupon?.maxCostUsd ?? HARD_TRIAL_LIMIT_USD
  const thresholdUsd = Math.min(DEFAULT_APPROVAL_THRESHOLD_USD, activeLimitUsd)
  const isWithinAutoApproval = estimatedCostUsd <= thresholdUsd
  const isWithinHardLimit = estimatedCostUsd <= activeLimitUsd
  const progressWidth = `${Math.min(100, Math.round((estimatedCostUsd / activeLimitUsd) * 100))}%`
  const emailLimitHit = emailCount > DEFAULT_MAX_EMAILS
  const mbLimitHit = textMb > DEFAULT_MAX_TEXT_MB
  const tokenLimitHit = inputTokens > DEFAULT_MAX_INPUT_TOKENS

  const statusLabel = isWithinAutoApproval
    ? 'Admin onayı bekler'
    : isWithinHardLimit
      ? 'Özel onay ister'
      : 'Limit üstü'

  const statusTone = isWithinAutoApproval
    ? 'border-[rgba(92,117,96,0.28)] bg-[rgba(92,117,96,0.12)] text-[#4f6a54]'
    : isWithinHardLimit
      ? 'border-[rgba(160,112,72,0.35)] bg-[rgba(160,112,72,0.12)] text-[#8a6240]'
      : 'border-[rgba(142,63,50,0.28)] bg-[rgba(142,63,50,0.12)] text-[#8e3f32]'

  function generateCoupon() {
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)

    setGeneratedCoupon({
      code: buildCouponCode(),
      maxCostUsd: Number(couponLimitUsd.toFixed(2)),
      expiresAt: expiresAt.toISOString().slice(0, 10),
      reason: couponReason.trim() || 'Özel pilot kuponu',
    })
    setReportSent(false)
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[var(--page)] text-[var(--text-strong)]">
      <header className="border-b border-[var(--line-soft)] bg-[rgba(242,236,227,0.88)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <a href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-75" aria-label="Decdock ana sayfa">
            <svg width="24" height="24" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="20" height="20" rx="3" stroke="var(--accent)" strokeWidth="1.4" />
              <line x1="5" y1="7" x2="17" y2="7" stroke="var(--accent)" strokeWidth="1.1" strokeLinecap="round" />
              <line x1="5" y1="11" x2="13" y2="11" stroke="var(--text-muted)" strokeWidth="1.1" strokeLinecap="round" />
              <line x1="5" y1="15" x2="15" y2="15" stroke="var(--text-muted)" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
            <span className="text-[14px] font-[780] tracking-[-0.02em]">Decdock</span>
          </a>
          <div className="flex flex-wrap items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
            <span className="chip">Internal prototype</span>
            <span className="chip">No real API call</span>
            <span className="chip">Haiku cost guard</span>
            <a className="chip hover:border-[var(--accent)] hover:text-[var(--accent)]" href="/ops/login/">
              Ops login
            </a>
          </div>
        </div>
      </header>

      <main className="relative">
        <section className="relative border-b border-[var(--line-soft)] px-6 py-14 sm:py-18">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(161,118,78,0.17),transparent_28%),linear-gradient(135deg,#f2ece3_0%,#e5d8c7_100%)]" />
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-end">
            <div>
                <span className="eyebrow">Ops Console</span>
                <h1 className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-[var(--text-strong)] sm:text-6xl lg:text-7xl">
                Müşteri, kupon, job ve rapor teslimi tek kontrol kulesinde.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-body)]">
                Bu ekran gerçek backend yerine hesap, kupon, preflight ve rapor job akışını simüle eder. Pilot dışında destek, audit, maliyet ve veri silme işleri için de büyüyebilecek internal control plane'dir.
                </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#coupon" className="btn-primary">
                  Kupon üret
                </a>
                <a href="#preflight" className="btn-ghost">
                  Preflight dene
                </a>
              </div>
            </div>

            <div className="panel-strong relative overflow-hidden rounded-[6px] p-5">
              <div className="absolute right-5 top-5 rounded-full border border-[rgba(161,118,78,0.22)] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                Runway
              </div>
              <div className="mt-10 grid gap-4">
                <MetricRow label="Default approval" value={formatUsd(DEFAULT_APPROVAL_THRESHOLD_USD)} detail="Admin onayı sonrası otomatik job" />
                <MetricRow label="Hard free cap" value={formatUsd(HARD_TRIAL_LIMIT_USD)} detail="Tampon dahil deneme sınırı" />
                <MetricRow label="Model" value="Haiku" detail="$1 input / $5 output per 1M token" />
              </div>
              <div id="delivery-rule" className="mt-6 rounded-[4px] border border-[var(--line-soft)] bg-[rgba(44,38,32,0.04)] p-4">
                <p className="text-sm font-semibold text-[var(--text-strong)]">Teslim kuralı</p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-body)]">
                  Rapor HTML ve PDF üretilir. E-posta gövdesi ham rapor taşımaz; doğrulanmış kullanıcıya güvenli indirme linki gider.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div id="coupon" className="panel-strong rounded-[6px] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
              <span className="eyebrow-plain">Ops kupon üretimi</span>
                  <h2 className="font-display text-3xl font-semibold tracking-[-0.035em]">Tek kullanımlık özel kupon</h2>
                </div>
                <span className="rounded-full border border-[rgba(92,117,96,0.24)] bg-[rgba(92,117,96,0.1)] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#5c7560]">
                  1 use
                </span>
              </div>

              <div className="mt-6 grid gap-4">
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">Harcama limiti</span>
                  <div className="mt-2 flex items-center gap-2 rounded-[4px] border border-[var(--line-soft)] bg-[rgba(251,246,239,0.78)] px-3 py-2">
                    <span className="text-sm font-bold text-[var(--accent)]">$</span>
                    <input
                      value={couponLimitUsd}
                      min={0.1}
                      step={0.1}
                      type="number"
                      onChange={(event) => setCouponLimitUsd(Number(event.target.value) || 0)}
                      className="w-full bg-transparent text-lg font-semibold outline-none"
                      aria-label="Kupon harcama limiti"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">Kullanım notu</span>
                  <input
                    value={couponReason}
                    onChange={(event) => setCouponReason(event.target.value)}
                    className="mt-2 w-full rounded-[4px] border border-[var(--line-soft)] bg-[rgba(251,246,239,0.78)] px-3 py-3 text-sm outline-none focus:border-[var(--accent)]"
                    aria-label="Kupon kullanım notu"
                  />
                </label>

                <button type="button" onClick={generateCoupon} className="btn-primary w-full">
                  Tek kullanımlık kupon generate et
                </button>
              </div>

              <div className="mt-6 rounded-[6px] border border-dashed border-[rgba(161,118,78,0.42)] bg-[rgba(161,118,78,0.08)] p-4">
                {generatedCoupon ? (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">Oluşan kupon</p>
                    <p className="mt-2 break-all font-mono text-xl font-bold tracking-[0.08em] text-[var(--text-strong)]">
                      {generatedCoupon.code}
                    </p>
                    <dl className="mt-4 grid gap-2 text-sm text-[var(--text-body)] sm:grid-cols-3">
                      <div>
                        <dt className="font-bold text-[var(--text-strong)]">Limit</dt>
                        <dd>{formatUsd(generatedCoupon.maxCostUsd)}</dd>
                      </div>
                      <div>
                        <dt className="font-bold text-[var(--text-strong)]">Bitiş</dt>
                        <dd>{generatedCoupon.expiresAt}</dd>
                      </div>
                      <div>
                        <dt className="font-bold text-[var(--text-strong)]">Audit notu</dt>
                        <dd>{generatedCoupon.reason}</dd>
                      </div>
                    </dl>
                  </div>
                ) : (
                  <p className="text-sm leading-6 text-[var(--text-body)]">
                    Kupon kodu üretildiğinde sadece tek kullanım hakkı, maliyet limiti ve audit notuyla görünür. Gerçek sistemde kodun ham hali loglanmaz.
                  </p>
                )}
              </div>
            </div>

            <div id="preflight" className="panel-strong rounded-[6px] p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="eyebrow-plain">Pilot preflight</span>
                  <h2 className="font-display text-3xl font-semibold tracking-[-0.035em]">Dosya gelmeden API çalışmaz.</h2>
                </div>
                <span className={`rounded-full border px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] ${statusTone}`}>
                  {statusLabel}
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <InputBox label="Doğrulanmış e-posta" value={verifiedEmail} onChange={setVerifiedEmail} />
                <NumberBox label="E-posta adedi" value={emailCount} min={1} onChange={setEmailCount} />
                <NumberBox label="Text MB" value={textMb} min={0.1} step={0.1} onChange={setTextMb} />
              </div>

              <div className="mt-6 rounded-[6px] border border-[var(--line-soft)] bg-[rgba(44,38,32,0.035)] p-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">Tahmini LLM maliyeti</p>
                    <p className="mt-1 text-4xl font-bold tracking-[-0.045em]">{formatUsd(estimatedCostUsd)}</p>
                  </div>
                  <div className="text-right text-sm text-[var(--text-body)]">
                    <p>{formatTokens(inputTokens)} input token</p>
                    <p>{formatTokens(outputTokens)} output token</p>
                  </div>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[rgba(44,38,32,0.12)]">
                  <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: progressWidth }} />
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Aktif limit: {formatUsd(activeLimitUsd)} · Onay eşiği: {formatUsd(thresholdUsd)}
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <LimitPill label="Email" value={`${emailCount}/${DEFAULT_MAX_EMAILS}`} isWarning={emailLimitHit} />
                <LimitPill label="MB" value={`${textMb.toFixed(1)}/${DEFAULT_MAX_TEXT_MB}`} isWarning={mbLimitHit} />
                <LimitPill label="Token" value={`${formatTokens(inputTokens)}/${formatTokens(DEFAULT_MAX_INPUT_TOKENS)}`} isWarning={tokenLimitHit} />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="btn-accent disabled:cursor-not-allowed disabled:opacity-45"
                  disabled={!isWithinHardLimit}
                  onClick={() => setReportSent(true)}
                >
                  Admin onayı ver
                </button>
                <a className="btn-ghost" href="#delivery-rule">
                  Teslim kuralına bak
                </a>
              </div>

              {reportSent ? (
                <div className="mt-5 rounded-[6px] border border-[rgba(92,117,96,0.25)] bg-[rgba(92,117,96,0.1)] p-4 text-sm leading-6 text-[#4f6a54]">
                  Rapor işi otomatik başladı. Hazır olduğunda <strong>rapor@decdock.com</strong>, {verifiedEmail} adresine güvenli HTML/PDF linki gönderecek.
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--line-soft)] bg-[linear-gradient(180deg,#e9ddcf_0%,#ded1c1_100%)] px-6 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-2xl">
              <span className="eyebrow-plain">Job pipeline</span>
              <h2 className="font-display text-4xl font-semibold tracking-[-0.04em]">Karar akışı elle başlamaz, onaydan sonra kendi rayına girer.</h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-5">
              {pipeline.map((step, index) => (
                <div key={step.label} className="panel rounded-[6px] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        step.state === 'done'
                          ? 'bg-[#5c7560]'
                          : step.state === 'active'
                            ? 'bg-[var(--accent)]'
                            : 'bg-[rgba(44,38,32,0.2)]'
                      }`}
                    />
                  </div>
                  <h3 className="mt-6 text-lg font-bold tracking-[-0.02em]">{step.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-body)]">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-12 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="panel-strong rounded-[6px] p-6">
              <span className="eyebrow-plain">Sonradan Decdock'a bağlanma</span>
              <h2 className="font-display text-4xl font-semibold tracking-[-0.04em]">Bugün mock, yarın adapter.</h2>
              <div className="mt-6 grid gap-3">
                {adapterMap.map(([pilotName, decdockName]) => (
                  <div key={pilotName} className="grid gap-2 rounded-[4px] border border-[var(--line-soft)] bg-[rgba(251,246,239,0.72)] p-3 sm:grid-cols-[0.9fr_auto_1fr] sm:items-center">
                    <code className="font-mono text-sm font-bold text-[var(--text-strong)]">{pilotName}</code>
                    <span className="hidden text-[var(--accent)] sm:block">→</span>
                    <code className="font-mono text-sm text-[var(--text-body)]">{decdockName}</code>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-dark rounded-[6px] p-6 text-[#f7f0e8]">
              <span className="eyebrow-invert">Veri güvenliği</span>
              <h2 className="font-display text-3xl font-semibold tracking-[-0.035em]">Öğrenme yok, izinli debug var.</h2>
              <div className="mt-6 grid gap-4">
                <PolicyPoint title="Model eğitimi yok" text="Ham müşteri verisi model eğitimi veya genel ürün kalibrasyonu için kullanılmaz." />
                <PolicyPoint title="Hata ayıklama izinli" text="İçerik incelemesi gerekirse açık izin, süre sınırı ve audit log gerekir." />
                <PolicyPoint title="Mailbox'a ham veri saçma yok" text="Varsayılan teslim güvenli linktir; rapor attachment post-MVP opsiyonudur." />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function MetricRow({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="grid grid-cols-[0.9fr_1fr] gap-4 border-b border-[var(--line-soft)] pb-4 last:border-b-0 last:pb-0">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.13em] text-[var(--text-muted)]">{label}</p>
        <p className="mt-1 text-2xl font-bold tracking-[-0.04em]">{value}</p>
      </div>
      <p className="text-sm leading-6 text-[var(--text-body)]">{detail}</p>
    </div>
  )
}

function InputBox({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-[4px] border border-[var(--line-soft)] bg-[rgba(251,246,239,0.78)] px-3 py-3 text-sm outline-none focus:border-[var(--accent)]"
      />
    </label>
  )
}

function NumberBox({
  label,
  value,
  min,
  step = 1,
  onChange,
}: {
  label: string
  value: number
  min: number
  step?: number
  onChange: (value: number) => void
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">{label}</span>
      <input
        value={value}
        min={min}
        step={step}
        type="number"
        onChange={(event) => onChange(Number(event.target.value) || min)}
        className="mt-2 w-full rounded-[4px] border border-[var(--line-soft)] bg-[rgba(251,246,239,0.78)] px-3 py-3 text-sm outline-none focus:border-[var(--accent)]"
      />
    </label>
  )
}

function LimitPill({ label, value, isWarning }: { label: string; value: string; isWarning: boolean }) {
  return (
    <div
      className={`rounded-[4px] border px-3 py-2 ${
        isWarning
          ? 'border-[rgba(142,63,50,0.28)] bg-[rgba(142,63,50,0.1)] text-[#8e3f32]'
          : 'border-[var(--line-soft)] bg-[rgba(251,246,239,0.62)] text-[var(--text-body)]'
      }`}
    >
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em]">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  )
}

function PolicyPoint({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[4px] border border-[rgba(255,244,232,0.1)] bg-[rgba(255,244,232,0.045)] p-4">
      <p className="font-bold">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[rgba(247,240,232,0.72)]">{text}</p>
    </div>
  )
}
