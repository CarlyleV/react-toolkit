import { useEffect, useRef } from 'react';

/**
 * Custom Hook: usePrevious
 *
 * Tracks the previous value of a state or prop. This hook is useful for comparing the current value with the previous one.
 *
 * @template T - The type of the value to track.
 * @param state - The current state or prop value to track.
 * @returns The previous value of the state or prop, or `undefined` if it is the first render.
 *
 * @example
 * const [count, setCount] = useState(0);
 * const previousCount = usePrevious(count);
 *
 * useEffect(() => {
 *   if (previousCount !== undefined) {
 *     console.log(`Previous count: ${previousCount}, Current count: ${count}`);
 *   }
 * }, [count, previousCount]);
 */
export const usePrevious = <T>(state: T) => {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  return ref.current;
};
