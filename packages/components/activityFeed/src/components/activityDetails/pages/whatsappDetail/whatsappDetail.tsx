import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ColorType,
  createToast,
  Dropdown,
  Icon,
  IconButton,
  IconType,
  Item,
  Section,
  Spinner,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import {
  useActiveMessagingNameFilter,
  useActiveUserId,
  useCustomTasks,
  useMessagingTemplates,
  useWhatsappEnabled,
} from '@bloobirds-it/hooks';
import { getI18nSpacetimeLng } from '@bloobirds-it/internationalization';
import { AttachmentList, useAttachedFiles } from '@bloobirds-it/misc';
import { useEventSubscription } from '@bloobirds-it/plover';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  DataModelResponse,
  LEAD_FIELDS_LOGIC_ROLE,
  LinkedInLead,
  MessagesEvents,
  MessagingTemplate,
  TEMPLATE_TYPES,
  TemplateStage,
  UserPermission,
} from '@bloobirds-it/types';
import {
  api,
  getFieldByLogicRole,
  getReferencedBobject,
  getUserTimeZone,
  getValueFromLogicRole,
  handleAddWhatsAppTemplate,
  redirectToMessagingSettings,
} from '@bloobirds-it/utils';
import clsx from 'clsx';
import debounce from 'lodash/debounce';
import spacetime from 'spacetime';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

import { DetailsFooter } from '../../components/detailsFooter/detailsFooter';
import AutoresizingTextArea from './AutoresizingTextArea';
import styles from './whatsappDetail.module.css';
import { WhatsappDetailedActivity } from './whatsappDetailActivity';

export interface DetailsActivityProps {
  aggregatedConversations: Bobject[];
  items: any[];
  totalMatching: number;
  fetchNextPage: () => void;
  isLoading: boolean;
}

export interface WhatsappMessage {
  caseId?: any;
  caseNumber?: any;
  id: string;
  wid: string;
  direction: 'INCOMING' | 'OUTGOING';
  body: string;
  isoDate: string;
}

export interface GroupedMessages {
  formattedDate: string;
  messages: WhatsappMessage[];
}
export interface MessagesPerDay {
  [formattedDate: string]: GroupedMessages;
}

export interface WhatsappMessages {
  messages: MessagesPerDay;
  isLoading: boolean;
  totalMatching: number;
  fetchNextPage: () => void;
}

function getISODate(date) {
  const sDate = spacetime(date);
  return sDate.format('{year}-{iso-month}-{date-pad}');
}

async function fetchWhatsappMessages(accountId, leadId, customTaskId) {
  const { data } = await api.post(`/bobjects/${accountId}/Activity/search`, {
    query: {
      ACTIVITY__LEAD: [leadId],
      ACTIVITY__TYPE: ['ACTIVITY__TYPE__CUSTOM_TASK'],
      ACTIVITY__CUSTOM_TASK: customTaskId,
    },
    formFields: true,
    pageSize: 200,
    injectReferences: true,
  });
  return data;
}

function formatDate(date, lang, timezone, t): string {
  const now = getI18nSpacetimeLng(lang, new Date(), timezone);
  const sDate = getI18nSpacetimeLng(lang, date, timezone);

  if (sDate.isSame('day', now)) {
    return t('whatsapp.chat.today');
  } else if (sDate.isSame('day', now.subtract(1, 'day'))) {
    return t('whatsapp.chat.yesterday');
  } else if (sDate.isSame('year', now)) {
    const format = lang === 'es' ? '{date} {month-short}' : '{month-short} {date-ordinal}';
    return sDate.format(format);
  } else {
    const format =
      lang === 'es' ? '{date} {month-short}, {year}' : '{month-short} {date-ordinal}, {year}';
    return sDate.format(format);
  }
}

