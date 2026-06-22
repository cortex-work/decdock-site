import { readFileSync } from 'node:fs'
import { createContext, runInContext } from 'node:vm'

const html = readFileSync('public/demo-canli/index.html', 'utf8')
const failures = []

function extractConstLiteral(name, openChar, closeChar) {
  const marker = `const ${name} =`
  const markerIndex = html.indexOf(marker)

  if (markerIndex === -1) {
    failures.push(`Missing ${marker} block`)
    return ''
  }

  let cursor = markerIndex + marker.length
  while (/\s/.test(html[cursor] ?? '')) cursor += 1

  if (html[cursor] !== openChar) {
    failures.push(`${name} literal must start with ${openChar}`)
    return ''
  }

  const literalStart = cursor
  let depth = 0
  let quote = null
  let escaped = false

  for (; cursor < html.length; cursor += 1) {
    const ch = html[cursor]

    if (quote !== null) {
      if (escaped) {
        escaped = false
        continue
      }

      if (ch === '\\') {
        escaped = true
        continue
      }

      if (ch === quote) {
        quote = null
      }

      continue
    }

    if (ch === '\'' || ch === '"' || ch === '`') {
      quote = ch
      continue
    }

    if (ch === openChar) {
      depth += 1
      continue
    }

    if (ch === closeChar) {
      depth -= 1
      if (depth === 0) {
        cursor += 1
        break
      }
    }
  }

  if (depth !== 0) {
    failures.push(`${name} literal is not balanced`)
    return ''
  }

  return `const ${name} = ${html.slice(literalStart, cursor)};`
}

const sourcesBlock = extractConstLiteral('SOURCES', '{', '}')
const dataBlock = extractConstLiteral('DATA', '[', ']')

let SOURCES = null
let DATA = null

if (failures.length === 0) {
  const sandbox = {}
  createContext(sandbox)

  try {
    runInContext(
      `${sourcesBlock}\n${dataBlock}\nglobalThis.__demoCanli = { SOURCES, DATA };`,
      sandbox,
      { timeout: 1000 },
    )
    ;({ SOURCES, DATA } = sandbox.__demoCanli)
  } catch (error) {
    failures.push(`Could not evaluate SOURCES/DATA literals: ${error.message}`)
  }
}

if (!SOURCES || typeof SOURCES !== 'object' || Array.isArray(SOURCES)) {
  failures.push('SOURCES must evaluate to an object')
}

if (!Array.isArray(DATA)) {
  failures.push('DATA must evaluate to an array')
}

if (failures.length === 0) {
  const seenIds = new Set()
  const byId = new Map()

  for (const record of DATA) {
    if (typeof record.id !== 'string' || record.id.length === 0) {
      failures.push('Every DATA record must have a non-empty string id')
      continue
    }

    if (seenIds.has(record.id)) {
      failures.push(`Duplicate DATA id: ${record.id}`)
      continue
    }

    seenIds.add(record.id)
    byId.set(record.id, record)
  }

  for (const record of DATA) {
    const label = record.id ?? record.d ?? '<unknown>'
    const source = SOURCES[record.sk]

    if (!source) {
      failures.push(`${label}: source key "${record.sk}" does not exist in SOURCES`)
    } else if (typeof source.body !== 'string') {
      failures.push(`${label}: source "${record.sk}" must have a string body`)
    } else if (typeof record.hl !== 'string' || !source.body.includes(record.hl)) {
      failures.push(`${label}: hl is not found verbatim in source "${record.sk}"`)
    }

    if (record.violates !== undefined) {
      const policy = byId.get(record.violates)

      if (!policy) {
        failures.push(`${label}: violates points to missing DATA id "${record.violates}"`)
      } else if (policy.kind !== 'politika') {
        failures.push(`${label}: violates target "${record.violates}" is not kind="politika"`)
      } else if (record.violationLabel !== undefined && record.violationLabel !== policy.d) {
        failures.push(`${label}: violationLabel must equal policy d "${policy.d}"`)
      }
    } else if (record.violationLabel !== undefined) {
      failures.push(`${label}: violationLabel is present without violates`)
    }

    if (record.chainTo !== undefined && !byId.has(record.chainTo)) {
      failures.push(`${label}: chainTo points to missing DATA id "${record.chainTo}"`)
    }
  }

  const policyCount = DATA.filter((record) => record.kind === 'politika').length
  const violationCount = DATA.filter((record) => record.violates !== undefined).length

  if (policyCount < 1) {
    failures.push('Expected at least one policy record')
  }

  if (violationCount < 1) {
    failures.push('Expected at least one violation record')
  }
}

if (failures.length > 0) {
  console.error(`demo-canli smoke failed: ${failures.length} issue(s)`)
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

const policyCount = DATA.filter((record) => record.kind === 'politika').length
const violationCount = DATA.filter((record) => record.violates !== undefined).length

console.log(
  `demo-canli smoke passed: ${DATA.length} records, ${Object.keys(SOURCES).length} sources, ${policyCount} policies, ${violationCount} violations`,
)
