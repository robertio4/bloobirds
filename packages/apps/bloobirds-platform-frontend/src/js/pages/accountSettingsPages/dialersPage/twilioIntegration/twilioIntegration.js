import React, { useState } from 'react';

import { useUserSettings } from '../../../../components/userPermissions/hooks';
import TwilioConfig from './twilioConfig';
import { TwilioConfigModal } from './twilioConfigModal/twilioConfigModal';
import { TwilioInstallationPage } from './twilioInstallationPage/twilioInstallationPage';

export function TwilioIntegration() {
  const settings = useUserSettings();
  const isTwilioInstalled = settings?.account?.dialerTypes?.includes('BLOOBIRDS_DIALER');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {isTwilioInstalled ? (
        <TwilioConfig setModalVisible={setModalVisible} />
      ) : (
        <TwilioInstallationPage setModalVisible={setModalVisible} />
      )}{' '}
      {modalVisible && (
        <TwilioConfigModal
          isTwilioInstalled={isTwilioInstalled}
          setModalVisible={setModalVisible}
        />
      )}
    </>
  );
}
