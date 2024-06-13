import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-calendar-dist-index.js.js");import RefreshRuntime from "/vendor/react-refresh.js";let prevRefreshReg;let prevRefreshSig;if (import.meta.hot) {  if (!window.__vite_plugin_react_preamble_installed__) {    throw new Error(      "@vitejs/plugin-react can't detect preamble. Something is wrong. " +      "See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201"    );  }  prevRefreshReg = window.$RefreshReg$;  prevRefreshSig = window.$RefreshSig$;  window.$RefreshReg$ = (type, id) => {    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/calendar/dist/index.js" + " " + id)  };  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;}var _s2 = $RefreshSig$(),
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
  _s21 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useState = __vite__cjsImport2_react["useState"]; const useRef = __vite__cjsImport2_react["useRef"]; const useCallback = __vite__cjsImport2_react["useCallback"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"]; const Fragment$1 = __vite__cjsImport2_react["Fragment"]; const createContext = __vite__cjsImport2_react["createContext"]; const useContext = __vite__cjsImport2_react["useContext"];
import { useTranslation, Trans } from '/vendor/.vite-deps-react-i18next.js__v--8418bf92.js';
import { useVisible, Dropdown, Icon, Text, Select, Item, Checkbox, Button, IconButton, Radio, Input, Modal, ModalHeader, ModalTitle, ModalCloseIcon, ModalContent, ModalFooter, CompoundIcon, Avatar, Label, Tooltip } from '/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js';
import { useCalendar, useDataModel, useFullSalesEnabled, useUserSearch, useActiveUserSettings, useTimeZones } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js';
import clsx from '/vendor/.vite-deps-clsx.js__v--07c00239.js';
import { jsx, jsxs, Fragment } from '/vendor/id-__x00__react-jsx-runtime.js';
import { ACTIVITY_FIELDS_LOGIC_ROLE, MIXPANEL_EVENTS, COMPANY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js';
import { fetchAndOpenNylasUrl, getUserTimeZone, toTitleCase, getTimeFromOffset, getDurationFromOffset, isToday, getValueFromLogicRole } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js';
import { DayCalendarBackground, Calendar as Calendar$1, Outlook } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-assets-dist-index.js.js';
import spacetime from '/vendor/.vite-deps-spacetime.js__v--14e7d295.js';
import { getI18nSpacetimeLng } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js';
import __vite__cjsImport13_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport13_mixpanelBrowser.__esModule ? __vite__cjsImport13_mixpanelBrowser.default : __vite__cjsImport13_mixpanelBrowser;
import __vite__cjsImport14_lodash_throttle from "/vendor/.vite-deps-lodash_throttle.js__v--7a0691ef.js"; const throttle = __vite__cjsImport14_lodash_throttle.__esModule ? __vite__cjsImport14_lodash_throttle.default : __vite__cjsImport14_lodash_throttle;
import { v4 } from '/vendor/.vite-deps-uuid.js__v--488548d2.js';
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
var css_248z$4 = ".calendarSelector-module__calendars_container__3-gAH {\n  display: flex;\n  flex-direction: column;\n  margin: 16px;\n  width: 300px;\n  max-height: 600px;\n  overflow-y: auto;\n  padding-right: 8px;\n}\n\n.calendarSelector-module__select_disabled__u81jA {\n  background-color: var(--lightestGray);\n}\n\n.calendarSelector-module__calendars_list__8m2zN {\n  margin: 8px 0;\n  display: flex;\n  flex-direction: column;\n}\n\n.calendarSelector-module__calendars_list__8m2zN > * {\n  margin: 4px 0;\n}\n\n.calendarSelector-module__help_container__gyHta > * {\n  margin-bottom: 8px;\n}\n\n.calendarSelector-module__help_text__SpYd2 {\n  display: flex;\n}\n\n.calendarSelector-module__accounts_selector__8HuNV {\n  margin: 8px 0 16px 0;\n}\n\n.calendarSelector-module__select_anchor__5svZ5 {\n  width: 200px;\n  height: 24px;\n  border-radius: 4px;\n  border: 1px solid var(--peanut);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  cursor: pointer;\n}\n\n.calendarSelector-module__icon_container__IOxcL {\n  display: flex;\n  align-items: center;\n  margin-left: 4px;\n  margin-right: 4px;\n}\n\n.calendarSelector-module__select_text__cARFw {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n";
var styles$4 = {
  "_calendars_container": "calendarSelector-module__calendars_container__3-gAH",
  "_select_disabled": "calendarSelector-module__select_disabled__u81jA",
  "_calendars_list": "calendarSelector-module__calendars_list__8m2zN",
  "_help_container": "calendarSelector-module__help_container__gyHta",
  "_help_text": "calendarSelector-module__help_text__SpYd2",
  "_accounts_selector": "calendarSelector-module__accounts_selector__8HuNV",
  "_select_anchor": "calendarSelector-module__select_anchor__5svZ5",
  "_icon_container": "calendarSelector-module__icon_container__IOxcL",
  "_select_text": "calendarSelector-module__select_text__cARFw"
};
styleInject(css_248z$4);
function _typeof$8(obj) {
  "@babel/helpers - typeof";

  return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$8(obj);
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
function _toConsumableArray$3(arr) {
  return _arrayWithoutHoles$3(arr) || _iterableToArray$3(arr) || _unsupportedIterableToArray$7(arr) || _nonIterableSpread$3();
}
function _nonIterableSpread$3() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$7(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$7(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen);
}
function _iterableToArray$3(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$3(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$7(arr);
}
function _arrayLikeToArray$7(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
var CalendarsSelector = function CalendarsSelector(_ref) {
  _s2();
  var _calendarsAvailable$d, _calendarsAvailable$d2, _calendarsAvailable$d3, _calendarsAvailable$d4, _connections$list;
  var connections = _ref.connections,
    disabled = _ref.disabled,
    anchor = _ref.anchor;
  var _useVisible = useVisible(false),
    ref = _useVisible.ref,
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  var _useCalendar = useCalendar(),
    calendarSelected = _useCalendar.calendarSelected,
    setSelectedCalendar = _useCalendar.setSelectedCalendar,
    calendarsAvailable = _useCalendar.calendarsAvailable,
    accountSelected = _useCalendar.accountSelected,
    setAccountSelected = _useCalendar.setAccountSelected,
    calendarsWithColor = _useCalendar.calendarsWithColor;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'meetingModal.calendarSelector'
    }),
    t = _useTranslation.t;
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
      return [].concat(_toConsumableArray$3(prevSelected), [id]);
    }) : setSelectedCalendar(function (prevSelected) {
      return prevSelected === null || prevSelected === void 0 ? void 0 : prevSelected.filter(function (c) {
        return c !== id;
      });
    });
  };
  return /*#__PURE__*/jsx(Dropdown, {
    anchor: anchor ? anchor(visible, setVisible) : /*#__PURE__*/jsxs("div", {
      className: clsx(styles$4._select_anchor, _defineProperty$8({}, styles$4._select_disabled, disabled)),
      onClick: function onClick() {
        return disabled ? null : setVisible(!visible);
      },
      children: [/*#__PURE__*/jsxs("span", {
        style: {
          display: 'flex'
        },
        children: [/*#__PURE__*/jsx("span", {
          className: styles$4._icon_container,
          children: /*#__PURE__*/jsx(Icon, {
            name: "calendar",
            size: 12,
            color: "softPeanut"
          })
        }), /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: disabled ? 'softPeanut' : 'peanut',
          className: styles$4._select_text,
          children: disabled ? t('noCalendarsSelected') : (calendarSelected === null || calendarSelected === void 0 ? void 0 : calendarSelected.length) > 0 ? (calendarSelected === null || calendarSelected === void 0 ? void 0 : calendarSelected.length) > 1 ? t('calendarsSelected').toLowerCase() : calendarsAvailable === null || calendarsAvailable === void 0 ? void 0 : (_calendarsAvailable$d3 = calendarsAvailable.data) === null || _calendarsAvailable$d3 === void 0 ? void 0 : (_calendarsAvailable$d4 = _calendarsAvailable$d3.find(function (c) {
            return (c === null || c === void 0 ? void 0 : c.id) === calendarSelected[0];
          })) === null || _calendarsAvailable$d4 === void 0 ? void 0 : _calendarsAvailable$d4.name : t('noCalendarsSelected')
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
      className: styles$4._calendars_container,
      children: [/*#__PURE__*/jsxs(Text, {
        size: "s",
        children: [t('calendarAccount'), ":"]
      }), /*#__PURE__*/jsx("div", {
        className: styles$4._accounts_selector,
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
          className: styles$4._calendars_list,
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
          className: styles$4._calendars_list,
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
        className: styles$4._help_container,
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
_s2(CalendarsSelector, "0f+xSof61/OoCrKPxMRdJw2v/gQ=", false, function () {
  return [useVisible, useCalendar, useTranslation];
});
_c = CalendarsSelector;
function _toConsumableArray$2(arr) {
  return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$6(arr) || _nonIterableSpread$2();
}
function _nonIterableSpread$2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$6(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$6(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen);
}
function _iterableToArray$2(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$2(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$6(arr);
}
function _arrayLikeToArray$6(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
var BloobirdsCalendarsSelector = function BloobirdsCalendarsSelector(_ref) {
  _s3();
  var anchor = _ref.anchor;
  var _useCalendar = useCalendar(),
    accountId = _useCalendar.accountId,
    userId = _useCalendar.userId,
    usersSelected = _useCalendar.usersSelected,
    setUsersSelected = _useCalendar.setUsersSelected,
    accountExecutivesSelected = _useCalendar.accountExecutivesSelected,
    setAccountExecutivesSelected = _useCalendar.setAccountExecutivesSelected;
  var _useVisible = useVisible(),
    ref = _useVisible.ref,
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  var dataModel = useDataModel();
  var isFullSalesEnabled = useFullSalesEnabled(accountId);
  var userResponse = useUserSearch();
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var users = userResponse === null || userResponse === void 0 ? void 0 : userResponse.users;
  var sortedUsers = users === null || users === void 0 ? void 0 : users.reduce(function (acc, user) {
    if ((user === null || user === void 0 ? void 0 : user.id) === userId) {
      return [user].concat(_toConsumableArray$2(acc));
    }
    return [].concat(_toConsumableArray$2(acc), [user]);
  }, []);
  var activityAccountExecutiveField = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findValuesByFieldLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE);
  var totalCalendarsSelected = [].concat(_toConsumableArray$2(accountExecutivesSelected), _toConsumableArray$2(usersSelected));
  var accountExecutivePicklistValues = activityAccountExecutiveField === null || activityAccountExecutiveField === void 0 ? void 0 : activityAccountExecutiveField.filter(function (ae) {
    return ae === null || ae === void 0 ? void 0 : ae.enabled;
  });
  var handleSelectUser = function handleSelectUser(user, value) {
    if (value) {
      setUsersSelected(function (curr) {
        return [].concat(_toConsumableArray$2(curr), [user === null || user === void 0 ? void 0 : user.id]);
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
        return [].concat(_toConsumableArray$2(curr), [ae === null || ae === void 0 ? void 0 : ae.id]);
      });
    } else {
      setAccountExecutivesSelected(accountExecutivesSelected === null || accountExecutivesSelected === void 0 ? void 0 : accountExecutivesSelected.filter(function (id) {
        return id !== (ae === null || ae === void 0 ? void 0 : ae.id);
      }));
    }
  };
  return /*#__PURE__*/jsx(Dropdown, {
    anchor: anchor ? anchor(visible, setVisible) : /*#__PURE__*/jsxs("div", {
      className: styles$4._select_anchor,
      onClick: function onClick() {
        return setVisible(true);
      },
      children: [/*#__PURE__*/jsxs("span", {
        style: {
          display: 'flex'
        },
        children: [/*#__PURE__*/jsx("span", {
          className: styles$4._icon_container,
          children: /*#__PURE__*/jsx(Icon, {
            name: "calendar",
            size: 12,
            color: "softPeanut"
          })
        }), /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "peanut",
          className: styles$4._select_text,
          children: t('calendar.days.calendarSelector', {
            count: (totalCalendarsSelected === null || totalCalendarsSelected === void 0 ? void 0 : totalCalendarsSelected.length) || 0
          })
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
      className: styles$4._calendars_container,
      children: [(users === null || users === void 0 ? void 0 : users.length) > 0 && /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx(Text, {
          size: "m",
          color: "peanut",
          children: "Users"
        }), /*#__PURE__*/jsx("div", {
          className: styles$4._calendars_list,
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
              children: [user === null || user === void 0 ? void 0 : user.name, " ", isSelfUser && "(".concat(t('common.you'), ")")]
            }, user === null || user === void 0 ? void 0 : user.id);
          })
        })]
      }), !isFullSalesEnabled && (accountExecutivePicklistValues === null || accountExecutivePicklistValues === void 0 ? void 0 : accountExecutivePicklistValues.length) > 0 && /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx(Text, {
          size: "m",
          color: "peanut",
          children: t('common.accountExecutive')
        }), /*#__PURE__*/jsx("div", {
          className: styles$4._calendars_list,
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
_s3(BloobirdsCalendarsSelector, "4thtKbjQj40yvjJ0fgRPr+kEIEU=", false, function () {
  return [useCalendar, useVisible, useDataModel, useFullSalesEnabled, useUserSearch, useTranslation];
});
_c2 = BloobirdsCalendarsSelector;
var css_248z$3 = ".brandedButtons-module__button__gSpAm {\n  cursor: pointer;\n  display: inline-flex;\n  padding: 1px;\n  font-size: 14px;\n  height: 30px;\n  text-decoration: none;\n  border-radius: 4px;\n}\n\n.brandedButtons-module__icon__hwq6Z {\n  display: flex;\n  align-items: center;\n  width: 30px;\n  background-color: white;\n  flex-direction: column;\n  justify-content: center;\n  border-radius: 4px 0 0 4px;\n}\n\n.brandedButtons-module__text__MUtJP {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  padding: 0 12px;\n  font-weight: 500;\n}\n\n.brandedButtons-module__google__button__4-gMT {\n  background-color: #4285f4;\n  color: white;\n}\n\n.brandedButtons-module__ms__button__eOOfE {\n  height: 28px;\n  background-color: white;\n  border: 1px solid #8c8c8c;\n  color: #5e5e5e;\n}\n";
var styles$3 = {
  "_button": "brandedButtons-module__button__gSpAm",
  "_icon": "brandedButtons-module__icon__hwq6Z",
  "_text": "brandedButtons-module__text__MUtJP",
  "_google__button": "brandedButtons-module__google__button__4-gMT brandedButtons-module__button__gSpAm",
  "_ms__button": "brandedButtons-module__ms__button__eOOfE brandedButtons-module__button__gSpAm"
};
styleInject(css_248z$3);
var GoogleSignIn = function GoogleSignIn(_ref) {
  _s4();
  var onClick = _ref.onClick;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs("div", {
    className: styles$3._google__button,
    onClick: onClick,
    children: [/*#__PURE__*/jsx("div", {
      className: styles$3._icon
    }), /*#__PURE__*/jsx("span", {
      className: styles$3._text,
      children: t('calendar.signWithGoogle')
    })]
  });
};
_s4(GoogleSignIn, "t/1iBAGEdX8rDM6vi/jYf+ryVbo=", false, function () {
  return [useTranslation];
});
_c3 = GoogleSignIn;
var MicrosoftSignIn = function MicrosoftSignIn(_ref) {
  _s5();
  var onClick = _ref.onClick;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs("div", {
    className: styles$3._ms__button,
    onClick: onClick,
    children: [/*#__PURE__*/jsx("div", {
      className: styles$3._icon
    }), /*#__PURE__*/jsx("span", {
      className: styles$3._text,
      children: t('calendar.signWithOutlook')
    })]
  });
};
_s5(MicrosoftSignIn, "t/1iBAGEdX8rDM6vi/jYf+ryVbo=", false, function () {
  return [useTranslation];
});
_c4 = MicrosoftSignIn;
var css_248z$2 = ".calendarNotConnected-module_calendar_not_connected__PrcRA {\n  width: 372px;\n  height: 490px;\n  background-image: url('../../../../../../assets/calendar-scrollable.png');\n  background-repeat: no-repeat;\n  background-size: cover;\n  box-shadow: inset 0 0 20px 20px white;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n}\n\n.calendarNotConnected-module_calendar_not_connected__PrcRA > * {\n  margin-bottom: 20px;\n}\n\n.calendarNotConnected-module_calendar_buttons__-bSYC {\n  display: flex;\n}\n\n.calendarNotConnected-module_calendar_buttons__-bSYC > * {\n  margin: 4px;\n}\n\n.calendarNotConnected-module_link__mRffk {\n  cursor: pointer;\n}\n\n.calendarNotConnected-module_day_calendar_not_connected_container__Xvu81 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.calendarNotConnected-module_day_calendar_not_connected__I3L8i {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  z-index: 1;\n  position: absolute;\n}\n\n.calendarNotConnected-module_day_calendar_not_connected__I3L8i > p {\n  width: 240px;\n}\n\n.calendarNotConnected-module__background_image__AFuAt {\n  width: 100%;\n  filter: blur(8px);\n  -webkit-filter: blur(8px);\n}\n\n.calendarNotConnected-module_day_calendar_buttons__1yHhm {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n}\n\n.calendarNotConnected-module_day_calendar_not_connected_overlay__N6Fx1 {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n  visibility: visible;\n  opacity: 0.1;\n}\n";
var styles$2 = {
  "calendar_not_connected": "calendarNotConnected-module_calendar_not_connected__PrcRA",
  "calendar_buttons": "calendarNotConnected-module_calendar_buttons__-bSYC",
  "link": "calendarNotConnected-module_link__mRffk",
  "day_calendar_not_connected_container": "calendarNotConnected-module_day_calendar_not_connected_container__Xvu81",
  "day_calendar_not_connected": "calendarNotConnected-module_day_calendar_not_connected__I3L8i",
  "_background_image": "calendarNotConnected-module__background_image__AFuAt",
  "day_calendar_buttons": "calendarNotConnected-module_day_calendar_buttons__1yHhm",
  "day_calendar_not_connected_overlay": "calendarNotConnected-module_day_calendar_not_connected_overlay__N6Fx1"
};
styleInject(css_248z$2);
function _slicedToArray$4(arr, i) {
  return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$5(arr, i) || _nonIterableRest$4();
}
function _nonIterableRest$4() {
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
var CalendarNotConnected = function CalendarNotConnected(_ref) {
  _s6();
  var mode = _ref.mode,
    onCalendarReconnect = _ref.onCalendarReconnect;
  var _useState = useState(false),
    _useState2 = _slicedToArray$4(_useState, 2),
    signInClicked = _useState2[0],
    setSignInClicked = _useState2[1];
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'meetingModal.calendar.calendarNotConnected'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsx(Fragment, {
    children: mode === 'week' ? /*#__PURE__*/jsxs("div", {
      className: styles$2.calendar_not_connected,
      children: [/*#__PURE__*/jsx(Text, {
        size: "xxl",
        align: "center",
        children: t('syncBloobirds')
      }), /*#__PURE__*/jsxs("div", {
        className: styles$2.calendar_buttons,
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
        className: styles$2.link,
        children: /*#__PURE__*/jsx(Text, {
          color: "bloobirds",
          decoration: "underline",
          size: "s",
          children: t('clickAndRefresh')
        })
      })]
    }) : /*#__PURE__*/jsxs("div", {
      className: styles$2.day_calendar_not_connected_container,
      children: [/*#__PURE__*/jsx("img", {
        src: DayCalendarBackground,
        alt: 'day_calendar_background',
        className: styles$2._background_image
      }), /*#__PURE__*/jsxs("div", {
        className: styles$2.day_calendar_not_connected,
        children: [/*#__PURE__*/jsx(Text, {
          size: "xl",
          align: "center",
          weight: "bold",
          color: "peanut",
          children: t('syncBloobirds')
        }), /*#__PURE__*/jsxs("div", {
          className: styles$2.day_calendar_buttons,
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
_s6(CalendarNotConnected, "IQbXrHaS5Be5nHCMFz0/bkKoNhI=", false, function () {
  return [useTranslation];
});
_c5 = CalendarNotConnected;
var css_248z$1 = ".calendar-module_calendar_container__NpIsR {\n  position: relative;\n  display: flex;\n  overflow-y: scroll;\n  align-items: stretch;\n  max-height: calc(100% - 80px);\n}\n\n.calendar-module_calendar_timestrings_container__6r6HF {\n  height: auto;\n  flex: none;\n  display: flex;\n  align-items: flex-start;\n  min-width: 40px;\n}\n\n.calendar-module_calendar_timestring_container__k7l8p {\n  height: 40px;\n  position: relative;\n  padding-inline-end: 8px;\n  text-align: right;\n}\n\n.calendar-module_calendar_timestring_container__k7l8p:first-child .calendar-module_calendar_timestring__OBeoj {\n  display: none;\n}\n\n.calendar-module_calendar_timestring__OBeoj {\n  display: block;\n  color: #70757a;\n  font-size: 10px;\n  position: relative;\n  top: -6px;\n}\n\n.calendar-module_calendar_timestring__OBeoj > div {\n  display: flex;\n  justify-content: flex-end;\n}\n\n.calendar-module_calendar_timestrings__AAyB- {\n  position: relative;\n  background-color: #fff;\n  box-sizing: border-box;\n  margin-left: auto;\n}\n\n.calendar-module_calendar_column_headers__C0NkK {\n  display: flex;\n  margin-left: 40px;\n  margin-bottom: 4px;\n  margin-right: 12px;\n}\n\n.calendar-module_calendar_column_header__QJzIt {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n}\n\n.calendar-module_calendar_column_header_name__VEtYB {\n  font-style: normal;\n  font-weight: 400;\n  font-size: 12px;\n  line-height: 16px;\n  color: var(--peanut);\n  margin-bottom: 2px;\n}\n\n.calendar-module_calendar_column_header_name_today__-AOOS {\n  font-weight: 500;\n  color: var(--bloobirds);\n}\n\n.calendar-module_calendar_column_header_date__BXHzt {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border-radius: 100%;\n}\n\n.calendar-module_calendar_column_header_date_today__cQ8gQ {\n  background-color: var(--bloobirds);\n  color: white;\n}\n\n.calendar-module_calendar_grid_container__M73bO {\n  display: flex;\n  align-items: flex-start;\n  width: 100%;\n}\n\n.calendar-module_calendar_grid__Jd67r {\n  border-bottom: #dadce0 1px solid;\n  position: relative;\n  min-width: 100%;\n  flex: none;\n  display: inline-flex;\n  vertical-align: top;\n  overflow-x: hidden;\n}\n\n.calendar-module_calendar_grid_tiles__8oV7U {\n  z-index: 1;\n  border-top: #dadce0 1px solid;\n}\n\n.calendar-module_calendar_grid_tile__8RGwP {\n  height: 40px;\n}\n\n.calendar-module_calendar_grid_tile__8RGwP:after {\n  content: '';\n  border-bottom: #dadce0 1px solid;\n  position: absolute;\n  width: 100%;\n  margin-top: -1px;\n  z-index: 3;\n  pointer-events: none;\n}\n\n.calendar-module_calendar_grid_marker_start__Nlec3,\n.calendar-module_calendar_grid_marker_end__IdZ6j {\n  width: 8px;\n  border-inline-end: #dadce0 1px solid;\n}\n\n.calendar-module_calendar_gridcell_container__p9Vr5 {\n  position: relative;\n  width: 100%;\n  box-sizing: border-box;\n  border-right: white 1px solid;\n  overflow: visible;\n  display: flex;\n}\n\n.calendar-module_calendar_gridcell__o-KUp {\n  grid-column-gap: 3px;\n  z-index: 1;\n  position: relative;\n  height: 100%;\n  border-right: 1px solid var(--verySoftPeanut);\n  overflow: hidden;\n  box-sizing: border-box;\n  flex-grow: 1;\n  min-width: 0;\n}\n\n.calendar-module_calendar_gridcell_hidden__kHUpd {\n  position: absolute;\n  grid-column-gap: 3px;\n  height: 100%;\n  overflow: hidden;\n  box-sizing: border-box;\n  flex-grow: 1;\n  min-width: 0;\n  width: 100%;\n  z-index: 2;\n  border-color: transparent;\n  background-color: transparent;\n}\n\n.calendar-module_calendar_gridcell_weekend__cYfGw {\n  background-color: #dbdbdb2e;\n}\n.calendar-module_small_slot__Q9707 * {\n  margin-top: -1px;\n}\n\n.calendar-module_calendar_cell__HJM4n {\n  z-index: 4;\n  padding: 0 3px;\n  box-sizing: border-box;\n  overflow: hidden;\n  border-bottom-right-radius: 2px;\n  border-top-right-radius: 2px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  position: absolute;\n  color: white;\n  font-size: 11px;\n  align-items: center;\n  line-height: 12px;\n  cursor: pointer;\n}\n\n.calendar-module_calendar_cell_small__Dgttn {\n  display: inline-flex;\n  justify-content: flex-start;\n  align-items: center;\n  flex-direction: row;\n  line-height: 10px;\n  font-size: 10px;\n}\n\n.calendar-module_calendar_cell_placeholder__Ba8G7 {\n  border: 1px solid var(--bloobirds);\n  border-radius: 2px;\n  color: var(--bloobirds);\n  cursor: default;\n}\n\n.calendar-module_calendar_cell_small__Dgttn > * {\n  flex-shrink: 0;\n}\n\n.calendar-module_calendar_cell_45__mHO8w > * {\n  white-space: nowrap !important;\n  overflow: hidden !important;\n}\n\n.calendar-module_calendar_now_marker__ipjto {\n  position: absolute;\n  z-index: 504;\n  border-top: #ea4335 solid 2px;\n  right: 0;\n  left: 0;\n  pointer-events: none;\n}\n\n.calendar-module_calendar_now_marker__ipjto:after {\n  background: #ea4335;\n  border-radius: 50%;\n  content: '';\n  position: absolute;\n  height: 12px;\n  margin-inline-start: -6.5px;\n  margin-top: -7px;\n  width: 12px;\n}\n\n.calendar-module_calendar_cell__HJM4n:not(.calendar-module_calendar_cell_extended__4ddnf) .calendar-module_calendar_cell_title__ft-iB:after {\n  content: ' ';\n  margin-inline-end: 4px;\n}\n\n.calendar-module_calendar_cell_extended__4ddnf {\n  display: block;\n}\n\n.calendar-module_calendar_cell_desc__C8OTB {\n  display: none;\n}\n\n.calendar-module_calendar_cell_title__ft-iB,\n.calendar-module_calendar_cell_desc__C8OTB {\n  overflow-wrap: break-word;\n  word-wrap: break-word;\n  font-weight: bold;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Safari */ /* Konqueror HTML */\n  -moz-user-select: none; /* Old versions of Firefox */ /* Internet Explorer/Edge */\n  user-select: none; /* Non-prefixed version, currently\n                                  supported by Chrome, Edge, Opera and Firefox */\n}\n\n.calendar-module_calendar_cell_time__dBufn {\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Safari */ /* Konqueror HTML */\n  -moz-user-select: none; /* Old versions of Firefox */ /* Internet Explorer/Edge */\n  user-select: none; /* Non-prefixed version, currently\n                                  supported by Chrome, Edge, Opera and Firefox */\n}\n\n.calendar-module_event_details_container__lcC24 {\n  display: flex;\n  flex-direction: column;\n}\n\n.calendar-module_event_details_header__cEAg- {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin: 16px 16px 0 16px;\n}\n\n.calendar-module_event_details_body__R3FP8 {\n  display: flex;\n  flex-direction: column;\n  margin: 16px;\n}\n\n.calendar-module_event_details_datetime__RrDT0 {\n  display: flex;\n  margin-left: 16px;\n  margin-top: 4px;\n}\n\n.calendar-module_event_details_title__37tzp {\n  display: flex;\n  justify-content: space-between;\n  margin: 2px 16px 0 16px;\n}\n\n.calendar-module_event_details_title_name__3RB7X {\n  display: flex;\n  align-items: flex-start;\n}\n\n.calendar-module_event_details_icon__RLgv0 {\n  flex-shrink: 0;\n}\n\n.calendar-module_event_details_title_text__p0ylw {\n  margin: 4px 8px 0 8px !important;\n}\n\n.calendar-module_attendees_details__JSKl9 {\n  display: flex;\n  align-items: center;\n}\n\n.calendar-module_attendees_title__adWLc {\n  margin-left: 8px !important;\n}\n\n.calendar-module_attendees_list_container__iV47- {\n  display: flex;\n  flex-direction: column;\n  max-height: 260px;\n  overflow-y: auto;\n  margin-left: 28px;\n  padding-right: 8px;\n}\n\n.calendar-module_attendee_container__CJCh8 {\n  display: flex;\n  align-items: center;\n  margin-top: 8px;\n}\n\n.calendar-module_attendee_container__CJCh8 > * {\n  margin-right: 8px;\n}\n\n.calendar-module__invitee_card__tV-p0 {\n  display: flex;\n  align-items: center;\n  margin: 12px 0;\n}\n\n.calendar-module__invitee_info__VaUPW {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  margin-left: 8px;\n}\n\n.calendar-module__invitee_info__VaUPW > p {\n  max-width: 220px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  margin-right: 8px;\n}\n\n.calendar-module__slots_callout__ac5j1 {\n  position: absolute;\n  gap: 8px;\n  z-index: 7;\n  width: 363px !important;\n  display: flex;\n  align-items: center;\n  background-color: var(--verySoftGrape);\n  color: var(--peanut);\n  padding: 8px;\n  height: 32px !important;\n}\n\n.calendar-module__slots_callout_past__-IMe6 {\n  background-color: #ffb2c2;\n}\n\n.calendar-module__slots_callout_past__-IMe6 > svg {\n  margin-bottom: 0 !important;\n}\n\n.calendar-module__slots_callout__ac5j1 > svg {\n  width: 27px;\n  height: 27px;\n  margin-bottom: -9px;\n  margin-right: -8px !important;\n}\n\n.calendar-module__slots_callout__ac5j1 > p {\n  font-size: 11px;\n}\n\n.calendar-module__slots_callout__ac5j1 > button {\n  margin-left: auto;\n}\n\n.calendar-module_calendar_creating_slots__uVc8z {\n  cursor: grabbing;\n}\n";
var styles$1 = {
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
  "calendar_gridcell_hidden": "calendar-module_calendar_gridcell_hidden__kHUpd",
  "calendar_gridcell_weekend": "calendar-module_calendar_gridcell_weekend__cYfGw",
  "small_slot": "calendar-module_small_slot__Q9707",
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
  "_invitee_info": "calendar-module__invitee_info__VaUPW",
  "_slots_callout": "calendar-module__slots_callout__ac5j1",
  "_slots_callout_past": "calendar-module__slots_callout_past__-IMe6",
  "calendar_creating_slots": "calendar-module_calendar_creating_slots__uVc8z"
};
styleInject(css_248z$1);
function _typeof$7(obj) {
  "@babel/helpers - typeof";

  return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$7(obj);
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
var getBannerText = function getBannerText(bannerState, t) {
  switch (bannerState) {
    case BannerStates.PAST:
      return t('calendar.banner.past');
    case BannerStates.EDIT:
      return t('calendar.banner.edit');
    default:
      return t('calendar.banner.create');
  }
};
var CalendarBanner = function CalendarBanner(_ref) {
  var bannerState = _ref.bannerState,
    hideSlotsBanner = _ref.hideSlotsBanner,
    t = _ref.t;
  var isCreatingPastSlots = bannerState === BannerStates.PAST;
  return bannerState !== BannerStates.INACTIVE ? /*#__PURE__*/jsxs("div", {
    className: clsx(styles$1._slots_callout, _defineProperty$7({}, styles$1._slots_callout_past, isCreatingPastSlots)),
    children: [/*#__PURE__*/jsx(Icon, {
      name: isCreatingPastSlots ? 'alertTriangle' : 'meetingSlots',
      color: isCreatingPastSlots ? 'tomato' : 'grape',
      size: 16
    }), /*#__PURE__*/jsx(Text, {
      size: "xxs",
      color: "peanut",
      children: getBannerText(bannerState, t)
    }), /*#__PURE__*/jsx(IconButton, {
      name: "cross",
      color: "peanut",
      size: 18,
      onClick: hideSlotsBanner
    })]
  }) : null;
};
_c6 = CalendarBanner;
function _slicedToArray$3(arr, i) {
  return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$3();
}
function _nonIterableRest$3() {
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
var useMouseDelta = function useMouseDelta() {
  _s7();
  var _useState = useState(0),
    _useState2 = _slicedToArray$3(_useState, 2),
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
      } else if (e.offsetY < 180) {
        return e.offsetY;
      } else {
        return result;
      }
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
    initialPosition: initialPosition.current,
    dragging: dragging
  };
};
_s7(useMouseDelta, "/n388ZWYQ1SAfNSp/IQEGfdAEOM=");
function _typeof$6(obj) {
  "@babel/helpers - typeof";

  return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$6(obj);
}
function ownKeys$5(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$5(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) {
      _defineProperty$6(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
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
function getPxPaddingSinceMidnight(date, selectedTimezone) {
  if (!selectedTimezone) {
    var dateToUse = spacetime(date || new Date());
    return (60 * dateToUse.hour() + dateToUse.minute()) * (40 / 60);
  } else {
    var _dateToUse = spacetime(date || new Date())["goto"](selectedTimezone);
    return (60 * _dateToUse.hour() + _dateToUse.minute()) * (40 / 60);
  }
}
function getLiveEventPadding(date) {
  return (60 * date.hour() + date.minute()) * (40 / 60);
}
function createArrayOfLength(length) {
  return Array.from(Array(length)).map(function (_, i) {
    return i;
  });
}
function updatedCreatedSectionsOnDelete(createdSections, selectedEvent) {
  var updatedCreatedSections = [];
  var selectedEventStart = selectedEvent.startTime;
  var selectedEventEnd = selectedEvent.endTime;
  createdSections.forEach(function (eventBlock) {
    if (selectedEventEnd && selectedEventEnd.isBefore(eventBlock.startTime) || selectedEventStart && selectedEventStart.isAfter(eventBlock.endTime)) {
      updatedCreatedSections.push(eventBlock);
    } else {
      var reducedDuration = eventBlock.duration - selectedEvent.minuteSpan;
      if (reducedDuration < 0) {
        updatedCreatedSections.push(eventBlock);
      } else if (reducedDuration === 0) {
        return;
      } else {
        if (selectedEventStart.isEqual(eventBlock.startTime)) {
          updatedCreatedSections.push(_objectSpread$5(_objectSpread$5({}, eventBlock), {}, {
            startTime: selectedEventEnd,
            duration: reducedDuration
          }));
        } else if (selectedEventEnd.isEqual(eventBlock.endTime)) {
          updatedCreatedSections.push(_objectSpread$5(_objectSpread$5({}, eventBlock), {}, {
            endTime: selectedEventStart,
            duration: reducedDuration
          }));
        } else {
          var newDurationFirstBlock = eventBlock.startTime.diff(selectedEventStart, 'minutes');
          var newDurationSecondBlock = selectedEventEnd.diff(eventBlock.endTime, 'minutes');
          updatedCreatedSections.push(_objectSpread$5(_objectSpread$5({}, eventBlock), {}, {
            endTime: selectedEventStart,
            duration: newDurationFirstBlock
          }));
          updatedCreatedSections.push(_objectSpread$5(_objectSpread$5({}, eventBlock), {}, {
            startTime: selectedEventEnd,
            duration: newDurationSecondBlock
          }));
        }
      }
    }
  });
  return updatedCreatedSections;
}
function mergeExistingPlaceholders(createdSections, selectedPlaceholder) {
  var updatedCreatedSections = [];
  var selectedEventStart = selectedPlaceholder.startTime;
  var selectedEventEnd = selectedEventStart.add(selectedPlaceholder.duration, 'minutes');
  if ((createdSections === null || createdSections === void 0 ? void 0 : createdSections.length) === 0) {
    return [{
      duration: selectedPlaceholder.duration,
      startTime: selectedEventStart,
      endTime: selectedEventEnd,
      minuteSpan: selectedPlaceholder.minuteSpan,
      day: selectedPlaceholder.day
    }];
  }
  for (var i = 0; i < createdSections.length; i++) {
    var eventBlock = createdSections[i];
    var nextBlock = createdSections[i + 1];
    if (selectedEventStart.isBefore(eventBlock.startTime)) {
      //new event starts before
      if (selectedEventEnd.isBefore(eventBlock.startTime)) {
        //new event ends before
        updatedCreatedSections.push(selectedPlaceholder);
        updatedCreatedSections.push(eventBlock);
      } else if (selectedEventEnd.isEqual(eventBlock.startTime)) {
        //new event ends at the same time so we need to merge
        updatedCreatedSections.push(_objectSpread$5(_objectSpread$5({}, selectedPlaceholder), {}, {
          duration: selectedPlaceholder.duration + eventBlock.duration,
          endTime: eventBlock.endTime
        }));
      } else if (selectedEventEnd.isAfter(eventBlock.endTime)) {
        //new event ends after
        var numOfOverridenEvents = 1;
        while (createdSections[i + numOfOverridenEvents]) {
          if (selectedEventEnd.isAfter(createdSections[i + numOfOverridenEvents].endTime) || selectedEventEnd.isEqual(createdSections[i + numOfOverridenEvents].endTime)) {
            numOfOverridenEvents++;
          } else {
            break;
          }
        }
        if (numOfOverridenEvents > 1) {
          var overridenEvents = numOfOverridenEvents - 1;
          updatedCreatedSections.push(_objectSpread$5(_objectSpread$5({}, selectedPlaceholder), {}, {
            duration: selectedPlaceholder.duration + eventBlock.duration + createdSections[i + overridenEvents].duration,
            endTime: createdSections[i + overridenEvents].endTime
          }));
          i += overridenEvents;
        } else {
          updatedCreatedSections.push(selectedPlaceholder);
        }
      } else if (selectedEventEnd.isBefore(eventBlock.endTime)) {
        //new event ends before
        var timeDifference = Math.abs(selectedEventEnd.diff(eventBlock.endTime, 'minutes'));
        var usableTime = Math.floor(timeDifference / eventBlock.minuteSpan) * eventBlock.minuteSpan;
        updatedCreatedSections.push(selectedPlaceholder);
        updatedCreatedSections.push(_objectSpread$5(_objectSpread$5({}, eventBlock), {}, {
          duration: usableTime,
          startTime: eventBlock.endTime.subtract(usableTime, 'minutes')
        }));
      }
    } else if (selectedEventStart.isEqual(eventBlock.startTime)) {
      //new event starts at the same time
      if (selectedEventEnd.isBefore(eventBlock.startTime)) {
        //new event ends before
        updatedCreatedSections.push(eventBlock);
      } else if (selectedEventEnd.isAfter(eventBlock.endTime)) {
        //new event ends after
        updatedCreatedSections.push(selectedPlaceholder);
      }
    } else {
      //new event starts after
      if (selectedEventStart.isEqual(eventBlock.endTime)) {
        //new event starts at the same time so we need to merge
        if (nextBlock && selectedEventEnd.isEqual(nextBlock.startTime)) {
          updatedCreatedSections.push(_objectSpread$5(_objectSpread$5({}, selectedPlaceholder), {}, {
            duration: selectedPlaceholder.duration + eventBlock.duration + nextBlock.duration,
            startTime: eventBlock.startTime,
            endTime: nextBlock.endTime
          }));
          i++;
        } else {
          updatedCreatedSections.push(_objectSpread$5(_objectSpread$5({}, eventBlock), {}, {
            duration: selectedPlaceholder.duration + eventBlock.duration,
            endTime: selectedPlaceholder.endTime
          }));
        }
      } else {
        updatedCreatedSections.push(eventBlock);
        updatedCreatedSections.push(selectedPlaceholder);
      }
    }
  }
  return updatedCreatedSections;
}
var isSlotCreated = function isSlotCreated(events, startDate) {
  return events === null || events === void 0 ? void 0 : events.some(function (section) {
    return startDate.isAfter(section.startTime) && startDate.isBefore(section.endTime);
  });
};
function _typeof$5(obj) {
  "@babel/helpers - typeof";

  return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$5(obj);
}
function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$3(arr) || _nonIterableSpread$1();
}
function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$3(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen);
}
function _iterableToArray$1(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$1(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$3(arr);
}
function _arrayLikeToArray$3(arr, len) {
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
      _defineProperty$5(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
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
var getColors = function getColors(event) {
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
  } else if ((event === null || event === void 0 ? void 0 : event.type) === 'dragging') {
    return {
      backgroundColor: 'white',
      barColor: (event === null || event === void 0 ? void 0 : event.barColor) || 'bloobirds'
    };
  }
};
function SlotsDisplay(_ref) {
  var event = _ref.event;
  return /*#__PURE__*/jsxs("div", {
    style: {
      display: 'flex',
      height: '100%',
      width: '100%',
      gap: '4px'
    },
    children: [/*#__PURE__*/jsx("div", {
      style: {
        backgroundColor: 'var(--verySoftGrape)',
        width: '22px'
      }
    }), /*#__PURE__*/jsx("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: 'inherit'
      },
      children: createArrayOfLength(Math.floor(event.duration / event.minuteSpan)).map(function (index) {
        return /*#__PURE__*/jsx("div", {
          style: {
            borderRadius: '4px',
            color: 'black',
            height: event.minuteSpan * 40 / 60 + 'px',
            backgroundColor: 'var(--softGrape)',
            borderBottom: '2px solid white'
          }
        }, index);
      })
    })]
  });
}
_c7 = SlotsDisplay;
function DraggingBlock(_ref2) {
  _s8();
  var _getColors;
  var startDatetimeSpaceTime = _ref2.startDatetimeSpaceTime,
    event = _ref2.event,
    calculatePosition = _ref2.calculatePosition,
    height = _ref2.height,
    width = _ref2.width,
    left = _ref2.left,
    zIndex = _ref2.zIndex;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var isPastEvent = spacetime.now().isAfter(startDatetimeSpaceTime);
  var cellClassName = clsx(styles$1.calendar_cell, _defineProperty$5(_defineProperty$5(_defineProperty$5({}, styles$1.calendar_cell_small, height < 29), styles$1.calendar_cell_45, height >= 29 && height < 39), styles$1.calendar_cell_placeholder, event.type === 'placeholder'));
  return /*#__PURE__*/jsx("div", {
    className: cellClassName,
    style: {
      cursor: 'grabbing',
      top: calculatePosition + 'px',
      height: height,
      width: width,
      left: left,
      backgroundColor: "var(--".concat((_getColors = getColors(event)) === null || _getColors === void 0 ? void 0 : _getColors.backgroundColor, ")"),
      border: isPastEvent ? '1px var(--tomato) dashed' : '1px rgba(66,218,156) dashed',
      borderRadius: '4px',
      zIndex: zIndex,
      boxShadow: '0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%), 0px 3px 5px -1px rgb(0 0 0 / 20%)',
      padding: '4px 4px 3px'
    },
    children: isPastEvent ? /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsx("div", {
        className: styles$1.calendar_cell_title,
        children: t('calendar.cannotCreatePastSlots')
      }), /*#__PURE__*/jsx("div", {
        className: styles$1.calendar_cell_time,
        children: t('calendar.selectTimeBelow')
      })]
    }) : /*#__PURE__*/jsx(SlotsDisplay, {
      event: event
    })
  });
}
_s8(DraggingBlock, "t/1iBAGEdX8rDM6vi/jYf+ryVbo=", false, function () {
  return [useTranslation];
});
_c8 = DraggingBlock;
function SolidBlock(_ref3) {
  _s9();
  var _event$participants, _getColors2, _getColors3;
  var selectedTimezone = _ref3.selectedTimezone,
    startDatetimeSpaceTime = _ref3.startDatetimeSpaceTime,
    event = _ref3.event,
    calculatePosition = _ref3.calculatePosition,
    height = _ref3.height,
    width = _ref3.width,
    left = _ref3.left,
    zIndex = _ref3.zIndex;
  var cellClassName = clsx(styles$1.calendar_cell, _defineProperty$5(_defineProperty$5(_defineProperty$5({}, styles$1.calendar_cell_small, height < 29), styles$1.calendar_cell_45, height >= 29 && height < 39), styles$1.calendar_cell_placeholder, event.type === 'placeholder'));
  var _useTranslation2 = useTranslation(),
    t = _useTranslation2.t,
    language = _useTranslation2.i18n.language;
  var timeSlot = "".concat(startDatetimeSpaceTime.format('time'), " -\n                ").concat(startDatetimeSpaceTime.add(event.duration, 'minute').format('time'));
  var topPosition = calculatePosition - height / 2 + 'px';
  var endTime = getI18nSpacetimeLng(language, event.endTime, selectedTimezone || getUserTimeZone());
  var participantsWithOrganizer = event === null || event === void 0 ? void 0 : (_event$participants = event.participants) === null || _event$participants === void 0 ? void 0 : _event$participants.map(function (participant) {
    var _event$owner, _event$owner$replaceA;
    var ownerEmail = event === null || event === void 0 ? void 0 : (_event$owner = event.owner) === null || _event$owner === void 0 ? void 0 : (_event$owner$replaceA = _event$owner.replaceAll(/[<>]/gi, '')) === null || _event$owner$replaceA === void 0 ? void 0 : _event$owner$replaceA.trim();
    var isOwner = (participant === null || participant === void 0 ? void 0 : participant.email) === ownerEmail;
    return isOwner ? _objectSpread$4(_objectSpread$4({}, participant), {}, {
      type: 'Organizer'
    }) : participant;
  });
  var orderedParticipants = participantsWithOrganizer === null || participantsWithOrganizer === void 0 ? void 0 : participantsWithOrganizer.reduce(function (acc, invitee) {
    if ((invitee === null || invitee === void 0 ? void 0 : invitee.type) === 'Organizer') {
      return [invitee].concat(_toConsumableArray$1(acc));
    }
    return [].concat(_toConsumableArray$1(acc), [invitee]);
  }, []);
  var _useVisible = useVisible(),
    ref = _useVisible.ref,
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
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
        height: height - 1,
        width: width,
        left: left,
        backgroundColor: "var(--".concat((_getColors2 = getColors(event)) === null || _getColors2 === void 0 ? void 0 : _getColors2.backgroundColor, ")"),
        borderLeft: "2px solid var(--".concat((_getColors3 = getColors(event)) === null || _getColors3 === void 0 ? void 0 : _getColors3.barColor, ")"),
        zIndex: visible ? 10 : zIndex,
        boxShadow: visible ? '0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%), 0px 3px 5px -1px rgb(0 0 0 / 20%)' : null
      },
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        return event.type !== 'placeholder' && setVisible(true);
      },
      children: [/*#__PURE__*/jsx("div", {
        className: styles$1.calendar_cell_title,
        children: event.title
      }), /*#__PURE__*/jsx("div", {
        className: styles$1.calendar_cell_time,
        children: timeSlot
      })]
    }),
    children: /*#__PURE__*/jsxs("div", {
      className: styles$1.event_details_container,
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
      },
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$1.event_details_header,
        children: [/*#__PURE__*/jsxs("div", {
          className: styles$1.event_details_title_name,
          children: [/*#__PURE__*/jsx(Icon, {
            name: "calendar",
            color: "tomato",
            size: 32,
            className: styles$1.event_details_icon
          }), /*#__PURE__*/jsx(Text, {
            className: styles$1.event_details_title_text,
            children: (event === null || event === void 0 ? void 0 : event.title) || t('calendar.events.noTitle')
          })]
        }), /*#__PURE__*/jsx(IconButton, {
          name: "cross",
          size: 16,
          onClick: function onClick() {
            return setVisible(false);
          }
        })]
      }), /*#__PURE__*/jsx("div", {
        className: styles$1.event_details_title,
        children: /*#__PURE__*/jsxs(Text, {
          size: "m",
          children: [toTitleCase(startDatetimeSpaceTime.dayName()), ", ", startDatetimeSpaceTime.date(), ' ', toTitleCase(startDatetimeSpaceTime.monthName()), " \xB7", ' ', startDatetimeSpaceTime.format('time'), " - ", endTime.format('time')]
        })
      }), /*#__PURE__*/jsxs("div", {
        className: styles$1.event_details_body,
        children: [/*#__PURE__*/jsxs("span", {
          className: styles$1.attendees_details,
          children: [/*#__PURE__*/jsx(Icon, {
            name: "people",
            color: "softPeanut"
          }), /*#__PURE__*/jsx(Text, {
            size: "s",
            className: styles$1.attendees_title,
            children: t('calendar.events.attendee', {
              count: (orderedParticipants === null || orderedParticipants === void 0 ? void 0 : orderedParticipants.length) || 0
            })
          })]
        }), /*#__PURE__*/jsx("div", {
          className: styles$1.attendees_list_container,
          children: orderedParticipants === null || orderedParticipants === void 0 ? void 0 : orderedParticipants.map(function (participant) {
            return /*#__PURE__*/jsx(InviteeCard, {
              invitee: participant,
              readOnly: true,
              shouldShowStatus: true
            }, participant === null || participant === void 0 ? void 0 : participant.email);
          })
        })]
      })]
    })
  });
}
_s9(SolidBlock, "pKRMDamICR+++qoyIgJz/vTiMfs=", false, function () {
  return [useTranslation, useVisible];
});
_c9 = SolidBlock;
function LiveEventBlock(_ref4) {
  _s10();
  var selectedTimezone = _ref4.selectedTimezone,
    dailyLiveEvents = _ref4.event,
    zIndex = _ref4.zIndex;
  var _useCalendarContext = useCalendarContext(),
    deleteLiveEvent = _useCalendarContext.deleteLiveEvent,
    calendarSlotsVisible = _useCalendarContext.slotsData.calendarSlotsVisible;
  var language = useTranslation().i18n.language;
  return /*#__PURE__*/jsx(Fragment, {
    children: dailyLiveEvents.map(function (liveEvent, idx) {
      var _liveEvent$endTime;
      var startDatetimeSpaceTime = getI18nSpacetimeLng(language, liveEvent.startTime, selectedTimezone || getUserTimeZone());
      var width = liveEvent.collisions > 0 ? "calc(".concat(95.0 / (liveEvent.collisions + 1) + '%', " + ").concat(liveEvent.collisions * 8, "px)") : '98%';
      var eventHeight = Math.floor(liveEvent.minuteSpan * 40 /
      //  - 60 / liveEvent.minuteSpan)
      60);
      if (liveEvent.type !== 'dragging') return null;
      var timeSlot = "".concat(startDatetimeSpaceTime.format('time'), " -\n                ").concat(startDatetimeSpaceTime.add(liveEvent.minuteSpan, 'minute').format('time'));
      return /*#__PURE__*/jsx("div", {
        style: {
          position: 'absolute',
          top: liveEvent.paddingTop + 'px',
          display: 'flex',
          flexDirection: 'column',
          width: '320px'
        },
        children: liveEvent.minuteSpan && /*#__PURE__*/jsxs("div", {
          style: {
            height: eventHeight,
            borderBottom: '1px solid var(--white)',
            padding: '0 4px',
            width: width,
            backgroundColor: 'var(--verySoftGrape)',
            borderLeft: '2px solid var(--grape)',
            zIndex: zIndex,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            WebkitUserSelect: 'none',
            userSelect: 'none'
          },
          className: clsx(_defineProperty$5({}, styles$1.small_slot, liveEvent.minuteSpan === 15)),
          children: [/*#__PURE__*/jsx(Text, {
            size: liveEvent.minuteSpan === 15 ? 'xxxs' : 'xxs',
            color: "peanut",
            children: timeSlot
          }), calendarSlotsVisible && /*#__PURE__*/jsx(IconButton, {
            name: "cross",
            size: liveEvent.minuteSpan === 15 ? 10 : 12,
            color: "peanut",
            onClick: function onClick(e) {
              e.preventDefault();
              e.stopPropagation();
              deleteLiveEvent(liveEvent.day, liveEvent.id);
              mixpanel.track(MIXPANEL_EVENTS.REMOVE_CALENDAR_SLOT);
            }
          })]
        }, "slot-".concat(timeSlot, "-").concat(idx))
      }, "slot-".concat(liveEvent.startTime.format('time'), "-").concat((_liveEvent$endTime = liveEvent.endTime) === null || _liveEvent$endTime === void 0 ? void 0 : _liveEvent$endTime.format('time'), "-").concat(idx));
    })
  });
}
_s10(LiveEventBlock, "91ZjbDgBsAKPMQkNitsj4+vT8LM=", false, function () {
  return [useCalendarContext, useTranslation];
});
_c10 = LiveEventBlock;
var CalendarEvent = /*#__PURE__*/_s11(React.memo(_c11 = _s11(function (_ref5) {
  _s11();
  var _spacetime;
  var event = _ref5.event,
    selectedTimezone = _ref5.selectedTimezone,
    type = _ref5.type;
  var _useTranslation3 = useTranslation(),
    language = _useTranslation3.i18n.language;
  var initialEvent = Array.isArray(event) ? event[0] : event;
  if (!initialEvent) return null;
  var startDatetimeSpaceTime = (_spacetime = spacetime(initialEvent.startTime)) === null || _spacetime === void 0 ? void 0 : _spacetime["goto"](selectedTimezone || getUserTimeZone());
  var calculatePosition = getPxPaddingSinceMidnight(selectedTimezone ? getI18nSpacetimeLng(language, startDatetimeSpaceTime, selectedTimezone || getUserTimeZone()) : startDatetimeSpaceTime);
  var height = initialEvent.duration * (40 / 60);
  var width = initialEvent.collisions > 0 ? "calc(".concat(95.0 / (initialEvent.collisions + 1) + '%', " + ").concat(initialEvent.collisions * 8, "px)") : '95%';
  var left = "calc(".concat(initialEvent.collisionNumber / (initialEvent.collisions + 1) * 100 + '%', " - ").concat(initialEvent.collisionNumber > 0 ? initialEvent.collisionNumber * 8 : 0, "px)");
  var zIndex = type === 'placeholderEvent' ? 10 : 5;
  switch (type) {
    case 'liveEvent':
      return /*#__PURE__*/jsx(LiveEventBlock, {
        selectedTimezone: selectedTimezone,
        event: event,
        zIndex: zIndex
      });
    case 'placeholderEvent':
      return /*#__PURE__*/jsx(DraggingBlock, {
        startDatetimeSpaceTime: getI18nSpacetimeLng(language, startDatetimeSpaceTime, selectedTimezone || getUserTimeZone()),
        event: event,
        calculatePosition: calculatePosition,
        height: height,
        width: width,
        left: left,
        zIndex: zIndex
      });
    default:
    case 'settledEvent':
      return /*#__PURE__*/jsx(SolidBlock, {
        startDatetimeSpaceTime: startDatetimeSpaceTime,
        event: event,
        calculatePosition: calculatePosition,
        height: height,
        width: width,
        left: left,
        zIndex: zIndex,
        selectedTimezone: selectedTimezone
      });
  }
}, "XSswhAI0O3hGlmM1meoH7BdC2gY=", false, function () {
  return [useTranslation];
})), "XSswhAI0O3hGlmM1meoH7BdC2gY=", false, function () {
  return [useTranslation];
});
_c12 = CalendarEvent;
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
var CalendarColumn = function CalendarColumn(_ref) {
  _s12();
  var _mouseDelta$dragging, _events$day, _liveEvents$day$;
  var day = _ref.day,
    events = _ref.events,
    hourMarkerRef = _ref.hourMarkerRef,
    selectedTimezone = _ref.selectedTimezone;
  var mouseDelta = useMouseDelta();
  var _useCalendarContext = useCalendarContext(),
    eventPlaceholder = _useCalendarContext.eventPlaceholder,
    createPlaceholder = _useCalendarContext.createPlaceholder,
    liveEvents = _useCalendarContext.liveEvents,
    calendarSlotsVisible = _useCalendarContext.slotsData.calendarSlotsVisible,
    createQuickLiveEvent = _useCalendarContext.createQuickLiveEvent,
    clickedOnPastDate = _useCalendarContext.clickedOnPastDate,
    settlePlaceholder = _useCalendarContext.settlePlaceholder,
    slotDuration = _useCalendarContext.slotDuration;
  var currentTimePadding = getPxPaddingSinceMidnight(null, selectedTimezone);
  var dayNumber = spacetime(day).format('day-number');
  var isWeekend = dayNumber === '6' || dayNumber === '';
  var columnClasses = clsx(styles$1.calendar_gridcell, _defineProperty$4(_defineProperty$4({}, styles$1.calendar_gridcell_weekend, isWeekend), styles$1.calendar_creating_slots, (mouseDelta === null || mouseDelta === void 0 ? void 0 : (_mouseDelta$dragging = mouseDelta.dragging) === null || _mouseDelta$dragging === void 0 ? void 0 : _mouseDelta$dragging.current) && calendarSlotsVisible));
  var _useTranslation = useTranslation(),
    language = _useTranslation.i18n.language;
  useEffect(function () {
    if (calendarSlotsVisible) {
      if ((mouseDelta === null || mouseDelta === void 0 ? void 0 : mouseDelta.delta) === 0) return;
      var placeholderDatetime = getTimeFromOffset(mouseDelta.initialPosition, getI18nSpacetimeLng(language, day, selectedTimezone || getUserTimeZone()));
      var placeholderDuration = getDurationFromOffset(mouseDelta.delta);
      if (placeholderDuration < 0) {
        placeholderDatetime = spacetime(placeholderDatetime)["goto"](selectedTimezone || getUserTimeZone()).subtract(-placeholderDuration, 'minute').format('iso-utc');
        placeholderDuration = -placeholderDuration;
      }
      if (typeof createPlaceholder === 'function') {
        createPlaceholder(placeholderDatetime, placeholderDuration, 'dragging');
      }
      if (spacetime(placeholderDatetime).isBefore(new Date())) {
        clickedOnPastDate();
      }
    }
  }, [mouseDelta === null || mouseDelta === void 0 ? void 0 : mouseDelta.delta, mouseDelta === null || mouseDelta === void 0 ? void 0 : mouseDelta.initialPosition]);
  function handleCalendarClick(event) {
    var element = event.target;
    if ((element === null || element === void 0 ? void 0 : element.tagName) !== 'DIV') return;
    var div = this.getBoundingClientRect();
    var mouseY = event.clientY - div.top;
    var startTime = getTimeFromOffset(mouseY, getI18nSpacetimeLng(language, day, selectedTimezone || getUserTimeZone()));
    var isPastEvent = spacetime(startTime).isBefore(new Date());
    if (isPastEvent) {
      return clickedOnPastDate();
    }
    createQuickLiveEvent({
      initialPosition: mouseY
    }, day);
  }
  useEffect(function () {
    if (mouseDelta.ref.current && calendarSlotsVisible) {
      mouseDelta.ref.current.addEventListener('click', handleCalendarClick);
    }
    return function () {
      var _mouseDelta$ref$curre;
      (_mouseDelta$ref$curre = mouseDelta.ref.current) === null || _mouseDelta$ref$curre === void 0 ? void 0 : _mouseDelta$ref$curre.removeEventListener('click', handleCalendarClick);
    };
    //TODO check if this can be done without depending on liveEvents
  }, [mouseDelta.ref.current, calendarSlotsVisible, liveEvents, slotDuration]);
  return /*#__PURE__*/jsxs("div", {
    className: columnClasses,
    onMouseUp: function onMouseUp(event) {
      mouseDelta.dragging.current = false;
      settlePlaceholder(event);
    },
    children: [/*#__PURE__*/jsx("div", {
      className: styles$1.calendar_gridcell_hidden,
      ref: mouseDelta.ref
    }), isToday(day, selectedTimezone || getUserTimeZone()) && /*#__PURE__*/jsx("div", {
      className: styles$1.calendar_now_marker,
      ref: hourMarkerRef,
      style: {
        top: currentTimePadding + 'px'
      }
    }), (_events$day = events[day]) === null || _events$day === void 0 ? void 0 : _events$day.map(function (event) {
      return /*#__PURE__*/jsx(CalendarEvent, {
        type: "settledEvent",
        event: event,
        selectedTimezone: selectedTimezone
      }, event.id + (event === null || event === void 0 ? void 0 : event.calendarId));
    }), (eventPlaceholder === null || eventPlaceholder === void 0 ? void 0 : eventPlaceholder.day) === day && /*#__PURE__*/jsx(CalendarEvent, {
      type: "placeholderEvent",
      event: eventPlaceholder,
      selectedTimezone: selectedTimezone
    }, eventPlaceholder.startTime.format('time')), (liveEvents === null || liveEvents === void 0 ? void 0 : liveEvents[day]) && /*#__PURE__*/jsx(CalendarEvent, {
      type: "liveEvent",
      event: liveEvents[day],
      selectedTimezone: selectedTimezone
    }, (_liveEvents$day$ = liveEvents[day][0]) === null || _liveEvents$day$ === void 0 ? void 0 : _liveEvents$day$.startTime.format('time'))]
  }, "column-".concat(day));
};
_s12(CalendarColumn, "DEDxXAtMDoxFgrEr98NOXDBo8X0=", false, function () {
  return [useMouseDelta, useCalendarContext, useTranslation];
});
_c13 = CalendarColumn;
function _typeof$3(obj) {
  "@babel/helpers - typeof";

  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$3(obj);
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
      _defineProperty$3(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
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
var ESP_Dates = {
  days: {
    "long": ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    "short": ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']
  },
  months: {
    "long": ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    "short": ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  }
};
var ENG_Dates = {
  days: {
    "long": ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    "short": ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  },
  months: {
    "long": ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
    "short": ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
  }
};
var TranslationDropdown = function TranslationDropdown(_ref) {
  _s13();
  var language = _ref.language,
    setLanguage = _ref.setLanguage;
  var _useVisible = useVisible(),
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var languages = ['en', 'es'];
  useEffect(function () {
    var _window$navigator$lan;
    if ((_window$navigator$lan = window.navigator.language) !== null && _window$navigator$lan !== void 0 && _window$navigator$lan.includes('es')) {
      setLanguage('es');
    }
  }, []);
  useEffect(function () {
    if (language === 'es') {
      spacetime.now().i18n(_objectSpread$3(_objectSpread$3({}, ESP_Dates), {}, {
        useTitleCase: true // automatically in .format()
      }));
    } else {
      spacetime.now().i18n(_objectSpread$3(_objectSpread$3({}, ENG_Dates), {}, {
        useTitleCase: true // automatically in .format()
      }));
    }
  }, [language]);
  return /*#__PURE__*/jsx(Dropdown, {
    position: "top",
    visible: visible,
    anchor: /*#__PURE__*/jsx(Button, {
      variant: "secondary",
      size: "small",
      uppercase: false,
      onClick: function onClick() {
        return setVisible(!visible);
      },
      children: /*#__PURE__*/jsx(Icon, {
        name: "language"
      })
    }),
    children: /*#__PURE__*/jsxs("div", {
      style: {
        width: '321px',
        height: '175px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '24px',
        gap: '8px',
        boxSizing: 'border-box'
      },
      children: [/*#__PURE__*/jsx(Text, {
        size: "m",
        color: "peanut",
        children: t('languages.selectALanguage')
      }), /*#__PURE__*/jsx("div", {
        style: {
          display: 'flex',
          flexDirection: 'column'
        },
        children: languages.map(function (lng) {
          return /*#__PURE__*/jsx(Radio, {
            size: "small",
            value: lng,
            checked: language === lng,
            onClick: function onClick() {
              return setLanguage(lng);
            },
            children: t("languages.".concat(lng))
          }, lng);
        })
      }), /*#__PURE__*/jsxs("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        },
        onClick: function onClick() {
          return setVisible(false);
        },
        children: [/*#__PURE__*/jsx(Icon, {
          name: "save",
          color: "bloobirds",
          size: 16
        }), /*#__PURE__*/jsx(Text, {
          size: "m",
          color: "bloobirds",
          children: t('common.save')
        })]
      })]
    })
  });
};
_s13(TranslationDropdown, "yGgGP9er72YqIfRZWCELi+cTdDU=", false, function () {
  return [useVisible, useTranslation];
});
_c14 = TranslationDropdown;
var css_248z = ".slotsForm-module_slotsForm__fjWoD {\n  display: flex;\n  padding: 16px 0 8px 0;\n  flex-direction: column;\n  gap: 8px;\n  max-height: 700px;\n  z-index: 1;\n  box-shadow: 0 -24px 24px -36px rgba(115,115,115,0.75);\n  -webkit-box-shadow: 0 -24px 24px -36px rgba(115,115,115,0.75);\n  border-top: 4px solid var(--verySoftGrape);\n}\n\n.slotsForm-module_slotsFormHeader__7V0Td{\n  display: flex;\n  justify-content: space-between;\n}\n\n.slotsForm-module_slotsFormBody__g0tbv {\n  display: flex;\n  flex-direction: column;\n  padding: 0 4px;\n  gap: 8px;\n  height: 179px;\n  transition: height ease-in-out 0.5s;\n}\n\n.slotsForm-module_slotsFormBodyHidden__2zO8A {\n  height: 28px;\n}\n\n.slotsForm-module_formTitle__28WBG{\n  display: flex;\n  align-items: center;\n}\n\n.slotsForm-module_arrowButton__uM3Ow {\n  margin-right: 4px;\n  height: 24px;\n  width: 24px;\n  border-radius: 50%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  background-color: #F6FAFD;\n}\n\n.slotsForm-module_arrowButton__uM3Ow:hover{\n  background-color: #F6FAFD;\n}\n\n.slotsForm-module_sectionHeader__0VJri{\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  width: 100%;\n}\n\n\n.slotsForm-module_slotsFormBody__g0tbv input::-moz-placeholder{\n  color: var(--softPeanut) !important;\n}\n\n\n.slotsForm-module_slotsFormBody__g0tbv input::placeholder{\n  color: var(--softPeanut) !important;\n}\n\n.slotsForm-module_timeSelector__QNrF4 {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n\n.slotsForm-module_timeSlotForm__25PcY {\n  padding: 4px;\n  border-radius: 8px;\n  background-color: #F6FAFD;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  overflow-y: scroll;\n  height: 100%;\n  transition: height ease-in-out 0.5s, padding ease-in-out 0.5s;\n}\n\n.slotsForm-module_timeSlotFormHidden__B-NQq {\n  height: 0;\n  padding: 0;\n}\n\n.slotsForm-module_slotsFormFooter__-rL3l {\n  height: 32px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 8px;\n}\n\n.slotsForm-module_slotsFormFooter__-rL3l > div {\n  height: 24px;\n}\n\n.slotsForm-module_slotsFormFooter__-rL3l button {\n  height: 24px;\n}\n\n.slotsForm-module_footerRight__Xxb61{\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n}\n\n.slotsForm-module_footerRight__Xxb61 > div {\n  height: 24px;\n}\n\n.slotsForm-module_footerRight__Xxb61 button:first-child {\n  padding: 3px 7px;\n}\n\n.slotsForm-module_footerRight__Xxb61 button:first-child > svg{\n  margin: 9px -8px 0 0;\n}\n\n.slotsForm-module_modalContent__Js-J6{\n  padding: 28px 46px;\n}\n\n.slotsForm-module_parsedSlots__tArV0 {\n  border-radius: 4px;\n  padding: 8px 16px;\n  display: flex;\n  flex-direction: column;\n  min-height: 96px;\n  height: 100%;\n  overflow-y: scroll;\n}\n\n.slotsForm-module_parsedSlots__tArV0 > ul {\n  padding: 0;\n  margin: 0 0 0 16px;\n  line-height: 12px;\n}\n";
var styles = {
  "slotsForm": "slotsForm-module_slotsForm__fjWoD",
  "slotsFormHeader": "slotsForm-module_slotsFormHeader__7V0Td",
  "slotsFormBody": "slotsForm-module_slotsFormBody__g0tbv",
  "slotsFormBodyHidden": "slotsForm-module_slotsFormBodyHidden__2zO8A",
  "formTitle": "slotsForm-module_formTitle__28WBG",
  "arrowButton": "slotsForm-module_arrowButton__uM3Ow",
  "sectionHeader": "slotsForm-module_sectionHeader__0VJri",
  "timeSelector": "slotsForm-module_timeSelector__QNrF4",
  "timeSlotForm": "slotsForm-module_timeSlotForm__25PcY",
  "timeSlotFormHidden": "slotsForm-module_timeSlotFormHidden__B-NQq",
  "slotsFormFooter": "slotsForm-module_slotsFormFooter__-rL3l",
  "footerRight": "slotsForm-module_footerRight__Xxb61",
  "modalContent": "slotsForm-module_modalContent__Js-J6",
  "parsedSlots": "slotsForm-module_parsedSlots__tArV0"
};
styleInject(css_248z);
function _typeof$2(obj) {
  "@babel/helpers - typeof";

  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$2(obj);
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
var ConfirmationModal = function ConfirmationModal(_ref) {
  _s14();
  var open = _ref.open,
    handleClose = _ref.handleClose,
    handleCancel = _ref.handleCancel;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs(Modal, {
    width: 600,
    open: open,
    onClose: handleCancel,
    children: [/*#__PURE__*/jsxs(ModalHeader, {
      variant: "primary",
      children: [/*#__PURE__*/jsxs(ModalTitle, {
        size: "small",
        color: "veryLightBloobirds",
        children: [/*#__PURE__*/jsx(Icon, {
          name: "cross",
          className: styles._icon,
          color: "peanut"
        }), /*#__PURE__*/jsx(Text, {
          size: "m",
          inline: true,
          children: t('calendar.events.close')
        })]
      }), /*#__PURE__*/jsx(ModalCloseIcon, {
        color: "black",
        size: "small",
        onClick: handleCancel
      })]
    }), /*#__PURE__*/jsx(ModalContent, {
      className: styles.modalContent,
      children: /*#__PURE__*/jsx(Text, {
        size: "m",
        align: "center",
        children: /*#__PURE__*/jsx(Trans, {
          i18nKey: "calendar.events.closeConfirmation"
        })
      })
    }), /*#__PURE__*/jsxs(ModalFooter, {
      children: [/*#__PURE__*/jsx(Button, {
        variant: "tertiary",
        onClick: handleCancel,
        color: "bloobirds",
        children: t('common.cancel')
      }), /*#__PURE__*/jsx(Button, {
        variant: "primary",
        color: "tomato",
        onClick: handleClose,
        children: t('common.close')
      })]
    })]
  });
};
_s14(ConfirmationModal, "t/1iBAGEdX8rDM6vi/jYf+ryVbo=", false, function () {
  return [useTranslation];
});
_c15 = ConfirmationModal;
function ParsedSlots(_ref2) {
  _s15();
  var liveEvents = _ref2.liveEvents,
    language = _ref2.language,
    selectedTimezone = _ref2.selectedTimezone;
  var allTimeZones = useTimeZones();
  var _useTranslation2 = useTranslation(),
    t = _useTranslation2.t;
  var orderedEvents = liveEvents && Object.entries(liveEvents || {}).reduce(function (acc, _ref3) {
    var _ref4 = _slicedToArray$2(_ref3, 2),
      day = _ref4[0],
      dayEvents = _ref4[1];
    var sortedDays = dayEvents.sort(function (a, b) {
      var aDate = spacetime(a.startTime);
      var bDate = spacetime(b.startTime);
      return aDate.isBefore(bDate) ? -1 : 1;
    });
    return _objectSpread$2(_objectSpread$2({}, acc), {}, _defineProperty$2({}, day, sortedDays));
  }, {});
  var isSpanish = language === 'es';
  var formatString = isSpanish ? '{day-short}, {date-pad} {month-short}' : '{day-short} {date-pad}, {month-short}';
  var idSlots = 0;
  return /*#__PURE__*/jsx("div", {
    className: styles.parsedSlots,
    id: "slots-block",
    children: !liveEvents || Object.values(liveEvents).flatMap(function (e) {
      return e;
    }).length === 0 ? /*#__PURE__*/jsx(Text, {
      size: "s",
      color: "softPeanut",
      children: t('calendar.description')
    }) : /*#__PURE__*/jsx(Fragment, {
      children: Object.entries(orderedEvents).map(function (_ref5) {
        var _dayEvents$, _dayEvents$2, _dayEvents$3;
        var _ref6 = _slicedToArray$2(_ref5, 2),
          dayEvents = _ref6[1];
        var dayString = ((_dayEvents$ = dayEvents[0]) === null || _dayEvents$ === void 0 ? void 0 : _dayEvents$.startTime) && spacetime(dayEvents[0].startTime).format('iso-utc');
        return dayEvents && dayEvents.length > 0 && /*#__PURE__*/jsxs(Fragment$1, {
          children: [/*#__PURE__*/jsx(Text, {
            size: "xs",
            color: "peanut",
            weight: "bold",
            children: ((_dayEvents$3 = dayEvents[0]) === null || _dayEvents$3 === void 0 ? void 0 : _dayEvents$3.startTime) && spacetime(dayEvents[0].startTime).format(formatString)
          }), dayEvents.flatMap(function (e) {
            return e;
          }).map(function (event) {
            var _allTimeZones$find;
            var startDate = spacetime(event.startTime)["goto"](selectedTimezone || getUserTimeZone());
            var linkProps = _defineProperty$2({
              id: "slots-link-".concat(event.id)
            }, 'data-slot-' + idSlots, true);
            idSlots++;
            return /*#__PURE__*/jsx("a", _objectSpread$2(_objectSpread$2({}, linkProps), {}, {
              children: /*#__PURE__*/jsx(Text, {
                color: "bloobirds",
                size: "xs",
                children: startDate.format(isSpanish ? 'time-24' : 'time') + ' - ' + startDate["goto"](selectedTimezone || getUserTimeZone()).add(event === null || event === void 0 ? void 0 : event.minuteSpan, 'minute').format(isSpanish ? 'time-24' : 'time') + ' (' + (allTimeZones === null || allTimeZones === void 0 ? void 0 : (_allTimeZones$find = allTimeZones.find(function (_ref7) {
                  var abbreviation = _ref7.abbreviation,
                    location = _ref7.location;
                  return abbreviation === selectedTimezone || location === selectedTimezone;
                })) === null || _allTimeZones$find === void 0 ? void 0 : _allTimeZones$find.abbreviation) + ')'
              })
            }), event.id);
          })]
        }, ((_dayEvents$2 = dayEvents[0]) === null || _dayEvents$2 === void 0 ? void 0 : _dayEvents$2.startTime) && dayString);
      })
    })
  });
}
_s15(ParsedSlots, "f5ZlW48wY/iwqTePSet5aGODMo4=", false, function () {
  return [useTimeZones, useTranslation];
});
_c16 = ParsedSlots;
var SlotsForm = function SlotsForm() {
  _s16();
  var _useTranslation3 = useTranslation(),
    t = _useTranslation3.t;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray$2(_React$useState, 2),
    isDeleteModalVisible = _React$useState2[0],
    setDeleteModalVisible = _React$useState2[1];
  var _useCalendarContext = useCalendarContext(),
    previousLiveEvents = _useCalendarContext.previousLiveEvents,
    discardLiveEvents = _useCalendarContext.discardLiveEvents,
    discardChanges = _useCalendarContext.discardChanges,
    setSlotDuration = _useCalendarContext.setSlotDuration,
    slotDuration = _useCalendarContext.slotDuration,
    liveEvents = _useCalendarContext.liveEvents,
    _useCalendarContext$c = _useCalendarContext.contextItems,
    Company = _useCalendarContext$c.Company,
    Lead = _useCalendarContext$c.Lead,
    handleSlots = _useCalendarContext.handleSlots,
    setLiveEvents = _useCalendarContext.setLiveEvents,
    setPreviousLiveEvents = _useCalendarContext.setPreviousLiveEvents,
    slotsModified = _useCalendarContext.slotsModified,
    _useCalendarContext$s = _useCalendarContext.slotsData,
    selectedTimezone = _useCalendarContext$s.selectedTimezone,
    meetingTitle = _useCalendarContext$s.meetingTitle,
    setSlotsData = _useCalendarContext.setSlotsData;
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var _React$useState3 = React.useState(meetingTitle),
    _React$useState4 = _slicedToArray$2(_React$useState3, 2),
    title = _React$useState4[0],
    setTitle = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray$2(_React$useState5, 2),
    displayForm = _React$useState6[0],
    setDisplayForm = _React$useState6[1];
  var isCreating = useMemo(function () {
    return !(previousLiveEvents !== null && previousLiveEvents !== void 0 && previousLiveEvents.current);
  }, [previousLiveEvents === null || previousLiveEvents === void 0 ? void 0 : previousLiveEvents.current]);
  var handleDiscardChanges = function handleDiscardChanges() {
    setSlotsData(function (prevSlotsData) {
      return _objectSpread$2(_objectSpread$2({}, prevSlotsData), {}, {
        calendarSlotsVisible: false
      });
    });
    discardChanges();
  };
  useEffect(function () {
    // If there is no title, set it to the default name
    if (!title) {
      if (Company && !title) {
        if ('fields' in Company) {
          var _settings$account;
          setTitle("".concat(getValueFromLogicRole(Company, COMPANY_FIELDS_LOGIC_ROLE.NAME), " <> ").concat(settings === null || settings === void 0 ? void 0 : (_settings$account = settings.account) === null || _settings$account === void 0 ? void 0 : _settings$account.name));
        } else {
          var _settings$account2;
          setTitle("".concat((Company === null || Company === void 0 ? void 0 : Company.name) || '', " <> ").concat(settings === null || settings === void 0 ? void 0 : (_settings$account2 = settings.account) === null || _settings$account2 === void 0 ? void 0 : _settings$account2.name));
        }
      } else if (Lead && !title) {
        if ('fields' in Lead) {
          var _settings$account3;
          setTitle("".concat(getValueFromLogicRole(Lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME), " <> ").concat(settings === null || settings === void 0 ? void 0 : (_settings$account3 = settings.account) === null || _settings$account3 === void 0 ? void 0 : _settings$account3.name));
        } else {
          var _settings$account4;
          setTitle("".concat((Lead === null || Lead === void 0 ? void 0 : Lead.fullName) || '', " <> ").concat(settings === null || settings === void 0 ? void 0 : (_settings$account4 = settings.account) === null || _settings$account4 === void 0 ? void 0 : _settings$account4.name));
        }
      }
    }
  }, [Company, Lead]);
  useEffect(function () {
    setSlotsData(function (prevSlotsData) {
      return _objectSpread$2(_objectSpread$2({}, prevSlotsData), {}, {
        meetingTitle: title
      });
    });
  }, [title]);
  var _useState = useState('en'),
    _useState2 = _slicedToArray$2(_useState, 2),
    language = _useState2[0],
    setLanguage = _useState2[1];
  return /*#__PURE__*/jsxs("div", {
    className: styles.slotsForm,
    children: [/*#__PURE__*/jsxs("div", {
      className: clsx(styles.slotsFormBody, _defineProperty$2({}, styles.slotsFormBodyHidden, !displayForm)),
      children: [/*#__PURE__*/jsxs("header", {
        className: styles.slotsFormHeader,
        children: [/*#__PURE__*/jsxs("div", {
          style: {
            display: 'flex'
          },
          children: [/*#__PURE__*/jsx(IconButton, {
            name: displayForm ? 'chevronDown' : 'chevronUp',
            size: 14,
            color: "bloobirds",
            className: styles.arrowButton,
            onClick: function onClick() {
              setDisplayForm(!displayForm);
            }
          }), /*#__PURE__*/jsx(Text, {
            size: "s",
            className: styles.formTitle,
            children: t('calendar.selectedSlots')
          })]
        }), /*#__PURE__*/jsxs("div", {
          className: styles.timeSelector,
          children: [/*#__PURE__*/jsx(Text, {
            size: "xs",
            children: t('calendar.meetingDuration')
          }), /*#__PURE__*/jsxs(Select, {
            size: "small",
            value: slotDuration,
            onChange: setSlotDuration,
            width: "48px",
            children: [/*#__PURE__*/jsx(Item, {
              value: 15,
              children: "15"
            }), /*#__PURE__*/jsx(Item, {
              value: 30,
              children: "30"
            }), /*#__PURE__*/jsx(Item, {
              value: 45,
              children: "45"
            }), /*#__PURE__*/jsx(Item, {
              value: 60,
              children: "60"
            })]
          }), /*#__PURE__*/jsx(Text, {
            size: "xs",
            children: t('calendar.minutes')
          })]
        })]
      }), /*#__PURE__*/jsxs("section", {
        className: clsx(styles.timeSlotForm, _defineProperty$2({}, styles.timeSlotFormHidden, !displayForm)),
        children: [/*#__PURE__*/jsxs("div", {
          className: styles.sectionHeader,
          children: [/*#__PURE__*/jsx(Icon, {
            name: "calendar",
            size: 24,
            color: "bloobirds"
          }), /*#__PURE__*/jsx(Input, {
            placeholder: t('calendar.meetingTitlePlaceholder'),
            value: title,
            onChange: setTitle,
            width: "100%",
            size: "small"
          })]
        }), /*#__PURE__*/jsx(ParsedSlots, {
          liveEvents: liveEvents,
          language: language,
          selectedTimezone: selectedTimezone
        })]
      })]
    }), /*#__PURE__*/jsxs("footer", {
      className: styles.slotsFormFooter,
      children: [isCreating ? /*#__PURE__*/jsx("div", {
        children: /*#__PURE__*/jsx(Button, {
          variant: "secondary",
          size: "small",
          color: "tomato",
          uppercase: false,
          onClick: handleDiscardChanges,
          iconLeft: "trashEmpty",
          children: t('common.discard')
        })
      }) : /*#__PURE__*/jsxs("div", {
        style: {
          display: 'flex',
          gap: '8px'
        },
        children: [/*#__PURE__*/jsx(Button, {
          variant: "secondary",
          size: "small",
          color: "tomato",
          uppercase: false,
          onClick: function onClick() {
            setDeleteModalVisible(true);
            mixpanel.track(MIXPANEL_EVENTS.DELETE_CALENDAR_SLOTS);
          },
          iconLeft: "trashEmpty",
          children: t('common.delete')
        }), slotsModified && /*#__PURE__*/jsx(Button, {
          variant: "clear",
          size: "small",
          color: "bloobirds",
          uppercase: false,
          onClick: handleDiscardChanges,
          children: t('calendar.discardChanges')
        })]
      }), /*#__PURE__*/jsxs("div", {
        className: styles.footerRight,
        style: {
          display: 'flex',
          gap: '8px'
        },
        children: [/*#__PURE__*/jsx(TranslationDropdown, {
          language: language,
          setLanguage: setLanguage
        }), /*#__PURE__*/jsx(Button, {
          variant: "primary",
          size: "small",
          uppercase: false,
          disabled: !liveEvents,
          onClick: function onClick() {
            handleSlots( /*#__PURE__*/jsx(ParsedSlots, {
              liveEvents: liveEvents,
              language: language,
              selectedTimezone: selectedTimezone
            }), function (value) {
              setLiveEvents(value);
              setPreviousLiveEvents(value);
            });
            mixpanel.track(MIXPANEL_EVENTS.ADD_CALENDAR_SLOTS);
          },
          children: t('common.save')
        })]
      })]
    }), /*#__PURE__*/jsx(ConfirmationModal, {
      open: isDeleteModalVisible,
      handleClose: function handleClose() {
        discardLiveEvents();
        handleSlots(undefined, undefined);
        setDeleteModalVisible(false);
        setSlotsData(function (prevSlotsData) {
          return _objectSpread$2(_objectSpread$2({}, prevSlotsData), {}, {
            calendarSlotsVisible: false
          });
        });
      },
      handleCancel: function handleCancel() {
        return setDeleteModalVisible(false);
      }
    })]
  });
};
_s16(SlotsForm, "P9DQBmZ6uWgcdTVvwyWeS+ix7Yg=", false, function () {
  return [useTranslation, useCalendarContext, useActiveUserSettings];
});
_c17 = SlotsForm;
function _typeof$1(obj) {
  "@babel/helpers - typeof";

  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$1(obj);
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
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
function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}
function slicePlaceholder(_ref) {
  var eventPlaceholder = _ref.eventPlaceholder,
    selectedTimezone = _ref.selectedTimezone,
    language = _ref.language;
  if (!eventPlaceholder) return;
  var numberOfSlots = eventPlaceholder.duration >= eventPlaceholder.minuteSpan ? Math.floor(eventPlaceholder.duration / eventPlaceholder.minuteSpan) : 1;
  return createArrayOfLength(numberOfSlots).map(function (_, i) {
    var startTime = i === 0 ? getI18nSpacetimeLng(language, eventPlaceholder.startTime, selectedTimezone || getUserTimeZone()) : getI18nSpacetimeLng(language, eventPlaceholder.startTime, selectedTimezone || getUserTimeZone()).add(i * eventPlaceholder.minuteSpan, 'minutes');
    var id1 = v4();
    var id2 = v4();
    var paddingTop = getLiveEventPadding(startTime);
    return {
      id: id1.replaceAll('-', '') + id2.replaceAll('-', ''),
      paddingTop: paddingTop,
      day: eventPlaceholder.day,
      startTime: startTime,
      endTime: startTime.add(eventPlaceholder.minuteSpan, 'minutes'),
      collisions: eventPlaceholder.collisions,
      type: 'dragging',
      minuteSpan: eventPlaceholder.minuteSpan,
      duration: eventPlaceholder.duration,
      collisionNumber: eventPlaceholder.collisionNumber
    };
  });
}
var useEventPlaceholder = function useEventPlaceholder(slotsData, setCalendarSlotsBannerVisible, setCalendarSlotsInEmailContext) {
  _s17();
  var _ref2 = slotsData || {},
    selectedTimezone = _ref2.selectedTimezone;
  var _useState = useState(),
    _useState2 = _slicedToArray$1(_useState, 2),
    eventPlaceholder = _useState2[0],
    setEventPlaceholder = _useState2[1];
  var _useState3 = useState(slotsData.calendarSlots),
    _useState4 = _slicedToArray$1(_useState3, 2),
    liveEvents = _useState4[0],
    setLiveEvents = _useState4[1];
  var _useState5 = useState(30),
    _useState6 = _slicedToArray$1(_useState5, 2),
    slotDuration = _useState6[0],
    setSlotDuration = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray$1(_useState7, 2),
    slotsModified = _useState8[0],
    setSlotsModified = _useState8[1];
  var previousLiveEvents = useRef(undefined);
  var isDraggingController = useRef(false);
  var createdSections = useRef([]);
  function discardLiveEvents() {
    setLiveEvents(undefined);
    previousLiveEvents.current = undefined;
    setSlotsModified(false);
    createdSections.current = [];
  }
  function discardChanges() {
    setLiveEvents(previousLiveEvents === null || previousLiveEvents === void 0 ? void 0 : previousLiveEvents.current);
    setSlotsModified(false);
    createdSections.current = [];
  }
  useEffect(function () {
    var timeZonedLiveEvents = liveEvents && Object.keys(liveEvents || {}).reduce(function (acc, key) {
      return _objectSpread$1(_objectSpread$1({}, acc), {}, _defineProperty$1({}, key, liveEvents[key].map(function (event) {
        var startTimeInSelectedTimezone = getI18nSpacetimeLng(language, event.startTime, selectedTimezone || getUserTimeZone());
        var paddingTop = getLiveEventPadding(startTimeInSelectedTimezone);
        return _objectSpread$1(_objectSpread$1({}, event), {}, {
          startTime: startTimeInSelectedTimezone,
          paddingTop: paddingTop
        });
      })));
    }, {});
    setLiveEvents(timeZonedLiveEvents);
  }, [selectedTimezone]);
  useEffect(function () {
    var liveEventsN = liveEvents && Object.values(liveEvents || {}).reduce(function (total, dayEvents) {
      return total + (dayEvents === null || dayEvents === void 0 ? void 0 : dayEvents.length);
    }, 0) || 0;
    var initialLiveEventsN = (previousLiveEvents === null || previousLiveEvents === void 0 ? void 0 : previousLiveEvents.current) && Object.values((previousLiveEvents === null || previousLiveEvents === void 0 ? void 0 : previousLiveEvents.current) || {}).reduce(function (total, dayEvents) {
      return total + (dayEvents === null || dayEvents === void 0 ? void 0 : dayEvents.length);
    }, 0) || 0;
    setCalendarSlotsInEmailContext(liveEvents);
    setSlotsModified(liveEventsN !== initialLiveEventsN);
  }, [liveEvents, previousLiveEvents === null || previousLiveEvents === void 0 ? void 0 : previousLiveEvents.current]);
  var _useTranslation = useTranslation(),
    language = _useTranslation.i18n.language;
  useEffect(function () {
    if (createdSections.current.length > 0) {
      var _createdSections$curr;
      var newLiveEvents = [];
      //TODO find where the duplicates are coming from
      var uniqueSections = createdSections === null || createdSections === void 0 ? void 0 : (_createdSections$curr = createdSections.current) === null || _createdSections$curr === void 0 ? void 0 : _createdSections$curr.filter(onlyUnique);
      uniqueSections === null || uniqueSections === void 0 ? void 0 : uniqueSections.forEach(function (ph) {
        var newDuration = Math.floor(ph.duration / slotDuration) * slotDuration;
        newLiveEvents.push.apply(newLiveEvents, _toConsumableArray(slicePlaceholder({
          language: language,
          eventPlaceholder: _objectSpread$1(_objectSpread$1({}, ph), {}, {
            minuteSpan: slotDuration,
            duration: newDuration,
            endTime: ph.startTime.add(newDuration, 'minutes')
          }),
          selectedTimezone: selectedTimezone
        }).reduce(function (acc, curr) {
          if (curr.duration <= 0 || acc.some(function (storedEvent) {
            return curr.startTime.isBetween(storedEvent.startTime, storedEvent.endTime);
          }) || newLiveEvents.some(function (storedEvent) {
            return curr.startTime.isBetween(storedEvent.startTime, storedEvent.endTime, true);
          })) {
            return acc;
          }
          if (curr.duration < curr.minuteSpan) {
            return [].concat(_toConsumableArray(acc), [_objectSpread$1(_objectSpread$1({}, curr), {}, {
              minuteSpan: curr.duration
            })]);
          }
          return [].concat(_toConsumableArray(acc), [curr]);
        }, [])));
      });
      addLiveEvents(newLiveEvents, true);
    }
  }, [slotDuration]);
  function addLiveEvents(events) {
    var _events$;
    var overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (!events) return;
    var futureEvents = events === null || events === void 0 ? void 0 : events.filter(function (e) {
      var _e$startTime;
      return e === null || e === void 0 ? void 0 : (_e$startTime = e.startTime) === null || _e$startTime === void 0 ? void 0 : _e$startTime.isAfter(new Date());
    });
    var eventDay = events === null || events === void 0 ? void 0 : (_events$ = events[0]) === null || _events$ === void 0 ? void 0 : _events$.day;
    if (futureEvents.length === 0) return;
    if (overwrite) {
      setLiveEvents(_defineProperty$1({}, eventDay, events));
      return;
    }
    if (futureEvents.length > 0 && liveEvents && liveEvents[eventDay]) {
      //insert the new event in the correct position
      var insertEventInTimeline = function insertEventInTimeline() {
        var orderedEvents = [];
        var hasPushed = false;
        for (var i = 0; i < liveEvents[eventDay].length; i++) {
          var liveEvent = liveEvents[eventDay][i];
          if (liveEvent.startTime.isBetween(futureEvents[0].startTime, futureEvents.at(-1).endTime)) {
            if (!hasPushed) {
              orderedEvents.push.apply(orderedEvents, _toConsumableArray(futureEvents));
              hasPushed = true;
            }
          } else {
            orderedEvents.push(liveEvent);
          }
        }
        // new events happen after all the live events
        if (orderedEvents.length === liveEvents[eventDay].length && !orderedEvents.some(function (orderedEvent) {
          return futureEvents[0].startTime.isBetween(orderedEvent.startTime, orderedEvent.endTime, false) || orderedEvent.startTime.isEqual(futureEvents[0].startTime);
        })) {
          orderedEvents.push.apply(orderedEvents, _toConsumableArray(futureEvents));
        }
        return orderedEvents;
      };
      var orderedFutureEvents = insertEventInTimeline();
      setLiveEvents(_objectSpread$1(_objectSpread$1({}, liveEvents), {}, _defineProperty$1({}, eventDay, orderedFutureEvents)));
    } else {
      var existingLiveEvents = Object.entries(liveEvents || {});
      var orderedUpdatedEvents = existingLiveEvents.length > 0 ? existingLiveEvents.reduce(function (acc, _ref3, currentIndex) {
        var _ref4 = _slicedToArray$1(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];
        var dateIsBeforeNewEvent = spacetime(key).isBefore(spacetime(eventDay));
        var hasBeenAdded = Object.entries(acc).some(function (_ref5) {
          var _ref6 = _slicedToArray$1(_ref5, 1),
            k = _ref6[0];
          return k === eventDay;
        });
        if (!dateIsBeforeNewEvent && !hasBeenAdded) {
          return _objectSpread$1(_objectSpread$1({}, acc), {}, _defineProperty$1(_defineProperty$1({}, eventDay, futureEvents), key, value));
        }
        var isLastIteration = currentIndex === existingLiveEvents.length - 1;
        return _objectSpread$1(_objectSpread$1({}, acc), {}, _defineProperty$1({}, key, value), isLastIteration && !hasBeenAdded ? _defineProperty$1({}, eventDay, futureEvents) : {});
      }, {}) : _defineProperty$1({}, eventDay, futureEvents);
      //if there's not other events that day, just add the new event
      setLiveEvents(orderedUpdatedEvents);
    }
    setCalendarSlotsBannerVisible(BannerStates.EDIT);
  }
  function settlePlaceholder(event) {
    if (!eventPlaceholder) return;
    var roundedDuration = Math.floor(eventPlaceholder.duration / slotDuration) * slotDuration;
    var roundedPlaceholder = _objectSpread$1(_objectSpread$1({}, eventPlaceholder), {}, {
      duration: roundedDuration
    });
    var segmentedLiveEvents = slicePlaceholder({
      eventPlaceholder: roundedPlaceholder,
      language: language,
      selectedTimezone: selectedTimezone
    });
    addLiveEvents(segmentedLiveEvents);
    if (event && eventPlaceholder) {
      createdSections.current = mergeExistingPlaceholders(createdSections.current, roundedPlaceholder);
    }
    setEventPlaceholder(undefined);
    setTimeout(function () {
      return isDraggingController.current = false;
    }, 500);
  }
  function createQuickLiveEvent(mouseDelta, day) {
    var _liveEvents$day;
    if (mouseDelta.initialPosition === 0 || isDraggingController.current) return;
    var id = v4();
    var startTime = getTimeFromOffset(mouseDelta.initialPosition, spacetime(day)["goto"](selectedTimezone || getUserTimeZone()));
    var startDatetimeSpaceTime = getI18nSpacetimeLng(language, startTime, selectedTimezone || getUserTimeZone());
    var slotCreated = isSlotCreated((_liveEvents$day = liveEvents === null || liveEvents === void 0 ? void 0 : liveEvents[day]) !== null && _liveEvents$day !== void 0 ? _liveEvents$day : [], startDatetimeSpaceTime);
    if (!slotCreated) {
      var paddingTop = getLiveEventPadding(startDatetimeSpaceTime);
      var newEvent = {
        id: id,
        paddingTop: paddingTop,
        day: day,
        startTime: startDatetimeSpaceTime,
        endTime: startDatetimeSpaceTime.add(slotDuration, 'minutes'),
        collisions: 0,
        minuteSpan: slotDuration,
        type: 'dragging',
        duration: slotDuration,
        collisionNumber: 0
      };
      addLiveEvents([newEvent]);
      createdSections.current = mergeExistingPlaceholders(createdSections.current, newEvent);
    }
  }
  function deleteLiveEvent(day, id) {
    var currentEvents = liveEvents[day];
    var newEvents = currentEvents.filter(function (event) {
      return event.id !== id;
    });
    var deletedEvent = liveEvents[day].find(function (event) {
      return event.id === id;
    });
    createdSections.current = updatedCreatedSectionsOnDelete(createdSections.current, deletedEvent);
    if ((newEvents === null || newEvents === void 0 ? void 0 : newEvents.length) === 0) {
      createdSections.current = [];
      setCalendarSlotsBannerVisible(BannerStates.ACTIVE);
    }
    setLiveEvents(_objectSpread$1(_objectSpread$1({}, liveEvents), {}, _defineProperty$1({}, day, newEvents)));
  }
  var createPlaceholder = throttle(function (date, duration) {
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'placeholder';
    setEventPlaceholder({
      duration: duration,
      type: type,
      startTime: getI18nSpacetimeLng(language, date, selectedTimezone || getUserTimeZone()),
      endTime: getI18nSpacetimeLng(language, date, selectedTimezone || getUserTimeZone()).add(duration, 'minutes'),
      minuteSpan: slotDuration,
      id: 'event-placeholder',
      collisions: 0,
      collisionNumber: 0,
      day: spacetime(date).format('iso-short')
    });
    isDraggingController.current = true;
  }, 250);
  return {
    slotDuration: slotDuration,
    deleteLiveEvent: deleteLiveEvent,
    setSlotDuration: setSlotDuration,
    eventPlaceholder: eventPlaceholder,
    createPlaceholder: createPlaceholder,
    addLiveEvent: addLiveEvents,
    discardLiveEvents: discardLiveEvents,
    discardChanges: discardChanges,
    settlePlaceholder: settlePlaceholder,
    previousLiveEvents: previousLiveEvents,
    setPreviousLiveEvents: function setPreviousLiveEvents(value) {
      previousLiveEvents.current = value;
    },
    slotsModified: slotsModified,
    liveEvents: liveEvents,
    setLiveEvents: setLiveEvents,
    createQuickLiveEvent: createQuickLiveEvent
  };
};
_s17(useEventPlaceholder, "b7yniJVl97+c/jgnKL61PbEirbo=", false, function () {
  return [useTranslation];
});
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
var _excluded = ["slotsData", "setSlotsData", "handleSlots"];
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
var randomColors = ['bloobirds', 'softPeanut', 'verySoftTangerine', 'softTangerine', 'verySoftTomato', 'softTomato', 'softBanana', 'verySoftBanana', 'verySoftMelon', 'softMelon', 'lightBloobirds', 'verySoftBloobirds', 'verySoftPurple', 'lightPurple', 'verySoftPeanut', 'lightPeanut', 'lighterGray', 'gray'];
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
    default:
      return 'random';
  }
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
  _s18();
  var _invitee$email, _invitee$name;
  var invitee = _ref.invitee,
    handleRemoveInvitee = _ref.handleRemoveInvitee,
    readOnly = _ref.readOnly,
    width = _ref.width,
    shouldShowStatus = _ref.shouldShowStatus;
  var _useState = useState(randomColors[Math.floor(Math.random() * (randomColors.length + 1))]),
    _useState2 = _slicedToArray(_useState, 1),
    randomColor = _useState2[0];
  var calculatedColor = getColorFromType(invitee === null || invitee === void 0 ? void 0 : invitee.type);
  var colorToUse = calculatedColor === 'random' ? randomColor : calculatedColor;
  var statusAvatar = getStatusAvatar(invitee === null || invitee === void 0 ? void 0 : invitee.status);
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var parentRef = useRef();
  return /*#__PURE__*/jsx(Fragment, {
    children: ((invitee === null || invitee === void 0 ? void 0 : invitee.email) || (invitee === null || invitee === void 0 ? void 0 : invitee.name)) && /*#__PURE__*/jsx(Fragment, {
      children: /*#__PURE__*/jsxs("div", {
        className: styles$1._invitee_card,
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
          className: styles$1._invitee_info,
          children: [(invitee === null || invitee === void 0 ? void 0 : invitee.name) && /*#__PURE__*/jsx(Text, {
            size: "s",
            children: invitee === null || invitee === void 0 ? void 0 : invitee.name
          }), (invitee === null || invitee === void 0 ? void 0 : invitee.type) === 'Lead' && !(invitee !== null && invitee !== void 0 && invitee.email) && /*#__PURE__*/jsx(Text, {
            size: "xs",
            color: "tomato",
            decoration: "underscore",
            children: t('calendar.inviteeCard.noEmail')
          }), /*#__PURE__*/jsx(Text, {
            size: "xs",
            color: invitee !== null && invitee !== void 0 && invitee.name ? 'softPeanut' : 'peanut',
            decoration: "underscore",
            children: invitee === null || invitee === void 0 ? void 0 : invitee.email
          })]
        }), (invitee === null || invitee === void 0 ? void 0 : invitee.type) && /*#__PURE__*/jsx(Label, {
          size: "small",
          uppercase: false,
          children: invitee === null || invitee === void 0 ? void 0 : invitee.type
        }), !readOnly && /*#__PURE__*/jsx(IconButton, {
          name: "cross",
          size: 24,
          color: "softPeanut",
          onClick: function onClick() {
            return handleRemoveInvitee(invitee === null || invitee === void 0 ? void 0 : invitee.email);
          }
        })]
      })
    })
  });
}
_s18(InviteeCard, "K22cVmp9hL3m5FHpwXfQ//Ozfqk=", false, function () {
  return [useTranslation];
});
_c18 = InviteeCard;
var weekArray = createArrayOfLength(7);
var dayArray = createArrayOfLength(24);
function generateWeek(day) {
  var firstDay = spacetime(day).startOf('week');
  return weekArray.map(function (i) {
    return firstDay.add(i, 'day').format('iso-date');
  });
}
var CalendarContext = /*#__PURE__*/createContext(null);
var BannerStates;
(function (BannerStates) {
  BannerStates[BannerStates["INACTIVE"] = 0] = "INACTIVE";
  BannerStates[BannerStates["ACTIVE"] = 1] = "ACTIVE";
  BannerStates[BannerStates["PAST"] = 2] = "PAST";
  BannerStates[BannerStates["EDIT"] = 3] = "EDIT";
})(BannerStates || (BannerStates = {}));
var CalendarProvider = function CalendarProvider(_ref2) {
  _s19();
  var slotsData = _ref2.slotsData,
    setSlotsData = _ref2.setSlotsData,
    contextItems = _ref2.contextItems,
    handleSlots = _ref2.handleSlots,
    children = _ref2.children;
  var _useState3 = useState(BannerStates.ACTIVE),
    _useState4 = _slicedToArray(_useState3, 2),
    calendarSlotsBannerVisible = _useState4[0],
    setCalendarSlotsBannerVisible = _useState4[1];
  var eventManagement = useEventPlaceholder(slotsData, setCalendarSlotsBannerVisible, function (value) {
    return setSlotsData(function (prevSlotsData) {
      return _objectSpread(_objectSpread({}, prevSlotsData), value ? {
        calendarSlots: value
      } : {});
    });
  });
  var prevBannerState = useRef(BannerStates.ACTIVE);
  function clickedOnPastDate() {
    setCalendarSlotsBannerVisible(BannerStates.PAST);
    setTimeout(function () {
      return setCalendarSlotsBannerVisible(prevBannerState.current);
    }, 3000);
  }
  return /*#__PURE__*/jsx(CalendarContext.Provider, {
    value: _objectSpread(_objectSpread({
      clickedOnPastDate: clickedOnPastDate,
      handleSlots: handleSlots,
      calendarSlotsBannerVisible: calendarSlotsBannerVisible,
      hideSlotsBanner: function hideSlotsBanner() {
        prevBannerState.current = BannerStates.INACTIVE;
        setCalendarSlotsBannerVisible(BannerStates.INACTIVE);
      }
    }, eventManagement), {}, {
      slotsData: slotsData,
      setSlotsData: setSlotsData,
      contextItems: contextItems
    }),
    children: children
  });
};
_s19(CalendarProvider, "TToq8mmaRF+zZKuH/qZdvLKrRxs=", false, function () {
  return [useEventPlaceholder];
});
_c19 = CalendarProvider;
var useCalendarContext = function useCalendarContext() {
  _s20();
  var context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendarContext must be used within a CalendarProvider");
  }
  return context;
};
_s20(useCalendarContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var withProvider = function withProvider(Component) {
  return function (props) {
    var slotsData = props.slotsData,
      setSlotsData = props.setSlotsData,
      handleSlots = props.handleSlots,
      rest = _objectWithoutProperties(props, _excluded);
    return /*#__PURE__*/jsx(CalendarProvider, {
      handleSlots: handleSlots,
      slotsData: slotsData,
      setSlotsData: setSlotsData,
      contextItems: props.contextItems,
      children: /*#__PURE__*/jsx(Component, _objectSpread({}, rest))
    });
  };
};
var Calendar = function Calendar(_ref3) {
  _s21();
  var day = _ref3.day,
    _ref3$mode = _ref3.mode,
    mode = _ref3$mode === void 0 ? 'week' : _ref3$mode,
    events = _ref3.events,
    _ref3$notConnected = _ref3.notConnected,
    notConnected = _ref3$notConnected === void 0 ? false : _ref3$notConnected,
    onCalendarReconnect = _ref3.onCalendarReconnect;
  var _useCalendarContext = useCalendarContext(),
    slotsData = _useCalendarContext.slotsData,
    calendarSlotsBannerVisible = _useCalendarContext.calendarSlotsBannerVisible,
    hideSlotsBanner = _useCalendarContext.hideSlotsBanner;
  var hourMarkerRef = useRef(null);
  var days = mode === 'week' ? generateWeek(day) : [day];
  var defaultUserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var _useCalendar = useCalendar(),
    setEventTypesSelected = _useCalendar.setEventTypesSelected;
  var _ref4 = slotsData || {},
    calendarSlotsVisible = _ref4.calendarSlotsVisible,
    selectedTimezone = _ref4.selectedTimezone;
  var _useTranslation2 = useTranslation(),
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
  return /*#__PURE__*/jsxs(Fragment, {
    children: [calendarSlotsVisible && /*#__PURE__*/jsx(CalendarBanner, {
      bannerState: calendarSlotsBannerVisible,
      hideSlotsBanner: hideSlotsBanner,
      t: t
    }), notConnected ? /*#__PURE__*/jsx(CalendarNotConnected, {
      mode: mode,
      onCalendarReconnect: onCalendarReconnect
    }) : /*#__PURE__*/jsxs(Fragment, {
      children: [mode !== 'day' && /*#__PURE__*/jsx("div", {
        className: styles$1.calendar_column_headers,
        children: days.map(function (day) {
          var today = isToday(spacetime(day).toNativeDate(), selectedTimezone || getUserTimeZone());
          var nameClasses = clsx(styles$1.calendar_column_header_name, _defineProperty({}, styles$1.calendar_column_header_name_today, today));
          var dateClasses = clsx(styles$1.calendar_column_header_date, _defineProperty({}, styles$1.calendar_column_header_date_today, today));
          return /*#__PURE__*/jsxs("div", {
            className: styles$1.calendar_column_header,
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
        className: styles$1.calendar_container,
        children: [/*#__PURE__*/jsx("div", {
          className: styles$1.calendar_timestrings_container,
          children: /*#__PURE__*/jsx("div", {
            className: styles$1.calendar_timestrings,
            children: dayArray.map(function (hour) {
              return /*#__PURE__*/jsx("div", {
                className: styles$1.calendar_timestring_container,
                children: /*#__PURE__*/jsxs("div", {
                  className: styles$1.calendar_timestring,
                  children: [hour.toString().padStart(2, '0'), ":00", ' ', defaultUserTimezone !== selectedTimezone && /*#__PURE__*/jsx(Tooltip, {
                    title: t('calendar.days.timezoneTooltip'),
                    position: "top",
                    children: /*#__PURE__*/jsxs(Text, {
                      size: "xxs",
                      align: "right",
                      children: ["(", spacetime()["goto"](selectedTimezone).hour(hour)["goto"](defaultUserTimezone).hour(), ":00)"]
                    })
                  })]
                })
              }, "timestring_".concat(hour));
            })
          })
        }), /*#__PURE__*/jsx("div", {
          className: styles$1.calendar_grid_container,
          children: /*#__PURE__*/jsxs("div", {
            className: styles$1.calendar_grid,
            children: [/*#__PURE__*/jsx("div", {
              className: styles$1.calendar_grid_tiles,
              children: dayArray.map(function (h) {
                return /*#__PURE__*/jsx("div", {
                  className: styles$1.calendar_grid_tile
                }, "tile_".concat(h));
              })
            }), /*#__PURE__*/jsx("div", {
              className: styles$1.calendar_gridcell_container,
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
    }), calendarSlotsVisible && /*#__PURE__*/jsx(SlotsForm, {})]
  });
};
_s21(Calendar, "aSOMeJyaGWjF42G5SzvA2bLtJfk=", false, function () {
  return [useCalendarContext, useCalendar, useTranslation];
});
_c20 = Calendar;
var calendar = withProvider(Calendar);
export { BloobirdsCalendarsSelector, calendar as Calendar, CalendarNotConnected, CalendarsSelector, InviteeCard };
var _c, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16, _c17, _c18, _c19, _c20;
$RefreshReg$(_c, "CalendarsSelector");
$RefreshReg$(_c2, "BloobirdsCalendarsSelector");
$RefreshReg$(_c3, "GoogleSignIn");
$RefreshReg$(_c4, "MicrosoftSignIn");
$RefreshReg$(_c5, "CalendarNotConnected");
$RefreshReg$(_c6, "CalendarBanner");
$RefreshReg$(_c7, "SlotsDisplay");
$RefreshReg$(_c8, "DraggingBlock");
$RefreshReg$(_c9, "SolidBlock");
$RefreshReg$(_c10, "LiveEventBlock");
$RefreshReg$(_c11, "CalendarEvent$React.memo");
$RefreshReg$(_c12, "CalendarEvent");
$RefreshReg$(_c13, "CalendarColumn");
$RefreshReg$(_c14, "TranslationDropdown");
$RefreshReg$(_c15, "ConfirmationModal");
$RefreshReg$(_c16, "ParsedSlots");
$RefreshReg$(_c17, "SlotsForm");
$RefreshReg$(_c18, "InviteeCard");
$RefreshReg$(_c19, "CalendarProvider");
$RefreshReg$(_c20, "Calendar");
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