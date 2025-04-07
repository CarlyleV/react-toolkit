import { useDebouncedCallback } from '@/performance/debounce/useDebouncedCallback.ts';
import { useDebouncedValue } from '@/performance/debounce/useDebouncedValue.ts';
import { act, renderHook } from '@testing-library/react';

jest.useFakeTimers();

describe('useDebouncedCallback', () => {
  it('should call the callback after the debounce period', () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(mockCallback, [], 200),
    );

    act(() => {
      result.current[0]('first call');
    });

    expect(mockCallback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith('first call');
  });

  it('should reset the debounce timer if called again within the debounce period', () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(mockCallback, [], 200),
    );

    act(() => {
      result.current[0]('first call');
    });

    act(() => {
      jest.advanceTimersByTime(100);
      result.current[0]('second call');
    });

    expect(mockCallback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith('second call');
  });

  it('should update isPending state correctly', () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(mockCallback, [], 200),
    );

    act(() => {
      result.current[0]('first call');
    });

    expect(result.current[1]).toBe(true);

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current[1]).toBe(false);
  });

  it('should clean up the debounce timer on unmount', () => {
    const mockCallback = jest.fn();
    const { result, unmount } = renderHook(() =>
      useDebouncedCallback(mockCallback, [], 200),
    );

    act(() => {
      result.current[0]('first call');
    });

    unmount();

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(mockCallback).not.toHaveBeenCalled();
  });
});

describe('useDebouncedValue', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebouncedValue('initial', 200));

    expect(result.current[0]).toBe('initial');
    expect(result.current[1]).toBe(false);
  });

  it('should debounce the value update', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 200),
      { initialProps: { value: 'initial' } },
    );

    act(() => {
      rerender({ value: 'updated' });
    });

    expect(result.current[0]).toBe('initial');
    expect(result.current[1]).toBe(true);

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current[0]).toBe('updated');
    expect(result.current[1]).toBe(false);
  });

  it('should reset the debounce timer if the value changes again within the debounce period', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 200),
      { initialProps: { value: 'initial' } },
    );

    act(() => {
      rerender({ value: 'updated1' });
    });

    act(() => {
      jest.advanceTimersByTime(100);
      rerender({ value: 'updated2' });
    });

    expect(result.current[0]).toBe('initial');
    expect(result.current[1]).toBe(true);

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current[0]).toBe('updated2');
    expect(result.current[1]).toBe(false);
  });

  it('should clean up the debounce timer on unmount', () => {
    const { result, rerender, unmount } = renderHook(
      ({ value }) => useDebouncedValue(value, 200),
      { initialProps: { value: 'initial' } },
    );

    act(() => {
      rerender({ value: 'updated' });
    });

    unmount();

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current[0]).toBe('initial');
  });
});
