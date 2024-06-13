import { useEffect, useState } from 'react';

import { useEventSubscription } from '@bloobirds-it/plover';
import { useMachine } from '@xstate/react';
import { atom, useRecoilState } from 'recoil';

import { CONNECTION_EVENT_TYPES, DEVICES_EVENT_TYPES } from '../components/dialer/dialer.constants';
import DialerMachine from '../components/dialer/dialer.machine';
import { isCallActive } from '../components/dialer/dialer.utils';
import { getValueFromLogicRole } from '../utils/bobjects.utils';
import { useActivity } from './useActivity';
import { useCompany } from './useCompany';
import { useLeads } from './useLeads';
import { useOpportunity } from './useOpportunity';
import { usePrevious } from './usePrevious';

const dialerOpenAtom = atom({
  key: 'dialerOpen',
  default: false,
});

const tryingToCloseAtom = atom({
  key: 'tryingToCloseAtom',
  default: false,
});

export const useDialerVisibility = () => {
  const [open, setOpen] = useRecoilState(dialerOpenAtom);
  const [tryingToClose, setTryingToClose] = useRecoilState(tryingToCloseAtom);
  const { resetActivity } = useActivity('dialer');
  const { resetCompany, setCompany } = useCompany('dialer');
  const { resetOpportunity, setOpportunity } = useOpportunity('dialer');
  const { updateLeads, updateSelectedLead, resetLeads } = useLeads('dialer');

  const openDialer = ({ company, leads, selectedLeadId, opportunity = null }) => {
    setCompany(company);
    setOpportunity(opportunity);
    updateLeads(leads);
    updateSelectedLead(selectedLeadId || leads[0]?.id.value);
    setOpen(true);
  };

  const closeDialer = () => {
    setOpen(false);
    resetCompany();
    resetOpportunity();
    resetLeads();
    resetActivity();
  };

  const tryToCloseDialer = () => {
    setTryingToClose(true);
  };

  return {
    isOpen: open,
    tryToCloseDialer,
    tryingToClose,
    openDialer,
    closeDialer,
  };
};

export const useDialer = () => {
  const { company, getCompanyById, resetCompany } = useCompany('dialer');
  const { opportunity } = useOpportunity('dialer');
  const { activity, setActivityWithId, resetActivity, updateActivity } = useActivity('dialer');
  const {
    leads,
    updateSingleLead,
    selectedLead,
    updateLeadsByCompany,
    updateSelectedLead,
    resetLeads,
  } = useLeads('dialer');

  const { isOpen, tryingToClose, openDialer, closeDialer } = useDialerVisibility();
  const [state, send] = useMachine(DialerMachine);

  const { context, value } = state;
  const { token, device, connection } = context;
  const emitEvent = (type, callConnection) => send(type, { connection: callConnection });

  const [recievedWSActivity, setRecievedWSActivity] = useState();
  useEventSubscription('twilio-response', setRecievedWSActivity);

  const previousConnection = usePrevious(connection);

  useEffect(() => {
    if (!activity && recievedWSActivity) {
      const companyId = company?.id.value.split('/')[2];
      const activityCompanyId =
        recievedWSActivity.companyId === 'undefined' ? undefined : recievedWSActivity.companyId;
      const activityLeadId = recievedWSActivity.leadId;
      if ((!company || activityCompanyId !== companyId) && activityCompanyId) {
        getCompanyById(activityCompanyId?.split('/')[2]);
        updateLeadsByCompany(activityCompanyId);
        updateSelectedLead(activityLeadId);
      }
      if (company && activityLeadId !== selectedLead?.id.value) {
        updateSelectedLead(activityLeadId);
      }
      if (
        !activityCompanyId &&
        (!selectedLead?.id.value || activityLeadId !== selectedLead?.id.value) &&
        activityLeadId
      ) {
        updateSingleLead(activityLeadId?.split('/')[2]);
        updateSelectedLead(activityLeadId);
        resetCompany();
      }
      if (!activityCompanyId && company) {
        resetCompany();
        resetLeads();
      }

      setActivityWithId(recievedWSActivity.activityId);
    } else if (
      activity &&
      recievedWSActivity &&
      activity.id.objectId !== recievedWSActivity?.activityId
    ) {
      setActivityWithId(recievedWSActivity.activityId);
    }
  }, [recievedWSActivity]);

  const handleCloseDialer = () => {
    send('finish');
    closeDialer();
  };

  // I think all the below useEffects could be done in the state machine
  useEffect(() => {
    if (device) {
      DEVICES_EVENT_TYPES.forEach(typeOfEvent => {
        device.on(typeOfEvent, callConnection => {
          emitEvent(typeOfEvent, callConnection);
        });
      });
    }
    return () => {
      if (device) {
        device.disconnectAll();
        device.destroy();
      }
    };
  }, [device]);

  useEffect(() => {
    if (token) {
      send('initDevice', { token });
    }
  }, [token]);

  useEffect(() => {
    if (!connection) {
      resetActivity();
    }
    if (connection) {
      if (previousConnection) {
        resetActivity();
      }
      CONNECTION_EVENT_TYPES.forEach(typeOfEvent => {
        connection.on(typeOfEvent, eventResponse => {
          emitEvent(typeOfEvent, eventResponse);
        });
      });
    }
  }, [connection]);

  useEffect(() => {
    if (activity) {
      const callSid = getValueFromLogicRole(activity, 'ACTIVITY__CALL_SID');
      send('setCallSid', { callSid });
    }
  }, [activity]);

  useEffect(() => {
    if (tryingToClose && !isCallActive(value)) {
      closeDialer();
    }
  }, [tryingToClose, value]);

  return {
    activity,
    company,
    context,
    getCompanyById,
    handleCloseDialer,
    isOpen,
    leads,
    openDialer,
    opportunity,
    selectedLead,
    send,
    updateActivity,
    updateLeadsByCompany,
    updateSelectedLead,
    value,
  };
};
