import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useMemo = __vite__cjsImport0_react["useMemo"]; const createContext = __vite__cjsImport0_react["createContext"]; const useContext = __vite__cjsImport0_react["useContext"];
import { useCustomWizardsEnabled, useCustomWizards, useLazyRef } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js';
import { CALL_RESULTS_LOGIC_ROLE, COMPANY_STATUS, LEAD_STATUS, LEAD_SALES_STATUS_VALUES_LOGIC_ROLE, COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE, DIRECTION_VALUES_LOGIC_ROLE, MessagesEvents } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js';
import __vite__cjsImport3_useSyncExternalStore_shim from "/vendor/.vite-deps-use-sync-external-store_shim.js__v--03bee27d.js"; const useSyncExternalStore = __vite__cjsImport3_useSyncExternalStore_shim["useSyncExternalStore"];
import { assign, createMachine } from '/vendor/.vite-deps-xstate.js__v--ca84df4a.js';
import { jsx } from '/vendor/id-__x00__react-jsx-runtime.js';

function _typeof$5(obj) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$5(obj); }
var callbacks = {
  isCorrectContact: function isCorrectContact(context, event) {
    return (context === null || context === void 0 ? void 0 : context.callResult) === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT || (event === null || event === void 0 ? void 0 : event.callResult) === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT;
  },
  isCorrectContactAndHasSalesLead: function isCorrectContactAndHasSalesLead(context, event) {
    return callbacks.isCorrectContact(context, event) && event.isLeadInSalesStage;
  },
  hasNoReferenceBobject: function hasNoReferenceBobject(context) {
    return !context.referenceBobject;
  },
  isNoAnswerStatus: function isNoAnswerStatus(context, event) {
    var callResult = (event === null || event === void 0 ? void 0 : event.callResult) || (context === null || context === void 0 ? void 0 : context.callResult);
    return [CALL_RESULTS_LOGIC_ROLE.NO_ANSWER, CALL_RESULTS_LOGIC_ROLE.WRONG_DATA].includes(callResult);
  },
  canStatusHaveNextStep: function canStatusHaveNextStep(context, event) {
    return event.companyStatus === COMPANY_STATUS.NURTURING || event.leadStatus === LEAD_STATUS.NURTURING;
  },
  isLeadDiscarded: function isLeadDiscarded(context, event) {
    return event.leadStatus === LEAD_STATUS.DISCARDED;
  },
  isDiscardedStatus: function isDiscardedStatus(context, event) {
    return event.leadStatus === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED || event.companyStatus === COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED;
  },
  canCreateMeeting: function canCreateMeeting(context, event) {
    return event.companyStatus === COMPANY_STATUS.MEETING || event.leadStatus === LEAD_STATUS.MEETING;
  },
  canOpenCadenceControl: function canOpenCadenceControl(context, event) {
    context.bobject = event.bobject;
    return event.companyStatus === COMPANY_STATUS.CONTACTED || event.companyStatus === COMPANY_STATUS.ENGAGED || event.companyStatus === COMPANY_STATUS.ON_PROSPECTION ||
    //nonsense, I know but all this should be refactored
    event.leadStatus === COMPANY_STATUS.ON_PROSPECTION || event.leadStatus === COMPANY_STATUS.ENGAGED || event.leadStatus === COMPANY_STATUS.ON_PROSPECTION;
  },
  canOpenCadenceControlOnSkip: function canOpenCadenceControlOnSkip(context, event) {
    return event.openCadenceControlOnClose;
  },
  closeModals: function closeModals(context) {
    context.handleClose();
  },
  createMeeting: function createMeeting(context) {
    context.handleClose();
    if (context !== null && context !== void 0 && context.handleOpenMinimizableModal && typeof context.handleOpenMinimizableModal === 'function') {
      context.handleOpenMinimizableModal(context.isCalendarEnabled ? 'calendarMeeting' : 'meeting');
    }
  },
  openCadenceControl: function openCadenceControl(context, event) {
    if (event !== null && event !== void 0 && event.selectedOpportunityObject) {
      context.selectedOpportunityObject = event.selectedOpportunityObject;
    }
    context.openCadenceControl();
  },
  isCorrectContactAndNotHasSalesLead: function isCorrectContactAndNotHasSalesLead(context, event) {
    return callbacks.isCorrectContact(context, event) && !event.isLeadInSalesStage;
  },
  canCreateOpportunity: function canCreateOpportunity(context, event) {
    return (event.companyStatus === COMPANY_STATUS.ACCOUNT || event.leadStatus === LEAD_STATUS.CONTACT) && callbacks.canUseSalesFeatures(context);
  },
  canConvertBoject: function canConvertBoject(context, event) {
    context.bobject = event.bobject;
    return (event.companyStatus === COMPANY_STATUS.ACCOUNT || event.leadStatus === LEAD_STATUS.CONTACT) && callbacks.canUseSalesFeatures(context);
  },
  leadHasDefinitiveStatus: function leadHasDefinitiveStatus(context, event) {
    return [LEAD_STATUS.DISCARDED, LEAD_STATUS.ON_HOLD].includes(event.leadStatus);
  },
  isDefinitiveStatus: function isDefinitiveStatus(context, event) {
    return event.leadStatus === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED || event.leadStatus === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD || event.companyStatus === COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED || event.companyStatus === COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD;
  },
  isLeadWithOpportunity: function isLeadWithOpportunity(context, event) {
    return !!(event !== null && event !== void 0 && event.leadOpportunityId) || (context === null || context === void 0 ? void 0 : context.leadOpportunityId);
  },
  setSelectOpportunity: function setSelectOpportunity(context) {
    context.updateSelectedOpportunity(context.opportunity);
  },
  setConvertData: function setConvertData(context) {
    context.setConvertData({
      bobjectToSet: context.bobject
    });
  },
  saveConvertedLeads: assign({
    //@ts-ignore
    convertedLeads: function convertedLeads(_, event) {
      return event.leads;
    }
  }),
  canUseSalesFeatures: function canUseSalesFeatures(context) {
    return context.hasSalesFeatureEnabled;
  },
  saveCallResult: assign({
    //@ts-ignore
    callResult: function callResult(context, event) {
      return event.callResult;
    },
    //@ts-ignore
    callResultStepData: function callResultStepData(context, event) {
      return event.callResultStepData;
    }
  }),
  hasSelectedOpportunity: function hasSelectedOpportunity(context, event) {
    return !!context.selectedOpportunity;
  },
  hasSelectedOpportunityObject: function hasSelectedOpportunityObject(context, event) {
    return !!context.selectedOpportunityObject;
  },
  saveRecallCreated: assign({
    //@ts-ignore
    recallCreated: function recallCreated(context, event) {
      return event.recallCreated;
    }
  }),
  hasRecallCreated: function hasRecallCreated(context, event) {
    return !!context.recallCreated || !!event.recallCreated;
  },
  saveSelectedOpportunity: assign({
    //@ts-ignore
    selectedOpportunity: function selectedOpportunity(context, event) {
      return event.selectedOpportunity;
    }
  }),
  saveSelectedOpportunityObject: assign({
    selectedOpportunityArray: function selectedOpportunityArray(context, event) {
      //@ts-ignore
      return event.selectedOpportunityArray || context.selectedOpportunityArray;
    },
    //@ts-ignore
    selectedOpportunityObject: function selectedOpportunityObject(context, event) {
      return event.selectedOpportunityObject;
    }
  }),
  isIncomingActivity: function isIncomingActivity(context, event) {
    return event.activityDirection !== DIRECTION_VALUES_LOGIC_ROLE.OUTGOING;
  },
  markActivityAsReported: function markActivityAsReported(context) {
    var _context$markAsReport;
    context === null || context === void 0 ? void 0 : (_context$markAsReport = context.markAsReported) === null || _context$markAsReport === void 0 ? void 0 : _context$markAsReport.call(context);
  },
  canUseNoStatusPlan: function canUseNoStatusPlan(context) {
    return context.hasNoStatusPlanEnabled;
  },
  isCopilotEnabled: function isCopilotEnabled(context) {
    return context.hasCopilotEnabled;
  },
  canShowCRMUpdates: function canShowCRMUpdates(context) {
    return context.isCopilotEnabled && context.hasCRMUpdates;
  },
  manageTasks: function manageTasks(action, context, event) {
    return context.manageTasks;
  },
  updateHasCRMUpdates: assign({
    //@ts-ignore
    hasCRMUpdates: function hasCRMUpdates(context, event) {
      return event.hasCRMUpdates;
    }
  }),
  isReferencedObjectInSales: function isReferencedObjectInSales(context, event) {
    return context.isReferencedObjectInSales;
  },
  refreshCurrentPage: function refreshCurrentPage() {
    window.location.reload();
  },
  updateReferenceBobject: assign({
    //@ts-ignore
    referenceBobject: function referenceBobject(context, event) {
      return event.referenceBobjectSelected;
    }
  }),
  hasNoStatusEnabled: function hasNoStatusEnabled(context, event) {
    return context.hasNoStatusPlanEnabled;
  }
};
var useWizardCallbacks = function useWizardCallbacks() {
  function getCallback(callbackName) {
    if (typeof callbackName === 'string' && callbacks[callbackName] && (typeof callbacks[callbackName] === 'function' || _typeof$5(callbacks[callbackName]) === 'object')) {
      return callbacks[callbackName];
    } else {
      console.log('No callback exists with name', callbackName);
    }
  }
  return {
    getCallback: getCallback
  };
};

