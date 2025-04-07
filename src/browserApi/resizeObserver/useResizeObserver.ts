import { createResizeObserverStore } from '@/browserApi/resizeObserver/store.ts';
import type { RefObject } from 'react';
import { useState, useSyncExternalStore } from 'react';

/**
 * Custom Hook: useResizeObserver
 *
 * Provides a reactive interface to monitor the size changes of a target element using the `ResizeObserver` API.
 * This hook uses `useSyncExternalStore` to ensure consistent state updates across components.
 *
 * @template T - A `RefObject` pointing to the target HTML element to observe.
 * @param target - A `RefObject` of the element to be observed.
 * @param options - Optional configuration options for the `ResizeObserver`.
 * @returns An object representing the current resize state of the target element.
 *          Example: `{ isReady: boolean, contentRect: DOMRectReadOnly }`
 *
 * @example
 * const myRef = useRef<HTMLDivElement>(null);
 * const { isReady, contentRect } = useResizeObserver(myRef);
 *
 * if (isReady) {
 *   console.log('Element size:', contentRect.width, contentRect.height);
 * }
 *
 * @note
 * This hook relies on an external store created by `createResizeObserverStore` to manage the resize state.
 * It ensures that changes to the element's size are reflected in all components using this hook.
 */
export const useResizeObserver = <T extends RefObject<HTMLElement | null>>(
  target: T,
  options?: ResizeObserverOptions,
) => {
  const [store] = useState(() => {
    return createResizeObserverStore(target, options);
  });

  return useSyncExternalStore<ReturnType<(typeof store)[1]>>(...store, () => {
    return {
      isReady: false,
    };
  });
};
