import type { CollectibleItem } from '../data/types'
import { FigureTile } from './FigureTile'

interface Props {
  /** One pair, or a single figure when a collection leaves one unpaired. */
  items: CollectibleItem[]
  isCollected: (item: CollectibleItem) => boolean
  onSelect: (item: CollectibleItem) => void
}

/**
 * Two figures from the same film, framed as one card so the pair reads as a
 * unit. The frame turns gold once both halves are in, which gives every pair a
 * small goal of its own on the way to the full set.
 */
export function PairCard({ items, isCollected, onSelect }: Props) {
  const complete = items.length > 1 && items.every(isCollected)
  const names = items.map((item) => item.name).join(' & ')

  return (
    <div
      className="pair"
      data-size={items.length}
      data-complete={complete}
      // A plain group, not a landmark: it names the pairing for screen readers
      // without adding a stop to the tab order.
      role="group"
      aria-label={complete ? `${names} — pair complete` : names}
    >
      {complete && (
        <span className="pair__ribbon" aria-hidden="true">
          ★ Pair
        </span>
      )}
      <div className="pair__row">
        {items.map((item) => (
          <FigureTile
            key={item.id}
            item={item}
            collected={isCollected(item)}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}
