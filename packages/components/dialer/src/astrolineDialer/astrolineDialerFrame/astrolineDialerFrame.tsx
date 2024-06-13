import React, { useEffect, useState } from 'react';

import { Bobject, PluralBobjectTypes } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';

import { fillReferenceFields, getMainBobjectId } from '../../utils';
import styles from './astrolineDialerFrame.module.css';

export const AstrolineDialerFrame = ({ launchCCF }: { launchCCF: boolean }) => {
  const [activityCCF, setActivityCCF] = useState(null);
  const [showCorrectContactFlow, setShowCorrectContactFlow] = React.useState(false);
  const [mainActivityBobject, setMainActivityBobject] = React.useState(null);
  const { openWizard, resetWizardProperties } = useWizardContext();
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

  const createCallAndLaunchCCF = async (details: any) => {
    const { data: activity } = await api.post(
      '/calls/astroline/calls/' + details?.data?.id + '/end',
      {
        ...details,
      },
    );
    if (launchCCF) {
      api
        .get(`/bobjects/${activity?.activity?.value}/form?injectReferences=true`)
        .then(response => {
          const activityToCCF = fillReferenceFields(response?.data);
          if (response?.data) {
            setActivityCCF(activityToCCF);
          }
          openCorrectContactFlow(activityToCCF);
        });
    }
  };

  useEffect(() => {
    const listener = ({ data: details }) => {
      if (details?.type === 'phone:terminated' && details?.data?.id) {
        createCallAndLaunchCCF(details);
      }
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, []);

  function handleClose() {
    setActivityCCF(null);
    setShowCorrectContactFlow(false);
    setMainActivityBobject(null);
    resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
  }

  return (
    <>
      <iframe
        className={styles.dialer}
        name="sf"
        id="sf"
        src="https://softphone.kunzite.app/"
        frameBorder="0"
        width="320"
        height="460"
        allow="camera *;microphone *"
      ></iframe>
      {showCorrectContactFlow &&
        activityCCF &&
        mainActivityBobject &&
        openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activityCCF, {
          referenceBobject: mainActivityBobject,
          handleClose: handleClose,
        })}
    </>
  );
};
