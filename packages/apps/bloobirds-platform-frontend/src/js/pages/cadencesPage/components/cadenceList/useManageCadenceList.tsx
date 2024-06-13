import { useMemo, useState } from 'react';

import { useCadences } from '@bloobirds-it/cadence';
import { useActiveUserSettings } from '@bloobirds-it/hooks';
import { BobjectTypes } from '@bloobirds-it/types';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

const cadenceManageOrderAtom = atom({
  key: 'cadenceManageListOrderAtom',
  default: {},
});

const cadenceManagePageAtom = atom({
  key: 'cadenceManagePageAtom',
  default: 0,
});

const cadenceManagePageSizeAtom = atom({
  key: 'cadenceManagePageSizeAtom',
  default: 10,
});

const cadenceManageFiltersAtom = atom({
  key: 'cadenceManageFiltersAtom',
  default: {
    searchValue: '',
    selectedBobjectType: [],
    selectedAuthor: [],
    showDisabled: false,
    selectedTags: [],
  },
});

export const useManageCadenceList = () => {
  const { settings } = useActiveUserSettings();
  const [filters, setFilters] = useRecoilState(cadenceManageFiltersAtom);
  const { searchValue, selectedBobjectType, selectedAuthor, showDisabled, selectedTags } = filters;
  const [page, setPage] = useRecoilState(cadenceManagePageAtom);
  const resetPage = useResetRecoilState(cadenceManagePageAtom);
  const [pageSize, setPageSize] = useRecoilState(cadenceManagePageSizeAtom);
  const [sort, setSort] = useRecoilState(cadenceManageOrderAtom);
  const [orderingField, setOrderingField] = useState('');

  const { paginatedCadences, ...rest } = useCadences({
    bobjectTypeName: selectedBobjectType,
    accountId: settings?.account?.id,
    filters: {
      selectedAuthor,
      selectedTags,
      searchValue,
      showDisabled,
    },
    requestParams: {
      page,
      pageSize,
    },
    includeDeleted: false,
  });

  const orderedCadences = useMemo(() => {
    if (paginatedCadences && paginatedCadences.length) {
      const availableSortingFields = paginatedCadences?.length && [
        ...Object.keys(paginatedCadences[0]),
        ...Object.keys(paginatedCadences[0]?.statistics),
      ];
      const isStatisticField =
        paginatedCadences?.length &&
        Object.keys(paginatedCadences[0]?.statistics).includes(orderingField);

      if (availableSortingFields?.includes(orderingField) && orderingField) {
        return paginatedCadences?.sort((a: any, b: any) => {
          if (!a[orderingField]) a[orderingField] = '';
          if (!b[orderingField]) b[orderingField] = '';
          // @ts-ignore
          if (sort[orderingField] === 'ASC') {
            return isStatisticField
              ? a.statistics[orderingField] - b.statistics[orderingField]
              : a[orderingField].localeCompare(b[orderingField]);
          } else {
            return isStatisticField
              ? b.statistics[orderingField] - a.statistics[orderingField]
              : b[orderingField].localeCompare(a[orderingField]);
          }
        });
      } else
        return paginatedCadences?.sort((a: any, b: any) => {
          return b?.lastEntityUpdate.localeCompare(a?.lastEntityUpdate);
        });
    }
    return [];
  }, [searchValue, orderingField, sort, paginatedCadences]);

  const handleReorder = (category: string) => {
    // @ts-ignore
    if (sort[category]) {
      setSort({
        // @ts-ignore
        [category]: sort[category] === 'ASC' ? 'DESC' : 'ASC',
      });
    } else {
      setSort({ [category]: 'ASC' });
    }
    setOrderingField(category);
  };

  return {
    orderedCadences,
    handleReorder,
    sort,
    ...rest,
    setOrderingField,
    ...filters,
    setSelectedBobjecType: (value: BobjectTypes[]) => {
      setFilters({ ...filters, selectedBobjectType: value });
      setPage(0);
    },
    setSelectedAuthor: (value: string[]) => {
      setFilters({ ...filters, selectedAuthor: value });
      setPage(0);
    },
    setSearchValue: (value: string) => {
      setFilters({ ...filters, searchValue: value });
      setPage(0);
    },
    setShowDisabled: (value: boolean) => {
      setFilters({ ...filters, showDisabled: value });
      setPage(0);
    },
    setSelectedTags: (value: boolean) => {
      setFilters({ ...filters, selectedTags: value });
      setPage(0);
    },
    showDisabled,
    page,
    setPage,
    resetPage,
    pageSize,
    setPageSize,
  };
};
