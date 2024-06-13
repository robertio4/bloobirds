import React, { useState, useMemo, createContext, useContext, useEffect, createElement, useLayoutEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { CadenceControlModal } from '@bloobirds-it/cadence';
import { Icon, Text, IconButton, Spinner, Label, ModalContent, ChipGroup, Chip, Select, Item, Checkbox, Input, ModalFooter, Button, TextArea, ModalSection, useToasts, RadioGroup, Radio, Tooltip, Callout, Skeleton, MultiSelect, CheckItem, ShortTermRelativeDatePicker, Modal, ModalHeader, ModalTitle, ModalCloseIcon } from '@bloobirds-it/flamingo-ui';
import { useUserHelpers, useActiveUserId, useActiveUserSettings, useObjectCreationSettings, useQualifyingQuestions, useCustomTasks, useNotifications, useActiveAccountId, useCustomWizardsEnabled, useCustomWizards } from '@bloobirds-it/hooks';
import { COMPANY_STATUS, LEAD_STATUS, LEAD_SALES_STATUS_VALUES_LOGIC_ROLE, COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE, ACTIVITY_FIELDS_LOGIC_ROLE, COMPANY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, PITCH_DONE_VALUES_LOGIC_ROLE, BobjectTypes, ACTIVITY_DIRECTION, REPORTED_VALUES_LOGIC_ROLE, COMPANY_STAGE_LOGIC_ROLE, COMPANY_STATUS_LOGIC_ROLE, LEAD_STATUS_LOGIC_ROLE, TemplateStage, UserHelperKeys, TASK_FIELDS_LOGIC_ROLE, TASK_PRIORITY_VALUE, TASK_TYPE, TASK_STATUS_VALUE_LOGIC_ROLE, TASK_ACTION_VALUE } from '@bloobirds-it/types';
import { getFieldByLogicRole, getValueFromLogicRole, getTextFromLogicRole, segToTime, api, getIsSales, getFieldsByType, formatDateAsText, isHtml, isLead, add } from '@bloobirds-it/utils';
import { useMachine } from '@xstate/react';
import { assign, createMachine } from 'xstate';
import useSWR from 'swr';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { isToday } from 'date-fns';
import { useRichTextEditorPlugins, deserialize, RichTextEditor, EditorToolbar, EditorToolbarControlsSection, EditorToolbarFontStylesSection, EditorToolbarTextMarksSection, EditorToolbarListsSection, serialize } from '@bloobirds-it/rich-text-editor';
import mixpanel from 'mixpanel-browser';
import capitalize from 'lodash/capitalize';
import classnames from 'clsx';
import sortBy from 'lodash/sortBy';
import { CSSTransition } from 'react-transition-group';
import range from 'lodash/range';
import { useForm, useController } from 'react-hook-form';
import { AssignedToSelector, BobjectSelector } from '@bloobirds-it/bobjects';
import { TaskTypeSelector, PrioritySelector } from '@bloobirds-it/tasks';

var CALL_RESULTS_LOGIC_ROLE;
(function (CALL_RESULTS_LOGIC_ROLE) {
  CALL_RESULTS_LOGIC_ROLE["CORRECT_CONTACT"] = "ACTIVITY__CALL_RESULT__CORRECT_CONTACT";
  CALL_RESULTS_LOGIC_ROLE["APPROACH"] = "ACTIVITY__CALL_RESULT__APPROACH";
  CALL_RESULTS_LOGIC_ROLE["GATEKEEPER"] = "ACTIVITY__CALL_RESULT__GATEKEEPER";
  CALL_RESULTS_LOGIC_ROLE["NO_ANSWER"] = "ACTIVITY__CALL_RESULT__NO_ANSWER";
  CALL_RESULTS_LOGIC_ROLE["WRONG_DATA"] = "ACTIVITY__CALL_RESULT__WRONG_DATA";
})(CALL_RESULTS_LOGIC_ROLE || (CALL_RESULTS_LOGIC_ROLE = {}));

function _typeof$b(obj) { "@babel/helpers - typeof"; return _typeof$b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$b(obj); }
function _defineProperty$b(obj, key, value) { key = _toPropertyKey$b(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$b(arg) { var key = _toPrimitive$b(arg, "string"); return _typeof$b(key) === "symbol" ? key : String(key); }
function _toPrimitive$b(input, hint) { if (_typeof$b(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$b(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var MODAL_STEPS = Object.seal({
  CONTACT_FLOW: 'CONTACT_FLOW',
  CADENCE_CONTROL: 'CADENCE_CONTROL',
  CHANGE_STATUS: 'CHANGE_STATUS'
});
var STEPS$1 = Object.seal({
  INITIAL: 'INITIAL',
  CALL_RESULTS_OPP: 'CALL_RESULTS_OPP',
  CALL_RESULTS: 'CALL_RESULTS',
  CHANGE_STATUS: 'CHANGE_STATUS',
  CONVERT_OBJECT: 'CONVERT_OBJECT',
  NOTES_AND_QQ: 'NOTES_AND_QQ',
  SALES_CHANGE_STATUS: 'SALES_CHANGE_STATUS',
  SCHEDULE_NEXT_STEPS: 'SCHEDULE_NEXT_STEPS'
});
var isCorrectContact$1 = function isCorrectContact(context, event) {
  return (context === null || context === void 0 ? void 0 : context.callResult) === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT || (event === null || event === void 0 ? void 0 : event.isCorrectContact);
};
var isNoAnswerStatus = function isNoAnswerStatus(context, event) {
  var callResult = (event === null || event === void 0 ? void 0 : event.callResult) || (context === null || context === void 0 ? void 0 : context.callResult);
  return [CALL_RESULTS_LOGIC_ROLE.NO_ANSWER, CALL_RESULTS_LOGIC_ROLE.WRONG_DATA].includes(callResult);
};
var isCorrectContactAndHasSalesLead = function isCorrectContactAndHasSalesLead(context, event) {
  return isCorrectContact$1(context, event) && event.isLeadInSalesStage;
};
var canStatusHaveNextStep = function canStatusHaveNextStep(context, event) {
  return event.companyStatus === COMPANY_STATUS.NURTURING || event.leadStatus === LEAD_STATUS.NURTURING;
};
var isLeadDiscarded = function isLeadDiscarded(context, event) {
  return event.leadStatus === LEAD_STATUS.DISCARDED;
};
var isDiscardedStatus = function isDiscardedStatus(context, event) {
  return event.leadStatus === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED || event.companyStatus === COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED;
};
var canCreateMeeting = function canCreateMeeting(context, event) {
  return event.companyStatus === COMPANY_STATUS.MEETING || event.leadStatus === LEAD_STATUS.MEETING;
};
var canOpenCadenceControl = function canOpenCadenceControl(context, event) {
  context.bobject = event.bobject;
  return event.companyStatus === COMPANY_STATUS.CONTACTED || event.companyStatus === COMPANY_STATUS.ENGAGED || event.companyStatus === COMPANY_STATUS.ON_PROSPECTION ||
  //nonsense, I know but all this should be refactored
  event.leadStatus === COMPANY_STATUS.ON_PROSPECTION || event.leadStatus === COMPANY_STATUS.ENGAGED || event.leadStatus === COMPANY_STATUS.ON_PROSPECTION;
};
var hasNoReferenceBobject = function hasNoReferenceBobject(context) {
  return !context.referenceBobject;
};
var closeModals = function closeModals(context) {
  return context.handleClose();
};
var createMeeting = function createMeeting(context) {
  context.handleClose();
  if (context !== null && context !== void 0 && context.handleOpenMinimizableModal && typeof context.handleOpenMinimizableModal === 'function') {
    context.handleOpenMinimizableModal(context.isCalendarEnabled ? 'calendarMeeting' : 'meeting');
  }
};
var openCadenceControl = function openCadenceControl(context) {
  context.openCadenceControl();
};
var isCorrectContactAndNotHasSalesLead = function isCorrectContactAndNotHasSalesLead(context, event) {
  return isCorrectContact$1(context, event) && !event.isLeadInSalesStage;
};
var canCreateOpportunity = function canCreateOpportunity(context, event) {
  return (event.companyStatus === COMPANY_STATUS.ACCOUNT || event.leadStatus === LEAD_STATUS.CONTACT) && canUseSalesFeatures(context);
};
var canConvertBoject = function canConvertBoject(context, event) {
  context.bobject = event.bobject;
  return (event.companyStatus === COMPANY_STATUS.ACCOUNT || event.leadStatus === LEAD_STATUS.CONTACT) && canUseSalesFeatures(context);
};
var leadHasDefinitiveStatus = function leadHasDefinitiveStatus(context, event) {
  return [LEAD_STATUS.DISCARDED, LEAD_STATUS.ON_HOLD].includes(event.leadStatus);
};
var isDefinitiveStatus = function isDefinitiveStatus(context, event) {
  return event.leadStatus === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED || event.leadStatus === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD || event.companyStatus === COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED || event.companyStatus === COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD;
};
var isLeadWithOpportunity = function isLeadWithOpportunity(context, event) {
  return !!(event !== null && event !== void 0 && event.leadOpportunityId) || (context === null || context === void 0 ? void 0 : context.leadOpportunityId);
};
var setSelectOpportunity = function setSelectOpportunity(context) {
  context.updateSelectedOpportunity(context.opportunity);
};
var setConvertData = function setConvertData(context) {
  context.setConvertData({
    bobjectToSet: context.bobject
  });
};
var saveConvertedLeads = assign({
  convertedLeads: function convertedLeads(_, event) {
    return event.leads;
  }
});
var canUseSalesFeatures = function canUseSalesFeatures(context) {
  return context.hasSalesFeatureEnabled;
};
var EVENTS = Object.seal({
  NEXT: 'NEXT',
  PREVIOUS: 'PREVIOUS',
  SKIP: 'SKIP'
});
var stepsMachine = createMachine({
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
    isCalendarEnabled: null
  },
  initial: STEPS$1.INITIAL,
  states: _defineProperty$b(_defineProperty$b(_defineProperty$b(_defineProperty$b(_defineProperty$b(_defineProperty$b(_defineProperty$b({}, STEPS$1.INITIAL, {
    on: _defineProperty$b(_defineProperty$b(_defineProperty$b(_defineProperty$b({}, STEPS$1.CHANGE_STATUS, STEPS$1.CHANGE_STATUS), STEPS$1.SALES_CHANGE_STATUS, STEPS$1.SALES_CHANGE_STATUS), STEPS$1.CALL_RESULTS, STEPS$1.CALL_RESULTS), STEPS$1.CALL_RESULTS_OPP, STEPS$1.CALL_RESULTS_OPP)
  }), STEPS$1.CALL_RESULTS_OPP, {
    on: _defineProperty$b({}, EVENTS.NEXT, [{
      target: STEPS$1.SALES_CHANGE_STATUS,
      cond: isCorrectContactAndHasSalesLead
    }, {
      actions: [openCadenceControl]
    }])
  }), STEPS$1.CALL_RESULTS, {
    on: _defineProperty$b({}, EVENTS.NEXT, [{
      actions: [closeModals],
      cond: hasNoReferenceBobject
    }, {
      target: STEPS$1.CHANGE_STATUS,
      cond: isNoAnswerStatus,
      actions: assign({
        callResult: function callResult(context, event) {
          return event.callResult;
        }
      })
    }, {
      target: STEPS$1.NOTES_AND_QQ,
      actions: assign({
        callResult: function callResult(context, event) {
          return event.callResult;
        }
      })
    }])
  }), STEPS$1.NOTES_AND_QQ, {
    on: _defineProperty$b(_defineProperty$b({}, EVENTS.NEXT, [{
      target: STEPS$1.CHANGE_STATUS,
      cond: isCorrectContact$1
    }, {
      target: STEPS$1.SCHEDULE_NEXT_STEPS
    }]), EVENTS.PREVIOUS, STEPS$1.CALL_RESULTS)
  }), STEPS$1.CHANGE_STATUS, {
    on: _defineProperty$b(_defineProperty$b(_defineProperty$b({}, EVENTS.NEXT, [{
      target: STEPS$1.SCHEDULE_NEXT_STEPS,
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
      target: STEPS$1.CALL_RESULTS,
      cond: isNoAnswerStatus
    }, {
      target: STEPS$1.NOTES_AND_QQ
    }]), EVENTS.SKIP, [{
      actions: [openCadenceControl]
    }])
  }), STEPS$1.SALES_CHANGE_STATUS, {
    on: _defineProperty$b(_defineProperty$b({}, EVENTS.NEXT, [{
      actions: [closeModals],
      cond: isDiscardedStatus
    }, {
      actions: [openCadenceControl]
    }]), EVENTS.PREVIOUS, [{
      target: STEPS$1.CALL_RESULTS_OPP
    }])
  }), STEPS$1.SCHEDULE_NEXT_STEPS, {
    on: _defineProperty$b(_defineProperty$b(_defineProperty$b({}, EVENTS.PREVIOUS, [{
      target: STEPS$1.CHANGE_STATUS,
      cond: isCorrectContact$1
    }, {
      target: STEPS$1.CHANGE_STATUS,
      cond: isNoAnswerStatus
    }, {
      target: STEPS$1.NOTES_AND_QQ
    }]), EVENTS.NEXT, [{
      actions: [closeModals]
    }]), EVENTS.SKIP, [{
      actions: [closeModals]
    }])
  })
});
var modalStepsMachine = createMachine({
  id: 'contact_flow_modal_control',
  context: {
    handleClose: null
  },
  initial: MODAL_STEPS.CONTACT_FLOW,
  states: _defineProperty$b(_defineProperty$b(_defineProperty$b({}, MODAL_STEPS.CONTACT_FLOW, {
    on: _defineProperty$b(_defineProperty$b({}, MODAL_STEPS.CADENCE_CONTROL, MODAL_STEPS.CADENCE_CONTROL), MODAL_STEPS.CHANGE_STATUS, MODAL_STEPS.CHANGE_STATUS)
  }), MODAL_STEPS.CADENCE_CONTROL, {
    on: _defineProperty$b(_defineProperty$b({}, EVENTS.NEXT, closeModals), MODAL_STEPS.CHANGE_STATUS, MODAL_STEPS.CHANGE_STATUS)
  }), MODAL_STEPS.CHANGE_STATUS, {
    on: _defineProperty$b(_defineProperty$b({}, EVENTS.NEXT, closeModals), MODAL_STEPS.CHANGE_STATUS, MODAL_STEPS.CHANGE_STATUS)
  })
});
var getCustomMachine = function getCustomMachine(customWizardsMap) {
  if (customWizardsMap != null && customWizardsMap.CONTACT_FLOW_OTO != null && customWizardsMap.CONTACT_FLOW_OTO !== '') {
    var customMachine = createMachine(JSON.parse(customWizardsMap.CONTACT_FLOW_OTO), {
      actions: {
        closeModals: closeModals,
        setSelectOpportunity: setSelectOpportunity,
        openCadenceControl: openCadenceControl,
        setConvertData: setConvertData,
        createMeeting: createMeeting,
        saveConvertedLeads: saveConvertedLeads,
        assignCallResult: assign({
          callResult: function callResult(context, event) {
            return event.callResult;
          }
        })
      },
      guards: {
        isCorrectContactAndHasSalesLead: isCorrectContactAndHasSalesLead,
        isCorrectContactAndNotHasSalesLead: isCorrectContactAndNotHasSalesLead,
        isNoAnswerStatus: isNoAnswerStatus,
        isCorrectContact: isCorrectContact$1,
        canConvertBoject: canConvertBoject,
        canCreateOpportunity: canCreateOpportunity,
        canStatusHaveNextStep: canStatusHaveNextStep,
        leadHasDefinitiveStatus: leadHasDefinitiveStatus,
        canCreateMeeting: canCreateMeeting,
        canOpenCadenceControl: canOpenCadenceControl,
        isDefinitiveStatus: isDefinitiveStatus,
        isLeadWithOpportunity: isLeadWithOpportunity,
        hasNoReferenceBobject: hasNoReferenceBobject,
        isLeadDiscarded: isLeadDiscarded,
        isDiscardedStatus: isDiscardedStatus
      }
    });
    return customMachine;
  } else {
    console.log('WARNING: Custom wizards map is null, using original steps machine');
    return stepsMachine;
  }
};
var getButtonStepConfig = function getButtonStepConfig(metaInfo) {
  var metaInfoStep = Object.keys(metaInfo).reduce(function (acc, key) {
    var value = metaInfo[key];

    // Assuming each meta value is an object
    Object.assign(acc, value);
    return acc;
  }, {});
  return {
    nextButtonTitle: metaInfoStep === null || metaInfoStep === void 0 ? void 0 : metaInfoStep.nextButtonTitle,
    nextButtonAlternativeTitle: metaInfoStep === null || metaInfoStep === void 0 ? void 0 : metaInfoStep.nextButtonAlternativeTitle,
    previousButtonTitle: metaInfoStep === null || metaInfoStep === void 0 ? void 0 : metaInfoStep.previousButtonTitle,
    showSkipButton: metaInfoStep === null || metaInfoStep === void 0 ? void 0 : metaInfoStep.showSkipButton,
    openCadenceOnSkip: metaInfoStep === null || metaInfoStep === void 0 ? void 0 : metaInfoStep.openCadenceOnSkip,
    hasPreviousStep: false
  };
};

function _typeof$a(obj) { "@babel/helpers - typeof"; return _typeof$a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$a(obj); }
function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$a(Object(source), !0).forEach(function (key) { _defineProperty$a(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$a(obj, key, value) { key = _toPropertyKey$a(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$a(arg) { var key = _toPrimitive$a(arg, "string"); return _typeof$a(key) === "symbol" ? key : String(key); }
function _toPrimitive$a(input, hint) { if (_typeof$a(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$a(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray$2(arr) { return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$9(arr) || _nonIterableSpread$2(); }
function _nonIterableSpread$2() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$9(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$9(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$9(o, minLen); }
function _iterableToArray$2(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$2(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$9(arr); }
function _arrayLikeToArray$9(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var getCallResultPicklistValues = function getCallResultPicklistValues(dataModel) {
  var _dataModel$findValues, _dataModel$findValues2, _dataModel$findValues3, _dataModel$findValues4, _dataModel$findValues5, _dataModel$findValues6;
  var callResultsPicklistValues = (_dataModel$findValues = dataModel.findValuesByFieldLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT).reduce(function (acc, callResult) {
    if (!callResult.isEnabled) return acc;
    var isCorrectContact = callResult.logicRole === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT;
    return [].concat(_toConsumableArray$2(acc), [_objectSpread$a(_objectSpread$a({}, callResult), isCorrectContact ? {
      isCorrectContact: true
    } : {})]);
  }, [])) === null || _dataModel$findValues === void 0 ? void 0 : _dataModel$findValues.sort(function (a, b) {
    return a.ordering < b.ordering ? -1 : 1;
  });
  var pitchDonePicklistValues = dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$findValues2 = dataModel.findValuesByFieldLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.PITCH_DONE)) === null || _dataModel$findValues2 === void 0 ? void 0 : _dataModel$findValues2.sort(function (a, b) {
    return a.value < b.value ? -1 : 1;
  });
  var companyStatusPicklistValues = (_dataModel$findValues3 = dataModel.findValuesByFieldLogicRole(COMPANY_FIELDS_LOGIC_ROLE.STATUS)) === null || _dataModel$findValues3 === void 0 ? void 0 : _dataModel$findValues3.sort(function (a, b) {
    return a.value < b.value ? -1 : 1;
  });
  var leadStatusPicklistValues = (_dataModel$findValues4 = dataModel.findValuesByFieldLogicRole(LEAD_FIELDS_LOGIC_ROLE.STATUS)) === null || _dataModel$findValues4 === void 0 ? void 0 : _dataModel$findValues4.sort(function (a, b) {
    return a.value < b.value ? -1 : 1;
  });
  var companySalesStatusPicklistValues = (_dataModel$findValues5 = dataModel.findValuesByFieldLogicRole(COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS)) === null || _dataModel$findValues5 === void 0 ? void 0 : _dataModel$findValues5.sort(function (a, b) {
    return a.value < b.value ? -1 : 1;
  });
  var leadSalesStatusPicklistValues = (_dataModel$findValues6 = dataModel.findValuesByFieldLogicRole(LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS)) === null || _dataModel$findValues6 === void 0 ? void 0 : _dataModel$findValues6.sort(function (a, b) {
    return a.value < b.value ? -1 : 1;
  });
  return {
    callResultsPicklistValues: callResultsPicklistValues,
    pitchDonePicklistValues: pitchDonePicklistValues,
    companyStatusPicklistValues: companyStatusPicklistValues,
    leadStatusPicklistValues: leadStatusPicklistValues,
    companySalesStatusPicklistValues: companySalesStatusPicklistValues,
    leadSalesStatusPicklistValues: leadSalesStatusPicklistValues
  };
};
var getActivityData = function getActivityData(activity) {
  var _getFieldByLogicRole, _getFieldByLogicRole2;
  var company = (_getFieldByLogicRole = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.referencedBobject;
  var companyName = company && getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  var date = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  var direction = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
  var durationInSeconds = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_DURATION);
  var lead = (_getFieldByLogicRole2 = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)) === null || _getFieldByLogicRole2 === void 0 ? void 0 : _getFieldByLogicRole2.referencedBobject;
  var leadName = lead && getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  var phone = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER);
  var record = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RECORD_URL);
  return {
    companyName: companyName,
    leadName: leadName,
    date: date,
    direction: direction,
    duration: durationInSeconds ? segToTime(durationInSeconds, 'hhh mmm sss') : null,
    phone: phone,
    record: record
  };
};
var calculateFirstColumnSize = function calculateFirstColumnSize(elements) {
  if (!elements) return;
  var calculateHalfNumber = function calculateHalfNumber(elements) {
    var isExactHalf = elements.length % 2 === 0;
    return isExactHalf ? elements.length / 2 : Math.floor(elements.length / 2) + 1;
  };
  var halfNumber = calculateHalfNumber(elements);
  return halfNumber >= 6 ? halfNumber : 6;
};

function _typeof$9(obj) { "@babel/helpers - typeof"; return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$9(obj); }
function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$9(Object(source), !0).forEach(function (key) { _defineProperty$9(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$9(obj, key, value) { key = _toPropertyKey$9(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$9(arg) { var key = _toPrimitive$9(arg, "string"); return _typeof$9(key) === "symbol" ? key : String(key); }
function _toPrimitive$9(input, hint) { if (_typeof$9(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$9(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var fetcher = function fetcher(url) {
  return api.post("".concat(url, "?sort=name%2Casc"), {
    type: 'PITCH',
    segmentationValues: {}
  }).then(function (response) {
    return response === null || response === void 0 ? void 0 : response.data;
  });
};
var useCallResult = function useCallResult(dataModel) {
  var _useSWR = useSWR("/messaging/messagingTemplates/search", fetcher),
    availablePitches = _useSWR.data;
  var picklistValues = getCallResultPicklistValues(dataModel);
  var findPitchDoneNo = function findPitchDoneNo(pitches) {
    return pitches.find(function (pitch) {
      return pitch.logicRole === PITCH_DONE_VALUES_LOGIC_ROLE.NO;
    });
  };
  var isPitchNo = function isPitchNo(pitch) {
    var _findPitchDoneNo;
    return ((_findPitchDoneNo = findPitchDoneNo(picklistValues === null || picklistValues === void 0 ? void 0 : picklistValues.pitchDonePicklistValues)) === null || _findPitchDoneNo === void 0 ? void 0 : _findPitchDoneNo.id) === (pitch === null || pitch === void 0 ? void 0 : pitch.id);
  };
  return _objectSpread$9(_objectSpread$9({}, picklistValues), {}, {
    availablePitches: availablePitches,
    isPitchNo: isPitchNo,
    findPitchDoneNo: findPitchDoneNo
  });
};

function _typeof$8(obj) { "@babel/helpers - typeof"; return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$8(obj); }
var _excluded$3 = ["hasCustomWizardsEnabled", "wizardsMap", "children"];
function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$8(Object(source), !0).forEach(function (key) { _defineProperty$8(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$8(obj, key, value) { key = _toPropertyKey$8(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$8(arg) { var key = _toPrimitive$8(arg, "string"); return _typeof$8(key) === "symbol" ? key : String(key); }
function _toPrimitive$8(input, hint) { if (_typeof$8(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$8(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$8(arr, i) { return _arrayWithHoles$8(arr) || _iterableToArrayLimit$8(arr, i) || _unsupportedIterableToArray$8(arr, i) || _nonIterableRest$8(); }
function _nonIterableRest$8() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$8(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$8(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen); }
function _arrayLikeToArray$8(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$8(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$8(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties$3(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$3(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$3(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var ContactFlowModalContext = /*#__PURE__*/createContext(null);
var ContactFlowModalProvider = function ContactFlowModalProvider(_ref) {
  var hasCustomWizardsEnabled = _ref.hasCustomWizardsEnabled,
    wizardsMap = _ref.wizardsMap,
    children = _ref.children,
    props = _objectWithoutProperties$3(_ref, _excluded$3);
  var activity = props.activity,
    dataModel = props.dataModel,
    referenceBobject = props.referenceBobject,
    handleClose = props.handleClose;
  var hasSalesEnabled = true;
  var hasLeads = true;
  var callResultEntitiesInfo = useCallResult(dataModel);
  var activityRelatedInfo = useActivityRelatedInfo(activity, dataModel, referenceBobject);
  //initialize to entry values instead of useEffect on modal step
  var _useState = useState({
      companyStatus: undefined,
      leadStatus: undefined
    }),
    _useState2 = _slicedToArray$8(_useState, 2),
    changeStatusStepData = _useState2[0],
    setChangeStatusStepData = _useState2[1];
  var _useState3 = useState(),
    _useState4 = _slicedToArray$8(_useState3, 2),
    callResultStepData = _useState4[0],
    setCallResultStepData = _useState4[1];
  var _useState5 = useState(),
    _useState6 = _slicedToArray$8(_useState5, 2),
    noteStepData = _useState6[0],
    setNoteStepData = _useState6[1];
  var _useMachine = useMachine(modalStepsMachine, {
      context: {
        handleClose: handleClose
      }
    }),
    _useMachine2 = _slicedToArray$8(_useMachine, 2),
    modalStep = _useMachine2[0].value,
    modalControlSend = _useMachine2[1];
  var machineDefinition = useMemo(function () {
    return hasCustomWizardsEnabled ? getCustomMachine(wizardsMap) : stepsMachine;
  }, [wizardsMap]);
  var _useMachine3 = useMachine(machineDefinition, {
      context: {
        referenceBobject: referenceBobject,
        hasSalesEnabled: hasSalesEnabled,
        handleClose: handleClose,
        openCadenceControl: function openCadenceControl() {
          modalControlSend(MODAL_STEPS.CADENCE_CONTROL);
        }
      }
    }),
    _useMachine4 = _slicedToArray$8(_useMachine3, 3),
    step = _useMachine4[0].value,
    send = _useMachine4[1],
    service = _useMachine4[2];
  var buttonStepConfig = null;
  if (hasCustomWizardsEnabled) {
    service.onTransition(function (state) {
      buttonStepConfig = getButtonStepConfig(state.meta);
      buttonStepConfig.hasPreviousStep = state.can(EVENTS.PREVIOUS);
    });
  }
  return /*#__PURE__*/jsx(ContactFlowModalContext.Provider, {
    value: _objectSpread$8(_objectSpread$8(_objectSpread$8(_objectSpread$8({}, props), activityRelatedInfo), callResultEntitiesInfo), {}, {
      hasSalesEnabled: hasSalesEnabled,
      hasLeads: hasLeads,
      callResultStepData: callResultStepData,
      setCallResultStepData: setCallResultStepData,
      changeStatusStepData: changeStatusStepData,
      setChangeStatusStepData: setChangeStatusStepData,
      noteStepData: noteStepData,
      setNoteStepData: setNoteStepData,
      step: step,
      send: send,
      service: service,
      modalStep: modalStep,
      modalControlSend: modalControlSend,
      buttonStepConfig: buttonStepConfig,
      handleClose: handleClose
    }),
    children: children
  });
};
var useContactFlow = function useContactFlow() {
  var context = useContext(ContactFlowModalContext);
  if (context === undefined) {
    throw new Error('useContactFlowModal must be used within the modal provider');
  }
  return context;
};
//@ts-ignore
var useActivityRelatedInfo = function useActivityRelatedInfo(activity, dataModel, referenceBobject) {
  var _getFieldByLogicRole, _getFieldByLogicRole2, _getFieldByLogicRole3;
  var activityLead = (_getFieldByLogicRole = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.referencedBobject;
  var activityCompany = (_getFieldByLogicRole2 = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)) === null || _getFieldByLogicRole2 === void 0 ? void 0 : _getFieldByLogicRole2.referencedBobject;
  var activityOpportunity = (_getFieldByLogicRole3 = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)) === null || _getFieldByLogicRole3 === void 0 ? void 0 : _getFieldByLogicRole3.referencedBobject;
  var referenceBobjectIsSales = referenceBobject ? getIsSales(dataModel, referenceBobject) : false;
  var leadAvailablePhoneFields = getFieldsByType(activityLead, 'PHONE');
  var companyAvailablePhoneFields = getFieldsByType(activityLead, 'PHONE');
  return {
    referenceBobject: referenceBobject,
    activityCompany: activityCompany,
    activityLead: activityLead,
    activityOpportunity: activityOpportunity,
    referenceBobjectIsSales: referenceBobjectIsSales,
    leadAvailablePhoneFields: leadAvailablePhoneFields,
    companyAvailablePhoneFields: companyAvailablePhoneFields
  };
};

var STEPS_PROPS = function STEPS_PROPS(t) {
  return {
    CALL_RESULTS_OPP: {
      title: t('callResultOpp'),
      width: 736
    },
    CALL_RESULTS: {
      title: t('callResult'),
      width: 736
    },
    CHANGE_STATUS: {
      title: t('changeStatus'),
      width: 760
    },
    CONVERT_OBJECT: {
      title: t('convertObject'),
      width: 656
    },
    INITIAL: {
      title: t('initial'),
      width: 870
    },
    NOTES_AND_QQ: {
      title: t('notesAndQQs'),
      width: 870
    },
    OPPORTUNITY_CONTROL: {
      title: t('opportunityControl'),
      width: 870
    },
    SALES_CHANGE_STATUS: {
      title: t('changeSalesStatus'),
      width: 760
    },
    SCHEDULE_NEXT_STEPS: {
      title: t('scheduleNextSteps'),
      width: 760
    }
  };
};

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === 'undefined') {
    return;
  }
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$a = ".contactFlow-module__modal_header__7U6oC {\n  box-sizing: border-box;\n  padding: 16px;\n}\n\n.contactFlow-module__modal_content__f2dKi {\n  box-sizing: border-box;\n  padding: 32px 58px 0;\n}\n\n.contactFlow-module__modal_footer__d1JW- {\n  box-sizing: border-box;\n  padding: 0 32px 40px 32px;\n}\n\n.contactFlow-module__modal_content__f2dKi > div > section > div {\n  display: flex;\n  flex-direction: column;\n}\n\n.contactFlow-module__sections_container__NqLS0 {\n  display: flex;\n  height: 272px;\n}\n\n.contactFlow-module__sections_container__NqLS0 + main {\n  padding: 0;\n}\n\n.contactFlow-module__informationPanel__A--T6 {\n  border: 1px solid var(--lightPurple);\n  border-radius: 4px;\n  background-color: var(--lightestPurple);\n  margin-left: 30px;\n  width: 198px;\n  padding: 16px;\n}\n\n.contactFlow-module__info_header__sIl4i {\n  margin-bottom: 8px;\n  line-height: 20px;\n}\n\n.contactFlow-module__stage_callout__wrapper__M34k7 {\n  display: flex;\n  flex-direction: row;\n  padding: 0 30px;\n}\n\n.contactFlow-module__stage_callout__icon__9i1hM {\n  align-self: center;\n  width: 50px;\n  margin-right: 16px;\n}\n\n.contactFlow-module_actions_wrapper__mR2WN {\n  width: 302px;\n}\n\n.contactFlow-module_actions_wrapper__mR2WN > div {\n  display: flex;\n  flex-direction: column;\n}\n\n.contactFlow-module__cadence_preview_wrapper__V7-En {\n  width: 564px;\n  margin-bottom: 24px;\n}\n\n.contactFlow-module__nurturing_preview_wrapper__3jUY7 {\n  width: 564px;\n  margin-bottom: 24px;\n}\n\n.contactFlow-module__nurturing_preview_wrapper__3jUY7 > div > span {\n  padding: 8px 0;\n}\n\n.contactFlow-module__section__wrapper__1y3wW {\n  margin-bottom: 12px;\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: row;\n  position: relative;\n}\n\n.contactFlow-module__list__wrapper__bCOlP {\n  flex-direction: column;\n  flex: 1;\n  margin-right: 15px;\n}\n\n.contactFlow-module_hidden__WkIVk {\n  display: none;\n}\n\n.contactFlow-module_actions_wrapper__mR2WN > div > div {\n  margin-bottom: 8px;\n}\n\n.contactFlow-module__text_block__VYg4j {\n  margin-bottom: 12px;\n}\n\n.contactFlow-module__text_block__VYg4j > a {\n  text-decoration: none;\n  color: var(--bloobirds);\n}\n\n.contactFlow-module__nurturing_text_block__95Z-d {\n  font-size: 11px;\n  margin-bottom: 8px;\n}\n\n.contactFlow-module__nurturing_text_block__95Z-d > a {\n  text-decoration: none;\n  color: var(--bloobirds);\n}\n\n.contactFlow-module__selects_wrapper__udeLG {\n  margin-top: 20px;\n  width: 552px;\n  display: flex;\n  justify-content: space-between;\n}\n\n.contactFlow-module__note_text_area__BwBMW {\n  text-align: start;\n  margin-top: 15px;\n}\n\n.contactFlow-module__reassign_selects_wrapper__d7gGW {\n  margin-top: 20px;\n  width: 552px;\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 12px;\n}\n\n.contactFlow-module__add_task_module__TSiG5 {\n  margin-top: 16px;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  align-content: center;\n}\n\n.contactFlow-module__add_task_title__9sUbe {\n  margin-bottom: 12px;\n}\n\n.contactFlow-module_box__-qUjf {\n  position: relative;\n  z-index: 99;\n\n  bottom: 73%;\n  left: 50%;\n  transform: translateX(-50%);\n\n  width: 700px;\n  background: #ffffff;\n\n  /* Main/peanut-light */\n  border: 1px solid #d4e0f1;\n\n  /* snackbar-shadow */\n  box-shadow: 0 2px 8px rgba(70, 79, 87, 0.33);\n  border-radius: 4px;\n}\n\n.contactFlow-module__nurturing_bottom__-h0AF {\n  bottom: 68%;\n}\n\n.contactFlow-module_ccfModalHeader__zYpR3 {\n  background: var(--veryLightBloobirds) !important;\n}\n\n.contactFlow-module_ccfModalHeader__zYpR3 h2 {\n  font-size: 18px;\n}\n";
var styles$a = {"_modal_header":"contactFlow-module__modal_header__7U6oC","_modal_content":"contactFlow-module__modal_content__f2dKi","_modal_footer":"contactFlow-module__modal_footer__d1JW-","_sections_container":"contactFlow-module__sections_container__NqLS0","_informationPanel":"contactFlow-module__informationPanel__A--T6","_info_header":"contactFlow-module__info_header__sIl4i","_stage_callout__wrapper":"contactFlow-module__stage_callout__wrapper__M34k7","_stage_callout__icon":"contactFlow-module__stage_callout__icon__9i1hM","actions_wrapper":"contactFlow-module_actions_wrapper__mR2WN","_cadence_preview_wrapper":"contactFlow-module__cadence_preview_wrapper__V7-En","_nurturing_preview_wrapper":"contactFlow-module__nurturing_preview_wrapper__3jUY7","_section__wrapper":"contactFlow-module__section__wrapper__1y3wW","_list__wrapper":"contactFlow-module__list__wrapper__bCOlP","hidden":"contactFlow-module_hidden__WkIVk","_text_block":"contactFlow-module__text_block__VYg4j","_nurturing_text_block":"contactFlow-module__nurturing_text_block__95Z-d","_selects_wrapper":"contactFlow-module__selects_wrapper__udeLG","_note_text_area":"contactFlow-module__note_text_area__BwBMW","_reassign_selects_wrapper":"contactFlow-module__reassign_selects_wrapper__d7gGW","_add_task_module":"contactFlow-module__add_task_module__TSiG5","_add_task_title":"contactFlow-module__add_task_title__9sUbe","box":"contactFlow-module_box__-qUjf","_nurturing_bottom":"contactFlow-module__nurturing_bottom__-h0AF","ccfModalHeader":"contactFlow-module_ccfModalHeader__zYpR3"};
styleInject(css_248z$a);

//TODO refactor if time
var patchBobject = function patchBobject(bobjectId, data) {
  return api.patch("/bobjects/".concat(bobjectId, "/raw"), data);
};
var createNextStep = function createNextStep(_ref) {
  var accountId = _ref.accountId,
    body = _ref.body;
  return api.post("/bobjects/".concat(accountId, "/Task"), body);
};
var useContactFlowData = function useContactFlowData() {
  var _useUserHelpers = useUserHelpers(),
    save = _useUserHelpers.save;
  function handleSubmit(_ref2) {
    var activity = _ref2.activity,
      data = _ref2.data,
      companyChanges = _ref2.companyChanges,
      leadChanges = _ref2.leadChanges,
      nextStepData = _ref2.nextStepData;
    var _ref3 = companyChanges || {},
      companyIdValue = _ref3.companyIdValue,
      companyPhoneFields = _ref3.companyPhoneFields;
    var _ref4 = leadChanges || {},
      leadIdValue = _ref4.leadIdValue,
      leadPhoneFields = _ref4.leadPhoneFields;
    if (leadPhoneFields) {
      patchBobject(leadIdValue, leadPhoneFields).then(function () {
        window.dispatchEvent(new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
          detail: {
            type: BobjectTypes.Lead
          }
        }));
      });
    }
    if (companyPhoneFields) {
      patchBobject(companyIdValue, companyPhoneFields).then(function () {
        window.dispatchEvent(new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
          detail: {
            type: BobjectTypes.Company
          }
        }));
      });
    }
    if (activity !== null && activity !== void 0 && activity.id) {
      patchBobject(activity === null || activity === void 0 ? void 0 : activity.id.value, data).then(function () {
        // @ts-ignore
        save('CALL_AND_REPORT_RESULT');

        //mutate activity and launch side effects
        window.dispatchEvent(new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
          detail: {
            type: BobjectTypes.Activity
          }
        }));
      });
    }
    if (nextStepData) {
      return createNextStep(nextStepData).then(function (response) {
        window.dispatchEvent(new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
          detail: {
            type: BobjectTypes.Task
          }
        }));
        return response;
      });
    }
  }
  return {
    handleSubmit: handleSubmit,
    patchActivity: patchBobject
  };
};

var css_248z$9 = ".callResult-module__labels__wrapper__i53ny {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  max-height: 250px;\n  align-content: space-around;\n}\n\n.callResult-module__label__content__F1Ckz {\n  display: flex;\n  flex-direction: column;\n  width: 225px;\n  margin-bottom: 12px;\n}\n\n.callResult-module__label__content__F1Ckz > div {\n  font-size: 12px;\n  line-height: 14px;\n}\n\n.callResult-module__section__wrapper__Ifn5A {\n  margin-bottom: 16px;\n}\n\n.callResult-module__section__wrapper__Ifn5A:last-of-type {\n\n}\n\n.callResult-module__section_title_icon__--HpC {\n  margin-right: 8px;\n}\n\n.callResult-module__section_title_text__lUXVn {\n  padding-top: 2px;\n}\n\n.callResult-module__section_title__wrapper__-TMju {\n  display: flex;\n  margin-bottom: 24px;\n  box-sizing: border-box;\n}\n\n.callResult-module__section_pitch__wrapper__KxKfh {\n  display: flex;\n  margin-bottom: 24px;\n  box-sizing: border-box;\n}\n\n.callResult-module__chips__wrapper__pU-Bn {\n  height: 52px;\n  display: flex;\n  align-items: center;\n}\n\n.callResult-module__buttons__wrapper__C7-Zc {\n  justify-content: flex-end;\n  display: flex;\n  width: 100%;\n}\n\n.callResult-module__pitch__wrapper__HelCH {\n  margin-top: 8px;\n  display: flex;\n  align-items: center;\n}\n\n.callResult-module__pitch_select__wrapper__3jDR9 {\n  margin-left: 15px;\n  flex: 1;\n}\n\n.callResult-module__phone_input_container__XBoWF {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 12px;\n  align-items: center;\n}\n\n.callResult-module__phone_edit_header__Tqd-f {\n  margin-bottom: 24px;\n}\n\n.callResult-module__phone_field_wrapper__hpqC5 {\n  align-content: center;\n  margin-left: 16px;\n  margin-bottom: 16px;\n  flex: 1;\n}\n\n.callResult-module__no_answer_close_text__17BGy {\n  margin-left: 8px;\n  align-self: center;\n}\n\n.callResult-module_skip_button__ySCQE {\n  margin-left: auto;\n  margin-right: 16px;\n}\n\n.callResult-module_back_button__mi3nc {\n  margin-left: 0px;\n  margin-right: auto;\n}\n";
var styles$9 = {"_labels__wrapper":"callResult-module__labels__wrapper__i53ny","_label__content":"callResult-module__label__content__F1Ckz","_section__wrapper":"callResult-module__section__wrapper__Ifn5A","_section_title_icon":"callResult-module__section_title_icon__--HpC","_section_title_text":"callResult-module__section_title_text__lUXVn","_section_title__wrapper":"callResult-module__section_title__wrapper__-TMju","_section_pitch__wrapper":"callResult-module__section_pitch__wrapper__KxKfh","_chips__wrapper":"callResult-module__chips__wrapper__pU-Bn","_buttons__wrapper":"callResult-module__buttons__wrapper__C7-Zc","_pitch__wrapper":"callResult-module__pitch__wrapper__HelCH","_pitch_select__wrapper":"callResult-module__pitch_select__wrapper__3jDR9","_phone_input_container":"callResult-module__phone_input_container__XBoWF","_phone_edit_header":"callResult-module__phone_edit_header__Tqd-f","_phone_field_wrapper":"callResult-module__phone_field_wrapper__hpqC5","_no_answer_close_text":"callResult-module__no_answer_close_text__17BGy","skip_button":"callResult-module_skip_button__ySCQE","back_button":"callResult-module_back_button__mi3nc"};
styleInject(css_248z$9);

var css_248z$8 = ".callInfo-module__call_info__MlFks {\n  display: flex;\n  margin-bottom: 16px;\n}\n\n.callInfo-module__icon__wrapper__nWa9r {\n  background-color: var(--verySoftMelon);\n  border-radius: 24px;\n  position: relative;\n  display: block;\n  flex-shrink: 0;\n  height: 36px;\n  width: 36px;\n  margin: auto 0;\n  margin-right: 8px;\n}\n\n.callInfo-module__icon__wrapper__nWa9r > svg {\n  margin-left: 4px;\n  margin-top: 5px;\n}\n\n.callInfo-module__icon_direction__qguE8 {\n  position: absolute;\n  top: 5px;\n  right: 6px;\n}\n\n.callInfo-module__card__body__T-NmA {\n  flex-shrink: 0;\n  margin: 0 12px;\n  display: flex;\n  flex-direction: column;\n  white-space: pre-line;\n}\n\n.callInfo-module__card__body__T-NmA > p {\n  margin-bottom: 4px;\n}\n\n.callInfo-module__card__info__1waWf {\n  display: flex;\n  width: 220px;\n  flex-direction: column;\n  align-items: flex-end;\n  margin-left: auto;\n}\n\n.callInfo-module__record_button__SkTT- > button {\n  display: flex;\n}\n\n.callInfo-module__loading_wrapper__z-j05 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 30px 0;\n}\n";
var styles$8 = {"_call_info":"callInfo-module__call_info__MlFks","_icon__wrapper":"callInfo-module__icon__wrapper__nWa9r","_icon_direction":"callInfo-module__icon_direction__qguE8","_card__body":"callInfo-module__card__body__T-NmA","_card__info":"callInfo-module__card__info__1waWf","_record_button":"callInfo-module__record_button__SkTT-","_loading_wrapper":"callInfo-module__loading_wrapper__z-j05"};
styleInject(css_248z$8);

var CallInfo = function CallInfo() {
  var _useContactFlow = useContactFlow(),
    activity = _useContactFlow.activity;
  var activityData = getActivityData(activity);
  var iconDirection = ACTIVITY_DIRECTION.INCOMING !== (activityData === null || activityData === void 0 ? void 0 : activityData.direction) ? 'arrowDownLeft' : 'arrowTopRight';
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'contactFlowModal.callResult'
    }),
    t = _useTranslation.t;
  return activityData !== null && activityData !== void 0 && activityData.date ? /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsxs("div", {
      className: styles$8._call_info,
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$8._icon__wrapper,
        children: [/*#__PURE__*/jsx(Icon, {
          name: "phone",
          color: "melon",
          size: 28
        }), (activityData === null || activityData === void 0 ? void 0 : activityData.direction) && /*#__PURE__*/jsx("div", {
          className: styles$8._icon_direction,
          children: /*#__PURE__*/jsx(Icon, {
            name: iconDirection,
            color: "melon",
            size: 12
          })
        })]
      }), /*#__PURE__*/jsx("div", {
        className: styles$8._card__body,
        children: /*#__PURE__*/jsx(Text, {
          color: "darkGray",
          size: "m",
          ellipsis: 75,
          children: /*#__PURE__*/jsx(Trans, {
            i18nKey: "contactFlowModal.callResult.callInfo.title",
            values: {
              direction: t(activityData === null || activityData === void 0 ? void 0 : activityData.direction),
              phone: activityData === null || activityData === void 0 ? void 0 : activityData.phone,
              date:
              // @ts-ignore
              (!isToday(activityData === null || activityData === void 0 ? void 0 : activityData.date) ? formatDateAsText({
                text: activityData === null || activityData === void 0 ? void 0 : activityData.date,
                patternFormat: '{month-short} {date-ordinal}',
                t: t
              }) : '') + formatDateAsText({
                text: activityData === null || activityData === void 0 ? void 0 : activityData.date,
                patternFormat: 'time-24',
                t: t
              }),
              leadName: activityData !== null && activityData !== void 0 && activityData.leadName ? "with ".concat(activityData === null || activityData === void 0 ? void 0 : activityData.leadName, " ") : "",
              companyName: activityData !== null && activityData !== void 0 && activityData.companyName ? "from ".concat(activityData === null || activityData === void 0 ? void 0 : activityData.companyName) : ""
            },
            components: [/*#__PURE__*/jsx(Text, {
              color: "softPeanut",
              size: "s",
              ellipsis: 75,
              children: ""
            }, "0")]
          })
        })
      }), (activityData === null || activityData === void 0 ? void 0 : activityData.record) && /*#__PURE__*/jsx("div", {
        className: styles$8._record_button,
        children: /*#__PURE__*/jsx(IconButton, {
          name: "voicemail",
          size: 16,
          onClick: function onClick(e) {
            e.preventDefault();
            e.stopPropagation();
            /*getSignedCallRecordingUrl()
              .then(url => {
                window.open(url, '_blank');
              })
              .catch(() => {
                createToast({
                  message: 'Failed to get the recording, it may have been deleted',
                  type: 'error',
                });
              });*/
          }
        })
      }), /*#__PURE__*/jsx("div", {
        className: styles$8._card__info,
        children: (activityData === null || activityData === void 0 ? void 0 : activityData.duration) && /*#__PURE__*/jsx(Text, {
          size: "s",
          weight: "medium",
          children: activityData === null || activityData === void 0 ? void 0 : activityData.duration
        })
      })]
    })
  }) : /*#__PURE__*/jsx("div", {
    className: styles$8._loading_wrapper,
    children: /*#__PURE__*/jsx(Spinner, {
      name: "loadingCircle"
    })
  });
};

function _typeof$7(obj) { "@babel/helpers - typeof"; return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$7(obj); }
function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) { _defineProperty$7(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$7(obj, key, value) { key = _toPropertyKey$7(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$7(arg) { var key = _toPrimitive$7(arg, "string"); return _typeof$7(key) === "symbol" ? key : String(key); }
function _toPrimitive$7(input, hint) { if (_typeof$7(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$7(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var CallResultColumn = function CallResultColumn(result) {
  var _getFieldByLogicRole, _getFieldByLogicRole2, _callResultStepData$c, _callResultStepData$c2;
  var _useContactFlow = useContactFlow(),
    activity = _useContactFlow.activity,
    callResultStepData = _useContactFlow.callResultStepData,
    setCallResultStepData = _useContactFlow.setCallResultStepData;
  var hasLogicRole = !!(result !== null && result !== void 0 && result.logicRole);
  var pitchInfo = (_getFieldByLogicRole = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.PITCH)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.value;
  var pitchDone = ((_getFieldByLogicRole2 = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.PITCH_DONE)) === null || _getFieldByLogicRole2 === void 0 ? void 0 : _getFieldByLogicRole2.valueLogicRole) || PITCH_DONE_VALUES_LOGIC_ROLE.NO;
  return /*#__PURE__*/jsx("div", {
    className: styles$9._label__content,
    children: /*#__PURE__*/jsx(Label, {
      value: result.logicRole,
      dataTest: result.logicRole,
      uppercase: false,
      inline: false,
      align: "center",
      onClick: function onClick() {
        setCallResultStepData(_objectSpread$7(_objectSpread$7({}, callResultStepData), {}, {
          callResult: {
            fieldId: result.id,
            value: result.value,
            logicRole: result.logicRole || result.id,
            isCorrectContact: result.isCorrectContact
          },
          pitch: {
            done: pitchDone,
            // @ts-ignore
            template: pitchInfo
          }
        }));
      },
      selected: hasLogicRole ? result.logicRole === (callResultStepData === null || callResultStepData === void 0 ? void 0 : (_callResultStepData$c = callResultStepData.callResult) === null || _callResultStepData$c === void 0 ? void 0 : _callResultStepData$c.logicRole) : result.id === (callResultStepData === null || callResultStepData === void 0 ? void 0 : (_callResultStepData$c2 = callResultStepData.callResult) === null || _callResultStepData$c2 === void 0 ? void 0 : _callResultStepData$c2.logicRole),
      children: result.name
    })
  }, "call-result-".concat(result.id));
};
var CallResultSelector = function CallResultSelector() {
  var _useContactFlow2 = useContactFlow(),
    callResultsPicklistValues = _useContactFlow2.callResultsPicklistValues;
  var firstColumnSize = calculateFirstColumnSize(callResultsPicklistValues);
  return /*#__PURE__*/jsx("div", {
    className: styles$9._labels__wrapper,
    style: {
      maxHeight: firstColumnSize > 6 ? 315 : 250
    },
    children: callResultsPicklistValues !== null && callResultsPicklistValues !== void 0 && callResultsPicklistValues.length ? /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsx("div", {
        children: callResultsPicklistValues.slice(0, firstColumnSize).map(CallResultColumn)
      }), /*#__PURE__*/jsx("div", {
        children: callResultsPicklistValues.slice(firstColumnSize, callResultsPicklistValues.length + 1).map(CallResultColumn)
      })]
    }) : /*#__PURE__*/jsx(Spinner, {
      name: "loadingCircle"
    })
  });
};

function _typeof$6(obj) { "@babel/helpers - typeof"; return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$6(obj); }
function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty$6(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$6(obj, key, value) { key = _toPropertyKey$6(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$6(arg) { var key = _toPrimitive$6(arg, "string"); return _typeof$6(key) === "symbol" ? key : String(key); }
function _toPrimitive$6(input, hint) { if (_typeof$6(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$6(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$7(arr) || _nonIterableSpread$1(); }
function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$7(arr); }
function _slicedToArray$7(arr, i) { return _arrayWithHoles$7(arr) || _iterableToArrayLimit$7(arr, i) || _unsupportedIterableToArray$7(arr, i) || _nonIterableRest$7(); }
function _nonIterableRest$7() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$7(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$7(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen); }
function _arrayLikeToArray$7(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$7(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$7(arr) { if (Array.isArray(arr)) return arr; }
var CallResult = function CallResult(_ref) {
  var _userSettings$user, _getFieldByLogicRole, _callResultStepData$p, _callResultStepData$p2, _callResultStepData$c, _callResultStepData$c2, _callResultStepData$p3, _callResultStepData$p4, _callResultStepData$c3, _callResultStepData$c4, _callResultStepData$c5;
  var handleNext = _ref.handleNext,
    handleBack = _ref.handleBack,
    handleSkip = _ref.handleSkip;
  var _useContactFlow = useContactFlow(),
    activity = _useContactFlow.activity,
    dataModel = _useContactFlow.dataModel,
    activityCompany = _useContactFlow.activityCompany,
    activityLead = _useContactFlow.activityLead,
    companyAvailablePhoneFields = _useContactFlow.companyAvailablePhoneFields,
    leadAvailablePhoneFields = _useContactFlow.leadAvailablePhoneFields,
    callResultStepData = _useContactFlow.callResultStepData,
    setCallResultStepData = _useContactFlow.setCallResultStepData,
    availablePitches = _useContactFlow.availablePitches,
    pitchDonePicklistValues = _useContactFlow.pitchDonePicklistValues,
    buttonStepConfig = _useContactFlow.buttonStepConfig;
  var _useCallResult = useCallResult(dataModel),
    isPitchNo = _useCallResult.isPitchNo;
  var _useContactFlowData = useContactFlowData(),
    handleSubmit = _useContactFlowData.handleSubmit;
  var activeUserId = useActiveUserId();
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'contactFlowModal.callResult'
    }),
    t = _useTranslation.t;
  var _useActiveUserSetting = useActiveUserSettings(),
    userSettings = _useActiveUserSetting.settings,
    reloadUserSettings = _useActiveUserSetting.mutate;
  var _useState = useState(userSettings === null || userSettings === void 0 ? void 0 : (_userSettings$user = userSettings.user) === null || _userSettings$user === void 0 ? void 0 : _userSettings$user.ccfCloseAtNoAnswer),
    _useState2 = _slicedToArray$7(_useState, 2),
    ccfCloseAtNoAnswerValue = _useState2[0],
    setCcfCloseAtNoAnswerValue = _useState2[1];
  var originalLeadPhoneFields = getFieldsByType(activityLead, 'PHONE').reduce(function (acc, phone) {
    return [].concat(_toConsumableArray$1(acc), [{
      label: phone.label,
      id: phone.name,
      logicRole: phone.logicRole,
      text: phone.text
    }]);
  }, []);
  var originalCompanyPhoneFields = getFieldsByType(activityCompany, 'PHONE').reduce(function (acc, phone) {
    return [].concat(_toConsumableArray$1(acc), [{
      label: phone.label,
      id: phone.name,
      logicRole: phone.logicRole,
      text: phone.text
    }]);
  }, []);
  var isPitchRequired = (_getFieldByLogicRole = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.PITCH)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.required;
  var isPitchDone = (callResultStepData === null || callResultStepData === void 0 ? void 0 : (_callResultStepData$p = callResultStepData.pitch) === null || _callResultStepData$p === void 0 ? void 0 : _callResultStepData$p.done) === PITCH_DONE_VALUES_LOGIC_ROLE.YES;
  var isMissingPitch = isPitchDone && isPitchRequired && !(callResultStepData !== null && callResultStepData !== void 0 && (_callResultStepData$p2 = callResultStepData.pitch) !== null && _callResultStepData$p2 !== void 0 && _callResultStepData$p2.template);
  var _useState3 = useState([]),
    _useState4 = _slicedToArray$7(_useState3, 2),
    leadPhoneFields = _useState4[0],
    setLeadPhoneFields = _useState4[1];
  var _useState5 = useState([]),
    _useState6 = _slicedToArray$7(_useState5, 2),
    companyPhoneFields = _useState6[0],
    setCompanyPhoneFields = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray$7(_useState7, 2),
    leadHasChanges = _useState8[0],
    setLeadHasChanges = _useState8[1];
  var _useState9 = useState(false),
    _useState10 = _slicedToArray$7(_useState9, 2),
    companyHasChanges = _useState10[0],
    setCompanyHasChanges = _useState10[1];
  var isNoAnswer = (callResultStepData === null || callResultStepData === void 0 ? void 0 : (_callResultStepData$c = callResultStepData.callResult) === null || _callResultStepData$c === void 0 ? void 0 : _callResultStepData$c.logicRole) === CALL_RESULTS_LOGIC_ROLE.NO_ANSWER;
  // const [notificationId] = useSharedState('notificationId');
  // const removeNotification = useNotificationDelete();

  var showSkipButton = (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.showSkipButton) != undefined ? buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.showSkipButton : false;
  var hasPreviousStep = (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.hasPreviousStep) != undefined ? buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.hasPreviousStep : false;
  var openCadenceControlOnClose = (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.openCadenceOnSkip) != undefined ? buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.openCadenceOnSkip : false;
  var leadFullName = getValueFromLogicRole(activityLead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) || getValueFromLogicRole(activityLead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
  var companyName = getValueFromLogicRole(activityCompany, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  var saveAndNext = function saveAndNext() {
    var _activityLead$id, _activityCompany$id, _userSettings$user2;
    var data = _defineProperty$6(_defineProperty$6(_defineProperty$6(_defineProperty$6({}, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT, callResultStepData === null || callResultStepData === void 0 ? void 0 : callResultStepData.callResult.logicRole), ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED, REPORTED_VALUES_LOGIC_ROLE.YES), ACTIVITY_FIELDS_LOGIC_ROLE.PITCH, callResultStepData === null || callResultStepData === void 0 ? void 0 : callResultStepData.pitch.template), ACTIVITY_FIELDS_LOGIC_ROLE.PITCH_DONE, callResultStepData === null || callResultStepData === void 0 ? void 0 : callResultStepData.pitch.done);
    handleSubmit({
      activity: activity,
      data: data,
      leadChanges: leadHasChanges ? {
        leadIdValue: activityLead === null || activityLead === void 0 ? void 0 : (_activityLead$id = activityLead.id) === null || _activityLead$id === void 0 ? void 0 : _activityLead$id.value,
        leadPhoneFields: leadPhoneFields
      } : {},
      companyChanges: companyHasChanges ? {
        companyIdValue: activityCompany === null || activityCompany === void 0 ? void 0 : (_activityCompany$id = activityCompany.id) === null || _activityCompany$id === void 0 ? void 0 : _activityCompany$id.value,
        companyPhoneFields: companyPhoneFields
      } : {}
    });
    /*    if (notificationId) {
      removeNotification(notificationId);
    }*/

    if (isNoAnswer && (userSettings === null || userSettings === void 0 ? void 0 : (_userSettings$user2 = userSettings.user) === null || _userSettings$user2 === void 0 ? void 0 : _userSettings$user2.ccfCloseAtNoAnswer) !== ccfCloseAtNoAnswerValue) api.patch("/entities/users/".concat(activeUserId), {
      ccfCloseAtNoAnswer: ccfCloseAtNoAnswerValue
    }).then(function () {
      reloadUserSettings();
    });
    handleNext(callResultStepData === null || callResultStepData === void 0 ? void 0 : callResultStepData.callResult.logicRole, isNoAnswer && ccfCloseAtNoAnswerValue);
  };

  //TODO refactor this
  useEffect(function () {
    if ((companyPhoneFields === null || companyPhoneFields === void 0 ? void 0 : companyPhoneFields.length) === 0 && originalCompanyPhoneFields.length > 0) {
      var companyPhoneToSet = originalCompanyPhoneFields.reduce(function (obj, item) {
        return Object.assign(obj, _defineProperty$6({}, item.id, item.text));
      }, {});
      setCompanyPhoneFields(companyPhoneToSet);
    }
  }, [originalCompanyPhoneFields]);
  useEffect(function () {
    if ((leadPhoneFields === null || leadPhoneFields === void 0 ? void 0 : leadPhoneFields.length) === 0 && originalLeadPhoneFields.length > 0) {
      var leadPhoneToSet = originalLeadPhoneFields.reduce(function (obj, item) {
        return Object.assign(obj, _defineProperty$6({}, item.id, item.text));
      }, {});
      setLeadPhoneFields(leadPhoneToSet);
    }
  }, [originalLeadPhoneFields]);
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsxs(ModalContent, {
      children: [/*#__PURE__*/jsx(CallInfo, {}), /*#__PURE__*/jsxs("div", {
        className: styles$9._section__wrapper,
        children: [/*#__PURE__*/jsx("div", {
          className: styles$9._section_title__wrapper,
          children: /*#__PURE__*/jsx(Text, {
            dataTest: "Text-Modal-CallResult",
            size: "m",
            weight: "medium",
            color: "peanut",
            children: t('title')
          })
        }), /*#__PURE__*/jsx(CallResultSelector, {})]
      }), (callResultStepData === null || callResultStepData === void 0 ? void 0 : (_callResultStepData$c2 = callResultStepData.callResult) === null || _callResultStepData$c2 === void 0 ? void 0 : _callResultStepData$c2.isCorrectContact) && /*#__PURE__*/jsxs("div", {
        className: styles$9._section__wrapper,
        children: [/*#__PURE__*/jsx("div", {
          className: styles$9.section_pitch__wrapper,
          children: /*#__PURE__*/jsx(Text, {
            size: "s",
            weight: "medium",
            color: "peanut",
            children: t('pitchUsed.Title')
          })
        }), /*#__PURE__*/jsxs("div", {
          className: styles$9._pitch__wrapper,
          children: [/*#__PURE__*/jsx("div", {
            className: styles$9._chips__wrapper,
            children: /*#__PURE__*/jsx(ChipGroup, {
              value: callResultStepData === null || callResultStepData === void 0 ? void 0 : (_callResultStepData$p3 = callResultStepData.pitch) === null || _callResultStepData$p3 === void 0 ? void 0 : _callResultStepData$p3.done,
              onChange: function onChange(value) {
                setCallResultStepData(_objectSpread$6(_objectSpread$6({}, callResultStepData), {}, {
                  pitch: isPitchNo(value) ? {
                    template: null,
                    done: value
                  } : _objectSpread$6(_objectSpread$6({}, callResultStepData === null || callResultStepData === void 0 ? void 0 : callResultStepData.pitch), {}, {
                    done: value
                  })
                }));
              },
              children: pitchDonePicklistValues === null || pitchDonePicklistValues === void 0 ? void 0 : pitchDonePicklistValues.map(function (pitchDone) {
                return /*#__PURE__*/jsx(Chip, {
                  size: "small",
                  value: pitchDone === null || pitchDone === void 0 ? void 0 : pitchDone.logicRole,
                  children: pitchDone === null || pitchDone === void 0 ? void 0 : pitchDone.name
                }, "pitch-done-".concat(pitchDone === null || pitchDone === void 0 ? void 0 : pitchDone.id));
              })
            })
          }), isPitchDone && /*#__PURE__*/jsx("div", {
            className: styles$9._pitch_select__wrapper,
            children: /*#__PURE__*/jsx(Select, {
              value: callResultStepData === null || callResultStepData === void 0 ? void 0 : (_callResultStepData$p4 = callResultStepData.pitch) === null || _callResultStepData$p4 === void 0 ? void 0 : _callResultStepData$p4.template,
              placeholder: t('pitchUsed.placeholder') + (isPitchRequired ? '*' : ''),
              size: "small",
              width: "300px",
              borderless: false,
              onChange: function onChange(value) {
                return setCallResultStepData(_objectSpread$6(_objectSpread$6({}, callResultStepData), {}, {
                  pitch: _objectSpread$6(_objectSpread$6({}, callResultStepData === null || callResultStepData === void 0 ? void 0 : callResultStepData.pitch), {}, {
                    template: value
                  })
                }));
              },
              children: availablePitches === null || availablePitches === void 0 ? void 0 : availablePitches.map(function (pitchItem) {
                return /*#__PURE__*/jsx(Item, {
                  value: pitchItem.id,
                  children: pitchItem.name
                }, pitchItem.id);
              })
            })
          })]
        })]
      }), isNoAnswer && /*#__PURE__*/jsxs("div", {
        style: {
          display: 'flex',
          alignContent: 'center'
        },
        children: [/*#__PURE__*/jsx(Checkbox, {
          size: "small",
          checked: ccfCloseAtNoAnswerValue,
          onClick: function onClick(value) {
            setCcfCloseAtNoAnswerValue(value);
          },
          expand: false,
          children: t('noAnswer.endCall')
        }), /*#__PURE__*/jsx(Text, {
          size: "xs",
          className: styles$9._no_answer_close_text,
          children: t('noAnswer.hint')
        })]
      }), (callResultStepData === null || callResultStepData === void 0 ? void 0 : (_callResultStepData$c3 = callResultStepData.callResult) === null || _callResultStepData$c3 === void 0 ? void 0 : _callResultStepData$c3.logicRole) === CALL_RESULTS_LOGIC_ROLE.WRONG_DATA && /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx(Text, {
          className: styles$9._phone_edit_header,
          dataTest: "Text-Modal-CallResult",
          size: "m",
          weight: "medium",
          color: "peanut",
          children: t('updateNumbers.title')
        }), (leadAvailablePhoneFields === null || leadAvailablePhoneFields === void 0 ? void 0 : leadAvailablePhoneFields.length) > 0 && /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsxs("div", {
            className: styles$9._section_title__wrapper,
            children: [/*#__PURE__*/jsx(Icon, {
              className: styles$9._section_title_icon,
              color: "verySoftPeanut",
              name: "person"
            }), /*#__PURE__*/jsx(Text, {
              className: styles$9._section_title_text,
              dataTest: "Text-Modal-CallResult",
              size: "m",
              weight: "medium",
              color: "softPeanut",
              children: t('updateNumbers.information', {
                bobjectName: leadFullName || ''
              })
            })]
          }), /*#__PURE__*/jsx("div", {
            className: styles$9._phone_input_container,
            children: leadAvailablePhoneFields === null || leadAvailablePhoneFields === void 0 ? void 0 : leadAvailablePhoneFields.map(function (phone, index) {
              return /*#__PURE__*/jsx("div", {
                className: styles$9._phone_field_wrapper,
                children: /*#__PURE__*/jsx(Input, {
                  value: leadPhoneFields[phone === null || phone === void 0 ? void 0 : phone.name],
                  placeholder: phone === null || phone === void 0 ? void 0 : phone.label,
                  width: "365px",
                  onChange: function onChange(value) {
                    setLeadHasChanges(true);
                    setLeadPhoneFields(_objectSpread$6(_objectSpread$6({}, leadPhoneFields), {}, _defineProperty$6({}, phone === null || phone === void 0 ? void 0 : phone.name, value)));
                  }
                }, phone === null || phone === void 0 ? void 0 : phone.id)
              }, "lead-phone-".concat(index));
            })
          })]
        }), (companyAvailablePhoneFields === null || companyAvailablePhoneFields === void 0 ? void 0 : companyAvailablePhoneFields.length) > 0 && /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsxs("div", {
            className: styles$9._section_title__wrapper,
            children: [/*#__PURE__*/jsx(Icon, {
              className: styles$9._section_title_icon,
              color: "verySoftPeanut",
              name: "company"
            }), /*#__PURE__*/jsx(Text, {
              className: styles$9._section_title_text,
              dataTest: "Text-Modal-CallResult",
              size: "m",
              weight: "medium",
              color: "softPeanut",
              children: t('updateNumbers.information', {
                bobjectName: companyName || ''
              })
            })]
          }), /*#__PURE__*/jsx("div", {
            className: styles$9._phone_input_container,
            children: companyAvailablePhoneFields === null || companyAvailablePhoneFields === void 0 ? void 0 : companyAvailablePhoneFields.map(function (phone, index) {
              return /*#__PURE__*/jsx("div", {
                className: styles$9._phone_field_wrapper,
                children: /*#__PURE__*/jsx(Input, {
                  value: companyPhoneFields[phone === null || phone === void 0 ? void 0 : phone.name],
                  placeholder: phone === null || phone === void 0 ? void 0 : phone.label,
                  width: "365px",
                  onChange: function onChange(value) {
                    setCompanyHasChanges(true);
                    setCompanyPhoneFields(_objectSpread$6(_objectSpread$6({}, companyPhoneFields), {}, _defineProperty$6({}, phone === null || phone === void 0 ? void 0 : phone.name, value)));
                  }
                }, phone === null || phone === void 0 ? void 0 : phone.id)
              }, "company-phone-".concat(index));
            })
          })]
        })]
      })]
    }), /*#__PURE__*/jsx(ModalFooter, {
      children: /*#__PURE__*/jsxs("div", {
        className: styles$9._buttons__wrapper,
        children: [hasPreviousStep && /*#__PURE__*/jsx(Button, {
          variant: "clear",
          onClick: handleBack,
          className: styles$9.back_button,
          children: (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.previousButtonTitle) || t('back')
        }), showSkipButton && /*#__PURE__*/jsx(Button, {
          variant: "secondary",
          onClick: function onClick() {
            return handleSkip(openCadenceControlOnClose);
          },
          className: styles$9.skip_button,
          children: t('skip')
        }), /*#__PURE__*/jsx(Button, {
          onClick: saveAndNext,
          disabled: !(callResultStepData !== null && callResultStepData !== void 0 && (_callResultStepData$c4 = callResultStepData.callResult) !== null && _callResultStepData$c4 !== void 0 && _callResultStepData$c4.logicRole) && !(callResultStepData !== null && callResultStepData !== void 0 && (_callResultStepData$c5 = callResultStepData.callResult) !== null && _callResultStepData$c5 !== void 0 && _callResultStepData$c5.value) || isMissingPitch,
          className: styles$9.next_button,
          children: isNoAnswer && ccfCloseAtNoAnswerValue ? (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.nextButtonTitle) || t('save') : (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.nextButtonAlternativeTitle) || t('saveAndContinue')
        })]
      })
    })]
  });
};

var css_248z$7 = ".callResultOpp-module__labels__wrapper__vaM2O {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  max-height: 250px;\n  align-content: space-around;\n}\n\n.callResultOpp-module__label__content__Bdqaa {\n  display: flex;\n  flex-direction: column;\n  width: 225px;\n  margin-bottom: 12px;\n}\n\n.callResultOpp-module__section__wrapper__ufkIu {\n  margin-bottom: 24px;\n}\n\n.callResultOpp-module__section_title__wrapper__UHm8r {\n  margin-bottom: 16px;\n}\n\n.callResultOpp-module__chips__wrapper__6POvl {\n  height: 52px;\n  display: flex;\n  align-items: center;\n}\n\n.callResultOpp-module__chips__wrapper__6POvl > div > div {\n  margin-right: 15px;\n}\n\n.callResultOpp-module__buttons__wrapper__OL4TN {\n  justify-content: flex-end;\n  display: flex;\n  width: 100%;\n}\n\n.callResultOpp-module__pitch__wrapper__1-W9d {\n  display: flex;\n  align-items: center;\n}\n\n.callResultOpp-module__pitch_select__wrapper__N1a2e {\n  margin-left: 15px;\n  flex: 1;\n}\n\n.callResultOpp-module__note__vhwcA {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  border-radius: 4px;\n  border: 1px solid var(--softPeanut);\n  height: 100%;\n  max-height: 100%;\n}\n\n.callResultOpp-module_skip_button__-3J4o {\n  margin-left: auto;\n  margin-right: 16px;\n}\n\n.callResultOpp-module_back_button__gvbSq {\n  margin-left: 0px;\n  margin-right: auto;\n}\n";
var styles$7 = {"_labels__wrapper":"callResultOpp-module__labels__wrapper__vaM2O","_label__content":"callResultOpp-module__label__content__Bdqaa","_section__wrapper":"callResultOpp-module__section__wrapper__ufkIu","_section_title__wrapper":"callResultOpp-module__section_title__wrapper__UHm8r","_chips__wrapper":"callResultOpp-module__chips__wrapper__6POvl","_buttons__wrapper":"callResultOpp-module__buttons__wrapper__OL4TN","_pitch__wrapper":"callResultOpp-module__pitch__wrapper__1-W9d","_pitch_select__wrapper":"callResultOpp-module__pitch_select__wrapper__N1a2e","_note":"callResultOpp-module__note__vhwcA","skip_button":"callResultOpp-module_skip_button__-3J4o","back_button":"callResultOpp-module_back_button__gvbSq"};
styleInject(css_248z$7);

function _typeof$5(obj) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$5(obj); }
function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty$5(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$5(obj, key, value) { key = _toPropertyKey$5(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$5(arg) { var key = _toPrimitive$5(arg, "string"); return _typeof$5(key) === "symbol" ? key : String(key); }
function _toPrimitive$5(input, hint) { if (_typeof$5(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$5(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$6(arr, i) { return _arrayWithHoles$6(arr) || _iterableToArrayLimit$6(arr, i) || _unsupportedIterableToArray$6(arr, i) || _nonIterableRest$6(); }
function _nonIterableRest$6() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$6(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$6(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen); }
function _arrayLikeToArray$6(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$6(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$6(arr) { if (Array.isArray(arr)) return arr; }
var isCorrectContact = function isCorrectContact(logicRole) {
  return logicRole === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT;
};
function NoteRichTextEditor$1(_ref) {
  var note = _ref.note,
    onChange = _ref.onChange;
  var plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true
  });
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'contactFlowModal.callResultOpp'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsx("div", {
    className: styles$7._note,
    children: /*#__PURE__*/jsx(RichTextEditor, {
      defaultValue: note,
      plugins: plugins,
      placeholder: t('notePlaceholder'),
      onChange: onChange,
      style: {
        padding: '12px 28px 4px 28px'
      },
      children: function children(editor) {
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx("div", {
            className: styles$7.editorContent,
            children: editor
          }), /*#__PURE__*/jsx("div", {
            className: styles$7.toolbar,
            children: /*#__PURE__*/jsxs(EditorToolbar, {
              backgroundColor: "white",
              children: [/*#__PURE__*/jsx(EditorToolbarControlsSection, {
                color: "peanut"
              }), /*#__PURE__*/jsx(EditorToolbarFontStylesSection, {
                color: "peanut"
              }), /*#__PURE__*/jsx(EditorToolbarTextMarksSection, {
                color: "peanut"
              }), /*#__PURE__*/jsx(EditorToolbarListsSection, {
                color: "peanut"
              })]
            })
          })]
        });
      }
    })
  });
}
var CallResultOpportunity = function CallResultOpportunity(_ref2) {
  var _callResultStepData$c3, _callResultStepData$c4;
  var handleNext = _ref2.handleNext,
    handleBack = _ref2.handleBack,
    handleSkip = _ref2.handleSkip;
  var _useState = useState([]),
    _useState2 = _slicedToArray$6(_useState, 2),
    callResults = _useState2[0],
    setCallResults = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$6(_useState3, 2),
    isAST = _useState4[0],
    setIsAST = _useState4[1];
  var _useContactFlow = useContactFlow(),
    activity = _useContactFlow.activity,
    callResultStepData = _useContactFlow.callResultStepData,
    setCallResultStepData = _useContactFlow.setCallResultStepData,
    noteStepData = _useContactFlow.noteStepData,
    setNoteStepData = _useContactFlow.setNoteStepData,
    callResultsPicklistValues = _useContactFlow.callResultsPicklistValues,
    buttonStepConfig = _useContactFlow.buttonStepConfig;
  var _useContactFlowData = useContactFlowData(),
    handleSubmit = _useContactFlowData.handleSubmit;
  //const [notificationId] = useSharedState('notificationId');
  var correctContact = callResultsPicklistValues.find(function (result) {
    return result.logicRole === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT;
  });
  var showSkipButton = (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.showSkipButton) != undefined ? buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.showSkipButton : false;
  var hasPreviousStep = (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.hasPreviousStep) != undefined ? buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.hasPreviousStep : false;
  var openCadenceControlOnClose = (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.openCadenceOnSkip) != undefined ? buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.openCadenceOnSkip : false;

  // That's awful, I know. But we should do it for cases that they change the no answer
  var noAnswer = callResultsPicklistValues.find(function (result) {
    return result.logicRole === CALL_RESULTS_LOGIC_ROLE.NO_ANSWER || (result === null || result === void 0 ? void 0 : result.name) === 'No Answer';
  });
  //const removeNotification = useNotificationDelete();

  var plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true
  });
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'contactFlowModal.callResultOpp'
    }),
    t = _useTranslation2.t;
  useEffect(function () {
    if (activity && !noteStepData) {
      var noteField = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
      if (isHtml(noteField === null || noteField === void 0 ? void 0 : noteField.value)) {
        setNoteStepData({
          value: deserialize(noteField === null || noteField === void 0 ? void 0 : noteField.value, {
            format: 'HTML',
            plugins: plugins
          }),
          fieldId: noteField === null || noteField === void 0 ? void 0 : noteField.name
        });
        setIsAST(true);
      } else {
        setNoteStepData({
          value: noteField.text,
          fieldId: noteField.name
        });
      }
    }
  }, [activity]);
  useEffect(function () {
    if (callResultsPicklistValues.length > 0 && callResults.length === 0) {
      setCallResults(callResultsPicklistValues);
    }
  }, [callResultsPicklistValues]);
  var saveAndNext = function saveAndNext() {
    var _callResultStepData$c;
    var data = _defineProperty$5(_defineProperty$5(_defineProperty$5({}, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT, callResultStepData === null || callResultStepData === void 0 ? void 0 : callResultStepData.callResult.logicRole), ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED, REPORTED_VALUES_LOGIC_ROLE.YES), ACTIVITY_FIELDS_LOGIC_ROLE.NOTE, isAST ? serialize(noteStepData === null || noteStepData === void 0 ? void 0 : noteStepData.value, {
      format: 'AST',
      plugins: plugins
    }) : noteStepData === null || noteStepData === void 0 ? void 0 : noteStepData.value);
    handleSubmit({
      activity: activity,
      data: data
    });
    /*    if (notificationId) {
      removeNotification(notificationId);
    }*/
    handleNext(isCorrectContact(callResultStepData === null || callResultStepData === void 0 ? void 0 : (_callResultStepData$c = callResultStepData.callResult) === null || _callResultStepData$c === void 0 ? void 0 : _callResultStepData$c.logicRole));
  };
  useEffect(function () {
    mixpanel.track('ENTERED_IN_CC_OPPORTUNITY_STEP1');
  }, []);
  useEffect(function () {
    var _callResultStepData$c2;
    if (!(callResultStepData !== null && callResultStepData !== void 0 && (_callResultStepData$c2 = callResultStepData.callResult) !== null && _callResultStepData$c2 !== void 0 && _callResultStepData$c2.logicRole)) {
      setCallResultStepData(_objectSpread$5(_objectSpread$5({}, callResultStepData), {}, {
        /*@ts-ignore*/
        callResult: noAnswer
      }));
    }
  }, [callResultStepData === null || callResultStepData === void 0 ? void 0 : callResultStepData.callResult]);
  var textarea = isAST ? /*#__PURE__*/jsx(NoteRichTextEditor$1, {
    note: noteStepData === null || noteStepData === void 0 ? void 0 : noteStepData.value,
    onChange: function onChange(value) {
      return setNoteStepData(_objectSpread$5(_objectSpread$5({}, noteStepData), {}, {
        value: value
      }));
    }
  }) : /*#__PURE__*/jsx(TextArea, {
    value: noteStepData === null || noteStepData === void 0 ? void 0 : noteStepData.value,
    minRows: 16,
    maxRows: 16,
    placeholder: !(noteStepData !== null && noteStepData !== void 0 && noteStepData.value) ? t('addNote') : null,
    width: "100%",
    onChange: function onChange(value) {
      return setNoteStepData(_objectSpread$5(_objectSpread$5({}, noteStepData), {}, {
        value: value
      }));
    }
  });
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsxs(ModalContent, {
      children: [/*#__PURE__*/jsx(CallInfo, {}), /*#__PURE__*/jsxs("div", {
        className: styles$7._section__wrapper,
        children: [/*#__PURE__*/jsx("div", {
          className: styles$7._section_title__wrapper,
          children: /*#__PURE__*/jsx(Text, {
            dataTest: "Text-Modal-CallResultOpp",
            size: "m",
            weight: "medium",
            color: "peanut",
            children: t('title')
          })
        }), /*#__PURE__*/jsxs(ChipGroup, {
          value: isCorrectContact(callResultStepData === null || callResultStepData === void 0 ? void 0 : (_callResultStepData$c3 = callResultStepData.callResult) === null || _callResultStepData$c3 === void 0 ? void 0 : _callResultStepData$c3.logicRole) ? 'yes' : 'no',
          onChange: function onChange(value) {
            setCallResultStepData(_objectSpread$5(_objectSpread$5({}, callResultStepData), {}, {
              /*@ts-ignore*/
              callResult: value === 'yes' ? correctContact : noAnswer
            }));
          },
          children: [/*#__PURE__*/jsx(Chip, {
            dataTest: "Opportunity-Yes",
            value: "yes",
            children: t('yes').toUpperCase()
          }), /*#__PURE__*/jsx(Chip, {
            dataTest: "Opportunity-No",
            value: "no",
            children: t('no').toUpperCase()
          })]
        })]
      }), /*#__PURE__*/jsxs("div", {
        className: styles$7._section__wrapper,
        children: [/*#__PURE__*/jsx("div", {
          className: styles$7._section_title__wrapper,
          children: /*#__PURE__*/jsx(Text, {
            size: "m",
            weight: "medium",
            color: "peanut",
            children: t('addInfo')
          })
        }), textarea]
      })]
    }), /*#__PURE__*/jsx(ModalFooter, {
      children: /*#__PURE__*/jsxs("div", {
        className: styles$7._buttons__wrapper,
        children: [hasPreviousStep && /*#__PURE__*/jsx(Button, {
          variant: "clear",
          onClick: handleBack,
          className: styles$7.back_button,
          children: (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.previousButtonTitle) || t('back')
        }), showSkipButton && /*#__PURE__*/jsx(Button, {
          variant: "secondary",
          onClick: function onClick() {
            return handleSkip(openCadenceControlOnClose);
          },
          className: styles$7.skip_button,
          children: t('skip')
        }), /*#__PURE__*/jsx(Button, {
          dataTest: "Form-Next",
          onClick: saveAndNext,
          disabled: !(callResultStepData !== null && callResultStepData !== void 0 && (_callResultStepData$c4 = callResultStepData.callResult) !== null && _callResultStepData$c4 !== void 0 && _callResultStepData$c4.logicRole),
          children: (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.nextButtonTitle) || t('next')
        })]
      })
    })]
  });
};

var AVAILABLE_COMPANY_STATUSES$1 = [COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.ACTIVE, COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD, COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING, COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED, COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.CLIENT];
var AVAILABLE_LEAD_STATUSES$1 = [LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.ACTIVE, LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.ON_HOLD, LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING, LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED, LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.CLIENT];

var css_248z$6 = ".changeSalesStatus-module__section__wrapper__c0VJL {\n  margin-bottom: 24px;\n}\n\n.changeSalesStatus-module__content__wrapper__B4Ole {\n  padding-top: 5px;\n  display: flex;\n  flex-flow: row;\n  justify-content: space-around;\n  width: 100%;\n}\n\n.changeSalesStatus-module__lead_info_container__GFavk {\n  width: 180px;\n  margin: 0 auto;\n}\n\n.changeSalesStatus-module__name__wrapper__M9wEH {\n  display: flex;\n  margin-bottom: 16px;\n  justify-content: center;\n  margin-left: -12px;\n}\n\n.changeSalesStatus-module__name__wrapper__M9wEH > p {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  max-width: 153px;\n}\n\n.changeSalesStatus-module__name__wrapper__M9wEH > svg {\n  margin-right: 4px;\n}\n\n.changeSalesStatus-module__currentStatus__wrapper__rlKpc {\n  margin-bottom: 24px;\n}\n\n.changeSalesStatus-module__currentStatus__wrapper__rlKpc > div {\n  padding: 4px 16px;\n  text-align: center;\n  opacity: 0.5;\n}\n\n.changeSalesStatus-module__change_lead_status__wrapper__U3eTa {\n  width: 420px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.changeSalesStatus-module__change_company_status__wrapper__tyyKe {\n  width: 180px;\n}\n\n.changeSalesStatus-module__list_status__dXHe3 > div {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 12px;\n}\n\n.changeSalesStatus-module__list_status__dXHe3 > div > div,\n.changeSalesStatus-module__currentStatus__wrapper__rlKpc > div {\n  width: 148px;\n}\n\n.changeSalesStatus-module__radios_list_status__A7Oxp {\n  width: 420px;\n}\n\n.changeSalesStatus-module__radios_list_status__A7Oxp > div > div {\n  letter-spacing: 0;\n  margin-bottom: 10px;\n  padding: 6px 12px;\n}\n\n.changeSalesStatus-module__title__wrapper__rifIk {\n  margin-bottom: 15px;\n}\n\n.changeSalesStatus-module__title__wrapper__centered__G0irz {\n  display: flex;\n  justify-content: center;\n}\n\n.changeSalesStatus-module__reason__wrapper__Dvve6 {\n  margin-right: 15px;\n  width: 50%;\n}\n\n.changeSalesStatus-module__buttons__wrapper__Uov-f {\n  display: flex;\n  width: 100%;\n}\n\n.changeSalesStatus-module_skip_button__TN6EE {\n  margin-left: auto;\n  margin-right: 16px;\n}\n\n.changeSalesStatus-module_back_button__GkG-O {\n  margin-left: 0px;\n  margin-right: auto;\n}\n";
var styles$6 = {"_section__wrapper":"changeSalesStatus-module__section__wrapper__c0VJL","_content__wrapper":"changeSalesStatus-module__content__wrapper__B4Ole","_lead_info_container":"changeSalesStatus-module__lead_info_container__GFavk","_name__wrapper":"changeSalesStatus-module__name__wrapper__M9wEH","_currentStatus__wrapper":"changeSalesStatus-module__currentStatus__wrapper__rlKpc","_change_lead_status__wrapper":"changeSalesStatus-module__change_lead_status__wrapper__U3eTa","_change_company_status__wrapper":"changeSalesStatus-module__change_company_status__wrapper__tyyKe","_list_status":"changeSalesStatus-module__list_status__dXHe3","_radios_list_status":"changeSalesStatus-module__radios_list_status__A7Oxp","_title__wrapper":"changeSalesStatus-module__title__wrapper__rifIk","_title__wrapper__centered":"changeSalesStatus-module__title__wrapper__centered__G0irz","_reason__wrapper":"changeSalesStatus-module__reason__wrapper__Dvve6","_buttons__wrapper":"changeSalesStatus-module__buttons__wrapper__Uov-f","skip_button":"changeSalesStatus-module_skip_button__TN6EE","back_button":"changeSalesStatus-module_back_button__GkG-O"};
styleInject(css_248z$6);

function _typeof$4(obj) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$4(obj); }
function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty$4(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$4(obj, key, value) { key = _toPropertyKey$4(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$4(arg) { var key = _toPrimitive$4(arg, "string"); return _typeof$4(key) === "symbol" ? key : String(key); }
function _toPrimitive$4(input, hint) { if (_typeof$4(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$4(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$5(arr, i) { return _arrayWithHoles$5(arr) || _iterableToArrayLimit$5(arr, i) || _unsupportedIterableToArray$5(arr, i) || _nonIterableRest$5(); }
function _nonIterableRest$5() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$5(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$5(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen); }
function _arrayLikeToArray$5(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$5(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$5(arr) { if (Array.isArray(arr)) return arr; }
//TODO refactor
var updateEntity$1 = function updateEntity(idValue, data) {
  return api.patch("/bobjects/".concat(idValue, "/raw"), data);
};
var fetcherReason$1 = function fetcherReason(url) {
  return api.get(url);
};
var getStatusName = function getStatusName(statusLogicRole) {
  var status = statusLogicRole.split('__')[2];
  return status === null || status === void 0 ? void 0 : status.toLowerCase();
};
//TODO this should be COMPLETELY redone
var ChangeSalesStatus = function ChangeSalesStatus(_ref) {
  var _referenceBobject$id, _changeStatusStepData, _changeStatusStepData2, _referenceBobject$id2, _changeStatusStepData3;
  var handleBack = _ref.handleBack,
    handleNext = _ref.handleNext,
    handleSkip = _ref.handleSkip;
  var _useState = useState(),
    _useState2 = _slicedToArray$5(_useState, 2),
    selectedReasons = _useState2[0],
    setSelectedReasons = _useState2[1];
  var _useContactFlow = useContactFlow(),
    dataModel = _useContactFlow.dataModel,
    referenceBobject = _useContactFlow.referenceBobject,
    company = _useContactFlow.activityCompany,
    lead = _useContactFlow.activityLead,
    changeStatusStepData = _useContactFlow.changeStatusStepData,
    setChangeStatusStepData = _useContactFlow.setChangeStatusStepData,
    leadSalesStatusPicklistValues = _useContactFlow.leadSalesStatusPicklistValues,
    companySalesStatusPicklistValues = _useContactFlow.companySalesStatusPicklistValues,
    buttonStepConfig = _useContactFlow.buttonStepConfig;
  var referenceBobjectType = referenceBobject === null || referenceBobject === void 0 ? void 0 : (_referenceBobject$id = referenceBobject.id) === null || _referenceBobject$id === void 0 ? void 0 : _referenceBobject$id.typeName;
  var hasLeadReference = isLead(referenceBobject);
  var mainBobjectStatusKey = "".concat(referenceBobjectType === null || referenceBobjectType === void 0 ? void 0 : referenceBobjectType.toLowerCase(), "Status");
  // @ts-ignore
  var salesStatusField = dataModel.findValueById(referenceBobject.salesStatus);
  // @ts-ignore
  var referenceBobjectName = hasLeadReference ? referenceBobject.fullName : referenceBobject.name;
  var showSkipButton = (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.showSkipButton) != undefined ? buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.showSkipButton : true;
  var hasPreviousStep = (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.hasPreviousStep) != undefined ? buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.hasPreviousStep : true;
  var openCadenceControlOnClose = (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.openCadenceOnSkip) != undefined ? buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.openCadenceOnSkip : true;
  var _useSWR = useSWR("/utils/service/view/field/statusReasons/".concat(referenceBobjectType, "?stage=SALES"), fetcherReason$1),
    reasons = _useSWR.data;
  var getStatusValues = function getStatusValues() {
    var statusPicklistValues = hasLeadReference ? leadSalesStatusPicklistValues : companySalesStatusPicklistValues;
    var availableStatus = hasLeadReference ? AVAILABLE_LEAD_STATUSES$1 : AVAILABLE_COMPANY_STATUSES$1;
    return statusPicklistValues.filter(function (fieldStatus) {
      return availableStatus.indexOf(fieldStatus.logicRole) > -1;
    }).sort(function (a, b) {
      return (availableStatus === null || availableStatus === void 0 ? void 0 : availableStatus.indexOf(a.logicRole)) - (availableStatus === null || availableStatus === void 0 ? void 0 : availableStatus.indexOf(b.logicRole));
    }).map(function (fieldStatus) {
      return {
        name: fieldStatus.name,
        logicRole: fieldStatus.logicRole,
        backgroundColor: fieldStatus.backgroundColor,
        outlineColor: fieldStatus.outlineColor,
        textColor: fieldStatus.textColor
      };
    });
  };
  var isNurturing = (_changeStatusStepData = changeStatusStepData[mainBobjectStatusKey]) === null || _changeStatusStepData === void 0 ? void 0 : _changeStatusStepData.includes('NURTURING');
  var isDiscarded = (_changeStatusStepData2 = changeStatusStepData[mainBobjectStatusKey]) === null || _changeStatusStepData2 === void 0 ? void 0 : _changeStatusStepData2.includes('DISCARDED');
  var bobjectStatuses = getStatusValues();
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'contactFlowModal.changeSalesStatus'
    }),
    t = _useTranslation.t;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'bobjectTypes'
    }),
    bobjectT = _useTranslation2.t;
  useEffect(function () {
    if (salesStatusField) {
      var _ref2;
      setChangeStatusStepData(_objectSpread$4(_objectSpread$4(_objectSpread$4({}, changeStatusStepData), !changeStatusStepData[mainBobjectStatusKey] ? _defineProperty$4({}, mainBobjectStatusKey, (_ref2 = hasLeadReference ? leadSalesStatusPicklistValues.find(function (field) {
        return field.id === salesStatusField.id;
      }) : companySalesStatusPicklistValues.find(function (field) {
        return field.id === salesStatusField.id;
      })) === null || _ref2 === void 0 ? void 0 : _ref2.logicRole) : {}), {}, _defineProperty$4({}, "".concat(referenceBobjectType === null || referenceBobjectType === void 0 ? void 0 : referenceBobjectType.toLowerCase(), "ReasonToDiscard"), Array.isArray(selectedReasons) ? selectedReasons[0] : undefined)));
    }
  }, [referenceBobject === null || referenceBobject === void 0 ? void 0 : (_referenceBobject$id2 = referenceBobject.id) === null || _referenceBobject$id2 === void 0 ? void 0 : _referenceBobject$id2.objectId, selectedReasons]);
  useEffect(function () {
    if (isNurturing || isDiscarded) {
      var bobjectTypeName = referenceBobjectType.toUpperCase();
      var bobjectStatus = changeStatusStepData[mainBobjectStatusKey].split('__')[2];
      var reasonsField = reasons === null || reasons === void 0 ? void 0 : reasons.data.find(function (field) {
        return field.logicRole === "".concat(bobjectTypeName, "__SALES_").concat(bobjectStatus, "_REASONS");
      });
      if (reasonsField) {
        setSelectedReasons(reasonsField.fieldValues);
      }
    }
  }, [changeStatusStepData[mainBobjectStatusKey], reasons]);
  var save = function save(id, status, entity, reasonToDiscard) {
    var bobjectTypeName = entity === null || entity === void 0 ? void 0 : entity.toUpperCase();
    var bobjectStatus = status.split('__')[2];
    var data = _defineProperty$4({}, "".concat(bobjectTypeName, "__SALES_STATUS"), status);
    if (reasonToDiscard && (status !== null && status !== void 0 && status.includes('NURTURING') || status !== null && status !== void 0 && status.includes('DISCARDED'))) {
      data = _objectSpread$4(_objectSpread$4({}, data), {}, _defineProperty$4({}, "".concat(bobjectTypeName, "__SALES_").concat(bobjectStatus, "_REASONS"), reasonToDiscard.value));
    }
    updateEntity$1(referenceBobject.id.value, data);
  };
  var saveAndClose = function saveAndClose() {
    if (hasLeadReference) {
      save(lead === null || lead === void 0 ? void 0 : lead.id.objectId, changeStatusStepData.leadStatus, BobjectTypes.Lead, changeStatusStepData.leadReasonToDiscard);
    } else {
      save(company === null || company === void 0 ? void 0 : company.id.objectId, changeStatusStepData.companyStatus, BobjectTypes.Company, changeStatusStepData.companyReasonToDiscard);
    }
    handleNext(changeStatusStepData.companyStatus, changeStatusStepData.leadStatus);
  };
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(ModalContent, {
      children: /*#__PURE__*/jsxs(ModalSection, {
        size: "l",
        title: t('title', {
          bobject: lead ? bobjectT('lead') : bobjectT('company')
        }),
        children: [/*#__PURE__*/jsx("div", {
          className: styles$6._section__wrapper,
          children: /*#__PURE__*/jsx("div", {
            className: styles$6._content__wrapper,
            children: /*#__PURE__*/jsxs("div", {
              className: styles$6._change_company_status__wrapper,
              children: [/*#__PURE__*/jsxs("div", {
                className: styles$6._name__wrapper,
                children: [/*#__PURE__*/jsx(Icon, {
                  color: "verySoftPeanut",
                  name: isLead(referenceBobject) ? 'people' : 'company'
                }), /*#__PURE__*/jsx(Text, {
                  dataTest: "Text-Modal-StatusUpdate",
                  size: "m",
                  color: "peanut",
                  children: referenceBobjectName
                })]
              }), /*#__PURE__*/jsx("div", {
                className: styles$6._list_status,
                children: bobjectStatuses.map(function (bobjectStatus) {
                  var key = referenceBobjectType === null || referenceBobjectType === void 0 ? void 0 : referenceBobjectType.toLowerCase();
                  var isSelected = (bobjectStatus === null || bobjectStatus === void 0 ? void 0 : bobjectStatus.logicRole) === changeStatusStepData["".concat(key, "Status")];
                  var style = {
                    backgroundColor: bobjectStatus.backgroundColor,
                    borderColor: bobjectStatus.outlineColor,
                    color: bobjectStatus.textColor
                  };
                  var overrideStyle = isSelected ? {
                    selectedStyle: style
                  } : null;
                  return /*#__PURE__*/jsx(Label, _objectSpread$4(_objectSpread$4({
                    value: bobjectStatus.logicRole,
                    dataTest: bobjectStatus.logicRole,
                    align: "center",
                    inline: false,
                    onClick: function onClick(value) {
                      setChangeStatusStepData(_objectSpread$4(_objectSpread$4({}, changeStatusStepData), {}, _defineProperty$4(_defineProperty$4({}, "".concat(key, "ReasonToDiscard"), null), "".concat(key, "Status"), value)));
                    },
                    selected: isSelected,
                    hoverStyle: style
                  }, overrideStyle), {}, {
                    children: bobjectStatus.name
                  }), "".concat(key, "-status-").concat(bobjectStatus.name));
                })
              })]
            })
          })
        }), (isNurturing || isDiscarded) && /*#__PURE__*/jsxs("div", {
          className: styles$6._section__wrapper,
          children: [/*#__PURE__*/jsx("div", {
            className: styles$6._title__wrapper,
            children: /*#__PURE__*/jsx(Text, {
              size: "m",
              weight: "medium",
              color: "peanut",
              children: t('whatReason')
            })
          }), /*#__PURE__*/jsx("div", {
            className: styles$6._content__wrapper,
            children: /*#__PURE__*/jsx("div", {
              className: styles$6._reason__wrapper,
              children: /*#__PURE__*/jsx(Select, {
                value: (_changeStatusStepData3 = changeStatusStepData["".concat(referenceBobjectType === null || referenceBobjectType === void 0 ? void 0 : referenceBobjectType.toLowerCase(), "ReasonToDiscard")]) === null || _changeStatusStepData3 === void 0 ? void 0 : _changeStatusStepData3.value,
                placeholder: t('placeholder', {
                  lead: capitalize(bobjectT('lead')),
                  status: getStatusName(changeStatusStepData[mainBobjectStatusKey])
                }),
                width: "100%",
                children: selectedReasons === null || selectedReasons === void 0 ? void 0 : selectedReasons.map(function (reason) {
                  var _referenceBobject$id3;
                  return /*#__PURE__*/jsx(Item, {
                    value: reason.value,
                    onClick: function onClick() {
                      setChangeStatusStepData(_objectSpread$4(_objectSpread$4({}, changeStatusStepData), {}, {
                        leadReasonToDiscard: reason,
                        companyReasonToDiscard: reason
                      }));
                    },
                    children: reason.label
                  }, "".concat(referenceBobject === null || referenceBobject === void 0 ? void 0 : (_referenceBobject$id3 = referenceBobject.id) === null || _referenceBobject$id3 === void 0 ? void 0 : _referenceBobject$id3.typeName, "-reason-item-").concat(reason.value));
                })
              })
            })
          })]
        })]
      })
    }), /*#__PURE__*/jsx(ModalFooter, {
      children: /*#__PURE__*/jsxs("div", {
        className: styles$6._buttons__wrapper,
        children: [hasPreviousStep && /*#__PURE__*/jsx(Button, {
          variant: "clear",
          onClick: handleBack,
          className: styles$6.back_button,
          children: (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.previousButtonTitle) || t('back')
        }), showSkipButton && /*#__PURE__*/jsx(Button, {
          variant: "secondary",
          onClick: function onClick() {
            return handleSkip(openCadenceControlOnClose);
          },
          className: styles$6.skip_button,
          children: t('skip')
        }), /*#__PURE__*/jsx(Button, {
          dataTest: "Form-Save",
          onClick: saveAndClose,
          children: isDiscarded ? (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.nextButtonTitle) || t('save') : (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.nextButtonAlternativeTitle) || t('saveAndContinue')
        })]
      })
    })]
  });
};

var STEPS = Object.seal({
  ON_PROSPECTION: 'on_prospection',
  CONTACTED: 'contacted',
  CONTACT: 'contact',
  ENGAGED: 'engaged',
  MEETING: 'meeting',
  ACCOUNT: 'account',
  NURTURING: 'nurturing',
  DISCARDED: 'discarded'
});
var statusMachine = createMachine({
  id: 'status',
  type: 'parallel',
  states: {
    lead: {
      initial: STEPS.ON_PROSPECTION,
      states: {
        on_prospection: {
          on: {
            SET_ON_PROSPECTION_LEAD: STEPS.ON_PROSPECTION,
            SET_CONTACTED_LEAD: STEPS.CONTACTED,
            SET_ENGAGED_LEAD: STEPS.ENGAGED,
            SET_MEETING_LEAD: STEPS.MEETING,
            SET_CONTACT_LEAD: STEPS.CONTACT,
            SET_NURTURING_LEAD: STEPS.NURTURING,
            SET_NURTURING_COMPANY: STEPS.NURTURING,
            SET_DISCARDED_LEAD: STEPS.DISCARDED,
            SET_DISCARDED_COMPANY: STEPS.DISCARDED
          }
        },
        contacted: {
          on: {
            SET_ON_PROSPECTION_LEAD: STEPS.ON_PROSPECTION,
            SET_ENGAGED_LEAD: STEPS.ENGAGED,
            SET_MEETING_LEAD: STEPS.MEETING,
            SET_CONTACT_LEAD: STEPS.CONTACT,
            SET_NURTURING_LEAD: STEPS.NURTURING,
            SET_NURTURING_COMPANY: STEPS.NURTURING,
            SET_DISCARDED_LEAD: STEPS.DISCARDED,
            SET_DISCARDED_COMPANY: STEPS.DISCARDED
          }
        },
        engaged: {
          on: {
            SET_ON_PROSPECTION_LEAD: STEPS.ON_PROSPECTION,
            SET_CONTACTED_LEAD: STEPS.CONTACTED,
            SET_MEETING_LEAD: STEPS.MEETING,
            SET_CONTACT_LEAD: STEPS.CONTACT,
            SET_NURTURING_LEAD: STEPS.NURTURING,
            SET_NURTURING_COMPANY: STEPS.NURTURING,
            SET_DISCARDED_LEAD: STEPS.DISCARDED,
            SET_DISCARDED_COMPANY: STEPS.DISCARDED
          }
        },
        meeting: {
          on: {
            SET_ON_PROSPECTION_LEAD: STEPS.ON_PROSPECTION,
            SET_CONTACTED_LEAD: STEPS.CONTACTED,
            SET_ENGAGED_LEAD: STEPS.ENGAGED,
            SET_CONTACT_LEAD: STEPS.CONTACT,
            SET_NURTURING_LEAD: STEPS.NURTURING,
            SET_NURTURING_COMPANY: STEPS.NURTURING,
            SET_DISCARDED_LEAD: STEPS.DISCARDED,
            SET_DISCARDED_COMPANY: STEPS.DISCARDED
          }
        },
        contact: {
          on: {
            SET_ON_PROSPECTION_LEAD: STEPS.ON_PROSPECTION,
            SET_CONTACTED_LEAD: STEPS.CONTACTED,
            SET_ENGAGED_LEAD: STEPS.ENGAGED,
            SET_MEETING_LEAD: STEPS.MEETING,
            SET_DISCARDED_LEAD: STEPS.DISCARDED,
            SET_NURTURING_LEAD: STEPS.NURTURING,
            SET_DISCARDED_COMPANY: STEPS.DISCARDED,
            SET_NURTURING_COMPANY: STEPS.NURTURING
          }
        },
        nurturing: {
          on: {
            SET_ON_PROSPECTION_LEAD: STEPS.ON_PROSPECTION,
            SET_CONTACTED_LEAD: STEPS.CONTACTED,
            SET_ENGAGED_LEAD: STEPS.ENGAGED,
            SET_MEETING_LEAD: STEPS.MEETING,
            SET_CONTACT_LEAD: STEPS.CONTACT,
            SET_DISCARDED_LEAD: STEPS.DISCARDED,
            SET_DISCARDED_COMPANY: STEPS.DISCARDED
          }
        },
        discarded: {
          on: {
            SET_ON_PROSPECTION_LEAD: STEPS.ON_PROSPECTION,
            SET_CONTACTED_LEAD: STEPS.CONTACTED,
            SET_ENGAGED_LEAD: STEPS.ENGAGED,
            SET_MEETING_LEAD: STEPS.MEETING,
            SET_CONTACT_LEAD: STEPS.CONTACT,
            SET_NURTURING_LEAD: STEPS.NURTURING,
            SET_NURTURING_COMPANY: STEPS.NURTURING
          }
        }
      }
    },
    company: {
      initial: STEPS.ON_PROSPECTION,
      states: {
        on_prospection: {
          on: {
            SET_ON_PROSPECTION_COMPANY: STEPS.ON_PROSPECTION,
            SET_ON_PROSPECTION_LEAD: STEPS.ON_PROSPECTION,
            SET_CONTACTED_COMPANY: STEPS.CONTACTED,
            SET_CONTACTED_LEAD: STEPS.CONTACTED,
            SET_ENGAGED_COMPANY: STEPS.ENGAGED,
            SET_ENGAGED_LEAD: STEPS.ENGAGED,
            SET_MEETING_COMPANY: STEPS.MEETING,
            SET_MEETING_LEAD: STEPS.MEETING,
            SET_CONTACT_LEAD: STEPS.ACCOUNT,
            SET_ACCOUNT_COMPANY: STEPS.ACCOUNT,
            SET_NURTURING_COMPANY: STEPS.NURTURING,
            SET_DISCARDED_COMPANY: STEPS.DISCARDED
          }
        },
        contacted: {
          on: {
            SET_ON_PROSPECTION_COMPANY: STEPS.ON_PROSPECTION,
            SET_ON_PROSPECTION_LEAD: STEPS.ON_PROSPECTION,
            SET_ENGAGED_COMPANY: STEPS.ENGAGED,
            SET_ENGAGED_LEAD: STEPS.ENGAGED,
            SET_MEETING_COMPANY: STEPS.MEETING,
            SET_MEETING_LEAD: STEPS.MEETING,
            SET_CONTACT_LEAD: STEPS.ACCOUNT,
            SET_ACCOUNT_COMPANY: STEPS.ACCOUNT,
            SET_NURTURING_COMPANY: STEPS.NURTURING,
            SET_DISCARDED_COMPANY: STEPS.DISCARDED
          }
        },
        engaged: {
          on: {
            SET_ON_PROSPECTION_COMPANY: STEPS.ON_PROSPECTION,
            SET_ON_PROSPECTION_LEAD: STEPS.ON_PROSPECTION,
            SET_CONTACTED_LEAD: STEPS.CONTACTED,
            SET_CONTACTED_COMPANY: STEPS.CONTACTED,
            SET_ENGAGED_COMPANY: STEPS.ENGAGED,
            SET_ENGAGED_LEAD: STEPS.ENGAGED,
            SET_MEETING_COMPANY: STEPS.MEETING,
            SET_MEETING_LEAD: STEPS.MEETING,
            SET_CONTACT_LEAD: STEPS.ACCOUNT,
            SET_ACCOUNT_COMPANY: STEPS.ACCOUNT,
            SET_NURTURING_COMPANY: STEPS.NURTURING,
            SET_DISCARDED_COMPANY: STEPS.DISCARDED
          }
        },
        meeting: {
          on: {
            SET_ON_PROSPECTION_COMPANY: STEPS.ON_PROSPECTION,
            SET_ON_PROSPECTION_LEAD: STEPS.ON_PROSPECTION,
            SET_CONTACTED_COMPANY: STEPS.CONTACTED,
            SET_CONTACTED_LEAD: STEPS.CONTACTED,
            SET_ENGAGED_COMPANY: STEPS.ENGAGED,
            SET_ENGAGED_LEAD: STEPS.ENGAGED,
            SET_CONTACT_LEAD: STEPS.ACCOUNT,
            SET_ACCOUNT_COMPANY: STEPS.ACCOUNT,
            SET_NURTURING_COMPANY: STEPS.NURTURING,
            SET_DISCARDED_COMPANY: STEPS.DISCARDED
          }
        },
        account: {
          on: {
            SET_ON_PROSPECTION_COMPANY: STEPS.ON_PROSPECTION,
            SET_ON_PROSPECTION_LEAD: STEPS.ON_PROSPECTION,
            SET_CONTACTED_COMPANY: STEPS.CONTACTED,
            SET_CONTACTED_LEAD: STEPS.CONTACTED,
            SET_ENGAGED_COMPANY: STEPS.ENGAGED,
            SET_ENGAGED_LEAD: STEPS.ENGAGED,
            SET_MEETING_COMPANY: STEPS.MEETING,
            SET_MEETING_LEAD: STEPS.MEETING,
            SET_NURTURING_COMPANY: STEPS.NURTURING,
            SET_DISCARDED_COMPANY: STEPS.DISCARDED
          }
        },
        nurturing: {
          on: {
            SET_ON_PROSPECTION_COMPANY: STEPS.ON_PROSPECTION,
            SET_ON_PROSPECTION_LEAD: STEPS.ON_PROSPECTION,
            SET_CONTACTED_COMPANY: STEPS.CONTACTED,
            SET_CONTACTED_LEAD: STEPS.CONTACTED,
            SET_ENGAGED_COMPANY: STEPS.ENGAGED,
            SET_ENGAGED_LEAD: STEPS.ENGAGED,
            SET_MEETING_COMPANY: STEPS.MEETING,
            SET_MEETING_LEAD: STEPS.MEETING,
            SET_CONTACT_LEAD: STEPS.ACCOUNT,
            SET_ACCOUNT_COMPANY: STEPS.ACCOUNT,
            SET_DISCARDED_COMPANY: STEPS.DISCARDED
          }
        },
        discarded: {
          on: {
            SET_ON_PROSPECTION_COMPANY: STEPS.ON_PROSPECTION,
            SET_ON_PROSPECTION_LEAD: STEPS.ON_PROSPECTION,
            SET_CONTACTED_COMPANY: STEPS.CONTACTED,
            SET_CONTACTED_LEAD: STEPS.CONTACTED,
            SET_ENGAGED_COMPANY: STEPS.ENGAGED,
            SET_ENGAGED_LEAD: STEPS.ENGAGED,
            SET_MEETING_COMPANY: STEPS.MEETING,
            SET_MEETING_LEAD: STEPS.MEETING,
            SET_CONTACT_LEAD: STEPS.ACCOUNT,
            SET_ACCOUNT_COMPANY: STEPS.ACCOUNT,
            SET_NURTURING_COMPANY: STEPS.NURTURING
          }
        }
      }
    }
  }
});

var COMPANY_STATUSES_WITH_MESSAGE = [STEPS.MEETING, STEPS.ACCOUNT, STEPS.DISCARDED, STEPS.NURTURING];
var AVAILABLE_LEAD_STATUSES = Object.freeze({
  LEAD__STATUS__ON_PROSPECTION: 'LEAD__STATUS__ON_PROSPECTION',
  LEAD__STATUS__CONTACTED: 'LEAD__STATUS__CONTACTED',
  LEAD__STATUS__ENGAGED: 'LEAD__STATUS__ENGAGED',
  LEAD__STATUS__MEETING: 'LEAD__STATUS__MEETING',
  LEAD__STATUS__CONTACT: 'LEAD__STATUS__CONTACT',
  LEAD__STATUS__NURTURING: 'LEAD__STATUS__NURTURING',
  LEAD__STATUS__DISCARDED: 'LEAD__STATUS__DISCARDED'
});
var AVAILABLE_COMPANY_STATUSES = Object.freeze({
  COMPANY__STATUS__ON_PROSPECTION: 'COMPANY__STATUS__ON_PROSPECTION',
  COMPANY__STATUS__CONTACTED: 'COMPANY__STATUS__CONTACTED',
  COMPANY__STATUS__ENGAGED: 'COMPANY__STATUS__ENGADED',
  COMPANY__STATUS__MEETING: 'COMPANY__STATUS__MEETING',
  COMPANY__STATUS__ACCOUNT: 'COMPANY__STATUS__ACCOUNT',
  COMPANY__STATUS__NURTURING: 'COMPANY__STATUS__NURTURING',
  COMPANY__STATUS__DISCARDED: 'COMPANY__STATUS__DISCARDED'
});
var tooltipKeys = ['LEAD__STATUS__CONTACTED', 'LEAD__STATUS__ENGAGED', 'LEAD__STATUS__MEETING', 'LEAD__STATUS__NURTURING', 'LEAD__STATUS__DISCARDED', 'COMPANY__STATUS__CONTACTED', 'COMPANY__STATUS__ENGAGED', 'COMPANY__STATUS__MEETING', 'COMPANY__STATUS__NURTURING', 'COMPANY__STATUS__DISCARDED'];

var css_248z$5 = ".changeStatus-module_container__7DQyB {\n  padding-bottom: 24px;\n}\n\n.changeStatus-module__section__wrapper__ghuIX {\n  margin-bottom: 16px;\n}\n\n.changeStatus-module__content__wrapper__oIbKl {\n  padding-top: 5px;\n  display: flex;\n  flex-flow: row;\n  justify-content: space-around;\n  width: 100%;\n}\n\n.changeStatus-module__content__wrapper__oIbKl label {\n  width: 182px;\n}\n\n.changeStatus-module__lead_info_container__BB5UG {\n  display: flex;\n  width: 180px;\n  margin: 0 auto 22px;\n  gap: 6px;\n  flex-direction: column;\n  align-items: center;\n}\n\n.changeStatus-module__name__wrapper__HAJr3 {\n  display: flex;\n}\n\n.changeStatus-module__name__wrapper__HAJr3 > p {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  font-size: 14px;\n}\n\n.changeStatus-module__name__wrapper__HAJr3 > svg {\n  margin-right: 4px;\n}\n\n.changeStatus-module__currentStatus__wrapper__EqjeN > div {\n  width: 100%;\n  max-width: 182px;\n  padding: 3px 16px;\n  text-align: center;\n  opacity: 0.5;\n  font-size: 11px;\n}\n\n.changeStatus-module__change_lead_status__wrapper__iGw5P {\n  width: 450px;\n  display: flex;\n  flex-direction: column;\n}\n\n.changeStatus-module__lead_with_company_container__X8YHt {\n  display: flex;\n  gap: 6px;\n  height: 72px;\n  flex-direction: column;\n}\n\n.changeStatus-module__change_company_status__wrapper__F6zWJ {\n  width: 180px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.changeStatus-module__change_company_status__wrapper__F6zWJ > .changeStatus-module__name__wrapper__HAJr3 {\n  height: 24px;\n}\n\n.changeStatus-module__change_company_status__wrapper__F6zWJ > .changeStatus-module__currentStatus__wrapper__EqjeN {\n  margin-bottom: 4px;\n}\n\n.changeStatus-module__single_entity__BTlFW {\n  margin-left: -12px;\n  justify-content: center;\n}\n\n.changeStatus-module__list_status__-FKXI > div {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 8px;\n}\n\n.changeStatus-module__list_status__-FKXI > div > div {\n  width: 182px;\n  font-size: 11px;\n  padding: 3px 16px;\n}\n\n.changeStatus-module__radios_list_status__mrIIq {\n  width: 100%;\n}\n\n.changeStatus-module__warning__wrapper__MrH3j > div {\n  font-size: 12px;\n}\n\n.changeStatus-module__warning__wrapper__MrH3j > svg {\n  padding: 0;\n  margin-right: 12px;\n}\n\n.changeStatus-module__radios_list_status__mrIIq > div > div {\n  letter-spacing: 0;\n  margin-bottom: 8px;\n  padding: 4px 12px;\n  font-size: 12px;\n}\n\n.changeStatus-module__title__wrapper__sjECp {\n  margin-top: 4px;\n  margin-bottom: 12px;\n}\n\n.changeStatus-module__title__wrapper__centered__gQZyO {\n  display: flex;\n  justify-content: center;\n}\n\n.changeStatus-module__reason__wrapper__m5nr- {\n  margin-right: 15px;\n  width: 50%;\n}\n\n.changeStatus-module__buttons__wrapper__AodhX {\n  display: flex;\n  width: 100%;\n}\n\n.changeStatus-module_skip_button__Itd6Y {\n  margin-left: auto;\n  margin-right: 16px;\n}\n\n.changeStatus-module_back_button__595FL {\n  margin-left: 0px;\n  margin-right: auto;\n}\n";
var styles$5 = {"container":"changeStatus-module_container__7DQyB","_section__wrapper":"changeStatus-module__section__wrapper__ghuIX","_content__wrapper":"changeStatus-module__content__wrapper__oIbKl","_lead_info_container":"changeStatus-module__lead_info_container__BB5UG","_name__wrapper":"changeStatus-module__name__wrapper__HAJr3","_currentStatus__wrapper":"changeStatus-module__currentStatus__wrapper__EqjeN","_change_lead_status__wrapper":"changeStatus-module__change_lead_status__wrapper__iGw5P","_lead_with_company_container":"changeStatus-module__lead_with_company_container__X8YHt","_change_company_status__wrapper":"changeStatus-module__change_company_status__wrapper__F6zWJ","_single_entity":"changeStatus-module__single_entity__BTlFW","_list_status":"changeStatus-module__list_status__-FKXI","_radios_list_status":"changeStatus-module__radios_list_status__mrIIq","_warning__wrapper":"changeStatus-module__warning__wrapper__MrH3j","_title__wrapper":"changeStatus-module__title__wrapper__sjECp","_title__wrapper__centered":"changeStatus-module__title__wrapper__centered__gQZyO","_reason__wrapper":"changeStatus-module__reason__wrapper__m5nr-","_buttons__wrapper":"changeStatus-module__buttons__wrapper__AodhX","skip_button":"changeStatus-module_skip_button__Itd6Y","back_button":"changeStatus-module_back_button__595FL"};
styleInject(css_248z$5);

function _typeof$3(obj) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$3(obj); }
function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty$3(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(arg) { var key = _toPrimitive$3(arg, "string"); return _typeof$3(key) === "symbol" ? key : String(key); }
function _toPrimitive$3(input, hint) { if (_typeof$3(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$3(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$4(arr, i) { return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$4(); }
function _nonIterableRest$4() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }
function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$4(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$4(arr) { if (Array.isArray(arr)) return arr; }
var updateEntity = function updateEntity(id, data, bobjectType) {
  return api.patch("/bobjects/".concat(id.accountId, "/").concat(bobjectType, "/").concat(id.objectId, "/raw"), data);
};
var fetcherReason = function fetcherReason(url) {
  return api.get(url);
};
function getStatusValues(values, availableStatus) {
  var statusOrder = Object.keys(availableStatus);
  return values.filter(function (fieldStatus) {
    return !!availableStatus[fieldStatus.logicRole];
  }).sort(function (a, b) {
    return (statusOrder === null || statusOrder === void 0 ? void 0 : statusOrder.indexOf(a.logicRole)) - (statusOrder === null || statusOrder === void 0 ? void 0 : statusOrder.indexOf(b.logicRole));
  });
}
var ChangeStatus = function ChangeStatus(_ref) {
  var _referenceBobject$id, _getFieldByLogicRole, _lead$id, _company$id, _changeStatusStepData, _selectedLeadReasons$, _changeStatusStepData2, _selectedCompanyReaso;
  _ref.handleBack;
    var handleClose = _ref.handleClose,
    handleNext = _ref.handleNext,
    handleSkip = _ref.handleSkip;
  var _useObjectCreationSet = useObjectCreationSettings(),
    enabledObjectCreation = _useObjectCreationSet.enabledObjectCreation;
  var _useContactFlow = useContactFlow(),
    referenceBobject = _useContactFlow.referenceBobject,
    lead = _useContactFlow.activityLead,
    company = _useContactFlow.activityCompany,
    changeStatusStepData = _useContactFlow.changeStatusStepData,
    setChangeStatusStepData = _useContactFlow.setChangeStatusStepData,
    companyStatusPicklistValues = _useContactFlow.companyStatusPicklistValues,
    leadStatusPicklistValues = _useContactFlow.leadStatusPicklistValues,
    buttonStepConfig = _useContactFlow.buttonStepConfig;
  var _useSWR = useSWR("/utils/service/view/field/statusReasons/".concat(referenceBobject === null || referenceBobject === void 0 ? void 0 : (_referenceBobject$id = referenceBobject.id) === null || _referenceBobject$id === void 0 ? void 0 : _referenceBobject$id.typeName), /*@ts-ignore*/
    fetcherReason),
    reasons = _useSWR.data;
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var _useTranslation = useTranslation('translations', {
      keyPrefix: 'contactFlowModal.changeStatus'
    }),
    t = _useTranslation.t;
  var _useTranslation2 = useTranslation('translations', {
      keyPrefix: 'bobjectTypes'
    }),
    bobjectT = _useTranslation2.t;
  var _useMachine = useMachine(statusMachine, {}),
    _useMachine2 = _slicedToArray$4(_useMachine, 2),
    state = _useMachine2[0],
    send = _useMachine2[1];
  // @ts-ignore
  var machineStatus = state.value;
  var companyStatuses = getStatusValues(companyStatusPicklistValues, AVAILABLE_COMPANY_STATUSES);
  var leadStatuses = getStatusValues(leadStatusPicklistValues, AVAILABLE_LEAD_STATUSES);
  var _useState = useState(),
    _useState2 = _slicedToArray$4(_useState, 2),
    selectedLeadReasons = _useState2[0],
    setSelectedLeadReasons = _useState2[1];
  var _useState3 = useState(),
    _useState4 = _slicedToArray$4(_useState3, 2),
    selectedCompanyReasons = _useState4[0],
    setSelectedCompanyReasons = _useState4[1];
  var leadName = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var companyName = getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  var hasLead = !!lead;
  var companyStage = (_getFieldByLogicRole = getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.STAGE)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.valueLogicRole;
  var hasCompany = companyStage !== COMPANY_STAGE_LOGIC_ROLE.SALES;
  //TODO extract this to a modal parameter
  var trigger = 'REPORT_RESULT';
  var isReportResultTrigger = trigger === 'REPORT_RESULT' ;
  var isNurturing = hasLead && machineStatus.lead === 'nurturing' || hasCompany && machineStatus.company === 'nurturing';
  var isDiscarded = machineStatus.lead === 'discarded' || machineStatus.company === 'discarded';
  var changeStatus = function changeStatus(logicRole, entity) {
    var newStatus = logicRole === null || logicRole === void 0 ? void 0 : logicRole.split('__')[2];
    send("SET_".concat(newStatus, "_").concat(entity));
  };
  var showSkipButton = (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.showSkipButton) != undefined ? buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.showSkipButton : true;
  var hasPreviousStep = (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.hasPreviousStep) != undefined ? buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.hasPreviousStep : true;
  var openCadenceControlOnClose = (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.openCadenceOnSkip) != undefined ? buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.openCadenceOnSkip : false;
  var getLogicRoleFromMachineValue = function getLogicRoleFromMachineValue(machineValue, entity) {
    return entity === 'company' ? COMPANY_STATUS_LOGIC_ROLE[machineValue] : LEAD_STATUS_LOGIC_ROLE[machineValue];
  };
  //TODO these should be set on initialization, not like this
  useEffect(function () {
    var _getFieldByLogicRole2, _getFieldByLogicRole3;
    var leadStatus = changeStatusStepData.leadStatus,
      companyStatus = changeStatusStepData.companyStatus;
    var leadSelectedStatus = (_getFieldByLogicRole2 = getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.STATUS)) === null || _getFieldByLogicRole2 === void 0 ? void 0 : _getFieldByLogicRole2.valueLogicRole;
    var companySelectedStatus = (_getFieldByLogicRole3 = getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.STATUS)) === null || _getFieldByLogicRole3 === void 0 ? void 0 : _getFieldByLogicRole3.valueLogicRole;
    if (leadStatus || leadSelectedStatus) {
      var newLeadstatus = leadStatus ? "LEAD__STATUS__".concat(leadStatus.toUpperCase()) : leadSelectedStatus;
      changeStatus(newLeadstatus, 'LEAD');
    }
    if (companyStatus || companySelectedStatus) {
      var newCompanyStatus = companyStatus ? "COMPANY__STATUS__".concat(companyStatus.toUpperCase()) : companySelectedStatus;
      changeStatus(newCompanyStatus, 'COMPANY');
    }
  }, [lead === null || lead === void 0 ? void 0 : (_lead$id = lead.id) === null || _lead$id === void 0 ? void 0 : _lead$id.objectId, company === null || company === void 0 ? void 0 : (_company$id = company.id) === null || _company$id === void 0 ? void 0 : _company$id.objectId]);
  useEffect(function () {
    var companyStatusLogicRole = getLogicRoleFromMachineValue(machineStatus.company.toUpperCase(), 'company');
    var leadStatusLogicRole = getLogicRoleFromMachineValue(machineStatus.lead.toUpperCase(), 'lead');
    if (companyStatusLogicRole === COMPANY_STATUS_LOGIC_ROLE.NURTURING || companyStatusLogicRole === COMPANY_STATUS_LOGIC_ROLE.DISCARDED) {
      //@ts-ignore
      var reasonsField = reasons === null || reasons === void 0 ? void 0 : reasons.data.find(function (reason) {
        var _machineStatus$compan;
        return (reason === null || reason === void 0 ? void 0 : reason.logicRole) === "COMPANY__".concat((_machineStatus$compan = machineStatus.company) === null || _machineStatus$compan === void 0 ? void 0 : _machineStatus$compan.toUpperCase(), "_REASONS");
      });
      if (reasonsField) {
        setSelectedCompanyReasons(reasonsField.fieldValues);
      }
    }
    if (leadStatusLogicRole === LEAD_STATUS_LOGIC_ROLE.NURTURING || leadStatusLogicRole === LEAD_STATUS_LOGIC_ROLE.DISCARDED) {
      //@ts-ignore
      var _reasonsField = reasons === null || reasons === void 0 ? void 0 : reasons.data.find(function (reason) {
        var _machineStatus$lead;
        return (reason === null || reason === void 0 ? void 0 : reason.logicRole) === "LEAD__".concat((_machineStatus$lead = machineStatus.lead) === null || _machineStatus$lead === void 0 ? void 0 : _machineStatus$lead.toUpperCase(), "_REASONS");
      });
      if (_reasonsField) {
        setSelectedLeadReasons(_reasonsField.fieldValues);
      }
    }
  }, [machineStatus, reasons]);
  useEffect(function () {
    var companyReasonToDiscard;
    var leadReasonToDiscard;
    if ((selectedCompanyReasons === null || selectedCompanyReasons === void 0 ? void 0 : selectedCompanyReasons.length) > 0) {
      companyReasonToDiscard = {
        companyReasonToDiscard: selectedCompanyReasons[0]
      };
    }
    if ((selectedLeadReasons === null || selectedLeadReasons === void 0 ? void 0 : selectedLeadReasons.length) > 0) {
      leadReasonToDiscard = {
        leadReasonToDiscard: selectedLeadReasons[0]
      };
    }
    setChangeStatusStepData(_objectSpread$3(_objectSpread$3(_objectSpread$3({}, changeStatusStepData), companyReasonToDiscard), leadReasonToDiscard));
  }, [selectedCompanyReasons, selectedLeadReasons]);
  var save = function save(id, status, entity, reasonToDiscard) {
    var prefix = "".concat(entity === null || entity === void 0 ? void 0 : entity.toUpperCase(), "__STATUS");
    var data = _defineProperty$3({}, prefix, "".concat(prefix, "__").concat(status));
    if (reasonToDiscard && (status === 'NURTURING' || status === 'DISCARDED')) {
      data = _objectSpread$3(_objectSpread$3({}, data), {}, _defineProperty$3({}, "".concat(entity === null || entity === void 0 ? void 0 : entity.toUpperCase(), "__").concat(status, "_REASONS"), reasonToDiscard.value));
    }
    updateEntity(id, data, entity).then(function () {
      window.dispatchEvent(new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
        detail: {
          type: entity
        }
      }));
    });
  };
  var saveAndClose = function saveAndClose() {
    var _settings$settings;
    var leadStatus = machineStatus.lead.toUpperCase();
    var companyStatus = machineStatus.company.toUpperCase();
    if (hasLead) {
      save(lead === null || lead === void 0 ? void 0 : lead.id, leadStatus, 'Lead', changeStatusStepData.leadReasonToDiscard);
    }
    if (hasCompany && company) {
      save(company === null || company === void 0 ? void 0 : company.id, companyStatus, 'Company', changeStatusStepData.companyReasonToDiscard);
    }
    //TODO important
    // if (trigger === 'REPORT_RESULT') {
    //   if (Array.isArray(activityId)) {
    //     bulkReportedActivityResult({
    //       valueLogicRole: REPORTED_VALUES_LOGIC_ROLE.YES,
    //       activitiesId: activityId,
    //     });
    //   } else {
    //     reportedActivityResult({ valueLogicRole: REPORTED_VALUES_LOGIC_ROLE.YES, activityId });
    //   }
    // }

    var isMeeting = [companyStatus, leadStatus].includes('MEETING');
    if (settings !== null && settings !== void 0 && (_settings$settings = settings.settings) !== null && _settings$settings !== void 0 && _settings$settings.endCCFAtStatus && isMeeting) {
      handleClose();
      createToast({
        message: t('toasts.success'),
        type: 'success'
      });
    } else {
      handleNext(companyStatus, leadStatus);
    }
  };
  var leadStatusSelected = leadStatuses.find(function (leadStatus) {
    return leadStatus.logicRole === "LEAD__STATUS__".concat(machineStatus.lead.toUpperCase());
  });
  var renderSelectedStatus = function renderSelectedStatus(selectedStatus, statuses) {
    var regex = new RegExp("(.*)__".concat(selectedStatus === null || selectedStatus === void 0 ? void 0 : selectedStatus.toUpperCase(), "$"), 'g');
    var statusObj = statuses.find(function (status) {
      return status === null || status === void 0 ? void 0 : status.logicRole.match(regex);
    });
    var style = {
      backgroundColor: statusObj === null || statusObj === void 0 ? void 0 : statusObj.backgroundColor,
      borderColor: statusObj === null || statusObj === void 0 ? void 0 : statusObj.outlineColor,
      color: statusObj === null || statusObj === void 0 ? void 0 : statusObj.textColor
    };
    return /*#__PURE__*/jsx(Label, {
      overrideStyle: style,
      children: selectedStatus.replace('_', ' ')
    });
  };
  var leadInfoClasses = classnames(_defineProperty$3(_defineProperty$3({}, styles$5._lead_with_company_container, hasCompany), styles$5._lead_info_container, !hasCompany));
  var titleWrapperClasses = classnames(styles$5._title__wrapper, _defineProperty$3({}, styles$5._title__wrapper__centered, !hasCompany));
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(ModalContent, {
      children: /*#__PURE__*/jsxs("div", {
        className: styles$5.container,
        children: [/*#__PURE__*/jsx("div", {
          className: styles$5._section__wrapper,
          children: /*#__PURE__*/jsxs("div", {
            className: styles$5._content__wrapper,
            children: [hasLead && /*#__PURE__*/jsxs("div", {
              className: styles$5._change_lead_status__wrapper,
              children: [/*#__PURE__*/jsxs("div", {
                className: leadInfoClasses,
                children: [/*#__PURE__*/jsxs("div", {
                  className: classnames(styles$5._name__wrapper, _defineProperty$3({}, styles$5._single_entity, !hasCompany)),
                  children: [/*#__PURE__*/jsx(Icon, {
                    color: "verySoftPeanut",
                    name: "person"
                  }), /*#__PURE__*/jsx(Text, {
                    size: "m",
                    color: "peanut",
                    children: leadName
                  })]
                }), /*#__PURE__*/jsx("div", {
                  className: styles$5._currentStatus__wrapper,
                  children: renderSelectedStatus(machineStatus.lead, leadStatuses)
                })]
              }), /*#__PURE__*/jsx("div", {
                className: styles$5._radios_list_status,
                children: /*#__PURE__*/jsx(RadioGroup, {
                  value: leadStatusSelected
                  //@ts-ignore
                  ,
                  onChange: function onChange(selectedStatus) {
                    var logicRole = selectedStatus === null || selectedStatus === void 0 ? void 0 : selectedStatus.logicRole;
                    setChangeStatusStepData(_objectSpread$3(_objectSpread$3({}, changeStatusStepData), {}, {
                      leadReasonToDiscard: null,
                      leadStatus: logicRole === null || logicRole === void 0 ? void 0 : logicRole.split('__')[2].toLowerCase()
                    }));
                    changeStatus(logicRole, 'LEAD');
                  },
                  children: leadStatuses.map(function (status) {
                    return /*#__PURE__*/jsx(Radio, {
                      dataTest: "LeadStatus-".concat(status.name),
                      size: "medium",
                      value: status,
                      children: status.logicRole === 'LEAD__STATUS__CONTACT' && !enabledObjectCreation ? t("leadStatusTexts.LEAD__STATUS__CONTACT_NO_CREATE_LEAD") : t("leadStatusTexts.".concat(status.logicRole))
                    }, "lead-status-".concat(status.name));
                  })
                })
              })]
            }), hasCompany && /*#__PURE__*/jsxs("div", {
              className: styles$5._change_company_status__wrapper,
              children: [/*#__PURE__*/jsxs("div", {
                className: classnames(styles$5._name__wrapper, _defineProperty$3({}, styles$5._single_entity, !hasLead)),
                children: [/*#__PURE__*/jsx(Icon, {
                  color: "verySoftPeanut",
                  name: "company"
                }), /*#__PURE__*/jsx(Text, {
                  dataTest: "Text-Modal-StatusUpdate",
                  size: "m",
                  color: "peanut",
                  children: companyName
                })]
              }), /*#__PURE__*/jsx("div", {
                className: styles$5._currentStatus__wrapper,
                children: renderSelectedStatus(machineStatus.company, companyStatuses)
              }), /*#__PURE__*/jsx("div", {
                className: styles$5._list_status,
                children: companyStatuses.map(function (status) {
                  var regex = new RegExp(machineStatus.company, 'gi');
                  var isSelected = status.logicRole.match(regex);
                  var style = {
                    backgroundColor: status.backgroundColor,
                    borderColor: status.outlineColor,
                    color: status.textColor
                  };
                  var overrideStyle = isSelected ? {
                    selectedStyle: style
                  } : null;
                  return /*#__PURE__*/jsx(Tooltip, {
                    title: t("tooltipDictionary.".concat(tooltipKeys.includes(status.logicRole) ? status.logicRole : 'HEADER_TEXT')),
                    position: "top",
                    children: /*#__PURE__*/jsx(Label, _objectSpread$3(_objectSpread$3({
                      value: status.logicRole,
                      dataTest: status.logicRole,
                      align: "center",
                      inline: false,
                      onClick: function onClick(value) {
                        setChangeStatusStepData(_objectSpread$3(_objectSpread$3({}, changeStatusStepData), {}, {
                          companyReasonToDiscard: null,
                          companyStatus: value === null || value === void 0 ? void 0 : value.split('__')[2].toLowerCase()
                        }));
                        changeStatus(value, 'COMPANY');
                      }
                      /*@ts-ignore*/,
                      selected: isSelected,
                      hoverStyle: style
                    }, overrideStyle), {}, {
                      children: status.name
                    }), "company-status-".concat(status.name))
                  }, "company-status-tooltip-".concat(status.name));
                })
              })]
            })]
          })
        }), (isNurturing || isDiscarded) && /*#__PURE__*/jsxs("div", {
          className: styles$5._section__wrapper,
          children: [/*#__PURE__*/jsx("div", {
            className: titleWrapperClasses,
            children: /*#__PURE__*/jsx(Text, {
              size: "s",
              weight: "bold",
              color: "peanut",
              children: t('whatReason')
            })
          }), /*#__PURE__*/jsxs("div", {
            className: styles$5._content__wrapper,
            children: [hasLead && /*#__PURE__*/jsx("div", {
              className: styles$5._reason__wrapper,
              children: (machineStatus.lead === 'nurturing' || machineStatus.lead === 'discarded') && selectedLeadReasons && /*#__PURE__*/jsx(Select, {
                value: (changeStatusStepData === null || changeStatusStepData === void 0 ? void 0 : (_changeStatusStepData = changeStatusStepData.leadReasonToDiscard) === null || _changeStatusStepData === void 0 ? void 0 : _changeStatusStepData.value) || ((_selectedLeadReasons$ = selectedLeadReasons[0]) === null || _selectedLeadReasons$ === void 0 ? void 0 : _selectedLeadReasons$.value),
                placeholder: t('placeholder', {
                  lead: capitalize(bobjectT('lead')),
                  status: machineStatus.lead.toLowerCase()
                }),
                width: "100%",
                size: "small",
                borderless: false,
                children: selectedLeadReasons.map(function (reason) {
                  return /*#__PURE__*/jsx(Item, {
                    value: reason.value,
                    onClick: function onClick() {
                      setChangeStatusStepData(_objectSpread$3(_objectSpread$3({}, changeStatusStepData), {}, {
                        leadReasonToDiscard: reason
                      }));
                    },
                    children: reason.label
                  }, "lead-reason-item-".concat(reason.value));
                })
              })
            }), hasCompany && /*#__PURE__*/jsx("div", {
              className: styles$5._reason__wrapper,
              children: (machineStatus.company === 'nurturing' || machineStatus.company === 'discarded') && selectedCompanyReasons && /*#__PURE__*/jsx(Select, {
                value: (changeStatusStepData === null || changeStatusStepData === void 0 ? void 0 : (_changeStatusStepData2 = changeStatusStepData.companyReasonToDiscard) === null || _changeStatusStepData2 === void 0 ? void 0 : _changeStatusStepData2.value) || ((_selectedCompanyReaso = selectedCompanyReasons[0]) === null || _selectedCompanyReaso === void 0 ? void 0 : _selectedCompanyReaso.value),
                placeholder: t('placeholder', {
                  lead: capitalize(bobjectT('company')),
                  status: machineStatus.company.toLowerCase()
                }),
                width: "100%",
                children: selectedCompanyReasons.map(function (reason) {
                  return /*#__PURE__*/jsx(Item, {
                    value: reason.value,
                    onClick: function onClick() {
                      setChangeStatusStepData(_objectSpread$3(_objectSpread$3({}, changeStatusStepData), {}, {
                        companyReasonToDiscard: reason
                      }));
                    },
                    children: reason.label
                  }, "company-reason-item-".concat(reason.value));
                })
              })
            })]
          })]
        }), COMPANY_STATUSES_WITH_MESSAGE.includes(machineStatus.company) && hasCompany && /*#__PURE__*/jsx("div", {
          className: styles$5._warning__wrapper,
          children: /*#__PURE__*/jsx(Callout, {
            variant: "alert",
            icon: "cadence",
            width: "100%",
            children: /*#__PURE__*/jsx(Trans, {
              i18nKey: "contactFlowModal.changeStatus.companiesStatusMessage"
            })
          })
        })]
      })
    }), /*#__PURE__*/jsx(ModalFooter, {
      children: /*#__PURE__*/jsxs("div", {
        className: styles$5._buttons__wrapper,
        children: [hasPreviousStep && /*#__PURE__*/jsx(Button, {
          variant: "clear",
          onClick: handleClose ,
          className: styles$5.back_button,
          children: t('cancel') 
        }), showSkipButton && !isReportResultTrigger && /*#__PURE__*/jsx(Button, {
          variant: "secondary",
          onClick: function onClick() {
            return handleSkip(openCadenceControlOnClose);
          },
          className: styles$5.skip_button,
          children: t('skip')
        }), /*#__PURE__*/jsx(Button, {
          dataTest: "Form-Save",
          onClick: saveAndClose,
          children: machineStatus.company === 'discarded' || !hasCompany && machineStatus.lead === 'discarded' ? (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.nextButtonTitle) || t('save') : (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.nextButtonAlternativeTitle) || t('saveAndContinue')
        })]
      })
    })]
  });
};

var css_248z$4 = ".loadingStep-module_content__EFztf {\n  min-height: 300px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n";
var styles$4 = {"content":"loadingStep-module_content__EFztf"};
styleInject(css_248z$4);

var LoadingStep = function LoadingStep() {
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsx(ModalContent, {
      children: /*#__PURE__*/jsx("div", {
        className: styles$4.content,
        children: /*#__PURE__*/jsx(Spinner, {
          name: "loadingCircle"
        })
      })
    })
  });
};

var css_248z$3 = ".qualifyingQuestionPlaceholder-module_list__DvfG0 {\n  margin-top: 32px;\n}\n\n.qualifyingQuestionPlaceholder-module_question__1f5DN {\n  margin-bottom: 32px;\n}\n\n.qualifyingQuestionPlaceholder-module_questionTitle__lgFYN {\n  margin-bottom: 10px;\n}\n\n.qualifyingQuestionPlaceholder-module__fade_enter__OzyXr {\n  opacity: 0;\n}\n.qualifyingQuestionPlaceholder-module__fade_enter_active__g1SP- {\n  opacity: 1;\n  transition: opacity 300ms;\n}\n\n.qualifyingQuestionPlaceholder-module__fade_exit__BfB9H {\n  opacity: 1;\n}\n.qualifyingQuestionPlaceholder-module__fade_exit_active__iFpsw {\n  opacity: 0;\n  transition: opacity 300ms;\n}\n";
var styles$3 = {"list":"qualifyingQuestionPlaceholder-module_list__DvfG0","question":"qualifyingQuestionPlaceholder-module_question__1f5DN","questionTitle":"qualifyingQuestionPlaceholder-module_questionTitle__lgFYN","_fade_enter":"qualifyingQuestionPlaceholder-module__fade_enter__OzyXr","_fade_enter_active":"qualifyingQuestionPlaceholder-module__fade_enter_active__g1SP-","_fade_exit":"qualifyingQuestionPlaceholder-module__fade_exit__BfB9H","_fade_exit_active":"qualifyingQuestionPlaceholder-module__fade_exit_active__iFpsw"};
styleInject(css_248z$3);

var classNames = {
  fade: {
    appear: styles$3._fade_enter,
    appearActive: styles$3._fade_enter_active,
    enter: styles$3._fade_enter,
    enterActive: styles$3._fade_enter_active,
    exit: styles$3._fade_exit,
    exitActive: styles$3._fade_exit_active
  }
};
var Transition = function Transition(_ref) {
  var children = _ref.children,
    visible = _ref.visible,
    type = _ref.type;
  return /*#__PURE__*/jsx(CSSTransition, {
    appear: true,
    "in": visible,
    unmountOnExit: true,
    timeout: 300,
    classNames: classNames[type],
    children: children
  });
};
var QualifiyingQuestionSkeleton = function QualifiyingQuestionSkeleton(_ref2) {
  var width = _ref2.width;
  return /*#__PURE__*/jsxs("div", {
    className: styles$3.question,
    children: [/*#__PURE__*/jsx("header", {
      className: styles$3.questionTitle,
      children: /*#__PURE__*/jsx(Skeleton, {
        variant: "text",
        width: 250,
        height: 24
      })
    }), /*#__PURE__*/jsx(Skeleton, {
      variant: "rect",
      width: width,
      height: 50
    })]
  });
};
var QualifiyingQuestionsPlaceholder = function QualifiyingQuestionsPlaceholder(_ref3) {
  var _ref3$width = _ref3.width,
    width = _ref3$width === void 0 ? 480 : _ref3$width;
  return /*#__PURE__*/jsx(Transition, {
    type: "fade",
    visible: true,
    children: /*#__PURE__*/jsx("div", {
      className: styles$3.list,
      children: range(10).map(function (number) {
        return /*#__PURE__*/jsx(React.Fragment, {
          children: /*#__PURE__*/jsx(QualifiyingQuestionSkeleton, {
            width: width
          })
        }, number);
      })
    })
  });
};

var css_248z$2 = ".notesAndQQ-module__content__wrapper__T8NEf {\n  display: flex;\n  gap: 56px;\n  max-height: 436px;\n  align-items: start;\n  overscroll-behavior-y: contain;\n  height: 100%;\n}\n\n.notesAndQQ-module__textarea__wrapper__Q4of2 {\n  margin-bottom: 72px;\n  width: 100%;\n}\n\n.notesAndQQ-module__content__wrapper__T8NEf > section {\n  flex-shrink: 0;\n  flex-grow: 1;\n  margin-bottom: 0;\n  display: flex;\n}\n\n.notesAndQQ-module__section__wrapper__bU3Ax {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  overflow-x: hidden;\n  flex-grow: 0;\n  padding: 24px 0;\n}\n\n.notesAndQQ-module__section__wrapper__bU3Ax input,\n.notesAndQQ-module__section__wrapper__bU3Ax input:hover,\n.notesAndQQ-module__section__wrapper__bU3Ax input:focus {\n  border: none;\n  box-shadow: none;\n  outline: none;\n}\n\n.notesAndQQ-module__section__wrapper__bU3Ax > *:first-child > header {\n  margin-top: 0;\n}\n\n.notesAndQQ-module__full_section__euukz {\n  width: 100%;\n}\n\n.notesAndQQ-module__note__FsZz0 {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  border-radius: 4px;\n  border: 1px solid var(--softPeanut);\n  height: 100%;\n  max-height: 100%;\n}\n\n.notesAndQQ-module_editorContent__Xviqx {\n  overflow-y: auto;\n  overflow-x: hidden;\n  padding-top: 12px;\n  padding-bottom: 12px;\n  flex-grow: 1;\n}\n\n.notesAndQQ-module_column__V-pxk {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  max-width: 345px;\n}\n\n.notesAndQQ-module_sectionHeader__8mURd {\n  display: flex;\n  gap: 8px;\n  padding-bottom: 8px;\n  border-bottom: 1px solid var(--verySoftPeanut);\n}\n\n.notesAndQQ-module_toolbar__yuSpt > div {\n  border-radius: 0 0 4px 4px;\n}\n\n.notesAndQQ-module_column__V-pxk:first-of-type > div {\n  padding-bottom: 0;\n}\n\n.notesAndQQ-module_wrapper__00V15 > main {\n  height: calc(100% - 74px);\n}\n\n.notesAndQQ-module_wrapper__00V15 > main > div {\n  height: 100%;\n}\n\n.notesAndQQ-module_skip_button__tMLIV {\n  margin-left: auto;\n  margin-right: 16px;\n}\n\n.notesAndQQ-module_back_button__k-uqx {\n  margin-left: 0;\n  margin-right: auto;\n}\n";
var styles$2 = {"_content__wrapper":"notesAndQQ-module__content__wrapper__T8NEf","_textarea__wrapper":"notesAndQQ-module__textarea__wrapper__Q4of2","_section__wrapper":"notesAndQQ-module__section__wrapper__bU3Ax","_full_section":"notesAndQQ-module__full_section__euukz","_note":"notesAndQQ-module__note__FsZz0","editorContent":"notesAndQQ-module_editorContent__Xviqx","column":"notesAndQQ-module_column__V-pxk","sectionHeader":"notesAndQQ-module_sectionHeader__8mURd","toolbar":"notesAndQQ-module_toolbar__yuSpt","wrapper":"notesAndQQ-module_wrapper__00V15","skip_button":"notesAndQQ-module_skip_button__tMLIV","back_button":"notesAndQQ-module_back_button__k-uqx"};
styleInject(css_248z$2);

var css_248z$1 = ".qualifyingQuestion-module_header__NxGTz {\n  display: flex;\n  margin-bottom: 10px;\n  margin-top: 16px;\n  align-items: center;\n}\n\n.qualifyingQuestion-module_header__NxGTz > p {\n  overflow-x: hidden;\n  overflow-y: hidden;\n  text-overflow: ellipsis;\n  max-width: 280px;\n  white-space: nowrap;\n}\n\n.qualifyingQuestion-module_headerIcon__AsGeB {\n  margin-right: 10px;\n  flex-shrink: 0;\n}\n";
var styles$1 = {"header":"qualifyingQuestion-module_header__NxGTz","headerIcon":"qualifyingQuestion-module_headerIcon__AsGeB"};
styleInject(css_248z$1);

function _slicedToArray$3(arr, i) { return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3(); }
function _nonIterableRest$3() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }
function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$3(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$3(arr) { if (Array.isArray(arr)) return arr; }
var QualifyingQuestion = function QualifyingQuestion(_ref) {
  var type = _ref.type,
    disabled = _ref.disabled,
    value = _ref.value,
    question = _ref.question,
    answers = _ref.answers,
    _onChange = _ref.onChange;
  var _useState = useState(value),
    _useState2 = _slicedToArray$3(_useState, 2),
    internalValue = _useState2[0],
    setInternalValue = _useState2[1];
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'contactFlowModal.notesAndQQ'
    }),
    t = _useTranslation.t;
  useEffect(function () {
    var isPicklist = type === 'GLOBAL_PICKLIST' || type === 'MULTI_GLOBAL_PICKLIST';
    setInternalValue(isPicklist ? value || 'none' : value);
  }, []);
  return /*#__PURE__*/jsxs("div", {
    children: [/*#__PURE__*/jsxs("header", {
      className: styles$1.header,
      children: [/*#__PURE__*/jsx(Icon, {
        className: styles$1.headerIcon,
        name: "chatSupport",
        color: "softPeanut"
      }), /*#__PURE__*/jsx(Text, {
        size: "s",
        color: "peanut",
        children: question
      })]
    }), type === 'TEXT' && /*#__PURE__*/jsx(Input, {
      disabled: disabled,
      width: "100%",
      value: internalValue,
      onChange: function onChange(newValue) {
        _onChange(newValue);
        setInternalValue(newValue);
      }
    }), type === 'GLOBAL_PICKLIST' && /*#__PURE__*/jsxs(Select, {
      disabled: disabled,
      width: "100%",
      value: internalValue,
      onChange: function onChange(newValue) {
        _onChange(newValue);
        setInternalValue(newValue);
      },
      autocomplete: answers.length > 6,
      children: [/*#__PURE__*/jsx(Item, {
        value: "none",
        children: t('none')
      }), answers.map(function (answer) {
        return /*#__PURE__*/jsx(Item, {
          hidden: !answer.enabled,
          value: answer.id,
          label: answer.value,
          children: answer.value
        }, answer.id);
      })]
    }), type === 'MULTI_GLOBAL_PICKLIST' && /*#__PURE__*/jsxs(MultiSelect, {
      autocomplete: answers.length > 6,
      size: "medium",
      value: internalValue,
      onChange: function onChange(newValue) {
        _onChange(newValue);
        setInternalValue(newValue);
      },
      width: "100%",
      selectAllOption: true,
      children: [/*#__PURE__*/jsx(CheckItem, {
        value: "",
        children: t('none')
      }), answers.map(function (answer) {
        return /*#__PURE__*/jsx(CheckItem, {
          dataTest: answer.value,
          value: answer.id,
          label: answer.value,
          children: answer.value
        }, answer.value);
      })]
    })]
  });
};

function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
var _excluded$2 = ["id"];
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$2(arr); }
function _objectWithoutProperties$2(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$2(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$2(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty$2(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$2(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(arg) { var key = _toPrimitive$2(arg, "string"); return _typeof$2(key) === "symbol" ? key : String(key); }
function _toPrimitive$2(input, hint) { if (_typeof$2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2(); }
function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$2(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }
function NoteRichTextEditor(_ref) {
  var note = _ref.note,
    onChange = _ref.onChange;
  var plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true
  });
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'contactFlowModal.notesAndQQ'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsx("div", {
    className: styles$2._note,
    children: /*#__PURE__*/jsx(RichTextEditor, {
      defaultValue: note,
      plugins: plugins,
      placeholder: t('notePlaceholder'),
      onChange: onChange,
      style: {
        padding: '12px 28px 4px 28px'
      },
      children: function children(editor) {
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx("div", {
            className: styles$2.editorContent,
            children: editor
          }), /*#__PURE__*/jsx("div", {
            className: styles$2.toolbar,
            children: /*#__PURE__*/jsxs(EditorToolbar, {
              backgroundColor: "white",
              children: [/*#__PURE__*/jsx(EditorToolbarControlsSection, {
                color: "peanut"
              }), /*#__PURE__*/jsx(EditorToolbarFontStylesSection, {
                color: "peanut"
              }), /*#__PURE__*/jsx(EditorToolbarTextMarksSection, {
                color: "peanut"
              }), /*#__PURE__*/jsx(EditorToolbarListsSection, {
                color: "peanut"
              })]
            })
          })]
        });
      }
    })
  });
}
var NoteAndQQ = function NoteAndQQ(_ref2) {
  var handleNext = _ref2.handleNext,
    handleBack = _ref2.handleBack,
    handleSkip = _ref2.handleSkip;
  var _useContactFlow = useContactFlow(),
    activity = _useContactFlow.activity,
    referenceBobject = _useContactFlow.referenceBobject,
    activityLead = _useContactFlow.activityLead,
    noteStepData = _useContactFlow.noteStepData,
    setNoteStepData = _useContactFlow.setNoteStepData,
    buttonStepConfig = _useContactFlow.buttonStepConfig;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'contactFlowModal.notesAndQQ'
    }),
    t = _useTranslation2.t;
  var _useContactFlowData = useContactFlowData(),
    handleSubmit = _useContactFlowData.handleSubmit;
  var _useState = useState([]),
    _useState2 = _slicedToArray$2(_useState, 2),
    qualifyingQuestionsToSave = _useState2[0],
    setQualifyingQuestionsToSave = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$2(_useState3, 2),
    isSubmitting = _useState4[0],
    setIsSubmitting = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray$2(_useState5, 2),
    hasChanges = _useState6[0],
    setHasChanges = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray$2(_useState7, 2),
    isAST = _useState8[0],
    setIsAST = _useState8[1];
  var stage = TemplateStage.Prospecting;
  var bobjectType = !activityLead ? 'Company' : 'Lead';
  //const messagingFilters = useMessagingFilterOptions(stage);
  //const [alreadySelected, setAlreadySelected] = useState(false);
  //const [segmentationValues, setSegmentationValues] = useState({});
  //const { settings, mutate: reloadUserSettings } = useActiveUserSettings();
  var _useQualifyingQuestio = useQualifyingQuestions({
      enabled: true,
      stage: stage,
      segmentationValues: {},
      bobjectType: bobjectType
    }),
    isLoading = _useQualifyingQuestio.isLoading,
    qualifyingQuestions = _useQualifyingQuestio.qualifyingQuestions,
    updateQualifyingQuestionsValue = _useQualifyingQuestio.updateQualifyingQuestionsValue;
  var showSkipButton = (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.showSkipButton) != undefined ? buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.showSkipButton : false;
  var hasPreviousStep = (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.hasPreviousStep) != undefined ? buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.hasPreviousStep : true;
  var openCadenceControlOnClose = (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.openCadenceOnSkip) != undefined ? buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.openCadenceOnSkip : false;
  var plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true
  });
  useEffect(function () {
    if (activity && !noteStepData) {
      var noteField = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
      if (isHtml(noteField === null || noteField === void 0 ? void 0 : noteField.value)) {
        setNoteStepData({
          value: deserialize(noteField === null || noteField === void 0 ? void 0 : noteField.value, {
            format: 'HTML',
            plugins: plugins
          }),
          fieldId: noteField === null || noteField === void 0 ? void 0 : noteField.name
        });
        setIsAST(true);
      } else {
        setNoteStepData({
          value: noteField.text,
          fieldId: noteField.name
        });
      }
    }
  }, [activity]);

  /* useEffect(() => {
    if (!alreadySelected) {
      const newFiltersValue = {};
      messagingFilters.forEach(filter => {
        const companyField = getFieldById(activityCompany, filter.id)?.value;
        const leadField = getFieldById(activityLead, filter.id)?.value;
        const value = companyField || leadField;
        if (value) {
          newFiltersValue[filter.id] = [value];
        }
      });
       // Prevent qualifying question from updating the filters
      if (Object.keys(newFiltersValue).length !== 0) {
        setAlreadySelected(true);
      }
       setSegmentationValues(newFiltersValue);
    }
  }, [activityCompany, activityLead, messagingFilters.length]);*/

  var saveAndNext = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var data;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setIsSubmitting(true);
            if (noteStepData !== null && noteStepData !== void 0 && noteStepData.value) {
              data = _defineProperty$2({}, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE, isAST ? serialize(noteStepData === null || noteStepData === void 0 ? void 0 : noteStepData.value, {
                format: 'AST',
                plugins: plugins
              }) : noteStepData === null || noteStepData === void 0 ? void 0 : noteStepData.value);
              handleSubmit({
                activity: activity,
                data: data
              });
            }
            if ((qualifyingQuestionsToSave === null || qualifyingQuestionsToSave === void 0 ? void 0 : qualifyingQuestionsToSave.length) > 0) {
              updateQualifyingQuestionsValue(referenceBobject, qualifyingQuestionsToSave).then(function () {
                setIsSubmitting(false);
                setHasChanges(false);
              });
            }
            handleNext();
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function saveAndNext() {
      return _ref3.apply(this, arguments);
    };
  }();
  var textarea = isAST ? /*#__PURE__*/jsx(NoteRichTextEditor, {
    note: noteStepData === null || noteStepData === void 0 ? void 0 : noteStepData.value,
    onChange: function onChange(value) {
      return setNoteStepData(_objectSpread$2(_objectSpread$2({}, noteStepData), {}, {
        value: value
      }));
    }
  }) : /*#__PURE__*/jsx(TextArea, {
    value: noteStepData === null || noteStepData === void 0 ? void 0 : noteStepData.value,
    rows: 15,
    placeholder: !(noteStepData !== null && noteStepData !== void 0 && noteStepData.value) ? t('addNote') : null,
    width: "100%",
    onChange: function onChange(value) {
      return setNoteStepData(_objectSpread$2(_objectSpread$2({}, noteStepData), {}, {
        value: value
      }));
    }
  });
  return /*#__PURE__*/jsxs("div", {
    className: styles$2.wrapper,
    children: [/*#__PURE__*/jsx(ModalContent, {
      children: /*#__PURE__*/jsx("div", {
        "data-test": "Text-Modal-Note&QQ",
        className: styles$2._content__wrapper,
        children: /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsxs("section", {
            className: styles$2.column,
            children: [/*#__PURE__*/jsxs("header", {
              className: styles$2.sectionHeader,
              children: [/*#__PURE__*/jsx(Icon, {
                name: "chat",
                size: 24,
                color: "softPeanut"
              }), /*#__PURE__*/jsx(Text, {
                size: "m",
                color: "softPeanut",
                weight: "medium",
                htmlTag: "h2",
                children: t('title')
              })]
            }), /*#__PURE__*/jsx("div", {
              className: styles$2._section__wrapper,
              children: textarea
            })]
          }), /*#__PURE__*/jsxs("section", {
            className: styles$2.column,
            children: [/*#__PURE__*/jsxs("header", {
              className: styles$2.sectionHeader,
              children: [/*#__PURE__*/jsx(Icon, {
                name: "chat",
                size: 24,
                color: "softPeanut"
              }), /*#__PURE__*/jsx(Text, {
                size: "m",
                color: "softPeanut",
                weight: "medium",
                htmlTag: "h2",
                children: t('fillQQ')
              })]
            }), /*#__PURE__*/jsx("div", {
              className: styles$2._section__wrapper,
              children: isLoading ? /*#__PURE__*/jsx(QualifiyingQuestionsPlaceholder, {
                width: 400
              }) : /*#__PURE__*/jsx(Fragment, {
                children: sortBy(qualifyingQuestions, 'question').map(function (_ref4) {
                  var _referenceBobject$raw, _referenceBobject$raw2, _referenceBobject$raw3, _qualifyingQuestionsT;
                  var id = _ref4.id,
                    props = _objectWithoutProperties$2(_ref4, _excluded$2);
                  var qqFieldValue = referenceBobject !== null && referenceBobject !== void 0 && referenceBobject.rawBobject ? (_referenceBobject$raw = referenceBobject.rawBobject) === null || _referenceBobject$raw === void 0 ? void 0 : _referenceBobject$raw[id] : //@ts-ignore
                  referenceBobject === null || referenceBobject === void 0 ? void 0 : (_referenceBobject$raw2 = referenceBobject.raw) === null || _referenceBobject$raw2 === void 0 ? void 0 : (_referenceBobject$raw3 = _referenceBobject$raw2.contents) === null || _referenceBobject$raw3 === void 0 ? void 0 : _referenceBobject$raw3[id];
                  var currentValue = (_qualifyingQuestionsT = qualifyingQuestionsToSave.find(function (_ref5) {
                    var qqId = _ref5.id;
                    return qqId === id;
                  })) === null || _qualifyingQuestionsT === void 0 ? void 0 : _qualifyingQuestionsT.value;
                  var qqValue = currentValue || qqFieldValue;
                  return /*#__PURE__*/createElement(QualifyingQuestion, _objectSpread$2(_objectSpread$2({}, props), {}, {
                    key: id,
                    value: qqValue,
                    onChange: function onChange(value) {
                      var _referenceBobject$id;
                      var shouldRemoveQQToSave = (qqFieldValue || '') === value;
                      var qqCleaned = qualifyingQuestionsToSave.filter(function (_ref6) {
                        var qqId = _ref6.id;
                        return qqId !== id;
                      });
                      var qqToSave = shouldRemoveQQToSave ? qqCleaned : [].concat(_toConsumableArray(qqCleaned), [{
                        id: id,
                        value: value,
                        bobjectId: referenceBobject === null || referenceBobject === void 0 ? void 0 : (_referenceBobject$id = referenceBobject.id) === null || _referenceBobject$id === void 0 ? void 0 : _referenceBobject$id.objectId
                      }]);
                      setQualifyingQuestionsToSave(qqToSave);
                      if (!hasChanges) {
                        setHasChanges(true);
                      }
                      if (qqToSave.length === 0) {
                        setHasChanges(false);
                      }
                    }
                  }));
                })
              })
            })]
          })]
        })
      })
    }), /*#__PURE__*/jsxs(ModalFooter, {
      children: [hasPreviousStep && /*#__PURE__*/jsx(Button, {
        variant: "clear",
        onClick: function onClick() {
          setHasChanges(false);
          setQualifyingQuestionsToSave([]);
          handleBack();
        },
        className: styles$2.back_button,
        children: (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.previousButtonTitle) || t('back')
      }), showSkipButton && /*#__PURE__*/jsx(Button, {
        variant: "secondary",
        onClick: function onClick() {
          return handleSkip(openCadenceControlOnClose);
        },
        className: styles$2.skip_button,
        children: t('skip')
      }), /*#__PURE__*/jsx(Button, {
        dataTest: "Form-Save",
        onClick: saveAndNext,
        children: isSubmitting ? /*#__PURE__*/jsx(Spinner, {
          color: "white",
          size: 14,
          name: "loadingCircle"
        }) : (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.nextButtonTitle) || t('saveAndContinue')
      })]
    })]
  });
};

