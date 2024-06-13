import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extendedScreen/pages/orderContactViewDetails/orderContactViewDetails.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extendedScreen/pages/orderContactViewDetails/orderContactViewDetails.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extendedScreen/pages/orderContactViewDetails/orderContactViewDetails.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const Fragment = __vite__cjsImport2_react["Fragment"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Icon, IconButton, Item, Select, Skeleton, SortableList, Text, useHover } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useUserHelpers } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { CustomUserHelperKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { areListsEqual } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport8_lodash_range from "/vendor/.vite-deps-lodash_range.js__v--53418726.js"; const range = __vite__cjsImport8_lodash_range.__esModule ? __vite__cjsImport8_lodash_range.default : __vite__cjsImport8_lodash_range;
import { postNewOrder, useBloobirdsFields, useOrderedFields } from "/src/hooks/useOrderedFields.ts.js";
import { useSalesforceFields } from "/src/hooks/useSalesforceFields.ts.js";
import { ContactDetailsSource, Source } from "/src/content/components/contactDetails/contactDetailSource/contactDetailSource.tsx.js";
import { NoFieldsSelectedToDisplay } from "/src/content/components/contactDetails/noFieldsSelectedToDisplay/noFieldsSelectedToDisplay.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/extendedScreen/pages/orderContactViewDetails/orderContactViewDetails.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const OrderContactViewDetails = ({
  bobject,
  extraInfo,
  mutate
}) => {
  _s();
  const [source, setSource] = useState(extraInfo?.source);
  const [fieldsToSave, setFieldsToSave] = useState([]);
  const [savedFields, setSavedFields] = useState([]);
  const {
    closeExtendedScreen
  } = useExtensionContext();
  const {
    t
  } = useTranslation();
  const {
    saveCustom,
    get
  } = useUserHelpers();
  const helperKey = CustomUserHelperKeys.HAVE_SAVED_FIELDS_CUSTOM_ORDER;
  const helperValue = get(helperKey) ? JSON.parse(get(helperKey)) : [];
  const helperValueKey = source + bobject?.id?.typeName;
  const {
    bloobirdsFields,
    bloobirdsOptions
  } = useBloobirdsFields(bobject, helperValue.includes(helperValueKey));
  const {
    salesforceFields,
    salesforceOptions
  } = useSalesforceFields(bobject, helperValue.includes(helperValueKey));
  const {
    orderedFields
  } = useOrderedFields(source, bobject?.id?.typeName);
  const sourceFields = source === Source.salesforce ? salesforceOptions : bloobirdsOptions;
  useEffect(() => {
    if (orderedFields && (orderedFields.length || helperValue.includes(helperValueKey))) {
      setFieldsToSave(source === Source.salesforce ? salesforceFields : orderedFields);
      setSavedFields(source === Source.salesforce ? salesforceFields : orderedFields);
    } else {
      setFieldsToSave(source === Source.salesforce ? salesforceFields : bloobirdsFields);
    }
  }, [orderedFields?.length, bloobirdsFields?.length, salesforceFields?.length]);
  async function acceptChanges() {
    if (!areListsEqual(savedFields, fieldsToSave)) {
      if (!helperValue.includes(helperValueKey)) {
        const toBeSaved = helperValue.concat([helperValueKey]);
        saveCustom({
          key: helperKey,
          data: JSON.stringify(toBeSaved)
        });
      }
      await postNewOrder(fieldsToSave, source, bobject?.id?.typeName);
      mutate();
    }
    closeExtendedScreen();
  }
  function handleDiscard() {
    setFieldsToSave([]);
    setSavedFields([]);
    closeExtendedScreen();
  }
  function updateCompoundSource(value) {
    extraInfo.setSource(value);
    setSource(value);
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.wrapper,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles.container,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.header,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles.header_element,
          children: /* @__PURE__ */ _jsxDEV(Text, {
            size: "s",
            color: "peanut",
            weight: "bold",
            children: t("extendedScreen.contactViewFields.selectFieldsFrom")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 109,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 108,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.header_element,
          children: /* @__PURE__ */ _jsxDEV(ContactDetailsSource, {
            source,
            setSource: updateCompoundSource,
            size: "m"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 114,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 113,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 107,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.row,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          color: "peanut",
          weight: "bold",
          children: t("extendedScreen.contactViewFields.availableFields")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 118,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 117,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.row,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "xs",
          color: "softPeanut",
          children: t("extendedScreen.contactViewFields.searchText")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 123,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 122,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(SortableFields, {
        fields: fieldsToSave,
        setFields: setFieldsToSave,
        allFields: sourceFields
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 127,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.footerContainer,
      children: [/* @__PURE__ */ _jsxDEV(Button, {
        className: styles.button,
        variant: "secondary",
        onClick: handleDiscard,
        iconLeft: "reply",
        children: t("common.discard")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 134,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
        className: styles.button,
        onClick: acceptChanges,
        iconLeft: "save",
        children: t("common.accept")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 142,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 105,
    columnNumber: 5
  }, void 0);
};
_s(OrderContactViewDetails, "7p3/ifsmmnnH4V7wEZ204vylzbY=", false, function() {
  return [useExtensionContext, useTranslation, useUserHelpers, useBloobirdsFields, useSalesforceFields, useOrderedFields];
});
_c = OrderContactViewDetails;
export function SortableFields({
  fields,
  setFields,
  allFields
}) {
  _s2();
  const {
    t
  } = useTranslation();
  const [hoverRef, isHover] = useHover();
  const [selectableFields, setSelectableFields] = useState([]);
  useEffect(() => {
    if (allFields && fields) {
      setSelectableFields(allFields.filter((f) => !fields.find((g) => g.fieldId === f.fieldId)));
    }
  }, [allFields, fields]);
  const handleReorder = (newOrder) => {
    setFields(newOrder);
  };
  const addField = (field) => {
    setFields((fields2) => [...fields2 || [], field]);
    setSelectableFields((selectFields) => selectFields.filter((selectField) => selectField !== field));
  };
  const removeField = (field) => {
    setFields((fields2) => fields2.filter((allowedField) => allowedField !== field));
    setSelectableFields((allowedFields) => [...allowedFields || [], field]);
  };
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles._search_wrapper,
      children: /* @__PURE__ */ _jsxDEV(Select, {
        placeholder: `${t("common.search")}...`,
        autocomplete: true,
        onChange: addField,
        value: "",
        size: "small",
        borderless: false,
        width: "100%",
        dropdownProps: {
          customStyles: {
            boxShadow: "none"
          }
        },
        children: selectableFields.map((field) => /* @__PURE__ */ _jsxDEV(Item, {
          label: field.name,
          value: field,
          className: styles.selectOptions,
          children: field.name
        }, field.fieldId, false, {
          fileName: _jsxFileName,
          lineNumber: 198,
          columnNumber: 13
        }, this))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 187,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 186,
      columnNumber: 7
    }, this), fields === void 0 || fields === null ? /* @__PURE__ */ _jsxDEV(ActivityFeedSkeleton, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 210,
      columnNumber: 9
    }, this) : fields?.length > 0 ? /* @__PURE__ */ _jsxDEV(SortableList, {
      data: fields,
      onReorder: handleReorder,
      className: styles._item_list,
      keyExtractor: (field) => field.fieldId,
      renderItem: ({
        item: field,
        innerRef,
        handleProps,
        containerProps
      }) => /* @__PURE__ */ _jsxDEV("div", {
        className: styles._item_card,
        ref: innerRef,
        ...containerProps,
        ...handleProps,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles._item_handler,
          children: /* @__PURE__ */ _jsxDEV(Icon, {
            name: "dragAndDrop",
            size: 20,
            color: "verySoftPeanut"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 220,
            columnNumber: 17
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 219,
          columnNumber: 15
        }, this), /* @__PURE__ */ _jsxDEV("div", {
          className: styles._item_wrapper,
          children: field.name
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 222,
          columnNumber: 15
        }, this), /* @__PURE__ */ _jsxDEV("div", {
          className: styles._item_delete,
          ref: hoverRef,
          children: /* @__PURE__ */ _jsxDEV(IconButton, {
            name: "cross",
            color: isHover ? "black" : "softPeanut",
            size: 20,
            onClick: () => removeField(field)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 224,
            columnNumber: 17
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 223,
          columnNumber: 15
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 218,
        columnNumber: 13
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 212,
      columnNumber: 9
    }, this) : /* @__PURE__ */ _jsxDEV(NoFieldsSelectedToDisplay, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 235,
      columnNumber: 9
    }, this)]
  }, void 0, true);
}
_s2(SortableFields, "oK+hpywN2zq3nQD6Dre3fHlenyA=", false, function() {
  return [useTranslation, useHover];
});
_c2 = SortableFields;
const ActivityCardSkeleton = () => /* @__PURE__ */ _jsxDEV("div", {
  className: styles.card,
  children: /* @__PURE__ */ _jsxDEV("header", {
    className: styles.cardHeader,
    children: [/* @__PURE__ */ _jsxDEV(Skeleton, {
      variant: "circle",
      width: 16,
      height: 16
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 244,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
      className: styles.cardHeaderText,
      children: /* @__PURE__ */ _jsxDEV(Skeleton, {
        variant: "text",
        width: "100%",
        height: 16
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 246,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 245,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Skeleton, {
      variant: "rect",
      width: 16,
      height: 16
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 248,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 243,
    columnNumber: 5
  }, void 0)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 242,
  columnNumber: 3
}, void 0);
_c3 = ActivityCardSkeleton;
const ActivityFeedSkeleton = () => /* @__PURE__ */ _jsxDEV(_Fragment, {
  children: range(8).map((number) => /* @__PURE__ */ _jsxDEV(Fragment, {
    children: /* @__PURE__ */ _jsxDEV(ActivityCardSkeleton, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 257,
      columnNumber: 9
    }, void 0)
  }, number, false, {
    fileName: _jsxFileName,
    lineNumber: 256,
    columnNumber: 7
  }, void 0))
}, void 0, false);
_c4 = ActivityFeedSkeleton;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "OrderContactViewDetails");
$RefreshReg$(_c2, "SortableFields");
$RefreshReg$(_c3, "ActivityCardSkeleton");
$RefreshReg$(_c4, "ActivityFeedSkeleton");
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
