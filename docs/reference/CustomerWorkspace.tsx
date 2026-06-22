import { type ReactNode, useEffect } from 'react'

type CustomerWorkspaceProps = {
  path: string
}

type CustomerSection = 'overview' | 'reports' | 'uploads' | 'settings' | 'access'

const reports = [
  {
    id: 'rep_demo_001',
    title: 'Mayıs Karar Denetimi',
    status: 'Hazır',
    summary: '3 karar kaydı, 1 doğrulama bekleyen madde',
    deliveredAt: '17 Haziran 2026',
    cost: '$0.27',
  },
  {
    id: 'rep_demo_002',
    title: 'Satın alma e-posta taraması',
    status: 'Taslak',
    summary: 'Preflight tamamlandı, admin onayı bekliyor',
    deliveredAt: 'Bekliyor',
    cost: '$0.41 tahmini',
  },
]

const decisionRows = [
  {
    title: 'Paketleme standardı revize edildi',
    owner: 'Operasyon',
    status: 'Geçerli karar',
    source: 'E-posta zinciri, 12 Mayıs',
  },
  {
    title: 'Kargo SLA raporu haftalık kapanacak',
    owner: 'Finans',
    status: 'Doğrulama bekliyor',
    source: 'Toplantı notu, 14 Mayıs',
  },
  {
    title: 'Eski iade onay akışı kaldırıldı',
    owner: 'Müşteri destek',
    status: 'Superseded',
    source: 'E-posta zinciri, 17 Mayıs',
  },
]

const settings = [
  ['Rapor teslimi', 'HTML panel + PDF indirme'],
  ['Ham veri saklama', '30 gün sonra otomatik silme'],
  ['Bildirim e-postası', 'pilot@customer.com'],
  ['Token yenileme', 'Ops onayı gerektirir'],
]

function readRoute(path: string) {
  const parts = path.split('/').filter(Boolean)
  const orgId = parts[2] ?? 'demo-org'
  const rawSection = parts[3]
  const resourceId = parts[4]

  const section: CustomerSection =
    rawSection === 'reports' || rawSection === 'uploads' || rawSection === 'settings' || rawSection === 'access'
      ? rawSection
      : 'overview'

  return { orgId, resourceId, section }
}

function sectionTitle(section: CustomerSection) {
  switch (section) {
    case 'reports':
      return 'Raporlar'
    case 'uploads':
      return 'Yüklemeler'
    case 'settings':
      return 'Ayarlar'
    case 'access':
      return 'Erişim'
    default:
      return 'Genel bakış'
  }
}

export default function CustomerWorkspace({ path }: CustomerWorkspaceProps) {
  const { orgId, resourceId, section } = readRoute(path)
  const activeReport = reports.find((report) => report.id === resourceId) ?? reports[0]

  useEffect(() => {
    const previousTitle = document.title
    const robotsTag = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    const previousRobots = robotsTag?.content

    document.title = `Decdock Customer Panel · ${sectionTitle(section)}`
    if (robotsTag) {
      robotsTag.content = 'noindex, nofollow'
    }

    return () => {
      document.title = previousTitle
      if (robotsTag && previousRobots) {
        robotsTag.content = previousRobots
      }
    }
  }, [section])

  return (
    <div className="min-h-screen bg-[var(--page)] text-[var(--text-strong)]">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-[var(--line-soft)] bg-[rgba(44,38,32,0.96)] px-6 py-6 text-[#f7f0e8] lg:border-b-0 lg:border-r lg:border-[rgba(255,244,232,0.1)]">
          <a href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-75" aria-label="Decdock ana sayfa">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="20" height="20" rx="3" stroke="var(--accent)" strokeWidth="1.4" />
              <line x1="5" y1="7" x2="17" y2="7" stroke="var(--accent)" strokeWidth="1.1" strokeLinecap="round" />
              <line x1="5" y1="11" x2="13" y2="11" stroke="rgba(247,240,232,0.6)" strokeWidth="1.1" strokeLinecap="round" />
              <line x1="5" y1="15" x2="15" y2="15" stroke="rgba(247,240,232,0.6)" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
            <span className="text-[14px] font-[780] tracking-[-0.02em]">Decdock</span>
          </a>

          <div className="mt-10">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[rgba(247,240,232,0.46)]">Workspace</p>
            <p className="mt-2 font-mono text-sm font-bold">{orgId}</p>
          </div>

          <nav className="mt-8 grid gap-2 text-sm" aria-label="Müşteri panel navigasyonu">
            <WorkspaceLink active={section === 'overview'} href={`/app/o/${orgId}/`} label="Genel bakış" />
            <WorkspaceLink active={section === 'reports'} href={`/app/o/${orgId}/reports`} label="Raporlar" />
            <WorkspaceLink active={section === 'uploads'} href={`/app/o/${orgId}/uploads/upl_demo_001`} label="Yüklemeler" />
            <WorkspaceLink active={section === 'settings'} href={`/app/o/${orgId}/settings`} label="Ayarlar" />
            <WorkspaceLink active={section === 'access'} href={`/app/o/${orgId}/access`} label="Erişim" />
            <a className="rounded-[4px] px-3 py-2 text-[rgba(247,240,232,0.68)] hover:bg-[rgba(255,244,232,0.08)]" href="/app/login/">
              Çıkış / giriş
            </a>
          </nav>

          <div className="mt-10 rounded-[6px] border border-[rgba(255,244,232,0.1)] bg-[rgba(255,244,232,0.05)] p-4">
            <p className="text-sm font-bold">Panel mantığı</p>
            <p className="mt-2 text-sm leading-6 text-[rgba(247,240,232,0.68)]">
              Rapor bu panelin içindeki bir kaynak. Müşteri önce workspace'e girer, sonra raporu görür veya indirir.
            </p>
          </div>
        </aside>

        <main className="px-6 py-8 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-6xl">
            <header className="flex flex-col gap-4 border-b border-[var(--line-soft)] pb-8 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="eyebrow-plain">Customer workspace</span>
                <h1 className="font-display text-5xl font-semibold leading-[0.96] tracking-[-0.045em]">
                  Müşteri paneli
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-body)]">
                  Raporlar, yüklemeler, teslim ayarları ve erişim tokenları aynı workspace içinde yönetilir.
                </p>
              </div>
              <div className="rounded-[6px] border border-[var(--line-soft)] bg-[rgba(251,246,239,0.82)] p-4 text-sm shadow-[var(--shadow-soft)]">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">Current view</p>
                <p className="mt-1 font-bold">{sectionTitle(section)}</p>
              </div>
            </header>

            {section === 'overview' ? <Overview orgId={orgId} activeReport={activeReport} /> : null}
            {section === 'reports' ? <Reports orgId={orgId} activeReport={activeReport} /> : null}
            {section === 'uploads' ? <Uploads /> : null}
            {section === 'settings' ? <Settings /> : null}
            {section === 'access' ? <Access /> : null}
          </div>
        </main>
      </div>
    </div>
  )
}

