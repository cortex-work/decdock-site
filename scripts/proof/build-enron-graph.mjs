import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const TEMPLATE = resolve(ROOT, 'public/karar-grafi/index.html')

const SOURCE_TOPIC = {
  var: 'var',
  limit: 'limit',
  dpr: 'dpr',
  dash: 'dash',
  reg: 'reg',
  credit: 'credit',
  people: 'people',
  ops: 'ops',
}

const BASE_TOPICS = [
  { id: 'var', x: 0.24, y: 0.24 },
  { id: 'limit', x: 0.50, y: 0.18 },
  { id: 'dpr', x: 0.76, y: 0.25 },
  { id: 'dash', x: 0.73, y: 0.52 },
  { id: 'reg', x: 0.52, y: 0.78 },
  { id: 'credit', x: 0.25, y: 0.72 },
  { id: 'people', x: 0.18, y: 0.48 },
  { id: 'ops', x: 0.50, y: 0.49 },
]

const TOPIC_PALETTE = {
  var: '#8fb0d6',
  limit: '#d0a05f',
  dpr: '#86b6ad',
  dash: '#cf8679',
  reg: '#8faa84',
  credit: '#b98fa8',
  people: '#bba178',
  ops: '#9c8b7a',
}

const CONFIGS = [
  {
    lang: 'tr',
    dataFile: resolve(ROOT, 'scripts/proof/enron-data.js'),
    outFile: resolve(ROOT, 'public/enron-grafi/index.html'),
    canonical: 'https://decdock.com/enron-grafi/',
    title: 'Enron karar ağı — gerçek koşu | Decdock',
    description: '',
    ogTitle: 'Enron karar ağı — gerçek koşu | Decdock',
    tag: 'Enron / FERC · gerçek koşu',
    h1: 'Enron karar ağı — gerçek koşu',
    proofHref: '/enron-kanit/',
    proofLabel: 'Kayıt listesi: Enron kanıtı →',
    sampleHref: '/karar-grafi/',
    sampleLabel: 'Temsili örnek →',
    dek: '',
    searchPlaceholder: 'VaR, DPR, DASH, $1M, MSA veya kişi ara...',
    tryLabel: 'Deneyin',
    tryChips: ['VaR', 'DPR', 'DASH', '$1M'],
    countText: (nodes, edges) => `${nodes} kayıt · ${edges} bağlantı`,
    filters: ['Görünüm', 'Tümü', 'Onaylı ağ', 'Politika ağı', 'Drift / aday'],
    controlsTitle: 'Graph controls',
    scopeLabel: 'Kapsam',
    scope: ['Global', 'Risk', 'Local'],
    groupLabel: 'Grupla / boya',
    group: ['Durum', 'Konu'],
    timeLabel: 'Zaman çizgisi',
    zoomLabel: 'Yakınlık',
    queryHelp:
      'Örnek sorgu: <code>owner:Rick</code> <code>status:aday</code> <code>type:policy</code> <code>topic:var</code><br>Graph üstünde scroll = zoom, boş alanı sürükle = pan.',
    pathLabel: 'Yol bul',
    pathButton: 'Zinciri göster',
    pathHint: 'İki kayıt seç, Decdock aradaki kaynak/drift zincirini göstersin.',
    legend: {
      type: 'Tür',
      decision: 'Karar',
      policy: 'Politika',
      status: 'Durum',
      approved: 'Onaylı',
      candidate: 'Aday',
      ownerless: 'Sahipsiz',
      stale: 'Bayat/geri-alınmış',
      relation: 'İlişki',
      depends: 'dayanıyor',
      references: 'referans',
      complies: 'uyuyor',
      violates: 'İHLAL',
      conflicts: 'çeliştiriyor',
      supersedes: 'geri aldı',
      sameSource: 'aynı kaynak',
    },
    foot:
      'Enron kamuya açık FERC e-posta arşivi · gerçek Decdock koşusu · kaynaklı aday sinyal, hüküm değil · © 2026 Decdock',
    topics: {
      var: 'Risk / VaR',
      limit: 'Trading limitleri',
      dpr: 'DPR & kayıp',
      dash: 'DASH',
      reg: 'Regülasyon',
      credit: 'Kredi / counterparty',
      people: 'İK / haklar',
      ops: 'Operasyon',
    },
    sameSourceWhy: 'Aynı kaynak thread içinde; semantik karar ilişkisi değil.',
    rel: {
      depends_on: { out: ['→', 'dayanıyor', ''], in: ['←', 'dayanak oldu', ''] },
      references: { out: ['→', 'atıf veriyor', ''], in: ['←', 'atıf alıyor', ''] },
      same_source: { out: ['↔', 'aynı kaynak', ''], in: ['↔', 'aynı kaynak', ''] },
      supersedes: { out: ['→', 'geri aldı', ''], in: ['←', 'geri alındı', ''] },
      conflicts: { out: ['↔', 'çelişiyor', 'danger'], in: ['↔', 'çelişiyor', 'danger'] },
      complies_with: { out: ['✓', 'uyuyor', 'ok'], in: ['←', 'uyan karar', 'ok'] },
      violates: { out: ['⚠', 'ihlal ediyor', 'danger'], in: ['⚠', 'ihlal eden', 'danger fill'] },
    },
    statusText: {
      ratified: 'Onaylı',
      candidate: 'Aday — insan doğrular',
      ownerless: 'Sahipsiz',
      stale: 'Bayat / geri-alınmış',
    },
    topicCardSuffix: (nodes, issues, policies) => `${nodes} kayıt · ${issues} drift/adayı · ${policies} politika`,
    pathDefaults: ['rec-0120', 'rec-0070'],
    allText: 'Tümü',
    dateFallback: 'Tarih',
    panel: {
      connections: 'Bağlantılar · zaman çizgisi',
      owner: 'Sahip',
      date: 'Tarih',
      source: 'Kaynak',
      kindPolicy: 'Politika',
      kindDecision: 'Karar',
      back: '↩ geldiğin:',
      close: '×',
      candidateCta:
        'Bu bir <b>aday sinyal</b>: kaynakta güçlü bir karar dili var ama insan doğrulaması gerekir. Decdock burada hüküm vermez.',
      policyCta:
        'Bu bir <b>politika/kural</b>. Gerçek drift kenarları yalnızca kaynakta açıkça görünen çelişki veya supersede ilişkileridir.',
      defaultCta:
        'Bu kayıt kaynağa bağlıdır. Ağdaki kırmızı kenarlar çelişki/supersede sinyali; ince gri kenarlar yalnızca aynı kaynak thread bilgisidir.',
    },
  },
  {
    lang: 'en',
    dataFile: resolve(ROOT, 'scripts/proof/en-data.js'),
    outFile: resolve(ROOT, 'public/enron-graph/index.html'),
    canonical: 'https://decdock.com/enron-graph/',
    title: 'Enron decision graph — real run | Decdock',
    description: '',
    ogTitle: 'Enron decision graph — real run | Decdock',
    tag: 'Enron / FERC · real run',
    h1: 'Enron decision graph — real run',
    proofHref: '/enron-proof/',
    proofLabel: 'Record list: Enron proof →',
    sampleHref: '/karar-grafi/',
    sampleLabel: 'Synthetic example →',
    dek: '',
    searchPlaceholder: 'Search VaR, DPR, DASH, $1M, MSA, or a person...',
    tryLabel: 'Try',
    tryChips: ['VaR', 'DPR', 'DASH', '$1M'],
    countText: (nodes, edges) => `${nodes} records · ${edges} links`,
    filters: ['View', 'All', 'Approved graph', 'Policy graph', 'Drift / candidates'],
    controlsTitle: 'Graph controls',
    scopeLabel: 'Scope',
    scope: ['Global', 'Risk', 'Local'],
    groupLabel: 'Group / color',
    group: ['Status', 'Topic'],
    timeLabel: 'Timeline',
    zoomLabel: 'Zoom',
    queryHelp:
      'Example query: <code>owner:Rick</code> <code>status:candidate</code> <code>type:policy</code> <code>topic:var</code><br>Scroll over graph = zoom, drag empty space = pan.',
    pathLabel: 'Find path',
    pathButton: 'Show chain',
    pathHint: 'Choose two records; Decdock will show the source/drift chain between them.',
    legend: {
      type: 'Type',
      decision: 'Decision',
      policy: 'Policy',
      status: 'Status',
      approved: 'Approved',
      candidate: 'Candidate',
      ownerless: 'Ownerless',
      stale: 'Stale/superseded',
      relation: 'Relation',
      depends: 'depends',
      references: 'references',
      complies: 'complies',
      violates: 'VIOLATES',
      conflicts: 'conflicts',
      supersedes: 'supersedes',
      sameSource: 'same source',
    },
    foot:
      'Public Enron/FERC email archive · real Decdock run · sourced candidate signal, not a verdict · © 2026 Decdock',
    topics: {
      var: 'Risk / VaR',
      limit: 'Trading limits',
      dpr: 'DPR & loss',
      dash: 'DASH',
      reg: 'Regulation',
      credit: 'Credit / counterparty',
      people: 'HR / benefits',
      ops: 'Operations',
    },
    sameSourceWhy: 'Same source thread; not a semantic decision relationship.',
    rel: {
      depends_on: { out: ['→', 'depends on', ''], in: ['←', 'supports', ''] },
      references: { out: ['→', 'references', ''], in: ['←', 'referenced by', ''] },
      same_source: { out: ['↔', 'same source', ''], in: ['↔', 'same source', ''] },
      supersedes: { out: ['→', 'supersedes', ''], in: ['←', 'superseded by', ''] },
      conflicts: { out: ['↔', 'conflicts', 'danger'], in: ['↔', 'conflicts', 'danger'] },
      complies_with: { out: ['✓', 'complies with', 'ok'], in: ['←', 'compliant record', 'ok'] },
      violates: { out: ['⚠', 'violates', 'danger'], in: ['⚠', 'violating record', 'danger fill'] },
    },
    statusText: {
      ratified: 'Approved',
      candidate: 'Candidate — human verifies',
      ownerless: 'Ownerless',
      stale: 'Stale / superseded',
    },
    topicCardSuffix: (nodes, issues, policies) => `${nodes} records · ${issues} drift/candidates · ${policies} policies`,
    pathDefaults: ['rec-0120', 'rec-0070'],
    allText: 'All',
    dateFallback: 'Date',
    panel: {
      connections: 'Connections · timeline',
      owner: 'Owner',
      date: 'Date',
      source: 'Source',
      kindPolicy: 'Policy',
      kindDecision: 'Decision',
      back: '↩ from:',
      close: '×',
      candidateCta:
        'This is a <b>candidate signal</b>: the source has decision-like language, but a human still verifies it. Decdock does not declare a verdict here.',
      policyCta:
        'This is a <b>policy/rule</b>. Real drift edges appear only where the source explicitly shows a conflict or supersession.',
      defaultCta:
        'This record is source-bound. Red edges are conflict/supersession signals; thin grey edges mean same source thread only.',
    },
  },
]

