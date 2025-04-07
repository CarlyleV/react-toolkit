import { createMatchMediaStore } from '@/browserApi/matchMedia/store.ts';
import { useState, useSyncExternalStore } from 'react';

/**
 * Custom Hook: useMatchMedia
 *
 * Provides a reactive interface to monitor a media query's match state.
 * This hook uses `useSyncExternalStore` to subscribe to changes in the media query state.
 *
 * @param query - The media query string to monitor (e.g., '(max-width: 768px)').
 * @returns An object representing the current state of the media query.
 *          Example: `{ isReady: boolean }`
 *
 * @example
 * const { isReady } = useMatchMedia('(max-width: 768px)');
 * if (isReady) {
 *   console.log('The viewport matches the query');
 * } else {
 *   console.log('The viewport does not match the query');
 * }
 *
 * @note
 * This hook relies on an external store created by `createMatchMediaStore` to manage the media query state.
 */
export const useMatchMedia = (query: string) => {
  const [store] = useState(() => createMatchMediaStore(query));

  return useSyncExternalStore<ReturnType<(typeof store)[1]>>(...store, () => ({
    isReady: false,
  }));
};
