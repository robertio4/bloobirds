import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { AssignedToSelector, BobjectSelector, useConfirmDeleteModal } from '@bloobirds-it/bobjects';
import { Label, Icon, useVisible, Dropdown, Text, Section, Button, DatePicker, Tooltip, IconButton, Spinner, useToasts, Modal, ModalHeader, ModalTitle, ModalCloseIcon } from '@bloobirds-it/flamingo-ui';
import { useDataModel, useActiveAccountId, useNewCadenceTableEnabled, useCustomTasks, useActiveUserSettings, useReminders, useMinimizableModal, useUserHelpers, useAddToCalendar } from '@bloobirds-it/hooks';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import { TASK_FIELDS_LOGIC_ROLE, TASK_PRIORITY_VALUE, UserPermission, BobjectTypes, TASK_ACTION, TASK_ACTION_VALUE, FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, COMPANY_FIELDS_LOGIC_ROLE, OPPORTUNITY_FIELDS_LOGIC_ROLE, ExtensionHelperKeys, TASK_TYPE, TASK_STATUS_VALUE_LOGIC_ROLE, MIXPANEL_EVENTS, MessagesEvents } from '@bloobirds-it/types';
import clsx from 'clsx';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { baseUrls, getTextFromLogicRole, getFieldByLogicRole, getReferencedBobject, getValueFromLogicRole, api } from '@bloobirds-it/utils';
import { useForm, useController } from 'react-hook-form';
import mixpanel from 'mixpanel-browser';

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

var css_248z$4 = ".prioritySelector-module_container__3T8nC {\n  overflow-y: auto;\n  gap: 8px;\n  padding: 8px;\n  margin-top: -7px;\n  position: absolute !important;\n  right: -10px;\n}\n\n.prioritySelector-module_containerOpen__NBAgB {\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 8px;\n  margin-top: -7px;\n  background-color: var(--white);\n  position: absolute !important;\n  right: -10px;\n  border: solid 1px var(--lighterGray);\n  border-radius: 4px;\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n}\n";
var styles$4 = {"container":"prioritySelector-module_container__3T8nC","containerOpen":"prioritySelector-module_containerOpen__NBAgB"};
styleInject(css_248z$4);

