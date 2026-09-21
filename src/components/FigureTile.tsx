import type { CollectibleItem } from '../data/types'
import { FigureImage } from './FigureImage'

interface Props {
  item: CollectibleItem
  collected: boolean
  onSelect: (item: CollectibleItem) => void
}

export function FigureTile({ item, collected, onSelect }: Props) {
  return (
    <button
      className="tile"
      type="button"
      data-collected={collected}
      aria-pressed={collected}
      onClick={() => onSelect(item)}
    >
      <span className="tile__art">
        <FigureImage item={item} collected={collected} size="tile" />
        {collected && (
          <span className="tile__badge" aria-hidden="true">
            <CheckIcon />
          </span>
        )}
      </span>
      <span className="tile__name">{item.name}</span>
      <span className="visually-hidden">{collected ? 'collected' : 'not collected'}</span>
    </button>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
