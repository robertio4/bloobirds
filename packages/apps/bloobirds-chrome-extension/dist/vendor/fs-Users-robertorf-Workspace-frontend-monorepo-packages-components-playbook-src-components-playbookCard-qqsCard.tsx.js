import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookCard-qqsCard.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookCard/qqsCard.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookCard/qqsCard.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useRef = __vite__cjsImport2_react["useRef"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CheckItem, Icon, Input, Item, MultiSelect, Select, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { QQ_TYPES } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookCard-playbookCard.module.css.js";
import { getTabIcon } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookCard-playbookCard.utils.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const QQsCard = ({
  template: qq,
  tabSelected,
  onUpdateQQ,
  QQValue,
  refreshActiveBobject,
  actionsDisabled
}) => {
  _s();
  const tabIcon = tabSelected && getTabIcon(tabSelected);
  const {
    type,
    disabled,
    question,
    answers
  } = qq;
  const isGlobalPicklist = type?.toString() === QQ_TYPES.GLOBAL_PICKLIST;
  const isMultiGlobalPicklist = type?.toString() === QQ_TYPES.MULTI_GLOBAL_PICKLIST;
  const isText = type?.toString() === QQ_TYPES.TEXT;
  const {
    t
  } = useTranslation();
  const qqHasChanged = useRef(null);
  function handleChange(value) {
    const newQQData = {
      [qq.id]: value
    };
    onUpdateQQ(newQQData);
    refreshActiveBobject?.();
    qqHasChanged.current = false;
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.qq_container,
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles.qq_cardContent,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.qq_cardText,
        children: [tabIcon && /* @__PURE__ */ _jsxDEV(Icon, {
          name: tabIcon,
          color: "softPeanut",
          size: 24
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 44,
          columnNumber: 23
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          weight: "bold",
          children: question
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 45,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 43,
        columnNumber: 9
      }, void 0), isText && /* @__PURE__ */ _jsxDEV(Input, {
        onBlur: (e) => {
          handleChange(e?.target?.value);
        },
        disabled: disabled || actionsDisabled,
        defaultValue: QQValue,
        width: "100%",
        size: "small",
        borderless: false,
        placeholder: t("playbook.qualifyingQuestions.nonePlaceholder")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 11
      }, void 0), isGlobalPicklist && /* @__PURE__ */ _jsxDEV(Select, {
        placeholder: t("playbook.qualifyingQuestions.picklistSelect"),
        disabled: disabled || actionsDisabled,
        borderless: false,
        width: "100%",
        size: "small",
        defaultValue: QQValue,
        onChange: (newValue) => {
          handleChange(newValue);
        },
        autocomplete: answers.length > 6,
        children: [/* @__PURE__ */ _jsxDEV(Item, {
          value: "none",
          children: t("playbook.qualifyingQuestions.nonePlaceholder")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 75,
          columnNumber: 13
        }, void 0), answers.map((answer) => /* @__PURE__ */ _jsxDEV(Item, {
          hidden: !answer.enabled,
          value: answer.id,
          label: answer.value,
          children: answer.value
        }, answer.id, false, {
          fileName: _jsxFileName,
          lineNumber: 77,
          columnNumber: 15
        }, void 0))]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 63,
        columnNumber: 11
      }, void 0), isMultiGlobalPicklist && /* @__PURE__ */ _jsxDEV(MultiSelect, {
        autocomplete: answers.length > 6,
        size: "small",
        defaultValue: QQValue?.includes("") && QQValue?.split(""),
        onChange: () => {
          qqHasChanged.current = true;
        },
        onClose: (value) => {
          if (qqHasChanged?.current === true)
            handleChange(value);
        },
        width: "100%",
        borderless: false,
        selectAllOption: true,
        placeholder: t("playbook.qualifyingQuestions.picklistSelect"),
        disabled: disabled || actionsDisabled,
        children: [/* @__PURE__ */ _jsxDEV(CheckItem, {
          value: "",
          children: "None"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 100,
          columnNumber: 13
        }, void 0), answers.map((answer) => /* @__PURE__ */ _jsxDEV(CheckItem, {
          dataTest: answer.value,
          value: answer.id,
          label: answer.value,
          children: answer.value
        }, answer.value, false, {
          fileName: _jsxFileName,
          lineNumber: 102,
          columnNumber: 15
        }, void 0))]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 41,
    columnNumber: 5
  }, void 0);
};
_s(QQsCard, "7Fq4yRSLWbbu/fp1Bsn3fxaF800=", false, function() {
  return [useTranslation];
});
_c = QQsCard;
var _c;
$RefreshReg$(_c, "QQsCard");
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
