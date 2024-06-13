import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useToasts } from '@bloobirds-it/flamingo-ui';
import {
  Bobject,
  BobjectTypes,
  FIELDS_LOGIC_ROLE,
  PluralBobjectTypes,
  UseEveryBobjectType,
} from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';

const useStopCadence = (bobject: Bobject) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createToast } = useToasts();
  const isBulk = Array.isArray(bobject);
  const { t } = useTranslation('translation', { keyPrefix: 'cadence.hooks' });

  const setRequest = (useEveryBobject: UseEveryBobjectType) => {
    let request;
    if (isBulk) {
      const bobjectType = bobject[0]?.id?.typeName;
      if (useEveryBobject?.isActive) {
        request = {
          url: '/bobjects/bulkAction/createBulkByQuery',
          body: {
            importName: `Update Assigned To in ${useEveryBobject?.total} ${PluralBobjectTypes[bobjectType]}`,
            actionType: 'UPDATE',
            bobjectType,
            ...{
              query: { query: useEveryBobject.query },
            },
            contents: {
              [FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO]: useEveryBobject.assigneeId,
            },
          },
        };
      } else {
        const body =
          bobject.map(element => {
            const bobjectToWorkWith = element;
            return {
              bobjectId: bobjectToWorkWith?.id?.objectId,
              bobjectType: bobjectToWorkWith?.id?.typeName,
            };
          }) || [];
        request = {
          url: `/messaging/cadences/stop`,
          body,
        };
      }
    } else {
      const bobjectToWorkWith = bobject;
      request = {
        url:
          bobjectToWorkWith?.id.typeName !== BobjectTypes.Activity &&
          `/messaging/cadences/${bobjectToWorkWith?.id?.typeName}/${bobjectToWorkWith?.id?.objectId}/stop`,
      };
    }
    return request;
  };

  const stopCadence = async (useEveryBobject: UseEveryBobjectType) => {
    setIsSubmitting(true);
    const request = setRequest(useEveryBobject);
    const response = await api.put(request?.url, request?.body);
    if ([200, 204].includes(response.status)) {
      setIsSubmitting(false);
      createToast({
        message: t('stopSuccessToast', { count: isBulk ? bobject?.length : 1 }),
        type: 'success',
      });
    } else {
      setIsSubmitting(false);
      createToast({
        message: t('stopErrorToast'),
        type: 'error',
      });
    }
  };

  return {
    isSubmitting,
    stopCadence,
  };
};

export default useStopCadence;
