import { useArray } from '@/state/useArray.ts';
import { act, renderHook } from '@testing-library/react';

describe('useArray', () => {
  it('should initialize with the given initial state', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    expect(result.current.array).toEqual([1, 2, 3]);
  });

  it('should push new items to the array', () => {
    const { result } = renderHook(() => useArray<number>([]));

    act(() => {
      result.current.push(1, 2, 3);
    });

    expect(result.current.array).toEqual([1, 2, 3]);
  });

  it('should filter the array based on a callback', () => {
    const { result } = renderHook(() => useArray([1, 2, 3, 4]));

    act(() => {
      result.current.filter((item) => item % 2 === 0);
    });

    expect(result.current.array).toEqual([2, 4]);
  });

  it('should update an item at a specific index', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current.updateAt(1, () => 42);
    });

    expect(result.current.array).toEqual([1, 42, 3]);
  });

  it('should remove an item at a specific index', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current.remove(1);
    });

    expect(result.current.array).toEqual([1, 3]);
  });

  it('should clear the array', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current.clear();
    });

    expect(result.current.array).toEqual([]);
  });

  it('should shift the first item from the array', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current.shift();
    });

    expect(result.current.array).toEqual([2, 3]);
  });

  it('should unshift new items to the beginning of the array', () => {
    const { result } = renderHook(() => useArray([3, 4]));

    act(() => {
      result.current.unshift(1, 2);
    });

    expect(result.current.array).toEqual([1, 2, 3, 4]);
  });

  it('should pop the last item from the array', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current.pop();
    });

    expect(result.current.array).toEqual([1, 2]);
  });

  it('should reset the array to the provided value', () => {
    const { result } = renderHook(() => useArray<number>([1, 2, 3]));

    expect(result.current.array).toEqual([1, 2, 3]);

    act(() => {
      result.current.reset([4, 5, 6]);
    });

    expect(result.current.array).toEqual([4, 5, 6]);

    act(() => {
      result.current.reset([]);
    });

    expect(result.current.array).toEqual([]);
  });
});
