/**
 * Custom Hook: useLocalStorageDispatcher
 *
 * Provides utility functions to interact with `localStorage` while dispatching a `StorageEvent` to notify other parts of the application about changes.
 *
 * @template T - The type of the value to be stored in `localStorage`.
 * @param key - The key under which the value will be stored in `localStorage`.
 * @param stringify - An optional function to serialize the value before storing it. Defaults to `JSON.stringify`.
 * @returns An object containing two functions:
 *          - `set`: Stores a value in `localStorage` and dispatches a `StorageEvent`.
 *          - `remove`: Removes the value from `localStorage` and dispatches a `StorageEvent`.
 *
 * @example
 * const { set, remove } = useLocalStorageDispatcher<string>('my-key');
 *
 * // Store a value
 * set('Hello, world!');
 *
 * // Remove the value
 * remove();
 *
 * @note
 * This hook is useful for scenarios where you need to synchronize `localStorage` changes across different browser tabs or windows.
 */
export const useLocalStorageDispatcher = <T>(
  key: string,
  stringify: (value: T) => string = JSON.stringify,
) => {
  const set = (value: T) => {
    const newValue = stringify(value);
    const oldValue = localStorage.getItem(key);
    localStorage.setItem(key, newValue);
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: key,
        newValue,
        oldValue,
        storageArea: localStorage,
        url: window.location.href,
      }),
    );
  };

  const remove = () => {
    const oldValue = localStorage.getItem(key);
    localStorage.removeItem(key);
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: key,
        newValue: null,
        oldValue,
        storageArea: localStorage,
        url: window.location.href,
      }),
    );
  };

  return {
    set,
    remove,
  };
};
