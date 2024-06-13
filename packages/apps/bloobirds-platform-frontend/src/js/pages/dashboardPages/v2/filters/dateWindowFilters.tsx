import React, { useCallback, useMemo } from 'react';
import { Icon, RelativeDatePicker } from '@bloobirds-it/flamingo-ui';
import useDashboardFilters, { RangeType } from '../../../../hooks/useDashboardFilters';
import { isIntervalSelectable } from '../../utils/isIntervalSelectable';
import { FilterItem } from './filterItem';
import { FrequencySelect } from './frequencySelect';

export const DateWindowFilters = () => {
  const {
    intervalFilter,
    setIntervalFilter,
    dateRangeTypeFilter,
    dateRangeStartFilter,
    dateRangeEndFilter,
    setDateRange,
  } = useDashboardFilters({});

  const datePickerValue = useMemo(() => {
    const result: { type: RangeType; start?: Date; end?: Date } = {
      type: dateRangeTypeFilter as RangeType,
    };
    if (dateRangeTypeFilter === 'custom') {
      result.start = dateRangeStartFilter;
      result.end = dateRangeEndFilter;
    }
    return result;
  }, [dateRangeTypeFilter, dateRangeEndFilter, dateRangeStartFilter]);

  const isIntervalDisabled = useCallback(
    interval => {
      if (!interval || !dateRangeTypeFilter) return false;
      else
        return !isIntervalSelectable({
          interval,
          type: dateRangeTypeFilter,
          start: dateRangeStartFilter,
          end: dateRangeEndFilter,
        });
    },
    [datePickerValue, dateRangeStartFilter, dateRangeEndFilter],
  );

  return (
    <>
      <FilterItem>
        <RelativeDatePicker
          untilToday
          dataTest="relative-date-picker-element"
          value={datePickerValue}
          adornment={<Icon name="calendar" size={12} color="softPeanut" />}
          onChange={({ type, start, end }) => {
            // Avoids a rerender on initial load
            if (type !== 'custom' && type === datePickerValue.type) {
              return;
            }

            setDateRange({ type, start, end });
          }}
          size="small"
          variant="form"
        />
      </FilterItem>
      <FilterItem>
        <FrequencySelect
          isIntervalDisabled={isIntervalDisabled}
          value={intervalFilter}
          onChange={value => {
            setIntervalFilter(value);
          }}
        />
      </FilterItem>
    </>
  );
};