function loadData(file) {
  const source = readFileSync(file, 'utf8')
  return vm.runInNewContext(`${source}\n;({ META, SOURCES, DATA })`, {})
}

function metaFor(meta, records) {
  return {
    rawRecords: meta?.rawRecords ?? records.length,
    rawSupersedes: meta?.rawSupersedes ?? records.filter((record) => record.relType === 'supersedes').length,
    keptSupersedes: meta?.keptSupersedes ?? records.filter((record) => record.relType === 'supersedes').length,
    keptConflicts: meta?.keptConflicts ?? records.filter((record) => record.relType === 'conflicts').length,
    driftEdges: meta?.driftEdges ?? records.filter((record) => record.chainTo !== undefined).length,
    curatedRecords: meta?.curatedRecords ?? records.length,
  }
}

function descriptionFor(lang, meta) {
  return lang === 'tr'
    ? `Decdock'un Enron/FERC kamuya açık arşivi üzerinde ürettiği gerçek karar ağı: ${meta.curatedRecords} kaynaklı kayıt, ${meta.keptConflicts} çelişki ve ${meta.keptSupersedes} gerçek supersede.`
    : `A real Decdock decision graph over the public Enron/FERC archive: ${meta.curatedRecords} sourced records, ${meta.keptConflicts} conflicts, and ${meta.keptSupersedes} real supersedes.`
}

