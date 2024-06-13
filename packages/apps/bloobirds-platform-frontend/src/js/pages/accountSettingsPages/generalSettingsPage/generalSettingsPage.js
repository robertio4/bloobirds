import React from 'react';
import { useTranslation } from 'react-i18next';

import { useActiveAccountSettings } from '@bloobirds-it/hooks';

import { useUserSettings } from '../../../components/userPermissions/hooks';
import AccountSettingsLayout from '../../../layouts/accountSettingsLayout';
import SessionManagerFactory from '../../../misc/session';
import NoPermissionsPage from '../../noPermissionsPage';
import { AssignationCard } from './components/assignationCard/assignationCard';
import { LeadCard } from './components/leadCard/leadCard';
import { MeetingCard } from './components/meetingCard/meetingCard';
import { TasksCard } from './components/tasksCard/tasksCard';

const AccountSettingsPage = () => {
  const { t } = useTranslation();
  const roleManager = SessionManagerFactory().getRoleManager();
  const accountName = SessionManagerFactory().getAccount().name;

  if (!roleManager.isAccountAdmin()) {
    return <NoPermissionsPage />;
  }
  const settings = useUserSettings();
  const { settings: configOptions, account } = settings;
  const meetingDefault = {
    meetingFieldsRequiredEnabled: configOptions.meetingFieldsRequiredEnabled,
    contactBeforeMeetingTime: configOptions.contactBeforeMeetingTimeRange?.time,
    contactBeforeMeetingTimeRange: configOptions.contactBeforeMeetingTimeRange?.timeRange,
    contactBeforeMeetingWarning: configOptions.contactBeforeMeetingWarning,
    contactBeforeMeetingOnWeekdays: configOptions.contactBeforeMeetingOnWeekdays,
    calendarEventDecision: configOptions.calendarEventDecision,
    openCalendarPopupAfterMeeting: configOptions.openCalendarPopupAfterMeeting,
    calendarLinksType: configOptions.calendarLinksType,
    createMeetingAfterCalendarEvent: configOptions.createMeetingAfterCalendarEvent,
  };
  const leadCardDefault = configOptions.leadEmailMatching;
  const tasksCardDefault = {
    createActivitiesWhenCompletingCallTasks: account.createActivitiesWhenCompletingCallTasks,
  };
  const assignationCardDefault = {
    propagateAssignedFromCompanyToLead: configOptions.propagateAssignedFromCompanyToLeadEnabled,
    propagateAssignedFromLeadToCompany: configOptions.propagateAssignedFromLeadToCompanyEnabled,
  };
  return (
    <AccountSettingsLayout
      title={t('accountSettings.generalSettings.title', { accountName: accountName })}
      subtitle={t('accountSettings.generalSettings.subtitle')}
    >
      <AssignationCard defaultValue={assignationCardDefault} />
      <TasksCard defaultValue={tasksCardDefault} />
      <MeetingCard value={meetingDefault} />
      <LeadCard value={leadCardDefault} />
    </AccountSettingsLayout>
  );
};

export default AccountSettingsPage;
