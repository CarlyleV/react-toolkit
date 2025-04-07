import { useBroadcastReceiver } from '@/browserApi/broadcastChannel/useBroadcastReceiver.ts';
import { useBroadcastReceiverEffect } from '@/browserApi/broadcastChannel/useBroadcastReceiverEffect.ts';
import { useBroadcastSender } from '@/browserApi/broadcastChannel/useBroadcastSender.ts';
import type { Meta, StoryObj } from '@storybook/react';

const CHANNEL = 'test-channel';

const BroadcastChannel = () => {
  const sender = useBroadcastSender<number>(CHANNEL);
  const receive = useBroadcastReceiver<number>(CHANNEL);

  useBroadcastReceiverEffect<number>(
    (e) => {
      console.log(e);
    },
    [],
    CHANNEL,
  );

  const onClick = () => {
    sender(Date.now());
  };

  return (
    <div>
      <button onClick={onClick}>Send</button>
      {receive?.data ?? 'No data received'}
    </div>
  );
};

const meta = {
  title: 'Browser API/BroadcastChannel',
  component: BroadcastChannel,
} satisfies Meta<typeof IntersectionObserver>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
