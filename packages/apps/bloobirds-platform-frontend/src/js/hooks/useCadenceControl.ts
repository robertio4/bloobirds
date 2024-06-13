import { useState } from 'react';

import { usePreviousUrl } from '@bloobirds-it/hooks';
import { UserHelperKeys, BOBJECT_TYPES, Bobject, BobjectTypes } from '@bloobirds-it/types';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

import { STEPS } from '../components/cadenceControlModal/cadenceControlModal.machine';
import { api } from '../utils/api';
import { useActiveCompany } from './useActiveCompany';
import { useOpportunity } from './useOpportunity';
import { useQueryParams } from './useQueryParams';
import { useRouter } from './useRouter';
import { useSelectedOpportunity } from './useSelectedOpportunity';
import { useUserHelpers } from './useUserHelpers';

const cadenceControlOpenAtom = atom({
  key: 'cadenceControlOpen',
  default: false,
});

const bobjectAtom = atom({
  key: 'cadenceControlBobjectAtom',
  default: null,
});

const stepAtom = atom({
  key: 'cadenceControlStepAtom',
  default: {
    previousStep: true,
    step: null,
  },
});

const nextStepAtom = atom({
  key: 'cadenceControlNextStepAtom',
  default: 'anything',
});

const saveCadenceCallbackAtom = atom({
  key: 'cadenceControlSaveCadenceCallback',
  default: null,
});

const putStartCadence = ({ bobjectId, bobjectType, startCadence, cadenceId }) => {
  return api.put(`/messaging/cadences/${cadenceId}/start`, {
    bobjectId,
    bobjectType,
    startCadence,
  });
};

const putBulkCadence = ({ startCadence, cadenceId, bobjects }) => {
  const bobjectIds = bobjects.map(bobject => bobject?.id.objectId);
  const body = {
    importName: 'Start cadence of ' + bobjects.length,
    actionType: 'START_CADENCE',
    bobjectType: bobjects[0]?.id?.typeName,
    bobjectIds,
    cadenceId: cadenceId,
    startCadenceDate: startCadence,
  };
  return api.post(`/bobjects/bulkAction/createBulk`, body);
};

const putStopCadence = ({ bobjectId, bobjectType }) => {
  return (
    bobjectType !== BobjectTypes.Activity &&
    api.put(`/messaging/cadences/${bobjectType}/${bobjectId}/stop`)
  );
};

const isBulkAction = bobjectToCheck => Array.isArray(bobjectToCheck);

const useCadenceControlVisibility = () => {
  const [cadenceControlOpen, setCadenceControlOpen] = useRecoilState(cadenceControlOpenAtom);

  const openCadenceControlModal = () => {
    if (!cadenceControlOpen) {
      setCadenceControlOpen(true);
    }
  };

  const closeCadenceControlModal = () => {
    if (cadenceControlOpen) {
      setCadenceControlOpen(false);
    }
  };

  return {
    isOpen: cadenceControlOpen,
    openCadenceControlModal,
    closeCadenceControlModal,
  };
};

export const useCadenceControl = () => {
  const {
    closeCadenceControlModal,
    openCadenceControlModal,
    isOpen,
  } = useCadenceControlVisibility();
  const { save } = useUserHelpers();
  const [isSaving, setIsSaving] = useState(false);
  const [bobject, setBobject] = useRecoilState<Bobject>(bobjectAtom);
  const [steps, setSteps] = useRecoilState(stepAtom);
  const [nextStep, setNextStep] = useRecoilState(nextStepAtom);
  const [saveCadenceCallback, setSaveCadenceCallback] = useRecoilState(saveCadenceCallbackAtom);
  const resetBobject = useResetRecoilState(bobjectAtom);
  const resetNextStep = useResetRecoilState(nextStepAtom);
  const { fetchOpportunity } = useOpportunity('cadence-control');
  const queryParams = useQueryParams();
  const history = useRouter();
  const { setPreviousUrl, getPreviousUrl } = usePreviousUrl();
  const url = getPreviousUrl();
  const { selectedOpportunity } = useSelectedOpportunity();
  const { company: activeCompany } = useActiveCompany();

  const removeQueryParam = param => {
    if (queryParams.has(param)) {
      queryParams.delete(param);
      const newQueryParams = queryParams.toString();
      const historyState = {
        pathname: window.location.pathname,
        search: newQueryParams ? `?${newQueryParams}` : '',
      };

      history.replace(historyState);
      setPreviousUrl(url);
    }
  };

  const openCadenceControl = async (
    {
      previousStep,
      bobjectToSet,
      step = STEPS.NEXT_STEPS,
      response = null,
      onSaveCallback = null,
    } = {
      previousStep: true,
    },
  ) => {
    setSteps({
      ...steps,
      step,
      previousStep,
    });
    setSaveCadenceCallback(() => onSaveCallback);
    if (response && response?.typeName === BOBJECT_TYPES.OPPORTUNITY) {
      const opportunity = await fetchOpportunity(response?.objectId);
      setBobject(opportunity);
    }
    if (bobjectToSet) {
      setBobject(bobjectToSet);
    } else if (!response) {
      setBobject(selectedOpportunity || activeCompany);
    }

    openCadenceControlModal();
  };

  const stopCadence = callback => {
    if (isBulkAction(bobject)) {
      console.error('Not supported for bulk action');
    } else {
      putStopCadence({
        bobjectId: bobject?.id.objectId,
        bobjectType: bobject?.id.typeName,
      });
    }

    callback();
  };

  const saveCadence = (cadence, callback, date) => {
    setIsSaving(true);
    if (!isBulkAction(bobject)) {
      putStartCadence({
        bobjectId: bobject?.id.objectId,
        bobjectType: bobject?.id.typeName,
        startCadence: date,
        cadenceId: cadence,
      });
    } else {
      putBulkCadence({ startCadence: date, cadenceId: cadence, bobjects: bobject });
    }
    callback();
    save(UserHelperKeys.LAUNCH_YOUR_FIRST_CADENCE);
  };

  const resetCadenceControlInfo = () => {
    resetBobject();
    resetNextStep();
  };

  const closeCadenceControl = () => {
    removeQueryParam('showCadenceControl');
    closeCadenceControlModal();
  };

  return {
    bobject,
    isOpportunity: Array.isArray(bobject)
      ? bobject[0]?.id?.typeName === BOBJECT_TYPES.OPPORTUNITY
      : bobject?.id?.typeName === BOBJECT_TYPES.OPPORTUNITY,
    isOpen,
    isSaving,
    step: steps.step,
    previousStep: steps.previousStep,
    nextStep,
    closeCadenceControl,
    openCadenceControl,
    resetCadenceControlInfo,
    saveCadence,
    stopCadence,
    saveCadenceCallback,
    setSaveCadenceCallback,
    setBobject,
    setNextStep,
  };
};
