import { useMutationObserverEffect } from '@/browserApi/mutationObserver/useMutationObserverEffect.ts';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

const MutationObserver = () => {
  const devRef = useRef<HTMLDivElement>(null);
  const [isView, setIsView] = useState<boolean>(false);

  useMutationObserverEffect(
    (e) => {
      console.log(e);
    },
    [],
    devRef,
    {
      childList: true,
    },
  );

  return (
    <>
      <button
        onClick={() => {
          setIsView((prev) => !prev);
        }}
      >
        Toggle
      </button>
      <div ref={devRef}>
        {isView ?
          <div>view</div>
        : null}
      </div>
    </>
  );
};

const meta = {
  title: 'Browser API/Mutation Observer',
  component: MutationObserver,
} satisfies Meta<typeof MutationObserver>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
