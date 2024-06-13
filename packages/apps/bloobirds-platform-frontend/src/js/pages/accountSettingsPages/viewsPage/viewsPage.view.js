import React, { useMemo } from 'react';

import { Tab, TabGroup } from '@bloobirds-it/flamingo-ui';
import { useIsOTOAccount } from '@bloobirds-it/hooks';
import { BOBJECT_TYPES } from '@bloobirds-it/types';

import { useFullSalesEnabled } from '../../../hooks/useFeatureFlags';
import AccountSettingsLayout from '../../../layouts/accountSettingsLayout';
import SessionManagerFactory from '../../../misc/session';
import NoPermissionsPage from '../../noPermissionsPage';
import ViewTabTemplate from './viewTabTemplate';

const ViewsPage = () => {
  const roleManager = SessionManagerFactory().getRoleManager();
  const salesFeatureEnabled = useFullSalesEnabled();
  const isOTOAccount = useIsOTOAccount();
  const viewsTabs = useMemo(() => {
    const tabs = [
      <Tab name="Company" key="company-tab">
        <ViewTabTemplate bobjectType={BOBJECT_TYPES.COMPANY} />
      </Tab>,
    ];

    tabs.push(
      <Tab name="Lead">
        <ViewTabTemplate bobjectType={BOBJECT_TYPES.LEAD} />
      </Tab>,
    );

    if (salesFeatureEnabled) {
      tabs.push(
        <Tab name="Opportunity">
          <ViewTabTemplate bobjectType={BOBJECT_TYPES.OPPORTUNITY} />
        </Tab>,
      );
    }
    return tabs;
  }, [salesFeatureEnabled]);

  if (!roleManager.isAccountAdmin() || isOTOAccount) {
    return <NoPermissionsPage />;
  }

  return (
    <AccountSettingsLayout title="Views" defaultTab="Company">
      <TabGroup>{viewsTabs}</TabGroup>
    </AccountSettingsLayout>
  );
};

export default ViewsPage;
