import { useScreenOrientation } from '@/browserApi/screenOrientation/useScreenOrientation.ts';
import { useScreenOrientationEffect } from '@/browserApi/screenOrientation/useScreenOrientationEffect.ts';
import type { Meta, StoryObj } from '@storybook/react';

const ScreenOrientation = () => {
  useScreenOrientationEffect(({ angle, type }) => {
    console.log(angle, type);
  }, []);

  const screenOrientation = useScreenOrientation();

  return (
    <div>
      {screenOrientation.isReady ?
        `${screenOrientation.angle} ${screenOrientation.type}`
      : 'loading'}
    </div>
  );
};

const meta = {
  title: 'Browser API/Screen Orientation',
  component: ScreenOrientation,
} satisfies Meta<typeof ScreenOrientation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
