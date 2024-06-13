import React from 'react';

import { useNotifications } from '@bloobirds-it/hooks';
import { api } from '@bloobirds-it/utils';

import { useContactFlow } from '../../hooks';
import CallResult from '../callResult/callResult';
import CallResultOpportunity from '../callResultOpp/callResultOpp';
import ChangeSalesStatus from '../changeSalesStatus/changeSalesStatus';
import ChangeStatus from '../changeStatus/changeStatus';
import { EVENTS, MODAL_STEPS, STEPS } from '../contactFlowModal.machine';
import LoadingStep from '../loadingStep/loadingStep';
import NotesAndQQ from '../notesAndQQ/notesAndQQ';
import { ScheduleNextSteps } from '../scheduleNextSteps/scheduleNextSteps';

const WizardModalStepContent = () => {
  const {
    step,
    send,
    modalControlSend,
    hasLeads,
    handleClose,
    activity,
    referenceBobject,
    referenceBobjectIsSales,
  } = useContactFlow();
  const { refresh: refreshNotifications } = useNotifications();

  function deleteRelatedNotification() {
    if (activity)
      api
        .delete(`/utils/notifications/deleteByObjectId/${activity.id.objectId}`, {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          data: {},
        })
        .then(() => {
          refreshNotifications();
        });
  }

  let component = null;
  switch (step) {
    case 'CALL_RESULTS':
      component = (
        <CallResult
          hasLeads={hasLeads}
          handleNext={(selectedCallResult: string, needsClose: boolean) => {
            deleteRelatedNotification();
            needsClose ? handleClose() : send(EVENTS.NEXT, { callResult: selectedCallResult });
          }}
        />
      );
      break;
    case 'CALL_RESULTS_OPP':
      component = (
        <CallResultOpportunity
          handleNext={correctContact => {
            deleteRelatedNotification();
            send(EVENTS.NEXT, {
              isCorrectContact: correctContact,
              isLeadInSalesStage: referenceBobjectIsSales,
            });
          }}
        />
      );
      break;
    case 'SALES_CHANGE_STATUS':
      component = (
        <ChangeSalesStatus
          handleNext={(companyStatus, leadStatus) => {
            send(EVENTS.NEXT, {
              companyStatus,
              leadStatus,
              referenceBobject,
            });
          }}
        />
      );
      break;
    case 'CHANGE_STATUS':
      component = (
        <ChangeStatus
          handleNext={(companyStatus: string, leadStatus: string) => {
            send(EVENTS.NEXT, {
              companyStatus,
              leadStatus,
              bobject: referenceBobject,
            });
          }}
          handleClose={handleClose}
        />
      );
      break;
    case 'NOTES_AND_QQ':
      component = <NotesAndQQ handleNext={() => send(EVENTS.NEXT)} />;
      break;
    case 'SCHEDULE_NEXT_STEPS':
      component = (
        <ScheduleNextSteps
          handleNext={() => send(EVENTS.NEXT)}
          // handleSkip={handleClose}
        />
      );
      break;
  }

  return React.cloneElement(component, {
    handleBack: () => send(EVENTS.PREVIOUS),
    handleSkip: (openCadenceControlOnClose: boolean) => {
      if (openCadenceControlOnClose) {
        modalControlSend(MODAL_STEPS.CADENCE_CONTROL);
      } else {
        send(EVENTS.SKIP);
      }
    },
  });
};

export const WizardModalContent = () => {
  const { step } = useContactFlow();
  return step !== STEPS.INITIAL ? <WizardModalStepContent /> : <LoadingStep />;
};
