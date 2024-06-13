import React from 'react';

import { Text } from '@bloobirds-it/flamingo-ui';

// @ts-ignore
import WelcomeSVG from '../../../../../assets/welcomeScreen.png';
import SessionManagerFactory from '../../../../misc/session';
import styles from './slides.module.css';

const SessionManager = SessionManagerFactory();

function FirstScreen() {
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
        <Text size="m" align="center" color="softPeanut" className={styles.subtitleText}>
          We&apos;re so glad you&apos;re here! 😍
        </Text>
      </div>
      <div className={styles.titleContent}>
        <Text size="xxl" align="center" weight="heavy">
          The only sales engagement +<br />
          <Text size="xxl" weight="heavy" color="purple" inline>
            playbook
          </Text>{' '}
          platform
        </Text>
      </div>
      <div className={styles.descriptionContent}>
        <Text size="s" align="center" className={styles.descriptionText}>
          Bloobirds digitalizes your sales playbook while
          <br />
          guiding and assisting sales reps in real time ✨
        </Text>
      </div>
      <div className={styles.svgContent}>
        <img height="238px" src={WelcomeSVG} alt="svg" />
      </div>
    </div>
  );
}
export default FirstScreen;
