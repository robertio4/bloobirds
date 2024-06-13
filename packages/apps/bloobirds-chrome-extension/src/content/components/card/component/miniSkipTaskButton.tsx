import { useTranslation } from 'react-i18next';

import { CardButton, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useOpenSkipTaskModal, useSkipModal } from '@bloobirds-it/hooks';
import { Bobject, BobjectTypes, MessagesEvents, MIXPANEL_EVENTS } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import styles from '../card.module.css';

export const MiniSkipTaskButton = ({ task }: { task: Bobject }) => {
  const { openSkipTaskModal } = useOpenSkipTaskModal();
  const { hasSkipReasons, skipTask } = useSkipModal();
  const { t } = useTranslation();

  const onSaveCallback = () => {
    window.dispatchEvent(
      new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: { type: BobjectTypes.Task },
      }),
    );
  };

  return (
    <Tooltip title={t('extension.card.skipTask')} position="top">
      <CardButton
        className={styles.skipTask_button}
        iconLeft="skipForward"
        dataTest="Skip-Task"
        variant="secondary"
        onClick={event => {
          mixpanel.track(MIXPANEL_EVENTS.SKIP_TASK_FROM_CARD);
          event.preventDefault();
          event.stopPropagation();
          if (hasSkipReasons) {
            openSkipTaskModal(task, onSaveCallback);
          } else {
            skipTask(task).then(() => onSaveCallback());
          }
        }}
      />
    </Tooltip>
  );
};
