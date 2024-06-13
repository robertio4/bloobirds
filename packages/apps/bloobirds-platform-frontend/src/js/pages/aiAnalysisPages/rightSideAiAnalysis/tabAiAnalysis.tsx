import React from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, IconType, Text } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import styles from '../aiAnalysisPage.module.css';

interface Props {
  name: string;
  active?: boolean;
  icon: IconType;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: React.ReactChild;
}

const TabAiAnalysis = ({ name, active, icon, onClick }: Props) => {
  const { t } = useTranslation();

  const color = active ? 'purple' : 'softPeanut';

  const classes = clsx(styles.tabContainer, {
    [styles.tabContainerActive]: !active,
  });

  return (
    <div
      className={classes}
      role="tab"
      onClick={event => {
        onClick?.(event);
      }}
    >
      <Icon name={icon} color={color} size={24} />
      <Text size="xs" color={color} weight={'medium'}>
        {name}
      </Text>
    </div>
  );
};

export default TabAiAnalysis;