function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2(); }
function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$2(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }
var PrioritySelector = function PrioritySelector(_ref) {
  var value = _ref.value,
    onChange = _ref.onChange,
    _ref$overrideStyle = _ref.overrideStyle,
    overrideStyle = _ref$overrideStyle === void 0 ? {} : _ref$overrideStyle;
  var _useState = useState(false),
    _useState2 = _slicedToArray$2(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var dataModel = useDataModel();
  var priorityTask = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findValuesByFieldLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  var defaultValue = value && (priorityTask === null || priorityTask === void 0 ? void 0 : priorityTask.find(function (priorityTask) {
    return priorityTask.logicRole === value || priorityTask.name === value;
  }));
  var isImportantSelected = (defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.logicRole) === TASK_PRIORITY_VALUE.IMPORTANT;
  if (open) {
    return /*#__PURE__*/jsx("div", {
      className: styles$4.containerOpen,
      style: overrideStyle,
      children: priorityTask === null || priorityTask === void 0 ? void 0 : priorityTask.map(function (priority) {
        return /*#__PURE__*/jsxs(Label, {
          overrideStyle: {
            backgroundColor: priority === null || priority === void 0 ? void 0 : priority.backgroundColor,
            color: priority === null || priority === void 0 ? void 0 : priority.textColor,
            borderColor: priority === null || priority === void 0 ? void 0 : priority.backgroundColor,
            textTransform: 'initial'
          },
          hoverStyle: {
            opacity: 0.7
          },
          size: 'small',
          onClick: function onClick() {
            setOpen(false);
            onChange(priority === null || priority === void 0 ? void 0 : priority.logicRole);
          },
          children: [(priority === null || priority === void 0 ? void 0 : priority.logicRole) === TASK_PRIORITY_VALUE.IMPORTANT && /*#__PURE__*/jsx(Icon, {
            name: "flagFilled",
            size: 12,
            color: "softTomato"
          }), ' ', priority === null || priority === void 0 ? void 0 : priority.name]
        }, priority === null || priority === void 0 ? void 0 : priority.id);
      })
    });
  }
  return /*#__PURE__*/jsx("div", {
    className: styles$4.container,
    style: overrideStyle,
    children: /*#__PURE__*/jsxs(Label, {
      overrideStyle: {
        backgroundColor: defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.backgroundColor,
        color: defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.textColor,
        borderColor: defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.backgroundColor,
        textTransform: 'initial'
      },
      size: "small",
      hoverStyle: {
        opacity: 0.7
      },
      onClick: function onClick() {
        setOpen(true);
      },
      children: [isImportantSelected && /*#__PURE__*/jsx(Icon, {
        name: "flagFilled",
        size: 12,
        color: "softTomato"
      }), ' ', defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.name]
    })
  });
};

var css_248z$3 = ".taskTypeSelector-module_container__K6Hx3 {\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.taskTypeSelector-module_item__hh9kC {\n  display: flex;\n  align-items: center;\n  position: relative;\n  color: var(--darkGray);\n  font-size: 12px;\n  font-weight: var(--fontMedium);\n  line-height: 16px;\n  padding: 4px 16px;\n  cursor: pointer;\n}\n\n.taskTypeSelector-module_item__hh9kC:hover {\n  background-color: var(--lightestBloobirds);\n}\n\n.taskTypeSelector-module_icon__3nEeU {\n  width: 24px;\n  margin-right: 8px;\n}\n\n.taskTypeSelector-module_title__v-9gN {\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 3;\n  line-clamp: 3;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.taskTypeSelector-module_taskButton__R9tXB {\n  border: none;\n  background: none;\n  border-radius: 4px;\n  cursor: pointer;\n  padding: 0 4px;\n}\n\n.taskTypeSelector-module_taskButton__R9tXB:hover {\n  background-color: var(--lightestBloobirds);\n}\n\n.taskTypeSelector-module_iconContainer__SGxCU {\n  height: 100%;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  max-width: 172px;\n}\n\n.taskTypeSelector-module_iconContainer_long__sDZDI {\n  max-width: 288px;\n}\n\n.taskTypeSelector-module_iconContainer__SGxCU > svg {\n  min-width: 20px;\n}\n\n.taskTypeSelector-module_iconContainer__SGxCU > p {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n.taskTypeSelector-module_add_new_custom_task__ZCK-a {\n  display: flex;\n  justify-content: center;\n  margin-top: 8px;\n  margin-bottom: 8px;\n}\n\n.taskTypeSelector-module_footer__9Z-95 {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 16px 14px;\n}\n\n";
var styles$3 = {"container":"taskTypeSelector-module_container__K6Hx3","item":"taskTypeSelector-module_item__hh9kC","icon":"taskTypeSelector-module_icon__3nEeU","title":"taskTypeSelector-module_title__v-9gN","taskButton":"taskTypeSelector-module_taskButton__R9tXB","iconContainer":"taskTypeSelector-module_iconContainer__SGxCU","iconContainer_long":"taskTypeSelector-module_iconContainer_long__sDZDI","add_new_custom_task":"taskTypeSelector-module_add_new_custom_task__ZCK-a","footer":"taskTypeSelector-module_footer__9Z-95"};
styleInject(css_248z$3);

function _typeof$3(obj) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$3(obj); }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(arg) { var key = _toPrimitive$3(arg, "string"); return _typeof$3(key) === "symbol" ? key : String(key); }
function _toPrimitive$3(input, hint) { if (_typeof$3(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$3(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
var TaskTypeSelector = function TaskTypeSelector(_ref) {
  var _settings$user;
  var value = _ref.value,
    onChange = _ref.onChange,
    isWebapp = _ref.isWebapp,
    _ref$forceOpened = _ref.forceOpened,
    forceOpened = _ref$forceOpened === void 0 ? false : _ref$forceOpened;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'tasks.taskTypeSelector'
    }),
    t = _useTranslation.t;
  var taskTypes = [{
    icon: 'checkDouble',
    name: t('task'),
    value: 'TASK',
    iconColor: 'bloobirds'
  }, {
    icon: 'phone',
    name: t('call'),
    value: 'CALL',
    iconColor: 'extraCall'
  }, {
    icon: 'mail',
    name: t('email'),
    value: 'EMAIL',
    iconColor: 'tangerine'
  }];
  var accountId = useActiveAccountId();
  var customTaskEnabled = useNewCadenceTableEnabled(accountId);
  var _useVisible = useVisible(forceOpened),
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible,
    ref = _useVisible.ref;
  var _useCustomTasks = useCustomTasks(),
    customTasks = _useCustomTasks.customTasks;
  var _React$useState = React.useState(),
    _React$useState2 = _slicedToArray$1(_React$useState, 2),
    selectedValue = _React$useState2[0],
    setSelectedValue = _React$useState2[1];
  var _React$useState3 = React.useState(taskTypes),
    _React$useState4 = _slicedToArray$1(_React$useState3, 2),
    taskTypesWithCustom = _React$useState4[0],
    setTaskTypesWithCustom = _React$useState4[1];
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var permissions = settings === null || settings === void 0 ? void 0 : (_settings$user = settings.user) === null || _settings$user === void 0 ? void 0 : _settings$user.permissions;
  var canConfigureCustomTasks = permissions.includes(UserPermission.CUSTOM_TASK);
  var redirectToCustomTaskPlaybook = function redirectToCustomTaskPlaybook() {
    var baseUrl = baseUrls["development"];
    window.open("".concat(baseUrl, "/app/playbook/custom-tasks"), '_blank');
  };
  useEffect(function () {
    if (customTaskEnabled) {
      setTaskTypesWithCustom([].concat(taskTypes, _toConsumableArray(customTasks ? customTasks === null || customTasks === void 0 ? void 0 : customTasks.map(function (custom) {
        return {
          icon: custom.icon,
          name: custom.name,
          value: custom.id,
          iconColor: custom.iconColor
        };
      }) : [])));
    }
  }, [customTasks]);
  useEffect(function () {
    var selectedTask = taskTypesWithCustom.find(function (task) {
      return task.value === value;
    });
    setSelectedValue(selectedTask);
  }, [value, taskTypesWithCustom, customTasks]);
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsx(Dropdown, {
      ref: ref,
      visible: visible,
      position: "top",
      style: {
        width: '218px',
        maxHeight: '255px'
      },
      anchor: /*#__PURE__*/jsx("button", {
        className: styles$3.taskButton,
        onClick: function onClick() {
          return setVisible(true);
        },
        children: /*#__PURE__*/jsxs("div", {
          className: clsx(styles$3.iconContainer, _defineProperty$3({}, styles$3.iconContainer_long, isWebapp)),
          children: [selectedValue ? /*#__PURE__*/jsxs(Fragment, {
            children: [/*#__PURE__*/jsx(Icon, {
              name: selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.icon,
              size: 20,
              color: selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.iconColor
            }), /*#__PURE__*/jsx(Text, {
              inline: true,
              size: "m",
              color: "peanut",
              weight: "bold",
              children: selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.name
            })]
          }) : /*#__PURE__*/jsxs(Fragment, {
            children: [/*#__PURE__*/jsx(Icon, {
              name: "checkDouble",
              size: 20,
              color: "bloobirds"
            }), /*#__PURE__*/jsx(Text, {
              inline: true,
              size: "m",
              color: "peanut",
              weight: "bold",
              children: t('task')
            })]
          }), ' ', /*#__PURE__*/jsx(Icon, {
            name: "chevronDown",
            size: 16,
            color: "softPeanut"
          })]
        })
      }),
      children: /*#__PURE__*/jsxs("div", {
        className: styles$3.container,
        children: [/*#__PURE__*/jsx(Section, {
          children: t('taskTypes')
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsxs(Fragment, {
            children: [taskTypesWithCustom === null || taskTypesWithCustom === void 0 ? void 0 : taskTypesWithCustom.map(function (_ref2) {
              var value = _ref2.value,
                name = _ref2.name,
                icon = _ref2.icon,
                iconColor = _ref2.iconColor;
              return /*#__PURE__*/jsxs("div", {
                className: styles$3.item,
                onClick: function onClick() {
                  setVisible(false);
                  onChange(value);
                },
                children: [/*#__PURE__*/jsx("div", {
                  className: styles$3.icon,
                  children: /*#__PURE__*/jsx(Icon, {
                    name: icon,
                    color: iconColor
                  })
                }), /*#__PURE__*/jsx("div", {
                  className: styles$3.title,
                  children: name
                })]
              }, value);
            }), customTaskEnabled && (canConfigureCustomTasks ? /*#__PURE__*/jsx("div", {
              className: styles$3.add_new_custom_task,
              children: /*#__PURE__*/jsx(Button, {
                iconRight: "plus",
                variant: "clear",
                size: "small",
                uppercase: false,
                expand: true,
                onClick: redirectToCustomTaskPlaybook,
                children: t('addNew')
              })
            }) : /*#__PURE__*/jsxs("div", {
              className: styles$3.footer,
              children: [/*#__PURE__*/jsx(Text, {
                size: "xxs",
                align: "center",
                children: t('missingTask')
              }), /*#__PURE__*/jsx(Text, {
                size: "xxs",
                weight: "bold",
                align: "center",
                children: t('askYourManager')
              })]
            }))]
          })
        })]
      })
    })
  });
};

