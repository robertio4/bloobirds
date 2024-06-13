import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/contactViewDetails/contactViewDetails.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/contactViewDetails/contactViewDetails.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/contactViewDetails/contactViewDetails.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useUserHelpers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { CustomUserHelperKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { isSalesforcePage, normalizeUrl } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { atom, useRecoilState, useResetRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import __vite__cjsImport10_recoilPersist from "/vendor/.vite-deps-recoil-persist.js__v--a151999f.js"; const recoilPersist = __vite__cjsImport10_recoilPersist["recoilPersist"];
import { mutate } from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { ContactDetailsSource, Source } from "/src/content/components/contactDetails/contactDetailSource/contactDetailSource.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { BloobirdsDetails } from "/src/content/components/contactView/components/contactViewDetails/components/bloobirdsDetails.tsx.js";
import { SalesforceDetails } from "/src/content/components/contactView/components/contactViewDetails/components/salesforceDetails.tsx.js";
import styles from "/src/content/components/contactView/components/contactViewDetails/contactViewDetails.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export function ContactViewDetails({
  bobject
}) {
  _s();
  const {
    useGetSettings: useGetSettings2
  } = useExtensionContext();
  const settings = useGetSettings2();
  const salesforceInstance = settings?.account?.salesforceInstance;
  if (!bobject)
    return null;
  return salesforceInstance ? /* @__PURE__ */ _jsxDEV(ContactViewAllDetails, {
    bobject
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 29,
    columnNumber: 5
  }, this) : /* @__PURE__ */ _jsxDEV(ContactViewBloobirdsDetails, {
    bobject
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 31,
    columnNumber: 5
  }, this);
}
_s(ContactViewDetails, "fwG0hRiX2nzJEae64b9HMs77PQg=", true, function() {
  return [useExtensionContext];
});
_c = ContactViewDetails;
const {
  persistAtom
} = recoilPersist();
const sourceAtom = atom({
  key: "sourceAtom",
  default: isSalesforcePage(normalizeUrl(window.location.href)) ? Source.salesforce : Source.bloobirds,
  effects_UNSTABLE: [persistAtom]
});
function ContactViewAllDetails({
  bobject
}) {
  _s2();
  const {
    useGetSettings: useGetSettings2,
    useGetSidePeekEnabled: useGetSidePeekEnabled2
  } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled2();
  const settings = useGetSettings2();
  const salesforceInstance = settings?.account?.salesforceInstance;
  const [source, setSource] = useRecoilState(sourceAtom);
  const resetSource = useResetRecoilState(sourceAtom);
  const [mutated, setMutated] = useState(false);
  const {
    setExtendedContext
  } = useExtensionContext();
  const {
    t
  } = useTranslation();
  const {
    get
  } = useUserHelpers();
  const helperKey = CustomUserHelperKeys.HAVE_SAVED_FIELDS_CUSTOM_ORDER;
  const helperValue = get(helperKey) ? JSON.parse(get(helperKey)) : [];
  const helperValueKey = source + bobject.id.typeName;
  const openExtendedScreen = () => setExtendedContext({
    type: ExtendedContextTypes.ORDER_CONTACT_DETAILS,
    extensionBobject: bobject,
    extraInfo: {
      source,
      setSource: () => void 0
    },
    mutate: () => {
      mutate(`/linkedin/externalObject/SALESFORCE/${source.toUpperCase()}/${bobject.id.typeName.toUpperCase()}`);
      if (source === Source.salesforce)
        mutate(`/utils/service/salesforce/query`);
    }
  });
  useEffect(() => {
    if (!salesforceInstance)
      resetSource();
  }, []);
  const detailHeaderClasses = clsx(styles.detail_header, {
    [styles.detail_header_sidePeek]: sidePeekEnabled
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.detail_container,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: detailHeaderClasses,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: "softPeanut",
        weight: "bold",
        children: t("sidePeek.overview.fields.dataFrom")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 87,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(ContactDetailsSource, {
        source,
        setSource: (src) => {
          setSource((source2) => {
            if (source2 !== src) {
              return src;
            } else
              return source2;
          });
          if (mutated) {
            setMutated(false);
          }
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 90,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.detail_header_row,
        onClick: openExtendedScreen,
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: "settings",
          color: "bloobirds",
          size: 18
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 106,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 105,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV(ContactViewDetailsFields, {
      hasHelper: helperValue.includes(helperValueKey),
      source,
      bobject,
      openExtendedScreen
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 85,
    columnNumber: 5
  }, this);
}
_s2(ContactViewAllDetails, "tNWURiuXOsdYs4sg67oNitsM0ew=", false, function() {
  return [useExtensionContext, useGetSidePeekEnabled, useGetSettings, useRecoilState, useResetRecoilState, useExtensionContext, useTranslation, useUserHelpers];
});
_c2 = ContactViewAllDetails;
function ContactViewBloobirdsDetails({
  bobject
}) {
  _s3();
  const {
    setExtendedContext,
    useGetSidePeekEnabled: useGetSidePeekEnabled2
  } = useExtensionContext();
  const {
    get
  } = useUserHelpers();
  const helperKey = CustomUserHelperKeys.HAVE_SAVED_FIELDS_CUSTOM_ORDER;
  const helperValue = get(helperKey) ? JSON.parse(get(helperKey)) : [];
  const helperValueKey = Source.bloobirds + bobject.id.typeName;
  const hasHelper = helperValue.includes(helperValueKey);
  const sidePeekEnabled = useGetSidePeekEnabled2();
  const {
    t
  } = useTranslation();
  const openExtendedScreen = () => setExtendedContext({
    type: ExtendedContextTypes.ORDER_CONTACT_DETAILS,
    extensionBobject: bobject,
    extraInfo: {
      source: Source.bloobirds
    },
    mutate: () => mutate(`/linkedin/externalObject/SALESFORCE/BLOOBIRDS/${bobject.id.typeName.toUpperCase()}`)
  });
  const detailHeaderClasses = clsx(styles.detail_header, {
    [styles.detail_header_sidePeek]: sidePeekEnabled
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.detail_container,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: detailHeaderClasses,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        color: "softPeanut",
        weight: "bold",
        children: t("sidePeek.overview.fields.dataFrom")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 149,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(ContactDetailsSource, {
        source: Source.bloobirds,
        setSource: () => null
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 152,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.detail_header_row,
        onClick: openExtendedScreen,
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: "settings",
          color: "bloobirds",
          size: 18
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 154,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 153,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 148,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV(ContactViewDetailsFields, {
      hasHelper,
      source: Source.bloobirds,
      bobject,
      openExtendedScreen
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 157,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 147,
    columnNumber: 5
  }, this);
}
_s3(ContactViewBloobirdsDetails, "w2Za8NmZU18Iol7zKYHSV5An6Mc=", false, function() {
  return [useExtensionContext, useUserHelpers, useGetSidePeekEnabled, useTranslation];
});
_c3 = ContactViewBloobirdsDetails;
function ContactViewDetailsFields(props) {
  const {
    source
  } = props;
  switch (source) {
    case Source.bloobirds:
      return /* @__PURE__ */ _jsxDEV(BloobirdsDetails, {
        ...props
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 177,
        columnNumber: 14
      }, this);
    case Source.salesforce:
      return /* @__PURE__ */ _jsxDEV(SalesforceDetails, {
        ...props
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 179,
        columnNumber: 14
      }, this);
  }
}
_c4 = ContactViewDetailsFields;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "ContactViewDetails");
$RefreshReg$(_c2, "ContactViewAllDetails");
$RefreshReg$(_c3, "ContactViewBloobirdsDetails");
$RefreshReg$(_c4, "ContactViewDetailsFields");
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
