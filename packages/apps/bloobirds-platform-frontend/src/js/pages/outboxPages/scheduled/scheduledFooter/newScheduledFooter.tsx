import React from 'react';
import { Text } from '@bloobirds-it/flamingo-ui';
import { useOutboxScheduledFooter } from '../useOutboxScheduled';
import styles from './scheduledFooter.module.css';
import { DATE_TEXT } from '../../outbox.constants';

const NewScheduledFooter = () => {
  const { dateFilter } = useOutboxScheduledFooter();
  const contentElement = document.getElementById('subhomeContent');
  const hasScroll = contentElement?.scrollHeight > contentElement?.clientHeight;

  return (
    <div className={styles._footer_wrapper}>
      <div className={styles._text_wrapper}>
        <Text size="s" color="softPeanut" align="center">
          So far the activity of the <b>{DATE_TEXT[dateFilter]}</b>
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
};

export default NewScheduledFooter;
