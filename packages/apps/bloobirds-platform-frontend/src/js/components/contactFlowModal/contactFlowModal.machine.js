import { assign, createMachine, Machine} from 'xstate';

import { CALL_RESULTS_LOGIC_ROLE } from '../../constants/callResult';
import { COMPANY_STATUS, COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE } from '../../constants/company';
import { LEAD_STATUS, LEAD_SALES_STATUS_VALUES_LOGIC_ROLE } from '../../constants/lead';

export const STEPS = Object.seal({
  INITIAL: 'INITIAL',
  CALL_RESULTS_OPP: 'CALL_RESULTS_OPP',
  CALL_RESULTS: 'CALL_RESULTS',
  CHANGE_STATUS: 'CHANGE_STATUS',
  CONVERT_OBJECT: 'CONVERT_OBJECT',
  NOTES_AND_QQ: 'NOTES_AND_QQ',
  OPPORTUNITY_CONTROL: 'OPPORTUNITY_CONTROL',
  SALES_CHANGE_STATUS: 'SALES_CHANGE_STATUS',
  SCHEDULE_NEXT_STEPS: 'SCHEDULE_NEXT_STEPS',
});

const canUseSalesFeatures = context => context.hasSalesFeatureEnabled;
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
const canStatusHaveNextStep = (context, event) =>
  event.companyStatus === COMPANY_STATUS.NURTURING || event.leadStatus === LEAD_STATUS.NURTURING;
const leadHasDefinitiveStatus = (context, event) =>
  [LEAD_STATUS.DISCARDED, LEAD_STATUS.ON_HOLD].includes(event.leadStatus);
const isDefinitiveStatus = (context, event) =>
  event.leadStatus === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED ||
  event.leadStatus === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD ||
  event.companyStatus === COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED ||
  event.companyStatus === COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD;
const isLeadWithOpportunity = (context, event) =>
  !!event?.leadOpportunityId || context?.leadOpportunityId;
const canCreateMeeting = (context, event) =>
  event.companyStatus === COMPANY_STATUS.MEETING || event.leadStatus === LEAD_STATUS.MEETING;
const canOpenCadenceControl = (context, event) => {
  context.bobject = event.bobject;
  return (
    event.companyStatus === COMPANY_STATUS.CONTACTED ||
    event.companyStatus === COMPANY_STATUS.ENGAGED ||
    event.companyStatus === COMPANY_STATUS.ON_PROSPECTION
  );
};

const closeModals = context => context.handleClose();
const createMeeting = context => {
  context.handleClose();
  //Check if handle open minimizable modal is defined and it is a function
  if (
    context?.handleOpenMinimizableModal &&
    typeof context.handleOpenMinimizableModal === 'function'
  ) {
    context.handleOpenMinimizableModal(context.isCalendarEnabled ? 'calendarMeeting' : 'meeting');
  }
};

const openCadenceControl = context => {
  context.handleClose();
  context.openCadenceControl({ bobjectToSet: context.bobject });
};

const setSelectOpportunity = context => {
  context.updateSelectedOpportunity(context.opportunity);
};

const setConvertData = context => {
  context.setConvertData({ bobjectToSet: context.bobject });
};

const saveConvertedLeads = assign({
  convertedLeads: (_, event) => event.leads,
});

export const EVENTS = Object.seal({
  NEXT: 'NEXT',
  PREVIOUS: 'PREVIOUS',
});

export const stepsMachine = Machine({
  id: 'contact_flow_steps',
  context: {
    callResult: null,
    convertedLeads: null,
    handleClose: null,
    handleOpenMinimizableModal: null,
    hasSalesFeatureEnabled: false,
    isAccount: null,
    leadOpportunityId: null,
    openAddActivity: null,
    openAddOpportunity: null,
    openCadenceControl: null,
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
            target: STEPS.OPPORTUNITY_CONTROL,
            cond: isCorrectContactAndNotHasSalesLead,
          },
          {
            actions: [setSelectOpportunity, openCadenceControl],
          },
        ],
      },
    },
    [STEPS.CALL_RESULTS]: {
      on: {
        [EVENTS.SALES_STAGE]: STEPS.CALL_RESULTS_OPP,
        [EVENTS.NEXT]: [
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
            target: STEPS.CONVERT_OBJECT,
            cond: canConvertBoject,
            actions: [setConvertData],
          },
          {
            target: STEPS.OPPORTUNITY_CONTROL,
            cond: canCreateOpportunity,
          },
          {
            target: STEPS.SCHEDULE_NEXT_STEPS,
            cond: canStatusHaveNextStep,
          },
          {
            actions: [closeModals],
            cond: leadHasDefinitiveStatus,
          },
          {
            actions: [createMeeting],
            cond: canCreateMeeting,
          },
          {
            actions: [openCadenceControl],
            cond: canOpenCadenceControl,
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
      },
    },
    [STEPS.SALES_CHANGE_STATUS]: {
      on: {
        [EVENTS.NEXT]: [
          {
            actions: [closeModals],
            cond: isDefinitiveStatus,
          },
          {
            target: STEPS.OPPORTUNITY_CONTROL,
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
            target: STEPS.NOTES_AND_QQ,
          },
        ],
      },
    },
    [STEPS.CONVERT_OBJECT]: {
      on: {
        [EVENTS.PREVIOUS]: [
          {
            target: STEPS.CHANGE_STATUS,
          },
        ],
        [EVENTS.NEXT]: [
          {
            target: STEPS.OPPORTUNITY_CONTROL,
            actions: saveConvertedLeads,
          },
        ],
      },
    },
    [STEPS.OPPORTUNITY_CONTROL]: {
      on: {
        [EVENTS.PREVIOUS]: [
          {
            target: STEPS.CALL_RESULTS_OPP,
            cond: isLeadWithOpportunity,
          },
          {
            target: STEPS.CHANGE_STATUS,
          },
        ],
      },
    },
  },
});

export const getCustomMachine = customWizardsMap => {
  if (
    customWizardsMap != null &&
    customWizardsMap.CONTACT_FLOW_APP != null &&
    customWizardsMap.CONTACT_FLOW_APP !== ''
  ) {
    const customMachine = createMachine(JSON.parse(customWizardsMap.CONTACT_FLOW_APP), {
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
