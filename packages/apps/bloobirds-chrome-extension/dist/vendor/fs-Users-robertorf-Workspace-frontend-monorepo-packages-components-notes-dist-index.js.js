import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-notes-dist-index.js.js");import RefreshRuntime from "/vendor/react-refresh.js";let prevRefreshReg;let prevRefreshSig;if (import.meta.hot) {  if (!window.__vite_plugin_react_preamble_installed__) {    throw new Error(      "@vitejs/plugin-react can't detect preamble. Something is wrong. " +      "See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201"    );  }  prevRefreshReg = window.$RefreshReg$;  prevRefreshSig = window.$RefreshSig$;  window.$RefreshReg$ = (type, id) => {    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/notes/dist/index.js" + " " + id)  };  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;}var _s2 = $RefreshSig$(),
  _s3 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useState = __vite__cjsImport2_react["useState"]; const useRef = __vite__cjsImport2_react["useRef"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"];
import { useTranslation } from '/vendor/.vite-deps-react-i18next.js__v--8418bf92.js';
import { useToasts, Icon, Text, Spinner, IconButton, Button } from '/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js';
import { BobjectTypes, COMPANY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, OPPORTUNITY_FIELDS_LOGIC_ROLE, BOBJECT_TYPES, ACTIVITY_TYPES_VALUES_LOGIC_ROLE, ACTIVITY_FIELDS_LOGIC_ROLE, ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js';
import { getTextFromLogicRole, isHtml, createParagraph, api, getFieldByLogicRole } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js';
import { useForm, useController } from '/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js';
import { BobjectSelector } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-dist-index.js.js';
import { CopilotSummary } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-copilot-dist-index.js.js';
import { useDebouncedCallback, useCopilotEnabled } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js';
import { useRichTextEditorPlugins, deserialize, RichTextEditor, EditorToolbar, EditorToolbarControlsSection, EditorToolbarFontStylesSection, EditorToolbarTextMarksSection, EditorToolbarListsSection, serialize } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js';
import { removeNodes, insertNodes } from '/vendor/.vite-deps-@udecode_plate.js__v--feffb7cb.js';
import clsx from '/vendor/.vite-deps-clsx.js__v--07c00239.js';
import useSWR from '/vendor/.vite-deps-swr.js__v--ed0a962e.js';
import { jsx, jsxs, Fragment } from '/vendor/id-__x00__react-jsx-runtime.js';
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
var css_248z$1 = ".noteForm-module_container__IRQ4W {\n  display: flex;\n  flex-direction: column;\n  height: 96%;\n  box-sizing: border-box;\n}\n\n.noteForm-module_detail_content_container__A1ZA5 {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n\n.noteForm-module_body_wrapper__NOq0U {\n  height: 315px;\n  overflow-y: auto;\n}\n\n.noteForm-module_body_wrapper__NOq0U > div > div ul {\n  padding-left: 24px !important;\n}\n\n.noteForm-module_body_wrapper__NOq0U > div > div ol {\n  padding-left: 24px !important;\n}\n\n.noteForm-module_bottom_bar__5tJ0y {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px;\n}\n\n.noteForm-module_bottom_bar_alternative__Z-RjP {\n  padding: 12px 0;\n}\n\n.noteForm-module_text__2gJRV {\n  margin-left: 4px;\n}\n\n.noteForm-module_record_related__petZE {\n  display: flex;\n  align-items: center;\n}\n\n.noteForm-module_editor__AyVW1 {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  overflow-y: auto;\n  overflow-x: hidden;\n  max-height: 326px;\n}\n\n.noteForm-module_divider__rbNXe {\n  width: 90%;\n  text-align: center;\n  border-top: 1px solid var(--verySoftPeanut);\n  align-self: center;\n}\n\n.noteForm-module_bobject_selector__JW7yV {\n  margin-left: 8px;\n}\n\n.noteForm-module_toolbar__okaYD {\n  border-top: 1px solid var(--verySoftPeanut);\n  border-bottom: 1px solid var(--verySoftPeanut);\n}\n\n.noteForm-module_title_container__ZzDnu {\n  display: flex;\n  width: 90%;\n  align-self: center;\n  align-items: center;\n}\n\n.noteForm-module_title__ARC2p {\n  padding: 4px 12px;\n}\n\n.noteForm-module_mainNote__SCdi3 {\n  margin-right: 4px;\n}\n\n.noteForm-module_noteIcon__jLWox {\n  width: 24px;\n  min-width: 24px;\n  height: 22px;\n  justify-content: center;\n  align-items: center;\n  display: flex;\n  border-radius: 16px;\n  background-color: var(--banana);\n}\n\n.noteForm-module_fullHeight__6gRqb {\n  height: calc(100% - 38px);\n}\n\n.noteForm-module_fullHeight__6gRqb .noteForm-module_editor__AyVW1 {\n  height: 100%;\n  max-height: 100%;\n}\n\n.noteForm-module_fullHeight__6gRqb .noteForm-module_body_wrapper__NOq0U {\n  height: auto;\n  flex-grow: 1;\n  width: 100%;\n  max-width: 100%;\n  overflow-x: hidden;\n}\n\n.noteForm-module_fullHeight__6gRqb .noteForm-module_toolbar__okaYD {\n  border-bottom: none;\n}\n\n.noteForm-module_fullHeight__6gRqb .noteForm-module_divider__rbNXe {\n  width: 96%;\n}\n\n.noteForm-module_fullHeight__6gRqb .noteForm-module_title_container__ZzDnu {\n  height: 40px;\n  width: 96%;\n}\n\n.noteForm-module_isSavingContainer__UZkM3 {\n  display: flex;\n  position: absolute;\n  right: 16px;\n  gap: 4px;\n  background-color: white;\n  align-items: center;\n}\n\n";
var styles$1 = {
  "container": "noteForm-module_container__IRQ4W",
  "detail_content_container": "noteForm-module_detail_content_container__A1ZA5",
  "body_wrapper": "noteForm-module_body_wrapper__NOq0U",
  "bottom_bar": "noteForm-module_bottom_bar__5tJ0y",
  "bottom_bar_alternative": "noteForm-module_bottom_bar_alternative__Z-RjP",
  "text": "noteForm-module_text__2gJRV",
  "record_related": "noteForm-module_record_related__petZE",
  "editor": "noteForm-module_editor__AyVW1",
  "divider": "noteForm-module_divider__rbNXe",
  "bobject_selector": "noteForm-module_bobject_selector__JW7yV",
  "toolbar": "noteForm-module_toolbar__okaYD",
  "title_container": "noteForm-module_title_container__ZzDnu",
  "title": "noteForm-module_title__ARC2p",
  "mainNote": "noteForm-module_mainNote__SCdi3",
  "noteIcon": "noteForm-module_noteIcon__jLWox",
  "fullHeight": "noteForm-module_fullHeight__6gRqb",
  "isSavingContainer": "noteForm-module_isSavingContainer__UZkM3"
};
styleInject(css_248z$1);
function onBobjectChange(bobject, relatedOnChange, setNameSelected) {
  var _bobject$rawBobject;
  relatedOnChange(bobject === null || bobject === void 0 ? void 0 : (_bobject$rawBobject = bobject.rawBobject) === null || _bobject$rawBobject === void 0 ? void 0 : _bobject$rawBobject.id);
  if ((bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType) === BobjectTypes.Company) {
    setNameSelected((bobject === null || bobject === void 0 ? void 0 : bobject.companyName) || getTextFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.NAME));
  } else if ((bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType) === BobjectTypes.Lead) {
    setNameSelected((bobject === null || bobject === void 0 ? void 0 : bobject.fullName) || getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME));
  } else if ((bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType) === BobjectTypes.Opportunity) {
    setNameSelected((bobject === null || bobject === void 0 ? void 0 : bobject.name) || getTextFromLogicRole(bobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME));
  }
}
var _excluded = ["related"];
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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
var mainNoteField = _defineProperty(_defineProperty(_defineProperty({}, BOBJECT_TYPES.COMPANY, [COMPANY_FIELDS_LOGIC_ROLE.MAIN_NOTE]), BOBJECT_TYPES.LEAD, [LEAD_FIELDS_LOGIC_ROLE.MAIN_NOTE]), BOBJECT_TYPES.OPPORTUNITY, [OPPORTUNITY_FIELDS_LOGIC_ROLE.MAIN_NOTE]);
var defaultNewNoteValueTitle = function defaultNewNoteValueTitle(t) {
  return [{
    type: 'h2',
    children: [{
      text: t('newNote')
    }]
  }];
};
var NoteForm = function NoteForm(props) {
  _s2();
  var activityId = props.activityId,
    noteTitle = props.title,
    noteContent = props.content,
    noteMainNoteValue = props.mainNote,
    related = props.related,
    relatedName = props.relatedName,
    accountId = props.accountId,
    onSave = props.onSave,
    bodyPlaceholder = props.bodyPlaceholder,
    activityType = props.activityType,
    alternativeFooter = props.alternativeFooter,
    _props$showFooter = props.showFooter,
    showFooter = _props$showFooter === void 0 ? true : _props$showFooter,
    fitAllHeight = props.fitAllHeight,
    setIsLoading = props.setIsLoading,
    copilotAnalysis = props.copilotAnalysis;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'notes'
    }),
    t = _useTranslation.t;
  var _useForm = useForm(),
    control = _useForm.control,
    getValues = _useForm.getValues,
    handleSubmit = _useForm.handleSubmit,
    watch = _useForm.watch;
  var _useState = useState(relatedName),
    _useState2 = _slicedToArray$1(_useState, 2),
    nameSelected = _useState2[0],
    setNameSelected = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$1(_useState3, 2),
    hasChanges = _useState4[0],
    setHasChanges = _useState4[1];
  var isEditionModal = useRef(!!activityId);
  var isNote = activityType !== ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING && activityType !== ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL;
  var isCall = activityType === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL;
  var isMeeting = activityType === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING;
  var isAnActivityFieldNote = isMeeting || isCall;
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var _useState5 = useState(),
    _useState6 = _slicedToArray$1(_useState5, 2),
    isSubmitting = _useState6[0],
    setIsSubmitting = _useState6[1];
  useEffect(function () {
    if (setIsLoading) {
      setIsLoading(isSubmitting);
    }
  }, [isSubmitting]);
  var titlePlugins = useRichTextEditorPlugins({
    singleLine: true
  });
  var plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true
  });
  function getTitle() {
    if (isHtml(noteTitle)) {
      if (noteTitle && typeof noteTitle === 'string') {
        return deserialize(noteTitle, {
          format: 'HTML',
          plugins: titlePlugins
        });
      } else {
        return defaultNewNoteValueTitle(t);
      }
    } else {
      if (noteTitle && typeof noteTitle === 'string') {
        return !isNote ? noteTitle : createParagraph(noteTitle);
      } else {
        return defaultNewNoteValueTitle(t);
      }
    }
  }
  var defaultValues = {
    title: getTitle(),
    body: noteContent && typeof noteContent === 'string' ? isHtml(noteContent) ? deserialize(noteContent, {
      format: 'HTML',
      plugins: plugins
    }) : createParagraph(noteContent) : null,
    mainNote: noteMainNoteValue === 'Main note Yes'
  };
  var _useController = useController({
      control: control,
      name: ACTIVITY_FIELDS_LOGIC_ROLE.TITLE,
      defaultValue: defaultValues.title
    }),
    _useController$field = _useController.field,
    title = _useController$field.value,
    titleOnChange = _useController$field.onChange;
  var _useController2 = useController({
      control: control,
      name: ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE,
      defaultValue: defaultValues.mainNote
    }),
    _useController2$field = _useController2.field,
    mainNote = _useController2$field.value,
    mainNoteOnChange = _useController2$field.onChange;
  var _useController3 = useController({
      control: control,
      name: ACTIVITY_FIELDS_LOGIC_ROLE.NOTE,
      defaultValue: defaultValues.body
    }),
    _useController3$field = _useController3.field,
    note = _useController3$field.value,
    noteOnChange = _useController3$field.onChange;
  var _useController4 = useController({
      control: control,
      name: 'related',
      defaultValue: related
    }),
    relatedOnChange = _useController4.field.onChange;
  var titleValue = watch(ACTIVITY_FIELDS_LOGIC_ROLE.TITLE);
  var noteValue = watch(ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  useEffect(function () {
    if (!hasChanges && (titleValue || noteValue)) {
      if (JSON.stringify(defaultValues.title) !== JSON.stringify(titleValue) || JSON.stringify(defaultValues.body) !== JSON.stringify(noteValue)) {
        setHasChanges(true);
      }
    }
  }, [titleValue, noteValue]);
  var onSubmit = function onSubmit() {
    setIsSubmitting(true);
    var _getValues = getValues(),
      related = _getValues.related,
      rest = _objectWithoutProperties(_getValues, _excluded);
    var isMainNote = rest[ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE];
    var dataToCreate = _defineProperty({}, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE, rest[ACTIVITY_FIELDS_LOGIC_ROLE.NOTE] ? serialize(rest[ACTIVITY_FIELDS_LOGIC_ROLE.NOTE], {
      format: 'AST',
      plugins: plugins
    }) : null);
    if (isNote) {
      dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.TITLE] = rest[ACTIVITY_FIELDS_LOGIC_ROLE.TITLE] ? serialize(rest[ACTIVITY_FIELDS_LOGIC_ROLE.TITLE], {
        format: 'AST',
        plugins: plugins
      }) : null;
      dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE] = isMainNote ? ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE.YES : ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE.NO;
      dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.TYPE] = ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE;
    }
    var relatedBobjectType;
    if (related && isNote) {
      if (related !== null && related !== void 0 && related.includes('Lead')) {
        relatedBobjectType = BOBJECT_TYPES.LEAD;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.LEAD] = related;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY] = null;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY] = null;
      } else if (related !== null && related !== void 0 && related.includes('Company')) {
        relatedBobjectType = BOBJECT_TYPES.COMPANY;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY] = related;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.LEAD] = null;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY] = null;
      } else if (related !== null && related !== void 0 && related.includes('Opportunity')) {
        relatedBobjectType = BOBJECT_TYPES.OPPORTUNITY;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY] = related;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY] = null;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.LEAD] = null;
      }
    }
    var params = {
      duplicateValidation: true
    };
    if (!isEditionModal.current) {
      api.post("/bobjects/".concat(accountId, "/Activity"), {
        contents: _objectSpread({}, dataToCreate),
        params: params
      }).then(function (activityCreated) {
        var _activityCreated$data2;
        setIsSubmitting(false);
        //createToast({ message: 'Note created successfully', type: 'success' });
        if (isMainNote && related && relatedBobjectType && activityCreated !== null && activityCreated !== void 0 && activityCreated.data) {
          var _activityCreated$data;
          api.patch("/bobjects/".concat(related, "/raw"), {
            contents: _defineProperty({}, mainNoteField[relatedBobjectType], [activityCreated === null || activityCreated === void 0 ? void 0 : (_activityCreated$data = activityCreated.data) === null || _activityCreated$data === void 0 ? void 0 : _activityCreated$data.value]),
            params: params
          });
        } else if (!isMainNote && related && relatedBobjectType) {
          api.patch("/bobjects/".concat(related, "/raw"), {
            contents: _defineProperty({}, mainNoteField[relatedBobjectType], null),
            params: params
          });
        }
        onSave === null || onSave === void 0 ? void 0 : onSave(activityCreated === null || activityCreated === void 0 ? void 0 : (_activityCreated$data2 = activityCreated.data) === null || _activityCreated$data2 === void 0 ? void 0 : _activityCreated$data2.value);
      })["catch"](function () {
        setIsSubmitting(false);
        createToast({
          message: t('toasts.errorCreating'),
          type: 'error'
        });
      });
    } else {
      api.patch("/bobjects/".concat(activityId === null || activityId === void 0 ? void 0 : activityId.value, "/raw"), {
        contents: dataToCreate,
        params: {}
      }).then(function () {
        setIsSubmitting(false);
        //createToast({ message: 'Note updated successfully.', type: 'success' });
        if (isMainNote && related && relatedBobjectType) {
          api.patch("/bobjects/".concat(related, "/raw"), {
            contents: _defineProperty({}, mainNoteField[relatedBobjectType], [activityId === null || activityId === void 0 ? void 0 : activityId.value])
          });
        } else if (!isMainNote && related && relatedBobjectType) {
          api.patch("/bobjects/".concat(related, "/raw"), {
            contents: _defineProperty({}, mainNoteField[relatedBobjectType], null)
          });
        }
        onSave === null || onSave === void 0 ? void 0 : onSave(activityId === null || activityId === void 0 ? void 0 : activityId.value);
      })["catch"](function () {
        setIsSubmitting(false);
        createToast({
          message: t('toasts.errorUpdating'),
          type: 'error'
        });
      });
    }
  };
  var saveNote = useDebouncedCallback(function () {
    onSubmit();
    isEditionModal.current = true;
  }, 500, [onSubmit]);
  useEffect(function () {
    if (hasChanges) {
      saveNote();
    }
  }, [JSON.stringify(noteValue)]);
  var alternativeFooterComponent = alternativeFooter ? /*#__PURE__*/React.cloneElement(alternativeFooter, {
    onSubmit: handleSubmit(onSubmit)
  }) : null;
  var containerClass = clsx(styles$1.container, _defineProperty({}, styles$1.fullHeight, fitAllHeight));
  function getBackgroundColor() {
    if (isMeeting) return 'var(--lightestMeeting)';
    if (isCall) return 'var(--lightestCall)';
    return 'var(--banana)';
  }
  var isCopilotEnabled = useCopilotEnabled(accountId);
  var hasAi = !!copilotAnalysis;
  var _useSWR = useSWR(hasAi && "/copilot/transcript/insights/".concat(activityId.objectId), function (key) {
      return api.get(key).then(function (res) {
        return res.data;
      });
    }),
    activityInsights = _useSWR.data;
  var copyToNote = function copyToNote(value) {
    if (noteValue.length === 1 && noteValue[0].children[0].text === '') {
      var _createParagraph;
      removeNodes(bodyEditor, {
        at: [0]
      });
      insertNodes(bodyEditor, (_createParagraph = createParagraph(value)) === null || _createParagraph === void 0 ? void 0 : _createParagraph[0], {
        at: [0]
      });
    } else {
      removeNodes(bodyEditor, {
        at: [0]
      });
      insertNodes(bodyEditor, [].concat(_toConsumableArray(noteValue), _toConsumableArray(createParagraph('')), _toConsumableArray(createParagraph(value))), {
        at: [0]
      });
    }
  };
  var _useState7 = useState(null),
    _useState8 = _slicedToArray$1(_useState7, 2),
    bodyEditor = _useState8[0],
    setBodyEditor = _useState8[1];
  return /*#__PURE__*/jsx("div", {
    className: containerClass,
    children: /*#__PURE__*/jsxs("div", {
      className: styles$1.detail_content_container,
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$1.editor,
        children: [/*#__PURE__*/jsxs("span", {
          className: styles$1.title_container,
          children: [!isCall && /*#__PURE__*/jsxs("div", {
            className: styles$1.noteIcon,
            style: {
              backgroundColor: getBackgroundColor()
            },
            children: [isMeeting && /*#__PURE__*/jsx(Icon, {
              name: "calendar",
              color: "extraMeeting",
              size: 16
            }), isNote && /*#__PURE__*/jsx(Icon, {
              name: "noteAction",
              color: "peanut",
              size: 16
            })]
          }), isAnActivityFieldNote ? /*#__PURE__*/jsx(Text, {
            weight: "bold",
            className: styles$1.title,
            children: noteTitle
          }) : /*#__PURE__*/jsx(RichTextEditor, {
            id: 'note-detail-title',
            defaultValue: title,
            placeholder: t('titlePlaceholder'),
            plugins: titlePlugins,
            onChange: titleOnChange,
            style: {
              padding: '4px 12px'
            }
          }), isSubmitting && /*#__PURE__*/jsxs("div", {
            className: styles$1.isSavingContainer,
            children: [/*#__PURE__*/jsx(Spinner, {
              size: 11,
              name: "loadingCircle",
              color: "softPeanut"
            }), /*#__PURE__*/jsx(Text, {
              size: "xs",
              color: "softPeanut",
              children: t('saving')
            })]
          })]
        }), isCopilotEnabled && activityInsights && /*#__PURE__*/jsx(CopilotSummary, {
          summary: activityInsights.summary,
          activityId: activityId,
          buttonIcon: "arrowDown",
          copyToNote: copyToNote,
          isInPreview: true
        }), !isCopilotEnabled || !activityInsights && /*#__PURE__*/jsx("span", {
          className: styles$1.divider
        }), /*#__PURE__*/jsx(RichTextEditor, {
          id: 'note-detail-body',
          defaultValue: note,
          setEditor: setBodyEditor,
          plugins: plugins,
          placeholder: bodyPlaceholder || t('placeholder'),
          onChange: noteOnChange,
          style: {
            padding: '12px 28px 4px 28px'
          },
          children: function children(editor) {
            return /*#__PURE__*/jsxs(Fragment, {
              children: [/*#__PURE__*/jsx("div", {
                className: styles$1.body_wrapper,
                children: editor
              }), /*#__PURE__*/jsx("div", {
                className: styles$1.toolbar,
                children: /*#__PURE__*/jsxs(EditorToolbar, {
                  backgroundColor: "var(--peanut) !important",
                  children: [/*#__PURE__*/jsx(EditorToolbarControlsSection, {
                    color: "peanut"
                  }), /*#__PURE__*/jsx(EditorToolbarFontStylesSection, {
                    color: "peanut"
                  }), /*#__PURE__*/jsx(EditorToolbarTextMarksSection, {
                    color: "peanut"
                  }), /*#__PURE__*/jsx(EditorToolbarListsSection, {
                    color: "peanut"
                  })]
                })
              })]
            });
          }
        })]
      }), showFooter && /*#__PURE__*/jsx("div", {
        children: /*#__PURE__*/jsxs("div", {
          className: clsx(styles$1.bottom_bar, _defineProperty({}, styles$1.bottom_bar_alternative, !!alternativeFooter)),
          children: [/*#__PURE__*/jsx("span", {
            className: styles$1.record_related,
            children: isNote && /*#__PURE__*/jsx("div", {
              className: styles$1.bobject_selector,
              children: /*#__PURE__*/jsx(BobjectSelector, {
                accountId: accountId,
                selected: nameSelected,
                id: activityId === null || activityId === void 0 ? void 0 : activityId.value,
                onBobjectChange: function onBobjectChange$1(bobject) {
                  return onBobjectChange(bobject, relatedOnChange, setNameSelected);
                }
              })
            })
          }), alternativeFooter ? alternativeFooterComponent : /*#__PURE__*/jsxs("span", {
            children: [isNote && /*#__PURE__*/jsx(IconButton, {
              name: mainNote ? 'starChecked' : 'starUnchecked',
              onClick: function onClick() {
                mainNoteOnChange(!mainNote);
              },
              color: "bloobirds",
              size: 24,
              className: styles$1.mainNote
            }), /*#__PURE__*/jsx(Button, {
              size: "small",
              onClick: function onClick() {
                handleSubmit(onSubmit)();
              },
              disabled: isSubmitting || !hasChanges,
              children: isSubmitting ? /*#__PURE__*/jsx(Spinner, {
                name: "loadingCircle",
                size: 12
              }) : t('save')
            })]
          })]
        })
      })]
    })
  });
};
_s2(NoteForm, "rNmu+fzsXQzzmxf0kj7Ri2N29EM=", false, function () {
  return [useTranslation, useForm, useToasts, useRichTextEditorPlugins, useRichTextEditorPlugins, useController, useController, useController, useController, useDebouncedCallback, useCopilotEnabled, useSWR];
});
_c = NoteForm;
var css_248z = ".note-module_loading__g78-2 {\n  height: 430px;\n  width: 312px;\n}\n";
var styles = {
  "loading": "note-module_loading__g78-2"
};
styleInject(css_248z);
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
/**
 * This is the main note wrapper that will take the data and initialize the noteForm
 * You must send an activity if you want to be on edition mode.
 * @constructor
 */
