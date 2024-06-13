import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-mainInfoForm-mainInfoForm.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/mainInfoForm/mainInfoForm.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/mainInfoForm/mainInfoForm.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useContext = __vite__cjsImport2_react["useContext"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useState = __vite__cjsImport2_react["useState"];
import { useController, useFormContext } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { AutoCompleteSearchCompanies } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-dist-index.js.js";
import { Chip, ChipGroup, DateTimePicker, Icon, Input, Item, Select, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useIsB2CAccount, useUserHelpers, usePicklist, useMeetingReportResult } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, MEETING_MAIN_TYPE_VALUES, UserHelperKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getValueFromLogicRole, removeHtmlTags } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { atom, useRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import __vite__cjsImport11_recoilPersist from "/vendor/.vite-deps-recoil-persist.js__v--a151999f.js"; const recoilPersist = __vite__cjsImport11_recoilPersist["recoilPersist"];
import { useCalendar } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-hooks-useCalendar.ts.js";
import { useGeneratePlaceHolder } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-hooks-useEventPlaceholder.ts.js";
import MeetingModalContext from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-meetingModal-context.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-meetingModal-meetingModal.module.css.js";
import { ConferencingForm } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-conferencingForm-conferencingForm.tsx.js";
import { ReminderForm } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-reminderForm-reminderForm.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const {
  persistAtom
} = recoilPersist();
const meetingTypeAtom = atom({
  key: "meetingTypeAtom",
  default: "",
  effects: [persistAtom]
});
function getEmailFromCompany(company) {
  if ("fields" in company && company?.fields) {
    const companyEmails = company ? company.fields?.filter((field) => field.value && field.type === "EMAIL") : [];
    return companyEmails?.length > 0 ? companyEmails[0] : void 0;
  } else {
    return null;
  }
}
export function MainInfoForm({
  prospectingStage,
  accountId,
  isEditionModal
}) {
  _s();
  const {
    settings,
    dataModel
  } = useContext(MeetingModalContext);
  const [meetingTypeStored, setMeetingTypeStored] = useRecoilState(meetingTypeAtom);
  const isB2CAccount = useIsB2CAccount();
  useGeneratePlaceHolder();
  const {
    setMeetingDuration,
    setInvitees,
    invitees
  } = useCalendar();
  const {
    setValue,
    control,
    formState
  } = useFormContext();
  const mainTypeField = dataModel?.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE);
  const {
    data: meetingTypes
  } = usePicklist(mainTypeField?.id);
  const types = meetingTypes?.filter((i) => i.enabled).sort((a, b) => a.ordering - b.ordering);
  const {
    has
  } = useUserHelpers();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "meetingModal.mainForm"
  });
  const {
    field: {
      ref: titleRef,
      value: title,
      onChange: titleOnChange
    }
  } = useController({
    control,
    name: "title",
    rules: {
      required: true
    },
    defaultValue: ""
  });
  const errorTitle = formState?.errors && formState?.errors["title"] && t("thisFieldIsRequired");
  const firstMeetingType = dataModel?.findValueByLogicRole(MEETING_MAIN_TYPE_VALUES.FIRST_MEETING);
  const followUpMeetingType = dataModel?.findValueByLogicRole(MEETING_MAIN_TYPE_VALUES.FOLLOW_UP);
  const {
    field: {
      value: meetingType,
      onChange: meetingTypeOnChange
    }
  } = useController({
    control,
    name: ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE,
    defaultValue: meetingTypeStored || prospectingStage ? firstMeetingType?.id : followUpMeetingType?.id,
    rules: {
      required: true
    }
  });
  const meetingTypeError = formState?.errors && formState?.errors["ACTIVITY__MEETING_MAIN_TYPE"] && t("thisFieldIsRequired");
  const {
    field: {
      value: dateTime,
      onChange: dateTimeOnChange
    }
  } = useController({
    control,
    name: "dateTime",
    defaultValue: "",
    rules: {
      required: true
    }
  });
  const errorDatetime = formState?.errors && formState?.errors["dateTime"] && t("thisFieldIsRequired");
  const {
    field: {
      ref: durationRef,
      value: duration,
      onChange: durationOnChange
    }
  } = useController({
    control,
    name: "duration",
    rules: {
      required: true
    }
  });
  const errorDuration = formState?.errors && formState?.errors["duration"] && t("thisFieldIsRequired");
  const {
    field: {
      value: meetingResult,
      onChange: meetingResultOnChange
    }
  } = useController({
    control,
    name: ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT
  });
  const {
    meetingResults
  } = useMeetingReportResult(dataModel, meetingType);
  const {
    field: {
      value: company,
      onChange: companyOnChange
    }
  } = useController({
    control,
    name: "company",
    rules: {
      required: false
    }
  });
  const {
    field: {
      value: lead
    }
  } = useController({
    control,
    name: "lead",
    rules: {
      required: false
    }
  });
  const [launchTooltip, setLaunchTooltip] = useState();
  const defaultTooltipVisible = !has(UserHelperKeys.NEW_MEETING_MODAL);
  useEffect(() => {
    setTimeout(() => {
      setLaunchTooltip(true);
    }, 2e3);
  }, []);
  useEffect(() => {
    if (!title) {
      if (company && !title) {
        if (!company?.fields) {
          setValue("title", `${company?.name || ""} <> ${settings?.account?.name}`);
        } else {
          setValue("title", `${getValueFromLogicRole(company, "COMPANY__NAME")} <> ${settings?.account?.name}`);
        }
      } else if (lead && !title) {
        if (!lead?.fields) {
          setValue("title", `${lead?.fullName || ""} <> ${settings?.account?.name}`);
        } else {
          setValue("title", `${getValueFromLogicRole(lead, "LEAD__NAME")} <> ${settings?.account?.name}`);
        }
      }
    }
  }, [company, lead]);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._main_row,
    children: [/* @__PURE__ */ _jsxDEV("div", {
      className: styles._main_info_title,
      children: /* @__PURE__ */ _jsxDEV(Text, {
        size: "m",
        children: t("meetingDetails")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 179,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 178,
      columnNumber: 7
    }, this), /* @__PURE__ */ _jsxDEV(Input, {
      width: "100%",
      placeholder: `${t("title")} *`,
      name: "title *",
      innerRef: titleRef,
      value: title || "",
      onChange: (value) => {
        titleOnChange(removeHtmlTags(value));
      },
      error: errorTitle,
      className: styles.titleInput
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 181,
      columnNumber: 7
    }, this), types && /* @__PURE__ */ _jsxDEV(_Fragment, {
      children: [/* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles._meetingType,
          children: /* @__PURE__ */ _jsxDEV(ChipGroup, {
            value: meetingType,
            onChange: (v) => {
              setMeetingTypeStored(v);
              meetingTypeOnChange(v);
            },
            children: [types?.map((type) => /* @__PURE__ */ _jsxDEV(Chip, {
              size: "small",
              value: type?.id,
              children: type?.value
            }, type?.id, false, {
              fileName: _jsxFileName,
              lineNumber: 206,
              columnNumber: 19
            }, this)), /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: t("tooltipMessage"),
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(Icon, {
                name: "infoFilled",
                size: 14
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 211,
                columnNumber: 19
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 210,
              columnNumber: 17
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 198,
            columnNumber: 15
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 197,
          columnNumber: 13
        }, this), meetingTypeError && /* @__PURE__ */ _jsxDEV(Text, {
          color: "tomato",
          size: "xs",
          children: meetingTypeError
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 216,
          columnNumber: 15
        }, this)]
      }, void 0, true), isEditionModal && /* @__PURE__ */ _jsxDEV("div", {
        className: styles._meetingResult,
        children: /* @__PURE__ */ _jsxDEV(Select, {
          width: "100%",
          size: "small",
          placeholder: t("meetingResult"),
          value: meetingResult,
          onChange: meetingResultOnChange,
          children: meetingResults?.map((result) => /* @__PURE__ */ _jsxDEV(Item, {
            value: result?.id,
            label: result?.name,
            children: result?.name
          }, result?.id, false, {
            fileName: _jsxFileName,
            lineNumber: 231,
            columnNumber: 19
          }, this))
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 223,
          columnNumber: 15
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 222,
        columnNumber: 13
      }, this)]
    }, void 0, true), !isB2CAccount && /* @__PURE__ */ _jsxDEV(AutoCompleteSearchCompanies, {
      onChange: (v) => {
        if (company) {
          const companyEmail = getEmailFromCompany(company);
          const companyName = company?.name || getValueFromLogicRole(company, "COMPANY__NAME");
          if (!invitees?.find((invitee) => invitee?.email === companyEmail?.value)) {
            setInvitees((curr) => [...curr, {
              type: "Company",
              email: companyEmail?.value,
              name: companyName
            }]);
          }
        }
        companyOnChange(v);
      },
      value: company?.name || getValueFromLogicRole(company, "COMPANY__NAME") || "",
      name: "company",
      onCompanyIdChange: void 0,
      width: "304px",
      accountId,
      size: "labeled"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 241,
      columnNumber: 9
    }, this), /* @__PURE__ */ _jsxDEV("div", {
      className: styles._date_picker,
      children: [/* @__PURE__ */ _jsxDEV(DateTimePicker, {
        width: "170px",
        size: "small",
        placeholder: `${t("date")} *`,
        value: dateTime ? new Date(dateTime) : "",
        onChange: dateTimeOnChange,
        error: errorDatetime
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 268,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(Input, {
        width: "100%",
        size: "small",
        placeholder: `${t("durationMin")} *`,
        adornment: /* @__PURE__ */ _jsxDEV(Icon, {
          size: 12,
          color: "softPeanut",
          name: "clock"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 281,
          columnNumber: 22
        }, this),
        value: duration,
        onChange: (v) => {
          const onlyNumbers = /^\d+$/;
          const numericValue = v?.replace(/\D/g, "");
          if (v === "" || !v || onlyNumbers.test(numericValue)) {
            setMeetingDuration(numericValue);
            durationOnChange(numericValue);
          }
        },
        innerRef: durationRef,
        error: errorDuration
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 277,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 267,
      columnNumber: 7
    }, this), !isEditionModal && /* @__PURE__ */ _jsxDEV("div", {
      className: styles.titleForm,
      children: [/* @__PURE__ */ _jsxDEV(ConferencingForm, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 300,
        columnNumber: 11
      }, this), /* @__PURE__ */ _jsxDEV(ReminderForm, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 301,
        columnNumber: 11
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 299,
      columnNumber: 9
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 177,
    columnNumber: 5
  }, this);
}
_s(MainInfoForm, "jJVhBwi4RUlvj0HPZhSkJxcAly4=", false, function() {
  return [useRecoilState, useIsB2CAccount, useGeneratePlaceHolder, useCalendar, useFormContext, usePicklist, useUserHelpers, useTranslation, useController, useController, useController, useController, useController, useMeetingReportResult, useController, useController];
});
_c = MainInfoForm;
var _c;
$RefreshReg$(_c, "MainInfoForm");
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
