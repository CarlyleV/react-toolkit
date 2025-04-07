type Store = {
  current:
    | {
        isReady: false;
      }
    | {
        isReady: true;
        angle: ScreenOrientation['angle'];
        type: ScreenOrientation['type'];
      };
};

export const createScreenOrientationStore = () => {
  const store: Store = {
    current: {
      isReady: false,
    },
  };

  const subscribe = (listener: () => void) => {
    const onChange = () => {
      store.current = {
        isReady: true,
        angle: window.screen.orientation.angle,
        type: window.screen.orientation.type,
      };
      listener();
    };

    onChange();

    window.screen.orientation.addEventListener('change', onChange);

    return () => {
      window.screen.orientation.removeEventListener('change', onChange);
      store.current = {
        isReady: false,
      };
    };
  };

  const getSnapShot = () => store.current;

  return [subscribe, getSnapShot] as const;
};
