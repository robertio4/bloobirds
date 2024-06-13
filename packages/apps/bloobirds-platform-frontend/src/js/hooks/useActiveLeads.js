import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { BobjectApi } from '../misc/api/bobject';
import { getFieldByLogicRole } from '../utils/bobjects.utils';
import { LEAD_FIELDS_LOGIC_ROLE } from '../constants/lead';

const activeLeadsAtom = atom({
  key: 'activeLeadsAtom',
  default: () => ({
    data: [],
    loaded: false,
    isFetching: false,
  }),
});

const fetchLead = leadId => BobjectApi.request().Lead().getForm(leadId);

const fetchLeadsByCompany = companyId =>
  BobjectApi.request()
    .Lead()
    .search({
      query: { [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: [companyId] },
      formFields: true,
      pageSize: 50,
      injectReferences: true,
    });

export const useActiveLeads = () => {
  const [leadsState, setLeadsState] = useRecoilState(activeLeadsAtom);
  const resetActiveLeads = useResetRecoilState(activeLeadsAtom);

  const setActiveLeads = newLeads => {
    setLeadsState({
      ...leadsState,
      data: [...newLeads]?.sort((a, b) => {
        const v1 =
          getFieldByLogicRole(a, LEAD_FIELDS_LOGIC_ROLE.HIGH_PRIORITY)?.valueLogicRole === undefined
            ? 0
            : 1;
        const v2 =
          getFieldByLogicRole(b, LEAD_FIELDS_LOGIC_ROLE.HIGH_PRIORITY)?.valueLogicRole === undefined
            ? 0
            : 2;
        return v2 - v1;
      }),
      loaded: true,
    });
  };

  const updateActiveLeadsByCompany = companyId => {
    fetchLeadsByCompany(companyId).then(response => {
      setActiveLeads(response.contents);
    });
  };

  const updateSingleLead = async (leadId, onError) => {
    setLeadsState({
      ...leadsState,
      loaded: false,
    });
    await fetchLead(leadId)
      .then(response => {
        setActiveLeads([response]);
      })
      .catch(error => {
        onError(error);
      });
  };

  return {
    isLoaded: leadsState.loaded,
    activeLeads: leadsState.data,
    resetActiveLeads,
    setActiveLeads,
    updateSingleLead,
    updateActiveLeadsByCompany,
  };
};
