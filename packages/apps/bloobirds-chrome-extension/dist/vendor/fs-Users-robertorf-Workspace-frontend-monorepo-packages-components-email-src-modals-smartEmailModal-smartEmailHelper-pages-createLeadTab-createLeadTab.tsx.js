import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-pages-createLeadTab-createLeadTab.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/pages/createLeadTab/createLeadTab.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/pages/createLeadTab/createLeadTab.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useForm } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { FormField } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-dist-index.js.js";
import { Button, Icon, Text, useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { LEAD_FIELDS_LOGIC_ROLE, SmartEmailTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, baseUrls } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useSmartEmailModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailModal.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-pages-createLeadTab-createLeadTab.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const emptyFormValue = {
  id: void 0,
  name: "Unassigned",
  logicRole: null,
  order: 0,
  enabled: true
};
export const fetchLeadFields = async (url) => {
  const response = await api.get(url, {
    params: {
      selected: true
    }
  });
  return response.data;
};
const useLeadFields = () => {
  _s();
  const {
    data
  } = useSWR("/linkedin/settings/layout", fetchLeadFields);
  return data?.fields ?? [];
};
_s(useLeadFields, "Bw9uScf/xQBWZKhLCWSR33xISM4=", false, function() {
  return [useSWR];
});
export const CreateLeadTab = () => {
  _s2();
  const {
    user: {
      autoAssignLeadsLinkedin
    }
  } = useUserSettings();
  const fields = useLeadFields();
  const {
    newLeadInfo,
    dataModel,
    setNewLeadInfo,
    setSelectedTab,
    leadCreatedCallback
  } = useSmartEmailModal();
  const {
    createToast
  } = useToasts();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.createLeadTab"
  });
  const emailDataModelField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.EMAIL);
  const companyDataModelField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.COMPANY);
  const emailField = {
    ...emailDataModelField,
    type: emailDataModelField.fieldType,
    enabled: true,
    required: true
  };
  const companyField = {
    ...companyDataModelField,
    type: companyDataModelField.fieldType,
    enabled: true,
    required: false
  };
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm({
    defaultValues: {
      fields: {},
      companyName: "",
      createCompany: false
    }
  });
  useEffect(() => {
    if (fields.length > 0 && emailField) {
      setValue("fields", {
        [emailField.id]: newLeadInfo?.email,
        [companyField.id]: newLeadInfo?.company?.id.value
      });
      setValue("companyName", newLeadInfo?.company?.name);
    }
  }, [fields.length]);
  function discard() {
    reset();
    setSelectedTab(SmartEmailTab.PAST_ACTIVITY);
    setNewLeadInfo({
      email: void 0,
      company: void 0
    });
  }
  function saveLead(data) {
    api.post("/linkedin/leads", {
      fields: {
        ...data.fields
      },
      companyName: data.companyName,
      createCompany: data.createCompany
    }).then(() => {
      leadCreatedCallback(newLeadInfo.email);
      discard();
      createToast({
        message: t("toasts.success"),
        type: "success"
      });
    });
  }
  const fieldsWithEmail = fields?.find((field) => field?.logicRole === LEAD_FIELDS_LOGIC_ROLE.EMAIL) ? fields : fields.slice(0, 1).concat([emailField], fields.slice(1));
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
          lineNumber: 135,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          weight: "bold",
          size: "l",
          children: t("newLead")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 136,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 134,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("span", {
        className: styles.divider
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 140,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.content,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.form,
        children: [/* @__PURE__ */ _jsxDEV("form", {
          children: fieldsWithEmail?.reduce((acc, curr) => {
            const isICP = curr?.logicRole === LEAD_FIELDS_LOGIC_ROLE.ICP;
            const isAssignedTo = curr?.logicRole === LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO;
            const shouldNotBeAutoAssigned = !autoAssignLeadsLinkedin && isAssignedTo;
            if (isICP && curr?.values?.length > 0 || curr.enabled) {
              acc.push(/* @__PURE__ */ _jsxDEV(FormField, {
                control,
                ...curr,
                ...shouldNotBeAutoAssigned && {
                  logicRole: void 0
                },
                ...isAssignedTo && {
                  values: [emptyFormValue, ...curr.values]
                }
              }, curr.id, false, {
                fileName: _jsxFileName,
                lineNumber: 151,
                columnNumber: 19
              }, void 0));
            }
            return acc;
          }, [])
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 144,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.formFooter,
          children: [/* @__PURE__ */ _jsxDEV(Text, {
            size: "s",
            color: "softPeanut",
            className: styles.formFooterRow,
            children: t("missingInfo")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 164,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            className: styles.formFooterRowLink,
            onClick: () => {
              const baseUrl = baseUrls["development"];
              window.open(`${baseUrl}/app/account-settings/chrome-extension`);
            },
            children: [/* @__PURE__ */ _jsxDEV(Text, {
              size: "s",
              color: "bloobirds",
              children: t("changeFromField")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 174,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV(Icon, {
              name: "externalLink",
              size: 20
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 177,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 167,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 163,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 143,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.footer,
        children: [/* @__PURE__ */ _jsxDEV(Button, {
          variant: "clear",
          size: "small",
          iconLeft: "trashEmpty",
          color: "tomato",
          onClick: discard,
          children: t("discard")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 182,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
          variant: "primary",
          size: "small",
          iconLeft: "plus",
          disabled: Object.keys(errors).length !== 0 || isSubmitting,
          onClick: handleSubmit(saveLead),
          children: t("createLead")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 191,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 181,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 132,
    columnNumber: 5
  }, void 0);
};
_s2(CreateLeadTab, "DgUW4SRnCrVvK/M4pmIhnxVQLQM=", false, function() {
  return [useUserSettings, useLeadFields, useSmartEmailModal, useToasts, useTranslation, useForm];
});
_c = CreateLeadTab;
var _c;
$RefreshReg$(_c, "CreateLeadTab");
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
