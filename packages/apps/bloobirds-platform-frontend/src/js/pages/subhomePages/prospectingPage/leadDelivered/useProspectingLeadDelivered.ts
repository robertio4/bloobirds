import { useAggregationSubscription } from '@bloobirds-it/plover';
import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { BobjectTypes } from '@bloobirds-it/types';
import {
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_STAGE_LOGIC_ROLE,
  LEAD_STATUS_LOGIC_ROLE,
} from '../../../../constants/lead';
import { useEntity, useLeads } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { SortValues } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import SessionManagerFactory from '../../../../misc/session';
import { keepPreviousResponse } from '../../../../utils/swr.utils';
import { getLeadAggregationQuery, useProspectingItems } from '../useProspecting';
import { SORT_FIELDS } from './leadDelivered.constant';

const SessionManager = SessionManagerFactory();

const DEFAULT_ORDER = 'assignedDateRecent';

const queryAtom = atom({
  key: 'prospectingLeadDeliveredQueryAtom',
  default: undefined,
});

const sortAtom = atom({
  key: 'prospectLeadDeliveredSortAtom',
  default: { value: DEFAULT_ORDER, hasChanged: false },
});

const pageAtom = atom({
  key: 'prospectingLeadDeliveredPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'prospectingLeadDeliveredHasNextPage',
  default: true,
});

export const useProspectingLeadDeliveredAggregation = () => {
  const { data } = useAggregationSubscription(
    getLeadAggregationQuery([LEAD_STATUS_LOGIC_ROLE.DELIVERED]),
    BobjectTypes.Lead,
    [keepPreviousResponse],
  );

  return data?.data?.contents[0]?.value;
};

export const useProspectingLeadDeliveredPage = () => {
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

export const useProspectingLeadDelivered = () => {
  const sort = SORT_FIELDS[useRecoilValue(sortAtom)?.value as keyof typeof SORT_FIELDS];
  const query = useRecoilValue(queryAtom);

  return useProspectingItems(query, sort, pageAtom, BobjectTypes.Lead, null, [
    keepPreviousResponse,
  ]);
};

export const useProspectingLeadDeliveredAllItems = () => {
  const { searchLeads } = useLeads('lead-delivered-tab');
  const query = useRecoilValue(queryAtom);
  const searchQuery = {
    query,
    columns: [
      LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
      LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
      LEAD_FIELDS_LOGIC_ROLE.START_CADENCE,
    ],
    formFields: true,
    pageSize: 1000,
    injectReferences: true,
  };
  const getAllItems = async () => {
    const response = await searchLeads(searchQuery);
    return response?.contents;
  };

  return { getAllItems };
};

// NEW Hooks
export const useProspectingLeadDeliveredQuery = () => {
  const [query, setQuery] = useRecoilState(queryAtom);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const hasSalesEnabled = useFullSalesEnabled();
  const assignedToField = bobjectFieldsEntity?.findByLogicRole(LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO);
  const statusField = bobjectFieldsEntity?.findByLogicRole(LEAD_FIELDS_LOGIC_ROLE.STATUS);
  const stageField = bobjectFieldsEntity?.findByLogicRole(LEAD_FIELDS_LOGIC_ROLE.STAGE);

  const defaultQuery = {
    [assignedToField?.id]: SessionManager?.getUser()?.id,
    [statusField?.id]: [LEAD_STATUS_LOGIC_ROLE.DELIVERED],
    ...(hasSalesEnabled
      ? { [stageField?.id]: ['__MATCH_EMPTY_ROWS__', LEAD_STAGE_LOGIC_ROLE.PROSPECT] }
      : {}),
  };

  return {
    query,
    setQuery: (value: { [id: string]: any }) => {
      setQuery({ ...defaultQuery, ...value });
    },
    resetQuery: () => setQuery(defaultQuery),
  };
};

export const useProspectingLeadDeliveredSort = () => {
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
