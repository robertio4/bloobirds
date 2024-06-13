import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ActivityTimelineItem } from '@bloobirds-it/activity-timeline-item';
import { OpenClickedStatistics } from '@bloobirds-it/bobjects';
import { Button, Icon, Spinner, Text, Timeline } from '@bloobirds-it/flamingo-ui';
import {
  useSyncBobjectStatus,
  useBaseSetEmailVariablesValues,
  useMinimizableModals,
} from '@bloobirds-it/hooks';
import { LightAttachmentList } from '@bloobirds-it/light-attachment-list';
import { serialize, useRichTextEditorPlugins } from '@bloobirds-it/rich-text-editor';
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectId,
  BobjectTypes,
  DataModelResponse,
  LEAD_FIELDS_LOGIC_ROLE,
  MessagesEvents,
  MIXPANEL_EVENTS,
} from '@bloobirds-it/types';
import {
  EMAIL_MODE,
  getFieldByLogicRole,
  getReferencedBobject,
  getTextFromLogicRole,
  getValueFromLogicRole,
  isHtml,
  parseEmailPixels,
  removeHtmlTags,
} from '@bloobirds-it/utils';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import { DetailsFooter } from '../../components/detailsFooter/detailsFooter';
import { useEmailThreadActivities } from '../../hooks/useEmailThreadActivities';
import styles from './emailThreadDetail.module.css';

const DetailedActivity = ({ activity }: { activity: Bobject }) => {
  const plugins = useRichTextEditorPlugins({
    rawHTMLBlock: true,
    replyHistory: true,
    keepDivs: true,
  });

  let activityBody = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);
  if (
    activityBody?.includes('"type":"p"') &&
    typeof activityBody === 'string' &&
    typeof JSON.parse(activityBody) === 'object'
  ) {
    activityBody = serialize(activityBody, {
      format: 'AST',
      plugins,
    });
  }
  const cleanedHtmlString = activityBody?.replace(/<style>[\s\S]*?<\/style>/g, '');
  const isHtmlMessage = activityBody && isHtml(activityBody);
  const activityAttachedFiles = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.ATTACHED_FILES,
  );
  const activityAttachments = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.ATTACHMENTS,
  );
  const isIncomingActivity =
    getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION) ===
    ACTIVITY_DIRECTION.INCOMING;
  const ref = useRef();

  const parsedAttachedFiles = activityAttachedFiles && JSON.parse(activityAttachedFiles);
  const parsedAttachments = activityAttachments && JSON.parse(activityAttachments);

  return (
    <div className={styles.htmlBody}>
      {/*@ts-ignore*/}
      {isHtmlMessage ? (
        <div ref={ref} dangerouslySetInnerHTML={{ __html: parseEmailPixels(cleanedHtmlString) }} />
      ) : (
        <div className={clsx(styles._text_message, {})}>
          <Text size="xs">{activityBody}</Text>
        </div>
      )}
      {parsedAttachedFiles && parsedAttachedFiles?.length !== 0 && (
        <LightAttachmentList files={parsedAttachedFiles} betterAttachments={parsedAttachments} />
      )}
      {!isIncomingActivity && (
        <div className={styles.openedClickedElement}>
          <OpenClickedStatistics bobject={activity} size="small" />
        </div>
      )}
    </div>
  );
};

