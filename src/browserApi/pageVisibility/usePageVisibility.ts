import { createPageVisibilityStore } from '@/browserApi/pageVisibility/store.ts';
import { useState, useSyncExternalStore } from 'react';

/**
 * Custom Hook: usePageVisibility
 *
 * Provides a reactive interface to monitor the visibility state of the current page.
 * This hook uses `useSyncExternalStore` to ensure consistent state updates across components.
 *
 * @returns An object representing the current visibility state of the page.
 *          Example: `{ isReady: boolean, isVisible: boolean }`
 *
 * @example
 * const { isVisible } = usePageVisibility();
 *
 * if (isVisible) {
 *   console.log('The page is visible');
 * } else {
 *   console.log('The page is hidden');
 * }
 *
 * @note
 * This hook relies on an external store created by `createPageVisibilityStore` to manage the visibility state.
 * It ensures that changes to the page visibility are reflected in all components using this hook.
 */
export const usePageVisibility = () => {
  const [store] = useState(() => {
    return createPageVisibilityStore();
  });

  return useSyncExternalStore<ReturnType<(typeof store)[1]>>(...store, () => {
    return {
      isReady: false,
    };
  });
};
