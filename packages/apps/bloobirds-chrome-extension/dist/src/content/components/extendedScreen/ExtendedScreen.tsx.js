import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extendedScreen/ExtendedScreen.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extendedScreen/ExtendedScreen.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extendedScreen/ExtendedScreen.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"]; const useState = __vite__cjsImport2_react["useState"];
import { CallDetail, EmailThreadDetail, InboundDetail, LinkedInDetail, MeetingDetail, WhatsappDetail } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-activityFeed-dist-index.js.js";
import { Button, IconButton, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useFullSalesEnabled, useIsB2CAccount, useMinimizableModals, usePlaybook, useSessionStorage, useSyncBobjectStatus } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { InfoWarningSync } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-misc-src-index.tsx.js";
import { SegmentationFilter } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-index.tsx.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, SessionStorageKeys, TemplateStage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { AnimatePresence, motion, useAnimation } from "/vendor/.vite-deps-framer-motion.js__v--396e37ef.js";
import { v4 as uuid } from "/vendor/.vite-deps-uuid.js__v--488548d2.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useFloatingMenuContext } from "/src/content/components/floatingMenu/floatingMenuContext.tsx.js";
import styles from "/src/content/components/extendedScreen/extendedScreen.module.css.js";
import { BobjectDetail } from "/src/content/components/extendedScreen/pages/bobjectDetail/bobjectDetail.tsx.js";
import { NoteDetail } from "/src/content/components/extendedScreen/pages/noteDetail/noteDetail.tsx.js";
import { OrderContactViewDetails } from "/src/content/components/extendedScreen/pages/orderContactViewDetails/orderContactViewDetails.tsx.js";
import SimilarDealsWrapper from "/src/content/components/extendedScreen/pages/similarDeals/similarDealsWrapper.tsx.js";
import { TemplateDetail } from "/src/content/components/extendedScreen/pages/templateDetail/templateDetail.tsx.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { AssigneeComponent } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-index.tsx.js";
import { getFieldByLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { RelatedObjectDetails } from "/src/content/components/extendedScreen/pages/relatedObjectDetails/relatedObjectDetails.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const ExtendedContent = ({
  type,
  actionsDisabled,
  isBubble
}) => {
  _s();
  const {
    useGetActiveBobject,
    useGetExtendedContext,
    useGetSettings,
    useGetDataModel,
    closeExtendedScreen,
    useGetActiveBobjectContext,
    setExtendedContext,
    refreshExtendedScreenBobject,
    setContactViewBobjectId
  } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const data = useGetActiveBobjectContext();
  const company = data?.company;
  const dataModel = useGetDataModel();
  const stage = dataModel?.findValueById(activeBobject?.stage);
  const isSalesStage = stage?.logicRole?.includes("SALES") || activeBobject?.id.typeName === "Opportunity";
  const {
    setMeta,
    getMeta
  } = useFloatingMenuContext();
  const {
    bobject,
    threadId,
    extensionBobject,
    extraInfo,
    mutate
  } = useGetExtendedContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const userId = settings?.user?.id;
  const isSalesEnabled = useFullSalesEnabled(accountId);
  const meta = getMeta();
  const defaultStage = isSalesStage ? TemplateStage.Sales : TemplateStage.Prospecting;
  const playbookStage = meta?.stage ? meta.stage : defaultStage;
  const {
    segmentationFields,
    activeBobjectSegmentationValues
  } = usePlaybook({
    stage: playbookStage,
    bobjectData: {
      company,
      activeBobject
    }
  });
  const isB2CAccount = useIsB2CAccount();
  const segmentationData = useMemo(() => meta?.segmentationData ? meta.segmentationData : activeBobjectSegmentationValues, [meta?.segmentationData, activeBobjectSegmentationValues]);
  switch (type) {
    case ExtendedContextTypes.CALL_DETAILS:
      return /* @__PURE__ */ _jsxDEV(
        CallDetail,
        {
          activity: bobject,
          dataModel,
          onSave: () => {
            closeExtendedScreen();
          },
          actionsDisabled,
          userId,
          openSuggestedActions: () => {
            setExtendedContext({
              type: ExtendedContextTypes.SUGGESTED_ACTIONS,
              bobject
            });
          },
          isBubble
        },
        void 0,
        false,
        {
          fileName: _jsxFileName,
          lineNumber: 98,
          columnNumber: 9
        },
        void 0
      );
    case ExtendedContextTypes.ORDER_CONTACT_DETAILS:
      return /* @__PURE__ */ _jsxDEV(OrderContactViewDetails, {
        bobject: extensionBobject,
        extraInfo,
        mutate
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 115,
        columnNumber: 9
      }, void 0);
    case ExtendedContextTypes.EMAIL_THREAD:
      return /* @__PURE__ */ _jsxDEV(
        EmailThreadDetail,
        {
          activity: bobject,
          emailThreadId: threadId,
          accountId,
          dataModel,
          actionsDisabled,
          userId
        },
        void 0,
        false,
        {
          fileName: _jsxFileName,
          lineNumber: 119,
          columnNumber: 9
        },
        void 0
      );
    case ExtendedContextTypes.MEETING_DETAILS:
      return /* @__PURE__ */ _jsxDEV(
        MeetingDetail,
        {
          activity: bobject,
          dataModel,
          onSave: () => {
          },
          actionsDisabled,
          userId,
          mutate: refreshExtendedScreenBobject,
          onGoToBobject: (bobjectId) => {
            setContactViewBobjectId(bobjectId);
          },
          isBubble
        },
        void 0,
        false,
        {
          fileName: _jsxFileName,
          lineNumber: 131,
          columnNumber: 9
        },
        void 0
      );
    case ExtendedContextTypes.LINKEDIN_THREAD:
      return /* @__PURE__ */ _jsxDEV(
        LinkedInDetail,
        {
          activity: bobject,
          accountId,
          dataModel,
          actionsDisabled,
          userId
        },
        void 0,
        false,
        {
          fileName: _jsxFileName,
          lineNumber: 149,
          columnNumber: 9
        },
        void 0
      );
    case ExtendedContextTypes.WHATSAPP_THREAD:
      return /* @__PURE__ */ _jsxDEV(
        WhatsappDetail,
        {
          activity: bobject,
          settings,
          activeBobject,
          accountId,
          dataModel,
          channel: "WHATSAPP",
          userId
        },
        void 0,
        false,
        {
          fileName: _jsxFileName,
          lineNumber: 160,
          columnNumber: 9
        },
        void 0
      );
    case ExtendedContextTypes.WHATSAPP_BUSINESS_THREAD: {
      return /* @__PURE__ */ _jsxDEV(
        WhatsappDetail,
        {
          activeBobject,
          settings,
          activity: bobject,
          accountId,
          dataModel,
          channel: "WHATSAPP_BUSINESS",
          userId,
          actionsDisabled
        },
        void 0,
        false,
        {
          fileName: _jsxFileName,
          lineNumber: 173,
          columnNumber: 9
        },
        void 0
      );
    }
    case ExtendedContextTypes.INBOUND_ACTIVITY:
      return /* @__PURE__ */ _jsxDEV(
        InboundDetail,
        {
          activity: bobject,
          dataModel
        },
        void 0,
        false,
        {
          fileName: _jsxFileName,
          lineNumber: 188,
          columnNumber: 9
        },
        void 0
      );
    case ExtendedContextTypes.PLAYBOOK_PITCH:
    case ExtendedContextTypes.PLAYBOOK_EMAIL:
    case ExtendedContextTypes.PLAYBOOK_LINKEDIN_MESSAGE:
    case ExtendedContextTypes.PLAYBOOK_SNIPPET:
    case ExtendedContextTypes.PLAYBOOK_WHATSAPP:
      return /* @__PURE__ */ _jsxDEV(TemplateDetail, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 199,
        columnNumber: 14
      }, void 0);
    case ExtendedContextTypes.PLAYBOOK_SEGMENTATION_FILTER:
      return /* @__PURE__ */ _jsxDEV(SegmentationFilter, {
        shouldShowBattlecards: meta?.shouldShowBattlecards,
        shouldShowVisibilityFilters: meta?.shouldShowVisibilityFilters,
        activeBobjectSegmentationValues,
        isSalesEnabled,
        stage: meta?.stage,
        defaultStage,
        segmentationFields,
        filterValues: segmentationData,
        visibilityFilters: meta?.visibilityFilters,
        setFiltersContext: (value) => {
          setMeta({
            ...value,
            isFilterViewOpen: true
          });
        },
        isSmartEmail: false
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 202,
        columnNumber: 9
      }, void 0);
    case ExtendedContextTypes.BOBJECT_DETAILS:
      return /* @__PURE__ */ _jsxDEV(BobjectDetail, {
        isB2CAccount
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 219,
        columnNumber: 14
      }, void 0);
    case ExtendedContextTypes.SIMILAR_DEALS:
      return /* @__PURE__ */ _jsxDEV(
        SimilarDealsWrapper,
        {
          company: bobject
        },
        void 0,
        false,
        {
          fileName: _jsxFileName,
          lineNumber: 222,
          columnNumber: 9
        },
        void 0
      );
    case ExtendedContextTypes.NOTE_DETAILS:
      return /* @__PURE__ */ _jsxDEV(NoteDetail, {
        id: uuid(),
        data: extraInfo,
        onSave: () => {
          closeExtendedScreen();
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 229,
        columnNumber: 9
      }, void 0);
    case ExtendedContextTypes.RELATED_OBJECT_DETAILS:
      return /* @__PURE__ */ _jsxDEV(RelatedObjectDetails, {
        data: extraInfo
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 240,
        columnNumber: 9
      }, void 0);
    default:
      return /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
  }
};
_s(ExtendedContent, "GrGexVKmBIX87/gnQ6WZJuIqnaU=", true, function() {
  return [useExtensionContext, useFloatingMenuContext, useFullSalesEnabled, usePlaybook, useIsB2CAccount];
});
_c = ExtendedContent;
function Buttons({
  buttonData,
  actionsDisabled
}) {
  return buttonData.map((props) => {
    const buttonDisabled = actionsDisabled && props?.name !== "edit";
    const buttonText = props?.buttonText;
    if (buttonText) {
      return /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: buttonDisabled ? "You don\u2019t have permissions required to perform this action" : props?.tooltipText,
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(Button, {
          ...props,
          iconLeft: props?.name,
          uppercase: false,
          size: "small",
          disabled: buttonDisabled || props?.disabled,
          color: buttonDisabled || props?.disabled ? void 0 : "purple",
          children: buttonText
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 261,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 253,
        columnNumber: 9
      }, this);
    } else {
      return /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: props?.tooltipText,
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(IconButton, {
          size: 22,
          ...props
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 276,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 275,
        columnNumber: 9
      }, this);
    }
  });
}
_c2 = Buttons;
export const ExtendedScreen = () => {
  _s2();
  const {
    useGetExtendedContext,
    closeExtendedScreen,
    useGetSidePeekEnabled
  } = useExtensionContext();
  const {
    open,
    buttonData,
    type,
    bobject,
    actionsDisabled,
    extraInfo
  } = useGetExtendedContext();
  const {
    get,
    remove
  } = useSessionStorage();
  const [lastBobject, setLastBobject] = useState(void 0);
  const [sideOpen, setSideOpen] = useState("left");
  const {
    getMeta,
    setMeta,
    getPosition
  } = useFloatingMenuContext();
  const controls = useAnimation();
  const meta = getMeta();
  const position = getPosition();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const {
    openMinimizableModal
  } = useMinimizableModals();
  const {
    syncStatus
  } = useSyncBobjectStatus(bobject?.id?.accountId, [bobject]);
  const assignee = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const {
    t
  } = useTranslation();
  const [internalOpen, setInternalOpen] = useState(false);
  function changeSides() {
    if (position.x < 370) {
      setSideOpen("right");
    } else {
      setSideOpen("left");
    }
  }
  const handleOnClose = () => {
    if (type === ExtendedContextTypes.PLAYBOOK_SEGMENTATION_FILTER)
      setMeta({
        ...meta,
        isFilterViewOpen: false
      });
    closeExtendedScreen();
  };
  function getExtendedScreenPosition() {
    if (sidePeekEnabled) {
      return {
        startingX: -50,
        finishingX: -390
      };
    } else {
      if (position) {
        changeSides();
        if (position.x < 370) {
          return {
            startingX: 20,
            finishingX: 317
          };
        } else {
          return {
            startingX: -50,
            finishingX: -337
          };
        }
      }
      return {};
    }
  }
  useEffect(() => {
    if (type && !internalOpen) {
      setInternalOpen(true);
      setTimeout(() => controls?.start("start"), 10);
    }
  }, [type]);
  useEffect(() => {
    if (lastBobject?.id?.value !== bobject?.id?.value || !lastBobject) {
      if (open) {
        controls?.start("start");
      } else {
        controls?.start("close").then(() => closeExtendedScreen());
        if (meta)
          setMeta({
            ...meta,
            isFilterViewOpen: false
          });
      }
    }
    setLastBobject(bobject);
  }, [open, bobject]);
  useEffect(() => {
    if (!sidePeekEnabled) {
      if (sideOpen === "left" && position?.x < 372 || sideOpen === "right" && position?.x > window.innerWidth - 650) {
        if (open)
          controls?.start("start");
        setSideOpen(sideOpen === "left" ? "right" : "left");
      }
    } else {
      if (open)
        controls?.start("start");
      setSideOpen("left");
    }
  }, [position?.x, sidePeekEnabled]);
  const variants = {
    start: () => {
      const {
        startingX,
        finishingX
      } = getExtendedScreenPosition();
      return {
        left: [startingX, finishingX],
        scaleX: [0, 1],
        transition: {
          duration: 0.25
        }
      };
    },
    close: () => {
      const {
        startingX,
        finishingX
      } = getExtendedScreenPosition();
      return {
        left: [finishingX, startingX],
        scaleX: [1, 0],
        transition: {
          duration: 0.25
        }
      };
    }
  };
  const isRightOpen = sideOpen === "right";
  const handleToggleView = () => {
    if (type === ExtendedContextTypes.NOTE_DETAILS) {
      const noteInfo = get(SessionStorageKeys.NoteInfo);
      remove(SessionStorageKeys.NoteInfo);
      closeExtendedScreen();
      openMinimizableModal({
        type: "note",
        data: {
          ...extraInfo,
          ...noteInfo,
          bobject
        }
      });
    }
  };
  const headerNotes = clsx(styles.header, {
    [styles.headerRight]: isRightOpen
  });
  const getSyncName = () => {
    switch (type) {
      case ExtendedContextTypes.CALL_DETAILS:
        return "call";
      case ExtendedContextTypes.NOTE_DETAILS:
        return "note";
      case ExtendedContextTypes.MEETING_DETAILS:
        return "meeting";
      default:
        return "activity";
    }
  };
  const syncName = getSyncName();
  const enableRightSyncWarning = type === ExtendedContextTypes.CALL_DETAILS || type === ExtendedContextTypes.MEETING_DETAILS || type === ExtendedContextTypes.INBOUND_ACTIVITY || type === ExtendedContextTypes.NOTE_DETAILS;
  return /* @__PURE__ */ _jsxDEV(AnimatePresence, {
    children: internalOpen && /* @__PURE__ */ _jsxDEV(motion.div, {
      exit: {
        opacity: 0
      },
      animate: controls,
      variants,
      className: clsx({
        [styles.extended_sidePeek]: sidePeekEnabled,
        [styles.extended]: !isRightOpen,
        [styles.extendedRight]: isRightOpen
      }),
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: headerNotes,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          children: [/* @__PURE__ */ _jsxDEV(Tooltip, {
            title: t("extendedScreen.header.close"),
            position: "top",
            children: /* @__PURE__ */ _jsxDEV(IconButton, {
              name: "cross",
              color: "bloobirds",
              onClick: handleOnClose
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 449,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 448,
            columnNumber: 13
          }, void 0), type === ExtendedContextTypes.NOTE_DETAILS && /* @__PURE__ */ _jsxDEV(Tooltip, {
            title: t("extendedScreen.header.switchToDraggable"),
            position: "top",
            children: /* @__PURE__ */ _jsxDEV(IconButton, {
              name: "floatingpeek",
              onClick: handleToggleView,
              className: styles.rotate180
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 453,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 452,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 447,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.headerButtons,
          children: [buttonData && /* @__PURE__ */ _jsxDEV(Buttons, {
            buttonData,
            actionsDisabled
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 462,
            columnNumber: 28
          }, void 0), assignee && /* @__PURE__ */ _jsxDEV(AssigneeComponent, {
            value: assignee,
            size: "m"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 463,
            columnNumber: 26
          }, void 0), enableRightSyncWarning && syncStatus !== void 0 && !syncStatus && /* @__PURE__ */ _jsxDEV(InfoWarningSync, {
            type: syncName,
            id: bobject?.id,
            size: "medium"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 465,
            columnNumber: 17
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 461,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 446,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        style: {
          height: "100%",
          overflow: "auto",
          overscrollBehaviorX: "contain",
          borderBottomLeftRadius: "10px"
        },
        children: type && /* @__PURE__ */ _jsxDEV(ExtendedContent, {
          type,
          actionsDisabled,
          isBubble: !sidePeekEnabled
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 477,
          columnNumber: 20
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 469,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 437,
      columnNumber: 24
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 436,
    columnNumber: 5
  }, void 0);
};
_s2(ExtendedScreen, "VUUGAlWyXxNrBUkX2upZIaxsE/o=", true, function() {
  return [useExtensionContext, useSessionStorage, useFloatingMenuContext, useAnimation, useMinimizableModals, useSyncBobjectStatus, useTranslation];
});
_c3 = ExtendedScreen;
var _c, _c2, _c3;
$RefreshReg$(_c, "ExtendedContent");
$RefreshReg$(_c2, "Buttons");
$RefreshReg$(_c3, "ExtendedScreen");
if (import.meta.hot) {
  let isReactRefreshBoundary = function(mod) {
    if (mod == null || typeof mod !== "object") {
      return false;
    }
    let hasExports = false;
    let areAllExportsComponents = true;
    for (const exportName in mod) {
      hasExports = true;
      if (exportName === "__esModule") {
        continue;
      }
      const desc = Object.getOwnPropertyDescriptor(mod, exportName);
      if (desc && desc.get) {
        return false;
      }
      const exportValue = mod[exportName];
      if (!RefreshRuntime.isLikelyComponentType(exportValue)) {
        areAllExportsComponents = false;
      }
    }
    return hasExports && areAllExportsComponents;
  };
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  import.meta.hot.accept((mod) => {
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
