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
export const useLocalStorageDispatcher = <T>(
  key: string,
  stringify: (value: T) => string = JSON.stringify,
) => {
  const set = (value: T) => {
    const newValue = stringify(value);
    const oldValue = localStorage.getItem(key);
    localStorage.setItem(key, newValue);
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: key,
        newValue,
        oldValue,
        storageArea: localStorage,
        url: window.location.href,
      }),
    );
  };

  const remove = () => {
    const oldValue = localStorage.getItem(key);
    localStorage.removeItem(key);
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: key,
        newValue: null,
        oldValue,
        storageArea: localStorage,
        url: window.location.href,
      }),
    );
  };

  return {
    set,
    remove,
  };
};
