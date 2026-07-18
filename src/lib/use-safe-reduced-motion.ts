'use client';

import {useSyncExternalStore} from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function getMediaQueryList() {
  return window.matchMedia(QUERY);
}

function subscribe(onChange: () => void) {
  const mql = getMediaQueryList();
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

function getSnapshot() {
  return getMediaQueryList().matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * SSR-safe reduced-motion preference. A direct `useReducedMotion()` (from
 * framer-motion) reads matchMedia synchronously on the client's first
 * render, before hydration reconciliation, while SSR always assumes no
 * preference — any component branching its output on it then fails to
 * hydrate for reduced-motion users. `useSyncExternalStore`'s server snapshot
 * keeps the first client render consistent with SSR; the real preference
 * applies once React resyncs the external store afterward.
 */
export function useSafeReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
