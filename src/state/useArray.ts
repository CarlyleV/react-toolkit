import { useState } from 'react';

/**
 * Custom Hook: useArray
 *
 * Provides a reactive interface for managing an array with utility functions for common operations.
 *
 * @template T - The type of the elements in the array.
 * @param initialState - The initial state of the array. Can be an array of values or a function that returns an array.
 * @returns An object containing:
 *          - `array`: The current state of the array.
 *          - `push`: A function to add one or more items to the end of the array.
 *          - `filter`: A function to filter the array based on a callback function.
 *          - `updateAt`: A function to update an item at a specific index.
 *          - `remove`: A function to remove an item at a specific index.
 *          - `clear`: A function to clear all items from the array.
 *          - `shift`: A function to remove the first item from the array.
 *          - `unshift`: A function to add one or more items to the beginning of the array.
 *          - `pop`: A function to remove the last item from the array.
 *          - `reset`: A function to reset the array to a new value.
 *
 * @example
 * const {
 *   array,
 *   push,
 *   filter,
 *   updateAt,
 *   remove,
 *   clear,
 *   shift,
 *   unshift,
 *   pop,
 *   reset,
 * } = useArray<number>([1, 2, 3]);
 *
 * // Add items to the array
 * push(4, 5);
 *
 * // Filter the array
 * filter((value) => value > 2);
 *
 * // Update an item at a specific index
 * updateAt(0, (prev) => prev * 2);
 *
 * // Remove an item at a specific index
 * remove(1);
 *
 * // Clear the array
 * clear();
 *
 * // Add items to the beginning of the array
 * unshift(0);
 *
 * // Remove the first item
 * shift();
 *
 * // Remove the last item
 * pop();
 *
 * // Reset the array to a new value
 * reset([10, 20, 30]);
 *
 * console.log('Current array:', array);
 */
export const useArray = <T>(initialState: T[] | (() => T[]) = []) => {
  const [array, setArray] = useState<T[]>(initialState);

  const push = (...items: T[]) => {
    setArray((prev) => [...prev, ...items]);
  };

  const filter = (
    callback: (value: T, index: number, array: T[]) => boolean,
  ) => {
    setArray((prev) => prev.filter(callback));
  };

  const updateAt = (index: number, value: (previous: T) => T) => {
    setArray((prev) => {
      const clone = [...prev];
      clone[index] = value(clone[index]);
      return clone;
    });
  };

  const remove = (index: number) => {
    setArray((prev) => {
      const clone = [...prev];
      clone.splice(index, 1);
      return clone;
    });
  };

  const clear = () => {
    setArray([]);
  };

  const shift = () => {
    setArray((prev) => {
      const clone = [...prev];
      clone.shift();
      return clone;
    });
  };

  const unshift = (...items: T[]) => {
    setArray((prev) => {
      const clone = [...prev];
      clone.unshift(...items);
      return clone;
    });
  };

  const pop = () => {
    setArray((prev) => {
      const clone = [...prev];
      clone.pop();
      return clone;
    });
  };

  const reset = (value: Parameters<typeof setArray>[0]) => {
    setArray(value);
  };

  return {
    array,
    push,
    filter,
    updateAt,
    remove,
    clear,
    shift,
    unshift,
    pop,
    reset,
  };
};
