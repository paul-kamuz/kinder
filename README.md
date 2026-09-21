# Collection Tracker (web)

Tap-to-collect tracker for the Kinder x Playmobil x Disney figure set. Web version of
[kinder-disney-collection](https://github.com/paul-kamuz/kinder-disney-collection) (SwiftUI/iOS).

Three screens: pick a collection, see every figure greyed out, tap one, confirm
"I have it", it turns full colour. Simple enough for a child to use.

**Live:** https://paul-kamuz.github.io/web-kinder-disney-collection/

## Image licensing

The figure images in `public/figures/` are Ferrero/Kinder promotional photographs of
Disney and Playmobil figures. They are **not** original work and are **not** licensed
for redistribution. This is a personal, non-commercial fan project published with them
in place, as a deliberate choice.

If a rights holder objects, the fix is to replace `public/figures/` with own
photographs or licensed art. Note the originals are present throughout the git
history, so a full removal means rewriting history (`git filter-repo`), not just
deleting the files.

The app code itself carries no such restriction.

## Stack

| | |
|---|---|
| Build | Vite 6 (Node 20.9 compatible; Vite 7 needs Node ≥ 20.19) |
| UI | React 19 + TypeScript, strict |
| Styling | One plain CSS file, tokens at the top, light + dark |
| Routing | Hash route, so the phone's back gesture closes the grid |
| Persistence | `localStorage`, guarded with try/catch |
| Offline | `vite-plugin-pwa`, precaches the whole app (~620 KB) |
| Type | Luckiest Guy (Apache-2.0), self-hosted — the display face kinder.com uses |

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
> `localStorage`; you do not get offline support. The deployed site is HTTPS, so
> offline works there.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Dev server on localhost |
| `npm run dev:lan` | Dev server exposed to the local network |
| `npm run build` | Typecheck, then build to `dist/` |
| `npm run preview` | Serve the production build (service worker active) |
| `npm run typecheck` | Types only |
| `npm run images` | Re-generate `public/figures/*.webp` from the iOS PNGs |
| `npm run icons` | Re-generate the favicon / PWA icons from `assets/app-icon.webp` |
| `npm run banners` | Re-generate `public/banners/*.webp` from `assets/collection-source.webp` |

`npm run images` reads from `../local-kinder-disney-collection/...` by default; override
with `FIGURE_SRC=/path/to/Assets.xcassets npm run images`. It converted the 18 source
PNGs from 1.8 MB to 283 KB.

## Deploys

Pushing to `main` builds and publishes via GitHub Actions, usually within a minute.

The service worker serves the app from its precache, so a fresh deploy would
normally only appear on the *second* open. `src/main.tsx` reloads once when the
new worker takes over, so the first open is enough. Collected state is in
`localStorage` and survives that reload.

## Layout

```
assets/                   artwork sources (not published; inputs to scripts/)
public/figures/*.webp     18 figure images
public/banners/*.webp     collection card hero images
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

A collection's card shows `public/banners/<bannerKey>.webp` when `bannerKey` is set,
and falls back to its `emoji` on a band of the same 16:9 shape otherwise — so the card
never changes size, whether or not there is artwork.

Catalog (static, shipped) is deliberately kept separate from user state
(`{ collectionId: [itemId, …] }` in `localStorage`), so item ids must stay stable —
renaming an id loses that figure's collected flag. Unknown ids in storage are ignored
on read, and the collected count is computed against the catalog, so removing a figure
does not inflate progress.

## Not built (matching the iOS MVP)

Search, filters, add/edit/delete of figures, notes, series grouping, user photos, sync,
accounts, custom-collection UI.
