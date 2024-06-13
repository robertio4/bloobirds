import React from 'react';

import { DateValue, RelativeDatePicker } from '@bloobirds-it/flamingo-ui';

import { useMediaQuery } from '../../../../../hooks';
import { useSubhomeFilters } from '../../../../../hooks/useSubhomeFilters';
import styles from '../../../../../pages/inboxPage/inboxPage.module.css';
// eslint-disable-next-line import/no-unresolved
import { getBobjectFromLogicRole } from '../../../../../utils/bobjects.utils';
import { isObject } from '../../../../../utils/objects.utils';

const RelativeDateFilter = ({ fieldLR }: { fieldLR: string }) => {
  const { getFilterValue, setFilter } = useSubhomeFilters();
  const { isSmallDesktop } = useMediaQuery();

  const handleOnChange = (value: any) => {
    setFilter(getBobjectFromLogicRole(fieldLR), fieldLR, value);
  };

  const filterValue = getFilterValue(fieldLR);
  let parsedFilterValue: DateValue;
  if (isObject(filterValue)) {
    parsedFilterValue = {
      type: 'custom',
      start: new Date(filterValue?.value?.start),
      end: new Date(filterValue?.value?.end),
    };
  }

  return (
    <div className={styles.filter_relative_date}>
      <RelativeDatePicker
        width={isSmallDesktop ? '80' : '150'}
        value={parsedFilterValue}
        onChange={handleOnChange}
        placeholder="Creation date"
        size="small"
      />
    </div>
  );
};

export default RelativeDateFilter;