function parseMessages(whatsappMessages, lang, t): MessagesPerDay {
  const timeZone = getUserTimeZone();
  const parsedMessages =
    whatsappMessages?.contents.map(message => {
      const media = getValueFromLogicRole(message, 'ACTIVITY__ATTACHMENTS');
      return {
        id: message.id.value,
        wid: getValueFromLogicRole(message, ACTIVITY_FIELDS_LOGIC_ROLE.WHATSAPP_ID),
        direction:
          getFieldByLogicRole(message, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION)?.valueLogicRole ===
          'ACTIVITY__DIRECTION__INCOMING'
            ? 'INCOMING'
            : 'OUTGOING',
        body: getValueFromLogicRole(message, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY),
        media: media ? JSON.parse(media) : null,
        isoDate: getValueFromLogicRole(message, ACTIVITY_FIELDS_LOGIC_ROLE.TIME),
        hasTranscription:
          getFieldByLogicRole(message, ACTIVITY_FIELDS_LOGIC_ROLE.TRANSCRIPTION)?.valueLogicRole ===
          `${ACTIVITY_FIELDS_LOGIC_ROLE.TRANSCRIPTION}__YES`,
        caseId: getValueFromLogicRole(message, 'ACTIVITY__CASE_ID'),
        caseNumber: getValueFromLogicRole(message, 'ACTIVITY__CASE_NUMBER'),
      };
    }) || [];

  // Then, group them by day
  const groupedByDay: MessagesPerDay = {};
  for (const message of parsedMessages) {
    const isoKey = getISODate(message.isoDate);
    const formattedDateKey = formatDate(message.isoDate, lang, timeZone, t);

    if (!groupedByDay[isoKey]) {
      groupedByDay[isoKey] = {
        formattedDate: formattedDateKey,
        messages: [],
      };
    }
    groupedByDay[isoKey].messages.push(message);
  }

  // Sort the messages by date
  for (const key of Object.keys(groupedByDay)) {
    const messages = groupedByDay[key].messages;
    groupedByDay[key].messages = messages.sort((a, b) => {
      const dateA = spacetime(a.isoDate);
      const dateB = spacetime(b.isoDate);
      return dateA.isBefore(dateB) ? 1 : -1;
    });
  }

  // Sort the keys by date
  return Object.fromEntries(
    Object.entries(groupedByDay).sort((a, b) => {
      const dateA = spacetime(a[0]);
      const dateB = spacetime(b[0]);
      return dateA.isBefore(dateB) ? 1 : -1;
    }),
  );
}

const useWhatsappMessages = (
  channel: 'WHATSAPP' | 'WHATSAPP_BUSINESS',
  leadId: string,
  accountId: string,
): WhatsappMessages => {
  const { getCustomTaskByLogicRole } = useCustomTasks();
  const { i18n, t } = useTranslation();
  const whatsappCustomTask = getCustomTaskByLogicRole(channel);
  const lang = i18n.language;

  //TODO: Handle next page
  const { data: whatsappMessages, mutate } = useSWR(
    [accountId, leadId, whatsappCustomTask?.id],
    () => fetchWhatsappMessages(accountId, leadId, whatsappCustomTask?.id),
  );

  useEventSubscription('data-Activity', data => {
    if (
      (data?.operation === 'CREATE' || data?.operation === 'UPDATE') &&
      data?.relatedLead === leadId
    ) {
      mutate();
    }
  });

  const messages = parseMessages(whatsappMessages, lang, t);

  function fetchNextPage() {
    mutate();
  }

  const isLoading = !whatsappMessages;
  const totalMatching = whatsappMessages?.totalMatching;

  return { messages, isLoading, totalMatching, fetchNextPage };
};

