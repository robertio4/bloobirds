import React from 'react';

import { useUserSettings } from '../../../../components/userPermissions/hooks';
import AircallAuth from './aircallAuth';
import AircallConfig from './aircallConfig';

export function AircallIntegration() {
  const settings = useUserSettings();
  return settings?.account?.dialerTypes?.includes('AIRCALL_DIALER') ? (
    <AircallConfig />
  ) : (
    <AircallAuth />
  );
}
