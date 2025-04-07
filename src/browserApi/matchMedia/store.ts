type Store = {
  current:
    | {
        isReady: false;
      }
    | {
        isReady: true;
        isMatched: boolean;
      };
};

export const createMatchMediaStore = (query: string) => {
  const state: Store = {
    current: {
      isReady: false,
    },
  };

  const subscribe = (listener: () => void) => {
    const mediaQueryList = window.matchMedia(query);
    state.current = {
      isReady: true,
      isMatched: mediaQueryList.matches,
    };
    listener();
    const onChange = (e: MediaQueryListEvent) => {
      state.current = {
        isReady: true,
        isMatched: e.matches,
      };
      listener();
    };
    mediaQueryList.addEventListener('change', onChange);

    return () => {
      mediaQueryList.removeEventListener('change', onChange);
      state.current = {
        isReady: false,
      };
    };
  };

  const getSnapShot = () => state.current;

  return [subscribe, getSnapShot] as const;
};
