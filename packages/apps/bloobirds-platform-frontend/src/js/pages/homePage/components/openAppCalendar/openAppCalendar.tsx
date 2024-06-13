import React from 'react';

import { IconButton } from '@bloobirds-it/flamingo-ui';

import { useAppCalendarVisibility } from '../../../../hooks/useUserTasks';
import styles from '../../homePage.module.css';

const IconOpenAppCalendar = () => {
  const { openAppCalendarTodayTasks } = useAppCalendarVisibility();

  return (
    <IconButton
      name="chevronOpen"
      onClick={() => openAppCalendarTodayTasks()}
      className={styles.chevron}
      color="bloobirds"
      size={20}
    />
  );
};

export default IconOpenAppCalendar;
