import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RESET_TASK_STATE } from '../../../../../../../actions/dictionary';
import { AssigneeList } from './AssigneeList';
import { CompanyToAssignListContainer } from './CompaniesToAssign/CompanyToAssignList.container';
import styles from './allocateQcTask.module.css';

const Index = ({ resetTaskState }) => {
  useEffect(() => {
    resetTaskState();
  }, []);
  return (
    <div className={styles.wrapper}>
      <AssigneeList />
      <CompanyToAssignListContainer />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  resetTaskState: () => dispatch({ type: RESET_TASK_STATE }),
});
export const AllocateQcTask = connect(null, mapDispatchToProps)(Index);
