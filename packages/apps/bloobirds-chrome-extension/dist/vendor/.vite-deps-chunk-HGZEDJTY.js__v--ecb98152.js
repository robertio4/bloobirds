import.meta.env = {"BASE_URL":"/","MODE":"development","DEV":true,"PROD":false,"SSR":false};import {
  DefaultElement,
  Editable,
  ReactEditor,
  Slate,
  useSlate,
  useSlateStatic,
  withReact
} from "/vendor/.vite-deps-chunk-73EC23W7.js__v--ecb98152.js";
import {
  C,
  Editor,
  Element,
  Node as Node2,
  Operation,
  Path,
  Point,
  Range,
  Span,
  Text,
  Transforms,
  createEditor,
  immer_esm_default,
  isPlainObject,
  sn
} from "/vendor/.vite-deps-chunk-ZSYTCF3U.js__v--ecb98152.js";
import {
  _extends
} from "/vendor/.vite-deps-chunk-XWJC7T76.js__v--ecb98152.js";
import {
  clsx_m_default,
  init_clsx_m
} from "/vendor/.vite-deps-chunk-KGS3KTN5.js__v--ecb98152.js";
import {
  require_jsx_runtime
} from "/vendor/.vite-deps-chunk-TCI3F74I.js__v--ecb98152.js";
import {
  require_react_dom,
  require_scheduler
} from "/vendor/.vite-deps-chunk-3UKJDGBQ.js__v--ecb98152.js";
import {
  require_react
} from "/vendor/.vite-deps-chunk-C7VZVCY4.js__v--ecb98152.js";
import {
  __toESM
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--ecb98152.js";

// ../../../node_modules/jotai/esm/index.mjs
var import_react = __toESM(require_react(), 1);

// ../../../node_modules/jotai/esm/vanilla.mjs
var keyCount = 0;
function atom(read, write) {
  const key = `atom${++keyCount}`;
  const config = {
    toString: () => key
  };
  if (typeof read === "function") {
    config.read = read;
  } else {
    config.init = read;
    config.read = (get2) => get2(config);
    config.write = (get2, set, arg) => set(
      config,
      typeof arg === "function" ? arg(get2(config)) : arg
    );
  }
  if (write) {
    config.write = write;
  }
  return config;
}

// ../../../node_modules/jotai/esm/index.mjs
var SUSPENSE_PROMISE = Symbol();
var isSuspensePromise = (promise) => !!promise[SUSPENSE_PROMISE];
var isSuspensePromiseAlreadyCancelled = (suspensePromise) => !suspensePromise[SUSPENSE_PROMISE].c;
var cancelSuspensePromise = (suspensePromise) => {
  var _a;
  const { b: basePromise, c: cancelPromise } = suspensePromise[SUSPENSE_PROMISE];
  if (cancelPromise) {
    cancelPromise();
    (_a = promiseAbortMap.get(basePromise)) == null ? void 0 : _a();
  }
};
var isEqualSuspensePromise = (oldSuspensePromise, newSuspensePromise) => {
  const oldOriginalPromise = oldSuspensePromise[SUSPENSE_PROMISE].o;
  const newOriginalPromise = newSuspensePromise[SUSPENSE_PROMISE].o;
  return oldOriginalPromise === newOriginalPromise || oldSuspensePromise === newOriginalPromise || isSuspensePromise(oldOriginalPromise) && isEqualSuspensePromise(oldOriginalPromise, newSuspensePromise);
};
var createSuspensePromise = (basePromise, promise) => {
  const suspensePromiseExtra = {
    b: basePromise,
    o: promise,
    c: null
  };
  const suspensePromise = new Promise((resolve) => {
    suspensePromiseExtra.c = () => {
      suspensePromiseExtra.c = null;
      resolve();
    };
    promise.finally(suspensePromiseExtra.c);
  });
  suspensePromise[SUSPENSE_PROMISE] = suspensePromiseExtra;
  return suspensePromise;
};
var copySuspensePromise = (suspensePromise) => createSuspensePromise(
  suspensePromise[SUSPENSE_PROMISE].b,
  suspensePromise[SUSPENSE_PROMISE].o
);
var promiseAbortMap = /* @__PURE__ */ new WeakMap();
var hasInitialValue = (atom3) => "init" in atom3;
var READ_ATOM = "r";
var WRITE_ATOM = "w";
var COMMIT_ATOM = "c";
var SUBSCRIBE_ATOM = "s";
var RESTORE_ATOMS = "h";
var DEV_SUBSCRIBE_STATE = "n";
var DEV_GET_MOUNTED_ATOMS = "l";
var DEV_GET_ATOM_STATE = "a";
var DEV_GET_MOUNTED = "m";
var createStore = (initialValues) => {
  const committedAtomStateMap = /* @__PURE__ */ new WeakMap();
  const mountedMap = /* @__PURE__ */ new WeakMap();
  const pendingMap = /* @__PURE__ */ new Map();
  let stateListeners;
  let mountedAtoms;
  if ((import.meta.env && import.meta.env.MODE) !== "production") {
    stateListeners = /* @__PURE__ */ new Set();
    mountedAtoms = /* @__PURE__ */ new Set();
  }
  if (initialValues) {
    for (const [atom3, value] of initialValues) {
      const atomState = {
        v: value,
        r: 0,
        y: true,
        d: /* @__PURE__ */ new Map()
      };
      if ((import.meta.env && import.meta.env.MODE) !== "production") {
        Object.freeze(atomState);
        if (!hasInitialValue(atom3)) {
          console.warn(
            "Found initial value for derived atom which can cause unexpected behavior",
            atom3
          );
        }
      }
      committedAtomStateMap.set(atom3, atomState);
    }
  }
  const suspensePromiseCacheMap = /* @__PURE__ */ new WeakMap();
  const addSuspensePromiseToCache = (version, atom3, suspensePromise) => {
    let cache = suspensePromiseCacheMap.get(atom3);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      suspensePromiseCacheMap.set(atom3, cache);
    }
    suspensePromise.then(() => {
      if (cache.get(version) === suspensePromise) {
        cache.delete(version);
        if (!cache.size) {
          suspensePromiseCacheMap.delete(atom3);
        }
      }
    });
    cache.set(version, suspensePromise);
  };
  const cancelAllSuspensePromiseInCache = (atom3) => {
    const versionSet = /* @__PURE__ */ new Set();
    const cache = suspensePromiseCacheMap.get(atom3);
    if (cache) {
      suspensePromiseCacheMap.delete(atom3);
      cache.forEach((suspensePromise, version) => {
        cancelSuspensePromise(suspensePromise);
        versionSet.add(version);
      });
    }
    return versionSet;
  };
  const versionedAtomStateMapMap = /* @__PURE__ */ new WeakMap();
  const getVersionedAtomStateMap = (version) => {
    let versionedAtomStateMap = versionedAtomStateMapMap.get(version);
    if (!versionedAtomStateMap) {
      versionedAtomStateMap = /* @__PURE__ */ new Map();
      versionedAtomStateMapMap.set(version, versionedAtomStateMap);
    }
    return versionedAtomStateMap;
  };
  const getAtomState = (version, atom3) => {
    if (version) {
      const versionedAtomStateMap = getVersionedAtomStateMap(version);
      let atomState = versionedAtomStateMap.get(atom3);
      if (!atomState) {
        atomState = getAtomState(version.p, atom3);
        if (atomState && "p" in atomState && isSuspensePromiseAlreadyCancelled(atomState.p)) {
          atomState = void 0;
        }
        if (atomState) {
          versionedAtomStateMap.set(atom3, atomState);
        }
      }
      return atomState;
    }
    return committedAtomStateMap.get(atom3);
  };
  const setAtomState = (version, atom3, atomState) => {
    if ((import.meta.env && import.meta.env.MODE) !== "production") {
      Object.freeze(atomState);
    }
    if (version) {
      const versionedAtomStateMap = getVersionedAtomStateMap(version);
      versionedAtomStateMap.set(atom3, atomState);
    } else {
      const prevAtomState = committedAtomStateMap.get(atom3);
      committedAtomStateMap.set(atom3, atomState);
      if (!pendingMap.has(atom3)) {
        pendingMap.set(atom3, prevAtomState);
      }
    }
  };
  const createReadDependencies = (version, prevReadDependencies = /* @__PURE__ */ new Map(), dependencies) => {
    if (!dependencies) {
      return prevReadDependencies;
    }
    const readDependencies = /* @__PURE__ */ new Map();
    let changed = false;
    dependencies.forEach((atom3) => {
      var _a;
      const revision = ((_a = getAtomState(version, atom3)) == null ? void 0 : _a.r) || 0;
      readDependencies.set(atom3, revision);
      if (prevReadDependencies.get(atom3) !== revision) {
        changed = true;
      }
    });
    if (prevReadDependencies.size === readDependencies.size && !changed) {
      return prevReadDependencies;
    }
    return readDependencies;
  };
  const setAtomValue = (version, atom3, value, dependencies, suspensePromise) => {
    const atomState = getAtomState(version, atom3);
    if (atomState) {
      if (suspensePromise && (!("p" in atomState) || !isEqualSuspensePromise(atomState.p, suspensePromise))) {
        return atomState;
      }
      if ("p" in atomState) {
        cancelSuspensePromise(atomState.p);
      }
    }
    const nextAtomState = {
      v: value,
      r: (atomState == null ? void 0 : atomState.r) || 0,
      y: true,
      d: createReadDependencies(version, atomState == null ? void 0 : atomState.d, dependencies)
    };
    let changed = !(atomState == null ? void 0 : atomState.y);
    if (!atomState || !("v" in atomState) || !Object.is(atomState.v, value)) {
      changed = true;
      ++nextAtomState.r;
      if (nextAtomState.d.has(atom3)) {
        nextAtomState.d = new Map(nextAtomState.d).set(atom3, nextAtomState.r);
      }
    } else if (nextAtomState.d !== atomState.d && (nextAtomState.d.size !== atomState.d.size || !Array.from(nextAtomState.d.keys()).every((a2) => atomState.d.has(a2)))) {
      changed = true;
      Promise.resolve().then(() => {
        flushPending(version);
      });
    }
    if (atomState && !changed) {
      return atomState;
    }
    setAtomState(version, atom3, nextAtomState);
    return nextAtomState;
  };
  const setAtomReadError = (version, atom3, error, dependencies, suspensePromise) => {
    const atomState = getAtomState(version, atom3);
    if (atomState) {
      if (suspensePromise && (!("p" in atomState) || !isEqualSuspensePromise(atomState.p, suspensePromise))) {
        return atomState;
      }
      if ("p" in atomState) {
        cancelSuspensePromise(atomState.p);
      }
    }
    const nextAtomState = {
      e: error,
      r: ((atomState == null ? void 0 : atomState.r) || 0) + 1,
      y: true,
      d: createReadDependencies(version, atomState == null ? void 0 : atomState.d, dependencies)
    };
    setAtomState(version, atom3, nextAtomState);
    return nextAtomState;
  };
  const setAtomSuspensePromise = (version, atom3, suspensePromise, dependencies) => {
    const atomState = getAtomState(version, atom3);
    if (atomState && "p" in atomState) {
      if (isEqualSuspensePromise(atomState.p, suspensePromise) && !isSuspensePromiseAlreadyCancelled(atomState.p)) {
        if (!atomState.y) {
          return { ...atomState, y: true };
        }
        return atomState;
      }
      cancelSuspensePromise(atomState.p);
    }
    addSuspensePromiseToCache(version, atom3, suspensePromise);
    const nextAtomState = {
      p: suspensePromise,
      r: ((atomState == null ? void 0 : atomState.r) || 0) + 1,
      y: true,
      d: createReadDependencies(version, atomState == null ? void 0 : atomState.d, dependencies)
    };
    setAtomState(version, atom3, nextAtomState);
    return nextAtomState;
  };
  const setAtomPromiseOrValue = (version, atom3, promiseOrValue, dependencies) => {
    if (promiseOrValue instanceof Promise) {
      const suspensePromise = createSuspensePromise(
        promiseOrValue,
        promiseOrValue.then((value) => {
          setAtomValue(version, atom3, value, dependencies, suspensePromise);
        }).catch((e3) => {
          if (e3 instanceof Promise) {
            if (isSuspensePromise(e3)) {
              return e3.then(() => {
                readAtomState(version, atom3, true);
              });
            }
            return e3;
          }
          setAtomReadError(version, atom3, e3, dependencies, suspensePromise);
        })
      );
      return setAtomSuspensePromise(
        version,
        atom3,
        suspensePromise,
        dependencies
      );
    }
    return setAtomValue(
      version,
      atom3,
      promiseOrValue,
      dependencies
    );
  };
  const setAtomInvalidated = (version, atom3) => {
    const atomState = getAtomState(version, atom3);
    if (atomState) {
      const nextAtomState = {
        ...atomState,
        y: false
      };
      setAtomState(version, atom3, nextAtomState);
    } else if ((import.meta.env && import.meta.env.MODE) !== "production") {
      console.warn("[Bug] could not invalidate non existing atom", atom3);
    }
  };
  const readAtomState = (version, atom3, force) => {
    if (!force) {
      const atomState = getAtomState(version, atom3);
      if (atomState) {
        if (atomState.y && "p" in atomState && !isSuspensePromiseAlreadyCancelled(atomState.p)) {
          return atomState;
        }
        atomState.d.forEach((_, a2) => {
          if (a2 !== atom3) {
            if (!mountedMap.has(a2)) {
              readAtomState(version, a2);
            } else {
              const aState = getAtomState(version, a2);
              if (aState && !aState.y) {
                readAtomState(version, a2);
              }
            }
          }
        });
        if (Array.from(atomState.d).every(([a2, r3]) => {
          const aState = getAtomState(version, a2);
          return aState && !("p" in aState) && aState.r === r3;
        })) {
          if (!atomState.y) {
            return { ...atomState, y: true };
          }
          return atomState;
        }
      }
    }
    const dependencies = /* @__PURE__ */ new Set();
    try {
      const promiseOrValue = atom3.read((a2) => {
        dependencies.add(a2);
        const aState = a2 === atom3 ? getAtomState(version, a2) : readAtomState(version, a2);
        if (aState) {
          if ("e" in aState) {
            throw aState.e;
          }
          if ("p" in aState) {
            throw aState.p;
          }
          return aState.v;
        }
        if (hasInitialValue(a2)) {
          return a2.init;
        }
        throw new Error("no atom init");
      });
      return setAtomPromiseOrValue(version, atom3, promiseOrValue, dependencies);
    } catch (errorOrPromise) {
      if (errorOrPromise instanceof Promise) {
        const suspensePromise = isSuspensePromise(errorOrPromise) && isSuspensePromiseAlreadyCancelled(errorOrPromise) ? copySuspensePromise(errorOrPromise) : createSuspensePromise(errorOrPromise, errorOrPromise);
        return setAtomSuspensePromise(
          version,
          atom3,
          suspensePromise,
          dependencies
        );
      }
      return setAtomReadError(version, atom3, errorOrPromise, dependencies);
    }
  };
  const readAtom = (readingAtom, version) => {
    const atomState = readAtomState(version, readingAtom);
    return atomState;
  };
  const addAtom = (version, addingAtom) => {
    let mounted = mountedMap.get(addingAtom);
    if (!mounted) {
      mounted = mountAtom(version, addingAtom);
    }
    return mounted;
  };
  const canUnmountAtom = (atom3, mounted) => !mounted.l.size && (!mounted.t.size || mounted.t.size === 1 && mounted.t.has(atom3));
  const delAtom = (version, deletingAtom) => {
    const mounted = mountedMap.get(deletingAtom);
    if (mounted && canUnmountAtom(deletingAtom, mounted)) {
      unmountAtom(version, deletingAtom);
    }
  };
  const invalidateDependents = (version, atom3) => {
    const mounted = mountedMap.get(atom3);
    mounted == null ? void 0 : mounted.t.forEach((dependent) => {
      if (dependent !== atom3) {
        setAtomInvalidated(version, dependent);
        invalidateDependents(version, dependent);
      }
    });
  };
  const writeAtomState = (version, atom3, update) => {
    let isSync = true;
    const writeGetter = (a2, options) => {
      const aState = readAtomState(version, a2);
      if ("e" in aState) {
        throw aState.e;
      }
      if ("p" in aState) {
        if (options == null ? void 0 : options.unstable_promise) {
          return aState.p.then(() => {
            const s3 = getAtomState(version, a2);
            if (s3 && "p" in s3 && s3.p === aState.p) {
              return new Promise((resolve) => setTimeout(resolve)).then(
                () => writeGetter(a2, options)
              );
            }
            return writeGetter(a2, options);
          });
        }
        if ((import.meta.env && import.meta.env.MODE) !== "production") {
          console.info(
            "Reading pending atom state in write operation. We throw a promise for now.",
            a2
          );
        }
        throw aState.p;
      }
      if ("v" in aState) {
        return aState.v;
      }
      if ((import.meta.env && import.meta.env.MODE) !== "production") {
        console.warn(
          "[Bug] no value found while reading atom in write operation. This is probably a bug.",
          a2
        );
      }
      throw new Error("no value found");
    };
    const setter = (a2, v2) => {
      let promiseOrVoid2;
      if (a2 === atom3) {
        if (!hasInitialValue(a2)) {
          throw new Error("atom not writable");
        }
        const versionSet = cancelAllSuspensePromiseInCache(a2);
        versionSet.forEach((cancelledVersion) => {
          if (cancelledVersion !== version) {
            setAtomPromiseOrValue(cancelledVersion, a2, v2);
          }
        });
        const prevAtomState = getAtomState(version, a2);
        const nextAtomState = setAtomPromiseOrValue(version, a2, v2);
        if (prevAtomState !== nextAtomState) {
          invalidateDependents(version, a2);
        }
      } else {
        promiseOrVoid2 = writeAtomState(version, a2, v2);
      }
      if (!isSync) {
        flushPending(version);
      }
      return promiseOrVoid2;
    };
    const promiseOrVoid = atom3.write(writeGetter, setter, update);
    isSync = false;
    return promiseOrVoid;
  };
  const writeAtom = (writingAtom, update, version) => {
    const promiseOrVoid = writeAtomState(version, writingAtom, update);
    flushPending(version);
    return promiseOrVoid;
  };
  const isActuallyWritableAtom = (atom3) => !!atom3.write;
  const mountAtom = (version, atom3, initialDependent) => {
    const mounted = {
      t: new Set(initialDependent && [initialDependent]),
      l: /* @__PURE__ */ new Set()
    };
    mountedMap.set(atom3, mounted);
    if ((import.meta.env && import.meta.env.MODE) !== "production") {
      mountedAtoms.add(atom3);
    }
    const atomState = readAtomState(void 0, atom3);
    atomState.d.forEach((_, a2) => {
      const aMounted = mountedMap.get(a2);
      if (aMounted) {
        aMounted.t.add(atom3);
      } else {
        if (a2 !== atom3) {
          mountAtom(version, a2, atom3);
        }
      }
    });
    if (isActuallyWritableAtom(atom3) && atom3.onMount) {
      const setAtom = (update) => writeAtom(atom3, update, version);
      const onUnmount = atom3.onMount(setAtom);
      version = void 0;
      if (onUnmount) {
        mounted.u = onUnmount;
      }
    }
    return mounted;
  };
  const unmountAtom = (version, atom3) => {
    var _a;
    const onUnmount = (_a = mountedMap.get(atom3)) == null ? void 0 : _a.u;
    if (onUnmount) {
      onUnmount();
    }
    mountedMap.delete(atom3);
    if ((import.meta.env && import.meta.env.MODE) !== "production") {
      mountedAtoms.delete(atom3);
    }
    const atomState = getAtomState(version, atom3);
    if (atomState) {
      if ("p" in atomState) {
        cancelSuspensePromise(atomState.p);
      }
      atomState.d.forEach((_, a2) => {
        if (a2 !== atom3) {
          const mounted = mountedMap.get(a2);
          if (mounted) {
            mounted.t.delete(atom3);
            if (canUnmountAtom(a2, mounted)) {
              unmountAtom(version, a2);
            }
          }
        }
      });
    } else if ((import.meta.env && import.meta.env.MODE) !== "production") {
      console.warn("[Bug] could not find atom state to unmount", atom3);
    }
  };
  const mountDependencies = (version, atom3, atomState, prevReadDependencies) => {
    const dependencies = new Set(atomState.d.keys());
    prevReadDependencies == null ? void 0 : prevReadDependencies.forEach((_, a2) => {
      if (dependencies.has(a2)) {
        dependencies.delete(a2);
        return;
      }
      const mounted = mountedMap.get(a2);
      if (mounted) {
        mounted.t.delete(atom3);
        if (canUnmountAtom(a2, mounted)) {
          unmountAtom(version, a2);
        }
      }
    });
    dependencies.forEach((a2) => {
      const mounted = mountedMap.get(a2);
      if (mounted) {
        mounted.t.add(atom3);
      } else if (mountedMap.has(atom3)) {
        mountAtom(version, a2, atom3);
      }
    });
  };
  const flushPending = (version) => {
    if (version) {
      const versionedAtomStateMap = getVersionedAtomStateMap(version);
      versionedAtomStateMap.forEach((atomState, atom3) => {
        const committedAtomState = committedAtomStateMap.get(atom3);
        if (atomState !== committedAtomState) {
          const mounted = mountedMap.get(atom3);
          mounted == null ? void 0 : mounted.l.forEach((listener) => listener(version));
        }
      });
      return;
    }
    while (pendingMap.size) {
      const pending = Array.from(pendingMap);
      pendingMap.clear();
      pending.forEach(([atom3, prevAtomState]) => {
        const atomState = getAtomState(void 0, atom3);
        if (atomState && atomState.d !== (prevAtomState == null ? void 0 : prevAtomState.d)) {
          mountDependencies(void 0, atom3, atomState, prevAtomState == null ? void 0 : prevAtomState.d);
        }
        if (prevAtomState && !prevAtomState.y && (atomState == null ? void 0 : atomState.y)) {
          return;
        }
        const mounted = mountedMap.get(atom3);
        mounted == null ? void 0 : mounted.l.forEach((listener) => listener());
      });
    }
    if ((import.meta.env && import.meta.env.MODE) !== "production") {
      stateListeners.forEach((l3) => l3());
    }
  };
  const commitVersionedAtomStateMap = (version) => {
    const versionedAtomStateMap = getVersionedAtomStateMap(version);
    versionedAtomStateMap.forEach((atomState, atom3) => {
      const prevAtomState = committedAtomStateMap.get(atom3);
      if (!prevAtomState || atomState.r > prevAtomState.r || atomState.y !== prevAtomState.y || atomState.r === prevAtomState.r && atomState.d !== prevAtomState.d) {
        committedAtomStateMap.set(atom3, atomState);
        if (atomState.d !== (prevAtomState == null ? void 0 : prevAtomState.d)) {
          mountDependencies(version, atom3, atomState, prevAtomState == null ? void 0 : prevAtomState.d);
        }
      }
    });
  };
  const commitAtom = (_atom, version) => {
    if (version) {
      commitVersionedAtomStateMap(version);
    }
    flushPending(void 0);
  };
  const subscribeAtom = (atom3, callback, version) => {
    const mounted = addAtom(version, atom3);
    const listeners = mounted.l;
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
      delAtom(version, atom3);
    };
  };
  const restoreAtoms = (values2, version) => {
    for (const [atom3, value] of values2) {
      if (hasInitialValue(atom3)) {
        setAtomPromiseOrValue(version, atom3, value);
        invalidateDependents(version, atom3);
      }
    }
    flushPending(version);
  };
  if ((import.meta.env && import.meta.env.MODE) !== "production") {
    return {
      [READ_ATOM]: readAtom,
      [WRITE_ATOM]: writeAtom,
      [COMMIT_ATOM]: commitAtom,
      [SUBSCRIBE_ATOM]: subscribeAtom,
      [RESTORE_ATOMS]: restoreAtoms,
      [DEV_SUBSCRIBE_STATE]: (l3) => {
        stateListeners.add(l3);
        return () => {
          stateListeners.delete(l3);
        };
      },
      [DEV_GET_MOUNTED_ATOMS]: () => mountedAtoms.values(),
      [DEV_GET_ATOM_STATE]: (a2) => committedAtomStateMap.get(a2),
      [DEV_GET_MOUNTED]: (a2) => mountedMap.get(a2)
    };
  }
  return {
    [READ_ATOM]: readAtom,
    [WRITE_ATOM]: writeAtom,
    [COMMIT_ATOM]: commitAtom,
    [SUBSCRIBE_ATOM]: subscribeAtom,
    [RESTORE_ATOMS]: restoreAtoms
  };
};
var createScopeContainer = (initialValues, unstable_createStore) => {
  const store = unstable_createStore ? unstable_createStore(initialValues).SECRET_INTERNAL_store : createStore(initialValues);
  return { s: store };
};
var ScopeContextMap = /* @__PURE__ */ new Map();
var getScopeContext = (scope) => {
  if (!ScopeContextMap.has(scope)) {
    ScopeContextMap.set(scope, (0, import_react.createContext)(createScopeContainer()));
  }
  return ScopeContextMap.get(scope);
};
var Provider = ({
  children,
  initialValues,
  scope,
  unstable_createStore,
  unstable_enableVersionedWrite
}) => {
  const [version, setVersion] = (0, import_react.useState)({});
  (0, import_react.useEffect)(() => {
    const scopeContainer = scopeContainerRef.current;
    if (scopeContainer.w) {
      scopeContainer.s[COMMIT_ATOM](null, version);
      delete version.p;
      scopeContainer.v = version;
    }
  }, [version]);
  const scopeContainerRef = (0, import_react.useRef)();
  if (!scopeContainerRef.current) {
    const scopeContainer = createScopeContainer(
      initialValues,
      unstable_createStore
    );
    if (unstable_enableVersionedWrite) {
      let retrying = 0;
      scopeContainer.w = (write) => {
        setVersion((parentVersion) => {
          const nextVersion = retrying ? parentVersion : { p: parentVersion };
          write(nextVersion);
          return nextVersion;
        });
      };
      scopeContainer.v = version;
      scopeContainer.r = (fn) => {
        ++retrying;
        fn();
        --retrying;
      };
    }
    scopeContainerRef.current = scopeContainer;
  }
  const ScopeContainerContext = getScopeContext(scope);
  return (0, import_react.createElement)(
    ScopeContainerContext.Provider,
    {
      value: scopeContainerRef.current
    },
    children
  );
};
function atom2(read, write) {
  return atom(read, write);
}
function useAtomValue(atom3, scope) {
  const ScopeContext = getScopeContext(scope);
  const scopeContainer = (0, import_react.useContext)(ScopeContext);
  const { s: store, v: versionFromProvider } = scopeContainer;
  const getAtomValue = (version2) => {
    const atomState = store[READ_ATOM](atom3, version2);
    if ((import.meta.env && import.meta.env.MODE) !== "production" && !atomState.y) {
      throw new Error("should not be invalidated");
    }
    if ("e" in atomState) {
      throw atomState.e;
    }
    if ("p" in atomState) {
      throw atomState.p;
    }
    if ("v" in atomState) {
      return atomState.v;
    }
    throw new Error("no atom value");
  };
  const [[version, valueFromReducer, atomFromReducer], rerenderIfChanged] = (0, import_react.useReducer)(
    (prev, nextVersion) => {
      const nextValue = getAtomValue(nextVersion);
      if (Object.is(prev[1], nextValue) && prev[2] === atom3) {
        return prev;
      }
      return [nextVersion, nextValue, atom3];
    },
    versionFromProvider,
    (initialVersion) => {
      const initialValue = getAtomValue(initialVersion);
      return [initialVersion, initialValue, atom3];
    }
  );
  let value = valueFromReducer;
  if (atomFromReducer !== atom3) {
    rerenderIfChanged(version);
    value = getAtomValue(version);
  }
  (0, import_react.useEffect)(() => {
    const { v: versionFromProvider2 } = scopeContainer;
    if (versionFromProvider2) {
      store[COMMIT_ATOM](atom3, versionFromProvider2);
    }
    const unsubscribe = store[SUBSCRIBE_ATOM](
      atom3,
      rerenderIfChanged,
      versionFromProvider2
    );
    rerenderIfChanged(versionFromProvider2);
    return unsubscribe;
  }, [store, atom3, scopeContainer]);
  (0, import_react.useEffect)(() => {
    store[COMMIT_ATOM](atom3, version);
  });
  (0, import_react.useDebugValue)(value);
  return value;
}
function useSetAtom(atom3, scope) {
  const ScopeContext = getScopeContext(scope);
  const { s: store, w: versionedWrite } = (0, import_react.useContext)(ScopeContext);
  const setAtom = (0, import_react.useCallback)(
    (update) => {
      if ((import.meta.env && import.meta.env.MODE) !== "production" && !("write" in atom3)) {
        throw new Error("not writable atom");
      }
      const write = (version) => store[WRITE_ATOM](atom3, update, version);
      return versionedWrite ? versionedWrite(write) : write();
    },
    [store, versionedWrite, atom3]
  );
  return setAtom;
}
function useAtom(atom3, scope) {
  if ("scope" in atom3) {
    console.warn(
      "atom.scope is deprecated. Please do useAtom(atom, scope) instead."
    );
    scope = atom3.scope;
  }
  return [
    useAtomValue(atom3, scope),
    useSetAtom(atom3, scope)
  ];
}

// ../../../node_modules/@udecode/plate-core/dist/index.es.js
var import_react9 = __toESM(require_react());

// ../../../node_modules/nanoid/index.browser.js
var nanoid = (size = 21) => crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
  byte &= 63;
  if (byte < 36) {
    id += byte.toString(36);
  } else if (byte < 62) {
    id += (byte - 26).toString(36).toUpperCase();
  } else if (byte > 62) {
    id += "-";
  } else {
    id += "_";
  }
  return id;
}, "");

// ../../../node_modules/react-hotkeys-hook/dist/react-hotkeys-hook.esm.js
var import_react2 = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
function _extends2() {
  _extends2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i3 = 1; i3 < arguments.length; i3++) {
      var source = arguments[i3];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends2.apply(this, arguments);
}
var reservedModifierKeywords = ["shift", "alt", "meta", "mod", "ctrl"];
var mappedKeys = {
  esc: "escape",
  "return": "enter",
  ".": "period",
  ",": "comma",
  "-": "slash",
  " ": "space",
  "`": "backquote",
  "#": "backslash",
  "+": "bracketright",
  ShiftLeft: "shift",
  ShiftRight: "shift",
  AltLeft: "alt",
  AltRight: "alt",
  MetaLeft: "meta",
  MetaRight: "meta",
  OSLeft: "meta",
  OSRight: "meta",
  ControlLeft: "ctrl",
  ControlRight: "ctrl"
};
function mapKey(key) {
  return (mappedKeys[key] || key).trim().toLowerCase().replace(/key|digit|numpad|arrow/, "");
}
function isHotkeyModifier(key) {
  return reservedModifierKeywords.includes(key);
}
function parseKeysHookInput(keys2, splitKey) {
  if (splitKey === void 0) {
    splitKey = ",";
  }
  if (typeof keys2 === "string") {
    return keys2.split(splitKey);
  }
  return keys2;
}
function parseHotkey(hotkey, combinationKey) {
  if (combinationKey === void 0) {
    combinationKey = "+";
  }
  var keys2 = hotkey.toLocaleLowerCase().split(combinationKey).map(function(k) {
    return mapKey(k);
  });
  var modifiers = {
    alt: keys2.includes("alt"),
    ctrl: keys2.includes("ctrl") || keys2.includes("control"),
    shift: keys2.includes("shift"),
    meta: keys2.includes("meta"),
    mod: keys2.includes("mod")
  };
  var singleCharKeys = keys2.filter(function(k) {
    return !reservedModifierKeywords.includes(k);
  });
  return _extends2({}, modifiers, {
    keys: singleCharKeys
  });
}
(function() {
  if (typeof document !== "undefined") {
    document.addEventListener("keydown", function(e3) {
      if (e3.key === void 0) {
        return;
      }
      pushToCurrentlyPressedKeys([mapKey(e3.key), mapKey(e3.code)]);
    });
    document.addEventListener("keyup", function(e3) {
      if (e3.key === void 0) {
        return;
      }
      removeFromCurrentlyPressedKeys([mapKey(e3.key), mapKey(e3.code)]);
    });
  }
  if (typeof window !== "undefined") {
    window.addEventListener("blur", function() {
      currentlyPressedKeys.clear();
    });
  }
})();
var currentlyPressedKeys = /* @__PURE__ */ new Set();
function isHotkeyPressed(key, splitKey) {
  if (splitKey === void 0) {
    splitKey = ",";
  }
  var hotkeyArray = Array.isArray(key) ? key : key.split(splitKey);
  return hotkeyArray.every(function(hotkey) {
    return currentlyPressedKeys.has(hotkey.trim().toLowerCase());
  });
}
function pushToCurrentlyPressedKeys(key) {
  var hotkeyArray = Array.isArray(key) ? key : [key];
  if (currentlyPressedKeys.has("meta")) {
    currentlyPressedKeys.forEach(function(key2) {
      return !isHotkeyModifier(key2) && currentlyPressedKeys["delete"](key2.toLowerCase());
    });
  }
  hotkeyArray.forEach(function(hotkey) {
    return currentlyPressedKeys.add(hotkey.toLowerCase());
  });
}
function removeFromCurrentlyPressedKeys(key) {
  var hotkeyArray = Array.isArray(key) ? key : [key];
  if (key === "meta") {
    currentlyPressedKeys.clear();
  } else {
    hotkeyArray.forEach(function(hotkey) {
      return currentlyPressedKeys["delete"](hotkey.toLowerCase());
    });
  }
}
function maybePreventDefault(e3, hotkey, preventDefault) {
  if (typeof preventDefault === "function" && preventDefault(e3, hotkey) || preventDefault === true) {
    e3.preventDefault();
  }
}
function isHotkeyEnabled(e3, hotkey, enabled) {
  if (typeof enabled === "function") {
    return enabled(e3, hotkey);
  }
  return enabled === true || enabled === void 0;
}
function isKeyboardEventTriggeredByInput(ev) {
  return isHotkeyEnabledOnTag(ev, ["input", "textarea", "select"]);
}
function isHotkeyEnabledOnTag(_ref, enabledOnTags) {
  var target = _ref.target;
  if (enabledOnTags === void 0) {
    enabledOnTags = false;
  }
  var targetTagName = target && target.tagName;
  if (enabledOnTags instanceof Array) {
    return Boolean(targetTagName && enabledOnTags && enabledOnTags.some(function(tag) {
      return tag.toLowerCase() === targetTagName.toLowerCase();
    }));
  }
  return Boolean(targetTagName && enabledOnTags && enabledOnTags === true);
}
function isScopeActive(activeScopes, scopes) {
  if (activeScopes.length === 0 && scopes) {
    console.warn('A hotkey has the "scopes" option set, however no active scopes were found. If you want to use the global scopes feature, you need to wrap your app in a <HotkeysProvider>');
    return true;
  }
  if (!scopes) {
    return true;
  }
  return activeScopes.some(function(scope) {
    return scopes.includes(scope);
  }) || activeScopes.includes("*");
}
var isHotkeyMatchingKeyboardEvent = function isHotkeyMatchingKeyboardEvent2(e3, hotkey, ignoreModifiers) {
  if (ignoreModifiers === void 0) {
    ignoreModifiers = false;
  }
  var alt = hotkey.alt, meta = hotkey.meta, mod = hotkey.mod, shift = hotkey.shift, ctrl = hotkey.ctrl, keys2 = hotkey.keys;
  var pressedKeyUppercase = e3.key, code = e3.code, ctrlKey = e3.ctrlKey, metaKey = e3.metaKey, shiftKey = e3.shiftKey, altKey = e3.altKey;
  var keyCode = mapKey(code);
  var pressedKey = pressedKeyUppercase.toLowerCase();
  if (!ignoreModifiers) {
    if (alt === !altKey && pressedKey !== "alt") {
      return false;
    }
    if (shift === !shiftKey && pressedKey !== "shift") {
      return false;
    }
    if (mod) {
      if (!metaKey && !ctrlKey) {
        return false;
      }
    } else {
      if (meta === !metaKey && pressedKey !== "meta" && pressedKey !== "os") {
        return false;
      }
      if (ctrl === !ctrlKey && pressedKey !== "ctrl" && pressedKey !== "control") {
        return false;
      }
    }
  }
  if (keys2 && keys2.length === 1 && (keys2.includes(pressedKey) || keys2.includes(keyCode))) {
    return true;
  } else if (keys2) {
    return isHotkeyPressed(keys2);
  } else if (!keys2) {
    return true;
  }
  return false;
};
var BoundHotkeysProxyProvider = (0, import_react2.createContext)(void 0);
var useBoundHotkeysProxy = function useBoundHotkeysProxy2() {
  return (0, import_react2.useContext)(BoundHotkeysProxyProvider);
};
function deepEqual(x, y2) {
  return x && y2 && typeof x === "object" && typeof y2 === "object" ? Object.keys(x).length === Object.keys(y2).length && Object.keys(x).reduce(function(isEqual2, key) {
    return isEqual2 && deepEqual(x[key], y2[key]);
  }, true) : x === y2;
}
var HotkeysContext = (0, import_react2.createContext)({
  hotkeys: [],
  enabledScopes: [],
  toggleScope: function toggleScope() {
  },
  enableScope: function enableScope() {
  },
  disableScope: function disableScope() {
  }
});
var useHotkeysContext = function useHotkeysContext2() {
  return (0, import_react2.useContext)(HotkeysContext);
};
function useDeepEqualMemo(value) {
  var ref = (0, import_react2.useRef)(void 0);
  if (!deepEqual(ref.current, value)) {
    ref.current = value;
  }
  return ref.current;
}
var stopPropagation = function stopPropagation2(e3) {
  e3.stopPropagation();
  e3.preventDefault();
  e3.stopImmediatePropagation();
};
var useSafeLayoutEffect = typeof window !== "undefined" ? import_react2.useLayoutEffect : import_react2.useEffect;
function useHotkeys(keys2, callback, options, dependencies) {
  var ref = (0, import_react2.useRef)(null);
  var hasTriggeredRef = (0, import_react2.useRef)(false);
  var _options = !(options instanceof Array) ? options : !(dependencies instanceof Array) ? dependencies : void 0;
  var _deps = options instanceof Array ? options : dependencies instanceof Array ? dependencies : void 0;
  var memoisedCB = (0, import_react2.useCallback)(callback, _deps != null ? _deps : []);
  var cbRef = (0, import_react2.useRef)(memoisedCB);
  if (_deps) {
    cbRef.current = memoisedCB;
  } else {
    cbRef.current = callback;
  }
  var memoisedOptions = useDeepEqualMemo(_options);
  var _useHotkeysContext = useHotkeysContext(), enabledScopes = _useHotkeysContext.enabledScopes;
  var proxy = useBoundHotkeysProxy();
  useSafeLayoutEffect(function() {
    if ((memoisedOptions == null ? void 0 : memoisedOptions.enabled) === false || !isScopeActive(enabledScopes, memoisedOptions == null ? void 0 : memoisedOptions.scopes)) {
      return;
    }
    var listener = function listener2(e3, isKeyUp) {
      var _e$target;
      if (isKeyUp === void 0) {
        isKeyUp = false;
      }
      if (isKeyboardEventTriggeredByInput(e3) && !isHotkeyEnabledOnTag(e3, memoisedOptions == null ? void 0 : memoisedOptions.enableOnFormTags)) {
        return;
      }
      if (ref.current !== null && document.activeElement !== ref.current && !ref.current.contains(document.activeElement)) {
        stopPropagation(e3);
        return;
      }
      if ((_e$target = e3.target) != null && _e$target.isContentEditable && !(memoisedOptions != null && memoisedOptions.enableOnContentEditable)) {
        return;
      }
      parseKeysHookInput(keys2, memoisedOptions == null ? void 0 : memoisedOptions.splitKey).forEach(function(key) {
        var _hotkey$keys;
        var hotkey = parseHotkey(key, memoisedOptions == null ? void 0 : memoisedOptions.combinationKey);
        if (isHotkeyMatchingKeyboardEvent(e3, hotkey, memoisedOptions == null ? void 0 : memoisedOptions.ignoreModifiers) || (_hotkey$keys = hotkey.keys) != null && _hotkey$keys.includes("*")) {
          if (isKeyUp && hasTriggeredRef.current) {
            return;
          }
          maybePreventDefault(e3, hotkey, memoisedOptions == null ? void 0 : memoisedOptions.preventDefault);
          if (!isHotkeyEnabled(e3, hotkey, memoisedOptions == null ? void 0 : memoisedOptions.enabled)) {
            stopPropagation(e3);
            return;
          }
          cbRef.current(e3, hotkey);
          if (!isKeyUp) {
            hasTriggeredRef.current = true;
          }
        }
      });
    };
    var handleKeyDown = function handleKeyDown2(event) {
      if (event.key === void 0) {
        return;
      }
      pushToCurrentlyPressedKeys(mapKey(event.code));
      if ((memoisedOptions == null ? void 0 : memoisedOptions.keydown) === void 0 && (memoisedOptions == null ? void 0 : memoisedOptions.keyup) !== true || memoisedOptions != null && memoisedOptions.keydown) {
        listener(event);
      }
    };
    var handleKeyUp = function handleKeyUp2(event) {
      if (event.key === void 0) {
        return;
      }
      removeFromCurrentlyPressedKeys(mapKey(event.code));
      hasTriggeredRef.current = false;
      if (memoisedOptions != null && memoisedOptions.keyup) {
        listener(event, true);
      }
    };
    var domNode = ref.current || (_options == null ? void 0 : _options.document) || document;
    domNode.addEventListener("keyup", handleKeyUp);
    domNode.addEventListener("keydown", handleKeyDown);
    if (proxy) {
      parseKeysHookInput(keys2, memoisedOptions == null ? void 0 : memoisedOptions.splitKey).forEach(function(key) {
        return proxy.addHotkey(parseHotkey(key, memoisedOptions == null ? void 0 : memoisedOptions.combinationKey));
      });
    }
    return function() {
      domNode.removeEventListener("keyup", handleKeyUp);
      domNode.removeEventListener("keydown", handleKeyDown);
      if (proxy) {
        parseKeysHookInput(keys2, memoisedOptions == null ? void 0 : memoisedOptions.splitKey).forEach(function(key) {
          return proxy.removeHotkey(parseHotkey(key, memoisedOptions == null ? void 0 : memoisedOptions.combinationKey));
        });
      }
    };
  }, [keys2, memoisedOptions, enabledScopes]);
  return ref;
}

