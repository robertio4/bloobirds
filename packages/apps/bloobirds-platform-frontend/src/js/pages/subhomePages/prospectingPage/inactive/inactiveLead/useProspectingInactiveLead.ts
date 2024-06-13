import { useEffect, useState } from 'react';

import { useSearchSubscription } from '@bloobirds-it/plover';
import { BobjectTypes, TASK_FIELDS_LOGIC_ROLE, Bobject, Filter } from '@bloobirds-it/types';
import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import {
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_STAGE_LOGIC_ROLE,
  LEAD_STATUS_LOGIC_ROLE,
} from '../../../../../constants/lead';
import { useEntity, useLeads } from '../../../../../hooks';
import { useFullSalesEnabled } from '../../../../../hooks/useFeatureFlags';
import { SortValues } from '../../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import SessionManagerFactory from '../../../../../misc/session';
import { getValueFromLogicRole } from '../../../../../utils/bobjects.utils';
import { requestFutureTasks, useProspectingItems } from '../../useProspecting';
import { LEAD_COLUMNS, LEAD_REFERENCED_COLUMNS } from '../../useProspecting.constants';
import { SORT_FIELDS } from './inactiveLead.constant';

const SessionManager = SessionManagerFactory();

const DEFAULT_ORDER = 'lastAttemptOldest';

const queryAtom = atom({
  key: 'prospectingLeadInactiveQueryAtom',
  default: undefined,
});

const sortAtom = atom({
  key: 'prospectLeadInactiveSortAtom',
  default: { value: DEFAULT_ORDER, hasChanged: false },
});

function getQuery(hasSalesEnabled: boolean) {
  const query = {
    [LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: SessionManager.getUser()?.id,
    ...(hasSalesEnabled
      ? {
          [LEAD_FIELDS_LOGIC_ROLE.STAGE]: ['__MATCH_EMPTY_ROWS__', LEAD_STAGE_LOGIC_ROLE.PROSPECT],
        }
      : {}),
  };
  return {
    ...query,
    [LEAD_FIELDS_LOGIC_ROLE.STATUS]: [
      LEAD_STATUS_LOGIC_ROLE.ON_PROSPECTION,
      LEAD_STATUS_LOGIC_ROLE.CONTACTED,
      LEAD_STATUS_LOGIC_ROLE.ENGAGED,
      LEAD_STATUS_LOGIC_ROLE.NURTURING,
      LEAD_STATUS_LOGIC_ROLE.MEETING,
    ],
    [LEAD_FIELDS_LOGIC_ROLE.IS_INACTIVE]: LEAD_FIELDS_LOGIC_ROLE.IS_INACTIVE + '__YES',
  };
}

export const useProspectingLeadInactiveAggregation = () => {
  const salesFeatureEnabled = useFullSalesEnabled();

  const query = getQuery(salesFeatureEnabled);

  const { data: { data: { totalMatching } = {} } = {} } = useSearchSubscription(
    {
      query,
      //@ts-ignore
      columns: LEAD_COLUMNS,
      referencedColumns: LEAD_REFERENCED_COLUMNS,
      formFields: true,
      pageSize: 1000,
      injectReferences: false,
    },
    BobjectTypes.Lead,
  );

  return totalMatching;
};

export const useProspectingInactiveLead = () => {
  const bobjectFields = useEntity('bobjectFields');

  const hasSalesEnabled = useFullSalesEnabled();
  const sort = SORT_FIELDS[useRecoilValue(sortAtom)?.value as keyof typeof SORT_FIELDS];
  const query = useRecoilValue(queryAtom);

  const filteredUser =
    query && query[bobjectFields?.findByLogicRole(LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO)?.id];

  const { items: leads, ...other } = useProspectingItems(query, sort, null, BobjectTypes.Lead);
  const [filteredLeads, setFilteredLeads] = useState<Bobject[]>([]);
  const [futureTasks, setFutureTasks] = useState([]);

  useEffect(() => {
    requestFutureTasks(hasSalesEnabled, filteredUser).then(response => setFutureTasks(response));
  }, [filteredUser]);

  useEffect(() => {
    const missingLeads: Bobject[] = [];
    if (futureTasks.length > 0 && leads.length > 0) {
      leads.forEach(lead => {
        const hasFutureTasks = futureTasks.find(task => {
          const taskLead = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.LEAD);
          return taskLead === lead?.id.value;
        });

        if (!hasFutureTasks) {
          missingLeads.push(lead);
        }
      });
      setFilteredLeads(missingLeads);
    } else if (leads.length > 0 && futureTasks.length === 0) {
      setFilteredLeads(leads);
    } else {
      setFilteredLeads(null);
    }
  }, [leads, futureTasks]);

  return { ...other, items: filteredLeads || [], totalMatching: filteredLeads?.length };
};

export const useProspectingInactiveLeadAllItems = () => {
  const { searchLeads } = useLeads('inactive-tab');
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

// NEW Hooks
export const useProspectingInactiveLeadQuery = () => {
  const [query, setQuery] = useRecoilState(queryAtom);
  const hasSalesEnabled = useFullSalesEnabled();

  const defaultQuery = getQuery(hasSalesEnabled);

  return {
    query,
    setQuery: (value: { [x: string]: Filter }) => {
      setQuery({ ...defaultQuery, ...value });
    },
    resetQuery: () => setQuery(defaultQuery),
  };
};

export const useProspectingInactiveLeadSort = () => {
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
