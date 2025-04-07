import { useDebouncedCallback } from '@/performance/debounce/useDebouncedCallback.ts';
import { useDebouncedValue } from '@/performance/debounce/useDebouncedValue.ts';
import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ChangeEventHandler } from 'react';

const Debounce = () => {
  const [debounced, isPending] = useDebouncedCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      console.log(e.target.value);
    },
    [],
    100,
  );

  const [input, setInput] = useState<string>('test');
  const [value, isDebouncedValuePending] = useDebouncedValue(input, 200);

  return (
    <div>
      <p>useDebouncedCallback</p>
      <input
        type='range'
        max={100}
        min={0}
        step={0.1}
        defaultValue={0}
        onChange={debounced}
      />
      <p>{isPending ? 'Pending...' : 'Not pending'}</p>
      <p>useDebouncedValue</p>
      <input
        type='text'
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
      />
      <p>{value === undefined ? 'No value' : `Value: ${value}`}</p>
      <p>{isDebouncedValuePending ? 'Pending...' : 'Not pending'}</p>
    </div>
  );
};

const meta = {
  title: 'Performance/Debounce',
  component: Debounce,
} satisfies Meta<typeof Debounce>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
