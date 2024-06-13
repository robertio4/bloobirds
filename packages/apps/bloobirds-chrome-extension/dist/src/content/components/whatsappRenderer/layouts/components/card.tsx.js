import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/whatsappRenderer/layouts/components/card.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/whatsappRenderer/layouts/components/card.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/whatsappRenderer/layouts/components/card.tsx", _s = $RefreshSig$();
import { Button, Icon, Text, useHover } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { BobjectTypes, COMPANY_FIELDS_LOGIC_ROLE, ContactViewSubTab, LEAD_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { getTextFromLogicRole, parseAmount, updateBobject } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/whatsappRenderer/layouts/components/card.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const WhatsappBobjectCard = ({
  bobject,
  isLinkMode = false,
  phoneNumber,
  onSelect
}) => {
  _s();
  const {
    setContactViewBobjectId,
    setWhatsappLead,
    setNoMatchFound,
    setForcedActiveSubTab
  } = useExtensionContext();
  const isOpportunity = bobject?.id?.typeName === BobjectTypes.Opportunity || bobject?.bobjectType === BobjectTypes.Opportunity;
  const isCompany = bobject?.id?.typeName === BobjectTypes.Company || bobject?.bobjectType === BobjectTypes.Company;
  const name = bobject?.name ?? bobject.fullName ?? (isCompany ? getTextFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.NAME) : getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME));
  const jobTitle = bobject.jobTitle ?? getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE);
  const amount = bobject?.amount;
  const phone = bobject.phone ?? (isCompany ? getTextFromLogicRole(bobject, "COMPANY__GENERIC_PHONE") : getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.PHONE));
  let companyName = bobject.companyName;
  if (!companyName) {
    const companyId = bobject.company?.value ?? getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.COMPANY);
    const companyBobject = bobject.referencedBobjects?.[companyId];
    companyName = companyBobject && getTextFromLogicRole(companyBobject, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  }
  const website = getTextFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.WEBSITE);
  const [ref, isHovering] = useHover();
  const handleSelect = () => {
    const bobjectId = bobject?.id?.value ?? bobject?.rawBobject?.id;
    setWhatsappLead({
      id: bobjectId,
      name,
      number: phone ?? phoneNumber
    });
    setNoMatchFound(null);
    setContactViewBobjectId(bobjectId);
    setForcedActiveSubTab(ContactViewSubTab.ACTIVITIES);
    onSelect?.(bobjectId);
  };
  const handleLink = () => {
    handleSelect();
    const bobjectId = bobject?.id?.value ?? bobject?.rawBobject?.id;
    updateBobject(bobjectId, {
      LEAD__PHONE: phoneNumber
    });
  };
  const iconName = isOpportunity ? "fileOpportunity" : isCompany ? "company" : "person";
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.bobjectItemCompressed,
    ref,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.circleIcon,
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        name: iconName,
        size: 20,
        color: "bloobirds"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 88,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
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
            lineNumber: 93,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 92,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 91,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.bobjectItemContentInfoRow,
        children: [(jobTitle || website) && /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "softPeanut",
          className: styles.bobjectItemContentSpan,
          children: jobTitle || website
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 98,
          columnNumber: 13
        }, void 0), amount && /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "softPeanut",
          className: styles.bobjectItemContentSpan,
          children: parseAmount(amount)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 103,
          columnNumber: 13
        }, void 0), companyName && /* @__PURE__ */ _jsxDEV("div", {
          className: styles.bobjectItemContentInfoColumn,
          style: {
            maxWidth: phone ? "33%" : "50%"
          },
          children: [/* @__PURE__ */ _jsxDEV("div", {
            className: styles.bobjectItemContentInfoRowSeparator,
            children: [jobTitle && /* @__PURE__ */ _jsxDEV(Icon, {
              name: "circle",
              size: 15,
              color: "softPeanut"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 113,
              columnNumber: 30
            }, void 0), /* @__PURE__ */ _jsxDEV(Icon, {
              name: "company",
              size: 15,
              color: "bloobirds"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 114,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 112,
            columnNumber: 15
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            color: "bloobirds",
            className: styles.bobjectItemContentSpan,
            children: companyName
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 117,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 108,
          columnNumber: 13
        }, void 0), phone && /* @__PURE__ */ _jsxDEV("div", {
          className: styles.bobjectItemContentInfoColumn,
          style: {
            maxWidth: companyName ? "33%" : "50%"
          },
          children: [(jobTitle || website || companyName) && /* @__PURE__ */ _jsxDEV(Icon, {
            name: "circle",
            size: 15,
            color: "softPeanut"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 128,
            columnNumber: 17
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            weight: "bold",
            className: styles.bobjectItemContentSpan,
            children: phone
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 130,
            columnNumber: 15
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 123,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 96,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 7
    }, void 0), isHovering && /* @__PURE__ */ _jsxDEV("div", {
      className: styles.hoverButtons,
      children: isLinkMode && phoneNumber ? /* @__PURE__ */ _jsxDEV(Button, {
        iconLeft: "arrowRight",
        size: "small",
        onClick: handleLink,
        uppercase: false,
        children: "Link"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 140,
        columnNumber: 13
      }, void 0) : /* @__PURE__ */ _jsxDEV(Button, {
        iconLeft: "arrowRight",
        size: "small",
        onClick: handleSelect,
        uppercase: false,
        children: "Select"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 144,
        columnNumber: 13
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 138,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 86,
    columnNumber: 5
  }, void 0);
};
_s(WhatsappBobjectCard, "OpZYNjOSKZJlMaLF9Ne6pTUAFcs=", false, function() {
  return [useExtensionContext, useHover];
});
_c = WhatsappBobjectCard;
export default WhatsappBobjectCard;
var _c;
$RefreshReg$(_c, "WhatsappBobjectCard");
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
