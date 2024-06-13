import { useState } from 'react';

import { api } from '@bloobirds-it/utils';
import useSWR, { useSWRConfig } from 'swr';

import { useEmailConnections } from './useEmailConnections';

export interface SignatureProps {
  id: string;
  name: string;
  default: boolean;
  rawHtml: boolean;
  signature: string;
  nylasUserAccountId: string[];
}

const fetchSignatures = async () => {
  return await api.get('/messaging/signatures').then(res => res.data);
};

const fetchAddSignature = (signature: SignatureProps) => async (currentData: SignatureProps[]) => {
  return [...currentData, signature];
};

const fetchUpdateSignature = (signature: SignatureProps) => async (
  currentData: SignatureProps[],
) => {
  const response = await api
    .patch(`/messaging/signatures/${signature?.id}`, signature)
    .then(res => res.data);
  return currentData.map(s => (s.id === signature.id ? response : s));
};

const fetchDeleteSignature = (id: string, updateConnections) => async (
  currentData: SignatureProps[],
) => {
  await api.delete(`/messaging/signatures/${id}`);

  updateConnections();

  return currentData.filter(s => s.id !== id);
};

const fetchSetAsDefault = (id: string) => async (currentData: SignatureProps[]) => {
  await api.patch(`/messaging/signatures/${id}/default`).then(res => res.data);
  return currentData.map(s => (s.id === id ? { ...s, default: true } : { ...s, default: false }));
};

const fetchChangeSignatureConnection = (id: string, signatureId: string, mutate) => async () => {
  const response = await api
    .patch(`/messaging/signatures/nylasUserAccount/${id}/${signatureId}`)
    .then(res => res.data);

  mutate();

  return response;
};

/* const fetchRemoveSignatureConnection = (id: string) => async () => {
  await api.delete(`/messaging/signatures/nylasUserAccount/${id}`);
  return null;
}; */

const fetchSignature = async (id: string, data) => {
  if (!data || data.length === 0 || !id) {
    return;
  }

  try {
    const signature = await api
      .get(`/messaging/signatures/nylasUserAccount/${id}`)
      .then(res => res.data);

    if (signature?.id) {
      return signature;
    } else {
      return data.find(s => s.default);
    }
  } catch (error) {
    return data.find(s => s.default);
  }
};

export const useSignatures = (id?: string) => {
  const [connectionId, setConnectionId] = useState<string>(id);
  const { mutate, data, isLoading } = useSWR('api/signatures', fetchSignatures);
  const { mutate: mutateSignature, data: signature } = useSWR(
    connectionId && data ? `api/signatures/${connectionId}` : null,
    () => fetchSignature(connectionId, data),
  );
  const { connections } = useEmailConnections();
  const { mutate: mutateConfig } = useSWRConfig();

  const addSignature = async (signature: SignatureProps): Promise<SignatureProps> => {
    if (!data || data.length === 0) {
      signature.default = true;
    }
    const newSignature = await api.post('/messaging/signatures', signature).then(res => res.data);
    mutate(fetchAddSignature(newSignature), {
      optimisticData: [...data, newSignature],
      populateCache: true,
      revalidate: false,
    });
    return newSignature;
  };

  const updateSignature = (signature: SignatureProps): SignatureProps => {
    mutate(fetchUpdateSignature(signature), {
      optimisticData: data.map((s: SignatureProps) => (s.id === signature.id ? signature : s)),
      populateCache: true,
      revalidate: false,
    });
    return signature;
  };

  const updateConnections = (signature: SignatureProps) => {
    const signatureConnections = signature.nylasUserAccountId;
    for (const connection of connections.list) {
      const connectionSignature = signatureConnections?.find(id => id === connection.id);
      if (connectionSignature) {
        mutateConfig(`api/signatures/${connection.id}`);
      }
    }
  };

  const deleteSignature = (signature: SignatureProps) => {
    const { id } = signature;
    const filteredSignatures = data?.filter((s: SignatureProps) => s.id !== id);

    mutate(
      fetchDeleteSignature(id, () => updateConnections(signature)),
      {
        optimisticData: filteredSignatures,
        populateCache: true,
        revalidate: false,
      },
    );
  };

  const setAsDefault = (id: string) => {
    mutate(fetchSetAsDefault(id), {
      optimisticData: data.map((s: SignatureProps) =>
        s.id === id ? { ...s, default: true } : { ...s, default: false },
      ),
      populateCache: true,
      revalidate: false,
    });
  };

  const getSignatureConnection = async (connectionId: string) => {
    if (!connectionId) {
      return;
    }
    return await fetchSignature(connectionId, data);
  };

  const changeSignatureConnection = async (idSignature: string) => {
    if (!data || data.length === 0 || !connectionId || !idSignature) {
      return;
    }
    mutateSignature(fetchChangeSignatureConnection(connectionId, idSignature, mutate), {
      optimisticData: data.find(s => s.id === idSignature),
      populateCache: true,
      revalidate: false,
    });
  };

  const removeSignatureConnection = async () => {
    if (!data || data.length === 0 || !connectionId) {
      return;
    }
    /*     mutateSignature(fetchRemoveSignatureConnection(connectionId), {
      optimisticData: null,
      populateCache: true,
      revalidate: false,
    }); */
    const defaultSignature = data.find(s => s.default);
    mutateSignature(fetchChangeSignatureConnection(connectionId, defaultSignature?.id, mutate), {
      optimisticData: defaultSignature,
      populateCache: true,
      revalidate: false,
    });
  };

  return {
    isLoading,
    data,
    signature,
    addSignature,
    updateSignature,
    deleteSignature,
    setAsDefault,
    getSignatureConnection,
    changeSignatureConnection,
    removeSignatureConnection,
    setConnectionId,
  };
};