var ScheduleShortTimes;
(function (ScheduleShortTimes) {
  ScheduleShortTimes["tenMinutes"] = "in_10_minutes";
  ScheduleShortTimes["thirtyMinutes"] = "in_30_minutes";
  ScheduleShortTimes["oneHour"] = "in_1_hour";
  ScheduleShortTimes["twoHours"] = "in_2_hours";
  ScheduleShortTimes["fourHours"] = "in_4_hours";
  ScheduleShortTimes["oneDay"] = "in_1_day";
  ScheduleShortTimes["twoDays"] = "in_2_days";
  ScheduleShortTimes["custom"] = "custom";
})(ScheduleShortTimes || (ScheduleShortTimes = {}));
var Unit;
(function (Unit) {
  Unit["minutes"] = "minutes";
  Unit["hours"] = "hours";
  Unit["days"] = "days";
})(Unit || (Unit = {}));
var ScheduleShortTimesValues = {
  in_10_minutes: {
    unit: 'minutes',
    amount: 10
  },
  in_30_minutes: {
    unit: 'minutes',
    amount: 30
  },
  in_1_hour: {
    unit: 'hours',
    amount: 1
  },
  in_2_hours: {
    unit: 'hours',
    amount: 2
  },
  in_4_hours: {
    unit: 'hours',
    amount: 4
  },
  in_1_day: {
    unit: 'days',
    amount: 1
  },
  in_2_days: {
    unit: 'days',
    amount: 2
  }
};

