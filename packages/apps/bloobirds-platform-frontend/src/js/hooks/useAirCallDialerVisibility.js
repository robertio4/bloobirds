import React, { useMemo, useRef, useState } from 'react';

import AircallPhone from 'aircall-everywhere';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';

import AirCallDialer from '../components/airCallDialer';
import { useUserSettings } from '../components/userPermissions/hooks';
import { api } from '../utils/api';

const aircallVisibleAtom = atom({
  key: 'aircallDialerVisible',
  default: false,
});

const AircallContext = React.createContext();

export const AircallProvider = ({ children }) => {
  const setAircallVisibility = useSetRecoilState(aircallVisibleAtom);
  const [launch, setLaunch] = useState();
  const ref = useRef(null);
  const isSendingLog = useRef(false);
  const settings = useUserSettings();
  const dialerType = settings?.user?.dialerType;

  const aircallPhone = useMemo(() => {
    if (ref.current) {
      // eslint-disable-next-line no-new
      const newPhone = new AircallPhone({
        onLogin: () => {},
        onLogout: () => {},
        domToLoadPhone: '#phone',
        size: 'big',
      });

      newPhone.on('incoming_call', () => {
        setAircallVisibility(true);
      });
      // Manually log the call regardless of the webhook on the aircall side
      newPhone.on('call_ended', e => {
        if (isSendingLog.current) {
          return;
        }
        isSendingLog.current = true;
        api.post(`/calls/aircall/calls/${e.call_id}/end`).finally(() => {
          isSendingLog.current = false;
        });
      });
      return newPhone;
    }
    return null;
  }, [ref.current, launch]);

  return (
    <AircallContext.Provider
      value={{
        aircallPhone,
        launch,
        setLaunch,
      }}
    >
      <>
        {dialerType === 'AIRCALL_DIALER' && <AirCallDialer ref={ref} />}
        {children}
      </>
    </AircallContext.Provider>
  );
};

export const useAircallDialer = () => {
  const context = React.useContext(AircallContext);
  if (!context) {
    throw new Error('useAircallDialer must be used within the AircallProvider');
  }

  return context;
};

export const useAirCallDialerVisibility = () => {
  const [aircallVisible, setAircallVisible] = useRecoilState(aircallVisibleAtom);
  const { aircallPhone } = useAircallDialer();

  const toggleVisibility = () => {
    setAircallVisible(!aircallVisible);
  };

  const openAirCallDialer = phoneNumber => {
    if (!aircallVisible) {
      setAircallVisible(true);
    }
    aircallPhone?.send('dial_number', { phone_number: phoneNumber }, () => {});
  };

  return {
    aircallVisible,
    setAircallVisible,
    toggleVisibility,
    openAirCallDialer,
  };
};
