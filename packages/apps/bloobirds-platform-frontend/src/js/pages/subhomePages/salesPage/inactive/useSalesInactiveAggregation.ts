import { useEffect, useMemo, useState } from 'react';
import { useSearchSubscription } from '@bloobirds-it/plover';
import { getBaseQuery } from './inactive.utils';
import { useSalesFutureTasks } from '../useSales';
import { BobjectTypes, FIELDS_LOGIC_ROLE, Bobject } from '@bloobirds-it/types';
import { MainBobjectTypes } from '../../../../hooks/useSubhomeFilters';
import { BobjectPicklistValueEntity } from '../../../../typings/entities.js';
import { useEntity } from '../../../../hooks';
import {
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_STATUS_LOGIC_ROLE,
} from '../../../../constants/opportunity';

const useSalesInactiveAggregation = (bobjectType: MainBobjectTypes) => {
  const bobjectPicklistValuesEntity = useEntity('bobjectPicklistFieldValues');
  const bobjectFieldsEntity = useEntity('bobjectFields');
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

  const query = getBaseQuery(
    bobjectType,
    bobjectType === 'Opportunity' ? oppStatuses : salesStatusValues,
  );

  const futureTasks = useSalesFutureTasks();
  const { data: { data: { contents: bobjects } = {} } = {} } = useSearchSubscription(
    {
      query,
      formFields: true,
      pageSize: 1000,
      injectReferences: false,
    },
    bobjectType,
  );

  const [filteredBobjects, setFilteredBobjects] = useState([]);
  const parsedFutureTasks = useMemo(() => {
    return futureTasks
      ?.map(task => task?.contents)
      .reduce((prev, curr) => {
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
    } else {
      setFilteredBobjects(bobjects);
    }
  }, [bobjects, futureTasks]);

  return filteredBobjects?.length;
};

export const useSalesAllInactiveAggregation = () => {
  return {
    company: useSalesInactiveAggregation(BobjectTypes.Company),
    lead: useSalesInactiveAggregation(BobjectTypes.Lead),
    opportunity: useSalesInactiveAggregation(BobjectTypes.Opportunity),
  };
};

export const useSalesSumInactiveAggregation = () => {
  return (
    useSalesInactiveAggregation(BobjectTypes.Company) +
    useSalesInactiveAggregation(BobjectTypes.Lead) +
    useSalesInactiveAggregation(BobjectTypes.Opportunity)
  );
};
