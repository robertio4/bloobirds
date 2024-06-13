import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/pages/components/phoneDropdownContent.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/components/phoneDropdownContent.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/pages/components/phoneDropdownContent.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const Fragment = __vite__cjsImport2_react["Fragment"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Item, Section, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useAircallPhoneLinkEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const PhoneDropdownContent = ({
  bobject,
  callback,
  notShowIfEmpty = false,
  isWhatsApp = false,
  closeDropdown
}) => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.contactViewActions"
  });
  const isCompany = bobject?.id?.typeName === BobjectTypes.Company;
  const bobjectName = isCompany ? bobject?.name : bobject?.fullName;
  const hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();
  return notShowIfEmpty && bobject?.phoneNumbers?.length === 0 ? null : /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV(Section, {
      id: bobject?.name,
      icon: isCompany ? "company" : "person",
      children: bobjectName
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }, void 0), bobject?.phoneNumbers?.length === 0 ? /* @__PURE__ */ _jsxDEV(Item, {
      disabled: true,
      value: "no-phone",
      children: t("noPhoneNumbers")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 9
    }, void 0) : bobject?.phoneNumbers.map((phone) => /* @__PURE__ */ _jsxDEV(Fragment, {
      children: hasAircallPhoneLinkEnabled && !isWhatsApp ? /* @__PURE__ */ _jsxDEV("a", {
        href: `callto:${phone}`,
        onClick: closeDropdown,
        style: {
          padding: "8px 16px"
        },
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          color: "darkGray",
          weight: "bold",
          decoration: "none",
          children: phone
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 42,
          columnNumber: 17
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 15
      }, void 0) : /* @__PURE__ */ _jsxDEV(Item, {
        section: bobjectName,
        onClick: () => callback(phone),
        children: phone
      }, phone, false, {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 15
      }, void 0)
    }, phone, false, {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 11
    }, void 0))]
  }, void 0, true);
};
_s(PhoneDropdownContent, "DHHmVFvccd3Kw7ophinFMXN0flY=", false, function() {
  return [useTranslation, useAircallPhoneLinkEnabled];
});
_c = PhoneDropdownContent;
var _c;
$RefreshReg$(_c, "PhoneDropdownContent");
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
