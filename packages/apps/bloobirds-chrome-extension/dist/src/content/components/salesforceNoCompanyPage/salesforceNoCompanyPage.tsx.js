import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/salesforceNoCompanyPage/salesforceNoCompanyPage.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceNoCompanyPage/salesforceNoCompanyPage.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/salesforceNoCompanyPage/salesforceNoCompanyPage.tsx", _s = $RefreshSig$();
import { ContactViewTab, LEAD_FIELDS_LOGIC_ROLE, OPPORTUNITY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { BubbleWindow } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import CaptureSalesforceForm from "/src/content/components/captureLeadSalesforceForm/captureSalesforceForm.tsx.js";
import NoBobjectsPage from "/src/content/components/contactView/pages/noBobjectsPage/noBobjectsPage.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { useFloatingMenuContext } from "/src/content/components/floatingMenu/floatingMenuContext.tsx.js";
import Loading from "/src/content/components/loadingIndicator/loadingIndicator.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const SalesforceNoCompanyPage = () => {
  _s();
  const {
    useGetActiveBobject
  } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const {
    getOnRefresh
  } = useFloatingMenuContext();
  const onRefresh = getOnRefresh();
  const isOpportunity = activeBobject?.id?.typeName === "Opportunity";
  const {
    data: sobject,
    error
  } = useSWR(activeBobject?.salesforceId && `/sobject/${activeBobject?.salesforceId}`, () => api.get(`/utils/service/salesforce/sobject/${isOpportunity ? "Opportunity" : "Contact"}/${activeBobject?.salesforceId}`).then((data) => data?.data));
  const accountId = sobject?.["AccountId"];
  const afterSyncing = (bobject) => {
    const logicRole = isOpportunity ? OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY : LEAD_FIELDS_LOGIC_ROLE.COMPANY;
    api.patch(`/bobjects/${activeBobject?.id?.value}/raw`, {
      contents: {
        [logicRole]: bobject?.id?.value
      },
      params: {}
    }).then(() => {
      onRefresh();
    });
  };
  if (!activeBobject?.salesforceId) {
    return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
      children: /* @__PURE__ */ _jsxDEV(NoBobjectsPage, {
        contactPage: ContactViewTab.COMPANY
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 60,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 7
    }, void 0);
  }
  if (!sobject && !error) {
    return /* @__PURE__ */ _jsxDEV(Loading, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 12
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: accountId ? /* @__PURE__ */ _jsxDEV(CaptureSalesforceForm, {
      defaultSobjectType: "Account",
      sobjectId: accountId,
      afterSyncing
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 9
    }, void 0) : /* @__PURE__ */ _jsxDEV(BubbleWindow, {
      children: /* @__PURE__ */ _jsxDEV(NoBobjectsPage, {
        contactPage: ContactViewTab.COMPANY
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 79,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 9
    }, void 0)
  }, void 0, false);
};
_s(SalesforceNoCompanyPage, "8I58L6+pgZH0b5cRoGWbPE4ns3U=", true, function() {
  return [useExtensionContext, useFloatingMenuContext, useSWR];
});
_c = SalesforceNoCompanyPage;
var _c;
$RefreshReg$(_c, "SalesforceNoCompanyPage");
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