var css_248z$2 = ".taskForm-module_container__J6TCg {\n  border: 1px solid #9acfff;\n  box-sizing: border-box;\n  box-shadow: 0 2px 20px rgb(25 145 255 / 15%);\n  border-radius: 8px;\n  background-color: white;\n  width: 320px;\n  animation: taskForm-module_floatingMenu-module_popup__v8iVF__0GwNg 150ms ease-in-out;\n  display: inline-block;\n  position: relative;\n  pointer-events: all;\n}\n\n.taskForm-module__bobject_type_selector__AQySf {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  position: relative;\n}\n\n.taskForm-module_container__J6TCg > div {\n  max-height: 250px;\n}\n\n.taskForm-module_content_container__tZy-6 {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  height: 100%;\n}\n\n.taskForm-module_bottom_bar__ZvXQ1 {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px;\n  max-width: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n  gap: 8px;\n}\n\n.taskForm-module_text__Cycie {\n  margin-left: 4px;\n}\n\n.taskForm-module_record_related__AgmET {\n  flex-grow: 1;\n  overflow: hidden;\n}\n\n.taskForm-module_editor__-CCtk {\n  display: flex;\n  flex-direction: column;\n}\n\n.taskForm-module_wrapper__bMPoD {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  z-index: 2;\n  pointer-events: none;\n}\n\n.taskForm-module_dragging__2OSEM {\n  pointer-events: unset;\n}\n\n.taskForm-module_divider__lwQbZ {\n  width: 90%;\n  text-align: center;\n  border-top: 1px solid var(--verySoftPeanut);\n  align-self: center;\n}\n\n.taskForm-module_bobject_selector__xCm8D > div {\n  max-width: 100%;\n  justify-content: flex-start;\n}\n\n.taskForm-module_bobject_selector__xCm8D > div > div {\n  max-width: 100%;\n}\n\n.taskForm-module_toolbar__-G3Jo {\n  border-top: 1px solid var(--verySoftPeanut);\n  border-bottom: 1px solid var(--verySoftPeanut);\n}\n\n.taskForm-module_mainNote__dxWA1 {\n  margin-right: 4px;\n}\n\n.taskForm-module_modal_title__-5rtw {\n  display: flex;\n  margin: 8px 18px;\n  align-items: center;\n}\n\n.taskForm-module_modal_title__-5rtw > * {\n  margin-right: 8px;\n}\n\n.taskForm-module_task_info__4Arj7 {\n  display: flex;\n  flex-direction: column;\n  margin: 6px 0;\n}\n\n.taskForm-module_task_date__ugxgf {\n  display: flex;\n  margin: 2px 18px;\n  align-items: center;\n}\n\n.taskForm-module_task_date__ugxgf > * {\n  margin-right: 8px;\n}\n\n.taskForm-module_task_date_title__8k8Rn {\n  display: flex;\n  align-items: center;\n}\n\n.taskForm-module_date_button__qAXzc {\n  cursor: pointer;\n}\n\n.taskForm-module_textArea__u-KON {\n  margin: 18px;\n  border: none;\n  resize: none;\n  font-family: 'Proxima Nova Soft';\n  max-width: 90%;\n  box-shadow: none;\n  color: var(--peanut) !important;\n}\n\n.taskForm-module_textArea_extended__18Imm {\n  height: 74px !important;\n}\n\n.taskForm-module_textArea__u-KON:focus, .taskForm-module_textArea__u-KON:hover {\n  outline: none !important;\n  box-shadow: none !important;\n}\n\n.taskForm-module_add_task_button__J7ULi {\n  min-width: 105px;\n}\n";
var styles$2 = {"container":"taskForm-module_container__J6TCg","floatingMenu-module_popup__v8iVF":"taskForm-module_floatingMenu-module_popup__v8iVF__0GwNg","_bobject_type_selector":"taskForm-module__bobject_type_selector__AQySf","content_container":"taskForm-module_content_container__tZy-6","bottom_bar":"taskForm-module_bottom_bar__ZvXQ1","text":"taskForm-module_text__Cycie","record_related":"taskForm-module_record_related__AgmET","editor":"taskForm-module_editor__-CCtk","wrapper":"taskForm-module_wrapper__bMPoD","dragging":"taskForm-module_dragging__2OSEM","divider":"taskForm-module_divider__lwQbZ","bobject_selector":"taskForm-module_bobject_selector__xCm8D","toolbar":"taskForm-module_toolbar__-G3Jo","mainNote":"taskForm-module_mainNote__dxWA1","modal_title":"taskForm-module_modal_title__-5rtw","task_info":"taskForm-module_task_info__4Arj7","task_date":"taskForm-module_task_date__ugxgf","task_date_title":"taskForm-module_task_date_title__8k8Rn","date_button":"taskForm-module_date_button__qAXzc","textArea":"taskForm-module_textArea__u-KON","textArea_extended":"taskForm-module_textArea_extended__18Imm","add_task_button":"taskForm-module_add_task_button__J7ULi"};
styleInject(css_248z$2);

