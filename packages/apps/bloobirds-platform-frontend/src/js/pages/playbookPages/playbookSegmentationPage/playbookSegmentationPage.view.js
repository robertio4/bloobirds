import React from 'react';

import { Tab, TabGroup, Text } from '@bloobirds-it/flamingo-ui';

import { useFullSalesEnabled } from '../../../hooks/useFeatureFlags';
import SessionManagerFactory from '../../../misc/session';
import NoPermissionsPage from '../../noPermissionsPage';
import styles from './playbookSegmentation.module.css';
import TabLayout from './tabLayout';

const PlaybookSegmentationPage = () => {
  const isFullSalesEnabled = useFullSalesEnabled();
  const roleManager = SessionManagerFactory().getRoleManager();

  if (!roleManager.isAccountAdmin()) {
    return <NoPermissionsPage />;
  }

  return (
    <div className={styles._container}>
      <Text htmlTag="h3" size="xl" color="peanut">
        Messaging segmentation
      </Text>
      {isFullSalesEnabled ? (
        <TabGroup>
          <Tab name="Prospect" active color="purple">
            <TabLayout stage="PROSPECT" />
          </Tab>
          <Tab name="Sales" color="purple">
            <TabLayout stage="SALES" />
          </Tab>
        </TabGroup>
      ) : (
        <TabLayout stage="PROSPECT" />
      )}
    </div>
  );
};

export default PlaybookSegmentationPage;
