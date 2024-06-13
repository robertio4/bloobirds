import { Bobject, BobjectType } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

function getBobjectsByEmails(
  accountId: string,
  bobjectType: string,
  fields: string[],
  emails: string[],
) {
  const queries = fields.map(field => ({ [field]: emails }));
  return api.post('/bobjects/' + accountId + '/' + bobjectType + '/search', {
    query: {},
    queries,
    formFields: true,
    pageSize: 50,
  });
}

export const useBobjectsByEmails = (
  accountId: string,
  bobjectType: BobjectType,
  fields: string[],
  emails: string[],
) => {
  const { data, isValidating } = useSWR(
    accountId && bobjectType && fields && emails ? accountId + bobjectType + emails : null,
    () => getBobjectsByEmails(accountId, bobjectType, fields, emails),
  );
  const bobjects: Bobject[] = data?.data?.contents;

  return { bobjects, isValidating };
};
