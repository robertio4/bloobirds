import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/card/cardBody.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/card/cardBody.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/card/cardBody.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const Fragment = __vite__cjsImport2_react["Fragment"]; const useCallback = __vite__cjsImport2_react["useCallback"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { AssigneeComponent } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-index.tsx.js";
import { CardBody, Icon, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useCustomTasks, useIsB2CAccount } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, BobjectTypes, COMPANY_FIELDS_LOGIC_ROLE, FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, OPPORTUNITY_FIELDS_LOGIC_ROLE, TASK_FIELDS_LOGIC_ROLE, UserPermission } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { generateBobjectBasedData, getFieldByLogicRole, getTaskReferenceBobject, isCadenceTask } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { v4 as uuid } from "/vendor/.vite-deps-uuid.js__v--488548d2.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { checkIsOverdue } from "/src/content/components/extensionLeftBar/extensionLeftBar.utils.tsx.js";
import { TaskIconDisplay } from "/src/content/components/taskIconDisplay/taskIconDisplay.tsx.js";
import styles from "/src/content/components/card/card.module.css.js";
import { AmountComponent, CurrentLocalTime, DescriptionComponent, LinkedinComponent, NameComponent, PlainTextComponent, PriorityLabel, ScheduledDateTime } from "/src/content/components/card/fieldTypeComponent.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const CustomCardBody = ({
  bobject,
  fieldsArray,
  isBody = false
}) => {
  _s();
  const {
    t
  } = useTranslation();
  const id = uuid();
  const bobjectType = bobject?.id?.typeName;
  const {
    useGetSettings
  } = useExtensionContext();
  const settings = useGetSettings();
  const {
    customTasks
  } = useCustomTasks();
  const isB2CAccount = useIsB2CAccount();
  const userFilterAvailable = settings?.user?.accountAdmin || settings?.user?.permissions?.includes(UserPermission.EDIT_ALL);
  const referencedBobjectData = useCallback(() => generateBobjectBasedData(bobject, fieldsArray, customTasks, isB2CAccount), [bobject]);
  const subhomeItemFields = referencedBobjectData();
  const referencedBobject = getTaskReferenceBobject(bobject);
  const referencedBobjectType = referencedBobject?.id?.typeName;
  const isHighPriority = (subhomeItemFields?.bobjectType === BobjectTypes.Company || subhomeItemFields?.bobjectType === BobjectTypes.Lead) && getFieldByLogicRole(bobject, FIELDS_LOGIC_ROLE[subhomeItemFields?.bobjectType]?.HIGH_PRIORITY)?.text === "Yes";
  const isReferencedBobjectHighPriority = getFieldByLogicRole(referencedBobject, FIELDS_LOGIC_ROLE[referencedBobjectType]?.HIGH_PRIORITY)?.text === "Yes";
  const taskHasLeadWithCompany = subhomeItemFields?.fields?.filter((field) => field?.value && [TASK_FIELDS_LOGIC_ROLE.COMPANY, TASK_FIELDS_LOGIC_ROLE.LEAD].includes(field?.logicRole))?.length > 1;
  const isOverdue = checkIsOverdue(bobject);
  const isCadence = isCadenceTask(bobject);
  return /* @__PURE__ */ _jsxDEV(CardBody, {
    children: [isHighPriority && /* @__PURE__ */ _jsxDEV("div", {
      className: styles._icon__container,
      children: /* @__PURE__ */ _jsxDEV(Tooltip, {
        title: t("common.highPriority"),
        position: "top",
        children: /* @__PURE__ */ _jsxDEV(Icon, {
          name: "zap",
          size: 18,
          color: "banana"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 97,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 96,
        columnNumber: 11
      }, void 0)
    }, `${id}_HighPriorityIcon`, false, {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 9
    }, void 0), bobjectType === BobjectTypes.Task && !isBody && /* @__PURE__ */ _jsxDEV(TaskIconDisplay, {
      bobject
    }, `${id}_TaskIconDisplay`, false, {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 9
    }, void 0), subhomeItemFields?.fields.map(({
      value,
      logicRole
    }, idx) => {
      if (logicRole) {
        if (value) {
          switch (logicRole) {
            case TASK_FIELDS_LOGIC_ROLE.TITLE:
              return /* @__PURE__ */ _jsxDEV(Fragment, {
                children: [/* @__PURE__ */ _jsxDEV(NameComponent, {
                  value,
                  bobject: subhomeItemFields?.bobject,
                  isBody,
                  customTasks
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 112,
                  columnNumber: 21
                }, void 0), isReferencedBobjectHighPriority && logicRole === TASK_FIELDS_LOGIC_ROLE.TITLE && /* @__PURE__ */ _jsxDEV("div", {
                  children: /* @__PURE__ */ _jsxDEV(Icon, {
                    size: 16,
                    name: "zap",
                    color: "banana"
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 120,
                    columnNumber: 25
                  }, void 0)
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 119,
                  columnNumber: 23
                }, void 0)]
              }, `${id}${idx}${logicRole}`, true, {
                fileName: _jsxFileName,
                lineNumber: 111,
                columnNumber: 19
              }, void 0);
            case LEAD_FIELDS_LOGIC_ROLE.LINKEDIN_URL:
            case COMPANY_FIELDS_LOGIC_ROLE.LINKEDIN_URL:
              if (bobjectType !== BobjectTypes.Task)
                return /* @__PURE__ */ _jsxDEV(LinkedinComponent, {
                  value
                }, `${id}${idx}${logicRole}`, false, {
                  fileName: _jsxFileName,
                  lineNumber: 128,
                  columnNumber: 26
                }, void 0);
              break;
            case COMPANY_FIELDS_LOGIC_ROLE.NAME:
            case LEAD_FIELDS_LOGIC_ROLE.FULL_NAME:
            case OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME:
            case OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY:
            case LEAD_FIELDS_LOGIC_ROLE.COMPANY:
            case LEAD_FIELDS_LOGIC_ROLE.OPPORTUNITY:
            case TASK_FIELDS_LOGIC_ROLE.COMPANY:
            case TASK_FIELDS_LOGIC_ROLE.LEAD:
            case TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY:
              return /* @__PURE__ */ _jsxDEV(Fragment, {
                children: [logicRole.includes("__COMPANY") && taskHasLeadWithCompany && /* @__PURE__ */ _jsxDEV("div", {
                  className: styles._separator
                }, `${id}${idx}${logicRole}_div`, false, {
                  fileName: _jsxFileName,
                  lineNumber: 142,
                  columnNumber: 23
                }, void 0), /* @__PURE__ */ _jsxDEV(NameComponent, {
                  value,
                  bobject: subhomeItemFields?.bobject
                }, `${id}${idx}${logicRole}_nameComponent`, false, {
                  fileName: _jsxFileName,
                  lineNumber: 144,
                  columnNumber: 21
                }, void 0)]
              }, `${id}${idx}${logicRole}`, true, {
                fileName: _jsxFileName,
                lineNumber: 140,
                columnNumber: 19
              }, void 0);
            case COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO:
            case LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO:
            case TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO:
            case OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO:
              return isBody ? /* @__PURE__ */ _jsxDEV("div", {
                className: styles._assigned_to,
                children: /* @__PURE__ */ _jsxDEV(AssigneeComponent, {
                  value
                }, `${id}${idx}${logicRole}`, false, {
                  fileName: _jsxFileName,
                  lineNumber: 157,
                  columnNumber: 21
                }, void 0)
              }, `${id}${idx}${logicRole}`, false, {
                fileName: _jsxFileName,
                lineNumber: 156,
                columnNumber: 19
              }, void 0) : userFilterAvailable && /* @__PURE__ */ _jsxDEV(AssigneeComponent, {
                value
              }, `${id}${idx}${logicRole}`, false, {
                fileName: _jsxFileName,
                lineNumber: 164,
                columnNumber: 21
              }, void 0);
            case TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME:
              return /* @__PURE__ */ _jsxDEV("div", {
                className: styles.rightSide,
                children: /* @__PURE__ */ _jsxDEV(ScheduledDateTime, {
                  scheduledDateTime: value,
                  isOverdue,
                  isCadence
                }, `${id}${idx}${logicRole}`, false, {
                  fileName: _jsxFileName,
                  lineNumber: 173,
                  columnNumber: 21
                }, void 0)
              }, `${id}${idx}${logicRole}`, false, {
                fileName: _jsxFileName,
                lineNumber: 172,
                columnNumber: 19
              }, void 0);
            case COMPANY_FIELDS_LOGIC_ROLE.SOURCE:
            case LEAD_FIELDS_LOGIC_ROLE.SOURCE:
              return /* @__PURE__ */ _jsxDEV(Fragment, {}, `${id}${idx}${logicRole}`, false, {
                fileName: _jsxFileName,
                lineNumber: 183,
                columnNumber: 24
              }, void 0);
            case OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT:
              return /* @__PURE__ */ _jsxDEV(AmountComponent, {
                value,
                logicRole
              }, `${id}${idx}${logicRole}`, false, {
                fileName: _jsxFileName,
                lineNumber: 186,
                columnNumber: 19
              }, void 0);
            case TASK_FIELDS_LOGIC_ROLE.DESCRIPTION:
              return /* @__PURE__ */ _jsxDEV(DescriptionComponent, {
                value
              }, `${id}${idx}${logicRole}`, false, {
                fileName: _jsxFileName,
                lineNumber: 194,
                columnNumber: 19
              }, void 0);
            case TASK_FIELDS_LOGIC_ROLE.PRIORITY:
              return /* @__PURE__ */ _jsxDEV(PriorityLabel, {
                priority: value,
                showOnlyImportant: true
              }, `${id}-${idx}`, false, {
                fileName: _jsxFileName,
                lineNumber: 198,
                columnNumber: 19
              }, void 0);
            case COMPANY_FIELDS_LOGIC_ROLE.NUMBER_OF_LEADS:
              return /* @__PURE__ */ _jsxDEV(Fragment, {
                children: /* @__PURE__ */ _jsxDEV(PlainTextComponent, {
                  value,
                  logicRole,
                  isBody
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 207,
                  columnNumber: 21
                }, void 0)
              }, `${id}${idx}${logicRole}`, false, {
                fileName: _jsxFileName,
                lineNumber: 206,
                columnNumber: 19
              }, void 0);
            case COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET:
            case LEAD_FIELDS_LOGIC_ROLE.ICP:
              return /* @__PURE__ */ _jsxDEV(Fragment, {}, `${id}${idx}`, false, {
                fileName: _jsxFileName,
                lineNumber: 216,
                columnNumber: 24
              }, void 0);
            default:
              return /* @__PURE__ */ _jsxDEV("div", {
                className: styles.plainContainer,
                children: /* @__PURE__ */ _jsxDEV(PlainTextComponent, {
                  value,
                  logicRole,
                  isBody
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 220,
                  columnNumber: 21
                }, void 0)
              }, `${id}${idx}${logicRole}`, false, {
                fileName: _jsxFileName,
                lineNumber: 219,
                columnNumber: 19
              }, void 0);
          }
        } else {
          switch (logicRole) {
            default:
            case ACTIVITY_FIELDS_LOGIC_ROLE.TIME:
              return /* @__PURE__ */ _jsxDEV(Fragment, {}, `${id}${idx}${logicRole}`, false, {
                fileName: _jsxFileName,
                lineNumber: 232,
                columnNumber: 24
              }, void 0);
            case "CUSTOM_TASK_TIMEZONE":
              return /* @__PURE__ */ _jsxDEV(CurrentLocalTime, {
                task: bobject
              }, `${id}${idx}${logicRole}`, false, {
                fileName: _jsxFileName,
                lineNumber: 235,
                columnNumber: 19
              }, void 0);
          }
        }
      } else
        return /* @__PURE__ */ _jsxDEV(Fragment, {}, `${id}${idx}`, false, {
          fileName: _jsxFileName,
          lineNumber: 242,
          columnNumber: 23
        }, void 0);
    })]
  }, `${id}_CardBody`, true, {
    fileName: _jsxFileName,
    lineNumber: 93,
    columnNumber: 5
  }, void 0);
};
_s(CustomCardBody, "3YSK2ftQbm8cPqtvEJ6CpyS/CHc=", true, function() {
  return [useTranslation, useExtensionContext, useCustomTasks, useIsB2CAccount];
});
_c = CustomCardBody;
export default CustomCardBody;
var _c;
$RefreshReg$(_c, "CustomCardBody");
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
