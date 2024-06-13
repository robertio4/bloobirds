import React from 'react';

import { useAddToCalendar } from '@bloobirds-it/hooks';
import { ButtonsStepConfig } from '@bloobirds-it/types';

import { useCadenceControl, useContactFlow } from '../../../hooks';
import CallResult from '../callResult/callResult';
import CallResultOpportunity from '../callResultOpportunity/callResultOpportunity';
import ChangeSalesStatus from '../changeSalesStatus/changeSalesStatus';
import ChangeStatus from '../changeStatus/changeStatus';
import { EVENTS, STEPS } from '../contactFlowModal.machine';
import ConvertObject from '../convertBobject/convertBobject';
import LoadingStep from '../loadingStep/loadingStep';
import NoteAndQQ from '../noteAndQQ/noteAndQQ';
import OpportunityControl from '../opportunityControl/opportunityControl';
import ScheduleNextStep from '../scheduleNextStep/scheduleNextStep';

interface WizardModalContentProps {
  step: keyof typeof STEPS;
  send: (event: any, params?: any) => void;
  closeModal: () => void;
  buttonsConfig: ButtonsStepConfig;
  mainBobject: any;
  convertedLeads: any;
  isLeadInSalesStage: boolean;
}

const WizardModalStepContent = ({ step, ...props }: WizardModalContentProps) => {
  const { send, closeModal, mainBobject, isLeadInSalesStage, convertedLeads } = props;
  const { openCadenceControl } = useCadenceControl();
  const { setAddToCalendarState, openAddToCalendarModal } = useAddToCalendar();
  const { scheduleStepData } = useContactFlow();

  let component = null;
  switch (step) {
    case 'CALL_RESULTS':
      component = (
        <CallResult
          handleNext={(selectedCallResult: string, needsClose: boolean) => {
            if (needsClose) {
              closeModal();
            }
            send(EVENTS.NEXT, { callResult: selectedCallResult });
          }}
        />
      );
      break;
    case 'CALL_RESULTS_OPP':
      component = (
        <CallResultOpportunity
          handleNext={correctContact => {
            send(EVENTS.NEXT, {
              isCorrectContact: correctContact,
              isLeadInSalesStage,
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
              bobject: mainBobject,
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
              bobject: mainBobject,
            });
          }}
          handleClose={closeModal}
        />
      );
      break;
    case 'NOTES_AND_QQ':
      component = <NoteAndQQ handleNext={() => send(EVENTS.NEXT)} />;
      break;
    case 'CONVERT_OBJECT':
      component = (
        <ConvertObject
          handleNext={(createOpportunity, leads) => {
            if (createOpportunity) {
              send(EVENTS.NEXT, { leads });
            } else {
              closeModal();
            }
          }}
        />
      );
      break;
    case 'SCHEDULE_NEXT_STEPS':
      component = (
        <ScheduleNextStep
          handleClose={() => {
            // @ts-ignore
            setAddToCalendarState(scheduleStepData);

            openAddToCalendarModal();
            closeModal();
          }}
        />
      );
      break;
    case 'OPPORTUNITY_CONTROL':
      component = <OpportunityControl leads={convertedLeads || []} handleClose={closeModal} />;
      break;
  }

  return React.cloneElement(component, {
    ...props,
    handleBack: () => send(EVENTS.PREVIOUS),
    handleSkip: (openCadenceControlOnClose: boolean) => {
      if (openCadenceControlOnClose) {
        openCadenceControl({ bobjectToSet: mainBobject });
      }
      closeModal();
    },
  });
};

export const WizardModalContent = (props: WizardModalContentProps) => {
  const { step } = props;
  return step !== STEPS.INITIAL ? <WizardModalStepContent {...props} /> : <LoadingStep />;
};
