import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailModal.view.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailModal.view.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/modals/smartEmailModal/smartEmailModal.view.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useCallback = __vite__cjsImport2_react["useCallback"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useMemo = __vite__cjsImport2_react["useMemo"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { useController, useForm, FormProvider } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { Trans, useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import __vite__cjsImport5_reactShadowRoot from "/vendor/.vite-deps-react-shadow-root.js__v--23020670.js"; const ReactShadowRoot = __vite__cjsImport5_reactShadowRoot.__esModule ? __vite__cjsImport5_reactShadowRoot.default : __vite__cjsImport5_reactShadowRoot;
import { Banner, BannerLink } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-banner-dist-index.js.js";
import { SlotsDiscoveryTooltip } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-discoveryTooltips-dist-index.js.js";
import { Button, IconButton, Modal, Spinner, Text, useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useMinimizableModal, useSuggestedTemplates, useUserHelpers, useEmailConnections, useSignatures } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { AttachmentList, useAttachedFiles } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-misc-dist-index.js.js";
import { createRawHTMLBlock, createReplyHistory, deserialize, EditorToolbar, EditorToolbarControlsSection, EditorToolbarFileAttachment, EditorToolbarFontStylesSection, EditorToolbarImage, EditorToolbarListsSection, EditorToolbarMeetingLink, EditorToolbarSection, EditorToolbarSnippet, EditorToolbarTemplateVariable, EditorToolbarTextMarksSection, EditorToolbarTimeSlots, EditorToolbarSelectSignatureSection, ELEMENT_MISSING_MEETING_LINK, ELEMENT_MISSING_VARIABLE, FloatingTemplateVariable, serialize, useRichTextEditorPlugins, ELEMENT_RAW_HTML_BLOCK, replaceHTMLBlock } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, PermissionType, BobjectTypes, COMPANY_FIELDS_LOGIC_ROLE, DIRECTION_VALUES_LOGIC_ROLE, ExtensionHelperKeys, LEAD_FIELDS_LOGIC_ROLE, MessagesEvents, MIXPANEL_EVENTS, PlaybookTab, REPORTED_VALUES_LOGIC_ROLE, SmartEmailTab, TEMPLATE_TYPES, UserHelperKeys } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, getFieldByLogicRole, getTextFromLogicRole, getValueFromLogicRole, isEmail, recoverScrollOfBox, removeHtmlTags, removeScrollOfBox, createParagraph } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { focusEditor, insertElements, resetEditorChildren, select } from "/vendor/.vite-deps-@udecode_plate.js__v--feffb7cb.js";
import __vite__cjsImport15_lodash_debounce from "/vendor/.vite-deps-lodash_debounce.js__v--ce8d7378.js"; const debounce = __vite__cjsImport15_lodash_debounce.__esModule ? __vite__cjsImport15_lodash_debounce.default : __vite__cjsImport15_lodash_debounce;
import __vite__cjsImport16_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport16_mixpanelBrowser.__esModule ? __vite__cjsImport16_mixpanelBrowser.default : __vite__cjsImport16_mixpanelBrowser;
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import ClearSelect from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-clearSelect-clearSelect.tsx.js";
import ConfirmSendModal from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-confirmSendModal-confirmSendModal.tsx.js";
import EmailModalRow from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-emailModalRow-emailModalRow.tsx.js";
import MessagingTemplatesButton from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-messagingTemplatesButton-messagingTemplatesButton.tsx.js";
import { RecipientSearchInput } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-recipientSearchInput-recipientSearchInput.tsx.js";
import SaveWithSlotsModal from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-saveWithSlotsModal-saveWithSlotsModal.tsx.js";
import ScheduleEmailModal from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-scheduleEmailModal-scheduleEmailModal.tsx.js";
import { getActivityConnection, getDefaultEmail, getDefaultToEmail, getFocusPoint } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-utils-emailModal.utils.ts.js";
import salesforceResetStyles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-utils-resetSalesforceCSSs.module.css.js";
import BodyEditor from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-bodyEditor.tsx.js";
import FakeDropzone from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-fakeDropzone.tsx.js";
import AttachmentLinkList from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-components-attachmentLinkList-attachmentLinkList.tsx.js";
import { getSlotsNodePosition } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-components-dayCalendar-dayCalendar.tsx.js";
import { useAttachedLinks } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-hooks-useAttachedLinks.ts.js";
import SmartEmailHelper from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-smartEmailHelper.tsx.js";
import { prepareBodyToBeSerialized } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-utils-smartEmailHelper.utils.ts.js";
import { useSmartEmailModal } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailModal.tsx.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailModal.module.css.js";
import SubjectEditor from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-subjectEditor.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const isMissingVariable = (content, missingVariable) => {
  if (missingVariable) {
    return missingVariable;
  }
  if (content?.children && ![ELEMENT_MISSING_VARIABLE, ELEMENT_MISSING_MEETING_LINK].includes(content?.type)) {
    return content.children.some((children) => isMissingVariable(children, false));
  }
  if (Array.isArray(content)) {
    return content.some((node) => isMissingVariable(node, false));
  }
  return content?.type && [ELEMENT_MISSING_VARIABLE, ELEMENT_MISSING_MEETING_LINK].includes(content?.type);
};
const HTMLEditor = ({
  content,
  onContentChange,
  uploadAttachedFile,
  templateId
}) => {
  _s();
  const ref = useRef(null);
  const lastExternalContent = useRef(content);
  const oldTemplateId = useRef(templateId);
  useEffect(() => {
    if (ref.current && (ref.current.innerHTML === null || ref.current.innerHTML === void 0 || ref.current.innerHTML === "" || templateId !== oldTemplateId.current)) {
      ref.current.innerHTML = content;
      lastExternalContent.current = content;
      oldTemplateId.current = templateId;
    }
  }, [ref.current, content, templateId]);
  const handleInput = () => {
    if (ref.current) {
      onContentChange(ref.current.innerHTML);
    }
  };
  const debouncedHandleInput = useCallback(debounce(handleInput, 500), [ref.current]);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.html_editor,
    children: [/* @__PURE__ */ _jsxDEV(EditorToolbar, {
      children: /* @__PURE__ */ _jsxDEV(EditorToolbarFileAttachment, {
        onAttachment: uploadAttachedFile
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 166,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 165,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(ReactShadowRoot, {
      children: /* @__PURE__ */ _jsxDEV("div", {
        contentEditable: "true",
        ref,
        onInput: debouncedHandleInput,
        className: salesforceResetStyles.salesforceReset,
        style: {
          minHeight: "300px",
          border: "1px solid #ccc",
          padding: "10px"
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 170,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 169,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 164,
    columnNumber: 5
  }, void 0);
};
_s(HTMLEditor, "TCcm68WQkmBNB1wYNRmLk/ZrjTU=");
_c = HTMLEditor;
export const SmartEmailModalComponent = ({
  handleRedirect,
  scheduleEmailRedirect,
  emailSettingsRedirect,
  isExtension,
  userSettings
}) => {
  _s2();
  const {
    company: contextCompany,
    id,
    user,
    hasSnippetsEnabled,
    hasTimeSlotsEnabled,
    slotsData,
    setSlotsData,
    selectedTab,
    setSelectedTab,
    setPlaybookTab,
    updateReplaceMethod,
    setSelectedTemplate,
    selectedTemplate,
    taskTitle,
    activeBobject,
    dataModel,
    setSelectedActivity,
    pageBobjectType,
    focusedRef,
    updateFocusedIndex,
    setRelatedBobjectsInfo,
    setTooltipVisible
  } = useSmartEmailModal();
  const {
    closeModal,
    open,
    minimize,
    hasBeenMinimized,
    openConfirmModal,
    data: {
      activity,
      company: minimizedCompany,
      lead: activeLead,
      isScheduledEmail = false,
      isFailedAutomation = true,
      scheduledDate,
      taskId,
      savedData,
      mode,
      template,
      isBlankEmail,
      defaultToEmail,
      defaultCcEmail,
      defaultBccEmail,
      opportunity,
      opportunities,
      leads,
      editorMode: defaultEditorMode = "AST"
    },
    onSave
  } = useMinimizableModal(id);
  const company = useMemo(() => minimizedCompany ? minimizedCompany : contextCompany, [minimizedCompany, contextCompany]);
  const [confirmModal, setConfirmModal] = useState(void 0);
  const [saveWithSlotsModal, setSaveWithSlotsModal] = useState({
    isOpen: false,
    callback: () => {
    }
  });
  const [autofilledTemplate, setAutofilledTemplate] = useState(void 0);
  const [editorMode, setEditorMode] = useState(defaultEditorMode);
  const [htmlContent, setHtmlContent] = useState(savedData?.htmlContent || "");
  const [sending, setSending] = useState(false);
  const {
    data: signatures,
    signature,
    setConnectionId,
    getSignatureConnection
  } = useSignatures();
  const [isEditorDisabled, setIsEditorDisabled] = useState(isScheduledEmail);
  const [templateMediaFiles, setTemplateMediaFiles] = useState();
  const {
    attachedFiles,
    removeAttachedFile,
    uploadAttachedFile,
    syncAttachments
  } = useAttachedFiles();
  const {
    connections
  } = useEmailConnections();
  const [subjectEditor, setSubjectEditor] = useState(null);
  const [bodyEditor, setBodyEditor] = useState(null);
  const autoInsertSignaturePermission = userSettings?.autoInsertSignaturePermission;
  const enabledAutoInsertSignature = autoInsertSignaturePermission === PermissionType.ENABLED || autoInsertSignaturePermission === PermissionType.FORCED;
  const selectSignaturesPermission = userSettings?.selectSignaturesPermission;
  const enabledSelectSignature = selectSignaturesPermission === PermissionType.ENABLED || selectSignaturesPermission === PermissionType.FORCED;
  const emailConnections = connections?.list.map((x) => ({
    value: x?.email,
    label: x?.email
  })) || [];
  const aliasConnections = connections?.list.flatMap((x) => x.nylasAliases).map((alias) => ({
    value: alias.emailAlias,
    label: alias.emailAlias
  })) || [];
  const emailsFrom = [...emailConnections, ...aliasConnections];
  const [showCc, setShowCc] = useState(!!(!!defaultCcEmail && defaultCcEmail.length));
  const [scheduleEmailModalOpen, setScheduleEmailModalOpen] = useState(false);
  const [missingVariable, setMissingVariable] = useState(false);
  const {
    createToast
  } = useToasts();
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const {
    save,
    has
  } = useUserHelpers();
  const lastVisitedTab = useRef(SmartEmailTab.PAST_ACTIVITY);
  const togglePreview = () => {
    setSlotsData((prevData) => {
      return {
        ...prevData,
        calendarSlotsVisible: false
      };
    });
    if (selectedTab !== SmartEmailTab.PREVIEW) {
      lastVisitedTab.current = selectedTab;
    }
    setSelectedTab(selectedTab === SmartEmailTab.PREVIEW ? lastVisitedTab.current : SmartEmailTab.PREVIEW);
  };
  const leadEmailFieldId = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.EMAIL)?.id;
  const activeLeadEmail = activeLead && getValueFromLogicRole(activeLead, LEAD_FIELDS_LOGIC_ROLE.EMAIL, true) || activeLead?.email || activeLead?.[leadEmailFieldId];
  const companyEmailFieldsId = dataModel?.findFieldsByTypeAndBobjectType(BobjectTypes.Company, "EMAIL")?.map((field) => field.id);
  const activeCompanyEmail = company && (company?.fields ? company?.fields?.filter((field) => field?.value && field?.type === "EMAIL")[0]?.value : companyEmailFieldsId.map((id2) => company?.rawBobject?.[id2])?.[0]);
  const activityEmailLead = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_LEAD);
  const defaultEmail = getDefaultEmail(mode, activityEmailLead, activeBobject?.id?.typeName === BobjectTypes.Company ? activeCompanyEmail || activeLeadEmail : activeLeadEmail);
  const isModeReply = mode === "REPLY";
  let activityMessageBody = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);
  if (activityMessageBody?.includes('"type":"p"') && typeof activityMessageBody === "string" && typeof JSON.parse(activityMessageBody) === "object") {
    activityMessageBody = serialize(activityMessageBody);
  }
  let activityMessageSubject = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT, true) || "No subject";
  if (activityMessageSubject?.includes('"type":"p"') && typeof activityMessageSubject === "string" && typeof JSON.parse(activityMessageSubject) === "object") {
    activityMessageSubject = removeHtmlTags(serialize(activityMessageSubject));
  }
  const connection = getActivityConnection({
    activity,
    mode,
    connections
  });
  const activityEmail = connection?.email;
  const activityDateTime = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const activityDirection = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION)?.valueLogicRole;
  const isIncomingActivity = activityDirection === DIRECTION_VALUES_LOGIC_ROLE.INCOMING;
  const hasConnections = connections ? connections.list && connections.list.length > 0 : false;
  const canMinimize = isScheduledEmail ? !isEditorDisabled : true;
  const {
    t
  } = useTranslation();
  const {
    attachedLinks,
    removeAttachedLink
  } = useAttachedLinks();
  const oldTemplateId = useRef(null);
  const contactBobject = pageBobjectType === BobjectTypes.Company ? company : pageBobjectType === BobjectTypes.Opportunity ? opportunity : activeLead;
  const suggestedTemplates = useSuggestedTemplates(contactBobject, {
    company,
    opportunities,
    leads
  }, "Emails");
  const subjectPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: true,
    marks: false,
    elements: false,
    images: false,
    autoReplace: false,
    singleLine: true,
    replaceParagraphs: true
  });
  const bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: true,
    replaceMeetingLinks: true,
    rawHTMLBlock: true,
    replyHistory: true,
    snippets: true
  });
  const defaultValues = savedData || {
    to: getDefaultToEmail(pageBobjectType, defaultToEmail, defaultEmail),
    cc: defaultCcEmail ? defaultCcEmail : [],
    bcc: defaultBccEmail ? defaultBccEmail : [],
    emailFrom: hasConnections ? activityEmail : "no-connections",
    templateId: template ? template.id : null,
    subject: isModeReply ? createParagraph(/^re:/i.test(activityMessageSubject) ? activityMessageSubject : `RE: ${activityMessageSubject}`) : template ? deserialize(template?.subject, {
      format: template?.format,
      plugins: subjectPlugins
    }) : createParagraph(""),
    body: isModeReply || !template?.content ? createParagraph("") : deserialize(template?.content, {
      format: template?.format,
      plugins: bodyPlugins
    }),
    attachments: []
  };
  const methods = useForm({
    defaultValues,
    mode: "all"
  });
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    formState: {
      isDirty,
      isSubmitting,
      isValid
    }
  } = methods;
  const formAttachments = watch("attachments");
  const templateId = watch("templateId");
  const emailFrom = watch("emailFrom");
  const emailTo = watch("to");
  const [isThereARealBody, setThereARealBody] = useState(true);
  const isEditorRegistered = !!bodyEditor;
  const inputContextProps = useSmartEmailModal();
  const editorsStored = subjectEditor && bodyEditor;
  const {
    field: {
      ref: emailFromRef,
      ...emailFromProps
    }
  } = useController({
    control,
    name: "emailFrom",
    rules: {
      required: true
    }
  });
  const {
    field: {
      ref: emailCc,
      ...emailCcProps
    }
  } = useController({
    control,
    name: "cc",
    defaultValue: defaultCcEmail ? defaultCcEmail : [],
    rules: {
      validate(emails) {
        return emails.every(isEmail);
      }
    }
  });
  const {
    field: {
      ref: emailBcc,
      ...emailBccProps
    }
  } = useController({
    control,
    name: "bcc",
    defaultValue: defaultBccEmail ? defaultBccEmail : [],
    rules: {
      validate(emails) {
        return emails.every(isEmail);
      }
    }
  });
  const {
    field: {
      ref: emailToRef,
      ...emailToProps
    }
  } = useController({
    control,
    name: "to",
    defaultValue: getDefaultToEmail(pageBobjectType, defaultToEmail, defaultEmail)
  });
  const {
    field: {
      ref: templateSelectRef,
      ...templateSelectProps
    }
  } = useController({
    control,
    name: "templateId"
  });
  const prepareEmail = (data, activeBobject2) => {
    const isReply = isModeReply && data.emailFrom === activityEmail;
    const attachmentIds = attachedFiles?.map((file) => file.id);
    const body = editorMode === "HTML" ? htmlContent : JSON.stringify(deserialize(JSON.stringify(prepareBodyToBeSerialized(attachedLinks, data.body)), {
      format: "AST",
      plugins: bodyPlugins
    }));
    const subjectSerialized = deserialize(JSON.stringify(data?.subject), {
      format: "AST",
      plugins: subjectPlugins
    });
    const calendarSlotsData = [];
    const calendarSlots = slotsData?.calendarSlots;
    if (calendarSlots) {
      for (const key in calendarSlots) {
        if (calendarSlots[key]) {
          const items = calendarSlots[key];
          for (const item of items) {
            calendarSlotsData.push({
              day: item.day,
              duration: item.minuteSpan,
              startDateTime: item.startTime.format("iso-utc")
            });
          }
        }
      }
    }
    const subjectText = removeHtmlTags(serialize(subjectSerialized, {
      plugins: subjectPlugins
    }));
    return {
      nameFrom: null,
      nameReplayTo: null,
      emailReplayTo: isReply ? data.emailFrom : "",
      emailFrom: data.emailFrom,
      replyToMessageId: isReply ? getTextFromLogicRole(activity, "ACTIVITY__EMAIL_UID") : null,
      to: data.to,
      cc: data.cc || [],
      bcc: data.bcc || [],
      attachmentIds,
      templateId: data.templateId,
      format: editorMode,
      subject: editorMode !== "HTML" ? JSON.stringify(createParagraph(subjectText)) : subjectText,
      body,
      calendarSlots: calendarSlotsData,
      slotsTimezone: slotsData?.selectedTimezone,
      meetingTitle: slotsData?.meetingTitle,
      bobjectId: activeBobject2?.id?.value
    };
  };
  const formIsValid = () => {
    const body = getValues("body");
    const subject = getValues("subject");
    const emailTo2 = getValues("to");
    if (isMissingVariable(body) || isMissingVariable(subject) && editorMode !== "HTML") {
      createToast({
        type: "error",
        message: t("emailModal.toasts.errorVariableGeneric")
      });
      return false;
    } else if (emailTo2?.length === 0) {
      createToast({
        type: "error",
        message: t("emailModal.toasts.errorEmailTo")
      });
      return false;
    } else if (!subject || subject?.[0].children[0].text === "") {
      createToast({
        type: "error",
        message: t("emailModal.toasts.errorSubject")
      });
      return false;
    }
    return true;
  };
  const sendEmail = async (data) => {
    setSending(true);
    try {
      const email = prepareEmail(data, activeBobject);
      const response = await api.post("/messaging/emails", email);
      if (response.status === 201) {
        setSending(false);
        mixpanel.track(isBlankEmail ? "NEW_BLANK_EMAIL_SENT" : `TEMPLATE_FROM_BB_${mode}`, {
          "Template Id": data?.templateId,
          "To Emails": data.to?.length
        });
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SEND_EMAIL_ON_EMAIL_MODAL);
        createToast({
          type: "success",
          message: t("emailModal.toasts.success")
        });
        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: {
            type: BobjectTypes.Activity
          }
        }));
        save(UserHelperKeys.SEND_YOUR_FIRST_EMAIL);
        closeModal();
        onSave?.();
      } else if (response.status >= 400) {
        setSending(false);
        mixpanel.track("EMAIL_SENT_WARNINGS", {
          "Template Id": data?.templateId,
          "To Emails": data.to?.length
        });
        createToast({
          type: "warning",
          message: t("emailModal.toasts.delay")
        });
      }
    } catch (e) {
      setSending(false);
      mixpanel.track("EMAIL_SENT_FAILED", {
        "Template Id": data?.templateId,
        "To Emails": data.to?.length
      });
      if (e?.response && e.response?.status === 500 && (e.response?.data?.errorType && e.response?.data?.errorType.includes("UNABLE_TO_REPLACE_VARIABLES") || e.response?.data?.message.includes("missing-variable"))) {
        const errorVariable = e.response?.data?.errorType?.substring(e.response?.data?.errorType.indexOf(":") + 1);
        createToast({
          type: "error",
          message: errorVariable ? t("emailModal.toasts.errorVariable", {
            variable: errorVariable
          }) : t("emailModal.toasts.errorVariableGeneric")
        });
      } else if (e?.response && e.response?.status === 413) {
        createToast({
          type: "error",
          message: t("emailModal.toasts.fileExceedSize")
        });
      } else if (e?.response && e.response?.status === 401) {
        createToast({
          type: "error",
          message: t("emailModal.toasts.disconnected")
        });
      } else {
        createToast({
          type: "error",
          message: t("emailModal.toasts.error")
        });
      }
    }
  };
  const scheduleEmail = ({
    date,
    timezone
  }) => async (data) => {
    try {
      setScheduleEmailModalOpen(false);
      const email = prepareEmail(data, activeBobject);
      const response = await api.post("/messaging/scheduledEmails", {
        scheduledTime: date,
        email
      });
      if (response.status === 201) {
        const formattedDate = spacetime(date, timezone).format("{date-ordinal} {month-short}, {time-24} in {timezone}").replace("_", " ").replace(/\w+\//, "");
        createToast({
          type: "action",
          duration: 7500,
          message: t("emailModal.toasts.scheduled", {
            date: formattedDate
          }),
          actions: scheduleEmailRedirect ? [{
            text: t("emailModal.toasts.scheduleAction"),
            color: "tomato",
            onClick: scheduleEmailRedirect
          }] : []
        });
        closeModal();
        setTimeout(() => {
          onSave?.();
        }, 1e3);
      } else {
        createToast({
          type: "error",
          message: t("emailModal.toasts.scheduledError")
        });
      }
    } catch (error) {
      createToast({
        type: "error",
        message: t("emailModal.toasts.scheduledError")
      });
    }
  };
  const cancelScheduledEmail = async () => {
    try {
      setIsEditorDisabled(false);
      await api.delete(`/messaging/scheduledEmails/${taskId}/cancel`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        data: {}
      });
      createToast({
        type: "success",
        message: t("emailModal.toasts.scheduledCancelled"),
        position: "top-right"
      });
    } catch (e) {
      setIsEditorDisabled(true);
      createToast({
        type: "error",
        message: t("emailModal.toasts.scheduledCancelledError"),
        position: "top-right"
      });
    }
  };
  const markEmailAsRead = () => {
    api.patch(`/bobjects/${activity?.id?.value}/raw`, {
      contents: {
        [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES
      },
      params: {}
    }).then(() => {
      closeModal();
    });
  };
  const replaceBodyWithTemplate = (template2) => {
    const {
      content,
      body,
      format,
      mediaFiles
    } = template2;
    let rawNewBody;
    let emailTemplateBody;
    if (format === "HTML") {
      setHtmlContent(content || body);
      return;
    } else {
      rawNewBody = deserialize(content || body, {
        format,
        plugins: bodyPlugins
      });
      emailTemplateBody = JSON.parse(JSON.stringify(rawNewBody));
      const isSignatureAlreadyInserted = rawNewBody.some((node) => node.type === "raw-html-block");
      if (enabledAutoInsertSignature && !isSignatureAlreadyInserted && signature?.signature) {
        emailTemplateBody.push(createParagraph("")[0]);
        emailTemplateBody.push(createRawHTMLBlock(bodyEditor, signature.signature));
      }
    }
    const isReplyHistoryAlreadyInserted = rawNewBody.some((node) => node.type === "reply-history");
    if (activityMessageBody && !isReplyHistoryAlreadyInserted && !activityMessageBody.includes("Content too long to display")) {
      emailTemplateBody.push(createParagraph("")[0]);
      emailTemplateBody.push(createReplyHistory(bodyEditor, {
        html: activityMessageBody,
        sentAt: activityDateTime,
        sentBy: isIncomingActivity ? activityEmailLead : activityEmail
      }));
    }
    setTemplateMediaFiles(mediaFiles);
    resetEditorChildren(bodyEditor);
    insertElements(bodyEditor, emailTemplateBody, {
      at: [0]
    });
    select(bodyEditor, [0]);
    setValue("body", emailTemplateBody);
  };
  const replaceSubjectWithTemplate = (template2) => {
    const {
      subject,
      format
    } = template2;
    let emailTemplateSubject;
    if (subject && format !== "HTML") {
      if (subject.includes('"type"')) {
        const rawNewSubject = deserialize(subject, {
          format,
          plugins: subjectPlugins
        });
        emailTemplateSubject = JSON.parse(JSON.stringify(rawNewSubject));
      } else {
        emailTemplateSubject = subject;
      }
    } else {
      if (format === "HTML") {
        emailTemplateSubject = createParagraph(subject);
      } else {
        emailTemplateSubject = subject;
      }
    }
    if (!isModeReply) {
      resetEditorChildren(subjectEditor);
      insertElements(subjectEditor, emailTemplateSubject, {
        at: [0]
      });
      setValue("subject", emailTemplateSubject, {
        shouldValidate: true
      });
    }
  };
  const replaceWithTemplate = (template2, isEditorDisabled2) => {
    if (template2 && !isEditorDisabled2) {
      setEditorMode(template2?.format || "AST");
      if (bodyEditor && template2?.content)
        replaceBodyWithTemplate(template2);
      if (subjectEditor && template2?.subject)
        replaceSubjectWithTemplate(template2);
      if (bodyEditor && subjectEditor) {
        bodyEditor.history = {
          undos: [],
          redos: []
        };
        subjectEditor.history = {
          undos: [],
          redos: []
        };
        templateSelectProps.onChange(template2?.id);
      }
    }
  };
  const handleClose = () => {
    setTooltipVisible(false);
    if (isDirty || hasBeenMinimized) {
      openConfirmModal(() => setTooltipVisible(true));
    } else {
      closeModal();
    }
  };
  const handleMinimize = () => {
    const minimizeSavedData = {
      ...getValues(),
      attachments: attachedFiles,
      htmlContent
    };
    const title = removeHtmlTags(serialize(methods.getValues("subject"), {
      format: "AST",
      plugins: subjectPlugins
    }));
    minimize({
      data: {
        savedData: minimizeSavedData,
        editorMode
      },
      title
    });
  };
  const handleSaveSnippet = async (node) => {
    await setSelectedTemplate(null);
    setSelectedTemplate({
      content: node,
      type: TEMPLATE_TYPES.SNIPPET,
      edit: true
    });
    setSelectedTab(SmartEmailTab.TEMPLATES);
  };
  const handleSaveTemplate = async () => {
    const {
      body,
      subject
    } = getValues();
    await setSelectedTemplate(null);
    const {
      slotsNode
    } = getSlotsNodePosition(bodyEditor);
    if (slotsNode) {
      setSaveWithSlotsModal({
        isOpen: true,
        callback: () => {
          setSelectedTemplate({
            content: body.filter((node) => node.type !== "raw-html-block" && node.type !== "reply-history" && node.type !== "slots-form"),
            subject,
            type: TEMPLATE_TYPES.EMAIL,
            edit: true
          });
          setSelectedTab(SmartEmailTab.TEMPLATES);
          setSaveWithSlotsModal({
            isOpen: false,
            callback: void 0
          });
        }
      });
    } else {
      setSelectedTemplate({
        content: body.filter((node) => node.type !== "raw-html-block" && node.type !== "reply-history"),
        subject,
        type: TEMPLATE_TYPES.EMAIL,
        edit: true
      });
      setSelectedTab(SmartEmailTab.TEMPLATES);
    }
  };
  function handleEvent(e) {
    if (e.key === "Tab") {
      e.stopPropagation();
      const focusedEditor = [subjectEditor, bodyEditor][focusedRef.current];
      const focusPoint = getFocusPoint(focusedEditor, focusedRef.current);
      setTimeout(() => focusEditor(focusedEditor, focusPoint), 0);
      updateFocusedIndex();
    }
  }
  const memoedFunction = useCallback(handleEvent, [editorsStored]);
  useEffect(() => {
    if (signatures?.length > 0 && emailFrom) {
      const connection2 = connections.list.find((connection3) => connection3.email === emailFrom);
      setConnectionId(connection2?.id);
    }
  }, [connections, signatures, emailFrom]);
  useEffect(() => {
    if (bodyEditor) {
      const connection2 = connections.list.find((connection3) => connection3.email === emailFrom);
      getSignatureConnection(connection2?.id).then((signature2) => {
        if (signature2 && enabledAutoInsertSignature) {
          replaceHTMLBlock(bodyEditor, "signature", ELEMENT_RAW_HTML_BLOCK, signature2?.signature);
        }
      });
    }
  }, [emailFrom, connections, signatures]);
  useEffect(() => {
    if (!has(ExtensionHelperKeys.EMAIL_ACTION_TOOLTIP)) {
      save(ExtensionHelperKeys.EMAIL_ACTION_TOOLTIP);
    }
    if (hasBeenMinimized) {
      setRelatedBobjectsInfo({
        company,
        activeBobject: activeLead || company
      });
    }
    if (isExtension) {
      removeScrollOfBox();
    }
    if (Array.isArray(formAttachments))
      syncAttachments(formAttachments);
    if (mode === "REPLY")
      setSelectedActivity(activity);
    return recoverScrollOfBox;
  }, []);
  useEffect(() => {
    if ((!emailFrom || emailFrom === "no-connections") && connections?.defaultConnection) {
      setValue("emailFrom", connections?.defaultConnection);
    }
  }, [connections]);
  useEffect(() => {
    if (signature && isEditorRegistered && editorMode === "AST") {
      const newBody = JSON.parse(JSON.stringify(defaultValues.body));
      const isSignatureAlreadyInserted = newBody.some((node) => node.type === "raw-html-block");
      const isReplyHistoryAlreadyInserted = newBody.some((node) => node.type === "reply-history");
      let changed = false;
      if (!hasBeenMinimized) {
        if (enabledAutoInsertSignature && !isSignatureAlreadyInserted && signature?.signature) {
          changed = true;
          newBody.push(createParagraph("")[0]);
          newBody.push(createRawHTMLBlock(bodyEditor, signature.signature));
        }
        if (activityMessageBody && !isReplyHistoryAlreadyInserted && !activityMessageBody.includes("Content too long to display")) {
          const activityMessageBodyWithoutPx = activityMessageBody.replace(/<[^>]+src="https:(\/\/nyl\.as|.*.nylas.com).*[^>]*>/g, "");
          changed = true;
          newBody.push(createParagraph("")[0]);
          newBody.push(createReplyHistory(bodyEditor, {
            html: activityMessageBodyWithoutPx,
            sentAt: activityDateTime,
            sentBy: isIncomingActivity ? activityEmailLead : activityEmail
          }));
        }
      }
      if (changed) {
        resetEditorChildren(bodyEditor);
        insertElements(bodyEditor, newBody);
        select(bodyEditor, [0]);
        setValue("body", newBody, {
          shouldDirty: false
        });
      }
    }
  }, [signature, isEditorRegistered, activityMessageBody, activityEmailLead, activityEmail, isIncomingActivity]);
  useEffect(() => {
    if (connections?.loaded && activityEmail) {
      setValue("emailFrom", activityEmail);
    }
  }, [connections?.loaded, activityEmail]);
  useEffect(() => {
    if (templateMediaFiles) {
      syncAttachments(templateMediaFiles);
    }
  }, [templateMediaFiles]);
  useEffect(() => {
    if (template?.mediaFiles?.length > 0 && !templateMediaFiles) {
      syncAttachments(template.mediaFiles);
      setTemplateMediaFiles(template.mediaFiles);
    }
  }, [template]);
  useEffect(() => {
    if (templateId && editorMode === "AST") {
      const bodyDeserialized = deserialize(JSON.stringify(methods.getValues("body")), {
        format: "AST",
        plugins: bodyPlugins
      });
      const subjectDeserialized = deserialize(JSON.stringify(methods.getValues("subject")), {
        format: "AST",
        plugins: subjectPlugins
      });
      if (isMissingVariable(bodyDeserialized, false) || isMissingVariable(subjectDeserialized, false)) {
        setMissingVariable(true);
      } else {
        setMissingVariable(false);
      }
    }
  }, [templateId]);
  useEffect(() => {
    if (!hasBeenMinimized && bodyEditor && subjectEditor && template?.id && oldTemplateId.current !== template.id) {
      replaceWithTemplate(template, isEditorDisabled);
      oldTemplateId.current = template.id;
    }
    updateReplaceMethod((template2) => replaceWithTemplate(template2, isEditorDisabled));
  }, [bodyEditor, subjectEditor, signature, activityMessageBody, activityMessageSubject, mode, template, isEditorDisabled]);
  useEffect(() => {
    if (editorMode === "HTML") {
      window.removeEventListener("keydown", memoedFunction);
      return;
    }
    if (!bodyEditor || !subjectEditor)
      return;
    window.addEventListener("keydown", memoedFunction);
    return () => {
      window.removeEventListener("keydown", memoedFunction);
    };
  }, [subjectEditor, bodyEditor, editorMode]);
  useEffect(() => {
    if (subjectEditor && bodyEditor && !defaultValues?.templateId && suggestedTemplates?.length === 1) {
      replaceWithTemplate(suggestedTemplates[0], isEditorDisabled);
      setAutofilledTemplate(suggestedTemplates[0].taskTitle);
    }
  }, [suggestedTemplates?.length, subjectEditor, bodyEditor, defaultValues?.templateId, isEditorDisabled]);
  const PreviewEmailButton = () => /* @__PURE__ */ _jsxDEV(Button, {
    variant: "secondary",
    size: "small",
    iconLeft: isOpenPreview ? "eyeOff" : "eye",
    onClick: togglePreview,
    uppercase: false,
    children: t("emailModal.preview")
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 1159,
    columnNumber: 5
  }, void 0);
  return /* @__PURE__ */ _jsxDEV(_Fragment, {
    children: /* @__PURE__ */ _jsxDEV(FormProvider, {
      ...methods,
      children: [/* @__PURE__ */ _jsxDEV(Modal, {
        open,
        onClose: handleClose,
        width: 1106,
        onOverlayClick: handleMinimize,
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.modal_email_container,
          children: /* @__PURE__ */ _jsxDEV("div", {
            className: styles.container_email,
            children: [/* @__PURE__ */ _jsxDEV("div", {
              className: styles._header__container,
              children: [/* @__PURE__ */ _jsxDEV("div", {
                className: styles._header__info,
                children: [/* @__PURE__ */ _jsxDEV("div", {
                  className: styles._header_companyName,
                  onClick: handleRedirect,
                  children: [/* @__PURE__ */ _jsxDEV(IconButton, {
                    name: "company",
                    size: 24
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 1179,
                    columnNumber: 21
                  }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
                    size: "m",
                    weight: "regular",
                    color: "bloobirds",
                    children: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME) || ""
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 1180,
                    columnNumber: 21
                  }, void 0)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 1178,
                  columnNumber: 19
                }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
                  size: "s",
                  weight: "medium",
                  children: t("emailModal.subjectNewEmail")
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 1184,
                  columnNumber: 19
                }, void 0)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 1177,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ _jsxDEV("div", {
                className: styles._header_icons,
                children: [canMinimize && /* @__PURE__ */ _jsxDEV(IconButton, {
                  name: "minus",
                  size: 20,
                  onClick: handleMinimize
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 1189,
                  columnNumber: 35
                }, void 0), /* @__PURE__ */ _jsxDEV(IconButton, {
                  name: "cross",
                  size: 24,
                  onClick: handleClose
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 1190,
                  columnNumber: 19
                }, void 0)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 1188,
                columnNumber: 17
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 1176,
              columnNumber: 15
            }, void 0), !hasConnections && /* @__PURE__ */ _jsxDEV(Banner, {
              icon: "disconnectOutline",
              type: "warning",
              children: /* @__PURE__ */ _jsxDEV(Trans, {
                i18nKey: "emailModal.emptyConnection",
                children: ["You need a connected email to send one-to-one emails from Bloobirds. Go to", /* @__PURE__ */ _jsxDEV(BannerLink, {
                  onClick: emailSettingsRedirect,
                  children: "Email settings"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 1198,
                  columnNumber: 21
                }, void 0), " to connect."]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 1196,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 1195,
              columnNumber: 17
            }, void 0), isScheduledEmail && !isFailedAutomation && isEditorDisabled && /* @__PURE__ */ _jsxDEV(Banner, {
              type: "warning",
              icon: "clock",
              children: /* @__PURE__ */ _jsxDEV(Trans, {
                i18nKey: "emailModal.emailScheduled",
                values: {
                  date: spacetime(scheduledDate, "UTC").format("{day} {date-ordinal} at {time-24}")
                },
                components: [/* @__PURE__ */ _jsxDEV(BannerLink, {
                  onClick: cancelScheduledEmail,
                  children: " "
                }, "1", false, {
                  fileName: _jsxFileName,
                  lineNumber: 1213,
                  columnNumber: 23
                }, void 0)]
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 1205,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 1204,
              columnNumber: 17
            }, void 0), isScheduledEmail && isFailedAutomation && isEditorDisabled && /* @__PURE__ */ _jsxDEV(Banner, {
              type: "error",
              icon: "cross",
              children: ["An error occurred and your email could not be sent", " ", /* @__PURE__ */ _jsxDEV(BannerLink, {
                onClick: cancelScheduledEmail,
                children: /* @__PURE__ */ _jsxDEV(Text, {
                  htmlTag: "span",
                  size: "s",
                  color: "bloobirds",
                  children: "Edit & schedule again"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 1224,
                  columnNumber: 21
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 1223,
                columnNumber: 19
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 1221,
              columnNumber: 17
            }, void 0), /* @__PURE__ */ _jsxDEV("div", {
              className: styles._modal_body_container,
              children: [/* @__PURE__ */ _jsxDEV("div", {
                className: styles._modal_body,
                children: [/* @__PURE__ */ _jsxDEV("form", {
                  onSubmit: () => {
                    if (selectedTab === SmartEmailTab.CREATE_TASK && taskTitle) {
                      setConfirmModal(true);
                    } else {
                      handleSubmit(sendEmail)();
                    }
                  },
                  className: styles._container_ast,
                  "data-intercom": "send-email-modal",
                  children: [/* @__PURE__ */ _jsxDEV(EmailModalRow, {
                    isDisabled: isEditorDisabled,
                    children: [/* @__PURE__ */ _jsxDEV(Text, {
                      size: "m",
                      color: "verySoftPeanut",
                      children: t("emailModal.from")
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 1244,
                      columnNumber: 23
                    }, void 0), /* @__PURE__ */ _jsxDEV(ClearSelect, {
                      ...emailFromProps,
                      options: Array.from(new Set(emailsFrom)),
                      emptyMessage: t("emailModal.noEmailsConnectedYet")
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 1247,
                      columnNumber: 23
                    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
                      className: styles.inputControls,
                      children: !showCc && /* @__PURE__ */ _jsxDEV(Button, {
                        size: "small",
                        variant: "clear",
                        onClick: () => setShowCc(true),
                        children: t("emailModal.cc")
                      }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 1254,
                        columnNumber: 27
                      }, void 0)
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 1252,
                      columnNumber: 23
                    }, void 0)]
                  }, void 0, true, {
                    fileName: _jsxFileName,
                    lineNumber: 1243,
                    columnNumber: 21
                  }, void 0), showCc && /* @__PURE__ */ _jsxDEV(_Fragment, {
                    children: [/* @__PURE__ */ _jsxDEV(EmailModalRow, {
                      isDisabled: isEditorDisabled,
                      children: [/* @__PURE__ */ _jsxDEV(Text, {
                        size: "m",
                        color: "verySoftPeanut",
                        children: t("emailModal.cc")
                      }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 1263,
                        columnNumber: 27
                      }, void 0), /* @__PURE__ */ _jsxDEV(RecipientSearchInput, {
                        id: "emailCc-no-contacts",
                        emails: emailCcProps.value?.filter((e) => e !== connections?.defaultConnection),
                        onChange: (contacts) => {
                          emailCcProps.onChange(contacts.map((x) => x?.email));
                        },
                        contextProps: inputContextProps
                      }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 1266,
                        columnNumber: 27
                      }, void 0)]
                    }, void 0, true, {
                      fileName: _jsxFileName,
                      lineNumber: 1262,
                      columnNumber: 25
                    }, void 0), /* @__PURE__ */ _jsxDEV(EmailModalRow, {
                      isDisabled: isEditorDisabled,
                      children: [/* @__PURE__ */ _jsxDEV(Text, {
                        size: "m",
                        color: "verySoftPeanut",
                        children: t("emailModal.bcc")
                      }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 1278,
                        columnNumber: 27
                      }, void 0), /* @__PURE__ */ _jsxDEV(RecipientSearchInput, {
                        id: "emailBcc-no-contacts",
                        emails: emailBccProps.value?.filter((e) => e !== connections?.defaultConnection),
                        onChange: (contacts) => {
                          emailBccProps.onChange(contacts.map((x) => x?.email));
                        },
                        contextProps: inputContextProps
                      }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 1281,
                        columnNumber: 27
                      }, void 0)]
                    }, void 0, true, {
                      fileName: _jsxFileName,
                      lineNumber: 1277,
                      columnNumber: 25
                    }, void 0)]
                  }, void 0, true), /* @__PURE__ */ _jsxDEV(EmailModalRow, {
                    isDisabled: isEditorDisabled,
                    children: [/* @__PURE__ */ _jsxDEV(Text, {
                      size: "m",
                      color: "verySoftPeanut",
                      children: t("emailModal.to")
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 1295,
                      columnNumber: 23
                    }, void 0), /* @__PURE__ */ _jsxDEV(RecipientSearchInput, {
                      emails: emailToProps.value?.filter((e) => e !== connections?.defaultConnection),
                      id: "emailTo-no-contacts",
                      onChange: (contacts) => {
                        emailToProps.onChange(contacts.map((x) => x?.email?.toLowerCase()));
                      },
                      contextProps: inputContextProps
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 1298,
                      columnNumber: 23
                    }, void 0)]
                  }, void 0, true, {
                    fileName: _jsxFileName,
                    lineNumber: 1294,
                    columnNumber: 21
                  }, void 0), /* @__PURE__ */ _jsxDEV(EmailModalRow, {
                    callback: () => focusedRef.current = 0,
                    isDisabled: isEditorDisabled,
                    children: /* @__PURE__ */ _jsxDEV(SubjectEditor, {
                      setSubjectEditor,
                      validator: () => template?.format === "HTML",
                      defaultValue: hasBeenMinimized && savedData?.subject,
                      children: (editor) => /* @__PURE__ */ _jsxDEV(_Fragment, {
                        children: [editor, subjectEditor && /* @__PURE__ */ _jsxDEV(FloatingTemplateVariable, {
                          editor: subjectEditor,
                          disableEmpty: true
                        }, void 0, false, {
                          fileName: _jsxFileName,
                          lineNumber: 1322,
                          columnNumber: 31
                        }, void 0)]
                      }, void 0, true)
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 1313,
                      columnNumber: 23
                    }, void 0)
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 1309,
                    columnNumber: 21
                  }, void 0), /* @__PURE__ */ _jsxDEV("div", {
                    id: "emailBody",
                    className: styles._editor__container,
                    "data-intercom": "send-email-modal-body",
                    onClick: () => focusedRef.current = 1,
                    children: [isEditorDisabled && /* @__PURE__ */ _jsxDEV("div", {
                      className: styles.disabledOverlay
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 1334,
                      columnNumber: 44
                    }, void 0), editorMode === "HTML" ? /* @__PURE__ */ _jsxDEV(HTMLEditor, {
                      content: htmlContent,
                      onContentChange: setHtmlContent,
                      uploadAttachedFile,
                      templateId
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 1336,
                      columnNumber: 25
                    }, void 0) : /* @__PURE__ */ _jsxDEV(BodyEditor, {
                      setBodyEditor,
                      handleSaveSnippet,
                      defaultValue: hasBeenMinimized && savedData?.body,
                      children: (editor) => /* @__PURE__ */ _jsxDEV(_Fragment, {
                        children: [/* @__PURE__ */ _jsxDEV(EditorToolbar, {
                          children: [/* @__PURE__ */ _jsxDEV(EditorToolbarControlsSection, {
                            color: "white"
                          }, void 0, false, {
                            fileName: _jsxFileName,
                            lineNumber: 1352,
                            columnNumber: 33
                          }, void 0), /* @__PURE__ */ _jsxDEV(EditorToolbarFontStylesSection, {
                            color: "white",
                            enableChangeSize: true
                          }, void 0, false, {
                            fileName: _jsxFileName,
                            lineNumber: 1353,
                            columnNumber: 33
                          }, void 0), /* @__PURE__ */ _jsxDEV(EditorToolbarTextMarksSection, {
                            color: "white",
                            editor: bodyEditor,
                            enableChangeColor: true
                          }, void 0, false, {
                            fileName: _jsxFileName,
                            lineNumber: 1354,
                            columnNumber: 33
                          }, void 0), /* @__PURE__ */ _jsxDEV(EditorToolbarListsSection, {
                            color: "white"
                          }, void 0, false, {
                            fileName: _jsxFileName,
                            lineNumber: 1359,
                            columnNumber: 33
                          }, void 0), /* @__PURE__ */ _jsxDEV(EditorToolbarSection, {
                            children: [hasSnippetsEnabled && /* @__PURE__ */ _jsxDEV(EditorToolbarSnippet, {
                              onClick: () => {
                                setSelectedTab(SmartEmailTab.TEMPLATES);
                                setPlaybookTab(PlaybookTab.SNIPPETS);
                              }
                            }, void 0, false, {
                              fileName: _jsxFileName,
                              lineNumber: 1362,
                              columnNumber: 37
                            }, void 0), /* @__PURE__ */ _jsxDEV(EditorToolbarMeetingLink, {
                              editor: bodyEditor
                            }, void 0, false, {
                              fileName: _jsxFileName,
                              lineNumber: 1369,
                              columnNumber: 35
                            }, void 0), /* @__PURE__ */ _jsxDEV(EditorToolbarFileAttachment, {
                              onAttachment: uploadAttachedFile
                            }, void 0, false, {
                              fileName: _jsxFileName,
                              lineNumber: 1370,
                              columnNumber: 35
                            }, void 0), /* @__PURE__ */ _jsxDEV(EditorToolbarImage, {
                              editor: bodyEditor
                            }, void 0, false, {
                              fileName: _jsxFileName,
                              lineNumber: 1371,
                              columnNumber: 35
                            }, void 0), /* @__PURE__ */ _jsxDEV(EditorToolbarTemplateVariable, {
                              disableEmpty: true,
                              editor: bodyEditor
                            }, void 0, false, {
                              fileName: _jsxFileName,
                              lineNumber: 1372,
                              columnNumber: 35
                            }, void 0)]
                          }, void 0, true, {
                            fileName: _jsxFileName,
                            lineNumber: 1360,
                            columnNumber: 33
                          }, void 0), hasTimeSlotsEnabled && /* @__PURE__ */ _jsxDEV(_Fragment, {
                            children: [/* @__PURE__ */ _jsxDEV(EditorToolbarSection, {
                              children: /* @__PURE__ */ _jsxDEV(EditorToolbarTimeSlots, {
                                toggleTimeSlots: () => {
                                  setSlotsData((prevSlotsData) => ({
                                    ...prevSlotsData,
                                    calendarSlotsVisible: true
                                  }));
                                  setSelectedTab(SmartEmailTab.CALENDAR);
                                  mixpanel.track(MIXPANEL_EVENTS.OPEN_CALENDAR_SLOTS);
                                }
                              }, void 0, false, {
                                fileName: _jsxFileName,
                                lineNumber: 1377,
                                columnNumber: 39
                              }, void 0)
                            }, void 0, false, {
                              fileName: _jsxFileName,
                              lineNumber: 1376,
                              columnNumber: 37
                            }, void 0), /* @__PURE__ */ _jsxDEV(SlotsDiscoveryTooltip, {}, void 0, false, {
                              fileName: _jsxFileName,
                              lineNumber: 1388,
                              columnNumber: 37
                            }, void 0)]
                          }, void 0, true), enabledSelectSignature && /* @__PURE__ */ _jsxDEV(EditorToolbarSelectSignatureSection, {
                            color: "white"
                          }, void 0, false, {
                            fileName: _jsxFileName,
                            lineNumber: 1392,
                            columnNumber: 35
                          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
                            className: styles.show_preview_wrapper,
                            children: /* @__PURE__ */ _jsxDEV(PreviewEmailButton, {}, void 0, false, {
                              fileName: _jsxFileName,
                              lineNumber: 1395,
                              columnNumber: 35
                            }, void 0)
                          }, void 0, false, {
                            fileName: _jsxFileName,
                            lineNumber: 1394,
                            columnNumber: 33
                          }, void 0)]
                        }, void 0, true, {
                          fileName: _jsxFileName,
                          lineNumber: 1351,
                          columnNumber: 31
                        }, void 0), /* @__PURE__ */ _jsxDEV(MessagingTemplatesButton, {
                          user,
                          value: templateSelectProps.value,
                          onClick: () => {
                            setSelectedTab(SmartEmailTab.TEMPLATES);
                            setPlaybookTab(PlaybookTab.EMAILS);
                            if (selectedTemplate) {
                              setSelectedTemplate(void 0);
                            }
                          },
                          isPlaybookTab: selectedTab === SmartEmailTab.TEMPLATES,
                          autofilledTemplate
                        }, void 0, false, {
                          fileName: _jsxFileName,
                          lineNumber: 1398,
                          columnNumber: 31
                        }, void 0), /* @__PURE__ */ _jsxDEV("div", {
                          className: styles._editor__container_ast,
                          children: [/* @__PURE__ */ _jsxDEV(FakeDropzone, {
                            editor: bodyEditor
                          }, void 0, false, {
                            fileName: _jsxFileName,
                            lineNumber: 1412,
                            columnNumber: 33
                          }, void 0), editor]
                        }, void 0, true, {
                          fileName: _jsxFileName,
                          lineNumber: 1411,
                          columnNumber: 31
                        }, void 0)]
                      }, void 0, true)
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 1343,
                      columnNumber: 25
                    }, void 0)]
                  }, void 0, true, {
                    fileName: _jsxFileName,
                    lineNumber: 1328,
                    columnNumber: 21
                  }, void 0)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 1232,
                  columnNumber: 19
                }, void 0), /* @__PURE__ */ _jsxDEV("footer", {
                  className: styles.footer,
                  children: [attachedFiles?.length > 0 && /* @__PURE__ */ _jsxDEV(AttachmentList, {
                    files: attachedFiles,
                    onDelete: removeAttachedFile
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 1423,
                    columnNumber: 23
                  }, void 0), attachedLinks?.length > 0 && /* @__PURE__ */ _jsxDEV(AttachmentLinkList, {
                    files: attachedLinks,
                    onDelete: removeAttachedLink
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 1426,
                    columnNumber: 23
                  }, void 0), /* @__PURE__ */ _jsxDEV("div", {
                    className: styles.footerActions,
                    children: [/* @__PURE__ */ _jsxDEV("span", {
                      "data-intercom": "send-email-modal-action-cancel",
                      children: !isSubmitting && !isEditorDisabled && /* @__PURE__ */ _jsxDEV(Button, {
                        variant: "clear",
                        color: "tomato",
                        onClick: handleClose,
                        disabled: isSubmitting,
                        children: t("emailModal.discard")
                      }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 1431,
                        columnNumber: 27
                      }, void 0)
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 1429,
                      columnNumber: 23
                    }, void 0), /* @__PURE__ */ _jsxDEV("div", {
                      className: styles.footerButtons,
                      children: [!isSubmitting && !isEditorDisabled && /* @__PURE__ */ _jsxDEV(Button, {
                        onClick: handleSaveTemplate,
                        variant: "clear",
                        color: "purple",
                        iconLeft: "save",
                        children: isThereARealBody ? t("emailModal.saveTemplate") : t("emailModal.createTemplate")
                      }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 1443,
                        columnNumber: 27
                      }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
                        variant: "secondary",
                        iconLeft: isSubmitting ? void 0 : "clock",
                        onClick: handleSubmit(() => {
                          if (formIsValid()) {
                            setScheduleEmailModalOpen(true);
                          }
                        }),
                        disabled: isSubmitting || !hasConnections || !isValid || isEditorDisabled,
                        className: styles.scheduleButton,
                        children: isSubmitting ? /* @__PURE__ */ _jsxDEV(Spinner, {
                          name: "loadingCircle",
                          color: "bloobirds",
                          size: 18
                        }, void 0, false, {
                          fileName: _jsxFileName,
                          lineNumber: 1466,
                          columnNumber: 29
                        }, void 0) : t("emailModal.schedule")
                      }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 1454,
                        columnNumber: 25
                      }, void 0), /* @__PURE__ */ _jsxDEV("span", {
                        "data-intercom": "send-email-modal-action-accept",
                        children: /* @__PURE__ */ _jsxDEV(Button, {
                          className: styles.sendButton,
                          dataTest: "sendEmail",
                          onClick: () => {
                            if (selectedTab === SmartEmailTab.CREATE_TASK && taskTitle) {
                              setConfirmModal(true);
                            } else {
                              if (sending)
                                return;
                              if (formIsValid()) {
                                handleSubmit(sendEmail)();
                                if (isModeReply)
                                  markEmailAsRead();
                              }
                            }
                          },
                          disabled: !hasConnections || !isValid || isEditorDisabled,
                          children: sending || isSubmitting ? /* @__PURE__ */ _jsxDEV(Spinner, {
                            name: "loadingCircle",
                            color: "white",
                            size: 18
                          }, void 0, false, {
                            fileName: _jsxFileName,
                            lineNumber: 1489,
                            columnNumber: 31
                          }, void 0) : t("emailModal.send")
                        }, void 0, false, {
                          fileName: _jsxFileName,
                          lineNumber: 1472,
                          columnNumber: 27
                        }, void 0)
                      }, void 0, false, {
                        fileName: _jsxFileName,
                        lineNumber: 1471,
                        columnNumber: 25
                      }, void 0)]
                    }, void 0, true, {
                      fileName: _jsxFileName,
                      lineNumber: 1441,
                      columnNumber: 23
                    }, void 0)]
                  }, void 0, true, {
                    fileName: _jsxFileName,
                    lineNumber: 1428,
                    columnNumber: 21
                  }, void 0)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 1421,
                  columnNumber: 19
                }, void 0)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 1231,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ _jsxDEV(SmartEmailHelper, {
                error: missingVariable,
                bodyEditor,
                setOpenPreview: setIsOpenPreview,
                hasAttachments: attachedFiles?.length > 0,
                hasLinks: attachedLinks?.length > 0,
                htmlContent,
                control,
                format: editorMode
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 1499,
                columnNumber: 17
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 1230,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 1175,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 1174,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 1173,
        columnNumber: 9
      }, void 0), scheduleEmailModalOpen && /* @__PURE__ */ _jsxDEV(ScheduleEmailModal, {
        emails: emailTo,
        onClose: () => setScheduleEmailModalOpen(false),
        onSubmit: async ({
          date,
          timezone
        }) => {
          await handleSubmit(scheduleEmail({
            date,
            timezone
          }))();
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 1514,
        columnNumber: 11
      }, void 0), /* @__PURE__ */ _jsxDEV(ConfirmSendModal, {
        handleClose: () => setConfirmModal(false),
        onConfirm: () => {
          handleSubmit(sendEmail)();
          setConfirmModal(false);
        },
        open: confirmModal
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 1522,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(SaveWithSlotsModal, {
        handleClose: () => setSaveWithSlotsModal({
          isOpen: false,
          callback: void 0
        }),
        onConfirm: saveWithSlotsModal?.callback,
        open: saveWithSlotsModal?.isOpen
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 1530,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 1172,
      columnNumber: 7
    }, void 0)
  }, void 0, false);
};
_s2(SmartEmailModalComponent, "EyWclu8yaK0nTkoCb+LObThcslo=", false, function() {
  return [useSmartEmailModal, useMinimizableModal, useSignatures, useAttachedFiles, useEmailConnections, useToasts, useUserHelpers, useTranslation, useAttachedLinks, useSuggestedTemplates, useRichTextEditorPlugins, useRichTextEditorPlugins, useForm, useSmartEmailModal, useController, useController, useController, useController, useController];
});
_c2 = SmartEmailModalComponent;
var _c, _c2;
$RefreshReg$(_c, "HTMLEditor");
$RefreshReg$(_c2, "SmartEmailModalComponent");
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
