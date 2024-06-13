import React from 'react';
import { CardButton } from '@bloobirds-it/flamingo-ui';
import mixpanel from 'mixpanel-browser';
import { STEPS } from '../../../../../components/cadenceControlModal/cadenceControlModal.machine';
import { Bobject } from '../../../../../typings/bobjects';
import { useCadenceControl } from '../../../../../hooks';
import { MIXPANEL_EVENTS } from '../../../../../constants/mixpanel';

export const CardSetCadenceButton = ({
  isSmallDesktop,
  bobject,
  mixpanelKey,
  onSaveAction,
}: {
  isSmallDesktop?: boolean;
  bobject?: Bobject;
  mixpanelKey?: string;
  onSaveAction?: () => void;
}) => {
  const { openCadenceControl } = useCadenceControl();

  return (
    <CardButton
      dataTest="Subhome-SetCadence"
      iconLeft="calendar"
      onClick={event => {
        mixpanel.track(
          MIXPANEL_EVENTS[
            `${bobject?.id?.typeName.toUpperCase()}_SET_CADENCE_ACTION_CLICKED_ON_${mixpanelKey}_TAB`
          ],
        );
        event.preventDefault();
        event.stopPropagation();
        openCadenceControl({
          previousStep: false,
          bobjectToSet: bobject,
          step: STEPS.CONFIGURE_CADENCE,
          onSaveCallback: onSaveAction,
          response: undefined,
        });
      }}
    >
      {!isSmallDesktop && 'Set Cadence'}
    </CardButton>
  );
};
