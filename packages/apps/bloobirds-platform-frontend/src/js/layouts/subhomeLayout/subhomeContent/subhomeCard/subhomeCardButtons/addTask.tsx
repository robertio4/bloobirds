import React from 'react';

import { CardButton } from '@bloobirds-it/flamingo-ui';
import mixpanel from 'mixpanel-browser';

import { MIXPANEL_EVENTS } from '../../../../../constants/mixpanel';
import { useBobjectFormCreation } from '../../../../../hooks';
import { Bobject } from "@bloobirds-it/types";

export const CardAddTaskButton = ({
  isSmallDesktop,
  bobject,
  mixpanelKey,
}: {
  isSmallDesktop?: boolean;
  bobject?: Bobject;
  mixpanelKey?: string;
}) => {
  const { openAddTask } = useBobjectFormCreation();
  return (
    <CardButton
      dataTest="Subhome-AddTask"
      variant="secondary"
      iconLeft="check"
      onClick={event => {
        // @ts-ignore
        mixpanel.track(MIXPANEL_EVENTS[`ADD_TASK_ACTION_CLICKED_ON_${mixpanelKey}_TAB`]);
        event.preventDefault();
        event.stopPropagation();
        openAddTask({ bobject: bobject });
      }}
    >
      {!isSmallDesktop && 'Add Task'}
    </CardButton>
  );
};
