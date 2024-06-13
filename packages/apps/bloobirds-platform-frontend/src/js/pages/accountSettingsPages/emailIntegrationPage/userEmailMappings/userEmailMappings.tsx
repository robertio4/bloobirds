import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  CheckItem,
  Input,
  MultiSelect,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
  useHover,
} from '@bloobirds-it/flamingo-ui';
import { useEmailConnections, useEmailIntegrationMode } from '@bloobirds-it/hooks';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

import { SearchLogs } from '../../../../../assets/svg';
import DisconnectModal from '../../../../components/connectionCard/disconnectModal';
import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { useEntity } from '../../../../hooks';
import { AccountSettingsTableContainer } from '../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import SessionManagerFactory from '../../../../misc/session';
import { UserObject } from '../../../../typings/user';
import NoPermissionsPage from '../../../noPermissionsPage';
import styles from './userEmailMappings.module.css';

async function createEmailUserConnection(user, emailConnection) {
  // Send the user to the backend
  await api.post('/utils/nylas/addUserToEmailAccount', {
    mapConnection: {
      emailAccountId: emailConnection.id,
      userId: user,
    },
  });
}

async function deleteEmailUserConnection(user, emailConnection) {
  // Send the user to the backend
  await api.post('/utils/nylas/removeUserFromEmailAccount', {
    mapConnection: {
      emailAccountId: emailConnection.id,
      userId: user,
    },
  });
}

async function updateAccountName(accountName: string, emailAccountId: string) {
  await api.patch('/utils/nylas/updateAccountName', {
    emailAccountId,
    accountName,
  });
}

interface EmailConnectionsRowProp {
  emailConnection: {
    email: string;
    id: string;
    provider: string;
    users: UserObject[];
    syncState: string;
    accountName: string;
  };
  userList: UserObject[];
  showId?: boolean;
  setDisconnectModalData: any;
}

