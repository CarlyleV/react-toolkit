import { createBroadcastChannel } from '@/browserApi/broadcastChannel/store.ts';
import { useState } from 'react';

/**
 * Custom Hook: useBroadcastSender
 *
 * Provides a function to send messages to a specified BroadcastChannel.
 * This hook creates a BroadcastChannel instance and returns a `send` function to post messages.
 *
 * @template T - The type of the message data to be sent to the BroadcastChannel.
 * @param channelName - The name of the BroadcastChannel to send messages to.
 * @returns A `send` function that can be used to post messages to the BroadcastChannel.
 *
 * @example
 * const sendMessage = useBroadcastSender<string>('my-channel');
 * sendMessage('Hello, world!');
 *
 * @note
 * This hook ensures that the BroadcastChannel instance is created only once per component lifecycle.
 */
export const useBroadcastSender = <T>(channelName: string) => {
  const [broadcast] = useState<BroadcastChannel>(() => {
    return createBroadcastChannel(channelName);
  });

  const send = (message: T) => {
    broadcast.postMessage(message);
  };

  return send;
};
