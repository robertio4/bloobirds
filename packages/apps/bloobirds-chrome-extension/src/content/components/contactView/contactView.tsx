import { useEffect } from 'react';

import { useSessionStorage, useSuggestedTemplates } from '@bloobirds-it/hooks';
import {
  ContactViewContext,
  ContactViewSubTab,
  ContactViewTab,
  PlaybookTab,
  SessionStorageKeys,
} from '@bloobirds-it/types';

import { useExtensionContext } from '../context';
import { useFloatingMenuContext } from '../floatingMenu/floatingMenuContext';
import { TourHandler } from '../tourHandler/tourHandler';
import ContactViewScreens from './contactViewScreens';
import ContactViewTabs from './contactViewTabs';
import { ContactViewProvider } from './context/contactViewContext';

export const ContactView = ({ defaultContext }: { defaultContext?: ContactViewContext }) => {
  const {
    useGetActiveBobject,
    setActiveBobject,
    useGetForcedActiveTab,
    useGetForcedActiveSubTab,
  } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const { activeBobject: defaultActiveBobject } = defaultContext || {};
  const forcedActiveTab = useGetForcedActiveTab();
  const forcedActiveSubTab = useGetForcedActiveSubTab();
  const { setLastVisitedBobject } = useFloatingMenuContext();
  const { get } = useSessionStorage();
  //preload the suggested templates
  useSuggestedTemplates(activeBobject, undefined, PlaybookTab.EMAILS);
  useSuggestedTemplates(activeBobject, undefined, PlaybookTab.PITCHES);
  const activeTabSaved = get(SessionStorageKeys.ActiveTab);
  const activeSubTabSaved = get(SessionStorageKeys.ActiveSubTab);

  useEffect(() => {
    if (defaultActiveBobject) {
      setActiveBobject(defaultContext.activeBobject);
    }
  }, [defaultContext]);
  const bobjectType = (activeBobject?.id?.typeName as unknown) as ContactViewTab;

  let initialContext: Partial<ContactViewContext> = defaultContext;
  if (!defaultContext) {
    if (activeTabSaved && activeSubTabSaved) {
      initialContext = {
        activeTab: activeTabSaved,
        activeSubTab: activeSubTabSaved,
      };
    } else {
      initialContext = {
        activeTab: forcedActiveTab ?? (activeBobject && bobjectType),
        activeSubTab: forcedActiveSubTab ?? ContactViewSubTab.OVERVIEW,
      };
    }
  }

  if (activeBobject && bobjectType === initialContext.activeTab) {
    setLastVisitedBobject(activeBobject);
  }

  return (
    <ContactViewProvider defaultContext={initialContext}>
      <ContactViewTabs />
      <ContactViewScreens />
      <TourHandler />
    </ContactViewProvider>
  );
};
