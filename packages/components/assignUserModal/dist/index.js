import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToasts, Modal, ModalHeader, ModalTitle, Select, Icon, Item, CircularBadge, Text, Callout, ModalFooter, Button, Spinner, Dropdown, RadioGroup, Radio } from '@bloobirds-it/flamingo-ui';
import { useSelectAll, useBobject, useFullSalesEnabled, useUserSearch } from '@bloobirds-it/hooks';
import { api, isOpportunity, getValueFromLogicRole } from '@bloobirds-it/utils';
import { BobjectTypes, ACTIVITY_FIELDS_LOGIC_ROLE, FIELDS_LOGIC_ROLE, IMPORT_THRESHOLD, BulkActions, MIXPANEL_EVENTS, LEAD_FIELDS_LOGIC_ROLE, COMPANY_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';

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

var css_248z = ".assignUser-module__content__wraper__I7ue8 {\n  padding: 32px 60px 0;\n  position: relative;\n  background-color: var(--white);\n}\n\n.assignUser-module__info__wrapper__uV-fg {\n  margin-top: 16px;\n  margin-bottom: 24px;\n}\n\n.assignUser-module__info__wrapper__uV-fg > div > svg {\n  padding: 0 10px 0 0;\n}\n\n.assignUser-module__autocomplete__wrapper__HlP3M {\n  margin-bottom: 30px;\n  width: 100%;\n}\n\n.assignUser-module__autocomplete__wrapper__HlP3M input,\n.assignUser-module__autocomplete__wrapper__HlP3M input:focus,\n.assignUser-module__autocomplete__wrapper__HlP3M input:hover {\n  box-shadow: none !important;\n  border: none !important;\n  color: var(--peanut) !important;\n  outline: none;\n}\n\n.assignUser-module__confirm__button__OEzRt > button {\n  margin-left: 15px;\n}\n\n.assignUser-module__circularBadge__PGr0L {\n  margin-right: 8px;\n}\n\n.assignUser-module__content__assign__d1x-a {\n  padding: 16px 16px 0;\n  position: relative;\n  background-color: var(--white);\n}\n\n.assignUser-module__checkbox__4Gvm5 {\n  padding-top: 12px;\n}\n\n.assignUser-module__assign_button_wrapper__vTtvD {\n  padding: 32px 28px 16px 28px;\n  background-color: var(--white);\n}\n\n.assignUser-module__assign_button_wrapper__vTtvD > button {\n  display: flex;\n  justify-content: center;\n}\n\n.assignUser-module__dropdown_content__wraper__bqgpL {\n  padding: 8px 19px;\n}\n\n.assignUser-module__title_content__wraper__Fy6Js {\n  font-weight: bold;\n  padding-bottom: 16px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n}\n\n.assignUser-module__dropdown_button_wrapper__5Rvmo {\n  padding: 0px 28px 16px 28px;\n  background-color: var(--white);\n  display: flex;\n  justify-content: space-between;\n}\n\n.assignUser-module__dropdown_button_wrapper__5Rvmo > button {\n  display: flex;\n  justify-content: space-between;\n}\n\n.assignUser-module__dropdown_autocomplete__wrapper__C6VQk {\n  margin-bottom: 15px;\n  width: 100%;\n}\n";
var styles = {"_content__wraper":"assignUser-module__content__wraper__I7ue8","_info__wrapper":"assignUser-module__info__wrapper__uV-fg","_autocomplete__wrapper":"assignUser-module__autocomplete__wrapper__HlP3M","_confirm__button":"assignUser-module__confirm__button__OEzRt","_circularBadge":"assignUser-module__circularBadge__PGr0L","_content__assign":"assignUser-module__content__assign__d1x-a","_checkbox":"assignUser-module__checkbox__4Gvm5","_assign_button_wrapper":"assignUser-module__assign_button_wrapper__vTtvD","_dropdown_content__wraper":"assignUser-module__dropdown_content__wraper__bqgpL","_title_content__wraper":"assignUser-module__title_content__wraper__Fy6Js","_dropdown_button_wrapper":"assignUser-module__dropdown_button_wrapper__5Rvmo","_dropdown_autocomplete__wrapper":"assignUser-module__dropdown_autocomplete__wrapper__C6VQk"};
styleInject(css_248z);

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$3(arr, i) { return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3(); }
function _nonIterableRest$3() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }
function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$3(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$3(arr) { if (Array.isArray(arr)) return arr; }
var useAssignUser = function useAssignUser(bobject, accountId) {
  var _sampleBobject$id, _sampleBobject$id2;
  var _useState = useState(),
    _useState2 = _slicedToArray$3(_useState, 2),
    isLoading = _useState2[0],
    setIsLoading = _useState2[1];
  var _useSelectAll = useSelectAll(),
    resetSelectedItems = _useSelectAll.resetSelectedItems;
  var isBulkAction = Array.isArray(bobject);
  var sampleBobject = isBulkAction ? bobject[0] : bobject;
  var bobjectType = sampleBobject === null || sampleBobject === void 0 ? void 0 : (_sampleBobject$id = sampleBobject.id) === null || _sampleBobject$id === void 0 ? void 0 : _sampleBobject$id.typeName;
  var _useBobject = useBobject(sampleBobject === null || sampleBobject === void 0 ? void 0 : (_sampleBobject$id2 = sampleBobject.id) === null || _sampleBobject$id2 === void 0 ? void 0 : _sampleBobject$id2.typeName, accountId),
    patchBobject = _useBobject.patchBobject,
    bulkPatchBobjects = _useBobject.bulkPatchBobjects;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var updateSingleBobject = function updateSingleBobject(singleBobjectId, body) {
    return patchBobject(singleBobjectId, body);
  };
  var updateBulkObjects = function updateBulkObjects(data) {
    return bulkPatchBobjects(data);
  };
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var prepareDataForUpdate = function prepareDataForUpdate(_ref) {
    var bobject = _ref.bobject,
      updateData = _ref.updateData;
    var bobjectsData = {};
    bobject.map(function (b) {
      var _b$id;
      return b === null || b === void 0 ? void 0 : (_b$id = b.id) === null || _b$id === void 0 ? void 0 : _b$id.objectId;
    }).forEach(function (id) {
      bobjectsData = _objectSpread(_objectSpread({}, bobjectsData), {}, _defineProperty$1({}, id, updateData));
    });
    return bobjectsData;
  };
  var launchQueuedBulkAction = function launchQueuedBulkAction(_ref2) {
    var action = _ref2.action,
      query = _ref2.query,
      total = _ref2.total,
      bobjectType = _ref2.bobjectType,
      bobjectIds = _ref2.bobjectIds,
      contents = _ref2.contents;
    var isByQuery = !!query;
    var bobjectName = t("common.".concat(bobjectType.toLowerCase()), {
      count: total || 0
    });
    return api.post("/bobjects/bulkAction/".concat(isByQuery ? 'createBulkByQuery' : 'createBulk'), _objectSpread(_objectSpread({
      importName: t('assignUserModal.importName', {
        total: total,
        bobjectName: bobjectName
      }),
      actionType: action,
      bobjectType: bobjectType,
      bobjectIds: bobjectIds
    }, isByQuery ? {
      query: query
    } : {}), {}, {
      contents: contents
    }));
  };
  var handleAssign = function handleAssign(userSelectedId, onClose, onSave, subhomeTab, useEveryBobject) {
    setIsLoading(true);
    var _ref3 = useEveryBobject || {},
      isActive = _ref3.isActive,
      total = _ref3.total,
      query = _ref3.query;
    var handleSuccess = function handleSuccess() {
      onClose === null || onClose === void 0 ? void 0 : onClose();
      setIsLoading(false);
      createToast({
        message: t('assignUserModal.toast.success'),
        type: 'success'
      });
      resetSelectedItems();
      onSave === null || onSave === void 0 ? void 0 : onSave();
    };
    if (bobject) {
      var updateData = bobjectType == BobjectTypes.Activity ? _defineProperty$1({}, ACTIVITY_FIELDS_LOGIC_ROLE.USER, userSelectedId) : _defineProperty$1({}, FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO, userSelectedId);
      if (isBulkAction) {
        // Queued bulk
        if (isActive && total >= IMPORT_THRESHOLD || (bobject === null || bobject === void 0 ? void 0 : bobject.length) >= IMPORT_THRESHOLD) {
          launchQueuedBulkAction({
            action: BulkActions.UPDATE,
            total: isActive ? total : bobject === null || bobject === void 0 ? void 0 : bobject.length,
            bobjectType: bobjectType,
            bobjectIds: (bobject === null || bobject === void 0 ? void 0 : bobject.length) >= IMPORT_THRESHOLD ? bobject.map(function (bob) {
              return bob.id.value;
            }) : undefined,
            contents: updateData,
            query: (bobject === null || bobject === void 0 ? void 0 : bobject.length) >= IMPORT_THRESHOLD ? undefined : query !== null && query !== void 0 ? query : {}
          }).then(handleSuccess);
          mixpanel.track(MIXPANEL_EVENTS.REASSIGN_IMPORT_BULK_ACTION_CLICKED_ON_ + bobjectType.toUpperCase() + '_ON' + subhomeTab.toUpperCase() + '_TAB');
        } else {
          updateBulkObjects(prepareDataForUpdate({
            bobject: bobject,
            updateData: updateData
          })).then(handleSuccess);
          mixpanel.track(MIXPANEL_EVENTS.REASSIGN_BASIC_BULK_ACTION_CLICKED_ON_ + bobjectType.toUpperCase() + '_ON' + subhomeTab.toUpperCase() + '_TAB');
        }
      } else {
        updateSingleBobject(bobject.id.objectId, updateData).then(handleSuccess);
      }
    }
  };
  return {
    handleAssign: handleAssign,
    isLoading: isLoading
  };
};

function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2(); }
function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$2(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }
var AssignUserModal = function AssignUserModal(_ref) {
  var _sampleBobject$id, _t, _users$users;
  var bobject = _ref.bobject,
    accountId = _ref.accountId,
    assigneeUser = _ref.assigneeUser,
    onSave = _ref.onSave,
    onClose = _ref.onClose,
    useEveryBobject = _ref.useEveryBobject,
    subhomeTab = _ref.subhomeTab;
  var hasSalesConversionEnabled = useFullSalesEnabled(accountId);
  var _useState = useState(assigneeUser),
    _useState2 = _slicedToArray$2(_useState, 2),
    userSelected = _useState2[0],
    setUserSelected = _useState2[1];
  var _useAssignUser = useAssignUser(bobject, accountId),
    isLoading = _useAssignUser.isLoading,
    handleAssign = _useAssignUser.handleAssign;
  var users = useUserSearch();
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var _useState3 = useState(),
    _useState4 = _slicedToArray$2(_useState3, 2),
    search = _useState4[0],
    setSearch = _useState4[1];
  var isBulkAction = Array.isArray(bobject);
  var sampleBobject = isBulkAction ? bobject[0] : bobject;
  var bobjectType = sampleBobject === null || sampleBobject === void 0 ? void 0 : (_sampleBobject$id = sampleBobject.id) === null || _sampleBobject$id === void 0 ? void 0 : _sampleBobject$id.typeName;
  var bobjectName = (_t = t("bobjectTypes.".concat(bobjectType === null || bobjectType === void 0 ? void 0 : bobjectType.toLowerCase()), {
    count: isBulkAction ? 2 : 1
  })) === null || _t === void 0 ? void 0 : _t.toLowerCase();
  return /*#__PURE__*/jsxs(Modal, {
    open: true,
    onClose: onClose,
    width: 640,
    children: [/*#__PURE__*/jsx(ModalHeader, {
      children: /*#__PURE__*/jsx(ModalTitle, {
        children: t('assignUserModal.assignAction', {
          bobjectName: bobjectName
        })
      })
    }), /*#__PURE__*/jsxs("div", {
      className: styles._content__wraper,
      children: [/*#__PURE__*/jsx("div", {
        className: styles._autocomplete__wrapper,
        children: /*#__PURE__*/jsx(Select, {
          autocomplete: true,
          width: "520px",
          adornment: /*#__PURE__*/jsx(Icon, {
            size: 20,
            name: "search",
            color: "softPeanut"
          }),
          onChange: setUserSelected,
          value: userSelected,
          onSearch: function onSearch(v) {
            return setSearch(v);
          },
          renderDisplayValue: function renderDisplayValue(v) {
            return v === null || v === void 0 ? void 0 : v.name;
          },
          children: users && (users === null || users === void 0 ? void 0 : (_users$users = users.users) === null || _users$users === void 0 ? void 0 : _users$users.filter(function (user) {
            return user === null || user === void 0 ? void 0 : user.active;
          }).map(function (user) {
            var _user$name;
            if (search && !(user !== null && user !== void 0 && (_user$name = user.name) !== null && _user$name !== void 0 && _user$name.toLowerCase().includes(search === null || search === void 0 ? void 0 : search.toLowerCase()))) {
              return null;
            }
            return /*#__PURE__*/jsx(Item, {
              dataTest: user === null || user === void 0 ? void 0 : user.id,
              value: user,
              children: /*#__PURE__*/jsxs(Fragment, {
                children: [/*#__PURE__*/jsx(CircularBadge, {
                  size: "medium",
                  className: styles._circularBadge,
                  style: {
                    color: 'white',
                    backgroundColor: (user === null || user === void 0 ? void 0 : user.color) || 'softGray'
                  },
                  children: (user === null || user === void 0 ? void 0 : user.shortname) || 'U'
                }), /*#__PURE__*/jsxs("div", {
                  children: [/*#__PURE__*/jsx(Text, {
                    color: "peanut",
                    size: "m",
                    weight: "medium",
                    children: user === null || user === void 0 ? void 0 : user.name
                  }), /*#__PURE__*/jsx(Text, {
                    color: "softPeanut",
                    size: "m",
                    children: user === null || user === void 0 ? void 0 : user.email
                  })]
                })]
              })
            }, user === null || user === void 0 ? void 0 : user.id);
          }))
        })
      }), /*#__PURE__*/jsx("div", {
        className: styles._info__wrapper,
        children: /*#__PURE__*/jsx(Callout, {
          icon: "info",
          width: "100%",
          children: /*#__PURE__*/jsxs(Text, {
            size: "m",
            children: [/*#__PURE__*/jsx("span", {
              role: "img",
              "aria-label": "icon-label",
              children: "\uD83D\uDC49"
            }), ' ', hasSalesConversionEnabled ? t('assignUserModal.callout.sales', {
              bobjectName: bobjectName
            }) : t('assignUserModal.callout.noSales', {
              bobjectName: bobjectName,
              tab: isOpportunity(sampleBobject) ? t('common.opportunity', {
                count: 2
              }) : t('leftBar.quickFilters.delivered')
            })]
          })
        })
      })]
    }), /*#__PURE__*/jsxs(ModalFooter, {
      children: [/*#__PURE__*/jsx("div", {
        children: /*#__PURE__*/jsx(Button, {
          variant: "clear",
          color: "tomato",
          onClick: onClose,
          children: t('common.cancel')
        })
      }), /*#__PURE__*/jsx("div", {
        className: styles._confirm__button,
        children: /*#__PURE__*/jsx(Button, {
          disabled: !userSelected || isLoading,
          onClick: function onClick() {
            return handleAssign(userSelected === null || userSelected === void 0 ? void 0 : userSelected.id, onClose, onSave, subhomeTab, useEveryBobject);
          },
          children: isLoading ? /*#__PURE__*/jsx(Spinner, {
            name: "loadingCircle"
          }) : t('common.assign')
        })
      })]
    })]
  });
};

