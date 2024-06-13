import { format } from 'date-fns';
import { Text } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import { useInboxLinkedinFooter } from './useInboxLinkedin';
import styles from '../inboxPage.module.css';

const formatDate = date => {
  const dateFormat = 'MMM do';
  return `${format(date.start, dateFormat)} - ${format(date.end, dateFormat)}`;
};

export const NewLinkedinFooter = () => {
  const { dateFilter } = useInboxLinkedinFooter();
  const contentElement = document.getElementById('subhomeContent');
  const hasScroll = contentElement?.scrollHeight > contentElement?.clientHeight;

  if (dateFilter) {
    return (
      <div className={styles._footer_wrapper}>
        <div className={styles._text_wrapper}>
          <Text size="s" color="softPeanut" align="center">
            So far the activity of {formatDate(dateFilter)}
          </Text>
        </div>
        <div className={styles._text_align_center}>
          <Text size="s" color="softPeanut" htmlTag="span">
            Change the date range to see more!
          </Text>
          {hasScroll && (
            <span
              onClick={() => {
                document.getElementById('subhomeHeader').scrollIntoView({ behavior: 'smooth' });
              }}
              className={styles._link}
            >
              Back to top
            </span>
          )}
        </div>
      </div>
    );
  }
  return null;
};
