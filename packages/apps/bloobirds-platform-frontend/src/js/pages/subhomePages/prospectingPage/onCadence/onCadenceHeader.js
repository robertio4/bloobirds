import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import { APP_MANAGEMENT_USER } from '../../../../app/_constants/routes';
import { useRouter } from '../../../../hooks';
import styles from './onCadence.module.css';

export const OnCadenceHeader = () => {
  const { history } = useRouter();

  return (
    <div
      className={styles._pause_cadence_link}
      onClick={() => {
        history.push(`${APP_MANAGEMENT_USER}?tab=CADENCE`);
      }}
    >
      <Text size="xxs" color="peanut">
        <Icon name="pauseOutlined" size={16} color="peanut" /> Pause cadences
      </Text>
    </div>
  );
};
