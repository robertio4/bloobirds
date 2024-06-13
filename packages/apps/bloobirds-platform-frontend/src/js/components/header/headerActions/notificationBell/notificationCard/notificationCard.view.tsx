import React, { useRef } from 'react';

import { Icon, IconButton, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useIsOTOAccount, usePreviousUrl } from '@bloobirds-it/hooks';
import { getCompoundIcon, notificationsWithStatus } from '@bloobirds-it/misc';
import { NotificationsTypes, ACTIVITY_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { getTextFromLogicRole } from '@bloobirds-it/utils';
import classNames from 'clsx';
import { format } from 'date-fns';

import {
  APP_CL_COMPANIES,
  APP_TASKS_INBOX,
  APP_TASKS_PROSPECTING,
  APP_TASKS_SALES,
} from '../../../../../app/_constants/routes';
import { useOpenContactFlow, useRouter, useSharedState } from '../../../../../hooks';
import { useActiveActivitiesFilters } from '../../../../../hooks/useActiveActivities';
import { fetchActivity } from '../../../../../hooks/useActivity';
import { formatTimeDistance } from '../../../../../misc/utils';
import styles from './notificationCard.module.css';

const ICONS = {
  NEW_EMAIL: {
    name: 'mail',
    color: 'tangerine',
  },
  WORKFLOWS: {
    name: 'zap',
    color: 'bloobirds',
  },
  NEW_LINKEDIN: {
    name: 'linkedin',
    color: 'darkBloobirds',
  },
  NEW_INBOUND: {
    name: 'download',
    color: 'banana',
  },
  NEW_INBOUND_LEAD: {
    name: 'personAdd',
    color: 'banana',
  },
  MISSED_CALL_UNKNOWN: {
    name: 'phone',
    color: 'tomato',
  },
  MISSED_CALL_LEAD: {
    name: 'phone',
    color: 'tomato',
  },
  REPORT_CALL: {
    name: 'phone',
    color: 'melon',
  },
  EMAIL_OPENED: {
    name: 'eye',
    color: 'banana',
  },
  EMAIL_CLICKED: {
    name: 'cursorClickOutline',
    color: 'grape',
  },
  MEETING_DONE: {
    name: 'calendar',
    color: 'tomato',
  },
  CADENCE_ENDED: {
    name: 'cadence',
    color: 'softPeanut',
  },
  IMPORT_FAILED: {
    name: 'upload',
    color: 'tomato',
  },
  IMPORT_COMPLETED: {
    name: 'upload',
    color: 'melon',
  },
  IMPORT_COMPLETED_WITH_WARNINGS: {
    name: 'upload',
    color: 'banana',
  },
  COMPANY_ASSIGNED: {
    name: 'deliver',
    color: 'grape',
  },
  LEAD_ASSIGNED: {
    name: 'deliver',
    color: 'grape',
  },
  SALES_COMPANY_ASSIGNED: {
    name: 'deliver',
    color: 'peanut',
  },
  SALES_LEAD_ASSIGNED: {
    name: 'deliver',
    color: 'peanut',
  },
  RELATED_COMPANY_MEETING: {
    name: 'relatedCompanyMeeting',
    color: 'meeting',
  },
  RELATED_COMPANY_STATUS_ACCOUNT: {
    name: 'relatedCompanyStatus',
    color: 'gray',
  },
  RELATED_COMPANY_STATUS_CLIENT: {
    name: 'relatedCompanyStatus',
    color: 'gray',
  },
  RELATED_COMPANIES_OPPORTUNITY: {
    name: 'relatedCompanyOpportunity',
    color: 'peanut',
  },
  RELATED_COMPANY_ACTIVITY_INBOUND: {
    name: 'relatedCompanyInbound',
    color: 'banana',
  },
  RELATED_COMPANY_LEAD_INBOUND: {
    name: 'relatedCompanyLead',
    color: 'banana',
  },
  ACCOUNT_STOPPED: {
    name: 'alertTriangle',
    color: 'email',
  },
};

function getActivitytTypeFromNotification(type: NotificationsTypes) {
  switch (type) {
    case 'NEW_EMAIL':
    case 'EMAIL_CLICKED':
    case 'EMAIL_OPENED':
      return 'ACTIVITY__TYPE__EMAIL';
    case 'NEW_LINKEDIN':
      return 'ACTIVITY__TYPE__LINKEDIN_MESSAGE';
    case 'MISSED_CALL_LEAD':
      return 'ACTIVITY__TYPE__CALL';
    case 'MEETING_DONE':
    case 'MEETING_ACCEPTED':
    case 'MEETING_RESCHEDULED':
      return 'ACTIVITY__TYPE__MEETING';
  }
}

function isActivityNotification(type: NotificationsTypes) {
  return (
    type === 'NEW_EMAIL' ||
    type === 'EMAIL_CLICKED' ||
    type === 'EMAIL_OPENED' ||
    type === 'NEW_LINKEDIN' ||
    type === 'MISSED_CALL_LEAD' ||
    type === 'MISSED_CALL_UNKNOWN' ||
    type === 'MEETING_DONE' ||
    type === 'MEETING_ACCEPTED' ||
    type === 'MEETING_RESCHEDULED' ||
    type === 'NEW_INBOUND' ||
    type === 'NEW_INBOUND_LEAD' ||
    type === 'REPORT_CALL' ||
    type === 'MEETING_CANCELLED'
  );
}

const NotificationCard = ({
  date,
  id,
  subtitle,
  title,
  type,
  read,
  url,
  onDelete,
  onClick,
  objectId,
  fromHome,
}: any) => {
  const { setPreviousUrl } = usePreviousUrl();
  const { history } = useRouter();
  const { resetTypeFilter, setTypeFilter, setDateFilter } = useActiveActivitiesFilters();
  const [, setTab] = useSharedState('tab');
  const { open } = useOpenContactFlow();
  const isOTOAccount = useIsOTOAccount();

  const classes = classNames(styles._card, {
    [styles._unread]: !read,
    [styles._card_no_click]: isOTOAccount,
  });

  const handleRemove = event => {
    event.preventDefault();
    event.stopPropagation();
    onDelete(id);
  };

  const getUrl = () => {
    const allMyProspectCompaniesgUrl = `${APP_TASKS_PROSPECTING}/all/companies`;
    const allMyProspectLeadsUrl = `${APP_TASKS_PROSPECTING}/all/leads`;
    const allMySalesCompaniesUrl = `${APP_TASKS_SALES}/companiesAndLeads/companies`;
    const allMySalesLeadsUrl = `${APP_TASKS_SALES}/companiesAndLeads/leads`;
    const outbox = `${APP_TASKS_INBOX}/calls`;
    switch (type) {
      case 'COMPANY_ASSIGNED':
        return allMyProspectCompaniesgUrl;
      case 'LEAD_ASSIGNED':
        return allMyProspectLeadsUrl;
      case 'SALES_COMPANY_ASSIGNED':
        return allMySalesCompaniesUrl;
      case 'SALES_LEAD_ASSIGNED':
        return allMySalesLeadsUrl;
      case 'MISSED_CALL_UNKNOWN':
      case 'MISSED_CALL_LEAD':
        return outbox;
      default:
        return url;
    }
  };

  const handleOnClick = async (e: React.MouseEvent<HTMLElement>) => {
    const urlToRedirect = getUrl();

    if (isActivityNotification(type)) {
      //Filter by activity date
      try {
        const activity = await fetchActivity(objectId, false);
        const dateActivity = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);

        if (dateActivity) {
          const dateToFilter = new Date(dateActivity);
          setDateFilter({ startDate: dateToFilter, endDate: dateToFilter });
        }
      } catch (e) {
        console.error('error', e);
      }
    }

    type === 'NEW_INBOUND_LEAD' ? setTypeFilter([]) : resetTypeFilter();

    onClick(id);

    setPreviousUrl(APP_CL_COMPANIES);
    if (urlToRedirect) {
      const filtrableNotification = getActivitytTypeFromNotification(type);
      if (filtrableNotification) setTypeFilter([filtrableNotification]);
      history.push(urlToRedirect, { event: e });

      if (type === 'REPORT_CALL') {
        open(objectId);
      }

      setTimeout(() => {
        setTab('Activity');
      }, 100);
      setTimeout(() => {
        const activityTab = document.querySelector('#activity-tab');
        if (activityTab) {
          activityTab.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };

  const parentRef = useRef();

  return (
    <li className={classes} onClick={isOTOAccount ? undefined : handleOnClick}>
      {notificationsWithStatus.includes(type) ? (
        getCompoundIcon(type, parentRef)
      ) : (
        <Icon {...ICONS[type]} />
      )}
      <div className={styles._card__body}>
        <Text
          dataTest={`Text-Notification-${title}`}
          color="darkGray"
          size="xs"
          className={classNames(styles.title, {
            [styles.titleAlone]: !subtitle && fromHome,
          })}
        >
          {title || ''}
        </Text>
        <Text
          dataTest={`Notification-Company-${subtitle}`}
          color="softPeanut"
          size="xs"
          className={styles.subtitle}
        >
          {subtitle || ''}
        </Text>
      </div>
      <div
        className={classNames(styles._card__info, {
          [styles._card__info_single_line]: !subtitle && !fromHome,
        })}
      >
        <IconButton name="trashFull" size={16} color="bloobirds" onClick={handleRemove} />
        <Tooltip position="bottom" title={format(date, 'PPP ppp')}>
          <Text size="xs" color="softPeanut" className={styles._card_date}>
            {formatTimeDistance(date)}
          </Text>
        </Tooltip>
      </div>
    </li>
  );
};

export default NotificationCard;
