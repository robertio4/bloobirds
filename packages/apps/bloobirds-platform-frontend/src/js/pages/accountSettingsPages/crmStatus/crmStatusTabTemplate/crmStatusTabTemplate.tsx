import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, IconButton, Text } from '@bloobirds-it/flamingo-ui';

import AccountSettingsTab from '../../../../layouts/accountSettingsLayout/accountSettingsTab';
import {
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTableContainer,
  AccountSettingsTabTitle,
} from '../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import AddCrmStatusFieldModal, {
  useCrmStatusFieldModal,
} from '../addCrmStatusFieldModal/addCrmStatusFieldModal';
import { CrmStatusList } from '../crmStatusList/crmStatusList';
import { CrmStatusResponse } from '../types/crmStatusTypes';
import styles from './crmStatusTabTemplate.module.css';

const CrmStatusTabTemplate = ({
  crmObject,
  crmStatus,
  mutateList,
}: {
  crmObject: string;
  crmStatus: CrmStatusResponse;
  mutateList: () => void;
}) => {
  const { openCrmStatusFieldModal, isOpen, closeModal } = useCrmStatusFieldModal();
  const { t } = useTranslation('translation', { keyPrefix: 'accountSettings.crmStatus' });

  return (
    <AccountSettingsTab>
      <AccountSettingsTabHeader>
        <AccountSettingsTabHeaderLeft>
          <AccountSettingsTabTitle icon="company">
            {t('tabTitle', { crmObject: crmObject })}
            <Button
              variant="secondary"
              iconLeft="refresh"
              size="small"
              className={styles._refresh__button}
              onClick={() => mutateList()}
              uppercase={true}
            >
              {t('resync')}
            </Button>
          </AccountSettingsTabTitle>
        </AccountSettingsTabHeaderLeft>
        <AccountSettingsTabHeaderRight>
          <div className={styles._field_selector}>
            {crmStatus && crmStatus.crmField ? (
              <>
                <Text size="m" color="softPeanut">
                  {t('salesforceStatusField') + crmStatus.crmField}
                </Text>
                <IconButton
                  name="edit"
                  size={24}
                  onClick={() => {
                    openCrmStatusFieldModal(crmStatus);
                  }}
                  className={styles._editStatusField}
                />
              </>
            ) : (
              <>
                <Text size="m" color="softPeanut">
                  {t('noStatusSelected')}
                </Text>
                <IconButton
                  name="add"
                  size={24}
                  onClick={() => {
                    openCrmStatusFieldModal(crmStatus);
                  }}
                />
              </>
            )}
          </div>
        </AccountSettingsTabHeaderRight>
      </AccountSettingsTabHeader>
      <AccountSettingsTabContent>
        <AccountSettingsTableContainer>
          <CrmStatusList crmStatus={crmStatus} mutateList={mutateList} />
        </AccountSettingsTableContainer>
      </AccountSettingsTabContent>
      {isOpen && <AddCrmStatusFieldModal open onClose={closeModal} mutateList={mutateList} />}
    </AccountSettingsTab>
  );
};

export default CrmStatusTabTemplate;
