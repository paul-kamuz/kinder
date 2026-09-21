import type { FigureCollection } from './types'

// Static catalog, shipped with the app. User state (which ids are collected)
// lives separately in src/lib/store.ts, so adding a collection here is enough.
// Order is the fixed display order.
export const catalog: FigureCollection[] = [
  {
    id: 'disney-figures',
    name: 'Disney Figures',
    emoji: '🏰',
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
  },
]

export const figureImageUrl = (imageKey: string) => `figures/${imageKey}.webp`
