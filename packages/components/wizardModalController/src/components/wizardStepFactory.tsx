import React from 'react';



import { CadenceControlModal } from '@bloobirds-it/cadence';
import { ChangeStatusModal } from '@bloobirds-it/change-status';
import { ExtensionBobject, MIXPANEL_EVENTS } from '@bloobirds-it/types';
import { EVENTS, StepsKey, useWizardContext, WizardModalContentProps } from '@bloobirds-it/wizard-modal-context';
import mixpanel from 'mixpanel-browser';



import AddLeadToActivity from './steps/addLeadToActivity/addLeadToActivity';
import BobjectForm from './steps/bobjectForm/bobjectForm';
import CallResult from './steps/callResult/callResult';
import CallResultOpportunity from './steps/callResultOpp/callResultOpp';
import ChangeSalesStatus from './steps/changeSalesStatus/changeSalesStatus';
import ChangeStatus from './steps/changeStatus/changeStatus';
import ChangeStatusSalesforce from './steps/changeStatusSalesforce/changeStatusSalesforce';
import { CrmUpdates } from './steps/crmUpdates/crmUpdates';
import CustomActionsSalesforce from './steps/customActionsSalesforce/customActionsSalesforce';
import CustomObject from './steps/customObject/customObject';
import { InactiveHandling } from './steps/inactiveHandling/inactiveHandling';
import LoadingStep from './steps/loadingStep/loadingStep';
import { MeetingReportResult } from './steps/meetingReportResult/meetingReportResult';
import { MeetingResultNotes } from './steps/meetingResultNotes/meetingResultNotes';
import NotesAndQQ from './steps/notesAndQQ/notesAndQQ';
import OpportunityControlOTO from './steps/opportunityControl/opportunityControl';
import { ScheduleNextSteps } from './steps/scheduleNextSteps/scheduleNextSteps';
import { StatusNoteActions } from './steps/statusNoteAction/statusNoteActions';
import { TaskManagement } from './steps/taskManagement/taskManagement';


export const WizardStepFactory = ({
  step,
  send,
  buttonsConfig,
  wizardKey,
  children,
  convertedLeads,
  machineContext,
  customObjectConfig,
}: WizardModalContentProps) => {
  let component = null;
  let matchingChild = null;
  const { getWizardProperties } = useWizardContext();
  const {
    referenceBobject,
    handleClose,
    handleOnSave,
    statusInfo,
    dataModel,
  } = getWizardProperties(wizardKey);
  switch (step as StepsKey) {
    case 'INITIAL':
      component = <LoadingStep />;
      break;
    case 'STATUS_NOTE_ACTIONS':
      component = <StatusNoteActions />;
      break;
    case 'TASK_MANAGEMENT':
      component = <TaskManagement />;
      break;
    case 'INACTIVE_HANDLING':
      component = <InactiveHandling />;
      break;
    case 'MEETING_RESULT':
      component = <MeetingReportResult />;
      break;
    case 'NOTES':
      component = <MeetingResultNotes />;
      break;
    case 'CALL_RESULTS':
      component = <CallResult />;
      break;
    case 'CALL_RESULTS_OPP':
      component = <CallResultOpportunity />;
      break;
    case 'NOTES_AND_QQ':
      component = <NotesAndQQ showNotes={true} />;
      break;
    case 'CRM_UPDATES':
      component = <CrmUpdates />;
      break;
    case 'ONLY_QQS':
      component = <NotesAndQQ showNotes={false} />;
      break;
    case 'SALES_CHANGE_STATUS':
      component = (
        <ChangeSalesStatus
          handleNext={(companyStatus: string, leadStatus: string) => {
            send(EVENTS.NEXT, {
              companyStatus,
              leadStatus,
              bobject: referenceBobject,
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
        />
      );
      break;
    case 'SCHEDULE_NEXT_STEPS':
      component = <ScheduleNextSteps />;
      break;
    case 'CONVERT_OBJECT':
      if (children) {
        if (Array.isArray(children)) {
          matchingChild = children.find(child => child.key === step);
        } else if (children.key === step) {
          matchingChild = children;
        }
        if (matchingChild && matchingChild?.props.children) {
          component = React.cloneElement(matchingChild?.props.children, {
            handleNext: (createOpportunity, leads) => {
              if (createOpportunity) {
                send(EVENTS.NEXT, { leads });
              } else {
                handleClose();
              }
            },
          });
        }
      }
      break;
    case 'OPPORTUNITY_CONTROL':
      if (children) {
        if (Array.isArray(children)) {
          matchingChild = children.find(child => child.key === step);
        } else if (children.key === step) {
          matchingChild = children;
        }
        if (matchingChild && matchingChild?.props.children) {
          component = React.cloneElement(matchingChild?.props.children, {
            leads: convertedLeads || [],
          });
        }
      }
      break;
    case 'CUSTOM_OBJECT':
      component = <CustomObject customObjectConfig={customObjectConfig} />;
      break;
    case 'OPPORTUNITY_CONTROL_OTO':
      component = (
        <OpportunityControlOTO
          handleNext={selectedOpportunity => {
            send(EVENTS.NEXT, { selectedOpportunity });
          }}
        />
      );
      break;
    case 'BOBJECT_FORM':
      component = (
        <BobjectForm
          customObjectConfig={customObjectConfig}
          handleNext={selectedOpportunityObject => {
            send(EVENTS.NEXT, { selectedOpportunityObject });
          }}
        />
      );
      break;
    case 'CHANGE_STATUS_SALESFORCE':
      component = <ChangeStatusSalesforce />;
      break;
    case 'ORIGINAL_CHANGE_STATUS_COMPONENT':
      component = (
        <ChangeStatusModal
          onSave={handleOnSave}
          handleClose={handleClose}
          bobject={referenceBobject}
          statusInfo={statusInfo}
          dataModel={dataModel}
        />
      );
      break;
    case 'CADENCE_CONTROL':
      component = (
        <CadenceControlModal
          bobject={
            machineContext?.selectedOpportunityObject
              ? machineContext?.selectedOpportunityObject
              : (referenceBobject as ExtensionBobject)
          }
          initialStep={{
            step: 'NEXT_STEPS',
          }}
          callbackOnClose={handleClose}
        />
      );
      break;
    case 'CUSTOM_ACTIONS_SALESFORCE':
      component = <CustomActionsSalesforce />;
      break;
    case 'ADD_LEAD_TO_ACTIVITY':
      component = <AddLeadToActivity />;
      break;
  }

  return (
    component &&
    React.cloneElement(component, {
      handleNext: (() => {
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_NEXT_IN_WIZARD_STEP_ + step);
        return component?.props?.handleNext
          ? component?.props?.handleNext
          : () => send(EVENTS.NEXT);
      })(),
      handleBack: () => {
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_BACK_IN_WIZARD_STEP_ + step);
        send(EVENTS.PREVIOUS);
      },
      handleSkip: (openCadenceControlOnClose: boolean) => {
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SKIP_IN_WIZARD_STEP_ + step);
        machineContext?.markAsReported?.();
        send(EVENTS.SKIP, { openCadenceControlOnClose });
      },
      buttonsConfig,
      wizardKey,
      send,
      machineContext,
      ...component.props,
    })
  );
};
