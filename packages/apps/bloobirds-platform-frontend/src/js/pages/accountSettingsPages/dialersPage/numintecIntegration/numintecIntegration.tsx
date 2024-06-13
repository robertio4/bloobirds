import React from 'react';

import { useUserSettings } from '../../../../components/userPermissions/hooks';
import NumintecAuth from './numintecAuth';
import { NumintecConfig } from './numintecConfig';

export function NumintecIntegration() {
  const settings = useUserSettings();
  return settings?.account?.dialerTypes?.includes('NUMINTEC_DIALER') ? (
    <NumintecConfig />
  ) : (
    <NumintecAuth />
  );
}
