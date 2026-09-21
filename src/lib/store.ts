// Persisted user state: which item ids are collected, per collection.
// Shape: { [collectionId]: itemId[] }. Kept deliberately small and boring so
// it survives catalog changes -- unknown ids are simply ignored on read.

const STORAGE_KEY = 'collections:v1'

export type CollectedState = Record<string, string[]>

/**
 * localStorage throws in private mode, with site data blocked, and inside
 * some in-app browsers, so every access is guarded. A failed read means
 * "nothing collected yet"; a failed write means the change is only in memory
 * for this session, which is better than crashing the app.
 */
export function loadCollected(): CollectedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return {}

    const state: CollectedState = {}
    for (const [collectionId, ids] of Object.entries(parsed as Record<string, unknown>)) {
      if (Array.isArray(ids)) state[collectionId] = ids.filter((id) => typeof id === 'string')
    }
    return state
  } catch {
    return {}
  }
}

export function saveCollected(state: CollectedState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Ignore: the UI already reflects the change for this session.
  }
}

export function isCollected(state: CollectedState, collectionId: string, itemId: string): boolean {
  return state[collectionId]?.includes(itemId) ?? false
}

export function toggleCollected(
  state: CollectedState,
  collectionId: string,
  itemId: string,
): CollectedState {
  const current = state[collectionId] ?? []
  const next = current.includes(itemId)
    ? current.filter((id) => id !== itemId)
    : [...current, itemId]
  return { ...state, [collectionId]: next }
}

export function countCollected(
  state: CollectedState,
  collectionId: string,
  knownIds: readonly string[],
): number {
  const owned = state[collectionId]
  if (!owned) return 0
  // Count against the catalog so ids left over from a removed figure don't inflate progress.
  return knownIds.reduce((total, id) => (owned.includes(id) ? total + 1 : total), 0)
}
