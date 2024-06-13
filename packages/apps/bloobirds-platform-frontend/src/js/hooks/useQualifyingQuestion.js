import useSWR from 'swr';

import { api } from '../utils/api';

const fetchQualifyingQuestion = url =>
  api
    .get(url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: {},
    })
    .then(res => res?.data);

const useQualifyingQuestion = id => {
  const { data, error, mutate, isValidating } = useSWR(
    id ? `/messaging/qualifyingQuestions/${id}` : null,
    fetchQualifyingQuestion,
  );

  const saveQualifyingQuestion = async payload => {
    const singleQQEndpoint = `/messaging/qualifyingQuestions/${payload.id}`;
    if (payload.id) {
      await api.put(singleQQEndpoint, payload);
    } else {
      await api.post(`/messaging/qualifyingQuestions`, payload);
    }
    await mutate();
  };

  return {
    saveQualifyingQuestion,
    qualifyingQuestion: data,
    isLoading: isValidating,
  };
};

export default useQualifyingQuestion;
