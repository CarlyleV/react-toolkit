type Store<T> = {
  current: [T, boolean];
};

const parseItem = <T>(
  value: string | null,
  initialState: T,
  parse: (value: string) => T,
) => {
  return value === null ? initialState : parse(value);
};

export const createLocalStorageSelectorStore = <T>(
  key: string,
  initialState: T,
  parse: (value: string) => T,
) => {
  const store: Store<T> = {
    current: [initialState, false],
  };

  const subscribe = (listener: () => void) => {
    const currentItem = localStorage.getItem(key);

    store.current = [parseItem(currentItem, initialState, parse), true];

    listener();

    const onChange = (event: StorageEvent) => {
      if (event.key !== key) {
        return;
      }

      store.current = [parseItem(event.newValue, initialState, parse), true];
      listener();
    };

    window.addEventListener('storage', onChange);

    return () => {
      window.removeEventListener('storage', onChange);
      store.current = [initialState, false];
    };
  };

  const getSnapShot = () => store.current;

  return [subscribe, getSnapShot] as const;
};
