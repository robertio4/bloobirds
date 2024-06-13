import React from 'react';

import { CardButton } from '@bloobirds-it/flamingo-ui';
import { Bobject, BobjectTypes } from '@bloobirds-it/types';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';
import mixpanel from 'mixpanel-browser';

import { MIXPANEL_EVENTS } from '../../../../../constants/mixpanel';
import { isSalesPage } from '../../../../../utils/pages.utils';

export const CardNextStepButton = ({
  isSmallDesktop,
  bobject,
}: {
  isSmallDesktop?: boolean;
  bobject?: Bobject;
}) => {
  const { openWizard } = useWizardContext();
  const subhomeStage = isSalesPage(window.location.href) ? 'SALES' : 'PROSPECTING';
  return (
    <CardButton
      dataTest="Subhome-QuickStart"
      iconLeft="bookmark"
      onClick={event => {
        mixpanel.track(
          MIXPANEL_EVENTS[
            `NEXT_STEP_ACTION_CLICKED_ON_INACTIVE_${subhomeStage}_${
              bobject?.id?.typeName?.toUpperCase() as Uppercase<BobjectTypes.Company>
            }_TAB`
          ],
        );
        event.preventDefault();
        event.stopPropagation();
        openWizard(WIZARD_MODALS.NEXT_STEP, bobject);
      }}
    >
      {!isSmallDesktop && 'Next Step'}
    </CardButton>
  );
};
