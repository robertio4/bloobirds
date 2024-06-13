import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/miniCard/activityMiniCard.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/miniCard/activityMiniCard.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/miniCard/activityMiniCard.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { AssigneeComponent } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-index.tsx.js";
import { Card, CardBody, CardContent, CardHeader, CardHoverButtons, CardRight, Icon, Text, Tooltip, useHover } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { convertHtmlToString, getFieldByLogicRole, getReferencedBobject, getTextFromLogicRole, getValueFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useWizardContext, WIZARD_MODALS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-wizardModalContext-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { MiniCardActivityButtons } from "/src/content/components/contactView/components/miniCard/cardButtons/miniCardActivityButtons.tsx.js";
import { BobjectName } from "/src/content/components/contactView/components/miniCard/components/bobjectName.tsx.js";
import { ScheduledDateTime } from "/src/content/components/contactView/components/miniCard/components/cardDates.tsx.js";
import styles from "/src/content/components/contactView/components/miniCard/miniCard.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const ActivityMiniCard = ({
  activity,
  hasNextCard,
  sidePeekEnabled,
  minimized
}) => {
  _s();
  const {
    t
  } = useTranslation();
  const {
    setExtendedContext,
    useGetActiveBobject,
    refreshExtendedScreenBobject
  } = useExtensionContext();
  const {
    openWizard,
    resetWizardProperties
  } = useWizardContext();
  const activeBobject = useGetActiveBobject();
  const [ref, isHovering] = useHover();
  const activityTitle = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TITLE);
  const lead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const calendarNote = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALENDAR_NOTE);
  const scheduledDatetime = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const referenceBobject = getReferencedBobject(activity);
  const assignee = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO);
  const containerClasses = clsx(styles.container, {
    [styles.containerSidePeek]: sidePeekEnabled,
    [styles.containerMinimized]: minimized
  });
  const cardButtonsClasses = clsx(styles.cardButtons, {
    [styles.cardButtonsSidePeekMinimized]: sidePeekEnabled && minimized,
    [styles.cardButtonsSidePeek]: sidePeekEnabled,
    [styles.cardButtonsBubble]: !sidePeekEnabled
  });
  const titleClasses = clsx(styles.activityTitle, {
    [styles.activityTitleMinimized]: minimized
  });
  const openMeetingDetail = () => {
    setExtendedContext({
      type: ExtendedContextTypes.MEETING_DETAILS,
      bobject: activity
    });
  };
  const isCompanyActiveBobject = activeBobject?.id?.typeName === BobjectTypes.Company;
  const shouldShowLeadName = isCompanyActiveBobject && !!lead;
  const isSingleLine = !calendarNote && !shouldShowLeadName;
  const hasThirdLine = calendarNote && shouldShowLeadName;
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: containerClasses,
      ref,
      onClick: openMeetingDetail,
      children: [/* @__PURE__ */ _jsxDEV(Card, {
        size: "small",
        expand: true,
        children: [/* @__PURE__ */ _jsxDEV(CardHeader, {
          children: [/* @__PURE__ */ _jsxDEV(CardBody, {
            children: [/* @__PURE__ */ _jsxDEV("div", {
              className: styles.meetingIcon,
              children: /* @__PURE__ */ _jsxDEV(Icon, {
                size: sidePeekEnabled ? 20 : 18,
                name: "calendar",
                color: "tomato"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 104,
                columnNumber: 17
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 103,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: activityTitle?.length > (!sidePeekEnabled ? 70 : 22) && activityTitle,
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(Text, {
                className: titleClasses,
                size: "xs",
                ellipsis: sidePeekEnabled ? 70 : 22,
                weight: "bold",
                children: activityTitle
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 110,
                columnNumber: 17
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 106,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV("div", {
              className: styles.rightSide,
              children: /* @__PURE__ */ _jsxDEV(ScheduledDateTime, {
                isOverdue: false,
                scheduledDateTime: scheduledDatetime
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 120,
                columnNumber: 17
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 119,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 102,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            className: cardButtonsClasses,
            children: /* @__PURE__ */ _jsxDEV(CardHoverButtons, {
              size: "small",
              customBackgroundColor: "white",
              children: isHovering && /* @__PURE__ */ _jsxDEV(MiniCardActivityButtons, {
                activity,
                setOpenedModal: (b) => {
                  if (b) {
                    openWizard(WIZARD_MODALS.MEETING_RESULT, activity, {
                      onSaveCallback: refreshExtendedScreenBobject,
                      referenceBobject
                    });
                  } else {
                    resetWizardProperties(WIZARD_MODALS.MEETING_RESULT);
                  }
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 126,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 124,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 123,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 101,
          columnNumber: 11
        }, void 0), !minimized ? /* @__PURE__ */ _jsxDEV(_Fragment, {
          children: [!isSingleLine ? /* @__PURE__ */ _jsxDEV(CardContent, {
            children: [calendarNote ? /* @__PURE__ */ _jsxDEV(Text, {
              className: styles.verticalEllipsis,
              size: "xs",
              children: [/* @__PURE__ */ _jsxDEV("b", {
                children: [t("common.note"), ": "]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 149,
                columnNumber: 23
              }, void 0), convertHtmlToString(calendarNote)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 148,
              columnNumber: 21
            }, void 0) : shouldShowLeadName && /* @__PURE__ */ _jsxDEV(BobjectName, {
              bobject: lead,
              isBold: true
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 153,
              columnNumber: 43
            }, void 0), !hasThirdLine && /* @__PURE__ */ _jsxDEV(CardRight, {
              children: /* @__PURE__ */ _jsxDEV(AssigneeComponent, {
                value: assignee
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 157,
                columnNumber: 23
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 156,
              columnNumber: 21
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 146,
            columnNumber: 17
          }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false), hasThirdLine ? /* @__PURE__ */ _jsxDEV(CardContent, {
            children: [/* @__PURE__ */ _jsxDEV(BobjectName, {
              bobject: lead,
              style: {
                marginLeft: "0px"
              },
              isBold: true
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 166,
              columnNumber: 19
            }, void 0), /* @__PURE__ */ _jsxDEV(CardRight, {
              children: /* @__PURE__ */ _jsxDEV(AssigneeComponent, {
                value: assignee
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 168,
                columnNumber: 21
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 167,
              columnNumber: 19
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 165,
            columnNumber: 17
          }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false)]
        }, void 0, true) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 9
      }, void 0), hasNextCard && /* @__PURE__ */ _jsxDEV("div", {
        className: styles._dashed_line
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 179,
        columnNumber: 25
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 7
    }, void 0)
  }, void 0, false);
};
_s(ActivityMiniCard, "OE/Ei1Rc5rzDw3EWdMwhoPg4LOY=", true, function() {
  return [useTranslation, useExtensionContext, useWizardContext, useHover];
});
_c = ActivityMiniCard;
var _c;
$RefreshReg$(_c, "ActivityMiniCard");
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
