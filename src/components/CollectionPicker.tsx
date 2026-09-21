import { catalog } from '../data/catalog'
import { countCollected, type CollectedState } from '../lib/store'
import { ProgressBar } from './ProgressBar'

interface Props {
  collected: CollectedState
  onOpen: (collectionId: string) => void
}

export function CollectionPicker({ collected, onOpen }: Props) {
  return (
    <main className="screen">
      <h1 className="screen__title">My Collections</h1>

      <ul className="picker">
        {catalog.map((collection) => {
          const ids = collection.items.map((item) => item.id)
          const have = countCollected(collected, collection.id, ids)
          return (
            <li key={collection.id}>
              <button className="card" type="button" onClick={() => onOpen(collection.id)}>
                <span className="card__emoji" aria-hidden="true">
                  {collection.emoji}
                </span>
                <span className="card__body">
                  <span className="card__name">{collection.name}</span>
                  <span className="card__count">
                    {have} of {collection.items.length} collected
                  </span>
                  <ProgressBar collected={have} total={collection.items.length} />
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
