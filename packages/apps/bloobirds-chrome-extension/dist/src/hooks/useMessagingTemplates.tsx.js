var _s = $RefreshSig$(), _s2 = $RefreshSig$();
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { atom, useRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { keepPreviousResponse } from "/src/utils/swr.ts.js";
const messagingNameFilter = atom({
  key: "messagingNameFilterExt",
  default: null
});
export const useActiveMessagingNameFilter = () => {
  _s();
  return useRecoilState(messagingNameFilter);
};
_s(useActiveMessagingNameFilter, "VDCTAQFCdD2Dpt/Jk2KkHikgk1M=", false, function() {
  return [useRecoilState];
});
const searchMessagingTemplates = ([url, ...filters]) => {
  return api.post(`${url}?sort=updateDatetime%2Cdesc&&page=0&&size=${filters[5]}`, {
    type: filters[0],
    stage: filters[1],
    visibility: filters[2],
    name: filters[3] || "",
    segmentationValues: JSON.parse(filters[4]),
    usedInCadences: filters[6],
    onlyMine: filters[7]
  }).then((res) => res?.data);
};
export const useMessagingTemplates = (filters) => {
  _s2();
  const {
    segmentationValues,
    stage,
    type,
    size,
    onlyMine,
    visibility,
    showCadencesTemplates
  } = filters;
  const [name] = useActiveMessagingNameFilter();
  const {
    data,
    error,
    mutate,
    isValidating
  } = useSWR(["/messaging/messagingTemplates/search", type, stage, visibility, name, JSON.stringify(segmentationValues), size, showCadencesTemplates, onlyMine], searchMessagingTemplates, {
    use: [keepPreviousResponse]
  });
  return {
    messagingTemplates: data || [],
    isLoading: isValidating,
    isError: error,
    mutate
  };
};
_s2(useMessagingTemplates, "Abk8s2OqgBaT2ozuzuTKGcDD62w=", false, function() {
  return [useActiveMessagingNameFilter, useSWR];
});