var css_248z = ".scheduleNextSteps-module_container__2-NhC {\n  border: 1px solid #9ACFFF;\n  box-sizing: border-box;\n  box-shadow: 0 2px 20px rgb(25 145 255 / 15%);\n  border-radius: 8px;\n  background-color: white;\n  width: 320px;\n  animation: scheduleNextSteps-module_floatingMenu-module_popup__v8iVF__3aJXC 150ms ease-in-out;\n  display: inline-block;\n  position: relative;\n  pointer-events: all;\n}\n\n.scheduleNextSteps-module_content_container__gKUZf {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  height: 100%;\n}\n\n.scheduleNextSteps-module_bottom_bar__05inY {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px;\n}\n\n.scheduleNextSteps-module_text__U9MH8 {\n  margin-left: 4px;\n}\n\n.scheduleNextSteps-module_record_related__oqZPk {\n  display: flex;\n  align-items: center;\n}\n\n.scheduleNextSteps-module_editor__nEjEJ {\n  display: flex;\n  flex-direction: column;\n}\n\n.scheduleNextSteps-module_wrapper__eNAUl {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  z-index: 2;\n  pointer-events: none;\n}\n\n.scheduleNextSteps-module_dragging__0B1Iz {\n  pointer-events: unset;\n}\n\n.scheduleNextSteps-module_divider__nguEl {\n  width: 100%;\n  text-align: center;\n  border-top: 1px solid var(--verySoftPeanut);\n  align-self: center;\n}\n\n.scheduleNextSteps-module_bobject_selector__hWQR0 {\n  margin-left: 8px;\n}\n\n.scheduleNextSteps-module_toolbar__tKv23 {\n  border-top: 1px solid var(--verySoftPeanut);\n  border-bottom: 1px solid var(--verySoftPeanut);\n}\n\n.scheduleNextSteps-module_mainNote__7-Sty {\n  margin-right: 4px;\n}\n\n.scheduleNextSteps-module_modal_title__4lk7H {\n  display: flex;\n  margin: 8px 0;\n  align-items: center;\n}\n\n.scheduleNextSteps-module_priorityWrapper__1Vw2x {\n  margin-left: -8px;\n}\n\n.scheduleNextSteps-module_modal_title__4lk7H > * {\n  margin-right: 8px;\n}\n\n.scheduleNextSteps-module_textArea__D10oo {\n  margin: 12px 0;\n  border: none;\n  resize: none;\n  font-family: 'Proxima Nova Soft';\n  max-width: 90%;\n  box-shadow: none;\n  height: 265px;\n}\n\n.scheduleNextSteps-module_textArea__D10oo:focus {\n  outline: none !important;\n  box-shadow: none !important;\n}\n\n.scheduleNextSteps-module_buttonsContainer__SaM6g {\n  display: flex;\n  width: 100%;\n  justify-content: space-between;\n}\n\n.scheduleNextSteps-module_buttonsContainer__SaM6g > div > button {\n  margin-left: 8px;\n}\n\n.scheduleNextSteps-module_taskInfo__9iboV {\n  display: flex;\n  align-items: center;\n  height: 44px;\n}\n\n.scheduleNextSteps-module_taskInfo__9iboV > div {\n  margin-right: 8px;\n}\n\n.scheduleNextSteps-module_taskInfo__9iboV > p {\n  margin-right: 8px;\n}\n\n.scheduleNextSteps-module_assigned_to__88V-1 {\n  align-items: center;\n  height: 44px;\n  margin: 0 38px 0 8px;\n  gap: 4px;\n  display: flex;\n  flex-direction: row;\n}\n\n.scheduleNextSteps-module_taskDate__IL1pz {\n  display: flex;\n}\n\n.scheduleNextSteps-module_dateButton__xaU14 {\n  cursor: pointer;\n}\n\n.scheduleNextSteps-module_relative_date_picker__50Ykb > div > div {\n  padding-left: 0;\n}\n\n.scheduleNextSteps-module_relative_date_picker__50Ykb span[class*='SmallSelect-module_text'] {\n  color: var(--bloobirds) !important;\n}\n\n.scheduleNextSteps-module_relative_date_picker__50Ykb div[class*='SmallSelect-module_adornment'],\n.scheduleNextSteps-module_relative_date_picker__50Ykb svg[class*='SmallSelect-module_chevron'] {\n  display: none;\n}\n\n.scheduleNextSteps-module_skip_button__1Bod5 {\n  margin-left: auto;\n  margin-right: 16px;\n}\n\n.scheduleNextSteps-module_back_button__kePqA {\n  margin-left: 0px;\n  margin-right: auto;\n}\n";
var styles = {"container":"scheduleNextSteps-module_container__2-NhC","floatingMenu-module_popup__v8iVF":"scheduleNextSteps-module_floatingMenu-module_popup__v8iVF__3aJXC","content_container":"scheduleNextSteps-module_content_container__gKUZf","bottom_bar":"scheduleNextSteps-module_bottom_bar__05inY","text":"scheduleNextSteps-module_text__U9MH8","record_related":"scheduleNextSteps-module_record_related__oqZPk","editor":"scheduleNextSteps-module_editor__nEjEJ","wrapper":"scheduleNextSteps-module_wrapper__eNAUl","dragging":"scheduleNextSteps-module_dragging__0B1Iz","divider":"scheduleNextSteps-module_divider__nguEl","bobject_selector":"scheduleNextSteps-module_bobject_selector__hWQR0","toolbar":"scheduleNextSteps-module_toolbar__tKv23","mainNote":"scheduleNextSteps-module_mainNote__7-Sty","modal_title":"scheduleNextSteps-module_modal_title__4lk7H","priorityWrapper":"scheduleNextSteps-module_priorityWrapper__1Vw2x","textArea":"scheduleNextSteps-module_textArea__D10oo","buttonsContainer":"scheduleNextSteps-module_buttonsContainer__SaM6g","taskInfo":"scheduleNextSteps-module_taskInfo__9iboV","assigned_to":"scheduleNextSteps-module_assigned_to__88V-1","taskDate":"scheduleNextSteps-module_taskDate__IL1pz","dateButton":"scheduleNextSteps-module_dateButton__xaU14","relative_date_picker":"scheduleNextSteps-module_relative_date_picker__50Ykb","skip_button":"scheduleNextSteps-module_skip_button__1Bod5","back_button":"scheduleNextSteps-module_back_button__kePqA"};
styleInject(css_248z);

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
var _excluded$1 = ["related"];
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties$1(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$1(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$1(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
var ScheduleNextSteps = function ScheduleNextSteps(_ref) {
  var handleNext = _ref.handleNext,
    handleBack = _ref.handleBack,
    handleSkip = _ref.handleSkip;
  var _useState = useState(false),
    _useState2 = _slicedToArray$1(_useState, 2),
    isSubmitting = _useState2[0],
    setIsSubmitting = _useState2[1];
  var userId = useActiveUserId();
  var _useState3 = useState(userId),
    _useState4 = _slicedToArray$1(_useState3, 2),
    assignedToId = _useState4[0],
    setAssignedToId = _useState4[1];
  var _useContactFlow = useContactFlow(),
    referenceBobject = _useContactFlow.referenceBobject,
    buttonStepConfig = _useContactFlow.buttonStepConfig;
  var _useContactFlowData = useContactFlowData(),
    handleSubmit = _useContactFlowData.handleSubmit;
  var accountId = referenceBobject === null || referenceBobject === void 0 ? void 0 : referenceBobject.id.accountId;
  var _useForm = useForm(),
    control = _useForm.control,
    handleSubmitForm = _useForm.handleSubmit,
    watch = _useForm.watch,
    getValues = _useForm.getValues;
  var bobjectName;
  var bobject = referenceBobject;
  switch (bobject.id.typeName) {
    case 'Company':
      bobjectName = bobject.name;
      break;
    case 'Opportunity':
      bobjectName = bobject.name;
      break;
    case 'Lead':
      bobjectName = bobject.fullName;
      break;
  }
  var _useCustomTasks = useCustomTasks(),
    customTasks = _useCustomTasks.customTasks;
  var handleChangeTaskType = function handleChangeTaskType(value) {
    actionTypeOnChange(value);
    if (!['TASK', 'CALL', 'EMAIL'].includes(value)) {
      var _customTasks$find;
      var customTaskDescription = customTasks === null || customTasks === void 0 ? void 0 : (_customTasks$find = customTasks.find(function (task) {
        return task.id === value;
      })) === null || _customTasks$find === void 0 ? void 0 : _customTasks$find.description;
      if (customTaskDescription) {
        titleField.onChange(customTaskDescription);
      }
    }
  };
  var _useState5 = useState(bobjectName),
    _useState6 = _slicedToArray$1(_useState5, 2),
    bobjectSelectedName = _useState6[0],
    setBobjectSelectedName = _useState6[1];
  var _useUserHelpers = useUserHelpers(),
    get = _useUserHelpers.get,
    saveCustom = _useUserHelpers.saveCustom;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'contactFlowModal.scheduleNextSteps'
    }),
    t = _useTranslation.t;
  var savedDefaultValue = get(UserHelperKeys.SCHEDULE_NEXT_STEP_DATETIME_FILTER);
  var NOW = new Date();
  var showSkipButton = (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.showSkipButton) != undefined ? buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.showSkipButton : true;
  var hasPreviousStep = (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.hasPreviousStep) != undefined ? buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.hasPreviousStep : true;
  var openCadenceControlOnClose = (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.openCadenceOnSkip) != undefined ? buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.openCadenceOnSkip : false;
  var _useController = useController({
      control: control,
      name: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
      defaultValue: TASK_PRIORITY_VALUE.NO_PRIORITY
    }),
    _useController$field = _useController.field,
    priority = _useController$field.value,
    priorityOnChange = _useController$field.onChange;
  var _useController2 = useController({
      control: control,
      name: TASK_FIELDS_LOGIC_ROLE.ACTION_TYPE,
      defaultValue: 'TASK'
    }),
    _useController2$field = _useController2.field,
    actionType = _useController2$field.value,
    actionTypeOnChange = _useController2$field.onChange;

  //@ts-ignore
  var _useController3 = useController({
      control: control,
      name: TASK_FIELDS_LOGIC_ROLE.TITLE
    }),
    titleField = _useController3.field;
  var _useController4 = useController({
      control: control,
      name: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME
    }),
    _useController4$field = _useController4.field,
    taskDate = _useController4$field.value,
    taskDateOnChange = _useController4$field.onChange;
  var _useController5 = useController({
      control: control,
      name: 'related',
      defaultValue: referenceBobject
    }),
    relatedOnChange = _useController5.field.onChange;
  var dateTime = watch(TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  var dateTimeValue = useMemo(function () {
    if (dateTime !== null && dateTime !== void 0 && dateTime.type) {
      var _ScheduleShortTimesVa, _ScheduleShortTimesVa2;
      return (dateTime === null || dateTime === void 0 ? void 0 : dateTime.type) === ScheduleShortTimes.custom ? dateTime === null || dateTime === void 0 ? void 0 : dateTime.date : add(NOW, (_ScheduleShortTimesVa = ScheduleShortTimesValues[dateTime === null || dateTime === void 0 ? void 0 : dateTime.type]) === null || _ScheduleShortTimesVa === void 0 ? void 0 : _ScheduleShortTimesVa.unit, (_ScheduleShortTimesVa2 = ScheduleShortTimesValues[dateTime === null || dateTime === void 0 ? void 0 : dateTime.type]) === null || _ScheduleShortTimesVa2 === void 0 ? void 0 : _ScheduleShortTimesVa2.amount);
    } else {
      var _ScheduleShortTimesVa3, _ScheduleShortTimesVa4;
      return savedDefaultValue ? add(NOW, (_ScheduleShortTimesVa3 = ScheduleShortTimesValues[savedDefaultValue]) === null || _ScheduleShortTimesVa3 === void 0 ? void 0 : _ScheduleShortTimesVa3.unit, (_ScheduleShortTimesVa4 = ScheduleShortTimesValues[savedDefaultValue]) === null || _ScheduleShortTimesVa4 === void 0 ? void 0 : _ScheduleShortTimesVa4.amount) : add(NOW, 'minutes', 10);
    }
  }, [NOW, savedDefaultValue, dateTime === null || dateTime === void 0 ? void 0 : dateTime.type]);
  function onSubmit(data) {
    var _TASK_FIELDS_LOGIC_RO, _TASK_FIELDS_LOGIC_RO2;
    setIsSubmitting(true);
    var related = data.related,
      taskInfo = _objectWithoutProperties$1(data, _excluded$1);
    var body = _defineProperty$1(_defineProperty$1(_defineProperty$1(_defineProperty$1(_defineProperty$1(_defineProperty$1({}, TASK_FIELDS_LOGIC_ROLE.TITLE, taskInfo[TASK_FIELDS_LOGIC_ROLE.TITLE]), TASK_FIELDS_LOGIC_ROLE.TASK_TYPE, TASK_TYPE.NEXT_STEP), TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO, assignedToId), TASK_FIELDS_LOGIC_ROLE.STATUS, TASK_STATUS_VALUE_LOGIC_ROLE.TODO), TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, dateTimeValue), TASK_FIELDS_LOGIC_ROLE.PRIORITY, taskInfo[TASK_FIELDS_LOGIC_ROLE.PRIORITY]);
    var actionType = taskInfo[TASK_FIELDS_LOGIC_ROLE.ACTION_TYPE];
    body[TASK_FIELDS_LOGIC_ROLE.TASK_TYPE] = TASK_TYPE.NEXT_STEP;
    body[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CALL] = actionType === 'CALL' ? TASK_ACTION_VALUE.CALL_YES : null;
    body[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_EMAIL] = actionType === 'EMAIL' ? TASK_ACTION_VALUE.EMAIL_YES : null;
    if (actionType !== 'TASK' && actionType !== 'CALL' && actionType !== 'EMAIL') {
      body[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CUSTOM_TASK] = TASK_ACTION_VALUE.CUSTOM_TASK_YES;
      body[TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK] = actionType;
    }
    body[_TASK_FIELDS_LOGIC_RO = TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CUSTOM_TASK] || (body[_TASK_FIELDS_LOGIC_RO] = TASK_ACTION_VALUE.CUSTOM_TASK_NO);
    body[_TASK_FIELDS_LOGIC_RO2 = TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK] || (body[_TASK_FIELDS_LOGIC_RO2] = null);
    if (related) {
      var _related$bobjectType, _related$id, _related$id$typeName, _related$rawBobject, _related$id2;
      var relatedBobjectType = (related === null || related === void 0 ? void 0 : (_related$bobjectType = related.bobjectType) === null || _related$bobjectType === void 0 ? void 0 : _related$bobjectType.toUpperCase()) || (related === null || related === void 0 ? void 0 : (_related$id = related.id) === null || _related$id === void 0 ? void 0 : (_related$id$typeName = _related$id.typeName) === null || _related$id$typeName === void 0 ? void 0 : _related$id$typeName.toUpperCase());
      body[TASK_FIELDS_LOGIC_ROLE[relatedBobjectType]] = (related === null || related === void 0 ? void 0 : (_related$rawBobject = related.rawBobject) === null || _related$rawBobject === void 0 ? void 0 : _related$rawBobject.id) || (related === null || related === void 0 ? void 0 : (_related$id2 = related.id) === null || _related$id2 === void 0 ? void 0 : _related$id2.value);
    }
    handleSubmit({
      nextStepData: {
        accountId: accountId,
        body: body
      }
    });
    setIsSubmitting(false);
    handleNext();
  }
  var formValues = getValues();
  var titleValue = formValues[TASK_FIELDS_LOGIC_ROLE.TITLE];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray$1(_useState7, 2),
    isDirty = _useState8[0],
    setIsDirty = _useState8[1];
  useEffect(function () {
    setIsDirty(titleValue && titleValue !== '');
  }, [titleValue]);
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(ModalContent, {
      children: /*#__PURE__*/jsxs("div", {
        className: styles.content_container,
        children: [/*#__PURE__*/jsxs("div", {
          className: styles.editor,
          children: [/*#__PURE__*/jsxs("span", {
            className: styles.modal_title,
            children: [/*#__PURE__*/jsx(TaskTypeSelector, {
              value: actionType,
              onChange: handleChangeTaskType,
              isWebapp: true
            }), /*#__PURE__*/jsx(PrioritySelector, {
              value: priority,
              onChange: priorityOnChange,
              overrideStyle: {
                right: '40px'
              }
            })]
          }), /*#__PURE__*/jsx("span", {
            className: styles.divider
          }), /*#__PURE__*/jsxs("span", {
            className: styles.taskInfo,
            children: [/*#__PURE__*/jsx(Icon, {
              name: "clock",
              color: "softPeanut",
              size: 16
            }), /*#__PURE__*/jsx(Text, {
              size: "xs",
              color: "softPeanut",
              children: t('dueDate')
            }), /*#__PURE__*/jsx("div", {
              className: styles.relative_date_picker,
              children: /*#__PURE__*/jsx(ShortTermRelativeDatePicker, {
                size: "small",
                value: taskDate,
                onChange: function onChange(value) {
                  if ((value === null || value === void 0 ? void 0 : value.type) !== ScheduleShortTimes.custom) {
                    saveCustom({
                      key: UserHelperKeys.SCHEDULE_NEXT_STEP_DATETIME_FILTER,
                      data: value === null || value === void 0 ? void 0 : value.type
                    });
                  }
                  taskDateOnChange(value);
                },
                defaultValue: {
                  date: dateTimeValue,
                  type: savedDefaultValue ? savedDefaultValue : ScheduleShortTimes.tenMinutes
                },
                borderless: true,
                width: "100px",
                dropdownProps: {
                  zIndex: 10000,
                  arrow: true,
                  position: 'bottom'
                }
              })
            }), /*#__PURE__*/jsxs("span", {
              className: styles.assigned_to,
              children: [/*#__PURE__*/jsx(Icon, {
                name: "personAdd",
                color: "softPeanut",
                size: 16
              }), /*#__PURE__*/jsx(Text, {
                size: "xs",
                color: "softPeanut",
                children: t('assignedTo')
              }), /*#__PURE__*/jsx(AssignedToSelector, {
                assignedToId: assignedToId,
                updateAssignedTo: setAssignedToId
              })]
            }), /*#__PURE__*/jsx(BobjectSelector, {
              accountId: accountId,
              selected: bobjectSelectedName,
              id: 'static',
              size: "small",
              onBobjectChange: function onBobjectChange(bobject) {
                var bobjectType = bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType;
                relatedOnChange(bobject);
                if (bobjectType === BobjectTypes.Company) {
                  setBobjectSelectedName(bobject === null || bobject === void 0 ? void 0 : bobject.companyName);
                } else if (bobjectType === BobjectTypes.Lead) {
                  setBobjectSelectedName(bobject === null || bobject === void 0 ? void 0 : bobject.fullName);
                } else if (bobjectType === BobjectTypes.Opportunity) {
                  setBobjectSelectedName(bobject === null || bobject === void 0 ? void 0 : bobject.name);
                }
              }
            })]
          }), /*#__PURE__*/jsx("span", {
            className: styles.divider
          }), /*#__PURE__*/jsx("textarea", _objectSpread$1({
            className: styles.textArea,
            placeholder: t('placeholder'),
            autoFocus: true
          }, titleField))]
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("div", {
            className: styles.bottom_bar,
            children: /*#__PURE__*/jsx("span", {
              className: styles.record_related,
              children: /*#__PURE__*/jsx("div", {
                className: styles.bobject_selector
              })
            })
          })
        })]
      })
    }), /*#__PURE__*/jsx(ModalFooter, {
      children: /*#__PURE__*/jsxs("div", {
        className: styles.buttonsContainer,
        children: [hasPreviousStep && /*#__PURE__*/jsx(Button, {
          variant: "clear",
          onClick: handleBack,
          className: styles.back_button,
          children: (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.previousButtonTitle) || t('back')
        }), /*#__PURE__*/jsxs("div", {
          children: [showSkipButton && /*#__PURE__*/jsx(Button, {
            variant: "secondary",
            onClick: function onClick() {
              return handleSkip(openCadenceControlOnClose);
            },
            className: styles.skip_button,
            children: t("skip")
          }), /*#__PURE__*/jsx(Button, {
            onClick: handleSubmitForm(onSubmit),
            disabled: !isDirty || isSubmitting,
            children: isSubmitting ? /*#__PURE__*/jsx(Spinner, {
              name: "loadingCircle",
              size: 12
            }) : (buttonStepConfig === null || buttonStepConfig === void 0 ? void 0 : buttonStepConfig.nextButtonTitle) || t('saveAndSchedule')
          })]
        })]
      })
    })]
  });
};

