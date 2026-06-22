import { type FormEvent, useEffect, useState } from 'react'

type AuthEntryProps = {
  path: string
}

type AuthMode = 'ops-login' | 'ops-recover' | 'app-login' | 'app-register' | 'app-recover'

const modeCopy: Record<AuthMode, {
  title: string
  eyebrow: string
  description: string
  submitLabel: string
  destination?: string
}> = {
  'ops-login': {
    eyebrow: 'Internal ops access',
    title: 'Decdock operasyon kapısı',
    description: 'Müşteri hesapları, kuponlar, job queue, rapor teslimi ve veri silme işlemleri için ayrı iç panel girişi.',
    submitLabel: 'Ops paneline gir',
    destination: '/ops/',
  },
  'ops-recover': {
    eyebrow: 'Ops recovery',
    title: 'Ops erişimini kurtar',
    description: 'E-posta var mı yok mu söylemeden, kayıtlı internal kullanıcıya kurtarma adımı gönderilir.',
    submitLabel: 'Kurtarma adımı gönder',
  },
  'app-login': {
    eyebrow: 'Customer app access',
    title: 'Müşteri paneline güvenli giriş yap',
    description: 'Müşteri panelinde e-posta tek başına kapıyı açmaz. E-posta doğrulaması ve ayrı workspace erişim tokenı birlikte gerekir.',
    submitLabel: 'Müşteri paneline gir',
    destination: '/app/o/demo-org/',
  },
  'app-register': {
    eyebrow: 'Pilot registration',
    title: 'E-posta ile pilot hesabı aç',
    description: 'İlk kayıt e-posta ile başlar. Doğrulamadan sonra müşteri paneline giriş için ayrı workspace erişim tokenı üretilir.',
    submitLabel: 'Doğrulama e-postası gönder',
  },
  'app-recover': {
    eyebrow: 'Token recovery',
    title: 'Erişim tokenını yenile',
    description: 'Workspace tokenı kaybolduysa eski token iptal edilir, yeni token doğrulanmış e-postaya veya admin onayına bağlanır.',
    submitLabel: 'Token yenileme iste',
  },
}

function getMode(path: string): AuthMode {
  if (path.startsWith('/ops/recover')) {
    return 'ops-recover'
  }

  if (path.startsWith('/app/register')) {
    return 'app-register'
  }

  if (path.startsWith('/app/recover')) {
    return 'app-recover'
  }

  if (path.startsWith('/app/login')) {
    return 'app-login'
  }

  return 'ops-login'
}

