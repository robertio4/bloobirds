import React from 'react';
import { Route, withRouter } from 'react-router';

import { APP_CADENCES_ANALYZE, APP_CADENCES_EDIT, APP_CADENCES_MANAGE } from '@bloobirds-it/types';

import { CadenceEditionPage } from './cadenceEditionPage/cadenceEditionPage';
import CadencesPageView, { CadenceTabs } from './cadencesPage.view';

const Routes = () => {
  return (
    <>
      <Route exact path={APP_CADENCES_MANAGE}>
        <CadencesPageView tab={CadenceTabs.Manage} />
      </Route>
      <Route exact path={APP_CADENCES_ANALYZE}>
        <CadencesPageView tab={CadenceTabs.Analyze} />
      </Route>
      <Route exact path={APP_CADENCES_EDIT}>
        <CadenceEditionPage />
      </Route>
    </>
  );
};

export default withRouter(Routes);
