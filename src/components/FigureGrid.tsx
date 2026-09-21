import { useState } from 'react'
import { figureGroups } from '../data/catalog'
import type { CollectibleItem, FigureCollection } from '../data/types'
import { countCollected, isCollected, type CollectedState } from '../lib/store'
import { ConfirmSheet } from './ConfirmSheet'
import { PairCard } from './PairCard'

interface Props {
  collection: FigureCollection
  collected: CollectedState
  onToggle: (itemId: string) => void
  onBack: () => void
}

export function FigureGrid({ collection, collected, onToggle, onBack }: Props) {
  const [selected, setSelected] = useState<CollectibleItem | null>(null)
  const ids = collection.items.map((item) => item.id)
  const have = countCollected(collected, collection.id, ids)
  const groups = figureGroups(collection)

  return (
    <main className="screen">
      <header className="topbar">
        <button className="topbar__back" type="button" onClick={onBack}>
          <BackIcon />
          <span>Collections</span>
        </button>
      </header>

      <h1 className="screen__title">{collection.name}</h1>
      <p className="screen__count">
        {have} of {collection.items.length} collected
      </p>

      <div className="grid">
        {groups.map((group) => (
          <PairCard
            key={group.map((item) => item.id).join('+')}
            items={group}
            isCollected={(item) => isCollected(collected, collection.id, item.id)}
            onSelect={setSelected}
          />
        ))}
      </div>

      {selected && (
        <ConfirmSheet
          // Remount per figure so the dialog opens fresh each time.
          key={selected.id}
          item={selected}
          collected={isCollected(collected, collection.id, selected.id)}
          onConfirm={() => {
            onToggle(selected.id)
            setSelected(null)
          }}
          onDismiss={() => setSelected(null)}
        />
      )}
    </main>
  )
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path
        d="M15 5l-7 7 7 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
