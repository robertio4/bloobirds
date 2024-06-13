import { callbacks } from './wizardCallbacks';
import { EVENTS, STEPS } from './wizardMachine';

const {
  closeModals,
  setSelectOpportunity,
  openCadenceControl,
  setConvertData,
  createMeeting,
  saveConvertedLeads,
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
  canOpenCadenceControlOnSkip,
  isDefinitiveStatus,
  isLeadWithOpportunity,
  hasNoReferenceBobject,
  isLeadDiscarded,
  isDiscardedStatus,
  saveCallResult,
  isIncomingActivity,
} = callbacks;

export const stepsMachineContactFlowOTO = {
  id: 'contact_flow_steps',
  context: {
    callResult: null,
    callResultStepData: null,
    convertedLeads: null,
    handleClose: null,
    handleOpenMinimizableModal: null,
    handleOpenCreateTask: null,
    referenceBobject: null,
    hasSalesFeatureEnabled: false,
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
        [STEPS.CALL_RESULTS]: [
          {
            target: STEPS.NOTES_AND_QQ,
            cond: isIncomingActivity,
            actions: [saveCallResult],
          },
          {
            target: STEPS.CALL_RESULTS,
          },
        ],
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
        [EVENTS.SKIP]: [
          {
            actions: [openCadenceControl],
            cond: canOpenCadenceControlOnSkip,
          },
          {
            actions: [closeModals],
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
            actions: [saveCallResult],
          },
          {
            target: STEPS.NOTES_AND_QQ,
            actions: [saveCallResult],
          },
        ],
        [EVENTS.SKIP]: [
          {
            actions: [openCadenceControl],
            cond: canOpenCadenceControlOnSkip,
          },
          {
            actions: [closeModals],
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
        [EVENTS.SKIP]: [
          {
            actions: [openCadenceControl],
            cond: canOpenCadenceControlOnSkip,
          },
          {
            actions: [closeModals],
          },
        ],
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
        [EVENTS.SKIP]: [
          {
            actions: [openCadenceControl],
            cond: canOpenCadenceControlOnSkip,
          },
          {
            actions: [closeModals],
          },
        ],
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
        [EVENTS.SKIP]: [
          {
            actions: [openCadenceControl],
            cond: canOpenCadenceControlOnSkip,
          },
          {
            actions: [closeModals],
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
            actions: [openCadenceControl],
            cond: canOpenCadenceControlOnSkip,
          },
          {
            actions: [closeModals],
          },
        ],
      },
    },
  },
};

export const stepsMachineContactFlowAPP = {
  id: 'contact_flow_steps',
  context: {
    callResult: null,
    callResultStepData: null,
    convertedLeads: null,
    handleClose: null,
    handleOpenMinimizableModal: null,
    referenceBobject: null,
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
            actions: [openCadenceControl],
          },
        ],
        [EVENTS.SKIP]: [
          {
            actions: [openCadenceControl],
            cond: canOpenCadenceControlOnSkip,
          },
          {
            actions: [closeModals],
          },
        ],
      },
    },
    [STEPS.CALL_RESULTS]: {
      on: {
        [EVENTS.NEXT]: [
          {
            target: STEPS.CHANGE_STATUS,
            cond: isNoAnswerStatus,
            actions: [saveCallResult],
          },
          {
            target: STEPS.NOTES_AND_QQ,
            actions: [saveCallResult],
          },
        ],
        [EVENTS.SKIP]: [
          {
            actions: [openCadenceControl],
            cond: canOpenCadenceControlOnSkip,
          },
          {
            actions: [closeModals],
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
        [EVENTS.SKIP]: [
          {
            actions: [openCadenceControl],
            cond: canOpenCadenceControlOnSkip,
          },
          {
            actions: [closeModals],
          },
        ],
      },
    },
    [STEPS.CHANGE_STATUS]: {
      on: {
        [EVENTS.NEXT]: [
          {
            target: STEPS.CONVERT_OBJECT,
            cond: canConvertBoject,
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
        [EVENTS.SKIP]: [
          {
            actions: [openCadenceControl],
            cond: canOpenCadenceControlOnSkip,
          },
          {
            actions: [closeModals],
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
        [EVENTS.SKIP]: [
          {
            actions: [openCadenceControl],
            cond: canOpenCadenceControlOnSkip,
          },
          {
            actions: [closeModals],
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
        [EVENTS.SKIP]: [
          {
            actions: [openCadenceControl],
            cond: canOpenCadenceControlOnSkip,
          },
          {
            actions: [closeModals],
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
        [EVENTS.SKIP]: [
          {
            actions: [openCadenceControl],
            cond: canOpenCadenceControlOnSkip,
          },
          {
            actions: [closeModals],
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
        [EVENTS.SKIP]: [
          {
            actions: [openCadenceControl],
            cond: canOpenCadenceControlOnSkip,
          },
          {
            actions: [closeModals],
          },
        ],
      },
    },
  },
};
