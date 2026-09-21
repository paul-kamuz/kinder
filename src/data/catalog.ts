import type { CollectibleItem, FigureCollection } from './types'

// Static catalog, shipped with the app. User state (which ids are collected)
// lives separately in src/lib/store.ts, so adding a collection here is enough.
// Order is the fixed display order -- for a paired collection, `pairs` sets it
// and `items` is just the alphabetical roster.
export const catalog: FigureCollection[] = [
  {
    id: 'disney-figures',
    name: 'Disney Figures',
    emoji: '🏰',
    bannerKey: 'disney-figures',
    items: [
      { id: 'aladdin', name: 'Aladdin', emoji: '🧞', imageKey: 'alladin' },
      { id: 'donald', name: 'Donald Duck', emoji: '🦆', imageKey: 'donald' },
      { id: 'genie', name: 'Genie', emoji: '🧞‍♂️', imageKey: 'genie' },
      { id: 'geppetto', name: 'Geppetto', emoji: '👴', imageKey: 'geppetto' },
      { id: 'hector', name: 'Hector', emoji: '💀', imageKey: 'hector' },
      { id: 'hercules', name: 'Hercules', emoji: '💪', imageKey: 'hercules' },
      { id: 'jessie', name: 'Jessie', emoji: '🤠', imageKey: 'jessie' },
      { id: 'maui', name: 'Maui', emoji: '🪝', imageKey: 'maui' },
      { id: 'megara', name: 'Megara', emoji: '💜', imageKey: 'megara' },
      { id: 'mickey', name: 'Micky Maus', emoji: '🐭', imageKey: 'mickey' },
      { id: 'miguel', name: 'Miguel', emoji: '🎸', imageKey: 'miguel' },
      { id: 'miss-incredible', name: 'Mrs. Incredible', emoji: '🦸‍♀️', imageKey: 'miss-incredible' },
      { id: 'moana', name: 'Vaiana', emoji: '🌊', imageKey: 'moana' },
      { id: 'mr-incredible', name: 'Mr. Incredible', emoji: '🦸‍♂️', imageKey: 'mr-incredible' },
      { id: 'peter-pan', name: 'Peter Pan', emoji: '🧚‍♂️', imageKey: 'peter-pan' },
      { id: 'pinocchio', name: 'Pinocchio', emoji: '🪵', imageKey: 'pinoquio' },
      { id: 'tinker-bell', name: 'Tinker Bell', emoji: '🧚‍♀️', imageKey: 'tinker-bell' },
      { id: 'woody', name: 'Woody', emoji: '🤠', imageKey: 'woody' },
    ],
    // The 18 figures ship as 9 two-figure sets, one per film.
    pairs: [
      ['pinocchio', 'geppetto'],
      ['aladdin', 'genie'],
      ['hercules', 'megara'],
      ['woody', 'jessie'],
      ['mr-incredible', 'miss-incredible'],
      ['moana', 'maui'],
      ['miguel', 'hector'],
      ['peter-pan', 'tinker-bell'],
      ['mickey', 'donald'],
    ],
  },
]

/**
 * The grid's display order: each declared pair, then any figure no pair
 * mentions, on its own. Unknown ids are dropped rather than crashing the grid,
 * so a typo in `pairs` costs a tile, not the screen.
 */
export function figureGroups(collection: FigureCollection): CollectibleItem[][] {
  const byId = new Map(collection.items.map((item) => [item.id, item]))
  const paired = new Set(collection.pairs?.flat())

  const pairs = (collection.pairs ?? [])
    .map((ids) => ids.flatMap((id) => byId.get(id) ?? []))
    .filter((group) => group.length > 0)
  const loose = collection.items.filter((item) => !paired.has(item.id)).map((item) => [item])

  return [...pairs, ...loose]
}

export const figureImageUrl = (imageKey: string) => `figures/${imageKey}.webp`

export const collectionBannerUrl = (bannerKey: string) => `banners/${bannerKey}.webp`