function Overview({ orgId, activeReport }: { orgId: string; activeReport: (typeof reports)[number] }) {
  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.78fr]">
      <div className="panel-strong rounded-[6px] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="eyebrow-plain">Son rapor</span>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.035em]">{activeReport.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--text-body)]">{activeReport.summary}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a className="btn-primary" href={`/app/o/${orgId}/reports/${activeReport.id}`}>Raporu aç</a>
            <button className="btn-ghost" type="button">PDF indir</button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[6px] border border-[var(--line-soft)]">
          {decisionRows.map((row) => (
            <div key={row.title} className="grid gap-3 border-b border-[var(--line-soft)] bg-[rgba(251,246,239,0.62)] p-4 last:border-b-0 lg:grid-cols-[1.2fr_0.55fr_0.65fr] lg:items-center">
              <div>
                <p className="font-bold tracking-[-0.01em]">{row.title}</p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{row.source}</p>
              </div>
              <p className="text-sm font-semibold text-[var(--text-body)]">{row.owner}</p>
              <span className="rounded-full border border-[var(--line-soft)] bg-[rgba(255,255,255,0.38)] px-3 py-1 text-xs font-bold uppercase tracking-[0.11em] text-[var(--accent)]">
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5">
        <Panel title="Hızlı durum">
          <StatusRow label="Hazır rapor" value="1" />
          <StatusRow label="Bekleyen rapor" value="1" />
          <StatusRow label="Aktif token" value="1" />
          <StatusRow label="Retention" value="30 gün" />
        </Panel>
        <Panel dark title="Sıradaki aksiyon">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em]">Doğrulama bekleyen maddeyi ekibinize atayın.</h2>
          <p className="mt-3 text-sm leading-6 text-[rgba(247,240,232,0.7)]">
            Ekip lideri rolü geldiğinde bu karttan sahip atama, çelişki çözme ve doğrulama isteği çıkacak.
          </p>
        </Panel>
      </div>
    </section>
  )
}

