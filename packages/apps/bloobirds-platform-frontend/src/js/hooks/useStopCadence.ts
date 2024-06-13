import { useState } from 'react';

import { useToasts } from '@bloobirds-it/flamingo-ui';
import { BobjectTypes, Bobject } from '@bloobirds-it/types';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

import { api } from '../utils/api';
import { getReferencedBobject } from '../utils/bobjects.utils';
import useModalVisibility from './useModalVisibility';

interface bodyRequestType {
  importName: string;
  actionType: string;
  bobjectType: string;
  bobjectIds: string[];
}

interface requestType {
  url: string;
  body?: bodyRequestType;
  method?: 'post' | 'put';
}

const bobjectAtom = atom({
  key: 'cadenceToStopAtom',
  default: null,
});

const stopCadenceCallbackAtom = atom({
  key: 'stopCadenceCallbackAtom',
  default: null,
});

const itsSubBobject = bobject => {
  if (!bobject) return false;
  const sampleBobject = Array.isArray(bobject) ? bobject[0] : bobject;
  return (
    sampleBobject?.id?.typeName === BobjectTypes.Activity ||
    sampleBobject?.id?.typeName === BobjectTypes.Task
  );
};

const useStopCadence = () => {
  const { isOpen, openModal, closeModal } = useModalVisibility('stopCadence');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bobject, setBobject] = useRecoilState(bobjectAtom);
  const resetBobject = useResetRecoilState(bobjectAtom);
  const [stopCadenceCallback, setStopCadenceCallback] = useRecoilState(stopCadenceCallbackAtom);
  const { createToast } = useToasts();
  const isBulk = Array.isArray(bobject);

  const openStopCadenceModal = ({
    bobjectToSet,
    callback,
  }: {
    bobjectToSet: Bobject | Array<Bobject>;
    callback?: () => void;
  }) => {
    if (bobjectToSet) {
      setBobject(bobjectToSet);
    }
    setStopCadenceCallback(() => callback);
    if (!isOpen) {
      openModal();
    }
  };

  const closeStopCadenceModal = () => {
    if (isOpen) {
      closeModal();
      resetBobject();
    }
  };

  const setRequest = () => {
    let request: requestType;
    if (isBulk && Array.isArray(bobject)) {
      const bobjectIds =
        bobject.map(element => {
          const bobjectToWorkWith = itsSubBobject(element)
            ? getReferencedBobject(element)
            : element;
          return bobjectToWorkWith?.id?.objectId;
        }) || [];
      const bobjectToWorkWith = itsSubBobject(bobject[0])
        ? getReferencedBobject(bobject[0])
        : bobject[0];
      const body = {
        importName: 'Stop cadence of ' + bobject.length,
        actionType: 'STOP_CADENCE',
        bobjectType: bobjectToWorkWith?.id.typeName,
        bobjectIds,
      };
      request = {
        url: `/bobjects/bulkAction/createBulk`,
        body,
        method: 'post',
      };
    } else {
      const bobjectToWorkWith = itsSubBobject(bobject) ? getReferencedBobject(bobject) : bobject;
      request = {
        url:
          !itsSubBobject(bobjectToWorkWith) &&
          `/messaging/cadences/${bobjectToWorkWith?.id?.typeName}/${bobjectToWorkWith?.id?.objectId}/stop`,
        method: 'put',
      };
    }
    return request;
  };

  const stopCadence = async () => {
    setIsSubmitting(true);
    const request = setRequest();
    const response = await api[request.method](request?.url, request?.body);
    if ([200, 201, 204].includes(response.status)) {
      closeStopCadenceModal();
      setIsSubmitting(false);
      createToast({
        message: `${isBulk ? 'Cadences have' : 'Cadence has'} been successfully stopped`,
        type: 'success',
      });
      if (isBulk && typeof stopCadenceCallback === 'function') stopCadenceCallback();
    } else {
      closeStopCadenceModal();
      setIsSubmitting(false);
      createToast({
        message: 'There was an error stopping the cadence, please try again!',
        type: 'error',
      });
    }
  };

  return {
    bobject,
    isOpen,
    isSubmitting,
    openStopCadenceModal,
    closeStopCadenceModal,
    stopCadence,
  };
};

export default useStopCadence;
