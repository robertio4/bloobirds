import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/relateSalesforceUserPage/relateSalesforceUserPage.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/relateSalesforceUserPage/relateSalesforceUserPage.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/relateSalesforceUserPage/relateSalesforceUserPage.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Item, Select, Spinner, Text, useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useSalesforceDataModel, useSalesforceUserAuthEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import NoContext from "/src/assets/noContext.png__import_base64.js";
import { BubbleWindow, BubbleWindowContent } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/relateSalesforceUserPage/relateSalesforceUserPage.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const RelateSalesforceUserPage = ({
  onSave
}) => {
  _s();
  const {
    useGetSettings
  } = useExtensionContext();
  const settings = useGetSettings();
  const username = settings?.user?.name;
  const sfdcDataModel = useSalesforceDataModel();
  const salesforceUsers = sfdcDataModel?.salesforceUsers;
  const {
    createToast
  } = useToasts();
  const [selectedSalesforceId, setSelectedSalesforceId] = useState(sfdcDataModel?.salesforceUsers?.find((u) => u?.salesforceUserEmail === settings?.user?.email)?.salesforceUserId);
  const [forceManualSync, setForceManualSync] = useState(false);
  const [refresh, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const authPerUserEnabled = useSalesforceUserAuthEnabled(settings?.account?.id);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "extension.salesforcePages.relatedSalesforceUserPage"
  });
  useEffect(() => {
    const possibleMatchUser = sfdcDataModel?.salesforceUsers?.find((u) => u?.salesforceUserEmail === settings?.user?.email);
    if (possibleMatchUser) {
      setSelectedSalesforceId(possibleMatchUser?.salesforceUserId);
    }
  }, [sfdcDataModel]);
  const handleRefreshDataModel = () => {
    setRefreshing(true);
    api.get("/utils/service/sfdcdatamodel/refresh").then(() => {
      sfdcDataModel?.mutate();
      setRefreshing(false);
    });
  };
  const saveSalesforceUser = () => {
    setLoading(true);
    api.patch(`/utils/service/salesforceUsers/${selectedSalesforceId}/${settings?.user?.id}`, {}).then(async () => {
      await api.get("/utils/service/sfdcdatamodel/refresh");
      if (onSave) {
        onSave();
      }
      createToast({
        message: t("toast.success"),
        type: "success"
      });
      setLoading(false);
    }).catch(() => {
      createToast({
        message: t("toast.error"),
        type: "error"
      });
      setLoading(false);
    });
  };
  const loginSalesforce = () => {
    api.get("/utils/service/salesforce/generate-user-url").then((data) => {
      if (data?.data?.url) {
        window.open(data?.data?.url, "_self");
      }
    });
  };
  return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
    height: 594,
    children: /* @__PURE__ */ _jsxDEV(BubbleWindowContent, {
      className: styles.container,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.title,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "l",
          weight: "medium",
          children: t("welcome", {
            name: username
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 87,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 86,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.content,
        children: [/* @__PURE__ */ _jsxDEV("img", {
          src: NoContext,
          width: 200,
          alt: "Bloobirds",
          className: styles.img
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 92,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          color: "bloobirds",
          className: styles.title_text,
          align: "center",
          weight: "medium",
          children: t("linkSalesforce")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 93,
          columnNumber: 11
        }, void 0), authPerUserEnabled && !forceManualSync ? /* @__PURE__ */ _jsxDEV("div", {
          className: styles.button_container,
          children: [/* @__PURE__ */ _jsxDEV(Button, {
            iconLeft: "salesforce",
            className: styles.button,
            onClick: loginSalesforce,
            children: t("loginToSF")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 104,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "xxs",
            color: "softPeanut",
            align: "center",
            className: styles.force_text,
            children: [t("notAbleToSignIn"), /* @__PURE__ */ _jsxDEV("span", {
              onClick: () => setForceManualSync(true),
              style: {
                display: "inline"
              },
              children: /* @__PURE__ */ _jsxDEV(Text, {
                decoration: "underline",
                size: "xxs",
                color: "peanut",
                className: styles.force_text_link,
                children: t("clickHere")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 110,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 109,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 107,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 103,
          columnNumber: 13
        }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: [refresh ? /* @__PURE__ */ _jsxDEV("div", {
            className: styles.spinner,
            children: /* @__PURE__ */ _jsxDEV(Spinner, {
              name: "loadingCircle",
              color: "bloobirds"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 125,
              columnNumber: 19
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 124,
            columnNumber: 17
          }, void 0) : /* @__PURE__ */ _jsxDEV(Select, {
            value: selectedSalesforceId,
            placeholder: t("SFDCUserPlaceholder"),
            onChange: setSelectedSalesforceId,
            className: styles.select,
            autocomplete: true,
            children: salesforceUsers && Array.isArray(salesforceUsers) && salesforceUsers?.map((sfdcUser) => /* @__PURE__ */ _jsxDEV(Item, {
              label: sfdcUser?.salesforceUserName,
              value: sfdcUser?.salesforceUserId,
              children: sfdcUser?.salesforceUserName
            }, sfdcUser?.salesforceUserId, false, {
              fileName: _jsxFileName,
              lineNumber: 138,
              columnNumber: 23
            }, void 0))
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 128,
            columnNumber: 17
          }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
            className: styles.button,
            onClick: saveSalesforceUser,
            disabled: loading,
            children: loading ? /* @__PURE__ */ _jsxDEV(Spinner, {
              name: "loadingCircle",
              color: "bloobirds"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 149,
              columnNumber: 28
            }, void 0) : t("continue")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 148,
            columnNumber: 15
          }, void 0)]
        }, void 0, true), /* @__PURE__ */ _jsxDEV(Text, {
          color: "softPeanut",
          size: "xs",
          align: "center",
          className: styles.info_text,
          children: [t("linkExplanation"), /* @__PURE__ */ _jsxDEV("a", {
            color: "var(--bloobirds)",
            onClick: handleRefreshDataModel,
            children: t("refreshHere")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 155,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 153,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 91,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 84,
    columnNumber: 5
  }, void 0);
};
_s(RelateSalesforceUserPage, "Leg22bQR4BlNUVFDtSunxxN8m+s=", true, function() {
  return [useExtensionContext, useSalesforceDataModel, useToasts, useSalesforceUserAuthEnabled, useTranslation];
});
_c = RelateSalesforceUserPage;
var _c;
$RefreshReg$(_c, "RelateSalesforceUserPage");
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
