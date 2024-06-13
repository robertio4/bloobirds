import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-components-qqsContent.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFeed/components/qqsContent.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFeed/components/qqsContent.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { NoResultsPage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-misc-dist-index.js.js";
import { PlaybookTab } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { QQsCard } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookCard-qqsCard.tsx.js";
import { usePlaybookFeed } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-usePlaybookFeed.tsx.js";
import { noResultsContent } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-components-tabContent.utils.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const QQsContent = () => {
  _s();
  const {
    activeBobject,
    refreshMainBobject,
    segmentationValues,
    actionsDisabled,
    qualifyingQuestions,
    isLoading,
    updateQualifyingQuestionsValue
  } = usePlaybookFeed();
  const {
    t
  } = useTranslation();
  const noResults = qualifyingQuestions?.length === 0 && Object.keys(segmentationValues).length !== 0;
  const noQQs = qualifyingQuestions?.length === 0 && Object.keys(segmentationValues).length === 0;
  const {
    actionButton,
    description,
    title
  } = noResultsContent({
    tabSelected: PlaybookTab.QQS,
    t
  });
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [qualifyingQuestions?.length > 0 && qualifyingQuestions?.map((qq) => /* @__PURE__ */ _jsxDEV(QQsCard, {
      template: qq,
      QQValue: activeBobject?.rawBobject ? activeBobject?.rawBobject[qq?.id] : activeBobject?.raw[qq?.id],
      tabSelected: PlaybookTab.QQS,
      onUpdateQQ: (value) => updateQualifyingQuestionsValue(activeBobject, value),
      refreshActiveBobject: refreshMainBobject,
      actionsDisabled
    }, qq?.id, false, {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 11
    }, void 0)), noResults && !isLoading && /* @__PURE__ */ _jsxDEV(NoResultsPage, {
      title: t("playbook.tabContent.noResults"),
      description: t("playbook.tabContent.noResultsHint"),
      actionButton
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 9
    }, void 0), noQQs && !isLoading && /* @__PURE__ */ _jsxDEV(NoResultsPage, {
      title,
      description,
      actionButton
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 9
    }, void 0)]
  }, void 0, true);
};
_s(QQsContent, "IPjF4DYAXSS+bL+9obyrZNm98G8=", false, function() {
  return [usePlaybookFeed, useTranslation];
});
_c = QQsContent;
var _c;
$RefreshReg$(_c, "QQsContent");
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
