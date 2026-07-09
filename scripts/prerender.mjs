import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
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

  const routes = [
    { routePath: '/', outFile: templatePath, html: template },
    {
      routePath: '/tr/',
      outFile: path.join(distDir, 'tr', 'index.html'),
      html: toTurkishMetadata(template),
    },
  ]

  for (const route of routes) {
    const appHtml = render(route.routePath)
    const prerenderedHtml = route.html.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`,
    )

    await mkdir(path.dirname(route.outFile), { recursive: true })
    await writeFile(route.outFile, prerenderedHtml, 'utf8')
  }
}

function toTurkishMetadata(html) {
  return html
    .replace('<html lang="en">', '<html lang="tr">')
    .replace(
      /<title>[\s\S]*?<\/title>/,
      '<title>Decdock - Şirketinizin karar sicili</title>',
    )
    .replace(
      /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/,
      '<meta name="description" content="Decdock, yazışmalarınızdan şirketinizin karar sicilini çıkarır: ne kararlaştırıldı, kim onayladı, ne zaman - kaynağından birebir alıntıyla. Bitmiş bir projenizin e-postalarından karar denetimi raporu." />',
    )
    .replace(
      /<link rel="canonical" href="[\s\S]*?" \/>/,
      '<link rel="canonical" href="https://decdock.com/tr/" />',
    )
    .replace(
      /<meta property="og:locale" content="[\s\S]*?" \/>/,
      '<meta property="og:locale" content="tr_TR" />',
    )
    .replace(
      /<meta property="og:locale:alternate" content="[\s\S]*?" \/>/,
      '<meta property="og:locale:alternate" content="en_US" />',
    )
    .replace(
      /<meta property="og:url" content="[\s\S]*?" \/>/,
      '<meta property="og:url" content="https://decdock.com/tr/" />',
    )
    .replace(
      /<meta property="og:title" content="[\s\S]*?" \/>/,
      '<meta property="og:title" content="Decdock - Şirketinizin karar sicili" />',
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/,
      '<meta property="og:description" content="Yazışmalarınızdan karar sicili: ne kararlaştırıldı, kim onayladı, ne zaman - kaynağından birebir alıntıyla." />',
    )
    .replace(
      /<meta name="twitter:title" content="[\s\S]*?" \/>/,
      '<meta name="twitter:title" content="Decdock - Şirketinizin karar sicili" />',
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/>/,
      '<meta name="twitter:description" content="Yazışmalarınızdan karar sicili: ne kararlaştırıldı, kim onayladı, ne zaman - kaynağından birebir alıntıyla." />',
    )
}

try {
  await prerender()
} finally {
  await rm(ssrDir, { recursive: true, force: true })
}
