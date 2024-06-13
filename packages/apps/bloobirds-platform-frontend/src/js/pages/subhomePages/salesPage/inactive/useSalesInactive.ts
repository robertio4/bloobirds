import { useEffect, useMemo, useState } from 'react';

import {
  Bobject,
  BobjectType,
  BobjectTypes,
  MainBobjectTypes,
  FIELDS_LOGIC_ROLE,
  STAGE_VALUES_LOGIC_ROLES,
} from '@bloobirds-it/types';
import { atom, atomFamily, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import {
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_STATUS_LOGIC_ROLE,
} from '../../../../constants/opportunity';
import { useEntity } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { AllSortValues } from '../../../../layouts/subhomeLayout/subhomeContent/newSubhomeFilters/subhomeFilters';
import SessionManagerFactory from '../../../../misc/session';
import { BobjectPicklistValueEntity } from '../../../../typings/entities.js';
import { useSalesFutureTasks, useSalesItems } from '../useSales';
import { getSortFields } from './inactive.utils';

const getDefaultOrder = (bobjectType: BobjectType): AllSortValues => {
  if (bobjectType === BobjectTypes.Company || bobjectType === BobjectTypes.Lead) {
    return 'lastAttemptOldest';
  } else if (bobjectType === BobjectTypes.Opportunity) {
    return 'creationDateOldest';
  } else {
    console.error('getDefaultOrder: no default order for bobjectType: ', bobjectType);
  }
};

const SessionManager = SessionManagerFactory();

export const activeStatusesIds = atom<string[]>({
  key: 'inactiveOppStatusesIds',
  default: undefined,
});

const pageAtom = atom({
  key: 'salesInactivePage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'salesInactiveHasNextPage',
  default: true,
});

const subQueryAtom = atomFamily({
  key: 'salesInactiveSubQuery',
  default: undefined,
});

const queryAtom = atomFamily({
  key: 'salesInactiveQueryAtom',
  default: undefined,
});

const sortAtom = atomFamily({
  key: 'salesInactiveSortAtom',
  default: { value: undefined as AllSortValues, hasChanged: false },
});

export const useSalesItemsInactive = (bobjectType: MainBobjectTypes) => {
  const bobjectFields = useEntity('bobjectFields');

  const query = useRecoilValue(queryAtom(bobjectType));
  const sort = getSortFields(useRecoilValue(sortAtom(bobjectType))?.value, bobjectType);
  const ORs = useRecoilValue(subQueryAtom(bobjectType));

  const filteredUser =
    query && query[bobjectFields?.findByLogicRole(FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO)?.id];

  const [isLoading, setIsLoading] = useState(true);
  const setActiveOpportunityStatuses = useSetRecoilState(activeStatusesIds);
  const opportunityStatusField = useEntity('bobjectFields')?.findByLogicRole(
    OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS,
  );
  const futureTasks = useSalesFutureTasks(filteredUser);
  const picklistValues = useEntity('bobjectPicklistFieldValues');

  const { items: bobjects, isLoading: bobjectsLoading } = useSalesItems(
    query,
    ORs,
    sort,
    null,
    bobjectType,
  );

  useEffect(() => {
    const values = picklistValues
      .filterBy('bobjectField')(opportunityStatusField?.id)
      ?.filter(
        (status: { logicRole: string }) =>
          !Object.values(OPPORTUNITY_STATUS_LOGIC_ROLE)?.includes(status?.logicRole),
      )
      ?.map((status: { id: any }) => status?.id);
    setActiveOpportunityStatuses(values);
  }, [picklistValues]);
  const [filteredBobjects, setFilteredBobjects] = useState<Bobject[]>();

  useEffect(() => {
    setIsLoading(true);
  }, [bobjectType]);
  const parsedFutureTasks = useMemo((): { [x: string]: Array<string> } => {
    return futureTasks
      ?.map((task: { contents: any }) => task?.contents)
      .reduce((prev: { [x: string]: any }, curr: { [x: string]: any }) => {
        Object.keys(curr).forEach(key => {
          if (curr[key])
            return (prev[key] = prev[key]
              ? prev[key].includes(curr[key])
                ? prev[key]
                : [...prev[key], curr[key]]
              : [curr[key]]);
        });
        return { ...prev };
      }, {});
  }, [futureTasks]);

  useEffect(() => {
    const bobjectsWithoutFutureTasks: Bobject[] = [];
    const bobjectTypeRelatedTasks =
      parsedFutureTasks &&
      Object.values(parsedFutureTasks).find(taskArray => taskArray[0]?.includes(bobjectType));
    //key should be the bobjectTypeId ?
    // futureTasks[bobjectTypeId];

    if (bobjects?.length > 0 && bobjectTypeRelatedTasks?.length > 0) {
      bobjects.forEach(bobject => {
        if (!bobjectTypeRelatedTasks?.includes(bobject?.id?.value)) {
          bobjectsWithoutFutureTasks.push(bobject);
        }
      });
      setFilteredBobjects(bobjectsWithoutFutureTasks);
      setIsLoading(false);
    } else {
      setFilteredBobjects(bobjects);
      if (!bobjectsLoading) setIsLoading(false);
    }
  }, [bobjects, parsedFutureTasks]);

  return {
    isLoading,
    items: filteredBobjects || [],
    totalMatching: filteredBobjects?.length,
  };
};

export const useSalesInactivePage = () => {
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

export const useSalesInactiveQuery = (bobjectType: MainBobjectTypes) => {
  const [query, setQuery] = useRecoilState(queryAtom(bobjectType));

  const hasSalesEnabled = useFullSalesEnabled();

  const bobjectFieldsEntity = useEntity('bobjectFields');
  const bobjectPicklistValuesEntity = useEntity('bobjectPicklistFieldValues');

  const assignedLR = FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO;
  const assignedToField = bobjectFieldsEntity?.findByLogicRole(assignedLR);
  const stageLR = FIELDS_LOGIC_ROLE[bobjectType].STAGE;
  const stageField = bobjectFieldsEntity?.findByLogicRole(stageLR);
  const inactiveField = bobjectFieldsEntity?.findByLogicRole(
    FIELDS_LOGIC_ROLE[bobjectType].IS_INACTIVE,
  );
  const oppStage = bobjectFieldsEntity?.findByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS);
  const salesStatusLR =
    FIELDS_LOGIC_ROLE[bobjectType as Exclude<MainBobjectTypes, 'Opportunity'>].SALES_STATUS;
  const salesStatusField = bobjectFieldsEntity?.findByLogicRole(salesStatusLR);
  const salesStatusValues = bobjectPicklistValuesEntity
    ?.filterBy('bobjectField')(salesStatusField?.id)
    ?.filter(
      (salesStatus: BobjectPicklistValueEntity) =>
        !['Discarded', 'On Hold', 'Client'].includes(salesStatus?.value),
    )
    ?.map((status: BobjectPicklistValueEntity) => status?.id);
  const oppStatuses = bobjectPicklistValuesEntity
    ?.filterBy('bobjectField')(oppStage?.id)
    ?.filter(
      (salesStatus: BobjectPicklistValueEntity) =>
        ![
          OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_LOST,
          OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_WON,
        ].includes(salesStatus?.logicRole),
    )
    ?.map((status: BobjectPicklistValueEntity) => status?.id);

  const defaultQuery = {
    [assignedToField?.id]: SessionManager?.getUser()?.id,
    ...(bobjectType !== BobjectTypes.Opportunity && hasSalesEnabled
      ? {
          [stageField?.id]: [STAGE_VALUES_LOGIC_ROLES[bobjectType].SALES],
          [salesStatusField?.id]: salesStatusValues,
        }
      : {}),
    ...(bobjectType === BobjectTypes.Opportunity && {
      [oppStage?.id]: {
        query: oppStatuses,
      },
    }),
    [inactiveField?.id]: FIELDS_LOGIC_ROLE[bobjectType].IS_INACTIVE + '__YES',
  };

  return {
    query,
    setQuery: (value: object) => {
      setQuery({ ...defaultQuery, ...value });
    },
    resetQuery: () => {
      setQuery(defaultQuery);
    },
  };
};

export const useSalesInactiveSort = (bobjectType: MainBobjectTypes) => {
  const [sort, setSort] = useRecoilState(sortAtom(bobjectType));
  if (sort?.value === undefined) {
    setSort({ value: getDefaultOrder(bobjectType), hasChanged: false });
  }

  return {
    sort,
    setSort: (value: AllSortValues) => {
      if (!value || value === getDefaultOrder(bobjectType)) {
        setSort({ value: getDefaultOrder(bobjectType), hasChanged: false });
      } else {
        setSort({ value, hasChanged: true });
      }
    },
  };
};
