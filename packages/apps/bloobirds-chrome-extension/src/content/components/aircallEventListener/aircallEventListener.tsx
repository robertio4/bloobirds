import React from 'react';

import { fillReferenceFields, getMainBobjectId } from '@bloobirds-it/dialer';
import { useAircallPhoneLinkEnabled, useOpenCCFWithoutObject } from '@bloobirds-it/hooks';
import { useEventSubscription } from '@bloobirds-it/plover';
import { Bobject, PluralBobjectTypes } from '@bloobirds-it/types';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';
import normalizeUrl from 'normalize-url';

import { api } from '../../../utils/api';
import { isSalesforcePage } from '../../../utils/url';

enum AircallCallStatus {
  ended = 'call.ended',
  started = 'call.started',
  missed = 'call.missed',
  hungup = 'call.hungup',
}

export type AircallWSEvent = {
  lead: string;
  company: string;
  activityId: string;
  callStatus: AircallCallStatus;
  action: string;
};

export const AircallEventListener = () => {
  const { openWizard, resetWizardProperties } = useWizardContext();

  const [showCorrectContactFlow, setShowCorrectContactFlow] = React.useState(false);
  const [mainActivityBobject, setMainActivityBobject] = React.useState(null);
  const [activityCCF, setActivityCCF] = React.useState(null);
  const hasOpenCCFWithoutObjectAccount = useOpenCCFWithoutObject();
  const hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();
  const url = normalizeUrl(window.location.href);

  useEventSubscription(
    'aircall',
    hasAircallPhoneLinkEnabled
      ? (value: AircallWSEvent) => {
          const windowReady = isSalesforcePage(url) && document?.visibilityState === 'visible';
          if (value?.activityId && value?.callStatus === AircallCallStatus.hungup && windowReady) {
            api.get(`/bobjects/${value?.activityId}/form?injectReferences=true`).then(response => {
              if (response?.data) {
                const activityToCCF = fillReferenceFields(response?.data);
                if (activityToCCF) {
                  setActivityCCF(activityToCCF);
                  openCorrectContactFlow(activityToCCF);
                }
              }
            });
          }
        }
      : () => {},
  );

  async function openCorrectContactFlow(activity: Bobject) {
    const mainBobjectId = getMainBobjectId(activity);
    if (mainBobjectId) {
      const response = await api.get(
        `/linkedin/${PluralBobjectTypes[mainBobjectId.split('/')[1]]?.toLowerCase()}/${
          mainBobjectId.split('/')[2]
        }`,
      );
      setMainActivityBobject(response?.data);
    }
    setShowCorrectContactFlow(true);
  }

  function handleClose() {
    setActivityCCF(null);
    setShowCorrectContactFlow(false);
    setMainActivityBobject(null);
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }

  return (
    <>
      {showCorrectContactFlow &&
        activityCCF &&
        (mainActivityBobject || hasOpenCCFWithoutObjectAccount) &&
        openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activityCCF, {
          referenceBobject: mainActivityBobject,
          handleClose: handleClose,
        })}
    </>
  );
};
