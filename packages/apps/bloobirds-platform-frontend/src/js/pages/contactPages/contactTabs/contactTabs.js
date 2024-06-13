import React, { useEffect } from 'react';

import { ScheduleEmailModal } from '@bloobirds-it/email';
import { Tab, TabGroup } from '@bloobirds-it/flamingo-ui';
import { useRouter } from '@bloobirds-it/hooks';

import ActivitySection from '../../../components/activitySection';
import CancelEmailModal from '../../../components/cancelEmailModal/cancelEmailModal';
import ConfirmSendAutomatedEmailModal from '../../../components/confirmSendAutomatedEmailModal/confirmSendAutomatedEmailModal';
import { useContactView } from '../../../hooks';
import useCancelEmail from '../../../hooks/useCancelEmail';
import useRescheduleAutomatedEmail from '../../../hooks/useRescheduleAutomatedEmail';
import useSendAutomatedEmail from '../../../hooks/useSendAutomatedEmail';
import styles from './contactTabs.module.css';
import MessagingTabs from './messagingTabs';
import TasksTab from './tasksSection/tasksSection';

const ContactTabs = props => {
  const { tab, setTab, resetTab, setScrollOffset } = useContactView();
  const {
    isOpen: isOpenScheduledModal,
    closeRescheduleAutomatedEmailModal,
    rescheduleEmail,
  } = useRescheduleAutomatedEmail();
  const { isOpen: isOpenConfirmSendEmail } = useSendAutomatedEmail();
  const { isOpen: isOpenCancelEmailModal, closeCancelEmailModal } = useCancelEmail();
  const { query } = useRouter();

  useEffect(
    () => () => {
      resetTab();
    },
    [],
  );

  return (
    <div
      id="contact-tabs"
      className={styles._container}
      data-intercom="activity-messaging-task-tabs"
    >
      <TabGroup
        value={tab}
        onClick={tab => {
          setTab(tab);
          setScrollOffset(document.getElementById(query.id)?.scrollTop);
        }}
      >
        <Tab dataTest="activityContactTab" name="Activity" iconLeft="activity">
          <ActivitySection {...props} />
        </Tab>
        <Tab dataTest="messagingContactTab" name="Messaging" iconLeft="file">
          <MessagingTabs {...props} />
        </Tab>
        <Tab dataTest="taskContactTab" name="Tasks" iconLeft="calendar">
          <TasksTab {...props} />
        </Tab>
      </TabGroup>
      {isOpenScheduledModal && (
        <ScheduleEmailModal
          emails={[]}
          onClose={closeRescheduleAutomatedEmailModal}
          onSubmit={async ({ date }) => {
            closeRescheduleAutomatedEmailModal();
            rescheduleEmail({ datetime: date });
          }}
        />
      )}
      {isOpenCancelEmailModal && <CancelEmailModal handleClose={closeCancelEmailModal} open />}
      {isOpenConfirmSendEmail && <ConfirmSendAutomatedEmailModal />}
    </div>
  );
};

export default ContactTabs;
