import { useResizeObserver } from '@/browserApi/resizeObserver/useResizeObserver.ts';
import type { ResizeObserverEffectCallback } from '@/browserApi/resizeObserver/useResizeObserverEffect.ts';
import { useResizeObserverEffect } from '@/browserApi/resizeObserver/useResizeObserverEffect.ts';
import { useDebouncedCallback } from '@/performance/debounce/useDebouncedCallback.ts';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';

const ResizeObserver = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  const resizeObserver = useResizeObserver(elementRef);

  const [debounced] = useDebouncedCallback<ResizeObserverEffectCallback>(
    (e) => {
      console.log(e);
    },
    [],
    200,
  );

  useResizeObserverEffect(debounced, [debounced], elementRef, {
    box: 'border-box',
  });

  return (
    <div ref={elementRef}>
      target width:
      {resizeObserver.isReady ?
        resizeObserver.entry.target.clientWidth
      : 'loading'}
    </div>
  );
};

const meta = {
  title: 'Browser API/Resize Observer',
  component: ResizeObserver,
} satisfies Meta<typeof ResizeObserver>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
