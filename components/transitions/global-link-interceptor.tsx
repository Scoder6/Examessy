'use client'

/**
 * Intercepts ALL <a> clicks site-wide and routes them through the wormhole.
 * Attach this once inside WormholeTransitionProvider.
 */
import { useEffect } from 'react'
import { usePageTransition } from './wormhole-transition'

export function GlobalLinkInterceptor() {
  const { navigateTo, isTransitioning } = usePageTransition()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // ignore modified clicks
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      // walk up the DOM to find an anchor
      let el = e.target as HTMLElement | null
      while (el && el.tagName !== 'A') el = el.parentElement

      const a = el as HTMLAnchorElement | null
      if (!a || !a.href) return

      // only intercept same-origin internal paths
      try {
        const url = new URL(a.href)
        if (url.origin !== window.location.origin) return
        if (url.pathname === window.location.pathname) return
        if (url.hash) return              // anchor jumps stay native
        if (a.target === '_blank') return  // new-tab links stay native
        if (a.getAttribute('data-no-wormhole') !== null) return // opt-out

        e.preventDefault()
        if (!isTransitioning) navigateTo(url.pathname + url.search)
      } catch { /* external or non-parseable — ignore */ }
    }

    document.addEventListener('click', handler, { capture: true })
    return () => document.removeEventListener('click', handler, { capture: true })
  }, [navigateTo, isTransitioning])

  return null
}
