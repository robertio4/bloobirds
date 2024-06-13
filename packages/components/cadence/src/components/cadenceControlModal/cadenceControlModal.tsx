import React, { SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@bloobirds-it/flamingo-ui';
import { useMinimizableModals } from '@bloobirds-it/hooks';
import {
  ACTIVITY_MODE,
  Bobject,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  ExtensionBobject,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  SalesforceTabs,
  UseEveryBobjectType,
} from '@bloobirds-it/types';
import { getExtensionBobjectByIdFields, getValueFromLogicRole } from '@bloobirds-it/utils';
import { useMachine } from '@xstate/react';
import { TFunction } from 'i18next';
import isArray from 'lodash/isArray';

import ConfigureCadenceStep from '../configureCadence/configureCadence';
import { EVENTS, STEPS, stepsMachine } from './cadenceControlModal.machine';
import styles from './cadenceControlModal.module.css';
import CadenceFeedbackStep from './cadenceFeedbackStep/cadenceFeedbackStep';
import { CreateNextStep } from './createNextStep/createNextStep';
import NextStepsStep from './nextStep/nextStep';
import { CadenceControlModalProvider, useCadenceControlModal } from './useCadenceControlModal';

const STEPS_PROPS = (t: TFunction) =>
  Object.seal({
    INITIAL: { title: t('cadenceControl'), width: 640, dataTest: 'CadenceNextSteps' },
    NEXT_STEPS: { title: t('cadenceControl'), width: 640, dataTest: 'CadenceNextSteps' },
    CONFIGURE_CADENCE_OPPORTUNITY: {
      title: t('selectCadence'),
      width: 806,
      dataTest: 'CadenceConfigOpportunity',
    },
    CONFIGURE_CADENCE_COMPANY: {
      title: t('selectCadence'),
      width: 806,
      dataTest: 'CadenceConfigCompany',
    },
    UPDATE_LEADS_STATUSES: {
      title: t('updatesLeadStatus'),
      width: 1020,
      dataTest: 'CadenceUpdateLead',
    },
    CADENCE_FEEDBACK: {
      title: t('yourTasksAreBeingRescheduled'),
      width: 512,
      dataTest: 'CadenceFeedback',
    },
    SCHEDULE_NEXT_STEP: {
      title: t('createNextStepTitle'),
      width: 760,
      dataTest: 'NextStepModal',
    },
  });

interface ModalDefaultProps {
  bobject: Bobject | ExtensionBobject;
  setIsOpen?: React.Dispatch<SetStateAction<boolean>>;
  initialStep?: any;
  callbackOnClose?: () => void;
  callbackOnSave?: (action?: 'reschedule' | 'start' | 'stop') => void;
  step?: string;
  useEveryBobject?: UseEveryBobjectType;
  subhomeTab?: SalesforceTabs;
  onEmailPreviewClicked?: (templateId: string, bobject: Bobject) => void;
  previousStep?: boolean;
}

const withProvider = ModalComponent => (props: ModalDefaultProps) => {
  const { bobject, ...rest } = props;
  const isBulk = isArray(bobject);
  const sampleBobject = isBulk ? bobject[0] : bobject;
  const [bobjectFromExtensionBobject, setBobjectFromExtensionBobject] = useState<
    Bobject | ExtensionBobject | Bobject[] | ExtensionBobject[]
  >(bobject);

  React.useEffect(() => {
    return () => {
      props?.callbackOnClose?.();
    };
  }, []);

  if (!sampleBobject?.cadence && !isBulk && (bobjectFromExtensionBobject as Bobject)?.raw) {
    getExtensionBobjectByIdFields(sampleBobject?.id).then(({ data }) =>
      setBobjectFromExtensionBobject(data),
    );
  }

  const modalProps = {
    ...rest,
    bobject: bobjectFromExtensionBobject,
  };

  return (
    <CadenceControlModalProvider {...modalProps}>
      <ModalComponent {...modalProps} />
    </CadenceControlModalProvider>
  );
};

export const ControlModal = ({
  bobject,
  setIsOpen,
  initialStep,
  callbackOnClose,
  callbackOnSave,
  useEveryBobject,
  subhomeTab,
  onEmailPreviewClicked,
  previousStep = true,
}: ModalDefaultProps) => {
  const { isOpportunity, stepInfo } = useCadenceControlModal();
  const { openMinimizableModal } = useMinimizableModals();
  const mutateTasks = () => {
    window.dispatchEvent(
      new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
        detail: { type: BobjectTypes.Task },
      }),
    );
  };
  const { t } = useTranslation('translation', { keyPrefix: 'cadence.cadenceControlModal' });

  function handleClose() {
    callbackOnClose?.();
    setIsOpen?.(false);
  }

  const handleOpenModal = type => {
    const companyName = (bobject as ExtensionBobject).name;
    const parsedOpp = isOpportunity ? bobject : undefined;
    openMinimizableModal({
      type,
      title: companyName && companyName !== '' ? companyName.slice(0, 10) : t('untitledCompany'),
      data: {
        mode: ACTIVITY_MODE.CREATE,
        company: {
          // @ts-ignore
          name: getValueFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.NAME),
          //url: companyUrl(bobject),
          data: bobject,
        },
        opportunity: parsedOpp && {
          // @ts-ignore
          name: getValueFromLogicRole(parsedOpp, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME),
          // url: opportunityUrl(isSalesConversionEnabled ? undefined : company, parsedOpp),
          data: parsedOpp,
        },
      },
    });
  };

  const [{ value: step }, send] = useMachine(stepsMachine, {
    context: {
      nextStep: () => handleOpenModal('task'),
      handleClose,
    },
  });
  let currentStep = step;

  useEffect(() => {
    if (send) {
      //TODO fix this
      if (typeof initialStep === 'string' || typeof stepInfo === 'string') {
        send(initialStep || stepInfo);
      } else {
        send(initialStep?.step || stepInfo?.step);
      }
    }
  }, [initialStep, send]);

  if (step === STEPS.CONFIGURE_CADENCE) {
    currentStep = isOpportunity
      ? `${STEPS.CONFIGURE_CADENCE}_OPPORTUNITY`
      : `${STEPS.CONFIGURE_CADENCE}_COMPANY`;
  }

  const otherProps: { [x: string]: string | number } = STEPS_PROPS(t)[
    currentStep as keyof typeof STEPS_PROPS
  ];

  return (
    <Modal open onClose={handleClose} {...otherProps} className={styles.modalCadence}>
      {step === STEPS.NEXT_STEPS && (
        <NextStepsStep
          handleContinue={selectedStep => {
            /* if (isOpportunity && !selectedOpportunity) {
              updateSelectedOpportunity(bobject);
            }*/
            if (selectedStep !== STEPS.CONFIGURE_CADENCE) {
              mutateTasks();
              callbackOnSave?.('stop');
            }
            send(EVENTS.NEXT, { selectedStep });
          }}
          handleClose={handleClose}
        />
      )}
      {step === STEPS.CONFIGURE_CADENCE && (
        <ConfigureCadenceStep
          //@ts-ignore
          bobject={bobject}
          previousStep={
            initialStep?.step ? initialStep?.step !== STEPS.CONFIGURE_CADENCE : previousStep
          }
          handleBack={() => send(EVENTS.PREVIOUS)}
          handleNext={() => {
            mutateTasks();
            send(EVENTS.NEXT);
            callbackOnSave?.(
              initialStep?.step === STEPS.CONFIGURE_CADENCE ? 'start' : 'reschedule',
            );
          }}
          useEveryBobject={useEveryBobject}
          subhomeTab={subhomeTab}
          onEmailPreviewClicked={onEmailPreviewClicked}
        />
      )}
      {step === STEPS.CADENCE_FEEDBACK && (
        <CadenceFeedbackStep
          handleNext={() => {
            send(EVENTS.NEXT);
          }}
        />
      )}
      {step === STEPS.SCHEDULE_NEXT_STEP && (
        <CreateNextStep
          handleBack={() => send(EVENTS.PREVIOUS)}
          handleNext={() => {
            send(EVENTS.NEXT);
          }}
        />
      )}
    </Modal>
  );
};

export const CadenceControlModal = withProvider(ControlModal);
