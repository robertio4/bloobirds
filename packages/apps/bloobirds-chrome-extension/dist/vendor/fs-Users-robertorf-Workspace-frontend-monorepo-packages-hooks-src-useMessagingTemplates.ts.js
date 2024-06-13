import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"];
import { MessagesEvents } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
const searchMessagingTemplates = ([url, ...filters]) => {
  return api.post(`${url}?sort=updateDatetime%2Cdesc&&page=0&&size=${filters[5]}`, {
    type: filters[0],
    stage: filters[1],
    visibility: filters[2],
    name: filters[3] || "",
    segmentationValues: filters[4] ? JSON.parse(filters[4]) : {},
    usedInCadences: filters[6],
    onlyMine: filters[7],
    onlyOfficials: filters[8],
    onlyBattlecards: filters[9]
  }).then((res) => res?.data);
};
export const useMessagingTemplates = (filters) => {
  const {
    segmentationValues,
    stage,
    type,
    size,
    name,
    onlyMine,
    onlyOfficials,
    onlyBattlecards,
    visibility,
    showCadencesTemplates
  } = filters;
  const { data, error, mutate, isValidating } = useSWR(
    [
      "/messaging/messagingTemplates/search",
      type,
      stage,
      visibility,
      name,
      segmentationValues ? JSON.stringify(segmentationValues) : void 0,
      size,
      showCadencesTemplates,
      onlyMine,
      onlyOfficials,
      onlyBattlecards
    ],
    searchMessagingTemplates,
    {
      revalidateOnFocus: false
    }
  );
  useEffect(() => {
    window.addEventListener(MessagesEvents.PlaybookFeed, () => mutate());
    return () => {
      window.removeEventListener(MessagesEvents.PlaybookFeed, () => mutate());
    };
  }, []);
  return {
    messagingTemplates: data || [],
    isLoading: isValidating,
    isError: error
  };
};
