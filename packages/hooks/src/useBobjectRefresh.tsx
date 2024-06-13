import { useState } from 'react';

import { useEventSubscription } from '@bloobirds-it/plover';

export const isWebsocketDataActionForWithId = (bobjectType, id, wsMessage) => {
  if (
    wsMessage.type === 'WEBSOCKET_MESSAGE_INCOMING' &&
    wsMessage.data.action === 'data' &&
    wsMessage.data.bobjectType === bobjectType
  ) {
    const shortId = id && id.split('/').length === 3 ? id.split('/')[2] : id;
    return wsMessage.data.ids.includes(id) || wsMessage.data.ids.includes(shortId);
  }
  return false;
};

export const useBobjectRefresh = (bobjectId, bobjectType, callback) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  useEventSubscription(
    `data-${bobjectType}`,
    data => {
      if (
        isWebsocketDataActionForWithId(bobjectType, bobjectId, {
          type: 'WEBSOCKET_MESSAGE_INCOMING',
          data,
        })
      ) {
        callback(bobjectType, bobjectId);
        setIsSubscribed(true);
      }
    },
    { createSubscription: !isSubscribed },
  );
};
