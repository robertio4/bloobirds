import { useState, createContext, useContext, useRef, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Text, Select, Item, Label, Modal, ModalHeader, ModalTitle, Icon, ModalContent, ModalSection, ModalFooter, Button, Spinner } from '@bloobirds-it/flamingo-ui';
import { api, removeScrollOfBox, recoverScrollOfBox } from '@bloobirds-it/utils';
import { FIELDS_LOGIC_ROLE, CRM } from '@bloobirds-it/types';
import clsx from 'clsx';
import { useStatus } from '@bloobirds-it/hooks';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useActiveUserSettings } from '@bloobirds-it/hooks/src';
import { OPPORTUNITY_STATUS_LOGIC_ROLE } from '@bloobirds-it/types/src';

function _typeof$3(obj) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$3(obj); }
function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty$3(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(arg) { var key = _toPrimitive$3(arg, "string"); return _typeof$3(key) === "symbol" ? key : String(key); }
function _toPrimitive$3(input, hint) { if (_typeof$3(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$3(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function getIconName(bobjectType) {
  switch (bobjectType) {
    case 'Company':
      return 'company';
    case 'Lead':
      return 'person';
    case 'Opportunity':
      return 'fileOpportunity';
    default:
      return 'questionCircle';
  }
}
function isStatusNewOrBacklog(status) {
  return status.logicRole.includes('NEW') || status.logicRole.includes('BACKLOG');
}
function showUnassignedWarning(status, isAssigned) {
  if (!status) return false;
  return isAssigned && isStatusNewOrBacklog(status);
}
function showStopCadenceWarning(selectedStatus) {
  if (!selectedStatus) return false;
  return selectedStatus.logicRole.includes('MEETING') || selectedStatus.logicRole.includes('ACCOUNT') || selectedStatus.logicRole.includes('NURTURING') || selectedStatus.logicRole.includes('DISCARDED');
}
function isStatusWithReason(selectedStatus) {
  if (!selectedStatus) return false;
  return selectedStatus.logicRole.includes('ON_HOLD') || selectedStatus.logicRole.includes('DISCARDED') || selectedStatus.logicRole.includes('NURTURING');
}
function shouldBeAssigned(isAssigned, selectedStatus) {
  if (!selectedStatus) return false;
  return !isAssigned && !isStatusNewOrBacklog(selectedStatus);
}
var getAditionalInfo = function getAditionalInfo(fieldsLogicRoles, selectedStatus, selectedReason, selectedUser) {
  var reasonedStatusKey = "".concat(selectedStatus.logicRole.replace(/__STATUS|_STATUS_/gi, ''), "_REASONS");
  return _objectSpread$3(_objectSpread$3({}, selectedReason ? _defineProperty$3({}, reasonedStatusKey, selectedReason.value) : {}), selectedUser ? _defineProperty$3({}, fieldsLogicRoles.ASSIGNED_TO, selectedUser.id) : {});
};
function buildRequestBody(_ref3) {
  var bobjectType = _ref3.bobjectType,
    selectedStatus = _ref3.selectedStatus,
    selectedReason = _ref3.selectedReason,
    selectedUser = _ref3.selectedUser,
    isSales = _ref3.isSales;
  var fieldsLogicRoles = FIELDS_LOGIC_ROLE[bobjectType];
  var statusKey = "".concat(isSales ? 'SALES_' : '', "STATUS");
  var additionalInfo = {};
  if (bobjectType !== 'Opportunity') {
    additionalInfo = getAditionalInfo(fieldsLogicRoles, selectedStatus, selectedReason, selectedUser);
  }
  return _objectSpread$3(_defineProperty$3({}, fieldsLogicRoles[statusKey], selectedStatus.id), additionalInfo);
}

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

var css_248z$1 = ".changeStatusModal-module__section__wrapper__XNIIo {\n  margin-bottom: 24px;\n}\n\n.changeStatusModal-module__content__wrapper__6offy {\n  padding-top: 5px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n  width: 100%;\n}\n\n.changeStatusModal-module__lead_info_container__sdZMR {\n  width: 180px;\n  margin: 0 auto;\n}\n\n.changeStatusModal-module__name__wrapper__ilRIe {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-bottom: 6px;\n}\n\n.changeStatusModal-module__name__wrapper__ilRIe > p {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  padding-right: 12px;\n}\n\n.changeStatusModal-module__name__wrapper__ilRIe > svg {\n  margin-right: 4px;\n}\n\n.changeStatusModal-module__currentStatus__wrapper__yQFOz {\n  margin-bottom: 24px;\n}\n\n.changeStatusModal-module__currentStatus__wrapper__yQFOz > div {\n  padding: 4px 16px;\n  text-align: center;\n  opacity: 0.5;\n}\n\n.changeStatusModal-module__change_lead_status__wrapper__E29k8 {\n  width: 420px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.changeStatusModal-module__change_status__wrapper__bkJWn {\n  width: 100%;\n}\n\n.changeStatusModal-module__list_status__p1tt- > div {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 12px;\n}\n\n.changeStatusModal-module__status_wrapper__gRYlG {\n  display: flex;\n  justify-content: center;\n  margin: 8px 0;\n  box-sizing: border-box;\n}\n\n.changeStatusModal-module__list_status__p1tt- > div > div,\n.changeStatusModal-module__currentStatus__wrapper__yQFOz > div {\n  width: 148px;\n}\n\n.changeStatusModal-module__radios_list_status__07n91 {\n  width: 420px;\n}\n\n.changeStatusModal-module__radios_list_status__07n91 > div > div {\n  letter-spacing: 0;\n  margin-bottom: 10px;\n  padding: 6px 12px;\n}\n\n.changeStatusModal-module__title__wrapper__sQeax {\n  margin-bottom: 15px;\n}\n\n.changeStatusModal-module__title__wrapper__centered__jjWj3 {\n  display: flex;\n  justify-content: center;\n}\n\n.changeStatusModal-module__reason__wrapper__xFyES {\n  width: 50%;\n}\n\n.changeStatusModal-module__reason__wrapper__xFyES input:hover {\n  box-shadow: none !important;\n  border: none !important;\n  color: var(--peanut) !important;\n  outline: none;\n}\n\n.changeStatusModal-module__buttons__wrapper__VEDsa {\n  display: flex;\n  width: 100%;\n}\n\n.changeStatusModal-module__buttons__wrapper__VEDsa > button:nth-child(2) {\n  margin-left: auto;\n  margin-right: 16px;\n}\n\n.changeStatusModal-module__warning__banner__3zjSv {\n  background-color: var(--verySoftBanana);\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 8px 0;\n}\n\n.changeStatusModal-module__status__jZ-ft {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  margin-top: 18px;\n}\n\n.changeStatusModal-module__status_left__Zw25o {\n  width: 200px;\n  padding-right: 20px;\n  box-sizing: border-box;\n}\n\n.changeStatusModal-module__status_right__dNEiJ {\n  width: 200px;\n  padding-left: 20px;\n  box-sizing: border-box;\n}\n\n.changeStatusModal-module__status_center_solo__eLonD {\n  box-sizing: border-box;\n}\n";
var styles$1 = {"_section__wrapper":"changeStatusModal-module__section__wrapper__XNIIo","_content__wrapper":"changeStatusModal-module__content__wrapper__6offy","_lead_info_container":"changeStatusModal-module__lead_info_container__sdZMR","_name__wrapper":"changeStatusModal-module__name__wrapper__ilRIe","_currentStatus__wrapper":"changeStatusModal-module__currentStatus__wrapper__yQFOz","_change_lead_status__wrapper":"changeStatusModal-module__change_lead_status__wrapper__E29k8","_change_status__wrapper":"changeStatusModal-module__change_status__wrapper__bkJWn","_list_status":"changeStatusModal-module__list_status__p1tt-","_status_wrapper":"changeStatusModal-module__status_wrapper__gRYlG","_radios_list_status":"changeStatusModal-module__radios_list_status__07n91","_title__wrapper":"changeStatusModal-module__title__wrapper__sQeax","_title__wrapper__centered":"changeStatusModal-module__title__wrapper__centered__jjWj3","_reason__wrapper":"changeStatusModal-module__reason__wrapper__xFyES","_buttons__wrapper":"changeStatusModal-module__buttons__wrapper__VEDsa","_warning__banner":"changeStatusModal-module__warning__banner__3zjSv","_status":"changeStatusModal-module__status__jZ-ft","_status_left":"changeStatusModal-module__status_left__Zw25o","_status_right":"changeStatusModal-module__status_right__dNEiJ","_status_center_solo":"changeStatusModal-module__status_center_solo__eLonD"};
styleInject(css_248z$1);

function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
var _excluded$1 = ["children"],
  _excluded2$1 = ["selectedStatus", "setSelectedStatus", "selectedReason", "setSelectedReason"];
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
function _objectWithoutProperties$1(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$1(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var ChangeStatusModalContext = /*#__PURE__*/createContext(null);
var ChangeStatusModalProvider = function ChangeStatusModalProvider(_ref) {
  var children = _ref.children,
    props = _objectWithoutProperties$1(_ref, _excluded$1);
  var statusInfo = props.statusInfo,
    bobject = props.bobject;
  var bobjectType = bobject.id.typeName;
  var icon = getIconName(bobjectType);
  var isAssigned = !!bobject.assignedTo;
  var isInactive = bobject.cadence && bobject.isInactive;
  var hasStartedCadence = !!bobject.cadence;
  var _useState = useState(),
    _useState2 = _slicedToArray$3(_useState, 2),
    selectedUser = _useState2[0],
    setSelectedUser = _useState2[1];
  var _useState3 = useState(),
    _useState4 = _slicedToArray$3(_useState3, 2),
    errors = _useState4[0],
    setErrors = _useState4[1];
  var _useStatus = useStatus(bobject),
    selectedStatus = _useStatus.selectedStatus,
    setSelectedStatus = _useStatus.setSelectedStatus,
    selectedReason = _useStatus.selectedReason,
    setSelectedReason = _useStatus.setSelectedReason,
    statusOptions = _objectWithoutProperties$1(_useStatus, _excluded2$1);
  return /*#__PURE__*/jsx(ChangeStatusModalContext.Provider, {
    value: _objectSpread$2(_objectSpread$2({
      bobject: bobject,
      bobjectType: bobjectType,
      icon: icon,
      handleSelectedReason: [selectedReason, function (value) {
        setSelectedReason(value);
        setErrors(undefined);
      }],
      handleSelectedUser: [selectedUser, function (value) {
        setSelectedUser(value);
        setErrors(undefined);
      }],
      handleSelectedStatus: [selectedStatus, function (value) {
        setSelectedStatus(value);
        setErrors(undefined);
      }],
      handleErrors: [errors, setErrors],
      isAssigned: isAssigned,
      hasStartedCadence: hasStartedCadence,
      isInactive: isInactive
    }, statusInfo), statusOptions),
    children: children
  });
};
var useChangeStatusContext = function useChangeStatusContext() {
  var context = useContext(ChangeStatusModalContext);
  if (context === undefined) {
    throw new Error('useInactiveHandlingModal must be used within the modal provider');
  }
  return context;
};
var checkForErrors = function checkForErrors(_ref2, _ref3, requiredAssigned, requiredReasonedStatuses, t) {
  var selectedStatus = _ref2.selectedStatus,
    selectedReason = _ref2.selectedReason,
    selectedUser = _ref2.selectedUser,
    isAssigned = _ref2.isAssigned;
  var _ref4 = _slicedToArray$3(_ref3, 2),
    setErrors = _ref4[1];
  if (!requiredAssigned && !requiredReasonedStatuses) return false;
  var missingReason = requiredReasonedStatuses && isStatusWithReason(selectedStatus) && !selectedReason;
  var missingAssignee = requiredAssigned && shouldBeAssigned(isAssigned, selectedStatus) && !selectedUser;
  if (missingAssignee || missingReason) {
    var errorsObject = _objectSpread$2(_objectSpread$2({}, missingReason ? {
      statusReason: t('common.fieldRequired')
    } : {}), missingAssignee ? {
      assignedUser: t('common.fieldRequired')
    } : {});
    setErrors(errorsObject);
    return true;
  }
  return false;
};
var useChangeStatusData = function useChangeStatusData() {
  var _useChangeStatusConte = useChangeStatusContext(),
    handleErrors = _useChangeStatusConte.handleErrors,
    availableUsers = _useChangeStatusConte.availableUsers,
    availableStatuses = _useChangeStatusConte.availableStatuses;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  function handleSave(data, setIsSubmitting) {
    //This should be handled on an error resolution
    if (checkForErrors(data, handleErrors, availableUsers.isRequired, availableStatuses.isRequired, t)) return setIsSubmitting(false);else {
      var requestBody = buildRequestBody(data);
      return api.patch("/bobjects/".concat(data.bobject.id.value, "/raw"), requestBody);
    }
  }
  return {
    handleSave: handleSave
  };
};

function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2(); }
function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$2(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }
var AditionalInfoSelect = function AditionalInfoSelect() {
  var _availableReasons$val, _availableUsers$value;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var _useChangeStatusConte = useChangeStatusContext(),
    _useChangeStatusConte2 = _slicedToArray$2(_useChangeStatusConte.handleSelectedStatus, 1),
    selectedStatus = _useChangeStatusConte2[0],
    _useChangeStatusConte3 = _slicedToArray$2(_useChangeStatusConte.handleErrors, 1),
    errors = _useChangeStatusConte3[0],
    isAssigned = _useChangeStatusConte.isAssigned,
    bobjectType = _useChangeStatusConte.bobjectType,
    _useChangeStatusConte4 = _slicedToArray$2(_useChangeStatusConte.handleSelectedReason, 2),
    selectedReason = _useChangeStatusConte4[0],
    setSelectedReason = _useChangeStatusConte4[1],
    _useChangeStatusConte5 = _slicedToArray$2(_useChangeStatusConte.handleSelectedUser, 2),
    selectedUser = _useChangeStatusConte5[0],
    setSelectedUser = _useChangeStatusConte5[1],
    availableReasons = _useChangeStatusConte.availableReasons,
    availableUsers = _useChangeStatusConte.availableUsers;
  var needsAssignedTo = shouldBeAssigned(isAssigned, selectedStatus);
  var reasonedStatus = isStatusWithReason(selectedStatus);
  var aditionalInfoNeeded = needsAssignedTo || reasonedStatus;
  var isFirstRender = useRef(true);
  var reasonsRef = useRef(null);
  var assignedRef = useRef(null);
  useEffect(function () {
    if (isFirstRender !== null && isFirstRender !== void 0 && isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (reasonsRef !== null && reasonsRef !== void 0 && reasonsRef.current) {
      var _reasonsRef$current;
      reasonsRef === null || reasonsRef === void 0 ? void 0 : (_reasonsRef$current = reasonsRef.current) === null || _reasonsRef$current === void 0 ? void 0 : _reasonsRef$current.scrollIntoView({
        behavior: 'smooth'
      });
    } else if (assignedRef !== null && assignedRef !== void 0 && assignedRef.current) {
      var _assignedRef$current;
      assignedRef === null || assignedRef === void 0 ? void 0 : (_assignedRef$current = assignedRef.current) === null || _assignedRef$current === void 0 ? void 0 : _assignedRef$current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [selectedStatus]);
  if (!aditionalInfoNeeded) return null;
  return /*#__PURE__*/jsxs(Fragment, {
    children: [reasonedStatus && availableReasons.values.length > 0 && /*#__PURE__*/jsxs("div", {
      className: styles$1._section__wrapper,
      ref: reasonsRef,
      children: [/*#__PURE__*/jsx("div", {
        className: clsx(styles$1._title__wrapper, styles$1._title__wrapper__centered),
        children: /*#__PURE__*/jsx(Text, {
          size: "m",
          weight: "medium",
          color: "peanut",
          children: t('changeStatusModal.reasonedStatus.title')
        })
      }), /*#__PURE__*/jsx("div", {
        className: styles$1._content__wrapper,
        children: /*#__PURE__*/jsx("div", {
          className: styles$1._reason__wrapper,
          children: /*#__PURE__*/jsx(Select, {
            value: selectedReason,
            placeholder: t('changeStatusModal.reasonedStatus.placeholder', {
              bobjectType: bobjectType,
              selectedStatus: selectedStatus.name,
              required: availableReasons.isRequired ? '*' : ''
            }),
            width: "100%",
            onChange: setSelectedReason,
            error: errors === null || errors === void 0 ? void 0 : errors.statusReason,
            children: availableReasons === null || availableReasons === void 0 ? void 0 : (_availableReasons$val = availableReasons.values) === null || _availableReasons$val === void 0 ? void 0 : _availableReasons$val.map(function (reason) {
              return /*#__PURE__*/jsx(Item, {
                value: reason,
                children: reason.label
              }, reason.value);
            })
          })
        })
      })]
    }), needsAssignedTo && /*#__PURE__*/jsxs("div", {
      className: styles$1._section__wrapper,
      ref: assignedRef,
      children: [/*#__PURE__*/jsx("div", {
        className: clsx(styles$1._title__wrapper, styles$1._title__wrapper__centered),
        children: /*#__PURE__*/jsx(Text, {
          size: "m",
          weight: "medium",
          color: "peanut",
          children: t("changeStatusModal.assignedTo.".concat(bobjectType))
        })
      }), /*#__PURE__*/jsx("div", {
        className: styles$1._content__wrapper,
        children: /*#__PURE__*/jsx("div", {
          className: styles$1._reason__wrapper,
          children: availableUsers && /*#__PURE__*/jsx(Select, {
            value: selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.id,
            placeholder: t('changeStatusModal.assignedTo.placeholder', {
              required: availableUsers.isRequired ? '*' : ''
            }),
            width: "100%",
            error: errors === null || errors === void 0 ? void 0 : errors.assignedUser,
            children: availableUsers === null || availableUsers === void 0 ? void 0 : (_availableUsers$value = availableUsers.values) === null || _availableUsers$value === void 0 ? void 0 : _availableUsers$value.map(function (user) {
              return /*#__PURE__*/jsx(Item, {
                value: user === null || user === void 0 ? void 0 : user.id,
                onClick: function onClick() {
                  return setSelectedUser(user);
                },
                children: user.name
              }, "user-assigned-item-".concat(user === null || user === void 0 ? void 0 : user.id));
            })
          })
        })
      })]
    })]
  });
};

var css_248z = ".statusSelector-module__section__wrapper__bJTdH {\n  margin-bottom: 24px;\n}\n\n.statusSelector-module__content__wrapper__buYyM {\n  padding-top: 5px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n  width: 100%;\n}\n\n.statusSelector-module__lead_info_container__6Q4vb {\n  width: 180px;\n  margin: 0 auto;\n}\n\n.statusSelector-module__name__wrapper__234QE {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-bottom: 6px;\n}\n\n.statusSelector-module__name__wrapper__234QE > p {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  padding-right: 12px;\n}\n\n.statusSelector-module__name__wrapper__234QE > svg {\n  margin-right: 4px;\n}\n\n.statusSelector-module__currentStatus__wrapper__Je6TI {\n  margin-bottom: 24px;\n}\n\n.statusSelector-module__currentStatus__wrapper__Je6TI > div {\n  padding: 4px 16px;\n  text-align: center;\n  opacity: 0.5;\n}\n\n.statusSelector-module__change_lead_status__wrapper__tXUEC {\n  width: 420px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.statusSelector-module__change_status__wrapper__-T6mj {\n  width: 100%;\n}\n\n.statusSelector-module__list_status__iIA2G > div {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 12px;\n}\n\n.statusSelector-module__status_wrapper__zvOCQ {\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  margin: 8px 0;\n  box-sizing: border-box;\n}\n\n.statusSelector-module__list_status__iIA2G > div > div,\n.statusSelector-module__currentStatus__wrapper__Je6TI > div {\n  width: 148px;\n}\n\n.statusSelector-module__radios_list_status__ZqVyi {\n  width: 420px;\n}\n\n.statusSelector-module__radios_list_status__ZqVyi > div > div {\n  letter-spacing: 0;\n  margin-bottom: 10px;\n  padding: 6px 12px;\n}\n\n.statusSelector-module__title__wrapper__Wv-Zo {\n  margin-bottom: 15px;\n}\n\n.statusSelector-module__title__wrapper__centered__P8AhO {\n  display: flex;\n  justify-content: center;\n}\n\n.statusSelector-module__reason__wrapper__JOYbS {\n  width: 50%;\n}\n\n.statusSelector-module__buttons__wrapper__KoxO5 {\n  display: flex;\n  width: 100%;\n}\n\n.statusSelector-module__buttons__wrapper__KoxO5 > button:nth-child(2) {\n  margin-left: auto;\n  margin-right: 16px;\n}\n\n.statusSelector-module__warning__banner__8d9Xi {\n  background-color: var(--verySoftBanana);\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 8px 0;\n}\n\n.statusSelector-module__status__lBCN6 {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  margin-top: 18px;\n}\n\n.statusSelector-module__status_left__W1uhM {\n  width: 200px;\n  padding-right: 20px;\n  box-sizing: border-box;\n}\n\n.statusSelector-module__status_right__M4O5M {\n  width: 200px;\n  padding-left: 20px;\n  box-sizing: border-box;\n}\n\n.statusSelector-module__status_center_solo__V9OcY {\n  box-sizing: border-box;\n  width: 200px;\n}\n";
var styles = {"_section__wrapper":"statusSelector-module__section__wrapper__bJTdH","_content__wrapper":"statusSelector-module__content__wrapper__buYyM","_lead_info_container":"statusSelector-module__lead_info_container__6Q4vb","_name__wrapper":"statusSelector-module__name__wrapper__234QE","_currentStatus__wrapper":"statusSelector-module__currentStatus__wrapper__Je6TI","_change_lead_status__wrapper":"statusSelector-module__change_lead_status__wrapper__tXUEC","_change_status__wrapper":"statusSelector-module__change_status__wrapper__-T6mj","_list_status":"statusSelector-module__list_status__iIA2G","_status_wrapper":"statusSelector-module__status_wrapper__zvOCQ","_radios_list_status":"statusSelector-module__radios_list_status__ZqVyi","_title__wrapper":"statusSelector-module__title__wrapper__Wv-Zo","_title__wrapper__centered":"statusSelector-module__title__wrapper__centered__P8AhO","_reason__wrapper":"statusSelector-module__reason__wrapper__JOYbS","_buttons__wrapper":"statusSelector-module__buttons__wrapper__KoxO5","_warning__banner":"statusSelector-module__warning__banner__8d9Xi","_status":"statusSelector-module__status__lBCN6","_status_left":"statusSelector-module__status_left__W1uhM","_status_right":"statusSelector-module__status_right__M4O5M","_status_center_solo":"statusSelector-module__status_center_solo__V9OcY"};
styleInject(css_248z);

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$1(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
var StatusLabelButton = function StatusLabelButton(status) {
  var _status$backgroundCol, _status$backgroundCol2, _status$textColor, _settings$account;
  var _useChangeStatusConte = useChangeStatusContext(),
    _useChangeStatusConte2 = _slicedToArray$1(_useChangeStatusConte.handleSelectedStatus, 2),
    selectedStatus = _useChangeStatusConte2[0],
    setSelectedStatus = _useChangeStatusConte2[1],
    _useChangeStatusConte3 = _slicedToArray$1(_useChangeStatusConte.handleSelectedReason, 2);
    _useChangeStatusConte3[0];
    var setSelectedReason = _useChangeStatusConte3[1];
  var isSelected = status.id === (selectedStatus === null || selectedStatus === void 0 ? void 0 : selectedStatus.id);
  var style = {
    backgroundColor: (_status$backgroundCol = status.backgroundColor) !== null && _status$backgroundCol !== void 0 ? _status$backgroundCol : 'var(--peanut)',
    borderColor: (_status$backgroundCol2 = status.backgroundColor) !== null && _status$backgroundCol2 !== void 0 ? _status$backgroundCol2 : 'var(--peanut)',
    color: (_status$textColor = status.textColor) !== null && _status$textColor !== void 0 ? _status$textColor : 'white',
    width: '100%'
  };
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var isDisabled = (settings === null || settings === void 0 ? void 0 : (_settings$account = settings.account) === null || _settings$account === void 0 ? void 0 : _settings$account.mainCrm) == CRM.DYNAMICS && [OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_LOST, OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_WON].includes(status === null || status === void 0 ? void 0 : status.logicRole);
  return /*#__PURE__*/jsx(Label, _objectSpread$1(_objectSpread$1({
    value: status.logicRole,
    dataTest: status.logicRole,
    align: "center",
    inline: false,
    selected: isSelected,
    hoverStyle: style,
    overrideStyle: {
      width: '100%',
      boxSizing: 'border-box',
      margin: '8px 0'
    }
  }, isSelected ? {
    selectedStyle: style
  } : {}), {}, {
    disabled: isDisabled,
    onClick: function onClick(e) {
      setSelectedStatus(status);
      setSelectedReason(undefined);
    },
    children: status.name
  }), "status-".concat(status === null || status === void 0 ? void 0 : status.name));
};
var StatusSelector = function StatusSelector() {
  var _useChangeStatusConte4 = useChangeStatusContext(),
    availableStatuses = _useChangeStatusConte4.availableStatuses,
    isSalesStage = _useChangeStatusConte4.isSalesStage,
    bobjectType = _useChangeStatusConte4.bobjectType;
  if (!availableStatuses) return;
  var statusesLength = availableStatuses.length;
  var halvedStatuses = statusesLength % 2 === 0 ? statusesLength / 2 : Math.floor(statusesLength / 2) + 1;
  var isOpportunity = bobjectType === 'Opportunity';
  return isSalesStage ? /*#__PURE__*/jsx("div", {
    className: styles._status,
    children: /*#__PURE__*/jsx("div", _objectSpread$1(_objectSpread$1({
      className: styles._status_center_solo
    }, isOpportunity ? {
      style: {
        width: '370px'
      }
    } : {}), {}, {
      children: availableStatuses.map(StatusLabelButton)
    }))
  }) : /*#__PURE__*/jsxs("div", {
    className: styles._status,
    children: [/*#__PURE__*/jsx("div", {
      className: styles._status_left,
      children: availableStatuses.slice(0, halvedStatuses).map(StatusLabelButton)
    }), /*#__PURE__*/jsx("div", {
      className: styles._status_right,
      children: availableStatuses.slice(halvedStatuses, statusesLength).map(StatusLabelButton)
    })]
  });
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _excluded = ["children"],
  _excluded2 = ["onSave", "handleClose"];
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
    _ref.children;
      var props = _objectWithoutProperties(_ref, _excluded);
    var onSave = props.onSave,
      handleClose = props.handleClose,
      providerProps = _objectWithoutProperties(props, _excluded2);
    return /*#__PURE__*/jsx(ChangeStatusModalProvider, _objectSpread(_objectSpread({}, providerProps), {}, {
      children: /*#__PURE__*/jsx(Component, {
        onSave: onSave,
        handleClose: handleClose
      })
    }));
  };
};
var ChangeStatusModalComponent = function ChangeStatusModalComponent(_ref2) {
  var handleClose = _ref2.handleClose,
    onSave = _ref2.onSave;
  var _useChangeStatusConte = useChangeStatusContext(),
    bobject = _useChangeStatusConte.bobject,
    bobjectType = _useChangeStatusConte.bobjectType,
    icon = _useChangeStatusConte.icon,
    _useChangeStatusConte2 = _slicedToArray(_useChangeStatusConte.handleSelectedStatus, 1),
    selectedStatus = _useChangeStatusConte2[0],
    _useChangeStatusConte3 = _slicedToArray(_useChangeStatusConte.handleSelectedReason, 1),
    selectedReason = _useChangeStatusConte3[0],
    _useChangeStatusConte4 = _slicedToArray(_useChangeStatusConte.handleSelectedUser, 1),
    selectedUser = _useChangeStatusConte4[0],
    availableReasons = _useChangeStatusConte.availableReasons,
    isAssigned = _useChangeStatusConte.isAssigned,
    isSales = _useChangeStatusConte.isSales;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isSubmitting = _useState2[0],
    setIsSubmitting = _useState2[1];
  var _useChangeStatusData = useChangeStatusData(),
    handleSave = _useChangeStatusData.handleSave;
  var canSave = !isStatusWithReason(selectedStatus) || !(availableReasons !== null && availableReasons !== void 0 && availableReasons.isRequired) || isStatusWithReason(selectedStatus) && selectedReason;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'bobjectTypes'
    }),
    bobjectT = _useTranslation2.t;
  useEffect(function () {
    removeScrollOfBox();
    return recoverScrollOfBox;
  }, []);
  function handleSubmit() {
    setIsSubmitting(true);
    var data = {
      bobject: bobject,
      bobjectType: bobjectType,
      selectedStatus: selectedStatus,
      selectedReason: selectedReason,
      selectedUser: selectedUser,
      isSales: isSales,
      isAssigned: isAssigned
    };
    handleSave(data, setIsSubmitting).then(onSave);
  }
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsx(Modal, {
      open: true,
      onClose: handleClose,
      children: /*#__PURE__*/jsxs("div", {
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        children: [/*#__PURE__*/jsx(ModalHeader, {
          children: /*#__PURE__*/jsx(ModalTitle, {
            children: t('changeStatusModal.modalTitle', {
              bobjectType: bobjectT(bobjectType === null || bobjectType === void 0 ? void 0 : bobjectType.toLowerCase())
            })
          })
        }), showUnassignedWarning(selectedStatus, isAssigned) && /*#__PURE__*/jsxs("div", {
          className: styles$1._warning__banner,
          children: [/*#__PURE__*/jsx(Icon, {
            name: "person",
            color: "banana"
          }), /*#__PURE__*/jsx(Text, {
            size: "s",
            color: "peanut",
            children: /*#__PURE__*/jsx(Trans, {
              i18nKey: "changeStatusModal.stopCadenceWarning",
              values: {
                bobjectType: bobjectType.toLowerCase()
              }
            })
          })]
        }), showStopCadenceWarning(selectedStatus) && /*#__PURE__*/jsxs("div", {
          className: styles$1._warning__banner,
          children: [/*#__PURE__*/jsx(Icon, {
            name: "cadence",
            color: "banana"
          }), /*#__PURE__*/jsx(Text, {
            size: "s",
            color: "peanut",
            children: /*#__PURE__*/jsx(Trans, {
              i18nKey: "changeStatusModal.stopCadenceWarning"
            })
          })]
        }), /*#__PURE__*/jsx(ModalContent, {
          children: /*#__PURE__*/jsxs(ModalSection, {
            size: "l",
            title: t("changeStatusModal.title.".concat(bobjectType)),
            icon: icon,
            children: [/*#__PURE__*/jsx("div", {
              className: styles$1._section__wrapper,
              children: /*#__PURE__*/jsx("div", {
                className: styles$1._content__wrapper,
                children: /*#__PURE__*/jsxs("div", {
                  className: styles$1._change_status__wrapper,
                  children: [/*#__PURE__*/jsxs("div", {
                    className: styles$1._name__wrapper,
                    children: [/*#__PURE__*/jsx(Icon, {
                      color: "verySoftPeanut",
                      name: icon
                    }), /*#__PURE__*/jsx(Text, {
                      dataTest: "Modal-StatusUpdate",
                      size: "m",
                      color: "peanut",
                      children: bobject.name
                    })]
                  }), /*#__PURE__*/jsx(StatusSelector, {})]
                })
              })
            }), /*#__PURE__*/jsx(AditionalInfoSelect, {})]
          })
        }), /*#__PURE__*/jsx(ModalFooter, {
          children: /*#__PURE__*/jsxs("div", {
            className: styles$1._buttons__wrapper,
            children: [/*#__PURE__*/jsx(Button, {
              variant: "clear",
              color: "tomato",
              onClick: handleClose,
              children: t('common.cancel')
            }), /*#__PURE__*/jsx(Button, {
              dataTest: "ChangeStatus-Save",
              disabled: isSubmitting || !canSave,
              onClick: handleSubmit,
              children: isSubmitting ? /*#__PURE__*/jsx(Spinner, {
                name: "loadingCircle",
                size: 14,
                color: "white"
              }) : t('common.save').toUpperCase()
            })]
          })
        })]
      })
    })
  });
};
var ChangeStatusModal = withProvider(ChangeStatusModalComponent);

export { ChangeStatusModal };
//# sourceMappingURL=index.js.map
