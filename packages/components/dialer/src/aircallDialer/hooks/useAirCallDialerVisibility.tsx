import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useActiveAccountId, useOtoUpdateContactId } from '@bloobirds-it/hooks';
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
import useSWR from 'swr';

import { useDialer, useDialerStore } from '../../dialer';
import { fillReferenceFields, getMainBobjectId } from '../../utils';
import AirCallDialer from '../airCallDialerFrame';
// That is not pretty, but if not is not working with dist$1 is not a constructor
import AircallPhone from './aircallDialer';

const AircallContext = React.createContext(null);

type DialedContact = {
  leadName?: string;
  leadId?: string;
  companyName?: string;
  companyId?: string;
  multipleContacts: boolean;
  numberOfContacts?: number;
};

export const AircallDialer = () => {
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
  const accountId = useActiveAccountId();
  const hasOtoUpdateContactId = useOtoUpdateContactId(accountId);

  const { data: activity } = useSWR(
    callId ? `/calls/aircall/calls/${callId}` : null,
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
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CALL_BUTTON_ON_AIRCALL_OTO);
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
    const { data: activity } = await api.post('/calls/aircall/calls/' + details?.call_id + '/end');

    if (activity) {
      api
        .get(`/bobjects/${activity?.activity?.value}/form?injectReferences=true`)
        .then(response => {
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
    const bobjects: Bobject[] = response.data;
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

  const aircallPhoneExt = useMemo(() => {
    window.onbeforeunload = null;
    if (ref.current) {
      try {
        // @ts-ignore
        const newPhone = new AircallPhone({
          onLogin: () => {},
          onLogout: () => {},
          domToLoadPhone: '#phone',
          size: 'auto',
        });

        newPhone.on('incoming_call', e => {
          // Search lead / company with e.from
          setContactInfo(e.from);
          setCallId(e.call_id);
          closeExtendedScreen();
          setActivityExternal(null);
          maximize();
          window.onbeforeunload = () => true;
        });

        newPhone.on('outgoing_call', e => {
          // Search lead / company with e.to
          setContactInfo(e.to);
          closeExtendedScreen();
          setActivityExternal(null);
          setCallId(e.call_id);
          window.onbeforeunload = () => true;
        });

        newPhone.on('call_end_ringtone', e => {
          if (e.answer_status !== 'answered') {
            // Close the lead details
            setContact(null);
          }
        });

        // Manually log the call regardless of the webhook on the aircall side
        newPhone.on('call_ended', e => {
          // Close the lead details
          setContact(null);
          createCallAndLaunchCCF(e);
          window.onbeforeunload = null;
        });
        return newPhone;
      } catch (e) {
        console.log(e);
      }
    }
    return null;
  }, [ref.current, launch]);

  useEffect(() => {
    if (dialedPhoneNumber) {
      if (isSalesforcePage(normalizeUrl(window.location.href))) {
        const possibleCti = document.querySelector('iframe[src*="cti.aircall.io"]');
        if (possibleCti) {
          possibleCti.remove();
          setTimeout(
            // @ts-ignore
            aircallPhoneExt?.send('dial_number', { phone_number: dialedPhoneNumber }, () => {}),
            1,
          );
        } else {
          aircallPhoneExt?.send('dial_number', { phone_number: dialedPhoneNumber }, () => {});
        }
      } else {
        aircallPhoneExt?.send('dial_number', { phone_number: dialedPhoneNumber }, () => {});
      }
    }
  }, [dialedPhoneNumber, aircallPhoneExt]);

  function handleClose() {
    closeExtendedScreen();
    setActivityExternal(null);
    setActivityCCF(null);
    setShowCorrectContactFlow(false);
    setMainActivityBobject(null);
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }
  return (
    <AircallContext.Provider
      value={{
        aircallPhoneExt,
        launch,
        setLaunch,
        contact,
      }}
    >
      <>
        <AirCallDialer ref={ref} />
        {showCorrectContactFlow &&
          activityCCF &&
          (mainActivityBobject || hasOtoUpdateContactId) &&
          openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activityCCF, {
            referenceBobject: mainActivityBobject,
            handleClose: handleClose,
          })}
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
  const { aircallPhoneExt } = useAircallDialer();

  const openAirCallDialer = phoneNumber => {
    aircallPhoneExt?.send('dial_number', { phone_number: phoneNumber }, () => {});
  };

  return {
    openAirCallDialer,
  };
};
