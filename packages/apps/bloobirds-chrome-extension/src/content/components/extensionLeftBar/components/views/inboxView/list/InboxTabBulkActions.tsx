import { useTranslation } from 'react-i18next';

import { Button } from '@bloobirds-it/flamingo-ui';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES,
  Bobject,
  REPORTED_VALUES_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { getFieldByLogicRole } from '@bloobirds-it/utils';

import { useExtensionContext } from '../../../../../context';
import { useSubhomeContext } from '../../../layouts/subhomeLayout/subhomeLayout';
import { useMarkAsDone } from '../hooks/useInboxTab';
import styles from '../inboxPage.module.css';

const getAllConversationActivities = (activitiesByLead: Bobject[]) => {
  const allActivities = [];

  Object.keys(activitiesByLead).forEach(leadId => {
    if (activitiesByLead[leadId]?.messages.length) {
      allActivities.push(activitiesByLead[leadId]?.messages);
    }
  });

  return allActivities.flat().filter(message => {
    const messageReportedStatus = getFieldByLogicRole(message, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)
      ?.valueLogicRole;

    return messageReportedStatus !== REPORTED_VALUES_LOGIC_ROLE.YES;
  });
};

export const InboxTabBulkActions = ({ calls, emails, linkedin, whatsapp, mutate }) => {
  const { selectedQuickFilter } = useSubhomeContext();
  const { markAsDone } = useMarkAsDone(mutate);
  const { useGetDataModel } = useExtensionContext();
  const dataModel = useGetDataModel();
  const { t } = useTranslation();

  if (!selectedQuickFilter) {
    return null;
  }

  if (selectedQuickFilter.id === ACTIVITY_TYPES.CALL) {
    return (
      <div className={styles.buttonBulkAction}>
        <Button
          size="small"
          inline
          iconLeft="thumbsUp"
          variant="secondary"
          onClick={() => markAsDone(dataModel, calls)}
        >
          {t('leftBar.actions.markAllReported')}
        </Button>
      </div>
    );
  }

  let activities;
  if (selectedQuickFilter.id === ACTIVITY_TYPES.LINKEDIN) {
    activities = getAllConversationActivities(linkedin);
  } else if (selectedQuickFilter.id === ACTIVITY_TYPES.CUSTOM_TASK) {
    activities = getAllConversationActivities(whatsapp);
  } else {
    activities = emails;
  }

  return (
    <div className={styles.buttonBulkAction}>
      <Button
        size="small"
        inline
        iconLeft="checkDouble"
        variant="secondary"
        onClick={() => markAsDone(dataModel, activities)}
      >
        {t('leftBar.actions.readAll')}
      </Button>
    </div>
  );
};
