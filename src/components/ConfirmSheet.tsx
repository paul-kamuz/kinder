import { useEffect, useRef } from 'react'
import type { CollectibleItem } from '../data/types'
import { FigureImage } from './FigureImage'

interface Props {
  item: CollectibleItem
  collected: boolean
  onConfirm: () => void
  onDismiss: () => void
}

export function ConfirmSheet({ item, collected, onConfirm, onDismiss }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // <dialog showModal> gives focus trapping, inertness of the page behind,
  // and Escape-to-close without reimplementing any of it.
  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  return (
    <dialog
      className="sheet"
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault()
        onDismiss()
      }}
      onClick={(event) => {
        // A click landing on the dialog itself (not its content) is the backdrop.
        if (event.target === dialogRef.current) onDismiss()
      }}
    >
      <div className="sheet__body">
        <div className="sheet__grabber" aria-hidden="true" />

        <div className="sheet__art">
          <FigureImage item={item} collected={collected} size="sheet" />
        </div>

        <h2 className={`sheet__name${collected ? ' name-outlined' : ''}`}>{item.name}</h2>
        <p className="sheet__question">
          {collected ? 'Do you want to take it out of your collection?' : 'Do you have this one?'}
        </p>

        <div className="sheet__actions">
          <button
            className={collected ? 'btn btn--danger' : 'btn btn--go'}
            type="button"
            onClick={onConfirm}
            autoFocus
          >
            {collected ? (
              'Remove'
            ) : (
              <>
                <CheckIcon /> Yes, I have it!
              </>
            )}
          </button>
          <button className="btn btn--quiet" type="button" onClick={onDismiss}>
            {collected ? 'Keep it' : 'Not yet'}
          </button>
        </div>
      </div>
    </dialog>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
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
