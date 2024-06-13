import React, { useState } from 'react';

import { BOBJECT_TYPES, BobjectTypes } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import { usePipelineGlobalAggregation } from './components/views/pipelineView/hooks/usePipelineTab';

interface ContextValues {
  currentTab: string;
  setCurrentTab: (currentTab: string) => void;
  currentSubTab: string;
  setCurrentSubTab: (currentTab: string) => void;
  isCollapsedLeftBar: boolean;
  setIsCollapsedLeftBar: (isCollapsedLeftBar: boolean) => void;
  pipelineCounters: { [key in BOBJECT_TYPES]?: number };
  pipelineLastVisitDates: { [key in BOBJECT_TYPES]?: Date | undefined };
  updateLastVisitedPipeline: (type: BobjectTypes) => void;
  displayLeftBarTooltip: boolean;
  setDisplayLeftBarTooltip: (displayLeftBarTooltip: boolean) => void;
  collapseLeftBar: () => void;
}

const ExtensionLeftBarContext = React.createContext<ContextValues>(null);

function ExtensionLeftBarProvider({ children }: { children: React.ReactNode }) {
  const [currentTab, setCurrentTab] = useState<string>();
  const [currentSubTab, setCurrentSubTab] = useState<string>();
  const [isCollapsedLeftBar, setIsCollapsedLeftBar] = useState(false);
  const [displayLeftBarTooltip, setDisplayLeftBarTooltip] = useState(false);

  const {
    pipelineCounters,
    pipelineLastVisitDates,
    updateLastVisitedPipeline,
  } = usePipelineGlobalAggregation();

  return (
    <ExtensionLeftBarContext.Provider
      value={{
        currentTab,
        setCurrentTab: value => {
          if (value) {
            mixpanel.track(`LEFT_BAR_TAB_CLICKED_${value.toUpperCase()}`);
          }
          setCurrentTab(value);
        },
        currentSubTab,
        setCurrentSubTab,
        isCollapsedLeftBar,
        setIsCollapsedLeftBar,
        collapseLeftBar: () => {
          setIsCollapsedLeftBar(true);
          setCurrentTab(null);
          setCurrentSubTab(null);
        },
        pipelineCounters,
        updateLastVisitedPipeline,
        pipelineLastVisitDates,
        displayLeftBarTooltip,
        setDisplayLeftBarTooltip,
      }}
    >
      {children}
    </ExtensionLeftBarContext.Provider>
  );
}
function useExtensionLeftBarContext<T>() {
  const context = React.useContext<ContextValues<T>>(
    ExtensionLeftBarContext as React.Context<ContextValues<T>>,
  );
  if (context === undefined) {
    throw new Error('useExtensionLeftBarContext must be used within a ExtensionLeftBarProvider');
  }
  return context;
}
export { ExtensionLeftBarProvider, useExtensionLeftBarContext };
