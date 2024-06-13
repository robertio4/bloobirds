import { api } from '../utils/api';

export const useIApp = () => {
  const getIAppToken = async () => {
    return (await api.get(`/utils/externalIntegrations/token`, {})).data.token;
  };

  return {
    getIAppToken,
  };
};
