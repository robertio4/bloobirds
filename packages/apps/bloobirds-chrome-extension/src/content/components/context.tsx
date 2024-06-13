import { createContext, ReactElement, useContext, useEffect, useMemo } from 'react';

import {
  useLazyRef,
  useSessionStorage,
  useUserHelpers,
  useLocalStorage,
} from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectId,
  BobjectType,
  BobjectTypes,
  ContactViewTab,
  ContactViewSubTab,
  DataModelResponse,
  ExtensionBobject,
  ExtensionCompany,
  ExtensionHelperKeys,
  ExtensionOpportunity,
  LinkedInLead,
  MainBobjectTypes,
  MessagesEvents,
  QuickFilter,
  Settings,
  WhatsappLead,
  SessionStorageKeys,
} from '@bloobirds-it/types';
import { api, getPluralBobjectName, injectReferencesGetProcess } from '@bloobirds-it/utils';
import { AxiosResponse } from 'axios';
import { KeyedMutator } from 'swr';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

import { ExtendedContext } from '../../types/extendedContext';
import { Clusters } from './extensionLeftBar/components/views/newTasksView/types';
import { Stages } from './extensionLeftBar/components/views/view.utils';

export interface ContextBobjects {
  company: ExtensionCompany;
  parentCompany: ExtensionCompany;
  childCompanies: ExtensionCompany[];
  leads: LinkedInLead[];
  // TODO: Make opp interface
  opportunities: any;
  numberOfLeads: number;
  numberOfChildCompanies: number;
  numberOfOpportunities: number;
  bobjectIds: string[];
}

interface ContextValues {
  activeBobject: Bobject<MainBobjectTypes> | ExtensionBobject;
  activeBobjectContext: ContextBobjects;
  activeBobjectListeners: Record<BobjectType, Set<() => void>>;
  activeSubTab?: ContactViewSubTab;
  activeTab: ContactViewTab;
  collapsedSidePeek?: boolean;
  contactViewBobjectId: string;
  currentPage: string;
  currentTask: Bobject;
  customPage?: JSX.Element;
  dataModel: DataModelResponse;
  duplicatesDetected?: {
    source: 'WHATSAPP' | string;
    duplicatedField?: string;
    bobjectId: string;
    bobjects?: Bobject[];
  };
  extendedContext: ExtendedContext;
  history?: any[];
  isSettings: boolean;
  loading: boolean;
  loggedIn: boolean;
  noMatchFound: {
    source: 'WHATSAPP' | string;
    info?: {
      name: string;
      number: string;
    };
    bobjects?: Bobject[];
  };
  openStartTasksNavigation: {
    open: boolean;
    stage: Stages;
    quickFilter: QuickFilter;
    cluster?: keyof Clusters;
  };
  salesforceSyncMutate: KeyedMutator<
    AxiosResponse<ExtensionCompany | LinkedInLead | ExtensionOpportunity, any>
  >;
  settings: Settings;
  sidePeekEnabled?: boolean;
  taskId: string;
  whatsappLead?: WhatsappLead;
}

type ContextType = {
  setState: (key: string, value: any) => void;
  snapshot: () => ContextValues;
  emit: () => void;
  subscribe: (callback: () => void) => () => void;
};

const ExtensionContext = createContext<ContextType>(null);

function useExtensionContextStore() {
  const context = useContext(ExtensionContext);
  if (context === undefined) {
    throw new Error('useExtensionContext must be used within a ExtensionProvider');
  }
  return context;
}