var STEPS;
(function (STEPS) {
  STEPS["INACTIVE_HANDLING"] = "INACTIVE_HANDLING";
  STEPS["INITIAL"] = "INITIAL";
  STEPS["MEETING_RESULT"] = "MEETING_RESULT";
  STEPS["NOTES"] = "NOTES";
  STEPS["CALL_RESULTS_OPP"] = "CALL_RESULTS_OPP";
  STEPS["CALL_RESULTS"] = "CALL_RESULTS";
  STEPS["CHANGE_STATUS"] = "CHANGE_STATUS";
  STEPS["CONVERT_OBJECT"] = "CONVERT_OBJECT";
  STEPS["NOTES_AND_QQ"] = "NOTES_AND_QQ";
  STEPS["SALES_CHANGE_STATUS"] = "SALES_CHANGE_STATUS";
  STEPS["SCHEDULE_NEXT_STEPS"] = "SCHEDULE_NEXT_STEPS";
  STEPS["OPPORTUNITY_CONTROL"] = "OPPORTUNITY_CONTROL";
  STEPS["CUSTOM_OBJECT"] = "CUSTOM_OBJECT";
  STEPS["ONLY_QQS"] = "ONLY_QQS";
  STEPS["CHANGE_STATUS_SALESFORCE"] = "CHANGE_STATUS_SALESFORCE";
  STEPS["OPPORTUNITY_CONTROL_OTO"] = "OPPORTUNITY_CONTROL_OTO";
  STEPS["BOBJECT_FORM"] = "BOBJECT_FORM";
  STEPS["ORIGINAL_CHANGE_STATUS_COMPONENT"] = "ORIGINAL_CHANGE_STATUS_COMPONENT";
  STEPS["CADENCE_CONTROL"] = "CADENCE_CONTROL";
  STEPS["CUSTOM_ACTIONS_SALESFORCE"] = "CUSTOM_ACTIONS_SALESFORCE";
  STEPS["CRM_UPDATES"] = "CRM_UPDATES";
  STEPS["ADD_LEAD_TO_ACTIVITY"] = "ADD_LEAD_TO_ACTIVITY";
  STEPS["STATUS_NOTE_ACTIONS"] = "STATUS_NOTE_ACTIONS";
  STEPS["TASK_MANAGEMENT"] = "TASK_MANAGEMENT";
})(STEPS || (STEPS = {}));
var EVENTS;
(function (EVENTS) {
  EVENTS["NEXT"] = "NEXT";
  EVENTS["PREVIOUS"] = "PREVIOUS";
  EVENTS["SKIP"] = "SKIP";
  EVENTS["FINISH"] = "FINISH";
  EVENTS["DETAIL"] = "DETAIL";
})(EVENTS || (EVENTS = {}));