function Reports({ orgId, activeReport }: { orgId: string; activeReport: (typeof reports)[number] }) {
  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-[0.72fr_1fr]">
      <div className="panel rounded-[6px] p-5">
        <span className="eyebrow-plain">Rapor listesi</span>
        <div className="mt-4 grid gap-3">
          {reports.map((report) => (
            <a
              key={report.id}
              href={`/app/o/${orgId}/reports/${report.id}`}
              className={`rounded-[5px] border p-4 transition-colors ${
                report.id === activeReport.id
                  ? 'border-[rgba(161,118,78,0.38)] bg-[rgba(161,118,78,0.1)]'
                  : 'border-[var(--line-soft)] bg-[rgba(251,246,239,0.62)] hover:border-[var(--accent)]'
              }`}
            >
              <p className="font-bold">{report.title}</p>
              <p className="mt-1 text-sm text-[var(--text-body)]">{report.summary}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">{report.status}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="panel-strong rounded-[6px] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="eyebrow-plain">Rapor detayı</span>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.035em]">{activeReport.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--text-body)]">{activeReport.summary}</p>
          </div>
          <span className="rounded-full border border-[var(--line-soft)] bg-[rgba(255,255,255,0.42)] px-3 py-1 text-xs font-bold uppercase tracking-[0.11em] text-[var(--accent)]">
            {activeReport.id}
          </span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <DownloadCard title="HTML view" action="Panelde aç" />
          <DownloadCard title="PDF rapor" action="PDF indir" />
          <DownloadCard title="Kaynak özeti" action="Özet indir" />
        </div>

        <div className="mt-6 grid gap-3 rounded-[6px] border border-[var(--line-soft)] bg-[rgba(44,38,32,0.035)] p-4">
          <StatusRow label="Teslim tarihi" value={activeReport.deliveredAt} />
          <StatusRow label="Maliyet" value={activeReport.cost} />
          <StatusRow label="Ham veri" value="Retention süresine bağlı" />
        </div>
      </div>
    </section>
  )
}

function Uploads() {
  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-2">
      <Panel title="Son yükleme">
        <StatusRow label="Paket" value="35 e-posta, 0.9 MB" />
        <StatusRow label="Durum" value="İşlendi" />
        <StatusRow label="Format" value="Text-only export" />
        <StatusRow label="Ekler" value="İşlenmedi" />
      </Panel>
      <Panel title="Yeni yükleme">
        <p className="text-sm leading-6 text-[var(--text-body)]">
          V0 içinde müşteri yükleme alanı ops onaylı çalışır. Dosya yüklendiğinde preflight yapılır; API çağrısı admin onayı olmadan başlamaz.
        </p>
        <button className="btn-primary mt-5" type="button">Dosya seç</button>
      </Panel>
    </section>
  )
}

function Settings() {
  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
      <Panel title="Panel ayarları">
        {settings.map(([label, value]) => (
          <StatusRow key={label} label={label} value={value} />
        ))}
      </Panel>
      <Panel title="Bildirimler">
        <p className="text-sm leading-6 text-[var(--text-body)]">
          Rapor hazır olduğunda e-posta sadece güvenli link gönderir. PDF varsayılan olarak mailbox'a attachment olarak eklenmez.
        </p>
      </Panel>
    </section>
  )
}

function Access() {
  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-2">
      <Panel title="Erişim tokenı">
        <StatusRow label="Aktif token" value="rep_demo_001 · ****-2K7M" />
        <StatusRow label="Son kullanım" value="Bugün 14:20" />
        <StatusRow label="Yenileme" value="Ops onayı gerekir" />
        <button className="btn-ghost mt-5" type="button">Token yenileme iste</button>
      </Panel>
      <Panel dark title="Güvenlik notu">
        <p className="text-sm leading-6 text-[rgba(247,240,232,0.72)]">
          E-posta hesabı ele geçirilse bile rapor tokenı olmadan workspace açılmaz. Hassas müşterilerde token ayrı kanaldan verilir.
        </p>
      </Panel>
    </section>
  )
}

function WorkspaceLink({ active, href, label }: { active: boolean; href: string; label: string }) {
  return (
    <a
      className={`rounded-[4px] px-3 py-2 ${
        active
          ? 'bg-[rgba(255,244,232,0.1)] font-semibold text-[#f7f0e8]'
          : 'text-[rgba(247,240,232,0.68)] hover:bg-[rgba(255,244,232,0.08)]'
      }`}
      href={href}
    >
      {label}
    </a>
  )
}

function Panel({ title, children, dark = false }: { title: string; children: ReactNode; dark?: boolean }) {
  if (dark) {
    return (
      <div className="panel-dark rounded-[6px] p-5 text-[#f7f0e8]">
        <span className="eyebrow-invert">{title}</span>
        {children}
      </div>
    )
  }

  return (
    <div className="panel rounded-[6px] p-5">
      <span className="eyebrow-plain">{title}</span>
      <div className="mt-4 grid gap-3">{children}</div>
    </div>
  )
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[var(--line-soft)] pb-3 last:border-b-0 last:pb-0">
      <p className="text-sm font-bold">{label}</p>
      <p className="max-w-[13rem] text-right text-sm leading-6 text-[var(--text-body)]">{value}</p>
    </div>
  )
}

function DownloadCard({ title, action }: { title: string; action: string }) {
  return (
    <div className="rounded-[5px] border border-[var(--line-soft)] bg-[rgba(251,246,239,0.7)] p-4">
      <p className="text-sm font-bold">{title}</p>
      <button className="mt-4 rounded-[3px] border border-[var(--line-soft)] px-3 py-2 text-xs font-bold uppercase tracking-[0.11em] text-[var(--accent)] hover:border-[var(--accent)]" type="button">
        {action}
      </button>
    </div>
  )
}
