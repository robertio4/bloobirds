import { useState } from 'react';
import groupBy from 'lodash/groupBy';
import { Modal, Text, IconButton, Select, Section, Item, Button } from '@bloobirds-it/flamingo-ui';
import { compose } from 'redux';
import { useUserTimeZone, useTimeZones } from '@bloobirds-it/hooks';
import { useTranslation } from 'react-i18next';
import { jsxs, jsx } from 'react/jsx-runtime';

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

var css_248z = ".changeTimezoneModal-module_modal__6iIWY {\n  width: 300px !important;\n  background-color: var(--white);\n}\n\n.changeTimezoneModal-module_header__tIL4T {\n  padding: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.changeTimezoneModal-module_content__e5qCU {\n  padding: 0 24px 16px;\n}\n\n.changeTimezoneModal-module_content__e5qCU input,\n.changeTimezoneModal-module_content__e5qCU input:hover {\n  border: none;\n  outline: none;\n  box-shadow: none;\n}\n\n.changeTimezoneModal-module_customButton__F7cN- {\n  margin-top: 8px;\n  justify-content: center;\n}\n";
var styles = {"modal":"changeTimezoneModal-module_modal__6iIWY","header":"changeTimezoneModal-module_header__tIL4T","content":"changeTimezoneModal-module_content__e5qCU","customButton":"changeTimezoneModal-module_customButton__F7cN-"};
styleInject(css_248z);

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var removeContinent = function removeContinent(value) {
  return value === null || value === void 0 ? void 0 : value.replace(/\s([A-z]*)\//, ' ');
};
var replaceUnderscores = function replaceUnderscores(value) {
  return value === null || value === void 0 ? void 0 : value.replace('_', ':');
};
var cleanTimezoneName = compose(removeContinent, replaceUnderscores);
var ChangeTimezoneModal = function ChangeTimezoneModal(_ref) {
  var _allTimeZones$find, _continentTimeZones$A, _continentTimeZones$E, _continentTimeZones$A2, _continentTimeZones$A3, _continentTimeZones$A4, _continentTimeZones$A5;
  var defaultTimezone = _ref.defaultTimezone,
    onChange = _ref.onChange,
    onClose = _ref.onClose;
  var userTimeZone = useUserTimeZone();
  var _useState = useState(defaultTimezone || userTimeZone),
    _useState2 = _slicedToArray(_useState, 2),
    selectedTimeZone = _useState2[0],
    setSelectedTimeZone = _useState2[1];
  var allTimeZones = useTimeZones();
  var userDefaultTimezone = allTimeZones === null || allTimeZones === void 0 ? void 0 : (_allTimeZones$find = allTimeZones.find(function (timezone) {
    return (timezone === null || timezone === void 0 ? void 0 : timezone.location) === userTimeZone;
  })) === null || _allTimeZones$find === void 0 ? void 0 : _allTimeZones$find.name;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: "changeTzModal"
    }),
    t = _useTranslation.t;
  var handleChange = function handleChange() {
    onChange(selectedTimeZone);
  };
  var continentTimeZones = groupBy(allTimeZones, function (_ref2) {
    var location = _ref2.location;
    return location === null || location === void 0 ? void 0 : location.split('/')[0].trim();
  });
  return /*#__PURE__*/jsxs(Modal, {
    className: styles.modal,
    open: true,
    onClose: onClose,
    children: [/*#__PURE__*/jsxs("header", {
      className: styles.header,
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
      className: styles.content,
      children: [/*#__PURE__*/jsxs(Select, {
        width: "100%",
        borderless: false,
        value: selectedTimeZone,
        onChange: setSelectedTimeZone,
        size: "small",
        autocomplete: true,
        children: [userTimeZone && /*#__PURE__*/jsx(Section, {
          id: "my-timezone",
          children: t('myTimezone')
        }), userTimeZone && /*#__PURE__*/jsx(Item, {
          section: "my-timezone",
          label: userTimeZone,
          value: userTimeZone,
          children: userDefaultTimezone ? cleanTimezoneName(userDefaultTimezone) : null
        }), /*#__PURE__*/jsx(Section, {
          id: "america-timezone",
          children: t('america')
        }), (_continentTimeZones$A = continentTimeZones['America']) === null || _continentTimeZones$A === void 0 ? void 0 : _continentTimeZones$A.map(function (_ref3) {
          var location = _ref3.location,
            name = _ref3.name;
          return /*#__PURE__*/jsx(Item, {
            section: "america-timezone",
            label: location,
            value: location,
            children: cleanTimezoneName(name)
          }, location);
        }), /*#__PURE__*/jsx(Section, {
          id: "europe-timezone",
          children: t('europe')
        }), (_continentTimeZones$E = continentTimeZones['Europe']) === null || _continentTimeZones$E === void 0 ? void 0 : _continentTimeZones$E.map(function (_ref4) {
          var location = _ref4.location,
            name = _ref4.name;
          return /*#__PURE__*/jsx(Item, {
            section: "europe-timezone",
            label: location,
            value: location,
            children: cleanTimezoneName(name)
          }, location);
        }), /*#__PURE__*/jsx(Section, {
          id: "africa-timezone",
          children: t('africa')
        }), (_continentTimeZones$A2 = continentTimeZones['Africa']) === null || _continentTimeZones$A2 === void 0 ? void 0 : _continentTimeZones$A2.map(function (_ref5) {
          var location = _ref5.location,
            name = _ref5.name;
          return /*#__PURE__*/jsx(Item, {
            section: "africa-timezone",
            label: location,
            value: location,
            children: cleanTimezoneName(name)
          }, location);
        }), /*#__PURE__*/jsx(Section, {
          id: "asia-timezone",
          children: t('asia')
        }), (_continentTimeZones$A3 = continentTimeZones['Asia']) === null || _continentTimeZones$A3 === void 0 ? void 0 : _continentTimeZones$A3.map(function (_ref6) {
          var location = _ref6.location,
            name = _ref6.name;
          return /*#__PURE__*/jsx(Item, {
            section: "asia-timezone",
            label: location,
            value: location,
            children: cleanTimezoneName(name)
          }, location);
        }), /*#__PURE__*/jsx(Section, {
          id: "australia-timezone",
          children: t('australia')
        }), (_continentTimeZones$A4 = continentTimeZones['Australia']) === null || _continentTimeZones$A4 === void 0 ? void 0 : _continentTimeZones$A4.map(function (_ref7) {
          var location = _ref7.location,
            name = _ref7.name;
          return /*#__PURE__*/jsx(Item, {
            section: "australia-timezone",
            label: location,
            value: location,
            children: cleanTimezoneName(name)
          }, location);
        }), /*#__PURE__*/jsx(Section, {
          id: "antarctica-timezone",
          children: t('america')
        }), (_continentTimeZones$A5 = continentTimeZones['Antarctica']) === null || _continentTimeZones$A5 === void 0 ? void 0 : _continentTimeZones$A5.map(function (_ref8) {
          var location = _ref8.location,
            name = _ref8.name;
          return /*#__PURE__*/jsx(Item, {
            section: "antarctica-timezone",
            label: location,
            value: location,
            children: cleanTimezoneName(name)
          }, location);
        })]
      }), /*#__PURE__*/jsx(Button, {
        className: styles.customButton,
        expand: true,
        variant: "tertiary",
        uppercase: true,
        iconLeft: "calendar",
        onClick: handleChange,
        children: t('change')
      })]
    })]
  });
};

export { ChangeTimezoneModal };
//# sourceMappingURL=index.js.map
