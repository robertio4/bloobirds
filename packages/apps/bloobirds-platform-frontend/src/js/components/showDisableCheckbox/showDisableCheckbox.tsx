import React from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox, Tooltip } from '@bloobirds-it/flamingo-ui';

import styles from './showDisableCheckbox.module.css';

export const ShowDisableCheckbox = ({
  showDisabled,
  setShowDisabled,
  isAllDisabled,
}: {
  showDisabled: boolean;
  setShowDisabled: (value: boolean) => void;
  isAllDisabled?: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.actions}>
      <Tooltip title={isAllDisabled && t('common.showDisabledWorkflowsTooltip')} position="bottom">
        <Checkbox
          onClick={value => setShowDisabled(value)}
          checked={showDisabled}
          color="purple"
          size="small"
          disabled={isAllDisabled}
        >
          {t('common.showDisabled')}
        </Checkbox>
      </Tooltip>
    </div>
  );
};
