import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  COMPANY_FIELDS_LOGIC_ROLE,
  DataModelResponse,
  LEAD_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  getFieldByLogicRole,
  getValueFromLogicRole,
  getTextFromLogicRole,
  segToTime,
} from '@bloobirds-it/utils';

import { CALL_RESULTS_LOGIC_ROLE } from '../../types/contactFlowTypes';

export const getCallResultPicklistValues = (dataModel: DataModelResponse) => {
  const callResultsPicklistValues = dataModel
    .findValuesByFieldLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT)
    .reduce((acc, callResult) => {
      if (!callResult.isEnabled) return acc;
      const isCorrectContact = callResult.logicRole === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT;
      return [...acc, { ...callResult, ...(isCorrectContact ? { isCorrectContact: true } : {}) }];
    }, [])
    ?.sort((a, b) => (a.ordering < b.ordering ? -1 : 1));
  const pitchDonePicklistValues = dataModel
    ?.findValuesByFieldLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.PITCH_DONE)
    ?.sort((a, b) => (a.value < b.value ? -1 : 1));
  const companyStatusPicklistValues = dataModel
    .findValuesByFieldLogicRole(COMPANY_FIELDS_LOGIC_ROLE.STATUS)
    ?.sort((a, b) => (a.value < b.value ? -1 : 1));
  const leadStatusPicklistValues = dataModel
    .findValuesByFieldLogicRole(LEAD_FIELDS_LOGIC_ROLE.STATUS)
    ?.sort((a, b) => (a.value < b.value ? -1 : 1));
  const companySalesStatusPicklistValues = dataModel
    .findValuesByFieldLogicRole(COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS)
    ?.sort((a, b) => (a.value < b.value ? -1 : 1));
  const leadSalesStatusPicklistValues = dataModel
    .findValuesByFieldLogicRole(LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS)
    ?.sort((a, b) => (a.value < b.value ? -1 : 1));
  return {
    callResultsPicklistValues,
    pitchDonePicklistValues,
    companyStatusPicklistValues,
    leadStatusPicklistValues,
    companySalesStatusPicklistValues,
    leadSalesStatusPicklistValues,
  };
};

export const getActivityData = activity => {
  const company = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const companyName = company && getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const date = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const direction = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
  const durationInSeconds = getValueFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.CALL_DURATION,
  );
  const lead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const leadName = lead && getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  const phone = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER);
  const record = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RECORD_URL);

  return {
    companyName,
    leadName,
    date,
    direction,
    duration: durationInSeconds ? segToTime(durationInSeconds, 'hhh mmm sss') : null,
    phone,
    record,
  };
};

export const calculateFirstColumnSize = (elements: Array<any>) => {
  if (!elements) return;
  const calculateHalfNumber = (elements: Array<any>) => {
    const isExactHalf = elements.length % 2 === 0;
    return isExactHalf ? elements.length / 2 : Math.floor(elements.length / 2) + 1;
  };

  const halfNumber = calculateHalfNumber(elements);

  return halfNumber >= 6 ? halfNumber : 6;
};
