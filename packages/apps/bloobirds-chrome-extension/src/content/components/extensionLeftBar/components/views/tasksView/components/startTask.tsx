import { Button, Icon } from '@bloobirds-it/flamingo-ui';
import { MIXPANEL_EVENTS, QuickFilter } from '@bloobirds-it/types';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import { useExtensionContext } from '../../../../../context';
import { Stages } from '../../view.utils';
import { useTasksAggregation } from '../hooks/useTasksTab';
import styles from './startTask.module.css';

export const StartTask = ({
  disabled = false,
  stage,
  quickFilter,
}: {
  disabled?: boolean;
  stage: Stages;
  quickFilter: QuickFilter;
}) => {
  const numItems = useTasksAggregation(stage, quickFilter);
  const { setOpenStartTasksNavigation } = useExtensionContext();

  return (
    <div className={clsx((numItems === 0 || disabled) && styles.notAllowed)}>
      <Button
        color={numItems !== 0 && !disabled ? 'bloobirds' : 'verySoftPeanut'}
        className={styles.startButton}
        size="small"
        onClick={() => {
          mixpanel.track(MIXPANEL_EVENTS.START_TASKS_FROM_TASK_TAB_OTO);
          setOpenStartTasksNavigation({ open: true, stage, quickFilter });
        }}
        disabled={numItems === 0 || disabled}
      >
        <Icon name="play" size={16} color="white" />
      </Button>
    </div>
  );
};
