import { createBroadcastReceiverStore } from '@/browserApi/broadcastChannel/store.ts';
import { useState, useSyncExternalStore } from 'react';

/**
 * Custom Hook: useBroadcastReceiver
 *
 * Provides a reactive interface to listen for messages from a specified BroadcastChannel.
 * This hook uses `useSyncExternalStore` to subscribe to changes in the BroadcastChannel state.
 *
 * @template T - The type of the message data received from the BroadcastChannel.
 * @param channel - The name of the BroadcastChannel to listen to.
 * @returns The most recent message received from the BroadcastChannel, or `undefined` if no message has been received yet.
 *
 * @example
 * const message = useBroadcastReceiver<string>('my-channel');
 * if (message) {
 *   console.log('Received message:', message.data);
 * }
 *
 * @note
 * This hook relies on an external store created by `createBroadcastReceiverStore` to manage the BroadcastChannel state.
 */
export const useBroadcastReceiver = <T>(channel: string) => {
  const [store] = useState<ReturnType<typeof createBroadcastReceiverStore<T>>>(
    () => {
      return createBroadcastReceiverStore(channel);
    },
  );

  return useSyncExternalStore(...store, () => {
    return undefined;
  });
};
