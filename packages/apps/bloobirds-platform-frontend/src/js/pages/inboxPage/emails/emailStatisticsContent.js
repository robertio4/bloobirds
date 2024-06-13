import React from 'react';
import { Text, Collapsible } from '@bloobirds-it/flamingo-ui';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../../../constants/activity';
import { getTextFromLogicRole } from '../../../utils/bobjects.utils';
import styles from './emails.module.css';
import { formatDate } from '@bloobirds-it/utils';

const Statistic = ({ title, value }) => {
  if (!value) return null;

  const length = Object.keys(value).length;
  const style = {
    color: length ? 'var(--melon)' : 'var(--peanut)',
    backgroundColor: length ? 'var(--verySoftMelon)' : 'var(--verySoftPeanut)',
  };

  return (
    <div className={styles._statistic_wrapper}>
      <Text weight="medium" size="xs" color="peanut">
        {title}
      </Text>
      <span className={styles._statistic_label} style={style}>
        {length}
      </span>
    </div>
  );
};

const EmailStatistics = ({ email }) => {
  const openHistory = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_HISTORY_OPEN);
  const emailHistory = getTextFromLogicRole(email, ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_HISTORY_CLICK);

  if (!openHistory && !emailHistory) {
    return null;
  }

  const opens = openHistory ? JSON.parse(openHistory) : {};
  const clicks = emailHistory ? JSON.parse(emailHistory) : {};

  const historyOpen = Object.entries(opens).map(([date, data]) => ({
    date: new Date(parseInt(date, 10) * 1000),
    type: 'opened',
    data,
  }));

  const historyClicked = Object.entries(clicks).map(([date, data]) => ({
    date: new Date(parseInt(date, 10) * 1000),
    type: 'clicked',
    data,
  }));

  const history = [...historyOpen, ...historyClicked];
  history.sort((a, b) => b.date - a.date);

  const emptyHistory = Object.keys(opens).length === 0 && Object.keys(clicks).length === 0;

  return (
    <div className={styles._email_statistic_container}>
      <Collapsible
        color="softPeanut"
        onCollapsed={(isCollapse, event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        disabled={emptyHistory}
        title={
          <div className={styles._statistics_wrapper}>
            <Statistic title="Opened" value={opens} />
            <Statistic title="Clicked" value={clicks} />
          </div>
        }
      >
        <ul className={styles._history_list}>
          {history.map(({ date, type, data }, index) => (
            <li className={styles._history_item} key={`history-${type}`}>
              <div className={styles._bullet} />
              <Text size="xs" color="peanut" htmlTag="span">
                {type === 'opened' ? 'Opened' : 'Clicked link'}
              </Text>
              {type === 'clicked' && (
                <a
                  className={styles._history_link}
                  href={data.startsWith('http') ? data : `//${data}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Text size="xs" color="bloobirds" htmlTag="span">
                    {data.replace(/https?:\/\/(www.)?/, '')}
                  </Text>
                </a>
              )}
              <Text size="xs" color="softPeanut" htmlTag="span">
                {formatDate(date, "dd LLL yyyy 'at' p OOO")}
              </Text>
              {index < history.length - 1 && <div className={styles._dashed_line} />}
            </li>
          ))}
        </ul>
      </Collapsible>
    </div>
  );
};

export default EmailStatistics;
