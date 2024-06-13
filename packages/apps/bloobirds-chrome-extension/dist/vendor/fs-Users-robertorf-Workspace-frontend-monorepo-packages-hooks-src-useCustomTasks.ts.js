import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport0_react["useState"];
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
export const fetchCustomTasks = ([url, showDisabled]) => {
  return api.get(`/utils/customTask`, {
    params: showDisabled ? {} : { enabled: !showDisabled }
  }).then((res) => res.data);
};
export const useCustomTasks = (options) => {
  const [showDisabled, setShowDisabled] = useState(options?.disabled);
  const { data: customTasks, mutate } = useSWR(
    [`customTask${showDisabled ? "" : "?enabled=true"}`, showDisabled],
    fetchCustomTasks
  );
  function getCustomTaskLogicRole(customTaskId) {
    const customTask = customTasks?.find((ct) => ct.id === customTaskId);
    return customTask?.logicRole;
  }
  function getCustomTaskByLogicRole(logicRole) {
    return customTasks?.find((ct) => ct.logicRole === logicRole);
  }
  function getCustomTaskById(customTaskId) {
    return customTasks?.find((ct) => ct.id === customTaskId);
  }
  return {
    getCustomTaskLogicRole,
    getCustomTaskByLogicRole,
    getCustomTaskById,
    customTasks,
    mutate,
    setShowDisabled,
    showDisabled
  };
};
