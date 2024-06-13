import {
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE,
  COMPANY_STATUS,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE,
  LEAD_STATUS,
} from '@bloobirds-it/types';
import { assign, createMachine } from 'xstate';

import { CALL_RESULTS_LOGIC_ROLE } from '../types/contactFlowTypes';

export const MODAL_STEPS = Object.seal({
  CONTACT_FLOW: 'CONTACT_FLOW',
  CADENCE_CONTROL: 'CADENCE_CONTROL',
  CHANGE_STATUS: 'CHANGE_STATUS',
});

export const STEPS = Object.seal({
  INITIAL: 'INITIAL',
  CALL_RESULTS_OPP: 'CALL_RESULTS_OPP',
  CALL_RESULTS: 'CALL_RESULTS',
  CHANGE_STATUS: 'CHANGE_STATUS',
  CONVERT_OBJECT: 'CONVERT_OBJECT',
  NOTES_AND_QQ: 'NOTES_AND_QQ',
  SALES_CHANGE_STATUS: 'SALES_CHANGE_STATUS',
  SCHEDULE_NEXT_STEPS: 'SCHEDULE_NEXT_STEPS',
});

const isCorrectContact = (context, event) =>
  context?.callResult === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT || event?.isCorrectContact;
const isNoAnswerStatus = (context, event) => {
  const callResult = event?.callResult || context?.callResult;
  return [CALL_RESULTS_LOGIC_ROLE.NO_ANSWER, CALL_RESULTS_LOGIC_ROLE.WRONG_DATA].includes(
    callResult,
  );
};
const isCorrectContactAndHasSalesLead = (context, event) => {
  return isCorrectContact(context, event) && event.isLeadInSalesStage;
};
const canStatusHaveNextStep = (context, event) =>
  event.companyStatus === COMPANY_STATUS.NURTURING || event.leadStatus === LEAD_STATUS.NURTURING;
const isLeadDiscarded = (context, event) => event.leadStatus === LEAD_STATUS.DISCARDED;
const isDiscardedStatus = (context, event) =>
  event.leadStatus === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED ||
  event.companyStatus === COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED;
const canCreateMeeting = (context, event) =>
  event.companyStatus === COMPANY_STATUS.MEETING || event.leadStatus === LEAD_STATUS.MEETING;
const canOpenCadenceControl = (context, event) => {
  context.bobject = event.bobject;
  return (
    event.companyStatus === COMPANY_STATUS.CONTACTED ||
    event.companyStatus === COMPANY_STATUS.ENGAGED ||
    event.companyStatus === COMPANY_STATUS.ON_PROSPECTION ||
    //nonsense, I know but all this should be refactored
    event.leadStatus === COMPANY_STATUS.ON_PROSPECTION ||
    event.leadStatus === COMPANY_STATUS.ENGAGED ||
    event.leadStatus === COMPANY_STATUS.ON_PROSPECTION
  );
};

const hasNoReferenceBobject = context => !context.referenceBobject;

const closeModals = context => context.handleClose();

const createMeeting = context => {
  context.handleClose();
  if (
    context?.handleOpenMinimizableModal &&
    typeof context.handleOpenMinimizableModal === 'function'
  ) {
    context.handleOpenMinimizableModal(context.isCalendarEnabled ? 'calendarMeeting' : 'meeting');
  }
};

const openCadenceControl = context => {
  context.openCadenceControl();
};

const isCorrectContactAndNotHasSalesLead = (context, event) => {
  return isCorrectContact(context, event) && !event.isLeadInSalesStage;
};

const canCreateOpportunity = (context, event) =>
  (event.companyStatus === COMPANY_STATUS.ACCOUNT || event.leadStatus === LEAD_STATUS.CONTACT) &&
  canUseSalesFeatures(context);

const canConvertBoject = (context, event) => {
  context.bobject = event.bobject;
  return (
    (event.companyStatus === COMPANY_STATUS.ACCOUNT || event.leadStatus === LEAD_STATUS.CONTACT) &&
    canUseSalesFeatures(context)
  );
};
const leadHasDefinitiveStatus = (context, event) =>
  [LEAD_STATUS.DISCARDED, LEAD_STATUS.ON_HOLD].includes(event.leadStatus);
