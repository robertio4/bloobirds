import { createApi } from '/vendor/.vite-deps-@bloobirds-it_plover.js__v--88b8fafa.js';
import { BobjectTypes, TASK_FIELDS_LOGIC_ROLE, OPPORTUNITY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, COMPANY_FIELDS_LOGIC_ROLE, LEAD_STAGE_LOGIC_ROLE, COMPANY_STAGE_LOGIC_ROLE, PluralBobjectTypes, ACTIVITY_FIELDS_LOGIC_ROLE, ACTIVITY_TYPES_VALUES_LOGIC_ROLE, APP_CL_COMPANIES, APP_CL_LEADS, FIELDS_LOGIC_ROLE, TASK_STATUS_VALUE_LOGIC_ROLE, TASK_TYPE, TASK_AUTOMATED_VALUE, TASK_PRIORITY_VALUE, TASK_ACTION, TASK_ACTION_VALUE, BOBJECT_TYPES, SALESFORCE_LOGIC_ROLES, MIXPANEL_EVENTS, PlaybookTab, Environment } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js';
import __vite__cjsImport2_lodash_groupBy from "/vendor/.vite-deps-lodash_groupBy.js__v--c39aff61.js"; const groupBy = __vite__cjsImport2_lodash_groupBy.__esModule ? __vite__cjsImport2_lodash_groupBy.default : __vite__cjsImport2_lodash_groupBy;
import useSWR from '/vendor/.vite-deps-swr.js__v--ed0a962e.js';
import { getI18nSpacetimeLng, useGetI18nSpacetime } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js';
import spacetime from '/vendor/.vite-deps-spacetime.js__v--14e7d295.js';
import { format, subDays, addDays, differenceInDays, getWeeksInMonth as getWeeksInMonth$1, getDay, isSameDay as isSameDay$1, isAfter, startOfDay, isWeekend as isWeekend$1, eachDayOfInterval, startOfMonth, endOfMonth, startOfWeek, isBefore, endOfWeek, addMonths, addMinutes as addMinutes$1, subMinutes as subMinutes$1, subMonths, formatDistance as formatDistance$1, formatDistanceToNow as formatDistanceToNow$1, addSeconds, isYesterday, differenceInCalendarDays, addHours, getDate, isValid, parse } from '/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js';
export { addDays, differenceInDays, endOfDay, getDaysInMonth, startOfDay, subDays } from '/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js';
import { useTranslation } from '/vendor/.vite-deps-react-i18next.js__v--8418bf92.js';
import __vite__cjsImport9_countryCodeLookup from "/vendor/.vite-deps-country-code-lookup.js__v--ae4cc6e7.js"; const lookup = __vite__cjsImport9_countryCodeLookup.__esModule ? __vite__cjsImport9_countryCodeLookup.default : __vite__cjsImport9_countryCodeLookup;
import __vite__cjsImport10_lodash_camelCase from "/vendor/.vite-deps-lodash_camelCase.js__v--7ba47bc4.js"; const camelCase = __vite__cjsImport10_lodash_camelCase.__esModule ? __vite__cjsImport10_lodash_camelCase.default : __vite__cjsImport10_lodash_camelCase;
import __vite__cjsImport11_lodash_lowerCase from "/vendor/.vite-deps-lodash_lowerCase.js__v--2048e47c.js"; const lowerCase = __vite__cjsImport11_lodash_lowerCase.__esModule ? __vite__cjsImport11_lodash_lowerCase.default : __vite__cjsImport11_lodash_lowerCase;
import __vite__cjsImport12_lodash_startCase from "/vendor/.vite-deps-lodash_startCase.js__v--9bd8a96d.js"; const startCase = __vite__cjsImport12_lodash_startCase.__esModule ? __vite__cjsImport12_lodash_startCase.default : __vite__cjsImport12_lodash_startCase;
import __vite__cjsImport13_lodash_assign from "/vendor/.vite-deps-lodash_assign.js__v--935c2190.js"; const assign = __vite__cjsImport13_lodash_assign.__esModule ? __vite__cjsImport13_lodash_assign.default : __vite__cjsImport13_lodash_assign;
import __vite__cjsImport14_lodash_isUndefined from "/vendor/.vite-deps-lodash_isUndefined.js__v--9b073235.js"; const isUndefined = __vite__cjsImport14_lodash_isUndefined.__esModule ? __vite__cjsImport14_lodash_isUndefined.default : __vite__cjsImport14_lodash_isUndefined;
import __vite__cjsImport15_lodash_pickBy from "/vendor/.vite-deps-lodash_pickBy.js__v--6f890eac.js"; const pickBy = __vite__cjsImport15_lodash_pickBy.__esModule ? __vite__cjsImport15_lodash_pickBy.default : __vite__cjsImport15_lodash_pickBy;
import { parsePhoneNumber } from '/vendor/.vite-deps-libphonenumber-js.js__v--da3005b6.js';
import __vite__cjsImport17_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useRef = __vite__cjsImport17_react["useRef"]; const useEffect = __vite__cjsImport17_react["useEffect"]; const useCallback = __vite__cjsImport17_react["useCallback"];
import __vite__cjsImport18_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport18_mixpanelBrowser.__esModule ? __vite__cjsImport18_mixpanelBrowser.default : __vite__cjsImport18_mixpanelBrowser;
import normalize from '/vendor/.vite-deps-normalize-url.js__v--91e5723a.js';

function parseAmount(amount) {
  var maxDecimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var minDecimals = arguments.length > 2 ? arguments[2] : undefined;
  if (!amount && amount !== 0) {
    console.error('Trying to parse an undefined amount');
    return undefined; //throw new Error('Trying to parse an undefined');
  }

  var parsedAmount = Number(amount);
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: minDecimals !== null && minDecimals !== void 0 ? minDecimals : maxDecimals,
    maximumFractionDigits: !minDecimals || maxDecimals > minDecimals ? maxDecimals : minDecimals
  }).format(parsedAmount);
}
function shortenAmount(amount) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var space = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!amount && amount !== 0) {
    console.error('Trying to shorten an undefined amount');
    return undefined; //throw new Error('Trying to shorten amount of undefined');
  }

  var parsedAmount = Number(amount);
  // Don't shorten if amount is less than 10k
  if (parsedAmount < 10000) {
    return parseAmount(parsedAmount, parsedAmount < 1000 ? decimals < 3 ? decimals : 2 : 0, 0);
  }

  // format
  var formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: parsedAmount < Math.pow(10, 15) ? parsedAmount < Math.pow(10, 6) && parsedAmount % 100 / parsedAmount < 0.001 ? 2 : decimals : 0,
    notation: 'compact'
  }).format(parsedAmount);

  // Add comma to numbers in a thousand trillion range (15 and 16 digits)
  if (parsedAmount >= Math.pow(10, 15) && parsedAmount < Math.pow(10, 17)) {
    formattedAmount = parseAmount(formattedAmount.replace('T', ''), decimals).concat('T');
  }

  // Add space between number and unit
  if (space) {
    return formattedAmount.substring(0, formattedAmount.length - 1).concat(' ').concat(formattedAmount.substring(formattedAmount.length - 1));
  } else return formattedAmount;
}

var appHostnames = ['app.dev-bloobirds.com', 'app.bloobirds.com', 'localhost'];

//@ts-ignore
var api = createApi({
  getToken: function getToken() {
    if (typeof window !== 'undefined' && (appHostnames.includes(window.location.hostname) || window.location.hostname.includes('bloobirds-platform-frontend.pages.dev'))) {
      var session = localStorage.getItem('bb-app-session');
      if (session) {
        var _JSON$parse;
        return ((_JSON$parse = JSON.parse(session)) === null || _JSON$parse === void 0 ? void 0 : _JSON$parse.token) || null;
      }
      return null;
    } else {
      var _chrome, _chrome$storage;
      if (chrome && (_chrome = chrome) !== null && _chrome !== void 0 && _chrome.storage && (_chrome$storage = chrome.storage) !== null && _chrome$storage !== void 0 && _chrome$storage.sync) {
        return new Promise(function (resolve) {
          var _chrome$storage2, _chrome$storage2$sync;
          (_chrome$storage2 = chrome.storage) === null || _chrome$storage2 === void 0 ? void 0 : (_chrome$storage2$sync = _chrome$storage2.sync) === null || _chrome$storage2$sync === void 0 ? void 0 : _chrome$storage2$sync.get({
            token: ''
          }, function (_ref) {
            var token = _ref.token;
            resolve(token);
          });
        });
      } else {
        return null;
      }
    }
  },
  getEnvironment: function getEnvironment() {
    return process.env.ENV || 'local';
  }
});

// TODO: Move this out of here and directly into the parser
var MessagesEvents = {
  UrlNotFound: 'MESSAGES_EVENTS_URL_NOT_FOUND',
  UrlFound: 'MESSAGES_EVENTS_URL_FOUND',
  ForceOpenExtension: 'FORCE_OPEN_EXTENSION',
  UserLoggedIn: 'USER_LOGGED_IN',
  UserLoggedOut: 'USER_LOGGED_OUT',
  PlaybookFeed: 'PLAYBOOK_FEED'
};

