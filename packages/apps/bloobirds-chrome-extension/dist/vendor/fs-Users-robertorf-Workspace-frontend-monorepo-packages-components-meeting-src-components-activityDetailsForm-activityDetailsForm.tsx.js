import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-activityDetailsForm-activityDetailsForm.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/activityDetailsForm/activityDetailsForm.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/activityDetailsForm/activityDetailsForm.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { useController, useFormContext } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { CheckItem, DateTimePicker, Input, Item, MultiSelect, Select, Text, TextArea } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveMessagingFilters, useBobjectFieldGroups, useFullSalesEnabled, useQualifyingQuestions } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { getFieldById } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useCalendar } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-hooks-useCalendar.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-meetingModal-meetingModal.module.css.js";
import { CopyText } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-copyText-copyText.tsx.js";
import { getFilteredQQsBySegmentation } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-activityDetailsForm-activityDetailsForm.utils.ts.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export function groupFields(fieldConditionsByField) {
  return fieldConditionsByField.reduce((acc, value) => {
    acc[value.field.logicRole || value.field.name] = value.fieldValues.map((field) => field.value);
    return acc;
  }, {});
}
export function getFieldsThatAreConditioned(fieldConditionsByField, modalBobjectType) {
  return fieldConditionsByField.filter(({
    field
  }) => field.bobjectType === modalBobjectType).map(({
    field
  }) => field.logicRole || field.name);
}
const DISCARDED_FIELDS = [ACTIVITY_FIELDS_LOGIC_ROLE.TIME, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE, ACTIVITY_FIELDS_LOGIC_ROLE.TITLE, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION, ACTIVITY_FIELDS_LOGIC_ROLE.CREATE_EVENT, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT];
function checkFieldConditions(field, watch) {
  if (field.fieldConditionsByField.length > 0) {
    const relatedFields = getFieldsThatAreConditioned(field.fieldConditionsByField, "Activity");
    const values = watch(relatedFields);
    const grouped = groupFields(field.fieldConditionsByField);
    const hasRelatedFields = relatedFields.length > 0;
    const checkAllConditions = Object.values(grouped).map((value) => values?.includes(value[0]));
    const satisfiesFieldCondition = checkAllConditions?.every((value) => value === true);
    if (hasRelatedFields && !satisfiesFieldCondition || !field.satisfiesFieldCrossCondition) {
      return false;
    }
  }
  return true;
}
function Field({
  field,
  ...props
}) {
  const values = field?.fieldValues();
  switch (field.type) {
    case "Text":
      return field.multiline ? /* @__PURE__ */ _jsxDEV(TextArea, {
        ...props
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 87,
        columnNumber: 32
      }, this) : /* @__PURE__ */ _jsxDEV(Input, {
        ...props
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 87,
        columnNumber: 58
      }, this);
    case "Picklist":
    case "Global Picklist":
      return /* @__PURE__ */ _jsxDEV(Select, {
        ...props,
        borderless: false,
        autocomplete: values?.length > 6,
        children: values?.map(({
          value,
          label
        }) => /* @__PURE__ */ _jsxDEV(Item, {
          value,
          label,
          children: label
        }, value, false, {
          fileName: _jsxFileName,
          lineNumber: 95,
          columnNumber: 13
        }, this))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 93,
        columnNumber: 9
      }, this);
    case "Multi global picklist":
      return /* @__PURE__ */ _jsxDEV(MultiSelect, {
        ...props,
        borderless: false,
        autocomplete: values?.length > 6,
        children: values?.map(({
          value,
          label
        }) => /* @__PURE__ */ _jsxDEV(CheckItem, {
          value,
          label,
          children: label
        }, value, false, {
          fileName: _jsxFileName,
          lineNumber: 105,
          columnNumber: 13
        }, this))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 103,
        columnNumber: 9
      }, this);
    case "Number":
      return /* @__PURE__ */ _jsxDEV(Input, {
        ...props,
        type: "number"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 112,
        columnNumber: 14
      }, this);
    case "DateTime":
    case "Date":
      return /* @__PURE__ */ _jsxDEV(DateTimePicker, {
        ...props,
        withTimePicker: field.type === "DateTime"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 115,
        columnNumber: 14
      }, this);
    default:
      return /* @__PURE__ */ _jsxDEV(Input, {
        ...props
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 117,
        columnNumber: 14
      }, this);
  }
}
_c = Field;
function MeetingField({
  field,
  isRequiredBeforeMeeting,
  textsToCopy,
  setTextsToCopy,
  section
}) {
  _s();
  const {
    watch,
    setValue,
    getValues,
    control,
    formState
  } = useFormContext();
  const {
    invitees,
    setInvitees
  } = useCalendar();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "meetingModal"
  });
  const mustBeRequired = isRequiredBeforeMeeting || field?.required;
  const isLinkedin = window.location.href.includes("linkedin") || window.location.href.includes("lightning.force");
  const {
    field: {
      value,
      onChange
    }
  } = useController({
    control,
    name: field?.logicRole || field.name,
    rules: {
      required: mustBeRequired
    }
  });
  const defaultPicklistValue = field?.defaultPicklistValue;
  const defaultValue = field?.defaultValue;
  const fieldName = field?.logicRole || field?.name;
  const company = watch("company");
  const error = formState?.errors && formState?.errors[fieldName] && t("thisFieldIsRequired");
  useEffect(() => {
    const currentValue = getValues(fieldName);
    if (!currentValue && (defaultPicklistValue || defaultValue)) {
      setValue(fieldName, defaultPicklistValue || defaultValue);
    }
  }, [defaultPicklistValue, defaultValue]);
  useEffect(() => {
    if (company && isRequiredBeforeMeeting) {
      if (!company?.fields) {
        setValue(fieldName, company?.rawBobject[fieldName]);
      } else {
        setValue(fieldName, getFieldById(company, fieldName)?.text);
      }
    }
    if (!company && isRequiredBeforeMeeting) {
      setValue(fieldName, null);
    }
  }, [company]);
  const ref = useRef();
  const errorMessage = formState?.errors && formState?.errors[fieldName];
  const firstError = formState?.errors && Object.keys(formState.errors)[0];
  useEffect(() => {
    if (errorMessage && firstError === fieldName) {
      ref?.current?.scrollIntoView({
        behaviour: "smooth",
        block: "center"
      });
    }
  }, [errorMessage]);
  const getValue = () => {
    try {
      if (field.type === "DateTime" || field.type === "Date") {
        return value ? new Date(value) : value;
      } else {
        return value || field?.defaultPicklistValue || "";
      }
    } catch {
      return value;
    }
  };
  const values = field?.fieldValues();
  const getFieldValue = (e) => {
    switch (field.type) {
      case "Picklist":
      case "Global Picklist":
        return values.filter((v) => v.value === e)[0]?.label;
      default:
        return e;
    }
  };
  const handleOnChange = (e) => {
    if (field?.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE) {
      const value2 = field?.fieldValues()?.find((v) => v?.value === e);
      if (!invitees?.find((invitee) => invitee?.email === value2?.label)) {
        setInvitees((curr) => [...curr, {
          type: "AE",
          email: value2?.label
        }]);
      }
    }
    onChange(e);
    let textToCopyTmp = textsToCopy;
    textToCopyTmp = {
      ...textToCopyTmp,
      ...{
        [section]: {
          ...textToCopyTmp[section],
          ...{
            [field.label]: getFieldValue(e)
          }
        }
      }
    };
    setTextsToCopy(textToCopyTmp);
  };
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: /* @__PURE__ */ _jsxDEV("div", {
      className: styles._input_field,
      ref,
      children: /* @__PURE__ */ _jsxDEV(Field, {
        field,
        onChange: (e) => handleOnChange(e),
        value: getValue(),
        defaultValue: value || field?.defaultPicklistValue || "",
        name: fieldName,
        size: "labeled",
        portal: false,
        width: field?.label.length > 40 ? isLinkedin ? "296px" : "304px" : "100%",
        placeholder: `${field?.label}${mustBeRequired ? " *" : ""}`,
        required: mustBeRequired,
        error
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 241,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 240,
      columnNumber: 7
    }, this)
  }, void 0, false);
}
_s(MeetingField, "KDmdXbF930zSHHt9kAgVRgTO05w=", false, function() {
  return [useFormContext, useCalendar, useTranslation, useController];
});
_c2 = MeetingField;
function ActivityDetailsForm({
  isEditionModal,
  formData,
  accountId
}) {
  _s2();
  const {
    company
  } = formData;
  const filters = useActiveMessagingFilters();
  const {
    qualifyingQuestions
  } = useQualifyingQuestions(filters);
  const requiredQQs = qualifyingQuestions?.filter((qq) => qq?.isRequiredBeforeMeeting);
  const filteredQQs = getFilteredQQsBySegmentation(requiredQQs, formData);
  const meetingFormFields = useBobjectFieldGroups({
    bobject: null,
    bobjectType: BobjectTypes.Activity,
    companyBobjectId: company?.id?.value || null,
    options: {
      type: "Meeting"
    },
    modalId: void 0,
    segmentatedQQs: filteredQQs
  });
  const isFullSalesEnabled = useFullSalesEnabled(accountId);
  const {
    watch,
    getValues
  } = useFormContext();
  const defaultFormValues = getValues();
  const [textsToCopy, setTextsToCopy] = useState({});
  const activityDetailsFilterFunction = (field, isRequiredBeforeMeeting) => {
    if (isRequiredBeforeMeeting) {
      return !isEditionModal;
    }
    return !field.deprecated && !field.readOnly && isValidAeField(field) && checkFieldConditions(field, watch) && !DISCARDED_FIELDS.includes(field.logicRole);
  };
  useEffect(() => {
    let createTextToCopyObject = {};
    meetingFormFields?.sections?.forEach((section) => {
      const isRequiredBeforeMeeting = section?.title === "Required information to close Meeting";
      let defaultValues = {};
      section?.fields?.filter((field) => activityDetailsFilterFunction(field, isRequiredBeforeMeeting)).forEach((field) => {
        const getValue = (fieldValue) => {
          return field?.fieldValues()?.filter((v) => v.value === fieldValue)[0]?.label;
        };
        if (field.defaultPicklistValue || field.defaultGlobalPicklistValue) {
          defaultValues = {
            ...defaultValues,
            ...{
              [field.label]: getValue(field.defaultPicklistValue)
            }
          };
        } else if (field.defaultValue) {
          defaultValues = {
            ...defaultValues,
            ...{
              [field.label]: field.defaultValue
            }
          };
        } else if (Object.keys(defaultFormValues).includes(field.name)) {
          defaultValues = {
            ...defaultValues,
            ...getValue(defaultFormValues[field.name]) || defaultFormValues[field.name] ? {
              [field.label]: getValue(defaultFormValues[field.name]) || defaultFormValues[field.name]
            } : void 0
          };
        }
      });
      createTextToCopyObject = {
        ...createTextToCopyObject,
        ...{
          [section.title]: defaultValues
        }
      };
    });
    setTextsToCopy(createTextToCopyObject);
  }, [meetingFormFields.sections]);
  const getClipboardText = (sectionTitle) => {
    let textForClipboard = "";
    const sectionText = textsToCopy[sectionTitle] || {};
    const textArray = Object.keys(sectionText).map((key) => `<div><span style="font-weight: bold">${key}</span>: ${sectionText[key]}</div>`);
    textArray.forEach((element) => textForClipboard = textForClipboard.concat("\n" + element));
    return textForClipboard;
  };
  const isValidAeField = (field) => {
    if (isFullSalesEnabled && field?.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE) {
      return true;
    } else if (!isFullSalesEnabled && field?.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE) {
      return false;
    }
    return true;
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._additionalFields_content,
    children: meetingFormFields?.sections?.map((section) => {
      const isRequiredBeforeMeeting = section?.title === "Required information to close Meeting";
      const sectionFields = section.fields?.filter((field) => activityDetailsFilterFunction(field, isRequiredBeforeMeeting)).map((field) => /* @__PURE__ */ _jsxDEV(MeetingField, {
        field,
        isRequiredBeforeMeeting,
        textsToCopy,
        setTextsToCopy,
        section: section.title
      }, field.name, false, {
        fileName: _jsxFileName,
        lineNumber: 397,
        columnNumber: 13
      }, this));
      return sectionFields.length > 0 ? /* @__PURE__ */ _jsxDEV("div", {
        className: styles._additionalFields_section,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles._additionalFields_content_title,
          children: /* @__PURE__ */ _jsxDEV(CopyText, {
            isLinkTypeField: false,
            textToCopy: getClipboardText(section.title),
            htmlFormat: true,
            alwaysDisplay: true,
            children: /* @__PURE__ */ _jsxDEV(Text, {
              size: "s",
              color: "softPeanut",
              children: section.title
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 415,
              columnNumber: 17
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 409,
            columnNumber: 15
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 408,
          columnNumber: 13
        }, this), /* @__PURE__ */ _jsxDEV("div", {
          className: styles._additionalFields_fields,
          children: sectionFields
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 420,
          columnNumber: 13
        }, this)]
      }, section.title, true, {
        fileName: _jsxFileName,
        lineNumber: 407,
        columnNumber: 11
      }, this) : null;
    })
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 389,
    columnNumber: 5
  }, this);
}
_s2(ActivityDetailsForm, "neCbkN6jYrXrcbeOKv5E5zKypAg=", false, function() {
  return [useActiveMessagingFilters, useQualifyingQuestions, useBobjectFieldGroups, useFullSalesEnabled, useFormContext];
});
_c3 = ActivityDetailsForm;
export default ActivityDetailsForm;
var _c, _c2, _c3;
$RefreshReg$(_c, "Field");
$RefreshReg$(_c2, "MeetingField");
$RefreshReg$(_c3, "ActivityDetailsForm");
if (import.meta.hot) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  if (!window.__vite_plugin_react_timeout) {
    window.__vite_plugin_react_timeout = setTimeout(() => {
      window.__vite_plugin_react_timeout = 0;
      RefreshRuntime.performReactRefresh();
    }, 30);
  }
}
