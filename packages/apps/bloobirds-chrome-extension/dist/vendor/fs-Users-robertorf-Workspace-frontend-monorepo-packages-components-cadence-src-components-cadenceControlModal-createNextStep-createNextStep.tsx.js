import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-createNextStep-createNextStep.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceControlModal/createNextStep/createNextStep.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceControlModal/createNextStep/createNextStep.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useController, useForm } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { BobjectSelector } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-dist-index.js.js";
import { Button, DatePicker, Icon, ModalContent, ModalFooter, Spinner, Text, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserId, useCustomTasks } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { PrioritySelector, TaskTypeSelector } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-tasks-dist-index.js.js";
import { BobjectTypes, TASK_ACTION_VALUE, TASK_FIELDS_LOGIC_ROLE, TASK_PRIORITY_VALUE, TASK_STATUS_VALUE_LOGIC_ROLE, TASK_TYPE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useCadenceControlModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-useCadenceControlModal.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceControlModal-createNextStep-createNextStep.module.css.js";
import { useGetI18nSpacetime } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const CreateNextStep = ({
  handleBack,
  handleNext
}) => {
  _s();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = useActiveUserId();
  const {
    control,
    handleSubmit: handleSubmitForm
  } = useForm();
  let bobjectName;
  const {
    bobject
  } = useCadenceControlModal();
  const accountId = bobject?.id.accountId;
  switch (bobject.id.typeName) {
    case "Company":
      bobjectName = bobject.name;
      break;
    case "Opportunity":
      bobjectName = bobject.name;
      break;
    case "Lead":
      bobjectName = bobject.fullName;
      break;
  }
  const {
    customTasks
  } = useCustomTasks();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.cadenceControlModal.createNextStep"
  });
  const handleChangeTaskType = (value) => {
    actionTypeOnChange(value);
    if (!["TASK", "CALL", "EMAIL"].includes(value)) {
      const customTaskDescription = customTasks?.find((task) => task.id === value)?.description;
      if (customTaskDescription) {
        titleField.onChange(customTaskDescription);
      }
    }
  };
  const [bobjectSelectedName, setBobjectSelectedName] = useState(bobjectName);
  const {
    visible: datePickerVisible,
    setVisible: setDatePickerVisible,
    ref: datePickerRef
  } = useVisible();
  const {
    field: titleField
  } = useController({
    control,
    name: TASK_FIELDS_LOGIC_ROLE.TITLE
  });
  const {
    field: {
      value: taskDate,
      onChange: taskDateOnChange
    }
  } = useController({
    control,
    name: TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
    defaultValue: new Date()
  });
  const {
    field: {
      value: priority,
      onChange: priorityOnChange
    }
  } = useController({
    control,
    name: TASK_FIELDS_LOGIC_ROLE.PRIORITY,
    defaultValue: TASK_PRIORITY_VALUE.NO_PRIORITY
  });
  const {
    field: {
      value: actionType,
      onChange: actionTypeOnChange
    }
  } = useController({
    control,
    name: TASK_FIELDS_LOGIC_ROLE.ACTION_TYPE,
    defaultValue: "TASK"
  });
  const {
    field: {
      onChange: relatedOnChange
    }
  } = useController({
    control,
    name: "related",
    defaultValue: bobject
  });
  function onSubmit(data) {
    setIsSubmitting(true);
    const {
      related,
      ...taskInfo
    } = data;
    const body = {
      [TASK_FIELDS_LOGIC_ROLE.TITLE]: taskInfo[TASK_FIELDS_LOGIC_ROLE.TITLE],
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: TASK_TYPE.NEXT_STEP,
      [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: userId,
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
      [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: taskInfo[TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME],
      [TASK_FIELDS_LOGIC_ROLE.PRIORITY]: taskInfo[TASK_FIELDS_LOGIC_ROLE.PRIORITY]
    };
    const actionType2 = taskInfo[TASK_FIELDS_LOGIC_ROLE.ACTION_TYPE];
    body[TASK_FIELDS_LOGIC_ROLE.TASK_TYPE] = TASK_TYPE.NEXT_STEP;
    body[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CALL] = actionType2 === "CALL" ? TASK_ACTION_VALUE.CALL_YES : null;
    body[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_EMAIL] = actionType2 === "EMAIL" ? TASK_ACTION_VALUE.EMAIL_YES : null;
    if (actionType2 !== "TASK" && actionType2 !== "CALL" && actionType2 !== "EMAIL") {
      body[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CUSTOM_TASK] = TASK_ACTION_VALUE.CUSTOM_TASK_YES;
      body[TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK] = actionType2;
    }
    body[TASK_FIELDS_LOGIC_ROLE.IS_ACTION_CUSTOM_TASK] ||= TASK_ACTION_VALUE.CUSTOM_TASK_NO;
    body[TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK] ||= null;
    if (related) {
      if (typeof related === "string") {
        if (related?.includes("Lead")) {
          body[TASK_FIELDS_LOGIC_ROLE.LEAD] = related;
        } else if (related?.includes("Company")) {
          body[TASK_FIELDS_LOGIC_ROLE.COMPANY] = related;
        } else if (related?.includes("Opportunity")) {
          body[TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY] = related;
        }
      } else {
        const relatedBobjectType = related.id.typeName.toUpperCase();
        body[TASK_FIELDS_LOGIC_ROLE[relatedBobjectType]] = related.id.value;
      }
    }
    api.post(`/bobjects/${accountId}/Task`, body).then(() => {
      setIsSubmitting(false);
      handleNext();
    });
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV(ModalContent, {
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.content_container,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles.editor,
          children: [/* @__PURE__ */ _jsxDEV("span", {
            className: styles.modal_title,
            children: [/* @__PURE__ */ _jsxDEV(TaskTypeSelector, {
              value: actionType,
              onChange: handleChangeTaskType,
              isWebapp: true
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 163,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV(PrioritySelector, {
              value: priority,
              onChange: priorityOnChange,
              overrideStyle: {
                right: "40px"
              }
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 168,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 162,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV("span", {
            className: styles.divider
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 174,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV("span", {
            className: styles.taskInfo,
            children: [/* @__PURE__ */ _jsxDEV(Icon, {
              name: "clock",
              color: "softPeanut",
              size: 16
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 176,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              color: "softPeanut",
              children: t("dueDate")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 177,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV(DatePicker, {
              withTimePicker: true,
              value: taskDate,
              onChange: taskDateOnChange,
              openDefaultValue: new Date(),
              dropDownRef: datePickerRef,
              visible: datePickerVisible,
              setVisible: setDatePickerVisible,
              dropdownProps: {
                zIndex: 1e4,
                anchor: /* @__PURE__ */ _jsxDEV("span", {
                  onClick: () => setDatePickerVisible(true),
                  className: styles.dateButton,
                  children: /* @__PURE__ */ _jsxDEV(Text, {
                    size: "xs",
                    color: "bloobirds",
                    weight: "regular",
                    children: useGetI18nSpacetime(taskDate).format("{month-short} {date-ordinal}, {day} {time-24}")
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 192,
                    columnNumber: 23
                  }, void 0)
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 191,
                  columnNumber: 21
                }, void 0)
              }
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 180,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV(BobjectSelector, {
              accountId,
              selected: bobjectSelectedName,
              id: "static",
              onBobjectChange: (bobject2) => {
                const bobjectType = bobject2?.bobjectType;
                relatedOnChange(bobject2?.rawBobject?.id);
                if (bobjectType === BobjectTypes.Company) {
                  setBobjectSelectedName(bobject2?.companyName);
                } else if (bobjectType === BobjectTypes.Lead) {
                  setBobjectSelectedName(bobject2?.fullName);
                } else if (bobjectType === BobjectTypes.Opportunity) {
                  setBobjectSelectedName(bobject2?.name);
                }
              }
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 201,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 175,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV("span", {
            className: styles.divider
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 218,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV("textarea", {
            className: styles.textArea,
            placeholder: t("placeholder"),
            autoFocus: true,
            ...titleField
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 219,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 161,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          children: /* @__PURE__ */ _jsxDEV("div", {
            className: styles.bottom_bar,
            children: /* @__PURE__ */ _jsxDEV("span", {
              className: styles.record_related,
              children: /* @__PURE__ */ _jsxDEV("div", {
                className: styles.bobject_selector
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 229,
                columnNumber: 17
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 228,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 227,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 226,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 160,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 159,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ModalFooter, {
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.buttonsContainer,
        children: [/* @__PURE__ */ _jsxDEV(Button, {
          variant: "clear",
          onClick: handleBack,
          children: t("back")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 237,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          children: /* @__PURE__ */ _jsxDEV(Button, {
            onClick: handleSubmitForm(onSubmit),
            disabled: isSubmitting,
            children: isSubmitting ? /* @__PURE__ */ _jsxDEV(Spinner, {
              name: "loadingCircle",
              size: 12
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 243,
              columnNumber: 17
            }, void 0) : t("save")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 241,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 240,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 236,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 235,
      columnNumber: 7
    }, void 0)]
  }, void 0, true);
};
_s(CreateNextStep, "P/kmoLqTf+DqCcqJy6Tu+P4WNw8=", false, function() {
  return [useActiveUserId, useForm, useCadenceControlModal, useCustomTasks, useTranslation, useVisible, useController, useController, useController, useController, useController, useGetI18nSpacetime];
});
_c = CreateNextStep;
var _c;
$RefreshReg$(_c, "CreateNextStep");
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
