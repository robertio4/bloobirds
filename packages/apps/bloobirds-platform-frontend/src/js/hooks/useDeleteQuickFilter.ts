import { atom, useRecoilState } from 'recoil';
import { QuickFilter } from '../typings/quickFilters';

const deleteQuickFiltersModalOpenAtom = atom({
  key: 'deleteQuickFiltersModalOpenAtom',
  default: false,
});

const deleteQuickFiltersAtom = atom<QuickFilter>({
  key: 'deleteQuickFiltersObjectAtom',
  default: {} as QuickFilter,
});

const useDeleteQuickFilterVisibility = () => {
  const [deleteQuickFilterOpen, setDeleteQuickFilterOpen] = useRecoilState(
    deleteQuickFiltersModalOpenAtom,
  );

  const openDeleteQuickFilterModal = () => {
    if (!deleteQuickFilterOpen) {
      setDeleteQuickFilterOpen(true);
    }
  };

  const closeDeleteQuickFilterModal = () => {
    if (deleteQuickFilterOpen) {
      setDeleteQuickFilterOpen(false);
    }
  };

  return {
    isOpen: deleteQuickFilterOpen,
    openDeleteQuickFilterModal,
    closeDeleteQuickFilterModal,
  };
};

export const useDeleteQuickFilterModal = () => {
  const {
    closeDeleteQuickFilterModal,
    openDeleteQuickFilterModal,
    isOpen,
  } = useDeleteQuickFilterVisibility();
  const [quickFilter, setQuickFilter] = useRecoilState<QuickFilter>(deleteQuickFiltersAtom);

  const toggleDeleteQuickFiltersModal = () => {
    openDeleteQuickFilterModal();
  };

  const openDeleteQuickFilter = async ({ quickFilterToSet }: { quickFilterToSet: QuickFilter }) => {
    if (quickFilterToSet) {
      setQuickFilter(quickFilterToSet);
    }

    openDeleteQuickFilterModal();
  };

  return {
    isOpen,
    closeDeleteQuickFilter: closeDeleteQuickFilterModal,
    openDeleteQuickFilter,
    toggleDeleteQuickFiltersModal,
    setQuickFilter,
    quickFilter,
  };
};
