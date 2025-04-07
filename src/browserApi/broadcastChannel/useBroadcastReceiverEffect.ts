import {
  addBroadcastChannelListener,
  createBroadcastChannel,
  removeBroadcastChannelListener,
} from '@/browserApi/broadcastChannel/store.ts';
import { useEffect, useRef, type DependencyList } from 'react';

type BroadcastReceiverEffectCallback<T> = (message: MessageEvent<T>) => void;

/**
 * Custom Hook: useBroadcastReceiverEffect
 *
 * Subscribes to a specified BroadcastChannel and triggers a callback whenever a message is received.
 * This hook manages the lifecycle of the BroadcastChannel listener and ensures proper cleanup.
 *
 * @template T - The type of the message data received from the BroadcastChannel.
 * @param callback - A function to be executed whenever a message is received from the BroadcastChannel.
 * @param dependencies - Dependency array for the hook. The effect will re-run if any dependency changes.
 * @param channel - The name of the BroadcastChannel to listen to.
 *
 * @example
 * useBroadcastReceiverEffect<string>(
 *   (message) => {
 *     console.log('Received message:', message.data);
 *   },
 *   [someDependency],
 *   'my-channel'
 * );
 *
 * @note
 * To ensure proper dependency management, configure ESLint with the following rule:
 *
 * ```json
 * {
 *   "rules": {
 *     "react-hooks/exhaustive-deps": [
 *       "warn",
 *       {
 *         "additionalHooks": "(useBroadcastReceiverEffect)"
 *       }
 *     ]
 *   }
 * }
 * ```
 */
export const useBroadcastReceiverEffect = <T>(
  callback: BroadcastReceiverEffectCallback<T>,
  dependencies: DependencyList,
  channel: string,
) => {
  const callbackRef = useRef<BroadcastReceiverEffectCallback<T>>(callback);
  callbackRef.current = callback;

  useEffect(() => {
    createBroadcastChannel(channel);

    const onMessage = (message: MessageEvent<T>) => {
      callbackRef.current(message);
    };

    addBroadcastChannelListener(channel, onMessage);

    return () => {
      removeBroadcastChannelListener(channel, onMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};