export function EmailConnectionsRow({
  emailConnection,
  userList,
  showId = false,
  setDisconnectModalData,
}: EmailConnectionsRowProp) {
  const { email, id, provider, users, syncState, accountName } = emailConnection;
  const isStopped = syncState === 'stopped' || syncState === 'invalid';
  const [selectedUsers, setSelectedUsers] = useState(users.map(user => user.id));
  const [ref, isHover] = useHover();
  const { t } = useTranslation();
  const [isEdition, setIsEdition] = useState<boolean>(false);
  const [accountNameInput, setAccountNameInput] = useState<string>(accountName);

  function updateUsers(newUsers: string[]) {
    // Check if a user was added or removed
    const addedUser = newUsers.filter(user => !selectedUsers.includes(user));
    const removedUser = selectedUsers.filter(user => !newUsers.includes(user));

    // If a user was added, add it to the list
    if (addedUser.length > 0) {
      setSelectedUsers([...selectedUsers, addedUser[0]]);
      // Send the new user to the backend
      createEmailUserConnection(addedUser[0], emailConnection);
    }

    // If a user was removed, remove it from the list
    if (removedUser.length > 0) {
      setSelectedUsers(selectedUsers.filter(user => user !== removedUser[0]));
      // Send the removed user to the backend
      deleteEmailUserConnection(removedUser[0], emailConnection);
    }
  }

  return (
    <>
      <TableRow className={styles.__table_row}>
        <TableCell>{email}</TableCell>
        <TableCell>
          <MultiSelect
            placeholder={t('accountSettings.email.mappings.table.usersPlaceholder')}
            size="small"
            width={200}
            value={selectedUsers}
            onChange={updateUsers}
            autocomplete={userList?.length > 8}
          >
            {userList &&
              userList.map(user => {
                return (
                  <CheckItem dataTest={user?.value} value={user.id} key={user?.id}>
                    {user?.value}
                  </CheckItem>
                );
              })}
          </MultiSelect>
        </TableCell>
        <TableCell>{provider}</TableCell>
        <TableCell>
          <Input
            size="small"
            width="200px"
            transparent={!isEdition}
            value={accountNameInput}
            onChange={(value: string) => setAccountNameInput(value)}
            onFocus={() => setIsEdition(true)}
            onBlur={() => {
              updateAccountName(accountNameInput, id).then(() => {
                setIsEdition(false);
              });
            }}
          />
        </TableCell>

        {showId && <TableCell>{id}</TableCell>}
        <TableCell>
          <div ref={ref} style={{ minWidth: 164, display: 'flex', justifyContent: 'center' }}>
            {isStopped && !isHover ? (
              <Text size="xs" color="softTomato" inline align="right">
                {t('accountSettings.email.mappings.table.requiresReconnect')}
              </Text>
            ) : (
              <Button
                size="small"
                variant="clear"
                color="extraMeeting"
                onClick={() =>
                  setDisconnectModalData({ isOpen: true, connectionId: id, email: email })
                }
              >
                {t('accountSettings.email.mappings.table.disconnect')}
              </Button>
            )}
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}

export function UserEmailMappings() {
  const { t } = useTranslation();
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const bobjectGlobalPicklist = useEntity('bobjectGlobalPicklists');
  const userGlobalPicklist = bobjectGlobalPicklist?.findByLogicRole('USER');
  const roleManager = SessionManagerFactory().getRoleManager();
  const settings = useUserSettings();
  const isSupport = settings?.user?.type === 'SUPPORT_USER';
  const { accountIntegrationMode } = useEmailIntegrationMode();
  const { disconnectConnection } = useEmailConnections();
  const [disconnectModalData, setDisconnectModalData] = useState({
    isOpen: false,
    connectionId: null,
    email: null,
  });

  const userList = bobjectPicklistFieldValues
    ?.filterBy('bobjectGlobalPicklist', userGlobalPicklist?.id)
    ?.filter(x => x.enabled);

  if (!roleManager.isAccountAdmin() || !accountIntegrationMode) {
    return <NoPermissionsPage />;
  }

  const { data: emailConnections } = useSWR('/service/nylas/getEmailAccounts', () =>
    api.get('/utils/nylas/accounts/connections'),
  );
  const emailConnectionsList = emailConnections?.data?.connections || [];

  return (
    <>
      <AccountSettingsTableContainer>
        {emailConnectionsList?.length > 0 ? (
          <Table className={styles.__table_row__container}>
            <TableHead>
              <TableCell>{t('accountSettings.email.mappings.table.email')}</TableCell>
              <TableCell>{t('accountSettings.email.mappings.table.users')}</TableCell>
              <TableCell>
                {t('accountSettings.email.mappings.table.provider')?.toUpperCase()}
              </TableCell>
              <TableCell>{t('accountSettings.email.mappings.table.accountName')}</TableCell>
              {isSupport && <TableCell>{t('accountSettings.email.mappings.table.id')}</TableCell>}
              <TableCell></TableCell>
            </TableHead>
            <TableBody>
              {emailConnectionsList?.map(connection => (
                <EmailConnectionsRow
                  key={connection.id}
                  emailConnection={connection}
                  userList={userList}
                  showId={isSupport}
                  setDisconnectModalData={setDisconnectModalData}
                />
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className={styles._phone_numbers_empty}>
            <SearchLogs className={styles._phone_numbers_empty_img} />
            <Text size="xl" weight="bold" align="center" color="softPeanut">
              {t('accountSettings.email.mappings.emptyTitle')}
            </Text>
          </div>
        )}
      </AccountSettingsTableContainer>
      {disconnectModalData.isOpen && (
        <DisconnectModal
          open
          type="email"
          handleClose={() =>
            setDisconnectModalData({ isOpen: false, connectionId: null, email: null })
          }
          handleConfirm={() => {
            disconnectConnection(disconnectModalData.connectionId, true);
            setDisconnectModalData({ isOpen: false, connectionId: null, email: null });
          }}
          connection={disconnectModalData.email}
        />
      )}
    </>
  );
}
