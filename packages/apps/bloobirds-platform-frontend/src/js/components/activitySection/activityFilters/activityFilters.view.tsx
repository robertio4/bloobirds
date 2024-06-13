import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import {
  DateRangePicker,
  Dropdown,
  Icon,
  IconButton,
  Item,
  Tag,
  TagGroup,
  Text,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { isEqual } from 'lodash';

import { useActiveActivitiesFilters } from '../../../hooks/useActiveActivities';
import { useNewCadenceTableEnabled } from '../../../hooks/useFeatureFlags';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import styles from './activityFilters.module.css';

const ACTIVITY_FILTERS = [
  { label: 'Calls', value: 'ACTIVITY__TYPE__CALL' },
  { label: 'Emails', value: 'ACTIVITY__TYPE__EMAIL' },
  { label: 'Inbound', value: 'ACTIVITY__TYPE__INBOUND' },
  { label: 'LinkedIn', value: 'ACTIVITY__TYPE__LINKEDIN_MESSAGE' },
  { label: 'Meetings', value: 'ACTIVITY__TYPE__MEETING' },
  { label: 'Cadence', value: 'ACTIVITY__TYPE__CADENCE' },
  { label: 'Custom Task', value: 'ACTIVITY__TYPE__CUSTOM_TASK' },
  { label: 'Note', value: 'ACTIVITY__TYPE__NOTE' },
  { label: 'Updates', value: 'ACTIVITY__TYPE__STATUS' },
];

export enum ACTIVITY_FILTERS_KEYS {
  ACTIVITY__TYPE__CALL = 'ACTIVITY__TYPE__CALL',
  ACTIVITY__TYPE__EMAIL = 'ACTIVITY__TYPE__EMAIL',
  ACTIVITY__TYPE__INBOUND = 'ACTIVITY__TYPE__INBOUND',
  ACTIVITY__TYPE__LINKEDIN_MESSAGE = 'ACTIVITY__TYPE__LINKEDIN_MESSAGE',
  ACTIVITY__TYPE__MEETING = 'ACTIVITY__TYPE__MEETING',
  ACTIVITY__TYPE__CADENCE = 'ACTIVITY__TYPE__CADENCE',
  ACTIVITY__TYPE__NOTE = 'ACTIVITY__TYPE__NOTE',
  ACTIVITY__TYPE__STATUS = 'ACTIVITY__TYPE__STATUS',
}

const DateFilters = () => {
  const { startDate, endDate, setDateFilter, resetDateFilter } = useActiveActivitiesFilters();

  useEffect(() => {
    return () => {
      resetDateFilter();
    };
  }, []);

  const handleChange = (newValue: { start: Date; end: Date }) => {
    if (!newValue.start) {
      resetDateFilter();
    } else {
      setDateFilter({ startDate: newValue.start, endDate: newValue.end });
    }
  };

  return (
    <div className={styles._filter_date}>
      <DateRangePicker
        placeholder="Date range"
        value={{ start: startDate, end: endDate }}
        onChange={handleChange}
        dropdownProps={{ position: 'bottom-end', expand: false }}
      />
    </div>
  );
};

const TypeFilters = () => {
  const { typeFilter, setTypeFilter } = useActiveActivitiesFilters();
  const [tabGroupValue, setTabGroupValue] = useState([]);
  const anchorRef = useRef<HTMLDivElement>(null);
  const { visible, setVisible, ref } = useVisible(false, anchorRef);
  const { saveCustom, helpers } = useUserHelpers();
  const newCadenceEnabled = useNewCadenceTableEnabled();

  const activityFilters =
    //@ts-ignore
    helpers?.['ACTIVITY_FILTERS'] && JSON.parse(helpers?.['ACTIVITY_FILTERS'])?.filter(i => i);
  const [visibleFilters, setVisibleFilters] = useState<string[]>(
    activityFilters?.filter(Boolean) ||
      ACTIVITY_FILTERS.map(({ value }) => {
        if (value !== 'ACTIVITY__TYPE__STATUS') return value;
      })?.filter(Boolean),
  );

  function toggleVisible() {
    setVisible(!visible);
  }

  useEffect(() => {
    if (typeFilter?.length === 0) {
      setTabGroupValue([]);
    } else {
      setTabGroupValue(typeFilter);
    }
  }, [typeFilter]);

  useLayoutEffect(() => {
    if (typeFilter?.length === 0) {
      setTabGroupValue([]);
      setTypeFilter(visibleFilters);
    }
  }, []);

  useLayoutEffect(() => {
    if (!typeFilter.every(value => tabGroupValue.includes(value))) {
      setTabGroupValue(typeFilter);
    }
  }, [typeFilter]);

  function handleFiltersVisibility(filterValue: string[]) {
    let filtersToSave;
    if (visibleFilters?.includes(filterValue)) {
      filtersToSave = visibleFilters.filter(filter => filter !== filterValue);
    } else {
      filtersToSave = [...visibleFilters, filterValue];
    }
    saveCustom({ key: 'ACTIVITY_FILTERS', data: JSON.stringify(filtersToSave) });
    if (tabGroupValue?.length === 0) {
      setTypeFilter(filtersToSave);
    } else {
      setTypeFilter(tabGroupValue);
    }
    setVisibleFilters(filtersToSave);
  }

  function handleTagGroupChange(value: string[]) {
    setTabGroupValue(value);
    const parsedFilterValue = value?.length !== 0 ? value : visibleFilters;
    setTypeFilter(parsedFilterValue);
  }

  return (
    <div className={styles._filters}>
      <TagGroup
        value={
          tabGroupValue?.length === 0 || isEqual(tabGroupValue, visibleFilters) ? [] : tabGroupValue
        }
        onChange={handleTagGroupChange}
        uppercase={false}
      >
        {ACTIVITY_FILTERS.map(({ label, value }) => {
          if (
            visibleFilters?.includes(value) &&
            ((newCadenceEnabled && value === 'ACTIVITY__TYPE__CUSTOM_TASK') ||
              value !== 'ACTIVITY__TYPE__CUSTOM_TASK')
          )
            return (
              <Tag key={value} value={value}>
                {label}
              </Tag>
            );
        })}
      </TagGroup>
      <Dropdown
        visible={visible}
        ref={ref}
        anchor={
          <IconButton ref={anchorRef} name="settings" color="bloobirds" onClick={toggleVisible} />
        }
        width={150}
      >
        {ACTIVITY_FILTERS.filter(
          ({ value }) =>
            value !== 'ACTIVITY__TYPE__CUSTOM_TASK' ||
            (newCadenceEnabled && value === 'ACTIVITY__TYPE__CUSTOM_TASK'),
        ).map(({ value, label }, index) => {
          const isHidden = !visibleFilters?.includes(value);
          return (
            <div key={index} className={styles._filter_selector_items}>
              <Item key={value} value={value} onClick={value => handleFiltersVisibility(value)}>
                <Text size="s" color={isHidden ? 'softPeanut' : 'bloobirds'}>
                  {label}
                </Text>
                <Icon name={isHidden ? 'eyeOff' : 'eye'} />
              </Item>
            </div>
          );
        })}
      </Dropdown>
    </div>
  );
};

const ActivityFilters = () => (
  <div className={styles._filters_container}>
    <TypeFilters />
    <DateFilters />
  </div>
);

export default ActivityFilters;
