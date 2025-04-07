import { usePrevious } from '@/state/usePrevious.ts';
import { act, renderHook } from '@testing-library/react';

describe('usePrevious', () => {
  it('should return undefined on the initial render', () => {
    const { result } = renderHook(() => usePrevious('initial'));

    expect(result.current).toBeUndefined();
  });

  it('should return the previous value after state changes', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'initial' },
    });

    expect(result.current).toBeUndefined();

    act(() => {
      rerender({ value: 'updated' });
    });

    expect(result.current).toBe('initial');

    act(() => {
      rerender({ value: 'final' });
    });

    expect(result.current).toBe('updated');
  });

  it('should handle complex data types', () => {
    const initialObject = { key: 'value1' };
    const updatedObject = { key: 'value2' };

    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: initialObject },
    });

    expect(result.current).toBeUndefined();

    act(() => {
      rerender({ value: updatedObject });
    });

    expect(result.current).toBe(initialObject);
  });
});
