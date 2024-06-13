import { getLastAttemptDate, getCompanyLastAttemptDate, getLeadLastAttemptDate } from './taskCard';

describe('call getCompanyLastAttemptDate', () => {
  it('Company last attempt date when the activeCompany has not last attempt date', () => {
    const companyLastAttemptDate = '2021-12-27';
    const activeCompanyLastAtteptDate = undefined;

    const result = getCompanyLastAttemptDate(companyLastAttemptDate, activeCompanyLastAtteptDate);

    expect(result).toEqual('2021-12-27');
  });
  it('Company last attempt date when the the company has not date and the active company if it has', () => {
    const companyLastAttemptDate = undefined;
    const activeCompanyLastAttemptDate = '2021-12-17';

    const result = getCompanyLastAttemptDate(companyLastAttemptDate, activeCompanyLastAttemptDate);

    expect(result).toEqual('2021-12-17');
  });
  it('Company last attempt date when the company bobject has the last attempt date greater than the active company', () => {
    const companyLastAttemptDate = '2021-12-27';
    const activeCompanyLastAttemptDate = '2021-12-17';

    const result = getCompanyLastAttemptDate(companyLastAttemptDate, activeCompanyLastAttemptDate);

    expect(result).toEqual('2021-12-27');
  });
  it('Company last attempt date when the active company bobject has the last attempt date greater than the company', () => {
    const companyLastAttemptDate = '2021-12-17';
    const activeCompanyLastAttemptDate = '2021-12-27';

    const result = getCompanyLastAttemptDate(companyLastAttemptDate, activeCompanyLastAttemptDate);

    expect(result).toEqual('2021-12-27');
  });
});

describe('call getLeadLastAttemptDate', () => {
  it('Lead last attempt date when the activeLead has not last attempt date', () => {
    const leadLastAttemptDate = '2021-12-27';
    const activeLeadLastAtteptDate = undefined;

    const result = getLeadLastAttemptDate(leadLastAttemptDate, activeLeadLastAtteptDate);

    expect(result).toEqual('2021-12-27');
  });
  it('Lead last attempt date when the the lead bobject has not date and the active lead if it has', () => {
    const leadLastAttemptDate = undefined;
    const activeLeadLastAtteptDate = '2021-12-27';

    const result = getLeadLastAttemptDate(leadLastAttemptDate, activeLeadLastAtteptDate);

    expect(result).toEqual('2021-12-27');
  });
  it('Lead last attempt date when the lead bobject has the last attempt date greater than the active lead', () => {
    const leadLastAttemptDate = '2021-12-27';
    const activeLeadLastAtteptDate = '2021-12-17';

    const result = getLeadLastAttemptDate(leadLastAttemptDate, activeLeadLastAtteptDate);

    expect(result).toEqual('2021-12-27');
  });
  it('Lead last attempt date when the active lead bobject has the last attempt date greater than the lead', () => {
    const leadLastAttemptDate = '2021-12-17';
    const activeLeadLastAtteptDate = '2021-12-27';

    const result = getLeadLastAttemptDate(leadLastAttemptDate, activeLeadLastAtteptDate);

    expect(result).toEqual('2021-12-27');
  });
});

describe('call getLastAttemptDate', () => {
  it('last attempt date for a company task without leads', () => {
    const values = {
      companyLastAttemptDate: '2021-12-27',
      hasLead: false,
    };

    const result = getLastAttemptDate(values);

    expect(result).toEqual('2021-12-27');
  });
  it('last attempt date for a lead task without company', () => {
    const values = {
      leadLastAttemptDate: '2021-12-17',
      hasLead: true,
    };

    const result = getLastAttemptDate(values);

    expect(result).toEqual('2021-12-17');
  });
  it('last attempt date for a task with company and lead', () => {
    const values = {
      companyLastAttemptDate: '2021-12-27',
      leadLastAttemptDate: '2021-12-17',
      hasLead: true,
    };

    const result = getLastAttemptDate(values);

    expect(result).toEqual('2021-12-17');
  });
  it('last attempt date for a task with company and lead, and where the lead attempt date is undefined', () => {
    const values = {
      companyLastAttemptDate: '2021-12-27',
      leadLastAttemptDate: undefined,
      hasLead: true,
    };

    const result = getLastAttemptDate(values);

    expect(result).toEqual(undefined);
  });
});
