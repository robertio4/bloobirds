import { useAggregationSubscription } from '@bloobirds-it/plover';
import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { BobjectTypes } from '@bloobirds-it/types';
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_STAGE_LOGIC_ROLE } from '../../../../../constants/lead';
import { useEntity, useLeads } from '../../../../../hooks';
import { useFullSalesEnabled } from '../../../../../hooks/useFeatureFlags';
import SessionManagerFactory from '../../../../../misc/session';
import { keepPreviousResponse } from '../../../../../utils/swr.utils';
import { useProspectingItems } from '../../useProspecting';
import { SORT_FIELDS } from './allMyEntitiesLead.constant';

const SessionManager = SessionManagerFactory();

const DEFAULT_ORDER = 'lastUpdateRecent';

const pageAtom = atom({
  key: 'prospectingAllMyEntitiesLeadPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'prospectingAllMyEntitiesLeadHasNextPage',
  default: true,
});

const queryAtom = atom({
  key: 'prospectingLeadMyEntitiesQueryAtom',
  default: undefined,
});

const sortAtom = atom<{ value: keyof typeof SORT_FIELDS; hasChanged: boolean }>({
  key: 'prospectLeadMyEntitiesSortAtom',
  default: { value: DEFAULT_ORDER, hasChanged: false },
});

/* END - NEW ATOMS */

export const useProspectingAllMyLeadsAggregation = () => {
  const hasSalesEnabled = useFullSalesEnabled();
  const { data } = useAggregationSubscription(
    {
      query: {
        [LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: SessionManager?.getUser()?.id,
        ...(hasSalesEnabled
          ? {
              [LEAD_FIELDS_LOGIC_ROLE.STAGE]: [
                '__MATCH_EMPTY_ROWS__',
                LEAD_STAGE_LOGIC_ROLE.PROSPECT,
              ],
            }
          : {}),
        //@ts-ignore
        formFields: false,
      },
    },
    BobjectTypes.Lead,
    [keepPreviousResponse],
  );

  return data?.data?.contents[0]?.value;
};

export const useProspectingAllMyEntities = () => {
  const sort = SORT_FIELDS[useRecoilValue(sortAtom)?.value];
  const query = useRecoilValue(queryAtom);

  return useProspectingItems(query, sort, pageAtom, BobjectTypes.Lead, null, [
    keepPreviousResponse,
  ]);
};

export const useProspectingAllMyEntitiesLeadAllItems = () => {
  const { searchLeads } = useLeads('all-my-leads-tab');
  const query = useRecoilValue(queryAtom);

  const searchQuery = {
    query,
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

export const useProspectingAllMyLeadsPage = () => {
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

// NEW Hooks
export const useProspectingLeadAllEntitiesQuery = () => {
  const [query, setQuery] = useRecoilState(queryAtom);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const hasSalesEnabled = useFullSalesEnabled();

  const assignedToField = bobjectFieldsEntity?.findByLogicRole(LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO);
  const stageField = bobjectFieldsEntity?.findByLogicRole(LEAD_FIELDS_LOGIC_ROLE.STAGE);
  const defaultQuery = {
    [assignedToField?.id]: SessionManager?.getUser()?.id,
    ...(hasSalesEnabled
      ? { [stageField?.id]: ['__MATCH_EMPTY_ROWS__', LEAD_STAGE_LOGIC_ROLE.PROSPECT] }
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

export const useProspectingLeadAllEntitiesSort = () => {
  const [sort, setSort] = useRecoilState(sortAtom);
  const resetSort = useResetRecoilState(sortAtom);
  return {
    sort,
    setSort: (value: keyof typeof SORT_FIELDS) => {
      if (!value || value === DEFAULT_ORDER) {
        resetSort();
      } else {
        setSort({ value: value, hasChanged: true });
      }
    },
  };
};
