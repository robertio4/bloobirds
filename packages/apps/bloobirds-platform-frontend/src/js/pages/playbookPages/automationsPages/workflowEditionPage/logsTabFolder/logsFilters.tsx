import React, { useEffect, useState } from 'react';
import { Text, Switch, DateRangePicker } from '@bloobirds-it/flamingo-ui';
import styles from './logsTab.module.css';
import { useWorkflow } from '../context/workflowsContext';
import { BobjectType } from '../../../../../typings/bobjects';
import { formatDate } from '@bloobirds-it/utils';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { BobjectVirtualizedSelect } from './bobjectVirtualizedSelect';

const bobjectFilterRelations = {
  [BOBJECT_TYPES.LEAD]: [[BOBJECT_TYPES.COMPANY], [BOBJECT_TYPES.LEAD]],
  [BOBJECT_TYPES.COMPANY]: [[BOBJECT_TYPES.COMPANY]],
  [BOBJECT_TYPES.TASK]: [[BOBJECT_TYPES.COMPANY], [BOBJECT_TYPES.LEAD]],
  [BOBJECT_TYPES.ACTIVITY]: [[BOBJECT_TYPES.COMPANY], [BOBJECT_TYPES.LEAD]],
  [BOBJECT_TYPES.OPPORTUNITY]: [[BOBJECT_TYPES.COMPANY], [BOBJECT_TYPES.OPPORTUNITY]],
};

export const LogsFilters = ({ bobjectType }: { bobjectType: BobjectType }) => {
  const [relatedBobjectsIds, setRelatedBobjectIds] = useState({});
  const [dateRange, setDateRange] = useState();
  const {
    updateLogFilter,
    state: {
      logsFilters: { showEditionOnly },
    },
  } = useWorkflow();

  const updateDatetimeFilter = (value: React.SetStateAction<{ start: any; end: any }>) => {
    value === null ? setDateRange({ start: null, end: null }) : setDateRange(value);
    let dateTime;
    if (value?.start && typeof value.start === 'object') {
      dateTime = {
        dateFrom: formatDate(value?.start, "yyyy-MM-dd'T'HH:mm:ss"),
        dateTo: formatDate(value?.end, "yyyy-MM-dd'T'HH:mm:ss"),
      };
    }
    if (value?.start === null) {
      dateTime = { dateFrom: undefined, dateTo: undefined };
    }
    updateLogFilter('dateTime', {
      ...dateTime,
    });
  };
  useEffect(() => {
    updateLogFilter('associatedBobjects', relatedBobjectsIds);
  }, [relatedBobjectsIds]);
  return (
    <div className={styles._filters_container}>
      <div className={styles._select_filters}>
        <div className={styles._filter__input}>
          <DateRangePicker
            width="150px"
            size="small"
            placeholder="Datetime of enrollment"
            darkMode={true}
            value={dateRange}
            onChange={value => updateDatetimeFilter(value)}
          />
        </div>
        {bobjectFilterRelations[bobjectType]?.map(filterBobjectType => {
          const placeholder =
            filterBobjectType[0] === bobjectType ? bobjectType : `${filterBobjectType} associated`;
          return (
            <div key={`${filterBobjectType}-related-filter`} className={styles._filter__input}>
              <BobjectVirtualizedSelect
                bobjectType={filterBobjectType[0]}
                placeholder={placeholder}
                bobjectIds={relatedBobjectsIds}
                updateBobjectId={(value: any) =>
                  setRelatedBobjectIds({ ...relatedBobjectsIds, [filterBobjectType[0]]: value })
                }
              />
            </div>
          );
        })}
        <div className={styles._filters_switch}>
          <Switch
            checked={showEditionOnly}
            onChange={() => {
              updateLogFilter('showEditionOnly', !showEditionOnly);
            }}
          />
          <Text size="xs" className={styles._filter_text}>
            See only edition logs
          </Text>
        </div>
      </div>
    </div>
  );
};
