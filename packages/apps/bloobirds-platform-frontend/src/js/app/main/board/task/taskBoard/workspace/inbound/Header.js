import { Redirect, Route } from 'react-router';
import { TabGroup, Tab } from '@bloobirds-it/flamingo-ui';
import {
  APP_TASKS_INBOUND,
  APP_TASKS_INBOUND_MQL,
  APP_TASKS_INBOUND_SAL,
} from '../../../../../../_constants/routes';
import React from 'react';
import { withWrappers } from '../../../../../../../misc/utils';
import { BOBJECT_INBOUND_TABLE_RESET_VIEW } from '../../../../../../../actions/dictionary';
import styles from './inbound.module.css';

const Header = ({ history, resetView }) => (
  <div className={styles.header_root}>
    <div className={styles.header_titlesContainer}>
      <h1 className={styles.header_title}>Inbound activity pending to review</h1>
      <p className={styles.header_subtitle}>
        Accept{' '}
        <span role={'img'} aria-label={'emoji'}>
          &#9989;
        </span>{' '}
        or discard{' '}
        <span role={'img'} aria-label={'emoji'}>
          &#10060;
        </span>{' '}
        the inbound lead activity
      </p>
    </div>
    <div className={styles.header_tabsContainer}>
      <Route
        path={APP_TASKS_INBOUND}
        render={() => (
          <TabGroup
            onClick={value => {
              const url = value === 'MQL' ? APP_TASKS_INBOUND_MQL : APP_TASKS_INBOUND_SAL;
              history.push(url);
            }}
          >
            <Tab name="MQL" onClick={resetView} />
            <Tab name="SAL" onClick={resetView} />
          </TabGroup>
        )}
      />
      <Route
        path={APP_TASKS_INBOUND}
        exact
        component={() => <Redirect to={APP_TASKS_INBOUND_MQL} />}
      />
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  resetView: () => dispatch({ type: BOBJECT_INBOUND_TABLE_RESET_VIEW }),
});

export default withWrappers({ mapDispatchToProps })(Header);
