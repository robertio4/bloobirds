import { useAggregationSubscription } from '@bloobirds-it/plover';
import { keepPreviousResponse } from '@bloobirds-it/utils';
import { atom, atomFamily, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import {
  BOBJECT_TYPES,
  BobjectTypes,
  CompanyOrLeadLR,
  FIELDS_LOGIC_ROLE,
  STAGE_VALUES_LOGIC_ROLES,
} from '@bloobirds-it/types';
import { useCompany, useEntity, useLeads } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { MainBobjectTypes } from '../../../../hooks/useSubhomeFilters';
import { SortValues } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import SessionManagerFactory from '../../../../misc/session';
import { BobjectType } from '../../../../typings/bobjects';
import { getSalesCompaniesAndLeadsAggregationQuery, useSalesItems } from '../useSales';
import { getSortFields } from './companiesAndLeads.utils';

const SessionManager = SessionManagerFactory();

const defaultOrderFilter: SortValues = 'lastUpdateRecent';

const pageAtom = atom({
  key: 'salesCompaniesAndLeadsPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'salesCompaniesAndLeadsHasNextPage',
  default: true,
});

const subQueryAtom = atomFamily({
  key: 'salesCompaniesAndLeadsSubQueryAtom',
  default: (bobjectType: MainBobjectTypes) => {
    return [
      {
        [(FIELDS_LOGIC_ROLE[bobjectType] as CompanyOrLeadLR).STAGE]:
          STAGE_VALUES_LOGIC_ROLES[bobjectType].SALES,
      },
    ];
  },
});

const queryAtom = atomFamily({
  key: 'salesCompaniesAndLeadsQueryAtom',
  default: undefined,
});

const sortAtom = atomFamily<{ value: SortValues; hasChanged: boolean }, MainBobjectTypes>({
  key: 'salesCompaniesAndLeadsSortAtom',
  default: { value: defaultOrderFilter, hasChanged: false },
});

export const useSalesCompaniesAndLeadsPage = () => {
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

export const useSalesCompaniesAndLeadsAggregation = () => {
  const {
    data: companyCounter,
  } = useAggregationSubscription(
    getSalesCompaniesAndLeadsAggregationQuery(BOBJECT_TYPES.COMPANY),
    BobjectTypes.Company,
    [keepPreviousResponse],
  );

  const {
    data: leadCounter,
  } = useAggregationSubscription(
    getSalesCompaniesAndLeadsAggregationQuery(BOBJECT_TYPES.LEAD),
    BobjectTypes.Lead,
    [keepPreviousResponse],
  );

  return {
    company: companyCounter?.data?.contents[0]?.value,
    lead: leadCounter?.data?.contents[0]?.value,
  };
};

export const useSalesItemsCompaniesAndLeads = (bobjectType: MainBobjectTypes) => {
  const query = useRecoilValue(queryAtom(bobjectType));
  const sort = getSortFields(useRecoilValue(sortAtom(bobjectType))?.value, bobjectType);
  const subQuery = useRecoilValue(subQueryAtom(bobjectType));

  return useSalesItems(query, subQuery, sort, pageAtom, bobjectType);
};

export const useCompaniesAndLeadsTabAllItems = (bobjectType: BobjectType) => {
  const isLeadTab = bobjectType === BOBJECT_TYPES.LEAD;
  const { fetchCompanies } = useCompany('companies-leads-tab');
  const { searchLeads } = useLeads('companies-leads-tab');
  const query = useRecoilValue(queryAtom(bobjectType));
  const searchQuery = {
    query,
    formFields: true,
    pageSize: 1000,
    injectReferences: true,
  };
  const getAllItems = async () => {
    const response = isLeadTab ? await searchLeads(searchQuery) : await fetchCompanies(searchQuery);
    return response?.contents;
  };

  return { getAllItems };
};

//NEW HOOKS
export const useSalesCompaniesAndLeadsQuery = (bobjectType: MainBobjectTypes) => {
  const [query, setQuery] = useRecoilState(queryAtom(bobjectType));
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const hasSalesEnabled = useFullSalesEnabled();

  const assignedToField = bobjectFieldsEntity?.findByLogicRole(
    (FIELDS_LOGIC_ROLE[bobjectType] as CompanyOrLeadLR).ASSIGNED_TO,
  );
  const stageField = bobjectFieldsEntity?.findByLogicRole(
    (FIELDS_LOGIC_ROLE[bobjectType] as CompanyOrLeadLR).STAGE,
  );

  const defaultQuery = {
    [assignedToField?.id]: SessionManager?.getUser()?.id,
    ...(hasSalesEnabled
      ? {
          [stageField?.id]: [STAGE_VALUES_LOGIC_ROLES[bobjectType].SALES],
        }
      : {}),
  };

  return {
    query,
    setQuery: (value: { [id: string]: any }) => {
      setQuery({ ...defaultQuery, ...value });
    },
    resetQuery: () => {
      setQuery(defaultQuery);
    },
  };
};

export const useSalesCompaniesAndLeadsSort = (bobjectType: MainBobjectTypes) => {
  const [sort, setSort] = useRecoilState(sortAtom(bobjectType));
  const resetSort = useResetRecoilState(sortAtom(bobjectType));

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