function FileDropzone({ onFilesAdded }) {
  const [dragging, setDragging] = useState(false);
  const [isDropzoneDragged, setDropzoneDragged] = useState(false);

  const [delayedDragging] = useDebounce(dragging, 200);

  const handleDrop = e => {
    e.preventDefault();
    setDragging(false);
    onFilesAdded(e.dataTransfer.files);
  };

  useEffect(() => {
    const handleDrag = e => {
      e.preventDefault();
      setDragging(true);
    };

    const handleDragLeave = e => {
      e.preventDefault();
      setDragging(false);
    };

    window.addEventListener('dragover', handleDrag, false);
    window.addEventListener('dragleave', handleDragLeave, false);
    window.addEventListener('drop', handleDrop, false);

    return () => {
      window.removeEventListener('dragover', handleDrag);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, [onFilesAdded]);

  if (!delayedDragging) {
    return null;
  }

  return (
    <div
      className={clsx(styles.dropzone, { [styles.dropzoneActive]: delayedDragging })}
      onDragLeave={() => {
        setDropzoneDragged(false);
      }}
      onDragOver={() => {
        setDropzoneDragged(true);
      }}
      onDrop={handleDrop}
    >
      <Icon name="upload" size={24} color="melon" />
      Drop your files here
    </div>
  );
}

//TODO EXTRACT THESE !!!!!!!!!
export const NoTemplatesFound = ({
  type = 'linkedin',
}: {
  type: 'linkedin' | 'whatsapp' | 'pitch';
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'templateSelector.noResults' });

  return (
    <div className={styles.noResultFound}>
      <Text color="softPeanut" size="s">
        {t('noResultsFound')}
      </Text>
      <span
        onClick={() => window.open(redirectToMessagingSettings(type), '_blank')}
        style={{ cursor: 'pointer' }}
      >
        <Text color="softPeanut" size="s" decoration="underline">
          {t('addTemplate')}
        </Text>
      </span>
    </div>
  );
};

export const TemplatesList = ({
  templates,
  handleAdd,
  title,
  icon,
  iconColor,
  titleColor,
  infoText,
}: {
  templates: MessagingTemplate[];
  handleAdd: (preview: any, previewContent: string) => void;
  title: string;
  icon: IconType;
  iconColor: ColorType;
  titleColor: ColorType;
  infoText?: string;
}) => {
  return (
    <>
      <Section>
        <div
          className={styles.titleSectionContainer}
          style={{ color: 'var(--' + titleColor + ')' }}
        >
          <Icon name={icon} size={16} color={iconColor} />
          {title}
          {infoText && (
            <Tooltip position="top" title={infoText}>
              <Icon name="info" color="bloobirds" size={12} />
            </Tooltip>
          )}
        </div>
      </Section>
      <div className={styles.templatesContainer}>
        {templates?.map(template => (
          <Item key={template.id} onClick={() => handleAdd(template.id, template.previewContent)}>
            {template.name}
          </Item>
        ))}
      </div>
    </>
  );
};

const WhatsappTemplateSelector = ({ setMessage, disabled, activeBobject }) => {
  const { t, ready } = useTranslation('translation', { keyPrefix: 'templateSelector' });
  const { visible, setVisible, ref } = useVisible(false);
  const userId = useActiveUserId();
  const [, setMessagingTemplateName] = useActiveMessagingNameFilter();

  const { messagingTemplates } = useMessagingTemplates({
    name: null,
    stage: TemplateStage['All'],
    segmentationValues: {},
    onlyMine: false,
    visibility: null,
    type: TEMPLATE_TYPES.WHATSAPP,
    page: 0,
    size: 200,
  });
  const myTemplates = messagingTemplates.filter(template => template.createdBy === userId);
  const teamTemplates = messagingTemplates.filter(template => template.createdBy !== userId);

  useEffect(() => {
    setMessagingTemplateName(null);
  }, []);
  const handleMessagingTemplateNameChange = useCallback(
    debounce(setMessagingTemplateName, 200),
    [],
  );

  const handleAdd = async (id, fallbackContent) => {
    const templateParsed = await handleAddWhatsAppTemplate(
      id,
      fallbackContent,
      activeBobject as LinkedInLead,
      'User name',
    );
    const templateWithoutHtml = templateParsed
      .replace(/<(?:br|\/div|\/p)>/g, '\n')
      .replace(/<.*?>/g, '');
    setMessage(templateWithoutHtml);
  };

  const classnames = clsx(styles.whatsAppContainer, {
    [styles.whatsAppContainerDisabled]: disabled,
  });

  const isLoading = false;
  const actionsDisabled = disabled;
  return ready ? (
    <div className={styles.templateSelectorDropdown}>
      <Dropdown
        width={323}
        ref={ref}
        visible={visible}
        zIndex={20000}
        anchor={
          <div
            id="badgeGroup"
            className={classnames}
            onClick={() => !actionsDisabled && setVisible(!visible)}
          >
            {isLoading || !activeBobject ? (
              <Spinner name="loadingCircle" color="softPeanut" size={12} />
            ) : (
              <Tooltip title={actionsDisabled && t('permissions')} position="top">
                {/* @ts-ignore This takes the styles of whatsapp */}
                <Icon name="bBTemplate" color="bloobirds" />
              </Tooltip>
            )}
          </div>
        }
      >
        <input
          width="100%"
          placeholder={t('search')}
          className={styles.input}
          onChange={e => handleMessagingTemplateNameChange(e.target.value)}
        />
        <>
          {(!myTemplates || myTemplates?.length === 0) &&
          (!teamTemplates || teamTemplates?.length === 0) ? (
            <NoTemplatesFound type="whatsapp" />
          ) : (
            <>
              {myTemplates?.length > 0 && (
                <TemplatesList
                  icon="person"
                  iconColor="softPeanut"
                  titleColor="peanut"
                  title={t('myTemplates')}
                  templates={myTemplates}
                  handleAdd={handleAdd}
                />
              )}
              {teamTemplates?.length > 0 && (
                <TemplatesList
                  titleColor="peanut"
                  iconColor="softPeanut"
                  icon="company"
                  templates={teamTemplates}
                  handleAdd={handleAdd}
                  title={t('teamTemplates')}
                />
              )}
            </>
          )}
        </>
      </Dropdown>
    </div>
  ) : (
    <></>
  );
};

export const WhatsappDetail = ({
  settings,
  activity,
  accountId,
  dataModel,
  activeBobject,
  userId,
  channel,
}: {
  settings: any;
  activity: Bobject;
  activeBobject: Bobject;
  accountId: string;
  dataModel: DataModelResponse;
  visibleFooter?: boolean;
  actionsDisabled?: boolean;
  userId?: string;
  channel: 'WHATSAPP' | 'WHATSAPP_BUSINESS';
}) => {
  const leadId = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  const companyId = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY);
  const { attachedFiles, removeAttachedFile, uploadAttachedFile } = useAttachedFiles();

  const isWhatsappAdmin = settings?.user?.permissions?.includes(
    UserPermission.WHATSAPP_BUSINESS_ADMIN,
  );

  const { messages, isLoading, totalMatching, fetchNextPage } = useWhatsappMessages(
    channel,
    leadId,
    accountId,
  );
  const { t } = useTranslation();
  const hasWhatsappEnabled = useWhatsappEnabled(accountId);
  const visibleFooter = hasWhatsappEnabled && channel == 'WHATSAPP_BUSINESS';
  const messageToSend = useRef('');
  const [isSending, setIsSending] = useState(false);
  const [defaultMessage, setDefaultMessage] = useState('');
  const [resetMessageCounter, setMessageCounter] = useState(0);

  const referenceBobject = getReferencedBobject(activity);
  const assignee =
    getFieldByLogicRole(
      referenceBobject,
      LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
      // @ts-ignore
    )?.value || referenceBobject?.assignedTo;

  const assignedToActiveUser = assignee === userId;
  const phoneTo = getValueFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER,
  );
  const phoneFrom = getValueFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.CALL_USER_PHONE_NUMBER,
  );

  useEffect(() => {
    fetchNextPage();
  }, []);

  const sendWhatsAppMessage = () => {
    if (messageToSend.current != '' || attachedFiles?.length > 0) {
      setIsSending(true);
      api
        .post('/messaging/whatsapp/send', {
          from: phoneFrom,
          to: phoneTo,
          body: messageToSend.current,
          leadId: leadId,
          companyId: companyId,
          mediaIds: attachedFiles?.length > 0 ? attachedFiles.map(af => af.id) : null,
          markConversationAsReported: true,
        })
        .then(() => {
          setDefaultMessage('');
          setMessageCounter(c => c + 1);
          messageToSend.current = '';
          setIsSending(false);
          fetchNextPage();
          window.dispatchEvent(
            new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
              detail: { type: BobjectTypes.Activity },
            }),
          );
          for (const file of attachedFiles) {
            removeAttachedFile(file.id);
          }
        })
        .catch(() => {
          createToast({
            message: t('whatsapp.conversation.errorSending'),
            type: 'error',
          });
          setIsSending(false);
        });
    }
  };

  const handleFilesAdded = files => {
    // Process the files here (e.g., uploading them and attaching to a message)
    if (messageToSend.current === '') {
      messageToSend.current = ' ';
    }
    uploadAttachedFile(Array.from(files), true);
  };

  const hasPermissionToSend =
    isWhatsappAdmin || (assignedToActiveUser && phoneFrom && phoneTo) || true;

  return (
    <div className={styles.container}>
      <FileDropzone onFilesAdded={handleFilesAdded} />
      <div className={styles.activity_container}>
        <WhatsappDetailedActivity
          activity={activity}
          dataModel={dataModel}
          messagesPerDay={messages}
          isLoading={isLoading}
          totalMatching={totalMatching}
          fetchNextPage={fetchNextPage}
        />
      </div>
      {visibleFooter && (
        <>
          {attachedFiles?.length > 0 && (
            <AttachmentList files={attachedFiles} onDelete={removeAttachedFile} />
          )}
          <DetailsFooter color="veryLightPeanut" withPadding={false}>
            <div className={styles.chatBox}>
              <>
                <WhatsappTemplateSelector
                  activeBobject={activeBobject}
                  setMessage={message => {
                    setDefaultMessage(message);
                    messageToSend.current = message;
                  }}
                  disabled={!hasPermissionToSend || isSending}
                />
                <label className={styles.label} htmlFor="file-attachment">
                  <Icon name="paperclip" size={20} color="bloobirds" />
                  <input
                    type="file"
                    id="file-attachment"
                    name="file-attachment"
                    data-test="file-attachment"
                    onChange={event => {
                      if (messageToSend.current === '') {
                        messageToSend.current = ' ';
                      }
                      uploadAttachedFile(Array.from(event.target.files), true);
                      event.target.value = null;
                    }}
                    className={styles.input}
                    multiple={true}
                  />
                </label>
              </>
              <AutoresizingTextArea
                hasPermissionToSend={hasPermissionToSend}
                isSending={isSending}
                defaultMessage={defaultMessage}
                setMessage={message => (messageToSend.current = message)}
                resetMessageCounter={resetMessageCounter}
              />
              <IconButton
                name="deliver"
                disabled={isSending || !hasPermissionToSend}
                color="bloobirds"
                size={24}
                onClick={sendWhatsAppMessage}
              />
            </div>
          </DetailsFooter>
        </>
      )}
    </div>
  );
};
