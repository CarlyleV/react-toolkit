type Store = {
  current:
    | {
        isReady: false;
      }
    | {
        isReady: true;
        isVisible: boolean;
      };
};

export const createPageVisibilityStore = () => {
  const state: Store = {
    current: {
      isReady: false,
    },
  };

  const subscribe = (listener: () => void) => {
    const onChange = () => {
      state.current = {
        isReady: true,
        isVisible: document.visibilityState === 'visible',
      };
      listener();
    };

    onChange();

    document.addEventListener('visibilitychange', onChange);

    return () => {
      document.removeEventListener('visibilitychange', onChange);
      state.current = {
        isReady: false,
      };
    };
  };

  const getSnapShot = () => state.current;

  return [subscribe, getSnapShot] as const;
};
