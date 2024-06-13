import useSWR from 'swr';
import { useToasts } from '@bloobirds-it/flamingo-ui';
import { api } from '../../../../utils/api';
import { WebApi } from '../../../../misc/api/web';

export interface ApiKeysList {
  apiKeyList: ApiKey;
}

export interface ApiKey {
  id: string;
  name: string;
  apiKey: string;
  keyType: string;
}

export const useApiKeys = () => {
  const { createToast } = useToasts();
  const { data: keys, mutate } = useSWR('/utils/service/api/key/search', url =>
    api.post(url, {
      keyType: 'GENERIC',
    }),
  );
  const createApiKey = (key: ApiKey, onSave: () => void, onFail: () => void) => {
    api
      .post('/utils/service/api/key', { ...key, keyType: 'GENERIC' })
      .then(() => {
        createToast({ message: 'Api key created succesfully', type: 'success' });
        mutate();
        onSave();
      })
      .catch(res => {
        createToast({ message: res.response.data.message, type: 'error' });
        onFail();
      });
  };

  const deleteApiKey = (keyId: string, onSave: () => void) => {
    WebApi.delete({
      path: 'service/api/key/' + keyId,
      body: null,
    }).then(() => {
      createToast({ message: 'Api key deleted succesfully', type: 'success' });
      mutate();
      onSave();
    });
  };

  return {
    keys: keys?.data?.apiKeyList,
    createApiKey,
    deleteApiKey,
  };
};
