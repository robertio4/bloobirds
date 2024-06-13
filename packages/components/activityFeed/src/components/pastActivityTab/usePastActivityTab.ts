import { Bobject, LEAD_FIELDS_LOGIC_ROLE, LeadForFilter } from '@bloobirds-it/types';
import { api, getValueFromLogicRole } from '@bloobirds-it/utils';
import useSWR from 'swr';

function getCompanyLeads(companyIdValue) {
  const accountId = companyIdValue.split('/')[0];
  if (accountId)
    return api.post('/bobjects/' + accountId + '/Lead/search', {
      query: { LEAD__COMPANY: [companyIdValue] },
      formFields: true,
      pageSize: 50,
      injectReferences: true,
    });
}

async function getLeadWithoutCompany(leadId) {
  const response = await api.get('/bobjects/' + leadId + '/form');
  return [response.data];
}

function getLeadsToParse(
  needsFetchingLeads: boolean,
  isLeadWithoutCompany: boolean,
  leadsFromBE,
  leads: Bobject[],
) {
  if (needsFetchingLeads) {
    return leadsFromBE?.data?.contents;
  }
  if (isLeadWithoutCompany) {
    return leadsFromBE;
  }
  return leads;
}

export const usePastActivityTab = data => {
  const { company, leads, filters } = data;
  const needsFetchingLeads =
    //@ts-ignore
    !!company && (leads?.length === 0 || !leads || leads[0]?.companyId !== company?.id?.value);

  const isLeadWithoutCompany = !company && filters.lead?.length === 1;
  const url =
    needsFetchingLeads || isLeadWithoutCompany
      ? `company-leads-${company?.id.value || filters.lead[0]}`
      : null;
  // @ts-ignore
  const { data: leadsFromBE } = useSWR(url, () =>
    isLeadWithoutCompany
      ? getLeadWithoutCompany(filters.lead[0])
      : getCompanyLeads(company?.id.value),
  );
  const leadsToParse = getLeadsToParse(
    needsFetchingLeads,
    isLeadWithoutCompany,
    leadsFromBE,
    leads,
  );
  const leadFilterOptions = leadsToParse?.map(
    (lead): LeadForFilter => ({
      id: lead?.id?.value,
      //@ts-ignore
      name: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) || lead?.fullName,
    }),
  );

  return { leadFilterOptions };
};
