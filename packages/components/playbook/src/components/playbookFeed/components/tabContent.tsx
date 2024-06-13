import React, { useRef } from 'react';

import { PlaybookTab } from '@bloobirds-it/types';

import styles from '../playbookFeed.module.css';
import { usePlaybookFeed } from '../usePlaybookFeed';
import { MessagingContent } from './messagingContent';
import { QQsContent } from './qqsContent';

export const TabContent = () => {
  const { selectedTab } = usePlaybookFeed();
  const ref = useRef<HTMLDivElement>(null);
  const isQQs = selectedTab === PlaybookTab.QQS;
  return (
    <div ref={ref} {...(!isQQs && { className: styles.cards_container })}>
      {!isQQs ? <MessagingContent parentRef={ref} /> : <QQsContent />}
    </div>
  );
};
