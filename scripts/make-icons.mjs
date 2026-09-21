// Generates the favicon / PWA / home-screen icon set from assets/app-icon.webp.
// Run after changing that file: npm run icons
import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const SRC = 'assets/app-icon.webp'

// The source has transparent corners. iOS composites transparency onto BLACK
// for the home-screen icon, so every output is flattened. White matches the
// artwork's own background, so the corners disappear into it.
const BG = { r: 255, g: 255, b: 255 }

const flat = (size) =>
  sharp(SRC).resize(size, size, { fit: 'contain', background: BG }).flatten({ background: BG })

/**
 * Maskable icons are cropped by the launcher to a circle or squircle, so the
 * artwork has to sit inside the safe zone (the middle ~80%) with the
 * background bleeding to the edges.
 */
async function maskable(size) {
  const inner = Math.round(size * 0.76)
  const art = await sharp(SRC).resize(inner, inner, { fit: 'contain', background: BG }).toBuffer()
  const pad = Math.round((size - inner) / 2)
  return sharp({
    create: { width: size, height: size, channels: 3, background: BG },
  })
    .composite([{ input: art, top: pad, left: pad }])
    .png(PNG)
    .toBuffer()
}

// The art is flat illustration, so a 128-colour palette is visually identical
// and roughly a quarter of the size. These icons are precached for offline
// use, so their weight is worth minding.
const PNG = { compressionLevel: 9, palette: true, colours: 128 }

const png = (size) => flat(size).png(PNG).toBuffer()

await writeFile('public/favicon.png', await png(48))
await writeFile('public/apple-touch-icon.png', await png(180))
await writeFile('public/icon-192.png', await png(192))
await writeFile('public/icon-512.png', await png(512))
await writeFile('public/icon-512-maskable.png', await maskable(512))

console.log('icons written from', SRC)
