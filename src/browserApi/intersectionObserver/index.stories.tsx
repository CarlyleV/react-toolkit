import { useIntersectionObserver } from '@/browserApi/intersectionObserver/useIntersectionObserver.ts';
import { useIntersectionObserverEffect } from '@/browserApi/intersectionObserver/useIntersectionObserverEffect.ts';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';

const IntersectionObserver = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const intersectionObserver = useIntersectionObserver(elementRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });

  useIntersectionObserverEffect(
    (e) => {
      console.log(e);
    },
    [],
    elementRef,
    {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    },
  );

  return (
    <div
      style={{
        height: '200vh',
        background:
          (
            intersectionObserver.isReady &&
            intersectionObserver.entry.isIntersecting
          ) ?
            'red'
          : 'blue',
      }}
    >
      <div ref={elementRef}>Target</div>
    </div>
  );
};

const meta = {
  title: 'Browser API/Intersection Observer',
  component: IntersectionObserver,
} satisfies Meta<typeof IntersectionObserver>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
