import { sortBy } from 'lodash';
import useSWR from 'swr';

import { api } from '../utils/api';

const fetchSegmentations = async ([url, stage]) => {
  const response = await api
    .get(`${url}?stage=${stage}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: {},
    })
    .then(res => res?.data);
  return sortBy(response, 'ordering');
};

export const useSegmentation = stage => {
  const { data: segmentations, mutate, error } = useSWR(
    ['/messaging/segmentations', stage],
    fetchSegmentations,
  );

  const updateSegmentations = async body => {
    await api.put(`/messaging/segmentations`, body);
    await mutate();
  };

  const createSegmentations = async body => {
    await api.post(`/messaging/segmentations/${stage}`, body);
    await mutate();
  };

  return {
    updateSegmentations,
    createSegmentations,
    segmentations: segmentations || [],
    isLoading: !segmentations && !error,
    mutate,
  };
};
