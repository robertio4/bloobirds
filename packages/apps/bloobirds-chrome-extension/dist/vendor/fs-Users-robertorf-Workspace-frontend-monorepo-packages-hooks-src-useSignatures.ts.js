import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport0_react["useState"];
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR, { useSWRConfig } from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useEmailConnections } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useEmailConnections.ts.js";
const fetchSignatures = async () => {
  return await api.get("/messaging/signatures").then((res) => res.data);
};
const fetchAddSignature = (signature) => async (currentData) => {
  return [...currentData, signature];
};
const fetchUpdateSignature = (signature) => async (currentData) => {
  const response = await api.patch(`/messaging/signatures/${signature?.id}`, signature).then((res) => res.data);
  return currentData.map((s) => s.id === signature.id ? response : s);
};
const fetchDeleteSignature = (id, updateConnections) => async (currentData) => {
  await api.delete(`/messaging/signatures/${id}`);
  updateConnections();
  return currentData.filter((s) => s.id !== id);
};
const fetchSetAsDefault = (id) => async (currentData) => {
  await api.patch(`/messaging/signatures/${id}/default`).then((res) => res.data);
  return currentData.map((s) => s.id === id ? { ...s, default: true } : { ...s, default: false });
};
const fetchChangeSignatureConnection = (id, signatureId, mutate) => async () => {
  const response = await api.patch(`/messaging/signatures/nylasUserAccount/${id}/${signatureId}`).then((res) => res.data);
  mutate();
  return response;
};
const fetchSignature = async (id, data) => {
  if (!data || data.length === 0 || !id) {
    return;
  }
  try {
    const signature = await api.get(`/messaging/signatures/nylasUserAccount/${id}`).then((res) => res.data);
    if (signature?.id) {
      return signature;
    } else {
      return data.find((s) => s.default);
    }
  } catch (error) {
    return data.find((s) => s.default);
  }
};
export const useSignatures = (id) => {
  const [connectionId, setConnectionId] = useState(id);
  const { mutate, data, isLoading } = useSWR("api/signatures", fetchSignatures);
  const { mutate: mutateSignature, data: signature } = useSWR(
    connectionId && data ? `api/signatures/${connectionId}` : null,
    () => fetchSignature(connectionId, data)
  );
  const { connections } = useEmailConnections();
  const { mutate: mutateConfig } = useSWRConfig();
  const addSignature = async (signature2) => {
    if (!data || data.length === 0) {
      signature2.default = true;
    }
    const newSignature = await api.post("/messaging/signatures", signature2).then((res) => res.data);
    mutate(fetchAddSignature(newSignature), {
      optimisticData: [...data, newSignature],
      populateCache: true,
      revalidate: false
    });
    return newSignature;
  };
  const updateSignature = (signature2) => {
    mutate(fetchUpdateSignature(signature2), {
      optimisticData: data.map((s) => s.id === signature2.id ? signature2 : s),
      populateCache: true,
      revalidate: false
    });
    return signature2;
  };
  const updateConnections = (signature2) => {
    const signatureConnections = signature2.nylasUserAccountId;
    for (const connection of connections.list) {
      const connectionSignature = signatureConnections?.find((id2) => id2 === connection.id);
      if (connectionSignature) {
        mutateConfig(`api/signatures/${connection.id}`);
      }
    }
  };
  const deleteSignature = (signature2) => {
    const { id: id2 } = signature2;
    const filteredSignatures = data?.filter((s) => s.id !== id2);
    mutate(
      fetchDeleteSignature(id2, () => updateConnections(signature2)),
      {
        optimisticData: filteredSignatures,
        populateCache: true,
        revalidate: false
      }
    );
  };
  const setAsDefault = (id2) => {
    mutate(fetchSetAsDefault(id2), {
      optimisticData: data.map(
        (s) => s.id === id2 ? { ...s, default: true } : { ...s, default: false }
      ),
      populateCache: true,
      revalidate: false
    });
  };
  const getSignatureConnection = async (connectionId2) => {
    if (!connectionId2) {
      return;
    }
    return await fetchSignature(connectionId2, data);
  };
  const changeSignatureConnection = async (idSignature) => {
    if (!data || data.length === 0 || !connectionId || !idSignature) {
      return;
    }
    mutateSignature(fetchChangeSignatureConnection(connectionId, idSignature, mutate), {
      optimisticData: data.find((s) => s.id === idSignature),
      populateCache: true,
      revalidate: false
    });
  };
  const removeSignatureConnection = async () => {
    if (!data || data.length === 0 || !connectionId) {
      return;
    }
    const defaultSignature = data.find((s) => s.default);
    mutateSignature(fetchChangeSignatureConnection(connectionId, defaultSignature?.id, mutate), {
      optimisticData: defaultSignature,
      populateCache: true,
      revalidate: false
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
    setConnectionId
  };
};
