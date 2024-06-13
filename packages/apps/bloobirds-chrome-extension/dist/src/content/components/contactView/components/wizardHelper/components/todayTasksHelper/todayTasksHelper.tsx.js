import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/wizardHelper/components/todayTasksHelper/todayTasksHelper.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/wizardHelper/components/todayTasksHelper/todayTasksHelper.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/wizardHelper/components/todayTasksHelper/todayTasksHelper.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, IconButton, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useCustomTasks, useTasksFeed, useQuickLogActivity } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { ContactViewSubTab } from "/src/types/contactView.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { checkIsOverdue } from "/src/content/components/extensionLeftBar/extensionLeftBar.utils.tsx.js";
import { useContactViewContext } from "/src/content/components/contactView/context/contactViewContext.tsx.js";
import { useActivityFeed } from "/src/content/components/contactView/hooks/useActivityFeed.ts.js";
import { useSubscribeListeners } from "/src/content/components/contactView/hooks/useSubscribeListeners.tsx.js";
import { WizardMiniCard } from "/src/content/components/contactView/components/miniCard/miniCard.tsx.js";
import Arrow from "/src/content/components/contactView/components/wizardHelper/assets/Arrow.png__import_base64.js";
import styles from "/src/content/components/contactView/components/wizardHelper/wizardHelper.module.css.js";
import { CadenceManagementButton } from "/src/content/components/contactView/components/wizardHelper/components/cadenceManagementButton/cadenceManagementButton.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const TodayTasksHelper = ({
  hasCadenceTasks,
  isLoading,
  minimized,
  toggleCadenceControlVisibility
}) => {
  _s();
  const {
    actionsDisabled,
    setActiveSubTab
  } = useContactViewContext();
  const {
    useGetActiveBobject,
    useGetActiveBobjectContext,
    useGetTaskId,
    useGetSidePeekEnabled
  } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const contextData = useGetActiveBobjectContext();
  const {
    tasks,
    mutate: tasksMutate
  } = useTasksFeed(activeBobject, contextData, useSubscribeListeners);
  const {
    meetingActivities,
    mutateMeetingActivities: activityMutate
  } = useActivityFeed();
  useSubscribeListeners(BobjectTypes.Activity, tasksMutate);
  useSubscribeListeners(BobjectTypes.Activity, activityMutate);
  const taskId = useGetTaskId();
  const currentDate = new Date();
  const displayableTasks = tasks?.filter((task) => {
    const taskDate = new Date(task?.taskDate?.day);
    const timeDifference = currentDate.getTime() - taskDate.getTime();
    const differenceInDays = timeDifference / (1e3 * 60 * 60 * 24);
    return differenceInDays >= 0 && differenceInDays <= 7;
  });
  const wizardItems = [...meetingActivities || [], ...displayableTasks || []];
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const hasTodayItems = wizardItems?.length > 0;
  const isFirstItem = selectedItemIndex === 0;
  const isLastItem = selectedItemIndex === wizardItems?.length - 1;
  const displayedItem = wizardItems?.[selectedItemIndex];
  const sidePeekEnabled = useGetSidePeekEnabled();
  const {
    logCustomActivity
  } = useQuickLogActivity();
  const {
    customTasks
  } = useCustomTasks({
    disabled: false
  });
  const {
    t
  } = useTranslation();
  useEffect(() => {
    if (taskId) {
      const selectedTask = tasks.find(({
        id
      }) => id.value === taskId);
      if (selectedTask) {
        const indexOfTasks = wizardItems.indexOf(selectedTask);
        setSelectedItemIndex(indexOfTasks >= 0 ? indexOfTasks : 0);
      }
    }
  }, [taskId, tasks?.length, wizardItems?.length]);
  useEffect(() => {
    if (!isLoading && !taskId) {
      setSelectedItemIndex(0);
    }
  }, [isLoading]);
  function updateIndexOnSave() {
    if (isLastItem) {
      setSelectedItemIndex(0);
    }
  }
  const titleClasses = clsx(styles.titleContainer, {
    [styles.wizard__title_sidePeek]: sidePeekEnabled,
    [styles.titleContainerMinimized]: minimized && hasTodayItems,
    [styles.titleContainerMinimizedNoTasks]: minimized && !hasTodayItems
  });
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: /* @__PURE__ */ _jsxDEV("div", {
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: titleClasses,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "xxs",
          color: "verySoftBloobirds",
          className: styles.wizard__title,
          weight: "bold",
          children: t("sidePeek.overview.wizardHelper.todayTasks")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 95,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(CadenceManagementButton, {
          isActive: hasCadenceTasks,
          isDisabled: actionsDisabled,
          toggleCadenceControlVisibility,
          isProcessingTasks: isLoading
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 98,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("span", {
          className: clsx(styles.iconsContainer, {
            [styles.iconsContainerWithTasks]: wizardItems?.length > 1,
            [styles.iconsFirstTask]: isFirstItem && wizardItems?.length > 1,
            [styles.iconsLastTask]: isLastItem && wizardItems?.length > 1,
            [styles.iconsContainerSidePeek]: sidePeekEnabled
          }),
          children: [hasTodayItems && /* @__PURE__ */ _jsxDEV(_Fragment, {
            children: [/* @__PURE__ */ _jsxDEV(IconButton, {
              color: isFirstItem ? "verySoftBloobirds" : "white",
              name: "arrowLeft",
              size: 16,
              onClick: () => !isFirstItem && setSelectedItemIndex(selectedItemIndex - 1)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 114,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
              color: isLastItem ? "verySoftBloobirds" : "white",
              name: "arrowRight",
              size: 16,
              onClick: () => !isLastItem && setSelectedItemIndex(selectedItemIndex + 1)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 120,
              columnNumber: 17
            }, void 0)]
          }, void 0, true), /* @__PURE__ */ _jsxDEV(Button, {
            size: "small",
            uppercase: false,
            onClick: () => setActiveSubTab(ContactViewSubTab.TASKS),
            children: t("sidePeek.overview.wizardHelper.allTasks")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 128,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 104,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 94,
        columnNumber: 9
      }, void 0), hasTodayItems ? /* @__PURE__ */ _jsxDEV(WizardMiniCard, {
        bobject: displayedItem,
        isOverdue: displayedItem && checkIsOverdue(displayedItem),
        updateIndexOnSave,
        minimized,
        customTasks,
        logCustomActivity
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 138,
        columnNumber: 11
      }, void 0) : !minimized && /* @__PURE__ */ _jsxDEV(NoTasksForToday, {
        t
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 147,
        columnNumber: 25
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 7
    }, void 0)
  }, void 0, false);
};
_s(TodayTasksHelper, "/h5+EkU3uRN7JjdlFiDGZs6uZsE=", true, function() {
  return [useContactViewContext, useExtensionContext, useTasksFeed, useActivityFeed, useSubscribeListeners, useSubscribeListeners, useQuickLogActivity, useCustomTasks, useTranslation];
});
_c = TodayTasksHelper;
const NoTasksForToday = ({
  t
}) => {
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.noTasksBanner,
    children: [/* @__PURE__ */ _jsxDEV("img", {
      src: Arrow,
      alt: "arrow-icon"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 157,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      align: "center",
      size: "xs",
      color: "white",
      className: styles.noTasksBannerText,
      children: t("sidePeek.overview.wizardHelper.noTasksForToday")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 158,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      align: "center",
      size: "xs",
      color: "white",
      children: /* @__PURE__ */ _jsxDEV(Trans, {
        i18nKey: "sidePeek.overview.wizardHelper.clickToViewFutureTasks"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 162,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 161,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 156,
    columnNumber: 5
  }, void 0);
};
_c2 = NoTasksForToday;
var _c, _c2;
$RefreshReg$(_c, "TodayTasksHelper");
$RefreshReg$(_c2, "NoTasksForToday");
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
