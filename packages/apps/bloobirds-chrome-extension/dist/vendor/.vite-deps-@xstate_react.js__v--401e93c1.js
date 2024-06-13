import {
  use_isomorphic_layout_effect_browser_esm_default
} from "/vendor/.vite-deps-chunk-RUBPC5FX.js__v--6e4818eb.js";
import {
  InterpreterStatus,
  State,
  interpret,
  spawnBehavior,
  toObserver
} from "/vendor/.vite-deps-chunk-SJMYFYWW.js__v--6e4818eb.js";
import {
  require_shim
} from "/vendor/.vite-deps-chunk-4C4BNMBI.js__v--6e4818eb.js";
import {
  require_react
} from "/vendor/.vite-deps-chunk-C7VZVCY4.js__v--6e4818eb.js";
import {
  __commonJS,
  __toESM
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--6e4818eb.js";

// ../../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js
var require_with_selector_development = __commonJS({
  "../../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var React2 = require_react();
        var shim = require_shim();
        function is2(x, y) {
          return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
        }
        var objectIs = typeof Object.is === "function" ? Object.is : is2;
        var useSyncExternalStore2 = shim.useSyncExternalStore;
        var useRef4 = React2.useRef, useEffect3 = React2.useEffect, useMemo = React2.useMemo, useDebugValue = React2.useDebugValue;
        function useSyncExternalStoreWithSelector3(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
          var instRef = useRef4(null);
          var inst;
          if (instRef.current === null) {
            inst = {
              hasValue: false,
              value: null
            };
            instRef.current = inst;
          } else {
            inst = instRef.current;
          }
          var _useMemo = useMemo(function() {
            var hasMemo = false;
            var memoizedSnapshot;
            var memoizedSelection;
            var memoizedSelector = function(nextSnapshot) {
              if (!hasMemo) {
                hasMemo = true;
                memoizedSnapshot = nextSnapshot;
                var _nextSelection = selector(nextSnapshot);
                if (isEqual !== void 0) {
                  if (inst.hasValue) {
                    var currentSelection = inst.value;
                    if (isEqual(currentSelection, _nextSelection)) {
                      memoizedSelection = currentSelection;
                      return currentSelection;
                    }
                  }
                }
                memoizedSelection = _nextSelection;
                return _nextSelection;
              }
              var prevSnapshot = memoizedSnapshot;
              var prevSelection = memoizedSelection;
              if (objectIs(prevSnapshot, nextSnapshot)) {
                return prevSelection;
              }
              var nextSelection = selector(nextSnapshot);
              if (isEqual !== void 0 && isEqual(prevSelection, nextSelection)) {
                return prevSelection;
              }
              memoizedSnapshot = nextSnapshot;
              memoizedSelection = nextSelection;
              return nextSelection;
            };
            var maybeGetServerSnapshot = getServerSnapshot === void 0 ? null : getServerSnapshot;
            var getSnapshotWithSelector = function() {
              return memoizedSelector(getSnapshot());
            };
            var getServerSnapshotWithSelector = maybeGetServerSnapshot === null ? void 0 : function() {
              return memoizedSelector(maybeGetServerSnapshot());
            };
            return [getSnapshotWithSelector, getServerSnapshotWithSelector];
          }, [getSnapshot, getServerSnapshot, selector, isEqual]), getSelection = _useMemo[0], getServerSelection = _useMemo[1];
          var value = useSyncExternalStore2(subscribe, getSelection, getServerSelection);
          useEffect3(function() {
            inst.hasValue = true;
            inst.value = value;
          }, [value]);
          useDebugValue(value);
          return value;
        }
        exports.useSyncExternalStoreWithSelector = useSyncExternalStoreWithSelector3;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// ../../../node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = __commonJS({
  "../../../node_modules/use-sync-external-store/shim/with-selector.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_with_selector_development();
    }
  }
});

// ../../../node_modules/@xstate/react/es/useMachine.js
var import_react2 = __toESM(require_react());
var import_with_selector = __toESM(require_with_selector());

// ../../../node_modules/@xstate/react/es/useInterpret.js
var import_react = __toESM(require_react());

// ../../../node_modules/@xstate/react/es/useConstant.js
var React = __toESM(require_react());
function useConstant(fn) {
  var ref = React.useRef();
  if (!ref.current) {
    ref.current = { v: fn() };
  }
  return ref.current.v;
}

