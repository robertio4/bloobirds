import React, { useEffect, useMemo, useState, useRef, useCallback, useContext, createContext } from 'react';
import { api, getAccountId, getUserId, getUserName, isOpportunity, getReferencedBobjectFromLogicRole, getFieldByLogicRole, isActivity, getValueFromLogicRole, isLead, isCompany, getTextFromLogicRole, getUserTimeZone, keepPreviousResponse, injectReferencesSearchProcess, parseEvents, getFieldTextById, getBobjectFromLogicRole, injectReferenceFields, getISODate, isLeadPage, isLeadWithoutCompanyPage, isCompanyPage, isOpportunityPage, constructMixpanelCustomRoute, addTaskDateGrouping, fetchLanguages } from '@bloobirds-it/utils';
import { atom, useRecoilState, selector, useRecoilValue, atomFamily, useResetRecoilState, useSetRecoilState } from 'recoil';
import useSWRImmutable from 'swr/immutable';
import useSWR, { useSWRConfig } from 'swr';
import { useSearchSubscription, useEventSubscription } from '@bloobirds-it/plover';
import { BOBJECT_TYPES, OPPORTUNITY_FIELDS_LOGIC_ROLE, ACTIVITY_FIELDS_LOGIC_ROLE, TASK_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, COMPANY_FIELDS_LOGIC_ROLE, BobjectTypes, ACTIVITY_TYPES, UserPermission, getQuickStartGuideBlocks, getAdminQuickStartGuideBlocks, CustomUserHelperKeys, UserHelperTooltipsKeys, ACTIVITY_TYPES_VALUES_LOGIC_ROLE, MessagesEvents, MINIMIZABLE_MODALS, MIXPANEL_EVENTS, NotificationsCategory, REPORTED_VALUES_LOGIC_ROLE, TemplateStage, TASK_TYPE, TASK_ACTION_VALUE, TASK_STATUS_VALUE_LOGIC_ROLE, TASK_SKIPPABLE_VALUE, COMPANY_STATUS_LOGIC_ROLE, SALESFORCE_LOGIC_ROLES, FIELDS_LOGIC_ROLE, OPPORTUNITY_STATUS_LOGIC_ROLE, LEAD_SALES_STATUS_VALUES_LOGIC_ROLE, LEAD_STATUS_LOGIC_ROLE, COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE, AVAILABLE_COMPANY_STATUS_LOGIC_ROLE, TASK_ACTION, SALESFORCE, SessionStorageKeys, ACTIVITY_DIRECTION, UserTeamRole, UserHelperKeys } from '@bloobirds-it/types';
import { recoilPersist } from 'recoil-persist';
import spacetime from 'spacetime';
import { useToasts, createToast } from '@bloobirds-it/flamingo-ui';
import { useDebounce as useDebounce$1 } from 'use-debounce';
import { getI18n, useTranslation } from 'react-i18next';
import isObject from 'lodash/isObject';
import { jsx } from 'react/jsx-runtime';
import sortBy from 'lodash/sortBy';
import mixpanel from 'mixpanel-browser';
import { v4 } from 'uuid';
import useSWRInfinite from 'swr/infinite';
import { getI18nSpacetimeLng } from '@bloobirds-it/internationalization';
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import queryString from 'query-string';
import { BobjectTypes as BobjectTypes$1 } from '@bloobirds-it/types/src';
import { startOfDay, subDays } from 'date-fns';
import hash from 'object-hash';
import { useActiveUserSettings as useActiveUserSettings$1 } from '@bloobirds-it/hooks';

var useUserSettings = function useUserSettings() {
  var _useSWR = useSWR('/utils/service/users/extension/settings', function () {
      return api.get('/utils/service/users/settings', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {}
      }).then(function (res) {
        return res.data;
      });
    }),
    data = _useSWR.data;
  return data;
};

