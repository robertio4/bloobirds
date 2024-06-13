import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Tooltip } from '@bloobirds-it/flamingo-ui';

import styles from './otoQSGSteps.module.css';

const OpenExtension = ({
  handleFinish,
  allTasksCompleted,
}: {
  handleFinish: () => void;
  allTasksCompleted?: boolean;
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'quickStartGuide.oto.blocks.start' });

  return (
    <div className={styles.extension_btn}>
      <Tooltip title={!allTasksCompleted && t('tooltip')} position="top">
        <Button
          iconRight="share"
          disabled={!allTasksCompleted}
          onClick={() => {
            window.open(
              'https://chrome.google.com/webstore/detail/bloobirds/bfnmjliageccndnbpoadbigbnhicogbh',
            );
            handleFinish();
          }}
        >
          {t('installBloobirds')}
        </Button>
      </Tooltip>
    </div>
  );
};

export default OpenExtension;
