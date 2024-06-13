import useSWR from "swr";
import { api } from "@bloobirds-it/utils";
import { BobjectType, TemplateStage } from "@bloobirds-it/types";

const fetchQualifyingQuestions = async ([url, ...filters]: [url: string, ...filters: any]) => {
  const body = {
    bobjectType: filters[0],
    name: filters[1] || '',
    stage: filters[2],
    enabled: filters[3],
    segmentationValues: JSON.parse(filters[4]),
  };
  return api.post(`${url}?sort=updateDatetime%2Cdesc`, body).then(response => response?.data);
};

export type QualifyingQuestionsType = {
  name?: string;
  enabled?: boolean;
  stage?: TemplateStage;
  segmentationValues?: object;
  bobjectType?: BobjectType;
};
function getRequestBody(newQQData) {
  if (Array.isArray(newQQData)) {
    let dataToSave = {};
    newQQData.forEach(qq => {
      dataToSave = {
        ...dataToSave,
        [qq?.id]: qq?.value,
      };
    });
    return dataToSave;
  } else {
    return newQQData;
  }
}

const updateQualifyingQuestionsValue = (bobject, newQQData) => {
  const bobjectId = bobject.id.objectId;
  const accountId = bobject.id.accountId;
  const bobjectType = bobject.id.typeName;

  return api.patch(`/bobjects/${accountId}/${bobjectType}/bulk`, {
    [bobjectId]: getRequestBody(newQQData),
  });
};

export const useQualifyingQuestions = (filters: QualifyingQuestionsType = {}) => {
  const {
    name,
    enabled,
    stage = TemplateStage.Prospecting,
    segmentationValues = {},
    bobjectType,
  } = filters;
  const url = '/messaging/qualifyingQuestions/search';
  const { data, isValidating } = useSWR(
    [url, bobjectType, name, stage, enabled, JSON.stringify(segmentationValues)],
    fetchQualifyingQuestions,
  );

  return {
    qualifyingQuestions: data || [],
    isLoading: isValidating,
    updateQualifyingQuestionsValue,
  };
};
