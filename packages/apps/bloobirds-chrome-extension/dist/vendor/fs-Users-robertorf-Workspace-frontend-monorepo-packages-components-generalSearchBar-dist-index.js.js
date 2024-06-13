import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-generalSearchBar-dist-index.js.js");import RefreshRuntime from "/vendor/react-refresh.js";let prevRefreshReg;let prevRefreshSig;if (import.meta.hot) {  if (!window.__vite_plugin_react_preamble_installed__) {    throw new Error(      "@vitejs/plugin-react can't detect preamble. Something is wrong. " +      "See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201"    );  }  prevRefreshReg = window.$RefreshReg$;  prevRefreshSig = window.$RefreshSig$;  window.$RefreshReg$ = (type, id) => {    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/generalSearchBar/dist/index.js" + " " + id)  };  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;}var _s2 = $RefreshSig$(),
  _s3 = $RefreshSig$(),
  _s4 = $RefreshSig$(),
  _s5 = $RefreshSig$(),
  _s6 = $RefreshSig$(),
  _s7 = $RefreshSig$(),
  _s8 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useRef = __vite__cjsImport2_react["useRef"]; const useContext = __vite__cjsImport2_react["useContext"];
import { useTranslation } from '/vendor/.vite-deps-react-i18next.js__v--8418bf92.js';
import { BobjectItemCompressed, BobjectTypeMatch, BobjectItem } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-dist-index.js.js';
import { Text, CommandBox, Icon, useVisible, Select, Item } from '/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js';
import { useGeneralSearchVisibility, useActiveAccountSettings, useActiveAccountId, useIsB2CAccount, useUserHelpers, useConfetti } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js';
import { PluralBobjectTypes, ExtensionHelperKeys, typeFilterConstants, BobjectTypes, bobjectUrl, MIXPANEL_EVENTS } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js';
import { api, keepPreviousResponse, isWhatsAppPage, toSentenceCase } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js';
import clsx from '/vendor/.vite-deps-clsx.js__v--07c00239.js';
import __vite__cjsImport10_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport10_mixpanelBrowser.__esModule ? __vite__cjsImport10_mixpanelBrowser.default : __vite__cjsImport10_mixpanelBrowser;
import useSWR from '/vendor/.vite-deps-swr.js__v--ed0a962e.js';
import { jsx, jsxs } from '/vendor/id-__x00__react-jsx-runtime.js';
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
var css_248z = ".generalSearchBar-module_emptyBox__D0yZG {\n  padding: 12px 24px;\n  display: flex;\n  flex-direction: row;\n}\n\n.generalSearchBar-module_emptyBoxLeft__rvaub {\n  width: 45%;\n  left: 0;\n  padding-right: 12px;\n  display: flex;\n  flex-direction: column;\n}\n\n.generalSearchBar-module_emptyBoxCenter__Oq4lG {\n  width: 0;\n  border-left: 1px solid var(--lightPeanut);\n}\n\n.generalSearchBar-module_emptyBoxRight__FHm3f {\n  width: 55%;\n  right: 0;\n  padding-left: 12px;\n  display: flex;\n  flex-direction: column;\n}\n\n.generalSearchBar-module_historyList__qUMcj {\n  flex-grow: 1;\n}\n\n.generalSearchBar-module_historyListItem__9VWVL {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  cursor: pointer;\n}\n\n.generalSearchBar-module_historyListItem__9VWVL p {\n  width: 330px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.generalSearchBar-module_historyListItem__9VWVL:hover {\n  background-color: var(--veryLightBloobirds);\n}\n\n.generalSearchBar-module_message__ZBYeQ {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 24px;\n}\n\n.generalSearchBar-module_firstTime__9m93I {\n  padding: 16px 24px 24px 24px;\n  display: flex;\n  flex-direction: column;\n}\n\n.generalSearchBar-module_firstTimeTitle__wdHW4 {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.generalSearchBar-module_firstTimeBody__NVVNn {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  align-self: center;\n  margin-bottom: 20px;\n}\n\n.generalSearchBar-module_firstTimeBodyTitle__qlUs- {\n  margin-top: 16px;\n}\n\n.generalSearchBar-module_firstTimeBodyIconText__Veao3 {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.generalSearchBar-module_firstTimeBodyIcon__Hezoh {\n  margin-right: 8px;\n}\n\n.generalSearchBar-module_emptyResultsContainer__G1p22 {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 60px;\n}\n\n.generalSearchBar-module_emptyResultsIcon__V8SPu {\n  height: 45px;\n  width: 45px;\n  margin: 12px 0;\n}\n\n.generalSearchBar-module_emptyResultsIcon__V8SPu > g,\n.generalSearchBar-module_emptyResultsIcon__V8SPu > path {\n  fill: var(--verySoftPeanut);\n}\n\n.generalSearchBar-module_noRecentActivityRow__byc-4 {\n  height: 100%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.generalSearchBar-module_noRecentActivityColumn__x9d8E {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.generalSearchBar-module_bobjectItem__6CAV9 {\n  height: 48px;\n  display: flex;\n  align-items: center;\n  padding: 1px 36px;\n  position: relative;\n}\n\n.generalSearchBar-module_bobjectItem__6CAV9:hover {\n  cursor: pointer;\n}\n\n.generalSearchBar-module_bobjectItemType__wBMti {\n  margin-left: 4px;\n}\n\n.generalSearchBar-module_ellipse__GJqrC {\n  width: 4px;\n  height: 4px;\n  border-radius: 50%;\n  background-color: var(--softPeanut);\n}\n\n.generalSearchBar-module_bobjectItem_selected__W7pC9 {\n  background-color: var(--veryLightBloobirds);\n}\n\n.generalSearchBar-module_circleIcon__cE4r0 {\n  height: 33px;\n  width: 33px;\n  min-width: 33px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--lightestBloobirds);\n  border-radius: 50%;\n}\n\n.generalSearchBar-module_bobjectItem_prospecting__2kp9S {\n  border-left: 4px solid var(--verySoftGrape);\n}\n\n.generalSearchBar-module_bobjectItem_sales__a1dIt {\n  border-left: 4px solid var(--peanut);\n}\n\n.generalSearchBar-module_bobjectItem_preview_button_wrapper__01TNR {\n  padding: 3px;\n  display: flex;\n  align-items: center;\n  background-color: var(--veryLightBloobirds);\n  position: absolute;\n  right: 422px;\n}\n\n.generalSearchBar-module_bobjectItem_preview_button__MAvEU {\n  padding: 3px 8px !important;\n}\n\n.generalSearchBar-module_bobjectItem_show_more__iT-FH {\n  width: 100%;\n  display: flex;\n  justify-content: space-around;\n  padding: 10px 0;\n}\n\n.generalSearchBar-module_bobjectItem_show_more__iT-FH:hover {\n  cursor: pointer;\n}\n\n.generalSearchBar-module_bobjectItemContent__22vqt {\n  margin-left: 8px;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  justify-content: space-around;\n}\n\n.generalSearchBar-module_bobjectItemContentNotCompressed__jT0IT {\n  width: 380px;\n}\n\n.generalSearchBar-module_bobjectItemContentCompressed__C-lpH {\n  width: 100%;\n}\n\n.generalSearchBar-module_bobjectItemName__4zeSJ {\n  height: 20px;\n  width: -moz-fit-content;\n  width: fit-content;\n  cursor: pointer;\n  margin-top: 6px;\n}\n\n.generalSearchBar-module_bobjectItemContentInfoRow__U40Ga {\n  display: flex;\n  flex-direction: row;\n}\n\n.generalSearchBar-module_bobjectItemContentSpan__IK9gZ {\n  height: 16px;\n  white-space: nowrap;\n  display: inline-block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.generalSearchBar-module_bobjectItemNameSpan__F3t45 {\n  max-width: 300px;\n}\n\n.generalSearchBar-module_bobjectItemNameSpanCompressed__6r5B5 {\n  max-width: 300px;\n}\n\n.generalSearchBar-module_bobjectItemContentInfoPartSpace__3jZSB {\n  max-width: 135px;\n}\n\n.generalSearchBar-module_bobjectItemContentInfoAlone__p1-Nx {\n  max-width: 290px;\n}\n\n.generalSearchBar-module_bobjectItemContentInfoRowSeparator__f47tQ {\n  height: 100%;\n  display: flex;\n  flex-direction: row;\n  gap: 1px;\n  margin-right: 2px;\n}\n\n.generalSearchBar-module_bobjectItemContentInfoCompanyIcon__oW7Ea {\n  margin-left: -2px;\n}\n\n.generalSearchBar-module_bobjectItemContentInfoCompanyIconWithSubtitle__GaARG {\n  margin-left: 2px;\n}\n\n.generalSearchBar-module_bobjectItemContentCenter__seMIy {\n  display: flex;\n  flex-direction: row;\n  flex-grow: 1;\n  position: absolute;\n  left: 380px;\n}\n\n.generalSearchBar-module_bobjectItemContentCenterColumn__9zXAa {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  margin-left: 4px;\n  min-width: 34px;\n  justify-content: center;\n}\n\n.generalSearchBar-module_bobjectItemContentCenterRow__8rGEC {\n  display: flex;\n  flex-direction: row;\n  gap: 2px;\n  flex-grow: 1;\n}\n\n.generalSearchBar-module_bobjectItemContentCompressed__C-lpH {\n  margin-left: 8px;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n}\n\n.generalSearchBar-module_searchResultsList__ePfsD {\n  max-height: 700px;\n}\n\n.generalSearchBar-module_searchResults__v7Q-A {\n  max-height: 506px;\n  overflow: scroll;\n}\n\n.generalSearchBar-module_boxNoMoreResults__-9t18 {\n  padding-bottom: 40px;\n}\n.generalSearchBar-module_boxWithMoreResults__zG-Cc {\n  padding-bottom: 4px;\n}\n\n.generalSearchBar-module_box__ZXlWt {\n  position: fixed;\n  z-index: 105;\n\n  top: 48px;\n  left: 50%;\n  transform: translateX(-50%);\n\n  width: 800px;\n  background: #ffffff;\n\n  /* Main/peanut-light */\n  border: 1px solid #d4e0f1;\n\n  /* snackbar-shadow */\n  box-shadow: 0 2px 8px rgba(70, 79, 87, 0.33);\n  border-radius: 4px;\n}\n\n.generalSearchBar-module_box__ZXlWt > div:first-child {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.generalSearchBar-module_box__ZXlWt * {\n  box-sizing: border-box;\n}\n\n.generalSearchBar-module_bobjectTypeSelect__DkB5a fieldset {\n  height: 50px;\n}\n\n.generalSearchBar-module_bobjectTypeSelect__DkB5a input,\n.generalSearchBar-module_bobjectTypeSelect__DkB5a input:hover {\n  box-shadow: none;\n  border: none;\n}\n\n.generalSearchBar-module_searchInput__t9u0S {\n  width: 100%;\n  height: 43px;\n  display: flex;\n  align-items: center;\n  position: relative;\n}\n\n.generalSearchBar-module_searchInput__t9u0S > svg {\n  top: 10px;\n  left: 8px;\n}\n\n.generalSearchBar-module_searchInput__t9u0S > input {\n  height: 100%;\n  padding-left: 40px;\n  border: 2px solid var(--lightestBloobirds);\n  box-shadow: none;\n  outline: none;\n}\n\n.generalSearchBar-module_searchInput__t9u0S > input:hover {\n  border: 2px solid var(--lightestBloobirds);\n  box-shadow: none;\n}\n\n.generalSearchBar-module_searchInput__t9u0S > input:active {\n  background-color: transparent;\n  box-shadow: none;\n}\n\n.generalSearchBar-module_searchInput__t9u0S > input:focus {\n  border: 2px solid var(--softBloobirds);\n  transition: border ease-in-out 0.5s;\n  box-shadow: none;\n  outline: none;\n}\n";
var styles = {
  "emptyBox": "generalSearchBar-module_emptyBox__D0yZG",
  "emptyBoxLeft": "generalSearchBar-module_emptyBoxLeft__rvaub",
  "emptyBoxCenter": "generalSearchBar-module_emptyBoxCenter__Oq4lG",
  "emptyBoxRight": "generalSearchBar-module_emptyBoxRight__FHm3f",
  "historyList": "generalSearchBar-module_historyList__qUMcj",
  "historyListItem": "generalSearchBar-module_historyListItem__9VWVL",
  "message": "generalSearchBar-module_message__ZBYeQ",
  "firstTime": "generalSearchBar-module_firstTime__9m93I",
  "firstTimeTitle": "generalSearchBar-module_firstTimeTitle__wdHW4",
  "firstTimeBody": "generalSearchBar-module_firstTimeBody__NVVNn",
  "firstTimeBodyTitle": "generalSearchBar-module_firstTimeBodyTitle__qlUs-",
  "firstTimeBodyIconText": "generalSearchBar-module_firstTimeBodyIconText__Veao3",
  "firstTimeBodyIcon": "generalSearchBar-module_firstTimeBodyIcon__Hezoh",
  "emptyResultsContainer": "generalSearchBar-module_emptyResultsContainer__G1p22",
  "emptyResultsIcon": "generalSearchBar-module_emptyResultsIcon__V8SPu",
  "noRecentActivityRow": "generalSearchBar-module_noRecentActivityRow__byc-4",
  "noRecentActivityColumn": "generalSearchBar-module_noRecentActivityColumn__x9d8E",
  "bobjectItem": "generalSearchBar-module_bobjectItem__6CAV9",
  "bobjectItemType": "generalSearchBar-module_bobjectItemType__wBMti",
  "ellipse": "generalSearchBar-module_ellipse__GJqrC",
  "bobjectItem_selected": "generalSearchBar-module_bobjectItem_selected__W7pC9",
  "circleIcon": "generalSearchBar-module_circleIcon__cE4r0",
  "bobjectItem_prospecting": "generalSearchBar-module_bobjectItem_prospecting__2kp9S",
  "bobjectItem_sales": "generalSearchBar-module_bobjectItem_sales__a1dIt",
  "bobjectItem_preview_button_wrapper": "generalSearchBar-module_bobjectItem_preview_button_wrapper__01TNR",
  "bobjectItem_preview_button": "generalSearchBar-module_bobjectItem_preview_button__MAvEU",
  "bobjectItem_show_more": "generalSearchBar-module_bobjectItem_show_more__iT-FH",
  "bobjectItemContent": "generalSearchBar-module_bobjectItemContent__22vqt",
  "bobjectItemContentNotCompressed": "generalSearchBar-module_bobjectItemContentNotCompressed__jT0IT",
  "bobjectItemContentCompressed": "generalSearchBar-module_bobjectItemContentCompressed__C-lpH",
  "bobjectItemName": "generalSearchBar-module_bobjectItemName__4zeSJ",
  "bobjectItemContentInfoRow": "generalSearchBar-module_bobjectItemContentInfoRow__U40Ga",
  "bobjectItemContentSpan": "generalSearchBar-module_bobjectItemContentSpan__IK9gZ",
  "bobjectItemNameSpan": "generalSearchBar-module_bobjectItemNameSpan__F3t45",
  "bobjectItemNameSpanCompressed": "generalSearchBar-module_bobjectItemNameSpanCompressed__6r5B5",
  "bobjectItemContentInfoPartSpace": "generalSearchBar-module_bobjectItemContentInfoPartSpace__3jZSB",
  "bobjectItemContentInfoAlone": "generalSearchBar-module_bobjectItemContentInfoAlone__p1-Nx",
  "bobjectItemContentInfoRowSeparator": "generalSearchBar-module_bobjectItemContentInfoRowSeparator__f47tQ",
  "bobjectItemContentInfoCompanyIcon": "generalSearchBar-module_bobjectItemContentInfoCompanyIcon__oW7Ea",
  "bobjectItemContentInfoCompanyIconWithSubtitle": "generalSearchBar-module_bobjectItemContentInfoCompanyIconWithSubtitle__GaARG",
  "bobjectItemContentCenter": "generalSearchBar-module_bobjectItemContentCenter__seMIy",
  "bobjectItemContentCenterColumn": "generalSearchBar-module_bobjectItemContentCenterColumn__9zXAa",
  "bobjectItemContentCenterRow": "generalSearchBar-module_bobjectItemContentCenterRow__8rGEC",
  "searchResultsList": "generalSearchBar-module_searchResultsList__ePfsD",
  "searchResults": "generalSearchBar-module_searchResults__v7Q-A",
  "boxNoMoreResults": "generalSearchBar-module_boxNoMoreResults__-9t18",
  "boxWithMoreResults": "generalSearchBar-module_boxWithMoreResults__zG-Cc",
  "box": "generalSearchBar-module_box__ZXlWt",
  "bobjectTypeSelect": "generalSearchBar-module_bobjectTypeSelect__DkB5a",
  "searchInput": "generalSearchBar-module_searchInput__t9u0S"
};
styleInject(css_248z);
var img = "data:image/svg+xml,%3csvg width='100%25' height='100%25' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M34.555 17.57C34.621 18.147 34.655 18.734 34.655 19.328C34.655 19.385 34.655 19.443 34.654 19.5C34.631 21.632 34.169 23.66 33.356 25.5C33.355 25.502 33.354 25.504 33.353 25.506C33.046 26.199 32.689 26.865 32.287 27.5C31.836 28.212 31.328 28.885 30.769 29.512L32.638 31.381C33.823 30.66 35.356 30.649 36.556 31.425C36.773 31.566 36.976 31.731 37.158 31.914L37.965 32.72C38.312 33.067 38.312 33.63 37.965 33.978C37.791 34.151 37.564 34.238 37.336 34.238C37.108 34.238 36.881 34.151 36.708 33.978L35.9 33.171C35.806 33.076 35.7 32.991 35.588 32.918C34.844 32.437 33.849 32.542 33.219 33.166C33.215 33.171 33.212 33.175 33.209 33.179C33.204 33.185 33.2 33.191 33.195 33.196C33.193 33.198 33.191 33.198 33.189 33.2C32.474 33.943 32.48 35.127 33.213 35.86L38.979 41.626C39.72 42.367 40.926 42.367 41.667 41.626C42.408 40.885 42.408 39.678 41.667 38.937L38.356 35.626C38.009 35.279 38.009 34.716 38.356 34.369C38.703 34.022 39.266 34.022 39.613 34.369L42.924 37.68C44.359 39.115 44.359 41.449 42.924 42.883C42.207 43.6 41.265 43.958 40.323 43.958C39.381 43.958 38.439 43.599 37.722 42.883L31.956 37.116C30.746 35.907 30.561 34.059 31.392 32.649L29.512 30.769C26.802 33.184 23.234 34.656 19.327 34.656C10.876 34.656 4 27.78 4 19.328C4 10.876 10.876 4 19.328 4C27.185 4 33.681 9.943 34.555 17.57ZM32.755 17.5C32.836 18.098 32.878 18.708 32.878 19.328C32.878 21.55 32.34 23.648 31.389 25.5C31.04 26.178 30.636 26.824 30.182 27.43C30.165 27.453 30.147 27.477 30.13 27.5C27.653 30.765 23.733 32.878 19.328 32.878C11.857 32.878 5.778 26.799 5.778 19.328C5.778 11.856 11.857 5.778 19.328 5.778C26.179 5.778 31.86 10.89 32.755 17.5ZM25.504 11.476C25.668 11.605 25.861 11.667 26.054 11.667C26.317 11.667 26.577 11.551 26.752 11.328C27.057 10.943 26.99 10.384 26.605 10.08C24.511 8.429 21.994 7.556 19.328 7.556C18.837 7.556 18.439 7.954 18.439 8.445C18.439 8.935 18.837 9.334 19.328 9.334C21.591 9.334 23.727 10.075 25.504 11.476ZM27.426 13.477C27.878 14.101 28.257 14.776 28.553 15.482C28.696 15.822 29.025 16.028 29.373 16.028C29.487 16.028 29.604 16.006 29.716 15.959C30.169 15.769 30.382 15.249 30.193 14.796C29.845 13.963 29.398 13.169 28.866 12.434C28.578 12.037 28.021 11.948 27.624 12.236C27.227 12.524 27.138 13.08 27.426 13.477ZM39 17.5H36.057C36.122 18.101 36.155 18.71 36.155 19.328C36.155 19.385 36.155 19.443 36.155 19.5H39V25.5H34.982C34.708 26.19 34.391 26.858 34.032 27.5H39C40.105 27.5 41 26.605 41 25.5V19.5C41 18.395 40.105 17.5 39 17.5ZM31.378 19.328C31.378 19.386 31.377 19.443 31.377 19.5H13V25.5H29.673C29.243 26.218 28.74 26.888 28.175 27.5H13C11.895 27.5 11 26.605 11 25.5V19.5C11 18.395 11.895 17.5 13 17.5H31.239C31.331 18.096 31.378 18.707 31.378 19.328Z' fill='%231991FF'/%3e%3c/svg%3e";
function NoResults(_ref) {
  _s2();
  var bobjectType = _ref.bobjectType;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'generalSearchBar.noResults'
    }),
    t = _useTranslation.t;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'bobjectTypes'
    }),
    bobjectTypeT = _useTranslation2.t;
  var renderMessage = bobjectType ? bobjectTypeT(bobjectType.toLowerCase(), {
    count: 0
  }) : t('results');
  return /*#__PURE__*/jsx("div", {
    className: styles.emptyBox,
    children: /*#__PURE__*/jsxs("div", {
      className: styles.emptyResultsContainer,
      children: [/*#__PURE__*/jsx("img", {
        className: styles.emptyResultsIcon,
        src: img
      }), /*#__PURE__*/jsx(Text, {
        color: "softPeanut",
        size: 'xl',
        weight: 'bold',
        children: t('title', {
          bobjectType: renderMessage
        })
      }), /*#__PURE__*/jsxs(Text, {
        color: "softPeanut",
        size: 'm',
        children: [t('subtitle'), ' ']
      })]
    })
  });
}
_s2(NoResults, "JfhT1UHcjsMxQAujmQtyhQ5VgTQ=", false, function () {
  return [useTranslation, useTranslation];
});
_c = NoResults;
function SearchHistoryList(_ref2) {
  _s3();
  var searchHistory = _ref2.searchHistory;
  var store = CommandBox.useCommandBoxStore();
  return /*#__PURE__*/jsx("div", {
    className: styles.historyList,
    children: searchHistory.map(function (searchItem) {
      return /*#__PURE__*/jsxs("div", {
        className: styles.historyListItem,
        onClick: function onClick() {
          return store.setState('search', searchItem);
        },
        children: [/*#__PURE__*/jsx(Icon, {
          name: "search",
          color: "softPeanut"
        }), /*#__PURE__*/jsx(Text, {
          size: "s",
          inline: true,
          color: "peanut",
          children: searchItem
        })]
      }, "search-item-".concat(searchItem));
    })
  });
}
_s3(SearchHistoryList, "5fWY6uVv5OSijSU4wdZWt0BdF1Q=", false, function () {
  return [CommandBox.useCommandBoxStore];
});
_c2 = SearchHistoryList;
function FirstTimeSearch() {
  _s4();
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'generalSearchBar.firstTimeSearch'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs("div", {
    className: styles.firstTime,
    children: [/*#__PURE__*/jsx("div", {
      className: styles.firstTimeTitle,
      children: /*#__PURE__*/jsx(Text, {
        color: "peanut",
        weight: 'bold',
        children: t('header')
      })
    }), /*#__PURE__*/jsxs("div", {
      className: styles.firstTimeBody,
      children: [/*#__PURE__*/jsx(Text, {
        color: "peanut",
        size: 'm',
        className: styles.firstTimeBodyTitle,
        children: t('title1')
      }), /*#__PURE__*/jsxs("div", {
        className: styles.firstTimeBodyIconText,
        children: [/*#__PURE__*/jsx(Icon, {
          name: "search",
          size: 24,
          color: "bloobirds",
          className: styles.firstTimeBodyIcon
        }), /*#__PURE__*/jsx(Text, {
          color: "softPeanut",
          size: 's',
          children: t('subtitle1')
        })]
      }), /*#__PURE__*/jsx(Text, {
        color: "peanut",
        size: 'm',
        className: styles.firstTimeBodyTitle,
        children: t('title2')
      }), /*#__PURE__*/jsxs("div", {
        className: styles.firstTimeBodyIconText,
        children: [/*#__PURE__*/jsx(Icon, {
          name: "filter",
          size: 24,
          color: "bloobirds",
          className: styles.firstTimeBodyIcon
        }), /*#__PURE__*/jsx(Text, {
          color: "softPeanut",
          size: 's',
          children: t('subtitle2')
        })]
      })]
    })]
  });
}
_s4(FirstTimeSearch, "t/1iBAGEdX8rDM6vi/jYf+ryVbo=", false, function () {
  return [useTranslation];
});
_c3 = FirstTimeSearch;
function FirstTimeSearchCompressed() {
  _s5();
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'generalSearchBar.firstTimeSearchCompressed'
    }),
    t = _useTranslation2.t;
  return /*#__PURE__*/jsxs("div", {
    className: styles.firstTime,
    children: [/*#__PURE__*/jsx("div", {
      className: styles.firstTimeTitle,
      children: /*#__PURE__*/jsx(Text, {
        color: "peanut",
        weight: 'bold',
        children: t('header')
      })
    }), /*#__PURE__*/jsxs("div", {
      className: styles.firstTimeBody,
      children: [/*#__PURE__*/jsx(Text, {
        color: "peanut",
        size: 'm',
        className: styles.firstTimeBodyTitle,
        children: t('title1')
      }), /*#__PURE__*/jsxs("div", {
        className: styles.firstTimeBodyIconText,
        children: [/*#__PURE__*/jsx(Icon, {
          name: "quote",
          size: 24,
          color: "bloobirds",
          className: styles.firstTimeBodyIcon
        }), /*#__PURE__*/jsx(Text, {
          color: "softPeanut",
          size: 's',
          children: t('subtitle1')
        })]
      }), /*#__PURE__*/jsx(Text, {
        color: "peanut",
        size: 'm',
        className: styles.firstTimeBodyTitle,
        children: t('title2')
      }), /*#__PURE__*/jsxs("div", {
        className: styles.firstTimeBodyIconText,
        children: [/*#__PURE__*/jsx(Icon, {
          name: "filter",
          size: 24,
          color: "bloobirds",
          className: styles.firstTimeBodyIcon
        }), /*#__PURE__*/jsx(Text, {
          color: "softPeanut",
          size: 's',
          children: t('subtitle2')
        })]
      })]
    })]
  });
}

