import type { DependencyList } from 'react';
import { useEffect, useRef } from 'react';

type ScreenOrientationEffectCallback = (orientation: {
  angle: ScreenOrientation['angle'];
  type: ScreenOrientation['type'];
}) => void;

/**
 * Custom Hook: useScreenOrientationEffect
 *
 * Subscribes to changes in the screen orientation state and triggers a callback whenever the orientation changes.
 * This hook manages the lifecycle of the `change` event listener on the `ScreenOrientation` API and ensures proper cleanup.
 *
 * @param callback - A function to be executed whenever the screen orientation changes.
 *                   The callback receives an object containing the `angle` and `type` of the screen orientation.
 * @param dependencies - Dependency array for the hook. The effect will re-run if any dependency changes.
 *
 * @example
 * useScreenOrientationEffect(
 *   ({ angle, type }) => {
 *     console.log(`Screen orientation changed: ${type}, Angle: ${angle}`);
 *   },
 *   []
 * );
 *
 * @note
 * To ensure proper dependency management, configure ESLint with the following rule:
 *
 * ```json
 * {
 *   "rules": {
 *     "react-hooks/exhaustive-deps": [
 *       "warn",
 *       {
 *         "additionalHooks": "(useScreenOrientationEffect)"
 *       }
 *     ]
 *   }
 * }
 * ```
 */
export const useScreenOrientationEffect = (
  callback: ScreenOrientationEffectCallback,
  dependencies: DependencyList,
) => {
  const callbackRef = useRef<ScreenOrientationEffectCallback>(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const onChange = () => {
      callbackRef.current({
        angle: window.screen.orientation.angle,
        type: window.screen.orientation.type,
      });
    };

    window.screen.orientation.addEventListener('change', onChange);

    return () => {
      window.screen.orientation.removeEventListener('change', onChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};
