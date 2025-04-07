type BroadcastChannelInfo = {
  channel: BroadcastChannel;
  messageListenerCount: number;
};

const broadcastChannelStore = new Map<string, BroadcastChannelInfo>();

export const createBroadcastChannel = (channel: string) => {
  const currentBroadcastChannel = broadcastChannelStore.get(channel);

  if (typeof currentBroadcastChannel !== 'undefined') {
    return currentBroadcastChannel.channel;
  }

  const broadcastChannel = new BroadcastChannel(channel);

  broadcastChannelStore.set(channel, {
    channel: broadcastChannel,
    messageListenerCount: 0,
  });

  return broadcastChannel;
};

export const addBroadcastChannelListener = (
  channel: string,
  listener: (e: MessageEvent) => void,
) => {
  const broadcastChannel = broadcastChannelStore.get(channel);
  if (typeof broadcastChannel === 'undefined') {
    return;
  }
  broadcastChannel.channel.addEventListener('message', listener);
  ++broadcastChannel.messageListenerCount;
};

export const removeBroadcastChannelListener = (
  channel: string,
  listener: (e: MessageEvent) => void,
) => {
  const broadcastChannel = broadcastChannelStore.get(channel);
  if (typeof broadcastChannel === 'undefined') {
    return;
  }
  broadcastChannel.channel.removeEventListener('message', listener);
  --broadcastChannel.messageListenerCount;
  if (broadcastChannel.messageListenerCount === 0) {
    broadcastChannel.channel.close();
    broadcastChannelStore.delete(channel);
  }
};

export const createBroadcastReceiverStore = <T>(channel: string) => {
  const store: {
    current: MessageEvent<T> | undefined;
  } = {
    current: undefined,
  };

  const subscribe = (listener: () => void) => {
    createBroadcastChannel(channel);

    const onMessage = (e: MessageEvent<T>) => {
      store.current = e;
      listener();
    };

    addBroadcastChannelListener(channel, onMessage);

    return () => {
      removeBroadcastChannelListener(channel, onMessage);
    };
  };

  const getSnapShot = () => {
    return store.current;
  };

  return [subscribe, getSnapShot] as const;
};
