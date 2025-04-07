import { createThrottledValueStore } from '@/performance/throttle/store.ts';
import { useEffect, useState, useSyncExternalStore } from 'react';

/**
 * Custom Hook: useThrottledValue
 *
 * Provides a throttled version of a state value. The returned value will only update at most once
 * within the specified time interval, even if the state changes multiple times. This is useful for
 * performance optimization in scenarios like handling frequent updates from user input or animations.
 *
 * @template T - The type of the state value.
 * @param state - The current state value to throttle.
 * @param milliseconds - The throttle interval in milliseconds.
 * @returns The throttled state value.
 *
 * @example
 * const throttledValue = useThrottledValue(inputValue, 300);
 *
 * useEffect(() => {
 *   console.log('Throttled value:', throttledValue);
 * }, [throttledValue]);
 *
 * @note
 * This hook relies on an external store created by `createThrottledValueStore` to manage the throttled state.
 * It ensures consistent updates across components using this hook.
 */
export const useThrottledValue = <T>(state: T, milliseconds: number) => {
  const [[setValue, ...store]] = useState(() =>
    createThrottledValueStore<T>(state, milliseconds),
  );

  useEffect(() => {
    setValue(state);
  }, [setValue, state]);

  return useSyncExternalStore(...store, () => state);
};
