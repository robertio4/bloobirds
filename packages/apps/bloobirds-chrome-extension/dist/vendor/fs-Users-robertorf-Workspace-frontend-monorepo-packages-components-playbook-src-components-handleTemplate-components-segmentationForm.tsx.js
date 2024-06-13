import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-components-segmentationForm.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/handleTemplate/components/segmentationForm.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/handleTemplate/components/segmentationForm.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import { useController, useFormContext } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CheckItem, Item, MultiSelect, Select, Switch, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserSettings, useIsNoStatusPlanAccount, usePlaybookSegmentation } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { TemplateStage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { useFullSalesEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-apps-bloobirds-platform-frontend-src-js-hooks-useFeatureFlags.ts.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-handleTemplate-components-segmentationForm.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const Title = ({
  title
}) => {
  return /* @__PURE__ */ _jsxDEV(Text, {
    weight: "bold",
    size: "s",
    children: title
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 18,
    columnNumber: 5
  }, void 0);
};
_c = Title;
const SubTitle = ({
  text
}) => {
  return /* @__PURE__ */ _jsxDEV(Text, {
    color: "softPeanut",
    size: "xs",
    children: text
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 26,
    columnNumber: 5
  }, void 0);
};
_c2 = SubTitle;
const SwitchRow = ({
  text,
  field,
  disabled = false
}) => {
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.row,
    children: [/* @__PURE__ */ _jsxDEV(Switch, {
      color: "purple",
      checked: field.value,
      onChange: (bool) => field.onChange(bool),
      disabled
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      size: "s",
      weight: "medium",
      children: text
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 42,
    columnNumber: 5
  }, void 0);
};
_c3 = SwitchRow;
const SegmentationFieldsByStage = ({
  segmentationFields,
  segmentationField: {
    value: selectedSegmentation,
    onChange: setSelectedSegmentation
  },
  stage,
  withTitle = false
}) => {
  _s();
  const {
    t
  } = useTranslation();
  if (!segmentationFields[stage] || segmentationFields[stage].length === 0) {
    return null;
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.sectionContent, {
      [styles.withoutTitle]: !withTitle
    }),
    children: [withTitle && /* @__PURE__ */ _jsxDEV(Text, {
      size: "xs",
      color: "softPeanut",
      children: t(`playbook.segmentationFilter.${stage.toLowerCase()}`)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 9
    }, void 0), segmentationFields[stage]?.map((segmentation) => {
      const selectedValues = selectedSegmentation[stage]?.[segmentation.id];
      const onChange = (values) => {
        setSelectedSegmentation({
          ...selectedSegmentation,
          [stage]: {
            ...selectedSegmentation[stage],
            ...values.length && {
              [segmentation.id]: values
            }
          }
        });
      };
      const renderValue = (values) => {
        if (values && values.length) {
          const selectedNames = values.map((id) => segmentation.values.find((v) => v.id === id).name);
          if (selectedNames.length === segmentation.values.length) {
            return t("common.allValuesSelected");
          } else if (selectedNames.length === 1) {
            return selectedNames[0];
          } else {
            return selectedNames.length + t("common.selected")?.toLowerCase() + ": " + selectedNames?.join(", ");
          }
        } else {
          return t("common.select") + " " + segmentation.name;
        }
      };
      return /* @__PURE__ */ _jsxDEV(MultiSelect, {
        size: "small",
        value: selectedValues ? selectedValues : [],
        width: "100%",
        placeholder: t("common.select") + " " + segmentation.name,
        renderDisplayValue: renderValue,
        onChange,
        selectAllOption: true,
        autocomplete: true,
        children: segmentation.values?.map((value) => /* @__PURE__ */ _jsxDEV(CheckItem, {
          value: value.id,
          label: value.name,
          checked: selectedValues?.includes(value.id),
          children: value.name
        }, value.id, false, {
          fileName: _jsxFileName,
          lineNumber: 122,
          columnNumber: 15
        }, void 0))
      }, segmentation.id, false, {
        fileName: _jsxFileName,
        lineNumber: 110,
        columnNumber: 11
      }, void 0);
    })]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 73,
    columnNumber: 5
  }, void 0);
};
_s(SegmentationFieldsByStage, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c4 = SegmentationFieldsByStage;
const SegmentationFields = ({
  stage,
  ...props
}) => {
  _s2();
  const stages = stage === TemplateStage.All ? [TemplateStage.Prospecting, TemplateStage.Sales] : [stage];
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: stages.map((s) => /* @__PURE__ */ _jsxDEV(SegmentationFieldsByStage, {
      stage: s,
      withTitle: stage === TemplateStage.All && !isNoStatusPlanAccount,
      ...props
    }, "SegmentationFieldsByStage" + s, false, {
      fileName: _jsxFileName,
      lineNumber: 153,
      columnNumber: 9
    }, void 0))
  }, void 0, false);
};
_s2(SegmentationFields, "Ne5Kp//PRErVk24ueYoha5h5mnE=", false, function() {
  return [useIsNoStatusPlanAccount];
});
_c5 = SegmentationFields;
export const SegmentationForm = ({
  canBeBattlecard
}) => {
  _s3();
  const {
    control
  } = useFormContext();
  const isFullSalesEnabled = useFullSalesEnabled();
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const {
    field: {
      ref: stageRef,
      ...stageField
    }
  } = useController({
    control,
    name: "stage",
    defaultValue: isNoStatusPlanAccount ? TemplateStage.All : isFullSalesEnabled ? TemplateStage.Sales : TemplateStage.Prospecting
  });
  const {
    segmentationFields
  } = usePlaybookSegmentation(stageField.value);
  const {
    settings
  } = useActiveUserSettings();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "playbook.segmentationFilter"
  });
  const isAdmin = settings?.user?.accountAdmin;
  const {
    field: visibleField
  } = useController({
    control,
    name: "visibility"
  });
  const {
    field: officialField
  } = useController({
    control,
    name: "isOfficial"
  });
  const {
    field: battlecardField
  } = useController({
    control,
    name: "isBattlecard"
  });
  const {
    field: segmentationField
  } = useController({
    control,
    name: "segmentationValues"
  });
  const visibleFieldFunctions = {
    value: visibleField.value === "PUBLIC",
    onChange: (b) => visibleField.onChange(b ? "PUBLIC" : "PRIVATE")
  };
  const renderStage = (stage) => {
    switch (stage) {
      case TemplateStage.All:
        return t("prospectAndSalesStages");
      case TemplateStage.Prospecting:
        return t("prospectStage");
      case TemplateStage.Sales:
        return t("salesStage");
    }
  };
  const showSegmentation = segmentationFields && (stageField.value === TemplateStage.All && (segmentationFields[TemplateStage.Prospecting]?.length > 0 || segmentationFields[TemplateStage.Sales]?.length > 0) || stageField.value !== TemplateStage.All && segmentationFields[stageField.value]?.length > 0);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.container,
    children: [(!isNoStatusPlanAccount || !isFullSalesEnabled) && /* @__PURE__ */ _jsxDEV("div", {
      className: styles.section,
      children: [/* @__PURE__ */ _jsxDEV(Title, {
        title: t("stage")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 218,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(Select, {
        size: "small",
        placeholder: t("stage"),
        ...stageField,
        width: "100%",
        borderless: false,
        renderDisplayValue: renderStage,
        children: [/* @__PURE__ */ _jsxDEV(Item, {
          value: TemplateStage.All,
          children: t("all")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 227,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
          value: TemplateStage.Prospecting,
          children: t("prospectStage")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 228,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Item, {
          value: TemplateStage.Sales,
          children: t("salesStage")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 229,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 219,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 217,
      columnNumber: 9
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.section,
      children: [/* @__PURE__ */ _jsxDEV(Title, {
        title: t("options")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 234,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(SubTitle, {
        text: t("canChooseMoreThanOne")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 235,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.sectionContent,
        children: [/* @__PURE__ */ _jsxDEV(SwitchRow, {
          text: t("visibleToAllMembers"),
          field: visibleFieldFunctions
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 237,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(SwitchRow, {
          text: t("officialPlaybook"),
          field: officialField,
          disabled: !isAdmin
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 238,
          columnNumber: 11
        }, void 0), canBeBattlecard && /* @__PURE__ */ _jsxDEV(SwitchRow, {
          text: t("playbookBattlecard"),
          field: battlecardField
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 239,
          columnNumber: 31
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 236,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 233,
      columnNumber: 7
    }, void 0), showSegmentation && /* @__PURE__ */ _jsxDEV("div", {
      className: styles.section,
      children: [/* @__PURE__ */ _jsxDEV(Title, {
        title: t("categorization")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 244,
        columnNumber: 11
      }, void 0), stageField.value !== TemplateStage.All && /* @__PURE__ */ _jsxDEV(SubTitle, {
        text: t("categorizationText")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 245,
        columnNumber: 54
      }, void 0), segmentationFields && /* @__PURE__ */ _jsxDEV(SegmentationFields, {
        segmentationFields,
        segmentationField,
        stage: stageField.value
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 247,
        columnNumber: 13
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 243,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 215,
    columnNumber: 5
  }, void 0);
};
_s3(SegmentationForm, "5Mv6t+b72XDAPtzFl2cW+UDqrtk=", false, function() {
  return [useFormContext, useFullSalesEnabled, useIsNoStatusPlanAccount, useController, usePlaybookSegmentation, useActiveUserSettings, useTranslation, useController, useController, useController, useController];
});
_c6 = SegmentationForm;
var _c, _c2, _c3, _c4, _c5, _c6;
$RefreshReg$(_c, "Title");
$RefreshReg$(_c2, "SubTitle");
$RefreshReg$(_c3, "SwitchRow");
$RefreshReg$(_c4, "SegmentationFieldsByStage");
$RefreshReg$(_c5, "SegmentationFields");
$RefreshReg$(_c6, "SegmentationForm");
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
