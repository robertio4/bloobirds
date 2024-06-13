import React from 'react';

import AccountSettingsTab from '../../../../../layouts/accountSettingsLayout/accountSettingsTab';
import WorkflowActions from './actions/actions';
import styles from './actionsTab.module.css';
import WorkflowConditions from './conditions/conditions';
import WorkflowTriggers from './triggers/triggers';

const WorkflowActionsPage = ({ isEditing }: { isEditing: boolean }) => {
  return (
    <>
      <AccountSettingsTab>
        <main className={styles._workflow_page__container}>
          <WorkflowTriggers />
        </main>
      </AccountSettingsTab>
      <WorkflowConditions isEditing={isEditing} />
      <WorkflowActions />
    </>
  );
};

export default WorkflowActionsPage;
