import React, { useState, useMemo, useEffect, useContext, createContext } from 'react';
import { createToast, Text, Input, Select, Item, DateTimePicker, RadioGroup, Radio, Modal, ModalHeader, ModalTitle, ModalCloseIcon, ModalContent, ModalFooter, Button, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useBobject, useCadenceInfo, useActiveUserSettings, useActiveUserId } from '@bloobirds-it/hooks';
import { BobjectTypes, FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, LEAD_STATUS_LOGIC_ROLE, SALES_STATUS_VALUES_LOGIC_ROLES, STATUS_VALUES_LOGIC_ROLES, TASK_STATUS_VALUE_LOGIC_ROLE, TASK_FIELDS_LOGIC_ROLE, TASK_TYPE, OPPORTUNITY_FIELDS_LOGIC_ROLE, OPPORTUNITY_STATUS_LOGIC_ROLE, LEAD_SALES_STATUS_VALUES_LOGIC_ROLE, COMPANY_FIELDS_LOGIC_ROLE, COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE, COMPANY_STATUS_LOGIC_ROLE, UserPermission } from '@bloobirds-it/types';
import { getTextFromLogicRole, getFieldByLogicRole, api, getValueFromLogicRole, getBobjectFromLogicRole, removeScrollOfBox, recoverScrollOfBox } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';
import { ConfigureCadenceStep } from '@bloobirds-it/cadence';
import sortBy from 'lodash/sortBy';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';

