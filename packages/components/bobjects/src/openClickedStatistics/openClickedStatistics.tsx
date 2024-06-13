import { Icon, Label, Text } from '@bloobirds-it/flamingo-ui';
import React, { useState } from 'react';
import { Bobject } from '@bloobirds-it/types';
import { formatDate, getTextFromLogicRole } from '@bloobirds-it/utils';
import styles from './openClickedStatistics.module.css';
import {useTranslation} from "react-i18next";

export type StatisticsSize = 'medium' | 'small';

const Statistic = ({ title, value, size }: { title: string; value: any; size: StatisticsSize }) => {
  if (!value) return null;

  const length = Object.keys(value)?.length;
  const style = {
    color: length ? 'var(--melon)' : 'var(--peanut)',
    backgroundColor: length ? 'var(--verySoftMelon)' : 'var(--verySoftPeanut)',
    borderColor: length ? 'var(--verySoftMelon)' : 'var(--verySoftPeanut)',
  };

  return (
    <div className={styles._statistic}>
      <Text weight="medium" size={size === 'medium' ? 'm' : 'xs'} color="peanut">
        {title}
      </Text>
      <Label size="small" overrideStyle={style}>
        {length}
      </Label>
    </div>
  );
};

export interface History {
  date: any;
}

const History = ({ opens, clicks, size }: { opens: any; clicks: any; size: StatisticsSize }) => {
  const { t } = useTranslation();

  const openHistory = Object.entries(opens).map(([date, data]) => ({
    date: new Date(parseInt(date, 10) * 1000),
    type: 'opened',
    data,
  }));

  const clickHistory = Object.entries(clicks).map(([date, data]) => ({
    date: new Date(parseInt(date, 10) * 1000),
    type: 'clicked',
    data,
  }));

  const history = [...openHistory, ...clickHistory];
  history.sort((a: History, b: History) => b.date - a.date);

  return (
    <ul className={styles._history_list}>
      {history.map(({ date, type, data }: { date: any; type: any; data: string }) => (
        <li
          className={styles._history_item}
          key={`${date}-${type}`}
          style={{ margin: size === 'medium' ? '28px 0 0' : '12px 0 0' }}
        >
          <Text size={size === 'medium' ? 's' : 'xxs'} color="peanut">
            {type === 'opened'
              ? t('activityTimelineItem.item.opened')
              : t('activityTimelineItem.item.clickedLink')}
          </Text>
          {type === 'clicked' && (
            <a
              className={styles._history_link}
              href={data?.startsWith('http') ? data : `//${data}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text size={size === 'medium' ? 's' : 'xxs'} color="bloobirds" ellipsis={48}>
                {data?.replace(/https?:\/\/(www.)?/, '')}
              </Text>
            </a>
          )}
          <Text size={size === 'medium' ? 'xs' : 'xxxs'} color="softPeanut">
            {formatDate(date, "dd LLL yyyy 'at' p OOO")}
          </Text>
        </li>
      ))}
    </ul>
  );
};

export const OpenClickedStatistics = ({
  bobject,
  size = 'medium',
}: {
  bobject: Bobject;
  size?: StatisticsSize;
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const { t } = useTranslation();

  const openHistory = getTextFromLogicRole(bobject, 'ACTIVITY__EMAIL_HISTORY_OPEN');
  const emailHistory = getTextFromLogicRole(bobject, 'ACTIVITY__EMAIL_HISTORY_CLICK');

  if (!openHistory && !emailHistory) {
    return null;
  }

  const opens = openHistory ? JSON.parse(openHistory) : {};
  const clicks = emailHistory ? JSON.parse(emailHistory) : {};

  const emptyHistory = Object.keys(opens)?.length === 0 && Object.keys(clicks)?.length === 0;

  return (
    <div className={styles._container}>
      <div className={styles._statistic_container}>
        <Statistic title={t('activityTimelineItem.item.opened')} value={opens} size={size} />
        <Statistic title={t('activityTimelineItem.item.clicked')} value={clicks} size={size} />
        {!emptyHistory && (
          <div className={styles._showDetails} onClick={() => setShowDetails(!showDetails)}>
            <Text size={size === 'medium' ? 's' : 'xxs'} color="bloobirds">
              {showDetails
                ? t('activityTimelineItem.item.hideDetails')
                : t('activityTimelineItem.item.showDetails')}
            </Text>
            <Icon
              size={size === 'medium' ? 16 : 12}
              name={showDetails ? 'chevronUp' : 'chevronDown'}
              color="bloobirds"
            />
          </div>
        )}
      </div>
      {showDetails && <History opens={opens} clicks={clicks} size={size} />}
    </div>
  );
};
