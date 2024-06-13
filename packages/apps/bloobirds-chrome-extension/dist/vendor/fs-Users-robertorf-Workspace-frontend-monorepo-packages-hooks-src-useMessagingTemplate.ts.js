import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
const fetchMessagingTemplate = (url) => api.get(url, {
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  },
  data: {}
}).then((response) => response?.data);
export const useMessagingTemplate = (id) => {
  const [errorSaving, setErrorSaving] = useState();
  useEffect(
    () => () => {
      setErrorSaving(void 0);
    },
    []
  );
  const { data, mutate, isValidating } = useSWR(
    id ? `/messaging/messagingTemplates/${id}` : null,
    fetchMessagingTemplate,
    {
      revalidateOnFocus: false
    }
  );
  const saveMessagingTemplate = async (payload) => {
    let messagingTemplate;
    if (payload.id) {
      messagingTemplate = await api.put(`/messaging/messagingTemplates/${id}`, payload).then((response) => response?.data).catch((err) => {
        if (err?.response?.status === 409) {
          setErrorSaving({ name: "Duplicated name" });
        }
        return err?.response?.status;
      });
    } else {
      messagingTemplate = await api.post(`/messaging/messagingTemplates`, payload).then((response) => response?.data).catch((err) => {
        if (err?.response?.status === 409) {
          setErrorSaving({ name: "Duplicated name" });
        }
        return err?.response?.status;
      });
    }
    await mutate(messagingTemplate);
    return messagingTemplate;
  };
  const deleteMessagingTemplate = async (messagingTemplateId) => api.delete(`/messaging/messagingTemplates/${messagingTemplateId}`, {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    data: {}
  });
  return {
    messagingTemplate: data,
    isLoading: isValidating,
    saveMessagingTemplate,
    deleteMessagingTemplate,
    error: errorSaving
  };
};
