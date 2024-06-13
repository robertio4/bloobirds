import React, { useEffect } from 'react';

import { RescheduleModal } from '@bloobirds-it/bobjects';
import { CadenceControlModal, RescheduleCadence, StopCadenceModal } from '@bloobirds-it/cadence';
import { useMinimizableModals } from '@bloobirds-it/hooks';
import { Bobject, BobjectTypes } from '@bloobirds-it/types';

import { useTaskManagementContext } from '../hooks/useTaskManagement';
import { TaskManagementModals } from '../types/taskManagement.types';

export const TasksModalsController = () => {
  const {
    bobject: referenceBobject,
    modalContext,
    handleCloseModal,
    handleSaveModal,
    handleSaveCadence,
    currentTasksProps,
  } = useTaskManagementContext();
  const { modal, task } = modalContext;
  const { hasCadenceSteps } = currentTasksProps;
  const { openMinimizableModal } = useMinimizableModals();

  useEffect(() => {
    if (modal === TaskManagementModals.NextStep && referenceBobject) {
      openMinimizableModal({
        type: 'taskStatic',
        data: {
          [referenceBobject.id.typeName.toLowerCase()]: referenceBobject,
        },
        onClose: handleCloseModal,
        onSave: handleSaveModal,
      });
    }
  }, [modal]);

  switch (modal) {
    case TaskManagementModals.NextStep:
      // Since we've already called openMinimizableModal in useEffect, return null here
      return null;
    case TaskManagementModals.RescheduleCadence:
      return (
        <RescheduleCadence
          bobject={referenceBobject as Bobject<BobjectTypes.Task>}
          onClose={handleCloseModal}
          onSave={() => handleSaveModal(3000)}
        />
      );
    case TaskManagementModals.StartCadence:
      return (
        <CadenceControlModal
          bobject={referenceBobject}
          setIsOpen={(open: boolean) => {
            if (!open) handleCloseModal(true);
          }}
          initialStep={{ step: 'CONFIGURE_CADENCE', hadStartedCadence: false }}
          callbackOnSave={() => handleSaveCadence(hasCadenceSteps ? 12000 : 8000)}
        />
      );
    case TaskManagementModals.StopCadence:
      return (
        <StopCadenceModal
          bobject={referenceBobject}
          handleClose={handleCloseModal}
          handleSave={handleSaveModal}
          size="small"
        />
      );
    case TaskManagementModals.RescheduleTask:
      return (
        <RescheduleModal
          bobject={task as Bobject<BobjectTypes.Task>}
          onSave={handleSaveModal}
          onClose={handleCloseModal}
        />
      );
    default:
      return <></>;
  }
};
