import { connect } from 'react-redux';
import React, { useRef, useState } from 'react';
import { CircularBadge, Icon } from '@bloobirds-it/flamingo-ui';
import { bobjectFieldsModel } from '../../../../../../../../misc/model/bobjectFieldsModel';
import { BobjectPill, Pill } from '../../../../../../../../components/filter/field/pill';
import { BobjectField } from '../../../../../../../../components/filter/field/field';
import {
  ALLOCATE_QC_TASK_ALLOCATE_QC_TRANSACTION_END,
  ALLOCATE_QC_TASK_SELECT_QC,
  ALLOCATE_QC_TASK_SELECT_QC_RESET,
  ALLOCATE_QC_TASK_SELECT_RANGE_QC,
  COMPANIES_TO_ALLOCATE_CALCULATE_CENTER,
  COMPANIES_TO_ALLOCATE_RESTORE_DRAGGED_PROPERTIES,
  COMPANIES_TO_ALLOCATE_SET_DRAGGED_COMPANY,
  COMPANIES_TO_ALLOCATE_SET_DRAGGED_XY,
} from '../../../../../../../../actions/dictionary';
import classNames from 'clsx';
import { useBobjectDetails } from '../../../../../../../../hooks';
import styles from './companiesToAssign.module.css';

const CardCover = () => <div className={styles.CardCover} />;

const Index = props => {
  const {
    company,
    companyDragged,
    setCompanyDragged,
    setDragPosition,
    resetDragPosition,
    companiesAssigned,
    allocateTransactionToSession,
    index,
    selectCompany,
    isSelected,
    resetSelectedCompanies,
    selectRangeCompany,
    assignees,
    calculateCenterOfAssigneeElement,
    selectedCompaniesCount,
  } = { ...props };
  const { openBobjectDetails } = useBobjectDetails();
  const coordinates = useRef({ x: undefined, y: undefined });
  const [dragHasStarted, setDragHasStarted] = useState(false);
  const model = bobjectFieldsModel(company.fields);
  const isDragged = companyDragged || isSelected;
  const assignedTo =
    assignees !== undefined
      ? assignees.find(a => a.id === companiesAssigned[company.id.value])
      : undefined;
  const hasBeenAssigned = assignedTo !== undefined;
  const companyId = company.id.value;

  const children = (
    <React.Fragment>
      <div className={styles.cardDragIndicator}>
        <Icon name="dragAndDrop" size={24} color="softPeanut" />
      </div>
      <div className={styles.cardLeftSide}>
        <div
          onClick={() => {
            openBobjectDetails({ id: company?.id.value, showContactButton: true });
          }}
          className={styles.cardTitle}
        >
          {model.findByLogicRole('COMPANY__NAME').text}
        </div>

        <div>
          {!hasBeenAssigned && (
            <div className={styles.pill}>
              <BobjectPill bobject={company} fieldDescriptor="COMPANY__STATUS" />
            </div>
          )}
          {hasBeenAssigned && (
            <div className={styles.pill}>
              <Pill
                content="delivered"
                textColor="var(--tangerine)"
                borderColor="var(--verySoftTangerine)"
              />
            </div>
          )}
          <div className={styles.pill}>
            <BobjectPill bobject={company} fieldDescriptor="COMPANY__MR_RATING" />
          </div>
          {hasBeenAssigned && (
            <div className={styles.assignedAvatar}>
              <CircularBadge
                size="m"
                style={{
                  backgroundColor: assignedTo.color,
                  color: 'var(--white)',
                }}
              >
                {assignedTo.shortname || ''}
              </CircularBadge>
            </div>
          )}
        </div>
      </div>
      <div className={styles.cardRightSide}>
        <BobjectField bobject={company} fieldDescriptor="COMPANY__SOURCE" />
        <BobjectField bobject={company} fieldDescriptor="COMPANY__COUNTRY" />
        <BobjectField bobject={company} fieldDescriptor="COMPANY__SIZE" />
        <BobjectField bobject={company} fieldDescriptor="COMPANY__INDUSTRY" />
      </div>
      {selectedCompaniesCount > 1 && (
        <div className={styles.selectedCounter}>
          <span>{selectedCompaniesCount}</span>
        </div>
      )}
    </React.Fragment>
  );

  return (
    <div className={styles.root}>
      <div
        className={classNames({
          [styles.card]: true,
          [styles.cardAssigned]: hasBeenAssigned,
          [styles.styleOnDrag]: isDragged || isSelected,
        })}
        onDragStart={() => {
          setCompanyDragged(companyId);
          calculateCenterOfAssigneeElement();
        }}
        onDragCapture={e => {
          setDragHasStarted(true);
          setDragPosition(e);
          coordinates.current.x = e.clientX;
          coordinates.current.y = e.clientY;
        }}
        onDragEnd={e => {
          setDragHasStarted(false);
          allocateTransactionToSession(companyId);
          resetDragPosition(e);
          coordinates.current.x = undefined;
          coordinates.current.y = undefined;
        }}
        onMouseDown={e => {
          const isMac = window.navigator.userAgent.includes('Mac');
          const selectKey = isMac ? e.metaKey : e.ctrlKey;
          if (selectKey) {
            selectCompany(companyId);
          } else if (e.shiftKey) {
            selectRangeCompany(index, companyId);
          } else if (!isSelected) {
            resetSelectedCompanies();
          }
        }}
        tabIndex={index}
        draggable
        role="menuitem"
      >
        {children}
      </div>
      {dragHasStarted && <CardCover />}
    </div>
  );
};

