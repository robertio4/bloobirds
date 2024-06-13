import { BOBJECT_TYPES, TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import { useEntity, useOpportunity } from '../../../../hooks';
import { SortValues } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import SessionManagerFactory from '../../../../misc/session';
import { useSalesItems } from '../useSales';
import { SORT_FIELDS, VIEW_MODE } from './allMyOpps.constant';

const SessionManager = SessionManagerFactory();

const defaultOrderFilter = 'lastUpdateRecent';

const viewModeAtom = atom({
  key: 'salesAllMyOppsPageViewMode',
  default: undefined,
});

const pageAtom = atom({
  key: 'salesAllMyOppsPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'salesAllMyOppsHasNextPage',
  default: true,
});

const queryAtom = atom({
  key: 'salesCompaniesAndLeadsQueryAtom',
  default: undefined,
});

const sortAtom = atom<{ value: SortValues; hasChanged: boolean }>({
  key: 'salesCompaniesAndLeadsSortAtom',
  default: { value: defaultOrderFilter, hasChanged: false },
});

export const useSalesAllMyOppsPage = () => {
  const [hasNextPage, setHasNextPage] = useRecoilState(hasNextPageAtom);
  const [page, setPage] = useRecoilState(pageAtom);

  const loadNextPage = () => {
    setPage(page + 1);
  };

  return {
    hasNextPage,
    loadNextPage,
    setHasNextPage,
  };
};

export const useSalesQuerySortingState = () => {
  const query = useRecoilValue(queryAtom);
  const newSort = useRecoilValue(sortAtom);
  const sort = SORT_FIELDS[newSort?.value];

  return {
    query,
    sort,
  };
};

export const useSalesOpportunitiesAllItems = () => {
  const { fetchOpportunities } = useOpportunity('all-my-opps-tab');
  const query = useRecoilValue(queryAtom);
  const searchQuery = {
    query,
    formFields: true,
    pageSize: 1000,
    injectReferences: true,
  };
  const getAllItems = async () => {
    const response = await fetchOpportunities(searchQuery);
    return response?.contents;
  };

  return { getAllItems };
};

export const useSalesAllMyOpps = () => {
  const sortValue = useRecoilValue(sortAtom)?.value;
  const sort = SORT_FIELDS[sortValue];
  const query = useRecoilValue(queryAtom);
  const subQuery = [{ [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: ['__MATCH_FULL_ROWS__'] }];

  return useSalesItems(query, subQuery, sort, pageAtom, BOBJECT_TYPES.OPPORTUNITY);
};

//NEW HOOKS
export const useSalesAllMyOppsQuery = () => {
  const [query, setQuery] = useRecoilState(queryAtom);
  const bobjectFieldsEntity = useEntity('bobjectFields');

  const assignedToField = bobjectFieldsEntity?.findByLogicRole(
    OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  );
  const defaultQuery = {
    [assignedToField?.id]: [SessionManager?.getUser()?.id],
  };

  return {
    query,
    setQuery: (value: { [x: string]: any }) => {
      setQuery({ ...defaultQuery, ...value });
    },
    resetQuery: () => {
      setQuery(defaultQuery);
    },
  };
};

export const useSalesAllMyOppsSort = () => {
  const [sort, setSort] = useRecoilState(sortAtom);
  const resetSort = useResetRecoilState(sortAtom);

  return {
    sort,
    setSort: (value: SortValues) => {
      if (!value || value === defaultOrderFilter) {
        resetSort();
      } else {
        setSort({ value, hasChanged: true });
      }
    },
  };
};

export const useSalesAllMyOppsViewMode = () => {
  const [viewMode, setViewMode] = useRecoilState(viewModeAtom);
  if (!viewMode) setViewMode(VIEW_MODE.KANBAN);

  return [viewMode ? viewMode : VIEW_MODE.LIST, setViewMode];
};
