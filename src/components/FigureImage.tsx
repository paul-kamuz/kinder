import { useState } from 'react'
import { figureImageUrl } from '../data/catalog'
import type { CollectibleItem } from '../data/types'

interface Props {
  item: CollectibleItem
  collected: boolean
  /** Tiles render many images; the sheet renders one big one. */
  size: 'tile' | 'sheet'
}

export function FigureImage({ item, collected, size }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className={`figure-image figure-image--${size} figure-image--emoji`} aria-hidden="true">
        {item.emoji}
      </span>
    )
  }

  return (
    <img
      className={`figure-image figure-image--${size}`}
      src={figureImageUrl(item.imageKey)}
      alt=""
      width={214}
      height={375}
      // Tiles below the fold load lazily; decoding async keeps taps responsive.
      loading={size === 'tile' ? 'lazy' : 'eager'}
      decoding="async"
      data-collected={collected}
      onError={() => setFailed(true)}
      draggable={false}
    />
  )
}
