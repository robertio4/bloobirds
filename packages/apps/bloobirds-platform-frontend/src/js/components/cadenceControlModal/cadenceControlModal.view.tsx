import React, { useEffect } from 'react';

import { Modal } from '@bloobirds-it/flamingo-ui';
import { MinimizableModalType, useMinimizableModals } from '@bloobirds-it/hooks';
import { useMachine } from '@xstate/react';

import { companyUrl, opportunityUrl } from '../../app/_constants/routes';
import { ACTIVITY_MODE } from '../../constants/activity';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../constants/company';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../constants/opportunity';
import { useCadenceControl } from '../../hooks';
import { useActiveCompany } from '../../hooks/useActiveCompany';
import { useFullSalesEnabled } from '../../hooks/useFeatureFlags';
import { useSelectedOpportunity } from '../../hooks/useSelectedOpportunity';
import { getValueFromLogicRole } from '../../utils/bobjects.utils';
import { EVENTS, STEPS, stepsMachine } from './cadenceControlModal.machine';
import CadenceFeedbackStep from './cadenceFeedbackStep/cadenceFeedbackStep';
import ConfigureCadenceStep from './configureCadence';
import NextStepsStep from './nextStep';
import UpdateLeadStatusesStep from './updateLeadStatuses';

const STEPS_PROPS = Object.seal({
  NEXT_STEPS: { title: 'Cadence control', width: 640, dataTest: 'CadenceNextSteps' },
  CONFIGURE_CADENCE_OPPORTUNITY: {
    title: 'Configure the sales cadence',
    width: 806,
    dataTest: 'CadenceConfigOpportunity',
  },
  CONFIGURE_CADENCE_COMPANY: {
    title: 'Configure the prospecting cadence',
    width: 806,
    dataTest: 'CadenceConfigCompany',
  },
  UPDATE_LEADS_STATUSES: {
    title: 'Updates lead statuses',
    width: 1020,
    dataTest: 'CadenceUpdateLead',
  },
  CADENCE_FEEDBACK: {
    title: 'Your cadences are being scheduled',
    width: 512,
    dataTest: 'CadenceFeedback',
  },
});

const CadenceControlModal = () => {
  const { company } = useActiveCompany();
  const { selectedOpportunity, updateSelectedOpportunity } = useSelectedOpportunity();
  const hasSalesEnabled = useFullSalesEnabled();
  const {
    resetCadenceControlInfo,
    isOpportunity,
    step: initialStep,
    closeCadenceControl,
    saveCadenceCallback,
    bobject,
  } = useCadenceControl();
  const { openMinimizableModal } = useMinimizableModals();
  const handleOpenModal = (type: MinimizableModalType) => {
    const companyName = company
      ? getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME)
      : '';
    const parsedOpp = selectedOpportunity
      ? selectedOpportunity
      : isOpportunity
      ? bobject
      : undefined;
    openMinimizableModal({
      type,
      title: companyName && companyName !== '' ? companyName.slice(0, 10) : 'Untitled company',
      data: {
        mode: ACTIVITY_MODE.CREATE,
        company: {
          name: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME),
          url: companyUrl(company),
          data: company,
        },
        opportunity: parsedOpp && {
          name: getValueFromLogicRole(parsedOpp, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME),
          url: opportunityUrl(hasSalesEnabled ? undefined : company, parsedOpp),
          data: parsedOpp,
        },
      },
    });
  };
  const [{ value: step }, send] = useMachine(stepsMachine, {
    context: {
      nextStep: () => handleOpenModal('task'),
      handleClose: closeCadenceControl,
    },
  });
  let currentStep = step;

  useEffect(() => {
    if (initialStep && send) {
      send(initialStep);
    }
  }, [initialStep, send]);

  if (step === STEPS.CONFIGURE_CADENCE) {
    currentStep = isOpportunity
      ? `${STEPS.CONFIGURE_CADENCE}_OPPORTUNITY`
      : `${STEPS.CONFIGURE_CADENCE}_COMPANY`;
  }

  const otherProps = STEPS_PROPS[currentStep];

  useEffect(
    () => () => {
      resetCadenceControlInfo();
    },
    [],
  );

  return (
    <Modal open onClose={closeCadenceControl} {...otherProps}>
      {step === STEPS.NEXT_STEPS && (
        <NextStepsStep
          handleBack={() => {}}
          handleContinue={(selectedStep: 'newCadence' | 'anything' | 'nextStep') => {
            if (isOpportunity && !selectedOpportunity) {
              updateSelectedOpportunity(bobject);
            }
            send(EVENTS.NEXT, { selectedStep });
          }}
          handleClose={closeCadenceControl}
        />
      )}
      {step === STEPS.CONFIGURE_CADENCE && (
        <ConfigureCadenceStep
          handleBack={() => send(EVENTS.PREVIOUS)}
          handleNext={hasLeads => {
            if (typeof saveCadenceCallback === 'function') {
              saveCadenceCallback();
            }

            send(EVENTS.NEXT, { hasLeads });
          }}
        />
      )}
      {step === STEPS.CADENCE_FEEDBACK && (
        <CadenceFeedbackStep
          handleNext={hasLeads => {
            send(EVENTS.NEXT, { hasLeads });
          }}
        />
      )}
      {step === STEPS.UPDATE_LEADS_STATUSES && (
        <UpdateLeadStatusesStep
          handleBack={() => send(EVENTS.PREVIOUS)}
          handleSave={closeCadenceControl}
        />
      )}
    </Modal>
  );
};

export default CadenceControlModal;
