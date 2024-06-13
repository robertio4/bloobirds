import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import InactiveFiltersCompany from './inactiveFiltersCompany';
import InactiveFiltersLead from './inactiveFiltersLead';
import InactiveFiltersOpportunity from './inactiveFiltersOpportunity';

const InactiveFilters = () => {
  // @ts-ignore
  const { section } = useParams();

  const Filters = useCallback(() => {
    switch (section) {
      case 'companies':
        return <InactiveFiltersCompany />;
      case 'leads':
        return <InactiveFiltersLead />;
      case 'opportunities':
        return <InactiveFiltersOpportunity />;
      default:
        return <InactiveFiltersCompany />;
    }
  }, [section]);
  return <Filters />;
};

export default InactiveFilters;
