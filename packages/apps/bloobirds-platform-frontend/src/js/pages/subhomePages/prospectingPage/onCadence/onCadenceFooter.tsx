import React from 'react';
import { useProspectingOnCadenceFooter } from './useProspectingOnCadence';
import SubHomeFooter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subHomeFooter/subHomeFooter';

const OnCadenceFooter = ({ scrollToTop }: { scrollToTop: () => void }) => {
  const { dateFilter } = useProspectingOnCadenceFooter();

  return (
    <SubHomeFooter
      key="subhome-footer-scheduled"
      dateFilter={dateFilter}
      scrollToTop={scrollToTop}
    />
  );
};

export default OnCadenceFooter;
