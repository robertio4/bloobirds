import { useEffect, useState } from 'react';

import { useSearchSubscription } from '@bloobirds-it/plover';
import { BobjectTypes } from '@bloobirds-it/types';
import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import {
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_STAGE_LOGIC_ROLE,
  COMPANY_STATUS_LOGIC_ROLE,
} from '../../../../constants/company';
import { useCompany, useEntity } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { SortValues } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import SessionManagerFactory from '../../../../misc/session';
import { useProspectingItems } from '../useProspecting';
import { COMPANY_COLUMNS } from '../useProspecting.constants';
import { SORT_FIELDS } from './inactive.constant';

const SessionManager = SessionManagerFactory();

const DEFAULT_ORDER = 'lastAttemptOldest';

const sortAtom = atom({
  key: 'prospectCompanyInactiveSortAtom',
  default: { value: DEFAULT_ORDER, hasChanged: false },
});

const queryAtom = atom({
  key: 'prospectingCompanyInactiveQueryAtom',
  default: undefined,
});

/*END NEW ATOMS*/

function getQuery(hasSalesEnabled: boolean, bobjectFieldsEntity: any) {
  const assignedToField = bobjectFieldsEntity?.findByLogicRole(
    COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  );
  const statusField = bobjectFieldsEntity?.findByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.STATUS);
  const isInactive = bobjectFieldsEntity?.findByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.IS_INACTIVE);

  const query = {
    [assignedToField?.id]: SessionManager.getUser()?.id,
    ...(hasSalesEnabled
      ? {
          [COMPANY_FIELDS_LOGIC_ROLE.STAGE]: [
            '__MATCH_EMPTY_ROWS__',
            COMPANY_STAGE_LOGIC_ROLE.PROSPECT,
          ],
        }
      : {}),
  };

  return {
    ...query,
    [statusField?.id]: [
      COMPANY_STATUS_LOGIC_ROLE.ON_PROSPECTION,
      COMPANY_STATUS_LOGIC_ROLE.CONTACTED,
      COMPANY_STATUS_LOGIC_ROLE.ENGAGED,
      COMPANY_STATUS_LOGIC_ROLE.NURTURING,
      COMPANY_STATUS_LOGIC_ROLE.MEETING,
    ],
    [isInactive?.id]: COMPANY_FIELDS_LOGIC_ROLE.IS_INACTIVE + '__YES',
  };
}

export const useProspectingCompanyInactiveAggregation = () => {
  const hasSalesEnabled = useFullSalesEnabled();
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const query = getQuery(hasSalesEnabled, bobjectFieldsEntity);

  const { data: { data: { totalMatching } = {} } = {} } = useSearchSubscription(
    {
      query,
      //@ts-ignore
      columns: COMPANY_COLUMNS,
      formFields: true,
      pageSize: 1000,
      injectReferences: false,
    },
    BobjectTypes.Company,
  );

  return totalMatching;
};

export const useProspectingInactiveCompany = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const sort = SORT_FIELDS[useRecoilValue(sortAtom)?.value as keyof typeof SORT_FIELDS];
  const query: { [x: string]: any } = useRecoilValue(queryAtom);

  const { items: companies, ...other } = useProspectingItems(
    query,
    sort,
    null,
    BobjectTypes.Company,
  );

  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    if (companies.length > 0) {
      setFilteredCompanies(companies);
      setIsLoaded(true);
    } else {
      setFilteredCompanies(null);
    }
  }, [companies]);

  return {
    ...other,
    items: isLoaded ? filteredCompanies : [],
    totalMatching: isLoaded ? filteredCompanies?.length : 0,
  };
};

// New Hooks
export const useProspectingInactiveAllItems = () => {
  const { fetchCompanies } = useCompany('inactive-tab');
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

export const useProspectingCompanyInactiveQuery = () => {
  const [query, setQuery] = useRecoilState<{ [x: string]: any }>(queryAtom);
  const hasSalesEnabled = useFullSalesEnabled();
  const bobjectFieldsEntity = useEntity('bobjectFields');

  const defaultQuery = getQuery(hasSalesEnabled, bobjectFieldsEntity);

  return {
    query,
    setQuery: (value: { [id: string]: any }) => {
      setQuery({ ...defaultQuery, ...value });
    },
    resetQuery: () => setQuery(defaultQuery),
  };
};

export const useProspectingCompanyInactiveSort = () => {
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
