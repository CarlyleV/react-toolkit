import type { DependencyList } from 'react';
import { useEffect, useRef } from 'react';

type PageVisibilityEffectCallback = (isVisible: boolean) => void;

/**
 * Custom Hook: usePageVisibilityEffect
 *
 * Subscribes to the page's visibility state and triggers a callback whenever the visibility changes.
 * This hook manages the lifecycle of the `visibilitychange` event listener and ensures proper cleanup.
 *
 * @param callback - A function to be executed whenever the page's visibility state changes.
 *                   The callback receives a boolean indicating whether the page is visible.
 * @param dependencies - Dependency array for the hook. The effect will re-run if any dependency changes.
 *
 * @example
 * usePageVisibilityEffect(
 *   (isVisible) => {
 *     if (isVisible) {
 *       console.log('The page is visible');
 *     } else {
 *       console.log('The page is hidden');
 *     }
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
 *         "additionalHooks": "(usePageVisibilityEffect)"
 *       }
 *     ]
 *   }
 * }
 * ```
 */
export const usePageVisibilityEffect = (
  callback: PageVisibilityEffectCallback,
  dependencies: DependencyList,
) => {
  const callbackRef = useRef<PageVisibilityEffectCallback>(callback);
  callbackRef.current = callback;

  useEffect(() => {
    callbackRef.current(document.visibilityState === 'visible');
    const onChange = () => {
      callbackRef.current(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', onChange);

    return () => {
      document.removeEventListener('visibilitychange', onChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};
