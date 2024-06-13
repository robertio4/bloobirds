import React from 'react';

import { CardButton, Tooltip, useToasts } from '@bloobirds-it/flamingo-ui';
import {
  Bobject,
  BobjectTypes,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
} from '@bloobirds-it/types';
import { api, getFieldByLogicRole } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';

import { MIXPANEL_EVENTS } from '../../../../../constants/mixpanel';
import { useMediaQuery } from '../../../../../hooks';

export const PriorityButton = ({
  task,
  size = 'm',
  variant = 'secondary',
}: {
  task: Bobject<BobjectTypes.Task>;
  size?: 'm' | 's';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'clear';
}) => {
  const { isSmallDesktop } = useMediaQuery();
  const { createToast } = useToasts();
  const bobjectId = task?.id?.value;
  const taskPriority = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.PRIORITY)?.valueLogicRole;
  const isImportant = taskPriority === TASK_PRIORITY_VALUE.IMPORTANT;

  const dataToCreate = {
    [TASK_FIELDS_LOGIC_ROLE.PRIORITY]: isImportant
      ? TASK_PRIORITY_VALUE.NO_PRIORITY
      : TASK_PRIORITY_VALUE.IMPORTANT,
  };

  const markAsImportant = () => {
    api
      .patch(`/bobjects/${bobjectId}/raw`, {
        contents: { ...dataToCreate },
        params: {},
      })
      .then(() => {
        createToast({ message: 'Task edited successfully', type: 'success' });
      });
  };

  return (
    <Tooltip title={isImportant ? 'Unmark as important' : 'Mark as important'} position="top">
      <CardButton
        iconLeft="flag"
        dataTest="Mark-Task-Priority"
        variant={variant}
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();

          if (isImportant) {
            mixpanel.track(MIXPANEL_EVENTS.UNMARK_AS_IMPORTANT_TASK_FROM_CARD);
          } else {
            mixpanel.track(MIXPANEL_EVENTS.MARK_AS_IMPORTANT_TASK_FROM_CARD);
          }
          markAsImportant();
        }}
      >
        {!isSmallDesktop && size === 'm' && 'Important'}
      </CardButton>
    </Tooltip>
  );
};
