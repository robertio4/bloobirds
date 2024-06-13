import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { api } from '@bloobirds-it/utils';
import { Call, Device } from '@twilio/voice-sdk';

import { DialerOpenStatus, DialerStatus, useDialerStore } from './dialer';

async function createDevice(
  onDeviceCreated: (device: Device) => void,
  onIncomingCall: (call: Call) => void,
  refreshToken: () => void,
  setState: (key: string, value: any) => any,
  setError: (error: any) => void,
  t: any,
) {
  const response = await api.post('/utils/service/twilio-auth/token', {});
  const token = response?.data?.token;

  if (!token || Object.keys(token).length === 0) {
    setError({
      description: t('dialer.hints.invalidToken'),
      explanation: t('dialer.hints.invalidToken_explanation'),
    });
    throw new Error('No token provided');
  }

  const device = new Device(token);

  const handleSuccessfulRegistration = () => {
    console.log('The device is ready to receive incoming calls.');
    setState('errors', []);
    setState('status', DialerStatus.idle);
  };

  device.on('registered', handleSuccessfulRegistration);
  device.on('error', e => setError(e));
  device.on('incoming', onIncomingCall);
  device.on('tokenWillExpire', refreshToken);

  setState('status', DialerStatus.registering);
  if (device.state === 'unregistered') {
    await device.register();
  }
  onDeviceCreated(device);
}

export function DeviceHandler() {
  const { startCall, snapshot, emit, setState } = useDialerStore();
  const { t } = useTranslation();

  function handleIncomingCall(call: Call) {
    if (snapshot().device.isBusy) {
      call.ignore();
    } else {
      setState('open', DialerOpenStatus.open);
      setState('status', DialerStatus.incoming);
      setState('dialedPhoneNumber', call.parameters.From);
      startCall(call);
    }
  }

  async function refreshToken() {
    const response = await api.post('/utils/service/twilio-auth/token', {});
    const token = response?.data?.token;
    if (!token || Object.keys(token).length === 0) {
      return;
    }
    snapshot().device.updateToken(String(token));
    setState('errors', []);
    emit();
  }

  function setError(error: any) {
    console.error('Error while creating the device: ', error);
    setState('errors', [...snapshot().errors, error]);
  }

  useEffect(() => {
    createDevice(
      (device: Device) => {
        setState('device', device);
      },
      handleIncomingCall,
      refreshToken,
      setState,
      setError,
      t,
    ).catch(e => {
      console.error('Error creating the twilio device', e);
    });
  }, []);

  return null;
}
