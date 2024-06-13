import React from 'react';
import { useTranslation } from 'react-i18next';

import { CheckItem, IconButton, MultiSelect, Text } from '@bloobirds-it/flamingo-ui';

import styles from '../segmentationFilter.module.css';
import { useSegmentationFilter } from '../useSegmentationFilter';
import { ActiveFiltersLabelBlock } from './activeFiltersLabels';

export const CategoryBlock = ({
  segmentationField: { id: sectionId, name: sectionName, values: sectionValues },
  selectedValues,
  segmentationField,
  onChange,
}) => {
  const { clearBlock, isSmartEmail } = useSegmentationFilter();
  const { t } = useTranslation('translation', { keyPrefix: 'playbook.segmentationFilter' });

  return (
    <div className={styles.categoryBlock}>
      <div className={styles.blockHeader}>
        <Text size="xs">{sectionName}</Text>
        {selectedValues?.length > 0 && (
          <div
            className={styles.clearLabel}
            onClick={() => {
              clearBlock(sectionId);
            }}
          >
            <IconButton name="cross" size={14} color="purple" />
            <Text size="xxs" color="purple">
              {t('clearButton')}
            </Text>
          </div>
        )}
      </div>
      <div className={styles.selectorMultiselect}>
        <MultiSelect
          dropdownProps={{ zIndex: 20000 }}
          size="small"
          value={selectedValues ? selectedValues : []}
          width={isSmartEmail ? '356px' : '100%'}
          renderDisplayValue={() =>
            selectedValues?.length === 0 || !selectedValues
              ? t('selectedValue', { sectionName })
              : t('multipleSelectedValues', { count: selectedValues?.length ?? 0 })
          }
          onChange={onChange}
          selectAllOption
          autocomplete
        >
          {sectionValues.map(value => {
            return React.cloneElement(
              <CheckItem key={value.id} value={value.id} label={value.name}>
                {value.name}
              </CheckItem>,
              { checked: selectedValues?.includes(value.id) && false },
            );
          })}
        </MultiSelect>
      </div>
      {selectedValues?.length > 0 && (
        <ActiveFiltersLabelBlock
          segmentationField={segmentationField}
          selectedValues={selectedValues}
          sectionValues={sectionValues}
        />
      )}
    </div>
  );
};
