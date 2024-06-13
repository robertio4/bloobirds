var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/linkedInScreens/leadCaptureSettings.tsx", _s = $RefreshSig$();
import { FormProvider, useController, useForm } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Checkbox, Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserSettings, useSalesforceUserAuthEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { BubbleWindow, BubbleWindowContent, BubbleWindowFooter, BubbleWindowHeader } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/linkedInScreens/styles.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export default _s(() => {
  _s();
  const {
    t
  } = useTranslation();
  const {
    useGetSettings: useGetSettings2,
    updateSettings,
    updateIsSettings
  } = useExtensionContext();
  const settings = useGetSettings2();
  const userId = settings?.user?.id;
  const accountName = settings?.account?.name;
  const defaultSettings = {
    autoAssignLeads: settings?.user?.assignLinkedinLeads,
    autoSyncSobjects: settings?.user?.autoSyncObjectsSalesforce,
    autoCloseLeftBar: settings?.user?.autoCloseLeftBar,
    showOpportunitiesWhatsapp: settings?.user?.showOpportunityInWhatsapp
  };
  const {
    mutate,
    saveUserSettings
  } = useActiveUserSettings();
  const methods = useForm({
    defaultValues: defaultSettings
  });
  const hasSalesforce = settings?.account?.salesforceInstance;
  const isDirty = methods.formState.isDirty;
  const {
    data: salesforceUserIntegration
  } = useSWR(`/utils/service/salesforceUsers/integration/${userId}`, (url) => api.get(url));
  const isSalesforceUserIntegrated = salesforceUserIntegration?.data?.found;
  const authPerUserEnabled = useSalesforceUserAuthEnabled(settings?.account?.id);
  const {
    field: {
      value: autoAssignLeadsValue,
      onChange: onAutoAssignLeadsChange
    }
  } = useController({
    control: methods.control,
    name: "autoAssignLeads"
  });
  const {
    field: {
      value: autoSyncSobjects,
      onChange: onAutoSyncSobjectsChange
    }
  } = useController({
    control: methods.control,
    name: "autoSyncSobjects"
  });
  const {
    field: {
      value: autoCloseLeftBar,
      onChange: onAutoCloseLeftBarChange
    }
  } = useController({
    control: methods.control,
    name: "autoCloseLeftBar"
  });
  const {
    field: {
      value: showOpportunitiesWhatsapp,
      onChange: onShowOpportunitiesWhatsappChange
    }
  } = useController({
    control: methods.control,
    name: "showOpportunitiesWhatsapp"
  });
  const submit = () => saveUserSettings(userId, {
    assignLinkedinLeads: autoAssignLeadsValue,
    autoSyncObjectsSalesforce: autoSyncSobjects,
    autoCloseLeftBar,
    showOpportunitiesWhatsapp
  }).then(() => {
    mutate().then((settings2) => {
      updateSettings(settings2);
    });
    methods.reset({
      autoAssignLeads: autoAssignLeadsValue,
      autoSyncSobjects,
      autoCloseLeftBar,
      showOpportunitiesWhatsapp
    });
  });
  const loginSalesforce = () => {
    api.get("/utils/service/salesforce/generate-user-url").then((data) => {
      if (data?.data?.url) {
        window.open(data?.data?.url, "_self");
      }
    });
  };
  return /* @__PURE__ */ _jsxDEV(FormProvider, {
    ...methods,
    children: /* @__PURE__ */ _jsxDEV(BubbleWindow, {
      children: [/* @__PURE__ */ _jsxDEV(BubbleWindowHeader, {
        color: "bloobirds",
        backgroundColor: "lightBloobirds",
        name: "settings"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 104,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindowContent, {
        className: styles._settingsWrapper,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          uppercase: true,
          align: "center",
          dataTest: "navigate-profile",
          size: "m",
          weight: "bold",
          children: t("common.settings")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 106,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          align: "center",
          dataTest: "navigate-profile",
          size: "s",
          color: "softPeanut",
          className: styles._tabName,
          children: accountName
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 109,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles._settingsContainer,
          children: [/* @__PURE__ */ _jsxDEV("div", {
            children: [/* @__PURE__ */ _jsxDEV("div", {
              className: styles._settingDescription,
              children: [/* @__PURE__ */ _jsxDEV(Text, {
                dataTest: "navigate-profile",
                size: "s",
                weight: "bold",
                children: t("extension.card.leadAssignment")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 121,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
                color: "gray",
                size: "xs",
                children: t("sidePeek.settings.captureLead.description")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 124,
                columnNumber: 17
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 120,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV("div", {
              className: styles._settingsCheckbox,
              children: [" ", /* @__PURE__ */ _jsxDEV(Checkbox, {
                size: "small",
                checked: autoAssignLeadsValue,
                onClick: onAutoAssignLeadsChange,
                children: t("sidePeek.settings.captureLead.assignToMe")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 130,
                columnNumber: 17
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 128,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 119,
            columnNumber: 13
          }, void 0), hasSalesforce && /* @__PURE__ */ _jsxDEV(_Fragment, {
            children: [/* @__PURE__ */ _jsxDEV("div", {
              children: [/* @__PURE__ */ _jsxDEV("div", {
                className: styles._settingDescription,
                children: [/* @__PURE__ */ _jsxDEV(Text, {
                  dataTest: "navigate-profile",
                  size: "s",
                  weight: "bold",
                  children: t("sidePeek.settings.captureLead.autoSync")
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 143,
                  columnNumber: 21
                }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
                  color: "gray",
                  size: "xs",
                  children: t("sidePeek.settings.captureLead.autoSyncDescription")
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 146,
                  columnNumber: 21
                }, void 0)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 142,
                columnNumber: 19
              }, void 0), /* @__PURE__ */ _jsxDEV("div", {
                className: styles._settingsCheckbox,
                children: [" ", /* @__PURE__ */ _jsxDEV(Checkbox, {
                  size: "small",
                  checked: autoSyncSobjects,
                  onClick: onAutoSyncSobjectsChange,
                  children: t("sidePeek.settings.captureLead.autoSyncSalesforce")
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 152,
                  columnNumber: 21
                }, void 0)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 150,
                columnNumber: 19
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 141,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV("div", {
              children: [/* @__PURE__ */ _jsxDEV("div", {
                className: styles._settingDescription,
                children: [/* @__PURE__ */ _jsxDEV(Text, {
                  dataTest: "navigate-profile",
                  size: "s",
                  weight: "bold",
                  children: t("sidePeek.settings.captureLead.autoHideLeftBarSetting")
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 163,
                  columnNumber: 21
                }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
                  color: "gray",
                  size: "xs",
                  children: t("sidePeek.settings.captureLead.autoHideLeftBarSettingDescription")
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 166,
                  columnNumber: 21
                }, void 0)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 162,
                columnNumber: 19
              }, void 0), /* @__PURE__ */ _jsxDEV("div", {
                className: styles._settingsCheckbox,
                children: [" ", /* @__PURE__ */ _jsxDEV(Checkbox, {
                  size: "small",
                  checked: autoCloseLeftBar,
                  onClick: onAutoCloseLeftBarChange,
                  children: t("sidePeek.settings.captureLead.autoHideLeftBarSettingCheckbox")
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 172,
                  columnNumber: 21
                }, void 0)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 170,
                columnNumber: 19
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 161,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV("div", {
              children: [/* @__PURE__ */ _jsxDEV("div", {
                className: styles._settingDescription,
                children: [/* @__PURE__ */ _jsxDEV(Text, {
                  dataTest: "navigate-profile",
                  size: "s",
                  weight: "bold",
                  children: t("sidePeek.settings.captureLead.showOpportunityInWhatsapp")
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 183,
                  columnNumber: 21
                }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
                  color: "gray",
                  size: "xs",
                  children: t("sidePeek.settings.captureLead.showOpportunityInWhatsappDescription")
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 186,
                  columnNumber: 21
                }, void 0)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 182,
                columnNumber: 19
              }, void 0), /* @__PURE__ */ _jsxDEV("div", {
                className: styles._settingsCheckbox,
                children: [" ", /* @__PURE__ */ _jsxDEV(Checkbox, {
                  size: "small",
                  checked: showOpportunitiesWhatsapp,
                  onClick: onShowOpportunitiesWhatsappChange,
                  children: t("sidePeek.settings.captureLead.showOpportunityInWhatsappCheckbox")
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 192,
                  columnNumber: 21
                }, void 0)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 190,
                columnNumber: 19
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 181,
              columnNumber: 17
            }, void 0)]
          }, void 0, true), hasSalesforce && authPerUserEnabled && salesforceUserIntegration && /* @__PURE__ */ _jsxDEV("div", {
            children: /* @__PURE__ */ _jsxDEV("div", {
              children: [/* @__PURE__ */ _jsxDEV(Text, {
                size: "s",
                weight: "bold",
                children: t("sidePeek.settings.captureLead.salesforceConnection")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 206,
                columnNumber: 19
              }, void 0), isSalesforceUserIntegrated ? /* @__PURE__ */ _jsxDEV(Text, {
                color: "gray",
                size: "xs",
                children: [/* @__PURE__ */ _jsxDEV(Icon, {
                  name: "check",
                  color: "extraCall"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 211,
                  columnNumber: 23
                }, void 0), t("sidePeek.settings.captureLead.connectionSuccessful")]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 210,
                columnNumber: 21
              }, void 0) : /* @__PURE__ */ _jsxDEV(Button, {
                size: "medium",
                iconLeft: "salesforce",
                onClick: loginSalesforce,
                className: styles.button,
                children: t("sidePeek.settings.captureLead.connectSalesforceButton")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 215,
                columnNumber: 21
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 205,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 204,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 118,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 105,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindowFooter, {
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles._settingsFooter,
          children: [/* @__PURE__ */ _jsxDEV(Button, {
            onClick: updateIsSettings,
            variant: "secondary",
            children: t("common.goBack")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 231,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
            onClick: methods.handleSubmit(submit),
            disabled: !isDirty,
            variant: "secondary",
            children: t("common.save")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 234,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 230,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 229,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 102,
    columnNumber: 5
  }, void 0);
}, "BURFesGFmp8S0hgIhAlidcFt5qA=", false, function() {
  return [useTranslation, useExtensionContext, useGetSettings, useActiveUserSettings, useForm, useSWR, useSalesforceUserAuthEnabled, useController, useController, useController, useController];
});
