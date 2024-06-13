import React, { useState, useEffect, forwardRef, useImperativeHandle, useMemo } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useVisible, Dropdown, Text, Input as Input$1, Spinner, Icon, Tooltip, CircularBadge, Item, SearchInput, Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter, Button, Label, DatePickerContainer, DatePickerHeader, getUpdatedView, TimePicker, DatePickerGrid, getCalendarYears, DatePickerGridItem, getCalendarMonths, DatePickerCalendar, getCalendarDays, DatePickerDay, DatePickerFooter, IconButton, Checkbox, DateTimeShortcut, Action, CommandBox, DateTimePicker, Select } from '@bloobirds-it/flamingo-ui';
import { useUserSearch, useDataModel, useDebounce, useSelectAll, useIsB2CAccount, useActiveUserId, useUserTimeZone, useCadenceInfo, useSearchBobjects, useAircallPhoneLinkEnabled, useIsNoStatusPlanAccount, useCompanies, useCompanyCreationEnabled, useObjectCreationSettings, useOpenSkipTaskModal, useSkipModal } from '@bloobirds-it/hooks';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { COMPANY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, APP_CL, APP_CL_COMPANIES, BobjectTypes, companyUrl, FIELDS_LOGIC_ROLE, APP_CL_LEADS, companyIdUrl, PluralBobjectTypes, bobjectUrl, defaultSearchCompany, TASK_FIELDS_LOGIC_ROLE, MessagesEvents, TASK_STATUS_VALUE_LOGIC_ROLE, SearchAction } from '@bloobirds-it/types';
import { api, getValueFromLogicRole, getFieldByLogicRole, isCompany, isOpportunity, getRelatedBobject, isLead, colors, generateDatePrefix, keepPreviousResponse, isBeforeToday, getUserTimeZone, isValidPhone, getUserId, getTextFromLogicRole, formatDate } from '@bloobirds-it/utils';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import useSWR from 'swr';
import clsx from 'clsx';
import { top } from '@popperjs/core';
import clone from 'lodash/clone';
import spacetime from 'spacetime';
import { getI18nSpacetimeLng } from '@bloobirds-it/internationalization';
import { isSameYear, isSameMonth, isSameDay } from 'date-fns';
import { useController } from 'react-hook-form';
import classNames from 'classnames';
import { useDebounce as useDebounce$1 } from 'use-debounce';

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

var css_248z$j = ".assignedToSelector-module_content__KC9Cu {\n  display: flex;\n  flex-direction: column;\n}\n\n.assignedToSelector-module_link_button__Qd6Nr {\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n}\n\n.assignedToSelector-module_link_button__Qd6Nr > * {\n  margin-right: 4px;\n}\n\n.assignedToSelector-module_input__74jrn {\n  padding: 12px;\n  box-shadow: none;\n  box-sizing: border-box;\n}\n\n.assignedToSelector-module_results__X-Rtn {\n  height: 256px;\n  overflow-y: auto;\n  margin-bottom: 6px;\n}\n\n.assignedToSelector-module_result_row__vievd {\n  padding: 8px 36px;\n}\n\n.assignedToSelector-module_result_row__vievd:hover {\n  background-color: var(--veryLightBloobirds);\n}\n\n.assignedToSelector-module_noResultFound__kgaYX {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  margin: 8px 16px 20px 16px;\n}\n\n.assignedToSelector-module_text__8uO55 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n";
var styles$j = {"content":"assignedToSelector-module_content__KC9Cu","link_button":"assignedToSelector-module_link_button__Qd6Nr","input":"assignedToSelector-module_input__74jrn","results":"assignedToSelector-module_results__X-Rtn","result_row":"assignedToSelector-module_result_row__vievd","noResultFound":"assignedToSelector-module_noResultFound__kgaYX","text":"assignedToSelector-module_text__8uO55"};
styleInject(css_248z$j);

