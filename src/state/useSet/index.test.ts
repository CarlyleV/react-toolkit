import { useSet } from '@/state/useSet/index.ts';
import { act, renderHook } from '@testing-library/react';

describe('useSet', () => {
  it('should initialize with the given initial state', () => {
    const { result } = renderHook(() => useSet([1, 2, 3]));

    // 初期状態が正しく設定されていることを確認
    expect(result.current.set).toEqual([1, 2, 3]);
  });

  it('should add a new value to the set', () => {
    const { result } = renderHook(() => useSet<number>());

    // 新しい値を追加
    act(() => {
      result.current.add(1);
    });

    // セットに値が追加されていることを確認
    expect(result.current.set).toEqual([1]);

    // 重複する値を追加してもセットに影響がないことを確認
    act(() => {
      result.current.add(1);
    });
    expect(result.current.set).toEqual([1]);

    // 別の値を追加
    act(() => {
      result.current.add(2);
    });
    expect(result.current.set).toEqual([1, 2]);
  });

  it('should remove a value from the set', () => {
    const { result } = renderHook(() => useSet([1, 2, 3]));

    // 値を削除
    act(() => {
      result.current.remove(2);
    });

    // セットから値が削除されていることを確認
    expect(result.current.set).toEqual([1, 3]);

    // 存在しない値を削除してもセットに影響がないことを確認
    act(() => {
      result.current.remove(4);
    });
    expect(result.current.set).toEqual([1, 3]);
  });

  it('should check if a value exists in the set', () => {
    const { result } = renderHook(() => useSet([1, 2, 3]));

    let hasValue: boolean = false;

    // 値が存在するか確認
    act(() => {
      hasValue = result.current.has(2);
    });
    expect(hasValue).toBe(true);

    // 存在しない値を確認
    act(() => {
      hasValue = result.current.has(4);
    });
    expect(hasValue).toBe(false);
  });

  it('should clear all values from the set', () => {
    const { result } = renderHook(() => useSet([1, 2, 3]));

    // セットをクリア
    act(() => {
      result.current.clear();
    });

    // セットが空になっていることを確認
    expect(result.current.set).toEqual([]);
  });

  it('should handle an empty initial state', () => {
    const { result } = renderHook(() => useSet<number>());

    // 初期状態が空であることを確認
    expect(result.current.set).toEqual([]);
  });

  it('should handle a function as the initial state', () => {
    const { result } = renderHook(() => useSet(() => [1, 2, 3]));

    // 初期状態が関数で指定された場合でも正しく初期化されることを確認
    expect(result.current.set).toEqual([1, 2, 3]);
  });
});
