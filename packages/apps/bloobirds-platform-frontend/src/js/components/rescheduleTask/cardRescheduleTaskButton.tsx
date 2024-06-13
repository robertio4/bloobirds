import React from 'react';
import { useTranslation } from 'react-i18next';

import { CardButton } from '@bloobirds-it/flamingo-ui';
import { Bobject, BobjectTypes } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import { MIXPANEL_EVENTS } from '../../constants/mixpanel';
import { useMediaQuery } from '../../hooks';
import { useRescheduleCadenceTask } from './useRescheduleCadenceTask';

const CardRescheduleTaskButton = ({
  task,
  size = 'm',
}: {
  task: Bobject<BobjectTypes.Task>;
  size?: 'm' | 's';
}) => {
  const { openRescheduleTaskModal } = useRescheduleCadenceTask();
  const { isSmallDesktop } = useMediaQuery();
  const { t } = useTranslation();
  return (
    <CardButton
      iconLeft="clock"
      dataTest="Reschedule-Task"
      variant="secondary"
      onClick={event => {
        mixpanel.track(MIXPANEL_EVENTS.RESCHEDULE_TASK_FROM_CARD);
        event.preventDefault();
        event.stopPropagation();
        openRescheduleTaskModal(task);
      }}
    >
      {!isSmallDesktop && size === 'm' && t('common.reschedule')}
    </CardButton>
  );
};

export default CardRescheduleTaskButton;
