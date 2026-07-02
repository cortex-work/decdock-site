import { readFileSync } from 'node:fs'
import vm from 'node:vm'

const GRAPH_FILES = [
  ['TR graph', 'public/enron-grafi/index.html', 'scripts/proof/enron-data.js', '/enron-kanit/', '/karar-grafi/'],
  ['EN graph', 'public/enron-graph/index.html', 'scripts/proof/en-data.js', '/enron-proof/', '/karar-grafi/'],
]

const errors = []

function loadGraph(file) {
  const html = readFileSync(file, 'utf8')
  const dataMatch = html.match(/const NODES=(\[[\s\S]*?\]);\s*const EDGES=(\[[\s\S]*?\]);/)
  if (!dataMatch) {
    errors.push(`${file}: NODES/EDGES literals not found`)
    return { html, nodes: [], edges: [] }
  }
  const sandbox = vm.createContext({})
  const nodes = vm.runInContext(`(${dataMatch[1]})`, sandbox)
  const edges = vm.runInContext(`(${dataMatch[2]})`, sandbox)
  return { html, nodes, edges }
}

function loadMeta(file) {
  const source = readFileSync(file, 'utf8')
  return vm.runInNewContext(`${source}\n;({ META })`, {}).META
}

for (const [label, file, dataFile, proofLink, sampleLink] of GRAPH_FILES) {
  const { html, nodes, edges } = loadGraph(file)
  const meta = loadMeta(dataFile)
  const ids = new Set(nodes.map((node) => node.id))
  const topicsMatch = html.match(/const TOPICS=(\[[\s\S]*?\]);/)
  const sourceTopicMatch = html.match(/const SOURCE_TOPIC=(\{[\s\S]*?\});/)
  const topics = topicsMatch ? vm.runInContext(`(${topicsMatch[1]})`, vm.createContext({})) : []
  const sourceTopic = sourceTopicMatch ? vm.runInContext(`(${sourceTopicMatch[1]})`, vm.createContext({})) : {}
  const topicDist = {}
  for (const node of nodes) {
    const topic = sourceTopic[node.sk] || 'ops'
    topicDist[topic] = (topicDist[topic] || 0) + 1
  }

  if (nodes.length !== meta.curatedRecords) errors.push(`${label}: expected ${meta.curatedRecords} nodes, got ${nodes.length}`)
  if (topics.length !== 8) errors.push(`${label}: expected 8 topics, got ${topics.length}`)
  for (const [topic, count] of Object.entries(topicDist)) {
    if (count > 10) errors.push(`${label}: topic ${topic} is too large (${count} nodes)`)
  }
  if (!html.includes(proofLink)) errors.push(`${label}: missing proof link ${proofLink}`)
  if (!html.includes(sampleLink)) errors.push(`${label}: missing synthetic graph link ${sampleLink}`)
  if (!html.includes('hreflang="tr"')) errors.push(`${label}: missing tr hreflang`)
  if (!html.includes('hreflang="en"')) errors.push(`${label}: missing en hreflang`)
  if (!html.includes('same_source')) errors.push(`${label}: missing same_source provenance edge support`)

  for (const edge of edges) {
    if (!ids.has(edge.from)) errors.push(`${label}: edge from missing node ${edge.from}`)
    if (!ids.has(edge.to)) errors.push(`${label}: edge to missing node ${edge.to}`)
    if (!['references', 'depends_on', 'conflicts', 'violates', 'complies_with', 'supersedes', 'same_source'].includes(edge.type)) {
      errors.push(`${label}: unknown edge type ${edge.type}`)
    }
  }

  const driftEdges = edges.filter((edge) => edge.type === 'conflicts' || edge.type === 'supersedes')
  const sameSourceEdges = edges.filter((edge) => edge.type === 'same_source')
  if (driftEdges.length !== meta.driftEdges) errors.push(`${label}: expected ${meta.driftEdges} drift edges, got ${driftEdges.length}`)
  if (sameSourceEdges.length < 3) errors.push(`${label}: expected same-source provenance edges`)

  const isoDates = nodes.filter((node) => /^\d{4}-\d{2}-\d{2}$/.test(node.date))
  if (isoDates.length !== nodes.length) errors.push(`${label}: expected all node dates to be ISO`)
}

if (errors.length > 0) {
  console.error('enron-graph smoke failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

const meta = loadMeta('scripts/proof/enron-data.js')
console.log(`enron-graph smoke passed: ${meta.curatedRecords} nodes, ${meta.driftEdges} drift edges, same-source provenance links`)
