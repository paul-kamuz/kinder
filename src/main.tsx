import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/app.css'

/**
 * Show a new deploy on the first open, not the second.
 *
 * The service worker serves the app from its precache, so after a deploy the
 * page renders the previous build while the new worker installs in the
 * background -- the change only appears on the next open. autoUpdate makes the
 * new worker take over immediately (skipWaiting + clientsClaim), which fires
 * `controllerchange`; reloading there picks up the new assets at once.
 *
 * Collected state lives in localStorage, so a reload costs nothing.
 */
function reloadOnServiceWorkerUpdate() {
  if (!('serviceWorker' in navigator)) return

  // On a first-ever visit the page starts with no controller, and the initial
  // claim also fires controllerchange. That is not an update, so ignore it --
  // otherwise every new visitor gets a pointless reload.
  const hadController = Boolean(navigator.serviceWorker.controller)
  let reloading = false

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloading) return
    reloading = true
    window.location.reload()
  })
}

reloadOnServiceWorkerUpdate()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
