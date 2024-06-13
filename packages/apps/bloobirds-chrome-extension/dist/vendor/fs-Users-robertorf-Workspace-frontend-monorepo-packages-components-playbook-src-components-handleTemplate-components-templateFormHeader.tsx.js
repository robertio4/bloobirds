import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-components-templateFormHeader.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/handleTemplate/components/templateFormHeader.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/handleTemplate/components/templateFormHeader.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useContext = __vite__cjsImport2_react["useContext"]; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useFormContext } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Dropdown, Icon, Label, Text, Tooltip, useHover, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { useGetI18nSpacetime } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { TEMPLATE_TYPES, TemplateStage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getUserTimeZone } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-handleTemplate.module.css.js";
import { TemplateFormContext } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-components-templateForm.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const labelProps = {
  uppercase: false,
  overrideStyle: {
    fontSize: "12px",
    padding: "2px 4px",
    height: "20px",
    fontWeight: "var(--regular)"
  }
};
const StageLabel = ({
  stage
}) => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "playbook.templateFormHeader"
  });
  switch (stage) {
    case TemplateStage.Prospecting:
      return /* @__PURE__ */ _jsxDEV(Label, {
        color: "lightestCall",
        textColor: "extraCall",
        ...labelProps,
        children: t("prospecting")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 37,
        columnNumber: 9
      }, void 0);
    case TemplateStage.Sales:
      return /* @__PURE__ */ _jsxDEV(Label, {
        color: "lightPeanut",
        textColor: "peanut",
        ...labelProps,
        children: t("sales")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 43,
        columnNumber: 9
      }, void 0);
    case TemplateStage.All:
      return /* @__PURE__ */ _jsxDEV(Label, {
        color: "lightBloobirds",
        textColor: "bloobirds",
        ...labelProps,
        children: t("prospectingAndSales")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 9
      }, void 0);
    default:
      return /* @__PURE__ */ _jsxDEV(Label, {
        color: "lightTomato",
        textColor: "tomato",
        ...labelProps,
        children: t("noStage")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 9
      }, void 0);
  }
};
_s(StageLabel, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c = StageLabel;
export const DateInformation = ({
  data: {
    title,
    user,
    date,
    icon
  },
  t
}) => {
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.dateInformation,
    children: [/* @__PURE__ */ _jsxDEV(Icon, {
      name: icon,
      size: 18,
      color: "lightPurple"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      size: "xs",
      weight: "bold",
      children: title
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.dateContent,
      children: /* @__PURE__ */ _jsxDEV(Text, {
        size: "xs",
        weight: "medium",
        children: t("userOnDate", {
          user,
          date
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 70,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 64,
    columnNumber: 5
  }, void 0);
};
_c2 = DateInformation;
function formatDatetime(value, pattern) {
  _s2();
  const date = useGetI18nSpacetime(value, getUserTimeZone()).unixFmt(pattern);
  if (!value)
    return "Undefined date";
  return date;
}
_s2(formatDatetime, "yr6jt3F4ncIcEIdDSi/EADa916c=", false, function() {
  return [useGetI18nSpacetime];
});
export const TemplateInformation = ({
  template
}) => {
  _s3();
  const {
    users
  } = useUserSearch() || {};
  const {
    t,
    i18n
  } = useTranslation("translation", {
    keyPrefix: "playbook.templateFormHeader"
  });
  const pattern = i18n.language === "es" ? "dd MM yyyy h:mm a" : "yyyy MM dd h:mm a";
  const creationInfo = {
    title: t("createdBy"),
    user: users?.find((user) => user.id === template.createdBy)?.name,
    date: formatDatetime(template.creationDatetime, pattern),
    icon: "calendar"
  };
  const lastUpdatedInfo = {
    title: t("lastUpdatedBy"),
    user: template.updatedBy,
    date: formatDatetime(template.updateDatetime, pattern),
    icon: "refresh"
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.templateInfoEditing,
    children: [/* @__PURE__ */ _jsxDEV(DateInformation, {
      data: creationInfo,
      t
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(DateInformation, {
      data: lastUpdatedInfo,
      t
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 104,
    columnNumber: 5
  }, void 0);
};
_s3(TemplateInformation, "UOonuj7XHFyfbaPB0L/Akn1NUYQ=", false, function() {
  return [useUserSearch, useTranslation];
});
_c3 = TemplateInformation;
export const TemplateHeader = () => {
  _s4();
  const {
    watch
  } = useFormContext();
  const stage = watch("stage");
  const visible = watch("visibility");
  const official = watch("isOfficial");
  const battlecard = watch("isBattlecard");
  const [anchorRef, isHovering] = useHover();
  const {
    ref,
    visible: infoVisible,
    setVisible: setInfoVisible
  } = useVisible(false, anchorRef);
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "playbook.templateFormHeader"
  });
  useEffect(() => {
    setInfoVisible(isHovering);
  }, [isHovering]);
  const {
    template
  } = useContext(TemplateFormContext);
  const isEditing = !!template.id;
  const isSnippet = template?.type === TEMPLATE_TYPES.SNIPPET;
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.templateInfoWrapper,
    children: [/* @__PURE__ */ _jsxDEV(StageLabel, {
      stage
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.separator
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 134,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Label, {
      textColor: "purple",
      color: "verySoftPurple",
      uppercase: false,
      overrideStyle: {
        fontSize: "12px",
        padding: "2px 4px",
        height: "20px",
        fontWeight: "var(--regular)"
      },
      children: /* @__PURE__ */ _jsxDEV("div", {
        className: styles.visibilityLabel,
        children: [/* @__PURE__ */ _jsxDEV(Icon, {
          name: visible === "PUBLIC" ? "unlock" : "lock",
          color: "lightPurple",
          size: 14,
          className: styles._lock__icon
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 147,
          columnNumber: 11
        }, void 0), visible === "PUBLIC" ? t("public") : t("private")]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 146,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 135,
      columnNumber: 7
    }, void 0), official && /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: t("official"),
      position: "top",
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        name: "bookmark",
        color: "purple"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 159,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 158,
      columnNumber: 9
    }, void 0), isSnippet && battlecard && /* @__PURE__ */ _jsxDEV(Tooltip, {
      title: t("battlecard"),
      position: "top",
      children: /* @__PURE__ */ _jsxDEV(Icon, {
        name: "battlecards",
        color: "purple"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 164,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 163,
      columnNumber: 9
    }, void 0), isEditing && /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.separator
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 169,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Dropdown, {
        anchor: /* @__PURE__ */ _jsxDEV("div", {
          ref: anchorRef,
          className: styles.dropdownAnchorWrapper,
          children: /* @__PURE__ */ _jsxDEV(Icon, {
            name: "infoFilled",
            color: "darkBloobirds",
            size: 20
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 173,
            columnNumber: 17
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 172,
          columnNumber: 15
        }, void 0),
        visible: infoVisible,
        ref,
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.dropdownWrapper,
          children: /* @__PURE__ */ _jsxDEV(TemplateInformation, {
            template
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 180,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 179,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 170,
        columnNumber: 11
      }, void 0)]
    }, void 0, true)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 132,
    columnNumber: 5
  }, void 0);
};
_s4(TemplateHeader, "tdLXXbv60YBRQUJizB7skVYtCZQ=", false, function() {
  return [useFormContext, useHover, useVisible, useTranslation];
});
_c4 = TemplateHeader;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "StageLabel");
$RefreshReg$(_c2, "DateInformation");
$RefreshReg$(_c3, "TemplateInformation");
$RefreshReg$(_c4, "TemplateHeader");
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
