import { useState, useRef } from 'react';
import classNames from 'clsx';
import { Spinner, Icon, Tooltip, Text, IconButton, useToasts, CompoundIcon, Avatar, useVisible, Dropdown, TabGroup, Tab, Action, Button } from '@bloobirds-it/flamingo-ui';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { v4 } from 'uuid';
import { api, normalizeUrl, isSalesforcePage, isDynamicsPage, baseUrls } from '@bloobirds-it/utils';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { useTranslation, Trans } from 'react-i18next';
import { useNotificationsData, useNotifications, useActiveUserSettings } from '@bloobirds-it/hooks';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import { NotificationsTypes, NotificationsCategory, UserRole, MIXPANEL_EVENTS } from '@bloobirds-it/types';
import { format } from 'date-fns';
import { useClickAway } from 'react-use';
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

var css_248z$4 = ".attachmentItem-module_item__eHuQ3 {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background-color: var(--lightestBloobirds);\n  border-radius: 4px;\n  padding: 10px;\n  max-height: 36px;\n  min-width: 90px;\n  max-width: 200px;\n  flex-shrink: 1;\n}\n\n.attachmentItem-module_content__jVp8r {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  white-space: nowrap;\n  min-width: 0;\n  flex-shrink: 1;\n}\n\n.attachmentItem-module_content__jVp8r > *:first-child {\n  flex-shrink: 0;\n}\n\n.attachmentItem-module_content__jVp8r > div {\n  white-space: nowrap;\n  min-width: 0;\n  max-width: 85%;\n  position: relative;\n  flex-shrink: 1;\n}\n\n.attachmentItem-module_content__jVp8r > div > p {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  margin-right: 12px;\n}\n";
var styles$4 = {"item":"attachmentItem-module_item__eHuQ3","content":"attachmentItem-module_content__jVp8r"};
styleInject(css_248z$4);

function AttachmentItem(_ref) {
  var id = _ref.id,
    uploading = _ref.uploading,
    name = _ref.name,
    onDelete = _ref.onDelete;
  return /*#__PURE__*/jsxs("div", {
    className: styles$4.item,
    role: "listitem",
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$4.content,
      children: [uploading ? /*#__PURE__*/jsx(Spinner, {
        name: "loadingCircle",
        size: 14,
        color: "softPeanut"
      }) : /*#__PURE__*/jsx(Icon, {
        name: "file",
        size: 16,
        color: "softPeanut"
      }), /*#__PURE__*/jsx(Tooltip, {
        title: name,
        position: "top",
        children: /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "softPeanut",
          children: name
        })
      })]
    }), !uploading && onDelete && /*#__PURE__*/jsx(IconButton, {
      name: "cross",
      onClick: function onClick() {
        return onDelete(id);
      },
      size: 16,
      color: "softPeanut"
    })]
  });
}

var css_248z$3 = ".attachmentList-module_list__npZdV {\n  display: -webkit-inline-box;\n  padding: 7px;\n  gap: 12px;\n  border-top: 1px solid var(--lightestBloobirds);\n  border-bottom: 1px solid var(--lightestBloobirds);\n  min-width: 0;\n  overflow: scroll;\n  max-width: 690px;\n  width: 100%;\n  background-color: white;\n}\n";
var styles$3 = {"list":"attachmentList-module_list__npZdV"};
styleInject(css_248z$3);

