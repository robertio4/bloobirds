import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-dist-index.js.js");import RefreshRuntime from "/vendor/react-refresh.js";let prevRefreshReg;let prevRefreshSig;if (import.meta.hot) {  if (!window.__vite_plugin_react_preamble_installed__) {    throw new Error(      "@vitejs/plugin-react can't detect preamble. Something is wrong. " +      "See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201"    );  }  prevRefreshReg = window.$RefreshReg$;  prevRefreshSig = window.$RefreshSig$;  window.$RefreshReg$ = (type, id) => {    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/dist/index.js" + " " + id)  };  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;}var _s2 = $RefreshSig$(),
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
  _s45 = $RefreshSig$(),
  _s46 = $RefreshSig$(),
  _s47 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useState = __vite__cjsImport2_react["useState"]; const useMemo = __vite__cjsImport2_react["useMemo"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const createContext = __vite__cjsImport2_react["createContext"]; const useContext = __vite__cjsImport2_react["useContext"]; const useRef = __vite__cjsImport2_react["useRef"]; const useLayoutEffect = __vite__cjsImport2_react["useLayoutEffect"]; const useCallback = __vite__cjsImport2_react["useCallback"];
import { useTranslation, Trans } from '/vendor/.vite-deps-react-i18next.js__v--8418bf92.js';
import { useClickAway } from '/vendor/.vite-deps-react-use.js__v--5f516bce.js';
import { Spinner, Icon, Tooltip, Text, IconButton, Modal, ModalHeader, ModalCloseIcon, Dropdown, CommandBox, Checkbox, Button, Callout, ModalContent, Select, Item, DateTimePicker, ModalFooter, createToast, ModalTitle, Skeleton, DateTimeShortcut, useVisible, RadioGroup, Radio, Label, TimelineItem, useHover, CounterBadge, DatePicker, ModalSection, ChipGroup, Chip } from '/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js';
import { useFullSalesEnabled, useCustomTasks, useActiveUserSettings, useCadenceV2Enabled, useActiveUserId, BASE_SEARCH_REQUEST, useUserTimeZone, useCadenceInfo, useMediaQuery, useDataModel, useQuickLogActivity, usePausePeriods, useFieldsData, useMinimizableModals, useUserSearch } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js';
import { BobjectTypes, isBobject, COMPANY_FIELDS_LOGIC_ROLE, FIELDS_LOGIC_ROLE, TASK_FIELDS_LOGIC_ROLE, TASK_TYPE, TASK_STATUS_VALUE_LOGIC_ROLE, OPPORTUNITY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, IMPORT_THRESHOLD, BulkActions, MIXPANEL_EVENTS, PluralBobjectTypes, UserPermission, UserRole, LEAD_STATUS_LOGIC_ROLE, MessagesEvents, ACTIVITY_FIELDS_LOGIC_ROLE, TASK_PRIORITY_VALUE, TASK_ACTION_VALUE, BOBJECT_TYPES, ACTIVITY_MODE } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js';
import { api, isCompany, getTextFromLogicRole, getValueFromLogicRole, isOpportunity, isLead, removeHtmlTags, getFieldByLogicRole, toSentenceCase, getUserTimeZone, formatDate, injectReferenceFields, getReferencedBobjectFromLogicRole, isDifferentYearThanCurrent, getReferencedBobject, parseUTCDateToLocal, keepPreviousResponse, getExtensionBobjectByIdFields } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js';
import clsx from '/vendor/.vite-deps-clsx.js__v--07c00239.js';
import { isBefore, addHours, format, isToday, isThisMonth, isThisWeek, isWeekend } from '/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js';
import __vite__cjsImport11_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport11_mixpanelBrowser.__esModule ? __vite__cjsImport11_mixpanelBrowser.default : __vite__cjsImport11_mixpanelBrowser;
import spacetime from '/vendor/.vite-deps-spacetime.js__v--14e7d295.js';
import useSWR from '/vendor/.vite-deps-swr.js__v--ed0a962e.js';
import { useSearchSubscription, useEventSubscription } from '/vendor/.vite-deps-@bloobirds-it_plover.js__v--88b8fafa.js';
import { jsx, jsxs, Fragment } from '/vendor/id-__x00__react-jsx-runtime.js';
import { useVirtual, defaultRangeExtractor } from '/vendor/.vite-deps-react-virtual.js__v--222284ba.js';
import __vite__cjsImport17_lodash_isEqual from "/vendor/.vite-deps-lodash_isEqual.js__v--1a3ee503.js"; const isEqual = __vite__cjsImport17_lodash_isEqual.__esModule ? __vite__cjsImport17_lodash_isEqual.default : __vite__cjsImport17_lodash_isEqual;
import { useRichTextEditorPlugins, deserialize, serialize } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js';
import __vite__cjsImport19_lodash_isArray from "/vendor/.vite-deps-lodash_isArray.js__v--c631996a.js"; const isArray = __vite__cjsImport19_lodash_isArray.__esModule ? __vite__cjsImport19_lodash_isArray.default : __vite__cjsImport19_lodash_isArray;
import { CustomDateDialog, BobjectSelector } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-dist-index.js.js';
import { getI18nSpacetimeLng, useGetI18nSpacetime } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js';
import { createMachine } from '/vendor/.vite-deps-xstate.js__v--ca84df4a.js';
import __vite__cjsImport23_lodash_debounce from "/vendor/.vite-deps-lodash_debounce.js__v--ce8d7378.js"; const debounce = __vite__cjsImport23_lodash_debounce.__esModule ? __vite__cjsImport23_lodash_debounce.default : __vite__cjsImport23_lodash_debounce;
import { BobjectName, ActivityTimelineItem } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-activityTimelineItem-dist-index.js.js';
import { useMachine } from '/vendor/.vite-deps-@xstate_react.js__v--bb985310.js';
import { CadenceFeedback } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-assets-dist-index.js.js';
import { useForm, useController } from '/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js';
import { TaskTypeSelector, PrioritySelector } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-dist-index.js.js';
function _typeof$m(obj) {
  "@babel/helpers - typeof";

  return _typeof$m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$m(obj);
}
function _regeneratorRuntime$3() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */_regeneratorRuntime$3 = function _regeneratorRuntime() {
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
        return value && "object" == _typeof$m(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
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
function asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, key, arg) {
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
function _asyncToGenerator$3(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function useCadenceSteps(cadenceId) {
  _s2();
  var _data$data;
  var url = "/messaging/cadences/".concat(cadenceId, "/steps");
  var _useSWR = useSWR(cadenceId && [url, cadenceId], function () {
      return api.get(url);
    }, {}),
    data = _useSWR.data,
    mutate = _useSWR.mutate,
    isValidating = _useSWR.isValidating;
  var createStep = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator$3( /*#__PURE__*/_regeneratorRuntime$3().mark(function _callee(data) {
      return _regeneratorRuntime$3().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return api.post(url, data);
          case 2:
            mutate();
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function createStep(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var updateStep = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator$3( /*#__PURE__*/_regeneratorRuntime$3().mark(function _callee2(data, stepId) {
      var updateUrl;
      return _regeneratorRuntime$3().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            updateUrl = "".concat(url, "/").concat(stepId);
            _context2.next = 3;
            return api.put(updateUrl, data);
          case 3:
            mutate();
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function updateStep(_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  var cloneStep = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator$3( /*#__PURE__*/_regeneratorRuntime$3().mark(function _callee3(id) {
      return _regeneratorRuntime$3().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return api.post("".concat(url, "/").concat(id, "/clone"));
          case 2:
            mutate();
          case 3:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function cloneStep(_x4) {
      return _ref3.apply(this, arguments);
    };
  }();
  var deleteStep = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator$3( /*#__PURE__*/_regeneratorRuntime$3().mark(function _callee4(id) {
      return _regeneratorRuntime$3().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return api["delete"]("".concat(url, "/").concat(id), {
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              },
              data: {}
            });
          case 2:
            mutate();
          case 3:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function deleteStep(_x5) {
      return _ref4.apply(this, arguments);
    };
  }();
  return {
    steps: (data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.steps) || [],
    loading: isValidating,
    createStep: createStep,
    updateStep: updateStep,
    cloneStep: cloneStep,
    deleteStep: deleteStep
  };
}
_s2(useCadenceSteps, "+9J0l1/I7TKVvtqA7b3MIl/nmJ4=", false, function () {
  return [useSWR];
});
function _typeof$l(obj) {
  "@babel/helpers - typeof";

  return _typeof$l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$l(obj);
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
  return _typeof$l(key) === "symbol" ? key : String(key);
}
function _toPrimitive$j(input, hint) {
  if (_typeof$l(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$l(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _regeneratorRuntime$2() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */_regeneratorRuntime$2 = function _regeneratorRuntime() {
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
        return value && "object" == _typeof$l(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
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
function asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, key, arg) {
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
function _asyncToGenerator$2(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
var fetchCadences = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee(url) {
    var response;
    return _regeneratorRuntime$2().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return api.get(url, {});
        case 2:
          response = _context.sent;
          return _context.abrupt("return", response.data);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fetchCadences(_x) {
    return _ref.apply(this, arguments);
  };
}();
var useCadences = function useCadences(_ref2) {
  _s3();
  var _getBobjectTypesNames;
  var bobjectTypeName = _ref2.bobjectTypeName,
    accountId = _ref2.accountId,
    filters = _ref2.filters,
    requestParams = _ref2.requestParams,
    _ref2$includeDeleted = _ref2.includeDeleted,
    includeDeleted = _ref2$includeDeleted === void 0 ? false : _ref2$includeDeleted;
  var _ref3 = filters || {},
    selectedAuthor = _ref3.selectedAuthor,
    selectedTags = _ref3.selectedTags,
    searchValue = _ref3.searchValue,
    _ref3$showDisabled = _ref3.showDisabled,
    showDisabled = _ref3$showDisabled === void 0 ? true : _ref3$showDisabled;
  var _ref4 = requestParams || {},
    page = _ref4.page,
    pageSize = _ref4.pageSize;
  var isFullSalesEnabled = useFullSalesEnabled(accountId);
  var getBobjectTypesNames = function getBobjectTypesNames() {
    if (bobjectTypeName) {
      return Array.isArray(bobjectTypeName) ? (bobjectTypeName === null || bobjectTypeName === void 0 ? void 0 : bobjectTypeName.length) === 0 ? [BobjectTypes.Company, BobjectTypes.Lead, isFullSalesEnabled ? BobjectTypes.Opportunity : ''] : bobjectTypeName : [bobjectTypeName];
    }
    return null;
  };
  var markAsDefault = function markAsDefault(cadenceId) {
    return api.put("/messaging/cadences/".concat(cadenceId, "/markAsDefault"));
  };
  var clone = function clone(_ref5) {
    var cadenceId = _ref5.cadenceId,
      bobjectTypeToClone = _ref5.bobjectTypeToClone,
      name = _ref5.name;
    return api.post("/messaging/cadences/".concat(cadenceId, "/clone"), {
      name: name,
      bobjectType: bobjectTypeToClone
    });
  };
  var deleteCadence = function deleteCadence(cadenceId) {
    return api["delete"]("/messaging/cadences/".concat(cadenceId), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: {}
    });
  };
  var bobjectTypesToRequest = (_getBobjectTypesNames = getBobjectTypesNames()) === null || _getBobjectTypesNames === void 0 ? void 0 : _getBobjectTypesNames.join(',');
  var _useSWR = useSWR("/messaging/cadences?bobjectTypes=".concat(bobjectTypesToRequest, "&includeDeleted=").concat(includeDeleted), fetchCadences, {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: true
    }),
    entities = _useSWR.data,
    mutate = _useSWR.mutate;
  var _useSWR2 = useSWR(selectedAuthor || searchValue || page || pageSize ? "/messaging/cadences?bobjectTypes=".concat(bobjectTypesToRequest, "&author=").concat(selectedAuthor === null || selectedAuthor === void 0 ? void 0 : selectedAuthor.join(','), "&tags=").concat(selectedTags === null || selectedTags === void 0 ? void 0 : selectedTags.join(','), "&search=").concat(searchValue !== null && searchValue !== void 0 ? searchValue : '', "&page=").concat(page, "&pageSize=").concat(pageSize).concat(showDisabled ? '' : '&enabled=true') : null, (page || pageSize) && fetchCadences, {
      keepPreviousData: true,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: true
    }),
    paginatedEntities = _useSWR2.data,
    mutatePaginatedEntities = _useSWR2.mutate,
    error = _useSWR2.error;
  var getUsesCadence = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee2(cadenceId, bobjectTypeName) {
      var _response$data, _response$data$conten;
      var query, searchQuery, response, count;
      return _regeneratorRuntime$2().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            query = _defineProperty$j({}, "".concat(bobjectTypeName.toUpperCase(), "__CADENCE"), cadenceId);
            searchQuery = {
              query: query,
              page: 0,
              formFields: true,
              pageSize: 1000,
              injectReferences: true,
              sort: []
            };
            _context2.next = 4;
            return api.post("/bobjects/".concat(accountId, "/").concat(bobjectTypeName, "/aggregation"), searchQuery);
          case 4:
            response = _context2.sent;
            count = response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : (_response$data$conten = _response$data.contents[0]) === null || _response$data$conten === void 0 ? void 0 : _response$data$conten.value;
            return _context2.abrupt("return", count || 0);
          case 7:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function getUsesCadence(_x2, _x3) {
      return _ref6.apply(this, arguments);
    };
  }();
  return {
    cadences: entities === null || entities === void 0 ? void 0 : entities.cadences,
    paginatedCadences: paginatedEntities === null || paginatedEntities === void 0 ? void 0 : paginatedEntities.cadences,
    totalCadences: paginatedEntities === null || paginatedEntities === void 0 ? void 0 : paginatedEntities.totalElements,
    refreshCadences: mutate,
    refreshPaginatedCadences: mutatePaginatedEntities,
    isLoading: !paginatedEntities,
    error: error,
    markAsDefault: markAsDefault,
    clone: clone,
    "delete": deleteCadence,
    getUsesCadence: getUsesCadence
  };
};
_s3(useCadences, "AZX71TEYaeEfj+cLdaBmfgn9EOg=", false, function () {
  return [useFullSalesEnabled, useSWR, useSWR];
});
function _slicedToArray$g(arr, i) {
  return _arrayWithHoles$g(arr) || _iterableToArrayLimit$g(arr, i) || _unsupportedIterableToArray$g(arr, i) || _nonIterableRest$g();
}
function _nonIterableRest$g() {
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
function _iterableToArrayLimit$g(arr, i) {
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
function _arrayWithHoles$g(arr) {
  if (Array.isArray(arr)) return arr;
}
var fetchCadenceByTargetMarket = function fetchCadenceByTargetMarket(_ref) {
  var _ref2 = _slicedToArray$g(_ref, 2),
    url = _ref2[0],
    targetMarketName = _ref2[1];
  return api.get("".concat(url).concat(targetMarketName ? "?targetMarketName=".concat(targetMarketName) : ''));
};
var useCadenceTable = function useCadenceTable(bobjectToSet) {
  _s4();
  var _bobject$id, _bobject$id2;
  var _useState = useState(bobjectToSet),
    _useState2 = _slicedToArray$g(_useState, 2),
    bobject = _useState2[0],
    setBobject = _useState2[1];
  var typeName = bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.typeName;
  var accountId = bobject === null || bobject === void 0 ? void 0 : (_bobject$id2 = bobject.id) === null || _bobject$id2 === void 0 ? void 0 : _bobject$id2.accountId;
  var _useCadences = useCadences({
      bobjectTypeName: typeName,
      accountId: accountId,
      includeDeleted: true
    }),
    cadences = _useCadences.cadences;
  var companyTM = useMemo(function () {
    if (bobject) {
      if (!isBobject(bobject)) {
        return bobject.targetMarket;
      } else if (isCompany(bobject)) {
        return getTextFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET);
      }
    } else return null;
  }, [bobject]);
  var _useSWR = useSWR(companyTM ? ['/service/view/cadence/targetMarket', companyTM] : null, fetchCadenceByTargetMarket),
    cadenceByTargetMarket = _useSWR.data;
  var getDefaultCadence = function getDefaultCadence() {
    switch (typeName) {
      case BobjectTypes.Company:
        {
          var defaultCadenceByBobjectType = cadences === null || cadences === void 0 ? void 0 : cadences.find(function (cadence) {
            return cadence === null || cadence === void 0 ? void 0 : cadence.defaultCadence;
          });
          var defaultCadenceByTargetMarket = cadences === null || cadences === void 0 ? void 0 : cadences.find(function (cadence) {
            var _cadenceByTargetMarke;
            return cadence.name === (cadenceByTargetMarket === null || cadenceByTargetMarket === void 0 ? void 0 : (_cadenceByTargetMarke = cadenceByTargetMarket.data) === null || _cadenceByTargetMarke === void 0 ? void 0 : _cadenceByTargetMarke.name);
          });
          return defaultCadenceByTargetMarket || defaultCadenceByBobjectType;
        }
      case BobjectTypes.Opportunity:
        {
          // TODO: Talk about how to better do this bullshit
          //return settings?.opportunityDefaultCadenceName;
          return null;
        }
      case BobjectTypes.Lead:
        return cadences === null || cadences === void 0 ? void 0 : cadences.find(function (cadence) {
          return cadence.defaultCadence;
        });
      default:
        return undefined;
    }
  };
  var defaultCadence = useMemo(function () {
    return bobject && cadences && getDefaultCadence();
  }, [bobject, cadences, cadenceByTargetMarket]);
  var cadenceId = useMemo(function () {
    var cadenceName = '';
    if (bobject) {
      if (isBobject(bobject)) {
        var _FIELDS_LOGIC_ROLE, _bobject$id3;
        cadenceName = getValueFromLogicRole(bobject, (_FIELDS_LOGIC_ROLE = FIELDS_LOGIC_ROLE[(_bobject$id3 = bobject.id) === null || _bobject$id3 === void 0 ? void 0 : _bobject$id3.typeName]) === null || _FIELDS_LOGIC_ROLE === void 0 ? void 0 : _FIELDS_LOGIC_ROLE.CADENCE);
      } else {
        var _bobject$cadenceId;
        cadenceName = (_bobject$cadenceId = bobject.cadenceId) !== null && _bobject$cadenceId !== void 0 ? _bobject$cadenceId : bobject.cadence;
      }
    }
    return cadenceName;
  }, [bobject]);
  useEffect(function () {
    if (bobjectToSet) {
      setBobject(bobjectToSet);
    }
  }, [bobjectToSet]);
  return {
    bobject: bobject,
    cadence: cadenceId ? cadences === null || cadences === void 0 ? void 0 : cadences.find(function (cadence) {
      return (cadence === null || cadence === void 0 ? void 0 : cadence.id) === cadenceId;
    }) : defaultCadence,
    defaultCadence: defaultCadence
  };
};
_s4(useCadenceTable, "/VCSBLEUxxTyFnn0otKQhPRwKzE=", false, function () {
  return [useCadences, useSWR];
});
function _typeof$k(obj) {
  "@babel/helpers - typeof";

  return _typeof$k = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$k(obj);
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
      _defineProperty$i(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$b(Object(source)).forEach(function (key) {
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
  return _typeof$k(key) === "symbol" ? key : String(key);
}
function _toPrimitive$i(input, hint) {
  if (_typeof$k(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$k(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$f(arr, i) {
  return _arrayWithHoles$f(arr) || _iterableToArrayLimit$f(arr, i) || _unsupportedIterableToArray$f(arr, i) || _nonIterableRest$f();
}
function _nonIterableRest$f() {
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
var useHasCadenceStarted = function useHasCadenceStarted(bobject) {
  _s5();
  var _bobject$id, _bobject$id2;
  var _useState = useState(false),
    _useState2 = _slicedToArray$f(_useState, 2),
    hasStarted = _useState2[0],
    setHasStarted = _useState2[1];
  var _useState3 = useState(true),
    _useState4 = _slicedToArray$f(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var isFullSalesEnabled = useFullSalesEnabled(bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.accountId);
  var bobjectType = bobject === null || bobject === void 0 ? void 0 : (_bobject$id2 = bobject.id) === null || _bobject$id2 === void 0 ? void 0 : _bobject$id2.typeName;
  var searchRequest = useMemo(function () {
    if (!bobject) {
      return null;
    }
    var query = {};
    switch (bobjectType) {
      case BobjectTypes.Company:
        {
          query[TASK_FIELDS_LOGIC_ROLE.COMPANY] = [bobject === null || bobject === void 0 ? void 0 : bobject.id.value];
          query[TASK_FIELDS_LOGIC_ROLE.LEAD] = ['__MATCH_EMPTY_ROWS__'];
          if (isFullSalesEnabled) {
            query[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = ['__MATCH_EMPTY_ROWS__'];
          }
          break;
        }
      case BobjectTypes.Lead:
        {
          query[TASK_FIELDS_LOGIC_ROLE.LEAD] = [bobject === null || bobject === void 0 ? void 0 : bobject.id.value];
          if (isFullSalesEnabled) {
            query[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = ['__MATCH_EMPTY_ROWS__'];
          }
          break;
        }
      case BobjectTypes.Opportunity:
        {
          if (bobject.companyId) {
            query[TASK_FIELDS_LOGIC_ROLE.COMPANY] = [bobject.companyId];
          }
          query[TASK_FIELDS_LOGIC_ROLE.LEAD] = ['__MATCH_EMPTY_ROWS__'];
          query[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = [bobject === null || bobject === void 0 ? void 0 : bobject.id.value];
          break;
        }
    }
    return {
      query: _objectSpread$b(_objectSpread$b({}, query), {}, _defineProperty$i(_defineProperty$i({}, TASK_FIELDS_LOGIC_ROLE.STATUS, [TASK_STATUS_VALUE_LOGIC_ROLE.TODO, TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE]), TASK_FIELDS_LOGIC_ROLE.TASK_TYPE, [TASK_TYPE.PROSPECT_CADENCE, TASK_TYPE.START_CADENCE])),
      formFields: true,
      pageSize: 10,
      injectReferences: true
    };
  }, [bobject]);
  var _useSearchSubscriptio = useSearchSubscription(searchRequest, BobjectTypes.Task),
    data = _useSearchSubscriptio.data;
  useEffect(function () {
    if (data) {
      setHasStarted(!!data.data.contents.length);
      setIsLoading(false);
    }
  }, [data]);
  return {
    isLoading: isLoading,
    hasStarted: hasStarted
  };
};
_s5(useHasCadenceStarted, "ZYC+sgtlyze4FfI8FqhWNpjX6mM=", false, function () {
  return [useFullSalesEnabled, useSearchSubscription];
});
function _typeof$j(obj) {
  "@babel/helpers - typeof";

  return _typeof$j = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$j(obj);
}
var _excluded$3 = ["children"];
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
      _defineProperty$h(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$a(Object(source)).forEach(function (key) {
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
  return _typeof$j(key) === "symbol" ? key : String(key);
}
function _toPrimitive$h(input, hint) {
  if (_typeof$j(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$j(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$e(arr, i) {
  return _arrayWithHoles$e(arr) || _iterableToArrayLimit$e(arr, i) || _unsupportedIterableToArray$e(arr, i) || _nonIterableRest$e();
}
function _nonIterableRest$e() {
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
var CadenceControlModalProvider = function CadenceControlModalProvider(_ref) {
  _s6();
  var _FIELDS_LOGIC_ROLE, _bobject$id;
  var children = _ref.children,
    props = _objectWithoutProperties$3(_ref, _excluded$3);
  var bobject = props.bobject,
    initialStep = props.initialStep;
  var _useState = useState(initialStep),
    _useState2 = _slicedToArray$e(_useState, 2),
    stepInfo = _useState2[0],
    setStepInfo = _useState2[1];
  var opportunityBobject = isOpportunity(bobject);
  var leadBobject = isLead(bobject);
  var companyBobject = isCompany(bobject);
  var _useHasCadenceStarted = useHasCadenceStarted({
      id: bobject === null || bobject === void 0 ? void 0 : bobject.id,
      companyId: opportunityBobject ? getValueFromLogicRole(bobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY) : undefined
    }),
    cadenceWasStarted = _useHasCadenceStarted.hasStarted,
    isLoadingCadenceStarted = _useHasCadenceStarted.isLoading;
  var cadenceManagement = useCadenceControlData(bobject);
  var bobjectName = leadBobject ? (bobject === null || bobject === void 0 ? void 0 : bobject.fullName) || getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) : (bobject === null || bobject === void 0 ? void 0 : bobject.name) || getTextFromLogicRole(bobject, (_FIELDS_LOGIC_ROLE = FIELDS_LOGIC_ROLE[bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.typeName]) === null || _FIELDS_LOGIC_ROLE === void 0 ? void 0 : _FIELDS_LOGIC_ROLE.NAME);
  return !isLoadingCadenceStarted && /*#__PURE__*/jsx(CadenceControlModalContext.Provider, {
    value: _objectSpread$a(_objectSpread$a({}, props), {}, {
      isOpportunity: opportunityBobject,
      isLead: leadBobject,
      isCompany: companyBobject,
      bobjectName: bobjectName,
      stepInfo: stepInfo,
      setStepInfo: setStepInfo,
      cadenceManagement: cadenceManagement,
      cadenceWasStarted: cadenceWasStarted
    }),
    children: children
  });
};
_s6(CadenceControlModalProvider, "XA86tHFECXpwcNP0QOXZW+cSeUY=", false, function () {
  return [useHasCadenceStarted, useCadenceControlData];
});
_c = CadenceControlModalProvider;
var CadenceControlModalContext = /*#__PURE__*/createContext(null);
var useCadenceControlModal = function useCadenceControlModal() {
  _s7();
  var context = useContext(CadenceControlModalContext);
  if (context === undefined) {
    throw new Error('useInactiveHandlingModal must be used within the modal provider');
  }
  return context;
};
_s7(useCadenceControlModal, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var putStartCadence = function putStartCadence(_ref2) {
  var bobjectId = _ref2.bobjectId,
    bobjectType = _ref2.bobjectType,
    startCadence = _ref2.startCadence,
    cadenceId = _ref2.cadenceId;
  return api.put("/messaging/cadences/".concat(cadenceId, "/start"), {
    bobjectId: bobjectId,
    bobjectType: bobjectType,
    startCadence: startCadence
  });
};
var launchQueuedBulkAction = function launchQueuedBulkAction(_ref3) {
  var action = _ref3.action,
    query = _ref3.query,
    params = _ref3.params,
    total = _ref3.total,
    bobjectType = _ref3.bobjectType,
    bobjectIds = _ref3.bobjectIds,
    contents = _ref3.contents;
  var isStartCadence = action === BulkActions.START_CADENCE;
  var isByQuery = !!query;
  return api.post("/bobjects/bulkAction/".concat(isByQuery ? 'createBulkByQuery' : 'createBulk'), _objectSpread$a(_objectSpread$a({
    importName: "".concat(isStartCadence ? 'Start' : 'Stop', " cadence in ").concat(total, " ").concat(PluralBobjectTypes[bobjectType]),
    actionType: action,
    bobjectIds: bobjectIds
  }, isByQuery ? {
    query: query
  } : {}), {}, {
    bobjectType: bobjectType,
    contents: contents
  }, isStartCadence ? params : {}));
};
var putBulkCadence = function putBulkCadence(_ref4) {
  var startCadence = _ref4.startCadence,
    cadenceId = _ref4.cadenceId,
    bobjects = _ref4.bobjects;
  var body = bobjects.map(function (bobject) {
    return {
      bobjectId: bobject === null || bobject === void 0 ? void 0 : bobject.id.objectId,
      bobjectType: bobject === null || bobject === void 0 ? void 0 : bobject.id.typeName,
      startCadence: startCadence,
      cadenceId: cadenceId
    };
  });
  return api.put("/messaging/cadences/start", body);
};
var putBulkStopCadence = function putBulkStopCadence(_ref5) {
  var bobjects = _ref5.bobjects;
  var body = bobjects.map(function (bobject) {
    return {
      bobjectId: bobject === null || bobject === void 0 ? void 0 : bobject.id.objectId,
      bobjectType: bobject === null || bobject === void 0 ? void 0 : bobject.id.typeName
    };
  });
  return api.put("/messaging/cadences/stop", body);
};
var putStopCadence = function putStopCadence(_ref6) {
  var bobjectId = _ref6.bobjectId,
    bobjectType = _ref6.bobjectType;
  return bobjectType !== BobjectTypes.Activity && api.put("/messaging/cadences/".concat(bobjectType, "/").concat(bobjectId, "/stop"));
};
var isBulkAction = function isBulkAction(bobjectToCheck) {
  return Array.isArray(bobjectToCheck);
};
var useCadenceControlData = function useCadenceControlData(bobject) {
  _s8();
  var _bobject$;
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$e(_useState3, 2),
    isSaving = _useState4[0],
    setIsSaving = _useState4[1];
  var bobjectType = isBulkAction(bobject) ? (_bobject$ = bobject[0]) === null || _bobject$ === void 0 ? void 0 : _bobject$.id.typeName : bobject === null || bobject === void 0 ? void 0 : bobject.id.typeName;
  var baseQueuedProps = {
    bobjectType: bobjectType,
    contents: {}
  };
  var stopCadence = function stopCadence(callback, useEveryBobject, subhomeTab) {
    setIsSaving(true);
    var _ref7 = useEveryBobject || {},
      isActive = _ref7.isActive,
      total = _ref7.total,
      query = _ref7.query;
    var handleCallback = function handleCallback() {
      setIsSaving(false);
      callback === null || callback === void 0 ? void 0 : callback();
    };
    if (isBulkAction(bobject)) {
      // Queued bulk with all bobjects
      if (isActive && total >= IMPORT_THRESHOLD && (bobject === null || bobject === void 0 ? void 0 : bobject.length) < total) {
        launchQueuedBulkAction(_objectSpread$a({
          action: BulkActions.STOP_CADENCE,
          total: total,
          query: query !== null && query !== void 0 ? query : {}
        }, baseQueuedProps)).then(handleCallback);
      } // Queued bulk with selected bobjects
      else if ((bobject === null || bobject === void 0 ? void 0 : bobject.length) >= IMPORT_THRESHOLD) {
        var bobjectIds = bobject.map(function (bob) {
          return bob.id.value;
        });
        launchQueuedBulkAction(_objectSpread$a({
          action: BulkActions.STOP_CADENCE,
          total: bobject === null || bobject === void 0 ? void 0 : bobject.length,
          bobjectIds: bobjectIds
        }, baseQueuedProps)).then(handleCallback);
        mixpanel.track(MIXPANEL_EVENTS.STOP_CADENCE_IMPORT_BULK_ACTION_CLICKED_ON_ + bobjectType.toUpperCase() + '_ON' + (subhomeTab === null || subhomeTab === void 0 ? void 0 : subhomeTab.toUpperCase()) + '_TAB');
      } else {
        putBulkStopCadence({
          bobjects: bobject
        }).then(handleCallback);
        mixpanel.track(MIXPANEL_EVENTS.STOP_CADENCE_BASIC_BULK_ACTION_CLICKED_ON_ + (bobjectType === null || bobjectType === void 0 ? void 0 : bobjectType.toUpperCase()) + '_ON' + (subhomeTab === null || subhomeTab === void 0 ? void 0 : subhomeTab.toUpperCase()) + '_TAB');
      }
    } else {
      var _putStopCadence;
      (_putStopCadence = putStopCadence({
        bobjectId: bobject === null || bobject === void 0 ? void 0 : bobject.id.objectId,
        bobjectType: bobjectType
      })) === null || _putStopCadence === void 0 ? void 0 : _putStopCadence.then(handleCallback);
    }
  };
  var saveCadence = function saveCadence(cadence, callback, date, useEveryBobject, subhomeTab) {
    setIsSaving(true);
    var _ref8 = useEveryBobject || {},
      isActive = _ref8.isActive,
      total = _ref8.total,
      query = _ref8.query;
    var params = {
      startCadenceDate: date,
      cadenceId: cadence
    };
    var handleCallback = function handleCallback() {
      setIsSaving(false);
      callback === null || callback === void 0 ? void 0 : callback();
    };
    if (isBulkAction(bobject)) {
      // Queued bulk with all bobjects
      if (isActive && total >= IMPORT_THRESHOLD && (bobject === null || bobject === void 0 ? void 0 : bobject.length) < total) {
        launchQueuedBulkAction(_objectSpread$a({
          action: BulkActions.START_CADENCE,
          total: total,
          query: query !== null && query !== void 0 ? query : {},
          params: params
        }, baseQueuedProps)).then(handleCallback);
      } // Queued bulk with selected bobjects
      else if ((bobject === null || bobject === void 0 ? void 0 : bobject.length) >= IMPORT_THRESHOLD) {
        var bobjectIds = bobject.map(function (bob) {
          return bob.id.value;
        });
        launchQueuedBulkAction(_objectSpread$a({
          action: BulkActions.START_CADENCE,
          total: bobject === null || bobject === void 0 ? void 0 : bobject.length,
          bobjectIds: bobjectIds,
          params: params
        }, baseQueuedProps)).then(handleCallback);
        mixpanel.track(MIXPANEL_EVENTS.SET_CADENCE_IMPORT_BULK_ACTION_CLICKED_ON_ + (bobjectType === null || bobjectType === void 0 ? void 0 : bobjectType.toUpperCase()) + subhomeTab ? '_ON' + (subhomeTab === null || subhomeTab === void 0 ? void 0 : subhomeTab.toUpperCase()) + '_TAB' : '');
      } else {
        putBulkCadence({
          startCadence: date,
          cadenceId: cadence,
          bobjects: bobject
        }).then(handleCallback);
        mixpanel.track(MIXPANEL_EVENTS.SET_CADENCE_BASIC_BULK_ACTION_CLICKED_ON_ + (bobjectType === null || bobjectType === void 0 ? void 0 : bobjectType.toUpperCase()) + subhomeTab ? '_ON' + (subhomeTab === null || subhomeTab === void 0 ? void 0 : subhomeTab.toUpperCase()) + '_TAB' : '');
      }
    } else {
      putStartCadence({
        bobjectId: bobject === null || bobject === void 0 ? void 0 : bobject.id.objectId,
        bobjectType: bobjectType,
        startCadence: date,
        cadenceId: cadence
      }).then(handleCallback);
    }
  };
  return {
    isSaving: isSaving,
    saveCadence: saveCadence,
    stopCadence: stopCadence
  };
};
_s8(useCadenceControlData, "oHZ7wJtJ5DUBZ75tsnFYVxwVRMQ=");
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
var css_248z$g = ".attachmentItem-module_item__ruNaL {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background-color: var(--lightestBloobirds);\n  border-radius: 4px;\n  padding: 10px;\n  max-height: 36px;\n  min-width: 90px;\n  max-width: 200px;\n  flex-shrink: 1;\n}\n\n.attachmentItem-module_content__rDmv1 {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  white-space: nowrap;\n  min-width: 0;\n  flex-shrink: 1;\n}\n\n.attachmentItem-module_content__rDmv1 > *:first-child {\n  flex-shrink: 0;\n}\n\n.attachmentItem-module_content__rDmv1 > div {\n  white-space: nowrap;\n  min-width: 0;\n  max-width: 85%;\n  position: relative;\n  flex-shrink: 1;\n}\n\n.attachmentItem-module_content__rDmv1 > div > p {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  margin-right: 12px;\n}\n";
var styles$g = {
  "item": "attachmentItem-module_item__ruNaL",
  "content": "attachmentItem-module_content__rDmv1"
};
styleInject(css_248z$g);
function AttachmentItem(_ref) {
  var id = _ref.id,
    uploading = _ref.uploading,
    name = _ref.name,
    onDelete = _ref.onDelete;
  return /*#__PURE__*/jsxs("div", {
    className: styles$g.item,
    role: "listitem",
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$g.content,
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
_c2 = AttachmentItem;
var css_248z$f = ".attachmentList-module_list__uuUm9 {\n  display: -webkit-inline-box;\n  padding: 7px;\n  gap: 12px;\n  border-top: 1px solid var(--lightestBloobirds);\n  border-bottom: 1px solid var(--lightestBloobirds);\n  min-width: 0;\n  overflow: scroll;\n  max-width: 690px;\n  width: 100%;\n}\n";
var styles$f = {
  "list": "attachmentList-module_list__uuUm9"
};
styleInject(css_248z$f);
function _typeof$i(obj) {
  "@babel/helpers - typeof";

  return _typeof$i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$i(obj);
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
      _defineProperty$g(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$9(Object(source)).forEach(function (key) {
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
  return _typeof$i(key) === "symbol" ? key : String(key);
}
function _toPrimitive$g(input, hint) {
  if (_typeof$i(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$i(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function AttachmentList(_ref) {
  var files = _ref.files,
    onDelete = _ref.onDelete;
  var listClasses = clsx(styles$f.list);
  return /*#__PURE__*/jsx("div", {
    className: listClasses,
    role: "list",
    children: files.map(function (file) {
      return /*#__PURE__*/jsx(AttachmentItem, _objectSpread$9(_objectSpread$9({}, file), {}, {
        onDelete: typeof onDelete === 'function' ? function () {
          return onDelete(file === null || file === void 0 ? void 0 : file.id);
        } : null
      }), file.internalId);
    })
  });
}
_c3 = AttachmentList;
var css_248z$e = ".previewTemplateModal-module_header__Re2A9 {\n  padding: 16px;\n}\n\n.previewTemplateModal-module_title__eWWFZ {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.previewTemplateModal-module_container__xQyzq {\n  background-color: white;\n  position: relative;\n}\n\n.previewTemplateModal-module_editor__RdNJD {\n  overflow-y: scroll;\n  overflow-x: hidden;\n  position: relative;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n\n.previewTemplateModal-module_editor__RdNJD a {\n  pointer-events: none;\n}\n\n.previewTemplateModal-module_footer__CoBqJ {\n  padding: 20px 32px;\n  justify-content: flex-end;\n}\n\n.previewTemplateModal-module_warningBanner__kk5vJ p {\n  width: 90%;\n}\n";
var styles$e = {
  "header": "previewTemplateModal-module_header__Re2A9",
  "title": "previewTemplateModal-module_title__eWWFZ",
  "container": "previewTemplateModal-module_container__xQyzq",
  "editor": "previewTemplateModal-module_editor__RdNJD",
  "footer": "previewTemplateModal-module_footer__CoBqJ",
  "warningBanner": "previewTemplateModal-module_warningBanner__kk5vJ"
};
styleInject(css_248z$e);
function _typeof$h(obj) {
  "@babel/helpers - typeof";

  return _typeof$h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$h(obj);
}
function _slicedToArray$d(arr, i) {
  return _arrayWithHoles$d(arr) || _iterableToArrayLimit$d(arr, i) || _unsupportedIterableToArray$d(arr, i) || _nonIterableRest$d();
}
function _nonIterableRest$d() {
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
        return value && "object" == _typeof$h(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
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
function EmailModalRow(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/jsx("div", {
    className: styles$e.container,
    children: children
  });
}
_c4 = EmailModalRow;
var fetchMessagingTemplate = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee(url) {
    var _yield$api$get, data;
    return _regeneratorRuntime$1().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return api.get(url, {
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            data: {}
          });
        case 2:
          _yield$api$get = _context.sent;
          data = _yield$api$get.data;
          return _context.abrupt("return", data);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fetchMessagingTemplate(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var PreviewTemplateModal = function PreviewTemplateModal(_ref3) {
  _s9();
  var templateId = _ref3.templateId,
    onClose = _ref3.onClose;
  var _useState = useState(),
    _useState2 = _slicedToArray$d(_useState, 2),
    messagingTemplate = _useState2[0],
    setMessagingTemplate = _useState2[1];
  var bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: false,
    rawHTMLBlock: true,
    replyHistory: true
  });
  var subjectPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: false,
    singleLine: true,
    marks: false,
    elements: false,
    images: false,
    autoReplace: false
  });
  useEffect(function () {
    if (templateId) {
      fetchMessagingTemplate("/messaging/messagingTemplates/".concat(templateId)).then(function (data) {
        setMessagingTemplate(data);
      });
    }
  }, [templateId, setMessagingTemplate]);
  var propsSubject = {
    format: messagingTemplate === null || messagingTemplate === void 0 ? void 0 : messagingTemplate.format,
    plugins: subjectPlugins
  };
  var deserializeSubject = deserialize(messagingTemplate === null || messagingTemplate === void 0 ? void 0 : messagingTemplate.subject, propsSubject);
  var htmlSubject = serialize(deserializeSubject, propsSubject);
  var propsBody = {
    format: messagingTemplate === null || messagingTemplate === void 0 ? void 0 : messagingTemplate.format,
    plugins: bodyPlugins
  };
  var deserializeContent = deserialize(messagingTemplate === null || messagingTemplate === void 0 ? void 0 : messagingTemplate.content, propsBody);
  var htmlBody = serialize(deserializeContent, propsBody);
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'cadence.previewTemplateModal'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsx(Fragment, {
    children: messagingTemplate && /*#__PURE__*/jsx(Modal, {
      open: true,
      onClose: onClose,
      children: /*#__PURE__*/jsxs("div", {
        className: styles$e.container,
        children: [/*#__PURE__*/jsxs(ModalHeader, {
          className: styles$e.header,
          variant: "gradient",
          color: "bloobirds",
          children: [/*#__PURE__*/jsxs("div", {
            className: styles$e.title,
            children: [/*#__PURE__*/jsx(Icon, {
              color: "white",
              name: "mail",
              size: 24
            }), /*#__PURE__*/jsxs(Text, {
              color: "white",
              size: "m",
              children: [t('title'), " ", messagingTemplate === null || messagingTemplate === void 0 ? void 0 : messagingTemplate.name]
            })]
          }), /*#__PURE__*/jsx(ModalCloseIcon, {
            variant: "gradient",
            onClick: onClose
          })]
        }), /*#__PURE__*/jsx(EmailModalRow, {
          children: /*#__PURE__*/jsx("div", {
            style: {
              width: '100%',
              padding: 0,
              userSelect: 'none'
            },
            dangerouslySetInnerHTML: {
              __html: htmlSubject
            }
          })
        }), /*#__PURE__*/jsx("div", {
          className: styles$e.editor,
          children: /*#__PURE__*/jsx("div", {
            style: {
              padding: '16px 20px',
              maxHeight: 500,
              minHeight: 200,
              marginBottom: 40
            },
            dangerouslySetInnerHTML: {
              __html: htmlBody
            }
          })
        }), (messagingTemplate === null || messagingTemplate === void 0 ? void 0 : messagingTemplate.mediaFiles.length) > 0 && /*#__PURE__*/
        //@ts-ignore
        jsx(AttachmentList, {
          files: messagingTemplate === null || messagingTemplate === void 0 ? void 0 : messagingTemplate.mediaFiles
        })]
      })
    })
  });
};
_s9(PreviewTemplateModal, "Ox+s6Ie3dedZVSq0PxepZYH5vZc=", false, function () {
  return [useRichTextEditorPlugins, useRichTextEditorPlugins, useTranslation];
});
_c5 = PreviewTemplateModal;
var css_248z$d = ".cadencePreview-module__wrapper__M03Of {\n  padding-bottom: 10px;\n}\n\n.cadencePreview-module__container__xmEHT {\n  border-radius: 4px;\n  border: 1px solid var(--verySoftPeanut);\n  display: flex;\n  background-color: var(--white);\n}\n\n.cadencePreview-module__column__uBixs {\n  white-space: nowrap;\n}\n\n.cadencePreview-module__first_column__jIKVG {\n  width: 116px;\n  border-right: 1px solid var(--verySoftPeanut);\n}\n\n.cadencePreview-module__first_column__jIKVG > .cadencePreview-module__row__1mjXm {\n  justify-content: flex-start;\n}\n\n.cadencePreview-module__row__1mjXm {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 6px 8px;\n  border-top: 1px solid var(--verySoftPeanut);\n  height: 32px;\n}\n\n/** Added this CSS prop of height as it was looking bad in the extension */\n.cadencePreview-module__row_extension__-a2sI {\n  height: 28px;\n}\n\n.cadencePreview-module__row__1mjXm > div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 6px 8px;\n}\n\n.cadencePreview-module__row__1mjXm:nth-child(1) {\n  border: 0;\n}\n\n.cadencePreview-module__row__1mjXm > button {\n  margin-right: 4px;\n}\n\n.cadencePreview-module__row__1mjXm > button:nth-child(2) {\n  margin-right: 0;\n}\n\n.cadencePreview-module__scrollable__sPT-T {\n  width: calc(100% - 178px);\n  overflow: hidden;\n  cursor: ew-resize;\n}\n\n.cadencePreview-module__scrollable__sPT-T > .cadencePreview-module__column__uBixs {\n  width: inherit;\n  border: 0;\n}\n\n.cadencePreview-module_custom_tasks_dropdown_task_icon__Cj1DS{\n  justify-content: center;\n  display: flex;\n  padding-top: 2px;\n}\n\n.cadencePreview-module_custom_tasks_dropdown__cQvTT {\n  display: flex;\n  flex-direction: column;\n  padding: 12px 16px;\n  gap: 4px;\n}\n.cadencePreview-module_custom_tasks_dropdown_task__Q3alc{\n  display: flex;\n  box-sizing: border-box;\n  gap: 4px;\n}\n\n.cadencePreview-module__marker__P1NoF {\n  width: 16px;\n  height: 16px;\n  border-radius: 100px;\n  border: 1px dashed var(--softPeanut);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 11px;\n  font-weight: 500;\n  cursor: pointer;\n}\n\n.cadencePreview-module__hover_cursor__Q5S22 {\n  cursor: pointer;\n}\n\n.cadencePreview-module__marker_phone_call__v2fVF {\n  border-color: var(--melon);\n  color: var(--melon);\n}\n\n.cadencePreview-module__marker_email__eb-km,\n.cadencePreview-module__marker_automated_email__WN5fu {\n  border-color: var(--tangerine);\n  color: var(--tangerine);\n}\n\n.cadencePreview-module__marker_linkedin_message__nJCQy {\n  border-color: var(--darkBloobirds);\n  color: var(--darkBloobirds);\n}\n.cadencePreview-module__marker_custom_task__vAne3 {\n  border-color: var(--bloobirds);\n  color: var(--bloobirds);\n}\n\n.cadencePreview-module__marker_custom_task__vAne3 {\n  border-color: var(--bloobirds);\n  color: var(--bloobirds);\n}\n";
var styles$d = {
  "_wrapper": "cadencePreview-module__wrapper__M03Of",
  "_container": "cadencePreview-module__container__xmEHT",
  "_column": "cadencePreview-module__column__uBixs",
  "_first_column": "cadencePreview-module__first_column__jIKVG",
  "_row": "cadencePreview-module__row__1mjXm",
  "_row_extension": "cadencePreview-module__row_extension__-a2sI",
  "_scrollable": "cadencePreview-module__scrollable__sPT-T",
  "custom_tasks_dropdown_task_icon": "cadencePreview-module_custom_tasks_dropdown_task_icon__Cj1DS",
  "custom_tasks_dropdown": "cadencePreview-module_custom_tasks_dropdown__cQvTT",
  "custom_tasks_dropdown_task": "cadencePreview-module_custom_tasks_dropdown_task__Q3alc",
  "_marker": "cadencePreview-module__marker__P1NoF",
  "_hover_cursor": "cadencePreview-module__hover_cursor__Q5S22",
  "_marker_phone_call": "cadencePreview-module__marker_phone_call__v2fVF",
  "_marker_email": "cadencePreview-module__marker_email__eb-km",
  "_marker_automated_email": "cadencePreview-module__marker_automated_email__WN5fu",
  "_marker_linkedin_message": "cadencePreview-module__marker_linkedin_message__nJCQy",
  "_marker_custom_task": "cadencePreview-module__marker_custom_task__vAne3"
};
styleInject(css_248z$d);
function _typeof$g(obj) {
  "@babel/helpers - typeof";

  return _typeof$g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$g(obj);
}
function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$c(arr) || _nonIterableSpread$1();
}
function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray$1(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$1(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$c(arr);
}
function _slicedToArray$c(arr, i) {
  return _arrayWithHoles$c(arr) || _iterableToArrayLimit$c(arr, i) || _unsupportedIterableToArray$c(arr, i) || _nonIterableRest$c();
}
function _nonIterableRest$c() {
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
  return _typeof$g(key) === "symbol" ? key : String(key);
}
function _toPrimitive$f(input, hint) {
  if (_typeof$g(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$g(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var ACTIONS_ICONS = {
  PHONE_CALL: {
    name: 'phone',
    color: 'melon'
  },
  EMAIL: {
    name: 'mail',
    color: 'tangerine'
  },
  LINKEDIN_MESSAGE: {
    name: 'linkedin',
    color: 'darkBloobirds'
  },
  AUTOMATED_EMAIL: {
    name: 'autoMail',
    color: 'tangerine'
  },
  CUSTOM_TASK: {
    name: 'taskAction',
    color: 'bloobirds'
  }
};
var ACTIONS_NAME = {
  PHONE_CALL: 'call',
  EMAIL: 'email',
  LINKEDIN_MESSAGE: 'linkedin',
  AUTOMATED_EMAIL: 'auto-mail',
  CUSTOM_TASK: 'task'
};
var cadenceActionTypesExtension = [{
  enumName: 'PHONE_CALL',
  name: 'Phone Call',
  key: 'phoneCall',
  autoEmail: false
}, {
  enumName: 'EMAIL',
  name: 'Email',
  key: 'email',
  autoEmail: false
}, {
  enumName: 'LINKEDIN_MESSAGE',
  name: 'LinkedIn Message',
  key: 'linkedinMessage',
  autoEmail: false
}, {
  enumName: 'AUTOMATED_EMAIL',
  name: 'Automated email',
  key: 'automatedEmail',
  autoEmail: true
}];
var cadenceActionTypesWebapp = [{
  enumName: 'PHONE_CALL',
  name: 'Phone Call',
  key: 'phoneCall',
  autoEmail: false
}, {
  enumName: 'EMAIL',
  name: 'Email',
  key: 'email',
  autoEmail: false
}, {
  enumName: 'AUTOMATED_EMAIL',
  name: 'Automated email',
  key: 'automatedEmail',
  autoEmail: true
}, {
  enumName: 'LINKEDIN_MESSAGE',
  name: 'LinkedIn Message',
  key: 'linkedinMessage',
  autoEmail: false
}, {
  enumName: 'CUSTOM_TASK',
  name: 'Custom Task',
  key: 'customTask',
  autoEmail: false
}];
var CadenceCircle = function CadenceCircle(_ref) {
  _s10();
  var _actionToCheck$action, _actionToCheck$action2;
  var actions = _ref.actions,
    action = _ref.action,
    displayDropdown = _ref.displayDropdown,
    openDropdown = _ref.openDropdown,
    closeDropdown = _ref.closeDropdown,
    setPreviewTemplate = _ref.setPreviewTemplate;
  var _useCustomTasks = useCustomTasks({
      disabled: true
    }),
    customTasks = _useCustomTasks.customTasks;
  var actionToCheck = actions === null || actions === void 0 ? void 0 : actions.find(function (actionPerDay) {
    var _actionPerDay$actionT;
    return actionPerDay === null || actionPerDay === void 0 ? void 0 : (_actionPerDay$actionT = actionPerDay.actionTypes) === null || _actionPerDay$actionT === void 0 ? void 0 : _actionPerDay$actionT.includes(action === null || action === void 0 ? void 0 : action.enumName);
  });
  var isAutoEmail = actionToCheck === null || actionToCheck === void 0 ? void 0 : (_actionToCheck$action = actionToCheck.actionTypes) === null || _actionToCheck$action === void 0 ? void 0 : _actionToCheck$action.includes('AUTOMATED_EMAIL');
  var isCustomTask = actionToCheck === null || actionToCheck === void 0 ? void 0 : (_actionToCheck$action2 = actionToCheck.actionTypes) === null || _actionToCheck$action2 === void 0 ? void 0 : _actionToCheck$action2.includes('CUSTOM_TASK');
  var handleClick = function handleClick() {
    if (isAutoEmail && actionToCheck !== null && actionToCheck !== void 0 && actionToCheck.emailTemplateId) {
      var templateId = actionToCheck.emailTemplateId;
      setPreviewTemplate({
        open: true,
        templateId: templateId
      });
    }
  };
  var numOfActions = actions.filter(function (a) {
    return a.actionTypes.includes(action === null || action === void 0 ? void 0 : action.enumName);
  }).length;
  var ref = useRef();
  useClickAway(ref, closeDropdown);
  return actionToCheck ? isCustomTask ? /*#__PURE__*/jsx(Dropdown, {
    visible: displayDropdown,
    anchor: /*#__PURE__*/jsx("span", {
      className: clsx(styles$d._marker, styles$d["_marker_".concat(action === null || action === void 0 ? void 0 : action.enumName.toLowerCase())], _defineProperty$f({}, styles$d._hover_cursor, isAutoEmail)),
      ref: ref,
      onClick: displayDropdown ? closeDropdown : openDropdown,
      children: numOfActions > 1 ? numOfActions : undefined
    }),
    children: /*#__PURE__*/jsx("div", {
      className: styles$d.custom_tasks_dropdown,
      ref: ref,
      children: actions.map(function (ac) {
        var customTask = customTasks === null || customTasks === void 0 ? void 0 : customTasks.find(function (ct) {
          return ct.id === ac.customTaskId;
        });
        return customTask ? /*#__PURE__*/jsxs("div", {
          className: styles$d.custom_tasks_dropdown_task,
          children: [/*#__PURE__*/jsx("div", {
            className: styles$d.custom_tasks_dropdown_task_icon,
            children: /*#__PURE__*/jsx("span", {
              className: clsx(styles$d._marker),
              style: {
                borderColor: "var(--".concat(customTask.iconColor, ")")
              },
              children: /*#__PURE__*/jsx(Icon, {
                name: customTask.icon,
                color: customTask.iconColor
              })
            })
          }), /*#__PURE__*/jsxs("div", {
            children: [/*#__PURE__*/jsx(Text, {
              size: "xxs",
              children: customTask.name
            }), /*#__PURE__*/jsx(Text, {
              size: "xxs",
              color: "softPeanut",
              children: customTask.description
            })]
          })]
        }, "custom_task-".concat(ac.customTaskId)) : null;
      })
    })
  }) : /*#__PURE__*/jsx(Tooltip, {
    title: removeHtmlTags(actionToCheck.description),
    position: "bottom",
    children: /*#__PURE__*/jsx("span", {
      className: clsx(styles$d._marker, styles$d["_marker_".concat(action === null || action === void 0 ? void 0 : action.enumName.toLowerCase())], _defineProperty$f({}, styles$d._hover_cursor, isAutoEmail)),
      onClick: handleClick
    })
  }) : null;
};
_s10(CadenceCircle, "eeVaudnWGDuCr7HAX2lZvyVmhaA=", false, function () {
  return [useCustomTasks, useClickAway];
});
_c6 = CadenceCircle;
var CadencePreview = function CadencePreview(_ref2) {
  _s11();
  var cadenceId = _ref2.cadenceId,
    _ref2$isChromeExtensi = _ref2.isChromeExtension,
    isChromeExtension = _ref2$isChromeExtensi === void 0 ? false : _ref2$isChromeExtensi,
    _ref2$fullWidth = _ref2.fullWidth,
    fullWidth = _ref2$fullWidth === void 0 ? false : _ref2$fullWidth;
  var _useCadenceSteps = useCadenceSteps(cadenceId),
    cadenceSteps = _useCadenceSteps.steps;
  var _useState = useState([]),
    _useState2 = _slicedToArray$c(_useState, 2),
    days = _useState2[0],
    setDays = _useState2[1];
  var _useState3 = useState(undefined),
    _useState4 = _slicedToArray$c(_useState3, 2),
    displayDropdown = _useState4[0],
    setDisplayDropdown = _useState4[1];
  var _useState5 = useState(10),
    _useState6 = _slicedToArray$c(_useState5, 2),
    numberOfDays = _useState6[0],
    setNumberOfDays = _useState6[1];
  var sliderRef = useRef();
  var _useState7 = useState(false),
    _useState8 = _slicedToArray$c(_useState7, 2),
    mouseDown = _useState8[0],
    setMouseDown = _useState8[1];
  var _useState9 = useState({
      open: false,
      templateId: null
    }),
    _useState10 = _slicedToArray$c(_useState9, 2),
    previewTemplate = _useState10[0],
    setPreviewTemplate = _useState10[1];
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'cadence.cadencePreview'
    }),
    t = _useTranslation.t;
  var cadenceActionTypes = isChromeExtension ? cadenceActionTypesExtension : cadenceActionTypesWebapp;
  useEffect(function () {
    if (!isEqual(days, cadenceSteps)) setDays(cadenceSteps);
  }, [cadenceSteps]);
  useEffect(function () {
    if ((days === null || days === void 0 ? void 0 : days.length) > 0) {
      var daysNumbers = days.map(function (day) {
        return day === null || day === void 0 ? void 0 : day.dayNumber;
      });
      var maxNumberOfDay = Math.max.apply(Math, _toConsumableArray$1(daysNumbers)) + 1;
      setNumberOfDays(maxNumberOfDay < 10 ? 10 : maxNumberOfDay);
    }
  }, [days]);
  var startDragging = function startDragging(e) {
    setMouseDown(true);
    // @ts-ignore
    sliderRef.current.startX = e.pageX - sliderRef.current.offsetLeft;
    // @ts-ignore
    sliderRef.current.currentScrollLeft = sliderRef.current.scrollLeft;
  };
  var dragging = function dragging(e) {
    e.preventDefault();
    if (!mouseDown) {
      return;
    }
    // @ts-ignore
    var x = e.pageX - sliderRef.current.offsetLeft;
    // @ts-ignore
    var scroll = x - sliderRef.current.startX;
    // @ts-ignore
    sliderRef.current.scrollLeft = sliderRef.current.currentScrollLeft - scroll;
  };
  var stopDragging = function stopDragging() {
    setMouseDown(false);
  };
  var columnVirtualizer = useVirtual({
    horizontal: true,
    size: numberOfDays || 0,
    parentRef: sliderRef,
    estimateSize: React.useCallback(function () {
      return 68;
    }, []),
    overscan: 5
  });
  var onScrollTo = function onScrollTo(index) {
    columnVirtualizer.scrollToIndex(index, {
      align: 'end'
    });
  };
  function handleClose() {
    setPreviewTemplate({
      open: false,
      templateId: undefined
    });
  }
  var rowClasses = clsx(styles$d._row, _defineProperty$f({}, styles$d._row_extension, isChromeExtension));
  return /*#__PURE__*/jsxs("div", {
    className: styles$d._container,
    style: fullWidth ? {
      maxWidth: "calc(".concat(columnVirtualizer.totalSize, "px + 178px)")
    } : undefined,
    children: [/*#__PURE__*/jsxs("div", {
      className: clsx(styles$d._column, styles$d._first_column),
      children: [/*#__PURE__*/jsx("div", {
        className: rowClasses
      }), cadenceActionTypes === null || cadenceActionTypes === void 0 ? void 0 : cadenceActionTypes.map(function (cadenceAction) {
        var actionConfig = ACTIONS_ICONS[cadenceAction === null || cadenceAction === void 0 ? void 0 : cadenceAction.enumName];
        return /*#__PURE__*/jsxs("div", {
          className: rowClasses,
          children: [/*#__PURE__*/jsx(Icon, {
            name: (actionConfig === null || actionConfig === void 0 ? void 0 : actionConfig.name) || 'noteAction',
            color: actionConfig === null || actionConfig === void 0 ? void 0 : actionConfig.color
          }), /*#__PURE__*/jsx(Text, {
            size: "xs",
            color: "softPeanut",
            uppercase: true,
            children: t(ACTIONS_NAME[cadenceAction === null || cadenceAction === void 0 ? void 0 : cadenceAction.enumName] || (cadenceAction === null || cadenceAction === void 0 ? void 0 : cadenceAction.name))
          })]
        }, cadenceAction === null || cadenceAction === void 0 ? void 0 : cadenceAction.enumName);
      })]
    }), /*#__PURE__*/jsxs("div", {
      children: [/*#__PURE__*/jsx("div", {
        className: rowClasses,
        children: /*#__PURE__*/jsx(IconButton, {
          name: "chevronFirst",
          color: "bloobirds",
          size: 16,
          onClick: function onClick() {
            return onScrollTo(0);
          },
          disabled: numberOfDays <= 10
        })
      }), cadenceActionTypes === null || cadenceActionTypes === void 0 ? void 0 : cadenceActionTypes.map(function (type, index) {
        return /*#__PURE__*/jsx("div", {
          className: rowClasses
        }, "empty-row-left-".concat(index));
      })]
    }), /*#__PURE__*/jsx("div", {
      className: styles$d._scrollable,
      ref: sliderRef,
      onMouseDown: startDragging,
      onMouseLeave: stopDragging,
      onMouseUp: stopDragging,
      onMouseMove: dragging,
      children: /*#__PURE__*/jsx("div", {
        style: {
          width: "".concat(columnVirtualizer.totalSize, "px"),
          height: '100%',
          position: 'relative'
        },
        children: columnVirtualizer.virtualItems.map(function (virtualColumn) {
          var day = (virtualColumn === null || virtualColumn === void 0 ? void 0 : virtualColumn.index) + 1;
          var actions = days === null || days === void 0 ? void 0 : days.filter(function (currentDay) {
            return (currentDay === null || currentDay === void 0 ? void 0 : currentDay.dayNumber) === virtualColumn.index;
          });
          return /*#__PURE__*/jsxs("div", {
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: "".concat(virtualColumn.size, "px"),
              transform: "translateX(".concat(virtualColumn.start, "px)")
            },
            className: styles$d._column,
            id: "day-".concat(day),
            children: [/*#__PURE__*/jsx("div", {
              className: rowClasses,
              children: /*#__PURE__*/jsx(Text, {
                size: "xxs",
                color: "softPeanut",
                children: "".concat(t('day'), " ").concat(day)
              })
            }), cadenceActionTypes === null || cadenceActionTypes === void 0 ? void 0 : cadenceActionTypes.map(function (action) {
              var key = "day-".concat(day, "-action-").concat(action.name);
              return /*#__PURE__*/jsx("div", {
                className: rowClasses,
                children: /*#__PURE__*/jsx(CadenceCircle, {
                  action: action,
                  actions: actions,
                  displayDropdown: displayDropdown === "day-".concat(day, "-action-").concat(action.name),
                  openDropdown: function openDropdown() {
                    return setDisplayDropdown(key);
                  },
                  closeDropdown: function closeDropdown() {
                    return setDisplayDropdown(undefined);
                  },
                  setPreviewTemplate: setPreviewTemplate
                })
              }, "action-".concat(action === null || action === void 0 ? void 0 : action.enumName));
            })]
          }, virtualColumn.index);
        })
      })
    }), /*#__PURE__*/jsxs("div", {
      className: styles$d._column,
      children: [/*#__PURE__*/jsx("div", {
        className: rowClasses,
        children: /*#__PURE__*/jsx(IconButton, {
          name: "chevronLast",
          color: "bloobirds",
          size: 16,
          onClick: function onClick() {
            return onScrollTo(numberOfDays - 1);
          },
          disabled: numberOfDays <= 10
        })
      }), cadenceActionTypes === null || cadenceActionTypes === void 0 ? void 0 : cadenceActionTypes.map(function (types, index) {
        return /*#__PURE__*/jsx("div", {
          className: rowClasses
        }, "empty-row-right-".concat(index));
      })]
    }), previewTemplate.open && /*#__PURE__*/jsx(PreviewTemplateModal, {
      templateId: previewTemplate.templateId,
      onClose: handleClose
    })]
  });
};
_s11(CadencePreview, "6IhmhuAhav5zZ27B5GoRG/30hNo=", false, function () {
  return [useCadenceSteps, useTranslation, useVirtual];
});
_c7 = CadencePreview;
var css_248z$c = ".cadeceSelector-module_cadenceItemBox__Z9Fyj {\n  height: 48px;\n  padding: 0 45px;\n  display: flex;\n  align-items: center;\n}\n\n.cadeceSelector-module_cadenceItemBox__Z9Fyj:hover {\n  cursor: pointer;\n}\n\n.cadeceSelector-module_cadenceItemBox_selected__ee-Mg {\n  background-color: var(--veryLightBloobirds);\n}\n\n.cadeceSelector-module_cadenceName__ehUCV {\n  flex-grow: 1;\n}\n\n.cadeceSelector-module__callout_content__6KtsO {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n}\n\n.cadeceSelector-module__callout_content__6KtsO > div {\n  margin-right: 8px;\n}\n\n.cadeceSelector-module__callout_block__pdxD3 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.cadeceSelector-module__callout_block__pdxD3:not(:last-child) {\n  margin-right: 24px;\n}\n\n.cadeceSelector-module__callout__text__RXlKI {\n  line-height: 20px;\n  margin-bottom: 6px;\n}\n\n.cadeceSelector-module_editButton__jaAm- {\n  margin-right: 24px;\n}\n\n.cadeceSelector-module_editButton__jaAm-:hover {\n  cursor: alias;\n}\n\n.cadeceSelector-module_headerGroup__ci75v {\n  margin: 16px 32px;\n}\n\n.cadeceSelector-module_headerGroup__ci75v > svg {\n  margin-right: 8px;\n}\n\n.cadeceSelector-module_filterGroup__B7NeS {\n  margin: 0 20px;\n}\n\n.cadeceSelector-module_filterGroup__B7NeS > div {\n  margin-right: 20px;\n}\n\n.cadeceSelector-module_emptySearch__fT9aA {\n  display: flex;\n  flex-direction: column;\n  height: 400px;\n  align-items: center;\n  justify-content: center;\n}\n\n.cadeceSelector-module_emptySearch__fT9aA > p {\n  margin-top: 8px;\n  max-width: 232px;\n}\n\n.cadeceSelector-module_emptySearchIcon__Ybej1 {\n  margin-top: -24px;\n  height: 40px;\n  width: 40px;\n  fill: var(--softBloobirds);\n}\n\n.cadeceSelector-module_emptySearchIcon__Ybej1 > path {\n  fill: var(--softBloobirds);\n}\n\n.cadeceSelector-module_input__4Ld85 {\n  position: relative;\n  flex-grow: 1;\n}\n\n.cadeceSelector-module_input__4Ld85 {\n  position: relative;\n  flex-grow: 1;\n}\n\n.cadeceSelector-module_input__4Ld85 > input, .cadeceSelector-module_input__4Ld85 > input:hover {\n  width: 100%;\n  height: 38px;\n  padding-left: 28px;\n  padding-top: 11px;\n  padding-bottom: 11px;\n  border: 1px solid #d4e0f1;\n  border-radius: 4px;\n  box-sizing: border-box;\n  box-shadow: none;\n  color: var(--peanut);\n}\n\n.cadeceSelector-module_input__4Ld85 > svg {\n  position: absolute;\n  top: 8px;\n  left: 5px;\n}\n\n.cadeceSelector-module_input__4Ld85 > input:focus {\n  outline: none !important;\n  border: 1px solid var(--bloobirds);\n  box-shadow: 0 0 2px var(--bloobirds);\n}\n\n.cadeceSelector-module_input__4Ld85 > svg > path {\n  fill: var(--softPeanut);\n}\n\n.cadeceSelector-module_cadenceList__4VL7k {\n  height: 400px;\n  overflow-y: auto;\n}\n\n.cadeceSelector-module_emptySearchLink__LpCa4 {\n  cursor: pointer;\n  margin-top: 8px;\n}\n";
var styles$c = {
  "cadenceItemBox": "cadeceSelector-module_cadenceItemBox__Z9Fyj",
  "cadenceItemBox_selected": "cadeceSelector-module_cadenceItemBox_selected__ee-Mg",
  "cadenceName": "cadeceSelector-module_cadenceName__ehUCV",
  "_callout_content": "cadeceSelector-module__callout_content__6KtsO",
  "_callout_block": "cadeceSelector-module__callout_block__pdxD3",
  "_callout__text": "cadeceSelector-module__callout__text__RXlKI",
  "editButton": "cadeceSelector-module_editButton__jaAm-",
  "headerGroup": "cadeceSelector-module_headerGroup__ci75v",
  "filterGroup": "cadeceSelector-module_filterGroup__B7NeS",
  "emptySearch": "cadeceSelector-module_emptySearch__fT9aA",
  "emptySearchIcon": "cadeceSelector-module_emptySearchIcon__Ybej1",
  "input": "cadeceSelector-module_input__4Ld85",
  "cadenceList": "cadeceSelector-module_cadenceList__4VL7k",
  "emptySearchLink": "cadeceSelector-module_emptySearchLink__LpCa4"
};
styleInject(css_248z$c);
function _typeof$f(obj) {
  "@babel/helpers - typeof";

  return _typeof$f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$f(obj);
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
      _defineProperty$e(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$8(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$b(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$b(arr);
}
function _slicedToArray$b(arr, i) {
  return _arrayWithHoles$b(arr) || _iterableToArrayLimit$b(arr, i) || _unsupportedIterableToArray$b(arr, i) || _nonIterableRest$b();
}
function _nonIterableRest$b() {
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
  return _typeof$f(key) === "symbol" ? key : String(key);
}
function _toPrimitive$e(input, hint) {
  if (_typeof$f(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$f(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function CadenceGroupHeader(_ref) {
  var icon = _ref.icon,
    title = _ref.title,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? 'softPeanut' : _ref$color;
  return /*#__PURE__*/jsxs("div", {
    className: styles$c.headerGroup,
    children: [/*#__PURE__*/jsx(Icon, {
      name: icon,
      color: color,
      size: 14
    }), /*#__PURE__*/jsx(Text, {
      inline: true,
      color: color,
      size: "xs",
      children: title
    })]
  });
}
_c8 = CadenceGroupHeader;
function CadenceItem(_ref2) {
  _s12();
  var _settings$user, _settings$user$permis, _settings$account, _settings$user2, _cadence$statistics, _cadence$statistics2, _cadence$statistics3, _cadence$statistics4;
  var cadence = _ref2.cadence,
    isSelected = _ref2.isSelected,
    bobjectTypeName = _ref2.bobjectTypeName;
  var classNames = clsx(styles$c.cadenceItemBox, _defineProperty$e({}, styles$c.cadenceItemBox_selected, isSelected));
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'cadence.cadenceSelector'
    }),
    t = _useTranslation.t;
  var hasCadencePermission = settings === null || settings === void 0 ? void 0 : (_settings$user = settings.user) === null || _settings$user === void 0 ? void 0 : (_settings$user$permis = _settings$user.permissions) === null || _settings$user$permis === void 0 ? void 0 : _settings$user$permis.includes(UserPermission.VIEW_CADENCES);
  var cadenceV2Enabled = useCadenceV2Enabled(settings === null || settings === void 0 ? void 0 : (_settings$account = settings.account) === null || _settings$account === void 0 ? void 0 : _settings$account.id);
  var userRoles = settings === null || settings === void 0 ? void 0 : (_settings$user2 = settings.user) === null || _settings$user2 === void 0 ? void 0 : _settings$user2.roles;
  var isAdminUser = (userRoles === null || userRoles === void 0 ? void 0 : userRoles.includes(UserRole.GLOBAL_ADMIN)) || (userRoles === null || userRoles === void 0 ? void 0 : userRoles.includes(UserRole.ACCOUNT_ADMIN));
  return /*#__PURE__*/jsxs("div", {
    className: classNames,
    children: [/*#__PURE__*/jsx(Text, {
      size: "s",
      color: "peanut",
      className: styles$c.cadenceName,
      children: cadence.name
    }), /*#__PURE__*/jsxs("div", {
      className: styles$c._callout_content,
      children: [isSelected && hasCadencePermission && isAdminUser && /*#__PURE__*/jsx(Button, {
        variant: "clear",
        size: "small",
        iconLeft: "eye",
        color: "bloobirds",
        uppercase: false,
        className: styles$c.editButton,
        onClick: function onClick(event) {
          window.open("https://app.bloobirds.com/app/".concat(cadenceV2Enabled ? 'cadences' : 'playbook/cadences', "/edit?cadence=").concat(encodeURIComponent(cadence === null || cadence === void 0 ? void 0 : cadence.id), "&name=").concat(encodeURIComponent(cadence.name), "&bobjectType=").concat(encodeURIComponent(bobjectTypeName)), '_blank');
          event.preventDefault();
          event.stopPropagation();
        },
        children: t('view')
      }), /*#__PURE__*/jsxs("div", {
        className: styles$c._callout_block,
        children: [/*#__PURE__*/jsx(Text, {
          weight: "bold",
          size: "s",
          color: "softBloobirds",
          children: cadence === null || cadence === void 0 ? void 0 : (_cadence$statistics = cadence.statistics) === null || _cadence$statistics === void 0 ? void 0 : _cadence$statistics.totalSteps
        }), /*#__PURE__*/jsx(Text, {
          color: "softBloobirds",
          size: "xs",
          children: t('steps')
        })]
      }), /*#__PURE__*/jsxs("div", {
        className: styles$c._callout_block,
        children: [/*#__PURE__*/jsx(Text, {
          weight: "bold",
          size: "s",
          color: "softBloobirds",
          children: cadence === null || cadence === void 0 ? void 0 : (_cadence$statistics2 = cadence.statistics) === null || _cadence$statistics2 === void 0 ? void 0 : _cadence$statistics2.totalDays
        }), /*#__PURE__*/jsx(Text, {
          color: "softBloobirds",
          size: "xs",
          children: t('days')
        })]
      }), /*#__PURE__*/jsxs("div", {
        className: styles$c._callout_block,
        children: [/*#__PURE__*/jsxs(Text, {
          weight: "bold",
          size: "s",
          color: "softBloobirds",
          children: [Math.round((cadence === null || cadence === void 0 ? void 0 : (_cadence$statistics3 = cadence.statistics) === null || _cadence$statistics3 === void 0 ? void 0 : _cadence$statistics3.automatedPercentage) * 100 || 0), "%"]
        }), /*#__PURE__*/jsx(Text, {
          color: "softBloobirds",
          size: "xs",
          children: t('automated')
        })]
      }), /*#__PURE__*/jsxs("div", {
        className: styles$c._callout_block,
        children: [/*#__PURE__*/jsx(Text, {
          weight: "bold",
          size: "s",
          color: "softBloobirds",
          children: cadence === null || cadence === void 0 ? void 0 : (_cadence$statistics4 = cadence.statistics) === null || _cadence$statistics4 === void 0 ? void 0 : _cadence$statistics4.activeCount
        }), /*#__PURE__*/jsx(Text, {
          color: "softBloobirds",
          size: "xs",
          children: t('active')
        })]
      })]
    })]
  });
}
_s12(CadenceItem, "wrfsJjyTPfJoH878082xx86GWHU=", false, function () {
  return [useActiveUserSettings, useTranslation, useCadenceV2Enabled];
});
_c9 = CadenceItem;
var CadenceSelector = /*#__PURE__*/_s13(React.forwardRef(_c10 = _s13(function (_ref3, ref) {
  _s13();
  var _selectedBobject$id, _settings$account2, _selectedBobject$id2, _settings$account3, _settings$user3, _settings$user3$permi;
  var selectedBobject = _ref3.selectedBobject,
    onCadenceSelected = _ref3.onCadenceSelected,
    className = _ref3.className,
    userId = _ref3.userId;
  var _useActiveUserSetting2 = useActiveUserSettings(),
    settings = _useActiveUserSetting2.settings;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'cadence.cadenceSelector'
    }),
    t = _useTranslation2.t;
  var _useCadences = useCadences({
      bobjectTypeName: isArray(selectedBobject) ? selectedBobject : selectedBobject === null || selectedBobject === void 0 ? void 0 : (_selectedBobject$id = selectedBobject.id) === null || _selectedBobject$id === void 0 ? void 0 : _selectedBobject$id.typeName,
      accountId: isArray(selectedBobject) ? settings === null || settings === void 0 ? void 0 : (_settings$account2 = settings.account) === null || _settings$account2 === void 0 ? void 0 : _settings$account2.id : selectedBobject === null || selectedBobject === void 0 ? void 0 : (_selectedBobject$id2 = selectedBobject.id) === null || _selectedBobject$id2 === void 0 ? void 0 : _selectedBobject$id2.accountId,
      includeDeleted: true
    }),
    cadences = _useCadences.cadences;
  var _useState = useState(''),
    _useState2 = _slicedToArray$b(_useState, 2),
    searchQuery = _useState2[0],
    setSearchQuery = _useState2[1];
  var _useState3 = useState({
      onlyOfficial: false,
      onlyMine: false,
      onlyNurturing: false
    }),
    _useState4 = _slicedToArray$b(_useState3, 2),
    filters = _useState4[0],
    setFilters = _useState4[1];
  var cadenceV2Enabled = useCadenceV2Enabled(settings === null || settings === void 0 ? void 0 : (_settings$account3 = settings.account) === null || _settings$account3 === void 0 ? void 0 : _settings$account3.id);
  var hasCadencePermission = settings === null || settings === void 0 ? void 0 : (_settings$user3 = settings.user) === null || _settings$user3 === void 0 ? void 0 : (_settings$user3$permi = _settings$user3.permissions) === null || _settings$user3$permi === void 0 ? void 0 : _settings$user3$permi.includes(UserPermission.VIEW_CADENCES);
  var _useMemo = useMemo(function () {
      var filtered = cadences === null || cadences === void 0 ? void 0 : cadences.filter(filterCadences);
      function filterCadences(c) {
        if (!c.enabled) {
          return false;
        }
        if (c.name.includes('(Deleted)')) {
          return false;
        }
        var matchQuery = searchQuery === '' || c.name.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchQuery) {
          return false;
        }
        if (filters.onlyOfficial && !c.isOfficial) {
          return false;
        }
        if (filters.onlyMine && c.ownerId !== userId) {
          return false;
        }
        return !(filters.onlyNurturing && !c.isNurturingCadence);
      }
      var sortedCadences = filtered === null || filtered === void 0 ? void 0 : filtered.reduce(function (sorted, cadence) {
        if (cadence.isOfficial) {
          sorted.officialCadences = [].concat(_toConsumableArray(sorted.officialCadences), [cadence]);
        } else if (cadence.ownerId === userId) {
          sorted.myCadences = [].concat(_toConsumableArray(sorted.myCadences), [cadence]);
        } else {
          sorted.teamCadences = [].concat(_toConsumableArray(sorted.teamCadences), [cadence]);
        }
        return sorted;
      }, {
        myCadences: [],
        teamCadences: [],
        officialCadences: []
      });
      return _objectSpread$8({
        filteredCadences: filtered
      }, sortedCadences);
    }, [cadences, searchQuery, filters]),
    filteredCadences = _useMemo.filteredCadences,
    myCadences = _useMemo.myCadences,
    teamCadences = _useMemo.teamCadences,
    officialCadences = _useMemo.officialCadences;
  function handleSearch(query) {
    setSearchQuery(query);
  }
  return /*#__PURE__*/jsx("div", {
    children: /*#__PURE__*/jsxs(CommandBox, _objectSpread$8(_objectSpread$8({
      onSearch: handleSearch,
      ref: ref
    }, className ? {
      className: className
    } : {}), {}, {
      children: [/*#__PURE__*/jsx(CommandBox.SearchBox, {
        children: /*#__PURE__*/jsx(CommandBox.Input, {
          className: styles$c.input
        })
      }), /*#__PURE__*/jsxs("div", {
        className: styles$c.filterGroup,
        children: [/*#__PURE__*/jsx(Checkbox, {
          size: "small",
          color: "bloobirds",
          checked: filters.onlyOfficial,
          onClick: function onClick() {
            return setFilters(function (filters) {
              return _objectSpread$8(_objectSpread$8({}, filters), {}, {
                onlyOfficial: !filters.onlyOfficial
              });
            });
          },
          children: t('showOnlyOfficial')
        }), /*#__PURE__*/jsx(Checkbox, {
          size: "small",
          color: "bloobirds",
          checked: filters.onlyMine,
          onClick: function onClick() {
            return setFilters(function (filters) {
              return _objectSpread$8(_objectSpread$8({}, filters), {}, {
                onlyMine: !filters.onlyMine
              });
            });
          },
          children: t('showOnlyMine')
        }), /*#__PURE__*/jsx(Checkbox, {
          size: "small",
          color: "bloobirds",
          checked: filters.onlyNurturing,
          onClick: function onClick() {
            return setFilters(function (filters) {
              return _objectSpread$8(_objectSpread$8({}, filters), {}, {
                onlyNurturing: !filters.onlyNurturing
              });
            });
          },
          children: t('showOnlyNurturing')
        })]
      }), (filteredCadences === null || filteredCadences === void 0 ? void 0 : filteredCadences.length) > 0 && /*#__PURE__*/jsxs(CommandBox.List, {
        className: styles$c.cadenceList,
        children: [(officialCadences === null || officialCadences === void 0 ? void 0 : officialCadences.length) > 0 && /*#__PURE__*/jsx(CommandBox.Group, {
          header: /*#__PURE__*/jsx(CadenceGroupHeader, {
            icon: 'bookmark',
            title: t('officialCadences'),
            color: "bloobirds"
          }),
          children: officialCadences === null || officialCadences === void 0 ? void 0 : officialCadences.map(function (c) {
            var _selectedBobject$id3;
            return /*#__PURE__*/jsx(CommandBox.Item, {
              action: function action() {
                return onCadenceSelected(c);
              },
              children: /*#__PURE__*/jsx(CadenceItem, {
                cadence: c
                //TODO: Careful with this
                ,

                bobjectTypeName: isArray(selectedBobject) ? selectedBobject[0] : selectedBobject === null || selectedBobject === void 0 ? void 0 : (_selectedBobject$id3 = selectedBobject.id) === null || _selectedBobject$id3 === void 0 ? void 0 : _selectedBobject$id3.typeName
              })
            }, c.id);
          })
        }), (myCadences === null || myCadences === void 0 ? void 0 : myCadences.length) > 0 && /*#__PURE__*/jsx(CommandBox.Group, {
          header: /*#__PURE__*/jsx(CadenceGroupHeader, {
            icon: 'cadence',
            title: t('myCadences')
          }),
          children: myCadences === null || myCadences === void 0 ? void 0 : myCadences.map(function (c) {
            var _selectedBobject$id4;
            return /*#__PURE__*/jsx(CommandBox.Item, {
              action: function action() {
                return onCadenceSelected(c);
              },
              children: /*#__PURE__*/jsx(CadenceItem, {
                cadence: c
                //TODO: Careful with this
                ,

                bobjectTypeName: isArray(selectedBobject) ? selectedBobject[0] : selectedBobject === null || selectedBobject === void 0 ? void 0 : (_selectedBobject$id4 = selectedBobject.id) === null || _selectedBobject$id4 === void 0 ? void 0 : _selectedBobject$id4.typeName
              })
            }, c.id);
          })
        }), (teamCadences === null || teamCadences === void 0 ? void 0 : teamCadences.length) > 0 && /*#__PURE__*/jsx(CommandBox.Group, {
          header: /*#__PURE__*/jsx(CadenceGroupHeader, {
            icon: 'cadence',
            title: t('teamCadences')
          }),
          children: teamCadences === null || teamCadences === void 0 ? void 0 : teamCadences.map(function (c) {
            var _selectedBobject$id5;
            return /*#__PURE__*/jsx(CommandBox.Item, {
              action: function action() {
                return onCadenceSelected(c);
              },
              children: /*#__PURE__*/jsx(CadenceItem, {
                cadence: c
                //TODO: Careful with this
                ,

                bobjectTypeName: isArray(selectedBobject) ? selectedBobject[0] : selectedBobject === null || selectedBobject === void 0 ? void 0 : (_selectedBobject$id5 = selectedBobject.id) === null || _selectedBobject$id5 === void 0 ? void 0 : _selectedBobject$id5.typeName
              })
            }, c.id);
          })
        })]
      }), /*#__PURE__*/jsx(CommandBox.Empty, {
        children: /*#__PURE__*/jsxs("div", {
          className: styles$c.emptySearch,
          children: [/*#__PURE__*/jsx(Text, {
            align: "center",
            size: "l",
            children: t('noResults')
          }), hasCadencePermission && /*#__PURE__*/jsx("div", {
            className: styles$c.emptySearchLink,
            onClick: function onClick() {
              window.open("https://app.bloobirds.com/app/".concat(cadenceV2Enabled ? 'cadences' : 'playbook/cadences'), '_blank');
            },
            children: /*#__PURE__*/jsx(Text, {
              size: "xs",
              color: "bloobirds",
              children: t('createNewCadence')
            })
          })]
        })
      })]
    }))
  });
}, "ORG+gjhp7wSpEJitixnpkeY49No=", false, function () {
  return [useActiveUserSettings, useTranslation, useCadences, useCadenceV2Enabled];
})), "ORG+gjhp7wSpEJitixnpkeY49No=", false, function () {
  return [useActiveUserSettings, useTranslation, useCadences, useCadenceV2Enabled];
});
_c11 = CadenceSelector;
var css_248z$b = ".configureCadence-module__section_title__wrapper__uopF2 {\n  margin-bottom: 16px;\n}\n\n.configureCadence-module__section__wrapper__fqiBy {\n  margin-bottom: 12px;\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: row;\n}\n\n.configureCadence-module__cadence_preview_wrapper__A7hme {\n  margin-bottom: 24px;\n}\n\n.configureCadence-module__list__wrapper__v4Mo7 {\n  flex-direction: column;\n  flex: 1;\n  margin-right: 15px;\n}\n\n.configureCadence-module__list__wrapper__v4Mo7 input {\n  box-shadow: none;\n  border: none;\n  height: 24px;\n  padding: 0;\n}\n\n.configureCadence-module__list__wrapper__v4Mo7 input:hover {\n  box-shadow: none;\n  border: none;\n}\n\n.configureCadence-module__cadence_placeholder__c-lpw {\n  height: 16px;\n}\n\n.configureCadence-module__banner_wrapper__uI4b1 {\n  background-color: var(--white);\n}\n\n.configureCadence-module__banner_wrapper__uI4b1 > * > p {\n  padding: 8px 40px;\n}\n.configureCadence-module__message__wrapper__Wl6JC {\n  display: flex;\n  align-items: center;\n  margin-left: 7px;\n}\n\n.configureCadence-module__message__wrapper__Wl6JC > div {\n  margin-right: 23px;\n}\n\n.configureCadence-module__cadence_table__wrapper__qUagO {\n  margin-top: 22px;\n  margin-bottom: 30px;\n}\n\n.configureCadence-module__buttons__wrapper__MsdUf {\n  display: flex;\n  width: 100%;\n}\n\n.configureCadence-module__buttons__wrapper__MsdUf > div {\n  margin-left: auto;\n  margin-right: 16px;\n}\n\n.configureCadence-module__callout_change_date_wrapper__6Yn-W {\n  margin-top: 10px;\n}\n\n.configureCadence-module__on_prospection_message__uVcBT {\n  background-color: rgba(217, 240, 192, 0.4);\n  width: calc(100% - 26px);\n  padding: 12px;\n  text-align: center;\n  border: 1px solid var(--softMelon);\n  border-radius: 4px;\n}\n\n.configureCadence-module__with_more_messages__BFQOF {\n  margin-top: 25px;\n}\n\n.configureCadence-module_hidden__ASc9x {\n  display: none;\n}\n\n.configureCadence-module__lead_cadence_link__EKdYN {\n  font-weight: bold;\n  cursor: pointer;\n  color: var(--bloobirds);\n}\n\n.configureCadence-module__command_box_wrapper__zlGIc {\n  position: fixed;\n  z-index: 199;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 700px;\n  background: #ffffff;\n  border: 1px solid #d4e0f1;\n  box-shadow: 0 2px 8px rgba(70, 79, 87, 0.33);\n  border-radius: 4px;\n}\n";
var styles$b = {
  "_section_title__wrapper": "configureCadence-module__section_title__wrapper__uopF2",
  "_section__wrapper": "configureCadence-module__section__wrapper__fqiBy",
  "_cadence_preview_wrapper": "configureCadence-module__cadence_preview_wrapper__A7hme",
  "_list__wrapper": "configureCadence-module__list__wrapper__v4Mo7",
  "_cadence_placeholder": "configureCadence-module__cadence_placeholder__c-lpw",
  "_banner_wrapper": "configureCadence-module__banner_wrapper__uI4b1",
  "_message__wrapper": "configureCadence-module__message__wrapper__Wl6JC",
  "_cadence_table__wrapper": "configureCadence-module__cadence_table__wrapper__qUagO",
  "_buttons__wrapper": "configureCadence-module__buttons__wrapper__MsdUf",
  "_callout_change_date_wrapper": "configureCadence-module__callout_change_date_wrapper__6Yn-W",
  "_on_prospection_message": "configureCadence-module__on_prospection_message__uVcBT",
  "_with_more_messages": "configureCadence-module__with_more_messages__BFQOF",
  "hidden": "configureCadence-module_hidden__ASc9x",
  "_lead_cadence_link": "configureCadence-module__lead_cadence_link__EKdYN",
  "_command_box_wrapper": "configureCadence-module__command_box_wrapper__zlGIc"
};
styleInject(css_248z$b);
function _typeof$e(obj) {
  "@babel/helpers - typeof";

  return _typeof$e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$e(obj);
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
  return _typeof$e(key) === "symbol" ? key : String(key);
}
function _toPrimitive$d(input, hint) {
  if (_typeof$e(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$e(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$a(arr, i) {
  return _arrayWithHoles$a(arr) || _iterableToArrayLimit$a(arr, i) || _unsupportedIterableToArray$a(arr, i) || _nonIterableRest$a();
}
function _nonIterableRest$a() {
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
var parseDate = function parseDate(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
};
var ConfigureCadenceStep = function ConfigureCadenceStep(_ref) {
  _s14();
  var _selectedBobject$id, _findCadenceByName, _getFieldByLogicRole, _findCadenceByName2, _findCadenceByName3;
  var handleBack = _ref.handleBack,
    handleNext = _ref.handleNext,
    bobject = _ref.bobject,
    previousStep = _ref.previousStep,
    useEveryBobject = _ref.useEveryBobject,
    subhomeTab = _ref.subhomeTab,
    onCadenceChange = _ref.onCadenceChange,
    onDateChange = _ref.onDateChange;
  var userId = useActiveUserId();
  var _useCadenceTable = useCadenceTable(Array.isArray(bobject) ? undefined : bobject),
    cadence = _useCadenceTable.cadence,
    defaultCadence = _useCadenceTable.defaultCadence;
  var _useCadenceControlDat = useCadenceControlData(bobject),
    saveCadence = _useCadenceControlDat.saveCadence;
  var _useState = useState(cadence === null || cadence === void 0 ? void 0 : cadence.id),
    _useState2 = _slicedToArray$a(_useState, 2),
    selectedCadence = _useState2[0],
    setSelectedCadence = _useState2[1];
  var _useState3 = useState(new Date()),
    _useState4 = _slicedToArray$a(_useState3, 2),
    selectedDate = _useState4[0],
    setSelectedDate = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray$a(_useState5, 2),
    dateHasChanged = _useState6[0],
    setDateHasChanged = _useState6[1];
  var isBulkAction = Array.isArray(bobject);
  var selectedBobject = isBulkAction ? bobject[0] : bobject;
  var _useCadences = useCadences({
      bobjectTypeName: selectedBobject === null || selectedBobject === void 0 ? void 0 : selectedBobject.id.typeName,
      accountId: selectedBobject === null || selectedBobject === void 0 ? void 0 : (_selectedBobject$id = selectedBobject.id) === null || _selectedBobject$id === void 0 ? void 0 : _selectedBobject$id.accountId
    }),
    cadences = _useCadences.cadences,
    isLoading = _useCadences.isLoading;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'cadence.configureCadence'
    }),
    t = _useTranslation.t;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'bobjectTypes'
    }),
    bobjectTypeT = _useTranslation2.t;
  var _useCadenceSteps = useCadenceSteps(selectedCadence),
    steps = _useCadenceSteps.steps;
  var _useState7 = useState(false),
    _useState8 = _slicedToArray$a(_useState7, 2),
    isStartCadenceWithDateTime = _useState8[0],
    setIsStartCadenceWithDateTime = _useState8[1];
  var _useState9 = useState(false),
    _useState10 = _slicedToArray$a(_useState9, 2),
    isSubmitting = _useState10[0],
    setIsSubmitting = _useState10[1];
  var _useState11 = useState(false),
    _useState12 = _slicedToArray$a(_useState11, 2),
    showCadenceSelector = _useState12[0],
    setShowCadenceSelector = _useState12[1];
  var ref = useRef(null);
  var modalRef = useRef(null);
  useClickAway(ref, function () {
    return setShowCadenceSelector(false);
  });
  var isSelectedDatePast = isBefore(addHours(selectedDate, 1) || new Date(), new Date().setHours(0));
  var LOGIC_ROLES = FIELDS_LOGIC_ROLE[selectedBobject === null || selectedBobject === void 0 ? void 0 : selectedBobject.id.typeName];
  var enabledCadences = cadences === null || cadences === void 0 ? void 0 : cadences.filter(function (cadenceElement) {
    return cadenceElement === null || cadenceElement === void 0 ? void 0 : cadenceElement.enabled;
  });
  var stage = isOpportunity(bobject) ? 'sales' : 'prospecting';
  useEffect(function () {
    var showDateTime = false;
    steps === null || steps === void 0 ? void 0 : steps.forEach(function (step) {
      if ((step === null || step === void 0 ? void 0 : step.dayNumber) === 0 && step.actionTypes.includes('AUTOMATED_EMAIL')) {
        showDateTime = step.automationSchedulingMode === 'DELAY';
      }
    });
    setIsStartCadenceWithDateTime(showDateTime);
  }, [steps, selectedCadence]);
  useLayoutEffect(function () {
    if (!showCadenceSelector) {
      if (modalRef !== null && modalRef !== void 0 && modalRef.current) {
        var _modalRef$current;
        // @ts-ignore
        modalRef === null || modalRef === void 0 ? void 0 : (_modalRef$current = modalRef.current) === null || _modalRef$current === void 0 ? void 0 : _modalRef$current.click();
      }
    }
  }, [showCadenceSelector]);
  var bobjectName = selectedBobject === null || selectedBobject === void 0 ? void 0 : selectedBobject.id.typeName;
  var findCadenceByName = function findCadenceByName(cadenceName) {
    return cadences === null || cadences === void 0 ? void 0 : cadences.find(function (cadenceData) {
      return cadenceData.name === cadenceName;
    });
  };
  var generateData = function generateData(isActionInBulk) {
    if (isActionInBulk) {
      return {
        currentCadence: null,
        currentStartDate: null,
        defaultCadence: null
      };
    }
    return {
      currentCadence: cadence,
      // @ts-ignore
      currentStartDate: getTextFromLogicRole(bobject, LOGIC_ROLES === null || LOGIC_ROLES === void 0 ? void 0 : LOGIC_ROLES.START_CADENCE),
      currentDefaultCadence: defaultCadence
    };
  };
  var _generateData = generateData(isBulkAction),
    currentCadence = _generateData.currentCadence,
    currentStartDate = _generateData.currentStartDate,
    currentDefaultCadence = _generateData.currentDefaultCadence;
  var hasData = !!(selectedCadence && selectedDate);
  var cadenceHasChanged = selectedCadence !== (currentCadence === null || currentCadence === void 0 ? void 0 : currentCadence.id);
  useEffect(function () {
    setDateHasChanged(true);
  }, [selectedDate]);
  useEffect(function () {
    if (currentDefaultCadence) {
      setSelectedCadence(currentDefaultCadence === null || currentDefaultCadence === void 0 ? void 0 : currentDefaultCadence.id);
    }
  }, [currentDefaultCadence]);
  useEffect(function () {
    if (currentCadence) {
      setSelectedCadence(cadence !== null && cadence !== void 0 && cadence.enabled ? currentCadence === null || currentCadence === void 0 ? void 0 : currentCadence.id : null);
    }
  }, [currentCadence]);
  useEffect(function () {
    if (currentStartDate) {
      setSelectedDate(new Date(currentStartDate));
    }
  }, [currentStartDate]);
  useEffect(function () {
    if ((selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.getHours()) === 0 && (selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.getMinutes()) === 0) {
      selectedDate.setHours(new Date().getHours());
      selectedDate.setMinutes(new Date().getMinutes());
      setSelectedDate(selectedDate);
    }
  }, [selectedDate]);
  var disableButton = isSubmitting || !hasData || !(dateHasChanged || cadenceHasChanged);
  var showMessage = selectedCadence === ((_findCadenceByName = findCadenceByName(defaultCadence)) === null || _findCadenceByName === void 0 ? void 0 : _findCadenceByName.id) && selectedCadence && defaultCadence || selectedDate && !isOpportunity;
  var hasCadences = (cadences === null || cadences === void 0 ? void 0 : cadences.length) > 0;
  var leadStatus = (_getFieldByLogicRole = getFieldByLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.STATUS)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.valueLogicRole;
  var showLeadChangeStatusMessage = isLead(bobject) && [LEAD_STATUS_LOGIC_ROLE.NEW, LEAD_STATUS_LOGIC_ROLE.BACKLOG, LEAD_STATUS_LOGIC_ROLE.DELIVERED].includes(leadStatus);
  function localSaveCadence(startCadenceDate) {
    var _selectedBobject$id2, _selectedBobject$id3, _bobject$id, _bobject$id$typeName;
    var url = "/messaging/cadences/".concat(selectedCadence, "/start");
    var body = {
      bobjectId: selectedBobject === null || selectedBobject === void 0 ? void 0 : (_selectedBobject$id2 = selectedBobject.id) === null || _selectedBobject$id2 === void 0 ? void 0 : _selectedBobject$id2.objectId,
      bobjectType: selectedBobject === null || selectedBobject === void 0 ? void 0 : (_selectedBobject$id3 = selectedBobject.id) === null || _selectedBobject$id3 === void 0 ? void 0 : _selectedBobject$id3.typeName,
      startCadence: startCadenceDate || new Date()
    };
    var toastMessage = t('toast', {
      bobjectType: bobjectTypeT(bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : (_bobject$id$typeName = _bobject$id.typeName) === null || _bobject$id$typeName === void 0 ? void 0 : _bobject$id$typeName.toLowerCase())
    });
    api.put(url, body).then(function () {
      createToast({
        type: 'success',
        message: toastMessage
      });
      handleNext();
    });
  }
  var actionsEnabled = previousStep || handleNext;
  var startButton = useRef(undefined);
  return /*#__PURE__*/jsxs("div", {
    children: [isLead(bobject) && !isLoading && !cadences && /*#__PURE__*/jsx("div", {
      className: styles$b._banner_wrapper,
      children: /*#__PURE__*/jsx(Callout, {
        width: "100%",
        variant: "alert",
        children: /*#__PURE__*/jsxs(Text, {
          size: "s",
          children: [/*#__PURE__*/jsx(Icon, {
            name: "cadence",
            color: "banana"
          }), "\uFE0F", ' ', /*#__PURE__*/jsx(Trans, {
            i18nKey: "cadence.configureCadence.topCallout",
            values: {
              cadence: t('cadence')
            },
            components: [/*#__PURE__*/jsx("strong", {}, "0"), /*#__PURE__*/jsx("a", {
              className: styles$b._lead_cadence_link,
              onClick: function onClick() {
                window.open('https://app.bloobirds.com/app/playbook/cadences', '_blank');
              }
            }, "1"), /*#__PURE__*/jsx("strong", {}, "2")]
          }), "\u2728"]
        })
      })
    }), /*#__PURE__*/jsxs(ModalContent, {
      children: [/*#__PURE__*/jsx("div", {
        className: styles$b._section_title__wrapper,
        ref: modalRef,
        children: /*#__PURE__*/jsx(Text, {
          dataTest: "Text-Modal-ConfigureProspectingCadence",
          size: "m",
          weight: "bold",
          align: "center",
          color: "peanut",
          children: t('title')
        })
      }), /*#__PURE__*/jsx("div", {
        className: styles$b._cadence_preview_wrapper,
        children: /*#__PURE__*/jsx(CadencePreview, {
          cadenceId: selectedCadence
        })
      }), showCadenceSelector && /*#__PURE__*/jsx(CadenceSelector, {
        selectedBobject: selectedBobject,
        onCadenceSelected: function onCadenceSelected(c) {
          setSelectedCadence(c.id);
          setShowCadenceSelector(false);
          onCadenceChange === null || onCadenceChange === void 0 ? void 0 : onCadenceChange(c.id);
        },
        ref: ref,
        userId: userId,
        className: styles$b._command_box_wrapper
      }), /*#__PURE__*/jsxs("div", {
        className: styles$b._section__wrapper,
        children: [/*#__PURE__*/jsx("div", {
          className: styles$b._list__wrapper,
          children: /*#__PURE__*/jsx(Select, {
            dataTest: "".concat(bobjectName === null || bobjectName === void 0 ? void 0 : bobjectName.toUpperCase(), "__CADENCE"),
            defaultValue: defaultCadence && ((_findCadenceByName2 = findCadenceByName(defaultCadence)) === null || _findCadenceByName2 === void 0 ? void 0 : _findCadenceByName2.id),
            value: selectedCadence || !hasCadences && 'none',
            placeholder: t('placeholder', {
              bobjectType: toSentenceCase(bobjectTypeT(bobjectName === null || bobjectName === void 0 ? void 0 : bobjectName.toLowerCase()))
            }),
            disabled: !hasCadences,
            width: "100%",
            onClick: function onClick() {
              return setShowCadenceSelector(true);
            },
            children: hasCadences ? enabledCadences === null || enabledCadences === void 0 ? void 0 : enabledCadences.map(function (cadenceItem) {
              return /*#__PURE__*/jsx(Item, {
                value: cadenceItem.id,
                dataTest: "".concat(cadenceItem.name),
                className: styles$b.hidden,
                children: cadenceItem.name
              }, cadenceItem.id);
            }) : /*#__PURE__*/jsx(Item, {
              value: "none",
              dataTest: "cadence-not-exist",
              children: t('none')
            })
          })
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx(DateTimePicker, {
            dataTest: "BaseInput-Cadence-DatetimePicker",
            value: selectedDate,
            placeholder: t('datePlaceholder'),
            withTimePicker: isStartCadenceWithDateTime,
            onChange: function onChange(date) {
              setDateHasChanged(true);
              setSelectedDate(date);
              onDateChange === null || onDateChange === void 0 ? void 0 : onDateChange(date);
            }
          })
        })]
      }), isSelectedDatePast && /*#__PURE__*/jsx(Callout, {
        width: "100%",
        variant: "alert",
        icon: "alertTriangle",
        children: t('bottomCallout')
      }), showLeadChangeStatusMessage && /*#__PURE__*/jsx("div", {
        className: clsx(styles$b._on_prospection_message, _defineProperty$d({}, styles$b._with_more_messages, isSelectedDatePast)),
        children: /*#__PURE__*/jsxs(Text, {
          size: "m",
          htmlTag: "span",
          color: "peanut",
          inline: true,
          children: [/*#__PURE__*/jsxs("span", {
            role: "img",
            "aria-label": "backhand",
            children: ["\uD83D\uDC49", ' ']
          }), /*#__PURE__*/jsx(Trans, {
            i18nKey: "cadence.configureCadence.leadStatusCallout"
          })]
        })
      }), actionsEnabled && (!isBulkAction && hasCadences && showMessage ? /*#__PURE__*/jsx(Callout, {
        variant: "alert",
        width: "100%",
        withoutIcon: true,
        children: /*#__PURE__*/jsx("div", {
          className: styles$b._message__wrapper,
          children: /*#__PURE__*/jsxs("div", {
            children: [/*#__PURE__*/jsx("span", {
              role: "img",
              "aria-label": "hand",
              children: "\uD83D\uDC49"
            }), ' ', selectedCadence === ((_findCadenceByName3 = findCadenceByName(defaultCadence)) === null || _findCadenceByName3 === void 0 ? void 0 : _findCadenceByName3.id) && /*#__PURE__*/jsx(Trans, {
              i18nKey: "cadence.configureCadence.recommendedStage",
              values: {
                stage: stage
              }
            }), ' ', !selectedDate && /*#__PURE__*/jsx(Fragment, {
              children: t('selectDateInfo')
            })]
          })
        })
      }) : /*#__PURE__*/jsx("div", {
        className: styles$b._cadence_placeholder
      })), isBulkAction && /*#__PURE__*/jsx(Callout, {
        width: "100%",
        withoutIcon: true,
        children: /*#__PURE__*/jsx("div", {
          className: styles$b._message__wrapper,
          children: /*#__PURE__*/jsxs("div", {
            children: [/*#__PURE__*/jsx("span", {
              role: "img",
              "aria-label": "hand",
              children: "\uD83D\uDC49"
            }), ' ', t('bulkInfo')]
          })
        })
      })]
    }), actionsEnabled && /*#__PURE__*/jsx(ModalFooter, {
      children: /*#__PURE__*/jsxs("div", {
        className: styles$b._buttons__wrapper,
        children: [previousStep && /*#__PURE__*/jsx(Button, {
          variant: "clear",
          onClick: handleBack,
          children: t('back')
        }), handleNext && /*#__PURE__*/jsx("div", {
          ref: startButton,
          children: /*#__PURE__*/jsx(Tooltip, {
            title: disableButton && t('startCadenceDateInfo'),
            position: "top",
            children: /*#__PURE__*/jsx(Button, {
              dataTest: "saveCadence",
              disabled: disableButton,
              onClick: function onClick(event) {
                event.currentTarget.disabled = true;
                setIsSubmitting(true);
                mixpanel.track(MIXPANEL_EVENTS.CLICK_START_CADENCE_FROM_MODAL);
                setTimeout(function () {
                  if (selectedCadence && selectedDate) {
                    var startCadenceDate = isStartCadenceWithDateTime ? spacetime(selectedDate).format('iso-utc') : parseDate(selectedDate);
                    saveCadence ? saveCadence(selectedCadence, handleNext, startCadenceDate, useEveryBobject, subhomeTab) : localSaveCadence(startCadenceDate);
                    setIsSubmitting(false);
                  }
                }, 2500);
              },
              children: isSubmitting ? /*#__PURE__*/jsx(Spinner, {
                name: "loadingCircle",
                size: 16,
                color: "white"
              }) : t('start')
            })
          })
        })]
      })
    })]
  });
};
_s14(ConfigureCadenceStep, "49mLSnv0J0I3mLLZ/JVudlx0skM=", false, function () {
  return [useActiveUserId, useCadenceTable, useCadenceControlData, useCadences, useTranslation, useTranslation, useCadenceSteps, useClickAway];
});
_c12 = ConfigureCadenceStep;
var StartCadenceModal = function StartCadenceModal(_ref) {
  var handleBack = _ref.handleBack,
    handleNext = _ref.handleNext,
    bobject = _ref.bobject;
  _ref.saveCadence;
  var previousStep = _ref.previousStep,
    onClose = _ref.onClose,
    open = _ref.open;
  return /*#__PURE__*/jsx(Modal, {
    open: open,
    onClose: onClose,
    title: "Configure the cadence",
    width: 806,
    children: /*#__PURE__*/jsx(ConfigureCadenceStep, {
      handleBack: handleBack,
      handleNext: handleNext,
      bobject: bobject
      //saveCadence={saveCadence}
      ,

      previousStep: previousStep
    })
  });
};
_c13 = StartCadenceModal;
var css_248z$a = ".stopCadenceModal-module_text__JYoeO {\n  margin-bottom: 30px;\n  text-align: center;\n}\n";
var styles$a = {
  "text": "stopCadenceModal-module_text__JYoeO"
};
styleInject(css_248z$a);
var StopCadenceModal = function StopCadenceModal(_ref) {
  _s15();
  var _sampleBobject$id;
  var bobject = _ref.bobject,
    handleClose = _ref.handleClose,
    handleSave = _ref.handleSave,
    useEveryBobject = _ref.useEveryBobject,
    subhomeTab = _ref.subhomeTab,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size;
  var _useCadenceControlDat = useCadenceControlData(bobject),
    isSaving = _useCadenceControlDat.isSaving,
    stopCadence = _useCadenceControlDat.stopCadence;
  var isBulkAction = Array.isArray(bobject);
  var sampleBobject = isBulkAction ? bobject[0] : bobject;
  var bobjectType = sampleBobject === null || sampleBobject === void 0 ? void 0 : (_sampleBobject$id = sampleBobject.id) === null || _sampleBobject$id === void 0 ? void 0 : _sampleBobject$id.typeName;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'cadence.stopCadenceModal'
    }),
    t = _useTranslation.t;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'bobjectTypes'
    }),
    bobjectTypeT = _useTranslation2.t;
  return /*#__PURE__*/jsxs(Modal, {
    open: true,
    onClose: handleClose,
    width: 640,
    children: [/*#__PURE__*/jsxs(ModalHeader, {
      size: size,
      children: [/*#__PURE__*/jsx(ModalTitle, {
        size: size,
        children: t('stopCadence', {
          count: isBulkAction ? bobject === null || bobject === void 0 ? void 0 : bobject.length : 1
        })
      }), /*#__PURE__*/jsx(ModalCloseIcon, {
        onClick: handleClose,
        size: size
      })]
    }), /*#__PURE__*/jsx(ModalContent, {
      children: /*#__PURE__*/jsx("div", {
        className: styles$a.text,
        children: isBulkAction ? /*#__PURE__*/jsx(Text, {
          size: "m",
          align: "center",
          children: /*#__PURE__*/jsx(Trans, {
            i18nKey: "cadence.stopCadenceModal.messageBulk",
            values: {
              count: bobject === null || bobject === void 0 ? void 0 : bobject.length,
              bobjectTypes: bobjectTypeT(bobjectType === null || bobjectType === void 0 ? void 0 : bobjectType.toLowerCase(), {
                count: bobject === null || bobject === void 0 ? void 0 : bobject.length
              })
            }
          })
        }) : /*#__PURE__*/jsx(Text, {
          size: "m",
          align: "center",
          children: /*#__PURE__*/jsx(Trans, {
            i18nKey: "cadence.stopCadenceModal.message",
            values: {
              bobjectTypes: bobjectTypeT(bobjectType === null || bobjectType === void 0 ? void 0 : bobjectType.toLowerCase())
            }
          })
        })
      })
    }), /*#__PURE__*/jsxs(ModalFooter, {
      children: [/*#__PURE__*/jsx(Button, {
        variant: "clear",
        onClick: handleClose,
        children: t('cancel')
      }), /*#__PURE__*/jsx(Button, {
        color: "tomato",
        onClick: function onClick() {
          stopCadence(function () {
            handleSave === null || handleSave === void 0 ? void 0 : handleSave();
            handleClose();
          }, useEveryBobject, subhomeTab);
        },
        children: isSaving ? /*#__PURE__*/jsx(Spinner, {
          color: "white",
          size: 14,
          name: "loadingCircle"
        }) : t('stopCadence')
      })]
    })]
  });
};
_s15(StopCadenceModal, "1u/hxDmN8JUo8pqNs6/l2nlAQXg=", false, function () {
  return [useCadenceControlData, useTranslation, useTranslation];
});
_c14 = StopCadenceModal;
var css_248z$9 = ".rescheduleCadence-module_modal__TKiRo {\n    background-color: var(--white);\n}\n\n.rescheduleCadence-module_header__1GlBF {\n    padding: 24px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n}\n\n.rescheduleCadence-module_content__n4DQR {\n    padding: 16px 24px;\n    padding-top: 0;\n}\n\n.rescheduleCadence-module_content__n4DQR > p {\n    margin: 8px 0;\n}\n\n.rescheduleCadence-module_customButton__h5d-K {\n    margin-top: 8px;\n    justify-content: center;\n}\n\n.rescheduleCadence-module_shortcuts__46Hoz {\n    display: grid;\n    grid-auto-flow: row;\n    row-gap: 4px;\n}\n\n.rescheduleCadence-module__mainCalendarBox__-SUgI {\n    margin: 32px auto;\n    display: flex;\n    align-items: center;\n    justify-content: space-around;\n}\n\n.rescheduleCadence-module__calendar__vY5Sz {\n    width: 65px;\n    flex-shrink: 0;\n    box-sizing: border-box;\n    margin-right: 16px;\n    border: 1px solid var(--verySoftPeanut);\n}\n\n.rescheduleCadence-module__calendar__vY5Sz > header {\n    box-sizing: border-box;\n    background-color: var(--tomato);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 30px;\n}\n\n.rescheduleCadence-module__calendar__vY5Sz > div {\n    padding: 4px 8px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.rescheduleCadence-module__text__pcDJV {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n}\n";
var styles$9 = {
  "modal": "rescheduleCadence-module_modal__TKiRo",
  "header": "rescheduleCadence-module_header__1GlBF",
  "content": "rescheduleCadence-module_content__n4DQR",
  "customButton": "rescheduleCadence-module_customButton__h5d-K",
  "shortcuts": "rescheduleCadence-module_shortcuts__46Hoz",
  "_mainCalendarBox": "rescheduleCadence-module__mainCalendarBox__-SUgI",
  "_calendar": "rescheduleCadence-module__calendar__vY5Sz",
  "_text": "rescheduleCadence-module__text__pcDJV"
};
styleInject(css_248z$9);
function _typeof$d(obj) {
  "@babel/helpers - typeof";

  return _typeof$d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$d(obj);
}
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
      _defineProperty$c(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) {
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
  return _typeof$d(key) === "symbol" ? key : String(key);
}
function _toPrimitive$c(input, hint) {
  if (_typeof$d(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$d(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray$9(arr, i) {
  return _arrayWithHoles$9(arr) || _iterableToArrayLimit$9(arr, i) || _unsupportedIterableToArray$9(arr, i) || _nonIterableRest$9();
}
function _nonIterableRest$9() {
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
var TASK_COLUMNS = [TASK_FIELDS_LOGIC_ROLE.TITLE, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME];
var TASK_REFERENCED_COLUMNS = [COMPANY_FIELDS_LOGIC_ROLE.NAME, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME];
var useRescheduleCadence = function useRescheduleCadence(bobject) {
  _s16();
  var _bobject$id, _bobject$id2, _bobject$id3, _bobject$id4;
  var activeUserId = useActiveUserId();
  var _useState = useState(),
    _useState2 = _slicedToArray$9(_useState, 2),
    nextTask = _useState2[0],
    setNextTask = _useState2[1];
  useEffect(function () {
    if (bobject.id.accountId) getNextTask();
  }, [bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.value]);
  var queries = {
    Company: [_defineProperty$c({}, TASK_FIELDS_LOGIC_ROLE.COMPANY, [bobject === null || bobject === void 0 ? void 0 : (_bobject$id2 = bobject.id) === null || _bobject$id2 === void 0 ? void 0 : _bobject$id2.value])],
    Lead: [_defineProperty$c({}, TASK_FIELDS_LOGIC_ROLE.LEAD, [bobject === null || bobject === void 0 ? void 0 : (_bobject$id3 = bobject.id) === null || _bobject$id3 === void 0 ? void 0 : _bobject$id3.value])],
    Opportunity: [_defineProperty$c({}, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY, [bobject === null || bobject === void 0 ? void 0 : (_bobject$id4 = bobject.id) === null || _bobject$id4 === void 0 ? void 0 : _bobject$id4.value])]
  };
  var getNextTask = function getNextTask() {
    var _bobject$id5;
    var query = _objectSpread$7({
      query: _defineProperty$c(_defineProperty$c({}, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE, ['PROSPECT_CADENCE']), TASK_FIELDS_LOGIC_ROLE.STATUS, [TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE, TASK_STATUS_VALUE_LOGIC_ROLE.TODO]),
      page: 0,
      pageSize: 1,
      sort: [{
        field: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
        direction: 'ASC'
      }, {
        field: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
        direction: 'ASC'
      }],
      queries: queries[bobject === null || bobject === void 0 ? void 0 : (_bobject$id5 = bobject.id) === null || _bobject$id5 === void 0 ? void 0 : _bobject$id5.typeName],
      columns: TASK_COLUMNS,
      referencedColumns: TASK_REFERENCED_COLUMNS
    }, BASE_SEARCH_REQUEST);
    api.post('/bobjects/' + bobject.id.accountId + '/Task/search', query).then(function (_ref4) {
      var _data$contents;
      var data = _ref4.data;
      setNextTask(data === null || data === void 0 ? void 0 : (_data$contents = data.contents) === null || _data$contents === void 0 ? void 0 : _data$contents[0]);
    });
  };
  var getNextTaskDate = function getNextTaskDate() {
    return nextTask && (getValueFromLogicRole(nextTask, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE) || getValueFromLogicRole(nextTask, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME));
  };
  var handleSubmit = function handleSubmit(date, task) {
    var body = {
      userId: activeUserId,
      taskFromId: task.id.value,
      rescheduleAllCadence: true,
      newDate: date
    };
    return api.put('/messaging/cadences/rescheduleStep', body).then(function () {
      window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: {
          type: BobjectTypes.Task
        }
      }));
    });
  };
  return {
    nextTask: nextTask,
    getNextTaskDate: getNextTaskDate,
    handleSubmit: handleSubmit
  };
};
_s16(useRescheduleCadence, "BQ0WKNitn97ENddD28TFbfxFXWI=", false, function () {
  return [useActiveUserId];
});
function _typeof$c(obj) {
  "@babel/helpers - typeof";

  return _typeof$c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$c(obj);
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
        return value && "object" == _typeof$c(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
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
function _slicedToArray$8(arr, i) {
  return _arrayWithHoles$8(arr) || _iterableToArrayLimit$8(arr, i) || _unsupportedIterableToArray$8(arr, i) || _nonIterableRest$8();
}
function _nonIterableRest$8() {
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
var RescheduleCadence = function RescheduleCadence(_ref) {
  _s17();
  var _Date;
  var bobject = _ref.bobject,
    onClose = _ref.onClose,
    onSave = _ref.onSave;
  var userTimeZone = useUserTimeZone();
  var _useState = useState(false),
    _useState2 = _slicedToArray$8(_useState, 2),
    customDateVisible = _useState2[0],
    setCustomDateVisible = _useState2[1];
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'cadence.rescheduleCadence'
    }),
    t = _useTranslation.t,
    i18n = _useTranslation.i18n;
  var _useRescheduleCadence = useRescheduleCadence(bobject),
    getNextTaskDate = _useRescheduleCadence.getNextTaskDate,
    handleSubmit = _useRescheduleCadence.handleSubmit,
    nextTask = _useRescheduleCadence.nextTask;
  var _useCadenceInfo = useCadenceInfo(bobject),
    cadence = _useCadenceInfo.cadence;
  var cadenceNotReschedulable = (cadence === null || cadence === void 0 ? void 0 : cadence.reschedulableMode) !== 'RESCHEDULABLE';
  var nextTaskDate = getNextTaskDate();
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
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(date) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (nextTask) {
              handleSubmit(date, nextTask).then(function () {
                setCustomDateVisible(false);
                onSave();
                onClose();
              });
            }
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleSave(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  if (customDateVisible) {
    return /*#__PURE__*/jsx(CustomDateDialog, {
      bobject: bobject,
      onCancel: function onCancel() {
        return setCustomDateVisible(false);
      },
      onSubmit: /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(date) {
          var offsetDate;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                offsetDate = spacetime()["goto"](userTimeZone).year(date.getFullYear()).month(date.getMonth()).date(date.getDate()).hour(date.getHours()).minute(date.getMinutes()).toNativeDate();
                _context2.next = 3;
                return handleSave(offsetDate);
              case 3:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      }()
    });
  }
  return /*#__PURE__*/jsxs(Modal, {
    className: styles$9.modal,
    open: true,
    onClose: onClose,
    width: 364,
    children: [/*#__PURE__*/jsxs("header", {
      className: styles$9.header,
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
      className: styles$9.content,
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$9._mainCalendarBox,
        children: [/*#__PURE__*/jsxs("div", {
          className: styles$9._text,
          children: [/*#__PURE__*/jsx(Text, {
            size: "l",
            weight: "bold",
            color: "peanut",
            children: t('nextStepIn')
          }), nextTaskDate ? /*#__PURE__*/jsx(Text, {
            size: "m",
            color: "peanut",
            children: getI18nSpacetimeLng(i18n.language, new Date(), getUserTimeZone()).since(getI18nSpacetimeLng(i18n.language, new Date(nextTaskDate), getUserTimeZone())).rounded
          }) : /*#__PURE__*/jsx(Skeleton, {
            width: 60,
            height: 24,
            variant: "text"
          })]
        }), /*#__PURE__*/jsxs("div", {
          className: styles$9._calendar,
          children: [/*#__PURE__*/jsx("header", {
            children: nextTaskDate ? /*#__PURE__*/jsx(Text, {
              align: "center",
              size: "m",
              weight: "bold",
              color: "white",
              children: formatDate(new Date(nextTaskDate), 'MMM').toUpperCase()
            }) : /*#__PURE__*/jsx(Skeleton, {
              width: 40,
              height: 24,
              variant: "text"
            })
          }), /*#__PURE__*/jsx("div", {
            children: nextTaskDate ? /*#__PURE__*/jsx(Text, {
              align: "center",
              size: "xxl",
              weight: "bold",
              color: "peanut",
              children: (_Date = new Date(nextTaskDate)) === null || _Date === void 0 ? void 0 : _Date.getDate()
            }) : /*#__PURE__*/jsx(Skeleton, {
              width: 30,
              height: 40,
              variant: "rect"
            })
          })]
        })]
      }), /*#__PURE__*/jsx(Text, {
        size: "m",
        color: "softPeanut",
        children: t('subtitle')
      }), /*#__PURE__*/jsxs("div", {
        className: styles$9.shortcuts,
        children: [/*#__PURE__*/jsx(DateTimeShortcut, {
          timezone: userTimeZone,
          text: t('tomorrow'),
          date: tomorrowMorning,
          onClick: handleSave,
          format: t('dates.shortMonth')
        }), /*#__PURE__*/jsx(DateTimeShortcut, {
          timezone: userTimeZone,
          text: t('nextMonday'),
          date: nextMondayDatetime,
          onClick: handleSave,
          format: t('dates.shortMonth')
        }), /*#__PURE__*/jsx(DateTimeShortcut, {
          timezone: userTimeZone,
          text: t('inTwoDays'),
          date: inTwoDays,
          onClick: handleSave,
          format: t('dates.shortMonth')
        }), /*#__PURE__*/jsx(DateTimeShortcut, {
          timezone: userTimeZone,
          text: t('inOneWeek'),
          date: inOneWeek,
          onClick: handleSave,
          format: t('dates.shortMonth')
        })]
      }), /*#__PURE__*/jsx(Tooltip, {
        title: cadenceNotReschedulable ? 'error' : undefined,
        position: "top",
        children: /*#__PURE__*/jsx(Button, {
          className: styles$9.customButton,
          expand: true,
          variant: "tertiary",
          uppercase: true,
          iconLeft: "calendar",
          onClick: function onClick() {
            return setCustomDateVisible(true);
          },
          disabled: cadenceNotReschedulable,
          children: t('selectDateAndTime')
        })
      })]
    })]
  });
};
_s17(RescheduleCadence, "hqaFY78Ehc/X9HIwQgpK2GpX20E=", false, function () {
  return [useUserTimeZone, useTranslation, useRescheduleCadence, useCadenceInfo];
});
_c15 = RescheduleCadence;
var TIME_WINDOW;
(function (TIME_WINDOW) {
  TIME_WINDOW["DAILY"] = "DAILY";
  TIME_WINDOW["WEEKLY"] = "WEEKLY";
  TIME_WINDOW["MONTHLY"] = "MONTHLY";
})(TIME_WINDOW || (TIME_WINDOW = {}));
var CadenceType;
(function (CadenceType) {
  CadenceType["call"] = "call";
  CadenceType["email"] = "email";
  CadenceType["autoEmail"] = "autoEmail";
  CadenceType["linkedIn"] = "linkedIn";
  CadenceType["customTask"] = "customTask";
  CadenceType["meeting"] = "meeting";
  CadenceType["inbound"] = "inbound";
  CadenceType["statusChange"] = "statusChange";
})(CadenceType || (CadenceType = {}));
var cadenceTypesList = Object.values(CadenceType);
var cadenceResponseDefault = {
  tasks: {},
  timeWindow: TIME_WINDOW.DAILY,
  firstTaskDate: '',
  firstActivityDate: '',
  lastTaskDate: '',
  lastActivityDate: ''
};
var css_248z$8 = ".autoAssignDropdown-module__auto_assign_dropdown__fh5SL {\n  display: flex;\n  flex-direction: column;\n  width: 250px;\n  padding: 16px;\n}\n\n.autoAssignDropdown-module__auto_assign_text__g0T56 {\n  padding-bottom: 16px;\n}\n\n.autoAssignDropdown-module__radio_group__CXxpH {\n  padding-bottom: 16px;\n}\n\n.autoAssignDropdown-module__button_wrapper__-XEDI {\n  margin: 0 4px;\n}\n\n.autoAssignDropdown-module__button_wrapper__-XEDI > div > div {\n  width: 100%;\n}\n\n/*\nBreaks the START CADENCE from the wizard\n._button_wrapper > div {\n  height: 24px;\n}*/\n\n.autoAssignDropdown-module__radio_group__CXxpH > div > div {\n  font-size: 12px;\n}\n";
var styles$8 = {
  "_auto_assign_dropdown": "autoAssignDropdown-module__auto_assign_dropdown__fh5SL",
  "_auto_assign_text": "autoAssignDropdown-module__auto_assign_text__g0T56",
  "_radio_group": "autoAssignDropdown-module__radio_group__CXxpH",
  "_button_wrapper": "autoAssignDropdown-module__button_wrapper__-XEDI"
};
styleInject(css_248z$8);
function _typeof$b(obj) {
  "@babel/helpers - typeof";

  return _typeof$b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$b(obj);
}
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
      _defineProperty$b(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) {
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
function getBobjectsToAssign(contactBobjects, activeBobject) {
  var _activeBobject$id, _contactBobjects$comp, _contactBobjects$comp2, _contactBobjects$lead;
  var activeBobjectType = activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id = activeBobject.id) === null || _activeBobject$id === void 0 ? void 0 : _activeBobject$id.typeName;
  switch (activeBobjectType) {
    case 'Lead':
      return {
        Company: contactBobjects === null || contactBobjects === void 0 ? void 0 : (_contactBobjects$comp = contactBobjects.company) === null || _contactBobjects$comp === void 0 ? void 0 : (_contactBobjects$comp2 = _contactBobjects$comp.id) === null || _contactBobjects$comp2 === void 0 ? void 0 : _contactBobjects$comp2.objectId,
        Lead: activeBobject.id.objectId
      };
    case 'Company':
      return {
        Company: activeBobject.id.objectId,
        Lead: contactBobjects === null || contactBobjects === void 0 ? void 0 : (_contactBobjects$lead = contactBobjects.leads) === null || _contactBobjects$lead === void 0 ? void 0 : _contactBobjects$lead.map(function (lead) {
          return lead.id.objectId;
        })
      };
  }
}
function useAutoAssignBobjets(userId) {
  var assignBobjects = function assignBobjects(_ref) {
    var _activeBobject$id2;
    var contactBobjects = _ref.contactBobjects,
      activeBobject = _ref.activeBobject,
      mode = _ref.mode,
      callback = _ref.callback;
    var bobjects = getBobjectsToAssign(contactBobjects, activeBobject);
    var bobjectsToSetTypes = bobjects && Object.keys(bobjects);
    var accountId = activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id2 = activeBobject.id) === null || _activeBobject$id2 === void 0 ? void 0 : _activeBobject$id2.accountId;
    function getRequestBody(bobjectType, leads) {
      var body = _defineProperty$b({}, (bobjectType === null || bobjectType === void 0 ? void 0 : bobjectType.toUpperCase()) + '__ASSIGNED_TO', userId);
      if (leads) {
        var leadsData = {};
        leads.forEach(function (leadId) {
          leadsData = _objectSpread$6(_objectSpread$6({}, leadsData), {}, _defineProperty$b({}, leadId, body));
        });
        return leadsData;
      } else {
        return body;
      }
    }
    if (mode === 'partial') {
      var _activeBobject$id3;
      var bobjectType = activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id3 = activeBobject.id) === null || _activeBobject$id3 === void 0 ? void 0 : _activeBobject$id3.typeName;
      return api.patch("/bobjects/".concat(accountId, "/").concat(bobjectType, "/").concat(bobjects[bobjectType], "/raw"), getRequestBody(bobjectType, null)).then(callback);
    } else {
      bobjectsToSetTypes.forEach(function (bobjectType) {
        if (!bobjects[bobjectType]) return;
        if (typeof bobjects[bobjectType] === 'string') {
          var updateData = getRequestBody(bobjectType, null);
          return api.patch("/bobjects/".concat(accountId, "/").concat(bobjectType, "/").concat(bobjects[bobjectType], "/raw"), updateData).then(callback);
        } else {
          return api.patch("/bobjects/".concat(accountId, "/Lead/bulk"), getRequestBody(bobjectType, bobjects[bobjectType])).then(callback);
        }
      });
    }
  };
  return {
    assignBobjects: assignBobjects
  };
}
function _slicedToArray$7(arr, i) {
  return _arrayWithHoles$7(arr) || _iterableToArrayLimit$7(arr, i) || _unsupportedIterableToArray$7(arr, i) || _nonIterableRest$7();
}
function _nonIterableRest$7() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
var DropdownContent$1 = function DropdownContent(_ref) {
  _s18();
  var _activeBobject$id, _contactBobjects$lead;
  var userId = _ref.activeUserId,
    activeBobject = _ref.activeBobject,
    contactBobjects = _ref.contactBobjects,
    setDropdownVisible = _ref.setDropdownVisible,
    callback = _ref.callback;
  var _useState = useState('all'),
    _useState2 = _slicedToArray$7(_useState, 2),
    assignType = _useState2[0],
    setAssignType = _useState2[1];
  var _useAutoAssignBobjets = useAutoAssignBobjets(userId),
    assignBobjects = _useAutoAssignBobjets.assignBobjects;
  var bobjectType = activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id = activeBobject.id) === null || _activeBobject$id === void 0 ? void 0 : _activeBobject$id.typeName;
  var hasLeads = (contactBobjects === null || contactBobjects === void 0 ? void 0 : (_contactBobjects$lead = contactBobjects.leads) === null || _contactBobjects$lead === void 0 ? void 0 : _contactBobjects$lead.length) > 0;
  var contactCompany = contactBobjects === null || contactBobjects === void 0 ? void 0 : contactBobjects.company;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var shouldShowOptions = hasLeads && bobjectType === BobjectTypes.Company || contactCompany && bobjectType === BobjectTypes.Lead;
  var handleSubmit = function handleSubmit() {
    assignBobjects({
      contactBobjects: contactBobjects,
      activeBobject: activeBobject,
      mode: assignType,
      callback: callback
    });
    setDropdownVisible(false);
  };
  var getModalText = function getModalText() {
    switch (bobjectType) {
      case BobjectTypes.Company:
        return [t('cadence.cadenceControlModal.assignCadenceDropdown.assignCompany'), t('cadence.cadenceControlModal.assignCadenceDropdown.assignCompanyAndLeads')];
      case BobjectTypes.Lead:
        return [t('cadence.cadenceControlModal.assignCadenceDropdown.assignLead'), t('cadence.cadenceControlModal.assignCadenceDropdown.assignLeadAndCompany')];
    }
  };
  var radioText = getModalText();
  return /*#__PURE__*/jsxs("div", {
    className: styles$8._auto_assign_dropdown,
    children: [/*#__PURE__*/jsx(Text, {
      size: "s",
      align: "center",
      className: styles$8._auto_assign_text,
      children: /*#__PURE__*/jsx(Trans, {
        i18nKey: "cadence.cadenceControlModal.assignCadenceDropdown.title",
        values: {
          bobjectType: t("bobjectTypes.".concat(bobjectType.toLowerCase()))
        }
      })
    }), shouldShowOptions && /*#__PURE__*/jsx("div", {
      className: styles$8._radio_group,
      children: /*#__PURE__*/jsxs(RadioGroup, {
        defaultValue: "all",
        onChange: function onChange(value) {
          setAssignType(value);
        },
        children: [/*#__PURE__*/jsxs(Radio, {
          value: "all",
          size: "small",
          expand: true,
          children: [radioText[1], /*#__PURE__*/jsx(Tooltip, {
            title: t('cadence.cadenceControlModal.assignCadenceDropdown.tooltip'),
            position: "top",
            children: /*#__PURE__*/jsx(Icon, {
              name: "info",
              size: 16
            })
          })]
        }), /*#__PURE__*/jsx(Radio, {
          value: "partial",
          size: "small",
          expand: true,
          children: radioText[0]
        })]
      })
    }), /*#__PURE__*/jsx(Button, {
      size: "small",
      onClick: handleSubmit,
      children: t('cadence.cadenceControlModal.assignCadenceDropdown.assignStart')
    })]
  });
};

//TODO this is duplicated in the components folder
_s18(DropdownContent$1, "iQYyV+5LWyDJyqeAIkigAbA8Vis=", false, function () {
  return [useAutoAssignBobjets, useTranslation];
});
_c16 = DropdownContent$1;
var AutoAssignDropdown = function AutoAssignDropdown(_ref2) {
  _s19();
  var _activeBobject$id2;
  var activeUserId = _ref2.activeUserId,
    callback = _ref2.callback,
    contactBobjects = _ref2.contactBobjects,
    activeBobject = _ref2.activeBobject,
    children = _ref2.children,
    actionsDisabled = _ref2.actionsDisabled;
  var _useVisible = useVisible();
  _useVisible.ref;
  var visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  var dropdownRef = useRef();
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'cadence.cadenceControlModal.assignCadenceDropdown'
    }),
    t = _useTranslation2.t;
  var _useTranslation3 = useTranslation(),
    bobjectTypeT = _useTranslation3.t;
  var bobjectType = activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id2 = activeBobject.id) === null || _activeBobject$id2 === void 0 ? void 0 : _activeBobject$id2.typeName;
  var assignedToValue = 'assignedTo' in activeBobject ? activeBobject === null || activeBobject === void 0 ? void 0 : activeBobject.assignedTo : getValueFromLogicRole(activeBobject, FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO);
  var isAssigned = !!assignedToValue;
  useClickAway(dropdownRef, function () {
    setVisible(false);
  });
  var _useMediaQuery = useMediaQuery(),
    isSmallDesktop = _useMediaQuery.isSmallDesktop;
  function handleOnClick() {
    if (actionsDisabled) return;else if (isAssigned) {
      callback();
    } else {
      setVisible(!visible);
    }
  }
  // The id from this div is important, used for styling purpose
  return /*#__PURE__*/jsx("div", {
    className: styles$8._button_wrapper,
    id: "startCadenceButton",
    children: /*#__PURE__*/jsx(Dropdown, {
      ref: dropdownRef,
      width: "100%",
      visible: visible,
      arrow: true,
      anchor: children ? /*#__PURE__*/jsx(Tooltip, {
        title: actionsDisabled && t('noPermissionsTooltip', {
          bobjectType: bobjectTypeT(bobjectType.toLowerCase())
        }),
        position: "top",
        children: /*#__PURE__*/React.cloneElement(children, {
          onClick: handleOnClick
        })
      }) : /*#__PURE__*/jsx(Button, {
        dataTest: "Cadence-Start",
        size: "small",
        variant: "secondary",
        iconLeft: "play",
        onClick: function onClick() {
          isAssigned ? callback() : setVisible(!visible);
        },
        children: !isSmallDesktop && t('start')
      }),
      children: /*#__PURE__*/jsx(DropdownContent$1, {
        activeUserId: activeUserId,
        activeBobject: activeBobject,
        contactBobjects: contactBobjects,
        setDropdownVisible: setVisible,
        callback: callback
      })
    })
  });
};
_s19(AutoAssignDropdown, "oJxBzjo4r8j6WRzje1XuhvN08Ok=", false, function () {
  return [useVisible, useTranslation, useTranslation, useClickAway, useMediaQuery];
});
_c17 = AutoAssignDropdown;
function _typeof$a(obj) {
  "@babel/helpers - typeof";

  return _typeof$a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$a(obj);
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
var STEPS;
(function (STEPS) {
  STEPS["INITIAL"] = "INITIAL";
  STEPS["EXIT"] = "EXIT";
  STEPS["NEXT_STEPS"] = "NEXT_STEPS";
  STEPS["CONFIGURE_CADENCE"] = "CONFIGURE_CADENCE";
  STEPS["SCHEDULE_NEXT_STEP"] = "SCHEDULE_NEXT_STEP";
  STEPS["UPDATE_LEADS_STATUSES"] = "UPDATE_LEADS_STATUSES";
  STEPS["STOP_CADENCE"] = "STOP_CADENCE";
  STEPS["CADENCE_FEEDBACK"] = "CADENCE_FEEDBACK";
})(STEPS || (STEPS = {}));
var isConfigureNewCadence = function isConfigureNewCadence(context, event) {
  return event.selectedStep === STEPS.CONFIGURE_CADENCE;
};
var isDoAnytingElse = function isDoAnytingElse(context, event) {
  return event.selectedStep === STEPS.EXIT;
};
var isScheduleNextStep = function isScheduleNextStep(context, event) {
  return event.selectedStep === STEPS.NEXT_STEPS;
};
var hasLeads = function hasLeads(context, event) {
  return event.hasLeads;
};
var closeModals = function closeModals(context) {
  return context.handleClose();
};
var EVENTS = Object.seal({
  NEXT: 'NEXT',
  PREVIOUS: 'PREVIOUS',
  SKIP: 'SKIP'
});
var stepsMachine = createMachine({
  id: 'cadence_control_steps',
  context: {
    isAccount: false
  },
  initial: STEPS.NEXT_STEPS,
  states: _defineProperty$a(_defineProperty$a(_defineProperty$a(_defineProperty$a(_defineProperty$a(_defineProperty$a(_defineProperty$a({}, STEPS.INITIAL, {
    on: _defineProperty$a(_defineProperty$a(_defineProperty$a(_defineProperty$a({}, STEPS.NEXT_STEPS, STEPS.NEXT_STEPS), STEPS.CONFIGURE_CADENCE, STEPS.CONFIGURE_CADENCE), STEPS.UPDATE_LEADS_STATUSES, STEPS.UPDATE_LEADS_STATUSES), STEPS.SCHEDULE_NEXT_STEP, STEPS.SCHEDULE_NEXT_STEP)
  }), STEPS.NEXT_STEPS, {
    on: _defineProperty$a(_defineProperty$a(_defineProperty$a({}, EVENTS.NEXT, [{
      target: STEPS.CONFIGURE_CADENCE,
      cond: isConfigureNewCadence
    }, {
      target: STEPS.SCHEDULE_NEXT_STEP,
      cond: isScheduleNextStep
    }, {
      actions: [closeModals],
      cond: isDoAnytingElse
    }]), STEPS.CONFIGURE_CADENCE, STEPS.CONFIGURE_CADENCE), STEPS.UPDATE_LEADS_STATUSES, STEPS.UPDATE_LEADS_STATUSES)
  }), STEPS.CONFIGURE_CADENCE, {
    on: _defineProperty$a(_defineProperty$a({}, EVENTS.NEXT, STEPS.CADENCE_FEEDBACK), EVENTS.PREVIOUS, STEPS.NEXT_STEPS)
  }), STEPS.CADENCE_FEEDBACK, {
    on: _defineProperty$a({}, EVENTS.NEXT, [{
      target: STEPS.UPDATE_LEADS_STATUSES,
      cond: hasLeads
    }, {
      actions: [closeModals]
    }])
  }), STEPS.UPDATE_LEADS_STATUSES, {
    on: _defineProperty$a({}, EVENTS.PREVIOUS, STEPS.CONFIGURE_CADENCE)
  }), STEPS.STOP_CADENCE, {
    on: _defineProperty$a({}, EVENTS.NEXT, [{
      target: STEPS.CONFIGURE_CADENCE,
      cond: isConfigureNewCadence
    }, {
      actions: STEPS.SCHEDULE_NEXT_STEP,
      cond: isScheduleNextStep
    }, {
      actions: [closeModals],
      cond: isDoAnytingElse
    }])
  }), STEPS.SCHEDULE_NEXT_STEP, {
    on: _defineProperty$a(_defineProperty$a({}, EVENTS.NEXT, [{
      actions: [closeModals]
    }]), EVENTS.PREVIOUS, [{
      target: STEPS.NEXT_STEPS
    }])
  })
});
var css_248z$7 = ".cadenceHeader-module__title__wrapper__oHqFP {\n  margin-top: 20px;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  margin-bottom: 8px;\n}\n\n.cadenceHeader-module__name__wrapper__ubGf6 {\n  display: flex;\n  align-items: center;\n}\n\n.cadenceHeader-module__name__wrapper__ubGf6 > p {\n  margin-right: 8px;\n  flex-shrink: 0;\n}\n\n.cadenceHeader-module__button_wrapper__5Mtoq {\n  margin-left: 8px;\n}\n\n.cadenceHeader-module__button_wrapper__5Mtoq > div {\n  height: 24px;\n}\n\n.cadenceHeader-module__link__UNnL3 {\n  flex-shrink: 1;\n  min-width: 0;\n  display: flex;\n}\n.cadenceHeader-module__filter_wrapper__MkLbc {\n  margin-left: 8px;\n  width: 300px;\n}\n.cadenceHeader-module__filter_wrapper__MkLbc > div > div {\n  max-width: 400px !important;\n}\n.cadenceHeader-module__link__UNnL3 > p {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.cadenceHeader-module__link__UNnL3 > svg {\n  margin-left: 5px;\n  flex-shrink: 0;\n}\n\n.cadenceHeader-module__link__UNnL3:hover {\n  cursor: pointer;\n}\n\n.cadenceHeader-module__link_disabled__O1mti {\n  pointer-events: none;\n  cursor: pointer;\n}\n\n.cadenceHeader-module__status__HS72t {\n  align-self: center;\n  flex-shrink: 0;\n  width: 8px;\n  height: 8px;\n  background-color: var(--softPeanut);\n  margin-right: 8px;\n  border-radius: 8px;\n}\n\n.cadenceHeader-module__status_started__CEM1j {\n  background-color: var(--grape);\n}\n\n.cadenceHeader-module__without_cadence_wrapper__BIauf {\n  width: 385px;\n  text-align: center;\n  margin: 32px auto 0;\n}\n\n.cadenceHeader-module__message_wrapper__VxwaB {\n  margin-bottom: 8px;\n}\n\n.cadenceHeader-module__right_wrapper__R-w6u {\n  color: var(--softPeanut);\n  font-size: 13px;\n  height: 100%;\n  width: content-box;\n  margin: auto 0;\n  flex-shrink: 0;\n}\n\n.cadenceHeader-module__filter_right_wrapper__rlOpR {\n  margin-left: 8px;\n  display: inline-block;\n}\n";
var styles$7 = {
  "_title__wrapper": "cadenceHeader-module__title__wrapper__oHqFP",
  "_name__wrapper": "cadenceHeader-module__name__wrapper__ubGf6",
  "_button_wrapper": "cadenceHeader-module__button_wrapper__5Mtoq",
  "_link": "cadenceHeader-module__link__UNnL3",
  "_filter_wrapper": "cadenceHeader-module__filter_wrapper__MkLbc",
  "_link_disabled": "cadenceHeader-module__link_disabled__O1mti",
  "_status": "cadenceHeader-module__status__HS72t",
  "_status_started": "cadenceHeader-module__status_started__CEM1j",
  "_without_cadence_wrapper": "cadenceHeader-module__without_cadence_wrapper__BIauf",
  "_message_wrapper": "cadenceHeader-module__message_wrapper__VxwaB",
  "_right_wrapper": "cadenceHeader-module__right_wrapper__R-w6u",
  "_filter_right_wrapper": "cadenceHeader-module__filter_right_wrapper__rlOpR"
};
styleInject(css_248z$7);
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
function CurrentCadence(props) {
  _s20();
  var bobject = props.bobject,
    openCadenceControl = props.openCadenceControl,
    activeUserId = props.activeUserId;
  var _useCadenceTable = useCadenceTable(bobject),
    cadence = _useCadenceTable.cadence;
  var _useHasCadenceStarted = useHasCadenceStarted(bobject),
    hasStarted = _useHasCadenceStarted.hasStarted;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'cadence.cadenceTable.header'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs("div", {
    className: styles$7._name__wrapper,
    children: [/*#__PURE__*/jsx(Label, {
      uppercase: false,
      inline: false,
      overrideStyle: {
        padding: '3px 12px',
        letterSpacing: 0
      },
      color: "white",
      icon: "statusCircle",
      iconColor: hasStarted ? 'grape' : 'softPeanut',
      iconSize: 11,
      children: /*#__PURE__*/jsxs("div", {
        className: clsx(styles$7._link, _defineProperty$9({}, styles$7._link_disabled, !hasStarted)),
        onClick: function onClick() {
          return hasStarted && openCadenceControl();
        },
        children: [/*#__PURE__*/jsx(Text, {
          size: "s",
          color: getCadenceNameColor(!!cadence, hasStarted),
          inline: true,
          children: getCadenceName(cadence, t)
        }), hasStarted && /*#__PURE__*/jsx(Icon, {
          name: "settings",
          size: 16
        })]
      })
    }), !hasStarted && /*#__PURE__*/jsx(AutoAssignDropdown, {
      activeUserId: activeUserId,
      activeBobject: bobject,
      callback: function callback() {
        return openCadenceControl(STEPS.CONFIGURE_CADENCE);
      },
      contactBobjects: {
        company: bobject,
        leads: props.leads
      }
    })]
  });
}
_s20(CurrentCadence, "X96qB3X49Jx8x8kiKhiMpSV+OqU=", false, function () {
  return [useCadenceTable, useHasCadenceStarted, useTranslation];
});
_c18 = CurrentCadence;
function getCadenceNameColor(hasCadence, hasStarted) {
  if (!hasCadence) {
    return 'softPeanut';
  }
  return hasStarted ? 'bloobirds' : 'peanut';
}
function getCadenceName(cadence, t) {
  if (!cadence) {
    return t('noCadenceAssigned');
  }
  return (cadence === null || cadence === void 0 ? void 0 : cadence.name) || t('unnamedCadence');
}
var LeadFilter = function LeadFilter(props) {
  _s21();
  var bobjectType = props.bobjectType,
    leads = props.leads;
  var _useContext = useContext(CadenceTableImmutableContext),
    setLeadFilter = _useContext.setLeadFilter;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'cadence.cadenceTable.header'
    }),
    t = _useTranslation.t;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'bobjectTypes'
    }),
    bobjectTypeT = _useTranslation2.t;
  var setFilterValue = function setFilterValue(value) {
    if (value === 'all') {
      setLeadFilter([]);
    } else if (value === 'noLeads') {
      setLeadFilter(null);
    } else {
      setLeadFilter([value]);
    }
  };
  return /*#__PURE__*/jsx("div", {
    className: styles$7._filter_wrapper,
    children: /*#__PURE__*/jsxs(Select, {
      onChange: setFilterValue,
      placeholder: t('placeholder'),
      size: "small",
      defaultValue: 'all',
      variant: "filters",
      width: "275px",
      children: [/*#__PURE__*/jsx(Item, {
        value: "all",
        children: t('allItem', {
          bobjectType: toSentenceCase(bobjectTypeT(bobjectType.toLowerCase()))
        })
      }), /*#__PURE__*/jsx(Item, {
        value: "noLeads",
        children: /*#__PURE__*/jsx("em", {
          children: t('noLeadAssigned')
        })
      }), leads === null || leads === void 0 ? void 0 : leads.map(function (lead) {
        return /*#__PURE__*/jsx(Item, {
          value: lead.id.value,
          children: lead.fullName
        }, "".concat(lead.id.objectId));
      })]
    })
  });
};
_s21(LeadFilter, "mXYoikcoaL2Qab8E5uz4T23g3m0=", false, function () {
  return [useTranslation, useTranslation];
});
_c19 = LeadFilter;
function _typeof$8(obj) {
  "@babel/helpers - typeof";

  return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$8(obj);
}
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
      _defineProperty$8(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) {
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
function CadenceHeader(props) {
  _s22();
  var _props$bobject, _props$bobject2;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'cadence.cadenceTable.header'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs("div", {
    className: styles$7._title__wrapper,
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$7._name__wrapper,
      children: [/*#__PURE__*/jsx(CurrentCadence, _objectSpread$5({}, props)), ((_props$bobject = props.bobject) === null || _props$bobject === void 0 ? void 0 : _props$bobject.id.typeName) !== BobjectTypes.Lead && /*#__PURE__*/jsx(LeadFilter, {
        bobjectType: (_props$bobject2 = props.bobject) === null || _props$bobject2 === void 0 ? void 0 : _props$bobject2.id.typeName,
        leads: props.leads
      })]
    }), /*#__PURE__*/jsxs("div", {
      className: styles$7._right_wrapper,
      children: [t('show'), " :", /*#__PURE__*/jsx(TimeWindowFilter, {}), /*#__PURE__*/jsx(KindFilter, {}), /*#__PURE__*/jsx(TodayButton, {})]
    })]
  });
}
_s22(CadenceHeader, "t/1iBAGEdX8rDM6vi/jYf+ryVbo=", false, function () {
  return [useTranslation];
});
_c20 = CadenceHeader;
var TimeWindowFilter = function TimeWindowFilter() {
  _s23();
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'cadence.cadenceTable.header.timeWindowFilter'
    }),
    t = _useTranslation2.t;
  var _useContext = useContext(CadenceTableContext),
    timeWindow = _useContext.timeWindow;
  var _useContext2 = useContext(CadenceTableImmutableContext),
    setTimeWindow = _useContext2.setTimeWindow;
  return /*#__PURE__*/jsx("div", {
    className: styles$7._filter_right_wrapper,
    children: /*#__PURE__*/jsxs(Select, {
      value: timeWindow,
      onChange: function onChange(value) {
        return setTimeWindow(value);
      },
      placeholder: t('placeholder'),
      size: "small",
      variant: "filters",
      width: "150px",
      children: [/*#__PURE__*/jsx(Item, {
        value: TIME_WINDOW.DAILY,
        children: t('daily')
      }), /*#__PURE__*/jsx(Item, {
        value: TIME_WINDOW.WEEKLY,
        children: t('weekly')
      }), /*#__PURE__*/jsx(Item, {
        value: TIME_WINDOW.MONTHLY,
        children: t('monthly')
      })]
    })
  });
};
_s23(TimeWindowFilter, "eF+q7v8bBTlzTXhvyCp3xC7r/w0=", false, function () {
  return [useTranslation];
});
_c21 = TimeWindowFilter;
var KindFilter = function KindFilter() {
  _s24();
  var _useTranslation3 = useTranslation('translation', {
      keyPrefix: 'cadence.cadenceTable.header.kindFilter'
    }),
    t = _useTranslation3.t;
  var _useContext3 = useContext(CadenceTableImmutableContext),
    setKindFilter = _useContext3.setKindFilter;
  var setFilterValue = function setFilterValue(value) {
    if (value === 'anyKind') {
      setKindFilter(null);
    } else {
      setKindFilter(value);
    }
  };
  return /*#__PURE__*/jsx("div", {
    className: styles$7._filter_right_wrapper,
    children: /*#__PURE__*/jsxs(Select, {
      onChange: setFilterValue,
      placeholder: t('placeholder'),
      size: "small",
      defaultValue: t('anyType')
      //value={kindFilter}
      ,

      variant: "filters",
      width: "120px",
      children: [/*#__PURE__*/jsx(Item, {
        value: "anyKind",
        children: t('anyType')
      }), /*#__PURE__*/jsx(Item, {
        value: "ATTEMPTS",
        children: t('attempts')
      }), /*#__PURE__*/jsx(Item, {
        value: "TOUCHES",
        children: t('touches')
      }), /*#__PURE__*/jsx(Item, {
        value: "INCOMING",
        children: t('incoming')
      }), /*#__PURE__*/jsx(Item, {
        value: "OUTGOING",
        children: t('outgoing')
      }), /*#__PURE__*/jsx(Item, {
        value: "MISSED",
        children: t('missed')
      })]
    })
  });
};
_s24(KindFilter, "ZcXWt/NkEj+nwNDyW8oUiwTtXjE=", false, function () {
  return [useTranslation];
});
_c22 = KindFilter;
var TodayButton = function TodayButton() {
  _s25();
  var _useTranslation4 = useTranslation('translation', {
      keyPrefix: 'cadence.cadenceTable.header'
    }),
    t = _useTranslation4.t;
  var _useContext4 = useContext(CadenceTableImmutableContext),
    setScrollTo = _useContext4.setScrollTo;
  return /*#__PURE__*/jsx("div", {
    className: styles$7._filter_right_wrapper,
    children: /*#__PURE__*/jsx(Button, {
      variant: "tertiary",
      size: "small",
      onClick: function onClick() {
        return setScrollTo('today');
      },
      children: t('today').toUpperCase()
    })
  });
};
_s25(TodayButton, "sKD5xuzVmzRchcIAdsJAW/Oxb8U=", false, function () {
  return [useTranslation];
});
_c23 = TodayButton;
var css_248z$6 = ".timeTable-module_container__DwHfx {\n  border-radius: 4px;\n  border: 1px solid var(--verySoftPeanut);\n  display: flex;\n  background-color: var(--white);\n}\n\n.timeTable-module_table_content__gl2mp {\n  width: calc(100% - 104px);\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n\n.timeTable-module_table_content_center__p4j1t {\n  width: 100%;\n}\n\n.timeTable-module_center_container__xQ-1b {\n  height: 100%;\n  width: 100%;\n  position: relative;\n  overflow: auto;\n  overflow-y: hidden !important;\n  cursor: grab;\n}\n\n.timeTable-module_center_container__xQ-1b:active{\n  cursor: grabbing;\n}\n\n.timeTable-module_center_container__xQ-1b::-webkit-scrollbar {\n  display: none;\n}\n\n.timeTable-module_column__36l-6 {\n  white-space: nowrap;\n  width: 14%;\n}\n\n.timeTable-module_edge_column__lQmzm {\n  max-width: -moz-fit-content;\n  max-width: fit-content;\n}\n\n.timeTable-module_first_column__9CGZW {\n  width: 104px;\n  border-right: 1px solid var(--verySoftPeanut);\n}\n\n.timeTable-module_first_column__9CGZW > .timeTable-module_row__JogZo {\n  justify-content: flex-start;\n}\n\n.timeTable-module_weekendDay__D-Msb {\n  background: repeating-linear-gradient(\n    55deg,\n    var(--white),\n    var(--lightestBloobirds) 1px,\n    var(--lightestBloobirds) 4px,\n    var(--white) 5.2px,\n    var(--white) 10px\n  );\n}\n\n.timeTable-module_row__JogZo {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 6px 8px;\n  border-top: 1px solid var(--verySoftPeanut);\n  height: 20px;\n}\n\n.timeTable-module_row__JogZo:nth-child(1) {\n  border: 0;\n}\n\n.timeTable-module_row__JogZo > button {\n  margin-right: 4px;\n}\n\n.timeTable-module_row__JogZo > button:nth-child(2) {\n  margin-right: 0;\n}\n\n.timeTable-module_weekendDay__D-Msb > .timeTable-module_row__JogZo.timeTable-module__header__IGzpw {\n  background: none;\n}\n\n.timeTable-module_clickable__i0-aL {\n  cursor: pointer;\n}\n\n.timeTable-module_nonClickable__jhShV {\n  cursor: default;\n}\n.timeTable-module_dropdown__yVnTC{\n  display: flex;\n  flex-direction: column;\n  width: 388px;\n  max-height: 195px;\n  box-sizing: border-box;\n  overflow-y: scroll;\n  padding-left: 4px;\n}\n\n.timeTable-module_dropdown_task_icon__Q7VPj{\n  justify-content: center;\n  display: flex;\n  padding-top: 2px;\n}\n\n.timeTable-module_dropdown_content__MOXvp{\n\n  display: flex;\n  box-sizing: border-box;\n  padding: 2px 12px 2px 14px;\n}\n\n.timeTable-module_dropdown_content__MOXvp:hover {\n  background-color: var(--lightestBloobirds);\n}\n\n.timeTable-module_dropdown_task_header__1QQT1 {\n  display: flex;\n  justify-content: space-between;\n}\n.timeTable-module_dropdown_task_body__I4mQQ {\n  display: flex;\n  align-items: center;\n}\n.timeTable-module_dropdown_task_description__8KKLl{\n  margin-left: 4px;\n}\n\n.timeTable-module_dropdown_task_right__izPY1 {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  margin-left: 6px;\n  margin-top: 5px;\n  margin-bottom: 5px;\n  flex: 1 1 0%;\n  min-width: 0px;\n}\n\n.timeTable-module__marker__2ZSt2 {\n  width: 16px;\n  height: 16px;\n  border-radius: 100px;\n  border: 1px dashed var(--softPeanut);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 11px;\n  font-weight: 500;\n  cursor: pointer;\n}\n\n.timeTable-module_scheduledTaskItemWrapper__Pk2HU{\n  transition: all 0.5s ease-out;\n}\n\n.timeTable-module_scheduledTaskItemWrapper__Pk2HU > li {\n  padding-left: 14px;\n  padding-top: 2px;\n  padding-bottom: 2px;\n}\n\n.timeTable-module_scheduledTaskItemWrapper__Pk2HU > li > div:first-child > div:nth-child(2) > div {\n  width: 20px;\n  height: 20px;\n}\n\n.timeTable-module_descriptionContainer__DsL-d {\n  display: flex;\n  gap: 5px;\n  align-items: center;\n}\n\n.timeTable-module_scheduledTask_header__n-ySS {\n  display: flex;\n}\n\n.timeTable-module_dropdown_item_actions__9CC3l {\n  position: relative;\n  box-sizing: border-box;\n  top: -5px;\n  margin-bottom: -30px;\n  right: 0;\n  display: flex;\n  justify-content: right;\n  gap: 4px;\n  padding-right: 48px;\n  padding-top: 6px;\n}\n\n.timeTable-module_dropdown_item_actions__9CC3l > button {\n  width: 24px;\n  height: 20px;\n  padding-left: 3px;\n  padding-right: 0;\n}\n\n.timeTable-module_dropdown_item_actions__9CC3l > button > svg {\n  width: 16px;\n  height: 16px;\n}\n";
var styles$6 = {
  "container": "timeTable-module_container__DwHfx",
  "table_content": "timeTable-module_table_content__gl2mp",
  "table_content_center": "timeTable-module_table_content_center__p4j1t",
  "center_container": "timeTable-module_center_container__xQ-1b",
  "column": "timeTable-module_column__36l-6",
  "edge_column": "timeTable-module_edge_column__lQmzm",
  "first_column": "timeTable-module_first_column__9CGZW",
  "row": "timeTable-module_row__JogZo",
  "weekendDay": "timeTable-module_weekendDay__D-Msb",
  "_header": "timeTable-module__header__IGzpw",
  "clickable": "timeTable-module_clickable__i0-aL",
  "nonClickable": "timeTable-module_nonClickable__jhShV",
  "dropdown": "timeTable-module_dropdown__yVnTC",
  "dropdown_task_icon": "timeTable-module_dropdown_task_icon__Q7VPj",
  "dropdown_content": "timeTable-module_dropdown_content__MOXvp",
  "dropdown_task_header": "timeTable-module_dropdown_task_header__1QQT1",
  "dropdown_task_body": "timeTable-module_dropdown_task_body__I4mQQ",
  "dropdown_task_description": "timeTable-module_dropdown_task_description__8KKLl",
  "dropdown_task_right": "timeTable-module_dropdown_task_right__izPY1",
  "_marker": "timeTable-module__marker__2ZSt2",
  "scheduledTaskItemWrapper": "timeTable-module_scheduledTaskItemWrapper__Pk2HU",
  "descriptionContainer": "timeTable-module_descriptionContainer__DsL-d",
  "scheduledTask_header": "timeTable-module_scheduledTask_header__n-ySS",
  "dropdown_item_actions": "timeTable-module_dropdown_item_actions__9CC3l"
};
styleInject(css_248z$6);
function getDateIndex(timeWindow, date) {
  var ret = date;
  switch (timeWindow) {
    case TIME_WINDOW.DAILY:
      // thursday
      ret = new Date(new Date(date).setDate(date.getDate() - date.getDay() + 4));
      break;
    case TIME_WINDOW.WEEKLY:
      // monday
      ret = new Date(new Date(date).setDate(date.getDate() - date.getDay() + 1));
      break;
    case TIME_WINDOW.MONTHLY:
      // first day of the month
      ret = new Date(date.getFullYear(), date.getMonth(), 1);
      break;
  }
  return format(ret, 'yyyy-MM-dd');
}

// Monthly to Weekly
function getCenterFromFirstDate(date) {
  var d = new Date(date);
  return format(new Date(d.setDate(d.getDate() + 20 - d.getDay() + 4)), 'yyyy-MM-dd');
}
var offset = 7;
function getColumns(timeWindow, minDate, maxDate) {
  var min = new Date(minDate);
  var max = new Date(maxDate);
  switch (timeWindow) {
    case TIME_WINDOW.DAILY:
      {
        var ret = [];
        min.setDate(min.getDate() - offset);
        max.setDate(max.getDate() + offset - max.getDay() + 1);
        for (var date = min; date < max; date.setDate(date.getDate() + 1)) {
          ret.push(format(date, 'yyyy-MM-dd'));
        }
        return ret;
      }
    case TIME_WINDOW.WEEKLY:
      {
        var minWeek = new Date(min.setDate(min.getDate() - min.getDay() - 6));
        var maxWeek = new Date(max.setDate(max.getDate() - max.getDay() + 15));
        var _ret = [];
        for (var _date = minWeek; _date <= maxWeek; _date.setDate(_date.getDate() + 7)) {
          _ret.push(format(_date, 'yyyy-MM-dd'));
        }
        return _ret;
      }
    case TIME_WINDOW.MONTHLY:
      {
        var minFirstOfMonth = new Date(min.getFullYear(), min.getMonth(), 1);
        var maxFirstOfMonth = new Date(max.getFullYear(), max.getMonth(), 1);
        var _ret2 = [];
        for (var _date2 = new Date(new Date(minFirstOfMonth).setMonth(minFirstOfMonth.getMonth() - 2)); _date2 < new Date(new Date(maxFirstOfMonth).setMonth(maxFirstOfMonth.getMonth() + 4)); _date2.setMonth(_date2.getMonth() + 1)) {
          _ret2.push(format(_date2, 'yyyy-MM-dd'));
        }
        return _ret2;
      }
  }
}
function getDateList(timeWindow) {
  var minDate = '2017-01-01';
  var maxDate = format(new Date().setFullYear(new Date().getFullYear() + 1), 'yyyy-MM-dd');
  return getColumns(timeWindow, minDate, maxDate);
}
var cadenceTasksDisplay = {
  call: {
    label: 'Call',
    plural: 'Calls',
    tooltip: 'call',
    key: 'call',
    icon: 'phone',
    color: 'extraCall'
  },
  email: {
    label: 'Email',
    plural: 'Emails',
    tooltip: 'email',
    key: 'email',
    icon: 'mail',
    color: 'tangerine'
  },
  autoEmail: {
    label: 'Auto-Mail',
    plural: 'Auto Emails',
    key: 'auto-mail',
    tooltip: 'auto email',
    icon: 'autoMail',
    color: 'tangerine'
  },
  linkedIn: {
    label: 'LinkedIn',
    plural: 'LinkedIn',
    key: 'linkedin',
    tooltip: 'linkedin message',
    icon: 'linkedin',
    color: 'darkBloobirds'
  },
  customTask: {
    label: 'Task',
    plural: 'Tasks',
    key: 'task',
    tooltip: 'task',
    icon: 'taskAction',
    color: 'bloobirds'
  },
  meeting: {
    label: 'Meeting',
    plural: 'Meetings',
    key: 'meeting',
    tooltip: 'meeting',
    icon: 'calendar',
    color: 'tomato'
  },
  inbound: {
    label: 'Inbound',
    plural: 'Inbounds',
    tooltip: 'inbound',
    key: 'inbound',
    icon: 'arrowDownRight',
    color: 'banana'
  },
  statusChange: {
    label: 'C. Status',
    plural: 'C. Status',
    key: 'statusChange',
    tooltip: 'status change',
    icon: 'company',
    color: 'peanut'
  }
};
function _typeof$7(obj) {
  "@babel/helpers - typeof";

  return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$7(obj);
}
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
      _defineProperty$7(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) {
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
function _slicedToArray$6(arr, i) {
  return _arrayWithHoles$6(arr) || _iterableToArrayLimit$6(arr, i) || _unsupportedIterableToArray$6(arr, i) || _nonIterableRest$6();
}
function _nonIterableRest$6() {
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
var scheduledTaskFromNormalTask = function scheduledTaskFromNormalTask(task, action) {
  var _getFieldByLogicRole, _getFieldByLogicRole2, _getFieldByLogicRole3;
  var iconColor;
  switch (action) {
    case CadenceType.call:
      iconColor = {
        icon: 'phone',
        color: 'extraCall'
      };
      break;
    case CadenceType.email:
      iconColor = {
        icon: 'mail',
        color: 'tangerine'
      };
      break;
    case CadenceType.autoEmail:
      iconColor = {
        icon: 'autoMail',
        color: 'tangerine'
      };
      break;
    case CadenceType.linkedIn:
      iconColor = {
        icon: 'linkedin',
        color: 'darkBloobirds'
      };
      break;
    case CadenceType.customTask:
      iconColor = {
        icon: 'checkDouble',
        color: 'bloobirds'
      };
      break;
    default:
      iconColor = {
        icon: getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_ICON).value,
        color: 'peanut'
      };
      break;
  }
  var scheduledDate = (_getFieldByLogicRole = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.value;
  return {
    id: task.id.value,
    icon: iconColor.icon,
    color: iconColor.color,
    taskName: (_getFieldByLogicRole2 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TITLE)) === null || _getFieldByLogicRole2 === void 0 ? void 0 : _getFieldByLogicRole2.value,
    taskDescription: (_getFieldByLogicRole3 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION)) === null || _getFieldByLogicRole3 === void 0 ? void 0 : _getFieldByLogicRole3.value,
    lead: getReferencedBobjectFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD),
    date: new Date(scheduledDate)
  };
};
var scheduledTaskFromCustomTask = function scheduledTaskFromCustomTask(task) {
  _s26();
  var _getFieldByLogicRole5, _getFieldByLogicRole6;
  var _useCustomTasks = useCustomTasks({
      disabled: true
    }),
    customTasks = _useCustomTasks.customTasks;
  var customTask = customTasks === null || customTasks === void 0 ? void 0 : customTasks.find(function (ct) {
    var _getFieldByLogicRole4;
    return ct.id === ((_getFieldByLogicRole4 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK)) === null || _getFieldByLogicRole4 === void 0 ? void 0 : _getFieldByLogicRole4.value);
  });
  if (!customTask) {
    // For load a task that was created with a manual task but is not a custom task
    return scheduledTaskFromNormalTask(task, CadenceType.customTask);
  }
  var description = (_getFieldByLogicRole5 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION)) === null || _getFieldByLogicRole5 === void 0 ? void 0 : _getFieldByLogicRole5.value;
  var scheduledDate = (_getFieldByLogicRole6 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATE)) === null || _getFieldByLogicRole6 === void 0 ? void 0 : _getFieldByLogicRole6.value;
  var lead = task.referencedBobjects[TASK_FIELDS_LOGIC_ROLE.LEAD];
  return {
    id: task.id.value,
    icon: customTask.icon,
    color: customTask.iconColor,
    taskName: customTask.name,
    taskDescription: description || (customTask === null || customTask === void 0 ? void 0 : customTask.description),
    lead: lead,
    date: new Date(scheduledDate)
  };
};
_s26(scheduledTaskFromCustomTask, "r2TXgL4pPrDFBWLExm27QUYa+bs=", false, function () {
  return [useCustomTasks];
});
var ScheduledTaskItem = function ScheduledTaskItem(scheduledTask) {
  _s27();
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'cadence.cadenceTable.timetable.column'
    }),
    t = _useTranslation.t;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'dates'
    }),
    datesT = _useTranslation2.t;
  var isDifferentYear = isDifferentYearThanCurrent(scheduledTask.date);
  var isThisDay = isToday(scheduledTask.date);
  var nonTranslatedTime = useGetI18nSpacetime(new Date(scheduledTask.date)).format(isDifferentYear ? datesT('shortYear') : datesT('shortMonth'));
  var timeToShow = isThisDay ? t('today') : nonTranslatedTime;
  return /*#__PURE__*/jsx("div", {
    className: styles$6.scheduledTaskItemWrapper,
    children: /*#__PURE__*/jsx(TimelineItem, {
      size: "small",
      backgroundColor: "lightestBloobirds",
      data: {
        icon: /*#__PURE__*/jsx(Icon, {
          name: scheduledTask.icon,
          color: scheduledTask.color,
          size: 14
        }),
        color: scheduledTask.color,
        // @ts-ignore
        description: /*#__PURE__*/jsxs("div", {
          className: styles$6.descriptionContainer,
          children: [scheduledTask.lead && /*#__PURE__*/jsx(BobjectName, {
            activityBobjectName: getTextFromLogicRole(scheduledTask.lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
            ellipsis: "80%"
          }), /*#__PURE__*/jsx(Text, {
            size: "xxs",
            color: "softPeanut",
            inline: true,
            children: scheduledTask.taskDescription
          })]
        }),
        iconColor: scheduledTask.color,
        date: timeToShow,
        dashedBorder: true
      },
      activeHover: true,
      children: /*#__PURE__*/jsx("div", {
        className: styles$6.scheduledTask_header,
        children: /*#__PURE__*/jsx(Text, {
          size: "xs",
          children: scheduledTask === null || scheduledTask === void 0 ? void 0 : scheduledTask.taskName
        })
      })
    })
  });
};
_s27(ScheduledTaskItem, "tfU4FQ1M8APXfiHe5c+uDpiDxaM=", false, function () {
  return [useTranslation, useTranslation, useGetI18nSpacetime];
});
_c24 = ScheduledTaskItem;
var CompletedActivityItem = function CompletedActivityItem(_ref) {
  _s28();
  var activity = _ref.activity,
    dataModel = _ref.dataModel,
    closeDropdown = _ref.closeDropdown,
    date = _ref.date;
  var _useHover = useHover(),
    _useHover2 = _slicedToArray$6(_useHover, 2),
    ref = _useHover2[0],
    hovering = _useHover2[1];
  var _useContext = useContext(CadenceTableImmutableContext),
    onClickActivityExternal = _useContext.onClickActivityExternal,
    onClickActivityView = _useContext.onClickActivityView,
    onClickActivityEdit = _useContext.onClickActivityEdit,
    hideActivityHover = _useContext.hideActivityHover;
  var _useContext2 = useContext(CadenceTableContext),
    timeWindow = _useContext2.timeWindow;
  var _useCustomTasks2 = useCustomTasks({
      disabled: false
    }),
    customTasks = _useCustomTasks2.customTasks;
  var _useQuickLogActivity = useQuickLogActivity(),
    openQuickLogModal = _useQuickLogActivity.openQuickLogModal;
  var isStatusActivity = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE).text === 'Status';
  var activityCustomTask = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  var customTask = customTasks === null || customTasks === void 0 ? void 0 : customTasks.find(function (ct) {
    return ct.id === activityCustomTask;
  });
  var activityCompany = getReferencedBobjectFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY);
  return /*#__PURE__*/jsxs("div", {
    ref: ref,
    style: {
      maxHeight: 48,
      cursor: 'pointer'
    },
    onClick: function onClick() {
      return onClickActivityView(activity, timeWindow, date);
    },
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$6.dropdown_item_actions,
      style: {
        visibility: hovering && !hideActivityHover ? 'visible' : 'hidden'
      },
      children: [onClickActivityEdit && !isStatusActivity && /*#__PURE__*/jsx(Button, {
        iconLeft: "edit",
        size: "small",
        variant: "secondary",
        onClick: function onClick() {
          closeDropdown();
          if (customTask) {
            //TODO check this
            openQuickLogModal({
              customTask: customTask,
              leads: [],
              selectedBobject: getReferencedBobject(activity),
              companyId: activityCompany === null || activityCompany === void 0 ? void 0 : activityCompany.id.value,
              onSubmit: function onSubmit() {
                window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                  detail: {
                    type: BobjectTypes.Activity
                  }
                }));
              },
              isEdition: true,
              activity: activity
            });
          } else {
            onClickActivityEdit(activity);
          }
        }
      }), onClickActivityExternal && /*#__PURE__*/jsx(Button, {
        iconLeft: "externalLink",
        size: "small",
        variant: "secondary",
        onClick: function onClick() {
          closeDropdown();
          onClickActivityExternal(activity);
        }
      }), onClickActivityView && /*#__PURE__*/jsx(Button, {
        iconLeft: "eye",
        size: "small",
        variant: "secondary",
        onClick: function onClick() {
          closeDropdown();
          onClickActivityView(activity, timeWindow, date);
        }
      })]
    }), /*#__PURE__*/jsx(ActivityTimelineItem, {
      activity: activity,
      startDisplayDivider: false,
      endDisplayDivider: false,
      dataModel: dataModel,
      disableButtons: true,
      hovering: hovering,
      customTasks: customTasks
    })]
  });
};
_s28(CompletedActivityItem, "9fFOnYN4FBxN7ppbHzz7kOJR7BQ=", false, function () {
  return [useHover, useCustomTasks, useQuickLogActivity];
});
_c25 = CompletedActivityItem;
var BadgeDropdownContent = function BadgeDropdownContent(_ref2) {
  _s29();
  var dayTasks = _ref2.dayTasks,
    cadenceAction = _ref2.cadenceAction,
    closeDropdown = _ref2.closeDropdown,
    date = _ref2.date;
  var actions = dayTasks[cadenceAction];
  var isCustomTask = cadenceAction === 'customTask';
  var dataModel = useDataModel();
  return /*#__PURE__*/jsxs("div", {
    className: styles$6.dropdown,
    children: [isCustomTask ? actions.tasks.filter(function (task) {
      var _getFieldByLogicRole7;
      var customTask = (_getFieldByLogicRole7 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK)) === null || _getFieldByLogicRole7 === void 0 ? void 0 : _getFieldByLogicRole7.value;
      var hasActivity = actions.activities.find(function (activity) {
        var _getFieldByLogicRole8;
        return ((_getFieldByLogicRole8 = getFieldByLogicRole(activity.formBobject, ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK)) === null || _getFieldByLogicRole8 === void 0 ? void 0 : _getFieldByLogicRole8.value) === customTask;
      });
      return !hasActivity;
    }).map(function (task) {
      return /*#__PURE__*/jsx(ScheduledTaskItem, _objectSpread$4({}, scheduledTaskFromCustomTask(injectReferenceFields(task))), task.id.value);
    }) : actions.tasks.slice(0, actions.tasks.length - actions.activities.length).map(function (task) {
      return /*#__PURE__*/jsx(ScheduledTaskItem, _objectSpread$4({}, scheduledTaskFromNormalTask(injectReferenceFields(task), cadenceAction)), task.id.value);
    }), dataModel && actions.activities.map(function (activity) {
      return /*#__PURE__*/jsx(CompletedActivityItem, {
        activity: injectReferenceFields(activity.formBobject),
        dataModel: dataModel,
        closeDropdown: closeDropdown,
        date: date
      }, activity.id.value);
    })]
  });
};
_s29(BadgeDropdownContent, "8XDAeuH15vQZAWJRI6U9L0isc2w=", false, function () {
  return [useDataModel];
});
_c26 = BadgeDropdownContent;
var BadgeDropdown = function BadgeDropdown(_ref) {
  _s30();
  var dayTasks = _ref.dayTasks,
    cadenceAction = _ref.cadenceAction,
    timeWindow = _ref.timeWindow,
    date = _ref.date;
  var actionDisplayProps = cadenceTasksDisplay[cadenceAction];
  var numOfActivities = dayTasks[cadenceAction].numOfActivities;
  var numOfTasks = dayTasks[cadenceAction].numOfTasks;
  var numBounced = (cadenceAction === 'autoEmail' || cadenceAction === 'email') && dayTasks[cadenceAction].activities.filter(function (activity) {
    return activity.bounced;
  }).length;
  var isBounced = numBounced > 0;
  var _useVisible = useVisible(false),
    ref = _useVisible.ref,
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  useClickAway(ref, function () {
    return setVisible(false);
  });
  return /*#__PURE__*/jsx(Dropdown, {
    ref: ref,
    visible: visible,
    position: "bottom",
    onClose: function onClose() {
      return setVisible(false);
    },
    anchor: /*#__PURE__*/jsx("div", {
      className: styles$6.clickable,
      onClick: function onClick() {
        return setVisible(!visible);
      },
      children: /*#__PURE__*/jsx(CounterBadge, {
        done: numOfActivities,
        total: numOfTasks,
        size: 'l',
        "short": timeWindow === TIME_WINDOW.DAILY,
        color: actionDisplayProps.color,
        error: isBounced
      })
    }),
    children: /*#__PURE__*/jsx(BadgeDropdownContent, {
      date: date,
      dayTasks: dayTasks,
      cadenceAction: cadenceAction,
      closeDropdown: function closeDropdown() {
        return setVisible(false);
      }
    })
  });
};
_s30(BadgeDropdown, "CqnSrWbU9N8kO2doXLqObXcKGtw=", false, function () {
  return [useVisible, useClickAway];
});
_c27 = BadgeDropdown;
function _typeof$6(obj) {
  "@babel/helpers - typeof";

  return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$6(obj);
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
var ColumnHeader = function ColumnHeader(_ref) {
  _s31();
  var date = _ref.date,
    timeWindow = _ref.timeWindow,
    isPausedDay = _ref.isPausedDay,
    setTimeWindowWithDate = _ref.setTimeWindowWithDate;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'cadence.cadenceTable.timetable.column'
    }),
    t = _useTranslation.t;
  var isDailyWindow = timeWindow === TIME_WINDOW.DAILY;
  var userTimezone = getUserTimeZone();
  var _useTranslation2 = useTranslation(),
    language = _useTranslation2.i18n.language;
  var handleClick = function handleClick() {
    var newTimeWindow = timeWindow === TIME_WINDOW.MONTHLY ? TIME_WINDOW.WEEKLY : TIME_WINDOW.DAILY;
    setTimeWindowWithDate(newTimeWindow, date);
  };
  var isCurrentDate = useMemo(function () {
    switch (timeWindow) {
      case TIME_WINDOW.DAILY:
        return isToday(parseUTCDateToLocal(date));
      case TIME_WINDOW.WEEKLY:
        return isThisWeek(parseUTCDateToLocal(date), {
          weekStartsOn: 1
        });
      case TIME_WINDOW.MONTHLY:
        return isThisMonth(parseUTCDateToLocal(date));
    }
  }, [timeWindow, date]);
  var title = useMemo(function () {
    switch (timeWindow) {
      case TIME_WINDOW.DAILY:
        return isCurrentDate ? t('today') : getI18nSpacetimeLng(language, parseUTCDateToLocal(date, userTimezone)).format('{month-short} {date-pad}');
      case TIME_WINDOW.WEEKLY:
        {
          var startOfWeek = new Date(date);
          var endOfWeek = new Date().setDate(startOfWeek.getDate() + 6);
          return getI18nSpacetimeLng(language, startOfWeek).format('LLL dd') + ' - ' + getI18nSpacetimeLng(language, endOfWeek).format('dd');
        }
      case TIME_WINDOW.MONTHLY:
        return getI18nSpacetimeLng(language, new Date(date)).format('MMM yyyy');
    }
  }, [timeWindow, date]);
  var tooltipText = useMemo(function () {
    switch (timeWindow) {
      case TIME_WINDOW.DAILY:
        return getI18nSpacetimeLng(language, parseUTCDateToLocal(date, userTimezone)).format('{month-short} {date-pad} {year}');
      case TIME_WINDOW.WEEKLY:
        return title + ' ' + getI18nSpacetimeLng(language, new Date(date)).format('yyyy');
      case TIME_WINDOW.MONTHLY:
        return title;
    }
  }, [timeWindow, date]);
  return /*#__PURE__*/jsx("div", {
    className: clsx(styles$6.row, _defineProperty$6(_defineProperty$6({}, styles$6.nonClickable, isDailyWindow), styles$6.clickable, !isDailyWindow)),
    onClick: function onClick() {
      return isDailyWindow ? undefined : handleClick();
    },
    children: /*#__PURE__*/jsxs(Tooltip, {
      position: "top",
      title: tooltipText,
      children: [/*#__PURE__*/jsx(Text, {
        size: "xs",
        weight: isCurrentDate ? 'bold' : 'regular',
        color: isCurrentDate ? 'bloobirds' : 'softPeanut',
        children: title
      }), isPausedDay && /*#__PURE__*/jsx(Icon, {
        name: "pause",
        color: "verySoftBanana",
        size: 20
      })]
    })
  });
};
_s31(ColumnHeader, "ksmovzslY20jTXPwLoErnDhuKJg=", false, function () {
  return [useTranslation, useTranslation];
});
_c28 = ColumnHeader;
function _typeof$5(obj) {
  "@babel/helpers - typeof";

  return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$5(obj);
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
var Column = /*#__PURE__*/React.memo(_c29 = function (props) {
  var dayTasks = props.dayTasks,
    virtualColumn = props.virtualColumn,
    date = props.date,
    timeWindow = props.timeWindow,
    isPausedDay = props.isPausedDay,
    setTimeWindowWithDate = props.setTimeWindowWithDate;
  var classnames = clsx(styles$6.row, _defineProperty$5({}, styles$6.weekendDay, timeWindow === TIME_WINDOW.DAILY && isWeekend(parseUTCDateToLocal(date))));
  return /*#__PURE__*/jsxs("div", {
    className: styles$6.column,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: "".concat(virtualColumn.size, "px"),
      transform: "translateX(".concat(virtualColumn.start, "px)")
    },
    children: [/*#__PURE__*/jsx(ColumnHeader, {
      date: date,
      timeWindow: timeWindow,
      isPausedDay: isPausedDay,
      setTimeWindowWithDate: setTimeWindowWithDate
    }), cadenceTypesList === null || cadenceTypesList === void 0 ? void 0 : cadenceTypesList.map(function (cadenceAction) {
      if (!dayTasks || !dayTasks[cadenceAction]) {
        return /*#__PURE__*/jsx("div", {
          className: classnames
        }, "empty-row-".concat(cadenceAction));
      }
      return /*#__PURE__*/jsx("div", {
        className: classnames,
        children: /*#__PURE__*/jsx(BadgeDropdown, {
          dayTasks: dayTasks,
          cadenceAction: cadenceAction,
          timeWindow: timeWindow,
          date: date
        })
      }, "row-".concat(cadenceAction));
    })]
  });
});
_c30 = Column;
function _slicedToArray$5(arr, i) {
  return _arrayWithHoles$5(arr) || _iterableToArrayLimit$5(arr, i) || _unsupportedIterableToArray$5(arr, i) || _nonIterableRest$5();
}
function _nonIterableRest$5() {
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
var NUM_OF_RENDERED_COLUMNS = 7;
var CenterContent = function CenterContent(_ref) {
  _s32();
  var response = _ref.response,
    bobject = _ref.bobject;
  var _useContext = useContext(CadenceTableImmutableContext),
    setIsFullFunctional = _useContext.setIsFullFunctional;
  var _useState = useState(),
    _useState2 = _slicedToArray$5(_useState, 2),
    columnSize = _useState2[0],
    setColumnSize = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$5(_useState3, 2),
    firstScroll = _useState4[0],
    setFirstScroll = _useState4[1];
  var parentRef = useRef();
  var _useState5 = useState(false),
    _useState6 = _slicedToArray$5(_useState5, 2),
    mouseDown = _useState6[0],
    setMouseDown = _useState6[1];

  // @ts-ignore
  if (parentRef && parentRef.current && parentRef.current.clientWidth && !columnSize) {
    setColumnSize(function (columnSize) {
      return columnSize ? columnSize :
      // @ts-ignore
      Math.floor(parentRef.current.clientWidth / NUM_OF_RENDERED_COLUMNS) + 1;
    });
  }
  var setFullContent = function setFullContent() {
    if (firstScroll) {
      setIsFullFunctional(function (isFunctional) {
        return isFunctional ? isFunctional : true;
      });
    } else {
      setFirstScroll(true);
    }
  };
  var startDragging = function startDragging(e) {
    // @ts-ignore
    if (parentRef && parentRef.current) {
      setMouseDown(true);
      // @ts-ignore
      parentRef.current.startX = e.pageX - parentRef.current.offsetLeft;
      // @ts-ignore
      parentRef.current.currentScrollLeft = parentRef.current.scrollLeft;
    }
  };
  var dragging = function dragging(e) {
    e.preventDefault();
    if (parentRef && parentRef.current) {
      if (!mouseDown) {
        return;
      }
      // @ts-ignore
      var x = e.pageX - parentRef.current.offsetLeft;
      // @ts-ignore
      var scroll = x - parentRef.current.startX;
      // @ts-ignore
      parentRef.current.scrollLeft = parentRef.current.currentScrollLeft - scroll;
    }
  };
  var stopDragging = function stopDragging() {
    if (parentRef && parentRef.current) {
      setMouseDown(false);
    }
  };
  var _usePausePeriods = usePausePeriods({
      userId: bobject.assignedTo
    }),
    periods = _usePausePeriods.periods;
  var pausedCadenceDays = periods === null || periods === void 0 ? void 0 : periods.uniqueDates;
  return /*#__PURE__*/jsx("div", {
    className: styles$6.center_container,
    ref: parentRef,
    onScroll: setFullContent,
    onMouseDown: startDragging,
    onMouseLeave: stopDragging,
    onMouseUp: stopDragging,
    onMouseMove: dragging,
    children: columnSize && /*#__PURE__*/
    // Columns is a different component because we need to wait for the div to render to get its width and pass it to the virtualizer
    jsx(Columns, {
      response: response,
      pausedCadenceDays: pausedCadenceDays,
      parentRef: parentRef,
      columnSize: columnSize
    })
  });
};
_s32(CenterContent, "LKuGWP+bBQ/Oyeuvl6iQE9FtDnk=", false, function () {
  return [usePausePeriods];
});
_c31 = CenterContent;
var Columns = function Columns(props) {
  _s33();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  var response = props.response,
    pausedCadenceDays = props.pausedCadenceDays,
    parentRef = props.parentRef;
  props.columnSize;
  var _ref2 = response !== null && response !== void 0 ? response : cadenceResponseDefault,
    tasks = _ref2.tasks,
    firstTaskDate = _ref2.firstTaskDate,
    firstActivityDate = _ref2.firstActivityDate,
    lastTaskDate = _ref2.lastTaskDate,
    lastActivityDate = _ref2.lastActivityDate;
  var _useContext2 = useContext(CadenceTableContext),
    timeWindow = _useContext2.timeWindow,
    scrollTo = _useContext2.scrollTo;
  var _useContext3 = useContext(CadenceTableImmutableContext),
    setTimeWindow = _useContext3.setTimeWindow,
    setScrollTo = _useContext3.setScrollTo,
    isLeftPageDisabled = _useContext3.isLeftPageDisabled,
    isRightPageDisabled = _useContext3.isRightPageDisabled;
  var _useState7 = useState(),
    _useState8 = _slicedToArray$5(_useState7, 2),
    currentDate = _useState8[0],
    setCurrentDate = _useState8[1];
  var _useState9 = useState(),
    _useState10 = _slicedToArray$5(_useState9, 2),
    dateList = _useState10[0],
    setDateList = _useState10[1];
  var rangeRef = useRef(null);

  //const scrollAlign = timeWindow === TIME_WINDOW.DAILY ? 'start' : 'center';

  // TODO: To change to v3 when it's released
  var columnVirtualizer = useVirtual({
    horizontal: true,
    size: (dateList === null || dateList === void 0 ? void 0 : dateList.length) || 0,
    parentRef: parentRef,
    estimateSize: useCallback(function () {
      return 110;
    },
    //(columnSize > 80 ? (columnSize < 110 ? columnSize : 110) : 80),
    []),
    rangeExtractor: useCallback(function (range) {
      rangeRef.current = range;
      return defaultRangeExtractor(range);
    }, []),
    overscan: 2
  });
  useEffect(function () {
    setDateList(getDateList(timeWindow));
  }, [timeWindow, currentDate]);
  useEffect(function () {
    scrollToDate(currentDate);
  }, [dateList]);
  var setTimeWindowWithDate = function setTimeWindowWithDate(timeWindow, date) {
    if (timeWindow === TIME_WINDOW.WEEKLY) {
      setCurrentDate(getCenterFromFirstDate(date));
    } else {
      setCurrentDate(date);
    }
    setTimeWindow(timeWindow);
  };
  var scrollToDate = function scrollToDate(date) {
    if (dateList) {
      var dateToScrollTo = getDateIndex(timeWindow, date ? new Date(date) : new Date());
      var dateIndex = dateList.findIndex(function (item) {
        return item === dateToScrollTo;
      });
      if (dateIndex !== -1) {
        columnVirtualizer.scrollToIndex(dateIndex, {
          align: 'center'
        });
      }
    }
  };
  useEffect(function () {
    switch (scrollTo) {
      case 'today':
        scrollToDate();
        break;
      case 'pageBack':
        {
          var start = rangeRef.current.start;
          var isFirstPage = start - 2 <= 0;
          scrollToDate(dateList[isFirstPage ? 0 : start - 2]);
          if (isRightPageDisabled.current === true) {
            isRightPageDisabled.current = false;
          }
          if (isLeftPageDisabled.current === false) {
            isLeftPageDisabled.current = isFirstPage;
          }
          break;
        }
      case 'pageForward':
        {
          var end = rangeRef.current.end;
          var isLastPage = end + 1 > (dateList === null || dateList === void 0 ? void 0 : dateList.length) - 1;
          scrollToDate(dateList[isLastPage ? (dateList === null || dateList === void 0 ? void 0 : dateList.length) - 1 : end + 1]);
          if (isLeftPageDisabled.current === true) {
            isLeftPageDisabled.current = false;
          }
          if (isRightPageDisabled.current === false) {
            isRightPageDisabled.current = isLastPage;
          }
          break;
        }
      case 'firstTask':
        {
          scrollToDate(firstTaskDate);
          break;
        }
      case 'lastTask':
        {
          scrollToDate(lastTaskDate);
          break;
        }
      case 'firstActivity':
        {
          scrollToDate(firstActivityDate);
          break;
        }
      case 'lastActivity':
        {
          scrollToDate(lastActivityDate);
          break;
        }
    }
    if (scrollTo) {
      setScrollTo('');
    }
  }, [scrollTo]);
  return /*#__PURE__*/jsx("div", {
    style: {
      width: "".concat(columnVirtualizer.totalSize, "px"),
      position: 'relative'
    },
    children: columnVirtualizer.virtualItems.map(function (virtualColumn) {
      var date = dateList[virtualColumn.index];
      return /*#__PURE__*/jsx(Column, {
        dayTasks: tasks && tasks[date],
        timeWindow: timeWindow,
        virtualColumn: virtualColumn,
        date: date,
        setTimeWindowWithDate: setTimeWindowWithDate,
        isPausedDay: pausedCadenceDays === null || pausedCadenceDays === void 0 ? void 0 : pausedCadenceDays.has(date)
      }, virtualColumn.index);
    })
  });
};
_s33(Columns, "2x38KHy/b0IPVnDUSUPPzM7ZPPk=", false, function () {
  return [useVirtual];
});
_c32 = Columns;
var FirstColumnComponent = function FirstColumnComponent() {
  _s34();
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'cadence.cadenceTable.timetable.components'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs("div", {
    className: clsx(styles$6.column, styles$6.first_column),
    children: [/*#__PURE__*/jsx("div", {
      className: styles$6.row
    }), cadenceTypesList === null || cadenceTypesList === void 0 ? void 0 : cadenceTypesList.map(function (cadenceAction) {
      var actionDisplayProps = cadenceTasksDisplay[cadenceAction];
      return /*#__PURE__*/jsxs("div", {
        className: styles$6.row,
        children: [/*#__PURE__*/jsx(Icon, {
          name: actionDisplayProps.icon,
          color: actionDisplayProps.color
        }), /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "softPeanut",
          uppercase: true,
          children: t(actionDisplayProps.key)
        })]
      }, cadenceAction);
    })]
  });
};
_s34(FirstColumnComponent, "t/1iBAGEdX8rDM6vi/jYf+ryVbo=", false, function () {
  return [useTranslation];
});
_c33 = FirstColumnComponent;
var FirstColumn = /*#__PURE__*/React.memo(FirstColumnComponent);
_c34 = FirstColumn;
var LeftArrowAndFlag = function LeftArrowAndFlag() {
  _s35();
  var _useContext = useContext(CadenceTableImmutableContext),
    setScrollTo = _useContext.setScrollTo,
    isLeftPageDisabled = _useContext.isLeftPageDisabled;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'cadence.cadenceTable.timetable.components'
    }),
    t = _useTranslation2.t;
  return /*#__PURE__*/jsxs("div", {
    className: styles$6.edge_column,
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$6.row,
      children: [/*#__PURE__*/jsx(Tooltip, {
        position: "top",
        title: t('firstActivity'),
        children: /*#__PURE__*/jsx(IconButton, {
          name: "chevronFirst",
          color: "darkBloobirds",
          size: 16,
          onClick: function onClick() {
            return setScrollTo('firstActivity');
          }
        })
      }), /*#__PURE__*/jsx(IconButton, {
        name: "chevronLeft",
        color: "darkBloobirds",
        size: 16,
        onClick: function onClick() {
          return setScrollTo('pageBack');
        },
        disabled: isLeftPageDisabled.current
      }), /*#__PURE__*/jsx(Tooltip, {
        position: "top",
        title: t('firstCadenceDay'),
        children: /*#__PURE__*/jsx(IconButton, {
          name: "flag",
          size: 16,
          color: "darkBloobirds",
          onClick: function onClick() {
            return setScrollTo('firstTask');
          }
        })
      })]
    }), cadenceTypesList === null || cadenceTypesList === void 0 ? void 0 : cadenceTypesList.map(function (cadenceAction) {
      return /*#__PURE__*/jsx("div", {
        className: styles$6.row
      }, "empty-row-".concat(cadenceAction));
    })]
  });
};
_s35(LeftArrowAndFlag, "c/8ly1AKNhk9KkXhbGdp+d4kGog=", false, function () {
  return [useTranslation];
});
_c35 = LeftArrowAndFlag;
var RightArrowAndFlag = function RightArrowAndFlag() {
  _s36();
  var _useContext2 = useContext(CadenceTableImmutableContext),
    setScrollTo = _useContext2.setScrollTo,
    isRightPageDisabled = _useContext2.isRightPageDisabled;
  var _useTranslation3 = useTranslation('translation', {
      keyPrefix: 'cadence.cadenceTable.timetable.components'
    }),
    t = _useTranslation3.t;
  return /*#__PURE__*/jsxs("div", {
    className: styles$6.edge_column,
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$6.row,
      children: [/*#__PURE__*/jsx(Tooltip, {
        position: "top",
        title: t('lastCadenceDay'),
        children: /*#__PURE__*/jsx(IconButton, {
          name: "flagFilled",
          size: 16,
          color: "darkBloobirds",
          onClick: function onClick() {
            return setScrollTo('lastTask');
          }
        })
      }), /*#__PURE__*/jsx(IconButton, {
        name: "chevronRight",
        size: 16,
        color: "darkBloobirds",
        onClick: function onClick() {
          return setScrollTo('pageForward');
        },
        disabled: isRightPageDisabled.current
      }), /*#__PURE__*/jsx(Tooltip, {
        position: "top",
        title: t('lastActivity'),
        children: /*#__PURE__*/jsx(IconButton, {
          name: "chevronLast",
          color: "darkBloobirds",
          size: 16,
          onClick: function onClick() {
            return setScrollTo('lastActivity');
          }
        })
      })]
    }), cadenceTypesList === null || cadenceTypesList === void 0 ? void 0 : cadenceTypesList.map(function (type, index) {
      return /*#__PURE__*/jsx("div", {
        className: styles$6.row
      }, "row-column-".concat(index));
    })]
  });
};
_s36(RightArrowAndFlag, "Hnp+rxMdCWTCf59ekvJqnnqGeI0=", false, function () {
  return [useTranslation];
});
_c36 = RightArrowAndFlag;
var TimeTable = function TimeTable(_ref) {
  _s37();
  var _bobject$id;
  var bobject = _ref.bobject;
  var _useContext = useContext(CadenceTableContext),
    timeWindow = _useContext.timeWindow,
    isFullFunctional = _useContext.isFullFunctional,
    leadFilter = _useContext.leadFilter,
    kindFilter = _useContext.kindFilter;
  var _useSWR = useSWR(bobject && ["/bobjects/".concat(bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.objectId, "/cadence"), timeWindow, isFullFunctional, kindFilter, leadFilter], function () {
      var _bobject$id2, _bobject$id3, _bobject$id4;
      return api.post("/bobjects/".concat(bobject === null || bobject === void 0 ? void 0 : (_bobject$id2 = bobject.id) === null || _bobject$id2 === void 0 ? void 0 : _bobject$id2.accountId, "/cadence"), {
        bobjectType: bobject === null || bobject === void 0 ? void 0 : (_bobject$id3 = bobject.id) === null || _bobject$id3 === void 0 ? void 0 : _bobject$id3.typeName,
        bobjectId: bobject === null || bobject === void 0 ? void 0 : (_bobject$id4 = bobject.id) === null || _bobject$id4 === void 0 ? void 0 : _bobject$id4.value,
        timeWindow: timeWindow,
        activityKind: kindFilter,
        startDate: isFullFunctional ? null : format(new Date().setDate(new Date().getDate() - 10), 'yyyy-MM-dd'),
        endDate: isFullFunctional ? null : format(new Date().setDate(new Date().getDate() + 10), 'yyyy-MM-dd'),
        leadIds: leadFilter
      });
    }, {
      use: [keepPreviousResponse]
    }),
    data = _useSWR.data,
    mutate = _useSWR.mutate;
  function wsCallback(wsMessage) {
    var _bobject$id5, _bobject$id6, _bobject$id7, _bobject$relatedBobje;
    // Check if the message relatedCompany, relatedLead or relatedOpportunity is the same as the bobject or some of the relatedBobjects
    // If it is, then mutate the data
    if (!wsMessage || !bobject) return;
    if (wsMessage.operation === 'UPDATE' && Object.keys(wsMessage.changes).length === 0) {
      return;
    }
    if ((wsMessage === null || wsMessage === void 0 ? void 0 : wsMessage.relatedLead) === (bobject === null || bobject === void 0 ? void 0 : (_bobject$id5 = bobject.id) === null || _bobject$id5 === void 0 ? void 0 : _bobject$id5.value) || (wsMessage === null || wsMessage === void 0 ? void 0 : wsMessage.relatedCompany) === (bobject === null || bobject === void 0 ? void 0 : (_bobject$id6 = bobject.id) === null || _bobject$id6 === void 0 ? void 0 : _bobject$id6.value) || (wsMessage === null || wsMessage === void 0 ? void 0 : wsMessage.relatedOpportunity) === (bobject === null || bobject === void 0 ? void 0 : (_bobject$id7 = bobject.id) === null || _bobject$id7 === void 0 ? void 0 : _bobject$id7.value)) {
      mutate();
    }
    if (bobject !== null && bobject !== void 0 && (_bobject$relatedBobje = bobject.relatedBobjectIds) !== null && _bobject$relatedBobje !== void 0 && _bobject$relatedBobje.some(function (relatedBobjectId) {
      return relatedBobjectId === (wsMessage === null || wsMessage === void 0 ? void 0 : wsMessage.relatedLead) || relatedBobjectId === (wsMessage === null || wsMessage === void 0 ? void 0 : wsMessage.relatedCompany) || relatedBobjectId === (wsMessage === null || wsMessage === void 0 ? void 0 : wsMessage.relatedOpportunity);
    })) {
      mutate();
    }
  }
  var debouncedCallback = React.useRef(debounce(wsCallback, 1000, {
    leading: true
  })).current;

  // Generate the subscription to refresh the cadence
  useEventSubscription('data-Task', debouncedCallback);
  useEventSubscription('data-Activity', debouncedCallback);
  useEffect(function () {
    return function () {
      debouncedCallback.cancel();
    };
  }, [debouncedCallback]);
  var response = data === null || data === void 0 ? void 0 : data.data;
  return /*#__PURE__*/(
    //response?.tasks ? (
    jsxs("div", {
      className: styles$6.container,
      "data-test": "Timetable-Container",
      children: [/*#__PURE__*/jsx(FirstColumn, {}), /*#__PURE__*/jsxs("div", {
        className: styles$6.table_content,
        children: [/*#__PURE__*/jsx(LeftArrowAndFlag, {}), /*#__PURE__*/jsx(CenterContent, {
          response: response,
          bobject: bobject
        }), /*#__PURE__*/jsx(RightArrowAndFlag, {})]
      })]
    })
    //) : (
    //<Skeleton width="100%" height={296} variant="rect" />
  );
};
_s37(TimeTable, "70nbDIlW7yURFd8f7FIYMRL7LC4=", false, function () {
  return [useSWR, useEventSubscription, useEventSubscription];
});
_c37 = TimeTable;
function _typeof$4(obj) {
  "@babel/helpers - typeof";

  return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$4(obj);
}
function _slicedToArray$4(arr, i) {
  return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$4();
}
function _nonIterableRest$4() {
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
var defaultProps = {
  activeUserId: '',
  bobject: {
    id: null,
    assignedTo: null,
    cadenceId: null,
    companyId: null,
    targetMarket: null,
    relatedBobjectIds: []
  },
  leads: [],
  openCadenceControl: function openCadenceControl() {},
  withoutHeader: false,
  hideActivityHover: false,
  onClickActivityEdit: undefined,
  onClickActivityView: undefined,
  onClickActivityExternal: undefined
};
var INIT_TIME_WINDOW = TIME_WINDOW.DAILY;
var CadenceTableContext = /*#__PURE__*/createContext(null);
var CadenceTableImmutableContext = /*#__PURE__*/createContext(null);
function CadenceTable(props) {
  _s38();
  var cadenceProps = _objectSpread$3(_objectSpread$3({}, defaultProps), props);
  var _useState = useState(INIT_TIME_WINDOW),
    _useState2 = _slicedToArray$4(_useState, 2),
    timeWindow = _useState2[0],
    setTimeWindow = _useState2[1];
  var _useState3 = useState(),
    _useState4 = _slicedToArray$4(_useState3, 2),
    scrollTo = _useState4[0],
    setScrollTo = _useState4[1];
  var isLeftPageDisabled = useRef(false);
  var isRightPageDisabled = useRef(false);
  var _useState5 = useState(false),
    _useState6 = _slicedToArray$4(_useState5, 2),
    isFullFunctional = _useState6[0],
    setIsFullFunctional = _useState6[1];
  var _useState7 = useState(),
    _useState8 = _slicedToArray$4(_useState7, 2),
    kindFilter = _useState8[0],
    setKindFilter = _useState8[1];
  var _useState9 = useState([]),
    _useState10 = _slicedToArray$4(_useState9, 2),
    leadFilter = _useState10[0],
    setLeadFilter = _useState10[1];
  var getters = useMemo(function () {
    return {
      timeWindow: timeWindow,
      scrollTo: scrollTo,
      isFullFunctional: isFullFunctional,
      kindFilter: kindFilter,
      leadFilter: leadFilter
    };
  }, [timeWindow, scrollTo, isFullFunctional, kindFilter, leadFilter]);
  var immutableValues = useMemo(function () {
    return {
      setTimeWindow: setTimeWindow,
      setScrollTo: setScrollTo,
      setIsFullFunctional: setIsFullFunctional,
      setKindFilter: setKindFilter,
      setLeadFilter: setLeadFilter,
      isLeftPageDisabled: isLeftPageDisabled,
      isRightPageDisabled: isRightPageDisabled,
      hideActivityHover: cadenceProps.hideActivityHover,
      onClickActivityEdit: cadenceProps.onClickActivityEdit,
      onClickActivityView: cadenceProps.onClickActivityView,
      onClickActivityExternal: cadenceProps.onClickActivityExternal
    };
  }, []);
  return /*#__PURE__*/jsx("div", {
    onClick: function onClick() {
      return setIsFullFunctional(true);
    },
    children: /*#__PURE__*/jsx(CadenceTableImmutableContext.Provider, {
      value: immutableValues,
      children: /*#__PURE__*/jsxs(CadenceTableContext.Provider, {
        value: getters,
        children: [!(cadenceProps !== null && cadenceProps !== void 0 && cadenceProps.withoutHeader) && /*#__PURE__*/jsx(CadenceHeader, _objectSpread$3({}, cadenceProps)), /*#__PURE__*/jsx(TimeTable, {
          bobject: cadenceProps.bobject
        }, cadenceProps.bobject.id.value)]
      })
    })
  });
}
_s38(CadenceTable, "mAC5t6r/6ECxThI/lz2bKbcuXqg=");
_c38 = CadenceTable;
var css_248z$5 = ".cadenceControlModal-module_modalCadence__vrL-y header {\n  padding: 12px 12px 12px 40px;\n}\n\n.cadenceControlModal-module_modalCadence__vrL-y header h2 {\n  font-size: 16px;\n  line-height: 24px;\n}\n\n.cadenceControlModal-module_modalCadence__vrL-y header > button > svg {\n  height: 30px;\n}\n";
var styles$5 = {
  "modalCadence": "cadenceControlModal-module_modalCadence__vrL-y"
};
styleInject(css_248z$5);
var css_248z$4 = ".cadenceFeedbackStep-module_content__hkcC- {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n}\n\n.cadenceFeedbackStep-module_content__hkcC- > svg {\n  margin-bottom: 26px;\n}\n\n.cadenceFeedbackStep-module_content__hkcC- > p {\n  margin-bottom: 16px;\n  text-align: center;\n}\n\n.cadenceFeedbackStep-module_footer__arvBx {\n  justify-content: flex-end;\n}\n";
var styles$4 = {
  "content": "cadenceFeedbackStep-module_content__hkcC-",
  "footer": "cadenceFeedbackStep-module_footer__arvBx"
};
styleInject(css_248z$4);
var CadenceFeedbackStep = function CadenceFeedbackStep(props) {
  _s39();
  var _ref = props || {},
    handleNext = _ref.handleNext;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'cadence.cadenceControlModal.feedbackStep'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(ModalContent, {
      children: /*#__PURE__*/jsxs("div", {
        className: styles$4.content,
        children: [/*#__PURE__*/jsx("img", {
          src: CadenceFeedback,
          alt: "Cadence Feedback"
        }), /*#__PURE__*/jsx(Text, {
          size: "m",
          weight: "bold",
          children: t('title')
        }), /*#__PURE__*/jsx(Text, {
          size: "m",
          children: t('subtitle')
        })]
      })
    }), /*#__PURE__*/jsx(ModalFooter, {
      className: styles$4.footer,
      children: /*#__PURE__*/jsx(Button, {
        onClick: handleNext,
        children: t('accept')
      })
    })]
  });
};
_s39(CadenceFeedbackStep, "t/1iBAGEdX8rDM6vi/jYf+ryVbo=", false, function () {
  return [useTranslation];
});
_c39 = CadenceFeedbackStep;
var css_248z$3 = ".createNextStep-module_container__jDh6h {\n  border: 1px solid #9acfff;\n  box-sizing: border-box;\n  box-shadow: 0 2px 20px rgb(25 145 255 / 15%);\n  border-radius: 8px;\n  background-color: white;\n  width: 320px;\n  animation: createNextStep-module_floatingMenu-module_popup__v8iVF__us-D4 150ms ease-in-out;\n  display: inline-block;\n  position: relative;\n  pointer-events: all;\n}\n\n.createNextStep-module_content_container__qSOOL {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  height: 100%;\n}\n\n.createNextStep-module_bottom_bar__EQ-uQ {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px;\n}\n\n.createNextStep-module_text__SPY6Y {\n  margin-left: 4px;\n}\n\n.createNextStep-module_record_related__BU7Ck {\n  display: flex;\n  align-items: center;\n}\n\n.createNextStep-module_editor__RxPR8 {\n  display: flex;\n  flex-direction: column;\n}\n\n.createNextStep-module_wrapper__kvl-Z {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  z-index: 2;\n  pointer-events: none;\n}\n\n.createNextStep-module_dragging__jwi6q {\n  pointer-events: unset;\n}\n\n.createNextStep-module_divider__-QJ54 {\n  width: 100%;\n  text-align: center;\n  border-top: 1px solid var(--verySoftPeanut);\n  align-self: center;\n}\n\n.createNextStep-module_bobject_selector__3lgH0 {\n  margin-left: 8px;\n}\n\n.createNextStep-module_toolbar__8rp-R {\n  border-top: 1px solid var(--verySoftPeanut);\n  border-bottom: 1px solid var(--verySoftPeanut);\n}\n\n.createNextStep-module_mainNote__-PYYg {\n  margin-right: 4px;\n}\n\n.createNextStep-module_modal_title__RWc-N {\n  display: flex;\n  margin: 8px 0;\n  align-items: center;\n}\n\n.createNextStep-module_modal_title__RWc-N > * {\n  margin-right: 8px;\n}\n\n.createNextStep-module_textArea__CScZ3 {\n  margin: 12px 0;\n  border: none;\n  resize: none;\n  font-family: 'Proxima Nova Soft';\n  max-width: 100%;\n  box-shadow: none;\n  height: 265px;\n  box-shadow: none !important;\n  border: none !important;\n}\n\n.createNextStep-module_textArea__CScZ3:focus {\n  outline: none !important;\n  box-shadow: none !important;\n  background-color: white;\n}\n\n.createNextStep-module_buttonsContainer__WdyRI {\n  display: flex;\n  width: 100%;\n  justify-content: space-between;\n}\n\n.createNextStep-module_buttonsContainer__WdyRI > div > button {\n  margin-left: 8px;\n}\n\n.createNextStep-module_taskInfo__KMGcA {\n  display: flex;\n  align-items: center;\n  height: 44px;\n}\n\n.createNextStep-module_taskInfo__KMGcA > div {\n  margin-right: 8px;\n}\n\n.createNextStep-module_taskInfo__KMGcA > div:nth-child(2) {\n  overflow: hidden;\n  flex: 1;\n}\n\n.createNextStep-module_taskInfo__KMGcA > div > div {\n  margin: 0;\n}\n\n.createNextStep-module_taskInfo__KMGcA > p {\n  margin-right: 8px;\n}\n\n.createNextStep-module_taskDate__wOcXO {\n  display: flex;\n}\n\n.createNextStep-module_dateButton__9UU-Q {\n  cursor: pointer;\n}\n";
var styles$3 = {
  "container": "createNextStep-module_container__jDh6h",
  "floatingMenu-module_popup__v8iVF": "createNextStep-module_floatingMenu-module_popup__v8iVF__us-D4",
  "content_container": "createNextStep-module_content_container__qSOOL",
  "bottom_bar": "createNextStep-module_bottom_bar__EQ-uQ",
  "text": "createNextStep-module_text__SPY6Y",
  "record_related": "createNextStep-module_record_related__BU7Ck",
  "editor": "createNextStep-module_editor__RxPR8",
  "wrapper": "createNextStep-module_wrapper__kvl-Z",
  "dragging": "createNextStep-module_dragging__jwi6q",
  "divider": "createNextStep-module_divider__-QJ54",
  "bobject_selector": "createNextStep-module_bobject_selector__3lgH0",
  "toolbar": "createNextStep-module_toolbar__8rp-R",
  "mainNote": "createNextStep-module_mainNote__-PYYg",
  "modal_title": "createNextStep-module_modal_title__RWc-N",
  "textArea": "createNextStep-module_textArea__CScZ3",
  "buttonsContainer": "createNextStep-module_buttonsContainer__WdyRI",
  "taskInfo": "createNextStep-module_taskInfo__KMGcA",
  "taskDate": "createNextStep-module_taskDate__wOcXO",
  "dateButton": "createNextStep-module_dateButton__9UU-Q"
};
styleInject(css_248z$3);
function _typeof$3(obj) {
  "@babel/helpers - typeof";

  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$3(obj);
}
var _excluded$2 = ["related"];
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
      _defineProperty$3(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
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
function _slicedToArray$3(arr, i) {
  return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3();
}
function _nonIterableRest$3() {
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
var CreateNextStep = function CreateNextStep(_ref) {
  _s40();
  var handleBack = _ref.handleBack,
    handleNext = _ref.handleNext;
  var _useState = useState(false),
    _useState2 = _slicedToArray$3(_useState, 2),
    isSubmitting = _useState2[0],
    setIsSubmitting = _useState2[1];
  var userId = useActiveUserId();
  var _useForm = useForm(),
    control = _useForm.control,
    handleSubmitForm = _useForm.handleSubmit;
  var bobjectName;
  var _useCadenceControlMod = useCadenceControlModal(),
    bobject = _useCadenceControlMod.bobject;
  var accountId = bobject === null || bobject === void 0 ? void 0 : bobject.id.accountId;
  switch (bobject.id.typeName) {
    case 'Company':
      bobjectName = bobject.name;
      break;
    case 'Opportunity':
      bobjectName = bobject.name;
      break;
    case 'Lead':
      bobjectName = bobject.fullName;
      break;
  }
  var _useCustomTasks = useCustomTasks(),
    customTasks = _useCustomTasks.customTasks;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: "cadence.cadenceControlModal.createNextStep"
    }),
    t = _useTranslation.t;
  var handleChangeTaskType = function handleChangeTaskType(value) {
    actionTypeOnChange(value);
    if (!['TASK', 'CALL', 'EMAIL'].includes(value)) {
      var _customTasks$find;
      var customTaskDescription = customTasks === null || customTasks === void 0 ? void 0 : (_customTasks$find = customTasks.find(function (task) {
        return task.id === value;
      })) === null || _customTasks$find === void 0 ? void 0 : _customTasks$find.description;
      if (customTaskDescription) {
        titleField.onChange(customTaskDescription);
      }
    }
  };
  var _useState3 = useState(bobjectName),
    _useState4 = _slicedToArray$3(_useState3, 2),
    bobjectSelectedName = _useState4[0],
    setBobjectSelectedName = _useState4[1];
  var _useVisible = useVisible(),
    datePickerVisible = _useVisible.visible,
    setDatePickerVisible = _useVisible.setVisible,
    datePickerRef = _useVisible.ref;

  //@ts-ignore
  var _useController = useController({
      control: control,
      name: TASK_FIELDS_LOGIC_ROLE.TITLE
    }),
    titleField = _useController.field;
  var _useController2 = useController({
      control: control,
      name: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
      defaultValue: new Date()
    }),
    _useController2$field = _useController2.field,
    taskDate = _useController2$field.value,
    taskDateOnChange = _useController2$field.onChange;
  var _useController3 = useController({
      control: control,
      name: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
      defaultValue: TASK_PRIORITY_VALUE.NO_PRIORITY
    }),
    _useController3$field = _useController3.field,
    priority = _useController3$field.value,
    priorityOnChange = _useController3$field.onChange;
  var _useController4 = useController({
      control: control,
      name: TASK_FIELDS_LOGIC_ROLE.ACTION_TYPE,
      defaultValue: 'TASK'
    }),
    _useController4$field = _useController4.field,
    actionType = _useController4$field.value,
    actionTypeOnChange = _useController4$field.onChange;
  var _useController5 = useController({
      control: control,
      name: 'related',
      defaultValue: bobject
    }),
    relatedOnChange = _useController5.field.onChange;
  function onSubmit(data) {
    var _TASK_FIELDS_LOGIC_RO, _TASK_FIELDS_LOGIC_RO2;
    setIsSubmitting(true);
    var related = data.related,
      taskInfo = _objectWithoutProperties$2(data, _excluded$2);
    var body = _defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3({}, TASK_FIELDS_LOGIC_ROLE.TITLE, taskInfo[TASK_FIELDS_LOGIC_ROLE.TITLE]), TASK_FIELDS_LOGIC_ROLE.TASK_TYPE, TASK_TYPE.NEXT_STEP), TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO, userId), TASK_FIELDS_LOGIC_ROLE.STATUS, TASK_STATUS_VALUE_LOGIC_ROLE.TODO), TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, taskInfo[TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]), TASK_FIELDS_LOGIC_ROLE.PRIORITY, taskInfo[TASK_FIELDS_LOGIC_ROLE.PRIORITY]);
    var actionType = taskInfo[TASK_FIELDS_LOGIC_ROLE.ACTION_TYPE];
    body[TASK_FIELDS_LOGIC_ROLE.TASK_TYPE] = TASK_TYPE.NEXT_STEP;
    body[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CALL] = actionType === 'CALL' ? TASK_ACTION_VALUE.CALL_YES : null;
    body[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_EMAIL] = actionType === 'EMAIL' ? TASK_ACTION_VALUE.EMAIL_YES : null;
    if (actionType !== 'TASK' && actionType !== 'CALL' && actionType !== 'EMAIL') {
      body[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CUSTOM_TASK] = TASK_ACTION_VALUE.CUSTOM_TASK_YES;
      body[TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK] = actionType;
    }
    body[_TASK_FIELDS_LOGIC_RO = TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CUSTOM_TASK] || (body[_TASK_FIELDS_LOGIC_RO] = TASK_ACTION_VALUE.CUSTOM_TASK_NO);
    body[_TASK_FIELDS_LOGIC_RO2 = TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK] || (body[_TASK_FIELDS_LOGIC_RO2] = null);
    if (related) {
      if (typeof related === 'string') {
        if (related !== null && related !== void 0 && related.includes('Lead')) {
          body[TASK_FIELDS_LOGIC_ROLE.LEAD] = related;
        } else if (related !== null && related !== void 0 && related.includes('Company')) {
          body[TASK_FIELDS_LOGIC_ROLE.COMPANY] = related;
        } else if (related !== null && related !== void 0 && related.includes('Opportunity')) {
          body[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = related;
        }
      } else {
        var relatedBobjectType = related.id.typeName.toUpperCase();
        body[TASK_FIELDS_LOGIC_ROLE[relatedBobjectType]] = related.id.value;
      }
    }
    api.post("/bobjects/".concat(accountId, "/Task"), body).then(function () {
      setIsSubmitting(false);
      handleNext();
    });
  }
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(ModalContent, {
      children: /*#__PURE__*/jsxs("div", {
        className: styles$3.content_container,
        children: [/*#__PURE__*/jsxs("div", {
          className: styles$3.editor,
          children: [/*#__PURE__*/jsxs("span", {
            className: styles$3.modal_title,
            children: [/*#__PURE__*/jsx(TaskTypeSelector, {
              value: actionType,
              onChange: handleChangeTaskType,
              isWebapp: true
            }), /*#__PURE__*/jsx(PrioritySelector, {
              value: priority,
              onChange: priorityOnChange,
              overrideStyle: {
                right: '40px'
              }
            })]
          }), /*#__PURE__*/jsx("span", {
            className: styles$3.divider
          }), /*#__PURE__*/jsxs("span", {
            className: styles$3.taskInfo,
            children: [/*#__PURE__*/jsx(Icon, {
              name: "clock",
              color: "softPeanut",
              size: 16
            }), /*#__PURE__*/jsx(Text, {
              size: "xs",
              color: "softPeanut",
              children: t('dueDate')
            }), /*#__PURE__*/jsx(DatePicker, {
              withTimePicker: true,
              value: taskDate,
              onChange: taskDateOnChange,
              openDefaultValue: new Date(),
              dropDownRef: datePickerRef,
              visible: datePickerVisible,
              setVisible: setDatePickerVisible,
              dropdownProps: {
                zIndex: 10000,
                anchor: /*#__PURE__*/jsx("span", {
                  onClick: function onClick() {
                    return setDatePickerVisible(true);
                  },
                  className: styles$3.dateButton,
                  children: /*#__PURE__*/jsx(Text, {
                    size: "xs",
                    color: "bloobirds",
                    weight: "regular",
                    children: useGetI18nSpacetime(taskDate).format('{month-short} {date-ordinal}, {day} {time-24}')
                  })
                })
              }
            }), /*#__PURE__*/jsx(BobjectSelector, {
              accountId: accountId,
              selected: bobjectSelectedName,
              id: 'static',
              onBobjectChange: function onBobjectChange(bobject) {
                var _bobject$rawBobject;
                var bobjectType = bobject === null || bobject === void 0 ? void 0 : bobject.bobjectType;
                relatedOnChange(bobject === null || bobject === void 0 ? void 0 : (_bobject$rawBobject = bobject.rawBobject) === null || _bobject$rawBobject === void 0 ? void 0 : _bobject$rawBobject.id);
                if (bobjectType === BobjectTypes.Company) {
                  setBobjectSelectedName(bobject === null || bobject === void 0 ? void 0 : bobject.companyName);
                } else if (bobjectType === BobjectTypes.Lead) {
                  setBobjectSelectedName(bobject === null || bobject === void 0 ? void 0 : bobject.fullName);
                } else if (bobjectType === BobjectTypes.Opportunity) {
                  setBobjectSelectedName(bobject === null || bobject === void 0 ? void 0 : bobject.name);
                }
              }
            })]
          }), /*#__PURE__*/jsx("span", {
            className: styles$3.divider
          }), /*#__PURE__*/jsx("textarea", _objectSpread$2({
            className: styles$3.textArea,
            placeholder: t('placeholder'),
            autoFocus: true
          }, titleField))]
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("div", {
            className: styles$3.bottom_bar,
            children: /*#__PURE__*/jsx("span", {
              className: styles$3.record_related,
              children: /*#__PURE__*/jsx("div", {
                className: styles$3.bobject_selector
              })
            })
          })
        })]
      })
    }), /*#__PURE__*/jsx(ModalFooter, {
      children: /*#__PURE__*/jsxs("div", {
        className: styles$3.buttonsContainer,
        children: [/*#__PURE__*/jsx(Button, {
          variant: "clear",
          onClick: handleBack,
          children: t('back')
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx(Button, {
            onClick: handleSubmitForm(onSubmit),
            disabled: isSubmitting,
            children: isSubmitting ? /*#__PURE__*/jsx(Spinner, {
              name: "loadingCircle",
              size: 12
            }) : t('save')
          })
        })]
      })
    })]
  });
};
_s40(CreateNextStep, "19dVYeDNyBc/rmOZaWcWQLuQfm0=", false, function () {
  return [useActiveUserId, useForm, useCadenceControlModal, useCustomTasks, useTranslation, useVisible, useController, useController, useController, useController, useController, useGetI18nSpacetime];
});
_c40 = CreateNextStep;
var css_248z$2 = ".cadenceIcon-module__container__UH5Us {\n  height: 60px;\n  width: 60px;\n}\n";
var styles$2 = {
  "_container": "cadenceIcon-module__container__UH5Us"
};
styleInject(css_248z$2);

/* eslint-disable max-len */
var CadenceIcon = function CadenceIcon(_ref) {
  var color = _ref.color;
  return /*#__PURE__*/jsx("div", {
    className: styles$2._container,
    children: /*#__PURE__*/jsxs("svg", {
      width: "60",
      height: "60",
      viewBox: "0 0 60 60",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [/*#__PURE__*/jsx("rect", {
        width: "60",
        height: "60",
        fill: "transparent"
      }), /*#__PURE__*/jsx("rect", {
        x: "3",
        y: "8",
        width: "54",
        height: "1.5",
        fill: "var(--".concat(color, ")")
      }), /*#__PURE__*/jsx("rect", {
        x: "3",
        y: "22",
        width: "54",
        height: "1.5",
        fill: "var(--".concat(color, ")")
      }), /*#__PURE__*/jsx("rect", {
        x: "3",
        y: "36",
        width: "54",
        height: "1.5",
        fill: "var(--".concat(color, ")")
      }), /*#__PURE__*/jsx("rect", {
        x: "3",
        y: "50",
        width: "54",
        height: "1.5",
        fill: "var(--".concat(color, ")")
      }), /*#__PURE__*/jsx("circle", {
        cx: "29.9996",
        cy: "15.75",
        r: "4",
        transform: "rotate(-45 29.9996 15.75)",
        stroke: "var(--".concat(color, ")"),
        strokeLinejoin: "round",
        strokeDasharray: "3 2"
      }), /*#__PURE__*/jsx("mask", {
        id: "mask0",
        "mask-type": "alpha",
        maskUnits: "userSpaceOnUse",
        x: "28",
        y: "13",
        width: "4",
        height: "5",
        children: /*#__PURE__*/jsx("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M31.9163 13.8337C31.8047 13.7221 31.6238 13.7221 31.5123 13.8337L30 15.3459L28.4877 13.8337C28.3762 13.7221 28.1953 13.7221 28.0837 13.8337C27.9721 13.9453 27.9721 14.1262 28.0837 14.2377L29.5959 15.75L28.0837 17.2623C27.9721 17.3738 27.9721 17.5547 28.0837 17.6663C28.1953 17.7779 28.3762 17.7779 28.4877 17.6663L30 16.1541L31.5123 17.6663C31.6238 17.7779 31.8047 17.7779 31.9163 17.6663C32.0279 17.5547 32.0279 17.3738 31.9163 17.2623L30.4041 15.75L31.9163 14.2377C32.0279 14.1262 32.0279 13.9453 31.9163 13.8337Z",
          fill: "#1A1A1A"
        })
      }), /*#__PURE__*/jsx("g", {
        mask: "url(#mask0)",
        children: /*#__PURE__*/jsx("rect", {
          x: "26",
          y: "11.75",
          width: "8",
          height: "8",
          fill: "var(--".concat(color, ")")
        })
      }), /*#__PURE__*/jsx("circle", {
        cx: "46",
        cy: "43.75",
        r: "4",
        transform: "rotate(45 46 43.75)",
        stroke: "var(--".concat(color, ")"),
        strokeLinejoin: "round",
        strokeDasharray: "3 2"
      }), /*#__PURE__*/jsx("mask", {
        id: "mask1",
        "mask-type": "alpha",
        maskUnits: "userSpaceOnUse",
        x: "44",
        y: "41",
        width: "4",
        height: "5",
        children: /*#__PURE__*/jsx("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M47.9163 41.8337C47.8047 41.7221 47.6238 41.7221 47.5123 41.8337L46 43.3459L44.4877 41.8337C44.3762 41.7221 44.1953 41.7221 44.0837 41.8337C43.9721 41.9453 43.9721 42.1262 44.0837 42.2377L45.5959 43.75L44.0837 45.2623C43.9721 45.3738 43.9721 45.5547 44.0837 45.6663C44.1953 45.7779 44.3762 45.7779 44.4877 45.6663L46 44.1541L47.5123 45.6663C47.6238 45.7779 47.8047 45.7779 47.9163 45.6663C48.0279 45.5547 48.0279 45.3738 47.9163 45.2623L46.4041 43.75L47.9163 42.2377C48.0279 42.1262 48.0279 41.9453 47.9163 41.8337Z",
          fill: "#1A1A1A"
        })
      }), /*#__PURE__*/jsx("g", {
        mask: "url(#mask1)",
        children: /*#__PURE__*/jsx("rect", {
          x: "42",
          y: "39.75",
          width: "8",
          height: "8",
          fill: "var(--".concat(color, ")")
        })
      }), /*#__PURE__*/jsx("circle", {
        cx: "13.9996",
        cy: "29.75",
        r: "4",
        transform: "rotate(-45 13.9996 29.75)",
        stroke: "var(--".concat(color, ")"),
        strokeLinejoin: "round",
        strokeDasharray: "3 2"
      }), /*#__PURE__*/jsx("mask", {
        id: "mask2",
        "mask-type": "alpha",
        maskUnits: "userSpaceOnUse",
        x: "12",
        y: "27",
        width: "4",
        height: "5",
        children: /*#__PURE__*/jsx("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M15.9163 27.8337C15.8047 27.7221 15.6238 27.7221 15.5123 27.8337L14 29.3459L12.4877 27.8337C12.3762 27.7221 12.1953 27.7221 12.0837 27.8337C11.9721 27.9453 11.9721 28.1262 12.0837 28.2377L13.5959 29.75L12.0837 31.2623C11.9721 31.3738 11.9721 31.5547 12.0837 31.6663C12.1953 31.7779 12.3762 31.7779 12.4877 31.6663L14 30.1541L15.5123 31.6663C15.6238 31.7779 15.8047 31.7779 15.9163 31.6663C16.0279 31.5547 16.0279 31.3738 15.9163 31.2623L14.4041 29.75L15.9163 28.2377C16.0279 28.1262 16.0279 27.9453 15.9163 27.8337Z",
          fill: "#1A1A1A"
        })
      }), /*#__PURE__*/jsx("g", {
        mask: "url(#mask2)",
        children: /*#__PURE__*/jsx("rect", {
          x: "10",
          y: "25.75",
          width: "8",
          height: "8",
          fill: "var(--".concat(color, ")")
        })
      })]
    })
  });
};
_c41 = CadenceIcon;
CadenceIcon.defaultProps = {
  color: 'verySoftPeanut'
};
var css_248z$1 = ".nextStep-module__section_title__wrapper__2pN6s {\n  margin-top: 28px;\n  margin-bottom: 20px;\n}\n\n.nextStep-module__message__wrapper__FV0YY {\n  display: flex;\n  align-items: center;\n  margin-left: 7px;\n}\n\n.nextStep-module__message__wrapper__FV0YY > div {\n  margin-right: 23px;\n}\n\n.nextStep-module__actions__wrapper__h6JXm {\n  margin-bottom: 28px;\n}\n\n.nextStep-module__actions__wrapper__h6JXm > div > div {\n  margin-right: 8px;\n}\n\n.nextStep-module__buttons__wrapper__oJWHP {\n  display: flex;\n  width: 100%;\n  justify-content: flex-end;\n  padding-right: 16px;\n}\n\n.nextStep-module__buttons__wrapper__oJWHP > button:nth-child(2) {\n  margin-left: auto;\n}\n\n.nextStep-module_optionsWrapper__-rI0Q > div{\n  display: flex;\n  flex-direction: column;\n}\n\n.nextStep-module_optionsWrapper__-rI0Q > div > div[class^=\"Tooltip\"]{\n  justify-content: start;\n}\n";
var styles$1 = {
  "_section_title__wrapper": "nextStep-module__section_title__wrapper__2pN6s",
  "_message__wrapper": "nextStep-module__message__wrapper__FV0YY",
  "_actions__wrapper": "nextStep-module__actions__wrapper__h6JXm",
  "_buttons__wrapper": "nextStep-module__buttons__wrapper__oJWHP",
  "optionsWrapper": "nextStep-module_optionsWrapper__-rI0Q"
};
styleInject(css_248z$1);
function _slicedToArray$2(arr, i) {
  return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2();
}
function _nonIterableRest$2() {
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
var ACTIONS = Object.seal({
  NO_STOP: 'NO_STOP',
  YES_STOP: 'YES_STOP'
});
var STEPS_PROPS$1 = Object.seal({
  NEXT_STEP: {
    message: 'cadence.cadenceControlModal.nextStep.nextStep.message',
    title: 'cadence.cadenceControlModal.nextStep.nextStep.title'
  },
  STOP_CADENCE: {
    message: 'cadence.cadenceControlModal.nextStep.stopCadence.message',
    title: 'cadence.cadenceControlModal.nextStep.stopCadence.title'
  }
});
var InfoMessage = function InfoMessage(_ref) {
  _s41();
  var _bobject$id, _bobject$rawBobject, _getFieldValues, _bobject$raw, _getFieldValues2;
  var viewType = _ref.viewType,
    bobject = _ref.bobject;
  var _useFieldsData = useFieldsData(),
    getFieldValues = _useFieldsData.getFieldValues;
  var _useCadenceTable = useCadenceTable(bobject),
    currentCadenceName = _useCadenceTable.cadence,
    defaultCadence = _useCadenceTable.defaultCadence;
  var LOGIC_ROLES = FIELDS_LOGIC_ROLE[bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.typeName];
  var currentStartDate = (bobject === null || bobject === void 0 ? void 0 : (_bobject$rawBobject = bobject.rawBobject) === null || _bobject$rawBobject === void 0 ? void 0 : _bobject$rawBobject[(_getFieldValues = getFieldValues(LOGIC_ROLES.START_CADENCE)) === null || _getFieldValues === void 0 ? void 0 : _getFieldValues.id]) || (bobject === null || bobject === void 0 ? void 0 : (_bobject$raw = bobject.raw) === null || _bobject$raw === void 0 ? void 0 : _bobject$raw.contents[(_getFieldValues2 = getFieldValues(LOGIC_ROLES.START_CADENCE)) === null || _getFieldValues2 === void 0 ? void 0 : _getFieldValues2.id]);
  var date = currentStartDate && formatDate(new Date(currentStartDate), 'dd LLLL yyyy');
  var messageKey = STEPS_PROPS$1[viewType].message;
  return /*#__PURE__*/jsx(Text, {
    size: "m",
    children: /*#__PURE__*/jsx(Trans, {
      i18nKey: messageKey,
      values: viewType === 'NEXT_STEP' ? undefined : {
        cadenceName: (currentCadenceName === null || currentCadenceName === void 0 ? void 0 : currentCadenceName.name) || (defaultCadence === null || defaultCadence === void 0 ? void 0 : defaultCadence.name),
        cadenceDate: date
      }
    })
  });
};
_s41(InfoMessage, "FT22UI2TZ9ineIQL5iF8MKZmEuo=", false, function () {
  return [useFieldsData, useCadenceTable];
});
_c42 = InfoMessage;
var RadioOptions = function RadioOptions(_ref2) {
  _s42();
  var _bobject$id2, _FIELDS_LOGIC_ROLE$bo;
  var bobject = _ref2.bobject,
    _ref2$nextStepHandlin = _slicedToArray$2(_ref2.nextStepHandling, 2),
    nextStep = _ref2$nextStepHandlin[0],
    setNextStep = _ref2$nextStepHandlin[1];
  var bobjectType = bobject === null || bobject === void 0 ? void 0 : (_bobject$id2 = bobject.id) === null || _bobject$id2 === void 0 ? void 0 : _bobject$id2.typeName;
  var hasAssigned = !!(bobject !== null && bobject !== void 0 && bobject.assignedTo) || !!getTextFromLogicRole(bobject, (_FIELDS_LOGIC_ROLE$bo = FIELDS_LOGIC_ROLE[bobjectType]) === null || _FIELDS_LOGIC_ROLE$bo === void 0 ? void 0 : _FIELDS_LOGIC_ROLE$bo.ASSIGNED_TO);
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'cadence.cadenceControlModal.nextStep.radioButtons'
    }),
    t = _useTranslation.t;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'bobjectTypes'
    }),
    bobjectTypeT = _useTranslation2.t;
  return /*#__PURE__*/jsx("div", {
    className: styles$1.optionsWrapper,
    children: /*#__PURE__*/jsxs(RadioGroup, {
      defaultValue: nextStep,
      onChange: setNextStep,
      children: [/*#__PURE__*/jsx(Radio, {
        size: "medium",
        value: STEPS.EXIT,
        children: t('nothingElse')
      }, "radio-anything"), !hasAssigned ? /*#__PURE__*/jsx(Tooltip, {
        position: "top",
        title: t('configureCadenceTooltip', {
          bobjectType: bobjectTypeT(bobjectType.toLowerCase())
        }),
        children: /*#__PURE__*/jsx(Radio, {
          dataTest: "CadenceModal-NewCadence",
          size: "medium",
          value: STEPS.CONFIGURE_CADENCE,
          disabled: true,
          children: t('configureCadence')
        }, "radio-newCadence")
      }) : /*#__PURE__*/jsx(Radio, {
        dataTest: "CadenceModal-NewCadence",
        size: "medium",
        value: STEPS.CONFIGURE_CADENCE,
        children: t('configureCadence')
      }, "radio-newCadence"), /*#__PURE__*/jsx(Radio, {
        dataTest: "CadenceModal-NextStep",
        size: "medium",
        value: STEPS.NEXT_STEPS,
        children: t('nextStep')
      }, "radio-nextStep")]
    })
  }, "changeCadenceRadioKey");
};
_s42(RadioOptions, "JfhT1UHcjsMxQAujmQtyhQ5VgTQ=", false, function () {
  return [useTranslation, useTranslation];
});
_c43 = RadioOptions;
var NextStepsStep = function NextStepsStep(_ref3) {
  _s43();
  var handleClose = _ref3.handleClose,
    handleContinue = _ref3.handleContinue;
  var _useCadenceControlMod = useCadenceControlModal(),
    bobject = _useCadenceControlMod.bobject,
    setStepInfo = _useCadenceControlMod.setStepInfo,
    bobjectName = _useCadenceControlMod.bobjectName,
    stopCadence = _useCadenceControlMod.cadenceManagement.stopCadence,
    cadenceWasStarted = _useCadenceControlMod.cadenceWasStarted;
  var parsedBobject = isArray(bobject) ? bobject[0] : bobject;
  var _useTranslation3 = useTranslation(),
    t = _useTranslation3.t;
  var _useState = useState(cadenceWasStarted ? STEPS.EXIT : STEPS.CONFIGURE_CADENCE),
    _useState2 = _slicedToArray$2(_useState, 2),
    nextStep = _useState2[0],
    setNextStep = _useState2[1];
  var _useState3 = useState(ACTIONS.NO_STOP),
    _useState4 = _slicedToArray$2(_useState3, 2),
    action = _useState4[0],
    setAction = _useState4[1];
  var viewType = cadenceWasStarted ? 'STOP_CADENCE' : 'NEXT_STEP';
  var isLastStep = action === ACTIONS.YES_STOP || nextStep === STEPS.EXIT;
  function handleOnClick() {
    if (action === ACTIONS.YES_STOP || !cadenceWasStarted) {
      if (nextStep !== STEPS.CONFIGURE_CADENCE) {
        stopCadence();
      }
      setStepInfo({
        step: nextStep,
        hadStartedCadence: true
      });
      handleContinue(nextStep);
    } else {
      handleClose();
    }
  }
  useEffect(function () {
    var _parsedBobject$id;
    if ((parsedBobject === null || parsedBobject === void 0 ? void 0 : (_parsedBobject$id = parsedBobject.id) === null || _parsedBobject$id === void 0 ? void 0 : _parsedBobject$id.typeName) === BOBJECT_TYPES.OPPORTUNITY) {
      mixpanel.track('ENTERED_IN_CC_OPPORTUNITY_STEP_2_CADENCE_CONTROL');
    }
  }, []);
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(ModalContent, {
      children: /*#__PURE__*/jsxs(ModalSection, {
        size: "l",
        title: t('cadence.cadenceControlModal.nextStep.title', {
          bobjectName: bobjectName
        }),
        "data-text": "ModalSection-Cadence",
        icon: "cadence",
        children: [/*#__PURE__*/jsx(Callout, {
          width: "100%",
          withoutIcon: true,
          variant: cadenceWasStarted ? 'positive' : 'neutral',
          children: /*#__PURE__*/jsxs("div", {
            "data-test": "Text-ModalCadenceControlWithCadence",
            className: styles$1._message__wrapper,
            children: [/*#__PURE__*/jsx(CadenceIcon, {
              color: cadenceWasStarted ? 'softMelon' : 'verySoftPeanut'
            }), /*#__PURE__*/jsx(InfoMessage, {
              bobject: parsedBobject,
              viewType: viewType
            })]
          })
        }), /*#__PURE__*/jsx("div", {
          className: styles$1._section_title__wrapper,
          children: /*#__PURE__*/jsx(Text, {
            size: "m",
            weight: "medium",
            color: "peanut",
            children: t(STEPS_PROPS$1[viewType].title)
          })
        }), cadenceWasStarted && /*#__PURE__*/jsx("div", {
          className: styles$1._actions__wrapper,
          children: /*#__PURE__*/jsxs(ChipGroup, {
            defaultValue: action,
            onChange: setAction,
            children: [/*#__PURE__*/jsx(Chip, {
              dataTest: "stopTheCadence",
              value: ACTIONS.YES_STOP,
              children: t('cadence.cadenceControlModal.nextStep.yesStopCadence')
            }), /*#__PURE__*/jsx(Chip, {
              value: ACTIONS.NO_STOP,
              children: t('cadence.cadenceControlModal.nextStep.noKeepCadence')
            })]
          })
        }, "stopCadenceKey"), (action === ACTIONS.YES_STOP || !cadenceWasStarted) && /*#__PURE__*/jsx(RadioOptions, {
          bobject: parsedBobject,
          nextStepHandling: [nextStep, setNextStep]
        })]
      })
    }), /*#__PURE__*/jsx(ModalFooter, {
      children: /*#__PURE__*/jsx("div", {
        className: styles$1._buttons__wrapper,
        children: /*#__PURE__*/jsx(Button, {
          dataTest: "Form-".concat(action === ACTIONS.YES_STOP ? 'Continue' : 'Accept'),
          onClick: handleOnClick,
          children: !isLastStep ? t('cadence.cadenceControlModal.nextStep.continue') : t('cadence.cadenceControlModal.nextStep.accept')
        })
      })
    })]
  });
};
_s43(NextStepsStep, "ZKZ2T6y9MTDO7OK4ppth0zrPjfo=", false, function () {
  return [useCadenceControlModal, useTranslation];
});
_c44 = NextStepsStep;
function _typeof$2(obj) {
  "@babel/helpers - typeof";

  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$2(obj);
}
var _excluded$1 = ["bobject"];
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
      _defineProperty$2(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) {
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
var STEPS_PROPS = function STEPS_PROPS(t) {
  return Object.seal({
    INITIAL: {
      title: t('cadenceControl'),
      width: 640,
      dataTest: 'CadenceNextSteps'
    },
    NEXT_STEPS: {
      title: t('cadenceControl'),
      width: 640,
      dataTest: 'CadenceNextSteps'
    },
    CONFIGURE_CADENCE_OPPORTUNITY: {
      title: t('selectCadence'),
      width: 806,
      dataTest: 'CadenceConfigOpportunity'
    },
    CONFIGURE_CADENCE_COMPANY: {
      title: t('selectCadence'),
      width: 806,
      dataTest: 'CadenceConfigCompany'
    },
    UPDATE_LEADS_STATUSES: {
      title: t('updatesLeadStatus'),
      width: 1020,
      dataTest: 'CadenceUpdateLead'
    },
    CADENCE_FEEDBACK: {
      title: t('yourTasksAreBeingRescheduled'),
      width: 512,
      dataTest: 'CadenceFeedback'
    },
    SCHEDULE_NEXT_STEP: {
      title: t('createNextStepTitle'),
      width: 760,
      dataTest: 'NextStepModal'
    }
  });
};
_c45 = STEPS_PROPS;
var withProvider = function withProvider(ModalComponent) {
  var _s44 = $RefreshSig$();
  return _s44(function (props) {
    _s44();
    var bobject = props.bobject,
      rest = _objectWithoutProperties$1(props, _excluded$1);
    var isBulk = isArray(bobject);
    var sampleBobject = isBulk ? bobject[0] : bobject;
    var _useState = useState(bobject),
      _useState2 = _slicedToArray$1(_useState, 2),
      bobjectFromExtensionBobject = _useState2[0],
      setBobjectFromExtensionBobject = _useState2[1];
    React.useEffect(function () {
      return function () {
        var _props$callbackOnClos;
        props === null || props === void 0 ? void 0 : (_props$callbackOnClos = props.callbackOnClose) === null || _props$callbackOnClos === void 0 ? void 0 : _props$callbackOnClos.call(props);
      };
    }, []);
    if (!(sampleBobject !== null && sampleBobject !== void 0 && sampleBobject.cadence) && !isBulk && bobjectFromExtensionBobject !== null && bobjectFromExtensionBobject !== void 0 && bobjectFromExtensionBobject.raw) {
      getExtensionBobjectByIdFields(sampleBobject === null || sampleBobject === void 0 ? void 0 : sampleBobject.id).then(function (_ref) {
        var data = _ref.data;
        return setBobjectFromExtensionBobject(data);
      });
    }
    var modalProps = _objectSpread$1(_objectSpread$1({}, rest), {}, {
      bobject: bobjectFromExtensionBobject
    });
    return /*#__PURE__*/jsx(CadenceControlModalProvider, _objectSpread$1(_objectSpread$1({}, modalProps), {}, {
      children: /*#__PURE__*/jsx(ModalComponent, _objectSpread$1({}, modalProps))
    }));
  }, "FQPZ79jY6SbkbrznengR5bV1Ygg=");
};
var ControlModal = function ControlModal(_ref2) {
  _s45();
  var bobject = _ref2.bobject,
    setIsOpen = _ref2.setIsOpen,
    initialStep = _ref2.initialStep,
    callbackOnClose = _ref2.callbackOnClose,
    callbackOnSave = _ref2.callbackOnSave,
    useEveryBobject = _ref2.useEveryBobject,
    subhomeTab = _ref2.subhomeTab,
    onEmailPreviewClicked = _ref2.onEmailPreviewClicked,
    _ref2$previousStep = _ref2.previousStep,
    previousStep = _ref2$previousStep === void 0 ? true : _ref2$previousStep;
  var _useCadenceControlMod = useCadenceControlModal(),
    isOpportunity = _useCadenceControlMod.isOpportunity,
    stepInfo = _useCadenceControlMod.stepInfo;
  var _useMinimizableModals = useMinimizableModals(),
    openMinimizableModal = _useMinimizableModals.openMinimizableModal;
  var mutateTasks = function mutateTasks() {
    window.dispatchEvent(new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
      detail: {
        type: BobjectTypes.Task
      }
    }));
  };
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'cadence.cadenceControlModal'
    }),
    t = _useTranslation.t;
  function handleClose() {
    callbackOnClose === null || callbackOnClose === void 0 ? void 0 : callbackOnClose();
    setIsOpen === null || setIsOpen === void 0 ? void 0 : setIsOpen(false);
  }
  var handleOpenModal = function handleOpenModal(type) {
    var companyName = bobject.name;
    var parsedOpp = isOpportunity ? bobject : undefined;
    openMinimizableModal({
      type: type,
      title: companyName && companyName !== '' ? companyName.slice(0, 10) : t('untitledCompany'),
      data: {
        mode: ACTIVITY_MODE.CREATE,
        company: {
          // @ts-ignore
          name: getValueFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.NAME),
          //url: companyUrl(bobject),
          data: bobject
        },
        opportunity: parsedOpp && {
          // @ts-ignore
          name: getValueFromLogicRole(parsedOpp, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME),
          // url: opportunityUrl(isSalesConversionEnabled ? undefined : company, parsedOpp),
          data: parsedOpp
        }
      }
    });
  };
  var _useMachine = useMachine(stepsMachine, {
      context: {
        nextStep: function nextStep() {
          return handleOpenModal('task');
        },
        handleClose: handleClose
      }
    }),
    _useMachine2 = _slicedToArray$1(_useMachine, 2),
    step = _useMachine2[0].value,
    send = _useMachine2[1];
  var currentStep = step;
  useEffect(function () {
    if (send) {
      //TODO fix this
      if (typeof initialStep === 'string' || typeof stepInfo === 'string') {
        send(initialStep || stepInfo);
      } else {
        send((initialStep === null || initialStep === void 0 ? void 0 : initialStep.step) || (stepInfo === null || stepInfo === void 0 ? void 0 : stepInfo.step));
      }
    }
  }, [initialStep, send]);
  if (step === STEPS.CONFIGURE_CADENCE) {
    currentStep = isOpportunity ? "".concat(STEPS.CONFIGURE_CADENCE, "_OPPORTUNITY") : "".concat(STEPS.CONFIGURE_CADENCE, "_COMPANY");
  }
  var otherProps = STEPS_PROPS(t)[currentStep];
  return /*#__PURE__*/jsxs(Modal, _objectSpread$1(_objectSpread$1({
    open: true,
    onClose: handleClose
  }, otherProps), {}, {
    className: styles$5.modalCadence,
    children: [step === STEPS.NEXT_STEPS && /*#__PURE__*/jsx(NextStepsStep, {
      handleContinue: function handleContinue(selectedStep) {
        /* if (isOpportunity && !selectedOpportunity) {
          updateSelectedOpportunity(bobject);
        }*/
        if (selectedStep !== STEPS.CONFIGURE_CADENCE) {
          mutateTasks();
          callbackOnSave === null || callbackOnSave === void 0 ? void 0 : callbackOnSave('stop');
        }
        send(EVENTS.NEXT, {
          selectedStep: selectedStep
        });
      },
      handleClose: handleClose
    }), step === STEPS.CONFIGURE_CADENCE && /*#__PURE__*/jsx(ConfigureCadenceStep
    //@ts-ignore
    , {
      bobject: bobject,
      previousStep: initialStep !== null && initialStep !== void 0 && initialStep.step ? (initialStep === null || initialStep === void 0 ? void 0 : initialStep.step) !== STEPS.CONFIGURE_CADENCE : previousStep,
      handleBack: function handleBack() {
        return send(EVENTS.PREVIOUS);
      },
      handleNext: function handleNext() {
        mutateTasks();
        send(EVENTS.NEXT);
        callbackOnSave === null || callbackOnSave === void 0 ? void 0 : callbackOnSave((initialStep === null || initialStep === void 0 ? void 0 : initialStep.step) === STEPS.CONFIGURE_CADENCE ? 'start' : 'reschedule');
      },
      useEveryBobject: useEveryBobject,
      subhomeTab: subhomeTab,
      onEmailPreviewClicked: onEmailPreviewClicked
    }), step === STEPS.CADENCE_FEEDBACK && /*#__PURE__*/jsx(CadenceFeedbackStep, {
      handleNext: function handleNext() {
        send(EVENTS.NEXT);
      }
    }), step === STEPS.SCHEDULE_NEXT_STEP && /*#__PURE__*/jsx(CreateNextStep, {
      handleBack: function handleBack() {
        return send(EVENTS.PREVIOUS);
      },
      handleNext: function handleNext() {
        send(EVENTS.NEXT);
      }
    })]
  }));
};
_s45(ControlModal, "tafzIgKrXi8p8GaA8pfLRuOSsCE=", false, function () {
  return [useCadenceControlModal, useMinimizableModals, useTranslation, useMachine];
});
_c46 = ControlModal;
var CadenceControlModal = withProvider(ControlModal);
_c47 = CadenceControlModal;
var css_248z = ".adminAssignDropdown-module__auto_assign_dropdown__bqBrC {\n  display: flex;\n  flex-direction: column;\n  width: 320px;\n  padding: 16px;\n}\n\n.adminAssignDropdown-module__auto_assign_text__tpESp {\n  padding-bottom: 8px;\n}\n\n.adminAssignDropdown-module__radio_group__sbmpz {\n  padding-bottom: 16px;\n}\n\n.adminAssignDropdown-module__button_wrapper__qgUIH {\n  margin: 0 4px;\n}\n\n.adminAssignDropdown-module__button_wrapper__qgUIH > div > div {\n  width: 100%;\n}\n\n.adminAssignDropdown-module__radio_group__sbmpz > div > div {\n  font-size: 12px;\n  gap: 4px;\n}\n";
var styles = {
  "_auto_assign_dropdown": "adminAssignDropdown-module__auto_assign_dropdown__bqBrC",
  "_auto_assign_text": "adminAssignDropdown-module__auto_assign_text__tpESp",
  "_radio_group": "adminAssignDropdown-module__radio_group__sbmpz",
  "_button_wrapper": "adminAssignDropdown-module__button_wrapper__qgUIH"
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
function useAdminAssignBobjects(userId) {
  var assignBobjects = function assignBobjects(_ref) {
    var _activeBobject$id, _activeBobject$id2;
    var activeBobject = _ref.activeBobject,
      mode = _ref.mode,
      callback = _ref.callback,
      event = _ref.event;
    var bobjectType = activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id = activeBobject.id) === null || _activeBobject$id === void 0 ? void 0 : _activeBobject$id.typeName;
    var accountId = activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id2 = activeBobject.id) === null || _activeBobject$id2 === void 0 ? void 0 : _activeBobject$id2.accountId;
    if (mode === 'startCadence') {
      callback(event);
    } else {
      var body = _defineProperty$1({}, (bobjectType === null || bobjectType === void 0 ? void 0 : bobjectType.toUpperCase()) + '__ASSIGNED_TO', userId);
      api.patch("/bobjects/".concat(accountId, "/").concat(bobjectType, "/").concat(activeBobject.id.objectId, "/raw"), body).then(function () {
        return createToast({
          message: "".concat(bobjectType, " assigned successfully!"),
          type: 'success'
        });
      }).then(function () {
        return callback(event);
      });
    }
  };
  return {
    assignBobjects: assignBobjects
  };
}
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
var DropdownContent = function DropdownContent(_ref) {
  _s46();
  var _activeBobject$id, _users$users;
  var userId = _ref.activeUserId,
    activeBobject = _ref.activeBobject,
    setDropdownVisible = _ref.setDropdownVisible,
    onUnmountDropdown = _ref.onUnmountDropdown,
    _callback = _ref.callback;
  var _useState = useState('assignToMe'),
    _useState2 = _slicedToArray(_useState, 2),
    assignType = _useState2[0],
    setAssignType = _useState2[1];
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'cadence.cadenceControlModal.assignCadenceDropdown.admin'
    }),
    t = _useTranslation.t;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'bobjectTypes'
    }),
    bobjectTypeT = _useTranslation2.t;
  var _useAdminAssignBobjec = useAdminAssignBobjects(userId),
    assignBobjects = _useAdminAssignBobjec.assignBobjects;
  var bobjectType = activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id = activeBobject.id) === null || _activeBobject$id === void 0 ? void 0 : _activeBobject$id.typeName;
  var users = useUserSearch();
  var assignedToValue = 'assignedTo' in activeBobject ? activeBobject === null || activeBobject === void 0 ? void 0 : activeBobject.assignedTo : getValueFromLogicRole(activeBobject, FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO);
  var assignee = users === null || users === void 0 ? void 0 : (_users$users = users.users) === null || _users$users === void 0 ? void 0 : _users$users.find(function (user) {
    return (user === null || user === void 0 ? void 0 : user.id) === assignedToValue;
  });
  var handleSubmit = function handleSubmit(event) {
    onUnmountDropdown === null || onUnmountDropdown === void 0 ? void 0 : onUnmountDropdown();
    assignBobjects({
      activeBobject: activeBobject,
      mode: assignType,
      callback: function callback() {
        _callback(event);
        setDropdownVisible(false);
      },
      event: event
    });
  };
  return /*#__PURE__*/jsxs("div", {
    className: styles._auto_assign_dropdown,
    children: [/*#__PURE__*/jsx(Text, {
      size: "s",
      weight: "bold",
      className: styles._auto_assign_text,
      children: t('title', {
        bobjectType: bobjectTypeT(bobjectType.toLowerCase()).toLowerCase()
      })
    }), /*#__PURE__*/jsx(Text, {
      size: "xs",
      color: "softPeanut",
      className: styles._auto_assign_text,
      children: t('subtitle')
    }), /*#__PURE__*/jsx("div", {
      className: styles._radio_group,
      children: /*#__PURE__*/jsxs(RadioGroup, {
        defaultValue: "assignToMe",
        onChange: function onChange(value) {
          setAssignType(value);
        },
        children: [/*#__PURE__*/jsx(Radio, {
          value: "assignToMe",
          size: "small",
          expand: true,
          children: /*#__PURE__*/jsx(Trans, {
            i18nKey: "cadence.cadenceControlModal.assignCadenceDropdown.admin.assignToMe"
          })
        }), /*#__PURE__*/jsx(Radio, {
          value: "startCadence",
          size: "small",
          expand: true,
          children: /*#__PURE__*/jsx(Trans, {
            i18nKey: "cadence.cadenceControlModal.assignCadenceDropdown.admin.startCadence",
            values: {
              name: (assignee === null || assignee === void 0 ? void 0 : assignee.name) || ''
            }
          })
        })]
      })
    }), /*#__PURE__*/jsx(Button, {
      onClick: function onClick(event) {
        return handleSubmit(event);
      },
      children: "Continue"
    })]
  });
};
_s46(DropdownContent, "wLLBJhWPtC/WlXri6OFi/LjUqNk=", false, function () {
  return [useTranslation, useTranslation, useAdminAssignBobjects, useUserSearch];
});
_c48 = DropdownContent;
var AdminAssignDropdown = function AdminAssignDropdown(_ref2) {
  _s47();
  var activeUserId = _ref2.activeUserId,
    callback = _ref2.callback,
    activeBobject = _ref2.activeBobject,
    onRenderDropdown = _ref2.onRenderDropdown,
    onUnmountDropdown = _ref2.onUnmountDropdown,
    children = _ref2.children;
  var _useVisible = useVisible(),
    dropdownRef = _useVisible.ref,
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  useClickAway(dropdownRef, function () {
    setVisible(false);
    onUnmountDropdown === null || onUnmountDropdown === void 0 ? void 0 : onUnmountDropdown();
  });
  function handleOnClick() {
    onRenderDropdown === null || onRenderDropdown === void 0 ? void 0 : onRenderDropdown();
    setVisible(!visible);
  }
  return /*#__PURE__*/jsx("div", {
    className: styles._button_wrapper,
    id: "startCadenceButton",
    children: /*#__PURE__*/jsx(Dropdown, {
      ref: dropdownRef,
      width: "100%",
      visible: visible,
      arrow: true,
      anchor: /*#__PURE__*/React.cloneElement(children, {
        onClick: handleOnClick
      }),
      children: /*#__PURE__*/jsx(DropdownContent, {
        activeUserId: activeUserId,
        activeBobject: activeBobject,
        setDropdownVisible: setVisible,
        onUnmountDropdown: onUnmountDropdown,
        callback: callback
      })
    })
  });
};
_s47(AdminAssignDropdown, "CqnSrWbU9N8kO2doXLqObXcKGtw=", false, function () {
  return [useVisible, useClickAway];
});
_c49 = AdminAssignDropdown;
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
var _excluded = ["hasPermissions", "activeBobject", "activeUserId"];
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
var AssignCadenceDropdown = function AssignCadenceDropdown(_ref) {
  var _activeBobject$id;
  var _ref$hasPermissions = _ref.hasPermissions,
    hasPermissions = _ref$hasPermissions === void 0 ? false : _ref$hasPermissions,
    activeBobject = _ref.activeBobject,
    activeUserId = _ref.activeUserId,
    props = _objectWithoutProperties(_ref, _excluded);
  var bobjectType = activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id = activeBobject.id) === null || _activeBobject$id === void 0 ? void 0 : _activeBobject$id.typeName;
  var assignedToValue =
  // @ts-ignore
  (activeBobject === null || activeBobject === void 0 ? void 0 : activeBobject.assignedTo) || getValueFromLogicRole(activeBobject,
  // @ts-ignore
  FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO);
  var userIsOwner = assignedToValue === activeUserId;
  if (userIsOwner) {
    return /*#__PURE__*/React.cloneElement(props.children, {
      onClick: function onClick(event) {
        return props.callback(event);
      }
    });
  }
  return assignedToValue && hasPermissions ? /*#__PURE__*/jsx(AdminAssignDropdown, _objectSpread({
    activeBobject: activeBobject,
    activeUserId: activeUserId
  }, props)) : /*#__PURE__*/jsx(AutoAssignDropdown, _objectSpread({
    activeBobject: activeBobject,
    activeUserId: activeUserId
  }, props));
};
_c50 = AssignCadenceDropdown;
export { AdminAssignDropdown, AssignCadenceDropdown, AutoAssignDropdown, CadenceControlModal, CadencePreview, CadenceSelector, CadenceTable, ConfigureCadenceStep, RescheduleCadence, StartCadenceModal, StopCadenceModal, useCadenceSteps, useCadences, useHasCadenceStarted };
var _c, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16, _c17, _c18, _c19, _c20, _c21, _c22, _c23, _c24, _c25, _c26, _c27, _c28, _c29, _c30, _c31, _c32, _c33, _c34, _c35, _c36, _c37, _c38, _c39, _c40, _c41, _c42, _c43, _c44, _c45, _c46, _c47, _c48, _c49, _c50;
$RefreshReg$(_c, "CadenceControlModalProvider");
$RefreshReg$(_c2, "AttachmentItem");
$RefreshReg$(_c3, "AttachmentList");
$RefreshReg$(_c4, "EmailModalRow");
$RefreshReg$(_c5, "PreviewTemplateModal");
$RefreshReg$(_c6, "CadenceCircle");
$RefreshReg$(_c7, "CadencePreview");
$RefreshReg$(_c8, "CadenceGroupHeader");
$RefreshReg$(_c9, "CadenceItem");
$RefreshReg$(_c10, "CadenceSelector$React.forwardRef");
$RefreshReg$(_c11, "CadenceSelector");
$RefreshReg$(_c12, "ConfigureCadenceStep");
$RefreshReg$(_c13, "StartCadenceModal");
$RefreshReg$(_c14, "StopCadenceModal");
$RefreshReg$(_c15, "RescheduleCadence");
$RefreshReg$(_c16, "DropdownContent$1");
$RefreshReg$(_c17, "AutoAssignDropdown");
$RefreshReg$(_c18, "CurrentCadence");
$RefreshReg$(_c19, "LeadFilter");
$RefreshReg$(_c20, "CadenceHeader");
$RefreshReg$(_c21, "TimeWindowFilter");
$RefreshReg$(_c22, "KindFilter");
$RefreshReg$(_c23, "TodayButton");
$RefreshReg$(_c24, "ScheduledTaskItem");
$RefreshReg$(_c25, "CompletedActivityItem");
$RefreshReg$(_c26, "BadgeDropdownContent");
$RefreshReg$(_c27, "BadgeDropdown");
$RefreshReg$(_c28, "ColumnHeader");
$RefreshReg$(_c29, "Column$React.memo");
$RefreshReg$(_c30, "Column");
$RefreshReg$(_c31, "CenterContent");
$RefreshReg$(_c32, "Columns");
$RefreshReg$(_c33, "FirstColumnComponent");
$RefreshReg$(_c34, "FirstColumn");
$RefreshReg$(_c35, "LeftArrowAndFlag");
$RefreshReg$(_c36, "RightArrowAndFlag");
$RefreshReg$(_c37, "TimeTable");
$RefreshReg$(_c38, "CadenceTable");
$RefreshReg$(_c39, "CadenceFeedbackStep");
$RefreshReg$(_c40, "CreateNextStep");
$RefreshReg$(_c41, "CadenceIcon");
$RefreshReg$(_c42, "InfoMessage");
$RefreshReg$(_c43, "RadioOptions");
$RefreshReg$(_c44, "NextStepsStep");
$RefreshReg$(_c45, "STEPS_PROPS");
$RefreshReg$(_c46, "ControlModal");
$RefreshReg$(_c47, "CadenceControlModal");
$RefreshReg$(_c48, "DropdownContent");
$RefreshReg$(_c49, "AdminAssignDropdown");
$RefreshReg$(_c50, "AssignCadenceDropdown");
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