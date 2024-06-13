import React from 'react';

import { Text } from '@bloobirds-it/flamingo-ui';

import SessionManagerFactory from '../../../../../misc/session';
import styles from './otoSlides.module.css';

const SessionManager = SessionManagerFactory();

function CollageScreenOTO() {
  const { name } = SessionManager?.getUser() || {};

  return (
    <div key={'firstScreen'} className={styles.backgroundWhite}>
      <div className={styles.subtitleContent}>
        <Text
          size="m"
          align="center"
          weight="bold"
          color="softPeanut"
          className={styles.subtitleText}
        >
          Welcome to{' '}
          <Text size="m" weight="bold" color="bloobirds" inline className={styles.subtitleText}>
            Bloobirds
          </Text>
          , {name}!
        </Text>
      </div>
      <div className={styles.titleContent}>
        <Text size="xxl" align="center" weight="heavy">
          Make the CRM work for you,
          <br />
          not the other way around
        </Text>
      </div>
      <div className={styles.descriptionContent}>
        <Text size="s" align="center" className={styles.descriptionText}>
          Bloobirds’ Sales Engagement Platform increases CRM adoption,
          <br />
          boosts productivity and drives more revenue ✨
        </Text>
      </div>
    </div>
  );
}
export default CollageScreenOTO;
