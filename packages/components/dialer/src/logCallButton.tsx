import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, useToasts } from '@bloobirds-it/flamingo-ui';
import { serialize, useRichTextEditorPlugins } from '@bloobirds-it/rich-text-editor';
import { MIXPANEL_EVENTS } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import clsx from 'clsx';
import md5 from 'md5';
import mixpanel from 'mixpanel-browser';

import { useDialer, useDialerStore } from './dialer';
import styles from './dialer.module.css';

export const LogCallButton = () => {
  const { createToast } = useToasts();
  const dialedNumber = useDialer(state => state.dialedPhoneNumber);
  const userPhoneNumber = useDialer(state => state.selectedPhoneNumber);
  const bobject = useDialer(state => state.bobjectMatch);
  const callDirection = useDialer(state => state.callDirection);
  const [loggingCall, setLoggingCall] = useState<boolean>(false);
  const { setActivityLogCall, snapshot, finishCall } = useDialerStore();

  const { t } = useTranslation();

  const plugins = useRichTextEditorPlugins({
    images: false,
  });

  async function logCall() {
    setLoggingCall(true);
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_LOG_CALL_BUTTON_ON_DIALER_OTO);
    const activity = await api.post(
      `/calls/whiteLabel/call${bobject && bobject.hasMatched ? '' : '?mandatoryMatch=false'}`,
      {
        sdrPhone: userPhoneNumber,
        leadPhone: dialedNumber,
        leadId: bobject?.type === 'Lead' ? bobject?.id : null,
        companyId: bobject?.type === 'Company' ? bobject?.id : null,
        direction: callDirection === 'inbound' ? 'INCOMING' : 'OUTGOING',
        callDateTime: new Date().toISOString(),
        callSid: `BB${md5(`${userPhoneNumber}${dialedNumber}${new Date().toISOString()}`)}`,
        otherFields: {
          ACTIVITY__NOTE: serialize(snapshot().note, {
            format: 'AST',
            plugins,
          }),
        },
      },
    );
    setActivityLogCall(activity?.data.activity?.value);

    createToast({ message: t('dialer.logCall.toast.success'), type: 'success' });

    // Wait 1.5 seconds and clear the activity log call
    setTimeout(() => {
      setLoggingCall(false);
      finishCall();
    }, 1500);
  }

  const disabled =
    !bobject ||
    !dialedNumber ||
    dialedNumber.length <= 9 ||
    !dialedNumber.startsWith('+') ||
    loggingCall;
  return (
    <>
      <div className={styles.spacer} />
      <div
        className={clsx(styles.logCallButton, {
          [styles.logCallButton__disabled]: disabled,
        })}
        onClick={() => {
          if (!disabled) logCall();
        }}
      >
        <Icon name="noteAction" size={16} color="white" />
        {t('dialer.logCall.button')}
      </div>
    </>
  );
};
