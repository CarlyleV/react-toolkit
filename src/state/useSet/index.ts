import { createSetStore } from '@/state/useSet/store.ts';
import { useState, useSyncExternalStore } from 'react';

/**
 * Custom Hook: useSet
 *
 * Provides a reactive interface for managing a `Set`-like collection of unique values.
 * This hook uses `useSyncExternalStore` to ensure consistent state updates across components.
 *
 * @template T - The type of the values stored in the set.
 * @param initialState - The initial state of the set. Can be an array of values or a function that returns an array.
 * @returns An object containing:
 *          - `set`: The current state of the set as an array of unique values.
 *          - `add`: A function to add a value to the set.
 *          - `remove`: A function to remove a value from the set.
 *          - `has`: A function to check if a value exists in the set.
 *          - `clear`: A function to clear all values from the set.
 *
 * @example
 * const { set, add, remove, has, clear } = useSet<number>([1, 2, 3]);
 *
 * // Add a value
 * add(4);
 *
 * // Check if a value exists
 * if (has(2)) {
 *   console.log('Value exists in the set');
 * }
 *
 * // Remove a value
 * remove(1);
 *
 * // Clear the set
 * clear();
 *
 * console.log('Current set:', set);
 *
 * @note
 * This hook relies on an external store created by `createSetStore` to manage the set state.
 * It ensures that changes to the set are reflected in all components using this hook.
 */
export const useSet = <T>(initialState: T[] | (() => T[]) = []) => {
  const [
    [{ add, remove, has, clear, subscribe, getSnapShot }, initialedState],
  ] = useState(() => {
    const state =
      typeof initialState === 'function' ? initialState() : initialState;

    return [createSetStore(state), state] as const;
  });

  const set = useSyncExternalStore(subscribe, getSnapShot, () => {
    return [...new Set(initialedState)];
  });

  return {
    set,
    add,
    remove,
    has,
    clear,
  } as const;
};
