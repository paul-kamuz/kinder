export interface CollectibleItem {
  /** Stable id, persisted in the collected-state store. Never renumber these. */
  id: string
  name: string
  /** Fallback art, shown when the image is missing or fails to load. */
  emoji: string
  /** Basename in /figures, without extension. */
  imageKey: string
}

export interface FigureCollection {
  id: string
  name: string
  emoji: string
  items: CollectibleItem[]
}
