import React from 'react';
import SubHomeFooter from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subHomeFooter/subHomeFooter';
import { useProspectingMeetingRemindersFooter } from './useProspectingMeetingReminders';

const MeetingRemindersFooter = ({ scrollToTop }: { scrollToTop: () => void }) => {
  const { dateFilter } = useProspectingMeetingRemindersFooter();

  return (
    <SubHomeFooter
      key="subhome-footer-meetings"
      dateFilter={dateFilter}
      scrollToTop={scrollToTop}
    />
  );
};

export default MeetingRemindersFooter;
