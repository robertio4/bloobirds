import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-components-templateList-templateList.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFeed/components/templateList/templateList.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/playbook/src/components/playbookFeed/components/templateList/templateList.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const Fragment = __vite__cjsImport2_react["Fragment"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CSSTransition } from "/vendor/.vite-deps-react-transition-group.js__v--9d3bc9ff.js";
import { Icon, Skeleton, Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { recoverScrollOfBox, removeScrollOfBox } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useVirtualizer } from "/vendor/.vite-deps-@tanstack_react-virtual.js__v--f7d73fd2.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import __vite__cjsImport9_lodash from "/vendor/.vite-deps-lodash.js__v--423b363a.js"; const range = __vite__cjsImport9_lodash["range"];
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-playbookFeed.module.css.js";
import { BlankPageTooltip } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-playbook-src-components-playbookFeed-components-blankPageTooltip-blankPageTooltip.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const ActivityCardSkeleton = () => /* @__PURE__ */ _jsxDEV("div", {
  children: [/* @__PURE__ */ _jsxDEV(Skeleton, {
    variant: "text",
    width: "50%",
    height: 24
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 18,
    columnNumber: 5
  }, void 0), /* @__PURE__ */ _jsxDEV(Skeleton, {
    variant: "text",
    width: "50%",
    height: 24
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 19,
    columnNumber: 5
  }, void 0)]
}, void 0, true, {
  fileName: _jsxFileName,
  lineNumber: 17,
  columnNumber: 3
}, void 0);
_c = ActivityCardSkeleton;
const ActivityFeedSkeleton = () => /* @__PURE__ */ _jsxDEV(_Fragment, {
  children: range(8).map((number) => /* @__PURE__ */ _jsxDEV(Fragment, {
    children: /* @__PURE__ */ _jsxDEV(ActivityCardSkeleton, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 9
    }, void 0)
  }, number, false, {
    fileName: _jsxFileName,
    lineNumber: 26,
    columnNumber: 7
  }, void 0))
}, void 0, false);
_c2 = ActivityFeedSkeleton;
const AddNewButton = ({
  handleClick
}) => {
  _s();
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.templateAddButton,
    onClick: handleClick,
    children: [/* @__PURE__ */ _jsxDEV(Icon, {
      color: "purple",
      name: "plus",
      size: 18
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
      size: "xs",
      color: "purple",
      weight: "bold",
      children: t("playbook.addNew")
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 36,
    columnNumber: 5
  }, void 0);
};
_s(AddNewButton, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c3 = AddNewButton;
export function TemplateListDisplay({
  shouldShowTooltip,
  sidePeekEnabled,
  displayedTemplates,
  handleAddTemplateClick,
  isTeamTemplates = false,
  renderTemplate,
  isSmartEmail,
  parentRef
}) {
  _s2();
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: /* @__PURE__ */ _jsxDEV(VirtualInfiniteScroll, {
      templatesInfo: displayedTemplates,
      parentRef,
      enableSelectedBackground: true,
      enabledArrowNavigation: true,
      hasNextPage: false,
      isFetchingData: false,
      contentSkeleton: () => /* @__PURE__ */ _jsxDEV("div", {
        className: styles.skeleton,
        children: /* @__PURE__ */ _jsxDEV(ActivityFeedSkeleton, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 68,
          columnNumber: 13
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 67,
        columnNumber: 11
      }, this),
      loaderSkeleton: () => /* @__PURE__ */ _jsxDEV("div", {
        className: styles.skeleton,
        children: /* @__PURE__ */ _jsxDEV(ActivityFeedSkeleton, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 73,
          columnNumber: 13
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 72,
        columnNumber: 11
      }, this),
      estimateSize: 45,
      estimatedSkeletonHeight: 130,
      children: (data, hasNext, isFirst) => {
        return /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: [isFirst && /* @__PURE__ */ _jsxDEV("div", {
            className: clsx(styles.templateSection, {
              [styles.smartTemplateSection]: isSmartEmail,
              [styles.templateSectionSidePeek]: sidePeekEnabled
            }),
            children: [/* @__PURE__ */ _jsxDEV(Icon, {
              color: "softPeanut",
              name: playbookSections[isFirst]?.icon,
              size: 20
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 89,
              columnNumber: 19
            }, this), /* @__PURE__ */ _jsxDEV(Text, {
              size: "xs",
              color: "softPeanut",
              weight: "bold",
              children: t(playbookSections[isFirst]?.titleKey)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 90,
              columnNumber: 19
            }, this), shouldShowTooltip && /* @__PURE__ */ _jsxDEV(BlankPageTooltip, {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 93,
              columnNumber: 41
            }, this), /* @__PURE__ */ _jsxDEV(AddNewButton, {
              handleClick: handleAddTemplateClick
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 94,
              columnNumber: 19
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 83,
            columnNumber: 17
          }, this), renderTemplate(data, !hasNext && !isTeamTemplates)]
        }, void 0, true);
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 7
    }, this)
  }, void 0, false);
}
_s2(TemplateListDisplay, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
_c4 = TemplateListDisplay;
const Transition = ({
  children
}) => /* @__PURE__ */ _jsxDEV(CSSTransition, {
  appear: true,
  in: true,
  unmountOnExit: true,
  timeout: 300,
  classNames: {
    appear: styles._fade_enter,
    appearActive: styles._fade_enter_active,
    enter: styles._fade_enter,
    enterActive: styles._fade_enter_active,
    exit: styles._fade_exit,
    exitActive: styles._fade_exit_active
  },
  children
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 107,
  columnNumber: 3
}, void 0);
_c5 = Transition;
const playbookSections = {
  suggestedTemplates: {
    icon: "suggestions",
    titleKey: "playbook.tabContent.suggestedTemplates"
  },
  myTemplates: {
    icon: "person",
    titleKey: "playbook.tabContent.myTemplates"
  },
  mySnippets: {
    icon: "person",
    titleKey: "playbook.tabContent.mySnippets"
  },
  teamTemplates: {
    icon: "company",
    titleKey: "playbook.tabContent.teamTemplates"
  }
};
const VirtualInfiniteScroll = ({
  hasNextPage,
  templatesInfo,
  isFetchingData,
  children,
  hasNextItem,
  parentRef,
  footer,
  contentSkeleton,
  loaderSkeleton = () => /* @__PURE__ */ _jsxDEV(Skeleton, {
    variant: "rect",
    width: "100%",
    height: "40px"
  }, "skeletonItem", false, {
    fileName: _jsxFileName,
    lineNumber: 173,
    columnNumber: 5
  }, void 0),
  estimateSize = 40,
  estimatedSkeletonHeight = 40,
  fixedHeight = false,
  rowsLength
}) => {
  _s3();
  const {
    firstOfEach,
    ...templates
  } = templatesInfo;
  const rows = templates && Object.values(templates).flat();
  rowsLength = rowsLength ?? rows?.length;
  const dataCount = hasNextPage ? rowsLength + 1 : rowsLength;
  const rowVirtualizer = useVirtualizer({
    count: dataCount,
    getScrollElement: () => parentRef?.current,
    estimateSize: () => estimateSize,
    overscan: 1
  });
  const scrollHeight = parentRef?.current?.scrollHeight;
  if (contentSkeleton && (isFetchingData && !rows || scrollHeight === void 0 || scrollHeight === 0)) {
    return /* @__PURE__ */ _jsxDEV(Transition, {
      children: contentSkeleton()
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 198,
      columnNumber: 12
    }, void 0);
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    style: {
      height: rowVirtualizer.getTotalSize() + (isFetchingData ? estimatedSkeletonHeight || 100 : 0),
      width: "100%",
      position: "relative"
    },
    onMouseEnter: removeScrollOfBox,
    onMouseLeave: recoverScrollOfBox,
    children: rowVirtualizer.getVirtualItems().map((virtualItem) => {
      const isLoaderRow = virtualItem.index > rows?.length - 1;
      const data = rows[virtualItem.index];
      const showNext = (hasNextItem && hasNextItem(virtualItem.index)) ?? !!rows[virtualItem.index + 1];
      return /* @__PURE__ */ _jsxDEV("div", {
        "data-index": virtualItem.index,
        ref: fixedHeight ? void 0 : rowVirtualizer.measureElement,
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: fixedHeight ? `${virtualItem.size}px` : void 0,
          transform: `translateY(${virtualItem.start}px)`,
          background: "transparent"
        },
        children: isLoaderRow ? hasNextPage ? /* @__PURE__ */ _jsxDEV("div", {
          style: {
            height: `${estimateSize}px`
          },
          children: /* @__PURE__ */ _jsxDEV(Transition, {
            children: loaderSkeleton()
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 236,
            columnNumber: 19
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 235,
          columnNumber: 17
        }, void 0) : footer && /* @__PURE__ */ _jsxDEV("div", {
          style: {
            height: `${estimateSize}px`
          },
          children: footer(() => rowVirtualizer.scrollToIndex(0))
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 240,
          columnNumber: 19
        }, void 0) : children(data, showNext, firstOfEach[data?.id])
      }, virtualItem.key, false, {
        fileName: _jsxFileName,
        lineNumber: 219,
        columnNumber: 11
      }, void 0);
    })
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 202,
    columnNumber: 5
  }, void 0);
};
_s3(VirtualInfiniteScroll, "z7R9+TSey3lq7SXjiU1qJLn12xk=", false, function() {
  return [useVirtualizer];
});
_c6 = VirtualInfiniteScroll;
var _c, _c2, _c3, _c4, _c5, _c6;
$RefreshReg$(_c, "ActivityCardSkeleton");
$RefreshReg$(_c2, "ActivityFeedSkeleton");
$RefreshReg$(_c3, "AddNewButton");
$RefreshReg$(_c4, "TemplateListDisplay");
$RefreshReg$(_c5, "Transition");
$RefreshReg$(_c6, "VirtualInfiniteScroll");
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
