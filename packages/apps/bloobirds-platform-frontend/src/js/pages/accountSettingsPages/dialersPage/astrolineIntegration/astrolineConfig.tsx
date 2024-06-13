import React, { useState } from 'react';

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
import { mutate } from 'swr';

import { useUserSettingsReload } from '../../../../components/userPermissions/hooks';
import { useEntity } from '../../../../hooks';
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
import { RestApi } from '../../../../misc/api/rest';
import styles from './astroline.module.css';

const UserRow = ({
  astrolineUser,
  userList,
  astrolineUsers,
}: {
  astrolineUser: RawEntity;
  userList: RawEntity[];
  astrolineUsers: RawEntity[];
}) => {
  const { save } = useUserHelpers();
  const { createToast } = useToasts();

  const updateAstrolineUser = (userId: any) => {
    if (astrolineUsers?.find(u => u.bloobirdsUser === userId)) {
      createToast({
        message: 'You cannot relate the same user to 2 Astroline users',
        type: 'error',
      });
    } else {
      RestApi.patch({
        entity: 'externalGenericUsers',
        id: astrolineUser?.id,
        body: {
          bloobirdsUser: `/users/${userId}`,
        },
      }).then(() => mutate('/entity/externalGenericUsers'));
      save(UserHelperKeys.CHOOSE_DIALER);
    }
  };

  return (
    <TableRow>
      <TableCell>{astrolineUser?.externalUserName}</TableCell>
      <TableCell>{astrolineUser?.externalUserEmail}</TableCell>
      <TableCell>
        <Select
          placeholder="Bloobirds user"
          size="small"
          borderless={false}
          width="200px"
          onChange={updateAstrolineUser}
          value={astrolineUser?.bloobirdsUser}
        >
          {userList &&
            userList.map(user => (
              <Item key={user?.id} dataTest={user?.value} value={user?.id}>
                {user?.value}
              </Item>
            ))}
        </Select>
      </TableCell>
    </TableRow>
  );
};

export const AstrolineConfig = () => {
  const astrolineToken = useEntity('astrolineTokens')?.all()[0];
  const astrolineUsers = useEntity('externalGenericUsers')
    ?.all()
    ?.filter(u => u?.userType === 'ASTROLINE');
  const bobjectGlobalPicklist = useEntity('bobjectGlobalPicklists');
  const userGlobalPicklist = bobjectGlobalPicklist?.findByLogicRole('USER');
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const userList = bobjectPicklistFieldValues
    ?.filterBy('bobjectGlobalPicklist', userGlobalPicklist?.id)
    ?.filter((user: any) => user?.enabled);
  const [isRefreshingUsers, setIsRefreshingUsers] = useState<boolean>();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>();
  const [isDeleting, setIsDeleting] = useState<boolean>();
  const reloadUserSettings = useUserSettingsReload();

  const refreshUsers = () => {
    setIsRefreshingUsers(true);
    api.post('/calls/astroline/sync/users');
  };

  const handleFinishRefreshingUsers = () => {
    mutate('/entity/externalGenericUsers');
    setIsRefreshingUsers(false);
  };

  const handleDeleteIntegration = () => {
    setIsDeleting(true);
    api.delete('/calls/astroline/sync').then(() => {
      setIsDeleting(false);
      reloadUserSettings();
    });
  };

  return (
    <div className={styles._config__container}>
      <AccountSettingsTab title="Astroline integration" icon="person">
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="person">Astroline account</AccountSettingsTabTitle>
          </AccountSettingsTabHeaderLeft>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <div className={styles._config__account}>
            <Text className={styles._config__account_name} size="m" color="softPeanut">
              Bloobirds production
            </Text>
            <Text className={styles._config__account_status_text} size="s" color="softPeanut">
              Your integration is currently {astrolineToken ? 'active' : 'inactive'}
            </Text>
            <Button variant="tertiary" color="tomato" onClick={() => setDeleteModalOpen(true)}>
              Delete
            </Button>
          </div>
        </AccountSettingsTabContent>
      </AccountSettingsTab>
      <AccountSettingsTab>
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="person">
              <div className={styles._users_title}>
                Astroline Users
                <Tooltip
                  title="Astroline users are automatically synced each time they are deleted or created. If you are not seeing some of them, you can try to refresh them!"
                  position="top"
                >
                  <Icon name="info" size={15} className={styles._info__icon} />
                </Tooltip>
                <Button
                  variant="secondary"
                  iconLeft="refresh"
                  size="small"
                  className={styles._refresh__button}
                  onClick={refreshUsers}
                >
                  REFRESH
                </Button>
              </div>
              <Snackbar
                variant="actions"
                position="bottom"
                visible={isRefreshingUsers}
                onClose={handleFinishRefreshingUsers}
              >
                <Text size="s" color="white">
                  Refreshing users...
                </Text>
              </Snackbar>
            </AccountSettingsTabTitle>
            <AccountSettingsTabSubtitle>
              Match your Bloobirds Users with the Astroline users to match calls between systems.
            </AccountSettingsTabSubtitle>
          </AccountSettingsTabHeaderLeft>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <AccountSettingsTableContainer>
            <Table>
              <TableHead>
                <TableCell>Astroline User Name</TableCell>
                <TableCell>Astroline User Email</TableCell>
                <TableCell>Bloobirds User</TableCell>
              </TableHead>
              <TableBody>
                {astrolineUsers
                  ?.sort((a: any, b: any) => {
                    if (a?.externalUserName < b?.externalUserName) {
                      return -1;
                    }
                    if (a?.externalUserName > b?.externalUserName) {
                      return 1;
                    }
                    return 0;
                  })
                  .map(astrolineUser => (
                    <UserRow
                      key={astrolineUser?.id}
                      astrolineUser={astrolineUser}
                      userList={userList}
                      astrolineUsers={astrolineUsers}
                    />
                  ))}
              </TableBody>
            </Table>
          </AccountSettingsTableContainer>
        </AccountSettingsTabContent>
        {deleteModalOpen && (
          <ConfirmDeleteModalLayout
            assetLabel="Astroline integration"
            handleDelete={handleDeleteIntegration}
            handleClose={() => setDeleteModalOpen(false)}
            isDeleting={isDeleting}
          >
            Are you sure you want to delete your Astroline integration?
          </ConfirmDeleteModalLayout>
        )}
      </AccountSettingsTab>
    </div>
  );
};