function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$1(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
var AssignUserDropdown = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var bobject = _ref.bobject,
    accountId = _ref.accountId,
    userId = _ref.userId,
    visible = _ref.visible,
    setVisible = _ref.setVisible,
    children = _ref.children,
    setOpenModal = _ref.setOpenModal,
    onSave = _ref.onSave;
  var _useState = useState(true),
    _useState2 = _slicedToArray$1(_useState, 2),
    autoAssign = _useState2[0],
    setAutoAssign = _useState2[1];
  var _useAssignUser = useAssignUser(bobject, accountId),
    isLoading = _useAssignUser.isLoading,
    handleAssign = _useAssignUser.handleAssign;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var handleChanges = function handleChanges() {
    if (autoAssign) {
      handleAssign(userId, function () {
        return setVisible(false);
      }, onSave);
    } else {
      setOpenModal();
    }
  };
  return /*#__PURE__*/jsxs(Dropdown, {
    ref: ref,
    visible: visible,
    width: 274,
    anchor: children,
    children: [/*#__PURE__*/jsxs("div", {
      className: styles._content__assign,
      children: [/*#__PURE__*/jsx(Text, {
        size: "xs",
        align: "center",
        children: t('assignUserModal.recommendation_a')
      }), /*#__PURE__*/jsx(Text, {
        size: "xs",
        align: "center",
        weight: "heavy",
        children: t('assignUserModal.recommendation_b')
      }), /*#__PURE__*/jsx("div", {
        className: styles._checkbox,
        children: /*#__PURE__*/jsxs(RadioGroup, {
          defaultValue: autoAssign,
          onChange: setAutoAssign,
          children: [/*#__PURE__*/jsx(Radio, {
            size: "small",
            value: true,
            expand: true,
            children: t('assignUserModal.me')
          }), /*#__PURE__*/jsx(Radio, {
            size: "small",
            value: false,
            expand: true,
            children: t('assignUserModal.other')
          })]
        })
      })]
    }), /*#__PURE__*/jsx("div", {
      className: styles._assign_button_wrapper,
      children: /*#__PURE__*/jsx(Button, {
        disabled: isLoading,
        onClick: handleChanges
        //@ts-ignore
        ,
        iconLeft: !isLoading && 'personAdd',
        size: "small",
        expand: true,
        children: isLoading ? /*#__PURE__*/jsx(Spinner, {
          name: "loadingCircle"
        }) : t('common.assign')
      })
    })]
  });
});

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var SearchAssignUserDropdown = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _sampleBobject$id, _t, _users$users;
  var bobject = _ref.bobject,
    accountId = _ref.accountId,
    assigneeUser = _ref.assigneeUser,
    visible = _ref.visible,
    setVisible = _ref.setVisible,
    children = _ref.children,
    onSave = _ref.onSave,
    showCallout = _ref.showCallout,
    subhomeTab = _ref.subhomeTab,
    assignReferencedBobject = _ref.assignReferencedBobject;
  var _useAssignUser = useAssignUser(bobject, accountId),
    isLoading = _useAssignUser.isLoading,
    handleAssign = _useAssignUser.handleAssign;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var _useState = useState(assigneeUser),
    _useState2 = _slicedToArray(_useState, 2),
    userSelected = _useState2[0],
    setUserSelected = _useState2[1];
  var _useState3 = useState(),
    _useState4 = _slicedToArray(_useState3, 2),
    search = _useState4[0],
    setSearch = _useState4[1];
  var users = useUserSearch();
  var hasSalesConversionEnabled = useFullSalesEnabled(accountId);
  var isBulkAction = Array.isArray(bobject);
  var sampleBobject = isBulkAction ? bobject[0] : bobject;
  var bobjectType = sampleBobject === null || sampleBobject === void 0 ? void 0 : (_sampleBobject$id = sampleBobject.id) === null || _sampleBobject$id === void 0 ? void 0 : _sampleBobject$id.typeName;
  var bobjectName = (_t = t("bobjectTypes.".concat(bobjectType === null || bobjectType === void 0 ? void 0 : bobjectType.toLowerCase()), {
    count: isBulkAction ? 2 : 1
  })) === null || _t === void 0 ? void 0 : _t.toLowerCase();
  var handleChanges = function handleChanges() {
    handleAssign(userSelected === null || userSelected === void 0 ? void 0 : userSelected.id, function () {
      return setVisible(false);
    }, onSave, subhomeTab);
    if (assignReferencedBobject && bobjectType == BobjectTypes.Activity) {
      var activityLead = getValueFromLogicRole(sampleBobject, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
      var activityCompany = getValueFromLogicRole(sampleBobject, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY);
      var referencedBobject = activityLead || activityCompany;
      if (referencedBobject) {
        api.patch("/bobjects/".concat(referencedBobject, "/raw"), {
          contents: _defineProperty({}, activityLead ? LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO : COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO, userSelected === null || userSelected === void 0 ? void 0 : userSelected.id),
          params: {}
        });
      }
    }
  };
  var handlePreventPropagation = function handlePreventPropagation(event) {
    event.preventDefault();
    event.stopPropagation();
  };
  return /*#__PURE__*/jsx(Dropdown, {
    visible: visible,
    width: 300,
    anchor: children,
    children: /*#__PURE__*/jsxs("div", {
      onClick: handlePreventPropagation,
      children: [/*#__PURE__*/jsxs("div", {
        className: styles._dropdown_content__wraper,
        children: [/*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "peanut",
          className: styles._title_content__wraper,
          children: t('assignUserModal.dropdown.title')
        }), /*#__PURE__*/jsx("div", {
          className: styles._dropdown_autocomplete__wrapper,
          children: /*#__PURE__*/jsx(Select, {
            autocomplete: true,
            width: "268px",
            onChange: setUserSelected,
            value: userSelected,
            onSearch: function onSearch(v) {
              return setSearch(v);
            },
            renderDisplayValue: function renderDisplayValue(v) {
              return v === null || v === void 0 ? void 0 : v.name;
            },
            placeholder: t('assignUserModal.dropdown.placeholder'),
            size: 'small',
            children: users && (users === null || users === void 0 ? void 0 : (_users$users = users.users) === null || _users$users === void 0 ? void 0 : _users$users.filter(function (user) {
              return user === null || user === void 0 ? void 0 : user.active;
            }).map(function (user) {
              var _user$name;
              if (search && !(user !== null && user !== void 0 && (_user$name = user.name) !== null && _user$name !== void 0 && _user$name.toLowerCase().includes(search === null || search === void 0 ? void 0 : search.toLowerCase()))) {
                return null;
              }
              return /*#__PURE__*/jsx(Item, {
                dataTest: user === null || user === void 0 ? void 0 : user.id,
                value: user,
                children: /*#__PURE__*/jsxs(Fragment, {
                  children: [/*#__PURE__*/jsx(CircularBadge, {
                    size: "small",
                    className: styles._circularBadge,
                    style: {
                      color: 'white',
                      backgroundColor: (user === null || user === void 0 ? void 0 : user.color) || 'softGray'
                    },
                    children: (user === null || user === void 0 ? void 0 : user.shortname) || 'U'
                  }), /*#__PURE__*/jsx("div", {
                    children: /*#__PURE__*/jsx(Text, {
                      color: "peanut",
                      size: "xs",
                      weight: "medium",
                      children: user === null || user === void 0 ? void 0 : user.name
                    })
                  })]
                })
              }, user === null || user === void 0 ? void 0 : user.id);
            }))
          })
        }), showCallout && /*#__PURE__*/jsx("div", {
          className: styles._info__wrapper,
          children: /*#__PURE__*/jsx(Callout, {
            icon: "info",
            width: "100%",
            children: /*#__PURE__*/jsxs(Text, {
              size: "xs",
              children: [/*#__PURE__*/jsx("span", {
                role: "img",
                "aria-label": "icon-label",
                children: "\uD83D\uDC49"
              }), ' ', hasSalesConversionEnabled ? t('assignUserModal.callout.sales', {
                bobjectName: bobjectName
              }) : t('assignUserModal.callout.noSales', {
                bobjectName: bobjectName,
                tab: isOpportunity(sampleBobject) ? t('common.opportunity', {
                  count: 2
                }) : t('leftBar.quickFilters.delivered')
              })]
            })
          })
        })]
      }), /*#__PURE__*/jsxs("div", {
        className: styles._dropdown_button_wrapper,
        children: [/*#__PURE__*/jsx(Button, {
          variant: "clear",
          color: "extraMeeting",
          uppercase: false,
          onClick: function onClick() {
            return setVisible(false);
          },
          size: "small",
          children: "Cancel"
        }), /*#__PURE__*/jsx(Button, {
          disabled: !userSelected || isLoading,
          onClick: handleChanges,
          uppercase: false,
          size: "small",
          children: isLoading ? /*#__PURE__*/jsx(Spinner, {
            name: "loadingCircle"
          }) : t('common.assign')
        })]
      })]
    })
  });
});

export { AssignUserDropdown, AssignUserModal, SearchAssignUserDropdown };
//# sourceMappingURL=index.js.map
