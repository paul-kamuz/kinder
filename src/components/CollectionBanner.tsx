import { useState } from 'react'
import { collectionBannerUrl } from '../data/catalog'
import type { FigureCollection } from '../data/types'

/**
 * The card's hero image. Falls back to the collection's emoji on a band of the
 * same 16:9 shape, so a missing or broken image never changes the card's size.
 */
export function CollectionBanner({ collection }: { collection: FigureCollection }) {
  const [failed, setFailed] = useState(false)

  if (!collection.bannerKey || failed) {
    return (
      <span className="card__banner card__banner--fallback" aria-hidden="true">
        {collection.emoji}
      </span>
    )
  }

  return (
    <img
      className="card__banner"
      src={collectionBannerUrl(collection.bannerKey)}
      alt=""
      width={1140}
      height={642}
      decoding="async"
      onError={() => setFailed(true)}
      draggable={false}
    />
  )
}
