import { CollectionPicker } from './components/CollectionPicker'
import { FigureGrid } from './components/FigureGrid'
import { catalog } from './data/catalog'
import { useCollected } from './lib/useCollected'
import { useHashRoute } from './lib/useHashRoute'

export default function App() {
  const { collected, toggle } = useCollected()
  const { collectionId, open, back } = useHashRoute()

  const collection = catalog.find((entry) => entry.id === collectionId)

  // An unknown id (stale bookmark, hand-edited hash) falls back to the picker.
  if (!collection) return <CollectionPicker collected={collected} onOpen={open} />

  return (
    <FigureGrid
      collection={collection}
      collected={collected}
      onToggle={(itemId) => toggle(collection.id, itemId)}
      onBack={back}
    />
  )
}
