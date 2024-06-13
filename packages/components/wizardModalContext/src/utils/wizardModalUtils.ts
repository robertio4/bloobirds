import { useCustomWizards, useCustomWizardsEnabled } from '@bloobirds-it/hooks';
import { createMachine } from 'xstate';

import { useWizardCallbacks } from '../types/wizardCallbacks';
import {
  ButtonsStepConfig,
  DefaultWizardConfigs,
  MetaInfoStep,
  WIZARD_MODALS,
} from '../types/wizardModal';

export const useWizardMachine = (accountId: string, source: string) => {
  const hasCustomWizardsEnabled = useCustomWizardsEnabled(accountId);
  let { availableCustomWizards: wizardsMap } = useCustomWizards(
    accountId,
    hasCustomWizardsEnabled,
    source,
  );
  if (!hasCustomWizardsEnabled && !wizardsMap) {
    wizardsMap = {
      NEXT_STEP: null,
      MEETING_RESULT: null,
      CHANGE_STATUS: null,
    };
    if (source == 'APP') {
      wizardsMap.CONTACT_FLOW_APP = null;
    } else {
      wizardsMap.CONTACT_FLOW_OTO = null;
    }
  }
  function getActionsAndGuardsFromCustomWizard(json) {
    const actions = {};
    const conds = {};
    const { getCallback } = useWizardCallbacks();
    const parserActionsAndConds = (key, value) => {
      if (key === 'actions') {
        if (typeof value === 'string') {
          actions[value] = getCallback(value);
        } else if (Array.isArray(value)) {
          value.forEach(item => (actions[item] = getCallback(item)));
        }
      }

      if (key === 'cond') {
        conds[value] = getCallback(value);
      }
      return value;
    };

    JSON.parse(json, parserActionsAndConds);

    return { actions, conds };
  }
  const getMachine = (key: WIZARD_MODALS) => {
    if (!hasCustomWizardsEnabled || !wizardsMap || !wizardsMap[key]) {
      return createMachine(DefaultWizardConfigs[key as string]);
    } else {
      const { actions, conds } = getActionsAndGuardsFromCustomWizard(wizardsMap[key]);
      return createMachine(JSON.parse(wizardsMap[key]), {
        actions: actions,
        guards: conds,
      });
    }
  };

  const getButtonStepConfig = (metaInfo: any): ButtonsStepConfig => {
    const metaInfoStep = Object.keys(metaInfo).reduce((acc, key) => {
      const value = metaInfo[key];
      Object.assign(acc, value);
      return acc;
    }, {}) as ButtonsStepConfig;

    return {
      ...metaInfoStep,
      hasPreviousStep: false,
      hasNextStep: false,
    };
  };
  const getMetaInfoStep = (metaInfo: any): MetaInfoStep => {
    return Object.keys(metaInfo).reduce((acc, key) => {
      const value = metaInfo[key];
      Object.assign(acc, value);
      return acc;
    }, {});
  };

  return {
    getMachine,
    hasCustomWizardsEnabled,
    wizardsMap,
    getButtonStepConfig,
    getMetaInfoStep,
  };
};
