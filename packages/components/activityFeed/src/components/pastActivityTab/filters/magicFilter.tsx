import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@bloobirds-it/flamingo-ui';

import styles from './pastActivityFilters.module.css';

const MagicFilter = ({
  isDisabled,
  magicFilterHandling: [activeMagicFilter, setActiveMagicFilter],
}: {
  isDisabled: boolean;
  magicFilterHandling: [boolean, (value: boolean) => void];
}) => {
  const { t } = useTranslation();
  return (
    <Button
      iconLeft="magic"
      color={isDisabled ? 'softPeanut' : 'purple'}
      size="small"
      onClick={() => {
        setActiveMagicFilter(!activeMagicFilter);
      }}
      variant={activeMagicFilter ? 'primary' : 'clear'}
      uppercase={false}
      disabled={isDisabled}
      className={styles._magic_filter}
    >
      {t('activityTimelineItem.activityFeed.magicFilter')}
    </Button>
  );
};

export default MagicFilter;
