import React from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, Item, Select } from '@bloobirds-it/flamingo-ui';
import { DateFilterValues } from '@bloobirds-it/types';

import { DATE_FILTER_VALUES } from '../../../smartEmailHelper.constants';
import styles from '../similarDeals.module.css';

export type SimilarDealsTimeFilterProps = {
  dateFilter: DateFilterValues;
  setDateFilter: (x: DateFilterValues) => void;
};

const SimilarDealsTimeFilter = ({ dateFilter, setDateFilter }: SimilarDealsTimeFilterProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'smartEmailModal.similarDealsTab' });

  return (
    <div className={styles._time_select}>
      <Icon name="calendar" color="bloobirds" size={16} />
      <Select
        size="small"
        borderless
        placeholder={t('datePlaceholder')}
        value={dateFilter}
        onChange={value => {
          setDateFilter(value);
        }}
      >
        {DATE_FILTER_VALUES?.map(item => (
          <Item key={item.value} value={item.value}>
            {item.label}
          </Item>
        ))}
      </Select>
    </div>
  );
};

export default SimilarDealsTimeFilter;
