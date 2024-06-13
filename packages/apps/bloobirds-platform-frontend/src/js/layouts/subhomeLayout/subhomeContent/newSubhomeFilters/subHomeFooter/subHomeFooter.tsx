import React from 'react';
import { Text } from '@bloobirds-it/flamingo-ui';
import styles from './subHomeFooter.css';
import { SCHEDULED_DATES_FOOTER_LABELS, SCHEDULED_DATES_IDS } from '../filters.constants';

type SubHomeFooterProps = {
  dateFilter: string;
  scrollToTop: () => void;
};

const SubHomeFooter = ({ dateFilter = 'until_now', scrollToTop }: SubHomeFooterProps) => {
  if (!SCHEDULED_DATES_IDS.includes(dateFilter)) {
    dateFilter = 'until_now';
  }
  const dateLabels = SCHEDULED_DATES_FOOTER_LABELS.filter(f => f.id === dateFilter)[0];
  const contentElement = document.getElementById('subhomeContent');
  const hasScroll = contentElement?.scrollHeight > contentElement?.clientHeight;
  return (
    <div className={styles._footer_wrapper}>
      <div className={styles._text_wrapper}>
        <Text size="s" color="softPeanut" align="center">
          So far the activity {dateLabels.preLabel} <b>{dateLabels.label}</b>
        </Text>
      </div>
      <div className={styles._text_align_center}>
        <Text size="s" color="softPeanut" htmlTag="span">
          Change the date range to see more!
        </Text>
        {hasScroll && (
          <span
            onClick={() => {
              scrollToTop
                ? scrollToTop()
                : document.getElementById('subhomeHeader').scrollIntoView({ behavior: 'smooth' });
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

export default SubHomeFooter;
