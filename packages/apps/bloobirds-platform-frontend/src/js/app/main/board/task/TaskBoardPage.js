import React from 'react';
import { FilterRoutesByUserPermissions } from '../../../../components/userPermissions/filterRoutesByUserPermissions/index';
import styles from './task.module.css';
import { APP_TASKS_WELCOME } from '../../../_constants/routes';

const TaskBoardPage = props => {
  const pathname = props.location.pathname;
  return (
    <div
      className={styles.structureTaskPage}
      style={{ justifyContent: pathname === APP_TASKS_WELCOME ? 'center' : 'inherit' }}
    >
      <FilterRoutesByUserPermissions task={props} />
    </div>
  );
};

export default TaskBoardPage;
