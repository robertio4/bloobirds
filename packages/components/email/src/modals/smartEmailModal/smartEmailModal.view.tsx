import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useController, useForm, FormProvider } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import ReactShadowRoot from 'react-shadow-root';

import { Banner, BannerLink } from '@bloobirds-it/banner';
import { SlotsDiscoveryTooltip } from '@bloobirds-it/discovery-tooltips';
import { Button, IconButton, Modal, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import {
  useMinimizableModal,
  useSuggestedTemplates,
  useUserHelpers,
  useEmailConnections,
  useSignatures,
} from '@bloobirds-it/hooks';
import { AttachmentList, useAttachedFiles } from '@bloobirds-it/misc';
import {
  createRawHTMLBlock,
  createReplyHistory,
  deserialize,
  EditorToolbar,
  EditorToolbarControlsSection,
  EditorToolbarFileAttachment,
  EditorToolbarFontStylesSection,
  EditorToolbarImage,
  EditorToolbarListsSection,
  EditorToolbarMeetingLink,
  EditorToolbarSection,
  EditorToolbarSnippet,
  EditorToolbarTemplateVariable,
  EditorToolbarTextMarksSection,
  EditorToolbarTimeSlots,
  EditorToolbarSelectSignatureSection,
  ELEMENT_MISSING_MEETING_LINK,
  ELEMENT_MISSING_VARIABLE,
  FloatingTemplateVariable,
  MyEditor,
  serialize,
  useRichTextEditorPlugins,
  ELEMENT_RAW_HTML_BLOCK,
  replaceHTMLBlock,
} from '@bloobirds-it/rich-text-editor';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  PermissionType,
  Bobject,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  DIRECTION_VALUES_LOGIC_ROLE,
  EditorMode,
  Email,
  EmailMinimizableData,
  EmailModalProps,
  ExtensionBobject,
  ExtensionHelperKeys,
  FormValues,
  LEAD_FIELDS_LOGIC_ROLE,
  MediaFile,
  MessagesEvents,
  MessagingTemplate,
  MIXPANEL_EVENTS,
  PlaybookTab,
  REPORTED_VALUES_LOGIC_ROLE,
  SlotsData,
  SmartEmailContext,
  SmartEmailTab,
  TEMPLATE_TYPES,
  UserHelperKeys,
} from '@bloobirds-it/types';
import {
  api,
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
  isEmail,
  recoverScrollOfBox,
  removeHtmlTags,
  removeScrollOfBox,
  createParagraph,
} from '@bloobirds-it/utils';
import {
  focusEditor,
  insertElements,
  PlateEditor,
  resetEditorChildren,
  select,
} from '@udecode/plate';
import debounce from 'lodash/debounce';
import mixpanel from 'mixpanel-browser';
import spacetime from 'spacetime';

import ClearSelect from '../../components/clearSelect/clearSelect';
import ConfirmSendModal from '../../components/confirmSendModal/confirmSendModal';
import EmailModalRow from '../../components/emailModalRow/emailModalRow';
import MessagingTemplatesButton from '../../components/messagingTemplatesButton/messagingTemplatesButton';
import { RecipientSearchInput } from '../../components/recipientSearchInput/recipientSearchInput';
import SaveWithSlotsModal from '../../components/saveWithSlotsModal/saveWithSlotsModal';
import ScheduleEmailModal from '../../components/scheduleEmailModal/scheduleEmailModal';
import {
  getActivityConnection,
  getDefaultEmail,
  getDefaultToEmail,
  getFocusPoint,
} from '../../utils/emailModal.utils';
import salesforceResetStyles from '../../utils/resetSalesforceCSSs.module.css';
import BodyEditor from './bodyEditor';
import FakeDropzone from './fakeDropzone';
import AttachmentLinkList from './smartEmailHelper/components/attachmentLinkList/attachmentLinkList';
import { getSlotsNodePosition } from './smartEmailHelper/components/dayCalendar/dayCalendar';
import { useAttachedLinks } from './smartEmailHelper/hooks/useAttachedLinks';
import SmartEmailHelper from './smartEmailHelper/smartEmailHelper';
import { prepareBodyToBeSerialized } from './smartEmailHelper/utils/smartEmailHelper.utils';
import { useSmartEmailModal } from './smartEmailModal';
import styles from './smartEmailModal.module.css';
import SubjectEditor from './subjectEditor';

export const isMissingVariable: any = (content: any, missingVariable: boolean) => {
  if (missingVariable) {
    return missingVariable;
  }
  if (
    content?.children &&
    ![ELEMENT_MISSING_VARIABLE, ELEMENT_MISSING_MEETING_LINK].includes(content?.type)
  ) {
    return content.children.some((children: any) => isMissingVariable(children, false));
  }
  if (Array.isArray(content)) {
    return content.some((node: any) => isMissingVariable(node, false));
  }
  return (
    content?.type &&
    [ELEMENT_MISSING_VARIABLE, ELEMENT_MISSING_MEETING_LINK].includes(content?.type)
  );
};