// ../../../node_modules/@xstate/react/es/useInterpret.js
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var __read = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
function useIdleInterpreter(getMachine, options) {
  var machine = useConstant(function() {
    return typeof getMachine === "function" ? getMachine() : getMachine;
  });
  if (typeof getMachine !== "function") {
    var _a = __read((0, import_react.useState)(machine), 1), initialMachine = _a[0];
    if (getMachine !== initialMachine) {
      console.warn("Machine given to `useMachine` has changed between renders. This is not supported and might lead to unexpected results.\nPlease make sure that you pass the same Machine as argument each time.");
    }
  }
  var context = options.context, guards = options.guards, actions = options.actions, activities = options.activities, services = options.services, delays = options.delays, rehydratedState = options.state, interpreterOptions = __rest(options, ["context", "guards", "actions", "activities", "services", "delays", "state"]);
  var service = useConstant(function() {
    var machineConfig = {
      context,
      guards,
      actions,
      activities,
      services,
      delays
    };
    var machineWithConfig = machine.withConfig(machineConfig, function() {
      return __assign(__assign({}, machine.context), context);
    });
    return interpret(machineWithConfig, interpreterOptions);
  });
  use_isomorphic_layout_effect_browser_esm_default(function() {
    Object.assign(service.machine.options.actions, actions);
    Object.assign(service.machine.options.guards, guards);
    Object.assign(service.machine.options.activities, activities);
    Object.assign(service.machine.options.services, services);
    Object.assign(service.machine.options.delays, delays);
  }, [actions, guards, activities, services, delays]);
  return service;
}
function useInterpret(getMachine) {
  var _a = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    _a[_i - 1] = arguments[_i];
  }
  var _b = __read(_a, 2), _c = _b[0], options = _c === void 0 ? {} : _c, observerOrListener = _b[1];
  var service = useIdleInterpreter(getMachine, options);
  (0, import_react.useEffect)(function() {
    if (!observerOrListener) {
      return;
    }
    var sub = service.subscribe(toObserver(observerOrListener));
    return function() {
      sub.unsubscribe();
    };
  }, [observerOrListener]);
  (0, import_react.useEffect)(function() {
    var rehydratedState = options.state;
    service.start(rehydratedState ? State.create(rehydratedState) : void 0);
    return function() {
      service.stop();
      service.status = InterpreterStatus.NotStarted;
    };
  }, []);
  return service;
}

// ../../../node_modules/@xstate/react/es/useMachine.js
var __read2 = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
function identity(a) {
  return a;
}
function useMachine(getMachine) {
  var _a = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    _a[_i - 1] = arguments[_i];
  }
  var _b = __read2(_a, 1), _c = _b[0], options = _c === void 0 ? {} : _c;
  var service = useIdleInterpreter(getMachine, options);
  var getSnapshot = (0, import_react2.useCallback)(function() {
    if (service.status === InterpreterStatus.NotStarted) {
      return options.state ? State.create(options.state) : service.machine.initialState;
    }
    return service.state;
  }, [service]);
  var isEqual = (0, import_react2.useCallback)(function(prevState, nextState) {
    if (service.status === InterpreterStatus.NotStarted) {
      return true;
    }
    var initialStateChanged = nextState.changed === void 0 && (Object.keys(nextState.children).length > 0 || typeof prevState.changed === "boolean");
    return !(nextState.changed || initialStateChanged);
  }, [service]);
  var subscribe = (0, import_react2.useCallback)(function(handleStoreChange) {
    var unsubscribe = service.subscribe(handleStoreChange).unsubscribe;
    return unsubscribe;
  }, [service]);
  var storeSnapshot = (0, import_with_selector.useSyncExternalStoreWithSelector)(subscribe, getSnapshot, getSnapshot, identity, isEqual);
  (0, import_react2.useEffect)(function() {
    var rehydratedState = options.state;
    service.start(rehydratedState ? State.create(rehydratedState) : void 0);
    return function() {
      service.stop();
      service.status = InterpreterStatus.NotStarted;
    };
  }, []);
  return [storeSnapshot, service.send, service];
}

