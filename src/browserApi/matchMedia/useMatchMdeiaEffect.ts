import type { DependencyList } from 'react';
import { useEffect, useRef } from 'react';

export type MatchMediaEffectCallback = (
  event: MediaQueryListEvent,
) => void | (() => void);

/**
 * Custom Hook: useMatchMediaEffect
 *
 * Monitors a specified media query and triggers a callback whenever the query's match state changes.
 *
 * @param callback - A function to be executed when the media query match state changes.
 * @param dependencies - Dependency array for the hook. The effect will re-run if any dependency changes.
 * @param query - The media query string to monitor (e.g., '(max-width: 768px)').
 *
 * @example
 * useMatchMediaEffect(
 *   (event) => {
 *     if (event.matches) {
 *       console.log('Viewport matches the query');
 *     } else {
 *       console.log('Viewport does not match the query');
 *     }
 *   },
 *   [],
 *   '(max-width: 768px)'
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
 *         "additionalHooks": "(useMatchMediaEffect)"
 *       }
 *     ]
 *   }
 * }
 * ```
 */
export const useMatchMediaEffect = (
  callback: MatchMediaEffectCallback,
  dependencies: DependencyList,
  query: string,
) => {
  const callbackRef = useRef<MatchMediaEffectCallback>(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    callbackRef.current(
      new MediaQueryListEvent('change', {
        matches: mediaQueryList.matches,
        media: mediaQueryList.media,
      }),
    );
    const onChange = (e: MediaQueryListEvent) => {
      callbackRef.current(e);
    };
    mediaQueryList.addEventListener('change', onChange);

    return () => {
      mediaQueryList.removeEventListener('change', onChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, ...dependencies]);
};
