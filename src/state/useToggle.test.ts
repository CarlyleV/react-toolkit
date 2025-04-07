import { useToggle } from '@/state/useToggle.ts';
import { act, renderHook } from '@testing-library/react';

describe('useToggle', () => {
  it('should initialize with the given initial state', () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current[0]).toBe(true);
  });

  it('should toggle the state from true to false', () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(false);
  });

  it('should toggle the state from false to true', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);
  });

  it('should toggle the state multiple times', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);
  });

  it('should work with a function as the initial state', () => {
    const { result } = renderHook(() => useToggle(() => true));

    expect(result.current[0]).toBe(true);
  });
});