export default function AuthEntry({ path }: AuthEntryProps) {
  const mode = getMode(path)
  const copy = modeCopy[mode]
  const [email, setEmail] = useState(mode.startsWith('ops') ? 'admin@decdock.com' : 'pilot@customer.com')
  const [company, setCompany] = useState('Demo Lojistik')
  const [coupon, setCoupon] = useState('')
  const [token, setToken] = useState('org_demo · 8Q4H-2K7M')
  const [password, setPassword] = useState('')
  const [opsToken, setOpsToken] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const previousTitle = document.title
    const robotsTag = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    const previousRobots = robotsTag?.content

    document.title = `${copy.title} · Decdock`
    if (robotsTag) {
      robotsTag.content = 'noindex, nofollow'
    }

    return () => {
      document.title = previousTitle
      if (robotsTag && previousRobots) {
        robotsTag.content = previousRobots
      }
    }
  }, [copy.title])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[var(--page)] text-[var(--text-strong)]">
      <div className="relative min-h-screen">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_12%,rgba(161,118,78,0.18),transparent_30%),linear-gradient(135deg,#f2ece3_0%,#e4d7c7_100%)]" />
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <a href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-75" aria-label="Decdock ana sayfa">
            <svg width="23" height="23" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="20" height="20" rx="3" stroke="var(--accent)" strokeWidth="1.4" />
              <line x1="5" y1="7" x2="17" y2="7" stroke="var(--accent)" strokeWidth="1.1" strokeLinecap="round" />
              <line x1="5" y1="11" x2="13" y2="11" stroke="var(--text-muted)" strokeWidth="1.1" strokeLinecap="round" />
              <line x1="5" y1="15" x2="15" y2="15" stroke="var(--text-muted)" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
            <span className="text-[14px] font-[780] tracking-[-0.02em]">Decdock</span>
          </a>
          <a
            className="hidden text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-strong)] sm:inline-flex"
            href={mode.startsWith('ops') ? '/app/login/' : '/ops/login/'}
          >
            {mode.startsWith('ops') ? 'Müşteri girişi' : 'Ops girişi'}
          </a>
        </header>

        <main className="mx-auto grid max-w-6xl gap-8 px-6 pb-14 pt-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
          <section>
            <span className="eyebrow">{copy.eyebrow}</span>
            <h1 className="mt-6 max-w-2xl font-display text-5xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-body)]">{copy.description}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <SecurityCard title="E-posta tek başına yetmez" text="Müşteri raporları için ayrı erişim tokenı istenir." />
              <SecurityCard title="Hesap sızıntısı yok" text="Kayıtlı e-posta var mı yok mu ekranda söylenmez." />
              <SecurityCard title="Token rotate edilir" text="Kaybolan token iptal edilip yenisi üretilir." />
              <SecurityCard title="Ops ayrı kapı" text="Internal panel müşteri uygulamasından ayrı route ve ikinci faktör kullanır." />
            </div>
          </section>

          <section className="panel-strong rounded-[8px] p-6 shadow-[var(--shadow-card-lg)]">
            <div className="flex flex-col gap-2 border-b border-[var(--line-soft)] pb-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                {mode.startsWith('ops') ? 'Decdock internal' : 'Customer workspace'}
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-[-0.035em]">
                {mode === 'app-register' ? 'Pilot hesabı' : mode.endsWith('recover') ? 'Erişim kurtarma' : 'Giriş bilgileri'}
              </h2>
            </div>

            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <Field label="E-posta" value={email} onChange={setEmail} type="email" />

              {mode === 'app-register' ? (
                <>
                  <Field label="Şirket adı" value={company} onChange={setCompany} />
                  <Field label="Deneme kuponu (opsiyonel)" value={coupon} onChange={setCoupon} placeholder="PILOT-XXXX" />
                </>
              ) : null}

              {mode === 'app-login' ? (
                <Field label="Workspace erişim tokenı" value={token} onChange={setToken} />
              ) : null}

              {mode === 'ops-login' ? (
                <>
                  <Field label="Şifre" value={password} onChange={setPassword} type="password" placeholder="Ops şifren" />
                  <Field label="Ops token / ikinci anahtar" value={opsToken} onChange={setOpsToken} placeholder="TOTP, passkey veya recovery token" />
                </>
              ) : null}

              {mode === 'app-recover' ? (
                <Field label="Rapor ID veya şirket adı" value="rep_demo_001" onChange={() => undefined} />
              ) : null}

              <button className="btn-primary mt-2 w-full py-3" type="submit">
                {copy.submitLabel}
              </button>
            </form>

            <div className="mt-5 flex flex-col gap-2 text-sm text-[var(--text-body)] sm:flex-row sm:items-center sm:justify-between">
              {mode === 'ops-login' ? <a className="font-semibold text-[var(--accent)]" href="/ops/recover/">Şifremi / tokenımı unuttum</a> : null}
              {mode === 'app-login' ? <a className="font-semibold text-[var(--accent)]" href="/app/recover/">Tokenımı kaybettim</a> : null}
              {mode === 'app-login' ? <a className="font-semibold text-[var(--accent)]" href="/app/register/">E-posta ile kayıt ol</a> : null}
              {mode === 'app-register' ? <a className="font-semibold text-[var(--accent)]" href="/app/login/">Zaten tokenım var</a> : null}
              {mode.endsWith('recover') ? <a className="font-semibold text-[var(--accent)]" href={mode.startsWith('ops') ? '/ops/login/' : '/app/login/'}>Girişe dön</a> : null}
            </div>

            {submitted ? (
              <div className="mt-6 rounded-[6px] border border-[rgba(92,117,96,0.24)] bg-[rgba(92,117,96,0.1)] p-4 text-sm leading-6 text-[#4f6a54]">
                {copy.destination ? (
                  <>
                    Prototip doğrulaması başarılı. Gerçek sistemde sunucu oturum oluşturur, token hash kontrolü yapar ve audit log yazar.
                    <a className="ml-1 font-bold underline" href={copy.destination}>Devam et</a>
                  </>
                ) : (
                  'Eğer bu e-posta kayıtlıysa gerekli adımlar gönderilecek. Güvenlik için hesap var/yok bilgisi gösterilmez.'
                )}
              </div>
            ) : null}
          </section>
        </main>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">{label}</span>
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-[4px] border border-[var(--line-soft)] bg-[rgba(251,246,239,0.78)] px-3 py-3 text-sm outline-none focus:border-[var(--accent)]"
      />
    </label>
  )
}

function SecurityCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[6px] border border-[var(--line-soft)] bg-[rgba(251,246,239,0.66)] p-4 shadow-[var(--shadow-soft)] backdrop-blur">
      <p className="text-sm font-bold">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--text-body)]">{text}</p>
    </div>
  )
}
