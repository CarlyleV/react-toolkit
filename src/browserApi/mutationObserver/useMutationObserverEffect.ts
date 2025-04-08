import { useEffect, useRef, type DependencyList, type RefObject } from 'react';

export type MutationObserverEffectCallback = (
  mutations: MutationRecord,
  observer: MutationObserver,
) => void | Promise<void>;

/**
 * Custom Hook: useMutationObserverEffect
 *
 * Subscribes to a `MutationObserver` for a target element and triggers a callback whenever mutations are observed.
 * This hook manages the lifecycle of the `MutationObserver` and ensures proper cleanup.
 *
 * @template T - A `RefObject` pointing to the target HTML element to observe.
 * @param callback - A function to be executed whenever mutations are observed on the target element.
 *                   The callback receives the first `MutationRecord` and the `MutationObserver` instance.
 * @param dependencies - Dependency array for the hook. The effect will re-run if any dependency changes.
 * @param target - A `RefObject` of the element to be observed.
 * @param options - Optional configuration options for the `MutationObserver` (e.g., `attributes`, `childList`, `subtree`).
 *
 * @example
 * const myRef = useRef<HTMLDivElement>(null);
 * useMutationObserverEffect(
 *   (mutation, observer) => {
 *     console.log('Mutation observed:', mutation);
 *   },
 *   [],
 *   myRef,
 *   { attributes: true, childList: true, subtree: true }
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
 *         "additionalHooks": "(useMutationObserverEffect)"
 *       }
 *     ]
 *   }
 * }
 * ```
 */
export const useMutationObserverEffect = <
  T extends RefObject<HTMLElement | null>,
>(
  callback: MutationObserverEffectCallback,
  dependencies: DependencyList,
  target: T,
  options?: MutationObserverInit,
) => {
  const callbackRef = useRef<MutationObserverEffectCallback>(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (target.current === null) {
      return;
    }

    const observer = new MutationObserver((ms, o) => {
      void callbackRef.current(ms[0], o);
    });

    observer.observe(target.current, options);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, ...dependencies]);
};