/**
 * Component used for when there are no results in the search
 * @param bobjectType - BobjectType for the no results component
 * @param handleBobjectCompressedClick - function to handle the click on an item in the last visited history
 * @param handleCompanyClicked - function to close the search bar after redirecting from the list
 * @constructor
 */
_s5(FirstTimeSearchCompressed, "zKId3lXTN2GCFmE2xgLOny8j7l8=", false, function () {
  return [useTranslation];
});
_c4 = FirstTimeSearchCompressed;
function EmptyList(_ref) {
  _s6();
  var bobjectType = _ref.bobjectType,
    handleBobjectCompressedClick = _ref.handleBobjectCompressedClick,
    handleCompanyClicked = _ref.handleCompanyClicked;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'generalSearchBar'
    }),
    t = _useTranslation.t;
  var _useGeneralSearch = useGeneralSearch(),
    searchQuery = _useGeneralSearch.searchQuery,
    lastVisited = _useGeneralSearch.lastVisited,
    searchHistory = _useGeneralSearch.searchHistory;
  if (searchQuery && searchQuery.length > 1) {
    return /*#__PURE__*/jsx(NoResults, {
      bobjectType: bobjectType
    });
  }
  if ((!lastVisited || lastVisited.length === 0) && (!searchHistory || searchHistory.length === 0)) {
    return /*#__PURE__*/jsx(FirstTimeSearch, {});
  }
  return /*#__PURE__*/jsxs("div", {
    className: styles.emptyBox,
    children: [/*#__PURE__*/jsx("div", {
      className: styles.emptyBoxLeft,
      children: searchHistory.length > 0 ? /*#__PURE__*/jsx(SearchHistoryList, {
        searchHistory: searchHistory
      }) : /*#__PURE__*/jsx(FirstTimeSearchCompressed, {})
    }), /*#__PURE__*/jsx("div", {
      className: styles.emptyBoxCenter
    }), /*#__PURE__*/jsx("div", {
      className: styles.emptyBoxRight,
      children: /*#__PURE__*/jsx("div", {
        className: styles.historyList,
        children: lastVisited && lastVisited.length !== 0 ? lastVisited.map(function (lastVisited) {
          var _lastVisited$rawBobje;
          return /*#__PURE__*/jsx(BobjectItemCompressed, {
            bobject: lastVisited,
            handleClick: handleBobjectCompressedClick,
            handleCompanyClicked: handleCompanyClicked
          }, (_lastVisited$rawBobje = lastVisited.rawBobject) === null || _lastVisited$rawBobje === void 0 ? void 0 : _lastVisited$rawBobje.id);
        }) : /*#__PURE__*/jsx("div", {
          className: styles.noRecentActivityRow,
          children: /*#__PURE__*/jsx("div", {
            className: styles.noRecentActivityColumn,
            children: /*#__PURE__*/jsx(Text, {
              size: "s",
              color: "softPeanut",
              children: t('noRecentActivity')
            })
          })
        })
      })
    })]
  });
}
_s6(EmptyList, "lpkyxYWuXlnaOvFPtWRqgfBARlE=", false, function () {
  return [useTranslation, useGeneralSearch];
});
_c5 = EmptyList;
var EmptyList$1 = /*#__PURE__*/React.memo(EmptyList);
_c6 = EmptyList$1;
function searchBobjectTypeName(search) {
  if (!search) {
    return false;
  }
  var types = ['All', 'Lead', 'Company', 'Opportunity'];
  var match = types.find(function (type) {
    if (type.toLowerCase().startsWith(search.toLowerCase())) {
      return type;
    }
    if (type !== 'All') {
      if (PluralBobjectTypes[type].toLowerCase().startsWith(search.toLowerCase())) {
        return type;
      }
    }
    return false;
  });
  return match ? match : false;
}
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
function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */_regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
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
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function getBobjectTypes(bobjectType, isB2CAccount) {
  if (bobjectType === 'All') {
    return [].concat(_toConsumableArray(isB2CAccount ? [] : [BobjectTypes.Company]), [BobjectTypes.Lead, BobjectTypes.Opportunity]);
  } else return [bobjectType];
}
var SearchContext = /*#__PURE__*/React.createContext(undefined);
var useGeneralSearch = function useGeneralSearch() {
  _s7();
  return useContext(SearchContext);
};
_s7(useGeneralSearch, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var PAGE_SIZE = 10;
function GeneralSearchBar(_ref) {
  _s8();
  var _response$data, _typeFilterConstants$;
  var actions = _ref.actions,
    _ref$isWebapp = _ref.isWebapp,
    isWebapp = _ref$isWebapp === void 0 ? false : _ref$isWebapp;
  var anchorRef = useRef();
  var _useGeneralSearchVisi = useGeneralSearchVisibility(),
    isOpen = _useGeneralSearchVisi.isOpen,
    setIsOpen = _useGeneralSearchVisi.setIsOpen,
    toggleVisibility = _useGeneralSearchVisi.toggleVisibility,
    closeGeneralSearchBar = _useGeneralSearchVisi.closeGeneralSearchBar;
  var _React$useState = React.useState('All'),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    bobjectTypeFilter = _React$useState2[0],
    setBobjectTypeFilter = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    bobjectTypeMatch = _React$useState4[0],
    setBobjectTypeMatch = _React$useState4[1];
  var _React$useState5 = React.useState([]),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    lastVisited = _React$useState6[0],
    setLastVisited = _React$useState6[1];
  var _React$useState7 = React.useState(''),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    searchQuery = _React$useState8[0],
    setSearchQuery = _React$useState8[1];
  var _React$useState9 = React.useState([]),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    searchHistory = _React$useState10[0],
    setSearchHistory = _React$useState10[1];
  var _React$useState11 = React.useState(1),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    page = _React$useState12[0],
    setPage = _React$useState12[1];
  var _useActiveAccountSett = useActiveAccountSettings(),
    isLoading = _useActiveAccountSett.isLoading;
  var accountId = useActiveAccountId();
  var isB2CAccount = useIsB2CAccount();
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'generalSearchBar'
    }),
    t = _useTranslation.t;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'bobjectTypes'
    }),
    bobjectTypeT = _useTranslation2.t;
  var _useVisible = useVisible(isOpen, anchorRef),
    ref = _useVisible.ref,
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  var childRef = useRef();
  var showBobjectTypeMatch = !!bobjectTypeMatch && bobjectTypeMatch !== bobjectTypeFilter;
  var _useUserHelpers = useUserHelpers(),
    has = _useUserHelpers.has,
    save = _useUserHelpers.save;
  var _useConfetti = useConfetti(),
    throwConfetti = _useConfetti.throwConfetti;
  var inputRef = useRef(null);
  var _useSWR = useSWR(searchQuery !== '' ? ['generalSearchBar', searchQuery] : null, function () {
      return api.post("/bobjects/".concat(accountId, "/global-search"), {
        query: searchQuery,
        bobjectTypes: getBobjectTypes(bobjectTypeFilter, isB2CAccount),
        numberOfResults: page * PAGE_SIZE
      });
    }, {
      use: [keepPreviousResponse]
    }),
    response = _useSWR.data,
    mutate = _useSWR.mutate,
    isValidating = _useSWR.isValidating;
  var results = response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.results;
  var showShowMore = (results === null || results === void 0 ? void 0 : results.length) > page * PAGE_SIZE;
  function loadNextPage() {
    return _loadNextPage.apply(this, arguments);
  }
  function _loadNextPage() {
    _loadNextPage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var shouldMutate;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            shouldMutate = page === 1 || (results === null || results === void 0 ? void 0 : results.length) > page * PAGE_SIZE + 1;
            _context2.next = 3;
            return setPage(function (page) {
              return page + 1;
            });
          case 3:
            if (shouldMutate) {
              mutate();
            }
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return _loadNextPage.apply(this, arguments);
  }
  React.useEffect(function () {
    var whatsAppExtendedSearchWrapper = document.getElementsByClassName('app-wrapper-web')[0];
    var whatsAppExtendedSearch = whatsAppExtendedSearchWrapper === null || whatsAppExtendedSearchWrapper === void 0 ? void 0 : whatsAppExtendedSearchWrapper.querySelector('div > span:not(:empty)');
    if (inputRef !== null && inputRef !== void 0 && inputRef.current && isWhatsAppPage()) {
      if (whatsAppExtendedSearch) {
        whatsAppExtendedSearch.style.display = 'none';
      }
      setTimeout(function () {
        inputRef.current.querySelector('input').focus();
        inputRef.current.querySelector('input').select();
      }, 1000);
    }
  }, [inputRef.current]);

  // Toggle the menu when ctrl/⌘K is pressed and close it when esc
  React.useEffect(function () {
    var down = function down(e) {
      if (!isLoading && ((e === null || e === void 0 ? void 0 : e.key) === 'k' && e !== null && e !== void 0 && e.metaKey || navigator.appVersion.indexOf('Mac') == -1 && (e === null || e === void 0 ? void 0 : e.key) === 'k' && e !== null && e !== void 0 && e.ctrlKey)) {
        e.stopPropagation();
        e.preventDefault();
        if (!isOpen) {
          setSearchQuery('');
          setPage(1);
        }
        toggleVisibility();
        mixpanel.track(MIXPANEL_EVENTS.GLOBAL_SEARCH_BAR_OPENED);
      } else if ((e === null || e === void 0 ? void 0 : e.key) === 'Escape') {
        e.stopPropagation();
        e.preventDefault();
        setSearchQuery('');
        setPage(1);
        closeGeneralSearchBar();
      }
    };
    document.addEventListener('keydown', down);
    return function () {
      return document.removeEventListener('keydown', down);
    };
  }, [isLoading]);

  // Coordinate open/close from the hook controlling click outside and internal control of key down
  React.useEffect(function () {
    if (!visible) {
      setSearchQuery('');
    }
    setIsOpen(visible);
  }, [visible]);
  React.useEffect(function () {
    setVisible(isOpen);
  }, [isOpen]);
  React.useEffect(function () {
    if (!has(ExtensionHelperKeys.OPENED_GENERAL_SEARCH_BAR) && !isWebapp && visible) {
      throwConfetti({
        bloobirdsShape: true
      });
      save(ExtensionHelperKeys.OPENED_GENERAL_SEARCH_BAR);
    }
  }, [visible]);

  // Update the search history when the search query changes
  React.useEffect(function () {
    addSearchToHistory(searchQuery);
  }, [searchQuery]);
  function addSearchToHistory(search) {
    if (search) {
      setSearchHistory(function (searchHistory) {
        // add to the beginning of the array
        if (!searchHistory.includes(search)) {
          searchHistory.unshift(search);
        } else {
          searchHistory.splice(searchHistory.indexOf(search), 1);
          searchHistory.unshift(search);
        }
        // History of max 10 searches
        if (searchHistory.length > 10) {
          searchHistory.pop();
        }
        return searchHistory;
      });
    }
  }

  // Update the last visited when a result item is clicked, avoiding repeated results
  function addVisitedToHistory(visited) {
    if (visited) {
      setLastVisited(function (visitedHistory) {
        // add to the beginning of the array
        visitedHistory = visitedHistory.filter(function (v) {
          return v.rawBobject.id !== visited.rawBobject.id;
        });
        visitedHistory.unshift(visited);
        // History of max 10 visited
        if (visitedHistory.length > 10) {
          visitedHistory.pop();
        }
        return visitedHistory;
      });
    }
  }
  var parsedActions = {
    handleMainBobjectClick: function handleMainBobjectClick(event, bobject) {
      addVisitedToHistory(bobject);
      actions.handleMainBobjectClick(event, bobject);
    },
    handleActionOnClick: function handleActionOnClick(event, action, bobject) {
      addVisitedToHistory(bobject);
      actions.handleActionOnClick(event, action, bobject);
    }
  };

  /*** if bobject is undefined, only closes modal ***/
  function handleElementClicked(bobject, event) {
    if (bobject) {
      parsedActions.handleMainBobjectClick(event, bobject);
      mixpanel.track(MIXPANEL_EVENTS.GLOBAL_SEARCH_BAR_RESULT_CLICKED);
    } else {
      mixpanel.track(MIXPANEL_EVENTS.GLOBAL_SEARCH_BAR_QUICK_ACTION_CLICKED);
    }
    setSearchQuery('');
    setPage(1);
    setBobjectTypeMatch(false);
    closeGeneralSearchBar();
  }
  function handleClickedItem(bobject, event) {
    parsedActions.handleMainBobjectClick(event, bobject);
    setSearchQuery('');
    setPage(1);
    setBobjectTypeMatch(false);
    closeGeneralSearchBar();
    mixpanel.track(MIXPANEL_EVENTS.GLOBAL_SEARCH_BAR_RESULT_CLICKED);
  }
  function handleBobjectTypeMatchClick(_x2) {
    return _handleBobjectTypeMatchClick.apply(this, arguments);
  }
  function _handleBobjectTypeMatchClick() {
    _handleBobjectTypeMatchClick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(bobjectType) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return setBobjectTypeFilter(bobjectType);
          case 2:
            setBobjectTypeMatch(false);
            mixpanel.track(MIXPANEL_EVENTS.GLOBAL_SEARCH_BAR_CHANGED_TYPE_FILTER);
            mutate();
          case 5:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return _handleBobjectTypeMatchClick.apply(this, arguments);
  }
  function handleSearch(query) {
    var typeMatch = searchBobjectTypeName(query);
    setBobjectTypeMatch(typeMatch);
    setPage(1);
    mixpanel.track(MIXPANEL_EVENTS.GLOBAL_SEARCH_BAR_SEARCHED);
    setSearchQuery(query);
  }
  var boxClassNames = clsx(styles.box, _defineProperty(_defineProperty({}, styles.boxNoMoreResults, !showShowMore), styles.boxWithMoreResults, showShowMore));
  return isOpen ? /*#__PURE__*/jsx("div", {
    children: /*#__PURE__*/jsxs(CommandBox, {
      onSearch: handleSearch,
      className: boxClassNames,
      ref: ref,
      children: [/*#__PURE__*/jsxs(CommandBox.SearchBox, {
        children: [/*#__PURE__*/jsx(Select, {
          value: bobjectTypeFilter,
          className: styles.bobjectTypeSelect,
          width: "140px",
          onChange: /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(value) {
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return setPage(1);
                  case 2:
                    _context.next = 4;
                    return setBobjectTypeFilter(value);
                  case 4:
                    mutate();
                  case 5:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x3) {
              return _ref2.apply(this, arguments);
            };
          }()
          /*@ts-ignore*/,
          dropdownProps: {
            ref: anchorRef
          },
          children: typeFilterConstants === null || typeFilterConstants === void 0 ? void 0 : (_typeFilterConstants$ = typeFilterConstants.filter(function (type) {
            return isB2CAccount ? type !== BobjectTypes.Company : true;
          })) === null || _typeFilterConstants$ === void 0 ? void 0 : _typeFilterConstants$.map(function (type) {
            return /*#__PURE__*/jsx(Item, {
              value: type,
              children: toSentenceCase(bobjectTypeT(type.toLowerCase()))
            }, type);
          })
        }), /*#__PURE__*/jsx("div", {
          ref: inputRef,
          style: {
            width: '100%'
          },
          children: /*#__PURE__*/jsx(CommandBox.Input, {
            value: searchQuery,
            className: styles.searchInput
          })
        })]
      }), isValidating && /*#__PURE__*/jsx(CommandBox.ProgressBar, {}), /*#__PURE__*/jsxs(SearchContext.Provider, {
        value: {
          searchQuery: searchQuery,
          lastVisited: lastVisited,
          searchHistory: searchHistory,
          actions: parsedActions,
          isWebapp: isWebapp
        },
        children: [/*#__PURE__*/jsxs(CommandBox.List, {
          className: styles.searchResultsList,
          children: [/*#__PURE__*/jsxs("div", {
            className: styles.searchResults,
            children: [showBobjectTypeMatch && /*#__PURE__*/jsx(CommandBox.Item, {
              action: function action() {
                var _childRef$current;
                // @ts-ignore
                (_childRef$current = childRef.current) === null || _childRef$current === void 0 ? void 0 : _childRef$current.deleteInput();
                handleBobjectTypeMatchClick(bobjectTypeMatch);
              },
              children: /*#__PURE__*/jsx(BobjectTypeMatch, {
                bobjectType: bobjectTypeMatch,
                applyFilter: handleBobjectTypeMatchClick,
                ref: childRef
              })
            }, 'typeMatch'), searchQuery && results && results.slice(0, showBobjectTypeMatch && page === 1 ? page * PAGE_SIZE - 1 : page * PAGE_SIZE).map(function (item) {
              var _item$rawBobject;
              var url = bobjectUrl({
                id: {
                  typeName: item.rawBobject.id.split('/')[1],
                  objectId: item.rawBobject.id.split('/')[2]
                }
              });
              return /*#__PURE__*/jsx(CommandBox.Item, {
                // @ts-ignore
                action: function action(e) {
                  return handleClickedItem(_objectSpread(_objectSpread({}, item), {}, {
                    url: url
                  }), e);
                },
                children: /*#__PURE__*/jsx(BobjectItem, {
                  bobject: _objectSpread(_objectSpread({}, item), {}, {
                    url: url
                  }),
                  hits: item.highlights,
                  handleElementClicked: handleElementClicked,
                  isWebapp: isWebapp,
                  actions: parsedActions
                })
              }, (_item$rawBobject = item.rawBobject) === null || _item$rawBobject === void 0 ? void 0 : _item$rawBobject.id);
            })]
          }), searchQuery && showShowMore && /*#__PURE__*/jsx("div", {
            className: styles.bobjectItem_show_more,
            onClick: loadNextPage,
            children: /*#__PURE__*/jsx(Text, {
              size: "xs",
              color: "bloobirds",
              children: t('showMore')
            })
          })]
        }), /*#__PURE__*/jsx(CommandBox.Empty, {
          children: /*#__PURE__*/jsx(EmptyList$1, {
            bobjectType: bobjectTypeFilter !== 'All' ? bobjectTypeFilter : undefined,
            handleBobjectCompressedClick: handleClickedItem,
            handleCompanyClicked: handleElementClicked
          })
        })]
      })]
    })
  }) : null;
}
_s8(GeneralSearchBar, "+V7km7+1a59Ks2T6eD19THx3go4=", false, function () {
  return [useGeneralSearchVisibility, useActiveAccountSettings, useActiveAccountId, useIsB2CAccount, useTranslation, useTranslation, useVisible, useUserHelpers, useConfetti, useSWR];
});
_c7 = GeneralSearchBar;
export { GeneralSearchBar };
var _c, _c2, _c3, _c4, _c5, _c6, _c7;
$RefreshReg$(_c, "NoResults");
$RefreshReg$(_c2, "SearchHistoryList");
$RefreshReg$(_c3, "FirstTimeSearch");
$RefreshReg$(_c4, "FirstTimeSearchCompressed");
$RefreshReg$(_c5, "EmptyList");
$RefreshReg$(_c6, "EmptyList$1");
$RefreshReg$(_c7, "GeneralSearchBar");
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