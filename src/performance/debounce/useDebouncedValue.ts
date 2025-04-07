import { createDebouncedValueStore } from '@/performance/debounce/store.ts';
import { useEffect, useState, useSyncExternalStore } from 'react';

/**
 * Custom Hook: useDebouncedValue
 *
 * Provides a debounced version of a state value. The returned value will only update after the specified delay
 * has passed since the last state change. This is useful for scenarios like delaying API calls or expensive computations.
 *
 * @template T - The type of the state value.
 * @param state - The current state value to debounce.
 * @param milliseconds - The debounce delay in milliseconds.
 * @returns A tuple containing:
 *          - The debounced state value.
 *          - A boolean indicating whether the value is pending update.
 *
 * @example
 * const [debouncedValue, isPending] = useDebouncedValue(inputValue, 300);
 *
 * useEffect(() => {
 *   if (!isPending) {
 *     console.log('Debounced value:', debouncedValue);
 *   }
 * }, [debouncedValue, isPending]);
 *
 * @note
 * This hook relies on an external store created by `createDebouncedValueStore` to manage the debounced state.
 * It ensures consistent updates across components using this hook.
 */
export const useDebouncedValue = <T>(state: T, milliseconds: number) => {
  const [[setValue, ...store]] = useState<
    ReturnType<typeof createDebouncedValueStore<T>>
  >(() => createDebouncedValueStore<T>(state, milliseconds));

  useEffect(() => {
    setValue(state);
  }, [setValue, state]);

  return useSyncExternalStore<ReturnType<(typeof store)[1]>>(...store, () => [
    state,
    false,
  ]);
};
