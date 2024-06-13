import {
  CALL_RESULTS_LOGIC_ROLE,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE,
  COMPANY_STATUS,
  DIRECTION_VALUES_LOGIC_ROLE,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE,
  LEAD_STATUS,
} from '@bloobirds-it/types';
import { assign } from 'xstate';

export const callbacks = {
  isCorrectContact: function (context, event) {
    return (
      context?.callResult === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT ||
      event?.callResult === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT
    );
  },
  isCorrectContactAndHasSalesLead: function (context, event) {
    return callbacks.isCorrectContact(context, event) && event.isLeadInSalesStage;
  },
  hasNoReferenceBobject: function (context) {
    return !context.referenceBobject;
  },
  isNoAnswerStatus: function (context, event) {
    const callResult = event?.callResult || context?.callResult;
    return [CALL_RESULTS_LOGIC_ROLE.NO_ANSWER, CALL_RESULTS_LOGIC_ROLE.WRONG_DATA].includes(
      callResult,
    );
  },
  canStatusHaveNextStep: function (context, event) {
    return (
      event.companyStatus === COMPANY_STATUS.NURTURING || event.leadStatus === LEAD_STATUS.NURTURING
    );
  },
  isLeadDiscarded: function (context, event) {
    return event.leadStatus === LEAD_STATUS.DISCARDED;
  },
  isDiscardedStatus: function (context, event) {
    return (
      event.leadStatus === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED ||
      event.companyStatus === COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED
    );
  },
  canCreateMeeting: function (context, event) {
    return (
      event.companyStatus === COMPANY_STATUS.MEETING || event.leadStatus === LEAD_STATUS.MEETING
    );
  },
  canOpenCadenceControl: function (context, event) {
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
  },
  canOpenCadenceControlOnSkip: function (context, event) {
    return event.openCadenceControlOnClose;
  },
  closeModals: function (context) {
    context.handleClose();
  },

  createMeeting: function (context) {
    context.handleClose();
    if (
      context?.handleOpenMinimizableModal &&
      typeof context.handleOpenMinimizableModal === 'function'
    ) {
      context.handleOpenMinimizableModal(context.isCalendarEnabled ? 'calendarMeeting' : 'meeting');
    }
  },

  openCadenceControl: function (context, event) {
    if (event?.selectedOpportunityObject) {
      context.selectedOpportunityObject = event.selectedOpportunityObject;
    }
    context.openCadenceControl();
  },

  isCorrectContactAndNotHasSalesLead: function (context, event) {
    return callbacks.isCorrectContact(context, event) && !event.isLeadInSalesStage;
  },

  canCreateOpportunity: function (context, event) {
    return (
      (event.companyStatus === COMPANY_STATUS.ACCOUNT ||
        event.leadStatus === LEAD_STATUS.CONTACT) &&
      callbacks.canUseSalesFeatures(context)
    );
  },

  canConvertBoject: function (context, event) {
    context.bobject = event.bobject;
    return (
      (event.companyStatus === COMPANY_STATUS.ACCOUNT ||
        event.leadStatus === LEAD_STATUS.CONTACT) &&
      callbacks.canUseSalesFeatures(context)
    );
  },
  leadHasDefinitiveStatus: function (context, event) {
    return [LEAD_STATUS.DISCARDED, LEAD_STATUS.ON_HOLD].includes(event.leadStatus);
  },
  isDefinitiveStatus: function (context, event) {
    return (
      event.leadStatus === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED ||
      event.leadStatus === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD ||
      event.companyStatus === COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED ||
      event.companyStatus === COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD
    );
  },
  isLeadWithOpportunity: function (context, event) {
    return !!event?.leadOpportunityId || context?.leadOpportunityId;
  },

  setSelectOpportunity: function (context) {
    context.updateSelectedOpportunity(context.opportunity);
  },

  setConvertData: function (context) {
    context.setConvertData({ bobjectToSet: context.bobject });
  },

  saveConvertedLeads: assign({
    //@ts-ignore
    convertedLeads: (_, event) => event.leads,
  }),

  canUseSalesFeatures: function (context) {
    return context.hasSalesFeatureEnabled;
  },

  saveCallResult: assign({
    //@ts-ignore
    callResult: (context, event) => event.callResult,
    //@ts-ignore
    callResultStepData: (context, event) => event.callResultStepData,
  }),

  hasSelectedOpportunity: function (context, event) {
    return !!context.selectedOpportunity;
  },

  hasSelectedOpportunityObject: function (context, event) {
    return !!context.selectedOpportunityObject;
  },

  saveRecallCreated: assign({
    //@ts-ignore
    recallCreated: (context, event) => event.recallCreated,
  }),

  hasRecallCreated: function (context, event) {
    return !!context.recallCreated || !!event.recallCreated;
  },

  saveSelectedOpportunity: assign({
    //@ts-ignore
    selectedOpportunity: (context, event) => event.selectedOpportunity,
  }),

  saveSelectedOpportunityObject: assign({
    selectedOpportunityArray: (context, event) => {
      //@ts-ignore
      return event.selectedOpportunityArray || context.selectedOpportunityArray;
    },
    //@ts-ignore
    selectedOpportunityObject: (context, event) => event.selectedOpportunityObject,
  }),

  isIncomingActivity: function (context, event) {
    return event.activityDirection !== DIRECTION_VALUES_LOGIC_ROLE.OUTGOING;
  },

  markActivityAsReported: function (context) {
    context?.markAsReported?.();
  },

  canUseNoStatusPlan: function (context) {
    return context.hasNoStatusPlanEnabled;
  },

  isCopilotEnabled: function (context) {
    return context.hasCopilotEnabled;
  },

  canShowCRMUpdates: function (context) {
    return context.isCopilotEnabled && context.hasCRMUpdates;
  },

  manageTasks: function (action, context, event) {
    return context.manageTasks;
  },

  updateHasCRMUpdates: assign({
    //@ts-ignore
    hasCRMUpdates: (context, event) => event.hasCRMUpdates,
  }),

  isReferencedObjectInSales: function (context, event) {
    return context.isReferencedObjectInSales;
  },

  refreshCurrentPage: function () {
    window.location.reload();
  },

  updateReferenceBobject: assign({
    //@ts-ignore
    referenceBobject: (context, event) => event.referenceBobjectSelected,
  }),
  hasNoStatusEnabled: function (context, event) {
    return context.hasNoStatusPlanEnabled;
  },
};

export const useWizardCallbacks = () => {
  function getCallback(callbackName: string) {
    if (
      typeof callbackName === 'string' &&
      callbacks[callbackName] &&
      (typeof callbacks[callbackName] === 'function' || typeof callbacks[callbackName] === 'object')
    ) {
      return callbacks[callbackName];
    } else {
      console.log('No callback exists with name', callbackName);
    }
  }

  return { getCallback };
};
