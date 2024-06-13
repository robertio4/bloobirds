import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Icon,
  Item,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
  Tooltip,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';

import { useUserSettingsReload } from '../../../../components/userPermissions/hooks';
import { useEntity } from '../../../../hooks';
import { forceSelectedEntitiesCacheRefresh } from '../../../../hooks/entities/useEntity.utils';
import { RawEntity } from '../../../../hooks/entities/useEntityTypes';
import { useUserHelpers } from '../../../../hooks/useUserHelpers';
import AccountSettingsTab from '../../../../layouts/accountSettingsLayout/accountSettingsTab';
import {
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTableContainer,
  AccountSettingsTabSubtitle,
  AccountSettingsTabTitle,
} from '../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import { ConfirmDeleteModalLayout } from '../../../../layouts/confirmDeleteModalLayout/confirmDeleteModalLayout';
import styles from './ringover.module.css';

const UserRow = ({
  ringoverUser,
  userList,
  ringoverUsers,
}: {
  ringoverUser: RawEntity;
  userList: RawEntity[];
  ringoverUsers: RawEntity[];
}) => {
  const { save } = useUserHelpers();
  const { createToast } = useToasts();
  const { t } = useTranslation();

  const updateRingoverUser = (userId: any) => {
    if (userId && ringoverUsers?.find(u => u.bloobirdsUser === userId)) {
      createToast({
        message: t('accountSettings.dialers.ringover.errorMappingSameUser'),
        type: 'error',
      });
    } else {
      api.patch(`/calls/ringover/sync/${ringoverUser?.id}/associate/${userId}`, {}).then(data => {
        forceSelectedEntitiesCacheRefresh(['ringoverUsers']);
      });
      save(UserHelperKeys.CHOOSE_DIALER);
    }
  };

  return (
    <TableRow>
      <TableCell>{ringoverUser?.ringoverName}</TableCell>
      <TableCell>
        <Select
          placeholder={t('accountSettings.dialers.ringover.bloobirdsUser')}
          size="small"
          borderless={false}
          width="200px"
          onChange={updateRingoverUser}
          value={ringoverUser?.bloobirdsUser}
          autocomplete={userList?.length > 8}
        >
          <Item value={null}> </Item>
          {userList &&
            userList.map(user => (
              <Item key={user?.id} dataTest={user?.name} value={user?.id} label={user?.name}>
                {user?.name}
              </Item>
            ))}
        </Select>
      </TableCell>
    </TableRow>
  );
};

export const RingoverConfig = () => {
  const ringoverToken = useEntity('ringoverTokens')?.all()[0];
  const ringoverUsers = useEntity('ringoverUsers')?.all();
  const allUsers = useEntity('users')?.all();
  const userList = allUsers
    ?.filter((user: any) => user?.active || user?.invitationStatus == 'INVITATION_SENT')
    ?.sort((a, b) => a?.name?.localeCompare(b?.name));
  const [isRefreshingUsers, setIsRefreshingUsers] = useState<boolean>();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>();
  const [isDeleting, setIsDeleting] = useState<boolean>();
  const reloadUserSettings = useUserSettingsReload();
  const { t } = useTranslation();

  const refreshUsers = () => {
    setIsRefreshingUsers(true);
    api.get('/calls/ringover/sync/resync').then(() => {
      forceSelectedEntitiesCacheRefresh(['ringoverUsers']);
    });
  };

  const handleFinishRefreshingUsers = () => {
    forceSelectedEntitiesCacheRefresh(['ringoverUsers']);
    setIsRefreshingUsers(false);
  };

  const handleDeleteIntegration = () => {
    setIsDeleting(true);
    api.delete('/calls/ringover/sync').then(() => {
      setIsDeleting(false);
      reloadUserSettings();
    });
  };

  return (
    <div className={styles._config__container}>
      <AccountSettingsTab title={t('accountSettings.dialers.ringover.title')} icon="person">
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="person">
              {t('accountSettings.dialers.ringover.account')}
            </AccountSettingsTabTitle>
          </AccountSettingsTabHeaderLeft>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <div className={styles._config__account}>
            <Text className={styles._config__account_name} size="m" color="softPeanut">
              {t('accountSettings.dialers.ringover.integrationName')}
            </Text>
            <Text className={styles._config__account_status_text} size="s" color="softPeanut">
              {t('accountSettings.dialers.ringover.status.status', {
                status: ringoverToken
                  ? t('accountSettings.dialers.ringover.status.active')
                  : t('accountSettings.dialers.ringover.status.inactive'),
              })}
            </Text>
            <Button variant="tertiary" color="tomato" onClick={() => setDeleteModalOpen(true)}>
              {t('accountSettings.dialers.ringover.delete')}
            </Button>
          </div>
        </AccountSettingsTabContent>
      </AccountSettingsTab>
      <AccountSettingsTab>
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="person">
              <div className={styles._users_title}>
                {t('accountSettings.dialers.ringover.users')}
                <Tooltip title={t('accountSettings.dialers.ringover.usersHint')} position="top">
                  <Icon name="info" size={15} className={styles._info__icon} />
                </Tooltip>
                <Button
                  variant="secondary"
                  iconLeft="refresh"
                  size="small"
                  className={styles._refresh__button}
                  onClick={refreshUsers}
                >
                  {t('accountSettings.dialers.ringover.refresh')}
                </Button>
              </div>
              <Snackbar
                variant="actions"
                position="bottom"
                visible={isRefreshingUsers}
                onClose={handleFinishRefreshingUsers}
              >
                <Text size="s" color="white">
                  {t('accountSettings.dialers.ringover.refreshing')}
                </Text>
              </Snackbar>
            </AccountSettingsTabTitle>
            <AccountSettingsTabSubtitle>
              {t('accountSettings.dialers.ringover.map')}
            </AccountSettingsTabSubtitle>
          </AccountSettingsTabHeaderLeft>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <AccountSettingsTableContainer>
            <Table>
              <TableHead>
                <TableCell>{t('accountSettings.dialers.ringover.ringoverUserName')}</TableCell>
                <TableCell>{t('accountSettings.dialers.ringover.bloobirdsUser')}</TableCell>
              </TableHead>
              <TableBody>
                {ringoverUsers
                  ?.sort((a: any, b: any) => {
                    if (a?.externalUserName < b?.externalUserName) {
                      return -1;
                    }
                    if (a?.externalUserName > b?.externalUserName) {
                      return 1;
                    }
                    return 0;
                  })
                  .map(ringoverUser => (
                    <UserRow
                      key={ringoverUser?.id}
                      ringoverUser={ringoverUser}
                      userList={userList}
                      ringoverUsers={ringoverUsers}
                    />
                  ))}
              </TableBody>
            </Table>
          </AccountSettingsTableContainer>
        </AccountSettingsTabContent>
        {deleteModalOpen && (
          <ConfirmDeleteModalLayout
            assetLabel="Ringover integration"
            handleDelete={handleDeleteIntegration}
            handleClose={() => setDeleteModalOpen(false)}
            isDeleting={isDeleting}
          >
            {t('accountSettings.dialers.ringover.deleteAsssurance')}
          </ConfirmDeleteModalLayout>
        )}
      </AccountSettingsTab>
    </div>
  );
};
