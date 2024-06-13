import React, { useCallback } from 'react';

import { Dropdown, Icon, Item, Tab, TabGroup, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { useIsOTOAccount } from '@bloobirds-it/hooks';

import {
  APP_ACCOUNT_FIELDS,
  APP_ACCOUNT_GLOBAL_PICKLISTS,
  APP_ACCOUNT_GROUPS,
} from '../../../app/_constants/routes';
import { PreviewFormsTooltip } from '../../../components/discoveryTooltips/fieldsTourTooltips/previewFormsTooltip';
import { useBobjectFormVisibility, useRouter } from '../../../hooks';
import { useFullSalesEnabled } from '../../../hooks/useFeatureFlags';
import { useIsAccountAdmin } from '../../../hooks/usePermissions';
import AccountSettingsLayout from '../../../layouts/accountSettingsLayout';
import NoPermissionsPage from '../../noPermissionsPage';
import FieldsTab from './pages/fieldsTab/fieldsTab';
import GlobalPicklistTab from './pages/globalPicklistsTab/globalPicklistsTab';
import GroupsTab from './pages/groupsTab/groupsTab';
import styles from './styles/fieldsPage.module.css';

const ROUTES = {
  'Global Picklists': APP_ACCOUNT_GLOBAL_PICKLISTS,
  Fields: APP_ACCOUNT_FIELDS,
  Groups: APP_ACCOUNT_GROUPS,
};

export const FieldsPage = ({ tab }) => {
  const isAccountAdmin = useIsAccountAdmin();
  const { ref, visible, setVisible } = useVisible(false);
  const { openDemoMode } = useBobjectFormVisibility();
  const isSalesEnabled = useFullSalesEnabled();
  const isOTOAccount = useIsOTOAccount();
  const handleOpenBobjectFormDemo = bobjectType => {
    setVisible(false);
    openDemoMode({ bobjectType });
  };

  const { history } = useRouter();
  const changeTab = useCallback(
    newTab => {
      const route = ROUTES[newTab] || APP_ACCOUNT_FIELDS;
      history.push(`${route}`);
    },
    [history],
  );
  if (!isAccountAdmin) {
    return <NoPermissionsPage />;
  }

  return (
    <AccountSettingsLayout
      title="Fields"
      actionChildren={
        !isOTOAccount && (
          <>
            <Dropdown
              ref={ref}
              anchor={
                <span
                  onClick={() => {
                    setVisible(true);
                  }}
                  className={styles._action__container}
                >
                  <Icon name="playOutline" color="bloobirds" size={16} />
                  <Text htmlTag="span" size="s" color="bloobirds" className={styles._action__text}>
                    Test your layouts
                  </Text>
                </span>
              }
              visible={visible}
            >
              <Item onClick={() => handleOpenBobjectFormDemo('Company')}>Company</Item>
              <Item onClick={() => handleOpenBobjectFormDemo('Lead')}>Lead</Item>
              <Item onClick={() => handleOpenBobjectFormDemo('Activity')}>Activity</Item>
              <Item onClick={() => handleOpenBobjectFormDemo('Task')}>Task</Item>
              {isSalesEnabled && (
                <Item onClick={() => handleOpenBobjectFormDemo('Opportunity')}>Opportunity</Item>
              )}
            </Dropdown>
            <PreviewFormsTooltip />
          </>
        )
      }
    >
      <TabGroup value={tab} onClick={changeTab}>
        <Tab name="Fields">
          <FieldsTab />
        </Tab>
        <Tab name="Global Picklists">
          <GlobalPicklistTab />
        </Tab>
        <Tab name="Groups">
          <GroupsTab />
        </Tab>
      </TabGroup>
    </AccountSettingsLayout>
  );
};
