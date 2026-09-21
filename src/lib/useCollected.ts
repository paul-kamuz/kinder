import { useCallback, useState } from 'react'
import {
  loadCollected,
  saveCollected,
  toggleCollected,
  type CollectedState,
} from './store'

export function useCollected() {
  // Lazy initialiser: read localStorage once, not on every render.
  const [collected, setCollected] = useState<CollectedState>(loadCollected)

  const toggle = useCallback((collectionId: string, itemId: string) => {
    setCollected((current) => {
      const next = toggleCollected(current, collectionId, itemId)
      saveCollected(next)
      return next
    })
  }, [])

  return { collected, toggle }
}
