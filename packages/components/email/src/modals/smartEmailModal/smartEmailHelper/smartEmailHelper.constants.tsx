import React from 'react';

import { PastActivityTab } from '@bloobirds-it/activity-feed';
import { useSubscribeListeners } from '@bloobirds-it/bloobirds-chrome-extension/src/content/components/contactView/hooks/useSubscribeListeners';
import { IconType } from '@bloobirds-it/flamingo-ui';
import { useObjectCreationSettings, useIsB2CAccount } from '@bloobirds-it/hooks';
import {
  BobjectTypes,
  DateFilterValues,
  SmartEmailHelperTabType,
  SmartEmailTab,
} from '@bloobirds-it/types';

import { useSmartEmailModal } from '../smartEmailModal';
import { CalendarTab } from './pages/calendarTab/calendarTab';
import { CreateLeadTab } from './pages/createLeadTab/createLeadTab';
import { CreateTaskTab } from './pages/createTaskTab/createTaskTab';
import { PreviewTab } from './pages/previewTab/previewTab';
import { SimilarDealsTab } from './pages/similarDealsTab/similarDealsTab';
import { TabProps } from './pages/smartEmailHelperTabs';
import { TemplatesTab } from './pages/templatesTab/templatesTab';

export const emailHelperTabs: (
  parentRef?: any,
  tabProps?: TabProps,
) => {
  [x: SmartEmailTab | string]: SmartEmailHelperTabType;
} = (parentRef, tabProps) => {
  const { newLeadInfo } = useSmartEmailModal();
  const { enabledObjectCreation } = useObjectCreationSettings();
  const isB2CAccount = useIsB2CAccount();

  const {
    dataModel,
    user,
    selectedActivity,
    setSelectedActivity,
    activeBobject,
    opportunity,
    pageBobjectType,
    filters,
    setFilters,
    company,
    leads,
    accountId,
  } = useSmartEmailModal();

  return {
    [SmartEmailTab.PREVIEW]: {
      title: 'Preview',
      icon: 'eye',
      dataTest: 'previewTab',
      key: 'previewTab',
      tab: <PreviewTab previewTabProps={tabProps} />,
      visible: true,
    },
    [SmartEmailTab.PAST_ACTIVITY]: {
      title: 'Past Activity',
      dataTest: 'pastActivityTab',
      key: 'pastActivityTab',
      icon: 'historyNonFlipped',
      tab: (
        <PastActivityTab
          ref={parentRef}
          accountId={accountId}
          dataModel={dataModel}
          user={user}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          subscribeMutator={mutator => useSubscribeListeners(BobjectTypes.Activity, mutator)}
          data={{
            activeBobject,
            opportunity,
            pageBobjectType,
            filters,
            setFilters,
            company,
            leads,
          }}
        />
      ),
      visible: true,
    },
    ...(isB2CAccount
      ? {}
      : {
          [SmartEmailTab.CLOSED_DEALS]: {
            title: 'Similar won deals',
            dataTest: 'similarWonDealsTab',
            key: 'similarWonDealsTab',
            icon: 'fileOpportunity',
            tab: <SimilarDealsTab />,
            visible: true,
            workInProgress: false,
          },
        }),
    [SmartEmailTab.TEMPLATES]: {
      title: 'Templates & Snippets',
      dataTest: 'templatesTab',
      key: 'templatesTab',
      icon: 'file',
      tab: <TemplatesTab tabProps={tabProps} />,
      visible: true,
      workInProgress: false,
    },
    [SmartEmailTab.CREATE_TASK]: {
      title: 'New Task',
      dataTest: 'createTaskTab',
      key: 'createTaskTab',
      icon: 'checkDouble',
      tab: <CreateTaskTab />,
      visible: true,
    },
    [SmartEmailTab.CREATE_LEAD]: {
      title: 'Create Lead',
      dataTest: 'createLeadTab',
      key: 'createLeadTab',
      icon: 'personAdd' as IconType,
      tab: <CreateLeadTab />,
      visible: newLeadInfo?.email !== undefined && enabledObjectCreation,
    },
    [SmartEmailTab.CALENDAR]: {
      title: 'Calendar',
      dataTest: 'calendarTab',
      key: 'calendarTab',
      icon: 'calendar',
      tab: <CalendarTab tabProps={tabProps} />,
      visible: true,
    },
  };
};

export const PAST_ACTIVITY_FILTERS = [
  { label: 'Calls', value: 'ACTIVITY__TYPE__CALL' },
  { label: 'Emails', value: 'ACTIVITY__TYPE__EMAIL' },
  { label: 'Meetings', value: 'ACTIVITY__TYPE__MEETING' },
  { label: 'LinkedIn', value: 'ACTIVITY__TYPE__LINKEDIN_MESSAGE' },
  { label: 'Inbound', value: 'ACTIVITY__TYPE__INBOUND' },
];

export const emailHelperFilterItems: string[] = [
  'All',
  'All files',
  'PDFs',
  'Images',
  'Links',
  'Snippets',
];

export const pastActivityFilterItems: string[] = [
  'All',
  'Calls',
  'Emails',
  'Meetings',
  'Linkedin',
  'Inbound',
];

export const DATE_FILTER_DAY_VALUES = {
  [DateFilterValues.LAST_30_DAYS]: 30,
  [DateFilterValues.LAST_90_DAYS]: 90,
  [DateFilterValues.LAST_180_DAYS]: 180,
  [DateFilterValues.LAST_YEAR]: 365,
  [DateFilterValues.ALL_TIME]: 10000,
};

export const DATE_FILTER_VALUES = [
  { value: DateFilterValues.LAST_30_DAYS, label: 'Last 30 days' },
  { value: DateFilterValues.LAST_90_DAYS, label: 'Last 3 months' },
  { value: DateFilterValues.LAST_180_DAYS, label: 'Last 6 months' },
  { value: DateFilterValues.LAST_YEAR, label: 'Last year' },
  { value: DateFilterValues.ALL_TIME, label: 'All time' },
];
