import { Modal } from '@bloobirds-it/flamingo-ui';
import { Bobject } from '@bloobirds-it/types';
import React from 'react';
import ConfigureCadenceStep from '../configureCadence/configureCadence';

export const StartCadenceModal = ({
  handleBack,
  handleNext,
  bobject,
  saveCadence,
  previousStep,
  onClose,
  open,
}: {
  handleBack: () => void;
  handleNext: () => void;
  bobject: Bobject;
  saveCadence: (selectedCadence: any, handleNext: any, startCadenceDate: any) => void;
  previousStep: any;
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal open={open} onClose={onClose} title="Configure the cadence" width={806}>
      <ConfigureCadenceStep
        handleBack={handleBack}
        handleNext={handleNext}
        bobject={bobject}
        //saveCadence={saveCadence}
        previousStep={previousStep}
      />
    </Modal>
  );
};