function _typeof$a(obj) { "@babel/helpers - typeof"; return _typeof$a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$a(obj); }
function _regeneratorRuntime$6() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$6 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$a(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$6(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function isLoggedIn() {
  return _isLoggedIn.apply(this, arguments);
}
function _isLoggedIn() {
  _isLoggedIn = _asyncToGenerator$6( /*#__PURE__*/_regeneratorRuntime$6().mark(function _callee() {
    return _regeneratorRuntime$6().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve) {
            var _chrome3, _chrome3$storage, _chrome3$storage$sync;
            (_chrome3 = chrome) === null || _chrome3 === void 0 ? void 0 : (_chrome3$storage = _chrome3.storage) === null || _chrome3$storage === void 0 ? void 0 : (_chrome3$storage$sync = _chrome3$storage.sync) === null || _chrome3$storage$sync === void 0 ? void 0 : _chrome3$storage$sync.get({
              token: ''
            }, function (items) {
              resolve(!!items.token);
            });
          }));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _isLoggedIn.apply(this, arguments);
}
function login(_x) {
  return _login.apply(this, arguments);
}
function _login() {
  _login = _asyncToGenerator$6( /*#__PURE__*/_regeneratorRuntime$6().mark(function _callee2(_ref) {
    var _chrome4, _chrome4$storage, _chrome4$storage$sync;
    var email, password, _yield$api$post, token;
    return _regeneratorRuntime$6().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          email = _ref.email, password = _ref.password;
          _context2.next = 3;
          return api.post('/auth/service/jwt', {
            email: email,
            password: password,
            claimerSystem: 'linkedin_ce'
          });
        case 3:
          _yield$api$post = _context2.sent;
          token = _yield$api$post.data.token;
          (_chrome4 = chrome) === null || _chrome4 === void 0 ? void 0 : (_chrome4$storage = _chrome4.storage) === null || _chrome4$storage === void 0 ? void 0 : (_chrome4$storage$sync = _chrome4$storage.sync) === null || _chrome4$storage$sync === void 0 ? void 0 : _chrome4$storage$sync.set({
            token: token
          });
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _login.apply(this, arguments);
}
function logout() {
  return new Promise(function (resolve) {
    if (chrome && chrome.storage && chrome.storage.sync) {
      var _chrome, _chrome$storage, _chrome$storage$sync;
      (_chrome = chrome) === null || _chrome === void 0 ? void 0 : (_chrome$storage = _chrome.storage) === null || _chrome$storage === void 0 ? void 0 : (_chrome$storage$sync = _chrome$storage.sync) === null || _chrome$storage$sync === void 0 ? void 0 : _chrome$storage$sync.set({
        token: ''
      }, function () {
        // @ts-ignore
        resolve();
        window.dispatchEvent(new CustomEvent(MessagesEvents.UserLoggedOut));
      });
    } else {
      resolve(null);
    }
  });
}
function getToken() {
  return new Promise(function (resolve) {
    if (chrome && chrome.storage && chrome.storage.sync) {
      var _chrome2, _chrome2$storage, _chrome2$storage$sync;
      (_chrome2 = chrome) === null || _chrome2 === void 0 ? void 0 : (_chrome2$storage = _chrome2.storage) === null || _chrome2$storage === void 0 ? void 0 : (_chrome2$storage$sync = _chrome2$storage.sync) === null || _chrome2$storage$sync === void 0 ? void 0 : _chrome2$storage$sync.get({
        token: ''
      }, function (_ref2) {
        var token = _ref2.token;
        if (token) {
          var contents = JSON.parse(atob(token.split('.')[1]));
          resolve(contents);
        } else {
          resolve(null);
        }
      });
    } else {
      resolve(null);
    }
  });
}
function getTokenEncoded() {
  return _getTokenEncoded.apply(this, arguments);
}
function _getTokenEncoded() {
  _getTokenEncoded = _asyncToGenerator$6( /*#__PURE__*/_regeneratorRuntime$6().mark(function _callee3() {
    return _regeneratorRuntime$6().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return new Promise(function (resolve) {
            if (chrome && chrome.storage && chrome.storage.sync) {
              var _chrome5, _chrome5$storage, _chrome5$storage$sync;
              (_chrome5 = chrome) === null || _chrome5 === void 0 ? void 0 : (_chrome5$storage = _chrome5.storage) === null || _chrome5$storage === void 0 ? void 0 : (_chrome5$storage$sync = _chrome5$storage.sync) === null || _chrome5$storage$sync === void 0 ? void 0 : _chrome5$storage$sync.get({
                token: ''
              }, function (_ref3) {
                var token = _ref3.token;
                if (token) {
                  resolve(token);
                } else {
                  resolve(null);
                }
              });
            } else {
              resolve(null);
            }
          });
        case 2:
          return _context3.abrupt("return", _context3.sent);
        case 3:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _getTokenEncoded.apply(this, arguments);
}
function getAccountId() {
  return _getAccountId.apply(this, arguments);
}
function _getAccountId() {
  _getAccountId = _asyncToGenerator$6( /*#__PURE__*/_regeneratorRuntime$6().mark(function _callee4() {
    var session, _JSON$parse, _JSON$parse$context, _JSON$parse$context$a, token;
    return _regeneratorRuntime$6().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!(appHostnames.includes(window.location.hostname) || window.location.hostname.includes('bloobirds-platform-frontend.pages.dev'))) {
            _context4.next = 5;
            break;
          }
          session = localStorage.getItem('bb-app-session');
          if (!session) {
            _context4.next = 4;
            break;
          }
          return _context4.abrupt("return", ((_JSON$parse = JSON.parse(session)) === null || _JSON$parse === void 0 ? void 0 : (_JSON$parse$context = _JSON$parse.context) === null || _JSON$parse$context === void 0 ? void 0 : (_JSON$parse$context$a = _JSON$parse$context.account) === null || _JSON$parse$context$a === void 0 ? void 0 : _JSON$parse$context$a.id) || null);
        case 4:
          return _context4.abrupt("return", null);
        case 5:
          _context4.next = 7;
          return getToken();
        case 7:
          token = _context4.sent;
          return _context4.abrupt("return", token === null || token === void 0 ? void 0 : token.account);
        case 9:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _getAccountId.apply(this, arguments);
}
function getUserId() {
  return _getUserId.apply(this, arguments);
}
function _getUserId() {
  _getUserId = _asyncToGenerator$6( /*#__PURE__*/_regeneratorRuntime$6().mark(function _callee5() {
    var session, _JSON$parse2, _JSON$parse2$context, _JSON$parse2$context$, token;
    return _regeneratorRuntime$6().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (!(appHostnames.includes(window.location.hostname) || window.location.hostname.includes('bloobirds-platform-frontend.pages.dev'))) {
            _context5.next = 7;
            break;
          }
          session = localStorage.getItem('bb-app-session');
          if (!session) {
            _context5.next = 4;
            break;
          }
          return _context5.abrupt("return", ((_JSON$parse2 = JSON.parse(session)) === null || _JSON$parse2 === void 0 ? void 0 : (_JSON$parse2$context = _JSON$parse2.context) === null || _JSON$parse2$context === void 0 ? void 0 : (_JSON$parse2$context$ = _JSON$parse2$context.user) === null || _JSON$parse2$context$ === void 0 ? void 0 : _JSON$parse2$context$.id) || null);
        case 4:
          return _context5.abrupt("return", null);
        case 7:
          _context5.next = 9;
          return getToken();
        case 9:
          token = _context5.sent;
          return _context5.abrupt("return", token === null || token === void 0 ? void 0 : token.sub);
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _getUserId.apply(this, arguments);
}
function getUserName() {
  return _getUserName.apply(this, arguments);
}
function _getUserName() {
  _getUserName = _asyncToGenerator$6( /*#__PURE__*/_regeneratorRuntime$6().mark(function _callee6() {
    var token;
    return _regeneratorRuntime$6().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return getToken();
        case 2:
          token = _context6.sent;
          return _context6.abrupt("return", token.userName);
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _getUserName.apply(this, arguments);
}
function getAuthUrl() {
  {
    return 'http://localhost:5173';
  }
}

function _typeof$9(obj) { "@babel/helpers - typeof"; return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$9(obj); }
function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$5(arr, i) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$5(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$5(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen); }
function _arrayLikeToArray$5(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$1(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime$5() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$5 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$9(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$5(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty$5(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$5(obj, key, value) { key = _toPropertyKey$5(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$5(arg) { var key = _toPrimitive$5(arg, "string"); return _typeof$9(key) === "symbol" ? key : String(key); }
function _toPrimitive$5(input, hint) { if (_typeof$9(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$9(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var findByProperties = function findByProperties(bobjectFields, properties, value) {
  for (var i = 0; i < properties.length; i += 1) {
    var field = findByProperty(bobjectFields, properties[i], value);
    if (field !== undefined) {
      return field;
    }
  }
  return undefined;
};
var getNameFieldLRFromBobjectType = function getNameFieldLRFromBobjectType(bobjectType) {
  switch (bobjectType) {
    case BobjectTypes.Company:
      return COMPANY_FIELDS_LOGIC_ROLE.NAME;
    case BobjectTypes.Lead:
      return LEAD_FIELDS_LOGIC_ROLE.FULL_NAME;
    case BobjectTypes.Opportunity:
      return OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME;
    case BobjectTypes.Task:
      return TASK_FIELDS_LOGIC_ROLE.TITLE;
  }
};
var groupFieldsByGroup = function groupFieldsByGroup(bobjectFields) {
  var groupMetadata = {};
  bobjectFields.filter(function (bf) {
    return bf.groupName !== null && bf.groupName !== undefined;
  }).forEach(function (bf) {
    groupMetadata[bf.groupName] = {
      name: bf.groupName,
      ordering: bf.groupOrdering,
      detailDisplay: bf.groupDetailDisplay
    };
  });
  var groups = Object.keys(groupMetadata);
  var fieldsByGroup = {};
  groups.forEach(function (group) {
    fieldsByGroup[group] = [];
  });
  bobjectFields.filter(function (bf) {
    return bf.groupName !== null && bf.groupName !== undefined;
  }).forEach(function (bf) {
    if (bf.logicRole !== 'COMPANY__NAME') {
      fieldsByGroup[bf.groupName].push(bf);
    }
  });
  Object.values(fieldsByGroup).forEach(function (fields) {
    return fields.sort(function (f1, f2) {
      return (f1 === null || f1 === void 0 ? void 0 : f1.ordering) - (f2 === null || f2 === void 0 ? void 0 : f2.ordering);
    });
  });
  var arranged = [];
  Object.keys(fieldsByGroup).forEach(function (groupName) {
    return arranged.push({
      name: groupName.toUpperCase(),
      fields: fieldsByGroup[groupName],
      meta: groupMetadata[groupName]
    });
  });
  arranged.sort(function (f1, f2) {
    return f1.fields[0].groupOrdering - f2.fields[0].groupOrdering;
  });
  return arranged;
};
var findByProperty = function findByProperty(bobjectFields, property, value) {
  var matchingFields = bobjectFields.filter(function (b) {
    return b[property] === value;
  });
  if (matchingFields.length === 1) {
    return matchingFields[0];
  }
  if (matchingFields.length === 0) {
    return undefined;
  }
  return matchingFields;
};
var bobjectFieldsModel = function bobjectFieldsModel(bobjectFields) {
  return {
    find: function find(fieldDescriptor) {
      return findByProperties(bobjectFields, ['id', 'name', 'logicRole'], fieldDescriptor);
    },
    findById: function findById(bobjectFieldId) {
      return findByProperty(bobjectFields, 'name', bobjectFieldId);
    },
    findByLogicRole: function findByLogicRole(logicRole) {
      return findByProperty(bobjectFields, 'logicRole', logicRole);
    },
    findByLabel: function findByLabel(label) {
      return findByProperty(bobjectFields, 'label', label);
    },
    groupFieldsByGroup: groupFieldsByGroup,
    findByCondition: function findByCondition(condition) {
      return bobjectFields.filter(condition);
    },
    findBy: function findBy(property) {
      return function (value) {
        return findByProperty(bobjectFields, property, value);
      };
    }
  };
};
var findByPropertiesAndValues = function findByPropertiesAndValues(bobjectFields, properties, values) {
  for (var i = 0; i < values.length; i += 1) {
    var field = findByProperties(bobjectFields, properties, values[i]);
    if (field !== undefined) {
      return field;
    }
  }
  return undefined;
};
var bobjectModel = function bobjectModel(bobject) {
  var bobjectFields = bobject.fields;
  var bobjectPrefix = "".concat(bobject.id.typeName.toUpperCase(), "__");
  var model = bobjectFieldsModel(bobjectFields);
  model.find = function (fieldDescriptor) {
    return findByPropertiesAndValues(bobjectFields, ['id', 'name', 'logicRole'], [fieldDescriptor, bobjectPrefix + fieldDescriptor]);
  };
  model['type'] = function () {
    return bobject.id.typeName;
  };
  return model;
};
var getRelatedBobject = function getRelatedBobject(bobject, relatedBobjectType) {
  var _model$findBy;
  var model = bobjectModel(bobject);
  return (_model$findBy = model.findBy('referencedBobjectType')(relatedBobjectType)) === null || _model$findBy === void 0 ? void 0 : _model$findBy.referencedBobject;
};
var getFieldByLogicRole = function getFieldByLogicRole(bobject, logicRole) {
  if (bobject !== null && bobject !== void 0 && bobject.fields) {
    return bobject === null || bobject === void 0 ? void 0 : bobject.fields.find(function (fieldItem) {
      return fieldItem.logicRole === logicRole;
    });
  }
  return null;
};
var injectReference = function injectReference(field, referencedBobjects) {
  var referencedBobject;
  if (field.type === 'REFERENCE') {
    referencedBobject = referencedBobjects === null || referencedBobjects === void 0 ? void 0 : referencedBobjects[field.logicRole];
  }
  return _objectSpread$4(_objectSpread$4({}, field), {}, {
    referencedBobject: referencedBobject
  });
};
var injectReferenceFields = function injectReferenceFields(bobject) {
  var extendedFields = bobject.fields.map(function (field) {
    return injectReference(field, bobject.referencedBobjects);
  });
  return _objectSpread$4(_objectSpread$4({}, bobject), {}, {
    fields: extendedFields
  });
};
var getReferencedBobjectFromLogicRole = function getReferencedBobjectFromLogicRole(bobject, logicRole) {
  var field = getFieldByLogicRole(bobject, logicRole);
  return field === null || field === void 0 ? void 0 : field.referencedBobject;
};
var getValueFromLogicRole = function getValueFromLogicRole(bobject, logicRole) {
  var asText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var field = getFieldByLogicRole(bobject, logicRole);
  return asText ? field === null || field === void 0 ? void 0 : field.text : field === null || field === void 0 ? void 0 : field.value;
};
var getTextFromLogicRole = function getTextFromLogicRole(bobject, logicRole) {
  return getValueFromLogicRole(bobject, logicRole, true);
};
var getFieldsByType = function getFieldsByType(bobject, fieldType) {
  var _bobject$fields;
  return (bobject === null || bobject === void 0 ? void 0 : (_bobject$fields = bobject.fields) === null || _bobject$fields === void 0 ? void 0 : _bobject$fields.filter(function (fieldItem) {
    return (fieldItem === null || fieldItem === void 0 ? void 0 : fieldItem.type) === fieldType;
  })) || [];
};
var getFieldsByIds = function getFieldsByIds(bobject, ids) {
  var _bobject$fields2;
  return bobject === null || bobject === void 0 ? void 0 : (_bobject$fields2 = bobject.fields) === null || _bobject$fields2 === void 0 ? void 0 : _bobject$fields2.filter(function (field) {
    return ids.includes(field.name);
  });
};
var getFieldById = function getFieldById(bobject, id) {
  return bobject === null || bobject === void 0 ? void 0 : bobject.fields.find(function (fieldItem) {
    return fieldItem.name === id;
  });
};
var getFieldTextById = function getFieldTextById(bobject, id) {
  var _getFieldById;
  return (_getFieldById = getFieldById(bobject, id)) === null || _getFieldById === void 0 ? void 0 : _getFieldById.text;
};
var checkIsSalesBobject = function checkIsSalesBobject(bobject) {
  switch (bobject.id.typeName) {
    case BobjectTypes.Company:
      return getFieldByLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.STAGE).valueLogicRole === COMPANY_STAGE_LOGIC_ROLE.SALES;
    case BobjectTypes.Lead:
      return getFieldByLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.STAGE).valueLogicRole === LEAD_STAGE_LOGIC_ROLE.SALES;
    default:
      return false;
  }
};
var getBobjectFromLogicRole = function getBobjectFromLogicRole(logicRole) {
  var companyRegex = /^COMPANY__/;
  var salesforceCompanyRegex = /^SALESFORCE_COMPANY_/;
  var leadRegex = /^LEAD__/;
  var salesforceLeadRegex = /^SALESFORCE_LEAD_/;
  var opportunityRegex = /^OPPORTUNITY__/;
  var salesforceOpportunityRegex = /^SALESFORCE_OPPORTUNITY_/;
  var taskRegex = /^TASK__/;
  var activityRegex = /^ACTIVITY__/;
  if (companyRegex.test(logicRole) || salesforceCompanyRegex.test(logicRole)) return BobjectTypes.Company;
  if (leadRegex.test(logicRole) || salesforceLeadRegex.test(logicRole)) return BobjectTypes.Lead;
  if (opportunityRegex.test(logicRole) || salesforceOpportunityRegex.test(logicRole)) return BobjectTypes.Opportunity;
  if (taskRegex.test(logicRole)) return BobjectTypes.Task;
  if (activityRegex.test(logicRole)) return BobjectTypes.Activity;
};
var processInjectField = function processInjectField(response, field) {
  var referencedBobject;
  if (field.type === 'REFERENCE') {
    if (field.referencedBobjectType !== undefined && field.referencedBobjectType !== null && field.text !== null && field.text !== undefined && response.referencedBobjects !== undefined && response.referencedBobjects !== null) {
      referencedBobject = response.referencedBobjects[field.text];
    }
  }
  return _objectSpread$4(_objectSpread$4({}, field), {}, {
    referencedBobject: referencedBobject
  });
};
var injectReferencesSearchProcess = function injectReferencesSearchProcess(response) {
  var _response$contents;
  var extendedContents = response === null || response === void 0 ? void 0 : (_response$contents = response.contents) === null || _response$contents === void 0 ? void 0 : _response$contents.map(function (bobject) {
    var extendedFields = bobject.fields.map(function (field) {
      return processInjectField(response, field);
    });
    return _objectSpread$4(_objectSpread$4({}, bobject), {}, {
      fields: extendedFields
    });
  });
  return _objectSpread$4(_objectSpread$4({}, response), {}, {
    contents: extendedContents
  });
};
var injectReferencedBobjects = function injectReferencedBobjects(bobject) {
  var extendedFields = bobject.fields.map(function (field) {
    return processInjectField(bobject, field);
  });
  return _objectSpread$4(_objectSpread$4({}, bobject), {}, {
    fields: extendedFields
  });
};
var injectReferencesGetProcess = function injectReferencesGetProcess(response) {
  var _response$fields;
  return _objectSpread$4(_objectSpread$4({}, response), {}, {
    fields: response === null || response === void 0 ? void 0 : (_response$fields = response.fields) === null || _response$fields === void 0 ? void 0 : _response$fields.map(function (field) {
      return processInjectField(response, field);
    })
  });
};
var tabBobjectType = function tabBobjectType(section) {
  switch (section) {
    case PluralBobjectTypes.Lead:
      return BobjectTypes.Lead;
    case PluralBobjectTypes.Opportunity:
      return BobjectTypes.Opportunity;
    default:
      return BobjectTypes.Company;
  }
};
var getBobjectTypeFromPathname = function getBobjectTypeFromPathname(pathname) {
  if (pathname.includes(PluralBobjectTypes.Lead.toLowerCase())) {
    return BobjectTypes.Lead;
  } else if (pathname.includes(PluralBobjectTypes.Opportunity.toLowerCase())) {
    return BobjectTypes.Opportunity;
  } else {
    return BobjectTypes.Company;
  }
};
var isOpportunity = function isOpportunity(bobject) {
  var _bobject$id;
  return (bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.typeName) === BobjectTypes.Opportunity;
};
var isLead = function isLead(bobject) {
  var _bobject$id2;
  return (bobject === null || bobject === void 0 ? void 0 : (_bobject$id2 = bobject.id) === null || _bobject$id2 === void 0 ? void 0 : _bobject$id2.typeName) === BobjectTypes.Lead;
};
var isCompany = function isCompany(bobject) {
  var _bobject$id3;
  return (bobject === null || bobject === void 0 ? void 0 : (_bobject$id3 = bobject.id) === null || _bobject$id3 === void 0 ? void 0 : _bobject$id3.typeName) === BobjectTypes.Company;
};
var isTask = function isTask(bobject) {
  var _bobject$id4;
  return (bobject === null || bobject === void 0 ? void 0 : (_bobject$id4 = bobject.id) === null || _bobject$id4 === void 0 ? void 0 : _bobject$id4.typeName) === BobjectTypes.Task;
};
var isActivity = function isActivity(bobject) {
  var _bobject$id5;
  return (bobject === null || bobject === void 0 ? void 0 : (_bobject$id5 = bobject.id) === null || _bobject$id5 === void 0 ? void 0 : _bobject$id5.typeName) === BobjectTypes.Activity;
};
var isCallActivity = function isCallActivity(bobject) {
  if (isActivity(bobject)) {
    var activityType = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE);
    return (activityType === null || activityType === void 0 ? void 0 : activityType.valueLogicRole) === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL;
  } else {
    return false;
  }
};
var hasRequiredMissing = function hasRequiredMissing(_ref) {
  var _bobjectTypes$findBy, _bobjectFields$filter;
  var bobjectType = _ref.bobjectType,
    bobjectFields = _ref.bobjectFields,
    bobjectTypes = _ref.bobjectTypes,
    bobject = _ref.bobject,
    bobjectConditionalFields = _ref.bobjectConditionalFields;
  var bobjectTypeId = bobjectTypes === null || bobjectTypes === void 0 ? void 0 : (_bobjectTypes$findBy = bobjectTypes.findBy('name')(bobjectType)) === null || _bobjectTypes$findBy === void 0 ? void 0 : _bobjectTypes$findBy.id;
  var requiredFields = (bobjectFields === null || bobjectFields === void 0 ? void 0 : (_bobjectFields$filter = bobjectFields.filterBy('bobjectType', bobjectTypeId)) === null || _bobjectFields$filter === void 0 ? void 0 : _bobjectFields$filter.filter(function (field) {
    return field.required && !!(field !== null && field !== void 0 && field.bobjectFieldGroup) && !(field !== null && field !== void 0 && field.layoutReadOnly);
  })) || [];
  if (!requiredFields || requiredFields.length === 0) {
    return false;
  }
  var requiredFieldsId = requiredFields === null || requiredFields === void 0 ? void 0 : requiredFields.map(function (field) {
    return field.id;
  });
  var values = getFieldsByIds(bobject, requiredFieldsId);
  var conditions = groupBy(bobjectConditionalFields === null || bobjectConditionalFields === void 0 ? void 0 : bobjectConditionalFields.all(), 'bobjectField');
  var valuesWithoutConditions = values === null || values === void 0 ? void 0 : values.filter(function (value) {
    return !conditions[value.name] || conditions[value.name].some(function (condition) {
      return Object.values(bobject.raw.contents).includes(condition.requiredType);
    });
  });
  return valuesWithoutConditions === null || valuesWithoutConditions === void 0 ? void 0 : valuesWithoutConditions.some(function (value) {
    return !value.value;
  });
};
var companyUrl = function companyUrl(company) {
  if (company) {
    return "".concat(APP_CL_COMPANIES, "/").concat(company.id.objectId);
  }
  return APP_CL_COMPANIES;
};
var leadUrl = function leadUrl(lead, company) {
  var _company$id, _lead3, _lead3$id;
  if (typeof lead === 'string') {
    var _lead;
    if (((_lead = lead) === null || _lead === void 0 ? void 0 : _lead.indexOf('/')) > 0) {
      lead = lead.split('/')[2];
    }
    return "".concat(APP_CL_LEADS, "/").concat(lead);
  }
  if (company !== null && company !== void 0 && (_company$id = company.id) !== null && _company$id !== void 0 && _company$id.objectId) {
    var _company$id2, _lead2, _lead2$id;
    return "".concat(APP_CL_COMPANIES, "/").concat(company === null || company === void 0 ? void 0 : (_company$id2 = company.id) === null || _company$id2 === void 0 ? void 0 : _company$id2.objectId, "?leadId=").concat((_lead2 = lead) === null || _lead2 === void 0 ? void 0 : (_lead2$id = _lead2.id) === null || _lead2$id === void 0 ? void 0 : _lead2$id.value);
  }
  return "".concat(APP_CL_LEADS, "/").concat((_lead3 = lead) === null || _lead3 === void 0 ? void 0 : (_lead3$id = _lead3.id) === null || _lead3$id === void 0 ? void 0 : _lead3$id.objectId);
};
var getReferencedBobject = function getReferencedBobject(bobject) {
  var _bobject$id6, _getFieldByLogicRole, _FIELDS_LOGIC_ROLE, _getFieldByLogicRole2, _FIELDS_LOGIC_ROLE2, _getFieldByLogicRole3, _FIELDS_LOGIC_ROLE3;
  var bobjectType = bobject === null || bobject === void 0 ? void 0 : (_bobject$id6 = bobject.id) === null || _bobject$id6 === void 0 ? void 0 : _bobject$id6.typeName;
  var relatedCompany = (_getFieldByLogicRole = getFieldByLogicRole(bobject, (_FIELDS_LOGIC_ROLE = FIELDS_LOGIC_ROLE[bobjectType]) === null || _FIELDS_LOGIC_ROLE === void 0 ? void 0 : _FIELDS_LOGIC_ROLE.COMPANY)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.referencedBobject;
  var relatedLead = (_getFieldByLogicRole2 = getFieldByLogicRole(bobject, (_FIELDS_LOGIC_ROLE2 = FIELDS_LOGIC_ROLE[bobjectType]) === null || _FIELDS_LOGIC_ROLE2 === void 0 ? void 0 : _FIELDS_LOGIC_ROLE2.LEAD)) === null || _getFieldByLogicRole2 === void 0 ? void 0 : _getFieldByLogicRole2.referencedBobject;
  var relatedOpportunity = (_getFieldByLogicRole3 = getFieldByLogicRole(bobject, (_FIELDS_LOGIC_ROLE3 = FIELDS_LOGIC_ROLE[bobjectType]) === null || _FIELDS_LOGIC_ROLE3 === void 0 ? void 0 : _FIELDS_LOGIC_ROLE3.OPPORTUNITY)) === null || _getFieldByLogicRole3 === void 0 ? void 0 : _getFieldByLogicRole3.referencedBobject;
  var getMainBobject = function getMainBobject() {
    if (relatedOpportunity) return relatedOpportunity;
    if (relatedLead) return relatedLead;
    if (relatedCompany) return relatedCompany;
  };
  var mainBobject = getMainBobject();
  return mainBobject ? mainBobject : bobject;
};
function getStageField(dataModel, bobjectType) {
  if (!dataModel || !bobjectType) {
    return undefined;
  }
  var fieldsByBobjectType = dataModel.getFieldsByBobjectType(bobjectType);
  if (!fieldsByBobjectType) return undefined;
  return fieldsByBobjectType === null || fieldsByBobjectType === void 0 ? void 0 : fieldsByBobjectType.find(function (_ref2) {
    var name = _ref2.name;
    return name.includes('Stage');
  });
}

/** Returns whether a bobject is in sales or not. Needs DataModel when bobject
 * is an ExtensionBobject. If you are sure bobject is of type Bobject, you can pass
 * dataModel as undefined.
 *
 * @param dataModel DataModelResponse type
 * @param bobject Accepts both Bobject and ExtensionBobject types
 */
function getIsSales(dataModel, bobject) {
  var _bobject$id$typeName, _bobject$id7;
  var bobjectType = (_bobject$id$typeName = bobject === null || bobject === void 0 ? void 0 : (_bobject$id7 = bobject.id) === null || _bobject$id7 === void 0 ? void 0 : _bobject$id7.typeName) !== null && _bobject$id$typeName !== void 0 ? _bobject$id$typeName : bobject.bobjectType;
  if (!bobjectType) return undefined;
  if (bobjectType === BobjectTypes.Opportunity) return true;
  if (bobject !== null && bobject !== void 0 && bobject.rawBobject) {
    var _dataModel$findValueB;
    // bobject is ExtensionBobject
    var stageField = dataModel && getStageField(dataModel, bobjectType);
    var stage = bobject === null || bobject === void 0 ? void 0 : bobject.rawBobject[stageField === null || stageField === void 0 ? void 0 : stageField.id];
    return (dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$findValueB = dataModel.findValueById(stage)) === null || _dataModel$findValueB === void 0 ? void 0 : _dataModel$findValueB.name) === 'Sales';
  } else {
    // bobject is Bobject
    return getTextFromLogicRole(bobject, FIELDS_LOGIC_ROLE[bobjectType].STAGE) === 'Sales';
  }
}
var bobjectPlurals = {
  Activity: 'Activities',
  Company: 'Companies',
  Lead: 'Leads',
  Meeting: 'Meetings',
  Task: 'Tasks',
  Opportunity: 'Opportunities',
  Product: 'Products',
  OpportunityProduct: 'Opportunity Products'
};
var getPluralBobjectName = function getPluralBobjectName(bobjectName, number) {
  if (number > 1) {
    return bobjectPlurals[bobjectName];
  }
  return bobjectName;
};
var getRelatedBobjectTypeName = function getRelatedBobjectTypeName(bobject) {
  var typeName = bobject === null || bobject === void 0 ? void 0 : bobject.id.typeName;
  if (BobjectTypes.Activity === typeName || BobjectTypes.Task === typeName) {
    var _FIELDS_LOGIC_ROLE$ty, _FIELDS_LOGIC_ROLE$ty2;
    var bobjectLead = getValueFromLogicRole(bobject, (_FIELDS_LOGIC_ROLE$ty = FIELDS_LOGIC_ROLE[typeName]) === null || _FIELDS_LOGIC_ROLE$ty === void 0 ? void 0 : _FIELDS_LOGIC_ROLE$ty.LEAD);
    var bobjectOpportunity = getValueFromLogicRole(bobject, (_FIELDS_LOGIC_ROLE$ty2 = FIELDS_LOGIC_ROLE[typeName]) === null || _FIELDS_LOGIC_ROLE$ty2 === void 0 ? void 0 : _FIELDS_LOGIC_ROLE$ty2.OPPORTUNITY);
    typeName = BobjectTypes.Company;
    if (bobjectLead) {
      typeName = BobjectTypes.Lead;
    }
    if (bobjectOpportunity) {
      typeName = BobjectTypes.Opportunity;
    }
  }
  return typeName;
};
var getExtensionBobjectByIdFields = function getExtensionBobjectByIdFields(bobjectIdFields) {
  if (bobjectIdFields !== null && bobjectIdFields !== void 0 && bobjectIdFields.typeName && bobjectIdFields !== null && bobjectIdFields !== void 0 && bobjectIdFields.objectId) {
    var _PluralBobjectTypes$b;
    return api.get("/linkedin/".concat((_PluralBobjectTypes$b = PluralBobjectTypes[bobjectIdFields === null || bobjectIdFields === void 0 ? void 0 : bobjectIdFields.typeName]) === null || _PluralBobjectTypes$b === void 0 ? void 0 : _PluralBobjectTypes$b.toLowerCase(), "/").concat(bobjectIdFields === null || bobjectIdFields === void 0 ? void 0 : bobjectIdFields.objectId));
  }
  return Promise.resolve({
    data: null
  });
};
function getLeadById(leadId, accountId) {
  var _useSWR = useSWR("/Lead/".concat(leadId, "/form"), /*#__PURE__*/_asyncToGenerator$5( /*#__PURE__*/_regeneratorRuntime$5().mark(function _callee() {
      return _regeneratorRuntime$5().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", api.get("/bobjects/".concat(accountId, "/Lead/").concat(leadId, "/form")).then(function (data) {
              return injectReferencesSearchProcess(data === null || data === void 0 ? void 0 : data.data);
            }));
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))),
    lead = _useSWR.data;
  return {
    lead: lead
  };
}
function getOpportunityById(opportunityId, accountId) {
  var _useSWR2 = useSWR("/Opportunity/".concat(opportunityId, "/form"), /*#__PURE__*/_asyncToGenerator$5( /*#__PURE__*/_regeneratorRuntime$5().mark(function _callee2() {
      return _regeneratorRuntime$5().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", api.get("/bobjects/".concat(accountId, "/Opportunity/").concat(opportunityId, "/form")).then(function (data) {
              return injectReferencesSearchProcess(data === null || data === void 0 ? void 0 : data.data);
            }));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))),
    opportunity = _useSWR2.data;
  return {
    opportunity: opportunity
  };
}

/**
 * Composed lead Id
 * @param leadId
 */
function convertLeadInBloobirds(_x) {
  return _convertLeadInBloobirds.apply(this, arguments);
}
function _convertLeadInBloobirds() {
  _convertLeadInBloobirds = _asyncToGenerator$5( /*#__PURE__*/_regeneratorRuntime$5().mark(function _callee4(leadId) {
    return _regeneratorRuntime$5().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return api.put("/bobjects/".concat(leadId, "/convert"), {
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            data: {}
          });
        case 2:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _convertLeadInBloobirds.apply(this, arguments);
}
function getMainBobjectIcon(bobjectType) {
  switch (bobjectType) {
    case BobjectTypes.Company:
      return 'company';
    case BobjectTypes.Lead:
      return 'person';
    case BobjectTypes.Opportunity:
      return 'fileOpportunity';
    default:
      return undefined;
  }
}
var removeDulpicatedBobjects = function removeDulpicatedBobjects(bobjects) {
  var uniqueValues = new Set();
  return bobjects === null || bobjects === void 0 ? void 0 : bobjects.filter(function (item) {
    if (!uniqueValues.has(item.id.objectId)) {
      uniqueValues.add(item.id.objectId);
      return true;
    }
    return false;
  });
};
var updateBobject = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator$5( /*#__PURE__*/_regeneratorRuntime$5().mark(function _callee3(bobjectId, data, callback) {
    return _regeneratorRuntime$5().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return api.patch('/bobjects/' + bobjectId + '/raw', data);
        case 3:
          callback === null || callback === void 0 ? void 0 : callback(data);
          _context3.next = 9;
          break;
        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 6]]);
  }));
  return function updateBobject(_x2, _x3, _x4) {
    return _ref5.apply(this, arguments);
  };
}();
var convertIdValueToIdObject = function convertIdValueToIdObject(id) {
  return {
    value: id,
    typeName: id === null || id === void 0 ? void 0 : id.split('/')[1],
    objectId: id === null || id === void 0 ? void 0 : id.split('/')[2],
    accountId: id === null || id === void 0 ? void 0 : id.split('/')[0]
  };
};
function forgeIdFieldsFromIdValue(idValue) {
  var _idValue$split = idValue.split('/'),
    _idValue$split2 = _slicedToArray$1(_idValue$split, 3),
    accountId = _idValue$split2[0],
    typeName = _idValue$split2[1],
    objectId = _idValue$split2[2];
  return {
    accountId: accountId,
    typeName: typeName,
    objectId: objectId,
    value: idValue
  };
}
var isComposedId = function isComposedId(id) {
  var _id$split;
  return (id === null || id === void 0 ? void 0 : (_id$split = id.split('/')) === null || _id$split === void 0 ? void 0 : _id$split.length) > 1;
};

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }
function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function isUTCDateString(str) {
  var regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(Z|\+\d{4})$/;
  return regex.test(str);
}
function convertTo24HourFormat(timeString, period) {
  // Split the time string into hours and minutes
  var _ref = (timeString === null || timeString === void 0 ? void 0 : timeString.split(':')) || ['00', '00'],
    _ref2 = _slicedToArray(_ref, 2),
    hours = _ref2[0],
    minutes = _ref2[1];

  // Convert to 24-hour format
  if (period === 'pm' && hours !== '12') {
    hours = String(Number(hours) + 12);
  }
  if (period === 'am' && hours === '12') {
    hours = '00';
  }
  return "".concat(hours, ":").concat(minutes);
}

/**
 * @deprecated use getISOShortFormattedDate instead
 */
var getSimpleDate = function getSimpleDate(date) {
  if (!date) {
    throw new Error('Date parameter is required');
  }
  return format(date, 'yyyy-LL-dd');
};
var getDateRange = function getDateRange(_ref3) {
  var startingDate = _ref3.startingDate,
    _ref3$pastRange = _ref3.pastRange,
    pastRange = _ref3$pastRange === void 0 ? 15 : _ref3$pastRange,
    _ref3$futureRange = _ref3.futureRange,
    futureRange = _ref3$futureRange === void 0 ? 3 : _ref3$futureRange,
    _ref3$includeToday = _ref3.includeToday,
    includeToday = _ref3$includeToday === void 0 ? true : _ref3$includeToday;
  var pastDays = Array.from({
    length: pastRange
  }, function (v, k) {
    return k + 1;
  }).map(function (i) {
    return subDays(startingDate, i);
  });
  var thisDay = includeToday ? [startingDate] : [];
  var futureDays = Array.from({
    length: futureRange
  }, function (v, k) {
    return k + 1;
  }).map(function (i) {
    return addDays(startingDate, i);
  });
  return pastDays.concat(thisDay, futureDays).map(function (d) {
    return getSimpleDate(d);
  });
};
var getRangeBetweenDates = function getRangeBetweenDates(startDate, endDate) {
  var formatPattern = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'yyyy-MM-dd';
  var days = differenceInDays(new Date(endDate), new Date(startDate));
  return Array(days + 1).map(function (x, i) {
    return format(addDays(new Date(startDate), i), formatPattern);
  });
};
var getWeeksInMonth = function getWeeksInMonth(date, dirtyOptions) {
  return getWeeksInMonth$1(date, dirtyOptions);
};
var getTimeZoneLocationPosition = function getTimeZoneLocationPosition(completeTimeZone) {
  return completeTimeZone.split(' ', 3).join(' ').length;
};
var getWeekOfMonth = function getWeekOfMonth(date, dirtyOptions) {
  var options = dirtyOptions || {};
  var weekStartsOn = options.weekStartsOn == null ? 0 : options.weekStartsOn;

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  var currentDayOfMonth = getDate(date);
  if (Number.isNaN(currentDayOfMonth)) {
    return currentDayOfMonth;
  }
  var startWeekDay = getDay(startOfMonth(date));
  var lastDayOfFirstWeek;
  if (startWeekDay >= weekStartsOn) {
    lastDayOfFirstWeek = weekStartsOn + 7 - startWeekDay;
  } else {
    lastDayOfFirstWeek = weekStartsOn - startWeekDay;
  }
  var weekNumber = 1;
  if (currentDayOfMonth > lastDayOfFirstWeek) {
    var remainingDaysAfterFirstWeek = currentDayOfMonth - lastDayOfFirstWeek;
    weekNumber += Math.ceil(remainingDaysAfterFirstWeek / 7);
  }
  return weekNumber;
};
var getDayOfWeekStartingFromMonday = function getDayOfWeekStartingFromMonday(date) {
  return getDay(date) - 1 === -1 ? 6 : getDay(date) - 1;
};
var getDayAndWeekNumberFromDate = function getDayAndWeekNumberFromDate(_ref4) {
  var date = _ref4.date;
  var numbers = {
    dayNumber: 0,
    weekNumber: 0
  };
  numbers.dayNumber = getDayOfWeekStartingFromMonday(date);
  numbers.weekNumber = getWeekOfMonth(date, {
    weekStartsOn: 1
  }) - 1;
  return numbers;
};
var isToday = function isToday(date, userTimezone) {
  var dateTime = spacetime(date)["goto"](userTimezone);
  var startOfDay = spacetime.today().startOf('day');
  var endOfDay = spacetime.today().endOf('day');
  return (dateTime.isBefore(endOfDay) || dateTime.isEqual(endOfDay)) && (dateTime.isAfter(startOfDay) || dateTime.isEqual(startOfDay));
};
var isTomorrow = function isTomorrow(date) {
  return isSameDay$1(date, addDays(new Date(), 1));
};
var isBeforeToday = function isBeforeToday(date, userTimezone) {
  return spacetime(date)["goto"](userTimezone).isBefore(spacetime.today().startOf('day'));
};
var isAfterToday = function isAfterToday(date, userTimezone) {
  return spacetime(date)["goto"](userTimezone).isAfter(spacetime.today().endOf('day'));
};
var isAfterTomorrow = function isAfterTomorrow(date) {
  return isAfter(date, addDays(startOfDay(new Date()), 1));
};
var isWeekend = function isWeekend(date) {
  return isWeekend$1(date);
};
var isSameDay = function isSameDay(date1, date2) {
  return isSameDay$1(date1, date2);
};
var intervalDaysOfMonth = function intervalDaysOfMonth(_ref5) {
  var date = _ref5.date;
  return eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date)
  });
};
var lastWeekOfPrevMonth = function lastWeekOfPrevMonth(_ref6) {
  var date = _ref6.date;
  var start = startOfWeek(startOfMonth(date), {
    weekStartsOn: 1
  });
  var end = subDays(startOfMonth(date), 1);
  return isBefore(end, start) ? [] : eachDayOfInterval({
    start: start,
    end: end
  });
};
var firstWeekOfNextMonth = function firstWeekOfNextMonth(_ref7) {
  var date = _ref7.date;
  var start = addDays(endOfMonth(date), 1);
  var end = endOfWeek(endOfMonth(date), {
    weekStartsOn: 1
  });
  return isAfter(start, end) ? [] : eachDayOfInterval({
    start: start,
    end: end
  });
};
var isAfterDate = function isAfterDate(dateToCompare, date) {
  return isAfter(dateToCompare, date);
};
var isSameDayDate = function isSameDayDate(dateLeft, dateRight) {
  return isSameDay(dateLeft, dateRight);
};
var addMonth = function addMonth(date) {
  var numberOfMonth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return addMonths(date, numberOfMonth);
};
var addMinutes = function addMinutes(date, minutes) {
  return addMinutes$1(date, minutes);
};
var subMinutes = function subMinutes(date, minutes) {
  return subMinutes$1(date, minutes);
};
var subMonth = function subMonth(date) {
  var numberOfMonth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return subMonths(date, numberOfMonth);
};
var formatDate = function formatDate(date, formatString) {
  if (!date) {
    throw new Error('date parameter is required');
  }
  return format(date, formatString);
};
var formatDistance = function formatDistance(date1, date2) {
  if (!date1 || !date2) {
    throw new Error('date parameter is required');
  }
  return formatDistance$1(date1, date2);
};
var formatDistanceToNow = function formatDistanceToNow(date) {
  if (!date) {
    throw new Error('date parameter is required');
  }
  return formatDistanceToNow$1(date);
};
var formatSecondToElapsedTime = function formatSecondToElapsedTime(seconds) {
  var helperDate = addSeconds(new Date(1970, 0, 1), seconds);
  return format(helperDate, 'HH:mm:ss');
};
var today = function today() {
  return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);
};
var transformCalendarEventDate = function transformCalendarEventDate(dateTime) {
  var applyTZOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var min = dateTime.getMinutes();
  var month = dateTime.getMonth() + 1;
  var year = dateTime.getFullYear();
  if (applyTZOffset) {
    hour += dateTime.getTimezoneOffset() / 60;
  }
  var monthStr = "0".concat(month).slice(-2);
  var hourStr = "0".concat(hour).slice(-2);
  var minStr = "0".concat(min).slice(-2);
  var dayStr = "0".concat(day).slice(-2);
  return {
    year: year,
    monthStr: monthStr,
    hourStr: hourStr,
    minStr: minStr,
    dayStr: dayStr
  };
};
var parseTimeToDatetime = function parseTimeToDatetime(timeToParse) {
  var unitTime = timeToParse.substr(-1);
  var time = Number.parseInt(timeToParse.substr(0, timeToParse.length - 1));
  var todayTime = new Date().getTime();
  var convert = 60 * 1000;
  if (unitTime === 'M') {
    return addMonths(new Date(), time);
  }
  if (unitTime === 'h') {
    convert = 60 * 60 * 1000;
  }
  if (unitTime === 'd') {
    convert = 24 * 60 * 60 * 1000;
  }
  return new Date(todayTime + convert * time);
};
var getDateFormatted = function getDateFormatted(date) {
  if ((date === null || date === void 0 ? void 0 : date.indexOf('T')) > 0) {
    return "".concat(date.split('T')[0].split('-').map(function (x) {
      if (x.length <= 1) {
        return "0".concat(x);
      }
      return x;
    }).join('-'), "T").concat(date.split('T')[1].split(':').map(function (x) {
      if (x.length <= 1) {
        return "0".concat(x);
      }
      return x;
    }).join(':'));
  }
  return date.split('-').map(function (x) {
    if (x.length <= 1) {
      return "0".concat(x);
    }
    return x;
  }).join('-');
};
var formatDateAsText = function formatDateAsText() {
  if (arguments.length === 1) {
    if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'string' || (arguments.length <= 0 ? undefined : arguments[0]) instanceof Date) {
      return formatOld({
        text: arguments.length <= 0 ? undefined : arguments[0],
        t: undefined
      });
    }
    if ((arguments.length <= 0 ? undefined : arguments[0]) === undefined) {
      return formatOld({
        text: arguments.length <= 0 ? undefined : arguments[0],
        t: undefined
      });
    }
    return formatOld(arguments.length <= 0 ? undefined : arguments[0]);
  }
  return formatOld({
    text: arguments.length <= 0 ? undefined : arguments[0],
    patternFormat: arguments.length <= 1 ? undefined : arguments[1],
    t: undefined
  });
};
var formatOld = function formatOld(_ref8) {
  var text = _ref8.text,
    _ref8$patternFormat = _ref8.patternFormat,
    patternFormat = _ref8$patternFormat === void 0 ? '{month} {date-ordinal}, {year}' : _ref8$patternFormat,
    _ref8$timeZone = _ref8.timeZone,
    timeZone = _ref8$timeZone === void 0 ? getUserTimeZone() : _ref8$timeZone,
    t = _ref8.t;
  return text ? getI18nSpacetimeLng(undefined, text, timeZone).format(patternFormat) : t ? t('common.never') : 'Never';
};
var generateDatePrefix = function generateDatePrefix(date) {
  var diffDatePrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var t = arguments.length > 2 ? arguments[2] : undefined;
  if (!date) {
    return t('common.never');
  }
  if (isToday(date, getUserTimeZone())) {
    return t ? t('common.today') : 'Today';
  }
  if (isYesterday(date)) {
    return t ? t('common.yesterday') : 'Yesterday';
  }
  if (isTomorrow(date)) {
    return t ? t('common.tomorrow') : 'Tomorrow';
  }
  if (diffDatePrefix) {
    var diffDays = differenceInCalendarDays(date, new Date());
    if (diffDays > 30 || diffDays < -30) {
      var patternFormat = "{month-short} {date}".concat(diffDays < -365 || diffDays > 365 ? ' {year}' : '');
      return formatDateAsText({
        text: date,
        patternFormat: patternFormat,
        t: t
      });
    }
    if (t) {
      return diffDays > 0 ? t('common.inDays', {
        days: diffDays
      }) : t('common.daysAgo', {
        days: -diffDays
      });
    } else {
      var _diffDays = differenceInCalendarDays(date, new Date());
      return _diffDays > 0 ? "In ".concat(_diffDays, " days") : "".concat(-_diffDays, " days ago");
    }
  }
  return '';
};
var getDateTimestampString = function getDateTimestampString(date) {
  return date.getTime().toString();
};
var getLocationFromCompleteTimeZone = function getLocationFromCompleteTimeZone(timezone) {
  var positionValue = getTimeZoneLocationPosition(timezone);
  return timezone.substring(positionValue + 1).replace(' ', '_');
};
var getUTCFromCompleteTimeZone = function getUTCFromCompleteTimeZone(timeZone) {
  var positionValue = getTimeZoneLocationPosition(timeZone);
  return timeZone.substring(0, positionValue);
};
var convertLocationToHourMinutes = function convertLocationToHourMinutes(timeZoneLocation) {
  var timeZoneFormatter = Intl.DateTimeFormat([], {
    timeZone: timeZoneLocation,
    hour: '2-digit',
    minute: '2-digit'
  });
  return timeZoneFormatter.format(new Date());
};

/**
 * @deprecated use parseTimeToDatetime instead
 */
var getUTCDate = function getUTCDate(date) {
  return new Date(new Date(date).getTime() - new Date(date).getTimezoneOffset() * 60000);
};
var getRoundedDateTime = function getRoundedDateTime(minutes) {
  var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var ms = 1000 * 60 * minutes; // convert minutes to ms
  var date = new Date(Math.round(d.getTime() / ms) * ms);
  return date.toISOString();
};
var getDifferenceInMinutes = function getDifferenceInMinutes(_ref9) {
  var _ref9$startDate = _ref9.startDate,
    startDate = _ref9$startDate === void 0 ? Date.now() : _ref9$startDate,
    endDate = _ref9.endDate;
  var diff = new Date(endDate).getTime() - new Date(startDate).getTime();
  return Math.ceil(diff / 60000);
};
var getDifferenceInHours = function getDifferenceInHours(_ref10) {
  var _ref10$startDate = _ref10.startDate,
    startDate = _ref10$startDate === void 0 ? Date.now() : _ref10$startDate,
    endDate = _ref10.endDate;
  var diff = new Date(endDate).getTime() - new Date(startDate).getTime();
  return Math.ceil(diff / 3600000);
};
var getDifferenceInDays = function getDifferenceInDays(_ref11) {
  var _ref11$startDate = _ref11.startDate,
    startDate = _ref11$startDate === void 0 ? Date.now() : _ref11$startDate,
    endDate = _ref11.endDate;
  var diff = new Date(endDate).getTime() - new Date(startDate).getTime();
  return Math.ceil(diff / 86400000);
};
var addHoursToStringDate = function addHoursToStringDate(date) {
  return date !== null && date !== void 0 && date.includes('T') ? date : "".concat(date, "T00:00:00.000");
};
var isDifferentYearThanCurrent = function isDifferentYearThanCurrent(date) {
  return new Date().getFullYear() !== new Date(date).getFullYear();
};
var getUserTimeZone = function getUserTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

/**
 * It returns the corrected day for a given UTC date. If the date is in full ISO format (e.g. 2020-01-01T00:00:00.000Z) it trims the time part.
 * Example: If a task is set for 2020-01-01T00:00:00.000Z, the returned date will be 2020-01-01T00:00:00.000Z on the local timezone of the user.
 * If a task is set for 2020-01-01 the returned date will be 2020-01-01T00:00:00.000Z on the local timezone of the user.
 *
 * @param {string} date
 * @param {string} timeZone if it's not declared not it would take the user computer timezone
 * @returns {Date} the corrected js date
 */
function parseUTCDateToLocal(date) {
  var _date;
  var timeZone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getUserTimeZone();
  var regexDateWithTime = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(.[0-9]{3})?(zZ)/g;
  if ((_date = date) !== null && _date !== void 0 && _date.match(regexDateWithTime)) {
    var utcDate = spacetime(date, 'UTC');
    date = utcDate.format('iso-short');
  }
  var s = spacetime(date, timeZone);
  return s.toNativeDate();
}
function parseUTCDateTimeToLocal(date) {
  var timeZone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getUserTimeZone();
  var s = spacetime(date, timeZone);
  return s.toNativeDate();
}

/**
 * It returns the string formatted day (YYYY-MM-DD) for a given UTC date. If the date is in full ISO format (e.g. 2020-01-01T00:00:00.000Z) it trims the time part.
 *
 * @param {string} date
 * @param {string} timeZone
 * @returns {String} the ISO short formatted date (YYYY-MM-DD)
 */
function getISOShortFormattedDate(date, timeZone) {
  var s = parseUTCDateToLocal(date, timeZone);
  return spacetime(s, timeZone).format('iso-short');
}

/**
 * It returns the string formatted day (YYYY-MM-DD)
 *
 * @param {Date} date
 */
function getISODate(date) {
  return "".concat(date.getFullYear(), "-").concat("0".concat(date.getMonth() + 1).slice(-2), "-").concat("0".concat(date.getDate()).slice(-2));
}
function add(date, unit, amount) {
  switch (unit) {
    case 'days':
      return addDays(date, amount);
    case 'hours':
      return addHours(date, amount);
    case 'minutes':
    default:
      return addMinutes(date, amount);
  }
}
function checkTZMatching(tzAbbreviation, timezoneName) {
  var _abbreviationMap$tzAb;
  var abbreviationMap = {
    ACST: ['Australia/Adelaide', 'Australia/Broken_Hill', 'Australia/Darwin', 'Australia/North', 'Australia/South', 'Australia/Yancowinna'],
    AEST: ['Antarctica/Macquarie', 'Australia/ACT', 'Australia/Brisbane', 'Australia/Canberra', 'Australia/Currie', 'Australia/Hobart', 'Australia/Lindeman', 'Australia/Melbourne', 'Australia/NSW', 'Australia/Queensland', 'Australia/Sydney', 'Australia/Tasmania', 'Australia/Victoria'],
    AKST: ['America/Anchorage', 'America/Juneau', 'America/Metlakatla', 'America/Nome', 'America/Sitka', 'America/Yakutat', 'US/Alaska'],
    AST: ['America/Anguilla', 'America/Antigua', 'America/Aruba', 'America/Barbados', 'America/Blanc-Sablon', 'America/Curacao', 'America/Dominica', 'America/Glace_Bay', 'America/Goose_Bay', 'America/Grenada', 'America/Guadeloupe', 'America/Halifax', 'America/Kralendijk', 'America/Lower_Princes', 'America/Marigot', 'America/Martinique', 'America/Moncton', 'America/Montserrat', 'America/Port_of_Spain', 'America/Puerto_Rico', 'America/Santo_Domingo', 'America/St_Barthelemy', 'America/St_Kitts', 'America/St_Lucia', 'America/St_Thomas', 'America/St_Vincent', 'America/Thule', 'America/Tortola', 'America/Virgin', 'Atlantic/Bermuda', 'Canada/Atlantic'],
    AWST: ['Australia/Perth', 'Australia/West'],
    CAT: ['Africa/Blantyre', 'Africa/Bujumbura', 'Africa/Gaborone', 'Africa/Harare', 'Africa/Juba', 'Africa/Khartoum', 'Africa/Kigali', 'Africa/Lubumbashi', 'Africa/Lusaka', 'Africa/Maputo', 'Africa/Windhoek'],
    CET: ['Africa/Algiers', 'Africa/Ceuta', 'Africa/Tunis', 'Arctic/Longyearbyen', 'Atlantic/Jan_Mayen', 'CET', 'Europe/Amsterdam', 'Europe/Andorra', 'Europe/Belgrade', 'Europe/Berlin', 'Europe/Bratislava', 'Europe/Brussels', 'Europe/Budapest', 'Europe/Busingen', 'Europe/Copenhagen', 'Europe/Gibraltar', 'Europe/Ljubljana', 'Europe/Luxembourg', 'Europe/Madrid', 'Europe/Malta', 'Europe/Monaco', 'Europe/Oslo', 'Europe/Paris', 'Europe/Podgorica', 'Europe/Prague', 'Europe/Rome', 'Europe/San_Marino', 'Europe/Sarajevo', 'Europe/Skopje', 'Europe/Stockholm', 'Europe/Tirane', 'Europe/Vaduz', 'Europe/Vatican', 'Europe/Vienna', 'Europe/Warsaw', 'Europe/Zagreb', 'Europe/Zurich', 'Poland'],
    ChST: ['Pacific/Guam', 'Pacific/Saipan'],
    CST: ['America/Bahia_Banderas', 'America/Belize', 'America/Chicago', 'America/Chihuahua', 'America/Costa_Rica', 'America/El_Salvador', 'America/Guatemala', 'America/Havana', 'America/Indiana/Knox', 'America/Indiana/Tell_City', 'America/Knox_IN', 'America/Managua', 'America/Matamoros', 'America/Menominee', 'America/Merida', 'America/Mexico_City', 'America/Monterrey', 'America/North_Dakota/Beulah', 'America/North_Dakota/Center', 'America/North_Dakota/New_Salem', 'America/Ojinaga', 'America/Rainy_River', 'America/Rankin_Inlet', 'America/Regina', 'America/Resolute', 'America/Swift_Current', 'America/Tegucigalpa', 'America/Winnipeg', 'Asia/Chongqing', 'Asia/Chungking', 'Asia/Harbin', 'Asia/Macao', 'Asia/Macau', 'Asia/Shanghai', 'Asia/Taipei', 'Canada/Central', 'Canada/Saskatchewan', 'CST6CDT', 'Cuba', 'Mexico/General', 'PRC', 'ROC', 'US/Central', 'US/Indiana-Starke'],
    EAT: ['Africa/Addis_Ababa', 'Africa/Asmara', 'Africa/Asmera', 'Africa/Dar_es_Salaam', 'Africa/Djibouti', 'Africa/Kampala', 'Africa/Mogadishu', 'Africa/Nairobi', 'Indian/Antananarivo', 'Indian/Comoro', 'Indian/Mayotte'],
    EET: ['Africa/Cairo', 'Africa/Tripoli', 'Asia/Beirut', 'Asia/Famagusta', 'Asia/Gaza', 'Asia/Hebron', 'Asia/Nicosia', 'EET', 'Egypt', 'Europe/Athens', 'Europe/Bucharest', 'Europe/Chisinau', 'Europe/Helsinki', 'Europe/Kaliningrad', 'Europe/Kiev', 'Europe/Kyiv', 'Europe/Mariehamn', 'Europe/Nicosia', 'Europe/Riga', 'Europe/Sofia', 'Europe/Tallinn', 'Europe/Tiraspol', 'Europe/Uzhgorod', 'Europe/Vilnius', 'Europe/Zaporozhye', 'Libya'],
    EST: ['America/Atikokan', 'America/Cancun', 'America/Cayman', 'America/Coral_Harbour', 'America/Detroit', 'America/Fort_Wayne', 'America/Grand_Turk', 'America/Indiana/Indianapolis', 'America/Indiana/Marengo', 'America/Indiana/Petersburg', 'America/Indiana/Vevay', 'America/Indiana/Vincennes', 'America/Indiana/Winamac', 'America/Indianapolis', 'America/Iqaluit', 'America/Jamaica', 'America/Kentucky/Louisville', 'America/Kentucky/Monticello', 'America/Louisville', 'America/Montreal', 'America/Nassau', 'America/New_York', 'America/Nipigon', 'America/Panama', 'America/Pangnirtung', 'America/Port-au-Prince', 'America/Thunder_Bay', 'America/Toronto', 'Canada/Eastern', 'EST', 'EST5EDT', 'Jamaica', 'US/East-Indiana', 'US/Eastern', 'US/Michigan'],
    GMT: ['Africa/Abidjan', 'Africa/Accra', 'Africa/Bamako', 'Africa/Banjul', 'Africa/Bissau', 'Africa/Conakry', 'Africa/Dakar', 'Africa/Freetown', 'Africa/Lome', 'Africa/Monrovia', 'Africa/Nouakchott', 'Africa/Ouagadougou', 'Africa/Sao_Tome', 'Africa/Timbuktu', 'America/Danmarkshavn', 'Atlantic/Reykjavik', 'Atlantic/St_Helena', 'Etc/GMT', 'Etc/GMT+0', 'Etc/GMT-0', 'Etc/GMT0', 'Etc/Greenwich', 'Europe/Belfast', 'Europe/Guernsey', 'Europe/Isle_of_Man', 'Europe/Jersey', 'Europe/London', 'GB', 'GB-Eire', 'GMT', 'GMT+0', 'GMT-0', 'GMT0', 'Greenwich', 'Iceland'],
    HKT: ['Asia/Hong_Kong', 'Hongkong'],
    HST: ['America/Adak', 'America/Atka', 'HST', 'Pacific/Honolulu', 'Pacific/Johnston', 'US/Aleutian', 'US/Hawaii'],
    IST: ['Asia/Calcutta', 'Asia/Jerusalem', 'Asia/Kolkata', 'Asia/Tel_Aviv', 'Eire', 'Europe/Dublin', 'Israel'],
    JST: ['Asia/Tokyo', 'Japan'],
    KST: ['Asia/Pyongyang', 'Asia/Seoul', 'ROK'],
    MET: ['MET', 'Europe/Kirov'],
    MSK: ['Europe/Moscow', 'Europe/Simferopol', 'Europe/Volgograd', 'W-SU'],
    MST: ['America/Boise', 'America/Cambridge_Bay', 'America/Ciudad_Juarez', 'America/Creston', 'America/Dawson', 'America/Dawson_Creek', 'America/Denver', 'America/Edmonton', 'America/Fort_Nelson', 'America/Hermosillo', 'America/Inuvik', 'America/Mazatlan', 'America/Phoenix', 'America/Shiprock', 'America/Whitehorse', 'America/Yellowknife', 'Canada/Mountain', 'Canada/Yukon', 'Mexico/BajaSur', 'MST', 'MST7MDT', 'Navajo', 'US/Arizona', 'US/Mountain'],
    NST: ['America/St_Johns', 'Canada/Newfoundland'],
    NZST: ['Antarctica/McMurdo', 'Antarctica/South_Pole', 'NZ', 'Pacific/Auckland'],
    PHT: ['Asia/Manila'],
    PKT: ['Asia/Karachi'],
    PST: ['America/Ensenada', 'America/Los_Angeles', 'America/Santa_Isabel', 'America/Tijuana', 'America/Vancouver', 'Canada/Pacific', 'Mexico/BajaNorte', 'PST8PDT', 'US/Pacific'],
    SAST: ['Africa/Johannesburg', 'Africa/Maseru', 'Africa/Mbabane'],
    SST: ['Pacific/Midway', 'Pacific/Pago_Pago', 'Pacific/Samoa', 'US/Samoa'],
    UTC: ['Etc/UCT', 'Etc/Universal', 'Etc/UTC', 'Etc/Zulu', 'UCT', 'Universal', 'UTC', 'Zulu'],
    WAT: ['Africa/Bangui', 'Africa/Brazzaville', 'Africa/Douala', 'Africa/Kinshasa', 'Africa/Lagos', 'Africa/Libreville', 'Africa/Luanda', 'Africa/Malabo', 'Africa/Ndjamena', 'Africa/Niamey', 'Africa/Porto-Novo'],
    WET: ['Atlantic/Canary', 'Atlantic/Faeroe', 'Atlantic/Faroe', 'Atlantic/Madeira', 'Europe/Lisbon', 'Portugal', 'WET'],
    WIB: ['Asia/Jakarta', 'Asia/Pontianak'],
    WIT: ['Asia/Jayapura', 'Asia/Makassar', 'Asia/Ujung_Pandang']
  };
  if (tzAbbreviation !== null && tzAbbreviation !== void 0 && tzAbbreviation.includes('/')) {
    return tzAbbreviation;
  }
  return (_abbreviationMap$tzAb = abbreviationMap[tzAbbreviation]) === null || _abbreviationMap$tzAb === void 0 ? void 0 : _abbreviationMap$tzAb.includes(timezoneName);
}

function _toConsumableArray$2(arr) { return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$3(arr) || _nonIterableSpread$2(); }
function _nonIterableSpread$2() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }
function _iterableToArray$2(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$2(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$3(arr); }
function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function getDuration(startTime, endTime) {
  // @ts-ignore
  var diff = new Date(endTime) - new Date(startTime);
  return Math.round(diff / 60000);
}
function createParticipantsFromBloobirdsActivity(event, users) {
  var _users$users;
  var accountExecutive = getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE, true);
  var lead = getReferencedBobjectFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  var leadName =
  //@ts-ignore
  lead && ((lead === null || lead === void 0 ? void 0 : lead.fullName) || getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME, true));
  var leadEmail =
  //@ts-ignore
  lead && ((lead === null || lead === void 0 ? void 0 : lead.email) || getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL, true));
  var activityUser = getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  var user = activityUser && (users === null || users === void 0 ? void 0 : (_users$users = users.users) === null || _users$users === void 0 ? void 0 : _users$users.find(function (u) {
    return (u === null || u === void 0 ? void 0 : u.id) === activityUser;
  }));
  var parsedAccountExecutive = accountExecutive ?
  // @ts-ignore
  {
    name: null,
    email: accountExecutive,
    type: 'AE'
  } : null;
  var parsedLead = lead && {
    name: leadName,
    email: leadEmail,
    type: 'Lead'
  };
  var parsedUser = user && {
    name: user === null || user === void 0 ? void 0 : user.name,
    email: user === null || user === void 0 ? void 0 : user.email,
    type: 'Organizer'
  };
  var participants = new Set([parsedAccountExecutive, parsedLead, parsedUser]);
  return Array.from(participants);
}
function calculateCollisions(events) {
  var collisionMap = {};
  events.forEach(function (event, index) {
    events === null || events === void 0 ? void 0 : events.forEach(function (eventToCompare, otherIndex) {
      if (index !== otherIndex) {
        //The event starts after or at the same time as the event to compare and ends before or at the same time as the event to compare
        if (event.startTimeTimestamp > eventToCompare.startTimeTimestamp && event.startTimeTimestamp < eventToCompare.endTimeTimestamp || event.endTimeTimestamp > eventToCompare.startTimeTimestamp && event.endTimeTimestamp < eventToCompare.endTimeTimestamp || event.startTimeTimestamp < eventToCompare.startTimeTimestamp && event.endTimeTimestamp > eventToCompare.startTimeTimestamp || event.startTimeTimestamp < eventToCompare.endTimeTimestamp && event.endTimeTimestamp > eventToCompare.endTimeTimestamp || event.startTimeTimestamp === eventToCompare.startTimeTimestamp || event.endTimeTimestamp === eventToCompare.endTimeTimestamp) {
          collisionMap[index] = collisionMap[index] ? collisionMap[index]
          // @ts-ignore
          .add(otherIndex) : new Set([otherIndex]);
        }
      }
    });
  });
  events.forEach(function (event, index) {
    // Given the collision map for an event, the collisions is the amount of times the event appears as collisions of other events
    // @ts-ignore
    events.forEach(function (eventToCompare, otherIndex) {
      if (index !== otherIndex) {
        var _collisionMap$otherIn;
        // @ts-ignore
        if ((_collisionMap$otherIn = collisionMap[otherIndex]) !== null && _collisionMap$otherIn !== void 0 && _collisionMap$otherIn.has(index)) {
          event.collisions = event.collisions + 1;
        }
      }
    });

    // @ts-ignore
    if (collisionMap[index] instanceof Set) {
      // @ts-ignore
      var collisionMapSet = collisionMap[index];
      // @ts-ignore
      collisionMapSet.forEach(function (collision) {
        var indexOfCollision = parseInt(collision);
        if (event.collisionNumber === 0 && events[collision].collisions > event.collisions) {
          event.collisionNumber = events[collision].collisionNumber;
          //event.collisions = events[collision].collisions;
        }

        if (index > indexOfCollision) {
          // @ts-ignore
          if (collisionMap[indexOfCollision] instanceof Set) {
            // @ts-ignore
            if (collisionMap[indexOfCollision].has(index)) {
              event.collisionNumber++;
            }
          }
        }
      });
    }
  });
  return events;
}
function parseEvents(events, type, users, selectedTimezone, calendarsWithColors, bannedEvent) {
  if (!events) {
    return {};
  }
  if (!type) {
    return {};
  }
  var eventPerDay = events === null || events === void 0 ? void 0 : events.reduce(function (perDay, event) {
    var _event$when;
    if (event !== null && event !== void 0 && (_event$when = event.when) !== null && _event$when !== void 0 && _event$when.startTime && (event === null || event === void 0 ? void 0 : event.status) !== 'cancelled' && (event === null || event === void 0 ? void 0 : event.id) !== bannedEvent) {
      var _event$when2, _event$when3;
      var startSpaceTimeDate = spacetime(event === null || event === void 0 ? void 0 : (_event$when2 = event.when) === null || _event$when2 === void 0 ? void 0 : _event$when2.startTime);
      var date = startSpaceTimeDate["goto"](selectedTimezone || getUserTimeZone()).format('iso-short');
      var endSpaceTimeDate = spacetime(event === null || event === void 0 ? void 0 : (_event$when3 = event.when) === null || _event$when3 === void 0 ? void 0 : _event$when3.endTime);
      var endDate = endSpaceTimeDate["goto"](selectedTimezone || getUserTimeZone()).format('iso-short');
      var colorEvent = calendarsWithColors === null || calendarsWithColors === void 0 ? void 0 : calendarsWithColors.find(function (c) {
        return (c === null || c === void 0 ? void 0 : c.calendarId) === event.calendarId;
      });
      if (date === endDate) {
        var _event$when4, _event$when5, _event$when6, _event$when7, _event$when8;
        perDay[date] = [].concat(_toConsumableArray$2(perDay[date] || []), [{
          duration: getDuration((_event$when4 = event.when) === null || _event$when4 === void 0 ? void 0 : _event$when4.startTime, (_event$when5 = event.when) === null || _event$when5 === void 0 ? void 0 : _event$when5.endTime),
          id: event.id,
          title: event.title,
          startTime: (_event$when6 = event.when) === null || _event$when6 === void 0 ? void 0 : _event$when6.startTime,
          endTime: (_event$when7 = event.when) === null || _event$when7 === void 0 ? void 0 : _event$when7.endTime,
          startTimeTimestamp: startSpaceTimeDate.epoch,
          endTimeTimestamp: endSpaceTimeDate.epoch,
          participants: event.participants,
          collisions: 0,
          collisionNumber: 0,
          day: spacetime((_event$when8 = event.when) === null || _event$when8 === void 0 ? void 0 : _event$when8.startTime).startOf('day').format('iso-short'),
          type: 'nylas',
          calendarId: event.calendarId,
          backgroundColor: colorEvent === null || colorEvent === void 0 ? void 0 : colorEvent.color,
          barColor: colorEvent === null || colorEvent === void 0 ? void 0 : colorEvent.barColor,
          owner: event.owner
        }]);
      }
    } else if (getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.TIME)) {
      var _event$id;
      var spacetimeStartDatetime = spacetime(getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.TIME));
      var startDatetime = useGetI18nSpacetime(spacetimeStartDatetime, selectedTimezone || getUserTimeZone());
      var duration = parseInt(getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION), 10) || 60;
      var endDatetime = useGetI18nSpacetime(spacetimeStartDatetime, selectedTimezone || getUserTimeZone()).add(duration, 'minute');
      var _date = spacetimeStartDatetime.format('iso-short');
      perDay[_date] = [].concat(_toConsumableArray$2(perDay[_date] || []), [{
        duration: duration,
        id: event === null || event === void 0 ? void 0 : (_event$id = event.id) === null || _event$id === void 0 ? void 0 : _event$id.value,
        title: getValueFromLogicRole(event, ACTIVITY_FIELDS_LOGIC_ROLE.TITLE),
        startTime: startDatetime.format('iso-utc'),
        endTime: endDatetime.format('iso-utc'),
        startTimeTimestamp: startDatetime.epoch,
        endTimeTimestamp: endDatetime.epoch,
        participants: createParticipantsFromBloobirdsActivity(event, users),
        collisions: 0,
        collisionNumber: 0,
        day: spacetime(startDatetime).startOf('day').format('iso-short'),
        type: 'bloobirds',
        calendarId: 'bloobirds-event'
      }]);
    }
    return perDay;
  }, {});

  // Calculate and set the collisions, and the collision number. Two events are considered a collision if their start time is between the start time and the end time of the other.
  Object.keys(eventPerDay).map(function (date) {
    var events = eventPerDay[date];
    var sortedEvents = events === null || events === void 0 ? void 0 : events.sort(function (a, b) {
      return b.duration - a.duration;
    });
    return calculateCollisions(sortedEvents);
  });
  return eventPerDay;
}
function getTimeFromOffset(offset, day) {
  var correctedOffset = Math.round(offset / 10) * 10;
  var defaultTzOffset = spacetime.now().timezone().current.offset;
  var dateSelectedTzOffset = day.timezone().current.offset;
  return spacetime(day).add(correctedOffset * (60 / 40) + (defaultTzOffset - dateSelectedTzOffset) * 60, 'minute').format('iso-utc');
}
function getDurationFromOffset(offset) {
  var correctedOffset = Math.max(Math.round(Math.abs(offset) / 10) * 10, 10) * (60 / 40);
  return offset > 0 ? correctedOffset : -correctedOffset;
}

function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread$1(); }
function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$2(arr); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var ellipsis = function ellipsis(str, maxLength) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref$side = _ref.side,
    side = _ref$side === void 0 ? 'end' : _ref$side,
    _ref$prefix = _ref.prefix,
    prefix = _ref$prefix === void 0 ? '...' : _ref$prefix;
  if (str && str.length > maxLength) {
    var length = maxLength - prefix.length;
    switch (side) {
      case 'start':
        return prefix + str.slice(-length);
      case 'end':
      default:
        return str.slice(0, length) + prefix;
    }
  }
  return str;
};
var isStringifiedJSON = function isStringifiedJSON(str) {
  var jsonStringRegex = /^(\{|\[)(.*?)(\}|\])$/;
  return jsonStringRegex.test(str);
};
var commaAndFormatArray = function commaAndFormatArray(array) {
  var last = array.pop();
  return array.join(', ') + ' and ' + last;
};
var indefiniteArticle = function indefiniteArticle(word) {
  var pattern = /^([aeiou])/i;
  var startsWithVowel = pattern.test(word);
  return startsWithVowel ? 'an' : 'a';
};
var toCamelCase = camelCase;
var toCamelCaseUpperFirst = function toCamelCaseUpperFirst(str) {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return toCamelCase(str).replace(/^[a-z]/g, function (s) {
    return s.toUpperCase();
  });
};
var toSentenceCase = function toSentenceCase(str) {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};
var toTitleCase = function toTitleCase(str) {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return startCase(lowerCase(str));
};
var isHtml = function isHtml(str) {
  var regex = RegExp(/(<([^>]+)>)/gi);
  return regex.test(str);
};
var stringToHTML = function stringToHTML(str) {
  var dom = document.createElement('div');
  dom.innerHTML = str;
  return dom;
};
var HTMLToString = function HTMLToString(html) {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};
var numberWithDots = function numberWithDots(number) {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.');
};
var replaceVariables = function replaceVariables(text, values) {
  var regex = new RegExp(/##(.*?)##/);
  if (!text) {
    return null;
  }
  if (!values) {
    return text;
  }
  return text.split(regex).reduce(function (prev, current, i) {
    if (!i) {
      return [current];
    }
    return prev.concat(values[current] || current);
  }, []);
};
var numberToOrdinalString = function numberToOrdinalString(number) {
  var suffixes = ['th', 'st', 'nd', 'rd'];
  var v = number % 100;
  return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};
var generateShortName = function generateShortName(text) {
  var _initials$shift, _initials$pop, _initials;
  var rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
  var initials = _toConsumableArray$1(text.matchAll(rgx)) || [];
  initials = ((((_initials$shift = initials.shift()) === null || _initials$shift === void 0 ? void 0 : _initials$shift[1]) || '') + (((_initials$pop = initials.pop()) === null || _initials$pop === void 0 ? void 0 : _initials$pop[1]) || '')).toUpperCase();
  return String((_initials = initials) === null || _initials === void 0 ? void 0 : _initials.slice(0, 2));
};
var emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var specialChar = ['ñ', 'ü'];
var isEmail = function isEmail(email) {
  return email !== undefined && email !== null && email !== '' && emailRe.test(String(email).toLowerCase()) && !specialChar.some(function (_char) {
    return email.toLowerCase().includes(_char);
  });
};

// https://mathiasbynens.be/demo/url-regex
// https://gist.github.com/dperini/729294
var reWeburl = new RegExp('^' +
// protocol identifier (optional)
// short syntax // still required
'(?:(?:(?:https?|ftp):)?\\/\\/)?' +
// user:pass BasicAuth (optional)
'(?:\\S+(?::\\S*)?@)?' + '(?:' +
// IP address exclusion
// private & local networks
'(?!(?:10|127)(?:\\.\\d{1,3}){3})' + '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' + '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
// IP address dotted notation octets
// excludes loopback network 0.0.0.0
// excludes reserved space >= 224.0.0.0
// excludes network & broadcast addresses
// (first & last IP address of each class)
'(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' + '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' + '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' + '|' +
// host & domain names, may end with dot
// can be replaced by a shortest alternative
// (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
'(?:' + '(?:' + "[a-z0-9\\u00a1-\\uffff]" + "[a-z0-9\\u00a1-\\uffff_-]{0,62}" + ')?' + "[a-z0-9\\u00a1-\\uffff]\\." + ')+' +
// TLD identifier name, may end with dot
"(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" + ')' +
// port number (optional)
'(?::\\d{2,5})?' +
// resource path (optional)
'(?:[/?#]\\S*)?' + '$', 'i');
var isUrl = function isUrl(string) {
  return string !== undefined && string !== null && typeof string === 'string' && !!string.match(reWeburl);
};
function linkify(text) {
  //Check that text is a string and has length
  if (!text || typeof text !== 'string' || text.length === 0) {
    return text;
  }
  var replacePattern1, replacePattern2, replacedText;

  //URLs starting with http://, https://, or ftp://
  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
  replacedText = text.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
  return replacedText;
}

var Afghanistan = [
	"asia/kabul"
];
var Albania = [
	"europe/tirane"
];
var Algeria = [
	"africa/algiers"
];
var Andorra = [
	"europe/andorra"
];
var Angola = [
	"africa/luanda"
];
var Antarctica = [
	"antarctica/casey",
	"antarctica/davis",
	"antarctica/vostok",
	"antarctica/mawson",
	"antarctica/syowa",
	"antarctica/troll",
	"antarctica/mcmurdo",
	"antarctica/south_pole",
	"antarctica/macquarie",
	"antarctica/dumontdurville",
	"antarctica/palmer",
	"antarctica/rothera"
];
var Argentina = [
	"america/argentina"
];
var Armenia = [
	"asia/yerevan"
];
var Australia = [
	"australia/adelaide",
	"australia/broken_hill",
	"australia/south",
	"australia/yancowinna",
	"australia/darwin",
	"australia/north",
	"australia/perth",
	"australia/west",
	"australia/eucla",
	"australia/currie",
	"australia/hobart",
	"australia/melbourne",
	"australia/sydney",
	"australia/act",
	"australia/canberra",
	"australia/nsw",
	"australia/tasmania",
	"australia/victoria",
	"australia/brisbane",
	"australia/lindeman",
	"australia/queensland",
	"australia/lord_howe",
	"australia/lhi"
];
var Austria = [
	"europe/vienna"
];
var Azerbaijan = [
	"asia/baku"
];
var Bahamas = [
	"america/nassau"
];
var Bahrain = [
	"asia/bahrain"
];
var Bangladesh = [
	"asia/dhaka"
];
var Barbados = [
	"america/barbados"
];
var Belarus = [
	"europe/minsk"
];
var Belgium = [
	"europe/brussels"
];
var Belize = [
	"america/belize"
];
var Benin = [
	"africa/porto-novo"
];
var Bhutan = [
	"asia/thimphu"
];
var Bolivia = [
	"america/la_paz"
];
var Botswana = [
	"africa/gaborone"
];
var Brazil = [
	"brazil/acre",
	"brazil/west",
	"brazil/east"
];
var Brunei = [
	"asia/brunei"
];
var Bulgaria = [
	"europe/sofia"
];
var Burundi = [
	"africa/bujumbura"
];
var Cambodia = [
	"asia/phnom_penh"
];
var Cameroon = [
	"africa/douala"
];
var Canada = [
	"canada/atlantic",
	"canada/central",
	"canada/east-saskatchewan",
	"canada/eastern",
	"canada/mountain",
	"canada/pacific",
	"canada/saskatchewan",
	"canada/yukon"
];
var Chad = [
	"africa/ndjamena"
];
var Chile = [
	"chile/continental"
];
var China = [
	"asia/shanghai"
];
var Colombia = [
	"america/bogota"
];
var Comoros = [
	"indian/comoro"
];
var Croatia = [
	"europe/zagreb"
];
var Cuba = [
	"america/havana"
];
var Cyprus = [
	"asia/nicosia"
];
var Denmark = [
	"europe/copenhagen",
	"atlantic/faroe"
];
var Djibouti = [
	"africa/djibouti"
];
var Dominica = [
	"america/dominica"
];
var Ecuador = [
	"america/guayaquil"
];
var Egypt = [
	"africa/cairo"
];
var Eritrea = [
	"africa/asmara",
	"africa/asmera"
];
var Estonia = [
	"europe/tallinn"
];
var Ethiopia = [
	"africa/addis_ababa"
];
var Fiji = [
	"pacific/fiji"
];
var Finland = [
	"europe/helsinki"
];
var France = [
	"europe/paris"
];
var Gabon = [
	"africa/libreville"
];
var Gambia = [
	"africa/banjul"
];
var Georgia = [
	"asia/tbilisi"
];
var Germany = [
	"europe/berlin"
];
var Ghana = [
	"africa/accra"
];
var Greece = [
	"europe/athens"
];
var Grenada = [
	"america/grenada"
];
var Guatemala = [
	"america/guatemala"
];
var Guinea = [
	"africa/conakry"
];
var Guyana = [
	"america/guyana"
];
var Haiti = [
	"america/port-au-prince"
];
var Honduras = [
	"america/tegucigalpa"
];
var Hungary = [
	"europe/budapest"
];
var Iceland = [
	"atlantic/reykjavik"
];
var India = [
	"asia/kolkata"
];
var Indonesia = [
	"asia/jakarta",
	"asia/makassar"
];
var Iran = [
	"asia/tehran"
];
var Iraq = [
	"asia/baghdad"
];
var Ireland = [
	"europe/dublin"
];
var Israel = [
	"asia/jerusalem"
];
var Italy = [
	"europe/rome"
];
var Jamaica = [
	"america/jamaica"
];
var Japan = [
	"asia/tokyo"
];
var Jordan = [
	"asia/amman"
];
var Kazakhstan = [
	"asia/almaty"
];
var Kenya = [
	"africa/nairobi"
];
var Kiribati = [
	"pacific/tarawa"
];
var Kuwait = [
	"asia/kuwait"
];
var Kyrgyzstan = [
	"asia/bishkek"
];
var Laos = [
	"asia/vientiane"
];
var Latvia = [
	"europe/riga"
];
var Lebanon = [
	"asia/beirut"
];
var Lesotho = [
	"africa/maseru"
];
var Liberia = [
	"africa/monrovia"
];
var Libya = [
	"africa/tripoli"
];
var Liechtenstein = [
	"europe/vaduz"
];
var Lithuania = [
	"europe/vilnius"
];
var Luxembourg = [
	"europe/luxembourg"
];
var Macau = [
	"asia/macau"
];
var Madagascar = [
	"indian/antananarivo"
];
var Malawi = [
	"africa/blantyre"
];
var Malaysia = [
	"asia/kuala_lumpur",
	"asia/kuching"
];
var Maldives = [
	"indian/maldives"
];
var Mali = [
	"africa/bamako"
];
var Malta = [
	"europe/malta"
];
var Mauritania = [
	"africa/nouakchott"
];
var Mauritius = [
	"indian/mauritius"
];
var Mexico = [
	"america/mexico_city",
	"mexico/bajanorte",
	"mexico/bajasur",
	"mexico/general"
];
var Moldova = [
	"europe/chisinau"
];
var Monaco = [
	"europe/monaco"
];
var Mongolia = [
	"asia/ulaanbaatar",
	"asia/hovd"
];
var Montenegro = [
	"europe/podgorica"
];
var Morocco = [
	"africa/casablanca"
];
var Mozambique = [
	"africa/maputo"
];
var Myanmar = [
	"asia/rangoon"
];
var Namibia = [
	"africa/windhoek"
];
var Nauru = [
	"pacific/nauru"
];
var Nepal = [
	"asia/kathmandu"
];
var Netherlands = [
	"europe/amsterdam"
];
var Nicaragua = [
	"america/managua"
];
var Niger = [
	"africa/niamey"
];
var Nigeria = [
	"africa/lagos"
];
var Norway = [
	"europe/oslo"
];
var Oman = [
	"asia/muscat"
];
var Pakistan = [
	"asia/karachi"
];
var Palau = [
	"pacific/palau"
];
var Palestine = [
	"asia/gaza",
	"asia/hebron"
];
var Panama = [
	"america/panama"
];
var Paraguay = [
	"america/asuncion"
];
var Peru = [
	"america/lima"
];
var Philippines = [
	"asia/manila"
];
var Poland = [
	"europe/warsaw"
];
var Portugal = [
	"europe/lisbon"
];
var Qatar = [
	"asia/qatar"
];
var Romania = [
	"europe/bucharest"
];
var Rwanda = [
	"africa/kigali"
];
var Samoa = [
	"pacific/samoa"
];
var Senegal = [
	"africa/dakar"
];
var Serbia = [
	"europe/belgrade"
];
var Seychelles = [
	"indian/mahe"
];
var Singapore = [
	"asia/singapore"
];
var Slovakia = [
	"europe/bratislava"
];
var Slovenia = [
	"europe/ljubljana"
];
var Somalia = [
	"africa/mogadishu"
];
var Spain = [
	"europe/madrid"
];
var Sudan = [
	"africa/khartoum"
];
var Suriname = [
	"america/paramaribo"
];
var Swaziland = [
	"africa/mbabane"
];
var Sweden = [
	"europe/stockholm"
];
var Switzerland = [
	"europe/zurich"
];
var Syria = [
	"asia/damascus"
];
var Taiwan = [
	"asia/taipei"
];
var Tajikistan = [
	"asia/dushanbe"
];
var Tanzania = [
	"africa/dar_es_salaam"
];
var Thailand = [
	"asia/bangkok"
];
var Togo = [
	"africa/lome"
];
var Tonga = [
	"pacific/tongatapu"
];
var Tunisia = [
	"africa/tunis"
];
var Turkey = [
	"europe/istanbul"
];
var Turkmenistan = [
	"asia/ashgabat"
];
var Tuvalu = [
	"pacific/funafuti"
];
var Uganda = [
	"africa/kampala"
];
var Ukraine = [
	"europe/kiev"
];
var Uruguay = [
	"america/montevideo"
];
var Uzbekistan = [
	"asia/samarkand"
];
var Vanuatu = [
	"pacific/efate"
];
var Venezuela = [
	"america/caracas"
];
var Vietnam = [
	"asia/ho_chi_minh"
];
var Yemen = [
	"asia/aden"
];
var Zambia = [
	"africa/lusaka"
];
var Zimbabwe = [
	"africa/harare"
];
var rawJson = {
	Afghanistan: Afghanistan,
	Albania: Albania,
	Algeria: Algeria,
	Andorra: Andorra,
	Angola: Angola,
	Antarctica: Antarctica,
	"Antigua and Barbuda": [
	"america/antigua"
],
	Argentina: Argentina,
	Armenia: Armenia,
	Australia: Australia,
	Austria: Austria,
	Azerbaijan: Azerbaijan,
	Bahamas: Bahamas,
	Bahrain: Bahrain,
	Bangladesh: Bangladesh,
	Barbados: Barbados,
	Belarus: Belarus,
	Belgium: Belgium,
	Belize: Belize,
	Benin: Benin,
	Bhutan: Bhutan,
	Bolivia: Bolivia,
	"Bosnia and Herzegovina": [
	"europe/sarajevo"
],
	Botswana: Botswana,
	Brazil: Brazil,
	Brunei: Brunei,
	Bulgaria: Bulgaria,
	"Burkina Faso": [
	"africa/ouagadougou"
],
	Burundi: Burundi,
	Cambodia: Cambodia,
	Cameroon: Cameroon,
	Canada: Canada,
	"Cape Verde": [
	"atlantic/cape_verde"
],
	"Central African Republic": [
	"africa/bangui"
],
	Chad: Chad,
	Chile: Chile,
	China: China,
	Colombia: Colombia,
	Comoros: Comoros,
	"Costa Rica": [
	"america/costa_rica"
],
	Croatia: Croatia,
	Cuba: Cuba,
	Cyprus: Cyprus,
	"Czech Republic": [
	"europe/prague"
],
	"Democratic Republic of the Congo": [
	"africa/kinshasa",
	"africa/lubumbashi"
],
	Denmark: Denmark,
	Djibouti: Djibouti,
	Dominica: Dominica,
	"Dominican Republic": [
	"america/santo_domingo"
],
	"East Timor": [
	"asia/dili"
],
	Ecuador: Ecuador,
	Egypt: Egypt,
	"El Salvador": [
	"america/el_salvador"
],
	"Equatorial Guinea": [
	"africa/malabo"
],
	Eritrea: Eritrea,
	Estonia: Estonia,
	Ethiopia: Ethiopia,
	"Federated States of Micronesia": [
	"pacific/pohnpei",
	"pacific/chuuk"
],
	Fiji: Fiji,
	Finland: Finland,
	France: France,
	Gabon: Gabon,
	Gambia: Gambia,
	Georgia: Georgia,
	Germany: Germany,
	Ghana: Ghana,
	Greece: Greece,
	Grenada: Grenada,
	Guatemala: Guatemala,
	Guinea: Guinea,
	"Guinea-Bissau": [
	"africa/bissau"
],
	Guyana: Guyana,
	Haiti: Haiti,
	Honduras: Honduras,
	"Hong Kong": [
	"asia/hong_kong"
],
	Hungary: Hungary,
	Iceland: Iceland,
	India: India,
	Indonesia: Indonesia,
	Iran: Iran,
	Iraq: Iraq,
	Ireland: Ireland,
	Israel: Israel,
	Italy: Italy,
	"Ivory Coast": [
	"africa/abidjan"
],
	Jamaica: Jamaica,
	Japan: Japan,
	Jordan: Jordan,
	Kazakhstan: Kazakhstan,
	Kenya: Kenya,
	Kiribati: Kiribati,
	"Korea, North": [
	"asia/pyongyang"
],
	"Korea, South": [
	"asia/seoul"
],
	Kuwait: Kuwait,
	Kyrgyzstan: Kyrgyzstan,
	Laos: Laos,
	Latvia: Latvia,
	Lebanon: Lebanon,
	Lesotho: Lesotho,
	Liberia: Liberia,
	Libya: Libya,
	Liechtenstein: Liechtenstein,
	Lithuania: Lithuania,
	Luxembourg: Luxembourg,
	Macau: Macau,
	Madagascar: Madagascar,
	Malawi: Malawi,
	Malaysia: Malaysia,
	Maldives: Maldives,
	Mali: Mali,
	Malta: Malta,
	"Marshall Islands": [
	"pacific/kwajalein",
	"pacific/majuro"
],
	Mauritania: Mauritania,
	Mauritius: Mauritius,
	Mexico: Mexico,
	Moldova: Moldova,
	Monaco: Monaco,
	Mongolia: Mongolia,
	Montenegro: Montenegro,
	Morocco: Morocco,
	Mozambique: Mozambique,
	Myanmar: Myanmar,
	Namibia: Namibia,
	Nauru: Nauru,
	Nepal: Nepal,
	Netherlands: Netherlands,
	"New Zealand": [
	"pacific/auckland"
],
	Nicaragua: Nicaragua,
	Niger: Niger,
	Nigeria: Nigeria,
	"North Macedonia": [
	"europe/skopje"
],
	Norway: Norway,
	Oman: Oman,
	Pakistan: Pakistan,
	Palau: Palau,
	Palestine: Palestine,
	Panama: Panama,
	"Papua New Guinea": [
	"pacific/port_moresby"
],
	Paraguay: Paraguay,
	Peru: Peru,
	Philippines: Philippines,
	Poland: Poland,
	Portugal: Portugal,
	"Puerto Rico": [
	"america/puerto_rico"
],
	Qatar: Qatar,
	"Republic of the Congo": [
	"africa/brazzaville"
],
	Romania: Romania,
	"Russian Federation": [
	"europe/moscow"
],
	Rwanda: Rwanda,
	"Saint Kitts and Nevis": [
	"america/st_kitts"
],
	"Saint Lucia": [
	"america/st_lucia"
],
	"Saint Vincent and the Grenadines": [
	"america/st_vincent"
],
	Samoa: Samoa,
	"San Marino": [
	"europe/san_marino"
],
	"Saudi Arabia": [
	"asia/riyadh"
],
	Senegal: Senegal,
	Serbia: Serbia,
	Seychelles: Seychelles,
	"Sierra Leone": [
	"africa/freetown"
],
	Singapore: Singapore,
	Slovakia: Slovakia,
	Slovenia: Slovenia,
	"Solomon Islands": [
	"pacific/guadalcanal"
],
	Somalia: Somalia,
	"South Africa": [
	"africa/johannesburg"
],
	"South Sudan": [
	"africa/juba"
],
	Spain: Spain,
	"Sri Lanka": [
	"asia/colombo"
],
	Sudan: Sudan,
	Suriname: Suriname,
	Swaziland: Swaziland,
	Sweden: Sweden,
	Switzerland: Switzerland,
	Syria: Syria,
	"São Tomé and Príncipe": [
	"africa/sao_tome"
],
	Taiwan: Taiwan,
	Tajikistan: Tajikistan,
	Tanzania: Tanzania,
	Thailand: Thailand,
	Togo: Togo,
	Tonga: Tonga,
	"Trinidad and Tobago": [
	"america/port_of_spain"
],
	Tunisia: Tunisia,
	Turkey: Turkey,
	Turkmenistan: Turkmenistan,
	Tuvalu: Tuvalu,
	Uganda: Uganda,
	Ukraine: Ukraine,
	"United Arab Emirates": [
	"asia/dubai"
],
	"United Kingdom": [
	"europe/london"
],
	"United States": [
	"us/eastern",
	"us/central",
	"us/mountain",
	"us/pacific"
],
	Uruguay: Uruguay,
	Uzbekistan: Uzbekistan,
	Vanuatu: Vanuatu,
	"Vatican City": [
	"europe/vatican"
],
	Venezuela: Venezuela,
	Vietnam: Vietnam,
	Yemen: Yemen,
	Zambia: Zambia,
	Zimbabwe: Zimbabwe
};

function _typeof$8(obj) { "@babel/helpers - typeof"; return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$8(obj); }
function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty$4(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$4(obj, key, value) { key = _toPropertyKey$4(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$4(arg) { var key = _toPrimitive$4(arg, "string"); return _typeof$8(key) === "symbol" ? key : String(key); }
function _toPrimitive$4(input, hint) { if (_typeof$8(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$8(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var data = rawJson;
var map = Object.keys(data).map(function (x) {
  return _defineProperty$4({}, x.toUpperCase(), data[x]);
}).reduce(function (a, b) {
  return _objectSpread$3(_objectSpread$3({}, a), b);
}, {});

/**
 * Private functions. Meant only for testing
 */
var privateTimeZoneFunctions = function privateTimeZoneFunctions() {
  var formatCountryToName = function formatCountryToName(country) {
    if (lookup.byCountry(toTitleCase(country))) {
      return country.toUpperCase();
    } else {
      var c = lookup.byIso(country);
      if (c != undefined) return c.country.toUpperCase();else throw new Error('invalid country');
    }
  };

  /**
   * Returns a list containing the corresponding timezones for the input
   * @param country string can be a timezone (sth/sth) or a country name
   */
  var getCountryTimezones = function getCountryTimezones(country) {
    if (!country) return undefined;else if (country.includes('/')) {
      var split = country.split(' ');
      return [split[split.length - 1].toLowerCase()];
    } else {
      try {
        return map[formatCountryToName(country)];
      } catch (e) {
        return undefined;
      }
    }
  };
  var getNow = function getNow(timezone) {
    try {
      return spacetime.now(timezone);
    } catch (e) {
      return undefined;
    }
  };
  var parseTimezoneToNowList = function parseTimezoneToNowList(timezones) {
    return timezones.map(function (x) {
      return getNow(x);
    }).filter(function (x) {
      return x != undefined;
    });
  };
  var getFirstAndLastTimezone = function getFirstAndLastTimezone(spaceTimes) {
    if (!spaceTimes || spaceTimes.length === 0) {
      return undefined;
    }
    if (spaceTimes.length === 1) {
      return ["".concat(spaceTimes[0].time())];
    }
    spaceTimes.sort(function (a, b) {
      return a.timezone().current.offset - b.timezone().current.offset;
    });
    var sameFirstAndLast = spaceTimes[0].time() === spaceTimes[spaceTimes.length - 1].time();
    return sameFirstAndLast ? ["".concat(spaceTimes[0].time())] : ["".concat(spaceTimes[0].time()), "".concat(spaceTimes[spaceTimes.length - 1].time())];
  };
  var getFirstAndLastSpaceTime = function getFirstAndLastSpaceTime(timezones) {
    var nows = parseTimezoneToNowList(timezones);
    return getFirstAndLastTimezone(nows);
  };
  return {
    getCountryTimezones: getCountryTimezones,
    parseTimezoneToNowList: parseTimezoneToNowList,
    getFirstAndLastTimezone: getFirstAndLastTimezone,
    getFirstAndLastSpaceTime: getFirstAndLastSpaceTime
  };
};
var _privateTimeZoneFunct = privateTimeZoneFunctions(),
  getCountryTimezones = _privateTimeZoneFunct.getCountryTimezones,
  getFirstAndLastSpaceTime = _privateTimeZoneFunct.getFirstAndLastSpaceTime;

/**
 * Get current time on the specified territory
 * @param countryOrTimeZone timezone (spacetime library (iana code)) or country (name, ISO2, ISO3, ISOno)
 * @returns list of length 1 for timezone and list of 2 now times for the country (earliest & latest) , in format hh:mm{am,pm} (ex: [11:09am, 01:09pm])
 */
var getCurrentTime = function getCurrentTime(countryOrTimeZone) {
  var timezones = getCountryTimezones(countryOrTimeZone);
  if (timezones === undefined) return undefined;
  return getFirstAndLastSpaceTime(timezones);
};
var getCurrentTimeBeautiful = function getCurrentTimeBeautiful(countryOrTimeZone) {
  var nows = getCurrentTime(countryOrTimeZone);
  if (nows == undefined) return undefined;
  if (nows.length === 1) {
    return "It's ".concat(nows[0], " for");
  } else if (nows.length === 2) {
    return "It's between ".concat(nows[0], " and ").concat(nows[1], " for");
  }
};
var getCurrentTimeSimple = function getCurrentTimeSimple(countryOrTimeZone) {
  var nows = getCurrentTime(countryOrTimeZone);
  if (nows == undefined) return undefined;
  if (nows.length === 1) {
    return " ".concat(nows[0], " for");
  } else if (nows.length === 2) {
    return " ".concat(nows[0], " to ").concat(nows[1], " for");
  }
};

function _typeof$7(obj) { "@babel/helpers - typeof"; return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$7(obj); }
function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty$3(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(arg) { var key = _toPrimitive$3(arg, "string"); return _typeof$7(key) === "symbol" ? key : String(key); }
function _toPrimitive$3(input, hint) { if (_typeof$7(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$7(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var setHoursToEndDay = function setHoursToEndDay(item, date) {
  if (!item) return;
  var isInCadence = isCadenceTask(item) && !isAutomatedEmailTask(item);
  if (isInCadence) date.setHours(23, 59, 59, 999);
};
var addTaskDateGrouping = function addTaskDateGrouping(items, dateLogicRole, isOverdue, t, language) {
  var itemsDate = items.map(function (item) {
    var date = new Date(addHoursToStringDate(getValueFromLogicRole(item, dateLogicRole)));
    setHoursToEndDay(item, date);
    return _objectSpread$2(_objectSpread$2({}, item), {}, {
      date: date,
      time: date.getTime()
    });
  }).sort(function (a, b) {
    return a.time - b.time;
  });
  return itemsDate.map(function (item, index) {
    var isItemOverdue = isOverdue(item);
    var date = item.date;
    var previous = itemsDate[index - 1];
    var next = itemsDate[index + 1];
    var previousItemDate = previous && previous.date;
    var nextItemDate = next && next.date;
    var formatStr = language === 'en' ? '{month} {date-ordinal}, {year}' : '{date} {month} {year}';
    var formattedDay = isValid(date) ? getI18nSpacetimeLng(language, date).format(formatStr) : '';
    var dateDay = isValid(date) ? parse(format(date, 'MMMM do, yyyy'), 'MMMM do, yyyy', new Date()) : '';
    var hashDate = getDateTimestampString(date);
    return _objectSpread$2(_objectSpread$2({}, item), {}, {
      taskDate: {
        isFirstOfDay: !previousItemDate || !isSameDay$1(date, previousItemDate) && !isItemOverdue,
        isLastOfDay: !nextItemDate || !isSameDay$1(date, nextItemDate) && !isItemOverdue || isItemOverdue && !isOverdue(next),
        day: dateDay,
        formattedDate: !isItemOverdue && formattedDay,
        prefix: !isItemOverdue ? generateDatePrefix(date, true, t) : t('leftBar.overdueTasks'),
        hashDate: hashDate
      }
    });
  });
};
function canBeMarkedAsDone(task) {
  var _task$date;
  //Check if task.date is an ISO date with time
  var useDateTime = task.date && ((_task$date = task.date) === null || _task$date === void 0 ? void 0 : _task$date.length) > 10;
  if (task.skippable) {
    return {
      disabled: false,
      reason: task.status === TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE ? 'When you complete this task it will be marked as Completed Overdue' : 'Mark as done'
    };
  }
  if (task.type === TASK_TYPE.NEXT_STEP || task.type === TASK_TYPE.MEETING) {
    return {
      disabled: false,
      reason: 'Mark as done'
    };
  }
  var beforeToday = isBeforeToday(task.date, getUserTimeZone());
  var spaceTimeDate = spacetime(task.date);
  var spaceTimeToday = spacetime.today();
  var spaceTimeDateisBeforeToday = spaceTimeDate.isBefore(spaceTimeToday);
  if (task.type === TASK_TYPE.PROSPECT_CADENCE && task.status === TASK_STATUS_VALUE_LOGIC_ROLE.TODO) {
    // Future
    var isFutureWithTime = useDateTime && isAfterToday(task.date, getUserTimeZone());
    if (useDateTime ? isFutureWithTime : spaceTimeDate.isAfter(spaceTimeToday)) {
      return {
        disabled: true,
        reason: 'This is a task for the future. You cannot mark it as done.'
      };
    }

    // Past
    var isPastWithTime = useDateTime && beforeToday;
    if (useDateTime ? isPastWithTime : spaceTimeDateisBeforeToday) {
      return {
        disabled: false,
        reason: 'Mark as done'
      };
    }

    // Today
    var isTodayWithTime = useDateTime && isToday(task.date, getUserTimeZone());
    if (useDateTime ? isTodayWithTime : spaceTimeDate.isEqual(spaceTimeToday)) {
      var disabled = !task.lastAttemptDate || task.lastAttemptDate && (useDateTime ? isBeforeToday(task.lastAttemptDate, getUserTimeZone()) : spacetime(task.lastAttemptDate).isBefore(spaceTimeToday));
      return {
        disabled: disabled,
        reason: disabled ? 'Make at least one attempt to mark as done' : 'Mark as done'
      };
    }
  }
  if (task.type === TASK_TYPE.PROSPECT_CADENCE && task.status === TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE && (useDateTime ? beforeToday : spaceTimeDateisBeforeToday)) {
    var _disabled = !task.lastAttemptDate || spacetime(task.lastAttemptDate).isBefore(spaceTimeDate);
    return {
      disabled: _disabled,
      reason: _disabled ? 'Make at least one attempt to mark as done' : 'When you complete this task it will be marked as Completed Overdue'
    };
  }
  // We should never get here, but just in case
  return {
    disabled: false,
    reason: 'Mark as done'
  };
}
var getButtonMarkAsDone = function getButtonMarkAsDone(_ref) {
  var bobjectLastAttemptDate = _ref.bobjectLastAttemptDate,
    taskStatus = _ref.taskStatus,
    taskType = _ref.taskType,
    taskIsAutomated = _ref.taskIsAutomated,
    taskDateField = _ref.taskDateField;
  var _canBeMarkedAsDone = canBeMarkedAsDone({
      skippable: taskIsAutomated !== TASK_AUTOMATED_VALUE.AUTOMATED_YES,
      status: taskStatus,
      type: taskType,
      date: taskDateField,
      lastAttemptDate: bobjectLastAttemptDate
    }),
    disabled = _canBeMarkedAsDone.disabled,
    reason = _canBeMarkedAsDone.reason;
  return {
    disabled: disabled,
    tooltip: reason
  };
};
var getTaskReferenceBobject = function getTaskReferenceBobject(bobject) {
  var _getFieldByLogicRole, _getFieldByLogicRole2, _getFieldByLogicRole3;
  if (!bobject) {
    throw new Error('bobject parameter is required');
  }
  var company = (_getFieldByLogicRole = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.COMPANY)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.referencedBobject;
  var lead = (_getFieldByLogicRole2 = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.LEAD)) === null || _getFieldByLogicRole2 === void 0 ? void 0 : _getFieldByLogicRole2.referencedBobject;
  var opportunity = (_getFieldByLogicRole3 = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)) === null || _getFieldByLogicRole3 === void 0 ? void 0 : _getFieldByLogicRole3.referencedBobject;
  if (opportunity) {
    return opportunity;
  } else if (lead) {
    return lead;
  } else if (company) {
    return company;
  }
};
var getTaskLocalTime = function getTaskLocalTime(task) {
  var _getFieldByLogicRole4, _getFieldByLogicRole5;
  var small = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!task) {
    throw new Error('task parameter is required');
  }
  var company = (_getFieldByLogicRole4 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)) === null || _getFieldByLogicRole4 === void 0 ? void 0 : _getFieldByLogicRole4.referencedBobject;
  var lead = (_getFieldByLogicRole5 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)) === null || _getFieldByLogicRole5 === void 0 ? void 0 : _getFieldByLogicRole5.referencedBobject;
  /*const opportunity = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
     // TODO - How to get the lead without going through the url
    if (opportunity && !lead) {
    const contactBobjects = useContactBobjects();
    const leadId = getFieldByLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.PRIMARY_CONTACT)
      ?.value;
    const filteredLeads = contactBobjects?.leads?.filter(lead => leadId === lead?.id?.value);
    if (filteredLeads?.length > 0) lead = filteredLeads[0];
  } */
  if (lead) {
    var leadTimeZone = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.TIME_ZONE);
    var leadNowTime = leadTimeZone && getCurrentTimeBeautiful(leadTimeZone);
    if (leadNowTime) return leadNowTime;
  }
  var companyCountry = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.COUNTRY);
  var companyTimeZone = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.TIME_ZONE);
  return small ? getCurrentTimeSimple(companyTimeZone !== null && companyTimeZone !== void 0 ? companyTimeZone : companyCountry) : getCurrentTimeBeautiful(companyTimeZone !== null && companyTimeZone !== void 0 ? companyTimeZone : companyCountry);
};
var isScheduledTask = function isScheduledTask(task) {
  var _getFieldByLogicRole6;
  return (
    //@ts-ignore the return of this field is an anomaly
    ((_getFieldByLogicRole6 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)) === null || _getFieldByLogicRole6 === void 0 ? void 0 : _getFieldByLogicRole6.valueLogicRole) === TASK_TYPE.NEXT_STEP
  );
};
var isCadenceTask = function isCadenceTask(task) {
  var _getFieldByLogicRole7;
  return (
    //@ts-ignore the return of this field is an anomaly
    ((_getFieldByLogicRole7 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)) === null || _getFieldByLogicRole7 === void 0 ? void 0 : _getFieldByLogicRole7.valueLogicRole) === TASK_TYPE.PROSPECT_CADENCE
  );
};
var isImportantTask = function isImportantTask(task) {
  var _getFieldByLogicRole8;
  return (
    //@ts-ignore the return of this field is an anomaly
    ((_getFieldByLogicRole8 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.PRIORITY)) === null || _getFieldByLogicRole8 === void 0 ? void 0 : _getFieldByLogicRole8.valueLogicRole) === TASK_PRIORITY_VALUE.IMPORTANT
  );
};
var isCallTask = function isCallTask(task) {
  var _getFieldByLogicRole9;
  return ((_getFieldByLogicRole9 = getFieldByLogicRole(task, TASK_ACTION.CALL)) === null || _getFieldByLogicRole9 === void 0 ? void 0 : _getFieldByLogicRole9.valueLogicRole) === TASK_ACTION_VALUE.CALL_YES;
};
var isEmailTask = function isEmailTask(task) {
  var _getFieldByLogicRole10;
  return ((_getFieldByLogicRole10 = getFieldByLogicRole(task, TASK_ACTION.EMAIL)) === null || _getFieldByLogicRole10 === void 0 ? void 0 : _getFieldByLogicRole10.valueLogicRole) === TASK_ACTION_VALUE.EMAIL_YES;
};
var isAutomatedEmailTask = function isAutomatedEmailTask(task) {
  var _getFieldByLogicRole11;
  return ((_getFieldByLogicRole11 = getFieldByLogicRole(task, TASK_ACTION.AUTOMATED_EMAIL)) === null || _getFieldByLogicRole11 === void 0 ? void 0 : _getFieldByLogicRole11.valueLogicRole) === TASK_ACTION_VALUE.AUTOMATED_EMAIL_YES;
};
var isLinkedinMessageTask = function isLinkedinMessageTask(task) {
  var _getFieldByLogicRole12;
  return ((_getFieldByLogicRole12 = getFieldByLogicRole(task, TASK_ACTION.LINKEDIN_MESSAGE)) === null || _getFieldByLogicRole12 === void 0 ? void 0 : _getFieldByLogicRole12.valueLogicRole) === TASK_ACTION_VALUE.LINKEDIN_MESSAGE_YES;
};
var isMeetingTypeTask = function isMeetingTypeTask(task) {
  var _getFieldByLogicRole13;
  var taskType = (_getFieldByLogicRole13 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)) === null || _getFieldByLogicRole13 === void 0 ? void 0 : _getFieldByLogicRole13.valueLogicRole;
  //@ts-ignore the return of this field is an anomaly
  return taskType === TASK_TYPE.MEETING || taskType === (TASK_TYPE === null || TASK_TYPE === void 0 ? void 0 : TASK_TYPE.CONTACT_BEFORE_MEETING);
};
var isCustomTask = function isCustomTask(task) {
  var _getFieldByLogicRole14;
  var customTaskId = (_getFieldByLogicRole14 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK)) === null || _getFieldByLogicRole14 === void 0 ? void 0 : _getFieldByLogicRole14.value;
  return !!customTaskId;
};
var isWhatsAppCustomTask = function isWhatsAppCustomTask(task, customTasks) {
  var _getFieldByLogicRole15;
  var customTaskId = (_getFieldByLogicRole15 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK)) === null || _getFieldByLogicRole15 === void 0 ? void 0 : _getFieldByLogicRole15.value;
  if (!customTaskId) {
    return false;
  }
  var customTask = customTasks === null || customTasks === void 0 ? void 0 : customTasks.find(function (ct) {
    return ct.id === customTaskId;
  });
  return (customTask === null || customTask === void 0 ? void 0 : customTask.logicRole) === 'WHATSAPP';
};
function getTaskType(task) {
  var taskTypes = [];
  if (isScheduledTask(task)) taskTypes.push(TASK_TYPE.NEXT_STEP);
  if (isCallTask(task)) taskTypes.push(TASK_ACTION.CALL);
  if (isEmailTask(task)) taskTypes.push(TASK_ACTION.EMAIL);
  if (isAutomatedEmailTask(task)) taskTypes.push(TASK_ACTION.AUTOMATED_EMAIL);
  if (isLinkedinMessageTask(task)) taskTypes.push(TASK_ACTION.LINKEDIN_MESSAGE);
  if (isMeetingTypeTask(task)) taskTypes.push(TASK_TYPE.MEETING);
  return taskTypes;
}
var getTaskText = function getTaskText(task, type, customTasks) {
  var _getFieldByLogicRole16, _getFieldByLogicRole17;
  var showCustomDescription = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var t = arguments.length > 4 ? arguments[4] : undefined;
  var isScheduled = isScheduledTask(task);
  var isCustom = isCustomTask(task);
  var isCadence = isCadenceTask(task);
  var isContactBeforeMeeting = isMeetingTypeTask(task);
  var isTitle = type === 'Title';
  var title = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TITLE);
  var description = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION);
  var callAction = (_getFieldByLogicRole16 = getFieldByLogicRole(task, TASK_ACTION.CALL)) === null || _getFieldByLogicRole16 === void 0 ? void 0 : _getFieldByLogicRole16.valueLogicRole;
  var emailAction = (_getFieldByLogicRole17 = getFieldByLogicRole(task, TASK_ACTION.EMAIL)) === null || _getFieldByLogicRole17 === void 0 ? void 0 : _getFieldByLogicRole17.valueLogicRole;
  var isCall = callAction === TASK_ACTION_VALUE.CALL_YES;
  var isEmail = emailAction === TASK_ACTION_VALUE.EMAIL_YES;
  if (isTitle) {
    if (isContactBeforeMeeting) {
      return t('tasksTitles.contactBeforeMeeting');
    }
    if (isCadence && !isCustom) {
      var cadenceTaskTitle = '';
      switch (title === null || title === void 0 ? void 0 : title.charAt(0)) {
        case '1':
          cadenceTaskTitle = t('tasksTitles.cadenceStep.1');
          break;
        case '2':
          cadenceTaskTitle = t('tasksTitles.cadenceStep.2');
          break;
        case '3':
          cadenceTaskTitle = t('tasksTitles.cadenceStep.3');
          break;
        default:
          cadenceTaskTitle = t('tasksTitles.cadenceStep.other', {
            number: title === null || title === void 0 ? void 0 : title.charAt(0)
          });
          break;
      }
      return cadenceTaskTitle;
    }
  }
  if (isCustom) {
    var customTaskId = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
    var customTask = customTasks === null || customTasks === void 0 ? void 0 : customTasks.find(function (ct) {
      return ct.id === (customTaskId === null || customTaskId === void 0 ? void 0 : customTaskId.value);
    });
    return isTitle ? customTask === null || customTask === void 0 ? void 0 : customTask.name : showCustomDescription ? description : title;
  }

  // TODO: Take t from all places it uses the function
  if (isScheduled) {
    if (isTitle) {
      if (isCall) return t ? t('common.call') : 'call';
      if (isEmail) return t ? t('common.email') : 'email';
    }
    return isTitle ? t ? t('common.task', {
      count: 1
    }) : 'task' : title;
  }
  return isTitle ? title : description;
};
var isSkippableTask = function isSkippableTask(task) {
  var _getFieldByLogicRole18;
  var type = ((_getFieldByLogicRole18 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)) === null || _getFieldByLogicRole18 === void 0 ? void 0 : _getFieldByLogicRole18.valueLogicRole) || ( // @ts-ignore
  task === null || task === void 0 ? void 0 : task.type);
  var isAutomated = isAutomatedEmailTask(task);
  return [TASK_TYPE.PROSPECT_CADENCE, TASK_TYPE.START_CADENCE, TASK_TYPE.CONTACT_BEFORE_MEETING].includes(type) && !isAutomated;
};
function getTaskReferencedBobject(task) {
  var _getFieldByLogicRole19, _getFieldByLogicRole20, _getFieldByLogicRole21, _lead$id, _opportunity$id, _company$id;
  var lead = (_getFieldByLogicRole19 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)) === null || _getFieldByLogicRole19 === void 0 ? void 0 : _getFieldByLogicRole19.referencedBobject;
  var company = (_getFieldByLogicRole20 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)) === null || _getFieldByLogicRole20 === void 0 ? void 0 : _getFieldByLogicRole20.referencedBobject;
  var opportunity = (_getFieldByLogicRole21 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)) === null || _getFieldByLogicRole21 === void 0 ? void 0 : _getFieldByLogicRole21.referencedBobject;
  var bobjectId = (lead === null || lead === void 0 ? void 0 : (_lead$id = lead.id) === null || _lead$id === void 0 ? void 0 : _lead$id.value) || (opportunity === null || opportunity === void 0 ? void 0 : (_opportunity$id = opportunity.id) === null || _opportunity$id === void 0 ? void 0 : _opportunity$id.value) || (company === null || company === void 0 ? void 0 : (_company$id = company.id) === null || _company$id === void 0 ? void 0 : _company$id.value);
  var bobjectName = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) || getTextFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME) || getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  var bobjectType = lead ? BobjectTypes.Lead : opportunity ? BobjectTypes.Opportunity : BobjectTypes.Company;
  var bobjectIcon = lead ? 'person' : opportunity ? 'fileOpportunity' : 'company';
  return {
    bobjectId: bobjectId,
    bobjectName: bobjectName,
    bobjectType: bobjectType,
    bobjectIcon: bobjectIcon
  };
}
function isUnassignedTask(task) {
  var _getFieldByLogicRole22, _getFieldByLogicRole23, _getFieldByLogicRole24;
  var lead = (_getFieldByLogicRole22 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD)) === null || _getFieldByLogicRole22 === void 0 ? void 0 : _getFieldByLogicRole22.referencedBobject;
  var company = (_getFieldByLogicRole23 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)) === null || _getFieldByLogicRole23 === void 0 ? void 0 : _getFieldByLogicRole23.referencedBobject;
  var opportunity = (_getFieldByLogicRole24 = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)) === null || _getFieldByLogicRole24 === void 0 ? void 0 : _getFieldByLogicRole24.referencedBobject;
  return task && !company && !lead && !opportunity;
}

