import useSWR from 'swr';

import { BobjectApi } from '../misc/api/bobject';
import { api } from '../utils/api';

const fetchQualifyingQuestions = async ([url, ...filters]) => {
  const body = {
    bobjectType: filters[0],
    name: filters[1] || '',
    stage: filters[2],
    enabled: filters[3],
    segmentationValues: JSON.parse(filters[4]),
  };
  return api.post(`${url}?sort=updateDatetime%2Cdesc`, body).then(response => response?.data);
};

// TODO: Create backend endpoint in new QQ controller
const submitPartialQQUpdate = (
  qualifyingQuestionID,
  newQualifyingQuestionValue,
  bobjectType,
  qualifyingQuestionId,
) => {
  if (bobjectType === 'Lead') {
    BobjectApi.request()
      .Lead()
      .partialSet({
        bobjectId: qualifyingQuestionId,
        data: {
          [qualifyingQuestionID]: newQualifyingQuestionValue,
        },
      });
  } else {
    BobjectApi.request()
      .Company()
      .partialSet({
        bobjectId: qualifyingQuestionId,
        data: {
          [qualifyingQuestionID]: newQualifyingQuestionValue,
        },
      });
  }
};

export const useQualifyingQuestions = (filters = {}) => {
  const { name, enabled, stage = 'PROSPECT', segmentationValues = {}, bobjectType } = filters;
  const url = '/messaging/qualifyingQuestions/search';
  const { data, error, isLoading } = useSWR(
    [url, bobjectType, name, stage, enabled, JSON.stringify(segmentationValues)],
    fetchQualifyingQuestions,
  );

  const updateQualifyingQuestionValue = (
    qualifyingQuestionID,
    newQualifyingQuestionValue,
    updateBobjectType,
    bobjectId,
  ) =>
    submitPartialQQUpdate(
      qualifyingQuestionID,
      newQualifyingQuestionValue,
      updateBobjectType,
      bobjectId,
    );

  const updateQualifyingQuestionsValueInBulk = (bobjectTypeElement, qualifyingQuestions) => {
    let dataToSave = {};
    qualifyingQuestions.forEach(qq => {
      dataToSave = {
        ...dataToSave,
        [qq?.bobjectId]: { ...dataToSave[qq?.bobjectId], [qq?.id]: qq?.value },
      };
    });
    return BobjectApi.request().bobjectType(bobjectTypeElement).bulkPartialSet(dataToSave);
  };

  return {
    qualifyingQuestions: data || [],
    isLoading,
    updateQualifyingQuestionValue,
    updateQualifyingQuestionsValueInBulk,
  };
};
