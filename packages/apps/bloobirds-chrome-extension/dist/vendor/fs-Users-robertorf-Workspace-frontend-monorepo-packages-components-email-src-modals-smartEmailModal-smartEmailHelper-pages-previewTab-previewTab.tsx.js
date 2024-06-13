import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-pages-previewTab-previewTab.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/pages/previewTab/previewTab.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/pages/previewTab/previewTab.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"];
import { useWatch } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import __vite__cjsImport5_reactShadowRoot from "/vendor/.vite-deps-react-shadow-root.js__v--23020670.js"; const ReactShadowRoot = __vite__cjsImport5_reactShadowRoot.__esModule ? __vite__cjsImport5_reactShadowRoot.default : __vite__cjsImport5_reactShadowRoot;
import { Banner } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-banner-dist-index.js.js";
import { useDebouncedCallback } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { serialize, useRichTextEditorPlugins } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js";
import { api, parseEmailPixels, createParagraph } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import salesforceResetStyles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-utils-resetSalesforceCSSs.module.css.js";
import { useSmartEmailModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailModal.tsx.js";
import { useAttachedLinks } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-hooks-useAttachedLinks.ts.js";
import { prepareBodyToBeSerialized } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-utils-smartEmailHelper.utils.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-pages-previewTab-previewTab.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const ASTPreview = ({
  body,
  subject
}) => {
  _s();
  const {
    attachedLinks
  } = useAttachedLinks();
  const bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: true,
    replaceMeetingLinks: true,
    rawHTMLBlock: true,
    replyHistory: true,
    snippets: true
  });
  const previewSubject = useMemo(() => serialize(subject), [subject]);
  const bodyDeserialized = serialize(prepareBodyToBeSerialized(attachedLinks, body), {
    format: "AST",
    plugins: bodyPlugins
  });
  const previewBody = useMemo(() => parseEmailPixels(bodyDeserialized), [body]);
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.preview_subject_wrapper,
      dangerouslySetInnerHTML: {
        __html: previewSubject
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.preview_body_wrapper,
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.preview_body_text_wrapper,
        dangerouslySetInnerHTML: {
          __html: previewBody
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 7
    }, void 0)]
  }, void 0, true);
};
_s(ASTPreview, "LBTvZ8vL8LYQ1SMF+kZ7r2iMlNU=", false, function() {
  return [useAttachedLinks, useRichTextEditorPlugins];
});
_c = ASTPreview;
function HTMLPreview({
  body,
  subject
}) {
  _s2();
  const {
    activeBobject
  } = useSmartEmailModal();
  function fetchPreviewEmail() {
    return api.post("/messaging/emails/preview", {
      subject: JSON.stringify(createParagraph(subject)),
      body,
      bobjectId: activeBobject?.id?.value,
      format: "HTML"
    });
  }
  const previewSubject = useMemo(() => serialize(subject), [subject]);
  const {
    data,
    mutate
  } = useSWR(`/messaging/emails/preview/${activeBobject.id?.value}`, fetchPreviewEmail);
  const debouncedMutate = useDebouncedCallback(mutate, 2e3, [mutate]);
  useEffect(() => {
    debouncedMutate();
  }, [activeBobject, body, subject]);
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: clsx(styles.preview_subject_wrapper, salesforceResetStyles.salesforceReset),
      dangerouslySetInnerHTML: {
        __html: previewSubject
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.preview_body_wrapper,
      children: /* @__PURE__ */ _jsxDEV(ReactShadowRoot, {
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: clsx(styles.preview_body_text_wrapper, salesforceResetStyles.salesforceReset),
          dangerouslySetInnerHTML: {
            __html: data?.data?.body
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 97,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 96,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 7
    }, this)]
  }, void 0, true);
}
_s2(HTMLPreview, "i7a7kkqlH7HT000/srti6z0LFkQ=", false, function() {
  return [useSmartEmailModal, useSWR, useDebouncedCallback];
});
_c2 = HTMLPreview;
export const PreviewTab = ({
  previewTabProps: {
    control,
    error,
    hasAttachments,
    format,
    htmlContent
  }
}) => {
  _s3();
  const subject = useWatch({
    control,
    name: "subject"
  });
  const body = useWatch({
    control,
    name: "body"
  });
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.previewTab.banner"
  });
  const previewClasses = clsx(styles.preview, {
    [styles.preview__attachments]: hasAttachments
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: previewClasses,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles._header_callout_preview,
      children: /* @__PURE__ */ _jsxDEV(Banner, {
        type: error ? "error" : "success",
        icon: "eye",
        children: error ? t("error") : t("standard")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 127,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.preview_text_wrapper,
      children: format === "AST" ? /* @__PURE__ */ _jsxDEV(ASTPreview, {
        body,
        subject
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 133,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(HTMLPreview, {
        body: htmlContent,
        subject
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 135,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 131,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 125,
    columnNumber: 5
  }, void 0);
};
_s3(PreviewTab, "6jYZQDW9BV7dZO/Ml8mHVfLLPXk=", false, function() {
  return [useWatch, useWatch, useTranslation];
});
_c3 = PreviewTab;
var _c, _c2, _c3;
$RefreshReg$(_c, "ASTPreview");
$RefreshReg$(_c2, "HTMLPreview");
$RefreshReg$(_c3, "PreviewTab");
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
