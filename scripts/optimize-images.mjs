// Converts the source PNGs from the iOS project into WebP for the web app.
// Run once (or after adding figures): npm run images
import { mkdir, readdir, stat } from 'node:fs/promises'
import { join, basename } from 'node:path'
import sharp from 'sharp'

const SRC = process.env.FIGURE_SRC ??
  '../local-kinder-disney-collection/KinderDisneyCollection/Assets.xcassets'
const OUT = 'public/figures'

async function findPngs(dir) {
  const found = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) found.push(...(await findPngs(path)))
    else if (entry.name.endsWith('.png')) found.push(path)
  }
  return found
}

await mkdir(OUT, { recursive: true })
const pngs = await findPngs(SRC)
let before = 0
let after = 0

for (const png of pngs) {
  const out = join(OUT, `${basename(png, '.png')}.webp`)
  await sharp(png).webp({ quality: 82, effort: 6 }).toFile(out)
  before += (await stat(png)).size
  after += (await stat(out)).size
}

const kb = (n) => `${Math.round(n / 1024)} KB`
console.log(`${pngs.length} images: ${kb(before)} -> ${kb(after)}`)
