// Builds the collection banner images from assets/collection-source.webp.
// Run after changing the source or the crop: npm run banners
import { mkdir, stat } from 'node:fs/promises'
import sharp from 'sharp'

const SRC = 'assets/collection-source.webp'
const OUT = 'public/banners'

// Cropped to exactly 16:9 so the CSS only has to stretch it to the card width
// -- object-fit never has to choose what to cut. Framed to keep the full
// Disney wordmark and all three figures, and to exclude the Playmobil badge
// and the vertical copyright strip down the right edge of the source.
const CROP = { left: 295, top: 20, width: 570, height: 321 }

// The source art is small, so the card would be soft on a high-DPR phone.
// Upscaling adds no detail but lanczos3 beats the browser's own scaling.
const WIDTH = 1140

await mkdir(OUT, { recursive: true })
const out = `${OUT}/disney-figures.webp`
await sharp(SRC)
  .extract(CROP)
  .resize(WIDTH, null, { kernel: 'lanczos3' })
  .webp({ quality: 82, effort: 6 })
  .toFile(out)

console.log(`${out}: ${Math.round((await stat(out)).size / 1024)} KB`)
