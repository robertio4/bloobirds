import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-meetingModal-meetingModal.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/meetingModal/meetingModal.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/meetingModal/meetingModal.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useContext = __vite__cjsImport2_react["useContext"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { FormProvider, useController, useForm } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useConfirmDeleteModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-dist-index.js.js";
import { Button, Checkbox, Icon, IconButton, Modal, ModalFooter, Spinner, Text, Tooltip, useToasts, Select, Item } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useMediaQuery, useMinimizableModal, useUserSearch, useIsOTOAccount, useFullSalesEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { useGetI18nSpacetime } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { ChangeTimezoneModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-miscModals-dist-index.js.js";
import { deserialize, serialize, useRichTextEditorPlugins } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, ACTIVITY_TYPES_VALUES_LOGIC_ROLE, COMPANY_FIELDS_LOGIC_ROLE, COMPANY_STAGE_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, LEAD_STAGE_LOGIC_ROLE, MIXPANEL_EVENTS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, getUserTimeZone, getValueFromLogicRole, recoverScrollOfBox, removeScrollOfBox } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport13_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport13_mixpanelBrowser.__esModule ? __vite__cjsImport13_mixpanelBrowser.default : __vite__cjsImport13_mixpanelBrowser;
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import ActivityDetailsForm from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-activityDetailsForm-activityDetailsForm.tsx.js";
import { BloobirdsCalendarsSelector } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-bloobirdsCalendarsSelector-bloobirdsCalendarsSelector.tsx.js";
import { Calendar, InviteeCard } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-calendar-calendar.tsx.js";
import { CalendarsSelector } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-calendarsSelector-calendarsSelector.tsx.js";
import { MainInfoForm } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-mainInfoForm-mainInfoForm.tsx.js";
import { NotesForm } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-notesForm-notesForm.tsx.js";
import { SearchLeadsGuests } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-searchLeadsGuests-searchLeadsGuests.tsx.js";
import { RemindeBeforeType, useCalendar } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-hooks-useCalendar.ts.js";
import MeetingModalContext from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-meetingModal-context.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-meetingModal-meetingModal.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function stringifyArrays(obj) {
  const transformedObj = {};
  if (!transformedObj) {
    return null;
  }
  if (Object.keys(obj)?.length === 0) {
    return {};
  }
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      transformedObj[key] = JSON.stringify(obj[key]);
    } else {
      transformedObj[key] = obj[key];
    }
  }
  return transformedObj;
}
function getEmailFromCompany(company) {
  if ("fields" in company && company?.fields) {
    const companyEmails = company ? company.fields?.filter((field) => field.value && field.type === "EMAIL") : [];
    return companyEmails?.length > 0 ? companyEmails[0] : void 0;
  } else {
    return null;
  }
}
function ModalChild() {
  _s();
  const {
    id,
    accountId,
    settings,
    userId,
    connections,
    mutateConnections,
    dataModel
  } = useContext(MeetingModalContext);
  const {
    closeModal,
    minimize,
    data: formData,
    bobject,
    onSave,
    onClose
  } = useMinimizableModal(id);
  const isEditionModal = !!bobject;
  const [changeTimezoneModalVisible, setChangeTimezoneModalVisible] = useState(false);
  const plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true
  });
  const ref = useRef();
  const users = useUserSearch();
  const {
    isDesktop,
    isSmallDesktop,
    isMediumDesktop
  } = useMediaQuery();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "meetingModal"
  });
  const {
    setEventTypesSelected,
    eventsTypeSelected,
    invitees,
    setInvitees,
    setDate,
    date,
    resetDate,
    calendarsAvailable,
    mutateCalendars,
    selectedTimezone,
    setSelectedTimezone,
    eventsPerDay,
    skipCalendarCreation,
    loading,
    setSkipCalendarCreation,
    resetInvitees,
    setBannedEvent,
    meetingDuration
  } = useCalendar();
  const parsedFormData = {
    title: formData && formData[ACTIVITY_FIELDS_LOGIC_ROLE.TITLE] ? formData[ACTIVITY_FIELDS_LOGIC_ROLE.TITLE] : null,
    dateTime: formData && formData[ACTIVITY_FIELDS_LOGIC_ROLE.TIME] ? new Date(formData[ACTIVITY_FIELDS_LOGIC_ROLE.TIME]) : null,
    duration: formData && formData[ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION] ? formData[ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION] : meetingDuration || 60,
    calendarNotes: formData && formData[ACTIVITY_FIELDS_LOGIC_ROLE.CALENDAR_NOTE] ? deserialize(formData[ACTIVITY_FIELDS_LOGIC_ROLE.CALENDAR_NOTE], {
      format: "HTML",
      plugins
    }) : null,
    internalNotes: formData && formData[ACTIVITY_FIELDS_LOGIC_ROLE.NOTE] ? deserialize(formData[ACTIVITY_FIELDS_LOGIC_ROLE.NOTE], {
      format: "HTML",
      plugins
    }) : null,
    ...formData,
    company: formData?.company?.data || formData?.company,
    lead: formData?.lead?.data || formData?.lead,
    opportunity: formData?.opportunity?.data || formData?.opportunity
  };
  const activityTypes = dataModel?.findValuesByFieldLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.TYPE);
  const methods = useForm({
    defaultValues: {
      ...parsedFormData
    }
  });
  const {
    watch,
    control,
    getValues,
    formState,
    handleSubmit
  } = methods;
  useController({
    control,
    name: ACTIVITY_FIELDS_LOGIC_ROLE.USER,
    defaultValue: userId
  });
  useController({
    control,
    name: ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
    defaultValue: activityTypes?.find((activityType) => activityType?.logicRole === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING)?.id
  });
  const openCalendarPopupAfterMeeting = settings?.settings?.openCalendarPopupAfterMeeting;
  const calendarEventDecision = settings?.settings?.calendarEventDecision;
  const createAlwaysOnLinkedCalendar = calendarEventDecision === "IMPERATIVE" && openCalendarPopupAfterMeeting;
  const createInCalendarCheckboxDisabled = calendarEventDecision === "IMPERATIVE" || !openCalendarPopupAfterMeeting;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    isValid,
    submitCount
  } = formState;
  const canSave = submitCount === 0 || isValid;
  const {
    createToast
  } = useToasts();
  const lead = watch("lead");
  const company = watch("company");
  useEffect(() => {
    if (formData[ACTIVITY_FIELDS_LOGIC_ROLE.UNIQUE_NYLAS_ID]) {
      setBannedEvent(formData[ACTIVITY_FIELDS_LOGIC_ROLE.UNIQUE_NYLAS_ID]);
    }
    if (createAlwaysOnLinkedCalendar)
      setSkipCalendarCreation(false);
  }, []);
  const user = watch(ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const activityUser = users?.users?.find((u) => user === u?.id);
  function handleClose() {
    resetInvitees();
    resetDate();
    closeModal();
  }
  const inviteesNotSynced = isEditionModal && !getValueFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_INVITEES);
  useEffect(() => {
    if (formData[ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_INVITEES]) {
      setInvitees(JSON.parse(formData[ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_INVITEES]));
    } else {
      const newInvitees = [];
      if (!!settings && !!connections) {
        const defaultConnection = connections.defaultConnection || connections.list[0]?.email;
        newInvitees.push({
          type: "Organizer",
          email: activityUser ? activityUser?.email : defaultConnection,
          name: activityUser ? activityUser?.name : `${settings?.user?.name} (${t("bloobirdsCalendarSelector.you")})`
        });
      }
      if (lead) {
        const leadEmail = lead?.email || getValueFromLogicRole(lead, "LEAD__EMAIL");
        const leadName = lead?.fullName || getValueFromLogicRole(lead, "LEAD__NAME");
        if (leadEmail) {
          newInvitees.push({
            type: "Lead",
            email: leadEmail,
            name: leadName
          });
        }
      }
      if (company) {
        const companyEmail = getEmailFromCompany(company);
        const companyName = company?.name || getValueFromLogicRole(company, "COMPANY__NAME");
        if (companyEmail) {
          newInvitees.push({
            type: "Company",
            email: companyEmail.value,
            name: companyName
          });
        }
      }
      if (invitees?.length === 0) {
        setInvitees(newInvitees);
      }
    }
  }, []);
  const removeInvitee = (email) => {
    setInvitees((currInvitees) => currInvitees?.filter((invitee) => invitee?.email !== email));
  };
  const onSubmit = (values) => {
    setIsSubmitting(true);
    const {
      company: company2,
      lead: lead2,
      opportunity,
      duration,
      dateTime,
      title,
      calendarNotes,
      internalNotes,
      reminderTemplate,
      reminderBefore,
      reminderBeforeType,
      conferencingGoogleMeet,
      ...rest
    } = values;
    const serializeNoteText = serialize(calendarNotes, {
      format: "AST",
      plugins
    });
    const serializeInternalNoteText = serialize(internalNotes, {
      format: "AST",
      plugins
    });
    if (isEditionModal) {
      api.patch(`/bobjects/${bobject?.id?.value}/raw`, {
        ...stringifyArrays(rest),
        [ACTIVITY_FIELDS_LOGIC_ROLE.TIME]: dateTime,
        [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION]: duration,
        [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: company2?.id?.value,
        [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: lead2?.id?.value,
        [ACTIVITY_FIELDS_LOGIC_ROLE.TITLE]: title,
        [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_INVITEES]: JSON.stringify(invitees),
        [ACTIVITY_FIELDS_LOGIC_ROLE.CALENDAR_NOTE]: serializeNoteText,
        [ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]: serializeInternalNoteText
      }).then(() => {
        createToast({
          type: "success",
          message: t("toasts.updateSuccess")
        });
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_UPDATE_FROM_CALENDAR_MODAL);
        handleClose();
        setIsSubmitting(false);
        onSave?.();
      }).catch(() => {
        createToast({
          type: "error",
          message: t("toasts.somethingHappenedWhileUpdating")
        });
        setIsSubmitting(false);
        onSave?.();
      });
    } else {
      const reminderBeforeMuliplicator = reminderBeforeType === RemindeBeforeType.days ? 1440 : reminderBeforeType === RemindeBeforeType.hours ? 60 : 1;
      const data = {
        title,
        meetingDateTime: dateTime,
        meetingDuration: duration,
        company: company2?.id?.value,
        lead: lead2?.id?.value,
        opportunity: formData?.opportunity?.data?.id?.value || formData?.opportunity?.id?.value || opportunity?.id?.value,
        calendarId: calendarsAvailable?.data?.find((c) => c.primary)?.id,
        accountId: calendarsAvailable?.data?.find((c) => c.primary)?.accountId,
        invitees: invitees.map((i) => i.email),
        inviteesDetails: invitees,
        otherFields: stringifyArrays(rest),
        reminderTemplateId: reminderTemplate,
        conferencingGoogleMeet,
        reminderTimeInMinutes: reminderBefore * reminderBeforeMuliplicator,
        skipCalendarEventCreation: connections?.list?.length === 0 || !calendarsAvailable || skipCalendarCreation || !openCalendarPopupAfterMeeting,
        calendarNotes: serializeNoteText,
        internalNotes: serializeInternalNoteText
      };
      api.post("/messaging/calendar/event", data).then(() => {
        createToast({
          type: "success",
          message: t("toasts.success")
        });
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CREATE_FROM_CALENDAR_MODAL);
        handleClose();
        setIsSubmitting(false);
        onSave?.();
      }).catch(() => {
        createToast({
          type: "error",
          message: t("toasts.somethingHappenedWhileCreating")
        });
        setIsSubmitting(false);
        onSave?.();
      });
    }
  };
  const isoDate = spacetime(date).format("iso-short");
  const modalWidth = isDesktop ? 1400 : isMediumDesktop ? 1100 : isSmallDesktop ? 1e3 : 700;
  const leadProspectingStageId = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.STAGE)?.values.find((stage) => stage.name === "Prospecting")?.id;
  const isLeadProspectingStage = !formData?.lead?.stage || formData?.lead?.stage === LEAD_STAGE_LOGIC_ROLE.PROSPECT || formData?.lead.stage === leadProspectingStageId;
  const companyProspectingStageId = dataModel?.findFieldByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.STAGE)?.values.find((stage) => stage.name === "Prospecting")?.id;
  const isProspectingStage = isLeadProspectingStage || !formData?.company?.stage || formData?.company?.stage === COMPANY_STAGE_LOGIC_ROLE.PROSPECT || formData?.company?.stage === companyProspectingStageId;
  const {
    openDeleteModal
  } = useConfirmDeleteModal();
  const handleDelete = () => {
    openDeleteModal(bobject, false, () => {
    }, () => {
      createToast({
        message: t("toasts.deleteSuccess"),
        type: "success"
      });
      handleClose();
      onSave?.();
      onClose?.();
    });
  };
  useEffect(() => {
    removeScrollOfBox();
    return recoverScrollOfBox;
  }, []);
  const {
    field: notesField
  } = useController({
    control,
    name: "calendarNotes"
  });
  const {
    field: internalNotesField
  } = useController({
    control,
    name: "internalNotes"
  });
  const activityAccountExecutiveField = dataModel?.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE);
  const accountExecutivePicklistValues = activityAccountExecutiveField?.values;
  const activityAssignedToField = dataModel?.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO);
  const activityAssignedToValues = activityAssignedToField?.values;
  const isOTOAccount = useIsOTOAccount();
  const isFullSalesEnabled = useFullSalesEnabled(accountId);
  const {
    field: {
      value: assignedToValue,
      onChange: activityAssignedToOnChange
    }
  } = useController({
    control,
    name: ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO,
    defaultValue: "",
    rules: {
      required: activityAssignedToField?.required && isFullSalesEnabled
    }
  });
  const errorAssignedTo = formState?.errors && formState?.errors[ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO] && t("thisFieldIsRequired");
  const {
    field: {
      value: accountExecutive,
      onChange: accountExecutiveOnChange
    }
  } = useController({
    control,
    name: ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE,
    rules: {
      required: activityAccountExecutiveField?.required && !isFullSalesEnabled
    }
  });
  const errorAe = formState?.errors && formState?.errors[ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE] && t("thisFieldIsRequired");
  return /* @__PURE__ */ _jsxDEV(Modal, {
    open: true,
    onClose: handleClose,
    width: modalWidth,
    className: styles.modal__container,
    children: /* @__PURE__ */ _jsxDEV(FormProvider, {
      ...methods,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles._header__container,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles._header__date_picker,
          children: [/* @__PURE__ */ _jsxDEV(Text, {
            size: "l",
            weight: "regular",
            children: useGetI18nSpacetime(date, getUserTimeZone()).format("{month} {year}")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 485,
            columnNumber: 13
          }, this), /* @__PURE__ */ _jsxDEV(IconButton, {
            name: "chevronLeft",
            onClick: () => setDate((date2) => spacetime(date2).subtract(1, "week").toNativeDate()),
            size: 16
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 488,
            columnNumber: 13
          }, this), /* @__PURE__ */ _jsxDEV(IconButton, {
            name: "chevronRight",
            onClick: () => setDate((date2) => spacetime(date2).add(1, "week").toNativeDate()),
            size: 16
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 493,
            columnNumber: 13
          }, this), /* @__PURE__ */ _jsxDEV(Button, {
            variant: "secondary",
            size: "small",
            onClick: () => setDate(new Date()),
            children: t("today")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 498,
            columnNumber: 13
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 484,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV("div", {
          className: styles._header__spacer
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 502,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV("div", {
          className: styles._header_right_actions,
          children: [loading && /* @__PURE__ */ _jsxDEV(Spinner, {
            name: "loadingCircle",
            size: 16
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 504,
            columnNumber: 25
          }, this), /* @__PURE__ */ _jsxDEV(Text, {
            size: "xs",
            color: "softPeanut",
            children: [t("timezone"), ": ", selectedTimezone, " ", /* @__PURE__ */ _jsxDEV("span", {
              className: styles._timezone_selector,
              onClick: () => setChangeTimezoneModalVisible(true),
              children: t("change")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 507,
              columnNumber: 15
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 505,
            columnNumber: 13
          }, this), changeTimezoneModalVisible && /* @__PURE__ */ _jsxDEV(ChangeTimezoneModal, {
            onChange: (value) => {
              setSelectedTimezone(value);
              setChangeTimezoneModalVisible(false);
            },
            onClose: () => setChangeTimezoneModalVisible(false),
            defaultTimezone: selectedTimezone
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 515,
            columnNumber: 15
          }, this), /* @__PURE__ */ _jsxDEV("div", {
            className: styles._event_type_selector,
            children: [/* @__PURE__ */ _jsxDEV("div", {
              className: styles._event_type,
              style: {
                backgroundColor: eventsTypeSelected === "bloobirds" ? "var(--bloobirds)" : "var(--white)",
                borderTopLeftRadius: "4px",
                borderBottomLeftRadius: "4px"
              },
              onClick: () => setEventTypesSelected("bloobirds"),
              children: /* @__PURE__ */ _jsxDEV(Text, {
                size: "xs",
                color: eventsTypeSelected === "bloobirds" ? "white" : "bloobirds",
                children: "Bloobirds"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 535,
                columnNumber: 17
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 525,
              columnNumber: 15
            }, this), /* @__PURE__ */ _jsxDEV("div", {
              className: styles._event_type,
              style: {
                backgroundColor: eventsTypeSelected === "nylas" ? "var(--bloobirds)" : "var(--white)",
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px"
              },
              onClick: () => setEventTypesSelected("nylas"),
              children: [/* @__PURE__ */ _jsxDEV(Icon, {
                name: "calendar",
                size: 12,
                color: eventsTypeSelected === "nylas" ? "white" : "bloobirds"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 549,
                columnNumber: 17
              }, this), /* @__PURE__ */ _jsxDEV(Text, {
                size: "xs",
                color: eventsTypeSelected === "nylas" ? "white" : "bloobirds",
                children: t("calendarName")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 554,
                columnNumber: 17
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 539,
              columnNumber: 15
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 524,
            columnNumber: 13
          }, this), /* @__PURE__ */ _jsxDEV("div", {
            className: styles._calendar_select,
            children: eventsTypeSelected === "nylas" ? /* @__PURE__ */ _jsxDEV(CalendarsSelector, {
              connections,
              disabled: eventsTypeSelected === "nylas" && connections?.list?.length === 0
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 561,
              columnNumber: 17
            }, this) : /* @__PURE__ */ _jsxDEV(BloobirdsCalendarsSelector, {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 566,
              columnNumber: 17
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 559,
            columnNumber: 13
          }, this), /* @__PURE__ */ _jsxDEV(IconButton, {
            name: "minus",
            size: 24,
            onClick: () => minimize({
              data: getValues(),
              title: getValues()?.title || t("untitledEvent"),
              bobject
            })
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 569,
            columnNumber: 13
          }, this), /* @__PURE__ */ _jsxDEV(IconButton, {
            name: "cross",
            size: 24,
            onClick: handleClose
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 581,
            columnNumber: 13
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 503,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 483,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        className: styles._body,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          className: styles._form_column,
          ref,
          children: [/* @__PURE__ */ _jsxDEV(MainInfoForm, {
            prospectingStage: isProspectingStage,
            accountId,
            isEditionModal
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 586,
            columnNumber: 13
          }, this), /* @__PURE__ */ _jsxDEV("div", {
            className: styles._row_header,
            children: /* @__PURE__ */ _jsxDEV(Text, {
              size: "m",
              children: t("guests")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 593,
              columnNumber: 15
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 592,
            columnNumber: 13
          }, this), /* @__PURE__ */ _jsxDEV("div", {
            children: !isOTOAccount && (isFullSalesEnabled ? /* @__PURE__ */ _jsxDEV(Select, {
              value: assignedToValue,
              placeholder: `${activityAssignedToField?.name || t("meetingAssignedTo")} ${activityAssignedToField?.required ? "*" : ""}`,
              width: "100%",
              size: "labeled",
              portal: false,
              borderless: false,
              onChange: (v) => {
                activityAssignedToOnChange(v);
              },
              error: errorAssignedTo,
              autocomplete: activityAssignedToValues?.filter((ae) => ae?.isEnabled)?.length > 7,
              children: activityAssignedToValues?.filter((ae) => ae?.isEnabled).map((ae) => /* @__PURE__ */ _jsxDEV(Item, {
                value: ae?.id,
                label: ae.name,
                onClick: (v) => {
                  const user2 = users?.users?.find((user3) => user3?.id === v);
                  if (!invitees?.find((invitee) => invitee?.email === user2?.email)) {
                    setInvitees((curr) => [...curr, {
                      type: "AE",
                      email: user2?.email
                    }]);
                  }
                },
                children: ae.name
              }, ae.id, false, {
                fileName: _jsxFileName,
                lineNumber: 619,
                columnNumber: 25
              }, this))
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 598,
              columnNumber: 19
            }, this) : /* @__PURE__ */ _jsxDEV(Select, {
              width: "100%",
              value: accountExecutive,
              placeholder: `${t("accountExecutive")} ${activityAccountExecutiveField?.required ? "*" : ""}`,
              size: "labeled",
              borderless: false,
              portal: false,
              onChange: (v) => {
                accountExecutiveOnChange(v);
              },
              error: errorAe,
              autocomplete: accountExecutivePicklistValues?.filter((ae) => ae?.isEnabled)?.length > 7,
              children: accountExecutivePicklistValues?.filter((ae) => ae?.isEnabled).map((ae) => /* @__PURE__ */ _jsxDEV(Item, {
                value: ae?.id,
                label: ae?.name,
                onClick: (v) => {
                  const ae2 = accountExecutivePicklistValues?.find((ae3) => ae3?.id === v);
                  if (!invitees?.find((invitee) => invitee?.email === ae2?.name)) {
                    setInvitees((curr) => [...curr, {
                      type: "AE",
                      email: ae2?.name
                    }]);
                  }
                },
                children: ae?.name
              }, ae.id, false, {
                fileName: _jsxFileName,
                lineNumber: 662,
                columnNumber: 25
              }, this))
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 641,
              columnNumber: 19
            }, this))
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 595,
            columnNumber: 13
          }, this), inviteesNotSynced && /* @__PURE__ */ _jsxDEV("div", {
            className: styles.inviteesNotSynced,
            children: /* @__PURE__ */ _jsxDEV(Text, {
              size: "s",
              color: "peanut",
              children: t("inviteesNotSynced")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 689,
              columnNumber: 17
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 688,
            columnNumber: 15
          }, this), !inviteesNotSynced && /* @__PURE__ */ _jsxDEV("div", {
            className: styles.searchLeads,
            children: /* @__PURE__ */ _jsxDEV(SearchLeadsGuests, {
              size: 16,
              handleSelect: (leadSelected) => {
                const isLead = typeof leadSelected !== "string" && typeof leadSelected?.id !== "string" && leadSelected?.id?.value;
                const isCoworker = typeof leadSelected !== "string" && "type" in leadSelected && leadSelected.type === "Coworker";
                if (isLead) {
                  const leadEmail = getValueFromLogicRole(leadSelected, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
                  const leadName = getValueFromLogicRole(leadSelected, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
                  if (!invitees?.find((invitee) => invitee?.email === leadEmail)) {
                    setInvitees((curr) => [...curr, {
                      type: "Lead",
                      email: leadEmail,
                      name: leadName,
                      leadId: typeof leadSelected?.id === "string" ? null : leadSelected?.id?.value
                    }]);
                  }
                } else if (isCoworker) {
                  if (!invitees?.find((invitee) => invitee?.email === leadSelected.email)) {
                    setInvitees((curr) => [...curr, leadSelected]);
                  }
                } else {
                  if (!invitees?.find((invitee) => invitee?.email === leadSelected)) {
                    setInvitees((curr) => [...curr, {
                      type: null,
                      email: leadSelected,
                      name: null,
                      leadId: null
                    }]);
                  }
                }
              },
              company,
              inviteesEmails: invitees?.map((i) => i.email)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 696,
              columnNumber: 17
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 695,
            columnNumber: 15
          }, this), /* @__PURE__ */ _jsxDEV("div", {
            className: styles.inviteesList,
            children: invitees?.map((i) => /* @__PURE__ */ _jsxDEV(InviteeCard, {
              invitee: i,
              handleRemoveInvitee: removeInvitee,
              readOnly: false,
              shouldShowStatus: isEditionModal
            }, i.email, false, {
              fileName: _jsxFileName,
              lineNumber: 756,
              columnNumber: 17
            }, this))
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 754,
            columnNumber: 13
          }, this), /* @__PURE__ */ _jsxDEV(NotesForm, {
            notesField,
            title: t("noteCalendar.title"),
            placeholder: t("noteCalendar.placeholder")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 765,
            columnNumber: 13
          }, this), /* @__PURE__ */ _jsxDEV(NotesForm, {
            notesField: internalNotesField,
            title: t("noteInternal.title"),
            placeholder: t("noteInternal.placeholder")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 770,
            columnNumber: 13
          }, this), /* @__PURE__ */ _jsxDEV(ActivityDetailsForm, {
            isEditionModal,
            formData: {
              company,
              lead
            },
            accountId
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 775,
            columnNumber: 13
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 585,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV(Calendar, {
          day: isoDate,
          mode: "week",
          events: eventsPerDay,
          notConnected: eventsTypeSelected === "nylas" && connections?.list?.length === 0,
          onCalendarReconnect: () => {
            mutateConnections().then(() => {
              mutateCalendars();
            });
          },
          selectedTimezone
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 781,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 584,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV(ModalFooter, {
        className: styles.footer,
        children: [/* @__PURE__ */ _jsxDEV("div", {
          children: [/* @__PURE__ */ _jsxDEV(Button, {
            variant: "tertiary",
            onClick: handleClose,
            children: t("cancel")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 796,
            columnNumber: 13
          }, this), isEditionModal && /* @__PURE__ */ _jsxDEV(Button, {
            variant: "tertiary",
            color: "tomato",
            onClick: handleDelete,
            children: t("delete")
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 800,
            columnNumber: 15
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 795,
          columnNumber: 11
        }, this), /* @__PURE__ */ _jsxDEV("div", {
          className: styles._footer_buttons_right,
          children: [connections?.list?.length > 0 && !isEditionModal && /* @__PURE__ */ _jsxDEV(
            Tooltip,
            {
              title: createInCalendarCheckboxDisabled && t("notAllowedTitle"),
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(Checkbox, {
                size: "small",
                checked: createAlwaysOnLinkedCalendar ? createAlwaysOnLinkedCalendar : !skipCalendarCreation,
                disabled: createInCalendarCheckboxDisabled,
                onClick: (v) => setSkipCalendarCreation(!v),
                children: t("createEventInCalendar")
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 812,
                columnNumber: 17
              }, this)
            },
            void 0,
            false,
            {
              fileName: _jsxFileName,
              lineNumber: 807,
              columnNumber: 15
            },
            this
          ), /* @__PURE__ */ _jsxDEV(Button, {
            disabled: isSubmitting || !canSave,
            variant: "primary",
            onClick: handleSubmit(onSubmit),
            children: isSubmitting ? /* @__PURE__ */ _jsxDEV(Spinner, {
              size: 16,
              color: "bloobirds",
              name: "loadingCircle"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 832,
              columnNumber: 17
            }, this) : `${isEditionModal ? t("save") : t("create")}`
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 826,
            columnNumber: 13
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 805,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 794,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 482,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 480,
    columnNumber: 5
  }, this);
}
_s(ModalChild, "ZzFYv7ai07qU9pM0Lv90K8p7WeE=", false, function() {
  return [useMinimizableModal, useRichTextEditorPlugins, useUserSearch, useMediaQuery, useTranslation, useCalendar, useForm, useController, useController, useToasts, useConfirmDeleteModal, useController, useController, useIsOTOAccount, useFullSalesEnabled, useController, useController, useGetI18nSpacetime];
});
_c = ModalChild;
export const MeetingModal = (props) => {
  const initialContext = {
    id: props?.id,
    accountId: props?.accountId,
    userId: props?.userId,
    settings: props?.settings,
    connections: props?.connections,
    mutateConnections: props?.mutateConnections,
    dataModel: props?.dataModel
  };
  return /* @__PURE__ */ _jsxDEV(MeetingModalContext.Provider, {
    value: initialContext,
    children: /* @__PURE__ */ _jsxDEV(ModalChild, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 856,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 855,
    columnNumber: 5
  }, void 0);
};
_c2 = MeetingModal;
var _c, _c2;
$RefreshReg$(_c, "ModalChild");
$RefreshReg$(_c2, "MeetingModal");
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
