import { Text } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import LogoIcon from '../bloobirds';
import styles from './logoHeader.module.css';

const LogoHeader = ({ sidePeekEnabled }: { sidePeekEnabled: boolean }) => {
  const containerClasses = clsx(styles._container, {
    [styles._container_sidePeek]: sidePeekEnabled,
  });

  return (
    <div className={containerClasses}>
      <LogoIcon
        width={sidePeekEnabled ? 64 : 60}
        height={sidePeekEnabled ? 64 : 60}
        fill="var(--bloobirds)"
      />
      <div className={styles._text}>
        <Text color="peanut" htmlTag="h1" weight="bold" size={sidePeekEnabled ? 'xxl' : 'xl'}>
          Bloobirds
        </Text>
      </div>
    </div>
  );
};

export default LogoHeader;
