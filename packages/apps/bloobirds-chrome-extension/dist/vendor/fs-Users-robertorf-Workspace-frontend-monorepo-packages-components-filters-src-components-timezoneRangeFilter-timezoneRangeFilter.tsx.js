import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-components-timezoneRangeFilter-timezoneRangeFilter.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/filters/src/components/timezoneRangeFilter/timezoneRangeFilter.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/filters/src/components/timezoneRangeFilter/timezoneRangeFilter.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import __vite__cjsImport4_reactRangeSliderInput from "/vendor/.vite-deps-react-range-slider-input.js__v--111dc0b8.js"; const RangeSlider = __vite__cjsImport4_reactRangeSliderInput.__esModule ? __vite__cjsImport4_reactRangeSliderInput.default : __vite__cjsImport4_reactRangeSliderInput;
import "/vendor/react-range-slider-input-dist-style.css.js";
import { Dropdown, Select, useVisible, Text, Icon, useHover } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useDebounce } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-components-timezoneRangeFilter-styles.css.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-filters-src-components-timezoneRangeFilter-timezoneRangeFilter.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const DEFAULT_VALUE = [0, 1439];
const QuickFilters = [{
  i18key: "allDay",
  value: DEFAULT_VALUE
}, {
  i18key: "labourHours",
  value: [540, 1080]
}, {
  i18key: "mornings",
  value: [540, 720]
}, {
  i18key: "afternoons",
  value: [720, 1080]
}];
const transformNumberToDateRange = (value) => {
  return {
    start: spacetime().goto("UTC").startOf("day").add(value?.[0], "minutes").toNativeDate(),
    end: spacetime().goto("UTC").startOf("day").add(value?.[1], "minutes").toNativeDate()
  };
};
const parseValue = (value) => {
  if (!value) {
    return DEFAULT_VALUE;
  }
  return [value.start?.getMinutes() + value.start?.getHours() * 60, value.end?.getMinutes() + value.end?.getHours() * 60];
};
export const TimezoneRangeFilter = ({
  value,
  onChange
}) => {
  _s();
  const {
    ref,
    visible,
    setVisible
  } = useVisible();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "leftBar.filters.timezoneRange"
  });
  const parsedDefaultValue = parseValue(value);
  const [internalValue, setInternalValue] = useState(parsedDefaultValue);
  const debouncedInternalValue = useDebounce(internalValue, 1e3);
  const realValues = transformNumberToDateRange(internalValue);
  const toggleDropdownVisibility = () => setVisible(!visible);
  const isAllTime = internalValue?.[0] === DEFAULT_VALUE?.[0] && internalValue?.[1] === DEFAULT_VALUE?.[1];
  const parseValueToString = (value2) => {
    if (!value2) {
      return void 0;
    }
    return t("displayValue", {
      start: spacetime(value2.start)?.goto("UTC").format("{time-24}"),
      end: spacetime(value2.end)?.goto("UTC")?.format("{time-24}")
    });
  };
  useEffect(() => {
    if (!value)
      setInternalValue(DEFAULT_VALUE);
  }, [value]);
  useEffect(() => {
    onChange(realValues);
  }, [debouncedInternalValue]);
  return /* @__PURE__ */ _jsxDEV(Dropdown, {
    ref,
    width: "100%",
    visible,
    position: "bottom-start",
    arrow: false,
    anchor: /* @__PURE__ */ _jsxDEV("div", {
      className: styles.filter,
      children: /* @__PURE__ */ _jsxDEV(Select, {
        size: "small",
        variant: "filters",
        width: "348px",
        placeholder: value && !isAllTime ? parseValueToString(value) : t("placeholder"),
        onClick: toggleDropdownVisibility,
        removePlaceholder: !!value,
        dropdownProps: {
          style: {
            display: "none"
          }
        },
        adornment: /* @__PURE__ */ _jsxDEV(Icon, {
          name: "clock",
          color: "darkBloobirds",
          size: 14
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 109,
          columnNumber: 24
        }, void 0),
        children: ""
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 101,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 9
    }, void 0),
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles.contentWrapper,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles.header,
        children: /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          color: "softPeanut",
          children: /* @__PURE__ */ _jsxDEV(Trans, {
            i18nKey: "leftBar.filters.timezoneRange.title"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 119,
            columnNumber: 13
          }, void 0)
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
        className: styles.quickFiltersWrapper,
        children: QuickFilters.map((props) => /* @__PURE__ */ _jsxDEV(QuickFilterButton, {
          setValue: setInternalValue,
          selected: internalValue?.[0] === props?.value[0] && internalValue?.[1] === props?.value[1],
          ...props
        }, props.i18key, false, {
          fileName: _jsxFileName,
          lineNumber: 124,
          columnNumber: 13
        }, void 0))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 122,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(RangeSlider, {
        id: "bloobirds-range-slider",
        value: internalValue,
        onInput: setInternalValue,
        min: 0,
        max: 1440,
        step: 60
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 134,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.infoWrapper,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          weight: "bold",
          color: "darkBloobirds",
          align: "left",
          children: t("from", {
            hour: spacetime(realValues?.start).goto("UTC").format("{time-24}")
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 143,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          weight: "bold",
          color: "darkBloobirds",
          align: "right",
          children: t("to", {
            hour: spacetime(realValues?.end).goto("UTC").format("{time-24}")
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 146,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 142,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 93,
    columnNumber: 5
  }, void 0);
};
_s(TimezoneRangeFilter, "42dJzAbCGz/jqAhWK3AfIEL5JlQ=", false, function() {
  return [useVisible, useTranslation, useDebounce];
});
_c = TimezoneRangeFilter;
const QuickFilterButton = ({
  i18key,
  value,
  setValue,
  selected
}) => {
  _s2();
  const [ref, isHover] = useHover();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "leftBar.filters.timezoneRange.quickFilters"
  });
  return /* @__PURE__ */ _jsxDEV("div", {
    className: clsx(styles.quickFilter, {
      [styles.quickFilterSelected]: selected
    }),
    onClick: (e) => {
      e.stopPropagation();
      e.preventDefault();
      setValue(value);
    },
    ref,
    children: /* @__PURE__ */ _jsxDEV(Text, {
      size: "xs",
      align: "center",
      color: isHover || selected ? "white" : "darkBloobirds",
      children: t(i18key)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 182,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 173,
    columnNumber: 5
  }, void 0);
};
_s2(QuickFilterButton, "gShTqhpWCrQpvidrD8Tqc5P6wUY=", false, function() {
  return [useHover, useTranslation];
});
_c2 = QuickFilterButton;
var _c, _c2;
$RefreshReg$(_c, "TimezoneRangeFilter");
$RefreshReg$(_c2, "QuickFilterButton");
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
