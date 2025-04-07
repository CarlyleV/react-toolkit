import { useThrottledCallback } from '@/performance/throttle/useThrottledCallback.ts';
import { useThrottledValue } from '@/performance/throttle/useThrottledValue.ts';
import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ChangeEventHandler } from 'react';

const Throttle = () => {
  const throttled = useThrottledCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      console.log(e.target.value);
    },
    [],
    1000,
  );

  const [input, setInput] = useState<string>('test');
  const value = useThrottledValue(input, 1000);

  return (
    <div>
      <p>useThrottledCallback</p>
      <input
        type='text'
        onChange={throttled}
      />
      <p>useThrottledValue</p>
      <input
        type='text'
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <p>{value}</p>
    </div>
  );
};

const meta = {
  title: 'Performance/Throttle',
  component: Throttle,
} satisfies Meta<typeof Throttle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
