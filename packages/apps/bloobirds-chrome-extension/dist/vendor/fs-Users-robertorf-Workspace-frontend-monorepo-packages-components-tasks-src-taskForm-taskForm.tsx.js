import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-src-taskForm-taskForm.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/tasks/src/taskForm/taskForm.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/tasks/src/taskForm/taskForm.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { AssignedToSelector, BobjectSelector } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-dist-index.js.js";
import { Button, DatePicker, Icon, IconButton, Spinner, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveAccountId, useCustomTasks } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { useGetI18nSpacetime } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { PrioritySelector } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-src-components-prioritySelector-prioritySelector.tsx.js";
import { TaskTypeSelector } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-src-components-taskTypeSelector-taskTypeSelector.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-src-taskForm-taskForm.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const TaskForm = ({
  modalId,
  isEditionModal,
  handleDelete,
  title,
  titleOnChange,
  actionType,
  actionTypeOnChange,
  priority,
  priorityOnChange,
  taskDate,
  taskDateOnChange,
  datePickerVisible,
  datePickerRef,
  setDatePickerVisible,
  assignedToId,
  setAssignedToId,
  relatedOnChange,
  nameSelected,
  setNameSelected,
  onSubmit,
  formMethods,
  isWebapp = false,
  forceOpened
}) => {
  _s();
  const {
    isSubmitting,
    isDirty,
    handleSubmit
  } = formMethods;
  const accountId = useActiveAccountId();
  const {
    customTasks
  } = useCustomTasks();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "tasks.taskForm"
  });
  const {
    t: dateT
  } = useTranslation("translation", {
    keyPrefix: "dates"
  });
  const handleChangeTaskType = (value) => {
    actionTypeOnChange(value);
    if (!["TASK", "CALL", "EMAIL"].includes(value)) {
      const customTaskDescription = customTasks?.find((task) => task.id === value)?.description;
      if (customTaskDescription) {
        titleOnChange(customTaskDescription);
      }
    }
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.content_container,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.editor,
      children: [/* @__PURE__ */ _jsxDEV("span", {
        className: styles.modal_title,
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles._bobject_type_selector,
          children: [/* @__PURE__ */ _jsxDEV(TaskTypeSelector, {
            value: actionType,
            onChange: handleChangeTaskType,
            isWebapp,
            forceOpened
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 78,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(PrioritySelector, {
            value: priority,
            onChange: priorityOnChange
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 84,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 77,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 76,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("span", {
        className: styles.divider
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 87,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.task_info,
        children: [/* @__PURE__ */ _jsxDEV("span", {
          className: styles.task_date,
          children: [/* @__PURE__ */ _jsxDEV("span", {
            className: styles.task_date_title,
            children: [/* @__PURE__ */ _jsxDEV(Icon, {
              name: "clock",
              color: "softPeanut",
              size: 16
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 91,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              color: "softPeanut",
              children: t("dueDate")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 92,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 90,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(DatePicker, {
            withTimePicker: true,
            value: taskDate,
            openDefaultValue: taskDate ?? new Date(),
            onChange: taskDateOnChange,
            dropDownRef: datePickerRef,
            visible: datePickerVisible,
            setVisible: setDatePickerVisible,
            dropdownProps: {
              zIndex: 1e4,
              anchor: /* @__PURE__ */ _jsxDEV("span", {
                onClick: () => setDatePickerVisible(true),
                className: styles.date_button,
                children: /* @__PURE__ */ _jsxDEV(Text, {
                  size: "xs",
                  color: "bloobirds",
                  weight: "regular",
                  children: useGetI18nSpacetime(taskDate).format(dateT("shortMonthFullDate"))
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 108,
                  columnNumber: 21
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 107,
                columnNumber: 19
              }, void 0)
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 96,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 89,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("span", {
          className: styles.task_date,
          children: [/* @__PURE__ */ _jsxDEV("span", {
            className: styles.task_date_title,
            children: [/* @__PURE__ */ _jsxDEV(Icon, {
              name: "personAdd",
              color: "softPeanut",
              size: 16
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 118,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              color: "softPeanut",
              children: t("assignedTo")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 119,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 117,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(AssignedToSelector, {
            assignedToId,
            updateAssignedTo: setAssignedToId
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 123,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 116,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 88,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("span", {
        className: styles.divider
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 126,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("textarea", {
        className: clsx(styles.textArea, {
          [styles.textArea_extended]: isWebapp
        }),
        value: title,
        placeholder: t("placeholder"),
        onChange: (e) => titleOnChange(e.target.value),
        autoFocus: true
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 127,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.bottom_bar,
        children: [/* @__PURE__ */ _jsxDEV("span", {
          className: styles.record_related,
          children: /* @__PURE__ */ _jsxDEV("div", {
            className: styles.bobject_selector,
            children: /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: !isWebapp && nameSelected,
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(BobjectSelector, {
                accountId,
                selected: nameSelected,
                id: modalId,
                onBobjectChange: (bobject) => {
                  relatedOnChange(bobject?.rawBobject?.id);
                  if (bobject?.bobjectType === BobjectTypes.Company) {
                    setNameSelected(bobject?.companyName);
                  } else if (bobject?.bobjectType === BobjectTypes.Lead) {
                    setNameSelected(bobject?.fullName);
                  } else if (bobject?.bobjectType === BobjectTypes.Opportunity) {
                    setNameSelected(bobject?.name);
                  }
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 140,
                columnNumber: 17
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 139,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 138,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 137,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          style: {
            display: "flex",
            gap: 8
          },
          children: [isEditionModal && /* @__PURE__ */ _jsxDEV(Tooltip, {
            title: t("deleteTask"),
            position: "top",
            children: /* @__PURE__ */ _jsxDEV(IconButton, {
              name: "trashFull",
              size: 22,
              onClick: handleDelete
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 161,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 160,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
            className: styles.add_task_button,
            size: "small",
            onClick: () => {
              handleSubmit(() => onSubmit(isWebapp))();
            },
            disabled: !isDirty || isSubmitting,
            children: isSubmitting ? /* @__PURE__ */ _jsxDEV(Spinner, {
              name: "loadingCircle",
              size: 12
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 173,
              columnNumber: 17
            }, void 0) : isEditionModal ? t("saveTask") : t("addTask")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 164,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 158,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 136,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 135,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 74,
    columnNumber: 5
  }, void 0);
};
_s(TaskForm, "UwTPQ6pdPe9XoF6BjBThiYqwVjk=", false, function() {
  return [useActiveAccountId, useCustomTasks, useTranslation, useTranslation, useGetI18nSpacetime];
});
_c = TaskForm;
var _c;
$RefreshReg$(_c, "TaskForm");
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
