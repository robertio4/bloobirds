import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extendedScreen/pages/relatedObjectDetails/relatedObjectDetails.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extendedScreen/pages/relatedObjectDetails/relatedObjectDetails.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extendedScreen/pages/relatedObjectDetails/relatedObjectDetails.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const Fragment = __vite__cjsImport2_react["Fragment"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Action, Button, Icon, SearchInput, Skeleton, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { relatedPickableIcons } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport6_lodash_range from "/vendor/.vite-deps-lodash_range.js__v--53418726.js"; const range = __vite__cjsImport6_lodash_range.__esModule ? __vite__cjsImport6_lodash_range.default : __vite__cjsImport6_lodash_range;
import __vite__cjsImport7_lodash_debounce from "/vendor/.vite-deps-lodash_debounce.js__v--ce8d7378.js"; const debounce = __vite__cjsImport7_lodash_debounce.__esModule ? __vite__cjsImport7_lodash_debounce.default : __vite__cjsImport7_lodash_debounce;
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import styles from "/src/content/components/extendedScreen/pages/relatedObjectDetails/relatedObjectDetails.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const RelatedObjectDetails = ({
  data
}) => {
  _s();
  const {
    title,
    salesforceUrl,
    fields,
    icon,
    lastModifiedDate
  } = data;
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "extendedScreen.relationObjectDetails"
  });
  const handleClick = () => {
    window.open(salesforceUrl, "_blank");
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.wrapper,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.container,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.header,
        children: [/* @__PURE__ */ _jsxDEV(Action, {
          icon: icon ?? "salesforce",
          color: relatedPickableIcons.find((p) => p.name === (icon ?? "salesforce"))?.color,
          size: "s"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 34,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          color: "peanut",
          weight: "bold",
          children: title
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 41,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.rightSide,
          children: /* @__PURE__ */ _jsxDEV(Text, {
            size: "s",
            color: "peanut",
            children: spacetime(lastModifiedDate).format("{date-pad} {month-short}")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 45,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 44,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 33,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.row
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(FilteredFields, {
        fields
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 51,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.footerContainer,
      children: /* @__PURE__ */ _jsxDEV(Button, {
        className: styles.button,
        variant: "secondary",
        onClick: handleClick,
        iconLeft: "externalLink",
        children: t("openInSalesforce")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 31,
    columnNumber: 5
  }, void 0);
};
_s(RelatedObjectDetails, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c = RelatedObjectDetails;
export function FilteredFields({
  fields
}) {
  _s2();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "extendedScreen.relationObjectDetails"
  });
  const {
    t: tDates
  } = useTranslation("translation", {
    keyPrefix: "dates"
  });
  const [filteredFields, setFilteredFields] = useState(fields);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    setFilteredFields(fields);
  }, [fields]);
  const getFilteredFields = debounce((value) => {
    const filteredFields2 = fields.filter((field) => field.label.toLowerCase().includes(value.toLowerCase()));
    setFilteredFields(filteredFields2);
  }, 500);
  const handleChange = (value) => {
    setSearchText(value);
    getFilteredFields(value);
  };
  const handleClickOnReferenceField = (urlReferenceField) => {
    window.open(urlReferenceField, "_blank");
  };
  const getValue = (field) => {
    const value = field?.value;
    if (!value) {
      return "-";
    }
    const type = field?.fieldType;
    if (type === "datetime") {
      try {
        return spacetime(value).format(tDates("shortMonthFullDate"));
      } catch (e) {
        return value;
      }
    }
    return value;
  };
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles._search_wrapper,
      children: [/* @__PURE__ */ _jsxDEV(SearchInput, {
        color: "bloobirds",
        width: "356px",
        size: "medium",
        onChange: handleChange,
        value: searchText,
        placeholder: t("searchPlaceholder")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 115,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(Text, {
        size: "xxs",
        color: "softPeanut",
        children: t("searchHelp")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 123,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 7
    }, this), filteredFields === void 0 || filteredFields === null ? /* @__PURE__ */ _jsxDEV(ActivityFeedSkeleton, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 129,
      columnNumber: 9
    }, this) : filteredFields?.length > 0 ? /* @__PURE__ */ _jsxDEV("div", {
      className: styles.relationBody,
      children: filteredFields.map((field) => /* @__PURE__ */ _jsxDEV("div", {
        className: styles.relationField,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          color: "softPeanut",
          children: field?.label
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 134,
          columnNumber: 15
        }, this), field.fieldType === "reference" && field.urlReferencedObject != null ? /* @__PURE__ */ _jsxDEV("span", {
          className: styles.referenceField,
          onClick: () => handleClickOnReferenceField(field.urlReferencedObject),
          children: /* @__PURE__ */ _jsxDEV(Text, {
            size: "s",
            color: "bloobirds",
            children: getValue(field)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 142,
            columnNumber: 19
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 138,
          columnNumber: 17
        }, this) : /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          children: getValue(field)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 147,
          columnNumber: 17
        }, this)]
      }, field.apiName, true, {
        fileName: _jsxFileName,
        lineNumber: 133,
        columnNumber: 13
      }, this))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 131,
      columnNumber: 9
    }, this) : /* @__PURE__ */ _jsxDEV(NoFieldsSelectedToDisplay, {
      searchText
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 153,
      columnNumber: 9
    }, this)]
  }, void 0, true);
}
_s2(FilteredFields, "UXvlSRBpKIqNppJTHLKHluq2NHE=", false, function() {
  return [useTranslation, useTranslation];
});
_c2 = FilteredFields;
const ActivityCardSkeleton = () => /* @__PURE__ */ _jsxDEV("div", {
  children: [/* @__PURE__ */ _jsxDEV(Skeleton, {
    variant: "text",
    width: "50%",
    height: 24
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 161,
    columnNumber: 5
  }, void 0), /* @__PURE__ */ _jsxDEV(Skeleton, {
    variant: "text",
    width: "50%",
    height: 24
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 162,
    columnNumber: 5
  }, void 0)]
}, void 0, true, {
  fileName: _jsxFileName,
  lineNumber: 160,
  columnNumber: 3
}, void 0);
_c3 = ActivityCardSkeleton;
const ActivityFeedSkeleton = () => /* @__PURE__ */ _jsxDEV("div", {
  className: styles.relationBody,
  children: range(6).map((number) => /* @__PURE__ */ _jsxDEV(Fragment, {
    children: /* @__PURE__ */ _jsxDEV(ActivityCardSkeleton, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 170,
      columnNumber: 9
    }, void 0)
  }, number, false, {
    fileName: _jsxFileName,
    lineNumber: 169,
    columnNumber: 7
  }, void 0))
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 167,
  columnNumber: 3
}, void 0);
_c4 = ActivityFeedSkeleton;
const NoFieldsSelectedToDisplay = ({
  searchText
}) => {
  _s3();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "extendedScreen.relationObjectDetails"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.noDataContainer,
    children: [/* @__PURE__ */ _jsxDEV(Icon, {
      name: "searchNone",
      color: "softPeanut"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 182,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        weight: "bold",
        size: "s",
        align: "center",
        color: "softPeanut",
        children: t("noResults", {
          searchText
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 184,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: "s",
        align: "center",
        color: "softPeanut",
        children: t("tryOtherSearch")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 187,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 183,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 181,
    columnNumber: 5
  }, void 0);
};
_s3(NoFieldsSelectedToDisplay, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c5 = NoFieldsSelectedToDisplay;
var _c, _c2, _c3, _c4, _c5;
$RefreshReg$(_c, "RelatedObjectDetails");
$RefreshReg$(_c2, "FilteredFields");
$RefreshReg$(_c3, "ActivityCardSkeleton");
$RefreshReg$(_c4, "ActivityFeedSkeleton");
$RefreshReg$(_c5, "NoFieldsSelectedToDisplay");
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
