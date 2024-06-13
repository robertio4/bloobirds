import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Draggable from 'react-draggable';
import { useTranslation } from 'react-i18next';
import { Icon, Text, Spinner, Tooltip, IconButton, useVisible, Dropdown, Item, Checkbox, Skeleton, useToasts, Portal, Button, Modal, ModalHeader, ModalTitle, ModalCloseIcon, ModalContent, ChipGroup, Chip, DateTimePicker, Select, Input, ModalFooter } from '@bloobirds-it/flamingo-ui';
import { useActiveAccountId, useOtoUpdateContactId, useSuggestedTemplates, useActiveUserSettings, useUserPhoneNumbers, useSessionStorage, useFullSalesEnabled, useMinimizableModals, useDataModel, usePlaybook, useActiveUserId, useOpenCCFWithoutObject, useLazyRef, useBobject } from '@bloobirds-it/hooks';
import { useEventSubscription } from '@bloobirds-it/plover';
import { useRichTextEditorPlugins, serialize, RichTextEditor, EditorToolbar, EditorToolbarControlsSection, EditorToolbarFontStylesSection, EditorToolbarTextMarksSection, EditorToolbarListsSection } from '@bloobirds-it/rich-text-editor';
import { ACTIVITY_FIELDS_LOGIC_ROLE, MessagesEvents, MIXPANEL_EVENTS, PluralBobjectTypes, BobjectTypes, LEAD_FIELDS_LOGIC_ROLE, PlaybookTab, SessionStorageKeys, TemplateStage, Environment, UserRole, DialerType, DIRECTION_VALUES_LOGIC_ROLE } from '@bloobirds-it/types';
import { getFieldByLogicRole, isSalesforcePage, normalizeUrl, api, isLead, getTextFromLogicRole, isValidPhone as isValidPhone$1, getIsSales, appHostnames, isElementLoaded, getValueFromLogicRole } from '@bloobirds-it/utils';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';
import * as Sentry from '@sentry/react';
import { resetEditorChildren } from '@udecode/plate';
import clsx from 'clsx';
import { useAnimation, AnimatePresence, motion } from 'framer-motion';
import debounce from 'lodash/debounce';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { v4 } from 'uuid';
import mixpanel from 'mixpanel-browser';
import useSWR from 'swr';
import { InfoWarning } from '@bloobirds-it/misc';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { Device, Call } from '@twilio/voice-sdk';
import { SearchBobjects } from '@bloobirds-it/bobjects';
import { VirtualInfiniteScroll } from '@bloobirds-it/virtual-infinite-scroll';
import { AsYouType, parsePhoneNumber } from 'libphonenumber-js';
import { NoteForm } from '@bloobirds-it/notes';
import { PlaybookFeed, SegmentationFilter, TemplateDetail } from '@bloobirds-it/playbook';
import { useEvent } from 'react-use';
import clamp from 'lodash/clamp';
import md5 from 'md5';
import RingoverSDK from 'ringover-sdk';
import { useForm, Controller } from 'react-hook-form';
import { AstrolineCrossSvg, AstrolineSvg } from '@bloobirds-it/assets';
export { AstrolineCrossSvg, AstrolineDisabledSvg, AstrolineSvg } from '@bloobirds-it/assets';
import { atom, useRecoilState } from 'recoil';

function _typeof$h(obj) { "@babel/helpers - typeof"; return _typeof$h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$h(obj); }
function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty$c(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$c(obj, key, value) { key = _toPropertyKey$d(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$d(arg) { var key = _toPrimitive$d(arg, "string"); return _typeof$h(key) === "symbol" ? key : String(key); }
function _toPrimitive$d(input, hint) { if (_typeof$h(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$h(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function getMainBobjectId(activity) {
  var relatedOpportunity = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY);
  if (relatedOpportunity !== null && relatedOpportunity !== void 0 && relatedOpportunity.value) {
    return relatedOpportunity.value;
  }
  var relatedLead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  if (relatedLead !== null && relatedLead !== void 0 && relatedLead.value) {
    return relatedLead.value;
  }
  var relatedCompany = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY);
  if (relatedCompany !== null && relatedCompany !== void 0 && relatedCompany.value) {
    return relatedCompany.value;
  }
  return null;
}
function fillReferenceFields(activity) {
  activity.fields = activity === null || activity === void 0 ? void 0 : activity.fields.map(function (field) {
    if (field.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY) {
      return _objectSpread$5(_objectSpread$5({}, field), {}, {
        referencedBobject: activity.referencedBobjects[field.value]
      });
    }
    if (field.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.LEAD) {
      return _objectSpread$5(_objectSpread$5({}, field), {}, {
        referencedBobject: activity.referencedBobjects[field.value]
      });
    }
    if (field.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY) {
      return _objectSpread$5(_objectSpread$5({}, field), {}, {
        referencedBobject: activity.referencedBobjects[field.value]
      });
    }
    return field;
  });
  return activity;
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

var css_248z$9 = ".airCallDialer-module_airCall_dialer_container__EXhvN {\n  width: 374px;\n  border-radius: 0 0 8px 8px;\n  flex-grow: 1;\n}\n\n.airCallDialer-module_airCall_dialer__pWH86 {\n  height: 600px;\n}\n\n.airCallDialer-module_airCall_dialer__pWH86 > iframe {\n  border-radius: 8px;\n  border: 0;\n}\n\n.airCallDialer-module_airCall_dialer_contact__LPXHj {\n  display: flex;\n  height: 44px;\n  box-sizing: content-box;\n  padding: var(--Spacing-02, 8px) var(--Spacing-03, 16px) var(--Spacing-03, 8px) var(--Spacing-03, 16px);\n  justify-content: space-between;\n  align-items: center;\n  align-self: stretch;\n}\n\n.airCallDialer-module_airCall_dialer_contact_names__qko6R {\n  display: flex;\n  flex-direction: column;\n}\n\n/*If .airCall_dialer_contact_names has siblings we should change the width to 94%*/\n.airCallDialer-module_airCall_dialer_contact_names__qko6R:not(:only-child) {\n  width: 94%;\n}\n\n.airCallDialer-module_airCall_dialer_contact_name__6fJtt {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n  min-width: 0;\n}\n\n/* If not first child of type .airCall_dialer_contact_name we should add a margin left of 2px */\n.airCallDialer-module_airCall_dialer_contact_name__6fJtt:not(:first-of-type) {\n  margin-left: 2px;\n}\n\n.airCallDialer-module_airCall_dialer_contact_name__6fJtt:hover {\n  cursor: pointer;\n}\n\n.airCallDialer-module_airCall_dialer_contact_name__6fJtt > svg {\n  flex-shrink: 0;\n}\n\n.airCallDialer-module_airCall_dialer_contact_name__6fJtt:hover .airCallDialer-module_airCall_dialer_contact_name_text__phxw2 {\n  color: var(--darkBloobirds) !important;\n}\n\n\n.airCallDialer-module_airCall_dialer_contact_name_text__phxw2 {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n\n\n\n\n";
var styles$8 = {"airCall_dialer_container":"airCallDialer-module_airCall_dialer_container__EXhvN","airCall_dialer":"airCallDialer-module_airCall_dialer__pWH86","airCall_dialer_contact":"airCallDialer-module_airCall_dialer_contact__LPXHj","airCall_dialer_contact_names":"airCallDialer-module_airCall_dialer_contact_names__qko6R","airCall_dialer_contact_name":"airCallDialer-module_airCall_dialer_contact_name__6fJtt","airCall_dialer_contact_name_text":"airCallDialer-module_airCall_dialer_contact_name_text__phxw2"};
styleInject(css_248z$9);

var AirCallDialerFrame = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useAircallDialer = useAircallDialer(),
    contact = _useAircallDialer.contact;
  var setContactViewBobjectId = function setContactViewBobjectId(bobjectId) {
    window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension, {
      detail: {
        bobjectId: bobjectId
      }
    }));
  };
  return /*#__PURE__*/jsxs("div", {
    className: styles$8.airCall_dialer_container,
    id: "bb-aircall-dialer",
    children: [contact && /*#__PURE__*/jsxs("div", {
      className: styles$8.airCall_dialer_contact,
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$8.airCall_dialer_contact_names,
        children: [contact.leadName && /*#__PURE__*/jsxs("div", {
          className: styles$8.airCall_dialer_contact_name,
          onClick: function onClick() {
            return setContactViewBobjectId(contact.leadId);
          },
          children: [/*#__PURE__*/jsx(Icon, {
            name: 'bloobirds',
            color: "bloobirds",
            size: 20
          }), /*#__PURE__*/jsx(Text, {
            size: 'm',
            color: "bloobirds",
            weight: "bold",
            className: styles$8.airCall_dialer_contact_name_text,
            children: contact.leadName
          })]
        }), contact.companyName && /*#__PURE__*/jsxs("div", {
          className: styles$8.airCall_dialer_contact_name,
          onClick: function onClick() {
            return setContactViewBobjectId(contact.companyId);
          },
          children: [/*#__PURE__*/jsx(Icon, {
            name: 'company',
            color: "bloobirds",
            size: 16
          }), /*#__PURE__*/jsx(Text, {
            size: 's',
            color: "bloobirds",
            className: styles$8.airCall_dialer_contact_name_text,
            children: contact.companyName
          })]
        })]
      }), contact.multipleContacts && /*#__PURE__*/jsx("div", {
        className: styles$8.airCall_dialer_contact_multiple,
        children: /*#__PURE__*/jsx(InfoWarning, {
          message: "There are multiple records with this phone number"
        })
      })]
    }), /*#__PURE__*/jsx("div", {
      id: "phone",
      ref: ref,
      className: styles$8.airCall_dialer
    })]
  });
});