function useExtensionContext() {
  const store = useExtensionContextStore();
  const { set } = useSessionStorage();
  const { set: setLocal } = useLocalStorage();
  const { has, save, reset } = useUserHelpers();

  function useGetExtensionContext<R>(selector: (state: ContextValues) => R) {
    const cb = () => selector(store.snapshot());
    return useSyncExternalStore<R>(store.subscribe, cb, cb);
  }

  const closeExtendedScreen = () => {
    store.setState('extendedContext', { open: false });
  };

  const setNoMatchFound = (noMatchFound: ContextValues['noMatchFound']) => {
    closeExtendedScreen();
    store.setState('noMatchFound', null);
    store.setState('noMatchFound', noMatchFound);
  };

  const setContactViewBobjectId = (id: BobjectId['value']) => {
    setNoMatchFound(null);
    store.setState('duplicatesDetected', false);
    const activeBobject = store.snapshot().activeBobject;
    store.setState('activeTab', null);
    setIsSettings(false);
    if (id === null) {
      store.setState('activeBobject', null);
      store.setState('contactViewBobjectId', id);
    } else if (id !== activeBobject?.id?.value) {
      const bobjectId = id;
      const bobjectType = bobjectId?.split('/')?.[1];
      const objectId = bobjectId?.split('/')?.[2];
      const pluralBobjectType = getPluralBobjectName(bobjectType, 2);
      if (pluralBobjectType) {
        store.setState('loading', true);
        api.get(`/linkedin/${pluralBobjectType?.toLowerCase()}/${objectId}`).then(data => {
          const bobject: ExtensionBobject = data?.data;
          if (bobject?.id?.value) {
            store.setState('activeBobject', bobject);
            store.setState('contactViewBobjectId', id);

            api.get(`/linkedin/context/${bobjectType}/${objectId}`).then(data => {
              const activeBobjectContext = data?.data;
              const currentActiveBobject = store.snapshot().activeBobject;
              const currentActiveBobjectContext = store.snapshot().activeBobjectContext;

              if (activeBobjectContext) {
                // Controls if a refresh and set new active bobject are called with different bobjects IDs
                // before setting the context requested from BE we must check that the current active bobject
                // belongs to that context. This condition must only be checked when we already have a context
                // and an activeBobject. The bug of this fix is reproduced by searching different bobjects from dialer.
                if (
                  currentActiveBobjectContext &&
                  currentActiveBobject &&
                  activeBobjectContext?.bobjectIds?.length > 0 &&
                  !activeBobjectContext?.bobjectIds?.includes(currentActiveBobject?.id?.value)
                ) {
                  store.setState('loading', false);
                  return;
                }
                store.setState('activeBobjectContext', activeBobjectContext);
                store.setState('loading', false);

                window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension));
              }
            });
          }
        });
      }
    }
  };

  const refreshActiveBobjectContext = () => {
    const activeBobject = store.snapshot().activeBobject;
    if (activeBobject) {
      const bobjectType = activeBobject?.id?.typeName;
      const objectId = activeBobject?.id?.objectId;
      api.get(`/linkedin/context/${bobjectType}/${objectId}`).then(data => {
        const activeBobjectContext = data?.data;
        const currentActiveBobject = store.snapshot().activeBobject;
        const currentActiveBobjectContext = store.snapshot().activeBobjectContext;

        if (activeBobjectContext) {
          if (
            // See comment above
            currentActiveBobjectContext &&
            currentActiveBobject &&
            activeBobjectContext?.bobjectIds?.length > 0 &&
            !activeBobjectContext?.bobjectIds?.includes(currentActiveBobject?.id?.value)
          ) {
            store.setState('loading', false);
            return;
          }
          store.setState('activeBobjectContext', activeBobjectContext);
        }
      });
    }
  };

  const launchBobjectSideEffects = (bobjectType: BobjectType) => {
    const listeners = store.snapshot().activeBobjectListeners;
    if (listeners[bobjectType]) {
      listeners[bobjectType].forEach(cb => cb());
    }
  };

  const refreshExtendedScreenBobject = () => {
    const currentExtendedContext = store.snapshot().extendedContext;
    if (currentExtendedContext?.bobject?.id?.value) {
      api
        .get(`/bobjects/${currentExtendedContext?.bobject?.id?.value}/form?injectReferences=true`)
        .then(data => {
          const bobject = injectReferencesGetProcess(data?.data);
          if (bobject) {
            store.setState('extendedContext', {
              ...currentExtendedContext,
              bobject,
            });
          }
        });
    }
  };

  const setActiveBobject = (
    activeBobject: Bobject | ExtensionBobject,
    activeTab?: ContactViewTab,
    uploadContext = true,
  ) => {
    store.setState('activeBobject', activeBobject);
    store.setState('activeTab', activeTab);
    if (activeBobject && uploadContext) {
      store.setState('activeBobjectContext', null);
      api
        .get(`/linkedin/context/${activeBobject?.id?.typeName}/${activeBobject?.id?.objectId}`)
        .then(data => {
          const activeBobjectContext = data?.data;
          const currentActiveBobject = store.snapshot().activeBobject;
          const currentActiveBobjectContext = store.snapshot().activeBobjectContext;

          if (activeBobjectContext) {
            // See comment above
            if (
              currentActiveBobject &&
              currentActiveBobjectContext &&
              activeBobjectContext?.bobjectIds?.length > 0 &&
              !activeBobjectContext?.bobjectIds?.includes(currentActiveBobject?.id?.value)
            ) {
              return;
            }
            store.setState('activeBobjectContext', activeBobjectContext);
          } else {
            store.setState('activeBobjectContext', null);
          }
        });
    }
  };

  const updateActiveBobject = (bobject: Bobject | ExtensionBobject) => {
    const activeBobject = store.snapshot().activeBobject;
    if (activeBobject?.id?.value === bobject?.id?.value) {
      const uploadContext = false;
      setActiveBobject(bobject, null, uploadContext);

      launchBobjectSideEffects(bobject?.id?.typeName);
      launchBobjectSideEffects(BobjectTypes.Task);
      launchBobjectSideEffects(BobjectTypes.Activity);
    }
  };

  const setSidePeekEnabled = (enabled: boolean) => {
    store.setState('sidePeekEnabled', enabled);
    if (enabled) {
      setLocal(ExtensionHelperKeys.SIDEPEEK_DISABLED, false);
      reset(ExtensionHelperKeys.SIDEPEEK_DISABLED);
    } else {
      setLocal(ExtensionHelperKeys.SIDEPEEK_DISABLED, true);
      save(ExtensionHelperKeys.SIDEPEEK_DISABLED);
    }
  };

  const setIsSettings = (isSettings: boolean) => {
    store.setState('isSettings', isSettings);
    set(SessionStorageKeys.IsSettings, isSettings);
  };

  return {
    useGetExtensionContext,
    useGetCurrentPage: () => useGetExtensionContext(state => state.currentPage),
    setCurrentPage: (currentPage: string) => store.setState('currentPage', currentPage),
    useGetLoggedIn: () => useGetExtensionContext(state => state.loggedIn),
    setLoggedIn: loggedIn => store.setState('loggedIn', loggedIn),
    useGetDataModel: () => useGetExtensionContext(state => state.dataModel),
    useGetSettings: () => useGetExtensionContext(state => state.settings),
    updateSettings: (settings: Settings) => store.setState('settings', settings),
    // This state is used to force showing a custom contact view, don't use it to know the active bobject id.
    useGetContactViewBobjectId: () => useGetExtensionContext(state => state.contactViewBobjectId),
    useGetActiveBobject: () => useGetExtensionContext(state => state.activeBobject),
    setActiveBobject,
    updateActiveBobject,
    history: useGetExtensionContext(state => state.history) || [],
    setHistory: history => {
      store.setState('history', history);
    },
    addBobjectToHistory: bobject => {
      const history = store.snapshot().history;
      if (bobject) {
        const newObject = {
          activeBobject: bobject,
          activeTab: bobject.id.type,
          activeSubTab: 'Overview',
        };
        store.setState('history', [...history, newObject]);
      }
    },
    useGetActiveBobjectContext: () => useGetExtensionContext(state => state.activeBobjectContext),
    useGetForcedActiveTab: () => useGetExtensionContext(state => state.activeTab),
    useGetForcedActiveSubTab: () => useGetExtensionContext(state => state.activeSubTab),
    setContactViewBobjectId,
    useGetIsLoading: () => useGetExtensionContext(state => state.loading),
    setIsLoading: loading => store.setState('loading', loading),
    useGetNoMatchFound: () => useGetExtensionContext(state => state.noMatchFound),
    setNoMatchFound: setNoMatchFound,
    useGetDuplicatesDetected: () => useGetExtensionContext(state => state.duplicatesDetected),
    setDuplicatesDetected: duplicatesDetected =>
      store.setState('duplicatesDetected', duplicatesDetected),
    setCurrentTask: (task: Bobject) => store.setState('currentTask', task),
    useGetCurrentTask: () => useGetExtensionContext(state => state.currentTask),
    useGetExtendedContext: () => useGetExtensionContext(state => state.extendedContext),
    setExtendedContext: (newExtendedContext: ExtendedContext) => {
      const extendedContext = store.snapshot().extendedContext;
      if (
        newExtendedContext === null ||
        newExtendedContext.bobject === null ||
        (extendedContext?.bobject?.id?.value &&
          extendedContext?.bobject?.id?.value === newExtendedContext?.bobject?.id?.value) ||
        (extendedContext?.template?.id &&
          extendedContext?.template?.id === newExtendedContext?.template?.id)
      ) {
        store.setState('extendedContext', { open: false });
      } else {
        store.setState('extendedContext', { ...newExtendedContext, open: true });
      }
    },
    closeExtendedScreen: closeExtendedScreen,
    refreshExtendedScreenBobject,
    openExtendedScreen: (extendedContext: ExtendedContext) => {
      store.setState('extendedContext', { ...extendedContext, open: true });
    },
    subscribeListener: (bobjectType: BobjectType, callback: () => void) => {
      const listeners = store.snapshot().activeBobjectListeners;
      if (!listeners[bobjectType]) {
        listeners[bobjectType] = new Set();
      }
      listeners[bobjectType].add(callback);
      store.setState('activeBobjectListeners', listeners);
    },
    unsuscribeListener: (bobjectType: BobjectType, callback: () => void) => {
      const listeners = store.snapshot().activeBobjectListeners;
      if (listeners[bobjectType]) {
        listeners[bobjectType].delete(callback);
      }
      store.setState('activeBobjectListeners', listeners);
    },
    launchBobjectSideEffects,
    refreshActiveBobjectContext,
    useGetOpenStartTasksNavigation: () =>
      useGetExtensionContext(state => state.openStartTasksNavigation),
    setOpenStartTasksNavigation: openStartTasksNavigation => {
      const { open } = openStartTasksNavigation;
      store.setState('openStartTasksNavigation', openStartTasksNavigation);
      set(SessionStorageKeys.OpenStartTasksNavigation, openStartTasksNavigation);
      if (!open) {
        set(SessionStorageKeys.IndexSelectedTask, 0);
      }
      window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension));
    },
    useGetTaskId: () => useGetExtensionContext(state => state.taskId),
    setTaskId: taskId => store.setState('taskId', taskId),
    setCustomPage: (el: ReactElement) => store.setState('customPage', el),
    useGetCustomPage: () => useGetExtensionContext(state => state.customPage),
    useGetSalesforceSyncMutate: () => useGetExtensionContext(state => state.salesforceSyncMutate),
    setSalesforceSyncMutate: salesforceSyncMutate =>
      store.setState('salesforceSyncMutate', salesforceSyncMutate),
    setSidePeekEnabled,
    toggleSidePeek: () => {
      const sidePeekEnabled = store.snapshot().sidePeekEnabled;
      setSidePeekEnabled(!sidePeekEnabled);
    },
    useGetSidePeekEnabled: () => {
      const sidePeekEnabled = useGetExtensionContext(state => state.sidePeekEnabled);
      if (sidePeekEnabled === null) {
        const sidePeekHelper = !has(ExtensionHelperKeys.SIDEPEEK_DISABLED);
        store.setState('sidePeekEnabled', sidePeekHelper);
        return sidePeekHelper;
      }
      return sidePeekEnabled;
    },
    useGetWhatsappLead: () => useGetExtensionContext(state => state.whatsappLead),
    setWhatsappLead: (whatsappLead: WhatsappLead) => {
      store.setState('whatsappLead', whatsappLead);
    },
    setForcedActiveSubTab: (activeSubTab: ContactViewSubTab) => {
      store.setState('activeSubTab', activeSubTab);
      const activeBobject = store.snapshot().activeBobject;
      // It isn't the best but is the only way to force the update of the contact view
      store.setState('activeBobject', null);
      store.setState('activeBobject', activeBobject);
    },
    useGetIsSettings: () => useGetExtensionContext(state => state.isSettings),
    updateIsSettings: () => {
      const isSettings = !store.snapshot().isSettings;
      store.setState('isSettings', isSettings);
      set(SessionStorageKeys.IsSettings, isSettings);
    },
    setIsSettings,
  };
}

function ExtensionProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ContextValues;
}) {
  const listener = useLazyRef<Set<() => void>>(() => new Set());

  const state = useLazyRef<ContextValues>(() => {
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

  useEffect(() => {
    if (!state.current.dataModel && value.dataModel) {
      store.setState('dataModel', value.dataModel);
    }
  }, [value.dataModel]);

  // @ts-ignore
  return <ExtensionContext.Provider value={store}>{children}</ExtensionContext.Provider>;
}

export { ExtensionProvider, useExtensionContext };
