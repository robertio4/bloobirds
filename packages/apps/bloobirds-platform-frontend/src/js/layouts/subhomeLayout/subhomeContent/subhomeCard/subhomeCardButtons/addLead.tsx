import React from 'react';

import { CardButton } from '@bloobirds-it/flamingo-ui';
import mixpanel from 'mixpanel-browser';

import { MIXPANEL_EVENTS } from '../../../../../constants/mixpanel';
import useAddLead from '../../../../../hooks/useAddLead';
import { Bobject } from "@bloobirds-it/types";

export const CardAddLeadButton = ({
  isSmallDesktop,
  bobject,
  mixpanelKey,
}: {
  isSmallDesktop?: boolean;
  bobject?: Bobject;
  mixpanelKey?: 'DELIVERED' | 'INACTIVE_PROSPECTING';
}) => {
  const { openAddLeadModal } = useAddLead();

  return (
    <CardButton
      iconLeft="personAdd"
      dataTest="Subhome-AddLead"
      variant="secondary"
      onClick={event => {
        mixpanel.track(MIXPANEL_EVENTS[`ADD_LEAD_ACTION_CLICKED_ON_${mixpanelKey}_TAB`]);
        event.preventDefault();
        event.stopPropagation();
        openAddLeadModal({ company: bobject });
      }}
    >
      {!isSmallDesktop && 'Add lead'}
    </CardButton>
  );
};
