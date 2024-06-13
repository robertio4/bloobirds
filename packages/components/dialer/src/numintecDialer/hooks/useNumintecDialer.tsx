import React, { useRef, useState } from 'react';

import { useOpenCCFWithoutObject } from '@bloobirds-it/hooks';
import { useEventSubscription } from '@bloobirds-it/plover';
import { Bobject, MIXPANEL_EVENTS, PluralBobjectTypes } from '@bloobirds-it/types';
import { api, getTextFromLogicRole, isLead } from '@bloobirds-it/utils';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';
import mixpanel from 'mixpanel-browser';

import { useDialer, useDialerStore } from '../../dialer';
import { fillReferenceFields, getMainBobjectId } from '../../utils';
import NumintecDialerFrame from '../numintecDialerFrame';

const NumintecContext = React.createContext(null);

type DialedContact = {
  leadName?: string;
  leadId?: string;
  companyName?: string;
  companyId?: string;
  multipleContacts: boolean;
  numberOfContacts?: number;
};

type NumintecWSEvent = {
  callSid: string;
  activityId?: string;
  leadId?: string;
  companyId?: string;
  action: string;
  event:
    | 'INCOMING_CALL'
    | 'CALL_ENDED'
    | 'on_outgoing_call_early'
    | 'on_incoming_call_early'
    | 'on_outgoing_call_terminated'
    | 'on_incoming_call_terminated'
    | 'on_incoming_call_missed';
  phoneUser?: string;
  phoneContact?: string;
};

export const NumintecDialer = () => {
  const dialedPhoneNumber = useDialer(state => state.dialedPhoneNumber);
  const {
    maximize,
    setActivity,
    closeExtendedScreen,
    snapshot,
    setActivityExternal,
    setMatchedBobject,
  } = useDialerStore();
  const [launch, setLaunch] = useState();
  const ref = useRef(null);
  const [activityCCF, setActivityCCF] = useState(null);
  const [showCorrectContactFlow, setShowCorrectContactFlow] = React.useState(false);
  const [mainActivityBobject, setMainActivityBobject] = React.useState(null);
  const { openWizard, resetWizardProperties } = useWizardContext();
  const [contact, setContact] = useState<DialedContact>(null);
  const [callId, setCallId] = useState(null);
  const hasOpenCCFWithoutObjectAccount = useOpenCCFWithoutObject();

  useEventSubscription('numintec', (data: NumintecWSEvent) => {
    window.onbeforeunload = null;
    switch (data?.event) {
      case 'INCOMING_CALL':
        setCallId(data?.callSid);
        setActivityExternal(null);
        setContactInfo(data?.phoneContact, setMatchedBobject);
        maximize();
        break;
      case 'on_outgoing_call_early':
      case 'on_incoming_call_early':
        setCallId(data?.callSid);
        setContactInfo(data?.phoneContact, setMatchedBobject);
        setActivity(data?.activityId, true);
        window.onbeforeunload = () => true;
        break;
      case 'on_outgoing_call_terminated':
      case 'on_incoming_call_terminated':
        setActivityExternal(null);
        setMainActivityBobject(null);
        setContact(null);
        break;
      case 'CALL_ENDED':
        setContact(null);
        getCallAndLaunchCCF(snapshot()?.activity);
        break;
      case 'on_incoming_call_missed':
        setContact(null);
        break;
    }
  });

  async function openCorrectContactFlow(activity: Bobject) {
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CALL_BUTTON_ON_NUMINTEC_OTO);
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

  const getCallAndLaunchCCF = async (activity: Bobject) => {
    if (!document.hidden && activity) {
      if (activity) {
        api.get(`/bobjects/${activity?.id?.value}/form?injectReferences=true`).then(response => {
          if (response?.data) {
            const activityToCCF = fillReferenceFields(response?.data);
            if (activityToCCF) {
              setActivityCCF(activityToCCF);
              openCorrectContactFlow(activityToCCF);
            }
          }
        });
      }
    }
  };

  const setContactInfo = async (phoneNumber: string, setMatchedBobject: (bobject) => void) => {
    setMatchedBobject(null);
    const response = await api.post('/calls/whiteLabel/search', { phoneNumber });
    if (response.status !== 200) {
      setMatchedBobject({
        hasMatched: false,
      });
      return;
    }
    const bobjects: Bobject[] = Array.isArray(response.data) ? response.data : [response.data];

    if (bobjects.length === 0) {
      setMatchedBobject({
        hasMatched: false,
      });
      return;
    }

    if (bobjects.length > 1) {
      // Multiple bobjects with the same phone number, notify the user
      setContact({
        multipleContacts: true,
        numberOfContacts: bobjects.length,
      });
      setMatchedBobject({
        hasMatched: false,
      });
      return;
    }
    const bobject = bobjects[0];
    const leadName = isLead(bobject) ? getTextFromLogicRole(bobject, 'LEAD__FULL_NAME') : undefined;
    const leadId = isLead(bobject) ? bobject.id.value : undefined;
    const companyId = isLead(bobject)
      ? getTextFromLogicRole(bobject, 'LEAD__COMPANY')
      : bobject.id.value;
    setContact({
      leadName,
      leadId,
      companyName: isLead(bobject)
        ? getTextFromLogicRole(bobject, 'LEAD__COMPANY_NAME')
        : getTextFromLogicRole(bobject, 'COMPANY__NAME'),
      companyId,
      multipleContacts: false,
    });
    const foundBobject = {
      bobject,
      companyId,
      id: leadId,
      name: leadName,
      type: bobject.id.typeName,
      hasMatched: true,
    };
    setMatchedBobject(foundBobject);
  };

  function handleClose() {
    closeExtendedScreen();
    setActivityExternal(null);
    setActivityCCF(null);
    setShowCorrectContactFlow(false);
    setMainActivityBobject(null);
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }

  return (
    <NumintecContext.Provider
      value={{
        launch,
        setLaunch,
        contact,
      }}
    >
      <>
        <NumintecDialerFrame ref={ref} />
        {showCorrectContactFlow &&
          activityCCF &&
          (mainActivityBobject || hasOpenCCFWithoutObjectAccount) &&
          openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activityCCF, {
            referenceBobject: mainActivityBobject,
            handleClose: handleClose,
          })}
      </>
    </NumintecContext.Provider>
  );
};

export const useNumintecDialer = () => {
  const context = React.useContext(NumintecContext);
  if (!context) {
    throw new Error('useNumintecDialer must be used within the NumintecProvider');
  }

  return context;
};
