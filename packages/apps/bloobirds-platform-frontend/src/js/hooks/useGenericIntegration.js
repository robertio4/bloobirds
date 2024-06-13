import { useEffect, useState } from 'react';

import { atom, useRecoilState } from 'recoil';
import useSWR from 'swr';

import { api } from '../utils/api';

const activeIntegrationAtom = atom({
  key: 'activeIntegration',
  default: {
    clientId: '',
    username: '',
    resource: '',
    token: '',
    hasError: false,
    isLoaded: false,
  },
});

export const useGenericIntegration = driver => {
  const [activeIntegration, setActiveIntegration] = useRecoilState(activeIntegrationAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const { data: integration } = useSWR(
    `/integrations/manager/drivers/${driver}`,
    async () => await api.get(`/integrations/manager/drivers/${driver}`).then(res => res.data),
  );

  useEffect(() => {
    if (integration) {
      setActiveIntegration({
        ...activeIntegration,
        username: integration?.username,
        clientId: integration?.clientId,
        resoucre: integration?.resoucre,
        token: integration?.token,
        isLoaded: true,
        hasError: false,
      });
    }
  }, [integration]);

  const createIntegration = async (bodyRequest, handleError) => {
    setIsSubmitting(true);
    const baseUri =
      process.env.NODE_ENV === 'development'
        ? 'https://gateway.dev-bloobirds.com/integrations'
        : 'https://gateway.bloobirds.com/integrations';
    if (driver === 'msndynamics') {
      const auth = window.open(
        `${baseUri}/manager/drivers/msndynamics/authenticate/${
          bodyRequest.accountId
        }?resourceUrl=${encodeURIComponent(bodyRequest.resource)}`,
        'MsgWindow',
        'width=620,height=420',
      );
      return;
    }
    const response = await api.post(`/integrations/manager/drivers/${driver}`, bodyRequest, {
      validateStatus: () => true,
    });
    if (response.status === 200) {
      setActiveIntegration({
        ...activeIntegration,
        username: response?.username,
        clientId: response?.clientId,
        resoucre: response?.resoucre,
        token: response?.token,
        isLoaded: true,
        hasError: false,
      });
      setIsConnected(true);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      setActiveIntegration({
        ...activeIntegration,
        isLoaded: false,
        hasError: true,
      });
      if (response.status === 400) {
        handleError({
          hasError: true,
          message: ' CRM user profile is not System Administrator',
        });
      } else {
        handleError({
          hasError: true,
          message:
            ' Make sure that all fields are filled properly and if errors persist contact support.',
        });
      }
    }
    return response;
  };

  const disconnectIntegration = async () => {
    await api
      .delete(`/integrations/manager/drivers/${driver}`, {
        validateStatus: () => true,
      })
      .then(() => {
        setActiveIntegration({});
        setIsConnected(false);
      });
  };

  return {
    activeIntegration,
    integration,
    isSubmitting,
    isConnected,
    createIntegration,
    disconnectIntegration,
  };
};
