import React from 'react';

import { CadenceTable, CadenceTableProps } from '@bloobirds-it/cadence';
import { useActiveUserId } from '@bloobirds-it/hooks';
import { Bobject } from '@bloobirds-it/types';
import { endOfMonth } from 'date-fns';

import { useBobjectDetails, useBobjectFormVisibility, useContactView } from '../../hooks';
import { useActiveActivitiesFilters } from '../../hooks/useActiveActivities';
import { getReferencedBobject } from '../../utils/bobjects.utils';
import { TIME_WINDOW } from '../timetable/timetable.constants';
import { useSWRConfig } from "swr";

export const WrappedCadenceTable = (
  props: Omit<
    CadenceTableProps,
    'onClickActivityView' | 'onClickActivityExternal' | 'onClickActivityEdit' | 'activeUserId'
  >,
) => {
  const { openEditModal } = useBobjectFormVisibility();
  const { openBobjectDetails } = useBobjectDetails();
  const userId = useActiveUserId();
  const { setTab } = useContactView();
  const { setDateFilter, resetTypeFilter } = useActiveActivitiesFilters();

  const handleClickItem = ({
    timeWindowFilter,
    dateItem,
  }: {
    timeWindowFilter:
      | typeof TIME_WINDOW.WEEKLY
      | typeof TIME_WINDOW.MONTHLY
      | typeof TIME_WINDOW.DAILY;
    dateItem: string;
  }) => {
    if (timeWindowFilter === TIME_WINDOW.DAILY && dateItem) {
      setDateFilter({
        startDate: new Date(dateItem),
        endDate: new Date(dateItem),
      });
    } else if (timeWindowFilter === TIME_WINDOW.WEEKLY) {
      const startOfWeek = new Date(dateItem);
      const endOfWeek = new Date().setDate(startOfWeek.getDate() + 6);
      setDateFilter({
        startDate: startOfWeek,
        endDate: endOfWeek,
      });
    } else {
      const startOfMonth = new Date(dateItem);
      setDateFilter({
        startDate: startOfMonth,
        endDate: endOfMonth(startOfMonth),
      });
    }
    resetTypeFilter();
    setTab('Activity');
    setTimeout(() => {
      document.querySelector('#activity-tab').scrollIntoView({ behavior: 'smooth' });
    }, 250);
  };
  return (
    <CadenceTable
      {...props}
      activeUserId={userId}
      onClickActivityView={(activity: Bobject, timeWindow: string, date: string) => {
        handleClickItem({ timeWindowFilter: timeWindow, dateItem: date });
      }}
      onClickActivityEdit={(activity: Bobject) => openEditModal({ bobject: activity })}
      onClickActivityExternal={(activity: Bobject) => {
        const mainObject = getReferencedBobject(activity);
        openBobjectDetails({ id: mainObject?.id.value });
      }}
    />
  );
};