// ../../../node_modules/react-tracked/dist/index.modern.js
var import_react4 = __toESM(require_react());

// ../../../node_modules/use-context-selector/dist/index.modern.js
var import_react3 = __toESM(require_react());
var import_scheduler = __toESM(require_scheduler());
var import_react_dom = __toESM(require_react_dom());
var d = Symbol();
var f = Symbol();
var v = "undefined" == typeof window || /ServerSideRendering/.test(window.navigator && window.navigator.userAgent) ? import_react3.useEffect : import_react3.useLayoutEffect;

// ../../../node_modules/proxy-compare/dist/index.modern.js
var e2 = Symbol();
var t2 = Symbol();
var r2 = "a";
var n2 = "w";
var o2 = (e3, t3) => new Proxy(e3, t3);
var s2 = Object.getPrototypeOf;
var c2 = /* @__PURE__ */ new WeakMap();
var l2 = (e3) => e3 && (c2.has(e3) ? c2.get(e3) : s2(e3) === Object.prototype || s2(e3) === Array.prototype);
var f2 = (e3) => "object" == typeof e3 && null !== e3;
var i2 = /* @__PURE__ */ new WeakMap();
var a = (e3) => e3[t2] || e3;
var u2 = (c3, f3, p3) => {
  if (!l2(c3))
    return c3;
  const y2 = a(c3), g2 = ((e3) => Object.isFrozen(e3) || Object.values(Object.getOwnPropertyDescriptors(e3)).some((e4) => !e4.writable))(y2);
  let h2 = p3 && p3.get(y2);
  return h2 && h2[1].f === g2 || (h2 = ((o3, s3) => {
    const c4 = { f: s3 };
    let l3 = false;
    const f4 = (e3, t3) => {
      if (!l3) {
        let s4 = c4[r2].get(o3);
        if (s4 || (s4 = {}, c4[r2].set(o3, s4)), e3 === n2)
          s4[n2] = true;
        else {
          let r3 = s4[e3];
          r3 || (r3 = /* @__PURE__ */ new Set(), s4[e3] = r3), r3.add(t3);
        }
      }
    }, i3 = { get: (e3, n3) => n3 === t2 ? o3 : (f4("k", n3), u2(Reflect.get(e3, n3), c4[r2], c4.c)), has: (t3, n3) => n3 === e2 ? (l3 = true, c4[r2].delete(o3), true) : (f4("h", n3), Reflect.has(t3, n3)), getOwnPropertyDescriptor: (e3, t3) => (f4("o", t3), Reflect.getOwnPropertyDescriptor(e3, t3)), ownKeys: (e3) => (f4(n2), Reflect.ownKeys(e3)) };
    return s3 && (i3.set = i3.deleteProperty = () => false), [i3, c4];
  })(y2, g2), h2[1].p = o2(g2 ? ((e3) => {
    let t3 = i2.get(e3);
    if (!t3) {
      if (Array.isArray(e3))
        t3 = Array.from(e3);
      else {
        const r3 = Object.getOwnPropertyDescriptors(e3);
        Object.values(r3).forEach((e4) => {
          e4.configurable = true;
        }), t3 = Object.create(s2(e3), r3);
      }
      i2.set(e3, t3);
    }
    return t3;
  })(y2) : y2, h2[0]), p3 && p3.set(y2, h2)), h2[1][r2] = f3, h2[1].c = p3, h2[1].p;
};
var p2 = (e3, t3, r3, o3) => {
  if (Object.is(e3, t3))
    return false;
  if (!f2(e3) || !f2(t3))
    return true;
  const s3 = r3.get(a(e3));
  if (!s3)
    return true;
  if (o3) {
    const r4 = o3.get(e3);
    if (r4 && r4.n === t3)
      return r4.g;
    o3.set(e3, { n: t3, g: false });
  }
  let c3 = null;
  try {
    for (const r4 of s3.h || [])
      if (c3 = Reflect.has(e3, r4) !== Reflect.has(t3, r4), c3)
        return c3;
    if (true === s3[n2]) {
      if (c3 = ((e4, t4) => {
        const r4 = Reflect.ownKeys(e4), n3 = Reflect.ownKeys(t4);
        return r4.length !== n3.length || r4.some((e5, t5) => e5 !== n3[t5]);
      })(e3, t3), c3)
        return c3;
    } else
      for (const r4 of s3.o || [])
        if (c3 = !!Reflect.getOwnPropertyDescriptor(e3, r4) != !!Reflect.getOwnPropertyDescriptor(t3, r4), c3)
          return c3;
    for (const n3 of s3.k || [])
      if (c3 = p2(e3[n3], t3[n3], r3, o3), c3)
        return c3;
    return null === c3 && (c3 = true), c3;
  } finally {
    o3 && o3.set(e3, { n: t3, g: c3 });
  }
};
var w = (e3, t3, r3) => {
  const o3 = [], s3 = /* @__PURE__ */ new WeakSet(), c3 = (e4, l3) => {
    if (s3.has(e4))
      return;
    f2(e4) && s3.add(e4);
    const i3 = f2(e4) && t3.get(a(e4));
    if (i3) {
      var u3, p3;
      if (null == (u3 = i3.h) || u3.forEach((e5) => {
        const t4 = `:has(${String(e5)})`;
        o3.push(l3 ? [...l3, t4] : [t4]);
      }), true === i3[n2]) {
        const e5 = ":ownKeys";
        o3.push(l3 ? [...l3, e5] : [e5]);
      } else {
        var y2;
        null == (y2 = i3.o) || y2.forEach((e5) => {
          const t4 = `:hasOwn(${String(e5)})`;
          o3.push(l3 ? [...l3, t4] : [t4]);
        });
      }
      null == (p3 = i3.k) || p3.forEach((t4) => {
        r3 && !("value" in (Object.getOwnPropertyDescriptor(e4, t4) || {})) || c3(e4[t4], l3 ? [...l3, t4] : [t4]);
      });
    } else
      l3 && o3.push(l3);
  };
  return c3(e3), o3;
};

// ../../../node_modules/react-tracked/dist/index.modern.js
var useAffectedDebugValue = (state, affected) => {
  const pathList = (0, import_react4.useRef)();
  (0, import_react4.useEffect)(() => {
    pathList.current = w(state, affected);
  });
  (0, import_react4.useDebugValue)(state);
};
var createTrackedSelector = (useSelector) => {
  const useTrackedSelector = () => {
    const [, forceUpdate] = (0, import_react4.useReducer)((c3) => c3 + 1, 0);
    const affected = /* @__PURE__ */ new WeakMap();
    const lastAffected = (0, import_react4.useRef)();
    const prevState = (0, import_react4.useRef)();
    const lastState = (0, import_react4.useRef)();
    (0, import_react4.useEffect)(() => {
      lastAffected.current = affected;
      if (prevState.current !== lastState.current && p2(prevState.current, lastState.current, affected, /* @__PURE__ */ new WeakMap())) {
        prevState.current = lastState.current;
        forceUpdate();
      }
    });
    const selector = (0, import_react4.useCallback)((nextState) => {
      lastState.current = nextState;
      if (prevState.current && prevState.current !== nextState && lastAffected.current && !p2(prevState.current, nextState, lastAffected.current, /* @__PURE__ */ new WeakMap())) {
        return prevState.current;
      }
      prevState.current = nextState;
      return nextState;
    }, []);
    const state = useSelector(selector);
    if (typeof process === "object" && true) {
      useAffectedDebugValue(state, affected);
    }
    const proxyCache = (0, import_react4.useMemo)(() => /* @__PURE__ */ new WeakMap(), []);
    return u2(state, affected, proxyCache);
  };
  return useTrackedSelector;
};

// ../../../node_modules/zustand/esm/index.js
var import_react5 = __toESM(require_react());
function createStore2(createState) {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (nextState !== state) {
      const previousState = state;
      state = replace ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const subscribeWithSelector = (listener, selector = getState, equalityFn = Object.is) => {
    console.warn("[DEPRECATED] Please use `subscribeWithSelector` middleware");
    let currentSlice = selector(state);
    function listenerToAdd() {
      const nextSlice = selector(state);
      if (!equalityFn(currentSlice, nextSlice)) {
        const previousSlice = currentSlice;
        listener(currentSlice = nextSlice, previousSlice);
      }
    }
    listeners.add(listenerToAdd);
    return () => listeners.delete(listenerToAdd);
  };
  const subscribe = (listener, selector, equalityFn) => {
    if (selector || equalityFn) {
      return subscribeWithSelector(listener, selector, equalityFn);
    }
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => listeners.clear();
  const api = { setState, getState, subscribe, destroy };
  state = createState(setState, getState, api);
  return api;
}
var isSSR = typeof window === "undefined" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
var useIsomorphicLayoutEffect = isSSR ? import_react5.useEffect : import_react5.useLayoutEffect;
function create(createState) {
  const api = typeof createState === "function" ? createStore2(createState) : createState;
  const useStore = (selector = api.getState, equalityFn = Object.is) => {
    const [, forceUpdate] = (0, import_react5.useReducer)((c3) => c3 + 1, 0);
    const state = api.getState();
    const stateRef = (0, import_react5.useRef)(state);
    const selectorRef = (0, import_react5.useRef)(selector);
    const equalityFnRef = (0, import_react5.useRef)(equalityFn);
    const erroredRef = (0, import_react5.useRef)(false);
    const currentSliceRef = (0, import_react5.useRef)();
    if (currentSliceRef.current === void 0) {
      currentSliceRef.current = selector(state);
    }
    let newStateSlice;
    let hasNewStateSlice = false;
    if (stateRef.current !== state || selectorRef.current !== selector || equalityFnRef.current !== equalityFn || erroredRef.current) {
      newStateSlice = selector(state);
      hasNewStateSlice = !equalityFn(currentSliceRef.current, newStateSlice);
    }
    useIsomorphicLayoutEffect(() => {
      if (hasNewStateSlice) {
        currentSliceRef.current = newStateSlice;
      }
      stateRef.current = state;
      selectorRef.current = selector;
      equalityFnRef.current = equalityFn;
      erroredRef.current = false;
    });
    const stateBeforeSubscriptionRef = (0, import_react5.useRef)(state);
    useIsomorphicLayoutEffect(() => {
      const listener = () => {
        try {
          const nextState = api.getState();
          const nextStateSlice = selectorRef.current(nextState);
          if (!equalityFnRef.current(currentSliceRef.current, nextStateSlice)) {
            stateRef.current = nextState;
            currentSliceRef.current = nextStateSlice;
            forceUpdate();
          }
        } catch (error) {
          erroredRef.current = true;
          forceUpdate();
        }
      };
      const unsubscribe = api.subscribe(listener);
      if (api.getState() !== stateBeforeSubscriptionRef.current) {
        listener();
      }
      return unsubscribe;
    }, []);
    const sliceToReturn = hasNewStateSlice ? newStateSlice : currentSliceRef.current;
    (0, import_react5.useDebugValue)(sliceToReturn);
    return sliceToReturn;
  };
  Object.assign(useStore, api);
  useStore[Symbol.iterator] = function() {
    console.warn("[useStore, api] = create() is deprecated and will be removed in v4");
    const items = [useStore, api];
    return {
      next() {
        const done = items.length <= 0;
        return { value: items.shift(), done };
      }
    };
  };
  return useStore;
}

// ../../../node_modules/zustand/esm/middleware.js
function devtools(fn, options) {
  return (set, get2, api) => {
    var _a;
    let didWarnAboutNameDeprecation = false;
    if (typeof options === "string" && !didWarnAboutNameDeprecation) {
      console.warn("[zustand devtools middleware]: passing `name` as directly will be not allowed in next majorpass the `name` in an object `{ name: ... }` instead");
      didWarnAboutNameDeprecation = true;
    }
    const devtoolsOptions = options === void 0 ? { name: void 0, anonymousActionType: void 0 } : typeof options === "string" ? { name: options } : options;
    if (typeof ((_a = devtoolsOptions == null ? void 0 : devtoolsOptions.serialize) == null ? void 0 : _a.options) !== "undefined") {
      console.warn("[zustand devtools middleware]: `serialize.options` is deprecated, just use `serialize`");
    }
    let extensionConnector;
    try {
      extensionConnector = window.__REDUX_DEVTOOLS_EXTENSION__ || window.top.__REDUX_DEVTOOLS_EXTENSION__;
    } catch {
    }
    if (!extensionConnector) {
      if ((import.meta.env && import.meta.env.MODE) !== "production" && typeof window !== "undefined") {
        console.warn("[zustand devtools middleware] Please install/enable Redux devtools extension");
      }
      return fn(set, get2, api);
    }
    let extension = Object.create(extensionConnector.connect(devtoolsOptions));
    let didWarnAboutDevtools = false;
    Object.defineProperty(api, "devtools", {
      get: () => {
        if (!didWarnAboutDevtools) {
          console.warn("[zustand devtools middleware] `devtools` property on the store is deprecated it will be removed in the next major.\nYou shouldn't interact with the extension directly. But in case you still want to you can patch `window.__REDUX_DEVTOOLS_EXTENSION__` directly");
          didWarnAboutDevtools = true;
        }
        return extension;
      },
      set: (value) => {
        if (!didWarnAboutDevtools) {
          console.warn("[zustand devtools middleware] `api.devtools` is deprecated, it will be removed in the next major.\nYou shouldn't interact with the extension directly. But in case you still want to you can patch `window.__REDUX_DEVTOOLS_EXTENSION__` directly");
          didWarnAboutDevtools = true;
        }
        extension = value;
      }
    });
    let didWarnAboutPrefix = false;
    Object.defineProperty(extension, "prefix", {
      get: () => {
        if (!didWarnAboutPrefix) {
          console.warn("[zustand devtools middleware] along with `api.devtools`, `api.devtools.prefix` is deprecated.\nWe no longer prefix the actions/names" + devtoolsOptions.name === void 0 ? ", pass the `name` option to create a separate instance of devtools for each store." : ", because the `name` option already creates a separate instance of devtools for each store.");
          didWarnAboutPrefix = true;
        }
        return "";
      },
      set: () => {
        if (!didWarnAboutPrefix) {
          console.warn("[zustand devtools middleware] along with `api.devtools`, `api.devtools.prefix` is deprecated.\nWe no longer prefix the actions/names" + devtoolsOptions.name === void 0 ? ", pass the `name` option to create a separate instance of devtools for each store." : ", because the `name` option already creates a separate instance of devtools for each store.");
          didWarnAboutPrefix = true;
        }
      }
    });
    let isRecording = true;
    api.setState = (state, replace, nameOrAction) => {
      set(state, replace);
      if (!isRecording)
        return;
      extension.send(nameOrAction === void 0 ? { type: devtoolsOptions.anonymousActionType || "anonymous" } : typeof nameOrAction === "string" ? { type: nameOrAction } : nameOrAction, get2());
    };
    const setStateFromDevtools = (...a2) => {
      const originalIsRecording = isRecording;
      isRecording = false;
      set(...a2);
      isRecording = originalIsRecording;
    };
    const initialState = fn(api.setState, get2, api);
    extension.init(initialState);
    if (api.dispatchFromDevtools && typeof api.dispatch === "function") {
      let didWarnAboutReservedActionType = false;
      const originalDispatch = api.dispatch;
      api.dispatch = (...a2) => {
        if (a2[0].type === "__setState" && !didWarnAboutReservedActionType) {
          console.warn('[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.');
          didWarnAboutReservedActionType = true;
        }
        originalDispatch(...a2);
      };
    }
    extension.subscribe((message) => {
      var _a2;
      switch (message.type) {
        case "ACTION":
          if (typeof message.payload !== "string") {
            console.error("[zustand devtools middleware] Unsupported action format");
            return;
          }
          return parseJsonThen(message.payload, (action) => {
            if (action.type === "__setState") {
              setStateFromDevtools(action.state);
              return;
            }
            if (!api.dispatchFromDevtools)
              return;
            if (typeof api.dispatch !== "function")
              return;
            api.dispatch(action);
          });
        case "DISPATCH":
          switch (message.payload.type) {
            case "RESET":
              setStateFromDevtools(initialState);
              return extension.init(api.getState());
            case "COMMIT":
              return extension.init(api.getState());
            case "ROLLBACK":
              return parseJsonThen(message.state, (state) => {
                setStateFromDevtools(state);
                extension.init(api.getState());
              });
            case "JUMP_TO_STATE":
            case "JUMP_TO_ACTION":
              return parseJsonThen(message.state, (state) => {
                setStateFromDevtools(state);
              });
            case "IMPORT_STATE": {
              const { nextLiftedState } = message.payload;
              const lastComputedState = (_a2 = nextLiftedState.computedStates.slice(-1)[0]) == null ? void 0 : _a2.state;
              if (!lastComputedState)
                return;
              setStateFromDevtools(lastComputedState);
              extension.send(null, nextLiftedState);
              return;
            }
            case "PAUSE_RECORDING":
              return isRecording = !isRecording;
          }
          return;
      }
    });
    return initialState;
  };
}
var parseJsonThen = (stringified, f3) => {
  let parsed;
  try {
    parsed = JSON.parse(stringified);
  } catch (e3) {
    console.error("[zustand devtools middleware] Could not parse the received json", e3);
  }
  if (parsed !== void 0)
    f3(parsed);
};
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var toThenable = (fn) => (input) => {
  try {
    const result = fn(input);
    if (result instanceof Promise) {
      return result;
    }
    return {
      then(onFulfilled) {
        return toThenable(onFulfilled)(result);
      },
      catch(_onRejected) {
        return this;
      }
    };
  } catch (e3) {
    return {
      then(_onFulfilled) {
        return this;
      },
      catch(onRejected) {
        return toThenable(onRejected)(e3);
      }
    };
  }
};
var persist = (config, baseOptions) => (set, get2, api) => {
  let options = __spreadValues({
    getStorage: () => localStorage,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => __spreadValues(__spreadValues({}, currentState), persistedState)
  }, baseOptions);
  if (options.blacklist || options.whitelist) {
    console.warn(`The ${options.blacklist ? "blacklist" : "whitelist"} option is deprecated and will be removed in the next version. Please use the 'partialize' option instead.`);
  }
  let hasHydrated = false;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage;
  try {
    storage = options.getStorage();
  } catch (e3) {
  }
  if (!storage) {
    return config((...args) => {
      console.warn(`[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`);
      set(...args);
    }, get2, api);
  } else if (!storage.removeItem) {
    console.warn(`[zustand persist middleware] The given storage for item '${options.name}' does not contain a 'removeItem' method, which will be required in v4.`);
  }
  const thenableSerialize = toThenable(options.serialize);
  const setItem = () => {
    const state = options.partialize(__spreadValues({}, get2()));
    if (options.whitelist) {
      Object.keys(state).forEach((key) => {
        var _a;
        !((_a = options.whitelist) == null ? void 0 : _a.includes(key)) && delete state[key];
      });
    }
    if (options.blacklist) {
      options.blacklist.forEach((key) => delete state[key]);
    }
    let errorInSync;
    const thenable = thenableSerialize({ state, version: options.version }).then((serializedValue) => storage.setItem(options.name, serializedValue)).catch((e3) => {
      errorInSync = e3;
    });
    if (errorInSync) {
      throw errorInSync;
    }
    return thenable;
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    void setItem();
  };
  const configResult = config((...args) => {
    set(...args);
    void setItem();
  }, get2, api);
  let stateFromStorage;
  const hydrate = () => {
    var _a;
    if (!storage)
      return;
    hasHydrated = false;
    hydrationListeners.forEach((cb) => cb(get2()));
    const postRehydrationCallback = ((_a = options.onRehydrateStorage) == null ? void 0 : _a.call(options, get2())) || void 0;
    return toThenable(storage.getItem.bind(storage))(options.name).then((storageValue) => {
      if (storageValue) {
        return options.deserialize(storageValue);
      }
    }).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
          if (options.migrate) {
            return options.migrate(deserializedStorageValue.state, deserializedStorageValue.version);
          }
          console.error(`State loaded from storage couldn't be migrated since no migrate function was provided`);
        } else {
          return deserializedStorageValue.state;
        }
      }
    }).then((migratedState) => {
      var _a2;
      stateFromStorage = options.merge(migratedState, (_a2 = get2()) != null ? _a2 : configResult);
      set(stateFromStorage, true);
      return setItem();
    }).then(() => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
      hasHydrated = true;
      finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
    }).catch((e3) => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e3);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options = __spreadValues(__spreadValues({}, options), newOptions);
      if (newOptions.getStorage) {
        storage = newOptions.getStorage();
      }
    },
    clearStorage: () => {
      var _a;
      (_a = storage == null ? void 0 : storage.removeItem) == null ? void 0 : _a.call(storage, options.name);
    },
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb) => {
      hydrationListeners.add(cb);
      return () => {
        hydrationListeners.delete(cb);
      };
    },
    onFinishHydration: (cb) => {
      finishHydrationListeners.add(cb);
      return () => {
        finishHydrationListeners.delete(cb);
      };
    }
  };
  hydrate();
  return stateFromStorage || configResult;
};

// ../../../node_modules/zustand/esm/vanilla.js
function createStore3(createState) {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (nextState !== state) {
      const previousState = state;
      state = replace ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const subscribeWithSelector = (listener, selector = getState, equalityFn = Object.is) => {
    console.warn("[DEPRECATED] Please use `subscribeWithSelector` middleware");
    let currentSlice = selector(state);
    function listenerToAdd() {
      const nextSlice = selector(state);
      if (!equalityFn(currentSlice, nextSlice)) {
        const previousSlice = currentSlice;
        listener(currentSlice = nextSlice, previousSlice);
      }
    }
    listeners.add(listenerToAdd);
    return () => listeners.delete(listenerToAdd);
  };
  const subscribe = (listener, selector, equalityFn) => {
    if (selector || equalityFn) {
      return subscribeWithSelector(listener, selector, equalityFn);
    }
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => listeners.clear();
  const api = { setState, getState, subscribe, destroy };
  state = createState(setState, getState, api);
  return api;
}

// ../../../node_modules/@udecode/zustood/dist/index.es.js
var generateStateActions = (store, storeName) => {
  const actions = {};
  Object.keys(store.getState()).forEach((key) => {
    actions[key] = (value) => {
      const prevValue = store.getState()[key];
      if (prevValue === value)
        return;
      const actionKey = key.replace(/^\S/, (s3) => s3.toUpperCase());
      store.setState((draft) => {
        draft[key] = value;
      }, `@@${storeName}/set${actionKey}`);
    };
  });
  return actions;
};
var extendActions = (builder, api) => {
  const actions = builder(api.set, api.get, api);
  return {
    ...api,
    set: {
      ...api.set,
      ...actions
    }
  };
};
var extendSelectors = (builder, api) => {
  const use = {
    ...api.use
  };
  const useTracked = {
    ...api.useTracked
  };
  const get2 = {
    ...api.get
  };
  Object.keys(builder(api.store.getState(), api.get, api)).forEach((key) => {
    use[key] = (...args) => api.useStore((state) => {
      const selectors = builder(state, api.get, api);
      const selector = selectors[key];
      return selector(...args);
    });
    useTracked[key] = (...args) => {
      const trackedState = api.useTrackedStore();
      const selectors = builder(trackedState, api.get, api);
      const selector = selectors[key];
      return selector(...args);
    };
    get2[key] = (...args) => {
      const selectors = builder(api.store.getState(), api.get, api);
      const selector = selectors[key];
      return selector(...args);
    };
  });
  return {
    ...api,
    get: get2,
    use,
    useTracked
  };
};
var storeFactory = (api) => {
  return {
    ...api,
    extendSelectors: (builder) => storeFactory(extendSelectors(builder, api)),
    extendActions: (builder) => storeFactory(extendActions(builder, api))
  };
};
var generateStateGetSelectors = (store) => {
  const selectors = {};
  Object.keys(store.getState()).forEach((key) => {
    selectors[key] = () => store.getState()[key];
  });
  return selectors;
};
var generateStateHookSelectors = (store) => {
  const selectors = {};
  Object.keys(store.getState()).forEach((key) => {
    selectors[key] = (equalityFn) => {
      return store((state) => state[key], equalityFn);
    };
  });
  return selectors;
};
var generateStateTrackedHooksSelectors = (store, trackedStore) => {
  const selectors = {};
  Object.keys(store.getState()).forEach((key) => {
    selectors[key] = () => {
      return trackedStore()[key];
    };
  });
  return selectors;
};
var immerMiddleware = (config) => (set, get2, api) => {
  const setState = (fn, actionName) => set(immer_esm_default(fn), true, actionName);
  api.setState = setState;
  return config(setState, get2, api);
};
function pipe(x, ...fns) {
  return fns.reduce((y2, fn) => fn(y2), x);
}
var createStore4 = (name) => (initialState, options = {}) => {
  var _immer$enabledAutoFre;
  const {
    middlewares: _middlewares = [],
    devtools: devtools$1,
    persist: persist$1,
    immer
  } = options;
  sn((_immer$enabledAutoFre = immer === null || immer === void 0 ? void 0 : immer.enabledAutoFreeze) !== null && _immer$enabledAutoFre !== void 0 ? _immer$enabledAutoFre : false);
  if (immer !== null && immer !== void 0 && immer.enableMapSet) {
    C();
  }
  const middlewares = [immerMiddleware, ..._middlewares];
  if (persist$1 !== null && persist$1 !== void 0 && persist$1.enabled) {
    var _persist$name;
    const options2 = {
      ...persist$1,
      name: (_persist$name = persist$1.name) !== null && _persist$name !== void 0 ? _persist$name : name
    };
    middlewares.push((config) => persist(config, options2));
  }
  if (devtools$1 !== null && devtools$1 !== void 0 && devtools$1.enabled) {
    middlewares.push((config) => devtools(config, {
      ...devtools$1,
      name
    }));
  }
  middlewares.push(createStore3);
  const createStore5 = (createState) => pipe(createState, ...middlewares);
  const store = createStore5(() => initialState);
  const useStore = create(store);
  const stateActions = generateStateActions(useStore, name);
  const mergeState = (state, actionName) => {
    store.setState((draft) => {
      Object.assign(draft, state);
    }, actionName || `@@${name}/mergeState`);
  };
  const setState = (fn, actionName) => {
    store.setState(fn, actionName || `@@${name}/setState`);
  };
  const hookSelectors = generateStateHookSelectors(useStore);
  const getterSelectors = generateStateGetSelectors(useStore);
  const useTrackedStore = createTrackedSelector(useStore);
  const trackedHooksSelectors = generateStateTrackedHooksSelectors(useStore, useTrackedStore);
  const api = {
    get: {
      state: store.getState,
      ...getterSelectors
    },
    name,
    set: {
      state: setState,
      mergeState,
      ...stateActions
    },
    store,
    use: hookSelectors,
    useTracked: trackedHooksSelectors,
    useStore,
    useTrackedStore,
    extendSelectors: () => api,
    extendActions: () => api
  };
  return storeFactory(api);
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = _freeGlobal || freeSelf || Function("return this")();
var _root = root;
var Symbol2 = _root.Symbol;
var _Symbol = Symbol2;
var objectProto$b = Object.prototype;
var hasOwnProperty$8 = objectProto$b.hasOwnProperty;
var nativeObjectToString$1 = objectProto$b.toString;
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$8.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e3) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var _getRawTag = getRawTag;
var objectProto$a = Object.prototype;
var nativeObjectToString = objectProto$a.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var _objectToString = objectToString;
var nullTag = "[object Null]";
var undefinedTag = "[object Undefined]";
var symToStringTag = _Symbol ? _Symbol.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? _getRawTag(value) : _objectToString(value);
}
var _baseGetTag = baseGetTag;
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_1 = isObject;
var asyncTag = "[object AsyncFunction]";
var funcTag$1 = "[object Function]";
var genTag = "[object GeneratorFunction]";
var proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  var tag = _baseGetTag(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_1 = isFunction;
var coreJsData = _root["__core-js_shared__"];
var _coreJsData = coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var _isMasked = isMasked;
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e3) {
    }
    try {
      return func + "";
    } catch (e3) {
    }
  }
  return "";
}
var _toSource = toSource;
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype;
var objectProto$9 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString.call(hasOwnProperty$7).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}
var _baseIsNative = baseIsNative;
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
var _getValue = getValue;
function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : void 0;
}
var _getNative = getNative;
var defineProperty = function() {
  try {
    var func = _getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e3) {
  }
}();
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var _createBaseFor = createBaseFor;
var baseFor = _createBaseFor();
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_1 = isObjectLike;
var argsTag$2 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag$2;
}
var _baseIsArguments = baseIsArguments;
var objectProto$8 = Object.prototype;
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$8.propertyIsEnumerable;
var isArguments = _baseIsArguments(function() {
  return arguments;
}()) ? _baseIsArguments : function(value) {
  return isObjectLike_1(value) && hasOwnProperty$6.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
var isArray = Array.isArray;
function stubFalse() {
  return false;
}
var stubFalse_1 = stubFalse;
var isBuffer_1 = createCommonjsModule(function(module, exports) {
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer = moduleExports ? _root.Buffer : void 0;
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
  var isBuffer = nativeIsBuffer || stubFalse_1;
  module.exports = isBuffer;
});
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
var isLength_1 = isLength;
var argsTag$1 = "[object Arguments]";
var arrayTag$1 = "[object Array]";
var boolTag$1 = "[object Boolean]";
var dateTag$1 = "[object Date]";
var errorTag$1 = "[object Error]";
var funcTag = "[object Function]";
var mapTag$2 = "[object Map]";
var numberTag$1 = "[object Number]";
var objectTag$2 = "[object Object]";
var regexpTag$1 = "[object RegExp]";
var setTag$2 = "[object Set]";
var stringTag$1 = "[object String]";
var weakMapTag$1 = "[object WeakMap]";
var arrayBufferTag$1 = "[object ArrayBuffer]";
var dataViewTag$2 = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag] = typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$1] = typedArrayTags[setTag$2] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag$1] = false;
function baseIsTypedArray(value) {
  return isObjectLike_1(value) && isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}