function _slicedToArray$D(arr, i) { return _arrayWithHoles$F(arr) || _iterableToArrayLimit$D(arr, i) || _unsupportedIterableToArray$H(arr, i) || _nonIterableRest$F(); }
function _nonIterableRest$F() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$H(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$H(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$H(o, minLen); }
function _arrayLikeToArray$H(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$D(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$F(arr) { if (Array.isArray(arr)) return arr; }
var accountIdAtom = atom({
  key: 'accountIdAtom',
  "default": null
});
var useActiveAccountId = function useActiveAccountId() {
  var _useRecoilState = useRecoilState(accountIdAtom),
    _useRecoilState2 = _slicedToArray$D(_useRecoilState, 2),
    accountId = _useRecoilState2[0],
    setAccountId = _useRecoilState2[1];
  useEffect(function () {
    var _getAccountId;
    (_getAccountId = getAccountId()) === null || _getAccountId === void 0 ? void 0 : _getAccountId.then(function (id) {
      return setAccountId(id);
    });
  }, []);
  return accountId;
};
var useActiveAccountSettings = function useActiveAccountSettings() {
  var accountId = useActiveAccountId();
  var isLoggedIn = !!accountId;
  var _useSWRImmutable = useSWRImmutable(isLoggedIn ? '/utils/service/accounts/settings' : null, function () {
      return api.get('/utils/service/accounts/settings').then(function (res) {
        return res.data;
      });
    }),
    settings = _useSWRImmutable.data;
  var getAccountSetting = function getAccountSetting(setting) {
    return settings ? settings[setting] : false;
  };
  return {
    settings: settings,
    getAccountSetting: getAccountSetting,
    isLoading: !settings
  };
};
var useNoStatusOppSetting = function useNoStatusOppSetting() {
  var _useActiveAccountSett = useActiveAccountSettings(),
    getAccountSetting = _useActiveAccountSett.getAccountSetting;
  return getAccountSetting('NO_STATUS_OPP');
};
var useB2CShowAccountPhonesSetting = function useB2CShowAccountPhonesSetting() {
  var _useActiveAccountSett2 = useActiveAccountSettings(),
    getAccountSetting = _useActiveAccountSett2.getAccountSetting,
    isLoading = _useActiveAccountSett2.isLoading;
  return isLoading ? null : getAccountSetting('B2C_SHOW_ACCOUNT_PHONES');
};
var useIsOTOAccount = function useIsOTOAccount() {
  var _userData$user;
  var _useActiveAccountSett3 = useActiveAccountSettings(),
    getAccountSetting = _useActiveAccountSett3.getAccountSetting;
  var userData = useUserSettings();
  return getAccountSetting('OTO_ACCOUNT') || (userData === null || userData === void 0 ? void 0 : (_userData$user = userData.user) === null || _userData$user === void 0 ? void 0 : _userData$user.otoUser);
};
var useEmailIntegrationMode = function useEmailIntegrationMode() {
  var _useActiveAccountSett4 = useActiveAccountSettings(),
    getAccountSetting = _useActiveAccountSett4.getAccountSetting;
  var accountSetting = getAccountSetting('EMAIL_INTEGRATION_MODE');
  return {
    userIntegrationMode: accountSetting === 'user_integration',
    accountIntegrationMode: accountSetting !== 'user_integration'
  };
};
var useIsB2CAccount = function useIsB2CAccount() {
  var _useActiveAccountSett5 = useActiveAccountSettings(),
    getAccountSetting = _useActiveAccountSett5.getAccountSetting,
    isLoading = _useActiveAccountSett5.isLoading;
  return isLoading ? null : getAccountSetting('B2C_ACCOUNT');
};
var useIsNoStatusPlanAccount = function useIsNoStatusPlanAccount() {
  var _useActiveAccountSett6 = useActiveAccountSettings(),
    getAccountSetting = _useActiveAccountSett6.getAccountSetting;
  return getAccountSetting('NO_STATUS_PLAN');
};
var useIsPersonAccountAsAccount = function useIsPersonAccountAsAccount() {
  var _useActiveAccountSett7 = useActiveAccountSettings(),
    getAccountSetting = _useActiveAccountSett7.getAccountSetting;
  return getAccountSetting('PERSONACCOUNT_AS_ACCOUNT');
};
var useAircallPhoneLinkEnabled = function useAircallPhoneLinkEnabled() {
  var _useActiveAccountSett8 = useActiveAccountSettings(),
    getAccountSetting = _useActiveAccountSett8.getAccountSetting;
  return getAccountSetting('AIRCALL_PHONE_LINK');
};
var useOpenCCFWithoutObject = function useOpenCCFWithoutObject() {
  var _useActiveAccountSett9 = useActiveAccountSettings(),
    getAccountSetting = _useActiveAccountSett9.getAccountSetting;
  return getAccountSetting('OPEN_CCF_WITHOUT_OBJECT');
};
var useIsAutoSyncFromDifferentOwner = function useIsAutoSyncFromDifferentOwner() {
  var _useActiveAccountSett10 = useActiveAccountSettings(),
    getAccountSetting = _useActiveAccountSett10.getAccountSetting;
  return getAccountSetting('AUTO_SYNC_FROM_DIFFERENT_OWNER');
};

function _typeof$y(obj) { "@babel/helpers - typeof"; return _typeof$y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$y(obj); }
function ownKeys$l(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$l(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$l(Object(source), !0).forEach(function (key) { _defineProperty$q(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$l(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$q(obj, key, value) { key = _toPropertyKey$q(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$q(arg) { var key = _toPrimitive$q(arg, "string"); return _typeof$y(key) === "symbol" ? key : String(key); }
function _toPrimitive$q(input, hint) { if (_typeof$y(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$y(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$C(arr, i) { return _arrayWithHoles$E(arr) || _iterableToArrayLimit$C(arr, i) || _unsupportedIterableToArray$G(arr, i) || _nonIterableRest$E(); }
function _nonIterableRest$E() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$G(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$G(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$G(o, minLen); }
function _arrayLikeToArray$G(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$C(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$E(arr) { if (Array.isArray(arr)) return arr; }
var messagingStageFilter = atom({
  key: 'activeMessagingStageFilter',
  "default": 'PROSPECT'
});
var messagingVisibilityFilter = atom({
  key: 'activeMessagingVisibilityFilter',
  "default": null
});
var messagingSegmentationValuesIds = atom({
  key: 'activeMessagingSegmentationValuesIds',
  "default": {}
});
var messagingNameFilter = atom({
  key: 'activeMessagingNameFilter',
  "default": null
});
var messagingMineFilter = atom({
  key: 'activeMessagingMineFilterAtom',
  "default": false
});
var messagingBattlecardsFilter = atom({
  key: 'activeMessagingBattlecardsFilterAtom',
  "default": false
});
var messagingOfficialFilter = atom({
  key: 'activeMessagingOfficialFilterAtom',
  "default": false
});
var messagingShowCadenceTemplatesFilter = atom({
  key: 'activeMessagingShowCadenceTemplatesFilter',
  "default": null
});
var messagingFilters = selector({
  key: 'activeMessagingFilterAtom',
  get: function get(_ref) {
    var _get = _ref.get;
    return {
      stage: _get(messagingStageFilter),
      visibility: _get(messagingVisibilityFilter),
      onlyMine: _get(messagingMineFilter),
      onlyOfficials: _get(messagingOfficialFilter),
      onlyBattlecards: _get(messagingBattlecardsFilter),
      segmentationValues: _get(messagingSegmentationValuesIds),
      name: _get(messagingNameFilter),
      showCadencesTemplates: _get(messagingShowCadenceTemplatesFilter)
    };
  }
});
var useActiveMessagingStageFilter = function useActiveMessagingStageFilter() {
  return useRecoilState(messagingStageFilter);
};
var useActiveMessagingNameFilter = function useActiveMessagingNameFilter() {
  return useRecoilState(messagingNameFilter);
};
var useActiveMessagingVisibilityFilter = function useActiveMessagingVisibilityFilter() {
  return useRecoilState(messagingVisibilityFilter);
};
var useActiveMessagingMineFilter = function useActiveMessagingMineFilter() {
  return useRecoilState(messagingMineFilter);
};
var useActiveMessagingBattleCardsFilter = function useActiveMessagingBattleCardsFilter() {
  return useRecoilState(messagingBattlecardsFilter);
};
var useActiveMessagingOfficialFilter = function useActiveMessagingOfficialFilter() {
  return useRecoilState(messagingOfficialFilter);
};
var useActiveMessagingCadenceFilter = function useActiveMessagingCadenceFilter() {
  return useRecoilState(messagingShowCadenceTemplatesFilter);
};
var useActiveMessagingSegmentationValuesFilter = function useActiveMessagingSegmentationValuesFilter() {
  var _useRecoilState = useRecoilState(messagingSegmentationValuesIds),
    _useRecoilState2 = _slicedToArray$C(_useRecoilState, 2),
    segmentationValues = _useRecoilState2[0],
    setAllSegmentationValues = _useRecoilState2[1];
  var setOneSegmentationValue = function setOneSegmentationValue(filterId, value) {
    if (!value) {
      var newValue = _objectSpread$l({}, segmentationValues);
      // @ts-ignore
      delete newValue[filterId];
      setAllSegmentationValues(newValue);
    } else {
      setAllSegmentationValues(_objectSpread$l(_objectSpread$l({}, segmentationValues), {}, _defineProperty$q({}, filterId, [value])));
    }
  };
  var resetActiveMessagingFilters = function resetActiveMessagingFilters() {
    return setAllSegmentationValues({});
  };
  return {
    segmentationValues: segmentationValues,
    setOneSegmentationValue: setOneSegmentationValue,
    setAllSegmentationValues: setAllSegmentationValues,
    resetActiveMessagingFilters: resetActiveMessagingFilters
  };
};

// TODO: Move to useState when refactor
var useActiveMessagingFilters = function useActiveMessagingFilters() {
  return useRecoilValue(messagingFilters);
};

function _typeof$x(obj) { "@babel/helpers - typeof"; return _typeof$x = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$x(obj); }
function _regeneratorRuntime$j() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$j = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$x(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$j(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$j(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$j(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$j(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray$B(arr, i) { return _arrayWithHoles$D(arr) || _iterableToArrayLimit$B(arr, i) || _unsupportedIterableToArray$F(arr, i) || _nonIterableRest$D(); }
function _nonIterableRest$D() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$F(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$F(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$F(o, minLen); }
function _arrayLikeToArray$F(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$B(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$D(arr) { if (Array.isArray(arr)) return arr; }
var userIdAtom = atom({
  key: 'userIdAtom',
  "default": null
});
var useActiveUserId = function useActiveUserId() {
  var _useRecoilState = useRecoilState(userIdAtom),
    _useRecoilState2 = _slicedToArray$B(_useRecoilState, 2),
    userId = _useRecoilState2[0],
    setUserId = _useRecoilState2[1];
  useEffect(function () {
    getUserId().then(function (id) {
      return setUserId(id);
    });
  }, []);
  return userId;
};
var useActiveUserName = function useActiveUserName() {
  var _useSWR = useSWR('/user/me/name', getUserName),
    userName = _useSWR.data;
  return userName;
};
var getUserSettings = function getUserSettings() {
  return api.get('/utils/service/users/settings').then(function (result) {
    return result === null || result === void 0 ? void 0 : result.data;
  });
};
var useActiveUserSettings = function useActiveUserSettings() {
  var isLoggedIn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var _useSWR2 = useSWR(!isLoggedIn ? null : '/utils/service/users/settings', getUserSettings, {
      revalidateOnFocus: false
    }),
    settings = _useSWR2.data,
    mutate = _useSWR2.mutate;
  var saveUserSettings = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator$j( /*#__PURE__*/_regeneratorRuntime$j().mark(function _callee(activeUserId, settingsToSet) {
      return _regeneratorRuntime$j().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return api.patch("/entities/users/".concat(activeUserId), settingsToSet);
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function saveUserSettings(_x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
  return {
    settings: settings,
    mutate: mutate,
    saveUserSettings: saveUserSettings
  };
};
var useUserTimeZone = function useUserTimeZone() {
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  return settings === null || settings === void 0 ? void 0 : settings.user.timeZone;
};

function _slicedToArray$A(arr, i) { return _arrayWithHoles$C(arr) || _iterableToArrayLimit$A(arr, i) || _unsupportedIterableToArray$E(arr, i) || _nonIterableRest$C(); }
function _nonIterableRest$C() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$E(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$E(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$E(o, minLen); }
function _arrayLikeToArray$E(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$A(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$C(arr) { if (Array.isArray(arr)) return arr; }
var addToCalendarOpenAtom = atom({
  key: 'addToCalendarOpen',
  "default": false
});
var addToCalendarAtom = atom({
  key: 'addToCalendar',
  "default": {
    isOpen: false,
    leadId: null,
    opportunityId: null,
    dateTime: null,
    title: null,
    companyId: null,
    guests: null,
    bobjectType: null,
    accountExecutiveId: null,
    note: null,
    duration: null,
    successCallback: function successCallback() {}
  }
});
var useAddToCalendarVisibility = function useAddToCalendarVisibility() {
  var _useRecoilState = useRecoilState(addToCalendarOpenAtom),
    _useRecoilState2 = _slicedToArray$A(_useRecoilState, 2),
    addToCalendarOpen = _useRecoilState2[0],
    setAddToCalendarOpen = _useRecoilState2[1];
  var _useRecoilValue = useRecoilValue(addToCalendarAtom),
    successCallback = _useRecoilValue.successCallback;
  var openAddToCalendarModal = function openAddToCalendarModal() {
    setAddToCalendarOpen(true);
  };
  var closeAddToCalendarModal = function closeAddToCalendarModal() {
    setAddToCalendarOpen(false);
    if (successCallback) {
      successCallback();
    }
  };
  return {
    isOpen: addToCalendarOpen,
    openAddToCalendarModal: openAddToCalendarModal,
    closeAddToCalendarModal: closeAddToCalendarModal
  };
};
var useAddToCalendar = function useAddToCalendar() {
  var _useRecoilState3 = useRecoilState(addToCalendarAtom),
    _useRecoilState4 = _slicedToArray$A(_useRecoilState3, 2),
    addToCalendarState = _useRecoilState4[0],
    setAddToCalendarState = _useRecoilState4[1];
  var _useAddToCalendarVisi = useAddToCalendarVisibility(),
    closeAddToCalendarModal = _useAddToCalendarVisi.closeAddToCalendarModal,
    openAddToCalendarModal = _useAddToCalendarVisi.openAddToCalendarModal,
    isOpen = _useAddToCalendarVisi.isOpen;
  return {
    addToCalendarState: addToCalendarState,
    isOpen: isOpen,
    closeAddToCalendarModal: closeAddToCalendarModal,
    openAddToCalendarModal: openAddToCalendarModal,
    setAddToCalendarState: setAddToCalendarState
  };
};

function _typeof$w(obj) { "@babel/helpers - typeof"; return _typeof$w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$w(obj); }
function ownKeys$k(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$k(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$k(Object(source), !0).forEach(function (key) { _defineProperty$p(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$k(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _slicedToArray$z(arr, i) { return _arrayWithHoles$B(arr) || _iterableToArrayLimit$z(arr, i) || _unsupportedIterableToArray$D(arr, i) || _nonIterableRest$B(); }
function _nonIterableRest$B() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit$z(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$B(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime$i() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$i = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$w(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _toConsumableArray$9(arr) { return _arrayWithoutHoles$9(arr) || _iterableToArray$c(arr) || _unsupportedIterableToArray$D(arr) || _nonIterableSpread$9(); }
function _nonIterableSpread$9() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$D(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$D(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$D(o, minLen); }
function _iterableToArray$c(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$9(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$D(arr); }
function _arrayLikeToArray$D(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep$i(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$i(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$i(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$i(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _defineProperty$p(obj, key, value) { key = _toPropertyKey$p(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$p(arg) { var key = _toPrimitive$p(arg, "string"); return _typeof$w(key) === "symbol" ? key : String(key); }
function _toPrimitive$p(input, hint) { if (_typeof$w(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$w(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var loadingAtom$1 = atomFamily({
  key: 'bobjectFormLoading',
  "default": true
});
var sectionsAtom = atomFamily({
  key: 'bobjectFormSections',
  "default": []
});
var cachedFieldGroups = {};
function getLeadsRequest(bobject, companyId) {
  if (companyId) {
    return {
      query: _defineProperty$p({}, LEAD_FIELDS_LOGIC_ROLE.COMPANY, [companyId]),
      formFields: true,
      pageSize: 50
    };
  }
  return null;
}
function getOpportunitiesRequest(companyId) {
  if (companyId) {
    return {
      query: _defineProperty$p({}, OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY, [companyId]),
      formFields: true,
      pageSize: 50
    };
  }
  //TODO: Opportunities of the leads are not yet supported
  return null;
}
var fetchFieldGroups = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator$i( /*#__PURE__*/_regeneratorRuntime$i().mark(function _callee(bobjectType) {
    var response;
    return _regeneratorRuntime$i().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(bobjectType in cachedFieldGroups)) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", _toConsumableArray$9(cachedFieldGroups[bobjectType]));
        case 2:
          _context.next = 4;
          return api.get("/utils/service/view/field/groups/".concat(bobjectType));
        case 4:
          response = _context.sent;
          cachedFieldGroups[bobjectType] = response.data.sections;
          return _context.abrupt("return", response.data.sections);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fetchFieldGroups(_x) {
    return _ref.apply(this, arguments);
  };
}();
var shouldShowStatusFields = function shouldShowStatusFields(bobjectType, field, isSalesStage, isProspectingStage) {
  if (bobjectType === BOBJECT_TYPES.LEAD || bobjectType === BOBJECT_TYPES.COMPANY) {
    if ((field === null || field === void 0 ? void 0 : field.logicRole) === (bobjectType === null || bobjectType === void 0 ? void 0 : bobjectType.toUpperCase()) + '__STATUS' && isSalesStage) {
      return false;
    } else if ((field === null || field === void 0 ? void 0 : field.logicRole) === (bobjectType === null || bobjectType === void 0 ? void 0 : bobjectType.toUpperCase()) + '__SALES_STATUS' && isProspectingStage) return false;
    return true;
  } else {
    return true;
  }
};
var fetchRequiredMeetingFields = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator$i( /*#__PURE__*/_regeneratorRuntime$i().mark(function _callee2() {
    return _regeneratorRuntime$i().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", api.get('/utils/service/view/field/required/beforeMeeting'));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function fetchRequiredMeetingFields() {
    return _ref2.apply(this, arguments);
  };
}();
var satisfiesCrossFieldConditions = function satisfiesCrossFieldConditions(_ref3) {
  var conditions = _ref3.conditions,
    _ref3$referencedBobje = _ref3.referencedBobjects,
    referencedBobjects = _ref3$referencedBobje === void 0 ? {} : _ref3$referencedBobje;
  var translateBobject = function translateBobject(type) {
    return referencedBobjects[type.toLowerCase()];
  };
  return conditions === null || conditions === void 0 ? void 0 : conditions.every(function (condition) {
    return condition.fieldValues.some(function (value) {
      var _translateBobject, _translateBobject$raw, _translateBobject$raw2;
      return ((_translateBobject = translateBobject(condition.field.bobjectType)) === null || _translateBobject === void 0 ? void 0 : (_translateBobject$raw = _translateBobject.raw) === null || _translateBobject$raw === void 0 ? void 0 : (_translateBobject$raw2 = _translateBobject$raw.contents) === null || _translateBobject$raw2 === void 0 ? void 0 : _translateBobject$raw2[condition.field.name]) === value.value;
    });
  });
};
var satisfiesCrossValueConditions = function satisfiesCrossValueConditions(_ref4) {
  var _value$conditions;
  var value = _ref4.value,
    _ref4$referencedBobje = _ref4.referencedBobjects,
    referencedBobjects = _ref4$referencedBobje === void 0 ? {} : _ref4$referencedBobje;
  var translateBobject = function translateBobject(type) {
    return referencedBobjects[type.toLowerCase()];
  };
  return (_value$conditions = value.conditions) === null || _value$conditions === void 0 ? void 0 : _value$conditions.some(function (condition) {
    var _translateBobject2;
    return ((_translateBobject2 = translateBobject(condition.requiredFieldBobjectType)) === null || _translateBobject2 === void 0 ? void 0 : _translateBobject2.raw.contents[condition.requiredFieldId]) === condition.requiredValueId;
  });
};
var useBobjectFieldGroupsCleaning = function useBobjectFieldGroupsCleaning() {
  var cleanCachedBobjectGroups = function cleanCachedBobjectGroups() {
    Object.keys(cachedFieldGroups).forEach(function (type) {
      delete cachedFieldGroups[type];
    });
  };
  return {
    cleanCachedBobjectGroups: cleanCachedBobjectGroups
  };
};
var useBobjectFieldGroups = function useBobjectFieldGroups(_ref5) {
  var _opportunitiesData$da, _leadsData$data, _getFieldByLogicRole;
  var bobject = _ref5.bobject,
    bobjectType = _ref5.bobjectType,
    companyBobjectId = _ref5.companyBobjectId,
    _ref5$generateSection = _ref5.generateSections,
    generateSections = _ref5$generateSection === void 0 ? true : _ref5$generateSection,
    _ref5$options = _ref5.options,
    options = _ref5$options === void 0 ? {
      type: undefined
    } : _ref5$options,
    modalId = _ref5.modalId,
    _ref5$segmentatedQQs = _ref5.segmentatedQQs,
    segmentatedQQs = _ref5$segmentatedQQs === void 0 ? undefined : _ref5$segmentatedQQs;
  if (!generateSections) {
    return {
      loading: false,
      sections: null
    };
  }
  var _useRecoilState = useRecoilState(loadingAtom$1(modalId || companyBobjectId)),
    _useRecoilState2 = _slicedToArray$z(_useRecoilState, 2),
    loading = _useRecoilState2[0],
    setLoading = _useRecoilState2[1];
  var _useRecoilState3 = useRecoilState(sectionsAtom(modalId || companyBobjectId)),
    _useRecoilState4 = _slicedToArray$z(_useRecoilState3, 2),
    sections = _useRecoilState4[0],
    setSections = _useRecoilState4[1];
  var _useSWR = useSWR(companyBobjectId ? "/Company/".concat(companyBobjectId, "/form") : null, function () {
      return api.get("/bobjects/".concat(companyBobjectId, "/form"));
    }, {
      revalidateOnFocus: false
    }),
    company = _useSWR.data;
  var _useSearchSubscriptio = useSearchSubscription(getLeadsRequest(bobject, companyBobjectId), BOBJECT_TYPES.LEAD),
    leadsData = _useSearchSubscriptio.data;
  var _useSearchSubscriptio2 = useSearchSubscription(getOpportunitiesRequest(companyBobjectId), BOBJECT_TYPES.OPPORTUNITY),
    opportunitiesData = _useSearchSubscriptio2.data;
  var opportunities = opportunitiesData === null || opportunitiesData === void 0 ? void 0 : (_opportunitiesData$da = opportunitiesData.data) === null || _opportunitiesData$da === void 0 ? void 0 : _opportunitiesData$da.contents;
  var opportunityLeadObj = isOpportunity(bobject) ? getReferencedBobjectFromLogicRole(bobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.PRIMARY_CONTACT) : null;
  var opportunityLead = opportunityLeadObj ? [opportunityLeadObj] : null;
  var leads = leadsData === null || leadsData === void 0 ? void 0 : (_leadsData$data = leadsData.data) === null || _leadsData$data === void 0 ? void 0 : _leadsData$data.contents;
  var bobjectStage = (_getFieldByLogicRole = getFieldByLogicRole(bobject, (bobjectType === null || bobjectType === void 0 ? void 0 : bobjectType.toUpperCase()) + '__STAGE')) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.valueLogicRole;
  var isProspectingStage = bobjectStage === undefined || bobjectStage === (bobjectType === null || bobjectType === void 0 ? void 0 : bobjectType.toUpperCase()) + '__STAGE__PROSPECTING';
  var isSalesStage = bobjectStage === (bobjectType === null || bobjectType === void 0 ? void 0 : bobjectType.toUpperCase()) + '__STAGE__SALES';
  var segmentatedQQsLength = segmentatedQQs ? segmentatedQQs === null || segmentatedQQs === void 0 ? void 0 : segmentatedQQs.length : 0;
  useEffect(function () {
    if (!bobjectType) return;
    var leadAssociated = getReferencedBobjectFromLogicRole(bobject, isActivity(bobject) ? ACTIVITY_FIELDS_LOGIC_ROLE.LEAD : TASK_FIELDS_LOGIC_ROLE.LEAD);
    var bobjectLeads = isOpportunity(bobject) && !companyBobjectId ? opportunityLead : companyBobjectId ? leads : leadAssociated ? [leadAssociated] : leads;
    var referencedLeads = bobjectLeads !== null && bobjectLeads !== void 0 && bobjectLeads.length ? bobjectLeads === null || bobjectLeads === void 0 ? void 0 : bobjectLeads.map(function (lead) {
      return {
        conditions: [],
        logicRole: null,
        parentFieldValueValue: null,
        value: lead.id.value
      };
    }) : [];
    var referencedOpportunities = opportunities === null || opportunities === void 0 ? void 0 : opportunities.map(function (opp) {
      return {
        conditions: [],
        label: getValueFromLogicRole(opp, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME, true),
        logicRole: null,
        parentFieldValueValue: null,
        value: opp.id.value
      };
    });
    if (!cachedFieldGroups[bobjectType]) {
      setLoading(true);
    }
    fetchFieldGroups(bobjectType).then(function (response) {
      var newSections = response.map(function (section) {
        var _section$fields, _section$fields$map;
        var fields = section === null || section === void 0 ? void 0 : (_section$fields = section.fields) === null || _section$fields === void 0 ? void 0 : (_section$fields$map = _section$fields.map(function (field) {
          var newField = _objectSpread$k({}, field);
          if (newField.type === 'Reference' && newField.referencedBobjectType === 'Lead') {
            newField.fieldValues = isLead(bobject) && (referencedLeads === null || referencedLeads === void 0 ? void 0 : referencedLeads.length) === 0 ? [{
              conditions: [],
              logicRole: null,
              parentFieldValueValue: null,
              value: bobject.id.value
            }] : referencedLeads;
          } else if (newField.type === 'Reference' && newField.referencedBobjectType === 'Opportunity') {
            newField.fieldValues = referencedOpportunities;
          }
          return newField;
        })) === null || _section$fields$map === void 0 ? void 0 : _section$fields$map.filter(function (field) {
          return shouldShowStatusFields(bobjectType, field, isSalesStage, isProspectingStage);
        });
        return _objectSpread$k(_objectSpread$k({}, section), {}, {
          fields: fields
        });
      });
      if (bobjectType === 'Activity' && (options === null || options === void 0 ? void 0 : options.type) === 'Meeting') {
        fetchRequiredMeetingFields().then(function (res) {
          var resp = res === null || res === void 0 ? void 0 : res.data;
          var response = res === null || res === void 0 ? void 0 : res.data;
          if (segmentatedQQs) {
            var _resp$;
            response = [_objectSpread$k(_objectSpread$k({}, resp[0]), {}, {
              fields: (_resp$ = resp[0]) === null || _resp$ === void 0 ? void 0 : _resp$.fields.filter(function (field) {
                return segmentatedQQs.includes(field.label);
              })
            })];
          }
          setSections([].concat(_toConsumableArray$9(newSections), _toConsumableArray$9(response)));
          setLoading(false);
        });
      } else {
        setSections(newSections);
      }
      setLoading(false);
    });
  }, [bobjectType, leads, opportunities, segmentatedQQsLength, company]);
  var sectionsWithCrossConditions = useMemo(function () {
    var _sections$filter;
    return sections === null || sections === void 0 ? void 0 : (_sections$filter = sections.filter(function (section) {
      return section === null || section === void 0 ? void 0 : section.fields;
    })) === null || _sections$filter === void 0 ? void 0 : _sections$filter.map(function (section) {
      var _section$fields2;
      return _objectSpread$k(_objectSpread$k({}, section), {}, {
        fields: section === null || section === void 0 ? void 0 : (_section$fields2 = section.fields) === null || _section$fields2 === void 0 ? void 0 : _section$fields2.map(function (field) {
          var _field$fieldValues, _field$fieldCondition;
          var fieldHasCrossConditions = field === null || field === void 0 ? void 0 : (_field$fieldValues = field.fieldValues) === null || _field$fieldValues === void 0 ? void 0 : _field$fieldValues.map(function (value) {
            var _value$conditions2;
            return _objectSpread$k(_objectSpread$k({}, value), {}, {
              conditions: (_value$conditions2 = value.conditions) === null || _value$conditions2 === void 0 ? void 0 : _value$conditions2.filter(function (condition) {
                return condition.isCrossBobject;
              })
            });
          }).some(function (crossValue) {
            var _crossValue$condition;
            return ((_crossValue$condition = crossValue.conditions) === null || _crossValue$condition === void 0 ? void 0 : _crossValue$condition.length) > 0;
          });
          return _objectSpread$k(_objectSpread$k({}, field), {}, {
            satisfiesFieldCrossCondition: satisfiesCrossFieldConditions({
              conditions: (_field$fieldCondition = field.fieldConditionsByField) === null || _field$fieldCondition === void 0 ? void 0 : _field$fieldCondition.filter(function (condition) {
                return condition.field.bobjectType !== bobjectType;
              }),
              referencedBobjects: {
                company: company
              }
            }),
            fieldValues: function fieldValues() {
              var _field$fieldValues2, _field$fieldValues3;
              var filteredValues = (_field$fieldValues2 = field.fieldValues) === null || _field$fieldValues2 === void 0 ? void 0 : _field$fieldValues2.filter(function (fieldValue) {
                var _fieldValue$condition;
                var valueHasCrossConditions = (_fieldValue$condition = fieldValue.conditions) === null || _fieldValue$condition === void 0 ? void 0 : _fieldValue$condition.some(function (condition) {
                  return condition.isCrossBobject;
                });
                if (valueHasCrossConditions) {
                  var _fieldValue$condition2;
                  return satisfiesCrossValueConditions({
                    value: _objectSpread$k(_objectSpread$k({}, fieldValue), {}, {
                      conditions: (_fieldValue$condition2 = fieldValue.conditions) === null || _fieldValue$condition2 === void 0 ? void 0 : _fieldValue$condition2.filter(function (condition) {
                        return condition.isCrossBobject;
                      })
                    }),
                    referencedBobjects: {
                      company: company
                      // lead: selectedLead,
                      // opportunity: selectedOpportunity,
                    }
                  });
                }

                return fieldHasCrossConditions && valueHasCrossConditions;
              });
              return (filteredValues === null || filteredValues === void 0 ? void 0 : filteredValues.length) === 0 && ((_field$fieldValues3 = field.fieldValues) === null || _field$fieldValues3 === void 0 ? void 0 : _field$fieldValues3.length) > 0 ? _toConsumableArray$9((field === null || field === void 0 ? void 0 : field.fieldValues) || []) : filteredValues;
            }
          });
        })
      });
    });
  }, [sections]);
  return {
    loading: loading,
    sections: sectionsWithCrossConditions
  };
};

function _slicedToArray$y(arr, i) { return _arrayWithHoles$A(arr) || _iterableToArrayLimit$y(arr, i) || _unsupportedIterableToArray$C(arr, i) || _nonIterableRest$A(); }
function _nonIterableRest$A() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$C(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$C(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$C(o, minLen); }
function _arrayLikeToArray$C(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$y(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$A(arr) { if (Array.isArray(arr)) return arr; }
var isWebsocketDataActionForWithId = function isWebsocketDataActionForWithId(bobjectType, id, wsMessage) {
  if (wsMessage.type === 'WEBSOCKET_MESSAGE_INCOMING' && wsMessage.data.action === 'data' && wsMessage.data.bobjectType === bobjectType) {
    var shortId = id && id.split('/').length === 3 ? id.split('/')[2] : id;
    return wsMessage.data.ids.includes(id) || wsMessage.data.ids.includes(shortId);
  }
  return false;
};
var useBobjectRefresh = function useBobjectRefresh(bobjectId, bobjectType, callback) {
  var _useState = useState(false),
    _useState2 = _slicedToArray$y(_useState, 2),
    isSubscribed = _useState2[0],
    setIsSubscribed = _useState2[1];
  useEventSubscription("data-".concat(bobjectType), function (data) {
    if (isWebsocketDataActionForWithId(bobjectType, bobjectId, {
      type: 'WEBSOCKET_MESSAGE_INCOMING',
      data: data
    })) {
      callback(bobjectType, bobjectId);
      setIsSubscribed(true);
    }
  }, {
    createSubscription: !isSubscribed
  });
};

function _typeof$v(obj) { "@babel/helpers - typeof"; return _typeof$v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$v(obj); }
function ownKeys$j(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$j(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$j(Object(source), !0).forEach(function (key) { _defineProperty$o(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$j(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$o(obj, key, value) { key = _toPropertyKey$o(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$o(arg) { var key = _toPrimitive$o(arg, "string"); return _typeof$v(key) === "symbol" ? key : String(key); }
function _toPrimitive$o(input, hint) { if (_typeof$v(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$v(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var searchQuery = {
  page: 0,
  formFields: true,
  pageSize: 100,
  injectReferences: true,
  sort: []
};
var fetchLeadsByRelatedBobject = function fetchLeadsByRelatedBobject(bobjectType, bobjectId, accountId) {
  return api.post('/bobjects/' + accountId + '/Lead/search', _objectSpread$j({
    query: _defineProperty$o({}, "LEAD__".concat(bobjectType.toUpperCase()), [bobjectId])
  }, searchQuery));
};
var useGetBobjectByTypeAndId = function useGetBobjectByTypeAndId(bobjectId) {
  var injectReferences = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var _useSWR = useSWR(bobjectId ? "/".concat(bobjectId, "/form") : null, function () {
      return api.get("/bobjects/".concat(bobjectId, "/form?injectReferences=").concat(injectReferences));
    }),
    data = _useSWR.data,
    isValidating = _useSWR.isValidating;
  return {
    bobject: data === null || data === void 0 ? void 0 : data.data,
    isValidating: isValidating
  };
};
var useBobject = function useBobject(bobjectType, accountId) {
  var searchForBobject = function searchForBobject(queryParams) {
    return api.post("/bobjects/".concat(accountId, "/Lead/search"), _objectSpread$j({
      query: queryParams
    }, searchQuery));
  };
  var patchBobject = function patchBobject(bobjectId, data) {
    return api.patch("/bobjects/".concat(accountId, "/").concat(bobjectType, "/").concat(bobjectId, "/raw"), data);
  };
  var bulkPatchBobjects = function bulkPatchBobjects(data) {
    return api.patch("/bobjects/".concat(accountId, "/").concat(bobjectType, "/bulk"), data);
  };
  return {
    searchForBobject: searchForBobject,
    patchBobject: patchBobject,
    bulkPatchBobjects: bulkPatchBobjects
  };
};

function _toArray$2(arr) { return _arrayWithHoles$z(arr) || _iterableToArray$b(arr) || _unsupportedIterableToArray$B(arr) || _nonIterableRest$z(); }
function _iterableToArray$b(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _slicedToArray$x(arr, i) { return _arrayWithHoles$z(arr) || _iterableToArrayLimit$x(arr, i) || _unsupportedIterableToArray$B(arr, i) || _nonIterableRest$z(); }
function _nonIterableRest$z() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$B(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$B(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$B(o, minLen); }
function _arrayLikeToArray$B(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$x(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$z(arr) { if (Array.isArray(arr)) return arr; }
var fetchCadenceByTargetMarket = function fetchCadenceByTargetMarket(_ref) {
  var _ref2 = _slicedToArray$x(_ref, 2),
    url = _ref2[0],
    targetMarketName = _ref2[1];
  return api.get("".concat(url).concat(targetMarketName ? "?targetMarketName=".concat(targetMarketName) : ''));
};
var fetchCadences$1 = function fetchCadences(_ref3) {
  var _ref4 = _toArray$2(_ref3),
    url = _ref4[0],
    filters = _ref4.slice(1);
  return api.get("".concat(url, "/?bobjectTypes=").concat(filters[0]), {});
};
//TODO this should be refactored
var useCadenceInfo = function useCadenceInfo(bobjectToSet) {
  var _bobject$id, _entities$data;
  var _useState = useState(bobjectToSet),
    _useState2 = _slicedToArray$x(_useState, 2),
    bobject = _useState2[0],
    setBobject = _useState2[1];
  var typeName = bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.typeName;
  var _useSWR = useSWR(
    //TODO add parsing to request multiple bobjectypes
    //bobjectTypesToRequest ? ['/messaging/cadences', bobjectTypesToRequest.join(',')] : null,
    ['/messaging/cadences', typeName], fetchCadences$1, {
      revalidateOnFocus: false
    }),
    entities = _useSWR.data;
  var cadences = entities === null || entities === void 0 ? void 0 : (_entities$data = entities.data) === null || _entities$data === void 0 ? void 0 : _entities$data.cadences;
  var companyTM = bobject && isCompany(bobject) ? getTextFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET) : null;
  var _useSWR2 = useSWR(companyTM ? ['/service/view/cadence/targetMarket', companyTM] : null, fetchCadenceByTargetMarket, {
      revalidateOnFocus: false
    }),
    cadenceByTargetMarket = _useSWR2.data;
  var getDefaultCadence = function getDefaultCadence() {
    if (isCompany(bobject) && cadences) {
      var defaultCadenceByBobjectType = cadences === null || cadences === void 0 ? void 0 : cadences.find(function (cadence) {
        return cadence === null || cadence === void 0 ? void 0 : cadence.defaultCadence;
      });
      var defaultCadenceByTargetMarket = cadences === null || cadences === void 0 ? void 0 : cadences.find(function (cadence) {
        var _cadenceByTargetMarke;
        return cadence.name === (cadenceByTargetMarket === null || cadenceByTargetMarket === void 0 ? void 0 : (_cadenceByTargetMarke = cadenceByTargetMarket.data) === null || _cadenceByTargetMarke === void 0 ? void 0 : _cadenceByTargetMarke.name);
      });
      return defaultCadenceByTargetMarket || defaultCadenceByBobjectType;
    }
    if (isOpportunity(bobject)) {
      // TODO: Talk about how to better do this bullshit
      //return settings?.opportunityDefaultCadenceName;
      return null;
    }
    if (isLead(bobject)) {
      return cadences === null || cadences === void 0 ? void 0 : cadences.find(function (cadence) {
        return cadence.defaultCadence;
      });
    }
    return undefined;
  };
  var defaultCadence = useMemo(function () {
    return bobject && cadences && getDefaultCadence();
  }, [bobject, cadences, cadenceByTargetMarket]);
  var cadenceId = bobject === null || bobject === void 0 ? void 0 : bobject.cadence;
  useEffect(function () {
    if (bobjectToSet) {
      setBobject(bobjectToSet);
    }
  }, [bobjectToSet]);
  function getCadenceById(cadenceId) {
    return cadences === null || cadences === void 0 ? void 0 : cadences.find(function (_ref5) {
      var id = _ref5.id;
      return cadenceId === id;
    });
  }
  return {
    cadence: cadenceId ? cadences === null || cadences === void 0 ? void 0 : cadences.find(function (cadence) {
      return (cadence === null || cadence === void 0 ? void 0 : cadence.id) === cadenceId;
    }) : defaultCadence,
    defaultCadence: defaultCadence,
    getCadenceById: getCadenceById
  };
};

var useFeatureFlags = function useFeatureFlags(accountId) {
  var _featureFlags$data;
  var _useSWRImmutable = useSWRImmutable(accountId ? "/featureFlags/feature/account/".concat(accountId) : null, function () {
      return api.get("/featureFlags/feature/account/".concat(accountId));
    }, {
      revalidateOnFocus: false
    }),
    featureFlags = _useSWRImmutable.data;
  var featureFlagsArray = (featureFlags === null || featureFlags === void 0 ? void 0 : featureFlags.features) || (featureFlags === null || featureFlags === void 0 ? void 0 : (_featureFlags$data = featureFlags.data) === null || _featureFlags$data === void 0 ? void 0 : _featureFlags$data.features);
  var isFlagEnabled = function isFlagEnabled(flag) {
    var featureFlag = featureFlagsArray === null || featureFlagsArray === void 0 ? void 0 : featureFlagsArray.find(function (feature) {
      return (feature === null || feature === void 0 ? void 0 : feature.featureType) === flag || (feature === null || feature === void 0 ? void 0 : feature.featureName) === flag;
    });
    return featureFlag ? featureFlag.active : false;
  };
  return {
    featureFlags: featureFlags,
    isFlagEnabled: isFlagEnabled
  };
};
var useInboundHubspotEnabled = function useInboundHubspotEnabled(accountId) {
  var _useFeatureFlags = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags.isFlagEnabled;
  return isFlagEnabled('INBOUND_HUBSPOT');
};
var useFullSalesEnabled = function useFullSalesEnabled(accountId) {
  var _useFeatureFlags2 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags2.isFlagEnabled;
  return isFlagEnabled('SALES');
};
var useSalesDashboardEnabled = function useSalesDashboardEnabled(accountId) {
  var _useFeatureFlags3 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags3.isFlagEnabled;
  return isFlagEnabled('DASHBOARD_SALES');
};
var useOldReportingEnabled = function useOldReportingEnabled(accountId) {
  var _useFeatureFlags4 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags4.isFlagEnabled;
  return isFlagEnabled('OLD_REPORTING');
};
var useSendFromMailEnabled = function useSendFromMailEnabled(accountId) {
  var _useFeatureFlags5 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags5.isFlagEnabled;
  return isFlagEnabled('SEND_FROM_MAIL');
};
var useDynamicsEnabled = function useDynamicsEnabled(accountId) {
  var _useFeatureFlags6 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags6.isFlagEnabled;
  return isFlagEnabled('DYNAMICS');
};
var useVtigerEnabled = function useVtigerEnabled(accountId) {
  var _useFeatureFlags7 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags7.isFlagEnabled;
  return isFlagEnabled('VTIGER');
};
var useProductsEnabled = function useProductsEnabled(accountId) {
  var _useFeatureFlags8 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags8.isFlagEnabled;
  return isFlagEnabled('PRODUCTS');
};
var useSalesFollowUpEnabled = function useSalesFollowUpEnabled(accountId) {
  var _useFeatureFlags9 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags9.isFlagEnabled;
  return isFlagEnabled('SALES_FOLLOW_UP_TAB');
};
var useNewDashboardEnabled = function useNewDashboardEnabled(accountId) {
  var _useFeatureFlags10 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags10.isFlagEnabled;
  return isFlagEnabled('NEW_DASHBOARDS');
};
var useCompaniesAndLeadsEnabled = function useCompaniesAndLeadsEnabled(accountId) {
  var _useFeatureFlags11 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags11.isFlagEnabled;
  return isFlagEnabled('SALES_COMPANIES_LEADS_TAB');
};
var useSalesInactiveTabEnabled = function useSalesInactiveTabEnabled(accountId) {
  var _useFeatureFlags12 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags12.isFlagEnabled;
  return isFlagEnabled('SALES_INACTIVE_TAB');
};
var useIntegrationApp = function useIntegrationApp(accountId) {
  var _useFeatureFlags13 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags13.isFlagEnabled;
  return isFlagEnabled('INTEGRATION_APP');
};
var useSetCadenceEnabled = function useSetCadenceEnabled(accountId) {
  var _useFeatureFlags14 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags14.isFlagEnabled;
  return isFlagEnabled('SET_CADENCE');
};
var useNewMeetingTab = function useNewMeetingTab(accountId) {
  var _useFeatureFlags15 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags15.isFlagEnabled;
  return isFlagEnabled('MEETING_SALES_TAB');
};
var useProspectingNurturingTab = function useProspectingNurturingTab(accountId) {
  var _useFeatureFlags16 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags16.isFlagEnabled;
  return isFlagEnabled('NURTURING_PROSPECT_TAB');
};
var useSalesNurturingTab = function useSalesNurturingTab(accountId) {
  var _useFeatureFlags17 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags17.isFlagEnabled;
  return isFlagEnabled('NURTURING_SALES_TAB');
};
var useSalesforceOauthEnabled = function useSalesforceOauthEnabled(accountId) {
  var _useFeatureFlags18 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags18.isFlagEnabled;
  return isFlagEnabled('SALESFORCE_OAUTH');
};
function useSalesforceLeftBarEnabled(accountId) {
  var _useFeatureFlags19 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags19.isFlagEnabled;
  return isFlagEnabled('SALESFORCE_LAYER');
}
function useNewCadenceTableEnabled(accountId) {
  var _useFeatureFlags20 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags20.isFlagEnabled;
  return isFlagEnabled('NEW_CADENCE_TABLE');
}
var useSnippetsEnabled = function useSnippetsEnabled(accountId) {
  var _useFeatureFlags21 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags21.isFlagEnabled;
  return isFlagEnabled('SNIPPETS');
};
var useCadenceV2Enabled = function useCadenceV2Enabled(accountId) {
  var _useFeatureFlags22 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags22.isFlagEnabled;
  return isFlagEnabled('CADENCES_V2');
};
var useSalesforceUserAuthEnabled = function useSalesforceUserAuthEnabled(accountId) {
  var _useFeatureFlags23 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags23.isFlagEnabled;
  return isFlagEnabled('SALESFORCE_USER_INTEGRATION');
};
var useCustomWizardsEnabled = function useCustomWizardsEnabled(accountId) {
  var _useFeatureFlags24 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags24.isFlagEnabled;
  return isFlagEnabled('CUSTOM_WIZARDS');
};
var useCopilotEnabled = function useCopilotEnabled(accountId) {
  var _useFeatureFlags25 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags25.isFlagEnabled;
  return isFlagEnabled('COPILOT');
};
var useNumintecEnabled = function useNumintecEnabled(accountId) {
  var _useFeatureFlags26 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags26.isFlagEnabled;
  return isFlagEnabled('NUMINTEC_DIALER');
};
var useChangeLanguageEnabled = function useChangeLanguageEnabled(accountId) {
  var _useFeatureFlags27 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags27.isFlagEnabled;
  return isFlagEnabled('CHANGE_LANGUAGE');
};
var useTimeSlotsEnabled = function useTimeSlotsEnabled(accountId) {
  var _useFeatureFlags28 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags28.isFlagEnabled;
  return isFlagEnabled('CALENDAR_SLOTS');
};
var useWhatsappEnabled = function useWhatsappEnabled(accountId) {
  var _useFeatureFlags29 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags29.isFlagEnabled;
  return isFlagEnabled('WHATSAPP');
};
var useNewActivityFeed = function useNewActivityFeed(accountId) {
  var _useFeatureFlags30 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags30.isFlagEnabled;
  return isFlagEnabled('NEW_ACTIVITY_FEED');
};
var useNewLastActivity = function useNewLastActivity(accountId) {
  var _useFeatureFlags31 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags31.isFlagEnabled;
  return isFlagEnabled('NEW_LAST_ACTIVITY');
};
var useOtoSyncWithRelatedObjects = function useOtoSyncWithRelatedObjects(accountId) {
  var _useFeatureFlags32 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags32.isFlagEnabled;
  return isFlagEnabled('OTO_SYNC_WITH_RELATED_OBJECTS');
};
var useNotificationRemindersEnabled = function useNotificationRemindersEnabled(accountId) {
  var _useFeatureFlags33 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags33.isFlagEnabled;
  return isFlagEnabled('CALL_RESULT_NOTIFICATION_REMINDERS');
};
var useAllowBLinksInCRM = function useAllowBLinksInCRM(accountId) {
  var _useFeatureFlags34 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags34.isFlagEnabled;
  return isFlagEnabled('B_LINKS_IN_CRM');
};
var useSWRLifespanEnabled = function useSWRLifespanEnabled(accountId) {
  var _useFeatureFlags35 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags35.isFlagEnabled;
  return isFlagEnabled('SWR_LIFESPAN');
};
var useHasNewTaskFeed = function useHasNewTaskFeed(accountId) {
  var _useFeatureFlags36 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags36.isFlagEnabled;
  return isFlagEnabled('NEW_TASK_FEED');
};
var useOtoUpdateContactId = function useOtoUpdateContactId(accountId) {
  var _useFeatureFlags37 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags37.isFlagEnabled;
  return isFlagEnabled('OTO_SYNC_UPDATE_CONTACT_ID');
};
var useNumintecNewDialerVersion = function useNumintecNewDialerVersion(accountId) {
  var _useFeatureFlags38 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags38.isFlagEnabled;
  return isFlagEnabled('NUMINTEC_DIALER_NEW_VERSION');
};
var useWhatsappOpenNewPage = function useWhatsappOpenNewPage(accountId) {
  var _useFeatureFlags39 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags39.isFlagEnabled;
  return isFlagEnabled('WHATSAPP_NEW_PAGE');
};
var useAiAnalysisEnabled = function useAiAnalysisEnabled(accountId) {
  var _useFeatureFlags40 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags40.isFlagEnabled;
  return isFlagEnabled('COPILOT');
};
var useManageUserTeamsEnabled = function useManageUserTeamsEnabled(accountId) {
  var _useFeatureFlags41 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags41.isFlagEnabled;
  return isFlagEnabled('MANAGE_USER_TEAMS');
};
var useSentryUserFeedbackEnabled = function useSentryUserFeedbackEnabled(accountId) {
  var _useFeatureFlags42 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags42.isFlagEnabled;
  return isFlagEnabled('SENTRY_FEEDBACK_CAPTURING');
};
var useTimezonesEnabled = function useTimezonesEnabled(accountId) {
  var _useFeatureFlags43 = useFeatureFlags(accountId),
    isFlagEnabled = _useFeatureFlags43.isFlagEnabled;
  return isFlagEnabled('TIME_ZONES');
};

function _typeof$u(obj) { "@babel/helpers - typeof"; return _typeof$u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$u(obj); }
function _defineProperty$n(obj, key, value) { key = _toPropertyKey$n(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$n(arg) { var key = _toPrimitive$n(arg, "string"); return _typeof$u(key) === "symbol" ? key : String(key); }
function _toPrimitive$n(input, hint) { if (_typeof$u(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$u(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime$h() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$h = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$u(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$h(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$h(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$h(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$h(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var fetchCadences = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator$h( /*#__PURE__*/_regeneratorRuntime$h().mark(function _callee(url) {
    var response;
    return _regeneratorRuntime$h().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return api.get(url, {});
        case 2:
          response = _context.sent;
          return _context.abrupt("return", response.data);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fetchCadences(_x) {
    return _ref.apply(this, arguments);
  };
}();
var useCadences = function useCadences(bobjectTypeName, accountId, selectedAuthor, searchValue, requestParams) {
  var _getBobjectTypesNames;
  var includeDeleted = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var showDisabled = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
  var _ref2 = requestParams || {},
    page = _ref2.page,
    pageSize = _ref2.pageSize;
  var isFullSalesEnabled = useFullSalesEnabled(accountId);
  var getBobjectTypesNames = function getBobjectTypesNames() {
    if (bobjectTypeName) {
      return Array.isArray(bobjectTypeName) ? (bobjectTypeName === null || bobjectTypeName === void 0 ? void 0 : bobjectTypeName.length) === 0 ? [BobjectTypes.Company, BobjectTypes.Lead, isFullSalesEnabled ? BobjectTypes.Opportunity : ''] : bobjectTypeName : [bobjectTypeName];
    }
    return null;
  };
  var markAsDefault = function markAsDefault(cadenceId) {
    return api.put("/messaging/cadences/".concat(cadenceId, "/markAsDefault"));
  };
  var clone = function clone(_ref3) {
    var cadenceId = _ref3.cadenceId,
      bobjectTypeToClone = _ref3.bobjectTypeToClone,
      name = _ref3.name;
    return api.post("/messaging/cadences/".concat(cadenceId, "/clone"), {
      name: name,
      bobjectType: bobjectTypeToClone
    });
  };
  var deleteCadence = function deleteCadence(cadenceId) {
    return api["delete"]("/messaging/cadences/".concat(cadenceId), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: {}
    });
  };
  var bobjectTypesToRequest = (_getBobjectTypesNames = getBobjectTypesNames()) === null || _getBobjectTypesNames === void 0 ? void 0 : _getBobjectTypesNames.join(',');
  var _useSWR = useSWR("/messaging/cadences?bobjectTypes=".concat(bobjectTypesToRequest, "&includeDeleted=").concat(includeDeleted), fetchCadences, {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: true
    }),
    entities = _useSWR.data,
    mutate = _useSWR.mutate;
  var _useSWR2 = useSWR(selectedAuthor || searchValue || page || pageSize ? "/messaging/cadences?bobjectTypes=".concat(bobjectTypesToRequest, "&author=").concat(selectedAuthor === null || selectedAuthor === void 0 ? void 0 : selectedAuthor.join(','), "&search=").concat(searchValue !== null && searchValue !== void 0 ? searchValue : '', "&page=").concat(page, "&pageSize=").concat(pageSize).concat(showDisabled ? '' : '&enabled=true') : null, (page || pageSize) && fetchCadences, {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: true
    }),
    paginatedEntities = _useSWR2.data,
    mutatePaginatedEntities = _useSWR2.mutate,
    error = _useSWR2.error;
  var getUsesCadence = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator$h( /*#__PURE__*/_regeneratorRuntime$h().mark(function _callee2(cadenceId, bobjectTypeName) {
      var _response$data, _response$data$conten;
      var query, searchQuery, response, count;
      return _regeneratorRuntime$h().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            query = _defineProperty$n({}, "".concat(bobjectTypeName.toUpperCase(), "__CADENCE"), cadenceId);
            searchQuery = {
              query: query,
              page: 0,
              formFields: true,
              pageSize: 1000,
              injectReferences: true,
              sort: []
            };
            _context2.next = 4;
            return api.post("/bobjects/".concat(accountId, "/").concat(bobjectTypeName, "/aggregation"), searchQuery);
          case 4:
            response = _context2.sent;
            count = response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : (_response$data$conten = _response$data.contents[0]) === null || _response$data$conten === void 0 ? void 0 : _response$data$conten.value;
            return _context2.abrupt("return", count || 0);
          case 7:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function getUsesCadence(_x2, _x3) {
      return _ref4.apply(this, arguments);
    };
  }();
  return {
    cadences: entities === null || entities === void 0 ? void 0 : entities.cadences,
    paginatedCadences: paginatedEntities === null || paginatedEntities === void 0 ? void 0 : paginatedEntities.cadences,
    totalCadences: paginatedEntities === null || paginatedEntities === void 0 ? void 0 : paginatedEntities.totalElements,
    refreshCadences: mutate,
    refreshPaginatedCadences: mutatePaginatedEntities,
    isLoading: !paginatedEntities,
    error: error,
    markAsDefault: markAsDefault,
    clone: clone,
    "delete": deleteCadence,
    getUsesCadence: getUsesCadence
  };
};

function _typeof$t(obj) { "@babel/helpers - typeof"; return _typeof$t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$t(obj); }
function ownKeys$i(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$i(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$i(Object(source), !0).forEach(function (key) { _defineProperty$m(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$i(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$m(obj, key, value) { key = _toPropertyKey$m(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$m(arg) { var key = _toPrimitive$m(arg, "string"); return _typeof$t(key) === "symbol" ? key : String(key); }
function _toPrimitive$m(input, hint) { if (_typeof$t(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$t(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$w(arr, i) { return _arrayWithHoles$y(arr) || _iterableToArrayLimit$w(arr, i) || _unsupportedIterableToArray$A(arr, i) || _nonIterableRest$y(); }
function _nonIterableRest$y() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$A(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$A(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$A(o, minLen); }
function _arrayLikeToArray$A(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$w(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$y(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime$g() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$g = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$t(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$g(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$g(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$g(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$g(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var fetchConnections = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator$g( /*#__PURE__*/_regeneratorRuntime$g().mark(function _callee(url) {
    var response, defaultConnection;
    return _regeneratorRuntime$g().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return api.get('/utils' + url).then(function (res) {
            return res.data;
          });
        case 2:
          response = _context.sent;
          defaultConnection = response.nylasTokens.find(function (connection) {
            return connection["default"];
          });
          return _context.abrupt("return", {
            list: response.nylasTokens,
            defaultConnection: defaultConnection === null || defaultConnection === void 0 ? void 0 : defaultConnection.email,
            stoppedConnections: response.nylasTokens.filter(function (token) {
              return token.syncState === 'stopped' || token.syncState === 'invalid';
            })
          });
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fetchConnections(_x) {
    return _ref.apply(this, arguments);
  };
}();
var submitDefaultConnection = function submitDefaultConnection(body) {
  return api.patch('/utils/nylas/account/default', body);
};
var submitEmailAlias = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator$g( /*#__PURE__*/_regeneratorRuntime$g().mark(function _callee2(data) {
    return _regeneratorRuntime$g().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return api.post('/entities/nylasUserAccountAliases', data);
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function submitEmailAlias(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var submitUpdateAlias = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator$g( /*#__PURE__*/_regeneratorRuntime$g().mark(function _callee3(id, data) {
    return _regeneratorRuntime$g().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return api.patch('/entities/nylasUserAccountAliases/' + id, data);
        case 2:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function submitUpdateAlias(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
var removeEmailAlias = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator$g( /*#__PURE__*/_regeneratorRuntime$g().mark(function _callee4(id) {
    return _regeneratorRuntime$g().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return api["delete"]('/entities/nylasUserAccountAliases/' + id);
        case 2:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function removeEmailAlias(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
var removeConnection = function removeConnection(connectionId) {
  var url = "/utils/nylas/delete/".concat(connectionId);
  return api.post(url, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: {}
  });
};
var useEmailConnections = function useEmailConnections() {
  var _useSWR = useSWR('/nylas/connections', fetchConnections, {
      revalidateOnFocus: false
    }),
    connections = _useSWR.data,
    mutate = _useSWR.mutate;
  var _useSWR2 = useSWR('/nylas/connections/all', fetchConnections, {
      revalidateOnFocus: false
    }),
    accountConnections = _useSWR2.data;
  var _useState = useState(false),
    _useState2 = _slicedToArray$w(_useState, 2),
    isSubmitting = _useState2[0],
    setIsSubmitting = _useState2[1];
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var updateDefaultConnection = function updateDefaultConnection(newDefaultConnection) {
    setIsSubmitting(true);
    mutate(_objectSpread$i(_objectSpread$i({}, connections), {}, {
      defaultConnection: newDefaultConnection
    }), false);
    createToast({
      type: 'success',
      message: 'Your connection has been updated!'
    });
    submitDefaultConnection({
      defaultEmail: newDefaultConnection
    }).then(function () {
      setIsSubmitting(false);
    });
  };
  var disconnectConnection = function disconnectConnection(connectionId, isNylas, onError) {
    setIsSubmitting(true);
    var listName = isNylas ? 'list' : 'legacyList';
    mutate(_objectSpread$i(_objectSpread$i({}, connections), {}, _defineProperty$m({}, listName, connections[listName].filter(function (connection) {
      return connection.id !== connectionId;
    }))), false);
    createToast({
      type: 'success',
      message: 'Your connection has been removed!'
    });
    removeConnection(connectionId).then(function () {
      setIsSubmitting(false);
    })["catch"](function () {
      return onError === null || onError === void 0 ? void 0 : onError();
    });
  };
  var addAlias = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator$g( /*#__PURE__*/_regeneratorRuntime$g().mark(function _callee5(data) {
      return _regeneratorRuntime$g().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return submitEmailAlias(data);
          case 2:
            mutate();
          case 3:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function addAlias(_x6) {
      return _ref5.apply(this, arguments);
    };
  }();
  var updateAlias = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator$g( /*#__PURE__*/_regeneratorRuntime$g().mark(function _callee6(id, data) {
      return _regeneratorRuntime$g().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return submitUpdateAlias(id, data);
          case 2:
            mutate();
          case 3:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return function updateAlias(_x7, _x8) {
      return _ref6.apply(this, arguments);
    };
  }();
  var removeAlias = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator$g( /*#__PURE__*/_regeneratorRuntime$g().mark(function _callee7(id) {
      return _regeneratorRuntime$g().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return removeEmailAlias(id);
          case 2:
            mutate();
          case 3:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    return function removeAlias(_x9) {
      return _ref7.apply(this, arguments);
    };
  }();
  return {
    accountConnections: accountConnections,
    connections: connections,
    mutate: mutate,
    disconnectConnection: disconnectConnection,
    updateDefaultConnection: updateDefaultConnection,
    addAlias: addAlias,
    removeAlias: removeAlias,
    updateAlias: updateAlias,
    isSubmitting: isSubmitting,
    stoppedConnections: connections === null || connections === void 0 ? void 0 : connections.stoppedConnections
  };
};

function _typeof$s(obj) { "@babel/helpers - typeof"; return _typeof$s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$s(obj); }
function ownKeys$h(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$h(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$h(Object(source), !0).forEach(function (key) { _defineProperty$l(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$h(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$l(obj, key, value) { key = _toPropertyKey$l(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$l(arg) { var key = _toPrimitive$l(arg, "string"); return _typeof$s(key) === "symbol" ? key : String(key); }
function _toPrimitive$l(input, hint) { if (_typeof$s(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$s(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime$f() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$f = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$s(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$f(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$f(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$f(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$f(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var searchUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator$f( /*#__PURE__*/_regeneratorRuntime$f().mark(function _callee() {
    var _yield$api$post, data;
    return _regeneratorRuntime$f().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return api.post('/utils/service/users/search', {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
              active: true
            }
          });
        case 3:
          _yield$api$post = _context.sent;
          data = _yield$api$post.data;
          return _context.abrupt("return", data);
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", null);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function searchUsers() {
    return _ref.apply(this, arguments);
  };
}();
var useUserSearch = function useUserSearch() {
  var _useSWR = useSWR('/utils/view/users/search', searchUsers, {
      revalidateOnFocus: false
    }),
    data = _useSWR.data;
  return _objectSpread$h(_objectSpread$h({}, data), {}, {
    users: data === null || data === void 0 ? void 0 : data.users.filter(function (user) {
      return user.active;
    })
  });
};

function _typeof$r(obj) { "@babel/helpers - typeof"; return _typeof$r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$r(obj); }
function _defineProperty$k(obj, key, value) { key = _toPropertyKey$k(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$k(arg) { var key = _toPrimitive$k(arg, "string"); return _typeof$r(key) === "symbol" ? key : String(key); }
function _toPrimitive$k(input, hint) { if (_typeof$r(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$r(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$v(arr, i) { return _arrayWithHoles$x(arr) || _iterableToArrayLimit$v(arr, i) || _unsupportedIterableToArray$z(arr, i) || _nonIterableRest$x(); }
function _nonIterableRest$x() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$z(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$z(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$z(o, minLen); }
function _arrayLikeToArray$z(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$v(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$x(arr) { if (Array.isArray(arr)) return arr; }
var _recoilPersist = recoilPersist(),
  persistAtom = _recoilPersist.persistAtom;
var primaryCalendarColor = 'verySoftBloobirds';
var primaryBarColor = 'softBloobirds';
var colorsPalette = ['softTomato', 'softBanana', 'softGrape', 'softGray', 'softTangerine', 'lightestCall'];
var secondaryColorsPalette = ['tomato', 'banana', 'grape', 'gray', 'tangerine', 'extraCall'];
var RemindeBeforeType;
(function (RemindeBeforeType) {
  RemindeBeforeType["minutes"] = "minutes";
  RemindeBeforeType["hours"] = "hours";
  RemindeBeforeType["days"] = "days";
})(RemindeBeforeType || (RemindeBeforeType = {}));
var calendarSelectedAtom = atom({
  key: 'calendarSelectedAtom-old',
  "default": null,
  effects: [persistAtom]
});
var accountSelectedAtom = atom({
  key: 'accountSelectedAtom-old',
  "default": null,
  effects: [persistAtom]
});
var eventsTypeSelectedAtom = atom({
  key: 'eventsTypeSelectedAtom-old',
  "default": 'nylas',
  effects: [persistAtom]
});
var inviteesAtom = atom({
  key: 'inviteesAtom-old',
  "default": []
});
var dateSelectedAtom = atom({
  key: 'daySelectedAtom-old',
  "default": new Date()
});
var selectedTimezoneAtom = atom({
  key: 'selectedTimezoneAtom-old',
  "default": typeof getUserTimeZone === 'function' ? getUserTimeZone() : undefined
});

// These are the users selected when seeing bloobirds events
var usersSelectedAtom = atom({
  key: 'usersSelectedAtom-old',
  "default": [],
  effects: [persistAtom]
});

// These are the account executives selected when seeing bloobirds events
var accountExecutivesSelectedAtom = atom({
  key: 'accountExecutivesSelectedAtom-old',
  "default": [],
  effects: [persistAtom]
});
var skipEventCalendarCreationAtom = atom({
  key: 'skipEventCalendarCreationAtom-old',
  "default": false,
  effects: [persistAtom]
});
var loadingAtom = atom({
  key: 'loadingMeetingModalAtom-old',
  "default": false
});

// In case this is an update, we will ban this event in the calendar so we only show the new placeholder
var bannedEventAtom = atom({
  key: 'bannedEventAtom-old',
  "default": ''
});
var showReminderAtom = atom({
  key: 'showReminderAtom-old',
  "default": false,
  effects: [persistAtom]
});
var reminderTemplateAtom = atom({
  key: 'reminderTemplateAtom-old',
  "default": null,
  effects: [persistAtom]
});
var reminderBeforeAtom = atom({
  key: 'reminderBeforeAtom-old',
  "default": {
    type: RemindeBeforeType.minutes,
    value: 30
  },
  effects: [persistAtom]
});
var conferencingInGoogleMeetAtom = atom({
  key: 'conferencingGoogleMeet-old',
  "default": true,
  effects: [persistAtom]
});
var meetingDurationAtom = atom({
  key: 'meetingDurationAtomIncalendar-old',
  "default": 60,
  effects: [persistAtom]
});
var placeholderAtom = atom({
  key: 'placeholderAtomIncalendar-old',
  "default": ''
});
var useCalendar = function useCalendar() {
  var _injectReferencesSear, _calendarsAvailable$d3;
  var userId = useActiveUserId();
  var _useEmailConnections = useEmailConnections(),
    connections = _useEmailConnections.connections;
  var _useActiveAccountId = useActiveAccountId(),
    accountId = _useActiveAccountId.accountId;
  var _useRecoilState = useRecoilState(calendarSelectedAtom),
    _useRecoilState2 = _slicedToArray$v(_useRecoilState, 2),
    calendarSelected = _useRecoilState2[0],
    setSelectedCalendar = _useRecoilState2[1];
  var _useRecoilState3 = useRecoilState(accountSelectedAtom),
    _useRecoilState4 = _slicedToArray$v(_useRecoilState3, 2),
    accountSelected = _useRecoilState4[0],
    _setAccountSelected = _useRecoilState4[1];
  var _useRecoilState5 = useRecoilState(eventsTypeSelectedAtom),
    _useRecoilState6 = _slicedToArray$v(_useRecoilState5, 2),
    eventsTypeSelected = _useRecoilState6[0],
    setEventTypesSelected = _useRecoilState6[1];
  var _useRecoilState7 = useRecoilState(inviteesAtom),
    _useRecoilState8 = _slicedToArray$v(_useRecoilState7, 2),
    invitees = _useRecoilState8[0],
    setInvitees = _useRecoilState8[1];
  var _useRecoilState9 = useRecoilState(selectedTimezoneAtom),
    _useRecoilState10 = _slicedToArray$v(_useRecoilState9, 2),
    selectedTimezone = _useRecoilState10[0],
    setSelectedTimezone = _useRecoilState10[1];
  var _useRecoilState11 = useRecoilState(dateSelectedAtom),
    _useRecoilState12 = _slicedToArray$v(_useRecoilState11, 2),
    date = _useRecoilState12[0],
    setDate = _useRecoilState12[1];
  var _useRecoilState13 = useRecoilState(usersSelectedAtom),
    _useRecoilState14 = _slicedToArray$v(_useRecoilState13, 2),
    usersSelected = _useRecoilState14[0],
    setUsersSelected = _useRecoilState14[1];
  var _useRecoilState15 = useRecoilState(skipEventCalendarCreationAtom),
    _useRecoilState16 = _slicedToArray$v(_useRecoilState15, 2),
    skipCalendarCreation = _useRecoilState16[0],
    setSkipCalendarCreation = _useRecoilState16[1];
  var _useRecoilState17 = useRecoilState(loadingAtom),
    _useRecoilState18 = _slicedToArray$v(_useRecoilState17, 2),
    loading = _useRecoilState18[0],
    setLoading = _useRecoilState18[1];
  var _useRecoilState19 = useRecoilState(bannedEventAtom),
    _useRecoilState20 = _slicedToArray$v(_useRecoilState19, 2),
    bannedEvent = _useRecoilState20[0],
    setBannedEvent = _useRecoilState20[1];
  var resetBannedAtom = useResetRecoilState(bannedEventAtom);
  var resetInvitees = useResetRecoilState(inviteesAtom);
  var resetDate = useResetRecoilState(dateSelectedAtom);
  var _useRecoilState21 = useRecoilState(reminderTemplateAtom),
    _useRecoilState22 = _slicedToArray$v(_useRecoilState21, 2),
    reminderTemplate = _useRecoilState22[0],
    setReminderTemplate = _useRecoilState22[1];
  var _useRecoilState23 = useRecoilState(reminderBeforeAtom),
    _useRecoilState24 = _slicedToArray$v(_useRecoilState23, 2),
    reminderBefore = _useRecoilState24[0],
    setReminderBefore = _useRecoilState24[1];
  var _useRecoilState25 = useRecoilState(showReminderAtom),
    _useRecoilState26 = _slicedToArray$v(_useRecoilState25, 2),
    showReminder = _useRecoilState26[0],
    setShowReminder = _useRecoilState26[1];
  var _useRecoilState27 = useRecoilState(meetingDurationAtom),
    _useRecoilState28 = _slicedToArray$v(_useRecoilState27, 2),
    meetingDuration = _useRecoilState28[0],
    setMeetingDuration = _useRecoilState28[1];
  var _useRecoilState29 = useRecoilState(conferencingInGoogleMeetAtom),
    _useRecoilState30 = _slicedToArray$v(_useRecoilState29, 2),
    conferencingGoogleMeet = _useRecoilState30[0],
    setConferencingGoogleMeet = _useRecoilState30[1];
  var _useRecoilState31 = useRecoilState(placeholderAtom),
    _useRecoilState32 = _slicedToArray$v(_useRecoilState31, 2),
    placeholder = _useRecoilState32[0],
    setPlaceholder = _useRecoilState32[1];
  useEffect(function () {
    return function () {
      resetBannedAtom();
    };
  }, []);
  useEffect(function () {
    if (userId && (usersSelected === null || usersSelected === void 0 ? void 0 : usersSelected.length) === 0) {
      setUsersSelected([userId]);
    }
  }, []);
  var _useRecoilState33 = useRecoilState(accountExecutivesSelectedAtom),
    _useRecoilState34 = _slicedToArray$v(_useRecoilState33, 2),
    accountExecutivesSelected = _useRecoilState34[0],
    setAccountExecutivesSelected = _useRecoilState34[1];
  var users = useUserSearch();
  var calendarIdsSelected = calendarSelected === null || calendarSelected === void 0 ? void 0 : calendarSelected.join(',');
  var _useSWR = useSWR("/messaging/calendar/events?start=".concat(spacetime(date).startOf('week').format('iso-utc'), "&end=").concat(spacetime(date).endOf('week').format('iso-utc'), "&calendar=").concat(calendarIdsSelected).concat(accountSelected ? '&account=' + accountSelected : ''), function (url) {
      return api.get(url);
    }, {
      use: [keepPreviousResponse],
      revalidateOnFocus: false
    }),
    _useSWR$data = _useSWR.data,
    _useSWR$data2 = _useSWR$data === void 0 ? {} : _useSWR$data,
    events = _useSWR$data2.data,
    isNylasValidating = _useSWR.isValidating,
    eventsError = _useSWR.error;
  var _useSWR2 = useSWR("/messaging/calendar".concat(accountSelected ? '?account=' + accountSelected : ''), function (url) {
      return api.get(url);
    }, {
      revalidateOnFocus: false
    }),
    calendarsAvailable = _useSWR2.data,
    mutateCalendars = _useSWR2.mutate,
    calendarsError = _useSWR2.error;
  useEffect(function () {
    if (eventsError || calendarsError) {
      _setAccountSelected(null);
      setSelectedCalendar(null);
    }
  }, [eventsError, calendarsError]);
  useEffect(function () {
    calendarSelected === null || calendarSelected === void 0 ? void 0 : calendarSelected.forEach(function (calendarId) {
      var _calendarsAvailable$d, _calendarsAvailable$d2;
      if ((calendarsAvailable === null || calendarsAvailable === void 0 ? void 0 : (_calendarsAvailable$d = calendarsAvailable.data) === null || _calendarsAvailable$d === void 0 ? void 0 : _calendarsAvailable$d.length) > 0 && !(calendarsAvailable !== null && calendarsAvailable !== void 0 && (_calendarsAvailable$d2 = calendarsAvailable.data) !== null && _calendarsAvailable$d2 !== void 0 && _calendarsAvailable$d2.find(function (c) {
        return (c === null || c === void 0 ? void 0 : c.id) === calendarId;
      }))) {
        setSelectedCalendar(function (curr) {
          return curr === null || curr === void 0 ? void 0 : curr.filter(function (c) {
            return c !== calendarId;
          });
        });
      }
    });
  }, [calendarsAvailable]);
  var meetingsRequest = React.useMemo(function () {
    var queries = [];
    if (usersSelected) {
      queries.push(_defineProperty$k({}, ACTIVITY_FIELDS_LOGIC_ROLE.USER, usersSelected));
      queries.push(_defineProperty$k({}, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO, usersSelected));
    }
    if (accountExecutivesSelected && (accountExecutivesSelected === null || accountExecutivesSelected === void 0 ? void 0 : accountExecutivesSelected.length) > 0) {
      queries.push(_defineProperty$k({}, ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE, accountExecutivesSelected));
    }
    return {
      query: _defineProperty$k(_defineProperty$k({}, ACTIVITY_FIELDS_LOGIC_ROLE.TIME, {
        query: {
          gte: spacetime(date).startOf('week').format('iso-utc'),
          lte: spacetime(date).endOf('week').format('iso-utc')
        },
        searchMode: 'RANGE__SEARCH'
      }), ACTIVITY_FIELDS_LOGIC_ROLE.TYPE, ACTIVITY_TYPES.MEETING),
      queries: queries,
      formFields: true,
      page: 0,
      pageSize: 5000,
      injectReferences: true
    };
  }, [date, usersSelected, accountExecutivesSelected, eventsTypeSelected]);
  var _useSWR3 = useSWR(accountId ? "/bobjects/".concat(accountId, "/Activity/search") : null, function (key) {
      return api.post(key, meetingsRequest);
    }),
    data = _useSWR3.data,
    isBloobirdsValidating = _useSWR3.isValidating;
  var eventsWithReferences = data ? (_injectReferencesSear = injectReferencesSearchProcess(data === null || data === void 0 ? void 0 : data.data)) === null || _injectReferencesSear === void 0 ? void 0 : _injectReferencesSear.contents : null;
  var calendarsWithColor = calendarsAvailable === null || calendarsAvailable === void 0 ? void 0 : (_calendarsAvailable$d3 = calendarsAvailable.data) === null || _calendarsAvailable$d3 === void 0 ? void 0 : _calendarsAvailable$d3.map(function (calendar, index) {
    if (calendar !== null && calendar !== void 0 && calendar.primary) {
      return {
        calendarId: calendar === null || calendar === void 0 ? void 0 : calendar.id,
        color: primaryCalendarColor,
        barColor: primaryBarColor
      };
    } else {
      return {
        calendarId: calendar === null || calendar === void 0 ? void 0 : calendar.id,
        color: colorsPalette[index % (colorsPalette === null || colorsPalette === void 0 ? void 0 : colorsPalette.length)],
        barColor: secondaryColorsPalette[index % (colorsPalette === null || colorsPalette === void 0 ? void 0 : colorsPalette.length)]
      };
    }
  });
  var eventsPerDay = useMemo(function () {
    return parseEvents(eventsTypeSelected === 'nylas' ? events : eventsWithReferences, eventsTypeSelected, users, selectedTimezone,
    //@ts-ignore
    calendarsWithColor, bannedEvent);
  }, [events === null || events === void 0 ? void 0 : events.length, eventsWithReferences === null || eventsWithReferences === void 0 ? void 0 : eventsWithReferences.length, bannedEvent, eventsTypeSelected]);
  useEffect(function () {
    var _connections$list;
    if (!accountSelected && connections && (connections === null || connections === void 0 ? void 0 : (_connections$list = connections.list) === null || _connections$list === void 0 ? void 0 : _connections$list.length) > 0) {
      var _connections$list2, _connections$list2$fi, _connections$list$;
      _setAccountSelected((connections === null || connections === void 0 ? void 0 : (_connections$list2 = connections.list) === null || _connections$list2 === void 0 ? void 0 : (_connections$list2$fi = _connections$list2.find(function (connection) {
        return connection === null || connection === void 0 ? void 0 : connection["default"];
      })) === null || _connections$list2$fi === void 0 ? void 0 : _connections$list2$fi.id) || (connections === null || connections === void 0 ? void 0 : (_connections$list$ = connections.list[0]) === null || _connections$list$ === void 0 ? void 0 : _connections$list$.id));
    }
  }, [connections]);
  useEffect(function () {
    var _calendarsAvailable$d4;
    // @ts-ignore
    if (!calendarSelected && calendarsAvailable && (calendarsAvailable === null || calendarsAvailable === void 0 ? void 0 : (_calendarsAvailable$d4 = calendarsAvailable.data) === null || _calendarsAvailable$d4 === void 0 ? void 0 : _calendarsAvailable$d4.length) > 0) {
      var _calendarsAvailable$d5, _calendarsAvailable$d6;
      setSelectedCalendar([calendarsAvailable === null || calendarsAvailable === void 0 ? void 0 : (_calendarsAvailable$d5 = calendarsAvailable.data) === null || _calendarsAvailable$d5 === void 0 ? void 0 : (_calendarsAvailable$d6 = _calendarsAvailable$d5.find(function (c) {
        return c.primary;
      })) === null || _calendarsAvailable$d6 === void 0 ? void 0 : _calendarsAvailable$d6.id]);
    }
  }, [calendarsAvailable]);
  useEffect(function () {
    eventsTypeSelected === 'nylas' ? setLoading(isNylasValidating) : setLoading(isBloobirdsValidating);
  }, [eventsTypeSelected, isNylasValidating, isBloobirdsValidating]);
  return {
    accountId: accountId,
    userId: userId,
    connections: connections,
    calendarSelected: calendarSelected,
    setSelectedCalendar: setSelectedCalendar,
    accountSelected: accountSelected,
    setAccountSelected: function setAccountSelected(value) {
      setSelectedCalendar(undefined);
      _setAccountSelected(value);
    },
    eventsTypeSelected: eventsTypeSelected,
    setEventTypesSelected: setEventTypesSelected,
    invitees: invitees,
    setInvitees: setInvitees,
    resetInvitees: resetInvitees,
    date: date,
    setDate: setDate,
    resetDate: resetDate,
    selectedTimezone: selectedTimezone,
    setSelectedTimezone: setSelectedTimezone,
    usersSelected: usersSelected,
    setUsersSelected: setUsersSelected,
    accountExecutivesSelected: accountExecutivesSelected,
    setAccountExecutivesSelected: setAccountExecutivesSelected,
    skipCalendarCreation: skipCalendarCreation,
    setSkipCalendarCreation: setSkipCalendarCreation,
    bannedEvent: bannedEvent,
    setBannedEvent: setBannedEvent,
    reminderBefore: reminderBefore,
    setReminderBefore: setReminderBefore,
    reminderTemplate: reminderTemplate,
    setReminderTemplate: setReminderTemplate,
    showReminder: showReminder,
    setShowReminder: setShowReminder,
    conferencingGoogleMeet: conferencingGoogleMeet,
    setConferencingGoogleMeet: setConferencingGoogleMeet,
    meetingDuration: meetingDuration,
    setMeetingDuration: setMeetingDuration,
    calendarsAvailable: calendarsAvailable,
    mutateCalendars: mutateCalendars,
    events: events,
    eventsPerDay: eventsPerDay,
    calendarsWithColor: calendarsWithColor,
    isNylasValidating: isNylasValidating,
    isBloobirdsValidating: isBloobirdsValidating,
    loading: loading,
    placeholder: placeholder,
    setPlaceholder: setPlaceholder
  };
};

function _typeof$q(obj) { "@babel/helpers - typeof"; return _typeof$q = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$q(obj); }
function _regeneratorRuntime$e() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$e = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$q(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _slicedToArray$u(arr, i) { return _arrayWithHoles$w(arr) || _iterableToArrayLimit$u(arr, i) || _unsupportedIterableToArray$y(arr, i) || _nonIterableRest$w(); }
function _nonIterableRest$w() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$y(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$y(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$y(o, minLen); }
function _arrayLikeToArray$y(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$u(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$w(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep$e(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$e(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$e(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$e(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function searchCompanies(_x) {
  return _searchCompanies.apply(this, arguments);
}
function _searchCompanies() {
  _searchCompanies = _asyncToGenerator$e( /*#__PURE__*/_regeneratorRuntime$e().mark(function _callee2(name) {
    var response;
    return _regeneratorRuntime$e().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return api.get('/linkedin/search/companies', {
            params: {
              name: name
            }
          });
        case 2:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _searchCompanies.apply(this, arguments);
}
function useCompanies(search) {
  var _useState = useState(true),
    _useState2 = _slicedToArray$u(_useState, 2),
    isLoading = _useState2[0],
    setIsLoading = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray$u(_useState3, 2),
    companies = _useState4[0],
    setCompanies = _useState4[1];
  var _useDebounce = useDebounce$1(search, 150),
    _useDebounce2 = _slicedToArray$u(_useDebounce, 1),
    name = _useDebounce2[0];
  useEffect(function () {
    if (name && name.length > 0) {
      searchCompanies(name).then(function (companies) {
        setCompanies(companies);
        setIsLoading(false);
      });
    }
  }, [name]);
  return {
    companies: companies,
    isLoading: isLoading
  };
}
function useCompanyCreationEnabled() {
  var _useSWR = useSWR('/linkedin/settings/companyCreation', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator$e( /*#__PURE__*/_regeneratorRuntime$e().mark(function _callee(url) {
        var _response$data;
        var response;
        return _regeneratorRuntime$e().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return api.get(url);
            case 2:
              response = _context.sent;
              return _context.abrupt("return", (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.enabled);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x2) {
        return _ref.apply(this, arguments);
      };
    }()),
    isSettingEnabled = _useSWR.data;
  return isSettingEnabled;
}

function _slicedToArray$t(arr, i) { return _arrayWithHoles$v(arr) || _iterableToArrayLimit$t(arr, i) || _unsupportedIterableToArray$x(arr, i) || _nonIterableRest$v(); }
function _nonIterableRest$v() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$x(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$x(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$x(o, minLen); }
function _arrayLikeToArray$x(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$t(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$v(arr) { if (Array.isArray(arr)) return arr; }
var confettiAtom = atom({
  key: 'confettiAtom',
  "default": {
    bloobirdsShape: false,
    display: false
  }
});
var useConfetti = function useConfetti() {
  var _useRecoilState = useRecoilState(confettiAtom),
    _useRecoilState2 = _slicedToArray$t(_useRecoilState, 2),
    show = _useRecoilState2[0],
    setShow = _useRecoilState2[1];
  var throwConfetti = function throwConfetti(_ref) {
    var _ref$bloobirdsShape = _ref.bloobirdsShape,
      bloobirdsShape = _ref$bloobirdsShape === void 0 ? false : _ref$bloobirdsShape;
    setShow({
      display: true,
      bloobirdsShape: bloobirdsShape
    });
  };
  var hideConfetti = function hideConfetti() {
    setShow({
      display: false,
      bloobirdsShape: false
    });
  };
  return {
    show: show,
    throwConfetti: throwConfetti,
    hideConfetti: hideConfetti
  };
};

var useGetUserHelpers = function useGetUserHelpers() {
  var userId = useActiveUserId();
  var _useSWR = useSWR("/utils/helpers/".concat(userId), function () {
      return api.get('/utils/users/helpers').then(function (res) {
        return res.data;
      });
    }, {
      revalidateOnFocus: false
    }),
    data = _useSWR.data;
  return {
    helpers: data === null || data === void 0 ? void 0 : data.helpers
  };
};
var useUserHelpers = function useUserHelpers(onGoalClick) {
  var _settings$account, _settings$user, _settings$user2, _settings$user2$permi;
  var userId = useActiveUserId();
  var accountId = useActiveAccountId();
  var isLoggedIn = !!accountId;
  var _useSWR2 = useSWR(userId && isLoggedIn ? "/utils/helpers/".concat(userId) : null, function () {
      return api.get('/utils/users/helpers').then(function (res) {
        return res.data;
      });
    }, {
      revalidateOnFocus: false
    }),
    data = _useSWR2.data,
    mutate = _useSWR2.mutate,
    isLoading = _useSWR2.isLoading;
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var i18n = getI18n();
  var has = function has(key) {
    return !isLoading && isObject(data === null || data === void 0 ? void 0 : data.helpers) && Object.prototype.hasOwnProperty.call(data === null || data === void 0 ? void 0 : data.helpers, key);
  };
  var get = function get(key) {
    return isObject(data === null || data === void 0 ? void 0 : data.helpers) && (data === null || data === void 0 ? void 0 : data.helpers[key]);
  };
  var deleteHelper = function deleteHelper(key) {
    return api["delete"]('utils/users/helpers?helperKeys=' + key);
  };
  var _useActiveUserSetting = useActiveUserSettings(isLoggedIn),
    settings = _useActiveUserSetting.settings;
  var cadencesV2Enabled = useCadenceV2Enabled(settings === null || settings === void 0 ? void 0 : (_settings$account = settings.account) === null || _settings$account === void 0 ? void 0 : _settings$account.id);
  var isOTOAccount = useIsOTOAccount();
  var isAccountAdmin = settings === null || settings === void 0 ? void 0 : (_settings$user = settings.user) === null || _settings$user === void 0 ? void 0 : _settings$user.accountAdmin;
  var hasCadencePermission = settings === null || settings === void 0 ? void 0 : (_settings$user2 = settings.user) === null || _settings$user2 === void 0 ? void 0 : (_settings$user2$permi = _settings$user2.permissions) === null || _settings$user2$permi === void 0 ? void 0 : _settings$user2$permi.includes(UserPermission.VIEW_CADENCES);
  var quickStartGuideBlocks = getQuickStartGuideBlocks(hasCadencePermission, cadencesV2Enabled);
  var adminQuickStartGuideBlocks = getAdminQuickStartGuideBlocks(hasCadencePermission, cadencesV2Enabled);
  function saveCustom(data) {
    api.post('/utils/users/helpers/custom', data).then(function () {
      return mutate();
    });
  }
  var save = function save(key) {
    if (!has(key)) {
      api.post('/utils/users/helpers/' + key).then(function () {
        // TODO: Filter also by the users that have to see this quick start guide
        var keys = isAccountAdmin ? adminQuickStartGuideBlocks.flatMap(function (guide) {
          return guide.goals;
        }) : quickStartGuideBlocks.flatMap(function (guide) {
          return guide.goals;
        });
        var keySelected = keys.find(function (k) {
          return k.key === key;
        });
        if (keySelected && !isOTOAccount) {
          createToast({
            message: (i18n === null || i18n === void 0 ? void 0 : i18n.t('helperKeys.goals.message')) + (i18n === null || i18n === void 0 ? void 0 : i18n.t("helperKeys.goals.".concat(keySelected.i18nKey))),
            type: 'reminder',
            icon: 'check',
            iconColor: 'extraCall',
            onClick: function onClick() {
              return onGoalClick();
            }
          });
        }
        mutate();
      });
    }
  };
  var forceSave = function forceSave(key) {
    return api.post('/utils/users/helpers/' + key).then(function () {
      mutate();
    });
  };
  var reset = function reset(key) {
    api["delete"]('/utils/users/helpers?helperKeys=' + (key ? key : Object.keys(data === null || data === void 0 ? void 0 : data.helpers).filter(function (helper) {
      return ![/*'COMPLETE_WELCOME_SCREEN'*/'delete'].includes(helper);
    }))).then(function () {
      return mutate();
    });
  };
  return {
    helpers: data === null || data === void 0 ? void 0 : data.helpers,
    mutate: mutate,
    save: save,
    saveCustom: saveCustom,
    has: has,
    get: get,
    deleteHelper: deleteHelper,
    forceSave: forceSave,
    reset: reset,
    isLoading: isLoading
  };
};

function _slicedToArray$s(arr, i) { return _arrayWithHoles$u(arr) || _iterableToArrayLimit$s(arr, i) || _unsupportedIterableToArray$w(arr, i) || _nonIterableRest$u(); }
function _nonIterableRest$u() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$w(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$w(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$w(o, minLen); }
function _arrayLikeToArray$w(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$s(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$u(arr) { if (Array.isArray(arr)) return arr; }
var COPILOT__HOSTNAME = 'http://localhost:8000';
var useTemplateInsights = function useTemplateInsights(_ref) {
  var content = _ref.content,
    templateId = _ref.templateId,
    store = _ref.store;
  var _useCopilot = useCopilot(),
    isEnabled = _useCopilot.isEnabled;
  var _useState = useState(false),
    _useState2 = _slicedToArray$s(_useState, 2),
    isLoading = _useState2[0],
    setIsLoading = _useState2[1];
  var _useState3 = useState(undefined),
    _useState4 = _slicedToArray$s(_useState3, 2),
    insights = _useState4[0],
    setInsights = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray$s(_useState5, 2),
    refresh = _useState6[0],
    setRefresh = _useState6[1];
  var _useState7 = useState(true),
    _useState8 = _slicedToArray$s(_useState7, 2),
    reload = _useState8[0],
    setReload = _useState8[1];
  useEffect(function () {
    if (isEnabled && reload) {
      setIsLoading(true);
      api.post("/copilot/templates/similarity?store=".concat(store ? 'true' : 'false', "&refresh=").concat(refresh), {
        asset_id: templateId !== null && templateId !== void 0 ? templateId : null,
        content: content !== null && content !== void 0 ? content : null
      }).then(function (response) {
        setIsLoading(false);
        setInsights(response.data);
        setReload(false);
        setRefresh(false);
        return response.data;
      });
    }
  }, [reload, isEnabled]);
  useEffect(function () {
    if (refresh) {
      setReload(true);
    }
  }, [refresh]);
  return {
    insights: insights,
    isLoading: isLoading,
    refresh: function refresh() {
      setRefresh(true);
    }
  };
};
var useCopilot = function useCopilot() {
  var _settings$account;
  var _useUserHelpers = useUserHelpers(),
    save = _useUserHelpers.save,
    has = _useUserHelpers.has,
    deleteHelper = _useUserHelpers.deleteHelper,
    mutate = _useUserHelpers.mutate,
    saveCustom = _useUserHelpers.saveCustom,
    helpers = _useUserHelpers.helpers;
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var isFlagEnabled = useCopilotEnabled(settings === null || settings === void 0 ? void 0 : (_settings$account = settings.account) === null || _settings$account === void 0 ? void 0 : _settings$account.id);
  useEffect(function () {
    if (helpers && helpers[CustomUserHelperKeys.COPILOT_LANGUAGE]) {
      _setLanguage(helpers[CustomUserHelperKeys.COPILOT_LANGUAGE]);
    }
  }, [helpers]);
  var _useState9 = useState(helpers && helpers[CustomUserHelperKeys.COPILOT_LANGUAGE] ? helpers[CustomUserHelperKeys.COPILOT_LANGUAGE] : 'english'),
    _useState10 = _slicedToArray$s(_useState9, 2),
    language = _useState10[0],
    _setLanguage = _useState10[1];
  var enabled = has(UserHelperTooltipsKeys.COPILOT_ENABLED);
  return {
    isEnabled: isFlagEnabled && enabled,
    setEnabled: function setEnabled(value) {
      if (value) {
        save(UserHelperTooltipsKeys.COPILOT_ENABLED);
      } else {
        deleteHelper(UserHelperTooltipsKeys.COPILOT_ENABLED).then(function () {
          mutate();
        });
      }
    },
    language: language,
    setLanguage: function setLanguage(newLanguage) {
      saveCustom({
        key: CustomUserHelperKeys.COPILOT_LANGUAGE,
        data: newLanguage
      });
      _setLanguage(newLanguage);
    }
  };
};

function _typeof$p(obj) { "@babel/helpers - typeof"; return _typeof$p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$p(obj); }
function _slicedToArray$r(arr, i) { return _arrayWithHoles$t(arr) || _iterableToArrayLimit$r(arr, i) || _unsupportedIterableToArray$v(arr, i) || _nonIterableRest$t(); }
function _nonIterableRest$t() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$v(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$v(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$v(o, minLen); }
function _arrayLikeToArray$v(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$r(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$t(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys$g(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$g(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$g(Object(source), !0).forEach(function (key) { _defineProperty$j(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$g(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$j(obj, key, value) { key = _toPropertyKey$j(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$j(arg) { var key = _toPrimitive$j(arg, "string"); return _typeof$p(key) === "symbol" ? key : String(key); }
function _toPrimitive$j(input, hint) { if (_typeof$p(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$p(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var isFunction = function isFunction(functionToCheck) {
  return typeof functionToCheck === 'function' && !!functionToCheck.constructor && !!functionToCheck.call && !!functionToCheck.apply;
};
var defaultOptions = {
  cancelOnUnmount: true
};
var useInterval = function useInterval(fn, milliseconds, targetId) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultOptions;
  var opts = _objectSpread$g(_objectSpread$g({}, defaultOptions), options || {});
  var timeout = useRef();
  var callback = useRef(fn);
  var targetIdRef = useRef(targetId);
  var _useState = useState(false),
    _useState2 = _slicedToArray$r(_useState, 2),
    isCleared = _useState2[0],
    setIsCleared = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$r(_useState3, 2),
    firstCallDone = _useState4[0],
    setFirstCallDone = _useState4[1];
  useEffect(function () {
    if (isFunction(fn) && (!firstCallDone || targetIdRef.current !== targetId)) {
      clear();
      fn();
      setFirstCallDone(true);
    }
  }, [targetId]);
  // the clear method
  var clear = useCallback(function () {
    if (timeout.current) {
      setIsCleared(true);
      clearInterval(timeout.current);
    }
  }, []);

  // if the provided function changes, change its reference
  useEffect(function () {
    if (isFunction(fn)) {
      callback.current = fn;
    }
  }, [fn]);

  // when the milliseconds change, reset the timeout
  useEffect(function () {
    if (typeof milliseconds === 'number') {
      timeout.current = setInterval(function () {
        callback.current();
      }, milliseconds);
    }

    // cleanup previous interval
    return clear;
  }, [milliseconds]);

  // when component unmount clear the timeout
  useEffect(function () {
    return function () {
      if (opts.cancelOnUnmount) {
        clear();
      }
    };
  }, [targetId]);
  var resume = function resume() {
    if (isCleared) {
      setIsCleared(false);
      setFirstCallDone(false);
      fn();
      timeout.current = setInterval(function () {
        callback.current();
      }, milliseconds);
    }
  };
  return [isCleared, clear, resume];
};

function _slicedToArray$q(arr, i) { return _arrayWithHoles$s(arr) || _iterableToArrayLimit$q(arr, i) || _unsupportedIterableToArray$u(arr, i) || _nonIterableRest$s(); }
function _nonIterableRest$s() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$u(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$u(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$u(o, minLen); }
function _arrayLikeToArray$u(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$q(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$s(arr) { if (Array.isArray(arr)) return arr; }
var CopilotActivityContext = /*#__PURE__*/createContext({});
var CopilotActivityContextProvider = function CopilotActivityContextProvider(_ref) {
  var _activity$id, _getFieldByLogicRole;
  var activity = _ref.activity,
    children = _ref.children;
  useEffect(function () {
    setTranscript(undefined);
    resumeTranscriptInterval();
    setInsights(undefined);
    resumeInsightsInterval();
    setCRMUpdates(undefined);
    resumeUpdatesInterval();
  }, [activity === null || activity === void 0 ? void 0 : (_activity$id = activity.id) === null || _activity$id === void 0 ? void 0 : _activity$id.objectId]);
  var accountId = useActiveAccountId();
  var isCopilotEnabled = useCopilotEnabled(accountId);
  var type = (_getFieldByLogicRole = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.valueLogicRole;
  var recording = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RECORD_URL);
  var botId = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.BOT_ID);
  var hasRecording = !!recording;
  var hasBot = !!botId;
  var canGetCallTranscript = hasRecording && type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL;
  var canGetMeetingTranscript = hasBot && type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING;
  var canGetTranscript = canGetCallTranscript || canGetMeetingTranscript;
  var _useState = useState(),
    _useState2 = _slicedToArray$q(_useState, 2),
    overlay = _useState2[0],
    setOverlay = _useState2[1];
  var hasOverlay = !!overlay;
  var _useState3 = useState(),
    _useState4 = _slicedToArray$q(_useState3, 2),
    transcript = _useState4[0],
    setTranscript = _useState4[1];
  var _useState5 = useState(),
    _useState6 = _slicedToArray$q(_useState5, 2),
    insights = _useState6[0],
    setInsights = _useState6[1];
  var _useState7 = useState(),
    _useState8 = _slicedToArray$q(_useState7, 2),
    crmUpdates = _useState8[0],
    setCRMUpdates = _useState8[1];
  var _useState9 = useState((transcript === null || transcript === void 0 ? void 0 : transcript.status) === 'GENERATED'),
    _useState10 = _slicedToArray$q(_useState9, 2),
    canGetInsights = _useState10[0],
    setCanGetInsights = _useState10[1];
  useEffect(function () {
    if ((transcript === null || transcript === void 0 ? void 0 : transcript.status) === 'GENERATED') {
      setCanGetInsights(true);
    }
  }, [transcript]);
  var _useInterval = useInterval(function () {
      if (isCopilotEnabled && canGetTranscript) {
        api.get("/copilot/transcript/".concat(type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL ? 'call' : 'meeting', "/").concat(activity === null || activity === void 0 ? void 0 : activity.id.objectId)).then(function (response) {
          setTranscript(response.data);
        });
      }
    }, 15000, activity === null || activity === void 0 ? void 0 : activity.id.objectId),
    _useInterval2 = _slicedToArray$q(_useInterval, 3),
    isTranscriptIntervalCleared = _useInterval2[0],
    cancelTranscriptInterval = _useInterval2[1],
    resumeTranscriptInterval = _useInterval2[2];
  var _useInterval3 = useInterval(function () {
      if (isCopilotEnabled) {
        api.get("/copilot/transcript/insights/".concat(activity === null || activity === void 0 ? void 0 : activity.id.objectId)).then(function (response) {
          setInsights(response.data);
        });
      }
    }, 15000, activity === null || activity === void 0 ? void 0 : activity.id.objectId),
    _useInterval4 = _slicedToArray$q(_useInterval3, 3),
    isInsightsIntervalCleared = _useInterval4[0],
    cancelInsightsInterval = _useInterval4[1],
    resumeInsightsInterval = _useInterval4[2];
  var _useInterval5 = useInterval(function () {
      if (isCopilotEnabled) {
        api.get("/copilot/transcript/crm-updates/".concat(activity === null || activity === void 0 ? void 0 : activity.id.objectId)).then(function (response) {
          setCRMUpdates(response.data);
        });
      }
    }, 15000, activity === null || activity === void 0 ? void 0 : activity.id.objectId),
    _useInterval6 = _slicedToArray$q(_useInterval5, 3),
    isUpdatesIntervalCleared = _useInterval6[0],
    cancelUpdatesInterval = _useInterval6[1],
    resumeUpdatesInterval = _useInterval6[2];
  useEffect(function () {
    if (((transcript === null || transcript === void 0 ? void 0 : transcript.status) === 'GENERATED' || (transcript === null || transcript === void 0 ? void 0 : transcript.status) === 'ERROR') && !isTranscriptIntervalCleared) {
      cancelTranscriptInterval();
    }
  }, [transcript, cancelTranscriptInterval, isTranscriptIntervalCleared]);
  useEffect(function () {
    if (((insights === null || insights === void 0 ? void 0 : insights.status) === 'GENERATED' || (insights === null || insights === void 0 ? void 0 : insights.status) === 'ERROR') && !isInsightsIntervalCleared) {
      cancelInsightsInterval();
    }
  }, [insights, isInsightsIntervalCleared, cancelInsightsInterval]);
  useEffect(function () {
    if (((crmUpdates === null || crmUpdates === void 0 ? void 0 : crmUpdates.status) === 'GENERATED' || (crmUpdates === null || crmUpdates === void 0 ? void 0 : crmUpdates.status) === 'ERROR') && !isUpdatesIntervalCleared) {
      cancelUpdatesInterval();
    }
  }, [crmUpdates, isUpdatesIntervalCleared, cancelUpdatesInterval]);
  var regenerateAnalysis = function regenerateAnalysis() {
    if (isCopilotEnabled && canGetInsights) {
      api.get("/copilot/transcript/insights/".concat(activity === null || activity === void 0 ? void 0 : activity.id.objectId, "?regenerate=true")).then(function (response) {
        setInsights(response.data);
        resumeInsightsInterval();
      });
    }
  };
  var regenerateUpdates = function regenerateUpdates() {
    if (isCopilotEnabled && canGetInsights) {
      api.get("/copilot/transcript/crm-updates/".concat(activity === null || activity === void 0 ? void 0 : activity.id.objectId, "?regenerate=true")).then(function (response) {
        setCRMUpdates(response.data);
        resumeUpdatesInterval();
      });
    }
  };
  var value = {
    hasOverlay: hasOverlay,
    overlay: overlay,
    resetOverlay: function resetOverlay() {
      return setOverlay(undefined);
    },
    transcript: transcript,
    insights: insights,
    crmUpdates: crmUpdates,
    setOverlay: setOverlay,
    regenerateAnalysis: regenerateAnalysis,
    regenerateUpdates: regenerateUpdates,
    clearAllSubscriptions: function clearAllSubscriptions() {
      cancelUpdatesInterval();
      cancelInsightsInterval();
      cancelTranscriptInterval();
    },
    activity: activity,
    reloadTranscript: function reloadTranscript() {
      return api.get("/copilot/transcript/".concat(type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL ? 'call' : 'meeting', "/").concat(activity === null || activity === void 0 ? void 0 : activity.id.objectId)).then(function (response) {
        setTranscript(response.data);
      });
    }
  };
  return /*#__PURE__*/jsx(CopilotActivityContext.Provider, {
    value: value,
    children: children
  });
};
var useCopilotActivity = function useCopilotActivity() {
  return useContext(CopilotActivityContext);
};

var useCrmStatus = function useCrmStatus(accountId, crmObjectTypes, crm, hasNoStatusPlanEnabled) {
  var fetcher = function fetcher(params) {
    return api.post(params[0], {
      crmObjects: crmObjectTypes,
      crm: crm
    }).then(function (response) {
      return response === null || response === void 0 ? void 0 : response.data;
    });
  };
  var _useSWR = useSWR(hasNoStatusPlanEnabled && ["/utils/crmStatus/getCrmStatusList/" + accountId, crmObjectTypes], fetcher),
    crmStatusList = _useSWR.data,
    mutateList = _useSWR.mutate,
    isLoading = _useSWR.isLoading;
  return {
    crmStatusList: crmStatusList,
    mutateList: mutateList,
    isLoading: isLoading
  };
};

function _slicedToArray$p(arr, i) { return _arrayWithHoles$r(arr) || _iterableToArrayLimit$p(arr, i) || _unsupportedIterableToArray$t(arr, i) || _nonIterableRest$r(); }
function _nonIterableRest$r() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$t(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$t(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$t(o, minLen); }
function _arrayLikeToArray$t(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$p(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$r(arr) { if (Array.isArray(arr)) return arr; }
var fetchCustomTasks = function fetchCustomTasks(_ref) {
  var _ref2 = _slicedToArray$p(_ref, 2);
    _ref2[0];
    var showDisabled = _ref2[1];
  return api.get("/utils/customTask", {
    params: showDisabled ? {} : {
      enabled: !showDisabled
    }
  }).then(function (res) {
    return res.data;
  });
};
var useCustomTasks = function useCustomTasks(options) {
  var _useState = useState(options === null || options === void 0 ? void 0 : options.disabled),
    _useState2 = _slicedToArray$p(_useState, 2),
    showDisabled = _useState2[0],
    setShowDisabled = _useState2[1];
  var _useSWR = useSWR(["customTask".concat(showDisabled ? '' : '?enabled=true'), showDisabled], fetchCustomTasks),
    customTasks = _useSWR.data,
    mutate = _useSWR.mutate;
  function getCustomTaskLogicRole(customTaskId) {
    var customTask = customTasks === null || customTasks === void 0 ? void 0 : customTasks.find(function (ct) {
      return ct.id === customTaskId;
    });
    return customTask === null || customTask === void 0 ? void 0 : customTask.logicRole;
  }
  function getCustomTaskByLogicRole(logicRole) {
    return customTasks === null || customTasks === void 0 ? void 0 : customTasks.find(function (ct) {
      return ct.logicRole === logicRole;
    });
  }
  function getCustomTaskById(customTaskId) {
    return customTasks === null || customTasks === void 0 ? void 0 : customTasks.find(function (ct) {
      return ct.id === customTaskId;
    });
  }
  return {
    getCustomTaskLogicRole: getCustomTaskLogicRole,
    getCustomTaskByLogicRole: getCustomTaskByLogicRole,
    getCustomTaskById: getCustomTaskById,
    customTasks: customTasks,
    mutate: mutate,
    setShowDisabled: setShowDisabled,
    showDisabled: showDisabled
  };
};

function _typeof$o(obj) { "@babel/helpers - typeof"; return _typeof$o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$o(obj); }
var _excluded = ["children", "wizardsMap"];
function ownKeys$f(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$f(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$f(Object(source), !0).forEach(function (key) { _defineProperty$i(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$f(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$i(obj, key, value) { key = _toPropertyKey$i(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$i(arg) { var key = _toPrimitive$i(arg, "string"); return _typeof$o(key) === "symbol" ? key : String(key); }
function _toPrimitive$i(input, hint) { if (_typeof$o(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$o(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties$1(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$1(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var ContactFlowWizardContext = /*#__PURE__*/createContext(null);
var CustomWizardModalProvider = function CustomWizardModalProvider(_ref) {
  var children = _ref.children,
    wizardsMap = _ref.wizardsMap,
    props = _objectWithoutProperties$1(_ref, _excluded);
  //const customWizards = useCustomWizards();
  return /*#__PURE__*/jsx(ContactFlowWizardContext.Provider, {
    value: _objectSpread$f(_objectSpread$f({}, props), {}, {
      wizardsMap: wizardsMap
    }),
    children: children
  });
};
var fetcher$2 = function fetcher(url) {
  return api.get("".concat(url)).then(function (response) {
    return response === null || response === void 0 ? void 0 : response.data;
  });
};
var useCustomWizards = function useCustomWizards(accountId, hasCustomWizardsEnabled) {
  var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'BOTH';
  var _useSWR = useSWR(hasCustomWizardsEnabled && "/utils/service/customWizard/" + accountId + '?source=' + source, fetcher$2),
    availableCustomWizards = _useSWR.data;
  return {
    availableCustomWizards: availableCustomWizards
  };
};
var useContactFlowWizardContext = function useContactFlowWizardContext() {
  var context = useContext(ContactFlowWizardContext);
  if (context === undefined) {
    throw new Error('useContactFlowWizardContext must be used within the modal provider');
  }
  return context;
};

function _typeof$n(obj) { "@babel/helpers - typeof"; return _typeof$n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$n(obj); }
function _regeneratorRuntime$d() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$d = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$n(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$d(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$d(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$d(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$d(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
if (typeof chrome !== 'undefined') {
  var _chrome$storage, _chrome$storage$sync;
  (_chrome$storage = chrome.storage) === null || _chrome$storage === void 0 ? void 0 : (_chrome$storage$sync = _chrome$storage.sync) === null || _chrome$storage$sync === void 0 ? void 0 : _chrome$storage$sync.set({
    dataBackendUrl: 'https://bobject-api.bloobirds.com'
  });
}
function useDataModel() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/utils/service/datamodel';
  var isLoggedIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var _useSWR = useSWR(isLoggedIn ? key : null, getDataModel, {
      revalidateOnFocus: false
    }),
    data = _useSWR.data;
  return data;
}
var accountDataModel = function accountDataModel(dataModel) {
  return {
    getAccountId: function getAccountId() {
      return dataModel === null || dataModel === void 0 ? void 0 : dataModel.accountId;
    },
    getFieldsByBobjectType: function getFieldsByBobjectType(bobjectType) {
      var _dataModel$types, _dataModel$types$find;
      return dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$types = dataModel.types) === null || _dataModel$types === void 0 ? void 0 : (_dataModel$types$find = _dataModel$types.find(function (type) {
        return (type === null || type === void 0 ? void 0 : type.name) === bobjectType;
      })) === null || _dataModel$types$find === void 0 ? void 0 : _dataModel$types$find.fields;
    },
    findValueById: function findValueById(id) {
      var _dataModel$types2, _dataModel$types2$fla, _dataModel$types2$fla2;
      return dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$types2 = dataModel.types) === null || _dataModel$types2 === void 0 ? void 0 : (_dataModel$types2$fla = _dataModel$types2.flatMap(function (type) {
        return type === null || type === void 0 ? void 0 : type.fields;
      })) === null || _dataModel$types2$fla === void 0 ? void 0 : (_dataModel$types2$fla2 = _dataModel$types2$fla.flatMap(function (field) {
        return field === null || field === void 0 ? void 0 : field.values;
      })) === null || _dataModel$types2$fla2 === void 0 ? void 0 : _dataModel$types2$fla2.find(function (value) {
        return (value === null || value === void 0 ? void 0 : value.id) === id;
      });
    },
    findValueByLabel: function findValueByLabel(label) {
      var _dataModel$types3, _dataModel$types3$fla, _dataModel$types3$fla2;
      return dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$types3 = dataModel.types) === null || _dataModel$types3 === void 0 ? void 0 : (_dataModel$types3$fla = _dataModel$types3.flatMap(function (type) {
        return type === null || type === void 0 ? void 0 : type.fields;
      })) === null || _dataModel$types3$fla === void 0 ? void 0 : (_dataModel$types3$fla2 = _dataModel$types3$fla.flatMap(function (field) {
        return field === null || field === void 0 ? void 0 : field.values;
      })) === null || _dataModel$types3$fla2 === void 0 ? void 0 : _dataModel$types3$fla2.find(function (value) {
        return (value === null || value === void 0 ? void 0 : value.name) === label;
      });
    },
    findValueByLogicRole: function findValueByLogicRole(logicRole) {
      var _dataModel$types4, _dataModel$types4$fla, _dataModel$types4$fla2;
      return dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$types4 = dataModel.types) === null || _dataModel$types4 === void 0 ? void 0 : (_dataModel$types4$fla = _dataModel$types4.flatMap(function (type) {
        return type === null || type === void 0 ? void 0 : type.fields;
      })) === null || _dataModel$types4$fla === void 0 ? void 0 : (_dataModel$types4$fla2 = _dataModel$types4$fla.flatMap(function (field) {
        return field === null || field === void 0 ? void 0 : field.values;
      })) === null || _dataModel$types4$fla2 === void 0 ? void 0 : _dataModel$types4$fla2.find(function (value) {
        return (value === null || value === void 0 ? void 0 : value.logicRole) === logicRole;
      });
    },
    findValuesByFieldId: function findValuesByFieldId(fieldId) {
      var _dataModel$types5, _dataModel$types5$fla, _dataModel$types5$fla2;
      return dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$types5 = dataModel.types) === null || _dataModel$types5 === void 0 ? void 0 : (_dataModel$types5$fla = _dataModel$types5.flatMap(function (type) {
        return type === null || type === void 0 ? void 0 : type.fields;
      })) === null || _dataModel$types5$fla === void 0 ? void 0 : (_dataModel$types5$fla2 = _dataModel$types5$fla.find(function (field) {
        return (field === null || field === void 0 ? void 0 : field.id) === fieldId;
      })) === null || _dataModel$types5$fla2 === void 0 ? void 0 : _dataModel$types5$fla2.values;
    },
    findValuesByFieldLogicRole: function findValuesByFieldLogicRole(fieldLogicRole) {
      var _dataModel$types6, _dataModel$types6$fla, _dataModel$types6$fla2;
      return dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$types6 = dataModel.types) === null || _dataModel$types6 === void 0 ? void 0 : (_dataModel$types6$fla = _dataModel$types6.flatMap(function (type) {
        return type === null || type === void 0 ? void 0 : type.fields;
      })) === null || _dataModel$types6$fla === void 0 ? void 0 : (_dataModel$types6$fla2 = _dataModel$types6$fla.find(function (field) {
        return (field === null || field === void 0 ? void 0 : field.logicRole) === fieldLogicRole;
      })) === null || _dataModel$types6$fla2 === void 0 ? void 0 : _dataModel$types6$fla2.values;
    },
    findFieldById: function findFieldById(id) {
      var _dataModel$types7, _dataModel$types7$fla;
      return dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$types7 = dataModel.types) === null || _dataModel$types7 === void 0 ? void 0 : (_dataModel$types7$fla = _dataModel$types7.flatMap(function (type) {
        return type === null || type === void 0 ? void 0 : type.fields;
      })) === null || _dataModel$types7$fla === void 0 ? void 0 : _dataModel$types7$fla.find(function (field) {
        return (field === null || field === void 0 ? void 0 : field.id) === id;
      });
    },
    findFieldByLogicRole: function findFieldByLogicRole(logicRole) {
      var _dataModel$types8, _dataModel$types8$fla;
      return dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$types8 = dataModel.types) === null || _dataModel$types8 === void 0 ? void 0 : (_dataModel$types8$fla = _dataModel$types8.flatMap(function (type) {
        return type === null || type === void 0 ? void 0 : type.fields;
      })) === null || _dataModel$types8$fla === void 0 ? void 0 : _dataModel$types8$fla.find(function (field) {
        return (field === null || field === void 0 ? void 0 : field.logicRole) === logicRole;
      });
    },
    findFieldsByTypeAndBobjectType: function findFieldsByTypeAndBobjectType(bobjectType, fieldType) {
      var _dataModel$types9, _dataModel$types9$fin, _dataModel$types9$fin2;
      return dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$types9 = dataModel.types) === null || _dataModel$types9 === void 0 ? void 0 : (_dataModel$types9$fin = _dataModel$types9.find(function (type) {
        return (type === null || type === void 0 ? void 0 : type.name) === bobjectType;
      })) === null || _dataModel$types9$fin === void 0 ? void 0 : (_dataModel$types9$fin2 = _dataModel$types9$fin.fields) === null || _dataModel$types9$fin2 === void 0 ? void 0 : _dataModel$types9$fin2.filter(function (field) {
        return (field === null || field === void 0 ? void 0 : field.fieldType) === fieldType;
      });
    },
    findMainBobjectTypes: function findMainBobjectTypes() {
      var _dataModel$types10;
      return dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$types10 = dataModel.types) === null || _dataModel$types10 === void 0 ? void 0 : _dataModel$types10.filter(function (type) {
        return [BobjectTypes.Company, BobjectTypes.Lead, BobjectTypes.Opportunity].includes(type === null || type === void 0 ? void 0 : type.name);
      });
    },
    all: function all() {
      return dataModel === null || dataModel === void 0 ? void 0 : dataModel.types;
    }
  };
};
function getDataModel() {
  return _getDataModel.apply(this, arguments);
}
function _getDataModel() {
  _getDataModel = _asyncToGenerator$d( /*#__PURE__*/_regeneratorRuntime$d().mark(function _callee() {
    var _yield$api$get, data;
    return _regeneratorRuntime$d().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return api.get('/utils/service/datamodel', {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {}
          });
        case 3:
          _yield$api$get = _context.sent;
          data = _yield$api$get.data;
          return _context.abrupt("return", accountDataModel(data));
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", null);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _getDataModel.apply(this, arguments);
}

function _slicedToArray$o(arr, i) { return _arrayWithHoles$q(arr) || _iterableToArrayLimit$o(arr, i) || _unsupportedIterableToArray$s(arr, i) || _nonIterableRest$q(); }
function _nonIterableRest$q() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$s(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$s(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$s(o, minLen); }
function _arrayLikeToArray$s(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$o(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$q(arr) { if (Array.isArray(arr)) return arr; }

// Source: https://usehooks.com/useDebounce/
var useDebounce = function useDebounce(value, delay) {
  var _useState = useState(value),
    _useState2 = _slicedToArray$o(_useState, 2),
    debouncedValue = _useState2[0],
    setDebouncedValue = _useState2[1];
  useEffect(function () {
    var handler = setTimeout(function () {
      setDebouncedValue(value);
    }, delay);
    return function () {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

function _toConsumableArray$8(arr) { return _arrayWithoutHoles$8(arr) || _iterableToArray$a(arr) || _unsupportedIterableToArray$r(arr) || _nonIterableSpread$8(); }
function _nonIterableSpread$8() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$r(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$r(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$r(o, minLen); }
function _iterableToArray$a(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$8(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$r(arr); }
function _arrayLikeToArray$r(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var useDebouncedCallback = function useDebouncedCallback(func, wait, deps) {
  // Use a ref to store the timeout between renders
  // and prevent changes to it from causing re-renders
  var timeout = useRef();
  return useCallback(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var later = function later() {
      clearTimeout(timeout.current);
      func.apply(void 0, args);
    };
    clearTimeout(timeout.current);
    // @ts-ignore
    timeout.current = setTimeout(later, wait);
  }, [func, wait].concat(_toConsumableArray$8(deps)));
};

function _toConsumableArray$7(arr) { return _arrayWithoutHoles$7(arr) || _iterableToArray$9(arr) || _unsupportedIterableToArray$q(arr) || _nonIterableSpread$7(); }
function _nonIterableSpread$7() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$q(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$q(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$q(o, minLen); }
function _iterableToArray$9(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$7(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$q(arr); }
function _arrayLikeToArray$q(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var useDebounceEffect = function useDebounceEffect(effect, deps, delay) {
  var callback = useCallback(effect, deps);
  useEffect(function () {
    var timeoutId = setTimeout(function () {
      callback.apply(void 0, _toConsumableArray$7(deps));
    }, delay);
    return function () {
      clearTimeout(timeoutId);
    };
  }, [callback, delay]);
};

var useFieldDependencies = function useFieldDependencies(parentLogicRole, childLogicRole) {
  var _useSWR = useSWR(["/fieldConditions/search" + childLogicRole + parentLogicRole], function () {
      return api.post('/utils/service/dependencies/fieldValueConditions/search', {
        requiredParentFieldLogicRole: parentLogicRole,
        requiredChildFieldLogicRole: childLogicRole
      });
    }),
    data = _useSWR.data;
  return data === null || data === void 0 ? void 0 : data.data;
};

var useDidMountEffect = function useDidMountEffect(func, deps) {
  var didMount = useRef(false);
  useEffect(function () {
    if (didMount.current) func();else didMount.current = true;
  }, deps);
};

function _typeof$m(obj) { "@babel/helpers - typeof"; return _typeof$m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$m(obj); }
function _slicedToArray$n(arr, i) { return _arrayWithHoles$p(arr) || _iterableToArrayLimit$n(arr, i) || _unsupportedIterableToArray$p(arr, i) || _nonIterableRest$p(); }
function _nonIterableRest$p() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit$n(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$p(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime$c() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$c = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$m(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$c(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$c(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$c(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$c(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys$e(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$e(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$e(Object(source), !0).forEach(function (key) { _defineProperty$h(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$e(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$h(obj, key, value) { key = _toPropertyKey$h(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$h(arg) { var key = _toPrimitive$h(arg, "string"); return _typeof$m(key) === "symbol" ? key : String(key); }
function _toPrimitive$h(input, hint) { if (_typeof$m(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$m(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray$6(arr) { return _arrayWithoutHoles$6(arr) || _iterableToArray$8(arr) || _unsupportedIterableToArray$p(arr) || _nonIterableSpread$6(); }
function _nonIterableSpread$6() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$p(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$p(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$p(o, minLen); }
function _iterableToArray$8(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$6(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$p(arr); }
function _arrayLikeToArray$p(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var emailVariablesAtom = atom({
  key: 'emailVariables',
  "default": undefined
});
var emailVariablesValuesAtom = atom({
  key: 'emailVariablesValues',
  "default": {}
});
var getVariableValue = function getVariableValue(_ref) {
  var dataModel = _ref.dataModel,
    lead = _ref.lead,
    company = _ref.company,
    opportunity = _ref.opportunity,
    userName = _ref.userName,
    variable = _ref.variable;
  switch (variable.type) {
    case 'company':
      if (company) {
        if (company.raw) {
          return getFieldTextById(company, variable.id);
        } else {
          if (variable.fieldType.includes('PICKLIST')) {
            var _fieldValues$find;
            var fieldValues = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findValuesByFieldId(variable.id);
            return (_fieldValues$find = fieldValues.find(function (value) {
              return value.id === company[variable.id];
            })) === null || _fieldValues$find === void 0 ? void 0 : _fieldValues$find.name;
          } else return company[variable.id];
        }
      } else return null;
    case 'lead':
      if (lead) {
        if (lead.raw) {
          return getFieldTextById(lead, variable.id);
        } else {
          if (variable.fieldType.includes('PICKLIST')) {
            var _fieldValues$find2;
            var _fieldValues = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findValuesByFieldId(variable.id);
            return (_fieldValues$find2 = _fieldValues.find(function (value) {
              return value.id === lead[variable.id];
            })) === null || _fieldValues$find2 === void 0 ? void 0 : _fieldValues$find2.name;
          } else return lead[variable.id];
        }
      } else return null;
    case 'opportunity':
      if (opportunity) {
        if (opportunity.raw) {
          return getFieldTextById(opportunity, variable.id);
        } else {
          if (variable.fieldType.includes('PICKLIST')) {
            var _fieldValues2$find;
            var _fieldValues2 = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findValuesByFieldId(variable.id);
            return (_fieldValues2$find = _fieldValues2.find(function (value) {
              return value.id === opportunity[variable.id];
            })) === null || _fieldValues2$find === void 0 ? void 0 : _fieldValues2$find.name;
          } else return opportunity[variable.id];
        }
      } else return null;
    case 'user':
      return userName;
    default:
      throw new Error("Unsupported variable of type: '".concat(variable.type, "'"));
  }
};
var parseEmailVariables = function parseEmailVariables(bobjectTypes) {
  var variablesParsed = {};
  bobjectTypes === null || bobjectTypes === void 0 ? void 0 : bobjectTypes.forEach(function (type) {
    var _type$fields;
    type === null || type === void 0 ? void 0 : (_type$fields = type.fields) === null || _type$fields === void 0 ? void 0 : _type$fields.forEach(function (field) {
      if (field !== null && field !== void 0 && field.isTemplateVariable) {
        var logicRole = field.logicRole;
        var typeName = type.name.toLowerCase();
        var fieldType = field.fieldType;
        var obj = _defineProperty$h({}, typeName, [].concat(_toConsumableArray$6(variablesParsed[typeName] || []), [{
          id: field.id,
          type: typeName,
          name: field.name,
          logicRole: logicRole,
          fieldType: fieldType
        }]));
        variablesParsed = _objectSpread$e(_objectSpread$e(_objectSpread$e({}, variablesParsed), obj), {}, {
          SDR: [{
            id: 'user',
            name: 'Name',
            type: 'user',
            logicRole: 'USER__NAME'
          }]
        });
      }
    });
  });
  return variablesParsed;
};
var fetchBobjectFields = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator$c( /*#__PURE__*/_regeneratorRuntime$c().mark(function _callee(url) {
    var _yield$api$get, data;
    return _regeneratorRuntime$c().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return api.get(url, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {}
          });
        case 3:
          _yield$api$get = _context.sent;
          data = _yield$api$get.data;
          return _context.abrupt("return", data === null || data === void 0 ? void 0 : data._embedded);
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", null);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function fetchBobjectFields(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var useBaseEmailVariables = function useBaseEmailVariables() {
  var _useRecoilState = useRecoilState(emailVariablesAtom),
    _useRecoilState2 = _slicedToArray$n(_useRecoilState, 2),
    emailVariables = _useRecoilState2[0],
    setEmailVariables = _useRecoilState2[1];
  var dataModel = useDataModel();
  var bobjectTypes = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findMainBobjectTypes();
  useEffect(function () {
    if (bobjectTypes) {
      var parsedVariables = parseEmailVariables(bobjectTypes);
      setEmailVariables(parsedVariables);
    }
  }, [dataModel]);
  return emailVariables;
};
var useBaseEmailVariableValue = function useBaseEmailVariableValue() {
  return useRecoilValue(emailVariablesValuesAtom);
};
var useBaseResetEmailVariablesValues = function useBaseResetEmailVariablesValues() {
  var setEmailVariablesValues = useSetRecoilState(emailVariablesValuesAtom);
  return function () {
    return setEmailVariablesValues({});
  };
};
var useBaseSetEmailVariablesValues = function useBaseSetEmailVariablesValues() {
  var _settings$user;
  var emailVariables = useBaseEmailVariables();
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var dataModel = useDataModel();
  var userName = settings === null || settings === void 0 ? void 0 : (_settings$user = settings.user) === null || _settings$user === void 0 ? void 0 : _settings$user.name;
  var setEmailVariablesValues = useSetRecoilState(emailVariablesValuesAtom);
  var emailVariablesEntries = emailVariables && Object.entries(emailVariables);
  return function (_ref3) {
    var company = _ref3.company,
      lead = _ref3.lead,
      opportunity = _ref3.opportunity;
    var values = {};
    emailVariablesEntries === null || emailVariablesEntries === void 0 ? void 0 : emailVariablesEntries.forEach(function (_ref4) {
      var _ref5 = _slicedToArray$n(_ref4, 2),
        key = _ref5[0],
        group = _ref5[1];
      // @ts-ignore
      values[key] = group === null || group === void 0 ? void 0 : group.map(function (variable) {
        var value = getVariableValue({
          dataModel: dataModel,
          lead: lead,
          company: company,
          opportunity: opportunity,
          userName: userName,
          variable: variable
        });
        return _objectSpread$e(_objectSpread$e({}, variable), {}, {
          value: value
        });
      });
    });
    setEmailVariablesValues(values);
  };
};

var useFieldsData = function useFieldsData() {
  var dataModel = useDataModel();
  function getFieldValues(logicRole) {
    var bobjectType = getBobjectFromLogicRole(logicRole);
    var dataModelFields = dataModel === null || dataModel === void 0 ? void 0 : dataModel.getFieldsByBobjectType(bobjectType);
    return dataModelFields === null || dataModelFields === void 0 ? void 0 : dataModelFields.find(function (datamodelField) {
      return datamodelField.logicRole === logicRole;
    });
  }
  function getFieldValuesById(id, bobjectType) {
    var dataModelFields = dataModel === null || dataModel === void 0 ? void 0 : dataModel.getFieldsByBobjectType(bobjectType);
    return dataModelFields === null || dataModelFields === void 0 ? void 0 : dataModelFields.find(function (datamodelField) {
      return datamodelField.id === id;
    });
  }
  function getFieldValueByName(bobject, fieldName) {
    var _bobject$fields;
    var field = bobject === null || bobject === void 0 ? void 0 : (_bobject$fields = bobject.fields) === null || _bobject$fields === void 0 ? void 0 : _bobject$fields.find(function (bobjectField) {
      var _bobjectField$label;
      return (bobjectField === null || bobjectField === void 0 ? void 0 : (_bobjectField$label = bobjectField.label) === null || _bobjectField$label === void 0 ? void 0 : _bobjectField$label.toLowerCase()) === (fieldName === null || fieldName === void 0 ? void 0 : fieldName.toLowerCase());
    });
    if (!field) throw new Error("Field ".concat(fieldName, " not found"));
    var fieldType = field === null || field === void 0 ? void 0 : field.type;
    switch (fieldType) {
      case 'TEXT':
        return field === null || field === void 0 ? void 0 : field.value;
      default:
        return field;
    }
  }
  return {
    getFieldValueByName: getFieldValueByName,
    getFieldValues: getFieldValues,
    getFieldValuesById: getFieldValuesById
  };
};

function _slicedToArray$m(arr, i) { return _arrayWithHoles$o(arr) || _iterableToArrayLimit$m(arr, i) || _unsupportedIterableToArray$o(arr, i) || _nonIterableRest$o(); }
function _nonIterableRest$o() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$o(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$o(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$o(o, minLen); }
function _arrayLikeToArray$o(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$m(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$o(arr) { if (Array.isArray(arr)) return arr; }
var openGeneralSearchBarAtom = atom({
  key: 'openGeneralSearchBarAtom',
  "default": false
});
var useGeneralSearchVisibility = function useGeneralSearchVisibility() {
  var _useRecoilState = useRecoilState(openGeneralSearchBarAtom),
    _useRecoilState2 = _slicedToArray$m(_useRecoilState, 2),
    isOpen = _useRecoilState2[0],
    setIsOpen = _useRecoilState2[1];
  return {
    isOpen: isOpen,
    setIsOpen: setIsOpen,
    openGeneralSearchBar: function openGeneralSearchBar() {
      return setIsOpen(true);
    },
    closeGeneralSearchBar: function closeGeneralSearchBar() {
      return setIsOpen(false);
    },
    toggleVisibility: function toggleVisibility() {
      return setIsOpen(!isOpen);
    }
  };
};

function _typeof$l(obj) { "@babel/helpers - typeof"; return _typeof$l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$l(obj); }
function _regeneratorRuntime$b() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$b = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$l(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _slicedToArray$l(arr, i) { return _arrayWithHoles$n(arr) || _iterableToArrayLimit$l(arr, i) || _unsupportedIterableToArray$n(arr, i) || _nonIterableRest$n(); }
function _nonIterableRest$n() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$n(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$n(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$n(o, minLen); }
function _arrayLikeToArray$n(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$l(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$n(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep$b(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$b(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$b(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$b(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var fetchDisplayBlock = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator$b( /*#__PURE__*/_regeneratorRuntime$b().mark(function _callee(_ref) {
    var _ref3, key, language, response;
    return _regeneratorRuntime$b().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _ref3 = _slicedToArray$l(_ref, 2), key = _ref3[0], language = _ref3[1];
          _context.next = 3;
          return api.get("/utils/service/info-display-block/".concat(key, "/").concat(language));
        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.data);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fetchDisplayBlock(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var useGetInfoDisplayBlockByKey = function useGetInfoDisplayBlockByKey(key) {
  var _useTranslation = useTranslation(),
    i18n = _useTranslation.i18n;
  var language = i18n.language || 'en';
  var _useSWR = useSWR([key, language], fetchDisplayBlock, {
      use: [keepPreviousResponse]
    }),
    tooltipContent = _useSWR.data,
    isLoading = _useSWR.isLoading;
  return {
    tooltipContent: tooltipContent,
    isLoading: isLoading
  };
};
var fetchAllDisplayBlocks = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator$b( /*#__PURE__*/_regeneratorRuntime$b().mark(function _callee2() {
    var response;
    return _regeneratorRuntime$b().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return api.get('/utils/service/info-display-block/all');
        case 2:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function fetchAllDisplayBlocks() {
    return _ref4.apply(this, arguments);
  };
}();
var useAllInfoDisplayBlocks = function useAllInfoDisplayBlocks() {
  var _useSWR2 = useSWR('/utils/service/info-display-block/all', fetchAllDisplayBlocks, {
      use: [keepPreviousResponse]
    }),
    data = _useSWR2.data,
    mutate = _useSWR2.mutate;
  return {
    infoDisplayBlocks: data || [],
    mutate: mutate
  };
};

function useLazyRef(factory) {
  var ref = React.useRef(null);
  if (ref.current === null) {
    ref.current = factory();
  }
  return ref;
}

var useLocalStorage = function useLocalStorage() {
  var get = function get(key) {
    return JSON.parse(localStorage.getItem(key));
  };
  var set = function set(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  };
  var remove = function remove(key, subKey) {
    if (!subKey) {
      localStorage.removeItem(key);
    } else {
      var keyStored = get(key);
      if (keyStored) {
        delete keyStored[subKey];
        set(key, keyStored);
      }
    }
  };
  var removeRegexKeys = function removeRegexKeys(regex) {
    for (var key in localStorage) {
      if (regex.test(key)) {
        localStorage.removeItem(key);
      }
    }
  };
  return {
    stored: localStorage,
    get: get,
    set: set,
    remove: remove,
    removeRegexKeys: removeRegexKeys
  };
};

function _slicedToArray$k(arr, i) { return _arrayWithHoles$m(arr) || _iterableToArrayLimit$k(arr, i) || _unsupportedIterableToArray$m(arr, i) || _nonIterableRest$m(); }
function _nonIterableRest$m() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$m(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$m(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$m(o, minLen); }
function _arrayLikeToArray$m(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$k(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$m(arr) { if (Array.isArray(arr)) return arr; }
var minSizes;
(function (minSizes) {
  minSizes[minSizes["DESKTOP_SMALL"] = 1024] = "DESKTOP_SMALL";
  minSizes[minSizes["DESKTOP_MEDIUM"] = 1280] = "DESKTOP_MEDIUM";
  minSizes[minSizes["DESKTOP_BIG"] = 1480] = "DESKTOP_BIG";
  minSizes[minSizes["DESKTOP"] = 1440] = "DESKTOP";
})(minSizes || (minSizes = {}));
function getWindowDimensions() {
  var _window = window,
    width = _window.innerWidth,
    height = _window.innerHeight;
  return {
    width: width,
    height: height
  };
}
function useMediaQuery() {
  var _useState = useState(getWindowDimensions()),
    _useState2 = _slicedToArray$k(_useState, 2),
    windowDimensions = _useState2[0],
    setWindowDimensions = _useState2[1];
  var _useState3 = useState(getWindowDimensions().width < minSizes.DESKTOP_MEDIUM),
    _useState4 = _slicedToArray$k(_useState3, 2),
    isSmallDesktop = _useState4[0],
    setIsSmallDesktop = _useState4[1];
  var _useState5 = useState(minSizes.DESKTOP_MEDIUM <= getWindowDimensions().width && getWindowDimensions().width < minSizes.DESKTOP_BIG),
    _useState6 = _slicedToArray$k(_useState5, 2),
    isMediumDesktop = _useState6[0],
    setIsMediumDesktop = _useState6[1];
  var _useState7 = useState(minSizes.DESKTOP_BIG <= getWindowDimensions().width && getWindowDimensions().width < minSizes.DESKTOP),
    _useState8 = _slicedToArray$k(_useState7, 2),
    isBigDesktop = _useState8[0],
    setIsBigDesktop = _useState8[1];
  var _useState9 = useState(getWindowDimensions().width >= minSizes.DESKTOP),
    _useState10 = _slicedToArray$k(_useState9, 2),
    isDesktop = _useState10[0],
    setIsDesktop = _useState10[1];
  useEffect(function () {
    function handleResize() {
      var winDim = getWindowDimensions();
      setWindowDimensions(winDim);
      setIsSmallDesktop(winDim.width < minSizes.DESKTOP_MEDIUM);
      setIsMediumDesktop(minSizes.DESKTOP_MEDIUM <= winDim.width && winDim.width < minSizes.DESKTOP_BIG);
      setIsBigDesktop(minSizes.DESKTOP_BIG <= winDim.width && winDim.width < minSizes.DESKTOP);
      setIsDesktop(winDim.width >= minSizes.DESKTOP);
    }
    window.addEventListener('resize', handleResize);
    return function () {
      return window.removeEventListener('resize', handleResize);
    };
  }, []);
  return {
    windowDimensions: windowDimensions,
    isSmallDesktop: isSmallDesktop,
    isMediumDesktop: isMediumDesktop,
    isBigDesktop: isBigDesktop,
    isDesktop: isDesktop
  };
}

function _typeof$k(obj) { "@babel/helpers - typeof"; return _typeof$k = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$k(obj); }
function _regeneratorRuntime$a() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$a = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$k(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$a(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$a(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$a(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$a(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var searchMeetingLinks = function searchMeetingLinks(url) {
  return api.get(url).then(function (res) {
    return (res === null || res === void 0 ? void 0 : res.data) || [];
  })["catch"](function () {
    return [];
  });
};
var useMeetingLinks = function useMeetingLinks() {
  var _useSWR = useSWR('/messaging/meetingLink', searchMeetingLinks),
    data = _useSWR.data,
    error = _useSWR.error,
    mutate = _useSWR.mutate;
  function getUserMeetingLinks(ownerId) {
    return sortBy(data === null || data === void 0 ? void 0 : data.meetingLinks, 'defaultLink').reverse().filter(function (_ref) {
      var userId = _ref.userId;
      return userId === ownerId;
    });
  }
  return {
    getUserMeetingLinks: getUserMeetingLinks,
    meetingLinks: sortBy(data === null || data === void 0 ? void 0 : data.meetingLinks, 'defaultLink').reverse(),
    isLoading: !data,
    isError: error,
    mutate: mutate
  };
};
var useMeetingLink = function useMeetingLink() {
  var activeUserId = useActiveUserId();
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var create = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator$a( /*#__PURE__*/_regeneratorRuntime$a().mark(function _callee(_ref2) {
      var url, defaultLink, title;
      return _regeneratorRuntime$a().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            url = _ref2.url, defaultLink = _ref2.defaultLink, title = _ref2.title;
            return _context.abrupt("return", api.post("/messaging/meetingLink", {
              url: url,
              userId: activeUserId,
              title: title,
              defaultLink: defaultLink
            }).then(function () {
              createToast({
                message: "Meeting link created successfully.",
                type: 'success'
              });
            }));
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function create(_x) {
      return _ref3.apply(this, arguments);
    };
  }();
  var update = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator$a( /*#__PURE__*/_regeneratorRuntime$a().mark(function _callee2(meetingLink) {
      return _regeneratorRuntime$a().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", api.patch("/messaging/meetingLink/".concat(meetingLink.id), meetingLink).then(function () {
              createToast({
                message: "Meeting link edited successfully.",
                type: 'success'
              });
            }));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function update(_x2) {
      return _ref4.apply(this, arguments);
    };
  }();
  var deleteById = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator$a( /*#__PURE__*/_regeneratorRuntime$a().mark(function _callee3(id) {
      return _regeneratorRuntime$a().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", api["delete"]("/messaging/meetingLink/".concat(id)).then(function () {
              createToast({
                message: "Meeting link deleted successfully.",
                type: 'success'
              });
            }));
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function deleteById(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();
  var setAsDefault = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator$a( /*#__PURE__*/_regeneratorRuntime$a().mark(function _callee4(id) {
      return _regeneratorRuntime$a().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", api.patch("/messaging/meetingLink/setDefault/".concat(id)).then(function () {
              createToast({
                message: "Meeting link set as default successfully.",
                type: 'success'
              });
            }));
          case 1:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function setAsDefault(_x4) {
      return _ref6.apply(this, arguments);
    };
  }();
  return {
    create: create,
    update: update,
    deleteById: deleteById,
    setAsDefault: setAsDefault
  };
};

function _typeof$j(obj) { "@babel/helpers - typeof"; return _typeof$j = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$j(obj); }
function _regeneratorRuntime$9() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$9 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$j(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$9(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$9(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$9(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$9(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray$j(arr, i) { return _arrayWithHoles$l(arr) || _iterableToArrayLimit$j(arr, i) || _unsupportedIterableToArray$l(arr, i) || _nonIterableRest$l(); }
function _nonIterableRest$l() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$l(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$l(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$l(o, minLen); }
function _arrayLikeToArray$l(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$j(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$l(arr) { if (Array.isArray(arr)) return arr; }
var fetchMessagingTemplate = function fetchMessagingTemplate(url) {
  return api.get(url, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: {}
  }).then(function (response) {
    return response === null || response === void 0 ? void 0 : response.data;
  });
};
var useMessagingTemplate = function useMessagingTemplate(id) {
  var _useState = useState(),
    _useState2 = _slicedToArray$j(_useState, 2),
    errorSaving = _useState2[0],
    setErrorSaving = _useState2[1];
  useEffect(function () {
    return function () {
      setErrorSaving(undefined);
    };
  }, []);
  var _useSWR = useSWR(id ? "/messaging/messagingTemplates/".concat(id) : null, fetchMessagingTemplate, {
      revalidateOnFocus: false
    }),
    data = _useSWR.data,
    mutate = _useSWR.mutate,
    isValidating = _useSWR.isValidating;
  var saveMessagingTemplate = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator$9( /*#__PURE__*/_regeneratorRuntime$9().mark(function _callee(payload) {
      var messagingTemplate;
      return _regeneratorRuntime$9().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!payload.id) {
              _context.next = 6;
              break;
            }
            _context.next = 3;
            return api.put("/messaging/messagingTemplates/".concat(id), payload).then(function (response) {
              return response === null || response === void 0 ? void 0 : response.data;
            })["catch"](function (err) {
              var _err$response, _err$response2;
              if ((err === null || err === void 0 ? void 0 : (_err$response = err.response) === null || _err$response === void 0 ? void 0 : _err$response.status) === 409) {
                // @ts-ignore
                setErrorSaving({
                  name: 'Duplicated name'
                });
              }
              return err === null || err === void 0 ? void 0 : (_err$response2 = err.response) === null || _err$response2 === void 0 ? void 0 : _err$response2.status;
            });
          case 3:
            messagingTemplate = _context.sent;
            _context.next = 9;
            break;
          case 6:
            _context.next = 8;
            return api.post("/messaging/messagingTemplates", payload).then(function (response) {
              return response === null || response === void 0 ? void 0 : response.data;
            })["catch"](function (err) {
              var _err$response3, _err$response4;
              if ((err === null || err === void 0 ? void 0 : (_err$response3 = err.response) === null || _err$response3 === void 0 ? void 0 : _err$response3.status) === 409) {
                // @ts-ignore
                setErrorSaving({
                  name: 'Duplicated name'
                });
              }
              return err === null || err === void 0 ? void 0 : (_err$response4 = err.response) === null || _err$response4 === void 0 ? void 0 : _err$response4.status;
            });
          case 8:
            messagingTemplate = _context.sent;
          case 9:
            _context.next = 11;
            return mutate(messagingTemplate);
          case 11:
            return _context.abrupt("return", messagingTemplate);
          case 12:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function saveMessagingTemplate(_x2) {
      return _ref.apply(this, arguments);
    };
  }();
  var deleteMessagingTemplate = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator$9( /*#__PURE__*/_regeneratorRuntime$9().mark(function _callee2(messagingTemplateId) {
      return _regeneratorRuntime$9().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", api["delete"]("/messaging/messagingTemplates/".concat(messagingTemplateId), {
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              },
              data: {}
            }));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function deleteMessagingTemplate(_x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  return {
    messagingTemplate: data,
    isLoading: isValidating,
    saveMessagingTemplate: saveMessagingTemplate,
    deleteMessagingTemplate: deleteMessagingTemplate,
    error: errorSaving
  };
};

function _toArray$1(arr) { return _arrayWithHoles$k(arr) || _iterableToArray$7(arr) || _unsupportedIterableToArray$k(arr) || _nonIterableRest$k(); }
function _nonIterableRest$k() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$k(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$k(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$k(o, minLen); }
function _arrayLikeToArray$k(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArray$7(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithHoles$k(arr) { if (Array.isArray(arr)) return arr; }
var searchMessagingTemplates = function searchMessagingTemplates(_ref) {
  var _ref2 = _toArray$1(_ref),
    url = _ref2[0],
    filters = _ref2.slice(1);
  return api.post("".concat(url, "?sort=updateDatetime%2Cdesc&&page=0&&size=").concat(filters[5]), {
    type: filters[0],
    stage: filters[1],
    visibility: filters[2],
    name: filters[3] || '',
    segmentationValues: filters[4] ? JSON.parse(filters[4]) : {},
    usedInCadences: filters[6],
    onlyMine: filters[7],
    onlyOfficials: filters[8],
    onlyBattlecards: filters[9]
  }).then(function (res) {
    return res === null || res === void 0 ? void 0 : res.data;
  });
};
var useMessagingTemplates = function useMessagingTemplates(filters) {
  var segmentationValues = filters.segmentationValues,
    stage = filters.stage,
    type = filters.type,
    size = filters.size,
    name = filters.name,
    onlyMine = filters.onlyMine,
    onlyOfficials = filters.onlyOfficials,
    onlyBattlecards = filters.onlyBattlecards,
    visibility = filters.visibility,
    showCadencesTemplates = filters.showCadencesTemplates;
  var _useSWR = useSWR(['/messaging/messagingTemplates/search', type, stage, visibility, name, segmentationValues ? JSON.stringify(segmentationValues) : undefined, size, showCadencesTemplates, onlyMine, onlyOfficials, onlyBattlecards], searchMessagingTemplates, {
      revalidateOnFocus: false
    }),
    data = _useSWR.data,
    error = _useSWR.error,
    mutate = _useSWR.mutate,
    isValidating = _useSWR.isValidating;
  useEffect(function () {
    window.addEventListener(MessagesEvents.PlaybookFeed, function () {
      return mutate();
    });
    return function () {
      window.removeEventListener(MessagesEvents.PlaybookFeed, function () {
        return mutate();
      });
    };
  }, []);
  return {
    messagingTemplates: data || [],
    isLoading: isValidating,
    isError: error
  };
};

var usePreventWindowUnload = function usePreventWindowUnload(preventUnload) {
  useEffect(function () {
    var handleBeforeUnload = function handleBeforeUnload() {
      return true;
    };
    if (preventUnload) {
      window.onbeforeunload = handleBeforeUnload;
    } else {
      window.onbeforeunload = null;
    }
    return function () {
      // Limpiar el event listener al desmontar el componente
      window.onbeforeunload = null;
    };
  }, [preventUnload]);
};

function _typeof$i(obj) { "@babel/helpers - typeof"; return _typeof$i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$i(obj); }
function _toConsumableArray$5(arr) { return _arrayWithoutHoles$5(arr) || _iterableToArray$6(arr) || _unsupportedIterableToArray$j(arr) || _nonIterableSpread$5(); }
function _nonIterableSpread$5() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray$6(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$5(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$j(arr); }
function _slicedToArray$i(arr, i) { return _arrayWithHoles$j(arr) || _iterableToArrayLimit$i(arr, i) || _unsupportedIterableToArray$j(arr, i) || _nonIterableRest$j(); }
function _nonIterableRest$j() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$j(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$j(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$j(o, minLen); }
function _arrayLikeToArray$j(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$i(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$j(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys$d(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$d(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$d(Object(source), !0).forEach(function (key) { _defineProperty$g(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$d(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$g(obj, key, value) { key = _toPropertyKey$g(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$g(arg) { var key = _toPrimitive$g(arg, "string"); return _typeof$i(key) === "symbol" ? key : String(key); }
function _toPrimitive$g(input, hint) { if (_typeof$i(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$i(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime$8() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$8 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$i(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$8(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$8(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$8(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$8(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var isAPP = ['app.dev-bloobirds.com', 'app.bloobirds.com', 'localhost'].includes(window.location.hostname) || window.location.hostname.includes('bloobirds-platform-frontend.pages.dev');
var minimizableModalsAtom = atom({
  key: 'minimizableModals-old',
  "default": []
});
var confirmationModalAtom = atom({
  key: 'confirmationMinimizableModal-A',
  "default": {
    open: false,
    id: null
  }
});
var onCancelCloseAtom = atom({
  key: 'onCancelCloseAtom',
  "default": {
    fn: null
  }
});
var getActivityById = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator$8( /*#__PURE__*/_regeneratorRuntime$8().mark(function _callee(id) {
    return _regeneratorRuntime$8().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return api.get("/bobjects/".concat(id, "/form?injectReferences=true")).then(function (response) {
            return injectReferenceFields(response === null || response === void 0 ? void 0 : response.data);
          });
        case 2:
          return _context.abrupt("return", _context.sent);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getActivityById(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getContextBobject = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator$8( /*#__PURE__*/_regeneratorRuntime$8().mark(function _callee2(id) {
    var _bobjectId$split, _bobjectId$split2;
    var bobjectId, bobjectType, objectId;
    return _regeneratorRuntime$8().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          bobjectId = id;
          bobjectType = (_bobjectId$split = bobjectId.split('/')) === null || _bobjectId$split === void 0 ? void 0 : _bobjectId$split[1];
          objectId = bobjectId === null || bobjectId === void 0 ? void 0 : (_bobjectId$split2 = bobjectId.split('/')) === null || _bobjectId$split2 === void 0 ? void 0 : _bobjectId$split2[2];
          _context2.next = 5;
          return api.get("/linkedin/context/".concat(bobjectType, "/").concat(objectId)).then(function (response) {
            return response === null || response === void 0 ? void 0 : response.data;
          });
        case 5:
          return _context2.abrupt("return", _context2.sent);
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getContextBobject(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var filterByPrefix = function filterByPrefix(items, prefix) {
  var keys = Object.keys(items);
  var minimizableModalsKeys = keys.filter(function (key) {
    return key.startsWith(prefix);
  });
  return minimizableModalsKeys.map(function (key) {
    return JSON.parse(items[key]);
  });
};
var removeModalsOnlyInStorage = function removeModalsOnlyInStorage(modalsToSave, modalsInStorage, onRemove) {
  modalsInStorage.forEach(function (modalInStorage) {
    var modalFound = modalsToSave.find(function (modalToSave) {
      return modalToSave.id === modalInStorage.id;
    });
    if (!modalFound) {
      onRemove("".concat(MINIMIZABLE_MODALS, "_").concat(modalInStorage.id));
    }
  });
};
var saveMinimizableModals = function saveMinimizableModals(modals) {
  var modalsClosed = modals.filter(function (modal) {
    return !modal.open;
  });
  var modalsToSave = [];
  modalsClosed.forEach(function (modal) {
    var _modal$bobject, _modal$data$company, _modal$data$lead, _modal$data$opportuni;
    modalsToSave.push(_objectSpread$d(_objectSpread$d({}, modal), {}, {
      bobject: {
        id: (_modal$bobject = modal.bobject) === null || _modal$bobject === void 0 ? void 0 : _modal$bobject.id
      },
      data: _objectSpread$d(_objectSpread$d(_objectSpread$d(_objectSpread$d(_objectSpread$d(_objectSpread$d(_objectSpread$d({}, modal.data), modal.data.company ? {
        company: {
          id: (_modal$data$company = modal.data.company) === null || _modal$data$company === void 0 ? void 0 : _modal$data$company.id
        }
      } : {}), modal.data.lead ? {
        lead: {
          id: (_modal$data$lead = modal.data.lead) === null || _modal$data$lead === void 0 ? void 0 : _modal$data$lead.id
        }
      } : {}), modal.data.opportunity ? {
        opportunity: {
          id: (_modal$data$opportuni = modal.data.opportunity) === null || _modal$data$opportuni === void 0 ? void 0 : _modal$data$opportuni.id
        }
      } : {}), modal.data.leads ? {
        leads: {}
      } : {}), modal.data.opportunities ? {
        opportunities: {}
      } : {}), modal.data.companyContext ? {
        companyContext: {}
      } : {})
    }));
  });
  modalsToSave.forEach(function (modal) {
    var key = "".concat(MINIMIZABLE_MODALS, "_").concat(modal.id);
    var value = JSON.stringify(modal);
    if (isAPP) {
      localStorage.setItem(key, value);
    } else {
      var _chrome;
      if ((_chrome = chrome) !== null && _chrome !== void 0 && _chrome.storage) {
        var _chrome$storage, _chrome$storage$sync;
        (_chrome$storage = chrome.storage) === null || _chrome$storage === void 0 ? void 0 : (_chrome$storage$sync = _chrome$storage.sync) === null || _chrome$storage$sync === void 0 ? void 0 : _chrome$storage$sync.set(_defineProperty$g({}, key, value));
      }
    }
  });
  if (isAPP) {
    var modalsInStorage = filterByPrefix(localStorage, MINIMIZABLE_MODALS);
    var onRemoveItem = function onRemoveItem(key) {
      localStorage.removeItem(key);
    };
    removeModalsOnlyInStorage(modalsToSave, modalsInStorage, onRemoveItem);
  } else {
    var _chrome2;
    if ((_chrome2 = chrome) !== null && _chrome2 !== void 0 && _chrome2.storage) {
      var _chrome$storage2, _chrome$storage2$sync;
      (_chrome$storage2 = chrome.storage) === null || _chrome$storage2 === void 0 ? void 0 : (_chrome$storage2$sync = _chrome$storage2.sync) === null || _chrome$storage2$sync === void 0 ? void 0 : _chrome$storage2$sync.get(null, function (items) {
        var modalsInStorage = filterByPrefix(items, MINIMIZABLE_MODALS);
        var onRemoveItem = function onRemoveItem(key) {
          var _chrome$storage3, _chrome$storage3$sync;
          (_chrome$storage3 = chrome.storage) === null || _chrome$storage3 === void 0 ? void 0 : (_chrome$storage3$sync = _chrome$storage3.sync) === null || _chrome$storage3$sync === void 0 ? void 0 : _chrome$storage3$sync.remove(key);
        };
        removeModalsOnlyInStorage(modalsToSave, modalsInStorage, onRemoveItem);
      });
    }
  }
};
var getFullMinimizableModal = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator$8( /*#__PURE__*/_regeneratorRuntime$8().mark(function _callee3(modal) {
    var _modal$bobject2, _modal$data, _modal$data$opportuni2, _modal$data2, _modal$data2$lead, _modal$data3, _modal$data3$company;
    var context, _context3, _context4;
    return _regeneratorRuntime$8().wrap(function _callee3$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (!((_modal$bobject2 = modal.bobject) !== null && _modal$bobject2 !== void 0 && _modal$bobject2.id)) {
            _context5.next = 4;
            break;
          }
          _context5.next = 3;
          return getActivityById(modal.bobject.id.value);
        case 3:
          modal.bobject = _context5.sent;
        case 4:
          if (!((_modal$data = modal.data) !== null && _modal$data !== void 0 && (_modal$data$opportuni2 = _modal$data.opportunity) !== null && _modal$data$opportuni2 !== void 0 && _modal$data$opportuni2.id)) {
            _context5.next = 12;
            break;
          }
          _context5.next = 7;
          return getContextBobject(modal.data.opportunity.id.value);
        case 7:
          context = _context5.sent;
          modal.data.opportunity = context.opportunity;
          modal.data.company = context.company;
          if (modal.type === 'email') {
            modal.data.leads = context.leads;
          }
          return _context5.abrupt("return", modal);
        case 12:
          if (!((_modal$data2 = modal.data) !== null && _modal$data2 !== void 0 && (_modal$data2$lead = _modal$data2.lead) !== null && _modal$data2$lead !== void 0 && _modal$data2$lead.id)) {
            _context5.next = 20;
            break;
          }
          _context5.next = 15;
          return getContextBobject(modal.data.lead.id.value);
        case 15:
          _context3 = _context5.sent;
          modal.data.lead = _context3.lead;
          if (modal.data.companyContext) {
            modal.data.companyContext = _context3.company;
          } else {
            modal.data.company = _context3.company;
          }
          if (modal.type === 'email') {
            modal.data.leads = _context3.leads;
          }
          return _context5.abrupt("return", modal);
        case 20:
          if (!((_modal$data3 = modal.data) !== null && _modal$data3 !== void 0 && (_modal$data3$company = _modal$data3.company) !== null && _modal$data3$company !== void 0 && _modal$data3$company.id)) {
            _context5.next = 28;
            break;
          }
          _context5.next = 23;
          return getContextBobject(modal.data.company.id.value);
        case 23:
          _context4 = _context5.sent;
          modal.data.opportunity = _context4.opportunity;
          if (modal.data.companyContext) {
            modal.data.companyContext = _context4.company;
          } else {
            modal.data.company = _context4.company;
          }
          if (modal.type === 'email') {
            modal.data.leads = _context4.leads;
          }
          return _context5.abrupt("return", modal);
        case 28:
          return _context5.abrupt("return", modal);
        case 29:
        case "end":
          return _context5.stop();
      }
    }, _callee3);
  }));
  return function getFullMinimizableModal(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var loadFullModals = function loadFullModals(items) {
  var modals = filterByPrefix(items, MINIMIZABLE_MODALS);
  var minimizableModals = Promise.all(modals.map( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator$8( /*#__PURE__*/_regeneratorRuntime$8().mark(function _callee4(modal) {
      return _regeneratorRuntime$8().wrap(function _callee4$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return getFullMinimizableModal(modal);
          case 2:
            return _context6.abrupt("return", _context6.sent);
          case 3:
          case "end":
            return _context6.stop();
        }
      }, _callee4);
    }));
    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }()));
  return minimizableModals;
};
var loadMinimizableModals = function loadMinimizableModals() {
  if (isAPP) {
    return loadFullModals(localStorage);
  }
  if (!chrome.storage) {
    return Promise.resolve([]);
  }
  return new Promise(function (resolve) {
    var _chrome$storage4, _chrome$storage4$sync;
    (_chrome$storage4 = chrome.storage) === null || _chrome$storage4 === void 0 ? void 0 : (_chrome$storage4$sync = _chrome$storage4.sync) === null || _chrome$storage4$sync === void 0 ? void 0 : _chrome$storage4$sync.get(null, /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator$8( /*#__PURE__*/_regeneratorRuntime$8().mark(function _callee5(items) {
        return _regeneratorRuntime$8().wrap(function _callee5$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              resolve(loadFullModals(items));
            case 1:
            case "end":
              return _context7.stop();
          }
        }, _callee5);
      }));
      return function (_x5) {
        return _ref5.apply(this, arguments);
      };
    }());
  });
};
var useMinimizableStore = function useMinimizableStore() {
  var _useRecoilState = useRecoilState(minimizableModalsAtom),
    _useRecoilState2 = _slicedToArray$i(_useRecoilState, 2),
    minimizableModals = _useRecoilState2[0],
    setMinimizableModals = _useRecoilState2[1];
  var updateMinimizableModals = function updateMinimizableModals(newValue, oldValue) {
    if (newValue) {
      var newModal = JSON.parse(newValue);
      if (!minimizableModals.find(function (oldModal) {
        return oldModal.id === newModal.id;
      })) {
        setMinimizableModals([newModal].concat(_toConsumableArray$5(minimizableModals)));
      } else {
        setMinimizableModals(minimizableModals.map(function (oldModal) {
          if (oldModal.id === newModal.id) {
            return newModal;
          }
          return oldModal;
        }));
      }
    } else {
      var oldModal = JSON.parse(oldValue);
      setMinimizableModals(minimizableModals.filter(function (modal) {
        return modal.id !== oldModal.id;
      }));
    }
  };
  useEffect(function () {
    loadMinimizableModals().then(function (modals) {
      // @ts-ignore
      setMinimizableModals(modals);
    });
  }, [setMinimizableModals]);
  useEffect(function () {
    var onChangeChromeStorage = function onChangeChromeStorage(changes, area) {
      var minizableModals = Object.keys(changes).filter(function (key) {
        return key.startsWith(MINIMIZABLE_MODALS);
      });
      if (area === 'sync' && (minizableModals === null || minizableModals === void 0 ? void 0 : minizableModals.length) > 0) {
        var modals = minizableModals.map(function (key) {
          return changes[key];
        });
        modals.forEach(function (modal) {
          updateMinimizableModals(modal.newValue, modal.oldValue);
        });
      }
    };
    var onChangeLocalStorage = function onChangeLocalStorage(_ref6) {
      var key = _ref6.key,
        newValue = _ref6.newValue,
        oldValue = _ref6.oldValue;
      if (key !== null && key !== void 0 && key.startsWith(MINIMIZABLE_MODALS)) {
        updateMinimizableModals(newValue, oldValue);
      }
    };
    if (isAPP) {
      window.addEventListener('storage', onChangeLocalStorage);
    } else {
      var _chrome3;
      if ((_chrome3 = chrome) !== null && _chrome3 !== void 0 && _chrome3.storage) {
        var _chrome$storage5;
        (_chrome$storage5 = chrome.storage) === null || _chrome$storage5 === void 0 ? void 0 : _chrome$storage5.onChanged.addListener(onChangeChromeStorage);
      }
    }
    return function () {
      if (isAPP) {
        window.removeEventListener('storage', onChangeLocalStorage);
      } else {
        var _chrome4;
        if ((_chrome4 = chrome) !== null && _chrome4 !== void 0 && _chrome4.storage) {
          var _chrome$storage6;
          (_chrome$storage6 = chrome.storage) === null || _chrome$storage6 === void 0 ? void 0 : _chrome$storage6.onChanged.removeListener(onChangeChromeStorage);
        }
      }
    };
  }, [minimizableModals, setMinimizableModals]);
};
var useMinimizableModals = function useMinimizableModals() {
  var confirmationModal = useRecoilValue(confirmationModalAtom);
  var _useRecoilState3 = useRecoilState(minimizableModalsAtom),
    _useRecoilState4 = _slicedToArray$i(_useRecoilState3, 2),
    minimizableModals = _useRecoilState4[0],
    setMinimizableModals = _useRecoilState4[1];
  usePreventWindowUnload((minimizableModals === null || minimizableModals === void 0 ? void 0 : minimizableModals.length) > 0);
  var openMinimizableModal = function openMinimizableModal(_ref7) {
    var data = _ref7.data,
      title = _ref7.title,
      type = _ref7.type,
      bobject = _ref7.bobject,
      onSave = _ref7.onSave,
      onClose = _ref7.onClose;
    var modal = {
      id: v4(),
      open: true,
      hasBeenMinimized: false,
      type: type,
      title: title,
      data: data,
      bobject: bobject,
      onSave: onSave,
      onClose: onClose
    };
    setMinimizableModals([modal].concat(_toConsumableArray$5(minimizableModals)));
  };
  function openMinimizableModalById(id) {
    var modal = minimizableModals.find(function (modal) {
      return modal.id === id;
    });
    if (modal) {
      // Replace the modal with the same id but with open = true
      setMinimizableModals([].concat(_toConsumableArray$5(minimizableModals.filter(function (modal) {
        return modal.id !== id;
      })), [_objectSpread$d(_objectSpread$d({}, modal), {}, {
        open: true
      })]));
    }
  }
  return {
    minimizableModals: minimizableModals,
    openMinimizableModal: openMinimizableModal,
    confirmationModal: confirmationModal,
    openMinimizableModalById: openMinimizableModalById
  };
};
var useMinimizableModal = function useMinimizableModal(id) {
  var _useRecoilState5 = useRecoilState(minimizableModalsAtom),
    _useRecoilState6 = _slicedToArray$i(_useRecoilState5, 2),
    minimizableModals = _useRecoilState6[0],
    setMinimizableModals = _useRecoilState6[1];
  var _useRecoilState7 = useRecoilState(confirmationModalAtom),
    _useRecoilState8 = _slicedToArray$i(_useRecoilState7, 2),
    confirmationModal = _useRecoilState8[0],
    setConfirmationModal = _useRecoilState8[1];
  var _useRecoilState9 = useRecoilState(onCancelCloseAtom),
    _useRecoilState10 = _slicedToArray$i(_useRecoilState9, 2),
    onCancelCloseCallback = _useRecoilState10[0],
    setOnCancelCloseCallback = _useRecoilState10[1];
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var setEmailVariablesValue = useBaseSetEmailVariablesValues();
  var updateMinimizableModals = React.useCallback(function (modals) {
    setMinimizableModals(modals);
    saveMinimizableModals(modals);
  }, [setMinimizableModals]);
  var minimizableModal = minimizableModals.find(function (modal) {
    return modal.id === id;
  });
  var _openConfirmModal = function openConfirmModal() {
    setConfirmationModal({
      open: true,
      id: id
    });
  };
  var cancelConfirmModal = function cancelConfirmModal() {
    setConfirmationModal({
      open: false,
      id: null
    });
    if (onCancelCloseCallback) {
      var _onCancelCloseCallbac;
      (_onCancelCloseCallbac = onCancelCloseCallback.fn) === null || _onCancelCloseCallbac === void 0 ? void 0 : _onCancelCloseCallbac.call(onCancelCloseCallback);
    }
  };
  return _objectSpread$d(_objectSpread$d({}, minimizableModal), {}, {
    closeModal: function closeModal() {
      updateMinimizableModals(minimizableModals.filter(function (modal) {
        return modal.id !== id;
      }));
    },
    maximize: function maximize() {
      setMinimizableModals(minimizableModals.map(function (modal) {
        if (modal.id === id) {
          var _modal$data4, _modal$data4$company, _modal$data5, _modal$data5$company, _modal$data6, _modal$data6$company, _modal$data6$company$, _modal$data7, _modal$data7$lead, _modal$data8, _modal$data8$lead, _modal$data9, _modal$data9$lead, _modal$data9$lead$raw, _modal$data10, _modal$data10$opportu, _modal$data11, _modal$data11$opportu, _modal$data12, _modal$data12$opportu, _modal$data12$opportu2;
          setEmailVariablesValue({
            company: (_modal$data4 = modal.data) !== null && _modal$data4 !== void 0 && (_modal$data4$company = _modal$data4.company) !== null && _modal$data4$company !== void 0 && _modal$data4$company.rawBobject ? (_modal$data5 = modal.data) === null || _modal$data5 === void 0 ? void 0 : (_modal$data5$company = _modal$data5.company) === null || _modal$data5$company === void 0 ? void 0 : _modal$data5$company.rawBobject : (_modal$data6 = modal.data) === null || _modal$data6 === void 0 ? void 0 : (_modal$data6$company = _modal$data6.company) === null || _modal$data6$company === void 0 ? void 0 : (_modal$data6$company$ = _modal$data6$company.raw) === null || _modal$data6$company$ === void 0 ? void 0 : _modal$data6$company$.contents,
            lead: (_modal$data7 = modal.data) !== null && _modal$data7 !== void 0 && (_modal$data7$lead = _modal$data7.lead) !== null && _modal$data7$lead !== void 0 && _modal$data7$lead.rawBobject ? (_modal$data8 = modal.data) === null || _modal$data8 === void 0 ? void 0 : (_modal$data8$lead = _modal$data8.lead) === null || _modal$data8$lead === void 0 ? void 0 : _modal$data8$lead.rawBobject : (_modal$data9 = modal.data) === null || _modal$data9 === void 0 ? void 0 : (_modal$data9$lead = _modal$data9.lead) === null || _modal$data9$lead === void 0 ? void 0 : (_modal$data9$lead$raw = _modal$data9$lead.raw) === null || _modal$data9$lead$raw === void 0 ? void 0 : _modal$data9$lead$raw.contents,
            opportunity: (_modal$data10 = modal.data) !== null && _modal$data10 !== void 0 && (_modal$data10$opportu = _modal$data10.opportunity) !== null && _modal$data10$opportu !== void 0 && _modal$data10$opportu.rawBobject ? (_modal$data11 = modal.data) === null || _modal$data11 === void 0 ? void 0 : (_modal$data11$opportu = _modal$data11.opportunity) === null || _modal$data11$opportu === void 0 ? void 0 : _modal$data11$opportu.rawBobject : (_modal$data12 = modal.data) === null || _modal$data12 === void 0 ? void 0 : (_modal$data12$opportu = _modal$data12.opportunity) === null || _modal$data12$opportu === void 0 ? void 0 : (_modal$data12$opportu2 = _modal$data12$opportu.raw) === null || _modal$data12$opportu2 === void 0 ? void 0 : _modal$data12$opportu2.contents
          });
          return _objectSpread$d(_objectSpread$d({}, modal), {}, {
            open: true
          });
        }
        return modal;
      }));
      mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_MAXIMIZE_MODAL);
    },
    minimize: function minimize(_ref8) {
      var data = _ref8.data,
        title = _ref8.title,
        bobject = _ref8.bobject;
      if (minimizableModals.length >= 10) {
        createToast({
          message: 'You cannot minimize more than 10 windows',
          type: 'error'
        });
      } else {
        var modal = {
          id: id,
          type: minimizableModal.type,
          open: false,
          hasBeenMinimized: true,
          title: title || minimizableModal.title,
          bobject: bobject,
          data: _objectSpread$d(_objectSpread$d({}, minimizableModal['data']), data)
        };
        updateMinimizableModals([modal].concat(_toConsumableArray$5(minimizableModals.filter(function (modal) {
          return modal.id !== id;
        }))));
      }
      mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_MINIMIZE_MODAL);
    },
    confirmationModal: confirmationModal,
    openConfirmModal: function openConfirmModal(onCancelClose) {
      if (onCancelClose) {
        setOnCancelCloseCallback({
          fn: function fn() {
            return onCancelClose();
          }
        });
      }
      _openConfirmModal();
    },
    cancelConfirmModal: cancelConfirmModal
  });
};

function _typeof$h(obj) { "@babel/helpers - typeof"; return _typeof$h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$h(obj); }
function ownKeys$c(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$c(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$c(Object(source), !0).forEach(function (key) { _defineProperty$f(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$c(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$f(obj, key, value) { key = _toPropertyKey$f(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$f(arg) { var key = _toPrimitive$f(arg, "string"); return _typeof$h(key) === "symbol" ? key : String(key); }
function _toPrimitive$f(input, hint) { if (_typeof$h(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$h(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$h(arr, i) { return _arrayWithHoles$i(arr) || _iterableToArrayLimit$h(arr, i) || _unsupportedIterableToArray$i(arr, i) || _nonIterableRest$i(); }
function _nonIterableRest$i() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$i(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$i(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$i(o, minLen); }
function _arrayLikeToArray$i(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$h(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$i(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime$7() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$7 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$h(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$7(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var fetcher$1 = function fetcher(url) {
  return api.get(url);
};
var contentFetcher = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator$7( /*#__PURE__*/_regeneratorRuntime$7().mark(function _callee(url) {
    var response;
    return _regeneratorRuntime$7().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return api.get(url);
        case 2:
          response = _context.sent;
          return _context.abrupt("return", response === null || response === void 0 ? void 0 : response.data.content);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function contentFetcher(_x) {
    return _ref.apply(this, arguments);
  };
}();
var fetchDeleteNotification = function fetchDeleteNotification(id) {
  return api["delete"]("/utils/notifications/".concat(id), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: {}
  });
};
var fetchDeleteNotificationByObjectId = function fetchDeleteNotificationByObjectId(id) {
  return api["delete"]("/utils/notifications/deleteByObjectId/".concat(id), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: {}
  });
};
var useNotificationsData = function useNotificationsData() {
  var _useSWR = useSWR('/utils/notifications/countUnreadByCategory', fetcher$1),
    unreadByCategory = _useSWR.data,
    mutate = _useSWR.mutate;
  var totalUnread = useMemo(function () {
    return Object.values((unreadByCategory === null || unreadByCategory === void 0 ? void 0 : unreadByCategory.data) || {}).reduce(function (x, y) {
      return x + y;
    }, 0);
  }, [unreadByCategory]);
  return {
    unreadByCategory: unreadByCategory,
    totalUnread: totalUnread,
    mutate: mutate
  };
};
var getKey = function getKey(category, types) {
  return function (pageIndex, previousPageData) {
    if (previousPageData && !previousPageData.length) return null;else if (category && types) return "/utils/notifications?category=".concat(category, "&types=").concat(types === null || types === void 0 ? void 0 : types.join(','), "&page=").concat(pageIndex, "&size=9");else if (category) return "/utils/notifications?category=".concat(category, "&page=").concat(pageIndex, "&size=9");else if (types) return "/utils/notifications?types=".concat(types === null || types === void 0 ? void 0 : types.join(','), "&page=").concat(pageIndex, "&size=9");else return null;
  };
};
var useNotifications = function useNotifications() {
  var _content;
  var defaultCategory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NotificationsCategory.UPDATES;
  var _useState = useState(defaultCategory),
    _useState2 = _slicedToArray$h(_useState, 2),
    category = _useState2[0],
    setCategory = _useState2[1];
  var _useNotificationsData = useNotificationsData(),
    reloadNotificationCount = _useNotificationsData.mutate;
  var data = useSWRInfinite(getKey(category), contentFetcher);
  var content = data.data,
    size = data.size,
    setSize = data.setSize,
    mutate = data.mutate,
    error = data.error;
  var removeNotification = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator$7( /*#__PURE__*/_regeneratorRuntime$7().mark(function _callee2(id) {
      return _regeneratorRuntime$7().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetchDeleteNotification(id);
          case 2:
            _context2.next = 4;
            return mutate();
          case 4:
            _context2.next = 6;
            return reloadNotificationCount();
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function removeNotification(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var removeNotificationByObjectId = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator$7( /*#__PURE__*/_regeneratorRuntime$7().mark(function _callee3(id) {
      return _regeneratorRuntime$7().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return fetchDeleteNotificationByObjectId(id);
          case 2:
            _context3.next = 4;
            return mutate();
          case 4:
            _context3.next = 6;
            return reloadNotificationCount();
          case 6:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function removeNotificationByObjectId(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();
  useEventSubscription('notification', function () {
    reloadNotificationCount();
    mutate();
  });
  var markAsReadByCategory = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator$7( /*#__PURE__*/_regeneratorRuntime$7().mark(function _callee4() {
      var notifications;
      return _regeneratorRuntime$7().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return api.get("/utils/notifications/markCategoryAsRead?category=".concat(category));
          case 2:
            notifications = content === null || content === void 0 ? void 0 : content.map(function (subarray) {
              return subarray === null || subarray === void 0 ? void 0 : subarray.map(function (notification) {
                return _objectSpread$c(_objectSpread$c({}, notification), {}, {
                  read: true
                });
              });
            });
            _context4.next = 5;
            return mutate(notifications, false);
          case 5:
            _context4.next = 7;
            return reloadNotificationCount();
          case 7:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function markAsReadByCategory() {
      return _ref4.apply(this, arguments);
    };
  }();
  var markAsReadByTypes = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator$7( /*#__PURE__*/_regeneratorRuntime$7().mark(function _callee5(types) {
      var notifications;
      return _regeneratorRuntime$7().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return api.get("/utils/notifications/markTypesAsRead?types=".concat(types));
          case 2:
            notifications = content === null || content === void 0 ? void 0 : content.map(function (subarray) {
              return subarray === null || subarray === void 0 ? void 0 : subarray.map(function (notification) {
                return _objectSpread$c(_objectSpread$c({}, notification), {}, {
                  read: true
                });
              });
            });
            _context5.next = 5;
            return mutate(notifications, false);
          case 5:
            _context5.next = 7;
            return reloadNotificationCount();
          case 7:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function markAsReadByTypes(_x4) {
      return _ref5.apply(this, arguments);
    };
  }();
  var markAsReadById = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator$7( /*#__PURE__*/_regeneratorRuntime$7().mark(function _callee6(id) {
      var notifications;
      return _regeneratorRuntime$7().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return api.get("/utils/notifications/markAsRead/".concat(id));
          case 2:
            notifications = content === null || content === void 0 ? void 0 : content.map(function (subarray) {
              return subarray === null || subarray === void 0 ? void 0 : subarray.map(function (notification) {
                if (notification.id === id) {
                  return _objectSpread$c(_objectSpread$c({}, notification), {}, {
                    read: true
                  });
                }
                return notification;
              });
            });
            _context6.next = 5;
            return mutate(notifications, false);
          case 5:
            _context6.next = 7;
            return reloadNotificationCount();
          case 7:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return function markAsReadById(_x5) {
      return _ref6.apply(this, arguments);
    };
  }();
  function refresh() {
    mutate();
    reloadNotificationCount();
  }
  return {
    category: category,
    setCategory: setCategory,
    notifications: (content === null || content === void 0 ? void 0 : content.flat()) || [],
    isLastPage: content && ((_content = content[content.length - 1]) === null || _content === void 0 ? void 0 : _content.length) < 9,
    isLoading: !content && !error,
    loadMore: function loadMore() {
      return setSize(size + 1);
    },
    removeNotification: removeNotification,
    markAsReadById: markAsReadById,
    markAsReadByCategory: markAsReadByCategory,
    markAsReadByTypes: markAsReadByTypes,
    mutate: mutate,
    refresh: refresh,
    removeNotificationByObjectId: removeNotificationByObjectId
  };
};

function _typeof$g(obj) { "@babel/helpers - typeof"; return _typeof$g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$g(obj); }
function _regeneratorRuntime$6() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$6 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$g(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$6(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var useObjectCreationSettings = function useObjectCreationSettings() {
  var _useSWR = useSWR('/linkedin/settings', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator$6( /*#__PURE__*/_regeneratorRuntime$6().mark(function _callee(url) {
        var response;
        return _regeneratorRuntime$6().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return api.get(url);
            case 2:
              response = _context.sent;
              return _context.abrupt("return", response.data);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()),
    data = _useSWR.data,
    mutate = _useSWR.mutate;
  return {
    enabledObjectCreation: data ? data.allowObjectCreation : true,
    enabledChangeStatus: data ? data.allowChangeStatus : true,
    companyRequiredFromExtension: data ? data.companyRequiredFromExtension : false,
    mutate: mutate
  };
};

function _typeof$f(obj) { "@babel/helpers - typeof"; return _typeof$f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$f(obj); }
function _slicedToArray$g(arr, i) { return _arrayWithHoles$h(arr) || _iterableToArrayLimit$g(arr, i) || _unsupportedIterableToArray$h(arr, i) || _nonIterableRest$h(); }
function _nonIterableRest$h() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$h(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$h(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$h(o, minLen); }
function _arrayLikeToArray$h(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$g(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$h(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperty$e(obj, key, value) { key = _toPropertyKey$e(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$e(arg) { var key = _toPrimitive$e(arg, "string"); return _typeof$f(key) === "symbol" ? key : String(key); }
function _toPrimitive$e(input, hint) { if (_typeof$f(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$f(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var meetingResultModalVisibilityAtom = atom({
  key: 'meetingResultModalVisibilityAtom',
  "default": false
});
var activityAtom = atom({
  key: 'meetingResultModalActivityAtom',
  "default": null
});
var mutateAtom = atom({
  key: 'meetingResultMutateAtom',
  "default": null
});
var reportResult = function reportResult(activity, meetingType) {
  var meetingResult = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var markAsReported = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var accountId = activity.id.accountId;
  var activityId = activity.id.objectId;
  var activityData = _defineProperty$e({}, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE, meetingType);
  if (meetingResult) {
    activityData[ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT] = meetingResult;
  }
  if (markAsReported) {
    activityData[ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED] = meetingResult ? REPORTED_VALUES_LOGIC_ROLE.YES : REPORTED_VALUES_LOGIC_ROLE.NO;
  }
  return api.patch("/bobjects/".concat(accountId, "/Activity/").concat(activityId, "/raw"), activityData);
};
var useMarkAsReported = function useMarkAsReported() {
  var markAsReported = function markAsReported(activity) {
    var accountId = activity.id.accountId;
    var activityId = activity.id.objectId;
    var activityData = _defineProperty$e({}, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED, REPORTED_VALUES_LOGIC_ROLE.YES);
    return api.patch("/bobjects/".concat(accountId, "/Activity/").concat(activityId, "/raw"), activityData);
  };
  return {
    markAsReported: markAsReported
  };
};
var useMeetingReportResult = function useMeetingReportResult(dataModel, meetingTypeId) {
  var _dataModel$getFieldsB, _dataModel$getFieldsB2, _dataModel$getFieldsB3, _dataModel$getFieldsB4;
  var defaultMeetingResults = dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$getFieldsB = dataModel.getFieldsByBobjectType('Activity')) === null || _dataModel$getFieldsB === void 0 ? void 0 : (_dataModel$getFieldsB2 = _dataModel$getFieldsB.find(function (datamodelField) {
    return datamodelField.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT;
  })) === null || _dataModel$getFieldsB2 === void 0 ? void 0 : (_dataModel$getFieldsB3 = _dataModel$getFieldsB2.values) === null || _dataModel$getFieldsB3 === void 0 ? void 0 : (_dataModel$getFieldsB4 = _dataModel$getFieldsB3.filter(function (value) {
    return value === null || value === void 0 ? void 0 : value.isEnabled;
  })) === null || _dataModel$getFieldsB4 === void 0 ? void 0 : _dataModel$getFieldsB4.sort(function (a, b) {
    return a.ordering - b.ordering;
  });
  var dependencies = useFieldDependencies(ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT);
  var dependenciesOfSelectedType = dependencies === null || dependencies === void 0 ? void 0 : dependencies.find(function (dependency) {
    return dependency.requiredValue.name === meetingTypeId;
  });
  var meetingResults = dependenciesOfSelectedType ? defaultMeetingResults === null || defaultMeetingResults === void 0 ? void 0 : defaultMeetingResults.filter(function (result) {
    return (dependenciesOfSelectedType === null || dependenciesOfSelectedType === void 0 ? void 0 : dependenciesOfSelectedType.fieldValuesToDisplay.filter(function (fvd) {
      return fvd.name === result.id;
    }).length) > 0;
  }) : defaultMeetingResults;
  return {
    reportResult: reportResult,
    meetingResults: meetingResults
  };
};
var useOpenMeetingReportResult = function useOpenMeetingReportResult() {
  var dataModel = useDataModel();
  var _useRecoilState = useRecoilState(activityAtom),
    _useRecoilState2 = _slicedToArray$g(_useRecoilState, 2),
    activity = _useRecoilState2[0],
    setActivity = _useRecoilState2[1];
  var _useRecoilState3 = useRecoilState(meetingResultModalVisibilityAtom),
    _useRecoilState4 = _slicedToArray$g(_useRecoilState3, 2),
    meetingResultModalVisibility = _useRecoilState4[0],
    setMeetingResultModalVisibility = _useRecoilState4[1];
  var _useRecoilState5 = useRecoilState(mutateAtom),
    _useRecoilState6 = _slicedToArray$g(_useRecoilState5, 2),
    onSave = _useRecoilState6[0],
    setOnSave = _useRecoilState6[1];
  return {
    openMeetingReportResult: function openMeetingReportResult(activity, mutate) {
      setActivity(activity);
      setMeetingResultModalVisibility(true);
      if (mutate) {
        setOnSave({
          fn: function fn() {
            return mutate();
          }
        });
      }
    },
    meetingResultModalVisibility: meetingResultModalVisibility,
    closeMeetingResultModal: function closeMeetingResultModal() {
      setMeetingResultModalVisibility(false);
      setActivity(null);
    },
    activity: activity,
    dataModel: dataModel,
    onSave: onSave
  };
};

function _typeof$e(obj) { "@babel/helpers - typeof"; return _typeof$e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$e(obj); }
function _regeneratorRuntime$5() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$5 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$e(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$5(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _toConsumableArray$4(arr) { return _arrayWithoutHoles$4(arr) || _iterableToArray$5(arr) || _unsupportedIterableToArray$g(arr) || _nonIterableSpread$4(); }
function _nonIterableSpread$4() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray$5(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$4(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$g(arr); }
function _slicedToArray$f(arr, i) { return _arrayWithHoles$g(arr) || _iterableToArrayLimit$f(arr, i) || _unsupportedIterableToArray$g(arr, i) || _nonIterableRest$g(); }
function _nonIterableRest$g() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$g(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$g(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$g(o, minLen); }
function _arrayLikeToArray$g(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$f(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$g(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys$b(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$b(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$b(Object(source), !0).forEach(function (key) { _defineProperty$d(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$b(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$d(obj, key, value) { key = _toPropertyKey$d(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$d(arg) { var key = _toPrimitive$d(arg, "string"); return _typeof$e(key) === "symbol" ? key : String(key); }
function _toPrimitive$d(input, hint) { if (_typeof$e(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$e(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var fetchPeriods = function fetchPeriods(userId) {
  var accountId = sessionStorage.getItem('accountId');
  return api.get("/entities/pausedCadencePeriods?user.id=".concat(userId, "&account.id=").concat(accountId, "&page=0&size=1000&sort=id%2Casc")).then(function (_ref) {
    var data = _ref.data;
    return data;
  });
};
var addPeriodRequest = function addPeriodRequest(period) {
  return api.post('/messaging/pausePeriods', {
    startDate: getISODate(new Date(period.startDate)),
    endDate: getISODate(new Date(period.endDate)),
    name: period.pauseName
  });
};
var updatePeriodRequest = function updatePeriodRequest(id, period) {
  return api.put("/messaging/pausePeriods/".concat(id), {
    startDate: getISODate(new Date(period.startDate)),
    endDate: getISODate(new Date(period.endDate)),
    name: period.pauseName
  });
};
var removePeriodRequest = function removePeriodRequest(id) {
  return api["delete"]("/messaging/pausePeriods/".concat(id, "/cancel"), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: {}
  });
};
var getDaysArray = function getDaysArray(start, end) {
  var arr;
  var dt;
  for (arr = [], dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(getISODate(new Date(dt)));
  }
  return arr;
};
var getLastActiveEndDate = function getLastActiveEndDate(periods) {
  return periods.reduce(function (lastEndDate, period) {
    var endDate = new Date(period.endDate);
    if (period.isActive && endDate > lastEndDate) {
      lastEndDate = endDate;
    }
    return lastEndDate;
  }, new Date());
};
var pausePeriodsAtom = atom({
  key: 'pausePeriods',
  "default": {
    list: [],
    loaded: false,
    uniqueDates: null,
    pausedUserId: '',
    isUserCurrentlyPaused: false,
    currentPausedPeriod: []
  }
});
var pauseModalAtom = atom({
  key: 'pauseModal',
  "default": _objectSpread$b({
    mode: 'CREATE'
  }, {})
});
var pauseModalVisibility = atom({
  key: 'pauseModalVisibility',
  "default": false
});
var cachedUserIdAtom = atom({
  key: 'cachedPauseUserId',
  "default": null
});
var usePausePeriodsModal = function usePausePeriodsModal() {
  var _useRecoilState = useRecoilState(pauseModalAtom),
    _useRecoilState2 = _slicedToArray$f(_useRecoilState, 2),
    pausePeriod = _useRecoilState2[0],
    setPausePeriod = _useRecoilState2[1];
  var _useRecoilState3 = useRecoilState(pauseModalVisibility),
    _useRecoilState4 = _slicedToArray$f(_useRecoilState3, 2),
    open = _useRecoilState4[0],
    setOpen = _useRecoilState4[1];
  var handleClose = function handleClose() {
    setOpen(false);
  };
  var openEditPauseModal = function openEditPauseModal(period) {
    setPausePeriod(_objectSpread$b({
      mode: 'EDIT'
    }, period));
    setOpen(true);
  };
  var openCreatePauseModal = function openCreatePauseModal() {
    setPausePeriod(_objectSpread$b({
      mode: 'CREATE'
    }, {}));
    setOpen(true);
  };
  return {
    openEditPauseModal: openEditPauseModal,
    openCreatePauseModal: openCreatePauseModal,
    handleClose: handleClose,
    open: open,
    pausePeriod: pausePeriod
  };
};
var usePausePeriods = function usePausePeriods(props) {
  var _useRecoilState5 = useRecoilState(pausePeriodsAtom),
    _useRecoilState6 = _slicedToArray$f(_useRecoilState5, 2),
    periods = _useRecoilState6[0],
    setPeriods = _useRecoilState6[1];
  var _useRecoilState7 = useRecoilState(cachedUserIdAtom),
    _useRecoilState8 = _slicedToArray$f(_useRecoilState7, 2),
    cachedUserId = _useRecoilState8[0],
    setCachedUserId = _useRecoilState8[1];
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var _useState = useState(false),
    _useState2 = _slicedToArray$f(_useState, 2),
    isSubmitting = _useState2[0],
    setIsSubmitting = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$f(_useState3, 2),
    refreshPeriods = _useState4[0],
    setRefreshPeriods = _useState4[1];
  var userId = props === null || props === void 0 ? void 0 : props.userId;
  var todayIso = getISODate(new Date());
  useEffect(function () {
    if (userId && (userId !== cachedUserId || refreshPeriods)) {
      setCachedUserId(userId);
      fetchPeriods(userId).then(function (response) {
        var _response$_embedded;
        var periodsList = response === null || response === void 0 ? void 0 : (_response$_embedded = response._embedded) === null || _response$_embedded === void 0 ? void 0 : _response$_embedded.pausedCadencePeriods;
        var pausedDates = [];
        periodsList.forEach(function (period, i) {
          var startDate = new Date(new Date(period.startDate).getTime() + new Date(period.startDate).getTimezoneOffset() * 60000);
          var endDate = new Date(new Date(period.endDate).getTime() + new Date(period.endDate).getTimezoneOffset() * 60000);
          var today = new Date();
          var dates = getDaysArray(startDate, endDate);
          pausedDates = [].concat(_toConsumableArray$4(pausedDates), _toConsumableArray$4(dates));
          periodsList[i].finished = new Date(endDate.setHours(23, 59, 59, 999)) < today;
          periodsList[i].isActive = new Set(dates).has(todayIso);
        });
        var uniqueDates = pausedDates.length > 0 ? new Set(pausedDates) : undefined;
        var lastActiveEndDate = getLastActiveEndDate(periodsList);
        setRefreshPeriods(false);
        setPeriods({
          list: periodsList,
          loaded: true,
          uniqueDates: uniqueDates,
          pausedUserId: userId,
          isUserCurrentlyPaused: periodsList.filter(function (period) {
            return period.isActive && period.user === userId;
          }).length > 0,
          currentPausedPeriod: periodsList.reduce(function (lastEndDate, period) {
            var endDate = new Date(period.endDate);
            var startDate = new Date(period.startDate);
            if (startDate < lastEndDate && endDate > lastEndDate) {
              lastEndDate = endDate;
            }
            return lastEndDate;
          }, lastActiveEndDate)
        });
      });
    }
  }, [userId, refreshPeriods]);
  var addNewPeriod = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator$5( /*#__PURE__*/_regeneratorRuntime$5().mark(function _callee(data) {
      return _regeneratorRuntime$5().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setIsSubmitting(true);
            _context.next = 3;
            return addPeriodRequest(data).then(function (response) {
              setRefreshPeriods(!refreshPeriods);
              setIsSubmitting(false);
              createToast({
                type: 'success',
                message: 'Pause Period successfully created'
              });
              return response;
            })["catch"](function () {
              setIsSubmitting(false);
              createToast({
                type: 'error',
                message: 'There was an error creating your Pause Period'
              });
            });
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function addNewPeriod(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var cancelPeriod = function cancelPeriod(id) {
    setIsSubmitting(true);
    return removePeriodRequest(id).then(function () {
      setIsSubmitting(false);
      setRefreshPeriods(!refreshPeriods);
      createToast({
        type: 'success',
        message: 'Pause Period successfully removed'
      });
    })["catch"](function () {
      setIsSubmitting(false);
      createToast({
        type: 'error',
        message: 'There was an error pausing your cadences, please try again later'
      });
    });
  };
  var updatePeriod = function updatePeriod(id, period) {
    setIsSubmitting(true);
    return updatePeriodRequest(id, period).then(function (response) {
      setRefreshPeriods(!refreshPeriods);
      setIsSubmitting(false);
      createToast({
        type: 'success',
        message: 'Pause Cadence Updated'
      });
      return response;
    })["catch"](function () {
      setIsSubmitting(false);
      createToast({
        type: 'error',
        message: 'There was an error pausing your cadences, please try again later'
      });
    });
  };
  return {
    periods: periods,
    addNewPeriod: addNewPeriod,
    cancelPeriod: cancelPeriod,
    updatePeriod: updatePeriod,
    isSubmitting: isSubmitting
  };
};

var fetcher = function fetcher(url) {
  return api.get(url);
};
var usePicklist = function usePicklist(parentId) {
  var _useSWR = useSWR("/utils/picklists/".concat(parentId), fetcher),
    data = _useSWR.data,
    mutate = _useSWR.mutate;
  return {
    data: data === null || data === void 0 ? void 0 : data.data,
    mutate: mutate
  };
};

function _typeof$d(obj) { "@babel/helpers - typeof"; return _typeof$d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$d(obj); }
function _toConsumableArray$3(arr) { return _arrayWithoutHoles$3(arr) || _iterableToArray$4(arr) || _unsupportedIterableToArray$f(arr) || _nonIterableSpread$3(); }
function _nonIterableSpread$3() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray$4(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$3(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$f(arr); }
function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$a(Object(source), !0).forEach(function (key) { _defineProperty$c(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$c(obj, key, value) { key = _toPropertyKey$c(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$c(arg) { var key = _toPrimitive$c(arg, "string"); return _typeof$d(key) === "symbol" ? key : String(key); }
function _toPrimitive$c(input, hint) { if (_typeof$d(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$d(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime$4() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$4 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$d(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _slicedToArray$e(arr, i) { return _arrayWithHoles$f(arr) || _iterableToArrayLimit$e(arr, i) || _unsupportedIterableToArray$f(arr, i) || _nonIterableRest$f(); }
function _nonIterableRest$f() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$f(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$f(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$f(o, minLen); }
function _arrayLikeToArray$f(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$e(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$f(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$4(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var fetchSegmentations = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator$4( /*#__PURE__*/_regeneratorRuntime$4().mark(function _callee(_ref) {
    var _ref3, url, stage, response;
    return _regeneratorRuntime$4().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _ref3 = _slicedToArray$e(_ref, 2), url = _ref3[0], stage = _ref3[1];
          _context.next = 3;
          return api.get("".concat(url, "?stage=").concat(stage), {
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            data: {}
          }).then(function (res) {
            return res === null || res === void 0 ? void 0 : res.data;
          });
        case 3:
          response = _context.sent;
          return _context.abrupt("return", sortBy(response, 'ordering'));
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fetchSegmentations(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var usePlaybookSegmentation = function usePlaybookSegmentation(stage) {
  var _useSWR = useSWR(['/messaging/segmentations', stage], fetchSegmentations),
    segmentations = _useSWR.data;
  var dataModel = useDataModel();
  var dataModelFieldsByBobjectType = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findMainBobjectTypes();
  var dataModelFields = dataModelFieldsByBobjectType === null || dataModelFieldsByBobjectType === void 0 ? void 0 : dataModelFieldsByBobjectType.flatMap(function (fields) {
    return fields.fields;
  });
  var segmentationFields = useMemo(function () {
    return segmentations === null || segmentations === void 0 ? void 0 : segmentations.reduce(function (acc, segmentation) {
      var bobjectFieldId = segmentation.bobjectFieldId;
      var field = dataModelFields === null || dataModelFields === void 0 ? void 0 : dataModelFields.find(function (dataModelField) {
        return dataModelField.id === bobjectFieldId;
      });
      if (field) return _objectSpread$a(_objectSpread$a({}, acc), {}, _defineProperty$c({}, segmentation.stage, [].concat(_toConsumableArray$3(acc[segmentation.stage]), [field])));
      return acc;
    }, _defineProperty$c(_defineProperty$c({}, TemplateStage.Prospecting, []), TemplateStage.Sales, []));
  }, [segmentations, dataModelFields]);
  return {
    segmentationFields: segmentationFields,
    isLoading: !dataModel
  };
};
var usePlaybook = function usePlaybook(_ref4) {
  var _bobjectData$activeBo, _bobjectData$activeBo2, _bobjectData$activeBo3, _bobjectData$activeBo4, _bobjectData$company$, _bobjectData$company, _bobjectData$company2, _bobjectData$company3, _bobjectData$activeBo5, _bobjectData$activeBo6, _bobjectData$activeBo7, _bobjectData$activeBo8;
  var stage = _ref4.stage,
    bobjectData = _ref4.bobjectData;
  var activeRawBobject = (_bobjectData$activeBo = bobjectData === null || bobjectData === void 0 ? void 0 : (_bobjectData$activeBo2 = bobjectData.activeBobject) === null || _bobjectData$activeBo2 === void 0 ? void 0 : _bobjectData$activeBo2.rawBobject) !== null && _bobjectData$activeBo !== void 0 ? _bobjectData$activeBo : bobjectData === null || bobjectData === void 0 ? void 0 : (_bobjectData$activeBo3 = bobjectData.activeBobject) === null || _bobjectData$activeBo3 === void 0 ? void 0 : (_bobjectData$activeBo4 = _bobjectData$activeBo3.raw) === null || _bobjectData$activeBo4 === void 0 ? void 0 : _bobjectData$activeBo4.contents;
  var companyRawBobject = (_bobjectData$company$ = bobjectData === null || bobjectData === void 0 ? void 0 : (_bobjectData$company = bobjectData.company) === null || _bobjectData$company === void 0 ? void 0 : _bobjectData$company.rawBobject) !== null && _bobjectData$company$ !== void 0 ? _bobjectData$company$ : bobjectData === null || bobjectData === void 0 ? void 0 : (_bobjectData$company2 = bobjectData.company) === null || _bobjectData$company2 === void 0 ? void 0 : (_bobjectData$company3 = _bobjectData$company2.raw) === null || _bobjectData$company3 === void 0 ? void 0 : _bobjectData$company3.contents;
  var activeBobjectType = bobjectData === null || bobjectData === void 0 ? void 0 : (_bobjectData$activeBo5 = bobjectData.activeBobject) === null || _bobjectData$activeBo5 === void 0 ? void 0 : (_bobjectData$activeBo6 = _bobjectData$activeBo5.id) === null || _bobjectData$activeBo6 === void 0 ? void 0 : _bobjectData$activeBo6.typeName;
  var _useSWR2 = useSWR(['/messaging/segmentations', stage], fetchSegmentations),
    segmentations = _useSWR2.data;
  var _useFieldsData = useFieldsData(),
    getFieldValuesById = _useFieldsData.getFieldValuesById;
  var segmentationFields = useMemo(function () {
    return segmentations === null || segmentations === void 0 ? void 0 : segmentations.reduce(function (acc, segmentation) {
      var bobjectFieldId = segmentation.bobjectFieldId,
        segmentationBobjectType = segmentation.bobjectType;
      var field = getFieldValuesById(bobjectFieldId, segmentationBobjectType);
      if (activeBobjectType === BobjectTypes.Lead && !field) field = getFieldValuesById(bobjectFieldId, BobjectTypes.Company) || getFieldValuesById(bobjectFieldId, BobjectTypes.Opportunity);
      if (field) return _objectSpread$a(_objectSpread$a({}, acc), {}, _defineProperty$c({}, segmentation.stage, [].concat(_toConsumableArray$3(acc[segmentation.stage]), [field])));
      return acc;
    }, _defineProperty$c(_defineProperty$c({}, TemplateStage.Prospecting, []), TemplateStage.Sales, []));
  }, [segmentations]);
  var activeBobjectSegmentationValues = useMemo(function () {
    var activeSegmentationValues = {};
    [TemplateStage.Prospecting, TemplateStage.Sales].forEach(function (stage) {
      var _segmentationFields$s;
      segmentationFields === null || segmentationFields === void 0 ? void 0 : (_segmentationFields$s = segmentationFields[stage]) === null || _segmentationFields$s === void 0 ? void 0 : _segmentationFields$s.map(function (field) {
        var fieldValue = activeBobjectType === BobjectTypes.Lead ? (activeRawBobject === null || activeRawBobject === void 0 ? void 0 : activeRawBobject[field === null || field === void 0 ? void 0 : field.id]) || (companyRawBobject === null || companyRawBobject === void 0 ? void 0 : companyRawBobject[field === null || field === void 0 ? void 0 : field.id]) : activeRawBobject === null || activeRawBobject === void 0 ? void 0 : activeRawBobject[field === null || field === void 0 ? void 0 : field.id];
        if (fieldValue) activeSegmentationValues = _objectSpread$a(_objectSpread$a({}, activeSegmentationValues), _defineProperty$c({}, field.id, [fieldValue]));
      }, {});
    });
    return activeSegmentationValues;
  }, [bobjectData === null || bobjectData === void 0 ? void 0 : (_bobjectData$activeBo7 = bobjectData.activeBobject) === null || _bobjectData$activeBo7 === void 0 ? void 0 : (_bobjectData$activeBo8 = _bobjectData$activeBo7.id) === null || _bobjectData$activeBo8 === void 0 ? void 0 : _bobjectData$activeBo8.value, !!companyRawBobject, segmentationFields]);
  return {
    segmentationFields: segmentationFields,
    activeBobjectSegmentationValues: activeBobjectSegmentationValues
  };
};

function _slicedToArray$d(arr, i) { return _arrayWithHoles$e(arr) || _iterableToArrayLimit$d(arr, i) || _unsupportedIterableToArray$e(arr, i) || _nonIterableRest$e(); }
function _nonIterableRest$e() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$e(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$e(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$e(o, minLen); }
function _arrayLikeToArray$e(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$d(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$e(arr) { if (Array.isArray(arr)) return arr; }
var previousUrlAtom = atom({
  key: 'previousUrlAtom',
  "default": ''
});
var usePreviousUrl = function usePreviousUrl() {
  var _useRecoilState = useRecoilState(previousUrlAtom),
    _useRecoilState2 = _slicedToArray$d(_useRecoilState, 2),
    previousUrl = _useRecoilState2[0],
    setPreviousUrl = _useRecoilState2[1];
  var getPreviousUrl = function getPreviousUrl() {
    return previousUrl;
  };
  var resetPreviousUrl = function resetPreviousUrl() {
    setPreviousUrl('');
  };
  return {
    previousUrl: previousUrl,
    getPreviousUrl: getPreviousUrl,
    resetPreviousUrl: resetPreviousUrl,
    setPreviousUrl: setPreviousUrl
  };
};

function _typeof$c(obj) { "@babel/helpers - typeof"; return _typeof$c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$c(obj); }
function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$9(Object(source), !0).forEach(function (key) { _defineProperty$b(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$b(obj, key, value) { key = _toPropertyKey$b(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$b(arg) { var key = _toPrimitive$b(arg, "string"); return _typeof$c(key) === "symbol" ? key : String(key); }
function _toPrimitive$b(input, hint) { if (_typeof$c(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$c(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime$3() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$3 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$c(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _toArray(arr) { return _arrayWithHoles$d(arr) || _iterableToArray$3(arr) || _unsupportedIterableToArray$d(arr) || _nonIterableRest$d(); }
function _nonIterableRest$d() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$d(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$d(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$d(o, minLen); }
function _arrayLikeToArray$d(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArray$3(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithHoles$d(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$3(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var fetchQualifyingQuestions = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator$3( /*#__PURE__*/_regeneratorRuntime$3().mark(function _callee(_ref) {
    var _ref3, url, filters, body;
    return _regeneratorRuntime$3().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _ref3 = _toArray(_ref), url = _ref3[0], filters = _ref3.slice(1);
          body = {
            bobjectType: filters[0],
            name: filters[1] || '',
            stage: filters[2],
            enabled: filters[3],
            segmentationValues: JSON.parse(filters[4])
          };
          return _context.abrupt("return", api.post("".concat(url, "?sort=updateDatetime%2Cdesc"), body).then(function (response) {
            return response === null || response === void 0 ? void 0 : response.data;
          }));
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fetchQualifyingQuestions(_x) {
    return _ref2.apply(this, arguments);
  };
}();
function getRequestBody(newQQData) {
  if (Array.isArray(newQQData)) {
    var dataToSave = {};
    newQQData.forEach(function (qq) {
      dataToSave = _objectSpread$9(_objectSpread$9({}, dataToSave), {}, _defineProperty$b({}, qq === null || qq === void 0 ? void 0 : qq.id, qq === null || qq === void 0 ? void 0 : qq.value));
    });
    return dataToSave;
  } else {
    return newQQData;
  }
}
var updateQualifyingQuestionsValue = function updateQualifyingQuestionsValue(bobject, newQQData) {
  var bobjectId = bobject.id.objectId;
  var accountId = bobject.id.accountId;
  var bobjectType = bobject.id.typeName;
  return api.patch("/bobjects/".concat(accountId, "/").concat(bobjectType, "/bulk"), _defineProperty$b({}, bobjectId, getRequestBody(newQQData)));
};
var useQualifyingQuestions = function useQualifyingQuestions() {
  var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var name = filters.name,
    enabled = filters.enabled,
    _filters$stage = filters.stage,
    stage = _filters$stage === void 0 ? TemplateStage.Prospecting : _filters$stage,
    _filters$segmentation = filters.segmentationValues,
    segmentationValues = _filters$segmentation === void 0 ? {} : _filters$segmentation,
    bobjectType = filters.bobjectType;
  var url = '/messaging/qualifyingQuestions/search';
  var _useSWR = useSWR([url, bobjectType, name, stage, enabled, JSON.stringify(segmentationValues)], fetchQualifyingQuestions),
    data = _useSWR.data,
    isValidating = _useSWR.isValidating;
  return {
    qualifyingQuestions: data || [],
    isLoading: isValidating,
    updateQualifyingQuestionsValue: updateQualifyingQuestionsValue
  };
};

function _typeof$b(obj) { "@babel/helpers - typeof"; return _typeof$b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$b(obj); }
function _slicedToArray$c(arr, i) { return _arrayWithHoles$c(arr) || _iterableToArrayLimit$c(arr, i) || _unsupportedIterableToArray$c(arr, i) || _nonIterableRest$c(); }
function _nonIterableRest$c() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$c(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$c(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$c(o, minLen); }
function _arrayLikeToArray$c(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$c(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$c(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$8(Object(source), !0).forEach(function (key) { _defineProperty$a(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$a(obj, key, value) { key = _toPropertyKey$a(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$a(arg) { var key = _toPrimitive$a(arg, "string"); return _typeof$b(key) === "symbol" ? key : String(key); }
function _toPrimitive$a(input, hint) { if (_typeof$b(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$b(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var quickLogModalVisibilityAtom = atom({
  key: 'quickLogModalVisibilityAtom',
  "default": false
});
var modalDataAtom = atom({
  key: 'modalDataAtom',
  "default": null
});
var createCustomActivity = function createCustomActivity(_ref) {
  var accountId = _ref.accountId,
    contents = _ref.contents,
    callback = _ref.callback;
  return api.post("/bobjects/".concat(accountId, "/Activity"), {
    contents: contents,
    params: {}
  }).then(callback);
};
var updateCustomActivity = function updateCustomActivity(_ref2) {
  var _activity$id;
  var activity = _ref2.activity,
    contents = _ref2.contents,
    callback = _ref2.callback;
  return api.patch("/bobjects/".concat(activity === null || activity === void 0 ? void 0 : (_activity$id = activity.id) === null || _activity$id === void 0 ? void 0 : _activity$id.value, "/raw"), {
    contents: contents,
    params: {}
  }).then(callback);
};
var prepareRequestBody = function prepareRequestBody(dataModel, modalData, formValues, userId) {
  var _selectedBobject$id, _dataModel$findFieldB, _selectedBobject$id2, _selectedBobject$id3, _selectedBobject$id4, _selectedBobject$id5, _selectedBobject$id6, _selectedBobject$id7;
  var customTask = modalData.customTask,
    selectedBobject = modalData.selectedBobject;
  var bobjectType = selectedBobject === null || selectedBobject === void 0 ? void 0 : (_selectedBobject$id = selectedBobject.id) === null || _selectedBobject$id === void 0 ? void 0 : _selectedBobject$id.typeName;
  var rawBobject = 'raw' in selectedBobject ? selectedBobject === null || selectedBobject === void 0 ? void 0 : selectedBobject.raw : selectedBobject === null || selectedBobject === void 0 ? void 0 : selectedBobject.rawBobject;
  var customTaskField = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  var companyIdField = dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$findFieldB = dataModel.findFieldByLogicRole(bobjectType === BobjectTypes.Lead ? LEAD_FIELDS_LOGIC_ROLE.COMPANY : OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY)) === null || _dataModel$findFieldB === void 0 ? void 0 : _dataModel$findFieldB.id;
  return _objectSpread$8(_objectSpread$8(_objectSpread$8(_objectSpread$8(_objectSpread$8({}, formValues ? formValues : {}), (selectedBobject === null || selectedBobject === void 0 ? void 0 : (_selectedBobject$id2 = selectedBobject.id) === null || _selectedBobject$id2 === void 0 ? void 0 : _selectedBobject$id2.typeName) === BobjectTypes.Company && _defineProperty$a({}, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY, selectedBobject === null || selectedBobject === void 0 ? void 0 : (_selectedBobject$id3 = selectedBobject.id) === null || _selectedBobject$id3 === void 0 ? void 0 : _selectedBobject$id3.value)), (selectedBobject === null || selectedBobject === void 0 ? void 0 : (_selectedBobject$id4 = selectedBobject.id) === null || _selectedBobject$id4 === void 0 ? void 0 : _selectedBobject$id4.typeName) === BobjectTypes.Opportunity && _defineProperty$a(_defineProperty$a({}, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY, selectedBobject === null || selectedBobject === void 0 ? void 0 : (_selectedBobject$id5 = selectedBobject.id) === null || _selectedBobject$id5 === void 0 ? void 0 : _selectedBobject$id5.value), ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY, rawBobject === null || rawBobject === void 0 ? void 0 : rawBobject[companyIdField])), (selectedBobject === null || selectedBobject === void 0 ? void 0 : (_selectedBobject$id6 = selectedBobject.id) === null || _selectedBobject$id6 === void 0 ? void 0 : _selectedBobject$id6.typeName) === BobjectTypes.Lead && _defineProperty$a(_defineProperty$a({}, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD, selectedBobject === null || selectedBobject === void 0 ? void 0 : (_selectedBobject$id7 = selectedBobject.id) === null || _selectedBobject$id7 === void 0 ? void 0 : _selectedBobject$id7.value), ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY, rawBobject === null || rawBobject === void 0 ? void 0 : rawBobject[companyIdField])), {}, _defineProperty$a(_defineProperty$a(_defineProperty$a({}, customTaskField.id, customTask === null || customTask === void 0 ? void 0 : customTask.id), ACTIVITY_FIELDS_LOGIC_ROLE.TYPE, ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK), ACTIVITY_FIELDS_LOGIC_ROLE.USER, userId));
};
var useQuickLogActivity = function useQuickLogActivity() {
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'quickLogModal.toasts'
    }),
    t = _useTranslation.t;
  var dataModel = useDataModel();
  var accountId = dataModel === null || dataModel === void 0 ? void 0 : dataModel.getAccountId();
  var userId = useActiveUserId();
  var _useRecoilState = useRecoilState(modalDataAtom),
    _useRecoilState2 = _slicedToArray$c(_useRecoilState, 2),
    modalData = _useRecoilState2[0],
    setModalData = _useRecoilState2[1];
  var _useRecoilState3 = useRecoilState(quickLogModalVisibilityAtom),
    _useRecoilState4 = _slicedToArray$c(_useRecoilState3, 2),
    isOpen = _useRecoilState4[0],
    setIsOpen = _useRecoilState4[1];
  var checkForMandatoryFields = function checkForMandatoryFields(customTask) {
    var fields = customTask === null || customTask === void 0 ? void 0 : customTask.fields.filter(function (f) {
      return f.required;
    });
    return (fields === null || fields === void 0 ? void 0 : fields.length) > 0;
  };
  var fillWithLeads = function fillWithLeads(modalData) {
    var _modalData$leads;
    if (modalData !== null && modalData !== void 0 && modalData.companyId && (modalData === null || modalData === void 0 ? void 0 : (_modalData$leads = modalData.leads) === null || _modalData$leads === void 0 ? void 0 : _modalData$leads.length) === 0) {
      return fetchLeadsByRelatedBobject(BobjectTypes.Company, modalData.companyId, modalData.companyId.split('/')[0]);
    } else {
      return Promise.resolve(modalData === null || modalData === void 0 ? void 0 : modalData.leads);
    }
  };
  var logCustomActivity = function logCustomActivity(modalData, formValues, _callback) {
    var forceLogRequest = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var hasMandatoryFields = checkForMandatoryFields(modalData.customTask);
    var customTask = modalData.customTask,
      onSubmit = modalData.onSubmit;
    if (hasMandatoryFields && !forceLogRequest) {
      openQuickLogModal(modalData);
    } else {
      var contents = prepareRequestBody(dataModel, modalData, formValues, userId);
      createCustomActivity({
        accountId: accountId,
        contents: contents,
        callback: function callback() {
          createToast({
            message: t('successLog', {
              name: customTask !== null && customTask !== void 0 && customTask.name ? customTask === null || customTask === void 0 ? void 0 : customTask.name : ''
            }),
            type: 'info'
          });
          window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: {
              type: BobjectTypes.Activity
            }
          }));
          _callback === null || _callback === void 0 ? void 0 : _callback();
          onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit();
          closeQuickLogModal();
        }
      });
    }
  };
  var editCustomActivity = function editCustomActivity(activity, modalData, formValues, _callback2) {
    var customTask = modalData.customTask,
      onSubmit = modalData.onSubmit;
    var contents = prepareRequestBody(dataModel, modalData, formValues, userId);
    updateCustomActivity({
      activity: activity,
      contents: contents,
      callback: function callback() {
        createToast({
          message: t('successUpdate', {
            name: customTask !== null && customTask !== void 0 && customTask.name ? customTask === null || customTask === void 0 ? void 0 : customTask.name : ''
          }),
          type: 'info'
        });
        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: {
            type: BobjectTypes.Activity
          }
        }));
        onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit();
        _callback2 === null || _callback2 === void 0 ? void 0 : _callback2();
      }
    });
  };
  var openQuickLogModal = function openQuickLogModal(modalData) {
    fillWithLeads(modalData).then(function (res) {
      var _res$data;
      setModalData(_objectSpread$8(_objectSpread$8({}, modalData), {}, {
        leads: res !== null && res !== void 0 && (_res$data = res.data) !== null && _res$data !== void 0 && _res$data.contents ? res.data.contents : res
      }));
    });
    setIsOpen(true);
  };
  var closeQuickLogModal = function closeQuickLogModal() {
    var _modalData$onClose;
    modalData === null || modalData === void 0 ? void 0 : (_modalData$onClose = modalData.onClose) === null || _modalData$onClose === void 0 ? void 0 : _modalData$onClose.call(modalData);
    setModalData(null);
    setIsOpen(false);
  };
  return {
    modalData: modalData,
    isOpen: isOpen,
    logCustomActivity: logCustomActivity,
    editCustomActivity: editCustomActivity,
    openQuickLogModal: openQuickLogModal,
    closeQuickLogModal: closeQuickLogModal,
    dataModel: dataModel
  };
};

function _slicedToArray$b(arr, i) { return _arrayWithHoles$b(arr) || _iterableToArrayLimit$b(arr, i) || _unsupportedIterableToArray$b(arr, i) || _nonIterableRest$b(); }
function _nonIterableRest$b() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$b(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$b(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$b(o, minLen); }
function _arrayLikeToArray$b(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$b(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$b(arr) { if (Array.isArray(arr)) return arr; }
var useRawActiveAccountId = function useRawActiveAccountId() {
  var _useState = useState(''),
    _useState2 = _slicedToArray$b(_useState, 2),
    accountId = _useState2[0],
    setAccountId = _useState2[1];
  useEffect(function () {
    var _getAccountId;
    (_getAccountId = getAccountId()) === null || _getAccountId === void 0 ? void 0 : _getAccountId.then(function (id) {
      return setAccountId(id);
    });
  }, []);
  return accountId;
};
var useRawAccountSettings = function useRawAccountSettings() {
  var accountId = useRawActiveAccountId();
  var isLoggedIn = !!accountId;
  var _useSWRImmutable = useSWRImmutable(isLoggedIn ? '/utils/service/accounts/settings' : null, function () {
      return api.get('/utils/service/accounts/settings').then(function (res) {
        return res.data;
      });
    }),
    settings = _useSWRImmutable.data;
  var getRawAccountSetting = function getRawAccountSetting(setting) {
    return settings ? settings[setting] : false;
  };
  return {
    getRawAccountSetting: getRawAccountSetting,
    settings: settings,
    isLoading: !settings
  };
};

function _typeof$a(obj) { "@babel/helpers - typeof"; return _typeof$a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$a(obj); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _slicedToArray$a(arr, i) { return _arrayWithHoles$a(arr) || _iterableToArrayLimit$a(arr, i) || _unsupportedIterableToArray$a(arr, i) || _nonIterableRest$a(); }
function _nonIterableRest$a() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$a(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$a(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$a(o, minLen); }
function _arrayLikeToArray$a(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$a(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$a(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) { _defineProperty$9(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$9(obj, key, value) { key = _toPropertyKey$9(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$9(arg) { var key = _toPrimitive$9(arg, "string"); return _typeof$a(key) === "symbol" ? key : String(key); }
function _toPrimitive$9(input, hint) { if (_typeof$a(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$a(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var REMINDERS_KEY = function REMINDERS_KEY(accountId) {
  return "bb-app-".concat(accountId, "-reminders");
};
var storedReminders = JSON.parse(localStorage.getItem(REMINDERS_KEY(sessionStorage.getItem('accountId'))));
var checkForString = function checkForString(string) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return string ? prefix + string : '';
};
function getRelatedBobjectInfo(task, isLeadBased) {
  var _getFieldByLogicRole, _getFieldByLogicRole2, _getFieldByLogicRole3;
  var relatedCompany = (_getFieldByLogicRole = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.referencedBobject;
  var relatedLead = (_getFieldByLogicRole2 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)) === null || _getFieldByLogicRole2 === void 0 ? void 0 : _getFieldByLogicRole2.referencedBobject;
  var relatedOpportunity = (_getFieldByLogicRole3 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE === null || TASK_FIELDS_LOGIC_ROLE === void 0 ? void 0 : TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)) === null || _getFieldByLogicRole3 === void 0 ? void 0 : _getFieldByLogicRole3.referencedBobject;
  var leadName = getTextFromLogicRole(relatedLead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  var companyName = getTextFromLogicRole(relatedCompany, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  var opportunityName = getTextFromLogicRole(relatedOpportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME);
  var referenceString = checkForString(leadName) + (isLeadBased ? '' : checkForString(companyName, leadName ? ' from ' : '')) + checkForString(opportunityName, ' in ');
  var getMainBobject = function getMainBobject() {
    if (relatedOpportunity) return relatedOpportunity;
    if (relatedLead) return relatedLead;
    if (relatedCompany) return relatedCompany;
    return {
      id: {
        value: null
      }
    };
  };
  var mainBobject = getMainBobject();
  return {
    bobjectId: mainBobject.id.value,
    referenceString: referenceString
  };
}
var updateReminders = function updateReminders(reminderIds, accountId) {
  try {
    return localStorage.setItem(REMINDERS_KEY(accountId), JSON.stringify(reminderIds));
  } catch (e) {
    return null;
  }
};
var remindersStateAtom = atom({
  key: 'remindersNotNotified',
  "default": storedReminders
});
var useReminders = function useReminders(_ref) {
  var _useActiveUserSetting, _useActiveUserSetting2;
  var setViewBobjectId = _ref.setViewBobjectId;
  var language = (_useActiveUserSetting = useActiveUserSettings()) === null || _useActiveUserSetting === void 0 ? void 0 : (_useActiveUserSetting2 = _useActiveUserSetting.settings) === null || _useActiveUserSetting2 === void 0 ? void 0 : _useActiveUserSetting2.user.language;
  var isLeadBased = useIsPersonAccountAsAccount();
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var settings = useUserSettings();
  var accountId = settings === null || settings === void 0 ? void 0 : settings.account.id;
  var userSettings = _objectSpread$7({}, settings === null || settings === void 0 ? void 0 : settings.user);
  var _useRecoilState = useRecoilState(remindersStateAtom),
    _useRecoilState2 = _slicedToArray$a(_useRecoilState, 2),
    remindersState = _useRecoilState2[0],
    setRemindersState = _useRecoilState2[1];
  var setSeenReminder = function setSeenReminder(taskId, scheduledDateTime) {
    var alreadyStored = _objectSpread$7({}, remindersState) || {};
    var alreadyShownReminder = !!alreadyStored && alreadyStored[taskId];
    if (!alreadyShownReminder) {
      alreadyStored[taskId] = scheduledDateTime;
      setRemindersState(alreadyStored);
      updateReminders(alreadyStored, accountId);
    }
  };
  var setEditedReminder = function setEditedReminder(taskId) {
    var alreadyStored = remindersState || {};
    var alreadyShownReminder = !!alreadyStored[taskId];
    if (alreadyShownReminder) {
      alreadyStored[taskId];
        var newReminders = _objectWithoutProperties(alreadyStored, [taskId].map(_toPropertyKey$9));
      setRemindersState(newReminders);
      updateReminders(newReminders, accountId);
    }
  };
  var removeOldTasksFromLocalStorage = function removeOldTasksFromLocalStorage() {
    var alreadyStored = _objectSpread$7({}, storedReminders);
    if (Object.keys(alreadyStored).length > 0) {
      Object.keys(alreadyStored).forEach(function (taskId) {
        var taskScheduledDateTime = new Date(alreadyStored[taskId]).getTime();
        var currentDateTime = new Date().getTime();
        if (taskScheduledDateTime < currentDateTime) {
          delete alreadyStored[taskId];
        }
      });
      updateReminders(alreadyStored, accountId);
    }
  };
  var fetchTasks = function fetchTasks() {
    var _settings$account;
    return api.post("/bobjects/".concat((_settings$account = settings.account) === null || _settings$account === void 0 ? void 0 : _settings$account.id, "/Task/search"), {
      injectReferences: true,
      query: _defineProperty$9(_defineProperty$9(_defineProperty$9(_defineProperty$9({
        TASK__TASK_TYPE: [TASK_TYPE.NEXT_STEP, TASK_TYPE.PROSPECT_CADENCE]
      }, TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL, ['__MATCH_EMPTY_ROWS__', TASK_ACTION_VALUE.AUTOMATED_EMAIL_NO]), "TASK__SCHEDULED_DATETIME", {
        query: {
          gte: spacetime().startOf('minute').format('iso-utc'),
          lte: spacetime().add(userSettings === null || userSettings === void 0 ? void 0 : userSettings.remindersBeforeMinutes, 'minutes').endOf('minute').format('iso-utc')
        },
        searchMode: 'RANGE__SEARCH'
      }), "TASK__STATUS", [TASK_STATUS_VALUE_LOGIC_ROLE.TODO]), "TASK__ASSIGNED_TO", [userSettings.id]),
      columns: [TASK_FIELDS_LOGIC_ROLE.COMPANY, TASK_FIELDS_LOGIC_ROLE.LEAD, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, TASK_FIELDS_LOGIC_ROLE.TITLE, TASK_FIELDS_LOGIC_ROLE.STATUS, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE, TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL, TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO],
      referencedColumns: [COMPANY_FIELDS_LOGIC_ROLE.NAME, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME],
      formFields: true,
      pageSize: 10
    });
  };
  var _useSWR = useSWR(userSettings && userSettings.remindersBeforeMinutes ? '/tasks/taskReminders' : null, fetchTasks, {
      refreshInterval: 60000
    }),
    data = _useSWR.data;
  useEffect(function () {
    if (data && userSettings !== null && userSettings !== void 0 && userSettings.remindersEnabled) {
      var _referencedData$conte;
      var referencedData = injectReferencesSearchProcess(data.data);
      var notNotifiedTasks = (_referencedData$conte = referencedData.contents) === null || _referencedData$conte === void 0 ? void 0 : _referencedData$conte.filter(function (task) {
        return remindersState ? !Object.keys(remindersState).includes(task.id.value) : true;
      });
      notNotifiedTasks === null || notNotifiedTasks === void 0 ? void 0 : notNotifiedTasks.forEach(function (task) {
        var _getI18nSpacetimeLng$;
        var relatedBobjectInfo = getRelatedBobjectInfo(task, isLeadBased);
        var scheduledDateTime = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
        var preciseDifference = (_getI18nSpacetimeLng$ = getI18nSpacetimeLng(language, spacetime().startOf('minute')).since(getI18nSpacetimeLng(language, spacetime(scheduledDateTime).startOf('minute')))) === null || _getI18nSpacetimeLng$ === void 0 ? void 0 : _getI18nSpacetimeLng$.precise;
        createToast({
          message: "Task due ".concat(preciseDifference !== null && preciseDifference !== void 0 ? preciseDifference : 'now: ', " ").concat(getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TITLE)),
          subtitle: relatedBobjectInfo.referenceString,
          duration: 50000,
          type: 'reminder',
          onClick: function onClick() {
            setViewBobjectId === null || setViewBobjectId === void 0 ? void 0 : setViewBobjectId(relatedBobjectInfo.bobjectId);
          },
          sound: userSettings !== null && userSettings !== void 0 && userSettings.remindersSoundEnabled ? 'https://d38iwn7uw3305n.cloudfront.net/notification.mp3' : null
        });
        setSeenReminder(task.id.value, scheduledDateTime);
      });
      removeOldTasksFromLocalStorage();
    }
  }, [data]);
  return {
    setEditedReminder: setEditedReminder
  };
};

function _typeof$9(obj) { "@babel/helpers - typeof"; return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$9(obj); }
function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty$8(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$8(obj, key, value) { key = _toPropertyKey$8(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$8(arg) { var key = _toPrimitive$8(arg, "string"); return _typeof$9(key) === "symbol" ? key : String(key); }
function _toPrimitive$8(input, hint) { if (_typeof$9(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$9(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function useRouter() {
  var params = useParams();
  var location = useLocation();
  var history = useHistory();
  var match = useRouteMatch();
  var _usePreviousUrl = usePreviousUrl(),
    setPreviousUrl = _usePreviousUrl.setPreviousUrl;
  var customHistoryPush = function customHistoryPush(path, options) {
    var _pathToUse, _options$event, _options$event2, _options$event3, _options$event4;
    var pathToUse = path;
    if (isLeadPage(path) || isLeadWithoutCompanyPage(path) || isCompanyPage(path) || isOpportunityPage(path)) {
      pathToUse = constructMixpanelCustomRoute(path);
    }
    mixpanel.track("REDIRECTED_TO_".concat(typeof pathToUse === 'string' ? pathToUse : (_pathToUse = pathToUse) === null || _pathToUse === void 0 ? void 0 : _pathToUse.pathname), {
      'In new tab': (options === null || options === void 0 ? void 0 : options.event) && ((options === null || options === void 0 ? void 0 : (_options$event = options.event) === null || _options$event === void 0 ? void 0 : _options$event.ctrlKey) || (options === null || options === void 0 ? void 0 : (_options$event2 = options.event) === null || _options$event2 === void 0 ? void 0 : _options$event2.metaKey))
    });
    if (options !== null && options !== void 0 && options.event && (options !== null && options !== void 0 && (_options$event3 = options.event) !== null && _options$event3 !== void 0 && _options$event3.ctrlKey || options !== null && options !== void 0 && (_options$event4 = options.event) !== null && _options$event4 !== void 0 && _options$event4.metaKey)) {
      window.open(path, '_blank');
    } else {
      setPreviousUrl(location.pathname + location.search);
      history.push(path, options === null || options === void 0 ? void 0 : options.state);
    }
  };
  var customHistoryReplace = function customHistoryReplace(path, state) {
    setPreviousUrl(location.pathname + location.search);
    history.replace(path, state);
  };

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(function () {
    return {
      push: customHistoryPush,
      replace: customHistoryReplace,
      pathname: location.pathname,
      query: _objectSpread$6(_objectSpread$6({}, queryString.parse(location.search)), params),
      match: match,
      location: location,
      history: _objectSpread$6(_objectSpread$6({}, history), {}, {
        push: customHistoryPush,
        replace: customHistoryReplace
      })
    };
  }, [params, match, location, history]);
}

function _typeof$8(obj) { "@babel/helpers - typeof"; return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$8(obj); }
function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty$7(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$7(obj, key, value) { key = _toPropertyKey$7(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$7(arg) { var key = _toPrimitive$7(arg, "string"); return _typeof$8(key) === "symbol" ? key : String(key); }
function _toPrimitive$7(input, hint) { if (_typeof$8(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$8(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var useSalesforceDataModel = function useSalesforceDataModel() {
  var _useSWR = useSWR('/utils/service/sfdcdatamodel', function (key) {
      return api.get(key).then(function (data) {
        return data === null || data === void 0 ? void 0 : data.data;
      });
    }, {
      revalidateOnFocus: false
    }),
    data = _useSWR.data,
    mutate = _useSWR.mutate;
  return _objectSpread$5(_objectSpread$5({}, data), {}, {
    mutate: mutate
  });
};

var useSearchBobjects = function useSearchBobjects(_ref) {
  var _response$data, _response$data2;
  var searchValue = _ref.searchValue,
    accountId = _ref.accountId,
    callback = _ref.callback,
    _ref$numberOfResults = _ref.numberOfResults,
    numberOfResults = _ref$numberOfResults === void 0 ? 20 : _ref$numberOfResults,
    _ref$bobjectTypes = _ref.bobjectTypes,
    bobjectTypes = _ref$bobjectTypes === void 0 ? ['Company', 'Lead', 'Opportunity'] : _ref$bobjectTypes;
  var _useSWR = useSWR(searchValue && searchValue !== '' ? ['bobjectSelector', searchValue] : null, function () {
      return api.post("/bobjects/".concat(accountId, "/global-search"), {
        query: searchValue,
        bobjectTypes: bobjectTypes,
        numberOfResults: numberOfResults
      }).then(function (response) {
        callback === null || callback === void 0 ? void 0 : callback();
        return response;
      });
    }, {
      use: [keepPreviousResponse]
    }),
    response = _useSWR.data;
  var results = response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.results;
  var totalMatching = response === null || response === void 0 ? void 0 : (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.totalMatching;
  return {
    results: results,
    totalMatching: totalMatching,
    response: response
  };
};

function _toConsumableArray$2(arr) { return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$9(arr) || _nonIterableSpread$2(); }
function _nonIterableSpread$2() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray$2(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$2(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$9(arr); }
function _slicedToArray$9(arr, i) { return _arrayWithHoles$9(arr) || _iterableToArrayLimit$9(arr, i) || _unsupportedIterableToArray$9(arr, i) || _nonIterableRest$9(); }
function _nonIterableRest$9() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$9(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$9(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$9(o, minLen); }
function _arrayLikeToArray$9(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$9(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$9(arr) { if (Array.isArray(arr)) return arr; }
var selectedItemsAtom = atom({
  key: 'selectedItemsAtom',
  "default": []
});
var checkSelectedAllAtom = atom({
  key: 'checkSelectedAllAtom',
  "default": false
});
var initialItemsAtom = atom({
  key: 'initialSelectedItems',
  "default": []
});
var useSelectAll = function useSelectAll() {
  var _useRecoilState = useRecoilState(selectedItemsAtom),
    _useRecoilState2 = _slicedToArray$9(_useRecoilState, 2),
    selectedItems = _useRecoilState2[0],
    setSelectedItems = _useRecoilState2[1];
  var _useRecoilState3 = useRecoilState(checkSelectedAllAtom),
    _useRecoilState4 = _slicedToArray$9(_useRecoilState3, 2),
    checkSelectedAll = _useRecoilState4[0],
    setCheckSelectedAll = _useRecoilState4[1];
  var _useRecoilState5 = useRecoilState(initialItemsAtom),
    _useRecoilState6 = _slicedToArray$9(_useRecoilState5, 2),
    initialItems = _useRecoilState6[0],
    setInitialItems = _useRecoilState6[1];
  var resetSelectedItems = useResetRecoilState(selectedItemsAtom);
  var resetCheckSelectedAll = useResetRecoilState(checkSelectedAllAtom);
  var resetIntialItems = useResetRecoilState(initialItemsAtom);
  var selectOneItem = function selectOneItem(item) {
    var exists = selectedItems.some(function (selectedItem) {
      return (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.id.objectId) === (item === null || item === void 0 ? void 0 : item.id.objectId);
    });
    var newSelectedItems = _toConsumableArray$2(selectedItems);
    if (exists) {
      newSelectedItems = newSelectedItems.filter(function (selectedItem) {
        return (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.id.objectId) !== (item === null || item === void 0 ? void 0 : item.id.objectId);
      });
    } else {
      newSelectedItems = [].concat(_toConsumableArray$2(newSelectedItems), [item]);
    }
    setSelectedItems(newSelectedItems);
  };
  return {
    selectedItems: selectedItems,
    selectAllItems: setSelectedItems,
    selectOneItem: selectOneItem,
    isSelectedAll: checkSelectedAll,
    setIsSelectedAll: setCheckSelectedAll,
    resetSelectedItems: resetSelectedItems,
    resetCheckSelectedAll: resetCheckSelectedAll,
    initialItems: initialItems,
    setInitialItems: setInitialItems,
    resetIntialItems: resetIntialItems
  };
};

var useSessionStorage = function useSessionStorage() {
  var get = function get(key) {
    return JSON.parse(sessionStorage.getItem(key));
  };
  var set = function set(key, value) {
    return sessionStorage.setItem(key, JSON.stringify(value));
  };
  var remove = function remove(key, subKey) {
    if (!subKey) {
      sessionStorage.removeItem(key);
    } else {
      var keyStored = get(key);
      if (keyStored) {
        delete keyStored[subKey];
        set(key, keyStored);
      }
    }
  };
  var removeRegexKeys = function removeRegexKeys(regex) {
    for (var key in sessionStorage) {
      if (regex.test(key)) {
        sessionStorage.removeItem(key);
      }
    }
  };
  return {
    stored: sessionStorage,
    get: get,
    set: set,
    remove: remove,
    removeRegexKeys: removeRegexKeys
  };
};

function _typeof$7(obj) { "@babel/helpers - typeof"; return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$7(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$8(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _slicedToArray$8(arr, i) { return _arrayWithHoles$8(arr) || _iterableToArrayLimit$8(arr, i) || _unsupportedIterableToArray$8(arr, i) || _nonIterableRest$8(); }
function _nonIterableRest$8() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit$8(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$8(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty$6(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$6(obj, key, value) { key = _toPropertyKey$6(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$6(arg) { var key = _toPrimitive$6(arg, "string"); return _typeof$7(key) === "symbol" ? key : String(key); }
function _toPrimitive$6(input, hint) { if (_typeof$7(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$7(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$8(arr) || _nonIterableSpread$1(); }
function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$8(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$8(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen); }
function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$8(arr); }
function _arrayLikeToArray$8(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime$2() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$2 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$7(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$2(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var fetchSignatures = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee() {
    return _regeneratorRuntime$2().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return api.get('/messaging/signatures').then(function (res) {
            return res.data;
          });
        case 2:
          return _context.abrupt("return", _context.sent);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fetchSignatures() {
    return _ref.apply(this, arguments);
  };
}();
var fetchAddSignature = function fetchAddSignature(signature) {
  return /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee2(currentData) {
      return _regeneratorRuntime$2().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", [].concat(_toConsumableArray$1(currentData), [signature]));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }();
};
var fetchUpdateSignature = function fetchUpdateSignature(signature) {
  return /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee3(currentData) {
      var response;
      return _regeneratorRuntime$2().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return api.patch("/messaging/signatures/".concat(signature === null || signature === void 0 ? void 0 : signature.id), signature).then(function (res) {
              return res.data;
            });
          case 2:
            response = _context3.sent;
            return _context3.abrupt("return", currentData.map(function (s) {
              return s.id === signature.id ? response : s;
            }));
          case 4:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
};
var fetchDeleteSignature = function fetchDeleteSignature(id, updateConnections) {
  return /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee4(currentData) {
      return _regeneratorRuntime$2().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return api["delete"]("/messaging/signatures/".concat(id));
          case 2:
            updateConnections();
            return _context4.abrupt("return", currentData.filter(function (s) {
              return s.id !== id;
            }));
          case 4:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function (_x3) {
      return _ref4.apply(this, arguments);
    };
  }();
};
var fetchSetAsDefault = function fetchSetAsDefault(id) {
  return /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee5(currentData) {
      return _regeneratorRuntime$2().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return api.patch("/messaging/signatures/".concat(id, "/default")).then(function (res) {
              return res.data;
            });
          case 2:
            return _context5.abrupt("return", currentData.map(function (s) {
              return s.id === id ? _objectSpread$4(_objectSpread$4({}, s), {}, {
                "default": true
              }) : _objectSpread$4(_objectSpread$4({}, s), {}, {
                "default": false
              });
            }));
          case 3:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function (_x4) {
      return _ref5.apply(this, arguments);
    };
  }();
};
var fetchChangeSignatureConnection = function fetchChangeSignatureConnection(id, signatureId, mutate) {
  return /*#__PURE__*/_asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee6() {
    var response;
    return _regeneratorRuntime$2().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return api.patch("/messaging/signatures/nylasUserAccount/".concat(id, "/").concat(signatureId)).then(function (res) {
            return res.data;
          });
        case 2:
          response = _context6.sent;
          mutate();
          return _context6.abrupt("return", response);
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
};

/* const fetchRemoveSignatureConnection = (id: string) => async () => {
  await api.delete(`/messaging/signatures/nylasUserAccount/${id}`);
  return null;
}; */

var fetchSignature = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee7(id, data) {
    var signature;
    return _regeneratorRuntime$2().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          if (!(!data || data.length === 0 || !id)) {
            _context7.next = 2;
            break;
          }
          return _context7.abrupt("return");
        case 2:
          _context7.prev = 2;
          _context7.next = 5;
          return api.get("/messaging/signatures/nylasUserAccount/".concat(id)).then(function (res) {
            return res.data;
          });
        case 5:
          signature = _context7.sent;
          if (!(signature !== null && signature !== void 0 && signature.id)) {
            _context7.next = 10;
            break;
          }
          return _context7.abrupt("return", signature);
        case 10:
          return _context7.abrupt("return", data.find(function (s) {
            return s["default"];
          }));
        case 11:
          _context7.next = 16;
          break;
        case 13:
          _context7.prev = 13;
          _context7.t0 = _context7["catch"](2);
          return _context7.abrupt("return", data.find(function (s) {
            return s["default"];
          }));
        case 16:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[2, 13]]);
  }));
  return function fetchSignature(_x5, _x6) {
    return _ref7.apply(this, arguments);
  };
}();
var useSignatures = function useSignatures(id) {
  var _useState = useState(id),
    _useState2 = _slicedToArray$8(_useState, 2),
    connectionId = _useState2[0],
    setConnectionId = _useState2[1];
  var _useSWR = useSWR('api/signatures', fetchSignatures),
    mutate = _useSWR.mutate,
    data = _useSWR.data,
    isLoading = _useSWR.isLoading;
  var _useSWR2 = useSWR(connectionId && data ? "api/signatures/".concat(connectionId) : null, function () {
      return fetchSignature(connectionId, data);
    }),
    mutateSignature = _useSWR2.mutate,
    signature = _useSWR2.data;
  var _useEmailConnections = useEmailConnections(),
    connections = _useEmailConnections.connections;
  var _useSWRConfig = useSWRConfig(),
    mutateConfig = _useSWRConfig.mutate;
  var addSignature = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee8(signature) {
      var newSignature;
      return _regeneratorRuntime$2().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            if (!data || data.length === 0) {
              signature["default"] = true;
            }
            _context8.next = 3;
            return api.post('/messaging/signatures', signature).then(function (res) {
              return res.data;
            });
          case 3:
            newSignature = _context8.sent;
            mutate(fetchAddSignature(newSignature), {
              optimisticData: [].concat(_toConsumableArray$1(data), [newSignature]),
              populateCache: true,
              revalidate: false
            });
            return _context8.abrupt("return", newSignature);
          case 6:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }));
    return function addSignature(_x7) {
      return _ref8.apply(this, arguments);
    };
  }();
  var updateSignature = function updateSignature(signature) {
    mutate(fetchUpdateSignature(signature), {
      optimisticData: data.map(function (s) {
        return s.id === signature.id ? signature : s;
      }),
      populateCache: true,
      revalidate: false
    });
    return signature;
  };
  var updateConnections = function updateConnections(signature) {
    var signatureConnections = signature.nylasUserAccountId;
    var _iterator = _createForOfIteratorHelper(connections.list),
      _step;
    try {
      var _loop = function _loop() {
        var connection = _step.value;
        var connectionSignature = signatureConnections === null || signatureConnections === void 0 ? void 0 : signatureConnections.find(function (id) {
          return id === connection.id;
        });
        if (connectionSignature) {
          mutateConfig("api/signatures/".concat(connection.id));
        }
      };
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };
  var deleteSignature = function deleteSignature(signature) {
    var id = signature.id;
    var filteredSignatures = data === null || data === void 0 ? void 0 : data.filter(function (s) {
      return s.id !== id;
    });
    mutate(fetchDeleteSignature(id, function () {
      return updateConnections(signature);
    }), {
      optimisticData: filteredSignatures,
      populateCache: true,
      revalidate: false
    });
  };
  var setAsDefault = function setAsDefault(id) {
    mutate(fetchSetAsDefault(id), {
      optimisticData: data.map(function (s) {
        return s.id === id ? _objectSpread$4(_objectSpread$4({}, s), {}, {
          "default": true
        }) : _objectSpread$4(_objectSpread$4({}, s), {}, {
          "default": false
        });
      }),
      populateCache: true,
      revalidate: false
    });
  };
  var getSignatureConnection = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee9(connectionId) {
      return _regeneratorRuntime$2().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            if (connectionId) {
              _context9.next = 2;
              break;
            }
            return _context9.abrupt("return");
          case 2:
            _context9.next = 4;
            return fetchSignature(connectionId, data);
          case 4:
            return _context9.abrupt("return", _context9.sent);
          case 5:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }));
    return function getSignatureConnection(_x8) {
      return _ref9.apply(this, arguments);
    };
  }();
  var changeSignatureConnection = /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee10(idSignature) {
      return _regeneratorRuntime$2().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            if (!(!data || data.length === 0 || !connectionId || !idSignature)) {
              _context10.next = 2;
              break;
            }
            return _context10.abrupt("return");
          case 2:
            mutateSignature(fetchChangeSignatureConnection(connectionId, idSignature, mutate), {
              optimisticData: data.find(function (s) {
                return s.id === idSignature;
              }),
              populateCache: true,
              revalidate: false
            });
          case 3:
          case "end":
            return _context10.stop();
        }
      }, _callee10);
    }));
    return function changeSignatureConnection(_x9) {
      return _ref10.apply(this, arguments);
    };
  }();
  var removeSignatureConnection = /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee11() {
      var defaultSignature;
      return _regeneratorRuntime$2().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            if (!(!data || data.length === 0 || !connectionId)) {
              _context11.next = 2;
              break;
            }
            return _context11.abrupt("return");
          case 2:
            /*     mutateSignature(fetchRemoveSignatureConnection(connectionId), {
              optimisticData: null,
              populateCache: true,
              revalidate: false,
            }); */
            defaultSignature = data.find(function (s) {
              return s["default"];
            });
            mutateSignature(fetchChangeSignatureConnection(connectionId, defaultSignature === null || defaultSignature === void 0 ? void 0 : defaultSignature.id, mutate), {
              optimisticData: defaultSignature,
              populateCache: true,
              revalidate: false
            });
          case 4:
          case "end":
            return _context11.stop();
        }
      }, _callee11);
    }));
    return function removeSignatureConnection() {
      return _ref11.apply(this, arguments);
    };
  }();
  return {
    isLoading: isLoading,
    data: data,
    signature: signature,
    addSignature: addSignature,
    updateSignature: updateSignature,
    deleteSignature: deleteSignature,
    setAsDefault: setAsDefault,
    getSignatureConnection: getSignatureConnection,
    changeSignatureConnection: changeSignatureConnection,
    removeSignatureConnection: removeSignatureConnection,
    setConnectionId: setConnectionId
  };
};

function _typeof$6(obj) { "@babel/helpers - typeof"; return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$6(obj); }
function _slicedToArray$7(arr, i) { return _arrayWithHoles$7(arr) || _iterableToArrayLimit$7(arr, i) || _unsupportedIterableToArray$7(arr, i) || _nonIterableRest$7(); }
function _nonIterableRest$7() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$7(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$7(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen); }
function _arrayLikeToArray$7(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$7(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$7(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty$5(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$5(obj, key, value) { key = _toPropertyKey$5(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$5(arg) { var key = _toPrimitive$5(arg, "string"); return _typeof$6(key) === "symbol" ? key : String(key); }
function _toPrimitive$5(input, hint) { if (_typeof$6(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$6(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var skipTaskModalVisibilityAtom = atom({
  key: 'skipTaskModalVisibilityAtom',
  "default": false
});
var skipTaskAtom = atom({
  key: 'skipTaskAtom',
  "default": null
});
var useSkipModal = function useSkipModal() {
  var _dataModel$getFieldsB, _dataModel$getFieldsB2, _dataModel$getFieldsB3, _dataModel$getFieldsB4, _dataModel$getFieldsB5;
  var dataModel = useDataModel();
  var isRequiredField = dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$getFieldsB = dataModel.getFieldsByBobjectType(BobjectTypes.Task)) === null || _dataModel$getFieldsB === void 0 ? void 0 : (_dataModel$getFieldsB2 = _dataModel$getFieldsB.find(function (datamodelField) {
    return datamodelField.logicRole === TASK_FIELDS_LOGIC_ROLE.SKIPPABLE_REASONS;
  })) === null || _dataModel$getFieldsB2 === void 0 ? void 0 : _dataModel$getFieldsB2.required;
  var skipReasons = dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$getFieldsB3 = dataModel.getFieldsByBobjectType(BobjectTypes.Task)) === null || _dataModel$getFieldsB3 === void 0 ? void 0 : (_dataModel$getFieldsB4 = _dataModel$getFieldsB3.find(function (datamodelField) {
    return datamodelField.logicRole === TASK_FIELDS_LOGIC_ROLE.SKIPPABLE_REASONS;
  })
  //@ts-ignore overview datamodel return types
  ) === null || _dataModel$getFieldsB4 === void 0 ? void 0 : (_dataModel$getFieldsB5 = _dataModel$getFieldsB4.values) === null || _dataModel$getFieldsB5 === void 0 ? void 0 : _dataModel$getFieldsB5.filter(function (value) {
    return value === null || value === void 0 ? void 0 : value.isEnabled;
  });
  var hasSkipReasons = (skipReasons === null || skipReasons === void 0 ? void 0 : skipReasons.length) > 0;
  var skipTask = function skipTask(task, skipReason) {
    var taskId = task.id.value;
    var taskData = _objectSpread$3(_defineProperty$5(_defineProperty$5({}, TASK_FIELDS_LOGIC_ROLE.TASK_IS_SKIPPABLE, TASK_SKIPPABLE_VALUE.YES), TASK_FIELDS_LOGIC_ROLE.STATUS, TASK_STATUS_VALUE_LOGIC_ROLE.REJECTED), skipReason ? _defineProperty$5({}, TASK_FIELDS_LOGIC_ROLE.SKIPPABLE_REASONS, skipReason) : {});
    return api.patch("/bobjects/".concat(taskId, "/raw"), taskData);
  };
  return {
    skipTask: skipTask,
    skipReasons: skipReasons,
    hasSkipReasons: hasSkipReasons,
    isRequiredField: isRequiredField
  };
};
var useOpenSkipTaskModal = function useOpenSkipTaskModal() {
  var dataModel = useDataModel();
  var _useRecoilState = useRecoilState(skipTaskAtom),
    _useRecoilState2 = _slicedToArray$7(_useRecoilState, 2),
    skipInfo = _useRecoilState2[0],
    setSkipInfo = _useRecoilState2[1];
  var _useRecoilState3 = useRecoilState(skipTaskModalVisibilityAtom),
    _useRecoilState4 = _slicedToArray$7(_useRecoilState3, 2),
    skipTaskModalVisibility = _useRecoilState4[0],
    setSkipTaskModalVisibility = _useRecoilState4[1];
  return {
    openSkipTaskModal: function openSkipTaskModal(task, onSave) {
      setSkipInfo({
        task: task,
        onSave: onSave
      });
      setSkipTaskModalVisibility(true);
    },
    isOpen: skipTaskModalVisibility,
    closeSkipTaskModal: function closeSkipTaskModal() {
      setSkipTaskModalVisibility(false);
      setSkipInfo(null);
    },
    task: skipInfo === null || skipInfo === void 0 ? void 0 : skipInfo.task,
    onSave: skipInfo === null || skipInfo === void 0 ? void 0 : skipInfo.onSave,
    dataModel: dataModel
  };
};

function _typeof$5(obj) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$5(obj); }
function _slicedToArray$6(arr, i) { return _arrayWithHoles$6(arr) || _iterableToArrayLimit$6(arr, i) || _unsupportedIterableToArray$6(arr, i) || _nonIterableRest$6(); }
function _nonIterableRest$6() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$6(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$6(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen); }
function _arrayLikeToArray$6(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$6(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$6(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty$4(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$4(obj, key, value) { key = _toPropertyKey$4(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$4(arg) { var key = _toPrimitive$4(arg, "string"); return _typeof$5(key) === "symbol" ? key : String(key); }
function _toPrimitive$4(input, hint) { if (_typeof$5(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$5(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var fetchReasons = function fetchReasons(bobjectType, isInSalesStage, hasNoStatusEnabled) {
  var _useSWR = useSWR(!hasNoStatusEnabled && "/utils/service/view/field/statusReasons/".concat(bobjectType).concat(isInSalesStage ? '?stage=SALES' : ''), function (url) {
      return api.get(url);
    }),
    data = _useSWR.data;
  return data === null || data === void 0 ? void 0 : data.data;
};
var blackListedStatus = [COMPANY_STATUS_LOGIC_ROLE.FINDING_LEADS, COMPANY_STATUS_LOGIC_ROLE.READY_TO_PROSPECT];
var REASON_STATUS;
(function (REASON_STATUS) {
  REASON_STATUS["NURTURING"] = "NURTURING";
  REASON_STATUS["DISCARDED"] = "DISCARDED";
  REASON_STATUS["ON_HOLD"] = "ON HOLD";
})(REASON_STATUS || (REASON_STATUS = {}));
var getOrderingArray = function getOrderingArray(bobjectType, isSalesStage) {
  var orderingEnum;
  switch (bobjectType) {
    case 'Company':
      orderingEnum = isSalesStage ? COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE : AVAILABLE_COMPANY_STATUS_LOGIC_ROLE;
      break;
    case 'Lead':
      orderingEnum = isSalesStage ? LEAD_SALES_STATUS_VALUES_LOGIC_ROLE : LEAD_STATUS_LOGIC_ROLE;
      break;
    case 'Opportunity':
      orderingEnum = OPPORTUNITY_STATUS_LOGIC_ROLE;
      break;
  }
  return Object.values(orderingEnum);
};
function getStatuses(bobjectType, isSales, dataModel, hasNoStatusPlanEnabled, salesforceStatusValues) {
  if (hasNoStatusPlanEnabled) {
    return salesforceStatusValues["".concat(bobjectType.toLowerCase(), "CrmStatusValues")];
  }
  var isOpportunity = bobjectType === 'Opportunity';
  if (isOpportunity) {
    var _dataModel$findValues;
    return sortBy((_dataModel$findValues = dataModel.findValuesByFieldLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS)) === null || _dataModel$findValues === void 0 ? void 0 : _dataModel$findValues.filter(function (status) {
      return status === null || status === void 0 ? void 0 : status.isEnabled;
    }), 'ordering');
  } else {
    var statusOrderingArray = getOrderingArray(bobjectType, isSales);
    var fieldsLogicRoles = FIELDS_LOGIC_ROLE[bobjectType];
    if (!isSales) {
      return dataModel.findValuesByFieldLogicRole(fieldsLogicRoles.STATUS).filter(function (status) {
        return (status === null || status === void 0 ? void 0 : status.isEnabled) && (status === null || status === void 0 ? void 0 : status.logicRole) && !blackListedStatus.includes(status === null || status === void 0 ? void 0 : status.logicRole);
      }).sort(function (a, b) {
        return statusOrderingArray.indexOf(a.logicRole) - statusOrderingArray.indexOf(b.logicRole);
      });
    } else {
      var _dataModel$findValues2;
      return (_dataModel$findValues2 = dataModel.findValuesByFieldLogicRole(fieldsLogicRoles.SALES_STATUS)) === null || _dataModel$findValues2 === void 0 ? void 0 : _dataModel$findValues2.filter(function (status) {
        return status === null || status === void 0 ? void 0 : status.isEnabled;
      }).sort(function (a, b) {
        return statusOrderingArray.indexOf(a.logicRole) - statusOrderingArray.indexOf(b.logicRole);
      });
    }
  }
}
function getAvailableReasons(bobjectType, selectedStatus, reasons) {
  if (!selectedStatus || !reasons) return {
    values: [],
    isRequired: false
  };
  if (bobjectType === 'Opportunity' && reasons.length) {
    var oppReasonsField = reasons.find(function (_ref) {
      var logicRole = _ref.logicRole;
      return logicRole === OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSED_LOST_REASON;
    });
    return {
      values: oppReasonsField.values,
      isRequired: oppReasonsField.required
    };
  }
  var nurturingReasonsField = reasons.find(function (_ref2) {
    var logicRole = _ref2.logicRole;
    return logicRole.includes('NURTURING');
  });
  var discardedReasonsField = reasons.find(function (_ref3) {
    var logicRole = _ref3.logicRole;
    return logicRole.includes('DISCARDED');
  });
  var onHoldReasonsField = reasons.find(function (_ref4) {
    var logicRole = _ref4.logicRole;
    return logicRole.includes('ON_HOLD');
  });
  if (selectedStatus !== null && selectedStatus !== void 0 && selectedStatus.logicRole.includes(REASON_STATUS.NURTURING)) {
    return {
      values: nurturingReasonsField === null || nurturingReasonsField === void 0 ? void 0 : nurturingReasonsField.fieldValues,
      isRequired: nurturingReasonsField === null || nurturingReasonsField === void 0 ? void 0 : nurturingReasonsField.required
    };
  } else if (selectedStatus !== null && selectedStatus !== void 0 && selectedStatus.logicRole.includes(REASON_STATUS.DISCARDED)) {
    return {
      values: discardedReasonsField === null || discardedReasonsField === void 0 ? void 0 : discardedReasonsField.fieldValues,
      isRequired: discardedReasonsField === null || discardedReasonsField === void 0 ? void 0 : discardedReasonsField.required
    };
  } else if (selectedStatus !== null && selectedStatus !== void 0 && selectedStatus.logicRole.includes(REASON_STATUS.ON_HOLD)) {
    return {
      values: onHoldReasonsField === null || onHoldReasonsField === void 0 ? void 0 : onHoldReasonsField.fieldValues,
      isRequired: onHoldReasonsField === null || onHoldReasonsField === void 0 ? void 0 : onHoldReasonsField.required
    };
  } else {
    return {
      values: [],
      isRequired: false
    };
  }
}
function getAvailableUsers(dataModel) {
  var usersField = dataModel.findFieldByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO);
  return {
    values: usersField.values.filter(function (user) {
      return !user.name.includes('- Deleted');
    }),
    isRequired: usersField === null || usersField === void 0 ? void 0 : usersField.required
  };
}
function getStageField(dataModel, bobjectType) {
  if (!dataModel || !bobjectType) {
    return undefined;
  }
  var fieldsByBobjectType = dataModel.getFieldsByBobjectType(bobjectType);
  if (!fieldsByBobjectType) return undefined;
  return fieldsByBobjectType === null || fieldsByBobjectType === void 0 ? void 0 : fieldsByBobjectType.find(function (_ref5) {
    var name = _ref5.name;
    return name.includes('Stage');
  });
}
function getIsSales(dataModel, bobject, bobjectType) {
  var _dataModel$findValueB;
  var stageField = getStageField(dataModel, bobjectType);
  var stage = bobject === null || bobject === void 0 ? void 0 : bobject.rawBobject[stageField === null || stageField === void 0 ? void 0 : stageField.id];
  return ((_dataModel$findValueB = dataModel.findValueById(stage)) === null || _dataModel$findValueB === void 0 ? void 0 : _dataModel$findValueB.name) === 'Sales';
}
var getInitialStatusId = function getInitialStatusId(bobject, isSales, hasNoStatusPlan) {
  if (bobject.fields) {
    if (hasNoStatusPlan) {
      return getValueFromLogicRole(bobject, FIELDS_LOGIC_ROLE[bobject.id.typeName].SALESFORCE_STATUS);
    }
    return isSales ? getValueFromLogicRole(bobject, FIELDS_LOGIC_ROLE[bobject.id.typeName].SALES_STATUS) : getValueFromLogicRole(bobject, FIELDS_LOGIC_ROLE[bobject.id.typeName].STATUS);
  } else {
    var _bobject$id;
    return hasNoStatusPlan ? (bobject === null || bobject === void 0 ? void 0 : bobject.salesforceStatus) || (bobject === null || bobject === void 0 ? void 0 : bobject.salesforceStage) : (bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.typeName) === BobjectTypes$1.Opportunity ? bobject.status : isSales ? bobject.salesStatus : bobject.prospectingStatus;
  }
};
var getInitialStatus = function getInitialStatus(bobject, availableStatuses, isSales, hasNoStatusPlan) {
  var initialStatusId = getInitialStatusId(bobject, isSales, hasNoStatusPlan);
  return availableStatuses.find(function (status) {
    return [status.id, status.name, status.salesforceLabel].includes(initialStatusId);
  });
};
var getInitialReason = function getInitialReason(bobject, availableReasons, initialStatus) {
  if (!initialStatus || !Array.isArray(availableReasons === null || availableReasons === void 0 ? void 0 : availableReasons.values)) return null;
  return availableReasons.values.find(function (_ref6) {
    var reasonId = _ref6.value;
    return Object.values(bobject.rawBobject).includes(reasonId);
  });
};
function forgeRawIfNotPresent(bobject) {
  if (!bobject.rawBobject) {
    bobject.rawBobject = bobject.raw.contents;
  }
  return bobject;
}
//If we need more entities, we can add them here
var handledEntities = {
  companyCrmStatusValues: SALESFORCE_LOGIC_ROLES.SALESFORCE_COMPANY_STATUS,
  leadCrmStatusValues: SALESFORCE_LOGIC_ROLES.SALESFORCE_LEAD_STATUS,
  opportunityCrmStatusValues: SALESFORCE_LOGIC_ROLES.SALESFORCE_OPPORTUNITY_STAGE
};
function parseFields(dataModel, entityLogicRole) {
  var _crmStatusField$value;
  var crmStatusField = dataModel.findFieldByLogicRole(entityLogicRole);
  return (_crmStatusField$value = crmStatusField.values) === null || _crmStatusField$value === void 0 ? void 0 : _crmStatusField$value.filter(function (crmStatus) {
    return crmStatus.isEnabled;
  }).sort(function (a, b) {
    return a.ordering < b.ordering ? -1 : 1;
  });
}
function parseAccountFields(dataModel) {
  return Object.keys(handledEntities).reduce(function (acc, key) {
    acc[key] = parseFields(dataModel, handledEntities[key]);
    return acc;
  }, {});
}
var useSalesforceStatusPicklistValue = function useSalesforceStatusPicklistValue() {
  var dataModel = useDataModel();
  return _objectSpread$2({}, parseAccountFields(dataModel));
};
var useStatus = function useStatus(propBobject) {
  var hasNoStatusPlanEnabled = useIsNoStatusPlanAccount();
  var salesforceStatusValues = useSalesforceStatusPicklistValue();
  var dataModel = useDataModel();
  var bobject = forgeRawIfNotPresent(propBobject);
  var bobjectType = bobject.id.typeName;
  var reasons = fetchReasons(bobjectType, getIsSales(dataModel, bobject, bobjectType), hasNoStatusPlanEnabled);
  var isSales = hasNoStatusPlanEnabled ? false : getIsSales(dataModel, bobject, bobjectType);
  var availableStatuses = getStatuses(bobjectType, isSales, dataModel, hasNoStatusPlanEnabled, salesforceStatusValues);
  var availableUsers = getAvailableUsers(dataModel);
  var initialStatus = getInitialStatus(bobject, availableStatuses, isSales, hasNoStatusPlanEnabled);
  var _useState = useState(initialStatus),
    _useState2 = _slicedToArray$6(_useState, 2),
    selectedStatus = _useState2[0],
    setSelectedStatus = _useState2[1];
  var availableReasons = getAvailableReasons(bobjectType, selectedStatus, reasons);
  var initialReason = getInitialReason(bobject, availableReasons, initialStatus);
  var _useState3 = useState(initialReason),
    _useState4 = _slicedToArray$6(_useState3, 2),
    selectedReason = _useState4[0],
    setSelectedReason = _useState4[1];
  useEffect(function () {
    if (!selectedReason && initialReason) {
      setSelectedReason(initialReason);
    }
  }, [initialReason]);
  useEffect(function () {
    setSelectedStatus(initialStatus);
  }, [propBobject === null || propBobject === void 0 ? void 0 : propBobject.id.value]);
  return {
    selectedReason: selectedReason,
    setSelectedReason: setSelectedReason,
    selectedStatus: selectedStatus,
    setSelectedStatus: setSelectedStatus,
    availableStatuses: availableStatuses,
    availableReasons: availableReasons,
    availableUsers: availableUsers,
    isSales: isSales
  };
};

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$5(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$5(arr); }
function _slicedToArray$5(arr, i) { return _arrayWithHoles$5(arr) || _iterableToArrayLimit$5(arr, i) || _unsupportedIterableToArray$5(arr, i) || _nonIterableRest$5(); }
function _nonIterableRest$5() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$5(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$5(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen); }
function _arrayLikeToArray$5(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$5(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$5(arr) { if (Array.isArray(arr)) return arr; }
var SubhomeContext = /*#__PURE__*/React.createContext(null);
function SubhomePageProvider(_ref) {
  var children = _ref.children,
    parentRef = _ref.parentRef;
  var _useState = useState(false),
    _useState2 = _slicedToArray$5(_useState, 2),
    haveFiltersBeenChanged = _useState2[0],
    setHaveFiltersBeenChanged = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray$5(_useState3, 2),
    selectedItems = _useState4[0],
    setSelectedItems = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray$5(_useState5, 2),
    isSelectAllChecked = _useState6[0],
    setSelectAllCheckedState = _useState6[1];
  var selectOneItem = function selectOneItem(item) {
    var exists = selectedItems.some(function (selectedItem) {
      return (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.id.objectId) === (item === null || item === void 0 ? void 0 : item.id.objectId);
    });
    var newSelectedItems = _toConsumableArray(selectedItems);
    if (exists) {
      newSelectedItems = newSelectedItems.filter(function (selectedItem) {
        return (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.id.objectId) !== (item === null || item === void 0 ? void 0 : item.id.objectId);
      });
    } else {
      newSelectedItems = [].concat(_toConsumableArray(newSelectedItems), [item]);
    }
    setSelectedItems(newSelectedItems);
  };
  return /*#__PURE__*/jsx(SubhomeContext.Provider, {
    value: {
      haveFiltersBeenChanged: haveFiltersBeenChanged,
      setHaveFiltersBeenChanged: setHaveFiltersBeenChanged,
      selectOneItem: selectOneItem,
      selectedItems: selectedItems,
      setSelectedItems: setSelectedItems,
      isSelectAllChecked: isSelectAllChecked,
      toggleSelectAll: function toggleSelectAll(value) {
        setSelectAllCheckedState(value);
      },
      parentRef: parentRef
    },
    children: children
  });
}
function useSubhomeContext() {
  var context = React.useContext(SubhomeContext);
  if (context === undefined) {
    throw new Error('useSubhomeContext must be used within a SubhomeContextProvider');
  }
  return context;
}

function _typeof$4(obj) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$4(obj); }
function _regeneratorRuntime$1() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$1 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$4(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$3(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$1(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(arg) { var key = _toPrimitive$3(arg, "string"); return _typeof$4(key) === "symbol" ? key : String(key); }
function _toPrimitive$3(input, hint) { if (_typeof$4(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$4(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$4(arr, i) { return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$4(); }
function _nonIterableRest$4() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }
function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$4(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$4(arr) { if (Array.isArray(arr)) return arr; }
var TASK_COLUMNS = [TASK_FIELDS_LOGIC_ROLE.TITLE, TASK_FIELDS_LOGIC_ROLE.STATUS, TASK_FIELDS_LOGIC_ROLE.COMPANY, TASK_FIELDS_LOGIC_ROLE.LEAD, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY, TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE, TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED, TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION, TASK_ACTION.CALL, TASK_ACTION.EMAIL, TASK_ACTION.LINKEDIN_MESSAGE, TASK_FIELDS_LOGIC_ROLE.CADENCE, TASK_FIELDS_LOGIC_ROLE.MEETING_ACTIVITY, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK, TASK_FIELDS_LOGIC_ROLE.PRIORITY];
var TASK_REFERENCED_COLUMNS = [COMPANY_FIELDS_LOGIC_ROLE.NAME, COMPANY_FIELDS_LOGIC_ROLE.STATUS, COMPANY_FIELDS_LOGIC_ROLE.SOURCE, COMPANY_FIELDS_LOGIC_ROLE.STAGE, COMPANY_FIELDS_LOGIC_ROLE.LINKEDIN_URL, COMPANY_FIELDS_LOGIC_ROLE.CADENCE, COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY, COMPANY_FIELDS_LOGIC_ROLE.HIGH_PRIORITY, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME, LEAD_FIELDS_LOGIC_ROLE.STATUS, LEAD_FIELDS_LOGIC_ROLE.SOURCE, LEAD_FIELDS_LOGIC_ROLE.STAGE, LEAD_FIELDS_LOGIC_ROLE.CADENCE, LEAD_FIELDS_LOGIC_ROLE.LINKEDIN_URL, LEAD_FIELDS_LOGIC_ROLE.SALES_NAV_URL, LEAD_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY, LEAD_FIELDS_LOGIC_ROLE.HIGH_PRIORITY, ACTIVITY_FIELDS_LOGIC_ROLE.TIME, SALESFORCE.OPPORTUNITY_ID_FIELD, SALESFORCE.CONTACT_ID_FIELD, SALESFORCE.LEAD_ID_FIELD, SALESFORCE.ACCOUNT_ID_FIELD, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME, OPPORTUNITY_FIELDS_LOGIC_ROLE.CADENCE];
var taskTypes$1 = ['PROSPECT_CADENCE', 'CONTACT_BEFORE_MEETING', 'NEXT_STEP', 'SCHEDULED_EMAIL'];
var PAGE_SIZE = 25;
var BASE_SEARCH_REQUEST = {
  formFields: true,
  injectReferences: true
};
var checkIsOverdue = function checkIsOverdue(item) {
  var date = new Date(getValueFromLogicRole(item, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME));
  return startOfDay(new Date(date)) <= subDays(startOfDay(new Date()), 1);
};
var useTasksFeed = function useTasksFeed(activeBobject, contextData, callback, pageSize) {
  var _contextData$opportun, _contextData$opportun2, _contextData$leads, _contextData$leads2, _activeBobject$id, _activeBobject$id2, _activeBobject$id3, _contextData$company, _contextData$company$, _activeBobject$id4, _activeBobject$leads, _activeBobject$id6;
  var _useState = useState(1),
    _useState2 = _slicedToArray$4(_useState, 2),
    page = _useState2[0],
    setPage = _useState2[1];
  var _useTranslation = useTranslation(),
    t = _useTranslation.t,
    i18n = _useTranslation.i18n;
  var fetchNextPage = function fetchNextPage() {
    setPage(page + 1);
  };
  var queries = {
    Company: [(contextData === null || contextData === void 0 ? void 0 : contextData.opportunities) && (contextData === null || contextData === void 0 ? void 0 : (_contextData$opportun = contextData.opportunities) === null || _contextData$opportun === void 0 ? void 0 : _contextData$opportun.length) > 0 && _defineProperty$3({}, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY, contextData === null || contextData === void 0 ? void 0 : (_contextData$opportun2 = contextData.opportunities) === null || _contextData$opportun2 === void 0 ? void 0 : _contextData$opportun2.map(function (opportunity) {
      var _opportunity$id;
      return opportunity === null || opportunity === void 0 ? void 0 : (_opportunity$id = opportunity.id) === null || _opportunity$id === void 0 ? void 0 : _opportunity$id.value;
    })), (contextData === null || contextData === void 0 ? void 0 : contextData.leads) && (contextData === null || contextData === void 0 ? void 0 : (_contextData$leads = contextData.leads) === null || _contextData$leads === void 0 ? void 0 : _contextData$leads.length) > 0 && _defineProperty$3({}, TASK_FIELDS_LOGIC_ROLE.LEAD, contextData === null || contextData === void 0 ? void 0 : (_contextData$leads2 = contextData.leads) === null || _contextData$leads2 === void 0 ? void 0 : _contextData$leads2.map(function (lead) {
      var _lead$id;
      return lead === null || lead === void 0 ? void 0 : (_lead$id = lead.id) === null || _lead$id === void 0 ? void 0 : _lead$id.value;
    })), _defineProperty$3({}, TASK_FIELDS_LOGIC_ROLE.COMPANY, [activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id = activeBobject.id) === null || _activeBobject$id === void 0 ? void 0 : _activeBobject$id.value])],
    Lead: [_defineProperty$3({}, TASK_FIELDS_LOGIC_ROLE.LEAD, [activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id2 = activeBobject.id) === null || _activeBobject$id2 === void 0 ? void 0 : _activeBobject$id2.value]), (contextData === null || contextData === void 0 ? void 0 : contextData.company) && _defineProperty$3(_defineProperty$3({}, TASK_FIELDS_LOGIC_ROLE.LEAD, [activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id3 = activeBobject.id) === null || _activeBobject$id3 === void 0 ? void 0 : _activeBobject$id3.value]), TASK_FIELDS_LOGIC_ROLE.COMPANY, [contextData === null || contextData === void 0 ? void 0 : (_contextData$company = contextData.company) === null || _contextData$company === void 0 ? void 0 : (_contextData$company$ = _contextData$company.id) === null || _contextData$company$ === void 0 ? void 0 : _contextData$company$.value])],
    // TODO: Take also the leads info to fetch the activities
    Opportunity: [_defineProperty$3({}, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY, [activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id4 = activeBobject.id) === null || _activeBobject$id4 === void 0 ? void 0 : _activeBobject$id4.value]), (activeBobject === null || activeBobject === void 0 ? void 0 : activeBobject.leads) && (activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$leads = activeBobject.leads) === null || _activeBobject$leads === void 0 ? void 0 : _activeBobject$leads.length) > 0 && _defineProperty$3({}, TASK_FIELDS_LOGIC_ROLE.LEAD, activeBobject === null || activeBobject === void 0 ? void 0 : activeBobject.leads)]
  };
  var fetchTasks = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee() {
      var _queries$activeBobjec, _activeBobject$id5;
      var query, response, _injectReferencesSear, _response$data, tasks;
      return _regeneratorRuntime$1().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            query = _objectSpread$1({
              //TODO: Add columns in query
              query: _defineProperty$3(_defineProperty$3({}, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE, taskTypes$1), TASK_FIELDS_LOGIC_ROLE.STATUS, [TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE, TASK_STATUS_VALUE_LOGIC_ROLE.TODO]),
              page: 0,
              pageSize: page && !pageSize ? page * PAGE_SIZE : pageSize,
              sort: [{
                field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
                direction: 'ASC'
              }, {
                field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
                direction: 'ASC'
              }],
              queries: (_queries$activeBobjec = queries[activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id5 = activeBobject.id) === null || _activeBobject$id5 === void 0 ? void 0 : _activeBobject$id5.typeName]) === null || _queries$activeBobjec === void 0 ? void 0 : _queries$activeBobjec.filter(function (o) {
                return o;
              }),
              columns: TASK_COLUMNS,
              referencedColumns: TASK_REFERENCED_COLUMNS
            }, BASE_SEARCH_REQUEST);
            _context.t0 = activeBobject.id.accountId;
            if (!_context.t0) {
              _context.next = 6;
              break;
            }
            _context.next = 5;
            return api.post('/bobjects/' + activeBobject.id.accountId + '/Task/search', query);
          case 5:
            _context.t0 = _context.sent;
          case 6:
            response = _context.t0;
            if (!(response !== null && response !== void 0 && response.data)) {
              _context.next = 10;
              break;
            }
            tasks = addTaskDateGrouping((_injectReferencesSear = injectReferencesSearchProcess(response === null || response === void 0 ? void 0 : response.data)) === null || _injectReferencesSear === void 0 ? void 0 : _injectReferencesSear.contents, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, checkIsOverdue, t, i18n.language);
            return _context.abrupt("return", {
              tasks: tasks,
              total: (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.totalMatching
            });
          case 10:
            return _context.abrupt("return", null);
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function fetchTasks() {
      return _ref8.apply(this, arguments);
    };
  }();
  var _useSWR = useSWR(activeBobject && contextData && "/tasksFeed/".concat(activeBobject.id.value, "/").concat(page, "/").concat(pageSize ? pageSize : PAGE_SIZE), fetchTasks, {
      revalidateOnFocus: true,
      use: [keepPreviousResponse]
    }),
    data = _useSWR.data,
    mutate = _useSWR.mutate,
    error = _useSWR.error,
    isValidating = _useSWR.isValidating;
  callback === null || callback === void 0 ? void 0 : callback(activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id6 = activeBobject.id) === null || _activeBobject$id6 === void 0 ? void 0 : _activeBobject$id6.typeName, mutate);
  return {
    tasks: data === null || data === void 0 ? void 0 : data.tasks,
    total: data === null || data === void 0 ? void 0 : data.total,
    error: error,
    mutate: mutate,
    data: data,
    fetchNextPage: fetchNextPage,
    isLoading: isValidating
  };
};

function _typeof$3(obj) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$3(obj); }
function _slicedToArray$3(arr, i) { return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3(); }
function _nonIterableRest$3() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }
function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$3(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$3(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty$2(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(arg) { var key = _toPrimitive$2(arg, "string"); return _typeof$3(key) === "symbol" ? key : String(key); }
function _toPrimitive$2(input, hint) { if (_typeof$3(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$3(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var NEEDED_COLUMNS = [TASK_FIELDS_LOGIC_ROLE.TITLE, TASK_FIELDS_LOGIC_ROLE.STATUS, TASK_FIELDS_LOGIC_ROLE.COMPANY, TASK_FIELDS_LOGIC_ROLE.LEAD, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY, TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE, TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED, TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED_EMAIL, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION, TASK_ACTION.CALL, TASK_ACTION.EMAIL, TASK_ACTION.LINKEDIN_MESSAGE, TASK_FIELDS_LOGIC_ROLE.CADENCE, TASK_FIELDS_LOGIC_ROLE.MEETING_ACTIVITY, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK, TASK_FIELDS_LOGIC_ROLE.PRIORITY, TASK_FIELDS_LOGIC_ROLE.TEMPLATE, TASK_FIELDS_LOGIC_ROLE.SUGGESTED_PITCH, TASK_FIELDS_LOGIC_ROLE.SUGGESTED_LINKEDIN_TEMPLATE, TASK_FIELDS_LOGIC_ROLE.SUGGESTED_WHATSAPP_TEMPLATE];
var isTodayOrOverdue = function isTodayOrOverdue(task) {
  var date = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  return startOfDay(new Date(date)) <= startOfDay(new Date());
};
var taskTypes = ['PROSPECT_CADENCE', 'CUSTOM_TASK', 'SCHEDULED_EMAIL'];
var getQueryDictionary = function getQueryDictionary(bobjectId) {
  if (!bobjectId) return;
  var isCompanyId = bobjectId.includes('Company');
  var isOpportunityId = bobjectId.includes('Opportunity');
  return _objectSpread({
    query: _defineProperty$2(_defineProperty$2({}, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE, taskTypes), TASK_FIELDS_LOGIC_ROLE.STATUS, [TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE, TASK_STATUS_VALUE_LOGIC_ROLE.TODO]),
    columns: NEEDED_COLUMNS,
    page: 0,
    pageSize: 100,
    sort: [{
      field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
      direction: 'ASC'
    }, {
      field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
      direction: 'ASC'
    }],
    queries: [_defineProperty$2({}, TASK_FIELDS_LOGIC_ROLE[isCompanyId ? 'COMPANY' : isOpportunityId ? 'OPPORTUNITY' : 'LEAD'], [bobjectId])]
  }, BASE_SEARCH_REQUEST);
};
var TypeConverter;
(function (TypeConverter) {
  TypeConverter["Pitches"] = "PITCH";
  TypeConverter["Emails"] = "EMAIL";
  TypeConverter["LinkedIn"] = "LINKEDIN_MESSAGE";
  TypeConverter["QualifyingQuestions"] = "QUALIFYING_QUESTION";
  TypeConverter["Snippets"] = "SNIPPET";
  TypeConverter["WhatsApp"] = "WHATSAPP";
})(TypeConverter || (TypeConverter = {}));
var LogicRoleConverter;
(function (LogicRoleConverter) {
  LogicRoleConverter[LogicRoleConverter["Emails"] = TASK_FIELDS_LOGIC_ROLE.TEMPLATE] = "Emails";
  LogicRoleConverter[LogicRoleConverter["Pitches"] = TASK_FIELDS_LOGIC_ROLE.SUGGESTED_PITCH] = "Pitches";
  LogicRoleConverter[LogicRoleConverter["LinkedIn"] = TASK_FIELDS_LOGIC_ROLE.SUGGESTED_LINKEDIN_TEMPLATE] = "LinkedIn";
  LogicRoleConverter[LogicRoleConverter["WhatsApp"] = TASK_FIELDS_LOGIC_ROLE.SUGGESTED_WHATSAPP_TEMPLATE] = "WhatsApp";
})(LogicRoleConverter || (LogicRoleConverter = {}));
function getTemplateId(task, templateType) {
  var logicRole = LogicRoleConverter[templateType];
  return getValueFromLogicRole(task, logicRole);
}
var useSuggestedTemplates = function useSuggestedTemplates(bobject, context, templateType) {
  var _bobject$id;
  var _useState = useState([]),
    _useState2 = _slicedToArray$3(_useState, 2),
    tasks = _useState2[0],
    setTasks = _useState2[1];
  var bobjectId = bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.value;
  useEffect(function () {
    var _bobject$id2;
    //This was previously done with SWR but cadence management broke the functionality, we should monitor the number of requests done
    /*  const { data: { tasks, total } = { tasks: [], total: 0 } } = useSWR(
    bobjectId && `/bobjects/cadenceTasks/${bobjectId}}`,
    () => fetchCadenceTasksByBobject(bobject.id),
    );*/
    if (bobject && bobject !== null && bobject !== void 0 && (_bobject$id2 = bobject.id) !== null && _bobject$id2 !== void 0 && _bobject$id2.accountId) {
      var _bobject$id3;
      api.post('/bobjects/' + (bobject === null || bobject === void 0 ? void 0 : (_bobject$id3 = bobject.id) === null || _bobject$id3 === void 0 ? void 0 : _bobject$id3.accountId) + '/Task/search', getQueryDictionary(bobjectId)).then(function (response) {
        if (response !== null && response !== void 0 && response.data) {
          var _injectReferencesSear;
          var _tasks = (_injectReferencesSear = injectReferencesSearchProcess(response === null || response === void 0 ? void 0 : response.data)) === null || _injectReferencesSear === void 0 ? void 0 : _injectReferencesSear.contents;
          setTasks(_tasks);
        }
      });
    }
  }, [bobjectId]);
  var ids = useMemo(function () {
    return tasks === null || tasks === void 0 ? void 0 : tasks.reduce(function (acc, t) {
      var templateId = getTemplateId(t, templateType);
      if (templateId && isTodayOrOverdue(t)) {
        acc.push({
          id: templateId,
          taskTitle: getValueFromLogicRole(t, TASK_FIELDS_LOGIC_ROLE.TITLE)
        });
      }
      return acc;
    }, []);
  }, [tasks.length]);
  var _useMessagingTemplate = useMessagingTemplates({
      type: TypeConverter[templateType],
      size: 1000,
      page: 0,
      stage: TemplateStage.All,
      name: '',
      visibility: 'PUBLIC',
      segmentationValues: {},
      onlyMine: false,
      onlyOfficials: false,
      onlyBattlecards: false
    }),
    messagingTemplates = _useMessagingTemplate.messagingTemplates;
  return useMemo(function () {
    if (!(messagingTemplates !== null && messagingTemplates !== void 0 && messagingTemplates.length) || !ids || Object.values(ids).length === 0) return [];
    return ids.reduce(function (acc, _ref2) {
      var id = _ref2.id,
        taskTitle = _ref2.taskTitle;
      var matchingTemplate = messagingTemplates === null || messagingTemplates === void 0 ? void 0 : messagingTemplates.find(function (template) {
        return template.id === id;
      });
      if (matchingTemplate) {
        acc.push(_objectSpread(_objectSpread({}, matchingTemplate), {}, {
          taskTitle: taskTitle
        }));
      }
      return acc;
    }, []);
  }, [messagingTemplates === null || messagingTemplates === void 0 ? void 0 : messagingTemplates.length, ids === null || ids === void 0 ? void 0 : ids.length]);
};

var fetch = function fetch(accountId, typeName, bobjectsIds) {
  if (accountId && bobjectsIds.length > 0 && typeName) {
    var response = api.post('/logging/v2/logs/integrations/getSyncStatus', {
      bobjectType: typeName,
      bobjectIdsList: bobjectsIds,
      accountId: accountId,
      integrationType: ['SALESFORCE', 'INBOUND_SALESFORCE']
    }).then(function (res) {
      return res === null || res === void 0 ? void 0 : res.data;
    });
    return response;
  }
};
var useSyncBobjectStatus = function useSyncBobjectStatus(accountId, bobjects) {
  var bobjectsIds = bobjects === null || bobjects === void 0 ? void 0 : bobjects.map(function (bobject) {
    var _bobject$id;
    return bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.objectId;
  });
  var _useSWR = useSWR((bobjectsIds === null || bobjectsIds === void 0 ? void 0 : bobjectsIds.length) > 0 && bobjectsIds[0] && "getSyncStatus/".concat(accountId, "/").concat(hash(bobjectsIds)), function () {
      var _bobjects$, _bobjects$$id;
      return fetch(accountId, bobjects === null || bobjects === void 0 ? void 0 : (_bobjects$ = bobjects[0]) === null || _bobjects$ === void 0 ? void 0 : (_bobjects$$id = _bobjects$.id) === null || _bobjects$$id === void 0 ? void 0 : _bobjects$$id.typeName, bobjectsIds);
    }, {
      revalidateOnFocus: true
    }),
    bobjectsSync = _useSWR.data;
  var isAllSync = bobjectsSync === null || bobjectsSync === void 0 ? void 0 : bobjectsSync.every(function (bobject) {
    return bobject === null || bobject === void 0 ? void 0 : bobject.syncStatusOk;
  });
  return {
    syncStatus: isAllSync,
    bobjectsSync: bobjectsSync
  };
};

var useTimeZones = function useTimeZones() {
  var _useSWR = useSWR('/utils/service/timezones', function () {
      return api.get('/utils/service/timezones/gmt').then(function (res) {
        return res === null || res === void 0 ? void 0 : res.data;
      });
    }),
    data = _useSWR.data;
  return data;
};

function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$2(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var useUserPhoneNumbers = function useUserPhoneNumbers(callback) {
  var _settings$user;
  var _useActiveUserSetting = useActiveUserSettings$1(),
    settings = _useActiveUserSetting.settings;
  var _useSWR = useSWR("/entities/users/".concat(settings === null || settings === void 0 ? void 0 : (_settings$user = settings.user) === null || _settings$user === void 0 ? void 0 : _settings$user.id, "/phoneNumbers"), /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _settings$user2, _response$data, _response$data$_embed;
      var response, filteredPhones;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return api.get("/entities/users/".concat(settings === null || settings === void 0 ? void 0 : (_settings$user2 = settings.user) === null || _settings$user2 === void 0 ? void 0 : _settings$user2.id, "/phoneNumbers"));
          case 2:
            response = _context.sent;
            filteredPhones = response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : (_response$data$_embed = _response$data._embedded) === null || _response$data$_embed === void 0 ? void 0 : _response$data$_embed.phoneNumbers.filter(function (phoneNumber) {
              return (phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.type) === 'TWILIO_NUMBER' || (phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.type) === 'VERIFIED_NUMBER';
            });
            callback === null || callback === void 0 ? void 0 : callback(filteredPhones);
            return _context.abrupt("return", filteredPhones);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))),
    userPhones = _useSWR.data;
  return {
    userPhones: userPhones
  };
};

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var useActivities = function useActivities() {
  var _settings$account;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'activityTimelineItem.toasts.created'
    }),
    t = _useTranslation.t;
  var settings = useUserSettings();
  var hasSettingActive = settings === null || settings === void 0 ? void 0 : (_settings$account = settings.account) === null || _settings$account === void 0 ? void 0 : _settings$account.createActivitiesWhenCompletingCallTasks;
  var _useSessionStorage = useSessionStorage(),
    get = _useSessionStorage.get;
  var lastUsedPhone = get(SessionStorageKeys.LastPhoneUsed);
  var _useUserPhoneNumbers = useUserPhoneNumbers(),
    userPhones = _useUserPhoneNumbers.userPhones;
  var getMatchingPrefixPhone = function getMatchingPrefixPhone(leadPhone) {
    if (!leadPhone) return;
    return userPhones === null || userPhones === void 0 ? void 0 : userPhones.find(function (_ref) {
      var phoneNumber = _ref.phoneNumber;
      return (phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.substring(0, 3)) === (leadPhone === null || leadPhone === void 0 ? void 0 : leadPhone.substring(0, 3));
    });
  };
  var logActivityFromTask = function logActivityFromTask(_ref2) {
    var taskId = _ref2.taskId,
      callback = _ref2.callback;
    if (!hasSettingActive) return;
    api.get('/bobjects/' + taskId + '/form?injectReferences=true').then(function (response) {
      var _task$id, _task$referencedBobje, _task$referencedBobje2, _task$referencedBobje3, _ref3, _ref4, _getMatchingPrefixPho, _userPhones$;
      var task = response.data;
      var accountId = task === null || task === void 0 ? void 0 : (_task$id = task.id) === null || _task$id === void 0 ? void 0 : _task$id.accountId;
      var opportunityId = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY);
      var leadId = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD);
      var companyId = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY);
      var opportunity = task === null || task === void 0 ? void 0 : (_task$referencedBobje = task.referencedBobjects) === null || _task$referencedBobje === void 0 ? void 0 : _task$referencedBobje[opportunityId];
      var lead = task === null || task === void 0 ? void 0 : (_task$referencedBobje2 = task.referencedBobjects) === null || _task$referencedBobje2 === void 0 ? void 0 : _task$referencedBobje2[leadId];
      var company = task === null || task === void 0 ? void 0 : (_task$referencedBobje3 = task.referencedBobjects) === null || _task$referencedBobje3 === void 0 ? void 0 : _task$referencedBobje3[companyId];
      var leadPhoneNumber = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.PHONE);
      var userPhone = (_ref3 = (_ref4 = lastUsedPhone !== null && lastUsedPhone !== void 0 ? lastUsedPhone : (_getMatchingPrefixPho = getMatchingPrefixPhone(leadPhoneNumber)) === null || _getMatchingPrefixPho === void 0 ? void 0 : _getMatchingPrefixPho.phoneNumber) !== null && _ref4 !== void 0 ? _ref4 : (_userPhones$ = userPhones[0]) === null || _userPhones$ === void 0 ? void 0 : _userPhones$.phoneNumber) !== null && _ref3 !== void 0 ? _ref3 : null;
      api.post("/bobjects/".concat(accountId, "/Activity"), {
        contents: _defineProperty$1(_defineProperty$1(_defineProperty$1(_defineProperty$1(_defineProperty$1(_defineProperty$1(_defineProperty$1(_defineProperty$1(_defineProperty$1({}, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE, ACTIVITY_TYPES.CALL), ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION, ACTIVITY_DIRECTION.OUTGOING), ACTIVITY_FIELDS_LOGIC_ROLE.DATETIME, new Date()), ACTIVITY_FIELDS_LOGIC_ROLE.USER, getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO)), ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY, getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)), ACTIVITY_FIELDS_LOGIC_ROLE.LEAD, getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)), ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY, getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)), ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER, leadPhoneNumber), ACTIVITY_FIELDS_LOGIC_ROLE.CALL_USER_PHONE_NUMBER, userPhone),
        params: {}
      }).then(function (_ref5) {
        var data = _ref5.data;
        api.get('/bobjects/' + (data === null || data === void 0 ? void 0 : data.value) + '/form?injectReferences=true').then(function (_ref6) {
          var _ref7;
          var activity = _ref6.data;
          callback === null || callback === void 0 ? void 0 : callback(activity, (_ref7 = opportunity !== null && opportunity !== void 0 ? opportunity : lead) !== null && _ref7 !== void 0 ? _ref7 : company);
        });
        createToast({
          type: 'success',
          message: t('success')
        });
      })["catch"](function () {
        createToast({
          type: 'error',
          message: t('error')
        });
      });
    });
  };
  return {
    logActivityFromTask: logActivityFromTask
  };
};

function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2(); }
function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$2(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }
var useTogglerState = function useTogglerState() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var _React$useState = React.useState(initialState),
    _React$useState2 = _slicedToArray$2(_React$useState, 2),
    state = _React$useState2[0],
    setState = _React$useState2[1];
  var toggle = function toggle() {
    return setState(!state);
  };
  return [state, toggle];
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$1(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var TeamSortValues;
(function (TeamSortValues) {
  TeamSortValues["FromAZ"] = "fromAZ";
  TeamSortValues["FromZA"] = "fromZA";
  TeamSortValues["LastUpdateRecent"] = "lastUpdateRecent";
  TeamSortValues["LastUpdateOldest"] = "lastUpdateOldest";
})(TeamSortValues || (TeamSortValues = {}));
var TeamSortGroups = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, TeamSortValues.FromAZ, {
  field: 'name',
  order: 'ASC'
}), TeamSortValues.FromZA, {
  field: 'name',
  order: 'DESC'
}), TeamSortValues.LastUpdateOldest, {
  field: 'updateDatetime',
  order: 'ASC'
}), TeamSortValues.LastUpdateRecent, {
  field: 'updateDatetime',
  order: 'DESC'
});
var fetchTeams = function fetchTeams(_ref) {
  var _ref2 = _slicedToArray$1(_ref, 1),
    url = _ref2[0];
  return api.get(url);
};
var useUserTeams = function useUserTeams() {
  var _TeamSortGroups$sort, _TeamSortGroups$sort2;
  var onlyMine = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var sort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TeamSortValues.FromAZ;
  var _useSWR = useSWR(['/utils/teamUser/list' + '?orderBy=' + ((_TeamSortGroups$sort = TeamSortGroups[sort]) === null || _TeamSortGroups$sort === void 0 ? void 0 : _TeamSortGroups$sort.field) + '&direction=' + ((_TeamSortGroups$sort2 = TeamSortGroups[sort]) === null || _TeamSortGroups$sort2 === void 0 ? void 0 : _TeamSortGroups$sort2.order) + (onlyMine ? '&onlyMine=true' : '')], fetchTeams),
    data = _useSWR.data,
    isLoadingTeams = _useSWR.isLoading,
    mutate = _useSWR.mutate;
  var teams = data === null || data === void 0 ? void 0 : data.data;
  var managerOfTeams = function managerOfTeams(id) {
    var _teams$filter;
    return teams === null || teams === void 0 ? void 0 : (_teams$filter = teams.filter(function (t) {
      var _t$teamUsers;
      return t === null || t === void 0 ? void 0 : (_t$teamUsers = t.teamUsers) === null || _t$teamUsers === void 0 ? void 0 : _t$teamUsers.find(function (u) {
        return (u === null || u === void 0 ? void 0 : u.userId) === id && (u === null || u === void 0 ? void 0 : u.userRole) === UserTeamRole.Manager;
      });
    })) === null || _teams$filter === void 0 ? void 0 : _teams$filter.length;
  };
  var getTeamsByManagerId = function getTeamsByManagerId(id) {
    var teamsFromManager = teams === null || teams === void 0 ? void 0 : teams.filter(function (team) {
      var _team$teamUsers;
      return team === null || team === void 0 ? void 0 : (_team$teamUsers = team.teamUsers) === null || _team$teamUsers === void 0 ? void 0 : _team$teamUsers.find(function (user) {
        return (user === null || user === void 0 ? void 0 : user.userId) === id && (user === null || user === void 0 ? void 0 : user.userRole) === UserTeamRole.Manager;
      });
    });
    return (teamsFromManager === null || teamsFromManager === void 0 ? void 0 : teamsFromManager.length) > 0 ? teamsFromManager : undefined;
  };
  var isManagerById = function isManagerById(id) {
    var _getTeamsByManagerId;
    return ((_getTeamsByManagerId = getTeamsByManagerId(id)) === null || _getTeamsByManagerId === void 0 ? void 0 : _getTeamsByManagerId.length) > 0;
  };
  var teamsAggregation = teams === null || teams === void 0 ? void 0 : teams.length;
  var teamUsersAggregation = (teams === null || teams === void 0 ? void 0 : teams.reduce(function (acc, team) {
    var _team$teamUsers2;
    return acc + ((team === null || team === void 0 ? void 0 : (_team$teamUsers2 = team.teamUsers) === null || _team$teamUsers2 === void 0 ? void 0 : _team$teamUsers2.length) || 0);
  }, 0)) + teamsAggregation;
  return {
    teams: teams,
    isLoadingTeams: isLoadingTeams,
    noTeams: (teams === null || teams === void 0 ? void 0 : teams.length) === 0,
    mutate: mutate,
    getTeamsByManagerId: getTeamsByManagerId,
    isManagerById: isManagerById,
    managerOfTeams: managerOfTeams,
    teamsAggregation: teamsAggregation,
    teamUsersAggregation: teamUsersAggregation
  };
};

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var useLanguage = function useLanguage() {
  var userId = useActiveUserId();
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    languages = _useState2[0],
    setLanguages = _useState2[1];
  var _useUserHelpers = useUserHelpers(),
    has = _useUserHelpers.has,
    save = _useUserHelpers.save;
  useEffect(function () {
    fetchLanguages().then(function (languages) {
      setLanguages(languages);
    });
  }, []);
  var updateLanguage = function updateLanguage(language) {
    api.patch("/utils/service/users/".concat(userId, "/language/").concat(language), {}).then(function () {
      if (!has(UserHelperKeys.CHOOSE_LANGUAGE)) {
        save(UserHelperKeys.CHOOSE_LANGUAGE);
      }
      createToast({
        message: t('leftBar.successChangeLng', {
          language: t("languages.".concat(language))
        }),
        type: 'success'
      });
    })["catch"](function () {
      createToast({
        message: t('leftBar.errorChangeLng', {
          language: t("languages.".concat(language))
        }),
        type: 'error'
      });
    });
  };
  return {
    languages: languages,
    updateLanguage: updateLanguage
  };
};

export { BASE_SEARCH_REQUEST, COPILOT__HOSTNAME, CopilotActivityContextProvider, CustomWizardModalProvider, RemindeBeforeType, SubhomePageProvider, TASK_COLUMNS, TASK_REFERENCED_COLUMNS, TeamSortGroups, TeamSortValues, checkIsOverdue, createCustomActivity, fetch, fetchBobjectFields, fetchCustomTasks, fetchLeadsByRelatedBobject, getDataModel, isWebsocketDataActionForWithId, minSizes, openGeneralSearchBarAtom, searchCompanies, searchUsers, shouldShowStatusFields, updateCustomActivity, useActiveAccountId, useActiveAccountSettings, useActiveMessagingBattleCardsFilter, useActiveMessagingCadenceFilter, useActiveMessagingFilters, useActiveMessagingMineFilter, useActiveMessagingNameFilter, useActiveMessagingOfficialFilter, useActiveMessagingSegmentationValuesFilter, useActiveMessagingStageFilter, useActiveMessagingVisibilityFilter, useActiveUserId, useActiveUserName, useActiveUserSettings, useActivities, useAddToCalendar, useAddToCalendarVisibility, useAiAnalysisEnabled, useAircallPhoneLinkEnabled, useAllInfoDisplayBlocks, useAllowBLinksInCRM, useB2CShowAccountPhonesSetting, useBaseEmailVariableValue, useBaseEmailVariables, useBaseResetEmailVariablesValues, useBaseSetEmailVariablesValues, useBobject, useBobjectFieldGroups, useBobjectFieldGroupsCleaning, useBobjectRefresh, useCadenceInfo, useCadenceV2Enabled, useCadences, useCalendar, useChangeLanguageEnabled, useCompanies, useCompaniesAndLeadsEnabled, useCompanyCreationEnabled, useConfetti, useContactFlowWizardContext, useCopilot, useCopilotActivity, useCopilotEnabled, useCrmStatus, useCustomTasks, useCustomWizards, useCustomWizardsEnabled, useDataModel, useDebounce, useDebounceEffect, useDebouncedCallback, useDidMountEffect, useDynamicsEnabled, useEmailConnections, useEmailIntegrationMode, useFeatureFlags, useFieldDependencies, useFieldsData, useFullSalesEnabled, useGeneralSearchVisibility, useGetBobjectByTypeAndId, useGetInfoDisplayBlockByKey, useGetUserHelpers, useHasNewTaskFeed, useInboundHubspotEnabled, useIntegrationApp, useInterval, useIsAutoSyncFromDifferentOwner, useIsB2CAccount, useIsNoStatusPlanAccount, useIsOTOAccount, useIsPersonAccountAsAccount, useLanguage, useLazyRef, useLocalStorage, useManageUserTeamsEnabled, useMarkAsReported, useMediaQuery, useMeetingLink, useMeetingLinks, useMeetingReportResult, useMessagingTemplate, useMessagingTemplates, useMinimizableModal, useMinimizableModals, useMinimizableStore, useNewActivityFeed, useNewCadenceTableEnabled, useNewDashboardEnabled, useNewLastActivity, useNewMeetingTab, useNoStatusOppSetting, useNotificationRemindersEnabled, useNotifications, useNotificationsData, useNumintecEnabled, useNumintecNewDialerVersion, useObjectCreationSettings, useOldReportingEnabled, useOpenCCFWithoutObject, useOpenMeetingReportResult, useOpenSkipTaskModal, useOtoSyncWithRelatedObjects, useOtoUpdateContactId, usePausePeriods, usePausePeriodsModal, usePicklist, usePlaybook, usePlaybookSegmentation, usePreventWindowUnload, usePreviousUrl, useProductsEnabled, useProspectingNurturingTab, useQualifyingQuestions, useQuickLogActivity, useRawAccountSettings, useRawActiveAccountId, useReminders, useRouter, useSWRLifespanEnabled, useSalesDashboardEnabled, useSalesFollowUpEnabled, useSalesInactiveTabEnabled, useSalesNurturingTab, useSalesforceDataModel, useSalesforceLeftBarEnabled, useSalesforceOauthEnabled, useSalesforceStatusPicklistValue, useSalesforceUserAuthEnabled, useSearchBobjects, useSelectAll, useSendFromMailEnabled, useSentryUserFeedbackEnabled, useSessionStorage, useSetCadenceEnabled, useSignatures, useSkipModal, useSnippetsEnabled, useStatus, useSubhomeContext, useSuggestedTemplates, useSyncBobjectStatus, useTasksFeed, useTemplateInsights, useTimeSlotsEnabled, useTimeZones, useTimezonesEnabled, useTogglerState, useUserHelpers, useUserPhoneNumbers, useUserSearch, useUserSettings, useUserTeams, useUserTimeZone, useVtigerEnabled, useWhatsappEnabled, useWhatsappOpenNewPage };
//# sourceMappingURL=index.js.map
