import useSWR from 'swr';
import { api } from '@bloobirds-it/utils';

type FieldCondition = {
  requiredParentField: {
    label: string;
    name: string;
    type: string;
    bobjectType: string;
  };
  requiredValue: {
    label: string;
    name: string;
    parent: string;
    logicRole: string;
  };
  childField: {
    label: string;
    name: string;
    type: string;
    bobjectType: string;
  };
  fieldValuesToDisplay: {
    label: string;
    name: string;
    parent: string;
    logicRole: string;
  }[];
};

type FieldConditionsResponse = FieldCondition[];

export const useFieldDependencies = (parentLogicRole, childLogicRole) => {
  const { data } = useSWR([`/fieldConditions/search` + childLogicRole + parentLogicRole], () => {
    return api.post('/utils/service/dependencies/fieldValueConditions/search', {
      requiredParentFieldLogicRole: parentLogicRole,
      requiredChildFieldLogicRole: childLogicRole,
    });
  });

  return data?.data as FieldConditionsResponse;
};