const HTMLEditor = ({ content, onContentChange, uploadAttachedFile, templateId }) => {
  const ref = useRef(null);
  const lastExternalContent = useRef(content);
  const oldTemplateId = useRef(templateId);

  useEffect(() => {
    if (
      ref.current &&
      (ref.current.innerHTML === null ||
        ref.current.innerHTML === undefined ||
        ref.current.innerHTML === '' ||
        templateId !== oldTemplateId.current)
    ) {
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

  return (
    <div className={styles.html_editor}>
      <EditorToolbar>
        <EditorToolbarFileAttachment onAttachment={uploadAttachedFile} />
      </EditorToolbar>
      {/* @ts-ignore */}
      <ReactShadowRoot>
        <div
          contentEditable="true"
          ref={ref}
          onInput={debouncedHandleInput}
          className={salesforceResetStyles.salesforceReset}
          style={{ minHeight: '300px', border: '1px solid #ccc', padding: '10px' }}
        />
      </ReactShadowRoot>
    </div>
  );
};

export const SmartEmailModalComponent = ({
  handleRedirect,
  scheduleEmailRedirect,
  emailSettingsRedirect,
  isExtension,
  userSettings,
}: EmailModalProps) => {
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
    setTooltipVisible,
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
      editorMode: defaultEditorMode = 'AST',
    },
    onSave,
  } = useMinimizableModal<EmailMinimizableData>(id);

  const company = useMemo(() => (minimizedCompany ? minimizedCompany : contextCompany), [
    minimizedCompany,
    contextCompany,
  ]);
  const [confirmModal, setConfirmModal] = useState<boolean>(undefined);
  const [saveWithSlotsModal, setSaveWithSlotsModal] = useState({
    isOpen: false,
    callback: () => {},
  });
  const [autofilledTemplate, setAutofilledTemplate] = useState<string>(undefined);

  const [editorMode, setEditorMode] = useState<EditorMode>(defaultEditorMode);
  const [htmlContent, setHtmlContent] = useState<string>(savedData?.htmlContent || '');

  const [sending, setSending] = useState<boolean>(false);
  const { data: signatures, signature, setConnectionId, getSignatureConnection } = useSignatures();
  const [isEditorDisabled, setIsEditorDisabled] = useState(isScheduledEmail);
  const [templateMediaFiles, setTemplateMediaFiles] = useState<MediaFile[]>();
  const {
    attachedFiles,
    removeAttachedFile,
    uploadAttachedFile,
    syncAttachments,
  } = useAttachedFiles();
  const { connections } = useEmailConnections();

  const [subjectEditor, setSubjectEditor] = useState<MyEditor>(null);
  const [bodyEditor, setBodyEditor] = useState<MyEditor>(null);

  const autoInsertSignaturePermission = userSettings?.autoInsertSignaturePermission;
  const enabledAutoInsertSignature =
    autoInsertSignaturePermission === PermissionType.ENABLED ||
    autoInsertSignaturePermission === PermissionType.FORCED;

  const selectSignaturesPermission = userSettings?.selectSignaturesPermission;
  const enabledSelectSignature =
    selectSignaturesPermission === PermissionType.ENABLED ||
    selectSignaturesPermission === PermissionType.FORCED;

  const emailConnections =
    connections?.list.map((x: any) => ({ value: x?.email, label: x?.email })) || [];
  const aliasConnections =
    connections?.list
      .flatMap((x: any) => x.nylasAliases)
      .map((alias: any) => ({ value: alias.emailAlias, label: alias.emailAlias })) || [];
  const emailsFrom = [...emailConnections, ...aliasConnections];
  const [showCc, setShowCc] = useState(!!(!!defaultCcEmail && defaultCcEmail.length));
  const [scheduleEmailModalOpen, setScheduleEmailModalOpen] = useState(false);
  const [missingVariable, setMissingVariable] = useState<boolean>(false);
  const { createToast } = useToasts();
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const { save, has } = useUserHelpers();
  const lastVisitedTab = useRef<SmartEmailTab>(SmartEmailTab.PAST_ACTIVITY);

  const togglePreview = () => {
    setSlotsData(prevData => {
      return { ...prevData, calendarSlotsVisible: false };
    });
    if (selectedTab !== SmartEmailTab.PREVIEW) {
      lastVisitedTab.current = selectedTab;
    }
    setSelectedTab(
      selectedTab === SmartEmailTab.PREVIEW ? lastVisitedTab.current : SmartEmailTab.PREVIEW,
    );
  };

  const leadEmailFieldId = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.EMAIL)?.id;
  const activeLeadEmail =
    (activeLead && getValueFromLogicRole(activeLead, LEAD_FIELDS_LOGIC_ROLE.EMAIL, true)) ||
    // @ts-ignore
    activeLead?.email ||
    activeLead?.[leadEmailFieldId];
  const companyEmailFieldsId = dataModel
    ?.findFieldsByTypeAndBobjectType(BobjectTypes.Company, 'EMAIL')
    ?.map(field => field.id);
  const activeCompanyEmail =
    company &&
    (company?.fields
      ? company?.fields?.filter(field => field?.value && field?.type === 'EMAIL')[0]?.value
      : companyEmailFieldsId.map(id => company?.rawBobject?.[id])?.[0]);
  const activityEmailLead = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_LEAD);
  const defaultEmail = getDefaultEmail(
    mode,
    activityEmailLead,
    activeBobject?.id?.typeName === BobjectTypes.Company
      ? activeCompanyEmail || activeLeadEmail
      : activeLeadEmail,
  );
  const isModeReply = mode === 'REPLY';
  let activityMessageBody = getValueFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY,
  );
  if (
    activityMessageBody?.includes('"type":"p"') &&
    typeof activityMessageBody === 'string' &&
    typeof JSON.parse(activityMessageBody) === 'object'
  ) {
    activityMessageBody = serialize(activityMessageBody);
  }
  let activityMessageSubject =
    getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT, true) ||
    'No subject';
  if (
    activityMessageSubject?.includes('"type":"p"') &&
    typeof activityMessageSubject === 'string' &&
    typeof JSON.parse(activityMessageSubject) === 'object'
  ) {
    activityMessageSubject = removeHtmlTags(serialize(activityMessageSubject));
  }
  const connection = getActivityConnection({ activity, mode, connections });
  const activityEmail = connection?.email;
  const activityDateTime = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const activityDirection = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION)
    ?.valueLogicRole;
  const isIncomingActivity = activityDirection === DIRECTION_VALUES_LOGIC_ROLE.INCOMING;
  const hasConnections = connections ? connections.list && connections.list.length > 0 : false;
  const canMinimize = isScheduledEmail ? !isEditorDisabled : true;
  const { t } = useTranslation();

  const { attachedLinks, removeAttachedLink } = useAttachedLinks();

  const oldTemplateId = useRef(null);

  const contactBobject =
    pageBobjectType === BobjectTypes.Company
      ? company
      : pageBobjectType === BobjectTypes.Opportunity
      ? opportunity
      : activeLead;
  const suggestedTemplates = useSuggestedTemplates(
    contactBobject,
    {
      company,
      opportunities,
      leads,
    },
    'Emails' as PlaybookTab,
  );

  const subjectPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: true,
    marks: false,
    elements: false,
    images: false,
    autoReplace: false,
    singleLine: true,
    replaceParagraphs: true,
  });

  const bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    replaceTemplateVariables: true,
    replaceMeetingLinks: true,
    rawHTMLBlock: true,
    replyHistory: true,
    snippets: true,
  });

  const defaultValues = savedData || {
    to: getDefaultToEmail(pageBobjectType, defaultToEmail, defaultEmail),
    cc: defaultCcEmail ? defaultCcEmail : [],
    bcc: defaultBccEmail ? defaultBccEmail : [],
    emailFrom: hasConnections ? activityEmail : 'no-connections',
    templateId: template ? template.id : null,
    subject: isModeReply
      ? createParagraph(
          /^re:/i.test(activityMessageSubject)
            ? activityMessageSubject
            : `RE: ${activityMessageSubject}`,
        )
      : template
      ? deserialize(template?.subject, {
          format: template?.format,
          plugins: subjectPlugins,
        })
      : createParagraph(''),
    body:
      isModeReply || !template?.content
        ? createParagraph('')
        : deserialize(template?.content, {
            format: template?.format,
            plugins: bodyPlugins,
          }),
    attachments: [],
  };

  const methods = useForm<FormValues>({
    defaultValues,
    mode: 'all',
  });
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    formState: { isDirty, isSubmitting, isValid },
  } = methods;
  const formAttachments = watch('attachments');
  const templateId = watch('templateId');
  const emailFrom = watch('emailFrom');
  const emailTo = watch('to');

  const [isThereARealBody, setThereARealBody] = useState(true);

  const isEditorRegistered = !!bodyEditor;
  const inputContextProps = useSmartEmailModal();
  const editorsStored = subjectEditor && bodyEditor;

  /* Form fields */
  // @ts-ignore
  const {
    field: { ref: emailFromRef, ...emailFromProps },
  } = useController({
    control,
    name: 'emailFrom',
    rules: {
      required: true,
    },
  });

  const {
    field: { ref: emailCc, ...emailCcProps },
  } = useController({
    control,
    name: 'cc',
    // @ts-ignore
    defaultValue: defaultCcEmail ? defaultCcEmail : [],
    rules: {
      validate(emails: Array<string>) {
        return emails.every(isEmail);
      },
    },
  });

  const {
    field: { ref: emailBcc, ...emailBccProps },
  } = useController({
    control,
    name: 'bcc',
    // @ts-ignore
    defaultValue: defaultBccEmail ? defaultBccEmail : [],
    rules: {
      validate(emails: Array<string>) {
        return emails.every(isEmail);
      },
    },
  });

  const {
    field: { ref: emailToRef, ...emailToProps },
  } = useController({
    control,
    name: 'to',
    // @ts-ignore
    defaultValue: getDefaultToEmail(pageBobjectType, defaultToEmail, defaultEmail),
    rules: {
      validate(emails: Array<string>) {
        return emails?.length > 0 && emails.every(isEmail);
      },
    },
  });

  const {
    field: { ref: templateSelectRef, ...templateSelectProps },
  } = useController({
    control,
    name: 'templateId',
  });

  const prepareEmail = (data: FormValues, activeBobject: Bobject | ExtensionBobject): Email => {
    // This allows a different SDR to reply an email
    const isReply = isModeReply && data.emailFrom === activityEmail;
    //if modal has reloaded get values from form
    const attachmentIds = attachedFiles?.map(file => file.id);

    const body =
      editorMode === 'HTML'
        ? htmlContent
        : JSON.stringify(
            deserialize(JSON.stringify(prepareBodyToBeSerialized(attachedLinks, data.body)), {
              format: 'AST',
              plugins: bodyPlugins,
            }),
          );

    const subjectSerialized = deserialize(JSON.stringify(data?.subject), {
      format: 'AST',
      plugins: subjectPlugins,
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
              startDateTime: item.startTime.format('iso-utc'),
            });
          }
        }
      }
    }

    const subjectText = removeHtmlTags(serialize(subjectSerialized, { plugins: subjectPlugins }));
    return {
      nameFrom: null,
      nameReplayTo: null,
      emailReplayTo: isReply ? data.emailFrom : '',
      emailFrom: data.emailFrom,
      replyToMessageId: isReply ? getTextFromLogicRole(activity, 'ACTIVITY__EMAIL_UID') : null,
      to: data.to,
      cc: data.cc || [],
      bcc: data.bcc || [],
      attachmentIds,
      templateId: data.templateId,
      format: editorMode,
      subject: editorMode !== 'HTML' ? JSON.stringify(createParagraph(subjectText)) : subjectText,
      body: body,
      calendarSlots: calendarSlotsData,
      slotsTimezone: slotsData?.selectedTimezone,
      meetingTitle: slotsData?.meetingTitle,
      bobjectId: activeBobject?.id?.value,
    };
  };

  const sendEmail = async (data: FormValues) => {
    setSending(true);
    try {
      const email = prepareEmail(data, activeBobject);
      const response = await api.post('/messaging/emails', email);

      if (response.status === 201) {
        setSending(false);
        mixpanel.track(isBlankEmail ? 'NEW_BLANK_EMAIL_SENT' : `TEMPLATE_FROM_BB_${mode}`, {
          'Template Id': data?.templateId,
          'To Emails': data.to?.length,
        });
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SEND_EMAIL_ON_EMAIL_MODAL);
        createToast({
          type: 'success',
          message: t('emailModal.toasts.success'),
        });
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Activity },
          }),
        );
        save(UserHelperKeys.SEND_YOUR_FIRST_EMAIL);
        closeModal();
        onSave?.();
      } else if (response.status >= 400) {
        setSending(false);
        mixpanel.track('EMAIL_SENT_WARNINGS', {
          'Template Id': data?.templateId,
          'To Emails': data.to?.length,
        });
        createToast({
          type: 'warning',
          message: t('emailModal.toasts.delay'),
        });
      }
    } catch (e) {
      setSending(false);
      mixpanel.track('EMAIL_SENT_FAILED', {
        'Template Id': data?.templateId,
        'To Emails': data.to?.length,
      });

      // errorType: "UNABLE_TO_REPLACE_VARIABLES:Sender:MobilePhone"
      if (
        e?.response &&
        e.response?.status === 500 &&
        e.response?.data?.errorType &&
        e.response?.data?.errorType.includes('UNABLE_TO_REPLACE_VARIABLES')
      ) {
        // Get the variable name from the error message after UNABLE_TO_REPLACE_VARIABLES:
        const errorVariable = e.response?.data?.errorType.substring(
          e.response?.data?.errorType.indexOf(':') + 1,
        );
        createToast({
          type: 'error',
          message: t('emailModal.toasts.errorVariable', { variable: errorVariable }),
        });
      } else if (e?.response && e.response?.status === 413) {
        createToast({
          type: 'error',
          message: t('emailModal.toasts.fileExceedSize'),
        });
      } else if (e?.response && e.response?.status === 401) {
        createToast({
          type: 'error',
          message: t('emailModal.toasts.disconnected'),
        });
      } else {
        createToast({
          type: 'error',
          message: t('emailModal.toasts.error'),
        });
      }
    }
  };

  const scheduleEmail = ({ date, timezone }: { date: Date; timezone: string }) => async (
    data: FormValues,
  ) => {
    try {
      setScheduleEmailModalOpen(false);

      const email = prepareEmail(data, activeBobject);
      const response = await api.post('/messaging/scheduledEmails', {
        scheduledTime: date,
        email,
      });

      if (response.status === 201) {
        const formattedDate = spacetime(date, timezone)
          .format('{date-ordinal} {month-short}, {time-24} in {timezone}')
          .replace('_', ' ')
          .replace(/\w+\//, '');

        createToast({
          position: 'bottom-center',
          type: 'action',
          duration: 7500,
          message: t('emailModal.toasts.scheduled', {
            date: formattedDate,
          }),
          actions: scheduleEmailRedirect
            ? [
                {
                  text: t('emailModal.toasts.scheduleAction'),
                  color: 'tomato',
                  onClick: scheduleEmailRedirect,
                },
              ]
            : [],
        });
        closeModal();
        setTimeout(() => {
          onSave?.();
        }, 1000);
      } else {
        createToast({
          position: 'top-right',
          type: 'error',
          message: t('emailModal.toasts.scheduledError'),
        });
      }
    } catch (error) {
      createToast({
        position: 'top-right',
        type: 'error',
        message: t('emailModal.toasts.scheduledError'),
      });
    }
  };

  const cancelScheduledEmail = async () => {
    try {
      setIsEditorDisabled(false);
      await api.delete(`/messaging/scheduledEmails/${taskId}/cancel`, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        data: {},
      });
      createToast({
        type: 'success',
        message: t('emailModal.toasts.scheduledCancelled'),
        position: 'top-right',
      });
    } catch (e) {
      setIsEditorDisabled(true);
      createToast({
        type: 'error',
        message: t('emailModal.toasts.scheduledCancelledError'),
        position: 'top-right',
      });
    }
  };

  const markEmailAsRead = () => {
    api
      .patch(`/bobjects/${activity?.id?.value}/raw`, {
        contents: {
          [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES,
        },
        params: {},
      })
      .then(() => {
        closeModal();
      });
  };

  /*  const emailTitle = useMemo(() => {
    if (!subject) {
      return t('emailModal.subjectNewEmail');
    }
    const subjectWithoutVariables = deserialize(JSON.stringify(subject), {
      format: 'AST',
      plugins: subjectPlugins,
    });
    return removeHtmlTags(
      serialize(subjectWithoutVariables, { format: 'AST', plugins: subjectPlugins }),
    );
  }, [subject]);*/

  const replaceBodyWithTemplate = (template: MessagingTemplate) => {
    //@ts-ignore
    const { content, body, format, mediaFiles } = template;
    let rawNewBody;
    let emailTemplateBody;

    if (format === 'HTML') {
      setHtmlContent(content || body);
      return;
    } else {
      rawNewBody = deserialize(content || body, {
        format: format,
        plugins: bodyPlugins,
      });

      emailTemplateBody = JSON.parse(JSON.stringify(rawNewBody));
      const isSignatureAlreadyInserted = rawNewBody.some(
        (node: any) => node.type === 'raw-html-block',
      );

      if (enabledAutoInsertSignature && !isSignatureAlreadyInserted && signature?.signature) {
        emailTemplateBody.push(createParagraph('')[0]);
        emailTemplateBody.push(createRawHTMLBlock(bodyEditor, signature.signature));
      }
    }

    const isReplyHistoryAlreadyInserted = rawNewBody.some(
      (node: any) => node.type === 'reply-history',
    );
    if (activityMessageBody && !isReplyHistoryAlreadyInserted) {
      emailTemplateBody.push(createParagraph('')[0]);
      emailTemplateBody.push(
        createReplyHistory(bodyEditor, {
          html: activityMessageBody,
          sentAt: activityDateTime,
          sentBy: isIncomingActivity ? activityEmailLead : activityEmail,
        }),
      );
    }

    setTemplateMediaFiles(mediaFiles);
    resetEditorChildren(bodyEditor);
    insertElements(bodyEditor, emailTemplateBody, { at: [0] });
    select(bodyEditor, [0]);
    setValue('body', emailTemplateBody);
  };

  const replaceSubjectWithTemplate = (template: MessagingTemplate) => {
    const { subject, format } = template;

    let emailTemplateSubject;
    if (subject && format !== 'HTML') {
      if (subject.includes('"type"')) {
        const rawNewSubject = deserialize(subject, {
          format: format,
          plugins: subjectPlugins,
        });
        emailTemplateSubject = JSON.parse(JSON.stringify(rawNewSubject));
      } else {
        emailTemplateSubject = subject;
      }
    } else {
      if (format === 'HTML') {
        emailTemplateSubject = createParagraph(subject);
      } else {
        emailTemplateSubject = subject;
      }
    }

    if (!isModeReply) {
      resetEditorChildren(subjectEditor);
      insertElements(subjectEditor, emailTemplateSubject, { at: [0] });
      setValue('subject', emailTemplateSubject, { shouldValidate: true });
    }
  };

  const replaceWithTemplate = (template: MessagingTemplate, isEditorDisabled: boolean) => {
    if (template && !isEditorDisabled) {
      setEditorMode(template?.format || 'AST');

      //@ts-ignore
      if (bodyEditor && template?.content) replaceBodyWithTemplate(template);

      if (subjectEditor && template?.subject) replaceSubjectWithTemplate(template);

      if (bodyEditor && subjectEditor) {
        bodyEditor.history = {
          undos: [],
          redos: [],
        };
        subjectEditor.history = {
          undos: [],
          redos: [],
        };
        templateSelectProps.onChange(template?.id);
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
      htmlContent,
    };
    const title = removeHtmlTags(
      serialize(methods.getValues('subject'), { format: 'AST', plugins: subjectPlugins }),
    );
    minimize({ data: { savedData: minimizeSavedData, editorMode }, title });
  };

  const handleSaveSnippet = async (node: string) => {
    await setSelectedTemplate(null);
    // @ts-ignore
    setSelectedTemplate({
      content: node,
      type: TEMPLATE_TYPES.SNIPPET,
      edit: true,
    } as SmartEmailContext['selectedTemplate']);
    setSelectedTab(SmartEmailTab.TEMPLATES);
  };

  const handleSaveTemplate = async () => {
    const { body, subject } = getValues();
    await setSelectedTemplate(null);
    const { slotsNode } = getSlotsNodePosition(bodyEditor);
    if (slotsNode) {
      setSaveWithSlotsModal({
        isOpen: true,
        callback: () => {
          setSelectedTemplate({
            content: body.filter(
              node =>
                node.type !== 'raw-html-block' &&
                node.type !== 'reply-history' &&
                node.type !== 'slots-form',
            ),
            subject,
            type: TEMPLATE_TYPES.EMAIL,
            edit: true,
          } as SmartEmailContext['selectedTemplate']);
          setSelectedTab(SmartEmailTab.TEMPLATES);
          setSaveWithSlotsModal({ isOpen: false, callback: undefined });
        },
      });
    } else {
      setSelectedTemplate({
        content: body.filter(
          node => node.type !== 'raw-html-block' && node.type !== 'reply-history',
        ),
        subject,
        type: TEMPLATE_TYPES.EMAIL,
        edit: true,
      } as SmartEmailContext['selectedTemplate']);
      setSelectedTab(SmartEmailTab.TEMPLATES);
    }
  };

  function handleEvent(e) {
    if (e.key === 'Tab') {
      e.stopPropagation();
      const focusedEditor = [subjectEditor, bodyEditor][focusedRef.current] as PlateEditor;
      const focusPoint = getFocusPoint(focusedEditor, focusedRef.current);
      setTimeout(() => focusEditor(focusedEditor, focusPoint), 0);
      updateFocusedIndex();
    }
  }

  const memoedFunction = useCallback(handleEvent, [editorsStored]);

  useEffect(() => {
    if (signatures?.length > 0 && emailFrom) {
      const connection = connections.list.find(connection => connection.email === emailFrom);
      setConnectionId(connection?.id);
    }
  }, [connections, signatures, emailFrom]);

  useEffect(() => {
    if (bodyEditor) {
      const connection = connections.list.find(connection => connection.email === emailFrom);

      getSignatureConnection(connection?.id).then(signature => {
        if (signature && enabledAutoInsertSignature) {
          replaceHTMLBlock(bodyEditor, 'signature', ELEMENT_RAW_HTML_BLOCK, signature?.signature);
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
        activeBobject: activeLead || company,
      });
    }
    if (isExtension) {
      removeScrollOfBox();
    }
    if (Array.isArray(formAttachments)) syncAttachments(formAttachments);
    if (mode === 'REPLY') setSelectedActivity(activity);
    return recoverScrollOfBox;
  }, []);

  useEffect(() => {
    if ((!emailFrom || emailFrom === 'no-connections') && connections?.defaultConnection) {
      setValue('emailFrom', connections?.defaultConnection);
    }
  }, [connections]);

  useEffect(() => {
    // Insert user email signature
    if (signature && isEditorRegistered && editorMode === 'AST') {
      const newBody = JSON.parse(JSON.stringify(defaultValues.body));
      const isSignatureAlreadyInserted = newBody.some(
        (node: any) => node.type === 'raw-html-block',
      );
      const isReplyHistoryAlreadyInserted = newBody.some(
        (node: any) => node.type === 'reply-history',
      );
      let changed = false;
      if (!hasBeenMinimized) {
        if (enabledAutoInsertSignature && !isSignatureAlreadyInserted && signature?.signature) {
          changed = true;
          newBody.push(createParagraph('')[0]);
          newBody.push(createRawHTMLBlock(bodyEditor, signature.signature));
        }
        if (activityMessageBody && !isReplyHistoryAlreadyInserted) {
          const activityMessageBodyWithoutPx = activityMessageBody.replace(
            /<[^>]+src="https:(\/\/nyl\.as|.*.nylas.com).*[^>]*>/g,
            '',
          );
          changed = true;
          newBody.push(createParagraph('')[0]);
          newBody.push(
            createReplyHistory(bodyEditor, {
              html: activityMessageBodyWithoutPx,
              sentAt: activityDateTime,
              sentBy: isIncomingActivity ? activityEmailLead : activityEmail,
            }),
          );
        }
      }
      if (changed) {
        resetEditorChildren(bodyEditor);
        insertElements(bodyEditor, newBody);
        select(bodyEditor, [0]);

        setValue('body', newBody, { shouldDirty: false });
      }
    }
  }, [
    signature,
    isEditorRegistered,
    activityMessageBody,
    activityEmailLead,
    activityEmail,
    isIncomingActivity,
  ]);

  useEffect(() => {
    // @ts-ignore
    if (connections?.loaded && activityEmail) {
      setValue('emailFrom', activityEmail);
    }
    // @ts-ignore
  }, [connections?.loaded, activityEmail]);

  useEffect(() => {
    if (templateMediaFiles) {
      syncAttachments(templateMediaFiles);
    }
  }, [templateMediaFiles]);

  useEffect(() => {
    // sync attachments from minimized template
    if (template?.mediaFiles?.length > 0 && !templateMediaFiles) {
      syncAttachments(template.mediaFiles);
      setTemplateMediaFiles(template.mediaFiles);
    }
  }, [template]);

  useEffect(() => {
    if (templateId && editorMode === 'AST') {
      const bodyDeserialized = deserialize(JSON.stringify(defaultValues.body), {
        format: 'AST',
        plugins: bodyPlugins,
      });
      const subjectDeserialized = deserialize(JSON.stringify(methods.getValues('subject')), {
        format: 'AST',
        plugins: subjectPlugins,
      });
      if (
        isMissingVariable(bodyDeserialized, false) ||
        isMissingVariable(subjectDeserialized, false)
      ) {
        setMissingVariable(true);
      } else {
        setMissingVariable(false);
      }
    }
  }, [templateId]);

  useEffect(() => {
    if (
      !hasBeenMinimized &&
      bodyEditor &&
      subjectEditor &&
      template?.id &&
      oldTemplateId.current !== template.id
    ) {
      // @ts-ignore
      replaceWithTemplate(template, isEditorDisabled);
      oldTemplateId.current = template.id;
    }

    updateReplaceMethod(template => replaceWithTemplate(template, isEditorDisabled));
  }, [
    bodyEditor,
    subjectEditor,
    signature,
    activityMessageBody,
    activityMessageSubject,
    mode,
    template,
    isEditorDisabled,
  ]);

  useEffect(() => {
    if (editorMode === 'HTML') {
      window.removeEventListener('keydown', memoedFunction);
      return;
    }
    if (!bodyEditor || !subjectEditor) return;
    window.addEventListener('keydown', memoedFunction);
    return () => {
      window.removeEventListener('keydown', memoedFunction);
    };
  }, [subjectEditor, bodyEditor, editorMode]);

  useEffect(() => {
    if (
      subjectEditor &&
      bodyEditor &&
      !defaultValues?.templateId &&
      suggestedTemplates?.length === 1
    ) {
      replaceWithTemplate(suggestedTemplates[0], isEditorDisabled);
      setAutofilledTemplate(suggestedTemplates[0].taskTitle);
    }
  }, [
    suggestedTemplates?.length,
    subjectEditor,
    bodyEditor,
    defaultValues?.templateId,
    isEditorDisabled,
  ]);

  const PreviewEmailButton = () => (
    <Button
      variant="secondary"
      size="small"
      iconLeft={isOpenPreview ? 'eyeOff' : 'eye'}
      onClick={togglePreview}
      uppercase={false}
    >
      {t('emailModal.preview')}
    </Button>
  );

  return (
    <>
      <FormProvider {...methods}>
        <Modal open={open} onClose={handleClose} width={1106} onOverlayClick={handleMinimize}>
          <div className={styles.modal_email_container}>
            <div className={styles.container_email}>
              <div className={styles._header__container}>
                <div className={styles._header__info}>
                  <div className={styles._header_companyName} onClick={handleRedirect}>
                    <IconButton name="company" size={24} />
                    <Text size="m" weight="regular" color="bloobirds">
                      {getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME) || ''}
                    </Text>
                  </div>
                  <Text size="s" weight="medium">
                    {t('emailModal.subjectNewEmail')}
                  </Text>
                </div>
                <div className={styles._header_icons}>
                  {canMinimize && <IconButton name="minus" size={20} onClick={handleMinimize} />}
                  <IconButton name="cross" size={24} onClick={handleClose} />
                </div>
              </div>

              {!hasConnections && (
                <Banner icon="disconnectOutline" type="warning">
                  <Trans i18nKey="emailModal.emptyConnection">
                    You need a connected email to send one-to-one emails from Bloobirds. Go to
                    <BannerLink onClick={emailSettingsRedirect}>Email settings</BannerLink> to
                    connect.
                  </Trans>
                </Banner>
              )}
              {isScheduledEmail && !isFailedAutomation && isEditorDisabled && (
                <Banner type="warning" icon="clock">
                  <Trans
                    i18nKey="emailModal.emailScheduled"
                    values={{
                      date: spacetime(scheduledDate, 'UTC').format(
                        '{day} {date-ordinal} at {time-24}',
                      ),
                    }}
                    components={[
                      <BannerLink key="1" onClick={cancelScheduledEmail}>
                        {' '}
                      </BannerLink>,
                    ]}
                  ></Trans>
                </Banner>
              )}
              {isScheduledEmail && isFailedAutomation && isEditorDisabled && (
                <Banner type="error" icon="cross">
                  An error occurred and your email could not be sent{' '}
                  <BannerLink onClick={cancelScheduledEmail}>
                    <Text htmlTag="span" size="s" color="bloobirds">
                      Edit & schedule again
                    </Text>
                  </BannerLink>
                </Banner>
              )}
              <div className={styles._modal_body_container}>
                <div className={styles._modal_body}>
                  <form
                    onSubmit={() => {
                      if (selectedTab === SmartEmailTab.CREATE_TASK && taskTitle) {
                        setConfirmModal(true);
                      } else {
                        handleSubmit(sendEmail)();
                      }
                    }}
                    className={styles._container_ast}
                    data-intercom="send-email-modal"
                  >
                    <EmailModalRow isDisabled={isEditorDisabled}>
                      <Text size="m" color="verySoftPeanut">
                        {t('emailModal.from')}
                      </Text>
                      <ClearSelect
                        {...emailFromProps}
                        options={Array.from(new Set(emailsFrom))}
                        emptyMessage={t('emailModal.noEmailsConnectedYet')}
                      />
                      <div className={styles.inputControls}>
                        {!showCc && (
                          <Button size="small" variant="clear" onClick={() => setShowCc(true)}>
                            {t('emailModal.cc')}
                          </Button>
                        )}
                      </div>
                    </EmailModalRow>
                    {showCc && (
                      <>
                        <EmailModalRow isDisabled={isEditorDisabled}>
                          <Text size="m" color="verySoftPeanut">
                            {t('emailModal.cc')}
                          </Text>
                          <RecipientSearchInput
                            id="emailCc-no-contacts"
                            emails={emailCcProps.value?.filter(
                              e => e !== connections?.defaultConnection,
                            )}
                            onChange={contacts => {
                              emailCcProps.onChange(contacts.map(x => x?.email));
                            }}
                            contextProps={inputContextProps}
                          />
                        </EmailModalRow>
                        <EmailModalRow isDisabled={isEditorDisabled}>
                          <Text size="m" color="verySoftPeanut">
                            {t('emailModal.bcc')}
                          </Text>
                          <RecipientSearchInput
                            id="emailBcc-no-contacts"
                            emails={emailBccProps.value?.filter(
                              e => e !== connections?.defaultConnection,
                            )}
                            onChange={contacts => {
                              emailBccProps.onChange(contacts.map(x => x?.email));
                            }}
                            contextProps={inputContextProps}
                          />
                        </EmailModalRow>
                      </>
                    )}
                    <EmailModalRow isDisabled={isEditorDisabled}>
                      <Text size="m" color="verySoftPeanut">
                        {t('emailModal.to')}
                      </Text>
                      <RecipientSearchInput
                        emails={emailToProps.value?.filter(
                          e => e !== connections?.defaultConnection,
                        )}
                        id="emailTo-no-contacts"
                        onChange={contacts => {
                          emailToProps.onChange(contacts.map(x => x?.email?.toLowerCase()));
                        }}
                        contextProps={inputContextProps}
                      />
                    </EmailModalRow>
                    <EmailModalRow
                      callback={() => (focusedRef.current = 0)}
                      isDisabled={isEditorDisabled}
                    >
                      <SubjectEditor
                        setSubjectEditor={setSubjectEditor}
                        validator={() => template?.format === 'HTML'}
                        defaultValue={hasBeenMinimized && savedData?.subject}
                      >
                        {editor => (
                          <>
                            {editor}
                            {subjectEditor && (
                              <FloatingTemplateVariable editor={subjectEditor} disableEmpty />
                            )}
                          </>
                        )}
                      </SubjectEditor>
                    </EmailModalRow>
                    <div
                      id="emailBody"
                      className={styles._editor__container}
                      data-intercom="send-email-modal-body"
                      onClick={() => (focusedRef.current = 1)}
                    >
                      {isEditorDisabled && <div className={styles.disabledOverlay} />}
                      {editorMode === 'HTML' ? (
                        <HTMLEditor
                          content={htmlContent}
                          onContentChange={setHtmlContent}
                          uploadAttachedFile={uploadAttachedFile}
                          templateId={templateId}
                        />
                      ) : (
                        <BodyEditor
                          setBodyEditor={setBodyEditor}
                          handleSaveSnippet={handleSaveSnippet}
                          //attachedLinks={attachedLinks}
                          defaultValue={hasBeenMinimized && savedData?.body}
                        >
                          {editor => (
                            <>
                              <EditorToolbar>
                                <EditorToolbarControlsSection color="white" />
                                <EditorToolbarFontStylesSection color="white" enableChangeSize />
                                <EditorToolbarTextMarksSection
                                  color="white"
                                  editor={bodyEditor}
                                  enableChangeColor
                                />
                                <EditorToolbarListsSection color="white" />
                                <EditorToolbarSection>
                                  {hasSnippetsEnabled && (
                                    <EditorToolbarSnippet
                                      onClick={() => {
                                        setSelectedTab(SmartEmailTab.TEMPLATES);
                                        setPlaybookTab(PlaybookTab.SNIPPETS);
                                      }}
                                    />
                                  )}
                                  <EditorToolbarMeetingLink editor={bodyEditor} />
                                  <EditorToolbarFileAttachment onAttachment={uploadAttachedFile} />
                                  <EditorToolbarImage editor={bodyEditor} />
                                  <EditorToolbarTemplateVariable disableEmpty editor={bodyEditor} />
                                </EditorToolbarSection>
                                {hasTimeSlotsEnabled && (
                                  <>
                                    <EditorToolbarSection>
                                      <EditorToolbarTimeSlots
                                        toggleTimeSlots={() => {
                                          setSlotsData((prevSlotsData: SlotsData) => ({
                                            ...prevSlotsData,
                                            calendarSlotsVisible: true,
                                          }));
                                          setSelectedTab(SmartEmailTab.CALENDAR);
                                          mixpanel.track(MIXPANEL_EVENTS.OPEN_CALENDAR_SLOTS);
                                        }}
                                      />
                                    </EditorToolbarSection>
                                    <SlotsDiscoveryTooltip />
                                  </>
                                )}
                                {enabledSelectSignature && (
                                  <EditorToolbarSelectSignatureSection color="white" />
                                )}
                                <div className={styles.show_preview_wrapper}>
                                  <PreviewEmailButton />
                                </div>
                              </EditorToolbar>
                              <MessagingTemplatesButton
                                user={user}
                                value={templateSelectProps.value}
                                onClick={() => {
                                  setSelectedTab(SmartEmailTab.TEMPLATES);
                                  setPlaybookTab(PlaybookTab.EMAILS);
                                  if (selectedTemplate) {
                                    setSelectedTemplate(undefined);
                                  }
                                }}
                                isPlaybookTab={selectedTab === SmartEmailTab.TEMPLATES}
                                autofilledTemplate={autofilledTemplate}
                              />
                              <div className={styles._editor__container_ast}>
                                <FakeDropzone editor={bodyEditor} />
                                {editor}
                              </div>
                            </>
                          )}
                        </BodyEditor>
                      )}
                    </div>
                  </form>
                  <footer className={styles.footer}>
                    {attachedFiles?.length > 0 && (
                      <AttachmentList files={attachedFiles} onDelete={removeAttachedFile} />
                    )}
                    {attachedLinks?.length > 0 && (
                      <AttachmentLinkList files={attachedLinks} onDelete={removeAttachedLink} />
                    )}
                    <div className={styles.footerActions}>
                      <span data-intercom="send-email-modal-action-cancel">
                        {!isSubmitting && !isEditorDisabled && (
                          <Button
                            variant="clear"
                            color="tomato"
                            onClick={handleClose}
                            disabled={isSubmitting}
                          >
                            {t('emailModal.discard')}
                          </Button>
                        )}
                      </span>
                      <div className={styles.footerButtons}>
                        {!isSubmitting && !isEditorDisabled && (
                          <Button
                            onClick={handleSaveTemplate}
                            variant="clear"
                            color="purple"
                            iconLeft="save"
                          >
                            {isThereARealBody
                              ? t('emailModal.saveTemplate')
                              : t('emailModal.createTemplate')}
                          </Button>
                        )}
                        <Button
                          variant="secondary"
                          iconLeft={isSubmitting ? undefined : 'clock'}
                          onClick={handleSubmit(() => setScheduleEmailModalOpen(true))}
                          disabled={
                            isSubmitting ||
                            !hasConnections ||
                            !isValid ||
                            isEditorDisabled ||
                            missingVariable
                          }
                        >
                          {t('emailModal.schedule')}
                        </Button>
                        <span data-intercom="send-email-modal-action-accept">
                          <Button
                            dataTest="sendEmail"
                            onClick={() => {
                              if (selectedTab === SmartEmailTab.CREATE_TASK && taskTitle) {
                                setConfirmModal(true);
                              } else {
                                if (sending) return;
                                handleSubmit(sendEmail)();
                                if (isModeReply) markEmailAsRead();
                              }
                            }}
                            disabled={
                              sending ||
                              isSubmitting ||
                              !hasConnections ||
                              !isValid ||
                              isEditorDisabled ||
                              missingVariable
                            }
                          >
                            {t('emailModal.send')}
                          </Button>
                        </span>
                      </div>
                    </div>
                  </footer>
                </div>
                <SmartEmailHelper
                  error={missingVariable}
                  bodyEditor={bodyEditor}
                  setOpenPreview={setIsOpenPreview}
                  hasAttachments={attachedFiles?.length > 0}
                  hasLinks={attachedLinks?.length > 0}
                  htmlContent={htmlContent}
                  control={control}
                  format={editorMode}
                />
              </div>
            </div>
          </div>
        </Modal>
        {scheduleEmailModalOpen && (
          <ScheduleEmailModal
            emails={emailTo}
            onClose={() => setScheduleEmailModalOpen(false)}
            onSubmit={async ({ date, timezone }) => {
              await handleSubmit(scheduleEmail({ date, timezone }))();
            }}
          />
        )}
        <ConfirmSendModal
          handleClose={() => setConfirmModal(false)}
          onConfirm={() => {
            handleSubmit(sendEmail)();
            setConfirmModal(false);
          }}
          open={confirmModal}
        />
        <SaveWithSlotsModal
          handleClose={() => setSaveWithSlotsModal({ isOpen: false, callback: undefined })}
          onConfirm={saveWithSlotsModal?.callback}
          open={saveWithSlotsModal?.isOpen}
        />
      </FormProvider>
    </>
  );
};
