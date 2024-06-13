import React from 'react';
import { useClickAway } from 'react-use';

import { CounterBadge, Dropdown, useVisible } from '@bloobirds-it/flamingo-ui';

import { CadenceTimeTask, CadenceType, TIME_WINDOW } from '../../../cadenceTable.type';
import { cadenceTasksDisplay } from '../../../cadenceTable.utils';
import styles from '../../timeTable.module.css';
import { BadgeDropdownContent } from './BadgeDropdownContent';

interface BadgeDropdownProps {
  dayTasks: CadenceTimeTask;
  cadenceAction: CadenceType;
  timeWindow: TIME_WINDOW;
  date: string;
}

export const BadgeDropdown = ({
  dayTasks,
  cadenceAction,
  timeWindow,
  date,
}: BadgeDropdownProps) => {
  const actionDisplayProps = cadenceTasksDisplay[cadenceAction];
  const numOfActivities = dayTasks[cadenceAction].numOfActivities;
  const numOfTasks = dayTasks[cadenceAction].numOfTasks;
  const numBounced =
    (cadenceAction === 'autoEmail' || cadenceAction === 'email') &&
    dayTasks[cadenceAction].activities.filter(activity => activity.bounced).length;
  const isBounced = numBounced > 0;

  const { ref, visible, setVisible } = useVisible(false);

  useClickAway(ref, () => setVisible(false));

  return (
    <Dropdown
      ref={ref}
      visible={visible}
      position="bottom"
      onClose={() => setVisible(false)}
      anchor={
        <div className={styles.clickable} onClick={() => setVisible(!visible)}>
          <CounterBadge
            done={numOfActivities}
            total={numOfTasks}
            size={'l'}
            short={timeWindow === TIME_WINDOW.DAILY}
            color={actionDisplayProps.color}
            error={isBounced}
          />
        </div>
      }
    >
      <BadgeDropdownContent
        date={date}
        dayTasks={dayTasks}
        cadenceAction={cadenceAction}
        closeDropdown={() => setVisible(false)}
      />
    </Dropdown>
  );
};
