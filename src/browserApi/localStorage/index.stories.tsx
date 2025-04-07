import { useLocalStorageDispatcher } from '@/browserApi/localStorage/useLocalStorageDispatcher.ts';
import { useLocalStorageSelector } from '@/browserApi/localStorage/useLocalStorageSelector.ts';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';

const LocalStorageSetter = () => {
  const inputTextRef = useRef<string>('');

  const { set, remove } = useLocalStorageDispatcher<string>('test');

  return (
    <div>
      <p>Local Storage Setter</p>
      <input
        type='text'
        onChange={(e) => {
          inputTextRef.current = e.target.value;
        }}
      />
      <button
        onClick={() => {
          set(inputTextRef.current);
        }}
      >
        Save
      </button>
      <button
        onClick={() => {
          remove();
        }}
      >
        Remove
      </button>
    </div>
  );
};

const LocalStorage = () => {
  const [test] = useLocalStorageSelector<string>('test', 'default');

  return (
    <div>
      <p>Local Storage</p>
      <LocalStorageSetter />
      <p>{test}</p>
    </div>
  );
};

const meta = {
  title: 'Browser API/Local Storage',
  component: LocalStorage,
} satisfies Meta<typeof LocalStorage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
