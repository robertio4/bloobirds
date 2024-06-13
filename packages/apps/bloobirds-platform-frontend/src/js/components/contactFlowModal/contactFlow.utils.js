import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../../constants/activity';
import { CALL_RESULTS_LOGIC_ROLE } from '../../constants/callResult';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../constants/lead';
import {
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../utils/bobjects.utils';
import { segToTime } from '../../utils/time.utils';

export const filterCallResults = callResultsPicklistValues =>
  callResultsPicklistValues
    .filter(picklistValue => picklistValue.enabled)
    ?.map(callResult => ({
      fieldId: callResult.id,
      value: callResult.value,
      ordering: callResult.ordering,
      logicRole: callResult.logicRole,
      isCorrectContact: callResult.logicRole === CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT,
    }))
    .sort((a, b) => {
      if ([a.value, b.value].includes('Other')) {
        return a.value === 'Other' ? 1 : -1;
      }
      return b.ordering === 0 || a.ordering - b.ordering > 0 ? 1 : -1;
    });

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
