import { useEffect, useState } from 'react';

import useSWR from 'swr';

import { api } from '../utils/api';

const fetchMessagingTemplate = url =>
  api
    .get(url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: {},
    })
    .then(response => response?.data);

const useMessagingTemplate = id => {
  const [errorSaving, setErrorSaving] = useState();

  useEffect(
    () => () => {
      setErrorSaving(undefined);
    },
    [],
  );

  const { data, error, mutate, isValidating } = useSWR(
    id ? `/messaging/messagingTemplates/${id}` : null,
    fetchMessagingTemplate,
  );

  const saveMessagingTemplate = async payload => {
    let messagingTemplate;
    if (payload.id) {
      messagingTemplate = await api
        .put(`/messaging/messagingTemplates/${id}`, payload)
        .then(response => response?.data)
        .catch(err => {
          if (err?.response?.status === 409) {
            setErrorSaving({ name: 'Duplicated name' });
          }
          return err?.response?.status;
        });
    } else {
      messagingTemplate = await api
        .post(`/messaging/messagingTemplates`, payload)
        .then(response => response?.data)
        .catch(err => {
          if (err?.response?.status === 409) {
            setErrorSaving({ name: 'Duplicated name' });
          }
          return err?.response?.status;
        });
    }
    await mutate(messagingTemplate);
    return messagingTemplate;
  };

  const deleteMessagingTemplate = async messagingTemplateId =>
    api.delete(`/messaging/messagingTemplates/${messagingTemplateId}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: {},
    });

  return {
    messagingTemplate: data,
    isLoading: isValidating,
    saveMessagingTemplate,
    deleteMessagingTemplate,
    error: errorSaving,
  };
};

export default useMessagingTemplate;
