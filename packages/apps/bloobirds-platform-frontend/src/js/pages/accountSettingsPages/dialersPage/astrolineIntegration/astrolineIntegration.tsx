import React from 'react';

import { useUserSettings } from '../../../../components/userPermissions/hooks';
import AstrolineAuth from './astrolineAuth';
import { AstrolineConfig } from './astrolineConfig';

export function AstrolineIntegration() {
  const settings = useUserSettings();
  return settings?.account?.dialerTypes?.includes('ASTROLINE_DIALER') ? (
    <AstrolineConfig />
  ) : (
    <AstrolineAuth />
  );
}
