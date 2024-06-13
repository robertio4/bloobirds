import React from 'react';

import { SlotsData, SmartEmailTab } from '@bloobirds-it/types';

import { useSmartEmailModal } from '../../../smartEmailModal';
import { DayCalendar } from '../../components/dayCalendar/dayCalendar';
import { TabProps } from '../smartEmailHelperTabs';

export const CalendarTab = ({ tabProps }: { tabProps: Pick<TabProps, 'bodyEditor'> }) => {
  const { bodyEditor } = tabProps;
  //TODO study if this wrapper is necessary
  const {
    setSelectedTab,
    slotsData,
    setSlotsData,
    id,
    user,
    accountId,
    connections,
    mutateConnections,
    hasTimeSlotsEnabled,
  } = useSmartEmailModal();

  return (
    <DayCalendar
      bodyEditor={bodyEditor}
      hasCalendarSlotsEnabled={hasTimeSlotsEnabled}
      slotsData={slotsData}
      setSlotsData={setSlotsData}
      id={id}
      accountId={accountId}
      userId={user?.id}
      connections={connections}
      mutateConnections={mutateConnections}
      handleSlotClick={() => {
        setSelectedTab(SmartEmailTab.CALENDAR);
        setSlotsData((prevSlotsData: SlotsData) => {
          return {
            ...prevSlotsData,
            calendarSlotsVisible: true,
          };
        });
      }}
    />
  );
};
