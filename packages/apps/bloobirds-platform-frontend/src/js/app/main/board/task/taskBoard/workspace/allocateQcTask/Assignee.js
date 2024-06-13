import React from 'react';
import { connect } from 'react-redux';

import { Icon, Text, Collapsible } from '@bloobirds-it/flamingo-ui';
import classNames from 'clsx';

import {
  ALLOCATE_QC_TASK_ASSIGNEE_CLEAR,
  ALLOCATE_QC_TASK_ASSIGNEE_EXPANDED,
  COMPANIES_TO_ALLOCATE_SET_DROPPABLE_ELEMENT,
} from '../../../../../../../actions/dictionary';
import {
  BobjectFieldColorField,
  ColorField,
} from '../../../../../../../components/filter/field/colorField';
import { BobjectFieldPill } from '../../../../../../../components/filter/field/pill';
import styles from './assignee.module.css';

const UserStats = props => {
  let companyStatusUpdated = [];
  props.assigneesAllStatus.forEach(a => companyStatusUpdated.push({ ...a, value: 0 }));
  if (props.assigneesAllStatus?.length && props.assignee.companiesByStage.length) {
    companyStatusUpdated = companyStatusUpdated.map(d => {
      props.assignee.companiesByStage.forEach(element => {
        if (element.field.valueLogicRole === d.field.logicRole) {
          d.value = element.value;
        }
      });
      return d;
    });
  }

  return (
    <div>
      <span className={styles.blankSeparator} />
      <div className={styles.userStatsStatusRow}>
        <ColorField content="Delivered New" color="var(--verySoftPeanut)" />
        {props.newAssignedCount}
        {props.newAssignedCount > 0 && (
          <div className={styles.undoButton} onClick={props.setUndoAssignment(props.assignee.id)}>
            <Icon name="undoRevert" color="softPeanut" />
          </div>
        )}
      </div>
      {companyStatusUpdated &&
        companyStatusUpdated.length &&
        companyStatusUpdated.map(company => (
          <div
            className={styles.userStatsStatusRow}
            key={`${props.assignee}-company-${company.field.value}`}
          >
            <BobjectFieldColorField field={company.field} /> {company.value}
          </div>
        ))}
      {props.assignee.companiesByRating.length > 0 && (
        <h2 className={styles.subTitle}>BY MR RATING</h2>
      )}
      {props.assignee.companiesByRating.map(company => (
        <div
          className={styles.userStatsMrRow}
          key={`${props.assignee}-company-${company.field.value}`}
        >
          <BobjectFieldPill field={company.field} /> {company.value}
        </div>
      ))}
    </div>
  );
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.id = props.key;
  }

  componentDidMount() {
    this.props.setDroppableElement({
      element: this.ref.current,
      assigneeId: this.props.assignee.id,
    });
  }

  render() {
    const { assignee, isCloserElement, setAssigneeExpanded, assigneeExpanded } = this.props;
    const isExpanded = assigneeExpanded === assignee.id;
    const newAssignedCount = this.props.newAssignedCount || 0;
    const totalCompanies = assignee.totalCompanies + newAssignedCount;

    return (
      <div
        className={classNames(styles.card, {
          [styles.cardExpanded]: isExpanded,
          [styles.cardCloser]: isCloserElement,
        })}
        ref={this.ref}
        key={this.id}
      >
        <div
          className={styles.cardHeader}
          onClick={setAssigneeExpanded(isExpanded ? undefined : assignee.id)}
        >
          <div className={styles.assigneeContainer}>
            <Collapsible
              color="softPeanut"
              title={
                <div className={styles.asigneeName}>
                  <Text size="m" inline>
                    {assignee.name}
                  </Text>
                  <Text className={styles.summaryNumber} size="m" color="softPeanut" inline>
                    {totalCompanies}{' '}
                  </Text>
                </div>
              }
              expanded={isExpanded}
              arrowPosition="right"
            >
              <UserStats {...this.props} newAssignedCount={newAssignedCount} />
            </Collapsible>
          </div>
          <span className={styles.summaryBar}>
            <span
              title={`Delivered New (${newAssignedCount})`}
              style={{
                backgroundColor: 'var(--verySoftPeanut)',
                width: `${(100 * newAssignedCount) / totalCompanies}%`,
              }}
            />
            {assignee.companiesByStage.map(company => (
              <span
                key={`${assignee.id}-company-${company.field.value}`}
                title={`${company.field.text} (${company.value})`}
                style={{
                  backgroundColor: company.field.valueBackgroundColor,
                  width: `${(100 * company.value) / totalCompanies}%`,
                }}
              />
            ))}
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  companyDragged: state.taskWorkspace.board.allocateQcTask.companyDragged,
  assigneeExpanded: state.taskWorkspace.board.allocateQcTask.assigneeExpanded,
  isCloserElement:
    state.taskWorkspace.board.allocateQcTask.closerElement !== undefined
      ? state.taskWorkspace.board.allocateQcTask.closerElement.assigneeId === ownProps.assignee.id
      : undefined,
});

const mapDispatchToProps = dispatch => ({
  setDroppableElement: droppable =>
    dispatch({ type: COMPANIES_TO_ALLOCATE_SET_DROPPABLE_ELEMENT, droppable }),
  setAssigneeExpanded: assigneeId => () =>
    dispatch({ type: ALLOCATE_QC_TASK_ASSIGNEE_EXPANDED, assigneeId }),
  setUndoAssignment: assigneeId => () => {
    dispatch({ type: ALLOCATE_QC_TASK_ASSIGNEE_CLEAR, assigneeId });
  },
});

export const Assignee = connect(mapStateToProps, mapDispatchToProps)(Index);
