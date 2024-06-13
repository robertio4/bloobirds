import React from 'react';
import classNames from 'clsx';
import AddQcTask from './workspace/addQcTask';
import { AllocateQcTask } from './workspace/allocateQcTask';
import { CompleteButtonAllocateQc } from './workspace/completeButton/CompleteButtonAllocateQc';
import { TaskHeader } from './workspace/taskHeader';
import { useDocumentTitle } from '../../../../../hooks';
import styles from './taskBoard.module.css';

const AddQc = () => {
  useDocumentTitle('Add QC');
  return (
    <div className={styles.taskWorkspace}>
      <div className={styles.taskWorkspaceMargins}>
        <TaskHeader
          title="Create Qualified Companies"
          subtitle="Create companies in Backlog status to make them ready to deliver. Also you can create companies in New status, and move them to backlog later by changing its tate."
        />
        <AddQcTask />
      </div>
    </div>
  );
};

const AssignQc = ({ calculateCenterOfAssigneeElement }) => {
  useDocumentTitle('Assign QC');
  return (
    <div
      className={classNames(styles.taskWorkspace, styles.taskWorkspaceAssign)}
      onScroll={calculateCenterOfAssigneeElement}
    >
      <div className={styles.taskWorkspaceMargins}>
        <TaskHeader title="Assign Qualified Companies" Button={CompleteButtonAllocateQc} />
        <AllocateQcTask />
      </div>
    </div>
  );
};

export const AssignQcWorkspace = AssignQc;

export const AddQcWorkspace = AddQc;