function dekFor(lang, meta) {
  if (lang === 'tr') {
    return `Bu <b>temsili değil</b>: Enron/FERC kamuya açık arşivinden gerçek bir Decdock koşusu. ${meta.rawRecords} konsolide kayıt içinden ${meta.curatedRecords} kaynaklı kayıt ve ${meta.driftEdges} sağlam drift edge gösteriliyor. ${meta.rawSupersedes} aday supersede'den yalnız ${meta.keptSupersedes}'si gerçek tarih-farkı testini geçti; aynı-tarihli/sistem-işaretli çiftleri sahte edge olarak göstermiyoruz. İnce gri bağlar yalnızca <b>aynı kaynak thread</b> bağını gösterir; semantik karar ilişkisi değildir.`
  }
  return `This is <b>not synthetic</b>: a real Decdock run over the public Enron/FERC archive. From ${meta.rawRecords} consolidated records, this graph shows ${meta.curatedRecords} sourced records and ${meta.driftEdges} solid drift edges. Of ${meta.rawSupersedes} candidate supersedes, only ${meta.keptSupersedes} passed the real date-gap test; same-date/system-flagged pairs are not shown as fake edges. Thin grey links mean <b>same source thread</b> only; they are not semantic decision relationships.`
}

function graphData(records, config) {
  const nodes = records.map((record) => ({
    id: record.id,
    kind: record.kind === 'politika' ? 'policy' : 'decision',
    label: record.d,
    status: record.st === 'onayli' ? 'ratified' : 'candidate',
    owner: record.o ?? null,
    date: record.date,
    quote: record.hl,
    sk: record.sk,
  }))

  const edges = []
  const pairKeys = new Set()
  const addEdge = (edge) => {
    const key = [edge.from, edge.to].sort().join('|')
    if (pairKeys.has(key) && edge.type === 'same_source') return
    pairKeys.add(key)
    edges.push(edge)
  }

  for (const record of records) {
    if (record.chainTo && record.relType) {
      addEdge({ from: record.id, to: record.chainTo, type: record.relType, why: record.chainLabel ?? '' })
    }
    if (record.violates) {
      addEdge({ from: record.id, to: record.violates, type: 'violates', why: record.violationLabel ?? '' })
    }
  }

  const bySource = new Map()
  for (const record of records) {
    const list = bySource.get(record.sk) ?? []
    list.push(record)
    bySource.set(record.sk, list)
  }
  for (const group of bySource.values()) {
    group.sort((a, b) => String(a.date).localeCompare(String(b.date)) || records.indexOf(a) - records.indexOf(b))
    for (let i = 1; i < group.length; i += 1) {
      addEdge({ from: group[i].id, to: group[i - 1].id, type: 'same_source', why: config.sameSourceWhy })
    }
  }

  return { nodes, edges }
}