// ../../../node_modules/@xstate/react/es/useActor.js
var import_react3 = __toESM(require_react());
var import_shim = __toESM(require_shim());
function isActorWithState(actorRef) {
  return "state" in actorRef;
}
function isDeferredActor(actorRef) {
  return "deferred" in actorRef;
}
function defaultGetSnapshot(actorRef) {
  return "getSnapshot" in actorRef ? actorRef.getSnapshot() : isActorWithState(actorRef) ? actorRef.state : void 0;
}
function useActor(actorRef, getSnapshot) {
  if (getSnapshot === void 0) {
    getSnapshot = defaultGetSnapshot;
  }
  var actorRefRef = (0, import_react3.useRef)(actorRef);
  var deferredEventsRef = (0, import_react3.useRef)([]);
  var subscribe = (0, import_react3.useCallback)(function(handleStoreChange) {
    var unsubscribe = actorRef.subscribe(handleStoreChange).unsubscribe;
    return unsubscribe;
  }, [actorRef]);
  var boundGetSnapshot = (0, import_react3.useCallback)(function() {
    return getSnapshot(actorRef);
  }, [
    actorRef,
    getSnapshot
  ]);
  var storeSnapshot = (0, import_shim.useSyncExternalStore)(subscribe, boundGetSnapshot, boundGetSnapshot);
  var send = useConstant(function() {
    return function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var event = args[0];
      if (args.length > 1) {
        console.warn("Unexpected payload: ".concat(JSON.stringify(args[1]), ". Only a single event object can be sent to actor send() functions."));
      }
      var currentActorRef = actorRefRef.current;
      if (isDeferredActor(currentActorRef) && currentActorRef.deferred) {
        deferredEventsRef.current.push(event);
      } else {
        currentActorRef.send(event);
      }
    };
  });
  use_isomorphic_layout_effect_browser_esm_default(function() {
    actorRefRef.current = actorRef;
    while (deferredEventsRef.current.length > 0) {
      var deferredEvent = deferredEventsRef.current.shift();
      actorRef.send(deferredEvent);
    }
  }, [actorRef]);
  return [storeSnapshot, send];
}

// ../../../node_modules/@xstate/react/es/useSelector.js
var import_react4 = __toESM(require_react());
var import_with_selector2 = __toESM(require_with_selector());

// ../../../node_modules/@xstate/react/es/utils.js
function getServiceSnapshot(service) {
  return service.status !== 0 ? service.state : service.machine.initialState;
}
function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function shallowEqual(objA, objB) {
  if (is(objA, objB))
    return true;
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length)
    return false;
  for (var i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}

// ../../../node_modules/@xstate/react/es/useSelector.js
function isService(actor) {
  return "state" in actor && "machine" in actor;
}
var defaultCompare = function(a, b) {
  return a === b;
};
var defaultGetSnapshot2 = function(a, initialStateCacheRef) {
  if (isService(a)) {
    if (a.status === 0 && initialStateCacheRef.current) {
      return initialStateCacheRef.current;
    }
    var snapshot = getServiceSnapshot(a);
    initialStateCacheRef.current = a.status === 0 ? snapshot : null;
    return snapshot;
  }
  return isActorWithState(a) ? a.state : void 0;
};
function useSelector(actor, selector, compare, getSnapshot) {
  if (compare === void 0) {
    compare = defaultCompare;
  }
  var initialStateCacheRef = (0, import_react4.useRef)(null);
  var subscribe = (0, import_react4.useCallback)(function(handleStoreChange) {
    var unsubscribe = actor.subscribe(handleStoreChange).unsubscribe;
    return unsubscribe;
  }, [actor]);
  var boundGetSnapshot = (0, import_react4.useCallback)(function() {
    if (getSnapshot) {
      return getSnapshot(actor);
    }
    return defaultGetSnapshot2(actor, initialStateCacheRef);
  }, [actor, getSnapshot]);
  var selectedSnapshot = (0, import_with_selector2.useSyncExternalStoreWithSelector)(subscribe, boundGetSnapshot, boundGetSnapshot, selector, compare);
  return selectedSnapshot;
}

// ../../../node_modules/@xstate/react/es/useSpawn.js
function useSpawn(behavior) {
  var actorRef = useConstant(function() {
    return spawnBehavior(behavior);
  });
  return actorRef;
}
export {
  shallowEqual,
  useActor,
  useInterpret,
  useMachine,
  useSelector,
  useSpawn
};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//# sourceMappingURL=@xstate_react.js.map
