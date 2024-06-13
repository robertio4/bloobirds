import React from 'react';

import { Action, Text } from '@bloobirds-it/flamingo-ui';

import styles from './aside.module.css';

const Aside = () => (
  <div className={styles._container}>
    <div className={styles._description_container}>
      <Text size="xxl" color="white" htmlTag="h1" weight="bold">
        The next generation of B2B prospecting
      </Text>
      <div className={styles._text_wrapper}>
        <Text size="m" color="white">
          Bloobirds&apos; end-to-end prospecting platform guides your sales development team through
          the challenge of converting leads and target accounts into qualified sales opportunities.
        </Text>
      </div>
      <Action
        color="white"
        icon="playOutline"
        onClick={() => window.open('https://bloobirds.com/', '_blank')}
      />
    </div>
  </div>
);

export default Aside;
