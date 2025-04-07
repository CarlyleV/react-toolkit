import { useThrottledCallback } from '@/performance/throttle/useThrottledCallback.ts';
import { useThrottledValue } from '@/performance/throttle/useThrottledValue.ts';
import { act, renderHook } from '@testing-library/react';

jest.useFakeTimers();

describe('useThrottledCallback', () => {
  beforeEach(() => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => 1000);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it('should throttle the callback execution', () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() =>
      useThrottledCallback(mockCallback, [], 200),
    );

    act(() => {
      result.current('first call');
      result.current('second call');
      result.current('third call');
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith('first call');

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(mockCallback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenCalledWith('third call');
  });

  it('should clear the timeout when the component unmounts', () => {
    const mockCallback = jest.fn();
    const { result, unmount } = renderHook(() =>
      useThrottledCallback(mockCallback, [], 200),
    );

    act(() => {
      result.current('first call');
    });

    unmount();

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});

describe('useThrottledValue', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useThrottledValue('initial', 200));

    expect(result.current).toBe('initial');
  });

  it('should update the value immediately on the first update', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottledValue(value, 200),
      { initialProps: { value: 'initial' } },
    );

    act(() => {
      rerender({ value: 'updated' });
    });

    expect(result.current).toBe('updated');
  });

  it('should throttle subsequent updates', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottledValue(value, 200),
      { initialProps: { value: 'initial' } },
    );

    act(() => {
      rerender({ value: 'updated1' });
    });

    expect(result.current).toBe('updated1');

    act(() => {
      rerender({ value: 'updated2' });
    });

    expect(result.current).toBe('updated1');

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('updated2');
  });

  it('should reset the throttle timer if the value changes again within the throttle period', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottledValue(value, 200),
      { initialProps: { value: 'initial' } },
    );

    act(() => {
      rerender({ value: 'updated1' });
    });

    expect(result.current).toBe('updated1');

    act(() => {
      jest.advanceTimersByTime(100);
      rerender({ value: 'updated2' });
    });

    expect(result.current).toBe('updated1');

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe('updated2');
  });

  it('should clean up the throttle timer on unmount', () => {
    const { result, rerender, unmount } = renderHook(
      ({ value }) => useThrottledValue(value, 200),
      { initialProps: { value: 'initial' } },
    );

    act(() => {
      rerender({ value: 'updated' });
    });

    unmount();

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('updated');
  });
});
