import { useEffect, useState } from 'react'

/**
 * Minimal hash route: '' for the picker, '#/c/<id>' for a grid.
 * Using the hash (rather than component state) means the phone's back
 * gesture and the browser back button close the grid, which is what a
 * user expects from an installed app.
 */
export function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const match = /^#\/c\/(.+)$/.exec(hash)
  return {
    collectionId: match ? decodeURIComponent(match[1]) : null,
    open: (id: string) => {
      window.location.hash = `/c/${encodeURIComponent(id)}`
    },
    back: () => window.history.back(),
  }
}
