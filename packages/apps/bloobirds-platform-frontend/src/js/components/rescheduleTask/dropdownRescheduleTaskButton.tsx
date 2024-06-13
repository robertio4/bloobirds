import React, { ReactNode } from 'react';
import { Dropdown, Item, useVisible } from '@bloobirds-it/flamingo-ui';
import mixpanel from 'mixpanel-browser';
import { useRescheduleCadenceTask } from './useRescheduleCadenceTask';
import { Bobject } from '../../typings/bobjects';
import { MIXPANEL_EVENTS } from '../../constants/mixpanel';

const DropdownRescheduleTaskButton = ({ task, anchor }: { task: Bobject; anchor: ReactNode }) => {
  const { openRescheduleTaskModal } = useRescheduleCadenceTask();
  const { ref, visible, setVisible } = useVisible(false);

  return (
    <Dropdown
      ref={ref}
      visible={visible}
      anchor={<div onClick={() => setVisible(!visible)}>{anchor}</div>}
    >
      <Item
        icon="clock"
        iconColor="bloobirds"
        onClick={(value, event) => {
          mixpanel.track(MIXPANEL_EVENTS.RESCHEDULE_TASK_FROM_CADENCE);
          event.stopPropagation();
          setVisible(false);
          openRescheduleTaskModal(task);
        }}
      >
        Reschedule task
      </Item>
    </Dropdown>
  );
};

export default DropdownRescheduleTaskButton;
