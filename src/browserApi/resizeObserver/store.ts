import type { RefObject } from 'react';

type Store = {
  current:
    | {
        isReady: false;
      }
    | {
        isReady: true;
        entry: ResizeObserverEntry;
      };
};

export const createResizeObserverStore = <
  T extends RefObject<HTMLElement | null>,
>(
  target: T,
  options?: ResizeObserverOptions,
) => {
  const state: Store = {
    current: {
      isReady: false,
    },
  };

  const subscribe = (listener: () => void) => {
    const observer = new ResizeObserver((entries) => {
      state.current = {
        isReady: true,
        entry: entries[0],
      };
      listener();
    });

    if (target.current !== null) {
      observer.observe(target.current, options);
    }

    return () => {
      observer.disconnect();
      state.current = {
        isReady: false,
      };
    };
  };

  const getSnapShot = () => state.current;

  return [subscribe, getSnapShot] as const;
};
