import { useEffect } from 'react';
import { QuickFilter } from '@bloobirds-it/types';
import { useSessionStorage } from '@bloobirds-it/hooks';
import CustomQuickFilter from './quickFilter/quickFilter';
import { useFilters } from '../../hooks/useFilters';

const QuickFilters = ({
  onToggleSelected,
}: {
  onToggleSelected: (quickFilterSelected: QuickFilter) => void;
}) => {
  const {
    key,
    selectedQuickFilter,
    removeSelectedQuickFilter,
    setSelectedQuickFilter,
    defaultQuickFilters,
  } = useFilters();

  const quickFilters = defaultQuickFilters;
  const { stored } = useSessionStorage();

  const applyQuickFilter = (quickFilter: QuickFilter, status: boolean) => {
    if (status) {
      setSelectedQuickFilter(quickFilter);
    } else {
      removeSelectedQuickFilter(quickFilter);
    }
  };

  useEffect(() => {
    if (quickFilters && !selectedQuickFilter && stored && !stored[key] && key) {
      const defaultQuickFilter = quickFilters.find((filter: QuickFilter) => filter?.defaultGroup);
      setSelectedQuickFilter(defaultQuickFilter);
    } else {
      setSelectedQuickFilter(undefined);
    }
  }, [key]);

  useEffect(() => {
    onToggleSelected?.(selectedQuickFilter);
  }, [selectedQuickFilter]);

  return (
    <>
      {quickFilters?.length ? (
        <>
          {quickFilters.map((quickFilter: any) => (
            <CustomQuickFilter
              key={`quick-filter-${quickFilter?.id}`}
              quickFilter={quickFilter}
              onApply={applyQuickFilter}
              isSelected={selectedQuickFilter?.id === quickFilter?.id}
            />
          ))}
        </>
      ) : null}
    </>
  );
};

export default QuickFilters;
