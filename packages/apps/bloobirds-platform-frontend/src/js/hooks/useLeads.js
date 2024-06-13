import {
  atomFamily,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
  selectorFamily,
} from 'recoil';
import { BobjectApi } from '../misc/api/bobject';
import { isOpportunity } from '../utils/bobjects.utils';

const leadsAtom = atomFamily({
  key: 'leadsAtom',
  default: {
    data: undefined,
    loaded: false,
    isFetching: false,
  },
});

const leadIdAtom = atomFamily({
  key: 'leadIdAtom',
  default: undefined,
});

const leadSelector = selectorFamily({
  key: 'leadSelector',
  get: family => ({ get }) => {
    const leadIndex = get(leadIdAtom(family));
    const leads = get(leadsAtom(family));
    return leads.data?.find(lead => lead?.id?.value === leadIndex);
  },
});

export const fetchLeadsByCompany = companyId =>
  BobjectApi.request()
    .Lead()
    .search({
      query: { LEAD__COMPANY: [companyId] },
      formFields: true,
      pageSize: 50,
      injectReferences: true,
    });

const fetchLeadsByOpportunityId = opportunityId =>
  BobjectApi.request()
    .Lead()
    .search({
      query: { LEAD__OPPORTUNITY: [opportunityId] },
      formFields: true,
      pageSize: 50,
      injectReferences: true,
    });

const fetchLeadsByOpportunity = opportunityId =>
  BobjectApi.request()
    .Lead()
    .search({
      query: { LEAD__OPPORTUNITY: [opportunityId] },
      formFields: true,
      pageSize: 50,
      injectReferences: true,
    });

const fetchLead = leadId => BobjectApi.request().Lead().getForm(leadId);

const searchLeads = searchQuery => BobjectApi.request().Lead().search(searchQuery);

const patchLead = (leadId, data) =>
  BobjectApi.request().bobjectType('Lead').partialSet({ bobjectId: leadId, data });

const patchLeads = data => BobjectApi.request().bobjectType('Lead').bulkPartialSet(data);

export const useLeads = family => {
  const [leads, setLeads] = useRecoilState(leadsAtom(family));
  const selectedLead = useRecoilValue(leadSelector(family));
  const updateSelectedLead = useSetRecoilState(leadIdAtom(family));
  const resetLeads = useResetRecoilState(leadsAtom(family));

  const updateLeads = newLeads => {
    setLeads({ ...leads, data: newLeads, loaded: true, isFetching: false });
  };
  const updateSingleLead = leadId => {
    if (leadId) {
      setLeads({ ...leads, loaded: false });
      fetchLead(leadId).then(response => {
        updateLeads([response]);
      });
    }
  };

  const updateLeadsByCompany = companyId => {
    setLeads({ ...leads, isFetching: true, loaded: false });
    fetchLeadsByCompany(companyId).then(response => {
      updateLeads(response.contents);
    });
  };

  const updateLeadsByOpportunity = opportunity => {
    if (isOpportunity(opportunity)) {
      const referencedLeads = Object.values(opportunity?.referencedBobjects || {})?.filter(
        bobject => bobject?.id?.typeName === 'Lead',
      );
      updateLeads(referencedLeads);
    } else {
      fetchLeadsByOpportunityId(opportunity).then(response => {
        updateLeads(response.contents);
      });
    }
  };

  return {
    isLoaded: leads.loaded,
    leads: leads.data || [],
    isFetching: leads.isFetching,
    selectedLead,
    patchLead,
    patchLeads,
    resetLeads,
    searchLeads,
    setLeads,
    updateLeads,
    updateLeadsByCompany,
    updateLeadsByOpportunity,
    updateSelectedLead,
    updateSingleLead,
  };
};
