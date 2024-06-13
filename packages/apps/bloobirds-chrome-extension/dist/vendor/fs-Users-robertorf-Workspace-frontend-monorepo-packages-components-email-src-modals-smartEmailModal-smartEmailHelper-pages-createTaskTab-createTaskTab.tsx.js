import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-pages-createTaskTab-createTaskTab.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/pages/createTaskTab/createTaskTab.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/pages/createTaskTab/createTaskTab.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useController, useForm } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { BobjectSelector, AssignedToSelector } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-dist-index.js.js";
import { Button, DatePicker, Icon, Spinner, Text, useToasts, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { useGetI18nSpacetime } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { BobjectTypes, TASK_FIELDS_LOGIC_ROLE, TASK_STATUS_VALUE_LOGIC_ROLE, TASK_TYPE, SmartEmailTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getNameFieldLRFromBobjectType, getTextFromLogicRole, api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useSmartEmailModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailModal.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-pages-createTaskTab-createTaskTab.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const CreateTaskTab = () => {
  _s();
  const {
    activeBobject,
    accountId,
    isExtension,
    setSelectedTab,
    setTaskTitle
  } = useSmartEmailModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.createTaskTab"
  });
  const userId = useActiveUserId();
  const [assignedToId, setAssignedToId] = useState(userId);
  let bobjectName;
  if (isExtension) {
    const bobject = activeBobject;
    switch (bobject?.id?.typeName) {
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
  } else {
    const referencedBobjectType = activeBobject?.id?.typeName;
    bobjectName = getTextFromLogicRole(
      activeBobject,
      getNameFieldLRFromBobjectType(referencedBobjectType)
    );
  }
  const [bobjectSelectedName, setBobjectSelectedName] = useState(bobjectName);
  const {
    createToast
  } = useToasts();
  const {
    visible: datePickerVisible,
    setVisible: setDatePickerVisible,
    ref: datePickerRef
  } = useVisible();
  const {
    control,
    handleSubmit
  } = useForm();
  const {
    field: {
      onChange: titleOnChange,
      ...restTitleProps
    }
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
      onChange: relatedOnChange,
      value: relatedValue
    }
  } = useController({
    control,
    name: "related",
    defaultValue: activeBobject?.id?.value
  });
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const {
      related,
      ...taskInfo
    } = data;
    const body = {
      [TASK_FIELDS_LOGIC_ROLE.TITLE]: taskInfo[TASK_FIELDS_LOGIC_ROLE.TITLE],
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: TASK_TYPE.NEXT_STEP,
      [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: assignedToId,
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
      [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: taskInfo[TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]
    };
    if (related) {
      const relatedBobjectType = related.split("/")[1].toUpperCase();
      body[TASK_FIELDS_LOGIC_ROLE[relatedBobjectType]] = related;
    }
    api.post(`/bobjects/${accountId}/Task`, {
      contents: {
        ...body
      },
      params: {}
    }).then(() => {
      setIsSubmitting(false);
      createToast({
        message: t("toasts.success"),
        type: "success"
      });
      setTaskTitle(void 0);
      setSelectedTab(SmartEmailTab.PAST_ACTIVITY);
    }).catch(() => {
      setIsSubmitting(false);
    });
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.container,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.header,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.titleHeader,
        children: [/* @__PURE__ */ _jsxDEV(Icon, {
          name: "checkDouble",
          size: 20
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 138,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          weight: "bold",
          size: "l",
          children: t("newTask")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 139,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 137,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("span", {
        className: styles.divider
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 143,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.infoHeader,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles.date,
          children: [/* @__PURE__ */ _jsxDEV("div", {
            className: styles.dateDescription,
            children: [/* @__PURE__ */ _jsxDEV(Icon, {
              name: "clock",
              color: "softPeanut",
              size: 16
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 147,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              color: "softPeanut",
              children: t("dueDate")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 148,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 146,
            columnNumber: 13
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
                  lineNumber: 164,
                  columnNumber: 21
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 163,
                columnNumber: 19
              }, void 0)
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 152,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 145,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("span", {
          className: styles.assigned_to,
          children: [/* @__PURE__ */ _jsxDEV("span", {
            className: styles.assigned_to_title,
            children: [/* @__PURE__ */ _jsxDEV(Icon, {
              name: "personAdd",
              color: "softPeanut",
              size: 16
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 176,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              color: "softPeanut",
              children: t("assignedTo")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 177,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 175,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(AssignedToSelector, {
            assignedToId,
            updateAssignedTo: setAssignedToId
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 181,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 174,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.object,
          children: [/* @__PURE__ */ _jsxDEV("div", {
            className: styles.objectDescription,
            children: [/* @__PURE__ */ _jsxDEV(Icon, {
              name: "record",
              color: "softPeanut",
              size: 16
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 185,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              color: "softPeanut",
              children: t("object")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 186,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 184,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(BobjectSelector, {
            accountId,
            iconSize: 16,
            selected: bobjectSelectedName,
            id: "static",
            bobjectType: relatedValue?.split("/")[1],
            onBobjectChange: (bobject) => {
              const bobjectType = bobject?.bobjectType;
              relatedOnChange(bobject?.rawBobject?.id);
              if (bobjectType === BobjectTypes.Company) {
                setBobjectSelectedName(bobject?.companyName);
              } else if (bobjectType === BobjectTypes.Lead) {
                setBobjectSelectedName(bobject?.fullName);
              } else if (bobjectType === BobjectTypes.Opportunity) {
                setBobjectSelectedName(bobject?.name);
              }
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 190,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 183,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 144,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("span", {
        className: styles.divider
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 210,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("textarea", {
      className: styles.textArea,
      placeholder: t("descriptionPlaceholder"),
      autoFocus: true,
      onChange: (e) => {
        titleOnChange(e);
        setTaskTitle(e.target.value);
      },
      ...restTitleProps
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 212,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.footer,
      children: [/* @__PURE__ */ _jsxDEV(Button, {
        size: "small",
        variant: "tertiary",
        iconLeft: "trashEmpty",
        color: "extraMeeting",
        uppercase: false,
        onClick: () => setSelectedTab(SmartEmailTab.PAST_ACTIVITY),
        children: t("discard")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 223,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
        size: "small",
        iconLeft: "plus",
        uppercase: false,
        onClick: handleSubmit(onSubmit),
        disabled: !restTitleProps.value,
        children: isSubmitting ? /* @__PURE__ */ _jsxDEV(Spinner, {
          name: "loadingCircle",
          size: 14
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 240,
          columnNumber: 27
        }, void 0) : t("createTask")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 233,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 222,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 135,
    columnNumber: 5
  }, void 0);
};
_s(CreateTaskTab, "pC2fNtXwFXDqDZ/rgCxhSvTJEhI=", false, function() {
  return [useSmartEmailModal, useTranslation, useActiveUserId, useToasts, useVisible, useForm, useController, useController, useController, useGetI18nSpacetime];
});
_c = CreateTaskTab;
var _c;
$RefreshReg$(_c, "CreateTaskTab");
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
