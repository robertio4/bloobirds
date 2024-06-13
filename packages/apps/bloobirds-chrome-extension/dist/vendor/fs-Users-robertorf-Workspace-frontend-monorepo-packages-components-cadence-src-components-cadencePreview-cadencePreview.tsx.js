import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadencePreview-cadencePreview.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadencePreview/cadencePreview.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadencePreview/cadencePreview.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useEffect = __vite__cjsImport2_react["useEffect"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useClickAway } from "/vendor/.vite-deps-react-use.js__v--5f516bce.js";
import { useVirtual } from "/vendor/.vite-deps-react-virtual.js__v--222284ba.js";
import { Dropdown, Icon, IconButton, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useCustomTasks } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { removeHtmlTags } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport10_lodash_isEqual from "/vendor/.vite-deps-lodash_isEqual.js__v--1a3ee503.js"; const isEqual = __vite__cjsImport10_lodash_isEqual.__esModule ? __vite__cjsImport10_lodash_isEqual.default : __vite__cjsImport10_lodash_isEqual;
import { useCadenceSteps } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-hooks-useCadenceSteps.ts.js";
import { PreviewTemplateModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-previewTemplateModal-previewTemplateModal.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadencePreview-cadencePreview.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const ACTIONS_ICONS = {
  PHONE_CALL: {
    name: "phone",
    color: "melon"
  },
  EMAIL: {
    name: "mail",
    color: "tangerine"
  },
  LINKEDIN_MESSAGE: {
    name: "linkedin",
    color: "darkBloobirds"
  },
  AUTOMATED_EMAIL: {
    name: "autoMail",
    color: "tangerine"
  },
  CUSTOM_TASK: {
    name: "taskAction",
    color: "bloobirds"
  }
};
const ACTIONS_NAME = {
  PHONE_CALL: "call",
  EMAIL: "email",
  LINKEDIN_MESSAGE: "linkedin",
  AUTOMATED_EMAIL: "auto-mail",
  CUSTOM_TASK: "task"
};
const cadenceActionTypesExtension = [{
  enumName: "PHONE_CALL",
  name: "Phone Call",
  key: "phoneCall",
  autoEmail: false
}, {
  enumName: "EMAIL",
  name: "Email",
  key: "email",
  autoEmail: false
}, {
  enumName: "LINKEDIN_MESSAGE",
  name: "LinkedIn Message",
  key: "linkedinMessage",
  autoEmail: false
}, {
  enumName: "AUTOMATED_EMAIL",
  name: "Automated email",
  key: "automatedEmail",
  autoEmail: true
}];
const cadenceActionTypesWebapp = [{
  enumName: "PHONE_CALL",
  name: "Phone Call",
  key: "phoneCall",
  autoEmail: false
}, {
  enumName: "EMAIL",
  name: "Email",
  key: "email",
  autoEmail: false
}, {
  enumName: "AUTOMATED_EMAIL",
  name: "Automated email",
  key: "automatedEmail",
  autoEmail: true
}, {
  enumName: "LINKEDIN_MESSAGE",
  name: "LinkedIn Message",
  key: "linkedinMessage",
  autoEmail: false
}, {
  enumName: "CUSTOM_TASK",
  name: "Custom Task",
  key: "customTask",
  autoEmail: false
}];
const CadenceCircle = ({
  actions,
  action,
  displayDropdown,
  openDropdown,
  closeDropdown,
  setPreviewTemplate
}) => {
  _s();
  const {
    customTasks
  } = useCustomTasks({
    disabled: true
  });
  const actionToCheck = actions?.find((actionPerDay) => actionPerDay?.actionTypes?.includes(action?.enumName));
  const isAutoEmail = actionToCheck?.actionTypes?.includes("AUTOMATED_EMAIL");
  const isCustomTask = actionToCheck?.actionTypes?.includes("CUSTOM_TASK");
  const handleClick = () => {
    if (isAutoEmail && actionToCheck?.emailTemplateId) {
      const templateId = actionToCheck.emailTemplateId;
      setPreviewTemplate({
        open: true,
        templateId
      });
    }
  };
  const numOfActions = actions.filter((a) => a.actionTypes.includes(action?.enumName)).length;
  const ref = useRef();
  useClickAway(ref, closeDropdown);
  return actionToCheck ? isCustomTask ? /* @__PURE__ */ _jsxDEV(Dropdown, {
    visible: displayDropdown,
    anchor: /* @__PURE__ */ _jsxDEV("span", {
      className: clsx(styles._marker, styles[`_marker_${action?.enumName.toLowerCase()}`], {
        [styles._hover_cursor]: isAutoEmail
      }),
      ref,
      onClick: displayDropdown ? closeDropdown : openDropdown,
      children: numOfActions > 1 ? numOfActions : void 0
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 146,
      columnNumber: 11
    }, void 0),
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles.custom_tasks_dropdown,
      ref,
      children: actions.map((ac) => {
        const customTask = customTasks?.find((ct) => ct.id === ac.customTaskId);
        return customTask ? /* @__PURE__ */ _jsxDEV("div", {
          className: styles.custom_tasks_dropdown_task,
          children: [/* @__PURE__ */ _jsxDEV("div", {
            className: styles.custom_tasks_dropdown_task_icon,
            children: /* @__PURE__ */ _jsxDEV("span", {
              className: clsx(styles._marker),
              style: {
                borderColor: `var(--${customTask.iconColor})`
              },
              children: /* @__PURE__ */ _jsxDEV(Icon, {
                name: customTask.icon,
                color: customTask.iconColor
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 170,
                columnNumber: 21
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 166,
              columnNumber: 19
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 165,
            columnNumber: 17
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            children: [/* @__PURE__ */ _jsxDEV(Text, {
              size: "xxs",
              children: customTask.name
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 174,
              columnNumber: 19
            }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
              size: "xxs",
              color: "softPeanut",
              children: customTask.description
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 175,
              columnNumber: 19
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 173,
            columnNumber: 17
          }, void 0)]
        }, `custom_task-${ac.customTaskId}`, true, {
          fileName: _jsxFileName,
          lineNumber: 161,
          columnNumber: 15
        }, void 0) : null;
      })
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 157,
      columnNumber: 9
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 143,
    columnNumber: 7
  }, void 0) : /* @__PURE__ */ _jsxDEV(Tooltip, {
    title: removeHtmlTags(actionToCheck.description),
    position: "bottom",
    children: /* @__PURE__ */ _jsxDEV("span", {
      className: clsx(styles._marker, styles[`_marker_${action?.enumName.toLowerCase()}`], {
        [styles._hover_cursor]: isAutoEmail
      }),
      onClick: handleClick
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 186,
      columnNumber: 9
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 185,
    columnNumber: 7
  }, void 0) : null;
};
_s(CadenceCircle, "/iW94y2aj/ClOI5LW5hhHNApEcs=", false, function() {
  return [useCustomTasks, useClickAway];
});
_c = CadenceCircle;
export const CadencePreview = ({
  cadenceId,
  isChromeExtension = false,
  fullWidth = false
}) => {
  _s2();
  const {
    steps: cadenceSteps
  } = useCadenceSteps(cadenceId);
  const [days, setDays] = useState([]);
  const [displayDropdown, setDisplayDropdown] = useState(void 0);
  const [numberOfDays, setNumberOfDays] = useState(10);
  const sliderRef = useRef();
  const [mouseDown, setMouseDown] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState({
    open: false,
    templateId: null
  });
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.cadencePreview"
  });
  const cadenceActionTypes = isChromeExtension ? cadenceActionTypesExtension : cadenceActionTypesWebapp;
  useEffect(() => {
    if (!isEqual(days, cadenceSteps))
      setDays(cadenceSteps);
  }, [cadenceSteps]);
  useEffect(() => {
    if (days?.length > 0) {
      const daysNumbers = days.map((day) => day?.dayNumber);
      const maxNumberOfDay = Math.max(...daysNumbers) + 1;
      setNumberOfDays(maxNumberOfDay < 10 ? 10 : maxNumberOfDay);
    }
  }, [days]);
  const startDragging = (e) => {
    setMouseDown(true);
    sliderRef.current.startX = e.pageX - sliderRef.current.offsetLeft;
    sliderRef.current.currentScrollLeft = sliderRef.current.scrollLeft;
  };
  const dragging = (e) => {
    e.preventDefault();
    if (!mouseDown) {
      return;
    }
    const x = e.pageX - sliderRef.current.offsetLeft;
    const scroll = x - sliderRef.current.startX;
    sliderRef.current.scrollLeft = sliderRef.current.currentScrollLeft - scroll;
  };
  const stopDragging = () => {
    setMouseDown(false);
  };
  const columnVirtualizer = useVirtual({
    horizontal: true,
    size: numberOfDays || 0,
    parentRef: sliderRef,
    estimateSize: React.useCallback(() => 68, []),
    overscan: 5
  });
  const onScrollTo = (index) => {
    columnVirtualizer.scrollToIndex(index, {
      align: "end"
    });
  };
  function handleClose() {
    setPreviewTemplate({
      open: false,
      templateId: void 0
    });
  }
  const rowClasses = clsx(styles._row, {
    [styles._row_extension]: isChromeExtension
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._container,
    style: fullWidth ? {
      maxWidth: `calc(${columnVirtualizer.totalSize}px + 178px)`
    } : void 0,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: clsx(styles._column, styles._first_column),
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: rowClasses
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 281,
        columnNumber: 9
      }, void 0), cadenceActionTypes?.map((cadenceAction) => {
        const actionConfig = ACTIONS_ICONS[cadenceAction?.enumName];
        return /* @__PURE__ */ _jsxDEV("div", {
          className: rowClasses,
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: actionConfig?.name || "noteAction",
            color: actionConfig?.color
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 286,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            color: "softPeanut",
            uppercase: true,
            children: t(ACTIONS_NAME[cadenceAction?.enumName] || cadenceAction?.name)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 287,
            columnNumber: 15
          }, void 0)]
        }, cadenceAction?.enumName, true, {
          fileName: _jsxFileName,
          lineNumber: 285,
          columnNumber: 13
        }, void 0);
      })]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 280,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: rowClasses,
        children: /* @__PURE__ */ _jsxDEV(IconButton, {
          name: "chevronFirst",
          color: "bloobirds",
          size: 16,
          onClick: () => onScrollTo(0),
          disabled: numberOfDays <= 10
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 296,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 295,
        columnNumber: 9
      }, void 0), cadenceActionTypes?.map((type, index) => /* @__PURE__ */ _jsxDEV("div", {
        className: rowClasses
      }, `empty-row-left-${index}`, false, {
        fileName: _jsxFileName,
        lineNumber: 305,
        columnNumber: 11
      }, void 0))]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 294,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles._scrollable,
      ref: sliderRef,
      onMouseDown: startDragging,
      onMouseLeave: stopDragging,
      onMouseUp: stopDragging,
      onMouseMove: dragging,
      children: /* @__PURE__ */ _jsxDEV("div", {
        style: {
          width: `${columnVirtualizer.totalSize}px`,
          height: "100%",
          position: "relative"
        },
        children: columnVirtualizer.virtualItems.map((virtualColumn) => {
          const day = virtualColumn?.index + 1;
          const actions = days?.filter((currentDay) => currentDay?.dayNumber === virtualColumn.index);
          return /* @__PURE__ */ _jsxDEV("div", {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${virtualColumn.size}px`,
              transform: `translateX(${virtualColumn.start}px)`
            },
            className: styles._column,
            id: `day-${day}`,
            children: [/* @__PURE__ */ _jsxDEV("div", {
              className: rowClasses,
              children: /* @__PURE__ */ _jsxDEV(Text, {
                size: "xxs",
                color: "softPeanut",
                children: `${t("day")} ${day}`
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 344,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 343,
              columnNumber: 17
            }, void 0), cadenceActionTypes?.map((action) => {
              const key = `day-${day}-action-${action.name}`;
              return /* @__PURE__ */ _jsxDEV("div", {
                className: rowClasses,
                children: /* @__PURE__ */ _jsxDEV(CadenceCircle, {
                  action,
                  actions,
                  displayDropdown: displayDropdown === `day-${day}-action-${action.name}`,
                  openDropdown: () => setDisplayDropdown(key),
                  closeDropdown: () => setDisplayDropdown(void 0),
                  setPreviewTemplate
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 352,
                  columnNumber: 23
                }, void 0)
              }, `action-${action?.enumName}`, false, {
                fileName: _jsxFileName,
                lineNumber: 351,
                columnNumber: 21
              }, void 0);
            })]
          }, virtualColumn.index, true, {
            fileName: _jsxFileName,
            lineNumber: 330,
            columnNumber: 15
          }, void 0);
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 316,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 308,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles._column,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: rowClasses,
        children: /* @__PURE__ */ _jsxDEV(IconButton, {
          name: "chevronLast",
          color: "bloobirds",
          size: 16,
          onClick: () => onScrollTo(numberOfDays - 1),
          disabled: numberOfDays <= 10
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 370,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 369,
        columnNumber: 9
      }, void 0), cadenceActionTypes?.map((types, index) => /* @__PURE__ */ _jsxDEV("div", {
        className: rowClasses
      }, `empty-row-right-${index}`, false, {
        fileName: _jsxFileName,
        lineNumber: 379,
        columnNumber: 11
      }, void 0))]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 368,
      columnNumber: 7
    }, void 0), previewTemplate.open && /* @__PURE__ */ _jsxDEV(PreviewTemplateModal, {
      templateId: previewTemplate.templateId,
      onClose: handleClose
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 383,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 276,
    columnNumber: 5
  }, void 0);
};
_s2(CadencePreview, "cgSdByHMsQMCt/uk/4Ata3nfx9Y=", false, function() {
  return [useCadenceSteps, useTranslation, useVirtual];
});
_c2 = CadencePreview;
var _c, _c2;
$RefreshReg$(_c, "CadenceCircle");
$RefreshReg$(_c2, "CadencePreview");
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
