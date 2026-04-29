import { readdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const distDir = path.join(projectRoot, 'dist')
const ssrDir = path.join(projectRoot, '.ssr-temp')

async function findServerEntry() {
  const files = await readdir(ssrDir)
  const match = files.find((file) => file.startsWith('entry-server.'))

  if (!match) {
    throw new Error('SSR entry output was not found in .ssr-temp')
  }

  return path.join(ssrDir, match)
}

async function prerender() {
  const templatePath = path.join(distDir, 'index.html')
  const template = await readFile(templatePath, 'utf8')
  const serverEntryPath = await findServerEntry()
  const { render } = await import(pathToFileURL(serverEntryPath).href)
  const appHtml = render()

  const prerenderedHtml = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  )

  await writeFile(templatePath, prerenderedHtml, 'utf8')
}

try {
  await prerender()
} finally {
  await rm(ssrDir, { recursive: true, force: true })
}