function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(arg) { var key = _toPrimitive$2(arg, "string"); return _typeof$2(key) === "symbol" ? key : String(key); }
function _toPrimitive$2(input, hint) { if (_typeof$2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var TaskForm = function TaskForm(_ref) {
  var modalId = _ref.modalId,
    isEditionModal = _ref.isEditionModal,
    handleDelete = _ref.handleDelete,
    title = _ref.title,
    titleOnChange = _ref.titleOnChange,
    actionType = _ref.actionType,
    actionTypeOnChange = _ref.actionTypeOnChange,
    priority = _ref.priority,
    priorityOnChange = _ref.priorityOnChange,
    taskDate = _ref.taskDate,
    taskDateOnChange = _ref.taskDateOnChange,
    datePickerVisible = _ref.datePickerVisible,
    datePickerRef = _ref.datePickerRef,
    setDatePickerVisible = _ref.setDatePickerVisible,
    assignedToId = _ref.assignedToId,
    setAssignedToId = _ref.setAssignedToId,
    relatedOnChange = _ref.relatedOnChange,
    nameSelected = _ref.nameSelected,
    setNameSelected = _ref.setNameSelected,
    onSubmit = _ref.onSubmit,
    formMethods = _ref.formMethods,
    _ref$isWebapp = _ref.isWebapp,
    isWebapp = _ref$isWebapp === void 0 ? false : _ref$isWebapp,
    forceOpened = _ref.forceOpened;
  var isSubmitting = formMethods.isSubmitting,
    isDirty = formMethods.isDirty,
    handleSubmit = formMethods.handleSubmit;
  var accountId = useActiveAccountId();
  var _useCustomTasks = useCustomTasks(),
    customTasks = _useCustomTasks.customTasks;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'tasks.taskForm'
    }),
    t = _useTranslation.t;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'dates'
    }),
    dateT = _useTranslation2.t;
  var handleChangeTaskType = function handleChangeTaskType(value) {
    actionTypeOnChange(value);
    if (!['TASK', 'CALL', 'EMAIL'].includes(value)) {
      var _customTasks$find;
      var customTaskDescription = customTasks === null || customTasks === void 0 ? void 0 : (_customTasks$find = customTasks.find(function (task) {
        return task.id === value;
      })) === null || _customTasks$find === void 0 ? void 0 : _customTasks$find.description;
      if (customTaskDescription) {
        titleOnChange(customTaskDescription);
      }
    }
  };
  return /*#__PURE__*/jsxs("div", {
    className: styles$2.content_container,
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$2.editor,
      children: [/*#__PURE__*/jsx("span", {
        className: styles$2.modal_title,
        children: /*#__PURE__*/jsxs("div", {
          className: styles$2._bobject_type_selector,
          children: [/*#__PURE__*/jsx(TaskTypeSelector, {
            value: actionType,
            onChange: handleChangeTaskType,
            isWebapp: isWebapp,
            forceOpened: forceOpened
          }), /*#__PURE__*/jsx(PrioritySelector, {
            value: priority,
            onChange: priorityOnChange
          })]
        })
      }), /*#__PURE__*/jsx("span", {
        className: styles$2.divider
      }), /*#__PURE__*/jsxs("div", {
        className: styles$2.task_info,
        children: [/*#__PURE__*/jsxs("span", {
          className: styles$2.task_date,
          children: [/*#__PURE__*/jsxs("span", {
            className: styles$2.task_date_title,
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
            openDefaultValue: taskDate !== null && taskDate !== void 0 ? taskDate : new Date(),
            onChange: taskDateOnChange,
            dropDownRef: datePickerRef,
            visible: datePickerVisible,
            setVisible: setDatePickerVisible,
            dropdownProps: {
              zIndex: 10000,
              anchor: /*#__PURE__*/jsx("span", {
                onClick: function onClick() {
                  return setDatePickerVisible(true);
                },
                className: styles$2.date_button,
                children: /*#__PURE__*/jsx(Text, {
                  size: "xs",
                  color: "bloobirds",
                  weight: "regular",
                  children: useGetI18nSpacetime(taskDate).format(dateT('shortMonthFullDate'))
                })
              })
            }
          })]
        }), /*#__PURE__*/jsxs("span", {
          className: styles$2.task_date,
          children: [/*#__PURE__*/jsxs("span", {
            className: styles$2.task_date_title,
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
        })]
      }), /*#__PURE__*/jsx("span", {
        className: styles$2.divider
      }), /*#__PURE__*/jsx("textarea", {
        className: clsx(styles$2.textArea, _defineProperty$2({}, styles$2.textArea_extended, isWebapp)),
        value: title,
        placeholder: t('placeholder'),
        onChange: function onChange(e) {
          return titleOnChange(e.target.value);
        },
        autoFocus: true
      })]
    }), /*#__PURE__*/jsx("div", {
      children: /*#__PURE__*/jsxs("div", {
        className: styles$2.bottom_bar,
        children: [/*#__PURE__*/jsx("span", {
          className: styles$2.record_related,
          children: /*#__PURE__*/jsx("div", {
            className: styles$2.bobject_selector,
            children: /*#__PURE__*/jsx(Tooltip, {
              title: !isWebapp && nameSelected,
              position: "top",
              children: /*#__PURE__*/jsx(BobjectSelector, {
                accountId: accountId,
                selected: nameSelected,
                id: modalId,
                onBobjectChange: function onBobjectChange(bobject) {
                  var _bobject$rawBobject;
                  relatedOnChange(bobject === null || bobject === void 0 ? void 0 : (_bobject$rawBobject = bobject.rawBobject) === null || _bobject$rawBobject === void 0 ? void 0 : _bobject$rawBobject.id);
                  if ((bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType) === BobjectTypes.Company) {
                    setNameSelected(bobject === null || bobject === void 0 ? void 0 : bobject.companyName);
                  } else if ((bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType) === BobjectTypes.Lead) {
                    setNameSelected(bobject === null || bobject === void 0 ? void 0 : bobject.fullName);
                  } else if ((bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType) === BobjectTypes.Opportunity) {
                    setNameSelected(bobject === null || bobject === void 0 ? void 0 : bobject.name);
                  }
                }
              })
            })
          })
        }), /*#__PURE__*/jsxs("div", {
          style: {
            display: 'flex',
            gap: 8
          },
          children: [isEditionModal && /*#__PURE__*/jsx(Tooltip, {
            title: t('deleteTask'),
            position: "top",
            children: /*#__PURE__*/jsx(IconButton, {
              name: "trashFull",
              size: 22,
              onClick: handleDelete
            })
          }), /*#__PURE__*/jsx(Button, {
            className: styles$2.add_task_button,
            size: "small",
            onClick: function onClick() {
              handleSubmit(function () {
                return onSubmit(isWebapp);
              })();
            },
            disabled: !isDirty || isSubmitting,
            children: isSubmitting ? /*#__PURE__*/jsx(Spinner, {
              name: "loadingCircle",
              size: 12
            }) : isEditionModal ? t('saveTask') : t('addTask')
          })]
        })]
      })
    })]
  });
};

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
var _excluded = ["lead", "opportunity", "company", "bobjectId", "companyContext"],
  _excluded2 = ["related"];
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var REMINDERS_KEY = function REMINDERS_KEY(accountId) {
  return "bb-app-".concat(accountId, "-reminders");
};
var useTaskForm = function useTaskForm(modalId) {
  var _settings$account, _getFieldByLogicRole, _getFieldByLogicRole2, _getReferencedBobject, _getReferencedBobject2, _taskBobject$id, _FIELDS_LOGIC_ROLE$ta, _taskRelatedBobject$i, _FIELDS_LOGIC_ROLE$ta2, _taskRelatedBobject$i2, _opportunity$id, _lead$id, _company$id, _taskRelatedBobject$i3, _settings$user;
  var _useReminders = useReminders({
      setViewBobjectId: function setViewBobjectId() {
        return undefined;
      }
    }),
    setEditedReminder = _useReminders.setEditedReminder;
  var _useForm = useForm(),
    control = _useForm.control,
    watch = _useForm.watch,
    getValues = _useForm.getValues,
    handleSubmit = _useForm.handleSubmit;
  var _useMinimizableModal = useMinimizableModal(modalId),
    closeModal = _useMinimizableModal.closeModal,
    _useMinimizableModal$ = _useMinimizableModal.data,
    lead = _useMinimizableModal$.lead,
    opportunity = _useMinimizableModal$.opportunity,
    company = _useMinimizableModal$.company,
    bobjectId = _useMinimizableModal$.bobjectId,
    companyContext = _useMinimizableModal$.companyContext,
    otherData = _objectWithoutProperties(_useMinimizableModal$, _excluded),
    onSave = _useMinimizableModal.onSave,
    onClose = _useMinimizableModal.onClose,
    bobject = _useMinimizableModal.bobject,
    minimize = _useMinimizableModal.minimize;
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var accountId = settings === null || settings === void 0 ? void 0 : (_settings$account = settings.account) === null || _settings$account === void 0 ? void 0 : _settings$account.id;
  var _useCustomTasks = useCustomTasks({
      disabled: true
    }),
    customTasks = _useCustomTasks.customTasks;
  var _useUserHelpers = useUserHelpers(),
    has = _useUserHelpers.has,
    saveCustom = _useUserHelpers.saveCustom;
  var _useAddToCalendar = useAddToCalendar(),
    setAddToCalendarState = _useAddToCalendar.setAddToCalendarState,
    openAddToCalendarModal = _useAddToCalendar.openAddToCalendarModal;

  // @ts-ignore
  var taskBobject = otherData === null || otherData === void 0 ? void 0 : otherData.task;
  var taskTitle = getTextFromLogicRole(taskBobject, TASK_FIELDS_LOGIC_ROLE.TITLE);
  var taskDateTime = getTextFromLogicRole(taskBobject, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  var taskIsCall = ((_getFieldByLogicRole = getFieldByLogicRole(taskBobject, TASK_ACTION.CALL)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.valueLogicRole) === TASK_ACTION_VALUE.CALL_YES;
  var taskIsEmail = ((_getFieldByLogicRole2 = getFieldByLogicRole(taskBobject, TASK_ACTION.EMAIL)) === null || _getFieldByLogicRole2 === void 0 ? void 0 : _getFieldByLogicRole2.valueLogicRole) === TASK_ACTION_VALUE.EMAIL_YES;
  var customTaskId = getFieldByLogicRole(taskBobject, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  var customTask = customTasks === null || customTasks === void 0 ? void 0 : customTasks.find(function (ct) {
    return ct.id === (customTaskId === null || customTaskId === void 0 ? void 0 : customTaskId.value);
  });
  var getDefaultActionType = function getDefaultActionType() {
    if (taskIsCall) {
      return 'CALL';
    }
    if (taskIsEmail) {
      return 'EMAIL';
    }
    if (customTask) {
      return customTask === null || customTask === void 0 ? void 0 : customTask.id;
    }
    return 'TASK';
  };
  var taskPriority = getTextFromLogicRole(taskBobject, TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  var taskRelatedBobject = ((_getReferencedBobject = getReferencedBobject(taskBobject)) === null || _getReferencedBobject === void 0 ? void 0 : (_getReferencedBobject2 = _getReferencedBobject.id) === null || _getReferencedBobject2 === void 0 ? void 0 : _getReferencedBobject2.value) !== (taskBobject === null || taskBobject === void 0 ? void 0 : (_taskBobject$id = taskBobject.id) === null || _taskBobject$id === void 0 ? void 0 : _taskBobject$id.value) && getReferencedBobject(taskBobject);
  var taskRelatedBobjectName = getTextFromLogicRole(taskRelatedBobject, // @ts-ignore
  (_FIELDS_LOGIC_ROLE$ta = FIELDS_LOGIC_ROLE[taskRelatedBobject === null || taskRelatedBobject === void 0 ? void 0 : (_taskRelatedBobject$i = taskRelatedBobject.id) === null || _taskRelatedBobject$i === void 0 ? void 0 : _taskRelatedBobject$i.typeName]) === null || _FIELDS_LOGIC_ROLE$ta === void 0 ? void 0 : _FIELDS_LOGIC_ROLE$ta.FULL_NAME) || getTextFromLogicRole(taskRelatedBobject, // @ts-ignore
  (_FIELDS_LOGIC_ROLE$ta2 = FIELDS_LOGIC_ROLE[taskRelatedBobject === null || taskRelatedBobject === void 0 ? void 0 : (_taskRelatedBobject$i2 = taskRelatedBobject.id) === null || _taskRelatedBobject$i2 === void 0 ? void 0 : _taskRelatedBobject$i2.typeName]) === null || _FIELDS_LOGIC_ROLE$ta2 === void 0 ? void 0 : _FIELDS_LOGIC_ROLE$ta2.NAME);
  var isEditionModal = !!bobjectId;
  var defaultRelated =
  // @ts-ignore
  (otherData !== null && otherData !== void 0 && otherData.related ? // @ts-ignore
  otherData === null || otherData === void 0 ? void 0 : otherData.related : opportunity ? opportunity === null || opportunity === void 0 ? void 0 : (_opportunity$id = opportunity.id) === null || _opportunity$id === void 0 ? void 0 : _opportunity$id.value : lead ? lead === null || lead === void 0 ? void 0 : (_lead$id = lead.id) === null || _lead$id === void 0 ? void 0 : _lead$id.value : company ? company === null || company === void 0 ? void 0 : (_company$id = company.id) === null || _company$id === void 0 ? void 0 : _company$id.value : undefined) || (taskRelatedBobject === null || taskRelatedBobject === void 0 ? void 0 : (_taskRelatedBobject$i3 = taskRelatedBobject.id) === null || _taskRelatedBobject$i3 === void 0 ? void 0 : _taskRelatedBobject$i3.value);
  var defaultName =
  // @ts-ignore
  (otherData !== null && otherData !== void 0 && otherData.relatedName ? // @ts-ignore
  otherData === null || otherData === void 0 ? void 0 : otherData.relatedName : lead ? (lead === null || lead === void 0 ? void 0 : lead.fullName) || (lead === null || lead === void 0 ? void 0 : lead.name) || getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) : company ? (company === null || company === void 0 ? void 0 : company.name) || getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME) : opportunity ? (opportunity === null || opportunity === void 0 ? void 0 : opportunity.name) || getValueFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME) : null) || taskRelatedBobjectName;
  var defaultValues = {
    title: otherData[TASK_FIELDS_LOGIC_ROLE.TITLE] || taskTitle,
    dateTime: otherData[TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME] || taskDateTime || new Date(),
    priority: otherData[TASK_FIELDS_LOGIC_ROLE.PRIORITY] || taskPriority || TASK_PRIORITY_VALUE.NO_PRIORITY,
    actionType: otherData[TASK_FIELDS_LOGIC_ROLE.ACTION_TYPE] || getDefaultActionType() || 'TASK',
    assignedTo: otherData[TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO] || (settings === null || settings === void 0 ? void 0 : (_settings$user = settings.user) === null || _settings$user === void 0 ? void 0 : _settings$user.id)
  };
  var _useState = useState(defaultName),
    _useState2 = _slicedToArray(_useState, 2),
    nameSelected = _useState2[0],
    setNameSelected = _useState2[1];
  var _useState3 = useState(defaultValues.assignedTo),
    _useState4 = _slicedToArray(_useState3, 2),
    assignedToId = _useState4[0],
    setAssignedToId = _useState4[1];
  var _useState5 = useState(),
    _useState6 = _slicedToArray(_useState5, 2),
    isSubmitting = _useState6[0],
    setIsSubmitting = _useState6[1];
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'tasks'
    }),
    t = _useTranslation.t;
  var _useVisible = useVisible(),
    datePickerVisible = _useVisible.visible,
    setDatePickerVisible = _useVisible.setVisible,
    datePickerRef = _useVisible.ref;
  var _useController = useController({
      control: control,
      name: TASK_FIELDS_LOGIC_ROLE.ACTION_TYPE,
      defaultValue: defaultValues.actionType
    }),
    _useController$field = _useController.field,
    actionType = _useController$field.value,
    actionTypeOnChange = _useController$field.onChange;
  var _useController2 = useController({
      control: control,
      name: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
      defaultValue: defaultValues.priority
    }),
    _useController2$field = _useController2.field,
    priority = _useController2$field.value,
    _priorityOnChange = _useController2$field.onChange;
  var _useController3 = useController({
      control: control,
      name: TASK_FIELDS_LOGIC_ROLE.TITLE,
      defaultValue: defaultValues.title
    }),
    _useController3$field = _useController3.field,
    title = _useController3$field.value,
    titleOnChange = _useController3$field.onChange;
  var _useController4 = useController({
      control: control,
      name: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
      defaultValue: new Date(defaultValues.dateTime)
    }),
    _useController4$field = _useController4.field,
    taskDate = _useController4$field.value,
    taskDateOnChange = _useController4$field.onChange;
  var _useController5 = useController({
      control: control,
      name: 'related',
      defaultValue: defaultRelated
    }),
    relatedOnChange = _useController5.field.onChange;
  var titleValue = watch(TASK_FIELDS_LOGIC_ROLE.TITLE);
  var isDirty = useMemo(function () {
    return titleValue && titleValue !== '';
  }, [titleValue]);
  var getBobjectType = function getBobjectType() {
    if (opportunity) return BobjectTypes.Opportunity;
    if (company) return BobjectTypes.Company;
    if (lead) return BobjectTypes.Lead;
  };
  var handleSave = function handleSave() {
    setTimeout(function () {
      window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: {
          type: BobjectTypes.Task
        }
      }));
      window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: {
          type: getBobjectType()
        }
      }));
    }, 1000);
    onSave === null || onSave === void 0 ? void 0 : onSave();
  };
  var handleClose = function handleClose() {
    closeModal === null || closeModal === void 0 ? void 0 : closeModal();
    onClose === null || onClose === void 0 ? void 0 : onClose();
  };
  var onSubmit = function onSubmit(isWebapp) {
    var _TASK_FIELDS_LOGIC_RO, _TASK_FIELDS_LOGIC_RO2;
    setIsSubmitting(true);
    var _getValues = getValues(),
      related = _getValues.related,
      rest = _objectWithoutProperties(_getValues, _excluded2);
    var dataToCreate = _defineProperty$1(_defineProperty$1(_defineProperty$1(_defineProperty$1(_defineProperty$1(_defineProperty$1({}, TASK_FIELDS_LOGIC_ROLE.TITLE, rest[TASK_FIELDS_LOGIC_ROLE.TITLE]), TASK_FIELDS_LOGIC_ROLE.TASK_TYPE, TASK_TYPE.NEXT_STEP), TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO, assignedToId), TASK_FIELDS_LOGIC_ROLE.STATUS, TASK_STATUS_VALUE_LOGIC_ROLE.TODO), TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, rest[TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]), TASK_FIELDS_LOGIC_ROLE.PRIORITY, rest[TASK_FIELDS_LOGIC_ROLE.PRIORITY]);
    var actionType = rest[TASK_FIELDS_LOGIC_ROLE.ACTION_TYPE];
    dataToCreate[TASK_FIELDS_LOGIC_ROLE.TASK_TYPE] = TASK_TYPE.NEXT_STEP;
    dataToCreate[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CALL] = actionType === 'CALL' ? TASK_ACTION_VALUE.CALL_YES : null;
    dataToCreate[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_EMAIL] = actionType === 'EMAIL' ? TASK_ACTION_VALUE.EMAIL_YES : null;
    if (actionType !== 'TASK' && actionType !== 'CALL' && actionType !== 'EMAIL') {
      dataToCreate[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CUSTOM_TASK] = TASK_ACTION_VALUE.CUSTOM_TASK_YES;
      dataToCreate[TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK] = actionType;
    }
    dataToCreate[_TASK_FIELDS_LOGIC_RO = TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CUSTOM_TASK] || (dataToCreate[_TASK_FIELDS_LOGIC_RO] = TASK_ACTION_VALUE.CUSTOM_TASK_NO);
    dataToCreate[_TASK_FIELDS_LOGIC_RO2 = TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK] || (dataToCreate[_TASK_FIELDS_LOGIC_RO2] = null);
    if (related) {
      if (related !== null && related !== void 0 && related.includes('Lead')) {
        var _companyContext$id;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.LEAD] = related;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.COMPANY] = companyContext === null || companyContext === void 0 ? void 0 : (_companyContext$id = companyContext.id) === null || _companyContext$id === void 0 ? void 0 : _companyContext$id.value;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = null;
      } else if (related !== null && related !== void 0 && related.includes('Company')) {
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.COMPANY] = related;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.LEAD] = null;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = null;
      } else if (related !== null && related !== void 0 && related.includes('Opportunity')) {
        var _companyContext$id2;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = related;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.COMPANY] = companyContext === null || companyContext === void 0 ? void 0 : (_companyContext$id2 = companyContext.id) === null || _companyContext$id2 === void 0 ? void 0 : _companyContext$id2.value;
        dataToCreate[TASK_FIELDS_LOGIC_ROLE.LEAD] = null;
      }
    }
    if (!isEditionModal) {
      api.post("/bobjects/".concat(accountId, "/Task"), {
        contents: _objectSpread$1({}, dataToCreate),
        params: {}
      }).then(function () {
        setIsSubmitting(false);
        createToast({
          message: t('toasts.success'),
          type: 'success'
        });
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_ADD_TASK_FROM_NEW_TASK_MODAL);
        handleSave();
        closeModal();
      })["catch"](function () {
        setIsSubmitting(false);
      });
      if (isWebapp) {
        setAddToCalendarState({
          dateTime: (dataToCreate === null || dataToCreate === void 0 ? void 0 : dataToCreate[TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]) || new Date(),
          title: dataToCreate === null || dataToCreate === void 0 ? void 0 : dataToCreate[TASK_FIELDS_LOGIC_ROLE.TITLE],
          leadId: dataToCreate === null || dataToCreate === void 0 ? void 0 : dataToCreate[TASK_FIELDS_LOGIC_ROLE.LEAD],
          companyId: dataToCreate === null || dataToCreate === void 0 ? void 0 : dataToCreate[TASK_FIELDS_LOGIC_ROLE.COMPANY],
          bobjectType: related === null || related === void 0 ? void 0 : related.split('/')[1]
        });
        openAddToCalendarModal();
      }
    } else {
      api.patch("/bobjects/".concat(bobjectId, "/raw"), {
        contents: _objectSpread$1({}, dataToCreate),
        params: {}
      }).then(function () {
        var remindersKey = REMINDERS_KEY(accountId);
        var storedReminders = localStorage.getItem(remindersKey);
        if (storedReminders && Object.keys(JSON.parse(storedReminders)).includes(bobjectId)) {
          setEditedReminder(bobjectId);
        }
        setIsSubmitting(false);
        createToast({
          message: t('toasts.updateSuccess'),
          type: 'success'
        });
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_UPDATE_TASK_FROM_NEW_TASK_MODAL);
        handleSave();
        closeModal();
      })["catch"](function () {
        setIsSubmitting(false);
      });
    }
  };
  var _useConfirmDeleteModa = useConfirmDeleteModal(),
    openDeleteModal = _useConfirmDeleteModa.openDeleteModal;
  function handleDelete() {
    openDeleteModal(taskBobject, false, function () {}, function () {
      createToast({
        message: t('toasts.deleteSuccess'),
        type: 'success'
      });
      handleSave();
      closeModal();
    });
  }
  return {
    isEditionModal: isEditionModal,
    taskId: bobjectId,
    title: title,
    titleOnChange: titleOnChange,
    actionType: actionType,
    actionTypeOnChange: actionTypeOnChange,
    forceOpened: otherData === null || otherData === void 0 ? void 0 : otherData.forceOpened,
    priority: priority,
    priorityOnChange: function priorityOnChange(value) {
      _priorityOnChange(value);
      if (!has(ExtensionHelperKeys.CREATE_TASKS_TOOLTIP)) {
        saveCustom({
          key: ExtensionHelperKeys.CREATE_TASKS_TOOLTIP,
          data: new Date().toISOString()
        });
      }
    },
    taskDate: taskDate,
    taskDateOnChange: taskDateOnChange,
    datePickerVisible: datePickerVisible,
    datePickerRef: datePickerRef,
    setDatePickerVisible: setDatePickerVisible,
    assignedToId: assignedToId,
    setAssignedToId: setAssignedToId,
    relatedOnChange: relatedOnChange,
    nameSelected: nameSelected,
    setNameSelected: setNameSelected,
    formMethods: {
      isSubmitting: isSubmitting,
      isDirty: isDirty,
      handleSubmit: handleSubmit,
      getValues: getValues
    },
    onSubmit: onSubmit,
    handleDelete: handleDelete,
    handleMinimize: function handleMinimize() {
      return minimize({
        title: "".concat(t('newTask'), " ").concat(nameSelected || ''),
        data: _objectSpread$1(_objectSpread$1({}, getValues()), {}, _defineProperty$1(_defineProperty$1({}, TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO, assignedToId), "relatedName", nameSelected)),
        bobject: bobject
      });
    },
    defaultName: defaultName,
    defaultRelated: defaultRelated,
    defaultValues: defaultValues,
    closeModal: closeModal,
    handleClose: handleClose
  };
};

