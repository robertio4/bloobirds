import React, { useCallback } from 'react';

import { Button, ColorType, IconType, Tab, TabGroup } from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings } from '@bloobirds-it/hooks';
import { UserPermission } from '@bloobirds-it/types';

import {
  APP_PLAYBOOK_BUYER_PERSONAS,
  APP_PLAYBOOK_CADENCES,
  APP_PLAYBOOK_CUSTOM_TASKS,
  APP_PLAYBOOK_SCENARIOS,
  APP_PLAYBOOK_TARGET_MARKET,
} from '../../../app/_constants/routes';
import { useRouter } from '../../../hooks';
import { useNewCadenceTableEnabled } from '../../../hooks/useFeatureFlags';
import { useIsAccountAdmin } from '../../../hooks/usePermissions';
import AccountSettingsLayout from '../../../layouts/accountSettingsLayout';
import NoPermissionsPage from '../../noPermissionsPage';
import BuyerPersonaTab from './buyerPersonaTab/buyerPersonaTab';
import CustomTaskTab from './customTaskTab/customTaskTab';
import ScenarioTab from './scenarioTab/scenarioTab';
import TargetMarketTab from './targetMarketTab/targetMarketTab';
import {useTranslation} from "react-i18next";

const BusinessAssetsPage = ({ tab }: { tab: string }) => {
  const isAccountAdmin = useIsAccountAdmin();
  const { settings } = useActiveUserSettings();
  const hasNewCadenceTableFlag = useNewCadenceTableEnabled();
  const canViewCadences = settings?.user?.permissions.includes(UserPermission.VIEW_CADENCES);
  const canCreateCustomTask = settings?.user?.permissions.includes(UserPermission.CUSTOM_TASK);
  const canViewCustomTaskTab = canCreateCustomTask && hasNewCadenceTableFlag;
  const { history } = useRouter();
  const { t } = useTranslation();

  const tabs = {

  }

  const changeTab = useCallback(
    newTab => {
      let route = '';
      switch (newTab) {
        case 'Target markets':
          route = APP_PLAYBOOK_TARGET_MARKET;
          break;
        case 'Buyer personas (ICP)':
          route = APP_PLAYBOOK_BUYER_PERSONAS;
          break;
        case 'Scenarios':
          route = APP_PLAYBOOK_SCENARIOS;
          break;
        case 'Custom Tasks':
          route = APP_PLAYBOOK_CUSTOM_TASKS;
          break;
        default:
          route = APP_PLAYBOOK_TARGET_MARKET;
      }
      history.push(`${route}`);
    },
    [history],
  );

  const tabsToDisplay: {
    dataTest: string;
    iconLeft: IconType;
    name: string;
    color: ColorType;
    tab: JSX.Element;
  }[] = [
    {
      dataTest: 'playbookTargetMarketTab',
      iconLeft: 'company',
      name: 'Target markets',
      color: 'purple',
      tab: <TargetMarketTab />,
    },
    {
      dataTest: 'playbookBuyerPersonaTab',
      iconLeft: 'person',
      name: 'Buyer personas (ICP)',
      color: 'purple',
      tab: <BuyerPersonaTab />,
    },
    {
      dataTest: 'playbookScenarioTab',
      iconLeft: 'compass',
      name: 'Scenarios',
      color: 'purple',
      tab: <ScenarioTab />,
    },
    canViewCustomTaskTab && {
      dataTest: 'playbookCustomTasksTab',
      iconLeft: 'taskAction',
      name: 'Custom Tasks',
      color: 'purple',
      tab: <CustomTaskTab />,
    },
  ];

  if (!isAccountAdmin && (!canViewCadences || !canViewCustomTaskTab)) {
    return <NoPermissionsPage />;
  }

  const noAdminTabs: {
    dataTest: string;
    iconLeft: IconType;
    name: string;
    color: ColorType;
    tab: JSX.Element;
  }[] = [
    canViewCustomTaskTab && {
      dataTest: 'playbookCustomTasksTab',
      iconLeft: 'taskAction',
      name: 'Custom Tasks',
      color: 'purple',
      tab: <CustomTaskTab />,
    },
  ];

  return (
    <AccountSettingsLayout
      title={t('playbook.title')}
      subtitle={t('playbook.subtitle')}
      actionChildren={
        <div style={{ marginLeft: 12 }}>
          <Button
            variant="clear"
            iconLeft="questionCircle"
            uppercase={false}
            onClick={() => window.open('https://youtu.be/QzrF_9OA_2k', '_blank')}
            color="purple"
          >
            {t('playbook.guideTitle')}
          </Button>
        </div>
      }
    >
      {isAccountAdmin && (
        <TabGroup value={tab} onClick={changeTab}>
          {tabsToDisplay.filter(Boolean).map(({ dataTest, name, iconLeft, color, tab }, idx) => {
            return (
              <Tab
                key={name + '-' + idx}
                name={name}
                color={color}
                dataTest={dataTest}
                iconLeft={iconLeft}
              >
                {tab}
              </Tab>
            );
          })}
        </TabGroup>
      )}
      {!isAccountAdmin && (
        <TabGroup value={tab} onClick={changeTab}>
          {noAdminTabs.filter(Boolean).map(({ dataTest, name, iconLeft, color, tab }, idx) => (
            <Tab
              key={name + '-' + idx}
              name={name}
              color={color}
              dataTest={dataTest}
              iconLeft={iconLeft}
            >
              {tab}
            </Tab>
          ))}
        </TabGroup>
      )}
    </AccountSettingsLayout>
  );
};

export default BusinessAssetsPage;