function _slicedToArray$a(arr, i) { return _arrayWithHoles$a(arr) || _iterableToArrayLimit$a(arr, i) || _unsupportedIterableToArray$a(arr, i) || _nonIterableRest$a(); }
function _nonIterableRest$a() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$a(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$a(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$a(o, minLen); }
function _arrayLikeToArray$a(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$a(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$a(arr) { if (Array.isArray(arr)) return arr; }
var UserOptions = function UserOptions(_ref) {
  var filteredUsers = _ref.filteredUsers,
    handleOnCardClick = _ref.handleOnCardClick;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'bobjects.assignToSelector.userOptions'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsx("div", {
    className: styles$j.results,
    children: (filteredUsers === null || filteredUsers === void 0 ? void 0 : filteredUsers.length) > 0 ? filteredUsers === null || filteredUsers === void 0 ? void 0 : filteredUsers.map(function (user) {
      if (user && user !== null && user !== void 0 && user.id) {
        return /*#__PURE__*/jsx("div", {
          className: styles$j.result_row,
          onClick: function onClick() {
            handleOnCardClick(user === null || user === void 0 ? void 0 : user.id);
          },
          children: /*#__PURE__*/jsx(Text, {
            size: "s",
            color: "peanut",
            weight: "medium",
            children: (user === null || user === void 0 ? void 0 : user.name) || t('unnamed')
          })
        }, user === null || user === void 0 ? void 0 : user.id);
      }
    }) : /*#__PURE__*/jsxs("div", {
      className: styles$j.noResultFound,
      children: [/*#__PURE__*/jsx(Icon, {
        name: "searchNone",
        size: 32,
        color: "softPeanut"
      }), /*#__PURE__*/jsxs("div", {
        className: styles$j.text,
        children: [/*#__PURE__*/jsx(Text, {
          color: "softPeanut",
          size: "s",
          align: "center",
          children: t('noResultsTitle')
        }), /*#__PURE__*/jsx(Text, {
          color: "softPeanut",
          size: "s",
          align: "center",
          children: t('noResultsSubtitle')
        })]
      })]
    })
  });
};
var AssignedToSelector = function AssignedToSelector(_ref2) {
  var assignedToId = _ref2.assignedToId,
    updateAssignedTo = _ref2.updateAssignedTo;
  var _ref3 = useUserSearch() || {},
    users = _ref3.users;
  var dataModel = useDataModel();
  var assignedTo = dataModel && dataModel.findValueById(assignedToId);
  var userName = assignedTo === null || assignedTo === void 0 ? void 0 : assignedTo.name;
  var _useTranslation2 = useTranslation(),
    t = _useTranslation2.t;
  var _useVisible = useVisible(false),
    visible = _useVisible.visible,
    ref = _useVisible.ref,
    setVisible = _useVisible.setVisible;
  var _useState = useState(''),
    _useState2 = _slicedToArray$a(_useState, 2),
    searchValue = _useState2[0],
    setSearchValue = _useState2[1];
  function handleOnCardClick(userId) {
    setSearchValue('');
    updateAssignedTo(userId);
    setVisible(false);
  }
  return /*#__PURE__*/jsx(Dropdown, {
    width: 323,
    ref: ref,
    visible: visible,
    zIndex: 20000,
    anchor: /*#__PURE__*/jsx("span", {
      onClick: function onClick() {
        return setVisible(!visible);
      },
      className: styles$j.link_button,
      children: /*#__PURE__*/jsx(Text, {
        size: "xs",
        color: "bloobirds",
        weight: "regular",
        children: userName
      })
    }),
    children: /*#__PURE__*/jsxs("div", {
      className: styles$j.content,
      children: [/*#__PURE__*/jsx(Input$1, {
        autoFocus: true,
        width: "100%",
        placeholder: t('common.search'),
        onChange: setSearchValue,
        className: styles$j.input
      }), users ? /*#__PURE__*/jsx(UserOptions, {
        filteredUsers: users === null || users === void 0 ? void 0 : users.filter(function (user) {
          var _user$name, _user$name$toLowerCas;
          return user === null || user === void 0 ? void 0 : (_user$name = user.name) === null || _user$name === void 0 ? void 0 : (_user$name$toLowerCas = _user$name.toLowerCase()) === null || _user$name$toLowerCas === void 0 ? void 0 : _user$name$toLowerCas.includes(searchValue.toLowerCase());
        }),
        handleOnCardClick: handleOnCardClick
      }) : /*#__PURE__*/jsx(Spinner, {
        name: "loadingCircle"
      })]
    })
  });
};

var css_248z$i = ".card-module__container__yUU-X {\n  position: relative;\n  margin: 8px 0;\n  cursor: pointer;\n}\n\n.card-module__container__yUU-X > div {\n  height: 60px;\n  padding-left: 16px;\n  display: flex;\n  align-content: center;\n}\n\n.card-module__container__yUU-X > div > div {\n  display: flex;\n  align-items: center;\n  width: 100%;\n}\n\n.card-module__container__yUU-X .card-module__link_wrapper_ml__xZtz- {\n  margin-left: 0;\n}\n\n.card-module__dashed_line__4cSGe {\n  position: absolute;\n  width: 0;\n  height: 8px;\n  left: 28px;\n  border-left: 1px dashed #c5d1dd;\n}\n\n.card-module__container__yUU-X:last-child {\n  margin-bottom: 16px;\n}\n\n/* Card */\n\n/* Card Left */\n\n.card-module__card_checkbox__X0ISR {\n  margin-right: 9px;\n}\n\n.card-module__icons__2wJFX {\n  display: flex;\n  flex-shrink: 0;\n  margin-right: 9px;\n}\n\n.card-module__icons__2wJFX > svg {\n  margin-right: 2px;\n}\n\n.card-module__title__YpKYa {\n  flex-shrink: 0;\n  margin-right: 8px;\n  display: flex;\n  align-items: center;\n}\n\n.card-module__now_time__D88lo {\n  flex-shrink: 1;\n  font-size: 14px;\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-right: 6px;\n}\n\n.card-module__now_time__D88lo Text {\n  margin-left: 6px;\n}\n\n.card-module__timezone__zT8fa {\n  display: flex;\n  align-items: center;\n  margin-right: 8px;\n}\n\n.card-module__datetime__xPq82 {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  margin-right: 8px;\n}\n\n.card-module__datetime_hour__1vuvN {\n  margin-right: 4px;\n}\n\n.card-module__high_priority_icon__pYDtc {\n  margin-right: 12px;\n}\n\n.card-module__bobject_name__nCQQX {\n  flex-shrink: 1;\n  font-size: 14px;\n  min-width: 0;\n  display: block;\n  align-items: flex-end;\n}\n\n.card-module__bobject_name__nCQQX > div {\n  display: block;\n}\n\n.card-module__status_wrapper__yhN0N {\n  margin-right: 8px;\n  text-align: left;\n  flex-shrink: 0;\n}\n\n.card-module__target_market_wrapper__HGoE- {\n  font-size: 13px;\n  flex-shrink: 0;\n  margin-right: 8px;\n}\n\n.card-module__url_wrapper__SaZRY {\n  flex-shrink: 1;\n  min-width: 0;\n  font-size: 13px;\n}\n\n.card-module__text_wrapper__XU1NC {\n  margin-left: 8px;\n  margin-right: 24px;\n  flex-shrink: 0;\n}\n\n.card-module__source__m3s-K {\n  margin-right: 12px;\n  flex-shrink: 0;\n}\n\n.card-module__number_leads_wrapper__hJEhZ {\n  font-size: 13px;\n  margin-left: 3px;\n  margin-right: 8px;\n  flex-shrink: 0;\n}\n\n.card-module__separator__dog1H {\n  display: flex;\n  align-self: center;\n  margin-right: 8px;\n  width: 1px;\n  height: 8px;\n  background-color: var(--softPeanut);\n}\n\n.card-module__country__QRteF {\n  margin-right: 8px;\n  flex-shrink: 0;\n}\n\n.card-module__assigned_circle__GwnV2 {\n  margin-left: 4px;\n  flex-shrink: 0;\n  display: flex;\n}\n\n.card-module__icon__container__K8HZ8 {\n  display: flex;\n}\n\n/* Card Right */\n.card-module__status__Zscnc,\n.card-module__assigned_to__r1Fv-,\n.card-module__date__JIlbg,\n.card-module__overdue__guKcc {\n  margin-left: 8px;\n  flex-shrink: 0;\n}\n\n.card-module__assigned_to__r1Fv- {\n  margin-right: 8px;\n}\n\n.card-module__date__JIlbg {\n  margin-left: 20px;\n}\n\n/* END - Card */\n\n/* Content */\n\n.card-module__name_wrapper__WxH34 {\n  margin-right: 8px;\n  max-width: 182px;\n  display: flex;\n  justify-content: flex-start;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  white-space: nowrap;\n}\n\n.card-module__status_wrapper__yhN0N {\n  margin-left: 8px;\n  margin-right: 24px;\n  min-width: 64px;\n  text-align: left;\n}\n\n.card-module__header__IyqhT {\n  margin-bottom: 24px;\n  margin-top: 24px;\n}\n\n.card-module__header__IyqhT:first-child {\n  margin-top: 0;\n}\n\n.card-module__card_wrapper__dS48Z {\n  display: flex;\n  align-content: center;\n}\n\n.card-module__header__IyqhT :first-child {\n  margin-right: 8px;\n}\n\n.card-module__filters__title__qs5nu {\n  margin-right: 12px;\n}\n\n.card-module__clear_wrapper__XHWj9 {\n  width: 85px;\n}\n\n.card-module__clear_wrapper__XHWj9 button {\n  padding: 0;\n}\n\n.card-module__url_wrapper__SaZRY {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: flex;\n}\n\n.card-module__footer_wrapper__W6fA4 {\n  margin-top: 25px;\n}\n\n.card-module__timezome_wrapper__HeCiu {\n  margin-right: 12px;\n  white-space: nowrap;\n  max-width: 285px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: flex;\n}\n\n.card-module__name_container__Wefcr {\n  flex-shrink: 1;\n  min-width: 0;\n  font-size: 13px;\n  max-width: 30%;\n}\n\n.card-module__name_container__Wefcr > div {\n  display: block;\n}\n\n.card-module__timezome_wrapper__HeCiu > p:nth-child(1) {\n  margin-right: 12px;\n}\n\n.card-module__icon_wrapper__pvbbN {\n  margin-right: 4px;\n  flex-shrink: 0;\n}\n\n.card-module__more_filter_input__bGs5U {\n  background: var(--lightestBloobirds);\n  color: var(--peanut);\n  box-sizing: border-box;\n  border-radius: 4px;\n  max-width: 180px;\n  padding: 4px 6px;\n  font-size: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  cursor: pointer;\n  margin-top: 2px;\n}\n\n.card-module__filled_more_filter_input__o3BqW {\n  background: var(--softPeanut);\n  color: var(--white);\n}\n\n.card-module__more_filter_input__bGs5U > svg {\n  margin-left: 8px;\n}\n\n.card-module__select_all_wrapper__Vb57o {\n  padding-left: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin: 8px 0 12px 0;\n}\n\n.card-module__transition__TjcKc {\n  height: 0;\n}\n\n.card-module__transition__TjcKc > * {\n  transform: translateY(-100px);\n}\n\n.card-module__filter_container__WD-Gq {\n  transition: height 0.3s ease;\n  overflow: hidden;\n  justify-content: center;\n}\n\n.card-module__filter_container__WD-Gq > * {\n  transform: translate(0px, 0px);\n  transition: transform 400ms cubic-bezier(0, 0, 0.2, 1) 0ms;\n}\n\n.card-module__button_wrapper__TPAyx {\n  margin-left: 16px;\n  display: inline;\n}\n\n.card-module__message__UnYpF {\n  background-color: #ebf0f7;\n  padding: 8px;\n  text-align: center;\n  border-radius: 4px;\n}\n\n.card-module__hidden__eA-x9 {\n  visibility: hidden;\n  height: 0;\n}\n\n@media (max-width: 1192px) {\n  .card-module__clear_wrapper__XHWj9 {\n    margin-top: 10px;\n  }\n\n  .card-module__show_complete_wrapper__pbR-z > div {\n    padding-left: 0;\n  }\n}\n\n.card-module__footer_wrapper__W6fA4 {\n  margin-top: 25px;\n}\n\n@media (max-width: 1192px) {\n  .card-module__clear_wrapper__XHWj9 {\n    margin-top: 10px;\n  }\n\n  .card-module__show_complete_wrapper__pbR-z > div {\n    padding-left: 0;\n  }\n}\n\n@media screen and (min-width: 1521px) {\n  .card-module__date_wrapper__SCSIe {\n    max-width: inherit;\n  }\n}\n\n@media screen and (min-width: 1421px) and (max-width: 1520px) {\n  .card-module__date_wrapper__SCSIe > p {\n    max-width: 75px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: block;\n  }\n}\n\n@media screen and (min-width: 1421px) {\n  .card-module__url_wrapper__SaZRY {\n    margin-right: 8px;\n  }\n\n  .card-module__status_wrapper__yhN0N > div > span {\n    max-width: 150px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: block;\n  }\n\n  .card-module__name_wrapper__WxH34 > p {\n    max-width: 130px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    display: block;\n  }\n}\n\n@media screen and (min-width: 1221px) and (max-width: 1420px) {\n  .card-module__timezome_wrapper__HeCiu > p:nth-child(1) {\n    max-width: 60px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n  }\n\n  .card-module__name_wrapper__WxH34 > p {\n    max-width: 110px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    display: block;\n  }\n\n  .card-module__status_wrapper__yhN0N {\n    margin-right: 8px;\n  }\n\n  .card-module__status_wrapper__yhN0N > div > span {\n    max-width: 110px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: block;\n  }\n\n  .card-module__url_wrapper__SaZRY > span {\n    max-width: 60px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    display: block;\n  }\n\n  .card-module__date_wrapper__SCSIe > p {\n    max-width: 55px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: block;\n  }\n}\n\n@media screen and (min-width: 1181px) and (max-width: 1220px) {\n  .card-module__timezome_wrapper__HeCiu > p:nth-child(1) {\n    max-width: 60px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n  }\n\n  .card-module__date_wrapper__SCSIe > p {\n    max-width: 65px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: block;\n  }\n\n  .card-module__status_wrapper__yhN0N {\n    margin-right: 8px;\n  }\n\n  .card-module__status_wrapper__yhN0N > div > span {\n    max-width: 80px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: block;\n  }\n\n  .card-module__name_wrapper__WxH34 > p {\n    max-width: 90px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    display: block;\n  }\n\n  .card-module__url_wrapper__SaZRY > span {\n    max-width: 60px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    display: block;\n    margin-right: 8px;\n  }\n}\n\n@media screen and (min-width: 1111px) and (max-width: 1180px) {\n  .card-module__date_wrapper__SCSIe > p {\n    max-width: 150px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: block;\n  }\n\n  .card-module__status_wrapper__yhN0N {\n    margin-right: 8px;\n  }\n\n  .card-module__status_wrapper__yhN0N > div > span {\n    max-width: 100px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: block;\n  }\n}\n\n@media screen and (min-width: 1079px) and (max-width: 1110px) {\n  .card-module__status_wrapper__yhN0N {\n    margin-right: 8px;\n  }\n\n  .card-module__status_wrapper__yhN0N > div > span {\n    max-width: 90px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: block;\n  }\n\n  .card-module__date_wrapper__SCSIe > p {\n    max-width: 75px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: block;\n  }\n\n  .card-module__name_wrapper__WxH34 > p {\n    max-width: 70px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    display: block;\n  }\n\n  .card-module__url_wrapper__SaZRY > span {\n    max-width: 60px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    display: block;\n  }\n}\n\n@media screen and (max-width: 1078px) {\n  .card-module__filter_wrapper__M1xyH > div > div {\n    width: 75px;\n  }\n\n  .card-module__name_wrapper__WxH34 > p {\n    max-width: 60px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    display: block;\n  }\n\n  .card-module__text_wrapper__XU1NC {\n    margin-right: 12px;\n  }\n\n  .card-module__url_wrapper__SaZRY > span {\n    max-width: 60px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    display: block;\n  }\n\n  .card-module__status_wrapper__yhN0N {\n    margin-left: 0;\n    margin-right: 8px;\n  }\n\n  .card-module__status_wrapper__yhN0N > div > span {\n    max-width: 60px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: block;\n  }\n\n  .card-module__date_wrapper__SCSIe > p {\n    max-width: 70px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: block;\n  }\n}\n\n@media (max-width: 900px) {\n  .card-module__xs_hidden__LINb4 {\n    display: none;\n  }\n}\n\n@media (max-width: 1150px) {\n  .card-module__s_hidden__urIHB {\n    display: none;\n  }\n}\n\n@media (max-width: 1550px) {\n  .card-module__m_hidden__Vr5JZ {\n    display: none;\n  }\n}\n\n@media (max-width: 1700px) {\n  .card-module__l_hidden__mjt8A {\n    display: none;\n  }\n}\n";
var styles$i = {"_container":"card-module__container__yUU-X","_link_wrapper_ml":"card-module__link_wrapper_ml__xZtz-","_dashed_line":"card-module__dashed_line__4cSGe","_card_checkbox":"card-module__card_checkbox__X0ISR","_icons":"card-module__icons__2wJFX","_title":"card-module__title__YpKYa","_now_time":"card-module__now_time__D88lo","_timezone":"card-module__timezone__zT8fa","_datetime":"card-module__datetime__xPq82","_datetime_hour":"card-module__datetime_hour__1vuvN","_high_priority_icon":"card-module__high_priority_icon__pYDtc","_bobject_name":"card-module__bobject_name__nCQQX","_status_wrapper":"card-module__status_wrapper__yhN0N","_target_market_wrapper":"card-module__target_market_wrapper__HGoE-","_url_wrapper":"card-module__url_wrapper__SaZRY","_text_wrapper":"card-module__text_wrapper__XU1NC","_source":"card-module__source__m3s-K","_number_leads_wrapper":"card-module__number_leads_wrapper__hJEhZ","_separator":"card-module__separator__dog1H","_country":"card-module__country__QRteF","_assigned_circle":"card-module__assigned_circle__GwnV2","_icon__container":"card-module__icon__container__K8HZ8","_status":"card-module__status__Zscnc","_assigned_to":"card-module__assigned_to__r1Fv-","_date":"card-module__date__JIlbg","_overdue":"card-module__overdue__guKcc","_name_wrapper":"card-module__name_wrapper__WxH34","_header":"card-module__header__IyqhT","_card_wrapper":"card-module__card_wrapper__dS48Z","_filters__title":"card-module__filters__title__qs5nu","_clear_wrapper":"card-module__clear_wrapper__XHWj9","_footer_wrapper":"card-module__footer_wrapper__W6fA4","_timezome_wrapper":"card-module__timezome_wrapper__HeCiu","_name_container":"card-module__name_container__Wefcr","_icon_wrapper":"card-module__icon_wrapper__pvbbN","_more_filter_input":"card-module__more_filter_input__bGs5U","_filled_more_filter_input":"card-module__filled_more_filter_input__o3BqW","_select_all_wrapper":"card-module__select_all_wrapper__Vb57o","_transition":"card-module__transition__TjcKc","_filter_container":"card-module__filter_container__WD-Gq","_button_wrapper":"card-module__button_wrapper__TPAyx","_message":"card-module__message__UnYpF","_hidden":"card-module__hidden__eA-x9","_show_complete_wrapper":"card-module__show_complete_wrapper__pbR-z","_date_wrapper":"card-module__date_wrapper__SCSIe","_filter_wrapper":"card-module__filter_wrapper__M1xyH","_xs_hidden":"card-module__xs_hidden__LINb4","_s_hidden":"card-module__s_hidden__urIHB","_m_hidden":"card-module__m_hidden__Vr5JZ","_l_hidden":"card-module__l_hidden__mjt8A"};
styleInject(css_248z$i);

var AssigneeComponent = function AssigneeComponent(_ref) {
  var _users$users;
  var value = _ref.value,
    extra = _ref.extra,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 's' : _ref$size;
  var users = useUserSearch();
  var author = users === null || users === void 0 ? void 0 : (_users$users = users.users) === null || _users$users === void 0 ? void 0 : _users$users.find(function (user) {
    return typeof value === 'string' ? (user === null || user === void 0 ? void 0 : user.id) === value : (user === null || user === void 0 ? void 0 : user.id) === (value === null || value === void 0 ? void 0 : value.value);
  });
  var title = extra ? extra + (author === null || author === void 0 ? void 0 : author.name) : author === null || author === void 0 ? void 0 : author.name;
  return /*#__PURE__*/jsx("div", {
    className: styles$i._assigned_circle,
    children: /*#__PURE__*/jsx(Tooltip, {
      title: title || 'Unassigned',
      position: "top",
      children: /*#__PURE__*/jsx(CircularBadge, {
        size: size,
        color: "lightPeanut",
        style: {
          color: author !== null && author !== void 0 && author.color ? 'var(--white)' : 'var(--peanut)',
          fontSize: '8px'
        },
        backgroundColor: (author === null || author === void 0 ? void 0 : author.color) || 'lightPeanut',
        children: (author === null || author === void 0 ? void 0 : author.shortname) || 'U'
      })
    })
  });
};

var css_248z$h = ".autoCompleteSearchCompanies-module__item_wrapper__7mVJo {\n  width: 520px;\n  max-height: 200px;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.autoCompleteSearchCompanies-module__company__info__npAeW {\n  margin-left: 8px;\n}\n\n.autoCompleteSearchCompanies-module__company__website__DUyWD {\n  display: flex;\n  align-items: center;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n.autoCompleteSearchCompanies-module__company__website__DUyWD > * {\n  margin-right: 4px;\n}\n\n.autoCompleteSearchCompanies-module__company__icon__RkIbV {\n  flex-shrink: 0;\n}\n\n.autoCompleteSearchCompanies-module_noResults__EFfdh {\n  margin-left: 8px;\n}\n";
var styles$h = {"_item_wrapper":"autoCompleteSearchCompanies-module__item_wrapper__7mVJo","_company__info":"autoCompleteSearchCompanies-module__company__info__npAeW","_company__website":"autoCompleteSearchCompanies-module__company__website__DUyWD","_company__icon":"autoCompleteSearchCompanies-module__company__icon__RkIbV","noResults":"autoCompleteSearchCompanies-module_noResults__EFfdh"};
styleInject(css_248z$h);

function _slicedToArray$9(arr, i) { return _arrayWithHoles$9(arr) || _iterableToArrayLimit$9(arr, i) || _unsupportedIterableToArray$9(arr, i) || _nonIterableRest$9(); }
function _nonIterableRest$9() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$9(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$9(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$9(o, minLen); }
function _arrayLikeToArray$9(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$9(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$9(arr) { if (Array.isArray(arr)) return arr; }
var AutoCompleteSearchCompanies = function AutoCompleteSearchCompanies(_ref) {
  var onCompanyIdChange = _ref.onCompanyIdChange,
    onChange = _ref.onChange,
    value = _ref.value,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$name = _ref.name,
    name = _ref$name === void 0 ? 'company' : _ref$name,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? '200px' : _ref$width,
    accountId = _ref.accountId,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray$9(_React$useState, 2),
    focused = _React$useState2[0],
    setFocused = _React$useState2[1];
  var onFocus = function onFocus() {
    return setFocused(true);
  };
  var onBlur = function onBlur() {
    return setFocused(false);
  };
  var _useVisible = useVisible(false),
    ref = _useVisible.ref,
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  var _useState = useState([]),
    _useState2 = _slicedToArray$9(_useState, 2),
    options = _useState2[0],
    setOptions = _useState2[1];
  var _useState3 = useState(value),
    _useState4 = _slicedToArray$9(_useState3, 2),
    searchValue = _useState4[0],
    setSearchValue = _useState4[1];
  var _useState5 = useState(''),
    _useState6 = _slicedToArray$9(_useState5, 2),
    selectedValue = _useState6[0],
    setSelectedValue = _useState6[1];
  var debounceSearchValue = useDebounce(searchValue, 200);
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  useEffect(function () {
    if (value) {
      setSearchValue(value);
      setSelectedValue(value);
    }
  }, [value]);
  useEffect(function () {
    var query = {};
    if (debounceSearchValue) {
      query[COMPANY_FIELDS_LOGIC_ROLE.NAME] = [debounceSearchValue];
    }
    api.post("/bobjects/".concat(accountId, "/Company/search"), {
      injectReferences: false,
      query: query,
      formFields: true,
      pageSize: 50
    }).then(function (data) {
      var _data$data;
      var contents = data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.contents;
      var newOptions = contents.map(function (company) {
        return {
          id: company === null || company === void 0 ? void 0 : company.id.value,
          name: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME),
          targetMarket: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET),
          website: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.WEBSITE),
          country: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.COUNTRY, true),
          bobject: company
        };
      });
      setOptions(newOptions);
    });
  }, [debounceSearchValue]);
  useEffect(function () {
    setVisible(options.length > 0 && searchValue !== selectedValue || focused);
  }, [options.length, selectedValue, searchValue, focused]);
  var handleSelect = function handleSelect(bobjectId) {
    if (!bobjectId) {
      if (onChange && typeof onChange === 'function') {
        onChange(null);
      }
    } else {
      var company = options.find(function (option) {
        return option.id === bobjectId;
      });
      if (onCompanyIdChange && typeof onCompanyIdChange === 'function') {
        onCompanyIdChange(bobjectId);
      }
      if (onChange && typeof onChange === 'function') {
        onChange(company === null || company === void 0 ? void 0 : company.bobject);
      }
      setSearchValue(company === null || company === void 0 ? void 0 : company.name);
      setSelectedValue(company === null || company === void 0 ? void 0 : company.name);
    }
  };
  var onClose = function onClose() {
    if ((!searchValue || searchValue === '') && (value !== '' || value)) {
      handleSelect(null);
    }
  };
  return /*#__PURE__*/jsx("div", {
    ref: ref,
    children: /*#__PURE__*/jsx(Dropdown, {
      width: "100%",
      visible: visible,
      onClose: onClose,
      arrow: false,
      anchor: /*#__PURE__*/jsx(Input$1, {
        width: "100%",
        placeholder: searchValue ? "".concat(t('common.company_other'), " *") : "".concat(t('common.search'), " ").concat(t('common.company_other').toLowerCase(), " *"),
        value: searchValue,
        onChange: setSearchValue,
        disabled: disabled,
        size: size,
        name: name,
        onFocus: onFocus,
        onBlur: onBlur,
        icon: "search"
      }),
      children: /*#__PURE__*/jsx("div", {
        className: styles$h._item_wrapper,
        style: {
          width: width
        },
        children: (options === null || options === void 0 ? void 0 : options.length) > 0 ? /*#__PURE__*/jsx(Fragment, {
          children: options.map(function (option) {
            return /*#__PURE__*/jsx(Item, {
              onMouseDown: function onMouseDown() {
                return handleSelect(option.id);
              },
              value: option.id,
              children: /*#__PURE__*/jsxs("div", {
                className: styles$h._company__info,
                children: [/*#__PURE__*/jsx(Text, {
                  color: "peanut",
                  size: "s",
                  weight: "medium",
                  ellipsis: 30,
                  children: option === null || option === void 0 ? void 0 : option.name
                }), /*#__PURE__*/jsxs(Text, {
                  color: "softPeanut",
                  size: "s",
                  inline: true,
                  className: styles$h._company__website,
                  children: [(option === null || option === void 0 ? void 0 : option.website) && /*#__PURE__*/jsxs(Fragment, {
                    children: [/*#__PURE__*/jsx(Icon, {
                      size: 16,
                      name: "timezones",
                      color: "softPeanut",
                      className: styles$h._company__icon
                    }), option === null || option === void 0 ? void 0 : option.website]
                  }), option.website && (option === null || option === void 0 ? void 0 : option.country) && ' | ', (option === null || option === void 0 ? void 0 : option.country) || '']
                })]
              })
            }, option.id);
          })
        }) : /*#__PURE__*/jsx("div", {
          className: styles$h.noResults,
          children: /*#__PURE__*/jsx(Text, {
            color: "softPeanut",
            size: "s",
            children: t('common.noResultsFound')
          })
        })
      })
    })
  });
};

var css_248z$g = ".autoCompleteSearchLeads-module__item_wrapper__Nu-sA {\n  width: 520px;\n  max-height: 200px;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.autoCompleteSearchLeads-module__relative__Dd-bX {\n  width: 100%;\n  position: relative;\n}\n\n.autoCompleteSearchLeads-module__lead__info__UCC0J {\n  margin-left: 8px;\n}\n\n.autoCompleteSearchLeads-module__lead__company__s3Vqh {\n  display: flex;\n  align-items: center;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n.autoCompleteSearchLeads-module__lead__company__s3Vqh > * {\n  margin-right: 4px;\n}\n\n.autoCompleteSearchLeads-module__company__icon__zBs2L {\n  flex-shrink: 0;\n}\n\n.autoCompleteSearchLeads-module__no_results__RQ1bT {\n  margin-left: 8px;\n}\n";
var styles$g = {"_item_wrapper":"autoCompleteSearchLeads-module__item_wrapper__Nu-sA","_relative":"autoCompleteSearchLeads-module__relative__Dd-bX","_lead__info":"autoCompleteSearchLeads-module__lead__info__UCC0J","_lead__company":"autoCompleteSearchLeads-module__lead__company__s3Vqh","_company__icon":"autoCompleteSearchLeads-module__company__icon__zBs2L","_no_results":"autoCompleteSearchLeads-module__no_results__RQ1bT"};
styleInject(css_248z$g);

function _typeof$c(obj) { "@babel/helpers - typeof"; return _typeof$c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$c(obj); }
function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) { _defineProperty$b(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$b(obj, key, value) { key = _toPropertyKey$b(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$b(arg) { var key = _toPrimitive$b(arg, "string"); return _typeof$c(key) === "symbol" ? key : String(key); }
function _toPrimitive$b(input, hint) { if (_typeof$c(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$c(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$8(arr, i) { return _arrayWithHoles$8(arr) || _iterableToArrayLimit$8(arr, i) || _unsupportedIterableToArray$8(arr, i) || _nonIterableRest$8(); }
function _nonIterableRest$8() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$8(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$8(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen); }
function _arrayLikeToArray$8(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$8(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$8(arr) { if (Array.isArray(arr)) return arr; }
var AutoCompleteSearchLeads = function AutoCompleteSearchLeads(_ref) {
  var onLeadIdChange = _ref.onLeadIdChange,
    onChange = _ref.onChange,
    _ref$searchQuery = _ref.searchQuery,
    searchQuery = _ref$searchQuery === void 0 ? {} : _ref$searchQuery,
    value = _ref.value,
    companyId = _ref.companyId,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$name = _ref.name,
    name = _ref$name === void 0 ? 'lead' : _ref$name,
    _ref$injectReferences = _ref.injectReferences,
    injectReferences = _ref$injectReferences === void 0 ? false : _ref$injectReferences,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? '200px' : _ref$width,
    _ref$inputSize = _ref.inputSize,
    inputSize = _ref$inputSize === void 0 ? 'small' : _ref$inputSize,
    accountId = _ref.accountId;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray$8(_React$useState, 2),
    focused = _React$useState2[0],
    setFocused = _React$useState2[1];
  var onFocus = function onFocus() {
    return setFocused(true);
  };
  var onBlur = function onBlur() {
    return setFocused(false);
  };
  var _useVisible = useVisible(false),
    ref = _useVisible.ref,
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  var _useState = useState([]),
    _useState2 = _slicedToArray$8(_useState, 2),
    options = _useState2[0],
    setOptions = _useState2[1];
  var _useState3 = useState(value),
    _useState4 = _slicedToArray$8(_useState3, 2),
    searchValue = _useState4[0],
    setSearchValue = _useState4[1];
  var _useState5 = useState(''),
    _useState6 = _slicedToArray$8(_useState5, 2),
    selectedValue = _useState6[0],
    setSelectedValue = _useState6[1];
  var debounceSearchValue = useDebounce(searchValue, 200);
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'bobjects.autoCompleteSearchLeads'
    }),
    t = _useTranslation.t;
  useEffect(function () {
    if (value) {
      setSearchValue(value);
      setSelectedValue(value);
    } else {
      setSearchValue(null);
      setSelectedValue(null);
    }
  }, [value]);
  useEffect(function () {
    var query = _objectSpread$7({}, searchQuery);
    if (debounceSearchValue) {
      query[LEAD_FIELDS_LOGIC_ROLE.FULL_NAME] = {
        query: [debounceSearchValue],
        searchMode: 'AUTOCOMPLETE__SEARCH'
      };
    }
    if (companyId) {
      query[LEAD_FIELDS_LOGIC_ROLE.COMPANY] = companyId;
    }
    api.post("/bobjects/".concat(accountId, "/Lead/search"), {
      injectReferences: injectReferences,
      query: query,
      columns: [LEAD_FIELDS_LOGIC_ROLE.FULL_NAME, LEAD_FIELDS_LOGIC_ROLE.COMPANY, LEAD_FIELDS_LOGIC_ROLE.ICP, LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE, LEAD_FIELDS_LOGIC_ROLE.EMAIL],
      formFields: true,
      pageSize: 50
    }).then(function (data) {
      var _data$data;
      var contents = data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.contents;
      var newOptions = contents.map(function (lead) {
        var company = getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.COMPANY).referencedBobject;
        return {
          id: lead === null || lead === void 0 ? void 0 : lead.id.value,
          name: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
          companyName: company ? getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME) : null,
          buyerPersona: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ICP),
          jobTitle: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE),
          bobject: lead
        };
      });
      setOptions(newOptions);
    });
  }, [debounceSearchValue, focused]);
  useEffect(function () {
    setVisible(options.length > 0 && searchValue !== selectedValue || focused);
  }, [options.length, focused]);
  var handleSelect = function handleSelect(bobjectId) {
    if (!bobjectId) {
      onChange(null);
    } else {
      var lead = options.find(function (option) {
        return option.id === bobjectId;
      });
      var urlLead = bobjectId.split('/');
      var leadId = urlLead[urlLead.length - 1];
      if (onLeadIdChange && typeof onLeadIdChange === 'function') {
        onLeadIdChange(leadId);
      }
      if (onChange && typeof onChange === 'function') {
        onChange(lead === null || lead === void 0 ? void 0 : lead.bobject);
      }
      setSearchValue(lead === null || lead === void 0 ? void 0 : lead.name);
      setSelectedValue(lead === null || lead === void 0 ? void 0 : lead.name);
      setVisible(false);
    }
  };
  return /*#__PURE__*/jsx("div", {
    ref: ref,
    children: /*#__PURE__*/jsx(Dropdown, {
      width: "100%",
      visible: visible,
      fallbackPositions: ['bottom-start', 'bottom-end', 'top-end'],
      arrow: false,
      anchor: /*#__PURE__*/jsx("div", {
        children: /*#__PURE__*/jsx(SearchInput, {
          width: "100%",
          placeholder: t('placeholder'),
          value: searchValue,
          onChange: setSearchValue,
          disabled: disabled,
          size: inputSize,
          name: name,
          onFocus: onFocus,
          onBlur: onBlur
        })
      }),
      children: /*#__PURE__*/jsx("div", {
        className: styles$g._item_wrapper,
        style: {
          width: width
        },
        children: (options === null || options === void 0 ? void 0 : options.length) === 0 ? /*#__PURE__*/jsx(Text, {
          className: styles$g._no_results,
          size: "s",
          color: "verySoftPeanut",
          children: t('noResults')
        }) : /*#__PURE__*/jsx(Fragment, {
          children: options.map(function (option) {
            return /*#__PURE__*/jsx(Item, {
              onMouseDown: function onMouseDown() {
                handleSelect(option.id);
              },
              value: option.id,
              children: /*#__PURE__*/jsx(Fragment, {
                children: /*#__PURE__*/jsxs("div", {
                  className: styles$g._lead__info,
                  children: [/*#__PURE__*/jsx(Text, {
                    color: "peanut",
                    size: "s",
                    weight: "medium",
                    ellipsis: 30,
                    children: option === null || option === void 0 ? void 0 : option.name
                  }), /*#__PURE__*/jsxs(Text, {
                    color: "softPeanut",
                    size: "xs",
                    inline: true,
                    className: styles$g._lead__company,
                    children: [(option === null || option === void 0 ? void 0 : option.companyName) && /*#__PURE__*/jsxs(Fragment, {
                      children: [/*#__PURE__*/jsx(Icon, {
                        size: 16,
                        name: "company",
                        color: "softPeanut",
                        className: styles$g._company__icon
                      }), option === null || option === void 0 ? void 0 : option.companyName]
                    }), option.companyName && option.jobTitle && ' | ', option.jobTitle || '']
                  })]
                })
              })
            }, option.id);
          })
        })
      })
    })
  });
};

function _typeof$b(obj) { "@babel/helpers - typeof"; return _typeof$b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$b(obj); }
function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty$a(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$a(obj, key, value) { key = _toPropertyKey$a(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$a(arg) { var key = _toPrimitive$a(arg, "string"); return _typeof$b(key) === "symbol" ? key : String(key); }
function _toPrimitive$a(input, hint) { if (_typeof$b(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$b(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$7(arr, i) { return _arrayWithHoles$7(arr) || _iterableToArrayLimit$7(arr, i) || _unsupportedIterableToArray$7(arr, i) || _nonIterableRest$7(); }
function _nonIterableRest$7() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$7(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$7(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen); }
function _arrayLikeToArray$7(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$7(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$7(arr) { if (Array.isArray(arr)) return arr; }
var confirmDeleteModalAtom = atom({
  key: 'confirmDeleteModal',
  "default": {
    isOpen: false,
    bobject: null,
    isQueuedBulk: undefined,
    // use this to close bobject details from outside the component
    setRefresh: function setRefresh() {},
    callback: function callback() {},
    length: null
  }
});
var useConfirmDeleteModal = function useConfirmDeleteModal() {
  var _useRecoilState = useRecoilState(confirmDeleteModalAtom),
    _useRecoilState2 = _slicedToArray$7(_useRecoilState, 2),
    state = _useRecoilState2[0],
    setState = _useRecoilState2[1];
  var resetState = useResetRecoilState(confirmDeleteModalAtom);
  var closeDeleteModal = function closeDeleteModal() {
    resetState();
  };
  var openDeleteModal = function openDeleteModal(bobject) {
    var isQueuedBulk = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var setRefresh = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
    var length = arguments.length > 4 ? arguments[4] : undefined;
    setState({
      isOpen: true,
      bobject: bobject,
      isQueuedBulk: isQueuedBulk,
      setRefresh: setRefresh,
      length: length,
      callback: callback
    });
  };
  return _objectSpread$6(_objectSpread$6({}, state), {}, {
    openDeleteModal: openDeleteModal,
    closeDeleteModal: closeDeleteModal
  });
};

var css_248z$f = ".ConfirmDeleteModal-module__content__-V0zS {\n  margin-bottom: 32px;\n}\n\n.ConfirmDeleteModal-module__content__-V0zS > p:first-child {\n  margin-bottom: 8px;\n}\n";
var styles$f = {"_content":"ConfirmDeleteModal-module__content__-V0zS"};
styleInject(css_248z$f);

function _typeof$a(obj) { "@babel/helpers - typeof"; return _typeof$a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$a(obj); }
function _regeneratorRuntime$1() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$1 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$a(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty$9(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$9(obj, key, value) { key = _toPropertyKey$9(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$9(arg) { var key = _toPrimitive$9(arg, "string"); return _typeof$a(key) === "symbol" ? key : String(key); }
function _toPrimitive$9(input, hint) { if (_typeof$a(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$a(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$1(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var ConfirmDeleteModal = function ConfirmDeleteModal(_ref) {
  var _bobject$id, _sampleBobject$id;
  var history = _ref.history,
    location = _ref.location;
  var _useConfirmDeleteModa = useConfirmDeleteModal(),
    bobject = _useConfirmDeleteModa.bobject,
    isOpen = _useConfirmDeleteModa.isOpen,
    closeDeleteModal = _useConfirmDeleteModa.closeDeleteModal,
    isQueuedBulk = _useConfirmDeleteModa.isQueuedBulk,
    setRefresh = _useConfirmDeleteModa.setRefresh,
    length = _useConfirmDeleteModa.length,
    callback = _useConfirmDeleteModa.callback;
  var _useSelectAll = useSelectAll(),
    resetSelectedItems = _useSelectAll.resetSelectedItems;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  if (!isOpen) return null;
  var accountId = bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.accountId;
  var isBulk = Array.isArray(bobject);
  var sampleBobject = isBulk ? bobject[0] : bobject;
  var bobjectType = sampleBobject === null || sampleBobject === void 0 ? void 0 : (_sampleBobject$id = sampleBobject.id) === null || _sampleBobject$id === void 0 ? void 0 : _sampleBobject$id.typeName;
  var bobjectName = getValueFromLogicRole(sampleBobject, "".concat(bobjectType === null || bobjectType === void 0 ? void 0 : bobjectType.toUpperCase(), "__NAME"));
  var handleDelete = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee() {
      var objectsIds, allItems, _bobject$id2, _location$pathname, company, _getFieldByLogicRole, companyLead;
      return _regeneratorRuntime$1().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!isBulk) {
              _context.next = 12;
              break;
            }
            objectsIds = bobject === null || bobject === void 0 ? void 0 : bobject.map(function (object) {
              var _object$id;
              return object === null || object === void 0 ? void 0 : (_object$id = object.id) === null || _object$id === void 0 ? void 0 : _object$id.objectId;
            });
            if (!isQueuedBulk) {
              _context.next = 7;
              break;
            }
            allItems = typeof isQueuedBulk !== 'boolean' && 'query' in isQueuedBulk;
            api.post("/bobjects/bulkAction/createBulk".concat(allItems ? 'ByQuery' : ''), _objectSpread$5(_objectSpread$5({
              importName: "Delete ".concat(allItems ? isQueuedBulk === null || isQueuedBulk === void 0 ? void 0 : isQueuedBulk.totalItems : bobject === null || bobject === void 0 ? void 0 : bobject.length, " ").concat(PluralBobjectTypes[bobjectType]),
              actionType: 'DELETE',
              bobjectType: bobjectType
            }, allItems ? {
              query: {
                query: isQueuedBulk.query
              }
            } : {
              bobjectIds: bobject === null || bobject === void 0 ? void 0 : bobject.map(function (b) {
                var _b$id;
                return b === null || b === void 0 ? void 0 : (_b$id = b.id) === null || _b$id === void 0 ? void 0 : _b$id.objectId;
              })
            }), {}, {
              contents: {}
            })).then(function () {
              closeDeleteModal();
              setRefresh(true);
            });
            _context.next = 9;
            break;
          case 7:
            _context.next = 9;
            return api["delete"]("".concat(accountId, "/").concat(bobjectType, "/delete/bulk"), {
              data: [objectsIds]
            });
          case 9:
            resetSelectedItems();
            _context.next = 14;
            break;
          case 12:
            _context.next = 14;
            return api["delete"]("/bobjects/".concat(bobject === null || bobject === void 0 ? void 0 : (_bobject$id2 = bobject.id) === null || _bobject$id2 === void 0 ? void 0 : _bobject$id2.value), {
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              },
              data: {}
            });
          case 14:
            //mutate, dont redirect if FE
            if (history && location) {
              if ((_location$pathname = location.pathname) !== null && _location$pathname !== void 0 && _location$pathname.includes(APP_CL)) {
                if (isCompany(bobject)) {
                  history.push(APP_CL_COMPANIES);
                } else if (isOpportunity(bobject)) {
                  company = getRelatedBobject(bobject, BobjectTypes.Company);
                  history.push(companyUrl(company));
                } else if (isLead(bobject)) {
                  companyLead = (_getFieldByLogicRole = getFieldByLogicRole(bobject, FIELDS_LOGIC_ROLE[bobjectType].COMPANY)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.text;
                  if (!companyLead) {
                    history.push(APP_CL_LEADS);
                  } else {
                    history.push(companyIdUrl(companyLead));
                  }
                }
              }
            }
            if (callback) {
              callback();
            }
            closeDeleteModal();
          case 17:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleDelete() {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/jsxs(Modal, {
    width: 600,
    open: isOpen,
    onClose: closeDeleteModal,
    children: [/*#__PURE__*/jsx(ModalHeader, {
      children: /*#__PURE__*/jsx(ModalTitle, {
        children: t('bobjects.confirmDeleteModal.title', {
          bobject: bobjectType ? t("bobjectTypes.".concat(bobjectType.toLowerCase())) : ''
        })
      })
    }), /*#__PURE__*/jsx(ModalContent, {
      children: /*#__PURE__*/jsxs("div", {
        className: styles$f._content,
        children: [isBulk ? /*#__PURE__*/jsx(Text, {
          size: "m",
          children: t('bobjects.confirmDeleteModal.bulkMessage', {
            count: length || (bobject === null || bobject === void 0 ? void 0 : bobject.length) || 0,
            bobjectType: t("bobjectTypes.".concat(bobjectType.toLowerCase()), {
              count: length || (bobject === null || bobject === void 0 ? void 0 : bobject.length) || 0
            })
          })
        }) : /*#__PURE__*/jsx(Text, {
          size: "m",
          children: t('bobjects.confirmDeleteModal.message', {
            bobjectName: bobjectName ? bobjectName : '',
            bobjectType: bobjectType ? t("bobjectTypes.".concat(bobjectType.toLowerCase())) : ''
          })
        }), /*#__PURE__*/jsx(Text, {
          size: "m",
          children: /*#__PURE__*/jsx(Trans, {
            i18nKey: "bobjects.confirmDeleteModal.subtitle"
          })
        })]
      })
    }), /*#__PURE__*/jsxs(ModalFooter, {
      children: [/*#__PURE__*/jsx(Button, {
        variant: "tertiary",
        onClick: closeDeleteModal,
        children: t('bobjects.confirmDeleteModal.cancel')
      }), /*#__PURE__*/jsx(Button, {
        variant: "primary",
        color: "tomato",
        dataTest: "deleteModalDeleteButton",
        onClick: handleDelete,
        children: isBulk ? t('bobjects.confirmDeleteModal.deleteBulk', {
          bobjectType: t("bobjectTypes.".concat(bobjectType.toLowerCase()), {
            count: 2
          })
        }) : t('bobjects.confirmDeleteModal.delete')
      })]
    })]
  });
};

var css_248z$e = ".statusLabel-module__status_wrapper__xPn5N {\n  display: flex;\n  justify-content: center;\n  box-sizing: border-box;\n}\n\n.statusLabel-module__status_text__fIggI {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n";
var styles$e = {"_status_wrapper":"statusLabel-module__status_wrapper__xPn5N","_status_text":"statusLabel-module__status_text__fIggI"};
styleInject(css_248z$e);

function _typeof$9(obj) { "@babel/helpers - typeof"; return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$9(obj); }
function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty$8(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$8(obj, key, value) { key = _toPropertyKey$8(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$8(arg) { var key = _toPrimitive$8(arg, "string"); return _typeof$9(key) === "symbol" ? key : String(key); }
function _toPrimitive$8(input, hint) { if (_typeof$9(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$9(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var StatusLabel = function StatusLabel(_ref) {
  var _ref$backgroundColor = _ref.backgroundColor,
    backgroundColor = _ref$backgroundColor === void 0 ? colors.peanut : _ref$backgroundColor,
    _ref$textColor = _ref.textColor,
    textColor = _ref$textColor === void 0 ? 'white' : _ref$textColor,
    _ref$maxWidth = _ref.maxWidth,
    maxWidth = _ref$maxWidth === void 0 ? 'auto' : _ref$maxWidth,
    _ref$logicRole = _ref.logicRole,
    logicRole = _ref$logicRole === void 0 ? '' : _ref$logicRole,
    _ref$key = _ref.key,
    key = _ref$key === void 0 ? '' : _ref$key,
    _ref$name = _ref.name,
    name = _ref$name === void 0 ? 'unknown' : _ref$name,
    _ref$showColor = _ref.showColor,
    showColor = _ref$showColor === void 0 ? true : _ref$showColor,
    onClick = _ref.onClick;
  var style = {
    backgroundColor: backgroundColor,
    borderColor: backgroundColor,
    color: textColor,
    maxWidth: maxWidth
  };
  return /*#__PURE__*/jsx("div", {
    className: styles$e._status_wrapper,
    children: /*#__PURE__*/jsx(Label, _objectSpread$4(_objectSpread$4({
      value: logicRole,
      dataTest: logicRole !== null && logicRole !== void 0 ? logicRole : 'status',
      align: "center",
      inline: false,
      onClick: onClick,
      selected: showColor,
      hoverStyle: style,
      overrideStyle: {
        width: '100%',
        boxSizing: 'border-box'
      }
    }, showColor ? {
      selectedStyle: style
    } : {}), {}, {
      children: /*#__PURE__*/jsx(Text, {
        htmlTag: "span",
        color: textColor,
        size: "s",
        className: styles$e._status_text,
        children: name
      })
    }), "status-".concat(key ? key : name))
  }, "status-".concat(name));
};

var css_248z$d = ".bobjectItem-module_emptyBox__Woxmj {\n  padding: 12px 24px;\n  display: flex;\n  flex-direction: row;\n}\n\n.bobjectItem-module_emptyBoxLeft__i5coT {\n  width: 45%;\n  left: 0;\n  padding-right: 12px;\n  display: flex;\n  flex-direction: column;\n}\n\n.bobjectItem-module_emptyBoxCenter__O0EJN {\n  width: 0;\n  border-left: 1px solid var(--lightPeanut);\n}\n\n.bobjectItem-module_emptyBoxRight__0KDeC {\n  width: 55%;\n  right: 0;\n  padding-left: 12px;\n  display: flex;\n  flex-direction: column;\n}\n\n.bobjectItem-module_historyList__-X17p {\n  flex-grow: 1;\n}\n\n.bobjectItem-module_historyListItem__PRu2X {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  cursor: pointer;\n}\n\n.bobjectItem-module_historyListItem__PRu2X p {\n  width: 330px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.bobjectItem-module_historyListItem__PRu2X:hover {\n  background-color: var(--veryLightBloobirds);\n}\n\n.bobjectItem-module_message__gkzgh {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 24px;\n}\n\n.bobjectItem-module_firstTime__9L2oi {\n  padding: 16px 24px 24px 24px;\n  display: flex;\n  flex-direction: column;\n}\n\n.bobjectItem-module_firstTimeTitle__BvWQC {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.bobjectItem-module_firstTimeBody__OOfC4 {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  align-self: center;\n  margin-bottom: 20px;\n}\n\n.bobjectItem-module_firstTimeBodyTitle__rbxYf {\n  margin-top: 16px;\n}\n\n.bobjectItem-module_firstTimeBodyIconText__2yz5K {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.bobjectItem-module_firstTimeBodyIcon__Ulith {\n  margin-right: 8px;\n}\n\n.bobjectItem-module_emptyResultsContainer__xBwhr {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 60px;\n}\n\n.bobjectItem-module_emptyResultsIcon__mrQKp {\n  height: 45px;\n  width: 45px;\n  margin: 12px 0;\n}\n\n.bobjectItem-module_emptyResultsIcon__mrQKp > g,\n.bobjectItem-module_emptyResultsIcon__mrQKp > path {\n  fill: var(--verySoftPeanut);\n}\n\n.bobjectItem-module_noRecentActivityRow__g2siw {\n  height: 100%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.bobjectItem-module_noRecentActivityColumn__Nrre1 {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.bobjectItem-module_bobjectItem__LyhVO {\n  height: 48px;\n  display: flex;\n  align-items: center;\n  padding: 1px 36px;\n  position: relative;\n}\n\n.bobjectItem-module_bobjectItem__LyhVO:hover {\n  cursor: pointer;\n}\n\n.bobjectItem-module_bobjectItemType__XPTZQ {\n  margin-left: 4px;\n}\n\n.bobjectItem-module_bobjectItemCompressed__k5ogt {\n  height: 48px;\n  display: flex;\n  align-items: center;\n  padding: 2px 12px;\n  cursor: pointer;\n}\n\n.bobjectItem-module_bobjectItemCompressed__k5ogt:hover {\n  background-color: var(--veryLightBloobirds);\n}\n\n.bobjectItem-module_ellipse__pWq7x {\n  width: 4px;\n  height: 4px;\n  border-radius: 50%;\n  background-color: var(--softPeanut);\n}\n\n.bobjectItem-module_bobjectItem_selected__UzQJA {\n  background-color: var(--veryLightBloobirds);\n}\n\n.bobjectItem-module_bobjectItemSelectedActionsColumn__AyMv5 {\n  margin-left: 8px;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n}\n\n.bobjectItem-module_bobjectItemSelectedActionsRow__zfOzP > * {\n  margin-left: 4px;\n  margin-top: 2px;\n}\n\n.bobjectItem-module_circleIcon__lF3rj {\n  height: 33px;\n  width: 33px;\n  min-width: 33px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--lightestBloobirds);\n  border-radius: 50%;\n}\n\n.bobjectItem-module_bobjectItem_prospecting__yp2vF {\n  border-left: 4px solid var(--verySoftGrape);\n}\n\n.bobjectItem-module_bobjectItem_sales__1aVZP {\n  border-left: 4px solid var(--peanut);\n}\n\n.bobjectItem-module_bobjectItem_border__NIkbt {\n  border-left: 4px solid var(--lightPeanut);\n}\n\n.bobjectItem-module_bobjectItem_webapp__xdK0C > div:nth-child(2) {\n  max-width: 300px;\n}\n\n.bobjectItem-module_bobjectItem_preview_button_wrapper__UbkpF {\n  padding: 3px;\n  display: flex;\n  align-items: center;\n  background-color: var(--veryLightBloobirds);\n  position: absolute;\n  right: 422px;\n}\n\n.bobjectItem-module_bobjectItem_preview_button__UBOUl {\n  padding: 3px 8px !important;\n}\n\n.bobjectItem-module_bobjectItem_show_more__7ckUU {\n  width: 100%;\n  display: flex;\n  justify-content: space-around;\n  padding: 10px 0;\n}\n\n.bobjectItem-module_bobjectItem_show_more__7ckUU:hover {\n  cursor: pointer;\n}\n\n.bobjectItem-module_bobjectItemContent__P3Pc9 {\n  margin-left: 8px;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  justify-content: space-around;\n  overflow: hidden;\n}\n\n.bobjectItem-module_bobjectItemName__jHotk {\n  height: 20px;\n  cursor: pointer;\n  margin-top: 6px;\n}\n\n.bobjectItem-module_bobjectItemContentInfoRow__tZXN2 {\n  display: flex;\n  flex-direction: row;\n  overflow: hidden;\n}\n\n.bobjectItem-module_bobjectItemContentSpan__UzhBz {\n  height: 16px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.bobjectItem-module_bobjectItemContentInfoRowSeparator__uc5OU {\n  height: 100%;\n  display: flex;\n  flex-direction: row;\n  gap: 1px;\n  margin-right: 2px;\n  margin-left: 2px;\n}\n\n.bobjectItem-module_bobjectItemContentCenter__RH-JN {\n  display: flex;\n  flex-direction: row;\n  position: relative;\n}\n\n.bobjectItem-module_bobjectItemContentCenterOTO__jg7xN {\n  position: absolute;\n  left: 720px;\n}\n\n.bobjectItem-module_bobjectItemContentCenterColumn__eXed3 {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  margin-left: 4px;\n  min-width: 34px;\n  justify-content: center;\n}\n\n.bobjectItem-module_bobjectItemContentCenterRow__FD0Bo {\n  display: flex;\n  flex-direction: row;\n  gap: 2px;\n  flex-grow: 1;\n}\n\n.bobjectItem-module_bobjectItemContentCompressed__kLYeV {\n  margin-left: 8px;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n}\n\n.bobjectItem-module_searchResultsList__wma2r {\n  max-height: 700px;\n}\n\n.bobjectItem-module_searchResults__2GpkO {\n  max-height: 506px;\n  overflow: scroll;\n}\n\n.bobjectItem-module_boxNoMoreResults__5w8vq {\n  padding-bottom: 40px;\n}\n.bobjectItem-module_boxWithMoreResults__Uh5vn {\n  padding-bottom: 4px;\n}\n\n.bobjectItem-module_box__xvYYz {\n  position: absolute;\n  z-index: 2;\n\n  top: 48px;\n  left: 50%;\n  transform: translateX(-50%);\n\n  width: 800px;\n  background: #ffffff;\n\n  /* Main/peanut-light */\n  border: 1px solid #d4e0f1;\n\n  /* snackbar-shadow */\n  box-shadow: 0 2px 8px rgba(70, 79, 87, 0.33);\n  border-radius: 4px;\n}\n\n.bobjectItem-module_bobjectItemContentInfoColumn__1UVy4 {\n  display: flex;\n  flex-direction: row;\n  max-width: 50%;\n}\n\n.bobjectItem-module_bobjectItemRight__hEYQH {\n  margin-left: auto;\n}\n\n.bobjectItem-module_bobjectItemRightOTO__MK5r5 {\n  position: absolute;\n  left: 66%;\n}\n";
var styles$d = {"emptyBox":"bobjectItem-module_emptyBox__Woxmj","emptyBoxLeft":"bobjectItem-module_emptyBoxLeft__i5coT","emptyBoxCenter":"bobjectItem-module_emptyBoxCenter__O0EJN","emptyBoxRight":"bobjectItem-module_emptyBoxRight__0KDeC","historyList":"bobjectItem-module_historyList__-X17p","historyListItem":"bobjectItem-module_historyListItem__PRu2X","message":"bobjectItem-module_message__gkzgh","firstTime":"bobjectItem-module_firstTime__9L2oi","firstTimeTitle":"bobjectItem-module_firstTimeTitle__BvWQC","firstTimeBody":"bobjectItem-module_firstTimeBody__OOfC4","firstTimeBodyTitle":"bobjectItem-module_firstTimeBodyTitle__rbxYf","firstTimeBodyIconText":"bobjectItem-module_firstTimeBodyIconText__2yz5K","firstTimeBodyIcon":"bobjectItem-module_firstTimeBodyIcon__Ulith","emptyResultsContainer":"bobjectItem-module_emptyResultsContainer__xBwhr","emptyResultsIcon":"bobjectItem-module_emptyResultsIcon__mrQKp","noRecentActivityRow":"bobjectItem-module_noRecentActivityRow__g2siw","noRecentActivityColumn":"bobjectItem-module_noRecentActivityColumn__Nrre1","bobjectItem":"bobjectItem-module_bobjectItem__LyhVO","bobjectItemType":"bobjectItem-module_bobjectItemType__XPTZQ","bobjectItemCompressed":"bobjectItem-module_bobjectItemCompressed__k5ogt","ellipse":"bobjectItem-module_ellipse__pWq7x","bobjectItem_selected":"bobjectItem-module_bobjectItem_selected__UzQJA","bobjectItemSelectedActionsColumn":"bobjectItem-module_bobjectItemSelectedActionsColumn__AyMv5","bobjectItemSelectedActionsRow":"bobjectItem-module_bobjectItemSelectedActionsRow__zfOzP","circleIcon":"bobjectItem-module_circleIcon__lF3rj","bobjectItem_prospecting":"bobjectItem-module_bobjectItem_prospecting__yp2vF","bobjectItem_sales":"bobjectItem-module_bobjectItem_sales__1aVZP","bobjectItem_border":"bobjectItem-module_bobjectItem_border__NIkbt","bobjectItem_webapp":"bobjectItem-module_bobjectItem_webapp__xdK0C","bobjectItem_preview_button_wrapper":"bobjectItem-module_bobjectItem_preview_button_wrapper__UbkpF","bobjectItem_preview_button":"bobjectItem-module_bobjectItem_preview_button__UBOUl","bobjectItem_show_more":"bobjectItem-module_bobjectItem_show_more__7ckUU","bobjectItemContent":"bobjectItem-module_bobjectItemContent__P3Pc9","bobjectItemName":"bobjectItem-module_bobjectItemName__jHotk","bobjectItemContentInfoRow":"bobjectItem-module_bobjectItemContentInfoRow__tZXN2","bobjectItemContentSpan":"bobjectItem-module_bobjectItemContentSpan__UzhBz","bobjectItemContentInfoRowSeparator":"bobjectItem-module_bobjectItemContentInfoRowSeparator__uc5OU","bobjectItemContentCenter":"bobjectItem-module_bobjectItemContentCenter__RH-JN","bobjectItemContentCenterOTO":"bobjectItem-module_bobjectItemContentCenterOTO__jg7xN","bobjectItemContentCenterColumn":"bobjectItem-module_bobjectItemContentCenterColumn__eXed3","bobjectItemContentCenterRow":"bobjectItem-module_bobjectItemContentCenterRow__FD0Bo","bobjectItemContentCompressed":"bobjectItem-module_bobjectItemContentCompressed__kLYeV","searchResultsList":"bobjectItem-module_searchResultsList__wma2r","searchResults":"bobjectItem-module_searchResults__2GpkO","boxNoMoreResults":"bobjectItem-module_boxNoMoreResults__5w8vq","boxWithMoreResults":"bobjectItem-module_boxWithMoreResults__Uh5vn","box":"bobjectItem-module_box__xvYYz","bobjectItemContentInfoColumn":"bobjectItem-module_bobjectItemContentInfoColumn__1UVy4","bobjectItemRight":"bobjectItem-module_bobjectItemRight__hEYQH","bobjectItemRightOTO":"bobjectItem-module_bobjectItemRightOTO__MK5r5"};
styleInject(css_248z$d);

function getStage(bobject) {
  var _bobject$stage;
  return (bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType) === 'Opportunity' || (_bobject$stage = bobject.stage) !== null && _bobject$stage !== void 0 && _bobject$stage.includes('SALES') ? 'sales' : 'prospecting';
}
function getHitByName(hits, nameField) {
  var hitByName;
  if (hits) {
    var hasHitByName = false;
    if (hits && nameField !== null && nameField !== void 0 && nameField.id) {
      hasHitByName = hits[nameField.id];
    }
    if (hasHitByName) {
      hitByName = hasHitByName;
    }
  }
  return hitByName;
}
function getName(dataModel, bobject, hits) {
  var _bobject$bobjectType;
  var nameField = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole("".concat((bobject === null || bobject === void 0 ? void 0 : (_bobject$bobjectType = bobject.bobjectType) === null || _bobject$bobjectType === void 0 ? void 0 : _bobject$bobjectType.toUpperCase()) + ((bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType) === 'Lead' ? '__FULL' : '_'), "_NAME"));
  var hitByName = getHitByName(hits, nameField);
  var name;
  switch (bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType) {
    case 'Lead':
      name = bobject === null || bobject === void 0 ? void 0 : bobject.fullName;
      break;
    case 'Company':
      name = bobject === null || bobject === void 0 ? void 0 : bobject.companyName;
      break;
    case 'Opportunity':
      name = bobject === null || bobject === void 0 ? void 0 : bobject.name;
      break;
  }
  return {
    name: nameField ? hitByName !== null && hitByName !== void 0 ? hitByName : name : "Unnamed ".concat(bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType),
    hitByName: nameField === null || nameField === void 0 ? void 0 : nameField.id
  };
}
function getSubtitle(bobject) {
  if ((bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType) === 'Lead') {
    return bobject.jobTitle || bobject.email || bobject.phone;
  }
  if ((bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType) === 'Company') {
    return bobject.website;
  }
  if ((bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType) === 'Opportunity') {
    return bobject.amount;
  }
  return '';
}
function getStatus(type, stage, bobject, dataModel) {
  var salesLR = type === 'Opportunity' || stage === 'prospecting' ? '' : 'SALES_';
  var statusField = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole("".concat(type.toUpperCase(), "__").concat(salesLR, "STATUS"));
  if (!statusField) {
    return undefined;
  }
  var statusValues = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findValuesByFieldId(statusField.id);
  var statusId = bobject.rawBobject.contents[statusField.id];
  if (!statusId) {
    return undefined;
  }
  return statusValues.filter(function (status) {
    return status.id === statusId;
  })[0];
}

function _typeof$8(obj) { "@babel/helpers - typeof"; return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$8(obj); }
function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty$7(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$7(obj, key, value) { key = _toPropertyKey$7(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$7(arg) { var key = _toPrimitive$7(arg, "string"); return _typeof$8(key) === "symbol" ? key : String(key); }
function _toPrimitive$7(input, hint) { if (_typeof$8(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$8(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ICONS = {
  Lead: 'person',
  Company: 'company',
  Opportunity: 'fileOpportunity'
};
function resolveHit(hits, hitByName) {
  var obj = clone(hits);
  if (obj && obj[hitByName]) {
    delete obj[hitByName];
    return Object.values(obj)[0];
  }
  return Object.values(obj)[0];
}
function SearchStatusLabel(_ref) {
  var status = _ref.status;
  return status ? /*#__PURE__*/jsx(StatusLabel, {
    name: status.name,
    textColor: status.textColor,
    backgroundColor: status.backgroundColor,
    maxWidth: "200px"
  }) : null;
}
function CardLeftComponent(_ref2) {
  var bobject = _ref2.bobject,
    hits = _ref2.hits,
    handleCompanyClicked = _ref2.handleCompanyClicked;
  var dataModel = useDataModel();
  var isB2CAccount = useIsB2CAccount();
  var type = bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType;
  var _getName = getName(dataModel, bobject, hits),
    name = _getName.name,
    hitByName = _getName.hitByName;
  var subtitle = getSubtitle(bobject);
  var isNotCompany = type !== 'Company';
  var companyName = isNotCompany && bobject.companyName;
  var companyId = isNotCompany && bobject.companyId;
  var companyWebsite = isNotCompany && bobject.companyWebsite;
  var firstHit = hits && resolveHit(hits, hitByName);
  function handleCompanyClick(event) {
    var url = bobjectUrl({
      id: {
        typeName: companyId.split('/')[1],
        objectId: companyId.split('/')[2]
      }
    });
    var company = _objectSpread$3(_objectSpread$3({}, defaultSearchCompany), {}, {
      rawBobject: _objectSpread$3(_objectSpread$3({}, defaultSearchCompany.rawBobject), {}, {
        id: companyId
      }),
      bobjectType: BobjectTypes.Company,
      companyName: companyName,
      url: url,
      website: companyWebsite
    });
    handleCompanyClicked(company, event);
    event.stopPropagation();
  }
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx("div", {
      className: styles$d.circleIcon,
      children: /*#__PURE__*/jsx(Icon, {
        name: ICONS[type],
        size: 20,
        color: "bloobirds"
      })
    }), /*#__PURE__*/jsxs("div", {
      className: styles$d.bobjectItemContent,
      children: [/*#__PURE__*/jsx("div", {
        className: styles$d.bobjectItemName,
        children: /*#__PURE__*/jsx(Text, {
          size: "s",
          color: "bloobirds",
          className: styles$d.bobjectItemContentSpan,
          children: /*#__PURE__*/jsx("span", {
            dangerouslySetInnerHTML: {
              __html: name
            }
          })
        })
      }), /*#__PURE__*/jsxs("div", {
        className: styles$d.bobjectItemContentInfoRow,
        children: [/*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "softPeanut",
          className: styles$d.bobjectItemContentSpan,
          children: firstHit ? /*#__PURE__*/jsx("span", {
            dangerouslySetInnerHTML: {
              __html: firstHit
            }
          }) : subtitle
        }), companyName && !isB2CAccount && /*#__PURE__*/jsxs("div", {
          className: styles$d.bobjectItemContentInfoColumn,
          children: [/*#__PURE__*/jsxs("div", {
            className: styles$d.bobjectItemContentInfoRowSeparator,
            children: [(firstHit || subtitle) && /*#__PURE__*/jsx(Icon, {
              name: 'circle',
              size: 15,
              color: 'softPeanut'
            }), /*#__PURE__*/jsx(Icon, {
              name: 'company',
              size: 15,
              color: 'bloobirds'
            })]
          }), /*#__PURE__*/jsx("div", {
            onClick: function onClick(event) {
              return handleCompanyClick(event);
            },
            style: {
              cursor: 'pointer',
              overflow: 'hidden'
            },
            children: /*#__PURE__*/jsx(Text, {
              size: "xs",
              color: "bloobirds",
              className: styles$d.bobjectItemContentSpan,
              children: companyName
            })
          })]
        })]
      })]
    })]
  });
}
function CardCenterComponent(_ref3) {
  var bobject = _ref3.bobject,
    _ref3$isWebapp = _ref3.isWebapp,
    isWebapp = _ref3$isWebapp === void 0 ? false : _ref3$isWebapp;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var classes = clsx(styles$d.bobjectItemContentCenter, _defineProperty$7({}, styles$d.bobjectItemContentCenterOTO, !isWebapp));
  return /*#__PURE__*/jsxs("div", {
    className: classes,
    children: [/*#__PURE__*/jsx("div", {
      className: styles$d.bobjectItemContentCenterColumn,
      children: /*#__PURE__*/jsx(AssigneeComponent, {
        value: bobject.assignedTo
      })
    }), isWebapp && /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$d.bobjectItemContentCenterColumn,
        children: [/*#__PURE__*/jsx("div", {
          className: styles$d.bobjectItemContentCenterRow,
          children: /*#__PURE__*/jsxs(Tooltip, {
            title: t('bobjects.bobjectItem.attempts'),
            position: top,
            children: [/*#__PURE__*/jsx(Icon, {
              name: 'check',
              size: 15,
              color: 'softPeanut'
            }), /*#__PURE__*/jsx(Text, {
              size: "xs",
              color: "softPeanut",
              children: bobject.attempts
            })]
          })
        }), /*#__PURE__*/jsx("div", {
          className: styles$d.bobjectItemContentCenterRow,
          children: /*#__PURE__*/jsxs(Tooltip, {
            title: t('bobjects.bobjectItem.touches'),
            position: top,
            children: [/*#__PURE__*/jsx(Icon, {
              name: 'checkDouble',
              size: 15,
              color: 'bloobirds'
            }), /*#__PURE__*/jsx(Text, {
              size: "xs",
              color: "softPeanut",
              children: bobject.touches
            })]
          })
        })]
      }), /*#__PURE__*/jsxs("div", {
        className: styles$d.bobjectItemContentCenterColumn,
        children: [/*#__PURE__*/jsx("div", {
          className: styles$d.bobjectItemContentCenterRow,
          children: /*#__PURE__*/jsxs(Tooltip, {
            title: t('bobjects.bobjectItem.lastAttempt'),
            position: top,
            children: [/*#__PURE__*/jsx(Icon, {
              name: 'calendar',
              size: 15,
              color: 'softPeanut'
            }), /*#__PURE__*/jsx(Text, {
              size: "xs",
              color: "softPeanut",
              children: generateDatePrefix(bobject.lastAttemptDate && new Date(bobject.lastAttemptDate), true, t)
            })]
          })
        }), /*#__PURE__*/jsx("div", {
          className: styles$d.bobjectItemContentCenterRow,
          children: /*#__PURE__*/jsxs(Tooltip, {
            title: t('bobjects.bobjectItem.lastTouch'),
            position: top,
            children: [/*#__PURE__*/jsx(Icon, {
              name: 'calendar',
              size: 15,
              color: 'softPeanut'
            }), /*#__PURE__*/jsx(Text, {
              size: "xs",
              color: "softPeanut",
              children: generateDatePrefix(bobject.lastTouchDate && new Date(bobject.lastTouchDate), true, t)
            })]
          })
        })]
      })]
    })]
  });
}
function SearchPreviewButton(_ref4) {
  var isSelected = _ref4.isSelected,
    bobject = _ref4.bobject,
    handleClick = _ref4.handleClick;
  var _useTranslation2 = useTranslation(),
    t = _useTranslation2.t;
  return isSelected ? /*#__PURE__*/jsx("div", {
    className: styles$d.bobjectItem_preview_button_wrapper,
    children: /*#__PURE__*/jsx(Button, {
      dataTest: "SearchBar-Preview",
      variant: "secondary",
      uppercase: false,
      size: "small",
      className: styles$d.bobjectItem_preview_button,
      onClick: function onClick(event) {
        event.preventDefault();
        event.stopPropagation();
        handleClick === null || handleClick === void 0 ? void 0 : handleClick(event, bobject);
      },
      children: t('common.preview')
    })
  }) : null;
}
var SearchCardCenter = /*#__PURE__*/React.memo(CardCenterComponent);
var SearchCardLeft = /*#__PURE__*/React.memo(CardLeftComponent);

var css_248z$c = ".bobjectItemCompressed-module_bobjectItemCompressed__u8nkE {\n  height: 48px;\n  display: flex;\n  align-items: center;\n  padding: 2px 12px;\n  cursor: pointer;\n}\n\n\n.bobjectItemCompressed-module_bobjectItemCompressed__u8nkE:hover {\n  background-color: var(--veryLightBloobirds);\n}\n\n.bobjectItemCompressed-module_bobjectItemCompressedHover__CNhZY:hover {\n  background-color: var(--lightestBloobirds);\n}\n";
var styles$c = {"bobjectItemCompressed":"bobjectItemCompressed-module_bobjectItemCompressed__u8nkE","bobjectItemCompressedHover":"bobjectItemCompressed-module_bobjectItemCompressedHover__CNhZY"};
styleInject(css_248z$c);

function _typeof$7(obj) { "@babel/helpers - typeof"; return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$7(obj); }
function _defineProperty$6(obj, key, value) { key = _toPropertyKey$6(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$6(arg) { var key = _toPrimitive$6(arg, "string"); return _typeof$7(key) === "symbol" ? key : String(key); }
function _toPrimitive$6(input, hint) { if (_typeof$7(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$7(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Compressed Bobject Item Card - For Displaying Last Visited Bobjects (from the Search Bar)
 * @param bobject
 * @param handleClick
 * @param handleCompanyClicked
 * @param isBubbleHomePage
 * @param hoverLight
 * @constructor
 */
function BobjectItemCompressed(_ref) {
  var bobject = _ref.bobject,
    handleClick = _ref.handleClick,
    handleCompanyClicked = _ref.handleCompanyClicked,
    _ref$hoverLight = _ref.hoverLight,
    hoverLight = _ref$hoverLight === void 0 ? false : _ref$hoverLight;
  return /*#__PURE__*/jsx("div", {
    className: clsx(styles$c.bobjectItemCompressed, _defineProperty$6({}, styles$c.bobjectItemCompressedHover, hoverLight))
    // @ts-ignore
    ,
    onClick: function onClick(e) {
      return handleClick(bobject, e);
    },
    children: /*#__PURE__*/jsx(SearchCardLeft, {
      bobject: bobject,
      hits: undefined,
      handleCompanyClicked: handleCompanyClicked
    })
  });
}

var css_248z$b = ".bobjectSelector-module_content__xrjh3 {\n  display: flex;\n  flex-direction: column;\n}\n\n.bobjectSelector-module_link_button__q3JAC {\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  margin-top: 4px;\n}\n\n.bobjectSelector-module_link_button__q3JAC > * {\n  margin-right: 4px;\n}\n\n.bobjectSelector-module_link_button__q3JAC > p {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  max-width: 100%;\n}\n\n.bobjectSelector-module_input__-UOFd {\n  padding: 12px;\n  box-shadow: none;\n  box-sizing: border-box;\n}\n\n.bobjectSelector-module_results__jI1sl {\n  height: 300px;\n  overflow-y: auto;\n}\n";
var styles$b = {"content":"bobjectSelector-module_content__xrjh3","link_button":"bobjectSelector-module_link_button__q3JAC","input":"bobjectSelector-module_input__-UOFd","results":"bobjectSelector-module_results__jI1sl"};
styleInject(css_248z$b);

var css_248z$a = ".noResultsFound-module_noResultFound__DMbJz {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  margin: 8px 16px 20px 16px;\n}\n\n.noResultsFound-module_text__spO4M {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n";
var styles$a = {"noResultFound":"noResultsFound-module_noResultFound__DMbJz","text":"noResultsFound-module_text__spO4M"};
styleInject(css_248z$a);

var NoResultsFound = function NoResultsFound(_ref) {
  var searchTerm = _ref.searchTerm;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'bobjectSelector.noResultsFound'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs("div", {
    className: styles$a.noResultFound,
    children: [/*#__PURE__*/jsx(Icon, {
      name: "searchNone",
      size: 32,
      color: "softPeanut"
    }), /*#__PURE__*/jsxs("div", {
      className: styles$a.text,
      children: [/*#__PURE__*/jsx(Text, {
        color: "softPeanut",
        size: "s",
        align: "center",
        children: t('title', {
          searchTerm: searchTerm
        })
      }), /*#__PURE__*/jsx(Text, {
        color: "softPeanut",
        size: "s",
        align: "center",
        children: t('subtitle')
      })]
    })]
  });
};

var css_248z$9 = ".noSearchYetMessage-module_noResultFound__9t6B4 {\n  display: flex;\n  align-items: center;\n  margin: 8px 16px 20px 16px;\n}\n\n.noSearchYetMessage-module_noResultFound__9t6B4 > * {\n  margin-right: 4px;\n}\n";
var styles$9 = {"noResultFound":"noSearchYetMessage-module_noResultFound__9t6B4"};
styleInject(css_248z$9);

var NoSearchYetMessage = function NoSearchYetMessage() {
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'bobjectSelector'
    }),
    t = _useTranslation.t;
  var isB2CAccount = useIsB2CAccount();
  return /*#__PURE__*/jsx("div", {
    className: styles$9.noResultFound,
    children: /*#__PURE__*/jsxs(Text, {
      color: "softPeanut",
      size: "s",
      children: [!isB2CAccount ? t('noSearchYetMessage') : t('noSearchYetMessageB2CAccounts'), ' ']
    })
  });
};

function _typeof$6(obj) { "@babel/helpers - typeof"; return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$6(obj); }
function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty$5(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$5(obj, key, value) { key = _toPropertyKey$5(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$5(arg) { var key = _toPrimitive$5(arg, "string"); return _typeof$6(key) === "symbol" ? key : String(key); }
function _toPrimitive$5(input, hint) { if (_typeof$6(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$6(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$6(arr, i) { return _arrayWithHoles$6(arr) || _iterableToArrayLimit$6(arr, i) || _unsupportedIterableToArray$6(arr, i) || _nonIterableRest$6(); }
function _nonIterableRest$6() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$6(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$6(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen); }
function _arrayLikeToArray$6(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$6(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$6(arr) { if (Array.isArray(arr)) return arr; }
var BobjectSelector = function BobjectSelector(_ref) {
  var _response$data;
  var accountId = _ref.accountId,
    onBobjectChange = _ref.onBobjectChange,
    selected = _ref.selected,
    id = _ref.id,
    _ref$iconSize = _ref.iconSize,
    iconSize = _ref$iconSize === void 0 ? 12 : _ref$iconSize,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    bobjectType = _ref.bobjectType;
  var _useVisible = useVisible(false),
    visible = _useVisible.visible,
    ref = _useVisible.ref,
    setVisible = _useVisible.setVisible;
  var _useState = useState(),
    _useState2 = _slicedToArray$6(_useState, 2),
    searchValue = _useState2[0],
    setSearchValue = _useState2[1];
  var _useSWR = useSWR(searchValue && searchValue !== '' && visible ? [id || 'bobjectSelector', searchValue] : null, function () {
      return api.post("/bobjects/".concat(accountId, "/global-search"), {
        query: searchValue,
        bobjectTypes: ['Company', 'Lead', 'Opportunity'],
        numberOfResults: 20
      });
    }, {
      use: [keepPreviousResponse]
    }),
    response = _useSWR.data;
  var results = response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.results;
  var isSmall = size === 'small';
  var iconMap = _defineProperty$5(_defineProperty$5(_defineProperty$5({}, BobjectTypes.Company, 'company'), BobjectTypes.Lead, 'person'), BobjectTypes.Opportunity, 'fileOpportunity');
  var icon = iconMap[bobjectType];
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'bobjects.bobjectSelector'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsx(Dropdown, {
    width: 323,
    ref: ref,
    visible: visible,
    zIndex: 20000,
    anchor: /*#__PURE__*/jsxs("div", {
      onClick: function onClick() {
        return setVisible(!visible);
      },
      className: styles$b.link_button,
      children: [/*#__PURE__*/jsx(Icon, {
        name: icon !== null && icon !== void 0 ? icon : 'link',
        color: "bloobirds",
        size: iconSize
      }), /*#__PURE__*/jsx(Text, {
        size: isSmall ? 'xs' : 's',
        color: "bloobirds",
        children: selected || t('link')
      })]
    }),
    children: /*#__PURE__*/jsxs("div", {
      className: styles$b.content,
      children: [/*#__PURE__*/jsx(Input$1, {
        autoFocus: true,
        width: "100%",
        placeholder: t('search'),
        onChange: setSearchValue,
        value: searchValue,
        className: styles$b.input
      }), /*#__PURE__*/jsx("div", {
        className: styles$b.results,
        children: results ? (results === null || results === void 0 ? void 0 : results.length) > 0 ? /*#__PURE__*/jsx(Fragment, {
          children: results === null || results === void 0 ? void 0 : results.map(function (result) {
            var _result$rawBobject;
            return /*#__PURE__*/jsx(BobjectItemCompressed, {
              bobject: _objectSpread$2(_objectSpread$2({}, result), {}, {
                url: null
              }),
              handleCompanyClicked: function handleCompanyClicked() {},
              handleClick: function handleClick(bobject) {
                onBobjectChange(bobject);
                setVisible(false);
              }
            }, result === null || result === void 0 ? void 0 : (_result$rawBobject = result.rawBobject) === null || _result$rawBobject === void 0 ? void 0 : _result$rawBobject.id);
          })
        }) : /*#__PURE__*/jsx(NoResultsFound, {
          searchTerm: searchValue
        }) : /*#__PURE__*/jsx(NoSearchYetMessage, {})
      })]
    })
  });
};

var css_248z$8 = ".customDateDialog-module_modal__eDEau {\n  width: unset !important;\n  background-color: var(--white);\n}\n\n.customDateDialog-module_year__On-2v,\n.customDateDialog-module_month__WxVsb {\n  font-family: var(--fontFamily);\n  font-size: 13px;\n  color: var(--peanut);\n  cursor: pointer;\n  margin: 0;\n  border: 0;\n  background: none;\n  padding: 4px;\n}\n\n.customDateDialog-module_month__WxVsb {\n  font-weight: var(--fontBold);\n}\n\n.customDateDialog-module_year__On-2v:hover,\n.customDateDialog-module_month__WxVsb:hover {\n  color: var(--bloobirds);\n}\n";
var styles$8 = {"modal":"customDateDialog-module_modal__eDEau","year":"customDateDialog-module_year__On-2v","month":"customDateDialog-module_month__WxVsb"};
styleInject(css_248z$8);

function _slicedToArray$5(arr, i) { return _arrayWithHoles$5(arr) || _iterableToArrayLimit$5(arr, i) || _unsupportedIterableToArray$5(arr, i) || _nonIterableRest$5(); }
function _nonIterableRest$5() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$5(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$5(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen); }
function _arrayLikeToArray$5(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$5(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$5(arr) { if (Array.isArray(arr)) return arr; }
var CustomDateDialog = function CustomDateDialog(_ref) {
  var bobject = _ref.bobject,
    onSubmit = _ref.onSubmit,
    onCancel = _ref.onCancel,
    _ref$showDateTime = _ref.showDateTime,
    showDateTime = _ref$showDateTime === void 0 ? true : _ref$showDateTime,
    customButtonText = _ref.customButtonText,
    customButtonVariant = _ref.customButtonVariant;
  var getFormattedHour = function getFormattedHour() {
    var dateTimeInfo = bobject && !Array.isArray(bobject) ? new Date(getValueFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME)) : null;
    return dateTimeInfo ? dateTimeInfo.getHours() + ':' + dateTimeInfo.getMinutes() + '' : '8:00';
  };
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'bobjects.rescheduleModal.customDateDialog'
    }),
    t = _useTranslation.t,
    i18n = _useTranslation.i18n;
  var taskTime = getFormattedHour();
  var taskTimePresentDate = spacetime().startOf('day').time(taskTime)["goto"]('utc').toNativeDate();
  var _useState = useState('day'),
    _useState2 = _slicedToArray$5(_useState, 2),
    format = _useState2[0],
    setFormat = _useState2[1];
  var _useState3 = useState(new Date(taskTimePresentDate)),
    _useState4 = _slicedToArray$5(_useState3, 2),
    value = _useState4[0],
    setValue = _useState4[1];
  var _useState5 = useState(value),
    _useState6 = _slicedToArray$5(_useState5, 2),
    view = _useState6[0],
    setView = _useState6[1];
  return /*#__PURE__*/jsxs(Modal, {
    className: styles$8.modal,
    open: true,
    onClose: onCancel,
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
          className: styles$8.month,
          children: getI18nSpacetimeLng(i18n.language, view).format('{month-short}')
        }), /*#__PURE__*/jsx("button", {
          "aria-label": "calendar year",
          onClick: function onClick() {
            return setFormat('year');
          },
          className: styles$8.year,
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
        }), /*#__PURE__*/jsx(Button, {
          onClick: function onClick() {
            onSubmit(value);
          },
          variant: customButtonVariant || 'clear',
          size: "small",
          dataTest: "DateTimePicker-Ok",
          disabled: isBeforeToday(value, getUserTimeZone()),
          children: customButtonText || t('send')
        })]
      })]
    })]
  });
};

var css_248z$7 = ".rescheduleModal-module_modal__JTo8A {\n  width: 300px !important;\n  background-color: var(--white);\n}\n\n.rescheduleModal-module_header__8iL0t {\n  padding: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.rescheduleModal-module_content__WzMh- {\n  padding: 16px 24px;\n  padding-top: 0;\n}\n\n.rescheduleModal-module_customButton__Men3- {\n  margin-top: 8px;\n  justify-content: center;\n}\n\n.rescheduleModal-module_shortcuts__cIGUg {\n  display: grid;\n  grid-auto-flow: row;\n  row-gap: 4px;\n}\n";
var styles$7 = {"modal":"rescheduleModal-module_modal__JTo8A","header":"rescheduleModal-module_header__8iL0t","content":"rescheduleModal-module_content__WzMh-","customButton":"rescheduleModal-module_customButton__Men3-","shortcuts":"rescheduleModal-module_shortcuts__cIGUg"};
styleInject(css_248z$7);

function _typeof$5(obj) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$5(obj); }
function _defineProperty$4(obj, key, value) { key = _toPropertyKey$4(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$4(arg) { var key = _toPrimitive$4(arg, "string"); return _typeof$5(key) === "symbol" ? key : String(key); }
function _toPrimitive$4(input, hint) { if (_typeof$5(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$5(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var useRescheduleModal = function useRescheduleModal() {
  var activeUserId = useActiveUserId();
  function handleSubmit(_ref) {
    var bobject = _ref.bobject,
      data = _ref.data,
      rescheduleWholeCadence = _ref.rescheduleWholeCadence;
    if (rescheduleWholeCadence) {
      var body = {
        userId: activeUserId,
        taskFromId: bobject.id.value,
        rescheduleAllCadence: true,
        newDate: data
      };
      return api.put('/messaging/cadences/rescheduleStep', body).then(function () {
        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: {
            type: BobjectTypes.Task
          }
        }));
      });
    } else {
      var _body = _defineProperty$4(_defineProperty$4({}, TASK_FIELDS_LOGIC_ROLE.STATUS, TASK_STATUS_VALUE_LOGIC_ROLE.TODO), TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, data);
      return api.patch("/bobjects/".concat(bobject.id.value, "/raw"), _body);
    }
  }
  return {
    handleSubmit: handleSubmit
  };
};

function _typeof$4(obj) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$4(obj); }
function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$4(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray$4(arr, i) { return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$4(); }
function _nonIterableRest$4() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }
function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$4(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$4(arr) { if (Array.isArray(arr)) return arr; }
var RescheduleModal = function RescheduleModal(_ref) {
  var _getFieldByLogicRole, _getFieldByLogicRole2, _getFieldByLogicRole3, _getFieldByLogicRole4;
  var bobject = _ref.bobject,
    onClose = _ref.onClose,
    onSave = _ref.onSave;
  var _useRescheduleModal = useRescheduleModal(),
    handleSubmit = _useRescheduleModal.handleSubmit;
  var userTimeZone = useUserTimeZone();
  var _useState = useState(false),
    _useState2 = _slicedToArray$4(_useState, 2),
    customDateVisible = _useState2[0],
    setCustomDateVisible = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$4(_useState3, 2),
    rescheduleWholeCadence = _useState4[0],
    setRescheduleWholeCadence = _useState4[1];
  var taskStepId = !Array.isArray(bobject) ? getValueFromLogicRole(bobject, 'TASK__CADENCE_STEP_ID') : null;
  var taskCadenceId = !Array.isArray(bobject) ? getValueFromLogicRole(bobject, 'TASK__CADENCE') : null;
  var status = (_getFieldByLogicRole = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.STATUS)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.valueLogicRole;
  var isCompleted = [TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED, TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE].includes(status);
  var isRejected = status === TASK_STATUS_VALUE_LOGIC_ROLE.REJECTED;
  var company = (_getFieldByLogicRole2 = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.COMPANY)) === null || _getFieldByLogicRole2 === void 0 ? void 0 : _getFieldByLogicRole2.referencedBobject;
  var lead = (_getFieldByLogicRole3 = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.LEAD)) === null || _getFieldByLogicRole3 === void 0 ? void 0 : _getFieldByLogicRole3.referencedBobject;
  var opportunity = (_getFieldByLogicRole4 = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)) === null || _getFieldByLogicRole4 === void 0 ? void 0 : _getFieldByLogicRole4.referencedBobject;
  var mainBobject = opportunity || lead || company;
  var _useCadenceInfo = useCadenceInfo(mainBobject),
    getCadenceById = _useCadenceInfo.getCadenceById;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'bobjects.rescheduleModal'
    }),
    t = _useTranslation.t;
  var cadenceEntity = getCadenceById(taskCadenceId);
  var _useSWR = useSWR(!Array.isArray(bobject) && taskCadenceId && taskStepId ? 'stepId' + bobject.id.value : null, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var resError;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return api.get("/messaging/cadences/".concat(taskCadenceId, "/steps/").concat(taskStepId));
          case 3:
            return _context.abrupt("return", _context.sent);
          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            resError = new Error('Error fetching data'); // @ts-ignore
            resError.status = _context.t0.response.status;
            throw resError;
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 6]]);
    }))),
    error = _useSWR.error;
  var getFormattedHour = function getFormattedHour() {
    var dateTimeInfo = !Array.isArray(bobject) ? new Date(getValueFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME)) : null;
    return dateTimeInfo && dateTimeInfo.getHours() !== 0 ? dateTimeInfo.getHours() + ':' + dateTimeInfo.getMinutes() + '' : '8:00';
  };
  var taskTime = getFormattedHour();
  var tomorrowMorning = spacetime().startOf('day').add(1, 'day').time(taskTime).toNativeDate();
  var nextMondayDatetime = spacetime().startOf('week').add(1, 'week').time(taskTime).toNativeDate();
  var inTwoDays = spacetime().startOf('day').add(2, 'day').time(taskTime).toNativeDate();
  var inOneWeek = spacetime().startOf('day').add(1, 'week').time(taskTime).toNativeDate();
  var handleSave = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(date) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            handleSubmit({
              bobject: bobject,
              data: date,
              rescheduleWholeCadence: rescheduleWholeCadence
            }).then(function () {
              setCustomDateVisible(false);
              onSave();
              onClose();
            });
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function handleSave(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  if (customDateVisible) {
    return /*#__PURE__*/jsx(CustomDateDialog, {
      bobject: bobject,
      onCancel: function onCancel() {
        return setCustomDateVisible(false);
      },
      onSubmit: /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(date) {
          var offsetDate;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                offsetDate = spacetime()["goto"](userTimeZone).year(date.getFullYear()).month(date.getMonth()).date(date.getDate()).hour(date.getHours()).minute(date.getMinutes()).toNativeDate();
                _context3.next = 3;
                return handleSave(offsetDate);
              case 3:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }));
        return function (_x3) {
          return _ref4.apply(this, arguments);
        };
      }()
    });
  }
  return /*#__PURE__*/jsxs(Modal, {
    className: styles$7.modal,
    open: true,
    onClose: onClose,
    children: [/*#__PURE__*/jsxs("header", {
      className: styles$7.header,
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
      className: styles$7.content,
      children: [
      // @ts-ignore
      (cadenceEntity === null || cadenceEntity === void 0 ? void 0 : cadenceEntity.reschedulableMode) === 'RESCHEDULABLE' && !isCompleted && !isRejected && /*#__PURE__*/jsx(Tooltip, {
        title: (error === null || error === void 0 ? void 0 : error.status) === 404 ? t('error') : null,
        position: "top",
        children: /*#__PURE__*/jsx(Checkbox, {
          checked: rescheduleWholeCadence,
          onClick: function onClick() {
            return setRescheduleWholeCadence(!rescheduleWholeCadence);
          },
          size: "small",
          disabled: (error === null || error === void 0 ? void 0 : error.status) === 404,
          expand: true,
          children: t('rescheduleWholeCadence')
        })
      }), /*#__PURE__*/jsxs("div", {
        className: styles$7.shortcuts,
        children: [/*#__PURE__*/jsx(DateTimeShortcut, {
          timezone: userTimeZone,
          text: t('tomorrow'),
          date: tomorrowMorning,
          onClick: handleSave
        }), /*#__PURE__*/jsx(DateTimeShortcut, {
          timezone: userTimeZone,
          text: t('nextMonday'),
          date: nextMondayDatetime,
          onClick: handleSave
        }), /*#__PURE__*/jsx(DateTimeShortcut, {
          timezone: userTimeZone,
          text: t('inTwoDays'),
          date: inTwoDays,
          onClick: handleSave
        }), /*#__PURE__*/jsx(DateTimeShortcut, {
          timezone: userTimeZone,
          text: t('inOneWeek'),
          date: inOneWeek,
          onClick: handleSave
        })]
      }), /*#__PURE__*/jsx(Button, {
        className: styles$7.customButton,
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

var css_248z$6 = ".searchBobjects-module_content__LgnVa {\n  display: flex;\n  flex-direction: column;\n  max-height: 300px;\n}\n\n.searchBobjects-module_link_button__19UxX {\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  margin-top: 4px;\n}\n\n.searchBobjects-module_link_button__19UxX > * {\n  margin-right: 4px;\n}\n\n.searchBobjects-module_input__n789z {\n  margin: 16px 0;\n  box-shadow: none;\n}\n\n.searchBobjects-module_results__BOo8g {\n  height: auto;\n  overflow-y: auto;\n  width: 100%;\n}\n";
var styles$6 = {"content":"searchBobjects-module_content__LgnVa","link_button":"searchBobjects-module_link_button__19UxX","input":"searchBobjects-module_input__n789z","results":"searchBobjects-module_results__BOo8g"};
styleInject(css_248z$6);

function _typeof$3(obj) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$3(obj); }
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$3(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(arg) { var key = _toPrimitive$3(arg, "string"); return _typeof$3(key) === "symbol" ? key : String(key); }
function _toPrimitive$3(input, hint) { if (_typeof$3(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$3(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$3(arr, i) { return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3(); }
function _nonIterableRest$3() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }
function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$3(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$3(arr) { if (Array.isArray(arr)) return arr; }
var SearchBobjects = function SearchBobjects(_ref) {
  var accountId = _ref.accountId,
    onChange = _ref.onChange,
    anchorElement = _ref.anchorElement,
    children = _ref.children,
    _ref$hiddenDropdown = _ref.hiddenDropdown,
    hiddenDropdown = _ref$hiddenDropdown === void 0 ? false : _ref$hiddenDropdown,
    customStyles = _ref.customStyles;
    _ref.isBubbleHomePage;
    var search = _ref.search,
    _ref$forceOpen = _ref.forceOpen,
    forceOpen = _ref$forceOpen === void 0 ? false : _ref$forceOpen,
    setForceOpen = _ref.setForceOpen,
    _ref$numberOfResults = _ref.numberOfResults,
    numberOfResults = _ref$numberOfResults === void 0 ? 1000 : _ref$numberOfResults;
  var _useState = useState(),
    _useState2 = _slicedToArray$3(_useState, 2),
    searchValue = _useState2[0],
    setSearchValue = _useState2[1];
  var _useVisible = useVisible(),
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible,
    ref = _useVisible.ref;
  var isB2CAccount = useIsB2CAccount();
  useEffect(function () {
    if (search) {
      setSearchValue(search);
    }
  }, [search]);
  useEffect(function () {
    if (forceOpen) setVisible(true);
  }, [forceOpen]);
  useEffect(function () {
    if (!visible) setForceOpen === null || setForceOpen === void 0 ? void 0 : setForceOpen(false);
  }, [visible]);
  var handleChange = function handleChange(bobject) {
    onChange(bobject);
    setVisible(false);
  };
  var _useSearchBobjects = useSearchBobjects({
      searchValue: searchValue,
      accountId: accountId,
      callback: function callback() {
        return setVisible(true);
      },
      numberOfResults: numberOfResults,
      bobjectTypes: isB2CAccount ? [BobjectTypes.Lead, BobjectTypes.Opportunity] : [BobjectTypes.Company, BobjectTypes.Lead, BobjectTypes.Opportunity]
    }),
    results = _useSearchBobjects.results,
    totalMatching = _useSearchBobjects.totalMatching;
  return /*#__PURE__*/jsx(Dropdown, {
    width: "100%",
    arrow: false,
    ref: ref,
    visible: visible && !hiddenDropdown,
    zIndex: 20000,
    anchor: anchorElement(setSearchValue, searchValue),
    customStyles: customStyles,
    children: children ? children(results, totalMatching) : /*#__PURE__*/jsx("div", {
      className: styles$6.content,
      children: /*#__PURE__*/jsx("div", {
        className: styles$6.results,
        children: results ? (results === null || results === void 0 ? void 0 : results.length) > 0 ? /*#__PURE__*/jsx(Fragment, {
          children: results === null || results === void 0 ? void 0 : results.map(function (result) {
            var _result$rawBobject;
            return /*#__PURE__*/jsx(BobjectItemCompressed, {
              bobject: _objectSpread$1(_objectSpread$1({}, result), {}, {
                url: null
              }),
              handleCompanyClicked: function handleCompanyClicked() {},
              handleClick: function handleClick(bobject) {
                handleChange(bobject);
              }
            }, result === null || result === void 0 ? void 0 : (_result$rawBobject = result.rawBobject) === null || _result$rawBobject === void 0 ? void 0 : _result$rawBobject.id);
          })
        }) : /*#__PURE__*/jsx(NoResultsFound, {
          searchTerm: searchValue
        }) : /*#__PURE__*/jsx(NoSearchYetMessage, {})
      })
    })
  });
};

/*** Action Base Button ***/
function SearchBarAction(color, icon, handleClick) {
  return /*#__PURE__*/jsx(Action, {
    color: color,
    icon: icon,
    onClick: function onClick(e) {
      e.stopPropagation();
      e.preventDefault();
      // @ts-ignore
      handleClick(e);
    }
  }, "action-".concat(icon));
}

/*** Action Buttons ***/
function CallAction(handleClick) {
  return SearchBarAction('melon', 'phone', handleClick);
}
function EmailAction(handleClick) {
  return SearchBarAction('tangerine', 'mail', handleClick);
}
function WhatsAction(handleClick) {
  return SearchBarAction('whatsapp', 'whatsapp', handleClick);
}
function LinkedInAction(handleClick) {
  return SearchBarAction('darkBloobirds', 'linkedin', handleClick);
}
function MeetingAction(handleClick) {
  return SearchBarAction('tomato', 'calendar', handleClick);
}

/*** Action Button Groups ***/
function MainBobjectActions(doAction) {
  var hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();
  return /*#__PURE__*/jsxs(Fragment, {
    children: [!hasAircallPhoneLinkEnabled && CallAction(function (e) {
      return doAction(SearchAction.Call, e);
    }), EmailAction(function (e) {
      return doAction(SearchAction.Email, e);
    }), WhatsAction(function (e) {
      return doAction(SearchAction.WhatsApp, e);
    }), LinkedInAction(function (e) {
      return doAction(SearchAction.LinkedIn, e);
    }), MeetingAction(function (e) {
      return doAction(SearchAction.Meeting, e);
    })]
  });
}

/*** Export General Action Buttons Component ***/
function BobjectActions(_ref) {
  var bobject = _ref.bobject,
    closeModal = _ref.closeModal,
    handleActionOnClick = _ref.handleActionOnClick;
  var doAction = function doAction(action, event) {
    handleActionOnClick === null || handleActionOnClick === void 0 ? void 0 : handleActionOnClick(event, action, bobject);
    closeModal();
  };
  return /*#__PURE__*/jsx("div", {
    className: styles$d.bobjectItemSelectedActionsColumn,
    children: /*#__PURE__*/jsx("div", {
      className: styles$d.bobjectItemSelectedActionsRow,
      children: MainBobjectActions(doAction)
    })
  });
}

function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(arg) { var key = _toPrimitive$2(arg, "string"); return _typeof$2(key) === "symbol" ? key : String(key); }
function _toPrimitive$2(input, hint) { if (_typeof$2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Base Bobject Item Card - For Displaying Results
 * WARNING: This component is missing actionButtons.tsx which is pending to be migrated
 * WARNING: This component is missing rightMenuContext which is pending to be migrated from frontend
 * @param bobject - GlobalSearchResponse
 * @param hits - hits in the search
 * @param isSelected - when selected with arrows
 * @param handleElementClicked - close the search bar at clicking any internal action or link
 * @constructor
 */
function BobjectItem(_ref) {
  var bobject = _ref.bobject,
    hits = _ref.hits,
    isSelected = _ref.isSelected,
    handleElementClicked = _ref.handleElementClicked,
    _ref$isWebapp = _ref.isWebapp,
    isWebapp = _ref$isWebapp === void 0 ? false : _ref$isWebapp,
    actions = _ref.actions;
  var dataModel = useDataModel();
  var type = bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType;
  var stage = getStage(bobject);
  var status = getStatus(type, stage, bobject, dataModel);
  var isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  var classNames = clsx(styles$d.bobjectItem, _defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2({}, styles$d.bobjectItem_selected, isSelected), styles$d.bobjectItem_prospecting, stage === 'prospecting'), styles$d.bobjectItem_sales, stage === 'sales'), styles$d.bobjectItem_border, isNoStatusPlanAccount), styles$d.bobjectItem_webapp, isWebapp));
  var classNamesRight = clsx(styles$d.bobjectItemRight, _defineProperty$2({}, styles$d.bobjectItemRightOTO, !isWebapp));
  return /*#__PURE__*/jsxs("div", {
    className: classNames,
    children: [/*#__PURE__*/jsx(SearchCardLeft, {
      bobject: bobject,
      hits: hits,
      handleCompanyClicked: handleElementClicked
    }), isSelected && isWebapp && /*#__PURE__*/jsx(SearchPreviewButton, {
      isSelected: isSelected,
      bobject: bobject,
      handleClick: actions === null || actions === void 0 ? void 0 : actions.handleMainBobjectClick
    }), /*#__PURE__*/jsx(SearchCardCenter, {
      bobject: bobject,
      isWebapp: isWebapp
    }), /*#__PURE__*/jsx("div", {
      className: classNamesRight,
      children: !isSelected ? isWebapp ? /*#__PURE__*/jsx(SearchStatusLabel, {
        status: status
      }) : null : /*#__PURE__*/jsx(BobjectActions, {
        bobject: bobject,
        closeModal: function closeModal() {
          return handleElementClicked(undefined, undefined);
        },
        handleActionOnClick: actions === null || actions === void 0 ? void 0 : actions.handleActionOnClick,
        isWebapp: isWebapp
      })
    })]
  });
}
/**
 * Bobject Type Match - Displays the Bobject Type that matches the search (Company, Lead, Opportunity) for organic search results
 * This is displayed as the first element on the list and sets the type filter when pressed.
 *
 * It is forward ref because we need to be able to control the search input from the outside (general component), and
 * it can only be done from a child component. This was, we allow calls to the deleteInput() function
 */
var BobjectTypeMatch = /*#__PURE__*/forwardRef(function (_ref2, ref) {
  var bobjectType = _ref2.bobjectType,
    applyFilter = _ref2.applyFilter,
    isSelected = _ref2.isSelected;
  var store = CommandBox.useCommandBoxStore();
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'bobjects.bobjectItem'
    }),
    t = _useTranslation.t;
  useImperativeHandle(ref, function () {
    return {
      deleteInput: function deleteInput() {
        store.setState('search', '');
      }
    };
  });
  function handleClick(bobjectType) {
    store.setState('search', '');
    applyFilter(bobjectType);
  }
  var classNames = clsx(styles$d.bobjectItem, styles$d.bobjectItemType, _defineProperty$2({}, styles$d.bobjectItem_selected, isSelected));
  return /*#__PURE__*/jsxs("div", {
    className: classNames,
    onClick: function onClick() {
      return handleClick(bobjectType);
    },
    children: [/*#__PURE__*/jsx("div", {
      className: styles$d.circleIcon,
      children: /*#__PURE__*/jsx(Icon, {
        name: 'filter',
        size: 20,
        color: "bloobirds"
      })
    }), /*#__PURE__*/jsx("div", {
      className: styles$d.bobjectItemContent,
      children: /*#__PURE__*/jsx(Text, {
        size: "s",
        color: "bloobirds",
        children: bobjectType === 'All' ? t('all') : PluralBobjectTypes[bobjectType]
      })
    })]
  });
});

var css_248z$5 = ".formGroup-module_group__I65z9 {\n    display: grid;\n    grid-template-columns: 36% 62%;\n    grid-template-rows: minmax(46px, auto);\n    align-items: baseline;\n    grid-row-gap: 8px;\n    justify-content: space-between;\n}\n\n.formGroup-module_label__BUv0L {\n    font-family: var(--fontPrimary);\n    margin: 0;\n    display: grid;\n    grid-auto-flow: column;\n    align-items: center;\n    justify-content: flex-start;\n    grid-column-gap: 4px;\n}\n\n.formGroup-module_error__cvHkc {\n    font-family: var(--fontPrimary);\n    color: var(--tomato);\n    font-size: 12px;\n}\n";
var styles$5 = {"group":"formGroup-module_group__I65z9","label":"formGroup-module_label__BUv0L","error":"formGroup-module_error__cvHkc"};
styleInject(css_248z$5);

var FormLabel = function FormLabel(_ref) {
  var children = _ref.children,
    _ref$required = _ref.required,
    required = _ref$required === void 0 ? false : _ref$required,
    style = _ref.style;
  return /*#__PURE__*/jsxs("label", {
    className: styles$5.label,
    style: {
      color: style === 'gradient' ? 'var(--white)' : 'var(--softPeanut)'
    },
    children: [children, required ? '*' : '']
  });
};
var FormGroup = function FormGroup(_ref2) {
  var children = _ref2.children,
    _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 'small' : _ref2$size;
  return /*#__PURE__*/jsx("div", {
    className: size === 'small' ? styles$5.group : undefined,
    children: children
  });
};

var css_248z$4 = ".dateField-module_datepicker__0VzoW > div > div {\n    box-sizing: border-box;\n}\n\n.dateField-module_datepicker__0VzoW > div > div > input {\n    border: none !important;\n    box-shadow: none !important;\n}\n";
var styles$4 = {"datepicker":"dateField-module_datepicker__0VzoW"};
styleInject(css_248z$4);

var DateField = function DateField(_ref) {
  var control = _ref.control,
    required = _ref.required,
    name = _ref.name,
    id = _ref.id,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'small' : _ref$size,
    requiredMessage = _ref.requiredMessage;
  var _useController = useController({
      control: control,
      name: "fields.".concat(id),
      rules: {
        required: {
          value: required,
          message: requiredMessage
        }
      }
    }),
    _useController$field = _useController.field,
    value = _useController$field.value,
    onChange = _useController$field.onChange,
    error = _useController.fieldState.error;
  return /*#__PURE__*/jsxs(FormGroup, {
    size: size,
    children: [size === 'small' && /*#__PURE__*/jsx(FormLabel, {
      required: required,
      children: name
    }), /*#__PURE__*/jsx("div", {
      className: styles$4.datepicker,
      children: /*#__PURE__*/jsx(DateTimePicker, {
        value: value,
        placeholder: size === 'small' ? undefined : "".concat(name).concat(required ? ' *' : ''),
        onChange: onChange,
        error: error === null || error === void 0 ? void 0 : error.message,
        width: "100%",
        size: size
      })
    })]
  });
};

var css_248z$3 = ".baseInput-module_input__oqkZg > div > input {\n    font-size: 12px;\n    padding: 4px 8px;\n    max-height: 24px;\n    box-shadow: none !important;\n}\n\n.baseInput-module_input__oqkZg > div > div > input,\n.baseInput-module_input__oqkZg > div > input:focus {\n    box-shadow: none !important;\n}\n\n.baseInput-module_input__oqkZg > div > input,\n.baseInput-module_input__oqkZg:hover > div > input,\n.baseInput-module_input__oqkZg:focus > div > input,\n.baseInput-module_input__oqkZg > div > input:focus {\n    border: 1px solid var(--softPeanut) !important;\n}\n\n.baseInput-module_error__8S5fB > div > input,\n.baseInput-module_error__8S5fB:hover > div > input,\n.baseInput-module_error__8S5fB:focus > div > input,\n.baseInput-module_error__8S5fB > div > input:focus {\n    border: 1px solid var(--tomato) !important;\n}\n\n.baseInput-module_baseInput__TsUwR {\n    box-shadow: none !important;\n}\n";
var styles$3 = {"input":"baseInput-module_input__oqkZg","error":"baseInput-module_error__8S5fB","baseInput":"baseInput-module_baseInput__TsUwR"};
styleInject(css_248z$3);

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Input = function Input(_ref) {
  var value = _ref.value,
    placeholder = _ref.placeholder,
    onChange = _ref.onChange,
    onFocus = _ref.onFocus,
    onBlur = _ref.onBlur,
    error = _ref.error,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'text' : _ref$type,
    size = _ref.size;
  return /*#__PURE__*/jsx("div", {
    className: classNames(styles$3.input, _defineProperty$1({}, styles$3.error, !!error)),
    children: /*#__PURE__*/jsx(Input$1, {
      borderless: false,
      type: type,
      className: styles$3.baseInput,
      placeholder: placeholder,
      value: value,
      onFocus: onFocus,
      onChange: onChange,
      onBlur: onBlur,
      error: error,
      width: "100%",
      size: size,
      color: size === 'small' ? 'white' : undefined,
      transparent: false
    })
  });
};

var DecimalField = function DecimalField(_ref) {
  var required = _ref.required,
    control = _ref.control,
    name = _ref.name,
    id = _ref.id,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'small' : _ref$size,
    requiredMessage = _ref.requiredMessage;
  var _useController = useController({
      control: control,
      name: "fields.".concat(id),
      rules: {
        required: {
          value: required,
          message: requiredMessage
        }
      }
    }),
    _useController$field = _useController.field,
    value = _useController$field.value,
    onChange = _useController$field.onChange,
    onBlur = _useController$field.onBlur,
    error = _useController.fieldState.error;
  return /*#__PURE__*/jsxs(FormGroup, {
    size: size,
    children: [size === 'small' && /*#__PURE__*/jsx(FormLabel, {
      required: required,
      children: name
    }), /*#__PURE__*/jsx(Input, {
      size: size,
      value: value,
      placeholder: size === 'small' ? undefined : "".concat(name).concat(required ? ' *' : ''),
      onChange: onChange,
      onBlur: onBlur,
      error: error === null || error === void 0 ? void 0 : error.message,
      type: "number"
    })]
  });
};

var EmailField = function EmailField(_ref) {
  var control = _ref.control,
    required = _ref.required,
    name = _ref.name,
    id = _ref.id,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'small' : _ref$size,
    requiredMessage = _ref.requiredMessage;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'bobjects.bobjectForm'
    }),
    t = _useTranslation.t;
  var _useController = useController({
      control: control,
      name: "fields.".concat(id),
      rules: {
        pattern: {
          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: t('emailNotValid')
        },
        required: {
          value: required,
          message: requiredMessage
        }
      }
    }),
    _useController$field = _useController.field,
    value = _useController$field.value,
    onChange = _useController$field.onChange,
    onBlur = _useController$field.onBlur,
    error = _useController.fieldState.error;
  return /*#__PURE__*/jsxs(FormGroup, {
    size: size,
    children: [size === 'small' && /*#__PURE__*/jsx(FormLabel, {
      required: required,
      children: name
    }), /*#__PURE__*/jsx(Input, {
      value: value,
      onChange: onChange,
      onBlur: onBlur,
      size: size,
      error: error === null || error === void 0 ? void 0 : error.message,
      placeholder: size === 'small' ? undefined : "".concat(name).concat(required ? ' *' : '')
    })]
  });
};

var NumberField = function NumberField(_ref) {
  var control = _ref.control,
    required = _ref.required,
    name = _ref.name,
    id = _ref.id,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'small' : _ref$size,
    requiredMessage = _ref.requiredMessage;
  var _useController = useController({
      control: control,
      name: "fields.".concat(id),
      rules: {
        required: {
          value: required,
          message: requiredMessage
        }
      }
    }),
    _useController$field = _useController.field,
    value = _useController$field.value,
    onChange = _useController$field.onChange,
    onBlur = _useController$field.onBlur,
    error = _useController.fieldState.error;
  var handleChange = function handleChange(newValue) {
    if (newValue === '' || newValue === '-' || newValue.match(/^-?[0-9,.]+$/)) {
      // Remove thousands separator
      newValue = newValue.replace(/,/g, '');
      newValue = newValue.replace(/\./g, '');
      // If the number is valid add the thousand separator
      newValue = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      onChange(newValue);
    }
  };
  return /*#__PURE__*/jsxs(FormGroup, {
    size: size,
    children: [size === 'small' && /*#__PURE__*/jsx(FormLabel, {
      required: required,
      children: name
    }), /*#__PURE__*/jsx(Input, {
      size: size,
      placeholder: size === 'small' ? undefined : "".concat(name).concat(required ? ' *' : ''),
      value: value,
      onChange: handleChange,
      onBlur: onBlur,
      error: error === null || error === void 0 ? void 0 : error.message,
      type: "text"
    })]
  });
};

var PhoneField = function PhoneField(_ref) {
  var control = _ref.control,
    required = _ref.required,
    name = _ref.name,
    id = _ref.id,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'small' : _ref$size,
    requiredMessage = _ref.requiredMessage;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'bobjects.bobjectForm'
    }),
    t = _useTranslation.t;
  var isPhoneValid = function isPhoneValid(value) {
    if (!value || value == '') {
      return true;
    }
    if (!isValidPhone(value)) {
      return t('phoneNotValid');
    }
    return true;
  };
  var _useController = useController({
      control: control,
      name: "fields.".concat(id),
      rules: {
        validate: {
          isPhoneValid: isPhoneValid
        },
        required: {
          value: required,
          message: requiredMessage
        }
      }
    }),
    _useController$field = _useController.field,
    value = _useController$field.value,
    onChange = _useController$field.onChange,
    onBlur = _useController$field.onBlur,
    error = _useController.fieldState.error;
  return /*#__PURE__*/jsxs(FormGroup, {
    size: size,
    children: [size === 'small' && /*#__PURE__*/jsx(FormLabel, {
      required: required,
      children: name
    }), /*#__PURE__*/jsx(Input, {
      value: value,
      onChange: onChange,
      onBlur: onBlur,
      error: error === null || error === void 0 ? void 0 : error.message,
      size: size,
      placeholder: size === 'small' ? undefined : "".concat(name).concat(required ? ' *' : '')
    })]
  });
};

var PicklistField = function PicklistField(_ref) {
  var control = _ref.control,
    required = _ref.required,
    logicRole = _ref.logicRole,
    values = _ref.values,
    name = _ref.name,
    id = _ref.id,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'small' : _ref$size,
    requiredMessage = _ref.requiredMessage;
  var _useController = useController({
      control: control,
      name: "fields.".concat(id),
      rules: {
        required: {
          value: required,
          message: requiredMessage
        }
      }
    }),
    _useController$field = _useController.field,
    value = _useController$field.value,
    onChange = _useController$field.onChange,
    error = _useController.fieldState.error;
  useEffect(function () {
    if (logicRole === 'LEAD__ASSIGNED_TO') {
      getUserId().then(function (userId) {
        onChange(userId);
      });
    }
  }, [logicRole]);
  return /*#__PURE__*/jsxs(FormGroup, {
    size: size,
    children: [size === 'small' && /*#__PURE__*/jsx(FormLabel, {
      required: required,
      children: name
    }), /*#__PURE__*/jsx(Select, {
      autocomplete: (values === null || values === void 0 ? void 0 : values.length) > 8,
      value: value,
      onChange: onChange,
      error: error === null || error === void 0 ? void 0 : error.message,
      borderless: false,
      placeholder: size === 'small' ? 'Select' : "".concat(name).concat(required ? ' *' : ''),
      width: "100%",
      size: size,
      children: values === null || values === void 0 ? void 0 : values.filter(function (option) {
        return option === null || option === void 0 ? void 0 : option.enabled;
      }).map(function (option) {
        return /*#__PURE__*/jsx(Item, {
          value: option.id,
          children: option.name
        }, option.id);
      })
    })]
  });
};

var css_248z$2 = ".referenceField-module_empty__Bwg4v {\n    padding: 8px 16px;\n}\n\n.referenceField-module_dropdown__Xm9n8 > div {\n    width: 100%;\n}\n\n.referenceField-module_dropdownInput__HZbbl {\n    width: 100%;\n    position: relative;\n}\n\n.referenceField-module_searchIcon__0mkJy {\n    position: absolute;\n    right: 6px;\n    top: 6px;\n}\n\n.referenceField-module_description__Pi8UG {\n    margin-top: 2px;\n    margin-left: 4px;\n}\n\n.referenceField-module_item__2Ra8x {\n    padding: 8px 16px;\n    cursor: pointer;\n}\n\n.referenceField-module_item__2Ra8x:hover {\n    background-color: var(--lightestBloobirds);\n}\n";
var styles$2 = {"empty":"referenceField-module_empty__Bwg4v","dropdown":"referenceField-module_dropdown__Xm9n8","dropdownInput":"referenceField-module_dropdownInput__HZbbl","searchIcon":"referenceField-module_searchIcon__0mkJy","description":"referenceField-module_description__Pi8UG","item":"referenceField-module_item__2Ra8x"};
styleInject(css_248z$2);

function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2(); }
function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$2(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }
var ReferenceField = function ReferenceField(_ref) {
  var control = _ref.control,
    logicRole = _ref.logicRole,
    name = _ref.name,
    id = _ref.id,
    style = _ref.style,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'small' : _ref$size;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'bobjects.bobjectForm.referenceField'
    }),
    t = _useTranslation.t;
  var _useController = useController({
      control: control,
      name: 'companyName'
    }),
    _useController$field = _useController.field,
    companyName = _useController$field.value,
    setCompanyName = _useController$field.onChange;
  var _useController2 = useController({
      control: control,
      name: 'createCompany'
    }),
    _useController2$field = _useController2.field,
    createCompany = _useController2$field.value,
    setCreateCompany = _useController2$field.onChange;
  var _useController3 = useController({
      control: control,
      name: "fields.".concat(id)
    }),
    _useController3$field = _useController3.field,
    companyId = _useController3$field.value,
    onChange = _useController3$field.onChange,
    _onBlur = _useController3$field.onBlur,
    error = _useController3.fieldState.error;
  var _useCompanies = useCompanies(companyName),
    companies = _useCompanies.companies,
    isLoading = _useCompanies.isLoading;
  var _useState = useState(false),
    _useState2 = _slicedToArray$2(_useState, 2),
    companyFound = _useState2[0],
    setCompanyFound = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$2(_useState3, 2),
    focused = _useState4[0],
    setFocused = _useState4[1];
  var _useState5 = useState(0),
    _useState6 = _slicedToArray$2(_useState5, 2),
    companiesFoundCount = _useState6[0],
    setCompaniesFoundCount = _useState6[1];
  var isCompanyCreationEnabled = useCompanyCreationEnabled();
  var _useObjectCreationSet = useObjectCreationSettings(),
    companyRequiredFromExtension = _useObjectCreationSet.companyRequiredFromExtension;
  var _useDebounce = useDebounce$1(focused && !isLoading && companyName.length > 0, 200),
    _useDebounce2 = _slicedToArray$2(_useDebounce, 1),
    visible = _useDebounce2[0];
  useEffect(function () {
    if (!isLoading) {
      setCreateCompany(false);
      var company = companies.find(function (company) {
        return company.name === companyName;
      });
      if (company) {
        setCompanyFound(true);
        onChange(company.id.value);
        setCompaniesFoundCount(companies.length);
      } else if (companies.length > 0) {
        setCompanyFound(false);
        onChange('');
        setCompaniesFoundCount(companies.length);
      } else {
        setCompanyFound(false);
        onChange('');
        setCompaniesFoundCount(0);
      }
    }
  }, [companyName, isLoading]);
  var description = useMemo(function () {
    if (createCompany) {
      return {
        text: t('createCompany', {
          companyName: companyName
        }),
        color: style === 'gradient' ? 'white' : 'bloobirds'
      };
    }
    if (!companyFound) {
      if (companiesFoundCount > 0) {
        return {
          text: t('possibleMatch', {
            count: companiesFoundCount || 0
          }),
          color: style === 'gradient' ? 'white' : 'tangerine'
        };
      }
      return {
        text: t('noMatchingCompany'),
        color: style === 'gradient' ? 'white' : 'tangerine'
      };
    }
    return {
      text: t('matchingCompany', {
        companyName: companyName
      }),
      color: style === 'gradient' ? 'white' : 'bloobirds'
    };
  }, [companyName, companyFound, createCompany, companiesFoundCount]);
  return /*#__PURE__*/jsxs(FormGroup, {
    size: size,
    children: [/*#__PURE__*/jsxs(FormLabel, {
      style: style,
      children: [name, logicRole === 'LEAD__COMPANY' && /*#__PURE__*/jsx(Fragment, {
        children: companyRequiredFromExtension ? '*' : /*#__PURE__*/jsx(Tooltip, {
          title: t('referencedTooltip'),
          position: "right",
          children: /*#__PURE__*/jsx(Icon, {
            name: "infoFilled",
            color: style === 'gradient' ? 'veryLightBloobirds' : 'darkBloobirds',
            size: 16
          })
        })
      })]
    }), /*#__PURE__*/jsxs("div", {
      className: styles$2.dropdown,
      children: [/*#__PURE__*/jsxs(Dropdown, {
        width: 256,
        position: "bottom-end",
        arrow: false,
        visible: visible,
        anchor: /*#__PURE__*/jsxs("div", {
          className: styles$2.dropdownInput,
          children: [/*#__PURE__*/jsx(Input, {
            size: size,
            placeholder: t('companiesPlaceholder'),
            value: companyName,
            onChange: setCompanyName,
            error: error === null || error === void 0 ? void 0 : error.message,
            onFocus: function onFocus() {
              setFocused(true);
            },
            onBlur: function onBlur() {
              setFocused(false);
              _onBlur();
            }
          }), /*#__PURE__*/jsx(Icon, {
            name: "search",
            color: "bloobirds",
            size: 14,
            className: styles$2.searchIcon
          })]
        }),
        children: [companies.length === 0 ? /*#__PURE__*/jsx(Text, {
          className: styles$2.empty,
          color: "softPeanut",
          size: "s",
          children: t('noResults')
        }) : /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx(Text, {
            className: styles$2.empty,
            color: "softPeanut",
            size: "s",
            children: t('searchResults')
          }), companies.map(function (company) {
            return /*#__PURE__*/jsx(Item, {
              onClick: function onClick() {
                setCompanyName(company.name);
                setCompanyFound(true);
                setFocused(false);
              },
              children: company.name
            }, company.id.value);
          })]
        }), isCompanyCreationEnabled && !companyId ? /*#__PURE__*/jsx("div", {
          className: styles$2.item,
          role: "button",
          onClick: function onClick() {
            setCreateCompany(true);
          },
          children: /*#__PURE__*/jsx(Text, {
            color: "bloobirds",
            size: "s",
            children: t('createNewCompany', {
              companyName: companyName
            })
          })
        }) : null]
      }), /*#__PURE__*/jsx(Text, {
        className: styles$2.description,
        color: description.color,
        size: "xxs",
        children: description.text
      })]
    })]
  });
};

var TextField = function TextField(_ref) {
  var control = _ref.control,
    required = _ref.required,
    name = _ref.name,
    id = _ref.id,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'small' : _ref$size,
    requiredMessage = _ref.requiredMessage;
  var _useController = useController({
      control: control,
      name: "fields.".concat(id),
      rules: {
        required: {
          value: required,
          message: requiredMessage
        }
      }
    }),
    _useController$field = _useController.field,
    value = _useController$field.value,
    onChange = _useController$field.onChange,
    onBlur = _useController$field.onBlur,
    error = _useController.fieldState.error;
  return /*#__PURE__*/jsxs(FormGroup, {
    size: size,
    children: [size === 'small' && /*#__PURE__*/jsx(FormLabel, {
      required: required,
      children: name
    }), /*#__PURE__*/jsx(Input, {
      value: value,
      onChange: onChange,
      onBlur: onBlur,
      error: error === null || error === void 0 ? void 0 : error.message,
      size: size,
      placeholder: size === 'small' ? undefined : "".concat(name).concat(required ? ' *' : '')
    })]
  });
};

var URLField = function URLField(_ref) {
  var control = _ref.control,
    required = _ref.required,
    name = _ref.name,
    id = _ref.id,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'small' : _ref$size,
    requiredMessage = _ref.requiredMessage;
  var _useController = useController({
      control: control,
      name: "fields.".concat(id),
      rules: {
        pattern: {
          value: /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
          message: 'Invalid URL'
        },
        required: {
          value: required,
          message: requiredMessage
        }
      }
    }),
    _useController$field = _useController.field,
    value = _useController$field.value,
    onChange = _useController$field.onChange,
    onBlur = _useController$field.onBlur,
    error = _useController.fieldState.error;
  return /*#__PURE__*/jsxs(FormGroup, {
    size: size,
    children: [size === 'small' && /*#__PURE__*/jsx(FormLabel, {
      required: required,
      children: name
    }), /*#__PURE__*/jsx(Input, {
      value: value,
      onChange: onChange,
      onBlur: onBlur,
      error: error === null || error === void 0 ? void 0 : error.message,
      size: size,
      placeholder: size === 'small' ? undefined : "".concat(name).concat(required ? ' *' : '')
    })]
  });
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var FormField = function FormField(props) {
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'bobjects.bobjectForm'
    }),
    t = _useTranslation.t;
  var providedProps = _objectSpread(_objectSpread({}, props), {}, {
    requiredMessage: t('requiredMessage')
  });
  switch (props.type) {
    case 'PICKLIST':
      return /*#__PURE__*/jsx(PicklistField, _objectSpread({}, providedProps));
    case 'DATE':
      return /*#__PURE__*/jsx(DateField, _objectSpread({}, providedProps));
    case 'DATETIME':
      return /*#__PURE__*/jsx(DateField, _objectSpread({}, providedProps));
    case 'TEXT':
      return /*#__PURE__*/jsx(TextField, _objectSpread({}, providedProps));
    case 'EMAIL':
      return /*#__PURE__*/jsx(EmailField, _objectSpread({}, providedProps));
    case 'URL':
      return /*#__PURE__*/jsx(URLField, _objectSpread({}, providedProps));
    case 'NUMBER':
      return /*#__PURE__*/jsx(NumberField, _objectSpread({}, providedProps));
    case 'DECIMAL':
      return /*#__PURE__*/jsx(DecimalField, _objectSpread({}, providedProps));
    case 'PHONE':
      return /*#__PURE__*/jsx(PhoneField, _objectSpread({}, providedProps));
    case 'REFERENCE':
      return /*#__PURE__*/jsx(ReferenceField, _objectSpread({}, providedProps));
    default:
      return null;
  }
};
FormField.defaultProps = {
  style: 'light'
};

var css_248z$1 = ".openClickedStatistics-module__container__6qaqd {\n  flex-grow: 1;\n}\n\n.openClickedStatistics-module__statistic_container__lmV-X {\n  display: flex;\n}\n\n.openClickedStatistics-module__statistic_container__lmV-X > * + * {\n  margin-left: 8px;\n}\n\n.openClickedStatistics-module__statistic__F01mP {\n  display: flex;\n  align-items: center;\n}\n\n.openClickedStatistics-module__statistic__F01mP > *:first-child {\n  margin-right: 8px;\n}\n\n.openClickedStatistics-module__history_list__D8gtM {\n  margin: 0;\n  padding: 0 0 24px;\n}\n\n.openClickedStatistics-module__history_item__Qc9qL {\n  padding: 0;\n  display: flex;\n  align-items: center;\n  position: relative;\n}\n\n.openClickedStatistics-module__history_item__Qc9qL::before {\n  content: '';\n  margin-right: 8px;\n  width: 9px;\n  height: 9px;\n  border-radius: 100%;\n  background-color: var(--verySoftPeanut);\n}\n\n.openClickedStatistics-module__history_item__Qc9qL::after {\n  content: '';\n  position: absolute;\n  bottom: 0;\n  border-left: 1px dashed #c5d1dd;\n  height: 24px;\n  transform: translateY(calc(100% + 2px));\n  left: 4px;\n}\n\n.openClickedStatistics-module__history_item__Qc9qL > *:last-child {\n  margin-left: 8px;\n}\n\n.openClickedStatistics-module__history_item__Qc9qL:last-child:after {\n  display: none;\n}\n\n.openClickedStatistics-module__history_link__in8Q3 {\n  margin-left: 4px;\n  text-decoration: none;\n}\n\n.openClickedStatistics-module__showDetails__-TUlW {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  margin-left: 32px;\n}\n\n.openClickedStatistics-module__showDetails__-TUlW > *:first-child {\n  margin-right: 8px;\n}\n";
var styles$1 = {"_container":"openClickedStatistics-module__container__6qaqd","_statistic_container":"openClickedStatistics-module__statistic_container__lmV-X","_statistic":"openClickedStatistics-module__statistic__F01mP","_history_list":"openClickedStatistics-module__history_list__D8gtM","_history_item":"openClickedStatistics-module__history_item__Qc9qL","_history_link":"openClickedStatistics-module__history_link__in8Q3","_showDetails":"openClickedStatistics-module__showDetails__-TUlW"};
styleInject(css_248z$1);

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$1(arr); }
function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$1(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
var Statistic = function Statistic(_ref) {
  var _Object$keys;
  var title = _ref.title,
    value = _ref.value,
    size = _ref.size;
  if (!value) return null;
  var length = (_Object$keys = Object.keys(value)) === null || _Object$keys === void 0 ? void 0 : _Object$keys.length;
  var style = {
    color: length ? 'var(--melon)' : 'var(--peanut)',
    backgroundColor: length ? 'var(--verySoftMelon)' : 'var(--verySoftPeanut)',
    borderColor: length ? 'var(--verySoftMelon)' : 'var(--verySoftPeanut)'
  };
  return /*#__PURE__*/jsxs("div", {
    className: styles$1._statistic,
    children: [/*#__PURE__*/jsx(Text, {
      weight: "medium",
      size: size === 'medium' ? 'm' : 'xs',
      color: "peanut",
      children: title
    }), /*#__PURE__*/jsx(Label, {
      size: "small",
      overrideStyle: style,
      children: length
    })]
  });
};
var History = function History(_ref2) {
  var opens = _ref2.opens,
    clicks = _ref2.clicks,
    size = _ref2.size;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var openHistory = Object.entries(opens).map(function (_ref3) {
    var _ref4 = _slicedToArray$1(_ref3, 2),
      date = _ref4[0],
      data = _ref4[1];
    return {
      date: new Date(parseInt(date, 10) * 1000),
      type: 'opened',
      data: data
    };
  });
  var clickHistory = Object.entries(clicks).map(function (_ref5) {
    var _ref6 = _slicedToArray$1(_ref5, 2),
      date = _ref6[0],
      data = _ref6[1];
    return {
      date: new Date(parseInt(date, 10) * 1000),
      type: 'clicked',
      data: data
    };
  });
  var history = [].concat(_toConsumableArray(openHistory), _toConsumableArray(clickHistory));
  history.sort(function (a, b) {
    return b.date - a.date;
  });
  return /*#__PURE__*/jsx("ul", {
    className: styles$1._history_list,
    children: history.map(function (_ref7) {
      var date = _ref7.date,
        type = _ref7.type,
        data = _ref7.data;
      return /*#__PURE__*/jsxs("li", {
        className: styles$1._history_item,
        style: {
          margin: size === 'medium' ? '28px 0 0' : '12px 0 0'
        },
        children: [/*#__PURE__*/jsx(Text, {
          size: size === 'medium' ? 's' : 'xxs',
          color: "peanut",
          children: type === 'opened' ? t('activityTimelineItem.item.opened') : t('activityTimelineItem.item.clickedLink')
        }), type === 'clicked' && /*#__PURE__*/jsx("a", {
          className: styles$1._history_link,
          href: data !== null && data !== void 0 && data.startsWith('http') ? data : "//".concat(data),
          target: "_blank",
          rel: "noopener noreferrer",
          children: /*#__PURE__*/jsx(Text, {
            size: size === 'medium' ? 's' : 'xxs',
            color: "bloobirds",
            ellipsis: 48,
            children: data === null || data === void 0 ? void 0 : data.replace(/https?:\/\/(www.)?/, '')
          })
        }), /*#__PURE__*/jsx(Text, {
          size: size === 'medium' ? 'xs' : 'xxxs',
          color: "softPeanut",
          children: formatDate(date, "dd LLL yyyy 'at' p OOO")
        })]
      }, "".concat(date, "-").concat(type));
    })
  });
};
var OpenClickedStatistics = function OpenClickedStatistics(_ref8) {
  var _Object$keys2, _Object$keys3;
  var bobject = _ref8.bobject,
    _ref8$size = _ref8.size,
    size = _ref8$size === void 0 ? 'medium' : _ref8$size;
  var _useState = useState(false),
    _useState2 = _slicedToArray$1(_useState, 2),
    showDetails = _useState2[0],
    setShowDetails = _useState2[1];
  var _useTranslation2 = useTranslation(),
    t = _useTranslation2.t;
  var openHistory = getTextFromLogicRole(bobject, 'ACTIVITY__EMAIL_HISTORY_OPEN');
  var emailHistory = getTextFromLogicRole(bobject, 'ACTIVITY__EMAIL_HISTORY_CLICK');
  if (!openHistory && !emailHistory) {
    return null;
  }
  var opens = openHistory ? JSON.parse(openHistory) : {};
  var clicks = emailHistory ? JSON.parse(emailHistory) : {};
  var emptyHistory = ((_Object$keys2 = Object.keys(opens)) === null || _Object$keys2 === void 0 ? void 0 : _Object$keys2.length) === 0 && ((_Object$keys3 = Object.keys(clicks)) === null || _Object$keys3 === void 0 ? void 0 : _Object$keys3.length) === 0;
  return /*#__PURE__*/jsxs("div", {
    className: styles$1._container,
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$1._statistic_container,
      children: [/*#__PURE__*/jsx(Statistic, {
        title: t('activityTimelineItem.item.opened'),
        value: opens,
        size: size
      }), /*#__PURE__*/jsx(Statistic, {
        title: t('activityTimelineItem.item.clicked'),
        value: clicks,
        size: size
      }), !emptyHistory && /*#__PURE__*/jsxs("div", {
        className: styles$1._showDetails,
        onClick: function onClick() {
          return setShowDetails(!showDetails);
        },
        children: [/*#__PURE__*/jsx(Text, {
          size: size === 'medium' ? 's' : 'xxs',
          color: "bloobirds",
          children: showDetails ? t('activityTimelineItem.item.hideDetails') : t('activityTimelineItem.item.showDetails')
        }), /*#__PURE__*/jsx(Icon, {
          size: size === 'medium' ? 16 : 12,
          name: showDetails ? 'chevronUp' : 'chevronDown',
          color: "bloobirds"
        })]
      })]
    }), showDetails && /*#__PURE__*/jsx(History, {
      opens: opens,
      clicks: clicks,
      size: size
    })]
  });
};

var css_248z = ".skipTaskModal-module_modal__em9pl {\n  width: 300px !important;\n  background-color: var(--white);\n}\n\n.skipTaskModal-module_header__MeUSg {\n  padding: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.skipTaskModal-module_content__pF5fT {\n  padding: 16px 24px;\n  padding-top: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.skipTaskModal-module_content__pF5fT input, .skipTaskModal-module_content__pF5fT input:hover, .skipTaskModal-module_content__pF5fT input:focus {\n  box-shadow: none;\n  height: 16px;\n}\n\n.skipTaskModal-module_footer__2R1kG {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  padding: 24px;\n}\n\n.skipTaskModal-module_footer__2R1kG > div > button {\n  padding: 3px 8px;\n}\n";
var styles = {"modal":"skipTaskModal-module_modal__em9pl","header":"skipTaskModal-module_header__MeUSg","content":"skipTaskModal-module_content__pF5fT","footer":"skipTaskModal-module_footer__2R1kG"};
styleInject(css_248z);

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var SkipTaskModal = function SkipTaskModal() {
  var _useOpenSkipTaskModal = useOpenSkipTaskModal(),
    isOpen = _useOpenSkipTaskModal.isOpen;
  return isOpen ? /*#__PURE__*/jsx(SkipTaskModalComponent, {}) : /*#__PURE__*/jsx(Fragment, {});
};
var SkipTaskModalComponent = function SkipTaskModalComponent() {
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'bobjects.skipTaskModal'
    }),
    t = _useTranslation.t;
  var _useOpenSkipTaskModal2 = useOpenSkipTaskModal(),
    closeSkipTaskModal = _useOpenSkipTaskModal2.closeSkipTaskModal,
    task = _useOpenSkipTaskModal2.task,
    onSave = _useOpenSkipTaskModal2.onSave;
  var _useSkipModal = useSkipModal(),
    skipTask = _useSkipModal.skipTask,
    skipReasons = _useSkipModal.skipReasons,
    isRequiredField = _useSkipModal.isRequiredField;
  var _useState = useState(undefined),
    _useState2 = _slicedToArray(_useState, 2),
    reasonSelected = _useState2[0],
    setReasonSelected = _useState2[1];
  var handleSkip = function handleSkip() {
    skipTask(task, reasonSelected).then(function () {
      closeSkipTaskModal();
      onSave();
    });
  };
  return /*#__PURE__*/jsxs(Modal, {
    className: styles.modal,
    open: true,
    onClose: closeSkipTaskModal,
    children: [/*#__PURE__*/jsxs("header", {
      className: styles.header,
      children: [/*#__PURE__*/jsx(Text, {
        size: "xl",
        children: t('title')
      }), /*#__PURE__*/jsx(IconButton, {
        size: 40,
        name: "cross",
        color: "bloobirds",
        onClick: closeSkipTaskModal
      })]
    }), /*#__PURE__*/jsxs("main", {
      className: styles.content,
      children: [/*#__PURE__*/jsx(Text, {
        size: "m",
        children: t('subtitle')
      }), /*#__PURE__*/jsxs(Select, {
        size: "small",
        variant: "form",
        placeholder: t('placeholder'),
        autocomplete: true,
        width: "100%",
        value: reasonSelected,
        onChange: setReasonSelected,
        children: [/*#__PURE__*/jsx(Item, {
          value: "",
          children: /*#__PURE__*/jsx("em", {
            children: t('none')
          })
        }), skipReasons === null || skipReasons === void 0 ? void 0 : skipReasons.map(function (reason) {
          return /*#__PURE__*/jsx(Item, {
            label: reason.name,
            value: reason.id,
            children: reason.name
          }, reason.id);
        })]
      })]
    }), /*#__PURE__*/jsx("footer", {
      className: styles.footer,
      children: /*#__PURE__*/jsx(Tooltip, {
        title: isRequiredField && !reasonSelected && t('required'),
        position: "top",
        children: /*#__PURE__*/jsx(Button, {
          variant: "primary",
          disabled: isRequiredField && !reasonSelected,
          uppercase: false,
          onClick: handleSkip,
          children: t('save')
        })
      })
    })]
  });
};

export { AssignedToSelector, AssigneeComponent, AutoCompleteSearchCompanies, AutoCompleteSearchLeads, BobjectItem, BobjectItemCompressed, BobjectSelector, BobjectTypeMatch, ConfirmDeleteModal, CustomDateDialog, FormField, FormGroup, FormLabel, OpenClickedStatistics, RescheduleModal, SearchBobjects, SearchCardCenter, SearchCardLeft, SearchPreviewButton, SearchStatusLabel, SkipTaskModal, StatusLabel, useConfirmDeleteModal };
//# sourceMappingURL=index.js.map
