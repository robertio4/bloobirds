import React from 'react';
import { Button } from '@bloobirds-it/flamingo-ui';
import styles from './conditions.module.css';
import WorkflowConditionsSection from './components/workflowConditionsSection';
import { useWorkflow } from '../../context/workflowsContext';

const WorkflowConditions = ({ isEditing }: { isEditing: boolean }) => {
  const {
    state: { trigger, conditions, isEnabled, isLocked },
    isMissingInfo,
    addOrBlock,
  } = useWorkflow();

  return (
    <>
      {conditions?.length === 0 && (
        <>
          <div className={styles._conditions_connector_wrapper}>
            <div className={styles._conditions_connector} />
            <div className={styles._conditions_excluding_button}>
              <Button
                size="small"
                variant="secondary"
                expand={false}
                color="purple"
                disabled={!trigger || isEnabled || isLocked}
                onClick={() => {
                  addOrBlock();
                  isMissingInfo(true);
                }}
              >
                + condition
              </Button>
            </div>
          </div>
        </>
      )}
      {(isEditing || conditions?.length > 0) &&
        conditions?.map((fields, index) => {
          return (
            <>
              <WorkflowConditionsSection key={index} index={index} fields={fields} />
            </>
          );
        })}
    </>
  );
};

export default WorkflowConditions;
