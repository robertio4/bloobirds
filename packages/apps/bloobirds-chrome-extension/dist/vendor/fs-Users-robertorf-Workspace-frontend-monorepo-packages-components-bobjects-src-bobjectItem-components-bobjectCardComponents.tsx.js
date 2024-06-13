import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectItem-components-bobjectCardComponents.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/bobjectItem/components/bobjectCardComponents.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/bobjectItem/components/bobjectCardComponents.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react;
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Icon, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useDataModel, useIsB2CAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { BobjectTypes, bobjectUrl, defaultSearchCompany } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { generateDatePrefix } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { top } from "/vendor/.vite-deps-@popperjs_core.js__v--43a3a386.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport10_lodash_clone from "/vendor/.vite-deps-lodash_clone.js__v--2035e78f.js"; const clone = __vite__cjsImport10_lodash_clone.__esModule ? __vite__cjsImport10_lodash_clone.default : __vite__cjsImport10_lodash_clone;
import { AssigneeComponent } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-assigneeComponent-assigneeComponent.tsx.js";
import { StatusLabel } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-statusLabel-statusLabel.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectItem-bobjectItem.module.css.js";
import { getName, getSubtitle } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-bobjectItem-utils-searchBar.utils.ts.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const ICONS = {
  Lead: "person",
  Company: "company",
  Opportunity: "fileOpportunity"
};
function resolveHit(hits, hitByName) {
  const obj = clone(hits);
  if (obj && obj[hitByName]) {
    delete obj[hitByName];
    return Object.values(obj)[0];
  }
  return Object.values(obj)[0];
}
export function SearchStatusLabel({
  status
}) {
  return status ? /* @__PURE__ */ _jsxDEV(StatusLabel, {
    name: status.name,
    textColor: status.textColor,
    backgroundColor: status.backgroundColor,
    maxWidth: "200px"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 44,
    columnNumber: 5
  }, this) : null;
}
_c = SearchStatusLabel;
function CardLeftComponent({
  bobject,
  hits,
  handleCompanyClicked
}) {
  _s();
  const dataModel = useDataModel();
  const isB2CAccount = useIsB2CAccount();
  const type = bobject?.bobjectType;
  const {
    name,
    hitByName
  } = getName(dataModel, bobject, hits);
  const subtitle = getSubtitle(bobject);
  const isNotCompany = type !== "Company";
  const companyName = isNotCompany && bobject.companyName;
  const companyId = isNotCompany && bobject.companyId;
  const companyWebsite = isNotCompany && bobject.companyWebsite;
  const firstHit = hits && resolveHit(hits, hitByName);
  function handleCompanyClick(event) {
    const url = bobjectUrl({
      id: {
        typeName: companyId.split("/")[1],
        objectId: companyId.split("/")[2]
      }
    });
    const company = {
      ...defaultSearchCompany,
      rawBobject: {
        ...defaultSearchCompany.rawBobject,
        id: companyId
      },
      bobjectType: BobjectTypes.Company,
      companyName,
      url,
      website: companyWebsite
    };
    handleCompanyClicked(company, event);
    event.stopPropagation();
  }
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.circleIcon,
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        name: ICONS[type],
        size: 20,
        color: "bloobirds"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.bobjectItemContent,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.bobjectItemName,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          color: "bloobirds",
          className: styles.bobjectItemContentSpan,
          children: /* @__PURE__ */ _jsxDEV("span", {
            dangerouslySetInnerHTML: {
              __html: name
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 105,
            columnNumber: 13
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 104,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 103,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.bobjectItemContentInfoRow,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "softPeanut",
          className: styles.bobjectItemContentSpan,
          children: firstHit ? /* @__PURE__ */ _jsxDEV("span", {
            dangerouslySetInnerHTML: {
              __html: firstHit
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 110,
            columnNumber: 25
          }, this) : subtitle
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 109,
          columnNumber: 11
        }, this), companyName && !isB2CAccount && /* @__PURE__ */ _jsxDEV("div", {
          className: styles.bobjectItemContentInfoColumn,
          children: [/* @__PURE__ */ _jsxDEV("div", {
            className: styles.bobjectItemContentInfoRowSeparator,
            children: [(firstHit || subtitle) && /* @__PURE__ */ _jsxDEV(Icon, {
              name: "circle",
              size: 15,
              color: "softPeanut"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 115,
              columnNumber: 44
            }, this), /* @__PURE__ */ _jsxDEV(Icon, {
              name: "company",
              size: 15,
              color: "bloobirds"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 116,
              columnNumber: 17
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 114,
            columnNumber: 15
          }, this), /* @__PURE__ */ _jsxDEV("div", {
            onClick: (event) => handleCompanyClick(event),
            style: {
              cursor: "pointer",
              overflow: "hidden"
            },
            children: /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              color: "bloobirds",
              className: styles.bobjectItemContentSpan,
              children: companyName
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 123,
              columnNumber: 17
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 119,
            columnNumber: 15
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 113,
          columnNumber: 13
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 108,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 7
    }, this)]
  }, void 0, true);
}
_s(CardLeftComponent, "AwH8HLXzpFhc8MJt8UqpJHs7GmQ=", false, function() {
  return [useDataModel, useIsB2CAccount];
});
_c2 = CardLeftComponent;
function CardCenterComponent({
  bobject,
  isWebapp = false
}) {
  _s2();
  const {
    t
  } = useTranslation();
  const classes = clsx(styles.bobjectItemContentCenter, {
    [styles.bobjectItemContentCenterOTO]: !isWebapp
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: classes,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.bobjectItemContentCenterColumn,
      children: /* @__PURE__ */ _jsxDEV(AssigneeComponent, {
        value: bobject.assignedTo
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 150,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 149,
      columnNumber: 7
    }, this), isWebapp && /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.bobjectItemContentCenterColumn,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles.bobjectItemContentCenterRow,
          children: /* @__PURE__ */ _jsxDEV(Tooltip, {
            title: t("bobjects.bobjectItem.attempts"),
            position: top,
            children: [/* @__PURE__ */ _jsxDEV(Icon, {
              name: "check",
              size: 15,
              color: "softPeanut"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 157,
              columnNumber: 17
            }, this), /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              color: "softPeanut",
              children: bobject.attempts
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 158,
              columnNumber: 17
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 156,
            columnNumber: 15
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 155,
          columnNumber: 13
        }, this), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.bobjectItemContentCenterRow,
          children: /* @__PURE__ */ _jsxDEV(Tooltip, {
            title: t("bobjects.bobjectItem.touches"),
            position: top,
            children: [/* @__PURE__ */ _jsxDEV(Icon, {
              name: "checkDouble",
              size: 15,
              color: "bloobirds"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 165,
              columnNumber: 17
            }, this), /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              color: "softPeanut",
              children: bobject.touches
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 166,
              columnNumber: 17
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 164,
            columnNumber: 15
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 163,
          columnNumber: 13
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 154,
        columnNumber: 11
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.bobjectItemContentCenterColumn,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles.bobjectItemContentCenterRow,
          children: /* @__PURE__ */ _jsxDEV(Tooltip, {
            title: t("bobjects.bobjectItem.lastAttempt"),
            position: top,
            children: [/* @__PURE__ */ _jsxDEV(Icon, {
              name: "calendar",
              size: 15,
              color: "softPeanut"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 175,
              columnNumber: 17
            }, this), /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              color: "softPeanut",
              children: generateDatePrefix(bobject.lastAttemptDate && new Date(bobject.lastAttemptDate), true, t)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 176,
              columnNumber: 17
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 174,
            columnNumber: 15
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 173,
          columnNumber: 13
        }, this), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.bobjectItemContentCenterRow,
          children: /* @__PURE__ */ _jsxDEV(Tooltip, {
            title: t("bobjects.bobjectItem.lastTouch"),
            position: top,
            children: [/* @__PURE__ */ _jsxDEV(Icon, {
              name: "calendar",
              size: 15,
              color: "softPeanut"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 187,
              columnNumber: 17
            }, this), /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              color: "softPeanut",
              children: generateDatePrefix(bobject.lastTouchDate && new Date(bobject.lastTouchDate), true, t)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 188,
              columnNumber: 17
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 186,
            columnNumber: 15
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 185,
          columnNumber: 13
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 172,
        columnNumber: 11
      }, this)]
    }, void 0, true)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 148,
    columnNumber: 5
  }, this);
}
_s2(CardCenterComponent, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c3 = CardCenterComponent;
export function SearchPreviewButton({
  isSelected,
  bobject,
  handleClick
}) {
  _s3();
  const {
    t
  } = useTranslation();
  return isSelected ? /* @__PURE__ */ _jsxDEV("div", {
    className: styles.bobjectItem_preview_button_wrapper,
    children: /* @__PURE__ */ _jsxDEV(Button, {
      dataTest: "SearchBar-Preview",
      variant: "secondary",
      uppercase: false,
      size: "small",
      className: styles.bobjectItem_preview_button,
      onClick: (event) => {
        event.preventDefault();
        event.stopPropagation();
        handleClick?.(event, bobject);
      },
      children: t("common.preview")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 214,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 213,
    columnNumber: 5
  }, this) : null;
}
_s3(SearchPreviewButton, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c4 = SearchPreviewButton;
export const SearchCardCenter = React.memo(CardCenterComponent);
_c5 = SearchCardCenter;
export const SearchCardLeft = React.memo(CardLeftComponent);
_c6 = SearchCardLeft;
var _c, _c2, _c3, _c4, _c5, _c6;
$RefreshReg$(_c, "SearchStatusLabel");
$RefreshReg$(_c2, "CardLeftComponent");
$RefreshReg$(_c3, "CardCenterComponent");
$RefreshReg$(_c4, "SearchPreviewButton");
$RefreshReg$(_c5, "SearchCardCenter");
$RefreshReg$(_c6, "SearchCardLeft");
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
