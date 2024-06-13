import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/contactViewHeader/contactViewHeader.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/contactViewHeader/contactViewHeader.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/contactViewHeader/contactViewHeader.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { AssignUserDropdown, AssignUserModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-assignUserModal-dist-index.js.js";
import { CircularBadge, Icon, Text, Tooltip, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { InfoWarningSync } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-misc-src-index.tsx.js";
import { MessagesEvents, OPPORTUNITY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { parseCurrency } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { isOpportunity } from "/src/utils/bobjects.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/contactView/components/contactViewHeader/contactViewPageHeader.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function formatMoney(amount) {
  _s();
  const {
    useGetDataModel: useGetDataModel2
  } = useExtensionContext();
  const dataModel = useGetDataModel2();
  const {
    prefix,
    suffix
  } = dataModel?.findFieldByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT) || {};
  const parsedAmount = parseCurrency(amount);
  return {
    suffix,
    prefix,
    parsedAmount
  };
}
_s(formatMoney, "dk2MJ6HKfILtUzmCOgZJaZbbPGs=", false, function() {
  return [useExtensionContext, useGetDataModel];
});
const ContactViewHeader = (props) => {
  _s2();
  const {
    onlyHeader,
    badgeColor,
    badgeContent,
    title,
    subtitle,
    buttons,
    labels,
    icon,
    tooltip,
    assigneeUser,
    bobject,
    minimizedView,
    syncStatus,
    bobjectId
  } = props;
  const [openedModal, setOpenedModal] = useState(false);
  const {
    visible,
    setVisible,
    ref: dropdownRef
  } = useVisible();
  const {
    useGetSettings,
    useGetSidePeekEnabled
  } = useExtensionContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const userId = settings?.user?.id;
  const sidePeekEnabled = useGetSidePeekEnabled();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "common"
  });
  const assignedColor = assigneeUser?.color;
  const assignedName = assigneeUser?.name || assigneeUser?.email;
  const assignedShortName = assigneeUser?.shortname;
  const handleClose = () => {
    setOpenedModal(false);
  };
  const containerClasses = clsx(styles.container, {
    [styles.container_small]: minimizedView || onlyHeader || sidePeekEnabled,
    [styles.container_small_minimized]: minimizedView || !onlyHeader && sidePeekEnabled,
    [styles.container_small_onlyHeader]: onlyHeader,
    [styles.container_small_sidePeekEnabled]: sidePeekEnabled,
    [styles.container_small_sidePeekEnabled_minimized]: sidePeekEnabled && minimizedView
  });
  const headerClasses = clsx(styles.header_container);
  const infoClasses = clsx(styles.info__container);
  const titleClasses = clsx(styles.title, {
    [styles.title_sidePeek]: sidePeekEnabled
  });
  const minimizedClasses = clsx(styles.subtitle, {
    [styles.hidden]: minimizedView,
    [styles.bigAmount]: bobject && sidePeekEnabled && isOpportunity(bobject)
  });
  const amount = isOpportunity(bobject) ? formatMoney(subtitle) : null;
  const amountToPrint = `${amount?.prefix ? amount?.prefix : ""} ${amount?.parsedAmount ? amount?.parsedAmount : "-"} ${amount?.suffix ? amount?.suffix : ""}`;
  const refreshBobjectEventFire = () => {
    window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
      detail: {
        type: bobject?.id?.typeName
      }
    }));
  };
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: containerClasses,
      style: {
        minHeight: minimizedView || onlyHeader ? "30px" : sidePeekEnabled ? "60px" : "90px",
        transition: "all 0.25s ease-in-out"
      },
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: headerClasses,
        children: [syncStatus !== void 0 && !syncStatus && /* @__PURE__ */ _jsxDEV(InfoWarningSync, {
          type: bobjectId.typeName,
          id: bobjectId,
          size: "medium"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 140,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: `${assignedName ? `${t("assignedTo")} ${assignedName}` : t("assign")}`,
          position: "bottom",
          children: !onlyHeader && /* @__PURE__ */ _jsxDEV("span", {
            className: styles.assignee,
            children: assignedName ? /* @__PURE__ */ _jsxDEV("div", {
              onClick: () => setOpenedModal(true),
              children: /* @__PURE__ */ _jsxDEV(CircularBadge, {
                style: {
                  fontSize: "9px"
                },
                backgroundColor: assignedColor || "lightPeanut",
                size: "small",
                className: styles.assign_badge,
                children: assignedShortName || "U"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 150,
                columnNumber: 21
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 149,
              columnNumber: 19
            }, void 0) : /* @__PURE__ */ _jsxDEV(AssignUserDropdown, {
              bobject,
              accountId,
              userId,
              visible,
              setVisible,
              ref: dropdownRef,
              setOpenModal: () => setOpenedModal(true),
              onSave: refreshBobjectEventFire,
              children: /* @__PURE__ */ _jsxDEV("div", {
                className: styles.assign_icon,
                onClick: () => setVisible(!visible),
                children: /* @__PURE__ */ _jsxDEV(Icon, {
                  name: "personAdd",
                  size: 16,
                  color: "bloobirds"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 171,
                  columnNumber: 23
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 170,
                columnNumber: 21
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 160,
              columnNumber: 19
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 147,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 142,
          columnNumber: 11
        }, void 0), labels ? /* @__PURE__ */ _jsxDEV("div", {
          className: styles.labels_container,
          children: labels
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 178,
          columnNumber: 21
        }, void 0) : /* @__PURE__ */ _jsxDEV("div", {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 178,
          columnNumber: 79
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 138,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: infoClasses,
        children: [/* @__PURE__ */ _jsxDEV(Tooltip, {
          title: tooltip,
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(CircularBadge, {
            backgroundColor: badgeColor || "lightPeanut",
            className: styles.circular_badge,
            size: minimizedView ? "s" : "medium",
            children: badgeContent ? badgeContent : /* @__PURE__ */ _jsxDEV(Icon, {
              name: icon || "person",
              size: 20,
              color: "softPeanut"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 190,
              columnNumber: 17
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 182,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 181,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
          className: styles.content_container,
          children: [/* @__PURE__ */ _jsxDEV("div", {
            className: styles.title_container,
            children: [/* @__PURE__ */ _jsxDEV(Tooltip, {
              title: title || "",
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(Text, {
                size: "m",
                color: "peanut",
                weight: "bold",
                className: titleClasses,
                children: title || ""
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 197,
                columnNumber: 17
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 196,
              columnNumber: 15
            }, void 0), !minimizedView && /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              color: "softPeanut",
              className: minimizedClasses,
              children: isOpportunity(bobject) ? amountToPrint : subtitle || ""
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 202,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 195,
            columnNumber: 13
          }, void 0), !minimizedView && /* @__PURE__ */ _jsxDEV("span", {
            className: minimizedClasses,
            children: buttons
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 207,
            columnNumber: 32
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 194,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 180,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 131,
      columnNumber: 7
    }, void 0), openedModal && /* @__PURE__ */ _jsxDEV(AssignUserModal, {
      bobject,
      accountId,
      assigneeUser,
      onClose: handleClose,
      onSave: refreshBobjectEventFire
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 212,
      columnNumber: 9
    }, void 0)]
  }, void 0, true);
};
_s2(ContactViewHeader, "cCsVG1t7NV44NX+GdKtzd2mn++w=", true, function() {
  return [useVisible, useExtensionContext, useTranslation];
});
_c = ContactViewHeader;
export default ContactViewHeader;
ContactViewHeader.defaultProps = {
  version: "extended",
  onlyHeader: false,
  minimizedView: false
};
var _c;
$RefreshReg$(_c, "ContactViewHeader");
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
