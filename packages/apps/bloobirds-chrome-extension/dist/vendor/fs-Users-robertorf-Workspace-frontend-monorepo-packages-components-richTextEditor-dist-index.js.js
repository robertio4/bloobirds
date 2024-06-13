import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js");import RefreshRuntime from "/vendor/react-refresh.js";let prevRefreshReg;let prevRefreshSig;if (import.meta.hot) {  if (!window.__vite_plugin_react_preamble_installed__) {    throw new Error(      "@vitejs/plugin-react can't detect preamble. Something is wrong. " +      "See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201"    );  }  prevRefreshReg = window.$RefreshReg$;  prevRefreshSig = window.$RefreshSig$;  window.$RefreshReg$ = (type, id) => {    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/richTextEditor/dist/index.js" + " " + id)  };  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;}var _s2 = $RefreshSig$(),
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
  _s21 = $RefreshSig$(),
  _s22 = $RefreshSig$(),
  _s23 = $RefreshSig$(),
  _s24 = $RefreshSig$(),
  _s25 = $RefreshSig$(),
  _s26 = $RefreshSig$(),
  _s27 = $RefreshSig$(),
  _s28 = $RefreshSig$(),
  _s29 = $RefreshSig$(),
  _s30 = $RefreshSig$(),
  _s31 = $RefreshSig$(),
  _s32 = $RefreshSig$(),
  _s33 = $RefreshSig$(),
  _s34 = $RefreshSig$(),
  _s35 = $RefreshSig$(),
  _s36 = $RefreshSig$(),
  _s37 = $RefreshSig$(),
  _s38 = $RefreshSig$(),
  _s39 = $RefreshSig$(),
  _s40 = $RefreshSig$(),
  _s41 = $RefreshSig$(),
  _s42 = $RefreshSig$(),
  _s43 = $RefreshSig$(),
  _s44 = $RefreshSig$(),
  _s45 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useMemo = __vite__cjsImport2_react["useMemo"]; const useCallback = __vite__cjsImport2_react["useCallback"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"]; const useRef = __vite__cjsImport2_react["useRef"]; const Fragment$1 = __vite__cjsImport2_react["Fragment"]; const memo = __vite__cjsImport2_react["memo"];
import { useActiveUserId, useMeetingLinks, useBaseEmailVariableValue, useLocalStorage, useSignatures, useBaseEmailVariables, useUserSearch } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js';
import { unwrapList, getParentNode, isElement, isType, ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE, toggleList, createAutoformatPlugin, ELEMENT_H1, ELEMENT_H2, ELEMENT_LI, ELEMENT_UL, ELEMENT_OL, ELEMENT_BLOCKQUOTE, usePlateEditorRef, createPlugins, createComponentAs, createElementAs, useEditorRef, usePlateSelection, findNode, getPluginType, ELEMENT_LINK, Button, unwrapLink, focusEditor, ELEMENT_IMAGE, upsertLinkText, wrapLink, insertLink, floatingLinkSelectors, floatingLinkActions, useFloatingLinkSelectors, useVirtualFloatingLink, triggerFloatingLinkEdit, useFloatingLinkEscape, getPluginOptions as getPluginOptions$1, useHotkeys as useHotkeys$1, triggerFloatingLinkInsert, useOnClickOutside, getSelectionBoundingClientRect, useComposedRef as useComposedRef$1, FloatingLinkUrlInput, FloatingLinkTextInput, FloatingLinkNewTabInput, FloatingLinkEditButton, createBlockquotePlugin, createHeadingPlugin, createLinkPlugin, createListPlugin, createPluginFactory, ELEMENT_DEFAULT, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6, mapInjectPropsToPlugin, insertNodes as insertNodes$1, withoutNormalizing, removeNodes as removeNodes$1, moveSelection, insertText, deselect, getNodeEntry, ELEMENT_PARAGRAPH as ELEMENT_PARAGRAPH$1, isBlockAboveEmpty, isSelectionAtBlockStart, KEYS_HEADING, createExitBreakPlugin, createSelectOnBackspacePlugin, getPath, ELEMENT_LIC, isImageUrl, Media as Media$1, Box as Box$1, Link, Image as Image$1, select as select$1, useEventPlateId, usePlateEditorState, MARK_COLOR, getMark, setMarks, removeMark, ToolbarDropdown, DEFAULT_COLORS, DEFAULT_CUSTOM_COLORS, isMarkActive, toggleMark, MARK_FONT_SIZE, someNode as someNode$1, toggleNodeType, MARK_BOLD, MARK_ITALIC, MARK_UNDERLINE, isCollapsed, triggerFloatingLink, createPlateUI, withProps, StyledElement, BalloonToolbar, MarkToolbarButton as MarkToolbarButton$1, ToolbarButton as ToolbarButton$1, getNodeFragment, comboboxSelectors, getPlugin, getBlockAbove, withoutMergingHistory, ELEMENT_MENTION_INPUT, comboboxActions, ELEMENT_MENTION, isEndPoint, Plate, PlateProvider, createComboboxPlugin, createMentionPlugin, createParagraphPlugin, createBasicMarksPlugin, createFontSizePlugin, createFontColorPlugin, createSingleLinePlugin, createPlateUIEditor, deserializeHtml, serializeHtml } from '/vendor/.vite-deps-@udecode_plate.js__v--feffb7cb.js';
import __vite__cjsImport5_objectHash from "/vendor/.vite-deps-object-hash.js__v--f8e8e6a0.js"; const hash = __vite__cjsImport5_objectHash.__esModule ? __vite__cjsImport5_objectHash.default : __vite__cjsImport5_objectHash;
import { getPluginOptions, getAboveNode, removeNodes, insertNodes, getPluginType as getPluginType$1, isDefined, setNodes, findNode as findNode$1, getEditorString, isExpanded, getNodeProps, getNodeLeaf, focusEditor as focusEditor$1, useEditorRef as useEditorRef$1, useHotkeys, usePlateSelectors, getStartPoint, getEndPoint, someNode, useComposedRef, createComponentAs as createComponentAs$1, createElementAs as createElementAs$1, findNodePath, select, getPointAfter, getInjectedPlugins, pipeInsertDataQuery, Box, usePlateEditorRef as usePlateEditorRef$1, createPluginFactory as createPluginFactory$1, onKeyDownToggleElement } from '/vendor/.vite-deps-@udecode_plate-core.js__v--b0757006.js';
import { useFloatingLinkSelectors as useFloatingLinkSelectors$1, LinkIcon, ShortTextIcon, LaunchIcon, LinkOffIcon } from '/vendor/.vite-deps-@udecode_plate-link.js__v--e5670c45.js';
import { FloatingInputWrapper, FloatingIconWrapper, FloatingVerticalDivider } from '/vendor/.vite-deps-@udecode_plate-ui-toolbar.js__v--76caab35.js';
import { addProtocolToURL, addHttpsIfNeeded, toTitleCase, api, baseUrls, removeScrollOfBox, recoverScrollOfBox } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js';
import { getRangeBoundingClientRect, getDefaultBoundingClientRect } from '/vendor/.vite-deps-@udecode_plate-floating.js__v--367044d6.js';
import { useFocused, useSelected, useReadOnly } from '/vendor/.vite-deps-slate-react.js__v--7f3f3a79.js';
import { jsxs, jsx, Fragment } from '/vendor/id-__x00__react-jsx-runtime.js';
import spacetime from '/vendor/.vite-deps-spacetime.js__v--14e7d295.js';
import { Media, Image } from '/vendor/.vite-deps-@udecode_plate-media.js__v--5e4db87a.js';
import classNames from '/vendor/.vite-deps-clsx.js__v--07c00239.js';
import { useTranslation } from '/vendor/.vite-deps-react-i18next.js__v--8418bf92.js';
import __vite__cjsImport17_reactShadowRoot from "/vendor/.vite-deps-react-shadow-root.js__v--23020670.js"; const ReactShadowRoot = __vite__cjsImport17_reactShadowRoot.__esModule ? __vite__cjsImport17_reactShadowRoot.default : __vite__cjsImport17_reactShadowRoot;
import { useForm, useController } from '/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js';
import { Tooltip, ToolbarButton, Icon, Toolbar, ToolbarSection, useToasts, IconButton, useVisible, ToolbarMenu, Section, Item, Dropdown, Text, Input, RadioGroup, Radio, Select, Button as Button$1 } from '/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js';
import { MIXPANEL_EVENTS, LocalStorageKeys } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js';
import __vite__cjsImport21_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport21_mixpanelBrowser.__esModule ? __vite__cjsImport21_mixpanelBrowser.default : __vite__cjsImport21_mixpanelBrowser;
import normalizeUrl from '/vendor/.vite-deps-normalize-url.js__v--91e5723a.js';
import { Combobox } from '/vendor/.vite-deps-@udecode_plate-ui-combobox.js__v--98874abd.js';
function _slicedToArray$f(arr, i) {
  return _arrayWithHoles$f(arr) || _iterableToArrayLimit$f(arr, i) || _unsupportedIterableToArray$g(arr, i) || _nonIterableRest$f();
}
function _nonIterableRest$f() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$g(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$g(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$g(o, minLen);
}
function _arrayLikeToArray$g(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$f(arr, i) {
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
function _arrayWithHoles$f(arr) {
  if (Array.isArray(arr)) return arr;
}
var preFormat = function preFormat(editor) {
  return unwrapList(editor);
};
var format = function format(editor, customFormatting) {
  if (editor !== null && editor !== void 0 && editor.selection) {
    var parentEntry = getParentNode(editor, editor.selection);
    if (!parentEntry) return;
    var _parentEntry = _slicedToArray$f(parentEntry, 1),
      node = _parentEntry[0];
    if (isElement(node) && !isType(editor, node, ELEMENT_CODE_BLOCK) && !isType(editor, node, ELEMENT_CODE_LINE)) {
      customFormatting();
    }
  }
};
var formatList = function formatList(editor, elementType) {
  format(editor, function () {
    return toggleList(editor, {
      type: elementType
    });
  });
};
var autoformatPlugin = {
  options: {
    rules: [{
      mode: 'block',
      type: ELEMENT_H1,
      match: '# ',
      preFormat: preFormat
    }, {
      mode: 'block',
      type: ELEMENT_H2,
      match: '## ',
      preFormat: preFormat
    }, {
      mode: 'block',
      type: ELEMENT_LI,
      match: ['* ', '- '],
      preFormat: preFormat,
      format: function format(editor) {
        return formatList(editor, ELEMENT_UL);
      }
    }, {
      mode: 'block',
      type: ELEMENT_LI,
      match: ['1. ', '1) '],
      preFormat: preFormat,
      format: function format(editor) {
        return formatList(editor, ELEMENT_OL);
      }
    }, {
      mode: 'block',
      type: ELEMENT_BLOCKQUOTE,
      match: '> ',
      preFormat: preFormat
    }]
  }
};
var createReplacePlugins = function createReplacePlugins() {
  return [createAutoformatPlugin(autoformatPlugin)];
};
var useMyPlateEditorRef = function useMyPlateEditorRef(id) {
  _s2();
  return usePlateEditorRef(id);
};
_s2(useMyPlateEditorRef, "EO/3NDY5pjQHCoKXd4K/IibFp2M=", false, function () {
  return [usePlateEditorRef];
});
var createMyPlugins = function createMyPlugins(plugins, options) {
  return createPlugins(plugins, options);
};
function _typeof$v(obj) {
  "@babel/helpers - typeof";

  return _typeof$v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$v(obj);
}
function ownKeys$s(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$s(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$s(Object(source), !0).forEach(function (key) {
      _defineProperty$u(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$s(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$u(obj, key, value) {
  key = _toPropertyKey$u(key);
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
function _toPropertyKey$u(arg) {
  var key = _toPrimitive$u(arg, "string");
  return _typeof$v(key) === "symbol" ? key : String(key);
}
function _toPrimitive$u(input, hint) {
  if (_typeof$v(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$v(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$e(arr, i) {
  return _arrayWithHoles$e(arr) || _iterableToArrayLimit$e(arr, i) || _unsupportedIterableToArray$f(arr, i) || _nonIterableRest$e();
}
function _nonIterableRest$e() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$f(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$f(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$f(o, minLen);
}
function _arrayLikeToArray$f(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$e(arr, i) {
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
function _arrayWithHoles$e(arr) {
  if (Array.isArray(arr)) return arr;
}
var useOpenLinkButton = function useOpenLinkButton(props) {
  _s3();
  var editor = useEditorRef();
  var selection = usePlateSelection();
  var entry = useMemo(function () {
    return findNode(editor, {
      match: {
        type: getPluginType(editor, ELEMENT_LINK)
      }
    });
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [editor, selection]);
  if (!entry) {
    return {};
  }
  var _entry = _slicedToArray$e(entry, 1),
    link = _entry[0];
  return _objectSpread$s({
    'aria-label': 'Open link in a new tab',
    target: '_blank',
    href: addProtocolToURL(link.url),
    onMouseOver: function onMouseOver(e) {
      e.stopPropagation();
    }
  }, props);
};
_s3(useOpenLinkButton, "fUcPfApJQ6epq+IDAkjjLHb0Lrs=", false, function () {
  return [useEditorRef, usePlateSelection];
});
var OpenLinkButton = _s4(createComponentAs(_c = _s4(function (props) {
  _s4();
  var htmlProps = useOpenLinkButton(props);
  return createElementAs('a', htmlProps);
}, "mhhuaUM7LnZxXlqybG1sidWUtYA=", false, function () {
  return [useOpenLinkButton];
})), "mhhuaUM7LnZxXlqybG1sidWUtYA=", false, function () {
  return [useOpenLinkButton];
});
_c2 = OpenLinkButton;
function _typeof$u(obj) {
  "@babel/helpers - typeof";

  return _typeof$u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$u(obj);
}
function ownKeys$r(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$r(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$r(Object(source), !0).forEach(function (key) {
      _defineProperty$t(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$r(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$t(obj, key, value) {
  key = _toPropertyKey$t(key);
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
function _toPropertyKey$t(arg) {
  var key = _toPrimitive$t(arg, "string");
  return _typeof$u(key) === "symbol" ? key : String(key);
}
function _toPrimitive$t(input, hint) {
  if (_typeof$u(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$u(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var useUnlinkButton = function useUnlinkButton(props) {
  _s5();
  var editor = useEditorRef();
  return _objectSpread$r({
    onClick: useCallback(function (e) {
      unwrapLink(editor);
      focusEditor(editor, editor.selection);
      e.preventDefault();
    }, [editor])
  }, props);
};
_s5(useUnlinkButton, "3CB2h/5AsbSQdbYpK4XmOhEM5Gw=", false, function () {
  return [useEditorRef];
});
var UnlinkButton = _s6(createComponentAs(_c3 = _s6(function (props) {
  _s6();
  var htmlProps = useUnlinkButton(props);
  return createElementAs(Button, htmlProps);
}, "AJh7IpANzRHX1SeRMap9n51QKd0=", false, function () {
  return [useUnlinkButton];
})), "AJh7IpANzRHX1SeRMap9n51QKd0=", false, function () {
  return [useUnlinkButton];
});
_c4 = UnlinkButton;
var ELEMENT_IMAGE_LINK = 'image-link';
function _typeof$t(obj) {
  "@babel/helpers - typeof";

  return _typeof$t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$t(obj);
}
function ownKeys$q(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$q(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$q(Object(source), !0).forEach(function (key) {
      _defineProperty$s(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$q(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$s(obj, key, value) {
  key = _toPropertyKey$s(key);
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
function _toPropertyKey$s(arg) {
  var key = _toPrimitive$s(arg, "string");
  return _typeof$t(key) === "symbol" ? key : String(key);
}
function _toPrimitive$s(input, hint) {
  if (_typeof$t(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$t(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$d(arr, i) {
  return _arrayWithHoles$d(arr) || _iterableToArrayLimit$d(arr, i) || _unsupportedIterableToArray$e(arr, i) || _nonIterableRest$d();
}
function _nonIterableRest$d() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$e(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$e(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$e(o, minLen);
}
function _arrayLikeToArray$e(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$d(arr, i) {
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
function _arrayWithHoles$d(arr) {
  if (Array.isArray(arr)) return arr;
}
/**
 * If selection in a link or is not url:
 * - insert text with url, exit
 * If selection is expanded or `update` in a link:
 * - remove link node, get link text
 * Then:
 * - insert link node
 */
var upsertLink = function upsertLink(editor, _ref) {
  var _text2, _editor$selection, _text3;
  var url = _ref.url,
    text = _ref.text,
    target = _ref.target,
    insertTextInLink = _ref.insertTextInLink,
    insertNodesOptions = _ref.insertNodesOptions,
    _ref$isUrl = _ref.isUrl,
    isUrl = _ref$isUrl === void 0 ? getPluginOptions(editor, ELEMENT_LINK).isUrl : _ref$isUrl;
  var at = editor === null || editor === void 0 ? void 0 : editor.selection;
  if (!at) return;
  var linkAboveImage = getAboveNode(editor);

  // link above image -> change image by link
  if (linkAboveImage && linkAboveImage[0].type === ELEMENT_IMAGE) {
    var _linkAboveImage$, _linkAboveImage$2;
    if (url !== ((_linkAboveImage$ = linkAboveImage[0]) === null || _linkAboveImage$ === void 0 ? void 0 : _linkAboveImage$.url) || target !== ((_linkAboveImage$2 = linkAboveImage[0]) === null || _linkAboveImage$2 === void 0 ? void 0 : _linkAboveImage$2.target)) {
      var _linkAboveImage$3;
      //removeNodes(editor, { at: editor.selection });
      removeNodes(editor, {
        at: editor === null || editor === void 0 ? void 0 : editor.selection
      });
      var _text = {
        text: ''
      };
      insertNodes(editor, {
        type: getPluginType$1(editor, ELEMENT_IMAGE_LINK),
        href: url,
        url: (_linkAboveImage$3 = linkAboveImage[0]) === null || _linkAboveImage$3 === void 0 ? void 0 : _linkAboveImage$3.url,
        children: [_text]
      });
    }
    return true;
  }
  var linkAbove = getAboveNode(editor, {
    at: at,
    match: {
      type: getPluginType$1(editor, ELEMENT_LINK)
    }
  });

  // anchor and focus in link -> insert text
  if (insertTextInLink && linkAbove) {
    // we don't want to insert marks in links
    editor.insertText(url);
    return true;
  }
  if (!(isUrl !== null && isUrl !== void 0 && isUrl(url))) return;
  if (isDefined(text) && !text.length) {
    text = url;
  }

  // edit the link url and/or target
  if (linkAbove) {
    var _linkAbove$, _linkAbove$2;
    if (url !== ((_linkAbove$ = linkAbove[0]) === null || _linkAbove$ === void 0 ? void 0 : _linkAbove$.url) || target !== ((_linkAbove$2 = linkAbove[0]) === null || _linkAbove$2 === void 0 ? void 0 : _linkAbove$2.target)) {
      setNodes(editor, {
        url: url,
        target: target
      }, {
        at: linkAbove[1]
      });
    }
    upsertLinkText(editor, {
      url: url,
      text: text,
      target: target
    });
    return true;
  }

  // selection contains at one edge edge or between the edges
  var linkEntry = findNode$1(editor, {
    at: at,
    match: {
      type: getPluginType$1(editor, ELEMENT_LINK)
    }
  });
  var _ref2 = linkEntry !== null && linkEntry !== void 0 ? linkEntry : [],
    _ref3 = _slicedToArray$d(_ref2, 2),
    linkNode = _ref3[0],
    linkPath = _ref3[1];
  var shouldReplaceText = false;
  if (linkPath && (_text2 = text) !== null && _text2 !== void 0 && _text2.length) {
    var linkText = getEditorString(editor, linkPath);
    if (text !== linkText) {
      shouldReplaceText = true;
    }
  }
  var linkEntryImg = findNode$1(editor, {
    at: at,
    match: {
      type: getPluginType$1(editor, ELEMENT_IMAGE)
    }
  });
  if (isExpanded(at) || linkEntryImg) {
    // anchor and focus in link
    if (linkAbove) {
      unwrapLink(editor, {
        at: linkAbove[1]
      });
    } else {
      unwrapLink(editor, {
        split: true
      });
    }
    wrapLink(editor, {
      url: url,
      target: target
    });
    upsertLinkText(editor, {
      url: url,
      target: target,
      text: text
    });
    return true;
  }
  if (shouldReplaceText) {
    removeNodes(editor, {
      at: linkPath
    });
  }
  var props = getNodeProps(linkNode !== null && linkNode !== void 0 ? linkNode : {});
  var path = (_editor$selection = editor.selection) === null || _editor$selection === void 0 ? void 0 : _editor$selection.focus.path;
  if (!path) return;

  // link text should have the focused leaf marks
  var leaf = getNodeLeaf(editor, path);

  // if text is empty, text is url
  if (!((_text3 = text) !== null && _text3 !== void 0 && _text3.length)) {
    text = url;
  }
  insertLink(editor, _objectSpread$q(_objectSpread$q({}, props), {}, {
    url: url,
    target: target,
    children: [_objectSpread$q(_objectSpread$q({}, leaf), {}, {
      text: text
    })]
  }), insertNodesOptions);
  return true;
};

/**
 * Insert link if url is valid.
 * Text is url if empty.
 * Close floating link.
 * Focus editor.
 */
var submitFloatingLink = function submitFloatingLink(editor) {
  if (!(editor !== null && editor !== void 0 && editor.selection)) return;
  var _getPluginOptions = getPluginOptions(editor, ELEMENT_LINK),
    _isUrl = _getPluginOptions.isUrl,
    forceSubmit = _getPluginOptions.forceSubmit;
  var url = floatingLinkSelectors.url();
  var isValid = (_isUrl === null || _isUrl === void 0 ? void 0 : _isUrl(url)) || forceSubmit;
  if (!isValid) return;
  var text = floatingLinkSelectors.text();
  var target = floatingLinkSelectors.newTab() ? undefined : '_self';
  floatingLinkActions.hide();
  upsertLink(editor, {
    url: url,
    text: text,
    target: target,
    isUrl: function isUrl(_url) {
      return forceSubmit || !_isUrl ? true : _isUrl(_url);
    }
  });
  setTimeout(function () {
    focusEditor$1(editor, editor.selection);
  }, 0);
  return true;
};
var useFloatingLinkEnter = function useFloatingLinkEnter() {
  _s7();
  var editor = useEditorRef$1();
  var open = useFloatingLinkSelectors().isOpen(editor.id);
  useHotkeys('*', function (e) {
    if (e.key !== 'Enter') return;
    if (submitFloatingLink(editor)) {
      e.preventDefault();
    }
  }, {
    enabled: open,
    //@ts-ignore
    enableOnFormTags: ['INPUT']
  }, []);
};
_s7(useFloatingLinkEnter, "CoLahXaahcbHYi+RLKBchC4XalQ=", false, function () {
  return [useEditorRef$1, useFloatingLinkSelectors, useHotkeys];
});
function _typeof$s(obj) {
  "@babel/helpers - typeof";

  return _typeof$s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$s(obj);
}
var _excluded$9 = ["floatingOptions"];
function ownKeys$p(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$p(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$p(Object(source), !0).forEach(function (key) {
      _defineProperty$r(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$p(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$r(obj, key, value) {
  key = _toPropertyKey$r(key);
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
function _toPropertyKey$r(arg) {
  var key = _toPrimitive$r(arg, "string");
  return _typeof$s(key) === "symbol" ? key : String(key);
}
function _toPrimitive$r(input, hint) {
  if (_typeof$s(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$s(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$c(arr, i) {
  return _arrayWithHoles$c(arr) || _iterableToArrayLimit$c(arr, i) || _unsupportedIterableToArray$d(arr, i) || _nonIterableRest$c();
}
function _nonIterableRest$c() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$d(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$d(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$d(o, minLen);
}
function _arrayLikeToArray$d(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$c(arr, i) {
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
function _arrayWithHoles$c(arr) {
  if (Array.isArray(arr)) return arr;
}
function _objectWithoutProperties$9(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$9(source, excluded);
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
function _objectWithoutPropertiesLoose$9(source, excluded) {
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
var useFloatingLinkEdit = function useFloatingLinkEdit(_ref) {
  _s8();
  var floatingOptions = _ref.floatingOptions,
    props = _objectWithoutProperties$9(_ref, _excluded$9);
  var editor = useEditorRef$1();
  var keyEditor = usePlateSelectors().keyEditor();
  var mode = useFloatingLinkSelectors().mode();
  var open = useFloatingLinkSelectors().isOpen(editor.id);
  var _getPluginOptions = getPluginOptions(editor, ELEMENT_LINK),
    triggerFloatingLinkHotkeys = _getPluginOptions.triggerFloatingLinkHotkeys;
  var getBoundingClientRect = useCallback(function () {
    var entry = getAboveNode(editor, {
      match: {
        type: getPluginType$1(editor, ELEMENT_LINK)
      }
    });
    if (entry) {
      var _entry = _slicedToArray$c(entry, 2),
        path = _entry[1];
      return getRangeBoundingClientRect(editor, {
        anchor: getStartPoint(editor, path),
        focus: getEndPoint(editor, path)
      });
    }
    return getDefaultBoundingClientRect();
  }, [editor]);
  var isOpen = open && mode === 'edit';
  var _useVirtualFloatingLi = useVirtualFloatingLink(_objectSpread$p({
      editorId: editor.id,
      open: isOpen,
      getBoundingClientRect: getBoundingClientRect
    }, floatingOptions)),
    update = _useVirtualFloatingLi.update,
    style = _useVirtualFloatingLi.style,
    floating = _useVirtualFloatingLi.floating;
  useEffect(function () {
    if (editor !== null && editor !== void 0 && editor.selection && someNode(editor, {
      match: {
        type: getPluginType$1(editor, ELEMENT_LINK)
      }
    })) {
      floatingLinkActions.show('edit', editor.id);
      update();
      return;
    }
    if (floatingLinkSelectors.mode() === 'edit') {
      floatingLinkActions.hide();
    }
  }, [editor, keyEditor, update]);
  useHotkeys(triggerFloatingLinkHotkeys, function (e) {
    if (floatingLinkSelectors.mode() === 'edit' && triggerFloatingLinkEdit(editor)) {
      e.preventDefault();
    }
  }, {
    enableOnContentEditable: true
  }, []);
  useFloatingLinkEnter();
  useFloatingLinkEscape();
  return _objectSpread$p(_objectSpread$p({
    style: _objectSpread$p(_objectSpread$p({}, style), {}, {
      zIndex: 1
    })
  }, props), {}, {
    ref: useComposedRef(props.ref, floating)
  });
};
_s8(useFloatingLinkEdit, "86E/m9vksAs7FRBLDIZJ8zTduQA=", false, function () {
  return [useEditorRef$1, usePlateSelectors, useFloatingLinkSelectors, useFloatingLinkSelectors, useVirtualFloatingLink, useHotkeys, useFloatingLinkEnter, useFloatingLinkEscape, useComposedRef];
});
function _typeof$r(obj) {
  "@babel/helpers - typeof";

  return _typeof$r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$r(obj);
}
var _excluded$8 = ["floatingOptions"];
function ownKeys$o(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$o(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$o(Object(source), !0).forEach(function (key) {
      _defineProperty$q(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$o(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$q(obj, key, value) {
  key = _toPropertyKey$q(key);
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
function _toPropertyKey$q(arg) {
  var key = _toPrimitive$q(arg, "string");
  return _typeof$r(key) === "symbol" ? key : String(key);
}
function _toPrimitive$q(input, hint) {
  if (_typeof$r(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$r(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties$8(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$8(source, excluded);
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
function _objectWithoutPropertiesLoose$8(source, excluded) {
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
var useFloatingLinkInsert = function useFloatingLinkInsert(_ref) {
  _s9();
  var floatingOptions = _ref.floatingOptions,
    props = _objectWithoutProperties$8(_ref, _excluded$8);
  var editor = useEditorRef();
  var focused = useFocused();
  var mode = useFloatingLinkSelectors().mode();
  var open = useFloatingLinkSelectors().isOpen(editor.id);
  var _getPluginOptions = getPluginOptions$1(editor, ELEMENT_LINK),
    triggerFloatingLinkHotkeys = _getPluginOptions.triggerFloatingLinkHotkeys;
  useHotkeys$1(triggerFloatingLinkHotkeys, function (e) {
    if (triggerFloatingLinkInsert(editor, {
      focused: focused
    })) {
      e.preventDefault();
    }
  }, {
    enableOnContentEditable: true
  }, [focused]);
  var ref = useOnClickOutside(function () {
    if (floatingLinkSelectors.mode() === 'insert') {
      submitFloatingLink(editor);
    }
  }, {
    disabled: !open
  });
  var _useVirtualFloatingLi = useVirtualFloatingLink(_objectSpread$o({
      editorId: editor.id,
      open: open && mode === 'insert',
      getBoundingClientRect: getSelectionBoundingClientRect,
      whileElementsMounted: function whileElementsMounted() {}
    }, floatingOptions)),
    update = _useVirtualFloatingLi.update,
    style = _useVirtualFloatingLi.style,
    floating = _useVirtualFloatingLi.floating;

  // wait for update before focusing input
  useEffect(function () {
    if (open) {
      update();
      floatingLinkActions.updated(true);
    } else {
      floatingLinkActions.updated(false);
    }
  }, [open, update]);
  useFloatingLinkEscape();
  return _objectSpread$o(_objectSpread$o({
    style: _objectSpread$o(_objectSpread$o({}, style), {}, {
      zIndex: 1
    })
  }, props), {}, {
    ref: useComposedRef$1(props.ref, floating, ref)
  });
};
_s9(useFloatingLinkInsert, "6bOtoZ/iaR+jRrxVF481Rj52cTQ=", false, function () {
  return [useEditorRef, useFocused, useFloatingLinkSelectors, useFloatingLinkSelectors, useHotkeys$1, useOnClickOutside, useVirtualFloatingLink, useFloatingLinkEscape, useComposedRef$1];
});
var FloatingLinkEditRoot = _s10(createComponentAs$1(_c5 = _s10(function (props) {
  _s10();
  var _htmlProps$style;
  var htmlProps = useFloatingLinkEdit(props);
  if (((_htmlProps$style = htmlProps.style) === null || _htmlProps$style === void 0 ? void 0 : _htmlProps$style.display) === 'none') {
    return null;
  }
  return createElementAs$1('div', htmlProps);
}, "u7wax+RVCVMBJPmvGJ6c1KVm74Y=", false, function () {
  return [useFloatingLinkEdit];
})), "u7wax+RVCVMBJPmvGJ6c1KVm74Y=", false, function () {
  return [useFloatingLinkEdit];
});
_c6 = FloatingLinkEditRoot;
var FloatingLinkInsertRoot = _s11(createComponentAs$1(_c7 = _s11(function (props) {
  _s11();
  var _htmlProps$style2;
  var htmlProps = useFloatingLinkInsert(props);
  if (((_htmlProps$style2 = htmlProps.style) === null || _htmlProps$style2 === void 0 ? void 0 : _htmlProps$style2.display) === 'none') {
    return null;
  }
  return createElementAs$1('div', htmlProps);
}, "XCb9M0aQPsxmliPu+6VBlxBK4U0=", false, function () {
  return [useFloatingLinkInsert];
})), "XCb9M0aQPsxmliPu+6VBlxBK4U0=", false, function () {
  return [useFloatingLinkInsert];
});
_c8 = FloatingLinkInsertRoot;
var FloatingLink = {
  EditRoot: FloatingLinkEditRoot,
  InsertRoot: FloatingLinkInsertRoot,
  UrlInput: FloatingLinkUrlInput,
  TextInput: FloatingLinkTextInput,
  NewTabInput: FloatingLinkNewTabInput,
  EditButton: FloatingLinkEditButton,
  UnlinkButton: UnlinkButton,
  OpenLinkButton: OpenLinkButton
};
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
var css_248z$a = ".PlateFloatingLink-module_container__puXtn {\n  display: flex;\n  flex-direction: column;\n  width: 300px;\n}\n\n.PlateFloatingLink-module_line__Kpn7h {\n  height: 1px;\n  --tw-bg-opacity: 1;\n  background-color: rgba(229, 231, 235, var(--tw-bg-opacity));\n}\n\n.PlateFloatingLink-module_floatingButtonCss__mza38 {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  padding-left: 0.625rem;\n  padding-right: 0.625rem;\n\n  display: inline-flex;\n  position: relative;\n  padding: 0;\n  text-align: center;\n  justify-content: center;\n  align-items: center;\n  max-width: 100%;\n  background-color: #ffffff;\n  font-weight: 500;\n  border-width: 0;\n  cursor: pointer;\n\n  font-family: inherit;\n  font-size: 14px;\n  border-radius: 3px;\n  color: inherit;\n}\n\n.PlateFloatingLink-module_floatingButtonCss__mza38:active,\n.PlateFloatingLink-module_floatingButtonCss__mza38:hover {\n  background-color: #e5e7eb;\n}\n\n.PlateFloatingLink-module_floatingButtonCss__mza38:active {\n  color: inherit;\n}\n\n.PlateFloatingLink-module_floatingButtonCss__mza38:visited {\n  color: inherit;\n}\n\n.PlateFloatingLink-module_floatingInputCss__OKkF2 {\n  padding: 0;\n  background-color: transparent;\n  flex-grow: 1;\n  height: 2rem;\n  border-style: none;\n  line-height: 20px;\n}\n\n.PlateFloatingLink-module_floatingInputCss__OKkF2:focus {\n  outline: none;\n}\n\n.PlateFloatingLink-module_plateButtonCss__NZHiz {\n  display: inline-flex;\n  position: relative;\n  padding: 0;\n  text-align: center;\n  justify-content: center;\n  align-items: center;\n  max-width: 100%;\n\n  font-weight: 500;\n  border-width: 0;\n  cursor: pointer;\n\n  background-color: #ffffff;\n\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  padding-left: 0.625rem;\n  padding-right: 0.625rem;\n\n  font-family: inherit;\n  font-size: 14px;\n  border-radius: 3px;\n\n  color: inherit;\n}\n\n.PlateFloatingLink-module_plateButtonCss__NZHiz:active,\n.PlateFloatingLink-module_plateButtonCss__NZHiz:hover {\n  background-color: #e5e7eb;\n}\n\n.PlateFloatingLink-module_plateButtonCss__NZHiz:active {\n  color: inherit;\n}\n\n.PlateFloatingLink-module_plateButtonCss__NZHiz:visited {\n  color: inherit;\n}\n\n.PlateFloatingLink-module_floatingRootCss__ZvmHh {\n  background-color: #ffffff;\n  z-index: 20 !important;\n  width: auto;\n  border-radius: 4px;\n  box-shadow: rgb(15 15 15 / 5%) 0 0 0 1px, rgb(15 15 15 / 10%) 0 3px 6px,\n    rgb(15 15 15 / 20%) 0 9px 24px;\n}\n\n.PlateFloatingLink-module_floatingRowCss__e1mwP {\n  display: flex;\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n  flex-direction: row;\n  align-items: center;\n}\n";
var styles$a = {
  "container": "PlateFloatingLink-module_container__puXtn",
  "line": "PlateFloatingLink-module_line__Kpn7h",
  "floatingButtonCss": "PlateFloatingLink-module_floatingButtonCss__mza38",
  "floatingInputCss": "PlateFloatingLink-module_floatingInputCss__OKkF2",
  "plateButtonCss": "PlateFloatingLink-module_plateButtonCss__NZHiz",
  "floatingRootCss": "PlateFloatingLink-module_floatingRootCss__ZvmHh",
  "floatingRowCss": "PlateFloatingLink-module_floatingRowCss__e1mwP"
};
styleInject(css_248z$a);
var PlateFloatingLink = function PlateFloatingLink(_ref) {
  _s12();
  var readOnly = _ref.readOnly;
  var isEditing = useFloatingLinkSelectors$1().isEditing();
  var editor = useEditorRef$1();
  var linkAbove = getAboveNode(editor);
  if (readOnly) return null;
  var input = /*#__PURE__*/jsxs("div", {
    className: styles$a.container,
    children: [/*#__PURE__*/jsxs(FloatingInputWrapper, {
      children: [/*#__PURE__*/jsx(FloatingIconWrapper, {
        children: /*#__PURE__*/jsx(LinkIcon, {
          width: 18
        })
      }), /*#__PURE__*/jsx(FloatingLink.UrlInput, {
        className: styles$a.floatingInputCss,
        placeholder: "Paste link"
      })]
    }), /*#__PURE__*/jsx("div", {
      className: styles$a.line
    }), (linkAbove === null || linkAbove === void 0 ? void 0 : linkAbove[0].type) !== ELEMENT_IMAGE && /*#__PURE__*/jsxs(FloatingInputWrapper, {
      children: [/*#__PURE__*/jsx(FloatingIconWrapper, {
        children: /*#__PURE__*/jsx(ShortTextIcon, {
          width: 18
        })
      }), /*#__PURE__*/jsx(FloatingLink.TextInput, {
        className: styles$a.floatingInputCss,
        placeholder: "Text to display"
      })]
    })]
  });
  var editContent = !isEditing ? /*#__PURE__*/jsxs("div", {
    className: styles$a.floatingRowCss,
    children: [/*#__PURE__*/jsx(FloatingLink.EditButton, {
      className: styles$a.plateButtonCss,
      children: "Edit link"
    }), /*#__PURE__*/jsx(FloatingVerticalDivider, {}), /*#__PURE__*/jsx(FloatingLink.OpenLinkButton, {
      className: styles$a.floatingButtonCss,
      children: /*#__PURE__*/jsx(LaunchIcon, {
        width: 18
      })
    }), /*#__PURE__*/jsx(FloatingVerticalDivider, {}), /*#__PURE__*/jsx(FloatingLink.UnlinkButton, {
      className: styles$a.floatingButtonCss,
      children: /*#__PURE__*/jsx(LinkOffIcon, {
        width: 18
      })
    })]
  }) : input;
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(FloatingLink.InsertRoot, {
      className: styles$a.floatingRootCss,
      children: input
    }), /*#__PURE__*/jsx(FloatingLink.EditRoot, {
      className: styles$a.floatingRootCss,
      children: editContent
    })]
  });
};
_s12(PlateFloatingLink, "qJdfmho4eLsoAWxQB7Cl+BnOqDE=", false, function () {
  return [useFloatingLinkSelectors$1, useEditorRef$1];
});
_c9 = PlateFloatingLink;
var linkPlugin = {
  renderAfterEditable: PlateFloatingLink,
  options: {
    forceSubmit: true
  }
};
var createElementsPlugins = function createElementsPlugins() {
  return createMyPlugins([createBlockquotePlugin(), createHeadingPlugin(), createLinkPlugin(linkPlugin), createListPlugin()]);
};
function _typeof$q(obj) {
  "@babel/helpers - typeof";

  return _typeof$q = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$q(obj);
}
function ownKeys$n(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$n(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$n(Object(source), !0).forEach(function (key) {
      _defineProperty$p(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$n(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$p(obj, key, value) {
  key = _toPropertyKey$p(key);
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
function _toPropertyKey$p(arg) {
  var key = _toPrimitive$p(arg, "string");
  return _typeof$q(key) === "symbol" ? key : String(key);
}
function _toPrimitive$p(input, hint) {
  if (_typeof$q(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$q(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$b(arr, i) {
  return _arrayWithHoles$b(arr) || _iterableToArrayLimit$b(arr, i) || _unsupportedIterableToArray$c(arr, i) || _nonIterableRest$b();
}
function _nonIterableRest$b() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$c(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$c(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$c(o, minLen);
}
function _arrayLikeToArray$c(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$b(arr, i) {
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
function _arrayWithHoles$b(arr) {
  if (Array.isArray(arr)) return arr;
}
var KEY_DIR = 'dir';
var withRTL = function withRTL(editor) {
  var normalizeNode = editor.normalizeNode;
  editor.normalizeNode = function (_ref) {
    var _node$type, _node$children, _node$children$;
    var _ref2 = _slicedToArray$b(_ref, 2),
      node = _ref2[0],
      path = _ref2[1];
    var rtl_rx = /[\u0591-\u07FF]/;
    if (
    // @ts-ignore
    node !== null && node !== void 0 && (_node$type = node.type) !== null && _node$type !== void 0 && _node$type.includes(ELEMENT_DEFAULT, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6, 'span') && rtl_rx.test((_node$children = node.children) === null || _node$children === void 0 ? void 0 : (_node$children$ = _node$children[0]) === null || _node$children$ === void 0 ? void 0 : _node$children$.text)) {
      node.direction = 'rtl';
      node.rtl = true;
    }
    return normalizeNode([node, path]);
  };
  return editor;
};

/**
 * Creates a plugin that adds alignment functionality to the editor.
 */
var createDirPlugin = createPluginFactory({
  key: KEY_DIR,
  //@ts-ignore
  withOverrides: withRTL,
  then: function then(editor) {
    return {
      inject: {
        props: {
          nodeKey: KEY_DIR,
          defaultNodeValue: 'ltr',
          styleKey: 'direction',
          validNodeValues: ['rtl', 'ltr'],
          validTypes: [getPluginType(editor, ELEMENT_DEFAULT)]
        }
      },
      deserializeHtml: {
        isElement: true,
        rules: [{
          validNodeName: 'SPAN'
        }],
        getNode: function getNode(el, node) {
          var rtl_rx = /[\u0591-\u07FF]/;
          if (rtl_rx.test(el.textContent)) {
            return _objectSpread$n(_objectSpread$n({}, node), {}, {
              direction: 'rtl',
              rtl: true,
              type: 'p',
              children: [{
                text: el.textContent
              }]
            });
          } else {
            return node;
          }
        }
      }
    };
  }
});
var KEY_DIRECTION = 'direction';

/**
 * Creates a plugin that adds alignment functionality to the editor.
 */
var createDirectionPlugin = createPluginFactory({
  key: KEY_DIRECTION,
  then: function then(editor) {
    return {
      inject: {
        props: {
          nodeKey: KEY_DIRECTION,
          defaultNodeValue: 'ltr',
          styleKey: 'direction',
          validNodeValues: ['rtl', 'ltr'],
          validTypes: [getPluginType(editor, ELEMENT_DEFAULT)]
        }
      },
      then: function then(_, plugin) {
        return mapInjectPropsToPlugin(editor, plugin, {
          deserializeHtml: {
            getNode: function getNode(el, node) {
              var _el$style;
              if (el.dir === 'rtl' || ((_el$style = el.style) === null || _el$style === void 0 ? void 0 : _el$style.textAlign) === 'right') {
                node[plugin.key] = 'rtl';
                node.rtl = true;
              }
            }
          }
        });
      }
    };
  }
});
var ELEMENT_RAW_HTML_BLOCK = 'raw-html-block';
function _typeof$p(obj) {
  "@babel/helpers - typeof";

  return _typeof$p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$p(obj);
}
function ownKeys$m(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$m(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$m(Object(source), !0).forEach(function (key) {
      _defineProperty$o(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$m(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$o(obj, key, value) {
  key = _toPropertyKey$o(key);
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
function _toPropertyKey$o(arg) {
  var key = _toPrimitive$o(arg, "string");
  return _typeof$p(key) === "symbol" ? key : String(key);
}
function _toPrimitive$o(input, hint) {
  if (_typeof$p(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$p(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$a(arr, i) {
  return _arrayWithHoles$a(arr) || _iterableToArrayLimit$a(arr, i) || _unsupportedIterableToArray$b(arr, i) || _nonIterableRest$a();
}
function _nonIterableRest$a() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$b(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$b(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$b(o, minLen);
}
function _arrayLikeToArray$b(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$a(arr, i) {
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
function _arrayWithHoles$a(arr) {
  if (Array.isArray(arr)) return arr;
}
var createRawHTMLBlock = function createRawHTMLBlock(editor, html) {
  var type = getPluginType(editor, ELEMENT_RAW_HTML_BLOCK);
  return {
    id: 'signature',
    html: html,
    type: type,
    children: [{
      text: ''
    }]
  };
};
var insertRawHTMLBlock = function insertRawHTMLBlock(editor, html, options) {
  var rawHTMLBlock = createRawHTMLBlock(editor, html);
  insertNodes$1(editor, rawHTMLBlock, options);
};
var replaceHTMLBlock = function replaceHTMLBlock(editor, id, type, html) {
  if (editor) {
    var pluginType = getPluginType(editor, type);
    var htmlBlock = findNode(editor, {
      at: [],
      match: {
        id: id,
        type: pluginType
      }
    });
    if (htmlBlock) {
      var _htmlBlock = _slicedToArray$a(htmlBlock, 2),
        node = _htmlBlock[0],
        path = _htmlBlock[1];
      if (html !== null && html !== void 0 && html.length) {
        withoutNormalizing(editor, function () {
          removeNodes$1(editor, {
            at: path
          });
          insertNodes$1(editor, _objectSpread$m(_objectSpread$m({}, node), {}, {
            html: html,
            type: pluginType
          }), {
            at: path
          });
        });
      }
    } else {
      withoutNormalizing(editor, function () {
        insertNodes$1(editor, createRawHTMLBlock(editor, html));
      });
    }
  }
};
var createRawHTMLBlockPlugin = function createRawHTMLBlockPlugin() {
  return {
    key: ELEMENT_RAW_HTML_BLOCK,
    isElement: true,
    isVoid: true,
    then: function then(editor, _ref) {
      var type = _ref.type;
      return {
        deserializeHtml: {
          getNode: function getNode(el) {
            return {
              type: type,
              html: el.getAttribute('html')
            };
          },
          rules: [{
            validNodeName: 'RAW-HTML-BLOCK'
          }]
        }
      };
    },
    serializeHtml: function serializeHtml(_ref2) {
      var element = _ref2.element;
      return /*#__PURE__*/jsx("div", {
        style: {
          padding: '16px 0'
        },
        dangerouslySetInnerHTML: {
          __html: element.html
        }
      });
    }
  };
};
var ELEMENT_SLOTS_FORM = 'slots-form';
var createSlotsBlock = function createSlotsBlock(editor, html) {
  var type = getPluginType(editor, ELEMENT_SLOTS_FORM);
  return {
    html: html,
    type: type,
    children: [{
      text: ''
    }]
  };
};
var insertSlotsBlock = function insertSlotsBlock(editor, html, options) {
  var slotsBlock = createSlotsBlock(editor, html);
  insertNodes$1(editor, slotsBlock, options);
};
var createSlotsBlockPlugin = function createSlotsBlockPlugin() {
  return {
    key: ELEMENT_SLOTS_FORM,
    isElement: true,
    isVoid: true,
    then: function then(editor, _ref) {
      var type = _ref.type;
      return {
        deserializeHtml: {
          getNode: function getNode(el) {
            return {
              type: type,
              html: el.getAttribute('html')
            };
          },
          rules: [{
            validNodeName: 'SLOTS-FORM-BLOCK'
          }]
        }
      };
    },
    serializeHtml: function serializeHtml(_ref2) {
      var element = _ref2.element;
      return /*#__PURE__*/jsx("div", {
        style: {
          padding: '16px 0'
        },
        dangerouslySetInnerHTML: {
          __html: element.html
        }
      });
    }
  };
};
var ELEMENT_TEMPLATE_VARIABLE = 'variable';
var ELEMENT_MISSING_VARIABLE = 'missing-variable';
var ELEMENT_SNIPPET = 'snippet';
var ELEMENT_MEETING_LINK = 'meeting-link';
var ELEMENT_MISSING_MEETING_LINK = 'missing-meeting-link';
function _typeof$o(obj) {
  "@babel/helpers - typeof";

  return _typeof$o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$o(obj);
}
function ownKeys$l(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$l(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$l(Object(source), !0).forEach(function (key) {
      _defineProperty$n(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$l(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$n(obj, key, value) {
  key = _toPropertyKey$n(key);
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
function _toPropertyKey$n(arg) {
  var key = _toPrimitive$n(arg, "string");
  return _typeof$o(key) === "symbol" ? key : String(key);
}
function _toPrimitive$n(input, hint) {
  if (_typeof$o(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$o(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$9(arr, i) {
  return _arrayWithHoles$9(arr) || _iterableToArrayLimit$9(arr, i) || _unsupportedIterableToArray$a(arr, i) || _nonIterableRest$9();
}
function _nonIterableRest$9() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$a(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$a(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$a(o, minLen);
}
function _arrayLikeToArray$a(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$9(arr, i) {
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
function _arrayWithHoles$9(arr) {
  if (Array.isArray(arr)) return arr;
}
function getMeetingLinkURL$1(userMeetingLinks, node) {
  var linkId = node.linkId;
  if (linkId === '__default__') {
    return userMeetingLinks === null || userMeetingLinks === void 0 ? void 0 : userMeetingLinks.find(function (meetingLink) {
      return meetingLink.defaultLink;
    });
  } else {
    return userMeetingLinks === null || userMeetingLinks === void 0 ? void 0 : userMeetingLinks.find(function (meetingLink) {
      return meetingLink.id === linkId;
    });
  }
}
var withTemplateMeetingLinksOverrides = function withTemplateMeetingLinksOverrides(editor, _ref) {
  var _ref$options = _ref.options,
    replace = _ref$options.replace,
    getUserRelatedMeetingLinks = _ref$options.getUserRelatedMeetingLinks;
  var normalizeNode = editor.normalizeNode;
  editor.normalizeNode = function (entry) {
    var _entry = _slicedToArray$9(entry, 2),
      node = _entry[0],
      path = _entry[1];
    if (isElement(node) && node.type === ELEMENT_MEETING_LINK && replace) {
      var userMeetingLinks = getUserRelatedMeetingLinks(node.userId !== '__me__' ? node.userId : undefined);
      var _ref2 = getMeetingLinkURL$1(userMeetingLinks, node) || {},
        url = _ref2.url;
      removeNodes$1(editor, {
        at: path
      });
      if (url) {
        insertNodes$1(editor, _objectSpread$l(_objectSpread$l({}, node), {
          type: ELEMENT_LINK,
          url: addHttpsIfNeeded(url)
        }), {
          at: path
        });
      } else {
        insertNodes$1(editor, _objectSpread$l(_objectSpread$l({}, node), {
          type: ELEMENT_MISSING_MEETING_LINK
        }), {
          at: path
        });
      }
    } else {
      normalizeNode(entry);
    }
  };
  return editor;
};
var useTemplateMeetingLinksPlugin = function useTemplateMeetingLinksPlugin(replace) {
  _s13();
  var activeUserId = useActiveUserId();
  var _useMeetingLinks = useMeetingLinks(),
    getUserMeetingLinks = _useMeetingLinks.getUserMeetingLinks,
    isLoading = _useMeetingLinks.isLoading;
  function getUserRelatedMeetingLinks(userId) {
    return getUserMeetingLinks(userId || activeUserId);
  }
  return useMemo(function () {
    return {
      key: ELEMENT_MEETING_LINK,
      isElement: true,
      isVoid: true,
      isInline: true,
      withOverrides: withTemplateMeetingLinksOverrides,
      options: {
        replace: replace,
        getUserRelatedMeetingLinks: getUserRelatedMeetingLinks
      },
      plugins: [{
        key: ELEMENT_MISSING_MEETING_LINK,
        isElement: true,
        isInline: true
      }],
      then: function then(_, _ref) {
        var type = _ref.type;
        return {
          options: {
            replace: replace,
            getUserRelatedMeetingLinks: getUserRelatedMeetingLinks
          },
          deserializeHtml: {
            getNode: function getNode(el) {
              return {
                type: type,
                group: el.getAttribute('group'),
                name: el.getAttribute('name'),
                id: el.getAttribute('type')
              };
            },
            rules: [{
              validNodeName: 'MEETING_LINK'
            }]
          }
        };
      },
      serializeHtml: function serializeHtml(_ref2) {
        var element = _ref2.element;
        var group = toTitleCase(element.group);
        var name = toTitleCase(element.name);
        return /*#__PURE__*/jsx(Fragment, {
          children: "".concat(group, ": ").concat(name)
        });
      }
    };
  }, [isLoading]);
};
_s13(useTemplateMeetingLinksPlugin, "wrrgyO6CZbEJUKXKAVvfBroxS6g=", false, function () {
  return [useActiveUserId, useMeetingLinks];
});
function _typeof$n(obj) {
  "@babel/helpers - typeof";

  return _typeof$n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$n(obj);
}
function ownKeys$k(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$k(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$k(Object(source), !0).forEach(function (key) {
      _defineProperty$m(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$k(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$m(obj, key, value) {
  key = _toPropertyKey$m(key);
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
function _toPropertyKey$m(arg) {
  var key = _toPrimitive$m(arg, "string");
  return _typeof$n(key) === "symbol" ? key : String(key);
}
function _toPrimitive$m(input, hint) {
  if (_typeof$n(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$n(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$8(arr, i) {
  return _arrayWithHoles$8(arr) || _iterableToArrayLimit$8(arr, i) || _unsupportedIterableToArray$9(arr, i) || _nonIterableRest$8();
}
function _nonIterableRest$8() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$9(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$9(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$9(o, minLen);
}
function _arrayLikeToArray$9(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$8(arr, i) {
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
function _arrayWithHoles$8(arr) {
  if (Array.isArray(arr)) return arr;
}
var getNodeText = function getNodeText(editor) {
  var isEditorFocused = !!(editor !== null && editor !== void 0 && editor.selection);
  if (isEditorFocused) {
    var _getNodeEntry = getNodeEntry(editor, editor === null || editor === void 0 ? void 0 : editor.selection),
      _getNodeEntry2 = _slicedToArray$8(_getNodeEntry, 1),
      node = _getNodeEntry2[0];
    //@ts-ignore
    return (node === null || node === void 0 ? void 0 : node.text) || null;
  }
  return null;
};
var insertTemplateVariable = function insertTemplateVariable(editor, data, options) {
  var templateVariable = _objectSpread$k({
    type: getPluginType(editor, ELEMENT_TEMPLATE_VARIABLE),
    children: [{
      text: ''
    }]
  }, data);
  var initialText = getNodeText(editor);
  insertNodes$1(editor,
  //@ts-ignore
  templateVariable, options);
  var updatedText = getNodeText(editor);
  var hasBeenReplaced = !!updatedText;
  if (hasBeenReplaced) {
    if (initialText) {
      //@ts-ignore
      var variableLength = updatedText.length - initialText.length;
      moveSelection(editor, {
        unit: 'offset',
        distance: variableLength
      });
      // TODO: Improve template variables micro-interactions,
      //  by doing things like adding/removing spaces if they are already there
    }
  } else {
    moveSelection(editor);
    insertText(editor, ' ');
  }
  if (options) {
    deselect(editor);
  }
  setTimeout(function () {
    focusEditor$1(editor, editor.selection);
  }, 0);
};
var insertMeetingLink = function insertMeetingLink(editor, data) {
  var meetingLink = _objectSpread$k({
    type: getPluginType(editor, ELEMENT_MEETING_LINK),
    children: [{
      text: ''
    }]
  }, data);
  var initialText = getNodeText(editor);
  insertNodes$1(editor, meetingLink);
  var updatedText = getNodeText(editor);
  var hasBeenReplaced = !!updatedText;
  if (hasBeenReplaced) {
    if (initialText) {
      //@ts-ignore
      var variableLength = updatedText.length - initialText.length;
      moveSelection(editor, {
        unit: 'character',
        distance: variableLength
      });
      // TODO: Improve template variables micro-interactions,
      //  by doing things like adding/removing spaces if they are already there
    }
  } else {
    moveSelection(editor);
    insertText(editor, ' ');
  }
  setTimeout(function () {
    focusEditor$1(editor, editor.selection);
  }, 0);
};
function _typeof$m(obj) {
  "@babel/helpers - typeof";

  return _typeof$m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$m(obj);
}
function ownKeys$j(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$j(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$j(Object(source), !0).forEach(function (key) {
      _defineProperty$l(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$j(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$l(obj, key, value) {
  key = _toPropertyKey$l(key);
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
function _toPropertyKey$l(arg) {
  var key = _toPrimitive$l(arg, "string");
  return _typeof$m(key) === "symbol" ? key : String(key);
}
function _toPrimitive$l(input, hint) {
  if (_typeof$m(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$m(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$7(arr, i) {
  return _arrayWithHoles$7(arr) || _iterableToArrayLimit$7(arr, i) || _unsupportedIterableToArray$8(arr, i) || _nonIterableRest$7();
}
function _nonIterableRest$7() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$8(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$8(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen);
}
function _arrayLikeToArray$8(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$7(arr, i) {
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
function _arrayWithHoles$7(arr) {
  if (Array.isArray(arr)) return arr;
}
var withTemplateVariableOverrides = function withTemplateVariableOverrides(editor, _ref) {
  var _ref$options = _ref.options,
    replace = _ref$options.replace,
    values = _ref$options.values;
  var normalizeNode = editor.normalizeNode;
  editor.normalizeNode = function (entry) {
    var _entry = _slicedToArray$7(entry, 2),
      node = _entry[0],
      path = _entry[1];
    if (replace && isElement(node) && node.type === ELEMENT_TEMPLATE_VARIABLE) {
      removeNodes$1(editor, {
        at: path
      });
      var variable = values.find(function (v) {
        return [v.logicRole, v.id].includes(node.id);
      });
      if (variable !== null && variable !== void 0 && variable.value) {
        insertNodes$1(editor, {
          text: variable.value
        }, {
          at: path
        });
      } else {
        insertNodes$1(editor, _objectSpread$j(_objectSpread$j({}, node), {}, {
          type: ELEMENT_MISSING_VARIABLE
        }), {
          at: path
        });
      }
    } else {
      normalizeNode(entry);
    }
  };
  return editor;
};
function _typeof$l(obj) {
  "@babel/helpers - typeof";

  return _typeof$l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$l(obj);
}
function ownKeys$i(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$i(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$i(Object(source), !0).forEach(function (key) {
      _defineProperty$k(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$i(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$k(obj, key, value) {
  key = _toPropertyKey$k(key);
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
function _toPropertyKey$k(arg) {
  var key = _toPrimitive$k(arg, "string");
  return _typeof$l(key) === "symbol" ? key : String(key);
}
function _toPrimitive$k(input, hint) {
  if (_typeof$l(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$l(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var useTemplateVariablesPlugin = function useTemplateVariablesPlugin(_ref) {
  _s14();
  var _ref$replace = _ref.replace,
    replace = _ref$replace === void 0 ? false : _ref$replace;
  var emailVariablesValues = useBaseEmailVariableValue();
  return useMemo(function () {
    var values = Object.values(emailVariablesValues).flat();
    var options = {
      replace: replace,
      values: values
    };
    return {
      key: ELEMENT_TEMPLATE_VARIABLE,
      isElement: true,
      isVoid: true,
      isInline: true,
      options: options,
      withOverrides: withTemplateVariableOverrides,
      plugins: [{
        key: ELEMENT_MISSING_VARIABLE,
        isElement: true,
        isVoid: true,
        isInline: true
      }],
      then: function then(_, _ref2) {
        var type = _ref2.type;
        return {
          options: options,
          deserializeHtml: {
            type: type,
            getNode: function getNode(el) {
              return {
                type: type,
                group: el.getAttribute('group'),
                name: el.getAttribute('name'),
                id: el.getAttribute('type')
              };
            },
            rules: [{
              validNodeName: 'VARIABLE'
            }]
          },
          serializeHtml: function serializeHtml(_ref3) {
            var element = _ref3.element;
            //@ts-ignore
            var variable = values.find(function (v) {
              return v.id === element.id;
            });
            if (variable) {
              return variable === null || variable === void 0 ? void 0 : variable.value;
            } else {
              var group = toTitleCase(element.group);
              var name = toTitleCase(element.name);
              return createElementAs('span', _objectSpread$i(_objectSpread$i({}, element), {}, {
                as: 'missing-variable',
                style: {
                  color: 'var(--softTomato)',
                  backgroundColor: '#ffdbe2',
                  borderRadius: '4px',
                  padding: '2px 4px',
                  textTransform: 'capitalize',
                  whiteSpace: 'normal'
                },
                children: "".concat(group, ": ").concat(name)
              }));
            }
          }
        };
      }
    };
  }, [replace, hash(emailVariablesValues)]);
};

/**
 * Flat map an array of object by key.
 */
_s14(useTemplateVariablesPlugin, "JeEZ3HVA8BshMcu5DoA69ETw4B0=", false, function () {
  return [useBaseEmailVariableValue];
});
var flatMapByKey = function flatMapByKey(arr, key) {
  return arr.flatMap(function (item) {
    var _item$key;
    return (_item$key = item[key]) !== null && _item$key !== void 0 ? _item$key : [];
  });
};
var checkEmptyText = function checkEmptyText(_ref) {
  var type = _ref.type,
    children = _ref.children;
  if (type === 'p') {
    var _children$, _children$$text;
    return ((_children$ = children[0]) === null || _children$ === void 0 ? void 0 : (_children$$text = _children$.text) === null || _children$$text === void 0 ? void 0 : _children$$text.trim()) === '';
  }
  return false;
};
var hasMissingVariables = function hasMissingVariables(root) {
  var nodes = flatMapByKey(root, 'children');
  return nodes.some(function (node) {
    return (node === null || node === void 0 ? void 0 : node.type) === ELEMENT_MISSING_VARIABLE;
  });
};
function _typeof$k(obj) {
  "@babel/helpers - typeof";

  return _typeof$k = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$k(obj);
}
function ownKeys$h(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$h(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$h(Object(source), !0).forEach(function (key) {
      _defineProperty$j(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$h(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$j(obj, key, value) {
  key = _toPropertyKey$j(key);
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
function _toPropertyKey$j(arg) {
  var key = _toPrimitive$j(arg, "string");
  return _typeof$k(key) === "symbol" ? key : String(key);
}
function _toPrimitive$j(input, hint) {
  if (_typeof$k(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$k(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE],
  defaultType: ELEMENT_PARAGRAPH$1
};
var resetBlockTypePlugin = {
  options: {
    rules: [_objectSpread$h(_objectSpread$h({}, resetBlockTypesCommonRule), {}, {
      hotkey: 'Enter',
      predicate: isBlockAboveEmpty
    }), _objectSpread$h(_objectSpread$h({}, resetBlockTypesCommonRule), {}, {
      hotkey: 'Backspace',
      predicate: isSelectionAtBlockStart
    })]
  }
};
var exitBreakPlugin = {
  options: {
    rules: [{
      hotkey: 'mod+enter'
    }, {
      hotkey: 'mod+shift+enter',
      before: true
    }, {
      hotkey: 'enter',
      query: {
        start: true,
        end: true,
        allow: KEYS_HEADING
      },
      relative: true
    }, {
      hotkey: 'enter',
      query: {
        allow: [ELEMENT_IMAGE, ELEMENT_BLOCKQUOTE, ELEMENT_IMAGE_LINK]
      }
    }, {
      hotkey: 'enter',
      before: true,
      query: {
        start: true,
        allow: [ELEMENT_PARAGRAPH$1]
      }
    }]
  }
};
var selectOnBackspacePlugin = {
  options: {
    query: {
      allow: [ELEMENT_IMAGE, ELEMENT_TEMPLATE_VARIABLE, ELEMENT_MISSING_VARIABLE, ELEMENT_RAW_HTML_BLOCK, ELEMENT_IMAGE_LINK, ELEMENT_SLOTS_FORM]
    }
  }
};
var createControlPlugins = function createControlPlugins() {
  return createMyPlugins([
  //createResetNodePlugin(resetBlockTypePlugin),
  createExitBreakPlugin(exitBreakPlugin), createSelectOnBackspacePlugin(selectOnBackspacePlugin), createDirectionPlugin({
    inject: {
      props: {
        validTypes: [ELEMENT_PARAGRAPH$1, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6, 'span']
      }
    }
  }), createDirPlugin({
    inject: {
      props: {
        validTypes: [ELEMENT_PARAGRAPH$1, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6]
      }
    }
  })]);
};
var selectNextElementLic = function selectNextElementLic(editor, type, path) {
  if (type === ELEMENT_LIC) {
    if (path) {
      var _nextNode$, _nextNode$2;
      select(editor, getPointAfter(editor, path));
      var nextNode = getParentNode(editor, getPath(editor, editor.selection));
      if (nextNode && ((_nextNode$ = nextNode[0]) === null || _nextNode$ === void 0 ? void 0 : _nextNode$.type) === ELEMENT_LIC && ((_nextNode$2 = nextNode[1]) === null || _nextNode$2 === void 0 ? void 0 : _nextNode$2.toString()) !== (path === null || path === void 0 ? void 0 : path.toString())) {
        var _nextNode$3;
        selectNextElementLic(editor, (_nextNode$3 = nextNode[0]) === null || _nextNode$3 === void 0 ? void 0 : _nextNode$3.type, nextNode[1]);
      }
    }
  }
};
var newNode = {
  type: ELEMENT_PARAGRAPH$1,
  children: [{
    text: ''
  }]
};
var insertImage = function insertImage(editor, url, options) {
  var _currentNode$, _currentNode$2;
  var text = {
    text: ''
  };
  var image = {
    type: getPluginType$1(editor, ELEMENT_IMAGE),
    url: url,
    width: 300,
    children: [text]
  };

  // If the cursor is inside a list item, we need to move the cursor to the end of the list item and insert the image there.
  var currentNode = getParentNode(editor, getPath(editor, editor.selection));
  if (((_currentNode$ = currentNode[0]) === null || _currentNode$ === void 0 ? void 0 : _currentNode$.type) === ELEMENT_LIC) {
    //@ts-ignore
    insertNodes(editor, newNode, {
      at: [editor.children.length]
    });
  }
  selectNextElementLic(editor, (_currentNode$2 = currentNode[0]) === null || _currentNode$2 === void 0 ? void 0 : _currentNode$2.type, currentNode[1]);
  insertNodes(editor, image, options);
  setTimeout(function () {
    var path = findNodePath(editor, image);
    if (path) {
      select(editor, path);
    }
    focusEditor$1(editor);
  }, 500);
};

/**
 * If inserted text is image url, insert image instead.
 */
var withImageEmbed = function withImageEmbed(editor, plugin) {
  var insertData = editor.insertData;
  editor.insertData = function (dataTransfer) {
    var text = dataTransfer.getData('text/plain');
    if (isImageUrl(text)) {
      insertImage(editor, text);
      return;
    }
    insertData(dataTransfer);
  };
  return editor;
};
function _typeof$j(obj) {
  "@babel/helpers - typeof";

  return _typeof$j = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$j(obj);
}
function _regeneratorRuntime$1() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */_regeneratorRuntime$1 = function _regeneratorRuntime() {
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
        return value && "object" == _typeof$j(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
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
function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) {
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
function _asyncToGenerator$1(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _slicedToArray$6(arr, i) {
  return _arrayWithHoles$6(arr) || _iterableToArrayLimit$6(arr, i) || _unsupportedIterableToArray$7(arr, i) || _nonIterableRest$6();
}
function _nonIterableRest$6() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit$6(arr, i) {
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
function _arrayWithHoles$6(arr) {
  if (Array.isArray(arr)) return arr;
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$7(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e2) {
          throw _e2;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e3) {
      didErr = true;
      err = _e3;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _unsupportedIterableToArray$7(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$7(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen);
}
function _arrayLikeToArray$7(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

/**
 * Allows for pasting images from clipboard.
 * Not yet: dragging and dropping images, selecting them through a file system dialog.
 */
var withImageUpload = function withImageUpload(editor, plugin) {
  plugin.options.uploadImage;
  var insertData = editor.insertData;
  editor.insertData = function (dataTransfer) {
    var text = dataTransfer.getData('text/plain');
    var files = dataTransfer.files;
    if (files && files.length > 0) {
      var injectedPlugins = getInjectedPlugins(editor, plugin);
      if (!pipeInsertDataQuery(injectedPlugins, {
        data: text,
        dataTransfer: dataTransfer
      })) {
        return insertData(dataTransfer);
      }
      //@ts-ignore
      var _iterator = _createForOfIteratorHelper(files),
        _step;
      try {
        var _loop = function _loop() {
          var file = _step.value;
          var reader = new FileReader();
          var _file$type$split = file.type.split('/'),
            _file$type$split2 = _slicedToArray$6(_file$type$split, 1),
            mime = _file$type$split2[0];
          if (mime === 'image') {
            reader.addEventListener('load', /*#__PURE__*/_asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee() {
              var formData, response;
              return _regeneratorRuntime$1().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    if (reader.result) {
                      _context.next = 2;
                      break;
                    }
                    return _context.abrupt("return");
                  case 2:
                    formData = new FormData();
                    formData.append('file', file);
                    formData.append('visible', 'true');
                    _context.next = 7;
                    return api.post('/messaging/mediaFiles', formData, {
                      validateStatus: function validateStatus() {
                        return true;
                      },
                      headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                    });
                  case 7:
                    response = _context.sent;
                    if (response.status === 201) {
                      insertImage(editor, response.data.url);
                    }
                  case 9:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            })));
            reader.readAsDataURL(file);
          }
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else {
      insertData(dataTransfer);
    }
  };
  return editor;
};

/**
 * @see withImageUpload
 * @see withImageEmbed
 */
var withImage = function withImage(editor, plugin) {
  var _plugin$options = plugin.options,
    disableUploadInsert = _plugin$options.disableUploadInsert,
    disableEmbedInsert = _plugin$options.disableEmbedInsert;
  if (!disableUploadInsert) {
    editor = withImageUpload(editor, plugin);
  }
  if (!disableEmbedInsert) {
    editor = withImageEmbed(editor);
  }
  return editor;
};
var createImagePlugin = createPluginFactory({
  key: ELEMENT_IMAGE,
  isElement: true,
  isVoid: true,
  withOverrides: withImage,
  options: {
    disableCaption: true
  },
  plugins: [{
    key: ELEMENT_IMAGE_LINK,
    isElement: true,
    isVoid: true,
    then: function then(editor, _ref) {
      var type = _ref.type;
      return {
        deserializeHtml: {
          rules: [{
            validNodeName: 'IMGLINK'
          }],
          getNode: function getNode(el) {
            return {
              type: type,
              url: el.getAttribute('src'),
              href: el.getAttribute('href')
            };
          }
        },
        serializeHtml: function serializeHtml(_ref2) {
          var element = _ref2.element;
          var width = element.width;
          return /*#__PURE__*/jsx("a", {
            rel: "noreferrer noopener",
            target: "_blank",
            href: element.href,
            children: /*#__PURE__*/jsx("img", {
              src: element.url,
              alt: "",
              style: {
                width: typeof width === 'string' || typeof width === 'number' ? width : undefined,
                marginTop: 8
              }
            })
          });
        }
      };
    }
  }],
  then: function then(_, _ref3) {
    var type = _ref3.type;
    return {
      deserializeHtml: {
        rules: [{
          validNodeName: 'IMG'
        }],
        getNode: function getNode(el) {
          return {
            type: type,
            url: el.getAttribute('src')
          };
        }
      },
      serializeHtml: function serializeHtml(_ref4) {
        var element = _ref4.element;
        var width = element.width;
        return /*#__PURE__*/jsx("img", {
          src: element.url,
          alt: "",
          style: {
            width: typeof width === 'string' || typeof width === 'number' ? width : undefined,
            marginTop: 8
          }
        });
      }
    };
  }
});
var insertImageLink = function insertImageLink(editor, url, href) {
  var text = {
    text: ''
  };
  var image = {
    type: getPluginType(editor, ELEMENT_IMAGE_LINK),
    url: url,
    href: href,
    children: [text]
  };
  insertNodes$1(editor, image);
};
var ELEMENT_REPLY_HISTORY = 'reply-history';
var createReplyHistoryPlugin = function createReplyHistoryPlugin() {
  return {
    key: ELEMENT_REPLY_HISTORY,
    isElement: true,
    isVoid: true,
    then: function then(editor, _ref) {
      var type = _ref.type;
      return {
        deserializeHtml: {
          getNode: function getNode(el) {
            return {
              type: type,
              html: el.getAttribute('html')
            };
          },
          rules: [{
            validNodeName: 'REPLY-HISTORY'
          }]
        }
      };
    },
    serializeHtml: function serializeHtml(_ref2) {
      var element = _ref2.element;
      return /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx("br", {}), /*#__PURE__*/jsxs("div", {
          className: "gmail_quote",
          children: [/*#__PURE__*/jsxs("div", {
            dir: "ltr",
            className: "gmail_attr",
            children: ["On ", spacetime(element.sentAt).format('nice'), ' ', /*#__PURE__*/jsx("a", {
              href: "mailto:".concat(element.sentBy),
              children: element.sentBy
            }), " wrote:", /*#__PURE__*/jsx("br", {})]
          }), /*#__PURE__*/jsx("blockquote", {
            dangerouslySetInnerHTML: {
              __html: element.html
            },
            className: "gmail_quote",
            style: {
              margin: '0px 0px 0px 0.8ex',
              borderLeft: '1px solid rgb(204,204,204)',
              paddingLeft: '1ex'
            }
          })]
        })]
      });
    }
  };
};
var createReplyHistory = function createReplyHistory(editor, _ref) {
  var html = _ref.html,
    sentAt = _ref.sentAt,
    sentBy = _ref.sentBy;
  var type = getPluginType(editor, ELEMENT_REPLY_HISTORY);
  return {
    html: html,
    type: type,
    sentAt: sentAt,
    sentBy: sentBy,
    children: [{
      text: ''
    }]
  };
};
var css_248z$9 = ".element-module_h1__3ObGL {\n  font-size: 26px;\n  margin: 18px 0;\n  font-weight: 700;\n}\n\n.element-module_h2__oEro8 {\n  font-size: 18px;\n  margin: 16px 0;\n  font-weight: 700;\n}\n\n.element-module_h1__3ObGL:first-child,\n.element-module_h2__oEro8:first-child,\n.element-module_ul__dUYlC:first-child,\n.element-module_ol__NrlPG:first-child,\n.element-module_p__snPMa:first-child {\n  margin-top: 0;\n}\n\n.element-module_h1__3ObGL:last-child,\n.element-module_h2__oEro8:last-child,\n.element-module_ul__dUYlC:last-child,\n.element-module_ol__NrlPG:last-child,\n.element-module_p__snPMa:last-child {\n  margin-bottom: 0;\n}\n\n.element-module_p__snPMa {\n  margin: 0;\n}\n\n.element-module_ul__dUYlC,\n.element-module_ol__NrlPG {\n  padding-left: 40px;\n}\n\n.element-module_p__snPMa,\n.element-module_ol__NrlPG,\n.element-module_ul__dUYlC {\n  line-height: 19px;\n}\n\n.element-module_svgs__BOiCQ svg {\n  width: 20px !important;\n  height: 20px !important;\n}\n";
var styles$9 = {
  "h1": "element-module_h1__3ObGL",
  "h2": "element-module_h2__oEro8",
  "ul": "element-module_ul__dUYlC",
  "ol": "element-module_ol__NrlPG",
  "p": "element-module_p__snPMa",
  "svgs": "element-module_svgs__BOiCQ"
};
styleInject(css_248z$9);
var css_248z$8 = ".imageLink-module_container__6Ai1C {\n  display: inline-block;\n}\n\n.imageLink-module_image__YkWwM {\n  display: block;\n  padding-left: 0;\n  padding-right: 0;\n  width: 100%;\n  max-width: 100%;\n  cursor: pointer;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 3px;\n}\n\n.imageLink-module_focused__LS7Rm {\n  box-shadow: 0 0 0 2px #b4d5ff;\n}\n\n.imageLink-module_root__E8wR6 {\n  padding-top: 0.625rem;\n  padding-bottom: 0.625rem;\n}\n\n.imageLink-module_figure__ddW90 {\n  position: relative;\n  margin: 0;\n}\n\n.imageLink-module_handleRight__j3UZP {\n  display: flex;\n  position: absolute;\n  top: 0;\n  z-index: 10;\n  flex-direction: column;\n  justify-content: center;\n  width: 1.5rem;\n  height: 100%;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n\n  right: -0.75rem;\n  padding-right: 0.75rem;\n  margin-right: -0.75rem;\n  align-items: flex-end;\n}\n\n.imageLink-module_handleLeft__pUKJm {\n  display: flex;\n  position: absolute;\n  top: 0;\n  z-index: 10;\n  flex-direction: column;\n  justify-content: center;\n  width: 1.5rem;\n  height: 100%;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n\n  left: -0.75rem;\n  padding-left: 0.75rem;\n  margin-left: -0.75rem;\n}\n\n.imageLink-module_handleRight__j3UZP::after,\n.imageLink-module_handleLeft__pUKJm::after {\n  display: flex;\n  background-color: #9ca3af;\n  content: ' ';\n  width: 3px;\n  height: 64px;\n  border-radius: 6px;\n}\n\n.imageLink-module_handleRight__j3UZP:focus::after,\n.imageLink-module_handleLeft__pUKJm:focus::after,\n.imageLink-module_handleLeft__pUKJm:hover::after,\n.imageLink-module_handleRight__j3UZP:hover::after,\n.imageLink-module_handleLeft__pUKJm:active::after,\n.imageLink-module_handleRight__j3UZP:active::after {\n  background-color: #3b82f6;\n}\n";
var styles$8 = {
  "container": "imageLink-module_container__6Ai1C",
  "image": "imageLink-module_image__YkWwM",
  "focused": "imageLink-module_focused__LS7Rm",
  "root": "imageLink-module_root__E8wR6",
  "figure": "imageLink-module_figure__ddW90",
  "handleRight": "imageLink-module_handleRight__j3UZP",
  "handleLeft": "imageLink-module_handleLeft__pUKJm"
};
styleInject(css_248z$8);
function _typeof$i(obj) {
  "@babel/helpers - typeof";

  return _typeof$i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$i(obj);
}
var _excluded$7 = ["as"];
function ownKeys$g(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$g(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$g(Object(source), !0).forEach(function (key) {
      _defineProperty$i(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$g(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$i(obj, key, value) {
  key = _toPropertyKey$i(key);
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
function _toPropertyKey$i(arg) {
  var key = _toPrimitive$i(arg, "string");
  return _typeof$i(key) === "symbol" ? key : String(key);
}
function _toPrimitive$i(input, hint) {
  if (_typeof$i(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$i(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties$7(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$7(source, excluded);
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
function _objectWithoutPropertiesLoose$7(source, excluded) {
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
var ImageElement = function ImageElement(props) {
  _s15();
  var children = props.children,
    nodeProps = props.nodeProps,
    resizableProps = props.resizableProps,
    _props$ignoreReadOnly = props.ignoreReadOnly,
    ignoreReadOnly = _props$ignoreReadOnly === void 0 ? false : _props$ignoreReadOnly;
  props.as;
  var rootProps = _objectWithoutProperties$7(props, _excluded$7);
  var focused = useFocused();
  var selected = useSelected();
  var readOnly = useReadOnly();
  var classes = classNames(styles$8.image, _defineProperty$i({}, styles$8.focused, selected && focused));
  return /*#__PURE__*/jsxs(Media.Root, _objectSpread$g(_objectSpread$g({}, rootProps), {}, {
    className: styles$8.root,
    children: [/*#__PURE__*/jsx("figure", {
      className: "group ".concat(styles$8.figure),
      contentEditable: false,
      children: /*#__PURE__*/jsx(Media.Resizable, _objectSpread$g(_objectSpread$g({
        // @ts-ignore
        className: styles$8.resizable,
        handleComponent: {
          // eslint-disable-next-line react/jsx-handler-names
          left: /*#__PURE__*/jsx(Box, {
            className: styles$8.handleLeft
          }),
          // eslint-disable-next-line react/jsx-handler-names
          right: /*#__PURE__*/jsx(Box, {
            className: styles$8.handleRight
          })
        },
        readOnly: !ignoreReadOnly && readOnly
      }, resizableProps), {}, {
        children: /*#__PURE__*/jsx(Image, _objectSpread$g(_objectSpread$g({
          className: classes
        }, nodeProps), {}, {
          width: '100%'
        }))
      }))
    }), children]
  }));
};
_s15(ImageElement, "sdbejhUP5fQ29jaoLjAn8OCFkEM=", false, function () {
  return [useFocused, useSelected, useReadOnly];
});
_c10 = ImageElement;
function _typeof$h(obj) {
  "@babel/helpers - typeof";

  return _typeof$h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$h(obj);
}
var _excluded$6 = ["as"];
function ownKeys$f(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$f(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$f(Object(source), !0).forEach(function (key) {
      _defineProperty$h(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$f(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$h(obj, key, value) {
  key = _toPropertyKey$h(key);
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
function _toPropertyKey$h(arg) {
  var key = _toPrimitive$h(arg, "string");
  return _typeof$h(key) === "symbol" ? key : String(key);
}
function _toPrimitive$h(input, hint) {
  if (_typeof$h(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$h(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties$6(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$6(source, excluded);
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
function _objectWithoutPropertiesLoose$6(source, excluded) {
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
var ImageLink = function ImageLink(props) {
  _s16();
  props.as;
  var rootProps = _objectWithoutProperties$6(props, _excluded$6);
  var children = rootProps.children,
    nodeProps = rootProps.nodeProps,
    resizableProps = rootProps.resizableProps,
    _rootProps$align = rootProps.align,
    align = _rootProps$align === void 0 ? 'center' : _rootProps$align,
    _rootProps$ignoreRead = rootProps.ignoreReadOnly,
    ignoreReadOnly = _rootProps$ignoreRead === void 0 ? false : _rootProps$ignoreRead;
  var focused = useFocused();
  var selected = useSelected();
  var readOnly = useReadOnly();
  var classes = classNames(styles$8.image, _defineProperty$h({}, styles$8.focused, selected && focused));

  // Fix for useLink hook of @udecode/plate-link
  var linkProps = _objectSpread$f(_objectSpread$f({}, rootProps), {}, {
    element: _objectSpread$f(_objectSpread$f({}, rootProps.element), {}, {
      url: rootProps.element.href,
      target: '_blank'
    })
  });
  return /*#__PURE__*/jsxs(Media$1.Root, _objectSpread$f(_objectSpread$f({}, rootProps), {}, {
    className: styles$8.root,
    children: [/*#__PURE__*/jsx("figure", {
      className: "group ".concat(styles$8.figure),
      contentEditable: false,
      children: /*#__PURE__*/jsx(Media$1.Resizable, _objectSpread$f(_objectSpread$f({
        // @ts-ignore
        className: styles$8.resizable,
        handleComponent: {
          // eslint-disable-next-line react/jsx-handler-names
          left: /*#__PURE__*/jsx(Box$1, {
            className: styles$8.handleLeft
          }),
          // eslint-disable-next-line react/jsx-handler-names
          right: /*#__PURE__*/jsx(Box$1, {
            className: styles$8.handleRight
          })
        },
        align: align,
        readOnly: !ignoreReadOnly && readOnly
      }, resizableProps), {}, {
        children: /*#__PURE__*/jsx(Link.Root, _objectSpread$f(_objectSpread$f({}, linkProps), {}, {
          children: /*#__PURE__*/jsx(Image$1, _objectSpread$f(_objectSpread$f({
            className: classes
          }, nodeProps), {}, {
            width: '100%'
          }))
        }))
      }))
    }), children]
  }));
};
_s16(ImageLink, "sdbejhUP5fQ29jaoLjAn8OCFkEM=", false, function () {
  return [useFocused, useSelected, useReadOnly];
});
_c11 = ImageLink;
var css_248z$7 = ".meetingLink-module_container__F1Noa {\n  color: var(--softTomato);\n  background-color: #ffdbe2;\n  border-radius: 4px;\n  padding: 2px 4px;\n  text-transform: capitalize;\n  white-space: normal;\n}\n.meetingLink-module_focused__z6mBQ {\n  box-shadow: 0 0 0 2px var(--verySoftTomato);\n}\n";
var styles$7 = {
  "container": "meetingLink-module_container__F1Noa",
  "focused": "meetingLink-module_focused__z6mBQ"
};
styleInject(css_248z$7);
function _typeof$g(obj) {
  "@babel/helpers - typeof";

  return _typeof$g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$g(obj);
}
function ownKeys$e(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$e(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$e(Object(source), !0).forEach(function (key) {
      _defineProperty$g(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$e(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$g(obj, key, value) {
  key = _toPropertyKey$g(key);
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
function _toPropertyKey$g(arg) {
  var key = _toPrimitive$g(arg, "string");
  return _typeof$g(key) === "symbol" ? key : String(key);
}
function _toPrimitive$g(input, hint) {
  if (_typeof$g(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$g(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var MissingMeetingLink = function MissingMeetingLink(_ref) {
  _s17();
  var _element$children$;
  var attributes = _ref.attributes,
    children = _ref.children,
    element = _ref.element;
  var selected = useSelected();
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'richTextEditor'
    }),
    t = _useTranslation.t;
  var classes = classNames(styles$7.container, _defineProperty$g({}, styles$7.focused, selected));
  return /*#__PURE__*/jsxs("span", _objectSpread$e(_objectSpread$e({}, attributes), {}, {
    children: [/*#__PURE__*/jsx("span", {
      title: t('missingMeetingLink'),
      className: classes,
      children: element === null || element === void 0 ? void 0 : (_element$children$ = element.children[0]) === null || _element$children$ === void 0 ? void 0 : _element$children$.text
    }), children]
  }));
};
_s17(MissingMeetingLink, "dJYiY3u6uc6pBYoQkv7hsSBa4/o=", false, function () {
  return [useSelected, useTranslation];
});
_c12 = MissingMeetingLink;
function _typeof$f(obj) {
  "@babel/helpers - typeof";

  return _typeof$f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$f(obj);
}
function ownKeys$d(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$d(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$d(Object(source), !0).forEach(function (key) {
      _defineProperty$f(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$d(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$f(obj, key, value) {
  key = _toPropertyKey$f(key);
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
function _toPropertyKey$f(arg) {
  var key = _toPrimitive$f(arg, "string");
  return _typeof$f(key) === "symbol" ? key : String(key);
}
function _toPrimitive$f(input, hint) {
  if (_typeof$f(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$f(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var getMeetingLinkURL = function getMeetingLinkURL(meetingLinks, linkId) {
  var _meetingLinks$find, _meetingLinks$find2;
  if (linkId === '__default__') return meetingLinks === null || meetingLinks === void 0 ? void 0 : (_meetingLinks$find = meetingLinks.find(function (link) {
    return link.defaultLink;
  })) === null || _meetingLinks$find === void 0 ? void 0 : _meetingLinks$find.url;
  return meetingLinks === null || meetingLinks === void 0 ? void 0 : (_meetingLinks$find2 = meetingLinks.find(function (link) {
    return link.id === linkId;
  })) === null || _meetingLinks$find2 === void 0 ? void 0 : _meetingLinks$find2.url;
};
var MeetingLink = function MeetingLink(_ref) {
  _s18();
  var attributes = _ref.attributes,
    element = _ref.element,
    children = _ref.children;
  var userId = element.userId,
    linkId = element.linkId,
    elementChildren = element.children;
  var activeUserId = useActiveUserId();
  var _useMeetingLinks = useMeetingLinks(),
    getUserMeetingLinks = _useMeetingLinks.getUserMeetingLinks;
  var meetingLinks = getUserMeetingLinks(userId === '__me__' ? activeUserId : userId);
  var link = getMeetingLinkURL(meetingLinks, linkId);
  if (link) {
    var _elementChildren$;
    var linkURL = addHttpsIfNeeded(link);
    return /*#__PURE__*/jsxs("span", _objectSpread$d(_objectSpread$d({}, attributes), {}, {
      children: [/*#__PURE__*/jsx("a", {
        href: linkURL,
        target: "_blank",
        rel: "noreferrer",
        children: (_elementChildren$ = elementChildren[0]) === null || _elementChildren$ === void 0 ? void 0 : _elementChildren$.text
      }), children]
    }));
  } else {
    return /*#__PURE__*/jsx(MissingMeetingLink, {
      attributes: attributes,
      element: element,
      children: children
    });
  }
};
_s18(MeetingLink, "QqKSz9JLk7oIO77NxWG9XbdugJM=", false, function () {
  return [useActiveUserId, useMeetingLinks];
});
_c13 = MeetingLink;
var css_248z$6 = ".rawHTMLBlock-module_container__GlDen {\n  padding: 0;\n  white-space: initial;\n}\n\n.rawHTMLBlock-module_focused__l7Ri4 {\n  box-shadow: 0 0 0 2px #b4d5ff;\n}\n";
var styles$6 = {
  "container": "rawHTMLBlock-module_container__GlDen",
  "focused": "rawHTMLBlock-module_focused__l7Ri4"
};
styleInject(css_248z$6);
function _typeof$e(obj) {
  "@babel/helpers - typeof";

  return _typeof$e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$e(obj);
}
function ownKeys$c(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$c(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$c(Object(source), !0).forEach(function (key) {
      _defineProperty$e(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$c(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$e(obj, key, value) {
  key = _toPropertyKey$e(key);
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
function _toPropertyKey$e(arg) {
  var key = _toPrimitive$e(arg, "string");
  return _typeof$e(key) === "symbol" ? key : String(key);
}
function _toPrimitive$e(input, hint) {
  if (_typeof$e(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$e(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var RawHTMLBlock = function RawHTMLBlock(_ref) {
  _s19();
  var children = _ref.children,
    attributes = _ref.attributes,
    element = _ref.element;
  var selected = useSelected();
  var classes = classNames(styles$6.container, _defineProperty$e({}, styles$6.focused, selected));
  return /*#__PURE__*/jsxs("div", _objectSpread$c(_objectSpread$c({}, attributes), {}, {
    className: classes,
    children: [/*#__PURE__*/jsx("div", {
      contentEditable: false,
      children: /*#__PURE__*/jsx("div", {
        dangerouslySetInnerHTML: {
          __html: element.html
        }
      })
    }), children]
  }));
};
_s19(RawHTMLBlock, "0CE7zGEDmoUVvzVIHqbZiGzZMZk=", false, function () {
  return [useSelected];
});
_c14 = RawHTMLBlock;
var css_248z$5 = ".replyHistory-module_toggle__-W2Fl {\n  margin-top: 16px;\n  text-align: center;\n  border-radius: 8px;\n  padding: 4px 6px 2px;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  border: 0;\n  line-height: 8px;\n  background-color: var(--verySoftPeanut);\n  color: var(--peanut);\n  opacity: 0.8;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  display: grid;\n  grid-auto-flow: column;\n  -moz-column-gap: 1px;\n       column-gap: 1px;\n}\n\n.replyHistory-module_toggle__-W2Fl:focus {\n  outline: none;\n}\n\n.replyHistory-module_toggle__-W2Fl:hover {\n  opacity: 1;\n}\n\n.replyHistory-module_history__pUOp8 {\n  margin-left: 4px;\n  margin-top: 12px;\n  padding-left: 8px;\n  opacity: 0.8;\n  border-left: 1px solid var(--verySoftPeanut);\n  white-space: initial;\n}\n";
var styles$5 = {
  "toggle": "replyHistory-module_toggle__-W2Fl",
  "history": "replyHistory-module_history__pUOp8"
};
styleInject(css_248z$5);
function _typeof$d(obj) {
  "@babel/helpers - typeof";

  return _typeof$d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$d(obj);
}
function ownKeys$b(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$b(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$b(Object(source), !0).forEach(function (key) {
      _defineProperty$d(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$b(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$d(obj, key, value) {
  key = _toPropertyKey$d(key);
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
function _toPropertyKey$d(arg) {
  var key = _toPrimitive$d(arg, "string");
  return _typeof$d(key) === "symbol" ? key : String(key);
}
function _toPrimitive$d(input, hint) {
  if (_typeof$d(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$d(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$5(arr, i) {
  return _arrayWithHoles$5(arr) || _iterableToArrayLimit$5(arr, i) || _unsupportedIterableToArray$6(arr, i) || _nonIterableRest$5();
}
function _nonIterableRest$5() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$6(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$6(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen);
}
function _arrayLikeToArray$6(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$5(arr, i) {
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
function _arrayWithHoles$5(arr) {
  if (Array.isArray(arr)) return arr;
}
var replyStyle = "\n  div[dir='ltr'] + blockquote {\n    opacity: 0.75;\n  }\n  div {\n    white-space: initial;\n  }\n";
var ToggleButton = function ToggleButton(_ref) {
  var onClick = _ref.onClick;
  return /*#__PURE__*/jsxs("button", {
    type: "button",
    className: styles$5.toggle,
    onClick: onClick,
    children: [/*#__PURE__*/jsx("div", {
      children: "\u2022"
    }), /*#__PURE__*/jsx("div", {
      children: "\u2022"
    }), /*#__PURE__*/jsx("div", {
      children: "\u2022"
    })]
  });
};
_c15 = ToggleButton;
var ReplyHistory = function ReplyHistory(_ref2) {
  _s20();
  var element = _ref2.element,
    attributes = _ref2.attributes,
    children = _ref2.children,
    editor = _ref2.editor;
  var _useState = useState(false),
    _useState2 = _slicedToArray$5(_useState, 2),
    visible = _useState2[0],
    setVisible = _useState2[1];
  return /*#__PURE__*/jsxs("div", _objectSpread$b(_objectSpread$b({}, attributes), {}, {
    children: [/*#__PURE__*/jsxs("div", {
      contentEditable: false,
      children: [/*#__PURE__*/jsx(ToggleButton, {
        onClick: function onClick() {
          setVisible(!visible);
          setTimeout(function () {
            select$1(editor, [0, 0]);
          }, 0);
        }
      }), visible && /*#__PURE__*/jsxs(ReactShadowRoot, {
        children: [/*#__PURE__*/jsx("style", {
          children: replyStyle
        }), /*#__PURE__*/jsx("div", {
          className: styles$5.history,
          dangerouslySetInnerHTML: {
            __html: element.html
          }
        })]
      })]
    }), children]
  }));
};
_s20(ReplyHistory, "GH2udnDFCwOymihpi1Aydex4hN0=");
_c16 = ReplyHistory;
var css_248z$4 = ".slotsBlock-module_container__xP-6V {\n  padding: 0;\n  white-space: initial;\n  background-color: #f7f7f7;\n  max-width: -moz-max-content;\n  max-width: max-content;\n}\n\n.slotsBlock-module_container__xP-6V > div > div > div {\n  min-height: auto;\n  max-width: -moz-max-content;\n  max-width: max-content;\n}\n\n.slotsBlock-module_focused__hmYz0 {\n  box-shadow: 0 0 0 2px #b4d5ff;\n}\n";
var styles$4 = {
  "container": "slotsBlock-module_container__xP-6V",
  "focused": "slotsBlock-module_focused__hmYz0"
};
styleInject(css_248z$4);
function _typeof$c(obj) {
  "@babel/helpers - typeof";

  return _typeof$c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$c(obj);
}
function ownKeys$a(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$a(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$a(Object(source), !0).forEach(function (key) {
      _defineProperty$c(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$a(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$c(obj, key, value) {
  key = _toPropertyKey$c(key);
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
function _toPropertyKey$c(arg) {
  var key = _toPrimitive$c(arg, "string");
  return _typeof$c(key) === "symbol" ? key : String(key);
}
function _toPrimitive$c(input, hint) {
  if (_typeof$c(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$c(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var SlotsBlock = function SlotsBlock(_ref) {
  _s21();
  var children = _ref.children,
    attributes = _ref.attributes,
    element = _ref.element;
  useEditorRef();
  //@ts-ignore
  var selected = useSelected();
  var classes = classNames(styles$4.container, _defineProperty$c({}, styles$4.focused, selected));
  function handleClick() {
    element.onClick();
  }
  return /*#__PURE__*/jsxs("div", _objectSpread$a(_objectSpread$a({}, attributes), {}, {
    className: classes,
    onClick: handleClick,
    children: [/*#__PURE__*/jsx("div", {
      contentEditable: false,
      children: /*#__PURE__*/jsx("div", {
        dangerouslySetInnerHTML: {
          __html: element.html
        }
      })
    }), children]
  }));
};
_s21(SlotsBlock, "/9YN/PkBfgL92zi+543rj0TTWo8=", false, function () {
  return [useEditorRef, useSelected];
});
_c17 = SlotsBlock;
var css_248z$3 = ".templateVariable-module_container__tLPbo {\n  color: var(--bloobirds);\n  background-color: var(--veryLightBloobirds);\n  border-radius: 4px;\n  padding: 1px 3px;\n  text-transform: capitalize;\n  white-space: normal;\n}\n\n.templateVariable-module_focused__UiEZw {\n  box-shadow: 0 0 0 2px #b4d5ff;\n}\n\n.templateVariable-module_missingContainer__YgFoZ {\n  color: var(--softTomato);\n  background-color: #ffdbe2;\n  border-radius: 4px;\n  padding: 2px 4px;\n  text-transform: capitalize;\n  white-space: normal;\n}\n\n.templateVariable-module_missingFocused__9CNAD {\n  box-shadow: 0 0 0 2px var(--verySoftTomato);\n}\n";
var styles$3 = {
  "container": "templateVariable-module_container__tLPbo",
  "focused": "templateVariable-module_focused__UiEZw",
  "missingContainer": "templateVariable-module_missingContainer__YgFoZ",
  "missingFocused": "templateVariable-module_missingFocused__9CNAD"
};
styleInject(css_248z$3);
function _typeof$b(obj) {
  "@babel/helpers - typeof";

  return _typeof$b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$b(obj);
}
function ownKeys$9(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$9(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$9(Object(source), !0).forEach(function (key) {
      _defineProperty$b(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$9(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$b(obj, key, value) {
  key = _toPropertyKey$b(key);
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
function _toPropertyKey$b(arg) {
  var key = _toPrimitive$b(arg, "string");
  return _typeof$b(key) === "symbol" ? key : String(key);
}
function _toPrimitive$b(input, hint) {
  if (_typeof$b(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$b(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var MissingVariable = function MissingVariable(_ref) {
  _s22();
  var attributes = _ref.attributes,
    children = _ref.children,
    element = _ref.element;
  var selected = useSelected();
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'richTextEditor'
    }),
    t = _useTranslation.t;
  var classes = classNames(styles$3.missingContainer, _defineProperty$b({}, styles$3.missingFocused, selected));
  return /*#__PURE__*/jsxs("span", _objectSpread$9(_objectSpread$9({}, attributes), {}, {
    children: [/*#__PURE__*/jsxs("span", {
      title: t('variableNotFound'),
      className: classes,
      children: [element.group, " ", element.name]
    }), children]
  }));
};
_s22(MissingVariable, "dJYiY3u6uc6pBYoQkv7hsSBa4/o=", false, function () {
  return [useSelected, useTranslation];
});
_c18 = MissingVariable;
function _typeof$a(obj) {
  "@babel/helpers - typeof";

  return _typeof$a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$a(obj);
}
function ownKeys$8(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$8(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$8(Object(source), !0).forEach(function (key) {
      _defineProperty$a(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$8(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$a(obj, key, value) {
  key = _toPropertyKey$a(key);
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
function _toPropertyKey$a(arg) {
  var key = _toPrimitive$a(arg, "string");
  return _typeof$a(key) === "symbol" ? key : String(key);
}
function _toPrimitive$a(input, hint) {
  if (_typeof$a(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$a(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var TemplateVariable = function TemplateVariable(_ref) {
  _s23();
  var attributes = _ref.attributes,
    children = _ref.children,
    element = _ref.element;
  _ref.editor;
  var selected = useSelected();
  var classes = classNames(styles$3.container, _defineProperty$a({}, styles$3.focused, selected));
  return /*#__PURE__*/jsxs("span", _objectSpread$8(_objectSpread$8({}, attributes), {}, {
    children: [/*#__PURE__*/jsxs("span", {
      contentEditable: false,
      className: classes,
      children: [element.group, " ", element.name]
    }), children]
  }));
};
_s23(TemplateVariable, "0CE7zGEDmoUVvzVIHqbZiGzZMZk=", false, function () {
  return [useSelected];
});
_c19 = TemplateVariable;
var css_248z$2 = ".ColorPicker-module_colorButton__iykbC {\n  border-radius: 9999px;\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n  border-width: 2px;\n  border-color: #d1d5db;\n  border-style: solid;\n  position: relative;\n}\n\n.ColorPicker-module_colorButton__iykbC svg {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.ColorPicker-module_colorButton__iykbC:hover {\n  box-shadow: 0px 0px 5px 1px #9a9a9a;\n}\n\n.ColorPicker-module_colorButton__iykbC:focus {\n  box-shadow: 0px 0px 5px 1px #676767;\n}\n\n.ColorPicker-module_colorButtonBright__ygbUV {\n  border-color: transparent;\n  color: #ffffff;\n}\n\n.ColorPicker-module_colorInputContainer__T7E3F {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.ColorPicker-module_colorInputInput__QIhOm {\n  width: 0;\n  height: 0;\n  padding: 0;\n  margin: 0;\n  border: 0;\n  overflow: hidden;\n}\n\n.ColorPicker-module_colorPicker__svNEA {\n  display: flex;\n  padding: 10px;\n  flex-direction: column;\n}\n\n.ColorPicker-module_divider__ql4gH {\n  border-width: 1px;\n  border-color: #e5e7eb;\n  border-style: solid;\n  margin-top: 10px;\n}\n\n.ColorPicker-module_clearButton__sg-iv {\n  padding-top: 5px;\n  padding-bottom: 5px;\n  width: 100%;\n  margin-top: 10px;\n  border: none;\n  background-color: white;\n}\n\n.ColorPicker-module_clearButton__sg-iv:hover {\n  background-color: rgba(243, 244, 246);\n}\n\n.ColorPicker-module_colors__nNhaj {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  gap: 2.5px;\n  margin-top: 10px;\n}\n\n.ColorPicker-module_customColors__KEaMY {\n  padding-top: 5px;\n  padding-bottom: 5px;\n  width: 100%;\n  font-weight: 600;\n  border: none;\n  background-color: white;\n}\n\n.ColorPicker-module_customColors__KEaMY:hover {\n  background-color: rgba(243, 244, 246);\n}\n";
var styles$2 = {
  "colorButton": "ColorPicker-module_colorButton__iykbC",
  "colorButtonBright": "ColorPicker-module_colorButtonBright__ygbUV",
  "colorInputContainer": "ColorPicker-module_colorInputContainer__T7E3F",
  "colorInputInput": "ColorPicker-module_colorInputInput__QIhOm",
  "colorPicker": "ColorPicker-module_colorPicker__svNEA",
  "divider": "ColorPicker-module_divider__ql4gH",
  "clearButton": "ColorPicker-module_clearButton__sg-iv",
  "colors": "ColorPicker-module_colors__nNhaj",
  "customColors": "ColorPicker-module_customColors__KEaMY"
};
styleInject(css_248z$2);
function _typeof$9(obj) {
  "@babel/helpers - typeof";

  return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$9(obj);
}
function _defineProperty$9(obj, key, value) {
  key = _toPropertyKey$9(key);
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
function _toPropertyKey$9(arg) {
  var key = _toPrimitive$9(arg, "string");
  return _typeof$9(key) === "symbol" ? key : String(key);
}
function _toPrimitive$9(input, hint) {
  if (_typeof$9(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$9(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var ColorButton = function ColorButton(_ref) {
  var name = _ref.name,
    value = _ref.value,
    isBrightColor = _ref.isBrightColor,
    isSelected = _ref.isSelected,
    selectedIcon = _ref.selectedIcon,
    updateColor = _ref.updateColor;
  var classes = classNames(styles$2.colorButton, _defineProperty$9({}, styles$2.colorButtonBright, !isBrightColor));
  var content = /*#__PURE__*/jsx("button", {
    "data-testid": "ColorButton",
    type: "button",
    "aria-label": name,
    name: name,
    onClick: function onClick() {
      return updateColor(value);
    },
    className: classes,
    style: {
      backgroundColor: value
    },
    children: isSelected ? selectedIcon : null
  });
  return name ? /*#__PURE__*/jsx(Tooltip, {
    title: name,
    position: "top",
    children: content
  }) : content;
};
_c20 = ColorButton;
var Colors = function Colors(_ref) {
  var prefix = _ref.prefix,
    color = _ref.color,
    colors = _ref.colors,
    selectedIcon = _ref.selectedIcon,
    updateColor = _ref.updateColor;
  return /*#__PURE__*/jsx("div", {
    className: styles$2.colors,
    children: colors.map(function (_ref2) {
      var name = _ref2.name,
        value = _ref2.value,
        isBrightColor = _ref2.isBrightColor;
      return /*#__PURE__*/jsx(ColorButton, {
        name: name,
        value: value,
        isBrightColor: isBrightColor,
        isSelected: color === value,
        selectedIcon: selectedIcon,
        updateColor: updateColor
      }, prefix + (name || value));
    })
  });
};
_c21 = Colors;
var CustomColors = function CustomColors(_ref) {
  var color = _ref.color,
    customColors = _ref.customColors,
    selectedIcon = _ref.selectedIcon,
    updateColor = _ref.updateColor;
  return /*#__PURE__*/jsx(Colors, {
    prefix: "custom",
    color: color,
    colors: customColors,
    selectedIcon: selectedIcon,
    updateColor: updateColor
  });
};
_c22 = CustomColors;
var ColorPickerInternal = function ColorPickerInternal(_ref) {
  var color = _ref.color,
    colors = _ref.colors,
    customColors = _ref.customColors,
    selectedIcon = _ref.selectedIcon,
    updateColor = _ref.updateColor;
  _ref.updateCustomColor;
  var clearColor = _ref.clearColor;
  return /*#__PURE__*/jsxs("div", {
    "data-testid": "ColorPicker",
    className: styles$2.colorPicker,
    children: [/*#__PURE__*/jsx(CustomColors, {
      color: color,
      customColors: customColors,
      selectedIcon: selectedIcon,
      updateColor: updateColor
    }), /*#__PURE__*/jsx("div", {
      className: styles$2.divider
    }), /*#__PURE__*/jsx(Colors, {
      color: color,
      colors: colors,
      selectedIcon: selectedIcon,
      updateColor: updateColor
    }), /*#__PURE__*/jsx("button", {
      "data-testid": "ColorPickerClear",
      onClick: clearColor,
      disabled: !color,
      className: styles$2.clearButton,
      children: "Clear"
    })]
  });
};
_c23 = ColorPickerInternal;
var ColorPicker = /*#__PURE__*/React.memo(ColorPickerInternal, function (prev, next) {
  return prev.color === next.color && prev.colors === next.colors && prev.customColors === next.customColors && prev.open === next.open;
});
_c24 = ColorPicker;
var css_248z$1 = ".editorToolbar-module_label__O-xD2 {\n  position: relative;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin: 0;\n}\n\n.editorToolbar-module_input__3rsAn {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  visibility: hidden;\n}\n\n.editorToolbar-module_variableList__Veozi {\n  max-height: 256px;\n  overflow-y: scroll;\n}\n\n.editorToolbar-module_floatingTemplateVariable__yMi39 {\n  height: 100%;\n  padding-right: 12px;\n  z-index: 10;\n}\n\n.editorToolbar-module_meetingLinksDropdownWrapper__B1lZc {\n  display: flex;\n  flex-direction: column;\n  padding: 24px;\n  width: 322px;\n  box-sizing: border-box;\n}\n\n/* Linkedin overrides */\n.editorToolbar-module_meetingLinksDropdownWrapper__B1lZc input {\n  margin: 0 !important;\n  box-shadow: none !important;\n  height: auto !important;\n  border: none !important;\n  width: 100%;\n}\n\n.editorToolbar-module_meetingLinksDropdownWrapper__B1lZc input::-moz-placeholder {\n  color: transparent !important;\n}\n\n.editorToolbar-module_meetingLinksDropdownWrapper__B1lZc input::placeholder {\n  color: transparent !important;\n}\n\n.editorToolbar-module_meetingLinksDropdownWrapper__B1lZc input:focus {\n  outline: none !important;\n  background-color: transparent;\n}\n\n.editorToolbar-module_templateMeetingLinksDropdownWrapper__M8Fvt {\n  display: flex;\n  flex-direction: column;\n  padding: 24px 24px 16px 24px;\n}\n\n.editorToolbar-module_templateMeetingLinkCallout__KYS7k {\n  display: flex;\n  height: 100%;\n  align-items: center;\n  padding: 16px;\n  background-color: var(--verySoftBanana);\n  border: solid 1px var(--banana);\n  border-radius: 4px;\n  margin-bottom: 24px;\n}\n\n.editorToolbar-module_templateMeetingLinkCallout__KYS7k > svg {\n  width: 96px;\n  margin-right: 16px;\n}\n\n.editorToolbar-module_meetingLinksHeader__B9OTV {\n  margin-bottom: 8px;\n}\n\n.editorToolbar-module_meetingLinksTextDisplayInput__pZhXE {\n  margin-bottom: 18px;\n}\n\n.editorToolbar-module_meetingLinksTextDisplayInput__pZhXE input {\n  margin: 0 !important;\n  box-shadow: none !important;\n  height: 32px;\n  border: none !important;\n  width: 100%;\n}\n\n.editorToolbar-module_radioGroup__q98mq {\n  margin-bottom: 16px;\n}\n\n.editorToolbar-module_dropdownSelects__eZ5PX > * {\n  margin-bottom: 16px;\n}\n\n.editorToolbar-module_addButton__T-sCA {\n  display: flex;\n  justify-content: end;\n}\n\n.editorToolbar-module_templateVariable__mwldh {\n  display: flex;\n  height: 20px;\n  align-items: center;\n}\n\n.editorToolbar-module_templateVariable__mwldh > div {\n  height: 24px;\n  display: flex !important;\n  align-items: center;\n}\n\n.editorToolbar-module_toolbar__-f8sS > * {\n  font-size: 1rem;\n}\n\n.editorToolbar-module_timeSlotsButton__KJCUI {\n  height: 32px;\n  display: flex;\n}\n\n.editorToolbar-module_timeSlotsButton__KJCUI > button > svg {\n  width: 30px;\n  height: 30px;\n  margin-bottom: -13px;\n  margin-right: -8px !important;\n}\n\n.editorToolbar-module_sizeDropdown__I-AG- {\n  padding-bottom: 6px;\n  padding-top: 6px;\n  padding-left: 48px;\n  padding-right: 48px;\n}\n\n.editorToolbar-module_sizeDropdown__I-AG-:hover {\n  background-color: #eee;\n}\n\n.editorToolbar-module_sizeItem__MlEXE {\n  align-items: center;\n  display: flex;\n  justify-content: space-between;\n  position: relative;\n}\n\n.editorToolbar-module_sizeItem__MlEXE > svg {\n  position: absolute;\n  margin-left: -28px;\n  vertical-align: middle;\n  margin-right: 12px;\n  right: 100%;\n}\n\n.editorToolbar-module_sizeContainer__qBD8r,\n.editorToolbar-module_colorContainer__m-D9W {\n  display: flex;\n}\n\n.editorToolbar-module_sizeContainer__qBD8r > div,\n.editorToolbar-module_colorContainer__m-D9W > div {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.editorToolbar-module_sizeContainer__qBD8r div:nth-child(2) {\n  padding-top: 6px;\n  padding-bottom: 6px;\n}\n\n.editorToolbar-module_itemSignature__f11bQ {\n  padding: 4px 16px;\n}\n\n.editorToolbar-module_itemSignature__f11bQ:hover {\n  background-color: #eee;\n}\n\n.editorToolbar-module_separator__-5Rjg {\n  border-top: 1px solid var(--lightestBloobirds);\n  margin-top: 8px;\n  margin-bottom: 8px;\n}\n";
var styles$1 = {
  "label": "editorToolbar-module_label__O-xD2",
  "input": "editorToolbar-module_input__3rsAn",
  "variableList": "editorToolbar-module_variableList__Veozi",
  "floatingTemplateVariable": "editorToolbar-module_floatingTemplateVariable__yMi39",
  "meetingLinksDropdownWrapper": "editorToolbar-module_meetingLinksDropdownWrapper__B1lZc",
  "templateMeetingLinksDropdownWrapper": "editorToolbar-module_templateMeetingLinksDropdownWrapper__M8Fvt",
  "templateMeetingLinkCallout": "editorToolbar-module_templateMeetingLinkCallout__KYS7k",
  "meetingLinksHeader": "editorToolbar-module_meetingLinksHeader__B9OTV",
  "meetingLinksTextDisplayInput": "editorToolbar-module_meetingLinksTextDisplayInput__pZhXE",
  "radioGroup": "editorToolbar-module_radioGroup__q98mq",
  "dropdownSelects": "editorToolbar-module_dropdownSelects__eZ5PX",
  "addButton": "editorToolbar-module_addButton__T-sCA",
  "templateVariable": "editorToolbar-module_templateVariable__mwldh",
  "toolbar": "editorToolbar-module_toolbar__-f8sS",
  "timeSlotsButton": "editorToolbar-module_timeSlotsButton__KJCUI",
  "sizeDropdown": "editorToolbar-module_sizeDropdown__I-AG-",
  "sizeItem": "editorToolbar-module_sizeItem__MlEXE",
  "sizeContainer": "editorToolbar-module_sizeContainer__qBD8r",
  "colorContainer": "editorToolbar-module_colorContainer__m-D9W",
  "itemSignature": "editorToolbar-module_itemSignature__f11bQ",
  "separator": "editorToolbar-module_separator__-5Rjg"
};
styleInject(css_248z$1);
function _typeof$8(obj) {
  "@babel/helpers - typeof";

  return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$8(obj);
}
var _excluded$5 = ["id", "colors", "customColors"];
function ownKeys$7(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$7(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) {
      _defineProperty$8(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
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
function _objectWithoutProperties$5(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$5(source, excluded);
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
function _objectWithoutPropertiesLoose$5(source, excluded) {
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
function isBrightColor(hexColor) {
  if (!hexColor) {
    return false;
  }
  hexColor = hexColor.replace('#', '');
  var r = parseInt(hexColor.slice(0, 2), 16);
  var g = parseInt(hexColor.slice(2, 4), 16);
  var b = parseInt(hexColor.slice(4, 6), 16);
  var luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  var threshold = 192; // Umbral para determinar si el color es brillante

  return luminance > threshold;
}
var ColorPickerToolbarDropdown = function ColorPickerToolbarDropdown(_ref) {
  _s24();
  var id = _ref.id,
    _ref$colors = _ref.colors,
    colors = _ref$colors === void 0 ? DEFAULT_COLORS : _ref$colors,
    _ref$customColors = _ref.customColors,
    customColors = _ref$customColors === void 0 ? DEFAULT_CUSTOM_COLORS : _ref$customColors,
    rest = _objectWithoutProperties$5(_ref, _excluded$5);
  id = useEventPlateId(id);
  var editor = usePlateEditorState(id);
  var editorRef = usePlateEditorRef(id);
  var _useLocalStorage = useLocalStorage(),
    get = _useLocalStorage.get,
    set = _useLocalStorage.set;
  var dropdownRef = useRef(null);
  var type = getPluginType(editor, MARK_COLOR);
  var _useState = useState(false),
    _useState2 = _slicedToArray$4(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var color = editorRef && getMark(editorRef, type);
  var _useState3 = useState(),
    _useState4 = _slicedToArray$4(_useState3, 2),
    selectedColor = _useState4[0],
    setSelectedColor = _useState4[1];
  var onToggle = useCallback(function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !open;
    setOpen(value);
    if (!open) mixpanel.track(MIXPANEL_EVENTS.EDITOR_OPEN_COLOR_PICKER);
  }, [open, setOpen]);
  var updateColor = useCallback(function (value) {
    if (editorRef && editor && editor.selection) {
      setSelectedColor(value);
      select$1(editorRef, editor.selection);
      focusEditor(editorRef);
      setMarks(editor, _defineProperty$8({}, type, value));

      // Guardar en localstorage el color seleccionado en la lista de últimos colores usados
      var _lastColors = get(LocalStorageKeys.LastColors) || [];
      var index = _lastColors.indexOf(value);
      if (index !== -1) {
        _lastColors.splice(index, 1);
      }
      _lastColors.unshift(value);
      if (_lastColors.length > 10) {
        _lastColors.pop();
      }
      set(LocalStorageKeys.LastColors, _lastColors);
    }
  }, [editor, editorRef, type]);
  var updateColorAndClose = useCallback(function (value) {
    updateColor(value);
    onToggle();
  }, [onToggle, updateColor]);
  var clearColor = useCallback(function () {
    if (editorRef && editor && editor.selection) {
      select$1(editorRef, editor.selection);
      focusEditor(editorRef);
      if (selectedColor) {
        removeMark(editor, {
          key: type
        });
      }
      onToggle();
    }
  }, [editor, editorRef, onToggle, selectedColor, type]);
  useEffect(function () {
    if (editor !== null && editor !== void 0 && editor.selection) {
      setSelectedColor(color);
    }
  }, [color, editor === null || editor === void 0 ? void 0 : editor.selection]);

  // Si la lista de últimos colores usados está vacía, se rellena con los colores por defecto
  useEffect(function () {
    var lastColors = get(LocalStorageKeys.LastColors) || [];
    if (lastColors.length === 0) {
      set(LocalStorageKeys.LastColors, customColors.map(function (color) {
        return color.value;
      }));
    }
  }, [get, set]);
  useEffect(function () {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return function () {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);
  var lastColors = get(LocalStorageKeys.LastColors) || [];
  var lastColorsObject = useMemo(function () {
    return lastColors.map(function (color) {
      return {
        name: '',
        value: color,
        isBrightColor: isBrightColor(color)
      };
    });
  }, [lastColors]);
  return /*#__PURE__*/jsx("div", {
    ref: dropdownRef,
    className: styles$1.colorContainer,
    children: /*#__PURE__*/jsx(ToolbarDropdown, {
      control: /*#__PURE__*/jsx(ToolbarButton, _objectSpread$7(_objectSpread$7({
        active: open,
        icon: "textColor"
      }, rest), {}, {
        isDropdown: true
      })),
      open: open,
      onOpen: onToggle,
      onClose: onToggle,
      children: /*#__PURE__*/jsx(ColorPicker, {
        color: selectedColor || color,
        colors: colors,
        customColors: lastColorsObject,
        selectedIcon: /*#__PURE__*/jsx(Icon, {
          name: "check",
          color: isBrightColor(color) ? 'black' : 'white',
          size: 16
        }),
        updateColor: updateColorAndClose,
        updateCustomColor: updateColorAndClose,
        clearColor: clearColor,
        open: open
      })
    })
  });
};
_s24(ColorPickerToolbarDropdown, "+waSn8NouvYt80eMooUXMEHbiyg=", false, function () {
  return [useEventPlateId, usePlateEditorState, usePlateEditorRef, useLocalStorage];
});
_c25 = ColorPickerToolbarDropdown;
function _typeof$7(obj) {
  "@babel/helpers - typeof";

  return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$7(obj);
}
var _excluded$4 = ["id", "type", "clear"];
function ownKeys$6(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$6(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) {
      _defineProperty$7(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
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
function _objectWithoutProperties$4(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$4(source, excluded);
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
function _objectWithoutPropertiesLoose$4(source, excluded) {
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
var MarkToolbarButton = function MarkToolbarButton(_ref) {
  _s25();
  var id = _ref.id,
    type = _ref.type,
    clear = _ref.clear,
    props = _objectWithoutProperties$4(_ref, _excluded$4);
  var editor = usePlateEditorState(useEventPlateId(id));
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsx(ToolbarButton, _objectSpread$6({
      active: !!(editor !== null && editor !== void 0 && editor.selection) && isMarkActive(editor, type),
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMark(editor, {
          key: type,
          clear: clear
        });
        focusEditor(editor);
      }
    }, props))
  });
};
_s25(MarkToolbarButton, "OTWlUl1qFHfBzBzGNRoGRxYytvw=", false, function () {
  return [usePlateEditorState, useEventPlateId];
});
_c26 = MarkToolbarButton;
function _typeof$6(obj) {
  "@babel/helpers - typeof";

  return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$6(obj);
}
var _excluded$3 = ["id"];
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
function _objectWithoutProperties$3(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$3(source, excluded);
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
function _objectWithoutPropertiesLoose$3(source, excluded) {
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
var SelectSignatureDropdown = function SelectSignatureDropdown(_ref) {
  _s26();
  var id = _ref.id,
    props = _objectWithoutProperties$3(_ref, _excluded$3);
  id = useEventPlateId(id);
  var editor = usePlateEditorState(id);
  var editorRef = usePlateEditorRef(id);
  var dropdownRef = useRef(null);
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var _useState = useState(false),
    _useState2 = _slicedToArray$3(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var _useSignatures = useSignatures(),
    data = _useSignatures.data;
  var onToggle = useCallback(function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !open;
    setOpen(value);
  }, [open, setOpen]);
  var selectHandler = useCallback(function (value) {
    if (editorRef && editor && editor.selection) {
      replaceHTMLBlock(editorRef, 'signature', ELEMENT_RAW_HTML_BLOCK, value);
      onToggle();
    }
  }, [editor, editorRef, onToggle]);
  useEffect(function () {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return function () {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);
  return /*#__PURE__*/jsx("div", {
    ref: dropdownRef,
    className: styles$1.sizeContainer,
    children: /*#__PURE__*/jsxs(ToolbarDropdown, {
      control: /*#__PURE__*/jsx(ToolbarButton, _objectSpread$5(_objectSpread$5({
        active: open,
        icon: "signature"
      }, props), {}, {
        isDropdown: true
      })),
      open: open,
      onOpen: onToggle,
      onClose: onToggle,
      children: [(data === null || data === void 0 ? void 0 : data.length) > 0 && /*#__PURE__*/jsxs(Fragment, {
        children: [data.map(function (_ref2) {
          var name = _ref2.name,
            signature = _ref2.signature;
          return /*#__PURE__*/jsx("div", {
            className: styles$1.itemSignature,
            style: {
              cursor: 'pointer',
              fontSize: 13
            },
            onClick: function onClick() {
              return selectHandler(signature);
            },
            children: name
          }, name);
        }), /*#__PURE__*/jsx("div", {
          className: styles$1.separator
        })]
      }), /*#__PURE__*/jsx("div", {
        className: styles$1.itemSignature,
        style: {
          cursor: 'pointer',
          fontSize: 13
        },
        onClick: function onClick() {
          return window.open(baseUrls["development"] + '/app/management/user', '_blank');
        },
        children: (data === null || data === void 0 ? void 0 : data.length) > 0 ? t('signatures.selectToolbarEmail.edit') : t('signatures.selectToolbarEmail.create')
      })]
    })
  });
};
_s26(SelectSignatureDropdown, "UxBZ05dLSvfCtz3qZEhvslRlRIo=", false, function () {
  return [useEventPlateId, usePlateEditorState, usePlateEditorRef, useTranslation, useSignatures];
});
_c27 = SelectSignatureDropdown;
function _typeof$5(obj) {
  "@babel/helpers - typeof";

  return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$5(obj);
}
var _excluded$2 = ["id"];
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
function _slicedToArray$2(arr, i) {
  return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$2();
}
function _nonIterableRest$2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$3(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen);
}
function _arrayLikeToArray$3(arr, len) {
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
function _objectWithoutProperties$2(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$2(source, excluded);
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
function _objectWithoutPropertiesLoose$2(source, excluded) {
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
var SizeDropdownMenu = function SizeDropdownMenu(_ref) {
  _s27();
  var _ref2;
  var id = _ref.id,
    props = _objectWithoutProperties$2(_ref, _excluded$2);
  id = useEventPlateId(id);
  var editor = usePlateEditorState(id);
  var editorRef = usePlateEditorRef(id);
  var dropdownRef = useRef(null);
  var type = getPluginType(editor, MARK_FONT_SIZE);
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'richTextEditor.sizes'
    }),
    t = _useTranslation.t;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray$2(_React$useState, 2),
    open = _React$useState2[0],
    setOpen = _React$useState2[1];
  var fontSize = (_ref2 = editorRef && getMark(editorRef, type)) !== null && _ref2 !== void 0 ? _ref2 : '13px';
  var sizeValues = [{
    name: t('small'),
    value: '10px'
  }, {
    name: t('medium'),
    value: '13px'
  }, {
    name: t('large'),
    value: '16px'
  }, {
    name: t('huge'),
    value: '30px'
  }];
  var onToggle = useCallback(function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !open;
    setOpen(value);
    if (!open) mixpanel.track(MIXPANEL_EVENTS.EDITOR_OPEN_CHANGE_SIZE);
  }, [open, setOpen]);
  var selectHandler = useCallback(function (value) {
    if (editorRef && editor && editor.selection) {
      select$1(editorRef, editor.selection);
      focusEditor(editorRef);
      setMarks(editor, _defineProperty$5({}, type, value));
      onToggle();
    }
  }, [editor, editorRef, type, onToggle]);
  useEffect(function () {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return function () {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);
  return /*#__PURE__*/jsx("div", {
    ref: dropdownRef,
    className: styles$1.sizeContainer,
    children: /*#__PURE__*/jsx(ToolbarDropdown, {
      control: /*#__PURE__*/jsx(ToolbarButton, _objectSpread$4(_objectSpread$4({
        active: open,
        icon: "textEditor"
      }, props), {}, {
        isDropdown: true
      })),
      open: open,
      onOpen: onToggle,
      onClose: onToggle,
      children: sizeValues && sizeValues.map(function (_ref3) {
        var name = _ref3.name,
          value = _ref3.value;
        return /*#__PURE__*/jsx("div", {
          className: styles$1.sizeDropdown,
          style: {
            cursor: 'pointer',
            fontSize: value
          },
          onClick: function onClick() {
            selectHandler(value);
          },
          children: /*#__PURE__*/jsxs("div", {
            className: styles$1.sizeItem,
            children: [fontSize === value && /*#__PURE__*/jsx(Icon, {
              name: "check",
              color: "black",
              size: 16
            }), name]
          })
        }, name);
      })
    })
  });
};
_s27(SizeDropdownMenu, "mY8HzFepLwY3WeB/r8NcZykYwXc=", false, function () {
  return [useEventPlateId, usePlateEditorState, usePlateEditorRef, useTranslation];
});
_c28 = SizeDropdownMenu;
function _typeof$4(obj) {
  "@babel/helpers - typeof";

  return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$4(obj);
}
var _excluded$1 = ["ref"],
  _excluded2 = ["ref"];
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
      _defineProperty$4(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
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
function _objectWithoutProperties$1(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
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
function _objectWithoutPropertiesLoose$1(source, excluded) {
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
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
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
        return value && "object" == _typeof$4(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
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
var EditorToolbar = function EditorToolbar(_ref) {
  var children = _ref.children,
    _ref$backgroundColor = _ref.backgroundColor,
    backgroundColor = _ref$backgroundColor === void 0 ? 'bloobirds' : _ref$backgroundColor,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled;
  var isLinkedinPage = window.location.href.includes('linkedin');
  return /*#__PURE__*/jsx(Toolbar, {
    disabled: disabled,
    backgroundColor: backgroundColor,
    className: isLinkedinPage && styles$1.toolbar,
    children: children
  });
};
_c29 = EditorToolbar;
var EditorToolbarControlsSection = function EditorToolbarControlsSection(_ref2) {
  _s28();
  var color = _ref2.color;
  var editor = useMyPlateEditorRef(useEventPlateId());
  return /*#__PURE__*/jsxs(ToolbarSection, {
    children: [/*#__PURE__*/jsx(ToolbarButton, {
      icon: "undoRevert",
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        editor === null || editor === void 0 ? void 0 : editor.undo();
        focusEditor(editor);
      },
      color: color
    }), /*#__PURE__*/jsx(ToolbarButton, {
      icon: "redoReload",
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        editor === null || editor === void 0 ? void 0 : editor.redo();
        focusEditor(editor);
      },
      color: color
    })]
  });
};
_s28(EditorToolbarControlsSection, "g0wjLC6NuQ5Jxb95aGOXSWF9BUY=", false, function () {
  return [useMyPlateEditorRef, useEventPlateId];
});
_c30 = EditorToolbarControlsSection;
var EditorToolbarFontStylesSection = function EditorToolbarFontStylesSection(_ref3) {
  _s29();
  var color = _ref3.color,
    _ref3$enableChangeSiz = _ref3.enableChangeSize,
    enableChangeSize = _ref3$enableChangeSiz === void 0 ? false : _ref3$enableChangeSiz;
  var editor = useMyPlateEditorRef(useEventPlateId());
  var hasSelection = !!(editor !== null && editor !== void 0 && editor.selection);
  return /*#__PURE__*/jsxs(ToolbarSection, {
    children: [enableChangeSize && /*#__PURE__*/jsx(SizeDropdownMenu, {
      color: color || 'white'
    }), /*#__PURE__*/jsx(ToolbarButton, {
      icon: "header1",
      active: hasSelection && someNode$1(editor, {
        match: {
          type: ELEMENT_H1
        }
      }),
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleNodeType(editor, {
          activeType: ELEMENT_H1
        });
        focusEditor(editor);
      },
      color: color || 'white'
    }), /*#__PURE__*/jsx(ToolbarButton, {
      icon: "header2",
      active: hasSelection && someNode$1(editor, {
        match: {
          type: ELEMENT_H2
        }
      }),
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleNodeType(editor, {
          activeType: ELEMENT_H2
        });
        focusEditor(editor);
      },
      color: color || 'white'
    }), /*#__PURE__*/jsx(ToolbarButton, {
      icon: "quote",
      active: hasSelection && someNode$1(editor, {
        match: {
          type: ELEMENT_BLOCKQUOTE
        }
      }),
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleNodeType(editor, {
          activeType: ELEMENT_BLOCKQUOTE
        });
        focusEditor(editor);
      },
      color: color || 'white'
    })]
  });
};
_s29(EditorToolbarFontStylesSection, "g0wjLC6NuQ5Jxb95aGOXSWF9BUY=", false, function () {
  return [useMyPlateEditorRef, useEventPlateId];
});
_c31 = EditorToolbarFontStylesSection;
var EditorToolbarLink = function EditorToolbarLink(_ref4) {
  _s30();
  var color = _ref4.color,
    editor = _ref4.editor;
  var myPlateEditor = useMyPlateEditorRef(useEventPlateId()) || editor;
  var type = getPluginType(editor, ELEMENT_LINK);
  var hasSelection = !!(editor !== null && editor !== void 0 && editor.selection);
  return /*#__PURE__*/jsx(ToolbarButton, {
    icon: "link",
    color: color || 'white',
    active: hasSelection && someNode$1(myPlateEditor, {
      match: {
        type: type
      }
    }),
    onMouseDown: /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
        var _myPlateEditor$select;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (myPlateEditor) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              event.preventDefault();
              event.stopPropagation();
              focusEditor(myPlateEditor, (_myPlateEditor$select = myPlateEditor.selection) !== null && _myPlateEditor$select !== void 0 ? _myPlateEditor$select : myPlateEditor.prevSelection);
              setTimeout(function () {
                triggerFloatingLink(myPlateEditor, {
                  focused: true
                });
              }, 0);
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref5.apply(this, arguments);
      };
    }()
  });
};
_s30(EditorToolbarLink, "/YUgger795AGR43oPF0MiFga/Cg=", false, function () {
  return [useMyPlateEditorRef, useEventPlateId];
});
_c32 = EditorToolbarLink;
var EditorToolbarSnippet = function EditorToolbarSnippet(_ref6) {
  _s31();
  var onClick = _ref6.onClick;
  var editor = useMyPlateEditorRef(useEventPlateId());
  return /*#__PURE__*/jsx(ToolbarButton, {
    icon: "snippet",
    color: "white",
    onMouseDown: /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(event) {
        var _editor$selection;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (editor) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return");
            case 2:
              onClick === null || onClick === void 0 ? void 0 : onClick();
              event.preventDefault();
              event.stopPropagation();
              focusEditor(editor, (_editor$selection = editor === null || editor === void 0 ? void 0 : editor.selection) !== null && _editor$selection !== void 0 ? _editor$selection : editor === null || editor === void 0 ? void 0 : editor.prevSelection);
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x2) {
        return _ref7.apply(this, arguments);
      };
    }()
  });
};
_s31(EditorToolbarSnippet, "g0wjLC6NuQ5Jxb95aGOXSWF9BUY=", false, function () {
  return [useMyPlateEditorRef, useEventPlateId];
});
_c33 = EditorToolbarSnippet;
var EditorToolbarTextMarksSection = function EditorToolbarTextMarksSection(_ref8) {
  _s32();
  var color = _ref8.color,
    editor = _ref8.editor,
    _ref8$enableChangeCol = _ref8.enableChangeColor,
    enableChangeColor = _ref8$enableChangeCol === void 0 ? false : _ref8$enableChangeCol;
  var myPlateEditor = useMyPlateEditorRef() || editor;
  return /*#__PURE__*/jsxs(ToolbarSection, {
    children: [/*#__PURE__*/jsx(MarkToolbarButton, {
      type: getPluginType(myPlateEditor, MARK_BOLD),
      icon: "textBold",
      color: color || 'white',
      actionHandler: "onMouseDown"
    }), /*#__PURE__*/jsx(MarkToolbarButton, {
      type: getPluginType(myPlateEditor, MARK_ITALIC),
      icon: "textItalic",
      color: color || 'white',
      actionHandler: "onMouseDown"
    }), /*#__PURE__*/jsx(MarkToolbarButton, {
      type: getPluginType(myPlateEditor, MARK_UNDERLINE),
      icon: "textUnderlined",
      color: color || 'white',
      actionHandler: "onMouseDown"
    }), enableChangeColor && /*#__PURE__*/jsx(ColorPickerToolbarDropdown, {
      color: color || 'white'
    }), /*#__PURE__*/jsx(EditorToolbarLink, {
      color: color,
      editor: myPlateEditor
    })]
  });
};
_s32(EditorToolbarTextMarksSection, "pRGNHn8ZEgHFvkHSSRPknuULzgU=", false, function () {
  return [useMyPlateEditorRef];
});
_c34 = EditorToolbarTextMarksSection;
var EditorToolbarListsSection = function EditorToolbarListsSection(_ref9) {
  _s33();
  var color = _ref9.color;
  var editor = useMyPlateEditorRef(useEventPlateId());
  var hasSelection = !!(editor !== null && editor !== void 0 && editor.selection);
  return /*#__PURE__*/jsxs(ToolbarSection, {
    children: [/*#__PURE__*/jsx(ToolbarButton, {
      icon: "textBulletList",
      color: color || 'white',
      active: hasSelection && someNode$1(editor, {
        match: {
          type: ELEMENT_UL
        }
      }),
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleList(editor, {
          type: ELEMENT_UL
        });
        focusEditor(editor);
      }
    }), /*#__PURE__*/jsx(ToolbarButton, {
      icon: "textOrderedList",
      color: color || 'white',
      active: hasSelection && someNode$1(editor, {
        match: {
          type: ELEMENT_OL
        }
      }),
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleList(editor, {
          type: ELEMENT_OL
        });
        focusEditor(editor);
      }
    })]
  });
};
_s33(EditorToolbarListsSection, "g0wjLC6NuQ5Jxb95aGOXSWF9BUY=", false, function () {
  return [useMyPlateEditorRef, useEventPlateId];
});
_c35 = EditorToolbarListsSection;
var EditorToolbarSection = function EditorToolbarSection(_ref10) {
  var children = _ref10.children;
  return /*#__PURE__*/jsx(ToolbarSection, {
    children: children
  });
};
_c36 = EditorToolbarSection;
var EditorToolbarImage = function EditorToolbarImage(_ref11) {
  _s34();
  var _ref11$color = _ref11.color,
    color = _ref11$color === void 0 ? 'white' : _ref11$color,
    editor = _ref11.editor;
  var myPlateEditorRef = useMyPlateEditorRef(useEventPlateId());
  var myPlateEditor = myPlateEditorRef || editor;
  var lastSelection = useRef(null);
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'richTextEditor.toasts'
    }),
    t = _useTranslation.t;
  var isFocused = !!myPlateEditorRef && !!(myPlateEditor !== null && myPlateEditor !== void 0 && myPlateEditor.selection) && isCollapsed(myPlateEditor.selection);
  useEffect(function () {
    var handleSelectionChange = function handleSelectionChange() {
      if (myPlateEditor !== null && myPlateEditor !== void 0 && myPlateEditor.selection) {
        lastSelection.current = myPlateEditor.selection;
      }
    };
    document.addEventListener('selectionchange', handleSelectionChange);
    return function () {
      return document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [myPlateEditor]);
  var addImage = /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(event) {
      var _response$data;
      var file, formData, response, newNode;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            file = event.target.files[0];
            if (!(!file || !file.type.startsWith('image/'))) {
              _context3.next = 3;
              break;
            }
            return _context3.abrupt("return");
          case 3:
            formData = new FormData();
            formData.append('file', file);
            formData.append('visible', 'true');
            _context3.next = 8;
            return api.post('/messaging/mediaFiles', formData, {
              validateStatus: function validateStatus() {
                return true;
              },
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
          case 8:
            response = _context3.sent;
            if (response.status === 201) {
              if (!isFocused) {
                newNode = {
                  type: ELEMENT_PARAGRAPH$1,
                  children: [{
                    text: ''
                  }]
                }; // @ts-ignore
                insertNodes$1(editor, newNode, {
                  at: [0]
                });
                insertImage(myPlateEditor, response.data.url, {
                  at: [0]
                });
              } else {
                if (lastSelection.current) {
                  select$1(myPlateEditor, lastSelection.current);
                }
                insertImage(myPlateEditor, response.data.url);
              }
            } else if (response.status === 500 && (_response$data = response.data) !== null && _response$data !== void 0 && _response$data.message.includes('SizeLimitExceededException')) {
              createToast({
                message: t('sizeError'),
                type: 'error'
              });
            } else {
              createToast({
                message: t('uploadAttachmentError'),
                type: 'error'
              });
            }
          case 10:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function addImage(_x3) {
      return _ref12.apply(this, arguments);
    };
  }();

  // This allows selecting the same image twice
  var resetSelectedImage = function resetSelectedImage(event) {
    event.target.value = null;
  };
  return /*#__PURE__*/jsxs("label", {
    className: styles$1.label,
    htmlFor: "insert-image",
    children: [/*#__PURE__*/jsx(Icon, {
      name: "image",
      size: 20,
      color: color
    }), /*#__PURE__*/jsx("input", {
      type: "file",
      id: "insert-image",
      name: "insert-image",
      "data-test": "insert-image",
      onClick: resetSelectedImage,
      onChange: addImage,
      className: styles$1.input,
      accept: ".png, .jpeg, .gif, .jpg",
      multiple: false
    })]
  });
};
_s34(EditorToolbarImage, "RJWsXUPKES+buTAWz6Ijb8Wlz4w=", false, function () {
  return [useMyPlateEditorRef, useEventPlateId, useToasts, useTranslation];
});
_c37 = EditorToolbarImage;
var TemplateEditorToolbarImage = function TemplateEditorToolbarImage(_ref13) {
  _s35();
  var _ref13$color = _ref13.color,
    color = _ref13$color === void 0 ? 'white' : _ref13$color;
  var eventPlateId = useEventPlateId();
  var myPlateEditor = useMyPlateEditorRef(eventPlateId);
  var lastSelection = useRef(null);
  var _useToasts2 = useToasts(),
    createToast = _useToasts2.createToast;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'richTextEditor.toasts'
    }),
    t = _useTranslation2.t;
  useEffect(function () {
    var handleSelectionChange = function handleSelectionChange() {
      if (myPlateEditor !== null && myPlateEditor !== void 0 && myPlateEditor.selection) {
        lastSelection.current = myPlateEditor.selection;
      }
    };
    document.addEventListener('selectionchange', handleSelectionChange);
    return function () {
      return document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [myPlateEditor]);
  var addImage = /*#__PURE__*/function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(event) {
      var _response$data2;
      var file, formData, response;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            file = event.target.files[0];
            if (!(!file || !file.type.startsWith('image/'))) {
              _context4.next = 3;
              break;
            }
            return _context4.abrupt("return");
          case 3:
            formData = new FormData();
            formData.append('file', file);
            formData.append('visible', 'true');
            _context4.next = 8;
            return api.post('/messaging/mediaFiles', formData, {
              validateStatus: function validateStatus() {
                return true;
              },
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
          case 8:
            response = _context4.sent;
            if (response.status === 201) {
              if (lastSelection !== null && lastSelection !== void 0 && lastSelection.current) {
                select$1(myPlateEditor, lastSelection.current);
              }
              insertImage(myPlateEditor, response.data.url);
            } else if (response.status === 500 && (_response$data2 = response.data) !== null && _response$data2 !== void 0 && _response$data2.message.includes('SizeLimitExceededException')) {
              createToast({
                message: t('sizerError'),
                type: 'error'
              });
            } else {
              createToast({
                message: t('uploadAttachmentError'),
                type: 'error'
              });
            }
          case 10:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function addImage(_x4) {
      return _ref14.apply(this, arguments);
    };
  }();

  // This allows selecting the same image twice
  var resetSelectedImage = function resetSelectedImage(event) {
    event.target.value = null;
  };
  return /*#__PURE__*/jsxs("label", {
    className: styles$1.label,
    htmlFor: "insert-image-2",
    children: [/*#__PURE__*/jsx(Icon, {
      name: "image",
      size: 20,
      color: color
    }), /*#__PURE__*/jsx("input", {
      type: "file",
      id: "insert-image-2",
      name: "insert-image-2",
      "data-test": "insert-image-2",
      onClick: function onClick(event) {
        return resetSelectedImage(event);
      },
      onChange: addImage,
      className: styles$1.input,
      accept: ".png, .jpeg, .gif, .jpg",
      multiple: false
    })]
  });
};
_s35(TemplateEditorToolbarImage, "NABD0WliiAOcFxNKMHJx9SOEH8w=", false, function () {
  return [useEventPlateId, useMyPlateEditorRef, useToasts, useTranslation];
});
_c38 = TemplateEditorToolbarImage;
var EditorToolbarFileAttachment = function EditorToolbarFileAttachment(_ref15) {
  var _ref15$color = _ref15.color,
    color = _ref15$color === void 0 ? 'white' : _ref15$color,
    onAttachment = _ref15.onAttachment;
  return /*#__PURE__*/jsxs("label", {
    className: styles$1.label,
    htmlFor: "file-attachment",
    children: [/*#__PURE__*/jsx(Icon, {
      name: "paperclip",
      size: 20,
      color: color
    }), /*#__PURE__*/jsx("input", {
      type: "file",
      id: "file-attachment",
      name: "file-attachment",
      "data-test": "file-attachment",
      onChange: function onChange(event) {
        onAttachment(Array.from(event.target.files));
        event.target.value = null;
      },
      className: styles$1.input,
      multiple: true
    })]
  });
};
_c39 = EditorToolbarFileAttachment;
var EditorToolbarTimeSlots = function EditorToolbarTimeSlots(_ref16) {
  var _ref16$color = _ref16.color,
    color = _ref16$color === void 0 ? 'white' : _ref16$color,
    toggleTimeSlots = _ref16.toggleTimeSlots;
  return /*#__PURE__*/jsx("div", {
    className: styles$1.timeSlotsButton,
    children: /*#__PURE__*/jsx(IconButton, {
      name: "meetingSlots",
      color: color,
      size: 20,
      onClick: toggleTimeSlots
    })
  });
};
_c40 = EditorToolbarTimeSlots;
var TemplateEditorToolbarFileAttachment = function TemplateEditorToolbarFileAttachment(_ref17) {
  var _ref17$color = _ref17.color,
    color = _ref17$color === void 0 ? 'white' : _ref17$color,
    onAttachment = _ref17.onAttachment;
  return /*#__PURE__*/jsxs("label", {
    className: styles$1.label,
    htmlFor: "file-attachment-2",
    children: [/*#__PURE__*/jsx(Icon, {
      name: "paperclip",
      size: 20,
      color: color
    }), /*#__PURE__*/jsx("input", {
      type: "file",
      id: "file-attachment-2",
      name: "file-attachment-2",
      "data-test": "file-attachment-2",
      onChange: function onChange(event) {
        onAttachment(Array.from(event.target.files));
        event.target.value = null;
      },
      className: styles$1.input,
      multiple: true
    })]
  });
};
_c41 = TemplateEditorToolbarFileAttachment;
var EditorToolbarTemplateVariable = function EditorToolbarTemplateVariable(_ref18) {
  _s36();
  var _ref18$disableEmpty = _ref18.disableEmpty,
    disableEmpty = _ref18$disableEmpty === void 0 ? false : _ref18$disableEmpty,
    editor = _ref18.editor;
  var myPlateEditorRef = useMyPlateEditorRef(useEventPlateId());
  var myPlateEditor = myPlateEditorRef || editor;
  var _useVisible = useVisible(false),
    ref = _useVisible.ref,
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  var emailVariables = useBaseEmailVariables();
  var emailValues = useBaseEmailVariableValue();
  var isDisableVariable = function isDisableVariable(group, variable) {
    var _emailValues$group;
    return disableEmpty && !((_emailValues$group = emailValues[group]) !== null && _emailValues$group !== void 0 && _emailValues$group.find(function (value) {
      return variable.id === value.id;
    }).value);
  };
  var _useTranslation3 = useTranslation('translation', {
      keyPrefix: 'richTextEditor.variables'
    }),
    t = _useTranslation3.t;
  var isFocused = !!myPlateEditorRef && !!(myPlateEditor !== null && myPlateEditor !== void 0 && myPlateEditor.selection) && isCollapsed(myPlateEditor.selection);
  useEffect(function () {
    if (visible) {
      removeScrollOfBox();
    }
    if (!visible) {
      recoverScrollOfBox();
    }
  }, [visible]);
  return /*#__PURE__*/jsx("div", {
    className: styles$1.templateVariable,
    children: /*#__PURE__*/jsx(ToolbarMenu, {
      ref: ref,
      icon: "textVariable",
      width: 200,
      visible: visible
      // @ts-ignore
      ,

      onClick: function onClick(event) {
        event.preventDefault();
        event.stopPropagation();
        setVisible(!visible);
      },
      children: /*#__PURE__*/jsx("div", {
        className: styles$1.variableList,
        children: emailVariables && Object.entries(emailVariables).map(function (_ref19) {
          var _ref20 = _slicedToArray$1(_ref19, 2),
            group = _ref20[0],
            variables = _ref20[1];
          return /*#__PURE__*/jsxs(Fragment$1, {
            children: [/*#__PURE__*/jsx(Section, {
              children: toTitleCase(t(group.toLowerCase()))
            }), variables.map(function (variable) {
              return /*#__PURE__*/jsx(Item, {
                disabled: isDisableVariable(group, variable),
                onMouseDown: function onMouseDown(event) {
                  if (!isDisableVariable(group, variable)) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (!isFocused) {
                      insertTemplateVariable(myPlateEditor, {
                        id: variable.id,
                        name: variable.name,
                        group: variable.type
                      }, {
                        at: [0, 0]
                      });
                    } else {
                      insertTemplateVariable(myPlateEditor, {
                        id: variable.id,
                        name: variable.name,
                        group: variable.type
                      });
                    }
                    setVisible(false);
                  }
                },
                children: variable.name
              }, variable.id);
            })]
          }, group);
        })
      })
    })
  });
};
_s36(EditorToolbarTemplateVariable, "rOnW+4sAK70y6za7aGeP/6XNGX4=", false, function () {
  return [useMyPlateEditorRef, useEventPlateId, useVisible, useBaseEmailVariables, useBaseEmailVariableValue, useTranslation];
});
_c42 = EditorToolbarTemplateVariable;
var FloatingTemplateVariable = function FloatingTemplateVariable(_ref21) {
  _s37();
  var _ref21$disableEmpty = _ref21.disableEmpty,
    disableEmpty = _ref21$disableEmpty === void 0 ? false : _ref21$disableEmpty,
    editor = _ref21.editor;
  var _useVisible2 = useVisible(false),
    ref = _useVisible2.ref,
    visible = _useVisible2.visible,
    setVisible = _useVisible2.setVisible;
  var emailVariables = useBaseEmailVariables();
  var emailValues = useBaseEmailVariableValue();
  var _useTranslation4 = useTranslation('translation', {
      keyPrefix: 'richTextEditor.variables'
    }),
    t = _useTranslation4.t;
  var isDisableVariable = function isDisableVariable(group, variable) {
    var _emailValues$group2;
    return disableEmpty && !((_emailValues$group2 = emailValues[group]) !== null && _emailValues$group2 !== void 0 && _emailValues$group2.find(function (value) {
      return variable.id === value.id;
    }).value);
  };
  useEffect(function () {
    if (visible) {
      removeScrollOfBox();
    }
    if (!visible) {
      recoverScrollOfBox();
    }
  }, [visible]);
  return /*#__PURE__*/jsx(Dropdown, {
    ref: ref,
    visible: visible,
    position: "bottom",
    width: 200,
    anchor: /*#__PURE__*/jsx(IconButton, {
      className: styles$1.floatingTemplateVariable,
      name: "textVariable",
      onClick: function onClick(event) {
        event.preventDefault();
        event.stopPropagation();
        setVisible(!visible);
      }
    }),
    children: /*#__PURE__*/jsx("div", {
      className: styles$1.variableList,
      children: emailVariables && Object.entries(emailVariables).map(function (_ref22) {
        var _ref23 = _slicedToArray$1(_ref22, 2),
          group = _ref23[0],
          variables = _ref23[1];
        return /*#__PURE__*/jsxs(Fragment$1, {
          children: [/*#__PURE__*/jsx(Section, {
            children: toTitleCase(t(group.toLowerCase()))
          }), variables.map(function (variable) {
            return /*#__PURE__*/jsx(Item, {
              disabled: isDisableVariable(group, variable),
              onMouseDown: function onMouseDown(event) {
                if (!isDisableVariable(group, variable)) {
                  event.preventDefault();
                  event.stopPropagation();
                  insertTemplateVariable(editor, {
                    id: variable.id,
                    name: variable.name,
                    group: variable.type
                  });
                  setVisible(false);
                }
              },
              children: variable.name
            }, variable.id);
          })]
        }, group);
      })
    })
  });
};
_s37(FloatingTemplateVariable, "niwZVcl21oy+LPXPxmzDevP5ZZk=", false, function () {
  return [useVisible, useBaseEmailVariables, useBaseEmailVariableValue, useTranslation];
});
_c43 = FloatingTemplateVariable;
function getDefaultLink(meetingLinks, t) {
  if (!meetingLinks || (meetingLinks === null || meetingLinks === void 0 ? void 0 : meetingLinks.length) === 0) return t('noMeetingLinks');
  return meetingLinks === null || meetingLinks === void 0 ? void 0 : meetingLinks.find(function (meetingLink) {
    return meetingLink.defaultLink;
  });
}
var EditorToolbarMeetingLink = function EditorToolbarMeetingLink(_ref24) {
  _s38();
  var _Object$keys;
  var _ref24$color = _ref24.color,
    color = _ref24$color === void 0 ? 'white' : _ref24$color,
    editor = _ref24.editor;
  var _useForm = useForm(),
    control = _useForm.control,
    handleSubmit = _useForm.handleSubmit,
    reset = _useForm.reset,
    errors = _useForm.formState.errors;
  // @ts-ignore
  var _ref25 = useUserSearch() || [],
    users = _ref25.users;
  var activeUserId = useActiveUserId();
  var activeUsers = users === null || users === void 0 ? void 0 : users.filter(function (_ref26) {
    var active = _ref26.active,
      id = _ref26.id;
    return active && activeUserId !== id;
  });
  var _useState = useState(true),
    _useState2 = _slicedToArray$1(_useState, 2),
    linkOwner = _useState2[0],
    setLinkOwner = _useState2[1];
  var myPlateEditorRef = useMyPlateEditorRef(useEventPlateId());
  var myPlateEditor = myPlateEditorRef || editor;
  var type = getPluginType(myPlateEditor, ELEMENT_MEETING_LINK);
  var _useVisible3 = useVisible(false),
    ref = _useVisible3.ref,
    visible = _useVisible3.visible,
    setVisible = _useVisible3.setVisible;
  var _useState3 = useState(),
    _useState4 = _slicedToArray$1(_useState3, 2),
    selectedUser = _useState4[0],
    setSelectedUser = _useState4[1];
  var _useMeetingLinks = useMeetingLinks(),
    getUserMeetingLinks = _useMeetingLinks.getUserMeetingLinks;
  var meetingLinks = getUserMeetingLinks(selectedUser || activeUserId);
  var _useTranslation5 = useTranslation('translation', {
      keyPrefix: 'richTextEditor.meetingLinks'
    }),
    t = _useTranslation5.t;
  var defaultLink = getDefaultLink(meetingLinks, t);
  var isFocused = !!myPlateEditorRef && !!(myPlateEditor !== null && myPlateEditor !== void 0 && myPlateEditor.selection) && isCollapsed(myPlateEditor.selection);
  function resetValues() {
    reset({
      displayText: ''
    });
    setLinkOwner(true);
    setSelectedUser(undefined);
  }
  useEffect(function () {
    if (visible) {
      removeScrollOfBox();
    }
    if (!visible) {
      resetValues();
      recoverScrollOfBox();
    }
  }, [visible]);
  var _useController = useController({
      control: control,
      name: 'displayText',
      rules: {
        required: true
      }
    }),
    _useController$field = _useController.field,
    textRef = _useController$field.ref,
    textField = _objectWithoutProperties$1(_useController$field, _excluded$1);
  var _useController2 = useController({
      control: control,
      name: 'meetingLink',
      rules: {
        required: true
      }
    }),
    _useController2$field = _useController2.field,
    meetingLink = _useController2$field.value,
    meetingLinkOnChange = _useController2$field.onChange;
  useEffect(function () {
    reset({
      meetingLink: defaultLink === null || defaultLink === void 0 ? void 0 : defaultLink.id
    });
  }, [defaultLink, visible]);
  var handleAddMeetingLink = /*#__PURE__*/function () {
    var _ref27 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(data, event) {
      var meetingLink;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            if (myPlateEditor) {
              _context5.next = 2;
              break;
            }
            return _context5.abrupt("return");
          case 2:
            event.preventDefault();
            meetingLink = {
              type: type,
              userId: selectedUser || '__me__',
              linkId: (data === null || data === void 0 ? void 0 : data.meetingLink) === (defaultLink === null || defaultLink === void 0 ? void 0 : defaultLink.id) && !selectedUser ? '__default__' : data === null || data === void 0 ? void 0 : data.meetingLink,
              children: [{
                text: data === null || data === void 0 ? void 0 : data.displayText
              }]
            };
            if (!isFocused) {
              focusEditor(myPlateEditor);
              setTimeout(function () {
                // @ts-ignore
                insertNodes$1(myPlateEditorRef, meetingLink);
              }, 100);
            } else {
              // @ts-ignore
              insertNodes$1(myPlateEditor, meetingLink);
            }
            setVisible(false);
          case 6:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function handleAddMeetingLink(_x5, _x6) {
      return _ref27.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/jsx("div", {
    className: styles$1.meetingLinkButton,
    children: /*#__PURE__*/jsx(Dropdown, {
      ref: ref,
      visible: visible,
      anchor: /*#__PURE__*/jsx(IconButton, {
        name: "calendar",
        color: color,
        size: 20,
        onClick: function onClick() {
          return setVisible(!visible);
        }
      }),
      children: /*#__PURE__*/jsx("form", {
        children: /*#__PURE__*/jsxs("div", {
          className: styles$1.meetingLinksDropdownWrapper,
          children: [/*#__PURE__*/jsx(Text, {
            size: "m",
            className: styles$1.meetingLinksHeader,
            children: t('title')
          }), /*#__PURE__*/jsx("div", {
            className: styles$1.meetingLinksTextDisplayInput,
            children: /*#__PURE__*/jsx(Input, _objectSpread$3({
              ref: textRef,
              placeholder: t('placeholder'),
              size: "small",
              width: '273px',
              error: (errors === null || errors === void 0 ? void 0 : errors.displayText) && t('required')
            }, textField))
          }), /*#__PURE__*/jsx(Text, {
            size: "m",
            className: styles$1.meetingLinksHeader,
            children: t('linkTo')
          }), /*#__PURE__*/jsx("div", {
            className: styles$1.radioGroup,
            children: /*#__PURE__*/jsxs(RadioGroup, {
              defaultValue: linkOwner,
              onChange: function onChange(value) {
                setLinkOwner(value);
                if (value) setSelectedUser(activeUserId);
              },
              children: [/*#__PURE__*/jsx(Radio, {
                size: "small",
                value: true,
                expand: true,
                children: /*#__PURE__*/jsx(Text, {
                  size: "s",
                  children: t('myMeetingLinks')
                })
              }), /*#__PURE__*/jsx(Radio, {
                size: "small",
                value: false,
                expand: true,
                children: /*#__PURE__*/jsx(Text, {
                  size: "s",
                  children: t('otherMeetingLinks')
                })
              })]
            })
          }), /*#__PURE__*/jsxs("div", {
            className: styles$1.dropdownSelects,
            children: [!linkOwner && /*#__PURE__*/jsx(Select, {
              placeholder: t('user'),
              size: "small",
              borderless: false,
              width: '273px',
              value: selectedUser,
              onChange: setSelectedUser,
              children: activeUsers === null || activeUsers === void 0 ? void 0 : activeUsers.map(function (_ref28) {
                var id = _ref28.id,
                  name = _ref28.name;
                return /*#__PURE__*/jsx(Item, {
                  value: id,
                  children: name
                }, id);
              })
            }), typeof defaultLink === 'string' && selectedUser ? /*#__PURE__*/jsx(Text, {
              size: "s",
              children: defaultLink
            }) : /*#__PURE__*/jsx(Select, {
              placeholder: t('meetingLink'),
              size: "small",
              borderless: false,
              width: '273px',
              disabled: !selectedUser && !linkOwner,
              error: (errors === null || errors === void 0 ? void 0 : errors.meetingLink) && t('required'),
              value: meetingLink,
              onChange: meetingLinkOnChange,
              children: meetingLinks === null || meetingLinks === void 0 ? void 0 : meetingLinks.map(function (_ref29) {
                var id = _ref29.id,
                  title = _ref29.title;
                return /*#__PURE__*/jsx(Item, {
                  value: id,
                  children: title
                }, id);
              })
            })]
          }), /*#__PURE__*/jsx("div", {
            className: styles$1.addButton,
            children: /*#__PURE__*/jsx(Button$1, {
              size: "small",
              disabled: errors && ((_Object$keys = Object.keys(errors)) === null || _Object$keys === void 0 ? void 0 : _Object$keys.length) > 0 || typeof defaultLink === 'string',
              onClick: handleSubmit(handleAddMeetingLink),
              children: t('add')
            })
          })]
        })
      })
    })
  });
};
_s38(EditorToolbarMeetingLink, "D8TjibgcaxVNsAw4VYfSiaNajC4=", false, function () {
  return [useForm, useUserSearch, useActiveUserId, useMyPlateEditorRef, useEventPlateId, useVisible, useMeetingLinks, useTranslation, useController, useController];
});
_c44 = EditorToolbarMeetingLink;
var TemplateEditorToolbarMeetingLink = function TemplateEditorToolbarMeetingLink(_ref30) {
  _s39();
  var _Object$keys2;
  var _ref30$color = _ref30.color,
    color = _ref30$color === void 0 ? 'white' : _ref30$color;
  var _useForm2 = useForm(),
    control = _useForm2.control,
    handleSubmit = _useForm2.handleSubmit,
    reset = _useForm2.reset,
    errors = _useForm2.formState.errors;
  // @ts-ignore
  var _ref31 = useUserSearch() || [],
    users = _ref31.users;
  var activeUserId = useActiveUserId();
  var activeUsers = users === null || users === void 0 ? void 0 : users.filter(function (_ref32) {
    var active = _ref32.active;
    return active;
  });
  var _useState5 = useState(true),
    _useState6 = _slicedToArray$1(_useState5, 2),
    linkOwner = _useState6[0],
    setLinkOwner = _useState6[1];
  var editor = useMyPlateEditorRef(useEventPlateId());
  var type = getPluginType(editor, ELEMENT_MEETING_LINK);
  var _useVisible4 = useVisible(false),
    ref = _useVisible4.ref,
    visible = _useVisible4.visible,
    setVisible = _useVisible4.setVisible;
  var _useState7 = useState(),
    _useState8 = _slicedToArray$1(_useState7, 2),
    selectedUser = _useState8[0],
    setSelectedUser = _useState8[1];
  var _useMeetingLinks2 = useMeetingLinks(),
    getUserMeetingLinks = _useMeetingLinks2.getUserMeetingLinks;
  var meetingLinks = getUserMeetingLinks(selectedUser || activeUserId);
  var _useTranslation6 = useTranslation('translation', {
      keyPrefix: 'richTextEditor.meetingLinks'
    }),
    t = _useTranslation6.t;
  var defaultLink = getDefaultLink(meetingLinks, t);
  function resetValues() {
    reset({
      displayText: ''
    });
    setLinkOwner(true);
    setSelectedUser(undefined);
  }
  useEffect(function () {
    if (visible) {
      removeScrollOfBox();
    }
    if (!visible) {
      resetValues();
      recoverScrollOfBox();
    }
  }, [visible]);
  var _useController3 = useController({
      control: control,
      name: 'displayText',
      rules: {
        required: true
      }
    }),
    _useController3$field = _useController3.field,
    textRef = _useController3$field.ref,
    textField = _objectWithoutProperties$1(_useController3$field, _excluded2);
  var _useController4 = useController({
      control: control,
      name: 'meetingLink'
    }),
    _useController4$field = _useController4.field,
    meetingLink = _useController4$field.value,
    meetingLinkOnChange = _useController4$field.onChange;
  useEffect(function () {
    reset({
      meetingLink: defaultLink === null || defaultLink === void 0 ? void 0 : defaultLink.id
    });
  }, [defaultLink]);
  useEffect(function () {
    if (!linkOwner && selectedUser && (meetingLinks === null || meetingLinks === void 0 ? void 0 : meetingLinks.length) > 0) {
      var _meetingLinks$;
      meetingLinkOnChange((_meetingLinks$ = meetingLinks[0]) === null || _meetingLinks$ === void 0 ? void 0 : _meetingLinks$.id);
    }
  }, [meetingLinks === null || meetingLinks === void 0 ? void 0 : meetingLinks.length, linkOwner, selectedUser]);
  useEffect(function () {
    setSelectedUser(activeUserId);
  }, [activeUserId]);
  var handleAddMeetingLink = /*#__PURE__*/function () {
    var _ref33 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(data, event) {
      var meetingLink;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            if (editor) {
              _context6.next = 2;
              break;
            }
            return _context6.abrupt("return");
          case 2:
            event.preventDefault();
            meetingLink = {
              type: type,
              userId: selectedUser || '__me__',
              linkId: (data === null || data === void 0 ? void 0 : data.meetingLink) === (defaultLink === null || defaultLink === void 0 ? void 0 : defaultLink.id) && !selectedUser ? '__default__' : data === null || data === void 0 ? void 0 : data.meetingLink,
              children: [{
                text: data === null || data === void 0 ? void 0 : data.displayText
              }]
            };
            setVisible(false);
            // @ts-ignore
            insertNodes$1(editor, meetingLink);
          case 6:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return function handleAddMeetingLink(_x7, _x8) {
      return _ref33.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/jsx("div", {
    className: styles$1.meetingLinkButton,
    children: /*#__PURE__*/jsx(Dropdown, {
      ref: ref,
      visible: visible,
      width: 321,
      anchor: /*#__PURE__*/jsx(IconButton, {
        name: "calendar",
        color: color,
        size: 20,
        onClick: function onClick() {
          reset();
          setVisible(!visible);
        }
      }),
      children: /*#__PURE__*/jsx("form", {
        children: /*#__PURE__*/jsxs("div", {
          className: styles$1.templateMeetingLinksDropdownWrapper,
          children: [/*#__PURE__*/jsx(Text, {
            size: "m",
            className: styles$1.meetingLinksHeader,
            children: t('title')
          }), /*#__PURE__*/jsx("div", {
            className: styles$1.meetingLinksTextDisplayInput,
            children: /*#__PURE__*/jsx(Input, _objectSpread$3({
              placeholder: t('placeholder'),
              size: "small",
              width: '273px',
              ref: textRef,
              error: (errors === null || errors === void 0 ? void 0 : errors.displayText) && t('required')
            }, textField))
          }), /*#__PURE__*/jsx(Text, {
            size: "m",
            className: styles$1.meetingLinksHeader,
            children: t('linkTo')
          }), /*#__PURE__*/jsx("div", {
            className: styles$1.radioGroup,
            children: /*#__PURE__*/jsxs(RadioGroup, {
              defaultValue: linkOwner,
              onChange: function onChange(value) {
                setLinkOwner(value);
                if (value) setSelectedUser(activeUserId);
              },
              children: [/*#__PURE__*/jsx(Radio, {
                size: "small",
                value: true,
                expand: true,
                children: /*#__PURE__*/jsx(Text, {
                  size: "s",
                  children: t('sendersMeetingLinks')
                })
              }), /*#__PURE__*/jsx(Radio, {
                size: "small",
                value: false,
                expand: true,
                children: /*#__PURE__*/jsx(Text, {
                  size: "s",
                  children: t('specificUsersMeetingLinks')
                })
              })]
            })
          }), /*#__PURE__*/jsx("div", {
            className: styles$1.dropdownSelects,
            children: !linkOwner && /*#__PURE__*/jsxs(Fragment, {
              children: [/*#__PURE__*/jsx(Select, {
                placeholder: t('user'),
                size: "small",
                borderless: false,
                width: '273px',
                value: selectedUser,
                onChange: setSelectedUser,
                children: activeUsers === null || activeUsers === void 0 ? void 0 : activeUsers.map(function (_ref34) {
                  var id = _ref34.id,
                    name = _ref34.name;
                  return /*#__PURE__*/jsx(Item, {
                    value: id,
                    children: id === activeUserId ? "".concat(name, " (").concat(t('you'), ")") : name
                  }, id);
                })
              }), /*#__PURE__*/jsx(Select, {
                placeholder: t('meetingLink'),
                size: "small",
                borderless: false,
                width: '273px',
                disabled: meetingLinks.length === 0 || !selectedUser && !linkOwner,
                error: (errors === null || errors === void 0 ? void 0 : errors.meetingLink) && t('required'),
                value: meetingLink,
                onChange: meetingLinkOnChange,
                children: meetingLinks === null || meetingLinks === void 0 ? void 0 : meetingLinks.map(function (_ref35) {
                  var id = _ref35.id,
                    title = _ref35.title;
                  return /*#__PURE__*/jsx(Item, {
                    value: id,
                    children: title
                  }, id);
                })
              })]
            })
          }), /*#__PURE__*/jsxs("div", {
            className: styles$1.templateMeetingLinkCallout,
            children: [/*#__PURE__*/jsx(Icon, {
              name: "alertTriangle",
              color: "banana",
              size: 24
            }), /*#__PURE__*/jsx(Text, {
              size: "xs",
              children: t('alertMessage')
            })]
          }), /*#__PURE__*/jsx("div", {
            className: styles$1.addButton,
            children: /*#__PURE__*/jsx(Button$1, {
              size: "small",
              disabled: errors && ((_Object$keys2 = Object.keys(errors)) === null || _Object$keys2 === void 0 ? void 0 : _Object$keys2.length) > 0 || linkOwner && (!defaultLink || typeof defaultLink === 'string') || !linkOwner && !meetingLink,
              onClick: handleSubmit(handleAddMeetingLink),
              children: t('add')
            })
          })]
        })
      })
    })
  });
};
_s39(TemplateEditorToolbarMeetingLink, "0oyKgmNDXNreNvFEnu06ZSUFGRI=", false, function () {
  return [useForm, useUserSearch, useActiveUserId, useMyPlateEditorRef, useEventPlateId, useVisible, useMeetingLinks, useTranslation, useController, useController];
});
_c45 = TemplateEditorToolbarMeetingLink;
var EditorToolbarSelectSignatureSection = function EditorToolbarSelectSignatureSection(_ref36) {
  var color = _ref36.color;
  return /*#__PURE__*/jsx("div", {
    style: {
      marginLeft: '8px',
      display: 'flex'
    },
    children: /*#__PURE__*/jsx(SelectSignatureDropdown, {
      color: color || 'white'
    })
  });
};
_c46 = EditorToolbarSelectSignatureSection;
var _createPlateUI;
function _typeof$3(obj) {
  "@babel/helpers - typeof";

  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$3(obj);
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
var components = createPlateUI((_createPlateUI = {}, _defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_createPlateUI, ELEMENT_TEMPLATE_VARIABLE, TemplateVariable), ELEMENT_MISSING_VARIABLE, MissingVariable), ELEMENT_MISSING_MEETING_LINK, MissingMeetingLink), ELEMENT_MEETING_LINK, MeetingLink), ELEMENT_RAW_HTML_BLOCK, RawHTMLBlock), ELEMENT_SLOTS_FORM, SlotsBlock), ELEMENT_REPLY_HISTORY, ReplyHistory), ELEMENT_IMAGE, ImageElement), ELEMENT_IMAGE_LINK, ImageLink), ELEMENT_H1, withProps(StyledElement, {
  as: 'h1',
  className: styles$9.h1
})), _defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_createPlateUI, ELEMENT_H2, withProps(StyledElement, {
  as: 'h2',
  className: styles$9.h2
})), ELEMENT_UL, withProps(StyledElement, {
  as: 'ul',
  className: styles$9.ul
})), ELEMENT_OL, withProps(StyledElement, {
  as: 'ol',
  className: styles$9.ol
})), ELEMENT_PARAGRAPH$1, withProps(StyledElement, {
  as: 'div',
  className: styles$9.p
}))));
var MarkBalloonToolbar = function MarkBalloonToolbar(_ref) {
  _s40();
  var id = _ref.id,
    children = _ref.children;
  var editor = useMyPlateEditorRef(id);
  var arrow = false;
  var theme = 'light';
  var buttons = [{
    type: getPluginType(editor, MARK_BOLD),
    icon: /*#__PURE__*/jsx(Icon, {
      name: "textBold"
    }),
    title: 'Bold'
  }, {
    type: getPluginType(editor, MARK_ITALIC),
    icon: /*#__PURE__*/jsx(Icon, {
      name: "textItalic"
    }),
    title: 'Italic'
  }, {
    type: getPluginType(editor, MARK_UNDERLINE),
    icon: /*#__PURE__*/jsx(Icon, {
      name: "textUnderlined"
    }),
    title: 'Underline'
  }];
  var renderMarkButton = function renderMarkButton(index, type, icon, title) {
    return /*#__PURE__*/jsx(Tooltip, {
      title: title,
      position: "top",
      children: /*#__PURE__*/jsx("div", {
        className: styles$9.svgs,
        children: /*#__PURE__*/jsx(MarkToolbarButton$1, {
          type: type,
          icon: icon,
          actionHandler: "onMouseDown"
        })
      })
    }, index);
  };
  var renderButtons = function renderButtons() {
    return buttons.map(function (button, index) {
      return renderMarkButton(index, button.type, button.icon, button.title);
    });
  };
  return /*#__PURE__*/jsx("div", {
    className: styles$9.svgs,
    children: /*#__PURE__*/jsxs(BalloonToolbar, {
      theme: theme,
      arrow: arrow,
      children: [renderButtons(), children]
    })
  });
};
_s40(MarkBalloonToolbar, "A6OBpJBAaZeRLakVpSaXzKqxVWM=", false, function () {
  return [useMyPlateEditorRef];
});
_c47 = MarkBalloonToolbar;
var SaveSnippetButton = function SaveSnippetButton(_ref) {
  _s41();
  var saveSnippetCallback = _ref.saveSnippetCallback;
  var test = useMyPlateEditorRef();
  var selectedNode = usePlateSelection();
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'richTextEditor'
    }),
    t = _useTranslation.t;
  function handleClick() {
    var node = getNodeFragment(test, selectedNode);
    saveSnippetCallback(node);
  }
  return /*#__PURE__*/jsx(Tooltip, {
    title: t('saveSnippet'),
    position: "top",
    children: /*#__PURE__*/jsx("div", {
      className: styles$9.svgs,
      children: /*#__PURE__*/jsx(ToolbarButton$1, {
        icon: /*#__PURE__*/jsx(Icon, {
          name: "save"
        }),
        onMouseDown: handleClick
      })
    })
  });
};
_s41(SaveSnippetButton, "ZTBpIvB5mv8z8FE6IW57ybSNqkE=", false, function () {
  return [useMyPlateEditorRef, usePlateSelection, useTranslation];
});
_c48 = SaveSnippetButton;
var getSnippetOnSelectItem = function getSnippetOnSelectItem() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$key = _ref.key,
    key = _ref$key === void 0 ? ELEMENT_MENTION : _ref$key;
  return function (editor, item) {
    var _getBlockAbove;
    var targetRange = comboboxSelectors.targetRange();
    if (!targetRange) return;
    var _getPlugin = getPlugin(editor, key),
      _getPlugin$options = _getPlugin.options,
      insertSpaceAfterMention = _getPlugin$options.insertSpaceAfterMention,
      createMentionNode = _getPlugin$options.createMentionNode;
    var pathAbove = (_getBlockAbove = getBlockAbove(editor)) === null || _getBlockAbove === void 0 ? void 0 : _getBlockAbove[1];
    var isBlockEnd = function isBlockEnd() {
      return editor.selection && pathAbove && isEndPoint(editor, editor.selection.anchor, pathAbove);
    };
    withoutNormalizing(editor, function () {
      var _comboboxSelectors$te;
      // Selectors are sensitive to operations, it's better to create everything
      // before the editor state is changed. For example, asking for text after
      // removeNodes below will return null.
      var _ref2 = createMentionNode(item, {
          search: (_comboboxSelectors$te = comboboxSelectors.text()) !== null && _comboboxSelectors$te !== void 0 ? _comboboxSelectors$te : ''
        }),
        value = _ref2.value;
      select$1(editor, targetRange);
      withoutMergingHistory(editor, function () {
        return removeNodes$1(editor, {
          match: function match(node) {
            return node.type === ELEMENT_MENTION_INPUT;
          }
        });
      });
      // @ts-ignore
      insertNodes$1(editor, value);

      // move the selection after the element
      moveSelection(editor, {
        unit: 'offset'
      });
      if (isBlockEnd() && insertSpaceAfterMention) {
        insertText(editor, ' ');
      }
    });
    return comboboxActions.reset();
  };
};
function _typeof$2(obj) {
  "@babel/helpers - typeof";

  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$2(obj);
}
var _excluded = ["pluginKey", "id"];
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
var SnippetCombobox = function SnippetCombobox(_ref) {
  _s42();
  var _ref$pluginKey = _ref.pluginKey,
    pluginKey = _ref$pluginKey === void 0 ? ELEMENT_SNIPPET : _ref$pluginKey,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? pluginKey : _ref$id,
    props = _objectWithoutProperties(_ref, _excluded);
  var editor = usePlateEditorRef$1();
  var _getPluginOptions = getPluginOptions(editor, pluginKey),
    trigger = _getPluginOptions.trigger;
  return /*#__PURE__*/jsx(Combobox, _objectSpread$2({
    id: id,
    trigger: trigger,
    controlled: true,
    onSelectItem: getSnippetOnSelectItem({
      key: pluginKey
    }),
    styles: {
      item: {
        maxWidth: '98%',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }
  }, props));
};
_s42(SnippetCombobox, "NFP6VRGoARvDANDxKbZ0qyvInoE=", false, function () {
  return [usePlateEditorRef$1];
});
_c49 = SnippetCombobox;
var css_248z = ".richTextEditor-module_plate_container__c59X1 {\n  width: 100% !important;\n  color: var(--peanut) !important;\n  --artdeco-reset-forms-input-padding: initial;\n  --artdeco-reset-form-position-relative: initial;\n  --artdeco-reset-form-vertical-align-middle: initial;\n  --artdeco-reset-form-display-block: initial;\n  --artdeco-reset-form-black-90: initial;\n  --artdeco-reset-form-label-margin: initial;\n  --artdeco-reset-form-label-opacity: initial;\n  --artdeco-reset-form-webkit-appearance-textfield: initial;\n  --artdeco-reset-form-webkit-appearance-none: initial;\n  --artdeco-reset-form-height-auto: initial;\n  --artdeco-reset-form-padding-top-point-seven-rem: initial;\n  --artdeco-reset-form-rc-pointer-events: initial;\n  --artdeco-reset-form-rc-opacity: initial;\n  --artdeco-reset-form-rc-margin: initial;\n  --artdeco-reset-form-rc-position: initial;\n  --artdeco-reset-form-rc-before-after-content: initial;\n  --artdeco-reset-checkbox-rc-after-content: initial;\n  --artdeco-reset-form-rc-label-display-block: initial;\n  --artdeco-reset-form-rc-label-line-height-2-rem: initial;\n  --artdeco-reset-form-rc-label-margin-bottom-zero: initial;\n  --artdeco-reset-form-rc-label-padding-zero: initial;\n  --artdeco-reset-form-rc-label-position-relative: initial;\n  --artdeco-reset-form-rc-label-padding-left-2point8-rem: initial;\n  --artdeco-reset-forms-input-transition-duration: initial;\n  --artdeco-reset-forms-input-transition-property: initial;\n  --artdeco-reset-forms-input-box-shadow: initial;\n  --artdeco-reset-forms-input-border-radius: 4px;\n  --artdeco-reset-forms-input-border: initial;\n  --artdeco-reset-forms-input-width: initial;\n  --artdeco-reset-forms-input-height: initial;\n  --artdeco-reset-forms-input-box-sizing: border-box;\n  --artdeco-reset-forms-input-background-color: initial;\n  --artdeco-reset-forms-input-color: initial;\n  --artdeco-reset-forms-input-placeholder-color: var(--softPeanut);\n  --artdeco-reset-forms-input-blue: initial;\n  --artdeco-reset-forms-input-focus-box-shadow: initial;\n  --artdeco-reset-forms-input-disabled-hover-border-color: initial;\n  --artdeco-reset-forms-input-disabled-opacity: initial;\n  --artdeco-reset-forms-input-error: initial;\n  --artdeco-reset-forms-font-weight: initial;\n  --artdeco-reset-forms-font-size: initial;\n  --artdeco-reset-forms-line-height: initial;\n  --artdeco-reset-forms-select-appearance-none: initial;\n  --artdeco-reset-forms-select-box-shadow-none: initial;\n  --artdeco-reset-forms-select-outline-zero: initial;\n  --artdeco-reset-forms-select-height-3point2-rem: initial;\n  --artdeco-reset-forms-select-background-transparent: initial;\n  --artdeco-reset-forms-select-position-relative: initial;\n  --artdeco-reset-forms-select-zindex-two: initial;\n  --artdeco-reset-forms-select-background-image: initial;\n  --artdeco-reset-forms-select-border-box: initial;\n  --artdeco-reset-forms-select-border-zero: initial;\n  --artdeco-reset-forms-select-width-100-percent: initial;\n  --artdeco-reset-forms-select-border-radius-point2rem: initial;\n  --artdeco-reset-forms-select-border: initial;\n  --artdeco-reset-forms-select-padding: initial;\n  --artdeco-reset-forms-select-transition: initial;\n  --artdeco-reset-forms-select-disabled-opacity: initial;\n  --artdeco-reset-forms-select-hover-border-color: initial;\n  --artdeco-reset-forms-select-focus-border-color: initial;\n  --artdeco-reset-forms-select-focus-box-shadow: initial;\n  --artdeco-reset-base-margin-zero: initial;\n  --artdeco-reset-base-padding-zero: initial;\n  --artdeco-reset-base-border-zero: initial;\n  --artdeco-reset-base-font-size-hundred-percent: initial;\n  --artdeco-reset-base-font-weight-bold: initial;\n  --artdeco-reset-base-font-style-italic: initial;\n  --artdeco-reset-base-outline-zero: initial;\n  --artdeco-reset-base-outline-none: initial;\n  --artdeco-reset-base-line-height-one: initial;\n  --artdeco-reset-base-display-block: initial;\n  --artdeco-reset-base-list-style-none: initial;\n  --artdeco-reset-base-quotes-none: initial;\n  --artdeco-reset-base-vertical-align-baseline: initial;\n  --artdeco-reset-base-vertical-align-middle: initial;\n  --artdeco-reset-base-background-transparent: initial;\n  --artdeco-reset-base-opacity-zero: initial;\n  --artdeco-reset-base-top-zero: initial;\n  --artdeco-reset-base-position-absolute: initial;\n  --artdeco-reset-base-text-decoration-none: initial;\n  --artdeco-reset-base-text-decoration-line-through: initial;\n  --artdeco-reset-base-border-collapse-collapse: initial;\n  --artdeco-reset-base-get-color-black: initial;\n  --artdeco-reset-base-background-color-ff9: initial;\n  --artdeco-reset-base-border-spacing-zero: initial;\n  --artdeco-reset-base-cursor-help: initial;\n  --artdeco-reset-base-content-none: initial;\n  --artdeco-reset-base-left-minus-hundred-px: initial;\n  --artdeco-reset-base-border-thickness-1-px: initial;\n  --artdeco-reset-base-border-style-dotted: initial;\n}\n\n.richTextEditor-module_plate_container__c59X1 > div > h2 {\n  color: var(--peanut) !important;\n  margin: 0 !important;\n}\n\n.richTextEditor-module_plate_container__c59X1 > div > ul * {\n  list-style: initial;\n}\n\n.richTextEditor-module_plate_container__c59X1 > div > ol * {\n  list-style: auto;\n}\n\n/* Linkedin overrides */\n.richTextEditor-module_plate_container__c59X1 input {\n  margin: 0 !important;\n  box-shadow: none !important;\n  height: 32px;\n  border: none !important;\n  width: 100%;\n}\n\n.richTextEditor-module_plate_container__c59X1 input::-moz-placeholder {\n  color: transparent !important;\n}\n\n.richTextEditor-module_plate_container__c59X1 input::placeholder {\n  color: transparent !important;\n}\n\n.richTextEditor-module_plate_container__c59X1 input:focus {\n  outline: none !important;\n  background-color: transparent;\n}\n\n.richTextEditor-module_plate_container__c59X1 label {\n  margin: 0 !important;\n}\n\n.richTextEditor-module_plate_container__c59X1 button {\n  height: 32px;\n}\n\n.richTextEditor-module_plate_container_sfc__YvZH2 ::-moz-selection {\n  color: inherit;\n}\n\n.richTextEditor-module_plate_container_sfc__YvZH2 ::selection {\n  color: inherit;\n}\n";
var styles = {
  "plate_container": "richTextEditor-module_plate_container__c59X1",
  "plate_container_sfc": "richTextEditor-module_plate_container_sfc__YvZH2"
};
styleInject(css_248z);
function _typeof$1(obj) {
  "@babel/helpers - typeof";

  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$1(obj);
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
var Editor = function Editor(_ref) {
  _s43();
  var setEditor = _ref.setEditor;
  var editor = useMyPlateEditorRef();
  useEffect(function () {
    setTimeout(function () {
      var _editor$id;
      if (editor !== null && editor !== void 0 && editor.id && editor !== null && editor !== void 0 && (_editor$id = editor.id) !== null && _editor$id !== void 0 && _editor$id.toLowerCase().includes('body')) {
        focusEditor(editor);
      }
    }, 100);
  }, []);
  setEditor === null || setEditor === void 0 ? void 0 : setEditor(editor);
  return null;
};
_s43(Editor, "il+Ne5HvPRaJcym0L4HvlHKIkOg=", false, function () {
  return [useMyPlateEditorRef];
});
_c50 = Editor;
var PlateWrapper = /*#__PURE__*/memo(_c51 = function (_ref2) {
  var id = _ref2.id,
    placeholder = _ref2.placeholder,
    markBallonEnabled = _ref2.markBallonEnabled,
    saveSnippetCallback = _ref2.saveSnippetCallback,
    setEditor = _ref2.setEditor,
    snippets = _ref2.snippets,
    style = _ref2.style;
  var url = normalizeUrl(window.location.href);
  var isSalesforcePage = !!url.match('^.*://.*.lightning.force.com.*');
  var classes = classNames(styles.plate_container, _defineProperty$1({}, styles.plate_container_sfc, isSalesforcePage));
  return /*#__PURE__*/jsx("div", {
    className: classes,
    onFocus: removeScrollOfBox,
    onBlur: recoverScrollOfBox,
    children: /*#__PURE__*/jsxs(Plate, {
      id: id,
      editableProps: {
        spellCheck: true,
        placeholder: placeholder,
        style: _objectSpread$1({
          fontSize: '13px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          padding: 12
        }, style)
      },
      children: [markBallonEnabled && /*#__PURE__*/jsx(MarkBalloonToolbar, {
        id: id,
        children: snippets && /*#__PURE__*/jsx(SaveSnippetButton, {
          saveSnippetCallback: saveSnippetCallback
        })
      }), /*#__PURE__*/jsx(Editor, {
        setEditor: setEditor
      }), /*#__PURE__*/jsx(SnippetCombobox, {
        items: snippets
      })]
    })
  });
});
_c52 = PlateWrapper;
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
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
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
var initialValue = [{
  type: ELEMENT_PARAGRAPH$1,
  children: [{
    text: ''
  }]
}];
var RichTextEditor = function RichTextEditor(_ref) {
  _s44();
  var _children;
  var id = _ref.id,
    value = _ref.value,
    _ref$defaultValue = _ref.defaultValue,
    defaultValue = _ref$defaultValue === void 0 ? initialValue : _ref$defaultValue,
    style = _ref.style,
    onChange = _ref.onChange,
    placeholder = _ref.placeholder,
    plugins = _ref.plugins,
    children = _ref.children,
    setEditor = _ref.setEditor,
    snippets = _ref.snippets,
    saveSnippetCallback = _ref.saveSnippetCallback,
    registerProps = _ref.registerProps;
  var isUsingRegister = !!registerProps;
  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    plateId = _useState2[0],
    setPlateId = _useState2[1];
  var oldPlateId = useRef(null);
  var emailVariablesValues = useBaseEmailVariableValue();
  var pluginsToUse = useMemo(function () {
    return createMyPlugins(plugins, {
      components: components
    });
  }, [hash(plugins)]);
  var templateVariableEnabled = pluginsToUse.some(function (plugin) {
    return plugin.key === 'variable';
  });
  var markBallonEnabled = pluginsToUse.some(function (plugin) {
    return plugin.key === 'basicMarks';
  });
  useEffect(function () {
    if (templateVariableEnabled && emailVariablesValues && Object.keys(emailVariablesValues).length > 0) {
      if (id) {
        id = "".concat(id, "_").concat(hash(emailVariablesValues));
      } else {
        id = hash(emailVariablesValues);
      }
    } else {
      id = id || 'plateEditor';
    }
    setPlateId(id);
  }, [id, templateVariableEnabled, emailVariablesValues]);
  useEffect(function () {
    window.addEventListener('keydown', function (e) {
      e.stopImmediatePropagation();
    });
    return function () {
      window.removeEventListener('keydown', function (e) {
        e.stopImmediatePropagation();
      });
    };
  }, []);
  useEffect(function () {
    if (oldPlateId.current !== plateId) {
      oldPlateId.current = plateId;
    }
  }, [plateId]);
  if (!plateId) {
    return null;
  }
  if (plateId !== id && oldPlateId.current && oldPlateId.current !== plateId) {
    return null;
  }
  var PlateEditor = /*#__PURE__*/jsx(PlateWrapper, {
    id: plateId,
    placeholder: placeholder,
    markBallonEnabled: markBallonEnabled,
    setEditor: setEditor,
    snippets: snippets,
    style: style,
    saveSnippetCallback: saveSnippetCallback
  });
  return /*#__PURE__*/jsx(PlateProvider, _objectSpread(_objectSpread({
    id: plateId,
    initialValue: defaultValue,
    plugins: pluginsToUse,
    value: value
  }, isUsingRegister ? registerProps : {}), {}, {
    onChange: isUsingRegister ? function (value) {
      var event = {
        target: {
          value: value,
          name: registerProps === null || registerProps === void 0 ? void 0 : registerProps.name
        }
      };
      registerProps.onChange(event);
    } : onChange,
    children: (_children = children === null || children === void 0 ? void 0 : children(PlateEditor)) !== null && _children !== void 0 ? _children : PlateEditor
  }));
};
_s44(RichTextEditor, "uKWYeBvRdV5ISiL+IWtdHXUIHpQ=", false, function () {
  return [useBaseEmailVariableValue];
});
_c53 = RichTextEditor;
var ELEMENT_PARAGRAPH = 'p';

/**
 * Enables support for paragraphs.
 */
var createCustomParagraphPlugin = createPluginFactory$1({
  key: ELEMENT_PARAGRAPH,
  isElement: true,
  handlers: {
    onKeyDown: onKeyDownToggleElement
  },
  options: {
    hotkey: ['mod+opt+0', 'mod+shift+0']
  },
  deserializeHtml: {
    rules: [{
      validNodeName: 'DIV'
    }, {
      validNodeName: 'P'
    }],
    query: function query(el) {
      return el.style.fontFamily !== 'Consolas';
    }
  }
});
var createSnippetPlugins = function createSnippetPlugins() {
  return [createComboboxPlugin(), createMentionPlugin({
    key: ELEMENT_SNIPPET,
    options: {
      // @ts-ignore
      createMentionNode: function createMentionNode(mention) {
        return {
          value: mention.data
        };
      },
      trigger: '/',
      insertSpaceAfterMention: true
    }
  })];
};
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
var useRichTextEditorPlugins = function useRichTextEditorPlugins() {
  _s45();
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$templateVariable = _ref.templateVariables,
    templateVariables = _ref$templateVariable === void 0 ? true : _ref$templateVariable,
    _ref$replaceTemplateV = _ref.replaceTemplateVariables,
    replaceTemplateVariables = _ref$replaceTemplateV === void 0 ? false : _ref$replaceTemplateV,
    _ref$marks = _ref.marks,
    marks = _ref$marks === void 0 ? true : _ref$marks,
    _ref$elements = _ref.elements,
    elements = _ref$elements === void 0 ? true : _ref$elements,
    _ref$images = _ref.images,
    images = _ref$images === void 0 ? true : _ref$images,
    _ref$snippets = _ref.snippets,
    snippets = _ref$snippets === void 0 ? false : _ref$snippets,
    _ref$singleLine = _ref.singleLine,
    singleLine = _ref$singleLine === void 0 ? false : _ref$singleLine,
    _ref$autoReplace = _ref.autoReplace,
    autoReplace = _ref$autoReplace === void 0 ? true : _ref$autoReplace,
    _ref$rawHTMLBlock = _ref.rawHTMLBlock,
    rawHTMLBlock = _ref$rawHTMLBlock === void 0 ? false : _ref$rawHTMLBlock,
    _ref$replyHistory = _ref.replyHistory,
    replyHistory = _ref$replyHistory === void 0 ? false : _ref$replyHistory,
    _ref$replaceMeetingLi = _ref.replaceMeetingLinks,
    replaceMeetingLinks = _ref$replaceMeetingLi === void 0 ? false : _ref$replaceMeetingLi,
    _ref$stopPropagationP = _ref.stopPropagationPlugin,
    stopPropagationPlugin = _ref$stopPropagationP === void 0 ? true : _ref$stopPropagationP,
    _ref$replaceParagraph = _ref.replaceParagraphs,
    replaceParagraphs = _ref$replaceParagraph === void 0 ? false : _ref$replaceParagraph,
    _ref$keepDivs = _ref.keepDivs,
    keepDivs = _ref$keepDivs === void 0 ? false : _ref$keepDivs;
  var createTemplateVariablesPlugin = useTemplateVariablesPlugin({
    replace: replaceTemplateVariables
  });
  var createMeetingLinksPlugin = useTemplateMeetingLinksPlugin(replaceMeetingLinks);
  return useMemo(function () {
    var basePlugins = [];
    if (!keepDivs) {
      if (replaceParagraphs) {
        basePlugins = [].concat(_toConsumableArray(basePlugins), [createCustomParagraphPlugin()]);
      } else {
        basePlugins = [].concat(_toConsumableArray(basePlugins), [createParagraphPlugin()]);
      }
    }
    if (elements) {
      basePlugins = [].concat(_toConsumableArray(basePlugins), _toConsumableArray(createElementsPlugins()));
    }
    if (elements || templateVariables) {
      basePlugins = [].concat(_toConsumableArray(basePlugins), _toConsumableArray(createControlPlugins()));
    }
    if (autoReplace) {
      basePlugins = [].concat(_toConsumableArray(basePlugins), _toConsumableArray(createReplacePlugins()));
    }
    if (marks) {
      basePlugins = [].concat(_toConsumableArray(basePlugins), [createBasicMarksPlugin(), createFontSizePlugin(), createFontColorPlugin()]);
    }
    if (singleLine) {
      basePlugins = [].concat(_toConsumableArray(basePlugins), [createSingleLinePlugin()]);
    }
    if (images) {
      basePlugins = [].concat(_toConsumableArray(basePlugins), [createImagePlugin()]);
    }
    if (rawHTMLBlock) {
      basePlugins = [].concat(_toConsumableArray(basePlugins), [createRawHTMLBlockPlugin()]);
    }
    if (replyHistory) {
      basePlugins = [].concat(_toConsumableArray(basePlugins), [createReplyHistoryPlugin()]);
    }
    if (snippets) {
      basePlugins = [].concat(_toConsumableArray(basePlugins), _toConsumableArray(createSnippetPlugins()));
    }
    if (templateVariables) {
      basePlugins = [].concat(_toConsumableArray(basePlugins), [createTemplateVariablesPlugin]);
    }
    basePlugins = [].concat(_toConsumableArray(basePlugins), [createMeetingLinksPlugin]);
    basePlugins = [].concat(_toConsumableArray(basePlugins), [createSlotsBlockPlugin()]);
    return basePlugins;
  }, [createTemplateVariablesPlugin, createMeetingLinksPlugin, templateVariables, replaceTemplateVariables, stopPropagationPlugin, marks, rawHTMLBlock, elements, images, singleLine, replyHistory, snippets]);
};
_s45(useRichTextEditorPlugins, "eEqkDCA3FIfzwZpSXvUj5jsIDY0=", false, function () {
  return [useTemplateVariablesPlugin, useTemplateMeetingLinksPlugin];
});
var deserialize = function deserialize(content) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$format = _ref.format,
    format = _ref$format === void 0 ? 'AST' : _ref$format,
    _ref$plugins = _ref.plugins,
    plugins = _ref$plugins === void 0 ? [] : _ref$plugins;
  if (!content) {
    return undefined;
  }
  if (format === 'HTML') {
    var editor = createPlateUIEditor({
      plugins: plugins
    });
    return deserializeHtml(editor, {
      element: content
    });
  } else {
    return JSON.parse(content);
  }
};

// This function is only meant for serializing context-free template like when they appear in the card list
var serialize = function serialize(content) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref2$format = _ref2.format,
    format = _ref2$format === void 0 ? 'AST' : _ref2$format,
    _ref2$plugins = _ref2.plugins,
    plugins = _ref2$plugins === void 0 ? [] : _ref2$plugins;
  var editor = createPlateUIEditor({
    plugins: plugins
  });
  if (!content) {
    return '';
  }
  var nodes;
  // For backwards compatibility
  if (format === 'HTML') {
    nodes = deserialize(content, {
      format: format,
      plugins: plugins
    });
  } else {
    nodes = typeof content === 'string' ? JSON.parse(content) : content;
  }
  var html = serializeHtml(editor, {
    nodes: nodes,
    stripWhitespace: false
  });
  var raw = html.replaceAll(/<div(\s*)?>\s*<\/div>/g, '<br>').replaceAll('&#x27;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&apos;', "'");
  return raw;
};
export { ELEMENT_MEETING_LINK, ELEMENT_MISSING_MEETING_LINK, ELEMENT_MISSING_VARIABLE, ELEMENT_RAW_HTML_BLOCK, ELEMENT_REPLY_HISTORY, ELEMENT_SLOTS_FORM, ELEMENT_SNIPPET, ELEMENT_TEMPLATE_VARIABLE, EditorToolbar, EditorToolbarControlsSection, EditorToolbarFileAttachment, EditorToolbarFontStylesSection, EditorToolbarImage, EditorToolbarLink, EditorToolbarListsSection, EditorToolbarMeetingLink, EditorToolbarSection, EditorToolbarSelectSignatureSection, EditorToolbarSnippet, EditorToolbarTemplateVariable, EditorToolbarTextMarksSection, EditorToolbarTimeSlots, FloatingTemplateVariable, RichTextEditor, TemplateEditorToolbarFileAttachment, TemplateEditorToolbarImage, TemplateEditorToolbarMeetingLink, checkEmptyText, createImagePlugin, createRawHTMLBlock, createRawHTMLBlockPlugin, createReplyHistory, createReplyHistoryPlugin, createSlotsBlock, createSlotsBlockPlugin, deserialize, exitBreakPlugin, flatMapByKey, format, formatList, hasMissingVariables, initialValue, insertImage, insertImageLink, insertMeetingLink, insertRawHTMLBlock, insertSlotsBlock, insertTemplateVariable, linkPlugin, preFormat, replaceHTMLBlock, resetBlockTypePlugin, selectOnBackspacePlugin, serialize, useRichTextEditorPlugins, useTemplateMeetingLinksPlugin, useTemplateVariablesPlugin };
var _c, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16, _c17, _c18, _c19, _c20, _c21, _c22, _c23, _c24, _c25, _c26, _c27, _c28, _c29, _c30, _c31, _c32, _c33, _c34, _c35, _c36, _c37, _c38, _c39, _c40, _c41, _c42, _c43, _c44, _c45, _c46, _c47, _c48, _c49, _c50, _c51, _c52, _c53;
$RefreshReg$(_c, "OpenLinkButton$createComponentAs");
$RefreshReg$(_c2, "OpenLinkButton");
$RefreshReg$(_c3, "UnlinkButton$createComponentAs");
$RefreshReg$(_c4, "UnlinkButton");
$RefreshReg$(_c5, "FloatingLinkEditRoot$createComponentAs$1");
$RefreshReg$(_c6, "FloatingLinkEditRoot");
$RefreshReg$(_c7, "FloatingLinkInsertRoot$createComponentAs$1");
$RefreshReg$(_c8, "FloatingLinkInsertRoot");
$RefreshReg$(_c9, "PlateFloatingLink");
$RefreshReg$(_c10, "ImageElement");
$RefreshReg$(_c11, "ImageLink");
$RefreshReg$(_c12, "MissingMeetingLink");
$RefreshReg$(_c13, "MeetingLink");
$RefreshReg$(_c14, "RawHTMLBlock");
$RefreshReg$(_c15, "ToggleButton");
$RefreshReg$(_c16, "ReplyHistory");
$RefreshReg$(_c17, "SlotsBlock");
$RefreshReg$(_c18, "MissingVariable");
$RefreshReg$(_c19, "TemplateVariable");
$RefreshReg$(_c20, "ColorButton");
$RefreshReg$(_c21, "Colors");
$RefreshReg$(_c22, "CustomColors");
$RefreshReg$(_c23, "ColorPickerInternal");
$RefreshReg$(_c24, "ColorPicker");
$RefreshReg$(_c25, "ColorPickerToolbarDropdown");
$RefreshReg$(_c26, "MarkToolbarButton");
$RefreshReg$(_c27, "SelectSignatureDropdown");
$RefreshReg$(_c28, "SizeDropdownMenu");
$RefreshReg$(_c29, "EditorToolbar");
$RefreshReg$(_c30, "EditorToolbarControlsSection");
$RefreshReg$(_c31, "EditorToolbarFontStylesSection");
$RefreshReg$(_c32, "EditorToolbarLink");
$RefreshReg$(_c33, "EditorToolbarSnippet");
$RefreshReg$(_c34, "EditorToolbarTextMarksSection");
$RefreshReg$(_c35, "EditorToolbarListsSection");
$RefreshReg$(_c36, "EditorToolbarSection");
$RefreshReg$(_c37, "EditorToolbarImage");
$RefreshReg$(_c38, "TemplateEditorToolbarImage");
$RefreshReg$(_c39, "EditorToolbarFileAttachment");
$RefreshReg$(_c40, "EditorToolbarTimeSlots");
$RefreshReg$(_c41, "TemplateEditorToolbarFileAttachment");
$RefreshReg$(_c42, "EditorToolbarTemplateVariable");
$RefreshReg$(_c43, "FloatingTemplateVariable");
$RefreshReg$(_c44, "EditorToolbarMeetingLink");
$RefreshReg$(_c45, "TemplateEditorToolbarMeetingLink");
$RefreshReg$(_c46, "EditorToolbarSelectSignatureSection");
$RefreshReg$(_c47, "MarkBalloonToolbar");
$RefreshReg$(_c48, "SaveSnippetButton");
$RefreshReg$(_c49, "SnippetCombobox");
$RefreshReg$(_c50, "Editor");
$RefreshReg$(_c51, "PlateWrapper$memo");
$RefreshReg$(_c52, "PlateWrapper");
$RefreshReg$(_c53, "RichTextEditor");
if (import.meta.hot) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;

  
  if (!window.__vite_plugin_react_timeout) {
    window.__vite_plugin_react_timeout = setTimeout(() => {
      window.__vite_plugin_react_timeout = 0;
      RefreshRuntime.performReactRefresh();
    }, 30);
  }

}