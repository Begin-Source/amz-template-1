"use client"

import * as React from "react"

const QUERY = "(min-width: 1024px)"

function subscribe(onStoreChange: () => void) {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener("change", onStoreChange)
  return () => mql.removeEventListener("change", onStoreChange)
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches
}

function getServerSnapshot() {
  return false
}

/** True when viewport is lg breakpoint or wider (Tailwind lg = 1024px). */
export function useIsLg() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
