import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Label, Text } from '@bloobirds-it/flamingo-ui';

import useModalVisibility from '../../../../../hooks/useModalVisibility';
import { useQuickFilters } from '../../../../../hooks/useQuickFilters';
import { useSessionStorage } from '../../../../../hooks/useSessionStorage';
import { useSubhomeFilters } from '../../../../../hooks/useSubhomeFilters';
import { QuickFilter } from '../../../../../typings/quickFilters';
import { transformFiltersToQuickFilters } from '../../../../../utils/subhomeFilters.utils';
import { DeleteQuickFilterModal } from './deleteQuickFilterModal/deleteQuickFilterModal';
import { EditQuickFilterNameModal } from './editQuickFilterNameModal/editQuickFilterNameModal';
import CustomQuickFilter from './quickFilter/quickFilter';
import styles from './quickFilters.module.css';
import { SaveQuickFilterModal } from './saveQuickFilterModal/saveQuickFilterModal';
import { UpdateQuickFilterModal } from './updateQuickFilterModal/updateQuickFilterModal';

const QuickFilters = ({ tabName }: { tabName: string }) => {
  const [quickFilter, setQuickFilter] = useState<QuickFilter>();
  const {
    key,
    filters,
    selectedQuickFilter,
    removeSelectedQuickFilter,
    setSelectedQuickFilter,
    haveFiltersBeenChanged,
    setHaveFiltersBeenChanged,
  } = useSubhomeFilters();
  const { stored } = useSessionStorage();
  const { t } = useTranslation();

  const {
    quickFilters,
    deleteQuickFilter,
    setDefault,
    saveQuickFilter,
    editNameQuickFilter,
  } = useQuickFilters(tabName);
  const {
    isOpen: isOpenEditNameModal,
    openModal: openEditNameModal,
    closeModal: closeEditNameModal,
  } = useModalVisibility('editQuickFilterNameModal');
  const {
    isOpen: isOpenDeleteModal,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModalVisibility('deleteQuickFilterModal');
  const { isOpen: isOpenCreateModal, closeModal: closeCreateModal } = useModalVisibility(
    'createQuickFilterModal',
  );

  const { isOpen: isOpenEditModal, closeModal: closeEditModal } = useModalVisibility(
    'editQuickFilterModal',
  );
  const { isOpen: isOpenUpdateModal, closeModal: closeUpdateModal } = useModalVisibility(
    'updateQuickFilterModal',
  );
  const filtersOfQuickFilter = transformFiltersToQuickFilters(filters);

  const applyQuickFilter = (quickFilter: QuickFilter, status: boolean) => {
    if (status) {
      if (selectedQuickFilter) {
        removeSelectedQuickFilter(selectedQuickFilter);
      }
      setSelectedQuickFilter(quickFilter);
    } else {
      removeSelectedQuickFilter(quickFilter);
    }
  };

  useEffect(() => {
    if (quickFilters && !selectedQuickFilter && stored && !stored[key] && key) {
      const defaultQuickFilter = quickFilters.find((filter: QuickFilter) => filter?.defaultGroup);
      setSelectedQuickFilter(defaultQuickFilter);
    }
  }, [key]);

  return (
    <>
      {quickFilters?.length ? (
        <>
          <Text color="softPeanut" size="s" className={styles.title}>
            {t('leftBar.filters.quickFilters')}
          </Text>
          {quickFilters.map((quickFilter: any) => (
            <CustomQuickFilter
              key={`quick-filter-${quickFilter?.id}`}
              quickFilter={quickFilter}
              onApply={applyQuickFilter}
              onEditName={(quickFilter: QuickFilter) => {
                setQuickFilter(quickFilter);
                openEditNameModal();
              }}
              onDelete={(quickFilter: QuickFilter) => {
                setQuickFilter(quickFilter);
                openDeleteModal();
              }}
              onSetDefault={(quickFilterId: string) => {
                setDefault(quickFilterId);
                setSelectedQuickFilter(quickFilter);
              }}
              isSelected={selectedQuickFilter?.id === quickFilter?.id}
            />
          ))}
        </>
      ) : (
        haveFiltersBeenChanged && (
          <Label color="verySoftBanana" textColor="peanut" size="small" uppercase={false}>
            {t('leftBar.filters.saveQuickFiltersQuestion')}{' '}
            <b>{t('leftBar.filters.saveQuickFiltersText')}</b> ✨👉
          </Label>
        )
      )}
      {isOpenDeleteModal && (
        <DeleteQuickFilterModal
          onClose={closeDeleteModal}
          onDelete={deleteQuickFilter}
          quickFilter={quickFilter}
        />
      )}
      {isOpenEditNameModal && (
        <EditQuickFilterNameModal
          onClose={closeEditNameModal}
          onSave={({ id, name }: { id: string; name: string }) => {
            editNameQuickFilter({ id, name });
          }}
          quickFilter={quickFilter}
        />
      )}
      {isOpenCreateModal && (
        <SaveQuickFilterModal
          mode="create"
          callback={() => setHaveFiltersBeenChanged(false)}
          filters={filtersOfQuickFilter}
          order={quickFilters?.length + 1}
          onClose={closeCreateModal}
          onSave={({
            id,
            name,
            order,
            filters,
          }: {
            id: string;
            name: string;
            order: number;
            filters: any[];
          }) => {
            return saveQuickFilter({ id, name, order, filters }).then((quickFilters: any) => {
              const newItem = quickFilters[quickFilters?.length - 1];
              setSelectedQuickFilter(newItem);
            });
          }}
        />
      )}
      {isOpenEditModal && (
        <SaveQuickFilterModal
          callback={() => setHaveFiltersBeenChanged(false)}
          mode="edit"
          quickFilter={selectedQuickFilter}
          filters={filtersOfQuickFilter}
          onClose={closeEditModal}
          onSave={({
            id,
            name,
            order,
            filters,
          }: {
            id: string;
            name: string;
            order: number;
            filters: any[];
          }) => {
            return saveQuickFilter({ id, name, order, filters });
          }}
        />
      )}
      {isOpenUpdateModal && (
        <UpdateQuickFilterModal onClose={closeUpdateModal} quickFilter={selectedQuickFilter} />
      )}
    </>
  );
};

export default QuickFilters;
