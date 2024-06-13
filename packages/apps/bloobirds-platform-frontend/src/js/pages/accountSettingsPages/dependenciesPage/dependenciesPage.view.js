import React from 'react';

import { Dropdown, Icon, Item, Tab, TabGroup, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { useIsOTOAccount } from '@bloobirds-it/hooks';

import { useBobjectFormVisibility } from '../../../hooks';
import { useFullSalesEnabled } from '../../../hooks/useFeatureFlags';
import AccountSettingsLayout from '../../../layouts/accountSettingsLayout';
import NoPermissionsPage from '../../noPermissionsPage';
import styles from './dependenciesPage.module.css';
import DependenciesSettings from './dependenciesSettings/dependenciesSettings';

const DependenciesPage = () => {
  const { ref, visible, setVisible } = useVisible(false);
  const { openDemoMode } = useBobjectFormVisibility();
  const isSalesEnabled = useFullSalesEnabled();
  const isOTOAccount = useIsOTOAccount();

  const handleOpenBobjectFormDemo = bobjectType => {
    setVisible(false);
    openDemoMode({ bobjectType });
  };

  if (isOTOAccount) {
    return <NoPermissionsPage />;
  }

  return (
    <AccountSettingsLayout
      title="Dependencies"
      actionChildren={
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
                Test your dependencies
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
      }
      subtitle="Configure your layouts by editing the visibility of your fields."
    >
      <TabGroup>
        <Tab name="Field value dependencies">
          <DependenciesSettings isValueDependency />
        </Tab>
        <Tab name="Field dependencies">
          <DependenciesSettings isValueDependency={false} />
        </Tab>
      </TabGroup>
    </AccountSettingsLayout>
  );
};

export default DependenciesPage;
