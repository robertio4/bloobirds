import { createContext, useContext } from 'react';

import { SegmentationData, TemplateStage } from '@bloobirds-it/types';

export interface VisibilityFilters {
  onlyMine: boolean;
  onlyOfficial: boolean;
  onlyPrivate: boolean;
  onlyBattlecards: boolean;
}

type ProviderType = {
  activeBobjectSegmentationValues: { [key: string]: string };
  segmentationFields: SegmentationData;
  children: React.ReactElement;
  filterValues: { [key: string]: Array<string> };
  stage: TemplateStage;
  defaultStage: TemplateStage;
  setFiltersContext: (filter: any) => void;
  isSmartEmail: boolean;
  shouldShowBattlecards: boolean;
  shouldShowVisibilityFilters: boolean;
  visibilityFilters: VisibilityFilters;
};

interface SegmentationFilterContextProps {
  stageSelector: [TemplateStage, (TemplateStage) => void];
  selectedSegmentation: { [segmentationId: string]: Array<string> };
  setSelectedSegmentation: (newSegmentationValue: {
    [segmentationId: string]: Array<string>;
  }) => void;
  removeLabelValue: (valueToRemove: string, segmentationField: { id: string }) => void;
  clearBlock: (blockId: string) => void;
  isSmartEmail: boolean;
  shouldShowBattlecards: boolean;
  shouldShowVisibilityFilters: boolean;
  visibilityFilters: VisibilityFilters;
  setVisibilityFilters: (x: VisibilityFilters) => void;
  defaultStage: TemplateStage;
}

const SegmentationFilterContext = createContext(null);

export const SegmentationFilterProvider = ({
  children,
  filterValues,
  shouldShowBattlecards,
  shouldShowVisibilityFilters,
  stage,
  defaultStage,
  setFiltersContext,
  visibilityFilters,
  isSmartEmail,
}: ProviderType) => {
  function removeLabelValue(valueToRemove, segmentationField) {
    const filteredValues = filterValues[segmentationField.id].filter(
      value => value !== valueToRemove,
    );
    const newSegmentation =
      filteredValues &&
      Object.keys(filterValues).reduce((acc, key) => {
        const isFilteredKeyEmpty = key === segmentationField.id && filteredValues.length === 0;
        return {
          ...acc,
          ...(isFilteredKeyEmpty
            ? {}
            : { [key]: key === segmentationField.id ? filteredValues : filterValues[key] }),
        };
      }, {});

    setFiltersContext({
      segmentationData: newSegmentation,
      stage,
      visibilityFilters,
      shouldShowBattlecards,
      shouldShowVisibilityFilters,
    });
  }

  function clearBlock(blockId) {
    const newValue =
      filterValues &&
      Object.keys(filterValues).reduce((acc, key) => {
        if (blockId !== key) {
          acc[key] = filterValues[key];
        }
        return acc;
      }, {});

    setFiltersContext({
      segmentationData: newValue,
      stage,
      visibilityFilters,
      shouldShowBattlecards,
      shouldShowVisibilityFilters,
    });
  }

  return (
    <SegmentationFilterContext.Provider
      value={{
        stageSelector: [
          stage,
          (value: TemplateStage) => {
            setFiltersContext({
              segmentationData: filterValues,
              stage: value,
              visibilityFilters,
              shouldShowBattlecards,
              shouldShowVisibilityFilters,
            });
          },
        ],
        selectedSegmentation: filterValues,
        setSelectedSegmentation: value => {
          setFiltersContext({
            stage,
            segmentationData: value,
            shouldShowBattlecards,
            visibilityFilters,
            shouldShowVisibilityFilters,
          });
        },
        visibilityFilters,
        setVisibilityFilters: value => {
          setFiltersContext({
            stage,
            segmentationData: filterValues,
            shouldShowBattlecards,
            shouldShowVisibilityFilters,
            visibilityFilters: { ...visibilityFilters, ...value },
          });
        },
        removeLabelValue,
        clearBlock,
        isSmartEmail,
        shouldShowBattlecards,
        shouldShowVisibilityFilters,
        defaultStage,
      }}
    >
      {children}
    </SegmentationFilterContext.Provider>
  );
};

export const useSegmentationFilter = () => {
  const context = useContext<SegmentationFilterContextProps>(SegmentationFilterContext);

  if (context === undefined) {
    throw new Error('useInactiveHandlingModal must be used within the modal provider');
  }

  return context;
};
