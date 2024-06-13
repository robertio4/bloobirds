import React from 'react';
import { useTranslation } from 'react-i18next';

import { CardButton } from '@bloobirds-it/flamingo-ui';
import { useOpenSkipTaskModal, useSkipModal } from '@bloobirds-it/hooks';
import { Bobject, BobjectTypes } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import { MIXPANEL_EVENTS } from '../../../../../constants/mixpanel';
import { useMediaQuery } from '../../../../../hooks';

export const SkipTaskButton = ({
  task,
  size = 'm',
  variant = 'secondary',
}: {
  task: Bobject<BobjectTypes.Task>;
  size?: 'm' | 's';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'clear';
}) => {
  const { isSmallDesktop } = useMediaQuery();
  const { openSkipTaskModal } = useOpenSkipTaskModal();
  const { hasSkipReasons, skipTask } = useSkipModal();
  const { t } = useTranslation();
  return (
    <CardButton
      iconLeft="skipForward"
      dataTest="Skip-Task"
      variant={variant}
      onClick={event => {
        mixpanel.track(MIXPANEL_EVENTS.SKIP_TASK_FROM_CARD);
        event.preventDefault();
        event.stopPropagation();
        if (hasSkipReasons) {
          openSkipTaskModal(task);
        } else {
          skipTask(task);
        }
      }}
    >
      {!isSmallDesktop && size === 'm' && t('common.skip')}
    </CardButton>
  );
};
