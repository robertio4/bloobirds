import { MutableRefObject, useRef, useState } from 'react';

import { useActiveAccountId, useHasNewTaskFeed } from '@bloobirds-it/hooks';
import { SalesforceTabs } from '@bloobirds-it/types';
import { motion } from 'framer-motion';

import styles from '../../extensionLeftBar.module.css';
import { useExtensionLeftBarContext } from '../../extensionLeftBarContext';
import InactiveTab from './inactiveView/inactiveTab';
import InboxTab from './inboxView/inboxTab';
import MeetingsTab from './meetingsView/meetingsTab';
import TasksTab from './newTasksView/tasksTab';
import NurturingTab from './nurturingView/nurturingTab';
import OutboxTab from './outboxView/outboxTab';
import PipelineTab from './pipelineView/pipelineTab';
import OldTasksTab from './tasksView/tasksTab';

export type ViewPropsType = {
  parentRef: MutableRefObject<any>;
};

export default function ExtensionLeftBarContent({ dimensions }) {
  const parentRef = useRef(null);
  const { currentTab } = useExtensionLeftBarContext();
  const [animationComplete, setAnimationComplete] = useState(false);
  const accountId = useActiveAccountId();
  const hasNewTaskFeed = useHasNewTaskFeed(accountId);

  let view;
  switch (currentTab) {
    case SalesforceTabs.TASKS:
      view = hasNewTaskFeed ? (
        <TasksTab parentRef={parentRef} />
      ) : (
        <OldTasksTab parentRef={parentRef} />
      );
      break;
    case SalesforceTabs.PIPELINE:
      view = <PipelineTab parentRef={parentRef} />;
      break;
    case SalesforceTabs.MEETINGS:
      view = <MeetingsTab parentRef={parentRef} />;
      break;
    case SalesforceTabs.NURTURING:
      view = <NurturingTab parentRef={parentRef} />;
      break;
    case SalesforceTabs.INACTIVE:
      view = <InactiveTab parentRef={parentRef} />;
      break;
    case SalesforceTabs.INBOX:
      view = <InboxTab parentRef={parentRef} />;
      break;
    case SalesforceTabs.OUTBOX:
      view = <OutboxTab parentRef={parentRef} />;
      break;
    case SalesforceTabs.TOOLTIP:
    default:
      break;
  }

  const onAnimationComplete = () => {
    setAnimationComplete(true);
  };

  const onAnimationStart = () => {
    setAnimationComplete(false);
  };

  return (
    <motion.div
      id="bb-left-bar"
      initial={{ width: '0px', opacity: 0 }}
      animate={{ width: '384px', opacity: 1 }}
      transition={{
        duration: 0.25,
      }}
      exit={{ width: '0px', opacity: 0 }}
      ref={parentRef}
      className={styles.content}
      style={dimensions}
      onAnimationComplete={onAnimationComplete}
      onAnimationStart={onAnimationStart}
    >
      {animationComplete && view}
    </motion.div>
  );
}
