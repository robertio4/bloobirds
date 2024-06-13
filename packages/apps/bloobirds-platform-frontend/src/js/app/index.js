import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';

import { api } from '@bloobirds-it/utils';
import * as Sentry from '@sentry/react';
import { RecoilRoot } from 'recoil';
import useSWR from 'swr';
import { QueryParamProvider } from 'use-query-params';

import VersionOutdated from '../components/versionOutdated/versionOutdated';
import { useLogin } from '../hooks/useLogin';
import SessionManagerFactory from '../misc/session';
import { ExternalActions } from '../pages/externalActionsPages/externalActions';
import LoginPage from '../pages/loginPage/loginPage';
import {
  APP,
  APP_TASKS,
  EXTERNAL_ACTION,
  HOME,
  LOGIN,
  PRIVACY_POLICY,
  TERMS_AND_CONDITIONS,
} from './_constants/routes';
import styles from './app.module.css';
import routerHistory from './history';
import AuthenticatedScopeApp from './main/AuthenticatedScopeApp';
import { PrivacyPolicy } from './privacyPolicy';
import { TermsAndConditions } from './termsAndConditions';

const SessionManager = SessionManagerFactory();

const getAuthUrl = () => {
  const env = process.env.ENV;
  switch (env) {
    case 'development':
      return 'https://auth.dev-bloobirds.com';
    case 'production':
      return 'https://auth.bloobirds.com';
    default:
      return `http://localhost:5173`;
  }
};

const PrivateRoute = ({ isLogged, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return isLogged || !SessionManager.hasEmptySession() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: LOGIN,
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);

const AppContent = () => {
  const { isLogged, loginWithToken } = useLogin();
  const { data } = useSWR('authEnabled', () => api.get('/auth/service/jwt/new-auth-enabled'));

  return data ? (
    <div className={styles.app}>
      <Route exact path={TERMS_AND_CONDITIONS} component={TermsAndConditions} />
      <Route exact path={PRIVACY_POLICY} component={PrivacyPolicy} />
      <Route
        exact
        path={HOME}
        render={props => (
          <Redirect
            to={{
              pathname: APP,
              state: { from: props.location },
            }}
          />
        )}
      />
      <PrivateRoute isLogged={isLogged} path={APP} component={AuthenticatedScopeApp} />
      <Route
        path={LOGIN}
        render={props => {
          if (SessionManager.hasEmptySession()) {
            // Redirect to the login page based on the env: localhost:5173, auth.dev-bloobirds.com, auth.bloobirds.com
            if (data.data?.newAuthEnabled) {
              window.location.href = getAuthUrl();
            } else {
              return <LoginPage isLogged={isLogged} {...props} />;
            }
          }
          const stateFrom = props.location?.state?.from;
          if (stateFrom) {
            stateFrom.search = '';
          }
          const redirectTo = stateFrom && stateFrom !== LOGIN ? stateFrom : APP_TASKS;
          return <Redirect to={redirectTo} />;
        }}
      />
      <Route path={EXTERNAL_ACTION} component={ExternalActions} />
    </div>
  ) : null;
};

const App = () => (
  <RecoilRoot key={SessionManager.getUser()?.id}>
    <Router history={routerHistory}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <AppContent />
      </QueryParamProvider>
    </Router>
    <VersionOutdated />
  </RecoilRoot>
);

export default Sentry.withProfiler(App);
