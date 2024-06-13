import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Routes from '../../_constants/routes';
import styles from './notFound.module.css';

const Index = () => (
  <div className={styles.root}>
    <h1>404</h1>
  </div>
);

const NotFoundManager = () => (
  <Switch>
    {Object.values(Routes)
      .filter(route => typeof route === 'string')
      .map(route => (
        <Route exact path={route} key={`route-${route}`} />
      ))}
    {Routes.IAPP_INTEGRATIONS.map(integration => {
      return Object.values(Routes.integrationURLs(integration)).map(route => (
        <Route exact path={route} key={`route-${route}`} />
      ));
    })}
    <Route component={Index} />
  </Switch>
);

export default NotFoundManager;
