import { useCallback, useEffect, useRef, type DependencyList } from 'react';

/**
 * Custom Hook: useThrottledCallback
 *
 * Provides a throttled version of a callback function. The callback will only be executed at most once
 * within the specified time interval, even if it is invoked multiple times. This is useful for performance
 * optimization in scenarios like handling scroll or resize events.
 *
 * @template T - The type of the callback function.
 * @param callback - The callback function to throttle.
 * @param dependencies - Dependency array for the hook. The throttled callback will be updated if any dependency changes.
 * @param milliseconds - The throttle interval in milliseconds. Defaults to `18ms`.
 * @returns The throttled callback function.
 *
 * @example
 * const throttledCallback = useThrottledCallback(
 *   (value) => {
 *     console.log('Throttled value:', value);
 *   },
 *   [],
 *   300
 * );
 *
 * // Usage in an event listener
 * <div onScroll={(e) => throttledCallback(e.target.scrollTop)} />
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
 *         "additionalHooks": "(useThrottledCallback)"
 *       }
 *     ]
 *   }
 * }
 * ```
 */
export const useThrottledCallback = <
  T extends (...args: any[]) => void | Promise<void>,
>(
  callback: T,
  dependencies: DependencyList,
  milliseconds = 18,
) => {
  const callbackRef = useRef<T>(callback);
  const timeoutIdRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastTimestampRef = useRef<number>(0);
  callbackRef.current = callback;

  const clearTimeoutId = () => {
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = undefined;
  };

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastTimestampRef.current >= milliseconds) {
        lastTimestampRef.current = now;
        void callbackRef.current(...args);
        return;
      }

      if (typeof timeoutIdRef.current !== 'undefined') {
        clearTimeoutId();
      }

      timeoutIdRef.current = setTimeout(
        () => {
          lastTimestampRef.current = Date.now();
          timeoutIdRef.current = undefined;
          void callbackRef.current(...args);
        },
        milliseconds - (now - lastTimestampRef.current),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [milliseconds, ...dependencies],
  );

  useEffect(() => {
    return () => {
      clearTimeoutId();
    };
  }, []);

  return throttledCallback;
};
