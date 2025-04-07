import { useState } from 'react';

/**
 * Custom Hook: useToggle
 *
 * Provides a simple boolean toggle mechanism. This hook is useful for managing on/off states, such as toggling visibility or enabling/disabling features.
 *
 * @param initialState - The initial state of the toggle. Can be a boolean or a function that returns a boolean. Defaults to `false`.
 * @returns A tuple containing:
 *          - `isToggled`: The current state of the toggle.
 *          - `toggle`: A function to toggle the state between `true` and `false`.
 *
 * @example
 * const [isToggled, toggle] = useToggle(false);
 *
 * // Toggle the state
 * toggle();
 *
 * console.log('Current state:', isToggled);
 */
export const useToggle = (initialState: boolean | (() => boolean) = false) => {
  const [isToggled, setIsToggled] = useState<boolean>(initialState);
  const toggle = () => {
    setIsToggled((prev) => !prev);
  };
  return [isToggled, toggle] as const;
};
