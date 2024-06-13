import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Icon,
  Item,
  Select,
  Snackbar,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tag,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';
import { mutate } from 'swr';

import { useEntity } from '../../../../hooks';
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
import { CallsApi } from '../../../../misc/api/calls';
import { RestApi } from '../../../../misc/api/rest';
import styles from './aircall.module.css';

const PhoneNumberRow = ({ phone }) => (
  <TableRow>
    <TableCell>{phone?.name}</TableCell>
    <TableCell>{phone?.phoneNumber}</TableCell>
    <TableCell>{phone?.aircallRecordingEnabled ? <Tag>Yes</Tag> : <Tag>No</Tag>}</TableCell>
    <TableCell>{phone?.phoneIntegrated ? <Tag>Yes</Tag> : <Tag>No</Tag>}</TableCell>
  </TableRow>
);

const UserRow = ({ aircallUser, userList }) => {
  const { save } = useUserHelpers();
  const { t } = useTranslation();
  const updateAircallUser = userId => {
    RestApi.patch({
      entity: 'aircallUsers',
      id: aircallUser?.id,
      body: {
        bloobirdsUser: `/users/${userId}`,
      },
    }).then(() => mutate('/entity/aircallUsers'));
    save(UserHelperKeys.CHOOSE_DIALER);
  };

  return (
    <TableRow>
      <TableCell>{aircallUser?.aircallUserName}</TableCell>
      <TableCell>{aircallUser?.aircallUserEmail}</TableCell>
      <TableCell>
        <Select
          placeholder="Bloobirds user"
          size="small"
          borderless={false}
          width={200}
          onChange={updateAircallUser}
          value={aircallUser?.bloobirdsUser}
        >
          {userList &&
            userList.map(user => (
              <Item key={user?.id} dataTest={user?.value} value={user?.id}>
                {user?.value}
              </Item>
            ))}
        </Select>
      </TableCell>
      <TableCell>{aircallUser?.syncContactsEnabled ? 'Yes' : 'No'}</TableCell>
    </TableRow>
  );
};

