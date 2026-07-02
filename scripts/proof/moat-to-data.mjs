/**
 * Convert a public Enron Decdock run into the small proof data used by the site.
 *
 * Default mode is reproducible and repo-local:
 *   node scripts/proof/moat-to-data.mjs
 *
 * Refresh mode reads the external full run and rewrites the curated public subset:
 *   node scripts/proof/moat-to-data.mjs --refresh-curated --moat <run2-moat.json>
 *
 * No API/LLM calls. The full run JSON stays outside the repo; only the curated subset is committed.
 */
import { basename, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const DEFAULT_CURATED = resolve(ROOT, 'scripts/proof/enron-moat-curated.json')
const OUT_TR = resolve(ROOT, 'scripts/proof/enron-data.js')
const OUT_EN = resolve(ROOT, 'scripts/proof/en-data.js')
const CAP = 41

const SYSTEM_WHY = /local|heuristic|drift cue|tight-entity/i
const DROP_CONFLICTS = new Set([pairKey('rec-0036', 'rec-0055')])
const DROP_SUPERSEDES = new Set([directedKey('rec-0377', 'rec-0376')])
const OWNER_NAMES = [
  'Rick Buy',
  'John Lavorato',
  'John Sherriff',
  'Greg Whalley',
  'Jeff Skilling',
  'Ken Lay',
  'Richard Causey',
  'Rick Causey',
  'Rob Milnthorp',
  'Pug Winokur',
  'Louise Kitchen',
  'Mark Frevert',
  'Stan Horton',
  'Cliff Baxter',
  'David Port',
  'Ted Murphy',
  'Sally Beck',
  'Mike Jordan',
  'Harry Arora',
  'Raymond Bowen',
  'Michael Tribolet',
  'Larry Campbell',
  'Andrew Fastow',
  'Andy Fastow',
  'Rick Johnson',
  'Wes Colwell',
  'Bill Bradford',
  'David Gorte',
  'Theresa Hess',
  'Thane Twiggs',
  'Mark Haedicke',
]

const TOPIC_TR = {
  var: 'Risk / VaR',
  limit: 'Trading limitleri',
  dpr: 'DPR & kayip bildirimi',
  dash: 'DASH deal onayi',
  people: 'IK / haklar',
  reg: 'Regulasyon',
  credit: 'Counterparty / kredi',
  ops: 'Operasyon',
}

const TOPIC_EN = {
  var: 'Risk / VaR',
  limit: 'Trading limits',
  dpr: 'DPR & loss notification',
  dash: 'DASH deal approval',
  people: 'HR / benefits',
  reg: 'Regulation',
  credit: 'Counterparty / credit',
  ops: 'Operations',
}

function parseArgs(argv) {
  const args = { refreshCurated: false, moat: '', curated: DEFAULT_CURATED }
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--refresh-curated') args.refreshCurated = true
    else if (arg === '--moat') args.moat = resolve(argv[++i] ?? '')
    else if (arg === '--curated') args.curated = resolve(argv[++i] ?? '')
    else throw new Error(`Unknown argument: ${arg}`)
  }
  return args
}

function loadJson(path) {
  return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''))
}

function dateKey(date) {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(date || ''))
  return match ? Number(match[1]) * 372 + Number(match[2]) * 31 + Number(match[3]) : 0
}

function pairKey(a, b) {
  return [a, b].sort().join('|')
}

function directedKey(from, to) {
  return `${from}|${to}`
}

function normalizeText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim()
}

