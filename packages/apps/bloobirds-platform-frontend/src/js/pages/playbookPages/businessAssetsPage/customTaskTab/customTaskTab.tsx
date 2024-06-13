import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox } from '@bloobirds-it/flamingo-ui';
import { useCustomTasks } from '@bloobirds-it/hooks';

import AccountSettingsTab, {
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTableContainer,
  AccountSettingsTabSubtitle,
  AccountSettingsTabTitle,
} from '../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import styles from '../businessAssetsPage.module.css';
import { CustomTasksList } from './customTasksList/customTasksList';
import { useCustomTaskCreation } from './hooks/useCustomTaskCreation';

const CustomTaskTab = () => {
  const { showDisabled, setShowDisabled, customTasks, mutate } = useCustomTasks({
    disabled: true,
  });
  const { setCustomTaskCreation } = useCustomTaskCreation();
  const { t } = useTranslation();

  return (
    <AccountSettingsTab>
      <AccountSettingsTabHeader>
        <AccountSettingsTabHeaderLeft>
          <AccountSettingsTabTitle icon="kanban" color="lightPurple">
            <div className={styles._business_asset_title}>
              {t('playbook.customTasks.taskTypes')}
            </div>
          </AccountSettingsTabTitle>
          <AccountSettingsTabSubtitle>
            {t('playbook.customTasks.taskTypesSubtitle')}
          </AccountSettingsTabSubtitle>
        </AccountSettingsTabHeaderLeft>
        <AccountSettingsTabHeaderRight>
          <div className={styles.actions}>
            <Checkbox
              onClick={value => setShowDisabled(value)}
              checked={showDisabled}
              color="purple"
              size="small"
            >
              {t('playbook.customTasks.showDisabled')}
            </Checkbox>
            <Button iconLeft="plus" onClick={() => setCustomTaskCreation(true)} color="purple">
              {t('playbook.customTasks.addCustom')}
            </Button>
          </div>
        </AccountSettingsTabHeaderRight>
      </AccountSettingsTabHeader>
      <AccountSettingsTabContent>
        <AccountSettingsTableContainer>
          <CustomTasksList customTasks={customTasks} mutate={mutate} />
        </AccountSettingsTableContainer>
      </AccountSettingsTabContent>
    </AccountSettingsTab>
  );
};

export default CustomTaskTab;
