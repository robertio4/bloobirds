import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-components-companyCard-companyCard.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/components/companyCard/companyCard.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailHelper/components/companyCard/companyCard.tsx", _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const Fragment = __vite__cjsImport2_react["Fragment"]; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Dropdown, Icon, IconButton, Label, Skeleton, Text, useHover } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useGetI18nSpacetime } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { CopyText } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-dist-index.js.js";
import { SimilarDealsFields, SimilarDealsFieldsLabels } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { addHttpsIfNeeded, parseAmount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { motion, useAnimation } from "/vendor/.vite-deps-framer-motion.js__v--396e37ef.js";
import __vite__cjsImport11_lodash_range from "/vendor/.vite-deps-lodash_range.js__v--53418726.js"; const range = __vite__cjsImport11_lodash_range.__esModule ? __vite__cjsImport11_lodash_range.default : __vite__cjsImport11_lodash_range;
import { getChemistryColor, getCompanyFieldsByType, getIconName } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-utils-smartEmailHelper.utils.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-components-companyCard-companyCard.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const CompanyCardSkeleton = () => /* @__PURE__ */ _jsxDEV("div", {
  className: styles.company_card_skeleton,
  children: [/* @__PURE__ */ _jsxDEV("div", {
    className: styles.skeleton_header,
    children: [/* @__PURE__ */ _jsxDEV(Skeleton, {
      variant: "text",
      width: "20%",
      height: 20
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Skeleton, {
      variant: "text",
      width: "30%",
      height: 20
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 32,
    columnNumber: 5
  }, void 0), /* @__PURE__ */ _jsxDEV(Skeleton, {
    variant: "text",
    width: "98%",
    height: 2
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 36,
    columnNumber: 5
  }, void 0), /* @__PURE__ */ _jsxDEV("div", {
    className: styles.skeleton_body,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      children: [/* @__PURE__ */ _jsxDEV(Skeleton, {
        variant: "text",
        width: "65%",
        height: 20
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Skeleton, {
        variant: "text",
        width: "70%",
        height: 20
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      children: [/* @__PURE__ */ _jsxDEV(Skeleton, {
        variant: "text",
        width: "65%",
        height: 20
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 43,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Skeleton, {
        variant: "text",
        width: "70%",
        height: 20
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 44,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      children: [/* @__PURE__ */ _jsxDEV(Skeleton, {
        variant: "text",
        width: "65%",
        height: 20
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Skeleton, {
        variant: "text",
        width: "70%",
        height: 20
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      children: [/* @__PURE__ */ _jsxDEV(Skeleton, {
        variant: "text",
        width: "65%",
        height: 20
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 51,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Skeleton, {
        variant: "text",
        width: "70%",
        height: 20
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 37,
    columnNumber: 5
  }, void 0)]
}, void 0, true, {
  fileName: _jsxFileName,
  lineNumber: 31,
  columnNumber: 3
}, void 0);
_c = CompanyCardSkeleton;
export const SimilarDealsSkeleton = () => /* @__PURE__ */ _jsxDEV("div", {
  className: styles.skeleton,
  children: range(4).map((number) => /* @__PURE__ */ _jsxDEV(Fragment, {
    children: /* @__PURE__ */ _jsxDEV(CompanyCardSkeleton, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 9
    }, void 0)
  }, number, false, {
    fileName: _jsxFileName,
    lineNumber: 61,
    columnNumber: 7
  }, void 0))
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 59,
  columnNumber: 3
}, void 0);
_c2 = SimilarDealsSkeleton;
const MainInfoField = ({
  label,
  value,
  link,
  isBubble
}) => {
  _s2();
  var _s = $RefreshSig$();
  const {
    t
  } = useTranslation();
  const parseValue = (label2, value2) => {
    _s();
    switch (label2) {
      case SimilarDealsFieldsLabels.closeDate:
      case SimilarDealsFieldsLabels.clientDate:
        return useGetI18nSpacetime(value2).format(t("dates.shortYear"));
      case SimilarDealsFieldsLabels.amount:
        return parseAmount(value2, 0, 0);
      default:
        return value2;
    }
  };
  _s(parseValue, "yr6jt3F4ncIcEIdDSi/EADa916c=", false, function() {
    return [useGetI18nSpacetime];
  });
  return value ? /* @__PURE__ */ _jsxDEV("div", {
    className: styles.mainInfo,
    style: {
      width: isBubble ? "127px" : "47%"
    },
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.mainInfo_header,
      children: [label === SimilarDealsFieldsLabels.amount ? /* @__PURE__ */ _jsxDEV(Text, {
        size: isBubble ? "xs" : "s",
        color: "verySoftPeanut",
        children: "\u20AC"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 102,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(Icon, {
        size: isBubble ? 14 : 16,
        name: getIconName(label),
        color: "verySoftPeanut"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 106,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        size: isBubble ? "xs" : "s",
        weight: "bold",
        children: label
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 112,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.mainInfo_body,
      children: label === SimilarDealsFieldsLabels.contact && typeof value === "string" ? /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [/* @__PURE__ */ _jsxDEV(CopyText, {
          alwaysDisplay: true,
          textToCopy: value,
          children: /* @__PURE__ */ _jsxDEV(Text, {
            size: isBubble ? "xs" : "s",
            className: clsx(styles.mainInfo_value_with_buttons, {
              [styles.mainInfo_value_with_buttons_short]: isBubble
            }),
            children: value
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 120,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 119,
          columnNumber: 13
        }, void 0), link && /* @__PURE__ */ _jsxDEV(IconButton, {
          name: "linkedin",
          color: "bloobirds",
          size: isBubble ? 14 : 16,
          onClick: () => window.open(addHttpsIfNeeded(link), "_blank")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 130,
          columnNumber: 15
        }, void 0)]
      }, void 0, true) : /* @__PURE__ */ _jsxDEV(Text, {
        size: isBubble ? "xs" : "s",
        className: clsx(styles.mainInfo_value, {
          [styles.mainInfo_value_short]: isBubble
        }),
        children: parseValue(label, value)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 139,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 94,
    columnNumber: 5
  }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
};
_s2(MainInfoField, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c3 = MainInfoField;
export const CompanyCard = ({
  company,
  index,
  isBubble
}) => {
  _s3();
  const [ref, isHovering] = useHover();
  const controls = useAnimation();
  const variants = {
    start: () => ({
      scale: [0, 1.1, 1],
      opacity: [0, 1, 1],
      transition: {
        duration: 0.3,
        delay: index / 10
      }
    })
  };
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "smartEmailModal.similarDealsTab"
  });
  useEffect(() => {
    controls?.start("start");
  }, []);
  return /* @__PURE__ */ _jsxDEV(motion.div, {
    animate: controls,
    variants,
    className: styles.container,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.header,
      children: [/* @__PURE__ */ _jsxDEV(CopyText, {
        alwaysDisplay: true,
        textToCopy: company.name,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "m",
          color: "bloobirds",
          weight: "bold",
          className: clsx(styles.company_title, {
            [styles.company_title_short]: isBubble
          }),
          children: company.name
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 184,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 183,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.headerRight,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          ref,
          className: styles.chemistry_text,
          children: /* @__PURE__ */ _jsxDEV(Dropdown, {
            width: 295,
            position: "bottom-end",
            arrow: true,
            visible: isHovering,
            anchor: /* @__PURE__ */ _jsxDEV(Text, {
              color: getChemistryColor(company.chemistry),
              size: "m",
              weight: "bold",
              children: company.chemistry + "%"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 201,
              columnNumber: 17
            }, void 0),
            children: /* @__PURE__ */ _jsxDEV("div", {
              className: styles.chemistry_dropdown,
              children: [/* @__PURE__ */ _jsxDEV(Text, {
                size: isBubble ? "s" : "m",
                color: "softPeanut",
                children: t("matchesInSame")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 211,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ _jsxDEV("ul", {
                children: company.matchingFields.map((field) => /* @__PURE__ */ _jsxDEV("li", {
                  className: styles.matching_list_element,
                  children: [/* @__PURE__ */ _jsxDEV(Icon, {
                    name: "circle",
                    size: 16,
                    color: "peanut"
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 217,
                    columnNumber: 23
                  }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
                    size: isBubble ? "xs" : "s",
                    className: styles.matching_list_text,
                    children: [/* @__PURE__ */ _jsxDEV("b", {
                      children: [field.label, ":"]
                    }, void 0, true, {
                      fileName: _jsxFileName,
                      lineNumber: 219,
                      columnNumber: 25
                    }, void 0), " ", field.value]
                  }, void 0, true, {
                    fileName: _jsxFileName,
                    lineNumber: 218,
                    columnNumber: 23
                  }, void 0)]
                }, field.label, true, {
                  fileName: _jsxFileName,
                  lineNumber: 216,
                  columnNumber: 21
                }, void 0))
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 214,
                columnNumber: 17
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 210,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 195,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 194,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Label, {
          size: "small",
          color: company.companyType === "Client" ? "peanut" : "softPeanut",
          value: company.companyType,
          uppercase: false,
          children: company.companyType
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 228,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 193,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 182,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.mainInfo_container,
      children: getCompanyFieldsByType(company.companyType).map((field) => /* @__PURE__ */ _jsxDEV(MainInfoField, {
        label: SimilarDealsFieldsLabels[field],
        value: company[field],
        link: company[SimilarDealsFields.LINKEDIN_URL],
        isBubble
      }, field, false, {
        fileName: _jsxFileName,
        lineNumber: 240,
        columnNumber: 11
      }, void 0))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 238,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 181,
    columnNumber: 5
  }, void 0);
};
_s3(CompanyCard, "I8jgfpMIIhJyqEu7WrrLwOWGlvc=", false, function() {
  return [useHover, useAnimation, useTranslation];
});
_c4 = CompanyCard;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "CompanyCardSkeleton");
$RefreshReg$(_c2, "SimilarDealsSkeleton");
$RefreshReg$(_c3, "MainInfoField");
$RefreshReg$(_c4, "CompanyCard");
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
