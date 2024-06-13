import React from 'react';
import { CardButton } from '@bloobirds-it/flamingo-ui';
import mixpanel from 'mixpanel-browser';
import { MIXPANEL_EVENTS } from '../../../../../constants/mixpanel';
import { Bobject } from '../../../../../typings/bobjects';
import useAddCompany from '../../../../../hooks/useAddCompany';
import { getFieldByLogicRole } from '../../../../../utils/bobjects.utils';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../../constants/lead';

export const CardReassignCompanyButton = ({
  isSmallDesktop,
  bobject,
  onSaveAction,
  mixpanelKey,
}: {
  isSmallDesktop?: boolean;
  bobject?: Bobject;
  onSaveAction?: () => void;
  mixpanelKey?: string;
}) => {
  const { openAddCompanyModal } = useAddCompany();
  const leadHasCompany = !!getFieldByLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;

  return (
    <CardButton
      dataTest="Subhome-AddTask"
      variant="secondary"
      iconLeft="company"
      onClick={event => {
        mixpanel.track(MIXPANEL_EVENTS[`REASSIGN_ACTION_CLICKED_ON_${mixpanelKey}_TAB`]);
        event.preventDefault();
        event.stopPropagation();
        openAddCompanyModal({ bobject: bobject, onSaveCallback: onSaveAction });
      }}
    >
      {!isSmallDesktop && `${leadHasCompany ? 'Reassign' : 'Assign'} company`}
    </CardButton>
  );
};
