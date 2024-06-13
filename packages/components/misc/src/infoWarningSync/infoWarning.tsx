import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import { Action, Dropdown } from '@bloobirds-it/flamingo-ui';

import styles from './infoWarning.module.css';

export const InfoWarning = ({ message }: { message }) => {
  const [visible, setVisible] = useState(false);

  const ref = useRef(null);
  useClickAway(ref, () => setVisible(false));

  return (
    <Dropdown
      visible={visible}
      width={200}
      position="top"
      style={{
        padding: '0px',
      }}
      ref={ref}
      anchor={
        <div
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className={styles.anchorInfo}
        >
          <Action icon="alertTriangle" color="softBanana" />
        </div>
      }
      color="verySoftBanana"
    >
      <div className={styles.body}>{message}</div>
    </Dropdown>
  );
};