const isSelected = ({ state, companyId }) =>
  state.selectableCompanies.length !== 0
    ? state.selectableCompanies
        .filter(sc => sc.companyId === companyId)
        .reduce((prev, curr) => prev || curr.selected, false)
    : false;

const isCompanyDragged = ({ selectableCompanies, id }) =>
  selectableCompanies.length !== 0
    ? selectableCompanies
        .filter(sc => sc.companyId === id)
        .reduce((prev, current) => prev || current.dragged, false)
    : false;

const mapStateToProps = (state, ownProps) => {
  const { value: id } = { ...ownProps, ...ownProps.company.id };
  const { selectableCompanies } = { ...state.taskWorkspace.board.allocateQcTask };
  return {
    companyDragged: isCompanyDragged({ selectableCompanies, id }),
    isSelected: isSelected({
      state: state.taskWorkspace.board.allocateQcTask,
      companyId: ownProps.company.id.value,
    }),
    companiesAssigned: state.taskWorkspace.board.allocateQcTask.session,
    assignees: state.taskWorkspace.board.allocateQcTask.assignees,
    selectedCompaniesCount:
      isCompanyDragged({ selectableCompanies, id }) &&
      state.taskWorkspace.board.allocateQcTask.selectableCompanies.filter(sc => sc.selected).length,
  };
};

const mapDispatchToProps = dispatch => ({
  setCompanyDragged: companyId =>
    dispatch({ type: COMPANIES_TO_ALLOCATE_SET_DRAGGED_COMPANY, companyId }),
  setDragPosition: e =>
    dispatch({ type: COMPANIES_TO_ALLOCATE_SET_DRAGGED_XY, x: e.clientX, y: e.clientY }),
  resetDragPosition: () => dispatch({ type: COMPANIES_TO_ALLOCATE_RESTORE_DRAGGED_PROPERTIES }),
  allocateTransactionToSession: companyId =>
    dispatch({ type: ALLOCATE_QC_TASK_ALLOCATE_QC_TRANSACTION_END, companyId }),
  selectCompany: companyId => {
    dispatch({ type: ALLOCATE_QC_TASK_SELECT_QC, companyId });
  },
  selectRangeCompany: (index, companyId) => {
    dispatch({ type: ALLOCATE_QC_TASK_SELECT_RANGE_QC, index, companyId });
  },
  resetSelectedCompanies: () => dispatch({ type: ALLOCATE_QC_TASK_SELECT_QC_RESET }),
  calculateCenterOfAssigneeElement: () =>
    dispatch({ type: COMPANIES_TO_ALLOCATE_CALCULATE_CENTER }),
});
export const CompanyToAssign = connect(mapStateToProps, mapDispatchToProps)(Index);
