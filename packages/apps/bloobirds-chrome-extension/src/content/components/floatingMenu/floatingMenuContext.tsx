import React, { Context, createContext, ReactElement, useContext, useEffect, useMemo } from 'react';

import { useLazyRef, useLocalStorage } from '@bloobirds-it/hooks';
import { Bobject, Connections, ExtensionBobject, LocalStorageKeys } from '@bloobirds-it/types';
import { KeyedMutator } from 'swr';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

type FloatingMenuContextStoreState = {
  isHome: boolean;
  isDuplicatePage: boolean;
  customPage: ReactElement;
  updateSettings?: () => void;
  onRefresh: (activeBobject?: ExtensionBobject) => void;
  connections?: Connections;
  mutateConnections?: KeyedMutator<Connections>;
  goBack: () => void;
  showBackButton: boolean;
  meta: any;
  lastVisitedBobjects: Record<string, Bobject | ExtensionBobject>;
  position?: string;
};

type FloatingMenuContextStoreType = {
  setState: (key: string, value: any) => void;
  snapshot: () => FloatingMenuContextStoreState;
  emit: () => void;
  subscribe: (callback: () => void) => void;
};

const FloatingMenuContextStore = createContext<FloatingMenuContextStoreType>(null);

function useFloatingMenuContextStore() {
  const context = useContext<FloatingMenuContextStoreType>(
    FloatingMenuContextStore as Context<FloatingMenuContextStoreType>,
  );
  if (context === undefined) {
    throw new Error('useFloatingMenuContext must be used within a FloatingMenuProvider');
  }
  return context;
}

function useFloatingMenuContext() {
  const { set } = useLocalStorage();
  const store = useFloatingMenuContextStore();

  function getState<R>(selector: (state: FloatingMenuContextStoreState) => R) {
    const cb = () => selector(store.snapshot());
    // @ts-ignore
    return useSyncExternalStore<R>(store.subscribe, cb, cb);
  }

  return {
    getState,
    getIsHome: () => getState(state => state.isHome),
    setIsHome: (bool: boolean) => store.setState('isHome', bool),
    getIsDuplicatePage: () => getState(state => state.isDuplicatePage),
    setIsDuplicatePage: (bool: boolean) => store.setState('isDuplicatePage', bool),
    getPosition: () => getState(state => state.position),
    getConnections: () => getState(state => state.connections),
    getMutateConnections: () => getState(state => state.mutateConnections),
    getOnRefresh: () => getState(state => state.onRefresh),
    setGoBack: (goBack: () => void) => store.setState('goBack', goBack),
    getGoBack: () => getState(state => state.goBack),
    setShowBackButton: (bool: boolean) => store.setState('showBackButton', bool),
    getShowBackButton: () => getState(state => state.showBackButton),
    setLastVisitedBobject: (lastVisitedBobject: Bobject | ExtensionBobject) => {
      const lastVisitedBobjects = store.snapshot().lastVisitedBobjects;
      const lastVisitedBobjectsArray = Object.keys(lastVisitedBobjects).map(
        key => lastVisitedBobjects[key],
      );
      if (lastVisitedBobjectsArray.length === 15) {
        if (
          !lastVisitedBobjectsArray.find(
            bobject => bobject?.id?.value === lastVisitedBobject?.id?.value,
          )
        ) {
          lastVisitedBobjectsArray.pop();
        } else {
          lastVisitedBobjectsArray.splice(
            lastVisitedBobjectsArray.findIndex(
              bobject => bobject?.id?.value === lastVisitedBobject?.id?.value,
            ),
            1,
          );
        }
      }
      lastVisitedBobjectsArray.unshift(lastVisitedBobject);
      const newLastVisitedBobjects = lastVisitedBobjectsArray.reduce((acc, bobject) => {
        if (bobject && bobject.id) {
          return { ...acc, [bobject.id.value]: bobject };
        }
        return acc;
      }, {});
      set(LocalStorageKeys.LastVisitedBobjects, newLastVisitedBobjects);
      store.setState('lastVisitedBobjects', newLastVisitedBobjects);
    },
    getLastVisitedBobjects: () => getState(state => state.lastVisitedBobjects),
    setMeta: (data: any) => store.setState('meta', data),
    getMeta: () => getState(state => state.meta),
  };
}

const FloatingMenuProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: FloatingMenuContextStoreState;
}) => {
  const listener = useLazyRef<Set<() => void>>(() => new Set());
  const setState = (key, value) => {
    // @ts-ignore
    if (Object.is(state.current[key], value)) {
      return;
    }
    // @ts-ignore
    state.current[key] = value;
    store.emit();
  };
  const state = useLazyRef<FloatingMenuContextStoreState>(() => {
    return value;
  });
  useEffect(() => {
    setState('position', value.position);
  }, [value.position]);

  useEffect(() => {
    setState('onRefresh', value.onRefresh);
  }, [value.onRefresh]);

  const store = useMemo<FloatingMenuContextStoreType>(() => {
    return {
      setState,
      snapshot: () => state.current,
      subscribe: callback => {
        listener.current.add(callback);
        return () => listener.current.delete(callback);
      },
      emit: () => listener.current.forEach(cb => cb()),
    };
  }, []);

  return (
    <FloatingMenuContextStore.Provider value={store}>{children}</FloatingMenuContextStore.Provider>
  );
};

export { FloatingMenuProvider, useFloatingMenuContext, useFloatingMenuContextStore };