function trim(value, max) {
  const text = normalizeText(value)
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).replace(/[,;:\s]\S*$/, '')}...`
}

function topicOf(item) {
  const text = `${item.kosul || ''} ${item.bilgi || ''} ${item.excerpt || ''} ${item.sourceSubject || ''}`.toLowerCase()
  if (/discretionary var|value at risk|\bvar\b/.test(text)) return 'var'
  if (/ferc|nyiso|nepool|\biso\b|tariff|cpuc|advice letters?|regulat|permit|filing|order|naesb|gisb/.test(text)) return 'reg'
  if (/dpr|position report|loss notification|daily loss|cumulative loss/.test(text)) return 'dpr'
  if (/dash|deal approval|rac\b/.test(text)) return 'dash'
  if (/savings plan|payroll|bonus|severance|hire|hiring|compensation|salary|union employees|employee benefits?|i[şs]e al[ıi]m|maa[şs]|[çc]al[ıi][şs]an haklar[ıi]/.test(text)) return 'people'
  if (/counterparty|isda|master agreement|credit|counterpart|collateral/.test(text)) return 'credit'
  if (/\blimit\b|nop|notional|twh|\$[0-9]/i.test(text)) return 'limit'
  return 'ops'
}

function kindOf(item) {
  return item.type === 'risk_politika' || item.type === 'surec_kurali' ? 'politika' : 'karar'
}

function statusOf(item) {
  return item.confidence === 'high' ? 'onayli' : 'aday'
}

function ownerOf(item) {
  const haystack = `${item.bilgi || ''} ${item.excerpt || ''} ${item.kosul || ''}`
  return OWNER_NAMES.find((name) => haystack.includes(name)) || ''
}

function isNumericHeavyLimit(item, driftIds) {
  if (topicOf(item) !== 'limit' || driftIds.has(item.id)) return false
  const text = normalizeText(`${item.bilgi || ''} ${item.excerpt || ''}`)
  if (!text) return true
  const numericChars = (text.match(/[\d$%./-]/g) || []).length
  const ratio = numericChars / Math.max(1, text.length)
  return ratio > 0.24 && !/approve|approved|onay|policy|procedure|replace|change|revise|effective/i.test(text)
}

function labelFor(item, lang, driftIds) {
  const useCondition = topicOf(item) === 'limit' && (isNumericHeavyLimit(item, driftIds) || /^[\d\s$%.,/-]+$/.test(normalizeText(item.excerpt || '')))
  const source = useCondition ? item.kosul : lang === 'tr' ? item.bilgi : item.excerpt || item.bilgi
  return trim(source || item.kosul || item.excerpt || item.bilgi, 96)
}

function highlightFor(item) {
  return trim(item.excerpt || item.bilgi || item.kosul, 300)
}

function recordScore(item, driftIds) {
  let score = 0
  if (driftIds.has(item.id)) score += 1000
  if (item.confidence === 'high') score += 80
  if (ownerOf(item)) score += 18
  if (kindOf(item) === 'politika') score += 10
  const text = `${item.kosul || ''} ${item.bilgi || ''} ${item.excerpt || ''}`.toLowerCase()
  if (/var|limit|dpr|loss|dash|approval|board|policy|procedure|savings|naesb/.test(text)) score += 8
  if (/effective|approved|onay|replace|revise|changed|threshold/.test(text)) score += 5
  if (isNumericHeavyLimit(item, driftIds)) score -= 120
  return score
}

function sanitizeItem(item) {
  return {
    id: item.id,
    type: item.type,
    kosul: item.kosul,
    bilgi: item.bilgi,
    excerpt: item.excerpt,
    confidence: item.confidence,
    sourceDate: item.sourceDate,
    sourceSubject: item.sourceSubject,
    sourceFile: basename(item.file || ''),
    sk: topicOf(item),
  }
}

function buildCurated(moat) {
  const items = moat.items || []
  const byId = new Map(items.map((item) => [item.id, item]))

  const supersedes = (moat.supersedes || [])
    .filter((edge) => byId.has(edge.newer) && byId.has(edge.older))
    .filter((edge) => dateKey(byId.get(edge.newer).sourceDate) > dateKey(byId.get(edge.older).sourceDate))
    .filter((edge) => !SYSTEM_WHY.test(edge.why || ''))
    .filter((edge) => !DROP_SUPERSEDES.has(directedKey(edge.newer, edge.older)))
    .map((edge) => ({
      from: edge.newer,
      to: edge.older,
      relType: 'supersedes',
      why: edge.why,
      source: 'supersede',
    }))

  const conflicts = (moat.conflicts || [])
    .filter((edge) => Array.isArray(edge.ids) && edge.ids.length >= 2)
    .filter((edge) => edge.ids.every((id) => byId.has(id)))
    .filter((edge) => !DROP_CONFLICTS.has(pairKey(edge.ids[0], edge.ids[1])))
    .map((edge) => ({
      from: edge.ids[0],
      to: edge.ids[1],
      relType: 'conflicts',
      why: edge.why,
      entity: edge.entity,
      attribute: edge.attribute,
      source: 'conflict',
    }))

  const edges = [...supersedes, ...conflicts]
  const driftIds = new Set()
  for (const edge of edges) {
    driftIds.add(edge.from)
    driftIds.add(edge.to)
  }

  const selected = new Map()
  for (const id of driftIds) selected.set(id, byId.get(id))

  const topicCaps = { var: 8, limit: 6, dpr: 6, dash: 5, people: 5, reg: 5, credit: 3, ops: 3 }
  for (const sk of Object.keys(topicCaps)) {
    const existing = [...selected.values()].filter((item) => topicOf(item) === sk).length
    const needed = Math.max(0, topicCaps[sk] - existing)
    const candidates = items
      .filter((item) => !selected.has(item.id))
      .filter((item) => topicOf(item) === sk)
      .filter((item) => item.confidence === 'high')
      .filter((item) => !isNumericHeavyLimit(item, driftIds))
      .sort((a, b) => recordScore(b, driftIds) - recordScore(a, driftIds) || dateKey(a.sourceDate) - dateKey(b.sourceDate) || a.id.localeCompare(b.id))
      .slice(0, needed)
    for (const item of candidates) selected.set(item.id, item)
  }

  if (selected.size < CAP) {
    const fillers = items
      .filter((item) => !selected.has(item.id))
      .filter((item) => item.confidence === 'high')
      .filter((item) => !isNumericHeavyLimit(item, driftIds))
      .sort((a, b) => recordScore(b, driftIds) - recordScore(a, driftIds) || dateKey(a.sourceDate) - dateKey(b.sourceDate) || a.id.localeCompare(b.id))
    for (const item of fillers) {
      if (selected.size >= CAP) break
      selected.set(item.id, item)
    }
  }

  const records = [...selected.values()]
    .slice(0, CAP)
    .sort((a, b) => dateKey(a.sourceDate) - dateKey(b.sourceDate) || a.id.localeCompare(b.id))
    .map(sanitizeItem)
  const selectedIds = new Set(records.map((record) => record.id))
  const keptEdges = edges.filter((edge) => selectedIds.has(edge.from) && selectedIds.has(edge.to))

  return {
    meta: {
      source: 'decdock-enron-run2-moat',
      sourceKind: moat._meta?.kind || 'unknown',
      tenant: moat._meta?.tenant || 'enron-energy-trading',
      generatedAt: new Date().toISOString(),
      rawRecords: moat._meta?.consolidatedTo || items.length,
      rawExtractedItems: items.length,
      rawConflicts: (moat.conflicts || []).length,
      rawSupersedes: (moat.supersedes || []).length,
      curatedRecords: records.length,
      keptConflicts: keptEdges.filter((edge) => edge.relType === 'conflicts').length,
      keptSupersedes: keptEdges.filter((edge) => edge.relType === 'supersedes').length,
      driftEdges: keptEdges.length,
      droppedConflicts: (moat.conflicts || []).length - keptEdges.filter((edge) => edge.relType === 'conflicts').length,
      droppedSupersedes: (moat.supersedes || []).length - keptEdges.filter((edge) => edge.relType === 'supersedes').length,
      honestyNote:
        'Supersedes edges are kept only when newer.sourceDate is later than older.sourceDate and the edge explanation is not a system heuristic. Borderline UK TWh and Mahonia sequence edges are dropped.',
    },
    records,
    edges: keptEdges.sort((a, b) => a.relType.localeCompare(b.relType) || a.from.localeCompare(b.from) || a.to.localeCompare(b.to)),
  }
}

function loadCurated(args) {
  if (args.refreshCurated) {
    if (!args.moat) throw new Error('Refresh mode requires --moat <run2-moat.json>')
    if (!existsSync(args.moat)) throw new Error(`Full moat file not found: ${args.moat}`)
    const curated = buildCurated(loadJson(args.moat))
    writeFileSync(args.curated, `${JSON.stringify(curated, null, 2)}\n`, 'utf8')
    return curated
  }
  if (!existsSync(args.curated)) {
    throw new Error(`Curated file not found: ${args.curated}. Run with --refresh-curated --moat <run2-moat.json> first.`)
  }
  return loadJson(args.curated)
}

function sourceBody(records, topicLabel, lang) {
  const intro = lang === 'tr' ? 'ENRON - kamuya acik e-posta arsivi (FERC)' : 'ENRON - public email archive (FERC)'
  return `${intro}\n${topicLabel}\n\n${records
    .map((item) => {
      const subject = normalizeText(item.sourceSubject || 'No subject')
      return `[${item.sourceDate}] ${subject}\n${highlightFor(item)}`
    })
    .join('\n\n')}`
}

function emitData(curated, lang) {
  const topicLabels = lang === 'tr' ? TOPIC_TR : TOPIC_EN
  const records = curated.records
  const selectedIds = new Set(records.map((record) => record.id))
  const driftIds = new Set()
  for (const edge of curated.edges) {
    driftIds.add(edge.from)
    driftIds.add(edge.to)
  }
  const edgesByFrom = new Map()
  for (const edge of curated.edges) {
    if (!selectedIds.has(edge.from) || !selectedIds.has(edge.to)) continue
    if (!edgesByFrom.has(edge.from)) edgesByFrom.set(edge.from, edge)
  }

  const sources = {}
  const topics = [...new Set(records.map((record) => record.sk))]
  for (const sk of topics) {
    const group = records.filter((record) => record.sk === sk)
    sources[sk] = { sub: topicLabels[sk] || sk, body: sourceBody(group, topicLabels[sk] || sk, lang) }
  }

  const data = records.map((item) => {
    const edge = edgesByFrom.get(item.id)
    return {
      id: item.id,
      kind: kindOf(item),
      st: statusOf(item),
      d: labelFor(item, lang, driftIds),
      o: ownerOf(item),
      os: kindOf(item) === 'politika' ? 'policy' : 'ratifier',
      c: item.confidence,
      date: item.sourceDate,
      sk: item.sk,
      hl: highlightFor(item),
      ...(edge
        ? {
            chainTo: edge.to,
            relType: edge.relType,
            chainLabel: trim(edge.why, 130),
          }
        : {}),
    }
  })

  return { sources, data }
}

function emitJs(path, curated, lang) {
  const { sources, data } = emitData(curated, lang)
  const header =
    lang === 'tr'
      ? '// GERCEK Decdock kosusu - Enron kamuya acik FERC arsivi (250 mail -> curated proof subset).\n'
      : '// Real Decdock run - Enron public FERC archive (250 emails -> curated proof subset).\n'
  const js = `${header}const META = ${JSON.stringify(curated.meta, null, 2)};\n\nconst SOURCES = ${JSON.stringify(sources, null, 2)};\n\nconst DATA = ${JSON.stringify(data, null, 2)};\n`
  writeFileSync(path, js, 'utf8')
  return { sources, data }
}

const args = parseArgs(process.argv)
const curated = loadCurated(args)
const tr = emitJs(OUT_TR, curated, 'tr')
emitJs(OUT_EN, curated, 'en')

console.log(
  `enron moat curated: ${curated.meta.curatedRecords} records, ${curated.meta.keptConflicts} conflicts, ${curated.meta.keptSupersedes} supersedes, ${curated.meta.driftEdges} drift edges`,
)
console.log(
  `supersedes kept: ${curated.meta.keptSupersedes}/${curated.meta.rawSupersedes}; conflicts kept: ${curated.meta.keptConflicts}/${curated.meta.rawConflicts}; topics: ${Object.keys(tr.sources).length}`,
)