var WizardModalStepContent = function WizardModalStepContent() {
  var _useContactFlow = useContactFlow(),
    step = _useContactFlow.step,
    send = _useContactFlow.send,
    modalControlSend = _useContactFlow.modalControlSend,
    hasLeads = _useContactFlow.hasLeads,
    handleClose = _useContactFlow.handleClose,
    activity = _useContactFlow.activity,
    referenceBobject = _useContactFlow.referenceBobject,
    referenceBobjectIsSales = _useContactFlow.referenceBobjectIsSales;
  var _useNotifications = useNotifications(),
    refreshNotifications = _useNotifications.refresh;
  function deleteRelatedNotification() {
    if (activity) api["delete"]("/utils/notifications/deleteByObjectId/".concat(activity.id.objectId), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: {}
    }).then(function () {
      refreshNotifications();
    });
  }
  var component = null;
  switch (step) {
    case 'CALL_RESULTS':
      component = /*#__PURE__*/jsx(CallResult, {
        hasLeads: hasLeads,
        handleNext: function handleNext(selectedCallResult, needsClose) {
          deleteRelatedNotification();
          needsClose ? handleClose() : send(EVENTS.NEXT, {
            callResult: selectedCallResult
          });
        }
      });
      break;
    case 'CALL_RESULTS_OPP':
      component = /*#__PURE__*/jsx(CallResultOpportunity, {
        handleNext: function handleNext(correctContact) {
          deleteRelatedNotification();
          send(EVENTS.NEXT, {
            isCorrectContact: correctContact,
            isLeadInSalesStage: referenceBobjectIsSales
          });
        }
      });
      break;
    case 'SALES_CHANGE_STATUS':
      component = /*#__PURE__*/jsx(ChangeSalesStatus, {
        handleNext: function handleNext(companyStatus, leadStatus) {
          send(EVENTS.NEXT, {
            companyStatus: companyStatus,
            leadStatus: leadStatus,
            referenceBobject: referenceBobject
          });
        }
      });
      break;
    case 'CHANGE_STATUS':
      component = /*#__PURE__*/jsx(ChangeStatus, {
        handleNext: function handleNext(companyStatus, leadStatus) {
          send(EVENTS.NEXT, {
            companyStatus: companyStatus,
            leadStatus: leadStatus,
            bobject: referenceBobject
          });
        },
        handleClose: handleClose
      });
      break;
    case 'NOTES_AND_QQ':
      component = /*#__PURE__*/jsx(NoteAndQQ, {
        handleNext: function handleNext() {
          return send(EVENTS.NEXT);
        }
      });
      break;
    case 'SCHEDULE_NEXT_STEPS':
      component = /*#__PURE__*/jsx(ScheduleNextSteps, {
        handleNext: function handleNext() {
          return send(EVENTS.NEXT);
        }
        // handleSkip={handleClose}
      });

      break;
  }
  return /*#__PURE__*/React.cloneElement(component, {
    handleBack: function handleBack() {
      return send(EVENTS.PREVIOUS);
    },
    handleSkip: function handleSkip(openCadenceControlOnClose) {
      if (openCadenceControlOnClose) {
        modalControlSend(MODAL_STEPS.CADENCE_CONTROL);
      } else {
        send(EVENTS.SKIP);
      }
    }
  });
};
var WizardModalContent = function WizardModalContent() {
  var _useContactFlow2 = useContactFlow(),
    step = _useContactFlow2.step;
  return step !== STEPS$1.INITIAL ? /*#__PURE__*/jsx(WizardModalStepContent, {}) : /*#__PURE__*/jsx(LoadingStep, {});
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _excluded = ["handleClose", "initialStep", "openCadenceControl"];
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var withProvider = function withProvider(Component) {
  return function (props) {
    var accountId = useActiveAccountId();
    var hasCustomWizardsEnabled = useCustomWizardsEnabled(accountId);
    var handleClose = props.handleClose,
      initialStep = props.initialStep,
      openCadenceControl = props.openCadenceControl;
      _objectWithoutProperties(props, _excluded);
    var _useCustomWizards = useCustomWizards(accountId, hasCustomWizardsEnabled),
      wizardsMap = _useCustomWizards.availableCustomWizards;
    return (!hasCustomWizardsEnabled || !!wizardsMap) && /*#__PURE__*/jsx(ContactFlowModalProvider, _objectSpread(_objectSpread({
      hasCustomWizardsEnabled: hasCustomWizardsEnabled,
      wizardsMap: wizardsMap
    }, props), {}, {
      children: /*#__PURE__*/jsx(Component, {
        handleClose: handleClose,
        initialStep: initialStep,
        openCadenceControl: openCadenceControl
      })
    }));
  };
};
var ContactFlow = function ContactFlow(_ref) {
  var handleClose = _ref.handleClose;
  var _useContactFlow = useContactFlow(),
    referenceBobject = _useContactFlow.referenceBobject,
    activityLead = _useContactFlow.activityLead,
    activityCompany = _useContactFlow.activityCompany,
    activityOpportunity = _useContactFlow.activityOpportunity,
    referenceBobjectIsSales = _useContactFlow.referenceBobjectIsSales,
    step = _useContactFlow.step,
    send = _useContactFlow.send,
    modalStep = _useContactFlow.modalStep;
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    isCadenceControlOpen = _useState2[0],
    setIsCadenceControlOpen = _useState2[1];
  useLayoutEffect(function () {
    if (referenceBobject && send) {
      if (referenceBobjectIsSales) {
        send(STEPS$1.CALL_RESULTS_OPP);
      } else {
        activityOpportunity ? send(STEPS$1.CHANGE_STATUS) : send(STEPS$1.CALL_RESULTS);
      }
    } else {
      send(STEPS$1.CALL_RESULTS);
    }
  }, [send, activityLead, activityCompany]);
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'contactFlowModal.titles'
    }),
    t = _useTranslation.t;
  var otherProps = STEPS_PROPS(t)[step];
  return /*#__PURE__*/jsxs(Fragment, {
    children: [modalStep === MODAL_STEPS.CONTACT_FLOW && /*#__PURE__*/jsxs(Modal, {
      open: true,
      onClose: handleClose,
      width: otherProps === null || otherProps === void 0 ? void 0 : otherProps.width,
      children: [/*#__PURE__*/jsxs(ModalHeader, {
        variant: "gradient",
        className: styles$a.ccfModalHeader,
        children: [/*#__PURE__*/jsx(ModalTitle, {
          children: otherProps === null || otherProps === void 0 ? void 0 : otherProps.title
        }), /*#__PURE__*/jsx(ModalCloseIcon, {
          onClick: handleClose,
          size: "small",
          color: "peanut"
        })]
      }), /*#__PURE__*/jsx(WizardModalContent, {})]
    }), modalStep === MODAL_STEPS.CADENCE_CONTROL && isCadenceControlOpen && /*#__PURE__*/jsx(CadenceControlModal, {
      bobject: referenceBobject,
      initialStep: {
        step: 'NEXT_STEPS',
        hadStartedCadence: !(referenceBobject.cadence && referenceBobject.cadenceEnded !== 'true')
      },
      setIsOpen: setIsCadenceControlOpen,
      callbackOnClose: handleClose
    })]
  });
};
var ContactFlowModal = withProvider( /*#__PURE__*/React.memo(ContactFlow));

export { ContactFlowModal, useCallResult };
//# sourceMappingURL=index.js.map
