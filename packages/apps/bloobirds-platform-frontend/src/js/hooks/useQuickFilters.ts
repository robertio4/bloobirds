import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import useSWR from 'swr';
import { QuickFilter } from '../typings/quickFilters';
import { api } from '../utils/api';

interface SaveFilterProps {
  id: string;
  name: string;
  order: number;
  filters: string[];
}

interface EditNameFilterProps {
  id: string;
  name: string;
}

const newQuickFilterAtom = atom({
  key: 'newQuickFilterAtom',
  default: null,
});

export const useQuickFilters = (tabName: string) => {
  const [newQuickFilter, setNewQuickFilter] = useRecoilState(newQuickFilterAtom);

  const { data: quickFilters, mutate } = useSWR(`/utils/service/filterGroups/${tabName}`, () =>
    api
      .get(`/utils/service/filterGroups?tabName=${tabName}`, {
        headers: { 'Content-Type': 'application/json' },
        data: {},
      })
      .then(res => res.data),
  );

  useEffect(() => {
    if (newQuickFilter) {
      setNewQuickFilter(null);
    }
  }, [quickFilters]);

  const setDefault = (id: string) =>
    api
      .patch(`/utils/service/filterGroups/${id}/setDefault/`, {
        headers: { 'Content-Type': 'application/json' },
        data: {},
      })
      .then(() => mutate());

  const saveQuickFilter = ({ id, name, order, filters }: SaveFilterProps) => {
    const body = { id, name, tabName, order, filters };
    return api.post('/utils/service/filterGroups', body).then((response: any) => {
      setNewQuickFilter(response?.data);
      return mutate();
    });
  };

  const editNameQuickFilter = ({ id, name }: EditNameFilterProps) => {
    const body = { name };
    return api.patch(`/utils/service/filterGroups/${id}/name`, body).then(() => mutate());
  };

  const deleteQuickFilter = (id: string) =>
    api
      .delete(`/utils/service/filterGroups/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        data: {},
      })
      .then(() => mutate());

  return {
    quickFilters: quickFilters?.map((quickFilter: QuickFilter) => ({
      ...quickFilter,
      defaultGroup: newQuickFilter
        ? quickFilter?.id === newQuickFilter?.id
        : quickFilter?.defaultGroup,
    })),
    editNameQuickFilter,
    setDefault,
    saveQuickFilter,
    deleteQuickFilter,
  };
};
