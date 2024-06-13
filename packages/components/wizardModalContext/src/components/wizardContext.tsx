import { createContext, useContext, useMemo } from 'react';

import { useLazyRef } from '@bloobirds-it/hooks';
import { Bobject, ExtensionBobject, MessagesEvents } from "@bloobirds-it/types";
import { useSyncExternalStore } from 'use-sync-external-store/shim';

import { WizardVisibilityType } from '../types/wizardModal';
import { useWizardMachine } from '../utils/wizardModalUtils';

interface ContextValues {
  accountId: string;
  bobject: Bobject;
  source: 'OTO' | 'APP';
}

interface ComplexContextValues extends ContextValues {
  [key: `wizard_${string}`]: {visible: boolean; bobject: Bobject | ExtensionBobject; [key:string]: any };

}

// eslint-disable-next-line prettier/prettier
type ContextType = {
  setState: (key: string, value: any) => void;
  snapshot: () => ComplexContextValues;
  emit: () => void;
  subscribe: (callback: () => void) => () => void;
};

const WizardContext = createContext<ContextType>(null);

function useWizardContextStore() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizardContextStore must be used within a ExtensionProvider');
  }
  return context;
}

function useWizardContext() {
  const store = useWizardContextStore();

  function getState<R>(selector: (state: ComplexContextValues) => R) {
    const cb = () => selector(store.snapshot());
    return useSyncExternalStore<R>(store.subscribe, cb, cb);
  }

  function resetWizardProperties(key: string) {
    store.setState(`wizard_${key}`, { visible: false, bobject: null });
  }

  function setWizardProperties(key: string, visibilityContext: WizardVisibilityType) {
    store.setState(`wizard_${key}`, visibilityContext);
  }

  function addMetaToWizardProperties(key: string, meta: { [label: string]: any } = {}) {
    const wizardProperties = store.snapshot()?.[`wizard_${key}`];
    for (const label in meta) {
      wizardProperties[label] = meta[label];
    }
    store.setState(`wizard_${key}`, wizardProperties);
  }

  function getWizardProperties(key: string): WizardVisibilityType {
    const wizardKey = `wizard_${key}`;
    const wizardProperties = getState(state => state[wizardKey]);
    if (wizardProperties) {
      return wizardProperties;
    } else {
      resetWizardProperties(key);
      return { visible: false, bobject: null };
    }
  }

  function openWizard(
    wizardKey: string,
    bobject: Bobject | ExtensionBobject,
    meta: { [label: string]: any } = {},
  ) {
    if (store.snapshot()?.[`wizard_${wizardKey}`]?.visible) return
    const wizardProperties: { [key: string]: any } = { visible: true, bobject: bobject };
    for (const label in meta) {
      wizardProperties[label] = meta[label];
    }
    window.dispatchEvent(new CustomEvent(MessagesEvents.MinimizeDialer));
    store.setState(`wizard_${wizardKey}`, wizardProperties);
  }

  const { getMachine, hasCustomWizardsEnabled, wizardsMap, getButtonStepConfig, getMetaInfoStep } = useWizardMachine(
    getState(state => state.accountId),
    getState(state => state.source),
  );

  return {
    accountId: getState(state => state.accountId),
    hasCustomWizardsEnabled,
    getMachine,
    getButtonStepConfig,
    wizardsMap,
    getWizardProperties,
    setWizardProperties,
    resetWizardProperties,
    openWizard,
    addMetaToWizardProperties,
    getMetaInfoStep,
  };
}

function WizardProvider({ children, value }: { children: React.ReactNode; value: ComplexContextValues }) {
  const listener = useLazyRef<Set<() => void>>(() => new Set());

  const state = useLazyRef<ComplexContextValues>(() => {
    return value;
  });

  const store = useMemo<ContextType>(() => {
    return {
      setState: (key, value) => {
        // @ts-ignore
        if (Object.is(state.current[key], value)) {
          return;
        }
        // @ts-ignore
        state.current[key] = value;
        store.emit();
      },
      snapshot: () => state.current,
      subscribe: callback => {
        listener.current.add(callback);
        return () => listener.current.delete(callback);
      },
      emit: () => listener.current.forEach(cb => cb()),
    };
  }, []);

  return <WizardContext.Provider value={store}>{children}</WizardContext.Provider>;
}

export { WizardProvider, useWizardContext };
