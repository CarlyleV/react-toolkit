type Store<T> = {
  current: [T, boolean];
};

export const createDebouncedValueStore = <T>(
  value: T,
  milliseconds: number,
) => {
  const state: Store<T> = {
    current: [value, false],
  };

  let isInitialized = false;
  let timeoutId: NodeJS.Timeout | undefined;
  const listeners = new Set<() => void>();

  const clearTimeoutId = () => {
    clearTimeout(timeoutId);
    timeoutId = undefined;
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
      clearTimeoutId();
    };
  };

  const emitChange = () => {
    listeners.forEach((listener) => listener());
  };

  const setValue = (newState: T) => {
    if (!isInitialized) {
      isInitialized = true;
      return;
    }

    clearTimeoutId();
    state.current = [state.current[0], true];
    emitChange();

    timeoutId = setTimeout(() => {
      state.current = [newState, false];
      emitChange();
    }, milliseconds);
  };

  const getSnapShot = () => state.current;

  return [setValue, subscribe, getSnapShot] as const;
};
