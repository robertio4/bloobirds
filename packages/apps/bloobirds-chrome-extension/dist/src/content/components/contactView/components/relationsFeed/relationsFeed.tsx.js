import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/relationsFeed/relationsFeed.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/relationsFeed/relationsFeed.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/relationsFeed/relationsFeed.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Action, Text, Button, Icon } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { relatedPickableIcons } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/contactView/components/relationsFeed/relationsFeed.module.css.js";
import RelationsFeedSkeleton from "/src/content/components/contactView/components/relationsFeed/relationsFeedSkeleton/relationsFeedSkeleton.tsx.js";
import { useRelationsFeed } from "/src/content/components/contactView/components/relationsFeed/useRelationsFeed.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const RelationObject = ({
  data
}) => {
  _s();
  const {
    setExtendedContext,
    useGetExtendedContext,
    closeExtendedScreen
  } = useExtensionContext();
  const {
    icon,
    title,
    fields,
    salesforceUrl,
    lastModifiedDate
  } = data;
  const {
    t
  } = useTranslation();
  const extendedContext = useGetExtendedContext();
  const isExtendedOpened = extendedContext?.open;
  const openExtendedScreen = () => !isExtendedOpened ? setExtendedContext({
    type: ExtendedContextTypes.RELATED_OBJECT_DETAILS,
    extraInfo: {
      ...data
    }
  }) : closeExtendedScreen();
  const handleClick = () => {
    window.open(salesforceUrl, "_blank");
  };
  const handleClickOnReferenceField = (urlReferenceField) => {
    window.open(urlReferenceField, "_blank");
  };
  const fieldsToShow = fields?.slice(0, 10);
  const getValue = (field) => {
    const value = field?.value;
    if (!value) {
      return "-";
    }
    const type = field?.fieldType;
    if (type === "datetime") {
      try {
        return spacetime(value).format(t("dates.monthShortWithTime"));
      } catch (e) {
        return value;
      }
    }
    return value;
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.relationCard,
    onClick: openExtendedScreen,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.relationTitle,
      children: [/* @__PURE__ */ _jsxDEV(Action, {
        icon: icon ?? "salesforce",
        color: relatedPickableIcons.find((p) => p.name === (icon ?? "salesforce"))?.color,
        size: "xs"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: "s",
        color: "peanut",
        weight: "bold",
        children: title
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 68,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.rightSide,
        children: [/* @__PURE__ */ _jsxDEV(Button, {
          variant: "secondary",
          size: "small",
          onClick: handleClick,
          children: /* @__PURE__ */ _jsxDEV(Icon, {
            name: "salesforce",
            size: 16,
            color: "bloobirds"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 73,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 72,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "peanut",
          children: spacetime(lastModifiedDate).format("{date-pad} {month-short}")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 75,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 71,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 7
    }, void 0), fieldsToShow?.length > 0 && /* @__PURE__ */ _jsxDEV("div", {
      className: styles.relationBody,
      children: fieldsToShow.map((field) => /* @__PURE__ */ _jsxDEV("div", {
        className: styles.relationField,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "softPeanut",
          children: field?.label
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 84,
          columnNumber: 15
        }, void 0), field?.fieldType === "reference" && field?.urlReferencedObject != null ? /* @__PURE__ */ _jsxDEV("span", {
          className: styles.referenceField,
          onClick: () => handleClickOnReferenceField(field?.urlReferencedObject),
          children: /* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            color: "bloobirds",
            ellipsis: 40,
            children: getValue(field)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 92,
            columnNumber: 19
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 88,
          columnNumber: 17
        }, void 0) : /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          children: getValue(field)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 97,
          columnNumber: 17
        }, void 0)]
      }, field.apiName, true, {
        fileName: _jsxFileName,
        lineNumber: 83,
        columnNumber: 13
      }, void 0))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 9
    }, void 0)]
  }, title, true, {
    fileName: _jsxFileName,
    lineNumber: 59,
    columnNumber: 5
  }, void 0);
};
_s(RelationObject, "qv00IYRvWnTc7y5plwGKR03v1fc=", true, function() {
  return [useExtensionContext, useTranslation];
});
_c = RelationObject;
export const RelationsFeed = () => {
  _s2();
  const {
    relations,
    loading
  } = useRelationsFeed();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.relationObjects.noResults"
  });
  const {
    settings
  } = useActiveUserSettings();
  const isAdmin = settings?.user?.accountAdmin;
  if (!loading && (!relations || Object.keys(relations).length === 0)) {
    return /* @__PURE__ */ _jsxDEV("div", {
      className: styles.noDataContainer,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "m",
        weight: "heavy",
        children: t("title")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 116,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: "s",
        color: "softPeanut",
        align: "center",
        children: /* @__PURE__ */ _jsxDEV(Trans, {
          i18nKey: "sidePeek.relationObjects.noResults.description",
          components: [isAdmin ? /* @__PURE__ */ _jsxDEV("a", {
            href: "https://app.bloobirds.com/app/account-settings/salesforceRelatedObjects",
            target: "_blank",
            rel: "noreferrer",
            children: ""
          }, "0", false, {
            fileName: _jsxFileName,
            lineNumber: 124,
            columnNumber: 17
          }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false)]
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 120,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 119,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 7
    }, void 0);
  }
  if (loading) {
    return /* @__PURE__ */ _jsxDEV("div", {
      className: styles.container,
      children: /* @__PURE__ */ _jsxDEV(RelationsFeedSkeleton, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 145,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 144,
      columnNumber: 7
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.container,
    children: Object.values(relations).map((relation) => /* @__PURE__ */ _jsxDEV("div", {
      className: styles.relationContainer,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        size: "s",
        color: "softPeanut",
        children: relation[0]?.objectType
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 154,
        columnNumber: 11
      }, void 0), relation?.map((relationObject) => {
        return /* @__PURE__ */ _jsxDEV(RelationObject, {
          data: relationObject
        }, relation[0]?.title, false, {
          fileName: _jsxFileName,
          lineNumber: 158,
          columnNumber: 20
        }, void 0);
      })]
    }, relation[0]?.objectType, true, {
      fileName: _jsxFileName,
      lineNumber: 153,
      columnNumber: 9
    }, void 0))
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 151,
    columnNumber: 5
  }, void 0);
};
_s2(RelationsFeed, "AbWQIeHn5QwfZ34c/hi/AEPqwmM=", false, function() {
  return [useRelationsFeed, useTranslation, useActiveUserSettings];
});
_c2 = RelationsFeed;
var _c, _c2;
$RefreshReg$(_c, "RelationObject");
$RefreshReg$(_c2, "RelationsFeed");
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
