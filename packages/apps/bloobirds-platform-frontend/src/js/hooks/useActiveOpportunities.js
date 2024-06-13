import { atom, selector, useRecoilState, useResetRecoilState } from 'recoil';

import { BobjectApi } from '../misc/api/bobject';

const activeOpportunitiesAtom = atom({
  key: 'activeOpportunitiesAtom',
  default: {
    data: undefined,
    loaded: false,
    isFetching: false,
  },
});

const activeOpportunityIdAtom = atom({
  key: 'activeOpportunityIdAtom',
  default: undefined,
});

export const activeOpportunitySelector = selector({
  key: 'activeOpportunitySelector',
  get: ({ get }) => {
    const opportinityIndex = get(activeOpportunityIdAtom);
    const opportunities = get(activeOpportunitiesAtom);
    return opportunities.data?.find(opportunity => opportunity.id.value === opportinityIndex);
  },
});

const fetchOpportunity = opportunityId => BobjectApi.request().Opportunity().getForm(opportunityId);

export const useActiveOpportunities = () => {
  const [opportunitiesState, setOpportunitiesState] = useRecoilState(activeOpportunitiesAtom);
  const resetActiveOpportunities = useResetRecoilState(activeOpportunitiesAtom);

  const setActiveOpportunities = newOpportunities => {
    setOpportunitiesState({
      ...opportunitiesState,
      data: newOpportunities,
      loaded: true,
    });
  };

  const updateSingleOpportunity = opportunityId => {
    setOpportunitiesState({
      ...opportunitiesState,
      loaded: false,
    });
    fetchOpportunity(opportunityId).then(response => {
      setActiveOpportunities([response]);
    });
  };

  return {
    isLoaded: opportunitiesState.loaded,
    activeOpportunities: opportunitiesState.data,
    resetActiveOpportunities,
    setActiveOpportunities,
    updateSingleOpportunity,
  };
};
