import { MessagingTemplate } from "@bloobirds-it/types";
import { atom, useRecoilState } from "recoil";
import useSWR from "swr";

import { api } from "../utils/api";
import { keepPreviousResponse } from "../utils/swr";

const messagingNameFilter = atom({
  key: 'messagingNameFilterExt',
  default: null,
});

export const useActiveMessagingNameFilter = () => useRecoilState(messagingNameFilter);

const searchMessagingTemplates = ([url, ...filters]: [url: string, ...filters: string[]]) => {
  return api
    .post(`${url}?sort=updateDatetime%2Cdesc&&page=0&&size=${filters[5]}`, {
      type: filters[0],
      stage: filters[1],
      visibility: filters[2],
      name: filters[3] || '',
      segmentationValues: JSON.parse(filters[4]),
      usedInCadences: filters[6],
      onlyMine: filters[7],
    })
    .then(res => res?.data);
};

interface UseMessagingTemplatesOptions {
  segmentationValues: any;
  stage?: string;
  type: string;
  name: string;
  size: number;
  page: number;
  visibility: string;
  showCadencesTemplates?: boolean;
  onlyMine: boolean;
}

export const useMessagingTemplates = (filters: UseMessagingTemplatesOptions) => {
  const {
    segmentationValues,
    stage,
    type,
    size,
    onlyMine,
    visibility,
    showCadencesTemplates,
  } = filters;
  const [name] = useActiveMessagingNameFilter();

  const { data, error, mutate, isValidating } = useSWR<Array<MessagingTemplate>>(
    [
      '/messaging/messagingTemplates/search',
      type,
      stage,
      visibility,
      name,
      JSON.stringify(segmentationValues),
      size,
      showCadencesTemplates,
      onlyMine,
    ],
    searchMessagingTemplates,
    { use: [keepPreviousResponse] },
  );

  return {
    messagingTemplates: data || [],
    isLoading: isValidating,
    isError: error,
    mutate,
  };
};
