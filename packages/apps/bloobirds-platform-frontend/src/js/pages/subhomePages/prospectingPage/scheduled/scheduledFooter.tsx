import React from 'react';
import { useProspectingScheduledFooter } from './useProspectingScheduled';
import SubHomeFooter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subHomeFooter/subHomeFooter';

const ScheduledFooter = ({ scrollToTop }: { scrollToTop: () => void }) => {
  const { dateFilter } = useProspectingScheduledFooter();
  return (
    <SubHomeFooter
      key="subhome-footer-scheduled"
      dateFilter={dateFilter}
      scrollToTop={scrollToTop}
    />
  );
};

export default ScheduledFooter;
