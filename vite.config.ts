import { access, readFile } from 'node:fs/promises'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function servePublicHtmlRoutes() {
  const publicDir = path.resolve('public')

  return {
    name: 'serve-public-html-routes',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const method = req.method ?? 'GET'
        if (method !== 'GET' && method !== 'HEAD') {
          next()
          return
        }

        const rawPath = req.url?.split('?')[0]?.split('#')[0] ?? '/'
        if (
          rawPath === '/' ||
          rawPath.startsWith('/@') ||
          rawPath.startsWith('/src/') ||
          rawPath.startsWith('/node_modules/') ||
          path.extname(rawPath) !== ''
        ) {
          next()
          return
        }

        const normalizedPath = rawPath.replace(/^\/+|\/+$/g, '')
        const candidate = path.join(publicDir, normalizedPath, 'index.html')

        try {
          await access(candidate)
          const html = await readFile(candidate, 'utf8')
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(html)
          return
        } catch {
          next()
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), servePublicHtmlRoutes()],
  base: '/',
})
