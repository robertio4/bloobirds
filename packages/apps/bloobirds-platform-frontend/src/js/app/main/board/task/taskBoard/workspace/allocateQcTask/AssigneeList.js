import React from 'react';
import { connect } from 'react-redux';

import { Spinner } from '@bloobirds-it/flamingo-ui';

import {
  ALLOCATE_QC_TASK_LOAD_ASSIGNEES_AGG_MR_SUCCESS,
  ALLOCATE_QC_TASK_LOAD_ASSIGNEES_AGG_STATUS_SUCCESS,
  ALLOCATE_QC_TASK_LOAD_ASSIGNEES_SUCCESS,
} from '../../../../../../../actions/dictionary';
import { useEntity } from "../../../../../../../hooks";
import { BobjectApi } from '../../../../../../../misc/api/bobject';
import { ServiceApi } from '../../../../../../../misc/api/service';
import { Assignee } from './Assignee';
import styles from './assigneeList.module.css';

const wrap = ({ children }) => (
  <div className={styles.assigneeList}>
    <h2 className={styles.subTitle}>TEAM</h2>
    {children}
  </div>
);

const useData = (dispatch, requiresLoading, assigneesAllStatus) =>
  React.useEffect(() => {
    if (requiresLoading && assigneesAllStatus?.length > 0) {
      ServiceApi.request({
        url: '/service/users/search',
        method: 'POST',
        body: { isAssignable: true, isActive: true },
      }).then(payload =>
        dispatch({ type: ALLOCATE_QC_TASK_LOAD_ASSIGNEES_SUCCESS, payload: payload?.users }),
      );
      BobjectApi.request()
        .Company()
        .aggregation({
          formFields: true,
          aggregations: ['COMPANY__ASSIGNED_TO', 'COMPANY__MR_RATING'],
        })
        .then(payload =>
          dispatch({
            type: ALLOCATE_QC_TASK_LOAD_ASSIGNEES_AGG_MR_SUCCESS,
            payload: payload.contents,
          }),
        );
      BobjectApi.request()
        .Company()
        .aggregation({
          formFields: true,
          aggregations: ['COMPANY__ASSIGNED_TO', 'COMPANY__STATUS'],
        })
        .then(payload =>
          dispatch({
            type: ALLOCATE_QC_TASK_LOAD_ASSIGNEES_AGG_STATUS_SUCCESS,
            payload: payload.contents,
          }),
        );
    }
  }, [dispatch, requiresLoading, assigneesAllStatus]);
const discardedStatus = ['CLIENT', 'ACCOUNT', 'NURTURING', 'NEW', 'BACKLOG', 'DISCARDED'];
const Index = ({ assignees, assignedByAssignee, requiresLoading, isLoading, dispatch }) => {
  const assigneesAllStatus = useEntity('bobjectPicklistFieldValues')
    ?.all()
    .filter(v => v.logicRole?.includes('COMPANY__STATUS'))
    .filter(v => !discardedStatus.some(str => v.logicRole.endsWith(str)))
    .map(v => ({ field: v }));

  if (assigneesAllStatus && assignedByAssignee) {
    assigneesAllStatus.sort((a, b) => a.field.ordering - b.field.ordering);
  }
  useData(dispatch, requiresLoading, assigneesAllStatus);
  if (isLoading || !assigneesAllStatus) {
    return wrap({ children: <Spinner size={36} /> });
  }
  if (assignees.length === 0) {
    return wrap({ children: <span> There are no assignees </span> });
  }
  return wrap({
    children: assignees.map((assignee, index) => (
      <Assignee
        key={`assignee-${assignee.id}`}
        assigneesAllStatus={assigneesAllStatus}
        assignee={assignee}
        newAssignedCount={assignedByAssignee[assignee.id]}
        index={index}
      />
    )),
  });
};

const mapStateToProps = state => {
  const assignees = state.taskWorkspace.board.allocateQcTask.assignees;
  const mrRatingsAgg = state.taskWorkspace.board.allocateQcTask.assigneesAggregateMrRating;
  const statusAgg = state.taskWorkspace.board.allocateQcTask.assigneesAggregateStatus;
  return {
    assignees: state.taskWorkspace.board.allocateQcTask.assignees,
    readyToLoad: state.taskWorkspace.board.allocateQcTask.readyToLoad,
    assignedByAssignee: state.taskWorkspace.board.allocateQcTask.assignedByAssignee,
    requiresLoading:
      mrRatingsAgg === undefined && assignees === undefined && statusAgg === undefined,
    isLoading: mrRatingsAgg === undefined || assignees === undefined || statusAgg === undefined,
  };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export const AssigneeList = connect(mapStateToProps, mapDispatchToProps)(Index);
