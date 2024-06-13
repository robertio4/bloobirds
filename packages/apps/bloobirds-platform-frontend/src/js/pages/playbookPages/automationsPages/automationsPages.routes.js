import React from 'react';
import { Route } from 'react-router';

import {
  APP_PLAYBOOK_MESSAGING_WORKFLOWS,
  APP_PLAYBOOK_MESSAGING_WORKFLOWS_EDIT,
} from '../../../app/_constants/routes';
import { WorkflowsProvider } from './workflowEditionPage/context/workflowsContext';
import WorkflowEditionPage from './workflowEditionPage/workflowEditionPage';
import WorkflowsPage from './workflowsPage/workflowsPage';

const AutomationsPagesRoutes = () => {
  return (
    <>
      <Route exact path={APP_PLAYBOOK_MESSAGING_WORKFLOWS} component={WorkflowsPage} />
      <Route
        exact
        path={APP_PLAYBOOK_MESSAGING_WORKFLOWS_EDIT}
        render={() => {
          return (
            <WorkflowsProvider>
              <WorkflowEditionPage />
            </WorkflowsProvider>
          );
        }}
      />
    </>
  );
};

export default AutomationsPagesRoutes;
