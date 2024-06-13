import React from 'react';
import styles from '../../styles/fieldsPage.module.css';
import { Item, Select, Text, Button, Checkbox } from '@bloobirds-it/flamingo-ui';
import { usePaginatedEntityFilters } from '../../hooks/usePaginatedEntityFilters';
import { useEntity } from '../../../../../hooks';

export const FieldsFilters = ({ resetFieldsFilters }) => {
  const { updateEntityFilters, filters } = usePaginatedEntityFilters('bobjectFields');
  const fieldTypes = useEntity('fieldTypes');
  const fieldGroups = useEntity('bobjectFieldGroups');

  return (
    <div className={styles.filters_container}>
      <Text htmlTag="span" size="s" color="softPeanut" className={styles.filters_title__container}>
        Filters:{' '}
      </Text>
      <div className={styles._filter__input}>
        <Select
          width={150}
          size="small"
          placeholder="Field type"
          value={filters?.fieldType || null}
          borderless={false}
          onChange={v => updateEntityFilters('fieldType', v)}
        >
          {fieldTypes
            ?.all()
            .filter(type => type.enumName !== 'REFERENCE_LIST')
            .map(type => (
              <Item key={type?.id} value={type?.id}>
                {type?.name}
              </Item>
            ))}
        </Select>
      </div>
      <div className={styles._filter__input}>
        <Select
          width={150}
          size="small"
          placeholder="Group"
          value={filters?.bobjectFieldGroup || null}
          borderless={false}
          onChange={v => updateEntityFilters('bobjectFieldGroup', v)}
        >
          {fieldGroups?.all().map(group => (
            <Item key={group?.id} value={group?.id}>
              {group?.name}
            </Item>
          ))}
        </Select>
      </div>
      <div className={styles._filter__input}>
        <Checkbox
          checked={!!filters?.enabled}
          backgroundColor="verySoftBloobirds"
          size="small"
          onClick={v => updateEntityFilters('enabled', v)}
        >
          <Text color="peanut" size="s">
            Enabled
          </Text>
        </Checkbox>
      </div>
      <div className={styles._filter__input}>
        <Checkbox
          checked={!!filters?.required}
          backgroundColor="verySoftBloobirds"
          size="small"
          onClick={v => updateEntityFilters('required', v)}
        >
          <Text color="peanut" size="s">
            Required
          </Text>
        </Checkbox>
      </div>
      <div className={styles._filter__input}>
        <Checkbox
          checked={!!filters?.layoutReadOnly}
          backgroundColor="verySoftBloobirds"
          size="small"
          onClick={v => updateEntityFilters('layoutReadOnly', v)}
        >
          <Text color="peanut" size="s">
            Read only
          </Text>
        </Checkbox>
      </div>
      <div className={styles._filter__input}>
        <Checkbox
          checked={!!filters?.duplicateValidation}
          backgroundColor="verySoftBloobirds"
          size="small"
          onClick={v => updateEntityFilters('duplicateValidation', v)}
        >
          <Text color="peanut" size="s">
            Duplicate validation
          </Text>
        </Checkbox>
      </div>
      {Object.keys(filters).length > 3 && (
        <Button variant="clear" iconLeft="cross" onClick={resetFieldsFilters}>
          Clear
        </Button>
      )}
    </div>
  );
};
