import { atomFamily, useRecoilState } from 'recoil';
import { BobjectApi } from '../misc/api/bobject';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../constants/opportunity';
import { usePicklistValues } from './usePicklistValues';

const opportunityAtom = atomFamily({
  key: 'opportunityAtom',
  default: {
    data: undefined,
    loaded: false,
    isFetching: false,
  },
});

const fetchOpportunity = opportunityId => BobjectApi.request().Opportunity().getForm(opportunityId);

const fetchOpportunities = searchQuery => BobjectApi.request().Opportunity().search(searchQuery);

// TODO: Use the new bobjectApi
const updateOpportunity = (oppId, data) =>
  BobjectApi.request().bobjectType('Opportunity').partialSet({ bobjectId: oppId, data });

const updateOpportunities = data =>
  BobjectApi.request().bobjectType('Opportunity').bulkPartialSet(data);

export const useOpportunity = family => {
  const [opportunity, setOpportunity] = useRecoilState(opportunityAtom(family));
  const oppNurturingValues = usePicklistValues({
    picklistLogicRole: OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS,
  })?.filter(stage => stage.nurturingStage);

  const resetOpportunity = () =>
    setOpportunity({
      data: undefined,
      loaded: false,
      isFetching: false,
    });

  const getOpportunityById = opportunityId => {
    if (!opportunity.isFetching) {
      setOpportunity({ ...opportunity, isFetching: true, loaded: false });
      fetchOpportunity(opportunityId).then(response => {
        setOpportunity({
          data: response,
          loaded: true,
          isFetching: false,
        });
      });
    }
  };

  const setOpportunityData = data => {
    setOpportunity({
      data,
      loaded: true,
      isFetching: false,
    });
  };

  return {
    isFetching: opportunity.isFetching,
    isLoaded: opportunity.loaded,
    opportunity: opportunity.data,
    getOpportunityById,
    setOpportunity: setOpportunityData,
    updateOpportunity,
    updateOpportunities,
    resetOpportunity,
    fetchOpportunity,
    fetchOpportunities,
    oppNurturingValues,
  };
};
