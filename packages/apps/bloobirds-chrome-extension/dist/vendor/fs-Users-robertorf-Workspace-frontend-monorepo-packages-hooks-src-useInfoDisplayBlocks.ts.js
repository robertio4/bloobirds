import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { api, keepPreviousResponse } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
const fetchDisplayBlock = async ([key, language]) => {
  const response = await api.get(
    `/utils/service/info-display-block/${key}/${language}`
  );
  return response.data;
};
export const useGetInfoDisplayBlockByKey = (key) => {
  const { i18n } = useTranslation();
  const language = i18n.language || "en";
  const { data: tooltipContent, isLoading } = useSWR(
    [key, language],
    fetchDisplayBlock,
    { use: [keepPreviousResponse] }
  );
  return {
    tooltipContent,
    isLoading
  };
};
const fetchAllDisplayBlocks = async () => {
  const response = await api.get("/utils/service/info-display-block/all");
  return response.data;
};
export const useAllInfoDisplayBlocks = () => {
  const { data, mutate } = useSWR("/utils/service/info-display-block/all", fetchAllDisplayBlocks, {
    use: [keepPreviousResponse]
  });
  return {
    infoDisplayBlocks: data || [],
    mutate
  };
};