function _typeof$g(obj) { "@babel/helpers - typeof"; return _typeof$g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$g(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$c(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey$c(arg) { var key = _toPrimitive$c(arg, "string"); return _typeof$g(key) === "symbol" ? key : String(key); }
function _toPrimitive$c(input, hint) { if (_typeof$g(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$g(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var AircallPhone = /*#__PURE__*/function () {
  function AircallPhone() {
    var _this = this;
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      debug: true
    };
    _classCallCheck(this, AircallPhone);
    // internal vars
    // window object of loaded aircall phone
    this.phoneWindow = null;
    this.integrationSettings = {};
    this.path = null;
    this.userSettings = {};
    this.eventsRegistered = {};
    this.phoneLoginState = false;
    var URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

    // options passed
    this.phoneUrl = opts.phoneUrl !== undefined && URL_REGEX.test(opts.phoneUrl) === true ? opts.phoneUrl : 'https://phone.aircall.io';
    this.domToLoadPhone = opts.domToLoadPhone;
    this.integrationToLoad = opts.integrationToLoad;
    this.path = opts.path;
    this.debug = opts.debug;

    // 3 different sizes: big/small/auto
    this.size = opts.size || 'big';
    this.onLogin = function () {
      if (typeof opts.onLogin === 'function' && _this.phoneLoginState === false) {
        _this.phoneLoginState = true;
        var data = {
          user: _this.userSettings
        };
        if (Object.keys(_this.integrationSettings).length > 0) {
          data.settings = _this.integrationSettings;
        }
        opts.onLogin(data);
      }
    };
    this.onLogout = function () {
      if (typeof opts.onLogout === 'function') {
        opts.onLogout();
      }
    };
    // local window
    this.w = opts.window || window;

    // launch postmessage listener
    this._messageListener();

    // load phone in specified dom
    if (this.domToLoadPhone) {
      this._createPhoneIframe();
    }
  }
  return _createClass(AircallPhone, [{
    key: "_resetData",
    value: function _resetData() {
      this.phoneWindow = null;
      this.path = null;
      this.integrationSettings = {};
      this.userSettings = {};
      this.phoneLoginState = false;
    }
  }, {
    key: "_createPhoneIframe",
    value: function _createPhoneIframe() {
      var sizeStyle = '';
      switch (this.size) {
        case 'big':
          sizeStyle = 'height:666px; width:376px;';
          break;
        case 'small':
          sizeStyle = 'height:600px; width:376px;';
          break;
        case 'auto':
          sizeStyle = 'height:100%; width:100%;';
          break;
      }

      // we get the passed dom
      try {
        var el = document.querySelector(this.domToLoadPhone);
        el.innerHTML = "<iframe allow=\"microphone; autoplay; clipboard-read; clipboard-write; hid\" src=\"".concat(this.getUrlToLoad(), "\" style=\"").concat(sizeStyle, "\"></iframe>");
      } catch (e) {
        // couldnt query the dom wanted
        this._log('error', "[AircallEverywhere] [iframe creation] ".concat(this.domToLoadPhone, " not be found. Error:"), e);
      }
    }
  }, {
    key: "_messageListener",
    value: function _messageListener() {
      var _this2 = this;
      this.w.addEventListener('message', function (event) {
        _this2._log('info', '[AircallEverywhere] [event listener] received event', event);
        // we test if our format object is present. if not, we stop
        var matchPrefixRegex = /^apm_phone_/;
        if (!event.data || !event.data.name || !matchPrefixRegex.test(event.data.name)) {
          return false;
        }

        // initialisation message
        if (event.data.name === 'apm_phone_loaded') {
          _this2._handleInitMessage(event);
          return;
        }

        // integration settings sent by phone
        if (event.data.name === 'apm_phone_integration_settings' && !!event.data.value) {
          _this2.integrationSettings = event.data.value;
          // init callback after settings received
          _this2.onLogin();
          return;
        }

        // phone logout
        if (event.data.name === 'apm_phone_logout') {
          // we clean data related to user
          _this2._resetData();
          _this2.onLogout();
          return;
        }

        // loop over events registered
        for (var eventName in _this2.eventsRegistered) {
          if (event.data.name === "apm_phone_".concat(eventName)) {
            // event triggered => we execute callback
            _this2.eventsRegistered[eventName](event.data.value);
          }
        }
      }, false);
    }
  }, {
    key: "_handleInitMessage",
    value: function _handleInitMessage(event) {
      var _this$phoneWindow$sou;
      // we keep the source
      this.phoneWindow = {
        source: event.source,
        origin: event.origin
      };
      if (event.data.value) {
        this.userSettings = event.data.value;
      }

      // we answer init
      (_this$phoneWindow$sou = this.phoneWindow.source) === null || _this$phoneWindow$sou === void 0 ? void 0 : _this$phoneWindow$sou.postMessage({
        name: 'apm_app_isready',
        path: this.path
      }, this.phoneWindow.origin);

      // we ask for integration settings
      if (this.integrationToLoad) {
        var _this$phoneWindow$sou2;
        (_this$phoneWindow$sou2 = this.phoneWindow.source) === null || _this$phoneWindow$sou2 === void 0 ? void 0 : _this$phoneWindow$sou2.postMessage({
          name: 'apm_app_get_settings',
          value: this.integrationToLoad
        }, this.phoneWindow.origin);
      } else {
        // init callback now if present
        this.onLogin();
      }
    }
  }, {
    key: "_log",
    value: function _log(action) {
      var _console, _console2;
      if (typeof action !== 'string') {
        throw new Error('[AircallEverywhere] [_log] Must provide valid console action');
      }

      // logging turned off, don't do anything
      if (!this.debug) {
        return;
      }

      // if valid action, execute with given args, otherwise default to info
      for (var _len = arguments.length, restArguments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        restArguments[_key - 1] = arguments[_key];
      }
      console[action] ? (_console = console)[action].apply(_console, restArguments) : (_console2 = console).info.apply(_console2, restArguments);
    }
  }, {
    key: "getUrlToLoad",
    value: function getUrlToLoad() {
      return "".concat(this.phoneUrl, "?integration=generic");
    }
  }, {
    key: "on",
    value: function on(eventName, callback) {
      if (!eventName || typeof callback !== 'function') {
        throw new Error('[AircallEverywhere] [on function] Invalid parameters format. Expected non empty string and function');
      }
      this.eventsRegistered[eventName] = callback;
    }
  }, {
    key: "_handleSendError",
    value: function _handleSendError(error, callback) {
      if (!error || !error.code) {
        // should not happen, unknown error
        error = {
          code: 'unknown_error'
        };
      }
      // errors sent by the phone for specific events are not handled since they should have their code AND message
      if (!!error && !error.message) {
        switch (error.code) {
          case 'unknown_error':
            error.message = 'Unknown error. Contact aircall developers dev@aircall.io';
            break;
          case 'no_event_name':
            error.message = 'Invalid parameter eventName. Expected an non empty string';
            break;
          case 'not_ready':
            error.message = 'Aircall Phone has not been identified yet or is not ready. Wait for "onLogin" callback';
            break;
          case 'no_answer':
            error.message = 'No answer from the phone. Check if the phone is logged in';
            break;
          case 'invalid_response':
            error.message = 'Invalid response from the phone. Contact aircall developers dev@aircall.io';
            break;
          default:
            // specific error without a message. Should not happen
            error.message = 'Generic error message';
            break;
        }
      }

      // we log the error
      this._log('error', "[AircallEverywhere] [send function] ".concat(error.message));

      // we send the callback with the error
      if (typeof callback === 'function') {
        callback(false, error);
      }
    }
  }, {
    key: "send",
    value: function send(eventName, data, callback) {
      var _this3 = this;
      if (typeof data === 'function' && !callback) {
        callback = data;
        data = undefined;
      }
      if (!eventName) {
        this._handleSendError({
          code: 'no_event_name'
        }, callback);
        return false;
      }
      if (!!this.phoneWindow && !!this.phoneWindow.source) {
        var _this$phoneWindow$sou3;
        var responseTimeout = null;
        var timeoutLimit = 2000;

        // we send the message
        (_this$phoneWindow$sou3 = this.phoneWindow.source) === null || _this$phoneWindow$sou3 === void 0 ? void 0 : _this$phoneWindow$sou3.postMessage({
          name: "apm_app_".concat(eventName),
          value: data
        }, this.phoneWindow.origin);

        // we wait for a response to this message
        this.on("".concat(eventName, "_response"), function (response) {
          // we have a response, we remove listener and return the callback
          _this3.removeListener("".concat(eventName, "_response"));
          clearTimeout(responseTimeout);
          // we evaluate response
          if (!!response && response.success === false) {
            // phone answers with an error
            _this3._handleSendError({
              code: response.errorCode,
              message: response.errorMessage
            }, callback);
          } else if (!!response && response.success === true) {
            // phone answer a succes with its response
            if (typeof callback === 'function') {
              callback(true, response.data);
            }
          } else {
            // phone answer is invalid
            _this3._handleSendError({
              code: 'invalid_response'
            }, callback);
          }
        });
        responseTimeout = setTimeout(function () {
          // if no response, we remove listener
          _this3.removeListener("".concat(eventName, "_response"));
          _this3._handleSendError({
            code: 'no_answer'
          }, callback);
        }, timeoutLimit);
      } else {
        this._handleSendError({
          code: 'not_ready'
        }, callback);
        return false;
      }
    }
  }, {
    key: "removeListener",
    value: function removeListener(eventName) {
      var _this4 = this;
      if (!this.eventsRegistered[eventName]) {
        return false;
      }
      Object.keys(this.eventsRegistered).filter(function (key) {
        return key === eventName;
      }).forEach(function (key) {
        return delete _this4.eventsRegistered[key];
      });
      return true;
    }
  }, {
    key: "isLoggedIn",
    value: function isLoggedIn(callback) {
      // we simply send an event and send its result.
      this.send('is_logged_in', function (success) {
        callback(success);
      });
    }
  }]);
}();

function _typeof$f(obj) { "@babel/helpers - typeof"; return _typeof$f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$f(obj); }
function _regeneratorRuntime$a() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$a = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$f(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$a(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$a(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$a(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$a(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray$c(arr, i) { return _arrayWithHoles$c(arr) || _iterableToArrayLimit$c(arr, i) || _unsupportedIterableToArray$d(arr, i) || _nonIterableRest$c(); }
function _nonIterableRest$c() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$d(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$d(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$d(o, minLen); }
function _arrayLikeToArray$d(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$c(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$c(arr) { if (Array.isArray(arr)) return arr; }
var AircallContext = /*#__PURE__*/React.createContext(null);
var AircallDialer = function AircallDialer() {
  var dialedPhoneNumber = useDialer(function (state) {
    return state.dialedPhoneNumber;
  });
  var _useDialerStore = useDialerStore(),
    maximize = _useDialerStore.maximize,
    setActivityExternal = _useDialerStore.setActivityExternal,
    closeExtendedScreen = _useDialerStore.closeExtendedScreen;
  var _useState = useState(),
    _useState2 = _slicedToArray$c(_useState, 2),
    launch = _useState2[0],
    setLaunch = _useState2[1];
  var ref = useRef(null);
  var _useState3 = useState(null),
    _useState4 = _slicedToArray$c(_useState3, 2),
    activityCCF = _useState4[0],
    setActivityCCF = _useState4[1];
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray$c(_React$useState, 2),
    showCorrectContactFlow = _React$useState2[0],
    setShowCorrectContactFlow = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray$c(_React$useState3, 2),
    mainActivityBobject = _React$useState4[0],
    setMainActivityBobject = _React$useState4[1];
  var _useWizardContext = useWizardContext(),
    openWizard = _useWizardContext.openWizard,
    resetWizardProperties = _useWizardContext.resetWizardProperties;
  var _useState5 = useState(null),
    _useState6 = _slicedToArray$c(_useState5, 2),
    contact = _useState6[0],
    setContact = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray$c(_useState7, 2),
    callId = _useState8[0],
    setCallId = _useState8[1];
  var accountId = useActiveAccountId();
  var hasOtoUpdateContactId = useOtoUpdateContactId(accountId);
  var _useSWR = useSWR(callId ? "/calls/aircall/calls/".concat(callId) : null, /*#__PURE__*/function () {
      var _ref = _asyncToGenerator$a( /*#__PURE__*/_regeneratorRuntime$a().mark(function _callee(url) {
        var response;
        return _regeneratorRuntime$a().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return api.get(url);
            case 2:
              response = _context.sent;
              return _context.abrupt("return", response === null || response === void 0 ? void 0 : response.data);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x2) {
        return _ref.apply(this, arguments);
      };
    }(), {
      onErrorRetry: function onErrorRetry(error, key, config, revalidate, _ref2) {
        var retryCount = _ref2.retryCount;
        if (retryCount >= 15) {
          return;
        }
        setTimeout(function () {
          return revalidate({
            retryCount: retryCount
          });
        }, 1000);
      }
    }),
    activity = _useSWR.data;
  useEffect(function () {
    if (activity) {
      setActivityExternal(activity);
    }
  }, [activity]);
  function openCorrectContactFlow(_x3) {
    return _openCorrectContactFlow.apply(this, arguments);
  }
  function _openCorrectContactFlow() {
    _openCorrectContactFlow = _asyncToGenerator$a( /*#__PURE__*/_regeneratorRuntime$a().mark(function _callee4(activity) {
      var mainBobjectId, _PluralBobjectTypes$m, response;
      return _regeneratorRuntime$a().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CALL_BUTTON_ON_AIRCALL_OTO);
            mainBobjectId = getMainBobjectId(activity);
            if (!mainBobjectId) {
              _context4.next = 7;
              break;
            }
            _context4.next = 5;
            return api.get("/linkedin/".concat((_PluralBobjectTypes$m = PluralBobjectTypes[mainBobjectId.split('/')[1]]) === null || _PluralBobjectTypes$m === void 0 ? void 0 : _PluralBobjectTypes$m.toLowerCase(), "/").concat(mainBobjectId.split('/')[2]));
          case 5:
            response = _context4.sent;
            setMainActivityBobject(response === null || response === void 0 ? void 0 : response.data);
          case 7:
            setShowCorrectContactFlow(true);
          case 8:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return _openCorrectContactFlow.apply(this, arguments);
  }
  var createCallAndLaunchCCF = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator$a( /*#__PURE__*/_regeneratorRuntime$a().mark(function _callee2(details) {
      var _yield$api$post, activity, _activity$activity;
      return _regeneratorRuntime$a().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return api.post('/calls/aircall/calls/' + (details === null || details === void 0 ? void 0 : details.call_id) + '/end');
          case 2:
            _yield$api$post = _context2.sent;
            activity = _yield$api$post.data;
            if (activity) {
              api.get("/bobjects/".concat(activity === null || activity === void 0 ? void 0 : (_activity$activity = activity.activity) === null || _activity$activity === void 0 ? void 0 : _activity$activity.value, "/form?injectReferences=true")).then(function (response) {
                if (response !== null && response !== void 0 && response.data) {
                  var activityToCCF = fillReferenceFields(response === null || response === void 0 ? void 0 : response.data);
                  if (activityToCCF) {
                    setActivityCCF(activityToCCF);
                    openCorrectContactFlow(activityToCCF);
                  }
                }
              });
            }
          case 5:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function createCallAndLaunchCCF(_x4) {
      return _ref3.apply(this, arguments);
    };
  }();
  var setContactInfo = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator$a( /*#__PURE__*/_regeneratorRuntime$a().mark(function _callee3(phoneNumber) {
      var response, bobjects, bobject;
      return _regeneratorRuntime$a().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return api.post('/calls/whiteLabel/search', {
              phoneNumber: phoneNumber
            });
          case 2:
            response = _context3.sent;
            if (!(response.status !== 200)) {
              _context3.next = 5;
              break;
            }
            return _context3.abrupt("return");
          case 5:
            bobjects = response.data;
            if (!(bobjects.length === 0)) {
              _context3.next = 8;
              break;
            }
            return _context3.abrupt("return");
          case 8:
            if (!(bobjects.length > 1)) {
              _context3.next = 11;
              break;
            }
            // Multiple bobjects with the same phone number, notify the user
            setContact({
              multipleContacts: true,
              numberOfContacts: bobjects.length
            });
            return _context3.abrupt("return");
          case 11:
            bobject = bobjects[0];
            setContact({
              leadName: isLead(bobject) ? getTextFromLogicRole(bobject, 'LEAD__FULL_NAME') : undefined,
              leadId: isLead(bobject) ? bobject.id.value : undefined,
              companyName: isLead(bobject) ? getTextFromLogicRole(bobject, 'LEAD__COMPANY_NAME') : getTextFromLogicRole(bobject, 'COMPANY__NAME'),
              companyId: isLead(bobject) ? getTextFromLogicRole(bobject, 'LEAD__COMPANY') : bobject.id.value,
              multipleContacts: false
            });
          case 13:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function setContactInfo(_x5) {
      return _ref4.apply(this, arguments);
    };
  }();
  var aircallPhoneExt = useMemo(function () {
    window.onbeforeunload = null;
    if (ref.current) {
      try {
        // @ts-ignore
        var newPhone = new AircallPhone({
          onLogin: function onLogin() {},
          onLogout: function onLogout() {},
          domToLoadPhone: '#phone',
          size: 'auto'
        });
        newPhone.on('incoming_call', function (e) {
          // Search lead / company with e.from
          setContactInfo(e.from);
          setCallId(e.call_id);
          closeExtendedScreen();
          setActivityExternal(null);
          maximize();
          window.onbeforeunload = function () {
            return true;
          };
        });
        newPhone.on('outgoing_call', function (e) {
          // Search lead / company with e.to
          setContactInfo(e.to);
          closeExtendedScreen();
          setActivityExternal(null);
          setCallId(e.call_id);
          window.onbeforeunload = function () {
            return true;
          };
        });
        newPhone.on('call_end_ringtone', function (e) {
          if (e.answer_status !== 'answered') {
            // Close the lead details
            setContact(null);
          }
        });

        // Manually log the call regardless of the webhook on the aircall side
        newPhone.on('call_ended', function (e) {
          // Close the lead details
          setContact(null);
          createCallAndLaunchCCF(e);
          window.onbeforeunload = null;
        });
        return newPhone;
      } catch (e) {
        console.log(e);
      }
    }
    return null;
  }, [ref.current, launch]);
  useEffect(function () {
    if (dialedPhoneNumber) {
      if (isSalesforcePage(normalizeUrl(window.location.href))) {
        var possibleCti = document.querySelector('iframe[src*="cti.aircall.io"]');
        if (possibleCti) {
          possibleCti.remove();
          setTimeout( // @ts-ignore
          aircallPhoneExt === null || aircallPhoneExt === void 0 ? void 0 : aircallPhoneExt.send('dial_number', {
            phone_number: dialedPhoneNumber
          }, function () {}), 1);
        } else {
          aircallPhoneExt === null || aircallPhoneExt === void 0 ? void 0 : aircallPhoneExt.send('dial_number', {
            phone_number: dialedPhoneNumber
          }, function () {});
        }
      } else {
        aircallPhoneExt === null || aircallPhoneExt === void 0 ? void 0 : aircallPhoneExt.send('dial_number', {
          phone_number: dialedPhoneNumber
        }, function () {});
      }
    }
  }, [dialedPhoneNumber, aircallPhoneExt]);
  function handleClose() {
    closeExtendedScreen();
    setActivityExternal(null);
    setActivityCCF(null);
    setShowCorrectContactFlow(false);
    setMainActivityBobject(null);
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }
  return /*#__PURE__*/jsx(AircallContext.Provider, {
    value: {
      aircallPhoneExt: aircallPhoneExt,
      launch: launch,
      setLaunch: setLaunch,
      contact: contact
    },
    children: /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsx(AirCallDialerFrame, {
        ref: ref
      }), showCorrectContactFlow && activityCCF && (mainActivityBobject || hasOtoUpdateContactId) && openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activityCCF, {
        referenceBobject: mainActivityBobject,
        handleClose: handleClose
      })]
    })
  });
};
var useAircallDialer = function useAircallDialer() {
  var context = React.useContext(AircallContext);
  if (!context) {
    throw new Error('useAircallDialer must be used within the AircallProvider');
  }
  return context;
};

var css_248z$8 = ".astrolineDialerFrame-module_dialer__76O71 {\n  width: 318px;\n  border-radius: 0 0 8px 8px;\n}\n";
var styles$7 = {"dialer":"astrolineDialerFrame-module_dialer__76O71"};
styleInject(css_248z$8);

function _typeof$e(obj) { "@babel/helpers - typeof"; return _typeof$e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$e(obj); }
function _regeneratorRuntime$9() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$9 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$e(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty$b(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$b(obj, key, value) { key = _toPropertyKey$b(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$b(arg) { var key = _toPrimitive$b(arg, "string"); return _typeof$e(key) === "symbol" ? key : String(key); }
function _toPrimitive$b(input, hint) { if (_typeof$e(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$e(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep$9(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$9(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$9(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$9(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray$b(arr, i) { return _arrayWithHoles$b(arr) || _iterableToArrayLimit$b(arr, i) || _unsupportedIterableToArray$c(arr, i) || _nonIterableRest$b(); }
function _nonIterableRest$b() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$c(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$c(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$c(o, minLen); }
function _arrayLikeToArray$c(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$b(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$b(arr) { if (Array.isArray(arr)) return arr; }
var AstrolineDialerFrame = function AstrolineDialerFrame(_ref) {
  var launchCCF = _ref.launchCCF;
  var _useState = useState(null),
    _useState2 = _slicedToArray$b(_useState, 2),
    activityCCF = _useState2[0],
    setActivityCCF = _useState2[1];
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray$b(_React$useState, 2),
    showCorrectContactFlow = _React$useState2[0],
    setShowCorrectContactFlow = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray$b(_React$useState3, 2),
    mainActivityBobject = _React$useState4[0],
    setMainActivityBobject = _React$useState4[1];
  var _useWizardContext = useWizardContext(),
    openWizard = _useWizardContext.openWizard,
    resetWizardProperties = _useWizardContext.resetWizardProperties;
  function openCorrectContactFlow(_x2) {
    return _openCorrectContactFlow.apply(this, arguments);
  }
  function _openCorrectContactFlow() {
    _openCorrectContactFlow = _asyncToGenerator$9( /*#__PURE__*/_regeneratorRuntime$9().mark(function _callee2(activity) {
      var mainBobjectId, _PluralBobjectTypes$m, response;
      return _regeneratorRuntime$9().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            mainBobjectId = getMainBobjectId(activity);
            if (!mainBobjectId) {
              _context2.next = 6;
              break;
            }
            _context2.next = 4;
            return api.get("/linkedin/".concat((_PluralBobjectTypes$m = PluralBobjectTypes[mainBobjectId.split('/')[1]]) === null || _PluralBobjectTypes$m === void 0 ? void 0 : _PluralBobjectTypes$m.toLowerCase(), "/").concat(mainBobjectId.split('/')[2]));
          case 4:
            response = _context2.sent;
            setMainActivityBobject(response === null || response === void 0 ? void 0 : response.data);
          case 6:
            setShowCorrectContactFlow(true);
          case 7:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return _openCorrectContactFlow.apply(this, arguments);
  }
  var createCallAndLaunchCCF = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator$9( /*#__PURE__*/_regeneratorRuntime$9().mark(function _callee(details) {
      var _details$data;
      var _yield$api$post, activity, _activity$activity;
      return _regeneratorRuntime$9().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return api.post('/calls/astroline/calls/' + (details === null || details === void 0 ? void 0 : (_details$data = details.data) === null || _details$data === void 0 ? void 0 : _details$data.id) + '/end', _objectSpread$4({}, details));
          case 2:
            _yield$api$post = _context.sent;
            activity = _yield$api$post.data;
            if (launchCCF) {
              api.get("/bobjects/".concat(activity === null || activity === void 0 ? void 0 : (_activity$activity = activity.activity) === null || _activity$activity === void 0 ? void 0 : _activity$activity.value, "/form?injectReferences=true")).then(function (response) {
                var activityToCCF = fillReferenceFields(response === null || response === void 0 ? void 0 : response.data);
                if (response !== null && response !== void 0 && response.data) {
                  setActivityCCF(activityToCCF);
                }
                openCorrectContactFlow(activityToCCF);
              });
            }
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function createCallAndLaunchCCF(_x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  useEffect(function () {
    var listener = function listener(_ref3) {
      var _details$data2;
      var details = _ref3.data;
      if ((details === null || details === void 0 ? void 0 : details.type) === 'phone:terminated' && details !== null && details !== void 0 && (_details$data2 = details.data) !== null && _details$data2 !== void 0 && _details$data2.id) {
        createCallAndLaunchCCF(details);
      }
    };
    window.addEventListener('message', listener);
    return function () {
      return window.removeEventListener('message', listener);
    };
  }, []);
  function handleClose() {
    setActivityCCF(null);
    setShowCorrectContactFlow(false);
    setMainActivityBobject(null);
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx("iframe", {
      className: styles$7.dialer,
      name: "sf",
      id: "sf",
      src: "https://softphone.kunzite.app/",
      frameBorder: "0",
      width: "320",
      height: "460",
      allow: "camera *;microphone *"
    }), showCorrectContactFlow && activityCCF && mainActivityBobject && openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activityCCF, {
      referenceBobject: mainActivityBobject,
      handleClose: handleClose
    })]
  });
};

function _typeof$d(obj) { "@babel/helpers - typeof"; return _typeof$d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$d(obj); }
function _regeneratorRuntime$8() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$8 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$d(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$b(arr) || _nonIterableSpread$1(); }
function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$b(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$b(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$b(o, minLen); }
function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$b(arr); }
function _arrayLikeToArray$b(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep$8(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$8(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$8(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$8(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function createDevice(_x, _x2, _x3, _x4, _x5, _x6) {
  return _createDevice.apply(this, arguments);
}
function _createDevice() {
  _createDevice = _asyncToGenerator$8( /*#__PURE__*/_regeneratorRuntime$8().mark(function _callee2(onDeviceCreated, onIncomingCall, refreshToken, setState, setError, t) {
    var _response$data2;
    var response, token, device, handleSuccessfulRegistration;
    return _regeneratorRuntime$8().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return api.post('/utils/service/twilio-auth/token', {});
        case 2:
          response = _context2.sent;
          token = response === null || response === void 0 ? void 0 : (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.token;
          if (!(!token || Object.keys(token).length === 0)) {
            _context2.next = 7;
            break;
          }
          setError({
            description: t('dialer.hints.invalidToken'),
            explanation: t('dialer.hints.invalidToken_explanation')
          });
          throw new Error('No token provided');
        case 7:
          device = new Device(token);
          handleSuccessfulRegistration = function handleSuccessfulRegistration() {
            console.log('The device is ready to receive incoming calls.');
            setState('errors', []);
            setState('status', DialerStatus.idle);
          };
          device.on('registered', handleSuccessfulRegistration);
          device.on('error', function (e) {
            return setError(e);
          });
          device.on('incoming', onIncomingCall);
          device.on('tokenWillExpire', refreshToken);
          setState('status', DialerStatus.registering);
          if (!(device.state === 'unregistered')) {
            _context2.next = 17;
            break;
          }
          _context2.next = 17;
          return device.register();
        case 17:
          onDeviceCreated(device);
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _createDevice.apply(this, arguments);
}
function DeviceHandler() {
  var _useDialerStore = useDialerStore(),
    startCall = _useDialerStore.startCall,
    snapshot = _useDialerStore.snapshot,
    emit = _useDialerStore.emit,
    setState = _useDialerStore.setState;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  function handleIncomingCall(call) {
    if (snapshot().device.isBusy) {
      call.ignore();
    } else {
      setState('open', DialerOpenStatus.open);
      setState('status', DialerStatus.incoming);
      setState('dialedPhoneNumber', call.parameters.From);
      startCall(call);
    }
  }
  function refreshToken() {
    return _refreshToken.apply(this, arguments);
  }
  function _refreshToken() {
    _refreshToken = _asyncToGenerator$8( /*#__PURE__*/_regeneratorRuntime$8().mark(function _callee() {
      var _response$data;
      var response, token;
      return _regeneratorRuntime$8().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return api.post('/utils/service/twilio-auth/token', {});
          case 2:
            response = _context.sent;
            token = response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.token;
            if (!(!token || Object.keys(token).length === 0)) {
              _context.next = 6;
              break;
            }
            return _context.abrupt("return");
          case 6:
            snapshot().device.updateToken(String(token));
            setState('errors', []);
            emit();
          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _refreshToken.apply(this, arguments);
  }
  function setError(error) {
    console.error('Error while creating the device: ', error);
    setState('errors', [].concat(_toConsumableArray$1(snapshot().errors), [error]));
  }
  useEffect(function () {
    createDevice(function (device) {
      setState('device', device);
    }, handleIncomingCall, refreshToken, setState, setError, t)["catch"](function (e) {
      console.error('Error creating the twilio device', e);
    });
  }, []);
  return null;
}

var css_248z$7 = ".bobjectItem-module_bobjectItemCompressed__SgzV4 {\n  height: 48px;\n  display: flex;\n  align-items: center;\n  padding: 2px 12px;\n  cursor: pointer;\n}\n\n.bobjectItem-module_bobjectItemCompressed__SgzV4:hover {\n  background-color: var(--veryLightBloobirds);\n}\n\n.bobjectItem-module_circleIcon__rdQLd {\n  height: 33px;\n  width: 33px;\n  min-width: 33px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--lightestBloobirds);\n  border-radius: 50%;\n}\n\n.bobjectItem-module_circleIconLightBloobirds__92RrO {\n  height: 24px;\n  width: 24px;\n  min-width: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--lightBloobirds);\n  border-radius: 50%;\n}\n\n.bobjectItem-module_bobjectItemContent__lLIHZ {\n  margin-left: 8px;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  justify-content: space-around;\n  width: 220px;\n}\n\n.bobjectItem-module_bobjectItemName__8UG2l {\n  height: 20px;\n  width: -moz-fit-content;\n  width: fit-content;\n  cursor: pointer;\n}\n\n.bobjectItem-module_bobjectItemNameSpan__82mJL {\n  max-width: 216px;\n  white-space: nowrap;\n  display: inline-block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.bobjectItem-module_bobjectItemContentInfoRow__NcbFo {\n  display: flex;\n  flex-direction: row;\n}\n\n.bobjectItem-module_bobjectItemContentSpan__L4Puo {\n  height: 16px;\n  white-space: nowrap;\n  display: inline-block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 110px;\n}\n\n.bobjectItem-module_bobjectItemContentInfoRowSeparator__R3tuw {\n  height: 100%;\n  display: flex;\n  flex-direction: row;\n  gap: 1px;\n  margin-right: 2px;\n  margin-left: 2px;\n}\n\n.bobjectItem-module_searchResultsList__l05Zd {\n  max-height: 700px;\n}\n\n.bobjectItem-module_bobjectItemCompressed__SgzV4 {\n  height: 48px;\n  display: flex;\n  align-items: center;\n  padding: 2px 12px;\n  cursor: pointer;\n}\n\n.bobjectItem-module_bobjectItemCompressed__SgzV4:hover {\n  background-color: var(--veryLightBloobirds);\n}\n\n.bobjectItem-module_noResultFound__IOs6H {\n  position: relative;\n  width: 100%;\n  height: 272px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.bobjectItem-module_text__iQvya {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  padding: 30px;\n}\n";
var bobjectStyles = {"bobjectItemCompressed":"bobjectItem-module_bobjectItemCompressed__SgzV4","circleIcon":"bobjectItem-module_circleIcon__rdQLd","circleIconLightBloobirds":"bobjectItem-module_circleIconLightBloobirds__92RrO","bobjectItemContent":"bobjectItem-module_bobjectItemContent__lLIHZ","bobjectItemName":"bobjectItem-module_bobjectItemName__8UG2l","bobjectItemNameSpan":"bobjectItem-module_bobjectItemNameSpan__82mJL","bobjectItemContentInfoRow":"bobjectItem-module_bobjectItemContentInfoRow__NcbFo","bobjectItemContentSpan":"bobjectItem-module_bobjectItemContentSpan__L4Puo","bobjectItemContentInfoRowSeparator":"bobjectItem-module_bobjectItemContentInfoRowSeparator__R3tuw","searchResultsList":"bobjectItem-module_searchResultsList__l05Zd","noResultFound":"bobjectItem-module_noResultFound__IOs6H","text":"bobjectItem-module_text__iQvya"};
styleInject(css_248z$7);

var css_248z$6 = ".dialer-module_container__b-Hhi {\n  font-family: 'Inter', sans-serif !important;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  z-index: 102;\n  pointer-events: none;\n}\n\n.dialer-module_container__b-Hhi p {\n  font-family: 'Inter', sans-serif !important;\n}\n\n.dialer-module_floatingBox__RPXD- {\n  width: 60px;\n  height: 60px;\n  border: 3px solid #d9f0c0;\n  border-radius: 8px;\n  background-color: #63ba00;\n  box-sizing: border-box;\n  box-shadow: 0 2px 20px rgba(99, 186, 0, 0.33);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  bottom: 16px;\n  left: 64px;\n  pointer-events: initial;\n}\n\n.dialer-module_floatingDragIcon__dPWH0 {\n  position: absolute;\n  display: block;\n  left: 2px;\n  overflow: hidden;\n  width: 14px;\n}\n\n.dialer-module_floatingBox__RPXD-:hover {\n  cursor: pointer;\n  box-shadow: 0 2px 20px rgb(99 186 0 / 80%);\n}\n\n.dialer-module_closeButton__lC5sY {\n  display: none;\n  position: absolute;\n  top: -8px;\n  right: -8px;\n  height: 16px;\n  width: 16px;\n  border-radius: 50%;\n  background-color: var(--peanut);\n  align-items: center;\n}\n\n.dialer-module_floatingBox__RPXD-:hover > .dialer-module_closeButton__lC5sY {\n  display: flex;\n}\n\n.dialer-module_content__bE3yG {\n  display: inline-block;\n  position: relative;\n  pointer-events: all;\n  z-index: 1;\n}\n\n.dialer-module_contentAircall__z0UoY {\n  width: 376px;\n}\n\n.dialer-module_contentBox__r-Scv {\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  border: 1px solid #9acfff;\n  box-shadow: 0px 2px 20px rgba(25, 145, 255, 0.15);\n  border-radius: 8px;\n  background-color: #ffffff;\n}\n\n.dialer-module_contentBoxBloobirds__bZESY {\n  height: 640px;\n  width: 320px;\n}\n\n.dialer-module_contentBoxNumintec__PFa69 {\n  height: auto;\n  width: 420px;\n}\n\n.dialer-module_contentBoxRingover__LPstS {\n  height: auto;\n  width: 378px;\n}\n\n.dialer-module_contentBoxOthers__yeILq {\n  height: auto;\n  width: 320px;\n}\n\n.dialer-module_contentBoxAircall__xZ4x4 {\n  width: 376px;\n  height: auto;\n}\n\n.dialer-module_header__OgJDS {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 16px;\n}\n\n.dialer-module_header__OgJDS:hover {\n  cursor: grab;\n}\n\n.dialer-module_header__OgJDS:active {\n  cursor: grabbing;\n}\n\n.dialer-module_headerIcons__GwC9T {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.dialer-module_headerClose__gXWGI {\n  cursor: pointer;\n}\n\n.dialer-module_closeDisabled__bFsxE {\n  cursor: initial;\n}\n\n.dialer-module_headerTabs__jy5qK {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.dialer-module_headerDragger__F4ZO0 {\n  display: none;\n  position: absolute;\n  overflow: hidden;\n  height: 14px;\n  top: 8px;\n  left: calc(50% - 12px);\n}\n\n.dialer-module_feedback__xXBzS {\n  height: 16px;\n}\n\n.dialer-module_dialSpinner__Gk7JG {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.dialer-module_headerDragger__F4ZO0:hover {\n  cursor: grab;\n}\n\n.dialer-module_headerDragger__F4ZO0:active {\n  cursor: grabbing;\n}\n\n.dialer-module_header__OgJDS:hover > .dialer-module_headerDragger__F4ZO0 {\n  display: block;\n}\n\n.dialer-module_headerTab__d7ZkR {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 2px 4px 2px 2px;\n  cursor: pointer;\n}\n\n.dialer-module_headerTab__d7ZkR > p {\n  display: none;\n}\n\n.dialer-module_headerTab_active__GnjmM {\n  border-bottom: 2px solid var(--bloobirds);\n}\n\n.dialer-module_headerTab_active__GnjmM > p {\n  display: block;\n}\n\n.dialer-module_headerTab_disabled__Ne828 {\n  cursor: initial;\n}\n\n/*Dial*/\n.dialer-module_dial__aAAaE {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  padding: 16px;\n}\n\n.dialer-module_dialInput__WciSP {\n  width: 100%;\n  height: 48px;\n  box-sizing: border-box;\n  border-radius: 4px;\n  background-color: #edf1f5;\n  padding: 0 12px;\n  font-style: normal;\n  font-weight: 500;\n  font-size: 25px;\n  line-height: 32px;\n  color: var(--bloobirds);\n  margin-bottom: 8px;\n  border: none;\n}\n\n.dialer-module_dialInput__WciSP::-moz-placeholder {\n  color: var(--softPeanut);\n  font-weight: 400;\n  font-size: 13px;\n  line-height: 24px;\n  position: relative;\n  bottom: 3px;\n}\n\n.dialer-module_dialInput__WciSP::placeholder {\n  color: var(--softPeanut);\n  font-weight: 400;\n  font-size: 13px;\n  line-height: 24px;\n  position: relative;\n  bottom: 3px;\n}\n\n.dialer-module_dialInput__WciSP:focus {\n  outline: none;\n}\n\n.dialer-module_dialInput__WciSP {\n  box-shadow: none;\n}\n\n.dialer-module_dialInput__WciSP:focus {\n  box-shadow: none;\n}\n\n.dialer-module_dialInput__WciSP:hover {\n  box-shadow: none;\n}\n\n.dialer-module_dialHelpText__LgMJW > p {\n  font-size: 11px;\n}\n\n.dialer-module_dialHelpTextNotConfig__-SMoZ > p {\n  font-size: 13px;\n}\n\n.dialer-module_dialMatchText__o4gMv {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n}\n\n/*DialerStatusHeader*/\n.dialer-module_statusHeader__o7bHj {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 16px 4px;\n}\n\n.dialer-module_headerButton__NUlid {\n  color: var(--peanut) !important;\n}\n\n.dialer-module_headerButtons__zoezq {\n  display: flex;\n  gap: 4px;\n}\n\n.dialer-module_pitchButtonActivated__IKcM4 {\n  background-color: var(--verySoftPurple);\n}\n\n.dialer-module_notesButtonActivated__mUz25 {\n  background-color: var(--verySoftBanana);\n}\n\n.dialer-module_actionsPanel__6yzPo {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  padding: 8px 16px;\n}\n\n/*DialerRingHangButton*/\n.dialer-module_ringHangupButton__Gb7ZN {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 60px;\n  width: 60px;\n  border-radius: 50%;\n  /* extra/call */\n  background: #63ba00;\n  /* extra/call-very-soft */\n  border: 2px solid #d9f0c0;\n  cursor: pointer;\n}\n\n.dialer-module_ringHangupButton_hangup__FTfhJ {\n  /* extra/meeting */\n  background: #f53158;\n  /* extra/meeting-very-soft */\n  border: 2px solid #ffb3c2;\n}\n\n.dialer-module_ringHangupButton_loading__OZTkt {\n  background: #ff8433;\n  border: 2px solid #ffd9c2;\n}\n\n.dialer-module_ringHangupButton_animate__0u-kw:before {\n  content: '';\n  position: absolute;\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  border: 1px solid #d9f0c0;\n  animation: dialer-module_animateRingButton__BkSB2 1.5s linear infinite;\n}\n\n.dialer-module_ringHangupButton_animate__0u-kw:after {\n  content: '';\n  position: absolute;\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  border: 2px solid #d9f0c0;\n  animation: dialer-module_animateRingButton__BkSB2 1.5s linear infinite;\n  animation-delay: 0.4s;\n}\n\n.dialer-module_ringHangupButton_hangup__FTfhJ.dialer-module_ringHangupButton_animate__0u-kw:before {\n  border: 1px solid #ffb3c2;\n}\n\n.dialer-module_ringHangupButton_hangup__FTfhJ.dialer-module_ringHangupButton_animate__0u-kw:after {\n  border: 2px solid #ffb3c2;\n}\n\n.dialer-module_ringHangupButton_disabled__Obeyo {\n  opacity: 50%;\n  cursor: default;\n}\n\n@keyframes dialer-module_animateRingButton__BkSB2 {\n  0% {\n    transform: scale(0.5);\n    opacity: 0;\n  }\n  50% {\n    transform: scale(1);\n    opacity: 1;\n  }\n  100% {\n    transform: scale(1.4);\n    opacity: 0;\n  }\n}\n\n.dialer-module_ringHangupButtonContainer__YxDAZ {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n}\n\n/* DialerConnectionHint */\n.dialer-module_connectionHint__ikt1w {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 8px;\n  gap: 8px;\n}\n\n.dialer-module_textAuthorizing__cr90X > p {\n  font-size: 11px;\n}\n\n.dialer-module_hintIcon__uxbb6 {\n  height: 8px;\n  width: 8px;\n  background-color: var(--extraCall);\n  border-radius: 50%;\n}\n\n.dialer-module_hintIcon_yellow__JtiiQ {\n  background-color: #ff8433;\n}\n\n/* DialerHelpMessage */\n.dialer-module_helpMessage__8V8Km {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n\n.dialer-module_helpMessage__8V8Km > p {\n  font-size: 10px;\n}\n\n/*DialerUserPhoneSelector */\n.dialer-module_userPhoneSelector__MIU31 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n  margin-top: 8px;\n}\n\n.dialer-module_userPhoneSelector_disabled__JO-14 {\n  cursor: default;\n}\n\n.dialer-module_userPhoneSelectorLabels__AQ3VC {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n}\n\n.dialer-module_userPhoneSelectorLabels__AQ3VC > p {\n  font-size: 10px;\n}\n\n/* DialPad */\n.dialer-module_dialPad__Wjz5t {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  width: 100%;\n  padding: 16px 60px;\n  box-sizing: border-box;\n  gap: 8px;\n}\n\n.dialer-module_dialPadRow__oJmIe {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n.dialer-module_dialPadRow__oJmIe:is(:last-child) {\n  justify-content: space-evenly;\n  margin-top: 8px;\n}\n\n.dialer-module_dialPadButton__lR0oL {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 40px;\n  cursor: pointer;\n}\n\n.dialer-module_dialPadButton__lR0oL > svg {\n  margin: auto;\n}\n\n.dialer-module_dialPadButton__lR0oL > p:not(:first-child) {\n  font-size: 10px;\n}\n\n/* DialerCallDirection */\n.dialer-module_callDirectionContainer__Oh67x {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  gap: 8px;\n  padding: 4px;\n}\n\n.dialer-module_callDirection__ceAv1 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n\n.dialer-module_directionSelector__5kD3U {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  background-color: var(--bloobirds);\n  border-radius: 8px;\n  width: 30px;\n  height: 16px;\n}\n\n.dialer-module_directionSelector__5kD3U > div {\n  background-color: white;\n  height: 12px;\n  width: 12px;\n  border-radius: 50%;\n  margin: 2px;\n}\n\n.dialer-module_directionSelector__left__uRErt {\n  justify-content: flex-start;\n}\n\n.dialer-module_directionSelector__right__GTt6R {\n  justify-content: flex-end;\n}\n\n.dialer-module_callDirectionLabel__-6fWu {\n  display: flex;\n  align-items: center;\n  width: 68px;\n}\n\n.dialer-module_callDirectionLabel__-6fWu > p {\n  width: 100%;\n}\n\n/* LogCallButton */\n.dialer-module_logCallButton__tOPy2 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: calc(100% - 32px);\n  height: 40px;\n  background-color: var(--extraCall);\n  color: white;\n  border-radius: 4px;\n  padding: 12px 16px;\n  box-sizing: border-box;\n  cursor: pointer;\n  margin: 16px;\n  font-size: 13px;\n  gap: 4px;\n}\n\n.dialer-module_logCallButton__disabled__tGyU-,\n.dialer-module_dialPadButton__disabled__XQjBi {\n  opacity: 50%;\n  cursor: default;\n}\n\n.dialer-module_spacer__gbOEP {\n  flex-grow: 1;\n}\n\n/* DialerErrorWarning */\n.dialer-module_errorWarning__wM2Ih {\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n  gap: 16px;\n  border-radius: 28px;\n  width: 304px;\n  box-sizing: border-box;\n  left: 8px;\n  top: 8px;\n  z-index: 1;\n}\n\n.dialer-module_errorWarning_error__Mf9cY {\n  background-color: #f53158;\n}\n\n.dialer-module_errorWarning_warning__KTKs7 {\n  background-color: #ffbd19;\n}\n\n.dialer-module_errorWarning__wM2Ih > div {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n\n.dialer-module_errorWarning__wM2Ih > div > p {\n  font-size: 15px;\n}\n\n.dialer-module_errorWarning__wM2Ih > div > svg {\n  flex-shrink: 0;\n}\n\n.dialer-module_errorWarning__wM2Ih > button {\n  position: absolute;\n  top: 12px;\n  right: 16px;\n}\n\n/* NotePanel */\n.dialer-module_notePanel__qaQl- {\n  position: absolute;\n  bottom: 1px;\n  height: 300px;\n  background-color: white;\n  border-radius: 0 0 8px 8px;\n  width: calc(100% - 2px);\n  overflow-y: hidden;\n  border-top: 1px solid #d4e0f1;\n  overflow-x: hidden;\n}\n\n.dialer-module_notePanelManual__W425w {\n  height: 220px;\n  bottom: 92px;\n}\n\n.dialer-module_editorContent__6F4QG {\n  overflow-y: auto;\n  overflow-x: hidden;\n  padding-top: 12px;\n  padding-bottom: 12px;\n}\n\neditorContent {\n  height: calc(100% - 35px);\n  position: relative;\n}\n\n.dialer-module_notePanelManual__W425w .dialer-module_editorContent__6F4QG {\n  height: 100%;\n}\n\n.dialer-module_closeNotePanel__rRDUX {\n  position: absolute;\n  right: 12px;\n  top: 12px;\n  cursor: pointer;\n  z-index: 10;\n}\n\n.dialer-module_toolbar__sdR2Y {\n  position: fixed;\n  bottom: 1px;\n  border-top: 1px solid #d4e0f1;\n  width: 100%;\n}\n\n.dialer-module_notePanelManual__W425w .dialer-module_toolbar__sdR2Y {\n  width: calc(100% - 2px);\n}\n\n.dialer-module_toolbarManual__AegUX {\n  bottom: 60px;\n}\n\n.dialer-module_notePanelButton__PE9AD {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  margin: 0;\n}\n\n.dialer-module_notePanelButton__PE9AD > button {\n  border: 1px solid var(--peanut);\n  border-radius: 4px;\n  font-size: 10px;\n}\n\n.dialer-module_dialResults__g84ib {\n  margin-top: -6px;\n}\n\n.dialer-module_noConfig__DWHRX {\n  margin-bottom: 40px;\n}\n\n.dialer-module_warning__pi6tA {\n  display: flex;\n}\n\n.dialer-module_warning__pi6tA > span {\n  height: 20px;\n  width: 20px;\n  padding: 2px;\n}\n\n.dialer-module_warning__pi6tA path {\n  fill: var(--peanut);\n}\n\n.dialer-module_bobject__HNTdG {\n  min-width: 0;\n}\n\n.dialer-module_bobject__HNTdG > div {\n  display: flex;\n}\n\n.dialer-module_bobject__HNTdG > div > p {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.dialer-module__bobjectName__yKEIL:hover {\n  cursor: pointer;\n  color: var(--darkBloobirds);\n}\n";
var styles$6 = {"container":"dialer-module_container__b-Hhi","floatingBox":"dialer-module_floatingBox__RPXD-","floatingDragIcon":"dialer-module_floatingDragIcon__dPWH0","closeButton":"dialer-module_closeButton__lC5sY","content":"dialer-module_content__bE3yG","contentAircall":"dialer-module_contentAircall__z0UoY","contentBox":"dialer-module_contentBox__r-Scv","contentBoxBloobirds":"dialer-module_contentBoxBloobirds__bZESY","contentBoxNumintec":"dialer-module_contentBoxNumintec__PFa69","contentBoxRingover":"dialer-module_contentBoxRingover__LPstS","contentBoxOthers":"dialer-module_contentBoxOthers__yeILq","contentBoxAircall":"dialer-module_contentBoxAircall__xZ4x4","header":"dialer-module_header__OgJDS","headerIcons":"dialer-module_headerIcons__GwC9T","headerClose":"dialer-module_headerClose__gXWGI","closeDisabled":"dialer-module_closeDisabled__bFsxE","headerTabs":"dialer-module_headerTabs__jy5qK","headerDragger":"dialer-module_headerDragger__F4ZO0","feedback":"dialer-module_feedback__xXBzS","dialSpinner":"dialer-module_dialSpinner__Gk7JG","headerTab":"dialer-module_headerTab__d7ZkR","headerTab_active":"dialer-module_headerTab_active__GnjmM","headerTab_disabled":"dialer-module_headerTab_disabled__Ne828","dial":"dialer-module_dial__aAAaE","dialInput":"dialer-module_dialInput__WciSP","dialHelpText":"dialer-module_dialHelpText__LgMJW","dialHelpTextNotConfig":"dialer-module_dialHelpTextNotConfig__-SMoZ","dialMatchText":"dialer-module_dialMatchText__o4gMv","statusHeader":"dialer-module_statusHeader__o7bHj","headerButton":"dialer-module_headerButton__NUlid","headerButtons":"dialer-module_headerButtons__zoezq","pitchButtonActivated":"dialer-module_pitchButtonActivated__IKcM4","notesButtonActivated":"dialer-module_notesButtonActivated__mUz25","actionsPanel":"dialer-module_actionsPanel__6yzPo","ringHangupButton":"dialer-module_ringHangupButton__Gb7ZN","ringHangupButton_hangup":"dialer-module_ringHangupButton_hangup__FTfhJ","ringHangupButton_loading":"dialer-module_ringHangupButton_loading__OZTkt","ringHangupButton_animate":"dialer-module_ringHangupButton_animate__0u-kw","animateRingButton":"dialer-module_animateRingButton__BkSB2","ringHangupButton_disabled":"dialer-module_ringHangupButton_disabled__Obeyo","ringHangupButtonContainer":"dialer-module_ringHangupButtonContainer__YxDAZ","connectionHint":"dialer-module_connectionHint__ikt1w","textAuthorizing":"dialer-module_textAuthorizing__cr90X","hintIcon":"dialer-module_hintIcon__uxbb6","hintIcon_yellow":"dialer-module_hintIcon_yellow__JtiiQ","helpMessage":"dialer-module_helpMessage__8V8Km","userPhoneSelector":"dialer-module_userPhoneSelector__MIU31","userPhoneSelector_disabled":"dialer-module_userPhoneSelector_disabled__JO-14","userPhoneSelectorLabels":"dialer-module_userPhoneSelectorLabels__AQ3VC","dialPad":"dialer-module_dialPad__Wjz5t","dialPadRow":"dialer-module_dialPadRow__oJmIe","dialPadButton":"dialer-module_dialPadButton__lR0oL","callDirectionContainer":"dialer-module_callDirectionContainer__Oh67x","callDirection":"dialer-module_callDirection__ceAv1","directionSelector":"dialer-module_directionSelector__5kD3U","directionSelector__left":"dialer-module_directionSelector__left__uRErt","directionSelector__right":"dialer-module_directionSelector__right__GTt6R","callDirectionLabel":"dialer-module_callDirectionLabel__-6fWu","logCallButton":"dialer-module_logCallButton__tOPy2","logCallButton__disabled":"dialer-module_logCallButton__disabled__tGyU-","dialPadButton__disabled":"dialer-module_dialPadButton__disabled__XQjBi","spacer":"dialer-module_spacer__gbOEP","errorWarning":"dialer-module_errorWarning__wM2Ih","errorWarning_error":"dialer-module_errorWarning_error__Mf9cY","errorWarning_warning":"dialer-module_errorWarning_warning__KTKs7","notePanel":"dialer-module_notePanel__qaQl-","notePanelManual":"dialer-module_notePanelManual__W425w","editorContent":"dialer-module_editorContent__6F4QG","closeNotePanel":"dialer-module_closeNotePanel__rRDUX","toolbar":"dialer-module_toolbar__sdR2Y","toolbarManual":"dialer-module_toolbarManual__AegUX","notePanelButton":"dialer-module_notePanelButton__PE9AD","dialResults":"dialer-module_dialResults__g84ib","noConfig":"dialer-module_noConfig__DWHRX","warning":"dialer-module_warning__pi6tA","bobject":"dialer-module_bobject__HNTdG","_bobjectName":"dialer-module__bobjectName__yKEIL"};
styleInject(css_248z$6);

function _typeof$c(obj) { "@babel/helpers - typeof"; return _typeof$c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$c(obj); }
function _regeneratorRuntime$7() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$7 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$c(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty$a(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$a(obj, key, value) { key = _toPropertyKey$a(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$a(arg) { var key = _toPrimitive$a(arg, "string"); return _typeof$c(key) === "symbol" ? key : String(key); }
function _toPrimitive$a(input, hint) { if (_typeof$c(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$c(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$a(arr, i) { return _arrayWithHoles$a(arr) || _iterableToArrayLimit$a(arr, i) || _unsupportedIterableToArray$a(arr, i) || _nonIterableRest$a(); }
function _nonIterableRest$a() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$a(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$a(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$a(o, minLen); }
function _arrayLikeToArray$a(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$a(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$a(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$7(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var ICONS = {
  Lead: 'person',
  Company: 'company',
  Opportunity: 'fileOpportunity'
};
function tryToMatchPhoneNumber(_x, _x2, _x3) {
  return _tryToMatchPhoneNumber.apply(this, arguments);
}
function _tryToMatchPhoneNumber() {
  _tryToMatchPhoneNumber = _asyncToGenerator$7( /*#__PURE__*/_regeneratorRuntime$7().mark(function _callee(dialedPhoneNumber, bobjectId, setMatchedBobject) {
    var response, bobjects, _bobject, type, isLead, name, leadCompanyId, foundBobject;
    return _regeneratorRuntime$7().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          setMatchedBobject(null);
          _context.prev = 1;
          _context.next = 4;
          return api.post('/calls/whiteLabel/search', {
            phoneNumber: dialedPhoneNumber
          });
        case 4:
          response = _context.sent;
          if (!(response.status === 200)) {
            _context.next = 14;
            break;
          }
          bobjects = response.data;
          if (!(bobjects.length === 0)) {
            _context.next = 10;
            break;
          }
          setMatchedBobject({
            hasMatched: false
          });
          return _context.abrupt("return");
        case 10:
          if (!bobjectId || bobjects.length === 1) {
            _bobject = bobjects[0];
          } else {
            _bobject = bobjects.find(function (b) {
              return b.id.value === bobjectId;
            });
          }
          if (_bobject) {
            type = _bobject.id.typeName;
            isLead = type === BobjectTypes.Lead;
            name = getTextFromLogicRole(_bobject, type.toUpperCase() + (isLead ? '__FULL_NAME' : '__NAME'));
            leadCompanyId = isLead && getTextFromLogicRole(_bobject, LEAD_FIELDS_LOGIC_ROLE.COMPANY);
            foundBobject = {
              bobject: _bobject,
              companyId: leadCompanyId,
              id: _bobject.id.value,
              name: name,
              type: type,
              hasMatched: true
            };
            setMatchedBobject(foundBobject);
          } else {
            setMatchedBobject({
              hasMatched: false
            });
          }
          window.dispatchEvent(new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
            detail: {
              type: BobjectTypes.Activity
            }
          }));
          if (bobjectId) {
            window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension, {
              detail: {
                bobjectId: bobjectId,
                avoidRefreshBobjectFromContext: true
              }
            }));
          }
        case 14:
          if (response.status === 404) {
            setMatchedBobject({
              hasMatched: false
            });
          }
          _context.next = 21;
          break;
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          setMatchedBobject({
            hasMatched: false
          });
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 17]]);
  }));
  return _tryToMatchPhoneNumber.apply(this, arguments);
}
var debounceTryToMatchPhoneNumber = debounce(tryToMatchPhoneNumber, 500);
var isValidPhone = function isValidPhone(phone) {
  try {
    return isValidPhone$1(phone);
  } catch (e) {
    return false;
  }
};
function isNumeric(value) {
  return /^\d+$/.test(value);
}
var getName = function getName(bobject) {
  switch (bobject.bobjectType) {
    case 'Lead':
      return bobject === null || bobject === void 0 ? void 0 : bobject.fullName;
    default:
      return bobject === null || bobject === void 0 ? void 0 : bobject.companyName;
  }
};
var Dial = function Dial() {
  var parentRef = useRef(null);
  var _useState = useState(null),
    _useState2 = _slicedToArray$a(_useState, 2),
    search = _useState2[0],
    setSearch = _useState2[1];
  var _useState3 = useState(),
    _useState4 = _slicedToArray$a(_useState3, 2),
    noResults = _useState4[0],
    setNoResults = _useState4[1];
  var _useState5 = useState([]),
    _useState6 = _slicedToArray$a(_useState5, 2),
    bobjectsWithSamePhone = _useState6[0],
    setBobjectsWithSamePhone = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray$a(_useState7, 2),
    openSearch = _useState8[0],
    setOpenSearch = _useState8[1];
  var _useDialerStore = useDialerStore(),
    setDialedPhoneNumber = _useDialerStore.setDialedPhoneNumber,
    setMatchedBobject = _useDialerStore.setMatchedBobject,
    snapshot = _useDialerStore.snapshot;
  var dialedPhoneNumber = useDialer(function (state) {
    return state.dialedPhoneNumber;
  });
  var bobjectId = useDialer(function (state) {
    return state.bobjectId;
  });
  var status = useDialer(function (state) {
    return state.status;
  });
  var bobjectOfPhone = useDialer(function (state) {
    return state.bobjectMatch;
  });
  var tab = useDialer(function (state) {
    return state.tab;
  });
  var open = useDialer(function (state) {
    return state.open;
  });
  var dialRef = useRef();
  //preload the suggested templates
  useSuggestedTemplates(bobjectOfPhone === null || bobjectOfPhone === void 0 ? void 0 : bobjectOfPhone.bobject, undefined, PlaybookTab.PITCHES);
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var accountId = settings === null || settings === void 0 ? void 0 : settings.account.id;
  var shouldRenderLoader = bobjectOfPhone && bobjectOfPhone.hasMatched === undefined && (dialedPhoneNumber === null || dialedPhoneNumber === void 0 ? void 0 : dialedPhoneNumber.startsWith('+')) && (dialedPhoneNumber === null || dialedPhoneNumber === void 0 ? void 0 : dialedPhoneNumber.length) >= 9;
  var isNumber = search && search.length > 0 && (search.startsWith('+') && search.length >= 9 || isValidPhone(search)) || isNumeric(search);
  var handleChange = function handleChange(bobject) {
    var _bobject$rawBobject;
    if ((bobject === null || bobject === void 0 ? void 0 : (_bobject$rawBobject = bobject.rawBobject) === null || _bobject$rawBobject === void 0 ? void 0 : _bobject$rawBobject.id) !== bobjectId) {
      var _bobject$rawBobject2;
      setDialedPhoneNumber(bobject.phone, bobject === null || bobject === void 0 ? void 0 : (_bobject$rawBobject2 = bobject.rawBobject) === null || _bobject$rawBobject2 === void 0 ? void 0 : _bobject$rawBobject2.id);
    }
    setOpenSearch(false);
  };
  useEffect(function () {
    if (open !== DialerOpenStatus.closed) {
      setMatchedBobject(null);
      // If the dialedPhoneNumber is a e.164 number (starts with +) and the lenght is the minimum lenght for a e.164 number (starts with + and has at least 8 digits after the +)
      // then we try to find the number in the bobjects
      if (dialedPhoneNumber && dialedPhoneNumber.startsWith('+') && dialedPhoneNumber.length >= 9) {
        debounceTryToMatchPhoneNumber(dialedPhoneNumber, bobjectId, setMatchedBobject);
      }
      if (dialedPhoneNumber) {
        setSearch(dialedPhoneNumber);
      }
    } else {
      setSearch(null);
    }
  }, [dialedPhoneNumber, bobjectId, open]);
  useEffect(function () {
    if (search !== null && search !== dialedPhoneNumber) {
      if (isNumber && noResults) {
        setDialedPhoneNumber(search);
      } else {
        setDialedPhoneNumber('');
      }
    }
  }, [search, noResults, isNumber]);
  useEffect(function () {
    if (status === DialerStatus.idle) {
      setSearch(null);
    }
  }, [status]);
  useEffect(function () {
    var handleKeyPress = function handleKeyPress(e) {
      if (/^[0-9#*+]$/.test(e.key) && status === DialerStatus.connected) {
        var _snapshot, _snapshot$call;
        dialRef.current.focus();
        (_snapshot = snapshot()) === null || _snapshot === void 0 ? void 0 : (_snapshot$call = _snapshot.call) === null || _snapshot$call === void 0 ? void 0 : _snapshot$call.sendDigits(e.key);
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return function () {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  var onNameClick = function onNameClick(event) {
    event.preventDefault();
    event.stopPropagation();
    if (bobjectOfPhone !== null && bobjectOfPhone !== void 0 && bobjectOfPhone.id) {
      window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension, {
        detail: {
          bobjectId: bobjectOfPhone === null || bobjectOfPhone === void 0 ? void 0 : bobjectOfPhone.id
        }
      }));
    }
  };
  return /*#__PURE__*/jsxs("div", {
    className: styles$6.dial,
    children: [/*#__PURE__*/jsx(SearchBobjects, {
      accountId: accountId,
      onChange: handleChange,
      anchorElement: function anchorElement() {
        return /*#__PURE__*/jsx("input", {
          className: styles$6.dialInput,
          onChange: function onChange(e) {
            setMatchedBobject(null);
            if (
            //@ts-ignore
            e.nativeEvent.inputType === 'insertFromPaste') {
              setDialedPhoneNumber(e.target.value);
            } else {
              setSearch(e.target.value);
            }
          },
          placeholder: "E.G Bloobirds, +34 123 456 789...",
          disabled: ![DialerStatus.connected, DialerStatus.idle].includes(status) && tab === DialerTab.dialer,
          value: search !== null && search !== void 0 ? search : dialedPhoneNumber,
          ref: dialRef
        });
      },
      hiddenDropdown: !openSearch && Boolean(noResults && isNumber || dialedPhoneNumber || !search),
      customStyles: {
        marginTop: -6
      }
      // @ts-ignore
      ,
      onlyKeyboard: true,
      search: search,
      forceOpen: openSearch,
      setForceOpen: setOpenSearch,
      children: function children(results, totalMatching) {
        var noData = (results === null || results === void 0 ? void 0 : results.length) === 0 ||
        // @ts-ignore
        (results === null || results === void 0 ? void 0 : results.filter(function (item) {
          var _item$phoneNumbers;
          return item.phone || ((_item$phoneNumbers = item.phoneNumbers) === null || _item$phoneNumbers === void 0 ? void 0 : _item$phoneNumbers.length) > 0;
        }).length) === 0;
        setNoResults(noData);
        var phoneNumbersWithData = [];
        var searchIsNumber = search && (search.startsWith('+') || isValidPhone(search));
        results === null || results === void 0 ? void 0 : results.forEach(function (bobject) {
          // @ts-ignore
          var phones = bobject.phoneNumbers || [bobject.phone];
          if (!phones || phones.length === 0 || phones.length === 1 && !phones[0]) {
            return;
          }
          phones.forEach(function (phone) {
            if (searchIsNumber && !phone.includes(search)) {
              return;
            }
            phoneNumbersWithData.push(_objectSpread$3(_objectSpread$3({}, bobject), {}, {
              phone: phone
            }));
          });
        });
        setBobjectsWithSamePhone(results);
        return /*#__PURE__*/jsx("div", {
          ref: parentRef,
          style: {
            maxHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            width: '286px'
          },
          children: phoneNumbersWithData.length > 0 ? /*#__PURE__*/jsx(VirtualInfiniteScroll, {
            parentRef: parentRef,
            rows: phoneNumbersWithData,
            totalRows: totalMatching,
            isFetchingData: !results,
            rowsLength: results.length,
            children: function children(result) {
              var type = result.bobjectType;
              var name = getName(result);
              var phone = result.phone;
              return /*#__PURE__*/jsx("div", {
                onClick: function onClick() {
                  return handleChange(result);
                },
                className: bobjectStyles.dialResult,
                children: /*#__PURE__*/jsxs("div", {
                  className: bobjectStyles.bobjectItemCompressed,
                  children: [/*#__PURE__*/jsx("div", {
                    className: bobjectStyles.circleIcon,
                    children: /*#__PURE__*/jsx(Icon, {
                      name: ICONS[type],
                      size: 20,
                      color: "bloobirds"
                    })
                  }), /*#__PURE__*/jsxs("div", {
                    className: bobjectStyles.bobjectItemContent,
                    children: [/*#__PURE__*/jsx("div", {
                      className: bobjectStyles.bobjectItemName,
                      children: /*#__PURE__*/jsx(Text, {
                        size: "s",
                        color: "bloobirds",
                        className: bobjectStyles.bobjectItemNameSpan,
                        children: /*#__PURE__*/jsx("span", {
                          dangerouslySetInnerHTML: {
                            __html: name
                          }
                        })
                      })
                    }), /*#__PURE__*/jsxs("div", {
                      className: bobjectStyles.bobjectItemContentInfoRow,
                      children: [/*#__PURE__*/jsx(Text, {
                        size: "xs",
                        color: "softPeanut",
                        className: bobjectStyles.bobjectItemContentSpan,
                        children: isValidPhone(phone) ? new AsYouType().input(phone) : phone
                      }), /*#__PURE__*/jsxs("div", {
                        className: bobjectStyles.bobjectItemContentInfoRowSeparator,
                        children: [/*#__PURE__*/jsx(Icon, {
                          name: 'circle',
                          size: 15,
                          color: 'softPeanut'
                        }), /*#__PURE__*/jsx(Icon, {
                          name: 'phone',
                          size: 15,
                          color: 'bloobirds'
                        })]
                      }), /*#__PURE__*/jsx(Text, {
                        size: "xs",
                        color: "bloobirds",
                        className: styles$6.bobjectItemContentSpan,
                        children: t('dialer.dial.mainNumber')
                      })]
                    })]
                  })]
                })
              }, result.id);
            }
          }) : !isNumber && /*#__PURE__*/jsx("div", {
            className: bobjectStyles.noResultFound,
            children: /*#__PURE__*/jsxs("div", {
              className: bobjectStyles.text,
              children: [/*#__PURE__*/jsx(Text, {
                color: "peanut",
                size: "m",
                align: "center",
                weight: "heavy",
                children: t('dialer.dial.emptySearch_a')
              }), /*#__PURE__*/jsx(Text, {
                color: "softPeanut",
                size: "s",
                align: "center",
                children: t('dialer.dial.emptySearch_b')
              })]
            })
          })
        });
      }
    }), /*#__PURE__*/jsxs("div", {
      className: styles$6.feedback,
      children: [!search && !dialedPhoneNumber && (status !== DialerStatus.authorizing ? /*#__PURE__*/jsx("div", {
        className: styles$6.dialHelpText,
        children: /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "softPeanut",
          weight: "bold",
          align: "center",
          children: t('dialer.dial.action')
        })
      }) : /*#__PURE__*/jsx("div", {
        className: styles$6.dialHelpTextNotConfig,
        children: /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "softPeanut",
          weight: "bold",
          align: "center",
          children: t('dialer.dial.setAPhone')
        })
      })), shouldRenderLoader ? /*#__PURE__*/jsx("div", {
        className: styles$6.dialSpinner,
        children: /*#__PURE__*/jsx(Spinner, {
          name: "dots",
          size: 16,
          color: "verySoftPeanut"
        })
      }) : bobjectOfPhone && (bobjectOfPhone.hasMatched ? /*#__PURE__*/jsx("div", {
        className: styles$6.dialMatchText,
        children: (bobjectsWithSamePhone === null || bobjectsWithSamePhone === void 0 ? void 0 : bobjectsWithSamePhone.length) > 1 ? /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx("div", {
            className: styles$6.warning,
            children: /*#__PURE__*/jsx(InfoWarning, {
              message: 'There are multiple records with this phone number'
            })
          }), /*#__PURE__*/jsx("div", {
            style: {
              cursor: 'pointer'
            },
            className: styles$6.bobject,
            onClick: function onClick() {
              setOpenSearch(!openSearch);
              mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_DUPLICATE_LEADS_FROM_DIALER);
            },
            children: /*#__PURE__*/jsx(Tooltip, {
              title: bobjectOfPhone.name,
              position: "top",
              children: /*#__PURE__*/jsx(Text, {
                size: "s",
                color: "bloobirds",
                children: bobjectOfPhone.name
              })
            })
          }), /*#__PURE__*/jsx(IconButton, {
            size: 16,
            name: 'chevronDown',
            color: "peanut",
            onClick: function onClick() {
              setOpenSearch(!openSearch);
              mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_DUPLICATE_LEADS_FROM_DIALER);
            }
          })]
        }) : /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx("div", {
            className: bobjectStyles.circleIconLightBloobirds,
            children: /*#__PURE__*/jsx(Icon, {
              name: bobjectOfPhone.type === 'Lead' ? 'person' : 'company',
              size: 20,
              color: "bloobirds"
            })
          }), /*#__PURE__*/jsx("div", {
            className: styles$6.bobject,
            children: /*#__PURE__*/jsx(Tooltip, {
              title: bobjectOfPhone.name,
              position: "top",
              children: /*#__PURE__*/jsx("span", {
                onClick: onNameClick,
                className: styles$6._bobjectName,
                children: /*#__PURE__*/jsx(Text, {
                  size: "s",
                  color: "bloobirds",
                  children: bobjectOfPhone.name
                })
              })
            })
          })]
        })
      }) : search && /*#__PURE__*/jsxs("div", {
        className: styles$6.dialMatchText,
        children: [/*#__PURE__*/jsx(Icon, {
          name: "phone",
          size: 16,
          color: "peanut"
        }), /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "peanut",
          children: t('dialer.dial.noMatch')
        })]
      }))]
    })]
  });
};

function _typeof$b(obj) { "@babel/helpers - typeof"; return _typeof$b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$b(obj); }
function _defineProperty$9(obj, key, value) { key = _toPropertyKey$9(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$9(arg) { var key = _toPrimitive$9(arg, "string"); return _typeof$b(key) === "symbol" ? key : String(key); }
function _toPrimitive$9(input, hint) { if (_typeof$b(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$b(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function DialPadButton(_ref) {
  var children = _ref.children,
    _onClick = _ref.onClick;
  var status = useDialer(function (state) {
    return state.status;
  });
  var disabled = status === DialerStatus.authorizing;

  // If instance of children is a string, we want to render it as a Text component else we render it as it is
  // If the number is from 2 to 9 we need to render the letters below the number
  return /*#__PURE__*/jsx("div", {
    className: clsx(styles$6.dialPadButton, _defineProperty$9({}, styles$6.dialPadButton__disabled, disabled)),
    onClick: function onClick() {
      if (!disabled) _onClick();
    },
    children: typeof children === 'string' ? /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsx(Text, {
        size: "m",
        color: "peanut",
        align: "center",
        children: children
      }), children === '2' && /*#__PURE__*/jsx(Text, {
        size: "xs",
        color: "softPeanut",
        align: "center",
        children: "ABC"
      }), children === '3' && /*#__PURE__*/jsx(Text, {
        size: "xs",
        color: "softPeanut",
        align: "center",
        children: "DEF"
      }), children === '4' && /*#__PURE__*/jsx(Text, {
        size: "xs",
        color: "softPeanut",
        align: "center",
        children: "GHI"
      }), children === '5' && /*#__PURE__*/jsx(Text, {
        size: "xs",
        color: "softPeanut",
        align: "center",
        children: "JKL"
      }), children === '6' && /*#__PURE__*/jsx(Text, {
        size: "xs",
        color: "softPeanut",
        align: "center",
        children: "MNO"
      }), children === '7' && /*#__PURE__*/jsx(Text, {
        size: "xs",
        color: "softPeanut",
        align: "center",
        children: "PQRS"
      }), children === '8' && /*#__PURE__*/jsx(Text, {
        size: "xs",
        color: "softPeanut",
        align: "center",
        children: "TUV"
      }), children === '9' && /*#__PURE__*/jsx(Text, {
        size: "xs",
        color: "softPeanut",
        align: "center",
        children: "WXYZ"
      })]
    }) : children
  });
}
function DialPad() {
  var _useDialerStore = useDialerStore(),
    setDialedPhoneNumber = _useDialerStore.setDialedPhoneNumber,
    snapshot = _useDialerStore.snapshot;
  var dialedPhoneNumber = useDialer(function (state) {
    return state.dialedPhoneNumber;
  });
  var status = useDialer(function (state) {
    return state.status;
  });
  var handleNumberClick = function handleNumberClick(number) {
    if (status === DialerStatus.idle) {
      setDialedPhoneNumber(dialedPhoneNumber + number);
    }
    if (status === DialerStatus.connected) {
      var _snapshot, _snapshot$call;
      setDialedPhoneNumber(dialedPhoneNumber + number);
      (_snapshot = snapshot()) === null || _snapshot === void 0 ? void 0 : (_snapshot$call = _snapshot.call) === null || _snapshot$call === void 0 ? void 0 : _snapshot$call.sendDigits(number);
    }
  };
  var handleBackspaceClick = function handleBackspaceClick() {
    if (status === DialerStatus.idle) {
      setDialedPhoneNumber(dialedPhoneNumber.slice(0, -1));
    }
  };
  var handlePlusClick = function handlePlusClick() {
    if (status === DialerStatus.idle) {
      setDialedPhoneNumber(dialedPhoneNumber + '+');
    }
  };
  return /*#__PURE__*/jsxs("div", {
    className: styles$6.dialPad,
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$6.dialPadRow,
      children: [/*#__PURE__*/jsx(DialPadButton, {
        onClick: function onClick() {
          return handleNumberClick('1');
        },
        children: "1"
      }), /*#__PURE__*/jsx(DialPadButton, {
        onClick: function onClick() {
          return handleNumberClick('2');
        },
        children: "2"
      }), /*#__PURE__*/jsx(DialPadButton, {
        onClick: function onClick() {
          return handleNumberClick('3');
        },
        children: "3"
      })]
    }), /*#__PURE__*/jsxs("div", {
      className: styles$6.dialPadRow,
      children: [/*#__PURE__*/jsx(DialPadButton, {
        onClick: function onClick() {
          return handleNumberClick('4');
        },
        children: "4"
      }), /*#__PURE__*/jsx(DialPadButton, {
        onClick: function onClick() {
          return handleNumberClick('5');
        },
        children: "5"
      }), /*#__PURE__*/jsx(DialPadButton, {
        onClick: function onClick() {
          return handleNumberClick('6');
        },
        children: "6"
      })]
    }), /*#__PURE__*/jsxs("div", {
      className: styles$6.dialPadRow,
      children: [/*#__PURE__*/jsx(DialPadButton, {
        onClick: function onClick() {
          return handleNumberClick('7');
        },
        children: "7"
      }), /*#__PURE__*/jsx(DialPadButton, {
        onClick: function onClick() {
          return handleNumberClick('8');
        },
        children: "8"
      }), /*#__PURE__*/jsx(DialPadButton, {
        onClick: function onClick() {
          return handleNumberClick('9');
        },
        children: "9"
      })]
    }), /*#__PURE__*/jsxs("div", {
      className: styles$6.dialPadRow,
      children: [/*#__PURE__*/jsx(DialPadButton, {
        onClick: function onClick() {
          return handleNumberClick('*');
        },
        children: "*"
      }), /*#__PURE__*/jsx(DialPadButton, {
        onClick: function onClick() {
          return handleNumberClick('0');
        },
        children: "0"
      }), /*#__PURE__*/jsx(DialPadButton, {
        onClick: function onClick() {
          return handleNumberClick('#');
        },
        children: "#"
      })]
    }), /*#__PURE__*/jsxs("div", {
      className: styles$6.dialPadRow,
      children: [/*#__PURE__*/jsx(DialPadButton, {
        onClick: handlePlusClick,
        children: "+"
      }), /*#__PURE__*/jsx(DialPadButton, {
        onClick: handleBackspaceClick,
        children: /*#__PURE__*/jsx(Icon, {
          name: "arrowLeft",
          size: 16,
          color: "bloobirds"
        })
      })]
    })]
  });
}

function _typeof$a(obj) { "@babel/helpers - typeof"; return _typeof$a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$a(obj); }
function _defineProperty$8(obj, key, value) { key = _toPropertyKey$8(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$8(arg) { var key = _toPrimitive$8(arg, "string"); return _typeof$a(key) === "symbol" ? key : String(key); }
function _toPrimitive$8(input, hint) { if (_typeof$a(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$a(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function getHint(status, warnings, errors, callStatus, t) {
  if (warnings.length > 0) {
    return t('dialer.hints.unstableConnection');
  }
  if (errors.length > 0) {
    return t('dialer.hints.connectionError');
  }
  switch (status) {
    case DialerStatus.authorizing:
      return /*#__PURE__*/jsxs("div", {
        className: styles$6.textAuthorizing,
        children: [/*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "softPeanut",
          align: "center",
          children: t('dialer.hints.noConfig')
        }), /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "softPeanut",
          align: "center",
          children: t('dialer.hints.logManually')
        }), /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "softPeanut",
          align: "center",
          children: /*#__PURE__*/jsx("a", {
            href: "https://support.bloobirds.com/hc/en-us/articles/6956014352412-How-to-add-phone-numbers",
            target: "_blank",
            rel: "noreferrer",
            children: t('dialer.hints.help')
          })
        }), /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "softPeanut",
          align: "center",
          children: t('dialer.hints.onlyAdmins')
        })]
      });
    case DialerStatus.registering:
      return t('dialer.hints.buildingDialer');
    case DialerStatus.idle:
      return t('dialer.hints.readyToCall');
    case DialerStatus.connected:
      switch (callStatus) {
        case Call.State.Connecting:
          return t('dialer.hints.connecting');
        case Call.State.Ringing:
          return t('dialer.hints.ringing');
        case Call.State.Open:
          return t('dialer.hints.callInProgress');
        case Call.State.Closed:
          return t('dialer.hints.callEnded');
        case Call.State.Reconnecting:
          return t('dialer.hints.reconnecting');
        case Call.State.Pending:
          return t('dialer.hints.incomingCall');
      }
      break;
    case DialerStatus.callEnded:
      return t('dialer.hints.callEnded');
  }
}
var DialerConnectionHint = function DialerConnectionHint() {
  var status = useDialer(function (state) {
    return state.status;
  });
  var callStatus = useDialer(function (state) {
    return state.callStatus;
  });
  var errors = useDialer(function (state) {
    return state.errors;
  });
  var warnings = useDialer(function (state) {
    return state.warnings;
  });
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var hint = getHint(status, warnings, errors, callStatus, t);
  var hintClasses = clsx(styles$6.connectionHint, _defineProperty$8({}, styles$6.noConfig, status === DialerStatus.authorizing));
  return /*#__PURE__*/jsx("div", {
    className: hintClasses,
    children: /*#__PURE__*/jsx(Text, {
      size: "xs",
      color: "softPeanut",
      children: hint
    })
  });
};

var PREFIX_TO_STATE = {
  '205': 'Alabama',
  '251': 'Alabama',
  '256': 'Alabama',
  '334': 'Alabama',
  '659': 'Alabama',
  '938': 'Alabama',
  '907': 'Alaska',
  '480': 'Arizona',
  '520': 'Arizona',
  '602': 'Arizona',
  '623': 'Arizona',
  '928': 'Arizona',
  '479': 'Arkansas',
  '501': 'Arkansas',
  '870': 'Arkansas',
  '209': 'California',
  '213': 'California',
  '279': 'California',
  '310': 'California',
  '323': 'California',
  '341': 'California',
  '350': 'California',
  '408': 'California',
  '415': 'California',
  '424': 'California',
  '442': 'California',
  '510': 'California',
  '530': 'California',
  '559': 'California',
  '562': 'California',
  '619': 'California',
  '626': 'California',
  '628': 'California',
  '650': 'California',
  '657': 'California',
  '661': 'California',
  '669': 'California',
  '707': 'California',
  '714': 'California',
  '747': 'California',
  '760': 'California',
  '805': 'California',
  '818': 'California',
  '820': 'California',
  '831': 'California',
  '840': 'California',
  '858': 'California',
  '909': 'California',
  '916': 'California',
  '925': 'California',
  '949': 'California',
  '951': 'California',
  '303': 'Colorado',
  '719': 'Colorado',
  '720': 'Colorado',
  '970': 'Colorado',
  '983': 'Colorado',
  '203': 'Connecticut',
  '475': 'Connecticut',
  '860': 'Connecticut',
  '959': 'Connecticut',
  '302': 'Delaware',
  '239': 'Florida',
  '305': 'Florida',
  '321': 'Florida',
  '352': 'Florida',
  '386': 'Florida',
  '407': 'Florida',
  '448': 'Florida',
  '561': 'Florida',
  '656': 'Florida',
  '689': 'Florida',
  '727': 'Florida',
  '754': 'Florida',
  '772': 'Florida',
  '786': 'Florida',
  '813': 'Florida',
  '850': 'Florida',
  '863': 'Florida',
  '904': 'Florida',
  '941': 'Florida',
  '954': 'Florida',
  '229': 'Georgia',
  '404': 'Georgia',
  '470': 'Georgia',
  '478': 'Georgia',
  '678': 'Georgia',
  '706': 'Georgia',
  '762': 'Georgia',
  '770': 'Georgia',
  '912': 'Georgia',
  '943': 'Georgia',
  '808': 'Hawaii',
  '208': 'Idaho',
  '986': 'Idaho',
  '217': 'Illinois',
  '224': 'Illinois',
  '309': 'Illinois',
  '312': 'Illinois',
  '331': 'Illinois',
  '447': 'Illinois',
  '464': 'Illinois',
  '618': 'Illinois',
  '630': 'Illinois',
  '708': 'Illinois',
  '773': 'Illinois',
  '779': 'Illinois',
  '815': 'Illinois',
  '847': 'Illinois',
  '872': 'Illinois',
  '219': 'Indiana',
  '260': 'Indiana',
  '317': 'Indiana',
  '463': 'Indiana',
  '574': 'Indiana',
  '765': 'Indiana',
  '812': 'Indiana',
  '930': 'Indiana',
  '319': 'Iowa',
  '515': 'Iowa',
  '563': 'Iowa',
  '641': 'Iowa',
  '712': 'Iowa',
  '316': 'Kansas',
  '620': 'Kansas',
  '785': 'Kansas',
  '913': 'Kansas',
  '270': 'Kentucky',
  '364': 'Kentucky',
  '502': 'Kentucky',
  '606': 'Kentucky',
  '859': 'Kentucky',
  '225': 'Louisiana',
  '318': 'Louisiana',
  '337': 'Louisiana',
  '504': 'Louisiana',
  '985': 'Louisiana',
  '207': 'Maine',
  '240': 'Maryland',
  '301': 'Maryland',
  '410': 'Maryland',
  '443': 'Maryland',
  '667': 'Maryland',
  '339': 'Massachusetts',
  '351': 'Massachusetts',
  '413': 'Massachusetts',
  '508': 'Massachusetts',
  '617': 'Massachusetts',
  '774': 'Massachusetts',
  '781': 'Massachusetts',
  '857': 'Massachusetts',
  '978': 'Massachusetts',
  '231': 'Michigan',
  '248': 'Michigan',
  '269': 'Michigan',
  '313': 'Michigan',
  '517': 'Michigan',
  '586': 'Michigan',
  '616': 'Michigan',
  '734': 'Michigan',
  '810': 'Michigan',
  '906': 'Michigan',
  '947': 'Michigan',
  '989': 'Michigan',
  '218': 'Minnesota',
  '320': 'Minnesota',
  '507': 'Minnesota',
  '612': 'Minnesota',
  '651': 'Minnesota',
  '763': 'Minnesota',
  '952': 'Minnesota',
  '228': 'Mississippi',
  '601': 'Mississippi',
  '662': 'Mississippi',
  '769': 'Mississippi',
  '314': 'Missouri',
  '417': 'Missouri',
  '557': 'Missouri',
  '573': 'Missouri',
  '636': 'Missouri',
  '660': 'Missouri',
  '816': 'Missouri',
  '406': 'Montana',
  '308': 'Nebraska',
  '402': 'Nebraska',
  '531': 'Nebraska',
  '702': 'Nevada',
  '725': 'Nevada',
  '775': 'Nevada',
  '603': 'New Hampshire',
  '201': 'New Jersey',
  '551': 'New Jersey',
  '609': 'New Jersey',
  '640': 'New Jersey',
  '732': 'New Jersey',
  '848': 'New Jersey',
  '856': 'New Jersey',
  '862': 'New Jersey',
  '908': 'New Jersey',
  '973': 'New Jersey',
  '505': 'New Mexico',
  '575': 'New Mexico',
  '212': 'New York',
  '315': 'New York',
  '332': 'New York',
  '347': 'New York',
  '363': 'New York',
  '516': 'New York',
  '518': 'New York',
  '585': 'New York',
  '607': 'New York',
  '631': 'New York',
  '646': 'New York',
  '680': 'New York',
  '716': 'New York',
  '718': 'New York',
  '838': 'New York',
  '845': 'New York',
  '914': 'New York',
  '917': 'New York',
  '929': 'New York',
  '934': 'New York',
  '252': 'North Carolina',
  '336': 'North Carolina',
  '472': 'North Carolina',
  '704': 'North Carolina',
  '743': 'North Carolina',
  '828': 'North Carolina',
  '910': 'North Carolina',
  '919': 'North Carolina',
  '980': 'North Carolina',
  '984': 'North Carolina',
  '701': 'North Dakota',
  '216': 'Ohio',
  '220': 'Ohio',
  '234': 'Ohio',
  '326': 'Ohio',
  '330': 'Ohio',
  '380': 'Ohio',
  '419': 'Ohio',
  '440': 'Ohio',
  '513': 'Ohio',
  '567': 'Ohio',
  '614': 'Ohio',
  '740': 'Ohio',
  '937': 'Ohio',
  '405': 'Oklahoma',
  '539': 'Oklahoma',
  '572': 'Oklahoma',
  '580': 'Oklahoma',
  '918': 'Oklahoma',
  '458': 'Oregon',
  '503': 'Oregon',
  '541': 'Oregon',
  '971': 'Oregon',
  '215': 'Pennsylvania',
  '223': 'Pennsylvania',
  '267': 'Pennsylvania',
  '272': 'Pennsylvania',
  '412': 'Pennsylvania',
  '445': 'Pennsylvania',
  '484': 'Pennsylvania',
  '570': 'Pennsylvania',
  '582': 'Pennsylvania',
  '610': 'Pennsylvania',
  '717': 'Pennsylvania',
  '724': 'Pennsylvania',
  '814': 'Pennsylvania',
  '835': 'Pennsylvania',
  '878': 'Pennsylvania',
  '401': 'Rhode Island',
  '803': 'South Carolina',
  '839': 'South Carolina',
  '843': 'South Carolina',
  '854': 'South Carolina',
  '864': 'South Carolina',
  '605': 'South Dakota',
  '423': 'Tennessee',
  '615': 'Tennessee',
  '629': 'Tennessee',
  '731': 'Tennessee',
  '865': 'Tennessee',
  '901': 'Tennessee',
  '931': 'Tennessee',
  '385': 'Utah',
  '435': 'Utah',
  '801': 'Utah',
  '802': 'Vermont',
  '276': 'Virginia',
  '434': 'Virginia',
  '540': 'Virginia',
  '571': 'Virginia',
  '703': 'Virginia',
  '757': 'Virginia',
  '804': 'Virginia',
  '826': 'Virginia',
  '948': 'Virginia',
  '206': 'Washington',
  '253': 'Washington',
  '360': 'Washington',
  '425': 'Washington',
  '509': 'Washington',
  '564': 'Washington',
  '202': 'Washington, DC',
  '771': 'Washington, DC',
  '304': 'West Virginia',
  '681': 'West Virginia',
  '262': 'Wisconsin',
  '414': 'Wisconsin',
  '534': 'Wisconsin',
  '608': 'Wisconsin',
  '715': 'Wisconsin',
  '920': 'Wisconsin',
  '307': 'Wyoming'
};
var STATE_TO_PREFIXS = {
  'Alabama': ['205', '251', '256', '334', '659', '938'],
  'Alaska': ['907'],
  'Arizona': ['480', '520', '602', '623', '928'],
  'Arkansas': ['479', '501', '870'],
  'California': ['209', '213', '279', '310', '323', '341', '350', '408', '415', '424', '442', '510', '530', '559', '562', '619', '626', '628', '650', '657', '661', '669', '707', '714', '747', '760', '805', '818', '820', '831', '840', '858', '909', '916', '925', '949', '951'],
  'Colorado': ['303', '719', '720', '970', '983'],
  'Connecticut': ['203', '475', '860', '959'],
  'Delaware': ['302'],
  'Florida': ['239', '305', '321', '352', '386', '407', '448', '561', '656', '689', '727', '754', '772', '786', '813', '850', '863', '904', '941', '954'],
  'Georgia': ['229', '404', '470', '478', '678', '706', '762', '770', '912', '943'],
  'Hawaii': ['808'],
  'Idaho': ['208', '986'],
  'Illinois': ['217', '224', '309', '312', '331', '447', '464', '618', '630', '708', '773', '779', '815', '847', '872'],
  'Indiana': ['219', '260', '317', '463', '574', '765', '812', '930'],
  'Iowa': ['319', '515', '563', '641', '712'],
  'Kansas': ['316', '620', '785', '913'],
  'Kentucky': ['270', '364', '502', '606', '859'],
  'Louisiana': ['225', '318', '337', '504', '985'],
  'Maine': ['207'],
  'Maryland': ['240', '301', '410', '443', '667'],
  'Massachusetts': ['339', '351', '413', '508', '617', '774', '781', '857', '978'],
  'Michigan': ['231', '248', '269', '313', '517', '586', '616', '734', '810', '906', '947', '989'],
  'Minnesota': ['218', '320', '507', '612', '651', '763', '952'],
  'Mississippi': ['228', '601', '662', '769'],
  'Missouri': ['314', '417', '557', '573', '636', '660', '816'],
  'Montana': ['406'],
  'Nebraska': ['308', '402', '531'],
  'Nevada': ['702', '725', '775'],
  'New Hampshire': ['603'],
  'New Jersey': ['201', '551', '609', '640', '732', '848', '856', '862', '908', '973'],
  'New Mexico': ['505', '575'],
  'New York': ['212', '315', '332', '347', '363', '516', '518', '585', '607', '631', '646', '680', '716', '718', '838', '845', '914', '917', '929', '934'],
  'North Carolina': ['252', '336', '472', '704', '743', '828', '910', '919', '980', '984'],
  'North Dakota': ['701'],
  'Ohio': ['216', '220', '234', '326', '330', '380', '419', '440', '513', '567', '614', '740', '937'],
  'Oklahoma': ['405', '539', '572', '580', '918'],
  'Oregon': ['458', '503', '541', '971'],
  'Pennsylvania': ['215', '223', '267', '272', '412', '445', '484', '570', '582', '610', '717', '724', '814', '835', '878'],
  'Rhode Island': ['401'],
  'South Carolina': ['803', '839', '843', '854', '864'],
  'South Dakota': ['605'],
  'Tennessee': ['423', '615', '629', '731', '865', '901', '931'],
  'Texas': ['210', '214', '254', '281', '325', '346', '361', '409', '430', '432', '469', '512', '682', '713', '726', '737', '806', '817', '830', '832', '903', '915', '936', '940', '945', '956', '972', '979'],
  'Utah': ['385', '435', '801'],
  'Vermont': ['802'],
  'Virginia': ['276', '434', '540', '571', '703', '757', '804', '826', '948'],
  'Washington': ['206', '253', '360', '425', '509', '564'],
  'Washington, DC': ['202', '771'],
  'West Virginia': ['304', '681'],
  'Wisconsin': ['262', '414', '534', '608', '715', '920'],
  'Wyoming': ['307']
};

function _typeof$9(obj) { "@babel/helpers - typeof"; return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$9(obj); }
function _defineProperty$7(obj, key, value) { key = _toPropertyKey$7(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$7(arg) { var key = _toPrimitive$7(arg, "string"); return _typeof$9(key) === "symbol" ? key : String(key); }
function _toPrimitive$7(input, hint) { if (_typeof$9(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$9(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function getLocalUsNumber(dialedPhone, usPhoneNumbers) {
  // Get the prefix of the dialed phone
  var prefix = dialedPhone.substring(2, 5);
  // Get the states that match with the prefix
  var stateOfPrefix = PREFIX_TO_STATE[prefix];
  var prefixesOfTheState = STATE_TO_PREFIXS[stateOfPrefix];
  // Get the phone numbers that match with the states
  var phoneNumbers = usPhoneNumbers.filter(function (phoneNumber) {
    return !!prefixesOfTheState.find(function (prefix) {
      return prefix === phoneNumber.substring(2, 5);
    });
  });
  // Get the first phone number
  if (phoneNumbers.length > 0) {
    return phoneNumbers[0];
  }
  return usPhoneNumbers[0];
}
function DialerUserPhoneSelector() {
  var _settings$user;
  var _useDialerStore = useDialerStore(),
    setState = _useDialerStore.setState;
  var status = useDialer(function (state) {
    return state.status;
  });
  var selectedPhoneNumber = useDialer(function (state) {
    return state.selectedPhoneNumber;
  });
  var dialedPhoneNumber = useDialer(function (state) {
    return state.dialedPhoneNumber;
  });
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var autoChangePhoneExtension = settings === null || settings === void 0 ? void 0 : (_settings$user = settings.user) === null || _settings$user === void 0 ? void 0 : _settings$user.autoChangePhoneExtension;
  var _useVisible = useVisible(),
    ref = _useVisible.ref,
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var _useUserPhoneNumbers = useUserPhoneNumbers(function (filteredPhones) {
      if (selectedPhoneNumber === null && filteredPhones.length > 0) {
        var defaultOrFirst = filteredPhones.find(function (phoneNumber) {
          return phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.phoneByDefault;
        }) || filteredPhones[0];
        setState('selectedPhoneNumber', defaultOrFirst.phoneNumber);
      }
    }),
    userPhones = _useUserPhoneNumbers.userPhones;
  var _useSessionStorage = useSessionStorage(),
    set = _useSessionStorage.set;
  useEffect(function () {
    if (autoChangePhoneExtension && dialedPhoneNumber && userPhones && userPhones.length > 1) {
      try {
        var _parsePhoneNumber;
        var phoneParsed = parsePhoneNumber(dialedPhoneNumber);
        if (phoneParsed && (!selectedPhoneNumber || ((_parsePhoneNumber = parsePhoneNumber(selectedPhoneNumber)) === null || _parsePhoneNumber === void 0 ? void 0 : _parsePhoneNumber.country) !== (phoneParsed === null || phoneParsed === void 0 ? void 0 : phoneParsed.country) || phoneParsed.country === 'US')) {
          var userPhonesSameCountry = userPhones.filter(function (userPhone) {
            try {
              var _parsePhoneNumber2;
              return ((_parsePhoneNumber2 = parsePhoneNumber(userPhone.phoneNumber)) === null || _parsePhoneNumber2 === void 0 ? void 0 : _parsePhoneNumber2.country) === (phoneParsed === null || phoneParsed === void 0 ? void 0 : phoneParsed.country);
            } catch (e) {
              return false;
            }
          });
          if (userPhonesSameCountry.length > 0) {
            if (phoneParsed.country === 'US') {
              var phone = getLocalUsNumber(dialedPhoneNumber, userPhonesSameCountry.map(function (phone) {
                return phone.phoneNumber;
              }));
              setState('selectedPhoneNumber', phone);
            } else {
              var _userPhonesSameCountr;
              setState('selectedPhoneNumber', (_userPhonesSameCountr = userPhonesSameCountry[0]) === null || _userPhonesSameCountr === void 0 ? void 0 : _userPhonesSameCountr.phoneNumber);
            }
          }
        }
      } catch (error) {
        console.error('Phone not parsed', error);
      }
    }
  }, [dialedPhoneNumber, userPhones, autoChangePhoneExtension]);
  var userPhoneSelectorClasses = clsx(styles$6.userPhoneSelector, _defineProperty$7({}, styles$6.userPhoneSelector_disabled, status < DialerStatus.idle));
  return /*#__PURE__*/jsx(Dropdown, {
    anchor: /*#__PURE__*/jsxs("div", {
      className: userPhoneSelectorClasses,
      onClick: function onClick() {
        if (status === DialerStatus.idle) {
          setVisible(true);
        }
      },
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$6.userPhoneSelectorLabels,
        children: [/*#__PURE__*/jsx(Text, {
          size: "xs",
          weight: "bold",
          children: t('dialer.yourPhoneNumber')
        }), /*#__PURE__*/jsx(Text, {
          size: "xs",
          children: selectedPhoneNumber
        })]
      }), status === DialerStatus.idle && /*#__PURE__*/jsx(Icon, {
        name: "chevronDown",
        size: 16,
        color: "bloobirds"
      })]
    }),
    visible: visible,
    ref: ref,
    children: userPhones === null || userPhones === void 0 ? void 0 : userPhones.map(function (phoneNumber) {
      return /*#__PURE__*/jsx(Item, {
        onClick: function onClick() {
          setState('selectedPhoneNumber', phoneNumber.phoneNumber);
          set(SessionStorageKeys.LastPhoneUsed, phoneNumber.phoneNumber);
          setVisible(false);
        },
        children: phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.phoneNumber
      }, phoneNumber.id);
    })
  });
}

var css_248z$5 = ".dialerExtendedScreen-module_extended__G0o7- {\n  position: absolute;\n  height: 100%;\n  width: 337px;\n  background-color: var(--white);\n  top: 0;\n  left: -336px;\n  z-index: -1;\n  border-top-left-radius: 10px;\n  border-bottom-left-radius: 10px;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 2px 20px rgba(25, 145, 255, 0.15);\n  box-sizing: border-box;\n}\n\n.dialerExtendedScreen-module_extended__G0o7-::after {\n  width: 6px;\n  background-color: var(--white);\n  z-index: -1;\n  content: '';\n  right: -6px;\n  position: absolute;\n  height: calc(100% + 1px);\n  top: -0.5px;\n}\n\n.dialerExtendedScreen-module_extendedRight__KtXcq {\n  position: absolute;\n  height: 100%;\n  width: 337px;\n  background-color: var(--white);\n  top: 0;\n  left: -336px;\n  z-index: -1;\n  border-top-right-radius: 10px;\n  border-bottom-right-radius: 10px;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 2px 20px rgba(25, 145, 255, 0.15);\n  box-sizing: border-box;\n}\n.dialerExtendedScreen-module_extendedRight__KtXcq::before {\n  width: 6px;\n  background-color: var(--white);\n  z-index: -1;\n  content: '';\n  left: -6px;\n  position: absolute;\n  height: calc(100% + 1px);\n  top: -0.5px;\n}\n\n.dialerExtendedScreen-module_container__fXpQU {\n  position: relative;\n  height: -webkit-fill-available;\n  width: -webkit-fill-available;\n}\n\n.dialerExtendedScreen-module_containerPadding__w6sgX {\n  padding-bottom: 56px;\n}\n\n.dialerExtendedScreen-module_content__i0svf {\n  height: 100%;\n  width: 100%;\n  padding-bottom: 12px;\n}\n\n.dialerExtendedScreen-module_notesContent__bQcll {\n  height: 100%;\n  width: 100%;\n  padding-top: 4px;\n}\n\n.dialerExtendedScreen-module_checkbox__wRR08 {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  padding: 12px 12px 12px 16px;\n  background-color: var(--white);\n  border-bottom-right-radius: 10px;\n  border-bottom-left-radius: 10px;\n}\n\n.dialerExtendedScreen-module_header__q68XD {\n  display: flex;\n  justify-content: space-between;\n  padding: 9px 9px 0 9px;\n  box-sizing: content-box;\n  align-items: center;\n}\n\n.dialerExtendedScreen-module_headerRight__D4-gz {\n  border-top-right-radius: 10px;\n}\n\n.dialerExtendedScreen-module_headerLeft__GVXPd {\n  border-top-left-radius: 10px;\n}\n\n.dialerExtendedScreen-module_extendedSkeleton__itrXY {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n  gap: 16px;\n}\n";
var styles$5 = {"extended":"dialerExtendedScreen-module_extended__G0o7-","extendedRight":"dialerExtendedScreen-module_extendedRight__KtXcq","container":"dialerExtendedScreen-module_container__fXpQU","containerPadding":"dialerExtendedScreen-module_containerPadding__w6sgX","content":"dialerExtendedScreen-module_content__i0svf","notesContent":"dialerExtendedScreen-module_notesContent__bQcll","checkbox":"dialerExtendedScreen-module_checkbox__wRR08","header":"dialerExtendedScreen-module_header__q68XD","headerRight":"dialerExtendedScreen-module_headerRight__D4-gz","headerLeft":"dialerExtendedScreen-module_headerLeft__GVXPd","extendedSkeleton":"dialerExtendedScreen-module_extendedSkeleton__itrXY"};
styleInject(css_248z$5);

var css_248z$4 = ".dialerPlaybook-module_header__ICjzl {\n  display: flex;\n  justify-content: space-between;\n  padding: 9px 9px 0 9px;\n  box-sizing: content-box;\n  align-items: center;\n  background-color: var(--verySoftPurple);\n}\n\n.dialerPlaybook-module_headerRight__BRExZ {\n  border-top-right-radius: 10px;\n}\n\n.dialerPlaybook-module_headerLeft__ILHWZ {\n  border-top-left-radius: 10px;\n}\n\n.dialerPlaybook-module_segmentationHeader__GFuCX {\n  display: flex;\n  justify-content: space-between;\n  padding: 9px 9px 0 9px;\n  box-sizing: content-box;\n  align-items: center;\n}\n\n.dialerPlaybook-module_backButton__oF3mh{\n  display: flex;\n  gap: 4px;\n  align-items: center;\n  cursor: pointer;\n}\n\n.dialerPlaybook-module_playbookFeedContainer__7hKJ- {\n  height: calc(100% - 33px);\n  overflow-y: auto;\n}\n\n.dialerPlaybook-module_playbookFeedContainer__7hKJ- > div {\n  height: auto;\n}\n\n.dialerPlaybook-module_filterDetailContainer__nyFMt {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  height: 100%;\n}\n\n.dialerPlaybook-module_modalContentWrapper__--uKB{\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  padding: 0;\n}\n\n.dialerPlaybook-module_modalFilterWrapper__ffbgf{\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  padding: 0 8px;\n}\n\n.dialerPlaybook-module_filterElementsContainer__2fyVC{\n  display: flex;\n  overflow-y: scroll;\n  overflow-x: hidden;\n  height: 100%;\n}\n";
var styles$4 = {"header":"dialerPlaybook-module_header__ICjzl","headerRight":"dialerPlaybook-module_headerRight__BRExZ","headerLeft":"dialerPlaybook-module_headerLeft__ILHWZ","segmentationHeader":"dialerPlaybook-module_segmentationHeader__GFuCX","backButton":"dialerPlaybook-module_backButton__oF3mh","playbookFeedContainer":"dialerPlaybook-module_playbookFeedContainer__7hKJ-","filterDetailContainer":"dialerPlaybook-module_filterDetailContainer__nyFMt","modalContentWrapper":"dialerPlaybook-module_modalContentWrapper__--uKB","modalFilterWrapper":"dialerPlaybook-module_modalFilterWrapper__ffbgf","filterElementsContainer":"dialerPlaybook-module_filterElementsContainer__2fyVC"};
styleInject(css_248z$4);

function _typeof$8(obj) { "@babel/helpers - typeof"; return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$8(obj); }
function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty$6(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$6(obj, key, value) { key = _toPropertyKey$6(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$6(arg) { var key = _toPrimitive$6(arg, "string"); return _typeof$8(key) === "symbol" ? key : String(key); }
function _toPrimitive$6(input, hint) { if (_typeof$8(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$8(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$9(arr, i) { return _arrayWithHoles$9(arr) || _iterableToArrayLimit$9(arr, i) || _unsupportedIterableToArray$9(arr, i) || _nonIterableRest$9(); }
function _nonIterableRest$9() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$9(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$9(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$9(o, minLen); }
function _arrayLikeToArray$9(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$9(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$9(arr) { if (Array.isArray(arr)) return arr; }
var DialerPlaybookFeed = function DialerPlaybookFeed(_ref) {
  var accountId = _ref.accountId,
    isRightOpen = _ref.isRightOpen,
    handleOnClose = _ref.handleOnClose,
    setShowAutoSetting = _ref.setShowAutoSetting,
    userId = _ref.userId,
    isAdminUser = _ref.isAdminUser;
  var _useState = useState(undefined),
    _useState2 = _slicedToArray$9(_useState, 2),
    selectedTemplate = _useState2[0],
    setSelectedTemplate = _useState2[1];
  var _useState3 = useState('PlaybookFeed'),
    _useState4 = _slicedToArray$9(_useState3, 2),
    page = _useState4[0],
    setPage = _useState4[1];
  var isSalesEnabled = useFullSalesEnabled(accountId);
  var _useMinimizableModals = useMinimizableModals(),
    openMinimizableModal = _useMinimizableModals.openMinimizableModal;
  var userIsOwner = userId === (selectedTemplate === null || selectedTemplate === void 0 ? void 0 : selectedTemplate.createdBy);
  var userCanEdit = userIsOwner || isAdminUser;
  var matchBobject = useDialer(function (state) {
    return state.bobjectMatch;
  });
  var matchedBobject = matchBobject === null || matchBobject === void 0 ? void 0 : matchBobject.bobject;
  var suggestedTemplate = useSuggestedTemplates(matchedBobject, undefined, PlaybookTab.PITCHES);
  useEffect(function () {
    if (suggestedTemplate.length === 1) {
      setSelectedTemplate(suggestedTemplate[0]);
      setPageView('TemplateDetail');
    }
  }, [suggestedTemplate === null || suggestedTemplate === void 0 ? void 0 : suggestedTemplate.length]);
  var bobject = matchBobject && matchBobject.bobject;
  var dataModel = useDataModel();
  var isSalesStage = useMemo(function () {
    return bobject && getIsSales(dataModel, bobject);
  }, [!!dataModel, bobject === null || bobject === void 0 ? void 0 : bobject.id.value]);
  var defaultStage = !bobject ? TemplateStage.All : isSalesStage ? TemplateStage.Sales : TemplateStage.Prospecting;
  var _useState5 = useState({
      segmentationData: undefined,
      stage: defaultStage
    }),
    _useState6 = _slicedToArray$9(_useState5, 2),
    segmentationValues = _useState6[0],
    setSegmentationValues = _useState6[1];
  var _usePlaybook = usePlaybook({
      stage: segmentationValues === null || segmentationValues === void 0 ? void 0 : segmentationValues.stage,
      bobjectData: {
        company: matchBobject ? {
          rawBobject: matchBobject.relatedBobject
        } : undefined,
        activeBobject: bobject
      }
    }),
    segmentationFields = _usePlaybook.segmentationFields,
    activeBobjectSegmentationValues = _usePlaybook.activeBobjectSegmentationValues;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  useEffect(function () {
    setSegmentationValues(function (values) {
      return _objectSpread$2(_objectSpread$2({}, values), {}, {
        stage: defaultStage
      });
    });
  }, [isSalesStage]);
  useEffect(function () {
    setSegmentationValues(function (values) {
      return _objectSpread$2(_objectSpread$2({}, values), {}, {
        segmentationData: activeBobjectSegmentationValues
      });
    });
  }, [activeBobjectSegmentationValues]);
  function setPageView(view) {
    setPage(view);
    setShowAutoSetting(view === 'PlaybookFeed');
  }
  function onCardClicked(template) {
    setSelectedTemplate(template);
    setPageView('TemplateDetail');
  }
  var onClickBack = function onClickBack() {
    setSelectedTemplate(undefined);
    setPageView('PlaybookFeed');
  };
  var onClickEditTemplate = function onClickEditTemplate(e) {
    e.stopPropagation();
    e.preventDefault();
    openEditingModal(selectedTemplate);
  };
  function openEditingModal(template) {
    var getDefaultStage = function getDefaultStage() {
      if (isSalesStage) {
        return TemplateStage.Sales;
      }
      return TemplateStage.Prospecting;
    };

    //setViewEditingModal(template);
    openMinimizableModal({
      type: 'handleTemplate',
      title: 'Template',
      data: {
        template: template,
        stage: getDefaultStage(),
        onSaveCallback: function onSaveCallback() {
          return setPageView('PlaybookFeed');
        }
      }
    });
  }
  switch (page) {
    case 'TemplateDetail':
      return /*#__PURE__*/jsx(TemplateDetail, {
        dialerButtons: /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx("div", {
            style: {
              cursor: userCanEdit ? 'auto' : 'initial'
            },
            children: /*#__PURE__*/jsx(Tooltip, {
              title: !userCanEdit && t('dialer.extendedScreen.onlyAdminCanEditTemplate'),
              position: "top",
              children: /*#__PURE__*/jsx(IconButton, {
                name: "edit",
                color: userCanEdit ? 'purple' : 'softPeanut',
                size: 20,
                onClick: userCanEdit ? onClickEditTemplate : undefined
              })
            })
          }), /*#__PURE__*/jsx(IconButton, {
            name: "cross",
            color: "purple",
            onClick: handleOnClose
          })]
        }),
        template: selectedTemplate,
        extended: true,
        backButtonAction: onClickBack
      });
    case 'SegmentationFilters':
      return /*#__PURE__*/jsxs("div", {
        className: styles$4.filterDetailContainer,
        children: [/*#__PURE__*/jsxs("div", _objectSpread$2(_objectSpread$2({
          className: styles$4.segmentationHeader
        }, isRightOpen ? {
          style: {
            flexDirection: 'row-reverse'
          }
        } : {}), {}, {
          children: [/*#__PURE__*/jsx(IconButton, {
            name: "cross",
            color: "purple",
            onClick: handleOnClose
          }), /*#__PURE__*/jsxs("div", {
            className: styles$4.backButton,
            onClick: function onClick() {
              return setPageView('PlaybookFeed');
            },
            children: [/*#__PURE__*/jsx(Icon, {
              name: 'arrowLeft',
              size: 20,
              color: "purple"
            }), /*#__PURE__*/jsx(Text, {
              size: "s",
              color: "purple",
              children: t('common.back')
            })]
          })]
        })), /*#__PURE__*/jsx("div", {
          className: styles$4.filterElementsContainer,
          children: /*#__PURE__*/jsx(SegmentationFilter, {
            isSalesEnabled: isSalesEnabled,
            isSmartEmail: false,
            activeBobjectSegmentationValues: activeBobjectSegmentationValues,
            segmentationFields: segmentationFields,
            setFiltersContext: setSegmentationValues,
            filterValues: segmentationValues === null || segmentationValues === void 0 ? void 0 : segmentationValues.segmentationData,
            visibilityFilters: segmentationValues === null || segmentationValues === void 0 ? void 0 : segmentationValues.visibilityFilters,
            shouldShowVisibilityFilters: true,
            shouldShowBattlecards: true,
            stage: segmentationValues === null || segmentationValues === void 0 ? void 0 : segmentationValues.stage,
            defaultStage: defaultStage
          })
        })]
      });
    case 'PlaybookFeed':
    default:
      return /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx("div", _objectSpread$2(_objectSpread$2({
          className: clsx(styles$4.header, _defineProperty$6(_defineProperty$6({}, styles$4.headerLeft, !isRightOpen), styles$4.headerRight, isRightOpen))
        }, isRightOpen ? {
          style: {
            flexDirection: 'row-reverse'
          }
        } : {}), {}, {
          children: /*#__PURE__*/jsx(IconButton, {
            name: "cross",
            color: "purple",
            onClick: handleOnClose
          })
        })), /*#__PURE__*/jsx("div", {
          className: styles$4.playbookFeedContainer,
          children: /*#__PURE__*/jsx(PlaybookFeed, {
            selectedTab: PlaybookTab.PITCHES,
            shouldShowTemplateSuggestions: true,
            accountId: accountId,
            environment: Environment.DIALER,
            activeBobject: bobject,
            isMainBobjectSalesStage: isSalesStage,
            company: (matchBobject === null || matchBobject === void 0 ? void 0 : matchBobject.relatedBobject) && {
              rawBobject: matchBobject.relatedBobject
            },
            leads: undefined,
            onCardClicked: onCardClicked,
            toggleFilterView: function toggleFilterView() {
              return setPageView('SegmentationFilters');
            },
            segmentationFields: segmentationFields,
            setFiltersContext: setSegmentationValues,
            segmentationValues: segmentationValues === null || segmentationValues === void 0 ? void 0 : segmentationValues.segmentationData,
            stage: segmentationValues === null || segmentationValues === void 0 ? void 0 : segmentationValues.stage,
            visibilityFilters: segmentationValues.visibilityFilters,
            templateFunctions: {
              editTemplate: openEditingModal,
              insertTemplate: function insertTemplate() {},
              replaceTemplate: function replaceTemplate() {}
            }
          })
        })]
      });
  }
};

function _typeof$7(obj) { "@babel/helpers - typeof"; return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$7(obj); }
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$5(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$5(obj, key, value) { key = _toPropertyKey$5(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$5(arg) { var key = _toPrimitive$5(arg, "string"); return _typeof$7(key) === "symbol" ? key : String(key); }
function _toPrimitive$5(input, hint) { if (_typeof$7(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$7(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$8(arr, i) { return _arrayWithHoles$8(arr) || _iterableToArrayLimit$8(arr, i) || _unsupportedIterableToArray$8(arr, i) || _nonIterableRest$8(); }
function _nonIterableRest$8() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$8(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$8(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen); }
function _arrayLikeToArray$8(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$8(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$8(arr) { if (Array.isArray(arr)) return arr; }
function PlaybookExtendedScreen(props) {
  var _props$settings;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx("div", {
      className: styles$5.content,
      children: /*#__PURE__*/jsx(DialerPlaybookFeed, {
        accountId: (_props$settings = props.settings) === null || _props$settings === void 0 ? void 0 : _props$settings.account.id,
        isRightOpen: props.rightOpen,
        handleOnClose: props.handleOnClose,
        setShowAutoSetting: props.showAutoSetting,
        userId: props.userId,
        isAdminUser: props.adminUser
      })
    }), props.showAutoSetting1 && /*#__PURE__*/jsx("div", {
      className: styles$5.checkbox,
      children: /*#__PURE__*/jsx(Checkbox, {
        color: "purple",
        backgroundColor: "lightPurple",
        size: "small",
        expand: true,
        checked: props.checked,
        onClick: props.onClick,
        children: t('dialer.extendedScreen.autoOpen')
      })
    })]
  });
}
function NoteExtendedScreen(_ref) {
  var _getFieldByLogicRole;
  var rightOpen = _ref.rightOpen,
    handleOnClose = _ref.handleOnClose;
  var _useState = useState(false),
    _useState2 = _slicedToArray$8(_useState, 2),
    isLoading = _useState2[0],
    setIsLoading = _useState2[1];
  var activity = useDialer(function (state) {
    return state.activity;
  });
  var _useTranslation2 = useTranslation(),
    t = _useTranslation2.t;
  if (!activity) {
    return null;
  }
  var activityType = (_getFieldByLogicRole = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.valueLogicRole;
  return /*#__PURE__*/jsxs("div", {
    className: styles$5.notesContent,
    children: [/*#__PURE__*/jsx("div", _objectSpread$1(_objectSpread$1({
      className: clsx(styles$5.header, _defineProperty$5(_defineProperty$5({}, styles$5.headerLeft, !rightOpen), styles$5.headerRight, rightOpen))
    }, rightOpen ? {
      style: {
        flexDirection: 'row-reverse'
      }
    } : {}), {}, {
      children: isLoading ? /*#__PURE__*/jsx(Spinner, {
        size: 24,
        name: "loadingCircle",
        color: "softPeanut"
      }) : /*#__PURE__*/jsx(IconButton, {
        name: "cross",
        color: "bloobirds",
        onClick: handleOnClose
      })
    })), /*#__PURE__*/jsx(NoteForm, {
      activityId: activity === null || activity === void 0 ? void 0 : activity.id,
      activityType: activityType,
      accountId: activity === null || activity === void 0 ? void 0 : activity.id.accountId,
      showFooter: false,
      fitAllHeight: true,
      title: t('dialer.extendedScreen.note'),
      setIsLoading: setIsLoading
    })]
  });
}
var DialerExtendedContent = function DialerExtendedContent(_ref2) {
  var _settings$user, _settings$user2;
  var isRightOpen = _ref2.isRightOpen,
    handleOnClose = _ref2.handleOnClose;
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings,
    mutate = _useActiveUserSetting.mutate,
    saveUserSettings = _useActiveUserSetting.saveUserSettings;
  var autoOpenPitchesInDialer = settings === null || settings === void 0 ? void 0 : (_settings$user = settings.user) === null || _settings$user === void 0 ? void 0 : _settings$user.autoOpenPitchesInDialer;
  var userId = useActiveUserId();
  var userRoles = settings === null || settings === void 0 ? void 0 : (_settings$user2 = settings.user) === null || _settings$user2 === void 0 ? void 0 : _settings$user2.roles;
  var isAdminUser = (userRoles === null || userRoles === void 0 ? void 0 : userRoles.includes(UserRole.GLOBAL_ADMIN)) || (userRoles === null || userRoles === void 0 ? void 0 : userRoles.includes(UserRole.ACCOUNT_ADMIN));
  var _useDialerStore = useDialerStore(),
    setAutoOpenPitchesInDialer = _useDialerStore.setAutoOpenPitchesInDialer;
  var _useState3 = useState(true),
    _useState4 = _slicedToArray$8(_useState3, 2),
    showAutoSetting = _useState4[0],
    setShowAutoSetting = _useState4[1];
  var extendedScreenType = useDialer(function (state) {
    return state.extendedScreenType;
  });
  var setAutoOpenPitchesInDialerSetting = function setAutoOpenPitchesInDialerSetting(newSetting) {
    return saveUserSettings(userId, {
      autoOpenPitchesInDialer: newSetting
    }).then(function () {
      mutate();
      setAutoOpenPitchesInDialer(newSetting);
    });
  };
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsxs("div", {
      className: clsx(styles$5.container, _defineProperty$5({}, styles$5.containerPadding, showAutoSetting && extendedScreenType !== 'notes')),
      children: [extendedScreenType === 'pitches' && /*#__PURE__*/jsx(PlaybookExtendedScreen, {
        settings: settings,
        rightOpen: isRightOpen,
        handleOnClose: handleOnClose,
        showAutoSetting: setShowAutoSetting,
        userId: userId,
        adminUser: isAdminUser,
        showAutoSetting1: showAutoSetting,
        checked: autoOpenPitchesInDialer,
        onClick: setAutoOpenPitchesInDialerSetting
      }), extendedScreenType === 'notes' && /*#__PURE__*/jsx(NoteExtendedScreen, {
        rightOpen: isRightOpen,
        handleOnClose: handleOnClose
      })]
    })
  });
};

function _typeof$6(obj) { "@babel/helpers - typeof"; return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$6(obj); }
function _defineProperty$4(obj, key, value) { key = _toPropertyKey$4(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$4(arg) { var key = _toPrimitive$4(arg, "string"); return _typeof$6(key) === "symbol" ? key : String(key); }
function _toPrimitive$4(input, hint) { if (_typeof$6(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$6(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime$6() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$6 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$6(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$6(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray$7(arr, i) { return _arrayWithHoles$7(arr) || _iterableToArrayLimit$7(arr, i) || _unsupportedIterableToArray$7(arr, i) || _nonIterableRest$7(); }
function _nonIterableRest$7() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$7(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$7(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen); }
function _arrayLikeToArray$7(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$7(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$7(arr) { if (Array.isArray(arr)) return arr; }
function getSize(isBig, dialerType) {
  if (dialerType == DialerType.RINGOVER_DIALER) {
    return 377;
  }
  if (dialerType == DialerType.NUMINTEC_DIALER) {
    return 417;
  }
  return isBig ? 372 : 317;
}
function getExtendedScreenPosition(sideOpen, opening, isBig, dialerType) {
  if (sideOpen === 'right') {
    var size = getSize(isBig, dialerType);
    return opening ? [20, size] : [size, 20];
  } else {
    return opening ? [-50, -337] : [-337, -50];
  }
}
var DialerExtendedScreen = function DialerExtendedScreen(_ref) {
  var position = _ref.position;
  var controls = useAnimation();
  var _useState = useState('right'),
    _useState2 = _slicedToArray$7(_useState, 2),
    sideOpen = _useState2[0],
    setSideOpen = _useState2[1];
  var _useDialerStore = useDialerStore(),
    toggleExtendedScreen = _useDialerStore.toggleExtendedScreen;
  var open = useDialer(function (state) {
    return state.open;
  });
  var showingExternalScreen = useDialer(function (state) {
    return state.showingExtendedScreen;
  });
  var extendedScreenType = useDialer(function (state) {
    return state.extendedScreenType;
  });
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$7(_useState3, 2),
    hasBeenOpened = _useState4[0],
    setHasBeenOpened = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray$7(_useState5, 2),
    internalOpen = _useState6[0],
    setInternalOpen = _useState6[1];
  var handleOnClose = function handleOnClose() {
    return toggleExtendedScreen(extendedScreenType);
  };
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var dialerType = settings.user.dialerType;
  var isAircall = dialerType === 'AIRCALL_DIALER';
  useEffect(function () {
    setInternalOpen(open !== DialerOpenStatus.closed && open !== DialerOpenStatus.minimized);
  }, [open]);
  useEffect(function () {
    if (showingExternalScreen) {
      controls === null || controls === void 0 ? void 0 : controls.start('start').then(function () {
        return setInternalOpen(open === DialerOpenStatus.open);
      });
      setHasBeenOpened(function (b) {
        return b ? b : true;
      });
    } else if (hasBeenOpened) {
      controls === null || controls === void 0 ? void 0 : controls.start('close').then(function () {
        return setInternalOpen(false);
      });
    }
  }, [showingExternalScreen, open]);
  useEffect(function () {
    if (sideOpen === 'left' && (position === null || position === void 0 ? void 0 : position.x) < 322 || sideOpen === 'right' && (position === null || position === void 0 ? void 0 : position.x) > window.innerWidth - 650) {
      if (open === DialerOpenStatus.open && showingExternalScreen) controls === null || controls === void 0 ? void 0 : controls.start('start');
      if (showingExternalScreen) {
        controls === null || controls === void 0 ? void 0 : controls.start('close').then( /*#__PURE__*/_asyncToGenerator$6( /*#__PURE__*/_regeneratorRuntime$6().mark(function _callee() {
          return _regeneratorRuntime$6().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return setSideOpen(function (side) {
                  return side === 'left' ? 'right' : 'left';
                });
              case 2:
                controls === null || controls === void 0 ? void 0 : controls.start('start');
              case 3:
              case "end":
                return _context.stop();
            }
          }, _callee);
        })));
      } else {
        setSideOpen(function (side) {
          return side === 'left' ? 'right' : 'left';
        });
      }
    }
  }, [position]);
  var variants = {
    start: function start() {
      return {
        left: getExtendedScreenPosition(sideOpen, true, isAircall, dialerType),
        scaleX: [0, 1],
        opacity: 1,
        transition: {
          duration: 0.25
        }
      };
    },
    close: function close() {
      return {
        left: getExtendedScreenPosition(sideOpen, false, isAircall, dialerType),
        scaleX: [1, 0],
        transition: {
          duration: 0.25
        }
      };
    }
  };
  var isRightOpen = sideOpen === 'right';
  return /*#__PURE__*/jsx(AnimatePresence, {
    children: /*#__PURE__*/jsx(motion.div, {
      initial: {
        opacity: 0
      },
      exit: {
        opacity: 0
      },
      animate: controls,
      variants: variants,
      className: clsx(_defineProperty$4(_defineProperty$4({}, styles$5.extended, !isRightOpen), styles$5.extendedRight, isRightOpen)),
      children: internalOpen ? /*#__PURE__*/jsx(DialerExtendedContent, {
        isRightOpen: isRightOpen,
        handleOnClose: handleOnClose
      }) : /*#__PURE__*/jsx(DialerExtendedSkeleton, {})
    })
  });
};
var DialerExtendedSkeleton = function DialerExtendedSkeleton() {
  return /*#__PURE__*/jsxs("div", {
    className: styles$5.extendedSkeleton,
    children: [/*#__PURE__*/jsx(Skeleton, {
      height: "20%",
      width: "100%",
      variant: "rect"
    }), /*#__PURE__*/jsx(Skeleton, {
      height: "70%",
      width: "100%",
      variant: "rect"
    }), /*#__PURE__*/jsx(Skeleton, {
      height: "10%",
      width: "100%",
      variant: "rect"
    })]
  });
};

function _slicedToArray$6(arr, i) { return _arrayWithHoles$6(arr) || _iterableToArrayLimit$6(arr, i) || _unsupportedIterableToArray$6(arr, i) || _nonIterableRest$6(); }
function _nonIterableRest$6() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$6(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$6(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen); }
function _arrayLikeToArray$6(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$6(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$6(arr) { if (Array.isArray(arr)) return arr; }
var defaultValue = {
  x: 96,
  y: window.innerHeight - 96,
  corrected: false
};
var initialValue = {
  x: -100,
  y: -100,
  corrected: true
};
var padding = 12;
var closedMenuSize = {
  width: 60,
  height: 60
};
var openMenuSize = {
  width: 320,
  height: 640
};
var astrolineSize = {
  width: 320,
  height: 510
};
var clampPosition = function clampPosition(position) {
  return {
    x: clamp(position.x, padding, window.innerWidth - padding),
    y: clamp(position.y, padding, window.innerHeight - padding),
    corrected: position.corrected
  };
};
var storeBubblePosition = debounce(function (position) {
  if (appHostnames.includes(window.location.hostname) || window.location.hostname.includes('bloobirds-platform-frontend.pages.dev')) {
    return localStorage.setItem('dialerPosition', JSON.stringify(position));
  } else if (chrome) {
    var _chrome$storage, _chrome$storage$sync;
    (_chrome$storage = chrome.storage) === null || _chrome$storage === void 0 ? void 0 : (_chrome$storage$sync = _chrome$storage.sync) === null || _chrome$storage$sync === void 0 ? void 0 : _chrome$storage$sync.set({
      dialerPosition: position
    });
  }
}, 1000);
var getStoredBubblePosition = function getStoredBubblePosition() {
  if (appHostnames.includes(window.location.hostname) || window.location.hostname.includes('bloobirds-platform-frontend.pages.dev')) {
    var position = JSON.parse(localStorage.getItem('dialerPosition')) || defaultValue;
    return Promise.resolve(clampPosition(position));
  }
  if (!chrome.storage) {
    return new Promise(function (resolve) {
      resolve(defaultValue);
    });
  }
  return new Promise(function (resolve) {
    var _chrome$storage2, _chrome$storage2$sync;
    (_chrome$storage2 = chrome.storage) === null || _chrome$storage2 === void 0 ? void 0 : (_chrome$storage2$sync = _chrome$storage2.sync) === null || _chrome$storage2$sync === void 0 ? void 0 : _chrome$storage2$sync.get('dialerPosition', function (_ref) {
      var bubblePosition = _ref.bubblePosition;
      var position = bubblePosition || defaultValue;
      resolve(clampPosition(position));
    });
  });
};
function useBubbleBounds(size) {
  var _useState = useState({
      left: padding,
      right: window.innerWidth - size.width - padding,
      top: padding,
      bottom: window.innerHeight - size.height - padding
    }),
    _useState2 = _slicedToArray$6(_useState, 2),
    bounds = _useState2[0],
    setBounds = _useState2[1];
  useEffect(function () {
    setBounds({
      left: padding,
      right: window.innerWidth - size.width - padding,
      top: padding,
      bottom: window.innerHeight - size.height - padding
    });
  }, [size.width, size.height]);
  useEvent('resize', function () {
    setBounds({
      left: padding,
      right: window.innerWidth - size.width - padding,
      top: padding,
      bottom: window.innerHeight - size.height - padding
    });
  });
  return bounds;
}
function useDialerPosition(open) {
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var dialerType = settings.user.dialerType;
  var size = open ? dialerType === 'ASTROLINE_DIALER' ? astrolineSize : openMenuSize : closedMenuSize;
  var _useState3 = useState(initialValue),
    _useState4 = _slicedToArray$6(_useState3, 2),
    position = _useState4[0],
    setPosition = _useState4[1];
  var _useState5 = useState(initialValue),
    _useState6 = _slicedToArray$6(_useState5, 2),
    lastBubblePosition = _useState6[0],
    setLastBubblePosition = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray$6(_useState7, 2),
    storedPositionLoaded = _useState8[0],
    setStoredPositionLoaded = _useState8[1];
  var bounds = useBubbleBounds(size);
  useEffect(function () {
    getStoredBubblePosition().then(function (storedPosition) {
      setPosition(storedPosition);
      setLastBubblePosition(storedPosition);
      setStoredPositionLoaded(true);
    });
  }, []);
  useEvent('resize', function () {
    var clampedPosition = clampPosition(position);
    setLastBubblePosition(clampedPosition);
    setPosition(clampedPosition);
  });
  useEffect(function () {
    if (!storedPositionLoaded) {
      return;
    }
    if (open) {
      var overflowsRight = position.x + size.width > window.innerWidth + padding;
      var overflowsBottom = position.y + size.height > window.innerHeight + padding;
      var x = overflowsRight ? window.innerWidth - size.width - padding : position.x;
      var y = overflowsBottom ? window.innerHeight - size.height - padding : position.y;
      setPosition({
        x: x,
        y: y,
        corrected: overflowsBottom || overflowsRight
      });
    } else {
      setPosition(lastBubblePosition);
    }
  }, [open, storedPositionLoaded]);
  useEffect(function () {
    if (open && !position.corrected) {
      setLastBubblePosition(position);
    }
  }, [open, position]);
  useEffect(function () {
    if (!storedPositionLoaded) {
      return;
    }
    if (!open) {
      setLastBubblePosition(position);
      storeBubblePosition(position);
    }
  }, [position, open, storedPositionLoaded]);
  var updatePosition = useCallback(function (_ref2) {
    var x = _ref2.x,
      y = _ref2.y;
    var position = clampPosition({
      x: x,
      y: y,
      corrected: false
    });
    setPosition(position);
  }, []);
  return {
    position: position,
    setPosition: updatePosition,
    bounds: bounds
  };
}

function _typeof$5(obj) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$5(obj); }
function _regeneratorRuntime$5() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$5 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$5(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(arg) { var key = _toPrimitive$3(arg, "string"); return _typeof$5(key) === "symbol" ? key : String(key); }
function _toPrimitive$3(input, hint) { if (_typeof$5(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$5(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$5(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray$5(arr, i) { return _arrayWithHoles$5(arr) || _iterableToArrayLimit$5(arr, i) || _unsupportedIterableToArray$5(arr, i) || _nonIterableRest$5(); }
function _nonIterableRest$5() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$5(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$5(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen); }
function _arrayLikeToArray$5(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$5(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$5(arr) { if (Array.isArray(arr)) return arr; }
var LogCallButton = function LogCallButton() {
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var dialedNumber = useDialer(function (state) {
    return state.dialedPhoneNumber;
  });
  var userPhoneNumber = useDialer(function (state) {
    return state.selectedPhoneNumber;
  });
  var bobject = useDialer(function (state) {
    return state.bobjectMatch;
  });
  var callDirection = useDialer(function (state) {
    return state.callDirection;
  });
  var _useState = useState(false),
    _useState2 = _slicedToArray$5(_useState, 2),
    loggingCall = _useState2[0],
    setLoggingCall = _useState2[1];
  var _useDialerStore = useDialerStore(),
    setActivityLogCall = _useDialerStore.setActivityLogCall,
    snapshot = _useDialerStore.snapshot,
    finishCall = _useDialerStore.finishCall;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var plugins = useRichTextEditorPlugins({
    images: false
  });
  function logCall() {
    return _logCall.apply(this, arguments);
  }
  function _logCall() {
    _logCall = _asyncToGenerator$5( /*#__PURE__*/_regeneratorRuntime$5().mark(function _callee() {
      var _activity$data$activi;
      var activity;
      return _regeneratorRuntime$5().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setLoggingCall(true);
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_LOG_CALL_BUTTON_ON_DIALER_OTO);
            _context.next = 4;
            return api.post("/calls/whiteLabel/call".concat(bobject && bobject.hasMatched ? '' : '?mandatoryMatch=false'), {
              sdrPhone: userPhoneNumber,
              leadPhone: dialedNumber,
              leadId: (bobject === null || bobject === void 0 ? void 0 : bobject.type) === 'Lead' ? bobject === null || bobject === void 0 ? void 0 : bobject.id : null,
              companyId: (bobject === null || bobject === void 0 ? void 0 : bobject.type) === 'Company' ? bobject === null || bobject === void 0 ? void 0 : bobject.id : null,
              direction: callDirection === 'inbound' ? 'INCOMING' : 'OUTGOING',
              callDateTime: new Date().toISOString(),
              callSid: "BB".concat(md5("".concat(userPhoneNumber).concat(dialedNumber).concat(new Date().toISOString()))),
              otherFields: {
                ACTIVITY__NOTE: serialize(snapshot().note, {
                  format: 'AST',
                  plugins: plugins
                })
              }
            });
          case 4:
            activity = _context.sent;
            setActivityLogCall(activity === null || activity === void 0 ? void 0 : (_activity$data$activi = activity.data.activity) === null || _activity$data$activi === void 0 ? void 0 : _activity$data$activi.value);
            createToast({
              message: t('dialer.logCall.toast.success'),
              type: 'success'
            });

            // Wait 1.5 seconds and clear the activity log call
            setTimeout(function () {
              setLoggingCall(false);
              finishCall();
            }, 1500);
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _logCall.apply(this, arguments);
  }
  var disabled = !bobject || !dialedNumber || dialedNumber.length <= 9 || !dialedNumber.startsWith('+') || loggingCall;
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx("div", {
      className: styles$6.spacer
    }), /*#__PURE__*/jsxs("div", {
      className: clsx(styles$6.logCallButton, _defineProperty$3({}, styles$6.logCallButton__disabled, disabled)),
      onClick: function onClick() {
        if (!disabled) logCall();
      },
      children: [/*#__PURE__*/jsx(Icon, {
        name: "noteAction",
        size: 16,
        color: "white"
      }), t('dialer.logCall.button')]
    })]
  });
};

var css_248z$3 = ".numintecDialer-module_airCall_dialer_container__sB0v8 {\n  width: 420px;\n  border-radius: 0 0 8px 8px;\n  flex-grow: 1;\n}\n\n.numintecDialer-module_airCall_dialer__RKAJu {\n  height: 600px;\n}\n\n.numintecDialer-module_airCall_dialer__RKAJu > iframe {\n  border-radius: 8px;\n  border: 0;\n}\n\n.numintecDialer-module_airCall_dialer_contact__-uJrw {\n  display: flex;\n  height: 44px;\n  box-sizing: content-box;\n  padding: var(--Spacing-02, 8px) var(--Spacing-03, 16px) var(--Spacing-03, 8px) var(--Spacing-03, 16px);\n  justify-content: space-between;\n  align-items: center;\n  align-self: stretch;\n}\n\n.numintecDialer-module_airCall_dialer_contact_names__NLqmb {\n  display: flex;\n  flex-direction: column;\n}\n\n/*If .airCall_dialer_contact_names has siblings we should change the width to 94%*/\n.numintecDialer-module_airCall_dialer_contact_names__NLqmb:not(:only-child) {\n  width: 94%;\n}\n\n.numintecDialer-module_airCall_dialer_contact_name__spE4L {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n  min-width: 0;\n}\n\n/* If not first child of type .airCall_dialer_contact_name we should add a margin left of 2px */\n.numintecDialer-module_airCall_dialer_contact_name__spE4L:not(:first-of-type) {\n  margin-left: 2px;\n}\n\n.numintecDialer-module_airCall_dialer_contact_name__spE4L:hover {\n  cursor: pointer;\n}\n\n.numintecDialer-module_airCall_dialer_contact_name__spE4L > svg {\n  flex-shrink: 0;\n}\n\n.numintecDialer-module_airCall_dialer_contact_name__spE4L:hover .numintecDialer-module_airCall_dialer_contact_name_text__miFxZ {\n  color: var(--darkBloobirds) !important;\n}\n\n\n.numintecDialer-module_airCall_dialer_contact_name_text__miFxZ {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n\n\n\n\n";
var styles$3 = {"airCall_dialer_container":"numintecDialer-module_airCall_dialer_container__sB0v8","airCall_dialer":"numintecDialer-module_airCall_dialer__RKAJu","airCall_dialer_contact":"numintecDialer-module_airCall_dialer_contact__-uJrw","airCall_dialer_contact_names":"numintecDialer-module_airCall_dialer_contact_names__NLqmb","airCall_dialer_contact_name":"numintecDialer-module_airCall_dialer_contact_name__spE4L","airCall_dialer_contact_name_text":"numintecDialer-module_airCall_dialer_contact_name_text__miFxZ"};
styleInject(css_248z$3);

var NumintecDialerFrame = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useNumintecDialer = useNumintecDialer(),
    contact = _useNumintecDialer.contact;
  var setContactViewBobjectId = function setContactViewBobjectId(bobjectId) {
    window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension, {
      detail: {
        bobjectId: bobjectId
      }
    }));
  };
  return /*#__PURE__*/jsxs("div", {
    className: styles$3.airCall_dialer_container,
    id: "bb-numintec-dialer",
    children: [contact && /*#__PURE__*/jsxs("div", {
      className: styles$3.airCall_dialer_contact,
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$3.airCall_dialer_contact_names,
        children: [contact.leadName && /*#__PURE__*/jsxs("div", {
          className: styles$3.airCall_dialer_contact_name,
          onClick: function onClick() {
            return setContactViewBobjectId(contact.leadId);
          },
          children: [/*#__PURE__*/jsx(Icon, {
            name: 'bloobirds',
            color: "bloobirds",
            size: 20
          }), /*#__PURE__*/jsx(Text, {
            size: 'm',
            color: "bloobirds",
            weight: "bold",
            className: styles$3.airCall_dialer_contact_name_text,
            children: contact.leadName
          })]
        }), contact.companyName && /*#__PURE__*/jsxs("div", {
          className: styles$3.airCall_dialer_contact_name,
          onClick: function onClick() {
            return setContactViewBobjectId(contact.companyId);
          },
          children: [/*#__PURE__*/jsx(Icon, {
            name: 'company',
            color: "bloobirds",
            size: 16
          }), /*#__PURE__*/jsx(Text, {
            size: 's',
            color: "bloobirds",
            className: styles$3.airCall_dialer_contact_name_text,
            children: contact.companyName
          })]
        })]
      }), contact.multipleContacts && /*#__PURE__*/jsx("div", {
        className: styles$3.airCall_dialer_contact_multiple,
        children: /*#__PURE__*/jsx(InfoWarning, {
          message: "There are multiple records with this phone number"
        })
      })]
    }), /*#__PURE__*/jsx("iframe", {
      className: styles$3.dialer,
      name: "numintec-cti",
      id: "numintec-cti",
      allow: "microphone",
      src: "https://go.invoxcontact.io/webphonego_middleware/",
      frameBorder: "0",
      width: "418",
      height: "590"
    })]
  });
});

function _typeof$4(obj) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$4(obj); }
function _regeneratorRuntime$4() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$4 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$4(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$4(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray$4(arr, i) { return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$4(); }
function _nonIterableRest$4() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }
function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$4(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$4(arr) { if (Array.isArray(arr)) return arr; }
var NumintecContext = /*#__PURE__*/React.createContext(null);
var NumintecDialer = function NumintecDialer() {
  useDialer(function (state) {
    return state.dialedPhoneNumber;
  });
  var _useDialerStore = useDialerStore(),
    maximize = _useDialerStore.maximize,
    setActivity = _useDialerStore.setActivity,
    closeExtendedScreen = _useDialerStore.closeExtendedScreen,
    snapshot = _useDialerStore.snapshot,
    setActivityExternal = _useDialerStore.setActivityExternal,
    setMatchedBobject = _useDialerStore.setMatchedBobject;
  var _useState = useState(),
    _useState2 = _slicedToArray$4(_useState, 2),
    launch = _useState2[0],
    setLaunch = _useState2[1];
  var ref = useRef(null);
  var _useState3 = useState(null),
    _useState4 = _slicedToArray$4(_useState3, 2),
    activityCCF = _useState4[0],
    setActivityCCF = _useState4[1];
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray$4(_React$useState, 2),
    showCorrectContactFlow = _React$useState2[0],
    setShowCorrectContactFlow = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray$4(_React$useState3, 2),
    mainActivityBobject = _React$useState4[0],
    setMainActivityBobject = _React$useState4[1];
  var _useWizardContext = useWizardContext(),
    openWizard = _useWizardContext.openWizard,
    resetWizardProperties = _useWizardContext.resetWizardProperties;
  var _useState5 = useState(null),
    _useState6 = _slicedToArray$4(_useState5, 2),
    contact = _useState6[0],
    setContact = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray$4(_useState7, 2);
    _useState8[0];
    var setCallId = _useState8[1];
  var hasOpenCCFWithoutObjectAccount = useOpenCCFWithoutObject();
  useEventSubscription('numintec', function (data) {
    var _snapshot;
    window.onbeforeunload = null;
    switch (data === null || data === void 0 ? void 0 : data.event) {
      case 'INCOMING_CALL':
        setCallId(data === null || data === void 0 ? void 0 : data.callSid);
        setActivityExternal(null);
        setContactInfo(data === null || data === void 0 ? void 0 : data.phoneContact, setMatchedBobject);
        maximize();
        break;
      case 'on_outgoing_call_early':
      case 'on_incoming_call_early':
        setCallId(data === null || data === void 0 ? void 0 : data.callSid);
        setContactInfo(data === null || data === void 0 ? void 0 : data.phoneContact, setMatchedBobject);
        setActivity(data === null || data === void 0 ? void 0 : data.activityId, true);
        window.onbeforeunload = function () {
          return true;
        };
        break;
      case 'on_outgoing_call_terminated':
      case 'on_incoming_call_terminated':
        setActivityExternal(null);
        setMainActivityBobject(null);
        setContact(null);
        break;
      case 'CALL_ENDED':
        setContact(null);
        getCallAndLaunchCCF((_snapshot = snapshot()) === null || _snapshot === void 0 ? void 0 : _snapshot.activity);
        break;
      case 'on_incoming_call_missed':
        setContact(null);
        break;
    }
  });
  function openCorrectContactFlow(_x2) {
    return _openCorrectContactFlow.apply(this, arguments);
  }
  function _openCorrectContactFlow() {
    _openCorrectContactFlow = _asyncToGenerator$4( /*#__PURE__*/_regeneratorRuntime$4().mark(function _callee3(activity) {
      var mainBobjectId, _PluralBobjectTypes$m, response;
      return _regeneratorRuntime$4().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CALL_BUTTON_ON_NUMINTEC_OTO);
            mainBobjectId = getMainBobjectId(activity);
            if (!mainBobjectId) {
              _context3.next = 7;
              break;
            }
            _context3.next = 5;
            return api.get("/linkedin/".concat((_PluralBobjectTypes$m = PluralBobjectTypes[mainBobjectId.split('/')[1]]) === null || _PluralBobjectTypes$m === void 0 ? void 0 : _PluralBobjectTypes$m.toLowerCase(), "/").concat(mainBobjectId.split('/')[2]));
          case 5:
            response = _context3.sent;
            setMainActivityBobject(response === null || response === void 0 ? void 0 : response.data);
          case 7:
            setShowCorrectContactFlow(true);
          case 8:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return _openCorrectContactFlow.apply(this, arguments);
  }
  var getCallAndLaunchCCF = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator$4( /*#__PURE__*/_regeneratorRuntime$4().mark(function _callee(activity) {
      var _activity$id;
      return _regeneratorRuntime$4().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!document.hidden && activity) {
              if (activity) {
                api.get("/bobjects/".concat(activity === null || activity === void 0 ? void 0 : (_activity$id = activity.id) === null || _activity$id === void 0 ? void 0 : _activity$id.value, "/form?injectReferences=true")).then(function (response) {
                  if (response !== null && response !== void 0 && response.data) {
                    var activityToCCF = fillReferenceFields(response === null || response === void 0 ? void 0 : response.data);
                    if (activityToCCF) {
                      setActivityCCF(activityToCCF);
                      openCorrectContactFlow(activityToCCF);
                    }
                  }
                });
              }
            }
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function getCallAndLaunchCCF(_x3) {
      return _ref.apply(this, arguments);
    };
  }();
  var setContactInfo = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator$4( /*#__PURE__*/_regeneratorRuntime$4().mark(function _callee2(phoneNumber, setMatchedBobject) {
      var response, bobjects, bobject, leadName, leadId, companyId, foundBobject;
      return _regeneratorRuntime$4().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            setMatchedBobject(null);
            _context2.next = 3;
            return api.post('/calls/whiteLabel/search', {
              phoneNumber: phoneNumber
            });
          case 3:
            response = _context2.sent;
            if (!(response.status !== 200)) {
              _context2.next = 7;
              break;
            }
            setMatchedBobject({
              hasMatched: false
            });
            return _context2.abrupt("return");
          case 7:
            bobjects = Array.isArray(response.data) ? response.data : [response.data];
            if (!(bobjects.length === 0)) {
              _context2.next = 11;
              break;
            }
            setMatchedBobject({
              hasMatched: false
            });
            return _context2.abrupt("return");
          case 11:
            if (!(bobjects.length > 1)) {
              _context2.next = 15;
              break;
            }
            // Multiple bobjects with the same phone number, notify the user
            setContact({
              multipleContacts: true,
              numberOfContacts: bobjects.length
            });
            setMatchedBobject({
              hasMatched: false
            });
            return _context2.abrupt("return");
          case 15:
            bobject = bobjects[0];
            leadName = isLead(bobject) ? getTextFromLogicRole(bobject, 'LEAD__FULL_NAME') : undefined;
            leadId = isLead(bobject) ? bobject.id.value : undefined;
            companyId = isLead(bobject) ? getTextFromLogicRole(bobject, 'LEAD__COMPANY') : bobject.id.value;
            setContact({
              leadName: leadName,
              leadId: leadId,
              companyName: isLead(bobject) ? getTextFromLogicRole(bobject, 'LEAD__COMPANY_NAME') : getTextFromLogicRole(bobject, 'COMPANY__NAME'),
              companyId: companyId,
              multipleContacts: false
            });
            foundBobject = {
              bobject: bobject,
              companyId: companyId,
              id: leadId,
              name: leadName,
              type: bobject.id.typeName,
              hasMatched: true
            };
            setMatchedBobject(foundBobject);
          case 22:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function setContactInfo(_x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }();
  function handleClose() {
    closeExtendedScreen();
    setActivityExternal(null);
    setActivityCCF(null);
    setShowCorrectContactFlow(false);
    setMainActivityBobject(null);
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }
  return /*#__PURE__*/jsx(NumintecContext.Provider, {
    value: {
      launch: launch,
      setLaunch: setLaunch,
      contact: contact
    },
    children: /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsx(NumintecDialerFrame, {
        ref: ref
      }), showCorrectContactFlow && activityCCF && (mainActivityBobject || hasOpenCCFWithoutObjectAccount) && openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activityCCF, {
        referenceBobject: mainActivityBobject,
        handleClose: handleClose
      })]
    })
  });
};
var useNumintecDialer = function useNumintecDialer() {
  var context = React.useContext(NumintecContext);
  if (!context) {
    throw new Error('useNumintecDialer must be used within the NumintecProvider');
  }
  return context;
};

function _typeof$3(obj) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$3(obj); }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(arg) { var key = _toPrimitive$2(arg, "string"); return _typeof$3(key) === "symbol" ? key : String(key); }
function _toPrimitive$2(input, hint) { if (_typeof$3(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$3(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime$3() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$3 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$3(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$3(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var LoadingRingButton = function LoadingRingButton() {
  var icon = {
    hidden: {
      pathLength: 0,
      fill: 'rgba(255, 255, 255, 0)'
    },
    visible: {
      pathLength: 1,
      fill: 'rgba(255, 255, 255, 1)'
    }
  };
  return /*#__PURE__*/jsx("svg", {
    height: "32",
    width: "32",
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    children: /*#__PURE__*/jsx(motion.path, {
      variants: icon,
      d: "M18.538 15.637a.735.735 0 0 0-.622-.76c-.756-.099-1.5-.284-2.216-.551a.73.73 0 0 0-.768.161l-.928.929a.73.73 0 0 1-.878.118 12.426 12.426 0 0 1-4.66-4.66.73.73 0 0 1 .118-.878l.926-.925a.732.732 0 0 0 .163-.773 10.1 10.1 0 0 1-.55-2.207.733.733 0 0 0-.738-.629H6.192a.731.731 0 0 0-.728.785 13.742 13.742 0 0 0 2.134 6.023 13.532 13.532 0 0 0 4.167 4.165 13.723 13.723 0 0 0 5.976 2.129.73.73 0 0 0 .797-.734v-2.193zm1.462.008v2.182a2.193 2.193 0 0 1-2.404 2.192 15.188 15.188 0 0 1-6.621-2.354 14.977 14.977 0 0 1-4.607-4.605 15.207 15.207 0 0 1-2.36-6.67A2.193 2.193 0 0 1 6.193 4h2.185c1.1-.01 2.04.796 2.194 1.893.085.647.244 1.282.471 1.892a2.194 2.194 0 0 1-.496 2.316l-.524.525a10.964 10.964 0 0 0 3.352 3.352l.527-.527a2.192 2.192 0 0 1 2.312-.494 8.67 8.67 0 0 0 1.9.472A2.193 2.193 0 0 1 20 15.645z",
      fill: "var(--white)",
      fillRule: "evenodd",
      clipRule: "evenodd",
      initial: "hidden",
      animate: "visible"
    })
  });
};
var RingHangupButton = function RingHangupButton() {
  var status = useDialer(function (state) {
    return state.status;
  });
  var dialedPhoneNumber = useDialer(function (state) {
    return state.dialedPhoneNumber;
  });
  var selectedPhoneNumber = useDialer(function (state) {
    return state.selectedPhoneNumber;
  });
  var callStatus = useDialer(function (state) {
    return state.callStatus;
  });
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var _useDialerStore = useDialerStore(),
    startCall = _useDialerStore.startCall,
    hangCall = _useDialerStore.hangCall,
    snapshot = _useDialerStore.snapshot,
    setState = _useDialerStore.setState;
  var disabled = status === DialerStatus.callEnded || status === DialerStatus.authorizing || status === DialerStatus.registering || status === DialerStatus.idle && ((dialedPhoneNumber === null || dialedPhoneNumber === void 0 ? void 0 : dialedPhoneNumber.length) < 9 || !(dialedPhoneNumber !== null && dialedPhoneNumber !== void 0 && dialedPhoneNumber.startsWith('+')));
  var shouldRenderGreenButton = DialerStatus.callEnded === status || DialerStatus.idle === status || status === DialerStatus.incoming;
  var onClickHandler = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator$3( /*#__PURE__*/_regeneratorRuntime$3().mark(function _callee() {
      var _settings$user, params, _snapshot, device, call, newCall, _snapshot$call;
      return _regeneratorRuntime$3().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (disabled) {
              _context.next = 15;
              break;
            }
            if (!(status === DialerStatus.idle)) {
              _context.next = 13;
              break;
            }
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CALL_BUTTON_ON_DIALER_OTO);
            params = {
              twilioPhone: selectedPhoneNumber,
              isOutgoing: 'true',
              leadPhone: dialedPhoneNumber,
              userId: settings === null || settings === void 0 ? void 0 : (_settings$user = settings.user) === null || _settings$user === void 0 ? void 0 : _settings$user.id
            };
            _snapshot = snapshot(), device = _snapshot.device, call = _snapshot.call;
            if (!call) {
              _context.next = 8;
              break;
            }
            console.log('There is already a call in progress');
            return _context.abrupt("return");
          case 8:
            _context.next = 10;
            return device === null || device === void 0 ? void 0 : device.connect({
              params: params
            });
          case 10:
            newCall = _context.sent;
            startCall(newCall);
            setState('status', DialerStatus.connected);
          case 13:
            if (status !== DialerStatus.idle && status !== DialerStatus.incoming) {
              hangCall();
            }
            if (status === DialerStatus.incoming) {
              (_snapshot$call = snapshot().call) === null || _snapshot$call === void 0 ? void 0 : _snapshot$call.accept();
              setState('status', DialerStatus.connected);
              setState('incomingAccepted', true);
            }
          case 15:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function onClickHandler() {
      return _ref.apply(this, arguments);
    };
  }();
  var buttonClasses = clsx(styles$6.ringHangupButton, _defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2({}, styles$6.ringHangupButton_disabled, disabled), styles$6.ringHangupButton_hangup, !shouldRenderGreenButton), styles$6.ringHangupButton_loading, status < DialerStatus.idle), styles$6.ringHangupButton_animate, callStatus === Call.State.Ringing || callStatus === Call.State.Connecting || callStatus === Call.State.Pending));
  return /*#__PURE__*/jsxs("div", {
    className: styles$6.ringHangupButtonContainer,
    children: [/*#__PURE__*/jsx(motion.div, {
      className: buttonClasses,
      onClick: onClickHandler,
      animate: status === DialerStatus.incoming ? {
        scale: [1, 1.1, 1.1, 1, 1],
        rotate: [0, 0, 180, 180, 0]
      } : {},
      transition: status === DialerStatus.incoming ? {
        duration: 2,
        ease: 'easeInOut',
        times: [0, 0.2, 0.5, 0.8, 1],
        loop: Infinity,
        repeatDelay: 1
      } : {},
      children: status < DialerStatus.idle ? /*#__PURE__*/jsx(LoadingRingButton, {}) : /*#__PURE__*/jsx(Icon, {
        color: "white",
        name: shouldRenderGreenButton ? 'phone' : 'phoneHang',
        size: 32
      })
    }), status === DialerStatus.incoming && /*#__PURE__*/jsx("div", {
      className: clsx(styles$6.ringHangupButton, styles$6.ringHangupButton_hangup),
      onClick: function onClick() {
        var _snapshot$call2;
        (_snapshot$call2 = snapshot().call) === null || _snapshot$call2 === void 0 ? void 0 : _snapshot$call2.reject();
        hangCall();
      },
      children: /*#__PURE__*/jsx(Icon, {
        name: "phoneHang",
        size: 32,
        color: "white"
      })
    })]
  });
};

var css_248z$2 = ".ringoverDialer-module_airCall_dialer_container__O4QD8 {\n  width: 374px;\n  border-radius: 0 0 8px 8px;\n  flex-grow: 1;\n}\n\n.ringoverDialer-module_airCall_dialer__l7eed {\n  height: 600px;\n}\n\n.ringoverDialer-module_airCall_dialer__l7eed > iframe {\n  border-radius: 8px;\n  border: 0;\n}\n\n.ringoverDialer-module_airCall_dialer_contact__zzqXP {\n  display: flex;\n  height: 44px;\n  box-sizing: content-box;\n  padding: var(--Spacing-02, 8px) var(--Spacing-03, 16px) var(--Spacing-03, 8px) var(--Spacing-03, 16px);\n  justify-content: space-between;\n  align-items: center;\n  align-self: stretch;\n}\n\n.ringoverDialer-module_airCall_dialer_contact_names__KWrKN {\n  display: flex;\n  flex-direction: column;\n}\n\n/*If .airCall_dialer_contact_names has siblings we should change the width to 94%*/\n.ringoverDialer-module_airCall_dialer_contact_names__KWrKN:not(:only-child) {\n  width: 94%;\n}\n\n.ringoverDialer-module_airCall_dialer_contact_name__ZPlsE {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n  min-width: 0;\n}\n\n/* If not first child of type .airCall_dialer_contact_name we should add a margin left of 2px */\n.ringoverDialer-module_airCall_dialer_contact_name__ZPlsE:not(:first-of-type) {\n  margin-left: 2px;\n}\n\n.ringoverDialer-module_airCall_dialer_contact_name__ZPlsE:hover {\n  cursor: pointer;\n}\n\n.ringoverDialer-module_airCall_dialer_contact_name__ZPlsE > svg {\n  flex-shrink: 0;\n}\n\n.ringoverDialer-module_airCall_dialer_contact_name__ZPlsE:hover .ringoverDialer-module_airCall_dialer_contact_name_text__4lA0q {\n  color: var(--darkBloobirds) !important;\n}\n\n\n.ringoverDialer-module_airCall_dialer_contact_name_text__4lA0q {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n\n\n\n\n";
var styles$2 = {"airCall_dialer_container":"ringoverDialer-module_airCall_dialer_container__O4QD8","airCall_dialer":"ringoverDialer-module_airCall_dialer__l7eed","airCall_dialer_contact":"ringoverDialer-module_airCall_dialer_contact__zzqXP","airCall_dialer_contact_names":"ringoverDialer-module_airCall_dialer_contact_names__KWrKN","airCall_dialer_contact_name":"ringoverDialer-module_airCall_dialer_contact_name__ZPlsE","airCall_dialer_contact_name_text":"ringoverDialer-module_airCall_dialer_contact_name_text__4lA0q"};
styleInject(css_248z$2);

var RingoverDialerFrame = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useRingoverDialer = useRingoverDialer(),
    contact = _useRingoverDialer.contact;
  var setContactViewBobjectId = function setContactViewBobjectId(bobjectId) {
    window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension, {
      detail: {
        bobjectId: bobjectId
      }
    }));
  };
  return /*#__PURE__*/jsxs("div", {
    className: styles$2.airCall_dialer_container,
    id: "bb-ringover-dialer",
    children: [contact && /*#__PURE__*/jsxs("div", {
      className: styles$2.airCall_dialer_contact,
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$2.airCall_dialer_contact_names,
        children: [contact.leadName && /*#__PURE__*/jsxs("div", {
          className: styles$2.airCall_dialer_contact_name,
          onClick: function onClick() {
            return setContactViewBobjectId(contact.leadId);
          },
          children: [/*#__PURE__*/jsx(Icon, {
            name: 'bloobirds',
            color: "bloobirds",
            size: 20
          }), /*#__PURE__*/jsx(Text, {
            size: 'm',
            color: "bloobirds",
            weight: "bold",
            className: styles$2.airCall_dialer_contact_name_text,
            children: contact.leadName
          })]
        }), contact.companyName && /*#__PURE__*/jsxs("div", {
          className: styles$2.airCall_dialer_contact_name,
          onClick: function onClick() {
            return setContactViewBobjectId(contact.companyId);
          },
          children: [/*#__PURE__*/jsx(Icon, {
            name: 'company',
            color: "bloobirds",
            size: 16
          }), /*#__PURE__*/jsx(Text, {
            size: 's',
            color: "bloobirds",
            className: styles$2.airCall_dialer_contact_name_text,
            children: contact.companyName
          })]
        })]
      }), contact.multipleContacts && /*#__PURE__*/jsx("div", {
        className: styles$2.airCall_dialer_contact_multiple,
        children: /*#__PURE__*/jsx(InfoWarning, {
          message: "There are multiple records with this phone number"
        })
      })]
    }), /*#__PURE__*/jsx("div", {
      id: "ringover-phone",
      ref: ref,
      className: styles$2.airCall_dialer
    })]
  });
});

function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
function _regeneratorRuntime$2() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$2 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$2(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$2(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray$3(arr, i) { return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3(); }
function _nonIterableRest$3() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }
function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$3(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$3(arr) { if (Array.isArray(arr)) return arr; }
var RingoverContext = /*#__PURE__*/React.createContext(null);
var RingoverDialer = function RingoverDialer() {
  var dialedPhoneNumber = useDialer(function (state) {
    return state.dialedPhoneNumber;
  });
  var _useDialerStore = useDialerStore(),
    maximize = _useDialerStore.maximize,
    setActivityExternal = _useDialerStore.setActivityExternal,
    closeExtendedScreen = _useDialerStore.closeExtendedScreen;
  var _useState = useState(),
    _useState2 = _slicedToArray$3(_useState, 2),
    launch = _useState2[0],
    setLaunch = _useState2[1];
  var ref = useRef(null);
  var _useState3 = useState(null),
    _useState4 = _slicedToArray$3(_useState3, 2),
    activityCCF = _useState4[0],
    setActivityCCF = _useState4[1];
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray$3(_React$useState, 2),
    showCorrectContactFlow = _React$useState2[0],
    setShowCorrectContactFlow = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray$3(_React$useState3, 2),
    mainActivityBobject = _React$useState4[0],
    setMainActivityBobject = _React$useState4[1];
  var _useWizardContext = useWizardContext(),
    openWizard = _useWizardContext.openWizard,
    resetWizardProperties = _useWizardContext.resetWizardProperties;
  var _useState5 = useState(null),
    _useState6 = _slicedToArray$3(_useState5, 2),
    contact = _useState6[0],
    setContact = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray$3(_useState7, 2),
    callId = _useState8[0],
    setCallId = _useState8[1];
  var hasOpenCCFWithoutObjectAccount = useOpenCCFWithoutObject();
  var _useSWR = useSWR(callId ? "/calls/ringover/calls/".concat(callId) : null,
    /*#__PURE__*/
    // TODO: create endpoint to get call activity
    function () {
      var _ref = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee(url) {
        var response;
        return _regeneratorRuntime$2().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return api.get(url);
            case 2:
              response = _context.sent;
              return _context.abrupt("return", response === null || response === void 0 ? void 0 : response.data);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x2) {
        return _ref.apply(this, arguments);
      };
    }(), {
      onErrorRetry: function onErrorRetry(error, key, config, revalidate, _ref2) {
        var retryCount = _ref2.retryCount;
        if (retryCount >= 15) {
          return;
        }
        setTimeout(function () {
          return revalidate({
            retryCount: retryCount
          });
        }, 1000);
      }
    }),
    activity = _useSWR.data;
  useEffect(function () {
    if (activity) {
      setActivityExternal(activity);
    }
  }, [activity]);
  function openCorrectContactFlow(_x3) {
    return _openCorrectContactFlow.apply(this, arguments);
  }
  function _openCorrectContactFlow() {
    _openCorrectContactFlow = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee4(activity) {
      var mainBobjectId, _PluralBobjectTypes$m, response;
      return _regeneratorRuntime$2().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CALL_BUTTON_ON_AIRCALL_OTO); // TODO: change event name
            mainBobjectId = getMainBobjectId(activity);
            if (!mainBobjectId) {
              _context4.next = 7;
              break;
            }
            _context4.next = 5;
            return api.get("/linkedin/".concat((_PluralBobjectTypes$m = PluralBobjectTypes[mainBobjectId.split('/')[1]]) === null || _PluralBobjectTypes$m === void 0 ? void 0 : _PluralBobjectTypes$m.toLowerCase(), "/").concat(mainBobjectId.split('/')[2]));
          case 5:
            response = _context4.sent;
            setMainActivityBobject(response === null || response === void 0 ? void 0 : response.data);
          case 7:
            setShowCorrectContactFlow(true);
          case 8:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return _openCorrectContactFlow.apply(this, arguments);
  }
  var createCallAndLaunchCCF = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee2(details) {
      var _yield$api$post, activity;
      return _regeneratorRuntime$2().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return api.post('/calls/ringover/calls/' + (details === null || details === void 0 ? void 0 : details.call_id) + '/end');
          case 2:
            _yield$api$post = _context2.sent;
            activity = _yield$api$post.data;
            if (activity) {
              api.get("/bobjects/".concat(activity === null || activity === void 0 ? void 0 : activity.activity, "/form?injectReferences=true")).then(function (response) {
                if (response !== null && response !== void 0 && response.data) {
                  var activityToCCF = fillReferenceFields(response === null || response === void 0 ? void 0 : response.data);
                  if (activityToCCF) {
                    setActivityCCF(activityToCCF);
                    openCorrectContactFlow(activityToCCF);
                  }
                }
              });
            }
          case 5:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function createCallAndLaunchCCF(_x4) {
      return _ref3.apply(this, arguments);
    };
  }();
  var setContactInfo = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee3(phoneNumber) {
      var response, bobjects, bobject;
      return _regeneratorRuntime$2().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return api.post('/calls/whiteLabel/search', {
              phoneNumber: phoneNumber
            });
          case 2:
            response = _context3.sent;
            if (!(response.status !== 200)) {
              _context3.next = 5;
              break;
            }
            return _context3.abrupt("return");
          case 5:
            bobjects = Array.isArray(response.data) ? response.data : [response.data];
            if (!(bobjects.length === 0)) {
              _context3.next = 8;
              break;
            }
            return _context3.abrupt("return");
          case 8:
            if (!(bobjects.length > 1)) {
              _context3.next = 11;
              break;
            }
            // Multiple bobjects with the same phone number, notify the user
            setContact({
              multipleContacts: true,
              numberOfContacts: bobjects.length
            });
            return _context3.abrupt("return");
          case 11:
            bobject = bobjects[0];
            setContact({
              leadName: isLead(bobject) ? getTextFromLogicRole(bobject, 'LEAD__FULL_NAME') : undefined,
              leadId: isLead(bobject) ? bobject.id.value : undefined,
              companyName: isLead(bobject) ? getTextFromLogicRole(bobject, 'LEAD__COMPANY_NAME') : getTextFromLogicRole(bobject, 'COMPANY__NAME'),
              companyId: isLead(bobject) ? getTextFromLogicRole(bobject, 'LEAD__COMPANY') : bobject.id.value,
              multipleContacts: false
            });
          case 13:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function setContactInfo(_x5) {
      return _ref4.apply(this, arguments);
    };
  }();
  var ringoverPhoneExt = useMemo(function () {
    if (ref.current) {
      try {
        // @ts-ignore
        var newPhone = new RingoverSDK({
          // "fixed", "relative", "absolute"
          type: 'relative',
          // "big", "medium", "small", "auto"
          size: 'auto',
          container: 'ringover-phone',
          position: {
            top: null,
            bottom: '2px',
            left: '2px',
            right: '2px'
          },
          // true, false
          border: false,
          // true, false
          animation: true,
          // "rgb(0,0,0)", "#eee", "red"
          backgroundColor: 'transparent',
          // true, false
          trayicon: false
        });
        newPhone.on('ringingCall', function (e) {
          if (e.data.direction === 'in') {
            setContactInfo(e.data.from);
            closeExtendedScreen();
            setActivityExternal(null);
            setTimeout(function () {
              return setCallId(e.data.call_id);
            }, 3000);
            maximize();
          } else {
            setContactInfo(e.data.to);
            closeExtendedScreen();
            setActivityExternal(null);
            setTimeout(function () {
              return setCallId(e.data.call_id);
            }, 3000);
          }
        });
        newPhone.on('hangupCall', function (e) {
          // Close the lead details
          setContact(null);
          createCallAndLaunchCCF(e.data);
        });
        newPhone.generate();
        return newPhone;
      } catch (e) {
        console.error('setting ringover sdk error', e);
      }
    }
    return null;
  }, [ref.current, launch]);
  useEffect(function () {
    if (dialedPhoneNumber) {
      if (isSalesforcePage(normalizeUrl(window.location.href))) {
        // TODO: check if that is necesary
        var possibleCti = document.querySelector('iframe[src*="cti.ringover.io"]');
        if (possibleCti) {
          possibleCti.remove();
          setTimeout( // @ts-ignore
          ringoverPhoneExt === null || ringoverPhoneExt === void 0 ? void 0 : ringoverPhoneExt.dial(dialedPhoneNumber), 1);
        } else {
          ringoverPhoneExt === null || ringoverPhoneExt === void 0 ? void 0 : ringoverPhoneExt.dial(dialedPhoneNumber);
        }
      } else {
        ringoverPhoneExt === null || ringoverPhoneExt === void 0 ? void 0 : ringoverPhoneExt.dial(dialedPhoneNumber);
      }
    }
  }, [dialedPhoneNumber, ringoverPhoneExt]);
  function handleClose() {
    closeExtendedScreen();
    setActivityExternal(null);
    setActivityCCF(null);
    setShowCorrectContactFlow(false);
    setMainActivityBobject(null);
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }
  return /*#__PURE__*/jsx(RingoverContext.Provider, {
    value: {
      ringoverPhoneExt: ringoverPhoneExt,
      launch: launch,
      setLaunch: setLaunch,
      contact: contact
    },
    children: /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsx(RingoverDialerFrame, {
        ref: ref
      }), showCorrectContactFlow && activityCCF && (mainActivityBobject || hasOpenCCFWithoutObjectAccount) && openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activityCCF, {
        referenceBobject: mainActivityBobject,
        handleClose: handleClose
      })]
    })
  });
};
var useRingoverDialer = function useRingoverDialer() {
  var context = React.useContext(RingoverContext);
  if (!context) {
    throw new Error('useRingoverDialer must be used within the RingoverProvider');
  }
  return context;
};

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2(); }
function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit$2(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime$1() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$1 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$1(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$2(arr); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$1(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var DialerTab;
(function (DialerTab) {
  DialerTab[DialerTab["dialer"] = 0] = "dialer";
  DialerTab[DialerTab["manual"] = 1] = "manual";
})(DialerTab || (DialerTab = {}));
var DialerStatus;
(function (DialerStatus) {
  DialerStatus[DialerStatus["authorizing"] = 0] = "authorizing";
  DialerStatus[DialerStatus["registering"] = 1] = "registering";
  DialerStatus[DialerStatus["idle"] = 2] = "idle";
  DialerStatus[DialerStatus["connected"] = 3] = "connected";
  DialerStatus[DialerStatus["callEnded"] = 4] = "callEnded";
  DialerStatus[DialerStatus["incoming"] = 5] = "incoming";
})(DialerStatus || (DialerStatus = {}));
var DialerOpenStatus;
(function (DialerOpenStatus) {
  DialerOpenStatus["open"] = "OPEN";
  DialerOpenStatus["closed"] = "CLOSED";
  DialerOpenStatus["minimized"] = "MINIMIZED";
})(DialerOpenStatus || (DialerOpenStatus = {}));
var DialerStore = /*#__PURE__*/React.createContext(undefined);
var useDialerStore = function useDialerStore() {
  return React.useContext(DialerStore);
};
var useDialerLauncher = function useDialerLauncher() {
  function openDialer(phoneNumber, bobjectId) {
    var openDialerEvent = new CustomEvent('openDialer', {
      detail: {
        phoneNumber: phoneNumber,
        bobjectId: bobjectId
      }
    });
    window.dispatchEvent(openDialerEvent);
  }
  return {
    openDialer: openDialer
  };
};
function useDialer(selector) {
  var store = useDialerStore();
  var cb = function cb() {
    return selector(store.snapshot());
  };
  return useSyncExternalStore(store.subscribe, cb, cb);
}
var Dialer = function Dialer() {
  var _settings$user, _settings$user2;
  var listeners = useLazyRef(function () {
    return new Set();
  });
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var dialerDefaultView = settings === null || settings === void 0 ? void 0 : (_settings$user = settings.user) === null || _settings$user === void 0 ? void 0 : _settings$user.dialerDefaultView;
  var autoOpenPitchesInDialer = settings === null || settings === void 0 ? void 0 : (_settings$user2 = settings.user) === null || _settings$user2 === void 0 ? void 0 : _settings$user2.autoOpenPitchesInDialer;
  var state = useLazyRef(function () {
    return {
      id: v4(),
      open: DialerOpenStatus.closed,
      tab: dialerDefaultView === 'logCall' ? DialerTab.manual : DialerTab.dialer,
      dialedPhoneNumber: '',
      bobjectMatch: null,
      selectedPhoneNumber: null,
      device: null,
      status: DialerStatus.authorizing,
      call: null,
      callStatus: null,
      errors: [],
      warnings: [],
      callDirection: 'outbound',
      activity: null,
      notePanelOpen: false,
      note: null,
      showingExtendedScreen: autoOpenPitchesInDialer,
      extendedScreenType: autoOpenPitchesInDialer ? 'pitches' : null,
      autoOpenPitchesInDialer: autoOpenPitchesInDialer,
      bobjectId: null,
      incomingAccepted: false
    };
  });
  var store = React.useMemo(function () {
    return {
      setState: function setState(key, value) {
        state.current[key] = value;
        store.emit();
      },
      snapshot: function snapshot() {
        return state.current;
      },
      minimize: function minimize() {
        return store.setState('open', DialerOpenStatus.minimized);
      },
      maximize: function maximize() {
        return store.setState('open', DialerOpenStatus.open);
      },
      close: function close() {
        var _store$snapshot = store.snapshot(),
          extendedScreenType = _store$snapshot.extendedScreenType;
        if (extendedScreenType === 'notes') {
          state.current['showingExtendedScreen'] = false;
        }
        state.current['bobjectMatch'] = null;
        state.current['open'] = DialerOpenStatus.closed;
        state.current['showingPitches'] = state.current['autoOpenPitchesInDialer'];
        state.current['bobjectId'] = null;
        state.current['activity'] = null;
        state.current['incomingAccepted'] = false;
        store.emit();
      },
      setSelectedTab: function setSelectedTab(tab) {
        return store.setState('tab', tab);
      },
      setDialedPhoneNumber: function setDialedPhoneNumber(phoneNumber) {
        var bobjectId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        store.setState('dialedPhoneNumber', phoneNumber);
        store.setState('bobjectId', bobjectId);
        store.setState('bobjectMatch', {
          hasMatched: undefined
        });
      },
      startCall: function () {
        var _startCall = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee(newCall) {
          var finishCall;
          return _regeneratorRuntime$1().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                finishCall = function _finishCall() {
                  state.current['status'] = DialerStatus.callEnded;
                  state.current['call'] = null;
                  state.current['callStatus'] = null;
                  store.emit();
                  setTimeout(function () {
                    state.current['status'] = DialerStatus.idle;
                    state.current['note'] = null;
                    state.current['notePanelOpen'] = false;
                    state.current['activity'] = null;
                    state.current['dialedPhoneNumber'] = '';
                    state.current['bobjectId'] = null;
                    state.current['incomingAccepted'] = false;
                    store.emit();
                  }, 3000);
                };
                newCall.on('sample', function () {
                  store.setState('callStatus', newCall.status());
                });
                newCall.on('disconnect', finishCall);
                newCall.on('cancel', finishCall);
                newCall.on('error', function (error) {
                  console.error("There's been an error with the call", error);
                  store.setState('errors', [].concat(_toConsumableArray(state.current.errors), [error]));
                });
                newCall.on('warning', function (warning) {
                  store.setState('warnings', [].concat(_toConsumableArray(state.current.warnings), [warning]));
                });
                store.setState('call', newCall);
                store.setState('callStatus', newCall.status());
              case 8:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        function startCall(_x) {
          return _startCall.apply(this, arguments);
        }
        return startCall;
      }(),
      setMatchedBobject: function () {
        var _setMatchedBobject = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee2(bobject) {
          var additionalInfo, _relatedCompany$raw, _yield$api$get, relatedCompany;
          return _regeneratorRuntime$1().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                additionalInfo = {};
                if (!bobject) {
                  _context2.next = 15;
                  break;
                }
                if (!bobject.companyId) {
                  _context2.next = 14;
                  break;
                }
                _context2.prev = 3;
                _context2.next = 6;
                return api.get("/bobjects/".concat(bobject.companyId, "/form"));
              case 6:
                _yield$api$get = _context2.sent;
                relatedCompany = _yield$api$get.data;
                additionalInfo = relatedCompany === null || relatedCompany === void 0 ? void 0 : (_relatedCompany$raw = relatedCompany.raw) === null || _relatedCompany$raw === void 0 ? void 0 : _relatedCompany$raw.contents;
                _context2.next = 14;
                break;
              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](3);
                Sentry.captureException(_context2.t0, {
                  tags: {
                    module: 'dialer'
                  },
                  extra: {
                    origin: 'Get related company',
                    bobject: bobject,
                    companyUrl: "/bobjects/".concat(bobject.companyId, "/form")
                  }
                });
              case 14:
                store.setState('bobjectMatch', _objectSpread(_objectSpread({}, bobject), additionalInfo && Object.keys(additionalInfo).length === 0 ? {
                  relatedBobject: additionalInfo
                } : {}));
              case 15:
              case "end":
                return _context2.stop();
            }
          }, _callee2, null, [[3, 11]]);
        }));
        function setMatchedBobject(_x2) {
          return _setMatchedBobject.apply(this, arguments);
        }
        return setMatchedBobject;
      }(),
      hangCall: function hangCall() {
        var _store$snapshot2 = store.snapshot(),
          call = _store$snapshot2.call;
        if (call) {
          call.disconnect();
        }
        state.current['status'] = DialerStatus.callEnded;
        state.current['call'] = null;
        state.current['callStatus'] = null;
        store.emit();
        setTimeout(function () {
          state.current['status'] = DialerStatus.idle;
          state.current['note'] = null;
          state.current['notePanelOpen'] = false;
          state.current['activity'] = null;
          state.current['dialedPhoneNumber'] = '';
          state.current['incomingAccepted'] = false;
          store.emit();
        }, 3000);
      },
      emit: function emit() {
        return listeners.current.forEach(function (listener) {
          return listener();
        });
      },
      subscribe: function subscribe(callback) {
        listeners.current.add(callback);
        return function () {
          return listeners.current["delete"](callback);
        };
      },
      setActivity: function () {
        var _setActivity = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee3(activityId) {
          var forceSetActivity,
            _activity,
            activityWithReferences,
            activityPhoneNumber,
            _args3 = arguments;
          return _regeneratorRuntime$1().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                forceSetActivity = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;
                if (!activityId) {
                  _context3.next = 8;
                  break;
                }
                _context3.next = 4;
                return api.get("/bobjects/".concat(activityId, "/form?injectReferences=true"));
              case 4:
                _activity = _context3.sent;
                activityWithReferences = fillReferenceFields(_activity === null || _activity === void 0 ? void 0 : _activity.data);
                activityPhoneNumber = getValueFromLogicRole(activityWithReferences, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER);
                if (forceSetActivity || activityPhoneNumber === store.snapshot().dialedPhoneNumber) {
                  store.setState('activity', activityWithReferences);
                }
              case 8:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }));
        function setActivity(_x3) {
          return _setActivity.apply(this, arguments);
        }
        return setActivity;
      }(),
      setActivityExternal: function () {
        var _setActivityExternal = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee4(activity) {
          return _regeneratorRuntime$1().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                store.setState('activity', activity);
              case 1:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }));
        function setActivityExternal(_x4) {
          return _setActivityExternal.apply(this, arguments);
        }
        return setActivityExternal;
      }(),
      setActivityLogCall: function () {
        var _setActivityLogCall = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee5(activityId) {
          var _activity2, activityWithReferences;
          return _regeneratorRuntime$1().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                if (!activityId) {
                  _context5.next = 8;
                  break;
                }
                _context5.next = 3;
                return api.get("/bobjects/".concat(activityId, "/form?injectReferences=true"));
              case 3:
                _activity2 = _context5.sent;
                activityWithReferences = fillReferenceFields(_activity2 === null || _activity2 === void 0 ? void 0 : _activity2.data);
                store.setState('activity', activityWithReferences);
                store.setState('status', DialerStatus.callEnded);
                setTimeout(function () {
                  store.setState('status', DialerStatus.idle);
                }, 3000);
              case 8:
              case "end":
                return _context5.stop();
            }
          }, _callee5);
        }));
        function setActivityLogCall(_x5) {
          return _setActivityLogCall.apply(this, arguments);
        }
        return setActivityLogCall;
      }(),
      finishCall: function finishCall() {
        state.current['status'] = DialerStatus.idle;
        state.current['note'] = null;
        state.current['notePanelOpen'] = false;
        state.current['activity'] = null;
        state.current['dialedPhoneNumber'] = '';
        state.current['showingPitches'] = false;
        state.current['bobjectId'] = null;
        state.current['incomingAccepted'] = false;
        store.emit();
      },
      toggleExtendedScreen: function toggleExtendedScreen(extendedScreenType) {
        var newState = extendedScreenType !== state.current['extendedScreenType'] || !state.current['showingExtendedScreen'];
        store.setState('showingExtendedScreen', newState);
        store.setState('extendedScreenType', extendedScreenType);
      },
      closeExtendedScreen: function closeExtendedScreen() {
        if (state.current['extendedScreenType'] === 'notes') {
          store.setState('showingExtendedScreen', false);
          store.setState('extendedScreenType', null);
        }
      },
      setAutoOpenPitchesInDialer: function setAutoOpenPitchesInDialer(autoOpenPitchesInDialer) {
        store.setState('autoOpenPitchesInDialer', autoOpenPitchesInDialer);
      }
    };
  }, []);
  window.addEventListener('openDialer', function (e) {
    var _e$detail, _e$detail3, _e$detail4;
    var dialerType = settings.user.dialerType;
    if (dialerType === 'NUMINTEC_DIALER' && (_e$detail = e.detail) !== null && _e$detail !== void 0 && _e$detail.phoneNumber && !store.snapshot().dialedPhoneNumber) {
      var _e$detail2;
      api.post("/calls/numintec/sync/call/".concat((_e$detail2 = e.detail) === null || _e$detail2 === void 0 ? void 0 : _e$detail2.phoneNumber), {});
    }
    store.setState('dialedPhoneNumber', (_e$detail3 = e.detail) === null || _e$detail3 === void 0 ? void 0 : _e$detail3.phoneNumber);
    store.setState('open', DialerOpenStatus.open);
    store.setState('bobjectId', (_e$detail4 = e.detail) === null || _e$detail4 === void 0 ? void 0 : _e$detail4.bobjectId);
  });

  // Event listener to know if the user logged out
  // And listener to minimize dialer from everywhere
  useEffect(function () {
    var closeDialer = function closeDialer() {
      store.close();
    };
    window.addEventListener(MessagesEvents.UserLoggedOut, closeDialer);
    window.addEventListener(MessagesEvents.MinimizeDialer, function () {
      return store.minimize();
    });
    return function () {
      window.removeEventListener(MessagesEvents.UserLoggedOut, closeDialer);
      window.removeEventListener(MessagesEvents.MinimizeDialer, function () {
        return store.minimize();
      });
    };
  }, []);
  return /*#__PURE__*/jsx(Portal, {
    children: /*#__PURE__*/jsxs(DialerStore.Provider, {
      value: store,
      children: [/*#__PURE__*/jsx(ActivityHandler, {}), /*#__PURE__*/jsx(FloatingBox, {})]
    })
  });
};
var ActivityHandler = function ActivityHandler() {
  var _useDialerStore = useDialerStore(),
    snapshot = _useDialerStore.snapshot,
    setActivity = _useDialerStore.setActivity;
  var _useActiveUserSetting2 = useActiveUserSettings(),
    settings = _useActiveUserSetting2.settings;
  useEventSubscription('twilio-response', function (message) {
    if (!snapshot().activity) {
      setActivity("".concat(settings === null || settings === void 0 ? void 0 : settings.account.id, "/Activity/").concat(message === null || message === void 0 ? void 0 : message.activityId));
    }
  }, {
    createSubscription: Boolean(settings === null || settings === void 0 ? void 0 : settings.account)
  });
  return null;
};
var FloatingBox = function FloatingBox() {
  var open = useDialer(function (state) {
    return state.open;
  });
  var _useDialerPosition = useDialerPosition(open === DialerOpenStatus.open),
    position = _useDialerPosition.position,
    bounds = _useDialerPosition.bounds,
    setPosition = _useDialerPosition.setPosition;
  var _useActiveUserSetting3 = useActiveUserSettings(),
    settings = _useActiveUserSetting3.settings;
  var dialerType = settings.user.dialerType;
  var classes = clsx(styles$6.content, _defineProperty$1({}, styles$6.contentAircall, dialerType === 'AIRCALL_DIALER'));
  useEffect(function () {
    if (dialerType === 'AIRCALL_DIALER') {
      var selector = 'iframe[src*="cti.aircall.io"]';
      isElementLoaded(selector).then(function () {
        if (isSalesforcePage(normalizeUrl(window.location.href))) {
          var possibleCti = document.querySelector(selector);
          if (possibleCti) {
            possibleCti.remove();
          }
        }
      });
    }
  }, []);
  return /*#__PURE__*/jsxs("div", {
    className: styles$6.container,
    style: {
      display: open !== DialerOpenStatus.closed ? 'inherit' : 'none'
    },
    children: [/*#__PURE__*/jsx("div", {
      style: {
        display: open === DialerOpenStatus.open ? 'inherit' : 'none'
      },
      children: /*#__PURE__*/jsx(Draggable, {
        handle: "#dialer-drag-box",
        position: position,
        bounds: bounds,
        onStop: function onStop(e, data) {
          return setPosition({
            x: data.x,
            y: data.y
          });
        },
        children: /*#__PURE__*/jsxs("div", {
          className: classes,
          children: [/*#__PURE__*/jsx(DialerContent, {}), /*#__PURE__*/jsx(DialerExtendedScreen, {
            position: position
          })]
        })
      })
    }), open !== DialerOpenStatus.open && /*#__PURE__*/jsx(DialerDragBox, {})]
  });
};
var DialerDragBox = function DialerDragBox() {
  var _useDialerStore2 = useDialerStore(),
    maximize = _useDialerStore2.maximize,
    close = _useDialerStore2.close;
  return /*#__PURE__*/jsxs("div", {
    className: styles$6.floatingBox,
    onClick: function onClick(e) {
      maximize();
      e.stopPropagation();
      e.preventDefault();
    },
    children: [/*#__PURE__*/jsx("div", {
      className: styles$6.closeButton,
      onClick: function onClick(e) {
        close();
        e.stopPropagation();
        e.preventDefault();
      },
      children: /*#__PURE__*/jsx(Icon, {
        name: "cross",
        size: 16,
        color: "white"
      })
    }), /*#__PURE__*/jsx(Icon, {
      name: "phone",
      color: "white",
      size: 40
    })]
  });
};
var DialerContent = function DialerContent() {
  var tab = useDialer(function (state) {
    return state.tab;
  });
  var status = useDialer(function (state) {
    return state.status;
  });
  var isNotePanelOpen = useDialer(function (state) {
    return state.notePanelOpen;
  });
  var _useDialerStore3 = useDialerStore(),
    setState = _useDialerStore3.setState;
  var _useActiveUserSetting4 = useActiveUserSettings(),
    settings = _useActiveUserSetting4.settings;
  var dialerType = settings.user.dialerType;
  if (tab === DialerTab.manual && !isNotePanelOpen) {
    setState('notePanelOpen', true);
  }
  var classes = clsx(styles$6.contentBox, _defineProperty$1(_defineProperty$1(_defineProperty$1(_defineProperty$1(_defineProperty$1({}, styles$6.contentBoxBloobirds, dialerType !== 'ASTROLINE_DIALER'), styles$6.contentBoxOthers, dialerType === 'ASTROLINE_DIALER'), styles$6.contentBoxAircall, dialerType === 'AIRCALL_DIALER'), styles$6.contentBoxNumintec, dialerType === 'NUMINTEC_DIALER'), styles$6.contentBoxRingover, dialerType === 'RINGOVER_DIALER'));
  return /*#__PURE__*/jsxs("div", {
    className: classes,
    children: [/*#__PURE__*/jsx(DialerHeader, {
      showTabs: dialerType === 'BLOOBIRDS_DIALER' || !dialerType,
      showNoteButton: dialerType === 'AIRCALL_DIALER' || dialerType === 'NUMINTEC_DIALER' || dialerType === 'RINGOVER_DIALER'
    }), dialerType === 'ASTROLINE_DIALER' ? /*#__PURE__*/jsx(AstrolineDialerFrame, {
      launchCCF: true
    }) : dialerType === 'AIRCALL_DIALER' ? /*#__PURE__*/jsx(AircallDialer, {}) : dialerType === 'NUMINTEC_DIALER' ? /*#__PURE__*/jsx(NumintecDialer, {}) : dialerType === 'RINGOVER_DIALER' ? /*#__PURE__*/jsx(RingoverDialer, {}) : /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsx(DeviceHandler, {}), /*#__PURE__*/jsx(DialerErrorWarning, {}), /*#__PURE__*/jsx(DialerStatusHeader, {}), /*#__PURE__*/jsx(Dial, {}), /*#__PURE__*/jsxs("div", {
        className: styles$6.actionsPanel,
        children: [tab === DialerTab.dialer && /*#__PURE__*/jsx(RingHangupButton, {}), tab === DialerTab.dialer && /*#__PURE__*/jsx(DialerConnectionHint, {}), tab === DialerTab.dialer && status !== DialerStatus.authorizing && /*#__PURE__*/jsx(DialerHelpMessage, {}), tab === DialerTab.manual && /*#__PURE__*/jsx(CallDirection, {}), status !== DialerStatus.authorizing && /*#__PURE__*/jsx(DialerUserPhoneSelector, {})]
      }), tab === DialerTab.dialer && /*#__PURE__*/jsx(NotePanelButton, {}), isNotePanelOpen && /*#__PURE__*/jsx(NotePanel, {}), tab === DialerTab.dialer && /*#__PURE__*/jsx(DialPad, {}), tab === DialerTab.manual && /*#__PURE__*/jsx(LogCallButton, {}), /*#__PURE__*/jsx(CorrectContactFlow, {})]
    })]
  });
};
var NotePanelButton = function NotePanelButton() {
  var _useDialerStore4 = useDialerStore(),
    setState = _useDialerStore4.setState;
  var activity = useDialer(function (state) {
    return state.activity;
  });
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  return activity ? /*#__PURE__*/jsx("div", {
    className: styles$6.notePanelButton,
    onClick: function onClick() {
      return setState('notePanelOpen', true);
    },
    children: /*#__PURE__*/jsx(Button, {
      variant: "clear",
      size: "small",
      color: "peanut",
      iconLeft: "noteAction",
      uppercase: false,
      children: t('dialer.addNote')
    })
  }) : null;
};
var NotePanel = function NotePanel() {
  var _useState = useState(null),
    _useState2 = _slicedToArray$2(_useState, 2),
    editor = _useState2[0],
    setEditor = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray$2(_useState3, 2),
    lastBobjectId = _useState4[0],
    setLastBobjectId = _useState4[1];
  var activity = useDialer(function (state) {
    return state.activity;
  });
  var note = useDialer(function (state) {
    return state.note;
  });
  var tab = useDialer(function (state) {
    return state.tab;
  });
  var bobjectId = useDialer(function (state) {
    return state.bobjectId;
  });
  var open = useDialer(function (state) {
    return state.open;
  });
  var _useTranslation2 = useTranslation(),
    t = _useTranslation2.t;
  var _useDialerStore5 = useDialerStore(),
    setState = _useDialerStore5.setState;
  var _useActiveUserSetting5 = useActiveUserSettings(),
    settings = _useActiveUserSetting5.settings;
  var _useBobject = useBobject(BobjectTypes.Activity, settings === null || settings === void 0 ? void 0 : settings.account.id),
    patchBobject = _useBobject.patchBobject;
  function setNote(_x6) {
    return _setNote.apply(this, arguments);
  }
  function _setNote() {
    _setNote = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee7(note) {
      return _regeneratorRuntime$1().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            setState('note', note);
            if (!(tab === DialerTab.dialer)) {
              _context7.next = 4;
              break;
            }
            _context7.next = 4;
            return debouncedSaveNote(note);
          case 4:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    return _setNote.apply(this, arguments);
  }
  var plugins = useRichTextEditorPlugins({
    images: false,
    templateVariables: false
  });
  var debouncedSaveNote = useCallback(debounce( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee6(note) {
      return _regeneratorRuntime$1().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            if (!note) {
              _context6.next = 9;
              break;
            }
            _context6.prev = 1;
            _context6.next = 4;
            return patchBobject(activity.id.objectId, {
              contents: {
                ACTIVITY__NOTE: serialize(note, {
                  format: 'AST',
                  plugins: plugins
                })
              },
              params: {
                skipEmptyUpdates: true
              }
            });
          case 4:
            _context6.next = 9;
            break;
          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6["catch"](1);
            console.error(_context6.t0);
          case 9:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[1, 6]]);
    }));
    return function (_x7) {
      return _ref.apply(this, arguments);
    };
  }(), 1000), []);
  var classes = clsx(styles$6.notePanel, _defineProperty$1({}, styles$6.notePanelManual, tab === DialerTab.manual));
  var toolbarClasses = clsx(styles$6.toolbar, _defineProperty$1({}, styles$6.toolbarManual, tab === DialerTab.manual));
  useEffect(function () {
    if (editor && !note) {
      resetEditorChildren(editor);
    }
  }, [editor, note]);
  useEffect(function () {
    if (open !== DialerOpenStatus.closed) {
      if (!bobjectId || bobjectId !== lastBobjectId) {
        setState('note', null);
      }
      setLastBobjectId(bobjectId);
    }
  }, [bobjectId, open]);
  return /*#__PURE__*/jsx(motion.div, {
    initial: {
      y: tab === DialerTab.manual ? 0 : '100%'
    },
    animate: {
      y: 0
    },
    exit: {
      y: '100%'
    },
    transition: {
      duration: 0.2
    },
    className: classes,
    children: /*#__PURE__*/jsx(RichTextEditor, {
      id: 'callNote',
      value: note,
      plugins: plugins,
      placeholder: t('dialer.notePlaceholder'),
      onChange: setNote,
      style: {
        padding: '12px 28px 4px 28px'
      },
      setEditor: setEditor,
      children: function children(editor) {
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx("div", {
            className: styles$6.editorContent,
            children: editor
          }), tab !== DialerTab.manual && /*#__PURE__*/jsx("div", {
            className: styles$6.closeNotePanel,
            onClick: function onClick() {
              return setState('notePanelOpen', false);
            },
            children: /*#__PURE__*/jsx(Icon, {
              name: "cross",
              size: 16,
              color: "bloobirds"
            })
          }), /*#__PURE__*/jsx("div", {
            className: toolbarClasses,
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
};
var CorrectContactFlow = function CorrectContactFlow() {
  var _getFieldByLogicRole;
  var activity = useDialer(function (state) {
    return state.activity;
  });
  var status = useDialer(function (state) {
    return state.status;
  });
  var _useDialerStore6 = useDialerStore(),
    setActivity = _useDialerStore6.setActivity;
  var _useState5 = useState(null),
    _useState6 = _slicedToArray$2(_useState5, 2),
    activityCCF = _useState6[0],
    setActivityCCF = _useState6[1];
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray$2(_React$useState, 2),
    showCorrectContactFlow = _React$useState2[0],
    setShowCorrectContactFlow = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray$2(_React$useState3, 2),
    mainActivityBobject = _React$useState4[0],
    setMainActivityBobject = _React$useState4[1];
  var _useWizardContext = useWizardContext(),
    openWizard = _useWizardContext.openWizard,
    resetWizardProperties = _useWizardContext.resetWizardProperties;
  var incomingAccepted = useDialer(function (state) {
    return state.incomingAccepted;
  });
  var direction = (_getFieldByLogicRole = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.valueLogicRole;
  function openCorrectContactFlow() {
    return _openCorrectContactFlow.apply(this, arguments);
  }
  function _openCorrectContactFlow() {
    _openCorrectContactFlow = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee8() {
      var mainBobjectId, _PluralBobjectTypes$m, response;
      return _regeneratorRuntime$1().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            mainBobjectId = getMainBobjectId(activity);
            if (!mainBobjectId) {
              _context8.next = 6;
              break;
            }
            _context8.next = 4;
            return api.get("/linkedin/".concat((_PluralBobjectTypes$m = PluralBobjectTypes[mainBobjectId.split('/')[1]]) === null || _PluralBobjectTypes$m === void 0 ? void 0 : _PluralBobjectTypes$m.toLowerCase(), "/").concat(mainBobjectId.split('/')[2]));
          case 4:
            response = _context8.sent;
            setMainActivityBobject(response === null || response === void 0 ? void 0 : response.data);
          case 6:
            setShowCorrectContactFlow(true);
          case 7:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }));
    return _openCorrectContactFlow.apply(this, arguments);
  }
  React.useEffect(function () {
    if (activity && status === DialerStatus.callEnded && (direction == DIRECTION_VALUES_LOGIC_ROLE.OUTGOING || incomingAccepted)) {
      var _activity$id;
      api.get("/bobjects/".concat((_activity$id = activity.id) === null || _activity$id === void 0 ? void 0 : _activity$id.value, "/form?injectReferences=true")).then(function (response) {
        if (response !== null && response !== void 0 && response.data) {
          setActivityCCF(fillReferenceFields(response === null || response === void 0 ? void 0 : response.data));
        }
        openCorrectContactFlow();
      });
    }
  }, [status]);
  function handleClose() {
    setActivity(null);
    setShowCorrectContactFlow(false);
    setMainActivityBobject(null);
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }
  if (activityCCF && showCorrectContactFlow) {
    openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activityCCF, {
      referenceBobject: mainActivityBobject,
      handleClose: handleClose
    });
  }
  return /*#__PURE__*/jsx(Fragment, {});
};
var DialerHeader = function DialerHeader(_ref2) {
  var showTabs = _ref2.showTabs,
    showNoteButton = _ref2.showNoteButton;
  var _useDialerStore7 = useDialerStore(),
    minimize = _useDialerStore7.minimize,
    close = _useDialerStore7.close,
    setSelectedTab = _useDialerStore7.setSelectedTab,
    setState = _useDialerStore7.setState;
  var tab = useDialer(function (state) {
    return state.tab;
  });
  var status = useDialer(function (state) {
    return state.status;
  });
  var _useTranslation3 = useTranslation(),
    t = _useTranslation3.t;
  var activity = useDialer(function (state) {
    return state.activity;
  });
  var callInProgress = status === DialerStatus.connected || status === DialerStatus.incoming || status === DialerStatus.callEnded;
  var closeClasses = clsx(styles$6.headerClose, _defineProperty$1({}, styles$6.closeDisabled, callInProgress));
  return /*#__PURE__*/jsxs("div", {
    className: styles$6.header,
    id: "dialer-drag-box",
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$6.headerIcons,
      children: [/*#__PURE__*/jsx(Tooltip, {
        title: callInProgress ? t('dialer.tooltips.cannotClose') : t('dialer.tooltips.close'),
        position: "top",
        children: /*#__PURE__*/jsx("div", {
          className: closeClasses,
          onClick: function onClick() {
            if (!callInProgress) {
              close();
            }
          },
          children: /*#__PURE__*/jsx(Icon, {
            name: "cross",
            color: callInProgress ? 'softBloobirds' : 'bloobirds',
            size: 20
          })
        })
      }), /*#__PURE__*/jsx(Tooltip, {
        title: t('dialer.tooltips.minimize'),
        position: "top",
        children: /*#__PURE__*/jsx("div", {
          className: styles$6.headerClose,
          onClick: minimize,
          children: /*#__PURE__*/jsx(Icon, {
            name: "minus",
            color: "bloobirds",
            size: 20
          })
        })
      })]
    }), /*#__PURE__*/jsx("div", {
      className: styles$6.headerDragger,
      children: /*#__PURE__*/jsx(Icon, {
        name: "dragAndDrop",
        size: 24,
        color: "lightBloobirds"
      })
    }), showTabs ? /*#__PURE__*/jsxs("div", {
      className: styles$6.headerTabs,
      children: [/*#__PURE__*/jsxs("div", {
        className: clsx(styles$6.headerTab, _defineProperty$1({}, styles$6.headerTab_active, tab === DialerTab.dialer)),
        onClick: function onClick() {
          setSelectedTab(DialerTab.dialer);
          setState('notePanelOpen', false);
        },
        children: [/*#__PURE__*/jsx(Icon, {
          name: "phone",
          color: "bloobirds",
          size: 16
        }), /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "bloobirds",
          children: t('dialer.dialer')
        })]
      }), /*#__PURE__*/jsxs("div", {
        className: clsx(styles$6.headerTab, _defineProperty$1(_defineProperty$1({}, styles$6.headerTab_active, tab === DialerTab.manual), styles$6.headerTab_disabled, callInProgress)),
        onClick: function onClick() {
          if (!callInProgress) setSelectedTab(DialerTab.manual);
        },
        children: [/*#__PURE__*/jsx(Icon, {
          name: "noteAction",
          color: !callInProgress ? 'bloobirds' : 'softPeanut',
          size: 16
        }), /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "bloobirds",
          children: t('dialer.logCall.button')
        })]
      })]
    }) : /*#__PURE__*/jsxs("div", {
      className: styles$6.headerButtons,
      children: [showNoteButton && !!activity && /*#__PURE__*/jsx(NoteButton, {}), /*#__PURE__*/jsx(PitchButton, {})]
    })]
  });
};
function getDialerStatusText(status, t) {
  switch (status) {
    case DialerStatus.registering:
      return t('dialer.hints.connecting');
    case DialerStatus.authorizing:
    case DialerStatus.idle:
      return t('dialer.hints.make');
    case DialerStatus.connected:
      return t('dialer.hints.onCall');
    case DialerStatus.callEnded:
      return t('dialer.hints.callEnded');
    case DialerStatus.incoming:
      return t('dialer.hints.incomingCall');
    default:
      return t('dialer.hints.make');
  }
}
var PitchButton = function PitchButton() {
  var store = useDialerStore();
  var showingExternalScreen = useDialer(function (state) {
    return state.showingExtendedScreen;
  });
  var extendedScreenType = useDialer(function (state) {
    return state.extendedScreenType;
  });
  var _useTranslation4 = useTranslation(),
    t = _useTranslation4.t;
  return /*#__PURE__*/jsx(Button, {
    className: clsx(styles$6.headerButton, _defineProperty$1({}, styles$6.pitchButtonActivated, showingExternalScreen && extendedScreenType === 'pitches')),
    size: "small",
    variant: "secondary",
    color: "purple",
    iconLeft: "chat",
    uppercase: false,
    onClick: function onClick() {
      return store.toggleExtendedScreen('pitches');
    },
    children: t('dialer.pitch')
  });
};
var NoteButton = function NoteButton() {
  var store = useDialerStore();
  var showingExternalScreen = useDialer(function (state) {
    return state.showingExtendedScreen;
  });
  var extendedScreenType = useDialer(function (state) {
    return state.extendedScreenType;
  });
  var _useTranslation5 = useTranslation(),
    t = _useTranslation5.t;
  return /*#__PURE__*/jsx(Button, {
    className: clsx(styles$6.headerButton, _defineProperty$1({}, styles$6.notesButtonActivated, showingExternalScreen && extendedScreenType === 'notes')),
    size: "small",
    variant: "secondary",
    color: "banana",
    iconLeft: "note",
    uppercase: false,
    onClick: function onClick() {
      return store.toggleExtendedScreen('notes');
    },
    children: t('dialer.note')
  });
};
var DialerStatusHeader = function DialerStatusHeader() {
  var status = useDialer(function (state) {
    return state.status;
  });
  var tab = useDialer(function (state) {
    return state.tab;
  });
  var _useTranslation6 = useTranslation(),
    t = _useTranslation6.t;
  var statusText = getDialerStatusText(status, t);
  return /*#__PURE__*/jsxs("div", {
    className: styles$6.statusHeader,
    children: [/*#__PURE__*/jsx(Text, {
      weight: "bold",
      children: tab === DialerTab.manual ? t('dialer.logCall.title') : statusText
    }), /*#__PURE__*/jsx(PitchButton, {})]
  });
};
var DialerHelpMessage = function DialerHelpMessage() {
  var _useTranslation7 = useTranslation(),
    t = _useTranslation7.t;
  return /*#__PURE__*/jsxs("div", {
    className: styles$6.helpMessage,
    children: [/*#__PURE__*/jsx(Icon, {
      name: "info",
      size: 16,
      color: "bloobirds"
    }), /*#__PURE__*/jsx(Text, {
      size: "xs",
      color: "softPeanut",
      children: t('dialer.hints.connectionProblems')
    })]
  });
};
var DialerErrorWarning = function DialerErrorWarning() {
  var errors = useDialer(function (state) {
    return state.errors;
  });
  var warnings = useDialer(function (state) {
    return state.warnings;
  });
  var _useDialerStore8 = useDialerStore(),
    setState = _useDialerStore8.setState;
  if (errors.length === 0 && warnings.length === 0) {
    return null;
  }
  var className = clsx(styles$6.errorWarning, _defineProperty$1(_defineProperty$1({}, styles$6.errorWarning_error, errors.length > 0), styles$6.errorWarning_warning, warnings.length > 0));
  return /*#__PURE__*/jsxs(motion.div, {
    className: className,
    initial: {
      scale: 0
    },
    animate: {
      scale: 1
    },
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20
    },
    children: [/*#__PURE__*/jsx("div", {
      children: /*#__PURE__*/jsx(Text, {
        size: "m",
        color: errors.length > 0 ? 'white' : 'softPeanut',
        weight: "bold",
        align: "center",
        children: errors.length > 0 ? errors[0].description : warnings[0].description
      })
    }), /*#__PURE__*/jsx(Text, {
      size: "xs",
      color: errors.length > 0 ? 'white' : 'softPeanut',
      children: errors.length > 0 ? errors[0].explanation : warnings[0].explanation
    }), /*#__PURE__*/jsx(IconButton, {
      name: "cross",
      size: 24,
      color: errors.length > 0 ? 'white' : 'softPeanut',
      onClick: function onClick() {
        if (errors.length > 0) {
          setState('errors', []);
        } else {
          setState('warnings', []);
        }
      }
    })]
  });
};
var CallDirection = function CallDirection() {
  var callDirection = useDialer(function (state) {
    return state.callDirection;
  });
  var _useDialerStore9 = useDialerStore(),
    setState = _useDialerStore9.setState;
  var _useTranslation8 = useTranslation(),
    t = _useTranslation8.t;
  var spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30
  };
  return /*#__PURE__*/jsxs("div", {
    className: styles$6.callDirectionContainer,
    children: [/*#__PURE__*/jsx(Text, {
      size: "xs",
      weight: "bold",
      children: t('dialer.direction.title')
    }), /*#__PURE__*/jsxs("div", {
      className: styles$6.callDirection,
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$6.callDirectionLabel,
        children: [callDirection === 'inbound' && /*#__PURE__*/jsx(Icon, {
          name: "callIncoming",
          size: 16,
          color: "bloobirds"
        }), /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: callDirection === 'inbound' ? 'peanut' : 'softPeanut',
          align: "right",
          children: t('dialer.direction.incoming')
        })]
      }), /*#__PURE__*/jsx("div", {
        className: clsx(styles$6.directionSelector, _defineProperty$1(_defineProperty$1({}, styles$6.directionSelector__left, callDirection === 'inbound'), styles$6.directionSelector__right, callDirection === 'outbound')),
        onClick: function onClick() {
          return setState('callDirection', callDirection === 'inbound' ? 'outbound' : 'inbound');
        },
        children: /*#__PURE__*/jsx(motion.div, {
          layout: true,
          transition: spring
        })
      }), /*#__PURE__*/jsxs("div", {
        className: styles$6.callDirectionLabel,
        children: [callDirection === 'outbound' && /*#__PURE__*/jsx(Icon, {
          name: "callOutgoing",
          size: 16,
          color: "bloobirds"
        }), /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: callDirection === 'outbound' ? 'peanut' : 'softPeanut',
          align: "left",
          children: t('dialer.direction.outgoing')
        })]
      })]
    })]
  });
};

var css_248z$1 = ".logCallModal-module_content__BIrsb {\n  padding: 16px 24px 0 24px;\n}\n\n.logCallModal-module_content__BIrsb input {\n  margin: 0 !important;\n  box-shadow: none !important;\n  height: 32px;\n  border: none !important;\n  width: 100%;\n}\n\n.logCallModal-module_content__BIrsb > div > * {\n  margin: 8px 0;\n}\n\n.logCallModal-module_footer__2TKmB {\n  padding: 24px;\n}\n\n.logCallModal-module_header__9Tmsr {\n  padding: 12px 12px 12px 24px;\n}\n";
var styles$1 = {"content":"logCallModal-module_content__BIrsb","footer":"logCallModal-module_footer__2TKmB","header":"logCallModal-module_header__9Tmsr"};
styleInject(css_248z$1);

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$1(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
var LogCallModal = function LogCallModal(props) {
  var _settings$user;
  var leadId = props.leadId,
    companyId = props.companyId,
    userPhoneNumber = props.userPhoneNumber,
    dialedNumber = props.dialedNumber,
    onClose = props.onClose,
    opportunityId = props.opportunityId,
    leadsPhoneNumbers = props.leadsPhoneNumbers;
  var _useState = useState(),
    _useState2 = _slicedToArray$1(_useState, 2),
    loggingCall = _useState2[0],
    setLoggingCall = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray$1(_useState3, 2),
    activityCCF = _useState4[0],
    setActivityCCF = _useState4[1];
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray$1(_React$useState, 2),
    showCorrectContactFlow = _React$useState2[0],
    setShowCorrectContactFlow = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray$1(_React$useState3, 2),
    mainActivityBobject = _React$useState4[0],
    setMainActivityBobject = _React$useState4[1];
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var _useWizardContext = useWizardContext(),
    openWizard = _useWizardContext.openWizard,
    resetWizardProperties = _useWizardContext.resetWizardProperties;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var defaultValues = {
    direction: 'OUTGOING',
    userPhoneNumber: userPhoneNumber,
    dialedNumber: dialedNumber,
    callDateTime: new Date()
  };
  var _useForm = useForm({
      defaultValues: defaultValues
    }),
    control = _useForm.control,
    getValues = _useForm.getValues,
    setValue = _useForm.setValue;
  function openCorrectContactFlow(_x2) {
    return _openCorrectContactFlow.apply(this, arguments);
  }
  function _openCorrectContactFlow() {
    _openCorrectContactFlow = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(activity) {
      var mainBobjectId, _PluralBobjectTypes$m, response;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            mainBobjectId = getMainBobjectId(activity);
            if (!mainBobjectId) {
              _context2.next = 6;
              break;
            }
            _context2.next = 4;
            return api.get("/linkedin/".concat((_PluralBobjectTypes$m = PluralBobjectTypes[mainBobjectId.split('/')[1]]) === null || _PluralBobjectTypes$m === void 0 ? void 0 : _PluralBobjectTypes$m.toLowerCase(), "/").concat(mainBobjectId.split('/')[2]));
          case 4:
            response = _context2.sent;
            setMainActivityBobject(response === null || response === void 0 ? void 0 : response.data);
          case 6:
            setShowCorrectContactFlow(true);
          case 7:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return _openCorrectContactFlow.apply(this, arguments);
  }
  function logCall() {
    return _logCall.apply(this, arguments);
  }
  function _logCall() {
    _logCall = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var _values$callDateTime, _response$data2;
      var values, response, activity;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            values = getValues();
            setLoggingCall(true);
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_LOG_CALL_BUTTON_ON_MODAL_OTO);
            _context3.next = 5;
            return api.post("/calls/whiteLabel/call", {
              sdrPhone: values === null || values === void 0 ? void 0 : values.userPhoneNumber,
              leadPhone: values === null || values === void 0 ? void 0 : values.dialedNumber,
              leadId: leadId,
              companyId: companyId,
              direction: values === null || values === void 0 ? void 0 : values.direction,
              callDateTime: values === null || values === void 0 ? void 0 : (_values$callDateTime = values.callDateTime) === null || _values$callDateTime === void 0 ? void 0 : _values$callDateTime.toISOString(),
              callSid: "BB".concat(md5("".concat(userPhoneNumber).concat(dialedNumber).concat(new Date().toISOString()))),
              otherFields: _defineProperty({}, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY, opportunityId)
            });
          case 5:
            response = _context3.sent;
            try {
              createToast({
                message: t('dialer.logCall.toast.success'),
                type: 'success'
              });
              window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                detail: {
                  type: BobjectTypes.Activity
                }
              }));
            } catch (e) {
              console.error(e);
            }
            activity = response === null || response === void 0 ? void 0 : (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.activity;
            if (activity) {
              api.get("/bobjects/".concat(activity === null || activity === void 0 ? void 0 : activity.value, "/form?injectReferences=true")).then(function (response) {
                var activityToCCF = fillReferenceFields(response === null || response === void 0 ? void 0 : response.data);
                if (response !== null && response !== void 0 && response.data) {
                  setActivityCCF(activityToCCF);
                }
                openCorrectContactFlow(activityToCCF);
              });
            } else {
              onClose();
            }
            // Wait 1.5 seconds and clear the activity log call
            setTimeout(function () {
              setLoggingCall(false);
            }, 1500);
          case 10:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return _logCall.apply(this, arguments);
  }
  var _useSWR = useSWR("/entities/users/".concat(settings === null || settings === void 0 ? void 0 : (_settings$user = settings.user) === null || _settings$user === void 0 ? void 0 : _settings$user.id, "/phoneNumbers"), /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _settings$user2, _response$data, _response$data$_embed, _getValues;
      var response, filteredPhones, defaultOrFirst;
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
            if (!((_getValues = getValues()) !== null && _getValues !== void 0 && _getValues.userPhoneNumber) && filteredPhones.length > 0) {
              defaultOrFirst = filteredPhones.find(function (phoneNumber) {
                return phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.phoneByDefault;
              }) || filteredPhones[0];
              setValue('userPhoneNumber', defaultOrFirst.phoneNumber);
            }
            return _context.abrupt("return", filteredPhones);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))),
    userPhones = _useSWR.data;
  useEffect(function () {
    var _getValues2;
    if (!((_getValues2 = getValues()) !== null && _getValues2 !== void 0 && _getValues2.userPhoneNumber) && (userPhones === null || userPhones === void 0 ? void 0 : userPhones.length) > 0) {
      var defaultOrFirst = userPhones.find(function (phoneNumber) {
        return phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.phoneByDefault;
      }) || userPhones[0];
      setValue('userPhoneNumber', defaultOrFirst.phoneNumber);
    }
  }, []);
  function handleClose() {
    window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
      detail: {
        type: mainActivityBobject.id.typeName
      }
    }));
    onClose();
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }
  return /*#__PURE__*/jsx(Fragment, {
    children: !showCorrectContactFlow ? /*#__PURE__*/jsx(Fragment, {
      children: /*#__PURE__*/jsxs(Modal, {
        onClose: onClose,
        width: 342,
        open: true,
        children: [/*#__PURE__*/jsxs(ModalHeader, {
          size: "small",
          className: styles$1.header,
          children: [/*#__PURE__*/jsx(ModalTitle, {
            size: "small",
            icon: "callOutgoing",
            children: t('dialer.logCallModal.title')
          }), /*#__PURE__*/jsx(ModalCloseIcon, {
            onClick: onClose,
            size: "small"
          })]
        }), /*#__PURE__*/jsxs(ModalContent, {
          className: styles$1.content,
          children: [/*#__PURE__*/jsx(Controller, {
            control: control,
            name: "direction",
            render: function render(_ref2) {
              var field = _ref2.field;
              var handleOnChange = field.onChange;
              return /*#__PURE__*/jsxs(Fragment, {
                children: [/*#__PURE__*/jsx(Text, {
                  size: "s",
                  children: t('dialer.direction.title')
                }), /*#__PURE__*/jsxs(ChipGroup, {
                  value: field.value,
                  onChange: handleOnChange,
                  children: [/*#__PURE__*/jsx(Chip, {
                    value: "OUTGOING",
                    size: "small",
                    children: t('dialer.direction.outgoing')
                  }), /*#__PURE__*/jsx(Chip, {
                    value: "INCOMING",
                    size: "small",
                    children: t('dialer.direction.incoming')
                  })]
                })]
              });
            }
          }), /*#__PURE__*/jsx(Controller, {
            control: control,
            name: "callDateTime",
            render: function render(_ref3) {
              var field = _ref3.field;
              var handleOnChange = field.onChange;
              return /*#__PURE__*/jsx(DateTimePicker, {
                value: field.value,
                onChange: handleOnChange,
                placeholder: t('dialer.logCallModal.date'),
                width: "100%"
              });
            }
          }), /*#__PURE__*/jsx(Controller, {
            control: control,
            name: "userPhoneNumber",
            render: function render(_ref4) {
              var field = _ref4.field;
              var handleOnChange = field.onChange;
              return /*#__PURE__*/jsx(Select, {
                width: "100%",
                value: field.value,
                onChange: handleOnChange,
                placeholder: t('dialer.logCallModal.yourPhoneNumber'),
                borderless: true,
                children: userPhones === null || userPhones === void 0 ? void 0 : userPhones.map(function (phoneNumber) {
                  return /*#__PURE__*/jsx(Item, {
                    value: phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.phoneNumber,
                    children: phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.phoneNumber
                  }, phoneNumber.id);
                })
              });
            }
          }), /*#__PURE__*/jsx(Controller, {
            control: control,
            name: "dialedNumber",
            render: function render(_ref5) {
              var field = _ref5.field;
              var handleOnChange = field.onChange;
              return (leadsPhoneNumbers === null || leadsPhoneNumbers === void 0 ? void 0 : leadsPhoneNumbers.length) > 0 ? /*#__PURE__*/jsx(Select, {
                width: "100%",
                value: field.value,
                onChange: handleOnChange,
                placeholder: t('dialer.logCallModal.phoneNumber'),
                borderless: true,
                children: leadsPhoneNumbers.map(function (phoneNumber, idx) {
                  return /*#__PURE__*/jsx(Item, {
                    value: phoneNumber,
                    children: phoneNumber
                  }, phoneNumber + '-' + idx);
                })
              }) : /*#__PURE__*/jsx(Input, {
                width: "100%",
                value: field.value,
                onChange: handleOnChange,
                placeholder: t('dialer.logCallModal.phoneNumber'),
                borderless: true
              });
            }
          })]
        }), /*#__PURE__*/jsxs(ModalFooter, {
          className: styles$1.footer,
          children: [/*#__PURE__*/jsx(Button, {
            size: "small",
            variant: "clear",
            onClick: onClose,
            children: t('common.cancel')
          }), /*#__PURE__*/jsx(Button, {
            size: "small",
            variant: "primary",
            onClick: logCall,
            children: !loggingCall ? t('dialer.logCall.button') : /*#__PURE__*/jsx(Spinner, {
              name: "loadingCircle",
              color: "white",
              size: 12
            })
          })]
        })]
      })
    }) : /*#__PURE__*/jsx(Fragment, {
      children: activityCCF && mainActivityBobject && openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activityCCF, {
        referenceBobject: mainActivityBobject,
        handleClose: handleClose
      })
    })
  });
};

var css_248z = ".astrolineDialer-module_astroline_dialer_container__x7tmn {\n  position: fixed;\n  bottom: 30px;\n  right: 95px;\n  z-index: 30;\n}\n\n.astrolineDialer-module_astroline_dialer_container__x7tmn .astrolineDialer-module_astroline_dialer__ySOAm {\n  display: flex;\n  border-radius: 4px;\n  background-color: var(--white);\n  overflow: hidden;\n  box-shadow: 0 5px 10px #10182060;\n  height: 462px;\n  width: 320px;\n}\n.astrolineDialer-module_astroline_dialer_container__x7tmn .astrolineDialer-module_astroline_dialer__ySOAm iframe {\n  border-radius: 4px;\n  border: 1px solid var(--softPeanut);\n}\n\n.astrolineDialer-module_astroline_icon__QaJyz {\n  cursor: pointer;\n  width: 50px;\n  height: 50px;\n  position: fixed;\n  bottom: 30px;\n  right: 30px;\n  z-index: 40;\n}\n\n.astrolineDialer-module_astroline_icon_img__p-4Cf {\n  width: 60px;\n  height: 60px;\n}\n";
var styles = {"astroline_dialer_container":"astrolineDialer-module_astroline_dialer_container__x7tmn","astroline_dialer":"astrolineDialer-module_astroline_dialer__ySOAm","astroline_icon":"astrolineDialer-module_astroline_icon__QaJyz","astroline_icon_img":"astrolineDialer-module_astroline_icon_img__p-4Cf"};
styleInject(css_248z);

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var astrolineVisibleAtom = atom({
  key: 'astrolineDialerVisible',
  "default": false
});
var useAstrolineVisibility = function useAstrolineVisibility() {
  var _useRecoilState = useRecoilState(astrolineVisibleAtom),
    _useRecoilState2 = _slicedToArray(_useRecoilState, 2),
    astrolineVisible = _useRecoilState2[0],
    setAstrolineVisible = _useRecoilState2[1];
  var toggleVisibility = function toggleVisibility() {
    setAstrolineVisible(!astrolineVisible);
  };
  var openAstrolineDialer = function openAstrolineDialer() {
    if (!astrolineVisible) {
      setAstrolineVisible(true);
    }
  };
  return {
    astrolineVisible: astrolineVisible,
    setAstrolineVisible: setAstrolineVisible,
    toggleVisibility: toggleVisibility,
    openAstrolineDialer: openAstrolineDialer
  };
};

var AstrolineDialer = function AstrolineDialer(_ref) {
  var launchCCF = _ref.launchCCF;
  var _useAstrolineVisibili = useAstrolineVisibility(),
    astrolineVisible = _useAstrolineVisibili.astrolineVisible,
    toggleVisibility = _useAstrolineVisibili.toggleVisibility;
  return /*#__PURE__*/jsx("div", {
    children: /*#__PURE__*/jsxs("div", {
      className: styles.astroline_icon,
      onClick: toggleVisibility,
      children: [/*#__PURE__*/jsx("img", {
        className: styles.astroline_icon_img,
        alt: "astroline-logo",
        src: astrolineVisible ? AstrolineCrossSvg : AstrolineSvg
      }), /*#__PURE__*/jsx("div", {
        className: styles.astroline_dialer_container,
        style: {
          display: !astrolineVisible && 'none'
        },
        children: /*#__PURE__*/jsx("div", {
          className: styles.astroline_dialer,
          children: /*#__PURE__*/jsx(AstrolineDialerFrame, {
            launchCCF: launchCCF
          })
        })
      })]
    })
  });
};

export { AstrolineDialer, AstrolineDialerFrame, Dialer, LogCallModal, fillReferenceFields, getMainBobjectId, useAstrolineVisibility, useDialerLauncher };
//# sourceMappingURL=index.js.map