function _typeof$4(obj) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$4(obj); }
function _defineProperty$4(obj, key, value) { key = _toPropertyKey$4(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$4(arg) { var key = _toPrimitive$4(arg, "string"); return _typeof$4(key) === "symbol" ? key : String(key); }
function _toPrimitive$4(input, hint) { if (_typeof$4(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$4(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var stepsMachineChangeStatus = {
  id: 'change_status_steps',
  context: {},
  initial: STEPS.INITIAL,
  states: _defineProperty$4(_defineProperty$4(_defineProperty$4({}, STEPS.INITIAL, {
    on: _defineProperty$4(_defineProperty$4({}, STEPS.ORIGINAL_CHANGE_STATUS_COMPONENT, STEPS.ORIGINAL_CHANGE_STATUS_COMPONENT), STEPS.CHANGE_STATUS_SALESFORCE, STEPS.CHANGE_STATUS_SALESFORCE)
  }), STEPS.ORIGINAL_CHANGE_STATUS_COMPONENT, {
    on: _defineProperty$4(_defineProperty$4({}, EVENTS.NEXT, [{
      actions: ['handleClose']
    }]), EVENTS.SKIP, [{
      actions: ['handleSkip']
    }])
  }), STEPS.CHANGE_STATUS_SALESFORCE, {
    on: _defineProperty$4(_defineProperty$4({}, EVENTS.NEXT, [{
      actions: ['handleClose']
    }]), EVENTS.SKIP, [{
      actions: ['handleSkip']
    }])
  })
};

function _typeof$3(obj) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$3(obj); }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(arg) { var key = _toPrimitive$3(arg, "string"); return _typeof$3(key) === "symbol" ? key : String(key); }
function _toPrimitive$3(input, hint) { if (_typeof$3(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$3(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var closeModals = callbacks.closeModals,
  openCadenceControl = callbacks.openCadenceControl,
  createMeeting = callbacks.createMeeting,
  saveConvertedLeads = callbacks.saveConvertedLeads,
  isCorrectContactAndHasSalesLead = callbacks.isCorrectContactAndHasSalesLead,
  isCorrectContactAndNotHasSalesLead = callbacks.isCorrectContactAndNotHasSalesLead,
  isNoAnswerStatus = callbacks.isNoAnswerStatus,
  isCorrectContact = callbacks.isCorrectContact,
  canConvertBoject = callbacks.canConvertBoject,
  canCreateOpportunity = callbacks.canCreateOpportunity,
  canStatusHaveNextStep = callbacks.canStatusHaveNextStep,
  leadHasDefinitiveStatus = callbacks.leadHasDefinitiveStatus,
  canCreateMeeting = callbacks.canCreateMeeting,
  canOpenCadenceControl = callbacks.canOpenCadenceControl,
  canOpenCadenceControlOnSkip = callbacks.canOpenCadenceControlOnSkip,
  isDefinitiveStatus = callbacks.isDefinitiveStatus,
  isLeadWithOpportunity = callbacks.isLeadWithOpportunity,
  hasNoReferenceBobject = callbacks.hasNoReferenceBobject,
  isLeadDiscarded = callbacks.isLeadDiscarded,
  isDiscardedStatus = callbacks.isDiscardedStatus,
  saveCallResult = callbacks.saveCallResult,
  isIncomingActivity = callbacks.isIncomingActivity;
var stepsMachineContactFlowOTO = {
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
    isCalendarEnabled: null
  },
  initial: STEPS.INITIAL,
  states: _defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3({}, STEPS.INITIAL, {
    on: _defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3({}, STEPS.CHANGE_STATUS, STEPS.CHANGE_STATUS), STEPS.SALES_CHANGE_STATUS, STEPS.SALES_CHANGE_STATUS), STEPS.CALL_RESULTS, [{
      target: STEPS.NOTES_AND_QQ,
      cond: isIncomingActivity,
      actions: [saveCallResult]
    }, {
      target: STEPS.CALL_RESULTS
    }]), STEPS.CALL_RESULTS_OPP, STEPS.CALL_RESULTS_OPP)
  }), STEPS.CALL_RESULTS_OPP, {
    on: _defineProperty$3(_defineProperty$3({}, EVENTS.NEXT, [{
      target: STEPS.SALES_CHANGE_STATUS,
      cond: isCorrectContactAndHasSalesLead
    }, {
      actions: [openCadenceControl]
    }]), EVENTS.SKIP, [{
      actions: [openCadenceControl],
      cond: canOpenCadenceControlOnSkip
    }, {
      actions: [closeModals]
    }])
  }), STEPS.CALL_RESULTS, {
    on: _defineProperty$3(_defineProperty$3({}, EVENTS.NEXT, [{
      actions: [closeModals],
      cond: hasNoReferenceBobject
    }, {
      target: STEPS.CHANGE_STATUS,
      cond: isNoAnswerStatus,
      actions: [saveCallResult]
    }, {
      target: STEPS.NOTES_AND_QQ,
      actions: [saveCallResult]
    }]), EVENTS.SKIP, [{
      actions: [openCadenceControl],
      cond: canOpenCadenceControlOnSkip
    }, {
      actions: [closeModals]
    }])
  }), STEPS.NOTES_AND_QQ, {
    on: _defineProperty$3(_defineProperty$3(_defineProperty$3({}, EVENTS.NEXT, [{
      target: STEPS.CHANGE_STATUS,
      cond: isCorrectContact
    }, {
      target: STEPS.SCHEDULE_NEXT_STEPS
    }]), EVENTS.PREVIOUS, STEPS.CALL_RESULTS), EVENTS.SKIP, [{
      actions: [openCadenceControl],
      cond: canOpenCadenceControlOnSkip
    }, {
      actions: [closeModals]
    }])
  }), STEPS.CHANGE_STATUS, {
    on: _defineProperty$3(_defineProperty$3(_defineProperty$3({}, EVENTS.NEXT, [{
      target: STEPS.SCHEDULE_NEXT_STEPS,
      cond: canStatusHaveNextStep
    }, {
      actions: [closeModals],
      cond: isLeadDiscarded
    }, {
      actions: [createMeeting],
      cond: canCreateMeeting
    }, {
      actions: [openCadenceControl],
      cond: canOpenCadenceControl
    }, {
      actions: [closeModals]
    }]), EVENTS.PREVIOUS, [{
      target: STEPS.CALL_RESULTS,
      cond: isNoAnswerStatus
    }, {
      target: STEPS.NOTES_AND_QQ
    }]), EVENTS.SKIP, [{
      actions: [openCadenceControl],
      cond: canOpenCadenceControlOnSkip
    }, {
      actions: [closeModals]
    }])
  }), STEPS.SALES_CHANGE_STATUS, {
    on: _defineProperty$3(_defineProperty$3(_defineProperty$3({}, EVENTS.NEXT, [{
      actions: [closeModals],
      cond: isDiscardedStatus
    }, {
      actions: [openCadenceControl]
    }]), EVENTS.PREVIOUS, [{
      target: STEPS.CALL_RESULTS_OPP
    }]), EVENTS.SKIP, [{
      actions: [openCadenceControl],
      cond: canOpenCadenceControlOnSkip
    }, {
      actions: [closeModals]
    }])
  }), STEPS.SCHEDULE_NEXT_STEPS, {
    on: _defineProperty$3(_defineProperty$3(_defineProperty$3({}, EVENTS.PREVIOUS, [{
      target: STEPS.CHANGE_STATUS,
      cond: isCorrectContact
    }, {
      target: STEPS.CHANGE_STATUS,
      cond: isNoAnswerStatus
    }, {
      target: STEPS.NOTES_AND_QQ
    }]), EVENTS.NEXT, [{
      actions: [closeModals]
    }]), EVENTS.SKIP, [{
      actions: [openCadenceControl],
      cond: canOpenCadenceControlOnSkip
    }, {
      actions: [closeModals]
    }])
  })
};
var stepsMachineContactFlowAPP = {
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
    isCalendarEnabled: null
  },
  initial: STEPS.INITIAL,
  states: _defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3({}, STEPS.INITIAL, {
    on: _defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3({}, STEPS.CHANGE_STATUS, STEPS.CHANGE_STATUS), STEPS.SALES_CHANGE_STATUS, STEPS.SALES_CHANGE_STATUS), STEPS.CALL_RESULTS, STEPS.CALL_RESULTS), STEPS.CALL_RESULTS_OPP, STEPS.CALL_RESULTS_OPP)
  }), STEPS.CALL_RESULTS_OPP, {
    on: _defineProperty$3(_defineProperty$3({}, EVENTS.NEXT, [{
      target: STEPS.SALES_CHANGE_STATUS,
      cond: isCorrectContactAndHasSalesLead
    }, {
      target: STEPS.OPPORTUNITY_CONTROL,
      cond: isCorrectContactAndNotHasSalesLead
    }, {
      actions: [openCadenceControl]
    }]), EVENTS.SKIP, [{
      actions: [openCadenceControl],
      cond: canOpenCadenceControlOnSkip
    }, {
      actions: [closeModals]
    }])
  }), STEPS.CALL_RESULTS, {
    on: _defineProperty$3(_defineProperty$3({}, EVENTS.NEXT, [{
      target: STEPS.CHANGE_STATUS,
      cond: isNoAnswerStatus,
      actions: [saveCallResult]
    }, {
      target: STEPS.NOTES_AND_QQ,
      actions: [saveCallResult]
    }]), EVENTS.SKIP, [{
      actions: [openCadenceControl],
      cond: canOpenCadenceControlOnSkip
    }, {
      actions: [closeModals]
    }])
  }), STEPS.NOTES_AND_QQ, {
    on: _defineProperty$3(_defineProperty$3(_defineProperty$3({}, EVENTS.NEXT, [{
      target: STEPS.CHANGE_STATUS,
      cond: isCorrectContact
    }, {
      target: STEPS.SCHEDULE_NEXT_STEPS
    }]), EVENTS.PREVIOUS, STEPS.CALL_RESULTS), EVENTS.SKIP, [{
      actions: [openCadenceControl],
      cond: canOpenCadenceControlOnSkip
    }, {
      actions: [closeModals]
    }])
  }), STEPS.CHANGE_STATUS, {
    on: _defineProperty$3(_defineProperty$3(_defineProperty$3({}, EVENTS.NEXT, [{
      target: STEPS.CONVERT_OBJECT,
      cond: canConvertBoject
    }, {
      target: STEPS.OPPORTUNITY_CONTROL,
      cond: canCreateOpportunity
    }, {
      target: STEPS.SCHEDULE_NEXT_STEPS,
      cond: canStatusHaveNextStep
    }, {
      actions: [closeModals],
      cond: leadHasDefinitiveStatus
    }, {
      actions: [createMeeting],
      cond: canCreateMeeting
    }, {
      actions: [openCadenceControl],
      cond: canOpenCadenceControl
    }]), EVENTS.PREVIOUS, [{
      target: STEPS.CALL_RESULTS,
      cond: isNoAnswerStatus
    }, {
      target: STEPS.NOTES_AND_QQ
    }]), EVENTS.SKIP, [{
      actions: [openCadenceControl],
      cond: canOpenCadenceControlOnSkip
    }, {
      actions: [closeModals]
    }])
  }), STEPS.SALES_CHANGE_STATUS, {
    on: _defineProperty$3(_defineProperty$3(_defineProperty$3({}, EVENTS.NEXT, [{
      actions: [closeModals],
      cond: isDefinitiveStatus
    }, {
      target: STEPS.OPPORTUNITY_CONTROL
    }]), EVENTS.PREVIOUS, [{
      target: STEPS.CALL_RESULTS_OPP
    }]), EVENTS.SKIP, [{
      actions: [openCadenceControl],
      cond: canOpenCadenceControlOnSkip
    }, {
      actions: [closeModals]
    }])
  }), STEPS.SCHEDULE_NEXT_STEPS, {
    on: _defineProperty$3(_defineProperty$3({}, EVENTS.PREVIOUS, [{
      target: STEPS.CHANGE_STATUS,
      cond: isCorrectContact
    }, {
      target: STEPS.NOTES_AND_QQ
    }]), EVENTS.SKIP, [{
      actions: [openCadenceControl],
      cond: canOpenCadenceControlOnSkip
    }, {
      actions: [closeModals]
    }])
  }), STEPS.CONVERT_OBJECT, {
    on: _defineProperty$3(_defineProperty$3(_defineProperty$3({}, EVENTS.PREVIOUS, [{
      target: STEPS.CHANGE_STATUS
    }]), EVENTS.NEXT, [{
      target: STEPS.OPPORTUNITY_CONTROL,
      actions: saveConvertedLeads
    }]), EVENTS.SKIP, [{
      actions: [openCadenceControl],
      cond: canOpenCadenceControlOnSkip
    }, {
      actions: [closeModals]
    }])
  }), STEPS.OPPORTUNITY_CONTROL, {
    on: _defineProperty$3(_defineProperty$3({}, EVENTS.PREVIOUS, [{
      target: STEPS.CALL_RESULTS_OPP,
      cond: isLeadWithOpportunity
    }, {
      target: STEPS.CHANGE_STATUS
    }]), EVENTS.SKIP, [{
      actions: [openCadenceControl],
      cond: canOpenCadenceControlOnSkip
    }, {
      actions: [closeModals]
    }])
  })
};

