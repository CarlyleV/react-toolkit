import { createLocalStorageSelectorStore } from '@/browserApi/localStorage/store.ts';
import { useState, useSyncExternalStore } from 'react';

/**
 * Custom Hook: useLocalStorageSelector
 *
 * Provides a reactive interface to read and subscribe to changes in a specific `localStorage` key.
 * This hook uses `useSyncExternalStore` to ensure consistent state updates across components.
 *
 * @template T - The type of the value stored in `localStorage`.
 * @param key - The key in `localStorage` to observe.
 * @param initialState - The initial state to use if the key does not exist in `localStorage`.
 *                       Can be a value or a function that returns a value.
 * @param parse - An optional function to parse the value retrieved from `localStorage`. Defaults to `JSON.parse`.
 * @returns A tuple containing:
 *          - The current value associated with the key in `localStorage`.
 *          - A boolean indicating whether the value is ready (e.g., after initialization).
 *
 * @example
 * const [value, isReady] = useLocalStorageSelector<string>('my-key', 'default-value');
 *
 * if (isReady) {
 *   console.log('Current value:', value);
 * }
 *
 * @note
 * This hook relies on an external store created by `createLocalStorageSelectorStore` to manage the state.
 * It ensures that changes to `localStorage` are reflected in all components using this hook.
 */
export const useLocalStorageSelector = <T>(
  key: string,
  initialState: T | (() => T),
  parse: (value: string) => T = JSON.parse,
) => {
  const [[store, initialedState]] = useState(() => {
    const state =
      typeof initialState === 'function' ?
        (initialState as () => T)()
      : initialState;

    return [createLocalStorageSelectorStore(key, state, parse), state] as const;
  });

  return useSyncExternalStore<ReturnType<(typeof store)[1]>>(...store, () => {
    return [initialedState, false];
  });
};
