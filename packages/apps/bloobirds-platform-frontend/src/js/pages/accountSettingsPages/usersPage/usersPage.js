import React, { useEffect, useState } from 'react';

import { Button, Label, SearchInput, Tooltip } from '@bloobirds-it/flamingo-ui';

import { useUserSettings } from '../../../components/userPermissions/hooks';
import { useMediaQuery } from '../../../hooks';
import { useIsAccountAdmin } from '../../../hooks/usePermissions';
import AccountSettingsLayout from '../../../layouts/accountSettingsLayout';
import {
  AccountSettingsTab,
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTableContainer,
  AccountSettingsTabSubtitle,
  AccountSettingsTabTitle,
} from '../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import NoPermissionsPage from '../../noPermissionsPage';
import { CreateEditUserModal } from './components/createEditUserModal/createEditUserModal';
import { UserCreatedModal } from './components/userCreatedModal/userCreatedModal';
import { UsersList } from './components/usersList/usersList';
import { USER_TYPES } from './constants/users.constants';
import { useCreateEditUserModal } from './hooks/useCreateEditUserModal';
import { useUserCreatedModal } from './hooks/useUserCreatedModal';
import { useUsersList } from './hooks/useUsersList';
import styles from './styles/usersPage.module.css';
import {useTranslation} from "react-i18next";

const UsersPage = () => {
  const { t } = useTranslation();
  const isAccountAdmin = useIsAccountAdmin();
  const [searchValue, setSearchValue] = useState();
  const settings = useUserSettings();
  const { isSmallDesktop } = useMediaQuery();
  const { modalOpen, handleOpenCreateEditUserModal } = useCreateEditUserModal();
  const { modalOpen: userCreatedOpen, handleCloseUserCreatedModal } = useUserCreatedModal();

  if (!isAccountAdmin) {
    return <NoPermissionsPage />;
  }
  const { users } = useUsersList({
    filtersBody: {
      userType: USER_TYPES.LICENSE_USER,
    },
  });
  const [usersList, setUsersList] = useState(users?.users);
  useEffect(() => {
    if (searchValue) {
      const filteredList = users?.users?.filter(user =>
        user.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setUsersList(filteredList);
    } else {
      setUsersList(users?.users);
    }
  }, [searchValue, users]);

  return (
    <AccountSettingsLayout
      title={t('accountSettings.salesTeam.title')}
      subtitle={t('accountSettings.salesTeam.subtitle')}
    >
      <AccountSettingsTab>
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="person">
              <div className={styles._title_container}>
                {' '}
                {t('common.user_other')}{' '}
                <Label>
                  {users?.users?.length}{' '}
                  {settings?.account?.maxUsersAllowed
                    ? t('accountSettings.salesTeam.maxUsersCounter', {
                        maxUsersAllowed: settings?.account?.maxUsersAllowed,
                      })
                    : ''}
                </Label>{' '}
              </div>
            </AccountSettingsTabTitle>
            <AccountSettingsTabSubtitle>
              {t('accountSettings.salesTeam.usersSubtitle')}
            </AccountSettingsTabSubtitle>
          </AccountSettingsTabHeaderLeft>
          <AccountSettingsTabHeaderRight>
            <SearchInput
              width={200}
              placeholder={t('common.search')}
              onChange={value => setSearchValue(value)}
              color="softBloobirds"
            />
            {users?.users?.length >= settings?.account?.maxUsersAllowed ? (
              <Tooltip title={t('accountSettings.salesTeam.maxUsersTooltip')} position="top">
                <Button disabled iconLeft="plus">
                  {!isSmallDesktop && t('accountSettings.salesTeam.createNewUser')}
                </Button>
              </Tooltip>
            ) : (
              <Button iconLeft="plus" onClick={handleOpenCreateEditUserModal}>
                {!isSmallDesktop && t('accountSettings.salesTeam.createNewUser')}
              </Button>
            )}
          </AccountSettingsTabHeaderRight>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <AccountSettingsTableContainer>
            <UsersList users={users} usersList={usersList} />
          </AccountSettingsTableContainer>
        </AccountSettingsTabContent>
      </AccountSettingsTab>
      {modalOpen && <CreateEditUserModal />}
      {userCreatedOpen && <UserCreatedModal onClose={handleCloseUserCreatedModal} />}
    </AccountSettingsLayout>
  );
};

export default UsersPage;
