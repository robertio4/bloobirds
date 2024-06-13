import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useVisible, Dropdown, SearchInput, Item, Tooltip, CircularBadge, Text, Icon, useToasts, Modal, ModalHeader, ModalTitle, ModalCloseIcon, Callout, Checkbox, ModalFooter, Button } from '@bloobirds-it/flamingo-ui';
import { useDebounce } from '@bloobirds-it/hooks';
import { LEAD_FIELDS_LOGIC_ROLE, COMPANY_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { api, injectReferencesSearchProcess, getFieldByLogicRole, getValueFromLogicRole } from '@bloobirds-it/utils';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';

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

var css_248z = ".addLeadToActivityModal-module__content__wraper__1oLP0 {\n  padding: 32px 60px 0;\n  position: relative;\n  background-color: var(--white);\n}\n\n.addLeadToActivityModal-module__info__wrapper__eHeHj {\n  margin-top: 16px;\n  margin-bottom: 24px;\n}\n\n.addLeadToActivityModal-module__info__wrapper__eHeHj > div > svg {\n  margin: 28px 32px 28px 16px;\n  padding: 0 !important;\n}\n\n.addLeadToActivityModal-module__autocomplete__wrapper__zD2ze {\n  margin-bottom: 30px;\n}\n\n.addLeadToActivityModal-module__autocomplete__wrapper__zD2ze input,\n.addLeadToActivityModal-module__autocomplete__wrapper__zD2ze input:hover,\n.addLeadToActivityModal-module__autocomplete__wrapper__zD2ze input:focus {\n  height: 24px;\n  box-shadow: none;\n  outline: none;\n  border: none;\n}\n\n.addLeadToActivityModal-module__confirm__button__lvErS > button {\n  margin-left: 15px;\n}\n\n.addLeadToActivityModal-module__search_container__N5UcX {\n  max-height: 200px;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.addLeadToActivityModal-module_item__AX-Zg {\n  width: 548px;\n}\n\n.addLeadToActivityModal-module__lead__info__0PvF7 {\n  margin-left: 8px;\n}\n\n.addLeadToActivityModal-module__lead__company__IHNBe {\n  display: flex;\n  align-items: center;\n}\n\n.addLeadToActivityModal-module__lead__company__IHNBe > * {\n  margin-right: 4px;\n}\n\n.addLeadToActivityModal-module__company__icon__5CaLA {\n  flex-shrink: 0;\n}\n";
var styles = {"_content__wraper":"addLeadToActivityModal-module__content__wraper__1oLP0","_info__wrapper":"addLeadToActivityModal-module__info__wrapper__eHeHj","_autocomplete__wrapper":"addLeadToActivityModal-module__autocomplete__wrapper__zD2ze","_confirm__button":"addLeadToActivityModal-module__confirm__button__lvErS","_search_container":"addLeadToActivityModal-module__search_container__N5UcX","item":"addLeadToActivityModal-module_item__AX-Zg","_lead__info":"addLeadToActivityModal-module__lead__info__0PvF7","_lead__company":"addLeadToActivityModal-module__lead__company__IHNBe","_company__icon":"addLeadToActivityModal-module__company__icon__5CaLA"};
styleInject(css_248z);

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$1(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
var AutoCompleteSearchLeads = function AutoCompleteSearchLeads(_ref) {
  var accountId = _ref.accountId,
    buyerPersonas = _ref.buyerPersonas,
    onLeadIdChange = _ref.onLeadIdChange;
  var _useVisible = useVisible(false),
    ref = _useVisible.ref,
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  var _useState = useState([]),
    _useState2 = _slicedToArray$1(_useState, 2),
    options = _useState2[0],
    setOptions = _useState2[1];
  var _useState3 = useState(''),
    _useState4 = _slicedToArray$1(_useState3, 2),
    searchValue = _useState4[0],
    setSearchValue = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray$1(_useState5, 2),
    selectedValue = _useState6[0],
    setSelectedValue = _useState6[1];
  var debounceSearchValue = useDebounce(searchValue, 200);
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  useEffect(function () {
    if (debounceSearchValue) {
      api.post("/bobjects/".concat(accountId, "/Lead/search"), {
        injectReferences: true,
        query: _defineProperty({}, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME, [debounceSearchValue]),
        columns: [LEAD_FIELDS_LOGIC_ROLE.FULL_NAME, LEAD_FIELDS_LOGIC_ROLE.COMPANY, LEAD_FIELDS_LOGIC_ROLE.ICP, LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE],
        referencedColumns: [COMPANY_FIELDS_LOGIC_ROLE.NAME],
        formFields: true,
        pageSize: 1000
      }).then(function (payload) {
        // Fetch all leads and bring the company to print the name
        var payloadWithReferences = injectReferencesSearchProcess(payload === null || payload === void 0 ? void 0 : payload.data);
        var newOptions = payloadWithReferences.contents.map(function (lead) {
          var company = getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.COMPANY).referencedBobject;
          if (!lead) {
            return null;
          }
          return {
            id: lead.id.value,
            name: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
            companyName: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME),
            buyerPersona: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ICP),
            jobTitle: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE)
          };
        });
        setOptions(newOptions.filter(Boolean));
      });
    }
  }, [debounceSearchValue]);
  useEffect(function () {
    setVisible(options.length > 0 && selectedValue !== searchValue);
  }, [options.length, selectedValue, searchValue]);
  var handleSelect = function handleSelect(value) {
    var name = options.find(function (option) {
      return option.id === value;
    }).name;
    var urlLead = value.split('/');
    var leadId = urlLead[urlLead.length - 1];
    onLeadIdChange(leadId);
    setSearchValue(name);
    setSelectedValue(name);
  };
  return /*#__PURE__*/jsx(Dropdown, {
    ref: ref,
    width: "100%",
    visible: visible,
    arrow: false,
    anchor: /*#__PURE__*/jsx("div", {
      style: {
        width: '100%'
      },
      children: /*#__PURE__*/jsx(SearchInput, {
        width: "100%",
        placeholder: t('common.searchLeads'),
        value: searchValue,
        onChange: setSearchValue,
        color: "bloobirds"
      })
    }),
    children: /*#__PURE__*/jsx("div", {
      className: styles._search_container,
      children: options.map(function (option) {
        // @ts-ignore
        var icp = buyerPersonas === null || buyerPersonas === void 0 ? void 0 : buyerPersonas.find(function (person) {
          return person.id === option.buyerPersona;
        });
        return /*#__PURE__*/jsx(Item, {
          className: styles.item,
          onClick: handleSelect,
          value: option.id,
          children: /*#__PURE__*/jsxs(Fragment, {
            children: [icp ? /*#__PURE__*/jsx(Tooltip, {
              title: icp === null || icp === void 0 ? void 0 : icp.name,
              trigger: "hover",
              position: "top",
              children: /*#__PURE__*/jsx(CircularBadge, {
                size: "medium",
                style: {
                  backgroundColor: (icp === null || icp === void 0 ? void 0 : icp.color) || 'var(--verySoftPeanut)',
                  color: 'white'
                },
                children: (icp === null || icp === void 0 ? void 0 : icp.shortName) || ''
              })
            }) : /*#__PURE__*/jsx(CircularBadge, {
              size: "medium",
              style: {
                backgroundColor: 'var(--verySoftPeanut)',
                color: 'white',
                fontSize: 20
              },
              children: "?"
            }), /*#__PURE__*/jsxs("div", {
              className: styles._lead__info,
              children: [/*#__PURE__*/jsx(Text, {
                color: "peanut",
                size: "m",
                weight: "medium",
                ellipsis: 30,
                children: option === null || option === void 0 ? void 0 : option.name
              }), /*#__PURE__*/jsxs(Text, {
                color: "softPeanut",
                size: "s",
                inline: true,
                className: styles._lead__company,
                children: [(option === null || option === void 0 ? void 0 : option.companyName) && /*#__PURE__*/jsxs(Fragment, {
                  children: [/*#__PURE__*/jsx(Icon, {
                    size: 16,
                    name: "company",
                    color: "softPeanut",
                    className: styles._company__icon
                  }), option === null || option === void 0 ? void 0 : option.companyName]
                }), option.companyName && option.jobTitle && ' | ', option.jobTitle || '']
              })]
            })]
          })
        }, option.id);
      })
    })
  });
};

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var AddLeadToActivityModal = function AddLeadToActivityModal(_ref) {
  var activity = _ref.activity,
    accountId = _ref.accountId,
    buyerPersonas = _ref.buyerPersonas,
    onClose = _ref.onClose,
    onSubmit = _ref.onSubmit,
    shouldAllowToAddPhone = _ref.shouldAllowToAddPhone;
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    leadId = _useState2[0],
    setLeadId = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    shouldUpdatePhone = _useState4[0],
    setShouldUpdatePhone = _useState4[1];
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'addLeadToActivityModal'
    }),
    t = _useTranslation.t;
  var handleAssign = function handleAssign() {
    var _activity$id;
    api.post("/utils/service/activity/assign/".concat(activity === null || activity === void 0 ? void 0 : (_activity$id = activity.id) === null || _activity$id === void 0 ? void 0 : _activity$id.objectId), {
      leadId: leadId
    }).then(function () {
      onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(leadId, shouldUpdatePhone);
      createToast({
        message: t('toast.success'),
        type: 'success'
      });
    })["catch"](function () {
      createToast({
        message: t('toast.error'),
        type: 'error'
      });
    });
  };
  return /*#__PURE__*/jsxs(Modal, {
    onClose: onClose,
    open: true,
    width: 700,
    children: [/*#__PURE__*/jsxs(ModalHeader, {
      children: [/*#__PURE__*/jsx(ModalTitle, {
        children: t('title')
      }), /*#__PURE__*/jsx(ModalCloseIcon, {
        onClick: onClose
      })]
    }), /*#__PURE__*/jsxs("div", {
      className: styles._content__wraper,
      children: [/*#__PURE__*/jsx("div", {
        className: styles._info__wrapper,
        children: /*#__PURE__*/jsx(Callout, {
          icon: "info",
          width: "100%",
          children: /*#__PURE__*/jsxs(Text, {
            size: "m",
            children: [/*#__PURE__*/jsx("span", {
              role: "img",
              "aria-label": "icon-label",
              children: "\uD83D\uDCA1"
            }), ' ', t('callout')]
          })
        })
      }), /*#__PURE__*/jsxs("div", {
        className: styles._autocomplete__wrapper,
        children: [/*#__PURE__*/jsx(AutoCompleteSearchLeads, {
          accountId: accountId,
          buyerPersonas: buyerPersonas,
          onLeadIdChange: setLeadId
        }), shouldAllowToAddPhone && /*#__PURE__*/jsx(Checkbox, {
          checked: shouldUpdatePhone,
          onClick: setShouldUpdatePhone,
          children: t('checkbox')
        })]
      })]
    }), /*#__PURE__*/jsxs(ModalFooter, {
      children: [/*#__PURE__*/jsx("div", {
        children: /*#__PURE__*/jsx(Button, {
          variant: "clear",
          color: "tomato",
          onClick: onClose,
          children: t('cancel')
        })
      }), /*#__PURE__*/jsx("div", {
        className: styles._confirm__button,
        children: /*#__PURE__*/jsx(Button, {
          disabled: !leadId,
          onClick: function onClick() {
            handleAssign();
            onClose();
          },
          children: t('assign')
        })
      })]
    })]
  });
};

export { AddLeadToActivityModal, AutoCompleteSearchLeads };
//# sourceMappingURL=index.js.map
