import React, { useState } from 'react';

import { Button, SearchInput } from '@bloobirds-it/flamingo-ui';
import mixpanel from 'mixpanel-browser';

import { APP_PLAYBOOK_MESSAGING_WORKFLOWS } from '../../../../app/_constants/routes';
import { ShowDisableCheckbox } from '../../../../components/showDisableCheckbox/showDisableCheckbox';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useMediaQuery, useRouter } from '../../../../hooks';
import { useSidebar } from '../../../../hooks/useSidebar';
import AccountSettingsLayout from '../../../../layouts/accountSettingsLayout';
import AccountSettingsTab from '../../../../layouts/accountSettingsLayout/accountSettingsTab';
import {
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTableContainer,
  AccountSettingsTabSubtitle,
  AccountSettingsTabTitle,
} from '../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import SessionManagerFactory from '../../../../misc/session';
import NoPermissionsPage from '../../../noPermissionsPage';
import { WorkflowsProvider } from '../workflowEditionPage/context/workflowsContext';
import { WorkflowsFilters } from './components/workflowsFilters';
import WorkflowsList from './components/workflowsList';
import styles from './workflowsPage.module.css';

const WorkflowsPage = () => {
  const { isSmallDesktop } = useMediaQuery();
  const { toggle } = useSidebar();
  const [searchValue, setSearchValue] = useState('');
  const { history } = useRouter();
  const roleManager = SessionManagerFactory().getRoleManager();
  const [showDisabled, setShowDisabled] = useState(false);
  const [isAllDisabled, setIsAllDisabled] = useState(false);

  const manageClick = () => {
    toggle();
    mixpanel.track(MIXPANEL_EVENTS.CONFIGURE_NEW_WORKFLOW);
    history.push(`${APP_PLAYBOOK_MESSAGING_WORKFLOWS}/edit`);
  };

  if (!roleManager.isAccountAdmin()) {
    return <NoPermissionsPage />;
  }
  return (
    <AccountSettingsLayout
      title="Workflows"
      actionChildren={
        <Button
          variant="clear"
          iconLeft="playOutline"
          uppercase={false}
          color="purple"
          onClick={() => {
            window.open('https://youtu.be/B6ueIzQloz4', '_blank');
          }}
        >
          Guide to understand workflows
        </Button>
      }
      subtitle={undefined}
    >
      <AccountSettingsTab>
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="zap" color="purple">
              <div className={styles._title_container}>Workflows</div>
            </AccountSettingsTabTitle>
            <AccountSettingsTabSubtitle>
              Automate your repetitive processes with Workflows, which are a set of triggers that
              run based on specific criteria.
            </AccountSettingsTabSubtitle>
          </AccountSettingsTabHeaderLeft>
          <AccountSettingsTabHeaderRight>
            <ShowDisableCheckbox
              showDisabled={showDisabled}
              setShowDisabled={setShowDisabled}
              isAllDisabled={isAllDisabled}
            />
            <SearchInput
              width="200"
              placeholder="Search"
              onChange={value => setSearchValue(value)}
            />
            <Button iconLeft="plus" onClick={manageClick} color="purple">
              {!isSmallDesktop && 'CONFIGURE A NEW workflow'}
            </Button>
          </AccountSettingsTabHeaderRight>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <WorkflowsProvider>
            <WorkflowsFilters />
            <AccountSettingsTableContainer>
              <WorkflowsList
                searchValue={searchValue}
                showDisabled={showDisabled}
                setShowDisabled={setShowDisabled}
                setIsAllDisabled={setIsAllDisabled}
              />
            </AccountSettingsTableContainer>
          </WorkflowsProvider>
        </AccountSettingsTabContent>
      </AccountSettingsTab>
    </AccountSettingsLayout>
  );
};

export default WorkflowsPage;
