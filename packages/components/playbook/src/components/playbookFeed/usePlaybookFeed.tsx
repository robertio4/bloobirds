import React, { useState } from 'react';

import { useQualifyingQuestions } from '@bloobirds-it/hooks';

import { PlaybookFeedProps } from './playbookFeed.types';

const PlaybookFeedContext = React.createContext(null);

const PlaybookFeedProvider = ({
  props,
  children,
}: {
  props: PlaybookFeedProps;
  children: React.ReactNode;
}) => {
  const QQsHandling = useQualifyingQuestions({
    enabled: true,
    stage: props.stage,
    segmentationValues: props.segmentationValues,
    bobjectType: props.activeBobject?.id?.typeName,
  });
  const [searchValue, setSearchValue] = useState<string>();

  return (
    <PlaybookFeedContext.Provider value={{ searchValue, setSearchValue, ...QQsHandling, ...props }}>
      {children}
    </PlaybookFeedContext.Provider>
  );
};

const usePlaybookFeed = () => {
  const context = React.useContext(PlaybookFeedContext);
  if (context === undefined) {
    throw new Error('useSubhomeFilters must be used within a SubhomeFiltersProvider');
  }

  return context;
};

export { PlaybookFeedProvider, usePlaybookFeed };
