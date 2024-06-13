import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/linkedInScreens/messagesSynced.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/linkedInScreens/messagesSynced.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/linkedInScreens/messagesSynced.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Text, Button } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { MessagesEvents } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { searchLeadByQuery } from "/src/utils/leads.ts.js";
import { createBloobirdsUrl, isIdLinkedinUrl } from "/src/utils/url.ts.js";
import { BubbleWindow, BubbleWindowContent, BubbleWindowFooter, BubbleWindowHeader } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import Loading from "/src/content/components/loadingIndicator/loadingIndicator.tsx.js";
import styles from "/src/content/components/linkedInScreens/styles.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const MessageInfo = () => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.syncMessageInfo"
  });
  const {
    useGetCurrentPage
  } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const [linkedInUrl, setLinkedInUrl] = useState(null);
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [salesNavigatorUrl, setSalesNavigatorUrl] = useState(null);
  const [fullName, setFullName] = useState(null);
  useEffect(() => {
    setLoading(true);
    setLinkedInUrl(null);
    setLead(null);
    setSalesNavigatorUrl(null);
    setFullName(null);
    window.addEventListener(MessagesEvents.UrlFound, (event) => {
      const {
        linkedInUrl: linkedInUrl2,
        salesNavigatorUrl: salesNavigatorUrl2,
        fullName: fullName2
      } = event.detail;
      setFullName(fullName2);
      setLinkedInUrl(linkedInUrl2);
      setSalesNavigatorUrl(salesNavigatorUrl2);
    }, {
      once: true
    });
    window.addEventListener(MessagesEvents.UrlNotFound, (e) => {
      const {
        detail
      } = e;
      const {
        salesNavigatorUrl: salesNavigatorUrl2
      } = detail;
      setSalesNavigatorUrl(salesNavigatorUrl2);
    }, {
      once: true
    });
  }, [currentPage]);
  useEffect(() => {
    if (linkedInUrl || salesNavigatorUrl) {
      searchLeadByQuery({
        linkedInUrl: isIdLinkedinUrl(linkedInUrl) ? null : linkedInUrl || null,
        salesNavigatorUrl: salesNavigatorUrl || null,
        leadFullName: fullName || null
      }).then((data) => {
        if (data?.leads[0]) {
          setLead(data?.leads[0]);
          setLoading(false);
        } else {
          setLoading(false);
        }
      }).catch(() => {
        setLoading(false);
      });
    }
  }, [linkedInUrl, salesNavigatorUrl]);
  const appendAutoOpen = (url) => {
    return `${url}?bb-open`;
  };
  const onClickProfile = () => {
    if (salesNavigatorUrl) {
      window.open(appendAutoOpen(salesNavigatorUrl), "_blank");
    } else if (linkedInUrl) {
      window.open(appendAutoOpen(linkedInUrl), "_blank");
    }
  };
  const onClickLead = () => {
    const url = createBloobirdsUrl(lead.id);
    window.open(url, "_blank");
  };
  if (loading) {
    return /* @__PURE__ */ _jsxDEV(Loading, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 12
    }, void 0);
  }
  if (lead) {
    return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
      children: [/* @__PURE__ */ _jsxDEV(BubbleWindowHeader, {
        name: "refresh",
        color: "bloobirds",
        backgroundColor: "lightBloobirds"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 104,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindowContent, {
        className: styles._textWrapper,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          align: "left",
          weight: "medium",
          size: "l",
          color: "peanut",
          className: styles.title,
          children: ["\u{1F44C} ", t("messagesSynced")]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 106,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          align: "left",
          color: "gray",
          size: "m",
          children: t("messagesSyncedInfo")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 109,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 105,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindowFooter, {
        children: /* @__PURE__ */ _jsxDEV(Button, {
          variant: "secondary",
          onClick: onClickLead,
          expand: true,
          children: t("viewInBloobirds")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 114,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 113,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 7
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
    children: [/* @__PURE__ */ _jsxDEV(BubbleWindowHeader, {
      name: "alertTriangle",
      color: "banana",
      backgroundColor: "verySoftBanana"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 124,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindowContent, {
      className: styles._textWrapper,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        align: "left",
        weight: "medium",
        size: "l",
        color: "peanut",
        children: ["\u{1F449}", t("syncMessages")]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 126,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        align: "left",
        color: "gray",
        size: "m",
        children: ["\u{1F449}", t("syncMessagesDescription")]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 129,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 125,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindowFooter, {
      children: /* @__PURE__ */ _jsxDEV(Button, {
        onClick: onClickProfile,
        expand: true,
        children: ["\u{1F449}", t("viewProfileButton")]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 134,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 123,
    columnNumber: 5
  }, void 0);
};
_s(MessageInfo, "NSyAxpo4TUW4uFMylUScILQoSeU=", true, function() {
  return [useTranslation, useExtensionContext];
});
_c = MessageInfo;
export default MessageInfo;
var _c;
$RefreshReg$(_c, "MessageInfo");
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
