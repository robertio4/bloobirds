import { useEffect } from "react";

import { MessagesEvents, MessagingTemplate, TemplateStage } from "@bloobirds-it/types";
import { api } from "@bloobirds-it/utils";
import useSWR from "swr";

const searchMessagingTemplates = ([url, ...filters]: [url: string, ...filters: string[]]) => {
  return api
    .post(`${url}?sort=updateDatetime%2Cdesc&&page=0&&size=${filters[5]}`, {
      type: filters[0],
      stage: filters[1],
      visibility: filters[2],
      name: filters[3] || '',
      segmentationValues: filters[4] ? JSON.parse(filters[4]) : {},
      usedInCadences: filters[6],
      onlyMine: filters[7],
      onlyOfficials: filters[8],
      onlyBattlecards: filters[9],
    })
    .then(res => res?.data);
};

interface UseMessagingTemplatesOptions {
  segmentationValues: any;
  stage?: TemplateStage;
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

  const { data, error, mutate, isValidating } = useSWR<Array<MessagingTemplate>>(
    [
      '/messaging/messagingTemplates/search',
      type,
      stage,
      visibility,
      name,
      segmentationValues ? JSON.stringify(segmentationValues) : undefined,
      size,
      showCadencesTemplates,
      onlyMine,
      onlyOfficials,
      onlyBattlecards,
    ],
    searchMessagingTemplates,
    {
      revalidateOnFocus: false,
    },
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
    isError: error,
  };
};
