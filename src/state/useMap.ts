import { useState } from 'react';

/**
 * Custom Hook: useMap
 *
 * Provides a reactive interface for managing a `Map`-like collection of key-value pairs.
 *
 * @template T - The type of the object used as the map.
 * @param initialState - The initial state of the map. Can be an object or a function that returns an object.
 * @returns An object containing:
 *          - `state`: The current state of the map as an object.
 *          - `set`: A function to add or update a key-value pair in the map.
 *          - `get`: A function to retrieve the value associated with a specific key.
 *          - `has`: A function to check if a specific key exists in the map.
 *          - `remove`: A function to remove a key-value pair from the map.
 *          - `clear`: A function to clear all key-value pairs from the map.
 *
 * @example
 * const { state, set, get, has, remove, clear } = useMap<{ [key: string]: number }>({
 *   key1: 1,
 *   key2: 2,
 * });
 *
 * // Add or update a key-value pair
 * set('key3', 3);
 *
 * // Retrieve a value by key
 * console.log(get('key1')); // Output: 1
 *
 * // Check if a key exists
 * if (has('key2')) {
 *   console.log('Key exists');
 * }
 *
 * // Remove a key-value pair
 * remove('key1');
 *
 * // Clear all key-value pairs
 * clear();
 *
 * console.log('Current state:', state);
 */
export const useMap = <T extends Record<string | number | symbol, T[keyof T]>>(
  initialState: T | (() => T) = {} as T,
) => {
  const [state, setState] = useState<T>(initialState);

  const set = (key: keyof T, value: T[keyof T]) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const get = (key: keyof T) => {
    return state[key];
  };

  const remove = (key: keyof T) => {
    setState((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest as T;
    });
  };

  const has = (key: keyof T) => {
    return key in state;
  };

  const clear = () => {
    setState({} as T);
  };

  return {
    state,
    set,
    get,
    has,
    clear,
    remove,
  } as const;
};
