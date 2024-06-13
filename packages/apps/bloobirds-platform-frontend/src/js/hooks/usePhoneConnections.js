import { useState } from 'react';
import { useActiveUser } from './useActiveUser';
import { useUserSettings, useUserSettingsReload } from '../components/userPermissions/hooks';
import { useToasts } from '@bloobirds-it/flamingo-ui';
import { RestApi } from '../misc/api/rest';
import SessionManagerFactory from '../misc/session';
import useSWR from 'swr';

const fetchConnections = async () => {
  const response = await RestApi.search({
    entity: 'phoneForwardConnections',
    page: 0,
    query: {
      'account.id': SessionManagerFactory().getAccount()?.id,
      'user.id': SessionManagerFactory().getUser()?.id,
    },
  });
  const list = response._embedded.phoneForwardConnections;
  return { list, defaultConnection: list.find(connection => connection.defaultConnection) };
};

const fetchPhones = async () => {
  const response = await RestApi.search({
    entity: `users/${SessionManagerFactory().getUser()?.id}/phoneNumbers`,
  });
  return { phones: response._embedded.phoneNumbers };
};

const submitDefaultConnection = (id, setDefault = true) =>
  RestApi.patch({ entity: 'phoneForwardConnections', id, body: { defaultConnection: setDefault } });

const removeConnection = connectionId =>
  RestApi.delete({ entity: 'phoneForwardConnections', id: connectionId });

const addConnection = (connection, userId, accountId) =>
  RestApi.create({
    entity: 'phoneForwardConnections',
    body: {
      account: `/accounts/${accountId}`,
      user: `/users/${userId}`,
      ...connection,
    },
  });

export const usePhoneConnections = () => {
  const { activeUser, activeAccount } = useActiveUser();
  const { createToast } = useToasts();
  const { data: connections, mutate } = useSWR('/phoneForwardConnections', fetchConnections);
  const { data: phonesList } = useSWR('/phoneNumbers', fetchPhones);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reloadSettings = useUserSettingsReload();
  const settings = useUserSettings();

  const {
    data: allPhoneUserNumbers,
    mutate: updateUserPhoneNumbers,
  } = useSWR(`users/${settings?.user.id}/phoneNumbers`, () =>
    RestApi.get({ path: `users/${settings?.user.id}/phoneNumbers` }),
  );

  const updateDefaultConnection = newDefaultConnection => {
    const onThen = () => {
      setIsSubmitting(false);
      mutate(
        {
          ...connections,
          defaultConnection: connections.list.find(
            connection => connection.id === newDefaultConnection,
          ),
        },
        false,
      );
      createToast({ type: 'success', message: 'Phone Connections updated!' });
    };

    setIsSubmitting(true);
    if (connections.defaultConnection) {
      submitDefaultConnection(
        connections.list.find(
          connection => connection.phoneNumber === connections.defaultConnection.phoneNumber,
        ).id,
        false,
      ).then(() => submitDefaultConnection(newDefaultConnection).then(onThen));
    } else {
      submitDefaultConnection(newDefaultConnection).then(onThen);
    }
  };

  const disconnectConnection = (connectionId, onError) => {
    setIsSubmitting(true);
    const toDeleteNumber = connections.list.find(connection => connection.id === connectionId)
      .phoneNumber;
    const newDefaultConnection =
      toDeleteNumber === connections.defaultConnection ? undefined : connections.defaultConnection;
    if (toDeleteNumber === connections?.defaultConnection?.phoneNumber) {
      RestApi.patch({
        entity: 'users',
        id: activeUser.id,
        body: { incomingCallsForwarding: false },
      }).then(() => {
        reloadSettings();
        createToast({ type: 'success', message: 'Phone Connection disconnected!' });
      });
    }
    removeConnection(connectionId)
      .then(() => {
        setIsSubmitting(false);
        mutate(
          {
            ...connections,
            list: connections.list.filter(connection => connection.id !== connectionId),
            defaultConnection: newDefaultConnection,
          },
          false,
        );
      })
      .catch(() => onError());
  };

  const addNewConnection = phoneNumber => {
    setIsSubmitting(true);
    return addConnection(
      { phoneNumber, defaultConnection: false },
      activeUser.id,
      activeAccount.id,
    ).then(connection => {
      mutate({ ...connections, list: [...connections.list, connection] }, false);
      setIsSubmitting(false);
      return connection;
    });
  };

  return {
    connections,
    addNewConnection,
    disconnectConnection,
    updateDefaultConnection,
    isSubmitting,
    phonesList,
    allPhoneUserNumbers,
    updateUserPhoneNumbers,
  };
};
