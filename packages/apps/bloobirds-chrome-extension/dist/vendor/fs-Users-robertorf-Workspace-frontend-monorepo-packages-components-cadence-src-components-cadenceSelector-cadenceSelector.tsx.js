import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceSelector-cadenceSelector.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceSelector/cadenceSelector.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceSelector/cadenceSelector.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react; const useMemo = __vite__cjsImport2_react["useMemo"]; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Checkbox, CommandBox, Icon, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserSettings, useCadenceV2Enabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { UserPermission, UserRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport8_lodash_isArray from "/vendor/.vite-deps-lodash_isArray.js__v--c631996a.js"; const isArray = __vite__cjsImport8_lodash_isArray.__esModule ? __vite__cjsImport8_lodash_isArray.default : __vite__cjsImport8_lodash_isArray;
import { useCadences } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-hooks-useCadences.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceSelector-cadeceSelector.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function CadenceGroupHeader({
  icon,
  title,
  color = "softPeanut"
}) {
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.headerGroup,
    children: [/* @__PURE__ */ _jsxDEV(Icon, {
      name: icon,
      color,
      size: 14
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV(Text, {
      inline: true,
      color,
      size: "xs",
      children: title
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 31,
    columnNumber: 5
  }, this);
}
_c = CadenceGroupHeader;
function CadenceItem({
  cadence,
  isSelected,
  bobjectTypeName
}) {
  _s();
  const classNames = clsx(styles.cadenceItemBox, {
    [styles.cadenceItemBox_selected]: isSelected
  });
  const {
    settings
  } = useActiveUserSettings();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.cadenceSelector"
  });
  const hasCadencePermission = settings?.user?.permissions?.includes(UserPermission.VIEW_CADENCES);
  const cadenceV2Enabled = useCadenceV2Enabled(settings?.account?.id);
  const userRoles = settings?.user?.roles;
  const isAdminUser = userRoles?.includes(UserRole.GLOBAL_ADMIN) || userRoles?.includes(UserRole.ACCOUNT_ADMIN);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: classNames,
    children: [/* @__PURE__ */ _jsxDEV(Text, {
      size: "s",
      color: "peanut",
      className: styles.cadenceName,
      children: cadence.name
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: styles._callout_content,
      children: [isSelected && hasCadencePermission && isAdminUser && /* @__PURE__ */ _jsxDEV(Button, {
        variant: "clear",
        size: "small",
        iconLeft: "eye",
        color: "bloobirds",
        uppercase: false,
        className: styles.editButton,
        onClick: (event) => {
          window.open(`https://app.bloobirds.com/app/${cadenceV2Enabled ? "cadences" : "playbook/cadences"}/edit?cadence=${encodeURIComponent(cadence?.id)}&name=${encodeURIComponent(cadence.name)}&bobjectType=${encodeURIComponent(bobjectTypeName)}`, "_blank");
          event.preventDefault();
          event.stopPropagation();
        },
        children: t("view")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 67,
        columnNumber: 11
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        className: styles._callout_block,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          weight: "bold",
          size: "s",
          color: "softBloobirds",
          children: cadence?.statistics?.totalSteps
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 91,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV(Text, {
          color: "softBloobirds",
          size: "xs",
          children: t("steps")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 94,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 90,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        className: styles._callout_block,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          weight: "bold",
          size: "s",
          color: "softBloobirds",
          children: cadence?.statistics?.totalDays
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 99,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV(Text, {
          color: "softBloobirds",
          size: "xs",
          children: t("days")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 102,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 98,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        className: styles._callout_block,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          weight: "bold",
          size: "s",
          color: "softBloobirds",
          children: [Math.round(cadence?.statistics?.automatedPercentage * 100 || 0), "%"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 107,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV(Text, {
          color: "softBloobirds",
          size: "xs",
          children: t("automated")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 110,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 106,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        className: styles._callout_block,
        children: [/* @__PURE__ */ _jsxDEV(Text, {
          weight: "bold",
          size: "s",
          color: "softBloobirds",
          children: cadence?.statistics?.activeCount
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 115,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV(Text, {
          color: "softBloobirds",
          size: "xs",
          children: t("active")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 118,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 114,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 61,
    columnNumber: 5
  }, this);
}
_s(CadenceItem, "vwQejx8lPGqT0GgED12ipenpOT8=", false, function() {
  return [useActiveUserSettings, useTranslation, useCadenceV2Enabled];
});
_c2 = CadenceItem;
export const CadenceSelector = _s2(React.forwardRef(_c3 = _s2(({
  selectedBobject,
  onCadenceSelected,
  className,
  userId
}, ref) => {
  _s2();
  const {
    settings
  } = useActiveUserSettings();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "cadence.cadenceSelector"
  });
  const {
    cadences
  } = useCadences({
    bobjectTypeName: isArray(selectedBobject) ? selectedBobject : selectedBobject?.id?.typeName,
    accountId: isArray(selectedBobject) ? settings?.account?.id : selectedBobject?.id?.accountId,
    includeDeleted: true
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    onlyOfficial: false,
    onlyMine: false,
    onlyNurturing: false
  });
  const cadenceV2Enabled = useCadenceV2Enabled(settings?.account?.id);
  const hasCadencePermission = settings?.user?.permissions?.includes(UserPermission.VIEW_CADENCES);
  const {
    filteredCadences,
    myCadences,
    teamCadences,
    officialCadences
  } = useMemo(() => {
    const filtered = cadences?.filter(filterCadences);
    function filterCadences(c) {
      if (!c.enabled) {
        return false;
      }
      if (c.name.includes("(Deleted)")) {
        return false;
      }
      const matchQuery = searchQuery === "" || c.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchQuery) {
        return false;
      }
      if (filters.onlyOfficial && !c.isOfficial) {
        return false;
      }
      if (filters.onlyMine && c.ownerId !== userId) {
        return false;
      }
      return !(filters.onlyNurturing && !c.isNurturingCadence);
    }
    const sortedCadences = filtered?.reduce((sorted, cadence) => {
      if (cadence.isOfficial) {
        sorted.officialCadences = [...sorted.officialCadences, cadence];
      } else if (cadence.ownerId === userId) {
        sorted.myCadences = [...sorted.myCadences, cadence];
      } else {
        sorted.teamCadences = [...sorted.teamCadences, cadence];
      }
      return sorted;
    }, {
      myCadences: [],
      teamCadences: [],
      officialCadences: []
    });
    return {
      filteredCadences: filtered,
      ...sortedCadences
    };
  }, [cadences, searchQuery, filters]);
  function handleSearch(query) {
    setSearchQuery(query);
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    children: /* @__PURE__ */ _jsxDEV(CommandBox, {
      onSearch: handleSearch,
      ref,
      ...className ? {
        className
      } : {},
      children: [/* @__PURE__ */ _jsxDEV(CommandBox.SearchBox, {
        children: /* @__PURE__ */ _jsxDEV(CommandBox.Input, {
          className: styles.input
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 222,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 221,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.filterGroup,
        children: [/* @__PURE__ */ _jsxDEV(Checkbox, {
          size: "small",
          color: "bloobirds",
          checked: filters.onlyOfficial,
          onClick: () => setFilters((filters2) => ({
            ...filters2,
            onlyOfficial: !filters2.onlyOfficial
          })),
          children: t("showOnlyOfficial")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 225,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Checkbox, {
          size: "small",
          color: "bloobirds",
          checked: filters.onlyMine,
          onClick: () => setFilters((filters2) => ({
            ...filters2,
            onlyMine: !filters2.onlyMine
          })),
          children: t("showOnlyMine")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 235,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Checkbox, {
          size: "small",
          color: "bloobirds",
          checked: filters.onlyNurturing,
          onClick: () => setFilters((filters2) => ({
            ...filters2,
            onlyNurturing: !filters2.onlyNurturing
          })),
          children: t("showOnlyNurturing")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 243,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 224,
        columnNumber: 11
      }, void 0), filteredCadences?.length > 0 && /* @__PURE__ */ _jsxDEV(CommandBox.List, {
        className: styles.cadenceList,
        children: [officialCadences?.length > 0 && /* @__PURE__ */ _jsxDEV(CommandBox.Group, {
          header: /* @__PURE__ */ _jsxDEV(CadenceGroupHeader, {
            icon: "bookmark",
            title: t("officialCadences"),
            color: "bloobirds"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 259,
            columnNumber: 21
          }, void 0),
          children: officialCadences?.map((c) => {
            return /* @__PURE__ */ _jsxDEV(CommandBox.Item, {
              action: () => onCadenceSelected(c),
              children: /* @__PURE__ */ _jsxDEV(CadenceItem, {
                cadence: c,
                bobjectTypeName: isArray(selectedBobject) ? selectedBobject[0] : selectedBobject?.id?.typeName
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 269,
                columnNumber: 25
              }, void 0)
            }, c.id, false, {
              fileName: _jsxFileName,
              lineNumber: 268,
              columnNumber: 23
            }, void 0);
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 257,
          columnNumber: 17
        }, void 0), myCadences?.length > 0 && /* @__PURE__ */ _jsxDEV(CommandBox.Group, {
          header: /* @__PURE__ */ _jsxDEV(CadenceGroupHeader, {
            icon: "cadence",
            title: t("myCadences")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 285,
            columnNumber: 27
          }, void 0),
          children: myCadences?.map((c) => {
            return /* @__PURE__ */ _jsxDEV(CommandBox.Item, {
              action: () => onCadenceSelected(c),
              children: /* @__PURE__ */ _jsxDEV(CadenceItem, {
                cadence: c,
                bobjectTypeName: isArray(selectedBobject) ? selectedBobject[0] : selectedBobject?.id?.typeName
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 290,
                columnNumber: 25
              }, void 0)
            }, c.id, false, {
              fileName: _jsxFileName,
              lineNumber: 289,
              columnNumber: 23
            }, void 0);
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 284,
          columnNumber: 17
        }, void 0), teamCadences?.length > 0 && /* @__PURE__ */ _jsxDEV(CommandBox.Group, {
          header: /* @__PURE__ */ _jsxDEV(CadenceGroupHeader, {
            icon: "cadence",
            title: t("teamCadences")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 306,
            columnNumber: 27
          }, void 0),
          children: teamCadences?.map((c) => {
            return /* @__PURE__ */ _jsxDEV(CommandBox.Item, {
              action: () => onCadenceSelected(c),
              children: /* @__PURE__ */ _jsxDEV(CadenceItem, {
                cadence: c,
                bobjectTypeName: isArray(selectedBobject) ? selectedBobject[0] : selectedBobject?.id?.typeName
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 311,
                columnNumber: 25
              }, void 0)
            }, c.id, false, {
              fileName: _jsxFileName,
              lineNumber: 310,
              columnNumber: 23
            }, void 0);
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 305,
          columnNumber: 17
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 255,
        columnNumber: 13
      }, void 0), /* @__PURE__ */ _jsxDEV(CommandBox.Empty, {
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.emptySearch,
          children: [/* @__PURE__ */ _jsxDEV(Text, {
            align: "center",
            size: "l",
            children: t("noResults")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 329,
            columnNumber: 15
          }, void 0), hasCadencePermission && /* @__PURE__ */ _jsxDEV("div", {
            className: styles.emptySearchLink,
            onClick: () => {
              window.open(`https://app.bloobirds.com/app/${cadenceV2Enabled ? "cadences" : "playbook/cadences"}`, "_blank");
            },
            children: /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              color: "bloobirds",
              children: t("createNewCadence")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 344,
              columnNumber: 19
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 333,
            columnNumber: 17
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 328,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 327,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 216,
      columnNumber: 9
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 215,
    columnNumber: 7
  }, void 0);
}, "AoFYVa9515hRLEqwCtY/bXcuFtE=", false, function() {
  return [useActiveUserSettings, useTranslation, useCadences, useCadenceV2Enabled];
})), "AoFYVa9515hRLEqwCtY/bXcuFtE=", false, function() {
  return [useActiveUserSettings, useTranslation, useCadences, useCadenceV2Enabled];
});
_c4 = CadenceSelector;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "CadenceGroupHeader");
$RefreshReg$(_c2, "CadenceItem");
$RefreshReg$(_c3, "CadenceSelector$React.forwardRef");
$RefreshReg$(_c4, "CadenceSelector");
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
