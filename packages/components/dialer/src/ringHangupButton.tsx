import React from 'react';

import { Icon } from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings } from '@bloobirds-it/hooks';
import { MIXPANEL_EVENTS } from '@bloobirds-it/types';
import { Call } from '@twilio/voice-sdk';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import mixpanel from 'mixpanel-browser';

import { DialerStatus, useDialer, useDialerStore } from './dialer';
import styles from './dialer.module.css';

const LoadingRingButton = () => {
  const icon = {
    hidden: {
      pathLength: 0,
      fill: 'rgba(255, 255, 255, 0)',
    },
    visible: {
      pathLength: 1,
      fill: 'rgba(255, 255, 255, 1)',
    },
  };

  return (
    <svg height="32" width="32" viewBox="0 0 24 24" aria-hidden="true">
      <motion.path
        variants={icon}
        d="M18.538 15.637a.735.735 0 0 0-.622-.76c-.756-.099-1.5-.284-2.216-.551a.73.73 0 0 0-.768.161l-.928.929a.73.73 0 0 1-.878.118 12.426 12.426 0 0 1-4.66-4.66.73.73 0 0 1 .118-.878l.926-.925a.732.732 0 0 0 .163-.773 10.1 10.1 0 0 1-.55-2.207.733.733 0 0 0-.738-.629H6.192a.731.731 0 0 0-.728.785 13.742 13.742 0 0 0 2.134 6.023 13.532 13.532 0 0 0 4.167 4.165 13.723 13.723 0 0 0 5.976 2.129.73.73 0 0 0 .797-.734v-2.193zm1.462.008v2.182a2.193 2.193 0 0 1-2.404 2.192 15.188 15.188 0 0 1-6.621-2.354 14.977 14.977 0 0 1-4.607-4.605 15.207 15.207 0 0 1-2.36-6.67A2.193 2.193 0 0 1 6.193 4h2.185c1.1-.01 2.04.796 2.194 1.893.085.647.244 1.282.471 1.892a2.194 2.194 0 0 1-.496 2.316l-.524.525a10.964 10.964 0 0 0 3.352 3.352l.527-.527a2.192 2.192 0 0 1 2.312-.494 8.67 8.67 0 0 0 1.9.472A2.193 2.193 0 0 1 20 15.645z"
        fill="var(--white)"
        fillRule="evenodd"
        clipRule="evenodd"
        initial="hidden"
        animate="visible"
      />
    </svg>
  );
};

export const RingHangupButton = () => {
  const status = useDialer(state => state.status);
  const dialedPhoneNumber = useDialer(state => state.dialedPhoneNumber);
  const selectedPhoneNumber = useDialer(state => state.selectedPhoneNumber);
  const callStatus = useDialer(state => state.callStatus);
  const { settings } = useActiveUserSettings();
  const { startCall, hangCall, snapshot, setState } = useDialerStore();
  const disabled =
    status === DialerStatus.callEnded ||
    status === DialerStatus.authorizing ||
    status === DialerStatus.registering ||
    (status === DialerStatus.idle &&
      (dialedPhoneNumber?.length < 9 || !dialedPhoneNumber?.startsWith('+')));
  const shouldRenderGreenButton =
    DialerStatus.callEnded === status ||
    DialerStatus.idle === status ||
    status === DialerStatus.incoming;

  const onClickHandler = async () => {
    if (!disabled) {
      if (status === DialerStatus.idle) {
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CALL_BUTTON_ON_DIALER_OTO);
        const params = {
          twilioPhone: selectedPhoneNumber,
          isOutgoing: 'true',
          leadPhone: dialedPhoneNumber,
          userId: settings?.user?.id,
        };
        const { device, call } = snapshot();
        if (call) {
          console.log('There is already a call in progress');
          return;
        }
        const newCall = await device?.connect({ params });
        startCall(newCall);
        setState('status', DialerStatus.connected);
      }
      if (status !== DialerStatus.idle && status !== DialerStatus.incoming) {
        hangCall();
      }
      if (status === DialerStatus.incoming) {
        snapshot().call?.accept();
        setState('status', DialerStatus.connected);
        setState('incomingAccepted', true);
      }
    }
  };

  const buttonClasses = clsx(styles.ringHangupButton, {
    [styles.ringHangupButton_disabled]: disabled,
    [styles.ringHangupButton_hangup]: !shouldRenderGreenButton,
    [styles.ringHangupButton_loading]: status < DialerStatus.idle,
    [styles.ringHangupButton_animate]:
      callStatus === Call.State.Ringing ||
      callStatus === Call.State.Connecting ||
      callStatus === Call.State.Pending,
  });

  return (
    <div className={styles.ringHangupButtonContainer}>
      <motion.div
        className={buttonClasses}
        onClick={onClickHandler}
        animate={
          status === DialerStatus.incoming
            ? {
                scale: [1, 1.1, 1.1, 1, 1],
                rotate: [0, 0, 180, 180, 0],
              }
            : {}
        }
        transition={
          status === DialerStatus.incoming
            ? {
                duration: 2,
                ease: 'easeInOut',
                times: [0, 0.2, 0.5, 0.8, 1],
                loop: Infinity,
                repeatDelay: 1,
              }
            : {}
        }
      >
        {status < DialerStatus.idle ? (
          <LoadingRingButton />
        ) : (
          <Icon color="white" name={shouldRenderGreenButton ? 'phone' : 'phoneHang'} size={32} />
        )}
      </motion.div>
      {status === DialerStatus.incoming && (
        <div
          className={clsx(styles.ringHangupButton, styles.ringHangupButton_hangup)}
          onClick={() => {
            snapshot().call?.reject();
            hangCall();
          }}
        >
          <Icon name="phoneHang" size={32} color="white" />
        </div>
      )}
    </div>
  );
};
