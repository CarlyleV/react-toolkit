type Store<T> = {
  current: T[];
};

export const createSetStore = <T>(initialState?: T[]) => {
  const set = new Set(initialState);

  const state: Store<T> = {
    current: [...set],
  };

  const listeners = new Set<() => void>();

  const emitChange = () => {
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  const add = (value: T) => {
    set.add(value);
    state.current = [...set];
    emitChange();
  };

  const remove = (value: T) => {
    set.delete(value);
    state.current = [...set];
    emitChange();
  };

  const has = (value: T) => {
    return set.has(value);
  };

  const clear = () => {
    set.clear();
    state.current = [];
    emitChange();
  };

  const getSnapShot = () => {
    return state.current;
  };

  return {
    add,
    remove,
    has,
    clear,
    subscribe,
    getSnapShot,
  };
};
