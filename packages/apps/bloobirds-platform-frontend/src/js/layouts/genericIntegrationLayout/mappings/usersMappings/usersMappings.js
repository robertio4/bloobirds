import React, { useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';
import {
  Button,
  Icon,
  IconButton,
  Item,
  Label,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import styles from '../mappings.module.css';
import map from 'lodash/map';
import { useActiveUser } from '../../../../hooks';
import { api } from '../../../../utils/api';
import BloobirdsUserSelector from '../../../../components/bloobirdsUserSelector/bloobirdsUserSelector';
import AccountSettingsTab from '../../../accountSettingsLayout/accountSettingsTab';
import {
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTabSubtitle,
  AccountSettingsTabTitle,
} from '../../../accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import { useBobjectFields } from '../../../../hooks/useBobjectFields';
import { BOBJECT_TYPES } from '@bloobirds-it/types';

export const BloobirdsUserCell = React.memo(({ userMapping, fieldUsers }) => {
  const { activeAccount } = useActiveUser();

  const { data: bloobirdsUsers } = useSWR('/entities/users', () =>
    api.get('/entities/users', { params: { accountId: activeAccount.id } }).then(res => res.data),
  );

  let picklistUsers = undefined;
  if (fieldUsers) {
    const fields = useBobjectFields(BOBJECT_TYPES.COMPANY)?.sections?.reduce(
      (acc, section) => [...acc, ...section.fields],
      [],
    );
    picklistUsers = fields?.find(field => field.label === fieldUsers)?.fieldValues;
  }

  const usersList = picklistUsers
    ? picklistUsers.map(user => ({ id: user.value, name: user.label }))
    : bloobirdsUsers?._embedded.users;

  const bloobirdsUser = useMemo(() => usersList?.find(user => user?.id === userMapping), [
    usersList,
  ]);

  return (
    <TableCell>
      <div>
        <Text size="s" color="bloobirds">
          {bloobirdsUser?.name}
        </Text>
        <Text size="xs" color="softPeanut">
          {bloobirdsUser?.email}
        </Text>
      </div>
    </TableCell>
  );
});

export const IntegrationUserCell = ({ integrationId, integrationUsers }) => {
  const integrationUser = integrationUsers?.find(user => user?.integrationId === integrationId);
  return (
    <TableCell>
      <div>
        <Text size="s" color="bloobirds" weight="regular">
          {integrationUser?.integrationFullName}
        </Text>
        <Text size="xs" color="softPeanut" weight="regular">
          {integrationUser?.integrationId}
        </Text>
      </div>
    </TableCell>
  );
};

const CreateUserModal = ({ setOpenCreateUserModal, driver, users, integrationName }) => {
  const [newMapping, setNewMapping] = useState({
    driverName: driver,
    userId: null,
    integrationUserId: null,
    integrationUserName: null,
    integrationUserEmail: null,
  });

  const sendRequest = async () => {
    const { createToast } = useToasts();

    const response = await api.post(
      `/integrations/manager/drivers/${driver}/mappings/users`,
      newMapping,
    );
    if (response.status === 201) {
      createToast({
        type: 'success',
        message: 'The user was created successfully!',
      });
      mutate(`/integrations/manager/drivers/${driver}}/mappings/users`);
      setOpenCreateUserModal(false);
    } else {
      createToast({
        type: 'error',
        message: 'There was an error creating the mapping',
      });
    }
  };

  return (
    <Modal open onClose={() => setOpenCreateUserModal(false)}>
      <ModalHeader>
        <ModalTitle>
          <Text size={16} inline color="peanut">
            Create user mapping
          </Text>
        </ModalTitle>
        <ModalCloseIcon color="peanut" onClick={() => setOpenCreateUserModal(false)} />
      </ModalHeader>
      <ModalContent>
        <div className={styles._modal_title}>
          <Icon name="settings" size={35} />
          <Text color="peanut">
            Map {driver === 'vtiger' ? 'Out of BB picklist' : 'Bloobirds'} user to {integrationName}{' '}
            user
          </Text>
        </div>
        <div className={styles._modal_section__content}>
          <div className={styles._modal_section}>
            <BloobirdsUserSelector
              width={260}
              size="small"
              borderless={false}
              onChange={value =>
                setNewMapping(old => ({
                  ...old,
                  userId: value,
                }))
              }
              autocomplete
              fieldUsers={driver === 'vtiger' ? 'Out of BB' : undefined}
            />
          </div>
          <div className={styles._modal_section}>
            <Label
              overrideStyle={{ cursor: 'default' }}
              color="veryLightBloobirds"
              size="small"
              textColor="bloobirds"
              uppercase={false}
            >
              map to
            </Label>
          </div>
          <div className={styles._modal_section}>
            <Select
              width={260}
              size="small"
              borderless={false}
              placeholder={`${integrationName} user`}
              defaultValue=""
              autocomplete
              onChange={value =>
                setNewMapping(old => ({
                  ...old,
                  integrationUserId: value?.integrationId,
                  integrationUserName: value?.integrationFullName,
                  integrationUserEmail: value?.integrationEmail,
                }))
              }
            >
              {users?.map(user => (
                <Item key={user?.integrationId} value={user} label={user?.integrationFullName}>
                  {user?.integrationFullName}
                </Item>
              ))}
            </Select>
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button
          variant="clear"
          onClick={() => {
            setOpenCreateUserModal(false);
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={!Object.values(newMapping).every(mapping => !!mapping)}
          size="small"
          onClick={sendRequest}
        >
          Add user mapping
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const UsersMappings = ({ driver, integrationName }) => {
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
  const { createToast } = useToasts();
  const { data: userMappings } = useSWR(
    `/integrations/manager/drivers/${driver}/mappings/users`,
    async () =>
      await api.get(`/integrations/manager/drivers/${driver}/mappings/users`).then(res => res.data),
  );

  const { data: users } = useSWR(
    `/integrations/manager/drivers/${driver}/users`,
    async () =>
      await api.get(`/integrations/manager/drivers/${driver}/users`).then(res => res.data),
  );

  async function removeUser(userId) {
    const response = await api.delete(
      `/integrations/manager/drivers/${driver}/mappings/users/${userId}`,
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        data: {},
      },
    );
    if (response.status === 204) {
      createToast({
        type: 'success',
        message: 'The user was deleted successfully!',
      });
      mutate(`/integrations/manager/drivers/${driver}/mappings/users`);
    } else {
      createToast({
        type: 'error',
        message: 'There was an error deleting the user',
      });
    }
  }

  return (
    <AccountSettingsTab>
      <AccountSettingsTabHeader>
        <AccountSettingsTabHeaderLeft>
          <AccountSettingsTabTitle icon="person">Users mappings</AccountSettingsTabTitle>
          <AccountSettingsTabSubtitle>
            Manage here the user mappings between Bloobirds users and {integrationName} users
          </AccountSettingsTabSubtitle>
        </AccountSettingsTabHeaderLeft>
        <AccountSettingsTabHeaderRight>
          <Button iconLeft="plus" onClick={() => setOpenCreateUserModal(true)}>
            Add new user mapping
          </Button>
        </AccountSettingsTabHeaderRight>
      </AccountSettingsTabHeader>
      <AccountSettingsTabContent>
        <div className={styles._dynamics__fields__table}>
          <Table>
            <TableHead>
              <TableCell>{driver === 'vtiger' ? 'Out of BB' : 'Bloobirds User'}</TableCell>
              <TableCell>{integrationName} User</TableCell>
              <TableCell>Actions</TableCell>
            </TableHead>
            <TableBody>
              {map(userMappings?.mappings, (integrationId, bloobirdsId) => {
                return (
                  <TableRow key={bloobirdsId}>
                    <BloobirdsUserCell
                      userMapping={bloobirdsId}
                      fieldUsers={driver === 'vtiger' ? 'Out of BB' : undefined}
                    />
                    <IntegrationUserCell integrationId={integrationId} integrationUsers={users} />
                    <TableCell>
                      <IconButton name="trashFull" onClick={() => removeUser(bloobirdsId)} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {openCreateUserModal && (
          <CreateUserModal
            setOpenCreateUserModal={setOpenCreateUserModal}
            users={users}
            driver={driver}
            integrationName={integrationName}
          />
        )}
      </AccountSettingsTabContent>
    </AccountSettingsTab>
  );
};

export default UsersMappings;
