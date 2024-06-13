import React, { useCallback, useMemo } from 'react';
import { isIntervalSelectable } from '../../utils/isIntervalSelectable';
import { useDashboard } from '../../../../hooks';
import { Icon, RelativeDatePicker } from '@bloobirds-it/flamingo-ui';
import { FrequencySelect } from './frequencySelect';
import { FilterItem } from './filterItem';

function DateWindowFilters() {
  const {
    intervalFilter,
    setIntervalFilter,
    dateRangeTypeFilter,
    dateRangeStartFilter,
    dateRangeEndFilter,
    setDateRange,
    updateEvolutionData,
  } = useDashboard();

  const datePickerValue = useMemo(() => {
    const result = {
      type: dateRangeTypeFilter,
    };
    if (dateRangeTypeFilter === 'custom') {
      result.start = dateRangeStartFilter;
      result.end = dateRangeEndFilter;
    }
    return result;
  }, [dateRangeTypeFilter, dateRangeEndFilter, dateRangeStartFilter]);

  const isIntervalDisabled = useCallback(
    interval =>
      !isIntervalSelectable({
        interval,
        type: dateRangeTypeFilter,
        start: dateRangeStartFilter,
        end: dateRangeEndFilter,
      }),
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
          value={intervalFilter}
          isIntervalDisabled={isIntervalDisabled}
          onChange={value => {
            setIntervalFilter(value);
            updateEvolutionData(value);
          }}
        />
      </FilterItem>
    </>
  );
}

export default DateWindowFilters;
