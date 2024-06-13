import { useAggregationSubscription } from '@bloobirds-it/plover';
import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { BobjectTypes } from '@bloobirds-it/types';
import { COMPANY_FIELDS_LOGIC_ROLE, COMPANY_STAGE_LOGIC_ROLE } from '../../../../constants/company';
import { useCompany, useEntity } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { SortValues } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import SessionManagerFactory from '../../../../misc/session';
import { keepPreviousResponse } from '../../../../utils/swr.utils';
import { useProspectingItems } from '../useProspecting';
import { SORT_FIELDS } from './allMyCompanies.constant';

const SessionManager = SessionManagerFactory();

const DEFAULT_ORDER = 'lastUpdateRecent';

const defaultOrderFilter = 'lastUpdateRecent';

const pageAtom = atom({
  key: 'prospectingMyCompaniesPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'prospectingMyCompaniesHasNextPage',
  default: true,
});

export const useProspectingAllMyCompaniesPage = () => {
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

/* NEW ATOMS */
const queryAtom = atom({
  key: 'prospectingCompanyMyEntitiesQueryAtom',
  default: undefined,
});

const sortAtom = atom<{ value: keyof typeof SORT_FIELDS; hasChanged: boolean }>({
  key: 'prospectCompanyMyEntitiesSortAtom',
  default: { value: DEFAULT_ORDER, hasChanged: false },
});

/* END - NEW ATOMS */

export const useProspectingAllMyCompaniesAggregation = () => {
  const hasSalesEnabled = useFullSalesEnabled();
  const { data } = useAggregationSubscription(
    {
      query: {
        [COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: SessionManager?.getUser()?.id,
        ...(hasSalesEnabled
          ? {
              [COMPANY_FIELDS_LOGIC_ROLE.STAGE]: [
                '__MATCH_EMPTY_ROWS__',
                COMPANY_STAGE_LOGIC_ROLE.PROSPECT,
              ],
            }
          : {}),
        // @ts-ignore
        formFields: false,
      },
    },
    BobjectTypes.Company,
    [keepPreviousResponse],
  );

  return data?.data?.contents[0]?.value;
};

export const useProspectingAllMyCompanies = () => {
  const sort = SORT_FIELDS[useRecoilValue(sortAtom)?.value];
  const query = useRecoilValue(queryAtom);

  return useProspectingItems(query, sort, pageAtom, BobjectTypes.Company, null, [
    keepPreviousResponse,
  ]);
};

export const useProspectingAllMyCompaniesAllItems = () => {
  const { fetchCompanies } = useCompany('all-my-companies-tab');
  const query = useRecoilValue(queryAtom);
  const searchQuery = {
    query,
    formFields: true,
    pageSize: 1000,
    injectReferences: true,
  };
  const getAllItems = async () => {
    const response = await fetchCompanies(searchQuery);
    return response?.contents;
  };

  return { getAllItems };
};

// NEW Hooks
export const useProspectingCompanyAllEntitiesQuery = () => {
  const [query, setQuery] = useRecoilState(queryAtom);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const hasSalesEnabled = useFullSalesEnabled();

  const assignedToField = bobjectFieldsEntity?.findByLogicRole(
    COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  );
  const stageField = bobjectFieldsEntity?.findByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.STAGE);

  const defaultQuery = {
    [assignedToField?.id]: SessionManager?.getUser()?.id,
    ...(hasSalesEnabled
      ? { [stageField?.id]: ['__MATCH_EMPTY_ROWS__', COMPANY_STAGE_LOGIC_ROLE.PROSPECT] }
      : {}),
  };

  return {
    query,
    setQuery: (value: any) => {
      setQuery({ ...defaultQuery, ...value });
    },
    resetQuery: () => setQuery(defaultQuery),
  };
};

export const useProspectingCompanyAllEntitiesSort = () => {
  const [sort, setSort] = useRecoilState(sortAtom);
  const resetSort = useResetRecoilState(sortAtom);
  return {
    sort,
    setSort: (value: SortValues) => {
      if (!value || value === defaultOrderFilter) {
        resetSort();
      } else {
        setSort({ value: value, hasChanged: true });
      }
    },
  };
};
