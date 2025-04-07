import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type DependencyList,
} from 'react';

/**
 * Custom Hook: useDebouncedCallback
 *
 * Provides a debounced version of a callback function. The callback will only be executed after the specified delay
 * has passed since the last invocation. This is useful for performance optimization in scenarios like handling
 * user input or API calls.
 *
 * @template T - The type of the callback function.
 * @param callback - The callback function to debounce.
 * @param dependencies - Dependency array for the hook. The debounced callback will be updated if any dependency changes.
 * @param milliseconds - The debounce delay in milliseconds. Defaults to `18ms`.
 * @returns A tuple containing:
 *          - The debounced callback function.
 *          - A boolean indicating whether the callback is pending execution.
 *
 * @example
 * const [debouncedCallback, isPending] = useDebouncedCallback(
 *   (value) => {
 *     console.log('Debounced value:', value);
 *   },
 *   [],
 *   300
 * );
 *
 * // Usage in an input field
 * <input
 *   onChange={(e) => debouncedCallback(e.target.value)}
 * />
 *
 * if (isPending) {
 *   console.log('Waiting for debounce delay...');
 * }
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
 *         "additionalHooks": "(useDebouncedCallback)"
 *       }
 *     ]
 *   }
 * }
 * ```
 */
export const useDebouncedCallback = <
  T extends (...args: any[]) => void | Promise<void>,
>(
  callback: T,
  dependencies: DependencyList,
  milliseconds = 18,
) => {
  const callbackRef = useRef<T>(callback);
  const timeoutIdRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [isPending, setIsPending] = useState<boolean>(false);
  callbackRef.current = callback;

  const clearTimeoutId = () => {
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = undefined;
  };

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      setIsPending(() => true);
      if (typeof timeoutIdRef.current !== 'undefined') {
        clearTimeoutId();
      }

      timeoutIdRef.current = setTimeout(() => {
        setIsPending(() => false);
        void callbackRef.current(...args);
      }, milliseconds);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [milliseconds, ...dependencies],
  );

  useEffect(() => {
    return () => {
      clearTimeoutId();
    };
  }, []);

  return [debouncedCallback, isPending] as const;
};
