import { createScreenOrientationStore } from '@/browserApi/screenOrientation/store.ts';
import { useSyncExternalStore } from 'react';

const store = createScreenOrientationStore();

/**
 * Custom Hook: useScreenOrientation
 *
 * Provides a reactive interface to monitor the screen orientation state of the device.
 * This hook uses `useSyncExternalStore` to ensure consistent state updates across components.
 *
 * @returns An object representing the current screen orientation state.
 *          Example: `{ isReady: boolean, type: string, angle: number }`
 *
 * @example
 * const { isReady, type, angle } = useScreenOrientation();
 *
 * if (isReady) {
 *   console.log(`Screen orientation: ${type}, Angle: ${angle}`);
 * }
 *
 * @note
 * This hook relies on an external store created by `createScreenOrientationStore` to manage the screen orientation state.
 * It ensures that changes to the screen orientation are reflected in all components using this hook.
 */
export const useScreenOrientation = () => {
  return useSyncExternalStore<ReturnType<(typeof store)[1]>>(...store, () => {
    return {
      isReady: false,
    };
  });
};
