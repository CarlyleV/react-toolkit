import type { RefObject } from 'react';

type Store = {
  current:
    | {
        isReady: false;
      }
    | {
        isReady: true;
        entry: IntersectionObserverEntry;
      };
};

export const createIntersectionObserverStore = <
  T extends RefObject<HTMLElement | null>,
>(
  target: T,
  options: IntersectionObserverInit,
) => {
  const state: Store = {
    current: {
      isReady: false,
    },
  };

  const subscribe = (listener: () => void) => {
    const observer = new IntersectionObserver((entries) => {
      state.current = {
        isReady: true,
        entry: entries[0],
      };
      listener();
    }, options);

    if (target.current !== null) {
      observer.observe(target.current);
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
