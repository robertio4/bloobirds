import { useState, useEffect, useRef, useMemo, useCallback, useContext, createContext, Fragment as Fragment$1 } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useToasts, Modal, ModalContent, Text, ModalFooter, Button, Spinner, useVisible, Dropdown, Icon, Item, ModalHeader, ModalCloseIcon, DatePickerContainer, DatePickerHeader, getUpdatedView, TimePicker, DatePickerGrid, getCalendarYears, DatePickerGridItem, getCalendarMonths, DatePickerCalendar, getCalendarDays, DatePickerDay, DatePickerFooter, Tooltip, IconButton, Select, Section, DateTimeShortcut, ModalTitle, createToast, Chip, Tag, CircularBadge, DatePicker, DiscoveryTooltip, useHover, Label, Skeleton, Checkbox } from '@bloobirds-it/flamingo-ui';
import { api, getValueFromLogicRole, getTextFromLogicRole, isBeforeToday, getUserTimeZone, replaceVariables, getFieldByLogicRole, isEmail, EMAIL_MODE, addHttpIfNeeded, isToday, removeScrollOfBox, recoverScrollOfBox, removeHtmlTags, createParagraph, baseUrls, getNameFieldLRFromBobjectType, parseEmailPixels, addHttpsIfNeeded, parseAmount, getIsSales, subDays } from '@bloobirds-it/utils';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { LightAttachmentList } from '@bloobirds-it/light-attachment-list';
import { ACTIVITY_FIELDS_LOGIC_ROLE, TASK_FIELDS_LOGIC_ROLE, TASK_TYPE, MIXPANEL_EVENTS, SmartEmailTab, BobjectTypes, LEAD_FIELDS_LOGIC_ROLE, COMPANY_FIELDS_LOGIC_ROLE, SimilarDealsFields, SimilarDealsFieldsLabels, ExtensionHelperKeys, PermissionType, DIRECTION_VALUES_LOGIC_ROLE, PlaybookTab, REPORTED_VALUES_LOGIC_ROLE, MessagesEvents, UserHelperKeys, TEMPLATE_TYPES, TASK_STATUS_VALUE_LOGIC_ROLE, TemplateStage, Environment, DateFilterValues } from '@bloobirds-it/types';
import { AttachmentList, useAttachedFiles } from '@bloobirds-it/misc';
import useSWR from 'swr';
import { useRichTextEditorPlugins, deserialize, serialize, RichTextEditor, initialValue, insertImage, ELEMENT_SLOTS_FORM, replaceHTMLBlock, ELEMENT_RAW_HTML_BLOCK, createRawHTMLBlock, createReplyHistory, FloatingTemplateVariable, EditorToolbar, EditorToolbarControlsSection, EditorToolbarFontStylesSection, EditorToolbarTextMarksSection, EditorToolbarListsSection, EditorToolbarSection, EditorToolbarSnippet, EditorToolbarMeetingLink, EditorToolbarFileAttachment, EditorToolbarImage, EditorToolbarTemplateVariable, EditorToolbarTimeSlots, EditorToolbarSelectSignatureSection, ELEMENT_MISSING_VARIABLE, ELEMENT_MISSING_MEETING_LINK } from '@bloobirds-it/rich-text-editor';
import { isSameYear, isSameMonth, isSameDay } from 'date-fns';
import spacetime from 'spacetime';
import { getI18nSpacetimeLng, useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import { useUserTimeZone, useTimeZones, useMessagingTemplate, useIsB2CAccount, useObjectCreationSettings, useUserSearch, useGetBobjectByTypeAndId, useCalendar, useUserHelpers, useGetInfoDisplayBlockByKey, useMinimizableModal, useSignatures, useEmailConnections, useSuggestedTemplates, useActiveUserSettings, useSnippetsEnabled, useTimeSlotsEnabled, useBaseSetEmailVariablesValues, useBaseResetEmailVariablesValues, useUserSettings, useActiveUserId, useDebouncedCallback, useFullSalesEnabled, useDataModel, usePlaybook } from '@bloobirds-it/hooks';
import groupBy from 'lodash/groupBy';
import { compose } from 'redux';
import isEqual from 'lodash/isEqual';
import { NoDataPage, PastActivityTab } from '@bloobirds-it/activity-feed';
import { useSubscribeListeners } from '@bloobirds-it/bloobirds-chrome-extension/src/content/components/contactView/hooks/useSubscribeListeners';
import { useSnippets, PlaybookFeed, SegmentationFilter, TemplateDetail, HandleTemplate } from '@bloobirds-it/playbook';
import { useFormContext, useForm, useController, FormProvider, useWatch } from 'react-hook-form';
import ReactShadowRoot from 'react-shadow-root';
import { Banner, BannerLink } from '@bloobirds-it/banner';
import { TooltipContentHTML, TooltipContentBlock, SlotsDiscoveryTooltip } from '@bloobirds-it/discovery-tooltips';
import { removeNodes, insertNodes, getPluginType, resetEditorChildren, insertElements, select, focusEditor } from '@udecode/plate';
import debounce from 'lodash/debounce';
import mixpanel from 'mixpanel-browser';
import AutosizeInput from 'react-input-autosize';
import clsx from 'clsx';
import { Editor, Node } from 'slate';
import { useDebounce } from 'use-debounce';
import ReactDOMServer from 'react-dom/server';
import { CalendarsSelector, BloobirdsCalendarsSelector, CalendarNotConnected, Calendar } from '@bloobirds-it/calendar';
import { ChangeTimezoneModal } from '@bloobirds-it/misc-modals';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { FormField, AssignedToSelector, BobjectSelector } from '@bloobirds-it/bobjects';
import { CopyText } from '@bloobirds-it/meeting';
import { useAnimation, motion } from 'framer-motion';
import range from 'lodash/range';

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

var css_248z$q = ".cancelEmailModal-module_text__ByUU7 {\n  margin-bottom: 30px;\n}\n";
var styles$p = {"text":"cancelEmailModal-module_text__ByUU7"};
styleInject(css_248z$q);

function _slicedToArray$h(arr, i) { return _arrayWithHoles$h(arr) || _iterableToArrayLimit$h(arr, i) || _unsupportedIterableToArray$j(arr, i) || _nonIterableRest$h(); }
function _nonIterableRest$h() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$j(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$j(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$j(o, minLen); }
function _arrayLikeToArray$j(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$h(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$h(arr) { if (Array.isArray(arr)) return arr; }
var CancelEmailModal = function CancelEmailModal(_ref) {
  var handleClose = _ref.handleClose,
    onSubmit = _ref.onSubmit,
    open = _ref.open,
    bobject = _ref.bobject;
  var _useState = useState(false),
    _useState2 = _slicedToArray$h(_useState, 2),
    isSubmitting = _useState2[0],
    setIsSubmitting = _useState2[1];
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var isBulkAction = Array.isArray(bobject);
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.components.cancelEmailModal'
    }),
    t = _useTranslation.t;
  var cancelEmail = function cancelEmail() {
    var _bobject$id;
    setIsSubmitting(true);
    api["delete"]("/bobjects/".concat(bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.value), {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {}
    }).then(function () {
      handleClose();
      if (onSubmit) {
        onSubmit();
      }
      setIsSubmitting(false);
      createToast({
        message: t('toasts.success'),
        type: 'success'
      });
    })["catch"](function () {
      handleClose();
      setIsSubmitting(false);
      createToast({
        message: t('toasts.error'),
        type: 'error'
      });
    });
  };
  return /*#__PURE__*/jsxs(Modal, {
    title: "Cancel email",
    open: open,
    onClose: handleClose,
    width: 640,
    children: [/*#__PURE__*/jsx(ModalContent, {
      children: /*#__PURE__*/jsx("div", {
        className: styles$p.text,
        children: !isBulkAction ? /*#__PURE__*/jsxs(Text, {
          size: "m",
          align: "center",
          children: [t('title'), /*#__PURE__*/jsx("br", {}), /*#__PURE__*/jsx("b", {
            children: t('subtitle')
          })]
        }) : /*#__PURE__*/jsxs(Text, {
          size: "m",
          align: "center",
          children: [t('titleBulk', {
            count: (bobject === null || bobject === void 0 ? void 0 : bobject.length) || 0
          }), /*#__PURE__*/jsx("br", {}), /*#__PURE__*/jsx("b", {
            children: t('subtitle')
          })]
        })
      })
    }), /*#__PURE__*/jsxs(ModalFooter, {
      children: [/*#__PURE__*/jsx(Button, {
        variant: "clear",
        onClick: handleClose,
        children: t('back')
      }), /*#__PURE__*/jsx(Button, {
        color: "tomato",
        onClick: cancelEmail,
        children: isSubmitting ? /*#__PURE__*/jsx(Spinner, {
          color: "white",
          size: 14,
          name: "loadingCircle"
        }) : t('cancelEmail')
      })]
    })]
  });
};

var css_248z$p = ".clearSelect-module_select__QNT-V {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  cursor: pointer;\n}\n";
var styles$o = {"select":"clearSelect-module_select__QNT-V"};
styleInject(css_248z$p);

var ClearSelect = function ClearSelect(_ref) {
  var _options$find;
  var value = _ref.value,
    options = _ref.options,
    onChange = _ref.onChange,
    emptyMessage = _ref.emptyMessage;
  var _useVisible = useVisible(false),
    ref = _useVisible.ref,
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  if ((options === null || options === void 0 ? void 0 : options.length) === 0) {
    return /*#__PURE__*/jsx(Text, {
      color: "softPeanut",
      size: "m",
      children: emptyMessage
    });
  }
  return /*#__PURE__*/jsx(Dropdown, {
    ref: ref,
    visible: visible,
    anchor: /*#__PURE__*/jsxs("div", {
      tabIndex: 0,
      role: "button",
      className: styles$o.select,
      onClick: function onClick() {
        return setVisible(!visible);
      },
      children: [/*#__PURE__*/jsx(Text, {
        color: "softPeanut",
        size: "m",
        children: (_options$find = options.find(function (option) {
          return option.value === value;
        })) === null || _options$find === void 0 ? void 0 : _options$find.label
      }), /*#__PURE__*/jsx(Icon, {
        name: "chevronDown",
        color: "verySoftPeanut",
        size: 16
      })]
    }),
    children: options.map(function (option) {
      return /*#__PURE__*/jsx(Item, {
        value: option,
        onClick: function onClick() {
          onChange(option.value);
          setVisible(false);
        },
        children: option.label
      }, option.value);
    })
  });
};

var css_248z$o = ".emailModalRow-module_container__R6Z8K {\n  display: flex;\n  position: relative;\n  align-items: center;\n  padding: 10px 21px;\n  min-height: 44px;\n  box-sizing: border-box;\n  border-bottom: 1px solid var(--lightestBloobirds);\n}\n\n.emailModalRow-module_container__R6Z8K > *:first-child {\n  width: 56px;\n  margin-right: 12px;\n}\n\n.emailModalRow-module_disabledOverlay__THapj {\n  position: absolute;\n  background-color: white;\n  opacity: 0.35;\n  width: 95%;\n  height: 100%;\n  z-index: 1;\n}\n";
var styles$n = {"container":"emailModalRow-module_container__R6Z8K","disabledOverlay":"emailModalRow-module_disabledOverlay__THapj"};
styleInject(css_248z$o);

function EmailModalRow(_ref) {
  var children = _ref.children,
    callback = _ref.callback,
    _ref$isDisabled = _ref.isDisabled,
    isDisabled = _ref$isDisabled === void 0 ? false : _ref$isDisabled;
  return /*#__PURE__*/jsxs("div", {
    className: styles$n.container,
    onClick: callback,
    children: [children, isDisabled && /*#__PURE__*/jsx("div", {
      className: styles$n.disabledOverlay
    })]
  });
}

var css_248z$n = ".previewActivityEmailModal-module_header__G--7o {\n  padding: 16px;\n}\n\n.previewActivityEmailModal-module_title__fFHAG {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.previewActivityEmailModal-module_container__a3QuA {\n  background-color: white;\n  position: relative;\n}\n\n.previewActivityEmailModal-module_editor__G0hZA {\n  overflow-y: scroll;\n  overflow-x: hidden;\n  position: relative;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  padding-bottom: 16px;\n}\n\n.previewActivityEmailModal-module_editor__G0hZA a {\n  pointer-events: none;\n}\n\n.previewActivityEmailModal-module_footer__xWsYr {\n  padding: 20px 32px;\n  justify-content: flex-end;\n}\n\n.previewActivityEmailModal-module_warningBanner__-GZf- p {\n  width: 90%;\n}\n\n.previewActivityEmailModal-module_attachments__KdsBQ > div {\n  margin: 8px;\n}\n";
var styles$m = {"header":"previewActivityEmailModal-module_header__G--7o","title":"previewActivityEmailModal-module_title__fFHAG","container":"previewActivityEmailModal-module_container__a3QuA","editor":"previewActivityEmailModal-module_editor__G0hZA","footer":"previewActivityEmailModal-module_footer__xWsYr","warningBanner":"previewActivityEmailModal-module_warningBanner__-GZf-","attachments":"previewActivityEmailModal-module_attachments__KdsBQ"};
styleInject(css_248z$n);

var PreviewActivityEmailModal = function PreviewActivityEmailModal(_ref) {
  var activity = _ref.activity,
    onClose = _ref.onClose;
  if (!activity) return null;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.components.previewActivityModal'
    }),
    t = _useTranslation.t;
  var subject = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT);
  var body = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);
  var activityAttachedFiles = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.ATTACHED_FILES);
  var activityAttachments = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.ATTACHMENTS);
  var parsedAttachedFiles = activityAttachedFiles && JSON.parse(activityAttachedFiles);
  var parsedAttachments = activityAttachments && JSON.parse(activityAttachments);
  return /*#__PURE__*/jsx(Modal, {
    open: true,
    onClose: onClose,
    children: /*#__PURE__*/jsxs("div", {
      className: styles$m.container,
      children: [/*#__PURE__*/jsxs(ModalHeader, {
        className: styles$m.header,
        variant: "gradient",
        color: "bloobirds",
        children: [/*#__PURE__*/jsxs("div", {
          className: styles$m.title,
          children: [/*#__PURE__*/jsx(Icon, {
            color: "white",
            name: "mail",
            size: 24
          }), /*#__PURE__*/jsxs(Text, {
            color: "white",
            size: "m",
            children: [t('title'), ": ", subject]
          })]
        }), /*#__PURE__*/jsx(ModalCloseIcon, {
          variant: "gradient",
          onClick: onClose
        })]
      }), /*#__PURE__*/jsx(EmailModalRow, {
        children: /*#__PURE__*/jsx("div", {
          style: {
            width: '100%',
            padding: 0,
            userSelect: 'none'
          },
          dangerouslySetInnerHTML: {
            __html: subject
          }
        })
      }), /*#__PURE__*/jsx("div", {
        className: styles$m.editor,
        children: /*#__PURE__*/jsx("div", {
          style: {
            padding: '16px 20px',
            maxHeight: 500,
            minHeight: 200
          },
          dangerouslySetInnerHTML: {
            __html: body
          }
        })
      }), parsedAttachedFiles && (parsedAttachedFiles === null || parsedAttachedFiles === void 0 ? void 0 : parsedAttachedFiles.length) > 0 && /*#__PURE__*/jsx("div", {
        className: styles$m.attachments,
        children: /*#__PURE__*/jsx(LightAttachmentList, {
          files: parsedAttachedFiles,
          betterAttachments: parsedAttachments
        })
      })]
    })
  });
};

var css_248z$m = ".previewEmailModal-module_header__0w3yM {\n  padding: 16px;\n}\n\n.previewEmailModal-module_title__EWXY5 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.previewEmailModal-module_container__WFbn- {\n  background-color: white;\n  position: relative;\n}\n\n.previewEmailModal-module_editor__8PsdW {\n  overflow-y: scroll;\n  overflow-x: hidden;\n  height: 100%;\n  position: relative;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n\n.previewEmailModal-module_editor__8PsdW a {\n  pointer-events: none;\n}\n\n.previewEmailModal-module_footer__895EL {\n  padding: 20px 32px;\n  justify-content: flex-end;\n}\n\n.previewEmailModal-module_warningBanner__k8DrK p {\n  width: 90%;\n}\n";
var styles$l = {"header":"previewEmailModal-module_header__0w3yM","title":"previewEmailModal-module_title__EWXY5","container":"previewEmailModal-module_container__WFbn-","editor":"previewEmailModal-module_editor__8PsdW","footer":"previewEmailModal-module_footer__895EL","warningBanner":"previewEmailModal-module_warningBanner__k8DrK"};
styleInject(css_248z$m);

function _typeof$p(obj) { "@babel/helpers - typeof"; return _typeof$p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$p(obj); }
function _regeneratorRuntime$9() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$9 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$p(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$9(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$9(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$9(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$9(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var fetchPreviewEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator$9( /*#__PURE__*/_regeneratorRuntime$9().mark(function _callee(url) {
    var response;
    return _regeneratorRuntime$9().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!url) {
            _context.next = 5;
            break;
          }
          _context.next = 3;
          return api.get(url);
        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.data);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fetchPreviewEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();
var usePreviewEmail = function usePreviewEmail(taskId) {
  var _useSWR = useSWR(taskId ? "/messaging/automatedEmail/preview/".concat(taskId) : null, fetchPreviewEmail),
    data = _useSWR.data;
  return data;
};
var PreviewEmailModal = function PreviewEmailModal(_ref2) {
  var taskId = _ref2.taskId,
    onClose = _ref2.onClose;
  var data = usePreviewEmail(taskId);
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.components.previewActivityModal'
    }),
    t = _useTranslation.t;
  var _ref3 = data || {},
    templateName = _ref3.templateName,
    subject = _ref3.subject,
    content = _ref3.content,
    mediaFiles = _ref3.mediaFiles;
  if (!taskId || !data) return null;
  return /*#__PURE__*/jsx(Modal, {
    open: true,
    onClose: onClose,
    children: /*#__PURE__*/jsxs("div", {
      className: styles$l.container,
      children: [/*#__PURE__*/jsxs(ModalHeader, {
        className: styles$l.header,
        variant: "gradient",
        color: "bloobirds",
        children: [/*#__PURE__*/jsxs("div", {
          className: styles$l.title,
          children: [/*#__PURE__*/jsx(Icon, {
            color: "white",
            name: "mail",
            size: 24
          }), /*#__PURE__*/jsxs(Text, {
            color: "white",
            size: "m",
            children: [t('title'), ": ", templateName]
          })]
        }), /*#__PURE__*/jsx(ModalCloseIcon, {
          variant: "gradient",
          onClick: onClose
        })]
      }), /*#__PURE__*/jsx(EmailModalRow, {
        children: /*#__PURE__*/jsx("div", {
          style: {
            width: '100%',
            padding: 0,
            userSelect: 'none'
          },
          dangerouslySetInnerHTML: {
            __html: subject
          }
        })
      }), /*#__PURE__*/jsx("div", {
        className: styles$l.editor,
        children: /*#__PURE__*/jsx("div", {
          style: {
            padding: '16px 20px',
            maxHeight: 500,
            minHeight: 200
          },
          dangerouslySetInnerHTML: {
            __html: content
          }
        })
      }), (mediaFiles === null || mediaFiles === void 0 ? void 0 : mediaFiles.length) > 0 && /*#__PURE__*/jsx(AttachmentList, {
        files: mediaFiles
      })]
    })
  });
};

var css_248z$l = ".previewTemplateModal-module_header__Re2A9 {\n  padding: 16px;\n}\n\n.previewTemplateModal-module_title__eWWFZ {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.previewTemplateModal-module_container__xQyzq {\n  background-color: white;\n  position: relative;\n}\n\n.previewTemplateModal-module_editor__RdNJD {\n  overflow-y: scroll;\n  overflow-x: hidden;\n  position: relative;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n\n.previewTemplateModal-module_editor__RdNJD a {\n  pointer-events: none;\n}\n\n.previewTemplateModal-module_footer__CoBqJ {\n  padding: 20px 32px;\n  justify-content: flex-end;\n}\n\n.previewTemplateModal-module_warningBanner__kk5vJ p {\n  width: 90%;\n}\n";
var styles$k = {"header":"previewTemplateModal-module_header__Re2A9","title":"previewTemplateModal-module_title__eWWFZ","container":"previewTemplateModal-module_container__xQyzq","editor":"previewTemplateModal-module_editor__RdNJD","footer":"previewTemplateModal-module_footer__CoBqJ","warningBanner":"previewTemplateModal-module_warningBanner__kk5vJ"};
styleInject(css_248z$l);

function _typeof$o(obj) { "@babel/helpers - typeof"; return _typeof$o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$o(obj); }
function _slicedToArray$g(arr, i) { return _arrayWithHoles$g(arr) || _iterableToArrayLimit$g(arr, i) || _unsupportedIterableToArray$i(arr, i) || _nonIterableRest$g(); }
function _nonIterableRest$g() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$i(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$i(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$i(o, minLen); }
function _arrayLikeToArray$i(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$g(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$g(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime$8() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$8 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$o(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$8(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$8(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$8(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$8(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var fetchMessagingTemplate = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator$8( /*#__PURE__*/_regeneratorRuntime$8().mark(function _callee(url) {
    var _yield$api$get, data;
    return _regeneratorRuntime$8().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return api.get(url, {
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            data: {}
          });
        case 2:
          _yield$api$get = _context.sent;
          data = _yield$api$get.data;
          return _context.abrupt("return", data);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fetchMessagingTemplate(_x) {
    return _ref.apply(this, arguments);
  };
}();
var PreviewTemplateModal = function PreviewTemplateModal(_ref2) {
  var templateId = _ref2.templateId,
    onClose = _ref2.onClose;
  var _useState = useState(),
    _useState2 = _slicedToArray$g(_useState, 2),
    messagingTemplate = _useState2[0],
    setMessagingTemplate = _useState2[1];
  var bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: false,
    rawHTMLBlock: true,
    replyHistory: true
  });
  var subjectPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: false,
    singleLine: true,
    marks: false,
    elements: false,
    images: false,
    autoReplace: false
  });
  useEffect(function () {
    if (templateId) {
      fetchMessagingTemplate("/messaging/messagingTemplates/".concat(templateId)).then(function (data) {
        setMessagingTemplate(data);
      });
    }
  }, [templateId, setMessagingTemplate]);
  var propsSubject = {
    format: messagingTemplate === null || messagingTemplate === void 0 ? void 0 : messagingTemplate.format,
    plugins: subjectPlugins
  };
  var deserializeSubject = deserialize(messagingTemplate === null || messagingTemplate === void 0 ? void 0 : messagingTemplate.subject, propsSubject);
  var htmlSubject = serialize(deserializeSubject, propsSubject);
  var propsBody = {
    format: messagingTemplate === null || messagingTemplate === void 0 ? void 0 : messagingTemplate.format,
    plugins: bodyPlugins
  };
  var deserializeContent = deserialize(messagingTemplate === null || messagingTemplate === void 0 ? void 0 : messagingTemplate.content, propsBody);
  var htmlBody = serialize(deserializeContent, propsBody);
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.components.previewActivityModal'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsx(Fragment, {
    children: messagingTemplate && /*#__PURE__*/jsx(Modal, {
      open: true,
      onClose: onClose,
      children: /*#__PURE__*/jsxs("div", {
        className: styles$k.container,
        children: [/*#__PURE__*/jsxs(ModalHeader, {
          className: styles$k.header,
          variant: "gradient",
          color: "bloobirds",
          children: [/*#__PURE__*/jsxs("div", {
            className: styles$k.title,
            children: [/*#__PURE__*/jsx(Icon, {
              color: "white",
              name: "mail",
              size: 24
            }), /*#__PURE__*/jsxs(Text, {
              color: "white",
              size: "m",
              children: [t('title'), ": ", messagingTemplate === null || messagingTemplate === void 0 ? void 0 : messagingTemplate.name]
            })]
          }), /*#__PURE__*/jsx(ModalCloseIcon, {
            variant: "gradient",
            onClick: onClose
          })]
        }), /*#__PURE__*/jsx(EmailModalRow, {
          children: /*#__PURE__*/jsx("div", {
            style: {
              width: '100%',
              padding: 0,
              userSelect: 'none'
            },
            dangerouslySetInnerHTML: {
              __html: htmlSubject
            }
          })
        }), /*#__PURE__*/jsx("div", {
          className: styles$k.editor,
          children: /*#__PURE__*/jsx("div", {
            style: {
              padding: '16px 20px',
              maxHeight: 500,
              minHeight: 200,
              marginBottom: 40
            },
            dangerouslySetInnerHTML: {
              __html: htmlBody
            }
          })
        }), (messagingTemplate === null || messagingTemplate === void 0 ? void 0 : messagingTemplate.mediaFiles.length) > 0 && /*#__PURE__*/jsx(AttachmentList, {
          files: messagingTemplate === null || messagingTemplate === void 0 ? void 0 : messagingTemplate.mediaFiles
        })]
      })
    })
  });
};

var css_248z$k = ".recipientSearchInput-module_container__vrmYF {\n  max-width: 85%;\n  position: relative;\n  align-items: center;\n  display: flex;\n  flex: 1 1 0;\n  flex-wrap: wrap;\n  gap: 8px;\n  cursor: text;\n}\n\n.recipientSearchInput-module_input__OAjau,\n.recipientSearchInput-module_container__vrmYF > div > input {\n  font-family: var(--fontFamily);\n  font-size: 16px;\n  padding: 0;\n  margin: 0;\n  color: var(--peanut);\n  background-color: transparent;\n  border: none;\n  outline: none;\n}\n\n.recipientSearchInput-module_input__OAjau::-moz-placeholder, .recipientSearchInput-module_container__vrmYF > div > input::-moz-placeholder {\n  color: transparent;\n}\n\n.recipientSearchInput-module_input__OAjau::placeholder,\n.recipientSearchInput-module_container__vrmYF > div > input::placeholder {\n  color: transparent;\n}\n\n.recipientSearchInput-module_input__OAjau:focus,\n.recipientSearchInput-module_container__vrmYF > div > input:focus {\n  outline: none;\n  box-shadow: none;\n  background-color: transparent;\n}\n\n.recipientSearchInput-module_sizer__8yT4w {\n  min-width: 4px;\n  position: absolute;\n  left: -9999px;\n  display: inline-block;\n}\n\n.recipientSearchInput-module_dropdown__BCyQq {\n  animation: recipientSearchInput-module_popup__NCs7P 125ms ease-in-out forwards;\n  position: absolute;\n  bottom: -8px;\n  left: 0;\n  border-radius: 4px;\n  box-sizing: border-box;\n  color: var(--peanut);\n  display: flex;\n  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.15));\n  flex-direction: column;\n  font-family: var(--fontFamily);\n  background-color: var(--white);\n  min-height: 28px;\n  min-width: 350px;\n  padding: 8px 0;\n  z-index: 2;\n}\n\n.recipientSearchInput-module_dropdown__BCyQq > *::-webkit-scrollbar-track {\n  background-color: transparent;\n}\n\n.recipientSearchInput-module_dropdown__BCyQq > *::-webkit-scrollbar {\n  width: 4px;\n}\n\n.recipientSearchInput-module_dropdown__BCyQq > *::-webkit-scrollbar-thumb {\n  border: 2px solid var(--gray);\n}\n\n.recipientSearchInput-module_chipGroupDiv__RUmcW {\n  padding: 6px 20px 12px 20px;\n  display: flex;\n  justify-content: space-evenly;\n  cursor: default;\n  gap: 6px;\n}\n\n.recipientSearchInput-module_chipSelected__i6umW div {\n  cursor: default;\n}\n\n.recipientSearchInput-module_dropdownContent__Mt-2B {\n  max-height: 400px;\n  overflow-y: auto;\n}\n\n.recipientSearchInput-module_spinnerContainer__SFPMU {\n  height: 200px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.recipientSearchInput-module_item__70fDB {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  cursor: pointer;\n  font-family: var(--fontFamily);\n  color: var(--darkGray);\n  font-size: 14px;\n  font-weight: var(--fontMedium);\n  line-height: 16px;\n  padding: 8px 16px;\n  background-color: white;\n}\n\n.recipientSearchInput-module_item__70fDB[aria-selected=\"true\"] {\n  background-color: var(--lightestBloobirds);\n}\n\n.recipientSearchInput-module_warningIcon__3a9UD {\n  margin-right: 2px;\n  margin-left: -4px;\n}\n\n.recipientSearchInput-module_noContacts__9KYFn {\n  width: 100%;\n  margin: 8px auto;\n  height: 256px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 0 24px;\n}\n\n@keyframes recipientSearchInput-module_popup__NCs7P {\n  from {\n    opacity: 0;\n    transform: translateY(85%) scale(0.85);\n  }\n\n  to {\n    opacity: 1;\n    transform: translateY(100%) scale(1);\n  }\n}\n";
var styles$j = {"container":"recipientSearchInput-module_container__vrmYF","input":"recipientSearchInput-module_input__OAjau","sizer":"recipientSearchInput-module_sizer__8yT4w","dropdown":"recipientSearchInput-module_dropdown__BCyQq","popup":"recipientSearchInput-module_popup__NCs7P","chipGroupDiv":"recipientSearchInput-module_chipGroupDiv__RUmcW","chipSelected":"recipientSearchInput-module_chipSelected__i6umW","dropdownContent":"recipientSearchInput-module_dropdownContent__Mt-2B","spinnerContainer":"recipientSearchInput-module_spinnerContainer__SFPMU","item":"recipientSearchInput-module_item__70fDB","warningIcon":"recipientSearchInput-module_warningIcon__3a9UD","noContacts":"recipientSearchInput-module_noContacts__9KYFn"};
styleInject(css_248z$k);

var NoContacts = function NoContacts(_ref) {
  var hasSearchTerm = _ref.hasSearchTerm;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.components.recipientSearchInput'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs("div", {
    className: styles$j.noContacts,
    children: [/*#__PURE__*/jsx(Icon, {
      name: hasSearchTerm ? 'searchNone' : 'search',
      color: "softPeanut",
      size: 32
    }), /*#__PURE__*/jsx(Text, {
      size: "s",
      color: "softPeanut",
      align: "center",
      children: hasSearchTerm ? t('noContactsWithSearchTerm') : t('noContactsWithoutSearchTerm')
    })]
  });
};

var css_248z$j = ".customDateDialog-module_modal__ZZT4j {\n  background-color: var(--white);\n}\n\n.customDateDialog-module_modal__ZZT4j input,\n.customDateDialog-module_modal__ZZT4j input:hover {\n  border: none !important;\n  box-shadow: none !important;\n}\n\n.customDateDialog-module_year__k91ME,\n.customDateDialog-module_month__0siDR {\n  font-family: var(--fontFamily);\n  font-size: 13px;\n  color: var(--peanut);\n  cursor: pointer;\n  margin: 0;\n  border: 0;\n  background: none;\n  padding: 4px;\n}\n\n.customDateDialog-module_month__0siDR {\n  font-weight: var(--fontBold);\n}\n\n.customDateDialog-module_year__k91ME:hover,\n.customDateDialog-module_month__0siDR:hover {\n  color: var(--bloobirds);\n}\n";
var styles$i = {"modal":"customDateDialog-module_modal__ZZT4j","year":"customDateDialog-module_year__k91ME","month":"customDateDialog-module_month__0siDR"};
styleInject(css_248z$j);

function _slicedToArray$f(arr, i) { return _arrayWithHoles$f(arr) || _iterableToArrayLimit$f(arr, i) || _unsupportedIterableToArray$h(arr, i) || _nonIterableRest$f(); }
function _nonIterableRest$f() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$h(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$h(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$h(o, minLen); }
function _arrayLikeToArray$h(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$f(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$f(arr) { if (Array.isArray(arr)) return arr; }
var CustomDateDialog = function CustomDateDialog(_ref) {
  var bobject = _ref.bobject,
    onSubmit = _ref.onSubmit,
    onCancel = _ref.onCancel,
    _ref$showDateTime = _ref.showDateTime,
    showDateTime = _ref$showDateTime === void 0 ? true : _ref$showDateTime,
    customButtonText = _ref.customButtonText,
    customButtonVariant = _ref.customButtonVariant;
  var getFormattedHour = function getFormattedHour() {
    var dateTimeInfo = !Array.isArray(bobject) ? new Date(getValueFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME)) : null;
    return dateTimeInfo ? dateTimeInfo.getHours() + ':' + dateTimeInfo.getMinutes() + '' : '8:00';
  };
  var taskTime = getFormattedHour();
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.components.scheduleEmailModal'
    }),
    t = _useTranslation.t,
    i18n = _useTranslation.i18n;
  var taskTimePresentDate = spacetime().startOf('day').time(taskTime)["goto"]('utc').toNativeDate();
  var _useState = useState('day'),
    _useState2 = _slicedToArray$f(_useState, 2),
    format = _useState2[0],
    setFormat = _useState2[1];
  var _useState3 = useState(taskTimePresentDate),
    _useState4 = _slicedToArray$f(_useState3, 2),
    value = _useState4[0],
    setValue = _useState4[1];
  var _useState5 = useState(value),
    _useState6 = _slicedToArray$f(_useState5, 2),
    view = _useState6[0],
    setView = _useState6[1];
  return /*#__PURE__*/jsxs(Modal, {
    className: styles$i.modal,
    open: true,
    onClose: onCancel,
    width: 492,
    children: [/*#__PURE__*/jsxs(DatePickerContainer, {
      children: [/*#__PURE__*/jsxs(DatePickerHeader, {
        onNext: function onNext() {
          return setView(getUpdatedView(view, format, 'forwards'));
        },
        onBack: function onBack() {
          return setView(getUpdatedView(view, format, 'backwards'));
        },
        children: [/*#__PURE__*/jsx("button", {
          "aria-label": "calendar month",
          onClick: function onClick() {
            return setFormat('month');
          },
          className: styles$i.month,
          children: getI18nSpacetimeLng(i18n.language, view).format('{month-short}')
        }), /*#__PURE__*/jsx("button", {
          "aria-label": "calendar year",
          onClick: function onClick() {
            return setFormat('year');
          },
          className: styles$i.year,
          children: getI18nSpacetimeLng(i18n.language, view).format('{year}')
        }), showDateTime && /*#__PURE__*/jsx(TimePicker, {
          value: value,
          onChange: setValue
        })]
      }), format === 'year' && /*#__PURE__*/jsx(DatePickerGrid, {
        children: getCalendarYears(view).map(function (year) {
          return /*#__PURE__*/jsx(DatePickerGridItem, {
            active: isSameYear(value, year),
            onClick: function onClick() {
              setFormat('month');
              setView(year);
            },
            children: getI18nSpacetimeLng(i18n.language, year).format('{year}')
          }, year.toISOString());
        })
      }), format === 'month' && /*#__PURE__*/jsx(DatePickerGrid, {
        children: getCalendarMonths(view).map(function (month) {
          return /*#__PURE__*/jsx(DatePickerGridItem, {
            active: isSameMonth(value, month),
            onClick: function onClick() {
              setFormat('day');
              setView(month);
            },
            children: getI18nSpacetimeLng(i18n.language, month).format('{month-short}')
          }, month.toISOString());
        })
      }), format === 'day' && /*#__PURE__*/jsx(DatePickerCalendar, {
        children: getCalendarDays(view).map(function (day) {
          return /*#__PURE__*/jsx(DatePickerDay, {
            value: day,
            outside: !isSameMonth(day, view),
            selected: isSameDay(day, value),
            disabled: isBeforeToday(day, getUserTimeZone()),
            onClick: function onClick() {
              var newValue = new Date(day);
              newValue.setHours(value.getHours());
              newValue.setMinutes(value.getMinutes());
              setValue(newValue);
            }
          }, day.toISOString());
        })
      })]
    }), /*#__PURE__*/jsxs(DatePickerFooter, {
      children: [/*#__PURE__*/jsx(Button, {
        onClick: onCancel,
        color: "tomato",
        variant: "clear",
        size: "small",
        children: t('cancel')
      }), /*#__PURE__*/jsxs("div", {
        style: {
          display: 'flex'
        },
        children: [/*#__PURE__*/jsx(Button, {
          onClick: function onClick() {
            var today = new Date();
            setFormat('day');
            setView(today);
            setValue(today);
          },
          variant: "clear",
          size: "small",
          children: t('today')
        }), /*#__PURE__*/jsx(Tooltip, {
          title: isBeforeToday(value, getUserTimeZone()) && t('tooltip'),
          position: "top",
          children: /*#__PURE__*/jsx(Button, {
            onClick: function onClick() {
              onSubmit(value);
            },
            variant: customButtonVariant || 'clear',
            size: "small",
            dataTest: "DateTimePicker-Ok",
            disabled: isBeforeToday(value, getUserTimeZone()),
            children: customButtonText || t('send')
          })
        })]
      })]
    })]
  });
};

function _typeof$n(obj) { "@babel/helpers - typeof"; return _typeof$n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$n(obj); }
function _regeneratorRuntime$7() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$7 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$n(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$7(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function useEmailMatching(emails) {
  var _useSWR = useSWR('/messaging/emails/matchEmails', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator$7( /*#__PURE__*/_regeneratorRuntime$7().mark(function _callee(url) {
        var response;
        return _regeneratorRuntime$7().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return api.post(url, {
                emails: emails
              });
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
    error = _useSWR.error,
    isValidating = _useSWR.isValidating;
  return {
    company: data === null || data === void 0 ? void 0 : data.company,
    lead: data === null || data === void 0 ? void 0 : data.lead,
    opportunity: data === null || data === void 0 ? void 0 : data.opportunity,
    error: error,
    isLoading: isValidating
  };
}

var css_248z$i = ".scheduleEmailModal-module_modal__c-220 {\n  width: 380px !important;\n  background-color: var(--white);\n}\n\n.scheduleEmailModal-module_header__OhUsA {\n  padding: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.scheduleEmailModal-module_content__k-FJi {\n  padding: 16px 24px;\n  padding-top: 0;\n}\n\n.scheduleEmailModal-module_customButton__xH4fb {\n  margin-top: 8px;\n  justify-content: center;\n}\n\n.scheduleEmailModal-module_timezones__3dz09 {\n  padding: 8px 12px;\n  background-color: var(--veryLightBloobirds);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 8px;\n  margin: 12px -24px;\n}\n\n.scheduleEmailModal-module_timezones__3dz09 > * {\n  flex-shrink: 0;\n}\n\n.scheduleEmailModal-module_shortcuts__UHKy- {\n  display: grid;\n  grid-auto-flow: row;\n  row-gap: 4px;\n}\n";
var styles$h = {"modal":"scheduleEmailModal-module_modal__c-220","header":"scheduleEmailModal-module_header__OhUsA","content":"scheduleEmailModal-module_content__k-FJi","customButton":"scheduleEmailModal-module_customButton__xH4fb","timezones":"scheduleEmailModal-module_timezones__3dz09","shortcuts":"scheduleEmailModal-module_shortcuts__UHKy-"};
styleInject(css_248z$i);

var getLocationFromTimeZone = function getLocationFromTimeZone(timezone) {
  var _timezone$slice;
  return timezone === null || timezone === void 0 ? void 0 : (_timezone$slice = timezone.slice(12)) === null || _timezone$slice === void 0 ? void 0 : _timezone$slice.toString().replace(/\s/g, '_');
};

function _typeof$m(obj) { "@babel/helpers - typeof"; return _typeof$m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$m(obj); }
function _regeneratorRuntime$6() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$6 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$m(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$6(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray$e(arr, i) { return _arrayWithHoles$e(arr) || _iterableToArrayLimit$e(arr, i) || _unsupportedIterableToArray$g(arr, i) || _nonIterableRest$e(); }
function _nonIterableRest$e() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$g(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$g(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$g(o, minLen); }
function _arrayLikeToArray$g(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$e(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$e(arr) { if (Array.isArray(arr)) return arr; }
var removeContinent = function removeContinent(value) {
  return value === null || value === void 0 ? void 0 : value.replace(/\s([A-z]*)\//, ' ');
};
var replaceUnderscores = function replaceUnderscores(value) {
  return value === null || value === void 0 ? void 0 : value.replace('_', ':');
};
var cleanTimezoneName = compose(removeContinent, replaceUnderscores);
var ScheduleEmailModal = function ScheduleEmailModal(_ref) {
  var _allTimeZones$find, _allTimeZones$find2, _allTimeZones$find3, _continentTimeZones$A, _continentTimeZones$E, _continentTimeZones$A2, _continentTimeZones$A3, _continentTimeZones$A4, _continentTimeZones$A5;
  var emails = _ref.emails,
    onSubmit = _ref.onSubmit,
    onClose = _ref.onClose;
  var userTimeZone = useUserTimeZone();
  var timezonesList = useTimeZones();
  var allTimeZones = timezonesList || [];
  var _useEmailMatching = useEmailMatching(emails),
    company = _useEmailMatching.company,
    lead = _useEmailMatching.lead,
    isLoading = _useEmailMatching.isLoading;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.components.scheduleEmailModal'
    }),
    t = _useTranslation.t;
  var _useState = useState(userTimeZone),
    _useState2 = _slicedToArray$e(_useState, 2),
    selectedTimeZone = _useState2[0],
    setSelectedTimeZone = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$e(_useState3, 2),
    customDateVisible = _useState4[0],
    setCustomDateVisible = _useState4[1];
  var leadTimeZone = getLocationFromTimeZone(getTextFromLogicRole(lead, 'LEAD__TIME_ZONE'));
  var companyTimeZone = getLocationFromTimeZone(getTextFromLogicRole(company, 'COMPANY__TIME_ZONE'));
  useEffect(function () {
    if (leadTimeZone) {
      setSelectedTimeZone(leadTimeZone);
    } else if (companyTimeZone) {
      setSelectedTimeZone(companyTimeZone);
    } else {
      setSelectedTimeZone(userTimeZone);
    }
  }, [leadTimeZone, companyTimeZone, userTimeZone]);
  var tomorrowMorning = spacetime()["goto"](selectedTimeZone).startOf('day').add(1, 'day').add(8, 'hour')["goto"]('utc').toNativeDate();
  var tomorrowAfternoon = spacetime()["goto"](selectedTimeZone).startOf('day').add(1, 'day').add(16, 'hour')["goto"]('utc').toNativeDate();
  var handleSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator$6( /*#__PURE__*/_regeneratorRuntime$6().mark(function _callee(date) {
      return _regeneratorRuntime$6().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setCustomDateVisible(false);
            _context.next = 3;
            return onSubmit({
              date: date,
              timezone: selectedTimeZone
            });
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleSubmit(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  if (isLoading) {
    return null;
  }
  if (customDateVisible) {
    return /*#__PURE__*/jsx(CustomDateDialog, {
      onCancel: function onCancel() {
        return setCustomDateVisible(false);
      },
      onSubmit: /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator$6( /*#__PURE__*/_regeneratorRuntime$6().mark(function _callee2(date) {
          var offsetDate;
          return _regeneratorRuntime$6().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                offsetDate = spacetime()["goto"](selectedTimeZone).year(date.getFullYear()).month(date.getMonth()).date(date.getDate()).hour(date.getHours()).minute(date.getMinutes()).toNativeDate();
                _context2.next = 3;
                return handleSubmit(offsetDate);
              case 3:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      }()
    });
  }
  var continentTimeZones = groupBy(allTimeZones, function (_ref4) {
    var location = _ref4.location;
    return location.split('/')[0].trim();
  });
  return /*#__PURE__*/jsxs(Modal, {
    className: styles$h.modal,
    open: true,
    onClose: onClose,
    children: [/*#__PURE__*/jsxs("header", {
      className: styles$h.header,
      children: [/*#__PURE__*/jsx(Text, {
        size: "xl",
        children: t('title')
      }), /*#__PURE__*/jsx(IconButton, {
        size: 40,
        name: "cross",
        color: "bloobirds",
        onClick: onClose
      })]
    }), /*#__PURE__*/jsxs("main", {
      className: styles$h.content,
      children: [/*#__PURE__*/jsxs(Select, {
        width: "100%",
        borderless: false,
        value: selectedTimeZone,
        onChange: setSelectedTimeZone,
        size: "small",
        autocomplete: true,
        children: [leadTimeZone && /*#__PURE__*/jsx(Section, {
          id: "lead-timezone",
          children: t('leadTimezone')
        }), leadTimeZone && /*#__PURE__*/jsx(Item, {
          section: "lead-timezone",
          label: leadTimeZone,
          value: leadTimeZone,
          children: cleanTimezoneName((_allTimeZones$find = allTimeZones.find(function (_ref5) {
            var location = _ref5.location;
            return location === leadTimeZone;
          })) === null || _allTimeZones$find === void 0 ? void 0 : _allTimeZones$find.name)
        }), companyTimeZone && /*#__PURE__*/jsx(Section, {
          id: "company-timezone",
          children: t('companyTimezone')
        }), companyTimeZone && /*#__PURE__*/jsx(Item, {
          section: "company-timezone",
          label: companyTimeZone,
          value: companyTimeZone,
          children: cleanTimezoneName((_allTimeZones$find2 = allTimeZones.find(function (_ref6) {
            var location = _ref6.location;
            return location === companyTimeZone;
          })) === null || _allTimeZones$find2 === void 0 ? void 0 : _allTimeZones$find2.name)
        }), userTimeZone && /*#__PURE__*/jsx(Section, {
          id: "my-timezone",
          children: t('myTimezone')
        }), userTimeZone && /*#__PURE__*/jsx(Item, {
          section: "my-timezone",
          label: userTimeZone,
          value: userTimeZone,
          children: cleanTimezoneName((_allTimeZones$find3 = allTimeZones.find(function (_ref7) {
            var location = _ref7.location;
            return location === userTimeZone;
          })) === null || _allTimeZones$find3 === void 0 ? void 0 : _allTimeZones$find3.name)
        }), /*#__PURE__*/jsx(Section, {
          id: "america-timezone",
          children: t('america')
        }), (_continentTimeZones$A = continentTimeZones['America']) === null || _continentTimeZones$A === void 0 ? void 0 : _continentTimeZones$A.map(function (_ref8) {
          var location = _ref8.location,
            name = _ref8.name;
          return /*#__PURE__*/jsx(Item, {
            section: "america-timezone",
            label: location,
            value: location,
            children: cleanTimezoneName(name)
          }, location);
        }), /*#__PURE__*/jsx(Section, {
          id: "europe-timezone",
          children: t('europe')
        }), (_continentTimeZones$E = continentTimeZones['Europe']) === null || _continentTimeZones$E === void 0 ? void 0 : _continentTimeZones$E.map(function (_ref9) {
          var location = _ref9.location,
            name = _ref9.name;
          return /*#__PURE__*/jsx(Item, {
            section: "europe-timezone",
            label: location,
            value: location,
            children: cleanTimezoneName(name)
          }, location);
        }), /*#__PURE__*/jsx(Section, {
          id: "africa-timezone",
          children: t('africa')
        }), (_continentTimeZones$A2 = continentTimeZones['Africa']) === null || _continentTimeZones$A2 === void 0 ? void 0 : _continentTimeZones$A2.map(function (_ref10) {
          var location = _ref10.location,
            name = _ref10.name;
          return /*#__PURE__*/jsx(Item, {
            section: "africa-timezone",
            label: location,
            value: location,
            children: cleanTimezoneName(name)
          }, location);
        }), /*#__PURE__*/jsx(Section, {
          id: "asia-timezone",
          children: t('asia')
        }), (_continentTimeZones$A3 = continentTimeZones['Asia']) === null || _continentTimeZones$A3 === void 0 ? void 0 : _continentTimeZones$A3.map(function (_ref11) {
          var location = _ref11.location,
            name = _ref11.name;
          return /*#__PURE__*/jsx(Item, {
            section: "asia-timezone",
            label: location,
            value: location,
            children: cleanTimezoneName(name)
          }, location);
        }), /*#__PURE__*/jsx(Section, {
          id: "australia-timezone",
          children: t('australia')
        }), (_continentTimeZones$A4 = continentTimeZones['Australia']) === null || _continentTimeZones$A4 === void 0 ? void 0 : _continentTimeZones$A4.map(function (_ref12) {
          var location = _ref12.location,
            name = _ref12.name;
          return /*#__PURE__*/jsx(Item, {
            section: "australia-timezone",
            label: location,
            value: location,
            children: cleanTimezoneName(name)
          }, location);
        }), /*#__PURE__*/jsx(Section, {
          id: "antarctica-timezone",
          children: t('antarctica')
        }), (_continentTimeZones$A5 = continentTimeZones['Antarctica']) === null || _continentTimeZones$A5 === void 0 ? void 0 : _continentTimeZones$A5.map(function (_ref13) {
          var location = _ref13.location,
            name = _ref13.name;
          return /*#__PURE__*/jsx(Item, {
            section: "antarctica-timezone",
            label: location,
            value: location,
            children: cleanTimezoneName(name)
          }, location);
        })]
      }), /*#__PURE__*/jsxs("section", {
        className: styles$h.timezones,
        children: [/*#__PURE__*/jsx(Icon, {
          name: "timezones",
          size: 24,
          color: "softBloobirds"
        }), /*#__PURE__*/jsx(Text, {
          size: "xs",
          weight: "medium",
          color: "peanut",
          children: t('dateTimeFromSelectedTimezone')
        })]
      }), /*#__PURE__*/jsxs("div", {
        className: styles$h.shortcuts,
        children: [/*#__PURE__*/jsx(DateTimeShortcut, {
          timezone: selectedTimeZone,
          text: t('tomorrowMorning'),
          date: tomorrowMorning,
          onClick: handleSubmit
        }), /*#__PURE__*/jsx(DateTimeShortcut, {
          timezone: selectedTimeZone,
          text: t('tomorrowAfternoon'),
          date: tomorrowAfternoon,
          onClick: handleSubmit
        })]
      }), /*#__PURE__*/jsx(Button, {
        className: styles$h.customButton,
        expand: true,
        variant: "tertiary",
        uppercase: true,
        iconLeft: "calendar",
        onClick: function onClick() {
          return setCustomDateVisible(true);
        },
        children: t('selectDateAndTime')
      })]
    })]
  });
};

var css_248z$h = ".sendEmailModal-module_content__-ZrtT {\n  margin-bottom: 22px;\n}\n\n.sendEmailModal-module_content__-ZrtT > p:first-child {\n  margin-bottom: 8px;\n}\n";
var styles$g = {"content":"sendEmailModal-module_content__-ZrtT"};
styleInject(css_248z$h);

function _typeof$l(obj) { "@babel/helpers - typeof"; return _typeof$l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$l(obj); }
function _regeneratorRuntime$5() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$5 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$l(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$5(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray$d(arr, i) { return _arrayWithHoles$d(arr) || _iterableToArrayLimit$d(arr, i) || _unsupportedIterableToArray$f(arr, i) || _nonIterableRest$d(); }
function _nonIterableRest$d() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$f(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$f(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$f(o, minLen); }
function _arrayLikeToArray$f(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$d(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$d(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperty$l(obj, key, value) { key = _toPropertyKey$l(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$l(arg) { var key = _toPrimitive$l(arg, "string"); return _typeof$l(key) === "symbol" ? key : String(key); }
function _toPrimitive$l(input, hint) { if (_typeof$l(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$l(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ModalType;
(function (ModalType) {
  ModalType["SEND"] = "SEND_NOW";
  ModalType["RETRY"] = "RETRY";
  ModalType["RESEND"] = "RESEND";
})(ModalType || (ModalType = {}));
var MODAL_TEXT = function MODAL_TEXT(t) {
  return _defineProperty$l(_defineProperty$l(_defineProperty$l({}, ModalType.SEND, {
    single: t('send')
  }), ModalType.RETRY, {
    single: t('retry')
  }), ModalType.RESEND, {
    bulk: t('bulk')
  });
};
var SendEmailModal = function SendEmailModal(_ref2) {
  var _MODAL_TEXT$modalType, _getFieldByLogicRole;
  var bobject = _ref2.bobject,
    modalType = _ref2.modalType,
    _ref2$onSubmit = _ref2.onSubmit,
    onSubmit = _ref2$onSubmit === void 0 ? function () {} : _ref2$onSubmit,
    _ref2$onClose = _ref2.onClose,
    onClose = _ref2$onClose === void 0 ? function () {} : _ref2$onClose;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.components.sendEmailModal'
    }),
    t = _useTranslation.t;
  var title = modalType === ModalType.SEND ? t('sendEmail') : t('retrySend');
  var isBulkAction = Array.isArray(bobject);
  var text = isBulkAction ?
  // @ts-ignore
  replaceVariables((_MODAL_TEXT$modalType = MODAL_TEXT(t)[modalType]) === null || _MODAL_TEXT$modalType === void 0 ? void 0 : _MODAL_TEXT$modalType.bulk, {
    EMAILS_NUMBER: bobject === null || bobject === void 0 ? void 0 : bobject.length
  }) :
  // @ts-ignore
  MODAL_TEXT(t)[modalType].single;
  var isScheduledEmail =
  // @ts-ignore Task type has a different logic role composition
  ((_getFieldByLogicRole = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.valueLogicRole) === TASK_TYPE.SCHEDULED_EMAIL;
  var _useState = useState(null),
    _useState2 = _slicedToArray$d(_useState, 2),
    isSubmitting = _useState2[0],
    setIsSubmitting = _useState2[1];
  var sendEmail = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator$5( /*#__PURE__*/_regeneratorRuntime$5().mark(function _callee() {
      var _isBulkAction, url, tasksId, _url, _e$response;
      return _regeneratorRuntime$5().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _isBulkAction = Array.isArray(bobject);
            setIsSubmitting(true);
            if (!_isBulkAction) {
              _context.next = 14;
              break;
            }
            url = isScheduledEmail ? "/messaging/scheduledEmails/send" : "/messaging/automatedEmail/send";
            tasksId = bobject.map(function (bobjectItem) {
              return bobjectItem === null || bobjectItem === void 0 ? void 0 : bobjectItem.id.objectId;
            });
            _context.next = 8;
            return api.put(url, {
              tasksId: tasksId
            });
          case 8:
            onClose();
            setIsSubmitting(false);
            createToast({
              type: 'success',
              message: t('toasts.success'),
              position: 'top-right'
            });
            onSubmit();
            _context.next = 21;
            break;
          case 14:
            _url = isScheduledEmail ? "/messaging/scheduledEmails/".concat(bobject === null || bobject === void 0 ? void 0 : bobject.id.objectId, "/send") : "/messaging/automatedEmail/".concat(bobject === null || bobject === void 0 ? void 0 : bobject.id.objectId, "/send");
            _context.next = 17;
            return api.put(_url);
          case 17:
            onClose();
            setIsSubmitting(false);
            createToast({
              type: 'success',
              message: t('toasts.success'),
              position: 'top-right'
            });
            onSubmit();
          case 21:
            _context.next = 28;
            break;
          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](0);
            onClose();
            setIsSubmitting(false);
            if ((_context.t0 === null || _context.t0 === void 0 ? void 0 : (_e$response = _context.t0.response) === null || _e$response === void 0 ? void 0 : _e$response.status) === 504) {
              createToast({
                type: 'warning',
                message: t('toasts.delay'),
                position: 'top-right'
              });
            } else {
              createToast({
                type: 'error',
                message: t('toasts.error'),
                position: 'top-right'
              });
              onSubmit();
            }
          case 28:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 23]]);
    }));
    return function sendEmail() {
      return _ref3.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/jsxs(Modal, {
    open: true,
    width: 640,
    onClose: onClose,
    children: [/*#__PURE__*/jsxs(ModalHeader, {
      children: [/*#__PURE__*/jsx(ModalTitle, {
        children: title
      }), /*#__PURE__*/jsx(ModalCloseIcon, {
        onClick: onClose
      })]
    }), /*#__PURE__*/jsx(ModalContent, {
      children: /*#__PURE__*/jsxs("div", {
        className: styles$g.content,
        children: [/*#__PURE__*/jsx(Text, {
          size: "m",
          children: text
        }), /*#__PURE__*/jsx(Text, {
          size: "m",
          children: /*#__PURE__*/jsx(Trans, {
            i18nKey: "smartEmailModal.components.sendEmailModal.cannotBeUndonde"
          })
        })]
      })
    }), /*#__PURE__*/jsxs(ModalFooter, {
      children: [/*#__PURE__*/jsx(Button, {
        variant: "tertiary",
        onClick: onClose,
        children: t('back')
      }, "backButton"), ",", /*#__PURE__*/jsx(Button, {
        variant: "primary",
        dataTest: "confirmSendAutomatedEmailButton",
        onClick: function onClick() {
          sendEmail();
        },
        children: isSubmitting ? /*#__PURE__*/jsx(Spinner, {
          color: "white",
          size: 14,
          name: "loadingCircle"
        }) : t('sendButton', {
          count: isBulkAction ? bobject.length : 1
        })
      }, "sendEmailButton")]
    })]
  });
};

var css_248z$g = ".confirmSendModal-module_text__-u541 {\n  padding-bottom: 30px;\n}\n\n.confirmSendModal-module_header__PzrDz{\n  justify-content: flex-start;\n  gap: 8px\n}\n";
var styles$f = {"text":"confirmSendModal-module_text__-u541","header":"confirmSendModal-module_header__PzrDz"};
styleInject(css_248z$g);

var ConfirmSendModal = function ConfirmSendModal(_ref) {
  var handleClose = _ref.handleClose,
    onConfirm = _ref.onConfirm,
    open = _ref.open;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.components.confirmSendModal'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs(Modal, {
    open: open,
    onClose: handleClose,
    width: 640,
    children: [/*#__PURE__*/jsxs(ModalHeader, {
      className: styles$f.header,
      children: [/*#__PURE__*/jsx(Icon, {
        name: "save",
        color: "peanut"
      }), /*#__PURE__*/jsx(Text, {
        color: "peanut",
        size: "m",
        children: t('title')
      })]
    }), /*#__PURE__*/jsx(ModalContent, {
      className: styles$f.text,
      children: /*#__PURE__*/jsx(Text, {
        color: "peanut",
        size: "m",
        inline: true,
        children: /*#__PURE__*/jsx(Trans, {
          i18nKey: "smartEmailModal.components.confirmSendModal.content"
        })
      })
    }), /*#__PURE__*/jsxs(ModalFooter, {
      children: [/*#__PURE__*/jsx(Button, {
        variant: "clear",
        onClick: handleClose,
        color: "extraMeeting",
        children: t('cancel')
      }), /*#__PURE__*/jsx(Button, {
        onClick: onConfirm,
        children: t('sendEmail')
      })]
    })]
  });
};

var css_248z$f = ".messagingTemplatesButton-module_container__XBtYl {\n  display: flex;\n  padding: 16px 24px 0;\n  justify-content: flex-end;\n  align-items: center;\n  min-height: 42px;\n}\n\n.messagingTemplatesButton-module_select__sI64a {\n  display: flex;\n  align-items: center;\n}\n\n.messagingTemplatesButton-module_label__uInG- {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  cursor: pointer;\n}\n.messagingTemplatesButton-module_button__f9xy2 {\n  margin-left: 8px;\n  font-weight: 400;\n}\n\n.messagingTemplatesButton-module_labelSuggestedTemplate__O1D9k {\n  padding: 2px 8px;\n  background-color: #f9f8fb;\n  color: var(--softBloobirds);\n  font-size: 12px;\n  border-radius: 4px;\n  display: inline-block;\n  margin-right: 4px;\n}\n";
var styles$e = {"container":"messagingTemplatesButton-module_container__XBtYl","select":"messagingTemplatesButton-module_select__sI64a","label":"messagingTemplatesButton-module_label__uInG-","button":"messagingTemplatesButton-module_button__f9xy2","labelSuggestedTemplate":"messagingTemplatesButton-module_labelSuggestedTemplate__O1D9k"};
styleInject(css_248z$f);

var MessagingTemplatesButton = function MessagingTemplatesButton(_ref) {
  var value = _ref.value,
    onClick = _ref.onClick,
    isPlaybookTab = _ref.isPlaybookTab,
    autofilledTemplate = _ref.autofilledTemplate;
  var _useMessagingTemplate = useMessagingTemplate(value),
    messagingTemplate = _useMessagingTemplate.messagingTemplate;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.components.messagingTemplatesButton'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsx("div", {
    className: styles$e.container,
    children: /*#__PURE__*/jsxs("div", {
      className: styles$e.select,
      children: [autofilledTemplate && /*#__PURE__*/jsxs("div", {
        className: styles$e.labelSuggestedTemplate,
        children: ["Autofilled from ", autofilledTemplate]
      }), /*#__PURE__*/jsxs("div", {
        className: styles$e.label,
        onClick: onClick,
        children: [/*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "softPeanut",
          children: value ? "".concat(t('template'), ":") : isPlaybookTab ? t('noTemplateSelected') : t('openTemplates')
        }), /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "peanut",
          children: messagingTemplate === null || messagingTemplate === void 0 ? void 0 : messagingTemplate.name
        })]
      }), !isPlaybookTab && (value ? /*#__PURE__*/jsx(Button, {
        size: "small",
        iconLeft: "plus",
        className: styles$e.button,
        uppercase: false,
        onClick: onClick,
        color: "purple",
        children: t('openTemplates')
      }) : /*#__PURE__*/jsx(IconButton, {
        name: "plus",
        size: 20,
        onClick: onClick,
        color: "purple"
      }))]
    })
  });
};

function _typeof$k(obj) { "@babel/helpers - typeof"; return _typeof$k = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$k(obj); }
function _defineProperty$k(obj, key, value) { key = _toPropertyKey$k(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$k(arg) { var key = _toPrimitive$k(arg, "string"); return _typeof$k(key) === "symbol" ? key : String(key); }
function _toPrimitive$k(input, hint) { if (_typeof$k(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$k(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var getTooltipText$1 = function getTooltipText(_ref) {
  var hasCompany = _ref.hasCompany,
    hasValuesAdded = _ref.hasValuesAdded,
    hasNoEmailsLeftOnContext = _ref.hasNoEmailsLeftOnContext,
    t = _ref.t;
  if (!hasCompany) {
    return !hasValuesAdded ? t('cannotSearchEmailsInCopmany') : t('currentEmailDoesNotHaveCompany');
  } else if (hasNoEmailsLeftOnContext) {
    return t('allRelatedEmailsHaveBeenAdded');
  } else {
    return null;
  }
};
var DropdownHeader = function DropdownHeader(_ref2) {
  var hasValuesAdded = _ref2.hasValuesAdded,
    searchType = _ref2.searchType,
    hasCompany = _ref2.hasCompany,
    hasNoEmailsLeftOnContext = _ref2.hasNoEmailsLeftOnContext,
    handleDropdownChipClick = _ref2.handleDropdownChipClick,
    allCoworkersAdded = _ref2.allCoworkersAdded;
  var isB2CAccount = useIsB2CAccount();
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.components.recipientSearchInput.header'
    }),
    t = _useTranslation.t;
  var tooltip = getTooltipText$1({
    hasValuesAdded: hasValuesAdded,
    hasCompany: hasCompany,
    hasNoEmailsLeftOnContext: hasNoEmailsLeftOnContext,
    t: t
  });
  var disableContextSearch = !hasCompany || hasNoEmailsLeftOnContext;
  return /*#__PURE__*/jsxs("div", {
    className: styles$j.chipGroupDiv,
    children: [!isB2CAccount && /*#__PURE__*/jsx("div", {
      className: clsx(_defineProperty$k({}, styles$j.chipSelected, searchType === SearchType.relatedBobjects)),
      children: /*#__PURE__*/jsx(Tooltip, {
        title: tooltip,
        position: "top",
        children: /*#__PURE__*/jsx(Chip, {
          size: "small",
          disabled: disableContextSearch,
          variant: disableContextSearch ? 'primary' : 'secondary',
          selected: searchType === SearchType.relatedBobjects,
          onClick: function onClick() {
            handleDropdownChipClick(SearchType.relatedBobjects);
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SEARCH_EMAIL_OPTIONS);
          },
          children: t('searchInCompany')
        })
      })
    }), /*#__PURE__*/jsx("div", {
      className: clsx(_defineProperty$k({}, styles$j.chipSelected, searchType === SearchType.globalSearch)),
      children: /*#__PURE__*/jsx(Chip, {
        size: "small",
        selected: searchType === SearchType.globalSearch,
        onClick: function onClick() {
          handleDropdownChipClick(SearchType.globalSearch);
          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SEARCH_EMAIL_OPTIONS);
        },
        children: t('searchEverywhere')
      })
    }), /*#__PURE__*/jsx("div", {
      className: clsx(_defineProperty$k({}, styles$j.chipSelected, searchType === SearchType.companySearch)),
      children: /*#__PURE__*/jsx(Chip, {
        size: "small",
        variant: allCoworkersAdded ? 'primary' : 'secondary',
        disabled: allCoworkersAdded,
        selected: searchType === SearchType.companySearch,
        onClick: function onClick() {
          handleDropdownChipClick(SearchType.companySearch);
          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SEARCH_EMAIL_OPTIONS);
        },
        children: t('coworkersEmails')
      })
    })]
  });
};

function _typeof$j(obj) { "@babel/helpers - typeof"; return _typeof$j = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$j(obj); }
function ownKeys$d(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$d(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$d(Object(source), !0).forEach(function (key) { _defineProperty$j(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$d(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$j(obj, key, value) { key = _toPropertyKey$j(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$j(arg) { var key = _toPrimitive$j(arg, "string"); return _typeof$j(key) === "symbol" ? key : String(key); }
function _toPrimitive$j(input, hint) { if (_typeof$j(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$j(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function getTooltipText(email, isOutsider, isValidEmail, showAddToDB, t) {
  if (showAddToDB) return t('notRegisteredTooltip');
  if (isOutsider && isValidEmail) return t('outsiderTooltip', {
    email: email
  });
}
var EmailBadge = function EmailBadge(_ref) {
  var contact = _ref.contact,
    unselectEmail = _ref.unselectEmail,
    _ref$isOutsider = _ref.isOutsider,
    isOutsider = _ref$isOutsider === void 0 ? false : _ref$isOutsider;
  var _useObjectCreationSet = useObjectCreationSettings(),
    enabledObjectCreation = _useObjectCreationSet.enabledObjectCreation;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.components.recipientSearchInput'
    }),
    t = _useTranslation.t;
  var _ref2 = useSmartEmailModal() || {
      setNewLeadInfo: {
        email: undefined,
        company: undefined
      },
      setSelectedTab: function setSelectedTab() {
        return null;
      }
    },
    newLeadInfo = _ref2.newLeadInfo,
    setNewLeadInfo = _ref2.setNewLeadInfo,
    setSelectedTab = _ref2.setSelectedTab,
    company = _ref2.company;
  var isSmartEmailEditor = typeof setNewLeadInfo === 'function';
  var isContactOnDatabase = contact.isInDB;
  var isValidEmail = isEmail(contact.email);
  var showAddToDB = !contact.isCompanyMember && !isContactOnDatabase && isValidEmail && isSmartEmailEditor;
  var tooltipText = getTooltipText(contact.email, isOutsider, isValidEmail, showAddToDB, t);
  var color = function () {
    if (!isValidEmail) return 'verySoftTomato';else if (contact.isCompanyMember) return 'lightBloobirds';else if (showAddToDB) {
      return 'verySoftTangerine';
    } else if (isContactOnDatabase && !isOutsider) {
      return 'lightBloobirds';
    } else {
      return 'softBanana';
    }
  }();
  return /*#__PURE__*/jsx(Tooltip, {
    title: tooltipText,
    position: "top",
    children: /*#__PURE__*/jsxs(Tag, {
      uppercase: false,
      color: color,
      iconLeft: showAddToDB && enabledObjectCreation ? 'plus' : undefined,
      onClickLeft: function onClickLeft() {
        if (showAddToDB && enabledObjectCreation) {
          setNewLeadInfo(_objectSpread$d(_objectSpread$d({}, newLeadInfo), {}, {
            email: contact.email,
            company: company
          }));
          setSelectedTab(SmartEmailTab.CREATE_LEAD);
        }
      },
      iconRight: "cross",
      onClickRight: function onClickRight(e) {
        e.stopPropagation();
        unselectEmail();
      },
      children: [showAddToDB ? /*#__PURE__*/jsx(Icon, {
        name: "alertTriangle",
        color: "tangerine",
        size: 16,
        className: styles$j.warningIcon
      }) : isOutsider && isValidEmail && /*#__PURE__*/jsx(Icon, {
        name: "alertTriangle",
        color: "peanut",
        size: 16,
        className: styles$j.warningIcon
      }), contact.email]
    })
  });
};

var SelectableItem = function SelectableItem(_ref) {
  var contact = _ref.contact,
    selectContact = _ref.selectContact,
    setSelectedIndex = _ref.setSelectedIndex,
    selectedIndex = _ref.selectedIndex,
    index = _ref.index,
    _ref$isOutsider = _ref.isOutsider,
    isOutsider = _ref$isOutsider === void 0 ? false : _ref$isOutsider;
  var ref = useRef();
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.components.recipientSearchInput'
    }),
    t = _useTranslation.t;
  if (index === selectedIndex && ref && ref.current) {
    // @ts-ignore
    ref.current.scrollIntoView({
      block: 'nearest'
    });
  }
  return /*#__PURE__*/jsx(Tooltip, {
    title: isOutsider && t('selectableItemTooltip'),
    position: "top",
    children: /*#__PURE__*/jsxs("div", {
      ref: ref,
      role: "option",
      "aria-selected": index === selectedIndex,
      id: "".concat(contact.email, "-option"),
      className: styles$j.item,
      onMouseEnter: function onMouseEnter() {
        setSelectedIndex(index);
      },
      onMouseDown: function onMouseDown(event) {
        event.preventDefault();
        selectContact(contact);
      },
      children: [/*#__PURE__*/jsx(CircularBadge, {
        size: "medium",
        style: {
          color: 'white',
          backgroundColor: 'var(--lightPeanut)'
        },
        children: /*#__PURE__*/jsx(Icon, {
          name: isOutsider ? 'warning' : contact.icon
        })
      }), /*#__PURE__*/jsxs("div", {
        children: [/*#__PURE__*/jsx(Text, {
          color: "bloobirds",
          size: "s",
          weight: "medium",
          children: contact.name
        }), /*#__PURE__*/jsx(Text, {
          color: "softPeanut",
          size: "s",
          children: contact.email
        })]
      })]
    }, contact.email)
  });
};

function _typeof$i(obj) { "@babel/helpers - typeof"; return _typeof$i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$i(obj); }
function ownKeys$c(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$c(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$c(Object(source), !0).forEach(function (key) { _defineProperty$i(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$c(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$i(obj, key, value) { key = _toPropertyKey$i(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$i(arg) { var key = _toPrimitive$i(arg, "string"); return _typeof$i(key) === "symbol" ? key : String(key); }
function _toPrimitive$i(input, hint) { if (_typeof$i(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$i(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var getActivityConnection = function getActivityConnection(options) {
  var _connections$list, _connections$list2;
  var activity = options.activity,
    mode = options.mode,
    connections = options.connections;
  if (mode === EMAIL_MODE.REPLY && connections !== null && connections !== void 0 && connections.list && activity) {
    var connection = connections.list.find(function (c) {
      return (c === null || c === void 0 ? void 0 : c.email) === getTextFromLogicRole(activity, 'ACTIVITY__EMAIL_USER');
    });
    return connection;
  }
  var defaultConnection = connections === null || connections === void 0 ? void 0 : connections.defaultConnection;
  if (!defaultConnection && connections !== null && connections !== void 0 && connections.list && (connections === null || connections === void 0 ? void 0 : (_connections$list = connections.list) === null || _connections$list === void 0 ? void 0 : _connections$list.length) !== 0) {
    return connections === null || connections === void 0 ? void 0 : connections.list[0];
  }
  return connections === null || connections === void 0 ? void 0 : (_connections$list2 = connections.list) === null || _connections$list2 === void 0 ? void 0 : _connections$list2.find(function (c) {
    return (c === null || c === void 0 ? void 0 : c.email) === defaultConnection;
  });
};
function getDefaultEmail(mode, activityEmailLead, activeLeadEmail) {
  if (mode === 'REPLY' && activityEmailLead) {
    return activityEmailLead;
  }
  if (activeLeadEmail) {
    return activeLeadEmail;
  }
  return null;
}
var checkIfIsEmpty = function checkIfIsEmpty(value) {
  if (!value) {
    return true;
  }
  if (value !== null && value !== void 0 && value[0] && value !== null && value !== void 0 && value[0].children) {
    var _value$0$children, _value$0$children2;
    if (value !== null && value !== void 0 && (_value$0$children = value[0].children) !== null && _value$0$children !== void 0 && _value$0$children[0].text || (value === null || value === void 0 ? void 0 : (_value$0$children2 = value[0].children) === null || _value$0$children2 === void 0 ? void 0 : _value$0$children2.length) > 0) {
      return false;
    }
    return checkIfIsEmpty(value === null || value === void 0 ? void 0 : value[0].children);
  }
  return true;
};
function getContactProps(_ref) {
  var bobjectType = _ref.bobjectType,
    companyName = _ref.companyName,
    rawBobject = _ref.rawBobject,
    fullName = _ref.fullName,
    companyId = _ref.companyId;
  var isCompany = bobjectType === BobjectTypes.Company;
  if (isCompany) {
    var _rawBobject$id;
    var segmentedId = rawBobject === null || rawBobject === void 0 ? void 0 : (_rawBobject$id = rawBobject.id) === null || _rawBobject$id === void 0 ? void 0 : _rawBobject$id.split('/');
    return {
      name: companyName,
      icon: 'company',
      isInDB: true,
      bobject: {
        id: {
          value: rawBobject === null || rawBobject === void 0 ? void 0 : rawBobject.id,
          accountId: segmentedId[0],
          objectId: segmentedId.at(-1),
          typeName: BobjectTypes.Company
        },
        bobjectType: bobjectType,
        name: companyName,
        rawBobject: rawBobject
      }
    };
  } else {
    var _rawBobject$id2;
    var _segmentedId = rawBobject === null || rawBobject === void 0 ? void 0 : (_rawBobject$id2 = rawBobject.id) === null || _rawBobject$id2 === void 0 ? void 0 : _rawBobject$id2.split('/');
    return {
      name: fullName,
      icon: 'person',
      isInDB: true,
      bobject: _objectSpread$c({
        id: {
          value: rawBobject === null || rawBobject === void 0 ? void 0 : rawBobject.id,
          accountId: _segmentedId[0],
          objectId: _segmentedId.at(-1),
          typeName: BobjectTypes.Lead
        },
        bobjectType: bobjectType,
        fullName: fullName,
        rawBobject: rawBobject
      }, companyId ? {
        company: {
          bobjectType: BobjectTypes.Company,
          name: companyName,
          id: {
            objectId: companyId.split('/').at(-1),
            value: companyId,
            accountId: companyId.split('/')[0]
          }
        }
      } : {})
    };
  }
}
var getDefaultToEmail = function getDefaultToEmail(pageBobjectType, defaultToEmail, defaultEmail) {
  if (defaultToEmail && Array.isArray(defaultToEmail)) {
    return defaultToEmail;
  } else if (pageBobjectType === BobjectTypes.Opportunity) {
    return null;
  } else if (defaultEmail) {
    return [defaultEmail];
  } else {
    return null;
  }
};
function getFocusPoint(focusedEditor, currentSelectedIndex) {
  return currentSelectedIndex === 0 ? Editor.end(focusedEditor, []) : focusedEditor === null || focusedEditor === void 0 ? void 0 : focusedEditor.selection;
}

function _typeof$h(obj) { "@babel/helpers - typeof"; return _typeof$h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$h(obj); }
function _defineProperty$h(obj, key, value) { key = _toPropertyKey$h(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$h(arg) { var key = _toPrimitive$h(arg, "string"); return _typeof$h(key) === "symbol" ? key : String(key); }
function _toPrimitive$h(input, hint) { if (_typeof$h(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$h(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function getBobjectsByEmails(accountId, bobjectType, fields, emails) {
  var queries = fields.map(function (field) {
    return _defineProperty$h({}, field, emails);
  });
  return api.post('/bobjects/' + accountId + '/' + bobjectType + '/search', {
    query: {},
    queries: queries,
    formFields: true,
    pageSize: 50
  });
}
var useBobjectsByEmails = function useBobjectsByEmails(accountId, bobjectType, fields, emails) {
  var _data$data;
  var _useSWR = useSWR(accountId && bobjectType && fields && emails ? accountId + bobjectType + emails : null, function () {
      return getBobjectsByEmails(accountId, bobjectType, fields, emails);
    }),
    data = _useSWR.data,
    isValidating = _useSWR.isValidating;
  var bobjects = data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.contents;
  return {
    bobjects: bobjects,
    isValidating: isValidating
  };
};

var _excluded$3 = ["emails"];
function _typeof$g(obj) { "@babel/helpers - typeof"; return _typeof$g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$g(obj); }
function _toConsumableArray$7(arr) { return _arrayWithoutHoles$7(arr) || _iterableToArray$7(arr) || _unsupportedIterableToArray$e(arr) || _nonIterableSpread$7(); }
function _nonIterableSpread$7() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray$7(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$7(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$e(arr); }
function _objectWithoutProperties$3(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$3(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$3(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _slicedToArray$c(arr, i) { return _arrayWithHoles$c(arr) || _iterableToArrayLimit$c(arr, i) || _unsupportedIterableToArray$e(arr, i) || _nonIterableRest$c(); }
function _nonIterableRest$c() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$e(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$e(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$e(o, minLen); }
function _arrayLikeToArray$e(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$c(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$c(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys$b(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$b(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$b(Object(source), !0).forEach(function (key) { _defineProperty$g(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$b(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$g(obj, key, value) { key = _toPropertyKey$g(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$g(arg) { var key = _toPrimitive$g(arg, "string"); return _typeof$g(key) === "symbol" ? key : String(key); }
function _toPrimitive$g(input, hint) { if (_typeof$g(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$g(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function getReferenceId(bobject) {
  var bobjectType = bobject.id.typeName;
  if (bobjectType === BobjectTypes.Lead) {
    return getValueFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.COMPANY) || bobject.id.value;
  } else {
    return bobject.id.value;
  }
}
function useParseEmailsIntoContact(accountId, isFirstLoad) {
  var emails = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var
  //leads: Bobject[],
  dataModel = arguments.length > 3 ? arguments[3] : undefined;
  var companyEmailFields = dataModel && dataModel.findFieldsByTypeAndBobjectType(BobjectTypes.Company, 'EMAIL').map(function (f) {
    return f.id;
  });
  var leadEmailFields = dataModel && dataModel.findFieldsByTypeAndBobjectType(BobjectTypes.Lead, 'EMAIL').map(function (f) {
    return f.id;
  });
  var contacts = [];
  var _useBobjectsByEmails = useBobjectsByEmails(isFirstLoad && accountId, 'Lead', leadEmailFields, emails),
    leadsFromDB = _useBobjectsByEmails.bobjects,
    isValidatingLead = _useBobjectsByEmails.isValidating;
  var _useBobjectsByEmails2 = useBobjectsByEmails(isFirstLoad && accountId, 'Company', companyEmailFields, emails),
    companiesFromDB = _useBobjectsByEmails2.bobjects,
    isValidatingCompany = _useBobjectsByEmails2.isValidating;
  var isLoading = isValidatingLead || isValidatingCompany;
  if (isFirstLoad && !isLoading && emails) {
    emails.forEach(function (email) {
      var lead = leadsFromDB === null || leadsFromDB === void 0 ? void 0 : leadsFromDB.find(function (b) {
        return leadEmailFields.some(function (fieldId) {
          return b.raw.contents[fieldId] === email;
        });
      });
      var companyFromDB = companiesFromDB === null || companiesFromDB === void 0 ? void 0 : companiesFromDB.find(function (b) {
        return companyEmailFields.some(function (fieldId) {
          return b.raw.contents[fieldId] === email;
        });
      });
      if (lead) {
        var companyId = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.COMPANY);
        contacts.push({
          bobject: _objectSpread$b({
            id: lead.id,
            bobjectType: BobjectTypes.Lead,
            fullName: getValueFromLogicRole(lead, 'LEAD__FULL_NAME')
          }, companyId && {
            company: {
              id: {
                accountId: accountId,
                objectId: '',
                typeName: BobjectTypes.Company,
                value: companyId
              }
            }
          }),
          email: email,
          name: getValueFromLogicRole(lead, 'LEAD__FULL_NAME'),
          icon: 'person',
          isInDB: true,
          referenceId: getReferenceId(lead)
        });
      } else if (companyFromDB) {
        contacts.push({
          name: '',
          bobject: {
            id: companyFromDB.id,
            bobjectType: BobjectTypes.Company,
            name: ''
          },
          email: email,
          icon: 'company',
          isInDB: true,
          referenceId: getReferenceId(companyFromDB)
        });
      } else {
        contacts.push(_objectSpread$b(_objectSpread$b({}, emptyContact), {}, {
          email: email
        }));
      }
    });
  }
  return {
    contacts: contacts,
    isLoadingContacts: isLoading
  };
}
function getCompanyLeads(companyIdValue) {
  var accountId = companyIdValue.split('/')[0];
  if (accountId) return api.post('/bobjects/' + accountId + '/Lead/search', {
    query: {
      LEAD__COMPANY: [companyIdValue]
    },
    formFields: true,
    pageSize: 50,
    injectReferences: true
  });
}
function useRelatedContacts(company, dataModel) {
  var companyId = company === null || company === void 0 ? void 0 : company.id.value;
  var _useGetBobjectByTypeA = useGetBobjectByTypeAndId(companyId),
    companyFromBE = _useGetBobjectByTypeA.bobject;
  var companyEmailFields = dataModel && dataModel.findFieldsByTypeAndBobjectType(BobjectTypes.Company, 'EMAIL').map(function (f) {
    return f.id;
  });
  var leadEmailFields = dataModel && dataModel.findFieldsByTypeAndBobjectType(BobjectTypes.Lead, 'EMAIL').map(function (f) {
    return f.id;
  });
  var _useSWR = useSWR(companyId ? "lead-company-leads-".concat(companyId) : null, function () {
      return getCompanyLeads(companyId);
    }),
    leadsFromBE = _useSWR.data;
  var contacts = [];
  if (companyFromBE && companyEmailFields) {
    companyEmailFields.forEach(function (field) {
      var _companyFromBE$raw;
      var email = (_companyFromBE$raw = companyFromBE.raw) === null || _companyFromBE$raw === void 0 ? void 0 : _companyFromBE$raw.contents[field];
      if (email) {
        contacts.push({
          name: getValueFromLogicRole(companyFromBE, COMPANY_FIELDS_LOGIC_ROLE.NAME),
          email: email,
          icon: 'company',
          isInDB: true,
          referenceId: companyId,
          bobject: {
            id: companyFromBE.id,
            bobjectType: BobjectTypes.Company,
            name: ''
          }
        });
      }
    });
  }
  if (leadsFromBE && leadEmailFields) {
    var _leadsFromBE$data, _leadsFromBE$data$con;
    (_leadsFromBE$data = leadsFromBE.data) === null || _leadsFromBE$data === void 0 ? void 0 : (_leadsFromBE$data$con = _leadsFromBE$data.contents) === null || _leadsFromBE$data$con === void 0 ? void 0 : _leadsFromBE$data$con.map(function (lead) {
      leadEmailFields.forEach(function (field) {
        var email = lead.raw.contents[field];
        if (email) {
          contacts.push({
            name: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
            email: email,
            icon: 'person',
            isInDB: true,
            referenceId: companyId,
            bobject: _objectSpread$b({
              id: lead.id,
              bobjectType: BobjectTypes.Lead,
              fullName: getValueFromLogicRole(lead, 'LEAD__FULL_NAME')
            }, companyId && {
              company: {
                id: {
                  accountId: lead.id.accountId,
                  objectId: '',
                  typeName: BobjectTypes.Company,
                  value: companyId
                }
              }
            })
          });
        }
      });
    });
  }
  return {
    contacts: contacts
  };
}
var useGlobalContacts = function useGlobalContacts(_ref) {
  var searchTerm = _ref.searchTerm,
    accountId = _ref.accountId;
  var _useState = useState(),
    _useState2 = _slicedToArray$c(_useState, 2),
    contacts = _useState2[0],
    setContacts = _useState2[1];
  useEffect(function () {
    api.post("/bobjects/".concat(accountId, "/global-search"), {
      query: searchTerm,
      bobjectTypes: ['Company', 'Lead'],
      filters: ['WITH_EMAIL'],
      numberOfResults: 10
    }).then(function (response) {
      var _response$data;
      setContacts(response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.results);
    });
  }, [searchTerm, accountId]);
  return {
    contacts: contacts,
    isValidating: !contacts
  };
};
var useRecipientSeachInput = function useRecipientSeachInput(_ref2) {
  var company = _ref2.company,
    selectedContacts = _ref2.selectedContacts,
    dataModel = _ref2.dataModel;
  var _useState3 = useState(''),
    _useState4 = _slicedToArray$c(_useState3, 2),
    searchTerm = _useState4[0],
    setSearchTerm = _useState4[1];
  var _useState5 = useState(company ? SearchType.relatedBobjects : SearchType.globalSearch),
    _useState6 = _slicedToArray$c(_useState5, 2),
    searchType = _useState6[0],
    setSearchType = _useState6[1];
  var _useRelatedContacts = useRelatedContacts(company, dataModel),
    relatedContacts = _useRelatedContacts.contacts;
  var _useUserSearch = useUserSearch(),
    availableCompanyContacts = _useUserSearch.users;
  var _useGlobalContacts = useGlobalContacts({
      accountId: dataModel === null || dataModel === void 0 ? void 0 : dataModel.getAccountId(),
      searchTerm: searchTerm === null || searchTerm === void 0 ? void 0 : searchTerm.toLowerCase()
    }),
    globalContacts = _useGlobalContacts.contacts,
    isValidating = _useGlobalContacts.isValidating;
  var availableGlobalContacts = useMemo(function () {
    if (!globalContacts) {
      return [];
    }
    return globalContacts.reduce(function (acc, _ref3) {
      var _contact$rawBobject;
      var emails = _ref3.emails,
        contact = _objectWithoutProperties$3(_ref3, _excluded$3);
      var contactProps = getContactProps(contact);
      var referenceId = contact.bobjectType === BobjectTypes.Lead ? contact === null || contact === void 0 ? void 0 : contact.companyId : contact === null || contact === void 0 ? void 0 : (_contact$rawBobject = contact.rawBobject) === null || _contact$rawBobject === void 0 ? void 0 : _contact$rawBobject.id;
      var parsedContacts = emails === null || emails === void 0 ? void 0 : emails.map(function (email) {
        return _objectSpread$b(_objectSpread$b({}, contactProps), {}, {
          email: email,
          referenceId: referenceId
        });
      }).filter(function (c) {
        return !(selectedContacts !== null && selectedContacts !== void 0 && selectedContacts.find(function (sc) {
          return sc.email === c.email;
        }));
      });
      return [].concat(_toConsumableArray$7(acc), _toConsumableArray$7(parsedContacts));
    }, []);
  }, [globalContacts, selectedContacts]);
  function getAvailableContacts() {
    switch (searchType) {
      case SearchType.relatedBobjects:
        return relatedContacts.filter(function (contact) {
          var _contact$name, _contact$email;
          return !(selectedContacts !== null && selectedContacts !== void 0 && selectedContacts.find(function (sc) {
            return sc.email === contact.email;
          })) && (!searchTerm || ((_contact$name = contact.name) === null || _contact$name === void 0 ? void 0 : _contact$name.toLowerCase().includes(searchTerm.toLowerCase())) || ((_contact$email = contact.email) === null || _contact$email === void 0 ? void 0 : _contact$email.toLowerCase().includes(searchTerm.toLowerCase())));
        });
      case SearchType.globalSearch:
        return availableGlobalContacts;
      case SearchType.companySearch:
        {
          var filteredContacts = availableCompanyContacts === null || availableCompanyContacts === void 0 ? void 0 : availableCompanyContacts.filter(function (contact) {
            var _contact$email2, _contact$name2;
            return !(selectedContacts !== null && selectedContacts !== void 0 && selectedContacts.find(function (sc) {
              return sc.email === contact.email;
            })) && (!searchTerm || (contact === null || contact === void 0 ? void 0 : (_contact$email2 = contact.email) === null || _contact$email2 === void 0 ? void 0 : _contact$email2.toLowerCase().includes(searchTerm.toLowerCase())) || (contact === null || contact === void 0 ? void 0 : (_contact$name2 = contact.name) === null || _contact$name2 === void 0 ? void 0 : _contact$name2.toLowerCase().includes(searchTerm.toLowerCase())));
          });
          return filteredContacts === null || filteredContacts === void 0 ? void 0 : filteredContacts.reduce(function (acc, _ref4) {
            var email = _ref4.email,
              name = _ref4.name;
            if (selectedContacts !== null && selectedContacts !== void 0 && selectedContacts.find(function (sc) {
              return sc.email === email;
            })) {
              return acc;
            }
            return [].concat(_toConsumableArray$7(acc), [{
              email: email,
              name: name,
              icon: 'person',
              isInDB: false,
              referenceId: undefined,
              bobject: undefined,
              isCompanyMember: true
            }]);
          }, []);
        }
    }
  }
  var availableContacts = getAvailableContacts();
  return {
    isValidating: isValidating,
    availableGlobalContacts: availableGlobalContacts,
    availableContacts: availableContacts,
    globalContacts: globalContacts,
    relatedContacts: relatedContacts,
    availableCompanyContacts: availableCompanyContacts,
    searchTerm: searchTerm,
    setSearchTerm: setSearchTerm,
    searchType: searchType,
    setSearchType: setSearchType
  };
};

function _typeof$f(obj) { "@babel/helpers - typeof"; return _typeof$f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$f(obj); }
function _toConsumableArray$6(arr) { return _arrayWithoutHoles$6(arr) || _iterableToArray$6(arr) || _unsupportedIterableToArray$d(arr) || _nonIterableSpread$6(); }
function _nonIterableSpread$6() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray$6(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$6(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$d(arr); }
function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$a(Object(source), !0).forEach(function (key) { _defineProperty$f(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$f(obj, key, value) { key = _toPropertyKey$f(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$f(arg) { var key = _toPrimitive$f(arg, "string"); return _typeof$f(key) === "symbol" ? key : String(key); }
function _toPrimitive$f(input, hint) { if (_typeof$f(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$f(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$b(arr, i) { return _arrayWithHoles$b(arr) || _iterableToArrayLimit$b(arr, i) || _unsupportedIterableToArray$d(arr, i) || _nonIterableRest$b(); }
function _nonIterableRest$b() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$d(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$d(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$d(o, minLen); }
function _arrayLikeToArray$d(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$b(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$b(arr) { if (Array.isArray(arr)) return arr; }
var emptyContact = {
  bobject: undefined,
  email: '',
  icon: 'questionCircle',
  isInDB: false,
  referenceId: '',
  name: 'Unknown'
};
var SearchType;
(function (SearchType) {
  SearchType[SearchType["relatedBobjects"] = 0] = "relatedBobjects";
  SearchType[SearchType["globalSearch"] = 1] = "globalSearch";
  SearchType[SearchType["companySearch"] = 2] = "companySearch";
})(SearchType || (SearchType = {}));
function RecipientSearchInput(props) {
  var id = props.id,
    emails = props.emails,
    onChange = props.onChange,
    contextProps = props.contextProps;
  var accountId = contextProps.accountId,
    activeBobject = contextProps.activeBobject,
    company = contextProps.company,
    dataModel = contextProps.dataModel,
    filters = contextProps.filters,
    setFilters = contextProps.setFilters,
    setLeadCreatedCallback = contextProps.setLeadCreatedCallback,
    setRelatedBobjectsInfo = contextProps.setRelatedBobjectsInfo;
  var inputRef = useRef();
  var _useState = useState([]),
    _useState2 = _slicedToArray$b(_useState, 2),
    selectedContacts = _useState2[0],
    setSelectedContacts = _useState2[1];
  var _useRecipientSeachInp = useRecipientSeachInput({
      company: company,
      dataModel: dataModel,
      selectedContacts: selectedContacts
    }),
    relatedContacts = _useRecipientSeachInp.relatedContacts,
    availableCompanyContacts = _useRecipientSeachInp.availableCompanyContacts,
    availableContacts = _useRecipientSeachInp.availableContacts,
    availableGlobalContacts = _useRecipientSeachInp.availableGlobalContacts,
    searchTerm = _useRecipientSeachInp.searchTerm,
    setSearchTerm = _useRecipientSeachInp.setSearchTerm,
    searchType = _useRecipientSeachInp.searchType,
    setSearchType = _useRecipientSeachInp.setSearchType,
    isValidating = _useRecipientSeachInp.isValidating;
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$b(_useState3, 2),
    focused = _useState4[0],
    setFocused = _useState4[1];
  var _useVisible = useVisible(false),
    ref = _useVisible.ref,
    dropdownFocused = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  var _useState5 = useState(-1),
    _useState6 = _slicedToArray$b(_useState5, 2),
    selectedIndex = _useState6[0],
    setSelectedIndex = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray$b(_useState7, 2),
    hasLoadContacts = _useState8[0],
    setHasLoadContacts = _useState8[1];
  var historyRef = useRef([selectedContacts]);
  function setDropdownFocused(focus) {
    setVisible(function (v) {
      return v === focus ? v : focus;
    });
  }
  var firstValidEmail = selectedContacts === null || selectedContacts === void 0 ? void 0 : selectedContacts.findIndex(function (c) {
    return isEmail(c.email) && c.isInDB;
  });
  var isFirstLoad = selectedContacts.length === 0 && searchTerm === '' && !hasLoadContacts;
  var _useParseEmailsIntoCo = useParseEmailsIntoContact(accountId, isFirstLoad, emails, dataModel),
    contacts = _useParseEmailsIntoCo.contacts,
    isLoadingContacts = _useParseEmailsIntoCo.isLoadingContacts;
  useEffect(function () {
    if (!isLoadingContacts && contacts && contacts.length > 0) {
      setSelectedContacts(contacts);
      onChange(contacts);
      updateRelatedBobjectsInfo(contacts, contacts[0]);
    }
    if (!isLoadingContacts) {
      setHasLoadContacts(true);
    }
  }, [isLoadingContacts]);
  var hasNoEmailsLeftOnContext = relatedContacts.filter(function (c) {
    return !selectedContacts.some(function (selectedC) {
      return selectedC.email === c.email;
    });
  }).length === 0;
  useEffect(function () {
    if (company && !hasNoEmailsLeftOnContext) {
      setSearchType(SearchType.relatedBobjects);
    } else {
      setSearchType(SearchType.globalSearch);
    }
  }, [!!company, hasNoEmailsLeftOnContext]);
  useEffect(function () {
    setLeadCreatedCallback === null || setLeadCreatedCallback === void 0 ? void 0 : setLeadCreatedCallback(function () {
      return function (leadEmail) {
        setSelectedContacts(function (selected) {
          return selected === null || selected === void 0 ? void 0 : selected.map(function (contact) {
            var _contact$email;
            return ((_contact$email = contact.email) === null || _contact$email === void 0 ? void 0 : _contact$email.toLowerCase()) === leadEmail ? _objectSpread$a(_objectSpread$a({}, contact), {}, {
              isInDB: true
            }) : contact;
          });
        });
      };
    });
  }, []);
  useEffect(function () {
    if ((!dropdownFocused || (availableContacts === null || availableContacts === void 0 ? void 0 : availableContacts.length) === 0) && !focused && searchTerm) {
      var contact = availableGlobalContacts === null || availableGlobalContacts === void 0 ? void 0 : availableGlobalContacts.find(function (agc) {
        return agc.email === searchTerm;
      });
      if (contact) {
        _selectContact(contact);
      } else {
        createContact(searchTerm);
      }
      setSearchTerm('');
    }
  }, [dropdownFocused, focused]);
  var updateRelatedBobjectsInfo = function updateRelatedBobjectsInfo(updatedContacts, contact) {
    if (contact.bobject) {
      var _activeBobject$rawBob, _raw, _contact$bobject;
      var isActiveBobject = contact.bobject.id.value === (activeBobject === null || activeBobject === void 0 ? void 0 : activeBobject.id.value);
      var enrichedBobject = _objectSpread$a(_objectSpread$a({}, contact.bobject), isActiveBobject ? {
        rawBobject: (_activeBobject$rawBob = activeBobject === null || activeBobject === void 0 ? void 0 : activeBobject.rawBobject) !== null && _activeBobject$rawBob !== void 0 ? _activeBobject$rawBob : activeBobject === null || activeBobject === void 0 ? void 0 : (_raw = activeBobject.raw) === null || _raw === void 0 ? void 0 : _raw.contents
      } : {});
      var dataToUpdate = {
        activeBobject: enrichedBobject
      };
      if ((contact === null || contact === void 0 ? void 0 : (_contact$bobject = contact.bobject) === null || _contact$bobject === void 0 ? void 0 : _contact$bobject.bobjectType) === BobjectTypes.Company /*&& !company*/) {
        //@ts-ignore
        dataToUpdate.company = contact.bobject;
      } else {
        var _contact$bobject2, _contact$bobject3;
        setFilters(_objectSpread$a(_objectSpread$a({}, filters), {}, {
          lead: updatedContacts.reduce(function (acc, _ref) {
            var bobject = _ref.bobject;
            if ((bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType) === BobjectTypes.Lead) return [].concat(_toConsumableArray$6(acc), [bobject === null || bobject === void 0 ? void 0 : bobject.id.value]);else return acc;
          }, [])
        }));
        var setNewCompany = filters.lead.length === 0 && ((_contact$bobject2 = contact.bobject) === null || _contact$bobject2 === void 0 ? void 0 : _contact$bobject2.bobjectType) === BobjectTypes.Lead && ((_contact$bobject3 = contact.bobject) === null || _contact$bobject3 === void 0 ? void 0 : _contact$bobject3.company);
        if (setNewCompany) {
          // @ts-ignore
          dataToUpdate.company = contact.bobject.company;
        }
      }
      // @ts-ignore
      setRelatedBobjectsInfo(dataToUpdate);
    }
  };
  var _selectContact = function selectContact(contact) {
    var updatedContacts = [].concat(_toConsumableArray$6(selectedContacts), [contact]);
    setSelectedContacts(updatedContacts);
    setSearchTerm('');
    onChange(updatedContacts);
    if (isEmail(contact.email) && searchType !== SearchType.companySearch) {
      updateRelatedBobjectsInfo(updatedContacts, contact);
    }
    setSelectedIndex(-1);
    if (searchType === SearchType.globalSearch && !focused) {
      setDropdownFocused(false);
    }
    if (searchType === SearchType.relatedBobjects) {
      var leftContacts = relatedContacts.filter(function (c) {
        return !(updatedContacts !== null && updatedContacts !== void 0 && updatedContacts.find(function (selectedC) {
          var _selectedC$email, _c$email;
          return ((_selectedC$email = selectedC.email) === null || _selectedC$email === void 0 ? void 0 : _selectedC$email.toLowerCase()) === ((_c$email = c.email) === null || _c$email === void 0 ? void 0 : _c$email.toLowerCase());
        }));
      });
      if (leftContacts.length === 0) {
        setSearchType(SearchType.globalSearch);
      }
    }
    if (searchType === SearchType.companySearch) {
      var _leftContacts = availableContacts.filter(function (c) {
        return !(updatedContacts !== null && updatedContacts !== void 0 && updatedContacts.find(function (selectedC) {
          var _selectedC$email2, _c$email2;
          return ((_selectedC$email2 = selectedC.email) === null || _selectedC$email2 === void 0 ? void 0 : _selectedC$email2.toLowerCase()) === ((_c$email2 = c.email) === null || _c$email2 === void 0 ? void 0 : _c$email2.toLowerCase());
        }));
      });
      if (_leftContacts.length === 0) {
        setSearchType(SearchType.globalSearch);
      }
    }
  };
  var unselectContact = function unselectContact(contact, index) {
    var updatedContacts = _toConsumableArray$6(selectedContacts);
    if (contact) {
      updatedContacts.splice(index, 1);
    } else {
      updatedContacts.pop();
    }
    // @ts-ignore
    var updatedContactsEmails = updatedContacts.map(function (contact) {
      var _contact$bobject4, _contact$bobject4$id;
      return contact === null || contact === void 0 ? void 0 : (_contact$bobject4 = contact.bobject) === null || _contact$bobject4 === void 0 ? void 0 : (_contact$bobject4$id = _contact$bobject4.id) === null || _contact$bobject4$id === void 0 ? void 0 : _contact$bobject4$id.value;
    });
    setFilters(_objectSpread$a(_objectSpread$a({}, filters), {}, {
      lead: updatedContactsEmails.reduce(function (acc, email) {
        if (email && email.includes(BobjectTypes.Lead)) return [].concat(_toConsumableArray$6(acc), [email]);else return acc;
      }, [])
    }));
    var contactIndex = selectedContacts === null || selectedContacts === void 0 ? void 0 : selectedContacts.findIndex(function (c) {
      return c.email === (contact === null || contact === void 0 ? void 0 : contact.email);
    });
    if (contactIndex === firstValidEmail && selectedContacts.length > 1) {
      var lastContact = updatedContacts === null || updatedContacts === void 0 ? void 0 : updatedContacts.find(function (c) {
        return isEmail(c.email) && c.isInDB;
      });
      if (lastContact && lastContact.bobject) {
        // @ts-ignore
        setRelatedBobjectsInfo(_objectSpread$a(_objectSpread$a(_objectSpread$a({}, !activeBobject ? {
          activeBobject: lastContact.bobject
        } : {}), activeBobject && activeBobject === contact.bobject ? {
          activeBobject: lastContact.bobject
        } : {}), {}, {
          company: lastContact.bobject.bobjectType === BobjectTypes.Lead ? lastContact.bobject.company : lastContact.bobject
        }));
      }
    }
    setSelectedContacts(updatedContacts);
    onChange(updatedContacts);
  };
  var createContact = function createContact(email) {
    if (email.trim() !== '') {
      var contact = _objectSpread$a(_objectSpread$a({}, emptyContact), {}, {
        email: email,
        isInDB: availableContacts === null || availableContacts === void 0 ? void 0 : availableContacts.some(function (c) {
          var _c$email3;
          return ((_c$email3 = c.email) === null || _c$email3 === void 0 ? void 0 : _c$email3.toLowerCase()) === (email === null || email === void 0 ? void 0 : email.toLowerCase());
        })
      });
      _selectContact(contact);
    }
  };
  var handleKeyDown = function handleKeyDown(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
      if (historyRef.current.length > 2) {
        historyRef.current.pop();
        var previousLabels = historyRef.current.pop();
        setSelectedContacts(previousLabels);
        onChange(previousLabels);
      }
    } else if (event.key === 'ArrowDown') {
      setSelectedIndex((selectedIndex + 1) % availableContacts.length);
    } else if (event.key === 'ArrowUp') {
      setSelectedIndex(selectedIndex <= 0 ? availableContacts.length - 1 : (selectedIndex - 1) % availableContacts.length);
    } else if (event.key === 'Backspace' && searchTerm === '' && (selectedContacts === null || selectedContacts === void 0 ? void 0 : selectedContacts.length) > 0) {
      unselectContact();
    } else if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      if (searchTerm !== '') {
        var _availableContacts$fi;
        if (availableContacts[selectedIndex]) {
          _selectContact(availableContacts[selectedIndex]);
        } else if (((_availableContacts$fi = availableContacts.filter(function (contact) {
          return contact.email === (searchTerm === null || searchTerm === void 0 ? void 0 : searchTerm.toLowerCase());
        })) === null || _availableContacts$fi === void 0 ? void 0 : _availableContacts$fi.length) > 0) {
          _selectContact(availableContacts.filter(function (contact) {
            return contact.email === (searchTerm === null || searchTerm === void 0 ? void 0 : searchTerm.toLowerCase());
          })[0]);
        } else {
          createContact(searchTerm);
        }
        setSearchTerm('');
      } else if (searchType !== SearchType.globalSearch && availableContacts && availableContacts !== null && availableContacts !== void 0 && availableContacts[selectedIndex]) {
        _selectContact(availableContacts[selectedIndex]);
      }
    }
    setDropdownFocused(true);
  };
  var handleDropdownChipClick = function handleDropdownChipClick(type) {
    setDropdownFocused(true);
    if (type !== searchType) {
      setSearchType(type);
    }
  };
  return /*#__PURE__*/jsxs("div", {
    className: clsx(styles$j.container),
    onClick: function onClick() {
      var input = inputRef.current.getInput();
      input.focus();
    },
    children: [selectedContacts === null || selectedContacts === void 0 ? void 0 : selectedContacts.map(function (contact, index) {
      function isOutsiderEmail() {
        if (contact.isCompanyMember) return false;else if (company) return company.id.value !== (contact === null || contact === void 0 ? void 0 : contact.referenceId);else {
          return selectedContacts.slice(0, index).some(function (c) {
            return c.isInDB;
          });
        }
      }
      var isOutsider = isOutsiderEmail();
      return /*#__PURE__*/jsx(EmailBadge, {
        contact: contact,
        unselectEmail: function unselectEmail() {
          return unselectContact(contact, index);
        },
        isOutsider: isOutsider
      }, contact.email + index);
    }), /*#__PURE__*/jsx(AutosizeInput, {
      ref: inputRef,
      value: searchTerm,
      inputClassName: styles$j.input,
      type: "text",
      id: "".concat(id, "-input"),
      "aria-autocomplete": "list",
      "aria-controls": "".concat(id, "-listbox"),
      "aria-activedescendant": availableContacts !== null && availableContacts !== void 0 && availableContacts[selectedIndex] ? "".concat(availableContacts[selectedIndex], "-option") : null,
      autoComplete: "off",
      onKeyDown: handleKeyDown,
      onFocus: function onFocus() {
        setFocused(true);
        setDropdownFocused(true);
      },
      onBlur: function onBlur() {
        setFocused(true);
        setFocused(false);
      },
      onChange: function onChange(event) {
        var trimmedValue = event.target.value.trim();
        setSearchTerm(isEmail(trimmedValue) ? trimmedValue : event.target.value);
      }
    }), focused || dropdownFocused ? /*#__PURE__*/jsxs("div", {
      role: "listbox",
      id: "".concat(id, "-listbox"),
      className: styles$j.dropdown,
      ref: ref,
      children: [/*#__PURE__*/jsx(DropdownHeader, {
        hasValuesAdded: selectedContacts.length > 0,
        searchType: searchType,
        hasCompany: !!company,
        hasNoEmailsLeftOnContext: hasNoEmailsLeftOnContext,
        handleDropdownChipClick: handleDropdownChipClick,
        allCoworkersAdded: availableCompanyContacts && (availableContacts === null || availableContacts === void 0 ? void 0 : availableContacts.length) > 0 && availableContacts.every(function (_ref2) {
          var email = _ref2.email;
          return selectedContacts.some(function (_ref3) {
            var selectedEmail = _ref3.email;
            return selectedEmail === email;
          });
        })
      }), /*#__PURE__*/jsx("div", {
        className: styles$j.dropdownContent,
        children: (searchTerm !== '' || searchType !== SearchType.globalSearch) && (availableContacts === null || availableContacts === void 0 ? void 0 : availableContacts.length) > 0 ? isValidating ? /*#__PURE__*/jsx("div", {
          className: styles$j.spinnerContainer,
          children: /*#__PURE__*/jsx(Spinner, {
            name: "loadingCircle"
          })
        }) : availableContacts === null || availableContacts === void 0 ? void 0 : availableContacts.map(function (contact, index) {
          return /*#__PURE__*/jsx(SelectableItem, {
            contact: contact,
            selectContact: function selectContact(contact) {
              _selectContact(contact);
              setSearchTerm('');
              setDropdownFocused(false);
              setFocused(false);
            },
            selectedIndex: selectedIndex,
            setSelectedIndex: setSelectedIndex,
            index: index
          }, contact.email + index);
        }) : /*#__PURE__*/jsx(NoContacts, {
          hasSearchTerm: searchTerm !== '' && !isValidating
        })
      })]
    }) : null]
  });
}

var css_248z$e = ".saveWithSlotsModal-module_text__-NJ79 {\n  padding-bottom: 30px;\n}\n\n.saveWithSlotsModal-module_header__hhiN9{\n  justify-content: flex-start;\n  gap: 8px\n}\n";
var styles$d = {"text":"saveWithSlotsModal-module_text__-NJ79","header":"saveWithSlotsModal-module_header__hhiN9"};
styleInject(css_248z$e);

var SaveWithSlotsModal = function SaveWithSlotsModal(_ref) {
  var handleClose = _ref.handleClose,
    onConfirm = _ref.onConfirm,
    open = _ref.open;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs(Modal, {
    open: open,
    onClose: handleClose,
    width: 640,
    children: [/*#__PURE__*/jsxs(ModalHeader, {
      className: styles$d.header,
      children: [/*#__PURE__*/jsx(Icon, {
        name: "alertTriangle",
        color: "peanut"
      }), /*#__PURE__*/jsx(Text, {
        color: "peanut",
        size: "m",
        children: t('smartEmailModal.components.saveWithNoSlotsModal.saveTemplate')
      })]
    }), /*#__PURE__*/jsx(ModalContent, {
      className: styles$d.text,
      children: /*#__PURE__*/jsx(Text, {
        color: "peanut",
        size: "m",
        inline: true,
        align: "center",
        children: /*#__PURE__*/jsx(Trans, {
          i18nKey: "smartEmailModal.components.saveWithNoSlotsModal.modalContentText"
        })
      })
    }), /*#__PURE__*/jsxs(ModalFooter, {
      children: [/*#__PURE__*/jsx(Button, {
        variant: "clear",
        onClick: handleClose,
        color: "extraMeeting",
        children: t('smartEmailModal.components.saveWithNoSlotsModal.backAndEdit')
      }), /*#__PURE__*/jsx(Button, {
        onClick: onConfirm,
        children: t('smartEmailModal.components.saveWithNoSlotsModal.continue')
      })]
    })]
  });
};

var css_248z$d = ".resetSalesforceCSSs-module_salesforceReset__OJ9R2 {\n}\n\n.resetSalesforceCSSs-module_salesforceReset__OJ9R2 table {\n    width: inherit;\n}\n\n.resetSalesforceCSSs-module_salesforceReset__OJ9R2 td,\n.resetSalesforceCSSs-module_salesforceReset__OJ9R2 th {\n    text-align: revert-layer;\n    padding: unset;\n}\n\n.resetSalesforceCSSs-module_salesforceReset__OJ9R2 img {\n    height: unset;\n    max-width: unset;\n    vertical-align: unset;\n}\n";
var salesforceResetStyles = {"salesforceReset":"resetSalesforceCSSs-module_salesforceReset__OJ9R2"};
styleInject(css_248z$d);

function _typeof$e(obj) { "@babel/helpers - typeof"; return _typeof$e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$e(obj); }
function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$9(Object(source), !0).forEach(function (key) { _defineProperty$e(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$e(obj, key, value) { key = _toPropertyKey$e(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$e(arg) { var key = _toPrimitive$e(arg, "string"); return _typeof$e(key) === "symbol" ? key : String(key); }
function _toPrimitive$e(input, hint) { if (_typeof$e(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$e(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function BodyEditor(_ref) {
  var setBodyEditor = _ref.setBodyEditor,
    handleSaveSnippet = _ref.handleSaveSnippet,
    _ref$defaultValue = _ref.defaultValue,
    defaultValue = _ref$defaultValue === void 0 ? initialValue : _ref$defaultValue,
    children = _ref.children;
  var bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: true,
    replaceMeetingLinks: true,
    rawHTMLBlock: true,
    replyHistory: true,
    snippets: true
  });
  var _useFormContext = useFormContext(),
    register = _useFormContext.register,
    getValues = _useFormContext.getValues;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var registerProps = register('body');
  var _useSmartEmailModal = useSmartEmailModal(),
    hasSnippetsEnabled = _useSmartEmailModal.hasSnippetsEnabled,
    setSlotsData = _useSmartEmailModal.setSlotsData,
    setSelectedTab = _useSmartEmailModal.setSelectedTab,
    snippets = _useSmartEmailModal.snippets,
    storeEditorRef = _useSmartEmailModal.storeEditorRef;
  return /*#__PURE__*/jsx(RichTextEditor, {
    id: "emailBody",
    placeholder: t('emailModal.bodyPlaceholder'),
    plugins: bodyPlugins,
    style: {
      padding: '16px 21px'
    }
    // @ts-ignore
    ,
    setEditor: function setEditor(value) {
      storeEditorRef(value);
      setBodyEditor(value);
    }
    // @ts-ignore
    ,
    snippets: hasSnippetsEnabled && snippets,
    saveSnippetCallback: handleSaveSnippet,
    handleEditSlots: function handleEditSlots() {
      setSlotsData(function (prevSlotsData) {
        return _objectSpread$9(_objectSpread$9({}, prevSlotsData), {}, {
          calendarSlotsVisible: true
        });
      });
      setSelectedTab(SmartEmailTab.CALENDAR);
    },
    defaultValue: getValues('body') || defaultValue,
    registerProps: registerProps,
    children: children
  });
}

var css_248z$c = "::-webkit-scrollbar-thumb {\n  outline: 1px solid var(--verySoftPeanut);\n  border-radius: 3px;\n  background-color: var(--verySoftPeanut);\n}\n\n::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n  cursor: pointer !important;\n}\n\n.smartEmailModal-module__container__7uZPI {\n  background-color: white;\n  overflow-y: auto;\n  padding: 24px 64px;\n}\n\n.smartEmailModal-module__container_ast__36cdH {\n  background-color: white;\n  overflow-y: overlay;\n  height: 64vh;\n  max-height: 600px;\n  position: relative;\n  flex-grow: 1;\n  width: 690px;\n}\n\n.smartEmailModal-module__modal_body_container__Q97vS {\n  display: flex;\n}\n\n.smartEmailModal-module__modal_body__LULlE {\n  display: flex;\n  flex-direction: column;\n}\n\n.smartEmailModal-module__editor__container__-kQbj {\n  background-color: white;\n  border-radius: 4px;\n  position: relative;\n}\n\n.smartEmailModal-module__editor__container__-kQbj > div > section {\n  align-items: center;\n}\n\n.smartEmailModal-module__editor__container__dragged__e5f9r {\n  position: absolute;\n  z-index: 10;\n  width: 660px;\n  border: 1px dashed #464f57;\n  padding: 20px;\n  margin: 10px;\n  text-align: center;\n  color: #464f57;\n  background-color: #c5d1dd66;\n  opacity: 0.5;\n  display: flex;\n  align-content: center;\n  justify-content: center;\n  align-items: center;\n  font-size: 40px;\n  font-weight: 700;\n}\n\n.smartEmailModal-module__editor__container__dragged__active__EEKyO {\n  border: 1px dashed #63ba00;\n  background-color: #d9f0c066;\n  color: #63ba00;\n}\n\n.smartEmailModal-module__editor__container_ast__ibq8J {\n  overflow-y: auto;\n  overflow-x: hidden;\n  height: 100%;\n}\n\n.smartEmailModal-module__subject__container__a489m {\n  margin: 6px 0;\n}\n\n.smartEmailModal-module__subject__container_ast__dSQt9 {\n  display: flex;\n  margin: 16px 0 8px 0;\n  background: white;\n  border: 1px solid #94a5b4;\n  border-radius: 4px;\n}\n\n.smartEmailModal-module__to__container__qEHYi {\n  display: flex;\n  align-items: center;\n  margin-bottom: 8px;\n}\n\n.smartEmailModal-module__to__input__container__v7qiR {\n  width: 100%;\n  margin-left: 16px;\n}\n\n.smartEmailModal-module__tag__RSjHG {\n  width: 44px;\n}\n\n.smartEmailModal-module__actions__container__mO4Ne {\n  width: calc(100% - 24px);\n  border-top: 1px solid var(--lightestBloobirds);\n  height: 40px;\n  display: flex;\n  padding: 0 12px;\n}\n\n.smartEmailModal-module__attachments__container__MupSe {\n  display: flex;\n  margin: 2px 16px 0;\n  padding: 8px 0;\n  border-top: 1px solid var(--lightestBloobirds);\n}\n\n.smartEmailModal-module__errors_container__J8dVR {\n  width: 100%;\n  margin: 8px 20px;\n}\n\n.smartEmailModal-module__header__container__95maA {\n  width: 100%;\n  height: 56px;\n  display: flex;\n  align-items: center;\n  padding: 0 24px;\n  box-sizing: border-box;\n  background-color: var(--veryLightBloobirds);\n}\n\n.smartEmailModal-module__header__info__PNvoQ {\n  display: flex;\n  align-items: center;\n  flex-grow: 1;\n  max-width: 95%;\n}\n\n.smartEmailModal-module__header__info__PNvoQ button {\n  margin-right: 8px;\n}\n\n.smartEmailModal-module__header_companyName__M3hr0 {\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  padding-right: 12px;\n  margin-right: 12px;\n  height: 24px;\n  border-right: 1px solid var(--verySoftBloobirds);\n}\n\n.smartEmailModal-module_footer__dfcDQ {\n  background-color: var(--white);\n  width: 690px;\n}\n\n.smartEmailModal-module_footerActions__ZMZu0 {\n  background-color: var(--white);\n  align-items: center;\n  display: flex;\n  justify-content: space-between;\n  padding: 0 16px;\n  height: 80px;\n}\n\n.smartEmailModal-module_footerButtons__GNAy9 {\n  display: flex;\n  gap: 9px;\n}\n\n.smartEmailModal-module_inputControls__ip4b6 {\n  margin-left: auto;\n}\n\n.smartEmailModal-module_emailSelector__FJEM5 {\n  max-width: 85%;\n}\n\n.smartEmailModal-module_emailSelector__FJEM5 input {\n  box-shadow: none;\n  border: none;\n}\n\n.smartEmailModal-module_disabledOverlay__eBlAy {\n  position: absolute;\n  background-color: white;\n  opacity: 0.35;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n}\n\n.smartEmailModal-module_modal_email_container__clgdm {\n  display: flex;\n  width: 100%;\n  --artdeco-reset-forms-input-padding: initial;\n  --artdeco-reset-form-position-relative: initial;\n  --artdeco-reset-form-vertical-align-middle: initial;\n  --artdeco-reset-form-display-block: initial;\n  --artdeco-reset-form-black-90: initial;\n  --artdeco-reset-form-label-margin: initial;\n  --artdeco-reset-form-label-opacity: initial;\n  --artdeco-reset-form-webkit-appearance-textfield: initial;\n  --artdeco-reset-form-webkit-appearance-none: initial;\n  --artdeco-reset-form-height-auto: initial;\n  --artdeco-reset-form-padding-top-point-seven-rem: initial;\n  --artdeco-reset-form-rc-pointer-events: initial;\n  --artdeco-reset-form-rc-opacity: initial;\n  --artdeco-reset-form-rc-margin: initial;\n  --artdeco-reset-form-rc-position: initial;\n  --artdeco-reset-form-rc-before-after-content: initial;\n  --artdeco-reset-checkbox-rc-after-content: initial;\n  --artdeco-reset-form-rc-label-display-block: initial;\n  --artdeco-reset-form-rc-label-line-height-2-rem: initial;\n  --artdeco-reset-form-rc-label-margin-bottom-zero: initial;\n  --artdeco-reset-form-rc-label-padding-zero: initial;\n  --artdeco-reset-form-rc-label-position-relative: initial;\n  --artdeco-reset-form-rc-label-padding-left-2point8-rem: initial;\n  --artdeco-reset-forms-input-transition-duration: initial;\n  --artdeco-reset-forms-input-transition-property: initial;\n  --artdeco-reset-forms-input-box-shadow: initial;\n  --artdeco-reset-forms-input-border-radius: 4px;\n  --artdeco-reset-forms-input-border: initial;\n  --artdeco-reset-forms-input-width: initial;\n  --artdeco-reset-forms-input-height: initial;\n  --artdeco-reset-forms-input-box-sizing: border-box;\n  --artdeco-reset-forms-input-background-color: initial;\n  --artdeco-reset-forms-input-color: initial;\n  --artdeco-reset-forms-input-placeholder-color: var(--softPeanut);\n  --artdeco-reset-forms-input-blue: initial;\n  --artdeco-reset-forms-input-focus-box-shadow: initial;\n  --artdeco-reset-forms-input-disabled-hover-border-color: initial;\n  --artdeco-reset-forms-input-disabled-opacity: initial;\n  --artdeco-reset-forms-input-error: initial;\n  --artdeco-reset-forms-font-weight: initial;\n  --artdeco-reset-forms-font-size: initial;\n  --artdeco-reset-forms-line-height: initial;\n  --artdeco-reset-forms-select-appearance-none: initial;\n  --artdeco-reset-forms-select-box-shadow-none: initial;\n  --artdeco-reset-forms-select-outline-zero: initial;\n  --artdeco-reset-forms-select-height-3point2-rem: initial;\n  --artdeco-reset-forms-select-background-transparent: initial;\n  --artdeco-reset-forms-select-position-relative: initial;\n  --artdeco-reset-forms-select-zindex-two: initial;\n  --artdeco-reset-forms-select-background-image: initial;\n  --artdeco-reset-forms-select-border-box: initial;\n  --artdeco-reset-forms-select-border-zero: initial;\n  --artdeco-reset-forms-select-width-100-percent: initial;\n  --artdeco-reset-forms-select-border-radius-point2rem: initial;\n  --artdeco-reset-forms-select-border: initial;\n  --artdeco-reset-forms-select-padding: initial;\n  --artdeco-reset-forms-select-transition: initial;\n  --artdeco-reset-forms-select-disabled-opacity: initial;\n  --artdeco-reset-forms-select-hover-border-color: initial;\n  --artdeco-reset-forms-select-focus-border-color: initial;\n  --artdeco-reset-forms-select-focus-box-shadow: initial;\n  --artdeco-reset-base-margin-zero: initial;\n  --artdeco-reset-base-padding-zero: initial;\n  --artdeco-reset-base-border-zero: initial;\n  --artdeco-reset-base-font-size-hundred-percent: initial;\n  --artdeco-reset-base-font-weight-bold: initial;\n  --artdeco-reset-base-font-style-italic: initial;\n  --artdeco-reset-base-outline-zero: initial;\n  --artdeco-reset-base-outline-none: initial;\n  --artdeco-reset-base-line-height-one: initial;\n  --artdeco-reset-base-display-block: initial;\n  --artdeco-reset-base-list-style-none: initial;\n  --artdeco-reset-base-quotes-none: initial;\n  --artdeco-reset-base-vertical-align-baseline: initial;\n  --artdeco-reset-base-vertical-align-middle: initial;\n  --artdeco-reset-base-background-transparent: initial;\n  --artdeco-reset-base-opacity-zero: initial;\n  --artdeco-reset-base-top-zero: initial;\n  --artdeco-reset-base-position-absolute: initial;\n  --artdeco-reset-base-text-decoration-none: initial;\n  --artdeco-reset-base-text-decoration-line-through: initial;\n  --artdeco-reset-base-border-collapse-collapse: initial;\n  --artdeco-reset-base-get-color-black: initial;\n  --artdeco-reset-base-background-color-ff9: initial;\n  --artdeco-reset-base-border-spacing-zero: initial;\n  --artdeco-reset-base-cursor-help: initial;\n  --artdeco-reset-base-content-none: initial;\n  --artdeco-reset-base-left-minus-hundred-px: initial;\n  --artdeco-reset-base-border-thickness-1-px: initial;\n  --artdeco-reset-base-border-style-dotted: initial;\n}\n\n.smartEmailModal-module_modal_email_container__clgdm * {\n  box-sizing: border-box;\n}\n\n/* Linkedin overrides */\n.smartEmailModal-module_modal_email_container__clgdm input {\n  margin: 0 !important;\n  box-shadow: none !important;\n  border: none !important;\n  width: 100%;\n}\n\n.smartEmailModal-module_modal_email_container__clgdm input::-moz-placeholder {\n  color: transparent;\n}\n\n.smartEmailModal-module_modal_email_container__clgdm input::placeholder {\n  color: transparent;\n}\n\n.smartEmailModal-module_modal_email_container__clgdm input:focus {\n  outline: none !important;\n  background-color: transparent;\n}\n\n.smartEmailModal-module_modal_email_container__clgdm label {\n  margin: 0 !important;\n}\n\n.smartEmailModal-module_show_preview_wrapper__lLRME {\n  width: 100%;\n  height: inherit;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  padding-right: 4px;\n}\n\n.smartEmailModal-module_show_preview_wrapper__lLRME button {\n  padding-left: 6px;\n  padding-right: 4px;\n}\n\n.smartEmailModal-module__header_icons_preview__-zqil {\n  width: 100%;\n  display: flex;\n  justify-content: flex-end;\n}\n\n.smartEmailModal-module__header_callout_preview__IUZ-r {\n  height: 40px;\n}\n\n.smartEmailModal-module_container_email__f1Xap {\n  width: -moz-fit-content;\n  width: fit-content;\n}\n\n.smartEmailModal-module_html_editor__HEbWp div[role='toolbar'] {\n  height: 24px;\n  padding-left: 8px;\n}\n\n.smartEmailModal-module_sendButton__hiY-- {\n  min-width: 100px;\n  justify-content: center;\n}\n\n.smartEmailModal-module_scheduleButton__xIsBf {\n  min-width: 150px;\n  justify-content: center;\n}\n";
var styles$c = {"_container":"smartEmailModal-module__container__7uZPI","_container_ast":"smartEmailModal-module__container_ast__36cdH","_modal_body_container":"smartEmailModal-module__modal_body_container__Q97vS","_modal_body":"smartEmailModal-module__modal_body__LULlE","_editor__container":"smartEmailModal-module__editor__container__-kQbj","_editor__container__dragged":"smartEmailModal-module__editor__container__dragged__e5f9r","_editor__container__dragged__active":"smartEmailModal-module__editor__container__dragged__active__EEKyO","_editor__container_ast":"smartEmailModal-module__editor__container_ast__ibq8J","_subject__container":"smartEmailModal-module__subject__container__a489m","_subject__container_ast":"smartEmailModal-module__subject__container_ast__dSQt9","_to__container":"smartEmailModal-module__to__container__qEHYi","_to__input__container":"smartEmailModal-module__to__input__container__v7qiR","_tag":"smartEmailModal-module__tag__RSjHG","_actions__container":"smartEmailModal-module__actions__container__mO4Ne","_attachments__container":"smartEmailModal-module__attachments__container__MupSe","_errors_container":"smartEmailModal-module__errors_container__J8dVR","_header__container":"smartEmailModal-module__header__container__95maA","_header__info":"smartEmailModal-module__header__info__PNvoQ","_header_companyName":"smartEmailModal-module__header_companyName__M3hr0","footer":"smartEmailModal-module_footer__dfcDQ","footerActions":"smartEmailModal-module_footerActions__ZMZu0","footerButtons":"smartEmailModal-module_footerButtons__GNAy9","inputControls":"smartEmailModal-module_inputControls__ip4b6","emailSelector":"smartEmailModal-module_emailSelector__FJEM5","disabledOverlay":"smartEmailModal-module_disabledOverlay__eBlAy","modal_email_container":"smartEmailModal-module_modal_email_container__clgdm","show_preview_wrapper":"smartEmailModal-module_show_preview_wrapper__lLRME","_header_icons_preview":"smartEmailModal-module__header_icons_preview__-zqil","_header_callout_preview":"smartEmailModal-module__header_callout_preview__IUZ-r","container_email":"smartEmailModal-module_container_email__f1Xap","html_editor":"smartEmailModal-module_html_editor__HEbWp","sendButton":"smartEmailModal-module_sendButton__hiY--","scheduleButton":"smartEmailModal-module_scheduleButton__xIsBf"};
styleInject(css_248z$c);

function _typeof$d(obj) { "@babel/helpers - typeof"; return _typeof$d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$d(obj); }
function _defineProperty$d(obj, key, value) { key = _toPropertyKey$d(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$d(arg) { var key = _toPrimitive$d(arg, "string"); return _typeof$d(key) === "symbol" ? key : String(key); }
function _toPrimitive$d(input, hint) { if (_typeof$d(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$d(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime$4() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$4 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$d(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$c(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$4(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray$a(arr, i) { return _arrayWithHoles$a(arr) || _iterableToArrayLimit$a(arr, i) || _unsupportedIterableToArray$c(arr, i) || _nonIterableRest$a(); }
function _nonIterableRest$a() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$c(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$c(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$c(o, minLen); }
function _arrayLikeToArray$c(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$a(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$a(arr) { if (Array.isArray(arr)) return arr; }
function FakeDropzone(_ref) {
  var _ref3, _document$getElementB;
  var editor = _ref.editor;
  var _useState = useState(false),
    _useState2 = _slicedToArray$a(_useState, 2),
    dragging = _useState2[0],
    setDragging = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$a(_useState3, 2),
    isDropzoneDragged = _useState4[0],
    setDropzoneDragged = _useState4[1];
  var _useDebounce = useDebounce(dragging, 50),
    _useDebounce2 = _slicedToArray$a(_useDebounce, 1),
    delayedDragging = _useDebounce2[0];
  useEffect(function () {
    window.addEventListener('dragover', function (e) {
      e.preventDefault();
      setDragging(true);
    }, false);
    window.addEventListener('dragleave', function (e) {
      e.preventDefault();
      setDragging(false);
    }, false);
    window.addEventListener('drop', function (e) {
      e.preventDefault();
      setDragging(false);
    }, false);
    return function () {
      window.removeEventListener('dragover', function () {});
      window.removeEventListener('dragleave', function () {});
      window.removeEventListener('drop', function () {});
    };
  }, []);
  var dropImage = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator$4( /*#__PURE__*/_regeneratorRuntime$4().mark(function _callee(e) {
      var files, _iterator, _step, file, _file$type$split, _file$type$split2, mime, formData, response;
      return _regeneratorRuntime$4().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            e.stopPropagation();
            e.preventDefault();
            setDragging(false);
            files = e.dataTransfer.files; //@ts-ignore
            _iterator = _createForOfIteratorHelper$1(files);
            _context.prev = 5;
            _iterator.s();
          case 7:
            if ((_step = _iterator.n()).done) {
              _context.next = 20;
              break;
            }
            file = _step.value;
            _file$type$split = file.type.split('/'), _file$type$split2 = _slicedToArray$a(_file$type$split, 1), mime = _file$type$split2[0];
            if (!(mime === 'image')) {
              _context.next = 18;
              break;
            }
            formData = new FormData();
            formData.append('file', file);
            formData.append('visible', 'true');
            _context.next = 16;
            return api.post('/messaging/mediaFiles', formData, {
              validateStatus: function validateStatus() {
                return true;
              },
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
          case 16:
            response = _context.sent;
            if (response.status === 201) {
              insertImage(editor, response.data.url);
            }
          case 18:
            _context.next = 7;
            break;
          case 20:
            _context.next = 25;
            break;
          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](5);
            _iterator.e(_context.t0);
          case 25:
            _context.prev = 25;
            _iterator.f();
            return _context.finish(25);
          case 28:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[5, 22, 25, 28]]);
    }));
    return function dropImage(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  if (!delayedDragging) {
    return null;
  }
  return /*#__PURE__*/jsx("div", {
    id: "dropzone",
    style: {
      height: (_ref3 = ((_document$getElementB = document.getElementById('emailBody')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.offsetHeight) - 90) !== null && _ref3 !== void 0 ? _ref3 : 200
    },
    className: clsx(styles$c._editor__container__dragged, _defineProperty$d({}, styles$c._editor__container__dragged__active, isDropzoneDragged)),
    onDragLeave: function onDragLeave() {
      setDropzoneDragged(false);
    },
    onDragOver: function onDragOver() {
      setDropzoneDragged(true);
    },
    onDrop: dropImage,
    children: "Drop your images here"
  });
}

function _toConsumableArray$5(arr) { return _arrayWithoutHoles$5(arr) || _iterableToArray$5(arr) || _unsupportedIterableToArray$b(arr) || _nonIterableSpread$5(); }
function _nonIterableSpread$5() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$b(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$b(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$b(o, minLen); }
function _iterableToArray$5(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$5(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$b(arr); }
function _arrayLikeToArray$b(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var getIconFromType = function getIconFromType(type) {
  switch (type) {
    /*case 'pdf':
      return 'pdf';*/
    default:
      return 'link';
  }
};
var getEmojiIcon = function getEmojiIcon(type) {
  switch (type) {
    default:
      return '🔗  ';
  }
};
var prepareBodyToBeSerialized = function prepareBodyToBeSerialized(attachedLinks, body) {
  if ((attachedLinks === null || attachedLinks === void 0 ? void 0 : attachedLinks.length) > 0) {
    return [].concat(_toConsumableArray$5(body), _toConsumableArray$5(attachedLinks.map(function (file) {
      return {
        type: 'p',
        children: [{
          text: getEmojiIcon(file.type)
        }, {
          type: 'a',
          url: file.link,
          children: [{
            text: file.title,
            bold: true,
            underline: true
          }]
        }, {
          text: ''
        }]
      };
    })));
  } else {
    return body;
  }
};
var getChemistryColor = function getChemistryColor(chemistry) {
  if (chemistry >= 75) {
    return 'extraCall';
  } else if (chemistry < 50) {
    return 'softBanana';
  } else {
    return 'banana';
  }
};
var getCompanyFieldsByType = function getCompanyFieldsByType(type) {
  return type === 'Account' ? [SimilarDealsFields.CONTACT, SimilarDealsFields.ACCOUNT_EXECUTIVE, SimilarDealsFields.CLOSE_DATE, SimilarDealsFields.AMOUNT] : [SimilarDealsFields.CONTACT, SimilarDealsFields.ACCOUNT_EXECUTIVE, SimilarDealsFields.CLIENT_DATE];
};
var getIconName = function getIconName(label) {
  switch (label) {
    case SimilarDealsFieldsLabels.contact:
    case SimilarDealsFieldsLabels.accountExecutive:
      return 'person';
    case SimilarDealsFieldsLabels.clientDate:
    case SimilarDealsFieldsLabels.closeDate:
      return 'fileOpportunity';
    default:
      return 'check';
  }
};

var css_248z$b = ".attachmentLink-module__attachment_box__GndpX {\n  width: -moz-fit-content;\n  width: fit-content;\n  min-width: 100px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 14px;\n  border-radius: 4px;\n  background-color: var(--lightestGray);\n  margin-right: 8px;\n  margin-bottom: 7px;\n}\n\n.attachmentLink-module__attachment_box__GndpX:hover {\n  cursor: pointer;\n}\n";
var styles$b = {"_attachment_box":"attachmentLink-module__attachment_box__GndpX"};
styleInject(css_248z$b);

function _slicedToArray$9(arr, i) { return _arrayWithHoles$9(arr) || _iterableToArrayLimit$9(arr, i) || _unsupportedIterableToArray$a(arr, i) || _nonIterableRest$9(); }
function _nonIterableRest$9() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$a(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$a(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$a(o, minLen); }
function _arrayLikeToArray$a(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$9(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$9(arr) { if (Array.isArray(arr)) return arr; }
var AttachmentLink = function AttachmentLink(_ref) {
  var file = _ref.file,
    onDelete = _ref.onDelete;
  var link = file.link,
    title = file.title,
    type = file.type;
  var _useState = useState(false),
    _useState2 = _slicedToArray$9(_useState, 2),
    isHover = _useState2[0],
    setIsHover = _useState2[1];
  return /*#__PURE__*/jsx(Tooltip, {
    title: link,
    position: "top",
    children: /*#__PURE__*/jsxs("div", {
      className: styles$b._attachment_box,
      onMouseEnter: function onMouseEnter() {
        return setIsHover(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setIsHover(false);
      },
      children: [/*#__PURE__*/jsx(Icon, {
        name: getIconFromType(type),
        size: 18,
        color: isHover ? 'bloobirds' : 'softPeanut'
      }), /*#__PURE__*/jsx("div", {
        onClick: function onClick() {
          return window.open(addHttpIfNeeded(link), '_blank');
        },
        children: /*#__PURE__*/jsx(Text, {
          color: isHover ? 'bloobirds' : 'softPeanut',
          decoration: isHover ? 'underline' : 'none',
          ellipsis: 20,
          size: "xs",
          children: title
        })
      }), /*#__PURE__*/jsx(IconButton, {
        name: "cross",
        onClick: onDelete,
        size: 18,
        color: isHover ? 'softTomato' : 'lightestGray'
      })]
    })
  });
};

var css_248z$a = ".attachmentLinkList-module_list__pcbz0 {\n  display: -webkit-inline-box;\n  padding: 7px;\n  gap: 12px;\n  border-top: 1px solid var(--lightestBloobirds);\n  border-bottom: 1px solid var(--lightestBloobirds);\n  min-width: 0;\n  overflow: scroll;\n  max-width: 690px;\n  width: 100%;\n}\n";
var styles$a = {"list":"attachmentLinkList-module_list__pcbz0"};
styleInject(css_248z$a);

function _typeof$c(obj) { "@babel/helpers - typeof"; return _typeof$c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$c(obj); }
function _defineProperty$c(obj, key, value) { key = _toPropertyKey$c(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$c(arg) { var key = _toPrimitive$c(arg, "string"); return _typeof$c(key) === "symbol" ? key : String(key); }
function _toPrimitive$c(input, hint) { if (_typeof$c(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$c(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function AttachmentLinkList(_ref) {
  var files = _ref.files,
    onDelete = _ref.onDelete;
  var listClasses = clsx(styles$a.list, _defineProperty$c({}, styles$a.wrappedList, (files === null || files === void 0 ? void 0 : files.length) > 5));
  return /*#__PURE__*/jsx("div", {
    className: listClasses,
    role: "list",
    children: files.map(function (file) {
      return /*#__PURE__*/jsx(AttachmentLink, {
        file: file,
        onDelete: typeof onDelete === 'function' ? function () {
          return onDelete(file);
        } : null
      }, file.title);
    })
  });
}

var css_248z$9 = ".dayCalendar-module__container__RDs0W {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n  margin: auto;\n  position: relative;\n}\n\n.dayCalendar-module__filters_wrapper__mffpK {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 8px  ;\n  justify-content: flex-start;\n  padding: 20px 24px 0 24px;\n}\n\n.dayCalendar-module__calendar_wrapper__SGksD {\n  display: flex;\n  flex-direction: column;\n  padding: 10px 24px;\n  overflow: scroll;\n}\n\n.dayCalendar-module__calendar_wrapper__SGksD > div:first-child {\n  width: 100%;\n  height: 100%;\n  max-height: 56vh;\n}\n\n.dayCalendar-module__calendar_wrapper__SGksD > div > div:last-child > div > div > div:last-child > div {\n  border-right: none;\n}\n\n.dayCalendar-module__main_filters_container__Du6C7 {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n}\n\n.dayCalendar-module__main_filters_container__Du6C7 > div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.dayCalendar-module__left_main_filters__xhjkk > div {\n  margin-left: 3px;\n}\n\n.dayCalendar-module__day_button__zocnc {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1px;\n}\n\n.dayCalendar-module__day_button__zocnc:hover {\n  background-color: var(--veryLightBloobirds);\n}\n\n.dayCalendar-module__today_button__u3re9 {\n  margin-right: 4px;\n  font-size: 12px;\n  font-weight: 300;\n  padding: 3px 5px;\n}\n\n.dayCalendar-module__date_button__kgl4f {\n  cursor: pointer;\n}\n\n.dayCalendar-module__event_type__GF9Bw {\n  padding: 3px 8px;\n  border: 1px solid var(--bloobirds);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n}\n\n.dayCalendar-module__secondary_filters_container__LJ-H- {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n}\n\n.dayCalendar-module__secondary_filters_right__K7SUi {\n  display: flex;\n  align-items: center;\n  gap: 8px\n}\n\n.dayCalendar-module__calendar_select__GmyPf {\n  display: flex;\n  align-items: center;\n}\n\n.dayCalendar-module__selector_anchor__o2QNn {\n  cursor: pointer;\n  display: flex;\n  gap: 2px;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.dayCalendar-module__tip_button__Ec2VF {\n  border: 1px solid var(--lightPurple) !important;\n  color: var(--purple);\n}\n\n.dayCalendar-module__tip_button__Ec2VF svg > path {\n  fill: var(--purple);\n}\n\n.dayCalendar-module__slots_button__ea71T{\n  border: none !important;\n}\n\n.dayCalendar-module__slots_button__ea71T svg {\n  width: 27px;\n  height: 27px;\n  margin-bottom: -9px;\n  margin-right: -8px !important;\n}\n\n.dayCalendar-module__slots_button__ea71T svg > path {\n  fill: var(--bloobirds);\n}\n\n.dayCalendar-module__slots_button_active__vrfN8{\n  border: none !important;\n  color: var(--white)!important;\n  background-color: var(--bloobirds)!important;\n}\n\n.dayCalendar-module__slots_button_active__vrfN8 svg > path {\n  fill: var(--white);\n}\n\n.dayCalendar-module_loaderWrapper__j7jnN{\n  translate: 186px 280px;\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n}\n";
var styles$9 = {"_container":"dayCalendar-module__container__RDs0W","_filters_wrapper":"dayCalendar-module__filters_wrapper__mffpK","_calendar_wrapper":"dayCalendar-module__calendar_wrapper__SGksD","_main_filters_container":"dayCalendar-module__main_filters_container__Du6C7","_left_main_filters":"dayCalendar-module__left_main_filters__xhjkk","_day_button":"dayCalendar-module__day_button__zocnc","_today_button":"dayCalendar-module__today_button__u3re9","_date_button":"dayCalendar-module__date_button__kgl4f","_event_type":"dayCalendar-module__event_type__GF9Bw","_secondary_filters_container":"dayCalendar-module__secondary_filters_container__LJ-H-","_secondary_filters_right":"dayCalendar-module__secondary_filters_right__K7SUi","_calendar_select":"dayCalendar-module__calendar_select__GmyPf","_selector_anchor":"dayCalendar-module__selector_anchor__o2QNn","_tip_button":"dayCalendar-module__tip_button__Ec2VF","_slots_button":"dayCalendar-module__slots_button__ea71T","_slots_button_active":"dayCalendar-module__slots_button_active__vrfN8","loaderWrapper":"dayCalendar-module_loaderWrapper__j7jnN"};
styleInject(css_248z$9);

function _typeof$b(obj) { "@babel/helpers - typeof"; return _typeof$b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$b(obj); }
function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$8(Object(source), !0).forEach(function (key) { _defineProperty$b(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$b(obj, key, value) { key = _toPropertyKey$b(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$b(arg) { var key = _toPrimitive$b(arg, "string"); return _typeof$b(key) === "symbol" ? key : String(key); }
function _toPrimitive$b(input, hint) { if (_typeof$b(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$b(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray$4(arr) { return _arrayWithoutHoles$4(arr) || _iterableToArray$4(arr) || _unsupportedIterableToArray$9(arr) || _nonIterableSpread$4(); }
function _nonIterableSpread$4() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray$4(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$4(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$9(arr); }
function _slicedToArray$8(arr, i) { return _arrayWithHoles$8(arr) || _iterableToArrayLimit$8(arr, i) || _unsupportedIterableToArray$9(arr, i) || _nonIterableRest$8(); }
function _nonIterableRest$8() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$9(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$9(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$9(o, minLen); }
function _arrayLikeToArray$9(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$8(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$8(arr) { if (Array.isArray(arr)) return arr; }
var getSlotsNodePosition = function getSlotsNodePosition(bodyEditor) {
  var nodesArray = Array.from(Node.elements(bodyEditor));
  //@ts-ignore
  var slotsNode = nodesArray.find(function (node) {
    var _node$;
    return ((_node$ = node[0]) === null || _node$ === void 0 ? void 0 : _node$.type) === ELEMENT_SLOTS_FORM;
  });
  return {
    slotsNode: slotsNode === null || slotsNode === void 0 ? void 0 : slotsNode[0],
    slotsNodePath: slotsNode === null || slotsNode === void 0 ? void 0 : slotsNode[1]
  };
};
var DayCalendar = function DayCalendar(_ref) {
  var _connections$list, _connections$list2;
  var bodyEditor = _ref.bodyEditor,
    connections = _ref.connections,
    mutateConnections = _ref.mutateConnections,
    hasCalendarSlotsEnabled = _ref.hasCalendarSlotsEnabled,
    slotsData = _ref.slotsData,
    setSlotsData = _ref.setSlotsData,
    handleSlotClick = _ref.handleSlotClick;
  var _useCalendar = useCalendar(),
    date = _useCalendar.date,
    setDate = _useCalendar.setDate,
    eventsPerDay = _useCalendar.eventsPerDay,
    eventsTypeSelected = _useCalendar.eventsTypeSelected,
    setEventTypesSelected = _useCalendar.setEventTypesSelected,
    mutateCalendars = _useCalendar.mutateCalendars,
    selectedTimezone = _useCalendar.selectedTimezone,
    setSelectedTimezone = _useCalendar.setSelectedTimezone,
    resetDate = _useCalendar.resetDate,
    loading = _useCalendar.loading;
  var _useState = useState(false),
    _useState2 = _slicedToArray$8(_useState, 2),
    changeTimezoneModalVisible = _useState2[0],
    setChangeTimezoneModalVisible = _useState2[1];
  var _useVisible = useVisible(false),
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible,
    ref = _useVisible.ref;
  var isoDate = useGetI18nSpacetime(date, selectedTimezone || getUserTimeZone()).format('iso-short');
  var today = isToday(spacetime(date).toNativeDate(), selectedTimezone || getUserTimeZone());
  var notConnected = eventsTypeSelected === 'nylas' && (connections === null || connections === void 0 ? void 0 : (_connections$list = connections.list) === null || _connections$list === void 0 ? void 0 : _connections$list.length) === 0;
  var _useSmartEmailModal = useSmartEmailModal(),
    company = _useSmartEmailModal.company,
    lead = _useSmartEmailModal.lead,
    opportunity = _useSmartEmailModal.opportunity;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'dayCalendar'
    }),
    t = _useTranslation.t;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'dates'
    }),
    datesT = _useTranslation2.t;
  function handleSlots(slots, onClickCallback) {
    var isDelete = !slots;
    var createRawHTMLBlock = function createRawHTMLBlock(editor, html) {
      var type = getPluginType(editor, ELEMENT_SLOTS_FORM);
      return {
        onClick: function onClick() {
          var _slots$props;
          handleSlotClick();
          onClickCallback(slots === null || slots === void 0 ? void 0 : (_slots$props = slots.props) === null || _slots$props === void 0 ? void 0 : _slots$props.liveEvents);
          mixpanel.track(MIXPANEL_EVENTS.EDIT_CALENDAR_SLOTS);
        },
        html: html,
        type: type,
        children: [{
          text: ''
        }]
      };
    };
    if (bodyEditor) {
      var _getSlotsNodePosition = getSlotsNodePosition(bodyEditor),
        slotsNodePath = _getSlotsNodePosition.slotsNodePath,
        slotsNode = _getSlotsNodePosition.slotsNode;
      var isEditing = !!slotsNode;
      if (isDelete || isEditing) {
        removeNodes(bodyEditor, {
          at: {
            path: [].concat(_toConsumableArray$4(slotsNodePath), [0]),
            offset: 0
          }
        });
      }
      if (!isDelete) {
        insertNodes(bodyEditor, createRawHTMLBlock(bodyEditor, ReactDOMServer.renderToString(slots)), {
          at: isEditing ? {
            path: [slotsNodePath[0] - 1, 0],
            offset: 0
          } : bodyEditor.selection
        });
      }
    }
    setSlotsData(function (prevSlotsData) {
      return _objectSpread$8(_objectSpread$8({}, prevSlotsData), {}, {
        calendarSlotsVisible: false
      });
    });
    setDate(new Date());
  }
  useEffect(function () {
    removeScrollOfBox();
    return recoverScrollOfBox;
  }, []);
  return /*#__PURE__*/jsxs("div", {
    className: styles$9._container,
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$9._filters_wrapper,
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$9._main_filters_container,
        children: [/*#__PURE__*/jsxs("div", {
          className: styles$9._left_main_filters,
          children: [/*#__PURE__*/jsx(Button, {
            onClick: function onClick() {
              return setDate(function (date) {
                return spacetime(date).subtract(1, 'day').toNativeDate();
              });
            },
            variant: "clear",
            size: "small",
            className: styles$9._day_button,
            children: /*#__PURE__*/jsx(Icon, {
              name: "chevronLeft",
              size: 15
            })
          }), /*#__PURE__*/jsx(Button, {
            onClick: function onClick() {
              return setDate(function (date) {
                return spacetime(date).add(1, 'day').toNativeDate();
              });
            },
            variant: "clear",
            size: "small",
            className: styles$9._day_button,
            children: /*#__PURE__*/jsx(Icon, {
              name: "chevronRight",
              size: 15
            })
          }), /*#__PURE__*/jsx(DatePicker, {
            withTimePicker: false,
            value: date,
            openDefaultValue: date,
            onChange: function onChange(date) {
              return setDate(date);
            },
            dropDownRef: ref,
            visible: visible,
            setVisible: setVisible,
            dropdownProps: {
              anchor: /*#__PURE__*/jsx("span", {
                onClick: function onClick() {
                  return setVisible(true);
                },
                className: styles$9._date_button,
                children: /*#__PURE__*/jsx(Text, {
                  size: "m",
                  color: today ? 'bloobirds' : 'peanut',
                  weight: "regular",
                  children: (today ? t('today') : '') + useGetI18nSpacetime(date).format(datesT('shortDayMonth'))
                })
              })
            }
          })]
        }), /*#__PURE__*/jsxs("div", {
          children: [!today && /*#__PURE__*/jsx(Button, {
            variant: "secondary",
            size: "small",
            uppercase: false,
            className: styles$9._today_button,
            onClick: function onClick() {
              return resetDate();
            },
            children: t('today')
          }), /*#__PURE__*/jsx("div", {
            className: styles$9._event_type,
            style: {
              backgroundColor: eventsTypeSelected === 'bloobirds' ? 'var(--bloobirds)' : 'var(--white)',
              borderTopLeftRadius: '4px',
              borderBottomLeftRadius: '4px'
            },
            onClick: function onClick() {
              return setEventTypesSelected('bloobirds');
            },
            children: /*#__PURE__*/jsx(Icon, {
              name: "bloobirds",
              color: eventsTypeSelected === 'nylas' ? 'bloobirds' : 'white',
              size: 16
            })
          }), /*#__PURE__*/jsx("div", {
            className: styles$9._event_type,
            style: {
              backgroundColor: eventsTypeSelected === 'nylas' ? 'var(--bloobirds)' : 'var(--white)',
              borderTopRightRadius: '4px',
              borderBottomRightRadius: '4px'
            },
            onClick: function onClick() {
              return setEventTypesSelected('nylas');
            },
            children: /*#__PURE__*/jsx(Icon, {
              name: "calendar",
              size: 16,
              color: eventsTypeSelected === 'nylas' ? 'white' : 'bloobirds'
            })
          })]
        })]
      }), /*#__PURE__*/jsxs("div", {
        className: styles$9._secondary_filters_container,
        children: [/*#__PURE__*/jsxs("div", {
          className: styles$9._secondary_filters_right,
          children: [/*#__PURE__*/jsx(IconButton, {
            name: "timezonesAlter",
            size: 18,
            color: "bloobirds",
            onClick: function onClick() {
              return setChangeTimezoneModalVisible(true);
            }
          }), /*#__PURE__*/jsx("div", {
            className: styles$9._calendar_select,
            children: eventsTypeSelected === 'nylas' ? /*#__PURE__*/jsx(CalendarsSelector, {
              connections: connections,
              disabled: eventsTypeSelected === 'nylas' && (connections === null || connections === void 0 ? void 0 : (_connections$list2 = connections.list) === null || _connections$list2 === void 0 ? void 0 : _connections$list2.length) === 0,
              anchor: CalendarSelectorAnchor
            }) : /*#__PURE__*/jsx(BloobirdsCalendarsSelector, {
              anchor: CalendarSelectorAnchor
            })
          }), hasCalendarSlotsEnabled && /*#__PURE__*/jsx(Button, {
            size: "small",
            color: "bloobirds",
            variant: "secondary",
            iconLeft: "meetingSlots",
            uppercase: false,
            className: clsx(styles$9._slots_button, _defineProperty$b({}, styles$9._slots_button_active, slotsData.calendarSlotsVisible)),
            onClick: function onClick() {
              setSlotsData(function (prevSlotsData) {
                return _objectSpread$8(_objectSpread$8({}, prevSlotsData), {}, {
                  calendarSlotsVisible: true
                });
              });
            },
            children: t('shareSlots')
          }), loading && /*#__PURE__*/jsx("div", {
            className: styles$9.loaderWrapper,
            children: /*#__PURE__*/jsx(Spinner, {
              name: "loadingCircle",
              size: 16
            })
          })]
        }), /*#__PURE__*/jsx(Button, {
          size: "small",
          color: "lightestPurple",
          variant: "primary",
          iconLeft: "suggestions",
          uppercase: false,
          className: styles$9._tip_button,
          onClick: function onClick() {
            mixpanel.track(MIXPANEL_EVENTS.CALENDAR_TIPS_SEE_CLICKED);
            window.open('https://support.bloobirds.com/hc/en-us/articles/8908326645020-Advantages-of-creating-meetings-on-Bloobirds-vs-Google-Calendar-or-Outlook', '_blank');
          },
          children: t('calendarTips')
        })]
      })]
    }), /*#__PURE__*/jsx("div", {
      className: styles$9._calendar_wrapper,
      children: notConnected ? /*#__PURE__*/jsx(CalendarNotConnected, {
        mode: "day",
        onCalendarReconnect: function onCalendarReconnect() {
          if (mutateConnections) {
            mutateConnections().then(function () {
              mutateCalendars();
            });
          }
        }
      }) : /*#__PURE__*/jsx(Calendar, {
        contextItems: {
          Company: company,
          Lead: lead,
          Opportunity: opportunity
        },
        day: isoDate,
        mode: "day",
        events: eventsPerDay,
        notConnected: notConnected,
        slotsData: slotsData,
        setSlotsData: setSlotsData,
        handleSlots: handleSlots,
        onCalendarReconnect: function onCalendarReconnect() {
          if (mutateConnections) {
            mutateConnections().then(function () {
              mutateCalendars();
            });
          }
        }
      })
    }), changeTimezoneModalVisible && /*#__PURE__*/jsx(ChangeTimezoneModal, {
      onChange: function onChange(value) {
        setSelectedTimezone(value);
        setSlotsData(function (prevSlotsData) {
          return _objectSpread$8(_objectSpread$8({}, prevSlotsData), {}, {
            selectedTimezone: value
          });
        });
        setChangeTimezoneModalVisible(false);
      },
      onClose: function onClose() {
        return setChangeTimezoneModalVisible(false);
      },
      defaultTimezone: selectedTimezone
    })]
  });
};
var CalendarSelectorAnchor = function CalendarSelectorAnchor(visible, setVisible) {
  var _useTranslation3 = useTranslation('translation', {
      keyPrefix: 'dayCalendar'
    }),
    t = _useTranslation3.t;
  return /*#__PURE__*/jsxs("span", {
    className: styles$9._selector_anchor,
    onClick: function onClick() {
      return setVisible(!visible);
    },
    children: [/*#__PURE__*/jsx(Icon, {
      name: "settings",
      size: 16,
      color: "bloobirds"
    }), /*#__PURE__*/jsx(Text, {
      size: "xs",
      children: t('calendars')
    })]
  });
};

function _toConsumableArray$3(arr) { return _arrayWithoutHoles$3(arr) || _iterableToArray$3(arr) || _unsupportedIterableToArray$8(arr) || _nonIterableSpread$3(); }
function _nonIterableSpread$3() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray$3(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$3(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$8(arr); }
function _slicedToArray$7(arr, i) { return _arrayWithHoles$7(arr) || _iterableToArrayLimit$7(arr, i) || _unsupportedIterableToArray$8(arr, i) || _nonIterableRest$7(); }
function _nonIterableRest$7() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$8(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$8(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen); }
function _arrayLikeToArray$8(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$7(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$7(arr) { if (Array.isArray(arr)) return arr; }
var attachedLinksAtom = atom({
  key: 'attachedLinksAtom',
  "default": []
});
var useAttachedLinks = function useAttachedLinks() {
  var _useRecoilState = useRecoilState(attachedLinksAtom),
    _useRecoilState2 = _slicedToArray$7(_useRecoilState, 2),
    attachedLinks = _useRecoilState2[0],
    setAttachedLinks = _useRecoilState2[1];
  var resetAttachedLinks = useResetRecoilState(attachedLinksAtom);
  var uploadAttachedLink = function uploadAttachedLink(file) {
    var _attachedLinks$filter;
    var alreadyAttached = ((_attachedLinks$filter = attachedLinks.filter(function (link) {
      return link.title === file.title && link.link === file.link;
    })) === null || _attachedLinks$filter === void 0 ? void 0 : _attachedLinks$filter.length) > 0;
    if (!alreadyAttached) {
      setAttachedLinks([].concat(_toConsumableArray$3(attachedLinks), [file]));
    }
  };
  var removeAttachedLink = function removeAttachedLink(linkToRemove) {
    setAttachedLinks(attachedLinks.filter(function (link) {
      return link.title !== linkToRemove.title && link.link !== linkToRemove.link;
    }));
  };
  return {
    attachedLinks: attachedLinks,
    setAttachedLinks: setAttachedLinks,
    uploadAttachedLink: uploadAttachedLink,
    resetAttachedLinks: resetAttachedLinks,
    removeAttachedLink: removeAttachedLink
  };
};

var css_248z$8 = ".generalSEETooltip-module_anchorButton__LJ2sN {\n  border: 1px solid var(--lightPurple) !important;\n  color: var(--purple);\n}\n\n.generalSEETooltip-module_anchorButton__LJ2sN svg > path {\n  fill: var(--purple);\n}\n\n.generalSEETooltip-module_left_bar_tooltip__oqSS8 {\n  height: -moz-fit-content;\n  height: fit-content;\n  background-color: var(--verySoftPurple);\n}\n\n.generalSEETooltip-module_title__Spccp {\n  margin: 14px 8px 10px;\n}\n\n.generalSEETooltip-module_footerButton__psk1C {\n  font-size: 12px;\n  padding: 2px 8px;\n}\n\n.generalSEETooltip-module_mainButton__E02Yl {\n  float: right;\n  display: flex;\n  gap: 4px;\n  align-items: center;\n}\n\n.generalSEETooltip-module_secondaryButton__7DDz4 {\n  background-color: transparent;\n}\n\n.generalSEETooltip-module_image__qG-T6 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  width: 100%;\n}\n\n.generalSEETooltip-module_image__qG-T6 > img {\n\n  max-width: 180px;\n  margin: 16px 0;\n}\n\n.generalSEETooltip-module_mainButton__E02Yl:hover {\n  background-color: white !important;\n  opacity: 0.9;\n}\n\n.generalSEETooltip-module_footer__b5faB {\n  margin: 16px 0;\n}\n\n.generalSEETooltip-module_buttonsWrapper__3eitd {\n  display: flex;\n  justify-content: space-between;\n}\n";
var styles$8 = {"anchorButton":"generalSEETooltip-module_anchorButton__LJ2sN","left_bar_tooltip":"generalSEETooltip-module_left_bar_tooltip__oqSS8","title":"generalSEETooltip-module_title__Spccp","footerButton":"generalSEETooltip-module_footerButton__psk1C","mainButton":"generalSEETooltip-module_mainButton__E02Yl","secondaryButton":"generalSEETooltip-module_secondaryButton__7DDz4","image":"generalSEETooltip-module_image__qG-T6","footer":"generalSEETooltip-module_footer__b5faB","buttonsWrapper":"generalSEETooltip-module_buttonsWrapper__3eitd"};
styleInject(css_248z$8);

function _typeof$a(obj) { "@babel/helpers - typeof"; return _typeof$a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$a(obj); }
function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) { _defineProperty$a(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$a(obj, key, value) { key = _toPropertyKey$a(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$a(arg) { var key = _toPrimitive$a(arg, "string"); return _typeof$a(key) === "symbol" ? key : String(key); }
function _toPrimitive$a(input, hint) { if (_typeof$a(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$a(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$6(arr, i) { return _arrayWithHoles$6(arr) || _iterableToArrayLimit$6(arr, i) || _unsupportedIterableToArray$7(arr, i) || _nonIterableRest$6(); }
function _nonIterableRest$6() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$7(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$7(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen); }
function _arrayLikeToArray$7(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$6(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$6(arr) { if (Array.isArray(arr)) return arr; }
var GeneralSEETooltip = function GeneralSEETooltip(_ref) {
  var visible = _ref.visible,
    hasBeenSaved = _ref.hasBeenSaved;
  var _useUserHelpers = useUserHelpers(),
    saveCustom = _useUserHelpers.saveCustom;
  var _useState = useState(false),
    _useState2 = _slicedToArray$6(_useState, 2),
    imageLoaded = _useState2[0],
    setImageLoaded = _useState2[1];
  var _useGetInfoDisplayBlo = useGetInfoDisplayBlockByKey(ExtensionHelperKeys.SEE_GENERAL_TOOLTIP),
    tooltipContent = _useGetInfoDisplayBlo.tooltipContent;
  var shouldShowTooltip = visible && tooltipContent;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'tooltips'
    }),
    t = _useTranslation.t;
  useEffect(function () {
    var imgElement = new Image();
    imgElement.src = tooltipContent === null || tooltipContent === void 0 ? void 0 : tooltipContent.image;
    imgElement.addEventListener('load', function () {
      setImageLoaded(true);
    });
    return function () {
      imgElement.removeEventListener('load', function () {
        setImageLoaded(true);
      });
    };
  }, [tooltipContent === null || tooltipContent === void 0 ? void 0 : tooltipContent.image]);
  return shouldShowTooltip ? /*#__PURE__*/jsxs(DiscoveryTooltip, {
    anchor: /*#__PURE__*/jsx(Button, {
      size: "medium",
      color: "lightestPurple",
      variant: "primary",
      iconLeft: "book",
      uppercase: false,
      className: styles$8.anchorButton
    }),
    position: "left-end",
    color: "verySoftPurple",
    className: styles$8.left_bar_tooltip,
    customStyles: {
      marginRight: '24px'
    },
    arrowCustomStyles: {
      opacity: 0
    },
    width: "392px",
    height: "586px",
    isPersistent: true,
    visible: !hasBeenSaved,
    children: [/*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsx(Text, {
        size: "l",
        color: "purple",
        weight: "heavy",
        align: "center",
        className: styles$8.title,
        children: /*#__PURE__*/jsx(TooltipContentHTML, {
          str: tooltipContent === null || tooltipContent === void 0 ? void 0 : tooltipContent.title
        })
      }), tooltipContent === null || tooltipContent === void 0 ? void 0 : tooltipContent.bodyBlocks.sort(function (a, b) {
        return a.order - b.order;
      }).map(function (bodyBlockProps) {
        return /*#__PURE__*/jsx(TooltipContentBlock, _objectSpread$7({}, bodyBlockProps), bodyBlockProps.order + bodyBlockProps.icon);
      })]
    }), /*#__PURE__*/jsx(DiscoveryTooltip.TooltipImage, {
      className: styles$8.image,
      children: imageLoaded ? /*#__PURE__*/jsx("img", {
        src: tooltipContent === null || tooltipContent === void 0 ? void 0 : tooltipContent.image,
        alt: "see-preview-image",
        onClick: function onClick(e) {
          e.preventDefault();
          e.stopPropagation();
          window.open(tooltipContent === null || tooltipContent === void 0 ? void 0 : tooltipContent.buttonUrl, '_blank');
        }
      }) : /*#__PURE__*/jsx(Spinner, {
        name: "dots",
        color: "lightestPurple"
      })
    }), /*#__PURE__*/jsx(DiscoveryTooltip.TooltipFooter, {
      footerColor: "softPurple",
      children: /*#__PURE__*/jsxs("div", {
        children: [/*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "white",
          align: "center",
          className: styles$8.footer,
          children: /*#__PURE__*/jsx(TooltipContentHTML, {
            str: tooltipContent === null || tooltipContent === void 0 ? void 0 : tooltipContent.footer
          })
        }), /*#__PURE__*/jsxs("div", {
          className: styles$8.buttonsWrapper,
          children: [/*#__PURE__*/jsx(DiscoveryTooltip.TooltipButton, {
            isMainButton: true,
            onClick: function onClick() {
              if (!hasBeenSaved) {
                saveCustom({
                  key: ExtensionHelperKeys.SEE_GENERAL_TOOLTIP,
                  data: new Date().toISOString()
                });
              }
            },
            variant: "secondary",
            color: "white",
            className: clsx(styles$8.footerButton, styles$8.secondaryButton),
            uppercase: false,
            children: t('ok')
          }), /*#__PURE__*/jsx(DiscoveryTooltip.TooltipButton, {
            isMainButton: true,
            color: "purple",
            variant: "tertiary",
            className: clsx(styles$8.footerButton, styles$8.mainButton),
            uppercase: false,
            onClick: function onClick() {
              window.open(tooltipContent === null || tooltipContent === void 0 ? void 0 : tooltipContent.buttonUrl, '_blank');
              if (!hasBeenSaved) {
                saveCustom({
                  key: ExtensionHelperKeys.SEE_GENERAL_TOOLTIP,
                  data: new Date().toISOString()
                });
              }
            },
            children: /*#__PURE__*/jsxs(Fragment, {
              children: [/*#__PURE__*/jsx(Icon, {
                name: "book",
                color: "purple",
                size: 16
              }), " ", tooltipContent === null || tooltipContent === void 0 ? void 0 : tooltipContent.buttonText]
            })
          })]
        })]
      })
    })]
  }) : /*#__PURE__*/jsx("div", {});
};

var css_248z$7 = ".smartEmailHelperTabs-module__suggestionTab_container__HWxtM {\n  padding: 12px;\n}\n\n.smartEmailHelperTabs-module__tab_container__xIWOx {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n\n.smartEmailHelperTabs-module__tab_header__v16f9 {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 24px 12px 24px;\n}\n\n.smartEmailHelperTabs-module__tab_title__i41Qu {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: center;\n}\n\n.smartEmailHelperTabs-module__lead_multiselect__Mp5Sf:last-child > div > div > input {\n  color: var(--bloobirds) !important;\n}\n\n.smartEmailHelperTabs-module__lead_multiselect__Mp5Sf:last-child > div > div > svg {\n  display: none;\n}\n\n.smartEmailHelperTabs-module__no_results_container__oBYVi {\n  height: 100%;\n  width: 80%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  margin: auto;\n}\n\n.smartEmailHelperTabs-module__no_results_text__i0MQB {\n  width: 90%;\n  margin-right: auto;\n  margin-left: auto;\n}\n\n.smartEmailHelperTabs-module__spinner__EpzZF {\n  height: 100px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.smartEmailHelperTabs-module__preview_container__QeMS9 {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.smartEmailHelperTabs-module__overlay__feSPA {\n  width: 250px;\n  height: 250px;\n  position: absolute;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n  visibility: visible;\n  opacity: 1;\n}\n\n.smartEmailHelperTabs-module__overlay_hidden__YFlmD {\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 0.1s, opacity 0.1s linear;\n}\n\n.smartEmailHelperTabs-module__preview_image__xeHTB {\n  margin-top: 0;\n  filter: blur(2px);\n  -webkit-filter: blur(2px);\n  -ms-filter: blur(2px);\n  width: 92%;\n  height: 98%;\n}\n\n.smartEmailHelperTabs-module__preview_image_div__G92xl {\n  margin-top: 0;\n  filter: blur(2px);\n  -webkit-filter: blur(2px);\n  -ms-filter: blur(2px);\n  height: 100%;\n}\n\n.smartEmailHelperTabs-module__preview_image_no_blur__035gM {\n  filter: blur(0) !important;\n  -webkit-filter: blur(0) !important;\n  -ms-filter: blur(0) !important;\n  transition: filter 0.5ms ease-out, -ms-filter 0.5ms ease-out;\n}\n";
var styles$7 = {"_suggestionTab_container":"smartEmailHelperTabs-module__suggestionTab_container__HWxtM","_tab_container":"smartEmailHelperTabs-module__tab_container__xIWOx","_tab_header":"smartEmailHelperTabs-module__tab_header__v16f9","_tab_title":"smartEmailHelperTabs-module__tab_title__i41Qu","_lead_multiselect":"smartEmailHelperTabs-module__lead_multiselect__Mp5Sf","_no_results_container":"smartEmailHelperTabs-module__no_results_container__oBYVi","_no_results_text":"smartEmailHelperTabs-module__no_results_text__i0MQB","_spinner":"smartEmailHelperTabs-module__spinner__EpzZF","_preview_container":"smartEmailHelperTabs-module__preview_container__QeMS9","_overlay":"smartEmailHelperTabs-module__overlay__feSPA","_overlay_hidden":"smartEmailHelperTabs-module__overlay_hidden__YFlmD","_preview_image":"smartEmailHelperTabs-module__preview_image__xeHTB","_preview_image_div":"smartEmailHelperTabs-module__preview_image_div__G92xl","_preview_image_no_blur":"smartEmailHelperTabs-module__preview_image_no_blur__035gM"};
styleInject(css_248z$7);

var SmartEmailHelperLayout = function SmartEmailHelperLayout(props) {
  var _emailHelperTabTmp$ta;
  var ref = useRef();
  var tab = props.tab,
    tabProps = props.tabProps;
  var emailHelperTabTmp = emailHelperTabs(ref, tabProps);
  return /*#__PURE__*/jsx("div", {
    className: styles$7._tab_container,
    ref: ref,
    children: (_emailHelperTabTmp$ta = emailHelperTabTmp[tab]) === null || _emailHelperTabTmp$ta === void 0 ? void 0 : _emailHelperTabTmp$ta.tab
  });
};

var css_248z$6 = ".smartEmailHelper-module__container__f0f0q {\n  box-sizing: border-box;\n  background-color: white;\n  justify-content: space-between;\n  border-left: 1px solid var(--lightestBloobirds);\n  width: 424px;\n  display: flex;\n  flex-direction: column;\n  height: calc(64vh + 80px);\n  max-height: 680px;\n}\n\n.smartEmailHelper-module__container_with_attachments__lRsJB {\n  height: calc(64vh + 138px);\n  max-height: 742px;\n}\n\n.smartEmailHelper-module__container_with_links__LNBBx {\n  height: calc(64vh + 141px);\n  max-height: 755px;\n}\n\n.smartEmailHelper-module__container_with_links_and_attachments__yc8hs {\n  height: calc(64vh + 197px);\n  max-height: 813px;\n}\n\n.smartEmailHelper-module__filters_container__DGqFG {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 24px;\n}\n\n.smartEmailHelper-module__filter_item__D76Bi {\n  font-size: 13px;\n}\n\n.smartEmailHelper-module__tab_navigator__BiYlA {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  align-self: stretch;\n  height: 80px;\n  margin: 0;\n  padding: 24px;\n}\n\n.smartEmailHelper-module__tab_navigator__BiYlA > div:not([class*='smartEmailHelper-module__tab_navigator_item']):first-child {\n  display: flex !important;\n  align-items: flex-start;\n  height: 32px;\n}\n\n.smartEmailHelper-module__tab_navigator__BiYlA\n  > div:not([class*='smartEmailHelper-module__tab_navigator_item']):first-child\n  button {\n  height: 32px;\n  width: 32px;\n  padding: 0px;\n}\n\n.smartEmailHelper-module__tab_navigator__BiYlA > div:not([class*='smartEmailHelper-module__tab_navigator_item']):first-child svg {\n  height: 32px;\n  width: 32px;\n}\n\n.smartEmailHelper-module__tab_navigator_menu__2VGeU {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 4px;\n}\n\n.smartEmailHelper-module__tab_navigator_menu_item__Pyrj- {\n  padding: 1.5px;\n  border: 1px solid transparent;\n}\n\n.smartEmailHelper-module__tab_navigator_menu_item_selected__O2MDo {\n  border: 1px solid var(--verySoftBloobirds);\n  border-radius: 4px;\n  background-color: var(--lightBloobirds);\n  padding: 0;\n}\n";
var styles$6 = {"_container":"smartEmailHelper-module__container__f0f0q","_container_with_attachments":"smartEmailHelper-module__container_with_attachments__lRsJB","_container_with_links":"smartEmailHelper-module__container_with_links__LNBBx","_container_with_links_and_attachments":"smartEmailHelper-module__container_with_links_and_attachments__yc8hs","_filters_container":"smartEmailHelper-module__filters_container__DGqFG","_filter_item":"smartEmailHelper-module__filter_item__D76Bi","_tab_navigator":"smartEmailHelper-module__tab_navigator__BiYlA","_tab_navigator_menu":"smartEmailHelper-module__tab_navigator_menu__2VGeU","_tab_navigator_menu_item":"smartEmailHelper-module__tab_navigator_menu_item__Pyrj-","_tab_navigator_menu_item_selected":"smartEmailHelper-module__tab_navigator_menu_item_selected__O2MDo"};
styleInject(css_248z$6);

function _typeof$9(obj) { "@babel/helpers - typeof"; return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$9(obj); }
function _defineProperty$9(obj, key, value) { key = _toPropertyKey$9(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$9(arg) { var key = _toPrimitive$9(arg, "string"); return _typeof$9(key) === "symbol" ? key : String(key); }
function _toPrimitive$9(input, hint) { if (_typeof$9(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$9(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SmartEmailHelper = function SmartEmailHelper(props) {
  var hasAttachments = props.hasAttachments,
    hasLinks = props.hasLinks,
    setOpenPreview = props.setOpenPreview,
    control = props.control,
    bodyEditor = props.bodyEditor,
    error = props.error,
    format = props.format,
    htmlContent = props.htmlContent;
  var _useSmartEmailModal = useSmartEmailModal(),
    selectedTab = _useSmartEmailModal.selectedTab,
    setSelectedTab = _useSmartEmailModal.setSelectedTab,
    tooltipVisible = _useSmartEmailModal.tooltipVisible,
    calendarSlotsVisible = _useSmartEmailModal.slotsData.calendarSlotsVisible,
    hasTimeSlotsEnabled = _useSmartEmailModal.hasTimeSlotsEnabled;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.tabs'
    }),
    t = _useTranslation.t;
  var emailHelperTabsTmp = emailHelperTabs();
  var _useUserHelpers = useUserHelpers(),
    saveCustom = _useUserHelpers.saveCustom,
    has = _useUserHelpers.has;
  var hasBeenSaved = has(ExtensionHelperKeys.SEE_GENERAL_TOOLTIP);
  var hasSeenInfoBanner = has(ExtensionHelperKeys.SIMILAR_DEALS_INFO_BANNER);
  var handleSwitchTab = function handleSwitchTab(tab) {
    if (selectedTab === SmartEmailTab.CLOSED_DEALS && tab !== SmartEmailTab.CLOSED_DEALS && !hasSeenInfoBanner) saveCustom({
      key: ExtensionHelperKeys.SIMILAR_DEALS_INFO_BANNER,
      data: 'Initial step viewed'
    });
    setSelectedTab(tab);
  };
  useEffect(function () {
    setOpenPreview(selectedTab === SmartEmailTab.PREVIEW);
  }, [selectedTab]);
  return /*#__PURE__*/jsxs("div", {
    className: clsx(styles$6._container, _defineProperty$9(_defineProperty$9(_defineProperty$9({}, styles$6._container_with_attachments, hasAttachments), styles$6._container_with_links, hasLinks), styles$6._container_with_links_and_attachments, hasAttachments && hasLinks)),
    children: [/*#__PURE__*/jsx(SmartEmailHelperLayout, {
      tab: selectedTab,
      tabProps: {
        control: control,
        bodyEditor: bodyEditor,
        error: error,
        hasAttachments: hasAttachments,
        format: format,
        htmlContent: htmlContent
      }
    }), (!calendarSlotsVisible || !hasTimeSlotsEnabled) && /*#__PURE__*/jsxs("div", {
      className: styles$6._tab_navigator,
      children: [/*#__PURE__*/jsx(GeneralSEETooltip, {
        visible: tooltipVisible,
        hasBeenSaved: hasBeenSaved
      }), /*#__PURE__*/jsx("div", {
        className: styles$6._tab_navigator_menu,
        children: Object.keys(emailHelperTabsTmp).map(function (tab, idx) {
          var _emailHelperTabsTmp$t;
          return ((_emailHelperTabsTmp$t = emailHelperTabsTmp[tab]) === null || _emailHelperTabsTmp$t === void 0 ? void 0 : _emailHelperTabsTmp$t.visible) && /*#__PURE__*/jsx(Tooltip, {
            title: t(emailHelperTabsTmp[tab].key),
            position: "top",
            children: /*#__PURE__*/jsx("div", {
              className: clsx(styles$6._tab_navigator_menu_item, _defineProperty$9({}, styles$6._tab_navigator_menu_item_selected, tab === selectedTab)),
              children: /*#__PURE__*/jsx(IconButton, {
                size: 32,
                dataTest: "SEE-TabNav-".concat(emailHelperTabsTmp[tab].dataTest),
                name: emailHelperTabsTmp[tab].icon,
                color: tab === selectedTab ? 'bloobirds' : 'verySoftBloobirds',
                onClick: function onClick() {
                  handleSwitchTab(tab);
                }
              }, emailHelperTabsTmp[tab].dataTest)
            }, emailHelperTabsTmp[tab].icon + '-' + idx)
          }, tab);
        })
      })]
    })]
  });
};

function SubjectEditor(_ref) {
  var setSubjectEditor = _ref.setSubjectEditor,
    _ref$defaultValue = _ref.defaultValue,
    defaultValue = _ref$defaultValue === void 0 ? initialValue : _ref$defaultValue;
    _ref.validator;
    var children = _ref.children;
  var subjectPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: true,
    marks: false,
    elements: false,
    images: false,
    autoReplace: false,
    singleLine: true,
    replaceParagraphs: true
  });
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'emailModal'
    }),
    t = _useTranslation.t;
  var _useSmartEmailModal = useSmartEmailModal(),
    storeEditorRef = _useSmartEmailModal.storeEditorRef;
  var _useFormContext = useFormContext(),
    register = _useFormContext.register,
    getValues = _useFormContext.getValues;
  var registerProps = register('subject');
  return /*#__PURE__*/jsx(RichTextEditor, {
    id: "emailSubject",
    placeholder: t('subjectPlaceholder'),
    plugins: subjectPlugins,
    style: {
      width: '100%',
      padding: 0
    }
    // @ts-ignore
    ,
    setEditor: function setEditor(value) {
      storeEditorRef(value);
      setSubjectEditor(value);
    },
    defaultValue: getValues('subject') || defaultValue,
    registerProps: registerProps,
    children: children
  });
}

var _excluded$2 = ["ref"],
  _excluded2$2 = ["ref"],
  _excluded3 = ["ref"],
  _excluded4 = ["ref"],
  _excluded5 = ["ref"];
function _regeneratorRuntime$3() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$3 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$8(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$3(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$6(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _objectWithoutProperties$2(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$2(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$2(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _typeof$8(obj) { "@babel/helpers - typeof"; return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$8(obj); }
function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty$8(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$8(obj, key, value) { key = _toPropertyKey$8(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$8(arg) { var key = _toPrimitive$8(arg, "string"); return _typeof$8(key) === "symbol" ? key : String(key); }
function _toPrimitive$8(input, hint) { if (_typeof$8(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$8(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray$2(arr) { return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$6(arr) || _nonIterableSpread$2(); }
function _nonIterableSpread$2() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray$2(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$2(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$6(arr); }
function _slicedToArray$5(arr, i) { return _arrayWithHoles$5(arr) || _iterableToArrayLimit$5(arr, i) || _unsupportedIterableToArray$6(arr, i) || _nonIterableRest$5(); }
function _nonIterableRest$5() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$6(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$6(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen); }
function _arrayLikeToArray$6(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$5(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$5(arr) { if (Array.isArray(arr)) return arr; }
var isMissingVariable = function isMissingVariable(content, missingVariable) {
  if (missingVariable) {
    return missingVariable;
  }
  if (content !== null && content !== void 0 && content.children && ![ELEMENT_MISSING_VARIABLE, ELEMENT_MISSING_MEETING_LINK].includes(content === null || content === void 0 ? void 0 : content.type)) {
    return content.children.some(function (children) {
      return isMissingVariable(children, false);
    });
  }
  if (Array.isArray(content)) {
    return content.some(function (node) {
      return isMissingVariable(node, false);
    });
  }
  return (content === null || content === void 0 ? void 0 : content.type) && [ELEMENT_MISSING_VARIABLE, ELEMENT_MISSING_MEETING_LINK].includes(content === null || content === void 0 ? void 0 : content.type);
};
var HTMLEditor = function HTMLEditor(_ref) {
  var content = _ref.content,
    onContentChange = _ref.onContentChange,
    uploadAttachedFile = _ref.uploadAttachedFile,
    templateId = _ref.templateId;
  var ref = useRef(null);
  var lastExternalContent = useRef(content);
  var oldTemplateId = useRef(templateId);
  useEffect(function () {
    if (ref.current && (ref.current.innerHTML === null || ref.current.innerHTML === undefined || ref.current.innerHTML === '' || templateId !== oldTemplateId.current)) {
      ref.current.innerHTML = content;
      lastExternalContent.current = content;
      oldTemplateId.current = templateId;
    }
  }, [ref.current, content, templateId]);
  var handleInput = function handleInput() {
    if (ref.current) {
      onContentChange(ref.current.innerHTML);
    }
  };
  var debouncedHandleInput = useCallback(debounce(handleInput, 500), [ref.current]);
  return /*#__PURE__*/jsxs("div", {
    className: styles$c.html_editor,
    children: [/*#__PURE__*/jsx(EditorToolbar, {
      children: /*#__PURE__*/jsx(EditorToolbarFileAttachment, {
        onAttachment: uploadAttachedFile
      })
    }), /*#__PURE__*/jsx(ReactShadowRoot, {
      children: /*#__PURE__*/jsx("div", {
        contentEditable: "true",
        ref: ref,
        onInput: debouncedHandleInput,
        className: salesforceResetStyles.salesforceReset,
        style: {
          minHeight: '300px',
          border: '1px solid #ccc',
          padding: '10px'
        }
      })
    })]
  });
};
var SmartEmailModalComponent = function SmartEmailModalComponent(_ref2) {
  var _dataModel$findFieldB, _dataModel$findFields, _company$fields, _company$fields$filte, _companyEmailFieldsId, _activeBobject$id, _activityMessageBody, _activityMessageSubje, _getFieldByLogicRole, _emailCcProps$value, _emailBccProps$value, _emailToProps$value;
  var handleRedirect = _ref2.handleRedirect,
    scheduleEmailRedirect = _ref2.scheduleEmailRedirect,
    emailSettingsRedirect = _ref2.emailSettingsRedirect,
    isExtension = _ref2.isExtension,
    userSettings = _ref2.userSettings;
  var _useSmartEmailModal = useSmartEmailModal(),
    contextCompany = _useSmartEmailModal.company,
    id = _useSmartEmailModal.id,
    user = _useSmartEmailModal.user,
    hasSnippetsEnabled = _useSmartEmailModal.hasSnippetsEnabled,
    hasTimeSlotsEnabled = _useSmartEmailModal.hasTimeSlotsEnabled,
    slotsData = _useSmartEmailModal.slotsData,
    setSlotsData = _useSmartEmailModal.setSlotsData,
    selectedTab = _useSmartEmailModal.selectedTab,
    setSelectedTab = _useSmartEmailModal.setSelectedTab,
    setPlaybookTab = _useSmartEmailModal.setPlaybookTab,
    updateReplaceMethod = _useSmartEmailModal.updateReplaceMethod,
    setSelectedTemplate = _useSmartEmailModal.setSelectedTemplate,
    selectedTemplate = _useSmartEmailModal.selectedTemplate,
    taskTitle = _useSmartEmailModal.taskTitle,
    activeBobject = _useSmartEmailModal.activeBobject,
    dataModel = _useSmartEmailModal.dataModel,
    setSelectedActivity = _useSmartEmailModal.setSelectedActivity,
    pageBobjectType = _useSmartEmailModal.pageBobjectType,
    focusedRef = _useSmartEmailModal.focusedRef,
    updateFocusedIndex = _useSmartEmailModal.updateFocusedIndex,
    setRelatedBobjectsInfo = _useSmartEmailModal.setRelatedBobjectsInfo,
    setTooltipVisible = _useSmartEmailModal.setTooltipVisible;
  var _useMinimizableModal = useMinimizableModal(id),
    closeModal = _useMinimizableModal.closeModal,
    open = _useMinimizableModal.open,
    minimize = _useMinimizableModal.minimize,
    hasBeenMinimized = _useMinimizableModal.hasBeenMinimized,
    openConfirmModal = _useMinimizableModal.openConfirmModal,
    _useMinimizableModal$ = _useMinimizableModal.data,
    activity = _useMinimizableModal$.activity,
    minimizedCompany = _useMinimizableModal$.company,
    activeLead = _useMinimizableModal$.lead,
    _useMinimizableModal$2 = _useMinimizableModal$.isScheduledEmail,
    isScheduledEmail = _useMinimizableModal$2 === void 0 ? false : _useMinimizableModal$2,
    _useMinimizableModal$3 = _useMinimizableModal$.isFailedAutomation,
    isFailedAutomation = _useMinimizableModal$3 === void 0 ? true : _useMinimizableModal$3,
    scheduledDate = _useMinimizableModal$.scheduledDate,
    taskId = _useMinimizableModal$.taskId,
    savedData = _useMinimizableModal$.savedData,
    mode = _useMinimizableModal$.mode,
    template = _useMinimizableModal$.template,
    isBlankEmail = _useMinimizableModal$.isBlankEmail,
    defaultToEmail = _useMinimizableModal$.defaultToEmail,
    defaultCcEmail = _useMinimizableModal$.defaultCcEmail,
    defaultBccEmail = _useMinimizableModal$.defaultBccEmail,
    opportunity = _useMinimizableModal$.opportunity,
    opportunities = _useMinimizableModal$.opportunities,
    leads = _useMinimizableModal$.leads,
    _useMinimizableModal$4 = _useMinimizableModal$.editorMode,
    defaultEditorMode = _useMinimizableModal$4 === void 0 ? 'AST' : _useMinimizableModal$4,
    onSave = _useMinimizableModal.onSave;
  var company = useMemo(function () {
    return minimizedCompany ? minimizedCompany : contextCompany;
  }, [minimizedCompany, contextCompany]);
  var _useState = useState(undefined),
    _useState2 = _slicedToArray$5(_useState, 2),
    confirmModal = _useState2[0],
    setConfirmModal = _useState2[1];
  var _useState3 = useState({
      isOpen: false,
      callback: function callback() {}
    }),
    _useState4 = _slicedToArray$5(_useState3, 2),
    saveWithSlotsModal = _useState4[0],
    setSaveWithSlotsModal = _useState4[1];
  var _useState5 = useState(undefined),
    _useState6 = _slicedToArray$5(_useState5, 2),
    autofilledTemplate = _useState6[0],
    setAutofilledTemplate = _useState6[1];
  var _useState7 = useState(defaultEditorMode),
    _useState8 = _slicedToArray$5(_useState7, 2),
    editorMode = _useState8[0],
    setEditorMode = _useState8[1];
  var _useState9 = useState((savedData === null || savedData === void 0 ? void 0 : savedData.htmlContent) || ''),
    _useState10 = _slicedToArray$5(_useState9, 2),
    htmlContent = _useState10[0],
    setHtmlContent = _useState10[1];
  var _useState11 = useState(false),
    _useState12 = _slicedToArray$5(_useState11, 2),
    sending = _useState12[0],
    setSending = _useState12[1];
  var _useSignatures = useSignatures(),
    signatures = _useSignatures.data,
    signature = _useSignatures.signature,
    setConnectionId = _useSignatures.setConnectionId,
    getSignatureConnection = _useSignatures.getSignatureConnection;
  var _useState13 = useState(isScheduledEmail),
    _useState14 = _slicedToArray$5(_useState13, 2),
    isEditorDisabled = _useState14[0],
    setIsEditorDisabled = _useState14[1];
  var _useState15 = useState(),
    _useState16 = _slicedToArray$5(_useState15, 2),
    templateMediaFiles = _useState16[0],
    setTemplateMediaFiles = _useState16[1];
  var _useAttachedFiles = useAttachedFiles(),
    attachedFiles = _useAttachedFiles.attachedFiles,
    removeAttachedFile = _useAttachedFiles.removeAttachedFile,
    uploadAttachedFile = _useAttachedFiles.uploadAttachedFile,
    syncAttachments = _useAttachedFiles.syncAttachments;
  var _useEmailConnections = useEmailConnections(),
    connections = _useEmailConnections.connections;
  var _useState17 = useState(null),
    _useState18 = _slicedToArray$5(_useState17, 2),
    subjectEditor = _useState18[0],
    setSubjectEditor = _useState18[1];
  var _useState19 = useState(null),
    _useState20 = _slicedToArray$5(_useState19, 2),
    bodyEditor = _useState20[0],
    setBodyEditor = _useState20[1];
  var autoInsertSignaturePermission = userSettings === null || userSettings === void 0 ? void 0 : userSettings.autoInsertSignaturePermission;
  var enabledAutoInsertSignature = autoInsertSignaturePermission === PermissionType.ENABLED || autoInsertSignaturePermission === PermissionType.FORCED;
  var selectSignaturesPermission = userSettings === null || userSettings === void 0 ? void 0 : userSettings.selectSignaturesPermission;
  var enabledSelectSignature = selectSignaturesPermission === PermissionType.ENABLED || selectSignaturesPermission === PermissionType.FORCED;
  var emailConnections = (connections === null || connections === void 0 ? void 0 : connections.list.map(function (x) {
    return {
      value: x === null || x === void 0 ? void 0 : x.email,
      label: x === null || x === void 0 ? void 0 : x.email
    };
  })) || [];
  var aliasConnections = (connections === null || connections === void 0 ? void 0 : connections.list.flatMap(function (x) {
    return x.nylasAliases;
  }).map(function (alias) {
    return {
      value: alias.emailAlias,
      label: alias.emailAlias
    };
  })) || [];
  var emailsFrom = [].concat(_toConsumableArray$2(emailConnections), _toConsumableArray$2(aliasConnections));
  var _useState21 = useState(!!(!!defaultCcEmail && defaultCcEmail.length)),
    _useState22 = _slicedToArray$5(_useState21, 2),
    showCc = _useState22[0],
    setShowCc = _useState22[1];
  var _useState23 = useState(false),
    _useState24 = _slicedToArray$5(_useState23, 2),
    scheduleEmailModalOpen = _useState24[0],
    setScheduleEmailModalOpen = _useState24[1];
  var _useState25 = useState(false),
    _useState26 = _slicedToArray$5(_useState25, 2),
    missingVariable = _useState26[0],
    setMissingVariable = _useState26[1];
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var _useState27 = useState(false),
    _useState28 = _slicedToArray$5(_useState27, 2),
    isOpenPreview = _useState28[0],
    setIsOpenPreview = _useState28[1];
  var _useUserHelpers = useUserHelpers(),
    save = _useUserHelpers.save,
    has = _useUserHelpers.has;
  var lastVisitedTab = useRef(SmartEmailTab.PAST_ACTIVITY);
  var togglePreview = function togglePreview() {
    setSlotsData(function (prevData) {
      return _objectSpread$6(_objectSpread$6({}, prevData), {}, {
        calendarSlotsVisible: false
      });
    });
    if (selectedTab !== SmartEmailTab.PREVIEW) {
      lastVisitedTab.current = selectedTab;
    }
    setSelectedTab(selectedTab === SmartEmailTab.PREVIEW ? lastVisitedTab.current : SmartEmailTab.PREVIEW);
  };
  var leadEmailFieldId = dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$findFieldB = dataModel.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.EMAIL)) === null || _dataModel$findFieldB === void 0 ? void 0 : _dataModel$findFieldB.id;
  var activeLeadEmail = activeLead && getValueFromLogicRole(activeLead, LEAD_FIELDS_LOGIC_ROLE.EMAIL, true) || ( // @ts-ignore
  activeLead === null || activeLead === void 0 ? void 0 : activeLead.email) || (activeLead === null || activeLead === void 0 ? void 0 : activeLead[leadEmailFieldId]);
  var companyEmailFieldsId = dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$findFields = dataModel.findFieldsByTypeAndBobjectType(BobjectTypes.Company, 'EMAIL')) === null || _dataModel$findFields === void 0 ? void 0 : _dataModel$findFields.map(function (field) {
    return field.id;
  });
  var activeCompanyEmail = company && (company !== null && company !== void 0 && company.fields ? company === null || company === void 0 ? void 0 : (_company$fields = company.fields) === null || _company$fields === void 0 ? void 0 : (_company$fields$filte = _company$fields.filter(function (field) {
    return (field === null || field === void 0 ? void 0 : field.value) && (field === null || field === void 0 ? void 0 : field.type) === 'EMAIL';
  })[0]) === null || _company$fields$filte === void 0 ? void 0 : _company$fields$filte.value : (_companyEmailFieldsId = companyEmailFieldsId.map(function (id) {
    var _company$rawBobject;
    return company === null || company === void 0 ? void 0 : (_company$rawBobject = company.rawBobject) === null || _company$rawBobject === void 0 ? void 0 : _company$rawBobject[id];
  })) === null || _companyEmailFieldsId === void 0 ? void 0 : _companyEmailFieldsId[0]);
  var activityEmailLead = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_LEAD);
  var defaultEmail = getDefaultEmail(mode, activityEmailLead, (activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id = activeBobject.id) === null || _activeBobject$id === void 0 ? void 0 : _activeBobject$id.typeName) === BobjectTypes.Company ? activeCompanyEmail || activeLeadEmail : activeLeadEmail);
  var isModeReply = mode === 'REPLY';
  var activityMessageBody = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);
  if ((_activityMessageBody = activityMessageBody) !== null && _activityMessageBody !== void 0 && _activityMessageBody.includes('"type":"p"') && typeof activityMessageBody === 'string' && _typeof$8(JSON.parse(activityMessageBody)) === 'object') {
    activityMessageBody = serialize(activityMessageBody);
  }
  var activityMessageSubject = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT, true) || 'No subject';
  if ((_activityMessageSubje = activityMessageSubject) !== null && _activityMessageSubje !== void 0 && _activityMessageSubje.includes('"type":"p"') && typeof activityMessageSubject === 'string' && _typeof$8(JSON.parse(activityMessageSubject)) === 'object') {
    activityMessageSubject = removeHtmlTags(serialize(activityMessageSubject));
  }
  var connection = getActivityConnection({
    activity: activity,
    mode: mode,
    connections: connections
  });
  var activityEmail = connection === null || connection === void 0 ? void 0 : connection.email;
  var activityDateTime = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  var activityDirection = (_getFieldByLogicRole = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.valueLogicRole;
  var isIncomingActivity = activityDirection === DIRECTION_VALUES_LOGIC_ROLE.INCOMING;
  var hasConnections = connections ? connections.list && connections.list.length > 0 : false;
  var canMinimize = isScheduledEmail ? !isEditorDisabled : true;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var _useAttachedLinks = useAttachedLinks(),
    attachedLinks = _useAttachedLinks.attachedLinks,
    removeAttachedLink = _useAttachedLinks.removeAttachedLink;
  var oldTemplateId = useRef(null);
  var contactBobject = pageBobjectType === BobjectTypes.Company ? company : pageBobjectType === BobjectTypes.Opportunity ? opportunity : activeLead;
  var suggestedTemplates = useSuggestedTemplates(contactBobject, {
    company: company,
    opportunities: opportunities,
    leads: leads
  }, 'Emails');
  var subjectPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: true,
    marks: false,
    elements: false,
    images: false,
    autoReplace: false,
    singleLine: true,
    replaceParagraphs: true
  });
  var bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: true,
    replaceMeetingLinks: true,
    rawHTMLBlock: true,
    replyHistory: true,
    snippets: true
  });
  var defaultValues = savedData || {
    to: getDefaultToEmail(pageBobjectType, defaultToEmail, defaultEmail),
    cc: defaultCcEmail ? defaultCcEmail : [],
    bcc: defaultBccEmail ? defaultBccEmail : [],
    emailFrom: hasConnections ? activityEmail : 'no-connections',
    templateId: template ? template.id : null,
    subject: isModeReply ? createParagraph(/^re:/i.test(activityMessageSubject) ? activityMessageSubject : "RE: ".concat(activityMessageSubject)) : template ? deserialize(template === null || template === void 0 ? void 0 : template.subject, {
      format: template === null || template === void 0 ? void 0 : template.format,
      plugins: subjectPlugins
    }) : createParagraph(''),
    body: isModeReply || !(template !== null && template !== void 0 && template.content) ? createParagraph('') : deserialize(template === null || template === void 0 ? void 0 : template.content, {
      format: template === null || template === void 0 ? void 0 : template.format,
      plugins: bodyPlugins
    }),
    attachments: []
  };
  var methods = useForm({
    defaultValues: defaultValues,
    mode: 'all'
  });
  var handleSubmit = methods.handleSubmit,
    watch = methods.watch,
    control = methods.control,
    setValue = methods.setValue,
    getValues = methods.getValues,
    _methods$formState = methods.formState,
    isDirty = _methods$formState.isDirty,
    isSubmitting = _methods$formState.isSubmitting,
    isValid = _methods$formState.isValid;
  var formAttachments = watch('attachments');
  var templateId = watch('templateId');
  var emailFrom = watch('emailFrom');
  var emailTo = watch('to');
  var _useState29 = useState(true),
    _useState30 = _slicedToArray$5(_useState29, 2),
    isThereARealBody = _useState30[0];
    _useState30[1];
  var isEditorRegistered = !!bodyEditor;
  var inputContextProps = useSmartEmailModal();
  var editorsStored = subjectEditor && bodyEditor;

  /* Form fields */
  // @ts-ignore
  var _useController = useController({
      control: control,
      name: 'emailFrom',
      rules: {
        required: true
      }
    }),
    _useController$field = _useController.field;
    _useController$field.ref;
    var emailFromProps = _objectWithoutProperties$2(_useController$field, _excluded$2);
  var _useController2 = useController({
      control: control,
      name: 'cc',
      // @ts-ignore
      defaultValue: defaultCcEmail ? defaultCcEmail : [],
      rules: {
        validate: function validate(emails) {
          return emails.every(isEmail);
        }
      }
    }),
    _useController2$field = _useController2.field;
    _useController2$field.ref;
    var emailCcProps = _objectWithoutProperties$2(_useController2$field, _excluded2$2);
  var _useController3 = useController({
      control: control,
      name: 'bcc',
      // @ts-ignore
      defaultValue: defaultBccEmail ? defaultBccEmail : [],
      rules: {
        validate: function validate(emails) {
          return emails.every(isEmail);
        }
      }
    }),
    _useController3$field = _useController3.field;
    _useController3$field.ref;
    var emailBccProps = _objectWithoutProperties$2(_useController3$field, _excluded3);
  var _useController4 = useController({
      control: control,
      name: 'to',
      // @ts-ignore
      defaultValue: getDefaultToEmail(pageBobjectType, defaultToEmail, defaultEmail)
    }),
    _useController4$field = _useController4.field;
    _useController4$field.ref;
    var emailToProps = _objectWithoutProperties$2(_useController4$field, _excluded4);
  var _useController5 = useController({
      control: control,
      name: 'templateId'
    }),
    _useController5$field = _useController5.field;
    _useController5$field.ref;
    var templateSelectProps = _objectWithoutProperties$2(_useController5$field, _excluded5);
  var prepareEmail = function prepareEmail(data, activeBobject) {
    var _activeBobject$id2;
    // This only allows reply to the same account email (nylas restriction)
    var isReply = isModeReply && data.emailFrom === activityEmail;
    //if modal has reloaded get values from form
    var attachmentIds = attachedFiles === null || attachedFiles === void 0 ? void 0 : attachedFiles.map(function (file) {
      return file.id;
    });
    var body = editorMode === 'HTML' ? htmlContent : JSON.stringify(deserialize(JSON.stringify(prepareBodyToBeSerialized(attachedLinks, data.body)), {
      format: 'AST',
      plugins: bodyPlugins
    }));
    var subjectSerialized = deserialize(JSON.stringify(data === null || data === void 0 ? void 0 : data.subject), {
      format: 'AST',
      plugins: subjectPlugins
    });
    var calendarSlotsData = [];
    var calendarSlots = slotsData === null || slotsData === void 0 ? void 0 : slotsData.calendarSlots;
    if (calendarSlots) {
      for (var key in calendarSlots) {
        if (calendarSlots[key]) {
          var items = calendarSlots[key];
          var _iterator = _createForOfIteratorHelper(items),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var item = _step.value;
              calendarSlotsData.push({
                day: item.day,
                duration: item.minuteSpan,
                startDateTime: item.startTime.format('iso-utc')
              });
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }
    }
    var subjectText = removeHtmlTags(serialize(subjectSerialized, {
      plugins: subjectPlugins
    }));
    return {
      nameFrom: null,
      nameReplayTo: null,
      emailReplayTo: isReply ? data.emailFrom : '',
      emailFrom: data.emailFrom,
      replyToMessageId: isReply ? getTextFromLogicRole(activity, 'ACTIVITY__EMAIL_UID') : null,
      to: data.to,
      cc: data.cc || [],
      bcc: data.bcc || [],
      attachmentIds: attachmentIds,
      templateId: data.templateId,
      format: editorMode,
      subject: editorMode !== 'HTML' ? JSON.stringify(createParagraph(subjectText)) : subjectText,
      body: body,
      calendarSlots: calendarSlotsData,
      slotsTimezone: slotsData === null || slotsData === void 0 ? void 0 : slotsData.selectedTimezone,
      meetingTitle: slotsData === null || slotsData === void 0 ? void 0 : slotsData.meetingTitle,
      bobjectId: activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id2 = activeBobject.id) === null || _activeBobject$id2 === void 0 ? void 0 : _activeBobject$id2.value
    };
  };
  var formIsValid = function formIsValid() {
    var body = getValues('body');
    var subject = getValues('subject');
    var emailTo = getValues('to');
    if (isMissingVariable(body) || isMissingVariable(subject) && editorMode !== 'HTML') {
      createToast({
        type: 'error',
        message: t('emailModal.toasts.errorVariableGeneric')
      });
      return false;
    } else if ((emailTo === null || emailTo === void 0 ? void 0 : emailTo.length) === 0) {
      createToast({
        type: 'error',
        message: t('emailModal.toasts.errorEmailTo')
      });
      return false;
    } else if (!subject || (subject === null || subject === void 0 ? void 0 : subject[0].children[0].text) === '') {
      createToast({
        type: 'error',
        message: t('emailModal.toasts.errorSubject')
      });
      return false;
    }
    return true;
  };
  var sendEmail = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator$3( /*#__PURE__*/_regeneratorRuntime$3().mark(function _callee(data) {
      var email, response, _data$to, _data$to2, _data$to3, _e$response, _e$response2, _e$response2$data, _e$response3, _e$response3$data, _e$response4, _e$response4$data, _e$response7, _e$response8, _e$response5, _e$response5$data, _e$response5$data$err, _e$response6, _e$response6$data, errorVariable;
      return _regeneratorRuntime$3().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setSending(true);
            _context.prev = 1;
            email = prepareEmail(data, activeBobject);
            _context.next = 5;
            return api.post('/messaging/emails', email);
          case 5:
            response = _context.sent;
            if (response.status === 201) {
              setSending(false);
              mixpanel.track(isBlankEmail ? 'NEW_BLANK_EMAIL_SENT' : "TEMPLATE_FROM_BB_".concat(mode), {
                'Template Id': data === null || data === void 0 ? void 0 : data.templateId,
                'To Emails': (_data$to = data.to) === null || _data$to === void 0 ? void 0 : _data$to.length
              });
              mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SEND_EMAIL_ON_EMAIL_MODAL);
              createToast({
                type: 'success',
                message: t('emailModal.toasts.success')
              });
              window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                detail: {
                  type: BobjectTypes.Activity
                }
              }));
              save(UserHelperKeys.SEND_YOUR_FIRST_EMAIL);
              closeModal();
              onSave === null || onSave === void 0 ? void 0 : onSave();
            } else if (response.status >= 400) {
              setSending(false);
              mixpanel.track('EMAIL_SENT_WARNINGS', {
                'Template Id': data === null || data === void 0 ? void 0 : data.templateId,
                'To Emails': (_data$to2 = data.to) === null || _data$to2 === void 0 ? void 0 : _data$to2.length
              });
              createToast({
                type: 'warning',
                message: t('emailModal.toasts.delay')
              });
            }
            _context.next = 14;
            break;
          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            setSending(false);
            mixpanel.track('EMAIL_SENT_FAILED', {
              'Template Id': data === null || data === void 0 ? void 0 : data.templateId,
              'To Emails': (_data$to3 = data.to) === null || _data$to3 === void 0 ? void 0 : _data$to3.length
            });

            // errorType: "UNABLE_TO_REPLACE_VARIABLES:Sender:MobilePhone"
            if (_context.t0 !== null && _context.t0 !== void 0 && _context.t0.response && ((_e$response = _context.t0.response) === null || _e$response === void 0 ? void 0 : _e$response.status) === 500 && ((_e$response2 = _context.t0.response) !== null && _e$response2 !== void 0 && (_e$response2$data = _e$response2.data) !== null && _e$response2$data !== void 0 && _e$response2$data.errorType && (_e$response3 = _context.t0.response) !== null && _e$response3 !== void 0 && (_e$response3$data = _e$response3.data) !== null && _e$response3$data !== void 0 && _e$response3$data.errorType.includes('UNABLE_TO_REPLACE_VARIABLES') || (_e$response4 = _context.t0.response) !== null && _e$response4 !== void 0 && (_e$response4$data = _e$response4.data) !== null && _e$response4$data !== void 0 && _e$response4$data.message.includes('missing-variable'))) {
              // Get the variable name from the error message after UNABLE_TO_REPLACE_VARIABLES:
              errorVariable = (_e$response5 = _context.t0.response) === null || _e$response5 === void 0 ? void 0 : (_e$response5$data = _e$response5.data) === null || _e$response5$data === void 0 ? void 0 : (_e$response5$data$err = _e$response5$data.errorType) === null || _e$response5$data$err === void 0 ? void 0 : _e$response5$data$err.substring(((_e$response6 = _context.t0.response) === null || _e$response6 === void 0 ? void 0 : (_e$response6$data = _e$response6.data) === null || _e$response6$data === void 0 ? void 0 : _e$response6$data.errorType.indexOf(':')) + 1);
              createToast({
                type: 'error',
                message: errorVariable ? t('emailModal.toasts.errorVariable', {
                  variable: errorVariable
                }) : t('emailModal.toasts.errorVariableGeneric')
              });
            } else if (_context.t0 !== null && _context.t0 !== void 0 && _context.t0.response && ((_e$response7 = _context.t0.response) === null || _e$response7 === void 0 ? void 0 : _e$response7.status) === 413) {
              createToast({
                type: 'error',
                message: t('emailModal.toasts.fileExceedSize')
              });
            } else if (_context.t0 !== null && _context.t0 !== void 0 && _context.t0.response && ((_e$response8 = _context.t0.response) === null || _e$response8 === void 0 ? void 0 : _e$response8.status) === 401) {
              createToast({
                type: 'error',
                message: t('emailModal.toasts.disconnected')
              });
            } else {
              createToast({
                type: 'error',
                message: t('emailModal.toasts.error')
              });
            }
          case 14:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 9]]);
    }));
    return function sendEmail(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  var scheduleEmail = function scheduleEmail(_ref4) {
    var date = _ref4.date,
      timezone = _ref4.timezone;
    return /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator$3( /*#__PURE__*/_regeneratorRuntime$3().mark(function _callee2(data) {
        var email, response, formattedDate;
        return _regeneratorRuntime$3().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              setScheduleEmailModalOpen(false);
              email = prepareEmail(data, activeBobject);
              _context2.next = 5;
              return api.post('/messaging/scheduledEmails', {
                scheduledTime: date,
                email: email
              });
            case 5:
              response = _context2.sent;
              if (response.status === 201) {
                formattedDate = spacetime(date, timezone).format('{date-ordinal} {month-short}, {time-24} in {timezone}').replace('_', ' ').replace(/\w+\//, '');
                createToast({
                  type: 'action',
                  duration: 7500,
                  message: t('emailModal.toasts.scheduled', {
                    date: formattedDate
                  }),
                  actions: scheduleEmailRedirect ? [{
                    text: t('emailModal.toasts.scheduleAction'),
                    color: 'tomato',
                    onClick: scheduleEmailRedirect
                  }] : []
                });
                closeModal();
                setTimeout(function () {
                  onSave === null || onSave === void 0 ? void 0 : onSave();
                }, 1000);
              } else {
                createToast({
                  type: 'error',
                  message: t('emailModal.toasts.scheduledError')
                });
              }
              _context2.next = 12;
              break;
            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              createToast({
                type: 'error',
                message: t('emailModal.toasts.scheduledError')
              });
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 9]]);
      }));
      return function (_x3) {
        return _ref5.apply(this, arguments);
      };
    }();
  };
  var cancelScheduledEmail = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator$3( /*#__PURE__*/_regeneratorRuntime$3().mark(function _callee3() {
      return _regeneratorRuntime$3().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            setIsEditorDisabled(false);
            _context3.next = 4;
            return api["delete"]("/messaging/scheduledEmails/".concat(taskId, "/cancel"), {
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              },
              data: {}
            });
          case 4:
            createToast({
              type: 'success',
              message: t('emailModal.toasts.scheduledCancelled'),
              position: 'top-right'
            });
            _context3.next = 11;
            break;
          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            setIsEditorDisabled(true);
            createToast({
              type: 'error',
              message: t('emailModal.toasts.scheduledCancelledError'),
              position: 'top-right'
            });
          case 11:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 7]]);
    }));
    return function cancelScheduledEmail() {
      return _ref6.apply(this, arguments);
    };
  }();
  var markEmailAsRead = function markEmailAsRead() {
    var _activity$id;
    api.patch("/bobjects/".concat(activity === null || activity === void 0 ? void 0 : (_activity$id = activity.id) === null || _activity$id === void 0 ? void 0 : _activity$id.value, "/raw"), {
      contents: _defineProperty$8({}, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED, REPORTED_VALUES_LOGIC_ROLE.YES),
      params: {}
    }).then(function () {
      closeModal();
    });
  };

  /*  const emailTitle = useMemo(() => {
    if (!subject) {
      return t('emailModal.subjectNewEmail');
    }
    const subjectWithoutVariables = deserialize(JSON.stringify(subject), {
      format: 'AST',
      plugins: subjectPlugins,
    });
    return removeHtmlTags(
      serialize(subjectWithoutVariables, { format: 'AST', plugins: subjectPlugins }),
    );
  }, [subject]);*/

  var replaceBodyWithTemplate = function replaceBodyWithTemplate(template) {
    //@ts-ignore
    var content = template.content,
      body = template.body,
      format = template.format,
      mediaFiles = template.mediaFiles;
    var rawNewBody;
    var emailTemplateBody;
    if (format === 'HTML') {
      setHtmlContent(content || body);
      return;
    } else {
      rawNewBody = deserialize(content || body, {
        format: format,
        plugins: bodyPlugins
      });
      emailTemplateBody = JSON.parse(JSON.stringify(rawNewBody));
      var isSignatureAlreadyInserted = rawNewBody.some(function (node) {
        return node.type === 'raw-html-block';
      });
      if (enabledAutoInsertSignature && !isSignatureAlreadyInserted && signature !== null && signature !== void 0 && signature.signature) {
        emailTemplateBody.push(createParagraph('')[0]);
        emailTemplateBody.push(createRawHTMLBlock(bodyEditor, signature.signature));
      }
    }
    var isReplyHistoryAlreadyInserted = rawNewBody.some(function (node) {
      return node.type === 'reply-history';
    });
    if (activityMessageBody && !isReplyHistoryAlreadyInserted && !activityMessageBody.includes('Content too long to display')) {
      emailTemplateBody.push(createParagraph('')[0]);
      emailTemplateBody.push(createReplyHistory(bodyEditor, {
        html: activityMessageBody,
        sentAt: activityDateTime,
        sentBy: isIncomingActivity ? activityEmailLead : activityEmail
      }));
    }
    setTemplateMediaFiles(mediaFiles);
    resetEditorChildren(bodyEditor);
    insertElements(bodyEditor, emailTemplateBody, {
      at: [0]
    });
    select(bodyEditor, [0]);
    setValue('body', emailTemplateBody);
  };
  var replaceSubjectWithTemplate = function replaceSubjectWithTemplate(template) {
    var subject = template.subject,
      format = template.format;
    var emailTemplateSubject;
    if (subject && format !== 'HTML') {
      if (subject.includes('"type"')) {
        var rawNewSubject = deserialize(subject, {
          format: format,
          plugins: subjectPlugins
        });
        emailTemplateSubject = JSON.parse(JSON.stringify(rawNewSubject));
      } else {
        emailTemplateSubject = subject;
      }
    } else {
      if (format === 'HTML') {
        emailTemplateSubject = createParagraph(subject);
      } else {
        emailTemplateSubject = subject;
      }
    }
    if (!isModeReply) {
      resetEditorChildren(subjectEditor);
      insertElements(subjectEditor, emailTemplateSubject, {
        at: [0]
      });
      setValue('subject', emailTemplateSubject, {
        shouldValidate: true
      });
    }
  };
  var replaceWithTemplate = function replaceWithTemplate(template, isEditorDisabled) {
    if (template && !isEditorDisabled) {
      setEditorMode((template === null || template === void 0 ? void 0 : template.format) || 'AST');

      //@ts-ignore
      if (bodyEditor && template !== null && template !== void 0 && template.content) replaceBodyWithTemplate(template);
      if (subjectEditor && template !== null && template !== void 0 && template.subject) replaceSubjectWithTemplate(template);
      if (bodyEditor && subjectEditor) {
        bodyEditor.history = {
          undos: [],
          redos: []
        };
        subjectEditor.history = {
          undos: [],
          redos: []
        };
        templateSelectProps.onChange(template === null || template === void 0 ? void 0 : template.id);
      }
    }
  };
  var handleClose = function handleClose() {
    setTooltipVisible(false);
    if (isDirty || hasBeenMinimized) {
      openConfirmModal(function () {
        return setTooltipVisible(true);
      });
    } else {
      closeModal();
    }
  };
  var handleMinimize = function handleMinimize() {
    var minimizeSavedData = _objectSpread$6(_objectSpread$6({}, getValues()), {}, {
      attachments: attachedFiles,
      htmlContent: htmlContent
    });
    var title = removeHtmlTags(serialize(methods.getValues('subject'), {
      format: 'AST',
      plugins: subjectPlugins
    }));
    minimize({
      data: {
        savedData: minimizeSavedData,
        editorMode: editorMode
      },
      title: title
    });
  };
  var handleSaveSnippet = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator$3( /*#__PURE__*/_regeneratorRuntime$3().mark(function _callee4(node) {
      return _regeneratorRuntime$3().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return setSelectedTemplate(null);
          case 2:
            // @ts-ignore
            setSelectedTemplate({
              content: node,
              type: TEMPLATE_TYPES.SNIPPET,
              edit: true
            });
            setSelectedTab(SmartEmailTab.TEMPLATES);
          case 4:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function handleSaveSnippet(_x4) {
      return _ref7.apply(this, arguments);
    };
  }();
  var handleSaveTemplate = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator$3( /*#__PURE__*/_regeneratorRuntime$3().mark(function _callee5() {
      var _getValues, body, subject, _getSlotsNodePosition, slotsNode;
      return _regeneratorRuntime$3().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _getValues = getValues(), body = _getValues.body, subject = _getValues.subject;
            _context5.next = 3;
            return setSelectedTemplate(null);
          case 3:
            _getSlotsNodePosition = getSlotsNodePosition(bodyEditor), slotsNode = _getSlotsNodePosition.slotsNode;
            if (slotsNode) {
              setSaveWithSlotsModal({
                isOpen: true,
                callback: function callback() {
                  setSelectedTemplate({
                    content: body.filter(function (node) {
                      return node.type !== 'raw-html-block' && node.type !== 'reply-history' && node.type !== 'slots-form';
                    }),
                    subject: subject,
                    type: TEMPLATE_TYPES.EMAIL,
                    edit: true
                  });
                  setSelectedTab(SmartEmailTab.TEMPLATES);
                  setSaveWithSlotsModal({
                    isOpen: false,
                    callback: undefined
                  });
                }
              });
            } else {
              setSelectedTemplate({
                content: body.filter(function (node) {
                  return node.type !== 'raw-html-block' && node.type !== 'reply-history';
                }),
                subject: subject,
                type: TEMPLATE_TYPES.EMAIL,
                edit: true
              });
              setSelectedTab(SmartEmailTab.TEMPLATES);
            }
          case 5:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function handleSaveTemplate() {
      return _ref8.apply(this, arguments);
    };
  }();
  function handleEvent(e) {
    if (e.key === 'Tab') {
      e.stopPropagation();
      var focusedEditor = [subjectEditor, bodyEditor][focusedRef.current];
      var focusPoint = getFocusPoint(focusedEditor, focusedRef.current);
      setTimeout(function () {
        return focusEditor(focusedEditor, focusPoint);
      }, 0);
      updateFocusedIndex();
    }
  }
  var memoedFunction = useCallback(handleEvent, [editorsStored]);
  useEffect(function () {
    if ((signatures === null || signatures === void 0 ? void 0 : signatures.length) > 0 && emailFrom) {
      var _connection = connections.list.find(function (connection) {
        return connection.email === emailFrom;
      });
      setConnectionId(_connection === null || _connection === void 0 ? void 0 : _connection.id);
    }
  }, [connections, signatures, emailFrom]);
  useEffect(function () {
    if (bodyEditor) {
      var _connection2 = connections.list.find(function (connection) {
        return connection.email === emailFrom;
      });
      getSignatureConnection(_connection2 === null || _connection2 === void 0 ? void 0 : _connection2.id).then(function (signature) {
        if (signature && enabledAutoInsertSignature) {
          replaceHTMLBlock(bodyEditor, 'signature', ELEMENT_RAW_HTML_BLOCK, signature === null || signature === void 0 ? void 0 : signature.signature);
        }
      });
    }
  }, [emailFrom, connections, signatures]);
  useEffect(function () {
    if (!has(ExtensionHelperKeys.EMAIL_ACTION_TOOLTIP)) {
      save(ExtensionHelperKeys.EMAIL_ACTION_TOOLTIP);
    }
    if (hasBeenMinimized) {
      setRelatedBobjectsInfo({
        company: company,
        activeBobject: activeLead || company
      });
    }
    if (isExtension) {
      removeScrollOfBox();
    }
    if (Array.isArray(formAttachments)) syncAttachments(formAttachments);
    if (mode === 'REPLY') setSelectedActivity(activity);
    return recoverScrollOfBox;
  }, []);
  useEffect(function () {
    if ((!emailFrom || emailFrom === 'no-connections') && connections !== null && connections !== void 0 && connections.defaultConnection) {
      setValue('emailFrom', connections === null || connections === void 0 ? void 0 : connections.defaultConnection);
    }
  }, [connections]);
  useEffect(function () {
    // Insert user email signature
    if (signature && isEditorRegistered && editorMode === 'AST') {
      var newBody = JSON.parse(JSON.stringify(defaultValues.body));
      var isSignatureAlreadyInserted = newBody.some(function (node) {
        return node.type === 'raw-html-block';
      });
      var isReplyHistoryAlreadyInserted = newBody.some(function (node) {
        return node.type === 'reply-history';
      });
      var changed = false;
      if (!hasBeenMinimized) {
        if (enabledAutoInsertSignature && !isSignatureAlreadyInserted && signature !== null && signature !== void 0 && signature.signature) {
          changed = true;
          newBody.push(createParagraph('')[0]);
          newBody.push(createRawHTMLBlock(bodyEditor, signature.signature));
        }
        if (activityMessageBody && !isReplyHistoryAlreadyInserted && !activityMessageBody.includes('Content too long to display')) {
          var activityMessageBodyWithoutPx = activityMessageBody.replace(/<[^>]+src="https:(\/\/nyl\.as|.*.nylas.com).*[^>]*>/g, '');
          changed = true;
          newBody.push(createParagraph('')[0]);
          newBody.push(createReplyHistory(bodyEditor, {
            html: activityMessageBodyWithoutPx,
            sentAt: activityDateTime,
            sentBy: isIncomingActivity ? activityEmailLead : activityEmail
          }));
        }
      }
      if (changed) {
        resetEditorChildren(bodyEditor);
        insertElements(bodyEditor, newBody);
        select(bodyEditor, [0]);
        setValue('body', newBody, {
          shouldDirty: false
        });
      }
    }
  }, [signature, isEditorRegistered, activityMessageBody, activityEmailLead, activityEmail, isIncomingActivity]);
  useEffect(function () {
    // @ts-ignore
    if (connections !== null && connections !== void 0 && connections.loaded && activityEmail) {
      setValue('emailFrom', activityEmail);
    }
    // @ts-ignore
  }, [connections === null || connections === void 0 ? void 0 : connections.loaded, activityEmail]);
  useEffect(function () {
    if (templateMediaFiles) {
      syncAttachments(templateMediaFiles);
    }
  }, [templateMediaFiles]);
  useEffect(function () {
    var _template$mediaFiles;
    // sync attachments from minimized template
    if ((template === null || template === void 0 ? void 0 : (_template$mediaFiles = template.mediaFiles) === null || _template$mediaFiles === void 0 ? void 0 : _template$mediaFiles.length) > 0 && !templateMediaFiles) {
      syncAttachments(template.mediaFiles);
      setTemplateMediaFiles(template.mediaFiles);
    }
  }, [template]);
  useEffect(function () {
    if (templateId && editorMode === 'AST') {
      var bodyDeserialized = deserialize(JSON.stringify(methods.getValues('body')), {
        format: 'AST',
        plugins: bodyPlugins
      });
      var subjectDeserialized = deserialize(JSON.stringify(methods.getValues('subject')), {
        format: 'AST',
        plugins: subjectPlugins
      });
      if (isMissingVariable(bodyDeserialized, false) || isMissingVariable(subjectDeserialized, false)) {
        setMissingVariable(true);
      } else {
        setMissingVariable(false);
      }
    }
  }, [templateId]);
  useEffect(function () {
    if (!hasBeenMinimized && bodyEditor && subjectEditor && template !== null && template !== void 0 && template.id && oldTemplateId.current !== template.id) {
      // @ts-ignore
      replaceWithTemplate(template, isEditorDisabled);
      oldTemplateId.current = template.id;
    }
    updateReplaceMethod(function (template) {
      return replaceWithTemplate(template, isEditorDisabled);
    });
  }, [bodyEditor, subjectEditor, signature, activityMessageBody, activityMessageSubject, mode, template, isEditorDisabled]);
  useEffect(function () {
    if (editorMode === 'HTML') {
      window.removeEventListener('keydown', memoedFunction);
      return;
    }
    if (!bodyEditor || !subjectEditor) return;
    window.addEventListener('keydown', memoedFunction);
    return function () {
      window.removeEventListener('keydown', memoedFunction);
    };
  }, [subjectEditor, bodyEditor, editorMode]);
  useEffect(function () {
    if (subjectEditor && bodyEditor && !(defaultValues !== null && defaultValues !== void 0 && defaultValues.templateId) && (suggestedTemplates === null || suggestedTemplates === void 0 ? void 0 : suggestedTemplates.length) === 1) {
      replaceWithTemplate(suggestedTemplates[0], isEditorDisabled);
      setAutofilledTemplate(suggestedTemplates[0].taskTitle);
    }
  }, [suggestedTemplates === null || suggestedTemplates === void 0 ? void 0 : suggestedTemplates.length, subjectEditor, bodyEditor, defaultValues === null || defaultValues === void 0 ? void 0 : defaultValues.templateId, isEditorDisabled]);
  var PreviewEmailButton = function PreviewEmailButton() {
    return /*#__PURE__*/jsx(Button, {
      variant: "secondary",
      size: "small",
      iconLeft: isOpenPreview ? 'eyeOff' : 'eye',
      onClick: togglePreview,
      uppercase: false,
      children: t('emailModal.preview')
    });
  };
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsxs(FormProvider, _objectSpread$6(_objectSpread$6({}, methods), {}, {
      children: [/*#__PURE__*/jsx(Modal, {
        open: open,
        onClose: handleClose,
        width: 1106,
        onOverlayClick: handleMinimize,
        children: /*#__PURE__*/jsx("div", {
          className: styles$c.modal_email_container,
          children: /*#__PURE__*/jsxs("div", {
            className: styles$c.container_email,
            children: [/*#__PURE__*/jsxs("div", {
              className: styles$c._header__container,
              children: [/*#__PURE__*/jsxs("div", {
                className: styles$c._header__info,
                children: [/*#__PURE__*/jsxs("div", {
                  className: styles$c._header_companyName,
                  onClick: handleRedirect,
                  children: [/*#__PURE__*/jsx(IconButton, {
                    name: "company",
                    size: 24
                  }), /*#__PURE__*/jsx(Text, {
                    size: "m",
                    weight: "regular",
                    color: "bloobirds",
                    children: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME) || ''
                  })]
                }), /*#__PURE__*/jsx(Text, {
                  size: "s",
                  weight: "medium",
                  children: t('emailModal.subjectNewEmail')
                })]
              }), /*#__PURE__*/jsxs("div", {
                className: styles$c._header_icons,
                children: [canMinimize && /*#__PURE__*/jsx(IconButton, {
                  name: "minus",
                  size: 20,
                  onClick: handleMinimize
                }), /*#__PURE__*/jsx(IconButton, {
                  name: "cross",
                  size: 24,
                  onClick: handleClose
                })]
              })]
            }), !hasConnections && /*#__PURE__*/jsx(Banner, {
              icon: "disconnectOutline",
              type: "warning",
              children: /*#__PURE__*/jsxs(Trans, {
                i18nKey: "emailModal.emptyConnection",
                children: ["You need a connected email to send one-to-one emails from Bloobirds. Go to", /*#__PURE__*/jsx(BannerLink, {
                  onClick: emailSettingsRedirect,
                  children: "Email settings"
                }), " to connect."]
              })
            }), isScheduledEmail && !isFailedAutomation && isEditorDisabled && /*#__PURE__*/jsx(Banner, {
              type: "warning",
              icon: "clock",
              children: /*#__PURE__*/jsx(Trans, {
                i18nKey: "emailModal.emailScheduled",
                values: {
                  date: spacetime(scheduledDate, 'UTC').format('{day} {date-ordinal} at {time-24}')
                },
                components: [/*#__PURE__*/jsx(BannerLink, {
                  onClick: cancelScheduledEmail,
                  children: ' '
                }, "1")]
              })
            }), isScheduledEmail && isFailedAutomation && isEditorDisabled && /*#__PURE__*/jsxs(Banner, {
              type: "error",
              icon: "cross",
              children: ["An error occurred and your email could not be sent", ' ', /*#__PURE__*/jsx(BannerLink, {
                onClick: cancelScheduledEmail,
                children: /*#__PURE__*/jsx(Text, {
                  htmlTag: "span",
                  size: "s",
                  color: "bloobirds",
                  children: "Edit & schedule again"
                })
              })]
            }), /*#__PURE__*/jsxs("div", {
              className: styles$c._modal_body_container,
              children: [/*#__PURE__*/jsxs("div", {
                className: styles$c._modal_body,
                children: [/*#__PURE__*/jsxs("form", {
                  onSubmit: function onSubmit() {
                    if (selectedTab === SmartEmailTab.CREATE_TASK && taskTitle) {
                      setConfirmModal(true);
                    } else {
                      handleSubmit(sendEmail)();
                    }
                  },
                  className: styles$c._container_ast,
                  "data-intercom": "send-email-modal",
                  children: [/*#__PURE__*/jsxs(EmailModalRow, {
                    isDisabled: isEditorDisabled,
                    children: [/*#__PURE__*/jsx(Text, {
                      size: "m",
                      color: "verySoftPeanut",
                      children: t('emailModal.from')
                    }), /*#__PURE__*/jsx(ClearSelect, _objectSpread$6(_objectSpread$6({}, emailFromProps), {}, {
                      options: Array.from(new Set(emailsFrom)),
                      emptyMessage: t('emailModal.noEmailsConnectedYet')
                    })), /*#__PURE__*/jsx("div", {
                      className: styles$c.inputControls,
                      children: !showCc && /*#__PURE__*/jsx(Button, {
                        size: "small",
                        variant: "clear",
                        onClick: function onClick() {
                          return setShowCc(true);
                        },
                        children: t('emailModal.cc')
                      })
                    })]
                  }), showCc && /*#__PURE__*/jsxs(Fragment, {
                    children: [/*#__PURE__*/jsxs(EmailModalRow, {
                      isDisabled: isEditorDisabled,
                      children: [/*#__PURE__*/jsx(Text, {
                        size: "m",
                        color: "verySoftPeanut",
                        children: t('emailModal.cc')
                      }), /*#__PURE__*/jsx(RecipientSearchInput, {
                        id: "emailCc-no-contacts",
                        emails: (_emailCcProps$value = emailCcProps.value) === null || _emailCcProps$value === void 0 ? void 0 : _emailCcProps$value.filter(function (e) {
                          return e !== (connections === null || connections === void 0 ? void 0 : connections.defaultConnection);
                        }),
                        onChange: function onChange(contacts) {
                          emailCcProps.onChange(contacts.map(function (x) {
                            return x === null || x === void 0 ? void 0 : x.email;
                          }));
                        },
                        contextProps: inputContextProps
                      })]
                    }), /*#__PURE__*/jsxs(EmailModalRow, {
                      isDisabled: isEditorDisabled,
                      children: [/*#__PURE__*/jsx(Text, {
                        size: "m",
                        color: "verySoftPeanut",
                        children: t('emailModal.bcc')
                      }), /*#__PURE__*/jsx(RecipientSearchInput, {
                        id: "emailBcc-no-contacts",
                        emails: (_emailBccProps$value = emailBccProps.value) === null || _emailBccProps$value === void 0 ? void 0 : _emailBccProps$value.filter(function (e) {
                          return e !== (connections === null || connections === void 0 ? void 0 : connections.defaultConnection);
                        }),
                        onChange: function onChange(contacts) {
                          emailBccProps.onChange(contacts.map(function (x) {
                            return x === null || x === void 0 ? void 0 : x.email;
                          }));
                        },
                        contextProps: inputContextProps
                      })]
                    })]
                  }), /*#__PURE__*/jsxs(EmailModalRow, {
                    isDisabled: isEditorDisabled,
                    children: [/*#__PURE__*/jsx(Text, {
                      size: "m",
                      color: "verySoftPeanut",
                      children: t('emailModal.to')
                    }), /*#__PURE__*/jsx(RecipientSearchInput, {
                      emails: (_emailToProps$value = emailToProps.value) === null || _emailToProps$value === void 0 ? void 0 : _emailToProps$value.filter(function (e) {
                        return e !== (connections === null || connections === void 0 ? void 0 : connections.defaultConnection);
                      }),
                      id: "emailTo-no-contacts",
                      onChange: function onChange(contacts) {
                        emailToProps.onChange(contacts.map(function (x) {
                          var _x$email;
                          return x === null || x === void 0 ? void 0 : (_x$email = x.email) === null || _x$email === void 0 ? void 0 : _x$email.toLowerCase();
                        }));
                      },
                      contextProps: inputContextProps
                    })]
                  }), /*#__PURE__*/jsx(EmailModalRow, {
                    callback: function callback() {
                      return focusedRef.current = 0;
                    },
                    isDisabled: isEditorDisabled,
                    children: /*#__PURE__*/jsx(SubjectEditor, {
                      setSubjectEditor: setSubjectEditor,
                      validator: function validator() {
                        return (template === null || template === void 0 ? void 0 : template.format) === 'HTML';
                      },
                      defaultValue: hasBeenMinimized && (savedData === null || savedData === void 0 ? void 0 : savedData.subject),
                      children: function children(editor) {
                        return /*#__PURE__*/jsxs(Fragment, {
                          children: [editor, subjectEditor && /*#__PURE__*/jsx(FloatingTemplateVariable, {
                            editor: subjectEditor,
                            disableEmpty: true
                          })]
                        });
                      }
                    })
                  }), /*#__PURE__*/jsxs("div", {
                    id: "emailBody",
                    className: styles$c._editor__container,
                    "data-intercom": "send-email-modal-body",
                    onClick: function onClick() {
                      return focusedRef.current = 1;
                    },
                    children: [isEditorDisabled && /*#__PURE__*/jsx("div", {
                      className: styles$c.disabledOverlay
                    }), editorMode === 'HTML' ? /*#__PURE__*/jsx(HTMLEditor, {
                      content: htmlContent,
                      onContentChange: setHtmlContent,
                      uploadAttachedFile: uploadAttachedFile,
                      templateId: templateId
                    }) : /*#__PURE__*/jsx(BodyEditor, {
                      setBodyEditor: setBodyEditor,
                      handleSaveSnippet: handleSaveSnippet
                      //attachedLinks={attachedLinks}
                      ,
                      defaultValue: hasBeenMinimized && (savedData === null || savedData === void 0 ? void 0 : savedData.body),
                      children: function children(editor) {
                        return /*#__PURE__*/jsxs(Fragment, {
                          children: [/*#__PURE__*/jsxs(EditorToolbar, {
                            children: [/*#__PURE__*/jsx(EditorToolbarControlsSection, {
                              color: "white"
                            }), /*#__PURE__*/jsx(EditorToolbarFontStylesSection, {
                              color: "white",
                              enableChangeSize: true
                            }), /*#__PURE__*/jsx(EditorToolbarTextMarksSection, {
                              color: "white",
                              editor: bodyEditor,
                              enableChangeColor: true
                            }), /*#__PURE__*/jsx(EditorToolbarListsSection, {
                              color: "white"
                            }), /*#__PURE__*/jsxs(EditorToolbarSection, {
                              children: [hasSnippetsEnabled && /*#__PURE__*/jsx(EditorToolbarSnippet, {
                                onClick: function onClick() {
                                  setSelectedTab(SmartEmailTab.TEMPLATES);
                                  setPlaybookTab(PlaybookTab.SNIPPETS);
                                }
                              }), /*#__PURE__*/jsx(EditorToolbarMeetingLink, {
                                editor: bodyEditor
                              }), /*#__PURE__*/jsx(EditorToolbarFileAttachment, {
                                onAttachment: uploadAttachedFile
                              }), /*#__PURE__*/jsx(EditorToolbarImage, {
                                editor: bodyEditor
                              }), /*#__PURE__*/jsx(EditorToolbarTemplateVariable, {
                                disableEmpty: true,
                                editor: bodyEditor
                              })]
                            }), hasTimeSlotsEnabled && /*#__PURE__*/jsxs(Fragment, {
                              children: [/*#__PURE__*/jsx(EditorToolbarSection, {
                                children: /*#__PURE__*/jsx(EditorToolbarTimeSlots, {
                                  toggleTimeSlots: function toggleTimeSlots() {
                                    setSlotsData(function (prevSlotsData) {
                                      return _objectSpread$6(_objectSpread$6({}, prevSlotsData), {}, {
                                        calendarSlotsVisible: true
                                      });
                                    });
                                    setSelectedTab(SmartEmailTab.CALENDAR);
                                    mixpanel.track(MIXPANEL_EVENTS.OPEN_CALENDAR_SLOTS);
                                  }
                                })
                              }), /*#__PURE__*/jsx(SlotsDiscoveryTooltip, {})]
                            }), enabledSelectSignature && /*#__PURE__*/jsx(EditorToolbarSelectSignatureSection, {
                              color: "white"
                            }), /*#__PURE__*/jsx("div", {
                              className: styles$c.show_preview_wrapper,
                              children: /*#__PURE__*/jsx(PreviewEmailButton, {})
                            })]
                          }), /*#__PURE__*/jsx(MessagingTemplatesButton, {
                            user: user,
                            value: templateSelectProps.value,
                            onClick: function onClick() {
                              setSelectedTab(SmartEmailTab.TEMPLATES);
                              setPlaybookTab(PlaybookTab.EMAILS);
                              if (selectedTemplate) {
                                setSelectedTemplate(undefined);
                              }
                            },
                            isPlaybookTab: selectedTab === SmartEmailTab.TEMPLATES,
                            autofilledTemplate: autofilledTemplate
                          }), /*#__PURE__*/jsxs("div", {
                            className: styles$c._editor__container_ast,
                            children: [/*#__PURE__*/jsx(FakeDropzone, {
                              editor: bodyEditor
                            }), editor]
                          })]
                        });
                      }
                    })]
                  })]
                }), /*#__PURE__*/jsxs("footer", {
                  className: styles$c.footer,
                  children: [(attachedFiles === null || attachedFiles === void 0 ? void 0 : attachedFiles.length) > 0 && /*#__PURE__*/jsx(AttachmentList, {
                    files: attachedFiles,
                    onDelete: removeAttachedFile
                  }), (attachedLinks === null || attachedLinks === void 0 ? void 0 : attachedLinks.length) > 0 && /*#__PURE__*/jsx(AttachmentLinkList, {
                    files: attachedLinks,
                    onDelete: removeAttachedLink
                  }), /*#__PURE__*/jsxs("div", {
                    className: styles$c.footerActions,
                    children: [/*#__PURE__*/jsx("span", {
                      "data-intercom": "send-email-modal-action-cancel",
                      children: !isSubmitting && !isEditorDisabled && /*#__PURE__*/jsx(Button, {
                        variant: "clear",
                        color: "tomato",
                        onClick: handleClose,
                        disabled: isSubmitting,
                        children: t('emailModal.discard')
                      })
                    }), /*#__PURE__*/jsxs("div", {
                      className: styles$c.footerButtons,
                      children: [!isSubmitting && !isEditorDisabled && /*#__PURE__*/jsx(Button, {
                        onClick: handleSaveTemplate,
                        variant: "clear",
                        color: "purple",
                        iconLeft: "save",
                        children: isThereARealBody ? t('emailModal.saveTemplate') : t('emailModal.createTemplate')
                      }), /*#__PURE__*/jsx(Button, {
                        variant: "secondary",
                        iconLeft: isSubmitting ? undefined : 'clock',
                        onClick: handleSubmit(function () {
                          if (formIsValid()) {
                            setScheduleEmailModalOpen(true);
                          }
                        }),
                        disabled: isSubmitting || !hasConnections || !isValid || isEditorDisabled,
                        className: styles$c.scheduleButton,
                        children: isSubmitting ? /*#__PURE__*/jsx(Spinner, {
                          name: "loadingCircle",
                          color: "bloobirds",
                          size: 18
                        }) : t('emailModal.schedule')
                      }), /*#__PURE__*/jsx("span", {
                        "data-intercom": "send-email-modal-action-accept",
                        children: /*#__PURE__*/jsx(Button, {
                          className: styles$c.sendButton,
                          dataTest: "sendEmail",
                          onClick: function onClick() {
                            if (selectedTab === SmartEmailTab.CREATE_TASK && taskTitle) {
                              setConfirmModal(true);
                            } else {
                              if (sending) return;
                              if (formIsValid()) {
                                handleSubmit(sendEmail)();
                                if (isModeReply) markEmailAsRead();
                              }
                            }
                          },
                          disabled: !hasConnections || !isValid || isEditorDisabled,
                          children: sending || isSubmitting ? /*#__PURE__*/jsx(Spinner, {
                            name: "loadingCircle",
                            color: "white",
                            size: 18
                          }) : t('emailModal.send')
                        })
                      })]
                    })]
                  })]
                })]
              }), /*#__PURE__*/jsx(SmartEmailHelper, {
                error: missingVariable,
                bodyEditor: bodyEditor,
                setOpenPreview: setIsOpenPreview,
                hasAttachments: (attachedFiles === null || attachedFiles === void 0 ? void 0 : attachedFiles.length) > 0,
                hasLinks: (attachedLinks === null || attachedLinks === void 0 ? void 0 : attachedLinks.length) > 0,
                htmlContent: htmlContent,
                control: control,
                format: editorMode
              })]
            })]
          })
        })
      }), scheduleEmailModalOpen && /*#__PURE__*/jsx(ScheduleEmailModal, {
        emails: emailTo,
        onClose: function onClose() {
          return setScheduleEmailModalOpen(false);
        },
        onSubmit: /*#__PURE__*/function () {
          var _ref10 = _asyncToGenerator$3( /*#__PURE__*/_regeneratorRuntime$3().mark(function _callee6(_ref9) {
            var date, timezone;
            return _regeneratorRuntime$3().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  date = _ref9.date, timezone = _ref9.timezone;
                  _context6.next = 3;
                  return handleSubmit(scheduleEmail({
                    date: date,
                    timezone: timezone
                  }))();
                case 3:
                case "end":
                  return _context6.stop();
              }
            }, _callee6);
          }));
          return function (_x5) {
            return _ref10.apply(this, arguments);
          };
        }()
      }), /*#__PURE__*/jsx(ConfirmSendModal, {
        handleClose: function handleClose() {
          return setConfirmModal(false);
        },
        onConfirm: function onConfirm() {
          handleSubmit(sendEmail)();
          setConfirmModal(false);
        },
        open: confirmModal
      }), /*#__PURE__*/jsx(SaveWithSlotsModal, {
        handleClose: function handleClose() {
          return setSaveWithSlotsModal({
            isOpen: false,
            callback: undefined
          });
        },
        onConfirm: saveWithSlotsModal === null || saveWithSlotsModal === void 0 ? void 0 : saveWithSlotsModal.callback,
        open: saveWithSlotsModal === null || saveWithSlotsModal === void 0 ? void 0 : saveWithSlotsModal.isOpen
      })]
    }))
  });
};

function _typeof$7(obj) { "@babel/helpers - typeof"; return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$7(obj); }
var _excluded$1 = ["children", "bobjectsInfo", "accountId", "dataModel"],
  _excluded2$1 = ["handleRedirect", "scheduleEmailRedirect", "emailSettingsRedirect", "targetMarkets", "idealCustomerProfiles"];
function _regeneratorRuntime$2() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$2 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$7(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty$7(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$7(obj, key, value) { key = _toPropertyKey$7(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$7(arg) { var key = _toPrimitive$7(arg, "string"); return _typeof$7(key) === "symbol" ? key : String(key); }
function _toPrimitive$7(input, hint) { if (_typeof$7(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$7(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$5(arr) || _nonIterableSpread$1(); }
function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$5(arr); }
function _objectWithoutProperties$1(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$1(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _slicedToArray$4(arr, i) { return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$5(arr, i) || _nonIterableRest$4(); }
function _nonIterableRest$4() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$5(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$5(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen); }
function _arrayLikeToArray$5(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$4(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$4(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$2(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function fillVariables(_x, _x2) {
  return _fillVariables.apply(this, arguments);
}
function _fillVariables() {
  _fillVariables = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee(bobject, setEmailVariablesValue) {
    var _bobject$id, _bobject$bobjectType, _companyReferenceBobj, _companyReferenceBobj2, _data$raw;
    var _yield$api$get, data, companyReferenceBobject, key, bobjectType;
    return _regeneratorRuntime$2().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return api.get("/bobjects/".concat(bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.value, "/form?injectReferences=true"));
        case 2:
          _yield$api$get = _context.sent;
          data = _yield$api$get.data;
          if ((bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType) === BobjectTypes.Lead || (bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType) === BobjectTypes.Opportunity) {
            for (key in data === null || data === void 0 ? void 0 : data.referencedBobjects) {
              if (key.indexOf(BobjectTypes.Company) !== -1) {
                companyReferenceBobject = data === null || data === void 0 ? void 0 : data.referencedBobjects[key];
              }
            }
          }
          bobjectType = bobject === null || bobject === void 0 ? void 0 : (_bobject$bobjectType = bobject.bobjectType) === null || _bobject$bobjectType === void 0 ? void 0 : _bobject$bobjectType.toLowerCase();
          setEmailVariablesValue(_defineProperty$7({
            company: (_companyReferenceBobj = companyReferenceBobject) === null || _companyReferenceBobj === void 0 ? void 0 : (_companyReferenceBobj2 = _companyReferenceBobj.raw) === null || _companyReferenceBobj2 === void 0 ? void 0 : _companyReferenceBobj2.contents
          }, bobjectType, data === null || data === void 0 ? void 0 : (_data$raw = data.raw) === null || _data$raw === void 0 ? void 0 : _data$raw.contents));
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _fillVariables.apply(this, arguments);
}
var getLeadName = function getLeadName(_ref) {
  var isLead = _ref.isLead,
    activeBobject = _ref.activeBobject,
    lead = _ref.lead,
    isExtension = _ref.isExtension;
  if (isLead) {
    return isExtension ? activeBobject.fullName : getTextFromLogicRole(activeBobject, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  } else {
    return getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  }
};
var useRefreshEmailVariables = function useRefreshEmailVariables(relatedBobjectInfo) {
  var _relatedBobjectInfo$a, _relatedBobjectInfo$a2;
  var setEmailVariablesValue = useBaseSetEmailVariablesValues();
  var _useState = useState(relatedBobjectInfo === null || relatedBobjectInfo === void 0 ? void 0 : (_relatedBobjectInfo$a = relatedBobjectInfo.activeBobject) === null || _relatedBobjectInfo$a === void 0 ? void 0 : (_relatedBobjectInfo$a2 = _relatedBobjectInfo$a.id) === null || _relatedBobjectInfo$a2 === void 0 ? void 0 : _relatedBobjectInfo$a2.value),
    _useState2 = _slicedToArray$4(_useState, 2),
    previousBobject = _useState2[0],
    setPreviousBobject = _useState2[1];
  var resetEmailVariablesValue = useBaseResetEmailVariablesValues();
  useEffect(function () {
    var _relatedBobjectInfo$a3, _relatedBobjectInfo$a4;
    if (previousBobject !== (relatedBobjectInfo === null || relatedBobjectInfo === void 0 ? void 0 : (_relatedBobjectInfo$a3 = relatedBobjectInfo.activeBobject) === null || _relatedBobjectInfo$a3 === void 0 ? void 0 : (_relatedBobjectInfo$a4 = _relatedBobjectInfo$a3.id) === null || _relatedBobjectInfo$a4 === void 0 ? void 0 : _relatedBobjectInfo$a4.value)) {
      if (relatedBobjectInfo !== null && relatedBobjectInfo !== void 0 && relatedBobjectInfo.activeBobject) {
        var _relatedBobjectInfo$a5, _relatedBobjectInfo$a6;
        fillVariables(relatedBobjectInfo === null || relatedBobjectInfo === void 0 ? void 0 : relatedBobjectInfo.activeBobject, setEmailVariablesValue);
        setPreviousBobject(relatedBobjectInfo === null || relatedBobjectInfo === void 0 ? void 0 : (_relatedBobjectInfo$a5 = relatedBobjectInfo.activeBobject) === null || _relatedBobjectInfo$a5 === void 0 ? void 0 : (_relatedBobjectInfo$a6 = _relatedBobjectInfo$a5.id) === null || _relatedBobjectInfo$a6 === void 0 ? void 0 : _relatedBobjectInfo$a6.value);
      } else {
        resetEmailVariablesValue();
        setPreviousBobject(null);
      }
    }
  }, [relatedBobjectInfo === null || relatedBobjectInfo === void 0 ? void 0 : relatedBobjectInfo.activeBobject]);
};
var SmartEmailModalContext = /*#__PURE__*/createContext(null);
function updateIndex(count, editorsStored, length) {
  if (!editorsStored) return count === 0 ? 1 : 0;
  return count === length - 1 ? 0 : count + 1;
}
var SmartEmailModalProvider = function SmartEmailModalProvider(_ref2) {
  var _bobjectsInfo$activeB, _bobjectsInfo$activeB2, _bobjectsInfo$activeB3, _bobjectsInfo$lead, _bobjectsInfo$lead$id, _settings$account, _relatedBobjectsInfo$, _relatedBobjectsInfo$2;
  var children = _ref2.children,
    bobjectsInfo = _ref2.bobjectsInfo,
    accountId = _ref2.accountId,
    dataModel = _ref2.dataModel,
    props = _objectWithoutProperties$1(_ref2, _excluded$1);
  var focusedRef = useRef(0);
  var isLead = (bobjectsInfo === null || bobjectsInfo === void 0 ? void 0 : (_bobjectsInfo$activeB = bobjectsInfo.activeBobject) === null || _bobjectsInfo$activeB === void 0 ? void 0 : _bobjectsInfo$activeB.id.typeName) === BobjectTypes.Lead;
  var leadToSet = isLead ? bobjectsInfo === null || bobjectsInfo === void 0 ? void 0 : (_bobjectsInfo$activeB2 = bobjectsInfo.activeBobject) === null || _bobjectsInfo$activeB2 === void 0 ? void 0 : (_bobjectsInfo$activeB3 = _bobjectsInfo$activeB2.id) === null || _bobjectsInfo$activeB3 === void 0 ? void 0 : _bobjectsInfo$activeB3.value : !isLead && (bobjectsInfo === null || bobjectsInfo === void 0 ? void 0 : (_bobjectsInfo$lead = bobjectsInfo.lead) === null || _bobjectsInfo$lead === void 0 ? void 0 : (_bobjectsInfo$lead$id = _bobjectsInfo$lead.id) === null || _bobjectsInfo$lead$id === void 0 ? void 0 : _bobjectsInfo$lead$id.value);
  var _useState3 = useState({
      type: [],
      lead: leadToSet ? [leadToSet] : [],
      user: []
    }),
    _useState4 = _slicedToArray$4(_useState3, 2),
    filters = _useState4[0],
    setFilters = _useState4[1];
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var accountName = settings === null || settings === void 0 ? void 0 : (_settings$account = settings.account) === null || _settings$account === void 0 ? void 0 : _settings$account.name;
  var _useState5 = useState(bobjectsInfo),
    _useState6 = _slicedToArray$4(_useState5, 2),
    relatedBobjectsInfo = _useState6[0],
    updateRelatedBobjectsInfo = _useState6[1];
  var similarDealsHook = useSimilarDeals(accountId, (_relatedBobjectsInfo$ = relatedBobjectsInfo.company) === null || _relatedBobjectsInfo$ === void 0 ? void 0 : _relatedBobjectsInfo$.id.objectId);
  var _useState7 = useState((props === null || props === void 0 ? void 0 : props.mode) === EMAIL_MODE.REPLY ? SmartEmailTab.PAST_ACTIVITY : SmartEmailTab.TEMPLATES),
    _useState8 = _slicedToArray$4(_useState7, 2),
    selectedTab = _useState8[0],
    setSelectedTab = _useState8[1];
  var _useState9 = useState(PlaybookTab.EMAILS),
    _useState10 = _slicedToArray$4(_useState9, 2),
    playbookTab = _useState10[0],
    setPlaybookTab = _useState10[1];
  var _useState11 = useState(),
    _useState12 = _slicedToArray$4(_useState11, 2),
    replaceEmailBodyWithTemplate = _useState12[0],
    setReplaceEmailBodyWithTemplate = _useState12[1];
  var _useState13 = useState(),
    _useState14 = _slicedToArray$4(_useState13, 2),
    selectedTemplate = _useState14[0],
    _setSelectedTemplate = _useState14[1];
  var _useState15 = useState(),
    _useState16 = _slicedToArray$4(_useState15, 2),
    taskTitle = _useState16[0],
    setTaskTitle = _useState16[1];
  var _useState17 = useState(),
    _useState18 = _slicedToArray$4(_useState17, 2),
    newLeadInfo = _useState18[0],
    setNewLeadInfo = _useState18[1];
  var _useState19 = useState(),
    _useState20 = _slicedToArray$4(_useState19, 2),
    leadCreatedCallback = _useState20[0],
    setLeadCreatedCallback = _useState20[1];
  var _useState21 = useState(),
    _useState22 = _slicedToArray$4(_useState21, 2),
    selectedActivity = _useState22[0],
    setSelectedActivity = _useState22[1];
  var hasSnippetsEnabled = useSnippetsEnabled(accountId);
  var hasTimeSlotsEnabled = useTimeSlotsEnabled(accountId);
  var _useSnippets = useSnippets(),
    snippets = _useSnippets.snippets,
    mutate = _useSnippets.mutate;
  var _useState23 = useState(false),
    _useState24 = _slicedToArray$4(_useState23, 2),
    editorsStored = _useState24[0],
    setEditorsStored = _useState24[1];
  var _useState25 = useState(true),
    _useState26 = _slicedToArray$4(_useState25, 2),
    tooltipVisible = _useState26[0],
    setTooltipVisible = _useState26[1];
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var companyName = props.isExtension ? relatedBobjectsInfo === null || relatedBobjectsInfo === void 0 ? void 0 : (_relatedBobjectsInfo$2 = relatedBobjectsInfo.company) === null || _relatedBobjectsInfo$2 === void 0 ? void 0 : _relatedBobjectsInfo$2.name : getTextFromLogicRole(relatedBobjectsInfo === null || relatedBobjectsInfo === void 0 ? void 0 : relatedBobjectsInfo.company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  var leadName = !companyName && getLeadName({
    activeBobject: bobjectsInfo.activeBobject,
    lead: relatedBobjectsInfo.lead,
    isLead: isLead,
    isExtension: props.isExtension
  });
  var _useState27 = useState({
      calendarSlotsVisible: false,
      calendarSlots: [],
      selectedTimezone: getUserTimeZone(),
      meetingTitle: companyName || leadName ? "".concat(companyName !== null && companyName !== void 0 ? companyName : leadName, " <> ").concat(accountName) : t('smartEmailModal.untitledMeeting')
    }),
    _useState28 = _slicedToArray$4(_useState27, 2),
    slotsData = _useState28[0],
    setSlotsData = _useState28[1];
  var editorsRef = useRef();
  function storeEditorRef(editor) {
    var _editorsRef$current;
    if (editorsStored || editorsRef !== null && editorsRef !== void 0 && (_editorsRef$current = editorsRef.current) !== null && _editorsRef$current !== void 0 && _editorsRef$current.some(function (storedEditor) {
      return (storedEditor === null || storedEditor === void 0 ? void 0 : storedEditor.id) === editor.id;
    })) return;
    // fix to insert the input identifier in the correct position
    if (editor.id === 'shortcutInput') {
      var newArray = _toConsumableArray$1(editorsRef.current || []);
      newArray.splice(3, 0, editor);
      editorsRef.current = newArray;
      return;
    }
    editorsRef.current = [].concat(_toConsumableArray$1(editorsRef.current || []), [editor]);
    if (editorsRef.current.length > 3) {
      setEditorsStored(true);
    }
  }
  useRefreshEmailVariables(relatedBobjectsInfo);
  var updateFocusedIndex = function updateFocusedIndex() {
    var _editorsRef$current2;
    focusedRef.current = updateIndex(focusedRef.current, editorsStored, (_editorsRef$current2 = editorsRef.current) === null || _editorsRef$current2 === void 0 ? void 0 : _editorsRef$current2.length);
  };
  return /*#__PURE__*/jsx(SmartEmailModalContext.Provider, {
    value: _objectSpread$5(_objectSpread$5(_objectSpread$5({
      editorsStored: editorsStored,
      editorsRef: editorsRef,
      storeEditorRef: storeEditorRef,
      focusedRef: focusedRef,
      updateFocusedIndex: updateFocusedIndex,
      hasSnippetsEnabled: hasSnippetsEnabled,
      hasTimeSlotsEnabled: hasTimeSlotsEnabled,
      filters: filters,
      setFilters: setFilters
    }, props), {}, {
      selectedTab: selectedTab,
      tooltipVisible: tooltipVisible,
      setTooltipVisible: setTooltipVisible,
      snippets: snippets,
      mutateSnippets: mutate,
      setSelectedTab: setSelectedTab,
      slotsData: slotsData,
      setSlotsData: setSlotsData,
      playbookTab: playbookTab,
      setPlaybookTab: setPlaybookTab,
      dataModel: dataModel,
      similarDealsHook: similarDealsHook,
      accountId: accountId,
      contactBobject: bobjectsInfo === null || bobjectsInfo === void 0 ? void 0 : bobjectsInfo.activeBobject
    }, relatedBobjectsInfo), {}, {
      setRelatedBobjectsInfo: function setRelatedBobjectsInfo(value) {
        updateRelatedBobjectsInfo(function (prevState) {
          return _objectSpread$5(_objectSpread$5({}, prevState), value);
        });
      },
      resetBobjectEnvironment: function resetBobjectEnvironment() {
        return updateRelatedBobjectsInfo({
          activeBobject: undefined,
          company: undefined,
          leads: undefined,
          opportunity: undefined,
          pageBobjectType: undefined
        });
      },
      replaceEmailBodyWithTemplate: replaceEmailBodyWithTemplate,
      updateReplaceMethod: function updateReplaceMethod(method) {
        setReplaceEmailBodyWithTemplate(function () {
          return method;
        });
      },
      selectedTemplate: selectedTemplate,
      setSelectedTemplate: function setSelectedTemplate(value) {
        _setSelectedTemplate(value);
        if (!value) {
          setEditorsStored(false);
          editorsRef.current = editorsRef.current.slice(0, 1);
          focusedRef.current = 0;
        }
      },
      setTaskTitle: setTaskTitle,
      taskTitle: taskTitle,
      newLeadInfo: newLeadInfo,
      setNewLeadInfo: setNewLeadInfo,
      leadCreatedCallback: leadCreatedCallback,
      setLeadCreatedCallback: setLeadCreatedCallback,
      selectedActivity: selectedActivity,
      setSelectedActivity: setSelectedActivity
    }),
    children: children
  });
};
var useSmartEmailModal = function useSmartEmailModal() {
  var context = useContext(SmartEmailModalContext);
  if (context === undefined) {
    throw new Error('useSmartEmailModal must be used within the modal provider');
  }
  return context;
};
var withProvider = function withProvider(Component) {
  return function (_ref3) {
    var handleRedirect = _ref3.handleRedirect,
      scheduleEmailRedirect = _ref3.scheduleEmailRedirect,
      emailSettingsRedirect = _ref3.emailSettingsRedirect,
      targetMarkets = _ref3.targetMarkets,
      idealCustomerProfiles = _ref3.idealCustomerProfiles,
      providerProps = _objectWithoutProperties$1(_ref3, _excluded2$1);
    return /*#__PURE__*/jsx(SmartEmailModalProvider, _objectSpread$5(_objectSpread$5({}, providerProps), {}, {
      children: /*#__PURE__*/jsx(Component, {
        handleRedirect: handleRedirect,
        scheduleEmailRedirect: scheduleEmailRedirect,
        emailSettingsRedirect: emailSettingsRedirect,
        targetMarkets: targetMarkets,
        idealCustomerProfiles: idealCustomerProfiles,
        isExtension: providerProps.isExtension,
        userSettings: providerProps.userSettings
      })
    }));
  };
};
var SmartEmailModal = withProvider(SmartEmailModalComponent);

function _typeof$6(obj) { "@babel/helpers - typeof"; return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$6(obj); }
function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty$6(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$6(obj, key, value) { key = _toPropertyKey$6(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$6(arg) { var key = _toPrimitive$6(arg, "string"); return _typeof$6(key) === "symbol" ? key : String(key); }
function _toPrimitive$6(input, hint) { if (_typeof$6(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$6(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var CalendarTab = function CalendarTab(_ref) {
  var tabProps = _ref.tabProps;
  var bodyEditor = tabProps.bodyEditor;
  //TODO study if this wrapper is necessary
  var _useSmartEmailModal = useSmartEmailModal(),
    setSelectedTab = _useSmartEmailModal.setSelectedTab,
    slotsData = _useSmartEmailModal.slotsData,
    setSlotsData = _useSmartEmailModal.setSlotsData,
    id = _useSmartEmailModal.id,
    user = _useSmartEmailModal.user,
    accountId = _useSmartEmailModal.accountId,
    connections = _useSmartEmailModal.connections,
    mutateConnections = _useSmartEmailModal.mutateConnections,
    hasTimeSlotsEnabled = _useSmartEmailModal.hasTimeSlotsEnabled;
  return /*#__PURE__*/jsx(DayCalendar, {
    bodyEditor: bodyEditor,
    hasCalendarSlotsEnabled: hasTimeSlotsEnabled,
    slotsData: slotsData,
    setSlotsData: setSlotsData,
    id: id,
    accountId: accountId,
    userId: user === null || user === void 0 ? void 0 : user.id,
    connections: connections,
    mutateConnections: mutateConnections,
    handleSlotClick: function handleSlotClick() {
      setSelectedTab(SmartEmailTab.CALENDAR);
      setSlotsData(function (prevSlotsData) {
        return _objectSpread$4(_objectSpread$4({}, prevSlotsData), {}, {
          calendarSlotsVisible: true
        });
      });
    }
  });
};

var css_248z$5 = ".createLeadTab-module_container__qcU-s {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  padding: 24px 24px 0 24px;\n  box-sizing: border-box;\n  gap: 8px;\n  overflow: auto;\n}\n\n.createLeadTab-module_header__ntZNU {\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n}\n\n.createLeadTab-module_titleHeader__3Bb9Y {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  gap: 10px;\n  box-sizing: border-box;\n  padding-bottom: 16px;\n}\n\n.createLeadTab-module_divider__kzt0J {\n  width: 100%;\n  text-align: center;\n  border-top: 1px solid #D4E0F1;\n  align-self: center;\n}\n\n.createLeadTab-module_content__Cxcda {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  box-sizing: border-box;\n  height: 100%;\n  position: relative;\n  justify-content: space-between;\n}\n\n.createLeadTab-module_form__gcMu3 {\n  position: relative;\n  padding: 16px 8px 30px 8px;\n}\n\n.createLeadTab-module_form__gcMu3 input {\n  box-shadow: none !important;\n  height: 16px;\n  padding-left: 0;\n}\n\n.createLeadTab-module_formFooter__KPzOx {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 8px;\n  padding-top: 16px;\n}\n\n.createLeadTab-module_formFooterRow__22hjS {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 8px;\n}\n\n.createLeadTab-module_formFooterRowLink__89-wk {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n}\n\n.createLeadTab-module_footer__tA7Uw {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n}\n\n";
var styles$5 = {"container":"createLeadTab-module_container__qcU-s","header":"createLeadTab-module_header__ntZNU","titleHeader":"createLeadTab-module_titleHeader__3Bb9Y","divider":"createLeadTab-module_divider__kzt0J","content":"createLeadTab-module_content__Cxcda","form":"createLeadTab-module_form__gcMu3","formFooter":"createLeadTab-module_formFooter__KPzOx","formFooterRow":"createLeadTab-module_formFooterRow__22hjS","formFooterRowLink":"createLeadTab-module_formFooterRowLink__89-wk","footer":"createLeadTab-module_footer__tA7Uw"};
styleInject(css_248z$5);

function _typeof$5(obj) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$5(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$4(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$4(arr); }
function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty$5(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$5(obj, key, value) { key = _toPropertyKey$5(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$5(arg) { var key = _toPrimitive$5(arg, "string"); return _typeof$5(key) === "symbol" ? key : String(key); }
function _toPrimitive$5(input, hint) { if (_typeof$5(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$5(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime$1() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$1 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$5(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$1(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var emptyFormValue = {
  id: undefined,
  name: 'Unassigned',
  logicRole: null,
  order: 0,
  enabled: true
};
var fetchLeadFields = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee(url) {
    var response;
    return _regeneratorRuntime$1().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return api.get(url, {
            params: {
              selected: true
            }
          });
        case 2:
          response = _context.sent;
          return _context.abrupt("return", response.data);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fetchLeadFields(_x) {
    return _ref.apply(this, arguments);
  };
}();
var useLeadFields = function useLeadFields() {
  var _data$fields;
  var _useSWR = useSWR('/linkedin/settings/layout', fetchLeadFields),
    data = _useSWR.data;
  return (_data$fields = data === null || data === void 0 ? void 0 : data.fields) !== null && _data$fields !== void 0 ? _data$fields : [];
};
var CreateLeadTab = function CreateLeadTab() {
  var _useUserSettings = useUserSettings(),
    autoAssignLeadsLinkedin = _useUserSettings.user.autoAssignLeadsLinkedin;
  var fields = useLeadFields();
  var _useSmartEmailModal = useSmartEmailModal(),
    newLeadInfo = _useSmartEmailModal.newLeadInfo,
    dataModel = _useSmartEmailModal.dataModel,
    setNewLeadInfo = _useSmartEmailModal.setNewLeadInfo,
    setSelectedTab = _useSmartEmailModal.setSelectedTab,
    leadCreatedCallback = _useSmartEmailModal.leadCreatedCallback;
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.createLeadTab'
    }),
    t = _useTranslation.t;
  var emailDataModelField = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.EMAIL);
  var companyDataModelField = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.COMPANY);
  // @ts-ignore
  var emailField = _objectSpread$3(_objectSpread$3({}, emailDataModelField), {}, {
    type: emailDataModelField.fieldType,
    enabled: true,
    required: true
  });
  // @ts-ignore
  var companyField = _objectSpread$3(_objectSpread$3({}, companyDataModelField), {}, {
    type: companyDataModelField.fieldType,
    enabled: true,
    required: false
  });
  var _useForm = useForm({
      defaultValues: {
        fields: {},
        companyName: '',
        createCompany: false
      }
    }),
    control = _useForm.control,
    handleSubmit = _useForm.handleSubmit,
    reset = _useForm.reset,
    setValue = _useForm.setValue,
    _useForm$formState = _useForm.formState,
    errors = _useForm$formState.errors,
    isSubmitting = _useForm$formState.isSubmitting;
  useEffect(function () {
    if (fields.length > 0 && emailField) {
      var _newLeadInfo$company, _newLeadInfo$company2;
      setValue('fields', _defineProperty$5(_defineProperty$5({}, emailField.id, newLeadInfo === null || newLeadInfo === void 0 ? void 0 : newLeadInfo.email), companyField.id, newLeadInfo === null || newLeadInfo === void 0 ? void 0 : (_newLeadInfo$company = newLeadInfo.company) === null || _newLeadInfo$company === void 0 ? void 0 : _newLeadInfo$company.id.value));
      setValue('companyName', newLeadInfo === null || newLeadInfo === void 0 ? void 0 : (_newLeadInfo$company2 = newLeadInfo.company) === null || _newLeadInfo$company2 === void 0 ? void 0 : _newLeadInfo$company2.name);
    }
  }, [fields.length]);
  function discard() {
    reset();
    setSelectedTab(SmartEmailTab.PAST_ACTIVITY);
    setNewLeadInfo({
      email: undefined,
      company: undefined
    });
  }
  function saveLead(data) {
    api.post('/linkedin/leads', {
      fields: _objectSpread$3({}, data.fields),
      companyName: data.companyName,
      createCompany: data.createCompany
    }).then(function () {
      leadCreatedCallback(newLeadInfo.email);
      discard();
      createToast({
        message: t('toasts.success'),
        type: 'success'
      });
    });
  }
  var fieldsWithEmail = fields !== null && fields !== void 0 && fields.find(function (field) {
    return (field === null || field === void 0 ? void 0 : field.logicRole) === LEAD_FIELDS_LOGIC_ROLE.EMAIL;
  }) ? fields : fields.slice(0, 1).concat([emailField], fields.slice(1));
  return /*#__PURE__*/jsxs("div", {
    className: styles$5.container,
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$5.header,
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$5.titleHeader,
        children: [/*#__PURE__*/jsx(Icon, {
          name: "checkDouble",
          size: 20
        }), /*#__PURE__*/jsx(Text, {
          weight: "bold",
          size: "l",
          children: t('newLead')
        })]
      }), /*#__PURE__*/jsx("span", {
        className: styles$5.divider
      })]
    }), /*#__PURE__*/jsxs("div", {
      className: styles$5.content,
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$5.form,
        children: [/*#__PURE__*/jsx("form", {
          children: fieldsWithEmail === null || fieldsWithEmail === void 0 ? void 0 : fieldsWithEmail.reduce(function (acc, curr) {
            var _curr$values;
            var isICP = (curr === null || curr === void 0 ? void 0 : curr.logicRole) === LEAD_FIELDS_LOGIC_ROLE.ICP;
            var isAssignedTo = (curr === null || curr === void 0 ? void 0 : curr.logicRole) === LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO;
            var shouldNotBeAutoAssigned = !autoAssignLeadsLinkedin && isAssignedTo;
            if (isICP && (curr === null || curr === void 0 ? void 0 : (_curr$values = curr.values) === null || _curr$values === void 0 ? void 0 : _curr$values.length) > 0 || curr.enabled) {
              acc.push( /*#__PURE__*/jsx(FormField, _objectSpread$3(_objectSpread$3(_objectSpread$3({
                control: control
              }, curr), shouldNotBeAutoAssigned && {
                logicRole: undefined
              }), isAssignedTo && {
                values: [emptyFormValue].concat(_toConsumableArray(curr.values))
              }), curr.id));
            }
            return acc;
          }, [])
        }), /*#__PURE__*/jsxs("div", {
          className: styles$5.formFooter,
          children: [/*#__PURE__*/jsx(Text, {
            size: "s",
            color: "softPeanut",
            className: styles$5.formFooterRow,
            children: t('missingInfo')
          }), /*#__PURE__*/jsxs("div", {
            className: styles$5.formFooterRowLink,
            onClick: function onClick() {
              var baseUrl = baseUrls["development"];
              window.open("".concat(baseUrl, "/app/account-settings/chrome-extension"));
            },
            children: [/*#__PURE__*/jsx(Text, {
              size: "s",
              color: "bloobirds",
              children: t('changeFromField')
            }), /*#__PURE__*/jsx(Icon, {
              name: "externalLink",
              size: 20
            })]
          })]
        })]
      }), /*#__PURE__*/jsxs("div", {
        className: styles$5.footer,
        children: [/*#__PURE__*/jsx(Button, {
          variant: "clear",
          size: "small",
          iconLeft: "trashEmpty",
          color: "tomato",
          onClick: discard,
          children: t('discard')
        }), /*#__PURE__*/jsx(Button, {
          variant: "primary",
          size: "small",
          iconLeft: "plus",
          disabled: Object.keys(errors).length !== 0 || isSubmitting,
          onClick: handleSubmit(saveLead),
          children: t('createLead')
        })]
      })]
    })]
  });
};

var css_248z$4 = ".createTaskTab-module_container__bTK9Y{\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  height: 100%;\n  padding: 24px 24px 0 24px;\n  box-sizing: border-box;\n}\n\n.createTaskTab-module_header__JDy4j{\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n}\n\n.createTaskTab-module_titleHeader__Y1nTN{\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  gap: 10px;\n  box-sizing: border-box;\n  padding-bottom: 16px;\n}\n\n.createTaskTab-module_divider__RlB7Z{\n  width: 100%;\n  text-align: center;\n  border-top: 1px solid #D4E0F1;\n  align-self: center;\n}\n\n.createTaskTab-module_infoHeader__3o7hp{\n  box-sizing: border-box;\n  padding: 16px 0;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.createTaskTab-module_dateDescription__oI1D5{\n  display: flex;\n  justify-content: flex-start;\n  gap: 4px;\n}\n\n.createTaskTab-module_objectDescription__2lNxT{\n  display: flex;\n  justify-content: flex-start;\n  gap: 4px;\n}\n\n\n.createTaskTab-module_date__EKdPy{\n  display: flex;\n  justify-content: flex-start;\n  gap: 12px;\n  align-items: center;\n}\n\n.createTaskTab-module_object__mpNIb {\n  display: flex;\n  justify-content: flex-start;\n  gap: 12px;\n  align-items: center;\n\n}\n\n.createTaskTab-module_textArea__nXQEA {\n  border: none;\n  resize: none;\n  font-family: var(--fontFamily);\n  box-shadow: none;\n  height: 100%;\n  outline: none;\n  margin-top: 16px;\n  margin-bottom: 16px;\n  color: var(--peanut) !important;\n}\n\n.createTaskTab-module_textArea__nXQEA:focus {\n  outline: none !important;\n  box-shadow: none !important;\n  background-color: transparent;\n}\n\n\n.createTaskTab-module_footer__Bh21f {\n  display: flex;\n  justify-content: space-between;\n}\n\n.createTaskTab-module_dateButton__vr0be {\n  cursor: pointer;\n}\n\n.createTaskTab-module_assigned_to__VFue5 {\n  display: flex;\n  margin: 4px 0;\n  align-items: center;\n}\n\n.createTaskTab-module_assigned_to_title__zVNpX {\n  display: flex;\n  margin-right: 12px;\n  align-items: center;\n  gap: 4px;\n}\n";
var styles$4 = {"container":"createTaskTab-module_container__bTK9Y","header":"createTaskTab-module_header__JDy4j","titleHeader":"createTaskTab-module_titleHeader__Y1nTN","divider":"createTaskTab-module_divider__RlB7Z","infoHeader":"createTaskTab-module_infoHeader__3o7hp","dateDescription":"createTaskTab-module_dateDescription__oI1D5","objectDescription":"createTaskTab-module_objectDescription__2lNxT","date":"createTaskTab-module_date__EKdPy","object":"createTaskTab-module_object__mpNIb","textArea":"createTaskTab-module_textArea__nXQEA","footer":"createTaskTab-module_footer__Bh21f","dateButton":"createTaskTab-module_dateButton__vr0be","assigned_to":"createTaskTab-module_assigned_to__VFue5","assigned_to_title":"createTaskTab-module_assigned_to_title__zVNpX"};
styleInject(css_248z$4);

function _typeof$4(obj) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$4(obj); }
var _excluded = ["onChange"],
  _excluded2 = ["related"];
function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$4(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty$4(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$4(obj, key, value) { key = _toPropertyKey$4(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$4(arg) { var key = _toPrimitive$4(arg, "string"); return _typeof$4(key) === "symbol" ? key : String(key); }
function _toPrimitive$4(input, hint) { if (_typeof$4(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$4(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _slicedToArray$3(arr, i) { return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3(); }
function _nonIterableRest$3() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }
function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$3(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$3(arr) { if (Array.isArray(arr)) return arr; }
var CreateTaskTab = function CreateTaskTab() {
  var _activeBobject$id2;
  var _useSmartEmailModal = useSmartEmailModal(),
    activeBobject = _useSmartEmailModal.activeBobject,
    accountId = _useSmartEmailModal.accountId,
    isExtension = _useSmartEmailModal.isExtension,
    setSelectedTab = _useSmartEmailModal.setSelectedTab,
    setTaskTitle = _useSmartEmailModal.setTaskTitle;
  var _useState = useState(false),
    _useState2 = _slicedToArray$3(_useState, 2),
    isSubmitting = _useState2[0],
    setIsSubmitting = _useState2[1];
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.createTaskTab'
    }),
    t = _useTranslation.t;
  var userId = useActiveUserId();
  var _useState3 = useState(userId),
    _useState4 = _slicedToArray$3(_useState3, 2),
    assignedToId = _useState4[0],
    setAssignedToId = _useState4[1];
  var bobjectName;
  if (isExtension) {
    var _bobject$id;
    var bobject = activeBobject;
    switch (bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.typeName) {
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
  } else {
    var _activeBobject$id;
    var referencedBobjectType = activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id = activeBobject.id) === null || _activeBobject$id === void 0 ? void 0 : _activeBobject$id.typeName;
    bobjectName = getTextFromLogicRole(
    // @ts-ignore
    activeBobject, getNameFieldLRFromBobjectType(referencedBobjectType));
  }
  var _useState5 = useState(bobjectName),
    _useState6 = _slicedToArray$3(_useState5, 2),
    bobjectSelectedName = _useState6[0],
    setBobjectSelectedName = _useState6[1];
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var _useVisible = useVisible(),
    datePickerVisible = _useVisible.visible,
    setDatePickerVisible = _useVisible.setVisible,
    datePickerRef = _useVisible.ref;
  var _useForm = useForm(),
    control = _useForm.control,
    handleSubmit = _useForm.handleSubmit;
  var _useController = useController({
      control: control,
      name: TASK_FIELDS_LOGIC_ROLE.TITLE
    }),
    _useController$field = _useController.field,
    titleOnChange = _useController$field.onChange,
    restTitleProps = _objectWithoutProperties(_useController$field, _excluded);
  var _useController2 = useController({
      control: control,
      name: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
      defaultValue: new Date()
    }),
    _useController2$field = _useController2.field,
    taskDate = _useController2$field.value,
    taskDateOnChange = _useController2$field.onChange;
  var _useController3 = useController({
      control: control,
      name: 'related',
      defaultValue: activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id2 = activeBobject.id) === null || _activeBobject$id2 === void 0 ? void 0 : _activeBobject$id2.value
    }),
    _useController3$field = _useController3.field,
    relatedOnChange = _useController3$field.onChange,
    relatedValue = _useController3$field.value;
  var onSubmit = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
      var related, taskInfo, body, relatedBobjectType;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setIsSubmitting(true);
            related = data.related, taskInfo = _objectWithoutProperties(data, _excluded2);
            body = _defineProperty$4(_defineProperty$4(_defineProperty$4(_defineProperty$4(_defineProperty$4({}, TASK_FIELDS_LOGIC_ROLE.TITLE, taskInfo[TASK_FIELDS_LOGIC_ROLE.TITLE]), TASK_FIELDS_LOGIC_ROLE.TASK_TYPE, TASK_TYPE.NEXT_STEP), TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO, assignedToId), TASK_FIELDS_LOGIC_ROLE.STATUS, TASK_STATUS_VALUE_LOGIC_ROLE.TODO), TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, taskInfo[TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]);
            if (related) {
              relatedBobjectType = related.split('/')[1].toUpperCase();
              body[TASK_FIELDS_LOGIC_ROLE[relatedBobjectType]] = related;
            }
            api.post("/bobjects/".concat(accountId, "/Task"), {
              contents: _objectSpread$2({}, body),
              params: {}
            }).then(function () {
              setIsSubmitting(false);
              createToast({
                message: t('toasts.success'),
                type: 'success'
              });
              setTaskTitle(undefined);
              setSelectedTab(SmartEmailTab.PAST_ACTIVITY);
            })["catch"](function () {
              setIsSubmitting(false);
            });
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function onSubmit(_x2) {
      return _ref.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/jsxs("div", {
    className: styles$4.container,
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$4.header,
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$4.titleHeader,
        children: [/*#__PURE__*/jsx(Icon, {
          name: "checkDouble",
          size: 20
        }), /*#__PURE__*/jsx(Text, {
          weight: "bold",
          size: "l",
          children: t('newTask')
        })]
      }), /*#__PURE__*/jsx("span", {
        className: styles$4.divider
      }), /*#__PURE__*/jsxs("div", {
        className: styles$4.infoHeader,
        children: [/*#__PURE__*/jsxs("div", {
          className: styles$4.date,
          children: [/*#__PURE__*/jsxs("div", {
            className: styles$4.dateDescription,
            children: [/*#__PURE__*/jsx(Icon, {
              name: "clock",
              color: "softPeanut",
              size: 16
            }), /*#__PURE__*/jsx(Text, {
              size: "xs",
              color: "softPeanut",
              children: t('dueDate')
            })]
          }), /*#__PURE__*/jsx(DatePicker, {
            withTimePicker: true,
            value: taskDate,
            onChange: taskDateOnChange,
            openDefaultValue: new Date(),
            dropDownRef: datePickerRef,
            visible: datePickerVisible,
            setVisible: setDatePickerVisible,
            dropdownProps: {
              zIndex: 10000,
              anchor: /*#__PURE__*/jsx("span", {
                onClick: function onClick() {
                  return setDatePickerVisible(true);
                },
                className: styles$4.dateButton,
                children: /*#__PURE__*/jsx(Text, {
                  size: "xs",
                  color: "bloobirds",
                  weight: "regular",
                  children: useGetI18nSpacetime(taskDate).format('{month-short} {date-ordinal}, {day} {time-24}')
                })
              })
            }
          })]
        }), /*#__PURE__*/jsxs("span", {
          className: styles$4.assigned_to,
          children: [/*#__PURE__*/jsxs("span", {
            className: styles$4.assigned_to_title,
            children: [/*#__PURE__*/jsx(Icon, {
              name: "personAdd",
              color: "softPeanut",
              size: 16
            }), /*#__PURE__*/jsx(Text, {
              size: "xs",
              color: "softPeanut",
              children: t('assignedTo')
            })]
          }), /*#__PURE__*/jsx(AssignedToSelector, {
            assignedToId: assignedToId,
            updateAssignedTo: setAssignedToId
          })]
        }), /*#__PURE__*/jsxs("div", {
          className: styles$4.object,
          children: [/*#__PURE__*/jsxs("div", {
            className: styles$4.objectDescription,
            children: [/*#__PURE__*/jsx(Icon, {
              name: "record",
              color: "softPeanut",
              size: 16
            }), /*#__PURE__*/jsx(Text, {
              size: "xs",
              color: "softPeanut",
              children: t('object')
            })]
          }), /*#__PURE__*/jsx(BobjectSelector, {
            accountId: accountId,
            iconSize: 16,
            selected: bobjectSelectedName,
            id: 'static',
            bobjectType: relatedValue === null || relatedValue === void 0 ? void 0 : relatedValue.split('/')[1],
            onBobjectChange: function onBobjectChange(bobject) {
              var _bobject$rawBobject;
              var bobjectType = bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType;
              relatedOnChange(bobject === null || bobject === void 0 ? void 0 : (_bobject$rawBobject = bobject.rawBobject) === null || _bobject$rawBobject === void 0 ? void 0 : _bobject$rawBobject.id);
              if (bobjectType === BobjectTypes.Company) {
                setBobjectSelectedName(bobject === null || bobject === void 0 ? void 0 : bobject.companyName);
              } else if (bobjectType === BobjectTypes.Lead) {
                setBobjectSelectedName(bobject === null || bobject === void 0 ? void 0 : bobject.fullName);
              } else if (bobjectType === BobjectTypes.Opportunity) {
                setBobjectSelectedName(bobject === null || bobject === void 0 ? void 0 : bobject.name);
              }
            }
          })]
        })]
      }), /*#__PURE__*/jsx("span", {
        className: styles$4.divider
      })]
    }), /*#__PURE__*/jsx("textarea", _objectSpread$2({
      className: styles$4.textArea,
      placeholder: t('descriptionPlaceholder'),
      autoFocus: true,
      onChange: function onChange(e) {
        titleOnChange(e);
        setTaskTitle(e.target.value);
      }
    }, restTitleProps)), /*#__PURE__*/jsxs("div", {
      className: styles$4.footer,
      children: [/*#__PURE__*/jsx(Button, {
        size: "small",
        variant: "tertiary",
        iconLeft: "trashEmpty",
        color: "extraMeeting",
        uppercase: false,
        onClick: function onClick() {
          return setSelectedTab(SmartEmailTab.PAST_ACTIVITY);
        },
        children: t('discard')
      }), /*#__PURE__*/jsx(Button, {
        size: "small",
        iconLeft: "plus",
        uppercase: false,
        onClick: handleSubmit(onSubmit),
        disabled: !restTitleProps.value,
        children: isSubmitting ? /*#__PURE__*/jsx(Spinner, {
          name: "loadingCircle",
          size: 14
        }) : t('createTask')
      })]
    })]
  });
};

var css_248z$3 = ".previewTab-module_preview__O9-Bs {\n  background-color: white;\n  box-sizing: border-box;\n  border-left: 1px solid var(--lightestBloobirds);\n  overflow-y: auto;\n  overflow-x: clip;\n  height: inherit;\n}\n\n.previewTab-module_preview__attachments__-VvEx {\n  padding-bottom: 44px;\n}\n\n.previewTab-module_preview_text_wrapper__XHATh {\n  height: auto;\n  overflow-y: auto;\n  width: 418px;\n}\n\n.previewTab-module_preview_subject_wrapper__7wAXs {\n  pointer-events: none;\n  display: flex;\n  position: relative;\n  align-items: center;\n  padding: 10px 21px;\n  min-height: 44px;\n  box-sizing: border-box;\n  border-bottom: 1px solid var(--lightestBloobirds);\n}\n\n.previewTab-module_preview_body_wrapper__gJb-1 {\n  height: calc(100% - 44px);\n  position: relative;\n  overflow-y: auto;\n}\n\n.previewTab-module_preview_body_text_wrapper__a4cv8 {\n  padding: 16px 21px;\n  box-sizing: border-box;\n  font-size: 14px;\n  width: 100%;\n  word-wrap: break-word;\n}\n\n.previewTab-module_preview_body_text_wrapper__a4cv8 p,\n.previewTab-module_preview_body_text_wrapper__a4cv8 div {\n  font-size: 14px;\n}\n\n.previewTab-module_preview_body_text_wrapper__a4cv8 ul,\n.previewTab-module_preview_body_text_wrapper__a4cv8 ol {\n  padding-left: 40px;\n  font-size: 16px;\n}\n\n.previewTab-module_preview_body_text_wrapper__a4cv8 > ul * {\n  list-style: initial;\n}\n\n.previewTab-module_preview_body_text_wrapper__a4cv8 > ol * {\n  list-style: auto;\n}\n\n.previewTab-module_preview_body_text_wrapper__a4cv8 > div > div[id=\"slots-block\"] > ul {\n  padding-left: 16px;\n}\n\n.previewTab-module_preview_body_text_wrapper__a4cv8 > p {\n  min-height: 19px;\n  margin: 0 auto;\n}\n\n.previewTab-module_preview_body_text_wrapper__a4cv8 img {\n  max-width: 100%;\n  height: auto;\n}\n\n.previewTab-module__header_callout_preview__6jBgV {\n  height: 40px;\n}\n";
var styles$3 = {"preview":"previewTab-module_preview__O9-Bs","preview__attachments":"previewTab-module_preview__attachments__-VvEx","preview_text_wrapper":"previewTab-module_preview_text_wrapper__XHATh","preview_subject_wrapper":"previewTab-module_preview_subject_wrapper__7wAXs","preview_body_wrapper":"previewTab-module_preview_body_wrapper__gJb-1","preview_body_text_wrapper":"previewTab-module_preview_body_text_wrapper__a4cv8","_header_callout_preview":"previewTab-module__header_callout_preview__6jBgV"};
styleInject(css_248z$3);

function _typeof$3(obj) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$3(obj); }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(arg) { var key = _toPrimitive$3(arg, "string"); return _typeof$3(key) === "symbol" ? key : String(key); }
function _toPrimitive$3(input, hint) { if (_typeof$3(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$3(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ASTPreview = function ASTPreview(_ref) {
  var body = _ref.body,
    subject = _ref.subject;
  var _useAttachedLinks = useAttachedLinks(),
    attachedLinks = _useAttachedLinks.attachedLinks;
  var bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: true,
    replaceMeetingLinks: true,
    rawHTMLBlock: true,
    replyHistory: true,
    snippets: true
  });
  var previewSubject = useMemo(function () {
    return serialize(subject);
  }, [subject]);
  var bodyDeserialized = serialize(prepareBodyToBeSerialized(attachedLinks, body), {
    format: 'AST',
    plugins: bodyPlugins
  });
  var previewBody = useMemo(function () {
    return parseEmailPixels(bodyDeserialized);
  }, [body]);
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx("div", {
      className: styles$3.preview_subject_wrapper,
      dangerouslySetInnerHTML: {
        __html: previewSubject
      }
    }), /*#__PURE__*/jsx("div", {
      className: styles$3.preview_body_wrapper,
      children: /*#__PURE__*/jsx("div", {
        className: styles$3.preview_body_text_wrapper,
        dangerouslySetInnerHTML: {
          __html: previewBody
        }
      })
    })]
  });
};
function HTMLPreview(_ref2) {
  var _activeBobject$id2, _data$data;
  var body = _ref2.body,
    subject = _ref2.subject;
  var _useSmartEmailModal = useSmartEmailModal(),
    activeBobject = _useSmartEmailModal.activeBobject;
  function fetchPreviewEmail() {
    var _activeBobject$id;
    return api.post('/messaging/emails/preview', {
      subject: JSON.stringify(createParagraph(subject)),
      body: body,
      bobjectId: activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id = activeBobject.id) === null || _activeBobject$id === void 0 ? void 0 : _activeBobject$id.value,
      format: 'HTML'
    });
  }
  var previewSubject = useMemo(function () {
    return serialize(subject);
  }, [subject]);
  var _useSWR = useSWR("/messaging/emails/preview/".concat((_activeBobject$id2 = activeBobject.id) === null || _activeBobject$id2 === void 0 ? void 0 : _activeBobject$id2.value), fetchPreviewEmail),
    data = _useSWR.data,
    mutate = _useSWR.mutate;
  var debouncedMutate = useDebouncedCallback(mutate, 2000, [mutate]);
  useEffect(function () {
    //debounced mutate of 2s
    debouncedMutate();
  }, [activeBobject, body, subject]);
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx("div", {
      className: clsx(styles$3.preview_subject_wrapper, salesforceResetStyles.salesforceReset),
      dangerouslySetInnerHTML: {
        __html: previewSubject
      }
    }), /*#__PURE__*/jsx("div", {
      className: styles$3.preview_body_wrapper,
      children: /*#__PURE__*/jsx(ReactShadowRoot, {
        children: /*#__PURE__*/jsx("div", {
          className: clsx(styles$3.preview_body_text_wrapper, salesforceResetStyles.salesforceReset),
          dangerouslySetInnerHTML: {
            __html: data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.body
          }
        })
      })
    })]
  });
}
var PreviewTab = function PreviewTab(_ref3) {
  var _ref3$previewTabProps = _ref3.previewTabProps,
    control = _ref3$previewTabProps.control,
    error = _ref3$previewTabProps.error,
    hasAttachments = _ref3$previewTabProps.hasAttachments,
    format = _ref3$previewTabProps.format,
    htmlContent = _ref3$previewTabProps.htmlContent;
  var subject = useWatch({
    control: control,
    name: 'subject'
  });
  var body = useWatch({
    control: control,
    name: 'body'
  });
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.previewTab.banner'
    }),
    t = _useTranslation.t;
  var previewClasses = clsx(styles$3.preview, _defineProperty$3({}, styles$3.preview__attachments, hasAttachments));
  return /*#__PURE__*/jsxs("div", {
    className: previewClasses,
    children: [/*#__PURE__*/jsx("div", {
      className: styles$3._header_callout_preview,
      children: /*#__PURE__*/jsx(Banner, {
        type: error ? 'error' : 'success',
        icon: "eye",
        children: error ? t('error') : t('standard')
      })
    }), /*#__PURE__*/jsx("div", {
      className: styles$3.preview_text_wrapper,
      children: format === 'AST' ? /*#__PURE__*/jsx(ASTPreview, {
        body: body,
        subject: subject
      }) : /*#__PURE__*/jsx(HTMLPreview, {
        body: htmlContent,
        subject: subject
      })
    })]
  });
};

var css_248z$2 = ".similarDeals-module__wrapper__9FIlD {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: flex-start;\n  height: 100%;\n}\n\n.similarDeals-module__header__RXiOu {\n  display: flex;\n  justify-content: space-between;\n  padding: 16px 16px 10px 16px;\n  box-sizing: border-box;\n  width: 100%;\n}\n\n.similarDeals-module__no_results__88l5u {\n  height: 86%;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.similarDeals-module__no_results_container__uXCza {\n  height: 100%;\n  width: 85%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  margin: auto;\n}\n\n.similarDeals-module__deals_container__oFK2I {\n  padding: 16px;\n  width: 100%;\n  height: 91%;\n  box-sizing: border-box;\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n\n.similarDeals-module__time_select__OMuyk:last-child > div > div {\n  width: auto;\n}\n\n.similarDeals-module__time_select__OMuyk:last-child > div > div > button > span {\n  color: var(--bloobirds) !important;\n  max-width: 170px;\n}\n\n.similarDeals-module__time_select__OMuyk:last-child > div > div > svg {\n  display: none;\n}\n\n.similarDeals-module__info_banner__sgZfn{\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  padding: 16px;\n  background-color: var(--verySoftPurple);\n  border-radius: 4px;\n  border: var(--lightPurple) 1px solid;\n  gap: 16px;\n  margin: 0 16px 10px;\n}\n\n.similarDeals-module__info_banner__sgZfn > p{\n  font-weight: 300;\n}\n\n.similarDeals-module__info_banner_title__iAQAq{\n  display: flex;\n  gap: 6px;\n}\n\n.similarDeals-module__info_banner_footer__L-BOT{\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.similarDeals-module__info_banner_footer__L-BOT button{\n  height: 24px;\n  border: var(--lightPurple) 1px solid !important;\n  background-color: var(--verySoftPurple) !important;\n}\n\n.similarDeals-module__info_banner_footer__L-BOT button:hover{\n  background-color: #bac0fa !important;\n}\n";
var styles$2 = {"_wrapper":"similarDeals-module__wrapper__9FIlD","_header":"similarDeals-module__header__RXiOu","_no_results":"similarDeals-module__no_results__88l5u","_no_results_container":"similarDeals-module__no_results_container__uXCza","_deals_container":"similarDeals-module__deals_container__oFK2I","_time_select":"similarDeals-module__time_select__OMuyk","_info_banner":"similarDeals-module__info_banner__sgZfn","_info_banner_title":"similarDeals-module__info_banner_title__iAQAq","_info_banner_footer":"similarDeals-module__info_banner_footer__L-BOT"};
styleInject(css_248z$2);

var css_248z$1 = ".companyCard-module_container__aQ2uI {\n  display: flex;\n  flex-direction: column;\n  padding: 16px;\n  border: 1px solid var(--veryLightBloobirds);\n  border-radius: 4px;\n  margin-bottom: 8px;\n}\n\n.companyCard-module_header__R1Pea {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-bottom: 16px;\n  border-bottom: 1px solid var(--lightPeanut);\n}\n\n.companyCard-module_header__R1Pea > div[class^=\"infoCardTemplate-module__copy_component\"] {\n  align-items: center;\n}\n\n.companyCard-module_company_title__rXwcd {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 205px;\n}\n\n.companyCard-module_company_title_short__jlQtK {\n  max-width: 135px;\n}\n\n.companyCard-module_headerRight__xAxsa {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 8px;\n}\n\n.companyCard-module_mainInfo_container__k6h7x {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  padding: 16px 0 4px 0;\n}\n\n.companyCard-module_mainInfo__wdpbX {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  gap: 4px;\n}\n\n.companyCard-module_mainInfo_header__hCRN6 {\n  display: flex;\n  gap: 4px;\n}\n\n.companyCard-module_mainInfo_body__JnfcN {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n.companyCard-module_mainInfo_body__JnfcN > div[class^=\"infoCardTemplate-module__copy_component\"] {\n  align-items: center;\n}\n\n.companyCard-module_mainInfo_value__hf7SA {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 165px;\n}\n\n.companyCard-module_mainInfo_value_short__gLH0- {\n  max-width: 127px;\n}\n\n.companyCard-module_mainInfo_value_with_buttons__8lVJP {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 125px;\n}\n\n.companyCard-module_mainInfo_value_with_buttons_short__IMCa3 {\n  max-width: 98px;\n}\n\n.companyCard-module_chemistry_text__li6PS {\n  cursor: default;\n}\n\n.companyCard-module_chemistry_dropdown__3XqDH {\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.companyCard-module_chemistry_dropdown__3XqDH > ul {\n  margin: 0;\n  padding: 0;\n}\n\n.companyCard-module_matching_list_element__31Thc {\n  display: flex;\n  gap: 4px;\n  margin-right: 4px;\n  margin-bottom: 4px;\n}\n\n.companyCard-module_matching_list_text__34S0W {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 100%;\n}\n\n.companyCard-module_company_card_skeleton__mdtiq {\n  max-height: 175px;\n  width: 100%;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  padding: 16px;\n  border: 1px solid var(--verySoftPeanut);\n  border-radius: 4px;\n  margin-bottom: 8px;\n}\n\n.companyCard-module_company_card_skeleton__mdtiq > span {\n  margin: auto;\n}\n\n.companyCard-module__skeleton__rFglg {\n  padding: 15px 15px 0 15px;\n}\n\n.companyCard-module_skeleton_header__EfXTu {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-bottom: 16px;\n}\n\n.companyCard-module_skeleton_body__23fXD {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  align-items: center;\n  padding: 10px 0 0 0;\n}\n\n.companyCard-module_skeleton_body__23fXD > div {\n  width: 50%;\n  margin-bottom: 3px;\n}\n";
var styles$1 = {"container":"companyCard-module_container__aQ2uI","header":"companyCard-module_header__R1Pea","company_title":"companyCard-module_company_title__rXwcd","company_title_short":"companyCard-module_company_title_short__jlQtK","headerRight":"companyCard-module_headerRight__xAxsa","mainInfo_container":"companyCard-module_mainInfo_container__k6h7x","mainInfo":"companyCard-module_mainInfo__wdpbX","mainInfo_header":"companyCard-module_mainInfo_header__hCRN6","mainInfo_body":"companyCard-module_mainInfo_body__JnfcN","mainInfo_value":"companyCard-module_mainInfo_value__hf7SA","mainInfo_value_short":"companyCard-module_mainInfo_value_short__gLH0-","mainInfo_value_with_buttons":"companyCard-module_mainInfo_value_with_buttons__8lVJP","mainInfo_value_with_buttons_short":"companyCard-module_mainInfo_value_with_buttons_short__IMCa3","chemistry_text":"companyCard-module_chemistry_text__li6PS","chemistry_dropdown":"companyCard-module_chemistry_dropdown__3XqDH","matching_list_element":"companyCard-module_matching_list_element__31Thc","matching_list_text":"companyCard-module_matching_list_text__34S0W","company_card_skeleton":"companyCard-module_company_card_skeleton__mdtiq","_skeleton":"companyCard-module__skeleton__rFglg","skeleton_header":"companyCard-module_skeleton_header__EfXTu","skeleton_body":"companyCard-module_skeleton_body__23fXD"};
styleInject(css_248z$1);

function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2(); }
function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$2(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(arg) { var key = _toPrimitive$2(arg, "string"); return _typeof$2(key) === "symbol" ? key : String(key); }
function _toPrimitive$2(input, hint) { if (_typeof$2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var CompanyCardSkeleton = function CompanyCardSkeleton() {
  return /*#__PURE__*/jsxs("div", {
    className: styles$1.company_card_skeleton,
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$1.skeleton_header,
      children: [/*#__PURE__*/jsx(Skeleton, {
        variant: "text",
        width: "20%",
        height: 20
      }), /*#__PURE__*/jsx(Skeleton, {
        variant: "text",
        width: "30%",
        height: 20
      })]
    }), /*#__PURE__*/jsx(Skeleton, {
      variant: "text",
      width: "98%",
      height: 2
    }), /*#__PURE__*/jsxs("div", {
      className: styles$1.skeleton_body,
      children: [/*#__PURE__*/jsxs("div", {
        children: [/*#__PURE__*/jsx(Skeleton, {
          variant: "text",
          width: "65%",
          height: 20
        }), /*#__PURE__*/jsx(Skeleton, {
          variant: "text",
          width: "70%",
          height: 20
        })]
      }), /*#__PURE__*/jsxs("div", {
        children: [/*#__PURE__*/jsx(Skeleton, {
          variant: "text",
          width: "65%",
          height: 20
        }), /*#__PURE__*/jsx(Skeleton, {
          variant: "text",
          width: "70%",
          height: 20
        })]
      }), /*#__PURE__*/jsxs("div", {
        children: [/*#__PURE__*/jsx(Skeleton, {
          variant: "text",
          width: "65%",
          height: 20
        }), /*#__PURE__*/jsx(Skeleton, {
          variant: "text",
          width: "70%",
          height: 20
        })]
      }), /*#__PURE__*/jsxs("div", {
        children: [/*#__PURE__*/jsx(Skeleton, {
          variant: "text",
          width: "65%",
          height: 20
        }), /*#__PURE__*/jsx(Skeleton, {
          variant: "text",
          width: "70%",
          height: 20
        })]
      })]
    })]
  });
};
var SimilarDealsSkeleton = function SimilarDealsSkeleton() {
  return /*#__PURE__*/jsx("div", {
    className: styles$1.skeleton,
    children: range(4).map(function (number) {
      return /*#__PURE__*/jsx(Fragment$1, {
        children: /*#__PURE__*/jsx(CompanyCardSkeleton, {})
      }, number);
    })
  });
};
var MainInfoField = function MainInfoField(_ref) {
  var label = _ref.label,
    value = _ref.value,
    link = _ref.link,
    isBubble = _ref.isBubble;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var parseValue = function parseValue(label, value) {
    switch (label) {
      case SimilarDealsFieldsLabels.closeDate:
      case SimilarDealsFieldsLabels.clientDate:
        return useGetI18nSpacetime(value).format(t('dates.shortYear'));
      case SimilarDealsFieldsLabels.amount:
        return parseAmount(value, 0, 0);
      default:
        return value;
    }
  };
  return value ? /*#__PURE__*/jsxs("div", {
    className: styles$1.mainInfo,
    style: {
      width: isBubble ? '127px' : '47%'
    },
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$1.mainInfo_header,
      children: [label === SimilarDealsFieldsLabels.amount ? /*#__PURE__*/jsx(Text, {
        size: isBubble ? 'xs' : 's',
        color: "verySoftPeanut",
        children: "\u20AC"
      }) : /*#__PURE__*/jsx(Icon, {
        size: isBubble ? 14 : 16,
        name: getIconName(label),
        color: "verySoftPeanut"
      }), /*#__PURE__*/jsx(Text, {
        size: isBubble ? 'xs' : 's',
        weight: "bold",
        children: label
      })]
    }), /*#__PURE__*/jsx("div", {
      className: styles$1.mainInfo_body,
      children: label === SimilarDealsFieldsLabels.contact && typeof value === 'string' ? /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx(CopyText, {
          alwaysDisplay: true,
          textToCopy: value,
          children: /*#__PURE__*/jsx(Text, {
            size: isBubble ? 'xs' : 's',
            className: clsx(styles$1.mainInfo_value_with_buttons, _defineProperty$2({}, styles$1.mainInfo_value_with_buttons_short, isBubble)),
            children: value
          })
        }), link && /*#__PURE__*/jsx(IconButton, {
          name: "linkedin",
          color: "bloobirds",
          size: isBubble ? 14 : 16,
          onClick: function onClick() {
            return window.open(addHttpsIfNeeded(link), '_blank');
          }
        })]
      }) : /*#__PURE__*/jsx(Text, {
        size: isBubble ? 'xs' : 's',
        className: clsx(styles$1.mainInfo_value, _defineProperty$2({}, styles$1.mainInfo_value_short, isBubble)),
        children: parseValue(label, value)
      })
    })]
  }) : /*#__PURE__*/jsx(Fragment, {});
};
var CompanyCard = function CompanyCard(_ref2) {
  var company = _ref2.company,
    index = _ref2.index,
    isBubble = _ref2.isBubble;
  var _useHover = useHover(),
    _useHover2 = _slicedToArray$2(_useHover, 2),
    ref = _useHover2[0],
    isHovering = _useHover2[1];
  var controls = useAnimation();
  var variants = {
    start: function start() {
      return {
        scale: [0, 1.1, 1],
        opacity: [0, 1, 1],
        transition: {
          duration: 0.3,
          delay: index / 10
        }
      };
    }
  };
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.similarDealsTab'
    }),
    t = _useTranslation2.t;
  useEffect(function () {
    controls === null || controls === void 0 ? void 0 : controls.start('start');
  }, []);
  return /*#__PURE__*/jsxs(motion.div, {
    animate: controls,
    variants: variants,
    className: styles$1.container,
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$1.header,
      children: [/*#__PURE__*/jsx(CopyText, {
        alwaysDisplay: true,
        textToCopy: company.name,
        children: /*#__PURE__*/jsx(Text, {
          size: "m",
          color: "bloobirds",
          weight: "bold",
          className: clsx(styles$1.company_title, _defineProperty$2({}, styles$1.company_title_short, isBubble)),
          children: company.name
        })
      }), /*#__PURE__*/jsxs("div", {
        className: styles$1.headerRight,
        children: [/*#__PURE__*/jsx("div", {
          ref: ref,
          className: styles$1.chemistry_text,
          children: /*#__PURE__*/jsx(Dropdown, {
            width: 295,
            position: "bottom-end",
            arrow: true,
            visible: isHovering,
            anchor: /*#__PURE__*/jsx(Text, {
              color: getChemistryColor(company.chemistry),
              size: "m",
              weight: "bold",
              children: company.chemistry + '%'
            }),
            children: /*#__PURE__*/jsxs("div", {
              className: styles$1.chemistry_dropdown,
              children: [/*#__PURE__*/jsx(Text, {
                size: isBubble ? 's' : 'm',
                color: "softPeanut",
                children: t('matchesInSame')
              }), /*#__PURE__*/jsx("ul", {
                children: company.matchingFields.map(function (field) {
                  return /*#__PURE__*/jsxs("li", {
                    className: styles$1.matching_list_element,
                    children: [/*#__PURE__*/jsx(Icon, {
                      name: "circle",
                      size: 16,
                      color: "peanut"
                    }), /*#__PURE__*/jsxs(Text, {
                      size: isBubble ? 'xs' : 's',
                      className: styles$1.matching_list_text,
                      children: [/*#__PURE__*/jsxs("b", {
                        children: [field.label, ":"]
                      }), " ", field.value]
                    })]
                  }, field.label);
                })
              })]
            })
          })
        }), /*#__PURE__*/jsx(Label, {
          size: "small",
          color: company.companyType === 'Client' ? 'peanut' : 'softPeanut',
          value: company.companyType,
          uppercase: false,
          children: company.companyType
        })]
      })]
    }), /*#__PURE__*/jsx("div", {
      className: styles$1.mainInfo_container,
      children: getCompanyFieldsByType(company.companyType).map(function (field) {
        return /*#__PURE__*/jsx(MainInfoField, {
          label: SimilarDealsFieldsLabels[field],
          value: company[field],
          link: company[SimilarDealsFields.LINKEDIN_URL],
          isBubble: isBubble
        }, field);
      })
    })]
  });
};

var SimilarDealsTimeFilter = function SimilarDealsTimeFilter(_ref) {
  var dateFilter = _ref.dateFilter,
    setDateFilter = _ref.setDateFilter;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.similarDealsTab'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs("div", {
    className: styles$2._time_select,
    children: [/*#__PURE__*/jsx(Icon, {
      name: "calendar",
      color: "bloobirds",
      size: 16
    }), /*#__PURE__*/jsx(Select, {
      size: "small",
      borderless: true,
      placeholder: t('datePlaceholder'),
      value: dateFilter,
      onChange: function onChange(value) {
        setDateFilter(value);
      },
      children: DATE_FILTER_VALUES === null || DATE_FILTER_VALUES === void 0 ? void 0 : DATE_FILTER_VALUES.map(function (item) {
        return /*#__PURE__*/jsx(Item, {
          value: item.value,
          children: item.label
        }, item.value);
      })
    })]
  });
};

var InfoBanner = function InfoBanner() {
  var _useUserHelpers = useUserHelpers(),
    saveCustom = _useUserHelpers.saveCustom;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.similarDealsTab.infoBanner'
    }),
    t = _useTranslation.t;
  function handleLearnMore() {
    mixpanel.track('SMART_EMAIL_SIMILAR_DEALS_LEARN_MORE');
    window.open('https://support.bloobirds.com/hc/en-us/articles/9263498944540-5-ways-in-which-Similar-Won-Deals-will-help-you-close-a-new-deal', '_blank');
  }
  function banishBanner() {
    mixpanel.track('SMART_EMAIL_SIMILAR_DEALS_DONT_SHOW_BANNER');
    saveCustom({
      key: ExtensionHelperKeys.SIMILAR_DEALS_INFO_BANNER,
      data: 'Banner banished'
    });
  }
  return /*#__PURE__*/jsxs("div", {
    className: styles$2._info_banner,
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$2._info_banner_title,
      children: [/*#__PURE__*/jsx(Icon, {
        name: "book",
        color: "purple",
        size: 24
      }), /*#__PURE__*/jsx(Text, {
        size: "m",
        color: "purple",
        weight: "bold",
        children: t('title')
      })]
    }), /*#__PURE__*/jsx(Text, {
      size: "xs",
      color: "purple",
      weight: "regular",
      children: /*#__PURE__*/jsx(Trans, {
        i18nKey: "smartEmailModal.similarDealsTab.infoBanner.content"
      })
    }), /*#__PURE__*/jsxs("div", {
      className: styles$2._info_banner_footer,
      children: [/*#__PURE__*/jsx(Checkbox, {
        color: "purple",
        size: "small",
        onClick: function onClick(value) {
          if (value) banishBanner();
        },
        children: /*#__PURE__*/jsx(Text, {
          size: "xs",
          children: t('checkBox')
        })
      }), /*#__PURE__*/jsxs(Button, {
        size: "small",
        variant: "secondary",
        color: "purple",
        uppercase: false,
        onClick: handleLearnMore,
        children: [/*#__PURE__*/jsx(Icon, {
          name: "book",
          color: "purple",
          size: 16
        }), /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "purple",
          weight: "bold",
          children: t('learnMore')
        })]
      })]
    })]
  });
};
var NoDeals = function NoDeals() {
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.similarDealsTab.noDeals'
    }),
    t = _useTranslation2.t;
  return /*#__PURE__*/jsxs("div", {
    className: styles$2._no_results_container,
    children: [/*#__PURE__*/jsx(Icon, {
      name: "searchNone",
      color: "softPeanut",
      size: 36
    }), /*#__PURE__*/jsxs("div", {
      children: [/*#__PURE__*/jsx(Text, {
        size: "m",
        align: "center",
        color: "softPeanut",
        weight: "bold",
        children: t('title')
      }), /*#__PURE__*/jsx(Text, {
        size: "s",
        align: "center",
        color: "softPeanut",
        children: t('subtitle')
      })]
    })]
  });
};
var SimilarDealsContent = function SimilarDealsContent(_ref) {
  var activeBobject = _ref.activeBobject,
    similarDealsHook = _ref.similarDealsHook,
    _ref$isBubble = _ref.isBubble,
    isBubble = _ref$isBubble === void 0 ? false : _ref$isBubble;
  var _useUserHelpers2 = useUserHelpers(),
    get = _useUserHelpers2.get;
  var bannerStatus = get(ExtensionHelperKeys.SIMILAR_DEALS_INFO_BANNER);
  var hasSeenTheBanner = !!bannerStatus && bannerStatus !== 'Banner banished';
  var ref = useRef();
  var _useTranslation3 = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.similarDealsTab'
    }),
    t = _useTranslation3.t;
  var _ref2 = similarDealsHook || {},
    similarDeals = _ref2.similarDeals,
    isLoading = _ref2.isLoading,
    error = _ref2.error,
    dateFilter = _ref2.dateFilter,
    setDateFilter = _ref2.setDateFilter;
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$2._header,
      children: [/*#__PURE__*/jsx(Text, {
        size: "m",
        color: "peanut",
        weight: "medium",
        children: t('title')
      }), /*#__PURE__*/jsx(SimilarDealsTimeFilter, {
        dateFilter: dateFilter,
        setDateFilter: setDateFilter
      })]
    }), !bannerStatus && /*#__PURE__*/jsx(InfoBanner, {}), error || !activeBobject ? /*#__PURE__*/jsx("div", {
      className: styles$2._no_results,
      children: /*#__PURE__*/jsx(NoDataPage, {
        objectName: t('deals').toLowerCase()
      })
    }) : /*#__PURE__*/jsx("div", {
      className: styles$2._deals_container,
      ref: ref,
      children: isLoading ? /*#__PURE__*/jsx(SimilarDealsSkeleton, {}) : /*#__PURE__*/jsx(Fragment, {
        children: (similarDeals === null || similarDeals === void 0 ? void 0 : similarDeals.length) > 0 ? similarDeals === null || similarDeals === void 0 ? void 0 : similarDeals.map(function (company, index) {
          return /*#__PURE__*/jsx(CompanyCard, {
            company: company,
            index: index,
            isBubble: isBubble
          }, company.name);
        }) : /*#__PURE__*/jsx(NoDeals, {})
      })
    }), hasSeenTheBanner && /*#__PURE__*/jsx(InfoBanner, {})]
  });
};

//@ts-ignore
var SimilarDealsTab = function SimilarDealsTab() {
  var _useSmartEmailModal = useSmartEmailModal(),
    similarDealsHook = _useSmartEmailModal.similarDealsHook,
    activeBobject = _useSmartEmailModal.activeBobject;
  return /*#__PURE__*/jsx("div", {
    className: styles$2._wrapper,
    children: /*#__PURE__*/jsx(SimilarDealsContent, {
      activeBobject: activeBobject,
      similarDealsHook: similarDealsHook
    })
  });
};

var css_248z = ".templatesTab-module_backButton__I8UFy{\n  display: flex;\n  gap: 4px;\n  align-items: center;\n  cursor: pointer;\n}\n\n.templatesTab-module_filterDetailContainer__-Gaj7{\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  padding: 28px 26px;\n  height: 100%;\n}\n\n.templatesTab-module_modalContentWrapper__GHPQ2{\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  padding: 0;\n}\n\n.templatesTab-module_modalFilterWrapper__xf3kS{\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  padding: 0 8px;\n}\n\n.templatesTab-module_filterElementsContainer__Wutfh{\n  display: flex;\n  overflow-y: scroll;\n  overflow-x: hidden;\n  width: 396px;\n  padding-right: 20px;\n  height: 100%;\n}\n";
var styles = {"backButton":"templatesTab-module_backButton__I8UFy","filterDetailContainer":"templatesTab-module_filterDetailContainer__-Gaj7","modalContentWrapper":"templatesTab-module_modalContentWrapper__GHPQ2","modalFilterWrapper":"templatesTab-module_modalFilterWrapper__xf3kS","filterElementsContainer":"templatesTab-module_filterElementsContainer__Wutfh"};
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
function getPage(selectedTemplate, filterDetailView) {
  if (selectedTemplate) {
    return selectedTemplate.edit ? 'EditOrCreateTemplate' : 'TemplateDetail';
  } else {
    return filterDetailView ? 'SegmentationFilters' : 'PlaybookFeed';
  }
}
var getDeserializedTemplate = function getDeserializedTemplate(content, format, plugins) {
  return JSON.parse(JSON.stringify(deserialize(content, {
    format: format,
    plugins: plugins
  })));
};
var insertText = function insertText(editor, template, plugins, position) {
  var deserializedTemplate = getDeserializedTemplate(template.content, template.format, plugins);
  //removeNodes(editor, { at: position });
  insertNodes(editor, deserializedTemplate, {
    at: position
  });
};
var TemplatesTab = function TemplatesTab(_ref) {
  var tabProps = _ref.tabProps;
  var bodyEditor = tabProps.bodyEditor;
  var _useSmartEmailModal = useSmartEmailModal(),
    activeBobject = _useSmartEmailModal.activeBobject,
    company = _useSmartEmailModal.company,
    leads = _useSmartEmailModal.leads,
    opportunities = _useSmartEmailModal.opportunities,
    playbookTab = _useSmartEmailModal.playbookTab,
    setPlaybookTab = _useSmartEmailModal.setPlaybookTab,
    replaceEmailBodyWithTemplate = _useSmartEmailModal.replaceEmailBodyWithTemplate,
    selectedTemplate = _useSmartEmailModal.selectedTemplate,
    setSelectedTemplate = _useSmartEmailModal.setSelectedTemplate,
    mutateSnippets = _useSmartEmailModal.mutateSnippets,
    accountId = _useSmartEmailModal.accountId,
    contactBobject = _useSmartEmailModal.contactBobject;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.playbookTab'
    }),
    t = _useTranslation.t;
  var isSalesEnabled = useFullSalesEnabled(accountId);
  var _useState = useState(false),
    _useState2 = _slicedToArray$1(_useState, 2),
    filterDetailView = _useState2[0],
    setFilterDetailView = _useState2[1];
  var bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: true,
    replaceMeetingLinks: true,
    rawHTMLBlock: true,
    replyHistory: true
  });
  var onClickCard = function onClickCard(template) {
    setSelectedTemplate(_objectSpread$1(_objectSpread$1({}, template), {}, {
      edit: false
    }));
  };
  var replaceTemplate = function replaceTemplate(template) {
    replaceEmailBodyWithTemplate(template);
  };
  var insertTemplate = function insertTemplate(template) {
    var bodySelection = bodyEditor === null || bodyEditor === void 0 ? void 0 : bodyEditor.selection;
    insertText(bodyEditor, template, bodyPlugins, bodySelection !== null && bodySelection !== void 0 ? bodySelection : [0]);
  };
  var dataModel = useDataModel();
  var isSalesStage = useMemo(function () {
    return !!activeBobject && getIsSales(dataModel, activeBobject);
  }, [!!dataModel, activeBobject === null || activeBobject === void 0 ? void 0 : activeBobject.id.value]);
  var stage = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findValueById(activeBobject === null || activeBobject === void 0 ? void 0 : activeBobject.stage);
  var _useState3 = useState({
      segmentationData: undefined,
      stage: isSalesStage ? TemplateStage.Sales : TemplateStage.Prospecting,
      visibilityFilters: {
        onlyMine: false,
        onlyOfficial: false,
        onlyPrivate: false,
        onlyBattlecards: false
      }
    }),
    _useState4 = _slicedToArray$1(_useState3, 2),
    segmentationValues = _useState4[0],
    setSegmentationValues = _useState4[1];
  var defaultStage = isSalesStage ? TemplateStage.Sales : TemplateStage.Prospecting;
  var playbookStage = segmentationValues !== null && segmentationValues !== void 0 && segmentationValues.stage ? segmentationValues.stage : defaultStage;
  var _usePlaybook = usePlaybook({
      stage: playbookStage,
      // @ts-ignore workaround to use the activeBobject segmentation if the selected ones on the to: field are not valid
      bobjectData: {
        company: company,
        activeBobject: activeBobject !== null && activeBobject !== void 0 && activeBobject.rawBobject ? activeBobject : contactBobject
      }
    }),
    segmentationFields = _usePlaybook.segmentationFields,
    activeBobjectSegmentationValues = _usePlaybook.activeBobjectSegmentationValues;
  useEffect(function () {
    setSegmentationValues(function (values) {
      return _objectSpread$1(_objectSpread$1({}, values), {}, {
        stage: !activeBobject ? TemplateStage.All : defaultStage
      });
    });
  }, [isSalesStage]);
  useEffect(function () {
    setSegmentationValues(function (values) {
      return _objectSpread$1(_objectSpread$1({}, values), {}, {
        segmentationData: activeBobjectSegmentationValues
      });
    });
  }, [activeBobjectSegmentationValues]);
  function editTemplate(template) {
    setSelectedTemplate(_objectSpread$1(_objectSpread$1({}, template), {}, {
      edit: true
    }));
  }
  var page = getPage(selectedTemplate, filterDetailView);
  var contextProps = useSmartEmailModal();
  switch (page) {
    case 'EditOrCreateTemplate':
      return /*#__PURE__*/jsx(HandleTemplate, {
        contextProps: contextProps,
        accountId: accountId,
        onBack: function onBack() {
          return setSelectedTemplate(null);
        },
        template: selectedTemplate,
        mutateSnippets: mutateSnippets,
        contextValues: stage ? typeof stage === 'string' ? {
          stage: stage
        } : {
          stage: stage.name.toUpperCase()
        } : {}
      });
    case 'TemplateDetail':
      return /*#__PURE__*/jsx(TemplateDetail, {
        setSelectedTemplate: setSelectedTemplate,
        template: selectedTemplate,
        extended: true,
        backButtonAction: function backButtonAction() {
          return setSelectedTemplate(null);
        },
        replaceButtonAction: replaceTemplate,
        insertButtonAction: insertTemplate
      });
    case 'SegmentationFilters':
      return /*#__PURE__*/jsxs("div", {
        className: styles.filterDetailContainer,
        children: [/*#__PURE__*/jsxs("div", {
          className: styles.backButton,
          onClick: function onClick() {
            return setFilterDetailView(false);
          },
          children: [/*#__PURE__*/jsx(Icon, {
            name: 'arrowLeft',
            size: 20,
            color: "purple"
          }), /*#__PURE__*/jsx(Text, {
            size: "s",
            color: "purple",
            children: t('header.back')
          })]
        }), /*#__PURE__*/jsx("div", {
          className: styles.filterElementsContainer,
          children: /*#__PURE__*/jsx(SegmentationFilter, {
            isSmartEmail: true,
            shouldShowBattlecards: [PlaybookTab.SNIPPETS, PlaybookTab.PITCHES].includes(playbookTab),
            shouldShowVisibilityFilters: playbookTab !== PlaybookTab.QQS,
            activeBobjectSegmentationValues: activeBobjectSegmentationValues,
            isSalesEnabled: isSalesEnabled,
            segmentationFields: segmentationFields,
            setFiltersContext: setSegmentationValues,
            filterValues: segmentationValues === null || segmentationValues === void 0 ? void 0 : segmentationValues.segmentationData,
            visibilityFilters: segmentationValues === null || segmentationValues === void 0 ? void 0 : segmentationValues.visibilityFilters,
            stage: segmentationValues === null || segmentationValues === void 0 ? void 0 : segmentationValues.stage,
            defaultStage: !activeBobject ? TemplateStage.All : defaultStage
          })
        })]
      });
    case 'PlaybookFeed':
      return /*#__PURE__*/jsx(PlaybookFeed, {
        shouldShowTemplateSuggestions: true,
        accountId: accountId,
        environment: Environment.SMART_EMAIL,
        selectedTab: playbookTab,
        setSelectedTab: setPlaybookTab,
        activeBobject: activeBobject,
        isMainBobjectSalesStage: isSalesStage,
        company: company,
        leads: leads,
        opportunities: opportunities,
        onCardClicked: onClickCard,
        toggleFilterView: function toggleFilterView() {
          return setFilterDetailView(true);
        },
        segmentationFields: segmentationFields,
        setFiltersContext: setSegmentationValues,
        segmentationValues: segmentationValues === null || segmentationValues === void 0 ? void 0 : segmentationValues.segmentationData,
        visibilityFilters: segmentationValues === null || segmentationValues === void 0 ? void 0 : segmentationValues.visibilityFilters,
        stage: segmentationValues === null || segmentationValues === void 0 ? void 0 : segmentationValues.stage,
        templateFunctions: {
          replaceTemplate: replaceTemplate,
          insertTemplate: insertTemplate,
          editTemplate: editTemplate
        }
      });
    default:
      return /*#__PURE__*/jsx(Fragment, {});
  }
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var emailHelperTabs = function emailHelperTabs(parentRef, tabProps) {
  var _useSmartEmailModal = useSmartEmailModal(),
    newLeadInfo = _useSmartEmailModal.newLeadInfo;
  var _useObjectCreationSet = useObjectCreationSettings(),
    enabledObjectCreation = _useObjectCreationSet.enabledObjectCreation;
  var isB2CAccount = useIsB2CAccount();
  var _useSmartEmailModal2 = useSmartEmailModal(),
    dataModel = _useSmartEmailModal2.dataModel,
    user = _useSmartEmailModal2.user,
    selectedActivity = _useSmartEmailModal2.selectedActivity,
    setSelectedActivity = _useSmartEmailModal2.setSelectedActivity,
    activeBobject = _useSmartEmailModal2.activeBobject,
    opportunity = _useSmartEmailModal2.opportunity,
    pageBobjectType = _useSmartEmailModal2.pageBobjectType,
    filters = _useSmartEmailModal2.filters,
    setFilters = _useSmartEmailModal2.setFilters,
    company = _useSmartEmailModal2.company,
    leads = _useSmartEmailModal2.leads,
    accountId = _useSmartEmailModal2.accountId;
  return _objectSpread(_objectSpread(_defineProperty(_defineProperty({}, SmartEmailTab.PREVIEW, {
    title: 'Preview',
    icon: 'eye',
    dataTest: 'previewTab',
    key: 'previewTab',
    tab: /*#__PURE__*/jsx(PreviewTab, {
      previewTabProps: tabProps
    }),
    visible: true
  }), SmartEmailTab.PAST_ACTIVITY, {
    title: 'Past Activity',
    dataTest: 'pastActivityTab',
    key: 'pastActivityTab',
    icon: 'historyNonFlipped',
    tab: /*#__PURE__*/jsx(PastActivityTab, {
      ref: parentRef,
      accountId: accountId,
      dataModel: dataModel,
      user: user,
      selectedActivity: selectedActivity,
      setSelectedActivity: setSelectedActivity,
      subscribeMutator: function subscribeMutator(mutator) {
        return useSubscribeListeners(BobjectTypes.Activity, mutator);
      },
      data: {
        activeBobject: activeBobject,
        opportunity: opportunity,
        pageBobjectType: pageBobjectType,
        filters: filters,
        setFilters: setFilters,
        company: company,
        leads: leads
      }
    }),
    visible: true
  }), isB2CAccount ? {} : _defineProperty({}, SmartEmailTab.CLOSED_DEALS, {
    title: 'Similar won deals',
    dataTest: 'similarWonDealsTab',
    key: 'similarWonDealsTab',
    icon: 'fileOpportunity',
    tab: /*#__PURE__*/jsx(SimilarDealsTab, {}),
    visible: true,
    workInProgress: false
  })), {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, SmartEmailTab.TEMPLATES, {
    title: 'Templates & Snippets',
    dataTest: 'templatesTab',
    key: 'templatesTab',
    icon: 'file',
    tab: /*#__PURE__*/jsx(TemplatesTab, {
      tabProps: tabProps
    }),
    visible: true,
    workInProgress: false
  }), SmartEmailTab.CREATE_TASK, {
    title: 'New Task',
    dataTest: 'createTaskTab',
    key: 'createTaskTab',
    icon: 'checkDouble',
    tab: /*#__PURE__*/jsx(CreateTaskTab, {}),
    visible: true
  }), SmartEmailTab.CREATE_LEAD, {
    title: 'Create Lead',
    dataTest: 'createLeadTab',
    key: 'createLeadTab',
    icon: 'personAdd',
    tab: /*#__PURE__*/jsx(CreateLeadTab, {}),
    visible: (newLeadInfo === null || newLeadInfo === void 0 ? void 0 : newLeadInfo.email) !== undefined && enabledObjectCreation
  }), SmartEmailTab.CALENDAR, {
    title: 'Calendar',
    dataTest: 'calendarTab',
    key: 'calendarTab',
    icon: 'calendar',
    tab: /*#__PURE__*/jsx(CalendarTab, {
      tabProps: tabProps
    }),
    visible: true
  }));
};
var DATE_FILTER_DAY_VALUES = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, DateFilterValues.LAST_30_DAYS, 30), DateFilterValues.LAST_90_DAYS, 90), DateFilterValues.LAST_180_DAYS, 180), DateFilterValues.LAST_YEAR, 365), DateFilterValues.ALL_TIME, 10000);
var DATE_FILTER_VALUES = [{
  value: DateFilterValues.LAST_30_DAYS,
  label: 'Last 30 days'
}, {
  value: DateFilterValues.LAST_90_DAYS,
  label: 'Last 3 months'
}, {
  value: DateFilterValues.LAST_180_DAYS,
  label: 'Last 6 months'
}, {
  value: DateFilterValues.LAST_YEAR,
  label: 'Last year'
}, {
  value: DateFilterValues.ALL_TIME,
  label: 'All time'
}];

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var useSimilarDeals = function useSimilarDeals(accountId, companyId) {
  var _useState = useState(DateFilterValues.LAST_90_DAYS),
    _useState2 = _slicedToArray(_useState, 2),
    dateFilter = _useState2[0],
    _setDateFilter = _useState2[1];
  var fetchDeals = function fetchDeals() {
    var dateTo = spacetime(subDays(new Date(), 1)).format('iso-short');
    var dateFrom = spacetime(subDays(new Date(), DATE_FILTER_DAY_VALUES[dateFilter])).format('iso-short');
    if (!companyId) return;
    return api.get("/bobjects/".concat(accountId, "/match/companies?bobjectId=").concat(companyId, "&dateFrom=").concat(dateFrom, "&dateTo=").concat(dateTo));
  };
  var _useSWR = useSWR(accountId && companyId && "/similarDeals/".concat(companyId, "/").concat(dateFilter), fetchDeals),
    data = _useSWR.data,
    error = _useSWR.error,
    isLoading = _useSWR.isLoading;
  return {
    data: data,
    isLoading: isLoading,
    dateFilter: dateFilter,
    setDateFilter: function setDateFilter(date) {
      if (!isEqual(date, dateFilter)) {
        _setDateFilter(date);
      }
    },
    error: error,
    similarDeals: data && data.data
  };
};

export { CancelEmailModal, ClearSelect, CustomDateDialog, EmailModalRow, NoContacts, PreviewActivityEmailModal, PreviewEmailModal, PreviewTemplateModal, ScheduleEmailModal, SendEmailModal, SimilarDealsContent, SmartEmailModal, checkIfIsEmpty, useSimilarDeals, useSmartEmailModal };
//# sourceMappingURL=index.js.map
