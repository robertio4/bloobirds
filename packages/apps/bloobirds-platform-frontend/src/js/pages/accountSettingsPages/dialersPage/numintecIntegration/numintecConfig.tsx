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
import styles from './numintec.module.css';

const UserRow = ({
  numintecUser,
  userList,
  numintecUsers,
}: {
  numintecUser: RawEntity;
  userList: RawEntity[];
  numintecUsers: RawEntity[];
}) => {
  const { save } = useUserHelpers();
  const { createToast } = useToasts();
  const { t } = useTranslation();

  const updateNumintecUser = (userId: any) => {
    if (userId && numintecUsers?.find(u => u.bloobirdsUser === userId)) {
      createToast({
        message: t('accountSettings.dialers.numintec.errorMappingSameUser'),
        type: 'error',
      });
    } else {
      api
        .patch(`/calls/numintec/sync/${numintecUser?.id}/associateTo/${userId}`, {})
        .then(() => forceSelectedEntitiesCacheRefresh(['numintecUsers']));
      save(UserHelperKeys.CHOOSE_DIALER);
    }
  };

  return (
    <TableRow>
      <TableCell>{numintecUser?.numintecName}</TableCell>
      <TableCell>{numintecUser?.extension}</TableCell>
      <TableCell>
        <Select
          placeholder={t('accountSettings.dialers.numintec.bloobirdsUser')}
          size="small"
          borderless={false}
          width="200px"
          onChange={updateNumintecUser}
          value={numintecUser?.bloobirdsUser}
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

export const NumintecConfig = () => {
  const numintecToken = useEntity('numintecTokens')?.all()[0];
  const numintecUsers = useEntity('numintecUsers')?.all();
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
    api.post('/calls/numintec/sync/resync');
  };

  const handleFinishRefreshingUsers = () => {
    forceSelectedEntitiesCacheRefresh(['numintecUsers']);
    setIsRefreshingUsers(false);
  };

  const handleDeleteIntegration = () => {
    setIsDeleting(true);
    api.delete('/calls/numintec/sync').then(() => {
      setIsDeleting(false);
      reloadUserSettings();
    });
  };

  return (
    <div className={styles._config__container}>
      <AccountSettingsTab title={t('accountSettings.dialers.numintec.title')} icon="person">
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="person">
              {t('accountSettings.dialers.numintec.account')}
            </AccountSettingsTabTitle>
          </AccountSettingsTabHeaderLeft>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <div className={styles._config__account}>
            <Text className={styles._config__account_name} size="m" color="softPeanut">
              {t('accountSettings.dialers.numintec.integrationName')}
            </Text>
            <Text className={styles._config__account_status_text} size="s" color="softPeanut">
              {t('accountSettings.dialers.numintec.status.status', {
                status: numintecToken
                  ? t('accountSettings.dialers.numintec.status.active')
                  : t('accountSettings.dialers.numintec.status.inactive'),
              })}
            </Text>
            <Button variant="tertiary" color="tomato" onClick={() => setDeleteModalOpen(true)}>
              {t('accountSettings.dialers.numintec.delete')}
            </Button>
          </div>
        </AccountSettingsTabContent>
      </AccountSettingsTab>
      <AccountSettingsTab>
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="person">
              <div className={styles._users_title}>
                {t('accountSettings.dialers.numintec.users')}
                <Tooltip title={t('accountSettings.dialers.numintec.usersHint')} position="top">
                  <Icon name="info" size={15} className={styles._info__icon} />
                </Tooltip>
                <Button
                  variant="secondary"
                  iconLeft="refresh"
                  size="small"
                  className={styles._refresh__button}
                  onClick={refreshUsers}
                >
                  {t('accountSettings.dialers.numintec.refresh')}
                </Button>
              </div>
              <Snackbar
                variant="actions"
                position="bottom"
                visible={isRefreshingUsers}
                onClose={handleFinishRefreshingUsers}
              >
                <Text size="s" color="white">
                  {t('accountSettings.dialers.numintec.refreshing')}
                </Text>
              </Snackbar>
            </AccountSettingsTabTitle>
            <AccountSettingsTabSubtitle>
              {t('accountSettings.dialers.numintec.map')}
            </AccountSettingsTabSubtitle>
          </AccountSettingsTabHeaderLeft>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <AccountSettingsTableContainer>
            <Table>
              <TableHead>
                <TableCell>{t('accountSettings.dialers.numintec.numintecUserName')}</TableCell>
                <TableCell>{t('accountSettings.dialers.numintec.numintecUserExtension')}</TableCell>
                <TableCell>{t('accountSettings.dialers.numintec.bloobirdsUser')}</TableCell>
              </TableHead>
              <TableBody>
                {numintecUsers
                  ?.sort((a: any, b: any) => {
                    if (a?.externalUserName < b?.externalUserName) {
                      return -1;
                    }
                    if (a?.externalUserName > b?.externalUserName) {
                      return 1;
                    }
                    return 0;
                  })
                  .map(numintecUser => (
                    <UserRow
                      key={numintecUser?.id}
                      numintecUser={numintecUser}
                      userList={userList}
                      numintecUsers={numintecUsers}
                    />
                  ))}
              </TableBody>
            </Table>
          </AccountSettingsTableContainer>
        </AccountSettingsTabContent>
        {deleteModalOpen && (
          <ConfirmDeleteModalLayout
            assetLabel="Numintec integration"
            handleDelete={handleDeleteIntegration}
            handleClose={() => setDeleteModalOpen(false)}
            isDeleting={isDeleting}
          >
            {t('accountSettings.dialers.numintec.deleteAsssurance')}
          </ConfirmDeleteModalLayout>
        )}
      </AccountSettingsTab>
    </div>
  );
};
