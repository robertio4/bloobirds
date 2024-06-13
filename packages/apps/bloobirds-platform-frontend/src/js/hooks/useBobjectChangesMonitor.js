import { useEffect, useState } from 'react';
import { WEBSOCKET_MESSAGE_INCOMING } from '../actions/dictionary';
import { isWebsocketDataActionForWithId } from '../utils/websocket';
import { useEventSubscription } from '@bloobirds-it/plover';

export const useBobjectChangesMonitor = (bobjectId, bobjectType) => {
  const [lastBobjectChange, setLastBobjectChange] = useState(null);
  const [bobjectChanged, setBobjectChanged] = useState(0);
  const [createSubscription, setCreateSubscription] = useState(false);

  useEventSubscription(
    `data-${bobjectType}`,
    data => {
      if (
        isWebsocketDataActionForWithId(bobjectType, bobjectId, {
          type: WEBSOCKET_MESSAGE_INCOMING,
          data,
        })
      ) {
        setBobjectChanged(x => x + 1);
        setLastBobjectChange(bobjectChanged);
      }
    },
    { createSubscription },
  );

  useEffect(() => {
    setCreateSubscription(false);
    setTimeout(() => setCreateSubscription(true), 100);
  }, [bobjectId]);

  useEffect(() => {
    if (lastBobjectChange !== bobjectChanged) {
      setTimeout(() => setLastBobjectChange(bobjectChanged), 200);
    }
  }, [bobjectChanged]);

  return { bobjectChanged, hasChanged: lastBobjectChange !== bobjectChanged };
};
