import React, { useEffect } from 'react';
import styles from './dependenciesFilters.module.css';
import { Item, Select, Text, Button } from '@bloobirds-it/flamingo-ui';
import { FIELD_FILTERS, FIELD_VALUE_FILTERS } from './dependenciesFilters.constants';
import { useDependenciesFilters } from '../../../../hooks/useDependencies';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';

export const DependenciesFilters = ({ isValueDependency }) => {
  const {
    updateDependenciesFilters,
    resetDependenciesFilters,
    dependenciesFilters,
    filtersDefinition,
  } = useDependenciesFilters(isValueDependency ? 'fieldValueConditions' : 'fieldConditions');
  const isSalesEnabled = useFullSalesEnabled();

  useEffect(() => {
    resetDependenciesFilters();
  }, []);

  const filtersToUse = isValueDependency ? FIELD_VALUE_FILTERS : FIELD_FILTERS;

  return (
    <div className={styles._container}>
      <Text htmlTag="span" size="s" color="softPeanut" className={styles._title__container}>
        Filters:{' '}
      </Text>
      {Object.keys(filtersToUse).map(filter => {
        const element = filtersToUse[filter];
        return (
          <div className={styles._filter__input} key={element?.label}>
            <Select
              width={200}
              size="small"
              borderless={false}
              placeholder={element?.label}
              onChange={value => updateDependenciesFilters(filter, value)}
              value={dependenciesFilters[filter] || null}
            >
              {filtersDefinition &&
                filtersDefinition[element?.name]
                  ?.filter(field =>
                    isSalesEnabled
                      ? true
                      : (element?.name === 'bobjectTypes' && field?.label !== 'Opportunity') ||
                        element?.name !== 'bobjectTypes',
                  )
                  .map(field => (
                    <Item value={field?.name} key={field?.name}>
                      {field?.label}
                      <Text
                        htmlTag="span"
                        size="xs"
                        color="softPeanut"
                        className={styles.__bobject_text}
                      >
                        {filter.includes('Field') ? field?.bobjectType : field?.parent}
                      </Text>
                    </Item>
                  ))}
            </Select>
          </div>
        );
      })}
      {Object.keys(dependenciesFilters).length > 0 && (
        <Button variant="clear" iconLeft="cross" onClick={resetDependenciesFilters}>
          Clear
        </Button>
      )}
    </div>
  );
};
