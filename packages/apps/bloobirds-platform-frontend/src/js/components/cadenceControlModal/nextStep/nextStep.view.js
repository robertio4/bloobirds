import React, { useEffect, useState } from 'react';

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
import { BOBJECT_TYPES, FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import {
  getNameFieldLRFromBobjectType,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';

import { useCadenceControl } from '../../../hooks';
import { useCadenceTable } from '../../../hooks/useCadenceTable';
import { useHasCadenceStarted } from '../../../hooks/useHasCadenceStarted';
import { formatDate } from '@bloobirds-it/utils';
import CadenceIcon from '../cadenceIcon';
import styles from './nextStep.module.css';

const ACTIONS = Object.seal({
  NO_STOP: 'NO_STOP',
  YES_STOP: 'YES_STOP',
});

const STEPS_PROPS = Object.seal({
  NEXT_STEP: {
    message: 'Currently there is no cadence in progress.',
    title: 'What do you want to do next?',
  },
  STOP_CADENCE: {
    message:
      'The <b>"##CADENCE_NAME##" cadence</b> is currently in progress, and started on ##CADENCE_DATE##.',
    title: 'Do you want to stop the cadence?',
  },
});

const NextStepsStep = ({ handleBack, handleClose, handleContinue }) => {
  const { bobject, nextStep: modalNextStep, previousStep, stopCadence } = useCadenceControl();
  const { cadence: currentCadenceName, defaultCadence } = useCadenceTable(bobject);
  const [nextStep, setNextStep] = useState(modalNextStep);
  const [action, setAction] = useState(ACTIONS.NO_STOP);
  const bobjectType = bobject?.id?.typeName;
  const LOGIC_ROLES = FIELDS_LOGIC_ROLE[bobjectType];
  const currentStartDate =
    LOGIC_ROLES?.START_CADENCE !== undefined
      ? getTextFromLogicRole(bobject, LOGIC_ROLES.START_CADENCE)
      : undefined;
  const hasAssigned =
    LOGIC_ROLES?.ASSIGNED_TO !== undefined
      ? !!getValueFromLogicRole(bobject, LOGIC_ROLES.ASSIGNED_TO)
      : false;

  const name = getTextFromLogicRole(bobject, getNameFieldLRFromBobjectType(bobjectType));
  const date = currentStartDate && formatDate(new Date(currentStartDate), 'dd LLLL yyyy');
  const { hasStarted } = useHasCadenceStarted(bobject);
  const viewType = hasStarted ? 'STOP_CADENCE' : 'NEXT_STEP';

  useEffect(() => {
    if (bobject?.id?.typeName === BOBJECT_TYPES.OPPORTUNITY) {
      mixpanel.track('ENTERED_IN_CC_OPPORTUNITY_STEP_2_CADENCE_CONTROL');
    }
  }, []);

  const getMessage = () => {
    let message = STEPS_PROPS[viewType].message;
    if (hasStarted) {
      message = message.replace(
        '##CADENCE_NAME##',
        currentCadenceName?.name || defaultCadence?.name,
      );
      message = message.replace('##CADENCE_DATE##', date);
      message = <span dangerouslySetInnerHTML={{ __html: message }} />;
    }
    return message;
  };

  const getRadioElements = () => {
    let elements = [];
    if (previousStep || hasStarted) {
      elements = [
        <Radio size="medium" value="anything" key="radio-anything">
          I don&apos;t want to do anything else
        </Radio>,
      ];
    }

    elements = [
      ...elements,
      !hasAssigned ? (
        <Tooltip
          position="top"
          title={
            !hasAssigned &&
            `You can't assign a cadence if the ${bobject?.id?.typeName} is not assigned`
          }
        >
          <Radio
            dataTest="CadenceModal-NewCadence"
            size="medium"
            value="newCadence"
            key="radio-newCadence"
            disabled
          >
            I want to configure a new cadence
          </Radio>
        </Tooltip>
      ) : (
        <Radio
          dataTest="CadenceModal-NewCadence"
          size="medium"
          value="newCadence"
          key="radio-newCadence"
        >
          I want to configure a new cadence
        </Radio>
      ),
      <Radio dataTest="CadenceModal-NextStep" size="medium" value="nextStep" key="radio-nextStep">
        I want to manually schedule a next step
      </Radio>,
    ];

    return elements;
  };

  const renderSection = () => {
    let content = [];
    if (hasStarted) {
      content = [
        ...content,
        <div className={styles._actions__wrapper} key="stopCadenceKey">
          <ChipGroup defaultValue={action} onChange={value => setAction(value)}>
            <Chip dataTest="stopTheCadence" value={ACTIONS.YES_STOP}>
              Yes, stop the cadence
            </Chip>
            <Chip value={ACTIONS.NO_STOP}>No, keep it going</Chip>
          </ChipGroup>
        </div>,
      ];
    }

    if (!hasStarted || (hasStarted && action === ACTIONS.YES_STOP)) {
      content = [
        ...content,
        <div className={styles._options__wrapper} key="changeCadenceRadioKey">
          <RadioGroup
            defaultValue={nextStep}
            onChange={value => {
              setNextStep(value);
            }}
          >
            {getRadioElements()}
          </RadioGroup>
        </div>,
      ];
    }

    return content;
  };

  return (
    <>
      <ModalContent dataText={'Modal-Cadence'}>
        <ModalSection
          size="l"
          title={`Cadence control for ${name}`}
          data-text={'ModalSection-Cadence'}
        >
          <Callout width="100%" withoutIcon variant={hasStarted ? 'positive' : 'neutral'}>
            <div
              data-test={`Text-ModalCadenceControl${!hasStarted ? 'Without' : 'With'}Cadence`}
              className={styles._message__wrapper}
            >
              <CadenceIcon color={hasStarted ? 'softMelon' : 'verySoftPeanut'} />
              {getMessage()}
            </div>
          </Callout>
          <div className={styles._section_title__wrapper}>
            <Text size="m" weight="medium" color="peanut">
              {STEPS_PROPS[viewType].title}
            </Text>
          </div>
          {renderSection()}
        </ModalSection>
      </ModalContent>
      <ModalFooter>
        <div className={styles._buttons__wrapper}>
          {previousStep && (
            <Button variant="clear" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button
            dataTest={`Form-${
              (hasStarted && action === ACTIONS.YES_STOP) || !hasStarted ? 'Continue' : 'Accept'
            }`}
            onClick={() => {
              if (!hasStarted || (hasStarted && action === ACTIONS.YES_STOP)) {
                if (hasStarted && action === ACTIONS.YES_STOP && nextStep !== 'newCadence') {
                  stopCadence(handleContinue);
                }
                setNextStep(nextStep);
                handleContinue(nextStep);
              } else {
                handleClose();
              }
            }}
          >
            {(hasStarted && action === ACTIONS.YES_STOP) || !hasStarted ? 'Continue' : 'Accept'}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default NextStepsStep;
