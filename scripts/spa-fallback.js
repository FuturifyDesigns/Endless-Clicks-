import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const distIndex = resolve('dist/index.html')
const dist404 = resolve('dist/404.html')

if (!existsSync(distIndex)) {
  console.error('Missing dist/index.html — run vite build first.')
  process.exit(1)
}

copyFileSync(distIndex, dist404)
console.log('Created dist/404.html for GitHub Pages SPA routes.')
