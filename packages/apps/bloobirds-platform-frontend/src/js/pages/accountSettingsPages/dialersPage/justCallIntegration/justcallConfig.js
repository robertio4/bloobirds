import React from 'react';

import {
  Button,
  Item,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';
import { mutate } from 'swr';

import { SearchLogs } from '../../../../../assets/svg';
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
import { api } from '../../../../utils/api';
import styles from './justcall.module.css';

const PhoneNumberRow = ({ phone, userList }) => {
  const { createToast } = useToasts();
  const { save } = useUserHelpers();

  const handleAssignUsersToPhone = user => {
    api
      .patch(`calls/twilio/sync/assignNumber/${phone.id}`, {
        users_id: [user],
      })
      .then(() => mutate('/entity/phoneNumbers'))
      .catch(err => {
        console.log(err);

        createToast({ message: 'There was an error updating the phone number', type: 'error' });
      });
    save(UserHelperKeys.CHOOSE_DIALER);
  };

  return (
    <TableRow>
      <TableCell>{phone?.name}</TableCell>
      <TableCell>{phone?.phoneNumber}</TableCell>
      <TableCell>
        <Select
          placeholder="Bloobirds user"
          size="small"
          borderless={false}
          width={200}
          onChange={handleAssignUsersToPhone}
          value={phone?.users[0] || null}
        >
          {userList &&
            userList.map(user => (
              <Item key={user?.id} dataTest={user?.value} value={user?.id}>
                {user?.value}
              </Item>
            ))}
        </Select>
      </TableCell>
      <TableCell>{phone?.location}</TableCell>
      <TableCell>{phone?.sid}</TableCell>
    </TableRow>
  );
};

const JustcallConfig = () => {
  const phoneNumbers = useEntity('phoneNumbers')?.filterBy('type', 'JUST_CALL_NUMBER');
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const bobjectGlobalPicklist = useEntity('bobjectGlobalPicklists');
  const userGlobalPicklist = bobjectGlobalPicklist?.findByLogicRole('USER');
  const userList = bobjectPicklistFieldValues
    ?.filterBy('bobjectGlobalPicklist', userGlobalPicklist?.id)
    ?.filter(x => x.enabled);

  return (
    <div className={styles._config__container}>
      <AccountSettingsTab>
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="person">JustCall account</AccountSettingsTabTitle>
          </AccountSettingsTabHeaderLeft>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <div className={styles._config__account}>
            <Text className={styles._config__account_name} size="m" color="softPeanut">
              Bloobirds production
            </Text>
            <Text className={styles._config__account_status_text} size="s" color="softPeanut">
              Your integration is currently active
            </Text>
            <Button
              variant="tertiary"
              color="tomato"
              onClick={() => window.open('https://justcall.io/app/integrations', '_blank')}
            >
              Delete
            </Button>
          </div>
        </AccountSettingsTabContent>
      </AccountSettingsTab>
      <AccountSettingsTab title="Connected numbers" icon="phone">
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="phone">Connected numbers</AccountSettingsTabTitle>
            <AccountSettingsTabSubtitle>
              This phones came directly from the JustCall settings, so you just have to assign them
              to a user in Bloobirds. If you want to change any other information you should go to
              your JustCall settings to change them.
            </AccountSettingsTabSubtitle>
          </AccountSettingsTabHeaderLeft>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <AccountSettingsTableContainer>
            {phoneNumbers?.length > 0 ? (
              <Table className={styles.__table_row__container}>
                <TableHead>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone numbers</TableCell>
                  <TableCell>Bloobirds User</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>SID</TableCell>
                </TableHead>
                <TableBody>
                  {phoneNumbers?.map(phone => (
                    <PhoneNumberRow key={phone.id} phone={phone} userList={userList} />
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className={styles._phone_numbers_empty}>
                <SearchLogs className={styles._phone_numbers_empty_img} />
                <Text size="xl" weight="bold" align="center" color="softPeanut">
                  No phone numbers could be found
                </Text>
              </div>
            )}
          </AccountSettingsTableContainer>
        </AccountSettingsTabContent>
      </AccountSettingsTab>
    </div>
  );
};

export default JustcallConfig;
