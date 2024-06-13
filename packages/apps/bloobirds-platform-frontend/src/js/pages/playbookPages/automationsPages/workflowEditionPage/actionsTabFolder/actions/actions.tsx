import React from 'react';

import { useWorkflow } from '../../context/workflowsContext';
import WorkflowActionsSection from './modules/workflowActionSection';

const WorkflowActions = () => {
  const { state } = useWorkflow();

  return (
    <>
      {state.actions.map((action, index) => (
        <WorkflowActionsSection
          action={action}
          blockIndex={index}
          key={`action-${index}-${action.type}`}
        />
      ))}
    </>
  );
};

export default WorkflowActions;
