import React, { useEffect, useRef, useState } from 'react';
import { Trans } from 'react-i18next';

import {
  Dropdown,
  Icon,
  IconButton,
  Item,
  Tag,
  TagGroup,
  Text,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useIsNoStatusPlanAccount, useUserHelpers } from '@bloobirds-it/hooks';
import { ACTIVITY_TYPES_VALUES_LOGIC_ROLE } from '@bloobirds-it/types';
import clsx from 'clsx';

import styles from './pastActivityFilters.module.css';

export const PAST_ACTIVITY_FILTERS = [
  {
    label: <Trans i18nKey="activityTimelineItem.pastActivityFilters.calls" />,
    value: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL,
  },
  {
    label: <Trans i18nKey="activityTimelineItem.pastActivityFilters.emails" />,
    value: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL,
  },
  {
    label: <Trans i18nKey="activityTimelineItem.pastActivityFilters.meetings" />,
    value: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING,
  },
  {
    label: <Trans i18nKey="activityTimelineItem.pastActivityFilters.linkedin" />,
    value: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN,
  },
  {
    label: <Trans i18nKey="activityTimelineItem.pastActivityFilters.inbound" />,
    value: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND,
  },
  {
    label: <Trans i18nKey="activityTimelineItem.pastActivityFilters.notes" />,
    value: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE,
  },
  {
    label: <Trans i18nKey="activityTimelineItem.pastActivityFilters.customTask" />,
    value: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK,
  },
  {
    label: <Trans i18nKey="activityTimelineItem.pastActivityFilters.cadence" />,
    value: 'ACTIVITY__TYPE__CADENCE',
  },
  {
    label: <Trans i18nKey="activityTimelineItem.pastActivityFilters.updates" />,
    value: 'ACTIVITY__TYPE__STATUS',
  },
];

const PastActivityTypeFilter = ({
  filters,
  setTypeFilter,
  sidePeekEnabled,
}: {
  filters: any;
  setTypeFilter: any;
  sidePeekEnabled?: boolean;
}) => {
  const isNoStatusBased = useIsNoStatusPlanAccount();
  const [tabGroupValue, setTabGroupValue] = useState([]);
  const anchorRef = useRef();
  const { visible, setVisible, ref } = useVisible(false, anchorRef);
  const { saveCustom, helpers } = useUserHelpers();

  const activityFilters =
    helpers?.['ACTIVITY_FILTERS'] && JSON.parse(helpers?.['ACTIVITY_FILTERS'])?.filter(i => i);
  const [visibleFilters, setVisibleFilters] = useState(
    activityFilters ||
      PAST_ACTIVITY_FILTERS.map(({ value }) => {
        if (value !== 'ACTIVITY__TYPE__STATUS') return value;
      }),
  );

  const filtersToDisplay = PAST_ACTIVITY_FILTERS.filter(({ value }) => {
    return isNoStatusBased ? value !== ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS : true;
  });

  function toggleVisible() {
    setVisible(!visible);
  }

  function handleFiltersVisibility(filterValue) {
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

  function handleTagGroupChange(value) {
    let valueToSave = value;
    if (value.length === PAST_ACTIVITY_FILTERS.length) valueToSave = [];
    setTabGroupValue(valueToSave);
    setTypeFilter(valueToSave);
  }

  useEffect(() => {
    setTabGroupValue(filters.type);
  }, []);

  const filtersClasses = clsx(styles._filters, {
    [styles._filters__sidePeek]: sidePeekEnabled,
  });

  return (
    <div className={filtersClasses}>
      <TagGroup value={tabGroupValue} onChange={handleTagGroupChange} uppercase={false}>
        {filtersToDisplay.map(({ label, value }) => {
          if (visibleFilters?.includes(value)) {
            return (
              <Tag key={value} value={value}>
                {label}
              </Tag>
            );
          }
        })}
        <Dropdown
          visible={visible}
          ref={ref}
          anchor={
            <div ref={anchorRef}>
              <IconButton name="settings" color="bloobirds" onClick={toggleVisible} />
            </div>
          }
          width={150}
        >
          {filtersToDisplay.map(({ value, label }, index) => {
            const isHidden = !visibleFilters?.includes(value);
            return (
              <div key={index} className={styles._filter_selector_items}>
                <Item
                  key={value}
                  value={value}
                  onClick={value => handleFiltersVisibility(value)}
                  className={styles._filter_type_item_wrapper}
                >
                  <Text size="s" color={isHidden ? 'softPeanut' : 'bloobirds'}>
                    {label}
                  </Text>
                  <Icon name={isHidden ? 'eyeOff' : 'eye'} />
                </Item>
              </div>
            );
          })}
        </Dropdown>
      </TagGroup>
    </div>
  );
};

export default PastActivityTypeFilter;
