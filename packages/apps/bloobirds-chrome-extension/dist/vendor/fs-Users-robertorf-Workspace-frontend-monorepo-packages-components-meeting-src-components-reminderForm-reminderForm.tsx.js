import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-reminderForm-reminderForm.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/reminderForm/reminderForm.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/reminderForm/reminderForm.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useContext = __vite__cjsImport2_react["useContext"]; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useController, useFormContext } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, IconButton, Input, Item, Section, Select, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useMessagingTemplates } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { TEMPLATE_TYPES } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import __vite__cjsImport8_lodash_truncate from "/vendor/.vite-deps-lodash_truncate.js__v--eb42b67f.js"; const truncate = __vite__cjsImport8_lodash_truncate.__esModule ? __vite__cjsImport8_lodash_truncate.default : __vite__cjsImport8_lodash_truncate;
import { RemindeBeforeType, useCalendar } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-hooks-useCalendar.ts.js";
import MeetingModalContext from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-meetingModal-context.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-reminderForm-reminderForm.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const ReminderForm = () => {
  _s();
  const {
    reminderTemplate,
    setReminderBefore,
    reminderBefore,
    setReminderTemplate,
    showReminder,
    setShowReminder
  } = useCalendar();
  const {
    control,
    setValue,
    formState
  } = useFormContext();
  const {
    messagingTemplates
  } = useMessagingTemplates({
    onlyMine: false,
    visibility: null,
    name: "",
    segmentationValues: {},
    type: TEMPLATE_TYPES.EMAIL,
    page: 0,
    size: 200
  });
  const {
    userId
  } = useContext(MeetingModalContext);
  const privateTemplates = messagingTemplates.filter((template) => template?.createdBy === userId);
  const publicTemplates = messagingTemplates.filter((template) => template?.visibility === "PUBLIC");
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "meetingModal.mainForm.reminderForm"
  });
  const {
    field: {
      value: reminderTemplateValue,
      onChange: templateOnChange
    }
  } = useController({
    control,
    name: "reminderTemplate",
    rules: {
      required: !!showReminder
    },
    defaultValue: reminderTemplate
  });
  const {
    field: {
      value: reminderBeforeValue,
      onChange: reminderBeforeOnChange
    }
  } = useController({
    control,
    name: "reminderBefore",
    defaultValue: reminderBefore?.value,
    rules: {
      required: true
    }
  });
  const {
    field: {
      value: reminderBeforeTypeValue,
      onChange: reminderBeforeTypeOnChange
    }
  } = useController({
    control,
    name: "reminderBeforeType",
    defaultValue: reminderBefore?.type,
    rules: {
      required: true
    }
  });
  const errorTemplate = formState?.errors && formState?.errors["reminderTemplate"] && t("thisFieldIsRequired");
  useEffect(() => {
    if (reminderTemplate && !reminderTemplateValue) {
      setValue("reminderTemplate", reminderTemplate);
    }
  }, [reminderTemplate, reminderTemplateValue]);
  useEffect(() => {
    if (messagingTemplates && reminderTemplateValue && !messagingTemplates?.find((template) => template?.id === reminderTemplateValue)) {
      setValue("reminderTemplate", null);
    }
  }, [reminderTemplateValue, messagingTemplates]);
  return /* @__PURE__ */ _jsxDEV("div", {
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles._reminder_container,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles._title,
        children: [/* @__PURE__ */ _jsxDEV(Icon, {
          name: "bell"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 106,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          children: t("addNotificationEmail")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 107,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: t("tooltipMessage"),
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(Icon, {
            name: "infoFilled",
            size: 16
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 109,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 108,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 105,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
        name: "plus",
        onClick: () => setShowReminder(true)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 112,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 7
    }, void 0), showReminder && /* @__PURE__ */ _jsxDEV("div", {
      className: styles._reminder_form_container,
      children: [/* @__PURE__ */ _jsxDEV(Select, {
        borderless: false,
        size: "small",
        width: "150px",
        error: errorTemplate,
        value: reminderTemplateValue,
        placeholder: `${t("emailTemplate")} *`,
        onChange: (templateId) => {
          setReminderTemplate(templateId);
          templateOnChange(templateId);
        },
        children: [/* @__PURE__ */ _jsxDEV(Section, {
          id: "my-templates",
          children: t("myTemplates")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 128,
          columnNumber: 13
        }, void 0), privateTemplates.map((messagingTemplate) => /* @__PURE__ */ _jsxDEV(Item, {
          section: "my-templates",
          value: messagingTemplate.id,
          children: truncate(messagingTemplate.name, {
            length: 32
          })
        }, messagingTemplate.id, false, {
          fileName: _jsxFileName,
          lineNumber: 130,
          columnNumber: 15
        }, void 0)), /* @__PURE__ */ _jsxDEV(Section, {
          id: "team-templates",
          children: t("teamTemplates")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 134,
          columnNumber: 13
        }, void 0), publicTemplates.map((messagingTemplate) => /* @__PURE__ */ _jsxDEV(Item, {
          section: "team-templates",
          value: messagingTemplate.id,
          children: truncate(messagingTemplate.name, {
            length: 32
          })
        }, messagingTemplate.id, false, {
          fileName: _jsxFileName,
          lineNumber: 136,
          columnNumber: 15
        }, void 0))]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 116,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Input, {
        size: "small",
        type: "number",
        width: "50px",
        value: reminderBeforeValue,
        onChange: (v) => {
          setReminderBefore((prevStatus) => {
            return {
              type: prevStatus.type,
              value: v
            };
          });
          reminderBeforeOnChange(v);
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 145,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Select, {
        size: "small",
        width: "60px",
        borderless: false,
        value: reminderBeforeTypeValue,
        onChange: (type) => {
          setReminderBefore((prevStatus) => {
            return {
              type,
              value: prevStatus.value
            };
          });
          reminderBeforeTypeOnChange(type);
        },
        children: [/* @__PURE__ */ _jsxDEV(Item, {
          value: RemindeBeforeType.minutes,
          children: t("minutes")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 175,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
          value: RemindeBeforeType.hours,
          children: t("hours")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 176,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
          value: RemindeBeforeType.days,
          children: t("days")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 177,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 160,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
        name: "cross",
        onClick: () => {
          setReminderBefore({
            type: RemindeBeforeType.minutes,
            value: 30
          });
          setReminderTemplate(null);
          setShowReminder(false);
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 179,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 103,
    columnNumber: 5
  }, void 0);
};
_s(ReminderForm, "4EtVb1/HwY1xgYmCcXOFv1ywcE4=", false, function() {
  return [useCalendar, useFormContext, useMessagingTemplates, useTranslation, useController, useController, useController];
});
_c = ReminderForm;
var _c;
$RefreshReg$(_c, "ReminderForm");
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
