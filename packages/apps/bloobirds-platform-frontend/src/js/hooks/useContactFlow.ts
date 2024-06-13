import { ACTIVITY_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { getFieldByLogicRole } from '@bloobirds-it/utils';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

import { COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE } from '../constants/company';
import { LEAD_SALES_STATUS_VALUES_LOGIC_ROLE } from '../constants/lead';
import { useActivity } from './useActivity';

const callResultStepAtom = atom({
  key: 'callResultStepAtom',
  default: {
    callResult: null,
    pitch: {
      done: null,
      template: null,
    },
    loaded: false,
  },
});

const noteStepAtom = atom({
  key: 'noteStepAtom',
  default: null,
});

const changeStatusStepAtom = atom({
  key: 'changeStatusStepAtom',
  default: {
    companyStatus: null,
    companyReasonToDiscard: null,
    leadStatus: null,
    leadReasonToDiscard: null,
  },
});

const changeSalesStatusStepAtom = atom({
  key: 'changeSalesStatusStepAtom',
  default: {
    companyStatus: COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.ACTIVE,
    companyReasonToDiscard: null,
    leadStatus: LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.ACTIVE,
    leadReasonToDiscard: null,
  },
});

const contactFlowOpenAtom = atom({
  key: 'contactFlowOpenAtom',
  default: false,
});

const scheduleStepAtom = atom({
  key: 'scheduleStepAtom',
  default: {
    title: 'Untitled task',
    dateTime: null,
    companyId: null,
    leadId: null,
    opportunityId: null,
    time: null,
  },
});

export const useContactFlowVisibility = () => {
  const [contactFlowOpen, setContactFlowOpen] = useRecoilState(contactFlowOpenAtom);

  const openContactFlow = () => {
    if (!contactFlowOpen) {
      setContactFlowOpen(true);
    }
  };

  const closeContactFlow = () => {
    if (contactFlowOpen) {
      setContactFlowOpen(false);
    }
  };

  return {
    isOpen: contactFlowOpen,
    openContactFlow,
    closeContactFlow,
  };
};

export const useContactFlow = () => {
  const { isOpen, openContactFlow, closeContactFlow } = useContactFlowVisibility();
  const [scheduleStepData, setScheduleStepData] = useRecoilState(scheduleStepAtom);
  const [callResultStepData, setCallResultStepData] = useRecoilState(callResultStepAtom);
  const [noteStepData, setNoteStepData] = useRecoilState(noteStepAtom);
  const [changeStatusStepData, setChangeStatusStepData] = useRecoilState(changeStatusStepAtom);
  const [changeSalesStatusStepData, setChangeSalesStatusStepData] = useRecoilState(
    changeSalesStatusStepAtom,
  );
  const resetScheduleStepData = useResetRecoilState(scheduleStepAtom);
  const resetCallResultStepData = useResetRecoilState(callResultStepAtom);
  const resetNoteStepData = useResetRecoilState(noteStepAtom);
  const resetChangeStatusStepData = useResetRecoilState(changeStatusStepAtom);
  const resetChangeSalesStatusStepData = useResetRecoilState(changeSalesStatusStepAtom);
  const {
    activity,
    bulkReportedActivityResult,
    reportedActivityResult,
    resetActivity,
    setActivityWithId,
    updateActivity,
  } = useActivity('contactFlow', true);

  const setActivityId = (activityId: string) => {
    setActivityWithId(activityId);
  };

  const activityCompany = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const activityLead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)
    ?.referencedBobject;
  const activityOpportunity = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const referencedBobject = activityOpportunity || activityLead || activityCompany;

  return {
    activity,
    referencedBobject,
    callResultStepData,
    changeStatusStepData,
    changeSalesStatusStepData,
    isOpen,
    noteStepData,
    scheduleStepData,
    bulkReportedActivityResult,
    closeContactFlow,
    openContactFlow,
    reportedActivityResult,
    resetActivity,
    resetCallResultStepData,
    resetChangeStatusStepData,
    resetChangeSalesStatusStepData,
    resetNoteStepData,
    resetScheduleStepData,
    setActivityId,
    setCallResultStepData,
    setChangeStatusStepData,
    setChangeSalesStatusStepData,
    setNoteStepData,
    setScheduleStepData,
    updateActivity,
  };
};
