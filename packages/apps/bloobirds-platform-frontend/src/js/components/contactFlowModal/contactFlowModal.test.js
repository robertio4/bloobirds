import { EVENTS, STEPS, stepsMachine } from './contactFlowModal.machine';
import { CALL_RESULTS_LOGIC_ROLE } from '../../constants/callResult';
import { LEAD_STATUS } from '../../constants/lead';
import { COMPANY_STATUS } from '../../constants/company';
import { getCalendarOptions, getStatusOfBobject } from './contactFlowModal';
import { BOBJECT_TYPES } from '@bloobirds-it/types';

it('should reach "Notes and QQ" from "CALL_RESULTS" when the event "NEXT" occurs with any callResult', () => {
  const expectedValue = STEPS.NOTES_AND_QQ;
  const actualState = stepsMachine.transition(STEPS.CALL_RESULTS, EVENTS.NEXT);
  expect(actualState.matches(expectedValue)).toBeTruthy();
});

it('should reach "Change Status" from "Notes and QQ" when the event "NEXT" occurs after transitioning to "Notes and QQ" with a Correct Contact', () => {
  const expectedValue = STEPS.CHANGE_STATUS;
  const selectedCallResult = CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT;
  const firstState = stepsMachine.transition(
    STEPS.CALL_RESULTS,
    { type: EVENTS.NEXT, callResult: selectedCallResult },
    { callResult: selectedCallResult },
  );
  const actualState = stepsMachine.transition(firstState, EVENTS.NEXT);

  expect(actualState.matches(expectedValue)).toBeTruthy();
});

it('should reach "Schedule next step" from "Notes and QQ" when the event "NEXT" occurs after transitioning to "Notes and QQ" with a call result different of Correct Contact', () => {
  const expectedValue = STEPS.SCHEDULE_NEXT_STEPS;
  const selectedCallResult = CALL_RESULTS_LOGIC_ROLE.APPROACH;
  const firstState = stepsMachine.transition(
    STEPS.CALL_RESULTS,
    { type: EVENTS.NEXT, callResult: selectedCallResult },
    { callResult: selectedCallResult },
  );
  const actualState = stepsMachine.transition(firstState, EVENTS.NEXT);

  expect(actualState.matches(expectedValue)).toBeTruthy();
});

it('should reach "Call results" from "Notes and QQ" when the event "PREVIOUS" occurs ', () => {
  const expectedValue = STEPS.CALL_RESULTS;
  const selectedCallResult = CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT;
  const firstState = stepsMachine.transition(
    STEPS.CALL_RESULTS,
    { type: EVENTS.NEXT, callResult: selectedCallResult },
    { callResult: selectedCallResult },
  );
  const actualState = stepsMachine.transition(firstState, EVENTS.PREVIOUS);

  expect(actualState.matches(expectedValue)).toBeTruthy();
});

it('should reach "Opportunity Control" from "Change Status" when the event "NEXT" occurs after transitioning to "Notes and QQ" with a call result Correct Contact, with sales feature and sales conversion enabled', () => {
  const expectedValue = STEPS.CONVERT_OBJECT;
  const selectedCallResult = CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT;
  const firstState = stepsMachine.transition(
    STEPS.CALL_RESULTS,
    { type: EVENTS.NEXT, callResult: selectedCallResult },
    { callResult: selectedCallResult },
  );
  const secondState = stepsMachine.transition(firstState, EVENTS.NEXT);
  const thirdState = stepsMachine.transition(
    secondState,
    { type: EVENTS.NEXT, leadStatus: LEAD_STATUS.CONTACT, companyStatus: COMPANY_STATUS.ACCOUNT },
    { hasSalesFeatureEnabled: true },
  );
  expect(thirdState.matches(expectedValue)).toBeTruthy();
});

it('should reach "Opportunity Control" from "Change Status" when the event "NEXT" occurs after transitioning to "Notes and QQ" with a call result Correct Contact, with sales feature and sales conversion enabled', () => {
  const expectedValue = STEPS.OPPORTUNITY_CONTROL;
  const selectedCallResult = CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT;
  const firstState = stepsMachine.transition(
    STEPS.CALL_RESULTS,
    { type: EVENTS.NEXT, callResult: selectedCallResult },
    { callResult: selectedCallResult },
  );
  const secondState = stepsMachine.transition(firstState, EVENTS.NEXT);
  const thirdState = stepsMachine.transition(
    secondState,
    { type: EVENTS.NEXT, leadStatus: LEAD_STATUS.CONTACT, companyStatus: COMPANY_STATUS.ACCOUNT },
    { hasSalesFeatureEnabled: true },
  );
  expect(thirdState.matches(expectedValue)).toBeTruthy();
});

it('should reach "Change Status" from "Opportunity Control" when the event "PREVIOUS" occurs after transitioning to "Notes and QQ" with a call result Correct Contact', () => {
  const expectedValue = STEPS.CHANGE_STATUS;
  const selectedCallResult = CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT;
  const firstState = stepsMachine.transition(
    STEPS.CALL_RESULTS,
    { type: EVENTS.NEXT, callResult: selectedCallResult },
    { callResult: selectedCallResult },
  );
  const secondState = stepsMachine.transition(firstState, EVENTS.NEXT);
  const thirdState = stepsMachine.transition(
    secondState,
    { type: EVENTS.NEXT, leadStatus: LEAD_STATUS.CONTACT, companyStatus: COMPANY_STATUS.ACCOUNT },
    { hasSalesFeatureEnabled: true },
  );
  const actualState = stepsMachine.transition(thirdState, EVENTS.PREVIOUS);
  expect(actualState.matches(expectedValue)).toBeTruthy();
});

describe('Next step tests', () => {
  it('when the main bobject is a lead the proper status should be returned', () => {
    const lead = {
      id: {
        typeName: 'Lead',
      },
    };
    expect(getStatusOfBobject(lead, { leadStatus: 'nurturing' })).toEqual('Nurturing');
  });
  it('when the main bobject is a company the proper status should be returned ', () => {
    const company = {
      id: {
        typeName: 'Company',
      },
    };
    expect(getStatusOfBobject(company, { companyStatus: 'nurturing' })).toEqual('Nurturing');
  });
  it('when the main bobject is a lead the calendar options company id is null', () => {
    const lead = {
      id: {
        typeName: BOBJECT_TYPES.LEAD,
        value: 'testId',
        objectId: 'testObjectId',
      },
    };
    const scheduleStepData = {
      lead: { id: { value: 'testId' } },
      title: 'test title',
    };
    const company = { id: { value: 'testCompanyId' } };
    const calendarOptions = getCalendarOptions(lead, 'datetime', scheduleStepData, company);
    expect(calendarOptions).toEqual({
      leadId: lead.id.value,
      dateTime: 'datetime',
      title: 'test title',
      companyId: null,
    });
  });
});
