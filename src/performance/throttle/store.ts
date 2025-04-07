type Store<T> = {
  current: T;
};

export const createThrottledValueStore = <T>(
  value: T,
  milliseconds: number,
) => {
  const state: Store<T> = {
    current: value,
  };

  const listeners = new Set<() => void>();

  let timeoutId: NodeJS.Timeout | undefined;
  let isInitialized = false;
  let lastTimestamp = 0;

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

    const now = Date.now();
    if (now - lastTimestamp >= milliseconds) {
      lastTimestamp = now;
      state.current = newState;
      emitChange();
      return;
    }

    clearTimeoutId();
    timeoutId = setTimeout(
      () => {
        lastTimestamp = Date.now();
        state.current = newState;
        emitChange();
      },
      milliseconds - (now - lastTimestamp),
    );
  };

  const getSnapShot = () => state.current;

  return [setValue, subscribe, getSnapShot] as const;
};
