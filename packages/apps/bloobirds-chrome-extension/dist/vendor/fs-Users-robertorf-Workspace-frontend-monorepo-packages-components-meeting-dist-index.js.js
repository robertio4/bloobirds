import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-dist-index.js.js");import RefreshRuntime from "/vendor/react-refresh.js";let prevRefreshReg;let prevRefreshSig;if (import.meta.hot) {  if (!window.__vite_plugin_react_preamble_installed__) {    throw new Error(      "@vitejs/plugin-react can't detect preamble. Something is wrong. " +      "See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201"    );  }  prevRefreshReg = window.$RefreshReg$;  prevRefreshSig = window.$RefreshSig$;  window.$RefreshReg$ = (type, id) => {    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/dist/index.js" + " " + id)  };  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;}var _s2 = $RefreshSig$(),
  _s3 = $RefreshSig$(),
  _s4 = $RefreshSig$(),
  _s5 = $RefreshSig$(),
  _s6 = $RefreshSig$(),
  _s7 = $RefreshSig$(),
  _s8 = $RefreshSig$(),
  _s9 = $RefreshSig$(),
  _s10 = $RefreshSig$(),
  _s11 = $RefreshSig$(),
  _s12 = $RefreshSig$(),
  _s13 = $RefreshSig$(),
  _s14 = $RefreshSig$(),
  _s15 = $RefreshSig$(),
  _s16 = $RefreshSig$(),
  _s17 = $RefreshSig$(),
  _s18 = $RefreshSig$(),
  _s19 = $RefreshSig$(),
  _s20 = $RefreshSig$(),
  _s21 = $RefreshSig$(),
  _s22 = $RefreshSig$(),
  _s23 = $RefreshSig$(),
  _s24 = $RefreshSig$(),
  _s25 = $RefreshSig$(),
  _s26 = $RefreshSig$(),
  _s27 = $RefreshSig$(),
  _s28 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useState = __vite__cjsImport2_react["useState"]; const createContext = __vite__cjsImport2_react["createContext"]; const useContext = __vite__cjsImport2_react["useContext"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"]; const useRef = __vite__cjsImport2_react["useRef"]; const useCallback = __vite__cjsImport2_react["useCallback"];
import { useTranslation } from '/vendor/.vite-deps-react-i18next.js__v--8418bf92.js';
import { Tooltip, IconButton, Text, Input, DateTimePicker, MultiSelect, CheckItem, Select, Item, TextArea, useVisible, Dropdown, Icon, Checkbox, Button, CompoundIcon, Avatar, Label, Section, ChipGroup, Chip, SearchInput, Spinner, useToasts, Modal, ModalFooter, DatePicker } from '/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js';
import clsx from '/vendor/.vite-deps-clsx.js__v--07c00239.js';
import { jsxs, jsx, Fragment } from '/vendor/id-__x00__react-jsx-runtime.js';
import { useFormContext, useController, useForm, FormProvider } from '/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js';
import { AutoCompleteSearchCompanies, useConfirmDeleteModal } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-dist-index.js.js';
import { useUserSearch, useActiveMessagingFilters, useQualifyingQuestions, useBobjectFieldGroups, useFullSalesEnabled, useMessagingTemplates, useIsB2CAccount, usePicklist, useUserHelpers, useMeetingReportResult, useActiveAccountId, useDebounce, useIsOTOAccount, useMinimizableModal, useMediaQuery, useDataModel } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js';
import { useGetI18nSpacetime } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js';
import { ChangeTimezoneModal } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-miscModals-dist-index.js.js';
import { useRichTextEditorPlugins, RichTextEditor, EditorToolbar, EditorToolbarFontStylesSection, EditorToolbarTextMarksSection, EditorToolbarListsSection, deserialize, serialize } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js';
import { ACTIVITY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, ACTIVITY_TYPES, BobjectTypes, TEMPLATE_TYPES, MEETING_MAIN_TYPE_VALUES, UserHelperKeys, ACTIVITY_TYPES_VALUES_LOGIC_ROLE, LEAD_STAGE_LOGIC_ROLE, COMPANY_FIELDS_LOGIC_ROLE, COMPANY_STAGE_LOGIC_ROLE, MIXPANEL_EVENTS } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js';
import { getUserTimeZone, getValueFromLogicRole, getReferencedBobjectFromLogicRole, api, keepPreviousResponse, injectReferencesSearchProcess, getFieldById, fetchAndOpenNylasUrl, isToday, toTitleCase, removeHtmlTags, isHtml, createParagraph, isEmail, removeScrollOfBox, recoverScrollOfBox, getFieldByLogicRole } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js';
import __vite__cjsImport15_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport15_mixpanelBrowser.__esModule ? __vite__cjsImport15_mixpanelBrowser.default : __vite__cjsImport15_mixpanelBrowser;
import spacetime from '/vendor/.vite-deps-spacetime.js__v--14e7d295.js';
import { atom, useRecoilState, useResetRecoilState, useSetRecoilState, useRecoilValue } from '/vendor/.vite-deps-recoil.js__v--5937b302.js';
import __vite__cjsImport18_recoilPersist from "/vendor/.vite-deps-recoil-persist.js__v--a151999f.js"; const recoilPersist = __vite__cjsImport18_recoilPersist["recoilPersist"];
import useSWR from '/vendor/.vite-deps-swr.js__v--ed0a962e.js';
import __vite__cjsImport20_lodash_throttle from "/vendor/.vite-deps-lodash_throttle.js__v--7a0691ef.js"; const throttle = __vite__cjsImport20_lodash_throttle.__esModule ? __vite__cjsImport20_lodash_throttle.default : __vite__cjsImport20_lodash_throttle;
import { DayCalendarBackground, Calendar as Calendar$1, Outlook, GoogleMeetWhiteSvg, GoogleMeetSvg } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-assets-dist-index.js.js';
import __vite__cjsImport22_lodash_truncate from "/vendor/.vite-deps-lodash_truncate.js__v--eb42b67f.js"; const truncate = __vite__cjsImport22_lodash_truncate.__esModule ? __vite__cjsImport22_lodash_truncate.default : __vite__cjsImport22_lodash_truncate;
import { useClickAway } from '/vendor/.vite-deps-react-use.js__v--5f516bce.js';
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
var css_248z$b = ".infoCardTemplate-module__container__o-i9E {\n  width: 328px;\n  border: solid 1px var(--veryLightBloobirds);\n  min-height: 435px;\n  display: flex;\n  box-shadow: 0 2px 4px 0 rgba(25, 145, 255, 0.08);\n  box-sizing: border-box;\n  align-items: center;\n  border-radius: 4px;\n  flex-direction: column;\n  background-color: var(--white);\n  padding: 16px;\n  position: relative;\n\n  height: 100%;\n}\n\n.infoCardTemplate-module__container_distinction__EWNwa::before {\n  content: '';\n  position: absolute;\n  height: 100%;\n  top: 0;\n  left: 0;\n  width: 4px;\n  z-index: 1;\n  border-top-left-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n\n.infoCardTemplate-module__container_sales__-a0Q4::before {\n  background-color: var(--peanut);\n}\n\n.infoCardTemplate-module__container_prospect__nM7Yo::before {\n  background-color: var(--verySoftGrape);\n}\n\n.infoCardTemplate-module__lead_container__pmWYe {\n  min-height: 460px;\n}\n\n.infoCardTemplate-module__info__container__dDQld {\n  display: flex;\n  margin-left: auto;\n  align-items: center;\n  position: absolute;\n  right: 12px;\n}\n\n.infoCardTemplate-module__mr_rating__container__wV-jb {\n  margin-left: 4px;\n}\n\n.infoCardTemplate-module__circular_badge__container__WKgY8 {\n  margin-bottom: 10px;\n}\n\n.infoCardTemplate-module__lead_dropdown_element__DD0GO {\n  margin-left: 4px;\n}\n\n.infoCardTemplate-module__circular_badge__badge__8TTUG {\n  box-shadow: 0 4px 4px rgb(0 0 0 / 25%);\n  border-radius: 50%;\n}\n\n.infoCardTemplate-module__opt_out_sign__-LpCW {\n  width: 24px;\n}\n\n.infoCardTemplate-module__name_wrapper__i3Jdj {\n  display: flex;\n  align-content: center;\n  margin-bottom: 16px;\n}\n\n.infoCardTemplate-module__name__container__VwHz5 {\n  display: flex;\n  align-items: center;\n}\n\n.infoCardTemplate-module__name_text__container__xYZzT {\n  margin-left: 8px;\n  flex-direction: row;\n}\n\n.infoCardTemplate-module__name_text__container__xYZzT > p {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  max-width: 250px;\n  margin-right: 8px;\n  overflow: hidden;\n}\n\n.infoCardTemplate-module__name_text__container__xYZzT:hover {\n  cursor: pointer;\n}\n\n.infoCardTemplate-module__edit_icon__SJnw2 {\n  visibility: hidden;\n}\n\n.infoCardTemplate-module__edit_icon__visible__zHeZs {\n  visibility: visible;\n}\n\n.infoCardTemplate-module__status__container__p9oGB {\n  margin-bottom: 16px;\n}\n\n.infoCardTemplate-module__status__container__clickable__W-7pj {\n  cursor: pointer;\n}\n\n.infoCardTemplate-module__status__container__clickable__W-7pj:hover {\n  opacity: 65%;\n}\n\n.infoCardTemplate-module__assignTo__container__KNvpL {\n  margin-bottom: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.infoCardTemplate-module__assignTo__container__KNvpL > div {\n  margin-right: 5px;\n}\n\n.infoCardTemplate-module__fields__container__qeptG {\n  display: flex;\n  align-items: flex-start;\n  width: 235px;\n  padding-left: 30px;\n  flex-direction: column;\n  overflow-y: hidden;\n  max-height: 200px;\n}\n\n.infoCardTemplate-module__fields__container__qeptG:hover {\n  overflow-y: auto;\n  overscroll-behavior-y: contain;\n}\n\n.infoCardTemplate-module__field__container__eP372 {\n  display: flex;\n  align-items: center;\n  margin-bottom: 10px;\n}\n\n.infoCardTemplate-module__link_field_container__vl1qO {\n  margin-bottom: 6px;\n}\n\n.infoCardTemplate-module__field__container__eP372 > div > svg {\n  margin-right: 4px;\n}\n\n.infoCardTemplate-module__field_link__obw3F {\n  font-size: 14px;\n  color: var(--bloobirds);\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  max-width: 210px;\n}\n\n.infoCardTemplate-module__warning__dot__-icYA {\n  background-color: var(--extraMeeting);\n  border-radius: 50%;\n  height: 10px;\n  width: 10px;\n  min-width: 10px;\n  min-height: 10px;\n}\n\n.infoCardTemplate-module__inactive__container__PoAFW {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--lightPeanut);\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n  height: 36px;\n  box-shadow: 0 -3px 6px var(--lighterGray);\n}\n\n.infoCardTemplate-module__inactive__container_pointer__XId-E {\n  cursor: pointer;\n}\n\n.infoCardTemplate-module__circular_badge__button__-qXxG {\n  position: absolute;\n  top: -44px;\n  right: 0;\n  width: 100%;\n  margin-bottom: 20px;\n}\n\n.infoCardTemplate-module__circular_badge__button_hovered__Qrv1O {\n  margin-bottom: 20px;\n}\n\n.infoCardTemplate-module__tag__container__k-o2s {\n  max-width: 80%;\n  padding: 8px 16px;\n  background: var(--lightestBloobirds);\n  border-radius: 16px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin: 16px;\n}\n\n.infoCardTemplate-module__tag__content__MPdrR > span {\n  margin-top: -4px;\n  margin-bottom: 4px;\n  display: block;\n}\n\n.infoCardTemplate-module__contextual__menu__b0mkh {\n  margin-left: 4px;\n}\n\n.infoCardTemplate-module_link__kq3EA {\n  margin-bottom: 8px;\n}\n\n.infoCardTemplate-module__copy_component__Wg3I3 {\n  display: flex;\n  align-self: flex-start;\n}\n\n.infoCardTemplate-module__copy_component__Wg3I3 > * > button {\n  align-self: flex-start;\n}\n\n.infoCardTemplate-module__link_copy_component__7DyEk {\n  height: 20px;\n}\n\n.infoCardTemplate-module__link_copy_component__7DyEk > * > button {\n  align-self: center;\n}\n\n.infoCardTemplate-module__copy_icon__Abudr {\n  margin-left: 6px;\n  opacity: 0;\n}\n\n.infoCardTemplate-module__show_icon__zPbuG {\n  opacity: 100;\n}\n\n.infoCardTemplate-module_link__kq3EA:hover {\n  cursor: pointer;\n}\n";
var styles$b = {
  "_container": "infoCardTemplate-module__container__o-i9E",
  "_container_distinction": "infoCardTemplate-module__container_distinction__EWNwa",
  "_container_sales": "infoCardTemplate-module__container_sales__-a0Q4",
  "_container_prospect": "infoCardTemplate-module__container_prospect__nM7Yo",
  "_lead_container": "infoCardTemplate-module__lead_container__pmWYe",
  "_info__container": "infoCardTemplate-module__info__container__dDQld",
  "_mr_rating__container": "infoCardTemplate-module__mr_rating__container__wV-jb",
  "_circular_badge__container": "infoCardTemplate-module__circular_badge__container__WKgY8",
  "_lead_dropdown_element": "infoCardTemplate-module__lead_dropdown_element__DD0GO",
  "_circular_badge__badge": "infoCardTemplate-module__circular_badge__badge__8TTUG",
  "_opt_out_sign": "infoCardTemplate-module__opt_out_sign__-LpCW",
  "_name_wrapper": "infoCardTemplate-module__name_wrapper__i3Jdj",
  "_name__container": "infoCardTemplate-module__name__container__VwHz5",
  "_name_text__container": "infoCardTemplate-module__name_text__container__xYZzT",
  "_edit_icon": "infoCardTemplate-module__edit_icon__SJnw2",
  "_edit_icon__visible": "infoCardTemplate-module__edit_icon__visible__zHeZs",
  "_status__container": "infoCardTemplate-module__status__container__p9oGB",
  "_status__container__clickable": "infoCardTemplate-module__status__container__clickable__W-7pj",
  "_assignTo__container": "infoCardTemplate-module__assignTo__container__KNvpL",
  "_fields__container": "infoCardTemplate-module__fields__container__qeptG",
  "_field__container": "infoCardTemplate-module__field__container__eP372",
  "_link_field_container": "infoCardTemplate-module__link_field_container__vl1qO",
  "_field_link": "infoCardTemplate-module__field_link__obw3F",
  "_warning__dot": "infoCardTemplate-module__warning__dot__-icYA",
  "_inactive__container": "infoCardTemplate-module__inactive__container__PoAFW",
  "_inactive__container_pointer": "infoCardTemplate-module__inactive__container_pointer__XId-E",
  "_circular_badge__button": "infoCardTemplate-module__circular_badge__button__-qXxG",
  "_circular_badge__button_hovered": "infoCardTemplate-module__circular_badge__button_hovered__Qrv1O",
  "_tag__container": "infoCardTemplate-module__tag__container__k-o2s",
  "_tag__content": "infoCardTemplate-module__tag__content__MPdrR",
  "_contextual__menu": "infoCardTemplate-module__contextual__menu__b0mkh",
  "link": "infoCardTemplate-module_link__kq3EA",
  "_copy_component": "infoCardTemplate-module__copy_component__Wg3I3",
  "_link_copy_component": "infoCardTemplate-module__link_copy_component__7DyEk",
  "_copy_icon": "infoCardTemplate-module__copy_icon__Abudr",
  "_show_icon": "infoCardTemplate-module__show_icon__zPbuG"
};
styleInject(css_248z$b);
function _typeof$a(obj) {
  "@babel/helpers - typeof";

  return _typeof$a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$a(obj);
}
function _defineProperty$a(obj, key, value) {
  key = _toPropertyKey$a(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$a(arg) {
  var key = _toPrimitive$a(arg, "string");
  return _typeof$a(key) === "symbol" ? key : String(key);
}
function _toPrimitive$a(input, hint) {
  if (_typeof$a(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$a(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$e(arr, i) {
  return _arrayWithHoles$e(arr) || _iterableToArrayLimit$e(arr, i) || _unsupportedIterableToArray$h(arr, i) || _nonIterableRest$e();
}
function _nonIterableRest$e() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$h(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$h(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$h(o, minLen);
}
function _arrayLikeToArray$h(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$e(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles$e(arr) {
  if (Array.isArray(arr)) return arr;
}
var CopyText = function CopyText(_ref) {
  _s2();
  var children = _ref.children,
    _ref$isLinkTypeField = _ref.isLinkTypeField,
    isLinkTypeField = _ref$isLinkTypeField === void 0 ? false : _ref$isLinkTypeField,
    _ref$htmlFormat = _ref.htmlFormat,
    htmlFormat = _ref$htmlFormat === void 0 ? false : _ref$htmlFormat,
    textToCopy = _ref.textToCopy,
    _ref$alwaysDisplay = _ref.alwaysDisplay,
    alwaysDisplay = _ref$alwaysDisplay === void 0 ? false : _ref$alwaysDisplay;
  if (! /*#__PURE__*/React.isValidElement(children)) throw new Error('The copy component is not recieving the appropiate children');
  var _useState = useState(false),
    _useState2 = _slicedToArray$e(_useState, 2),
    isVisible = _useState2[0],
    setIsVisible = _useState2[1];
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'copyText'
    }),
    t = _useTranslation.t;
  var _useState3 = useState(t('copyToClipboard')),
    _useState4 = _slicedToArray$e(_useState3, 2),
    tooltipText = _useState4[0],
    setTooltipText = _useState4[1];
  function handleOnClick() {
    setTooltipText(t('copied'));
    var clipboardElement = htmlFormat ? new ClipboardItem({
      // @ts-ignore
      'text/html': new Blob(["".concat(textToCopy)], {
        type: 'text/html'
      })
    }) : new ClipboardItem({
      // @ts-ignore
      'text/plain': new Blob(["".concat(textToCopy)], {
        type: 'text/plain'
      })
    });
    navigator.clipboard.write([clipboardElement]);
  }
  return /*#__PURE__*/jsxs("div", {
    onMouseEnter: function onMouseEnter() {
      return setIsVisible(true);
    },
    onMouseLeave: function onMouseLeave() {
      setIsVisible(false);
      setTooltipText(t('copyToClipboard'));
    },
    className: clsx(styles$b._copy_component, _defineProperty$a({}, styles$b._link_copy_component, isLinkTypeField)),
    children: [children, /*#__PURE__*/jsx(Tooltip, {
      title: tooltipText,
      position: "top",
      children: /*#__PURE__*/jsx(IconButton, {
        size: 16,
        name: "copy",
        className: clsx(styles$b._copy_icon, _defineProperty$a({}, styles$b._show_icon, isVisible || alwaysDisplay)),
        onClick: handleOnClick
      })
    })]
  });
};
_s2(CopyText, "w/1/4CpsOzYCchMFHC8MuJ40hOQ=", false, function () {
  return [useTranslation];
});
_c = CopyText;
var MeetingModalContext = /*#__PURE__*/createContext({
  id: null,
  accountId: null,
  userId: null,
  settings: null,
  connections: null,
  mutateConnections: null,
  dataModel: null
});
function _toConsumableArray$6(arr) {
  return _arrayWithoutHoles$6(arr) || _iterableToArray$6(arr) || _unsupportedIterableToArray$g(arr) || _nonIterableSpread$6();
}
function _nonIterableSpread$6() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$g(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$g(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$g(o, minLen);
}
function _iterableToArray$6(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$6(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$g(arr);
}
function _arrayLikeToArray$g(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function calculateCollisions(events) {
  var collisionMap = {};
  events.forEach(function (event, index) {
    events === null || events === void 0 ? void 0 : events.forEach(function (eventToCompare, otherIndex) {
      if (index !== otherIndex) {
        //The event starts after or at the same time as the event to compare and ends before or at the same time as the event to compare
        if (event.startTimeTimestamp > eventToCompare.startTimeTimestamp && event.startTimeTimestamp < eventToCompare.endTimeTimestamp || event.endTimeTimestamp > eventToCompare.startTimeTimestamp && event.endTimeTimestamp < eventToCompare.endTimeTimestamp || event.startTimeTimestamp < eventToCompare.startTimeTimestamp && event.endTimeTimestamp > eventToCompare.startTimeTimestamp || event.startTimeTimestamp < eventToCompare.endTimeTimestamp && event.endTimeTimestamp > eventToCompare.endTimeTimestamp || event.startTimeTimestamp === eventToCompare.startTimeTimestamp || event.endTimeTimestamp === eventToCompare.endTimeTimestamp) {
          collisionMap[index] = collisionMap[index] ? collisionMap[index]
          // @ts-ignore
          .add(otherIndex) : new Set([otherIndex]);
        }
      }
    });
  });
  events.forEach(function (event, index) {
    // Given the collision map for an event, the collisions is the amount of times the event appears as collisions of other events
    // @ts-ignore
    events.forEach(function (eventToCompare, otherIndex) {
      if (index !== otherIndex) {
        var _collisionMap$otherIn;
        // @ts-ignore
        if ((_collisionMap$otherIn = collisionMap[otherIndex]) !== null && _collisionMap$otherIn !== void 0 && _collisionMap$otherIn.has(index)) {
          event.collisions = event.collisions + 1;
        }
      }
    });

    // @ts-ignore
    if (collisionMap[index] instanceof Set) {
      // @ts-ignore
      var collisionMapSet = collisionMap[index];
      // @ts-ignore
      collisionMapSet.forEach(function (collision) {
        var indexOfCollision = parseInt(collision);
        if (event.collisionNumber === 0 && events[collision].collisions > event.collisions) {
          event.collisionNumber = events[collision].collisionNumber;
          //event.collisions = events[collision].collisions;
        }

        if (index > indexOfCollision) {
          // @ts-ignore
          if (collisionMap[indexOfCollision] instanceof Set) {
            // @ts-ignore
            if (collisionMap[indexOfCollision].has(index)) {
              event.collisionNumber++;
            }
          }
        }
      });
    }
  });
  return events;
}
function getDuration(startTime, endTime) {
  // @ts-ignore
  var diff = new Date(endTime) - new Date(startTime);
  return Math.round(diff / 60000);
}
function createParticipantsFromBloobirdsActivity(event, users) {
  var _users$users;
  var accountExecutive = getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE, true);
  var lead = getReferencedBobjectFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  var leadName =
  //@ts-ignore
  lead && ((lead === null || lead === void 0 ? void 0 : lead.fullName) || getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME, true));
  var leadEmail =
  //@ts-ignore
  lead && ((lead === null || lead === void 0 ? void 0 : lead.email) || getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL, true));
  var activityUser = getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  var user = activityUser && (users === null || users === void 0 ? void 0 : (_users$users = users.users) === null || _users$users === void 0 ? void 0 : _users$users.find(function (u) {
    return (u === null || u === void 0 ? void 0 : u.id) === activityUser;
  }));
  var parsedAccountExecutive = accountExecutive ?
  // @ts-ignore
  {
    name: null,
    email: accountExecutive,
    type: 'AE'
  } : null;
  var parsedLead = lead && {
    name: leadName,
    email: leadEmail,
    type: 'Lead'
  };
  var parsedUser = user && {
    name: user === null || user === void 0 ? void 0 : user.name,
    email: user === null || user === void 0 ? void 0 : user.email,
    type: 'Organizer'
  };
  var participants = new Set([parsedAccountExecutive, parsedLead, parsedUser]);
  return Array.from(participants);
}
function parseEvents(events, type, users, selectedTimezone, calendarsWithColors, bannedEvent) {
  if (!events) {
    return {};
  }
  if (!type) {
    return {};
  }
  var eventPerDay = events === null || events === void 0 ? void 0 : events.reduce(function (perDay, event) {
    var _event$when;
    if (event !== null && event !== void 0 && (_event$when = event.when) !== null && _event$when !== void 0 && _event$when.startTime && (event === null || event === void 0 ? void 0 : event.status) !== 'cancelled' && (event === null || event === void 0 ? void 0 : event.id) !== bannedEvent) {
      var _event$when2, _event$when3;
      var startSpaceTimeDate = spacetime(event === null || event === void 0 ? void 0 : (_event$when2 = event.when) === null || _event$when2 === void 0 ? void 0 : _event$when2.startTime);
      var date = startSpaceTimeDate["goto"](selectedTimezone || getUserTimeZone()).format('iso-short');
      var endSpaceTimeDate = spacetime(event === null || event === void 0 ? void 0 : (_event$when3 = event.when) === null || _event$when3 === void 0 ? void 0 : _event$when3.endTime);
      var endDate = endSpaceTimeDate["goto"](selectedTimezone || getUserTimeZone()).format('iso-short');
      var colorEvent = calendarsWithColors === null || calendarsWithColors === void 0 ? void 0 : calendarsWithColors.find(function (c) {
        return (c === null || c === void 0 ? void 0 : c.calendarId) === event.calendarId;
      });
      if (date === endDate) {
        var _event$when4, _event$when5, _event$when6, _event$when7, _event$when8;
        perDay[date] = [].concat(_toConsumableArray$6(perDay[date] || []), [{
          duration: getDuration((_event$when4 = event.when) === null || _event$when4 === void 0 ? void 0 : _event$when4.startTime, (_event$when5 = event.when) === null || _event$when5 === void 0 ? void 0 : _event$when5.endTime),
          id: event.id,
          title: event.title,
          startTime: (_event$when6 = event.when) === null || _event$when6 === void 0 ? void 0 : _event$when6.startTime,
          endTime: (_event$when7 = event.when) === null || _event$when7 === void 0 ? void 0 : _event$when7.endTime,
          startTimeTimestamp: startSpaceTimeDate.epoch,
          endTimeTimestamp: endSpaceTimeDate.epoch,
          participants: event.participants,
          collisions: 0,
          collisionNumber: 0,
          day: spacetime((_event$when8 = event.when) === null || _event$when8 === void 0 ? void 0 : _event$when8.startTime).startOf('day').format('iso-short'),
          type: 'nylas',
          calendarId: event.calendarId,
          backgroundColor: colorEvent === null || colorEvent === void 0 ? void 0 : colorEvent.color,
          barColor: colorEvent === null || colorEvent === void 0 ? void 0 : colorEvent.barColor,
          owner: event.owner
        }]);
      }
    } else if (getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.TIME)) {
      var _event$id;
      var spacetimeStartDatetime = spacetime(getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.TIME));
      var startDatetime = spacetimeStartDatetime === null || spacetimeStartDatetime === void 0 ? void 0 : spacetimeStartDatetime["goto"](selectedTimezone || getUserTimeZone());
      var duration = parseInt(getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION), 10) || 60;
      var endDatetime = spacetimeStartDatetime === null || spacetimeStartDatetime === void 0 ? void 0 : spacetimeStartDatetime["goto"](selectedTimezone || getUserTimeZone()).add(duration, 'minute');
      var _date = spacetimeStartDatetime.format('iso-short');
      perDay[_date] = [].concat(_toConsumableArray$6(perDay[_date] || []), [{
        duration: duration,
        id: event === null || event === void 0 ? void 0 : (_event$id = event.id) === null || _event$id === void 0 ? void 0 : _event$id.value,
        title: getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.TITLE),
        startTime: startDatetime.format('iso-utc'),
        endTime: endDatetime.format('iso-utc'),
        startTimeTimestamp: startDatetime.epoch,
        endTimeTimestamp: endDatetime.epoch,
        participants: createParticipantsFromBloobirdsActivity(event, users),
        collisions: 0,
        collisionNumber: 0,
        day: spacetime(startDatetime).startOf('day').format('iso-short'),
        type: 'bloobirds',
        calendarId: 'bloobirds-event'
      }]);
    }
    return perDay;
  }, {});

  // Calculate and set the collisions, and the collision number. Two events are considered a collision if their start time is between the start time and the end time of the other.
  Object.keys(eventPerDay).map(function (date) {
    var events = eventPerDay[date];
    var sortedEvents = events === null || events === void 0 ? void 0 : events.sort(function (a, b) {
      return b.duration - a.duration;
    });
    return calculateCollisions(sortedEvents);
  });
  return eventPerDay;
}

/*function getPxPaddingSinceMidnight(date?: Spacetime, selectedTimezone?: string) {
  if (!selectedTimezone) {
    const dateToUse = spacetime(date || new Date());
    return (60 * dateToUse.hour() + dateToUse.minute()) * (40 / 60);
  } else {
    const dateToUse = spacetime(date || new Date(), selectedTimezone);
    return (60 * dateToUse.hour() + dateToUse.minute()) * (40 / 60);
  }
}

function getTimeFromOffset(offset: number, day: TDateISODate): TDateISO {
  const correctedOffset = Math.round(offset / 10) * 10;
  return spacetime(day)
    .add(correctedOffset * (60 / 40), 'minute')
    .format('iso-utc') as TDateISO;
}

function getDurationFromOffset(offset: number) {
  const correctedOffset = Math.max(Math.round(Math.abs(offset) / 10) * 10, 10) * (60 / 40);
  return offset > 0 ? correctedOffset : -correctedOffset;
}

function generateWeek(day: TDateISODate): TDateISODate[] {
  const firstDay = spacetime(day).startOf('week');
  return [...Array(7).keys()].map(i => firstDay.add(i, 'day').format('iso-date') as TDateISODate);
}*/

function _typeof$9(obj) {
  "@babel/helpers - typeof";

  return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$9(obj);
}
function _defineProperty$9(obj, key, value) {
  key = _toPropertyKey$9(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$9(arg) {
  var key = _toPrimitive$9(arg, "string");
  return _typeof$9(key) === "symbol" ? key : String(key);
}
function _toPrimitive$9(input, hint) {
  if (_typeof$9(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$9(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$d(arr, i) {
  return _arrayWithHoles$d(arr) || _iterableToArrayLimit$d(arr, i) || _unsupportedIterableToArray$f(arr, i) || _nonIterableRest$d();
}
function _nonIterableRest$d() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$f(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$f(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$f(o, minLen);
}
function _arrayLikeToArray$f(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$d(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles$d(arr) {
  if (Array.isArray(arr)) return arr;
}
var _recoilPersist$1 = recoilPersist(),
  persistAtom$1 = _recoilPersist$1.persistAtom;
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
  key: 'calendarSelectedAtom-meeting-old',
  "default": null,
  effects: [persistAtom$1]
});
var accountSelectedAtom = atom({
  key: 'accountSelectedAtom-meeting-old',
  "default": null,
  effects: [persistAtom$1]
});
var eventsTypeSelectedAtom = atom({
  key: 'eventsTypeSelectedAtom-meeting-old',
  "default": 'nylas',
  effects: [persistAtom$1]
});
var inviteesAtom = atom({
  key: 'inviteesAtom-meeting-old',
  "default": []
});
var dateSelectedAtom = atom({
  key: 'daySelectedAtom-meeting-old',
  "default": new Date()
});
var selectedTimezoneAtom = atom({
  key: 'selectedTimezoneAtom-meeting-old',
  "default": typeof getUserTimeZone === 'function' ? getUserTimeZone() : undefined
});

// These are the users selected when seeing bloobirds events
var usersSelectedAtom = atom({
  key: 'usersSelectedAtom-meeting-old',
  "default": [],
  effects: [persistAtom$1]
});

// These are the account executives selected when seeing bloobirds events
var accountExecutivesSelectedAtom = atom({
  key: 'accountExecutivesSelectedAtom-meeting-old',
  "default": [],
  effects: [persistAtom$1]
});
var skipEventCalendarCreationAtom = atom({
  key: 'skipEventCalendarCreationAtom-meeting-old',
  "default": false,
  effects: [persistAtom$1]
});
var loadingAtom = atom({
  key: 'loadingMeetingModalAtom-meeting-old',
  "default": false
});

// In case this is an update, we will ban this event in the calendar so we only show the new placeholder
var bannedEventAtom = atom({
  key: 'bannedEventAtom-meeting-old',
  "default": ''
});
var showReminderAtom = atom({
  key: 'showReminderAtom-meeting-old',
  "default": false,
  effects: [persistAtom$1]
});
var reminderTemplateAtom = atom({
  key: 'reminderTemplateAtom-meeting-old',
  "default": null,
  effects: [persistAtom$1]
});
var reminderBeforeAtom = atom({
  key: 'reminderBeforeAtom-meeting-old',
  "default": {
    type: RemindeBeforeType.minutes,
    value: 30
  },
  effects: [persistAtom$1]
});
var conferencingInGoogleMeetAtom = atom({
  key: 'conferencingGoogleMeet-meeting-old',
  "default": true,
  effects: [persistAtom$1]
});
var meetingDurationAtom = atom({
  key: 'meetingDurationAtomIncalendar-meeting-old',
  "default": 60,
  effects: [persistAtom$1]
});
var placeholderAtom = atom({
  key: 'placeholderAtomIncalendar-meeting-old',
  "default": ''
});
var useCalendar = function useCalendar() {
  _s3();
  var _injectReferencesSear, _calendarsAvailable$d3;
  var _useContext = useContext(MeetingModalContext),
    userId = _useContext.userId,
    connections = _useContext.connections,
    accountId = _useContext.accountId;
  var _useRecoilState = useRecoilState(calendarSelectedAtom),
    _useRecoilState2 = _slicedToArray$d(_useRecoilState, 2),
    calendarSelected = _useRecoilState2[0],
    setSelectedCalendar = _useRecoilState2[1];
  var _useRecoilState3 = useRecoilState(accountSelectedAtom),
    _useRecoilState4 = _slicedToArray$d(_useRecoilState3, 2),
    accountSelected = _useRecoilState4[0],
    _setAccountSelected = _useRecoilState4[1];
  var _useRecoilState5 = useRecoilState(eventsTypeSelectedAtom),
    _useRecoilState6 = _slicedToArray$d(_useRecoilState5, 2),
    eventsTypeSelected = _useRecoilState6[0],
    setEventTypesSelected = _useRecoilState6[1];
  // @ts-ignore
  var _useRecoilState7 = useRecoilState(inviteesAtom),
    _useRecoilState8 = _slicedToArray$d(_useRecoilState7, 2),
    invitees = _useRecoilState8[0],
    setInvitees = _useRecoilState8[1];
  var _useRecoilState9 = useRecoilState(selectedTimezoneAtom),
    _useRecoilState10 = _slicedToArray$d(_useRecoilState9, 2),
    selectedTimezone = _useRecoilState10[0],
    setSelectedTimezone = _useRecoilState10[1];
  var _useRecoilState11 = useRecoilState(dateSelectedAtom),
    _useRecoilState12 = _slicedToArray$d(_useRecoilState11, 2),
    date = _useRecoilState12[0],
    setDate = _useRecoilState12[1];
  var _useRecoilState13 = useRecoilState(usersSelectedAtom),
    _useRecoilState14 = _slicedToArray$d(_useRecoilState13, 2),
    usersSelected = _useRecoilState14[0],
    setUsersSelected = _useRecoilState14[1];
  var _useRecoilState15 = useRecoilState(skipEventCalendarCreationAtom),
    _useRecoilState16 = _slicedToArray$d(_useRecoilState15, 2),
    skipCalendarCreation = _useRecoilState16[0],
    setSkipCalendarCreation = _useRecoilState16[1];
  var _useRecoilState17 = useRecoilState(loadingAtom),
    _useRecoilState18 = _slicedToArray$d(_useRecoilState17, 2),
    loading = _useRecoilState18[0],
    setLoading = _useRecoilState18[1];
  var _useRecoilState19 = useRecoilState(bannedEventAtom),
    _useRecoilState20 = _slicedToArray$d(_useRecoilState19, 2),
    bannedEvent = _useRecoilState20[0],
    setBannedEvent = _useRecoilState20[1];
  var resetBannedAtom = useResetRecoilState(bannedEventAtom);
  var resetInvitees = useResetRecoilState(inviteesAtom);
  var resetDate = useResetRecoilState(dateSelectedAtom);
  var _useRecoilState21 = useRecoilState(reminderTemplateAtom),
    _useRecoilState22 = _slicedToArray$d(_useRecoilState21, 2),
    reminderTemplate = _useRecoilState22[0],
    setReminderTemplate = _useRecoilState22[1];
  var _useRecoilState23 = useRecoilState(reminderBeforeAtom),
    _useRecoilState24 = _slicedToArray$d(_useRecoilState23, 2),
    reminderBefore = _useRecoilState24[0],
    setReminderBefore = _useRecoilState24[1];
  var _useRecoilState25 = useRecoilState(showReminderAtom),
    _useRecoilState26 = _slicedToArray$d(_useRecoilState25, 2),
    showReminder = _useRecoilState26[0],
    setShowReminder = _useRecoilState26[1];
  var _useRecoilState27 = useRecoilState(meetingDurationAtom),
    _useRecoilState28 = _slicedToArray$d(_useRecoilState27, 2),
    meetingDuration = _useRecoilState28[0],
    setMeetingDuration = _useRecoilState28[1];
  var _useRecoilState29 = useRecoilState(conferencingInGoogleMeetAtom),
    _useRecoilState30 = _slicedToArray$d(_useRecoilState29, 2),
    conferencingGoogleMeet = _useRecoilState30[0],
    setConferencingGoogleMeet = _useRecoilState30[1];
  var _useRecoilState31 = useRecoilState(placeholderAtom),
    _useRecoilState32 = _slicedToArray$d(_useRecoilState31, 2),
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
    _useRecoilState34 = _slicedToArray$d(_useRecoilState33, 2),
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
      if (
      // @ts-ignore
      (calendarsAvailable === null || calendarsAvailable === void 0 ? void 0 : (_calendarsAvailable$d = calendarsAvailable.data) === null || _calendarsAvailable$d === void 0 ? void 0 : _calendarsAvailable$d.length) > 0 && !(calendarsAvailable !== null && calendarsAvailable !== void 0 && (_calendarsAvailable$d2 = calendarsAvailable.data) !== null && _calendarsAvailable$d2 !== void 0 && _calendarsAvailable$d2.find(function (c) {
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
      queries.push(_defineProperty$9({}, ACTIVITY_FIELDS_LOGIC_ROLE.USER, usersSelected));
      queries.push(_defineProperty$9({}, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO, usersSelected));
    }
    if (accountExecutivesSelected && (accountExecutivesSelected === null || accountExecutivesSelected === void 0 ? void 0 : accountExecutivesSelected.length) > 0) {
      queries.push(_defineProperty$9({}, ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE, accountExecutivesSelected));
    }
    return {
      query: _defineProperty$9(_defineProperty$9({}, ACTIVITY_FIELDS_LOGIC_ROLE.TIME, {
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
_s3(useCalendar, "ozwWwX+1xcmSmIiHqIIKthZlhZo=", false, function () {
  return [useRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useResetRecoilState, useResetRecoilState, useResetRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useUserSearch, useSWR, useSWR, useSWR];
});
var css_248z$a = ".meetingModal-module_modal__container__Ewdmu input {\n  box-shadow: none !important;\n  height: 16px;\n  padding-left: 0;\n}\n\n.meetingModal-module_modal__container__Ewdmu input:first-child {\n  height: 22px;\n}\n\n.meetingModal-module_titleInput__i0fZl input {\n  height: 22px;\n}\n\n.meetingModal-module__header__container__jTDFT {\n  width: 100%;\n  padding: 32px;\n  display: flex;\n  align-items: center;\n  box-sizing: border-box;\n  background-color: white;\n  height: 10%;\n}\n\n.meetingModal-module__form_column__hixZ7 {\n  width: 310px;\n  padding-right: 8px;\n  margin-right: 22px;\n  overflow-y: scroll;\n  overflow-x: hidden;\n  max-height: 75vh;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.meetingModal-module__form_column__hixZ7 input {\n  height: 19px;\n}\n\n.meetingModal-module__header__info__EV6js {\n  display: flex;\n  align-items: center;\n  flex-grow: 1;\n}\n\n.meetingModal-module__header__info__EV6js button {\n  margin-right: 8px;\n}\n\n.meetingModal-module__header_right_actions__W1NBf {\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n  gap: 12px;\n  margin-left: 16px;\n}\n\n.meetingModal-module__header__date_picker__Pd7Zm {\n  width: 280px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.meetingModal-module__header__spacer__MrheH {\n  flex-grow: 1;\n}\n\n.meetingModal-module__date_picker__FXT74 *::-moz-placeholder {\n  color: var(--softPeanut);\n  opacity: 1;\n  font-size: 12px;\n}\n\n.meetingModal-module__date_picker__FXT74 *::placeholder {\n  color: var(--softPeanut);\n  opacity: 1;\n  font-size: 12px;\n}\n\n.meetingModal-module__calendar__sypTU {\n  flex-shrink: 0;\n  box-sizing: border-box;\n  margin-right: 24px;\n  border: 1px solid var(--verySoftPeanut);\n  width: 72px;\n}\n\n.meetingModal-module__calendar__sypTU > header {\n  box-sizing: border-box;\n  background-color: var(--tomato);\n  margin: -1px;\n}\n\n.meetingModal-module__calendar__sypTU > div {\n  padding: 4px;\n}\n\n.meetingModal-module__body__CxpgE {\n  padding: 0 32px;\n  background: var(--white);\n  display: flex;\n  flex-grow: 1;\n  height: 70%;\n}\n\n.meetingModal-module_footer__R69Xk {\n  height: 9%;\n  align-items: center;\n  box-sizing: border-box;\n}\n\n.meetingModal-module__main_row__6EfOs {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.meetingModal-module__event_info__1RZPA {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  flex-grow: 1;\n}\n\n.meetingModal-module__row_header__-4EDd {\n  display: flex;\n  align-items: center;\n  margin: 8px 0;\n}\n\n.meetingModal-module__row_header__-4EDd > svg {\n  margin-right: 10px;\n}\n\n.meetingModal-module__event_row_header__zu9gD > svg {\n  margin-right: 4px;\n}\n\n.meetingModal-module__calendar_select__BI6w9 {\n  height: 26px;\n}\n\n.meetingModal-module__calendar_select__BI6w9 > div > div {\n  border: 1px solid var(--lightPeanut);\n}\n\n.meetingModal-module__date_picker__FXT74 {\n  display: flex;\n  width: 100%;\n  gap: 8px;\n  align-items: flex-start;\n}\n\n.meetingModal-module__date_picker__FXT74 > div {\n  border: 0;\n}\n\n.meetingModal-module__date_picker__FXT74 > div:nth-child(2) > div {\n  flex-direction: row-reverse;\n  max-height: 24px;\n}\n\n.meetingModal-module__date_picker__FXT74 > div > div > div {\n  max-height: 24px;\n}\n\n.meetingModal-module__event_row_header__zu9gD {\n  display: flex;\n  align-items: center;\n  margin-top: -4px;\n}\n\n.meetingModal-module__note_container__utiC7 {\n  margin: 0 24px;\n}\n\n.meetingModal-module__note_row__-SfBN {\n  margin-top: 24px;\n}\n\n.meetingModal-module__event_type_selector__KrWXv {\n  border-radius: 4px;\n  display: flex;\n}\n\n.meetingModal-module__event_type__A-K67 {\n  padding: 4px 12px;\n  border: 1px solid var(--bloobirds);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n}\n\n.meetingModal-module__event_type__A-K67 > * {\n  margin-right: 4px;\n}\n\n.meetingModal-module__additionalFields_content__R1vdK {\n  display: flex;\n  flex-direction: column;\n  margin: 24px 0;\n}\n\n.meetingModal-module__additionalFields_content_title__J167q {\n  margin-bottom: 12px;\n}\n\n.meetingModal-module__additionalFields_content_title__J167q > div {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.meetingModal-module__additionalFields_section__42MNW {\n  margin-bottom: 12px;\n}\n\n.meetingModal-module__additionalFields_section__42MNW > p {\n  margin-bottom: 12px;\n}\n\n.meetingModal-module__additionalFields_fields__2GUo3 {\n  display: flex;\n  flex-direction: column;\n}\n\n.meetingModal-module__input_field__UHdFn > * {\n  margin-bottom: 12px;\n  width: 100%;\n}\n\n.meetingModal-module__input_field__UHdFn {\n  width: 100%;\n}\n\n.meetingModal-module__timezone_selector__KxRhD {\n  color: var(--bloobirds);\n  text-decoration: underline;\n}\n\n.meetingModal-module__meetingType__PgDsC {\n  display: flex;\n  align-items: center;\n}\n\n.meetingModal-module__meetingType__PgDsC > div:first-child {\n  margin-right: 8px;\n}\n\n.meetingModal-module__footer_buttons_right__-UU8x {\n  display: flex;\n  align-items: center;\n}\n\n.meetingModal-module__footer_buttons_right__-UU8x > * {\n  margin-left: 8px;\n}\n\n.meetingModal-module__main_info_title__BpKXa {\n  display: flex;\n}\n\n.meetingModal-module_discovery_tooltip__4355h {\n  margin-left: 8px;\n}\n\n.meetingModal-module_searchLeads__g8sQT {\n  margin-bottom: 4px;\n}\n\n.meetingModal-module_inviteesNotSynced__ynrrG {\n  background-color: var(--verySoftBanana);\n  border: 1px solid var(--banana);\n  border-radius: 4px;\n  display: flex;\n  justify-content: center;\n  padding: 4px 0;\n}\n.meetingModal-module_titleForm__HW-dF {\n  margin-top: 8px;\n}\n\n.meetingModal-module_titleForm__HW-dF * {\n  font-size: 12px;\n}\n\n.meetingModal-module_inviteesList__NJQNm {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.meetingModal-module_inviteesList__NJQNm > div {\n  margin: 0px;\n}\n\n.meetingModal-module__internal_note__zbB7a * {\n  font-size: 13px;\n}\n";
var styles$a = {
  "modal__container": "meetingModal-module_modal__container__Ewdmu",
  "titleInput": "meetingModal-module_titleInput__i0fZl",
  "_header__container": "meetingModal-module__header__container__jTDFT",
  "_form_column": "meetingModal-module__form_column__hixZ7",
  "_header__info": "meetingModal-module__header__info__EV6js",
  "_header_right_actions": "meetingModal-module__header_right_actions__W1NBf",
  "_header__date_picker": "meetingModal-module__header__date_picker__Pd7Zm",
  "_header__spacer": "meetingModal-module__header__spacer__MrheH",
  "_date_picker": "meetingModal-module__date_picker__FXT74",
  "_calendar": "meetingModal-module__calendar__sypTU",
  "_body": "meetingModal-module__body__CxpgE",
  "footer": "meetingModal-module_footer__R69Xk",
  "_main_row": "meetingModal-module__main_row__6EfOs",
  "_event_info": "meetingModal-module__event_info__1RZPA",
  "_row_header": "meetingModal-module__row_header__-4EDd",
  "_event_row_header": "meetingModal-module__event_row_header__zu9gD",
  "_calendar_select": "meetingModal-module__calendar_select__BI6w9",
  "_note_container": "meetingModal-module__note_container__utiC7",
  "_note_row": "meetingModal-module__note_row__-SfBN",
  "_event_type_selector": "meetingModal-module__event_type_selector__KrWXv",
  "_event_type": "meetingModal-module__event_type__A-K67",
  "_additionalFields_content": "meetingModal-module__additionalFields_content__R1vdK",
  "_additionalFields_content_title": "meetingModal-module__additionalFields_content_title__J167q",
  "_additionalFields_section": "meetingModal-module__additionalFields_section__42MNW",
  "_additionalFields_fields": "meetingModal-module__additionalFields_fields__2GUo3",
  "_input_field": "meetingModal-module__input_field__UHdFn",
  "_timezone_selector": "meetingModal-module__timezone_selector__KxRhD",
  "_meetingType": "meetingModal-module__meetingType__PgDsC",
  "_footer_buttons_right": "meetingModal-module__footer_buttons_right__-UU8x",
  "_main_info_title": "meetingModal-module__main_info_title__BpKXa",
  "discovery_tooltip": "meetingModal-module_discovery_tooltip__4355h",
  "searchLeads": "meetingModal-module_searchLeads__g8sQT",
  "inviteesNotSynced": "meetingModal-module_inviteesNotSynced__ynrrG",
  "titleForm": "meetingModal-module_titleForm__HW-dF",
  "inviteesList": "meetingModal-module_inviteesList__NJQNm",
  "_internal_note": "meetingModal-module__internal_note__zbB7a"
};
styleInject(css_248z$a);
var getFilteredQQsBySegmentation = function getFilteredQQsBySegmentation(QQs, formData) {
  var _QQs$filter;
  return (_QQs$filter = QQs.filter(function (QQ) {
    var segmentationValues = Object.keys(QQ.segmentationValues);
    if ((segmentationValues === null || segmentationValues === void 0 ? void 0 : segmentationValues.length) > 0) {
      var control = true;
      segmentationValues.forEach(function (key) {
        var _formData$company, _formData$company$raw, _formData$lead, _formData$lead$raw, _formData$opportunity, _formData$opportunity2;
        // @ts-ignore
        if (control && formData !== null && formData !== void 0 && (_formData$company = formData.company) !== null && _formData$company !== void 0 && (_formData$company$raw = _formData$company.raw) !== null && _formData$company$raw !== void 0 && _formData$company$raw.contents[key]) {
          var _formData$company2, _formData$company2$ra;
          // @ts-ignore
          control = QQ === null || QQ === void 0 ? void 0 : QQ.segmentationValues[key].includes(formData === null || formData === void 0 ? void 0 : (_formData$company2 = formData.company) === null || _formData$company2 === void 0 ? void 0 : (_formData$company2$ra = _formData$company2.raw) === null || _formData$company2$ra === void 0 ? void 0 : _formData$company2$ra.contents[key]);
        }
        // @ts-ignore
        if (control && formData !== null && formData !== void 0 && (_formData$lead = formData.lead) !== null && _formData$lead !== void 0 && (_formData$lead$raw = _formData$lead.raw) !== null && _formData$lead$raw !== void 0 && _formData$lead$raw.contents[key]) {
          var _formData$lead2, _formData$lead2$raw;
          // @ts-ignore
          control = QQ === null || QQ === void 0 ? void 0 : QQ.segmentationValues[key].includes(formData === null || formData === void 0 ? void 0 : (_formData$lead2 = formData.lead) === null || _formData$lead2 === void 0 ? void 0 : (_formData$lead2$raw = _formData$lead2.raw) === null || _formData$lead2$raw === void 0 ? void 0 : _formData$lead2$raw.contents[key]);
        }
        if (control && formData !== null && formData !== void 0 && (_formData$opportunity = formData.opportunity) !== null && _formData$opportunity !== void 0 && (_formData$opportunity2 = _formData$opportunity.raw) !== null && _formData$opportunity2 !== void 0 && _formData$opportunity2.contents[key]) {
          var _formData$opportunity3, _formData$opportunity4;
          control = QQ === null || QQ === void 0 ? void 0 : QQ.segmentationValues[key].includes(formData === null || formData === void 0 ? void 0 : (_formData$opportunity3 = formData.opportunity) === null || _formData$opportunity3 === void 0 ? void 0 : (_formData$opportunity4 = _formData$opportunity3.raw) === null || _formData$opportunity4 === void 0 ? void 0 : _formData$opportunity4.contents[key]);
        }
      });
      return control;
    } else return true;
  })) === null || _QQs$filter === void 0 ? void 0 : _QQs$filter.map(function (QQ) {
    return QQ === null || QQ === void 0 ? void 0 : QQ.question;
  });
};
function _typeof$8(obj) {
  "@babel/helpers - typeof";

  return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$8(obj);
}
var _excluded$1 = ["field"];
function _slicedToArray$c(arr, i) {
  return _arrayWithHoles$c(arr) || _iterableToArrayLimit$c(arr, i) || _unsupportedIterableToArray$e(arr, i) || _nonIterableRest$c();
}
function _nonIterableRest$c() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit$c(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles$c(arr) {
  if (Array.isArray(arr)) return arr;
}
function _toConsumableArray$5(arr) {
  return _arrayWithoutHoles$5(arr) || _iterableToArray$5(arr) || _unsupportedIterableToArray$e(arr) || _nonIterableSpread$5();
}
function _nonIterableSpread$5() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$e(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$e(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$e(o, minLen);
}
function _iterableToArray$5(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$5(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$e(arr);
}
function _arrayLikeToArray$e(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function ownKeys$4(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$4(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) {
      _defineProperty$8(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$8(obj, key, value) {
  key = _toPropertyKey$8(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$8(arg) {
  var key = _toPrimitive$8(arg, "string");
  return _typeof$8(key) === "symbol" ? key : String(key);
}
function _toPrimitive$8(input, hint) {
  if (_typeof$8(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$8(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties$1(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function groupFields(fieldConditionsByField) {
  return fieldConditionsByField.reduce(function (acc, value) {
    acc[value.field.logicRole || value.field.name] = value.fieldValues.map(function (field) {
      return field.value;
    });
    return acc;
  }, {});
}
function getFieldsThatAreConditioned(fieldConditionsByField, modalBobjectType) {
  return fieldConditionsByField.filter(function (_ref) {
    var field = _ref.field;
    return field.bobjectType === modalBobjectType;
  }).map(function (_ref2) {
    var field = _ref2.field;
    return field.logicRole || field.name;
  });
}
var DISCARDED_FIELDS = [ACTIVITY_FIELDS_LOGIC_ROLE.TIME, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE, ACTIVITY_FIELDS_LOGIC_ROLE.TITLE, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION, ACTIVITY_FIELDS_LOGIC_ROLE.CREATE_EVENT, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT];
function checkFieldConditions(field, watch) {
  if (field.fieldConditionsByField.length > 0) {
    var relatedFields = getFieldsThatAreConditioned(field.fieldConditionsByField, 'Activity');
    var values = watch(relatedFields);
    var grouped = groupFields(field.fieldConditionsByField);
    var hasRelatedFields = relatedFields.length > 0;
    var checkAllConditions = Object.values(grouped).map(function (value) {
      return values === null || values === void 0 ? void 0 : values.includes(value[0]);
    });
    var satisfiesFieldCondition = checkAllConditions === null || checkAllConditions === void 0 ? void 0 : checkAllConditions.every(function (value) {
      return value === true;
    });
    if (hasRelatedFields && !satisfiesFieldCondition || !field.satisfiesFieldCrossCondition) {
      return false;
    }
  }
  return true;
}
function Field(_ref3) {
  var field = _ref3.field,
    props = _objectWithoutProperties$1(_ref3, _excluded$1);
  var values = field === null || field === void 0 ? void 0 : field.fieldValues();
  switch (field.type) {
    case 'Text':
      return field.multiline ? /*#__PURE__*/jsx(TextArea, _objectSpread$4({}, props)) : /*#__PURE__*/jsx(Input, _objectSpread$4({}, props));
    case 'Picklist':
    case 'Global Picklist':
      // @ts-ignore
      // eslint-disable-next-line no-case-declarations
      return /*#__PURE__*/jsx(Select, _objectSpread$4(_objectSpread$4({}, props), {}, {
        borderless: false,
        autocomplete: (values === null || values === void 0 ? void 0 : values.length) > 6,
        children: values === null || values === void 0 ? void 0 : values.map(function (_ref4) {
          var value = _ref4.value,
            label = _ref4.label;
          return /*#__PURE__*/jsx(Item, {
            value: value,
            label: label,
            children: label
          }, value);
        })
      }));
    case 'Multi global picklist':
      return /*#__PURE__*/jsx(MultiSelect, _objectSpread$4(_objectSpread$4({}, props), {}, {
        borderless: false,
        autocomplete: (values === null || values === void 0 ? void 0 : values.length) > 6,
        children: values === null || values === void 0 ? void 0 : values.map(function (_ref5) {
          var value = _ref5.value,
            label = _ref5.label;
          return /*#__PURE__*/jsx(CheckItem, {
            value: value,
            label: label,
            children: label
          }, value);
        })
      }));
    case 'Number':
      return /*#__PURE__*/jsx(Input, _objectSpread$4(_objectSpread$4({}, props), {}, {
        type: "number"
      }));
    case 'DateTime':
    case 'Date':
      return /*#__PURE__*/jsx(DateTimePicker, _objectSpread$4(_objectSpread$4({}, props), {}, {
        withTimePicker: field.type === 'DateTime'
      }));
    default:
      return /*#__PURE__*/jsx(Input, _objectSpread$4({}, props));
  }
}
_c2 = Field;
function MeetingField(_ref6) {
  _s4();
  var field = _ref6.field,
    isRequiredBeforeMeeting = _ref6.isRequiredBeforeMeeting,
    textsToCopy = _ref6.textsToCopy,
    setTextsToCopy = _ref6.setTextsToCopy,
    section = _ref6.section;
  // @ts-ignore
  var _useFormContext = useFormContext(),
    watch = _useFormContext.watch,
    setValue = _useFormContext.setValue,
    getValues = _useFormContext.getValues,
    control = _useFormContext.control,
    formState = _useFormContext.formState;
  var _useCalendar = useCalendar(),
    invitees = _useCalendar.invitees,
    setInvitees = _useCalendar.setInvitees;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'meetingModal'
    }),
    t = _useTranslation.t;
  var mustBeRequired = isRequiredBeforeMeeting || (field === null || field === void 0 ? void 0 : field.required);
  var isLinkedin = window.location.href.includes('linkedin') || window.location.href.includes('lightning.force');
  var _useController = useController({
      control: control,
      name: (field === null || field === void 0 ? void 0 : field.logicRole) || field.name,
      rules: {
        required: mustBeRequired
      }
    }),
    _useController$field = _useController.field,
    value = _useController$field.value,
    onChange = _useController$field.onChange;
  var defaultPicklistValue = field === null || field === void 0 ? void 0 : field.defaultPicklistValue;
  var defaultValue = field === null || field === void 0 ? void 0 : field.defaultValue;
  var fieldName = (field === null || field === void 0 ? void 0 : field.logicRole) || (field === null || field === void 0 ? void 0 : field.name);
  var company = watch('company');
  var error = (formState === null || formState === void 0 ? void 0 : formState.errors) && (formState === null || formState === void 0 ? void 0 : formState.errors[fieldName]) && t('thisFieldIsRequired');
  useEffect(function () {
    var currentValue = getValues(fieldName);
    if (!currentValue && (defaultPicklistValue || defaultValue)) {
      setValue(fieldName, defaultPicklistValue || defaultValue);
    }
  }, [defaultPicklistValue, defaultValue]);
  useEffect(function () {
    if (company && isRequiredBeforeMeeting) {
      if (!(company !== null && company !== void 0 && company.fields)) {
        setValue(fieldName, company === null || company === void 0 ? void 0 : company.rawBobject[fieldName]);
      } else {
        var _getFieldById;
        setValue(fieldName, (_getFieldById = getFieldById(company, fieldName)) === null || _getFieldById === void 0 ? void 0 : _getFieldById.text);
      }
    }
    if (!company && isRequiredBeforeMeeting) {
      setValue(fieldName, null);
    }
  }, [company]);
  var ref = useRef();

  // Scroll to error
  var errorMessage = (formState === null || formState === void 0 ? void 0 : formState.errors) && (formState === null || formState === void 0 ? void 0 : formState.errors[fieldName]);
  var firstError = (formState === null || formState === void 0 ? void 0 : formState.errors) && Object.keys(formState.errors)[0];
  useEffect(function () {
    if (errorMessage && firstError === fieldName) {
      var _ref$current;
      // @ts-ignore
      ref === null || ref === void 0 ? void 0 : (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.scrollIntoView({
        behaviour: 'smooth',
        block: 'center'
      });
    }
  }, [errorMessage]);
  var getValue = function getValue() {
    try {
      if (field.type === 'DateTime' || field.type === 'Date') {
        return value ? new Date(value) : value;
      } else {
        return value || (field === null || field === void 0 ? void 0 : field.defaultPicklistValue) || '';
      }
    } catch (_unused) {
      return value;
    }
  };
  var values = field === null || field === void 0 ? void 0 : field.fieldValues();
  var getFieldValue = function getFieldValue(e) {
    var _values$filter$;
    switch (field.type) {
      case 'Picklist':
      case 'Global Picklist':
        return (_values$filter$ = values.filter(function (v) {
          return v.value === e;
        })[0]) === null || _values$filter$ === void 0 ? void 0 : _values$filter$.label;
      default:
        return e;
    }
  };
  var handleOnChange = function handleOnChange(e) {
    if ((field === null || field === void 0 ? void 0 : field.logicRole) === ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE) {
      var _field$fieldValues;
      var _value = field === null || field === void 0 ? void 0 : (_field$fieldValues = field.fieldValues()) === null || _field$fieldValues === void 0 ? void 0 : _field$fieldValues.find(function (v) {
        return (v === null || v === void 0 ? void 0 : v.value) === e;
      });
      if (!(invitees !== null && invitees !== void 0 && invitees.find(function (invitee) {
        return (invitee === null || invitee === void 0 ? void 0 : invitee.email) === (_value === null || _value === void 0 ? void 0 : _value.label);
      }))) {
        setInvitees(function (curr) {
          return [].concat(_toConsumableArray$5(curr), [{
            type: 'AE',
            email: _value === null || _value === void 0 ? void 0 : _value.label
          }]);
        });
      }
    }
    onChange(e);
    var textToCopyTmp = textsToCopy;
    textToCopyTmp = _objectSpread$4(_objectSpread$4({}, textToCopyTmp), _defineProperty$8({}, section, _objectSpread$4(_objectSpread$4({}, textToCopyTmp[section]), _defineProperty$8({}, field.label, getFieldValue(e)))));
    setTextsToCopy(textToCopyTmp);
  };
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsx("div", {
      className: styles$a._input_field,
      ref: ref,
      children: /*#__PURE__*/jsx(Field, {
        field: field
        //@ts-ignore
        ,

        onChange: function onChange(e) {
          return handleOnChange(e);
        },
        value: getValue(),
        defaultValue: value || (field === null || field === void 0 ? void 0 : field.defaultPicklistValue) || '',
        name: fieldName,
        size: "labeled",
        portal: false,
        width: (field === null || field === void 0 ? void 0 : field.label.length) > 40 ? isLinkedin ? '296px' : '304px' : '100%',
        placeholder: "".concat(field === null || field === void 0 ? void 0 : field.label).concat(mustBeRequired ? ' *' : ''),
        required: mustBeRequired,
        error: error
      })
    })
  });
}
_s4(MeetingField, "kZCBuzcAz8l1vYLe6oFakvDMyvI=", false, function () {
  return [useFormContext, useCalendar, useTranslation, useController];
});
_c3 = MeetingField;
function ActivityDetailsForm(_ref7) {
  _s5();
  var _company$id, _meetingFormFields$se2;
  var isEditionModal = _ref7.isEditionModal,
    formData = _ref7.formData,
    accountId = _ref7.accountId;
  var company = formData.company;
  var filters = useActiveMessagingFilters();
  var _useQualifyingQuestio = useQualifyingQuestions(filters),
    qualifyingQuestions = _useQualifyingQuestio.qualifyingQuestions;
  var requiredQQs = qualifyingQuestions === null || qualifyingQuestions === void 0 ? void 0 : qualifyingQuestions.filter(function (qq) {
    return qq === null || qq === void 0 ? void 0 : qq.isRequiredBeforeMeeting;
  });
  var filteredQQs = getFilteredQQsBySegmentation(requiredQQs, formData);
  var meetingFormFields = useBobjectFieldGroups({
    bobject: null,
    bobjectType: BobjectTypes.Activity,
    // @ts-ignore
    companyBobjectId: (company === null || company === void 0 ? void 0 : (_company$id = company.id) === null || _company$id === void 0 ? void 0 : _company$id.value) || null,
    options: {
      type: 'Meeting'
    },
    modalId: undefined,
    segmentatedQQs: filteredQQs
  });
  var isFullSalesEnabled = useFullSalesEnabled(accountId);
  var _useFormContext2 = useFormContext(),
    watch = _useFormContext2.watch,
    getValues = _useFormContext2.getValues;
  var defaultFormValues = getValues();
  var _useState = useState({}),
    _useState2 = _slicedToArray$c(_useState, 2),
    textsToCopy = _useState2[0],
    setTextsToCopy = _useState2[1];
  var activityDetailsFilterFunction = function activityDetailsFilterFunction(field, isRequiredBeforeMeeting) {
    if (isRequiredBeforeMeeting) {
      return !isEditionModal;
    }
    return !field.deprecated && !field.readOnly && isValidAeField(field) && checkFieldConditions(field, watch) && !DISCARDED_FIELDS.includes(field.logicRole);
  };
  useEffect(function () {
    var _meetingFormFields$se;
    var createTextToCopyObject = {};
    meetingFormFields === null || meetingFormFields === void 0 ? void 0 : (_meetingFormFields$se = meetingFormFields.sections) === null || _meetingFormFields$se === void 0 ? void 0 : _meetingFormFields$se.forEach(function (section) {
      var _section$fields;
      var isRequiredBeforeMeeting = (section === null || section === void 0 ? void 0 : section.title) === 'Required information to close Meeting';
      var defaultValues = {};
      section === null || section === void 0 ? void 0 : (_section$fields = section.fields) === null || _section$fields === void 0 ? void 0 : _section$fields.filter(function (field) {
        return activityDetailsFilterFunction(field, isRequiredBeforeMeeting);
      }).forEach(function (field) {
        var getValue = function getValue(fieldValue) {
          var _field$fieldValues2, _field$fieldValues2$f;
          return field === null || field === void 0 ? void 0 : (_field$fieldValues2 = field.fieldValues()) === null || _field$fieldValues2 === void 0 ? void 0 : (_field$fieldValues2$f = _field$fieldValues2.filter(function (v) {
            return v.value === fieldValue;
          })[0]) === null || _field$fieldValues2$f === void 0 ? void 0 : _field$fieldValues2$f.label;
        };
        if (field.defaultPicklistValue || field.defaultGlobalPicklistValue) {
          defaultValues = _objectSpread$4(_objectSpread$4({}, defaultValues), _defineProperty$8({}, field.label, getValue(field.defaultPicklistValue)));
        } else if (field.defaultValue) {
          defaultValues = _objectSpread$4(_objectSpread$4({}, defaultValues), _defineProperty$8({}, field.label, field.defaultValue));
        } else if (Object.keys(defaultFormValues).includes(field.name)) {
          defaultValues = _objectSpread$4(_objectSpread$4({}, defaultValues), getValue(defaultFormValues[field.name]) || defaultFormValues[field.name] ? _defineProperty$8({}, field.label, getValue(defaultFormValues[field.name]) || defaultFormValues[field.name]) : undefined);
        }
      });
      createTextToCopyObject = _objectSpread$4(_objectSpread$4({}, createTextToCopyObject), _defineProperty$8({}, section.title, defaultValues));
    });
    setTextsToCopy(createTextToCopyObject);
  }, [meetingFormFields.sections]);
  var getClipboardText = function getClipboardText(sectionTitle) {
    var textForClipboard = '';
    var sectionText = textsToCopy[sectionTitle] || {};
    var textArray = Object.keys(sectionText).map(function (key) {
      return "<div><span style=\"font-weight: bold\">".concat(key, "</span>: ").concat(sectionText[key], "</div>");
    });
    textArray.forEach(function (element) {
      return textForClipboard = textForClipboard.concat('\n' + element);
    });
    return textForClipboard;
  };
  var isValidAeField = function isValidAeField(field) {
    if (isFullSalesEnabled && (field === null || field === void 0 ? void 0 : field.logicRole) === ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE) {
      return true;
    } else if (!isFullSalesEnabled && (field === null || field === void 0 ? void 0 : field.logicRole) === ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE) {
      return false;
    }
    return true;
  };
  return /*#__PURE__*/jsx("div", {
    className: styles$a._additionalFields_content,
    children: meetingFormFields === null || meetingFormFields === void 0 ? void 0 : (_meetingFormFields$se2 = meetingFormFields.sections) === null || _meetingFormFields$se2 === void 0 ? void 0 : _meetingFormFields$se2.map(function (section) {
      var _section$fields2;
      var isRequiredBeforeMeeting = (section === null || section === void 0 ? void 0 : section.title) === 'Required information to close Meeting';
      var sectionFields = (_section$fields2 = section.fields) === null || _section$fields2 === void 0 ? void 0 : _section$fields2.filter(function (field) {
        return activityDetailsFilterFunction(field, isRequiredBeforeMeeting);
      }).map(function (field) {
        return /*#__PURE__*/jsx(MeetingField, {
          field: field,
          isRequiredBeforeMeeting: isRequiredBeforeMeeting,
          textsToCopy: textsToCopy,
          setTextsToCopy: setTextsToCopy,
          section: section.title
        }, field.name);
      });
      return sectionFields.length > 0 ? /*#__PURE__*/jsxs("div", {
        className: styles$a._additionalFields_section,
        children: [/*#__PURE__*/jsx("div", {
          className: styles$a._additionalFields_content_title,
          children: /*#__PURE__*/jsx(CopyText, {
            isLinkTypeField: false,
            textToCopy: getClipboardText(section.title),
            htmlFormat: true,
            alwaysDisplay: true,
            children: /*#__PURE__*/jsx(Text, {
              size: "s",
              color: "softPeanut",
              children: section.title
            })
          })
        }), /*#__PURE__*/jsx("div", {
          className: styles$a._additionalFields_fields,
          children: sectionFields
        })]
      }, section.title) : null;
    })
  });
}
_s5(ActivityDetailsForm, "W8XxLYUE/s40pph9IeW9UP+x9NA=", false, function () {
  return [useActiveMessagingFilters, useQualifyingQuestions, useBobjectFieldGroups, useFullSalesEnabled, useFormContext];
});
_c4 = ActivityDetailsForm;
var css_248z$9 = ".calendarsSelector-module__calendars_container__hg0li {\n  display: flex;\n  flex-direction: column;\n  margin: 16px;\n  width: 300px;\n  max-height: 600px;\n  overflow-y: auto;\n  padding-right: 8px;\n}\n\n.calendarsSelector-module__select_disabled__FBmCR {\n  background-color: var(--lightestGray);\n}\n\n.calendarsSelector-module__calendars_list__GeCPU {\n  margin: 8px 0;\n  display: flex;\n  flex-direction: column;\n}\n\n.calendarsSelector-module__calendars_list__GeCPU > * {\n  margin: 4px 0;\n}\n\n.calendarsSelector-module__help_container__yByxP > * {\n  margin-bottom: 8px;\n}\n\n.calendarsSelector-module__help_text__z6tfu {\n  display: flex;\n}\n\n.calendarsSelector-module__accounts_selector__c7Rea {\n  margin: 8px 0 16px 0;\n}\n\n.calendarsSelector-module__select_anchor__vhrf2 {\n  width: 200px;\n  height: 24px;\n  border-radius: 4px;\n  border: 1px solid var(--peanut);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  cursor: pointer;\n}\n\n.calendarsSelector-module__icon_container__uh-FH {\n  display: flex;\n  align-items: center;\n  margin-left: 4px;\n  margin-right: 4px;\n}\n\n.calendarsSelector-module__select_text__dwtbM {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n.calendarsSelector-module__email_selector__Exi3S {\n  display: flex;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n";
var styles$9 = {
  "_calendars_container": "calendarsSelector-module__calendars_container__hg0li",
  "_select_disabled": "calendarsSelector-module__select_disabled__FBmCR",
  "_calendars_list": "calendarsSelector-module__calendars_list__GeCPU",
  "_help_container": "calendarsSelector-module__help_container__yByxP",
  "_help_text": "calendarsSelector-module__help_text__z6tfu",
  "_accounts_selector": "calendarsSelector-module__accounts_selector__c7Rea",
  "_select_anchor": "calendarsSelector-module__select_anchor__vhrf2",
  "_icon_container": "calendarsSelector-module__icon_container__uh-FH",
  "_select_text": "calendarsSelector-module__select_text__dwtbM",
  "_email_selector": "calendarsSelector-module__email_selector__Exi3S"
};
styleInject(css_248z$9);
function _toConsumableArray$4(arr) {
  return _arrayWithoutHoles$4(arr) || _iterableToArray$4(arr) || _unsupportedIterableToArray$d(arr) || _nonIterableSpread$4();
}
function _nonIterableSpread$4() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$d(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$d(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$d(o, minLen);
}
function _iterableToArray$4(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$4(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$d(arr);
}
function _arrayLikeToArray$d(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
var BloobirdsCalendarsSelector = function BloobirdsCalendarsSelector(_ref) {
  _s6();
  var anchor = _ref.anchor;
  var _useCalendar = useCalendar(),
    accountId = _useCalendar.accountId,
    userId = _useCalendar.userId,
    usersSelected = _useCalendar.usersSelected,
    setUsersSelected = _useCalendar.setUsersSelected,
    accountExecutivesSelected = _useCalendar.accountExecutivesSelected,
    setAccountExecutivesSelected = _useCalendar.setAccountExecutivesSelected;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'meetingModal.bloobirdsCalendarSelector'
    }),
    t = _useTranslation.t;
  var _useVisible = useVisible(),
    ref = _useVisible.ref,
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  var _useContext = useContext(MeetingModalContext),
    dataModel = _useContext.dataModel;
  var isFullSalesEnabled = useFullSalesEnabled(accountId);
  var userResponse = useUserSearch();
  var users = userResponse === null || userResponse === void 0 ? void 0 : userResponse.users;
  var sortedUsers = users === null || users === void 0 ? void 0 : users.reduce(function (acc, user) {
    if ((user === null || user === void 0 ? void 0 : user.id) === userId) {
      return [user].concat(_toConsumableArray$4(acc));
    }
    return [].concat(_toConsumableArray$4(acc), [user]);
  }, []);
  var activityAccountExecutiveField = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findValuesByFieldLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE);
  var totalCalendarsSelected = [].concat(_toConsumableArray$4(accountExecutivesSelected), _toConsumableArray$4(usersSelected));
  var accountExecutivePicklistValues = activityAccountExecutiveField === null || activityAccountExecutiveField === void 0 ? void 0 : activityAccountExecutiveField.filter(function (ae) {
    return ae === null || ae === void 0 ? void 0 : ae.enabled;
  });
  var handleSelectUser = function handleSelectUser(user, value) {
    if (value) {
      setUsersSelected(function (curr) {
        return [].concat(_toConsumableArray$4(curr), [user === null || user === void 0 ? void 0 : user.id]);
      });
    } else {
      setUsersSelected(usersSelected === null || usersSelected === void 0 ? void 0 : usersSelected.filter(function (id) {
        return id !== (user === null || user === void 0 ? void 0 : user.id);
      }));
    }
  };
  var handleSelectAccountExecutive = function handleSelectAccountExecutive(ae, value) {
    if (value) {
      setAccountExecutivesSelected(function (curr) {
        return [].concat(_toConsumableArray$4(curr), [ae === null || ae === void 0 ? void 0 : ae.id]);
      });
    } else {
      setAccountExecutivesSelected(accountExecutivesSelected === null || accountExecutivesSelected === void 0 ? void 0 : accountExecutivesSelected.filter(function (id) {
        return id !== (ae === null || ae === void 0 ? void 0 : ae.id);
      }));
    }
  };
  return /*#__PURE__*/jsx(Dropdown, {
    anchor: anchor ? anchor(visible, setVisible) : /*#__PURE__*/jsxs("div", {
      className: styles$9._select_anchor,
      onClick: function onClick() {
        return setVisible(true);
      },
      children: [/*#__PURE__*/jsxs("span", {
        style: {
          display: 'flex'
        },
        children: [/*#__PURE__*/jsx("span", {
          className: styles$9._icon_container,
          children: /*#__PURE__*/jsx(Icon, {
            name: "calendar",
            size: 12,
            color: "softPeanut"
          })
        }), /*#__PURE__*/jsxs(Text, {
          size: "xs",
          color: "peanut",
          className: styles$9._select_text,
          children: [totalCalendarsSelected === null || totalCalendarsSelected === void 0 ? void 0 : totalCalendarsSelected.length, " ", t('calendar').toLowerCase(), (totalCalendarsSelected === null || totalCalendarsSelected === void 0 ? void 0 : totalCalendarsSelected.length) === 1 ? '' : 's', " ", t('selected').toLowerCase()]
        })]
      }), /*#__PURE__*/jsx("span", {
        style: {
          marginRight: '4px'
        },
        children: /*#__PURE__*/jsx(Icon, {
          name: "chevronDown",
          size: 12,
          color: "softPeanut"
        })
      })]
    }),
    visible: visible,
    ref: ref,
    children: /*#__PURE__*/jsxs("div", {
      className: styles$9._calendars_container,
      children: [(users === null || users === void 0 ? void 0 : users.length) > 0 && /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx(Text, {
          size: "m",
          color: "peanut",
          children: t('users')
        }), /*#__PURE__*/jsx("div", {
          className: styles$9._calendars_list,
          children: sortedUsers === null || sortedUsers === void 0 ? void 0 : sortedUsers.map(function (user) {
            var isSelfUser = userId === (user === null || user === void 0 ? void 0 : user.id);
            return /*#__PURE__*/jsxs(Checkbox, {
              size: "small",
              disabled: isSelfUser,
              checked: !!(usersSelected !== null && usersSelected !== void 0 && usersSelected.find(function (id) {
                return id === (user === null || user === void 0 ? void 0 : user.id);
              })),
              onClick: function onClick(v) {
                return handleSelectUser(user, v);
              },
              children: [user === null || user === void 0 ? void 0 : user.name, " ", isSelfUser && "(".concat(t('you'), ")")]
            }, user === null || user === void 0 ? void 0 : user.id);
          })
        })]
      }), !isFullSalesEnabled && (accountExecutivePicklistValues === null || accountExecutivePicklistValues === void 0 ? void 0 : accountExecutivePicklistValues.length) > 0 && /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx(Text, {
          size: "m",
          color: "peanut",
          children: t('accountExecutives')
        }), /*#__PURE__*/jsx("div", {
          className: styles$9._calendars_list,
          children: accountExecutivePicklistValues === null || accountExecutivePicklistValues === void 0 ? void 0 : accountExecutivePicklistValues.map(function (ae) {
            return /*#__PURE__*/jsx(Checkbox, {
              size: "small",
              checked: !!(accountExecutivesSelected !== null && accountExecutivesSelected !== void 0 && accountExecutivesSelected.find(function (id) {
                return id === (ae === null || ae === void 0 ? void 0 : ae.id);
              })),
              onClick: function onClick(v) {
                return handleSelectAccountExecutive(ae, v);
              },
              children: ae === null || ae === void 0 ? void 0 : ae.value
            }, ae === null || ae === void 0 ? void 0 : ae.id);
          })
        })]
      })]
    })
  });
};
_s6(BloobirdsCalendarsSelector, "YjiFU4upLhqkKWM591gMkTvOGho=", false, function () {
  return [useCalendar, useTranslation, useVisible, useFullSalesEnabled, useUserSearch];
});
_c5 = BloobirdsCalendarsSelector;
function _slicedToArray$b(arr, i) {
  return _arrayWithHoles$b(arr) || _iterableToArrayLimit$b(arr, i) || _unsupportedIterableToArray$c(arr, i) || _nonIterableRest$b();
}
function _nonIterableRest$b() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$c(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$c(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$c(o, minLen);
}
function _arrayLikeToArray$c(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$b(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles$b(arr) {
  if (Array.isArray(arr)) return arr;
}
var eventPlaceholderAtom = atom({
  key: 'eventPlaceholderAtom',
  "default": null
});
var isMouseDownAtom = atom({
  key: 'eventPlaceholderIsMouseDownAtom',
  "default": false
});
var useMouseEvents = function useMouseEvents() {
  _s7();
  var _useRecoilState = useRecoilState(isMouseDownAtom),
    _useRecoilState2 = _slicedToArray$b(_useRecoilState, 2),
    isMouseDown = _useRecoilState2[0],
    setIsMouseDown = _useRecoilState2[1];
  return {
    isMouseDown: isMouseDown,
    setIsMouseDown: setIsMouseDown
  };
};
_s7(useMouseEvents, "q9ZLpfbUZclGHekbjWm1PLqbmk8=", false, function () {
  return [useRecoilState];
});
var useGeneratePlaceHolder = function useGeneratePlaceHolder() {
  _s8();
  var setEventPlaceholder = useSetRecoilState(eventPlaceholderAtom);
  var isMouseDown = useRecoilValue(isMouseDownAtom);
  var methods = useFormContext();
  var dateTime = methods === null || methods === void 0 ? void 0 : methods.watch('dateTime');
  var duration = methods === null || methods === void 0 ? void 0 : methods.watch('duration');
  var generatePlaceHolder = throttle(function (date, duration) {
    var title = methods === null || methods === void 0 ? void 0 : methods.watch('title');
    setEventPlaceholder({
      // @ts-ignore
      duration: duration,
      type: 'placeholder',
      startTime: date,
      endTime: null,
      id: 'event-placeholder',
      title: title || 'Untitled Event',
      collisions: 0,
      collisionNumber: 0,
      day: spacetime(date).format('iso-short'),
      participants: [],
      calendarId: 'eventPlaceholder'
    });
  }, 250);
  useEffect(function () {
    if (dateTime && duration && !isMouseDown) {
      generatePlaceHolder(dateTime, duration || 15);
    }
  }, [dateTime, duration]);
  return;
};
_s8(useGeneratePlaceHolder, "8ijijPn5fZudJPYV6/dm6NXkvPM=", false, function () {
  return [useSetRecoilState, useRecoilValue, useFormContext];
});
var useEventPlaceholder = function useEventPlaceholder(setMeetingDuration) {
  _s9();
  // @ts-ignore
  var _useRecoilState3 = useRecoilState(eventPlaceholderAtom),
    _useRecoilState4 = _slicedToArray$b(_useRecoilState3, 2),
    eventPlaceholder = _useRecoilState4[0],
    setEventPlaceholder = _useRecoilState4[1];
  var resetEventPlaceholder = useResetRecoilState(eventPlaceholderAtom);
  var methods = useFormContext();
  var dateTime = methods === null || methods === void 0 ? void 0 : methods.watch('dateTime');
  var duration = methods === null || methods === void 0 ? void 0 : methods.watch('duration');
  var title = methods === null || methods === void 0 ? void 0 : methods.watch('title');
  useEffect(function () {
    return function () {
      resetEventPlaceholder();
    };
  }, []);
  var handlePlaceholderCreation = throttle(function (date, duration) {
    setEventPlaceholder({
      duration: duration,
      type: 'placeholder',
      startTime: date,
      endTime: date,
      // @ts-ignore
      startTimeTimestamp: null,
      // @ts-ignore
      endTimeTimestamp: null,
      id: 'event-placeholder',
      title: title || 'Untitled Event',
      collisions: 0,
      collisionNumber: 0,
      day: spacetime(date).format('iso-short'),
      participants: [],
      calendarId: 'eventPlaceholder'
    });
  }, 250);
  useEffect(function () {
    if (eventPlaceholder !== null && eventPlaceholder !== void 0 && eventPlaceholder.startTime && spacetime(eventPlaceholder === null || eventPlaceholder === void 0 ? void 0 : eventPlaceholder.startTime).format('iso-utc') !==
    // @ts-ignore
    spacetime(dateTime).format('iso-utc')) {
      methods === null || methods === void 0 ? void 0 : methods.setValue('dateTime', spacetime(eventPlaceholder === null || eventPlaceholder === void 0 ? void 0 : eventPlaceholder.startTime).toNativeDate());
    }
    // @ts-ignore
    if (eventPlaceholder !== null && eventPlaceholder !== void 0 && eventPlaceholder.duration && (eventPlaceholder === null || eventPlaceholder === void 0 ? void 0 : eventPlaceholder.duration) !== parseInt(duration)) {
      setMeetingDuration(eventPlaceholder === null || eventPlaceholder === void 0 ? void 0 : eventPlaceholder.duration);
      methods === null || methods === void 0 ? void 0 : methods.setValue('duration', eventPlaceholder === null || eventPlaceholder === void 0 ? void 0 : eventPlaceholder.duration);
    }
  }, [eventPlaceholder]);
  return {
    eventPlaceholder: eventPlaceholder,
    onCalendarPlaceholder: handlePlaceholderCreation
  };
};
_s9(useEventPlaceholder, "61u7SDeOn/0q8xlJ3hkTDAtayTU=", false, function () {
  return [useRecoilState, useResetRecoilState, useFormContext];
});
var css_248z$8 = ".brandedButtons-module__button__PrDge {\n  cursor: pointer;\n  display: inline-flex;\n  padding: 1px;\n  font-size: 14px;\n  height: 30px;\n  text-decoration: none;\n  border-radius: 4px;\n}\n\n.brandedButtons-module__icon__0O2CB {\n  display: flex;\n  align-items: center;\n  width: 30px;\n  background-color: white;\n  flex-direction: column;\n  justify-content: center;\n  border-radius: 4px 0 0 4px;\n}\n\n.brandedButtons-module__text__94zcr {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  padding: 0 12px;\n  font-weight: 500;\n}\n\n.brandedButtons-module__google__button__GEzTS {\n  background-color: #4285f4;\n  color: white;\n}\n\n.brandedButtons-module__ms__button__ij275 {\n  height: 28px;\n  background-color: white;\n  border: 1px solid #8c8c8c;\n  color: #5e5e5e;\n}\n";
var styles$8 = {
  "_button": "brandedButtons-module__button__PrDge",
  "_icon": "brandedButtons-module__icon__0O2CB",
  "_text": "brandedButtons-module__text__94zcr",
  "_google__button": "brandedButtons-module__google__button__GEzTS brandedButtons-module__button__PrDge",
  "_ms__button": "brandedButtons-module__ms__button__ij275 brandedButtons-module__button__PrDge"
};
styleInject(css_248z$8);
var GoogleSignIn = function GoogleSignIn(_ref) {
  var onClick = _ref.onClick;
  return /*#__PURE__*/jsxs("div", {
    className: styles$8._google__button,
    onClick: onClick,
    children: [/*#__PURE__*/jsx("div", {
      className: styles$8._icon
    }), /*#__PURE__*/jsx("span", {
      className: styles$8._text,
      children: "Sign in with Google"
    })]
  });
};
_c6 = GoogleSignIn;
var MicrosoftSignIn = function MicrosoftSignIn(_ref) {
  var onClick = _ref.onClick;
  return /*#__PURE__*/jsxs("div", {
    className: styles$8._ms__button,
    onClick: onClick,
    children: [/*#__PURE__*/jsx("div", {
      className: styles$8._icon
    }), /*#__PURE__*/jsx("span", {
      className: styles$8._text,
      children: "Sign in with Outlook"
    })]
  });
};
_c7 = MicrosoftSignIn;
var css_248z$7 = ".calendarNotConnected-module_calendar_not_connected__jBJao {\n  width: 372px;\n  height: 490px;\n  background-image: url('../../../../../../assets/calendar-scrollable.png');\n  background-repeat: no-repeat;\n  background-size: cover;\n  box-shadow: inset 0 0 20px 20px white;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n}\n\n.calendarNotConnected-module_calendar_not_connected__jBJao > * {\n  margin-bottom: 20px;\n}\n\n.calendarNotConnected-module_calendar_buttons__-cbpO {\n  display: flex;\n}\n\n.calendarNotConnected-module_calendar_buttons__-cbpO > * {\n  margin: 4px;\n}\n\n.calendarNotConnected-module_link__Yt2p4 {\n  cursor: pointer;\n}\n\n.calendarNotConnected-module_day_calendar_not_connected_container__UFfQN {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.calendarNotConnected-module_day_calendar_not_connected__6JUW1 {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  z-index: 1;\n  position: absolute;\n}\n\n.calendarNotConnected-module_day_calendar_not_connected__6JUW1 > p {\n  width: 240px;\n}\n\n.calendarNotConnected-module__background_image__Hm-km {\n  width: 100%;\n  filter: blur(8px);\n  -webkit-filter: blur(8px);\n}\n\n.calendarNotConnected-module_day_calendar_buttons__hDu5Q {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n}\n\n.calendarNotConnected-module_day_calendar_not_connected_overlay__Bn14L {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n  visibility: visible;\n  opacity: 0.1;\n}\n";
var styles$7 = {
  "calendar_not_connected": "calendarNotConnected-module_calendar_not_connected__jBJao",
  "calendar_buttons": "calendarNotConnected-module_calendar_buttons__-cbpO",
  "link": "calendarNotConnected-module_link__Yt2p4",
  "day_calendar_not_connected_container": "calendarNotConnected-module_day_calendar_not_connected_container__UFfQN",
  "day_calendar_not_connected": "calendarNotConnected-module_day_calendar_not_connected__6JUW1",
  "_background_image": "calendarNotConnected-module__background_image__Hm-km",
  "day_calendar_buttons": "calendarNotConnected-module_day_calendar_buttons__hDu5Q",
  "day_calendar_not_connected_overlay": "calendarNotConnected-module_day_calendar_not_connected_overlay__Bn14L"
};
styleInject(css_248z$7);
function _slicedToArray$a(arr, i) {
  return _arrayWithHoles$a(arr) || _iterableToArrayLimit$a(arr, i) || _unsupportedIterableToArray$b(arr, i) || _nonIterableRest$a();
}
function _nonIterableRest$a() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$b(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$b(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$b(o, minLen);
}
function _arrayLikeToArray$b(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$a(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles$a(arr) {
  if (Array.isArray(arr)) return arr;
}
var CalendarNotConnected = function CalendarNotConnected(_ref) {
  _s10();
  var mode = _ref.mode,
    onCalendarReconnect = _ref.onCalendarReconnect;
  var _useState = useState(false),
    _useState2 = _slicedToArray$a(_useState, 2),
    signInClicked = _useState2[0],
    setSignInClicked = _useState2[1];
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'meetingModal.calendar.calendarNotConnected'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsx(Fragment, {
    children: mode === 'week' ? /*#__PURE__*/jsxs("div", {
      className: styles$7.calendar_not_connected,
      children: [/*#__PURE__*/jsx(Text, {
        size: "xxl",
        align: "center",
        children: t('syncBloobirds')
      }), /*#__PURE__*/jsxs("div", {
        className: styles$7.calendar_buttons,
        children: [/*#__PURE__*/jsx(GoogleSignIn, {
          onClick: function onClick() {
            fetchAndOpenNylasUrl();
            setSignInClicked(true);
          }
        }), /*#__PURE__*/jsx(MicrosoftSignIn, {
          onClick: function onClick() {
            fetchAndOpenNylasUrl();
            setSignInClicked(true);
          }
        })]
      }), signInClicked && /*#__PURE__*/jsx("div", {
        onClick: function onClick() {
          if (onCalendarReconnect) {
            onCalendarReconnect();
          }
        },
        className: styles$7.link,
        children: /*#__PURE__*/jsx(Text, {
          color: "bloobirds",
          decoration: "underline",
          size: "s",
          children: t('clickAndRefresh')
        })
      })]
    }) : /*#__PURE__*/jsxs("div", {
      className: styles$7.day_calendar_not_connected_container,
      children: [/*#__PURE__*/jsx("img", {
        src: DayCalendarBackground,
        alt: 'day_calendar_background',
        className: styles$7._background_image
      }), /*#__PURE__*/jsxs("div", {
        className: styles$7.day_calendar_not_connected,
        children: [/*#__PURE__*/jsx(Text, {
          size: "xl",
          align: "center",
          weight: "bold",
          color: "peanut",
          children: t('syncBloobirds')
        }), /*#__PURE__*/jsxs("div", {
          className: styles$7.day_calendar_buttons,
          children: [/*#__PURE__*/jsxs(Button, {
            onClick: function onClick() {
              fetchAndOpenNylasUrl();
              setSignInClicked(true);
            },
            uppercase: true,
            children: [/*#__PURE__*/jsx("img", {
              alt: "calendar_logo",
              src: Calendar$1,
              height: 18,
              width: 18,
              style: {
                marginRight: 8
              }
            }), t('connectGoogle')]
          }), /*#__PURE__*/jsxs(Button, {
            onClick: function onClick() {
              fetchAndOpenNylasUrl();
              setSignInClicked(true);
            },
            variant: "alternative",
            uppercase: true,
            children: [/*#__PURE__*/jsx("img", {
              alt: "outlook_logo",
              src: Outlook,
              height: 18,
              width: 18,
              style: {
                marginRight: 8
              }
            }), t('connectOutlook')]
          })]
        })]
      })]
    })
  });
};
_s10(CalendarNotConnected, "IQbXrHaS5Be5nHCMFz0/bkKoNhI=", false, function () {
  return [useTranslation];
});
_c8 = CalendarNotConnected;
var css_248z$6 = ".calendar-module_calendar__VAah- {\n  flex-grow: 1;\n  max-height: 75vh;\n}\n\n.calendar-module_calendar_container__NpIsR {\n  position: relative;\n  display: flex;\n  overflow-y: scroll;\n  align-items: stretch;\n  max-height: calc(100% - 80px);\n}\n\n.calendar-module_calendar_timestrings_container__6r6HF {\n  height: auto;\n  flex: none;\n  display: flex;\n  align-items: flex-start;\n  min-width: 40px;\n}\n\n.calendar-module_calendar_timestring_container__k7l8p {\n  height: 40px;\n  position: relative;\n  padding-inline-end: 8px;\n  text-align: right;\n}\n\n.calendar-module_calendar_timestring_container__k7l8p:first-child .calendar-module_calendar_timestring__OBeoj {\n  display: none;\n}\n\n.calendar-module_calendar_timestring__OBeoj {\n  display: block;\n  color: #70757a;\n  font-size: 10px;\n  position: relative;\n  top: -6px;\n}\n\n.calendar-module_calendar_timestring__OBeoj > div {\n  display: flex;\n  justify-content: flex-end;\n}\n\n.calendar-module_calendar_timestrings__AAyB- {\n  position: relative;\n  background-color: #fff;\n  box-sizing: border-box;\n  margin-left: auto;\n}\n\n.calendar-module_calendar_column_headers__C0NkK {\n  display: flex;\n  margin-left: 40px;\n  margin-bottom: 4px;\n  margin-right: 12px;\n}\n\n.calendar-module_calendar_column_header__QJzIt {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n}\n\n.calendar-module_calendar_column_header_name__VEtYB {\n  font-style: normal;\n  font-weight: 400;\n  font-size: 12px;\n  line-height: 16px;\n  color: var(--peanut);\n  margin-bottom: 2px;\n}\n\n.calendar-module_calendar_column_header_name_today__-AOOS {\n  font-weight: 500;\n  color: var(--bloobirds);\n}\n\n.calendar-module_calendar_column_header_date__BXHzt {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border-radius: 100%;\n}\n\n.calendar-module_calendar_column_header_date_today__cQ8gQ {\n  background-color: var(--bloobirds);\n  color: white;\n}\n\n.calendar-module_calendar_grid_container__M73bO {\n  display: flex;\n  align-items: flex-start;\n  width: 100%;\n}\n\n.calendar-module_calendar_grid__Jd67r {\n  border-bottom: #dadce0 1px solid;\n  position: relative;\n  min-width: 100%;\n  flex: none;\n  display: inline-flex;\n  vertical-align: top;\n  overflow-x: hidden;\n}\n\n.calendar-module_calendar_grid_tiles__8oV7U {\n  z-index: 1;\n  border-top: #dadce0 1px solid;\n}\n\n.calendar-module_calendar_grid_tile__8RGwP {\n  height: 40px;\n}\n\n.calendar-module_calendar_grid_tile__8RGwP:after {\n  content: '';\n  border-bottom: #dadce0 1px solid;\n  position: absolute;\n  width: 100%;\n  margin-top: -1px;\n  z-index: 3;\n  pointer-events: none;\n}\n\n.calendar-module_calendar_grid_marker_start__Nlec3,\n.calendar-module_calendar_grid_marker_end__IdZ6j {\n  width: 8px;\n  border-inline-end: #dadce0 1px solid;\n}\n\n.calendar-module_calendar_gridcell_container__p9Vr5 {\n  position: relative;\n  width: 100%;\n  box-sizing: border-box;\n  border-right: white 1px solid;\n  overflow: visible;\n  display: flex;\n}\n\n.calendar-module_calendar_gridcell__o-KUp {\n  grid-column-gap: 3px;\n  z-index: 1;\n  position: relative;\n  height: 100%;\n  border-right: 1px solid var(--verySoftPeanut);\n  box-sizing: border-box;\n  flex-grow: 1;\n  min-width: 0;\n}\n\n.calendar-module_calendar_gridcell_weekend__cYfGw {\n  background-color: #dbdbdb2e;\n}\n\n.calendar-module_calendar_cell__HJM4n {\n  z-index: 4;\n  padding: 0 3px;\n  box-sizing: border-box;\n  overflow: hidden;\n  border-bottom-right-radius: 2px;\n  border-top-right-radius: 2px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  position: absolute;\n  color: white;\n  font-size: 11px;\n  line-height: 12px;\n  cursor: pointer;\n}\n\n.calendar-module_calendar_cell_small__Dgttn {\n  display: inline-flex;\n  justify-content: flex-start;\n  align-items: center;\n  flex-direction: row;\n  line-height: 10px;\n  font-size: 10px;\n}\n\n.calendar-module_calendar_cell_placeholder__Ba8G7 {\n  border: 1px solid var(--bloobirds);\n  border-radius: 2px;\n  color: var(--bloobirds);\n  cursor: default;\n}\n\n.calendar-module_calendar_cell_small__Dgttn > * {\n  flex-shrink: 0;\n}\n\n.calendar-module_calendar_cell_45__mHO8w > * {\n  white-space: nowrap !important;\n  overflow: hidden !important;\n}\n\n.calendar-module_calendar_now_marker__ipjto {\n  position: absolute;\n  z-index: 504;\n  border-top: #ea4335 solid 2px;\n  right: 0;\n  left: 0;\n  pointer-events: none;\n}\n\n.calendar-module_calendar_now_marker__ipjto:after {\n  background: #ea4335;\n  border-radius: 50%;\n  content: '';\n  position: absolute;\n  height: 12px;\n  margin-inline-start: -6.5px;\n  margin-top: -7px;\n  width: 12px;\n}\n\n.calendar-module_calendar_cell__HJM4n:not(.calendar-module_calendar_cell_extended__4ddnf) .calendar-module_calendar_cell_title__ft-iB:after {\n  content: ' ';\n  margin-inline-end: 4px;\n}\n\n.calendar-module_calendar_cell_extended__4ddnf {\n  display: block;\n}\n\n.calendar-module_calendar_cell_desc__C8OTB {\n  display: none;\n}\n\n.calendar-module_calendar_cell_title__ft-iB,\n.calendar-module_calendar_cell_desc__C8OTB {\n  overflow-wrap: break-word;\n  word-wrap: break-word;\n  color: var(--black);\n  font-weight: bold;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Safari */ /* Konqueror HTML */\n  -moz-user-select: none; /* Old versions of Firefox */ /* Internet Explorer/Edge */\n  user-select: none; /* Non-prefixed version, currently\n                                  supported by Chrome, Edge, Opera and Firefox */\n}\n\n.calendar-module_calendar_cell_time__dBufn {\n  color: var(--black);\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Safari */ /* Konqueror HTML */\n  -moz-user-select: none; /* Old versions of Firefox */ /* Internet Explorer/Edge */\n  user-select: none; /* Non-prefixed version, currently\n                                  supported by Chrome, Edge, Opera and Firefox */\n}\n\n.calendar-module_event_details_container__lcC24 {\n  display: flex;\n  flex-direction: column;\n}\n\n.calendar-module_event_details_header__cEAg- {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin: 16px 16px 0 16px;\n}\n\n.calendar-module_event_details_body__R3FP8 {\n  display: flex;\n  flex-direction: column;\n  margin: 16px;\n}\n\n.calendar-module_event_details_datetime__RrDT0 {\n  display: flex;\n  margin-left: 16px;\n  margin-top: 4px;\n}\n\n.calendar-module_event_details_title__37tzp {\n  display: flex;\n  justify-content: space-between;\n  margin: 2px 16px 0 16px;\n}\n\n.calendar-module_event_details_title_name__3RB7X {\n  display: flex;\n  align-items: flex-start;\n}\n\n.calendar-module_event_details_icon__RLgv0 {\n  flex-shrink: 0;\n}\n\n.calendar-module_event_details_title_text__p0ylw {\n  margin: 4px 8px 0 8px !important;\n}\n\n.calendar-module_attendees_details__JSKl9 {\n  display: flex;\n  align-items: center;\n}\n\n.calendar-module_attendees_title__adWLc {\n  margin-left: 8px !important;\n}\n\n.calendar-module_attendees_list_container__iV47- {\n  display: flex;\n  flex-direction: column;\n  max-height: 260px;\n  overflow-y: auto;\n  margin-left: 28px;\n  padding-right: 8px;\n}\n\n.calendar-module_attendee_container__CJCh8 {\n  display: flex;\n  align-items: center;\n  margin-top: 8px;\n}\n\n.calendar-module_attendee_container__CJCh8 > * {\n  margin-right: 8px;\n}\n\n.calendar-module__invitee_card__tV-p0 {\n  display: flex;\n  align-items: center;\n  margin: 12px 0;\n}\n\n.calendar-module__invitee_info__VaUPW {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  margin-left: 8px;\n  overflow: hidden;\n}\n\n.calendar-module__invitee_info__VaUPW > p {\n  max-width: 220px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  margin-right: 8px;\n}\n";
var styles$6 = {
  "calendar": "calendar-module_calendar__VAah-",
  "calendar_container": "calendar-module_calendar_container__NpIsR",
  "calendar_timestrings_container": "calendar-module_calendar_timestrings_container__6r6HF",
  "calendar_timestring_container": "calendar-module_calendar_timestring_container__k7l8p",
  "calendar_timestring": "calendar-module_calendar_timestring__OBeoj",
  "calendar_timestrings": "calendar-module_calendar_timestrings__AAyB-",
  "calendar_column_headers": "calendar-module_calendar_column_headers__C0NkK",
  "calendar_column_header": "calendar-module_calendar_column_header__QJzIt",
  "calendar_column_header_name": "calendar-module_calendar_column_header_name__VEtYB",
  "calendar_column_header_name_today": "calendar-module_calendar_column_header_name_today__-AOOS",
  "calendar_column_header_date": "calendar-module_calendar_column_header_date__BXHzt",
  "calendar_column_header_date_today": "calendar-module_calendar_column_header_date_today__cQ8gQ",
  "calendar_grid_container": "calendar-module_calendar_grid_container__M73bO",
  "calendar_grid": "calendar-module_calendar_grid__Jd67r",
  "calendar_grid_tiles": "calendar-module_calendar_grid_tiles__8oV7U",
  "calendar_grid_tile": "calendar-module_calendar_grid_tile__8RGwP",
  "calendar_grid_marker_start": "calendar-module_calendar_grid_marker_start__Nlec3",
  "calendar_grid_marker_end": "calendar-module_calendar_grid_marker_end__IdZ6j",
  "calendar_gridcell_container": "calendar-module_calendar_gridcell_container__p9Vr5",
  "calendar_gridcell": "calendar-module_calendar_gridcell__o-KUp",
  "calendar_gridcell_weekend": "calendar-module_calendar_gridcell_weekend__cYfGw",
  "calendar_cell": "calendar-module_calendar_cell__HJM4n",
  "calendar_cell_small": "calendar-module_calendar_cell_small__Dgttn",
  "calendar_cell_placeholder": "calendar-module_calendar_cell_placeholder__Ba8G7",
  "calendar_cell_45": "calendar-module_calendar_cell_45__mHO8w",
  "calendar_now_marker": "calendar-module_calendar_now_marker__ipjto",
  "calendar_cell_extended": "calendar-module_calendar_cell_extended__4ddnf",
  "calendar_cell_title": "calendar-module_calendar_cell_title__ft-iB",
  "calendar_cell_desc": "calendar-module_calendar_cell_desc__C8OTB",
  "calendar_cell_time": "calendar-module_calendar_cell_time__dBufn",
  "event_details_container": "calendar-module_event_details_container__lcC24",
  "event_details_header": "calendar-module_event_details_header__cEAg-",
  "event_details_body": "calendar-module_event_details_body__R3FP8",
  "event_details_datetime": "calendar-module_event_details_datetime__RrDT0",
  "event_details_title": "calendar-module_event_details_title__37tzp",
  "event_details_title_name": "calendar-module_event_details_title_name__3RB7X",
  "event_details_icon": "calendar-module_event_details_icon__RLgv0",
  "event_details_title_text": "calendar-module_event_details_title_text__p0ylw",
  "attendees_details": "calendar-module_attendees_details__JSKl9",
  "attendees_title": "calendar-module_attendees_title__adWLc",
  "attendees_list_container": "calendar-module_attendees_list_container__iV47-",
  "attendee_container": "calendar-module_attendee_container__CJCh8",
  "_invitee_card": "calendar-module__invitee_card__tV-p0",
  "_invitee_info": "calendar-module__invitee_info__VaUPW"
};
styleInject(css_248z$6);
function _slicedToArray$9(arr, i) {
  return _arrayWithHoles$9(arr) || _iterableToArrayLimit$9(arr, i) || _unsupportedIterableToArray$a(arr, i) || _nonIterableRest$9();
}
function _nonIterableRest$9() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$a(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$a(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$a(o, minLen);
}
function _arrayLikeToArray$a(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$9(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles$9(arr) {
  if (Array.isArray(arr)) return arr;
}
var useMouseDelta = function useMouseDelta() {
  _s11();
  var _useState = useState(0),
    _useState2 = _slicedToArray$9(_useState, 2),
    result = _useState2[0],
    setResult = _useState2[1];
  var dragging = useRef(false);
  var previousClientY = useRef(0);
  var element = useRef(null);
  var initialPosition = useRef(0);
  var handleMouseMove = useCallback(function (e) {
    if (!dragging.current) {
      return;
    }
    setResult(function (result) {
      var change = e.offsetY - previousClientY.current;
      if (Math.abs(change) < 180) {
        previousClientY.current = e.offsetY;
        return result + change;
      }
      return result;
    });
  }, []);
  var handleMouseDown = useCallback(function (e) {
    previousClientY.current = e.offsetY;
    initialPosition.current = e.offsetY;
    dragging.current = true;
    setResult(0);
  }, []);
  var handleMouseUp = useCallback(function () {
    dragging.current = false;
  }, []);
  useEffect(function () {
    var _element$current, _element$current2, _element$current3;
    element === null || element === void 0 ? void 0 : (_element$current = element.current) === null || _element$current === void 0 ? void 0 : _element$current.addEventListener('mousedown', handleMouseDown);
    element === null || element === void 0 ? void 0 : (_element$current2 = element.current) === null || _element$current2 === void 0 ? void 0 : _element$current2.addEventListener('mouseup', handleMouseUp);
    element === null || element === void 0 ? void 0 : (_element$current3 = element.current) === null || _element$current3 === void 0 ? void 0 : _element$current3.addEventListener('mousemove', handleMouseMove);
    return function () {
      var _element$current4, _element$current5, _element$current6;
      element === null || element === void 0 ? void 0 : (_element$current4 = element.current) === null || _element$current4 === void 0 ? void 0 : _element$current4.removeEventListener('mousedown', handleMouseDown);
      element === null || element === void 0 ? void 0 : (_element$current5 = element.current) === null || _element$current5 === void 0 ? void 0 : _element$current5.removeEventListener('mouseup', handleMouseUp);
      element === null || element === void 0 ? void 0 : (_element$current6 = element.current) === null || _element$current6 === void 0 ? void 0 : _element$current6.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseDown, handleMouseUp, handleMouseMove, element]);
  return {
    delta: result,
    ref: element,
    initialPosition: initialPosition.current
  };
};
_s11(useMouseDelta, "/n388ZWYQ1SAfNSp/IQEGfdAEOM=");
function _typeof$7(obj) {
  "@babel/helpers - typeof";

  return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$7(obj);
}
function _toConsumableArray$3(arr) {
  return _arrayWithoutHoles$3(arr) || _iterableToArray$3(arr) || _unsupportedIterableToArray$9(arr) || _nonIterableSpread$3();
}
function _nonIterableSpread$3() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray$3(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$3(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$9(arr);
}
function ownKeys$3(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) {
      _defineProperty$7(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$7(obj, key, value) {
  key = _toPropertyKey$7(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$7(arg) {
  var key = _toPrimitive$7(arg, "string");
  return _typeof$7(key) === "symbol" ? key : String(key);
}
function _toPrimitive$7(input, hint) {
  if (_typeof$7(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$7(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$8(arr, i) {
  return _arrayWithHoles$8(arr) || _iterableToArrayLimit$8(arr, i) || _unsupportedIterableToArray$9(arr, i) || _nonIterableRest$8();
}
function _nonIterableRest$8() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$9(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$9(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$9(o, minLen);
}
function _arrayLikeToArray$9(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$8(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles$8(arr) {
  if (Array.isArray(arr)) return arr;
}
var randomColors = ['bloobirds', 'softPeanut', 'verySoftTangerine', 'softTangerine', 'verySoftTomato', 'softTomato', 'softBanana', 'verySoftBanana', 'verySoftMelon', 'softMelon', 'lightBloobirds', 'verySoftBloobirds', 'verySoftPurple', 'lightPurple', 'verySoftPeanut', 'lightPeanut', 'lighterGray', 'gray'];
function getPxPaddingSinceMidnight(date, selectedTimezone) {
  if (!selectedTimezone) {
    var dateToUse = spacetime(date || new Date());
    return (60 * dateToUse.hour() + dateToUse.minute()) * (40 / 60);
  } else {
    var _dateToUse = spacetime(date || new Date(), selectedTimezone);
    return (60 * _dateToUse.hour() + _dateToUse.minute()) * (40 / 60);
  }
}
function getTimeFromOffset(offset, day) {
  var correctedOffset = Math.round(offset / 10) * 10;
  return spacetime(day).add(correctedOffset * (60 / 40), 'minute').format('iso-utc');
}
function getDurationFromOffset(offset) {
  var correctedOffset = Math.max(Math.round(Math.abs(offset) / 10) * 10, 10) * (60 / 40);
  return offset > 0 ? correctedOffset : -correctedOffset;
}
/**
 * This component is duplicated in activity feed component in components folder
 * so we should copy for now from one place to another
 * @param invitee
 * @param handleRemoveInvitee
 * @param readOnly
 * @param width
 * @param shouldShowStatus
 * @constructor
 */
function InviteeCard(_ref) {
  _s12();
  var _invitee$email, _invitee$name, _invitee$type;
  var invitee = _ref.invitee,
    handleRemoveInvitee = _ref.handleRemoveInvitee,
    readOnly = _ref.readOnly,
    width = _ref.width,
    shouldShowStatus = _ref.shouldShowStatus;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'meetingModal.inviteeCard'
    }),
    t = _useTranslation.t;
  var _useState = useState(randomColors[Math.floor(Math.random() * (randomColors.length + 1))]),
    _useState2 = _slicedToArray$8(_useState, 1),
    randomColor = _useState2[0];
  function getColorFromType(type) {
    switch (type) {
      case 'Organizer':
        return 'purple';
      case 'AE':
      case 'User':
        return 'grape';
      case 'Company':
        return 'extraMeeting';
      case 'Lead':
        return 'extraMeeting';
      case 'Coworker':
        return 'softPeanut';
      default:
        return 'random';
    }
  }
  function getStatusAvatar(status) {
    switch (status) {
      case 'yes':
        return {
          bagdeColor: 'lightestCall',
          icon: 'check',
          iconColor: 'extraCall'
        };
      case 'no':
        return {
          bagdeColor: 'lightestMeeting',
          icon: 'cross',
          iconColor: 'extraMeeting'
        };
      default:
        return {
          bagdeColor: 'verySoftPeanut',
          icon: 'arrowRight',
          iconColor: 'softPeanut'
        };
    }
  }
  var calculatedColor = getColorFromType(invitee === null || invitee === void 0 ? void 0 : invitee.type);
  var colorToUse = calculatedColor === 'random' ? randomColor : calculatedColor;
  var statusAvatar = getStatusAvatar(invitee === null || invitee === void 0 ? void 0 : invitee.status);
  var parentRef = useRef();
  return /*#__PURE__*/jsx(Fragment, {
    children: ((invitee === null || invitee === void 0 ? void 0 : invitee.email) || (invitee === null || invitee === void 0 ? void 0 : invitee.name)) && /*#__PURE__*/jsx(Fragment, {
      children: /*#__PURE__*/jsxs("div", {
        className: styles$6._invitee_card,
        style: {
          width: width || null
        },
        children: [/*#__PURE__*/jsx(CompoundIcon, {
          parent: /*#__PURE__*/jsx(Avatar, {
            size: "tiny",
            color: colorToUse,
            ref: parentRef,
            children: (invitee === null || invitee === void 0 ? void 0 : (_invitee$email = invitee.email) === null || _invitee$email === void 0 ? void 0 : _invitee$email.slice(0, 2).toUpperCase()) || (invitee === null || invitee === void 0 ? void 0 : (_invitee$name = invitee.name) === null || _invitee$name === void 0 ? void 0 : _invitee$name.slice(0, 2).toUpperCase())
          }),
          parentRef: parentRef,
          children: shouldShowStatus && /*#__PURE__*/jsx(Avatar, {
            size: "supertiny",
            color: statusAvatar.bagdeColor,
            children: /*#__PURE__*/jsx(Icon, {
              name: statusAvatar.icon,
              color: statusAvatar.iconColor,
              size: 10
            })
          })
        }), /*#__PURE__*/jsxs("div", {
          className: styles$6._invitee_info,
          children: [(invitee === null || invitee === void 0 ? void 0 : invitee.name) && /*#__PURE__*/jsx(Text, {
            size: "s",
            children: invitee === null || invitee === void 0 ? void 0 : invitee.name
          }), (invitee === null || invitee === void 0 ? void 0 : invitee.type) === 'Lead' && !(invitee !== null && invitee !== void 0 && invitee.email) && /*#__PURE__*/jsx(Text, {
            size: "xs",
            color: "tomato",
            decoration: "underscore",
            children: t('leadNoEmail')
          }), /*#__PURE__*/jsx(Text, {
            size: "xs",
            color: invitee !== null && invitee !== void 0 && invitee.name ? 'softPeanut' : 'peanut',
            decoration: "underscore",
            children: invitee === null || invitee === void 0 ? void 0 : invitee.email
          })]
        }), (invitee === null || invitee === void 0 ? void 0 : invitee.type) && /*#__PURE__*/jsx(Label, {
          size: "small",
          uppercase: false,
          children: t("".concat(invitee === null || invitee === void 0 ? void 0 : (_invitee$type = invitee.type) === null || _invitee$type === void 0 ? void 0 : _invitee$type.toLowerCase()))
        }), !readOnly && /*#__PURE__*/jsx(IconButton, {
          name: "cross",
          size: 24,
          color: "softPeanut"
          // @ts-ignore
          ,

          onClick: function onClick() {
            return handleRemoveInvitee(invitee === null || invitee === void 0 ? void 0 : invitee.email);
          }
        })]
      })
    })
  });
}
_s12(InviteeCard, "jSQDYuFG8If88w6jzrW047PoiJs=", false, function () {
  return [useTranslation];
});
_c9 = InviteeCard;
var weekArray = [0, 1, 2, 3, 4, 5, 6];
var dayArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
var CalendarEvent = /*#__PURE__*/_s13(React.memo(_c10 = _s13(function (_ref2) {
  _s13();
  var _event$participants, _getColors, _getColors2, _event$participants2;
  var event = _ref2.event,
    selectedTimezone = _ref2.selectedTimezone;
  var _useVisible = useVisible(),
    ref = _useVisible.ref,
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  var startDatetimeSpaceTime = spacetime(event.startTime)["goto"](selectedTimezone || getUserTimeZone());
  var calculatePosition = getPxPaddingSinceMidnight(startDatetimeSpaceTime);
  var height = event.duration * (40 / 60) - 1;
  var width = event.collisions > 0 ? "calc(".concat(95.0 / (event.collisions + 1) + '%', " + ").concat(event.collisions * 8, "px)") : '95%';
  var topPosition = calculatePosition - height / 2 + 'px';
  var left = "calc(".concat(event.collisionNumber / (event.collisions + 1) * 100 + '%', " - ").concat(event.collisionNumber > 0 ? event.collisionNumber * 8 : 0, "px)");
  var endTime = spacetime(event.endTime)["goto"](selectedTimezone || getUserTimeZone());
  var cellClassName = clsx(styles$6.calendar_cell, _defineProperty$7(_defineProperty$7(_defineProperty$7({}, styles$6.calendar_cell_small, height < 29), styles$6.calendar_cell_45, height >= 29 && height < 39), styles$6.calendar_cell_placeholder, event.type === 'placeholder'));
  var participantsWithOrganizer = event === null || event === void 0 ? void 0 : (_event$participants = event.participants) === null || _event$participants === void 0 ? void 0 : _event$participants.map(function (participant) {
    var _event$owner, _event$owner$replaceA;
    var ownerEmail = event === null || event === void 0 ? void 0 : (_event$owner = event.owner) === null || _event$owner === void 0 ? void 0 : (_event$owner$replaceA = _event$owner.replaceAll(/[<>]/gi, '')) === null || _event$owner$replaceA === void 0 ? void 0 : _event$owner$replaceA.trim();
    var isOwner = (participant === null || participant === void 0 ? void 0 : participant.email) === ownerEmail;
    return isOwner ? _objectSpread$3(_objectSpread$3({}, participant), {}, {
      type: 'Organizer'
    }) : participant;
  });
  //@ts-ignore
  var orderedParticipants = participantsWithOrganizer === null || participantsWithOrganizer === void 0 ? void 0 : participantsWithOrganizer.reduce(function (acc, invitee) {
    if ((invitee === null || invitee === void 0 ? void 0 : invitee.type) === 'Organizer') {
      return [invitee].concat(_toConsumableArray$3(acc));
    }
    return [].concat(_toConsumableArray$3(acc), [invitee]);
  }, []);

  //@ts-ignore
  var getColors = function getColors() {
    if ((event === null || event === void 0 ? void 0 : event.type) === 'bloobirds') {
      return {
        backgroundColor: 'verySoftTomato',
        barColor: 'tomato'
      };
    } else if ((event === null || event === void 0 ? void 0 : event.type) === 'placeholder') {
      return {
        backgroundColor: 'white',
        barColor: 'bloobirds'
      };
    } else if ((event === null || event === void 0 ? void 0 : event.type) === 'nylas') {
      return {
        backgroundColor: (event === null || event === void 0 ? void 0 : event.backgroundColor) || 'verySoftBloobirds',
        barColor: (event === null || event === void 0 ? void 0 : event.barColor) || 'bloobirds'
      };
    }
  };
  var zIndex = (event === null || event === void 0 ? void 0 : event.type) === 'placeholder' ? 10 : event.collisionNumber;
  return /*#__PURE__*/jsx(Dropdown, {
    ref: ref,
    width: 448,
    position: "left",
    fallbackPositions: ['left'],
    arrow: false,
    customStyles: {
      top: topPosition,
      right: '10px'
    },
    visible: visible,
    anchor: /*#__PURE__*/jsxs("div", {
      className: cellClassName,
      style: {
        top: calculatePosition + 'px',
        height: height,
        width: width,
        left: left,
        backgroundColor: "var(--".concat((_getColors = getColors()) === null || _getColors === void 0 ? void 0 : _getColors.backgroundColor, ")"),
        borderLeft: "2px solid var(--".concat((_getColors2 = getColors()) === null || _getColors2 === void 0 ? void 0 : _getColors2.barColor, ")"),
        zIndex: visible ? 10 : zIndex,
        // @ts-ignore
        boxShadow: visible ? '0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%), 0px 3px 5px -1px rgb(0 0 0 / 20%)' : null,
        alignItems: 'start'
      },
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        return event.type !== 'placeholder' && setVisible(true);
      },
      children: [/*#__PURE__*/jsx("div", {
        className: styles$6.calendar_cell_title,
        children: event.title || 'Untitled meeting'
      }), /*#__PURE__*/jsx("div", {
        className: styles$6.calendar_cell_time,
        children: startDatetimeSpaceTime.format('time')
      })]
    }),
    children: /*#__PURE__*/jsxs("div", {
      className: styles$6.event_details_container,
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
      },
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$6.event_details_header,
        children: [/*#__PURE__*/jsxs("div", {
          className: styles$6.event_details_title_name,
          children: [/*#__PURE__*/jsx(Icon, {
            name: "calendar",
            color: "tomato",
            size: 32,
            className: styles$6.event_details_icon
          }), /*#__PURE__*/jsx(Text, {
            className: styles$6.event_details_title_text,
            children: (event === null || event === void 0 ? void 0 : event.title) || 'Untitled meeting'
          })]
        }), /*#__PURE__*/jsx(IconButton, {
          name: "cross",
          size: 16,
          onClick: function onClick() {
            return setVisible(false);
          }
        })]
      }), /*#__PURE__*/jsx("div", {
        className: styles$6.event_details_title,
        children: /*#__PURE__*/jsxs(Text, {
          size: "m",
          children: [toTitleCase(startDatetimeSpaceTime.dayName()), ", ", startDatetimeSpaceTime.date(), ' ', toTitleCase(startDatetimeSpaceTime.monthName()), " \xB7", ' ', startDatetimeSpaceTime.format('time'), " - ", endTime.format('time')]
        })
      }), /*#__PURE__*/jsxs("div", {
        className: styles$6.event_details_body,
        children: [/*#__PURE__*/jsxs("span", {
          className: styles$6.attendees_details,
          children: [/*#__PURE__*/jsx(Icon, {
            name: "people",
            color: "softPeanut"
          }), /*#__PURE__*/jsxs(Text, {
            size: "s",
            className: styles$6.attendees_title,
            children: [(_event$participants2 = event.participants) === null || _event$participants2 === void 0 ? void 0 : _event$participants2.length, " attendees"]
          })]
        }), /*#__PURE__*/jsx("div", {
          className: styles$6.attendees_list_container,
          children: orderedParticipants === null || orderedParticipants === void 0 ? void 0 : orderedParticipants.map(function (participant) {
            return /*#__PURE__*/jsx(InviteeCard, {
              invitee: participant,
              readOnly: true,
              shouldShowStatus: true
            }, participant === null || participant === void 0 ? void 0 : participant.email);
          })
        })]
      }), /*#__PURE__*/jsx("div", {})]
    })
  });
}, "YW8KD4b4smMfpobT6qxyLO7Qj80=", false, function () {
  return [useVisible];
})), "YW8KD4b4smMfpobT6qxyLO7Qj80=", false, function () {
  return [useVisible];
});
_c11 = CalendarEvent;
function generateWeek(day) {
  var firstDay = spacetime(day).startOf('week');
  return weekArray.map(function (i) {
    return firstDay.add(i, 'day').format('iso-date');
  });
}
function CalendarColumn(_ref3) {
  _s14();
  var _events$day;
  var day = _ref3.day,
    mode = _ref3.mode,
    events = _ref3.events,
    hourMarkerRef = _ref3.hourMarkerRef,
    selectedTimezone = _ref3.selectedTimezone;
  var mouseDelta = useMouseDelta();
  var _useCalendar = useCalendar(),
    setMeetingDuration = _useCalendar.setMeetingDuration;
  var _useEventPlaceholder = useEventPlaceholder(setMeetingDuration),
    eventPlaceholder = _useEventPlaceholder.eventPlaceholder,
    onCalendarPlaceholder = _useEventPlaceholder.onCalendarPlaceholder;
  useEffect(function () {
    if (mouseDelta.delta !== 0) {
      var placeholderDatetime = getTimeFromOffset(mouseDelta.initialPosition, day);
      var placeholderDuration = getDurationFromOffset(mouseDelta.delta);
      if (placeholderDuration < 0) {
        placeholderDatetime = spacetime(placeholderDatetime).subtract(-placeholderDuration, 'minute').format('iso-utc');
        placeholderDuration = -placeholderDuration;
      }
      if (onCalendarPlaceholder && typeof onCalendarPlaceholder === 'function') {
        onCalendarPlaceholder(placeholderDatetime, placeholderDuration);
      }
    }
  }, [mouseDelta === null || mouseDelta === void 0 ? void 0 : mouseDelta.delta, mouseDelta === null || mouseDelta === void 0 ? void 0 : mouseDelta.initialPosition]);
  var quickPlaceHolderCreation = function quickPlaceHolderCreation() {
    var placeholderDatetime = getTimeFromOffset(mouseDelta.initialPosition, day);
    var initialDateDifferent = spacetime(eventPlaceholder === null || eventPlaceholder === void 0 ? void 0 : eventPlaceholder.startTime).format('iso-utc') !== spacetime(placeholderDatetime).format('iso-utc');
    if (initialDateDifferent) {
      var _placeholderDatetime = getTimeFromOffset(mouseDelta.initialPosition, day);
      onCalendarPlaceholder(_placeholderDatetime, 60);
    }
  };
  // @ts-ignore
  var currentTimePadding = getPxPaddingSinceMidnight(null, selectedTimezone);
  var dayNumber = spacetime(day).format('day-number');
  var isWeekend = dayNumber === '6' || dayNumber === '';
  var columnClasses = clsx(styles$6.calendar_gridcell, _defineProperty$7({}, styles$6.calendar_gridcell_weekend, isWeekend));
  return /*#__PURE__*/jsxs("div", {
    className: columnClasses,
    ref: mouseDelta.ref,
    onClick: quickPlaceHolderCreation,
    children: [isToday(day, selectedTimezone || getUserTimeZone()) && /*#__PURE__*/jsx("div", {
      className: styles$6.calendar_now_marker,
      ref: hourMarkerRef,
      style: {
        top: currentTimePadding + 'px'
      }
    }), (_events$day = events[day]) === null || _events$day === void 0 ? void 0 : _events$day.map(function (event) {
      return /*#__PURE__*/jsx(CalendarEvent, {
        event: event,
        // @ts-ignore
        selectedTimezone: selectedTimezone
      }, event.id + (event === null || event === void 0 ? void 0 : event.calendarId));
    }), (eventPlaceholder === null || eventPlaceholder === void 0 ? void 0 : eventPlaceholder.day) === day && mode === 'week' && /*#__PURE__*/
    // @ts-ignore
    jsx(CalendarEvent, {
      event: eventPlaceholder,
      selectedTimezone: selectedTimezone
    })]
  }, "column-".concat(day));
}
_s14(CalendarColumn, "0Cksl/7nTuQ5zgRP5zkCWfavdF0=", false, function () {
  return [useMouseDelta, useCalendar, useEventPlaceholder];
});
_c12 = CalendarColumn;
var Calendar = function Calendar(_ref4) {
  _s15();
  var day = _ref4.day,
    _ref4$mode = _ref4.mode,
    mode = _ref4$mode === void 0 ? 'week' : _ref4$mode,
    events = _ref4.events,
    _ref4$notConnected = _ref4.notConnected,
    notConnected = _ref4$notConnected === void 0 ? false : _ref4$notConnected,
    onCalendarReconnect = _ref4.onCalendarReconnect,
    selectedTimezone = _ref4.selectedTimezone;
  var hourMarkerRef = useRef(null);
  var days = mode === 'week' ? generateWeek(day) : [day];
  var defaultUserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var _useMouseEvents = useMouseEvents(),
    setIsMouseDown = _useMouseEvents.setIsMouseDown;
  var _useCalendar2 = useCalendar(),
    setEventTypesSelected = _useCalendar2.setEventTypesSelected;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'meetingModal.calendar'
    }),
    t = _useTranslation2.t;
  useEffect(function () {
    var _hourMarkerRef$curren;
    // @ts-ignore
    hourMarkerRef === null || hourMarkerRef === void 0 ? void 0 : (_hourMarkerRef$curren = hourMarkerRef.current) === null || _hourMarkerRef$curren === void 0 ? void 0 : _hourMarkerRef$curren.scrollIntoView({
      block: 'center'
    });
  }, [day]);
  useEffect(function () {
    if (notConnected) setEventTypesSelected('bloobirds');
  }, [notConnected]);

  // @ts-ignore
  return /*#__PURE__*/jsx("div", {
    className: styles$6.calendar,
    onMouseDown: function onMouseDown() {
      return setIsMouseDown(true);
    },
    onMouseUp: function onMouseUp() {
      return setIsMouseDown(false);
    },
    children: notConnected ? /*#__PURE__*/jsx(CalendarNotConnected, {
      mode: mode,
      onCalendarReconnect: onCalendarReconnect
    }) : /*#__PURE__*/jsxs(Fragment, {
      children: [mode !== 'day' && /*#__PURE__*/jsx("div", {
        className: styles$6.calendar_column_headers,
        children: days.map(function (day) {
          var today = isToday(spacetime(day).toNativeDate(), selectedTimezone || getUserTimeZone());
          var nameClasses = clsx(styles$6.calendar_column_header_name, _defineProperty$7({}, styles$6.calendar_column_header_name_today, today));
          var dateClasses = clsx(styles$6.calendar_column_header_date, _defineProperty$7({}, styles$6.calendar_column_header_date_today, today));
          return /*#__PURE__*/jsxs("div", {
            className: styles$6.calendar_column_header,
            children: [/*#__PURE__*/jsx("span", {
              className: nameClasses,
              children: spacetime(day).format('day-short')
            }), /*#__PURE__*/jsx("span", {
              className: dateClasses,
              children: spacetime(day).format('date')
            })]
          }, "header-".concat(day));
        })
      }), /*#__PURE__*/jsxs("div", {
        className: styles$6.calendar_container,
        children: [/*#__PURE__*/jsx("div", {
          className: styles$6.calendar_timestrings_container,
          children: /*#__PURE__*/jsx("div", {
            className: styles$6.calendar_timestrings,
            children: dayArray.map(function (hour) {
              return /*#__PURE__*/jsx("div", {
                className: styles$6.calendar_timestring_container,
                children: /*#__PURE__*/jsxs("div", {
                  className: styles$6.calendar_timestring,
                  children: [hour.toString().padStart(2, '0'), ":00", ' ', defaultUserTimezone !== selectedTimezone && /*#__PURE__*/jsx(Tooltip, {
                    title: t('yourTimezone'),
                    position: "top",
                    children: /*#__PURE__*/jsxs(Text, {
                      size: "xxs",
                      align: "right",
                      children: ["(", spacetime()
                      //@ts-ignore
                      ["goto"](selectedTimezone).hour(hour)["goto"](defaultUserTimezone).hour(), ":00)"]
                    })
                  })]
                })
              }, "timestring_".concat(hour));
            })
          })
        }), /*#__PURE__*/jsx("div", {
          className: styles$6.calendar_grid_container,
          children: /*#__PURE__*/jsxs("div", {
            className: styles$6.calendar_grid,
            children: [/*#__PURE__*/jsx("div", {
              className: styles$6.calendar_grid_tiles,
              children: dayArray.map(function (h) {
                return /*#__PURE__*/jsx("div", {
                  className: styles$6.calendar_grid_tile
                }, "tile_".concat(h));
              })
            }), /*#__PURE__*/jsx("div", {
              className: styles$6.calendar_gridcell_container,
              children: days.map(function (day) {
                return /*#__PURE__*/jsx(CalendarColumn, {
                  mode: mode,
                  day: day,
                  events: events,
                  hourMarkerRef: hourMarkerRef,
                  selectedTimezone: selectedTimezone
                }, "column-".concat(day));
              })
            })]
          })
        })]
      })]
    })
  });
};
_s15(Calendar, "4TzTvt74QJyOFqd6S4XEoaU4c1w=", false, function () {
  return [useMouseEvents, useCalendar, useTranslation];
});
_c13 = Calendar;
function _typeof$6(obj) {
  "@babel/helpers - typeof";

  return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$6(obj);
}
function _defineProperty$6(obj, key, value) {
  key = _toPropertyKey$6(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$6(arg) {
  var key = _toPrimitive$6(arg, "string");
  return _typeof$6(key) === "symbol" ? key : String(key);
}
function _toPrimitive$6(input, hint) {
  if (_typeof$6(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$6(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toConsumableArray$2(arr) {
  return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$8(arr) || _nonIterableSpread$2();
}
function _nonIterableSpread$2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$8(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$8(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen);
}
function _iterableToArray$2(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$2(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$8(arr);
}
function _arrayLikeToArray$8(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
var CalendarsSelector = function CalendarsSelector(_ref) {
  _s16();
  var _calendarsAvailable$d, _calendarsAvailable$d2, _calendarsAvailable$d3, _calendarsAvailable$d4, _connections$list;
  var connections = _ref.connections,
    disabled = _ref.disabled,
    anchor = _ref.anchor;
  var _useVisible = useVisible(false),
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'meetingModal.calendarSelector'
    }),
    t = _useTranslation.t;
  var _useCalendar = useCalendar(),
    calendarSelected = _useCalendar.calendarSelected,
    setSelectedCalendar = _useCalendar.setSelectedCalendar,
    calendarsAvailable = _useCalendar.calendarsAvailable,
    accountSelected = _useCalendar.accountSelected,
    setAccountSelected = _useCalendar.setAccountSelected,
    calendarsWithColor = _useCalendar.calendarsWithColor;
  var myCalendars = (calendarsAvailable === null || calendarsAvailable === void 0 ? void 0 : (_calendarsAvailable$d = calendarsAvailable.data) === null || _calendarsAvailable$d === void 0 ? void 0 : _calendarsAvailable$d.filter(function (calendar) {
    return calendar === null || calendar === void 0 ? void 0 : calendar.primary;
  })) || [];
  var otherCalendars = (calendarsAvailable === null || calendarsAvailable === void 0 ? void 0 : (_calendarsAvailable$d2 = calendarsAvailable.data) === null || _calendarsAvailable$d2 === void 0 ? void 0 : _calendarsAvailable$d2.filter(function (calendar) {
    return !(calendar !== null && calendar !== void 0 && calendar.primary);
  })) || [];
  var openLearnHow = function openLearnHow() {
    var _connections$list$, _connections$list$2;
    if ((connections === null || connections === void 0 ? void 0 : (_connections$list$ = connections.list[0]) === null || _connections$list$ === void 0 ? void 0 : _connections$list$.provider) === 'gmail') {
      window.open('https://www.youtube.com/watch?v=Atgi1wxj8m4', '_blank');
    } else if ((connections === null || connections === void 0 ? void 0 : (_connections$list$2 = connections.list[0]) === null || _connections$list$2 === void 0 ? void 0 : _connections$list$2.provider) === 'eas') {
      window.open('https://support.microsoft.com/en-us/office/share-your-calendar-in-outlook-2fcf4f4f-8d46-4d8b-ae79-5d94549e531b', '_blank');
    } else {
      window.open('https://www.youtube.com/watch?v=Atgi1wxj8m4', '_blank');
    }
  };
  var handleClickCalendar = function handleClickCalendar(value, id) {
    value ? setSelectedCalendar(function (prevSelected) {
      return [].concat(_toConsumableArray$2(prevSelected), [id]);
    }) : setSelectedCalendar(function (prevSelected) {
      return prevSelected === null || prevSelected === void 0 ? void 0 : prevSelected.filter(function (c) {
        return c !== id;
      });
    });
  };
  return /*#__PURE__*/jsx(Dropdown, {
    anchor: anchor ? anchor(visible, setVisible) : /*#__PURE__*/jsxs("div", {
      className: clsx(styles$9._select_anchor, _defineProperty$6({}, styles$9._select_disabled, disabled)),
      onClick: function onClick() {
        return disabled ? null : setVisible(!visible);
      },
      children: [/*#__PURE__*/jsxs("span", {
        className: styles$9._email_selector,
        children: [/*#__PURE__*/jsx("span", {
          className: styles$9._icon_container,
          children: /*#__PURE__*/jsx(Icon, {
            name: "calendar",
            size: 12,
            color: "softPeanut"
          })
        }), /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: disabled ? 'softPeanut' : 'peanut',
          className: styles$9._select_text,
          children: disabled ? t('noCalendarsSelected') : (calendarSelected === null || calendarSelected === void 0 ? void 0 : calendarSelected.length) > 0 ? (calendarSelected === null || calendarSelected === void 0 ? void 0 : calendarSelected.length) > 1 ? (calendarSelected === null || calendarSelected === void 0 ? void 0 : calendarSelected.length) + ' ' + t('calendarsSelected').toLowerCase() : calendarsAvailable === null || calendarsAvailable === void 0 ? void 0 : (_calendarsAvailable$d3 = calendarsAvailable.data) === null || _calendarsAvailable$d3 === void 0 ? void 0 : (_calendarsAvailable$d4 = _calendarsAvailable$d3.find(function (c) {
            return (c === null || c === void 0 ? void 0 : c.id) === calendarSelected[0];
          })) === null || _calendarsAvailable$d4 === void 0 ? void 0 : _calendarsAvailable$d4.name : t('noCalendarsSelected')
        })]
      }), /*#__PURE__*/jsx("span", {
        style: {
          marginRight: '4px',
          display: 'flex'
        },
        children: /*#__PURE__*/jsx(Icon, {
          name: "chevronDown",
          size: 12,
          color: "softPeanut"
        })
      })]
    }),
    visible: visible,
    children: /*#__PURE__*/jsxs("div", {
      className: styles$9._calendars_container,
      children: [/*#__PURE__*/jsxs(Text, {
        size: "s",
        children: [t('calendarAccount'), ":"]
      }), /*#__PURE__*/jsx("div", {
        className: styles$9._accounts_selector,
        children: /*#__PURE__*/jsx(Select, {
          size: "small",
          value: accountSelected,
          onChange: setAccountSelected,
          borderless: false,
          width: "300px",
          children: connections === null || connections === void 0 ? void 0 : (_connections$list = connections.list) === null || _connections$list === void 0 ? void 0 : _connections$list.map(function (connection) {
            return /*#__PURE__*/jsx(Item, {
              value: connection === null || connection === void 0 ? void 0 : connection.id,
              children: connection === null || connection === void 0 ? void 0 : connection.email
            }, connection === null || connection === void 0 ? void 0 : connection.id);
          })
        })
      }), (myCalendars === null || myCalendars === void 0 ? void 0 : myCalendars.length) > 0 && /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx(Text, {
          size: "m",
          color: "peanut",
          children: t('myCalendars')
        }), /*#__PURE__*/jsx("div", {
          className: styles$9._calendars_list,
          children: myCalendars === null || myCalendars === void 0 ? void 0 : myCalendars.map(function (calendar) {
            var _calendarsWithColor$f;
            return /*#__PURE__*/jsx(Checkbox, {
              size: "small",
              checked: !!(calendarSelected !== null && calendarSelected !== void 0 && calendarSelected.find(function (c) {
                return c === (calendar === null || calendar === void 0 ? void 0 : calendar.id);
              })),
              onClick: function onClick(v) {
                return handleClickCalendar(v, calendar === null || calendar === void 0 ? void 0 : calendar.id);
              },
              color: calendarsWithColor === null || calendarsWithColor === void 0 ? void 0 : (_calendarsWithColor$f = calendarsWithColor.find(function (c) {
                return c.calendarId === (calendar === null || calendar === void 0 ? void 0 : calendar.id);
              })) === null || _calendarsWithColor$f === void 0 ? void 0 : _calendarsWithColor$f.color,
              children: calendar === null || calendar === void 0 ? void 0 : calendar.name
            }, calendar === null || calendar === void 0 ? void 0 : calendar.id);
          })
        })]
      }), (otherCalendars === null || otherCalendars === void 0 ? void 0 : otherCalendars.length) > 0 && /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx(Text, {
          size: "m",
          color: "peanut",
          children: t('otherCalendars')
        }), /*#__PURE__*/jsx("div", {
          className: styles$9._calendars_list,
          children: otherCalendars === null || otherCalendars === void 0 ? void 0 : otherCalendars.map(function (calendar) {
            var _calendarsWithColor$f2;
            return /*#__PURE__*/jsx(Checkbox, {
              size: "small",
              checked: !!(calendarSelected !== null && calendarSelected !== void 0 && calendarSelected.find(function (c) {
                return c === (calendar === null || calendar === void 0 ? void 0 : calendar.id);
              })),
              onClick: function onClick(v) {
                return handleClickCalendar(v, calendar === null || calendar === void 0 ? void 0 : calendar.id);
              },
              color: calendarsWithColor === null || calendarsWithColor === void 0 ? void 0 : (_calendarsWithColor$f2 = calendarsWithColor.find(function (c) {
                return c.calendarId === (calendar === null || calendar === void 0 ? void 0 : calendar.id);
              })) === null || _calendarsWithColor$f2 === void 0 ? void 0 : _calendarsWithColor$f2.color,
              children: calendar === null || calendar === void 0 ? void 0 : calendar.name
            }, calendar === null || calendar === void 0 ? void 0 : calendar.id);
          })
        })]
      }), /*#__PURE__*/jsxs("div", {
        className: styles$9._help_container,
        children: [/*#__PURE__*/jsx(Text, {
          size: "s",
          color: "peanut",
          children: t('infoText.missingCalendar')
        }), /*#__PURE__*/jsxs(Text, {
          size: "xs",
          color: "softPeanut",
          children: [t('infoText.learnHere'), ' ', /*#__PURE__*/jsx("a", {
            style: {
              color: 'var(--bloobirds)',
              cursor: 'pointer'
            },
            onClick: openLearnHow,
            children: t('infoText.howToAsk')
          }), ' ', t('infoText.toSeeIt')]
        })]
      })]
    })
  });
};
_s16(CalendarsSelector, "rnO2w7Kyx/ojLBx+xvrKVGD00kk=", false, function () {
  return [useVisible, useTranslation, useCalendar];
});
_c14 = CalendarsSelector;
var css_248z$5 = ".conferencingForm-module__conferencing_container__C7ujt {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 8px;\n  border-radius: 4px;\n}\n\n.conferencingForm-module__conferencing_container_marked__Sh5NE {\n  background-color: var(--bloobirds);\n}\n\n.conferencingForm-module__google_meet_icon__4Lu3- {\n  display: flex;\n  margin-left: 4px;\n  margin-right: 8px !important;\n}\n\n.conferencingForm-module__title__RJ0IK {\n  display: flex;\n  align-items: center;\n}\n\n.conferencingForm-module__title__RJ0IK > * {\n  margin-right: 4px;\n}\n";
var styles$5 = {
  "_conferencing_container": "conferencingForm-module__conferencing_container__C7ujt",
  "_conferencing_container_marked": "conferencingForm-module__conferencing_container_marked__Sh5NE",
  "_google_meet_icon": "conferencingForm-module__google_meet_icon__4Lu3-",
  "_title": "conferencingForm-module__title__RJ0IK"
};
styleInject(css_248z$5);
function _typeof$5(obj) {
  "@babel/helpers - typeof";

  return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$5(obj);
}
function _defineProperty$5(obj, key, value) {
  key = _toPropertyKey$5(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$5(arg) {
  var key = _toPrimitive$5(arg, "string");
  return _typeof$5(key) === "symbol" ? key : String(key);
}
function _toPrimitive$5(input, hint) {
  if (_typeof$5(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$5(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$7(arr, i) {
  return _arrayWithHoles$7(arr) || _iterableToArrayLimit$7(arr, i) || _unsupportedIterableToArray$7(arr, i) || _nonIterableRest$7();
}
function _nonIterableRest$7() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$7(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$7(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen);
}
function _arrayLikeToArray$7(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$7(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles$7(arr) {
  if (Array.isArray(arr)) return arr;
}
var ConferencingForm = function ConferencingForm() {
  _s17();
  var _useCalendar = useCalendar(),
    conferencingGoogleMeet = _useCalendar.conferencingGoogleMeet,
    setConferencingGoogleMeet = _useCalendar.setConferencingGoogleMeet,
    connections = _useCalendar.connections,
    accountSelected = _useCalendar.accountSelected;
  var _useState = useState(null),
    _useState2 = _slicedToArray$7(_useState, 2),
    emailProvider = _useState2[0],
    setEmailProvider = _useState2[1];
  var _useFormContext = useFormContext(),
    control = _useFormContext.control;
  var _useController = useController({
      control: control,
      name: 'conferencingGoogleMeet',
      defaultValue: conferencingGoogleMeet
    }),
    _useController$field = _useController.field,
    conferencingValue = _useController$field.value,
    conferencingOnChange = _useController$field.onChange;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'meetingModal.mainForm.conferencingForm'
    }),
    t = _useTranslation.t;
  useEffect(function () {
    var _connections$list;
    if (accountSelected && connections && (connections === null || connections === void 0 ? void 0 : (_connections$list = connections.list) === null || _connections$list === void 0 ? void 0 : _connections$list.length) > 0) {
      var _connections$list2, _connections$list$;
      var selectedConnection = connections === null || connections === void 0 ? void 0 : (_connections$list2 = connections.list) === null || _connections$list2 === void 0 ? void 0 : _connections$list2.find(function (connection) {
        return connection.id == accountSelected;
      });
      setEmailProvider((selectedConnection === null || selectedConnection === void 0 ? void 0 : selectedConnection.provider) || (connections === null || connections === void 0 ? void 0 : (_connections$list$ = connections.list[0]) === null || _connections$list$ === void 0 ? void 0 : _connections$list$.provider));
    }
  }, [accountSelected]);
  var conferencingIcon, conferencingLabel;
  if (emailProvider && emailProvider == 'ews') {
    conferencingIcon = /*#__PURE__*/jsx(Icon, {
      size: 20,
      color: conferencingValue ? 'white' : 'purple',
      name: "mSTeams"
    });
    conferencingLabel = conferencingValue ? t('linkByTeams') : t('addTeams');
  } else {
    conferencingIcon = conferencingValue ? /*#__PURE__*/jsx("img", {
      src: GoogleMeetWhiteSvg
    }) : /*#__PURE__*/jsx("img", {
      src: GoogleMeetSvg
    });
    conferencingLabel = conferencingValue ? t('linkByGoogle') : t('addGoogle');
  }
  return /*#__PURE__*/jsx("div", {
    children: /*#__PURE__*/jsxs("div", {
      className: clsx(styles$5._conferencing_container, _defineProperty$5({}, styles$5._conferencing_container_marked, conferencingValue)),
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$5._title,
        children: [/*#__PURE__*/jsx("div", {
          className: styles$5._google_meet_icon,
          children: conferencingIcon
        }), /*#__PURE__*/jsx(Text, {
          size: "s",
          color: conferencingValue ? 'white' : 'peanut',
          children: conferencingLabel
        })]
      }), /*#__PURE__*/jsx(IconButton, {
        name: conferencingValue ? 'cross' : 'plus',
        color: conferencingValue ? 'white' : 'bloobirds',
        onClick: function onClick() {
          setConferencingGoogleMeet(!conferencingGoogleMeet);
          conferencingOnChange(!conferencingValue);
        }
      })]
    })
  });
};
_s17(ConferencingForm, "CvLe7nmsv7WmfdAlfIi1iMXnT3A=", false, function () {
  return [useCalendar, useFormContext, useController, useTranslation];
});
_c15 = ConferencingForm;
var css_248z$4 = ".reminderForm-module__reminder_container__k6pdz {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 8px;\n}\n\n.reminderForm-module__title__X5Wy2 {\n  display: flex;\n  align-items: center;\n}\n\n.reminderForm-module__title__X5Wy2 > * {\n  margin-right: 4px;\n}\n\n.reminderForm-module__reminder_form_container__CzO-N {\n  display: flex;\n  align-items: flex-start;\n}\n\n.reminderForm-module__reminder_form_container__CzO-N > * {\n  margin-right: 6px;\n}\n\n.reminderForm-module__reminder_form_container__CzO-N > *:last-child {\n  margin-right: 0;\n}\n";
var styles$4 = {
  "_reminder_container": "reminderForm-module__reminder_container__k6pdz",
  "_title": "reminderForm-module__title__X5Wy2",
  "_reminder_form_container": "reminderForm-module__reminder_form_container__CzO-N"
};
styleInject(css_248z$4);
var ReminderForm = function ReminderForm() {
  _s18();
  var _useCalendar = useCalendar(),
    reminderTemplate = _useCalendar.reminderTemplate,
    setReminderBefore = _useCalendar.setReminderBefore,
    reminderBefore = _useCalendar.reminderBefore,
    setReminderTemplate = _useCalendar.setReminderTemplate,
    showReminder = _useCalendar.showReminder,
    setShowReminder = _useCalendar.setShowReminder;
  // @ts-ignore
  var _useFormContext = useFormContext(),
    control = _useFormContext.control,
    setValue = _useFormContext.setValue,
    formState = _useFormContext.formState;
  var _useMessagingTemplate = useMessagingTemplates({
      onlyMine: false,
      visibility: null,
      name: '',
      segmentationValues: {},
      type: TEMPLATE_TYPES.EMAIL,
      page: 0,
      size: 200
    }),
    messagingTemplates = _useMessagingTemplate.messagingTemplates;
  var _useContext = useContext(MeetingModalContext),
    userId = _useContext.userId;
  var privateTemplates = messagingTemplates.filter(function (template) {
    return (template === null || template === void 0 ? void 0 : template.createdBy) === userId;
  });
  var publicTemplates = messagingTemplates.filter(function (template) {
    return (template === null || template === void 0 ? void 0 : template.visibility) === 'PUBLIC';
  });
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'meetingModal.mainForm.reminderForm'
    }),
    t = _useTranslation.t;
  var _useController = useController({
      control: control,
      name: 'reminderTemplate',
      rules: {
        required: !!showReminder
      },
      defaultValue: reminderTemplate
    }),
    _useController$field = _useController.field,
    reminderTemplateValue = _useController$field.value,
    templateOnChange = _useController$field.onChange;
  var _useController2 = useController({
      control: control,
      name: 'reminderBefore',
      defaultValue: reminderBefore === null || reminderBefore === void 0 ? void 0 : reminderBefore.value,
      rules: {
        required: true
      }
    }),
    _useController2$field = _useController2.field,
    reminderBeforeValue = _useController2$field.value,
    reminderBeforeOnChange = _useController2$field.onChange;
  var _useController3 = useController({
      control: control,
      name: 'reminderBeforeType',
      defaultValue: reminderBefore === null || reminderBefore === void 0 ? void 0 : reminderBefore.type,
      rules: {
        required: true
      }
    }),
    _useController3$field = _useController3.field,
    reminderBeforeTypeValue = _useController3$field.value,
    reminderBeforeTypeOnChange = _useController3$field.onChange;
  var errorTemplate = (formState === null || formState === void 0 ? void 0 : formState.errors) && (formState === null || formState === void 0 ? void 0 : formState.errors['reminderTemplate']) && t('thisFieldIsRequired');
  useEffect(function () {
    if (reminderTemplate && !reminderTemplateValue) {
      setValue('reminderTemplate', reminderTemplate);
    }
  }, [reminderTemplate, reminderTemplateValue]);
  useEffect(function () {
    if (messagingTemplates && reminderTemplateValue && !(messagingTemplates !== null && messagingTemplates !== void 0 && messagingTemplates.find(function (template) {
      return (template === null || template === void 0 ? void 0 : template.id) === reminderTemplateValue;
    }))) {
      setValue('reminderTemplate', null);
    }
  }, [reminderTemplateValue, messagingTemplates]);
  return /*#__PURE__*/jsxs("div", {
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$4._reminder_container,
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$4._title,
        children: [/*#__PURE__*/jsx(Icon, {
          name: "bell"
        }), /*#__PURE__*/jsx(Text, {
          size: "s",
          children: t('addNotificationEmail')
        }), /*#__PURE__*/jsx(Tooltip, {
          title: t('tooltipMessage'),
          position: "top",
          children: /*#__PURE__*/jsx(Icon, {
            name: "infoFilled",
            size: 16
          })
        })]
      }), /*#__PURE__*/jsx(IconButton, {
        name: "plus",
        onClick: function onClick() {
          return setShowReminder(true);
        }
      })]
    }), showReminder && /*#__PURE__*/jsxs("div", {
      className: styles$4._reminder_form_container,
      children: [/*#__PURE__*/jsxs(Select, {
        borderless: false,
        size: "small",
        width: "150px",
        error: errorTemplate,
        value: reminderTemplateValue,
        placeholder: "".concat(t('emailTemplate'), " *"),
        onChange: function onChange(templateId) {
          setReminderTemplate(templateId);
          templateOnChange(templateId);
        },
        children: [/*#__PURE__*/jsx(Section, {
          id: "my-templates",
          children: t('myTemplates')
        }), privateTemplates.map(function (messagingTemplate) {
          return /*#__PURE__*/jsx(Item, {
            section: "my-templates",
            value: messagingTemplate.id,
            children: truncate(messagingTemplate.name, {
              length: 32
            })
          }, messagingTemplate.id);
        }), /*#__PURE__*/jsx(Section, {
          id: "team-templates",
          children: t('teamTemplates')
        }), publicTemplates.map(function (messagingTemplate) {
          return /*#__PURE__*/jsx(Item, {
            section: "team-templates",
            value: messagingTemplate.id,
            children: truncate(messagingTemplate.name, {
              length: 32
            })
          }, messagingTemplate.id);
        })]
      }), /*#__PURE__*/jsx(Input, {
        size: "small",
        type: "number",
        width: "50px",
        value: reminderBeforeValue,
        onChange: function onChange(v) {
          setReminderBefore(function (prevStatus) {
            return {
              type: prevStatus.type,
              value: v
            };
          });
          reminderBeforeOnChange(v);
        }
      }), /*#__PURE__*/jsxs(Select, {
        size: "small",
        width: "60px",
        borderless: false,
        value: reminderBeforeTypeValue,
        onChange: function onChange(type) {
          setReminderBefore(function (prevStatus) {
            return {
              type: type,
              value: prevStatus.value
            };
          });
          reminderBeforeTypeOnChange(type);
        },
        children: [/*#__PURE__*/jsx(Item, {
          value: RemindeBeforeType.minutes,
          children: t('minutes')
        }), /*#__PURE__*/jsx(Item, {
          value: RemindeBeforeType.hours,
          children: t('hours')
        }), /*#__PURE__*/jsx(Item, {
          value: RemindeBeforeType.days,
          children: t('days')
        })]
      }), /*#__PURE__*/jsx(IconButton, {
        name: "cross",
        onClick: function onClick() {
          setReminderBefore({
            type: RemindeBeforeType.minutes,
            value: 30
          });
          setReminderTemplate(null);
          setShowReminder(false);
        }
      })]
    })]
  });
};
_s18(ReminderForm, "d7RLtMRF2fhHFjtz29/YrItCb30=", false, function () {
  return [useCalendar, useFormContext, useMessagingTemplates, useTranslation, useController, useController, useController];
});
_c16 = ReminderForm;
function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$6(arr) || _nonIterableSpread$1();
}
function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray$1(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$1(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$6(arr);
}
function _slicedToArray$6(arr, i) {
  return _arrayWithHoles$6(arr) || _iterableToArrayLimit$6(arr, i) || _unsupportedIterableToArray$6(arr, i) || _nonIterableRest$6();
}
function _nonIterableRest$6() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$6(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$6(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen);
}
function _arrayLikeToArray$6(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$6(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles$6(arr) {
  if (Array.isArray(arr)) return arr;
}
var _recoilPersist = recoilPersist(),
  persistAtom = _recoilPersist.persistAtom;
var meetingTypeAtom = atom({
  key: 'meetingTypeAtom',
  "default": '',
  effects: [persistAtom]
});
function getEmailFromCompany$1(company) {
  if ('fields' in company && company !== null && company !== void 0 && company.fields) {
    var _company$fields;
    var companyEmails = company ? (_company$fields = company.fields) === null || _company$fields === void 0 ? void 0 : _company$fields.filter(function (field) {
      return field.value && field.type === 'EMAIL';
    }) : [];
    return (companyEmails === null || companyEmails === void 0 ? void 0 : companyEmails.length) > 0 ? companyEmails[0] : undefined;
  } else {
    return null;
  }
}
function MainInfoForm(_ref) {
  _s19();
  var prospectingStage = _ref.prospectingStage,
    accountId = _ref.accountId,
    isEditionModal = _ref.isEditionModal;
  var _useContext = useContext(MeetingModalContext),
    settings = _useContext.settings,
    dataModel = _useContext.dataModel;
  var _useRecoilState = useRecoilState(meetingTypeAtom),
    _useRecoilState2 = _slicedToArray$6(_useRecoilState, 2),
    meetingTypeStored = _useRecoilState2[0],
    setMeetingTypeStored = _useRecoilState2[1];
  var isB2CAccount = useIsB2CAccount();
  useGeneratePlaceHolder();
  var _useCalendar = useCalendar(),
    setMeetingDuration = _useCalendar.setMeetingDuration,
    setInvitees = _useCalendar.setInvitees,
    invitees = _useCalendar.invitees;
  var _useFormContext = useFormContext(),
    setValue = _useFormContext.setValue,
    control = _useFormContext.control,
    formState = _useFormContext.formState;
  var mainTypeField = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE);
  var _usePicklist = usePicklist(mainTypeField === null || mainTypeField === void 0 ? void 0 : mainTypeField.id),
    meetingTypes = _usePicklist.data;
  var types = meetingTypes === null || meetingTypes === void 0 ? void 0 : meetingTypes.filter(function (i) {
    return i.enabled;
  }).sort(function (a, b) {
    return a.ordering - b.ordering;
  });
  var _useUserHelpers = useUserHelpers(),
    has = _useUserHelpers.has;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'meetingModal.mainForm'
    }),
    t = _useTranslation.t;
  var _useController = useController({
      control: control,
      name: 'title',
      rules: {
        required: true
      },
      defaultValue: ''
    }),
    _useController$field = _useController.field,
    titleRef = _useController$field.ref,
    title = _useController$field.value,
    titleOnChange = _useController$field.onChange;
  var errorTitle = (formState === null || formState === void 0 ? void 0 : formState.errors) && (formState === null || formState === void 0 ? void 0 : formState.errors['title']) && t('thisFieldIsRequired');
  var firstMeetingType = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findValueByLogicRole(MEETING_MAIN_TYPE_VALUES.FIRST_MEETING);
  var followUpMeetingType = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findValueByLogicRole(MEETING_MAIN_TYPE_VALUES.FOLLOW_UP);
  var _useController2 = useController({
      control: control,
      name: ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE,
      defaultValue: meetingTypeStored || prospectingStage ? firstMeetingType === null || firstMeetingType === void 0 ? void 0 : firstMeetingType.id : followUpMeetingType === null || followUpMeetingType === void 0 ? void 0 : followUpMeetingType.id,
      rules: {
        required: true
      }
    }),
    _useController2$field = _useController2.field,
    meetingType = _useController2$field.value,
    meetingTypeOnChange = _useController2$field.onChange;
  var meetingTypeError = (formState === null || formState === void 0 ? void 0 : formState.errors) && (formState === null || formState === void 0 ? void 0 : formState.errors['ACTIVITY__MEETING_MAIN_TYPE']) && t('thisFieldIsRequired');
  var _useController3 = useController({
      control: control,
      name: 'dateTime',
      defaultValue: '',
      rules: {
        required: true
      }
    }),
    _useController3$field = _useController3.field,
    dateTime = _useController3$field.value,
    dateTimeOnChange = _useController3$field.onChange;
  var errorDatetime = (formState === null || formState === void 0 ? void 0 : formState.errors) && (formState === null || formState === void 0 ? void 0 : formState.errors['dateTime']) && t('thisFieldIsRequired');
  var _useController4 = useController({
      control: control,
      name: 'duration',
      rules: {
        required: true
      }
    }),
    _useController4$field = _useController4.field,
    durationRef = _useController4$field.ref,
    duration = _useController4$field.value,
    durationOnChange = _useController4$field.onChange;
  var errorDuration = (formState === null || formState === void 0 ? void 0 : formState.errors) && (formState === null || formState === void 0 ? void 0 : formState.errors['duration']) && t('thisFieldIsRequired');
  var _useController5 = useController({
      control: control,
      name: ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT
    }),
    _useController5$field = _useController5.field,
    meetingResult = _useController5$field.value,
    meetingResultOnChange = _useController5$field.onChange;
  var _useMeetingReportResu = useMeetingReportResult(dataModel, meetingType),
    meetingResults = _useMeetingReportResu.meetingResults;
  var _useController6 = useController({
      control: control,
      name: 'company',
      rules: {
        required: false
      }
    }),
    _useController6$field = _useController6.field,
    company = _useController6$field.value,
    companyOnChange = _useController6$field.onChange;
  var _useController7 = useController({
      control: control,
      name: 'lead',
      rules: {
        required: false
      }
    }),
    lead = _useController7.field.value;
  var _useState = useState(),
    _useState2 = _slicedToArray$6(_useState, 2);
  _useState2[0];
  var setLaunchTooltip = _useState2[1];
  !has(UserHelperKeys.NEW_MEETING_MODAL);
  useEffect(function () {
    setTimeout(function () {
      setLaunchTooltip(true);
    }, 2000);
  }, []);
  useEffect(function () {
    // If there is no title, set it to the default name
    if (!title) {
      if (company && !title) {
        if (!(company !== null && company !== void 0 && company.fields)) {
          var _settings$account;
          setValue('title', "".concat((company === null || company === void 0 ? void 0 : company.name) || '', " <> ").concat(settings === null || settings === void 0 ? void 0 : (_settings$account = settings.account) === null || _settings$account === void 0 ? void 0 : _settings$account.name));
        } else {
          var _settings$account2;
          setValue('title', "".concat(getValueFromLogicRole(company, 'COMPANY__NAME'), " <> ").concat(settings === null || settings === void 0 ? void 0 : (_settings$account2 = settings.account) === null || _settings$account2 === void 0 ? void 0 : _settings$account2.name));
        }
      } else if (lead && !title) {
        if (!(lead !== null && lead !== void 0 && lead.fields)) {
          var _settings$account3;
          setValue('title', "".concat((lead === null || lead === void 0 ? void 0 : lead.fullName) || '', " <> ").concat(settings === null || settings === void 0 ? void 0 : (_settings$account3 = settings.account) === null || _settings$account3 === void 0 ? void 0 : _settings$account3.name));
        } else {
          var _settings$account4;
          setValue('title', "".concat(getValueFromLogicRole(lead, 'LEAD__NAME'), " <> ").concat(settings === null || settings === void 0 ? void 0 : (_settings$account4 = settings.account) === null || _settings$account4 === void 0 ? void 0 : _settings$account4.name));
        }
      }
    }
  }, [company, lead]);
  return /*#__PURE__*/jsxs("div", {
    className: styles$a._main_row,
    children: [/*#__PURE__*/jsx("div", {
      className: styles$a._main_info_title,
      children: /*#__PURE__*/jsx(Text, {
        size: "m",
        children: t('meetingDetails')
      })
    }), /*#__PURE__*/jsx(Input, {
      width: "100%",
      placeholder: "".concat(t('title'), " *"),
      name: "title *"
      // @ts-ignore
      ,

      innerRef: titleRef,
      value: title || '',
      onChange: function onChange(value) {
        titleOnChange(removeHtmlTags(value));
      },
      error: errorTitle,
      className: styles$a.titleInput
    }), types && /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx("div", {
          className: styles$a._meetingType,
          children: /*#__PURE__*/jsxs(ChipGroup, {
            value: meetingType,
            onChange: function onChange(v) {
              setMeetingTypeStored(v);
              meetingTypeOnChange(v);
            },
            children: [types === null || types === void 0 ? void 0 : types.map(function (type) {
              return /*#__PURE__*/jsx(Chip, {
                size: "small",
                value: type === null || type === void 0 ? void 0 : type.id,
                children: type === null || type === void 0 ? void 0 : type.value
              }, type === null || type === void 0 ? void 0 : type.id);
            }), /*#__PURE__*/jsx(Tooltip, {
              title: t('tooltipMessage'),
              position: "top",
              children: /*#__PURE__*/jsx(Icon, {
                name: "infoFilled",
                size: 14
              })
            })]
          })
        }), meetingTypeError && /*#__PURE__*/jsx(Text, {
          color: "tomato",
          size: "xs",
          children: meetingTypeError
        })]
      }), isEditionModal && /*#__PURE__*/jsx("div", {
        className: styles$a._meetingResult,
        children: /*#__PURE__*/jsx(Select, {
          width: "100%",
          size: "small",
          placeholder: t('meetingResult'),
          value: meetingResult,
          onChange: meetingResultOnChange,
          children: meetingResults === null || meetingResults === void 0 ? void 0 : meetingResults.map(function (result) {
            return /*#__PURE__*/jsx(Item, {
              value: result === null || result === void 0 ? void 0 : result.id,
              label: result === null || result === void 0 ? void 0 : result.name,
              children: result === null || result === void 0 ? void 0 : result.name
            }, result === null || result === void 0 ? void 0 : result.id);
          })
        })
      })]
    }), !isB2CAccount && /*#__PURE__*/jsx(AutoCompleteSearchCompanies, {
      onChange: function onChange(v) {
        if (company) {
          var companyEmail = getEmailFromCompany$1(company);
          var companyName = (company === null || company === void 0 ? void 0 : company.name) || getValueFromLogicRole(company, 'COMPANY__NAME');
          if (!(invitees !== null && invitees !== void 0 && invitees.find(function (invitee) {
            return (invitee === null || invitee === void 0 ? void 0 : invitee.email) === (companyEmail === null || companyEmail === void 0 ? void 0 : companyEmail.value);
          }))) {
            setInvitees(function (curr) {
              return [].concat(_toConsumableArray$1(curr), [{
                type: 'Company',
                email: companyEmail === null || companyEmail === void 0 ? void 0 : companyEmail.value,
                name: companyName
              }]);
            });
          }
        }
        companyOnChange(v);
      },
      value: (company === null || company === void 0 ? void 0 : company.name) || getValueFromLogicRole(company, 'COMPANY__NAME') || '',
      name: "company",
      onCompanyIdChange: undefined,
      width: '304px',
      accountId: accountId,
      size: "labeled"
    }), /*#__PURE__*/jsxs("div", {
      className: styles$a._date_picker,
      children: [/*#__PURE__*/jsx(DateTimePicker, {
        width: "170px",
        size: "small",
        placeholder: "".concat(t('date'), " *")
        // @ts-ignore
        ,

        value: dateTime ? new Date(dateTime) : '',
        onChange: dateTimeOnChange,
        error: errorDatetime
      }), /*#__PURE__*/jsx(Input, {
        width: "100%",
        size: "small",
        placeholder: "".concat(t('durationMin'), " *"),
        adornment: /*#__PURE__*/jsx(Icon, {
          size: 12,
          color: "softPeanut",
          name: "clock"
        }),
        value: duration,
        onChange: function onChange(v) {
          var onlyNumbers = /^\d+$/; // Regular expression to match only numbers
          var numericValue = v === null || v === void 0 ? void 0 : v.replace(/\D/g, ''); // Remove non-numeric characters

          if (v === '' || !v || onlyNumbers.test(numericValue)) {
            setMeetingDuration(numericValue);
            durationOnChange(numericValue);
          }
        }
        // @ts-ignore
        ,

        innerRef: durationRef,
        error: errorDuration
      })]
    }), !isEditionModal && /*#__PURE__*/jsxs("div", {
      className: styles$a.titleForm,
      children: [/*#__PURE__*/jsx(ConferencingForm, {}), /*#__PURE__*/jsx(ReminderForm, {})]
    })]
  });
}
_s19(MainInfoForm, "p6NkLsav5eKQ703Nk/BW29hywT0=", false, function () {
  return [useRecoilState, useIsB2CAccount, useGeneratePlaceHolder, useCalendar, useFormContext, usePicklist, useUserHelpers, useTranslation, useController, useController, useController, useController, useController, useMeetingReportResult, useController, useController];
});
_c17 = MainInfoForm;
var css_248z$3 = ".notesForm-module__notes__box__VTobN > div {\n  justify-content: center;\n  border-radius: 3px 3px 0 0;\n}\n\n.notesForm-module__notes__box__VTobN {\n  border: 1px solid var(--softPeanut);\n  border-radius: 4px;\n  margin-top: 4px;\n}\n\n.notesForm-module__notes__container__cqHS8 {\n  margin-top: 16px;\n}\n\n.notesForm-module__notes_content__OT4fN {\n  height: 100px;\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n";
var styles$3 = {
  "_notes__box": "notesForm-module__notes__box__VTobN",
  "_notes__container": "notesForm-module__notes__container__cqHS8",
  "_notes_content": "notesForm-module__notes_content__OT4fN"
};
styleInject(css_248z$3);
var getText = function getText(value, notesPlugins) {
  if (value) {
    return typeof value === 'string' ? isHtml(value) ? deserialize(value, {
      format: 'HTML',
      plugins: notesPlugins
    }) : createParagraph(value) : value;
  }
  return null;
};
var NotesForm = function NotesForm(_ref) {
  _s20();
  var notesField = _ref.notesField,
    title = _ref.title,
    placeholder = _ref.placeholder;
  var value = notesField.value,
    onChange = notesField.onChange,
    ref = notesField.ref;
  var notesPlugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true
  });
  var text = getText(value, notesPlugins); // create paragraph

  return /*#__PURE__*/jsxs("div", {
    className: styles$3._notes__container,
    ref: ref,
    children: [/*#__PURE__*/jsx(Text, {
      size: "s",
      color: "softPeanut",
      children: title
    }), /*#__PURE__*/jsx("div", {
      className: styles$3._notes__box,
      children: /*#__PURE__*/jsx(RichTextEditor, {
        defaultValue: text,
        value: text,
        placeholder: placeholder,
        plugins: notesPlugins,
        onChange: onChange,
        style: {
          fontFamily: 'Proxima Nova Soft'
        },
        children: function children(editor) {
          return /*#__PURE__*/jsxs(Fragment, {
            children: [/*#__PURE__*/jsxs(EditorToolbar, {
              children: [/*#__PURE__*/jsx(EditorToolbarFontStylesSection, {}), /*#__PURE__*/jsx(EditorToolbarTextMarksSection, {}), /*#__PURE__*/jsx(EditorToolbarListsSection, {})]
            }), /*#__PURE__*/jsx("div", {
              className: styles$3._notes_content,
              children: editor
            })]
          });
        }
      })
    })]
  });
};
_s20(NotesForm, "TQtX0X1isO/XjbUQOK98X56wh1g=", false, function () {
  return [useRichTextEditorPlugins];
});
_c18 = NotesForm;
var SearchType;
(function (SearchType) {
  SearchType[SearchType["leads"] = 0] = "leads";
  SearchType[SearchType["coworkers"] = 1] = "coworkers";
})(SearchType || (SearchType = {}));
/*const randomColors: ColorType[] = [
  'bloobirds',
  'softPeanut',
  'verySoftTangerine',
  'softTangerine',
  'verySoftTomato',
  'softTomato',
  'softBanana',
  'verySoftBanana',
  'verySoftMelon',
  'softMelon',
  'lightBloobirds',
  'verySoftBloobirds',
  'verySoftPurple',
  'lightPurple',
  'verySoftPeanut',
  'lightPeanut',
  'lighterGray',
  'gray',
];*/

function _typeof$4(obj) {
  "@babel/helpers - typeof";

  return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$4(obj);
}
function _defineProperty$4(obj, key, value) {
  key = _toPropertyKey$4(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$4(arg) {
  var key = _toPrimitive$4(arg, "string");
  return _typeof$4(key) === "symbol" ? key : String(key);
}
function _toPrimitive$4(input, hint) {
  if (_typeof$4(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$4(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$5(arr, i) {
  return _arrayWithHoles$5(arr) || _iterableToArrayLimit$5(arr, i) || _unsupportedIterableToArray$5(arr, i) || _nonIterableRest$5();
}
function _nonIterableRest$5() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$5(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$5(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen);
}
function _arrayLikeToArray$5(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$5(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles$5(arr) {
  if (Array.isArray(arr)) return arr;
}
var useSearchLeadsGuests = function useSearchLeadsGuests(_ref) {
  _s21();
  var _company$id, _response$data;
  var company = _ref.company,
    inviteesEmails = _ref.inviteesEmails;
  var accountId = useActiveAccountId();
  var _useState = useState(''),
    _useState2 = _slicedToArray$5(_useState, 2),
    searchQuery = _useState2[0],
    setSearchQuery = _useState2[1];
  var debounceSearchValue = useDebounce(searchQuery, 200);
  var isValidEmail = isEmail(debounceSearchValue);
  var _useState3 = useState(SearchType.leads),
    _useState4 = _slicedToArray$5(_useState3, 2),
    searchType = _useState4[0],
    setSearchType = _useState4[1];
  var query = company ? _defineProperty$4({}, LEAD_FIELDS_LOGIC_ROLE.COMPANY, [company === null || company === void 0 ? void 0 : (_company$id = company.id) === null || _company$id === void 0 ? void 0 : _company$id.value]) : {};
  var queries = [];
  if (debounceSearchValue) {
    queries = [_defineProperty$4({}, LEAD_FIELDS_LOGIC_ROLE.EMAIL, {
      query: [debounceSearchValue],
      searchMode: 'AUTOCOMPLETE__SEARCH'
    }), _defineProperty$4(_defineProperty$4({}, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME, {
      query: [debounceSearchValue],
      searchMode: 'AUTOCOMPLETE__SEARCH'
    }), LEAD_FIELDS_LOGIC_ROLE.EMAIL, ['__MATCH_FULL_ROWS__'])];
  } else {
    queries = [_defineProperty$4({}, LEAD_FIELDS_LOGIC_ROLE.EMAIL, ['__MATCH_FULL_ROWS__'])];
  }
  var _useSWR = useSWR(searchType === SearchType.leads ? ['searchLeadGuestsMeetings', debounceSearchValue, company] : null, function () {
      return api.post("/bobjects/".concat(accountId, "/Lead/search"), {
        query: query,
        queries: queries,
        formFields: true,
        pageSize: 50
      });
    }, {
      use: [keepPreviousResponse],
      keepPreviousData: true
    }),
    response = _useSWR.data,
    isValidating = _useSWR.isValidating;
  var leads = response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.contents;
  var _useUserSearch = useUserSearch(),
    coworkers = _useUserSearch.users;
  var parsedCoworkers = coworkers === null || coworkers === void 0 ? void 0 : coworkers.map(function (user) {
    return {
      type: 'Coworker',
      email: user === null || user === void 0 ? void 0 : user.email,
      name: user === null || user === void 0 ? void 0 : user.name,
      id: user === null || user === void 0 ? void 0 : user.id
    };
  });
  var allCoworkersAdded = useMemo(function () {
    return parsedCoworkers === null || parsedCoworkers === void 0 ? void 0 : parsedCoworkers.every(function (_ref6) {
      var selectedEmail = _ref6.email;
      return inviteesEmails.some(function (email) {
        return selectedEmail === email;
      });
    });
  }, [inviteesEmails]);
  var allLeadsAdded = useMemo(function () {
    return leads === null || leads === void 0 ? void 0 : leads.every(function (lead) {
      var leadEmail = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
      return inviteesEmails.some(function (email) {
        return leadEmail === email;
      });
    });
  }, [inviteesEmails]);
  useEffect(function () {
    if (allCoworkersAdded) {
      setSearchType(SearchType.leads);
    }
  }, [allCoworkersAdded]);
  function getAvailableContacts() {
    switch (searchType) {
      case SearchType.leads:
        return leads === null || leads === void 0 ? void 0 : leads.filter(function (lead) {
          var leadEmail = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
          return !(inviteesEmails !== null && inviteesEmails !== void 0 && inviteesEmails.includes(leadEmail));
        });
      case SearchType.coworkers:
        {
          return parsedCoworkers === null || parsedCoworkers === void 0 ? void 0 : parsedCoworkers.filter(function (_ref7) {
            var userEmail = _ref7.email,
              name = _ref7.name;
            return !(inviteesEmails !== null && inviteesEmails !== void 0 && inviteesEmails.includes(userEmail)) && (!debounceSearchValue || (userEmail === null || userEmail === void 0 ? void 0 : userEmail.toLowerCase().includes(debounceSearchValue.toLowerCase())) || (name === null || name === void 0 ? void 0 : name.toLowerCase().includes(debounceSearchValue.toLowerCase())));
          });
        }
      default:
        return [];
    }
  }
  return {
    isValidEmail: isValidEmail,
    isValidating: isValidating,
    availableContacts: useMemo(function () {
      return getAvailableContacts();
    }, [searchType, searchQuery, company, inviteesEmails]),
    allCoworkersAdded: allCoworkersAdded,
    allLeadsAdded: allLeadsAdded,
    searchType: searchType,
    setSearchType: setSearchType,
    searchQuery: searchQuery,
    debounceSearchValue: debounceSearchValue,
    setSearchQuery: setSearchQuery
  };
};
_s21(useSearchLeadsGuests, "3l5TAqPs+FzEb2Z+oNf71PZxQWg=", false, function () {
  return [useActiveAccountId, useDebounce, useSWR, useUserSearch];
});
var css_248z$2 = ".noContacts-module_noContacts__ajK0T {\n    width: 100%;\n    margin: 8px auto;\n    height: 156px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 8px;\n    padding: 0 24px;\n}\n";
var styles$2 = {
  "noContacts": "noContacts-module_noContacts__ajK0T"
};
styleInject(css_248z$2);
var NoContacts = function NoContacts(_ref) {
  var hasSearchTerm = _ref.hasSearchTerm;
  return /*#__PURE__*/jsxs("div", {
    className: styles$2.noContacts,
    children: [/*#__PURE__*/jsx(Icon, {
      name: hasSearchTerm ? 'searchNone' : 'search',
      color: "softPeanut",
      size: 32
    }), /*#__PURE__*/jsx(Text, {
      size: "s",
      color: "softPeanut",
      align: "center",
      children: hasSearchTerm ? 'No results match your search criteria' : 'Type something to display a list of results'
    })]
  });
};
_c19 = NoContacts;
var css_248z$1 = ".searchLeadsGuests-module__item_wrapper__WTmw- {\n    width: 295px;\n  max-height: 100%;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.searchLeadsGuests-module__lead_icon__LyUBO {\n    border-radius: 50%;\n    background-color: var(--softPeanut);\n    color: var(--white);\n    border-color: var(--white);\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 24px;\n    height: 24px;\n}\n\n.searchLeadsGuests-module__lead__info__RqlHf {\n  margin-left: 8px;\n}\n\n.searchLeadsGuests-module__lead__company__X-9Yg {\n    display: block;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n    max-width: 224px;\n}\n\n.searchLeadsGuests-module__lead__company__X-9Yg > * {\n  margin-right: 4px;\n}\n\n.searchLeadsGuests-module__company__icon__jeZgJ {\n  flex-shrink: 0;\n}\n\n.searchLeadsGuests-module_noResults__2NeMA {\n  padding: 8px;\n}\n\n.searchLeadsGuests-module_invite_title__ctn16 {\n  margin-right: 4px;\n}\n\n.searchLeadsGuests-module_item__Yt7M1 {\n  width: 100%;\n}\n\n.searchLeadsGuests-module_invite_other__El7eW {\n  display: flex;\n  width: 100%;\n}\n\n.searchLeadsGuests-module_chipGroupDiv__oAsuv {\n    padding: 8px 6px;\n    display: flex;\n    justify-content: space-evenly;\n    cursor: default;\n    gap: 6px;\n}\n\n.searchLeadsGuests-module_chipSelected__mTyGo div {\n  cursor: default;\n}\n\n.searchLeadsGuests-module_inputContainer__H3ou8 {\n    position: relative;\n}\n\n.searchLeadsGuests-module_dropdown__gv6ms {\n    animation: searchLeadsGuests-module_popup__oUU4C 125ms ease-in-out forwards;\n    position: absolute;\n    bottom: -4px;\n    border-radius: 4px;\n    box-sizing: border-box;\n    color: var(--peanut);\n    display: flex;\n    filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.15));\n    flex-direction: column;\n    font-family: var(--fontFamily);\n    background-color: var(--white);\n    min-height: 150px;\n    max-height: 220px;\n    min-width: 295px;\n    z-index: 2;\n}\n\n.searchLeadsGuests-module_dropdown__gv6ms > *::-webkit-scrollbar-track {\n    background-color: transparent;\n}\n\n.searchLeadsGuests-module_dropdown__gv6ms > *::-webkit-scrollbar {\n    width: 4px;\n}\n\n.searchLeadsGuests-module_dropdown__gv6ms > *::-webkit-scrollbar-thumb {\n    border: 2px solid var(--gray);\n}\n\n.searchLeadsGuests-module_spinnerContainer__HWabn {\n  height: 200px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n\n@keyframes searchLeadsGuests-module_popup__oUU4C {\n    from {\n        opacity: 0;\n        transform: translateY(85%) scale(0.85);\n    }\n\n    to {\n        opacity: 1;\n        transform: translateY(100%) scale(1);\n    }\n}\n";
var styles$1 = {
  "_item_wrapper": "searchLeadsGuests-module__item_wrapper__WTmw-",
  "_lead_icon": "searchLeadsGuests-module__lead_icon__LyUBO",
  "_lead__info": "searchLeadsGuests-module__lead__info__RqlHf",
  "_lead__company": "searchLeadsGuests-module__lead__company__X-9Yg",
  "_company__icon": "searchLeadsGuests-module__company__icon__jeZgJ",
  "noResults": "searchLeadsGuests-module_noResults__2NeMA",
  "invite_title": "searchLeadsGuests-module_invite_title__ctn16",
  "item": "searchLeadsGuests-module_item__Yt7M1",
  "invite_other": "searchLeadsGuests-module_invite_other__El7eW",
  "chipGroupDiv": "searchLeadsGuests-module_chipGroupDiv__oAsuv",
  "chipSelected": "searchLeadsGuests-module_chipSelected__mTyGo",
  "inputContainer": "searchLeadsGuests-module_inputContainer__H3ou8",
  "dropdown": "searchLeadsGuests-module_dropdown__gv6ms",
  "popup": "searchLeadsGuests-module_popup__oUU4C",
  "spinnerContainer": "searchLeadsGuests-module_spinnerContainer__HWabn"
};
styleInject(css_248z$1);
function _typeof$3(obj) {
  "@babel/helpers - typeof";

  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$3(obj);
}
function _defineProperty$3(obj, key, value) {
  key = _toPropertyKey$3(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$3(arg) {
  var key = _toPrimitive$3(arg, "string");
  return _typeof$3(key) === "symbol" ? key : String(key);
}
function _toPrimitive$3(input, hint) {
  if (_typeof$3(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$3(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$4(arr, i) {
  return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$4();
}
function _nonIterableRest$4() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$4(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$4(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen);
}
function _arrayLikeToArray$4(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$4(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles$4(arr) {
  if (Array.isArray(arr)) return arr;
}
var SearchLeadsGuests = function SearchLeadsGuests(_ref) {
  _s22();
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 16 : _ref$size,
    handleSelect = _ref.handleSelect,
    company = _ref.company,
    inviteesEmails = _ref.inviteesEmails;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray$4(_React$useState, 2),
    focused = _React$useState2[0],
    setFocused = _React$useState2[1];
  var onFocus = function onFocus() {
    return setFocused(true);
  };
  var onBlur = function onBlur() {
    return setFocused(false);
  };
  var inputRef = React.useRef(null);
  var _useVisible = useVisible(false),
    ref = _useVisible.ref,
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  var _useState = useState(),
    _useState2 = _slicedToArray$4(_useState, 2),
    error = _useState2[0],
    setError = _useState2[1];
  useClickAway(ref, function () {
    return setVisible(false);
  });
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'meetingModal.searchLeadsGuests'
    }),
    t = _useTranslation.t;
  var includeCoworkers = useIsOTOAccount();
  var _useSearchLeadsGuests = useSearchLeadsGuests({
      company: company,
      inviteesEmails: inviteesEmails
    }),
    searchType = _useSearchLeadsGuests.searchType,
    setSearchType = _useSearchLeadsGuests.setSearchType,
    debounceSearchValue = _useSearchLeadsGuests.debounceSearchValue,
    allCoworkersAdded = _useSearchLeadsGuests.allCoworkersAdded,
    availableContacts = _useSearchLeadsGuests.availableContacts,
    isValidating = _useSearchLeadsGuests.isValidating,
    searchQuery = _useSearchLeadsGuests.searchQuery,
    setSearchQuery = _useSearchLeadsGuests.setSearchQuery,
    isValidEmail = _useSearchLeadsGuests.isValidEmail;
  function setDropdownFocused(focus) {
    setVisible(function (v) {
      return v === focus ? v : focus;
    });
  }
  var handleDropdownChipClick = function handleDropdownChipClick(type) {
    setDropdownFocused(true);
    if (type !== searchType) {
      setSearchType(type);
    }
  };
  var handleKeyPress = function handleKeyPress(e) {
    if (e.key === 'Enter') {
      if (debounceSearchValue) {
        if (isValidEmail) {
          handleSelect(debounceSearchValue);
          setVisible(false);
          setSearchQuery(null);
        } else {
          setError(t('invalidEmail'));
        }
      }
    }
  };
  useEffect(function () {
    if (error && isValidEmail) {
      setError(null);
    }
  }, [debounceSearchValue]);
  useEffect(function () {
    if (focused) {
      setVisible(true);
    }
  }, [focused]);
  return /*#__PURE__*/jsxs("div", {
    className: styles$1.inputContainer,
    onClick: function onClick() {
      var input = inputRef.current;
      input === null || input === void 0 ? void 0 : input.focus();
      setFocused(true);
    },
    children: [/*#__PURE__*/jsx(SearchInput, {
      innerRef: inputRef,
      width: "100%",
      placeholder: t('addAnother'),
      value: searchQuery,
      onChange: setSearchQuery,
      onKeyPress: handleKeyPress
      // @ts-ignore
      ,

      error: error,
      size: "small",
      name: "lead",
      onFocus: onFocus,
      onBlur: onBlur,
      onClick: function onClick() {
        return setVisible(true);
      }
    }), visible ? /*#__PURE__*/jsxs("div", {
      ref: ref,
      className: styles$1.dropdown,
      children: [includeCoworkers && /*#__PURE__*/jsx(DropdownHeader, {
        allCoworkersAdded: allCoworkersAdded,
        handleDropdownChipClick: handleDropdownChipClick,
        searchType: searchType,
        hasCompany: !!company
      }), isValidating ? /*#__PURE__*/jsx("div", {
        className: styles$1.spinnerContainer,
        children: /*#__PURE__*/jsx(Spinner, {
          name: "loadingCircle"
        })
      }) : (availableContacts === null || availableContacts === void 0 ? void 0 : availableContacts.length) > 0 ? /*#__PURE__*/jsx("div", {
        className: styles$1._item_wrapper,
        children: /*#__PURE__*/jsx(Fragment, {
          children: availableContacts === null || availableContacts === void 0 ? void 0 : availableContacts.map(function (option) {
            var _option$id;
            var isCoworker = 'type' in option && option.type === 'Coworker';
            var name = isCoworker ? option.name : getValueFromLogicRole(option, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
            var email = isCoworker ? option.email : getValueFromLogicRole(option, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
            return /*#__PURE__*/jsx(GuestCard, {
              size: size,
              option: option,
              name: name,
              email: email,
              handleSelect: handleSelect
            }, typeof (option === null || option === void 0 ? void 0 : option.id) === 'string' ? option === null || option === void 0 ? void 0 : option.id : (_option$id = option.id) === null || _option$id === void 0 ? void 0 : _option$id.value);
          })
        })
      }) : /*#__PURE__*/jsx(NoContacts, {
        hasSearchTerm: searchQuery !== '' && !isValidating
      })]
    }) : null]
  });
};
_s22(SearchLeadsGuests, "ECfuos6Ad2aiGO2q3p0LmlQEqjc=", false, function () {
  return [useVisible, useClickAway, useTranslation, useIsOTOAccount, useSearchLeadsGuests];
});
_c20 = SearchLeadsGuests;
var DropdownHeader = function DropdownHeader(_ref2) {
  _s23();
  var searchType = _ref2.searchType,
    handleDropdownChipClick = _ref2.handleDropdownChipClick,
    allCoworkersAdded = _ref2.allCoworkersAdded,
    _ref2$hasCompany = _ref2.hasCompany,
    hasCompany = _ref2$hasCompany === void 0 ? true : _ref2$hasCompany;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'meetingModal.searchLeadsGuests.dropdownHeader'
    }),
    t = _useTranslation2.t;
  return /*#__PURE__*/jsxs("div", {
    className: styles$1.chipGroupDiv,
    children: [/*#__PURE__*/jsx("div", {
      className: clsx(_defineProperty$3({}, styles$1.chipSelected, searchType === SearchType.leads)),
      children: /*#__PURE__*/jsxs(Chip, {
        size: "small",
        variant: "secondary",
        selected: searchType === SearchType.leads,
        onClick: function onClick() {
          return handleDropdownChipClick(SearchType.leads);
        },
        children: [t('search'), " ", hasCompany ? t('inCompany') : t('everywhere')]
      })
    }), /*#__PURE__*/jsx("div", {
      className: clsx(_defineProperty$3({}, styles$1.chipSelected, searchType === SearchType.coworkers)),
      children: /*#__PURE__*/jsx(Chip, {
        size: "small",
        variant: allCoworkersAdded ? 'primary' : 'secondary',
        disabled: allCoworkersAdded,
        selected: searchType === SearchType.coworkers,
        onClick: function onClick() {
          return handleDropdownChipClick(SearchType.coworkers);
        },
        children: t('coworkersEmails')
      })
    })]
  });
};
_s23(DropdownHeader, "zKId3lXTN2GCFmE2xgLOny8j7l8=", false, function () {
  return [useTranslation];
});
_c21 = DropdownHeader;
var GuestCard = function GuestCard(_ref3) {
  var _option$id2, _option$id3;
  var option = _ref3.option,
    name = _ref3.name,
    email = _ref3.email,
    size = _ref3.size,
    handleSelect = _ref3.handleSelect;
  return /*#__PURE__*/jsx(Item, {
    onMouseDown: function onMouseDown() {
      handleSelect(option);
      //setFocused(false);
    },

    value: typeof (option === null || option === void 0 ? void 0 : option.id) === 'string' ? option === null || option === void 0 ? void 0 : option.id : option === null || option === void 0 ? void 0 : (_option$id3 = option.id) === null || _option$id3 === void 0 ? void 0 : _option$id3.value,
    className: styles$1.item,
    children: /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsx("div", {
        className: styles$1._lead_icon,
        children: /*#__PURE__*/jsx(Icon, {
          name: "person",
          size: 14,
          color: "white"
        })
      }), /*#__PURE__*/jsxs("div", {
        className: styles$1._lead__info,
        children: [/*#__PURE__*/jsx(Text, {
          color: "peanut",
          size: size === 'medium' ? 'm' : 's',
          weight: "medium",
          ellipsis: 30,
          children: name
        }), /*#__PURE__*/jsx(Text, {
          color: "softPeanut",
          size: size === 'medium' ? 's' : 'xs',
          inline: true,
          className: styles$1._lead__company,
          children: email && /*#__PURE__*/jsxs(Fragment, {
            children: [/*#__PURE__*/jsx(Icon, {
              size: 16,
              name: "mail",
              color: "softPeanut",
              className: styles$1._company__icon
            }), email]
          })
        })]
      })]
    })
  }, typeof (option === null || option === void 0 ? void 0 : option.id) === 'string' ? option === null || option === void 0 ? void 0 : option.id : option === null || option === void 0 ? void 0 : (_option$id2 = option.id) === null || _option$id2 === void 0 ? void 0 : _option$id2.value);
};
_c22 = GuestCard;
function _typeof$2(obj) {
  "@babel/helpers - typeof";

  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$2(obj);
}
var _excluded = ["company", "lead", "opportunity", "duration", "dateTime", "title", "calendarNotes", "internalNotes", "reminderTemplate", "reminderBefore", "reminderBeforeType", "conferencingGoogleMeet"];
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$3(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$3(arr);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) {
      _defineProperty$2(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$2(obj, key, value) {
  key = _toPropertyKey$2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$2(arg) {
  var key = _toPrimitive$2(arg, "string");
  return _typeof$2(key) === "symbol" ? key : String(key);
}
function _toPrimitive$2(input, hint) {
  if (_typeof$2(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$2(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$3(arr, i) {
  return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3();
}
function _nonIterableRest$3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$3(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen);
}
function _arrayLikeToArray$3(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$3(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles$3(arr) {
  if (Array.isArray(arr)) return arr;
}
function stringifyArrays(obj) {
  var _Object$keys;
  var transformedObj = {};
  if (!transformedObj) {
    return null;
  }
  if (((_Object$keys = Object.keys(obj)) === null || _Object$keys === void 0 ? void 0 : _Object$keys.length) === 0) {
    return {};
  }
  for (var key in obj) {
    if (Array.isArray(obj[key])) {
      transformedObj[key] = JSON.stringify(obj[key]);
    } else {
      transformedObj[key] = obj[key];
    }
  }
  return transformedObj;
}
function getEmailFromCompany(company) {
  if ('fields' in company && company !== null && company !== void 0 && company.fields) {
    var _company$fields;
    var companyEmails = company ? (_company$fields = company.fields) === null || _company$fields === void 0 ? void 0 : _company$fields.filter(function (field) {
      return field.value && field.type === 'EMAIL';
    }) : [];
    return (companyEmails === null || companyEmails === void 0 ? void 0 : companyEmails.length) > 0 ? companyEmails[0] : undefined;
  } else {
    return null;
  }
}
function ModalChild() {
  _s24();
  var _formData$company, _formData$lead, _formData$opportunity, _activityTypes$find, _settings$settings, _settings$settings2, _users$users, _dataModel$findFieldB, _dataModel$findFieldB2, _formData$lead2, _formData$lead3, _dataModel$findFieldB3, _dataModel$findFieldB4, _formData$company2, _formData$company3, _formData$company4, _connections$list2, _activityAssignedToVa, _accountExecutivePick, _connections$list3, _connections$list4;
  var _useContext = useContext(MeetingModalContext),
    id = _useContext.id,
    accountId = _useContext.accountId,
    settings = _useContext.settings,
    userId = _useContext.userId,
    connections = _useContext.connections,
    mutateConnections = _useContext.mutateConnections,
    dataModel = _useContext.dataModel;
  var _useMinimizableModal = useMinimizableModal(id),
    closeModal = _useMinimizableModal.closeModal,
    minimize = _useMinimizableModal.minimize,
    formData = _useMinimizableModal.data,
    bobject = _useMinimizableModal.bobject,
    onSave = _useMinimizableModal.onSave,
    onClose = _useMinimizableModal.onClose;
  var isEditionModal = !!bobject;
  var _useState = useState(false),
    _useState2 = _slicedToArray$3(_useState, 2),
    changeTimezoneModalVisible = _useState2[0],
    setChangeTimezoneModalVisible = _useState2[1];
  var plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true
  });
  var ref = useRef();
  var users = useUserSearch();
  var _useMediaQuery = useMediaQuery(),
    isDesktop = _useMediaQuery.isDesktop,
    isSmallDesktop = _useMediaQuery.isSmallDesktop,
    isMediumDesktop = _useMediaQuery.isMediumDesktop;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'meetingModal'
    }),
    t = _useTranslation.t;
  var _useCalendar = useCalendar(),
    setEventTypesSelected = _useCalendar.setEventTypesSelected,
    eventsTypeSelected = _useCalendar.eventsTypeSelected,
    invitees = _useCalendar.invitees,
    setInvitees = _useCalendar.setInvitees,
    setDate = _useCalendar.setDate,
    date = _useCalendar.date,
    resetDate = _useCalendar.resetDate,
    calendarsAvailable = _useCalendar.calendarsAvailable,
    mutateCalendars = _useCalendar.mutateCalendars,
    selectedTimezone = _useCalendar.selectedTimezone,
    setSelectedTimezone = _useCalendar.setSelectedTimezone,
    eventsPerDay = _useCalendar.eventsPerDay,
    skipCalendarCreation = _useCalendar.skipCalendarCreation,
    loading = _useCalendar.loading,
    setSkipCalendarCreation = _useCalendar.setSkipCalendarCreation,
    resetInvitees = _useCalendar.resetInvitees,
    setBannedEvent = _useCalendar.setBannedEvent,
    meetingDuration = _useCalendar.meetingDuration;
  var parsedFormData = _objectSpread$2(_objectSpread$2({
    title: formData && formData[ACTIVITY_FIELDS_LOGIC_ROLE.TITLE] ? formData[ACTIVITY_FIELDS_LOGIC_ROLE.TITLE] : null,
    dateTime: formData && formData[ACTIVITY_FIELDS_LOGIC_ROLE.TIME] ? new Date(formData[ACTIVITY_FIELDS_LOGIC_ROLE.TIME]) : null,
    duration: formData && formData[ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION] ? formData[ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION] : meetingDuration || 60,
    calendarNotes: formData && formData[ACTIVITY_FIELDS_LOGIC_ROLE.CALENDAR_NOTE] ? deserialize(formData[ACTIVITY_FIELDS_LOGIC_ROLE.CALENDAR_NOTE], {
      format: 'HTML',
      plugins: plugins
    }) : null,
    internalNotes: formData && formData[ACTIVITY_FIELDS_LOGIC_ROLE.NOTE] ? deserialize(formData[ACTIVITY_FIELDS_LOGIC_ROLE.NOTE], {
      format: 'HTML',
      plugins: plugins
    }) : null
  }, formData), {}, {
    // @ts-ignore
    company: (formData === null || formData === void 0 ? void 0 : (_formData$company = formData.company) === null || _formData$company === void 0 ? void 0 : _formData$company.data) || (formData === null || formData === void 0 ? void 0 : formData.company),
    // @ts-ignore
    lead: (formData === null || formData === void 0 ? void 0 : (_formData$lead = formData.lead) === null || _formData$lead === void 0 ? void 0 : _formData$lead.data) || (formData === null || formData === void 0 ? void 0 : formData.lead),
    // @ts-ignore
    opportunity: (formData === null || formData === void 0 ? void 0 : (_formData$opportunity = formData.opportunity) === null || _formData$opportunity === void 0 ? void 0 : _formData$opportunity.data) || (formData === null || formData === void 0 ? void 0 : formData.opportunity)
  });
  var activityTypes = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findValuesByFieldLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.TYPE);
  var methods = useForm({
    defaultValues: _objectSpread$2({}, parsedFormData)
  });
  var watch = methods.watch,
    control = methods.control,
    getValues = methods.getValues,
    formState = methods.formState,
    handleSubmit = methods.handleSubmit;
  // @ts-ignore
  useController({
    control: control,
    name: ACTIVITY_FIELDS_LOGIC_ROLE.USER,
    defaultValue: userId
  });
  useController({
    control: control,
    // @ts-ignore
    name: ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
    defaultValue: activityTypes === null || activityTypes === void 0 ? void 0 : (_activityTypes$find = activityTypes.find(function (activityType) {
      return (activityType === null || activityType === void 0 ? void 0 : activityType.logicRole) === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING;
    })) === null || _activityTypes$find === void 0 ? void 0 : _activityTypes$find.id
  });
  var openCalendarPopupAfterMeeting = settings === null || settings === void 0 ? void 0 : (_settings$settings = settings.settings) === null || _settings$settings === void 0 ? void 0 : _settings$settings.openCalendarPopupAfterMeeting;
  var calendarEventDecision = settings === null || settings === void 0 ? void 0 : (_settings$settings2 = settings.settings) === null || _settings$settings2 === void 0 ? void 0 : _settings$settings2.calendarEventDecision;
  var createAlwaysOnLinkedCalendar = calendarEventDecision === 'IMPERATIVE' && openCalendarPopupAfterMeeting;
  var createInCalendarCheckboxDisabled = calendarEventDecision === 'IMPERATIVE' || !openCalendarPopupAfterMeeting;
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$3(_useState3, 2),
    isSubmitting = _useState4[0],
    setIsSubmitting = _useState4[1];
  var isValid = formState.isValid,
    submitCount = formState.submitCount;
  var canSave = submitCount === 0 || isValid;
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var lead = watch('lead');
  var company = watch('company');
  useEffect(function () {
    if (formData[ACTIVITY_FIELDS_LOGIC_ROLE.UNIQUE_NYLAS_ID]) {
      setBannedEvent(formData[ACTIVITY_FIELDS_LOGIC_ROLE.UNIQUE_NYLAS_ID]);
    }
    if (createAlwaysOnLinkedCalendar) setSkipCalendarCreation(false);
  }, []);
  // @ts-ignore
  var user = watch(ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  var activityUser = users === null || users === void 0 ? void 0 : (_users$users = users.users) === null || _users$users === void 0 ? void 0 : _users$users.find(function (u) {
    return user === (u === null || u === void 0 ? void 0 : u.id);
  });
  function handleClose() {
    resetInvitees();
    resetDate();
    closeModal();
  }
  var inviteesNotSynced = isEditionModal && !getValueFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_INVITEES);
  useEffect(function () {
    if (formData[ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_INVITEES]) {
      setInvitees(JSON.parse(formData[ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_INVITEES]));
    } else {
      var newInvitees = [];
      if (!!settings && !!connections) {
        var _connections$list$, _settings$user;
        var defaultConnection = connections.defaultConnection || ((_connections$list$ = connections.list[0]) === null || _connections$list$ === void 0 ? void 0 : _connections$list$.email);
        newInvitees.push({
          type: 'Organizer',
          email: activityUser ? activityUser === null || activityUser === void 0 ? void 0 : activityUser.email : defaultConnection,
          name: activityUser ? activityUser === null || activityUser === void 0 ? void 0 : activityUser.name : "".concat(settings === null || settings === void 0 ? void 0 : (_settings$user = settings.user) === null || _settings$user === void 0 ? void 0 : _settings$user.name, " (").concat(t('bloobirdsCalendarSelector.you'), ")")
        });
      }
      if (lead) {
        var leadEmail = (lead === null || lead === void 0 ? void 0 : lead.email) || getValueFromLogicRole(lead, 'LEAD__EMAIL');
        var leadName = (lead === null || lead === void 0 ? void 0 : lead.fullName) || getValueFromLogicRole(lead, 'LEAD__NAME');
        if (leadEmail) {
          newInvitees.push({
            type: 'Lead',
            email: leadEmail,
            name: leadName
          });
        }
      }
      if (company) {
        var companyEmail = getEmailFromCompany(company);
        var companyName = (company === null || company === void 0 ? void 0 : company.name) || getValueFromLogicRole(company, 'COMPANY__NAME');
        if (companyEmail) {
          newInvitees.push({
            type: 'Company',
            email: companyEmail.value,
            name: companyName
          });
        }
      }
      if ((invitees === null || invitees === void 0 ? void 0 : invitees.length) === 0) {
        setInvitees(newInvitees);
      }
    }
  }, []);
  var removeInvitee = function removeInvitee(email) {
    setInvitees(function (currInvitees) {
      return currInvitees === null || currInvitees === void 0 ? void 0 : currInvitees.filter(function (invitee) {
        return (invitee === null || invitee === void 0 ? void 0 : invitee.email) !== email;
      });
    });
  };
  var onSubmit = function onSubmit(values) {
    setIsSubmitting(true);
    var company = values.company,
      lead = values.lead,
      opportunity = values.opportunity,
      duration = values.duration,
      dateTime = values.dateTime,
      title = values.title,
      calendarNotes = values.calendarNotes,
      internalNotes = values.internalNotes,
      reminderTemplate = values.reminderTemplate,
      reminderBefore = values.reminderBefore,
      reminderBeforeType = values.reminderBeforeType,
      conferencingGoogleMeet = values.conferencingGoogleMeet,
      rest = _objectWithoutProperties(values, _excluded);
    var serializeNoteText = serialize(calendarNotes, {
      format: 'AST',
      plugins: plugins
    });
    var serializeInternalNoteText = serialize(internalNotes, {
      format: 'AST',
      plugins: plugins
    });
    if (isEditionModal) {
      var _bobject$id, _company$id, _lead$id;
      api.patch("/bobjects/".concat(bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.value, "/raw"), _objectSpread$2(_objectSpread$2({}, stringifyArrays(rest)), {}, _defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2({}, ACTIVITY_FIELDS_LOGIC_ROLE.TIME, dateTime), ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION, duration), ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY, company === null || company === void 0 ? void 0 : (_company$id = company.id) === null || _company$id === void 0 ? void 0 : _company$id.value), ACTIVITY_FIELDS_LOGIC_ROLE.LEAD, lead === null || lead === void 0 ? void 0 : (_lead$id = lead.id) === null || _lead$id === void 0 ? void 0 : _lead$id.value), ACTIVITY_FIELDS_LOGIC_ROLE.TITLE, title), ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_INVITEES, JSON.stringify(invitees)), ACTIVITY_FIELDS_LOGIC_ROLE.CALENDAR_NOTE, serializeNoteText), ACTIVITY_FIELDS_LOGIC_ROLE.NOTE, serializeInternalNoteText))).then(function () {
        createToast({
          type: 'success',
          message: t('toasts.updateSuccess')
        });
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_UPDATE_FROM_CALENDAR_MODAL);
        handleClose();
        setIsSubmitting(false);
        onSave === null || onSave === void 0 ? void 0 : onSave();
      })["catch"](function () {
        createToast({
          type: 'error',
          message: t('toasts.somethingHappenedWhileUpdating')
        });
        setIsSubmitting(false);
        onSave === null || onSave === void 0 ? void 0 : onSave();
      });
    } else {
      var _company$id2, _lead$id2, _formData$opportunity2, _formData$opportunity3, _formData$opportunity4, _formData$opportunity5, _formData$opportunity6, _opportunity$id, _calendarsAvailable$d, _calendarsAvailable$d2, _calendarsAvailable$d3, _calendarsAvailable$d4, _connections$list;
      var reminderBeforeMuliplicator = reminderBeforeType === RemindeBeforeType.days ? 1440 : reminderBeforeType === RemindeBeforeType.hours ? 60 : 1;
      var data = {
        title: title,
        meetingDateTime: dateTime,
        meetingDuration: duration,
        company: company === null || company === void 0 ? void 0 : (_company$id2 = company.id) === null || _company$id2 === void 0 ? void 0 : _company$id2.value,
        lead: lead === null || lead === void 0 ? void 0 : (_lead$id2 = lead.id) === null || _lead$id2 === void 0 ? void 0 : _lead$id2.value,
        opportunity: (formData === null || formData === void 0 ? void 0 : (_formData$opportunity2 = formData.opportunity) === null || _formData$opportunity2 === void 0 ? void 0 : (_formData$opportunity3 = _formData$opportunity2.data) === null || _formData$opportunity3 === void 0 ? void 0 : (_formData$opportunity4 = _formData$opportunity3.id) === null || _formData$opportunity4 === void 0 ? void 0 : _formData$opportunity4.value) || (formData === null || formData === void 0 ? void 0 : (_formData$opportunity5 = formData.opportunity) === null || _formData$opportunity5 === void 0 ? void 0 : (_formData$opportunity6 = _formData$opportunity5.id) === null || _formData$opportunity6 === void 0 ? void 0 : _formData$opportunity6.value) || (opportunity === null || opportunity === void 0 ? void 0 : (_opportunity$id = opportunity.id) === null || _opportunity$id === void 0 ? void 0 : _opportunity$id.value),
        calendarId: calendarsAvailable === null || calendarsAvailable === void 0 ? void 0 : (_calendarsAvailable$d = calendarsAvailable.data) === null || _calendarsAvailable$d === void 0 ? void 0 : (_calendarsAvailable$d2 = _calendarsAvailable$d.find(function (c) {
          return c.primary;
        })) === null || _calendarsAvailable$d2 === void 0 ? void 0 : _calendarsAvailable$d2.id,
        accountId: calendarsAvailable === null || calendarsAvailable === void 0 ? void 0 : (_calendarsAvailable$d3 = calendarsAvailable.data) === null || _calendarsAvailable$d3 === void 0 ? void 0 : (_calendarsAvailable$d4 = _calendarsAvailable$d3.find(function (c) {
          return c.primary;
        })) === null || _calendarsAvailable$d4 === void 0 ? void 0 : _calendarsAvailable$d4.accountId,
        invitees: invitees.map(function (i) {
          return i.email;
        }),
        inviteesDetails: invitees,
        otherFields: stringifyArrays(rest),
        reminderTemplateId: reminderTemplate,
        conferencingGoogleMeet: conferencingGoogleMeet,
        reminderTimeInMinutes: reminderBefore * reminderBeforeMuliplicator,
        skipCalendarEventCreation: (connections === null || connections === void 0 ? void 0 : (_connections$list = connections.list) === null || _connections$list === void 0 ? void 0 : _connections$list.length) === 0 || !calendarsAvailable || skipCalendarCreation || !openCalendarPopupAfterMeeting,
        calendarNotes: serializeNoteText,
        internalNotes: serializeInternalNoteText
      };
      api.post('/messaging/calendar/event', data).then(function () {
        createToast({
          type: 'success',
          message: t('toasts.success')
        });
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CREATE_FROM_CALENDAR_MODAL);
        handleClose();
        setIsSubmitting(false);
        onSave === null || onSave === void 0 ? void 0 : onSave();
      })["catch"](function () {
        createToast({
          type: 'error',
          message: t('toasts.somethingHappenedWhileCreating')
        });
        setIsSubmitting(false);
        onSave === null || onSave === void 0 ? void 0 : onSave();
      });
    }
  };
  var isoDate = spacetime(date).format('iso-short');
  var modalWidth = isDesktop ? 1400 : isMediumDesktop ? 1100 : isSmallDesktop ? 1000 : 700;
  var leadProspectingStageId = dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$findFieldB = dataModel.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.STAGE)) === null || _dataModel$findFieldB === void 0 ? void 0 : (_dataModel$findFieldB2 = _dataModel$findFieldB.values.find(function (stage) {
    return stage.name === 'Prospecting';
  })) === null || _dataModel$findFieldB2 === void 0 ? void 0 : _dataModel$findFieldB2.id;
  var isLeadProspectingStage = !(formData !== null && formData !== void 0 && (_formData$lead2 = formData.lead) !== null && _formData$lead2 !== void 0 && _formData$lead2.stage) || (formData === null || formData === void 0 ? void 0 : (_formData$lead3 = formData.lead) === null || _formData$lead3 === void 0 ? void 0 : _formData$lead3.stage) === LEAD_STAGE_LOGIC_ROLE.PROSPECT || (formData === null || formData === void 0 ? void 0 : formData.lead.stage) === leadProspectingStageId;
  var companyProspectingStageId = dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$findFieldB3 = dataModel.findFieldByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.STAGE)) === null || _dataModel$findFieldB3 === void 0 ? void 0 : (_dataModel$findFieldB4 = _dataModel$findFieldB3.values.find(function (stage) {
    return stage.name === 'Prospecting';
  })) === null || _dataModel$findFieldB4 === void 0 ? void 0 : _dataModel$findFieldB4.id;
  var isProspectingStage = isLeadProspectingStage || !(formData !== null && formData !== void 0 && (_formData$company2 = formData.company) !== null && _formData$company2 !== void 0 && _formData$company2.stage) || (formData === null || formData === void 0 ? void 0 : (_formData$company3 = formData.company) === null || _formData$company3 === void 0 ? void 0 : _formData$company3.stage) === COMPANY_STAGE_LOGIC_ROLE.PROSPECT || (formData === null || formData === void 0 ? void 0 : (_formData$company4 = formData.company) === null || _formData$company4 === void 0 ? void 0 : _formData$company4.stage) === companyProspectingStageId;
  var _useConfirmDeleteModa = useConfirmDeleteModal(),
    openDeleteModal = _useConfirmDeleteModa.openDeleteModal;
  var handleDelete = function handleDelete() {
    openDeleteModal(bobject, false, function () {}, function () {
      createToast({
        message: t('toasts.deleteSuccess'),
        type: 'success'
      });
      handleClose();
      onSave === null || onSave === void 0 ? void 0 : onSave();
      onClose === null || onClose === void 0 ? void 0 : onClose();
    });
  };
  useEffect(function () {
    removeScrollOfBox();
    return recoverScrollOfBox;
  }, []);
  var _useController = useController({
      control: control,
      name: 'calendarNotes'
    }),
    notesField = _useController.field;
  var _useController2 = useController({
      control: control,
      name: 'internalNotes'
    }),
    internalNotesField = _useController2.field;
  var activityAccountExecutiveField = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE);
  var accountExecutivePicklistValues = activityAccountExecutiveField === null || activityAccountExecutiveField === void 0 ? void 0 : activityAccountExecutiveField.values;
  var activityAssignedToField = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO);
  var activityAssignedToValues = activityAssignedToField === null || activityAssignedToField === void 0 ? void 0 : activityAssignedToField.values;
  var isOTOAccount = useIsOTOAccount();
  var isFullSalesEnabled = useFullSalesEnabled(accountId);
  var _useController3 = useController({
      control: control,
      // @ts-ignore
      name: ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO,
      defaultValue: '',
      rules: {
        required: (activityAssignedToField === null || activityAssignedToField === void 0 ? void 0 : activityAssignedToField.required) && isFullSalesEnabled
      }
    }),
    _useController3$field = _useController3.field,
    assignedToValue = _useController3$field.value,
    activityAssignedToOnChange = _useController3$field.onChange;
  var errorAssignedTo = (formState === null || formState === void 0 ? void 0 : formState.errors) && (formState === null || formState === void 0 ? void 0 : formState.errors[ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO]) && t('thisFieldIsRequired');
  var _useController4 = useController({
      control: control,
      // @ts-ignore
      name: ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE,
      rules: {
        required: (activityAccountExecutiveField === null || activityAccountExecutiveField === void 0 ? void 0 : activityAccountExecutiveField.required) && !isFullSalesEnabled
      }
    }),
    _useController4$field = _useController4.field,
    accountExecutive = _useController4$field.value,
    accountExecutiveOnChange = _useController4$field.onChange;
  var errorAe = (formState === null || formState === void 0 ? void 0 : formState.errors) && (formState === null || formState === void 0 ? void 0 : formState.errors[ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE]) && t('thisFieldIsRequired');
  return /*#__PURE__*/jsx(Modal, {
    open: true,
    onClose: handleClose,
    width: modalWidth,
    className: styles$a.modal__container,
    children: /*#__PURE__*/jsxs(FormProvider, _objectSpread$2(_objectSpread$2({}, methods), {}, {
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$a._header__container,
        children: [/*#__PURE__*/jsxs("div", {
          className: styles$a._header__date_picker,
          children: [/*#__PURE__*/jsx(Text, {
            size: "l",
            weight: "regular",
            children: useGetI18nSpacetime(date, getUserTimeZone()).format('{month} {year}')
          }), /*#__PURE__*/jsx(IconButton, {
            name: "chevronLeft",
            onClick: function onClick() {
              return setDate(function (date) {
                return spacetime(date).subtract(1, 'week').toNativeDate();
              });
            },
            size: 16
          }), /*#__PURE__*/jsx(IconButton, {
            name: "chevronRight",
            onClick: function onClick() {
              return setDate(function (date) {
                return spacetime(date).add(1, 'week').toNativeDate();
              });
            },
            size: 16
          }), /*#__PURE__*/jsx(Button, {
            variant: "secondary",
            size: "small",
            onClick: function onClick() {
              return setDate(new Date());
            },
            children: t('today')
          })]
        }), /*#__PURE__*/jsx("div", {
          className: styles$a._header__spacer
        }), /*#__PURE__*/jsxs("div", {
          className: styles$a._header_right_actions,
          children: [loading && /*#__PURE__*/jsx(Spinner, {
            name: "loadingCircle",
            size: 16
          }), /*#__PURE__*/jsxs(Text, {
            size: "xs",
            color: "softPeanut",
            children: [t('timezone'), ": ", selectedTimezone, ' ', /*#__PURE__*/jsx("span", {
              className: styles$a._timezone_selector,
              onClick: function onClick() {
                return setChangeTimezoneModalVisible(true);
              },
              children: t('change')
            })]
          }), changeTimezoneModalVisible && /*#__PURE__*/jsx(ChangeTimezoneModal, {
            onChange: function onChange(value) {
              setSelectedTimezone(value);
              setChangeTimezoneModalVisible(false);
            },
            onClose: function onClose() {
              return setChangeTimezoneModalVisible(false);
            },
            defaultTimezone: selectedTimezone
          }), /*#__PURE__*/jsxs("div", {
            className: styles$a._event_type_selector,
            children: [/*#__PURE__*/jsx("div", {
              className: styles$a._event_type,
              style: {
                backgroundColor: eventsTypeSelected === 'bloobirds' ? 'var(--bloobirds)' : 'var(--white)',
                borderTopLeftRadius: '4px',
                borderBottomLeftRadius: '4px'
              },
              onClick: function onClick() {
                return setEventTypesSelected('bloobirds');
              },
              children: /*#__PURE__*/jsx(Text, {
                size: "xs",
                color: eventsTypeSelected === 'bloobirds' ? 'white' : 'bloobirds',
                children: "Bloobirds"
              })
            }), /*#__PURE__*/jsxs("div", {
              className: styles$a._event_type,
              style: {
                backgroundColor: eventsTypeSelected === 'nylas' ? 'var(--bloobirds)' : 'var(--white)',
                borderTopRightRadius: '4px',
                borderBottomRightRadius: '4px'
              },
              onClick: function onClick() {
                return setEventTypesSelected('nylas');
              },
              children: [/*#__PURE__*/jsx(Icon, {
                name: "calendar",
                size: 12,
                color: eventsTypeSelected === 'nylas' ? 'white' : 'bloobirds'
              }), /*#__PURE__*/jsx(Text, {
                size: "xs",
                color: eventsTypeSelected === 'nylas' ? 'white' : 'bloobirds',
                children: t('calendarName')
              })]
            })]
          }), /*#__PURE__*/jsx("div", {
            className: styles$a._calendar_select,
            children: eventsTypeSelected === 'nylas' ? /*#__PURE__*/jsx(CalendarsSelector, {
              connections: connections,
              disabled: eventsTypeSelected === 'nylas' && (connections === null || connections === void 0 ? void 0 : (_connections$list2 = connections.list) === null || _connections$list2 === void 0 ? void 0 : _connections$list2.length) === 0
            }) : /*#__PURE__*/jsx(BloobirdsCalendarsSelector, {})
          }), /*#__PURE__*/jsx(IconButton, {
            name: "minus",
            size: 24,
            onClick: function onClick() {
              var _getValues;
              return (
                // @ts-ignore
                minimize({
                  data: getValues(),
                  title: ((_getValues = getValues()) === null || _getValues === void 0 ? void 0 : _getValues.title) || t('untitledEvent'),
                  bobject: bobject
                })
              );
            }
          }), /*#__PURE__*/jsx(IconButton, {
            name: "cross",
            size: 24,
            onClick: handleClose
          })]
        })]
      }), /*#__PURE__*/jsxs("div", {
        className: styles$a._body,
        children: [/*#__PURE__*/jsxs("div", {
          className: styles$a._form_column,
          ref: ref,
          children: [/*#__PURE__*/jsx(MainInfoForm, {
            prospectingStage: isProspectingStage,
            accountId: accountId,
            isEditionModal: isEditionModal
          }), /*#__PURE__*/jsx("div", {
            className: styles$a._row_header,
            children: /*#__PURE__*/jsx(Text, {
              size: "m",
              children: t('guests')
            })
          }), /*#__PURE__*/jsx("div", {
            children: !isOTOAccount && (isFullSalesEnabled ? /*#__PURE__*/jsx(Select, {
              value: assignedToValue,
              placeholder: "".concat((activityAssignedToField === null || activityAssignedToField === void 0 ? void 0 : activityAssignedToField.name) || t('meetingAssignedTo'), " ").concat(activityAssignedToField !== null && activityAssignedToField !== void 0 && activityAssignedToField.required ? '*' : ''),
              width: "100%",
              size: "labeled"
              // @ts-ignore
              ,

              portal: false,
              borderless: false,
              onChange: function onChange(v) {
                activityAssignedToOnChange(v);
              },
              error: errorAssignedTo,
              autocomplete: (activityAssignedToValues === null || activityAssignedToValues === void 0 ? void 0 : (_activityAssignedToVa = activityAssignedToValues.filter(function (ae) {
                return ae === null || ae === void 0 ? void 0 : ae.isEnabled;
              })) === null || _activityAssignedToVa === void 0 ? void 0 : _activityAssignedToVa.length) > 7,
              children: activityAssignedToValues === null || activityAssignedToValues === void 0 ? void 0 : activityAssignedToValues.filter(function (ae) {
                return ae === null || ae === void 0 ? void 0 : ae.isEnabled;
              }).map(function (ae) {
                return /*#__PURE__*/jsx(Item, {
                  value: ae === null || ae === void 0 ? void 0 : ae.id,
                  label: ae.name,
                  onClick: function onClick(v) {
                    var _users$users2;
                    var user = users === null || users === void 0 ? void 0 : (_users$users2 = users.users) === null || _users$users2 === void 0 ? void 0 : _users$users2.find(function (user) {
                      return (user === null || user === void 0 ? void 0 : user.id) === v;
                    });
                    if (!(invitees !== null && invitees !== void 0 && invitees.find(function (invitee) {
                      return (invitee === null || invitee === void 0 ? void 0 : invitee.email) === (user === null || user === void 0 ? void 0 : user.email);
                    }))) {
                      setInvitees(function (curr) {
                        return [].concat(_toConsumableArray(curr), [{
                          type: 'AE',
                          email: user === null || user === void 0 ? void 0 : user.email
                        }]);
                      });
                    }
                  },
                  children: ae.name
                }, ae.id);
              })
            }) : /*#__PURE__*/jsx(Select, {
              width: "100%",
              value: accountExecutive,
              placeholder: "".concat(t('accountExecutive'), " ").concat(activityAccountExecutiveField !== null && activityAccountExecutiveField !== void 0 && activityAccountExecutiveField.required ? '*' : ''),
              size: "labeled",
              borderless: false
              // @ts-ignore
              ,

              portal: false,
              onChange: function onChange(v) {
                accountExecutiveOnChange(v);
              },
              error: errorAe,
              autocomplete: (accountExecutivePicklistValues === null || accountExecutivePicklistValues === void 0 ? void 0 : (_accountExecutivePick = accountExecutivePicklistValues.filter(function (ae) {
                return ae === null || ae === void 0 ? void 0 : ae.isEnabled;
              })) === null || _accountExecutivePick === void 0 ? void 0 : _accountExecutivePick.length) > 7,
              children: accountExecutivePicklistValues === null || accountExecutivePicklistValues === void 0 ? void 0 : accountExecutivePicklistValues.filter(function (ae) {
                return ae === null || ae === void 0 ? void 0 : ae.isEnabled;
              }).map(function (ae) {
                return /*#__PURE__*/jsx(Item, {
                  value: ae === null || ae === void 0 ? void 0 : ae.id,
                  label: ae === null || ae === void 0 ? void 0 : ae.name,
                  onClick: function onClick(v) {
                    var ae = accountExecutivePicklistValues === null || accountExecutivePicklistValues === void 0 ? void 0 : accountExecutivePicklistValues.find(function (ae) {
                      return (ae === null || ae === void 0 ? void 0 : ae.id) === v;
                    });
                    if (!(invitees !== null && invitees !== void 0 && invitees.find(function (invitee) {
                      return (invitee === null || invitee === void 0 ? void 0 : invitee.email) === (ae === null || ae === void 0 ? void 0 : ae.name);
                    }))) {
                      setInvitees(function (curr) {
                        return [].concat(_toConsumableArray(curr), [{
                          type: 'AE',
                          email: ae === null || ae === void 0 ? void 0 : ae.name
                        }]);
                      });
                    }
                  },
                  children: ae === null || ae === void 0 ? void 0 : ae.name
                }, ae.id);
              })
            }))
          }), inviteesNotSynced && /*#__PURE__*/jsx("div", {
            className: styles$a.inviteesNotSynced,
            children: /*#__PURE__*/jsx(Text, {
              size: "s",
              color: "peanut",
              children: t('inviteesNotSynced')
            })
          }), !inviteesNotSynced && /*#__PURE__*/jsx("div", {
            className: styles$a.searchLeads,
            children: /*#__PURE__*/jsx(SearchLeadsGuests, {
              size: 16,
              handleSelect: function handleSelect(leadSelected) {
                var _leadSelected$id;
                var isLead = typeof leadSelected !== 'string' && typeof (leadSelected === null || leadSelected === void 0 ? void 0 : leadSelected.id) !== 'string' && (leadSelected === null || leadSelected === void 0 ? void 0 : (_leadSelected$id = leadSelected.id) === null || _leadSelected$id === void 0 ? void 0 : _leadSelected$id.value);
                var isCoworker = typeof leadSelected !== 'string' && 'type' in leadSelected && leadSelected.type === 'Coworker';
                if (isLead) {
                  var leadEmail = getValueFromLogicRole(leadSelected, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
                  var leadName = getValueFromLogicRole(leadSelected, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
                  if (!(invitees !== null && invitees !== void 0 && invitees.find(function (invitee) {
                    return (invitee === null || invitee === void 0 ? void 0 : invitee.email) === leadEmail;
                  }))) {
                    // @ts-ignore
                    setInvitees(function (curr) {
                      var _leadSelected$id2;
                      return [].concat(_toConsumableArray(curr), [{
                        type: 'Lead',
                        email: leadEmail,
                        name: leadName,
                        leadId: typeof (leadSelected === null || leadSelected === void 0 ? void 0 : leadSelected.id) === 'string' ? null : leadSelected === null || leadSelected === void 0 ? void 0 : (_leadSelected$id2 = leadSelected.id) === null || _leadSelected$id2 === void 0 ? void 0 : _leadSelected$id2.value
                      }]);
                    });
                  }
                } else if (isCoworker) {
                  if (!(invitees !== null && invitees !== void 0 && invitees.find(function (invitee) {
                    return (invitee === null || invitee === void 0 ? void 0 : invitee.email) === leadSelected.email;
                  }))) {
                    // @ts-ignore
                    setInvitees(function (curr) {
                      return [].concat(_toConsumableArray(curr), [leadSelected]);
                    });
                  }
                } else {
                  if (!(invitees !== null && invitees !== void 0 && invitees.find(function (invitee) {
                    return (invitee === null || invitee === void 0 ? void 0 : invitee.email) === leadSelected;
                  }))) {
                    // @ts-ignore
                    setInvitees(function (curr) {
                      return [].concat(_toConsumableArray(curr), [{
                        type: null,
                        email: leadSelected,
                        name: null,
                        leadId: null
                      }]);
                    });
                  }
                }
              },
              company: company,
              inviteesEmails: invitees === null || invitees === void 0 ? void 0 : invitees.map(function (i) {
                return i.email;
              })
            })
          }), /*#__PURE__*/jsx("div", {
            className: styles$a.inviteesList,
            children: invitees === null || invitees === void 0 ? void 0 : invitees.map(function (i) {
              return /*#__PURE__*/jsx(InviteeCard, {
                invitee: i,
                handleRemoveInvitee: removeInvitee,
                readOnly: false,
                shouldShowStatus: isEditionModal
              }, i.email);
            })
          }), /*#__PURE__*/jsx(NotesForm, {
            notesField: notesField,
            title: t('noteCalendar.title'),
            placeholder: t('noteCalendar.placeholder')
          }), /*#__PURE__*/jsx(NotesForm, {
            notesField: internalNotesField,
            title: t('noteInternal.title'),
            placeholder: t('noteInternal.placeholder')
          }), /*#__PURE__*/jsx(ActivityDetailsForm, {
            isEditionModal: isEditionModal,
            formData: {
              company: company,
              lead: lead
            },
            accountId: accountId
          })]
        }), /*#__PURE__*/jsx(Calendar, {
          day: isoDate,
          mode: "week",
          events: eventsPerDay,
          notConnected: eventsTypeSelected === 'nylas' && (connections === null || connections === void 0 ? void 0 : (_connections$list3 = connections.list) === null || _connections$list3 === void 0 ? void 0 : _connections$list3.length) === 0,
          onCalendarReconnect: function onCalendarReconnect() {
            mutateConnections().then(function () {
              mutateCalendars();
            });
          },
          selectedTimezone: selectedTimezone
        })]
      }), /*#__PURE__*/jsxs(ModalFooter, {
        className: styles$a.footer,
        children: [/*#__PURE__*/jsxs("div", {
          children: [/*#__PURE__*/jsx(Button, {
            variant: "tertiary",
            onClick: handleClose,
            children: t('cancel')
          }), isEditionModal && /*#__PURE__*/jsx(Button, {
            variant: "tertiary",
            color: "tomato",
            onClick: handleDelete,
            children: t('delete')
          })]
        }), /*#__PURE__*/jsxs("div", {
          className: styles$a._footer_buttons_right,
          children: [(connections === null || connections === void 0 ? void 0 : (_connections$list4 = connections.list) === null || _connections$list4 === void 0 ? void 0 : _connections$list4.length) > 0 && !isEditionModal && /*#__PURE__*/jsx(Tooltip
          /* @ts-ignore */, {
            title: createInCalendarCheckboxDisabled && t('notAllowedTitle'),
            position: "top",
            children: /*#__PURE__*/jsx(Checkbox, {
              size: "small",
              checked: createAlwaysOnLinkedCalendar ? createAlwaysOnLinkedCalendar : !skipCalendarCreation,
              disabled: createInCalendarCheckboxDisabled,
              onClick: function onClick(v) {
                return setSkipCalendarCreation(!v);
              },
              children: t('createEventInCalendar')
            })
          }), /*#__PURE__*/jsx(Button, {
            disabled: isSubmitting || !canSave,
            variant: "primary",
            onClick: handleSubmit(onSubmit),
            children: isSubmitting ? /*#__PURE__*/jsx(Spinner, {
              size: 16,
              color: "bloobirds",
              name: "loadingCircle"
            }) : "".concat(isEditionModal ? t('save') : t('create'))
          })]
        })]
      })]
    }))
  });
}
_s24(ModalChild, "9PewTAOoB+AETnOYbpPITcC29cs=", false, function () {
  return [useMinimizableModal, useRichTextEditorPlugins, useUserSearch, useMediaQuery, useTranslation, useCalendar, useForm, useController, useController, useToasts, useConfirmDeleteModal, useController, useController, useIsOTOAccount, useFullSalesEnabled, useController, useController, useGetI18nSpacetime];
});
_c23 = ModalChild;
var MeetingModal = function MeetingModal(props) {
  var initialContext = {
    id: props === null || props === void 0 ? void 0 : props.id,
    accountId: props === null || props === void 0 ? void 0 : props.accountId,
    userId: props === null || props === void 0 ? void 0 : props.userId,
    settings: props === null || props === void 0 ? void 0 : props.settings,
    connections: props === null || props === void 0 ? void 0 : props.connections,
    mutateConnections: props === null || props === void 0 ? void 0 : props.mutateConnections,
    dataModel: props === null || props === void 0 ? void 0 : props.dataModel
  };
  return /*#__PURE__*/jsx(MeetingModalContext.Provider, {
    value: initialContext,
    children: /*#__PURE__*/jsx(ModalChild, {})
  });
};
_c24 = MeetingModal;
var DayCalendarContext = /*#__PURE__*/createContext({
  id: null,
  accountId: null,
  userId: null,
  settings: null,
  connections: null,
  mutateConnections: null
});
var css_248z = ".dayCalendar-module__container__uCSeO {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n  margin: auto;\n}\n\n.dayCalendar-module__filters_wrapper__MNNNf {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 8px;\n  justify-content: flex-start;\n  padding: 20px 24px 0 24px;\n}\n\n.dayCalendar-module__calendar_wrapper__INpN1 {\n  padding: 10px 24px;\n  height: 88%;\n}\n\n.dayCalendar-module__calendar_wrapper__INpN1 > div {\n  width: 100%;\n  height: 100%;\n  max-height: 56vh;\n}\n\n.dayCalendar-module__calendar_wrapper__INpN1 > div > div {\n  height: 100%;\n  max-height: 56vh;\n  gap: 8px;\n  padding-right: 6px;\n}\n\n.dayCalendar-module__calendar_wrapper__INpN1 > div > div:last-child > div > div > div:last-child > div {\n  border-right: none;\n}\n\n.dayCalendar-module__main_filters_container__7XNTu {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n}\n\n.dayCalendar-module__main_filters_container__7XNTu > div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.dayCalendar-module__left_main_filters__0nuHh > div {\n  margin-left: 3px;\n}\n\n.dayCalendar-module__day_button__B-LSX {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1px;\n}\n\n.dayCalendar-module__day_button__B-LSX:hover {\n  background-color: var(--veryLightBloobirds);\n}\n\n.dayCalendar-module__today_button__LtWtb {\n  margin-right: 4px;\n  font-size: 12px;\n  font-weight: 300;\n  padding: 3px 5px;\n}\n\n.dayCalendar-module__date_button__8SziT {\n  cursor: pointer;\n}\n\n.dayCalendar-module__event_type__KxUyw {\n  padding: 3px 8px;\n  border: 1px solid var(--bloobirds);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n}\n\n.dayCalendar-module__secondary_filters_container__GrVk6 {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n}\n\n.dayCalendar-module__secondary_filters_right__KIaYx {\n  display: flex;\n  align-items: center;\n  gap: 8px\n}\n\n.dayCalendar-module__calendar_select__z7RMy {\n  display: flex;\n  align-items: center;\n}\n\n.dayCalendar-module__selector_anchor__E93Z3 {\n  cursor: pointer;\n  display: flex;\n  gap: 2px;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.dayCalendar-module__tip_button__3081E {\n  border: 1px solid var(--lightPurple) !important;\n  color: var(--purple);\n}\n\n.dayCalendar-module__tip_button__3081E svg > path {\n  fill: var(--purple);\n}\n";
var styles = {
  "_container": "dayCalendar-module__container__uCSeO",
  "_filters_wrapper": "dayCalendar-module__filters_wrapper__MNNNf",
  "_calendar_wrapper": "dayCalendar-module__calendar_wrapper__INpN1",
  "_main_filters_container": "dayCalendar-module__main_filters_container__7XNTu",
  "_left_main_filters": "dayCalendar-module__left_main_filters__0nuHh",
  "_day_button": "dayCalendar-module__day_button__B-LSX",
  "_today_button": "dayCalendar-module__today_button__LtWtb",
  "_date_button": "dayCalendar-module__date_button__8SziT",
  "_event_type": "dayCalendar-module__event_type__KxUyw",
  "_secondary_filters_container": "dayCalendar-module__secondary_filters_container__GrVk6",
  "_secondary_filters_right": "dayCalendar-module__secondary_filters_right__KIaYx",
  "_calendar_select": "dayCalendar-module__calendar_select__z7RMy",
  "_selector_anchor": "dayCalendar-module__selector_anchor__E93Z3",
  "_tip_button": "dayCalendar-module__tip_button__3081E"
};
styleInject(css_248z);
function _slicedToArray$2(arr, i) {
  return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2();
}
function _nonIterableRest$2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$2(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
}
function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$2(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles$2(arr) {
  if (Array.isArray(arr)) return arr;
}
var DayCalendarChild = function DayCalendarChild() {
  _s25();
  var _connections$list, _connections$list2;
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
  var _useContext = useContext(DayCalendarContext),
    connections = _useContext.connections,
    mutateConnections = _useContext.mutateConnections;
  var _useState = useState(false),
    _useState2 = _slicedToArray$2(_useState, 2),
    changeTimezoneModalVisible = _useState2[0],
    setChangeTimezoneModalVisible = _useState2[1];
  var _useVisible = useVisible(false),
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible,
    ref = _useVisible.ref;
  var isoDate = spacetime(date).format('iso-short');
  var today = isToday(spacetime(date).toNativeDate(), selectedTimezone || getUserTimeZone());
  var notConnected = eventsTypeSelected === 'nylas' && (connections === null || connections === void 0 ? void 0 : (_connections$list = connections.list) === null || _connections$list === void 0 ? void 0 : _connections$list.length) === 0;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'dayCalendar'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs("div", {
    className: styles._container,
    children: [/*#__PURE__*/jsxs("div", {
      className: styles._filters_wrapper,
      children: [/*#__PURE__*/jsxs("div", {
        className: styles._main_filters_container,
        children: [/*#__PURE__*/jsxs("div", {
          className: styles._left_main_filters,
          children: [/*#__PURE__*/jsx(Button, {
            onClick: function onClick() {
              return setDate(function (date) {
                return spacetime(date).subtract(1, 'day').toNativeDate();
              });
            },
            variant: "clear",
            size: "small",
            className: styles._day_button,
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
            className: styles._day_button,
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
                className: styles._date_button,
                children: /*#__PURE__*/jsx(Text, {
                  size: "m",
                  color: today ? 'bloobirds' : 'peanut',
                  weight: "regular",
                  children: (today ? t('today') : '') + useGetI18nSpacetime(date).format('{month-short} {date-ordinal}, {day}')
                })
              })
            }
          })]
        }), /*#__PURE__*/jsxs("div", {
          children: [/*#__PURE__*/jsx(Button, {
            variant: "secondary",
            size: "small",
            uppercase: false,
            className: styles._today_button,
            onClick: function onClick() {
              return resetDate();
            },
            children: t('today')
          }), /*#__PURE__*/jsx("div", {
            className: styles._event_type,
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
            className: styles._event_type,
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
        className: styles._secondary_filters_container,
        children: [/*#__PURE__*/jsxs("div", {
          className: styles._secondary_filters_right,
          children: [/*#__PURE__*/jsx(IconButton, {
            name: "timezonesAlter",
            size: 18,
            color: "bloobirds",
            onClick: function onClick() {
              return setChangeTimezoneModalVisible(true);
            }
          }), /*#__PURE__*/jsx("div", {
            className: styles._calendar_select,
            children: eventsTypeSelected === 'nylas' ? /*#__PURE__*/jsx(CalendarsSelector, {
              connections: connections,
              disabled: eventsTypeSelected === 'nylas' && (connections === null || connections === void 0 ? void 0 : (_connections$list2 = connections.list) === null || _connections$list2 === void 0 ? void 0 : _connections$list2.length) === 0,
              anchor: CalendarSelectorAnchor
            }) : /*#__PURE__*/jsx(BloobirdsCalendarsSelector, {
              anchor: CalendarSelectorAnchor
            })
          }), loading && /*#__PURE__*/jsx(Spinner, {
            name: "loadingCircle",
            size: 16
          })]
        }), /*#__PURE__*/jsx(Button, {
          size: "small",
          color: "lightestPurple",
          variant: "primary",
          iconLeft: "suggestions",
          uppercase: false,
          className: styles._tip_button,
          onClick: function onClick() {
            mixpanel.track(MIXPANEL_EVENTS.CALENDAR_TIPS_SEE_CLICKED);
            window.open('https://support.bloobirds.com/hc/en-us/articles/8908326645020-Advantages-of-creating-meetings-on-Bloobirds-vs-Google-Calendar-or-Outlook', '_blank');
          },
          children: t('calendarTips')
        })]
      })]
    }), /*#__PURE__*/jsx("div", {
      className: styles._calendar_wrapper,
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
        day: isoDate,
        mode: "day",
        events: eventsPerDay,
        notConnected: notConnected,
        onCalendarReconnect: function onCalendarReconnect() {
          if (mutateConnections) {
            mutateConnections().then(function () {
              mutateCalendars();
            });
          }
        },
        selectedTimezone: selectedTimezone
      })
    }), changeTimezoneModalVisible && /*#__PURE__*/jsx(ChangeTimezoneModal, {
      onChange: function onChange(value) {
        setSelectedTimezone(value);
        setChangeTimezoneModalVisible(false);
      },
      onClose: function onClose() {
        return setChangeTimezoneModalVisible(false);
      },
      defaultTimezone: selectedTimezone
    })]
  });
};
_s25(DayCalendarChild, "0OA1H4QiyanHtQiDMDaxCnLZGu0=", false, function () {
  return [useCalendar, useVisible, useTranslation, useGetI18nSpacetime];
});
_c25 = DayCalendarChild;
var CalendarSelectorAnchor = function CalendarSelectorAnchor(visible, setVisible) {
  _s26();
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'dayCalendar'
    }),
    t = _useTranslation2.t;
  return /*#__PURE__*/jsxs("span", {
    className: styles._selector_anchor,
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
_s26(CalendarSelectorAnchor, "zKId3lXTN2GCFmE2xgLOny8j7l8=", false, function () {
  return [useTranslation];
});
_c26 = CalendarSelectorAnchor;
var DayCalendar = function DayCalendar(props) {
  var initialContext = {
    id: props === null || props === void 0 ? void 0 : props.id,
    accountId: props === null || props === void 0 ? void 0 : props.accountId,
    userId: props === null || props === void 0 ? void 0 : props.userId,
    settings: props === null || props === void 0 ? void 0 : props.settings,
    connections: props === null || props === void 0 ? void 0 : props.connections,
    mutateConnections: props === null || props === void 0 ? void 0 : props.mutateConnections
  };
  return /*#__PURE__*/jsx(DayCalendarContext.Provider, {
    value: initialContext,
    children: /*#__PURE__*/jsx(DayCalendarChild, {})
  });
};
_c27 = DayCalendar;
function _typeof$1(obj) {
  "@babel/helpers - typeof";

  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$1(obj);
}
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) {
      _defineProperty$1(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$1(arg) {
  var key = _toPrimitive$1(arg, "string");
  return _typeof$1(key) === "symbol" ? key : String(key);
}
function _toPrimitive$1(input, hint) {
  if (_typeof$1(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$1(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$1(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr)) return arr;
}
var MeetingResultField = function MeetingResultField(_ref) {
  _s27();
  var activity = _ref.activity,
    styles = _ref.styles,
    onUpdate = _ref.onUpdate;
  var meetingResultLR = ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT;
  var meetingResultField = getFieldByLogicRole(activity, meetingResultLR);
  var meetingResultValueLogicRole = meetingResultField === null || meetingResultField === void 0 ? void 0 : meetingResultField.valueLogicRole;
  var mainTypeLR = ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE;
  var mainTypeField = getFieldByLogicRole(activity, mainTypeLR);
  var _useVisible = useVisible(),
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible,
    ref = _useVisible.ref;
  var dataModel = useDataModel();
  var _useMeetingReportResu = useMeetingReportResult(dataModel, mainTypeField === null || mainTypeField === void 0 ? void 0 : mainTypeField.value),
    reportResult = _useMeetingReportResu.reportResult,
    meetingResults = _useMeetingReportResu.meetingResults;
  var _useState = useState(false),
    _useState2 = _slicedToArray$1(_useState, 2),
    isLoading = _useState2[0],
    setIsLoading = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray$1(_useState3, 2),
    result = _useState4[0],
    setResult = _useState4[1];
  var setMeetingResult = function setMeetingResult(value) {
    setVisible(false);
    setIsLoading(true);
    reportResult(activity, mainTypeField === null || mainTypeField === void 0 ? void 0 : mainTypeField.value, value).then(function () {
      mixpanel.track(MIXPANEL_EVENTS.CLICK_EDIT_MEETING_RESULT_FROM_TAB_OTO);
      setResult(meetingResults === null || meetingResults === void 0 ? void 0 : meetingResults.find(function (i) {
        return i.value === value;
      }));
      onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(function () {
        return setIsLoading(false);
      });
      window.dispatchEvent(new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
        detail: {
          type: BobjectTypes.Activity
        }
      }));
    });
  };
  if (!(mainTypeField !== null && mainTypeField !== void 0 && mainTypeField.text) || !meetingResults) {
    return null;
  }
  return /*#__PURE__*/jsx(Dropdown, {
    ref: ref,
    visible: visible,
    position: "top-start",
    arrow: false,
    anchor: /*#__PURE__*/jsx("div", {
      style: {
        cursor: 'pointer'
      },
      onClick: function onClick(e) {
        e.stopPropagation();
        e.preventDefault();
        setVisible(!visible);
      },
      children: /*#__PURE__*/jsx(Label, {
        overrideStyle: _objectSpread$1({
          minWidth: '80px',
          minHeight: '18px',
          display: 'flex',
          color: meetingResultValueLogicRole === 'ACTIVITY__MEETING_RESULT__CANCELLED' ? 'var(--tomato)' : 'var(--extraCall)',
          backgroundColor: meetingResultValueLogicRole === 'ACTIVITY__MEETING_RESULT__CANCELLED' ? 'var(--verySoftTomato)' : 'var(--verySoftMelon)',
          borderColor: meetingResultValueLogicRole === 'ACTIVITY__MEETING_RESULT__CANCELLED' ? 'var(--verySoftTomato)' : 'var(--verySoftMelon)'
        }, styles),
        uppercase: false,
        size: "small",
        onClick: function onClick() {
          setVisible(!visible);
        },
        children: isLoading ? /*#__PURE__*/jsx(Spinner, {
          color: "darkBloobirds",
          name: "dots",
          size: 10
        }) : (result === null || result === void 0 ? void 0 : result.name) || (meetingResultField === null || meetingResultField === void 0 ? void 0 : meetingResultField.text)
      })
    }),
    children: /*#__PURE__*/jsx("div", {
      style: {
        display: 'flex',
        padding: '0px 8px',
        gap: '8px',
        flexDirection: 'column'
      },
      children: meetingResults.map(function (_ref2) {
        var id = _ref2.id,
          name = _ref2.name;
        return /*#__PURE__*/jsx("div", {
          style: {
            cursor: 'pointer'
          },
          onClick: function onClick(e) {
            e.stopPropagation();
            e.preventDefault();
          },
          children: /*#__PURE__*/jsx(Label, {
            overrideStyle: {
              color: 'var(--peanut)'
            },
            uppercase: false,
            size: "small",
            selected: name === ((result === null || result === void 0 ? void 0 : result.name) || (meetingResultField === null || meetingResultField === void 0 ? void 0 : meetingResultField.text)),
            value: id,
            onClick: setMeetingResult,
            children: name
          }, id)
        }, id);
      })
    })
  });
};
_s27(MeetingResultField, "F8ZTnkC6Sw5v4XdDmjVF4cIKQ3E=", false, function () {
  return [useVisible, useDataModel, useMeetingReportResult];
});
_c28 = MeetingResultField;
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
var MeetingTypeField = function MeetingTypeField(_ref) {
  _s28();
  var activity = _ref.activity,
    styles = _ref.styles,
    onUpdate = _ref.onUpdate;
  var mainTypeLR = ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE;
  var mainTypeField = getFieldByLogicRole(activity, mainTypeLR);
  var _usePicklist = usePicklist(mainTypeField === null || mainTypeField === void 0 ? void 0 : mainTypeField.name),
    meetingTypes = _usePicklist.data;
  var types = meetingTypes === null || meetingTypes === void 0 ? void 0 : meetingTypes.filter(function (i) {
    return i.enabled;
  }).sort(function (a, b) {
    return a.ordering - b.ordering;
  });
  var _useVisible = useVisible(),
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible,
    ref = _useVisible.ref;
  var dataModel = useDataModel();
  var _useMeetingReportResu = useMeetingReportResult(dataModel, mainTypeField === null || mainTypeField === void 0 ? void 0 : mainTypeField.value),
    reportResult = _useMeetingReportResu.reportResult;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isLoading = _useState2[0],
    setIsLoading = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    type = _useState4[0],
    setType = _useState4[1];
  var setMeetingType = function setMeetingType(value) {
    setVisible(false);
    setIsLoading(true);
    reportResult(activity, value).then(function () {
      mixpanel.track(MIXPANEL_EVENTS.CLICK_EDIT_MEETING_TYPE_FROM_TAB_OTO);
      setType(types === null || types === void 0 ? void 0 : types.find(function (i) {
        return i.id === value;
      }));
      onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(function () {
        return setIsLoading(false);
      });
      window.dispatchEvent(new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
        detail: {
          type: BobjectTypes.Activity
        }
      }));
    });
  };
  if (!(mainTypeField !== null && mainTypeField !== void 0 && mainTypeField.value) || !types) {
    return null;
  }
  return /*#__PURE__*/jsx(Dropdown, {
    ref: ref,
    visible: visible,
    position: "top-start",
    arrow: false,
    anchor: /*#__PURE__*/jsx("div", {
      style: {
        cursor: 'pointer'
      },
      onClick: function onClick(e) {
        e.stopPropagation();
        e.preventDefault();
        setVisible(!visible);
      },
      children: /*#__PURE__*/jsx(Label, {
        overrideStyle: _objectSpread({
          minWidth: '80px',
          minHeight: '18px',
          display: 'flex',
          color: 'var(--peanut)'
        }, styles),
        uppercase: false,
        size: "small",
        children: isLoading ? /*#__PURE__*/jsx(Spinner, {
          color: "darkBloobirds",
          name: "dots",
          size: 10
        }) : (type === null || type === void 0 ? void 0 : type.value) || (mainTypeField === null || mainTypeField === void 0 ? void 0 : mainTypeField.text)
      })
    }),
    children: /*#__PURE__*/jsx("div", {
      style: {
        display: 'flex',
        padding: '0px 8px',
        gap: '8px',
        flexDirection: 'column'
      },
      children: types.map(function (_ref2) {
        var id = _ref2.id,
          value = _ref2.value;
        return /*#__PURE__*/jsx("div", {
          style: {
            cursor: 'pointer'
          },
          onClick: function onClick(e) {
            e.stopPropagation();
            e.preventDefault();
          },
          children: /*#__PURE__*/jsx(Label, {
            overrideStyle: {
              color: 'var(--peanut)'
            },
            uppercase: false,
            size: "small",
            selected: value === ((type === null || type === void 0 ? void 0 : type.value) || (mainTypeField === null || mainTypeField === void 0 ? void 0 : mainTypeField.text)),
            value: id,
            onClick: setMeetingType,
            children: value
          })
        }, id);
      })
    })
  });
};
_s28(MeetingTypeField, "ZguNQXM6LOhFDtHoSM+r/RhZpsg=", false, function () {
  return [usePicklist, useVisible, useDataModel, useMeetingReportResult];
});
_c29 = MeetingTypeField;
export { CopyText, DayCalendar, MeetingModal, MeetingResultField, MeetingTypeField };
var _c, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16, _c17, _c18, _c19, _c20, _c21, _c22, _c23, _c24, _c25, _c26, _c27, _c28, _c29;
$RefreshReg$(_c, "CopyText");
$RefreshReg$(_c2, "Field");
$RefreshReg$(_c3, "MeetingField");
$RefreshReg$(_c4, "ActivityDetailsForm");
$RefreshReg$(_c5, "BloobirdsCalendarsSelector");
$RefreshReg$(_c6, "GoogleSignIn");
$RefreshReg$(_c7, "MicrosoftSignIn");
$RefreshReg$(_c8, "CalendarNotConnected");
$RefreshReg$(_c9, "InviteeCard");
$RefreshReg$(_c10, "CalendarEvent$React.memo");
$RefreshReg$(_c11, "CalendarEvent");
$RefreshReg$(_c12, "CalendarColumn");
$RefreshReg$(_c13, "Calendar");
$RefreshReg$(_c14, "CalendarsSelector");
$RefreshReg$(_c15, "ConferencingForm");
$RefreshReg$(_c16, "ReminderForm");
$RefreshReg$(_c17, "MainInfoForm");
$RefreshReg$(_c18, "NotesForm");
$RefreshReg$(_c19, "NoContacts");
$RefreshReg$(_c20, "SearchLeadsGuests");
$RefreshReg$(_c21, "DropdownHeader");
$RefreshReg$(_c22, "GuestCard");
$RefreshReg$(_c23, "ModalChild");
$RefreshReg$(_c24, "MeetingModal");
$RefreshReg$(_c25, "DayCalendarChild");
$RefreshReg$(_c26, "CalendarSelectorAnchor");
$RefreshReg$(_c27, "DayCalendar");
$RefreshReg$(_c28, "MeetingResultField");
$RefreshReg$(_c29, "MeetingTypeField");
if (import.meta.hot) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;

  
function isReactRefreshBoundary(mod) {
  if (mod == null || typeof mod !== 'object') {
    return false;
  }
  let hasExports = false;
  let areAllExportsComponents = true;
  for (const exportName in mod) {
    hasExports = true;
    if (exportName === '__esModule') {
      continue;
    }
    const desc = Object.getOwnPropertyDescriptor(mod, exportName);
    if (desc && desc.get) {
      // Don't invoke getters as they may have side effects.
      return false;
    }
    const exportValue = mod[exportName];
    if (!RefreshRuntime.isLikelyComponentType(exportValue)) {
      areAllExportsComponents = false;
    }
  }
  return hasExports && areAllExportsComponents;
}

import.meta.hot.accept(mod => {
  if (isReactRefreshBoundary(mod)) {
    
  if (!window.__vite_plugin_react_timeout) {
    window.__vite_plugin_react_timeout = setTimeout(() => {
      window.__vite_plugin_react_timeout = 0;
      RefreshRuntime.performReactRefresh();
    }, 30);
  }

  } else {
    import.meta.hot.invalidate();
  }
});

}