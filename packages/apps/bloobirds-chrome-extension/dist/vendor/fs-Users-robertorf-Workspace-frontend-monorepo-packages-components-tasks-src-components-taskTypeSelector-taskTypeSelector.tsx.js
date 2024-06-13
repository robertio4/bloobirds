import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-src-components-taskTypeSelector-taskTypeSelector.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/tasks/src/components/taskTypeSelector/taskTypeSelector.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/tasks/src/components/taskTypeSelector/taskTypeSelector.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Dropdown, Icon, Section, Text, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveAccountId, useActiveUserSettings, useCustomTasks, useNewCadenceTableEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { UserPermission } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { baseUrls } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-src-components-taskTypeSelector-taskTypeSelector.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const TaskTypeSelector = ({
  value,
  onChange,
  isWebapp,
  forceOpened = false
}) => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "tasks.taskTypeSelector"
  });
  const taskTypes = [{
    icon: "checkDouble",
    name: t("task"),
    value: "TASK",
    iconColor: "bloobirds"
  }, {
    icon: "phone",
    name: t("call"),
    value: "CALL",
    iconColor: "extraCall"
  }, {
    icon: "mail",
    name: t("email"),
    value: "EMAIL",
    iconColor: "tangerine"
  }];
  const accountId = useActiveAccountId();
  const customTaskEnabled = useNewCadenceTableEnabled(accountId);
  const {
    visible,
    setVisible,
    ref
  } = useVisible(forceOpened);
  const {
    customTasks
  } = useCustomTasks();
  const [selectedValue, setSelectedValue] = React.useState();
  const [taskTypesWithCustom, setTaskTypesWithCustom] = React.useState(taskTypes);
  const {
    settings
  } = useActiveUserSettings();
  const permissions = settings?.user?.permissions;
  const canConfigureCustomTasks = permissions.includes(UserPermission.CUSTOM_TASK);
  const redirectToCustomTaskPlaybook = () => {
    const baseUrl = baseUrls["development"];
    window.open(`${baseUrl}/app/playbook/custom-tasks`, "_blank");
  };
  useEffect(() => {
    if (customTaskEnabled) {
      setTaskTypesWithCustom([...taskTypes, ...customTasks ? customTasks?.map((custom) => ({
        icon: custom.icon,
        name: custom.name,
        value: custom.id,
        iconColor: custom.iconColor
      })) : []]);
    }
  }, [customTasks]);
  useEffect(() => {
    const selectedTask = taskTypesWithCustom.find((task) => task.value === value);
    setSelectedValue(selectedTask);
  }, [value, taskTypesWithCustom, customTasks]);
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: /* @__PURE__ */ _jsxDEV(Dropdown, {
      ref,
      visible,
      position: "top",
      style: {
        width: "218px",
        maxHeight: "255px"
      },
      anchor: /* @__PURE__ */ _jsxDEV("button", {
        className: styles.taskButton,
        onClick: () => setVisible(true),
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: clsx(styles.iconContainer, {
            [styles.iconContainer_long]: isWebapp
          }),
          children: [selectedValue ? /* @__PURE__ */ _jsxDEV(_Fragment, {
            children: [/* @__PURE__ */ _jsxDEV(Icon, {
              name: selectedValue?.icon,
              size: 20,
              color: selectedValue?.iconColor
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 113,
              columnNumber: 19
            }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
              inline: true,
              size: "m",
              color: "peanut",
              weight: "bold",
              children: selectedValue?.name
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 114,
              columnNumber: 19
            }, void 0)]
          }, void 0, true) : /* @__PURE__ */ _jsxDEV(_Fragment, {
            children: [/* @__PURE__ */ _jsxDEV(Icon, {
              name: "checkDouble",
              size: 20,
              color: "bloobirds"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 120,
              columnNumber: 19
            }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
              inline: true,
              size: "m",
              color: "peanut",
              weight: "bold",
              children: t("task")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 121,
              columnNumber: 19
            }, void 0)]
          }, void 0, true), " ", /* @__PURE__ */ _jsxDEV(Icon, {
            name: "chevronDown",
            size: 16,
            color: "softPeanut"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 126,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 110,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 109,
        columnNumber: 11
      }, void 0),
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.container,
        children: [/* @__PURE__ */ _jsxDEV(Section, {
          children: t("taskTypes")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 132,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          children: /* @__PURE__ */ _jsxDEV(_Fragment, {
            children: [taskTypesWithCustom?.map(({
              value: value2,
              name,
              icon,
              iconColor
            }) => {
              return /* @__PURE__ */ _jsxDEV("div", {
                className: styles.item,
                onClick: () => {
                  setVisible(false);
                  onChange(value2);
                },
                children: [/* @__PURE__ */ _jsxDEV("div", {
                  className: styles.icon,
                  children: /* @__PURE__ */ _jsxDEV(Icon, {
                    name: icon,
                    color: iconColor
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 147,
                    columnNumber: 25
                  }, void 0)
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 146,
                  columnNumber: 23
                }, void 0), /* @__PURE__ */ _jsxDEV("div", {
                  className: styles.title,
                  children: name
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 149,
                  columnNumber: 23
                }, void 0)]
              }, value2, true, {
                fileName: _jsxFileName,
                lineNumber: 138,
                columnNumber: 21
              }, void 0);
            }), customTaskEnabled && (canConfigureCustomTasks ? /* @__PURE__ */ _jsxDEV("div", {
              className: styles.add_new_custom_task,
              children: /* @__PURE__ */ _jsxDEV(Button, {
                iconRight: "plus",
                variant: "clear",
                size: "small",
                uppercase: false,
                expand: true,
                onClick: redirectToCustomTaskPlaybook,
                children: t("addNew")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 156,
                columnNumber: 23
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 155,
              columnNumber: 21
            }, void 0) : /* @__PURE__ */ _jsxDEV("div", {
              className: styles.footer,
              children: [/* @__PURE__ */ _jsxDEV(Text, {
                size: "xxs",
                align: "center",
                children: t("missingTask")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 169,
                columnNumber: 23
              }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
                size: "xxs",
                weight: "bold",
                align: "center",
                children: t("askYourManager")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 172,
                columnNumber: 23
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 168,
              columnNumber: 21
            }, void 0))]
          }, void 0, true)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 133,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 131,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 7
    }, void 0)
  }, void 0, false);
};
_s(TaskTypeSelector, "2hCllyciY8wUbaBjmnjGSBwigpo=", false, function() {
  return [useTranslation, useActiveAccountId, useNewCadenceTableEnabled, useVisible, useCustomTasks, useActiveUserSettings];
});
_c = TaskTypeSelector;
var _c;
$RefreshReg$(_c, "TaskTypeSelector");
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