function _typeof$3(obj) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$3(obj); }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(arg) { var key = _toPrimitive$3(arg, "string"); return _typeof$3(key) === "symbol" ? key : String(key); }
function _toPrimitive$3(input, hint) { if (_typeof$3(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$3(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var INACTIVE_HANDLING_OPTIONS;
(function (INACTIVE_HANDLING_OPTIONS) {
  INACTIVE_HANDLING_OPTIONS["NEXT_STEP"] = "createNextStep";
  INACTIVE_HANDLING_OPTIONS["NEW_CADENCE"] = "startNewCadence";
  INACTIVE_HANDLING_OPTIONS["SEND_TO_NURTURING"] = "sendToNurturingAndSetCadence";
  INACTIVE_HANDLING_OPTIONS["DISCARD"] = "discardCompanyAndLeads";
  INACTIVE_HANDLING_OPTIONS["BACK_TO_BACKLOG"] = "setBacklogAndUnassign";
  INACTIVE_HANDLING_OPTIONS["REASSIGN"] = "reassign";
  INACTIVE_HANDLING_OPTIONS["ON_HOLD"] = "keepOnHold";
})(INACTIVE_HANDLING_OPTIONS || (INACTIVE_HANDLING_OPTIONS = {}));
var modalAndActionText = _defineProperty$3(_defineProperty$3(_defineProperty$3({}, BobjectTypes.Company, {
  infoText: _defineProperty$3(_defineProperty$3({}, INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG, ' If you think this company is a candidate for a fresh start, select this option and send it back to the backlog to be reassigned.'), INACTIVE_HANDLING_OPTIONS.DISCARD, 'Discarding a company will stop its cadence or tasks but it will remain in the database.'),
  actionText: 'What is the reason for discarding the company and leads',
  discardedRadioText: 'Discard company and leads'
}), BobjectTypes.Lead, {
  infoText: _defineProperty$3(_defineProperty$3({}, INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG, ' If you think this lead is a candidate for a fresh start, select this option and send it back to the backlog to be reassigned.'), INACTIVE_HANDLING_OPTIONS.DISCARD, 'Discarding a lead will stop its cadence or tasks but it will remain in the database.'),
  actionText: 'What is the reason for discarding the lead',
  discardedRadioText: 'Discard lead'
}), BobjectTypes.Opportunity, {
  infoText: _defineProperty$3(_defineProperty$3({}, INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG, ' If you think this opportunity is a candidate for a fresh start, select this option and send it back to the backlog to be reassigned.'), INACTIVE_HANDLING_OPTIONS.DISCARD, 'Discarding an opportunity will stop its cadence or tasks but it will remain in the database.'),
  actionText: 'What is the reason for closing the opportunity',
  discardedRadioText: 'Close opportunity'
});

function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty$2(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(arg) { var key = _toPrimitive$2(arg, "string"); return _typeof$2(key) === "symbol" ? key : String(key); }
function _toPrimitive$2(input, hint) { if (_typeof$2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$3(arr, i) { return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3(); }
function _nonIterableRest$3() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }
function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$3(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$3(arr) { if (Array.isArray(arr)) return arr; }
var INACTIVE_HANDLING_OPTIONS_KEYS;
(function (INACTIVE_HANDLING_OPTIONS_KEYS) {
  INACTIVE_HANDLING_OPTIONS_KEYS["createNextStep"] = "NEXT_STEP";
  INACTIVE_HANDLING_OPTIONS_KEYS["startNewCadence"] = "START_NEW_CADENCE";
  INACTIVE_HANDLING_OPTIONS_KEYS["sendToNurturingAndSetCadence"] = "SEND_TO_NURTURING_AND_SET_CADENCE";
  INACTIVE_HANDLING_OPTIONS_KEYS["discardCompanyAndLeads"] = "DISCARD";
  INACTIVE_HANDLING_OPTIONS_KEYS["setBacklogAndUnassign"] = "BACK_TO_BACKLOG";
  INACTIVE_HANDLING_OPTIONS_KEYS["reassign"] = "REASSIGN";
  INACTIVE_HANDLING_OPTIONS_KEYS["keepOnHold"] = "ON_HOLD";
})(INACTIVE_HANDLING_OPTIONS_KEYS || (INACTIVE_HANDLING_OPTIONS_KEYS = {}));
function getMixpanelKey(type, bobjectType) {
  var info = "ACTION_SET_IN_INACTIVE_MODAL_".concat(INACTIVE_HANDLING_OPTIONS_KEYS[type]);
  if (type === INACTIVE_HANDLING_OPTIONS.DISCARD) {
    info = "ACTION_SET_IN_INACTIVE_MODAL_".concat(INACTIVE_HANDLING_OPTIONS_KEYS[type], "_").concat(bobjectType.toUpperCase());
  }
  return "ACTION_SET_IN_INACTIVE_MODAL_".concat(info);
}
var useInactiveHandlingModalData = function useInactiveHandlingModalData(data) {
  var _FIELDS_LOGIC_ROLE, _getFieldByLogicRole, _FIELDS_LOGIC_ROLE$bo;
  var _useInactiveHandlingM = useInactiveHandlingModal(),
    bobject = _useInactiveHandlingM.bobject,
    accountId = _useInactiveHandlingM.accountId,
    activeUserId = _useInactiveHandlingM.activeUserId,
    handleClose = _useInactiveHandlingM.handleClose,
    onSave = _useInactiveHandlingM.onSave;
  var _useBobject = useBobject(BobjectTypes.Lead, accountId),
    bulkPatchBobjects = _useBobject.bulkPatchBobjects;
  var defaultModalState = {
    visible: false,
    bobject: bobject
  };
  var _useState = useState(defaultModalState),
    _useState2 = _slicedToArray$3(_useState, 2),
    modalState = _useState2[0],
    _setModalState = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$3(_useState3, 2),
    isSubmitting = _useState4[0],
    setIsSubmitting = _useState4[1];
  // const { getPicklistValues } = useFieldsData(modalState?.bobject?.id?.typeName);
  // const cadence = getPicklistValues({logicRole: COMPANY_FIELDS_LOGIC_ROLE.CADENCE})
  var resetModalState = function resetModalState() {
    onSave();
    handleClose();
  };
  var _ref = data || {},
    type = _ref.type,
    actionData = _ref.data;
  var bobjectIdFields = bobject === null || bobject === void 0 ? void 0 : bobject.id;
  var bobjectType = bobjectIdFields === null || bobjectIdFields === void 0 ? void 0 : bobjectIdFields.typeName;
  var _useCadenceInfo = useCadenceInfo(bobject),
    defaultCadence = _useCadenceInfo.defaultCadence;
  var isInSalesStage = getTextFromLogicRole(bobject, (_FIELDS_LOGIC_ROLE = FIELDS_LOGIC_ROLE[bobjectType]) === null || _FIELDS_LOGIC_ROLE === void 0 ? void 0 : _FIELDS_LOGIC_ROLE.STAGE) === 'Sales' || bobjectType === BobjectTypes.Opportunity;
  var bobjectCadence = (_getFieldByLogicRole = getFieldByLogicRole(bobject, (_FIELDS_LOGIC_ROLE$bo = FIELDS_LOGIC_ROLE[bobjectType]) === null || _FIELDS_LOGIC_ROLE$bo === void 0 ? void 0 : _FIELDS_LOGIC_ROLE$bo.CADENCE)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.value;
  function generateRequestInfo() {
    var cadenceId = (actionData === null || actionData === void 0 ? void 0 : actionData.cadenceId) || bobjectCadence || (defaultCadence === null || defaultCadence === void 0 ? void 0 : defaultCadence.id);
    var generateReasonedStatusesBody = function generateReasonedStatusesBody(selectedStatus) {
      var isDiscarded = selectedStatus === 'DISCARDED';
      switch (bobjectType) {
        case 'Company':
          return isInSalesStage ? _defineProperty$2(_defineProperty$2({}, COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS, COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE[selectedStatus]), COMPANY_FIELDS_LOGIC_ROLE[isDiscarded ? 'SALES_DISCARDED_REASONS' : 'SALES_ON_HOLD_REASONS'], isDiscarded ? actionData === null || actionData === void 0 ? void 0 : actionData.discardedValue : actionData === null || actionData === void 0 ? void 0 : actionData.onHoldedValue) : _defineProperty$2(_defineProperty$2({}, COMPANY_FIELDS_LOGIC_ROLE.STATUS, COMPANY_STATUS_LOGIC_ROLE[selectedStatus]), COMPANY_FIELDS_LOGIC_ROLE[isDiscarded ? 'DISCARDED_REASONS' : 'ON_HOLD_REASONS'], isDiscarded ? actionData === null || actionData === void 0 ? void 0 : actionData.discardedValue : actionData === null || actionData === void 0 ? void 0 : actionData.onHoldedValue);
        case 'Lead':
          return isInSalesStage ? _defineProperty$2(_defineProperty$2({}, LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS, LEAD_SALES_STATUS_VALUES_LOGIC_ROLE[selectedStatus]), LEAD_FIELDS_LOGIC_ROLE[isDiscarded ? 'SALES_DISCARDED_REASONS' : 'SALES_ON_HOLD_REASONS'], isDiscarded ? actionData === null || actionData === void 0 ? void 0 : actionData.discardedValue : actionData === null || actionData === void 0 ? void 0 : actionData.onHoldedValue) : _defineProperty$2(_defineProperty$2({}, LEAD_FIELDS_LOGIC_ROLE.STATUS, LEAD_STATUS_LOGIC_ROLE[selectedStatus]), LEAD_FIELDS_LOGIC_ROLE[isDiscarded ? 'DISCARDED_REASONS' : 'ON_HOLD_REASONS'], isDiscarded ? actionData === null || actionData === void 0 ? void 0 : actionData.discardedValue : actionData === null || actionData === void 0 ? void 0 : actionData.onHoldedValue);
        case 'Opportunity':
          return _defineProperty$2(_defineProperty$2({}, OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS, OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_LOST), OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSED_LOST_REASON, actionData === null || actionData === void 0 ? void 0 : actionData.discardedValue);
        default:
          throw new Error('Invalid bobject type passed to discarded req body generator');
      }
    };
    var discardBody = generateReasonedStatusesBody('DISCARDED');
    var onHoldBody = generateReasonedStatusesBody('ON_HOLD');
    switch (type) {
      case INACTIVE_HANDLING_OPTIONS.NEXT_STEP:
        return {
          url: "/bobjects/".concat(accountId, "/Task"),
          body: {
            contents: _defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2({}, TASK_FIELDS_LOGIC_ROLE[bobjectType.toUpperCase()], bobjectIdFields.value), TASK_FIELDS_LOGIC_ROLE.TITLE, actionData === null || actionData === void 0 ? void 0 : actionData.title), TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO, (actionData === null || actionData === void 0 ? void 0 : actionData.assignedTo) || activeUserId), TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, (actionData === null || actionData === void 0 ? void 0 : actionData.date) || new Date()), TASK_FIELDS_LOGIC_ROLE.TASK_TYPE, TASK_TYPE.NEXT_STEP), TASK_FIELDS_LOGIC_ROLE.STATUS, TASK_STATUS_VALUE_LOGIC_ROLE.TODO),
            params: {
              duplicateValidation: true
            }
          },
          toastMessage: 'Task created!'
        };
      case INACTIVE_HANDLING_OPTIONS.NEW_CADENCE:
      case INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING:
        return {
          url: "/messaging/cadences/".concat(cadenceId, "/start"),
          body: {
            bobjectId: bobjectIdFields.objectId,
            bobjectType: bobjectType,
            startCadence: (actionData === null || actionData === void 0 ? void 0 : actionData.startCadenceDate) || new Date()
          },
          toastMessage: type === INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING ? "Nurturing cadence scheduled for the ".concat(bobjectType) : 'Cadence has been scheduled'
        };
      case INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG:
        return {
          url: "/bobjects/".concat(bobjectIdFields.value, "/raw"),
          body: _defineProperty$2(_defineProperty$2({}, FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO, null), FIELDS_LOGIC_ROLE[bobjectType].STATUS, STATUS_VALUES_LOGIC_ROLES[bobjectType].BACKLOG),
          toastMessage: "".concat(bobjectType, " sent to backlog and unassigned")
        };
      case INACTIVE_HANDLING_OPTIONS.REASSIGN:
        return {
          url: "/bobjects/".concat(bobjectIdFields.value, "/raw"),
          body: _defineProperty$2({}, FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO, actionData === null || actionData === void 0 ? void 0 : actionData.assignedTo),
          toastMessage: "".concat(bobjectType, " has been reassigned to the selected user")
        };
      case INACTIVE_HANDLING_OPTIONS.DISCARD:
        return {
          url: "/bobjects/".concat(bobjectIdFields.value, "/raw"),
          body: discardBody,
          toastMessage: bobjectType === 'Company' ? 'Company and leads have been discarded' : "The ".concat(bobjectType, " has been discarded")
        };
      case INACTIVE_HANDLING_OPTIONS.ON_HOLD:
        return {
          url: "/bobjects/".concat(bobjectIdFields.value, "/raw"),
          body: onHoldBody,
          toastMessage: bobjectType === 'Company' ? 'Company and leads status have changed to status On Hold' : "The ".concat(bobjectType, " status has changed to status On Hold")
        };
      default:
        throw new Error('Invalid action type');
    }
  }
  function handleSubmit() {
    var _data$data, _data$data2, _data$data3;
    var _generateRequestInfo = generateRequestInfo(),
      url = _generateRequestInfo.url,
      body = _generateRequestInfo.body,
      toastMessage = _generateRequestInfo.toastMessage;
    var type = data.type;
    setIsSubmitting(true);
    function onComplete() {
      var mixpanelKey = getMixpanelKey(type, bobjectType);
      mixpanel.track(mixpanelKey);
      createToast({
        type: 'success',
        message: toastMessage
      });
      resetModalState();
      setIsSubmitting(false);
    }
    onSave === null || onSave === void 0 ? void 0 : onSave();
    switch (type) {
      case INACTIVE_HANDLING_OPTIONS.NEW_CADENCE:
      case INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING:
        // eslint-disable-next-line no-case-declarations
        var hasPreviousStep = INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING === (data === null || data === void 0 ? void 0 : data.type) || (data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.previousAssign) === 'assignToMe';

        // eslint-disable-next-line no-case-declarations
        var patchOptions = _objectSpread$2(_objectSpread$2({}, INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING === (data === null || data === void 0 ? void 0 : data.type) ? _defineProperty$2({}, FIELDS_LOGIC_ROLE[bobjectType][isInSalesStage ? 'SALES_STATUS' : 'STATUS'], isInSalesStage ? SALES_STATUS_VALUES_LOGIC_ROLES[bobjectType].NURTURING : bobjectType === 'Opportunity' ? data === null || data === void 0 ? void 0 : (_data$data2 = data.data) === null || _data$data2 === void 0 ? void 0 : _data$data2.nurturingStage : STATUS_VALUES_LOGIC_ROLES[bobjectType].NURTURING) : {}), (data === null || data === void 0 ? void 0 : (_data$data3 = data.data) === null || _data$data3 === void 0 ? void 0 : _data$data3.previousAssign) === 'assignToMe' ? _defineProperty$2({}, (bobjectType === null || bobjectType === void 0 ? void 0 : bobjectType.toUpperCase()) + '__ASSIGNED_TO', activeUserId) : {});

        // eslint-disable-next-line no-case-declarations
        var patchPromise = hasPreviousStep ? api.patch("/bobjects/".concat(bobjectIdFields.value, "/raw"), patchOptions) : Promise.resolve();
        patchPromise.then(function () {
          return api.put(url, body).then(onComplete);
        });
        break;
      case INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG:
      case INACTIVE_HANDLING_OPTIONS.REASSIGN:
        api.patch(url, body).then(onComplete)["catch"](function () {
          return setIsSubmitting(false);
        });
        break;
      case INACTIVE_HANDLING_OPTIONS.DISCARD:
        api.patch(url, body).then(function () {
          if (bobjectType === 'Company') {
            //get leads related to the company
            api.post("/bobjects/".concat(accountId, "/Lead/search"), {
              query: _defineProperty$2({}, LEAD_FIELDS_LOGIC_ROLE.COMPANY, [bobjectIdFields === null || bobjectIdFields === void 0 ? void 0 : bobjectIdFields.value]),
              formFields: true,
              pageSize: 50
            }).then(function (_ref9) {
              var contents = _ref9.data.contents;
              var data = _defineProperty$2({}, LEAD_FIELDS_LOGIC_ROLE.STATUS, LEAD_STATUS_LOGIC_ROLE.DISCARDED);
              var leadsData = {};
              contents.forEach(function (element) {
                var _element$id;
                leadsData = _objectSpread$2(_objectSpread$2({}, leadsData), {}, _defineProperty$2({}, element === null || element === void 0 ? void 0 : (_element$id = element.id) === null || _element$id === void 0 ? void 0 : _element$id.objectId, data));
              });
              return bulkPatchBobjects(leadsData);
            }).then(onComplete)["catch"](function () {
              return setIsSubmitting(false);
            });
          } else {
            onComplete();
          }
        });
        break;
      case INACTIVE_HANDLING_OPTIONS.ON_HOLD:
        api.patch(url, body).then(function () {
          if (bobjectType === 'Company') {
            //get leads related to the company
            api.post("/bobjects/".concat(accountId, "/Lead/search"), {
              query: _defineProperty$2({}, LEAD_FIELDS_LOGIC_ROLE.COMPANY, [bobjectIdFields === null || bobjectIdFields === void 0 ? void 0 : bobjectIdFields.value]),
              formFields: true,
              pageSize: 50
            }).then(function (_ref10) {
              var contents = _ref10.data.contents;
              var data = _defineProperty$2({}, LEAD_FIELDS_LOGIC_ROLE.STATUS, LEAD_STATUS_LOGIC_ROLE.ON_HOLD);
              //TODO this should be optional
              var leadsData = {};
              contents.forEach(function (element) {
                var _element$id2;
                leadsData = _objectSpread$2(_objectSpread$2({}, leadsData), {}, _defineProperty$2({}, element === null || element === void 0 ? void 0 : (_element$id2 = element.id) === null || _element$id2 === void 0 ? void 0 : _element$id2.objectId, data));
              });
              return bulkPatchBobjects(leadsData);
            }).then(onComplete)["catch"](function () {
              return setIsSubmitting(false);
            });
          } else {
            onComplete();
          }
        });
        break;
      case INACTIVE_HANDLING_OPTIONS.NEXT_STEP:
        api.post(url, body).then(onComplete)["catch"](function () {
          return setIsSubmitting(false);
        });
        break;
      default:
        throw new Error('Action not supported');
    }
  }
  var modalTextByBobjectType = useMemo(function () {
    switch (bobjectType) {
      case 'Company':
        return 'company and its leads';
      case 'Opportunity':
      case 'Lead':
        return "".concat(bobjectType.toLowerCase());
      default:
        return 'Invalid bobjectType';
    }
  }, [bobjectType]);
  function getIsMissingInfo(_ref11) {
    var _ref11$selectedOption = _ref11.selectedOptionData,
      type = _ref11$selectedOption.type,
      data = _ref11$selectedOption.data,
      hasNeededNurturingInfo = _ref11.hasNeededNurturingInfo,
      hasOnHoldReasons = _ref11.hasOnHoldReasons;
    switch (type) {
      case INACTIVE_HANDLING_OPTIONS.DISCARD:
        return !(data !== null && data !== void 0 && data.discardedValue);
      case INACTIVE_HANDLING_OPTIONS.ON_HOLD:
        return isInSalesStage ? false : hasOnHoldReasons ? !(data !== null && data !== void 0 && data.onHoldedValue) : false;
      case INACTIVE_HANDLING_OPTIONS.NEXT_STEP:
        return !(data !== null && data !== void 0 && data.title);
      case INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING:
        return !hasNeededNurturingInfo;
      case INACTIVE_HANDLING_OPTIONS.REASSIGN:
        return !(data !== null && data !== void 0 && data.assignedTo);
      default:
        return false;
    }
  }
  return {
    modalState: modalState,
    setModalState: function setModalState(value) {
      return _setModalState(_objectSpread$2(_objectSpread$2({}, modalState), value));
    },
    handleSubmit: handleSubmit,
    getIsMissingInfo: getIsMissingInfo,
    isInSalesStage: isInSalesStage,
    cadenceInfo: {
      bobjectCadence: bobjectCadence,
      defaultCadence: ''
    },
    modalTextByBobjectType: modalTextByBobjectType,
    isSubmitting: isSubmitting
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

var css_248z$1 = ".informationPanel-module__informationPanel__mQWvv {\n  border: 1px solid var(--lightPurple);\n  border-radius: 4px;\n  background-color: var(--lightestPurple);\n  margin-left: 30px;\n  width: 232px;\n  padding: 16px;\n  overflow: overlay;\n}\n\n.informationPanel-module__info_header__O8BiO {\n  margin-bottom: 8px;\n  line-height: 20px;\n}\n\n.informationPanel-module__stage_callout__wrapper__VcSw5 {\n  display: flex;\n  flex-direction: row;\n  padding: 0 30px;\n}\n\n.informationPanel-module__stage_callout__icon__pBqvN {\n  align-self: center;\n  width: 50px;\n  margin-right: 16px;\n}\n\n.informationPanel-module_actions_wrapper__rlEpt {\n  width: 302px;\n}\n\n.informationPanel-module_actions_wrapper__rlEpt > div {\n  display: flex;\n  flex-direction: column;\n}\n\n.informationPanel-module_actions_wrapper__rlEpt > div > div {\n  margin-bottom: 8px;\n  font-size: 12px;\n  letter-spacing: 0;\n}\n\n.informationPanel-module__cadence_preview_wrapper__9r5TC {\n  width: 564px;\n  margin-bottom: 24px;\n}\n\n.informationPanel-module__nurturing_preview_wrapper__CqyTq {\n  width: 564px;\n  margin-bottom: 24px;\n}\n\n.informationPanel-module__nurturing_preview_wrapper__CqyTq > div > span {\n  padding: 8px 0;\n}\n\n.informationPanel-module__section__wrapper__Om-D- {\n  margin-bottom: 12px;\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: row;\n  position: relative;\n}\n\n.informationPanel-module__list__wrapper__H0yAc {\n  flex-direction: column;\n  flex-basis: 100%;\n  flex: 1;\n  margin-right: 15px;\n}\n\n.informationPanel-module_hidden__O6Boo {\n  display: none;\n}\n\n\n.informationPanel-module__text_block__1TjfL {\n  margin-bottom: 12px;\n}\n\n.informationPanel-module__text_block__1TjfL > a {\n  text-decoration: none;\n  color: var(--bloobirds);\n}\n\n.informationPanel-module__nurturing_text_block__zP9ck {\n  font-size: 11px;\n  margin-bottom: 8px;\n}\n\n.informationPanel-module__nurturing_text_block__zP9ck > a {\n  text-decoration: none;\n  color: var(--bloobirds);\n}\n\n.informationPanel-module__selects_wrapper__-XKEP {\n  margin-top: 20px;\n  margin-bottom: 20px;\n  width: 552px;\n  display: flex;\n  justify-content: space-between;\n}\n\n.informationPanel-module__selects_wrapper__-XKEP > div > div {\n  height: 40px;\n}\n\n.informationPanel-module__note_text_area__GUoFG {\n  text-align: start;\n  margin-top: 15px;\n}\n\n.informationPanel-module__reassign_selects_wrapper__y-KWY {\n  margin-top: 20px;\n  width: 552px;\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 12px;\n}\n\n.informationPanel-module__reassign_selects_wrapper__y-KWY > div > div {\n  height: 40px;\n}\n\n.informationPanel-module__add_task_module__p6Wi2 {\n  margin-top: 32px;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  align-content: center;\n}\n\n.informationPanel-module__add_task_module__p6Wi2 > div[class*=\"BaseInput\"] {\n  height: 44px;\n}\n\n.informationPanel-module__add_task_module__p6Wi2 input:hover, .informationPanel-module__add_task_module__p6Wi2 input:focus {\n  box-shadow: none;\n}\n\n.informationPanel-module__add_task_title__gz8A8 {\n  margin-bottom: 12px;\n}\n\n.informationPanel-module__configure_cadence_wrapper__YEd-p {\n  margin-top: 18px;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  align-content: center;\n  gap: 16px;\n}\n\n.informationPanel-module__configure_cadence_wrapper__YEd-p > main {\n  padding: 0;\n}\n\n.informationPanel-module__previous_assign_section_wrapper__VvJwy {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 8px;\n}\n\n.informationPanel-module__previous_assign_radio_group__DpISj {\n  max-width: 300px;\n}\n\n.informationPanel-module__previous_assign_radio_group__DpISj > div {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.informationPanel-module__previous_assign_radio_group__DpISj > div > div {\n  font-size: 12px;\n}\n\n.informationPanel-module_box__UrMIg {\n  position: relative;\n  z-index: 99;\n\n  bottom: 73%;\n  left: 50%;\n  transform: translateX(-50%);\n\n  width: 700px;\n  background: #ffffff;\n\n  /* Main/peanut-light */\n  border: 1px solid #d4e0f1;\n\n  /* snackbar-shadow */\n  box-shadow: 0 2px 8px rgba(70, 79, 87, 0.33);\n  border-radius: 4px;\n}\n\n.informationPanel-module__nurturing_bottom__P8Sku {\n  bottom: 68%;\n}\n";
var styles$1 = {"_informationPanel":"informationPanel-module__informationPanel__mQWvv","_info_header":"informationPanel-module__info_header__O8BiO","_stage_callout__wrapper":"informationPanel-module__stage_callout__wrapper__VcSw5","_stage_callout__icon":"informationPanel-module__stage_callout__icon__pBqvN","actions_wrapper":"informationPanel-module_actions_wrapper__rlEpt","_cadence_preview_wrapper":"informationPanel-module__cadence_preview_wrapper__9r5TC","_nurturing_preview_wrapper":"informationPanel-module__nurturing_preview_wrapper__CqyTq","_section__wrapper":"informationPanel-module__section__wrapper__Om-D-","_list__wrapper":"informationPanel-module__list__wrapper__H0yAc","hidden":"informationPanel-module_hidden__O6Boo","_text_block":"informationPanel-module__text_block__1TjfL","_nurturing_text_block":"informationPanel-module__nurturing_text_block__zP9ck","_selects_wrapper":"informationPanel-module__selects_wrapper__-XKEP","_note_text_area":"informationPanel-module__note_text_area__GUoFG","_reassign_selects_wrapper":"informationPanel-module__reassign_selects_wrapper__y-KWY","_add_task_module":"informationPanel-module__add_task_module__p6Wi2","_add_task_title":"informationPanel-module__add_task_title__gz8A8","_configure_cadence_wrapper":"informationPanel-module__configure_cadence_wrapper__YEd-p","_previous_assign_section_wrapper":"informationPanel-module__previous_assign_section_wrapper__VvJwy","_previous_assign_radio_group":"informationPanel-module__previous_assign_radio_group__DpISj","box":"informationPanel-module_box__UrMIg","_nurturing_bottom":"informationPanel-module__nurturing_bottom__P8Sku"};
styleInject(css_248z$1);

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2(); }
function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$2(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }
var AddTaskComponent = function AddTaskComponent(_ref) {
  var _sortBy;
  var handleData = _ref.handleData;
  var _useInactiveHandlingM = useInactiveHandlingModal(),
    activeUserId = _useInactiveHandlingM.activeUserId,
    users = _useInactiveHandlingM.fields.users;
  return /*#__PURE__*/jsxs("div", {
    className: styles$1._add_task_module,
    children: [/*#__PURE__*/jsx(Text, {
      size: "m",
      weight: "bold",
      align: "center",
      className: styles$1._add_task_title,
      children: "Add the task\u2019s details"
    }), /*#__PURE__*/jsx(Input, {
      placeholder: "Title *",
      width: "552px",
      onChange: function onChange(title) {
        handleData({
          title: title
        });
      }
    }), /*#__PURE__*/jsxs("div", {
      className: styles$1._selects_wrapper,
      children: [/*#__PURE__*/jsx(Select, {
        placeholder: "Assigned To",
        width: "270px",
        defaultValue: activeUserId,
        onChange: function onChange(assignedTo) {
          return handleData({
            assignedTo: assignedTo
          });
        },
        children: (_sortBy = sortBy(users, 'value')) === null || _sortBy === void 0 ? void 0 : _sortBy.map(function (item) {
          return /*#__PURE__*/jsx(Item, {
            value: item.id,
            children: item.value || (item === null || item === void 0 ? void 0 : item.name)
          }, item.id);
        })
      }), /*#__PURE__*/jsx(DateTimePicker, {
        placeholder: "Schedule Datetime",
        defaultValue: new Date(),
        width: "270px",
        onChange: function onChange(date) {
          return handleData({
            date: date
          });
        }
      })]
    })]
  });
};
var DiscardComponent = function DiscardComponent(_ref2) {
  var _bobject$id, _modalAndActionText, _bobject$id2, _sortBy2;
  var bobject = _ref2.bobject,
    handleData = _ref2.handleData;
  var _useInactiveHandlingM2 = useInactiveHandlingModal(),
    _useInactiveHandlingM3 = _useInactiveHandlingM2.fields,
    discardedReasons = _useInactiveHandlingM3.discardedReasons,
    closedLostReason = _useInactiveHandlingM3.closedLostReason;
  var isOpportunity = (bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.typeName) === BobjectTypes.Opportunity;
  return /*#__PURE__*/jsxs("div", {
    className: styles$1._add_task_module,
    children: [/*#__PURE__*/jsxs(Text, {
      size: "m",
      weight: "bold",
      align: "center",
      children: [(_modalAndActionText = modalAndActionText[bobject === null || bobject === void 0 ? void 0 : (_bobject$id2 = bobject.id) === null || _bobject$id2 === void 0 ? void 0 : _bobject$id2.typeName]) === null || _modalAndActionText === void 0 ? void 0 : _modalAndActionText.actionText, "?"]
    }), /*#__PURE__*/jsx("div", {
      className: styles$1._selects_wrapper,
      children: /*#__PURE__*/jsx(Select, {
        placeholder: isOpportunity ? 'Closed lost reason*' : 'Discarded Reason *',
        width: "557px",
        onChange: function onChange(discardedValue) {
          return handleData({
            discardedValue: discardedValue
          });
        },
        children: (_sortBy2 = sortBy(isOpportunity ? closedLostReason : discardedReasons, 'value')) === null || _sortBy2 === void 0 ? void 0 : _sortBy2.map(function (item) {
          return /*#__PURE__*/jsx(Item, {
            value: item.id,
            children: item.value || (item === null || item === void 0 ? void 0 : item.name)
          }, item.id);
        })
      })
    })]
  });
};
var OnHoldComponent = function OnHoldComponent(_ref3) {
  var _sortBy3;
  var handleData = _ref3.handleData;
  var _useInactiveHandlingM4 = useInactiveHandlingModal(),
    onHoldReasons = _useInactiveHandlingM4.fields.onHoldReasons;
  return /*#__PURE__*/jsxs("div", {
    className: styles$1._add_task_module,
    children: [/*#__PURE__*/jsx(Text, {
      size: "m",
      weight: "bold",
      align: "center",
      children: "What is the reason for sending to on hold?"
    }), /*#__PURE__*/jsx("div", {
      className: styles$1._selects_wrapper,
      children: /*#__PURE__*/jsx(Select, {
        placeholder: 'On Hold Reason *',
        width: "557px",
        onChange: function onChange(onHoldedValue) {
          handleData({
            onHoldedValue: onHoldedValue
          });
        },
        children: (_sortBy3 = sortBy(onHoldReasons, 'value')) === null || _sortBy3 === void 0 ? void 0 : _sortBy3.map(function (item) {
          return /*#__PURE__*/jsx(Item, {
            value: item.id,
            children: item.name
          }, item.id);
        })
      })
    })]
  });
};
var ReassignComponent = function ReassignComponent(_ref4) {
  var _sortBy4;
  var handleData = _ref4.handleData;
  var _useInactiveHandlingM5 = useInactiveHandlingModal(),
    users = _useInactiveHandlingM5.fields.users;
  return /*#__PURE__*/jsxs("div", {
    className: styles$1._add_task_module,
    children: [/*#__PURE__*/jsx(Text, {
      size: "m",
      weight: "bold",
      align: "center",
      children: "Select a colleague to reassign"
    }), /*#__PURE__*/jsx("div", {
      className: styles$1._reassign_selects_wrapper,
      children: /*#__PURE__*/jsx(Select, {
        placeholder: "Assigned To",
        width: "557px",
        onChange: function onChange(assignedTo) {
          return handleData({
            assignedTo: assignedTo
          });
        },
        children: (_sortBy4 = sortBy(users, 'value')) === null || _sortBy4 === void 0 ? void 0 : _sortBy4.map(function (item) {
          return /*#__PURE__*/jsx(Item, {
            value: item.id,
            children: item.value || (item === null || item === void 0 ? void 0 : item.name)
          }, item.id);
        })
      })
    })]
  });
};
var PreviousAssign = function PreviousAssign(_ref5) {
  var bobjectType = _ref5.bobjectType,
    handleData = _ref5.handleData;
  var _useState = useState('assignToMe'),
    _useState2 = _slicedToArray$2(_useState, 2),
    assignMode = _useState2[0],
    setAssignMode = _useState2[1];
  useEffect(function () {
    handleData({
      previousAssign: assignMode
    });
  }, [assignMode]);
  return /*#__PURE__*/jsxs("div", {
    className: styles$1._previous_assign_section_wrapper,
    children: [/*#__PURE__*/jsx(Text, {
      size: "m",
      weight: "bold",
      align: "center",
      children: "Who do you want to assign it to?"
    }), /*#__PURE__*/jsxs(Text, {
      size: "xs",
      children: ["This ", bobjectType === null || bobjectType === void 0 ? void 0 : bobjectType.toLowerCase(), " is not assigned to you. ", /*#__PURE__*/jsx("b", {
        children: "Cadence tasks"
      }), " are always assigned to the ", /*#__PURE__*/jsx("b", {
        children: "current owner"
      }), "."]
    }), /*#__PURE__*/jsx("div", {
      className: styles$1._previous_assign_radio_group,
      children: /*#__PURE__*/jsxs(RadioGroup, {
        defaultValue: "assignToMe",
        onChange: function onChange(value) {
          setAssignMode(value);
        },
        children: [/*#__PURE__*/jsx(Radio, {
          value: "assignToMe",
          size: "small",
          expand: true,
          defaultChecked: true,
          children: "Assign to me"
        }), /*#__PURE__*/jsx(Radio, {
          value: "keepOwner",
          size: "small",
          expand: true,
          children: "Keep the current owner"
        })]
      })
    })]
  });
};
var SetCadence = function SetCadence(_ref6) {
  var _bobject$id3, _settings$user, _settings$user2, _settings$user2$permi;
  var bobject = _ref6.bobject,
    handleData = _ref6.handleData;
  var bobjectType = bobject === null || bobject === void 0 ? void 0 : (_bobject$id3 = bobject.id) === null || _bobject$id3 === void 0 ? void 0 : _bobject$id3.typeName;
  var assignedTo = 'assignedTo' in bobject ? bobject === null || bobject === void 0 ? void 0 : bobject.assignedTo : getValueFromLogicRole(bobject, FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO);
  var _useInactiveHandlingM6 = useInactiveHandlingModal(),
    activeUserId = _useInactiveHandlingM6.activeUserId;
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var hasPermissions = (settings === null || settings === void 0 ? void 0 : (_settings$user = settings.user) === null || _settings$user === void 0 ? void 0 : _settings$user.accountAdmin) && (settings === null || settings === void 0 ? void 0 : (_settings$user2 = settings.user) === null || _settings$user2 === void 0 ? void 0 : (_settings$user2$permi = _settings$user2.permissions) === null || _settings$user2$permi === void 0 ? void 0 : _settings$user2$permi.includes(UserPermission.EDIT_ALL));
  return /*#__PURE__*/jsxs("div", {
    className: styles$1._configure_cadence_wrapper,
    children: [assignedTo !== activeUserId && hasPermissions && /*#__PURE__*/jsx(PreviousAssign, {
      bobjectType: bobjectType,
      handleData: handleData
    }), /*#__PURE__*/jsx(ConfigureCadenceStep, {
      handleBack: function handleBack() {},
      handleNext: null
      //saveCadence={() => {}}
      ,
      previousStep: null,
      bobject: bobject,
      onCadenceChange: function onCadenceChange(cadenceId) {
        return handleData({
          cadenceId: cadenceId
        });
      },
      onDateChange: function onDateChange(startCadence) {
        return handleData({
          startCadenceDate: startCadence
        });
      }
    })]
  });
};
var ActionForm = function ActionForm(_ref7) {
  var selectedOptionHandler = _ref7.selectedOptionHandler,
    bobject = _ref7.bobject,
    isSalesBobject = _ref7.isSalesBobject;
  var _selectedOptionHandle = _slicedToArray$2(selectedOptionHandler, 2),
    selectedOption = _selectedOptionHandle[0],
    setSelectedOption = _selectedOptionHandle[1];
  var component;
  switch (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.type) {
    case INACTIVE_HANDLING_OPTIONS.NEXT_STEP:
      component = /*#__PURE__*/jsx(AddTaskComponent, {});
      break;
    case INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING:
    case INACTIVE_HANDLING_OPTIONS.NEW_CADENCE:
      component = /*#__PURE__*/jsx(SetCadence, {
        bobject: bobject
      });
      break;
    case INACTIVE_HANDLING_OPTIONS.REASSIGN:
      component = /*#__PURE__*/jsx(ReassignComponent, {});
      break;
    case INACTIVE_HANDLING_OPTIONS.DISCARD:
      component = /*#__PURE__*/jsx(DiscardComponent, {
        bobject: bobject
      });
      break;
    case INACTIVE_HANDLING_OPTIONS.ON_HOLD:
      component = isSalesBobject ? /*#__PURE__*/jsx(Fragment, {}) : /*#__PURE__*/jsx(OnHoldComponent, {});
      break;
    case INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG:
    default:
      component = /*#__PURE__*/jsx(Fragment, {});
      break;
  }
  return /*#__PURE__*/React.cloneElement(component, {
    handleData: function handleData(data) {
      setSelectedOption(_objectSpread$1(_objectSpread$1({}, selectedOption), {}, {
        data: _objectSpread$1(_objectSpread$1({}, selectedOption.data), data)
      }));
    }
  });
};

function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$1(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
var ActionSelector = function ActionSelector(_ref) {
  var _modalAndActionText$b;
  var selectedOptionHandler = _ref.selectedOptionHandler,
    bobjectType = _ref.bobjectType,
    isInSalesStage = _ref.isInSalesStage;
  var _selectedOptionHandle = _slicedToArray$1(selectedOptionHandler, 2),
    selectedOption = _selectedOptionHandle[0],
    setSelectedOption = _selectedOptionHandle[1];
  return /*#__PURE__*/jsx("div", {
    className: styles$1.actions_wrapper,
    children: /*#__PURE__*/jsxs(RadioGroup, {
      value: selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.type,
      onChange: function onChange(value) {
        return setSelectedOption({
          type: value,
          data: undefined
        });
      },
      children: [/*#__PURE__*/jsx(Radio, {
        expand: true,
        size: "small",
        value: INACTIVE_HANDLING_OPTIONS.NEXT_STEP,
        children: "Create a next step"
      }), /*#__PURE__*/jsx(Radio, {
        size: "small",
        value: INACTIVE_HANDLING_OPTIONS.NEW_CADENCE,
        children: "Enroll in a new cadence"
      }), /*#__PURE__*/jsx(Radio, {
        size: "small",
        value: INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING,
        children: "Send to nurturing and set cadence"
      }), /*#__PURE__*/jsx(Radio, {
        size: "small",
        value: INACTIVE_HANDLING_OPTIONS.DISCARD,
        children: (_modalAndActionText$b = modalAndActionText[bobjectType]) === null || _modalAndActionText$b === void 0 ? void 0 : _modalAndActionText$b.discardedRadioText
      }), !isInSalesStage && bobjectType !== BobjectTypes.Opportunity ? /*#__PURE__*/jsx(Radio, {
        size: "small",
        value: INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG,
        children: "Send back to backlog and unassign"
      }) : /*#__PURE__*/jsx(Fragment, {}), /*#__PURE__*/jsx(Radio, {
        size: "small",
        value: INACTIVE_HANDLING_OPTIONS.REASSIGN,
        children: "Reassign"
      }), bobjectType !== BobjectTypes.Opportunity ? /*#__PURE__*/jsx(Radio, {
        size: "small",
        value: INACTIVE_HANDLING_OPTIONS.ON_HOLD,
        children: "Send to on hold"
      }) : /*#__PURE__*/jsx(Fragment, {})]
    })
  });
};

var InformationPanel = function InformationPanel(_ref) {
  var _bobject$id, _modalAndActionText$b;
  var type = _ref.selectedOption.type,
    bobject = _ref.bobject;
  var bobjectType = bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.typeName;
  var modalText = type === INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG || type === INACTIVE_HANDLING_OPTIONS.DISCARD ? (_modalAndActionText$b = modalAndActionText[bobjectType]) === null || _modalAndActionText$b === void 0 ? void 0 : _modalAndActionText$b.infoText[type] : 'undefined';
  var SelectedOptionInfoDisplay = function SelectedOptionInfoDisplay() {
    switch (type) {
      case INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG:
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx(Text, {
            size: "xs",
            weight: "bold",
            className: styles$1._info_header,
            children: "\uD83D\uDC49 Thinking of starting from scratch?"
          }), /*#__PURE__*/jsx(Text, {
            size: "xs",
            children: modalText
          })]
        });
      case INACTIVE_HANDLING_OPTIONS.DISCARD:
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx(Text, {
            size: "xs",
            weight: "bold",
            className: styles$1._info_header,
            children: "\uD83D\uDC4B Think you can't do more?"
          }), /*#__PURE__*/jsx(Text, {
            size: "xs",
            className: styles$1._text_block,
            children: modalText
          }), /*#__PURE__*/jsx(Text, {
            size: "xs",
            className: styles$1._text_block,
            children: "It's possible to find it in the lists and subhomes, filtering by \"Discarded\" status."
          })]
        });
      case INACTIVE_HANDLING_OPTIONS.NEW_CADENCE:
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx(Text, {
            size: "xs",
            weight: "bold",
            className: styles$1._info_header,
            children: "\uD83D\uDCAC Do you think you should keep insisting?"
          }), /*#__PURE__*/jsx(Text, {
            size: "xs",
            className: styles$1._text_block,
            children: "Enroll it into a new cadence and try to reach out again."
          }), /*#__PURE__*/jsx(Text, {
            size: "xs",
            className: styles$1._text_block,
            children: "This task will appear in your home and subhomes on the scheduled day."
          }), /*#__PURE__*/jsxs(Text, {
            size: "xs",
            className: styles$1._text_block,
            children: [/*#__PURE__*/jsx("a", {
              href: 'https://support.bloobirds.com/hc/en-us/articles/4821987345308-Cadence',
              target: "_blank",
              rel: "noreferrer",
              children: "Click here"
            }), ' ', "if you want to know more about cadences"]
          })]
        });
      case INACTIVE_HANDLING_OPTIONS.NEXT_STEP:
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx(Text, {
            size: "xs",
            weight: "bold",
            className: styles$1._info_header,
            children: "\u2728 Are you sure what to do next?"
          }), /*#__PURE__*/jsx(Text, {
            size: "xs",
            className: styles$1._text_block,
            children: "Create a task so you don't forget!"
          }), /*#__PURE__*/jsx(Text, {
            size: "xs",
            className: styles$1._text_block,
            children: "This task will appear in your home and subhomes on the scheduled day."
          }), /*#__PURE__*/jsxs(Text, {
            size: "xs",
            className: styles$1._text_block,
            children: ["Also, you will be notified if you have", ' ', /*#__PURE__*/jsx("a", {
              href: 'https://support.bloobirds.com/hc/en-us/articles/4861712344860-Reminders',
              target: "_blank",
              rel: "noreferrer",
              children: "reminders"
            }), ' ', "activated."]
          }), /*#__PURE__*/jsxs(Text, {
            size: "xs",
            className: styles$1._text_block,
            children: [/*#__PURE__*/jsx("a", {
              href: 'https://support.bloobirds.com/hc/en-us/sections/360003357720-Tasks',
              target: "_blank",
              rel: "noreferrer",
              children: "Click here"
            }), ' ', "if you want to know more about tasks!"]
          })]
        });
      case INACTIVE_HANDLING_OPTIONS.REASSIGN:
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx(Text, {
            size: "xs",
            weight: "bold",
            className: styles$1._info_header,
            children: "\uD83D\uDC49 Do you think it should be worked on by another colleague?"
          }), /*#__PURE__*/jsx(Text, {
            size: "xs",
            children: "Select this option if you think this company or lead should be worked by another colleague, for example because its from a target market that does not belong to you."
          })]
        });
      case INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING:
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx(Text, {
            size: "xs",
            weight: "bold",
            className: styles$1._info_header,
            children: "\uD83D\uDD04 Do you think not everything is lost?"
          }), /*#__PURE__*/jsx(Text, {
            size: "xs",
            className: styles$1._text_block,
            children: "Nurturing is an active status used to maintain a minimum of contact and/or sharing content in order to keep trying to convert a company or lead."
          }), ' ', /*#__PURE__*/jsxs(Text, {
            size: "xs",
            className: styles$1._text_block,
            children: ["This task will appear in your home and subhomes on the scheduled day. Remember that", ' ', /*#__PURE__*/jsx("a", {
              href: ' https://support.bloobirds.com/hc/en-us/articles/4821987345308-Cadence',
              target: "_blank",
              rel: "noreferrer",
              children: "automated cadences"
            }), ' ', "are really useful for nurturing!"]
          }), ' ', /*#__PURE__*/jsxs(Text, {
            size: "xs",
            className: styles$1._text_block,
            children: [/*#__PURE__*/jsx("a", {
              href: 'https://support.bloobirds.com/hc/en-us/articles/5856774476188',
              target: "_blank",
              rel: "noreferrer",
              children: "Click here"
            }), ' ', "to know more about how to improve your nurturing process."]
          })]
        });
      case INACTIVE_HANDLING_OPTIONS.ON_HOLD:
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsxs(Text, {
            size: "xs",
            weight: "bold",
            className: styles$1._info_header,
            children: ["\uD83D\uDC49 I don't want to do anything", ' ']
          }), /*#__PURE__*/jsx(Text, {
            size: "xs",
            children: "Select this option if you think this company or lead should not be discarded nor sent to nurture, but rather you expect to do something with it in the future."
          })]
        });
      default:
        return /*#__PURE__*/jsx(Fragment, {});
    }
  };
  return /*#__PURE__*/jsx("div", {
    className: styles$1._informationPanel,
    children: /*#__PURE__*/jsx(SelectedOptionInfoDisplay, {})
  });
};