function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(arg) { var key = _toPrimitive$2(arg, "string"); return _typeof$2(key) === "symbol" ? key : String(key); }
function _toPrimitive$2(input, hint) { if (_typeof$2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var stepsMachineMeetingReportResult = {
  id: 'meeting_report_result_steps',
  context: {},
  initial: STEPS.INITIAL,
  states: _defineProperty$2(_defineProperty$2(_defineProperty$2({}, STEPS.INITIAL, {
    always: [{
      target: STEPS.MEETING_RESULT
    }]
  }), STEPS.MEETING_RESULT, {
    on: _defineProperty$2({}, EVENTS.NEXT, [{
      target: STEPS.NOTES
    }])
  }), STEPS.NOTES, {
    on: _defineProperty$2({}, EVENTS.PREVIOUS, [{
      target: STEPS.MEETING_RESULT
    }])
  })
};

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var stepsMachineNextSteps = {
  id: 'inactive_handling_steps',
  context: {},
  initial: STEPS.INACTIVE_HANDLING,
  states: _defineProperty$1({}, STEPS.INACTIVE_HANDLING, {
    on: _defineProperty$1(_defineProperty$1({}, EVENTS.NEXT, [{
      // actions: [pureHandleSubmit],
      actions: ['handleSubmit']
    }]), EVENTS.SKIP, [{
      actions: ['handleSkip']
    }])
  })
};

var WIZARD_MODALS;
(function (WIZARD_MODALS) {
  WIZARD_MODALS["NEXT_STEP"] = "NEXT_STEP";
  WIZARD_MODALS["MEETING_RESULT"] = "MEETING_RESULT";
  WIZARD_MODALS["CONTACT_FLOW_OTO"] = "CONTACT_FLOW_OTO";
  WIZARD_MODALS["CONTACT_FLOW_APP"] = "CONTACT_FLOW_APP";
  WIZARD_MODALS["CHANGE_STATUS"] = "CHANGE_STATUS";
})(WIZARD_MODALS || (WIZARD_MODALS = {}));
var DefaultWizardConfigs = {
  NEXT_STEP: stepsMachineNextSteps,
  MEETING_RESULT: stepsMachineMeetingReportResult,
  CONTACT_FLOW_OTO: stepsMachineContactFlowOTO,
  CONTACT_FLOW_APP: stepsMachineContactFlowAPP,
  CHANGE_STATUS: stepsMachineChangeStatus
};
var STEPS_PROPS = Object.seal({
  CALL_RESULTS_OPP: {
    titleKey: 'callResultOpp',
    width: 736
  },
  CALL_RESULTS: {
    titleKey: 'callResult',
    width: 736
  },
  CHANGE_STATUS: {
    titleKey: 'changeStatus',
    width: 760
  },
  CONVERT_OBJECT: {
    titleKey: 'convertObject',
    width: 656
  },
  INITIAL: {
    titleKey: 'initial',
    width: 870
  },
  NOTES_AND_QQ: {
    titleKey: 'notesAndQQs',
    width: 870
  },
  OPPORTUNITY_CONTROL: {
    titleKey: 'opportunityControl',
    width: 870
  },
  SALES_CHANGE_STATUS: {
    titleKey: 'changeSalesStatus',
    width: 760
  },
  SCHEDULE_NEXT_STEPS: {
    titleKey: 'scheduleNextSteps',
    width: 760
  },
  CUSTOM_OBJECT: {
    titleKey: 'customObject',
    width: 760
  },
  NOTES: {
    titleKey: 'notes',
    width: 972
  },
  ONLY_QQS: {
    titleKey: 'onlyQQs',
    width: 736
  },
  CHANGE_STATUS_SALESFORCE: {
    titleKey: 'changeStatusSalesforce',
    width: 870
  },
  OPPORTUNITY_CONTROL_OTO: {
    titleKey: 'opportunityControlOTO',
    width: 736
  },
  BOBJECT_FORM: {
    titleKey: 'bobjectForm',
    width: 736
  },
  CRM_UPDATES: {
    titleKey: 'crmUpdates',
    width: 736
  },
  ADD_LEAD_TO_ACTIVITY: {
    titleKey: 'addLeadToActivity',
    width: 736
  },
  STATUS_NOTE_ACTIONS: {
    titleKey: 'statusNoteActions',
    width: 964
  },
  TASK_MANAGEMENT: {
    titleKey: 'taskManagement',
    width: 964
  }
});
var WIZARD_SOURCES;
(function (WIZARD_SOURCES) {
  WIZARD_SOURCES["OTO"] = "OTO";
  WIZARD_SOURCES["APP"] = "APP";
})(WIZARD_SOURCES || (WIZARD_SOURCES = {}));

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var useWizardMachine = function useWizardMachine(accountId, source) {
  var hasCustomWizardsEnabled = useCustomWizardsEnabled(accountId);
  var _useCustomWizards = useCustomWizards(accountId, hasCustomWizardsEnabled, source),
    wizardsMap = _useCustomWizards.availableCustomWizards;
  if (!hasCustomWizardsEnabled && !wizardsMap) {
    wizardsMap = {
      NEXT_STEP: null,
      MEETING_RESULT: null,
      CHANGE_STATUS: null
    };
    if (source == 'APP') {
      wizardsMap.CONTACT_FLOW_APP = null;
    } else {
      wizardsMap.CONTACT_FLOW_OTO = null;
    }
  }
  function getActionsAndGuardsFromCustomWizard(json) {
    var actions = {};
    var conds = {};
    var _useWizardCallbacks = useWizardCallbacks(),
      getCallback = _useWizardCallbacks.getCallback;
    var parserActionsAndConds = function parserActionsAndConds(key, value) {
      if (key === 'actions') {
        if (typeof value === 'string') {
          actions[value] = getCallback(value);
        } else if (Array.isArray(value)) {
          value.forEach(function (item) {
            return actions[item] = getCallback(item);
          });
        }
      }
      if (key === 'cond') {
        conds[value] = getCallback(value);
      }
      return value;
    };
    JSON.parse(json, parserActionsAndConds);
    return {
      actions: actions,
      conds: conds
    };
  }
  var getMachine = function getMachine(key) {
    if (!hasCustomWizardsEnabled || !wizardsMap || !wizardsMap[key]) {
      return createMachine(DefaultWizardConfigs[key]);
    } else {
      var _getActionsAndGuardsF = getActionsAndGuardsFromCustomWizard(wizardsMap[key]),
        actions = _getActionsAndGuardsF.actions,
        conds = _getActionsAndGuardsF.conds;
      return createMachine(JSON.parse(wizardsMap[key]), {
        actions: actions,
        guards: conds
      });
    }
  };
  var getButtonStepConfig = function getButtonStepConfig(metaInfo) {
    var metaInfoStep = Object.keys(metaInfo).reduce(function (acc, key) {
      var value = metaInfo[key];
      Object.assign(acc, value);
      return acc;
    }, {});
    return _objectSpread(_objectSpread({}, metaInfoStep), {}, {
      hasPreviousStep: false,
      hasNextStep: false
    });
  };
  var getMetaInfoStep = function getMetaInfoStep(metaInfo) {
    return Object.keys(metaInfo).reduce(function (acc, key) {
      var value = metaInfo[key];
      Object.assign(acc, value);
      return acc;
    }, {});
  };
  return {
    getMachine: getMachine,
    hasCustomWizardsEnabled: hasCustomWizardsEnabled,
    wizardsMap: wizardsMap,
    getButtonStepConfig: getButtonStepConfig,
    getMetaInfoStep: getMetaInfoStep
  };
};

var WizardContext = /*#__PURE__*/createContext(null);
function useWizardContextStore() {
  var context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizardContextStore must be used within a ExtensionProvider');
  }
  return context;
}
function useWizardContext() {
  var store = useWizardContextStore();
  function getState(selector) {
    var cb = function cb() {
      return selector(store.snapshot());
    };
    return useSyncExternalStore(store.subscribe, cb, cb);
  }
  function resetWizardProperties(key) {
    store.setState("wizard_".concat(key), {
      visible: false,
      bobject: null
    });
  }
  function setWizardProperties(key, visibilityContext) {
    store.setState("wizard_".concat(key), visibilityContext);
  }
  function addMetaToWizardProperties(key) {
    var _store$snapshot;
    var meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var wizardProperties = (_store$snapshot = store.snapshot()) === null || _store$snapshot === void 0 ? void 0 : _store$snapshot["wizard_".concat(key)];
    for (var _label in meta) {
      wizardProperties[_label] = meta[_label];
    }
    store.setState("wizard_".concat(key), wizardProperties);
  }
  function getWizardProperties(key) {
    var wizardKey = "wizard_".concat(key);
    var wizardProperties = getState(function (state) {
      return state[wizardKey];
    });
    if (wizardProperties) {
      return wizardProperties;
    } else {
      resetWizardProperties(key);
      return {
        visible: false,
        bobject: null
      };
    }
  }
  function openWizard(wizardKey, bobject) {
    var _store$snapshot2, _store$snapshot3;
    var meta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if ((_store$snapshot2 = store.snapshot()) !== null && _store$snapshot2 !== void 0 && (_store$snapshot3 = _store$snapshot2["wizard_".concat(wizardKey)]) !== null && _store$snapshot3 !== void 0 && _store$snapshot3.visible) return;
    var wizardProperties = {
      visible: true,
      bobject: bobject
    };
    for (var _label2 in meta) {
      wizardProperties[_label2] = meta[_label2];
    }
    window.dispatchEvent(new CustomEvent(MessagesEvents.MinimizeDialer));
    store.setState("wizard_".concat(wizardKey), wizardProperties);
  }
  var _useWizardMachine = useWizardMachine(getState(function (state) {
      return state.accountId;
    }), getState(function (state) {
      return state.source;
    })),
    getMachine = _useWizardMachine.getMachine,
    hasCustomWizardsEnabled = _useWizardMachine.hasCustomWizardsEnabled,
    wizardsMap = _useWizardMachine.wizardsMap,
    getButtonStepConfig = _useWizardMachine.getButtonStepConfig,
    getMetaInfoStep = _useWizardMachine.getMetaInfoStep;
  return {
    accountId: getState(function (state) {
      return state.accountId;
    }),
    hasCustomWizardsEnabled: hasCustomWizardsEnabled,
    getMachine: getMachine,
    getButtonStepConfig: getButtonStepConfig,
    wizardsMap: wizardsMap,
    getWizardProperties: getWizardProperties,
    setWizardProperties: setWizardProperties,
    resetWizardProperties: resetWizardProperties,
    openWizard: openWizard,
    addMetaToWizardProperties: addMetaToWizardProperties,
    getMetaInfoStep: getMetaInfoStep
  };
}
function WizardProvider(_ref) {
  var children = _ref.children,
    value = _ref.value;
  var listener = useLazyRef(function () {
    return new Set();
  });
  var state = useLazyRef(function () {
    return value;
  });
  var store = useMemo(function () {
    return {
      setState: function setState(key, value) {
        // @ts-ignore
        if (Object.is(state.current[key], value)) {
          return;
        }
        // @ts-ignore
        state.current[key] = value;
        store.emit();
      },
      snapshot: function snapshot() {
        return state.current;
      },
      subscribe: function subscribe(callback) {
        listener.current.add(callback);
        return function () {
          return listener.current["delete"](callback);
        };
      },
      emit: function emit() {
        return listener.current.forEach(function (cb) {
          return cb();
        });
      }
    };
  }, []);
  return /*#__PURE__*/jsx(WizardContext.Provider, {
    value: store,
    children: children
  });
}

export { DefaultWizardConfigs, EVENTS, STEPS, STEPS_PROPS, WIZARD_MODALS, WIZARD_SOURCES, WizardProvider, useWizardContext, useWizardMachine };
                                 