var _baseIsTypedArray = baseIsTypedArray;
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var _baseUnary = baseUnary;
var _nodeUtil = createCommonjsModule(function(module, exports) {
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && _freeGlobal.process;
  var nodeUtil = function() {
    try {
      var types = freeModule && freeModule.require && freeModule.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e3) {
    }
  }();
  module.exports = nodeUtil;
});
var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;
var objectProto$7 = Object.prototype;
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;
var objectProto$6 = Object.prototype;
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var _overArg = overArg;
var nativeKeys = _overArg(Object.keys, Object);
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
var _listCacheClear = listCacheClear;
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_1 = eq;
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var _assocIndexOf = assocIndexOf;
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = _assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var _listCacheDelete = listCacheDelete;
function listCacheGet(key) {
  var data = this.__data__, index = _assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var _listCacheGet = listCacheGet;
function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}
var _listCacheHas = listCacheHas;
function listCacheSet(key, value) {
  var data = this.__data__, index = _assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var _listCacheSet = listCacheSet;
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype["delete"] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;
var _ListCache = ListCache;
function stackClear() {
  this.__data__ = new _ListCache();
  this.size = 0;
}
var _stackClear = stackClear;
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var _stackDelete = stackDelete;
function stackGet(key) {
  return this.__data__.get(key);
}
var _stackGet = stackGet;
function stackHas(key) {
  return this.__data__.has(key);
}
var _stackHas = stackHas;
var Map2 = _getNative(_root, "Map");
var _Map = Map2;
var nativeCreate = _getNative(Object, "create");
var _nativeCreate = nativeCreate;
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}
var _hashClear = hashClear;
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var _hashDelete = hashDelete;
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? void 0 : result;
  }
  return hasOwnProperty$3.call(data, key) ? data[key] : void 0;
}
var _hashGet = hashGet;
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? data[key] !== void 0 : hasOwnProperty$2.call(data, key);
}
var _hashHas = hashHas;
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = _nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
  return this;
}
var _hashSet = hashSet;
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = _hashClear;
Hash.prototype["delete"] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;
var _Hash = Hash;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new _Hash(),
    "map": new (_Map || _ListCache)(),
    "string": new _Hash()
  };
}
var _mapCacheClear = mapCacheClear;
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var _isKeyable = isKeyable;
function getMapData(map2, key) {
  var data = map2.__data__;
  return _isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var _getMapData = getMapData;
function mapCacheDelete(key) {
  var result = _getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var _mapCacheDelete = mapCacheDelete;
function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}
var _mapCacheGet = mapCacheGet;
function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}
var _mapCacheHas = mapCacheHas;
function mapCacheSet(key, value) {
  var data = _getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var _mapCacheSet = mapCacheSet;
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype["delete"] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;
var _MapCache = MapCache;
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache) {
    var pairs = data.__data__;
    if (!_Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var _stackSet = stackSet;
function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
}
Stack.prototype.clear = _stackClear;
Stack.prototype["delete"] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}
var _setCacheAdd = setCacheAdd;
function setCacheHas(value) {
  return this.__data__.has(value);
}
var _setCacheHas = setCacheHas;
function SetCache(values2) {
  var index = -1, length = values2 == null ? 0 : values2.length;
  this.__data__ = new _MapCache();
  while (++index < length) {
    this.add(values2[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;
var Uint8Array2 = _root.Uint8Array;
var symbolProto$1 = _Symbol ? _Symbol.prototype : void 0;
var symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : void 0;
var objectProto$2 = Object.prototype;
var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
var DataView = _getNative(_root, "DataView");
var _DataView = DataView;
var Promise$1 = _getNative(_root, "Promise");
var _Promise = Promise$1;
var Set2 = _getNative(_root, "Set");
var _Set = Set2;
var WeakMap2 = _getNative(_root, "WeakMap");
var _WeakMap = WeakMap2;
var mapTag = "[object Map]";
var objectTag$1 = "[object Object]";
var promiseTag = "[object Promise]";
var setTag = "[object Set]";
var weakMapTag = "[object WeakMap]";
var dataViewTag = "[object DataView]";
var dataViewCtorString = _toSource(_DataView);
var mapCtorString = _toSource(_Map);
var promiseCtorString = _toSource(_Promise);
var setCtorString = _toSource(_Set);
var weakMapCtorString = _toSource(_WeakMap);
var getTag = _baseGetTag;
if (_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag || _Map && getTag(new _Map()) != mapTag || _Promise && getTag(_Promise.resolve()) != promiseTag || _Set && getTag(new _Set()) != setTag || _WeakMap && getTag(new _WeakMap()) != weakMapTag) {
  getTag = function(value) {
    var result = _baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? _toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;
        case mapCtorString:
          return mapTag;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag;
        case weakMapCtorString:
          return weakMapTag;
      }
    }
    return result;
  };
}
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var FUNC_ERROR_TEXT = "Expected a function";
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || _MapCache)();
  return memoized;
}
memoize.Cache = _MapCache;
var memoize_1 = memoize;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize_1(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var _memoizeCapped = memoizeCapped;
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = _memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function(match2, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match2);
  });
  return result;
});
var INFINITY$1 = 1 / 0;
var symbolProto = _Symbol ? _Symbol.prototype : void 0;
var symbolToString = symbolProto ? symbolProto.toString : void 0;
var INFINITY = 1 / 0;

// ../../../node_modules/slate-history/dist/index.es.js
var History = {
  isHistory(value) {
    return isPlainObject(value) && Array.isArray(value.redos) && Array.isArray(value.undos) && (value.redos.length === 0 || Operation.isOperationList(value.redos[0].operations)) && (value.undos.length === 0 || Operation.isOperationList(value.undos[0].operations));
  }
};
var SAVING = /* @__PURE__ */ new WeakMap();
var MERGING = /* @__PURE__ */ new WeakMap();
var HistoryEditor = {
  isHistoryEditor(value) {
    return History.isHistory(value.history) && Editor.isEditor(value);
  },
  isMerging(editor) {
    return MERGING.get(editor);
  },
  isSaving(editor) {
    return SAVING.get(editor);
  },
  redo(editor) {
    editor.redo();
  },
  undo(editor) {
    editor.undo();
  },
  withoutMerging(editor, fn) {
    var prev = HistoryEditor.isMerging(editor);
    MERGING.set(editor, false);
    fn();
    MERGING.set(editor, prev);
  },
  withoutSaving(editor, fn) {
    var prev = HistoryEditor.isSaving(editor);
    SAVING.set(editor, false);
    fn();
    SAVING.set(editor, prev);
  }
};
var withHistory = (editor) => {
  var e3 = editor;
  var {
    apply: apply2
  } = e3;
  e3.history = {
    undos: [],
    redos: []
  };
  e3.redo = () => {
    var {
      history
    } = e3;
    var {
      redos
    } = history;
    if (redos.length > 0) {
      var batch = redos[redos.length - 1];
      if (batch.selectionBefore) {
        Transforms.setSelection(e3, batch.selectionBefore);
      }
      HistoryEditor.withoutSaving(e3, () => {
        Editor.withoutNormalizing(e3, () => {
          for (var op of batch.operations) {
            e3.apply(op);
          }
        });
      });
      history.redos.pop();
      history.undos.push(batch);
    }
  };
  e3.undo = () => {
    var {
      history
    } = e3;
    var {
      undos
    } = history;
    if (undos.length > 0) {
      var batch = undos[undos.length - 1];
      HistoryEditor.withoutSaving(e3, () => {
        Editor.withoutNormalizing(e3, () => {
          var inverseOps = batch.operations.map(Operation.inverse).reverse();
          for (var op of inverseOps) {
            e3.apply(op);
          }
          if (batch.selectionBefore) {
            Transforms.setSelection(e3, batch.selectionBefore);
          }
        });
      });
      history.redos.push(batch);
      history.undos.pop();
    }
  };
  e3.apply = (op) => {
    var {
      operations,
      history
    } = e3;
    var {
      undos
    } = history;
    var lastBatch = undos[undos.length - 1];
    var lastOp = lastBatch && lastBatch.operations[lastBatch.operations.length - 1];
    var save = HistoryEditor.isSaving(e3);
    var merge2 = HistoryEditor.isMerging(e3);
    if (save == null) {
      save = shouldSave(op);
    }
    if (save) {
      if (merge2 == null) {
        if (lastBatch == null) {
          merge2 = false;
        } else if (operations.length !== 0) {
          merge2 = true;
        } else {
          merge2 = shouldMerge(op, lastOp);
        }
      }
      if (lastBatch && merge2) {
        lastBatch.operations.push(op);
      } else {
        var batch = {
          operations: [op],
          selectionBefore: e3.selection
        };
        undos.push(batch);
      }
      while (undos.length > 100) {
        undos.shift();
      }
      history.redos = [];
    }
    apply2(op);
  };
  return e3;
};
var shouldMerge = (op, prev) => {
  if (prev && op.type === "insert_text" && prev.type === "insert_text" && op.offset === prev.offset + prev.text.length && Path.equals(op.path, prev.path)) {
    return true;
  }
  if (prev && op.type === "remove_text" && prev.type === "remove_text" && op.offset + op.text.length === prev.offset && Path.equals(op.path, prev.path)) {
    return true;
  }
  return false;
};
var shouldSave = (op, prev) => {
  if (op.type === "set_selection") {
    return false;
  }
  return true;
};

// ../../../node_modules/use-deep-compare/dist-web/index.js
var import_react6 = __toESM(require_react());

// ../../../node_modules/dequal/dist/dequal.mjs
function dequal(foo, bar) {
  var ctor, len;
  if (foo === bar)
    return true;
  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date)
      return foo.getTime() === bar.getTime();
    if (ctor === RegExp)
      return foo.toString() === bar.toString();
    if (ctor === Array && (len = foo.length) === bar.length) {
      while (len-- && dequal(foo[len], bar[len]))
        ;
      return len === -1;
    }
    if (ctor === Object) {
      if (Object.keys(foo).length !== Object.keys(bar).length)
        return false;
      for (len in foo)
        if (!(len in bar) || !dequal(foo[len], bar[len]))
          return false;
      return true;
    }
  }
  return foo !== foo && bar !== bar;
}

// ../../../node_modules/use-deep-compare/dist-web/index.js
function checkDeps(deps, name) {
  const reactHookName = `React.${name.replace(/DeepCompare/, "")}`;
  if (!deps || deps.length === 0) {
    throw new Error(`${name} should not be used with no dependencies. Use ${reactHookName} instead.`);
  }
}
function useDeepCompareMemoize(value) {
  const ref = import_react6.default.useRef([]);
  if (!dequal(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}
function useDeepCompareMemo(factory, dependencies) {
  if (true) {
    checkDeps(dependencies, "useDeepCompareMemo");
  }
  return import_react6.default.useMemo(factory, useDeepCompareMemoize(dependencies));
}

// ../../../node_modules/@udecode/plate-core/dist/index.es.js
init_clsx_m();

// ../../../node_modules/@radix-ui/react-slot/dist/index.module.js
var import_react8 = __toESM(require_react());

// ../../../node_modules/@radix-ui/react-compose-refs/dist/index.module.js
var import_react7 = __toESM(require_react());
function $6ed0406888f73fc4$var$setRef(ref, value) {
  if (typeof ref === "function")
    ref(value);
  else if (ref !== null && ref !== void 0)
    ref.current = value;
}
function $6ed0406888f73fc4$export$43e446d32b3d21af(...refs) {
  return (node) => refs.forEach(
    (ref) => $6ed0406888f73fc4$var$setRef(ref, node)
  );
}

// ../../../node_modules/@radix-ui/react-slot/dist/index.module.js
var $5e63c961fc1ce211$export$8c6ed5c666ac1360 = (0, import_react8.forwardRef)((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = import_react8.Children.toArray(children);
  const slottable = childrenArray.find($5e63c961fc1ce211$var$isSlottable);
  if (slottable) {
    const newElement = slottable.props.children;
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (import_react8.Children.count(newElement) > 1)
          return import_react8.Children.only(null);
        return (0, import_react8.isValidElement)(newElement) ? newElement.props.children : null;
      } else
        return child;
    });
    return (0, import_react8.createElement)($5e63c961fc1ce211$var$SlotClone, _extends({}, slotProps, {
      ref: forwardedRef
    }), (0, import_react8.isValidElement)(newElement) ? (0, import_react8.cloneElement)(newElement, void 0, newChildren) : null);
  }
  return (0, import_react8.createElement)($5e63c961fc1ce211$var$SlotClone, _extends({}, slotProps, {
    ref: forwardedRef
  }), children);
});
$5e63c961fc1ce211$export$8c6ed5c666ac1360.displayName = "Slot";
var $5e63c961fc1ce211$var$SlotClone = (0, import_react8.forwardRef)((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  if ((0, import_react8.isValidElement)(children))
    return (0, import_react8.cloneElement)(children, {
      ...$5e63c961fc1ce211$var$mergeProps(slotProps, children.props),
      ref: $6ed0406888f73fc4$export$43e446d32b3d21af(forwardedRef, children.ref)
    });
  return import_react8.Children.count(children) > 1 ? import_react8.Children.only(null) : null;
});
$5e63c961fc1ce211$var$SlotClone.displayName = "SlotClone";
var $5e63c961fc1ce211$export$d9f1ccf0bdb05d45 = ({ children }) => {
  return (0, import_react8.createElement)(import_react8.Fragment, null, children);
};
function $5e63c961fc1ce211$var$isSlottable(child) {
  return (0, import_react8.isValidElement)(child) && child.type === $5e63c961fc1ce211$export$d9f1ccf0bdb05d45;
}
function $5e63c961fc1ce211$var$mergeProps(slotProps, childProps) {
  const overrideProps = {
    ...childProps
  };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue)
        overrideProps[propName] = (...args) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      else if (slotPropValue)
        overrideProps[propName] = slotPropValue;
    } else if (propName === "style")
      overrideProps[propName] = {
        ...slotPropValue,
        ...childPropValue
      };
    else if (propName === "className")
      overrideProps[propName] = [
        slotPropValue,
        childPropValue
      ].filter(Boolean).join(" ");
  }
  return {
    ...slotProps,
    ...overrideProps
  };
}

