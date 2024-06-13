import { atom, useRecoilState, useResetRecoilState } from 'recoil';

const quickFiltersModalOpenAtom = atom({
  key: 'quickFiltersModalOpenAtom',
  default: false,
});

const quickFilterAtom = atom({
  key: 'quickFilterAtom',
  default: {},
});

const editQuickFiltersModalAtom = atom({
  key: 'editQuickFiltersModalAtom',
  default: false,
});

export const useQuickFilterModal = () => {
  const [quickFiltersModalOpen, setQuickFiltersModalOpen] = useRecoilState(
    quickFiltersModalOpenAtom,
  );
  const [quickFilter, setQuickFilter] = useRecoilState(quickFilterAtom);
  const [editQuickFiltersModal, setEditQuickFiltersModal] = useRecoilState(
    editQuickFiltersModalAtom,
  );

  const resetEditQuickFiltersModal = useResetRecoilState(editQuickFiltersModalAtom);

  const closeQuickFiltersModal = () => {
    setQuickFiltersModalOpen(false);
    resetEditQuickFiltersModal();
  };

  const openQuickFiltersModal = () => {
    setQuickFiltersModalOpen(true);
  };

  const toggleQuickFiltersModal = () => {
    setQuickFiltersModalOpen(!quickFiltersModalOpen);
  };

  return {
    isOpen: quickFiltersModalOpen,
    isEditName: editQuickFiltersModal,
    setEditName: setEditQuickFiltersModal,
    closeQuickFiltersModal,
    openQuickFiltersModal,
    toggleQuickFiltersModal,
    setQuickFilter,
    quickFilter,
  };
};
