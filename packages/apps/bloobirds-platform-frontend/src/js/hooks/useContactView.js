import { useEffect } from 'react';

import { useRouter } from '@bloobirds-it/hooks';

import { useSharedState } from './useSharedState';

const DEFAULT_TAB = 'Activity';

export const useContactView = () => {
  const [tab, setTab] = useSharedState('tab');
  const [subtab, setSubtab] = useSharedState('subtab');
  const [scrollOffset, setScrollOffset] = useSharedState('scrollOffset');
  const { query } = useRouter();

  const setActiveTabs = ({ tab: newTab, subtab: newSubtab }) => {
    setTab(newTab);
    setSubtab(newSubtab);
  };

  const scrollToContactTabs = () => {
    setScrollOffset(document.getElementById('contact-tabs')?.offsetTop - 48);
    document.getElementById(query.id)?.scrollTo({
      top: document.getElementById('contact-tabs')?.offsetTop - 48,
      behavior: 'smooth',
    });
  };

  const resetTab = () => {
    setTab(DEFAULT_TAB);
    setScrollOffset(0);
  };

  return {
    subtab,
    tab,
    setActiveTabs,
    scrollToContactTabs,
    setTab,
    setSubtab,
    resetTab,
    scrollOffset,
    setScrollOffset,
  };
};