function _typeof$6(obj) { "@babel/helpers - typeof"; return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$6(obj); }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(arg) { var key = _toPrimitive$2(arg, "string"); return _typeof$6(key) === "symbol" ? key : String(key); }
function _toPrimitive$2(input, hint) { if (_typeof$6(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$6(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$1(arr); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var MULTI_INFO_BASED_FIELDS = [COMPANY_FIELDS_LOGIC_ROLE.NAME, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME, TASK_FIELDS_LOGIC_ROLE.TITLE, COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO, LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO, OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO, TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO, TASK_FIELDS_LOGIC_ROLE.PRIORITY];
var REFERENCE_FIELDS = [LEAD_FIELDS_LOGIC_ROLE.COMPANY, OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY, TASK_FIELDS_LOGIC_ROLE.COMPANY, TASK_FIELDS_LOGIC_ROLE.LEAD];
var BASE_REFERENCE_FIELDS = [COMPANY_FIELDS_LOGIC_ROLE.SOURCE, LEAD_FIELDS_LOGIC_ROLE.SOURCE];
var generateBobjectBasedData = function generateBobjectBasedData(bobject, fieldArray, customTasks, isB2CAccount) {
  var _bobject$id, _bobject$id2;
  var cardElementsDictionary = _defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2({}, BOBJECT_TYPES.COMPANY, {
    fields: [COMPANY_FIELDS_LOGIC_ROLE.NAME, COMPANY_FIELDS_LOGIC_ROLE.NUMBER_OF_LEADS, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET, COMPANY_FIELDS_LOGIC_ROLE.SOURCE, COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]
  }), BOBJECT_TYPES.LEAD, {
    fields: [LEAD_FIELDS_LOGIC_ROLE.FULL_NAME, LEAD_FIELDS_LOGIC_ROLE.ICP].concat(_toConsumableArray(!isB2CAccount ? [LEAD_FIELDS_LOGIC_ROLE.COMPANY] : []), [LEAD_FIELDS_LOGIC_ROLE.SOURCE, LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO])
  }), BOBJECT_TYPES.OPPORTUNITY, {
    fields: [OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME].concat(_toConsumableArray(!isB2CAccount ? [OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY] : []), [OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO])
  }), BOBJECT_TYPES.TASK, {
    fields: [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, TASK_FIELDS_LOGIC_ROLE.TITLE, ACTIVITY_FIELDS_LOGIC_ROLE.TIME, 'CUSTOM_TASK_TIMEZONE', TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY, TASK_FIELDS_LOGIC_ROLE.LEAD].concat(_toConsumableArray(!isB2CAccount ? [TASK_FIELDS_LOGIC_ROLE.COMPANY] : []), [LEAD_FIELDS_LOGIC_ROLE.LINKEDIN_URL, LEAD_FIELDS_LOGIC_ROLE.SOURCE, LEAD_FIELDS_LOGIC_ROLE.NURTURING_REASONS, COMPANY_FIELDS_LOGIC_ROLE.SOURCE, COMPANY_FIELDS_LOGIC_ROLE.NURTURING_REASONS, COMPANY_FIELDS_LOGIC_ROLE.COUNTRY])
  });
  var mainBobjectType = bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.typeName;
  var _ref = cardElementsDictionary[mainBobjectType] || {},
    fields = _ref.fields;
  var isScheduled = isScheduledTask(bobject);
  var referencedBobjectId = bobject === null || bobject === void 0 ? void 0 : (_bobject$id2 = bobject.id) === null || _bobject$id2 === void 0 ? void 0 : _bobject$id2.objectId;
  var translatedFields = [{
    logicRole: '',
    value: ''
  }];
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var fieldsToParse = fieldArray || fields;
  fieldsToParse === null || fieldsToParse === void 0 ? void 0 : fieldsToParse.forEach(function (logicRole) {
    var referencedBobjectType = getBobjectFromLogicRole(logicRole);
    var value;
    //@ts-ignore includes functionality clashes with typescript
    if (MULTI_INFO_BASED_FIELDS.includes(logicRole)) {
      value = getFieldByLogicRole(bobject, logicRole);
    } else if (logicRole === TASK_FIELDS_LOGIC_ROLE.DESCRIPTION) {
      value = getTaskText(bobject, 'Description', customTasks, !isScheduled, t);
    } else if (REFERENCE_FIELDS.includes(logicRole) || referencedBobjectType && mainBobjectType !== referencedBobjectType) {
      var _getFieldByLogicRole;
      value = (_getFieldByLogicRole = getFieldByLogicRole(bobject, logicRole)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.referencedBobject;
      if (referencedBobjectType && mainBobjectType !== referencedBobjectType) {
        var _getFieldByLogicRole2;
        var referencedBobject = getTaskReferenceBobject(bobject);
        //@ts-ignore includes functionality clashes with typescript
        if (!BASE_REFERENCE_FIELDS.includes(logicRole)) referencedBobject = (_getFieldByLogicRole2 = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE[referencedBobjectType.toUpperCase()])) === null || _getFieldByLogicRole2 === void 0 ? void 0 : _getFieldByLogicRole2.referencedBobject;
        value = getTextFromLogicRole(referencedBobject, logicRole);
      } else if (!(logicRole !== null && logicRole !== void 0 && logicRole.includes(referencedBobjectType.toUpperCase()))) {
        var _getFieldByLogicRole3;
        var _mainBobjectType = getBobjectFromLogicRole(logicRole);
        var mainBobject = (_getFieldByLogicRole3 = getFieldByLogicRole(bobject, FIELDS_LOGIC_ROLE[referencedBobjectType][_mainBobjectType.toUpperCase()])) === null || _getFieldByLogicRole3 === void 0 ? void 0 : _getFieldByLogicRole3.referencedBobject;
        translatedFields.push({
          logicRole: logicRole,
          value: getTextFromLogicRole(mainBobject, logicRole)
        });
      }
    } else {
      value = getTextFromLogicRole(bobject, logicRole);
    }
    translatedFields.push({
      logicRole: logicRole,
      value: value
    });
  });
  return {
    id: referencedBobjectId,
    //url: referencedBobjectUrl,
    bobjectType: mainBobjectType,
    bobject: bobject,
    fields: translatedFields
  };
};
var getNameComponentFields = function getNameComponentFields(value, bobject) {
  var name;
  var bobjectType;
  var bobjectToOpen = bobject;
  if (value) {
    if ('logicRole' in value && value !== null && value !== void 0 && value.logicRole) {
      bobjectType = getBobjectFromLogicRole(value === null || value === void 0 ? void 0 : value.logicRole);
      name = value === null || value === void 0 ? void 0 : value.text;
    } else {
      var _bobjectToOpen, _bobjectToOpen$id;
      bobjectToOpen = value;
      bobjectType = (_bobjectToOpen = bobjectToOpen) === null || _bobjectToOpen === void 0 ? void 0 : (_bobjectToOpen$id = _bobjectToOpen.id) === null || _bobjectToOpen$id === void 0 ? void 0 : _bobjectToOpen$id.typeName;
      name = getTextFromLogicRole(bobjectToOpen, getNameFieldLRFromBobjectType(bobjectType));
    }
  }
  return {
    name: name,
    bobjectType: bobjectType,
    bobjectToOpen: bobjectToOpen
  };
};

function _typeof$5(obj) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$5(obj); }
function _regeneratorRuntime$4() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$4 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$5(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$4(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getNavElements = function getNavElements() {
  return Array.from(document.querySelectorAll('.itemTitle.slds-truncate'));
};
var hasAircallInSalesforceInstalled = function hasAircallInSalesforceInstalled() {
  return !!document.querySelector('div[data-component-id="opencti_softPhone"]');
};
var openPhoneOrDialer = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator$4( /*#__PURE__*/_regeneratorRuntime$4().mark(function _callee(number, settings, openBBDialer, bobjectId) {
    var _settings$user, _settings$user2, _settings$user3, _settings$user5, _settings$user6, _settings$user7;
    var _settings$user4, dialerShown;
    return _regeneratorRuntime$4().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if ((settings === null || settings === void 0 ? void 0 : (_settings$user = settings.user) === null || _settings$user === void 0 ? void 0 : _settings$user.dialerType) === 'BLOOBIRDS_DIALER' || (settings === null || settings === void 0 ? void 0 : (_settings$user2 = settings.user) === null || _settings$user2 === void 0 ? void 0 : _settings$user2.dialerType) === 'ASTROLINE_DIALER' || !(settings !== null && settings !== void 0 && (_settings$user3 = settings.user) !== null && _settings$user3 !== void 0 && _settings$user3.dialerType)) {
            dialerShown = !!document.getElementById('dialer-drag-box');
            openBBDialer(number, bobjectId);
            if ((settings === null || settings === void 0 ? void 0 : (_settings$user4 = settings.user) === null || _settings$user4 === void 0 ? void 0 : _settings$user4.dialerType) === 'ASTROLINE_DIALER') {
              setTimeout(
              // @ts-ignore
              function () {
                var _window$frames$sf;
                return (_window$frames$sf = window.frames.sf) === null || _window$frames$sf === void 0 ? void 0 : _window$frames$sf.postMessage({
                  type: 'click2call',
                  data: {
                    number: number
                  }
                }, '*');
              }, dialerShown ? 200 : 800);
            }
          } else if ((settings === null || settings === void 0 ? void 0 : (_settings$user5 = settings.user) === null || _settings$user5 === void 0 ? void 0 : _settings$user5.dialerType) === 'AIRCALL_DIALER') {
            openBBDialer(null);
            setTimeout(function () {
              return openBBDialer(number, bobjectId);
            }, 1);
          } else if ((settings === null || settings === void 0 ? void 0 : (_settings$user6 = settings.user) === null || _settings$user6 === void 0 ? void 0 : _settings$user6.dialerType) === 'NUMINTEC_DIALER') {
            openBBDialer(null);
            setTimeout(function () {
              return openBBDialer(number, bobjectId);
            }, 1);
          } else if ((settings === null || settings === void 0 ? void 0 : (_settings$user7 = settings.user) === null || _settings$user7 === void 0 ? void 0 : _settings$user7.dialerType) === 'RINGOVER_DIALER') {
            openBBDialer(null);
            setTimeout(function () {
              return openBBDialer(number, bobjectId);
            }, 1);
          } else {
            window.open("tel:".concat(number), '_self');
          }
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function openPhoneOrDialer(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

function _typeof$4(obj) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$4(obj); }
function _regeneratorRuntime$3() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$3 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$4(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$3(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var isElementLoaded = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator$3( /*#__PURE__*/_regeneratorRuntime$3().mark(function _callee(selector) {
    var counter;
    return _regeneratorRuntime$3().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          counter = 0;
        case 1:
          if (!(document.querySelector(selector) === null && counter <= 200)) {
            _context.next = 7;
            break;
          }
          _context.next = 4;
          return new Promise(function (resolve) {
            requestAnimationFrame(resolve);
          });
        case 4:
          counter = counter + 1;
          _context.next = 1;
          break;
        case 7:
          return _context.abrupt("return", document.querySelector(selector));
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function isElementLoaded(_x) {
    return _ref.apply(this, arguments);
  };
}();
var waitForElement = function waitForElement(querySelector, resolve, reject, timeout) {
  var timer;
  var element = document.querySelector(querySelector);
  if (element) resolve(element);
  var observer = new MutationObserver(function () {
    var element = document.querySelector(querySelector);
    if (element) {
      if (timer) clearTimeout(timer);
      resolve(element);
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  if (timeout) timer = setTimeout(function () {
    console.log('Timeout reached');
    observer.disconnect();
    reject === null || reject === void 0 ? void 0 : reject();
  }, timeout);
};

var REGEX_REMOVE = /(<([^>]+)>)/gi;
var REGEX_ENTER = /(<\/?p>)|(<\/li>)|(<br>)/gi;
var REGEX_LIST = /(<li>)/gi;
var REGEX_MULTIPLE_SPACES = /  +/g;
var EMAIL_TYPE = {
  GMAIL: 'GMAIL',
  OUTLOOK: 'OUTLOOK',
  BLOOBIRDS: 'BLOOBIRDS'
};

/**
 * Removes HTML tags and special characters from a given text string.
 * @param text - The text string from which HTML tags need to be removed.
 * @returns A new text string with all HTML tags and special characters removed.
 */
var removeHtmlTags = function removeHtmlTags(text) {
  var htmlTagRegex = /<[^>]*>/gi;
  var specialCharactersRegex = /&[^;]+;/g;
  var foundTags = text.match(htmlTagRegex);
  var savedTags = [];
  foundTags === null || foundTags === void 0 ? void 0 : foundTags.forEach(function (tag) {
    if (tag === '<>') {
      savedTags.push(tag);
    } else if (tag === '</>' && savedTags.length > 0) {
      savedTags.pop();
    }
  });
  foundTags === null || foundTags === void 0 ? void 0 : foundTags.forEach(function (tag) {
    if (!savedTags.includes(tag)) {
      text = text.replace(tag, '');
    }
  });
  return text.replace(specialCharactersRegex, '');
};
var convertHtmlToString = function convertHtmlToString(body) {
  var _bodyParsed$replace, _bodyParsed$replace$r;
  var withNewLines = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var bodyWithVariables = isHtml(body) ? HTMLToString(body) : body;
  var bodyParsed = withNewLines ? bodyWithVariables === null || bodyWithVariables === void 0 ? void 0 : bodyWithVariables.replace(REGEX_ENTER, '\n') : bodyWithVariables;
  return bodyParsed === null || bodyParsed === void 0 ? void 0 : (_bodyParsed$replace = bodyParsed.replace(REGEX_LIST, '- ')) === null || _bodyParsed$replace === void 0 ? void 0 : (_bodyParsed$replace$r = _bodyParsed$replace.replace(REGEX_REMOVE, '')) === null || _bodyParsed$replace$r === void 0 ? void 0 : _bodyParsed$replace$r.replace(REGEX_MULTIPLE_SPACES, ' ').replace(/\s+/g, ' ');
};
var parseHtmlToEncodedString = function parseHtmlToEncodedString(body) {
  var withNewLines = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var plainText = convertHtmlToString(body, withNewLines);
  return encodeURIComponent(plainText.trim());
};
var PIXEL_REGEX = [/<[^>]+src\s*=\s*['"]*.*(mailtrack.io)([^'"]+)['"][^>]*>/g,
// mailtrack
/<[^>]+src="https:(\/\/nyl\.as|[^>]*.nylas.com).*[^>]*>/g,
// nylas
/<[^>]+href\s*=\s*['"]*.*(cirrusinsight.com)([^'"]+)['"][^>]*>/g,
// cirrus
/<img(?=\s)(?=[^>]*\bwidth\s*=\s*["']?1["']?)(?=[^>]*\bheight\s*=\s*["']?1["']?)(?![^>]*\bwidth\s*=\s*["']?[2-9]\d*["']?)(?![^>]*\bheight\s*=\s*["']?[2-9]\d*["']?)[^>]*>/g];
function parseEmailPixels(value) {
  var html = value;
  if (value) {
    html = PIXEL_REGEX.reduce(function (prev, regex) {
      return prev.replace(regex, '');
    }, value);
  }
  return html;
}
var createEmailLink = function createEmailLink(_ref) {
  var type = _ref.type,
    toEmail = _ref.toEmail,
    subject = _ref.subject,
    body = _ref.body;
  var parsedBody = parseHtmlToEncodedString(body || '', true);
  var parsedSubject = parseHtmlToEncodedString(subject || '', false);
  if (type === EMAIL_TYPE.GMAIL) {
    return "https://mail.google.com/mail/?view=cm&fs=1&to=".concat(encodeURIComponent(toEmail) || '', "&su=").concat(parsedSubject, "&body=").concat(parsedBody);
  }
  if (type === EMAIL_TYPE.OUTLOOK) {
    return "https://outlook.office.com/?path=/mail/action/compose&to=".concat(toEmail || '', "&subject=").concat(parsedSubject, "&body=").concat(parsedBody);
  }
  return "mailto:".concat(encodeURIComponent(toEmail) || '', "?subject=").concat(parsedSubject, "&body=").concat(parsedBody);
};
var EMAIL_MODE = Object.freeze({
  REPLY: 'REPLY',
  SEND: 'SEND'
});
var EmailModalType;
(function (EmailModalType) {
  EmailModalType["SEND"] = "SEND_NOW";
  EmailModalType["RETRY"] = "RETRY";
  EmailModalType["RESEND"] = "RESEND";
})(EmailModalType || (EmailModalType = {}));
var createParagraph = function createParagraph(text) {
  return [{
    type: 'p',
    children: [{
      text: text
    }]
  }];
};
var createH2 = function createH2(text) {
  return [{
    type: 'h2',
    children: [{
      text: text
    }]
  }];
};

// TODO: Add provider as how we were doing it before was not working
var fetchAndOpenNylasUrl = function fetchAndOpenNylasUrl() {
  api.get('/utils/nylas/generate-url').then(function (payload) {
    window.open(payload.data.url);
  });
};
var fetchAndOpenLegacyUrl = function fetchAndOpenLegacyUrl() {
  api.get('/utils/service/gmail/connections/endpoint').then(function (payload) {
    window.open(payload.data.endpoint);
  });
};

function removeScrollOfBox() {
  var salesforceBox = document.querySelector('.viewport');
  var linkedInBox = document.querySelector('.ember-application');
  var scrollableBox = salesforceBox || linkedInBox;
  if (scrollableBox) {
    var hasScroll = scrollableBox.scrollHeight > window.innerHeight;
    var header = document.querySelector('#oneHeader');
    if (hasScroll) {
      if (header) {
        header.setAttribute('style', "padding-right: 6px; background-color: white;");
      }
      scrollableBox.setAttribute('style', "overflow: hidden; margin-right: 6px;");
    }
    var messageOverlay = document.querySelector('#msg-overlay');
    if (messageOverlay) {
      messageOverlay.style.right = '6px';
    }
  }
}
function recoverScrollOfBox() {
  var salesforceBox = document.querySelector('.viewport');
  var linkedInBox = document.querySelector('.ember-application');
  var scrollableBox = salesforceBox || linkedInBox;
  if (scrollableBox) {
    var header = document.querySelector('#oneHeader');
    if (header) {
      header.removeAttribute('style');
    }
    scrollableBox.removeAttribute('style');
    var messageOverlay = document.querySelector('#msg-overlay');
    if (messageOverlay) {
      messageOverlay.style.right = '0px';
    }
  }
}

function _typeof$3(obj) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$3(obj); }
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$3(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$3(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$3(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime$2() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$2 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$3(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$2(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
if (typeof chrome !== 'undefined') {
  var _chrome$storage, _chrome$storage$sync;
  (_chrome$storage = chrome.storage) === null || _chrome$storage === void 0 ? void 0 : (_chrome$storage$sync = _chrome$storage.sync) === null || _chrome$storage$sync === void 0 ? void 0 : _chrome$storage$sync.set({
    dataBackendUrl: 'https://bobject-api.bloobirds.com'
  });
}
var accountDataModel = function accountDataModel(_ref) {
  var dataModel = _ref.dataModel;
  return {
    getAccountId: function getAccountId() {
      return dataModel === null || dataModel === void 0 ? void 0 : dataModel.accountId;
    },
    getFieldsByBobjectType: function getFieldsByBobjectType(bobjectType) {
      var _dataModel$types;
      return dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$types = dataModel.types) === null || _dataModel$types === void 0 ? void 0 : _dataModel$types.find(function (type) {
        return (type === null || type === void 0 ? void 0 : type.name) === bobjectType;
      });
    },
    findValueById: function findValueById(id) {
      var _dataModel$types2, _dataModel$types2$fla, _dataModel$types2$fla2;
      return dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$types2 = dataModel.types) === null || _dataModel$types2 === void 0 ? void 0 : (_dataModel$types2$fla = _dataModel$types2.flatMap(function (type) {
        return type === null || type === void 0 ? void 0 : type.fields;
      })) === null || _dataModel$types2$fla === void 0 ? void 0 : (_dataModel$types2$fla2 = _dataModel$types2$fla.flatMap(function (field) {
        return field === null || field === void 0 ? void 0 : field.values;
      })) === null || _dataModel$types2$fla2 === void 0 ? void 0 : _dataModel$types2$fla2.find(function (value) {
        return (value === null || value === void 0 ? void 0 : value.id) === id;
      });
    },
    findValueByLabel: function findValueByLabel(label) {
      var _dataModel$types3, _dataModel$types3$fla, _dataModel$types3$fla2;
      return dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$types3 = dataModel.types) === null || _dataModel$types3 === void 0 ? void 0 : (_dataModel$types3$fla = _dataModel$types3.flatMap(function (type) {
        return type === null || type === void 0 ? void 0 : type.fields;
      })) === null || _dataModel$types3$fla === void 0 ? void 0 : (_dataModel$types3$fla2 = _dataModel$types3$fla.flatMap(function (field) {
        return field === null || field === void 0 ? void 0 : field.values;
      })) === null || _dataModel$types3$fla2 === void 0 ? void 0 : _dataModel$types3$fla2.find(function (value) {
        return (value === null || value === void 0 ? void 0 : value.name) === label;
      });
    },
    findValueByLogicRole: function findValueByLogicRole(logicRole) {
      var _dataModel$types4, _dataModel$types4$fla, _dataModel$types4$fla2;
      return dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$types4 = dataModel.types) === null || _dataModel$types4 === void 0 ? void 0 : (_dataModel$types4$fla = _dataModel$types4.flatMap(function (type) {
        return type === null || type === void 0 ? void 0 : type.fields;
      })) === null || _dataModel$types4$fla === void 0 ? void 0 : (_dataModel$types4$fla2 = _dataModel$types4$fla.flatMap(function (field) {
        return field === null || field === void 0 ? void 0 : field.values;
      })) === null || _dataModel$types4$fla2 === void 0 ? void 0 : _dataModel$types4$fla2.find(function (value) {
        return (value === null || value === void 0 ? void 0 : value.id) === logicRole;
      });
    },
    findValuesByFieldId: function findValuesByFieldId(fieldId) {
      var _dataModel$types5, _dataModel$types5$fla, _dataModel$types5$fla2;
      return dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$types5 = dataModel.types) === null || _dataModel$types5 === void 0 ? void 0 : (_dataModel$types5$fla = _dataModel$types5.flatMap(function (type) {
        return type === null || type === void 0 ? void 0 : type.fields;
      })) === null || _dataModel$types5$fla === void 0 ? void 0 : (_dataModel$types5$fla2 = _dataModel$types5$fla.find(function (field) {
        return (field === null || field === void 0 ? void 0 : field.id) === fieldId;
      })) === null || _dataModel$types5$fla2 === void 0 ? void 0 : _dataModel$types5$fla2.values;
    },
    findValuesByFieldLogicRole: function findValuesByFieldLogicRole(fieldLogicRole) {
      var _dataModel$types6, _dataModel$types6$fla, _dataModel$types6$fla2;
      return dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$types6 = dataModel.types) === null || _dataModel$types6 === void 0 ? void 0 : (_dataModel$types6$fla = _dataModel$types6.flatMap(function (type) {
        return type === null || type === void 0 ? void 0 : type.fields;
      })) === null || _dataModel$types6$fla === void 0 ? void 0 : (_dataModel$types6$fla2 = _dataModel$types6$fla.find(function (field) {
        return (field === null || field === void 0 ? void 0 : field.logicRole) === fieldLogicRole;
      })) === null || _dataModel$types6$fla2 === void 0 ? void 0 : _dataModel$types6$fla2.values;
    },
    findFieldById: function findFieldById(id) {
      var _dataModel$types7, _dataModel$types7$fla;
      return dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$types7 = dataModel.types) === null || _dataModel$types7 === void 0 ? void 0 : (_dataModel$types7$fla = _dataModel$types7.flatMap(function (type) {
        return type === null || type === void 0 ? void 0 : type.fields;
      })) === null || _dataModel$types7$fla === void 0 ? void 0 : _dataModel$types7$fla.find(function (field) {
        return (field === null || field === void 0 ? void 0 : field.id) === id;
      });
    },
    findFieldByLogicRole: function findFieldByLogicRole(logicRole) {
      var _dataModel$types8, _dataModel$types8$fla;
      return dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$types8 = dataModel.types) === null || _dataModel$types8 === void 0 ? void 0 : (_dataModel$types8$fla = _dataModel$types8.flatMap(function (type) {
        return type === null || type === void 0 ? void 0 : type.fields;
      })) === null || _dataModel$types8$fla === void 0 ? void 0 : _dataModel$types8$fla.find(function (field) {
        return (field === null || field === void 0 ? void 0 : field.logicRole) === logicRole;
      });
    }
  };
};
function getDataModel() {
  return _getDataModel.apply(this, arguments);
}
function _getDataModel() {
  _getDataModel = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee() {
    var _yield$api$get, dataModel;
    return _regeneratorRuntime$2().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return api.get('/utils/service/datamodel', {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {}
          });
        case 3:
          _yield$api$get = _context.sent;
          dataModel = _yield$api$get.data;
          return _context.abrupt("return", accountDataModel({
            dataModel: dataModel
          }));
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", null);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _getDataModel.apply(this, arguments);
}
function getBuyerPersonas() {
  return _getBuyerPersonas.apply(this, arguments);
}
function _getBuyerPersonas() {
  _getBuyerPersonas = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee2() {
    var _yield$api$get2, data;
    return _regeneratorRuntime$2().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return api.get('/utils/service/view/idealCustomerProfile', {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {}
          });
        case 3:
          _yield$api$get2 = _context2.sent;
          data = _yield$api$get2.data;
          return _context2.abrupt("return", data);
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", null);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _getBuyerPersonas.apply(this, arguments);
}
function getTargetMarkets() {
  return _getTargetMarkets.apply(this, arguments);
}
function _getTargetMarkets() {
  _getTargetMarkets = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee3() {
    var _yield$api$get3, data;
    return _regeneratorRuntime$2().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return api.get('/utils/service/view/targetMarket', {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {}
          });
        case 3:
          _yield$api$get3 = _context3.sent;
          data = _yield$api$get3.data;
          return _context3.abrupt("return", data);
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", null);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return _getTargetMarkets.apply(this, arguments);
}
function searchUsers() {
  return _searchUsers.apply(this, arguments);
}
function _searchUsers() {
  _searchUsers = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee4() {
    var _yield$api$post, data;
    return _regeneratorRuntime$2().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return api.post('/utils/service/users/search', {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
              active: true
            }
          });
        case 3:
          _yield$api$post = _context4.sent;
          data = _yield$api$post.data;
          return _context4.abrupt("return", data);
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", null);
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return _searchUsers.apply(this, arguments);
}
function searchLead(_x) {
  return _searchLead.apply(this, arguments);
}
function _searchLead() {
  _searchLead = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee5(linkedInUrl) {
    var _yield$api$get4, data;
    return _regeneratorRuntime$2().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return api.get('/linkedin/search/leads', {
            params: {
              linkedInUrl: linkedInUrl
            }
          });
        case 3:
          _yield$api$get4 = _context5.sent;
          data = _yield$api$get4.data;
          return _context5.abrupt("return", data);
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", null);
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return _searchLead.apply(this, arguments);
}
function searchLeadByQuery(_x2) {
  return _searchLeadByQuery.apply(this, arguments);
}
function _searchLeadByQuery() {
  _searchLeadByQuery = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee6(query) {
    var _yield$api$post2, data;
    return _regeneratorRuntime$2().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return api.post('/linkedin/leads/query', _objectSpread$1({}, query));
        case 3:
          _yield$api$post2 = _context6.sent;
          data = _yield$api$post2.data;
          return _context6.abrupt("return", data);
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", null);
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return _searchLeadByQuery.apply(this, arguments);
}
function searchCompaniesByQuery(_x3) {
  return _searchCompaniesByQuery.apply(this, arguments);
}
function _searchCompaniesByQuery() {
  _searchCompaniesByQuery = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee7(query) {
    var _yield$api$post3, data;
    return _regeneratorRuntime$2().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return api.post('/linkedin/companies/query', _objectSpread$1({}, query));
        case 3:
          _yield$api$post3 = _context7.sent;
          data = _yield$api$post3.data;
          return _context7.abrupt("return", data);
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", null);
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 8]]);
  }));
  return _searchCompaniesByQuery.apply(this, arguments);
}
function updateLeadSalesNavigatorUrl(_x4, _x5) {
  return _updateLeadSalesNavigatorUrl.apply(this, arguments);
}
function _updateLeadSalesNavigatorUrl() {
  _updateLeadSalesNavigatorUrl = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee8(bobjectId, salesNavigatorUrl) {
    return _regeneratorRuntime$2().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          return _context8.abrupt("return", api.put("/linkedin/leads/".concat(bobjectId.objectId, "/setSalesNavigatorUrl"), {
            salesNavigatorUrl: salesNavigatorUrl
          }));
        case 1:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _updateLeadSalesNavigatorUrl.apply(this, arguments);
}
function updateLeadLinkedInUrl(_x6, _x7) {
  return _updateLeadLinkedInUrl.apply(this, arguments);
}
function _updateLeadLinkedInUrl() {
  _updateLeadLinkedInUrl = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee9(bobjectId, linkedInUrl) {
    return _regeneratorRuntime$2().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          return _context9.abrupt("return", api.put("/linkedin/leads/".concat(bobjectId.objectId, "/setLinkedInUrl"), {
            linkedInUrl: linkedInUrl
          }));
        case 1:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return _updateLeadLinkedInUrl.apply(this, arguments);
}
function updateLead(_x8, _x9, _x10) {
  return _updateLead.apply(this, arguments);
}
function _updateLead() {
  _updateLead = _asyncToGenerator$2( /*#__PURE__*/_regeneratorRuntime$2().mark(function _callee10(bobjectId, linkedInUrl, salesNavigatorURL) {
    return _regeneratorRuntime$2().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          return _context10.abrupt("return", api.put('/linkedin/leads/' + (bobjectId === null || bobjectId === void 0 ? void 0 : bobjectId.objectId), {
            salesNavigatorUrl: salesNavigatorURL || null,
            linkedInUrl: linkedInUrl || null
          }));
        case 1:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return _updateLead.apply(this, arguments);
}

var addTemplateInLinkedIn = function addTemplateInLinkedIn(_ref) {
  var parentForm = _ref.parentForm,
    content = _ref.content,
    callback = _ref.callback;
  var div = parentForm.querySelector('.msg-form__contenteditable');
  var placeHolderDiv = parentForm.querySelector('div[class^="msg-form__placeholder"]');
  if (div) {
    // Add template to textbox
    div.childNodes.forEach(function (node) {
      return div.removeChild(node);
    });
    if (placeHolderDiv) {
      // Remove the placeholder div to not overlay the "Write new message.." text.
      placeHolderDiv.remove();
    }
    div.innerHTML = content.replaceAll('</div>', '</p>').replaceAll('<div>', '<p>').replaceAll('<br>', '<p><br></p>');
    div.dispatchEvent(new KeyboardEvent('input', {
      bubbles: true,
      cancelable: true
    }));
    callback === null || callback === void 0 ? void 0 : callback();
  }
};
var addTemplateInSalesNav = function addTemplateInSalesNav(_ref2) {
  var parentForm = _ref2.parentForm,
    content = _ref2.content,
    callback = _ref2.callback;
  var textArea = parentForm.querySelector('.compose-form__message-field');
  if (textArea) {
    textArea.value = content.replace(/<(?:br|\/div|\/p)>/g, '\n').replace(/<.*?>/g, '');
    textArea.focus();
    callback === null || callback === void 0 ? void 0 : callback();
  }
};

var isLeadPage = function isLeadPage(pathname) {
  var regex = /.+\/(?:leads(?=\/[0-9a-zA-Z]*)|companies(?=\/[0-9a-zA-Z]*\?leadId=[0-9a-zA-Z]*\/Lead\/[0-9a-zA-Z]*))/;
  return regex.test(pathname);
};
var isLeadWithoutCompanyPage = function isLeadWithoutCompanyPage(pathname) {
  var regex = /.+\/leads\/[0-9a-zA-Z]*/;
  return regex.test(pathname);
};
var isCompanyPage = function isCompanyPage(pathname) {
  var regex = /.+\/companies\/[0-9a-zA-Z]*/;
  return regex.test(pathname);
};
var isOpportunityPage = function isOpportunityPage(pathname) {
  var regex = /.+\/opportunities\/[0-9a-zA-Z]*/;
  return regex.test(pathname);
};
var isSalesPage = function isSalesPage(pathname) {
  var regex = /.+\/tasks\/sales*/;
  return regex.test(pathname);
};
var isProspectingPage = function isProspectingPage(pathname) {
  var regex = /.+\/tasks\/prospecting*/;
  return regex.test(pathname);
};
var isCompanyTasksPage = function isCompanyTasksPage(pathname) {
  var regex = /.+\/companies\/[a-zA-Z0-9]*\/tasks\/[a-zA-Z0-9]*/;
  return regex.test(pathname);
};
var isMatchingRoute = function isMatchingRoute(route, location) {
  var croppedRoute = route.lastIndexOf('/');
  var croppedLocation = location.lastIndexOf('/');
  if (isSalesPage(location) || isProspectingPage(location)) {
    return croppedRoute === croppedLocation;
  }
  return false;
};

var constructMixpanelCustomRoute = function constructMixpanelCustomRoute(path) {
  if (isLeadPage(path)) {
    return 'LEAD_PAGE';
  }
  if (isCompanyPage(path)) {
    return 'COMPANY_PAGE';
  }
  if (isLeadWithoutCompanyPage(path)) {
    return 'LEAD_WITHOUT_COMPANY_PAGE';
  }
  if (isOpportunityPage(path)) {
    return 'OPP_PAGE';
  }
  return path;
};

var ModalType;
(function (ModalType) {
  ModalType["PREVIEW_EMAIL"] = "previewEmail";
  ModalType["RETRY_EMAIL"] = "retryEmail";
  ModalType["SEND_NOW_EMAIL"] = "sendNowEmail";
  ModalType["RESCHEDULE_EMAIL"] = "rescheduleEmail";
  ModalType["CANCEL_EMAIL"] = "cancelEmail";
})(ModalType || (ModalType = {}));

function toHoursAndMinutes(totalMinutes) {
  var minutes = totalMinutes % 60;
  var hours = Math.floor(totalMinutes / 60);
  return "".concat(hours > 0 ? hours + 'hr ' : '').concat(minutes > 0 ? minutes + 'min' : '');
}
function getHoursMinutesSeconds(totalSeconds) {
  var hours = Math.floor(totalSeconds / 3600);
  var remainingSecondsAfterHours = totalSeconds % 3600;
  var minutes = Math.floor(remainingSecondsAfterHours / 60);
  var seconds = remainingSecondsAfterHours % 60;
  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}
function parseCurrency(amount) {
  var _navigator;
  return new Intl.NumberFormat(((_navigator = navigator) === null || _navigator === void 0 ? void 0 : _navigator.language) || 'en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof$2(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof$2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
var sliceObject = function sliceObject(object, start, end) {
  var objectKeys = Object.keys(object);
  var keys = objectKeys.splice(start, end);
  return keys.map(function (key) {
    return object[key];
  });
};
var mergeRemovingUndefined = function mergeRemovingUndefined() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }
  var undefinedKeys = values.flatMap(function (obj) {
    return Object.keys(obj).filter(function (key) {
      return isUndefined(obj[key]);
    });
  });
  return pickBy(assign.apply(void 0, [{}].concat(values)), function (value, key) {
    return !undefinedKeys.includes(key);
  });
};
var isObject = function isObject(obj) {
  return _typeof$2(obj) === 'object' && obj !== null && !Array.isArray(obj);
};
var isEmptyObject = function isEmptyObject() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(obj).length === 0;
};
var isEqual = function isEqual(obj1, obj2) {
  if (isObject(obj1) && isObject(obj2)) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  return false;
};
var mergeTwoObjectsRecursive = function mergeTwoObjectsRecursive(a, b) {
  var result = {};
  for (var _key2 in a) {
    if (isObject(a[_key2]) && isObject(b[_key2])) {
      result[_key2] = mergeTwoObjectsRecursive(a[_key2], b[_key2]);
    }
  }
  return _objectSpread(_objectSpread(_objectSpread({}, a), b), result);
};
var mergeTwoObjects = function mergeTwoObjects(a, b) {
  if (isObject(a) && isObject(b)) {
    return mergeTwoObjectsRecursive(a, b);
  } else if (isObject(a)) {
    return a;
  } else if (isObject(b)) {
    return b;
  } else return undefined;
};
var haveSameContentArrays = function haveSameContentArrays(a, b) {
  var sameOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (a === b) {
    return true;
  }
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  if (sameOrder) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
  } else {
    for (var _i = 0; _i < a.length; _i++) {
      if (!a.includes(b[_i]) || !b.includes(a[_i])) {
        return false;
      }
    }
  }
  return true;
};
function areListsEqual(list1, list2) {
  if (Array.isArray(list1) && Array.isArray(list2)) {
    if (list1.length === list2.length) {
      return list1.every(function (obj, index) {
        return isEqual(obj, list2[index]);
      });
    }
  }
  return false;
}
var partition = function partition(array, callback) {
  var matches = [];
  var nonMatches = [];
  array.forEach(function (element) {
    return (callback(element) ? matches : nonMatches).push(element);
  });
  return [matches, nonMatches];
};

var isValidPhone = function isValidPhone(phone) {
  try {
    var extraValidPrefixes = ['225', '00225'];
    var cleanedPhoneNumber = phone.replace(/\D/g, '');
    for (var _i = 0, _extraValidPrefixes = extraValidPrefixes; _i < _extraValidPrefixes.length; _i++) {
      var prefix = _extraValidPrefixes[_i];
      if (cleanedPhoneNumber.startsWith(prefix)) {
        if (cleanedPhoneNumber.length >= 10 && cleanedPhoneNumber.length <= 13) {
          return true;
        }
      }
    }
    var phoneParsed = parsePhoneNumber(phone);
    return phoneParsed.isValid();
  } catch (e) {
    return false;
  }
};

var relatedPickableIcons = [{
  name: 'salesforce',
  color: 'bloobirds'
}, {
  name: 'briefcase',
  color: 'banana'
}, {
  name: 'file',
  color: 'extraCall'
}, {
  name: 'assignBoard',
  color: 'darkBloobirds'
}, {
  name: 'whatsapp',
  color: 'extraCall'
}, {
  name: 'customTask',
  color: 'bloobirds'
}, {
  name: 'linkedin',
  color: 'darkBloobirds'
}, {
  name: 'calendar',
  color: 'tomato'
}, {
  name: 'noteAction',
  color: 'banana'
}, {
  name: 'person',
  color: 'tangerine'
}, {
  name: 'chat',
  color: 'purple'
}, {
  name: 'postalMail',
  color: 'bloobirds'
}, {
  name: 'calendarphone',
  color: 'grape'
}, {
  name: 'checkDouble',
  color: 'extraCall'
}, {
  name: 'bell',
  color: 'bloobirds'
}, {
  name: 'starUnchecked',
  color: 'banana'
}, {
  name: 'location',
  color: 'tomato'
}, {
  name: 'mail',
  color: 'tangerine'
}, {
  name: 'pitch',
  color: 'lightPurple'
}, {
  name: 'fileOpportunity',
  color: 'extraCall'
}];

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
function _regeneratorRuntime$1() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$1 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$1(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$1(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function getSalesforceSobject(_x, _x2) {
  return _getSalesforceSobject.apply(this, arguments);
}
function _getSalesforceSobject() {
  _getSalesforceSobject = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee(sobjectType, id) {
    var _yield$api$get, data;
    return _regeneratorRuntime$1().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return api.get("/utils/service/salesforce/sobject/".concat(sobjectType, "/").concat(id));
        case 3:
          _yield$api$get = _context.sent;
          data = _yield$api$get.data;
          return _context.abrupt("return", data);
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          return _context.abrupt("return", null);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _getSalesforceSobject.apply(this, arguments);
}
function getSalesforceListDefinition(_x3, _x4) {
  return _getSalesforceListDefinition.apply(this, arguments);
}
function _getSalesforceListDefinition() {
  _getSalesforceListDefinition = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee2(sobjectType, id) {
    var _yield$api$get2, data;
    return _regeneratorRuntime$1().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return api.get("/utils/service/salesforce/total/".concat(sobjectType, "/").concat(id));
        case 3:
          _yield$api$get2 = _context2.sent;
          data = _yield$api$get2.data;
          return _context2.abrupt("return", data);
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          return _context2.abrupt("return", null);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _getSalesforceListDefinition.apply(this, arguments);
}
function querySalesforce(_x5) {
  return _querySalesforce.apply(this, arguments);
}
function _querySalesforce() {
  _querySalesforce = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee3(query) {
    var _yield$api$post, data;
    return _regeneratorRuntime$1().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return api.post("/utils/service/salesforce/query", {
            query: query
          });
        case 3:
          _yield$api$post = _context3.sent;
          data = _yield$api$post.data;
          return _context3.abrupt("return", data);
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          return _context3.abrupt("return", null);
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return _querySalesforce.apply(this, arguments);
}
function createBobjectInSfdc(_x6, _x7) {
  return _createBobjectInSfdc.apply(this, arguments);
}
function _createBobjectInSfdc() {
  _createBobjectInSfdc = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee4(composedBobjectId, createContact) {
    var _yield$api$post2, data;
    return _regeneratorRuntime$1().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return api.post("/utils/service/salesforce/sync/".concat(composedBobjectId).concat(createContact ? '?createContact=true' : ''), {});
        case 3:
          _yield$api$post2 = _context4.sent;
          data = _yield$api$post2.data;
          return _context4.abrupt("return", data);
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          throw _context4.t0;
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return _createBobjectInSfdc.apply(this, arguments);
}
function getSobjectTypeFromId(sobjectId) {
  var startingSobjectId = sobjectId === null || sobjectId === void 0 ? void 0 : sobjectId.slice(0, 3);
  switch (startingSobjectId) {
    case '001':
      return 'Account';
    case '003':
      return 'Contact';
    case '00Q':
      return 'Lead';
    case '006':
      return 'Opportunity';
    default:
      return 'Other';
  }
}
var SALESFORCE_ID_FIELDS;
(function (SALESFORCE_ID_FIELDS) {
  SALESFORCE_ID_FIELDS["LEAD_ID_FIELD"] = "SALESFORCE_LEAD_ID";
  SALESFORCE_ID_FIELDS["CONTACT_ID_FIELD"] = "SALESFORCE_CONTACT_ID";
  SALESFORCE_ID_FIELDS["ACCOUNT_ID_FIELD"] = "SALESFORCE_ACCOUNT_ID";
  SALESFORCE_ID_FIELDS["OPPORTUNITY_ID_FIELD"] = "SALESFORCE_OPPORTUNITY_ID";
})(SALESFORCE_ID_FIELDS || (SALESFORCE_ID_FIELDS = {}));
function getSobjectIdLogicRoleFromId(sobjectId) {
  var startingSobjectId = sobjectId === null || sobjectId === void 0 ? void 0 : sobjectId.slice(0, 3);
  switch (startingSobjectId) {
    case '001':
      return SALESFORCE_ID_FIELDS.ACCOUNT_ID_FIELD;
    case '003':
      return SALESFORCE_ID_FIELDS.CONTACT_ID_FIELD;
    case '00Q':
      return SALESFORCE_ID_FIELDS.LEAD_ID_FIELD;
    case '006':
      return SALESFORCE_ID_FIELDS.OPPORTUNITY_ID_FIELD;
    default:
      return null;
  }
}
function isSyncableSobject(id) {
  return ['001', '003', '00Q', '006'].includes(id === null || id === void 0 ? void 0 : id.slice(0, 3));
}
var isContactSalesforce = function isContactSalesforce(bobject) {
  return isLead(bobject) && (getValueFromLogicRole(bobject, SALESFORCE_LOGIC_ROLES.CONTACT_ID_FIELD) != null || getSobjectIdLogicRoleFromId(bobject === null || bobject === void 0 ? void 0 : bobject.salesforceId) === SALESFORCE_ID_FIELDS.CONTACT_ID_FIELD);
};
var getSobjectTypeFromBobject = function getSobjectTypeFromBobject(bobject) {
  var _bobject$id;
  switch (bobject === null || bobject === void 0 ? void 0 : (_bobject$id = bobject.id) === null || _bobject$id === void 0 ? void 0 : _bobject$id.typeName) {
    case BobjectTypes.Company:
      return 'Account';
    case BobjectTypes.Lead:
      return isContactSalesforce(bobject) ? 'Contact' : 'Lead';
    case BobjectTypes.Opportunity:
      return 'Opportunity';
    default:
      return null;
  }
};
var getSalesforceStatusApiNameField = function getSalesforceStatusApiNameField(bobjectType) {
  switch (bobjectType) {
    case BobjectTypes.Company:
      return SALESFORCE_LOGIC_ROLES.SALESFORCE_COMPANY_STATUS;
    case BobjectTypes.Lead:
      return SALESFORCE_LOGIC_ROLES.SALESFORCE_LEAD_STATUS;
    case BobjectTypes.Opportunity:
      return SALESFORCE_LOGIC_ROLES.SALESFORCE_OPPORTUNITY_STAGE;
    default:
      return null;
  }
};
var getCurrentSalesforceStatusField = function getCurrentSalesforceStatusField(bobject) {
  if (!bobject) {
    return null;
  }
  var bobjectType = bobject.id.typeName;
  if (!bobject.fields) {
    var isOpp = bobjectType === BobjectTypes.Opportunity;
    return {
      value: bobject[isOpp ? 'salesforceStage' : 'salesforceStatus']
    };
  }
  var salesforceStatusLogicRole = getSalesforceStatusApiNameField(bobjectType);
  return salesforceStatusLogicRole && getFieldByLogicRole(bobject, salesforceStatusLogicRole);
};

// colors with some colors remove to avoid some light colors to appear
var colors = {
  darkBloobirds: '#0077b5',
  bloobirds: '#1991ff',
  lightBloobirds: '#cde2f6',
  darkGray: '#484848',
  gray: '#b8b8b8',
  peanut: '#464f57',
  softPeanut: '#94a5ba',
  banana: '#ffbd19',
  softBanana: '#ffd166',
  melon: '#63ba00',
  softMelon: '#b4de85',
  grape: '#42da9c',
  softGrape: '#81ecc0',
  tangerine: '#ff8433',
  softTangerine: '#ffa366',
  seagreen: '#50ecac',
  tomato: '#f5245b',
  softTomato: '#ff6685',
  condition: '#8e8e8e',
  softCondition: '#b3b3b3',
  extraDarkBackground: '#606871',
  extraMeeting: '#F53158',
  extraCall: '#63BA00'
};
var softColors = {
  softBanana: '#ffd166',
  softBloobirds: '#43a3fd',
  softGrape: '#81ecc0',
  softMelon: '#b4de85',
  softPeanut: '#94a5ba',
  softPurple: '#5b67ea',
  softTangerine: '#ffa366',
  softTomato: '#ff6685'
};
var randomizeColor = function randomizeColor() {
  var pantones = Object.values(colors);
  return pantones[Math.floor(Math.random() * Object.keys(colors).length)];
};
var randomizeColorName = function randomizeColorName() {
  var pantones = Object.keys(colors);
  return pantones[Math.floor(Math.random() * Object.keys(colors).length)];
};
var randomizeColorNameN = function randomizeColorNameN(n) {
  var pantones = Object.keys(colors);
  return pantones[Math.floor(Math.random() * Object.keys(colors).length % n)];
};
var getColorByIndex = function getColorByIndex(index) {
  var pantones = Object.values(colors);
  return pantones[index % pantones.length];
};
var isSizeNumber = function isSizeNumber(size) {
  return size && !isNaN(size);
};

/* eslint-disable no-unused-vars */

/*
  This is a SWR Utils used also in our app, any change here please propagate to our app
 */

// This is a SWR middleware for keeping the data even if key changes.
function keepPreviousResponse(useSWRNext) {
  return function (key, fetcher, config) {
    // Use a ref to store previous returned data.
    var laggyDataRef = useRef();

    // Actual SWR hook.
    var swr = useSWRNext(key, fetcher, config);
    useEffect(function () {
      // Update ref if data is not undefined.
      if (swr.data !== undefined) {
        laggyDataRef.current = swr.data;
      }
    }, [swr.data]);

    // Expose a method to clear the laggy data, if any.
    var resetLaggy = useCallback(function () {
      laggyDataRef.current = undefined;
    }, []);

    // Fallback to previous data if the current data is undefined.
    var dataOrLaggyData = swr.data === undefined ? laggyDataRef.current : swr.data;

    // Is it showing previous data?
    var isLagging = swr.data === undefined && laggyDataRef.current !== undefined;

    // Also add a `isLagging` field to SWR.
    return Object.assign({}, swr, {
      data: dataOrLaggyData,
      isLagging: isLagging,
      resetLaggy: resetLaggy
    });
  };
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var openNewTab = function openNewTab(page, queryParams) {
  var url = "".concat(window.location.protocol, "//").concat(window.location.host).concat(page);
  var queryParamsParsed = queryParams && Object.keys(queryParams).map(function (key) {
    return "".concat(key, "=").concat(queryParams[key]);
  })[0];
  if (queryParamsParsed) {
    url = "".concat(url, "?").concat(queryParamsParsed);
  }
  window.open(url, '_blank');
};
var addHttpIfNeeded = function addHttpIfNeeded(url) {
  if (!/^https?:\/\//i.test(url)) {
    return "http://".concat(url);
  }
  return url;
};
var addHttpsIfNeeded = function addHttpsIfNeeded(url) {
  if (!/^https?:\/\//i.test(url)) {
    return "https://".concat(url);
  }
  return url;
};
var baseUrls = {
  production: 'https://app.bloobirds.com',
  development: 'https://app.dev-bloobirds.com',
  staging: 'https://app.staging-bloobirds.com',
  local: 'http://localhost:3000'
};
function getLinkedinPathname(currentPage) {
  var match = currentPage === null || currentPage === void 0 ? void 0 : currentPage.split('linkedin.com');
  if (match && match.length > 1) {
    return match[1];
  } else {
    return '';
  }
}
function getSalesforcePathname(currentPage) {
  var match = currentPage.split('lightning.force.com');
  if (match && match.length > 1) {
    return match[1];
  } else {
    return '';
  }
}
var SALESFORCE_OBJECT_TYPES = ['Lead', 'Contact', 'Opportunity', 'Account', 'Task', 'Event'];
var SYNCABLE_SALESFORCE_OBJECT_TYPES = ['Lead', 'Contact', 'Opportunity', 'Account'];
function getMainSalesforceObjectFromURL(currentPage) {
  var _pathname;
  var pathname = getSalesforcePathname(currentPage);
  if (currentPage.includes('ws=')) {
    var _currentPage$split;
    pathname = currentPage === null || currentPage === void 0 ? void 0 : (_currentPage$split = currentPage.split('ws=')) === null || _currentPage$split === void 0 ? void 0 : _currentPage$split[0];
  }
  var pathSplit = (_pathname = pathname) === null || _pathname === void 0 ? void 0 : _pathname.split('/');
  if (!pathSplit) {
    return null;
  }
  var _iterator = _createForOfIteratorHelper(SALESFORCE_OBJECT_TYPES),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var s = _step.value;
      if (pathSplit.indexOf(s) !== -1) {
        return s;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return null;
}

// Salesforce uses WS query param on nested sobject routes
var getSalesforceObjectFromWSParam = function getSalesforceObjectFromWSParam(currentPage) {
  var url = new URL(currentPage);
  var urlParams = new URLSearchParams(url === null || url === void 0 ? void 0 : url.search);
  var ws = urlParams.get('ws');
  var wsSplit = ws === null || ws === void 0 ? void 0 : ws.split('/');
  if (!wsSplit) {
    return null;
  }
  for (var _i = 0, _SALESFORCE_OBJECT_TY = SALESFORCE_OBJECT_TYPES; _i < _SALESFORCE_OBJECT_TY.length; _i++) {
    var s = _SALESFORCE_OBJECT_TY[_i];
    if (wsSplit && (wsSplit === null || wsSplit === void 0 ? void 0 : wsSplit.indexOf(s)) !== -1) {
      return s;
    }
  }
  return null;
};
function isLinkedInMessagesPage(currentPage) {
  return !!getLinkedinPathname(currentPage).match('^/messaging/');
}
function isSalesNavigatorMessagesPage(currentPage) {
  return !!getLinkedinPathname(currentPage).match('^/sales/inbox');
}
function isLinkedInProfilePage(currentPage) {
  return !!getLinkedinPathname(currentPage).match('^/in/');
}
function isLinkedInExamplePage(currentPage) {
  return !!getLinkedinPathname(currentPage).match('^/in/tonipereznavarro');
}
function isSalesNavigatorPage(currentPage) {
  return !!getLinkedinPathname(currentPage).match('^/sales');
}
function isSalesNavigatorProfile(currentPage) {
  return !!getLinkedinPathname(currentPage).match('^/sales/people/') || !!getLinkedinPathname(currentPage).match('^/sales/lead/');
}
function isSalesforcePage(currentPage) {
  return !!currentPage.match('^.*://.*.lightning.force.com.*');
}
function isDynamicsPage(currentPage) {
  return !!currentPage.match('^.*://.*.crm4.dynamics.com.*');
}
function isDynamicsListPage(currentPage) {
  var _URLSearchParams;
  var pageType = (_URLSearchParams = new URLSearchParams(window.location.search)) === null || _URLSearchParams === void 0 ? void 0 : _URLSearchParams.get('pagetype');
  return !!currentPage.match('^.*://.*.crm4.dynamics.com.*') && pageType === 'entitylist';
}
function getDynamicsEntityType(currentPage) {
  var _URLSearchParams2;
  return (_URLSearchParams2 = new URLSearchParams(window.location.search)) === null || _URLSearchParams2 === void 0 ? void 0 : _URLSearchParams2.get('etn');
}
function shouldInjectSalesforce(currentPage) {
  var pathname = getSalesforcePathname(currentPage);
  return !pathname.includes('/lightning/setup');
}
function isLinkedinOrSalesNav(currentPage) {
  return currentPage.includes('linkedin');
}
function isListOrSetupPage(path) {
  return !!path.match('/home') || !!path.match('/list') || !!path.match('/setup');
}
function isSalesforceTaskPage(currentPage) {
  var pathname = getSalesforcePathname(currentPage);
  var pathSplit = pathname.split('/');
  return pathSplit.indexOf('Task') !== -1;
}
function isSalesforceEventPage(currentPage) {
  var pathname = getSalesforcePathname(currentPage);
  var pathSplit = pathname.split('/');
  return pathSplit.indexOf('Event') !== -1 && !isListOrSetupPage(pathname);
}
function isSalesforceCasePage(currentPage) {
  var pathname = getSalesforcePathname(currentPage);
  var pathSplit = pathname.split('/');
  return pathSplit.indexOf('Case') !== -1 && !isListOrSetupPage(pathname);
}
function isSalesforceLeadPage(currentPage) {
  // happy path: /lightning/r/Lead/00Q1r00001J8Z5jEAF/view
  // complex scenario: /lightning/r/Account/0011X00001DsLozQAF/view?ws=%2Flightning%2Fr%2FLead%2F00Q1X000006WUGiUAO%2Fview
  return isSalesforceObjectPage(currentPage, 'Lead');
}
function isSalesforceContactPage(currentPage) {
  return isSalesforceObjectPage(currentPage, 'Contact');
}
function isSalesforceAccountPage(currentPage) {
  return isSalesforceObjectPage(currentPage, 'Account');
}
function isSalesforceOpportunityPage(currentPage) {
  return isSalesforceObjectPage(currentPage, 'Opportunity');
}
function isMainSalesforceObjectPage(currentPage, objectName) {
  var pathname = getSalesforcePathname(currentPage);
  var pathSplit = pathname.split('/');
  return pathSplit.indexOf(objectName) !== -1 && !isListOrSetupPage(pathname);
}
function isSalesforceObjectPage(currentPage, objectName) {
  if (isSalesforceSyncableObjectPage(currentPage)) {
    return isMainSalesforceObjectPage(currentPage, objectName);
  } else {
    if (currentPage.includes('ws=')) {
      var sobjectFromWS = getSalesforceObjectFromWSParam(currentPage);
      if (sobjectFromWS) {
        return sobjectFromWS === objectName;
      }
    }
  }
}
function isTaskOrEventSalesforcePage(currentPage) {
  return isSalesforceTaskPage(currentPage) || isSalesforceEventPage(currentPage);
}
function isLeadOrContactSalesforcePage(currentPage) {
  return isSalesforceLeadPage(currentPage) || isSalesforceContactPage(currentPage);
}
function isSalesforceSyncableObjectPage(currentPage) {
  return SYNCABLE_SALESFORCE_OBJECT_TYPES.some(function (s) {
    return isMainSalesforceObjectPage(currentPage, s);
  });
}
function extractSalesforceIdFromPath(currentPage) {
  // happy path: /lightning/r/Lead/00Q1r00001J8Z5jEAF/view
  // complex scenario: /lightning/r/Account/0011X00001DsLozQAF/view?ws=%2Flightning%2Fr%2FLead%2F00Q1X000006WUGiUAO%2Fview
  var pathname = getSalesforcePathname(currentPage);
  var pathSplit = pathname.split('/');
  var idIndex = pathSplit.findIndex(function (v) {
    return SYNCABLE_SALESFORCE_OBJECT_TYPES.includes(v);
  });
  if (idIndex === -1) {
    return null;
  }
  if (pathSplit !== null && pathSplit !== void 0 && pathSplit[idIndex + 1]) {
    return pathSplit === null || pathSplit === void 0 ? void 0 : pathSplit[idIndex + 1];
  }

  //if it's a complex scenario we need to get the id from the ws query param
  if (currentPage.includes('ws=')) {
    var url = new URL(currentPage);
    var urlParams = new URLSearchParams(url === null || url === void 0 ? void 0 : url.search);
    var ws = urlParams.get('ws');
    var wsSplit = ws.split('/');
    var _idIndex = wsSplit.findIndex(function (v) {
      return SYNCABLE_SALESFORCE_OBJECT_TYPES.includes(v);
    });
    if (_idIndex !== -1) {
      return wsSplit === null || wsSplit === void 0 ? void 0 : wsSplit[_idIndex + 1];
    }
  }
  return null;
}
function normalizeUrl(raw) {
  if (typeof raw === 'string') {
    var validRaw = raw === null || raw === void 0 ? void 0 : raw.replace('?bb-open', '');
    var validRaw2 = validRaw === null || validRaw === void 0 ? void 0 : validRaw.replace('?bb-messaging-tab-open', '');
    var url = normalize(validRaw2, {
      forceHttps: true,
      stripWWW: false,
      removeTrailingSlash: false,
      removeQueryParameters: true
    });
    if (isSalesNavigatorPage(url)) {
      var originalUrl = url.split(',')[0];
      // A ',' + suffix is needed for the URL to work
      return originalUrl + ',bb';
    }
    if (!url.endsWith('/')) {
      return url + '/';
    }
    return url;
  } else return null;
}
var makeUrl = function makeUrl(url) {
  if (url) {
    if (url.startsWith('https://') || url.startsWith('http://')) {
      return url;
    }
    return "http://".concat(url);
  }
  return url;
};
function createBloobirdsUrlByIdAndType(id, type) {
  var baseUrl = baseUrls["development"];
  if (type === BOBJECT_TYPES.LEAD) {
    return "".concat(baseUrl, "/app/cl/leads/").concat(id);
  }
  if (type === BOBJECT_TYPES.COMPANY) {
    return "".concat(baseUrl, "/app/cl/companies/").concat(id);
  }
  if (type === BOBJECT_TYPES.OPPORTUNITY) {
    return "".concat(baseUrl, "/app/cl/opportunities/").concat(id);
  }
  return baseUrl;
}
function createBloobirdsUrl(bobjectId) {
  return createBloobirdsUrlByIdAndType(bobjectId === null || bobjectId === void 0 ? void 0 : bobjectId.objectId, bobjectId === null || bobjectId === void 0 ? void 0 : bobjectId.typeName);
}
function redirectToMessagingSettings(type) {
  var baseUrl = baseUrls["development"];
  return "".concat(baseUrl, "/app/playbook/messaging/").concat(type.toLowerCase());
}
function isIdLinkedinUrl(currentPage) {
  var _getLinkedinPathname$, _getLinkedinPathname$2;
  return isLinkedInProfilePage(currentPage) && ((_getLinkedinPathname$ = getLinkedinPathname(currentPage).match(/(?<=\/in\/).*(?=\/)/)) === null || _getLinkedinPathname$ === void 0 ? void 0 : (_getLinkedinPathname$2 = _getLinkedinPathname$[0]) === null || _getLinkedinPathname$2 === void 0 ? void 0 : _getLinkedinPathname$2.length) === 39;
}
function getLinedinIdFromUrl(currentPage) {
  var _getLinkedinPathname$3;
  return isIdLinkedinUrl(currentPage) ? (_getLinkedinPathname$3 = getLinkedinPathname(currentPage).match(/(?<=\/in\/).*(?=\/)/)) === null || _getLinkedinPathname$3 === void 0 ? void 0 : _getLinkedinPathname$3[0] : null;
}
var addProtocolToURL = function addProtocolToURL(url) {
  var regex = /^[^:]+:\/\//;
  if (!url) {
    return '';
  }
  if (!regex.test(url)) {
    return 'https://' + url;
  }
  return url;
};

var isValidUrl = function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};
var openWhatsAppWeb = function openWhatsAppWeb(flagOpenNewPage, phoneNumber, text) {
  var _chrome, _chrome$runtime, _chrome2, _chrome2$runtime;
  var url = 'https://web.whatsapp.com/';
  var isValidPhoneNumber = isValidPhone(phoneNumber);
  if (isValidPhoneNumber) {
    if (text) {
      url = "https://web.whatsapp.com/send/?phone=".concat(phoneNumber, "&text=").concat(text);
    } else {
      url = "https://web.whatsapp.com/send/?phone=".concat(phoneNumber, "&text&type=phone_number&app_absent=0");
    }
  }
  if (!isValidUrl(url)) {
    console.error('Invalid URL', url);
    url = 'https://web.whatsapp.com/';
  }
  if ((_chrome = chrome) !== null && _chrome !== void 0 && (_chrome$runtime = _chrome.runtime) !== null && _chrome$runtime !== void 0 && _chrome$runtime.sendMessage && (_chrome2 = chrome) !== null && _chrome2 !== void 0 && (_chrome2$runtime = _chrome2.runtime) !== null && _chrome2$runtime !== void 0 && _chrome2$runtime.id) {
    var _chrome3, _chrome3$runtime;
    localStorage.setItem('openWhatsappChat', 'true');
    (_chrome3 = chrome) === null || _chrome3 === void 0 ? void 0 : (_chrome3$runtime = _chrome3.runtime) === null || _chrome3$runtime === void 0 ? void 0 : _chrome3$runtime.sendMessage({
      action: 'openWhatsappTab',
      url: url,
      forceOpenNewPage: flagOpenNewPage || !!text,
      phoneNumber: phoneNumber
    });
    mixpanel.track(MIXPANEL_EVENTS.OPEN_WHATSAPP_FROM_EXTENSION);
  } else {
    window.open(url, '_blank');
    mixpanel.track(MIXPANEL_EVENTS.OPEN_WHATSAPP_FROM_WEBAPP);
  }
};
var isWhatsAppPage = function isWhatsAppPage(page) {
  var currentPage = page !== null && page !== void 0 ? page : window.location.href;
  return currentPage.includes('web.whatsapp.com');
};

var leadNameVariables = ['{Lead-Name}', '{Lead Name}', '{Lead: Name}'];
var companyNameVariables = ['{Company-Name}', '{Company Name}', '{Company: Name}', '{Lead-Company Name}', '{Lead: Company Name}'];
var jobTitleVariables = ['{Lead-Job title}', '{Lead Job title}', '{Lead: Job title}'];
var surnameVarialbes = ['{Lead Surname}', '{Lead-Surname}', '{Lead: Surname}'];
var fullNameVariables = ['{Lead Full name}', '{Lead-Full name}', '{Lead: Full name}'];
var userNameVariables = ['{User Name}', '{User-Name}', '{User: Name}'];
var replaceWithContent = function replaceWithContent(content, leadName, leadJobTitle, leadCompanyName, userName) {
  var newContent = content;
  if (leadName) {
    leadNameVariables.forEach(function (variable) {
      var _leadName$split;
      return newContent = newContent.replace(variable, leadName === null || leadName === void 0 ? void 0 : (_leadName$split = leadName.split(' ')) === null || _leadName$split === void 0 ? void 0 : _leadName$split[0]);
    });
    surnameVarialbes.forEach(function (variable) {
      return newContent = newContent.replace(variable, leadName === null || leadName === void 0 ? void 0 : leadName.replace(/^[^ ]* /, ''));
    });
    fullNameVariables.forEach(function (variable) {
      var _leadName$split2;
      return newContent = newContent.replace(variable, leadName === null || leadName === void 0 ? void 0 : (_leadName$split2 = leadName.split(' ')) === null || _leadName$split2 === void 0 ? void 0 : _leadName$split2[0]);
    });
  }
  if (leadJobTitle) {
    jobTitleVariables.forEach(function (variable) {
      return newContent = newContent.replace(variable, leadJobTitle);
    });
  }
  if (leadCompanyName) {
    companyNameVariables.forEach(function (variable) {
      return newContent = newContent.replace(variable, leadCompanyName);
    });
  }
  if (userName) {
    userNameVariables.forEach(function (variable) {
      return newContent = newContent.replace(variable, userName);
    });
  }
  return newContent;
};
var serializeMessagingTemplate = function serializeMessagingTemplate(templateId, leadId, companyId) {
  var query = '';
  if (leadId && companyId) {
    var _companyId$split;
    var companyIdValue = isComposedId(companyId) ? companyId === null || companyId === void 0 ? void 0 : (_companyId$split = companyId.split('/')) === null || _companyId$split === void 0 ? void 0 : _companyId$split[2] : companyId;
    query = "?leadId=".concat(leadId, "&companyId=").concat(companyIdValue);
  } else if (leadId) {
    query = "?leadId=".concat(leadId);
  } else if (companyId) {
    var _companyId$split2;
    var _companyIdValue = isComposedId(companyId) ? companyId === null || companyId === void 0 ? void 0 : (_companyId$split2 = companyId.split('/')) === null || _companyId$split2 === void 0 ? void 0 : _companyId$split2[2] : companyId;
    query = "?companyId=".concat(_companyIdValue);
  }
  return api.get("/messaging/messagingTemplates/".concat(templateId, "/serialize").concat(query), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {}
  });
};
function generateTemplateURL(id, tabSelected, linkedInURL, userCanEdit) {
  var baseUrl = baseUrls["development"];
  switch (tabSelected) {
    case PlaybookTab.PITCHES:
      return userCanEdit ? ["".concat(baseUrl, "/app/playbook/messaging/pitch/form?mode=EDITION&id=").concat(id)] : ["".concat(baseUrl, "/app/playbook/messaging/pitch")];
    case PlaybookTab.SNIPPETS:
      return userCanEdit ? ["".concat(baseUrl, "/app/playbook/messaging/snippet/form?mode=EDITION&id=").concat(id)] : ["".concat(baseUrl, "/app/playbook/messaging/snippet")];
    case PlaybookTab.EMAILS:
      return userCanEdit ? ["".concat(baseUrl, "/app/playbook/messaging/email/form?mode=EDITION&id=").concat(id)] : ["".concat(baseUrl, "/app/playbook/messaging/email")];
    case PlaybookTab.LINKEDIN:
      return userCanEdit ? ["".concat(baseUrl, "/app/playbook/messaging/linkedin/form?mode=EDITION&id=").concat(id), linkedInURL] : ["".concat(baseUrl, "/app/playbook/messaging/linkedin"), linkedInURL];
    case PlaybookTab.WHATSAPP:
      return userCanEdit ? ["".concat(baseUrl, "/app/playbook/messaging/whatsapp/form?mode=EDITION&id=").concat(id)] : ["".concat(baseUrl, "/app/playbook/messaging/whatsapp")];
    case PlaybookTab.QQS:
      return userCanEdit ? ["".concat(baseUrl, "/app/playbook/messaging/qq/form?mode=EDITION&id=").concat(id)] : ["".concat(baseUrl, "/app/playbook/messaging/qq")];
    default:
      return [''];
  }
}
var contador = 0;
var insertTextWhatsApp = function insertTextWhatsApp(forceWsOpenNewPage) {
  var _messageBox$innerText, _textToAdd;
  var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#main .copyable-area [contenteditable="true"][role="textbox"]';
  var phoneNumber = arguments.length > 2 ? arguments[2] : undefined;
  var text = arguments.length > 3 ? arguments[3] : undefined;
  var messageBox = document.querySelector(selector);
  var textToAdd = text !== null && text !== void 0 ? text : phoneNumber;
  textToAdd = textToAdd.replace(/<(?:br|\/div|\/p)>/g, '\n').replace(/<.*?>/g, '');
  var event = new InputEvent('input', {
    bubbles: true,
    data: textToAdd
  });
  messageBox === null || messageBox === void 0 ? void 0 : messageBox.focus();
  document.execCommand('selectAll'); // It's necessary for replacing the content

  setTimeout(function () {
    messageBox.dispatchEvent(event);
  }, 50);
  if ((messageBox === null || messageBox === void 0 ? void 0 : (_messageBox$innerText = messageBox.innerText) === null || _messageBox$innerText === void 0 ? void 0 : _messageBox$innerText.replaceAll('\n', '')) !== ((_textToAdd = textToAdd) === null || _textToAdd === void 0 ? void 0 : _textToAdd.replaceAll('\n', '')) && contador < 10) {
    contador++;
    setTimeout(function () {
      return insertTextWhatsApp(forceWsOpenNewPage, selector, phoneNumber, text);
    }, 100);
    console.warn('Text not inserted correctly, trying again...', contador);
    if (contador === 10) {
      openWhatsAppWeb(forceWsOpenNewPage, phoneNumber, text !== null && text !== void 0 ? text : '');
    }
  } else {
    messageBox.dispatchEvent(new Event('blur'));
    contador = 0;
  }
};
var handleAddWhatsAppTemplate = function handleAddWhatsAppTemplate(id, fallbackContent, lead, userName, callback) {
  var _lead$id;
  return serializeMessagingTemplate(id, lead === null || lead === void 0 ? void 0 : (_lead$id = lead.id) === null || _lead$id === void 0 ? void 0 : _lead$id.objectId, null).then(function (data) {
    var _data$data;
    var content = data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.serializedTemplate;
    callback === null || callback === void 0 ? void 0 : callback();
    return Promise.resolve(replaceWithContent(content, lead === null || lead === void 0 ? void 0 : lead.name, lead === null || lead === void 0 ? void 0 : lead.jobTitle, lead === null || lead === void 0 ? void 0 : lead.companyName, userName));
  })["catch"](function () {
    callback === null || callback === void 0 ? void 0 : callback();
    return Promise.resolve(replaceWithContent(fallbackContent, lead === null || lead === void 0 ? void 0 : lead.name, lead === null || lead === void 0 ? void 0 : lead.jobTitle, lead === null || lead === void 0 ? void 0 : lead.companyName, userName));
  });
};
function getTemplateTypeButtons(_ref) {
  var template = _ref.template,
    tabSelected = _ref.tabSelected,
    linkedInURL = _ref.linkedInURL,
    handleEmailModal = _ref.handleEmailModal,
    _ref$isSEE = _ref.isSEE,
    isSEE = _ref$isSEE === void 0 ? false : _ref$isSEE,
    userCanEdit = _ref.userCanEdit,
    templateFunctions = _ref.templateFunctions,
    t = _ref.t,
    whatsappData = _ref.whatsappData,
    environment = _ref.environment;
  var url = generateTemplateURL(template === null || template === void 0 ? void 0 : template.id, tabSelected, linkedInURL, userCanEdit);
  var isLinkedinPage = window.location.href.includes('linkedin');
  var _ref2 = whatsappData || {
      phoneNumber: null,
      isSameActiveLead: false,
      userName: null,
      lead: null
    },
    phoneNumber = _ref2.phoneNumber,
    isSameActiveLead = _ref2.isSameActiveLead,
    userName = _ref2.userName,
    lead = _ref2.lead;
  var handleClick = templateFunctions !== null && templateFunctions !== void 0 && templateFunctions.editTemplate && (template === null || template === void 0 ? void 0 : template.format) !== 'HTML' ? function (e) {
    var _templateFunctions$ed;
    e.stopPropagation();
    templateFunctions === null || templateFunctions === void 0 ? void 0 : (_templateFunctions$ed = templateFunctions.editTemplate) === null || _templateFunctions$ed === void 0 ? void 0 : _templateFunctions$ed.call(templateFunctions, template);
  } : function (e) {
    e.stopPropagation();
    window.open(url[0]);
  };
  switch (tabSelected) {
    case PlaybookTab.PITCHES:
      return [{
        tooltipText: !userCanEdit && t('extendedScreen.templateDetail.headerButtons.userCantEdit'),
        buttonText: t('extendedScreen.templateDetail.headerButtons.edit'),
        name: 'edit',
        color: !userCanEdit ? undefined : 'purple',
        onClick: handleClick,
        disabled: !userCanEdit
      }];
    case PlaybookTab.SNIPPETS:
      return [{
        tooltipText: !userCanEdit ? t('extendedScreen.templateDetail.headerButtons.userCantEdit') : t('extendedScreen.templateDetail.headerButtons.editInBloobirds'),
        name: 'edit',
        color: !userCanEdit ? undefined : 'purple',
        onClick: handleClick,
        disabled: !userCanEdit
      }, !isSEE && {
        tooltipText: t('extendedScreen.templateDetail.headerButtons.sendEmail'),
        buttonText: t('extendedScreen.templateDetail.headerButtons.send'),
        color: !userCanEdit ? undefined : 'purple',
        name: 'send',
        onClick: function onClick(e) {
          e.stopPropagation();
          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_USE_SNIPPET_ON_PLAYBOOK);
          handleEmailModal(template);
        },
        disabled: !userCanEdit
      }];
    case PlaybookTab.EMAILS:
      return [{
        tooltipText: !userCanEdit ? t('extendedScreen.templateDetail.headerButtons.userCantEdit') : t('extendedScreen.templateDetail.headerButtons.editInBloobirds'),
        name: 'edit',
        color: !userCanEdit ? undefined : 'purple',
        onClick: handleClick,
        disabled: !userCanEdit
      }, !isSEE && {
        tooltipText: t('extendedScreen.templateDetail.headerButtons.sendEmail'),
        buttonText: t('extendedScreen.templateDetail.headerButtons.send'),
        color: !userCanEdit ? undefined : 'purple',
        name: 'send',
        onClick: function onClick(e) {
          e.stopPropagation();
          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_USE_TEMPLATE_ON_PLAYBOOK);
          handleEmailModal(template);
        },
        disabled: !userCanEdit
      }];
    case PlaybookTab.LINKEDIN:
      return [{
        tooltipText: !userCanEdit ? t('extendedScreen.templateDetail.headerButtons.userCantEdit') : t('extendedScreen.templateDetail.headerButtons.editInBloobirds'),
        color: !userCanEdit ? undefined : 'purple',
        name: 'edit',
        onClick: handleClick,
        disabled: !userCanEdit
      }, {
        tooltipText: t('extendedScreen.templateDetail.headerButtons.openInLinkedin'),
        buttonText: t('extendedScreen.templateDetail.headerButtons.openInLinkedin'),
        name: 'linkedin',
        color: !userCanEdit ? undefined : 'purple',
        onClick: function onClick(e) {
          var _templateFunctions$re;
          e.stopPropagation();
          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_USE_LINKEDIN_ON_PLAYBOOK);
          environment === Environment.LINKEDIN_TEMPLATE_SELECTOR ? templateFunctions === null || templateFunctions === void 0 ? void 0 : (_templateFunctions$re = templateFunctions.replaceTemplate) === null || _templateFunctions$re === void 0 ? void 0 : _templateFunctions$re.call(templateFunctions, template) : window.open(url[1], isLinkedinPage ? '_self' : '_blank');
        },
        disabled: !userCanEdit
      }];
    case PlaybookTab.WHATSAPP:
      return [{
        tooltipText: !userCanEdit ? t('extendedScreen.templateDetail.headerButtons.userCantEdit') : t('extendedScreen.templateDetail.headerButtons.editInBloobirds'),
        color: !userCanEdit ? undefined : 'purple',
        name: 'edit',
        onClick: handleClick,
        disabled: !userCanEdit
      }, {
        tooltipText: phoneNumber ? t('extendedScreen.templateDetail.headerButtons.openInWhatsapp') : t('extendedScreen.templateDetail.headerButtons.noPhoneNumber'),
        buttonText: t('extendedScreen.templateDetail.headerButtons.openInWhatsapp'),
        name: 'whatsapp',
        color: !userCanEdit ? undefined : 'purple',
        onClick: function onClick(e) {
          e.stopPropagation();
          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_USE_WHATSAPP_ON_PLAYBOOK);
          if (environment === Environment.WHATSAPP_TEMPLATE_SELECTOR) {
            var _templateFunctions$re2;
            templateFunctions === null || templateFunctions === void 0 ? void 0 : (_templateFunctions$re2 = templateFunctions.replaceTemplate) === null || _templateFunctions$re2 === void 0 ? void 0 : _templateFunctions$re2.call(templateFunctions, template);
          } else {
            if (phoneNumber) {
              handleAddWhatsAppTemplate(template.id, template.previewContent, lead, userName).then(function (data) {
                if (data) {
                  var forceWsOpenNewPage = true;
                  if (isSameActiveLead) {
                    insertTextWhatsApp(forceWsOpenNewPage, '#main .copyable-area [contenteditable="true"][role="textbox"]', phoneNumber, data);
                  } else {
                    var text = data.replace(/<(?:br|\/div|\/p)>/g, '%0A').replace(/<.*?>/g, '');
                    openWhatsAppWeb(forceWsOpenNewPage, phoneNumber, text);
                  }
                }
              });
            }
          }
        },
        disabled: !userCanEdit || !(whatsappData !== null && whatsappData !== void 0 && whatsappData.phoneNumber)
      }];
    default:
      return [];
  }
}
function getLinkedInURL(id, company, leads, activeBobject) {
  var _activeBobject$id, _activeBobject$id3, _leads$, _leads$2, _leads$3, _leads$4, _leads$4$id, _activeBobject$id4;
  if ((activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id = activeBobject.id) === null || _activeBobject$id === void 0 ? void 0 : _activeBobject$id.typeName) === BobjectTypes.Lead) {
    var _activeBobject$id2, _company$id, _company$id2;
    return activeBobject !== null && activeBobject !== void 0 && activeBobject.linkedInUrl ? (activeBobject === null || activeBobject === void 0 ? void 0 : activeBobject.linkedInUrl) + '?bb-messaging-tab-open&templateId=' + id : 'https://www.linkedin.com/messaging/thread/new/?bbFullName=' + (activeBobject === null || activeBobject === void 0 ? void 0 : activeBobject.fullName) + '&templateId=' + id + '&leadId=' + (activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id2 = activeBobject.id) === null || _activeBobject$id2 === void 0 ? void 0 : _activeBobject$id2.objectId) + '&companyId=' + (company === null || company === void 0 ? void 0 : (_company$id = company.id) === null || _company$id === void 0 ? void 0 : _company$id.objectId) ? '&companyId=' + (company === null || company === void 0 ? void 0 : (_company$id2 = company.id) === null || _company$id2 === void 0 ? void 0 : _company$id2.objectId) : '';
  }
  if (!leads) return 'https://www.linkedin.com/messaging/thread/new/?bbFullName=undefined&templateId=' + id + '&leadId=undefined&companyId=' + (activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id3 = activeBobject.id) === null || _activeBobject$id3 === void 0 ? void 0 : _activeBobject$id3.objectId);
  return (_leads$ = leads[0]) !== null && _leads$ !== void 0 && _leads$.linkedInUrl ? ((_leads$2 = leads[0]) === null || _leads$2 === void 0 ? void 0 : _leads$2.linkedInUrl) + '?bb-messaging-tab-open&templateId=' + id : 'https://www.linkedin.com/messaging/thread/new/?bbFullName=' + ((_leads$3 = leads[0]) === null || _leads$3 === void 0 ? void 0 : _leads$3.fullName) + '&templateId=' + id + '&leadId=' + ((_leads$4 = leads[0]) === null || _leads$4 === void 0 ? void 0 : (_leads$4$id = _leads$4.id) === null || _leads$4$id === void 0 ? void 0 : _leads$4$id.objectId) + '&companyId=' + (activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id4 = activeBobject.id) === null || _activeBobject$id4 === void 0 ? void 0 : _activeBobject$id4.objectId);
}

var segToTime = function segToTime(duration) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'hh:mm:ss';
  if (!duration) {
    throw new Error('duration parameter is required');
  }
  if (duration > 86400) {
    throw new Error('duration should be less than one day');
  }
  var formatedTime;
  var seconds = Math.floor(duration % 60);
  var minutes = Math.floor(duration / 60 % 60);
  var hours = Math.floor(duration / (60 * 60) % 24);
  if (format === 'hh:mm:ss') {
    hours = hours < 10 && hours > 0 ? "0".concat(hours) : hours;
    minutes = minutes < 10 ? "0".concat(minutes) : minutes;
    seconds = seconds < 10 ? "0".concat(seconds) : seconds;
    formatedTime = hours > 0 ? "".concat(hours, ":").concat(minutes, ":").concat(seconds) : "".concat(minutes, ":").concat(seconds);
  } else if (format === 'hhh mmm sss') {
    var hoursText = hours > 0 ? "".concat(hours, "h") : '';
    var minutesText = minutes > 0 ? "".concat(minutes, "m") : '';
    var secondsText = seconds > 0 ? "".concat(seconds, "s") : '';
    if (hoursText) {
      formatedTime = hoursText;
    }
    if (formatedTime && minutesText) {
      formatedTime = "".concat(formatedTime, " ").concat(minutesText);
    } else if (minutesText) {
      formatedTime = minutesText;
    }
    if (formatedTime && secondsText) {
      formatedTime = "".concat(formatedTime, " ").concat(secondsText);
    } else if (secondsText) {
      formatedTime = secondsText;
    }
  }
  return formatedTime;
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var fetchLanguages = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var result, data, languages, key, item, locales;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fetch("https://delivery.localazy.com/_a7714004326121177803f2a33b98/_e0.json");
        case 2:
          result = _context.sent;
          _context.next = 5;
          return result.json();
        case 5:
          data = _context.sent;
          languages = [];
          for (key in Object.values(data)) {
            item = Object.values(data)[key];
            locales = item['locales'];
            locales.forEach(function (locale) {
              var langCode = locale.language;
              if (locale.region) {
                langCode = langCode + '-' + locale.region;
              }
              if (!languages.includes(langCode)) {
                languages.push(langCode);
              }
            });
          }
          return _context.abrupt("return", languages);
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fetchLanguages() {
    return _ref.apply(this, arguments);
  };
}();

export { EMAIL_MODE, EMAIL_TYPE, EmailModalType, HTMLToString, ModalType, SALESFORCE_ID_FIELDS, SALESFORCE_OBJECT_TYPES, SYNCABLE_SALESFORCE_OBJECT_TYPES, add, addHoursToStringDate, addHttpIfNeeded, addHttpsIfNeeded, addMinutes, addMonth, addProtocolToURL, addTaskDateGrouping, addTemplateInLinkedIn, addTemplateInSalesNav, api, appHostnames, areListsEqual, baseUrls, bobjectPlurals, calculateCollisions, canBeMarkedAsDone, checkIsSalesBobject, checkTZMatching, colors, commaAndFormatArray, companyUrl, constructMixpanelCustomRoute, convertHtmlToString, convertIdValueToIdObject, convertLeadInBloobirds, convertLocationToHourMinutes, convertTo24HourFormat, createBloobirdsUrl, createBloobirdsUrlByIdAndType, createBobjectInSfdc, createEmailLink, createH2, createParagraph, createParticipantsFromBloobirdsActivity, ellipsis, extractSalesforceIdFromPath, fetchAndOpenLegacyUrl, fetchAndOpenNylasUrl, fetchLanguages, firstWeekOfNextMonth, forgeIdFieldsFromIdValue, formatDate, formatDateAsText, formatDistance, formatDistanceToNow, formatOld, formatSecondToElapsedTime, generateBobjectBasedData, generateDatePrefix, generateShortName, generateTemplateURL, getAccountId, getAuthUrl, getBobjectFromLogicRole, getBobjectTypeFromPathname, getButtonMarkAsDone, getBuyerPersonas, getColorByIndex, getCurrentSalesforceStatusField, getCurrentTime, getCurrentTimeBeautiful, getCurrentTimeSimple, getDataModel, getDateFormatted, getDateRange, getDateTimestampString, getDayAndWeekNumberFromDate, getDayOfWeekStartingFromMonday, getDifferenceInDays, getDifferenceInHours, getDifferenceInMinutes, getDuration, getDurationFromOffset, getDynamicsEntityType, getExtensionBobjectByIdFields, getFieldById, getFieldByLogicRole, getFieldTextById, getFieldsByIds, getFieldsByType, getHoursMinutesSeconds, getISODate, getISOShortFormattedDate, getIsSales, getLeadById, getLinedinIdFromUrl, getLinkedInURL, getLocationFromCompleteTimeZone, getMainBobjectIcon, getMainSalesforceObjectFromURL, getNameComponentFields, getNameFieldLRFromBobjectType, getNavElements, getOpportunityById, getPluralBobjectName, getRangeBetweenDates, getReferencedBobject, getReferencedBobjectFromLogicRole, getRelatedBobject, getRelatedBobjectTypeName, getRoundedDateTime, getSalesforceListDefinition, getSalesforceObjectFromWSParam, getSalesforceSobject, getSalesforceStatusApiNameField, getSimpleDate, getSobjectIdLogicRoleFromId, getSobjectTypeFromBobject, getSobjectTypeFromId, getTargetMarkets, getTaskLocalTime, getTaskReferenceBobject, getTaskReferencedBobject, getTaskText, getTaskType, getTemplateTypeButtons, getTextFromLogicRole, getTimeFromOffset, getToken, getTokenEncoded, getUTCDate, getUTCFromCompleteTimeZone, getUserId, getUserName, getUserTimeZone, getValueFromLogicRole, getWeeksInMonth, handleAddWhatsAppTemplate, hasAircallInSalesforceInstalled, hasRequiredMissing, haveSameContentArrays, indefiniteArticle, injectReferenceFields, injectReferencedBobjects, injectReferencesGetProcess, injectReferencesSearchProcess, insertTextWhatsApp, intervalDaysOfMonth, isActivity, isAfterDate, isAfterToday, isAfterTomorrow, isAutomatedEmailTask, isBeforeToday, isCadenceTask, isCallActivity, isCallTask, isCompany, isCompanyPage, isCompanyTasksPage, isComposedId, isContactSalesforce, isCustomTask, isDifferentYearThanCurrent, isDynamicsListPage, isDynamicsPage, isElementLoaded, isEmail, isEmailTask, isEmptyObject, isEqual, isHtml, isIdLinkedinUrl, isImportantTask, isLead, isLeadOrContactSalesforcePage, isLeadPage, isLeadWithoutCompanyPage, isLinkedInExamplePage, isLinkedInMessagesPage, isLinkedInProfilePage, isLinkedinMessageTask, isLinkedinOrSalesNav, isListOrSetupPage, isLoggedIn, isMatchingRoute, isMeetingTypeTask, isObject, isOpportunity, isOpportunityPage, isProspectingPage, isSalesNavigatorMessagesPage, isSalesNavigatorPage, isSalesNavigatorProfile, isSalesPage, isSalesforceAccountPage, isSalesforceCasePage, isSalesforceContactPage, isSalesforceEventPage, isSalesforceLeadPage, isSalesforceOpportunityPage, isSalesforcePage, isSalesforceTaskPage, isSameDayDate, isScheduledTask, isSizeNumber, isSkippableTask, isStringifiedJSON, isSyncableSobject, isTask, isTaskOrEventSalesforcePage, isToday, isTomorrow, isUTCDateString, isUnassignedTask, isUrl, isValidPhone, isWeekend, isWhatsAppCustomTask, isWhatsAppPage, keepPreviousResponse, lastWeekOfPrevMonth, leadUrl, linkify, login, logout, makeUrl, mergeRemovingUndefined, mergeTwoObjects, normalizeUrl, numberToOrdinalString, numberWithDots, openNewTab, openPhoneOrDialer, openWhatsAppWeb, parseAmount, parseCurrency, parseEmailPixels, parseEvents, parseTimeToDatetime, parseUTCDateTimeToLocal, parseUTCDateToLocal, partition, privateTimeZoneFunctions, querySalesforce, randomizeColor, randomizeColorName, randomizeColorNameN, recoverScrollOfBox, redirectToMessagingSettings, relatedPickableIcons, removeDulpicatedBobjects, removeHtmlTags, removeScrollOfBox, replaceVariables, replaceWithContent, searchCompaniesByQuery, searchLead, searchLeadByQuery, searchUsers, segToTime, serializeMessagingTemplate, shortenAmount, shouldInjectSalesforce, sliceObject, softColors, stringToHTML, subMinutes, subMonth, tabBobjectType, toCamelCase, toCamelCaseUpperFirst, toHoursAndMinutes, toSentenceCase, toTitleCase, today, transformCalendarEventDate, updateBobject, updateLead, updateLeadLinkedInUrl, updateLeadSalesNavigatorUrl, waitForElement };
                                 