var css_248z$1 = ".taskFeedErrorPage-module_wrapper__PbK7e {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n  margin-top: 24px;\n  padding: 0 8px;\n}\n";
var styles$1 = {"wrapper":"taskFeedErrorPage-module_wrapper__PbK7e"};
styleInject(css_248z$1);

var TaskFeedErrorPage = function TaskFeedErrorPage(_ref) {
  var onClick = _ref.onClick;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'taskFeedErrorPage'
    }),
    t = _useTranslation.t,
    i18n = _useTranslation.i18n;
  return /*#__PURE__*/jsxs("div", {
    className: styles$1.wrapper,
    children: [/*#__PURE__*/jsx(Icon, {
      name: "taskAction",
      size: 36,
      color: "softPeanut"
    }), /*#__PURE__*/jsx(Text, {
      size: "l",
      color: "peanut",
      align: "center",
      children: t('title')
    }), /*#__PURE__*/jsx(Text, {
      size: "m",
      color: "softPeanut",
      align: "center",
      children: t('subtitle')
    }), /*#__PURE__*/jsx(Button, {
      onClick: onClick,
      variant: "secondary",
      size: "small",
      children: t('reloadButton')
    }), /*#__PURE__*/jsx(Text, {
      size: "s",
      color: "softPeanut",
      align: "center",
      children: /*#__PURE__*/jsx(Trans, {
        i18nKey: "taskFeedErrorPage.linkText",
        components: [/*#__PURE__*/jsx("a", {
          href: i18n.language === 'en' ? 'https://support.bloobirds.com/hc/es-us/requests/new' : 'https://support.bloobirds.com/hc/es-es/requests/new',
          target: "_blank",
          rel: "noreferrer"
        }, "0")]
      })
    })]
  });
};

