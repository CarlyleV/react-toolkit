import { usePageVisibility } from '@/browserApi/pageVisibility/usePageVisibility.ts';
import { usePageVisibilityEffect } from '@/browserApi/pageVisibility/usePageVisibilityEffect.ts';
import type { Meta, StoryObj } from '@storybook/react';

const PageVisibility = () => {
  usePageVisibilityEffect((isVisibility) => {
    console.log(isVisibility);
  }, []);

  const isVisibility = usePageVisibility();

  return <div>{isVisibility ? 'visible' : 'hidden'}</div>;
};

const meta = {
  title: 'Browser API/Page Visibility',
  component: PageVisibility,
} satisfies Meta<typeof PageVisibility>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
