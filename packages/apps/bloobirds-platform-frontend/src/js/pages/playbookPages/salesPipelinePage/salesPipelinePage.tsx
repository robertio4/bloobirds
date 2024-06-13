import { Button, SearchInput } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import AccountSettingsLayout from '../../../layouts/accountSettingsLayout';
import {
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTableContainer,
  AccountSettingsTabSubtitle,
  AccountSettingsTabTitle,
} from '../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import styles from '../automationsPages/workflowsPage/workflowsPage.module.css';
import AccountSettingsTab from '../../../layouts/accountSettingsLayout/accountSettingsTab';
import { useMediaQuery } from '../../../hooks';
import { StagesList } from './stagesList/stagesList';
import { useFullSalesEnabled } from '../../../hooks/useFeatureFlags';
import SessionManagerFactory from '../../../misc/session';
import NoPermissionsPage from '../../noPermissionsPage';
import { useStageCreation } from './hooks/useStageCreation';

export const SalesPipelinePage = () => {
  const { isSmallDesktop } = useMediaQuery();
  const isFullSalesEnabled = useFullSalesEnabled();
  const roleManager = SessionManagerFactory().getRoleManager();
  const { setStageCreation } = useStageCreation();

  if (!isFullSalesEnabled || !roleManager.isAccountAdmin()) {
    return <NoPermissionsPage />;
  }

  return (
    <AccountSettingsLayout
      title="Sales Pipeline"
      subtitle="Use sales pipeline to manage the way you track potential revenue over time."
    >
      <AccountSettingsTab>
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="kanban" color="purple">
              <div className={styles._title_container}>Stages</div>
            </AccountSettingsTabTitle>
            <AccountSettingsTabSubtitle>
              Customize how stages are displayed on your sales pipeline
            </AccountSettingsTabSubtitle>
          </AccountSettingsTabHeaderLeft>
          <AccountSettingsTabHeaderRight>
            <Button iconLeft="plus" color="purple" onClick={() => setStageCreation(true)}>
              {!isSmallDesktop && 'ADD STAGE'}
            </Button>
          </AccountSettingsTabHeaderRight>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <AccountSettingsTableContainer>
            <StagesList />
          </AccountSettingsTableContainer>
        </AccountSettingsTabContent>
      </AccountSettingsTab>
    </AccountSettingsLayout>
  );
};
