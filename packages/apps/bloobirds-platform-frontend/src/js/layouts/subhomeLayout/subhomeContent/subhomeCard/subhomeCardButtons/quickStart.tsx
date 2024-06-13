import React from 'react';
import mixpanel from 'mixpanel-browser';
import { CardButton } from '@bloobirds-it/flamingo-ui';
import { MIXPANEL_EVENTS } from '../../../../../constants/mixpanel';
import { Bobject } from '../../../../../typings/bobjects';
import { useQuickStart } from '../../../../../hooks/useQuickStart';

export const CardQuickStartButton = ({
  isSmallDesktop,
  bobject,
  mixpanelKey,
}: {
  isSmallDesktop?: boolean;
  bobject?: Bobject;
  mixpanelKey?: string;
}) => {
  const { openQuickStart } = useQuickStart();

  return (
    <CardButton
      dataTest="Subhome-QuickStart"
      variant="secondary"
      iconLeft="playOutline"
      onClick={event => {
        mixpanel.track(MIXPANEL_EVENTS[`QUICK_START_ACTION_CLICKED_ON_${mixpanelKey}_TAB`]);
        event.preventDefault();
        event.stopPropagation();
        openQuickStart(bobject);
      }}
    >
      {!isSmallDesktop && 'Quick start'}
    </CardButton>
  );
};