var css_248z = ".inactiveHandlingModal-module__modal_header__ZxoCb {\n  box-sizing: border-box;\n  padding: 16px;\n}\n\n.inactiveHandlingModal-module__modal_header__ZxoCb > div > svg{\n  transform: rotate(180deg);\n}\n\n.inactiveHandlingModal-module__modal_content__KPHM4 {\n  box-sizing: border-box;\n  padding: 32px 58px 0;\n  min-height: 583px;\n  max-height: calc(100vh - 130px);\n}\n\n.inactiveHandlingModal-module__modal_footer__tuzmm {\n  box-sizing: border-box;\n  padding: 0 32px 40px 32px;\n  height: 80px;\n}\n\n.inactiveHandlingModal-module__modal_content__KPHM4 > div > section > div {\n  display: flex;\n  flex-direction: column;\n}\n\n.inactiveHandlingModal-module__sections_container__hoEGH {\n  display: flex;\n  height: 272px;\n}\n\n.inactiveHandlingModal-module__sections_container__hoEGH + main {\n  padding: 0;\n}\n\n.inactiveHandlingModal-module__informationPanel__MaCXN {\n  border: 1px solid var(--lightPurple);\n  border-radius: 4px;\n  background-color: var(--lightestPurple);\n  margin-left: 30px;\n  width: 198px;\n  padding: 16px;\n}\n\n.inactiveHandlingModal-module__info_header__blo6e {\n  margin-bottom: 8px;\n  line-height: 20px;\n}\n\n.inactiveHandlingModal-module__stage_callout__wrapper__57xPV {\n  display: flex;\n  flex-direction: row;\n  padding: 0 30px;\n}\n\n.inactiveHandlingModal-module__stage_callout__icon__O8Gat {\n  align-self: center;\n  width: 50px;\n  margin-right: 16px;\n}\n\n.inactiveHandlingModal-module_actions_wrapper__NYYgm {\n  width: 302px;\n}\n\n.inactiveHandlingModal-module_actions_wrapper__NYYgm > div {\n  display: flex;\n  flex-direction: column;\n}\n\n.inactiveHandlingModal-module__cadence_preview_wrapper__dg03R {\n  width: 564px;\n  margin-bottom: 24px;\n}\n\n.inactiveHandlingModal-module__nurturing_preview_wrapper__eDsWf {\n  width: 564px;\n  margin-bottom: 24px;\n}\n\n.inactiveHandlingModal-module__nurturing_preview_wrapper__eDsWf > div > span {\n  padding: 8px 0;\n}\n\n.inactiveHandlingModal-module__section__wrapper__nBtuk {\n  margin-bottom: 12px;\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: row;\n  position: relative;\n}\n\n.inactiveHandlingModal-module__list__wrapper__L95Zx {\n  flex-direction: column;\n  flex-basis: 100%;\n  flex: 1;\n  margin-right: 15px;\n}\n\n.inactiveHandlingModal-module_hidden__Pk-NC {\n  display: none;\n}\n\n.inactiveHandlingModal-module_actions_wrapper__NYYgm > div > div {\n  margin-bottom: 8px;\n}\n\n.inactiveHandlingModal-module__text_block__1CsMZ {\n  margin-bottom: 12px;\n}\n\n.inactiveHandlingModal-module__text_block__1CsMZ > a {\n  text-decoration: none;\n  color: var(--bloobirds);\n}\n\n.inactiveHandlingModal-module__nurturing_text_block__7c6JH {\n  font-size: 11px;\n  margin-bottom: 8px;\n}\n\n.inactiveHandlingModal-module__nurturing_text_block__7c6JH > a {\n  text-decoration: none;\n  color: var(--bloobirds);\n}\n\n.inactiveHandlingModal-module__selects_wrapper__vdTcx {\n  margin-top: 20px;\n  width: 552px;\n  display: flex;\n  justify-content: space-between;\n}\n\n.inactiveHandlingModal-module__note_text_area__g3exU {\n  text-align: start;\n  margin-top: 15px;\n}\n\n.inactiveHandlingModal-module__reassign_selects_wrapper__ovZeS {\n  margin-top: 20px;\n  width: 552px;\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 12px;\n}\n\n.inactiveHandlingModal-module__add_task_module__P7-S- {\n  margin-top: 16px;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  align-content: center;\n}\n\n.inactiveHandlingModal-module__add_task_title__zYY-v {\n  margin-bottom: 12px;\n}\n\n.inactiveHandlingModal-module_box__wk4LV {\n  position: relative;\n  z-index: 99;\n\n  bottom: 73%;\n  left: 50%;\n  transform: translateX(-50%);\n\n  width: 700px;\n  background: #ffffff;\n\n  /* Main/peanut-light */\n  border: 1px solid #d4e0f1;\n\n  /* snackbar-shadow */\n  box-shadow: 0 2px 8px rgba(70, 79, 87, 0.33);\n  border-radius: 4px;\n}\n\n.inactiveHandlingModal-module__nurturing_bottom__ZHzCu {\n  bottom: 68%;\n}\n\n@media (max-height: 800px) {\n  .inactiveHandlingModal-module__modal_content__KPHM4 {\n    height: calc(100vh - 155px);\n    min-height: auto;\n  }\n}\n";
var styles = {"_modal_header":"inactiveHandlingModal-module__modal_header__ZxoCb","_modal_content":"inactiveHandlingModal-module__modal_content__KPHM4","_modal_footer":"inactiveHandlingModal-module__modal_footer__tuzmm","_sections_container":"inactiveHandlingModal-module__sections_container__hoEGH","_informationPanel":"inactiveHandlingModal-module__informationPanel__MaCXN","_info_header":"inactiveHandlingModal-module__info_header__blo6e","_stage_callout__wrapper":"inactiveHandlingModal-module__stage_callout__wrapper__57xPV","_stage_callout__icon":"inactiveHandlingModal-module__stage_callout__icon__O8Gat","actions_wrapper":"inactiveHandlingModal-module_actions_wrapper__NYYgm","_cadence_preview_wrapper":"inactiveHandlingModal-module__cadence_preview_wrapper__dg03R","_nurturing_preview_wrapper":"inactiveHandlingModal-module__nurturing_preview_wrapper__eDsWf","_section__wrapper":"inactiveHandlingModal-module__section__wrapper__nBtuk","_list__wrapper":"inactiveHandlingModal-module__list__wrapper__L95Zx","hidden":"inactiveHandlingModal-module_hidden__Pk-NC","_text_block":"inactiveHandlingModal-module__text_block__1CsMZ","_nurturing_text_block":"inactiveHandlingModal-module__nurturing_text_block__7c6JH","_selects_wrapper":"inactiveHandlingModal-module__selects_wrapper__vdTcx","_note_text_area":"inactiveHandlingModal-module__note_text_area__g3exU","_reassign_selects_wrapper":"inactiveHandlingModal-module__reassign_selects_wrapper__ovZeS","_add_task_module":"inactiveHandlingModal-module__add_task_module__P7-S-","_add_task_title":"inactiveHandlingModal-module__add_task_title__zYY-v","box":"inactiveHandlingModal-module_box__wk4LV","_nurturing_bottom":"inactiveHandlingModal-module__nurturing_bottom__ZHzCu"};
styleInject(css_248z);

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _excluded = ["dataModel"],
  _excluded2 = ["children", "dataModel"];
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
  return function (_ref) {
    var dataModel = _ref.dataModel,
      props = _objectWithoutProperties(_ref, _excluded);
    return /*#__PURE__*/jsx(InactiveHandlingModalProvider, _objectSpread(_objectSpread({
      dataModel: dataModel
    }, props), {}, {
      children: /*#__PURE__*/jsx(Component, _objectSpread({}, props))
    }));
  };
};
var InactiveHandlingModalContext = /*#__PURE__*/createContext(null);
function getFieldValues(dataModel, logicRole) {
  var _dataModelFields$find;
  var dataModelFields = dataModel === null || dataModel === void 0 ? void 0 : dataModel.getFieldsByBobjectType(getBobjectFromLogicRole(logicRole));
  return dataModelFields === null || dataModelFields === void 0 ? void 0 : (_dataModelFields$find = dataModelFields.find(function (datamodelField) {
    return datamodelField.logicRole === logicRole;
  })) === null || _dataModelFields$find === void 0 ? void 0 : _dataModelFields$find.values;
}
var InactiveHandlingModalProvider = function InactiveHandlingModalProvider(_ref2) {
  var children = _ref2.children,
    dataModel = _ref2.dataModel,
    props = _objectWithoutProperties(_ref2, _excluded2);
  var activeUserId = useActiveUserId();
  var accountId = dataModel === null || dataModel === void 0 ? void 0 : dataModel.getAccountId();
  var discardedReasons = getFieldValues(dataModel, COMPANY_FIELDS_LOGIC_ROLE.DISCARDED_REASONS);
  var closedLostReason = getFieldValues(dataModel, OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSED_LOST_REASON);
  var onHoldReasons = getFieldValues(dataModel, COMPANY_FIELDS_LOGIC_ROLE.ON_HOLD_REASONS);
  var users = getFieldValues(dataModel, COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO).filter(function (user) {
    return !user.name.includes('Deleted');
  });
  return /*#__PURE__*/jsx(InactiveHandlingModalContext.Provider, {
    value: _objectSpread(_objectSpread({}, props), {}, {
      activeUserId: activeUserId,
      accountId: accountId,
      fields: {
        users: users,
        discardedReasons: discardedReasons,
        closedLostReason: closedLostReason,
        onHoldReasons: onHoldReasons
      }
    }),
    children: children
  });
};
var useInactiveHandlingModal = function useInactiveHandlingModal() {
  var context = useContext(InactiveHandlingModalContext);
  if (context === undefined) {
    throw new Error('useInactiveHandlingModal must be used within the modal provider');
  }
  return context;
};
var InactiveHandlingModal = function InactiveHandlingModal(props) {
  var _bobject$id, _bobject$id2, _bobject$id3;
  var _useState = useState({
      type: INACTIVE_HANDLING_OPTIONS.NEXT_STEP,
      data: {}
    }),
    _useState2 = _slicedToArray(_useState, 2),
    selectedOptionData = _useState2[0],
    setSelectedOptionData = _useState2[1];
  var bobject = props.bobject,
    handleClose = props.handleClose;
  var _useInactiveHandlingM = useInactiveHandlingModalData(selectedOptionData),
    handleSubmit = _useInactiveHandlingM.handleSubmit,
    getIsMissingInfo = _useInactiveHandlingM.getIsMissingInfo,
    isInSalesStage = _useInactiveHandlingM.isInSalesStage,
    isSubmitting = _useInactiveHandlingM.isSubmitting;
  /*const hasOnHoldReasons =
    useGlobalPicklistValues({
      logicRole: GLOBAL_PICKLISTS.ON_HOLD_REASONS,
    })?.filter(reason => reason.enabled)?.length !== 0;*/

  var isMissingInfo = getIsMissingInfo({
    selectedOptionData: selectedOptionData,
    hasNeededNurturingInfo: true,
    hasOnHoldReasons: (bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.typeName) !== 'Opportunity'
  });
  useEffect(function () {
    removeScrollOfBox();
    return recoverScrollOfBox;
  }, []);
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsx(Modal, {
      width: 680,
      open: true,
      onClose: handleClose,
      children: /*#__PURE__*/jsxs("div", {
        className: styles._modal_wrapper,
        children: [/*#__PURE__*/jsxs(ModalHeader, {
          className: styles._modal_header,
          children: [/*#__PURE__*/jsxs(ModalTitle, {
            color: "peanut",
            icon: "rewind",
            size: "small",
            children: ["This ", bobject === null || bobject === void 0 ? void 0 : (_bobject$id2 = bobject.id) === null || _bobject$id2 === void 0 ? void 0 : _bobject$id2.typeName.toLowerCase(), " will become inactive"]
          }), /*#__PURE__*/jsx(ModalCloseIcon, {
            color: "peanut",
            size: "small",
            onClick: handleClose
          })]
        }), /*#__PURE__*/jsxs(ModalContent, {
          className: styles._modal_content,
          children: [/*#__PURE__*/jsxs("div", {
            className: styles._sections_container,
            children: [/*#__PURE__*/jsx(ActionSelector, {
              selectedOptionHandler: [selectedOptionData, setSelectedOptionData],
              bobjectType: bobject === null || bobject === void 0 ? void 0 : (_bobject$id3 = bobject.id) === null || _bobject$id3 === void 0 ? void 0 : _bobject$id3.typeName,
              isInSalesStage: isInSalesStage
            }), /*#__PURE__*/jsx(InformationPanel, {
              selectedOption: selectedOptionData,
              bobject: bobject
            })]
          }), /*#__PURE__*/jsx(ActionForm, {
            selectedOptionHandler: [selectedOptionData, setSelectedOptionData],
            bobject: bobject,
            isSalesBobject: isInSalesStage
          })]
        }), /*#__PURE__*/jsxs(ModalFooter, {
          className: styles._modal_footer,
          children: [/*#__PURE__*/jsx("div", {
            children: /*#__PURE__*/jsx(Button, {
              variant: "clear",
              onClick: handleClose,
              uppercase: true,
              children: "cancel"
            })
          }), /*#__PURE__*/jsx(Tooltip, {
            title: isMissingInfo ? 'Required info missing' : '',
            position: "top",
            children: /*#__PURE__*/jsx(Button, {
              onClick: handleSubmit,
              disabled: isMissingInfo || isSubmitting,
              uppercase: true,
              children: "confirm"
            })
          })]
        })]
      })
    })
  });
};
var InactiveModal = withProvider(InactiveHandlingModal);

export { InactiveModal, useInactiveHandlingModal };
//# sourceMappingURL=index.js.map