const isDefinitiveStatus = (context, event) =>
  event.leadStatus === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED ||
  event.leadStatus === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD ||
  event.companyStatus === COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED ||
  event.companyStatus === COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD;
const isLeadWithOpportunity = (context, event) =>
  !!event?.leadOpportunityId || context?.leadOpportunityId;

const setSelectOpportunity = context => {
  context.updateSelectedOpportunity(context.opportunity);
};

const setConvertData = context => {
  context.setConvertData({ bobjectToSet: context.bobject });
};

const saveConvertedLeads = assign({
  convertedLeads: (_, event) => event.leads,
});

const canUseSalesFeatures = context => context.hasSalesFeatureEnabled;

export const EVENTS = Object.seal({
  NEXT: 'NEXT',
  PREVIOUS: 'PREVIOUS',
  SKIP: 'SKIP',
});

export const stepsMachine = createMachine({
  id: 'contact_flow_steps',
  context: {
    callResult: null,
    convertedLeads: null,
    handleClose: null,
    handleOpenMinimizableModal: null,
    handleOpenCreateTask: null,
    referenceBobject: null,
    hasSalesEnabled: false,
    isAccount: null,
    leadOpportunityId: null,
    openAddActivity: null,
    openAddOpportunity: null,
    openCadenceControl: null,
    openCreateTask: null,
    setConvertData: null,
    updateSelectedOpportunity: null,
    isCalendarEnabled: null,
  },
  initial: STEPS.INITIAL,
  states: {
    [STEPS.INITIAL]: {
      on: {
        [STEPS.CHANGE_STATUS]: STEPS.CHANGE_STATUS,
        [STEPS.SALES_CHANGE_STATUS]: STEPS.SALES_CHANGE_STATUS,
        [STEPS.CALL_RESULTS]: STEPS.CALL_RESULTS,
        [STEPS.CALL_RESULTS_OPP]: STEPS.CALL_RESULTS_OPP,
      },
    },
    [STEPS.CALL_RESULTS_OPP]: {
      on: {
        [EVENTS.NEXT]: [
          {
            target: STEPS.SALES_CHANGE_STATUS,
            cond: isCorrectContactAndHasSalesLead,
          },
          {
            actions: [openCadenceControl],
          },
        ],
      },
    },
    [STEPS.CALL_RESULTS]: {
      on: {
        [EVENTS.NEXT]: [
          {
            actions: [closeModals],
            cond: hasNoReferenceBobject,
          },
          {
            target: STEPS.CHANGE_STATUS,
            cond: isNoAnswerStatus,
            actions: assign({
              callResult: (context, event) => event.callResult,
            }),
          },
          {
            target: STEPS.NOTES_AND_QQ,
            actions: assign({
              callResult: (context, event) => event.callResult,
            }),
          },
        ],
      },
    },
    [STEPS.NOTES_AND_QQ]: {
      on: {
        [EVENTS.NEXT]: [
          {
            target: STEPS.CHANGE_STATUS,
            cond: isCorrectContact,
          },
          {
            target: STEPS.SCHEDULE_NEXT_STEPS,
          },
        ],
        [EVENTS.PREVIOUS]: STEPS.CALL_RESULTS,
      },
    },
    [STEPS.CHANGE_STATUS]: {
      on: {
        [EVENTS.NEXT]: [
          {
            target: STEPS.SCHEDULE_NEXT_STEPS,
            cond: canStatusHaveNextStep,
          },
          {
            actions: [closeModals],
            cond: isLeadDiscarded,
          },
          {
            actions: [createMeeting],
            cond: canCreateMeeting,
          },
          {
            actions: [openCadenceControl],
            cond: canOpenCadenceControl,
          },
          {
            actions: [closeModals],
          },
        ],
        [EVENTS.PREVIOUS]: [
          {
            target: STEPS.CALL_RESULTS,
            cond: isNoAnswerStatus,
          },
          {
            target: STEPS.NOTES_AND_QQ,
          },
        ],
        [EVENTS.SKIP]: [{ actions: [openCadenceControl] }],
      },
    },
    [STEPS.SALES_CHANGE_STATUS]: {
      on: {
        [EVENTS.NEXT]: [
          {
            actions: [closeModals],
            cond: isDiscardedStatus,
          },
          {
            actions: [openCadenceControl],
          },
        ],
        [EVENTS.PREVIOUS]: [
          {
            target: STEPS.CALL_RESULTS_OPP,
          },
        ],
      },
    },
    [STEPS.SCHEDULE_NEXT_STEPS]: {
      on: {
        [EVENTS.PREVIOUS]: [
          {
            target: STEPS.CHANGE_STATUS,
            cond: isCorrectContact,
          },
          {
            target: STEPS.CHANGE_STATUS,
            cond: isNoAnswerStatus,
          },
          {
            target: STEPS.NOTES_AND_QQ,
          },
        ],
        [EVENTS.NEXT]: [
          {
            actions: [closeModals],
          },
        ],
        [EVENTS.SKIP]: [
          {
            actions: [closeModals],
          },
        ],
      },
    },
  },
});