// ../../../node_modules/@udecode/plate-core/dist/index.es.js
var capitalizeFirstLetter = (str = "") => str.length ? str[0].toUpperCase() + str.slice(1) : "";
var getStoreIndex = (name = "") => name.length ? `${name}Store` : "store";
var getUseStoreIndex = (name = "") => `use${capitalizeFirstLetter(name)}Store`;
var createAtomStore = (initialState, {
  scope: storeScope,
  initialStore,
  name = ""
} = {}) => {
  const useInitialStoreIndex = getUseStoreIndex(initialStore === null || initialStore === void 0 ? void 0 : initialStore.name);
  const initialStoreIndex = getStoreIndex(initialStore === null || initialStore === void 0 ? void 0 : initialStore.name);
  const useStoreIndex = getUseStoreIndex(name);
  const storeIndex = getStoreIndex(name);
  const getAtoms = initialStore ? initialStore[useInitialStoreIndex]().get : {};
  const setAtoms = initialStore ? initialStore[useInitialStoreIndex]().set : {};
  const useAtoms = initialStore ? initialStore[useInitialStoreIndex]().use : {};
  const atoms = initialStore ? initialStore[initialStoreIndex].atom : {};
  Object.keys(initialState).forEach((key) => {
    const atomConfig = atom2(initialState[key]);
    atoms[key] = atomConfig;
    getAtoms[key] = (scope) => {
      return useAtomValue(atomConfig, scope !== null && scope !== void 0 ? scope : storeScope);
    };
    setAtoms[key] = (scope) => {
      return useSetAtom(atomConfig, scope !== null && scope !== void 0 ? scope : storeScope);
    };
    useAtoms[key] = (scope) => {
      return useAtom(atomConfig, scope !== null && scope !== void 0 ? scope : storeScope);
    };
  });
  const api = {
    [useStoreIndex]: (scope) => {
      if (scope) {
        const getAtomsHook = {
          ...getAtoms
        };
        const setAtomsHook = {
          ...setAtoms
        };
        const useAtomsHook = {
          ...useAtoms
        };
        Object.keys(getAtomsHook).forEach((key) => {
          const get2 = getAtomsHook[key];
          getAtomsHook[key] = (_scope) => {
            var _ref;
            return get2((_ref = _scope !== null && _scope !== void 0 ? _scope : scope) !== null && _ref !== void 0 ? _ref : storeScope);
          };
        });
        Object.keys(setAtomsHook).forEach((key) => {
          const set = setAtomsHook[key];
          setAtomsHook[key] = (_scope) => {
            var _ref2;
            return set((_ref2 = _scope !== null && _scope !== void 0 ? _scope : scope) !== null && _ref2 !== void 0 ? _ref2 : storeScope);
          };
        });
        Object.keys(useAtomsHook).forEach((key) => {
          const use = useAtomsHook[key];
          useAtomsHook[key] = (_scope) => {
            var _ref3;
            return use((_ref3 = _scope !== null && _scope !== void 0 ? _scope : scope) !== null && _ref3 !== void 0 ? _ref3 : storeScope);
          };
        });
        return {
          get: getAtomsHook,
          set: setAtomsHook,
          use: useAtomsHook
        };
      }
      return {
        get: getAtoms,
        set: setAtoms,
        use: useAtoms
      };
    },
    [storeIndex]: {
      atom: atoms
    },
    name
  };
  return {
    ...api,
    [storeIndex]: {
      ...api[storeIndex],
      scope: storeScope,
      extend: (extendedState, options) => createAtomStore(extendedState, {
        scope: storeScope,
        initialStore: api,
        ...options
      })
    }
  };
};
function _extends3() {
  _extends3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i3 = 1; i3 < arguments.length; i3++) {
      var source = arguments[i3];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends3.apply(this, arguments);
}
var getJotaiProviderInitialValues = (store, props) => {
  const initialValues = [];
  Object.keys(props).forEach((key) => {
    if (key in store.atom) {
      initialValues.push([store.atom[key], props[key]]);
    }
  });
  return initialValues;
};
var DOM_HANDLERS = [
  "onCopy",
  "onCopyCapture",
  "onCut",
  "onCutCapture",
  "onPaste",
  "onPasteCapture",
  "onCompositionEnd",
  "onCompositionEndCapture",
  "onCompositionStart",
  "onCompositionStartCapture",
  "onCompositionUpdate",
  "onCompositionUpdateCapture",
  "onFocus",
  "onFocusCapture",
  "onBlur",
  "onBlurCapture",
  "onDOMBeforeInput",
  "onBeforeInput",
  "onBeforeInputCapture",
  "onInput",
  "onInputCapture",
  "onReset",
  "onResetCapture",
  "onSubmit",
  "onSubmitCapture",
  "onInvalid",
  "onInvalidCapture",
  "onLoad",
  "onLoadCapture",
  "onKeyDown",
  "onKeyDownCapture",
  "onKeyPress",
  "onKeyPressCapture",
  "onKeyUp",
  "onKeyUpCapture",
  "onAbort",
  "onAbortCapture",
  "onCanPlay",
  "onCanPlayCapture",
  "onCanPlayThrough",
  "onCanPlayThroughCapture",
  "onDurationChange",
  "onDurationChangeCapture",
  "onEmptied",
  "onEmptiedCapture",
  "onEncrypted",
  "onEncryptedCapture",
  "onEnded",
  "onEndedCapture",
  "onLoadedData",
  "onLoadedDataCapture",
  "onLoadedMetadata",
  "onLoadedMetadataCapture",
  "onLoadStart",
  "onLoadStartCapture",
  "onPause",
  "onPauseCapture",
  "onPlay",
  "onPlayCapture",
  "onPlaying",
  "onPlayingCapture",
  "onProgress",
  "onProgressCapture",
  "onRateChange",
  "onRateChangeCapture",
  "onSeeked",
  "onSeekedCapture",
  "onSeeking",
  "onSeekingCapture",
  "onStalled",
  "onStalledCapture",
  "onSuspend",
  "onSuspendCapture",
  "onTimeUpdate",
  "onTimeUpdateCapture",
  "onVolumeChange",
  "onVolumeChangeCapture",
  "onWaiting",
  "onWaitingCapture",
  "onAuxClick",
  "onAuxClickCapture",
  "onClick",
  "onClickCapture",
  "onContextMenu",
  "onContextMenuCapture",
  "onDoubleClick",
  "onDoubleClickCapture",
  "onDrag",
  "onDragCapture",
  "onDragEnd",
  "onDragEndCapture",
  "onDragEnter",
  "onDragEnterCapture",
  "onDragExit",
  "onDragExitCapture",
  "onDragLeave",
  "onDragLeaveCapture",
  "onDragOver",
  "onDragOverCapture",
  "onDragStart",
  "onDragStartCapture",
  "onDrop",
  "onDropCapture",
  "onMouseDown",
  "onMouseDownCapture",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseMoveCapture",
  "onMouseOut",
  "onMouseOutCapture",
  "onMouseOver",
  "onMouseOverCapture",
  "onMouseUp",
  "onMouseUpCapture",
  "onSelect",
  "onSelectCapture",
  "onTouchCancel",
  "onTouchCancelCapture",
  "onTouchEnd",
  "onTouchEndCapture",
  "onTouchMove",
  "onTouchMoveCapture",
  "onTouchStart",
  "onTouchStartCapture",
  "onPointerDown",
  "onPointerDownCapture",
  "onPointerMove",
  "onPointerMoveCapture",
  "onPointerUp",
  "onPointerUpCapture",
  "onPointerCancel",
  "onPointerCancelCapture",
  "onPointerEnter",
  "onPointerEnterCapture",
  "onPointerLeave",
  "onPointerLeaveCapture",
  "onPointerOver",
  "onPointerOverCapture",
  "onPointerOut",
  "onPointerOutCapture",
  "onGotPointerCapture",
  "onGotPointerCaptureCapture",
  "onLostPointerCapture",
  "onLostPointerCaptureCapture",
  "onScroll",
  "onScrollCapture",
  "onWheel",
  "onWheelCapture",
  "onAnimationStart",
  "onAnimationStartCapture",
  "onAnimationEnd",
  "onAnimationEndCapture",
  "onAnimationIteration",
  "onAnimationIterationCapture",
  "onTransitionEnd",
  "onTransitionEndCapture"
];
var IS_APPLE = typeof navigator !== "undefined" && /Mac OS X/.test(navigator.userAgent);
var escapeRegExp = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, "\\$&");
};
var findHtmlParentElement = (el, nodeName) => {
  if (!el || el.nodeName === nodeName) {
    return el;
  }
  return findHtmlParentElement(el.parentElement, nodeName);
};
var getHandler = (cb, ...args) => () => {
  cb === null || cb === void 0 ? void 0 : cb(...args);
};
var getSlateClass = (type) => `slate-${type}`;
var hexToBase64 = (hex) => {
  const hexPairs = hex.match(/\w{2}/g) || [];
  const binary = hexPairs.map((hexPair) => String.fromCharCode(parseInt(hexPair, 16)));
  return btoa(binary.join(""));
};
var commonjsGlobal2 = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function unwrapExports(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function createCommonjsModule2(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var lib = createCommonjsModule2(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var IS_MAC = () => typeof window != "undefined" && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
  var MODIFIERS = {
    alt: "altKey",
    control: "ctrlKey",
    meta: "metaKey",
    shift: "shiftKey"
  };
  var ALIASES = () => ({
    add: "+",
    break: "pause",
    cmd: "meta",
    command: "meta",
    ctl: "control",
    ctrl: "control",
    del: "delete",
    down: "arrowdown",
    esc: "escape",
    ins: "insert",
    left: "arrowleft",
    mod: IS_MAC() ? "meta" : "control",
    opt: "alt",
    option: "alt",
    return: "enter",
    right: "arrowright",
    space: " ",
    spacebar: " ",
    up: "arrowup",
    win: "meta",
    windows: "meta"
  });
  var CODES = {
    backspace: 8,
    tab: 9,
    enter: 13,
    shift: 16,
    control: 17,
    alt: 18,
    pause: 19,
    capslock: 20,
    escape: 27,
    " ": 32,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36,
    arrowleft: 37,
    arrowup: 38,
    arrowright: 39,
    arrowdown: 40,
    insert: 45,
    delete: 46,
    meta: 91,
    numlock: 144,
    scrolllock: 145,
    ";": 186,
    "=": 187,
    ",": 188,
    "-": 189,
    ".": 190,
    "/": 191,
    "`": 192,
    "[": 219,
    "\\": 220,
    "]": 221,
    "'": 222
  };
  for (var f3 = 1; f3 < 20; f3++) {
    CODES["f" + f3] = 111 + f3;
  }
  function isHotkey2(hotkey, options, event) {
    if (options && !("byKey" in options)) {
      event = options;
      options = null;
    }
    if (!Array.isArray(hotkey)) {
      hotkey = [hotkey];
    }
    var array = hotkey.map(function(string) {
      return parseHotkey2(string, options);
    });
    var check = function check2(e3) {
      return array.some(function(object) {
        return compareHotkey(object, e3);
      });
    };
    var ret = event == null ? check : check(event);
    return ret;
  }
  function isCodeHotkey(hotkey, event) {
    return isHotkey2(hotkey, event);
  }
  function isKeyHotkey(hotkey, event) {
    return isHotkey2(hotkey, { byKey: true }, event);
  }
  function parseHotkey2(hotkey, options) {
    var byKey = options && options.byKey;
    var ret = {};
    hotkey = hotkey.replace("++", "+add");
    var values2 = hotkey.split("+");
    var length = values2.length;
    for (var k in MODIFIERS) {
      ret[MODIFIERS[k]] = false;
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = void 0;
    try {
      for (var _iterator = values2[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;
        var optional = value.endsWith("?") && value.length > 1;
        if (optional) {
          value = value.slice(0, -1);
        }
        var name = toKeyName(value);
        var modifier = MODIFIERS[name];
        if (length === 1 || !modifier) {
          if (byKey) {
            ret.key = name;
          } else {
            ret.which = toKeyCode(value);
          }
        }
        if (modifier) {
          ret[modifier] = optional ? null : true;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
    return ret;
  }
  function compareHotkey(object, event) {
    for (var key in object) {
      var expected = object[key];
      var actual = void 0;
      if (expected == null) {
        continue;
      }
      if (key === "key" && event.key != null) {
        actual = event.key.toLowerCase();
      } else if (key === "which") {
        actual = expected === 91 && event.which === 93 ? 91 : event.which;
      } else {
        actual = event[key];
      }
      if (actual == null && expected === false) {
        continue;
      }
      if (actual !== expected) {
        return false;
      }
    }
    return true;
  }
  function toKeyCode(name) {
    name = toKeyName(name);
    var code = CODES[name] || name.toUpperCase().charCodeAt(0);
    return code;
  }
  function toKeyName(name) {
    name = name.toLowerCase();
    name = ALIASES()[name] || name;
    return name;
  }
  exports.default = isHotkey2;
  exports.isHotkey = isHotkey2;
  exports.isCodeHotkey = isCodeHotkey;
  exports.isKeyHotkey = isKeyHotkey;
  exports.parseHotkey = parseHotkey2;
  exports.compareHotkey = compareHotkey;
  exports.toKeyCode = toKeyCode;
  exports.toKeyName = toKeyName;
});
var isHotkey = unwrapExports(lib);
lib.isHotkey;
lib.isCodeHotkey;
var lib_3 = lib.isKeyHotkey;
lib.parseHotkey;
lib.compareHotkey;
lib.toKeyCode;
lib.toKeyName;
var isComposing = (editor) => ReactEditor.isComposing(editor);
var HOTKEYS = {
  bold: "mod+b",
  compose: ["down", "left", "right", "up", "backspace", "enter"],
  deleteBackward: "shift?+backspace",
  deleteForward: "shift?+delete",
  extendBackward: "shift+left",
  extendForward: "shift+right",
  insertSoftBreak: "shift+enter",
  italic: "mod+i",
  moveBackward: "left",
  moveForward: "right",
  moveWordBackward: "ctrl+left",
  moveWordForward: "ctrl+right",
  splitBlock: "enter",
  tab: "tab",
  untab: "shift+tab",
  undo: "mod+z"
};
var APPLE_HOTKEYS = {
  deleteBackward: ["ctrl+backspace", "ctrl+h"],
  deleteForward: ["ctrl+delete", "ctrl+d"],
  deleteLineBackward: "cmd+shift?+backspace",
  deleteLineForward: ["cmd+shift?+delete", "ctrl+k"],
  deleteWordBackward: "opt+shift?+backspace",
  deleteWordForward: "opt+shift?+delete",
  extendLineBackward: "opt+shift+up",
  extendLineForward: "opt+shift+down",
  moveLineBackward: "opt+up",
  moveLineForward: "opt+down",
  moveWordBackward: "opt+left",
  moveWordForward: "opt+right",
  redo: "cmd+shift+z",
  transposeCharacter: "ctrl+t"
};
var WINDOWS_HOTKEYS = {
  deleteWordBackward: "ctrl+shift?+backspace",
  deleteWordForward: "ctrl+shift?+delete",
  redo: ["ctrl+y", "ctrl+shift+z"]
};
var create2 = (key) => {
  const generic = HOTKEYS[key];
  const apple = APPLE_HOTKEYS[key];
  const windows = WINDOWS_HOTKEYS[key];
  const isGeneric = generic && lib_3(generic);
  const isApple = apple && lib_3(apple);
  const isWindows = windows && lib_3(windows);
  return (event) => {
    if (isGeneric && isGeneric(event))
      return true;
    if (IS_APPLE && isApple && isApple(event))
      return true;
    if (!IS_APPLE && isWindows && isWindows(event))
      return true;
    return false;
  };
};
var createComposing = (key) => (editor, event, {
  composing
} = {}) => {
  if (!create2(key)(event))
    return false;
  if (!!composing !== isComposing(editor))
    return false;
  return true;
};
var Hotkeys = {
  isBold: create2("bold"),
  isCompose: create2("compose"),
  isMoveBackward: create2("moveBackward"),
  isMoveForward: create2("moveForward"),
  isDeleteBackward: create2("deleteBackward"),
  isDeleteForward: create2("deleteForward"),
  isDeleteLineBackward: create2("deleteLineBackward"),
  isDeleteLineForward: create2("deleteLineForward"),
  isDeleteWordBackward: create2("deleteWordBackward"),
  isDeleteWordForward: create2("deleteWordForward"),
  isExtendBackward: create2("extendBackward"),
  isExtendForward: create2("extendForward"),
  isExtendLineBackward: create2("extendLineBackward"),
  isExtendLineForward: create2("extendLineForward"),
  isItalic: create2("italic"),
  isMoveLineBackward: create2("moveLineBackward"),
  isMoveLineForward: create2("moveLineForward"),
  isMoveWordBackward: create2("moveWordBackward"),
  isMoveWordForward: create2("moveWordForward"),
  isRedo: create2("redo"),
  isSoftBreak: create2("insertSoftBreak"),
  isSplitBlock: create2("splitBlock"),
  isTab: createComposing("tab"),
  isTransposeCharacter: create2("transposeCharacter"),
  isUndo: create2("undo"),
  isUntab: createComposing("untab")
};
var protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
var localhostDomainRE = /^localhost[:?\d]*(?:[^:?\d]\S*)?$/;
var nonLocalhostDomainRE = /^[^\s.]+\.\S{2,}$/;
var isUrl = (string) => {
  if (typeof string !== "string") {
    return false;
  }
  const match2 = string.match(protocolAndDomainRE);
  if (!match2) {
    return false;
  }
  const everythingAfterProtocol = match2[1];
  if (!everythingAfterProtocol) {
    return false;
  }
  try {
    new URL(string);
  } catch (err) {
    return false;
  }
  return localhostDomainRE.test(everythingAfterProtocol) || nonLocalhostDomainRE.test(everythingAfterProtocol);
};
var JotaiProvider = Provider;
var mergeProps = (props, overrideProps, {
  handlerKeys,
  handlerQuery = (key) => key.indexOf("on") === 0
} = {}) => {
  const map2 = /* @__PURE__ */ new Map();
  const acc = {};
  const mapProps = (_props) => {
    if (!_props)
      return;
    Object.entries(_props).forEach(([key, value]) => {
      if ((!handlerKeys || handlerKeys.includes(key)) && (!handlerQuery || handlerQuery(key)) && typeof value === "function") {
        var _map$get;
        if (!map2.has(key)) {
          map2.set(key, []);
        }
        (_map$get = map2.get(key)) === null || _map$get === void 0 ? void 0 : _map$get.push(value);
        acc[key] = (...args) => {
          var _map$get2;
          (_map$get2 = map2.get(key)) === null || _map$get2 === void 0 ? void 0 : _map$get2.forEach((fn) => fn(...args));
        };
      } else {
        acc[key] = value;
      }
    });
  };
  mapProps(props);
  mapProps(overrideProps);
  return acc;
};
var isUndefined = (obj) => typeof obj === "undefined";
var isNull = (obj) => obj === null;
var isUndefinedOrNull = (obj) => isUndefined(obj) || isNull(obj);
var isDefined = (arg) => !isUndefinedOrNull(arg);
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var _apply = apply;
function identity(value) {
  return value;
}
var identity_1 = identity;
var nativeMax = Math.max;
function overRest(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return _apply(func, this, otherArgs);
  };
}
var _overRest = overRest;
function constant(value) {
  return function() {
    return value;
  };
}
var constant_1 = constant;
var freeGlobal2 = typeof commonjsGlobal2 == "object" && commonjsGlobal2 && commonjsGlobal2.Object === Object && commonjsGlobal2;
var _freeGlobal2 = freeGlobal2;
var freeSelf2 = typeof self == "object" && self && self.Object === Object && self;
var root2 = _freeGlobal2 || freeSelf2 || Function("return this")();
var _root2 = root2;
var Symbol$1 = _root2.Symbol;
var _Symbol2 = Symbol$1;
var objectProto$g = Object.prototype;
var hasOwnProperty$d = objectProto$g.hasOwnProperty;
var nativeObjectToString$12 = objectProto$g.toString;
var symToStringTag$12 = _Symbol2 ? _Symbol2.toStringTag : void 0;
function getRawTag2(value) {
  var isOwn = hasOwnProperty$d.call(value, symToStringTag$12), tag = value[symToStringTag$12];
  try {
    value[symToStringTag$12] = void 0;
    var unmasked = true;
  } catch (e3) {
  }
  var result = nativeObjectToString$12.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$12] = tag;
    } else {
      delete value[symToStringTag$12];
    }
  }
  return result;
}
var _getRawTag2 = getRawTag2;
var objectProto$f = Object.prototype;
var nativeObjectToString2 = objectProto$f.toString;
function objectToString2(value) {
  return nativeObjectToString2.call(value);
}
var _objectToString2 = objectToString2;
var nullTag2 = "[object Null]";
var undefinedTag2 = "[object Undefined]";
var symToStringTag2 = _Symbol2 ? _Symbol2.toStringTag : void 0;
function baseGetTag2(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag2 : nullTag2;
  }
  return symToStringTag2 && symToStringTag2 in Object(value) ? _getRawTag2(value) : _objectToString2(value);
}
var _baseGetTag2 = baseGetTag2;
function isObject$1(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_12 = isObject$1;
var asyncTag2 = "[object AsyncFunction]";
var funcTag$2 = "[object Function]";
var genTag$1 = "[object GeneratorFunction]";
var proxyTag2 = "[object Proxy]";
function isFunction2(value) {
  if (!isObject_12(value)) {
    return false;
  }
  var tag = _baseGetTag2(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag2 || tag == proxyTag2;
}
var isFunction_12 = isFunction2;
var coreJsData2 = _root2["__core-js_shared__"];
var _coreJsData2 = coreJsData2;
var maskSrcKey2 = function() {
  var uid = /[^.]+$/.exec(_coreJsData2 && _coreJsData2.keys && _coreJsData2.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked2(func) {
  return !!maskSrcKey2 && maskSrcKey2 in func;
}
var _isMasked2 = isMasked2;
var funcProto$2 = Function.prototype;
var funcToString$2 = funcProto$2.toString;
function toSource2(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e3) {
    }
    try {
      return func + "";
    } catch (e3) {
    }
  }
  return "";
}
var _toSource2 = toSource2;
var reRegExpChar2 = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor2 = /^\[object .+?Constructor\]$/;
var funcProto$12 = Function.prototype;
var objectProto$e = Object.prototype;
var funcToString$12 = funcProto$12.toString;
var hasOwnProperty$c = objectProto$e.hasOwnProperty;
var reIsNative2 = RegExp(
  "^" + funcToString$12.call(hasOwnProperty$c).replace(reRegExpChar2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative2(value) {
  if (!isObject_12(value) || _isMasked2(value)) {
    return false;
  }
  var pattern = isFunction_12(value) ? reIsNative2 : reIsHostCtor2;
  return pattern.test(_toSource2(value));
}
var _baseIsNative2 = baseIsNative2;
function getValue2(object, key) {
  return object == null ? void 0 : object[key];
}
var _getValue2 = getValue2;
function getNative2(object, key) {
  var value = _getValue2(object, key);
  return _baseIsNative2(value) ? value : void 0;
}
var _getNative2 = getNative2;
var defineProperty2 = function() {
  try {
    var func = _getNative2(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e3) {
  }
}();
var _defineProperty$1 = defineProperty2;
var baseSetToString = !_defineProperty$1 ? identity_1 : function(func, string) {
  return _defineProperty$1(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant_1(string),
    "writable": true
  });
};
var _baseSetToString = baseSetToString;
var HOT_COUNT = 800;
var HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
var _shortOut = shortOut;
var setToString = _shortOut(_baseSetToString);
var _setToString = setToString;
function baseRest(func, start) {
  return _setToString(_overRest(func, start, identity_1), func + "");
}
var _baseRest = baseRest;
function listCacheClear2() {
  this.__data__ = [];
  this.size = 0;
}
var _listCacheClear2 = listCacheClear2;
function eq2(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_12 = eq2;
function assocIndexOf2(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_12(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var _assocIndexOf2 = assocIndexOf2;
var arrayProto2 = Array.prototype;
var splice2 = arrayProto2.splice;
function listCacheDelete2(key) {
  var data = this.__data__, index = _assocIndexOf2(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice2.call(data, index, 1);
  }
  --this.size;
  return true;
}
var _listCacheDelete2 = listCacheDelete2;
function listCacheGet2(key) {
  var data = this.__data__, index = _assocIndexOf2(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var _listCacheGet2 = listCacheGet2;
function listCacheHas2(key) {
  return _assocIndexOf2(this.__data__, key) > -1;
}
var _listCacheHas2 = listCacheHas2;
function listCacheSet2(key, value) {
  var data = this.__data__, index = _assocIndexOf2(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var _listCacheSet2 = listCacheSet2;
function ListCache2(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache2.prototype.clear = _listCacheClear2;
ListCache2.prototype["delete"] = _listCacheDelete2;
ListCache2.prototype.get = _listCacheGet2;
ListCache2.prototype.has = _listCacheHas2;
ListCache2.prototype.set = _listCacheSet2;
var _ListCache2 = ListCache2;
function stackClear2() {
  this.__data__ = new _ListCache2();
  this.size = 0;
}
var _stackClear2 = stackClear2;
function stackDelete2(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var _stackDelete2 = stackDelete2;
function stackGet2(key) {
  return this.__data__.get(key);
}
var _stackGet2 = stackGet2;
function stackHas2(key) {
  return this.__data__.has(key);
}
var _stackHas2 = stackHas2;
var Map$1 = _getNative2(_root2, "Map");
var _Map2 = Map$1;
var nativeCreate2 = _getNative2(Object, "create");
var _nativeCreate2 = nativeCreate2;
function hashClear2() {
  this.__data__ = _nativeCreate2 ? _nativeCreate2(null) : {};
  this.size = 0;
}
var _hashClear2 = hashClear2;
function hashDelete2(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var _hashDelete2 = hashDelete2;
var HASH_UNDEFINED$22 = "__lodash_hash_undefined__";
var objectProto$d = Object.prototype;
var hasOwnProperty$b = objectProto$d.hasOwnProperty;
function hashGet2(key) {
  var data = this.__data__;
  if (_nativeCreate2) {
    var result = data[key];
    return result === HASH_UNDEFINED$22 ? void 0 : result;
  }
  return hasOwnProperty$b.call(data, key) ? data[key] : void 0;
}
var _hashGet2 = hashGet2;
var objectProto$c = Object.prototype;
var hasOwnProperty$a = objectProto$c.hasOwnProperty;
function hashHas2(key) {
  var data = this.__data__;
  return _nativeCreate2 ? data[key] !== void 0 : hasOwnProperty$a.call(data, key);
}
var _hashHas2 = hashHas2;
var HASH_UNDEFINED$12 = "__lodash_hash_undefined__";
function hashSet2(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = _nativeCreate2 && value === void 0 ? HASH_UNDEFINED$12 : value;
  return this;
}
var _hashSet2 = hashSet2;
function Hash2(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash2.prototype.clear = _hashClear2;
Hash2.prototype["delete"] = _hashDelete2;
Hash2.prototype.get = _hashGet2;
Hash2.prototype.has = _hashHas2;
Hash2.prototype.set = _hashSet2;
var _Hash2 = Hash2;
function mapCacheClear2() {
  this.size = 0;
  this.__data__ = {
    "hash": new _Hash2(),
    "map": new (_Map2 || _ListCache2)(),
    "string": new _Hash2()
  };
}
var _mapCacheClear2 = mapCacheClear2;
function isKeyable2(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var _isKeyable2 = isKeyable2;
function getMapData2(map2, key) {
  var data = map2.__data__;
  return _isKeyable2(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var _getMapData2 = getMapData2;
function mapCacheDelete2(key) {
  var result = _getMapData2(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var _mapCacheDelete2 = mapCacheDelete2;
function mapCacheGet2(key) {
  return _getMapData2(this, key).get(key);
}
var _mapCacheGet2 = mapCacheGet2;
function mapCacheHas2(key) {
  return _getMapData2(this, key).has(key);
}
var _mapCacheHas2 = mapCacheHas2;
function mapCacheSet2(key, value) {
  var data = _getMapData2(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var _mapCacheSet2 = mapCacheSet2;
function MapCache2(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache2.prototype.clear = _mapCacheClear2;
MapCache2.prototype["delete"] = _mapCacheDelete2;
MapCache2.prototype.get = _mapCacheGet2;
MapCache2.prototype.has = _mapCacheHas2;
MapCache2.prototype.set = _mapCacheSet2;
var _MapCache2 = MapCache2;
var LARGE_ARRAY_SIZE2 = 200;
function stackSet2(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache2) {
    var pairs = data.__data__;
    if (!_Map2 || pairs.length < LARGE_ARRAY_SIZE2 - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache2(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var _stackSet2 = stackSet2;
function Stack2(entries) {
  var data = this.__data__ = new _ListCache2(entries);
  this.size = data.size;
}
Stack2.prototype.clear = _stackClear2;
Stack2.prototype["delete"] = _stackDelete2;
Stack2.prototype.get = _stackGet2;
Stack2.prototype.has = _stackHas2;
Stack2.prototype.set = _stackSet2;
var _Stack = Stack2;
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && _defineProperty$1) {
    _defineProperty$1(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var _baseAssignValue = baseAssignValue;
function assignMergeValue(object, key, value) {
  if (value !== void 0 && !eq_12(object[key], value) || value === void 0 && !(key in object)) {
    _baseAssignValue(object, key, value);
  }
}
var _assignMergeValue = assignMergeValue;
function createBaseFor2(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var _createBaseFor2 = createBaseFor2;
var baseFor2 = _createBaseFor2();
var _baseFor = baseFor2;
var _cloneBuffer = createCommonjsModule2(function(module, exports) {
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer = moduleExports ? _root2.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  module.exports = cloneBuffer;
});
var Uint8Array3 = _root2.Uint8Array;
var _Uint8Array = Uint8Array3;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
  return result;
}
var _cloneArrayBuffer = cloneArrayBuffer;
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var _cloneTypedArray = cloneTypedArray;
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var _copyArray = copyArray;
var objectCreate = Object.create;
var baseCreate = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject_12(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
var _baseCreate = baseCreate;
function overArg2(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var _overArg2 = overArg2;
var getPrototype = _overArg2(Object.getPrototypeOf, Object);
var _getPrototype = getPrototype;
var objectProto$b2 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$b2;
  return value === proto;
}
var _isPrototype = isPrototype;
function initCloneObject(object) {
  return typeof object.constructor == "function" && !_isPrototype(object) ? _baseCreate(_getPrototype(object)) : {};
}
var _initCloneObject = initCloneObject;
function isObjectLike2(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_12 = isObjectLike2;
var argsTag$3 = "[object Arguments]";
function baseIsArguments2(value) {
  return isObjectLike_12(value) && _baseGetTag2(value) == argsTag$3;
}
var _baseIsArguments2 = baseIsArguments2;
var objectProto$a2 = Object.prototype;
var hasOwnProperty$9 = objectProto$a2.hasOwnProperty;
var propertyIsEnumerable$12 = objectProto$a2.propertyIsEnumerable;
var isArguments2 = _baseIsArguments2(function() {
  return arguments;
}()) ? _baseIsArguments2 : function(value) {
  return isObjectLike_12(value) && hasOwnProperty$9.call(value, "callee") && !propertyIsEnumerable$12.call(value, "callee");
};
var isArguments_1 = isArguments2;
var isArray2 = Array.isArray;
var isArray_1 = isArray2;
var MAX_SAFE_INTEGER$1 = 9007199254740991;
function isLength2(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}
var isLength_12 = isLength2;
function isArrayLike(value) {
  return value != null && isLength_12(value.length) && !isFunction_12(value);
}
var isArrayLike_1 = isArrayLike;
function isArrayLikeObject(value) {
  return isObjectLike_12(value) && isArrayLike_1(value);
}
var isArrayLikeObject_1 = isArrayLikeObject;
function stubFalse2() {
  return false;
}
var stubFalse_12 = stubFalse2;
var isBuffer_12 = createCommonjsModule2(function(module, exports) {
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer = moduleExports ? _root2.Buffer : void 0;
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
  var isBuffer = nativeIsBuffer || stubFalse_12;
  module.exports = isBuffer;
});
var objectTag$4 = "[object Object]";
var funcProto2 = Function.prototype;
var objectProto$92 = Object.prototype;
var funcToString2 = funcProto2.toString;
var hasOwnProperty$82 = objectProto$92.hasOwnProperty;
var objectCtorString = funcToString2.call(Object);
function isPlainObject$1(value) {
  if (!isObjectLike_12(value) || _baseGetTag2(value) != objectTag$4) {
    return false;
  }
  var proto = _getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$82.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString2.call(Ctor) == objectCtorString;
}
var isPlainObject_1 = isPlainObject$1;
var argsTag$22 = "[object Arguments]";
var arrayTag$2 = "[object Array]";
var boolTag$3 = "[object Boolean]";
var dateTag$3 = "[object Date]";
var errorTag$2 = "[object Error]";
var funcTag$12 = "[object Function]";
var mapTag$5 = "[object Map]";
var numberTag$3 = "[object Number]";
var objectTag$3 = "[object Object]";
var regexpTag$3 = "[object RegExp]";
var setTag$5 = "[object Set]";
var stringTag$3 = "[object String]";
var weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$3 = "[object ArrayBuffer]";
var dataViewTag$4 = "[object DataView]";
var float32Tag$2 = "[object Float32Array]";
var float64Tag$2 = "[object Float64Array]";
var int8Tag$2 = "[object Int8Array]";
var int16Tag$2 = "[object Int16Array]";
var int32Tag$2 = "[object Int32Array]";
var uint8Tag$2 = "[object Uint8Array]";
var uint8ClampedTag$2 = "[object Uint8ClampedArray]";
var uint16Tag$2 = "[object Uint16Array]";
var uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags2 = {};
typedArrayTags2[float32Tag$2] = typedArrayTags2[float64Tag$2] = typedArrayTags2[int8Tag$2] = typedArrayTags2[int16Tag$2] = typedArrayTags2[int32Tag$2] = typedArrayTags2[uint8Tag$2] = typedArrayTags2[uint8ClampedTag$2] = typedArrayTags2[uint16Tag$2] = typedArrayTags2[uint32Tag$2] = true;
typedArrayTags2[argsTag$22] = typedArrayTags2[arrayTag$2] = typedArrayTags2[arrayBufferTag$3] = typedArrayTags2[boolTag$3] = typedArrayTags2[dataViewTag$4] = typedArrayTags2[dateTag$3] = typedArrayTags2[errorTag$2] = typedArrayTags2[funcTag$12] = typedArrayTags2[mapTag$5] = typedArrayTags2[numberTag$3] = typedArrayTags2[objectTag$3] = typedArrayTags2[regexpTag$3] = typedArrayTags2[setTag$5] = typedArrayTags2[stringTag$3] = typedArrayTags2[weakMapTag$2] = false;
function baseIsTypedArray2(value) {
  return isObjectLike_12(value) && isLength_12(value.length) && !!typedArrayTags2[_baseGetTag2(value)];
}
var _baseIsTypedArray2 = baseIsTypedArray2;
function baseUnary2(func) {
  return function(value) {
    return func(value);
  };
}
var _baseUnary2 = baseUnary2;
var _nodeUtil2 = createCommonjsModule2(function(module, exports) {
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && _freeGlobal2.process;
  var nodeUtil = function() {
    try {
      var types = freeModule && freeModule.require && freeModule.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e3) {
    }
  }();
  module.exports = nodeUtil;
});
var nodeIsTypedArray2 = _nodeUtil2 && _nodeUtil2.isTypedArray;
var isTypedArray2 = nodeIsTypedArray2 ? _baseUnary2(nodeIsTypedArray2) : _baseIsTypedArray2;
var isTypedArray_1 = isTypedArray2;
function safeGet(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
var _safeGet = safeGet;
var objectProto$82 = Object.prototype;
var hasOwnProperty$72 = objectProto$82.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$72.call(object, key) && eq_12(objValue, value)) || value === void 0 && !(key in object)) {
    _baseAssignValue(object, key, value);
  }
}
var _assignValue = assignValue;
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      _baseAssignValue(object, key, newValue);
    } else {
      _assignValue(object, key, newValue);
    }
  }
  return object;
}
var _copyObject = copyObject;
function baseTimes(n3, iteratee) {
  var index = -1, result = Array(n3);
  while (++index < n3) {
    result[index] = iteratee(index);
  }
  return result;
}
var _baseTimes = baseTimes;
var MAX_SAFE_INTEGER2 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER2 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var _isIndex = isIndex;
var objectProto$72 = Object.prototype;
var hasOwnProperty$62 = objectProto$72.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value), isArg = !isArr && isArguments_1(value), isBuff = !isArr && !isArg && isBuffer_12(value), isType2 = !isArr && !isArg && !isBuff && isTypedArray_1(value), skipIndexes = isArr || isArg || isBuff || isType2, result = skipIndexes ? _baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$62.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType2 && (key == "buffer" || key == "byteLength" || key == "byteOffset") || _isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var _arrayLikeKeys = arrayLikeKeys;
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var _nativeKeysIn = nativeKeysIn;
var objectProto$62 = Object.prototype;
var hasOwnProperty$52 = objectProto$62.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject_12(object)) {
    return _nativeKeysIn(object);
  }
  var isProto = _isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$52.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
var _baseKeysIn = baseKeysIn;
function keysIn(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
}
var keysIn_1 = keysIn;
function toPlainObject(value) {
  return _copyObject(value, keysIn_1(value));
}
var toPlainObject_1 = toPlainObject;
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = _safeGet(object, key), srcValue = _safeGet(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    _assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray_1(srcValue), isBuff = !isArr && isBuffer_12(srcValue), isTyped = !isArr && !isBuff && isTypedArray_1(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray_1(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject_1(objValue)) {
        newValue = _copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = _cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = _cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject_1(srcValue) || isArguments_1(srcValue)) {
      newValue = objValue;
      if (isArguments_1(objValue)) {
        newValue = toPlainObject_1(objValue);
      } else if (!isObject_12(objValue) || isFunction_12(objValue)) {
        newValue = _initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  _assignMergeValue(object, key, newValue);
}
var _baseMergeDeep = baseMergeDeep;
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  _baseFor(source, function(srcValue, key) {
    stack || (stack = new _Stack());
    if (isObject_12(srcValue)) {
      _baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(_safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      _assignMergeValue(object, key, newValue);
    }
  }, keysIn_1);
}
var _baseMerge = baseMerge;
function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
  if (isObject_12(objValue) && isObject_12(srcValue)) {
    stack.set(srcValue, objValue);
    _baseMerge(objValue, srcValue, void 0, customDefaultsMerge, stack);
    stack["delete"](srcValue);
  }
  return objValue;
}
var _customDefaultsMerge = customDefaultsMerge;
function isIterateeCall(value, index, object) {
  if (!isObject_12(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike_1(object) && _isIndex(index, object.length) : type == "string" && index in object) {
    return eq_12(object[index], value);
  }
  return false;
}
var _isIterateeCall = isIterateeCall;
function createAssigner(assigner) {
  return _baseRest(function(object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
var _createAssigner = createAssigner;
var mergeWith = _createAssigner(function(object, source, srcIndex, customizer) {
  _baseMerge(object, source, srcIndex, customizer);
});
var mergeWith_1 = mergeWith;
var defaultsDeep = _baseRest(function(args) {
  args.push(void 0, _customDefaultsMerge);
  return _apply(mergeWith_1, void 0, args);
});
var defaultsDeep_1 = defaultsDeep;
var overridePluginsByKey = (plugin, overrideByKey = {}, nested) => {
  var _overrideByKey$plugin;
  if (overrideByKey[plugin.key]) {
    const {
      plugins: pluginOverridesPlugins,
      then: pluginOverridesThen,
      ...pluginOverrides
    } = overrideByKey[plugin.key];
    plugin = defaultsDeep_1(pluginOverrides, plugin);
    if (!nested) {
      pluginOverridesPlugins === null || pluginOverridesPlugins === void 0 ? void 0 : pluginOverridesPlugins.forEach((pOverrides) => {
        if (!plugin.plugins)
          plugin.plugins = [];
        const found = plugin.plugins.find((p3) => p3.key === pOverrides.key);
        if (!found)
          plugin.plugins.push(pOverrides);
      });
    }
  }
  if (plugin.plugins) {
    plugin.plugins = plugin.plugins.map((p3) => overridePluginsByKey(p3, overrideByKey, true));
  }
  const {
    then
  } = plugin;
  if (then) {
    if (typeof plugin._thenReplaced === "undefined") {
      plugin._thenReplaced = 0;
    }
    if (plugin._thenReplaced < 3) {
      plugin.then = (editor, p3) => {
        const pluginThen = {
          key: plugin.key,
          ...then(editor, p3)
        };
        return defaultsDeep_1(overridePluginsByKey(pluginThen, overrideByKey), pluginThen);
      };
      plugin._thenReplaced++;
    }
  } else if ((_overrideByKey$plugin = overrideByKey[plugin.key]) !== null && _overrideByKey$plugin !== void 0 && _overrideByKey$plugin.then) {
    plugin.then = overrideByKey[plugin.key].then;
  }
  return plugin;
};
var createPluginFactory = (defaultPlugin) => (override, overrideByKey = {}) => {
  overrideByKey[defaultPlugin.key] = override;
  return overridePluginsByKey({
    ...defaultPlugin
  }, overrideByKey);
};
var KEY_DESERIALIZE_AST = "deserializeAst";
var createDeserializeAstPlugin = createPluginFactory({
  key: KEY_DESERIALIZE_AST,
  editor: {
    insertData: {
      format: "application/x-slate-fragment",
      getFragment: ({
        data
      }) => {
        const decoded = decodeURIComponent(window.atob(data));
        return JSON.parse(decoded);
      }
    }
  }
});
var getNodeEntry = (editor, at, options) => Editor.node(editor, at, options);
var getPath = (editor, at, options) => Editor.path(editor, at, options);
var elementMatches = (element, props) => Element.matches(element, props);
var isElement = (value) => Element.isElement(value);
var isElementList = (value) => Element.isElementList(value);
var isVoid = (editor, value) => {
  return isElement(value) && Editor.isVoid(editor, value);
};
var getNodeDescendants = (root3, options) => Node2.descendants(root3, options);
function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments[0];
  return isArray_1(value) ? value : [value];
}
var castArray_1 = castArray;
var isBlock = (editor, value) => isElement(value) && Editor.isBlock(editor, value);
var match = (obj, path, predicate) => {
  if (!predicate)
    return true;
  if (typeof predicate === "object") {
    return Object.entries(predicate).every(([key, value]) => {
      const values2 = castArray_1(value);
      return values2.includes(obj[key]);
    });
  }
  return predicate(obj, path);
};
var getQueryOptions = (editor, options = {}) => {
  const {
    match: _match,
    block
  } = options;
  return {
    ...options,
    match: _match || block ? (n3, path) => match(n3, path, _match) && (!block || isBlock(editor, n3)) : void 0
  };
};
var findDescendant = (editor, options) => {
  try {
    const {
      match: _match,
      at = editor.selection,
      reverse = false,
      voids = false
    } = options;
    if (!at)
      return;
    let from;
    let to;
    if (Span.isSpan(at)) {
      [from, to] = at;
    } else if (Range.isRange(at)) {
      const first = getPath(editor, at, {
        edge: "start"
      });
      const last2 = getPath(editor, at, {
        edge: "end"
      });
      from = reverse ? last2 : first;
      to = reverse ? first : last2;
    }
    let root3 = [editor, []];
    if (Path.isPath(at)) {
      root3 = getNodeEntry(editor, at);
    }
    const nodeEntries = getNodeDescendants(root3[0], {
      reverse,
      from,
      to,
      pass: ([n3]) => voids ? false : isVoid(editor, n3)
    });
    for (const [node, path] of nodeEntries) {
      if (match(node, path, _match)) {
        return [node, at.concat(path)];
      }
    }
  } catch (error) {
    return void 0;
  }
};
var unhangRange = (editor, range, options = {}) => {
  const {
    voids,
    unhang = true
  } = options;
  if (Range.isRange(range) && unhang) {
    return Editor.unhangRange(editor, range, {
      voids
    });
  }
};
var getNodeEntries = (editor, options) => {
  unhangRange(editor, options === null || options === void 0 ? void 0 : options.at, options);
  return Editor.nodes(editor, getQueryOptions(editor, options));
};
var findNode = (editor, options = {}) => {
  try {
    const nodeEntries = getNodeEntries(editor, {
      at: editor.selection || [],
      ...getQueryOptions(editor, options)
    });
    for (const [node, path] of nodeEntries) {
      return [node, path];
    }
  } catch (error) {
    return void 0;
  }
};
var getAboveNode = (editor, options) => Editor.above(editor, getQueryOptions(editor, options));
var getBlockAbove = (editor, options = {}) => getAboveNode(editor, {
  ...options,
  block: true
});
var isAncestor = (value) => Element.isAncestor(value);
var getChildren = (nodeEntry) => {
  const [node, path] = nodeEntry;
  if (isAncestor(node)) {
    const {
      children
    } = node;
    return children.map((child, index) => {
      const childPath = path.concat([index]);
      return [child, childPath];
    });
  }
  return [];
};
var getEdgePoints = (editor, at) => Editor.edges(editor, at);
var getEdgeBlocksAbove = (editor, {
  at: _at,
  ...options
} = {}) => {
  const at = _at !== null && _at !== void 0 ? _at : editor.selection;
  if (!at)
    return null;
  const [start, end] = getEdgePoints(editor, at !== null && at !== void 0 ? at : editor.selection);
  const startBlock = getBlockAbove(editor, {
    at: start,
    ...options
  });
  if (!startBlock)
    return null;
  const endBlock = getBlockAbove(editor, {
    at: end,
    ...options
  });
  if (!endBlock)
    return null;
  return [startBlock, endBlock];
};
var isText = (value) => Text.isText(value);
var getLastChild$1 = (nodeEntry) => {
  const [node, path] = nodeEntry;
  if (isText(node))
    return null;
  if (!node.children.length)
    return null;
  const children = node.children;
  return [children[children.length - 1], path.concat([children.length - 1])];
};
var getLastChildPath = (nodeEntry) => {
  const lastChild = getLastChild$1(nodeEntry);
  if (!lastChild)
    return nodeEntry[1].concat([-1]);
  return lastChild[1];
};
var isLastChild = (parentEntry, childPath) => {
  const lastChildPath = getLastChildPath(parentEntry);
  return Path.equals(lastChildPath, childPath);
};
var getLastNode = (editor, at) => Editor.last(editor, at);
var getLastChild = (node, level) => {
  if (!(level + 1) || !isAncestor(node))
    return node;
  const {
    children
  } = node;
  const lastNode = children[children.length - 1];
  return getLastChild(lastNode, level - 1);
};
var getLastNodeByLevel = (editor, level) => {
  const {
    children
  } = editor;
  const lastNode = children[children.length - 1];
  if (!lastNode)
    return;
  const [, lastPath] = getLastNode(editor, []);
  return [getLastChild(lastNode, level - 1), lastPath.slice(0, level + 1)];
};
var getMarks = (editor) => Editor.marks(editor);
var getMark = (editor, key) => {
  if (!editor)
    return;
  const marks = getMarks(editor);
  return marks === null || marks === void 0 ? void 0 : marks[key];
};
var getTEditor = (editor) => editor;
var addMark = (editor, key, value) => Editor.addMark(editor, key, value);
var createPathRef = (editor, at, options) => Editor.pathRef(editor, at, options);
var createPointRef = (editor, point, options) => Editor.pointRef(editor, point, options);
var createRangeRef = (editor, range, options) => Editor.rangeRef(editor, range, options);
var deleteBackward = (editor, options) => Editor.deleteBackward(editor, options);
var deleteForward = (editor, options) => Editor.deleteForward(editor, options);
var deleteFragment = (editor, options) => Editor.deleteFragment(editor, options);
var hasSingleChild = (node) => {
  if (isText(node)) {
    return true;
  }
  return node.children.length === 1 && hasSingleChild(node.children[0]);
};
var getParentNode = (editor, at, options) => {
  try {
    return Editor.parent(editor, at, options);
  } catch (err) {
  }
};
var getPreviousNode = (editor, options) => Editor.previous(editor, options);
var isElementEmpty = (editor, element) => Editor.isEmpty(editor, element);
var withoutNormalizing = (editor, fn) => {
  let normalized = false;
  Editor.withoutNormalizing(editor, () => {
    normalized = !!fn();
  });
  return normalized;
};
var deleteText = (editor, options) => {
  Transforms.delete(editor, options);
};
var moveNodes = (editor, options) => Transforms.moveNodes(editor, options);
var removeNodes = (editor, options) => Transforms.removeNodes(editor, options);
var select = (editor, target) => {
  Transforms.select(editor, target);
};
var mergeNodes = (editor, options = {}) => {
  withoutNormalizing(editor, () => {
    let {
      match: match2,
      at = editor.selection
    } = options;
    const {
      mergeNode,
      removeEmptyAncestor,
      hanging = false,
      voids = false,
      mode = "lowest"
    } = options;
    if (!at) {
      return;
    }
    if (match2 == null) {
      if (Path.isPath(at)) {
        const [parent2] = getParentNode(editor, at);
        match2 = (n3) => parent2.children.includes(n3);
      } else {
        match2 = (n3) => isBlock(editor, n3);
      }
    }
    if (!hanging && Range.isRange(at)) {
      at = Editor.unhangRange(editor, at);
    }
    if (Range.isRange(at)) {
      if (Range.isCollapsed(at)) {
        at = at.anchor;
      } else {
        const [, end] = Range.edges(at);
        const pointRef = createPointRef(editor, end);
        deleteText(editor, {
          at
        });
        at = pointRef.unref();
        if (options.at == null) {
          select(editor, at);
        }
      }
    }
    const _nodes = getNodeEntries(editor, {
      at,
      match: match2,
      voids,
      mode
    });
    const [current] = Array.from(_nodes);
    const prev = getPreviousNode(editor, {
      at,
      match: match2,
      voids,
      mode
    });
    if (!current || !prev) {
      return;
    }
    const [node, path] = current;
    const [prevNode, prevPath] = prev;
    if (path.length === 0 || prevPath.length === 0) {
      return;
    }
    const newPath = Path.next(prevPath);
    const commonPath = Path.common(path, prevPath);
    const isPreviousSibling = Path.isSibling(path, prevPath);
    const _levels = Editor.levels(editor, {
      at: path
    });
    const levels = Array.from(_levels, ([n3]) => n3).slice(commonPath.length).slice(0, -1);
    const emptyAncestor = getAboveNode(editor, {
      at: path,
      mode: "highest",
      match: (n3) => levels.includes(n3) && isElement(n3) && hasSingleChild(n3)
    });
    const emptyRef = emptyAncestor && createPathRef(editor, emptyAncestor[1]);
    let properties;
    let position;
    if (isText(node) && isText(prevNode)) {
      const {
        text,
        ...rest
      } = node;
      position = prevNode.text.length;
      properties = rest;
    } else if (isElement(node) && isElement(prevNode)) {
      const {
        children,
        ...rest
      } = node;
      position = prevNode.children.length;
      properties = rest;
    } else {
      throw new Error(`Cannot merge the node at path [${path}] with the previous sibling because it is not the same kind: ${JSON.stringify(node)} ${JSON.stringify(prevNode)}`);
    }
    if (!isPreviousSibling) {
      if (!mergeNode) {
        moveNodes(editor, {
          at: path,
          to: newPath,
          voids
        });
      }
    }
    if (emptyRef) {
      if (!removeEmptyAncestor) {
        removeNodes(editor, {
          at: emptyRef.current,
          voids
        });
      } else {
        const emptyPath = emptyRef.current;
        emptyPath && removeEmptyAncestor(editor, {
          at: emptyPath
        });
      }
    }
    if (mergeNode) {
      mergeNode(editor, {
        at: path,
        to: newPath
      });
    } else if (isElement(prevNode) && isElementEmpty(editor, prevNode) || isText(prevNode) && prevNode.text === "") {
      removeNodes(editor, {
        at: prevPath,
        voids
      });
    } else {
      editor.apply({
        type: "merge_node",
        path: newPath,
        position,
        properties
      });
    }
    if (emptyRef) {
      emptyRef.unref();
    }
  });
};
var getEndPoint = (editor, at) => Editor.end(editor, at);
var getLeafNode = (editor, at, options) => Editor.leaf(editor, at, options);
var getPointAfter = (editor, at, options) => Editor.after(editor, at, options);
var getPointBefore = (editor, at, options) => Editor.before(editor, at, options);
var getStartPoint = (editor, at) => Editor.start(editor, at);
var getVoidNode = (editor, options) => Editor.void(editor, options);
var deleteMerge = (editor, options = {}) => {
  withoutNormalizing(editor, () => {
    const {
      reverse = false,
      unit = "character",
      distance = 1,
      voids = false
    } = options;
    let {
      at = editor.selection,
      hanging = false
    } = options;
    if (!at) {
      return;
    }
    if (Range.isRange(at) && Range.isCollapsed(at)) {
      at = at.anchor;
    }
    if (Point.isPoint(at)) {
      const furthestVoid = getVoidNode(editor, {
        at,
        mode: "highest"
      });
      if (!voids && furthestVoid) {
        const [, voidPath] = furthestVoid;
        at = voidPath;
      } else {
        const opts = {
          unit,
          distance
        };
        const target = reverse ? getPointBefore(editor, at, opts) || getStartPoint(editor, []) : getPointAfter(editor, at, opts) || getEndPoint(editor, []);
        at = {
          anchor: at,
          focus: target
        };
        hanging = true;
      }
    }
    if (Path.isPath(at)) {
      removeNodes(editor, {
        at,
        voids
      });
      return;
    }
    if (Range.isCollapsed(at)) {
      return;
    }
    if (!hanging) {
      at = Editor.unhangRange(editor, at, {
        voids
      });
    }
    let [start, end] = Range.edges(at);
    const startBlock = getAboveNode(editor, {
      match: (n3) => isBlock(editor, n3),
      at: start,
      voids
    });
    const endBlock = getAboveNode(editor, {
      match: (n3) => isBlock(editor, n3),
      at: end,
      voids
    });
    const isAcrossBlocks = startBlock && endBlock && !Path.equals(startBlock[1], endBlock[1]);
    const isSingleText = Path.equals(start.path, end.path);
    const startVoid = voids ? null : getVoidNode(editor, {
      at: start,
      mode: "highest"
    });
    const endVoid = voids ? null : getVoidNode(editor, {
      at: end,
      mode: "highest"
    });
    if (startVoid) {
      const before = getPointBefore(editor, start);
      if (before && startBlock && Path.isAncestor(startBlock[1], before.path)) {
        start = before;
      }
    }
    if (endVoid) {
      const after = getPointAfter(editor, end);
      if (after && endBlock && Path.isAncestor(endBlock[1], after.path)) {
        end = after;
      }
    }
    const matches = [];
    let lastPath;
    const _nodes = getNodeEntries(editor, {
      at,
      voids
    });
    for (const entry of _nodes) {
      const [node, path] = entry;
      if (lastPath && Path.compare(path, lastPath) === 0) {
        continue;
      }
      if (!voids && isVoid(editor, node) || !Path.isCommon(path, start.path) && !Path.isCommon(path, end.path)) {
        matches.push(entry);
        lastPath = path;
      }
    }
    const pathRefs = Array.from(matches, ([, p3]) => createPathRef(editor, p3));
    const startRef = createPointRef(editor, start);
    const endRef = createPointRef(editor, end);
    if (!isSingleText && !startVoid) {
      const point2 = startRef.current;
      const [node] = getLeafNode(editor, point2);
      const {
        path
      } = point2;
      const {
        offset
      } = start;
      const text = node.text.slice(offset);
      editor.apply({
        type: "remove_text",
        path,
        offset,
        text
      });
    }
    for (const pathRef of pathRefs) {
      const path = pathRef.unref();
      removeNodes(editor, {
        at: path,
        voids
      });
    }
    if (!endVoid) {
      const point2 = endRef.current;
      const [node] = getLeafNode(editor, point2);
      const {
        path
      } = point2;
      const offset = isSingleText ? start.offset : 0;
      const text = node.text.slice(offset, end.offset);
      editor.apply({
        type: "remove_text",
        path,
        offset,
        text
      });
    }
    if (!isSingleText && isAcrossBlocks && endRef.current && startRef.current) {
      mergeNodes(editor, {
        at: endRef.current,
        hanging: true,
        voids
      });
    }
    const point = endRef.unref() || startRef.unref();
    if (options.at == null && point) {
      select(editor, point);
    }
  });
};
var getEditorString = (editor, at, options) => {
  if (!at)
    return "";
  try {
    return Editor.string(editor, at, options);
  } catch (error) {
    return "";
  }
};
var getFirstNode = (editor, at) => Editor.first(editor, at);
var getFragment = (editor, at) => Editor.fragment(editor, at);
var getLevels = (editor, options) => Editor.levels(editor, options);
var getNextNode = (editor, options) => Editor.next(editor, options);
var getPathRefs = (editor) => Editor.pathRefs(editor);
var getPoint = (editor, at, options) => Editor.point(editor, at, options);
var getPointRefs = (editor) => Editor.pointRefs(editor);
var getPositions = (editor, options) => Editor.positions(editor, options);
var getRange = (editor, at, to) => Editor.range(editor, at, to);
var getRangeRefs = (editor) => Editor.rangeRefs(editor);
var hasBlocks = (editor, element) => Editor.hasBlocks(editor, element);
var hasInlines = (editor, element) => Editor.hasInlines(editor, element);
var hasTexts = (editor, element) => Editor.hasTexts(editor, element);
var insertBreak = (editor) => Editor.insertBreak(editor);
var insertNode = (editor, node) => Editor.insertNode(editor, node);
var isEdgePoint = (editor, point, at) => Editor.isEdge(editor, point, at);
var isEditor = (value) => Editor.isEditor(value);
var isEditorNormalizing = (editor) => Editor.isNormalizing(editor);
var isEndPoint = (editor, point, at) => !!point && Editor.isEnd(editor, point, at);
var isInline = (editor, value) => isElement(value) && Editor.isInline(editor, value);
var isStartPoint = (editor, point, at) => !!point && Editor.isStart(editor, point, at);
var normalizeEditor = (editor, options) => Editor.normalize(editor, options);
var removeEditorMark = (editor, key) => Editor.removeMark(editor, key);
var isHistoryEditor = (value) => HistoryEditor.isHistoryEditor(value);
var isHistoryMerging = (editor) => HistoryEditor.isMerging(editor);
var isHistorySaving = (editor) => HistoryEditor.isSaving(editor);
var withoutMergingHistory = (editor, fn) => HistoryEditor.withoutMerging(editor, fn);
var withoutSavingHistory = (editor, fn) => HistoryEditor.withoutSaving(editor, fn);
var isDescendant = (node) => isElement(node) || isText(node);
var getCommonNode = (root3, path, another) => Node2.common(root3, path, another);
var isTextList = (value) => Text.isTextList(value);
var textEquals = (text, another) => Text.equals(text, another);
var textMatches = (text, props) => Text.matches(text, props);
var getNode = (root3, path) => {
  try {
    for (let i3 = 0; i3 < path.length; i3++) {
      const p3 = path[i3];
      if (isText(root3) || !root3.children[p3]) {
        return null;
      }
      root3 = root3.children[p3];
    }
    return root3;
  } catch (e3) {
    return null;
  }
};
var getNodeAncestor = (root3, path) => Node2.ancestor(root3, path);
var getNodeAncestors = (root3, path, options) => Node2.ancestors(root3, path, options);
var getNodeChild = (root3, index) => Node2.child(root3, index);
var getNodeChildren = (root3, path, options) => Node2.children(root3, path, options);
var getNodeDescendant = (root3, path) => Node2.descendant(root3, path);
var getNodeElements = (root3, options) => Node2.elements(root3, options);
var getNodeFirstNode = (root3, path) => Node2.first(root3, path);
var getNodeFragment = (root3, range) => Node2.fragment(root3, range);
var getNodeLastNode = (root3, path) => Node2.last(root3, path);
var getNodeLeaf = (root3, path) => Node2.leaf(root3, path);
var getNodeLevels = (root3, path, options) => Node2.levels(root3, path, options);
var getNodeParent = (root3, path) => Node2.parent(root3, path);
var getNodeProps = (node) => Node2.extractProps(node);
var getNodeString = (node) => Node2.string(node);
var getNodeTexts = (root3, options) => Node2.texts(root3, options);
var getNodes = (root3, options) => Node2.nodes(root3, options);
var hasNode = (root3, path) => Node2.has(root3, path);
var isNode = (value) => Node2.isNode(value);
var isNodeList = (value) => Node2.isNodeList(value);
var nodeMatches = (node, props) => Node2.matches(node, props);
var isCollapsed = (range) => !!range && Range.isCollapsed(range);
var isExpanded = (range) => !!range && Range.isExpanded(range);
var blurEditor = (editor) => ReactEditor.blur(editor);
var deselectEditor = (editor) => ReactEditor.deselect(editor);
var findEditorDocumentOrShadowRoot = (editor) => {
  try {
    return ReactEditor.findDocumentOrShadowRoot(editor);
  } catch (e3) {
  }
};
var findEventRange = (editor, event) => {
  try {
    return ReactEditor.findEventRange(editor, event);
  } catch (e3) {
  }
};
var findNodeKey = (editor, node) => {
  try {
    return ReactEditor.findKey(editor, node);
  } catch (e3) {
  }
};
var findNodePath = (editor, node) => {
  try {
    return ReactEditor.findPath(editor, node);
  } catch (e3) {
  }
};
var collapseSelection = (editor, options) => {
  Transforms.collapse(editor, options);
};
var deselect = (editor) => {
  Transforms.deselect(editor);
};
var insertFragment = (editor, fragment, options) => {
  Transforms.insertFragment(editor, fragment, options);
};
var insertNodes = (editor, nodes, options) => Transforms.insertNodes(editor, nodes, options);
var insertText = (editor, text, options) => {
  Transforms.insertText(editor, text, options);
};
var liftNodes = (editor, options) => Transforms.liftNodes(editor, options);
var moveSelection = (editor, options) => {
  Transforms.move(editor, options);
};
var setNodes = (editor, props, options) => Transforms.setNodes(editor, props, options);
var setPoint = (editor, props, options) => {
  Transforms.setPoint(editor, props, options);
};
var setSelection = (editor, props) => {
  Transforms.setSelection(editor, props);
};
var splitNodes = (editor, options) => Transforms.splitNodes(editor, options);
var unsetNodes = (editor, props, options) => {
  return Transforms.unsetNodes(editor, props, options);
};
var unwrapNodes = (editor, options) => {
  Transforms.unwrapNodes(editor, getQueryOptions(editor, options));
};
var wrapNodes = (editor, element, options) => {
  unhangRange(editor, options === null || options === void 0 ? void 0 : options.at, options);
  Transforms.wrapNodes(editor, element, options);
};
var focusEditor = (editor, target) => {
  if (target) {
    withoutNormalizing(editor, () => {
      deselect(editor);
      select(editor, target);
    });
  }
  ReactEditor.focus(editor);
};
var getEditorWindow = (editor) => {
  try {
    return ReactEditor.getWindow(editor);
  } catch (e3) {
  }
};
var hasEditorDOMNode = (editor, target, options) => {
  try {
    return ReactEditor.hasDOMNode(editor, target, options);
  } catch (e3) {
  }
  return false;
};
var hasEditorEditableTarget = (editor, target) => {
  try {
    return ReactEditor.hasEditableTarget(editor, target);
  } catch (e3) {
  }
  return false;
};
var hasEditorSelectableTarget = (editor, target) => {
  try {
    return ReactEditor.hasSelectableTarget(editor, target);
  } catch (e3) {
  }
  return false;
};
var hasEditorTarget = (editor, target) => {
  try {
    return ReactEditor.hasTarget(editor, target);
  } catch (e3) {
  }
  return false;
};
var insertData = (editor, data) => ReactEditor.insertData(editor, data);
var isEditorFocused = (editor) => ReactEditor.isFocused(editor);
var isEditorReadOnly = (editor) => ReactEditor.isReadOnly(editor);
var isTargetInsideNonReadonlyVoid = (editor, target) => {
  try {
    return ReactEditor.isTargetInsideNonReadonlyVoid(editor, target);
  } catch (e3) {
  }
  return false;
};
var setFragmentData = (editor, data) => ReactEditor.setFragmentData(editor, data);
var toDOMNode = (editor, node) => {
  try {
    return ReactEditor.toDOMNode(editor, node);
  } catch (e3) {
  }
};
var toDOMPoint = (editor, point) => {
  try {
    return ReactEditor.toDOMPoint(editor, point);
  } catch (e3) {
  }
};
var toDOMRange = (editor, range) => {
  try {
    return ReactEditor.toDOMRange(editor, range);
  } catch (e3) {
  }
};
var toSlateNode = (editor, domNode) => {
  try {
    return ReactEditor.toSlateNode(editor, domNode);
  } catch (e3) {
  }
};
var toSlatePoint = (editor, domPoint, options) => {
  try {
    return ReactEditor.toSlatePoint(editor, domPoint, options);
  } catch (e3) {
  }
};
var toSlateRange = (editor, domRange, options) => {
  try {
    return ReactEditor.toSlateRange(editor, domRange, options);
  } catch (e3) {
  }
};
var getNextNodeStartPoint = (editor, at) => {
  const nextEntry = getNextNode(editor, {
    at
  });
  if (!nextEntry)
    return;
  return getStartPoint(editor, nextEntry[1]);
};
var getNextSiblingNodes = (ancestorEntry, path) => {
  const [ancestor, ancestorPath] = ancestorEntry;
  const leafIndex = path[ancestorPath.length];
  const siblings = [];
  const ancestorChildren = ancestor.children;
  if (leafIndex + 1 < ancestor.children.length) {
    for (let i3 = leafIndex + 1; i3 < ancestor.children.length; i3++) {
      siblings.push(ancestorChildren[i3]);
    }
  }
  return siblings;
};
var getOperations = (editor) => editor.operations;
function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var _arrayMap = arrayMap;
var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
function setCacheAdd2(value) {
  this.__data__.set(value, HASH_UNDEFINED2);
  return this;
}
var _setCacheAdd2 = setCacheAdd2;
function setCacheHas2(value) {
  return this.__data__.has(value);
}
var _setCacheHas2 = setCacheHas2;
function SetCache2(values2) {
  var index = -1, length = values2 == null ? 0 : values2.length;
  this.__data__ = new _MapCache2();
  while (++index < length) {
    this.add(values2[index]);
  }
}
SetCache2.prototype.add = SetCache2.prototype.push = _setCacheAdd2;
SetCache2.prototype.has = _setCacheHas2;
var _SetCache = SetCache2;
function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
var _arraySome = arraySome;
function cacheHas(cache, key) {
  return cache.has(key);
}
var _cacheHas = cacheHas;
var COMPARE_PARTIAL_FLAG$5 = 1;
var COMPARE_UNORDERED_FLAG$3 = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new _SetCache() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!_arraySome(other, function(othValue2, othIndex) {
        if (!_cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}
var _equalArrays = equalArrays;
function mapToArray(map2) {
  var index = -1, result = Array(map2.size);
  map2.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
var _mapToArray = mapToArray;
function setToArray(set) {
  var index = -1, result = Array(set.size);
  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var _setToArray = setToArray;
var COMPARE_PARTIAL_FLAG$4 = 1;
var COMPARE_UNORDERED_FLAG$2 = 2;
var boolTag$2 = "[object Boolean]";
var dateTag$2 = "[object Date]";
var errorTag$12 = "[object Error]";
var mapTag$4 = "[object Map]";
var numberTag$2 = "[object Number]";
var regexpTag$2 = "[object RegExp]";
var setTag$4 = "[object Set]";
var stringTag$2 = "[object String]";
var symbolTag$3 = "[object Symbol]";
var arrayBufferTag$2 = "[object ArrayBuffer]";
var dataViewTag$3 = "[object DataView]";
var symbolProto$2 = _Symbol2 ? _Symbol2.prototype : void 0;
var symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$3:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag$2:
      if (object.byteLength != other.byteLength || !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
        return false;
      }
      return true;
    case boolTag$2:
    case dateTag$2:
    case numberTag$2:
      return eq_12(+object, +other);
    case errorTag$12:
      return object.name == other.name && object.message == other.message;
    case regexpTag$2:
    case stringTag$2:
      return object == other + "";
    case mapTag$4:
      var convert = _mapToArray;
    case setTag$4:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
      convert || (convert = _setToArray);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$2;
      stack.set(object, other);
      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result;
    case symbolTag$3:
      if (symbolValueOf$1) {
        return symbolValueOf$1.call(object) == symbolValueOf$1.call(other);
      }
  }
  return false;
}
var _equalByTag = equalByTag;
function arrayPush(array, values2) {
  var index = -1, length = values2.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values2[index];
  }
  return array;
}
var _arrayPush = arrayPush;
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}
var _baseGetAllKeys = baseGetAllKeys;
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var _arrayFilter = arrayFilter;
function stubArray() {
  return [];
}
var stubArray_1 = stubArray;
var objectProto$52 = Object.prototype;
var propertyIsEnumerable2 = objectProto$52.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols$1 ? stubArray_1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return _arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable2.call(object, symbol);
  });
};
var _getSymbols = getSymbols;
var nativeKeys2 = _overArg2(Object.keys, Object);
var _nativeKeys = nativeKeys2;
var objectProto$42 = Object.prototype;
var hasOwnProperty$42 = objectProto$42.hasOwnProperty;
function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$42.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var _baseKeys = baseKeys;
function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}
var keys_1 = keys;
function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}
var _getAllKeys = getAllKeys;
var COMPARE_PARTIAL_FLAG$3 = 1;
var objectProto$32 = Object.prototype;
var hasOwnProperty$32 = objectProto$32.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, objProps = _getAllKeys(object), objLength = objProps.length, othProps = _getAllKeys(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$32.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
var _equalObjects = equalObjects;
var DataView2 = _getNative2(_root2, "DataView");
var _DataView2 = DataView2;
var Promise$12 = _getNative2(_root2, "Promise");
var _Promise2 = Promise$12;
var Set3 = _getNative2(_root2, "Set");
var _Set2 = Set3;
var WeakMap$1 = _getNative2(_root2, "WeakMap");
var _WeakMap2 = WeakMap$1;
var mapTag$3 = "[object Map]";
var objectTag$22 = "[object Object]";
var promiseTag2 = "[object Promise]";
var setTag$3 = "[object Set]";
var weakMapTag$12 = "[object WeakMap]";
var dataViewTag$22 = "[object DataView]";
var dataViewCtorString2 = _toSource2(_DataView2);
var mapCtorString2 = _toSource2(_Map2);
var promiseCtorString2 = _toSource2(_Promise2);
var setCtorString2 = _toSource2(_Set2);
var weakMapCtorString2 = _toSource2(_WeakMap2);
var getTag2 = _baseGetTag2;
if (_DataView2 && getTag2(new _DataView2(new ArrayBuffer(1))) != dataViewTag$22 || _Map2 && getTag2(new _Map2()) != mapTag$3 || _Promise2 && getTag2(_Promise2.resolve()) != promiseTag2 || _Set2 && getTag2(new _Set2()) != setTag$3 || _WeakMap2 && getTag2(new _WeakMap2()) != weakMapTag$12) {
  getTag2 = function(value) {
    var result = _baseGetTag2(value), Ctor = result == objectTag$22 ? value.constructor : void 0, ctorString = Ctor ? _toSource2(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString2:
          return dataViewTag$22;
        case mapCtorString2:
          return mapTag$3;
        case promiseCtorString2:
          return promiseTag2;
        case setCtorString2:
          return setTag$3;
        case weakMapCtorString2:
          return weakMapTag$12;
      }
    }
    return result;
  };
}
var _getTag = getTag2;
var COMPARE_PARTIAL_FLAG$2 = 1;
var argsTag$12 = "[object Arguments]";
var arrayTag$12 = "[object Array]";
var objectTag$12 = "[object Object]";
var objectProto$22 = Object.prototype;
var hasOwnProperty$22 = objectProto$22.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_1(object), othIsArr = isArray_1(other), objTag = objIsArr ? arrayTag$12 : _getTag(object), othTag = othIsArr ? arrayTag$12 : _getTag(other);
  objTag = objTag == argsTag$12 ? objectTag$12 : objTag;
  othTag = othTag == argsTag$12 ? objectTag$12 : othTag;
  var objIsObj = objTag == objectTag$12, othIsObj = othTag == objectTag$12, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer_12(object)) {
    if (!isBuffer_12(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack());
    return objIsArr || isTypedArray_1(object) ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack) : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
    var objIsWrapped = objIsObj && hasOwnProperty$22.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$22.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new _Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new _Stack());
  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}
var _baseIsEqualDeep = baseIsEqualDeep;
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike_12(value) && !isObjectLike_12(other)) {
    return value !== value && other !== other;
  }
  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
var _baseIsEqual = baseIsEqual;
var COMPARE_PARTIAL_FLAG$1 = 1;
var COMPARE_UNORDERED_FLAG$1 = 2;
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length, length = index, noCustomizer = !customizer;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0], objValue = object[key], srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object)) {
        return false;
      }
    } else {
      var stack = new _Stack();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === void 0 ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}
var _baseIsMatch = baseIsMatch;
function isStrictComparable(value) {
  return value === value && !isObject_12(value);
}
var _isStrictComparable = isStrictComparable;
function getMatchData(object) {
  var result = keys_1(object), length = result.length;
  while (length--) {
    var key = result[length], value = object[key];
    result[length] = [key, value, _isStrictComparable(value)];
  }
  return result;
}
var _getMatchData = getMatchData;
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
  };
}
var _matchesStrictComparable = matchesStrictComparable;
function baseMatches(source) {
  var matchData = _getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || _baseIsMatch(object, source, matchData);
  };
}
var _baseMatches = baseMatches;
var symbolTag$2 = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike_12(value) && _baseGetTag2(value) == symbolTag$2;
}
var isSymbol_1 = isSymbol;
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if (isArray_1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol_1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var _isKey = isKey;
var FUNC_ERROR_TEXT2 = "Expected a function";
function memoize2(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT2);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize2.Cache || _MapCache2)();
  return memoized;
}
memoize2.Cache = _MapCache2;
var memoize_12 = memoize2;
var MAX_MEMOIZE_SIZE2 = 500;
function memoizeCapped2(func) {
  var result = memoize_12(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE2) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var _memoizeCapped2 = memoizeCapped2;
var rePropName2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar2 = /\\(\\)?/g;
var stringToPath2 = _memoizeCapped2(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName2, function(match2, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar2, "$1") : number || match2);
  });
  return result;
});
var _stringToPath = stringToPath2;
var INFINITY$12 = 1 / 0;
var symbolProto$12 = _Symbol2 ? _Symbol2.prototype : void 0;
var symbolToString2 = symbolProto$12 ? symbolProto$12.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray_1(value)) {
    return _arrayMap(value, baseToString) + "";
  }
  if (isSymbol_1(value)) {
    return symbolToString2 ? symbolToString2.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$12 ? "-0" : result;
}
var _baseToString = baseToString;
function toString(value) {
  return value == null ? "" : _baseToString(value);
}
var toString_1 = toString;
function castPath(value, object) {
  if (isArray_1(value)) {
    return value;
  }
  return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
}
var _castPath = castPath;
var INFINITY2 = 1 / 0;
function toKey(value) {
  if (typeof value == "string" || isSymbol_1(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY2 ? "-0" : result;
}
var _toKey = toKey;
function baseGet(object, path) {
  path = _castPath(path, object);
  var index = 0, length = path.length;
  while (object != null && index < length) {
    object = object[_toKey(path[index++])];
  }
  return index && index == length ? object : void 0;
}
var _baseGet = baseGet;
function get(object, path, defaultValue) {
  var result = object == null ? void 0 : _baseGet(object, path);
  return result === void 0 ? defaultValue : result;
}
var get_1 = get;
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}
var _baseHasIn = baseHasIn;
function hasPath(object, path, hasFunc) {
  path = _castPath(path, object);
  var index = -1, length = path.length, result = false;
  while (++index < length) {
    var key = _toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength_12(length) && _isIndex(key, length) && (isArray_1(object) || isArguments_1(object));
}
var _hasPath = hasPath;
function hasIn(object, path) {
  return object != null && _hasPath(object, path, _baseHasIn);
}
var hasIn_1 = hasIn;
var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;
function baseMatchesProperty(path, srcValue) {
  if (_isKey(path) && _isStrictComparable(srcValue)) {
    return _matchesStrictComparable(_toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get_1(object, path);
    return objValue === void 0 && objValue === srcValue ? hasIn_1(object, path) : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}
var _baseMatchesProperty = baseMatchesProperty;
function baseProperty(key) {
  return function(object) {
    return object == null ? void 0 : object[key];
  };
}
var _baseProperty = baseProperty;
function basePropertyDeep(path) {
  return function(object) {
    return _baseGet(object, path);
  };
}
var _basePropertyDeep = basePropertyDeep;
function property(path) {
  return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
}
var property_1 = property;
function baseIteratee(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity_1;
  }
  if (typeof value == "object") {
    return isArray_1(value) ? _baseMatchesProperty(value[0], value[1]) : _baseMatches(value);
  }
  return property_1(value);
}
var _baseIteratee = baseIteratee;
function baseForOwn(object, iteratee) {
  return object && _baseFor(object, iteratee, keys_1);
}
var _baseForOwn = baseForOwn;
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike_1(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}
var _createBaseEach = createBaseEach;
var baseEach = _createBaseEach(_baseForOwn);
var _baseEach = baseEach;
function baseMap(collection, iteratee) {
  var index = -1, result = isArrayLike_1(collection) ? Array(collection.length) : [];
  _baseEach(collection, function(value, key, collection2) {
    result[++index] = iteratee(value, key, collection2);
  });
  return result;
}
var _baseMap = baseMap;
function map(collection, iteratee) {
  var func = isArray_1(collection) ? _arrayMap : _baseMap;
  return func(collection, _baseIteratee(iteratee));
}
var map_1 = map;
var isRangeAcrossBlocks = (editor, {
  at,
  ...options
} = {}) => {
  if (!at)
    at = editor.selection;
  if (!at)
    return;
  const [start, end] = Range.edges(at);
  const startBlock = getBlockAbove(editor, {
    at: start,
    ...options
  });
  const endBlock = getBlockAbove(editor, {
    at: end,
    ...options
  });
  if (!startBlock && !endBlock)
    return;
  if (!startBlock || !endBlock)
    return true;
  return !Path.equals(startBlock[1], endBlock[1]);
};
var getPointBeforeLocation = (editor, at, options) => {
  if (!options || !options.match && !options.matchString) {
    return getPointBefore(editor, at, options);
  }
  const unitOffset = !options.unit || options.unit === "offset";
  const matchStrings = options.matchString ? castArray_1(options.matchString) : [""];
  let point;
  matchStrings.some((matchString) => {
    let beforeAt = at;
    let previousBeforePoint = getPoint(editor, at, {
      edge: "end"
    });
    const stackLength = matchString.length + 1;
    const stack = Array(stackLength);
    let count = 0;
    while (true) {
      var _options$match;
      const beforePoint = getPointBefore(editor, beforeAt, options);
      if (!beforePoint)
        return;
      if (isRangeAcrossBlocks(editor, {
        at: {
          anchor: beforePoint,
          focus: previousBeforePoint
        }
      })) {
        return;
      }
      const beforeString = getEditorString(editor, {
        anchor: beforePoint,
        focus: previousBeforePoint
      });
      let beforeStringToMatch = beforeString;
      if (unitOffset && stackLength) {
        stack.unshift({
          point: beforePoint,
          text: beforeString
        });
        stack.pop();
        beforeStringToMatch = map_1(stack.slice(0, -1), "text").join("");
      }
      if (matchString === beforeStringToMatch || (_options$match = options.match) !== null && _options$match !== void 0 && _options$match.call(options, {
        beforeString: beforeStringToMatch,
        beforePoint,
        at
      })) {
        if (options.afterMatch) {
          if (stackLength && unitOffset) {
            var _stack;
            point = (_stack = stack[stack.length - 1]) === null || _stack === void 0 ? void 0 : _stack.point;
            return !!point;
          }
          point = previousBeforePoint;
          return true;
        }
        point = beforePoint;
        return true;
      }
      previousBeforePoint = beforePoint;
      beforeAt = beforePoint;
      count += 1;
      if (!options.skipInvalid) {
        if (!matchString || count >= matchString.length)
          return;
      }
    }
  });
  return point;
};
var getPointFromLocation = (editor, {
  at = editor.selection,
  focus
} = {}) => {
  let point;
  if (Range.isRange(at))
    point = !focus ? at.anchor : at.focus;
  if (Point.isPoint(at))
    point = at;
  if (Path.isPath(at))
    point = {
      path: at,
      offset: 0
    };
  return point;
};
var getPointNextToVoid = (editor, {
  at,
  after
}) => {
  const startVoid = getVoidNode(editor, {
    at,
    mode: "highest"
  });
  if (startVoid) {
    const blockAbove = getBlockAbove(editor, {
      at
    });
    if (blockAbove) {
      let nextPoint;
      if (after) {
        nextPoint = getPointAfter(editor, at);
      } else {
        nextPoint = getPointBefore(editor, at);
      }
      if (nextPoint && blockAbove && Path.isAncestor(blockAbove[1], nextPoint.path)) {
        at = nextPoint;
      }
    }
  }
  return at;
};
var queryNode = (entry, {
  filter,
  allow,
  exclude,
  level,
  maxLevel
} = {}) => {
  if (!entry)
    return false;
  const [node, path] = entry;
  if (level) {
    const levels = castArray_1(level);
    if (!levels.includes(path.length)) {
      return false;
    }
  }
  if (maxLevel) {
    if (path.length > maxLevel) {
      return false;
    }
  }
  if (filter && !filter(entry)) {
    return false;
  }
  if (allow) {
    const allows = castArray_1(allow);
    if (allows.length && !allows.includes(node.type)) {
      return false;
    }
  }
  if (exclude) {
    const excludes = castArray_1(exclude);
    if (excludes.length && excludes.includes(node.type)) {
      return false;
    }
  }
  return true;
};
var getPreviousBlockById = (editor, id, query) => {
  const entry = findNode(editor, {
    match: {
      id
    }
  });
  if (entry) {
    const prevEntry = getPreviousNode(editor, {
      at: entry[1]
    });
    if (prevEntry && prevEntry[0].id && isBlock(editor, prevEntry[0])) {
      return prevEntry;
    }
  }
  let found = false;
  const _nodes = getNodeEntries(editor, {
    mode: "highest",
    reverse: true,
    match: (n3) => {
      if (!isBlock(editor, n3) || !n3.id)
        return false;
      if (n3.id === id) {
        found = true;
        return false;
      }
      return found && n3.id !== id && queryNode([n3, []], query);
    },
    at: []
  });
  const nodeEntries = Array.from(_nodes);
  if (nodeEntries.length) {
    return nodeEntries[0];
  }
  if (!found)
    return;
  const _entries = getNodeEntries(editor, {
    mode: "highest",
    match: (n3) => {
      return isBlock(editor, n3) && !!n3.id && queryNode([n3, []], query);
    },
    at: []
  });
  const firstNodeEntry = Array.from(_entries);
  if (firstNodeEntry.length) {
    const [, path] = firstNodeEntry[0];
    path[path.length - 1] = path[path.length - 1] - 1;
    return [null, path];
  }
};
var getPreviousNodeEndPoint = (editor, at) => {
  const prevEntry = getPreviousNode(editor, {
    at
  });
  if (!prevEntry)
    return;
  return getEndPoint(editor, prevEntry[1]);
};
var getPreviousPath = (path) => {
  if (path.length === 0)
    return;
  const last2 = path[path.length - 1];
  if (last2 <= 0)
    return;
  return path.slice(0, -1).concat(last2 - 1);
};
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : void 0;
}
var last_1 = last;
var getPreviousSiblingNode = (editor, path) => {
  const index = last_1(path);
  if (index > 0) {
    const previousSiblingIndex = index - 1;
    const previousSiblingPath = path.slice(0, path.length - 1).concat([previousSiblingIndex]);
    const previousSiblingNode = getNode(editor, previousSiblingPath);
    return previousSiblingNode ? [previousSiblingNode, previousSiblingPath] : void 0;
  }
};
var getRangeBefore = (editor, at, options) => {
  const anchor = getPointBeforeLocation(editor, at, options);
  if (!anchor)
    return;
  const focus = getPoint(editor, at, {
    edge: "end"
  });
  return {
    anchor,
    focus
  };
};
var getRangeFromBlockStart = (editor, options = {}) => {
  var _getBlockAbove;
  const path = (_getBlockAbove = getBlockAbove(editor, options)) === null || _getBlockAbove === void 0 ? void 0 : _getBlockAbove[1];
  if (!path)
    return;
  const start = getStartPoint(editor, path);
  const focus = getPointFromLocation(editor, options);
  if (!focus)
    return;
  return {
    anchor: start,
    focus
  };
};
var getSelectionText = (editor) => getEditorString(editor, editor.selection);
var isAncestorEmpty = (editor, node) => !getNodeString(node) && !node.children.some((n3) => isInline(editor, n3));
var isBlockAboveEmpty = (editor) => {
  var _getBlockAbove;
  const block = (_getBlockAbove = getBlockAbove(editor)) === null || _getBlockAbove === void 0 ? void 0 : _getBlockAbove[0];
  if (!block)
    return false;
  return isAncestorEmpty(editor, block);
};
var isBlockTextEmptyAfterSelection = (editor) => {
  if (!editor.selection)
    return false;
  const blockAbove = getBlockAbove(editor);
  if (!blockAbove)
    return false;
  const cursor = editor.selection.focus;
  const selectionParentEntry = getParentNode(editor, editor.selection);
  if (!selectionParentEntry)
    return false;
  const [, selectionParentPath] = selectionParentEntry;
  if (!isEndPoint(editor, cursor, selectionParentPath))
    return false;
  const siblingNodes = getNextSiblingNodes(blockAbove, cursor.path);
  if (siblingNodes.length) {
    for (const siblingNode of siblingNodes) {
      if (isText(siblingNode) && siblingNode.text) {
        return false;
      }
    }
  } else {
    return isEndPoint(editor, cursor, blockAbove[1]);
  }
  return true;
};
var isDocumentEnd = (editor) => {
  if (editor.selection) {
    const point = editor.selection.focus;
    const endPoint = getEndPoint(editor, []);
    return endPoint.offset === 0 && isEndPoint(editor, point, point) && Path.equals(Path.next(Path.parent(point.path)), endPoint.path);
  }
  return false;
};
var isFirstChild = (path) => path[path.length - 1] === 0;
var isMarkActive = (editor, type) => {
  return isDefined(getMark(editor, type));
};
var AFTER_MATCH_REGEX = /^(\s|$)/;
var isPointAtWordEnd = (editor, {
  at
}) => {
  const after = getPointAfter(editor, at);
  const afterRange = getRange(editor, at, after);
  const afterText = getEditorString(editor, afterRange);
  return !!afterText.match(AFTER_MATCH_REGEX);
};
var isRangeInSameBlock = (editor, {
  at,
  ...options
} = {}) => {
  if (!at)
    at = editor.selection;
  if (!at)
    return;
  const [start, end] = Range.edges(at);
  const startBlock = getBlockAbove(editor, {
    at: start,
    ...options
  });
  const endBlock = getBlockAbove(editor, {
    at: end,
    ...options
  });
  if (!startBlock || !endBlock)
    return;
  return Path.equals(startBlock[1], endBlock[1]);
};
var isRangeInSingleText = (at) => {
  const [start, end] = Range.edges(at);
  return Path.equals(start.path, end.path);
};
var isSelectionAtBlockEnd = (editor, options) => {
  var _getBlockAbove, _editor$selection;
  const path = (_getBlockAbove = getBlockAbove(editor, options)) === null || _getBlockAbove === void 0 ? void 0 : _getBlockAbove[1];
  return !!path && isEndPoint(editor, (_editor$selection = editor.selection) === null || _editor$selection === void 0 ? void 0 : _editor$selection.focus, path);
};
var isSelectionAtBlockStart = (editor, options) => {
  var _getBlockAbove;
  const {
    selection
  } = editor;
  if (!selection)
    return false;
  const path = (_getBlockAbove = getBlockAbove(editor, options)) === null || _getBlockAbove === void 0 ? void 0 : _getBlockAbove[1];
  if (!path)
    return false;
  return isStartPoint(editor, selection.focus, path) || isExpanded(editor.selection) && isStartPoint(editor, selection.anchor, path);
};
var isSelectionExpanded = (editor) => isExpanded(editor.selection);
var isTextByPath = (editor, path) => {
  const node = getNode(editor, path);
  return isText(node);
};
var getPluginsByKey = (editor) => {
  var _ref;
  return (_ref = editor === null || editor === void 0 ? void 0 : editor.pluginsByKey) !== null && _ref !== void 0 ? _ref : {};
};
var getPlugin = (editor, key) => {
  var _getPluginsByKey$key;
  return (_getPluginsByKey$key = getPluginsByKey(editor)[key]) !== null && _getPluginsByKey$key !== void 0 ? _getPluginsByKey$key : {
    key
  };
};
var getPluginType = (editor, key) => {
  var _ref, _getPlugin$type;
  return (_ref = (_getPlugin$type = getPlugin(editor, key).type) !== null && _getPlugin$type !== void 0 ? _getPlugin$type : key) !== null && _ref !== void 0 ? _ref : "";
};
var isType = (editor, node, key) => {
  const keys2 = castArray_1(key);
  const types = [];
  keys2.forEach((_key) => types.push(getPluginType(editor, _key)));
  return types.includes(node === null || node === void 0 ? void 0 : node.type);
};
var isWordAfterTrigger = (editor, {
  at,
  trigger
}) => {
  const wordBefore = getPointBefore(editor, at, {
    unit: "word"
  });
  const before = wordBefore && getPointBefore(editor, wordBefore);
  const beforeRange = before && getRange(editor, before, at);
  const beforeText = getEditorString(editor, beforeRange);
  const escapedTrigger = escapeRegExp(trigger);
  const beforeRegex = new RegExp(`^${escapedTrigger}([\\w|\xC0-\xD6\xD8-\xF6\xF8-\xFF|\u0430-\u044F\u0410-\u042F\u0451\u0401]+)$`);
  const match2 = !!beforeText && beforeText.match(beforeRegex);
  return {
    range: beforeRange,
    match: match2
  };
};
var someNode = (editor, options) => {
  return !!findNode(editor, options);
};
var queryEditor = (editor, {
  filter,
  selectionAtBlockStart,
  selectionAtBlockEnd,
  allow,
  exclude,
  at = editor.selection || []
} = {}) => {
  if (filter && !filter(editor) || selectionAtBlockStart && !isSelectionAtBlockStart(editor) || selectionAtBlockEnd && !isSelectionAtBlockEnd(editor)) {
    return false;
  }
  const allows = castArray_1(allow);
  if (allows.length && !someNode(editor, {
    at,
    match: {
      type: allows
    }
  })) {
    return false;
  }
  const excludes = castArray_1(exclude);
  if (excludes.length && someNode(editor, {
    at,
    match: {
      type: excludes
    }
  })) {
    return false;
  }
  return true;
};
var objectProto$12 = Object.prototype;
var hasOwnProperty$12 = objectProto$12.hasOwnProperty;
var defaults = _baseRest(function(object, sources) {
  object = Object(object);
  var index = -1;
  var length = sources.length;
  var guard = length > 2 ? sources[2] : void 0;
  if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
    length = 1;
  }
  while (++index < length) {
    var source = sources[index];
    var props = keysIn_1(source);
    var propsIndex = -1;
    var propsLength = props.length;
    while (++propsIndex < propsLength) {
      var key = props[propsIndex];
      var value = object[key];
      if (value === void 0 || eq_12(value, objectProto$12[key]) && !hasOwnProperty$12.call(object, key)) {
        object[key] = source[key];
      }
    }
  }
  return object;
});
var defaults_1 = defaults;
var applyDeepToNodes = ({
  node,
  path = [],
  source,
  apply: apply2,
  query
}) => {
  const entry = [node, path];
  if (queryNode(entry, query)) {
    if (source instanceof Function) {
      apply2(node, source());
    } else {
      apply2(node, source);
    }
  }
  if (!isAncestor(node))
    return;
  node.children.forEach((child, index) => {
    applyDeepToNodes({
      node: child,
      path: path.concat([index]),
      source,
      apply: apply2,
      query
    });
  });
};
var defaultsDeepToNodes = (options) => {
  applyDeepToNodes({
    ...options,
    apply: defaults_1
  });
};
var insertElements = (editor, nodes, options) => insertNodes(editor, nodes, options);
var insertEmptyElement = (editor, type, options) => {
  insertElements(editor, {
    type,
    children: [{
      text: ""
    }]
  }, getQueryOptions(editor, options));
};
var moveChildren = (editor, {
  at,
  to,
  match: match2,
  fromStartIndex = 0
}) => {
  let moved = 0;
  const parentPath = Path.isPath(at) ? at : at[1];
  const parentNode = Path.isPath(at) ? getNode(editor, parentPath) : at[0];
  if (!parentNode)
    return moved;
  if (!isBlock(editor, parentNode))
    return moved;
  for (let i3 = parentNode.children.length - 1; i3 >= fromStartIndex; i3--) {
    const childPath = [...parentPath, i3];
    const childNode = getNode(editor, childPath);
    if (!match2 || childNode && match2([childNode, childPath])) {
      moveNodes(editor, {
        at: childPath,
        to
      });
      moved++;
    }
  }
  return moved;
};
var removeMark = (editor, {
  key,
  at,
  shouldChange = true,
  ...rest
}) => {
  const selection = at !== null && at !== void 0 ? at : editor.selection;
  key = castArray_1(key);
  if (selection) {
    if (Range.isRange(selection) && Range.isExpanded(selection)) {
      unsetNodes(editor, key, {
        at: selection,
        match: isText,
        split: true,
        ...rest
      });
    } else if (editor.selection) {
      var _getMarks;
      const marks = (_getMarks = getMarks(editor)) !== null && _getMarks !== void 0 ? _getMarks : {};
      key.forEach((k) => {
        delete marks[k];
      });
      editor.marks = marks;
      shouldChange && editor.onChange();
    }
  }
};
var removeNodeChildren = (editor, path, options) => {
  withoutNormalizing(editor, () => {
    for (const [, childPath] of getNodeChildren(editor, path, {
      reverse: true
    })) {
      removeNodes(editor, {
        ...options,
        at: childPath
      });
    }
  });
};
var removeSelectionMark = (editor) => {
  const marks = getMarks(editor);
  if (!marks)
    return;
  Object.keys(marks).forEach((key) => {
    removeEditorMark(editor, key);
  });
};
var replaceNodeChildren = (editor, {
  at,
  nodes,
  insertOptions,
  removeOptions
}) => {
  withoutNormalizing(editor, () => {
    removeNodeChildren(editor, at, removeOptions);
    insertNodes(editor, nodes, {
      ...insertOptions,
      at: at.concat([0])
    });
  });
};
var resetEditorChildren = (editor, options) => {
  replaceNodeChildren(editor, {
    at: [],
    nodes: editor.childrenFactory(),
    ...options
  });
};
var selectEditor = (editor, {
  at,
  edge,
  focus
}) => {
  if (focus) {
    focusEditor(editor);
  }
  let location = at;
  if (edge === "start") {
    location = getStartPoint(editor, []);
  }
  if (edge === "end") {
    location = getEndPoint(editor, []);
  }
  if (location) {
    select(editor, location);
  }
};
var selectEndOfBlockAboveSelection = (editor) => {
  var _getBlockAbove;
  const path = (_getBlockAbove = getBlockAbove(editor)) === null || _getBlockAbove === void 0 ? void 0 : _getBlockAbove[1];
  path && select(editor, getEndPoint(editor, path));
};
var setElements = (editor, props, options) => setNodes(editor, props, options);
var setMarks = (editor, marks, clear = []) => {
  if (!editor.selection)
    return;
  withoutNormalizing(editor, () => {
    const clears = castArray_1(clear);
    removeMark(editor, {
      key: clears
    });
    removeMark(editor, {
      key: Object.keys(marks)
    });
    Object.keys(marks).forEach((key) => {
      editor.addMark(key, marks[key]);
    });
  });
};
var toggleMark = (editor, {
  key,
  clear
}) => {
  if (!editor.selection)
    return;
  withoutNormalizing(editor, () => {
    const isActive = isMarkActive(editor, key);
    if (isActive) {
      removeMark(editor, {
        key
      });
      return;
    }
    if (clear) {
      const clears = castArray_1(clear);
      removeMark(editor, {
        key: clears
      });
    }
    editor.addMark(key, true);
  });
};
var ELEMENT_DEFAULT = "p";
var toggleNodeType = (editor, options, editorNodesOptions) => {
  const {
    activeType,
    inactiveType = getPluginType(editor, ELEMENT_DEFAULT)
  } = options;
  if (!activeType || !editor.selection)
    return;
  const isActive = someNode(editor, {
    ...editorNodesOptions,
    match: {
      type: activeType
    }
  });
  if (isActive && activeType === inactiveType)
    return;
  setElements(editor, {
    type: isActive ? inactiveType : activeType
  });
};
var toggleWrapNodes = (editor, type) => {
  if (someNode(editor, {
    match: {
      type
    }
  })) {
    unwrapNodes(editor, {
      match: {
        type
      }
    });
  } else {
    wrapNodes(editor, {
      type,
      children: []
    });
  }
};
var wrapNodeChildren = (editor, element, options) => {
  const path = options === null || options === void 0 ? void 0 : options.at;
  const node = getNode(editor, path);
  if (!(node !== null && node !== void 0 && node.children))
    return;
  withoutNormalizing(editor, () => {
    const firstChildPath = path.concat([0]);
    wrapNodes(editor, element, {
      ...options,
      at: firstChildPath
    });
    if (node.children.length < 2)
      return;
    moveChildren(editor, {
      at: path,
      to: firstChildPath.concat([1]),
      fromStartIndex: 1
    });
  });
};
var KEY_EDITOR_PROTOCOL = "editorProtocol";
var withEditorProtocol = (editor) => {
  const {
    deleteBackward: deleteBackward2,
    deleteForward: deleteForward2,
    deleteFragment: deleteFragment2
  } = editor;
  const resetMarks = () => {
    if (isSelectionAtBlockStart(editor)) {
      removeSelectionMark(editor);
    }
  };
  editor.deleteBackward = (unit) => {
    deleteBackward2(unit);
    resetMarks();
  };
  editor.deleteForward = (unit) => {
    deleteForward2(unit);
    resetMarks();
  };
  editor.deleteFragment = (direction) => {
    deleteFragment2(direction);
    resetMarks();
  };
  return editor;
};
var createEditorProtocolPlugin = createPluginFactory({
  key: KEY_EDITOR_PROTOCOL,
  withOverrides: withEditorProtocol
});
var eventEditorStore = createStore4("event-editor")({
  blur: null,
  focus: null,
  last: null
});
var eventEditorActions = eventEditorStore.set;
var eventEditorSelectors = eventEditorStore.get;
var useEventEditorSelectors = eventEditorStore.use;
var KEY_EVENT_EDITOR = "event-editor";
var createEventEditorPlugin = createPluginFactory({
  key: KEY_EVENT_EDITOR,
  handlers: {
    onFocus: (editor) => () => {
      eventEditorActions.focus(editor.id);
    },
    onBlur: (editor) => () => {
      const focus = eventEditorSelectors.focus();
      if (focus === editor.id) {
        eventEditorActions.focus(null);
      }
      eventEditorActions.blur(editor.id);
    }
  }
});
var withTHistory = (editor) => withHistory(editor);
var createHistoryPlugin = createPluginFactory({
  key: "history",
  withOverrides: withTHistory
});
var KEY_INLINE_VOID = "inline-void";
var withInlineVoid = (editor) => {
  const {
    isInline: isInline2
  } = editor;
  const {
    isVoid: isVoid2
  } = editor;
  const inlineTypes = [];
  const voidTypes = [];
  editor.plugins.forEach((plugin) => {
    if (plugin.isInline) {
      inlineTypes.push(plugin.type);
    }
    if (plugin.isVoid) {
      voidTypes.push(plugin.type);
    }
  });
  editor.isInline = (element) => {
    return inlineTypes.includes(element.type) ? true : isInline2(element);
  };
  editor.isVoid = (element) => voidTypes.includes(element.type) ? true : isVoid2(element);
  return editor;
};
var createInlineVoidPlugin = createPluginFactory({
  key: KEY_INLINE_VOID,
  withOverrides: withInlineVoid
});
var getInjectedPlugins = (editor, plugin) => {
  const injectedPlugins = [];
  [...editor.plugins].reverse().forEach((p3) => {
    var _p$inject$pluginsByKe;
    const injectedPlugin = (_p$inject$pluginsByKe = p3.inject.pluginsByKey) === null || _p$inject$pluginsByKe === void 0 ? void 0 : _p$inject$pluginsByKe[plugin.key];
    if (injectedPlugin)
      injectedPlugins.push(injectedPlugin);
  });
  return [plugin, ...injectedPlugins];
};
var pipeInsertDataQuery = (plugins, {
  data,
  dataTransfer
}) => plugins.every((p3) => {
  var _p$editor, _p$editor$insertData;
  const query = (_p$editor = p3.editor) === null || _p$editor === void 0 ? void 0 : (_p$editor$insertData = _p$editor.insertData) === null || _p$editor$insertData === void 0 ? void 0 : _p$editor$insertData.query;
  return !query || query({
    data,
    dataTransfer
  });
});
var pipeInsertFragment = (editor, injectedPlugins, {
  fragment,
  ...options
}) => {
  withoutNormalizing(editor, () => {
    injectedPlugins.some((p3) => {
      var _p$editor, _p$editor$insertData, _p$editor$insertData$;
      return ((_p$editor = p3.editor) === null || _p$editor === void 0 ? void 0 : (_p$editor$insertData = _p$editor.insertData) === null || _p$editor$insertData === void 0 ? void 0 : (_p$editor$insertData$ = _p$editor$insertData.preInsert) === null || _p$editor$insertData$ === void 0 ? void 0 : _p$editor$insertData$.call(_p$editor$insertData, fragment, options)) === true;
    });
    editor.insertFragment(fragment);
  });
};
var pipeTransformData = (plugins, {
  data,
  dataTransfer
}) => {
  plugins.forEach((p3) => {
    var _p$editor, _p$editor$insertData;
    const transformData = (_p$editor = p3.editor) === null || _p$editor === void 0 ? void 0 : (_p$editor$insertData = _p$editor.insertData) === null || _p$editor$insertData === void 0 ? void 0 : _p$editor$insertData.transformData;
    if (!transformData)
      return;
    data = transformData(data, {
      dataTransfer
    });
  });
  return data;
};
var pipeTransformFragment = (plugins, {
  fragment,
  ...options
}) => {
  plugins.forEach((p3) => {
    var _p$editor, _p$editor$insertData;
    const transformFragment = (_p$editor = p3.editor) === null || _p$editor === void 0 ? void 0 : (_p$editor$insertData = _p$editor.insertData) === null || _p$editor$insertData === void 0 ? void 0 : _p$editor$insertData.transformFragment;
    if (!transformFragment)
      return;
    fragment = transformFragment(fragment, options);
  });
  return fragment;
};
var withInsertData = (editor) => {
  const {
    insertData: insertData2
  } = editor;
  editor.insertData = (dataTransfer) => {
    const inserted = [...editor.plugins].reverse().some((plugin) => {
      var _fragment;
      const insertDataOptions = plugin.editor.insertData;
      if (!insertDataOptions)
        return false;
      const injectedPlugins = getInjectedPlugins(editor, plugin);
      const {
        format,
        getFragment: getFragment2
      } = insertDataOptions;
      if (!format)
        return false;
      let data = dataTransfer.getData(format);
      if (!data)
        return;
      if (!pipeInsertDataQuery(injectedPlugins, {
        data,
        dataTransfer
      })) {
        return false;
      }
      data = pipeTransformData(injectedPlugins, {
        data,
        dataTransfer
      });
      let fragment = getFragment2 === null || getFragment2 === void 0 ? void 0 : getFragment2({
        data,
        dataTransfer
      });
      if (!((_fragment = fragment) !== null && _fragment !== void 0 && _fragment.length))
        return false;
      fragment = pipeTransformFragment(injectedPlugins, {
        fragment,
        data,
        dataTransfer
      });
      if (!fragment.length)
        return false;
      pipeInsertFragment(editor, injectedPlugins, {
        fragment,
        data,
        dataTransfer
      });
      return true;
    });
    if (inserted)
      return;
    insertData2(dataTransfer);
  };
  return editor;
};
var KEY_INSERT_DATA = "insertData";
var createInsertDataPlugin = createPluginFactory({
  key: KEY_INSERT_DATA,
  withOverrides: withInsertData
});
var KEY_NODE_FACTORY = "nodeFactory";
var createNodeFactoryPlugin = createPluginFactory({
  key: KEY_NODE_FACTORY,
  withOverrides: (editor) => {
    editor.blockFactory = (node) => ({
      type: getPluginType(editor, ELEMENT_DEFAULT),
      children: [{
        text: ""
      }],
      ...node
    });
    editor.childrenFactory = () => [editor.blockFactory()];
    return editor;
  }
});
var withTReact = (editor) => withReact(editor);
var createReactPlugin = createPluginFactory({
  key: "react",
  withOverrides: withTReact
});
var isInlineNode = (editor) => (node) => isText(node) || isElement(node) && editor.isInline(node);
var makeBlockLazy = (type) => () => ({
  type,
  children: []
});
var hasDifferentChildNodes = (descendants, isInline2) => {
  return descendants.some((descendant, index, arr) => {
    const prevDescendant = arr[index - 1];
    if (index !== 0) {
      return isInline2(descendant) !== isInline2(prevDescendant);
    }
    return false;
  });
};
var normalizeDifferentNodeTypes = (descendants, isInline2, makeDefaultBlock) => {
  const hasDifferentNodes = hasDifferentChildNodes(descendants, isInline2);
  const {
    fragment
  } = descendants.reduce((memo2, node) => {
    if (hasDifferentNodes && isInline2(node)) {
      let block = memo2.precedingBlock;
      if (!block) {
        block = makeDefaultBlock();
        memo2.precedingBlock = block;
        memo2.fragment.push(block);
      }
      block.children.push(node);
    } else {
      memo2.fragment.push(node);
      memo2.precedingBlock = null;
    }
    return memo2;
  }, {
    fragment: [],
    precedingBlock: null
  });
  return fragment;
};
var normalizeEmptyChildren = (descendants) => {
  if (!descendants.length) {
    return [{
      text: ""
    }];
  }
  return descendants;
};
var normalize = (descendants, isInline2, makeDefaultBlock) => {
  descendants = normalizeEmptyChildren(descendants);
  descendants = normalizeDifferentNodeTypes(descendants, isInline2, makeDefaultBlock);
  descendants = descendants.map((node) => {
    if (isElement(node)) {
      return {
        ...node,
        children: normalize(node.children, isInline2, makeDefaultBlock)
      };
    }
    return node;
  });
  return descendants;
};
var normalizeDescendantsToDocumentFragment = (editor, {
  descendants
}) => {
  const isInline2 = isInlineNode(editor);
  const defaultType = getPluginType(editor, ELEMENT_DEFAULT);
  const makeDefaultBlock = makeBlockLazy(defaultType);
  return normalize(descendants, isInline2, makeDefaultBlock);
};
function isObject2(o3) {
  return Object.prototype.toString.call(o3) === "[object Object]";
}
function isPlainObject2(o3) {
  var ctor, prot;
  if (isObject2(o3) === false)
    return false;
  ctor = o3.constructor;
  if (ctor === void 0)
    return true;
  prot = ctor.prototype;
  if (isObject2(prot) === false)
    return false;
  if (prot.hasOwnProperty("isPrototypeOf") === false) {
    return false;
  }
  return true;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var ANCHOR = /* @__PURE__ */ new WeakMap();
var FOCUS = /* @__PURE__ */ new WeakMap();
var Token = class {
};
var AnchorToken = class extends Token {
  constructor() {
    var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    super();
    var {
      offset,
      path
    } = props;
    this.offset = offset;
    this.path = path;
  }
};
var FocusToken = class extends Token {
  constructor() {
    var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    super();
    var {
      offset,
      path
    } = props;
    this.offset = offset;
    this.path = path;
  }
};
var addAnchorToken = (text, token) => {
  var offset = text.text.length;
  ANCHOR.set(text, [offset, token]);
};
var getAnchorOffset = (text) => {
  return ANCHOR.get(text);
};
var addFocusToken = (text, token) => {
  var offset = text.text.length;
  FOCUS.set(text, [offset, token]);
};
var getFocusOffset = (text) => {
  return FOCUS.get(text);
};
function ownKeys$1(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread$1(target) {
  for (var i3 = 1; i3 < arguments.length; i3++) {
    var source = arguments[i3] != null ? arguments[i3] : {};
    if (i3 % 2) {
      ownKeys$1(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
var STRINGS = /* @__PURE__ */ new WeakSet();
var resolveDescendants = (children) => {
  var nodes = [];
  var addChild = (child2) => {
    if (child2 == null) {
      return;
    }
    var prev = nodes[nodes.length - 1];
    if (typeof child2 === "string") {
      var text = {
        text: child2
      };
      STRINGS.add(text);
      child2 = text;
    }
    if (Text.isText(child2)) {
      var c3 = child2;
      if (Text.isText(prev) && STRINGS.has(prev) && STRINGS.has(c3) && Text.equals(prev, c3, {
        loose: true
      })) {
        prev.text += c3.text;
      } else {
        nodes.push(c3);
      }
    } else if (Element.isElement(child2)) {
      nodes.push(child2);
    } else if (child2 instanceof Token) {
      var n3 = nodes[nodes.length - 1];
      if (!Text.isText(n3)) {
        addChild("");
        n3 = nodes[nodes.length - 1];
      }
      if (child2 instanceof AnchorToken) {
        addAnchorToken(n3, child2);
      } else if (child2 instanceof FocusToken) {
        addFocusToken(n3, child2);
      }
    } else {
      throw new Error("Unexpected hyperscript child object: ".concat(child2));
    }
  };
  for (var child of children.flat(Infinity)) {
    addChild(child);
  }
  return nodes;
};
function createAnchor(tagName, attributes, children) {
  return new AnchorToken(attributes);
}
function createCursor(tagName, attributes, children) {
  return [new AnchorToken(attributes), new FocusToken(attributes)];
}
function createElement3(tagName, attributes, children) {
  return _objectSpread$1(_objectSpread$1({}, attributes), {}, {
    children: resolveDescendants(children)
  });
}
function createFocus(tagName, attributes, children) {
  return new FocusToken(attributes);
}
function createFragment(tagName, attributes, children) {
  return resolveDescendants(children);
}
function createSelection(tagName, attributes, children) {
  var anchor = children.find((c3) => c3 instanceof AnchorToken);
  var focus = children.find((c3) => c3 instanceof FocusToken);
  if (!anchor || anchor.offset == null || anchor.path == null) {
    throw new Error("The <selection> hyperscript tag must have an <anchor> tag as a child with `path` and `offset` attributes defined.");
  }
  if (!focus || focus.offset == null || focus.path == null) {
    throw new Error("The <selection> hyperscript tag must have a <focus> tag as a child with `path` and `offset` attributes defined.");
  }
  return _objectSpread$1({
    anchor: {
      offset: anchor.offset,
      path: anchor.path
    },
    focus: {
      offset: focus.offset,
      path: focus.path
    }
  }, attributes);
}
function createText(tagName, attributes, children) {
  var nodes = resolveDescendants(children);
  if (nodes.length > 1) {
    throw new Error("The <text> hyperscript tag must only contain a single node's worth of children.");
  }
  var [node] = nodes;
  if (node == null) {
    node = {
      text: ""
    };
  }
  if (!Text.isText(node)) {
    throw new Error("\n    The <text> hyperscript tag can only contain text content as children.");
  }
  STRINGS.delete(node);
  Object.assign(node, attributes);
  return node;
}
var createEditor2 = (makeEditor) => (tagName, attributes, children) => {
  var otherChildren = [];
  var selectionChild;
  for (var child of children) {
    if (Range.isRange(child)) {
      selectionChild = child;
    } else {
      otherChildren.push(child);
    }
  }
  var descendants = resolveDescendants(otherChildren);
  var selection = {};
  var editor = makeEditor();
  Object.assign(editor, attributes);
  editor.children = descendants;
  for (var [node, path] of Node2.texts(editor)) {
    var anchor = getAnchorOffset(node);
    var focus = getFocusOffset(node);
    if (anchor != null) {
      var [offset] = anchor;
      selection.anchor = {
        path,
        offset
      };
    }
    if (focus != null) {
      var [_offset] = focus;
      selection.focus = {
        path,
        offset: _offset
      };
    }
  }
  if (selection.anchor && !selection.focus) {
    throw new Error("Slate hyperscript ranges must have both `<anchor />` and `<focus />` defined if one is defined, but you only defined `<anchor />`. For collapsed selections, use `<cursor />` instead.");
  }
  if (!selection.anchor && selection.focus) {
    throw new Error("Slate hyperscript ranges must have both `<anchor />` and `<focus />` defined if one is defined, but you only defined `<focus />`. For collapsed selections, use `<cursor />` instead.");
  }
  if (selectionChild != null) {
    editor.selection = selectionChild;
  } else if (Range.isRange(selection)) {
    editor.selection = selection;
  }
  return editor;
};
function ownKeys(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread(target) {
  for (var i3 = 1; i3 < arguments.length; i3++) {
    var source = arguments[i3] != null ? arguments[i3] : {};
    if (i3 % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
var DEFAULT_CREATORS = {
  anchor: createAnchor,
  cursor: createCursor,
  editor: createEditor2(createEditor),
  element: createElement3,
  focus: createFocus,
  fragment: createFragment,
  selection: createSelection,
  text: createText
};
var createHyperscript = function createHyperscript2() {
  var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var {
    elements = {}
  } = options;
  var elementCreators = normalizeElements(elements);
  var creators = _objectSpread(_objectSpread(_objectSpread({}, DEFAULT_CREATORS), elementCreators), options.creators);
  var jsx3 = createFactory(creators);
  return jsx3;
};
var createFactory = (creators) => {
  var jsx3 = function jsx4(tagName, attributes) {
    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }
    var creator = creators[tagName];
    if (!creator) {
      throw new Error("No hyperscript creator found for tag: <".concat(tagName, ">"));
    }
    if (attributes == null) {
      attributes = {};
    }
    if (!isPlainObject2(attributes)) {
      children = [attributes].concat(children);
      attributes = {};
    }
    children = children.filter((child) => Boolean(child)).flat();
    var ret = creator(tagName, attributes, children);
    return ret;
  };
  return jsx3;
};
var normalizeElements = (elements) => {
  var creators = {};
  var _loop = function _loop2(tagName2) {
    var props = elements[tagName2];
    if (typeof props !== "object") {
      throw new Error("Properties specified for a hyperscript shorthand should be an object, but for the custom element <".concat(tagName2, ">  tag you passed: ").concat(props));
    }
    creators[tagName2] = (tagName3, attributes, children) => {
      return createElement3("element", _objectSpread(_objectSpread({}, props), attributes), children);
    };
  };
  for (var tagName in elements) {
    _loop(tagName);
  }
  return creators;
};
var jsx2 = createHyperscript();
var deserializeHtmlNodeChildren = (editor, node) => Array.from(node.childNodes).map(deserializeHtmlNode(editor)).flat();
var htmlBodyToFragment = (editor, element) => {
  if (element.nodeName === "BODY") {
    return jsx2("fragment", {}, deserializeHtmlNodeChildren(editor, element));
  }
};
var htmlBrToNewLine = (node) => {
  if (node.nodeName === "BR") {
    return "\n";
  }
};
var pluginDeserializeHtml = (editor, plugin, {
  element: el,
  deserializeLeaf
}) => {
  var _getNode;
  const {
    deserializeHtml: deserializeHtml2,
    isElement: isElementRoot,
    isLeaf: isLeafRoot,
    type
  } = plugin;
  if (!deserializeHtml2)
    return;
  const {
    attributeNames,
    query,
    isLeaf: isLeafRule,
    isElement: isElementRule,
    rules
  } = deserializeHtml2;
  let {
    getNode: getNode2
  } = deserializeHtml2;
  const isElement2 = isElementRule || isElementRoot;
  const isLeaf = isLeafRule || isLeafRoot;
  if (!deserializeLeaf && !isElement2) {
    return;
  }
  if (deserializeLeaf && !isLeaf) {
    return;
  }
  if (rules) {
    const isValid = rules.some(({
      validNodeName = "*",
      validStyle,
      validClassName,
      validAttribute
    }) => {
      if (validNodeName) {
        const validNodeNames = castArray_1(validNodeName);
        if (validNodeNames.length && !validNodeNames.includes(el.nodeName) && validNodeName !== "*")
          return false;
      }
      if (validClassName && !el.classList.contains(validClassName))
        return false;
      if (validStyle) {
        for (const [key, value] of Object.entries(validStyle)) {
          var _plugin$inject$props;
          const values2 = castArray_1(value);
          if (!values2.includes(el.style[key]) && value !== "*")
            return;
          if (value === "*" && !el.style[key])
            return;
          const defaultNodeValue = (_plugin$inject$props = plugin.inject.props) === null || _plugin$inject$props === void 0 ? void 0 : _plugin$inject$props.defaultNodeValue;
          if (defaultNodeValue && defaultNodeValue === el.style[key]) {
            return false;
          }
        }
      }
      if (validAttribute) {
        if (typeof validAttribute === "string") {
          if (!el.getAttributeNames().includes(validAttribute))
            return false;
        } else {
          for (const [attributeName, attributeValue] of Object.entries(validAttribute)) {
            const attributeValues = castArray_1(attributeValue);
            const elAttribute = el.getAttribute(attributeName);
            if (!elAttribute || !attributeValues.includes(elAttribute))
              return false;
          }
        }
      }
      return true;
    });
    if (!isValid)
      return;
  }
  if (query && !query(el)) {
    return;
  }
  if (!getNode2) {
    if (isElement2) {
      getNode2 = () => ({
        type
      });
    } else if (isLeaf) {
      getNode2 = () => ({
        [type]: true
      });
    } else {
      return;
    }
  }
  let node = (_getNode = getNode2(el, {})) !== null && _getNode !== void 0 ? _getNode : {};
  if (!Object.keys(node).length)
    return;
  const injectedPlugins = getInjectedPlugins(editor, plugin);
  injectedPlugins.forEach((injectedPlugin) => {
    var _injectedPlugin$deser, _injectedPlugin$deser2;
    const res = (_injectedPlugin$deser = injectedPlugin.deserializeHtml) === null || _injectedPlugin$deser === void 0 ? void 0 : (_injectedPlugin$deser2 = _injectedPlugin$deser.getNode) === null || _injectedPlugin$deser2 === void 0 ? void 0 : _injectedPlugin$deser2.call(_injectedPlugin$deser, el, node);
    if (res) {
      node = {
        ...node,
        ...res
      };
    }
  });
  if (attributeNames) {
    const elementAttributes = {};
    const elementAttributeNames = el.getAttributeNames();
    for (const elementAttributeName of elementAttributeNames) {
      if (attributeNames.includes(elementAttributeName)) {
        elementAttributes[elementAttributeName] = el.getAttribute(elementAttributeName);
      }
    }
    if (Object.keys(elementAttributes).length) {
      node.attributes = elementAttributes;
    }
  }
  return {
    ...deserializeHtml2,
    node
  };
};
var pipeDeserializeHtmlElement = (editor, element) => {
  let result;
  [...editor.plugins].reverse().some((plugin) => {
    result = pluginDeserializeHtml(editor, plugin, {
      element
    });
    return !!result;
  });
  return result;
};
var htmlElementToElement = (editor, element) => {
  const deserialized = pipeDeserializeHtmlElement(editor, element);
  if (deserialized) {
    var _node$children;
    const {
      node,
      withoutChildren
    } = deserialized;
    let descendants = (_node$children = node.children) !== null && _node$children !== void 0 ? _node$children : deserializeHtmlNodeChildren(editor, element);
    if (!descendants.length || withoutChildren) {
      descendants = [{
        text: ""
      }];
    }
    return jsx2("element", node, descendants);
  }
};
var merge = _createAssigner(function(object, source, srcIndex) {
  _baseMerge(object, source, srcIndex);
});
var merge_1 = merge;
var mergeDeepToNodes = (options) => {
  applyDeepToNodes({
    ...options,
    apply: merge_1
  });
};
var pipeDeserializeHtmlLeaf = (editor, element) => {
  let node = {};
  [...editor.plugins].reverse().forEach((plugin) => {
    const deserialized = pluginDeserializeHtml(editor, plugin, {
      element,
      deserializeLeaf: true
    });
    if (!deserialized)
      return;
    node = {
      ...node,
      ...deserialized.node
    };
  });
  return node;
};
var htmlElementToLeaf = (editor, element) => {
  const node = pipeDeserializeHtmlLeaf(editor, element);
  return deserializeHtmlNodeChildren(editor, element).reduce((arr, child) => {
    if (!child)
      return arr;
    if (isElement(child)) {
      if (Object.keys(node).length) {
        mergeDeepToNodes({
          node: child,
          source: node,
          query: {
            filter: ([n3]) => isText(n3)
          }
        });
      }
      arr.push(child);
    } else {
      const attributes = {
        ...node
      };
      if (isText(child) && child.text) {
        Object.keys(attributes).forEach((key) => {
          if (attributes[key] && child[key]) {
            attributes[key] = child[key];
          }
        });
      }
      arr.push(jsx2("text", attributes, child));
    }
    return arr;
  }, []);
};
var isHtmlText = (node) => node.nodeType === Node.TEXT_NODE;
var htmlTextNodeToString = (node) => {
  if (isHtmlText(node)) {
    var _node$textContent$rep, _node$textContent;
    const trimmedText = (_node$textContent$rep = (_node$textContent = node.textContent) === null || _node$textContent === void 0 ? void 0 : _node$textContent.replace(/^\n+|\n+$/g, "")) !== null && _node$textContent$rep !== void 0 ? _node$textContent$rep : "";
    return trimmedText.length > 0 ? trimmedText : null;
  }
};
var isHtmlElement = (node) => node.nodeType === Node.ELEMENT_NODE;
var deserializeHtmlNode = (editor) => (node) => {
  const textNode = htmlTextNodeToString(node);
  if (textNode)
    return textNode;
  if (!isHtmlElement(node))
    return null;
  const breakLine = htmlBrToNewLine(node);
  if (breakLine)
    return breakLine;
  const fragment = htmlBodyToFragment(editor, node);
  if (fragment)
    return fragment;
  const element = htmlElementToElement(editor, node);
  if (element)
    return element;
  return htmlElementToLeaf(editor, node);
};
var deserializeHtmlElement = (editor, element) => {
  return deserializeHtmlNode(editor)(element);
};
var htmlStringToDOMNode = (rawHtml, stripWhitespace = true) => {
  const node = document.createElement("body");
  node.innerHTML = rawHtml;
  if (stripWhitespace) {
    node.innerHTML = node.innerHTML.replace(/(\r\n|\n|\r|\t)/gm, "");
  }
  return node;
};
var deserializeHtml = (editor, {
  element,
  stripWhitespace = true
}) => {
  if (typeof element === "string") {
    element = htmlStringToDOMNode(element, stripWhitespace);
  }
  const fragment = deserializeHtmlElement(editor, element);
  return normalizeDescendantsToDocumentFragment(editor, {
    descendants: fragment
  });
};
var parseHtmlDocument = (html) => {
  return new DOMParser().parseFromString(html, "text/html");
};
var KEY_DESERIALIZE_HTML = "deserializeHtml";
var createDeserializeHtmlPlugin = createPluginFactory({
  key: KEY_DESERIALIZE_HTML,
  then: (editor) => ({
    editor: {
      insertData: {
        format: "text/html",
        getFragment: ({
          data
        }) => {
          const document2 = parseHtmlDocument(data);
          return deserializeHtml(editor, {
            element: document2.body
          });
        }
      }
    }
  })
});
var KEY_PREV_SELECTION = "prevSelection";
var createPrevSelectionPlugin = createPluginFactory({
  key: KEY_PREV_SELECTION,
  handlers: {
    onKeyDown: (editor) => (e3) => {
      e3.persist();
      editor.currentKeyboardEvent = e3;
    }
  },
  withOverrides: (editor) => {
    const {
      apply: apply2
    } = editor;
    editor.apply = (operation) => {
      if (operation.type === "set_selection") {
        const {
          properties
        } = operation;
        editor.prevSelection = properties;
        apply2(operation);
        editor.currentKeyboardEvent = null;
        return;
      }
      apply2(operation);
    };
    return editor;
  }
});
var onKeyDownToggleElement = (editor, {
  type,
  options: {
    hotkey
  }
}) => (e3) => {
  const defaultType = getPluginType(editor, ELEMENT_DEFAULT);
  if (!hotkey)
    return;
  const hotkeys = castArray_1(hotkey);
  for (const _hotkey of hotkeys) {
    if (isHotkey(_hotkey, e3)) {
      e3.preventDefault();
      toggleNodeType(editor, {
        activeType: type,
        inactiveType: defaultType
      });
      return;
    }
  }
};
var onKeyDownToggleMark = (editor, {
  type,
  options: {
    hotkey,
    clear
  }
}) => (e3) => {
  if (!hotkey)
    return;
  if (isHotkey(hotkey, e3)) {
    e3.preventDefault();
    toggleMark(editor, {
      key: type,
      clear
    });
  }
};
var CARRIAGE_RETURN = "\r";
var LINE_FEED = "\n";
var NO_BREAK_SPACE = "\xA0";
var SPACE = " ";
var TAB = "	";
var ZERO_WIDTH_SPACE = "\u200B";
var traverseHtmlNode = (node, callback) => {
  const keepTraversing = callback(node);
  if (!keepTraversing) {
    return;
  }
  let child = node.firstChild;
  while (child) {
    const currentChild = child;
    const previousChild = child.previousSibling;
    child = child.nextSibling;
    traverseHtmlNode(currentChild, callback);
    if (!currentChild.previousSibling && !currentChild.nextSibling && !currentChild.parentNode && child && previousChild !== child.previousSibling && child.parentNode) {
      if (previousChild) {
        child = previousChild.nextSibling;
      } else {
        child = node.firstChild;
      }
    } else if (!currentChild.previousSibling && !currentChild.nextSibling && !currentChild.parentNode && child && !child.previousSibling && !child.nextSibling && !child.parentNode) {
      if (previousChild) {
        if (previousChild.nextSibling) {
          child = previousChild.nextSibling.nextSibling;
        } else {
          child = null;
        }
      } else if (node.firstChild) {
        child = node.firstChild.nextSibling;
      }
    }
  }
};
var traverseHtmlElements = (rootNode, callback) => {
  traverseHtmlNode(rootNode, (node) => {
    if (!isHtmlElement(node)) {
      return true;
    }
    return callback(node);
  });
};
var cleanHtmlBrElements = (rootNode) => {
  traverseHtmlElements(rootNode, (element) => {
    if (element.tagName !== "BR") {
      return true;
    }
    const replacementTextNode = document.createTextNode(LINE_FEED);
    if (element.parentElement) {
      element.parentElement.replaceChild(replacementTextNode, element);
    }
    return false;
  });
};
var cleanHtmlCrLf = (html) => {
  return html.replace(/(\r\n|\r)/gm, "\n");
};
var ALLOWED_EMPTY_ELEMENTS = ["BR", "IMG"];
var isEmpty = (element) => {
  return !ALLOWED_EMPTY_ELEMENTS.includes(element.nodeName) && !element.innerHTML.trim();
};
var removeIfEmpty = (element) => {
  if (isEmpty(element)) {
    const {
      parentElement
    } = element;
    element.remove();
    if (parentElement) {
      removeIfEmpty(parentElement);
    }
  }
};
var cleanHtmlEmptyElements = (rootNode) => {
  traverseHtmlElements(rootNode, (element) => {
    removeIfEmpty(element);
    return true;
  });
};
var replaceTagName = (element, tagName) => {
  const newElement = document.createElement(tagName);
  newElement.innerHTML = element.innerHTML;
  for (const {
    name
  } of element.attributes) {
    const value = element.getAttribute(name);
    if (value) {
      newElement.setAttribute(name, value);
    }
  }
  if (element.parentNode) {
    element.parentNode.replaceChild(newElement, element);
  }
  return newElement;
};
var cleanHtmlFontElements = (rootNode) => {
  traverseHtmlElements(rootNode, (element) => {
    if (element.tagName === "FONT") {
      if (element.textContent) {
        replaceTagName(element, "span");
      } else {
        element.remove();
      }
    }
    return true;
  });
};
var isHtmlFragmentHref = (href) => href.startsWith("#");
var unwrapHtmlElement = (element) => {
  element.outerHTML = element.innerHTML;
};
var cleanHtmlLinkElements = (rootNode) => {
  traverseHtmlElements(rootNode, (element) => {
    if (element.tagName !== "A") {
      return true;
    }
    const href = element.getAttribute("href");
    if (!href || isHtmlFragmentHref(href)) {
      unwrapHtmlElement(element);
    }
    if (href && element.querySelector("img")) {
      for (const span of element.querySelectorAll("span")) {
        if (!span.innerText) {
          unwrapHtmlElement(span);
        }
      }
    }
    return true;
  });
};
var traverseHtmlTexts = (rootNode, callback) => {
  traverseHtmlNode(rootNode, (node) => {
    if (!isHtmlText(node)) {
      return true;
    }
    return callback(node);
  });
};
var cleanHtmlTextNodes = (rootNode) => {
  traverseHtmlTexts(rootNode, (textNode) => {
    if (/^\n\s*$/.test(textNode.data) && (textNode.previousElementSibling || textNode.nextElementSibling)) {
      textNode.remove();
      return true;
    }
    textNode.data = textNode.data.replace(/\n\s*/g, "\n");
    if (textNode.data.includes(CARRIAGE_RETURN) || textNode.data.includes(LINE_FEED) || textNode.data.includes(NO_BREAK_SPACE)) {
      const hasSpace = textNode.data.includes(SPACE);
      const hasNonWhitespace = /\S/.test(textNode.data);
      const hasLineFeed = textNode.data.includes(LINE_FEED);
      if (!(hasSpace || hasNonWhitespace) && !hasLineFeed) {
        if (textNode.data === NO_BREAK_SPACE) {
          textNode.data = SPACE;
          return true;
        }
        textNode.remove();
        return true;
      }
      if (textNode.previousSibling && textNode.previousSibling.nodeName === "BR" && textNode.parentElement) {
        textNode.parentElement.removeChild(textNode.previousSibling);
        const matches = textNode.data.match(/^[\r\n]+/);
        const offset = matches ? matches[0].length : 0;
        textNode.data = textNode.data.substring(offset).replace(new RegExp(LINE_FEED, "g"), SPACE).replace(new RegExp(CARRIAGE_RETURN, "g"), SPACE);
        textNode.data = `
${textNode.data}`;
      } else {
        textNode.data = textNode.data.replace(new RegExp(LINE_FEED, "g"), SPACE).replace(new RegExp(CARRIAGE_RETURN, "g"), SPACE);
      }
    }
    return true;
  });
};
var isHtmlBlockElement = (element) => {
  const blockRegex = /^(address|blockquote|body|center|dir|div|dl|fieldset|form|h[1-6]|hr|isindex|menu|noframes|noscript|ol|p|pre|table|ul|dd|dt|frameset|li|tbody|td|tfoot|th|thead|tr|html)$/i;
  return blockRegex.test(element.nodeName);
};
var copyBlockMarksToSpanChild = (rootNode) => {
  traverseHtmlElements(rootNode, (element) => {
    const el = element;
    const styleAttribute = element.getAttribute("style");
    if (!styleAttribute)
      return true;
    if (isHtmlBlockElement(el)) {
      const {
        style: {
          backgroundColor,
          color,
          fontFamily,
          fontSize,
          fontStyle,
          fontWeight,
          textDecoration
        }
      } = el;
      if (backgroundColor || color || fontFamily || fontSize || fontStyle || fontWeight || textDecoration) {
        const span = document.createElement("span");
        if (!["initial", "inherit"].includes(color)) {
          span.style.color = color;
        }
        span.style.fontFamily = fontFamily;
        span.style.fontSize = fontSize;
        if (!["normal", "initial", "inherit"].includes(color)) {
          span.style.fontStyle = fontStyle;
        }
        if (!["normal", 400].includes(fontWeight)) {
          span.style.fontWeight = fontWeight;
        }
        span.style.textDecoration = textDecoration;
        span.innerHTML = el.innerHTML;
        element.innerHTML = span.outerHTML;
      }
    }
    return true;
  });
};
var findHtmlElement = (rootNode, predicate) => {
  let res = null;
  traverseHtmlElements(rootNode, (node) => {
    if (predicate(node)) {
      res = node;
      return false;
    }
    return true;
  });
  return res;
};
var someHtmlElement = (rootNode, predicate) => {
  return !!findHtmlElement(rootNode, predicate);
};
var acceptNode = () => NodeFilter.FILTER_ACCEPT;
var getHtmlComments = (node) => {
  const comments = [];
  const iterator = document.createNodeIterator(node, NodeFilter.SHOW_COMMENT, {
    acceptNode
  });
  let currentNode = iterator.nextNode();
  while (currentNode) {
    if (currentNode.nodeValue) {
      comments.push(currentNode.nodeValue);
    }
    currentNode = iterator.nextNode();
  }
  return comments;
};
var isHtmlComment = (node) => node.nodeType === Node.COMMENT_NODE;
var isOlSymbol = (symbol) => {
  return /[0-9a-np-z]\S/g.test(symbol.toLowerCase());
};
var parseHtmlElement = (html) => {
  const {
    body
  } = parseHtmlDocument(html);
  return body.firstElementChild;
};
var postCleanHtml = (html) => {
  const cleanHtml = html.trim().replace(new RegExp(ZERO_WIDTH_SPACE, "g"), "");
  return `<body>${cleanHtml}</body>`;
};
var removeBeforeHtml = (html) => {
  const index = html.indexOf("<html");
  if (index === -1) {
    return html;
  }
  return html.substring(index);
};
var removeAfterHtml = (html) => {
  const index = html.lastIndexOf("</html>");
  if (index === -1) {
    return html;
  }
  return html.substring(0, index + "</html>".length);
};
var removeHtmlSurroundings = (html) => {
  return removeBeforeHtml(removeAfterHtml(html));
};
var cleaners = [removeHtmlSurroundings, cleanHtmlCrLf];
var preCleanHtml = (html) => {
  return cleaners.reduce((result, clean) => clean(result), html);
};
var traverseHtmlComments = (rootNode, callback) => {
  traverseHtmlNode(rootNode, (node) => {
    if (!isHtmlComment(node)) {
      return true;
    }
    return callback(node);
  });
};
var removeHtmlNodesBetweenComments = (rootNode, start, end) => {
  const isClosingComment = (node) => isHtmlComment(node) && node.data === end;
  traverseHtmlComments(rootNode, (comment) => {
    if (comment.data === start) {
      let node = comment.nextSibling;
      comment.remove();
      while (node && !isClosingComment(node)) {
        const {
          nextSibling
        } = node;
        node.remove();
        node = nextSibling;
      }
      if (node && isClosingComment(node)) {
        node.remove();
      }
    }
    return true;
  });
};
function arrayAggregator(array, setter, iteratee, accumulator) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    var value = array[index];
    setter(accumulator, value, iteratee(value), array);
  }
  return accumulator;
}
var _arrayAggregator = arrayAggregator;
function baseAggregator(collection, setter, iteratee, accumulator) {
  _baseEach(collection, function(value, key, collection2) {
    setter(accumulator, value, iteratee(value), collection2);
  });
  return accumulator;
}
var _baseAggregator = baseAggregator;
function createAggregator(setter, initializer) {
  return function(collection, iteratee) {
    var func = isArray_1(collection) ? _arrayAggregator : _baseAggregator, accumulator = initializer ? initializer() : {};
    return func(collection, setter, _baseIteratee(iteratee), accumulator);
  };
}
var _createAggregator = createAggregator;
var keyBy = _createAggregator(function(result, value, key) {
  _baseAssignValue(result, key, value);
});
var keyBy_1 = keyBy;
function baseValues(object, props) {
  return _arrayMap(props, function(key) {
    return object[key];
  });
}
var _baseValues = baseValues;
function values(object) {
  return object == null ? [] : _baseValues(object, keys_1(object));
}
var values_1 = values;
var mergeDeepPlugins = (editor, _plugin) => {
  const plugin = {
    ..._plugin
  };
  const {
    then
  } = plugin;
  if (then) {
    delete plugin.then;
    const {
      plugins: pluginPlugins
    } = plugin;
    const pluginThen = mergeDeepPlugins(editor, defaultsDeep_1(then(editor, plugin), plugin));
    if (pluginPlugins && pluginThen.plugins) {
      const merged = merge_1(keyBy_1(pluginPlugins, "key"), keyBy_1(pluginThen.plugins, "key"));
      pluginThen.plugins = values_1(merged);
    }
    return pluginThen;
  }
  return plugin;
};
var setDefaultPlugin = (plugin) => {
  if (plugin.type === void 0)
    plugin.type = plugin.key;
  if (!plugin.options)
    plugin.options = {};
  if (!plugin.inject)
    plugin.inject = {};
  if (!plugin.editor)
    plugin.editor = {};
  return plugin;
};
var flattenDeepPlugins = (editor, plugins) => {
  if (!plugins)
    return;
  plugins.forEach((plugin) => {
    let p3 = setDefaultPlugin(plugin);
    p3 = mergeDeepPlugins(editor, p3);
    if (!editor.pluginsByKey[p3.key]) {
      editor.plugins.push(p3);
      editor.pluginsByKey[p3.key] = p3;
    } else {
      const index = editor.plugins.indexOf(editor.pluginsByKey[p3.key]);
      const mergedPlugin = defaultsDeep_1(p3, editor.pluginsByKey[p3.key]);
      if (index >= 0) {
        editor.plugins[index] = mergedPlugin;
      }
      editor.pluginsByKey[p3.key] = mergedPlugin;
    }
    flattenDeepPlugins(editor, p3.plugins);
  });
};
var setPlatePlugins = (editor, {
  disableCorePlugins,
  plugins: _plugins = []
}) => {
  let plugins = [];
  if (disableCorePlugins !== true) {
    const dcp = disableCorePlugins;
    if (typeof dcp !== "object" || !(dcp !== null && dcp !== void 0 && dcp.react)) {
      var _ref, _editor$pluginsByKey;
      plugins.push((_ref = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey = editor.pluginsByKey) === null || _editor$pluginsByKey === void 0 ? void 0 : _editor$pluginsByKey.react) !== null && _ref !== void 0 ? _ref : createReactPlugin());
    }
    if (typeof dcp !== "object" || !(dcp !== null && dcp !== void 0 && dcp.history)) {
      var _ref2, _editor$pluginsByKey2;
      plugins.push((_ref2 = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey2 = editor.pluginsByKey) === null || _editor$pluginsByKey2 === void 0 ? void 0 : _editor$pluginsByKey2.history) !== null && _ref2 !== void 0 ? _ref2 : createHistoryPlugin());
    }
    if (typeof dcp !== "object" || !(dcp !== null && dcp !== void 0 && dcp.nodeFactory)) {
      var _ref3, _editor$pluginsByKey3;
      plugins.push((_ref3 = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey3 = editor.pluginsByKey) === null || _editor$pluginsByKey3 === void 0 ? void 0 : _editor$pluginsByKey3[KEY_NODE_FACTORY]) !== null && _ref3 !== void 0 ? _ref3 : createNodeFactoryPlugin());
    }
    if (typeof dcp !== "object" || !(dcp !== null && dcp !== void 0 && dcp.eventEditor)) {
      var _ref4, _editor$pluginsByKey4;
      plugins.push((_ref4 = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey4 = editor.pluginsByKey) === null || _editor$pluginsByKey4 === void 0 ? void 0 : _editor$pluginsByKey4[KEY_EVENT_EDITOR]) !== null && _ref4 !== void 0 ? _ref4 : createEventEditorPlugin());
    }
    if (typeof dcp !== "object" || !(dcp !== null && dcp !== void 0 && dcp.inlineVoid)) {
      var _ref5, _editor$pluginsByKey5;
      plugins.push((_ref5 = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey5 = editor.pluginsByKey) === null || _editor$pluginsByKey5 === void 0 ? void 0 : _editor$pluginsByKey5[KEY_INLINE_VOID]) !== null && _ref5 !== void 0 ? _ref5 : createInlineVoidPlugin());
    }
    if (typeof dcp !== "object" || !(dcp !== null && dcp !== void 0 && dcp.insertData)) {
      var _ref6, _editor$pluginsByKey6;
      plugins.push((_ref6 = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey6 = editor.pluginsByKey) === null || _editor$pluginsByKey6 === void 0 ? void 0 : _editor$pluginsByKey6[KEY_INSERT_DATA]) !== null && _ref6 !== void 0 ? _ref6 : createInsertDataPlugin());
    }
    if (typeof dcp !== "object" || !(dcp !== null && dcp !== void 0 && dcp.selection)) {
      var _ref7, _editor$pluginsByKey7;
      plugins.push((_ref7 = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey7 = editor.pluginsByKey) === null || _editor$pluginsByKey7 === void 0 ? void 0 : _editor$pluginsByKey7[KEY_PREV_SELECTION]) !== null && _ref7 !== void 0 ? _ref7 : createPrevSelectionPlugin());
    }
    if (typeof dcp !== "object" || !(dcp !== null && dcp !== void 0 && dcp.deserializeHtml)) {
      var _ref8, _editor$pluginsByKey8;
      plugins.push((_ref8 = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey8 = editor.pluginsByKey) === null || _editor$pluginsByKey8 === void 0 ? void 0 : _editor$pluginsByKey8[KEY_DESERIALIZE_HTML]) !== null && _ref8 !== void 0 ? _ref8 : createDeserializeHtmlPlugin());
    }
    if (typeof dcp !== "object" || !(dcp !== null && dcp !== void 0 && dcp.deserializeAst)) {
      var _ref9, _editor$pluginsByKey9;
      plugins.push((_ref9 = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey9 = editor.pluginsByKey) === null || _editor$pluginsByKey9 === void 0 ? void 0 : _editor$pluginsByKey9[KEY_DESERIALIZE_AST]) !== null && _ref9 !== void 0 ? _ref9 : createDeserializeAstPlugin());
    }
    if (typeof dcp !== "object" || !(dcp !== null && dcp !== void 0 && dcp.editorProtocol)) {
      var _ref10, _editor$pluginsByKey10;
      plugins.push((_ref10 = editor === null || editor === void 0 ? void 0 : (_editor$pluginsByKey10 = editor.pluginsByKey) === null || _editor$pluginsByKey10 === void 0 ? void 0 : _editor$pluginsByKey10[KEY_EDITOR_PROTOCOL]) !== null && _ref10 !== void 0 ? _ref10 : createEditorProtocolPlugin());
    }
  }
  plugins = [...plugins, ..._plugins];
  editor.plugins = [];
  editor.pluginsByKey = {};
  flattenDeepPlugins(editor, plugins);
  editor.plugins.forEach((plugin) => {
    if (plugin.overrideByKey) {
      const newPlugins = editor.plugins.map((p3) => {
        return overridePluginsByKey(p3, plugin.overrideByKey);
      });
      editor.plugins = [];
      editor.pluginsByKey = {};
      flattenDeepPlugins(editor, newPlugins);
    }
  });
};
var withPlate = (e3, {
  id,
  plugins = [],
  disableCorePlugins
} = {}) => {
  let editor = e3;
  editor.id = id !== null && id !== void 0 ? id : editor.id;
  editor.prevSelection = null;
  editor.currentKeyboardEvent = null;
  if (!editor.key) {
    editor.key = Math.random();
  }
  setPlatePlugins(editor, {
    plugins,
    disableCorePlugins
  });
  editor.plugins.forEach((plugin) => {
    if (plugin.withOverrides) {
      editor = plugin.withOverrides(editor, plugin);
    }
  });
  return editor;
};
var createTEditor = () => createEditor();
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var _arrayEach = arrayEach;
function baseAssign(object, source) {
  return object && _copyObject(source, keys_1(source), object);
}
var _baseAssign = baseAssign;
function baseAssignIn(object, source) {
  return object && _copyObject(source, keysIn_1(source), object);
}
var _baseAssignIn = baseAssignIn;
function copySymbols(source, object) {
  return _copyObject(source, _getSymbols(source), object);
}
var _copySymbols = copySymbols;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols ? stubArray_1 : function(object) {
  var result = [];
  while (object) {
    _arrayPush(result, _getSymbols(object));
    object = _getPrototype(object);
  }
  return result;
};
var _getSymbolsIn = getSymbolsIn;
function copySymbolsIn(source, object) {
  return _copyObject(source, _getSymbolsIn(source), object);
}
var _copySymbolsIn = copySymbolsIn;
function getAllKeysIn(object) {
  return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
}
var _getAllKeysIn = getAllKeysIn;
var objectProto2 = Object.prototype;
var hasOwnProperty2 = objectProto2.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty2.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var _initCloneArray = initCloneArray;
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var _cloneDataView = cloneDataView;
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var _cloneRegExp = cloneRegExp;
var symbolProto2 = _Symbol2 ? _Symbol2.prototype : void 0;
var symbolValueOf2 = symbolProto2 ? symbolProto2.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf2 ? Object(symbolValueOf2.call(symbol)) : {};
}
var _cloneSymbol = cloneSymbol;
var boolTag$12 = "[object Boolean]";
var dateTag$12 = "[object Date]";
var mapTag$22 = "[object Map]";
var numberTag$12 = "[object Number]";
var regexpTag$12 = "[object RegExp]";
var setTag$22 = "[object Set]";
var stringTag$12 = "[object String]";
var symbolTag$1 = "[object Symbol]";
var arrayBufferTag$12 = "[object ArrayBuffer]";
var dataViewTag$1 = "[object DataView]";
var float32Tag$1 = "[object Float32Array]";
var float64Tag$1 = "[object Float64Array]";
var int8Tag$1 = "[object Int8Array]";
var int16Tag$1 = "[object Int16Array]";
var int32Tag$1 = "[object Int32Array]";
var uint8Tag$1 = "[object Uint8Array]";
var uint8ClampedTag$1 = "[object Uint8ClampedArray]";
var uint16Tag$1 = "[object Uint16Array]";
var uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$12:
      return _cloneArrayBuffer(object);
    case boolTag$12:
    case dateTag$12:
      return new Ctor(+object);
    case dataViewTag$1:
      return _cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return _cloneTypedArray(object, isDeep);
    case mapTag$22:
      return new Ctor();
    case numberTag$12:
    case stringTag$12:
      return new Ctor(object);
    case regexpTag$12:
      return _cloneRegExp(object);
    case setTag$22:
      return new Ctor();
    case symbolTag$1:
      return _cloneSymbol(object);
  }
}
var _initCloneByTag = initCloneByTag;
var mapTag$1 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike_12(value) && _getTag(value) == mapTag$1;
}
var _baseIsMap = baseIsMap;
var nodeIsMap = _nodeUtil2 && _nodeUtil2.isMap;
var isMap = nodeIsMap ? _baseUnary2(nodeIsMap) : _baseIsMap;
var isMap_1 = isMap;
var setTag$1 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike_12(value) && _getTag(value) == setTag$1;
}
var _baseIsSet = baseIsSet;
var nodeIsSet = _nodeUtil2 && _nodeUtil2.isSet;
var isSet = nodeIsSet ? _baseUnary2(nodeIsSet) : _baseIsSet;
var isSet_1 = isSet;
var CLONE_DEEP_FLAG$2 = 1;
var CLONE_FLAT_FLAG$1 = 2;
var CLONE_SYMBOLS_FLAG$2 = 4;
var argsTag = "[object Arguments]";
var arrayTag = "[object Array]";
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var funcTag2 = "[object Function]";
var genTag2 = "[object GeneratorFunction]";
var mapTag2 = "[object Map]";
var numberTag = "[object Number]";
var objectTag = "[object Object]";
var regexpTag = "[object RegExp]";
var setTag2 = "[object Set]";
var stringTag = "[object String]";
var symbolTag = "[object Symbol]";
var weakMapTag2 = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag2 = "[object DataView]";
var float32Tag2 = "[object Float32Array]";
var float64Tag2 = "[object Float64Array]";
var int8Tag2 = "[object Int8Array]";
var int16Tag2 = "[object Int16Array]";
var int32Tag2 = "[object Int32Array]";
var uint8Tag2 = "[object Uint8Array]";
var uint8ClampedTag2 = "[object Uint8ClampedArray]";
var uint16Tag2 = "[object Uint16Array]";
var uint32Tag2 = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag2] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag2] = cloneableTags[float64Tag2] = cloneableTags[int8Tag2] = cloneableTags[int16Tag2] = cloneableTags[int32Tag2] = cloneableTags[mapTag2] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag2] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag2] = cloneableTags[uint8ClampedTag2] = cloneableTags[uint16Tag2] = cloneableTags[uint32Tag2] = true;
cloneableTags[errorTag] = cloneableTags[funcTag2] = cloneableTags[weakMapTag2] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$2, isFlat = bitmask & CLONE_FLAT_FLAG$1, isFull = bitmask & CLONE_SYMBOLS_FLAG$2;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject_12(value)) {
    return value;
  }
  var isArr = isArray_1(value);
  if (isArr) {
    result = _initCloneArray(value);
    if (!isDeep) {
      return _copyArray(value, result);
    }
  } else {
    var tag = _getTag(value), isFunc = tag == funcTag2 || tag == genTag2;
    if (isBuffer_12(value)) {
      return _cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : _initCloneObject(value);
      if (!isDeep) {
        return isFlat ? _copySymbolsIn(value, _baseAssignIn(result, value)) : _copySymbols(value, _baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = _initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new _Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet_1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap_1(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? _getAllKeysIn : _getAllKeys : isFlat ? keysIn_1 : keys_1;
  var props = isArr ? void 0 : keysFunc(value);
  _arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    _assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var _baseClone = baseClone;
var CLONE_DEEP_FLAG$1 = 1;
var CLONE_SYMBOLS_FLAG$1 = 4;
function cloneDeep(value) {
  return _baseClone(value, CLONE_DEEP_FLAG$1 | CLONE_SYMBOLS_FLAG$1);
}
var cloneDeep_1 = cloneDeep;
var createPlugins = (plugins, {
  components,
  overrideByKey
} = {}) => {
  let allOverrideByKey = {};
  if (overrideByKey) {
    allOverrideByKey = cloneDeep_1(overrideByKey);
  }
  if (components) {
    Object.keys(components).forEach((key) => {
      if (!allOverrideByKey[key])
        allOverrideByKey[key] = {};
      allOverrideByKey[key].component = components[key];
    });
  }
  if (Object.keys(allOverrideByKey).length) {
    return plugins.map((plugin) => {
      return overridePluginsByKey(plugin, allOverrideByKey);
    });
  }
  return plugins;
};
var createPlateEditor = ({
  editor = createTEditor(),
  plugins = [],
  components,
  overrideByKey,
  normalizeInitialValue: shouldNormalizeInitialValue,
  ...withPlateOptions
} = {}) => {
  plugins = createPlugins(plugins, {
    components,
    overrideByKey
  });
  const e3 = withPlate(editor, {
    plugins,
    ...withPlateOptions
  });
  if (shouldNormalizeInitialValue) {
    normalizeEditor(e3, {
      force: true
    });
  }
  return e3;
};
function baseSlice(array, start, end) {
  var index = -1, length = array.length;
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}
var _baseSlice = baseSlice;
function parent(object, path) {
  return path.length < 2 ? object : _baseGet(object, _baseSlice(path, 0, -1));
}
var _parent = parent;
function baseUnset(object, path) {
  path = _castPath(path, object);
  object = _parent(object, path);
  return object == null || delete object[_toKey(last_1(path))];
}
var _baseUnset = baseUnset;
function customOmitClone(value) {
  return isPlainObject_1(value) ? void 0 : value;
}
var _customOmitClone = customOmitClone;
var spreadableSymbol = _Symbol2 ? _Symbol2.isConcatSpreadable : void 0;
function isFlattenable(value) {
  return isArray_1(value) || isArguments_1(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
var _isFlattenable = isFlattenable;
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1, length = array.length;
  predicate || (predicate = _isFlattenable);
  result || (result = []);
  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        _arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}
var _baseFlatten = baseFlatten;
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? _baseFlatten(array, 1) : [];
}
var flatten_1 = flatten;
function flatRest(func) {
  return _setToString(_overRest(func, void 0, flatten_1), func + "");
}
var _flatRest = flatRest;
var CLONE_DEEP_FLAG = 1;
var CLONE_FLAT_FLAG = 2;
var CLONE_SYMBOLS_FLAG = 4;
var omit = _flatRest(function(object, paths) {
  var result = {};
  if (object == null) {
    return result;
  }
  var isDeep = false;
  paths = _arrayMap(paths, function(path) {
    path = _castPath(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  _copyObject(object, _getAllKeysIn(object), result);
  if (isDeep) {
    result = _baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, _customOmitClone);
  }
  var length = paths.length;
  while (length--) {
    _baseUnset(result, paths[length]);
  }
  return result;
});
var omit_1 = omit;
var PLATE_SCOPE = "plate";
var GLOBAL_PLATE_SCOPE = Symbol("global-plate");
var plateIdAtom = atom2(PLATE_SCOPE);
var usePlateId = () => useAtom(plateIdAtom, GLOBAL_PLATE_SCOPE)[0];
var createPlateStore = ({
  decorate = null,
  editor = null,
  id,
  isRendered = false,
  keyDecorate = "1",
  keyEditor = "1",
  keySelection = "1",
  onChange = null,
  plugins = [],
  rawPlugins = [],
  readOnly = false,
  renderElement = null,
  renderLeaf = null,
  value = null,
  ...state
} = {}) => {
  const stores = createAtomStore({
    decorate,
    editor,
    id,
    isRendered,
    keyDecorate,
    keyEditor,
    keySelection,
    onChange,
    plugins,
    rawPlugins,
    readOnly,
    renderElement,
    renderLeaf,
    value,
    ...state
  }, {
    scope: PLATE_SCOPE,
    name: "plate"
  });
  return {
    plateStore: stores.plateStore,
    usePlateStore: (_id) => {
      const closestId = usePlateId();
      if (isDefined(_id) || stores.usePlateStore(_id).get.id(_id)) {
        return stores.usePlateStore(_id);
      }
      return stores.usePlateStore(closestId);
    }
  };
};
var {
  plateStore,
  usePlateStore
} = createPlateStore();
var usePlateSelectors = (id) => usePlateStore(id).get;
var usePlateActions = (id) => usePlateStore(id).set;
var usePlateStates = (id) => usePlateStore(id).use;
var useUpdatePlateKey = (key, id) => {
  const set = usePlateActions(id)[key]();
  return (0, import_react9.useCallback)(() => {
    set(nanoid());
  }, [set]);
};
var useRedecorate = (id) => {
  const updateDecorate = useUpdatePlateKey("keyDecorate", id);
  return (0, import_react9.useCallback)(() => {
    updateDecorate();
  }, [updateDecorate]);
};
var useResetPlateEditor = (id) => {
  const editor = usePlateSelectors(id).editor();
  const setEditor = usePlateActions(id).editor();
  return (0, import_react9.useCallback)(() => {
    const newEditor = createPlateEditor({
      id: editor.id,
      plugins: editor.plugins,
      disableCorePlugins: true
    });
    setEditor(newEditor);
  }, [editor, setEditor]);
};
var usePlateEditorRef = (id) => usePlateSelectors(id).editor();
var usePlateEditorState = (id) => {
  usePlateSelectors(id).keyEditor();
  return usePlateEditorRef(id);
};
var usePlateReadOnly = (id) => {
  return usePlateSelectors(id).readOnly();
};
var usePlateSelection = (id) => {
  usePlateSelectors(id).keySelection();
  return usePlateEditorRef(id).selection;
};
var getEventPlateId = (id) => {
  var _eventEditorSelectors;
  if (id)
    return id;
  const focus = eventEditorSelectors.focus();
  if (focus)
    return focus;
  const blur = eventEditorSelectors.blur();
  if (blur)
    return blur;
  return (_eventEditorSelectors = eventEditorSelectors.last()) !== null && _eventEditorSelectors !== void 0 ? _eventEditorSelectors : PLATE_SCOPE;
};
var useEventPlateId = (id) => {
  var _ref;
  const focus = useEventEditorSelectors.focus();
  const blur = useEventEditorSelectors.blur();
  const last2 = useEventEditorSelectors.last();
  const providerId = usePlateSelectors().id();
  if (id)
    return id;
  if (focus)
    return focus;
  if (blur)
    return blur;
  return (_ref = last2 !== null && last2 !== void 0 ? last2 : providerId) !== null && _ref !== void 0 ? _ref : PLATE_SCOPE;
};
var pipeDecorate = (editor, decorateProp) => {
  const decorates = editor.plugins.flatMap((plugin) => {
    var _plugin$decorate, _plugin$decorate2;
    return (_plugin$decorate = (_plugin$decorate2 = plugin.decorate) === null || _plugin$decorate2 === void 0 ? void 0 : _plugin$decorate2.call(plugin, editor, plugin)) !== null && _plugin$decorate !== void 0 ? _plugin$decorate : [];
  });
  if (decorateProp) {
    decorates.push(decorateProp);
  }
  if (!decorates.length)
    return;
  return (entry) => {
    let ranges = [];
    const addRanges = (newRanges) => {
      if (newRanges !== null && newRanges !== void 0 && newRanges.length)
        ranges = [...ranges, ...newRanges];
    };
    decorates.forEach((decorate) => {
      addRanges(decorate(entry));
    });
    return ranges;
  };
};
var isEventHandled = (event, handler) => {
  if (!handler) {
    return false;
  }
  const shouldTreatEventAsHandled = handler(event);
  if (shouldTreatEventAsHandled != null) {
    return shouldTreatEventAsHandled;
  }
  return event.isPropagationStopped();
};
var pipeHandler = (editor, {
  editableProps,
  handlerKey
}) => {
  let pluginsHandlers = [];
  pluginsHandlers = editor.plugins.flatMap((plugin) => {
    var _plugin$handlers$hand, _plugin$handlers, _plugin$handlers$hand2;
    return (_plugin$handlers$hand = (_plugin$handlers = plugin.handlers) === null || _plugin$handlers === void 0 ? void 0 : (_plugin$handlers$hand2 = _plugin$handlers[handlerKey]) === null || _plugin$handlers$hand2 === void 0 ? void 0 : _plugin$handlers$hand2.call(_plugin$handlers, editor, plugin)) !== null && _plugin$handlers$hand !== void 0 ? _plugin$handlers$hand : [];
  });
  const propsHandler = editableProps === null || editableProps === void 0 ? void 0 : editableProps[handlerKey];
  if (!pluginsHandlers.length && !propsHandler)
    return;
  return (event) => {
    const eventIsHandled = pluginsHandlers.some((handler) => isEventHandled(event, handler));
    if (eventIsHandled)
      return true;
    return isEventHandled(event, propsHandler);
  };
};
var pluginInjectProps = (editor, {
  key,
  inject: {
    props
  }
}, nodeProps) => {
  var _transformNodeValue;
  const {
    element,
    text,
    className,
    style
  } = nodeProps;
  const node = element !== null && element !== void 0 ? element : text;
  if (!node)
    return;
  if (!props)
    return;
  const {
    nodeKey = key,
    styleKey = nodeKey,
    validTypes,
    classNames,
    transformClassName,
    transformNodeValue,
    transformStyle,
    validNodeValues,
    defaultNodeValue
  } = props;
  if (validTypes && isElement(node) && node.type && !validTypes.includes(node.type)) {
    return;
  }
  const nodeValue = node[nodeKey];
  if (!nodeValue || validNodeValues && !validNodeValues.includes(nodeValue) || nodeValue === defaultNodeValue) {
    return;
  }
  const res = {};
  const transformOptions = {
    ...nodeProps,
    nodeValue
  };
  const value = (_transformNodeValue = transformNodeValue === null || transformNodeValue === void 0 ? void 0 : transformNodeValue(transformOptions)) !== null && _transformNodeValue !== void 0 ? _transformNodeValue : nodeValue;
  if (element) {
    res.className = clsx_m_default(className, `slate-${nodeKey}-${nodeValue}`);
  }
  if (classNames !== null && classNames !== void 0 && classNames[nodeValue] || transformClassName) {
    var _transformClassName;
    res.className = (_transformClassName = transformClassName === null || transformClassName === void 0 ? void 0 : transformClassName(transformOptions)) !== null && _transformClassName !== void 0 ? _transformClassName : clsx_m_default(className, classNames === null || classNames === void 0 ? void 0 : classNames[value]);
  }
  if (styleKey) {
    var _transformStyle;
    res.style = (_transformStyle = transformStyle === null || transformStyle === void 0 ? void 0 : transformStyle(transformOptions)) !== null && _transformStyle !== void 0 ? _transformStyle : {
      ...style,
      [styleKey]: value
    };
  }
  return res;
};
var pipeInjectProps = (editor, nodeProps) => {
  editor.plugins.forEach((plugin) => {
    if (plugin.inject.props) {
      const props = pluginInjectProps(editor, plugin, nodeProps);
      if (props) {
        nodeProps = {
          ...nodeProps,
          ...props
        };
      }
    }
  });
  return {
    ...nodeProps,
    editor
  };
};
var getRenderNodeProps = ({
  attributes,
  nodeProps,
  props,
  type
}) => {
  let newProps = {};
  if (props) {
    var _ref;
    newProps = (_ref = typeof props === "function" ? props(nodeProps) : props) !== null && _ref !== void 0 ? _ref : {};
  }
  if (!newProps.nodeProps && attributes) {
    newProps.nodeProps = attributes;
  }
  nodeProps = {
    ...nodeProps,
    ...newProps
  };
  const {
    className
  } = nodeProps;
  return {
    ...nodeProps,
    className: clsx_m_default(getSlateClass(type), className)
  };
};
var pluginRenderElement = (editor, {
  key,
  type,
  component: _component,
  props
}) => (nodeProps) => {
  const {
    element,
    children: _children
  } = nodeProps;
  if (element.type === type) {
    const Element2 = _component !== null && _component !== void 0 ? _component : DefaultElement;
    const injectAboveComponents = editor.plugins.flatMap((o3) => {
      var _o$inject$aboveCompon, _o$inject;
      return (_o$inject$aboveCompon = (_o$inject = o3.inject) === null || _o$inject === void 0 ? void 0 : _o$inject.aboveComponent) !== null && _o$inject$aboveCompon !== void 0 ? _o$inject$aboveCompon : [];
    });
    const injectBelowComponents = editor.plugins.flatMap((o3) => {
      var _o$inject$belowCompon, _o$inject2;
      return (_o$inject$belowCompon = (_o$inject2 = o3.inject) === null || _o$inject2 === void 0 ? void 0 : _o$inject2.belowComponent) !== null && _o$inject$belowCompon !== void 0 ? _o$inject$belowCompon : [];
    });
    nodeProps = getRenderNodeProps({
      attributes: element.attributes,
      nodeProps,
      props,
      type
    });
    let children = _children;
    injectBelowComponents.forEach((withHOC2) => {
      const hoc = withHOC2({
        ...nodeProps,
        key
      });
      if (hoc) {
        children = hoc({
          ...nodeProps,
          children
        });
      }
    });
    let component = import_react9.default.createElement(Element2, nodeProps, children);
    injectAboveComponents.forEach((withHOC2) => {
      const hoc = withHOC2({
        ...nodeProps,
        key
      });
      if (hoc) {
        component = hoc({
          ...nodeProps,
          children: component
        });
      }
    });
    return import_react9.default.createElement(ElementProvider, {
      element,
      scope: key
    }, component);
  }
};
var pipeRenderElement = (editor, renderElementProp) => {
  const renderElements = [];
  editor.plugins.forEach((plugin) => {
    if (plugin.isElement) {
      renderElements.push(pluginRenderElement(editor, plugin));
    }
  });
  return (nodeProps) => {
    const props = pipeInjectProps(editor, nodeProps);
    let element;
    renderElements.some((renderElement) => {
      element = renderElement(props);
      return !!element;
    });
    if (element)
      return element;
    if (renderElementProp) {
      return renderElementProp(props);
    }
    return import_react9.default.createElement(DefaultElement, props);
  };
};
var DefaultLeaf = ({
  attributes,
  children,
  text,
  leaf,
  editor,
  nodeProps,
  ...props
}) => import_react9.default.createElement("span", _extends3({}, attributes, props), children);
var pluginRenderLeaf = (editor, {
  key,
  type = key,
  component,
  props
}) => (nodeProps) => {
  const {
    leaf,
    children
  } = nodeProps;
  if (leaf[type]) {
    const Leaf = component !== null && component !== void 0 ? component : DefaultLeaf;
    nodeProps = getRenderNodeProps({
      attributes: leaf.attributes,
      props,
      nodeProps,
      type
    });
    return import_react9.default.createElement(Leaf, nodeProps, children);
  }
  return children;
};
var pipeRenderLeaf = (editor, renderLeafProp) => {
  const renderLeafs = [];
  editor.plugins.forEach((plugin) => {
    if (plugin.isLeaf && plugin.key) {
      renderLeafs.push(pluginRenderLeaf(editor, plugin));
    }
  });
  return (nodeProps) => {
    const props = pipeInjectProps(editor, nodeProps);
    renderLeafs.forEach((renderLeaf) => {
      const newChildren = renderLeaf(props);
      if (newChildren !== void 0) {
        props.children = newChildren;
      }
    });
    if (renderLeafProp) {
      return renderLeafProp(props);
    }
    return import_react9.default.createElement(DefaultLeaf, props);
  };
};
var useEditableProps = ({
  id,
  ...editableProps
} = {}) => {
  var _selectors$decorate, _selectors$renderLeaf, _selectors$renderElem;
  const editor = usePlateEditorRef(id);
  const selectors = usePlateSelectors(id);
  const keyDecorate = selectors.keyDecorate();
  const readOnly = selectors.readOnly();
  const storeDecorate = (_selectors$decorate = selectors.decorate()) === null || _selectors$decorate === void 0 ? void 0 : _selectors$decorate.fn;
  const storeRenderLeaf = (_selectors$renderLeaf = selectors.renderLeaf()) === null || _selectors$renderLeaf === void 0 ? void 0 : _selectors$renderLeaf.fn;
  const storeRenderElement = (_selectors$renderElem = selectors.renderElement()) === null || _selectors$renderElem === void 0 ? void 0 : _selectors$renderElem.fn;
  const decorateMemo = (0, import_react9.useMemo)(() => {
    return pipeDecorate(editor, storeDecorate !== null && storeDecorate !== void 0 ? storeDecorate : editableProps === null || editableProps === void 0 ? void 0 : editableProps.decorate);
  }, [editableProps === null || editableProps === void 0 ? void 0 : editableProps.decorate, editor, storeDecorate]);
  const decorate = (0, import_react9.useMemo)(() => {
    if (!keyDecorate || !decorateMemo)
      return;
    return (entry) => decorateMemo(entry);
  }, [decorateMemo, keyDecorate]);
  const renderElement = (0, import_react9.useMemo)(() => {
    return pipeRenderElement(editor, storeRenderElement !== null && storeRenderElement !== void 0 ? storeRenderElement : editableProps === null || editableProps === void 0 ? void 0 : editableProps.renderElement);
  }, [editableProps === null || editableProps === void 0 ? void 0 : editableProps.renderElement, editor, storeRenderElement]);
  const renderLeaf = (0, import_react9.useMemo)(() => {
    return pipeRenderLeaf(editor, storeRenderLeaf !== null && storeRenderLeaf !== void 0 ? storeRenderLeaf : editableProps === null || editableProps === void 0 ? void 0 : editableProps.renderLeaf);
  }, [editableProps === null || editableProps === void 0 ? void 0 : editableProps.renderLeaf, editor, storeRenderLeaf]);
  const props = useDeepCompareMemo(() => {
    const _props = {
      decorate,
      renderElement,
      renderLeaf
    };
    if (isDefined(readOnly)) {
      _props.readOnly = readOnly;
    }
    DOM_HANDLERS.forEach((handlerKey) => {
      const handler = pipeHandler(editor, {
        editableProps,
        handlerKey
      });
      if (handler) {
        _props[handlerKey] = handler;
      }
    });
    return _props;
  }, [decorate, editableProps, renderElement, renderLeaf]);
  return useDeepCompareMemo(() => ({
    ...omit_1(editableProps, [...DOM_HANDLERS, "renderElement", "renderLeaf"]),
    ...props
  }), [editableProps, props]);
};
var setRef = (ref, value) => {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
};
var composeRefs = (...refs) => (node) => refs.forEach((ref) => setRef(ref, node));
var useComposedRef = (...refs) => {
  return (0, import_react9.useCallback)(composeRefs(...refs), refs);
};
var canUsePassiveEvents = () => {
  if (typeof window === "undefined" || typeof window.addEventListener !== "function")
    return false;
  let passive = false;
  const options = Object.defineProperty({}, "passive", {
    get() {
      passive = true;
    }
  });
  const noop = () => null;
  window.addEventListener("test", noop, options);
  window.removeEventListener("test", noop, options);
  return passive;
};
var DEFAULT_IGNORE_CLASS = "ignore-onclickoutside";
var checkClass = (el, cl) => {
  var _el$classList;
  return (_el$classList = el.classList) === null || _el$classList === void 0 ? void 0 : _el$classList.contains(cl);
};
var hasIgnoreClass = (e3, ignoreClass) => {
  let el = e3.target || e3;
  while (el) {
    if (Array.isArray(ignoreClass)) {
      if (ignoreClass.some((c3) => checkClass(el, c3)))
        return true;
    } else if (checkClass(el, ignoreClass)) {
      return true;
    }
    el = el.parentElement;
  }
  return false;
};
var clickedOnScrollbar = (e3) => document.documentElement.clientWidth <= e3.clientX || document.documentElement.clientHeight <= e3.clientY;
var getEventOptions = (type) => type.includes("touch") && canUsePassiveEvents() ? {
  passive: true
} : false;
var useOnClickOutside = (callback, {
  refs: refsOpt,
  disabled,
  eventTypes = ["mousedown", "touchstart"],
  excludeScrollbar,
  ignoreClass = DEFAULT_IGNORE_CLASS,
  detectIFrame = true
} = {}) => {
  const [refsState, setRefsState] = (0, import_react9.useState)([]);
  const callbackRef = (0, import_react9.useRef)(callback);
  callbackRef.current = callback;
  const ref = (0, import_react9.useCallback)((el) => setRefsState((prevState) => [...prevState, {
    current: el
  }]), []);
  (0, import_react9.useEffect)(
    () => {
      if (!(refsOpt !== null && refsOpt !== void 0 && refsOpt.length) && !refsState.length)
        return;
      const getEls = () => {
        const els = [];
        (refsOpt || refsState).forEach(({
          current
        }) => current && els.push(current));
        return els;
      };
      const handler = (e3) => {
        if (!hasIgnoreClass(e3, ignoreClass) && !(excludeScrollbar && clickedOnScrollbar(e3)) && getEls().every((el) => !el.contains(e3.target)))
          callbackRef.current(e3);
      };
      const blurHandler = (e3) => setTimeout(() => {
        const {
          activeElement
        } = document;
        if ((activeElement === null || activeElement === void 0 ? void 0 : activeElement.tagName) === "IFRAME" && !hasIgnoreClass(activeElement, ignoreClass) && !getEls().includes(activeElement))
          callbackRef.current(e3);
      }, 0);
      const removeEventListener = () => {
        eventTypes.forEach((type) => document.removeEventListener(type, handler, getEventOptions(type)));
        if (detectIFrame)
          window.removeEventListener("blur", blurHandler);
      };
      if (disabled) {
        removeEventListener();
        return;
      }
      eventTypes.forEach((type) => document.addEventListener(type, handler, getEventOptions(type)));
      if (detectIFrame)
        window.addEventListener("blur", blurHandler);
      return () => removeEventListener();
    },
    [
      refsState,
      ignoreClass,
      excludeScrollbar,
      disabled,
      detectIFrame,
      JSON.stringify(eventTypes)
    ]
  );
  return ref;
};
var useWrapElement = (props, callback, deps = []) => {
  const wrapElement = (0, import_react9.useCallback)(
    (element) => {
      if (props.wrapElement) {
        element = props.wrapElement(element);
      }
      return callback(element);
    },
    [...deps, props.wrapElement]
  );
  return {
    ...props,
    wrapElement
  };
};
var useElementProps = ({
  attributes,
  nodeProps,
  element,
  editor,
  elementToAttributes,
  ...props
}) => {
  var _elementToAttributes;
  const htmlProps = {
    ...attributes,
    ...props,
    ...nodeProps,
    ...(_elementToAttributes = elementToAttributes === null || elementToAttributes === void 0 ? void 0 : elementToAttributes(element)) !== null && _elementToAttributes !== void 0 ? _elementToAttributes : {},
    ref: useComposedRef(props.ref, attributes.ref)
  };
  return htmlProps;
};
var usePlateStoreOnChange = ({
  setState,
  state,
  nextState,
  nextStateValue = nextState
}) => {
  (0, import_react9.useEffect)(() => {
    if (nextState !== state && !isUndefined(nextState)) {
      setState(nextStateValue);
    }
  }, [setState, state, nextState, nextStateValue]);
};
var usePlateEffects = ({
  id,
  disableCorePlugins,
  value: valueProp,
  onChange: onChangeProp,
  plugins: pluginsProp,
  decorate: decorateProp,
  renderElement: renderElementProp,
  renderLeaf: renderLeafProp,
  readOnly: readOnlyProp
}) => {
  const editor = usePlateEditorRef(id);
  const states = usePlateStates(id);
  const [value, setValue] = states.value();
  const [decorate, setDecorate] = states.decorate();
  const [renderElement, setRenderElement] = states.renderElement();
  const [renderLeaf, setRenderLeaf] = states.renderLeaf();
  const [rawPlugins, setRawPlugins] = states.rawPlugins();
  const [, setPlugins] = states.plugins();
  const [onChange, setOnChange] = states.onChange();
  const [readOnly, setReadOnly] = states.readOnly();
  usePlateStoreOnChange({
    state: value,
    setState: setValue,
    nextState: valueProp
  });
  usePlateStoreOnChange({
    state: readOnly,
    setState: setReadOnly,
    nextState: readOnlyProp
  });
  usePlateStoreOnChange({
    state: rawPlugins,
    setState: setPlugins,
    nextState: pluginsProp,
    nextStateValue: pluginsProp !== null && pluginsProp !== void 0 ? pluginsProp : []
  });
  usePlateStoreOnChange({
    state: onChange === null || onChange === void 0 ? void 0 : onChange.fn,
    setState: setOnChange,
    nextState: onChangeProp,
    nextStateValue: onChangeProp ? {
      fn: onChangeProp
    } : null
  });
  usePlateStoreOnChange({
    state: decorate === null || decorate === void 0 ? void 0 : decorate.fn,
    setState: setDecorate,
    nextState: decorateProp,
    nextStateValue: decorateProp ? {
      fn: decorateProp
    } : null
  });
  usePlateStoreOnChange({
    state: renderElement === null || renderElement === void 0 ? void 0 : renderElement.fn,
    setState: setRenderElement,
    nextState: renderElementProp,
    nextStateValue: renderElementProp ? {
      fn: renderElementProp
    } : null
  });
  usePlateStoreOnChange({
    state: renderLeaf === null || renderLeaf === void 0 ? void 0 : renderLeaf.fn,
    setState: setRenderLeaf,
    nextState: renderLeafProp,
    nextStateValue: renderLeafProp ? {
      fn: renderLeafProp
    } : null
  });
  (0, import_react9.useEffect)(() => {
    if (pluginsProp !== rawPlugins) {
      setRawPlugins(rawPlugins);
      setPlatePlugins(editor, {
        plugins: pluginsProp,
        disableCorePlugins
      });
      setPlugins(editor.plugins);
    }
  }, [disableCorePlugins, editor, rawPlugins, pluginsProp, setPlugins, setRawPlugins]);
};
var pipeOnChange = (editor) => {
  const onChanges = editor.plugins.flatMap((plugin) => {
    var _plugin$handlers$onCh, _plugin$handlers, _plugin$handlers$onCh2;
    return (_plugin$handlers$onCh = (_plugin$handlers = plugin.handlers) === null || _plugin$handlers === void 0 ? void 0 : (_plugin$handlers$onCh2 = _plugin$handlers.onChange) === null || _plugin$handlers$onCh2 === void 0 ? void 0 : _plugin$handlers$onCh2.call(_plugin$handlers, editor, plugin)) !== null && _plugin$handlers$onCh !== void 0 ? _plugin$handlers$onCh : [];
  });
  return (nodes) => {
    return onChanges.some((handler) => {
      if (!handler) {
        return false;
      }
      const shouldTreatEventAsHandled = handler(nodes);
      if (shouldTreatEventAsHandled != null) {
        return shouldTreatEventAsHandled;
      }
      return false;
    });
  };
};
var useSlateProps = ({
  id
}) => {
  var _usePlateSelectors$on;
  const editor = usePlateEditorRef(id);
  const value = usePlateSelectors(id).value();
  const setValue = usePlateActions(id).value();
  const onChangeProp = (_usePlateSelectors$on = usePlateSelectors(id).onChange()) === null || _usePlateSelectors$on === void 0 ? void 0 : _usePlateSelectors$on.fn;
  const onChange = (0, import_react9.useCallback)((newValue) => {
    const eventIsHandled = pipeOnChange(editor)(newValue);
    if (!eventIsHandled) {
      onChangeProp === null || onChangeProp === void 0 ? void 0 : onChangeProp(newValue);
    }
    setValue(newValue);
  }, [editor, setValue, onChangeProp]);
  return (0, import_react9.useMemo)(() => {
    return {
      key: editor.key,
      editor,
      onChange,
      value
    };
  }, [editor, onChange, value]);
};
var useEditorRef = () => useSlateStatic();
var useEditorState = () => useSlate();
var composeEventHandlers = (originalEventHandler, ourEventHandler, {
  checkForDefaultPrevented = true
} = {}) => (event) => {
  originalEventHandler === null || originalEventHandler === void 0 ? void 0 : originalEventHandler(event);
  if (checkForDefaultPrevented === false || !event.defaultPrevented) {
    return ourEventHandler === null || ourEventHandler === void 0 ? void 0 : ourEventHandler(event);
  }
};
var createComponentAs = (render) => {
  const Role = ({
    asChild,
    ...props
  }, ref) => {
    const Comp = asChild ? $5e63c961fc1ce211$export$8c6ed5c666ac1360 : render;
    return Comp({
      ref,
      ...props
    });
  };
  return (0, import_react9.forwardRef)(Role);
};
var isRenderProp = (children) => typeof children === "function";
var createElementAs = (Type, props) => {
  const {
    as: As,
    wrapElement,
    ...rest
  } = props;
  let element;
  if (As && typeof As !== "string") {
    element = import_react9.default.createElement(As, rest);
  } else if (isRenderProp(props.children)) {
    const {
      children,
      ...otherProps
    } = rest;
    element = props.children(otherProps);
  } else if (As) {
    element = import_react9.default.createElement(As, rest);
  } else {
    element = import_react9.default.createElement(Type, rest);
  }
  if (wrapElement) {
    return wrapElement(element);
  }
  return element;
};
var createNodeHOC = (HOC) => (Component, props) => (childrenProps) => import_react9.default.createElement(HOC, _extends3({}, childrenProps, props), import_react9.default.createElement(Component, childrenProps));
var createHOC = (withHOC2) => {
  return (components, options) => {
    const _components = {
      ...components
    };
    const optionsByKey = {};
    const optionsList = castArray_1(options);
    optionsList.forEach(({
      key,
      keys: keys2,
      ...opt
    }) => {
      const _keys = key ? [key] : keys2 !== null && keys2 !== void 0 ? keys2 : Object.keys(_components);
      _keys.forEach((_key) => {
        optionsByKey[_key] = {
          ...optionsByKey[_key],
          ...opt
        };
      });
    });
    Object.keys(optionsByKey).forEach((key) => {
      if (!_components[key])
        return;
      _components[key] = withHOC2(_components[key], optionsByKey[key]);
    });
    return _components;
  };
};
var createNodesHOC = (HOC) => {
  return createHOC(createNodeHOC(HOC));
};
var createNodesWithHOC = (withHOC2) => {
  return createHOC(withHOC2);
};
var getPreventDefaultHandler = (cb, ...args) => (event) => {
  event.preventDefault();
  cb === null || cb === void 0 ? void 0 : cb(...args);
};
var withHOC = (HOC, Component, hocProps) => (props) => import_react9.default.createElement(HOC, hocProps, import_react9.default.createElement(Component, props));
var withProps = (Component, props) => (_props) => import_react9.default.createElement(Component, _extends3({}, _props, props));
var withProviders = (...providers) => (WrappedComponent) => (props) => providers.reduceRight((acc, prov) => {
  let Provider2 = prov;
  if (Array.isArray(prov)) {
    [Provider2] = prov;
    return import_react9.default.createElement(Provider2, prov[1], acc);
  }
  return import_react9.default.createElement(Provider2, null, acc);
}, import_react9.default.createElement(WrappedComponent, props));
var createPlateElementComponent = ({
  as = "div",
  elementToAttributes
} = {}) => createComponentAs((props) => {
  const htmlProps = useElementProps({
    ...props,
    elementToAttributes
  });
  return createElementAs(as, htmlProps);
});
var getKeysByTypes = (editor, type) => {
  const types = castArray_1(type);
  const found = Object.values(editor.pluginsByKey).filter((plugin) => {
    return types.includes(plugin.type);
  });
  return found.map((p3) => p3.key);
};
var getKeyByType = (editor, type) => {
  return getKeysByTypes(editor, type)[0];
};
var getPluginInjectProps = (editor, key) => {
  var _getPlugin$inject$pro, _getPlugin$inject;
  return (_getPlugin$inject$pro = (_getPlugin$inject = getPlugin(editor, key).inject) === null || _getPlugin$inject === void 0 ? void 0 : _getPlugin$inject.props) !== null && _getPlugin$inject$pro !== void 0 ? _getPlugin$inject$pro : {};
};
var getPluginOptions = (editor, key) => {
  var _getPlugin$options;
  return (_getPlugin$options = getPlugin(editor, key).options) !== null && _getPlugin$options !== void 0 ? _getPlugin$options : {};
};
var getPluginTypes = (editor, keys2) => keys2.map((key) => getPluginType(editor, key));
var getPlugins = (editor) => {
  var _ref;
  return (_ref = editor === null || editor === void 0 ? void 0 : editor.plugins) !== null && _ref !== void 0 ? _ref : [];
};
var mapInjectPropsToPlugin = (editor, plugin, injectedPlugin) => {
  var _plugin$inject$props;
  const validTypes = (_plugin$inject$props = plugin.inject.props) === null || _plugin$inject$props === void 0 ? void 0 : _plugin$inject$props.validTypes;
  if (!validTypes)
    return;
  const keys2 = getKeysByTypes(editor, validTypes);
  const injected = {};
  keys2.forEach((key) => {
    injected[key] = injectedPlugin;
  });
  return {
    inject: {
      pluginsByKey: injected
    }
  };
};
var mockPlugin = (plugin) => ({
  key: "",
  type: "",
  editor: {},
  inject: {},
  options: {},
  ...plugin
});
function isEqual(value, other) {
  return _baseIsEqual(value, other);
}
var isEqual_1 = isEqual;
var normalizeInitialValue = (editor, value) => {
  let normalizedValue = cloneDeep_1(value);
  editor.plugins.forEach((p3) => {
    var _p$normalizeInitialVa;
    const _normalizedValue = (_p$normalizeInitialVa = p3.normalizeInitialValue) === null || _p$normalizeInitialVa === void 0 ? void 0 : _p$normalizeInitialVa.call(p3, normalizedValue);
    if (_normalizedValue) {
      normalizedValue = _normalizedValue;
    }
  });
  if (!isEqual_1(value, normalizedValue)) {
    return normalizedValue;
  }
};
var createDocumentNode = (type = "p", text = "", remaining = []) => [{
  children: [{
    type,
    children: [{
      text
    }]
  }, ...remaining]
}];
var createNode = (type = "p", text = "") => ({
  type,
  children: [{
    text
  }]
});
var SCOPE_ELEMENT = "element";
var {
  elementStore,
  useElementStore
} = createAtomStore({
  element: null
}, {
  name: "element"
});
var ElementProviderChild = ({
  element,
  scope,
  children
}) => {
  const setElement = useElementStore().set.element(scope);
  const setGlobalElement = useElementStore().set.element(SCOPE_ELEMENT);
  (0, import_react9.useEffect)(() => {
    setElement(element);
    setGlobalElement(element);
  }, [element, setElement, setGlobalElement]);
  return children;
};
var ElementProvider = ({
  element,
  scope,
  children,
  ...props
}) => import_react9.default.createElement(JotaiProvider, _extends3({
  initialValues: [[elementStore.atom.element, element]],
  scope: SCOPE_ELEMENT
}, props), import_react9.default.createElement(JotaiProvider, _extends3({
  initialValues: [[elementStore.atom.element, element]],
  scope
}, props), import_react9.default.createElement(ElementProviderChild, {
  element,
  scope
}, children)));
var useElement = (pluginKey = SCOPE_ELEMENT) => {
  const value = useElementStore().get.element(pluginKey);
  if (!value) {
    console.warn(`The \`useElement(pluginKey)\` hook must be used inside the node component's context`);
    return {};
  }
  return value;
};
var Box = createComponentAs((props) => createElementAs("div", props));
var EditorRefPluginEffect = ({
  plugin
}) => {
  var _plugin$useHooks;
  const editor = useEditorRef();
  (_plugin$useHooks = plugin.useHooks) === null || _plugin$useHooks === void 0 ? void 0 : _plugin$useHooks.call(plugin, editor, plugin);
  return null;
};
var EditorRefEffect = ({
  id
}) => {
  const setIsRendered = usePlateActions(id).isRendered();
  const plugins = usePlateSelectors(id).plugins();
  (0, import_react9.useEffect)(() => {
    setIsRendered(true);
    return () => {
      setIsRendered(false);
    };
  }, [setIsRendered]);
  return import_react9.default.createElement(import_react9.default.Fragment, null, plugins.map((plugin) => import_react9.default.createElement(EditorRefPluginEffect, {
    key: plugin.key,
    plugin
  })));
};
var EditorStateEffect = (0, import_react9.memo)(({
  id
}) => {
  const editorState = useEditorState();
  const updateKeyEditor = useUpdatePlateKey("keyEditor", id);
  const updateKeySelection = useUpdatePlateKey("keySelection", id);
  (0, import_react9.useEffect)(() => {
    updateKeyEditor();
  });
  (0, import_react9.useEffect)(() => {
    updateKeySelection();
  }, [editorState.selection, updateKeySelection]);
  return null;
});
var PlateEditable = ({
  children,
  renderEditable,
  editableRef,
  firstChildren,
  ...props
}) => {
  const {
    id
  } = props;
  const editor = useEditorRef();
  const {
    plugins
  } = editor;
  const editableProps = useEditableProps(props);
  const editable = import_react9.default.createElement(Editable, _extends3({
    ref: editableRef
  }, editableProps));
  let afterEditable = null;
  let beforeEditable = null;
  plugins.forEach((plugin) => {
    const {
      renderBeforeEditable,
      renderAfterEditable
    } = plugin;
    if (renderAfterEditable) {
      afterEditable = import_react9.default.createElement(import_react9.default.Fragment, null, afterEditable, renderAfterEditable(editableProps));
    }
    if (renderBeforeEditable) {
      beforeEditable = import_react9.default.createElement(import_react9.default.Fragment, null, beforeEditable, renderBeforeEditable(editableProps));
    }
  });
  let aboveEditable = import_react9.default.createElement(import_react9.default.Fragment, null, firstChildren, beforeEditable, renderEditable ? renderEditable(editable) : editable, import_react9.default.createElement(EditorStateEffect, {
    id
  }), import_react9.default.createElement(EditorRefEffect, {
    id
  }), afterEditable, children);
  plugins.forEach((plugin) => {
    const {
      renderAboveEditable
    } = plugin;
    if (renderAboveEditable)
      aboveEditable = renderAboveEditable({
        children: aboveEditable
      });
  });
  return aboveEditable;
};
var PlateProviderEffects = ({
  children,
  ...props
}) => {
  usePlateEffects(props);
  return import_react9.default.createElement(import_react9.default.Fragment, null, children);
};
var PlateProviderContent = ({
  normalizeInitialValue: shouldNormalizeInitialValue,
  ...props
}) => {
  const {
    id = PLATE_SCOPE,
    editor: _editor,
    initialValue,
    value: _value,
    children,
    plugins: _plugins,
    disableCorePlugins,
    onChange,
    decorate,
    renderElement,
    renderLeaf,
    readOnly
  } = props;
  const editor = (0, import_react9.useMemo)(
    () => _editor !== null && _editor !== void 0 ? _editor : createPlateEditor({
      id,
      plugins: _plugins,
      disableCorePlugins
    }),
    []
  );
  const value = (0, import_react9.useMemo)(
    () => {
      let currValue = initialValue !== null && initialValue !== void 0 ? initialValue : _value;
      if (!currValue) {
        currValue = editor.children.length ? editor.children : editor.childrenFactory();
      }
      const normalizedValue = normalizeInitialValue(editor, currValue);
      if (normalizedValue) {
        currValue = normalizedValue;
      }
      editor.children = currValue;
      if (shouldNormalizeInitialValue) {
        normalizeEditor(editor, {
          force: true
        });
      }
      return editor.children;
    },
    []
  );
  return import_react9.default.createElement(JotaiProvider, {
    initialValues: [[plateStore.atom.id, id], [plateStore.atom.editor, editor], [plateStore.atom.plugins, editor.plugins], [plateStore.atom.rawPlugins, _plugins], [plateStore.atom.readOnly, readOnly], [plateStore.atom.value, value], [plateStore.atom.decorate, {
      fn: decorate
    }], [plateStore.atom.onChange, {
      fn: onChange
    }], [plateStore.atom.renderElement, {
      fn: renderElement
    }], [plateStore.atom.renderLeaf, {
      fn: renderLeaf
    }]],
    scope: id
  }, import_react9.default.createElement(JotaiProvider, {
    initialValues: [[plateIdAtom, id]],
    scope: GLOBAL_PLATE_SCOPE
  }, import_react9.default.createElement(PlateProviderEffects, props, children)));
};
var PlateProvider = (props) => {
  const {
    id
  } = props;
  return import_react9.default.createElement(PlateProviderContent, _extends3({
    key: id === null || id === void 0 ? void 0 : id.toString()
  }, props));
};
var withPlateProvider = (Component, hocProps) => withHOC(PlateProvider, Component, hocProps);
var PlateSlate = ({
  id,
  children
}) => {
  const slateProps = useSlateProps({
    id
  });
  const {
    plugins
  } = usePlateSelectors(id).editor();
  let aboveSlate = import_react9.default.createElement(Slate, slateProps, children);
  plugins === null || plugins === void 0 ? void 0 : plugins.forEach((plugin) => {
    const {
      renderAboveSlate
    } = plugin;
    if (renderAboveSlate)
      aboveSlate = renderAboveSlate({
        children: aboveSlate
      });
  });
  return aboveSlate;
};
var Plate = ({
  children,
  editableRef,
  firstChildren,
  renderEditable,
  editableProps,
  ...props
}) => {
  const {
    id = PLATE_SCOPE
  } = props;
  const providerId = usePlateSelectors(id).id();
  const editable = import_react9.default.createElement(PlateSlate, {
    id
  }, import_react9.default.createElement(PlateEditable, _extends3({
    id,
    editableRef,
    firstChildren,
    renderEditable
  }, editableProps), children));
  return providerId ? editable : import_react9.default.createElement(PlateProvider, props, editable);
};
var PlateTest = ({
  variant = "wordProcessor",
  editableProps,
  normalizeInitialValue: normalizeInitialValue2,
  ...props
}) => {
  const {
    editor: _editor,
    id,
    plugins
  } = props;
  let editor = _editor;
  if (editor && !editor.plugins) {
    editor = createPlateEditor({
      editor,
      plugins,
      id,
      normalizeInitialValue: normalizeInitialValue2
    });
  }
  return import_react9.default.createElement(Plate, _extends3({}, props, {
    editor,
    editableProps: {
      "data-variant": variant,
      "data-testid": "slate-content-editable",
      autoFocus: true,
      ...editableProps
    }
  }));
};

export {
  atom2 as atom,
  useAtomValue,
  useAtom,
  nanoid,
  isHotkeyPressed,
  useHotkeys,
  createStore4 as createStore,
  createAtomStore,
  getJotaiProviderInitialValues,
  DOM_HANDLERS,
  IS_APPLE,
  escapeRegExp,
  findHtmlParentElement,
  getHandler,
  getSlateClass,
  hexToBase64,
  isComposing,
  Hotkeys,
  isUrl,
  JotaiProvider,
  mergeProps,
  isUndefined,
  isNull,
  isUndefinedOrNull,
  isDefined,
  overridePluginsByKey,
  createPluginFactory,
  KEY_DESERIALIZE_AST,
  createDeserializeAstPlugin,
  getNodeEntry,
  getPath,
  elementMatches,
  isElement,
  isElementList,
  isVoid,
  getNodeDescendants,
  isBlock,
  match,
  getQueryOptions,
  findDescendant,
  unhangRange,
  getNodeEntries,
  findNode,
  getAboveNode,
  getBlockAbove,
  isAncestor,
  getChildren,
  getEdgePoints,
  getEdgeBlocksAbove,
  isText,
  getLastChild$1,
  getLastChildPath,
  isLastChild,
  getLastNode,
  getLastNodeByLevel,
  getMarks,
  getMark,
  getTEditor,
  addMark,
  createPathRef,
  createPointRef,
  createRangeRef,
  deleteBackward,
  deleteForward,
  deleteFragment,
  hasSingleChild,
  getParentNode,
  getPreviousNode,
  isElementEmpty,
  withoutNormalizing,
  deleteText,
  moveNodes,
  removeNodes,
  select,
  mergeNodes,
  getEndPoint,
  getLeafNode,
  getPointAfter,
  getPointBefore,
  getStartPoint,
  getVoidNode,
  deleteMerge,
  getEditorString,
  getFirstNode,
  getFragment,
  getLevels,
  getNextNode,
  getPathRefs,
  getPoint,
  getPointRefs,
  getPositions,
  getRange,
  getRangeRefs,
  hasBlocks,
  hasInlines,
  hasTexts,
  insertBreak,
  insertNode,
  isEdgePoint,
  isEditor,
  isEditorNormalizing,
  isEndPoint,
  isInline,
  isStartPoint,
  normalizeEditor,
  removeEditorMark,
  isHistoryEditor,
  isHistoryMerging,
  isHistorySaving,
  withoutMergingHistory,
  withoutSavingHistory,
  isDescendant,
  getCommonNode,
  isTextList,
  textEquals,
  textMatches,
  getNode,
  getNodeAncestor,
  getNodeAncestors,
  getNodeChild,
  getNodeChildren,
  getNodeDescendant,
  getNodeElements,
  getNodeFirstNode,
  getNodeFragment,
  getNodeLastNode,
  getNodeLeaf,
  getNodeLevels,
  getNodeParent,
  getNodeProps,
  getNodeString,
  getNodeTexts,
  getNodes,
  hasNode,
  isNode,
  isNodeList,
  nodeMatches,
  isCollapsed,
  isExpanded,
  blurEditor,
  deselectEditor,
  findEditorDocumentOrShadowRoot,
  findEventRange,
  findNodeKey,
  findNodePath,
  collapseSelection,
  deselect,
  insertFragment,
  insertNodes,
  insertText,
  liftNodes,
  moveSelection,
  setNodes,
  setPoint,
  setSelection,
  splitNodes,
  unsetNodes,
  unwrapNodes,
  wrapNodes,
  focusEditor,
  getEditorWindow,
  hasEditorDOMNode,
  hasEditorEditableTarget,
  hasEditorSelectableTarget,
  hasEditorTarget,
  insertData,
  isEditorFocused,
  isEditorReadOnly,
  isTargetInsideNonReadonlyVoid,
  setFragmentData,
  toDOMNode,
  toDOMPoint,
  toDOMRange,
  toSlateNode,
  toSlatePoint,
  toSlateRange,
  getNextNodeStartPoint,
  getNextSiblingNodes,
  getOperations,
  isRangeAcrossBlocks,
  getPointBeforeLocation,
  getPointFromLocation,
  getPointNextToVoid,
  queryNode,
  getPreviousBlockById,
  getPreviousNodeEndPoint,
  getPreviousPath,
  getPreviousSiblingNode,
  getRangeBefore,
  getRangeFromBlockStart,
  getSelectionText,
  isAncestorEmpty,
  isBlockAboveEmpty,
  isBlockTextEmptyAfterSelection,
  isDocumentEnd,
  isFirstChild,
  isMarkActive,
  isPointAtWordEnd,
  isRangeInSameBlock,
  isRangeInSingleText,
  isSelectionAtBlockEnd,
  isSelectionAtBlockStart,
  isSelectionExpanded,
  isTextByPath,
  getPluginsByKey,
  getPlugin,
  getPluginType,
  isType,
  isWordAfterTrigger,
  someNode,
  queryEditor,
  applyDeepToNodes,
  defaultsDeepToNodes,
  insertElements,
  insertEmptyElement,
  moveChildren,
  removeMark,
  removeNodeChildren,
  removeSelectionMark,
  replaceNodeChildren,
  resetEditorChildren,
  selectEditor,
  selectEndOfBlockAboveSelection,
  setElements,
  setMarks,
  toggleMark,
  ELEMENT_DEFAULT,
  toggleNodeType,
  toggleWrapNodes,
  wrapNodeChildren,
  KEY_EDITOR_PROTOCOL,
  withEditorProtocol,
  createEditorProtocolPlugin,
  eventEditorStore,
  eventEditorActions,
  eventEditorSelectors,
  useEventEditorSelectors,
  KEY_EVENT_EDITOR,
  createEventEditorPlugin,
  withTHistory,
  createHistoryPlugin,
  KEY_INLINE_VOID,
  withInlineVoid,
  createInlineVoidPlugin,
  getInjectedPlugins,
  pipeInsertDataQuery,
  pipeInsertFragment,
  pipeTransformData,
  pipeTransformFragment,
  withInsertData,
  KEY_INSERT_DATA,
  createInsertDataPlugin,
  KEY_NODE_FACTORY,
  createNodeFactoryPlugin,
  withTReact,
  createReactPlugin,
  normalizeDescendantsToDocumentFragment,
  deserializeHtmlNodeChildren,
  htmlBodyToFragment,
  htmlBrToNewLine,
  pluginDeserializeHtml,
  pipeDeserializeHtmlElement,
  htmlElementToElement,
  mergeDeepToNodes,
  pipeDeserializeHtmlLeaf,
  htmlElementToLeaf,
  isHtmlText,
  htmlTextNodeToString,
  isHtmlElement,
  deserializeHtmlNode,
  deserializeHtmlElement,
  htmlStringToDOMNode,
  deserializeHtml,
  parseHtmlDocument,
  KEY_DESERIALIZE_HTML,
  createDeserializeHtmlPlugin,
  KEY_PREV_SELECTION,
  createPrevSelectionPlugin,
  onKeyDownToggleElement,
  onKeyDownToggleMark,
  CARRIAGE_RETURN,
  LINE_FEED,
  NO_BREAK_SPACE,
  SPACE,
  TAB,
  ZERO_WIDTH_SPACE,
  traverseHtmlNode,
  traverseHtmlElements,
  cleanHtmlBrElements,
  cleanHtmlCrLf,
  cleanHtmlEmptyElements,
  replaceTagName,
  cleanHtmlFontElements,
  isHtmlFragmentHref,
  unwrapHtmlElement,
  cleanHtmlLinkElements,
  traverseHtmlTexts,
  cleanHtmlTextNodes,
  isHtmlBlockElement,
  copyBlockMarksToSpanChild,
  findHtmlElement,
  someHtmlElement,
  getHtmlComments,
  isHtmlComment,
  isOlSymbol,
  parseHtmlElement,
  postCleanHtml,
  removeHtmlSurroundings,
  preCleanHtml,
  traverseHtmlComments,
  removeHtmlNodesBetweenComments,
  mergeDeepPlugins,
  setDefaultPlugin,
  flattenDeepPlugins,
  setPlatePlugins,
  withPlate,
  createTEditor,
  createPlugins,
  createPlateEditor,
  PLATE_SCOPE,
  GLOBAL_PLATE_SCOPE,
  plateIdAtom,
  usePlateId,
  createPlateStore,
  plateStore,
  usePlateStore,
  usePlateSelectors,
  usePlateActions,
  usePlateStates,
  useUpdatePlateKey,
  useRedecorate,
  useResetPlateEditor,
  usePlateEditorRef,
  usePlateEditorState,
  usePlateReadOnly,
  usePlateSelection,
  getEventPlateId,
  useEventPlateId,
  pipeDecorate,
  isEventHandled,
  pipeHandler,
  pluginInjectProps,
  pipeInjectProps,
  getRenderNodeProps,
  pluginRenderElement,
  pipeRenderElement,
  DefaultLeaf,
  pluginRenderLeaf,
  pipeRenderLeaf,
  useEditableProps,
  composeRefs,
  useComposedRef,
  DEFAULT_IGNORE_CLASS,
  useOnClickOutside,
  useWrapElement,
  useElementProps,
  usePlateEffects,
  pipeOnChange,
  useSlateProps,
  useEditorRef,
  useEditorState,
  composeEventHandlers,
  createComponentAs,
  createElementAs,
  createNodeHOC,
  createNodesHOC,
  createNodesWithHOC,
  getPreventDefaultHandler,
  withHOC,
  withProps,
  withProviders,
  createPlateElementComponent,
  getKeysByTypes,
  getKeyByType,
  getPluginInjectProps,
  getPluginOptions,
  getPluginTypes,
  getPlugins,
  mapInjectPropsToPlugin,
  mockPlugin,
  normalizeInitialValue,
  createDocumentNode,
  createNode,
  SCOPE_ELEMENT,
  elementStore,
  useElementStore,
  ElementProviderChild,
  ElementProvider,
  useElement,
  Box,
  EditorRefPluginEffect,
  EditorRefEffect,
  EditorStateEffect,
  PlateEditable,
  PlateProviderEffects,
  PlateProvider,
  withPlateProvider,
  PlateSlate,
  Plate,
  PlateTest
};
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
//# sourceMappingURL=chunk-HGZEDJTY.js.map
