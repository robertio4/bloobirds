import React from 'react';
import { useUserSettings } from '../../../../components/userPermissions/hooks';
import JustcallAuth from './justcallAuth';
import JustcallConfig from './justcallConfig';

export function JustcallIntegration() {
  const settings = useUserSettings();
  return settings?.account?.dialerTypes?.includes('JUST_CALL_DIALER') ? (
    <JustcallConfig />
  ) : (
    <JustcallAuth />
  );
}
