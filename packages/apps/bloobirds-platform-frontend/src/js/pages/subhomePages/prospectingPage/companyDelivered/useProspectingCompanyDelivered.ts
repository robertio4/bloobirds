import { useAggregationSubscription } from '@bloobirds-it/plover';
import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { BobjectTypes } from '@bloobirds-it/types';
import {
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_STAGE_LOGIC_ROLE,
  COMPANY_STATUS_LOGIC_ROLE,
} from '../../../../constants/company';
import { useCompany, useEntity } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { SortValues } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import SessionManagerFactory from '../../../../misc/session';
import { keepPreviousResponse } from '../../../../utils/swr.utils';
import { getCompanyAggregationQuery, useProspectingItems } from '../useProspecting';
import { SORT_FIELDS } from './companyDelivered.constants';

const SessionManager = SessionManagerFactory();

const DEFAULT_ORDER = 'assignedDateRecent';

const sortAtom = atom({
  key: 'prospectCompanyDeliveredSortAtom',
  default: { value: DEFAULT_ORDER, hasChanged: false },
});

const queryAtom = atom({
  key: 'prospectingCompanyDeliveredQueryAtom',
  default: undefined,
});

const pageAtom = atom({
  key: 'prospectingDeliveredPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'prospectingDeliveredHasNextPage',
  default: true,
});

export const useProspectingCompanyDeliveredAggregation = () => {
  const { data } = useAggregationSubscription(
    getCompanyAggregationQuery([COMPANY_STATUS_LOGIC_ROLE.DELIVERED]),
    BobjectTypes.Company,
    [keepPreviousResponse],
  );

  return data?.data?.contents[0]?.value;
};

export const useProspectingCompanyDeliveredPage = () => {
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

export const useProspectingCompanyDelivered = () => {
  const sort = SORT_FIELDS[useRecoilValue(sortAtom)?.value as keyof typeof SORT_FIELDS];
  const query = useRecoilValue(queryAtom);

  return useProspectingItems(query, sort, pageAtom, BobjectTypes.Company, null, [
    keepPreviousResponse,
  ]);
};

export const useProspectingCompanyDeliveredAllItems = () => {
  const { fetchCompanies } = useCompany('delivered-tab');
  const query = useRecoilValue(queryAtom);

  const searchQuery = {
    query,
    columns: [
      COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
      COMPANY_FIELDS_LOGIC_ROLE.NAME,
      COMPANY_FIELDS_LOGIC_ROLE.START_CADENCE,
      COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
    ],
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
export const useProspectingCompanyDeliveredQuery = () => {
  const [query, setQuery] = useRecoilState(queryAtom);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const hasSalesEnabled = useFullSalesEnabled();
  const assignedToField = bobjectFieldsEntity?.findByLogicRole(
    COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  );
  const statusField = bobjectFieldsEntity?.findByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.STATUS);
  const stageField = bobjectFieldsEntity?.findByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.STAGE);

  const defaultQuery = {
    [assignedToField?.id]: SessionManager?.getUser()?.id,
    [statusField?.id]: [COMPANY_STATUS_LOGIC_ROLE.DELIVERED],
    ...(hasSalesEnabled
      ? { [stageField?.id]: ['__MATCH_EMPTY_ROWS__', COMPANY_STAGE_LOGIC_ROLE.PROSPECT] }
      : {}),
  };

  return {
    query,
    setQuery: (value: { [x: string]: any }) => {
      setQuery({ ...defaultQuery, ...value });
    },
    resetQuery: () => setQuery(defaultQuery),
  };
};

export const useProspectingCompanyDeliveredSort = () => {
  const [sort, setSort] = useRecoilState(sortAtom);
  const resetSort = useResetRecoilState(sortAtom);
  return {
    sort,
    setSort: (value: SortValues) => {
      if (!value || value === DEFAULT_ORDER) {
        resetSort();
      } else {
        setSort({ value: value, hasChanged: true });
      }
    },
  };
};
