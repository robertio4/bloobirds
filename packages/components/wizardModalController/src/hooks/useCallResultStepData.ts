import React, { useState } from 'react';

import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  BobjectTypes,
  CALL_RESULTS_LOGIC_ROLE,
  DataModelResponse,
  LogicRoleType,
} from '@bloobirds-it/types';
import { getFieldByLogicRole } from '@bloobirds-it/utils';

export interface CallResultStepInterface {
  callResult: {
    fieldId: string;
    value: string;
    logicRole: LogicRoleType<BobjectTypes>;
    isCorrectContact: boolean;
  };
  pitch: {
    done: any;
    template: null;
  };
  recall: { date: Date; checked: boolean };
}
export interface CallResultStepDataInterface {
  callResultStepData: CallResultStepInterface;
  setCallResultStepData: React.Dispatch<React.SetStateAction<CallResultStepInterface>>;
  callResultsPicklistValues: {
    backgroundColor: string;
    isEnabled: boolean;
    name: string;
    outlineColor: string;
    id: string;
    textColor: string;
    shortname: string;
    logicRole: string;
  }[];
}

export const useCallResultStepData = (
  activity,
  dataModel,
  contextCallResultStepData,
  contextCallResult = null,
): CallResultStepDataInterface => {
  let initialState;
  if (contextCallResultStepData) {
    initialState = contextCallResultStepData;
  } else {
    const callResultField = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT);
    const isCorrectContact =
      callResultField.valueLogicRole === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT ||
      contextCallResult === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT;
    initialState = {
      callResult: {
        fieldId: callResultField.name,
        value: callResultField.value,
        logicRole: contextCallResult || callResultField.valueLogicRole,
        isCorrectContact,
      },
      pitch: {
        done: false,
        template: null,
      },
    };
  }

  const [callResultStepData, setCallResultStepData] = useState(initialState);

  const getCallResultPicklistValues = (dataModel: DataModelResponse) => {
    if (!dataModel) return [];
    return dataModel
      .findValuesByFieldLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT)
      .reduce((acc, callResult) => {
        if (!callResult.isEnabled) return acc;
        const isCorrectContact = callResult.logicRole === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT;
        return [...acc, { ...callResult, ...(isCorrectContact ? { isCorrectContact: true } : {}) }];
      }, [])
      ?.sort((a, b) => (a.ordering < b.ordering ? -1 : 1));
  };
  const callResultsPicklistValues = getCallResultPicklistValues(dataModel);

  return {
    callResultsPicklistValues,
    callResultStepData,
    setCallResultStepData,
  };
};
