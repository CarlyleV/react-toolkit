import type { DependencyList, RefObject } from 'react';
import { useEffect, useRef } from 'react';

export type IntersectionObserverEffectCallback = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver,
) => void | Promise<void>;

/**
 * Custom Hook: useIntersectionObserverEffect
 *
 * Subscribes to an `IntersectionObserver` for a target element and triggers a callback whenever the intersection state changes.
 * This hook manages the lifecycle of the `IntersectionObserver` and ensures proper cleanup.
 *
 * @template T - A `RefObject` pointing to the target HTML element to observe.
 * @param callback - A function to be executed whenever the intersection state of the target element changes.
 * @param dependencies - Dependency array for the hook. The effect will re-run if any dependency changes.
 * @param target - A `RefObject` of the element to be observed.
 * @param options - Optional configuration options for the `IntersectionObserver` (e.g., `root`, `rootMargin`, `threshold`).
 *
 * @example
 * const myRef = useRef<HTMLDivElement>(null);
 * useIntersectionObserverEffect(
 *   (entry, observer) => {
 *     if (entry.isIntersecting) {
 *       console.log('Element is in view!');
 *     } else {
 *       console.log('Element is out of view!');
 *     }
 *   },
 *   [],
 *   myRef,
 *   { threshold: 0.5 }
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
 *         "additionalHooks": "(useIntersectionObserverEffect)"
 *       }
 *     ]
 *   }
 * }
 * ```
 */
export const useIntersectionObserverEffect = <
  T extends RefObject<HTMLElement | null>,
>(
  callback: IntersectionObserverEffectCallback,
  dependencies: DependencyList,
  target: T,
  options?: IntersectionObserverInit,
) => {
  const callbackRef = useRef<IntersectionObserverEffectCallback>(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (target.current === null) {
      return;
    }

    const observer = new IntersectionObserver((es, o) => {
      void callbackRef.current(es[0], o);
    }, options);

    observer.observe(target.current);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, ...dependencies]);
};
