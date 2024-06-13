import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import {
  Button,
  Callout,
  Chip,
  ChipGroup,
  ModalContent,
  ModalFooter,
  ModalSection,
  Radio,
  RadioGroup,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { useFieldsData } from '@bloobirds-it/hooks';
import { BOBJECT_TYPES, FIELDS_LOGIC_ROLE, MainBobjectTypes } from '@bloobirds-it/types';
import { formatDate, getTextFromLogicRole } from '@bloobirds-it/utils';
import isArray from 'lodash/isArray';
import mixpanel from 'mixpanel-browser';

import { useCadenceTable } from '../../../hooks/useCadenceTable';
import { STEPS } from '../cadenceControlModal.machine';
import CadenceIcon from '../cadenceIcon';
import { useCadenceControlModal } from '../useCadenceControlModal';
import styles from './nextStep.module.css';

const ACTIONS = Object.seal({
  NO_STOP: 'NO_STOP',
  YES_STOP: 'YES_STOP',
});

const STEPS_PROPS = Object.seal({
  NEXT_STEP: {
    message: 'cadence.cadenceControlModal.nextStep.nextStep.message',
    title: 'cadence.cadenceControlModal.nextStep.nextStep.title',
  },
  STOP_CADENCE: {
    message: 'cadence.cadenceControlModal.nextStep.stopCadence.message',
    title: 'cadence.cadenceControlModal.nextStep.stopCadence.title',
  },
});

const InfoMessage = ({ viewType, bobject }) => {
  const { getFieldValues } = useFieldsData();
  const { cadence: currentCadenceName, defaultCadence } = useCadenceTable(bobject);
  const LOGIC_ROLES = FIELDS_LOGIC_ROLE[bobject?.id?.typeName as MainBobjectTypes];

  const currentStartDate =
    bobject?.rawBobject?.[getFieldValues(LOGIC_ROLES.START_CADENCE)?.id] ||
    bobject?.raw?.contents[getFieldValues(LOGIC_ROLES.START_CADENCE)?.id];
  const date = currentStartDate && formatDate(new Date(currentStartDate), 'dd LLLL yyyy');

  const messageKey = STEPS_PROPS[viewType].message;
  return (
    <Text size="m">
      <Trans
        i18nKey={messageKey}
        values={
          viewType === 'NEXT_STEP'
            ? undefined
            : { cadenceName: currentCadenceName?.name || defaultCadence?.name, cadenceDate: date }
        }
      />
    </Text>
  );
};

const RadioOptions = ({ bobject, nextStepHandling: [nextStep, setNextStep] }) => {
  const bobjectType = bobject?.id?.typeName as MainBobjectTypes;
  const hasAssigned =
    !!bobject?.assignedTo ||
    !!getTextFromLogicRole(bobject, FIELDS_LOGIC_ROLE[bobjectType]?.ASSIGNED_TO);
  const { t } = useTranslation('translation', {
    keyPrefix: 'cadence.cadenceControlModal.nextStep.radioButtons',
  });
  const { t: bobjectTypeT } = useTranslation('translation', {
    keyPrefix: 'bobjectTypes',
  });

  return (
    <div key="changeCadenceRadioKey" className={styles.optionsWrapper}>
      <RadioGroup defaultValue={nextStep} onChange={setNextStep}>
        <Radio size="medium" value={STEPS.EXIT} key="radio-anything">
          {t('nothingElse')}
        </Radio>
        {!hasAssigned ? (
          <Tooltip
            position="top"
            title={t('configureCadenceTooltip', {
              bobjectType: bobjectTypeT(bobjectType.toLowerCase()),
            })}
          >
            <Radio
              dataTest="CadenceModal-NewCadence"
              size="medium"
              value={STEPS.CONFIGURE_CADENCE}
              key="radio-newCadence"
              disabled
            >
              {t('configureCadence')}
            </Radio>
          </Tooltip>
        ) : (
          <Radio
            dataTest="CadenceModal-NewCadence"
            size="medium"
            value={STEPS.CONFIGURE_CADENCE}
            key="radio-newCadence"
          >
            {t('configureCadence')}
          </Radio>
        )}
        <Radio
          dataTest="CadenceModal-NextStep"
          size="medium"
          value={STEPS.NEXT_STEPS}
          key="radio-nextStep"
        >
          {t('nextStep')}
        </Radio>
      </RadioGroup>
    </div>
  );
};

const NextStepsStep = ({ handleClose, handleContinue }) => {
  const {
    bobject,
    setStepInfo,
    bobjectName,
    cadenceManagement: { stopCadence },
    cadenceWasStarted,
  } = useCadenceControlModal();

  const parsedBobject = isArray(bobject) ? bobject[0] : bobject;
  const { t } = useTranslation();

  const [nextStep, setNextStep] = useState<STEPS>(
    cadenceWasStarted ? STEPS.EXIT : STEPS.CONFIGURE_CADENCE,
  );
  const [action, setAction] = useState(ACTIONS.NO_STOP);

  const viewType = cadenceWasStarted ? 'STOP_CADENCE' : 'NEXT_STEP';
  const isLastStep = action === ACTIONS.YES_STOP || nextStep === STEPS.EXIT;

  function handleOnClick() {
    if (action === ACTIONS.YES_STOP || !cadenceWasStarted) {
      if (nextStep !== STEPS.CONFIGURE_CADENCE) {
        stopCadence();
      }
      setStepInfo({ step: nextStep, hadStartedCadence: true });
      handleContinue(nextStep);
    } else {
      handleClose();
    }
  }

  useEffect(() => {
    if (parsedBobject?.id?.typeName === BOBJECT_TYPES.OPPORTUNITY) {
      mixpanel.track('ENTERED_IN_CC_OPPORTUNITY_STEP_2_CADENCE_CONTROL');
    }
  }, []);

  return (
    <>
      <ModalContent>
        <ModalSection
          size="l"
          title={t('cadence.cadenceControlModal.nextStep.title', { bobjectName })}
          data-text="ModalSection-Cadence"
          icon="cadence"
        >
          <Callout width="100%" withoutIcon variant={cadenceWasStarted ? 'positive' : 'neutral'}>
            <div
              data-test={`Text-ModalCadenceControlWithCadence`}
              className={styles._message__wrapper}
            >
              <CadenceIcon color={cadenceWasStarted ? 'softMelon' : 'verySoftPeanut'} />
              <InfoMessage bobject={parsedBobject} viewType={viewType} />
            </div>
          </Callout>
          <div className={styles._section_title__wrapper}>
            <Text size="m" weight="medium" color="peanut">
              {t(STEPS_PROPS[viewType].title)}
            </Text>
          </div>
          {cadenceWasStarted && (
            <div className={styles._actions__wrapper} key="stopCadenceKey">
              <ChipGroup defaultValue={action} onChange={setAction}>
                <Chip dataTest="stopTheCadence" value={ACTIONS.YES_STOP}>
                  {t('cadence.cadenceControlModal.nextStep.yesStopCadence')}
                </Chip>
                <Chip value={ACTIONS.NO_STOP}>
                  {t('cadence.cadenceControlModal.nextStep.noKeepCadence')}
                </Chip>
              </ChipGroup>
            </div>
          )}
          {(action === ACTIONS.YES_STOP || !cadenceWasStarted) && (
            <RadioOptions bobject={parsedBobject} nextStepHandling={[nextStep, setNextStep]} />
          )}
        </ModalSection>
      </ModalContent>
      <ModalFooter>
        <div className={styles._buttons__wrapper}>
          <Button
            dataTest={`Form-${action === ACTIONS.YES_STOP ? 'Continue' : 'Accept'}`}
            onClick={handleOnClick}
          >
            {!isLastStep
              ? t('cadence.cadenceControlModal.nextStep.continue')
              : t('cadence.cadenceControlModal.nextStep.accept')}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default NextStepsStep;
