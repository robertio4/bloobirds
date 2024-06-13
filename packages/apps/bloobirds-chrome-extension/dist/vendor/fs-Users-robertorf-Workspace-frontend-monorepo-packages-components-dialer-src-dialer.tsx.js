import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialer.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/dialer.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/dialer.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$(), _s5 = $RefreshSig$(), _s6 = $RefreshSig$(), _s7 = $RefreshSig$(), _s8 = $RefreshSig$(), _s9 = $RefreshSig$(), _s10 = $RefreshSig$(), _s11 = $RefreshSig$(), _s12 = $RefreshSig$(), _s13 = $RefreshSig$(), _s14 = $RefreshSig$(), _s15 = $RefreshSig$(), _s16 = $RefreshSig$(), _s17 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useCallback = __vite__cjsImport2_react["useCallback"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import __vite__cjsImport3_reactDraggable from "/vendor/.vite-deps-react-draggable.js__v--b0baa450.js"; const Draggable = __vite__cjsImport3_reactDraggable.__esModule ? __vite__cjsImport3_reactDraggable.default : __vite__cjsImport3_reactDraggable;
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Icon, IconButton, Portal, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserSettings, useBobject, useLazyRef } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { useEventSubscription } from "/vendor/.vite-deps-@bloobirds-it_plover.js__v--88b8fafa.js";
import { EditorToolbar, EditorToolbarControlsSection, EditorToolbarFontStylesSection, EditorToolbarListsSection, EditorToolbarTextMarksSection, RichTextEditor, serialize, useRichTextEditorPlugins } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, BobjectTypes, DIRECTION_VALUES_LOGIC_ROLE, MessagesEvents, PluralBobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, getFieldByLogicRole, getValueFromLogicRole, isSalesforcePage, normalizeUrl, isElementLoaded } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useWizardContext, WIZARD_MODALS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-wizardModalContext-dist-index.js.js";
import * as Sentry from "/vendor/.vite-deps-@sentry_react.js__v--dfb3495e.js";
import { resetEditorChildren } from "/vendor/.vite-deps-@udecode_plate.js__v--feffb7cb.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { motion } from "/vendor/.vite-deps-framer-motion.js__v--396e37ef.js";
import __vite__cjsImport16_lodash_debounce from "/vendor/.vite-deps-lodash_debounce.js__v--ce8d7378.js"; const debounce = __vite__cjsImport16_lodash_debounce.__esModule ? __vite__cjsImport16_lodash_debounce.default : __vite__cjsImport16_lodash_debounce;
import __vite__cjsImport17_useSyncExternalStore_shim from "/vendor/.vite-deps-use-sync-external-store_shim.js__v--03bee27d.js"; const useSyncExternalStore = __vite__cjsImport17_useSyncExternalStore_shim["useSyncExternalStore"];
import { v4 as uuid } from "/vendor/.vite-deps-uuid.js__v--488548d2.js";
import { AircallDialer } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-aircallDialer-hooks-useAirCallDialerVisibility.tsx.js";
import { AstrolineDialerFrame } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-astrolineDialer-astrolineDialerFrame-astrolineDialerFrame.tsx.js";
import { DeviceHandler } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-deviceHandler.tsx.js";
import { Dial } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dial.tsx.js";
import { DialPad } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialPad.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialer.module.css.js";
import { DialerConnectionHint } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialerConnectionHint.tsx.js";
import { DialerUserPhoneSelector } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-dialerUserPhoneSelector.tsx.js";
import { DialerExtendedScreen } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-extendedScreen-dialerExtendedScreen.tsx.js";
import { useDialerPosition } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-hooks-useDialerPosition.tsx.js";
import { LogCallButton } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-logCallButton.tsx.js";
import { NumintecDialer } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-numintecDialer-hooks-useNumintecDialer.tsx.js";
import { RingHangupButton } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-ringHangupButton.tsx.js";
import { RingoverDialer } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-ringoverDialer-hooks-useRingoverDialerVisibility.tsx.js";
import { fillReferenceFields, getMainBobjectId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-utils.ts.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export var DialerTab = /* @__PURE__ */ ((DialerTab2) => {
  DialerTab2[DialerTab2["dialer"] = 0] = "dialer";
  DialerTab2[DialerTab2["manual"] = 1] = "manual";
  return DialerTab2;
})(DialerTab || {});
export var DialerStatus = /* @__PURE__ */ ((DialerStatus2) => {
  DialerStatus2[DialerStatus2["authorizing"] = 0] = "authorizing";
  DialerStatus2[DialerStatus2["registering"] = 1] = "registering";
  DialerStatus2[DialerStatus2["idle"] = 2] = "idle";
  DialerStatus2[DialerStatus2["connected"] = 3] = "connected";
  DialerStatus2[DialerStatus2["callEnded"] = 4] = "callEnded";
  DialerStatus2[DialerStatus2["incoming"] = 5] = "incoming";
  return DialerStatus2;
})(DialerStatus || {});
export var DialerOpenStatus = /* @__PURE__ */ ((DialerOpenStatus2) => {
  DialerOpenStatus2["open"] = "OPEN";
  DialerOpenStatus2["closed"] = "CLOSED";
  DialerOpenStatus2["minimized"] = "MINIMIZED";
  return DialerOpenStatus2;
})(DialerOpenStatus || {});
const DialerStore = React.createContext(void 0);
export const useDialerStore = () => {
  _s();
  return React.useContext(DialerStore);
};
_s(useDialerStore, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
export const useDialerLauncher = () => {
  function openDialer(phoneNumber, bobjectId) {
    const openDialerEvent = new CustomEvent("openDialer", {
      detail: {
        phoneNumber,
        bobjectId
      }
    });
    window.dispatchEvent(openDialerEvent);
  }
  return {
    openDialer
  };
};
export function useDialer(selector) {
  _s2();
  const store = useDialerStore();
  const cb = () => selector(store.snapshot());
  return useSyncExternalStore(store.subscribe, cb, cb);
}
_s2(useDialer, "08eTDYIVMnKTdOfbQ7jQ5K5spWA=", false, function() {
  return [useDialerStore, useSyncExternalStore];
});
export const Dialer = () => {
  _s3();
  const listeners = useLazyRef(() => /* @__PURE__ */ new Set());
  const {
    settings
  } = useActiveUserSettings();
  const dialerDefaultView = settings?.user?.dialerDefaultView;
  const autoOpenPitchesInDialer = settings?.user?.autoOpenPitchesInDialer;
  const state = useLazyRef(() => ({
    id: uuid(),
    open: "CLOSED" /* closed */,
    tab: dialerDefaultView === "logCall" ? 1 /* manual */ : 0 /* dialer */,
    dialedPhoneNumber: "",
    bobjectMatch: null,
    selectedPhoneNumber: null,
    device: null,
    status: 0 /* authorizing */,
    call: null,
    callStatus: null,
    errors: [],
    warnings: [],
    callDirection: "outbound",
    activity: null,
    notePanelOpen: false,
    note: null,
    showingExtendedScreen: autoOpenPitchesInDialer,
    extendedScreenType: autoOpenPitchesInDialer ? "pitches" : null,
    autoOpenPitchesInDialer,
    bobjectId: null,
    incomingAccepted: false
  }));
  const store = React.useMemo(() => {
    return {
      setState: (key, value) => {
        state.current[key] = value;
        store.emit();
      },
      snapshot: () => state.current,
      minimize: () => store.setState("open", "MINIMIZED" /* minimized */),
      maximize: () => store.setState("open", "OPEN" /* open */),
      close: () => {
        const {
          extendedScreenType
        } = store.snapshot();
        if (extendedScreenType === "notes") {
          state.current["showingExtendedScreen"] = false;
        }
        state.current["bobjectMatch"] = null;
        state.current["open"] = "CLOSED" /* closed */;
        state.current["showingPitches"] = state.current["autoOpenPitchesInDialer"];
        state.current["bobjectId"] = null;
        state.current["activity"] = null;
        state.current["incomingAccepted"] = false;
        store.emit();
      },
      setSelectedTab: (tab) => store.setState("tab", tab),
      setDialedPhoneNumber: (phoneNumber, bobjectId = null) => {
        store.setState("dialedPhoneNumber", phoneNumber);
        store.setState("bobjectId", bobjectId);
        store.setState("bobjectMatch", {
          hasMatched: void 0
        });
      },
      startCall: async (newCall) => {
        function finishCall() {
          state.current["status"] = 4 /* callEnded */;
          state.current["call"] = null;
          state.current["callStatus"] = null;
          store.emit();
          setTimeout(() => {
            state.current["status"] = 2 /* idle */;
            state.current["note"] = null;
            state.current["notePanelOpen"] = false;
            state.current["activity"] = null;
            state.current["dialedPhoneNumber"] = "";
            state.current["bobjectId"] = null;
            state.current["incomingAccepted"] = false;
            store.emit();
          }, 3e3);
        }
        newCall.on("sample", () => {
          store.setState("callStatus", newCall.status());
        });
        newCall.on("disconnect", finishCall);
        newCall.on("cancel", finishCall);
        newCall.on("error", (error) => {
          console.error("There's been an error with the call", error);
          store.setState("errors", [...state.current.errors, error]);
        });
        newCall.on("warning", (warning) => {
          store.setState("warnings", [...state.current.warnings, warning]);
        });
        store.setState("call", newCall);
        store.setState("callStatus", newCall.status());
      },
      setMatchedBobject: async (bobject) => {
        let additionalInfo = {};
        if (bobject) {
          if (bobject.companyId) {
            try {
              const {
                data: relatedCompany
              } = await api.get(`/bobjects/${bobject.companyId}/form`);
              additionalInfo = relatedCompany?.raw?.contents;
            } catch (e) {
              Sentry.captureException(e, {
                tags: {
                  module: "dialer"
                },
                extra: {
                  origin: "Get related company",
                  bobject,
                  companyUrl: `/bobjects/${bobject.companyId}/form`
                }
              });
            }
          }
          store.setState("bobjectMatch", {
            ...bobject,
            ...additionalInfo && Object.keys(additionalInfo).length === 0 ? {
              relatedBobject: additionalInfo
            } : {}
          });
        }
      },
      hangCall: () => {
        const {
          call
        } = store.snapshot();
        if (call) {
          call.disconnect();
        }
        state.current["status"] = 4 /* callEnded */;
        state.current["call"] = null;
        state.current["callStatus"] = null;
        store.emit();
        setTimeout(() => {
          state.current["status"] = 2 /* idle */;
          state.current["note"] = null;
          state.current["notePanelOpen"] = false;
          state.current["activity"] = null;
          state.current["dialedPhoneNumber"] = "";
          state.current["incomingAccepted"] = false;
          store.emit();
        }, 3e3);
      },
      emit: () => listeners.current.forEach((listener) => listener()),
      subscribe: (callback) => {
        listeners.current.add(callback);
        return () => listeners.current.delete(callback);
      },
      setActivity: async (activityId, forceSetActivity = false) => {
        if (activityId) {
          const activity = await api.get(`/bobjects/${activityId}/form?injectReferences=true`);
          const activityWithReferences = fillReferenceFields(activity?.data);
          const activityPhoneNumber = getValueFromLogicRole(activityWithReferences, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER);
          if (forceSetActivity || activityPhoneNumber === store.snapshot().dialedPhoneNumber) {
            store.setState("activity", activityWithReferences);
          }
        }
      },
      setActivityExternal: async (activity) => {
        store.setState("activity", activity);
      },
      setActivityLogCall: async (activityId) => {
        if (activityId) {
          const activity = await api.get(`/bobjects/${activityId}/form?injectReferences=true`);
          const activityWithReferences = fillReferenceFields(activity?.data);
          store.setState("activity", activityWithReferences);
          store.setState("status", 4 /* callEnded */);
          setTimeout(() => {
            store.setState("status", 2 /* idle */);
          }, 3e3);
        }
      },
      finishCall: () => {
        state.current["status"] = 2 /* idle */;
        state.current["note"] = null;
        state.current["notePanelOpen"] = false;
        state.current["activity"] = null;
        state.current["dialedPhoneNumber"] = "";
        state.current["showingPitches"] = false;
        state.current["bobjectId"] = null;
        state.current["incomingAccepted"] = false;
        store.emit();
      },
      toggleExtendedScreen: (extendedScreenType) => {
        const newState = extendedScreenType !== state.current["extendedScreenType"] || !state.current["showingExtendedScreen"];
        store.setState("showingExtendedScreen", newState);
        store.setState("extendedScreenType", extendedScreenType);
      },
      closeExtendedScreen: () => {
        if (state.current["extendedScreenType"] === "notes") {
          store.setState("showingExtendedScreen", false);
          store.setState("extendedScreenType", null);
        }
      },
      setAutoOpenPitchesInDialer: (autoOpenPitchesInDialer2) => {
        store.setState("autoOpenPitchesInDialer", autoOpenPitchesInDialer2);
      }
    };
  }, []);
  window.addEventListener("openDialer", (e) => {
    const {
      user: {
        dialerType
      }
    } = settings;
    if (dialerType === "NUMINTEC_DIALER" && e.detail?.phoneNumber && !store.snapshot().dialedPhoneNumber) {
      api.post(`/calls/numintec/sync/call/${e.detail?.phoneNumber}`, {});
    }
    store.setState("dialedPhoneNumber", e.detail?.phoneNumber);
    store.setState("open", "OPEN" /* open */);
    store.setState("bobjectId", e.detail?.bobjectId);
  });
  useEffect(() => {
    const closeDialer = () => {
      store.close();
    };
    window.addEventListener(MessagesEvents.UserLoggedOut, closeDialer);
    window.addEventListener(MessagesEvents.MinimizeDialer, () => store.minimize());
    return () => {
      window.removeEventListener(MessagesEvents.UserLoggedOut, closeDialer);
      window.removeEventListener(MessagesEvents.MinimizeDialer, () => store.minimize());
    };
  }, []);
  return /* @__PURE__ */ _jsxDEV(Portal, {
    children: /* @__PURE__ */ _jsxDEV(DialerStore.Provider, {
      value: store,
      children: [/* @__PURE__ */ _jsxDEV(ActivityHandler, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 404,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(FloatingBox, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 406,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 403,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 402,
    columnNumber: 5
  }, void 0);
};
_s3(Dialer, "NBKPA/XLo0cc/3zRek7cocZchc8=", false, function() {
  return [useLazyRef, useActiveUserSettings, useLazyRef];
});
_c = Dialer;
const ActivityHandler = () => {
  _s4();
  const {
    snapshot,
    setActivity
  } = useDialerStore();
  const {
    settings
  } = useActiveUserSettings();
  useEventSubscription("twilio-response", (message) => {
    if (!snapshot().activity) {
      setActivity(`${settings?.account.id}/Activity/${message?.activityId}`);
    }
  }, {
    createSubscription: Boolean(settings?.account)
  });
  return null;
};
_s4(ActivityHandler, "RV5xkYe3fiQ8MAKEmV0PHU9POgk=", false, function() {
  return [useDialerStore, useActiveUserSettings, useEventSubscription];
});
_c2 = ActivityHandler;
const FloatingBox = () => {
  _s5();
  const open = useDialer((state) => state.open);
  const {
    position,
    bounds,
    setPosition
  } = useDialerPosition(open === "OPEN" /* open */);
  const {
    settings
  } = useActiveUserSettings();
  const {
    user: {
      dialerType
    }
  } = settings;
  const classes = clsx(styles.content, {
    [styles.contentAircall]: dialerType === "AIRCALL_DIALER"
  });
  useEffect(() => {
    if (dialerType === "AIRCALL_DIALER") {
      const selector = 'iframe[src*="cti.aircall.io"]';
      isElementLoaded(selector).then(() => {
        if (isSalesforcePage(normalizeUrl(window.location.href))) {
          const possibleCti = document.querySelector(selector);
          if (possibleCti) {
            possibleCti.remove();
          }
        }
      });
    }
  }, []);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.container,
    style: {
      display: open !== "CLOSED" /* closed */ ? "inherit" : "none"
    },
    children: [/* @__PURE__ */ _jsxDEV("div", {
      style: {
        display: open === "OPEN" /* open */ ? "inherit" : "none"
      },
      children: /* @__PURE__ */ _jsxDEV(Draggable, {
        handle: "#dialer-drag-box",
        position,
        bounds,
        onStop: (e, data) => setPosition({
          x: data.x,
          y: data.y
        }),
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: classes,
          children: [/* @__PURE__ */ _jsxDEV(DialerContent, {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 467,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(DialerExtendedScreen, {
            position
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 468,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 466,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 460,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 459,
      columnNumber: 7
    }, void 0), open !== "OPEN" /* open */ && /* @__PURE__ */ _jsxDEV(DialerDragBox, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 472,
      columnNumber: 42
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 455,
    columnNumber: 5
  }, void 0);
};
_s5(FloatingBox, "1yRMVfxMi8l7bLlZKBqxjOpJAms=", false, function() {
  return [useDialer, useDialerPosition, useActiveUserSettings];
});
_c3 = FloatingBox;
const DialerDragBox = () => {
  _s6();
  const {
    maximize,
    close
  } = useDialerStore();
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.floatingBox,
    onClick: (e) => {
      maximize();
      e.stopPropagation();
      e.preventDefault();
    },
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.closeButton,
      onClick: (e) => {
        close();
        e.stopPropagation();
        e.preventDefault();
      },
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        name: "cross",
        size: 16,
        color: "white"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 496,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 488,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Icon, {
      name: "phone",
      color: "white",
      size: 40
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 498,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 480,
    columnNumber: 5
  }, void 0);
};
_s6(DialerDragBox, "RcsVOTLuxwHSFOltJsqpwqUgGII=", false, function() {
  return [useDialerStore];
});
_c4 = DialerDragBox;
const DialerContent = () => {
  _s7();
  const tab = useDialer((state) => state.tab);
  const status = useDialer((state) => state.status);
  const isNotePanelOpen = useDialer((state) => state.notePanelOpen);
  const {
    setState
  } = useDialerStore();
  const {
    settings
  } = useActiveUserSettings();
  const {
    user: {
      dialerType
    }
  } = settings;
  if (tab === 1 /* manual */ && !isNotePanelOpen) {
    setState("notePanelOpen", true);
  }
  const classes = clsx(styles.contentBox, {
    [styles.contentBoxBloobirds]: dialerType !== "ASTROLINE_DIALER",
    [styles.contentBoxOthers]: dialerType === "ASTROLINE_DIALER",
    [styles.contentBoxAircall]: dialerType === "AIRCALL_DIALER",
    [styles.contentBoxNumintec]: dialerType === "NUMINTEC_DIALER",
    [styles.contentBoxRingover]: dialerType === "RINGOVER_DIALER"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: classes,
    children: [/* @__PURE__ */ _jsxDEV(DialerHeader, {
      showTabs: dialerType === "BLOOBIRDS_DIALER" || !dialerType,
      showNoteButton: dialerType === "AIRCALL_DIALER" || dialerType === "NUMINTEC_DIALER" || dialerType === "RINGOVER_DIALER"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 526,
      columnNumber: 7
    }, void 0), dialerType === "ASTROLINE_DIALER" ? /* @__PURE__ */ _jsxDEV(AstrolineDialerFrame, {
      launchCCF: true
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 535,
      columnNumber: 9
    }, void 0) : dialerType === "AIRCALL_DIALER" ? /* @__PURE__ */ _jsxDEV(AircallDialer, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 537,
      columnNumber: 9
    }, void 0) : dialerType === "NUMINTEC_DIALER" ? /* @__PURE__ */ _jsxDEV(NumintecDialer, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 539,
      columnNumber: 9
    }, void 0) : dialerType === "RINGOVER_DIALER" ? /* @__PURE__ */ _jsxDEV(RingoverDialer, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 541,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV(DeviceHandler, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 544,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(DialerErrorWarning, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 545,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(DialerStatusHeader, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 546,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Dial, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 547,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.actionsPanel,
        children: [tab === 0 /* dialer */ && /* @__PURE__ */ _jsxDEV(RingHangupButton, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 549,
          columnNumber: 42
        }, void 0), tab === 0 /* dialer */ && /* @__PURE__ */ _jsxDEV(DialerConnectionHint, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 550,
          columnNumber: 42
        }, void 0), tab === 0 /* dialer */ && status !== 0 /* authorizing */ && /* @__PURE__ */ _jsxDEV(DialerHelpMessage, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 552,
          columnNumber: 15
        }, void 0), tab === 1 /* manual */ && /* @__PURE__ */ _jsxDEV(CallDirection, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 554,
          columnNumber: 42
        }, void 0), status !== 0 /* authorizing */ && /* @__PURE__ */ _jsxDEV(DialerUserPhoneSelector, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 555,
          columnNumber: 53
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 548,
        columnNumber: 11
      }, void 0), tab === 0 /* dialer */ && /* @__PURE__ */ _jsxDEV(NotePanelButton, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 557,
        columnNumber: 40
      }, void 0), isNotePanelOpen && /* @__PURE__ */ _jsxDEV(NotePanel, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 558,
        columnNumber: 31
      }, void 0), tab === 0 /* dialer */ && /* @__PURE__ */ _jsxDEV(DialPad, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 559,
        columnNumber: 40
      }, void 0), tab === 1 /* manual */ && /* @__PURE__ */ _jsxDEV(LogCallButton, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 560,
        columnNumber: 40
      }, void 0), /* @__PURE__ */ _jsxDEV(CorrectContactFlow, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 561,
        columnNumber: 11
      }, void 0)]
    }, void 0, true)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 525,
    columnNumber: 5
  }, void 0);
};
_s7(DialerContent, "nVbj6G/2qeiR2wACVNKWBOLPwYQ=", false, function() {
  return [useDialer, useDialer, useDialer, useDialerStore, useActiveUserSettings];
});
_c5 = DialerContent;
const NotePanelButton = () => {
  _s8();
  const {
    setState
  } = useDialerStore();
  const activity = useDialer((state) => state.activity);
  const {
    t
  } = useTranslation();
  return activity ? /* @__PURE__ */ _jsxDEV("div", {
    className: styles.notePanelButton,
    onClick: () => setState("notePanelOpen", true),
    children: /* @__PURE__ */ _jsxDEV(Button, {
      variant: "clear",
      size: "small",
      color: "peanut",
      iconLeft: "noteAction",
      uppercase: false,
      children: t("dialer.addNote")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 575,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 574,
    columnNumber: 5
  }, void 0) : null;
};
_s8(NotePanelButton, "9GXI3dgxgJZN7SJoi1fRgGutDZo=", false, function() {
  return [useDialerStore, useDialer, useTranslation];
});
_c6 = NotePanelButton;
const NotePanel = () => {
  _s9();
  const [editor, setEditor] = useState(null);
  const [lastBobjectId, setLastBobjectId] = useState(null);
  const activity = useDialer((state) => state.activity);
  const note = useDialer((state) => state.note);
  const tab = useDialer((state) => state.tab);
  const bobjectId = useDialer((state) => state.bobjectId);
  const open = useDialer((state) => state.open);
  const {
    t
  } = useTranslation();
  const {
    setState
  } = useDialerStore();
  const {
    settings
  } = useActiveUserSettings();
  const {
    patchBobject
  } = useBobject(BobjectTypes.Activity, settings?.account.id);
  async function setNote(note2) {
    setState("note", note2);
    if (tab === 0 /* dialer */) {
      await debouncedSaveNote(note2);
    }
  }
  const plugins = useRichTextEditorPlugins({
    images: false,
    templateVariables: false
  });
  const debouncedSaveNote = useCallback(debounce(async (note2) => {
    if (note2) {
      try {
        await patchBobject(activity.id.objectId, {
          contents: {
            ACTIVITY__NOTE: serialize(note2, {
              format: "AST",
              plugins
            })
          },
          params: {
            skipEmptyUpdates: true
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, 1e3), []);
  const classes = clsx(styles.notePanel, {
    [styles.notePanelManual]: tab === 1 /* manual */
  });
  const toolbarClasses = clsx(styles.toolbar, {
    [styles.toolbarManual]: tab === 1 /* manual */
  });
  useEffect(() => {
    if (editor && !note) {
      resetEditorChildren(editor);
    }
  }, [editor, note]);
  useEffect(() => {
    if (open !== "CLOSED" /* closed */) {
      if (!bobjectId || bobjectId !== lastBobjectId) {
        setState("note", null);
      }
      setLastBobjectId(bobjectId);
    }
  }, [bobjectId, open]);
  return /* @__PURE__ */ _jsxDEV(motion.div, {
    initial: {
      y: tab === 1 /* manual */ ? 0 : "100%"
    },
    animate: {
      y: 0
    },
    exit: {
      y: "100%"
    },
    transition: {
      duration: 0.2
    },
    className: classes,
    children: /* @__PURE__ */ _jsxDEV(RichTextEditor, {
      id: "callNote",
      value: note,
      plugins,
      placeholder: t("dialer.notePlaceholder"),
      onChange: setNote,
      style: {
        padding: "12px 28px 4px 28px"
      },
      setEditor,
      children: (editor2) => /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles.editorContent,
          children: editor2
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 674,
          columnNumber: 13
        }, void 0), tab !== 1 /* manual */ && /* @__PURE__ */ _jsxDEV("div", {
          className: styles.closeNotePanel,
          onClick: () => setState("notePanelOpen", false),
          children: /* @__PURE__ */ _jsxDEV(Icon, {
            name: "cross",
            size: 16,
            color: "bloobirds"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 680,
            columnNumber: 17
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 676,
          columnNumber: 15
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: toolbarClasses,
          children: /* @__PURE__ */ _jsxDEV(EditorToolbar, {
            backgroundColor: "white",
            children: [/* @__PURE__ */ _jsxDEV(EditorToolbarControlsSection, {
              color: "peanut"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 685,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(EditorToolbarFontStylesSection, {
              color: "peanut"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 686,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(EditorToolbarTextMarksSection, {
              color: "peanut"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 687,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(EditorToolbarListsSection, {
              color: "peanut"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 688,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 684,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 683,
          columnNumber: 13
        }, void 0)]
      }, void 0, true)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 661,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 654,
    columnNumber: 5
  }, void 0);
};
_s9(NotePanel, "YmzuUVrKE4bRF+6UfTZQrtasrF4=", false, function() {
  return [useDialer, useDialer, useDialer, useDialer, useDialer, useTranslation, useDialerStore, useActiveUserSettings, useBobject, useRichTextEditorPlugins];
});
_c7 = NotePanel;
const CorrectContactFlow = () => {
  _s10();
  const activity = useDialer((state) => state.activity);
  const status = useDialer((state) => state.status);
  const {
    setActivity
  } = useDialerStore();
  const [activityCCF, setActivityCCF] = useState(null);
  const [showCorrectContactFlow, setShowCorrectContactFlow] = React.useState(false);
  const [mainActivityBobject, setMainActivityBobject] = React.useState(null);
  const {
    openWizard,
    resetWizardProperties
  } = useWizardContext();
  const incomingAccepted = useDialer((state) => state.incomingAccepted);
  const direction = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION)?.valueLogicRole;
  async function openCorrectContactFlow() {
    const mainBobjectId = getMainBobjectId(activity);
    if (mainBobjectId) {
      const response = await api.get(`/linkedin/${PluralBobjectTypes[mainBobjectId.split("/")[1]]?.toLowerCase()}/${mainBobjectId.split("/")[2]}`);
      setMainActivityBobject(response?.data);
    }
    setShowCorrectContactFlow(true);
  }
  React.useEffect(() => {
    if (activity && status === 4 /* callEnded */ && (direction == DIRECTION_VALUES_LOGIC_ROLE.OUTGOING || incomingAccepted)) {
      api.get(`/bobjects/${activity.id?.value}/form?injectReferences=true`).then((response) => {
        if (response?.data) {
          setActivityCCF(fillReferenceFields(response?.data));
        }
        openCorrectContactFlow();
      });
    }
  }, [status]);
  function handleClose() {
    setActivity(null);
    setShowCorrectContactFlow(false);
    setMainActivityBobject(null);
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }
  if (activityCCF && showCorrectContactFlow) {
    openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activityCCF, {
      referenceBobject: mainActivityBobject,
      handleClose
    });
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
};
_s10(CorrectContactFlow, "xNwXxZ2kdu6nXaomUlVeJvUQTa0=", false, function() {
  return [useDialer, useDialer, useDialerStore, useWizardContext, useDialer];
});
_c8 = CorrectContactFlow;
const DialerHeader = ({
  showTabs,
  showNoteButton
}) => {
  _s11();
  const {
    minimize,
    close,
    setSelectedTab,
    setState
  } = useDialerStore();
  const tab = useDialer((state) => state.tab);
  const status = useDialer((state) => state.status);
  const {
    t
  } = useTranslation();
  const activity = useDialer((state) => state.activity);
  const callInProgress = status === 3 /* connected */ || status === 5 /* incoming */ || status === 4 /* callEnded */;
  const closeClasses = clsx(styles.headerClose, {
    [styles.closeDisabled]: callInProgress
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.header,
    id: "dialer-drag-box",
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.headerIcons,
      children: [/* @__PURE__ */ _jsxDEV(Tooltip, {
        title: callInProgress ? t("dialer.tooltips.cannotClose") : t("dialer.tooltips.close"),
        position: "top",
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: closeClasses,
          onClick: () => {
            if (!callInProgress) {
              close();
            }
          },
          children: /* @__PURE__ */ _jsxDEV(Icon, {
            name: "cross",
            color: callInProgress ? "softBloobirds" : "bloobirds",
            size: 20
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 793,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 785,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 781,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: t("dialer.tooltips.minimize"),
        position: "top",
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.headerClose,
          onClick: minimize,
          children: /* @__PURE__ */ _jsxDEV(Icon, {
            name: "minus",
            color: "bloobirds",
            size: 20
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 798,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 797,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 796,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 780,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.headerDragger,
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        name: "dragAndDrop",
        size: 24,
        color: "lightBloobirds"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 803,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 802,
      columnNumber: 7
    }, void 0), showTabs ? /* @__PURE__ */ _jsxDEV("div", {
      className: styles.headerTabs,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: clsx(styles.headerTab, {
          [styles.headerTab_active]: tab === 0 /* dialer */
        }),
        onClick: () => {
          setSelectedTab(0 /* dialer */);
          setState("notePanelOpen", false);
        },
        children: [/* @__PURE__ */ _jsxDEV(Icon, {
          name: "phone",
          color: "bloobirds",
          size: 16
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 816,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "bloobirds",
          children: t("dialer.dialer")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 817,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 807,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: clsx(styles.headerTab, {
          [styles.headerTab_active]: tab === 1 /* manual */,
          [styles.headerTab_disabled]: callInProgress
        }),
        onClick: () => {
          if (!callInProgress)
            setSelectedTab(1 /* manual */);
        },
        children: [/* @__PURE__ */ _jsxDEV(Icon, {
          name: "noteAction",
          color: !callInProgress ? "bloobirds" : "softPeanut",
          size: 16
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 830,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "bloobirds",
          children: t("dialer.logCall.button")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 835,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 821,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 806,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
      className: styles.headerButtons,
      children: [showNoteButton && !!activity && /* @__PURE__ */ _jsxDEV(NoteButton, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 842,
        columnNumber: 44
      }, void 0), /* @__PURE__ */ _jsxDEV(PitchButton, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 843,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 841,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 779,
    columnNumber: 5
  }, void 0);
};
_s11(DialerHeader, "6hyEUl1YD5gbIp9hxWvvMB686Vg=", false, function() {
  return [useDialerStore, useDialer, useDialer, useTranslation, useDialer];
});
_c9 = DialerHeader;
function getDialerStatusText(status, t) {
  switch (status) {
    case 1 /* registering */:
      return t("dialer.hints.connecting");
    case 0 /* authorizing */:
    case 2 /* idle */:
      return t("dialer.hints.make");
    case 3 /* connected */:
      return t("dialer.hints.onCall");
    case 4 /* callEnded */:
      return t("dialer.hints.callEnded");
    case 5 /* incoming */:
      return t("dialer.hints.incomingCall");
    default:
      return t("dialer.hints.make");
  }
}
const PitchButton = () => {
  _s12();
  const store = useDialerStore();
  const showingExternalScreen = useDialer((state) => state.showingExtendedScreen);
  const extendedScreenType = useDialer((state) => state.extendedScreenType);
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ _jsxDEV(Button, {
    className: clsx(styles.headerButton, {
      [styles.pitchButtonActivated]: showingExternalScreen && extendedScreenType === "pitches"
    }),
    size: "small",
    variant: "secondary",
    color: "purple",
    iconLeft: "chat",
    uppercase: false,
    onClick: () => store.toggleExtendedScreen("pitches"),
    children: t("dialer.pitch")
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 875,
    columnNumber: 5
  }, void 0);
};
_s12(PitchButton, "2JHX9t79WWGwNJ1YJYQ3r/jnBok=", false, function() {
  return [useDialerStore, useDialer, useDialer, useTranslation];
});
_c10 = PitchButton;
const NoteButton = () => {
  _s13();
  const store = useDialerStore();
  const showingExternalScreen = useDialer((state) => state.showingExtendedScreen);
  const extendedScreenType = useDialer((state) => state.extendedScreenType);
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ _jsxDEV(Button, {
    className: clsx(styles.headerButton, {
      [styles.notesButtonActivated]: showingExternalScreen && extendedScreenType === "notes"
    }),
    size: "small",
    variant: "secondary",
    color: "banana",
    iconLeft: "note",
    uppercase: false,
    onClick: () => store.toggleExtendedScreen("notes"),
    children: t("dialer.note")
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 897,
    columnNumber: 5
  }, void 0);
};
_s13(NoteButton, "2JHX9t79WWGwNJ1YJYQ3r/jnBok=", false, function() {
  return [useDialerStore, useDialer, useDialer, useTranslation];
});
_c11 = NoteButton;
const DialerStatusHeader = () => {
  _s14();
  const status = useDialer((state) => state.status);
  const tab = useDialer((state) => state.tab);
  const {
    t
  } = useTranslation();
  const statusText = getDialerStatusText(status, t);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.statusHeader,
    children: [/* @__PURE__ */ _jsxDEV(Text, {
      weight: "bold",
      children: tab === 1 /* manual */ ? t("dialer.logCall.title") : statusText
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 922,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(PitchButton, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 923,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 921,
    columnNumber: 5
  }, void 0);
};
_s14(DialerStatusHeader, "llV4K9qR1hLQLmFJc2GHC3OPOE4=", false, function() {
  return [useDialer, useDialer, useTranslation];
});
_c12 = DialerStatusHeader;
const DialerHelpMessage = () => {
  _s15();
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.helpMessage,
    children: [/* @__PURE__ */ _jsxDEV(Icon, {
      name: "info",
      size: 16,
      color: "bloobirds"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 933,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      size: "xs",
      color: "softPeanut",
      children: t("dialer.hints.connectionProblems")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 934,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 932,
    columnNumber: 5
  }, void 0);
};
_s15(DialerHelpMessage, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c13 = DialerHelpMessage;
const DialerErrorWarning = () => {
  _s16();
  const errors = useDialer((state) => state.errors);
  const warnings = useDialer((state) => state.warnings);
  const {
    setState
  } = useDialerStore();
  if (errors.length === 0 && warnings.length === 0) {
    return null;
  }
  const className = clsx(styles.errorWarning, {
    [styles.errorWarning_error]: errors.length > 0,
    [styles.errorWarning_warning]: warnings.length > 0
  });
  return /* @__PURE__ */ _jsxDEV(motion.div, {
    className,
    initial: {
      scale: 0
    },
    animate: {
      scale: 1
    },
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    },
    children: [/* @__PURE__ */ _jsxDEV("div", {
      children: /* @__PURE__ */ _jsxDEV(Text, {
        size: "m",
        color: errors.length > 0 ? "white" : "softPeanut",
        weight: "bold",
        align: "center",
        children: errors.length > 0 ? errors[0].description : warnings[0].description
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 967,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 966,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      size: "xs",
      color: errors.length > 0 ? "white" : "softPeanut",
      children: errors.length > 0 ? errors[0].explanation : warnings[0].explanation
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 976,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
      name: "cross",
      size: 24,
      color: errors.length > 0 ? "white" : "softPeanut",
      onClick: () => {
        if (errors.length > 0) {
          setState("errors", []);
        } else {
          setState("warnings", []);
        }
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 979,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 956,
    columnNumber: 5
  }, void 0);
};
_s16(DialerErrorWarning, "uevR+u+S5APrvWmGybKEQi7tT8c=", false, function() {
  return [useDialer, useDialer, useDialerStore];
});
_c14 = DialerErrorWarning;
const CallDirection = () => {
  _s17();
  const callDirection = useDialer((state) => state.callDirection);
  const {
    setState
  } = useDialerStore();
  const {
    t
  } = useTranslation();
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.callDirectionContainer,
    children: [/* @__PURE__ */ _jsxDEV(Text, {
      size: "xs",
      weight: "bold",
      children: t("dialer.direction.title")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 1008,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.callDirection,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.callDirectionLabel,
        children: [callDirection === "inbound" && /* @__PURE__ */ _jsxDEV(Icon, {
          name: "callIncoming",
          size: 16,
          color: "bloobirds"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 1013,
          columnNumber: 43
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: callDirection === "inbound" ? "peanut" : "softPeanut",
          align: "right",
          children: t("dialer.direction.incoming")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 1014,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 1012,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: clsx(styles.directionSelector, {
          [styles.directionSelector__left]: callDirection === "inbound",
          [styles.directionSelector__right]: callDirection === "outbound"
        }),
        onClick: () => setState("callDirection", callDirection === "inbound" ? "outbound" : "inbound"),
        children: /* @__PURE__ */ _jsxDEV(motion.div, {
          layout: true,
          transition: spring
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 1031,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 1022,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.callDirectionLabel,
        children: [callDirection === "outbound" && /* @__PURE__ */ _jsxDEV(Icon, {
          name: "callOutgoing",
          size: 16,
          color: "bloobirds"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 1034,
          columnNumber: 44
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: callDirection === "outbound" ? "peanut" : "softPeanut",
          align: "left",
          children: t("dialer.direction.outgoing")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 1035,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 1033,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 1011,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 1007,
    columnNumber: 5
  }, void 0);
};
_s17(CallDirection, "D+Z3TKKJzMOt9x1q6SopGowRA+0=", false, function() {
  return [useDialer, useDialerStore, useTranslation];
});
_c15 = CallDirection;
var _c, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15;
$RefreshReg$(_c, "Dialer");
$RefreshReg$(_c2, "ActivityHandler");
$RefreshReg$(_c3, "FloatingBox");
$RefreshReg$(_c4, "DialerDragBox");
$RefreshReg$(_c5, "DialerContent");
$RefreshReg$(_c6, "NotePanelButton");
$RefreshReg$(_c7, "NotePanel");
$RefreshReg$(_c8, "CorrectContactFlow");
$RefreshReg$(_c9, "DialerHeader");
$RefreshReg$(_c10, "PitchButton");
$RefreshReg$(_c11, "NoteButton");
$RefreshReg$(_c12, "DialerStatusHeader");
$RefreshReg$(_c13, "DialerHelpMessage");
$RefreshReg$(_c14, "DialerErrorWarning");
$RefreshReg$(_c15, "CallDirection");
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
