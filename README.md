# Collection Tracker (web)

Tap-to-collect tracker for the Kinder x Playmobil x Disney figure set. Web version of
[kinder-disney-collection](https://github.com/paul-kamuz/kinder-disney-collection) (SwiftUI/iOS).

Three screens: pick a collection, see every figure greyed out, tap one, confirm
"I have it", it turns full colour. Simple enough for a child to use.

## ⚠️ Keep this repo and any deployment private

The figure images are Ferrero/Kinder promo pictures of Disney and Playmobil figures.
**Personal use only.** Do not publish the app or the images:

- Do not make this repo public.
- **Do not use GitHub Pages.** Pages from a private repo still serves a *publicly
  reachable* site unless you are on GitHub Enterprise Cloud with Pages access control.
- To use it on a phone off your home WiFi, prefer Cloudflare Pages behind Cloudflare
  Access, or `tailscale serve` — both keep the site non-public.

If the app is ever to be shared, replace `public/figures/` with your own photos or
properly licensed art first.

## Stack

| | |
|---|---|
| Build | Vite 6 (Node 20.9 compatible; Vite 7 needs Node ≥ 20.19) |
| UI | React 19 + TypeScript, strict |
| Styling | One plain CSS file, tokens at the top, light + dark |
| Routing | Hash route, so the phone's back gesture closes the grid |
| Persistence | `localStorage`, guarded with try/catch |
| Offline | `vite-plugin-pwa`, precaches the whole app (~540 KB) |

No backend, no accounts, no runtime dependencies beyond React.

## Running it

```bash
npm install
npm run dev
```

On your phone, over the same WiFi:

```bash
npm run dev:lan
```

Then open the `Network:` URL Vite prints. iOS Safari → Share → **Add to Home Screen**
gives an app icon and a full-screen window.

> Over plain `http://192.168.x.x` the **service worker will not register** — browsers
> only allow it on HTTPS or localhost. You still get the home-screen icon and
> `localStorage`; you do not get offline support. For real offline, serve over HTTPS
> (Cloudflare Access or Tailscale, see above).

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Dev server on localhost |
| `npm run dev:lan` | Dev server exposed to the local network |
| `npm run build` | Typecheck, then build to `dist/` |
| `npm run preview` | Serve the production build (service worker active) |
| `npm run typecheck` | Types only |
| `npm run images` | Re-generate `public/figures/*.webp` from the iOS PNGs |

`npm run images` reads from `../local-kinder-disney-collection/...` by default; override
with `FIGURE_SRC=/path/to/Assets.xcassets npm run images`. It converted the 18 source
PNGs from 1.8 MB to 283 KB.

## Layout

```
public/figures/*.webp     18 figure images
src/data/catalog.ts       static catalog — the figures, in display order
src/data/types.ts         FigureCollection / CollectibleItem
src/lib/store.ts          localStorage read/write, collected-count helpers
src/lib/useCollected.ts   collected state hook
src/lib/useHashRoute.ts   '' -> picker, '#/c/<id>' -> grid
src/components/           CollectionPicker, FigureGrid, FigureTile, ConfirmSheet, …
src/styles/app.css        design tokens + all styling
scripts/                  one-off image and icon generators
```

## Adding a collection

Append an entry to `catalog` in `src/data/catalog.ts` and drop its images in
`public/figures/`. Nothing else changes: the picker, the counts and the persistence
layer are all driven off the catalog.

Catalog (static, shipped) is deliberately kept separate from user state
(`{ collectionId: [itemId, …] }` in `localStorage`), so item ids must stay stable —
renaming an id loses that figure's collected flag. Unknown ids in storage are ignored
on read, and the collected count is computed against the catalog, so removing a figure
does not inflate progress.

## Not built (matching the iOS MVP)

Search, filters, add/edit/delete of figures, notes, series grouping, user photos, sync,
accounts, custom-collection UI.
