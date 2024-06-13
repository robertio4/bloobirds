import React from 'react';

import { Button, Text } from '@bloobirds-it/flamingo-ui';
import { BobjectTypes, CadenceStep } from '@bloobirds-it/types';

import styles from '../cadenceEditionPage.module.css';
import { StepCardList } from '../stepCardList/stepCardList';
import EmptyCadenceContent from './emptyCadenceContent/emptyCadenceContent';

const CadenceEditionContent = ({
  steps,
  bobjectType,
  canEditCadence,
  refreshCadences,
  setIsStepModalOpen,
}: {
  steps: CadenceStep[];
  bobjectType: BobjectTypes;
  canEditCadence: boolean;
  refreshCadences: () => void;
  setIsStepModalOpen: (value: boolean) => void;
}) => {
  const handleAddStep = () => {
    setIsStepModalOpen(true);
  };

  return (
    <>
      <div className={styles._steps_header__wrapper}>
        {!canEditCadence && <div className={styles._disabled_overlay} />}
        <div>
          <Text size="s" color="peanut">
            Cadence tasks per day
          </Text>
        </div>
        <span className={styles._right__actions}>
          <Button
            iconLeft="plus"
            size="small"
            disabled={!canEditCadence}
            color={canEditCadence ? 'bloobirds' : 'peanut'}
            onClick={handleAddStep}
          >
            Add step
          </Button>
        </span>
      </div>
      {steps?.length > 0 ? (
        <div className={styles._steps__wrapper}>
          {!canEditCadence && <div className={styles._disabled_overlay} />}
          <StepCardList bobjectType={bobjectType} steps={steps} refreshCadences={refreshCadences} />
          <Button
            className={styles._add_step_button}
            disabled={!canEditCadence}
            variant="clear"
            iconLeft="plus"
            size="small"
            onClick={handleAddStep}
            color={canEditCadence ? 'bloobirds' : 'lightBloobirds'}
          >
            Add step
          </Button>
        </div>
      ) : (
        <EmptyCadenceContent canEditCadence={canEditCadence} handleAddStep={handleAddStep} />
      )}
    </>
  );
};

export default CadenceEditionContent;
