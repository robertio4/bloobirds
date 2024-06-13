import { ServiceApi } from '../misc/api/service';
import useSWR from 'swr';

const fetchBobjectFields = url =>
  ServiceApi.request({
    url,
    method: 'GET',
  });

export const useBobjectFields = (bobjectType, showHiddenValues = false) => {
  const { data } = useSWR(
    bobjectType
      ? `/service/view/field/groups/${bobjectType}?showHiddenPicklistValues=${showHiddenValues}`
      : null,
    fetchBobjectFields,
  );

  return data || {}; //TODO: review or: should always return data
};
