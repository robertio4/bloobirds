import { Control } from 'react-hook-form';

import { Bobject, BobjectTypes } from '@bloobirds-it/types';
import { Sobject } from '@bloobirds-it/utils';

import { stepsMachineChangeStatus } from './change_status.machine';
import { stepsMachineContactFlowAPP, stepsMachineContactFlowOTO } from './contact_flow.machine';
import { stepsMachineMeetingReportResult } from './meeting_report_result.machine';
import { stepsMachineNextSteps } from './next_step.machine';
import { STEPS } from './wizardMachine';

export enum WIZARD_MODALS {
  NEXT_STEP = 'NEXT_STEP',
  MEETING_RESULT = 'MEETING_RESULT',
  CONTACT_FLOW_OTO = 'CONTACT_FLOW_OTO',
  CONTACT_FLOW_APP = 'CONTACT_FLOW_APP',
  CHANGE_STATUS = 'CHANGE_STATUS',
}

export type WizardModalType = WIZARD_MODALS;

export interface WizardVisibilityType {
  visible: boolean;
  bobject: Bobject;

  [key: string]: any;
}

export interface StatusRestrictionInterface {
  salesforceStatus: string;
  fields: { field: string; required: boolean }[];
}

export interface ButtonsStepConfig {
  nextButtonTitle: string;
  nextButtonAlternativeTitle: string;
  previousButtonTitle: string;
  showSkipButton: boolean;
  openCadenceOnSkip: boolean;
  hasPreviousStep?: boolean;
  hasNextStep?: boolean;
  showModalHeader?: boolean;
  recallResults?: Record<string, string>;
  checkExistingOpportunity?: boolean;
  modalTitle?: string;
  hidePitchCheck?: boolean;
  hideNoAnswerExtraInfo?: boolean;
  customActions?: CustomActions[];
  updatePropertyResults?: Record<
    string,
    {
      name: string;
      label: string;
      required: boolean;
      fieldBobjectType: BobjectTypes;
    }[]
  >;
  salesforceStatusFields?: {
    objectType: Sobject;
    statusRestrictions: StatusRestrictionInterface[];
  }[];
  salesforceStatusShowOnlyMainObject?: boolean;
  checkReferenceBobject?: boolean;
  hideSaveButton?: boolean;
}

interface CustomActions {
  objectType: string;
  title?: string;
  objectCustomActions: CustomActionOptions[];
}

interface CustomActionOptions {
  key: string;
  label: string;
  fields?: string[];
  systemMappings?: Record<string, string>;
}
export interface WizardModalContentProps {
  step: keyof typeof STEPS;
  send: (event: any, params?: any) => void;
  buttonsConfig: ButtonsStepConfig;
  bobject: Bobject;
  wizardKey?: string;
  children?: React.ReactElement;
  convertedLeads?: any;
  machineContext?: any;
  customObjectConfig?: CustomObjectModalConfig;
  wizardConfig?: WizardContextConfig;
}

export interface DefaultWizardsModalParams extends WizardsModalParams {
  handleNext?: () => void;
  handleSkip?: (openCadenceControlOnClose: boolean) => void;
}

export interface WizardsModalParams {
  handleBack?: () => void;
  buttonsConfig?: ButtonsStepConfig;
  wizardKey?: WIZARD_MODALS;
  send?: (event: any, params?: any) => void;
  machineContext?: any;
}

export const DefaultWizardConfigs = {
  NEXT_STEP: stepsMachineNextSteps,
  MEETING_RESULT: stepsMachineMeetingReportResult,
  CONTACT_FLOW_OTO: stepsMachineContactFlowOTO,
  CONTACT_FLOW_APP: stepsMachineContactFlowAPP,
  CHANGE_STATUS: stepsMachineChangeStatus,
};
export const STEPS_PROPS = Object.seal({
  CALL_RESULTS_OPP: { titleKey: 'callResultOpp', width: 736 },
  CALL_RESULTS: { titleKey: 'callResult', width: 736 },
  CHANGE_STATUS: { titleKey: 'changeStatus', width: 760 },
  CONVERT_OBJECT: { titleKey: 'convertObject', width: 656 },
  INITIAL: { titleKey: 'initial', width: 870 },
  NOTES_AND_QQ: { titleKey: 'notesAndQQs', width: 870 },
  OPPORTUNITY_CONTROL: { titleKey: 'opportunityControl', width: 870 },
  SALES_CHANGE_STATUS: { titleKey: 'changeSalesStatus', width: 760 },
  SCHEDULE_NEXT_STEPS: { titleKey: 'scheduleNextSteps', width: 760 },
  CUSTOM_OBJECT: { titleKey: 'customObject', width: 760 },
  NOTES: { titleKey: 'notes', width: 972 },
  ONLY_QQS: { titleKey: 'onlyQQs', width: 736 },
  CHANGE_STATUS_SALESFORCE: { titleKey: 'changeStatusSalesforce', width: 870 },
  OPPORTUNITY_CONTROL_OTO: { titleKey: 'opportunityControlOTO', width: 736 },
  BOBJECT_FORM: { titleKey: 'bobjectForm', width: 736 },
  CRM_UPDATES: { titleKey: 'crmUpdates', width: 736 },
  ADD_LEAD_TO_ACTIVITY: { titleKey: 'addLeadToActivity', width: 736 },
  STATUS_NOTE_ACTIONS: { titleKey: 'statusNoteActions', width: 964 },
  TASK_MANAGEMENT: { titleKey: 'taskManagement', width: 964 },
});

export enum WIZARD_SOURCES {
  OTO = 'OTO',
  APP = 'APP',
}

export interface CustomObjectModalConfig {
  customObjectName: string;
  descriptionHeader: string;
  mainBobjectType: string;
  fields: any;
  fieldsMapping: any;
  systemMapping: any;
  bloobirdsFields: any;
}

export interface WizardContextConfig {
  markReportedAtStart?: boolean;
}

export interface MetaInfoStep {
  buttonStepConfig?: ButtonsStepConfig;
  customObjectConfig?: CustomObjectModalConfig;
}

export interface CustomObjectField {
  label: string;
  name: string;
  type: string;
  picklistValues?: any;
  defaultValue?: any;
  control: Control<any>;
  required?: boolean;
  styleProps?: any;
}
