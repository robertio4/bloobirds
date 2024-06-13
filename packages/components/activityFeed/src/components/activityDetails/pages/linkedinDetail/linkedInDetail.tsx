import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Icon } from '@bloobirds-it/flamingo-ui';
import { getI18nSpacetimeLng } from '@bloobirds-it/internationalization';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  DataModelResponse,
  GroupedLinkedInMessage,
  LEAD_FIELDS_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  generateDatePrefix,
  getDateTimestampString,
  getFieldByLogicRole,
  getReferencedBobject,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '@bloobirds-it/utils';
import { format, isSameDay, isValid, parse } from 'date-fns';
import { TFunction } from 'i18next';

import { DetailsFooter } from '../../components/detailsFooter/detailsFooter';
import { useLinkedinThreads } from '../../hooks/useLinkedInDetails';
import styles from './linkedInDetail.module.css';
import { LinkedInDetailedActivity } from './linkedInDetailActivity';

export interface DetailsActivityProps {
  aggregatedConversations: Bobject[];
  items: any[];
  totalMatching: number;
  fetchNextPage: () => void;
  isLoading: boolean;
}

const addConversationGrouping = (items: Bobject[], t: TFunction, language: string) =>
  items.map((item, index) => {
    const date = new Date(getValueFromLogicRole(item, ACTIVITY_FIELDS_LOGIC_ROLE.TIME));
    const reportedStatus = getFieldByLogicRole(item, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)
      ?.valueLogicRole;
    const next = items[index + 1];
    const nextItemDate =
      next && new Date(getValueFromLogicRole(next, ACTIVITY_FIELDS_LOGIC_ROLE.TIME));
    const formatStr = t('dates.standardDate');
    const formattedDay = isValid(date) ? getI18nSpacetimeLng(language, date).format(formatStr) : '';
    const dateDay = isValid(date)
      ? parse(format(date, 'MMMM do, yyyy'), 'MMMM do, yyyy', new Date())
      : '';
    const hashDate = getDateTimestampString(date);
    const isReported = value => value === REPORTED_VALUES_LOGIC_ROLE.YES;

    return {
      ...item,
      messageDate: {
        isFirstOfDay: !nextItemDate || (nextItemDate && !isSameDay(date, nextItemDate)),
        day: dateDay,
        formattedDate: formattedDay,
        prefix: generateDatePrefix(date, true, t),
        hashDate,
      },
      messageStatus: {
        isReported: isReported(reportedStatus),
      },
    } as GroupedLinkedInMessage;
  });

export const LinkedInDetail = ({
  activity,
  accountId,
  dataModel,
  visibleFooter = true,
  actionsDisabled = false,
  userId,
}: {
  activity: Bobject;
  accountId: string;
  dataModel: DataModelResponse;
  visibleFooter?: boolean;
  actionsDisabled?: boolean;
  userId?: string;
}) => {
  const linkedInThreadId = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.LINKEDIN_THREAD,
  );
  const leadId = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  const { items, isLoading, fetchNextPage, totalMatching, mutate } = useLinkedinThreads(
    linkedInThreadId,
    accountId,
    leadId,
    true,
  );
  const { t, i18n } = useTranslation();
  const aggregatedConversations: GroupedLinkedInMessage[] =
    items && addConversationGrouping(items, t, i18n.language);

  const goToLinkedinConversationPage = () => {
    window.open(`https://www.linkedin.com/${linkedInThreadId}`, '_blank');
  };

  const referenceBobject = getReferencedBobject(activity);

  const assignee =
    getFieldByLogicRole(
      (referenceBobject as unknown) as Bobject,
      LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
      // @ts-ignore
    )?.value || referenceBobject?.assignedTo;

  const assignedToActiveUser = assignee === userId;

  useEffect(() => {
    mutate?.();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.activity_container}>
        <LinkedInDetailedActivity
          activity={activity}
          dataModel={dataModel}
          items={aggregatedConversations}
          isLoading={isLoading}
          totalMatching={totalMatching}
          fetchNextPage={fetchNextPage}
        />
      </div>
      {visibleFooter && (
        <DetailsFooter>
          <Button
            variant="secondary"
            onClick={goToLinkedinConversationPage}
            disabled={actionsDisabled && !assignedToActiveUser}
          >
            <Icon name="linkedin" size={14} />
            {t('activityTimelineItem.item.reply')}
          </Button>
        </DetailsFooter>
      )}
    </div>
  );
};
