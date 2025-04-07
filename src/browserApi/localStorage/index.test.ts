import { useLocalStorageDispatcher } from '@/browserApi/localStorage/useLocalStorageDispatcher.ts';
import { useLocalStorageSelector } from '@/browserApi/localStorage/useLocalStorageSelector.ts';
import { act, renderHook } from '@testing-library/react';

describe('useLocalStorageDispatcher', () => {
  const key = 'testKey';

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should set a value in localStorage and dispatch a StorageEvent', () => {
    const { result } = renderHook(() => useLocalStorageDispatcher<string>(key));

    const mockDispatchEvent = jest.spyOn(window, 'dispatchEvent');

    result.current.set('newValue');

    expect(localStorage.getItem(key)).toBe(JSON.stringify('newValue'));

    expect(mockDispatchEvent).toHaveBeenCalledTimes(1);
    expect(mockDispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        key,
        newValue: JSON.stringify('newValue'),
        oldValue: null,
        storageArea: localStorage,
        url: window.location.href,
      }),
    );
  });

  it('should remove a value from localStorage and dispatch a StorageEvent', () => {
    localStorage.setItem(key, JSON.stringify('oldValue'));

    const { result } = renderHook(() => useLocalStorageDispatcher<string>(key));

    const mockDispatchEvent = jest.spyOn(window, 'dispatchEvent');

    result.current.remove();

    expect(localStorage.getItem(key)).toBeNull();

    expect(mockDispatchEvent).toHaveBeenCalledTimes(1);
    expect(mockDispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        key,
        newValue: null,
        oldValue: JSON.stringify('oldValue'),
        storageArea: localStorage,
        url: window.location.href,
      }),
    );
  });

  it('should use a custom stringify function when setting a value', () => {
    const customStringify = jest.fn((value) => `custom:${value}`);
    const { result } = renderHook(() =>
      useLocalStorageDispatcher<string>(key, customStringify),
    );

    result.current.set('newValue');

    expect(customStringify).toHaveBeenCalledTimes(1);
    expect(customStringify).toHaveBeenCalledWith('newValue');

    expect(localStorage.getItem(key)).toBe('custom:newValue');
  });
});

describe('useLocalStorageSelector', () => {
  const key = 'testKey';

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should initialize with the given initial state and set isReady to true after mount', () => {
    const { result } = renderHook(() =>
      useLocalStorageSelector(key, 'initialValue'),
    );

    expect(result.current[0]).toBe('initialValue');

    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(result.current[1]).toBe(true);
  });

  it('should read the value from localStorage and set isReady to true after mount', () => {
    localStorage.setItem(key, JSON.stringify('storedValue'));

    const { result } = renderHook(() =>
      useLocalStorageSelector(key, 'initialValue'),
    );

    expect(result.current[0]).toBe('storedValue');

    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(result.current[1]).toBe(true);
  });

  it('should fallback to the initial state if localStorage is empty and set isReady to true after mount', () => {
    const { result } = renderHook(() =>
      useLocalStorageSelector(key, 'fallbackValue'),
    );

    expect(result.current[0]).toBe('fallbackValue');

    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(result.current[1]).toBe(true);
  });

  it('should use a custom parse function if provided and set isReady to true after mount', () => {
    localStorage.setItem(key, '42');

    const parse = (value?: string) => (value ? parseInt(value, 10) : 0);

    const { result } = renderHook(() => useLocalStorageSelector(key, 0, parse));

    expect(result.current[0]).toBe(42);

    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(result.current[1]).toBe(true);
  });

  it('should update the value when a storage event is triggered and set isReady to true after mount', () => {
    const { result } = renderHook(() =>
      useLocalStorageSelector(key, 'initialValue'),
    );

    act(() => {
      const event = new StorageEvent('storage', {
        key,
        newValue: JSON.stringify('updatedValue'),
        oldValue: JSON.stringify('initialValue'),
        storageArea: localStorage,
      });
      window.dispatchEvent(event);
    });

    expect(result.current[0]).toBe('updatedValue');

    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(result.current[1]).toBe(true);
  });

  it('should handle a function as the initial state and set isReady to true after mount', () => {
    const { result } = renderHook(() =>
      useLocalStorageSelector(key, () => 'computedValue'),
    );

    expect(result.current[0]).toBe('computedValue');

    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(result.current[1]).toBe(true);
  });

  it('should clean up the subscription on unmount', () => {
    const { result, unmount } = renderHook(() =>
      useLocalStorageSelector(key, 'initialValue'),
    );

    expect(result.current[0]).toBe('initialValue');

    unmount();

    act(() => {
      const event = new StorageEvent('storage', {
        key,
        newValue: JSON.stringify('newValue'),
        oldValue: JSON.stringify('initialValue'),
        storageArea: localStorage,
      });
      window.dispatchEvent(event);
    });

    expect(result.current[0]).toBe('initialValue');
  });
});
