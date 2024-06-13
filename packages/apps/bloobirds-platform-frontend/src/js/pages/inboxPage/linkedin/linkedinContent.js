import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Label } from '@bloobirds-it/flamingo-ui';
import { DIRECTION_VALUES_LOGIC_ROLE } from '@bloobirds-it/types';
import { formatDate, generateDatePrefix, getDateTimestampString } from '@bloobirds-it/utils';
import { isSameDay, isValid, parse } from 'date-fns';

import BulkActionToast from '../../../components/bulkActionToast/bulkActionToast';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
} from '../../../constants/activity';
import { useActivityDone } from '../../../hooks/useActivity';
import SubhomeContentSkeleton from '../../../layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton';
import SubhomeEmptyContent from '../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import { getFieldByLogicRole, getValueFromLogicRole } from '../../../utils/bobjects.utils';
import styles from './linkedin.module.css';
import { LinkedinCard } from './linkedinCard';
import { LinkedinConversationCard } from './linkedinConversationCard';
import { NewLinkedinFilters } from './newLinkedinFilters';
import { NewLinkedinFooter } from './newLinkedinFooter';
import { useInboxActivitiesLinkedin } from './useInboxLinkedin';

const addConversationGrouping = (conversations, t) => {
  const aggregatedConversations = Object.keys(conversations).map((leadId, index) => {
    const lastMessage = conversations[leadId]?.lastMessage;
    const lastMessageDate = new Date(
      getValueFromLogicRole(lastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.TIME),
    );

    const previousLeadId = Object.keys(conversations)[index - 1];
    const previous = conversations[previousLeadId];
    const previousLastMessage = previous?.lastMessage;
    const previousItemDate =
      previousLastMessage &&
      new Date(getValueFromLogicRole(previousLastMessage, ACTIVITY_FIELDS_LOGIC_ROLE.TIME));

    const formattedDay = isValid(lastMessageDate)
      ? formatDate(lastMessageDate, 'MMM do, yyyy')
      : '';
    const dateDay = isValid(lastMessageDate) ? parse(formattedDay, 'MMM do, yyyy', new Date()) : '';
    const hashDate = getDateTimestampString(lastMessageDate);

    return {
      ...conversations[leadId],
      messageDate: {
        isFirstOfDay: !previousItemDate || !isSameDay(lastMessageDate, previousItemDate),
        day: dateDay,
        formattedDate: formattedDay,
        prefix: generateDatePrefix(lastMessageDate, true, t),
        hashDate,
      },
    };
  });
  return Object.keys(aggregatedConversations).reduce((acc, leadId) => {
    if (
      aggregatedConversations[leadId].messages.some(
        message =>
          getFieldByLogicRole(message, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION)?.valueLogicRole ===
          DIRECTION_VALUES_LOGIC_ROLE.INCOMING,
      )
    ) {
      return { ...acc, [leadId]: aggregatedConversations[leadId] };
    } else {
      return acc;
    }
  }, {});
};

const LinkedinList = () => {
  const {
    activitiesByLead,
    totalMatching,
    isLoading,
    showManuallyLoggedFilter,
  } = useInboxActivitiesLinkedin();
  const { t } = useTranslation();
  const { showToast } = useActivityDone();
  const parsedConversations = addConversationGrouping(activitiesByLead, t);

  const getAllActivities = () => {
    const allActivities = [];

    Object.keys(activitiesByLead).forEach(leadId => {
      if (activitiesByLead[leadId]?.messages.length) {
        allActivities.push(activitiesByLead[leadId]?.messages);
      }
    });

    return allActivities.flat().filter(message => {
      const messageReportedStatus = getFieldByLogicRole(
        message,
        ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED,
      )?.valueLogicRole;

      return messageReportedStatus !== REPORTED_VALUES_LOGIC_ROLE.YES;
    });
  };

  const markAllAsRead = () => {
    const activities = showManuallyLoggedFilter ? activitiesByLead : getAllActivities();
    showToast(true, activities);
  };

  return (
    <>
      {isLoading && <SubhomeContentSkeleton visible />}
      {!isLoading &&
        (parsedConversations.length === 0 ? (
          <SubhomeEmptyContent />
        ) : (
          <>
            <div className={styles._list_header}>
              <div className={styles._counter__button}>
                {!showManuallyLoggedFilter ? (
                  <Label size="small">
                    {`${Object.keys(activitiesByLead)?.length} conversations`}
                  </Label>
                ) : (
                  <Label size="small">{`${totalMatching || 0} messages`}</Label>
                )}
                <Button inline iconLeft="checkDouble" variant="secondary" onClick={markAllAsRead}>
                  MARK ALL AS READ
                </Button>
              </div>
            </div>
            <div className={styles._cards_list}>
              {!showManuallyLoggedFilter
                ? Object.keys(parsedConversations).map(leadId => (
                    <LinkedinConversationCard
                      key={`conversation-${leadId}`}
                      messages={parsedConversations[leadId].messages}
                      messageDate={parsedConversations[leadId].messageDate}
                      leadId={leadId}
                    />
                  ))
                : activitiesByLead.map(activity => (
                    <LinkedinCard linkedin={activity} key={`activity-${activity?.id.objectId}`} />
                  ))}
            </div>
            <NewLinkedinFooter />
            <BulkActionToast />
          </>
        ))}
    </>
  );
};

export function LinkedinContent() {
  return (
    <>
      <NewLinkedinFilters />
      <LinkedinList />
    </>
  );
}
