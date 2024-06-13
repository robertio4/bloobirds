import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/bulkActionsToasts/bulkActionsToasts.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/bulkActionsToasts/bulkActionsToasts.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/bulkActionsToasts/bulkActionsToasts.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { IconButton } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useEventSubscription } from "/vendor/.vite-deps-@bloobirds-it_plover.js__v--88b8fafa.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { atom, useRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/bulkActionsToasts/bulkActionsToasts.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const inProgressBulkActionsState = atom({
  key: "inProgressBulkActionsState",
  default: []
});
const closedBulkActionsState = atom({
  key: "closedBulkActionsState",
  default: []
});
const stoppedBulkActionsState = atom({
  key: "stoppedBulkActionsState",
  default: []
});
export function BulkActionsToasts() {
  _s();
  const {
    useGetSettings
  } = useExtensionContext();
  const settings = useGetSettings();
  const {
    t
  } = useTranslation();
  const [inProgressBulkActions, setInProgressBulkActions] = useRecoilState(inProgressBulkActionsState);
  const [closedBulkActions, setClosedBulkActions] = useRecoilState(closedBulkActionsState);
  const [stoppedActionIds, setStoppedActionIds] = useRecoilState(stoppedBulkActionsState);
  const [bulkActionProgress, setBulkActionProgress] = useState({});
  useEventSubscription("bulkAction", (data) => {
    if (data.bulkHistoryId) {
      const hasFinished = data.percent === "100";
      const isStopped = stoppedActionIds.includes(data.bulkHistoryId);
      if (stoppedActionIds.includes(data.bulkHistoryId)) {
        return;
      }
      setInProgressBulkActions((actions) => {
        const existingIndex = actions.findIndex((a) => a.bulkHistoryId === data.bulkHistoryId && a.uniqueNotificationId === data.uniqueNotificationId || a.uniqueNotificationId === data.uniqueNotificationId && a.status === "CREATING");
        const updatedActions = [...actions];
        if (existingIndex !== -1) {
          updatedActions.splice(existingIndex, 1);
        }
        updatedActions.splice(existingIndex, 0, {
          ...data,
          status: isStopped ? "STOPPED" : hasFinished ? "FINISHED" : "IN_PROGRESS"
        });
        if (hasFinished) {
          setTimeout(() => {
            setInProgressBulkActions((actions2) => actions2.filter((a) => a.bulkHistoryId !== data.bulkHistoryId || a.uniqueNotificationId !== data.uniqueNotificationId));
          }, 3e4);
        }
        setBulkActionProgress((prevProgress) => {
          const updatedProgress = {
            ...prevProgress
          };
          updatedActions.forEach((ba) => {
            updatedProgress[ba.bulkHistoryId] = Math.max(ba.percent, prevProgress[ba.bulkHistoryId] || 0);
          });
          return updatedProgress;
        });
        return updatedActions;
      });
    }
  });
  const handleStopBulkAction = async (bulkActionId) => {
    setStoppedActionIds((ids) => [...ids, bulkActionId]);
    const response = await api.get(`/bobjects/bulkAction/stopImport/${bulkActionId}`);
    if (response) {
      const finishedAction = inProgressBulkActions.find((a) => a.bulkHistoryId === bulkActionId);
      setInProgressBulkActions((actions) => [...actions.filter((a) => a.bulkHistoryId !== bulkActionId), {
        ...finishedAction,
        status: "STOPPED"
      }]);
    }
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.floatingNotifications,
    children: inProgressBulkActions.filter((ba) => ba !== null && ba.owner === settings?.user?.id && (ba.bulkHistoryId !== closedBulkActions.find((ca) => ca.bulkHistoryId === ba.bulkHistoryId)?.bulkHistoryId || !ba.bulkHistoryId)).map((bulkAction, idx) => {
      const progress = bulkActionProgress[bulkAction.bulkHistoryId] || 0;
      return /* @__PURE__ */ _jsxDEV("div", {
        className: clsx(styles.floatingNotification),
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.floatingNotificationContent,
          children: [/* @__PURE__ */ _jsxDEV("div", {
            className: styles.floatingNotificationTitle,
            children: [/* @__PURE__ */ _jsxDEV("span", {
              className: styles.floatingNotificationTitleText,
              children: [bulkAction.name, " ", !/\d/.test(bulkAction.name) && bulkAction.name !== t("extension.bulkActionsToast.startingListBulk") && t("extension.bulkActionsToast.forNObjects", {
                count: bulkAction.total
              })]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 128,
              columnNumber: 19
            }, this), /* @__PURE__ */ _jsxDEV(IconButton, {
              className: styles.floatingNotificationClose,
              name: "cross",
              size: 20,
              color: "peanut",
              onClick: () => {
                setClosedBulkActions((closed) => [...closed, bulkAction]);
              }
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 134,
              columnNumber: 19
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 127,
            columnNumber: 17
          }, this), /* @__PURE__ */ _jsxDEV("div", {
            className: styles.floatingNotificationProgress,
            children: [/* @__PURE__ */ _jsxDEV("div", {
              className: clsx(styles.floatingNotificationProgressBar, {
                [styles.completed]: bulkAction.status === "FINISHED",
                [styles.stopped]: bulkAction.status === "STOPPED",
                [styles.creating]: bulkAction.status === "CREATING"
              }),
              children: /* @__PURE__ */ _jsxDEV("div", {
                className: clsx(styles.floatingNotificationProgressBarFill, {
                  [styles.hideProgress]: bulkAction.status === "FINISHED" || bulkAction.status === "CREATING"
                }),
                style: {
                  width: `${progress}%`
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 152,
                columnNumber: 21
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 145,
              columnNumber: 19
            }, this), bulkAction.status === "FINISHED" && /* @__PURE__ */ _jsxDEV("span", {
              className: styles.floatingNotificationProgressText,
              children: t("extension.bulkActionsToast.completed")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 161,
              columnNumber: 21
            }, this), bulkAction.status === "IN_PROGRESS" && /* @__PURE__ */ _jsxDEV(_Fragment, {
              children: [/* @__PURE__ */ _jsxDEV("span", {
                className: styles.floatingNotificationProgressText,
                children: `${t("extension.bulkActionsToast.bulkAction")} ${progress}%`
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 167,
                columnNumber: 23
              }, this), /* @__PURE__ */ _jsxDEV("div", {
                className: styles.floatingNotificationProgressStopBox,
                onClick: () => handleStopBulkAction(bulkAction.bulkHistoryId),
                children: [/* @__PURE__ */ _jsxDEV(IconButton, {
                  name: "cross",
                  size: 16,
                  color: "white"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 174,
                  columnNumber: 25
                }, this), /* @__PURE__ */ _jsxDEV("span", {
                  className: styles.floatingNotificationProgressStop,
                  children: t("common.stop")
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 175,
                  columnNumber: 25
                }, this)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 170,
                columnNumber: 23
              }, this)]
            }, void 0, true), bulkAction.status === "STOPPED" && /* @__PURE__ */ _jsxDEV("span", {
              className: styles.floatingNotificationProgressText,
              children: t("common.stopped")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 182,
              columnNumber: 21
            }, this), bulkAction.status === "CREATING" && /* @__PURE__ */ _jsxDEV("span", {
              className: styles.floatingNotificationProgressText,
              children: [t("common.retrieving"), "..."]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 187,
              columnNumber: 21
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 144,
            columnNumber: 17
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 126,
          columnNumber: 15
        }, this)
      }, `${bulkAction.bulkHistoryId}-${idx}`, false, {
        fileName: _jsxFileName,
        lineNumber: 122,
        columnNumber: 13
      }, this);
    })
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 109,
    columnNumber: 5
  }, this);
}
_s(BulkActionsToasts, "GKlcGP6V8uxM4jCNNfcoC4xv3Tc=", true, function() {
  return [useExtensionContext, useTranslation, useRecoilState, useRecoilState, useRecoilState, useEventSubscription];
});
_c = BulkActionsToasts;
var _c;
$RefreshReg$(_c, "BulkActionsToasts");
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
