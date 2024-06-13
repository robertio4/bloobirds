import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/quickLogCustomTask/quickLogCustomTask.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/quickLogCustomTask/quickLogCustomTask.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/quickLogCustomTask/quickLogCustomTask.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Dropdown, Icon, Section, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useCustomTasks, useQuickLogActivity, useUserHelpers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes, ExtensionHelperKeys, MessagesEvents, UserPermission } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { baseUrls, recoverScrollOfBox, removeScrollOfBox } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { ContactViewAction } from "/src/content/components/contactView/components/contactViewActions/contactViewActions.tsx.js";
import styles from "/src/content/components/contactView/components/quickLogCustomTask/quickLogCustomTask.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const QuickLogCustomTask = ({
  isDisabled,
  bobject,
  leads,
  visibilityProps
}) => {
  _s();
  const {
    visible,
    setVisible,
    ref
  } = visibilityProps;
  const {
    customTasks
  } = useCustomTasks({
    disabled: false
  });
  const {
    has,
    save
  } = useUserHelpers();
  const {
    useGetSettings
  } = useExtensionContext();
  const settings = useGetSettings();
  const permissions = settings?.user?.permissions;
  const canConfigureCustomTasks = permissions.includes(UserPermission.CUSTOM_TASK);
  const {
    openQuickLogModal
  } = useQuickLogActivity();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.contactViewActions.quickLogCustomTask"
  });
  const orderedCustomTasks = customTasks?.sort((a, b) => b.ordering - a.ordering);
  useEffect(() => {
    if (visible) {
      removeScrollOfBox();
    }
    if (!visible) {
      recoverScrollOfBox();
    }
  }, [visible]);
  const redirectToCustomTaskPlaybook = () => {
    const baseUrl = baseUrls[process.env.ENV];
    window.open(`${baseUrl}/app/playbook/custom-tasks`, "_blank");
  };
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: /* @__PURE__ */ _jsxDEV(Dropdown, {
      ref,
      visible,
      position: "top",
      style: {
        width: "218px",
        height: "255px"
      },
      anchor: /* @__PURE__ */ _jsxDEV(ContactViewAction, {
        color: "grape",
        icon: "zap",
        onClick: () => setVisible(true),
        isDisabled,
        tooltip: t("tooltip")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 73,
        columnNumber: 11
      }, void 0),
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.container,
        children: [/* @__PURE__ */ _jsxDEV(Section, {
          children: t("sectionTitle")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 83,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          children: orderedCustomTasks?.length === 0 ? /* @__PURE__ */ _jsxDEV("div", {
            className: styles.no_tasks,
            children: [/* @__PURE__ */ _jsxDEV(Icon, {
              name: "slash",
              color: "softPeanut",
              size: 24
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 87,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
              size: "xxs",
              align: "center",
              children: t("noCustomTasksCreated")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 88,
              columnNumber: 17
            }, void 0), canConfigureCustomTasks && /* @__PURE__ */ _jsxDEV(Button, {
              onClick: redirectToCustomTaskPlaybook,
              iconRight: "arrowRight",
              variant: "clear",
              size: "small",
              uppercase: false,
              expand: true,
              children: t("configureCustomTasks")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 92,
              columnNumber: 19
            }, void 0), !canConfigureCustomTasks && /* @__PURE__ */ _jsxDEV(Text, {
              size: "xxs",
              weight: "bold",
              children: t("askYourManager")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 104,
              columnNumber: 19
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 86,
            columnNumber: 15
          }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {
            children: [orderedCustomTasks?.map((customTask) => {
              const {
                id,
                name,
                icon,
                iconColor
              } = customTask;
              return /* @__PURE__ */ _jsxDEV("div", {
                className: styles.item,
                onClick: () => {
                  setVisible(false);
                  openQuickLogModal({
                    customTask,
                    leads,
                    selectedBobject: bobject,
                    onSubmit: () => {
                      if (!has(ExtensionHelperKeys.CUSTOM_TASKS)) {
                        save(ExtensionHelperKeys.CUSTOM_TASKS);
                      }
                      window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                        detail: {
                          type: BobjectTypes.Activity
                        }
                      }));
                      window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                        detail: {
                          type: bobject?.id?.typeName
                        }
                      }));
                    }
                  });
                },
                children: [/* @__PURE__ */ _jsxDEV("div", {
                  className: styles.icon,
                  children: /* @__PURE__ */ _jsxDEV(Icon, {
                    name: icon,
                    color: iconColor
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 142,
                    columnNumber: 25
                  }, void 0)
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 141,
                  columnNumber: 23
                }, void 0), /* @__PURE__ */ _jsxDEV("div", {
                  className: styles.title,
                  children: name
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 144,
                  columnNumber: 23
                }, void 0)]
              }, id, true, {
                fileName: _jsxFileName,
                lineNumber: 114,
                columnNumber: 21
              }, void 0);
            }), canConfigureCustomTasks ? /* @__PURE__ */ _jsxDEV("div", {
              className: styles.add_new_custom_task,
              children: /* @__PURE__ */ _jsxDEV(Button, {
                iconRight: "plus",
                variant: "clear",
                size: "small",
                uppercase: false,
                expand: true,
                onClick: redirectToCustomTaskPlaybook,
                children: t("addNewCustomTasks")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 150,
                columnNumber: 21
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 149,
              columnNumber: 19
            }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
              className: styles.footer,
              children: [/* @__PURE__ */ _jsxDEV(Text, {
                size: "xxs",
                align: "center",
                children: t("missingSome")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 163,
                columnNumber: 21
              }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
                size: "xxs",
                weight: "bold",
                align: "center",
                children: t("askYourManager")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 166,
                columnNumber: 21
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 162,
              columnNumber: 19
            }, void 0)]
          }, void 0, true)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 84,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 82,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 7
    }, void 0)
  }, void 0, false);
};
_s(QuickLogCustomTask, "7XTXIN5sE8e+w9sJg+nkOYsr+LU=", true, function() {
  return [useCustomTasks, useUserHelpers, useExtensionContext, useQuickLogActivity, useTranslation];
});
_c = QuickLogCustomTask;
export default QuickLogCustomTask;
var _c;
$RefreshReg$(_c, "QuickLogCustomTask");
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
