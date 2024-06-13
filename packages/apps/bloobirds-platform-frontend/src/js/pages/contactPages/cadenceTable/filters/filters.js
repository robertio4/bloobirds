import React, { useEffect, useState } from 'react';
import { Select, Item, Button } from '@bloobirds-it/flamingo-ui';
import { useTimetableFilters } from '../../../../hooks/useTimetable';
import styles from './filters.module.css';

const Filters = ({ onTodayClick }) => {
  const [, forceUpdate] = useState();
  const {
    timeWindowFilter,
    kindFilter,
    setTimeWindowFilter,
    setKindFilter,
    resetAllFilters,
  } = useTimetableFilters();

  useEffect(() => {
    forceUpdate(timeWindowFilter);
  }, [timeWindowFilter]);

  useEffect(
    () => () => {
      resetAllFilters();
    },
    [],
  );

  return (
    <div className={styles._wrapper}>
      Show:
      <div data-intercom="visual-cadence-time-window" className={styles._filter_wrapper}>
        <Select
          onChange={value => setTimeWindowFilter(value, null)}
          placeholder="Time Window"
          size="small"
          value={timeWindowFilter}
          variant="filters"
          width="150px"
        >
          <Item value="daily">Daily</Item>
          <Item value="weekly">Weekly</Item>
          <Item value="monthly">Monthly</Item>
        </Select>
      </div>
      <div className={styles._filter_wrapper}>
        <Select
          onChange={setKindFilter}
          placeholder="Type"
          size="small"
          value={kindFilter}
          variant="filters"
          width="120px"
        >
          <Item value="anyKind">Any Type</Item>
          <Item value="attempts">Attempts</Item>
          <Item value="touches">Touches</Item>
          <Item value="incoming">Incoming</Item>
          <Item value="outgoing">Outgoing</Item>
        </Select>
      </div>
      <div className={styles._filter_wrapper}>
        <Button variant="tertiary" size="small" onClick={onTodayClick}>
          Today
        </Button>
      </div>
    </div>
  );
};

Filters.propTypes = {};

export default Filters;
