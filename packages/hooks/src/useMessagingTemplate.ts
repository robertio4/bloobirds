import { useEffect, useState } from 'react';

import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

const fetchMessagingTemplate = url =>
  api
    .get(url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: {},
    })
    .then(response => response?.data);

export const useMessagingTemplate = id => {
  const [errorSaving, setErrorSaving] = useState();

  useEffect(
    () => () => {
      setErrorSaving(undefined);
    },
    [],
  );

  const { data, mutate, isValidating } = useSWR(
    id ? `/messaging/messagingTemplates/${id}` : null,
    fetchMessagingTemplate,
    {
      revalidateOnFocus: false,
    },
  );

  const saveMessagingTemplate = async payload => {
    let messagingTemplate;
    if (payload.id) {
      messagingTemplate = await api
        .put(`/messaging/messagingTemplates/${id}`, payload)
        .then(response => response?.data)
        .catch(err => {
          if (err?.response?.status === 409) {
            // @ts-ignore
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
            // @ts-ignore
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