function _typeof$5(obj) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$5(obj); }
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$4(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$4(obj, key, value) { key = _toPropertyKey$4(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$4(arg) { var key = _toPrimitive$4(arg, "string"); return _typeof$5(key) === "symbol" ? key : String(key); }
function _toPrimitive$4(input, hint) { if (_typeof$5(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$5(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function AttachmentList(_ref) {
  var files = _ref.files,
    onDelete = _ref.onDelete;
  var listClasses = classNames(styles$3.list);
  return /*#__PURE__*/jsx("div", {
    className: listClasses,
    role: "list",
    children: files.map(function (file) {
      return /*#__PURE__*/jsx(AttachmentItem, _objectSpread$1(_objectSpread$1({}, file), {}, {
        onDelete: typeof onDelete === 'function' ? function () {
          return onDelete(file === null || file === void 0 ? void 0 : file.id);
        } : null
      }), file.internalId);
    })
  });
}

function _typeof$4(obj) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$4(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$2(arr); }
function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2(); }
function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$2(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime$1() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$1 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$4(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$1(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var uploadFile = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee(_ref) {
    var _response$data2, _response$data2$messa;
    var file, createToast, setAttachedFiles, internalId, _ref$visible, visible, formData, response;
    return _regeneratorRuntime$1().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          file = _ref.file, createToast = _ref.createToast, setAttachedFiles = _ref.setAttachedFiles, internalId = _ref.internalId, _ref$visible = _ref.visible, visible = _ref$visible === void 0 ? 'false' : _ref$visible;
          formData = new FormData();
          formData.append('file', file);
          formData.append('visible', visible);
          _context.next = 6;
          return api.post('/messaging/mediaFiles', formData, {
            validateStatus: function validateStatus() {
              return true;
            },
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        case 6:
          response = _context.sent;
          if (response.status === 201) {
            setAttachedFiles(function (attachFiles) {
              var _response$data;
              var newAttachFiles = attachFiles === null || attachFiles === void 0 ? void 0 : attachFiles.filter(function (prevFile) {
                return prevFile.name !== file.name;
              });
              newAttachFiles.push({
                id: (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.id,
                internalId: internalId,
                name: file.name,
                uploading: false
              });
              return newAttachFiles;
            });
          } else if (response.status === 500 && (_response$data2 = response.data) !== null && _response$data2 !== void 0 && (_response$data2$messa = _response$data2.message) !== null && _response$data2$messa !== void 0 && _response$data2$messa.includes('SizeLimitExceededException')) {
            setAttachedFiles(function (attachFiles) {
              return attachFiles === null || attachFiles === void 0 ? void 0 : attachFiles.filter(function (prevFile) {
                return prevFile.name !== file.name;
              });
            });
            createToast({
              message: "File exceeds maximum allowed size of 15MB",
              type: 'error'
            });
          } else {
            setAttachedFiles(function (attachFiles) {
              return attachFiles === null || attachFiles === void 0 ? void 0 : attachFiles.filter(function (prevFile) {
                return prevFile.name !== file.name;
              });
            });
            createToast({
              message: 'Failed to upload attachment',
              type: 'error'
            });
          }
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function uploadFile(_x) {
    return _ref2.apply(this, arguments);
  };
}();

// if return type changes, edit type (don't delete it), and look for conflicts
function useAttachedFiles() {
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var _useState = useState([]),
    _useState2 = _slicedToArray$2(_useState, 2),
    attachedFiles = _useState2[0],
    setAttachedFiles = _useState2[1];
  var uploadAttachedFile = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee2(files) {
      var visible,
        originalAttachedFiles,
        internalId,
        newFiles,
        _args2 = arguments;
      return _regeneratorRuntime$1().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            visible = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
            originalAttachedFiles = _toConsumableArray(attachedFiles);
            internalId = v4();
            newFiles = files.map(function (file) {
              return {
                id: null,
                internalId: internalId,
                name: file.name,
                uploading: true
              };
            });
            setAttachedFiles([].concat(_toConsumableArray(originalAttachedFiles), _toConsumableArray(newFiles)));
            files.forEach(function (file) {
              uploadFile({
                file: file,
                createToast: createToast,
                setAttachedFiles: setAttachedFiles,
                internalId: internalId,
                visible: visible ? 'true' : 'false'
              });
            });
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function uploadAttachedFile(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  var removeAttachedFile = function removeAttachedFile(attachedFileId) {
    setAttachedFiles(attachedFiles.filter(function (file) {
      return file.id !== attachedFileId;
    }));
  };
  var syncAttachments = function syncAttachments(mediaFiles) {
    var newAttachedFiles = mediaFiles === null || mediaFiles === void 0 ? void 0 : mediaFiles.map(function (mediaFile) {
      return {
        id: mediaFile.id,
        internalId: v4(),
        name: mediaFile.name,
        uploading: false
      };
    });
    setAttachedFiles(newAttachedFiles);
  };
  return {
    attachedFiles: attachedFiles,
    uploadAttachedFile: uploadAttachedFile,
    removeAttachedFile: removeAttachedFile,
    syncAttachments: syncAttachments
  };
}
var attachedLinksAtom = atom({
  key: 'attachedLinksAtom-old',
  "default": []
});
var useAttachedLinks = function useAttachedLinks() {
  var _useRecoilState = useRecoilState(attachedLinksAtom),
    _useRecoilState2 = _slicedToArray$2(_useRecoilState, 2),
    attachedLinks = _useRecoilState2[0],
    setAttachedLinks = _useRecoilState2[1];
  var resetAttachedLinks = useResetRecoilState(attachedLinksAtom);
  var uploadAttachedLink = function uploadAttachedLink(file) {
    var _attachedLinks$filter;
    var alreadyAttached = ((_attachedLinks$filter = attachedLinks.filter(function (link) {
      return link.title === file.title && link.link === file.link;
    })) === null || _attachedLinks$filter === void 0 ? void 0 : _attachedLinks$filter.length) > 0;
    if (!alreadyAttached) {
      setAttachedLinks([].concat(_toConsumableArray(attachedLinks), [file]));
    }
  };
  var removeAttachedLink = function removeAttachedLink(linkToRemove) {
    setAttachedLinks(attachedLinks.filter(function (link) {
      return link.title !== linkToRemove.title && link.link !== linkToRemove.link;
    }));
  };
  return {
    attachedLinks: attachedLinks,
    setAttachedLinks: setAttachedLinks,
    uploadAttachedLink: uploadAttachedLink,
    resetAttachedLinks: resetAttachedLinks,
    removeAttachedLink: removeAttachedLink
  };
};

var css_248z$2 = ".noResultsPage-module_container__rcqnx {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  margin: 24px auto;\n}\n\n.noResultsPage-module_container_sidePeek__Gdq0G {\n  margin-top: 80px;\n}\n\n.noResultsPage-module_container__rcqnx > p:first-child {\n  max-width: 235px;\n}\n\n.noResultsPage-module_container__rcqnx > p:last-child {\n  max-width: 280px;\n}\n\n.noResultsPage-module_container__rcqnx > button {\n  text-transform: none;\n  font-weight: 300;\n}\n";
var styles$2 = {"container":"noResultsPage-module_container__rcqnx","container_sidePeek":"noResultsPage-module_container_sidePeek__Gdq0G"};
styleInject(css_248z$2);

function _typeof$3(obj) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$3(obj); }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(arg) { var key = _toPrimitive$3(arg, "string"); return _typeof$3(key) === "symbol" ? key : String(key); }
function _toPrimitive$3(input, hint) { if (_typeof$3(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$3(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var NoResultsPage = function NoResultsPage(_ref) {
  var title = _ref.title,
    description = _ref.description,
    actionButton = _ref.actionButton,
    sidePeekEnabled = _ref.sidePeekEnabled;
  var containerClasses = classNames(styles$2.container, _defineProperty$3({}, styles$2.container_sidePeek, sidePeekEnabled && window.innerHeight > 800));
  return /*#__PURE__*/jsxs("div", {
    className: containerClasses,
    children: [/*#__PURE__*/jsx(Text, {
      size: "m",
      color: "peanut",
      weight: "heavy",
      align: "center",
      children: title
    }), /*#__PURE__*/jsx(Text, {
      size: "s",
      color: "softPeanut",
      align: "center",
      children: description
    }), actionButton]
  });
};

var css_248z$1 = ".notificationsDisplay-module_bell__fgA98 {\n  display: flex;\n  align-items: center;\n  height: 16px;\n  transform-origin: top center;\n  margin-right: 8px;\n  z-index: 2;\n}\n\n.notificationsDisplay-module_pending__XmhrZ {\n  animation: notificationsDisplay-module_bellshake__s-FvM 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;\n}\n\n.notificationsDisplay-module_count__i5617 {\n  cursor: pointer;\n  position: absolute;\n  top: -10px;\n  left: 12px;\n  font-size: 8px;\n  line-height: 16px;\n  background: var(--extraMeeting);\n  color: var(--white);\n  padding: 0 4px;\n  border-radius: 16px;\n  min-width: 8px;\n  border: 1px solid var(--white);\n  text-align: center;\n}\n\n@keyframes notificationsDisplay-module_bellshake__s-FvM {\n  0% {\n    transform: rotate(0);\n  }\n  15% {\n    transform: rotate(5deg);\n  }\n  30% {\n    transform: rotate(-5deg);\n  }\n  45% {\n    transform: rotate(4deg);\n  }\n  60% {\n    transform: rotate(-4deg);\n  }\n  75% {\n    transform: rotate(2deg);\n  }\n  85% {\n    transform: rotate(-2deg);\n  }\n  92% {\n    transform: rotate(1deg);\n  }\n  100% {\n    transform: rotate(0);\n  }\n}\n\n.notificationsDisplay-module__card__-c1f4 {\n  box-sizing: border-box;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  padding: 14px 8px 14px 16px;\n  background-color: var(--white);\n  border-bottom: 1px solid var(--lightBloobirds);\n}\n\n.notificationsDisplay-module__card__-c1f4 > *:first-child {\n  flex-shrink: 0;\n}\n\n.notificationsDisplay-module__card__body__YW8ig {\n  margin: 0 12px;\n  display: flex;\n  flex-direction: column;\n  white-space: pre-line;\n  min-width: 0;\n}\n\n.notificationsDisplay-module__card__info__lupsx {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  margin-left: auto;\n}\n\n.notificationsDisplay-module__card__-c1f4 > .notificationsDisplay-module__card__info__lupsx > button {\n  visibility: hidden;\n}\n\n.notificationsDisplay-module__card__-c1f4:hover > .notificationsDisplay-module__card__info__lupsx > button {\n  visibility: visible;\n}\n\n.notificationsDisplay-module__card__-c1f4:hover {\n  cursor: pointer;\n}\n\n.notificationsDisplay-module__unread__yo4BD {\n  background-color: var(--lighterGray);\n  animation: notificationsDisplay-module_popup__KkKNG 150ms ease-in-out forwards;\n  animation-delay: 250ms;\n  transform: scale(0);\n  opacity: 0;\n}\n\n.notificationsDisplay-module_title__oTAfF {\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-line-clamp: 2;\n}\n\n.notificationsDisplay-module_subtitle__CZtHD {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n.notificationsDisplay-module_titleAlone__S5WHP {\n  margin-bottom: 8px;\n}\n\n@keyframes notificationsDisplay-module_popup__KkKNG {\n  from {\n    transform: scale(0);\n    opacity: 0;\n  }\n\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n\n.notificationsDisplay-module__card_date__HwlO4 {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n.notificationsDisplay-module__wrap__6OMqp {\n  width: 400px;\n  padding: 8px 0 0 0;\n  min-height: 350px;\n  max-height: calc(100vh - 197px);\n  overflow: auto;\n}\n\n.notificationsDisplay-module__header_wrapper__OhD0l {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 12px;\n  padding: 0 16px;\n}\n\n.notificationsDisplay-module__link__Wtjb- {\n  cursor: pointer;\n}\n\n.notificationsDisplay-module__tabs_container__IF4c4 > div:first-child > div:first-child > div:first-child {\n  margin-left: 20px;\n}\n\n.notificationsDisplay-module__tabs_container__IF4c4 > div:first-child > div:first-child > div {\n  min-height: 36px;\n}\n\n.notificationsDisplay-module__tabs_container__IF4c4 > div:first-child > div:last-child {\n  max-height: 421px;\n  overflow-y: scroll;\n}\n\n.notificationsDisplay-module__show_more__CN0JW {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  margin-top: 7px;\n}\n\n.notificationsDisplay-module__loading_container__Zvp6Q,\n.notificationsDisplay-module__empty_container__Lu89F {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  margin-top: 96px;\n}\n\n.notificationsDisplay-module__loading_container__Zvp6Q {\n  margin-top: 128px;\n}\n\n.notificationsDisplay-module__empty_container__Lu89F > *:first-child {\n  margin-bottom: 12px;\n}\n\n.notificationsDisplay-module_linkedinNotificationBell__HwpUX {\n  margin-top: -10px;\n  margin-right: 16px;\n}\n\n.notificationsDisplay-module_salesforceNotificationBell__9eEP6 {\n  margin-right: -5px;\n}\n\n.notificationsDisplay-module_poweredByContainer__5YVtm {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding-top: 12px;\n  padding-bottom: 4px;\n}\n\n.notificationsDisplay-module_poweredByBox__I5PJH {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n\n@media (max-width: 853px) {\n  .notificationsDisplay-module_linkedinNotificationBell__HwpUX {\n    margin-top: 0;\n    margin-left: 16px;\n    margin-right: 0;\n  }\n}\n\n@media (max-width: 747px) {\n  .notificationsDisplay-module_linkedinNotificationBell__HwpUX {\n    margin: 0 8px;\n  }\n}\n";
var styles$1 = {"bell":"notificationsDisplay-module_bell__fgA98","pending":"notificationsDisplay-module_pending__XmhrZ","bellshake":"notificationsDisplay-module_bellshake__s-FvM","count":"notificationsDisplay-module_count__i5617","_card":"notificationsDisplay-module__card__-c1f4","_card__body":"notificationsDisplay-module__card__body__YW8ig","_card__info":"notificationsDisplay-module__card__info__lupsx","_unread":"notificationsDisplay-module__unread__yo4BD","popup":"notificationsDisplay-module_popup__KkKNG","title":"notificationsDisplay-module_title__oTAfF","subtitle":"notificationsDisplay-module_subtitle__CZtHD","titleAlone":"notificationsDisplay-module_titleAlone__S5WHP","_card_date":"notificationsDisplay-module__card_date__HwlO4","_wrap":"notificationsDisplay-module__wrap__6OMqp","_header_wrapper":"notificationsDisplay-module__header_wrapper__OhD0l","_link":"notificationsDisplay-module__link__Wtjb-","_tabs_container":"notificationsDisplay-module__tabs_container__IF4c4","_show_more":"notificationsDisplay-module__show_more__CN0JW","_loading_container":"notificationsDisplay-module__loading_container__Zvp6Q","_empty_container":"notificationsDisplay-module__empty_container__Lu89F","linkedinNotificationBell":"notificationsDisplay-module_linkedinNotificationBell__HwpUX","salesforceNotificationBell":"notificationsDisplay-module_salesforceNotificationBell__9eEP6","poweredByContainer":"notificationsDisplay-module_poweredByContainer__5YVtm","poweredByBox":"notificationsDisplay-module_poweredByBox__I5PJH"};
styleInject(css_248z$1);

function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(arg) { var key = _toPrimitive$2(arg, "string"); return _typeof$2(key) === "symbol" ? key : String(key); }
function _toPrimitive$2(input, hint) { if (_typeof$2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var TABS = [{
  key: 'updates',
  category: 'UPDATES'
}, {
  key: 'inbound',
  category: 'INBOUND'
}, {
  key: 'calls',
  category: 'CALLS'
}, {
  key: 'emailTracking',
  category: 'EMAIL_TRACKING'
}];
var NEW_TABS = function NEW_TABS(t) {
  return _defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2({}, t('tabs.updates'), 'UPDATES'), t('tabs.inbound'), 'INBOUND'), t('tabs.calls'), 'CALLS'), t('tabs.emailTracking'), 'EMAIL_TRACKING');
};
var ICONS = {
  NEW_EMAIL: {
    name: 'mail',
    color: 'tangerine'
  },
  WORKFLOWS: {
    name: 'zap',
    color: 'bloobirds'
  },
  NEW_LINKEDIN: {
    name: 'linkedin',
    color: 'darkBloobirds'
  },
  NEW_INBOUND: {
    name: 'download',
    color: 'banana'
  },
  NEW_INBOUND_LEAD: {
    name: 'personAdd',
    color: 'banana'
  },
  MISSED_CALL_UNKNOWN: {
    name: 'phone',
    color: 'tomato'
  },
  MISSED_CALL_LEAD: {
    name: 'phone',
    color: 'tomato'
  },
  REPORT_CALL: {
    name: 'phone',
    color: 'melon'
  },
  EMAIL_OPENED: {
    name: 'eye',
    color: 'banana'
  },
  EMAIL_CLICKED: {
    name: 'cursorClickOutline',
    color: 'grape'
  },
  MEETING_DONE: {
    name: 'calendar',
    color: 'tomato'
  },
  CADENCE_ENDED: {
    name: 'cadence',
    color: 'softPeanut'
  },
  IMPORT_FAILED: {
    name: 'upload',
    color: 'tomato'
  },
  IMPORT_COMPLETED: {
    name: 'upload',
    color: 'melon'
  },
  IMPORT_COMPLETED_WITH_WARNINGS: {
    name: 'upload',
    color: 'banana'
  },
  COMPANY_ASSIGNED: {
    name: 'deliver',
    color: 'grape'
  },
  LEAD_ASSIGNED: {
    name: 'deliver',
    color: 'grape'
  },
  SALES_COMPANY_ASSIGNED: {
    name: 'deliver',
    color: 'peanut'
  },
  SALES_LEAD_ASSIGNED: {
    name: 'deliver',
    color: 'peanut'
  },
  RELATED_COMPANY_MEETING: {
    name: 'relatedCompanyMeeting',
    color: 'meeting'
  },
  RELATED_COMPANY_STATUS_ACCOUNT: {
    name: 'relatedCompanyStatus',
    color: 'gray'
  },
  RELATED_COMPANY_STATUS_CLIENT: {
    name: 'relatedCompanyStatus',
    color: 'gray'
  },
  RELATED_COMPANIES_OPPORTUNITY: {
    name: 'relatedCompanyOpportunity',
    color: 'peanut'
  },
  RELATED_COMPANY_ACTIVITY_INBOUND: {
    name: 'relatedCompanyInbound',
    color: 'banana'
  },
  RELATED_COMPANY_LEAD_INBOUND: {
    name: 'relatedCompanyLead',
    color: 'banana'
  },
  ACCOUNT_STOPPED: {
    name: 'alertTriangle',
    color: 'email'
  }
};

var _excluded = ["id", "timestamp", "read", "title", "titleKey", "subtitle", "subtitleKey", "variable"];
function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$1(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var notificationsWithStatus = [NotificationsTypes.MEETING_ACCEPTED, NotificationsTypes.MEETING_DELETED, NotificationsTypes.MEETING_CANCELLED, NotificationsTypes.MEETING_RESCHEDULED];
var getCompoundIcon = function getCompoundIcon(type, parentRef) {
  var compoundProps;
  switch (type) {
    case NotificationsTypes.MEETING_ACCEPTED:
      compoundProps = {
        bagdeColor: 'lightestCall',
        icon: 'check',
        iconColor: 'extraCall'
      };
      break;
    case NotificationsTypes.MEETING_DELETED:
      compoundProps = {
        bagdeColor: 'lightestMeeting',
        icon: 'trashFull',
        iconColor: 'extraMeeting'
      };
      break;
    case NotificationsTypes.MEETING_CANCELLED:
      compoundProps = {
        bagdeColor: 'lightestMeeting',
        icon: 'cross',
        iconColor: 'extraMeeting'
      };
      break;
    case NotificationsTypes.MEETING_RESCHEDULED:
      compoundProps = {
        bagdeColor: 'verySoftPeanut',
        icon: 'repeat',
        iconColor: 'peanut'
      };
      break;
  }
  return /*#__PURE__*/jsx(CompoundIcon, {
    parent: /*#__PURE__*/jsx(Icon, {
      name: "calendar",
      color: "tomato"
    }),
    parentRef: parentRef,
    children: /*#__PURE__*/jsx(Avatar, {
      size: "supertiny",
      color: compoundProps.bagdeColor,
      children: /*#__PURE__*/jsx(Icon, {
        name: compoundProps.icon,
        color: compoundProps.iconColor,
        size: 10
      })
    })
  });
};
var NotificationCard = function NotificationCard(props) {
  var date = props.date,
    id = props.id,
    subtitle = props.subtitle,
    title = props.title,
    type = props.type,
    read = props.read,
    onDelete = props.onDelete,
    fromHome = props.fromHome,
    onCardClick = props.onCardClick;
  var classes = classNames(styles$1._card, _defineProperty$1({}, styles$1._unread, !read));
  var handleRemove = function handleRemove(event) {
    event.preventDefault();
    event.stopPropagation();
    onDelete(id);
  };
  var parentRef = useRef();
  return /*#__PURE__*/jsxs("li", {
    className: classes,
    onClick: onCardClick,
    children: [notificationsWithStatus.includes(type) ? getCompoundIcon(type, parentRef) : /*#__PURE__*/jsx(Icon, _objectSpread({}, ICONS[type])), /*#__PURE__*/jsxs("div", {
      className: styles$1._card__body,
      children: [/*#__PURE__*/jsx(Text, {
        dataTest: "Text-Notification-".concat(title),
        color: "darkGray",
        size: "xs",
        className: classNames(styles$1.title, _defineProperty$1({}, styles$1.titleAlone, !subtitle && fromHome)),
        children: title || ''
      }), /*#__PURE__*/jsx(Text, {
        dataTest: "Notification-Company-".concat(subtitle),
        color: "softPeanut",
        size: "xs",
        className: styles$1.subtitle,
        children: subtitle || ''
      })]
    }), /*#__PURE__*/jsxs("div", {
      className: styles$1._card__info,
      children: [/*#__PURE__*/jsx(IconButton, {
        name: "trashFull",
        size: 16,
        color: "bloobirds",
        onClick: handleRemove
      }), /*#__PURE__*/jsx(Tooltip, {
        position: "bottom",
        title: date && format(date, 'PPP ppp'),
        children: /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "softPeanut",
          className: styles$1._card_date,
          children: useGetI18nSpacetime().since(useGetI18nSpacetime(date)).rounded
        })
      })]
    })]
  });
};
var LoadingNotifications = function LoadingNotifications() {
  return /*#__PURE__*/jsx("div", {
    className: styles$1._loading_container,
    children: /*#__PURE__*/jsx(Spinner, {
      name: "loadingCircle"
    })
  });
};
var EmptyNotifications = function EmptyNotifications() {
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'misc.notifications'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsx("div", {
    className: styles$1._empty_container,
    children: t('noUpdates')
  });
};
var LoadMore = function LoadMore(_ref) {
  var onClick = _ref.onClick;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'misc.notifications'
    }),
    t = _useTranslation2.t;
  return /*#__PURE__*/jsx("div", {
    className: styles$1._show_more,
    onClick: onClick,
    children: /*#__PURE__*/jsx(Text, {
      size: "xxs",
      color: "bloobirds",
      children: t('loadMore')
    })
  });
};
var NotificationDisplay = function NotificationDisplay(notificationsInfo) {
  var onCardClick = notificationsInfo.onCardClick,
    notifications = notificationsInfo.notifications,
    isLoading = notificationsInfo.isLoading,
    isLastPage = notificationsInfo.isLastPage,
    loadMore = notificationsInfo.loadMore,
    removeNotification = notificationsInfo.removeNotification,
    markAsReadById = notificationsInfo.markAsReadById;
  if (isLoading) {
    return /*#__PURE__*/jsx(LoadingNotifications, {});
  }
  var _useTranslation3 = useTranslation(),
    t = _useTranslation3.t;
  if ((notifications === null || notifications === void 0 ? void 0 : notifications.length) === 0 || Array.isArray(notifications) && !notifications[0]) {
    return /*#__PURE__*/jsx(EmptyNotifications, {});
  }
  return /*#__PURE__*/jsxs("div", {
    children: [notifications && notifications.map(function (_ref2) {
      var id = _ref2.id,
        timestamp = _ref2.timestamp,
        read = _ref2.read,
        title = _ref2.title,
        titleKey = _ref2.titleKey,
        subtitle = _ref2.subtitle,
        subtitleKey = _ref2.subtitleKey,
        variable = _ref2.variable,
        info = _objectWithoutProperties(_ref2, _excluded);
      return /*#__PURE__*/jsx(NotificationCard, _objectSpread({
        id: id,
        read: read,
        date: new Date(timestamp),
        onDelete: removeNotification,
        onCardClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (read) {
                  _context.next = 3;
                  break;
                }
                _context.next = 3;
                return markAsReadById(id);
              case 3:
                onCardClick(info);
              case 4:
              case "end":
                return _context.stop();
            }
          }, _callee);
        })),
        title: titleKey ? variable ? t(titleKey, variable) : t(titleKey) : title,
        subtitle: subtitleKey ? t(subtitleKey) : subtitle
      }, info), id);
    }), !isLastPage && /*#__PURE__*/jsx(LoadMore, {
      onClick: loadMore
    })]
  });
};
var NotificationsBody = function NotificationsBody(props) {
  var unreadByCategory = props.unreadByCategory,
    markAsReadByCategory = props.markAsReadByCategory,
    category = props.category,
    setCategory = props.setCategory;
  var _useTranslation4 = useTranslation('translation', {
      keyPrefix: 'misc.notifications'
    }),
    t = _useTranslation4.t;
  return /*#__PURE__*/jsxs("div", {
    className: styles$1._wrap,
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$1._header_wrapper,
      children: [/*#__PURE__*/jsx(Text, {
        color: "darkGray",
        children: t('notifications')
      }), /*#__PURE__*/jsx("div", {
        className: styles$1._link,
        "data-test": "Link-HeaderNotificationDropdownMarkRead",
        onClick: markAsReadByCategory,
        children: /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "bloobirds",
          children: t('markAllAsRead')
        })
      })]
    }), /*#__PURE__*/jsx("main", {
      className: classNames(styles$1._tabs_container),
      children: /*#__PURE__*/jsx(TabGroup, {
        value: NEW_TABS(t)[category],
        onClick: function onClick(tabValue) {
          setCategory(NEW_TABS(t)[tabValue]);
        },
        children: TABS.map(function (_ref4) {
          var _unreadByCategory$dat;
          var key = _ref4.key,
            category = _ref4.category;
          return /*#__PURE__*/jsx(Tab, {
            name: t("tabs.".concat(key)),
            size: "xs",
            extraSize: "xxs",
            extra: (unreadByCategory === null || unreadByCategory === void 0 ? void 0 : (_unreadByCategory$dat = unreadByCategory.data) === null || _unreadByCategory$dat === void 0 ? void 0 : _unreadByCategory$dat[category]) || undefined,
            children: /*#__PURE__*/jsx(NotificationDisplay, _objectSpread({}, props))
          }, category);
        })
      })
    }), /*#__PURE__*/jsx("div", {
      className: styles$1.poweredByContainer,
      children: /*#__PURE__*/jsxs("div", {
        className: styles$1.poweredByBox,
        children: [/*#__PURE__*/jsx(Icon, {
          name: "bloobirds",
          color: "bloobirds",
          size: 16
        }), /*#__PURE__*/jsx(Text, {
          size: "xs",
          children: /*#__PURE__*/jsx(Trans, {
            i18nKey: "misc.notifications.poweredByBloobirds"
          })
        })]
      })
    })]
  });
};
var NotificationsDisplay = function NotificationsDisplay(_ref5) {
  var _onCardClick = _ref5.onCardClick;
  var url = normalizeUrl(window.location.href);
  var isSalesforce = isSalesforcePage(url);
  var isDynamics = isDynamicsPage(url);
  var unreadInfo = useNotificationsData();
  var notificationData = useNotifications();
  var props = _objectSpread(_objectSpread(_objectSpread({}, unreadInfo), notificationData), {}, {
    onCardClick: function onCardClick(value) {
      _onCardClick(value);
      setVisible(false);
      notificationData.setCategory(NotificationsCategory.UPDATES);
    }
  });
  var totalUnread = unreadInfo.totalUnread;
  var anchorRef = useRef();
  var _useVisible = useVisible(false, anchorRef),
    ref = _useVisible.ref,
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  var classes = classNames(styles$1.bell, _defineProperty$1({}, styles$1.pending, totalUnread !== 0));
  var classesRoot = !isDynamics ? !isSalesforce ? styles$1.linkedinNotificationBell : styles$1.salesforceNotificationBell : null;
  return /*#__PURE__*/jsx("div", {
    className: classesRoot,
    children: /*#__PURE__*/jsx(Dropdown, {
      ref: ref,
      visible: visible,
      anchor: /*#__PURE__*/jsxs("div", {
        "data-test": "Button-HeaderNotificationBell",
        role: "button",
        tabIndex: 0,
        className: classes,
        onClick: function onClick() {
          notificationData.setCategory(NotificationsCategory.UPDATES);
          setVisible(!visible);
        },
        ref: anchorRef,
        children: [/*#__PURE__*/jsx(IconButton, {
          name: "bellFilled",
          color: "bloobirds",
          size: 24
        }), totalUnread > 0 && /*#__PURE__*/jsx("div", {
          "data-test": "Number-HeaderNotificationCounterValue",
          className: styles$1.count,
          children: totalUnread
        })]
      }, totalUnread),
      children: /*#__PURE__*/jsx(NotificationsBody, _objectSpread({}, props))
    })
  });
};

var css_248z = ".infoWarning-module_title__gb2AG {\n  background-color: var(--softBanana);\n  padding: 4px;\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--peanut);\n  line-height: 24px;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n\n.infoWarning-module_body__Np-30 {\n  background-color: var(--verySoftBanana);\n  padding: 12px;\n  padding-top: 8px;\n  font-size: 12px;\n  font-weight: 400;\n  color: var(--peanut);\n  line-height: 14.52px;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n}\n\n.infoWarning-module_viewLogsButton__wneyM {\n  margin-top: 8px;\n  font-size: 12px;\n}\n\n.infoWarning-module_body__Np-30 > button {\n  justify-content: center !important;\n}\n\n.infoWarning-module_anchor__37SFz,\n.infoWarning-module_anchorInfo__-YVlk {\n  display: flex;\n}\n\n.infoWarning-module_anchor__37SFz > span {\n  width: 16px;\n  height: 16px;\n  padding: 2px;\n}\n\n.infoWarning-module_anchorMedium__HKK69 > span {\n  width: 21px;\n  height: 21px;\n  padding: 2px;\n}\n\n.infoWarning-module_anchorInfo__-YVlk > span {\n  width: 24px;\n  height: 24px;\n  padding: 2px;\n}\n\n.infoWarning-module_anchor__37SFz path,\n.infoWarning-module_anchorInfo__-YVlk path {\n  fill: var(--peanut);\n}\n";
var styles = {"title":"infoWarning-module_title__gb2AG","body":"infoWarning-module_body__Np-30","viewLogsButton":"infoWarning-module_viewLogsButton__wneyM","anchor":"infoWarning-module_anchor__37SFz","anchorInfo":"infoWarning-module_anchorInfo__-YVlk","anchorMedium":"infoWarning-module_anchorMedium__HKK69"};
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
var InfoWarningSync = function InfoWarningSync(_ref) {
  var _settings$user, _settings$user$roles, _settings$user2, _settings$user2$roles;
  var type = _ref.type,
    id = _ref.id,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'small' : _ref$size;
  var _useState = useState(false),
    _useState2 = _slicedToArray$1(_useState, 2),
    visible = _useState2[0],
    setVisible = _useState2[1];
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var isAdminUser = (settings === null || settings === void 0 ? void 0 : (_settings$user = settings.user) === null || _settings$user === void 0 ? void 0 : (_settings$user$roles = _settings$user.roles) === null || _settings$user$roles === void 0 ? void 0 : _settings$user$roles.includes(UserRole.GLOBAL_ADMIN)) || (settings === null || settings === void 0 ? void 0 : (_settings$user2 = settings.user) === null || _settings$user2 === void 0 ? void 0 : (_settings$user2$roles = _settings$user2.roles) === null || _settings$user2$roles === void 0 ? void 0 : _settings$user2$roles.includes(UserRole.ACCOUNT_ADMIN));
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var ref = useRef(null);
  useClickAway(ref, function () {
    return setVisible(false);
  });
  return /*#__PURE__*/jsx(Dropdown, {
    visible: visible,
    width: 200,
    position: "top",
    style: {
      padding: '0px'
    },
    ref: ref,
    anchor: /*#__PURE__*/jsx("div", {
      onClick: function onClick(e) {
        e.stopPropagation();
        e.preventDefault();
        setVisible(true);
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SYNC_ISSUE);
      },
      className: classNames(styles.anchor, _defineProperty({}, styles.anchorMedium, size === 'medium')),
      children: /*#__PURE__*/jsx(Action, {
        icon: "alertTriangle",
        color: "softBanana"
      })
    }),
    color: "verySoftBanana",
    children: /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsxs("div", {
        className: styles.title,
        children: [/*#__PURE__*/jsx(Icon, {
          name: "alertTriangle",
          color: "peanut",
          size: 24
        }), t('extendedScreen.header.syncIssues')]
      }), isAdminUser ? /*#__PURE__*/jsxs("div", {
        className: styles.body,
        children: [/*#__PURE__*/jsx(Trans, {
          i18nKey: "extendedScreen.header.syncIssuesMessageAdmin",
          values: {
            type: type
          }
        }), /*#__PURE__*/jsx(Button, {
          variant: "secondary",
          iconRight: "externalLink",
          uppercase: false,
          expand: true,
          size: "small",
          className: styles.viewLogsButton,
          onClick: function onClick() {
            return window.open("".concat(baseUrls["development"], "/app/account-settings/integration/salesforce/sync?&bobjectType=").concat(id === null || id === void 0 ? void 0 : id.typeName, "&bobjectId=").concat(id === null || id === void 0 ? void 0 : id.objectId, "&dateRange=all_time"), '_blank');
          },
          children: t('extendedScreen.header.viewLogs')
        })]
      }) : /*#__PURE__*/jsx("div", {
        className: styles.body,
        children: /*#__PURE__*/jsx(Trans, {
          i18nKey: "extendedScreen.header.syncIssuesMessage",
          values: {
            type: type
          }
        })
      })]
    })
  });
};

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var InfoWarning = function InfoWarning(_ref) {
  var message = _ref.message;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    visible = _useState2[0],
    setVisible = _useState2[1];
  var ref = useRef(null);
  useClickAway(ref, function () {
    return setVisible(false);
  });
  return /*#__PURE__*/jsx(Dropdown, {
    visible: visible,
    width: 200,
    position: "top",
    style: {
      padding: '0px'
    },
    ref: ref,
    anchor: /*#__PURE__*/jsx("div", {
      onMouseEnter: function onMouseEnter() {
        return setVisible(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setVisible(false);
      },
      className: styles.anchorInfo,
      children: /*#__PURE__*/jsx(Action, {
        icon: "alertTriangle",
        color: "softBanana"
      })
    }),
    color: "verySoftBanana",
    children: /*#__PURE__*/jsx("div", {
      className: styles.body,
      children: message
    })
  });
};

export { AttachmentItem, AttachmentList, InfoWarning, InfoWarningSync, NoResultsPage, NotificationsDisplay, getCompoundIcon, notificationsWithStatus, useAttachedFiles, useAttachedLinks };
//# sourceMappingURL=index.js.map
