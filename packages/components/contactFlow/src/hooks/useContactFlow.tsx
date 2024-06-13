import React, { createContext, useContext, useMemo, useState } from 'react';

import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  ButtonsStepConfig,
  ExtensionBobject,
  LogicRoleType,
} from '@bloobirds-it/types';
import { getFieldByLogicRole, getFieldsByType, getIsSales } from '@bloobirds-it/utils';
import { useMachine } from '@xstate/react';

import {
  EVENTS,
  getButtonStepConfig,
  getCustomMachine,
  MODAL_STEPS,
  modalStepsMachine,
  stepsMachine,
} from '../components/contactFlowModal.machine';
import { ActivityRelatedInfoProps, Pitch, UseCallResultInterface } from '../types/contactFlowTypes';
import { useCallResult } from './useContactFlowInfo';

interface CallResultStepInterface {
  callResult: {
    fieldId: string;
    value: string;
    logicRole: LogicRoleType<BobjectTypes.Activity>;
    isCorrectContact: boolean;
  };
  pitch: {
    done: any;
    template: null;
  };
}

interface CallResultContextProps extends ActivityRelatedInfoProps, UseCallResultInterface {
  activity: Bobject;
  dataModel: any;
  referenceBobject: Bobject | ExtensionBobject;
  hasSalesEnabled: boolean;
  hasLeads: boolean;
  availablePitches: Pitch[];
  isPitchNo: (pitch: any) => boolean;
  findPitchDoneNo: (pitches: any) => any;
  callResultStepData: CallResultStepInterface;
  setCallResultStepData: React.Dispatch<React.SetStateAction<CallResultStepInterface>>;
  changeStatusStepData: any;
  setChangeStatusStepData: React.Dispatch<React.SetStateAction<any>>;
  noteStepData: { value: string; fieldId: string };
  setNoteStepData: React.Dispatch<React.SetStateAction<{ value: string; fieldId: string }>>;
  step: any;
  service: any;
  modalStep: any;
  buttonStepConfig: ButtonsStepConfig;
  send: (event: any, params?: any) => void;
  modalControlSend: (event: any, params?: any) => void;
  handleClose?: () => void;
}
const ContactFlowModalContext = createContext<CallResultContextProps>(null);

type ProviderType = {
  activity: Bobject;
  referenceBobject: Bobject | ExtensionBobject;
  handleClose?: () => void;
  dataModel: any;
  children: React.ReactElement;
  hasCustomWizardsEnabled: boolean;
  wizardsMap: any;
};

export const ContactFlowModalProvider = ({
  hasCustomWizardsEnabled,
  wizardsMap,
  children,
  ...props
}: ProviderType) => {
  const { activity, dataModel, referenceBobject, handleClose } = props;
  const hasSalesEnabled = true;
  const hasLeads = true;
  const callResultEntitiesInfo = useCallResult(dataModel);
  const activityRelatedInfo = useActivityRelatedInfo(activity, dataModel, referenceBobject);
  //initialize to entry values instead of useEffect on modal step
  const [changeStatusStepData, setChangeStatusStepData] = useState({
    companyStatus: undefined,
    leadStatus: undefined,
  });
  const [callResultStepData, setCallResultStepData] = useState();
  const [noteStepData, setNoteStepData] = useState<{
    value: string;
    fieldId: string;
  }>();

  const [{ value: modalStep }, modalControlSend] = useMachine(modalStepsMachine, {
    context: {
      handleClose: handleClose,
    },
  });

  const machineDefinition = useMemo(() => {
    return hasCustomWizardsEnabled ? getCustomMachine(wizardsMap) : stepsMachine;
  }, [wizardsMap]);
  const [{ value: step }, send, service] = useMachine(machineDefinition, {
    context: {
      referenceBobject,
      hasSalesEnabled,
      handleClose: handleClose,
      openCadenceControl: () => {
        modalControlSend(MODAL_STEPS.CADENCE_CONTROL);
      },
    },
  });
  let buttonStepConfig: ButtonsStepConfig = null;
  if (hasCustomWizardsEnabled) {
    service.onTransition(state => {
      buttonStepConfig = getButtonStepConfig(state.meta);
      buttonStepConfig.hasPreviousStep = state.can(EVENTS.PREVIOUS);
    });
  }
  return (
    <ContactFlowModalContext.Provider
      value={{
        ...props,
        ...activityRelatedInfo,
        ...callResultEntitiesInfo,
        hasSalesEnabled,
        hasLeads,
        callResultStepData,
        setCallResultStepData,
        changeStatusStepData,
        setChangeStatusStepData,
        noteStepData,
        setNoteStepData,
        step,
        send,
        service,
        modalStep,
        modalControlSend,
        buttonStepConfig,
        handleClose,
      }}
    >
      {children}
    </ContactFlowModalContext.Provider>
  );
};

export const useContactFlow = () => {
  const context = useContext(ContactFlowModalContext);

  if (context === undefined) {
    throw new Error('useContactFlowModal must be used within the modal provider');
  }

  return context;
};
//@ts-ignore
const useActivityRelatedInfo = (
  activity,
  dataModel,
  referenceBobject,
): ActivityRelatedInfoProps => {
  const activityLead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)
    ?.referencedBobject;
  const activityCompany = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const activityOpportunity = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const referenceBobjectIsSales = referenceBobject
    ? getIsSales(dataModel, referenceBobject)
    : false;
  const leadAvailablePhoneFields = getFieldsByType(activityLead, 'PHONE');
  const companyAvailablePhoneFields = getFieldsByType(activityLead, 'PHONE');

  return {
    referenceBobject,
    activityCompany,
    activityLead,
    activityOpportunity,
    referenceBobjectIsSales,
    leadAvailablePhoneFields,
    companyAvailablePhoneFields,
  };
};