const AircallConfig = () => {
  const { t } = useTranslation();
  const aircallToken = useEntity('aircallTokens')?.all()[0];
  const phoneNumbers = useEntity('phoneNumbers')?.filterBy('type', 'AIRCALL_NUMBER');
  const aircallUsers = useEntity('aircallUsers')?.all();
  const bobjectGlobalPicklist = useEntity('bobjectGlobalPicklists');
  const userGlobalPicklist = bobjectGlobalPicklist?.findByLogicRole('USER');
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const userList = bobjectPicklistFieldValues
    ?.filterBy('bobjectGlobalPicklist', userGlobalPicklist?.id)
    ?.filter(user => user?.enabled);
  const [isRefreshing, setIsRefreshing] = useState();
  const [isRefreshingUsers, setIsRefreshingUsers] = useState();
  const numbersNotInIntegration = phoneNumbers?.filter(n => !n.phoneIntegrated)?.length;

  const refreshNumbers = () => {
    setIsRefreshing(true);
    CallsApi.get({ path: 'aircall/sync/numbers' });
  };

  const handleFinishRefreshingNumbers = () => {
    mutate('/entity/phoneNumbers');
    setIsRefreshing(false);
  };

  const refreshUsers = () => {
    setIsRefreshingUsers(true);
    CallsApi.get({ path: 'aircall/sync/users' });
  };

  const handleFinishRefreshingUsers = () => {
    mutate('/entity/aircallUsers');
    setIsRefreshingUsers(false);
  };

  return (
    <div className={styles._config__container}>
      <AccountSettingsTab title={t('accountSettings.dialers.aircall.aircallAccount')} icon="person">
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="person">
              {t('accountSettings.dialers.aircall.aircallAccount')}
            </AccountSettingsTabTitle>
          </AccountSettingsTabHeaderLeft>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <div className={styles._config__account}>
            <Text className={styles._config__account_name} size="m" color="softPeanut">
              {t('accountSettings.dialers.aircall.aircallBloobirdsProduction')}
            </Text>
            <Text className={styles._config__account_status_text} size="s" color="softPeanut">
              {t('accountSettings.dialers.aircall.integrationCurrentState') +
              ' ' +
              aircallToken?.enabled
                ? t('accountSettings.dialers.aircall.active')
                : t('accountSettings.dialers.aircall.inactive')}
            </Text>
            <Button
              variant="tertiary"
              color="tomato"
              onClick={() => window.open('https://dashboard-v2.aircall.io/integrations', '_blank')}
            >
              {t('common.delete')}
            </Button>
          </div>
        </AccountSettingsTabContent>
      </AccountSettingsTab>
      <AccountSettingsTab>
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="person">
              <div className={styles._users_title}>
                {t('accountSettings.dialers.aircall.aircallUsers')}
                <Tooltip
                  title={t('accountSettings.dialers.aircall.aircallUsersTooltip')}
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
                  {t('common.refresh')}
                </Button>
              </div>
              <Snackbar
                variant="actions"
                position="bottom"
                visible={isRefreshingUsers}
                onClose={handleFinishRefreshingUsers}
              >
                <Text size="s" color="white">
                  {t('accountSettings.dialers.aircall.refreshingUsers')}
                </Text>
              </Snackbar>
            </AccountSettingsTabTitle>
            <AccountSettingsTabSubtitle>
              {t('accountSettings.dialers.aircall.matchAircallUsers')}
            </AccountSettingsTabSubtitle>
          </AccountSettingsTabHeaderLeft>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <AccountSettingsTableContainer>
            <Table>
              <TableHead>
                <TableCell>{t('accountSettings.dialers.aircall.aircallUserName')}</TableCell>
                <TableCell>{t('accountSettings.dialers.aircall.aircallUserEmail')}</TableCell>
                <TableCell>{t('accountSettings.dialers.aircall.aircallBloobirdsUser')}</TableCell>
                <TableCell>{t('accountSettings.dialers.aircall.aircallSyncContacts')}</TableCell>
              </TableHead>
              <TableBody>
                {aircallUsers
                  ?.sort((a, b) => {
                    if (a.aircallUserName < b.aircallUserName) {
                      return -1;
                    }
                    if (a.aircallUserName > b.aircallUserName) {
                      return 1;
                    }
                    return 0;
                  })
                  .map(aircallUser => (
                    <UserRow key={aircallUser?.id} aircallUser={aircallUser} userList={userList} />
                  ))}
              </TableBody>
            </Table>
          </AccountSettingsTableContainer>
        </AccountSettingsTabContent>
      </AccountSettingsTab>
      <AccountSettingsTab>
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="phone">
              {t('accountSettings.dialers.aircall.connectedNumbers')}
              <Button
                variant="secondary"
                iconLeft="refresh"
                size="small"
                className={styles._refresh__button}
                onClick={refreshNumbers}
              >
                {isRefreshing ? (
                  <Spinner name="loadingCircle" color="bloobirds" size={10} />
                ) : (
                  t('common.refresh')
                )}
              </Button>
              <Snackbar
                variant="actions"
                position="bottom"
                visible={isRefreshing}
                onClose={handleFinishRefreshingNumbers}
              >
                <Text size="s" color="white">
                  {t('accountSettings.dialers.aircall.refreshingNumbers')}
                </Text>
              </Snackbar>
            </AccountSettingsTabTitle>
          </AccountSettingsTabHeaderLeft>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          {numbersNotInIntegration > 0 && (
            <div className={styles._warning_banner}>
              <div className={styles._warning_icon}>
                <Icon size={40} name="alertTriangle" color="banana" />
              </div>
              <div className={styles._warning_text}>
                <Text size="m">
                  {t('accountSettings.dialers.aircall.aircallNumbersNotAdded', {
                    numbersNotInIntegration,
                    numbersCounter: t('accountSettings.dialers.aircall.number', {
                      count: numbersNotInIntegration || 0,
                    }),
                  })}
                  <a
                    href="https://dashboard-v2.aircall.io/integrations"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('accountSettings.dialers.aircall.aircallDashboard')}
                  </a>
                  {t('accountSettings.dialers.aircall.aircallNumbersNotAddedPost')}
                </Text>
              </div>
            </div>
          )}
          <AccountSettingsTableContainer>
            <Table>
              <TableHead>
                <TableCell>{t('accountSettings.dialers.aircall.phoneName')}</TableCell>
                <TableCell>{t('accountSettings.dialers.aircall.phoneNumber_one')}</TableCell>
                <TableCell>{t('accountSettings.dialers.aircall.recordingEnabled')}</TableCell>
                <TableCell>{t('accountSettings.dialers.aircall.phoneAddedIntegration')}</TableCell>
              </TableHead>
              <TableBody>
                {phoneNumbers?.map(phone => (
                  <PhoneNumberRow key={phone.id} phone={phone} userList={userList} />
                ))}
              </TableBody>
            </Table>
          </AccountSettingsTableContainer>
        </AccountSettingsTabContent>
      </AccountSettingsTab>
    </div>
  );
};

export default AircallConfig;
