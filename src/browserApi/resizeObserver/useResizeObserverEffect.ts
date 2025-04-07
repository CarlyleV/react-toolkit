import type { DependencyList, RefObject } from 'react';
import { useEffect, useRef } from 'react';

export type ResizeObserverEffectCallback = (
  entry: ResizeObserverEntry,
  observer: ResizeObserver,
) => void;

/**
 * Custom Hook: useResizeObserverEffect
 *
 * Subscribes to a `ResizeObserver` for a target element and triggers a callback whenever the size of the element changes.
 * This hook manages the lifecycle of the `ResizeObserver` and ensures proper cleanup.
 *
 * @template T - A `RefObject` pointing to the target HTML element to observe.
 * @param callback - A function to be executed whenever the size of the target element changes.
 *                   The callback receives the first `ResizeObserverEntry` and the `ResizeObserver` instance.
 * @param dependencies - Dependency array for the hook. The effect will re-run if any dependency changes.
 * @param target - A `RefObject` of the element to be observed.
 * @param options - Optional configuration options for the `ResizeObserver`.
 *
 * @example
 * const myRef = useRef<HTMLDivElement>(null);
 * useResizeObserverEffect(
 *   (entry, observer) => {
 *     console.log('Element size changed:', entry.contentRect.width, entry.contentRect.height);
 *   },
 *   [],
 *   myRef
 * );
 *
 * @note
 * To ensure proper dependency management, configure ESLint with the following rule:
 *
 * ```json
 * {
 *   "rules": {
 *     "react-hooks/exhaustive-deps": [
 *       "warn",
 *       {
 *         "additionalHooks": "(useResizeObserverEffect)"
 *       }
 *     ]
 *   }
 * }
 * ```
 */
export const useResizeObserverEffect = <
  T extends RefObject<HTMLElement | null>,
>(
  callback: ResizeObserverEffectCallback,
  dependencies: DependencyList,
  target: T,
  options?: ResizeObserverOptions,
) => {
  const callbackRef = useRef<ResizeObserverEffectCallback>(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (target.current === null) {
      return;
    }

    const observer = new ResizeObserver((es, o) => {
      callbackRef.current(es[0], o);
    });

    observer.observe(target.current, options);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, ...dependencies]);
};
