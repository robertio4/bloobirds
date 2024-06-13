import React from 'react';

import { Text, Spinner } from '@bloobirds-it/flamingo-ui';

import { SearchLogs } from '../../../../../../assets/svg';
import {
  EntityHeaderItem,
  EntityList,
  EntityListHeader,
} from '../../../../../components/entityList/entityList';
import { headerNames } from '../../constants/usersListHeaders.constants';
import styles from '../../styles/usersPage.module.css';
import { UserCard } from '../userCard/userCard';
import {useTranslation} from "react-i18next";

export const UsersList = ({ users, usersList }) => {
  const { t } = useTranslation();
  return (
    <>
      {users ? (
        <EntityList>
          {usersList?.length > 0 ? (
            <>
              <EntityListHeader>
                <EntityHeaderItem size="small" />
                {headerNames.map(name => (
                  <EntityHeaderItem key={name?.label} label={name?.label} size={name?.size} />
                ))}
              </EntityListHeader>
              {usersList?.length > 0 ? (
                <div className={styles._tbody}>
                  {usersList?.map(user => (
                    <UserCard key={user?.id} user={user} />
                  ))}
                </div>
              ) : (
                <div className={styles._no_results__contents}>
                  <SearchLogs className={styles._no_results__img} />
                  <Text size="xl" weight="bold" align="center" color="softPeanut">
                    {t('accountSettings.salesTeam.noUsersCreated')}
                  </Text>
                </div>
              )}
            </>
          ) : (
            <div className={styles._no_results__contents}>
              <SearchLogs className={styles._no_results__img} />
              <Text size="xl" weight="bold" align="center" color="softPeanut">
                {t('accountSettings.salesTeam.noUsersCreated')}
              </Text>
            </div>
          )}
        </EntityList>
      ) : (
        <div className={styles._no_results__contents}>
          <Spinner size={40} color="bloobirds" name="dots" />
        </div>
      )}
    </>
  );
};
