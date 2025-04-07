import { createIntersectionObserverStore } from '@/browserApi/intersectionObserver/store.ts';
import { useState, useSyncExternalStore, type RefObject } from 'react';

/**
 * Custom Hook: useIntersectionObserver
 *
 * Provides a reactive interface to monitor the intersection state of a target element.
 * This hook uses `useSyncExternalStore` to subscribe to changes in the intersection state.
 *
 * @template T - A `RefObject` pointing to the target HTML element to observe.
 * @param target - A `RefObject` of the element to be observed.
 * @param options - Configuration options for the `IntersectionObserver` (e.g., `root`, `rootMargin`, `threshold`).
 * @returns An object representing the current intersection state of the target element.
 *          Example: `{ isReady: boolean, isIntersecting: boolean, intersectionRatio: number }`
 *
 * @example
 * const { isIntersecting } = useIntersectionObserver(myRef, {
 *   root: null,
 *   rootMargin: '0px',
 *   threshold: 0.5,
 * });
 *
 * if (isIntersecting) {
 *   console.log('The element is in view!');
 * }
 *
 * @note
 * This hook relies on an external store created by `createIntersectionObserverStore` to manage the intersection state.
 */
export const useIntersectionObserver = <
  T extends RefObject<HTMLElement | null>,
>(
  target: T,
  options: IntersectionObserverInit,
) => {
  const [store] = useState(() => {
    return createIntersectionObserverStore(target, options);
  });

  return useSyncExternalStore<ReturnType<(typeof store)[1]>>(...store, () => {
    return {
      isReady: false,
    };
  });
};
