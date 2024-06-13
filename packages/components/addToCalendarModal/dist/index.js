import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalHeader, ModalTitle, ModalContent, Text, Spinner, ModalFooter, Button } from '@bloobirds-it/flamingo-ui';
import { useAddToCalendar, useActiveUserSettings, useDataModel } from '@bloobirds-it/hooks';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, COMPANY_FIELDS_LOGIC_ROLE, ACTIVITY_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { transformCalendarEventDate, getValueFromLogicRole, addMinutes, formatDate, api } from '@bloobirds-it/utils';
import { jsxs, jsx } from 'react/jsx-runtime';

var methods;
(function (methods) {
  methods["METHOD_GOOGLE"] = "GOOGLE";
  methods["METHOD_OUTLOOK"] = "OUTLOOK";
})(methods || (methods = {}));

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

var css_248z = ".addToCalendarModal-module__main__GwaYB {\n  margin: 32px auto;\n  display: flex;\n  align-items: center;\n}\n\n.addToCalendarModal-module__calendar__oka48 {\n  flex-shrink: 0;\n  box-sizing: border-box;\n  margin-right: 16px;\n  border: 1px solid var(--verySoftPeanut);\n}\n\n.addToCalendarModal-module__calendar__oka48 > header {\n  box-sizing: border-box;\n  background-color: var(--tomato);\n}\n\n.addToCalendarModal-module__calendar__oka48 > div {\n  padding: 4px 8px;\n}\n\n.addToCalendarModal-module__text__lhk3c {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n";
var styles = {"_main":"addToCalendarModal-module__main__GwaYB","_calendar":"addToCalendarModal-module__calendar__oka48","_text":"addToCalendarModal-module__text__lhk3c"};
styleInject(css_248z);

