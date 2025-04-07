import { useState } from 'react';

/**
 * Custom Hook: useQueue
 *
 * Provides a reactive interface for managing a queue (FIFO - First In, First Out) with utility functions for common operations.
 *
 * @template T - The type of the elements in the queue.
 * @param initialValue - The initial state of the queue. Can be an array of values or a function that returns an array.
 * @param options - Optional callbacks for queue operations:
 *                  - `onEnqueue`: Called when items are added to the queue.
 *                  - `onDequeue`: Called when an item is removed from the queue.
 *                  - `onClear`: Called when the queue is cleared.
 * @returns An object containing:
 *          - `queue`: The current state of the queue as an array.
 *          - `enqueue`: A function to add one or more items to the end of the queue.
 *          - `dequeue`: A function to remove and return the first item from the queue.
 *          - `peek`: A function to view the first item in the queue without removing it.
 *          - `clear`: A function to clear all items from the queue.
 *
 * @example
 * const { queue, enqueue, dequeue, peek, clear } = useQueue<number>([1, 2, 3], {
 *   onEnqueue: (newQueue) => console.log('Enqueued:', newQueue),
 *   onDequeue: (newQueue) => console.log('Dequeued:', newQueue),
 *   onClear: () => console.log('Queue cleared'),
 * });
 *
 * // Add items to the queue
 * enqueue(4, 5);
 *
 * // View the first item
 * console.log('Peek:', peek());
 *
 * // Remove the first item
 * console.log('Dequeued item:', dequeue());
 *
 * // Clear the queue
 * clear();
 *
 * console.log('Current queue:', queue);
 */
export const useQueue = <T>(
  initialValue: T[] | (() => T[]) = [],
  {
    onEnqueue,
    onDequeue,
    onClear,
  }: {
    onEnqueue?: (value: T[]) => void;
    onDequeue?: (value: T[]) => void;
    onClear?: () => void;
  } = {},
) => {
  const [queue, setQueue] = useState<T[]>(initialValue);

  const enqueue = (...value: T[]) => {
    setQueue((prev) => {
      const next = [...prev, ...value];
      onEnqueue?.(queue);
      return next;
    });
  };

  const dequeue = () => {
    setQueue((prev) => {
      if (prev.length === 0) {
        return prev;
      }

      const [, ...rest] = prev;
      onDequeue?.(rest);
      return rest;
    });
    return queue[0];
  };

  const peek = () => {
    return queue[0];
  };

  const clear = () => {
    setQueue([]);
    onClear?.();
  };

  return {
    queue,
    enqueue,
    dequeue,
    peek,
    clear,
  } as const;
};
