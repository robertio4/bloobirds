import React from 'react';

import { useUserSettings } from '../../../../components/userPermissions/hooks';
import RingoverAuth from './ringoverAuth';
import { RingoverConfig } from './ringoverConfig';

export function RingoverIntegration() {
  const settings = useUserSettings();
  return settings?.account?.dialerTypes?.includes('RINGOVER_DIALER') ? (
    <RingoverConfig />
  ) : (
    <RingoverAuth />
  );
}