var css_248z = ".taskStaticModal-module_container__KGmLv {\n    padding: 18px 8px;\n    background-color: var(--white);\n}\n";
var styles = {"container":"taskStaticModal-module_container__KGmLv"};
styleInject(css_248z);

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var TaskStaticModal = function TaskStaticModal(_ref) {
  var id = _ref.id;
  var taskFormHookValues = useTaskForm(id);
  var _ref2 = taskFormHookValues || {},
    isEditionModal = _ref2.isEditionModal,
    handleMinimize = _ref2.handleMinimize,
    handleClose = _ref2.handleClose;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs(Modal, {
    open: true,
    onClose: handleClose,
    width: 460,
    children: [/*#__PURE__*/jsxs(ModalHeader, {
      size: "small",
      children: [/*#__PURE__*/jsxs(ModalTitle, {
        size: "small",
        icon: "checkDouble",
        children: [isEditionModal ? t('common.edit') : t('common.create'), " ", t('bobjectTypes.task')]
      }), /*#__PURE__*/jsxs("div", {
        children: [/*#__PURE__*/jsx(IconButton, {
          name: "minus",
          size: 24,
          onClick: function onClick() {
            // @ts-ignore
            handleMinimize();
          }
        }), /*#__PURE__*/jsx(ModalCloseIcon, {
          onClick: handleClose,
          size: "small"
        })]
      })]
    }), /*#__PURE__*/jsx("div", {
      className: styles.container,
      children: /*#__PURE__*/jsx(TaskForm, _objectSpread({
        isWebapp: true,
        modalId: id
      }, taskFormHookValues))
    })]
  });
};

export { PrioritySelector, TaskFeedErrorPage, TaskForm, TaskStaticModal, TaskTypeSelector, useTaskForm };
//# sourceMappingURL=index.js.map
