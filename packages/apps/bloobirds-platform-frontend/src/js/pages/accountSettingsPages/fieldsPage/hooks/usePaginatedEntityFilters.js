import { atom, atomFamily, selectorFamily, useRecoilState, useRecoilValue } from 'recoil';
import { mutate } from 'swr';
import hash from 'object-hash';

const paginatedEntityPageAtom = atom({
  key: 'paginatedEntityPageAtom',
  default: 0,
});

const paginatedEntityPageSizeAtom = atom({
  key: 'paginatedEntityPageSizeAtom',
  default: 20,
});

const paginatedEntityFiltersAtom = atomFamily({
  key: 'paginatedEntityFiltersAtom',
  default: {},
});

const paginatedEntityOrderAtom = atom({
  key: 'paginatedEntityOrderAtom',
  default: {},
});

const paramsSelector = selectorFamily({
  key: 'paramsSelector',
  get: entity => ({ get }) => {
    const sorting = get(paginatedEntityOrderAtom);
    return {
      ...get(paginatedEntityFiltersAtom(entity)),
      page: get(paginatedEntityPageAtom),
      size: get(paginatedEntityPageSizeAtom),
      sort:
        Object.keys(sorting).length > 0 &&
        `${Object.keys(sorting)[0]},${Object.values(sorting)[0]}`,
    };
  },
});

export const usePaginatedEntityFilters = entity => {
  const [page, setPage] = useRecoilState(paginatedEntityPageAtom);
  const [pageSize, setPageSize] = useRecoilState(paginatedEntityPageSizeAtom);
  const [filters, setFilters] = useRecoilState(paginatedEntityFiltersAtom(entity));
  const [sort, setSort] = useRecoilState(paginatedEntityOrderAtom);
  const params = useRecoilValue(paramsSelector(entity));

  const updateEntityFilters = (filter, value) => {
    let currentValue = { ...filters };
    if (!value) {
      delete currentValue[filter];
    } else {
      currentValue = {
        ...currentValue,
        [filter]: value,
      };
    }
    setPage(0);
    setFilters(currentValue);
    mutate(`/entities/${entity}/${hash(params)}`);
  };

  const handleReorder = column => {
    if (sort[column]) {
      setSort({
        [column]: sort[column] === 'ASC' ? 'DESC' : 'ASC',
      });
    } else {
      setSort({
        [column]: 'ASC',
      });
    }
  };

  return {
    updateEntityFilters,
    setFilters,
    handleReorder,
    setPageSize,
    setPage,
    params,
    page,
    pageSize,
    filters,
    sort,
  };
};
