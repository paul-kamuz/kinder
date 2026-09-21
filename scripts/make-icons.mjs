// Generates the PWA / favicon set from one inline SVG. Run: node scripts/make-icons.mjs
// Deliberately abstract art (no Disney/Kinder imagery) so the icon is ours.
import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const BG = '#f7c948'
const FG = '#2eaa5a'

// `inset` leaves a safe margin for maskable icons, which get cropped to a circle.
const svg = (inset) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${inset ? 0 : 112}" fill="${BG}"/>
  <g transform="translate(256 256) scale(${inset ? 0.66 : 0.82}) translate(-256 -256)">
    <circle cx="256" cy="256" r="168" fill="${FG}"/>
    <path d="M176 262l56 56 104-116" fill="none" stroke="#fff" stroke-width="44"
          stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`

const render = (size, inset) =>
  sharp(Buffer.from(svg(inset))).resize(size, size).png({ compressionLevel: 9 }).toBuffer()

await writeFile('public/favicon.svg', svg(false))
await writeFile('public/icon-192.png', await render(192, false))
await writeFile('public/icon-512.png', await render(512, false))
await writeFile('public/icon-512-maskable.png', await render(512, true))
await writeFile('public/apple-touch-icon.png', await render(180, false))

console.log('icons written')
