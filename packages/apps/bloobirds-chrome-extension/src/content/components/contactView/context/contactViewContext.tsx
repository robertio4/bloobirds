import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';

import { useActiveUserSettings, useSessionStorage } from '@bloobirds-it/hooks';
import {
  ContactViewContext,
  ContactViewSubTab,
  ContactViewTab,
  UserRole,
  UserPermission,
  ExtensionBobject,
  SessionStorageKeys,
} from '@bloobirds-it/types';

import { Actions } from '../../../../types/messages';
import { useExtensionContext } from '../../context';
import { useFloatingMenuContext } from '../../floatingMenu/floatingMenuContext';

const Context = createContext<Partial<ContactViewContext>>(null);

function ContactViewProvider({
  defaultContext,
  children,
}: {
  defaultContext: Partial<ContactViewContext>;
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<ContactViewTab>(defaultContext?.activeTab);
  const [activeSubTab, setActiveSubTab] = useState<ContactViewSubTab>(defaultContext?.activeSubTab);
  const { useGetActiveBobject, setActiveBobject, history, setHistory } = useExtensionContext();
  const activeBobject = useGetActiveBobject() as ExtensionBobject;
  const { getGoBack, setShowBackButton, setGoBack } = useFloatingMenuContext();
  const goBack = getGoBack();
  const { settings } = useActiveUserSettings();
  const userId = settings?.user?.id;
  const userRoles = settings?.user?.roles;
  const userPermissions = settings?.user?.permissions;
  const isAdminUser =
    userRoles?.includes(UserRole.GLOBAL_ADMIN) || userRoles?.includes(UserRole.ACCOUNT_ADMIN);
  //@ts-ignore
  const hasEditAllPermissions = userPermissions?.includes(UserPermission.EDIT_ALL);
  const [actionsDisabled, setActionsDisabled] = useState<boolean>(false);
  const { set } = useSessionStorage();

  const value: Partial<ContactViewContext> = {
    activeTab,
    setActiveTab,
    activeSubTab,
    setActiveSubTab,
    actionsDisabled,
  };

  useEffect(() => {
    setActionsDisabled(
      !isAdminUser &&
        !hasEditAllPermissions &&
        (userId !== activeBobject?.assignedTo || !activeBobject?.assignedTo),
    );
  }, [userRoles, userPermissions, activeBobject?.assignedTo]);

  useEffect(() => {
    chrome.runtime?.onMessage.addListener(message => {
      if (message.type === Actions.HistoryUpdate) {
        setShowBackButton(false);
      }
    });
  }, []);

  useEffect(() => {
    setShowBackButton(history.length > 1);
  }, [history]);

  useLayoutEffect(() => {
    setHistory([]);
  }, []);

  useEffect(() => {
    const oldContext = { activeTab, activeBobject, activeSubTab };
    if (history.length === 0 && activeBobject) {
      setHistory([...history, oldContext]);
    } else if (history.length > 0) {
      const {
        activeTab: lastActiveTab,
        activeBobject: lastActiveBobject,
        activeSubTab: lastActiveSubTab,
      } = history[history.length - 1];
      if (
        (lastActiveTab !== activeTab ||
          lastActiveSubTab !== activeSubTab ||
          lastActiveBobject?.id?.value !== activeBobject?.id?.value) &&
        activeBobject &&
        // @ts-ignore
        activeBobject.id.typeName === activeTab
      ) {
        setHistory([oldContext, ...history]);
        // Se ha comentado porque las onClick desde la leftBar hacen que se cierre la extendedScreen cuando no debería. Mejor colocarlo en el onClick correspondiente
        //closeExtendedScreen();
      }
    }
  }, [activeTab, activeBobject, activeSubTab]);

  useEffect(() => {
    if (history.length > 1 && goBack) {
      //Remove the first element of the array
      const lastPage = history.pop();
      setHistory([...history]);
      if (lastPage?.activeBobject?.id?.value) {
        setActiveBobject(lastPage.activeBobject);
      }
      if (lastPage?.activeSubTab) {
        setActiveSubTab(lastPage.activeSubTab);
      }
      if (lastPage?.activeTab) {
        setActiveTab(lastPage.activeTab);
      }
      setGoBack(undefined);
    }
  }, [goBack]);

  useEffect(() => {
    set(SessionStorageKeys.ActiveTab, `${activeTab}`);
    set(SessionStorageKeys.ActiveSubTab, `${activeSubTab}`);
  }, [activeTab, activeSubTab]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useContactViewContext() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useContactViewContext must be used within a ContactViewProvider');
  }

  return context;
}

export { ContactViewProvider, useContactViewContext };
