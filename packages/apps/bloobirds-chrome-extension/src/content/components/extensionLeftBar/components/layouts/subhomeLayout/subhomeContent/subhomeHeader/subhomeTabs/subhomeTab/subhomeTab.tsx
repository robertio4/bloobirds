import React from 'react';

import { Icon, IconType, Text } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import styles from '../subhomeTabs.module.css';

const SubhomeTab = ({
  active,
  children,
  icon,
  counter,
  onClick,
  disabled,
}: {
  active: boolean;
  children: React.ReactNode[] | React.ReactNode;
  icon?: IconType;
  counter?: number;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <div
      className={clsx(styles._tab, {
        [styles._tab_active]: active,
      })}
      onClick={() => {
        if (!disabled && onClick) {
          onClick();
        }
      }}
    >
      <Icon size={16} name={icon} color={active ? 'bloobirds' : 'softPeanut'} />
      {active && (
        <Text
          size="xxs"
          color={active ? 'bloobirds' : 'softPeanut'}
          weight={active ? 'bold' : 'regular'}
          className={styles._tab_title}
        >
          {children}
        </Text>
      )}
      {counter !== undefined && !Number.isNaN(counter) && (
        <div
          className={styles._counter}
          style={active ? { backgroundColor: 'var(--verySoftBloobirds)' } : undefined}
        >
          <Text size="xxs" align="center">
            {counter}
          </Text>
        </div>
      )}
    </div>
  );
};

export default SubhomeTab;
