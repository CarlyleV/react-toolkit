import { useQueue } from '@/state/useQueue.ts';
import { act, renderHook } from '@testing-library/react';

describe('useQueue', () => {
  it('should initialize with the given initial value', () => {
    const { result } = renderHook(() => useQueue([1, 2, 3]));

    expect(result.current.queue).toEqual([1, 2, 3]);
  });

  it('should enqueue new values and call onEnqueue callback', () => {
    const onEnqueue = jest.fn();
    const { result } = renderHook(() => useQueue<number>([], { onEnqueue }));

    act(() => {
      result.current.enqueue(1, 2, 3);
    });

    expect(result.current.queue).toEqual([1, 2, 3]);

    expect(onEnqueue).toHaveBeenCalledTimes(1);
    expect(onEnqueue).toHaveBeenCalledWith([]);
  });

  it('should dequeue the first value, update the queue, and call onDequeue callback', () => {
    const onDequeue = jest.fn();
    const { result } = renderHook(() => useQueue([1, 2, 3], { onDequeue }));

    let dequeuedValue: number | undefined;

    act(() => {
      dequeuedValue = result.current.dequeue();
    });

    expect(dequeuedValue).toBe(1);
    expect(result.current.queue).toEqual([2, 3]);

    expect(onDequeue).toHaveBeenCalledTimes(1);
    expect(onDequeue).toHaveBeenCalledWith([2, 3]);
  });

  it('should return undefined when dequeue is called on an empty queue', () => {
    const onDequeue = jest.fn();
    const { result } = renderHook(() => useQueue<number>([], { onDequeue }));

    let dequeuedValue: number | undefined;

    act(() => {
      dequeuedValue = result.current.dequeue();
    });

    expect(dequeuedValue).toBeUndefined();
    expect(result.current.queue).toEqual([]);

    expect(onDequeue).not.toHaveBeenCalled();
  });

  it('should peek the first value without removing it', () => {
    const { result } = renderHook(() => useQueue([1, 2, 3]));

    let peekedValue: number | undefined;

    act(() => {
      peekedValue = result.current.peek();
    });

    expect(peekedValue).toBe(1);
    expect(result.current.queue).toEqual([1, 2, 3]);
  });

  it('should return undefined when peek is called on an empty queue', () => {
    const { result } = renderHook(() => useQueue<number>([]));

    let peekedValue: number | undefined;

    act(() => {
      peekedValue = result.current.peek();
    });

    expect(peekedValue).toBeUndefined();
    expect(result.current.queue).toEqual([]);
  });

  it('should clear the queue and call onClear callback', () => {
    const onClear = jest.fn();
    const { result } = renderHook(() => useQueue([1, 2, 3], { onClear }));

    act(() => {
      result.current.clear();
    });

    expect(result.current.queue).toEqual([]);

    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