export const modalStepsMachine = createMachine({
  id: 'contact_flow_modal_control',
  context: {
    handleClose: null,
  },
  initial: MODAL_STEPS.CONTACT_FLOW,
  states: {
    [MODAL_STEPS.CONTACT_FLOW]: {
      on: {
        [MODAL_STEPS.CADENCE_CONTROL]: MODAL_STEPS.CADENCE_CONTROL,
        [MODAL_STEPS.CHANGE_STATUS]: MODAL_STEPS.CHANGE_STATUS,
      },
    },
    [MODAL_STEPS.CADENCE_CONTROL]: {
      on: {
        [EVENTS.NEXT]: closeModals,
        [MODAL_STEPS.CHANGE_STATUS]: MODAL_STEPS.CHANGE_STATUS,
      },
    },
    [MODAL_STEPS.CHANGE_STATUS]: {
      on: {
        [EVENTS.NEXT]: closeModals,
        [MODAL_STEPS.CHANGE_STATUS]: MODAL_STEPS.CHANGE_STATUS,
      },
    },
  },
});

export const getCustomMachine = customWizardsMap => {
  if (
    customWizardsMap != null &&
    customWizardsMap.CONTACT_FLOW_OTO != null &&
    customWizardsMap.CONTACT_FLOW_OTO !== ''
  ) {
    const customMachine = createMachine(JSON.parse(customWizardsMap.CONTACT_FLOW_OTO), {
      actions: {
        closeModals,
        setSelectOpportunity,
        openCadenceControl,
        setConvertData,
        createMeeting,
        saveConvertedLeads,
        assignCallResult: assign({ callResult: (context, event) => event.callResult }),
      },
      guards: {
        isCorrectContactAndHasSalesLead,
        isCorrectContactAndNotHasSalesLead,
        isNoAnswerStatus,
        isCorrectContact,
        canConvertBoject,
        canCreateOpportunity,
        canStatusHaveNextStep,
        leadHasDefinitiveStatus,
        canCreateMeeting,
        canOpenCadenceControl,
        isDefinitiveStatus,
        isLeadWithOpportunity,
        hasNoReferenceBobject,
        isLeadDiscarded,
        isDiscardedStatus,
      },
    });
    return customMachine;
  } else {
    console.log('WARNING: Custom wizards map is null, using original steps machine');
    return stepsMachine;
  }
};

export const getButtonStepConfig = metaInfo => {
  const metaInfoStep = Object.keys(metaInfo).reduce((acc, key) => {
    const value = metaInfo[key];

    // Assuming each meta value is an object
    Object.assign(acc, value);

    return acc;
  }, {});
  return {
    nextButtonTitle: metaInfoStep?.nextButtonTitle,
    nextButtonAlternativeTitle: metaInfoStep?.nextButtonAlternativeTitle,
    previousButtonTitle: metaInfoStep?.previousButtonTitle,
    showSkipButton: metaInfoStep?.showSkipButton,
    openCadenceOnSkip: metaInfoStep?.openCadenceOnSkip,
    hasPreviousStep: false,
  };
};