function replaceOrThrow(html, from, to) {
  if (!html.includes(from)) throw new Error(`replace anchor not found: ${from.slice(0, 90)}`)
  return html.replace(from, to)
}

function replaceRegexOrThrow(html, pattern, to) {
  if (!pattern.test(html)) throw new Error(`regex anchor not found: ${pattern}`)
  return html.replace(pattern, to)
}

function jsConst(name, value) {
  return `const ${name}=${JSON.stringify(value, null, 2)};`
}

function topicCode(config) {
  const topics = BASE_TOPICS.map((topic) => ({ ...topic, label: config.topics[topic.id] }))
  return `const TOPICS=${JSON.stringify(topics, null, 2)};
  const topicById=Object.fromEntries(TOPICS.map(t=>[t.id,t]));
  const SOURCE_TOPIC=${JSON.stringify(SOURCE_TOPIC, null, 2)};
  function topicFor(n){
    return SOURCE_TOPIC[n.sk]||'ops';
  }
  NODES.forEach(n=>{ n.topic=topicFor(n); });`
}

function legendHtml(config) {
  const l = config.legend
  return `<div class="legend" id="legend">
    <div class="lg"><span class="lab">${l.type}</span>
      <span class="row"><span class="dot" style="background:var(--body)"></span> ${l.decision}</span>
      <span class="row"><span class="sq" style="background:var(--body)"></span> ${l.policy}</span></div>
    <div class="lg"><span class="lab">${l.status}</span>
      <span class="row"><span class="dot" style="background:var(--success)"></span> ${l.approved}</span>
      <span class="row"><span class="dot" style="background:var(--accent)"></span> ${l.candidate}</span>
      <span class="row"><span class="dot" style="background:var(--pane);border:2px solid var(--warning)"></span> ${l.ownerless}</span>
      <span class="row"><span class="dot" style="background:#bcab9c"></span> ${l.stale}</span></div>
    <div class="lg"><span class="lab">${l.relation}</span>
      <span class="row"><svg class="ek" height="6" width="18"><line x1="0" y1="3" x2="18" y2="3" stroke="var(--accent)" stroke-width="2"/></svg> ${l.depends}</span>
      <span class="row"><svg class="ek" height="6" width="18"><line x1="0" y1="3" x2="18" y2="3" stroke="var(--muted)" stroke-width="2" stroke-dasharray="2 3"/></svg> ${l.references}</span>
      <span class="row"><svg class="ek" height="6" width="18"><line x1="0" y1="3" x2="18" y2="3" stroke="var(--success)" stroke-width="2" stroke-dasharray="1 4"/></svg> ${l.complies}</span>
      <span class="row"><svg class="ek" height="6" width="18"><line x1="0" y1="3" x2="18" y2="3" stroke="var(--danger)" stroke-width="2.6"/></svg> <b style="color:var(--danger)">${l.violates}</b></span>
      <span class="row"><svg class="ek" height="6" width="18"><line x1="0" y1="3" x2="18" y2="3" stroke="var(--danger)" stroke-width="2" stroke-dasharray="5 3"/></svg> ${l.conflicts}</span>
      <span class="row"><svg class="ek" height="6" width="18"><line x1="0" y1="3" x2="18" y2="3" stroke="var(--danger)" stroke-width="2.4"/></svg> ${l.supersedes}</span>
      <span class="row"><svg class="ek" height="6" width="18"><line x1="0" y1="3" x2="18" y2="3" stroke="#8d8172" stroke-width="1.6" stroke-dasharray="1 5"/></svg> ${l.sameSource}</span></div>
  </div>`
}