var formatCalendarDate = function formatCalendarDate(dateTime) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : methods.METHOD_GOOGLE;
  var isMethodGoogle = method === methods.METHOD_GOOGLE;
  var _transformCalendarEve = transformCalendarEventDate(dateTime, isMethodGoogle),
    year = _transformCalendarEve.year,
    month = _transformCalendarEve.monthStr,
    hour = _transformCalendarEve.hourStr,
    min = _transformCalendarEve.minStr,
    day = _transformCalendarEve.dayStr;
  return isMethodGoogle ? "".concat(year).concat(month).concat(day, "T").concat(hour).concat(min, "00Z") : "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hour, ":").concat(min, ":00");
};
var buildCalendarLink = function buildCalendarLink(_ref) {
  var title = _ref.title,
    fromDate = _ref.fromDate,
    toDate = _ref.toDate,
    guests = _ref.guests;
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : methods.METHOD_GOOGLE;
  var fromString = formatCalendarDate(fromDate, method);
  var toString = formatCalendarDate(toDate, method);
  var encodedTitle = encodeURI(title);
  var guestList = Array.isArray(guests) && guests.length > 0 ? guests.join(',') : null;
  var params;
  var baseUrl = method === methods.METHOD_GOOGLE ? 'https://calendar.google.com/calendar/render' : 'https://outlook.office.com/calendar/deeplink/compose';
  if (method === methods.METHOD_GOOGLE) {
    params = "action=TEMPLATE&text=".concat(encodedTitle, "&dates=").concat(fromString, "/").concat(toString);
    if (guestList) {
      params = "".concat(params, "&add=").concat(guestList);
    }
  } else {
    params = "subject=".concat(encodedTitle, "&startdt=").concat(fromString, "&enddt=").concat(toString);
    if (guestList) {
      params = "".concat(params, "&to=").concat(guestList);
    }
  }
  return "".concat(baseUrl, "?").concat(params);
};

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var getBobjectData = function getBobjectData(id) {
  return api.get("/bobjects/".concat(id, "/form")).then(function (response) {
    return response.data;
  });
};
var AddToCalendarModal = function AddToCalendarModal() {
  var _useAddToCalendar = useAddToCalendar(),
    closeAddToCalendarModal = _useAddToCalendar.closeAddToCalendarModal,
    addToCalendarState = _useAddToCalendar.addToCalendarState;
  var leadId = addToCalendarState.leadId,
    companyId = addToCalendarState.companyId,
    opportunityId = addToCalendarState.opportunityId,
    title = addToCalendarState.title,
    dateTime = addToCalendarState.dateTime,
    accountExecutiveId = addToCalendarState.accountExecutiveId,
    bobjectType = addToCalendarState.bobjectType;
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var isOutlook = (settings === null || settings === void 0 ? void 0 : settings.settings.calendarLinksType) !== 'GOOGLE_CALENDAR';
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    lead = _useState2[0],
    setLead = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    company = _useState4[0],
    setCompany = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    opportunity = _useState6[0],
    setOpportunity = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    loading = _useState8[0],
    setLoading = _useState8[1];
  var dataModel = useDataModel();
  var eventTitle = title || t('common.untitledEvent');
  useEffect(function () {
    if (leadId && (!lead || lead.id.value !== leadId)) {
      setLoading(true);
      getBobjectData(leadId).then(function (response) {
        setLead(response);
        setLoading(false);
      });
    }
  }, [leadId, lead]);
  useEffect(function () {
    if (companyId && (!company || (company === null || company === void 0 ? void 0 : company.id.value) !== companyId)) {
      setLoading(true);
      getBobjectData(companyId).then(function (response) {
        setCompany(response);
        setLoading(false);
      });
    }
  }, [companyId, company]);
  useEffect(function () {
    if (opportunityId && (!opportunity || (opportunity === null || opportunity === void 0 ? void 0 : opportunity.id.value) !== opportunityId)) {
      setLoading(true);
      getBobjectData(opportunityId).then(function (response) {
        setOpportunity(response);
        setLoading(false);
      });
    }
  }, [opportunityId, opportunity]);
  var name = useMemo(function () {
    if (opportunity) {
      return getValueFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME);
    }
    if (lead) {
      return getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
    }
    if (company) {
      return getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
    }
    return '';
  }, [company, lead, opportunity]);
  var url = useMemo(function () {
    var eventLeadName = name && "".concat(t('addToCalendarModal.with'), " ").concat(name);
    var calendarEventTitle = "".concat(eventTitle).concat(eventLeadName);
    var leadEmail = getValueFromLogicRole(lead, 'LEAD__EMAIL');
    var guests = [];
    if (leadEmail && bobjectType === 'Activity') {
      guests.push(leadEmail);
    }
    if (accountExecutiveId && bobjectType === 'Activity') {
      var _dataModel$findFieldB, _dataModel$findFieldB2;
      guests.push((_dataModel$findFieldB = dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE)) === null || _dataModel$findFieldB === void 0 ? void 0 : (_dataModel$findFieldB2 = _dataModel$findFieldB.values) === null || _dataModel$findFieldB2 === void 0 ? void 0 : _dataModel$findFieldB2.find(function (ae) {
        return ae.id === accountExecutiveId;
      }).name);
    }
    return dateTime && buildCalendarLink({
      title: calendarEventTitle,
      fromDate: dateTime,
      toDate: addMinutes(dateTime, 30),
      guests: guests
    }, isOutlook ? methods.METHOD_OUTLOOK : methods.METHOD_GOOGLE);
  }, [name, title, dateTime, settings, lead]);
  var openLink = function openLink() {
    window.open(url, '_blank');
    closeAddToCalendarModal();
  };
  return /*#__PURE__*/jsxs(Modal, {
    open: true,
    onClose: closeAddToCalendarModal,
    width: 500,
    children: [/*#__PURE__*/jsx(ModalHeader, {
      children: /*#__PURE__*/jsx(ModalTitle, {
        children: t('addToCalendarModal.title')
      })
    }), /*#__PURE__*/jsxs(ModalContent, {
      children: [/*#__PURE__*/jsx(Text, {
        color: "softPeanut",
        size: "m",
        align: "center",
        children: t('addToCalendarModal.header')
      }), /*#__PURE__*/jsxs("div", {
        className: styles._main,
        children: [/*#__PURE__*/jsxs("div", {
          className: styles._calendar,
          children: [/*#__PURE__*/jsx("header", {
            children: /*#__PURE__*/jsx(Text, {
              align: "center",
              size: "m",
              weight: "bold",
              color: "white",
              children: formatDate(dateTime, 'MMM').toUpperCase()
            })
          }), /*#__PURE__*/jsxs("div", {
            children: [/*#__PURE__*/jsx(Text, {
              align: "center",
              size: "xxl",
              weight: "bold",
              color: "peanut",
              children: dateTime === null || dateTime === void 0 ? void 0 : dateTime.getDate()
            }), /*#__PURE__*/jsx(Text, {
              align: "center",
              size: "s",
              color: "peanut",
              children: formatDate(dateTime, 'hh:mm a').toLowerCase()
            })]
          })]
        }), /*#__PURE__*/jsxs("div", {
          className: styles._text,
          children: [/*#__PURE__*/jsx(Text, {
            size: "l",
            weight: "bold",
            color: "peanut",
            children: eventTitle
          }), loading ? /*#__PURE__*/jsx(Spinner, {
            name: "dots"
          }) : name && /*#__PURE__*/jsxs(Text, {
            size: "m",
            color: "peanut",
            children: [t('common.with'), " ", name]
          })]
        })]
      })]
    }), /*#__PURE__*/jsxs(ModalFooter, {
      children: [/*#__PURE__*/jsx(Button, {
        dataTest: "Form-Close",
        onClick: closeAddToCalendarModal,
        variant: "tertiary",
        children: t('common.close')
      }), /*#__PURE__*/jsx(Button, {
        onClick: openLink,
        variant: "primary",
        children: t('addToCalendarModal.addToCalendar')
      })]
    })]
  });
};

export { AddToCalendarModal as default };
//# sourceMappingURL=index.js.map
