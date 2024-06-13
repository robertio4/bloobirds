import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/inactiveView/inactiveTab.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inactiveView/inactiveTab.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/inactiveView/inactiveTab.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import { AssignUserModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-assignUserModal-dist-index.js.js";
import { CadenceControlModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-index.tsx.js";
import { useIsB2CAccount, useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { FIELDS_LOGIC_ROLE, PluralBobjectTypes, SalesforceTabs } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { getTextFromLogicRole } from "/src/utils/bobjects.utils.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import BulkActionsPanel from "/src/content/components/salesforceLeftBar/components/bulkActionsPanel/bulkActionsPanel.tsx.js";
import { BulkActionButtonsTypes } from "/src/content/components/salesforceLeftBar/components/bulkActionsPanel/typings/bulkActionsPanel.typings.ts.js";
import SubhomeHeader from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeHeader.tsx.js";
import SubhomeLayout, { useSubhomeContext } from "/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout.tsx.js";
import { InactiveTabFilters } from "/src/content/components/extensionLeftBar/components/views/inactiveView/filters/inactiveTabFilters.tsx.js";
import { useInactiveItems } from "/src/content/components/extensionLeftBar/components/views/inactiveView/hooks/useInactiveTab.ts.js";
import { InactiveTabList } from "/src/content/components/extensionLeftBar/components/views/inactiveView/list/inactiveTabList.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const InactiveTabContent = ({
  parentRef
}) => {
  _s();
  const {
    query,
    isLoading,
    tabBobject,
    openedModalInfo: {
      openedModal,
      bobject
    },
    resetOpenedModalInfo,
    selectedItems,
    useEveryBobject,
    handleModalClose,
    handleModalSave,
    selectedTab
  } = useSubhomeContext();
  const {
    items,
    totalMatching
  } = useInactiveItems(tabBobject);
  const isBulk = Array.isArray(bobject);
  const sampleBobject = isBulk ? bobject[0] : bobject;
  const bobjectType = sampleBobject?.id?.typeName;
  const hasActiveCadence = sampleBobject && !!getTextFromLogicRole(sampleBobject, FIELDS_LOGIC_ROLE[bobjectType]?.CADENCE) && getTextFromLogicRole(sampleBobject, FIELDS_LOGIC_ROLE[bobjectType]?.CADENCE_ENDED) !== "Yes";
  const {
    useGetSettings
  } = useExtensionContext();
  const settings = useGetSettings();
  const activeUser = settings?.user?.id;
  const accountId = settings?.account?.id;
  const users = useUserSearch();
  const assigneeUser = users?.users?.find((user) => user?.id === activeUser);
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV(InactiveTabFilters, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(BulkActionsPanel, {
      tab: SalesforceTabs.INACTIVE,
      items,
      totalMatching,
      availableActions: [{
        action: BulkActionButtonsTypes.StartCadence
      }, {
        action: BulkActionButtonsTypes.Reassign
      }]
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 7
    }, void 0), Object.keys(query).length > 0 ? /* @__PURE__ */ _jsxDEV(InactiveTabList, {
      parentRef,
      isLoading
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 9
    }, void 0) : null, openedModal === "cadence" && /* @__PURE__ */ _jsxDEV(CadenceControlModal, {
      step: "CONFIGURE_CADENCE",
      bobject,
      setIsOpen: resetOpenedModalInfo,
      initialStep: {
        step: hasActiveCadence && (!isBulk || bobject?.length <= 1) ? "NEXT_STEP" : "CONFIGURE_CADENCE",
        hadStartedCadence: false
      },
      callbackOnClose: handleModalClose,
      callbackOnSave: handleModalSave,
      subhomeTab: selectedTab
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 9
    }, void 0), openedModal === "assignUser" && /* @__PURE__ */ _jsxDEV(AssignUserModal, {
      assigneeUser,
      bobject: selectedItems,
      accountId,
      onClose: handleModalClose,
      onSave: handleModalSave,
      useEveryBobject,
      subhomeTab: selectedTab
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 9
    }, void 0)]
  }, void 0, true);
};
_s(InactiveTabContent, "m0+cCYaE6P4jHlOX7tl0B5xKIb0=", true, function() {
  return [useSubhomeContext, useInactiveItems, useExtensionContext, useUserSearch];
});
_c = InactiveTabContent;
export default function InactiveTab(props) {
  _s2();
  const isB2CAccount = useIsB2CAccount();
  return /* @__PURE__ */ _jsxDEV(SubhomeLayout, {
    defaultTab: SalesforceTabs.INACTIVE,
    defaultSubhomeTab: isB2CAccount ? PluralBobjectTypes.Lead : PluralBobjectTypes.Company,
    children: [/* @__PURE__ */ _jsxDEV(SubhomeHeader, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV(InactiveTabContent, {
      ...props
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 100,
    columnNumber: 5
  }, this);
}
_s2(InactiveTab, "iUfJ6NXduI7ShCzikZO1NzQZxZU=", false, function() {
  return [useIsB2CAccount];
});
_c2 = InactiveTab;
var _c, _c2;
$RefreshReg$(_c, "InactiveTabContent");
$RefreshReg$(_c2, "InactiveTab");
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
