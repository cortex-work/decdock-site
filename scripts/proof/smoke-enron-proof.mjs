import { readFileSync } from 'node:fs'
import vm from 'node:vm'

const DATA_FILES = [
  ['TR', 'scripts/proof/enron-data.js'],
  ['EN', 'scripts/proof/en-data.js'],
]

const PAGE_FILES = [
  ['TR page', 'public/enron-kanit/index.html', '/enron-grafi/'],
  ['EN page', 'public/enron-proof/index.html', '/enron-graph/'],
]

const errors = []

function loadData(file) {
  const source = readFileSync(file, 'utf8')
  return vm.runInNewContext(`${source}\n;({ SOURCES, DATA })`, {})
}

function checkData(label, file) {
  const { SOURCES, DATA } = loadData(file)
  const ids = new Set()
  const policyIds = new Set(DATA.filter(record => record.kind === 'politika').map(record => record.id))

  for (const record of DATA) {
    if (ids.has(record.id)) errors.push(`${label}: duplicate id ${record.id}`)
    ids.add(record.id)

    if (!SOURCES[record.sk]) {
      errors.push(`${label}: ${record.id} references missing source ${record.sk}`)
      continue
    }

    if (!String(SOURCES[record.sk].body).includes(record.hl)) {
      errors.push(`${label}: ${record.id} hl is not verbatim in source ${record.sk}`)
    }

    if (record.chainTo !== undefined && !DATA.some(other => other.id === record.chainTo)) {
      errors.push(`${label}: ${record.id} chainTo target missing: ${record.chainTo}`)
    }

    if (record.violates !== undefined && !policyIds.has(record.violates)) {
      errors.push(`${label}: ${record.id} violates target is not an existing policy: ${record.violates}`)
    }

    if (record.violationLabel !== undefined) {
      const policy = DATA.find(other => other.id === record.violates)
      if (policy && record.violationLabel !== policy.d) {
        errors.push(`${label}: ${record.id} violationLabel does not match policy title`)
      }
    }
  }

  if (DATA.length < 20) errors.push(`${label}: expected at least 20 records, got ${DATA.length}`)
  if (Object.keys(SOURCES).length < 8) errors.push(`${label}: expected at least 8 sources, got ${Object.keys(SOURCES).length}`)
  if (!DATA.some(record => record.relType === 'conflicts')) errors.push(`${label}: no conflict relation`)
  if (!DATA.some(record => record.relType === 'supersedes')) errors.push(`${label}: no supersedes relation`)

  return { SOURCES, DATA }
}

const tr = checkData(DATA_FILES[0][0], DATA_FILES[0][1])
const en = checkData(DATA_FILES[1][0], DATA_FILES[1][1])

const trIds = tr.DATA.map(record => record.id).join('|')
const enIds = en.DATA.map(record => record.id).join('|')
if (trIds !== enIds) errors.push('TR/EN DATA ids are not in the same order')

for (const [label, file, graphLink] of PAGE_FILES) {
  const html = readFileSync(file, 'utf8')
  if (!html.includes('hreflang="tr"')) errors.push(`${label}: missing tr hreflang`)
  if (!html.includes('hreflang="en"')) errors.push(`${label}: missing en hreflang`)
  if (!html.includes(graphLink)) errors.push(`${label}: missing graph link ${graphLink}`)
  if (/Temsili\/örnek veridir|representative sample data/i.test(html)) {
    errors.push(`${label}: misleading representative-data copy remains`)
  }
}

if (errors.length > 0) {
  console.error('enron-proof smoke failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(
  `enron-proof smoke passed: ${tr.DATA.length} records, ${Object.keys(tr.SOURCES).length} sources, ` +
  `${tr.DATA.filter(record => record.relType === 'conflicts').length} conflicts, ` +
  `${tr.DATA.filter(record => record.relType === 'supersedes').length} supersedes`,
)
