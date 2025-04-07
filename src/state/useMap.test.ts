import { useMap } from '@/state/useMap.ts';
import { act, renderHook } from '@testing-library/react';

describe('useMap', () => {
  it('should initialize with the given initial state', () => {
    const { result } = renderHook(() =>
      useMap({ key1: 'value1', key2: 'value2' }),
    );

    expect(result.current.state).toEqual({ key1: 'value1', key2: 'value2' });
  });

  it('should set a new key-value pair', () => {
    const { result } = renderHook(() => useMap<Record<string, string>>({}));

    act(() => {
      result.current.set('key1', 'value1');
    });

    expect(result.current.state).toEqual({ key1: 'value1' });
  });

  it('should update an existing key-value pair', () => {
    const { result } = renderHook(() => useMap({ key1: 'value1' }));

    act(() => {
      result.current.set('key1', 'newValue');
    });

    expect(result.current.state).toEqual({ key1: 'newValue' });
  });

  it('should get the value of a specific key', () => {
    const { result } = renderHook(() => useMap({ key1: 'value1' }));

    let value: string | undefined;

    act(() => {
      value = result.current.get('key1');
    });

    expect(value).toBe('value1');
  });

  it('should return undefined for a non-existent key', () => {
    const { result } = renderHook(() =>
      useMap<Record<string, string>>({ key1: 'value1' }),
    );

    let value: string | undefined;

    act(() => {
      value = result.current.get('key2');
    });

    expect(value).toBeUndefined();
  });

  it('should remove a key-value pair', () => {
    const { result } = renderHook(() =>
      useMap({ key1: 'value1', key2: 'value2' }),
    );

    act(() => {
      result.current.remove('key1');
    });

    expect(result.current.state).toEqual({ key2: 'value2' });
  });

  it('should check if a key exists', () => {
    const { result } = renderHook(() =>
      useMap<Record<string, string>>({ key1: 'value1' }),
    );

    let hasKey: boolean = false;

    act(() => {
      hasKey = result.current.has('key1');
    });

    expect(hasKey).toBe(true);

    act(() => {
      hasKey = result.current.has('key2');
    });

    expect(hasKey).toBe(false);
  });

  it('should clear all key-value pairs', () => {
    const { result } = renderHook(() =>
      useMap({ key1: 'value1', key2: 'value2' }),
    );

    act(() => {
      result.current.clear();
    });

    expect(result.current.state).toEqual({});
  });
});