export const EmailThreadDetail = ({
  activity,
  emailThreadId,
  accountId,
  dataModel,
  visibleFooter = true,
  actionsDisabled = false,
  userId,
}: {
  activity: Bobject;
  emailThreadId: string;
  accountId: string;
  dataModel: DataModelResponse;
  visibleFooter?: boolean;
  actionsDisabled?: boolean;
  userId?: string;
}) => {
  const activityId = (activity?.id as unknown) as BobjectId;
  const [selectedActivities, setSelectedActivities] = useState<BobjectId[]>([activityId]);
  const { activities } = useEmailThreadActivities(emailThreadId, accountId);
  const { t } = useTranslation();
  const handleClickRow = (activity: Bobject) => {
    if (selectedActivities?.find(act => act?.value === activity?.id?.value)) {
      setSelectedActivities(selectedActivities?.filter(act => act?.value !== activity?.id?.value));
    } else {
      setSelectedActivities([...selectedActivities, activity?.id]);
    }
  };

  useEffect(() => {
    setSelectedActivities([activity?.id]);
  }, [activity?.id?.value]);

  const activitiesToRender = emailThreadId ? activities : [activity];

  const { bobjectsSync } = useSyncBobjectStatus(
    activitiesToRender?.[0]?.id?.accountId,
    activitiesToRender,
  );

  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const { openMinimizableModal } = useMinimizableModals();
  const activityCompany = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const activityLead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)
    ?.referencedBobject;
  const activityOpportunity = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;

  const emailMetadataString = getValueFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_METADATA,
  );
  const emailMetadata = emailMetadataString ? JSON.parse(emailMetadataString) : {};
  const emailToArray: string[] =
    !!emailMetadata &&
    [emailMetadata.from?.[0]?.email].concat(emailMetadata.to?.map(e => e.email)).filter(Boolean);
  const emailCcArray: string[] = !!emailMetadata && emailMetadata.cc?.map(e => e.email);

  const activityDirection = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);

  const handleOpenEmailModal = async (event, emailTo, emailCc) => {
    event.preventDefault();
    event.stopPropagation();
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_REPLY_FROM_EMAIL_OTO);
    setEmailVariablesValue({
      company: activityCompany,
      lead: activityLead,
      opportunity: activityOpportunity,
    });
    let templateSubject = getValueFromLogicRole(
      activity,
      ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT,
      true,
    );
    if (
      templateSubject?.includes('"type":"p"') &&
      typeof templateSubject === 'string' &&
      typeof JSON.parse(templateSubject) === 'object'
    ) {
      templateSubject = removeHtmlTags(serialize(templateSubject));
    }
    openMinimizableModal({
      type: 'email',
      title: removeHtmlTags(templateSubject),
      data: {
        template: {
          body: '',
          subject: templateSubject || '',
        },
        mode: EMAIL_MODE.REPLY,
        activity,
        company: activityCompany,
        lead: activityLead,
        pageBobjectType: activityLead ? BobjectTypes.Lead : BobjectTypes.Company,
        ...(emailTo ? { defaultToEmail: emailTo.map(email => email?.toLowerCase()) } : {}),
        ...(emailCc ? { defaultCcEmail: emailCc.map(email => email?.toLowerCase()) } : {}),
      },
      onSave: () => {
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Activity },
          }),
        );
      },
    });
  };

  const referenceBobject = getReferencedBobject(activity);

  const assignee =
    getFieldByLogicRole(
      (referenceBobject as unknown) as Bobject,
      LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
      // @ts-ignore
    )?.value || referenceBobject?.assignedTo;

  const assignedToActiveUser = assignee === userId;

  const syncStatus = bobjectsSync?.find(sync => sync?.bobjectId === activity?.id?.objectId)
    ?.syncStatusOk;

  return (
    <div className={styles.container}>
      <div className={styles.emailDetail_container}>
        {!activitiesToRender ? (
          <div className={styles.loading}>
            <Spinner name="loadingCircle" />
          </div>
        ) : (
          <Timeline size="small">
            {activitiesToRender?.map((activity: Bobject, index: number) => {
              const isSelected = selectedActivities
                ?.map(act => act?.value)
                .includes(activity?.id?.value);
              return (
                <div key={activity?.id?.value + '-' + index}>
                  <ActivityTimelineItem
                    activity={activity}
                    key={activity?.id?.value}
                    onClick={handleClickRow}
                    startDisplayDivider={activities?.length > 1 && index !== 0}
                    endDisplayDivider={activities?.length > 1 && index + 1 !== activities?.length}
                    activeHover={!isSelected}
                    extended
                    dataModel={dataModel}
                    alternativeDescription
                    syncStatus={syncStatus}
                  />
                  {selectedActivities?.find(act => act?.value === activity?.id?.value) && (
                    <DetailedActivity activity={activity} />
                  )}
                </div>
              );
            })}
          </Timeline>
        )}
      </div>
      {visibleFooter && (
        <DetailsFooter>
          <>
            {activityDirection === ACTIVITY_DIRECTION.INCOMING && (
              <Button
                variant="secondary"
                onClick={e => handleOpenEmailModal(e, emailToArray, emailCcArray)}
                disabled={actionsDisabled && !assignedToActiveUser}
              >
                <Icon name="replyAll" size={14} />
                {t('activityTimelineItem.item.replyAll')}
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={e =>
                handleOpenEmailModal(
                  e,
                  activityDirection === ACTIVITY_DIRECTION.INCOMING ||
                    (emailToArray && emailToArray?.length === 0)
                    ? undefined
                    : emailToArray,
                  activityDirection === ACTIVITY_DIRECTION.INCOMING ||
                    (emailCcArray && emailCcArray?.length === 0)
                    ? undefined
                    : emailCcArray,
                )
              }
              disabled={actionsDisabled && !assignedToActiveUser}
            >
              <Icon
                name={activityDirection === ACTIVITY_DIRECTION.INCOMING ? 'reply' : 'mail'}
                size={14}
              />
              {activityDirection === ACTIVITY_DIRECTION.INCOMING
                ? t('activityTimelineItem.item.reply')
                : t('activityTimelineItem.item.sendAnother')}
            </Button>
          </>
        </DetailsFooter>
      )}
    </div>
  );
};
