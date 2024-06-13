import { useCustomTasks } from '@bloobirds-it/hooks';
import { groupBy } from 'lodash';

import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../constants/activity';

// TODO: Make unit test for this function
export const aggregationToChartData = ({ data }) => {
  return data
    ?.sort((a, b) => a.fieldDataList[0]?.valueOrdering - b.fieldDataList[0]?.valueOrdering)
    ?.map(field => {
      return {
        color: field.fieldDataList[0].valueBackgroundColor,
        group: field.fieldDataList[0].text,
        value: field.value,
      };
    });
};

export const aggregationToStackedChartData = ({ data, activityLogicRole }) => {
  if (data) {
    const values = groupBy(
      data,
      d => d?.fieldDataList?.find(x => x?.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.USER)?.value,
    );
    return Object.values(values).reduce((acc, value) => {
      const userField = value[0]?.fieldDataList?.find(
        fields => fields?.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.USER,
      );
      const username = userField?.text;
      const userId = userField?.value;
      const stacks = value?.reduce((target, k, index) => {
        const key = value[index]?.fieldDataList?.find(x => x?.logicRole === activityLogicRole)
          ?.text;
        target[key] = value[index]?.value;
        return target;
      }, {});
      acc[username] = {
        groupKey: username,
        id: userId,
        ...stacks,
      };
      return acc;
    }, {});
  } else {
    return undefined;
  }
};

export const customActivitiesStackedData = ({ data }) => {
  const { customTasks } = useCustomTasks({ disabled: true });
  if (data) {
    const values = groupBy(
      data,
      d => d?.fieldDataList?.find(x => x?.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.USER)?.value,
    );
    return Object.values(values).reduce((acc, value) => {
      const userField = value[0]?.fieldDataList?.find(
        fields => fields?.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.USER,
      );
      const username = userField?.text;
      const userId = userField?.value;
      const stacks = value?.reduce((target, k, index) => {
        const key = value[index]?.fieldDataList?.find(
          x => x?.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK,
        )?.text;
        const customTask = customTasks?.find(ct => ct.id === key);
        if (customTask) {
          target[customTask.name] = value[index]?.value;
        }
        return target;
      }, {});
      acc[username] = {
        groupKey: username,
        id: userId,
        ...stacks,
      };
      return acc;
    }, {});
  } else {
    return undefined;
  }
};

export const mergeStacks = stacks => {
  const reducedStacks = stacks.reduce((acc, stack) => {
    if (stack) {
      Object.keys(stack).forEach(key => {
        acc[key] = { ...acc[key], ...stack[key] };
      });
    }

    return acc;
  }, {});
  const data = Object.values(reducedStacks);
  data.sort((a, b) => {
    const sumA = Object.values(a)
      .filter(v => typeof v === 'number')
      .reduce((acc, v) => acc + v, 0);
    const sumB = Object.values(b)
      .filter(v => typeof v === 'number')
      .reduce((acc, v) => acc + v, 0);
    if (sumB < sumA) {
      return -1;
    }
    if (sumB > sumA) {
      return 1;
    }
    return 0;
  });
  return data;
};
