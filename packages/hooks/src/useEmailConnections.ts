import { useState } from 'react';

import { useToasts } from '@bloobirds-it/flamingo-ui';
import { ConnectionResponse, Connections } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import useSWR, { SWRResponse } from 'swr';

const fetchConnections = async url => {
  const response: ConnectionResponse = await api.get('/utils' + url).then(res => res.data);
  const defaultConnection = response.nylasTokens.find(connection => connection.default);

  return {
    list: response.nylasTokens,
    defaultConnection: defaultConnection?.email,
    stoppedConnections: response.nylasTokens.filter(
      token => token.syncState === 'stopped' || token.syncState === 'invalid',
    ),
  };
};

const submitDefaultConnection = body => api.patch('/utils/nylas/account/default', body);

const submitEmailAlias = async data => {
  await api.post('/entities/nylasUserAccountAliases', data);
};

const submitUpdateAlias = async (id, data) => {
  await api.patch('/entities/nylasUserAccountAliases/' + id, data);
};

const removeEmailAlias = async id => {
  await api.delete('/entities/nylasUserAccountAliases/' + id);
};

const removeConnection = connectionId => {
  const url = `/utils/nylas/delete/${connectionId}`;
  return api.post(url, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {},
  });
};

export const useEmailConnections = () => {
  const { data: connections, mutate }: SWRResponse<Connections> = useSWR(
    '/nylas/connections',
    fetchConnections,
    {
      revalidateOnFocus: false,
    },
  );
  const { data: accountConnections }: SWRResponse<Connections> = useSWR(
    '/nylas/connections/all',
    fetchConnections,
    {
      revalidateOnFocus: false,
    },
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createToast } = useToasts();

  const updateDefaultConnection = newDefaultConnection => {
    setIsSubmitting(true);
    mutate({ ...connections, defaultConnection: newDefaultConnection }, false);
    createToast({ type: 'success', message: 'Your connection has been updated!' });
    submitDefaultConnection({ defaultEmail: newDefaultConnection }).then(() => {
      setIsSubmitting(false);
    });
  };

  const disconnectConnection = (connectionId, isNylas, onError) => {
    setIsSubmitting(true);
    const listName = isNylas ? 'list' : 'legacyList';
    mutate(
      {
        ...connections,
        [listName]: connections[listName].filter(connection => connection.id !== connectionId),
      },
      false,
    );
    createToast({ type: 'success', message: 'Your connection has been removed!' });
    removeConnection(connectionId)
      .then(() => {
        setIsSubmitting(false);
      })
      .catch(() => onError?.());
  };

  const addAlias = async data => {
    await submitEmailAlias(data);
    mutate();
  };

  const updateAlias = async (id, data) => {
    await submitUpdateAlias(id, data);
    mutate();
  };

  const removeAlias = async id => {
    await removeEmailAlias(id);
    mutate();
  };

  return {
    accountConnections,
    connections,
    mutate,
    disconnectConnection,
    updateDefaultConnection,
    addAlias,
    removeAlias,
    updateAlias,
    isSubmitting,
    stoppedConnections: connections?.stoppedConnections,
  };
};