var Note = function Note(props) {
  _s3();
  var _getFieldByLogicRole, _getFieldByLogicRole2, _getFieldByLogicRole3, _relatedLead$id, _relatedCompany$id, _relatedOpportunity$i, _getFieldByLogicRole4;
  var propsActivity = props.activity,
    title = props.title,
    content = props.content,
    mainNote = props.mainNote,
    defaultRelatedCompany = props.relatedCompany,
    defaultRelatedLead = props.relatedLead,
    defaultRelatedOpportunity = props.relatedOpportunity,
    bodyPlaceholder = props.bodyPlaceholder,
    accountId = props.accountId,
    onSave = props.onSave,
    alternativeFooter = props.alternativeFooter;
  var activity = useMemo(function () {
    return propsActivity;
  }, [propsActivity]);
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'notes'
    }),
    t = _useTranslation.t;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    unmountNote = _useState2[0],
    setUnmountNote = _useState2[1];
  var getTitle = function getTitle() {
    if (activityType === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL) {
      var direction = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
      return direction === 'Outgoing' ? t('outgoingCall') : t('incomingCall');
    } else {
      return getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TITLE);
    }
  };
  var noteContent = content || getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  var noteMainNoteValue = mainNote || getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE);
  var relatedCompany = !activity ? defaultRelatedCompany : (_getFieldByLogicRole = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.referencedBobject;
  var relatedCompanyName = getTextFromLogicRole(relatedCompany, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  var relatedLead = !activity ? defaultRelatedLead : (_getFieldByLogicRole2 = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)) === null || _getFieldByLogicRole2 === void 0 ? void 0 : _getFieldByLogicRole2.referencedBobject;
  var relatedLeadName = getTextFromLogicRole(relatedLead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  var relatedOpportunity = !activity ? defaultRelatedOpportunity : (_getFieldByLogicRole3 = getFieldByLogicRole(activity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME)) === null || _getFieldByLogicRole3 === void 0 ? void 0 : _getFieldByLogicRole3.referencedBobject;
  var relatedOpportunityName = getTextFromLogicRole(relatedOpportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME);
  var defaultRelated = relatedLead ? relatedLead === null || relatedLead === void 0 ? void 0 : (_relatedLead$id = relatedLead.id) === null || _relatedLead$id === void 0 ? void 0 : _relatedLead$id.value : relatedCompany ? relatedCompany === null || relatedCompany === void 0 ? void 0 : (_relatedCompany$id = relatedCompany.id) === null || _relatedCompany$id === void 0 ? void 0 : _relatedCompany$id.value : relatedOpportunity ? relatedOpportunity === null || relatedOpportunity === void 0 ? void 0 : (_relatedOpportunity$i = relatedOpportunity.id) === null || _relatedOpportunity$i === void 0 ? void 0 : _relatedOpportunity$i.value : null;
  var defaultName = relatedLead ?
  // @ts-ignore
  (relatedLead === null || relatedLead === void 0 ? void 0 : relatedLead.fullName) || relatedLeadName || t('untitledLead') : relatedCompany ?
  // @ts-ignore
  (relatedCompany === null || relatedCompany === void 0 ? void 0 : relatedCompany.name) || relatedCompanyName || t('untitledCompany') : relatedOpportunity ?
  // @ts-ignore
  (relatedOpportunity === null || relatedOpportunity === void 0 ? void 0 : relatedOpportunity.name) || relatedOpportunityName || t('untitledOpportunity') : null;
  useEffect(function () {
    setUnmountNote(true);
    setTimeout(function () {
      setUnmountNote(false);
    }, 1);
  }, [activity]);

  //Check if the activity is a meeting and if it has a note
  var activityType = (_getFieldByLogicRole4 = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)) === null || _getFieldByLogicRole4 === void 0 ? void 0 : _getFieldByLogicRole4.valueLogicRole;
  var noteTitle = title || getTitle();
  var copilotAnalysis = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COPILOT_ANALYSIS);
  return !unmountNote ? /*#__PURE__*/jsx(NoteForm, {
    activityType: activityType,
    accountId: accountId,
    title: noteTitle,
    content: noteContent,
    mainNote: noteMainNoteValue,
    activityId: activity === null || activity === void 0 ? void 0 : activity.id,
    related: defaultRelated,
    relatedName: defaultName,
    onSave: onSave,
    bodyPlaceholder: bodyPlaceholder,
    alternativeFooter: alternativeFooter,
    copilotAnalysis: copilotAnalysis
  }) : /*#__PURE__*/jsx("div", {
    className: styles.loading,
    children: /*#__PURE__*/jsx(Spinner, {
      name: "loadingCircle"
    })
  });
};
_s3(Note, "wEzYIsZ8eSvJKTt5fR+YZKfLazA=", false, function () {
  return [useTranslation];
});
_c2 = Note;
export { Note, NoteForm };
var _c, _c2;
$RefreshReg$(_c, "NoteForm");
$RefreshReg$(_c2, "Note");
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