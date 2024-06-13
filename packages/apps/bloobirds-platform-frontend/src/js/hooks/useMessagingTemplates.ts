import useSWR from "swr";

import { MessagingTemplate } from "../typings/messaging";
import { api } from "../utils/api";

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
      onlyOfficials: filters[8],
      onlyBattlecards: filters[9],
    })
    .then(res => {
      return res?.data;
    });
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
  onlyOfficials?: boolean;
  onlyBattlecards?: boolean;
}

export const useMessagingTemplates = (filters: UseMessagingTemplatesOptions) => {
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
    showCadencesTemplates,
  } = filters;

  const { data, error, isValidating } = useSWR<Array<MessagingTemplate>>(
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
      onlyOfficials,
      onlyBattlecards,
    ],
    searchMessagingTemplates,
  );

  return {
    messagingTemplates: data || [],
    isLoading: isValidating,
    isError: error,
  };
};
