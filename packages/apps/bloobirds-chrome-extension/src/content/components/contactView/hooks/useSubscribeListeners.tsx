import { useEffect } from 'react';

import { BobjectTypes } from '@bloobirds-it/types';

import { useExtensionContext } from '../../context';

export const useSubscribeListeners = (bobjectType: BobjectTypes, mutate: () => void) => {
  const { subscribeListener, unsuscribeListener } = useExtensionContext();
  useEffect(() => {
    subscribeListener(bobjectType, mutate);
    return () => unsuscribeListener(bobjectType, mutate);
  }, [mutate, bobjectType]);
};
