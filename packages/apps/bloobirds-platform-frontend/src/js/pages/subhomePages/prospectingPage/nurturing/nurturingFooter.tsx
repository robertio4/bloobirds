import React from 'react';
import { useProspectingNurturingFooter } from './useProspectNurturing';
import SubHomeFooter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subHomeFooter/subHomeFooter';

const NurturingFooter = ({ scrollToTop }: { scrollToTop: () => void }) => {
  const { dateFilter } = useProspectingNurturingFooter();

  return (
    <SubHomeFooter
      key="subhome-footer-scheduled"
      dateFilter={dateFilter}
      scrollToTop={scrollToTop}
    />
  );
};

export default NurturingFooter;
