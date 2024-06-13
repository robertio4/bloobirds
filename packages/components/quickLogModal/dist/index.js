import { useEffect } from 'react';
import { useForm, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useConfirmDeleteModal, FormField } from '@bloobirds-it/bobjects';
import { Modal, ModalHeader, Icon, IconButton, ModalFooter, Button, Select, Item } from '@bloobirds-it/flamingo-ui';
import { useDataModel, useQuickLogActivity } from '@bloobirds-it/hooks';
import { ACTIVITY_FIELDS_LOGIC_ROLE, BobjectTypes, MIXPANEL_EVENTS, LEAD_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { getFieldByLogicRole, getTextFromLogicRole, removeScrollOfBox, recoverScrollOfBox } from '@bloobirds-it/utils';
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

var css_248z = ".quickLogModal-module_modal__uVxqd {\n  background-color: var(--white);\n}\n\n.quickLogModal-module_header__GqrED {\n  padding: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.quickLogModal-module_content__3hNnA {\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  max-height: 580px;\n  overflow-y: scroll;\n}\n\n.quickLogModal-module_content__3hNnA input {\n  margin: 0 !important;\n  box-shadow: none !important;\n  height: 32px;\n  border: none !important;\n  width: 100%;\n  padding: 0px;\n}\n\n.quickLogModal-module_content__3hNnA span {\n  top: auto;\n}\n\n.quickLogModal-module_datePicker__BWh2K {\n  padding-bottom: 8px;\n}\n\n.quickLogModal-module_textArea__zApB- {\n  padding-top: 8px;\n}\n\n.quickLogModal-module_customButton__tbawy {\n  margin-top: 8px;\n  justify-content: center;\n}\n\n.quickLogModal-module_title__UquAA {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 8px;\n}\n\n.quickLogModal-module_footer_buttons__DVQru {\n  display: flex;\n  width: 100%;\n  justify-content: space-between;\n}\n\n.quickLogModal-module_delete_content__Pbg-9 {\n  margin-bottom: 32px;\n}\n\n.quickLogModal-module_delete_content__Pbg-9 > p:first-child {\n  margin-bottom: 8px;\n}\n";
var styles = {"modal":"quickLogModal-module_modal__uVxqd","header":"quickLogModal-module_header__GqrED","content":"quickLogModal-module_content__3hNnA","datePicker":"quickLogModal-module_datePicker__BWh2K","textArea":"quickLogModal-module_textArea__zApB-","customButton":"quickLogModal-module_customButton__tbawy","title":"quickLogModal-module_title__UquAA","footer_buttons":"quickLogModal-module_footer_buttons__DVQru","delete_content":"quickLogModal-module_delete_content__Pbg-9"};
styleInject(css_248z);

var _excluded = ["isOpen"];
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var LeadSelector = function LeadSelector(_ref) {
  var control = _ref.control,
    leadFieldId = _ref.leadFieldId,
    leads = _ref.leads,
    required = _ref.required;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'quickLogModal.leadSelector'
    }),
    t = _useTranslation.t;
  var _useController = useController({
      control: control,
      name: "fields.".concat(leadFieldId),
      rules: {
        required: {
          value: required,
          message: t('required')
        }
      }
    }),
    _useController$field = _useController.field,
    value = _useController$field.value,
    onChange = _useController$field.onChange,
    error = _useController.fieldState.error;
  return /*#__PURE__*/jsxs(Select, {
    placeholder: t('placeholder', {
      required: required ? ' *' : ''
    }),
    width: "100%",
    value: value,
    onChange: onChange,
    error: error === null || error === void 0 ? void 0 : error.message,
    children: [!required && /*#__PURE__*/jsx(Item, {
      value: "",
      children: /*#__PURE__*/jsx("em", {
        children: t('none')
      })
    }), leads === null || leads === void 0 ? void 0 : leads.map(function (lead, idx) {
      return /*#__PURE__*/jsx(Item, {
        value: lead === null || lead === void 0 ? void 0 : lead.id.value,
        children:
        // @ts-ignore
        (lead === null || lead === void 0 ? void 0 : lead.fullName) || getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME)
      }, (lead === null || lead === void 0 ? void 0 : lead.id.value) + '-' + idx);
    })]
  });
};
var QuickLogModalContent = function QuickLogModalContent(_ref2) {
  var _getFieldByLogicRole;
  var isOpen = _ref2.isOpen,
    modalData = _ref2.modalData,
    logCustomActivity = _ref2.logCustomActivity,
    editCustomActivity = _ref2.editCustomActivity,
    closeQuickLogModal = _ref2.closeQuickLogModal;
  var _ref3 = modalData || {},
    customTask = _ref3.customTask,
    leads = _ref3.leads,
    selectedBobject = _ref3.selectedBobject,
    activity = _ref3.activity,
    isEdition = _ref3.isEdition;
  var dataModel = useDataModel();
  var _useConfirmDeleteModa = useConfirmDeleteModal(),
    openDeleteModal = _useConfirmDeleteModa.openDeleteModal;
  var dateField = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.DATETIME);
  var leadField = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  var noteField = dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  var customActivityFields = customTask === null || customTask === void 0 ? void 0 : customTask.fields.map(function (field) {
    var _activity$raw, _activity$raw$content;
    return _defineProperty({}, field.bobjectFieldId, activity === null || activity === void 0 ? void 0 : (_activity$raw = activity.raw) === null || _activity$raw === void 0 ? void 0 : (_activity$raw$content = _activity$raw.contents) === null || _activity$raw$content === void 0 ? void 0 : _activity$raw$content[field.bobjectFieldId]);
  });
  var activityLead = (_getFieldByLogicRole = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.referencedBobject;
  var activityNote = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'quickLogModal'
    }),
    t = _useTranslation2.t;
  var _useForm = useForm({
      defaultValues: {
        fields: {}
      }
    }),
    control = _useForm.control,
    handleSubmit = _useForm.handleSubmit,
    isSubmitting = _useForm.formState.isSubmitting,
    setValue = _useForm.setValue,
    watch = _useForm.watch,
    reset = _useForm.reset;
  useEffect(function () {
    if (isOpen) {
      removeScrollOfBox();
    }
    if (!isOpen) {
      recoverScrollOfBox();
    }
    return function () {
      recoverScrollOfBox();
      reset();
    };
  }, [isOpen]);
  useEffect(function () {
    var _Object$keys3;
    var fields = watch('fields');
    var defaultFieldValues = fields;
    if (customActivityFields) {
      defaultFieldValues = _objectSpread(_objectSpread({}, defaultFieldValues), customActivityFields.reduce(function (acc, f) {
        var _Object$keys = Object.keys(f),
          _Object$keys2 = _slicedToArray(_Object$keys, 1),
          key = _Object$keys2[0];
        if ((fields === null || fields === void 0 ? void 0 : fields[key]) === undefined) {
          return _objectSpread(_objectSpread({}, acc), f);
        }
      }, defaultFieldValues));
    }
    if (dateField && fields[dateField.id] === undefined) {
      defaultFieldValues = _objectSpread(_objectSpread({}, defaultFieldValues), {}, _defineProperty({}, dateField.id, new Date()));
    }
    if (leadField && fields[leadField.id] === undefined) {
      var _selectedBobject$id;
      if (activityLead) {
        var _activityLead$id;
        defaultFieldValues = _objectSpread(_objectSpread({}, defaultFieldValues), {}, _defineProperty({}, leadField.id, activityLead === null || activityLead === void 0 ? void 0 : (_activityLead$id = activityLead.id) === null || _activityLead$id === void 0 ? void 0 : _activityLead$id.value));
      } else if (!activityLead && (selectedBobject === null || selectedBobject === void 0 ? void 0 : (_selectedBobject$id = selectedBobject.id) === null || _selectedBobject$id === void 0 ? void 0 : _selectedBobject$id.typeName) === BobjectTypes.Lead) {
        var _selectedBobject$id2;
        defaultFieldValues = _objectSpread(_objectSpread({}, defaultFieldValues), {}, _defineProperty({}, leadField.id, selectedBobject === null || selectedBobject === void 0 ? void 0 : (_selectedBobject$id2 = selectedBobject.id) === null || _selectedBobject$id2 === void 0 ? void 0 : _selectedBobject$id2.value));
      } else if (!activityLead && !selectedBobject && leadField !== null && leadField !== void 0 && leadField.required && (leads === null || leads === void 0 ? void 0 : leads.length) > 0) {
        var _leads$;
        defaultFieldValues = _objectSpread(_objectSpread({}, defaultFieldValues), {}, _defineProperty({}, leadField.id, (_leads$ = leads[0]) === null || _leads$ === void 0 ? void 0 : _leads$.id.value));
      }
    }
    if (noteField && fields[noteField.id] === undefined) {
      defaultFieldValues = _objectSpread(_objectSpread({}, defaultFieldValues), {}, _defineProperty({}, noteField.id, activityNote));
    }
    if (((_Object$keys3 = Object.keys(defaultFieldValues)) === null || _Object$keys3 === void 0 ? void 0 : _Object$keys3.length) !== 0) {
      setValue('fields', defaultFieldValues);
    }
  }, [dateField, leadField, selectedBobject, activityLead, noteField, customActivityFields === null || customActivityFields === void 0 ? void 0 : customActivityFields.length, leads]);
  var fields = dataModel && customTask ? customTask === null || customTask === void 0 ? void 0 : customTask.fields.map(function (f) {
    return _objectSpread(_objectSpread({}, dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldById(f.bobjectFieldId)), {}, {
      required: f.required
    });
  }).sort(function (f1, f2) {
    return f2.ordering - f1.ordering;
  }) : [];
  var finalFields = [_objectSpread(_objectSpread({}, dateField), {}, {
    required: true
  })].concat(_toConsumableArray(fields), [noteField]).filter(function (f) {
    return f === null || f === void 0 ? void 0 : f.isEnabled;
  }).map(function (f) {
    return _objectSpread(_objectSpread({}, f), {}, {
      type: f === null || f === void 0 ? void 0 : f.fieldType
    });
  }).map(function (f) {
    if ((f === null || f === void 0 ? void 0 : f.fieldType) === 'PICKLIST' || (f === null || f === void 0 ? void 0 : f.fieldType) === 'MULTIPICKLIST') {
      return _objectSpread(_objectSpread({}, f), {}, {
        values: dataModel.findValuesByFieldId(f.id).map(function (v) {
          return _objectSpread(_objectSpread({}, v), {}, {
            enabled: v.isEnabled
          });
        })
      });
    }
    return f;
  });
  var submitForm = function submitForm(values) {
    if (!isEdition) {
      logCustomActivity(modalData, values === null || values === void 0 ? void 0 : values.fields, cleanAndClose, true);
    } else {
      editCustomActivity(activity, modalData, values === null || values === void 0 ? void 0 : values.fields, cleanAndClose);
    }
  };
  var cleanAndClose = function cleanAndClose() {
    reset();
    setValue('fields', {});
    closeQuickLogModal();
  };
  var handleDelete = function handleDelete() {
    openDeleteModal(activity, false, function () {}, function () {
      var _modalData$onSubmit;
      modalData === null || modalData === void 0 ? void 0 : (_modalData$onSubmit = modalData.onSubmit) === null || _modalData$onSubmit === void 0 ? void 0 : _modalData$onSubmit.call(modalData);
      closeQuickLogModal === null || closeQuickLogModal === void 0 ? void 0 : closeQuickLogModal();
    });
  };
  return /*#__PURE__*/jsxs(Modal, {
    className: styles.modal,
    open: true,
    onClose: cleanAndClose,
    width: 342,
    children: [/*#__PURE__*/jsxs(ModalHeader, {
      className: styles.header,
      children: [/*#__PURE__*/jsxs("div", {
        className: styles.title,
        children: [/*#__PURE__*/jsx(Icon, {
          name: customTask === null || customTask === void 0 ? void 0 : customTask.icon,
          size: 24,
          color: "peanut"
        }), isEdition ? t('editTitle', {
          customTask: customTask === null || customTask === void 0 ? void 0 : customTask.name
        }) : t('logTitle', {
          customTask: customTask === null || customTask === void 0 ? void 0 : customTask.name
        })]
      }), /*#__PURE__*/jsx(IconButton, {
        name: "cross",
        color: "bloobirds",
        size: 24,
        onClick: cleanAndClose
      })]
    }), /*#__PURE__*/jsxs("form", {
      onSubmit: handleSubmit(submitForm),
      children: [/*#__PURE__*/jsxs("main", {
        className: styles.content,
        children: [/*#__PURE__*/jsx(LeadSelector, {
          control: control,
          leadFieldId: leadField === null || leadField === void 0 ? void 0 : leadField.id,
          leads: leads,
          required: leadField === null || leadField === void 0 ? void 0 : leadField.required
        }), finalFields.map(function (field, idx) {
          return /*#__PURE__*/jsx("div", {
            children: /*#__PURE__*/jsx(FormField, _objectSpread(_objectSpread({
              control: control
            }, field), {}, {
              size: "medium"
            }))
          }, field.id + '-' + idx);
        })]
      }), /*#__PURE__*/jsx(ModalFooter, {
        children: /*#__PURE__*/jsxs("div", {
          className: styles.footer_buttons,
          children: [/*#__PURE__*/jsx(Button, {
            size: "small",
            uppercase: false,
            variant: "clear",
            color: "tomato",
            onClick: isEdition ? function () {
              handleDelete();
              mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_DELETE_CUSTOM_ACTIVITY);
            } : cleanAndClose,
            children: isEdition ? t('delete') : t('cancel')
          }), /*#__PURE__*/jsx(Button, {
            size: "small",
            uppercase: false,
            type: "submit",
            disabled: isSubmitting,
            children: isEdition ? t('save') : t('create')
          })]
        })
      })]
    })]
  });
};
var QuickLogModal = function QuickLogModal() {
  var _useQuickLogActivity = useQuickLogActivity(),
    isOpen = _useQuickLogActivity.isOpen,
    rest = _objectWithoutProperties(_useQuickLogActivity, _excluded);
  return isOpen ? /*#__PURE__*/jsx(QuickLogModalContent, _objectSpread({
    isOpen: isOpen
  }, rest)) : /*#__PURE__*/jsx(Fragment, {});
};

export { QuickLogModal, QuickLogModalContent };
//# sourceMappingURL=index.js.map
