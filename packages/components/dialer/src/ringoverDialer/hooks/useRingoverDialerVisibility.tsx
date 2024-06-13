import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useOpenCCFWithoutObject } from '@bloobirds-it/hooks';
import { Bobject, MIXPANEL_EVENTS, PluralBobjectTypes } from '@bloobirds-it/types';
import {
  api,
  getTextFromLogicRole,
  isLead,
  isSalesforcePage,
  normalizeUrl,
} from '@bloobirds-it/utils';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';
import mixpanel from 'mixpanel-browser';
// That is not pretty, but if not is not working with dist$1 is not a constructor
import RingoverSDK from 'ringover-sdk';
import useSWR from 'swr';

import { useDialer, useDialerStore } from '../../dialer';
import { fillReferenceFields, getMainBobjectId } from '../../utils';
import RingoverDialerFrame from '../ringoverDialerFrame';

const RingoverContext = React.createContext(null);

type DialedContact = {
  leadName?: string;
  leadId?: string;
  companyName?: string;
  companyId?: string;
  multipleContacts: boolean;
  numberOfContacts?: number;
};

export const RingoverDialer = () => {
  const dialedPhoneNumber = useDialer(state => state.dialedPhoneNumber);
  const { maximize, setActivityExternal, closeExtendedScreen } = useDialerStore();
  const [launch, setLaunch] = useState();
  const ref = useRef(null);
  const [activityCCF, setActivityCCF] = useState(null);
  const [showCorrectContactFlow, setShowCorrectContactFlow] = React.useState(false);
  const [mainActivityBobject, setMainActivityBobject] = React.useState(null);
  const { openWizard, resetWizardProperties } = useWizardContext();
  const [contact, setContact] = useState<DialedContact>(null);
  const [callId, setCallId] = useState(null);
  const hasOpenCCFWithoutObjectAccount = useOpenCCFWithoutObject();

  const { data: activity } = useSWR(
    callId ? `/calls/ringover/calls/${callId}` : null, // TODO: create endpoint to get call activity
    async url => {
      const response = await api.get(url);
      return response?.data;
    },
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (retryCount >= 15) {
          return;
        }
        setTimeout(() => revalidate({ retryCount }), 1000);
      },
    },
  );

  useEffect(() => {
    if (activity) {
      setActivityExternal(activity);
    }
  }, [activity]);

  async function openCorrectContactFlow(activity: Bobject) {
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CALL_BUTTON_ON_AIRCALL_OTO); // TODO: change event name
    const mainBobjectId = getMainBobjectId(activity);
    if (mainBobjectId) {
      const response = await api.get(
        `/linkedin/${PluralBobjectTypes[mainBobjectId.split('/')[1]]?.toLowerCase()}/${
          mainBobjectId.split('/')[2]
        }`,
      );
      setMainActivityBobject(response?.data);
    }
    setShowCorrectContactFlow(true);
  }

  const createCallAndLaunchCCF = async (details: any) => {
    const { data: activity } = await api.post('/calls/ringover/calls/' + details?.call_id + '/end');
    if (activity) {
      api.get(`/bobjects/${activity?.activity}/form?injectReferences=true`).then(response => {
        if (response?.data) {
          const activityToCCF = fillReferenceFields(response?.data);
          if (activityToCCF) {
            setActivityCCF(activityToCCF);
            openCorrectContactFlow(activityToCCF);
          }
        }
      });
    }
  };

  const setContactInfo = async (phoneNumber: string) => {
    const response = await api.post('/calls/whiteLabel/search', { phoneNumber });
    if (response.status !== 200) {
      return;
    }
    const bobjects: Bobject[] = Array.isArray(response.data) ? response.data : [response.data];
    if (bobjects.length === 0) {
      return;
    }

    if (bobjects.length > 1) {
      // Multiple bobjects with the same phone number, notify the user
      setContact({
        multipleContacts: true,
        numberOfContacts: bobjects.length,
      });
      return;
    }
    const bobject = bobjects[0];
    setContact({
      leadName: isLead(bobject) ? getTextFromLogicRole(bobject, 'LEAD__FULL_NAME') : undefined,
      leadId: isLead(bobject) ? bobject.id.value : undefined,
      companyName: isLead(bobject)
        ? getTextFromLogicRole(bobject, 'LEAD__COMPANY_NAME')
        : getTextFromLogicRole(bobject, 'COMPANY__NAME'),
      companyId: isLead(bobject)
        ? getTextFromLogicRole(bobject, 'LEAD__COMPANY')
        : bobject.id.value,
      multipleContacts: false,
    });
  };

  const ringoverPhoneExt = useMemo(() => {
    if (ref.current) {
      try {
        // @ts-ignore
        const newPhone = new RingoverSDK({
          // "fixed", "relative", "absolute"
          type: 'relative',

          // "big", "medium", "small", "auto"
          size: 'auto',

          container: 'ringover-phone',

          position: {
            top: null,
            bottom: '2px',
            left: '2px',
            right: '2px',
          },

          // true, false
          border: false,

          // true, false
          animation: true,

          // "rgb(0,0,0)", "#eee", "red"
          backgroundColor: 'transparent',

          // true, false
          trayicon: false,
        });

        newPhone.on('ringingCall', e => {
          if (e.data.direction === 'in') {
            setContactInfo(e.data.from);
            closeExtendedScreen();
            setActivityExternal(null);
            setTimeout(() => setCallId(e.data.call_id), 3000);
            maximize();
          } else {
            setContactInfo(e.data.to);
            closeExtendedScreen();
            setActivityExternal(null);
            setTimeout(() => setCallId(e.data.call_id), 3000);
          }
        });

        newPhone.on('hangupCall', e => {
          // Close the lead details
          setContact(null);
          createCallAndLaunchCCF(e.data);
        });

        newPhone.generate();
        return newPhone;
      } catch (e) {
        console.error('setting ringover sdk error', e);
      }
    }
    return null;
  }, [ref.current, launch]);

  useEffect(() => {
    if (dialedPhoneNumber) {
      if (isSalesforcePage(normalizeUrl(window.location.href))) {
        // TODO: check if that is necesary
        const possibleCti = document.querySelector('iframe[src*="cti.ringover.io"]');
        if (possibleCti) {
          possibleCti.remove();
          setTimeout(
            // @ts-ignore
            ringoverPhoneExt?.dial(dialedPhoneNumber),
            1,
          );
        } else {
          ringoverPhoneExt?.dial(dialedPhoneNumber);
        }
      } else {
        ringoverPhoneExt?.dial(dialedPhoneNumber);
      }
    }
  }, [dialedPhoneNumber, ringoverPhoneExt]);

  function handleClose() {
    closeExtendedScreen();
    setActivityExternal(null);
    setActivityCCF(null);
    setShowCorrectContactFlow(false);
    setMainActivityBobject(null);
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }
  return (
    <RingoverContext.Provider
      value={{
        ringoverPhoneExt,
        launch,
        setLaunch,
        contact,
      }}
    >
      <>
        <RingoverDialerFrame ref={ref} />
        {showCorrectContactFlow &&
          activityCCF &&
          (mainActivityBobject || hasOpenCCFWithoutObjectAccount) &&
          openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activityCCF, {
            referenceBobject: mainActivityBobject,
            handleClose: handleClose,
          })}
      </>
    </RingoverContext.Provider>
  );
};

export const useRingoverDialer = () => {
  const context = React.useContext(RingoverContext);
  if (!context) {
    throw new Error('useRingoverDialer must be used within the RingoverProvider');
  }

  return context;
};

export const useRingoverDialerVisibility = () => {
  const { ringoverPhoneExt } = useRingoverDialer();

  const openRingoverDialer = phoneNumber => {
    ringoverPhoneExt?.send('dial_number', { phone_number: phoneNumber }, () => {});
  };

  return {
    openRingoverDialer: openRingoverDialer,
  };
};