function generate(config) {
  const { META, DATA } = loadData(config.dataFile)
  const meta = metaFor(META, DATA)
  const description = descriptionFor(config.lang, meta)
  const dek = dekFor(config.lang, meta)
  const { nodes, edges } = graphData(DATA, config)
  let html = readFileSync(TEMPLATE, 'utf8')

  html = replaceRegexOrThrow(html, /<html lang="[^"]+">/, `<html lang="${config.lang}">`)
  html = replaceRegexOrThrow(html, /<title>[\s\S]*?<\/title>/, `<title>${config.title}</title>`)
  html = replaceRegexOrThrow(
    html,
    /<meta name="description" content="[\s\S]*?" \/>/,
    `<meta name="description" content="${description}" />`,
  )
  html = replaceRegexOrThrow(
    html,
    /<link rel="canonical" href="[\s\S]*?" \/>/,
    `<link rel="canonical" href="${config.canonical}" />
<link rel="alternate" hreflang="tr" href="https://decdock.com/enron-grafi/" />
<link rel="alternate" hreflang="en" href="https://decdock.com/enron-graph/" />
<link rel="alternate" hreflang="x-default" href="https://decdock.com/enron-graph/" />`,
  )
  html = replaceRegexOrThrow(html, /<meta property="og:title" content="[\s\S]*?" \/>/, `<meta property="og:title" content="${config.ogTitle}" />`)
  html = replaceRegexOrThrow(html, /<meta property="og:description" content="[\s\S]*?" \/>/, `<meta property="og:description" content="${description}" />`)
  html = replaceRegexOrThrow(html, /<meta property="og:url" content="[\s\S]*?" \/>/, `<meta property="og:url" content="${config.canonical}" />`)

  html = replaceOrThrow(
    html,
    `.proof-link:hover{border-color:rgba(92,117,96,.48);background:rgba(92,117,96,.14);}`,
    `.proof-link:hover{border-color:rgba(92,117,96,.48);background:rgba(92,117,96,.14);}
  .proof-links{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;}`,
  )
  html = replaceOrThrow(
    html,
    `.edge.references{stroke:var(--muted);stroke-dasharray:2 4;}`,
    `.edge.references{stroke:var(--muted);stroke-dasharray:2 4;}
  .edge.same_source{stroke:#8d8172;stroke-dasharray:1 6;stroke-width:var(--edge-width,1.15px);opacity:var(--edge-opacity,.24);}`,
  )

  html = replaceRegexOrThrow(
    html,
    /<span class="demo-tag">[\s\S]*?<\/span>\s*<\/div>\s*<h1>[\s\S]*?<\/h1>\s*<a class="proof-link"[\s\S]*?<\/a>\s*<p class="dek">[\s\S]*?<\/p>/,
    `<span class="demo-tag">${config.tag}</span>
  </div>
  <h1>${config.h1}</h1>
  <div class="proof-links">
    <a class="proof-link" href="${config.proofHref}">${config.proofLabel}</a>
    <a class="proof-link" href="${config.sampleHref}">${config.sampleLabel}</a>
  </div>
  <p class="dek">${dek}</p>`,
  )

  html = replaceRegexOrThrow(
    html,
    /<input id="graph-search" type="search"[^>]*placeholder="[^"]+"[^>]*\/>/,
    `<input id="graph-search" type="search" autocomplete="off" spellcheck="false" placeholder="${config.searchPlaceholder}" aria-label="Enron graph search" />`,
  )
  html = replaceRegexOrThrow(
    html,
    /<div class="search-examples"[\s\S]*?<\/div>\s*<\/div>\s*<div class="search-count"/,
    `<div class="search-examples" aria-label="Example searches">
        <span>${config.tryLabel}</span>
        ${config.tryChips.map((chip) => `<button class="try-chip" type="button" data-q="${chip}">${chip}</button>`).join('\n        ')}
      </div>
    </div>
    <div class="search-count"`,
  )
  html = replaceRegexOrThrow(
    html,
    /<div class="search-count" id="search-count">[\s\S]*?<\/div>/,
    `<div class="search-count" id="search-count">${config.countText(nodes.length, edges.length)}</div>`,
  )
  html = replaceRegexOrThrow(
    html,
    /<div class="filters" id="filters">[\s\S]*?<\/div>\s*<div class="stage">/,
    `<div class="filters" id="filters">
    <span class="fl">${config.filters[0]}</span>
    <button class="chip on" data-f="all">${config.filters[1]}</button>
    <button class="chip" data-f="ratified">${config.filters[2]}</button>
    <button class="chip" data-f="policy">${config.filters[3]}</button>
    <button class="chip" data-f="issues">${config.filters[4]}</button>
  </div>

  <div class="stage">`,
  )
  html = replaceRegexOrThrow(html, /<div class="gp-title">[\s\S]*?<\/div>/, `<div class="gp-title">${config.controlsTitle} <span class="gp-scale">source-first</span></div>`)
  html = replaceRegexOrThrow(html, /<div class="ctrl-label">Kapsam<\/div>/, `<div class="ctrl-label">${config.scopeLabel}</div>`)
  html = html.replace(/<button class="on" type="button" data-scope="global">Global<\/button>/, `<button class="on" type="button" data-scope="global">${config.scope[0]}</button>`)
  html = html.replace(/<button type="button" data-scope="risk">Risk<\/button>/, `<button type="button" data-scope="risk">${config.scope[1]}</button>`)
  html = html.replace(/<button type="button" data-scope="local">Local<\/button>/, `<button type="button" data-scope="local">${config.scope[2]}</button>`)
  html = replaceRegexOrThrow(html, /<div class="ctrl-label">Grupla \/ boya<\/div>/, `<div class="ctrl-label">${config.groupLabel}</div>`)
  html = html.replace(/<button class="on" type="button" data-group="status">Durum<\/button>/, `<button class="on" type="button" data-group="status">${config.group[0]}</button>`)
  html = html.replace(/<button type="button" data-group="topic">Konu<\/button>/, `<button type="button" data-group="topic">${config.group[1]}</button>`)
  html = replaceRegexOrThrow(html, /<label for="time-range">[\s\S]*?<\/label>/, `<label for="time-range">${config.timeLabel}</label>`)
  html = replaceRegexOrThrow(html, /<div class="ctrl-label">Yak[\s\S]*?<\/div>\s*<div class="zoom-row">/, `<div class="ctrl-label">${config.zoomLabel}</div>
        <div class="zoom-row">`)
  html = replaceRegexOrThrow(html, /<div class="query-help">[\s\S]*?<\/div>/, `<div class="query-help">${config.queryHelp}</div>`)
  html = replaceRegexOrThrow(
    html,
    /<div class="pathbar"[\s\S]*?<\/div>\s*<\/div>\s*<div class="legend" id="legend">[\s\S]*?<\/div>\s*<p class="foot">[\s\S]*?<\/p>/,
    `<div class="pathbar" aria-label="Path finder">
      <label>${config.pathLabel}</label>
      <select id="path-from" aria-label="Start record"></select>
      <select id="path-to" aria-label="Target record"></select>
      <button class="mini-btn" type="button" id="path-run">${config.pathButton}</button>
      <div class="path-result" id="path-result">${config.pathHint}</div>
    </div>
  </div>
  ${legendHtml(config)}
  <p class="foot">${config.foot}</p>`,
  )

  if (config.lang === 'en') {
    html = html
      .replace('aria-label="Graf araması"', 'aria-label="Graph search"')
      .replace('aria-label="Aramayı temizle"', 'aria-label="Clear search"')
      .replace('aria-label="Karar ve politika grafı"', 'aria-label="Decision and policy graph"')
      .replace('<div class="hint">Ara · odaklan · bağlantıyı aç</div>', '<div class="hint">Search · focus · open links</div>')
      .replace('aria-label="Konu özetleri"', 'aria-label="Topic summaries"')
      .replace('<output class="range-out" id="time-out">Tümü</output>', '<output class="range-out" id="time-out">All</output>')
      .replace('<button class="mini-btn" type="button" id="zoom-reset">Sıfırla</button>', '<button class="mini-btn" type="button" id="zoom-reset">Reset</button>')
  }

  html = replaceRegexOrThrow(
    html,
    /  const NODES = \[[\s\S]*?\n  const byId =/,
    `  ${jsConst('NODES', nodes)}

  ${jsConst('EDGES', edges)}

  const byId =`,
  )
  html = replaceRegexOrThrow(
    html,
    /  const polConnected=new Set\(\); const violNodes=new Set\(\);[\s\S]*?if\(e\.type==='violates'\)\{violNodes\.add\(e\.from\);violNodes\.add\(e\.to\);\} \}\);/,
    `  const polConnected=new Set(); const violNodes=new Set(); const driftNodes=new Set();
  EDGES.forEach(e=>{ if(byId[e.from].kind==='policy'){polConnected.add(e.to);} if(byId[e.to].kind==='policy'){polConnected.add(e.from);}
    if(e.type==='violates'){violNodes.add(e.from);violNodes.add(e.to);}
    if(e.type==='conflicts'||e.type==='supersedes'){driftNodes.add(e.from);driftNodes.add(e.to);} });`,
  )
  html = replaceRegexOrThrow(
    html,
    /function dateKey\(date\)\{[\s\S]*?\n  \}/,
    `function dateKey(date){
    const s=String(date||'').trim();
    const iso=s.match(/^(\\d{4})-(\\d{2})-(\\d{2})$/);
    if(iso) return Number(iso[1])*372+Number(iso[2])*31+Number(iso[3]);
    const parts=s.split(/\\s+/);
    const day=Number(parts[0])||1;
    const month=MONTHS[parts[1]]||1;
    return month*31+day;
  }`,
  )
  html = replaceRegexOrThrow(
    html,
    /const TOPICS=\[[\s\S]*?\n  NODES\.forEach\(n=>\{ n\.topic=topicFor\(n\); \}\);/,
    topicCode(config),
  )
  html = replaceRegexOrThrow(
    html,
    /const topicPalette=\{[\s\S]*?\};/,
    `const topicPalette=${JSON.stringify(TOPIC_PALETTE)};`,
  )
  html = replaceRegexOrThrow(html, /const REL=\{[\s\S]*?\n  \};/, `const REL=${JSON.stringify(config.rel, null, 4)};`)
  html = replaceRegexOrThrow(html, /const ST=\{[\s\S]*?\};/, `const ST=${JSON.stringify(config.statusText)};`)
  html = html.replace(
    "n.topic,violNodes.has(n.id)?'ihlal violates sorun':'',polConnected.has(n.id)?'politika policy':''].join(' ')",
    "n.topic,driftNodes.has(n.id)?'drift conflict supersede':'',violNodes.has(n.id)?'ihlal violates sorun':'',polConnected.has(n.id)?'politika policy':''].join(' ')",
  )
  html = replaceRegexOrThrow(
    html,
    /function riskSet\(\)\{[\s\S]*?\n  \}/,
    `function riskSet(){
    const seeds=new Set();
    NODES.forEach(n=>{ if(n.status!=='ratified'||violNodes.has(n.id)||driftNodes.has(n.id)) seeds.add(n.id); });
    return expandFrom(seeds,1);
  }`,
  )
  const topicSummary =
    config.lang === 'tr'
      ? "nodes.length+' kayıt · '+issues+' drift/adayı · '+policies+' politika'"
      : "nodes.length+' records · '+issues+' drift/candidates · '+policies+' policies'"
  html = replaceRegexOrThrow(
    html,
    /function renderTopicCards\(\)\{[\s\S]*?\n  function syncControls\(\)\{/,
    `function renderTopicCards(){
    topicCards.innerHTML=TOPICS.map(t=>{
      const nodes=NODES.filter(n=>n.topic===t.id&&dateAllowed(n));
      const issues=nodes.filter(n=>n.status!=='ratified'||violNodes.has(n.id)||driftNodes.has(n.id)).length;
      const policies=nodes.filter(n=>n.kind==='policy').length;
      return '<button class="topic-card" type="button" data-topic="'+t.id+'"><b>'+ESC(t.label)+'</b><span>'+${topicSummary}+'</span></button>';
    }).join('');
    topicCards.querySelectorAll('[data-topic]').forEach(btn=>btn.onclick=()=>{
      searchInput.value='topic:'+btn.dataset.topic;
      searchQuery=searchInput.value;
      scopeMode='global'; selected=null; pathNodes.clear(); pathEdges.clear();
      searchClear.classList.add('show');
      applyFilter(curFilter);
      syncControls();
    });
  }
  function syncControls(){`,
  )
  html = replaceRegexOrThrow(
    html,
    /pathFrom\.value='[\s\S]*?'; pathTo\.value='[\s\S]*?';/,
    `pathFrom.value='${config.pathDefaults[0]}'; pathTo.value='${config.pathDefaults[1]}';`,
  )
  html = html.replace(
    "timeOut.textContent=timeIndex===dateKeys.length-1?'Tümü':(NODES.find(n=>dateKey(n.date)===dateKeys[timeIndex])?.date||'Tarih');",
    `timeOut.textContent=timeIndex===dateKeys.length-1?'${config.allText}':(NODES.find(n=>dateKey(n.date)===dateKeys[timeIndex])?.date||'${config.dateFallback}');`,
  )
  if (config.lang === 'en') {
    html = html
      .replace("'Sahipsiz'", "'Ownerless'")
      .replace("pathResult.textContent='Hedefi seçip zinciri göster.';", "pathResult.textContent='Choose a target, then show the chain.';")
      .replace("pathResult.textContent='Başlangıcı seçip zinciri göster.';", "pathResult.textContent='Choose a start record, then show the chain.';")
  }
  html = html.replace(
    "else if(name==='issues') filterVisible=n.status!=='ratified' || violNodes.has(n.id);",
    "else if(name==='issues') filterVisible=n.status!=='ratified' || violNodes.has(n.id) || driftNodes.has(n.id);",
  )
  html = replaceRegexOrThrow(
    html,
    /function renderPanel\(id\)\{[\s\S]*?\n  \}/,
    `function renderPanel(id){
    const n=byId[id]; const isPol=n.kind==='policy';
    const prev=navStack.length?byId[navStack[navStack.length-1]]:null;
    pin.innerHTML='<button class="close" id="cl">${config.panel.close}</button>'+
      (prev?'<button class="crumb" id="crumb">${config.panel.back} '+ESC(prev.label)+'</button>':'')+
      '<span class="pill kind">'+(isPol?'${config.panel.kindPolicy}':'${config.panel.kindDecision}')+'</span><span class="pill '+n.status+'">'+ST[n.status]+'</span><h2>'+ESC(n.label)+'</h2>'+
      '<div class="kv"><div class="k">${config.panel.owner}</div><div class="v">'+ESC(n.owner||'—')+'</div></div>'+
      '<div class="kv"><div class="k">${config.panel.date}</div><div class="v">'+ESC(n.date)+'</div></div>'+
      '<div class="kv"><div class="k">${config.panel.source}</div><div class="v" style="font-style:italic;color:var(--body)">'+ESC(n.quote)+'</div></div>'+
      '<div class="sec"><div class="sec-h">${config.panel.connections}</div>'+renderTimeline(id)+'</div>'+
      (n.status==='candidate'? '<div class="cta">${config.panel.candidateCta}</div>':
       isPol? '<div class="cta">${config.panel.policyCta}</div>':
       '<div class="cta">${config.panel.defaultCta}</div>');
    document.getElementById('cl').onclick=close;
    const crumb=document.getElementById('crumb');
    if(crumb) crumb.onclick=()=>{ const prevId=navStack.pop(); if(prevId) open(prevId,{back:true}); };
    pin.querySelectorAll('[data-go]').forEach(el=>el.onclick=()=>open(el.dataset.go,{from:id,edge:el.dataset.edge}));
  }`,
  )

  mkdirSync(dirname(config.outFile), { recursive: true })
  writeFileSync(config.outFile, html, 'utf8')
  console.log(`written ${config.outFile}`)
}

for (const config of CONFIGS) generate(config)
