import { useTranslation } from 'react-i18next';

import { RelativeDatePicker } from '@bloobirds-it/flamingo-ui';
import { DateValue } from '@bloobirds-it/flamingo-ui/dist/components/RelativeDatePicker/RelativeDatePicker';
import { useMediaQuery } from '@bloobirds-it/hooks';
import { getBobjectFromLogicRole, isObject } from '@bloobirds-it/utils';

import { useFilters } from '../../hooks';
import styles from './relativeDateFilter.module.css';

const RelativeDateFilter = ({ fieldLR }: { fieldLR: string }) => {
  const { getFilterValue, setFilter } = useFilters();
  const { isSmallDesktop } = useMediaQuery();
  const { t } = useTranslation();

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
        placeholder={t('common.creationDate')}
        size="small"
        t={(key: string) => t(`leftBar.dateFilter.${key}`)}
      />
    </div>
  );
};

export default RelativeDateFilter;
