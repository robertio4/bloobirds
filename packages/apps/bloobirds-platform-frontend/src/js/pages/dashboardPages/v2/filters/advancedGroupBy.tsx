import React, { useState } from 'react';

import { Item, Section, Select, Text } from '@bloobirds-it/flamingo-ui';
import { BobjectType } from '@bloobirds-it/types';
import { sortBy } from 'lodash';

import { useEntity } from '../../../../hooks';
import { useAdvancedGroupByOptions } from '../../../../hooks/useAdvancedGroupByOptions';
import { useBobjectFieldByLogicRole } from '../../../../hooks/useBobjectFieldByLogicRole';
import useDashboardFilters from '../../../../hooks/useDashboardFilters';
import { BobjectFieldOption } from '../../../../hooks/useDashboardsGroupByOptions';
import { useInHistoricDashboardPage } from '../../../../hooks/useInHistoricDashboardPage';
import styles from '../../v1/filters/selectGroupBy.module.css';

interface AdvancedGroupByProps {
  mainFieldsLogicRoles?: string[];
  bobjectTypesToShow: BobjectType[];
}

const AdvancedGroupBy = ({ mainFieldsLogicRoles, bobjectTypesToShow }: AdvancedGroupByProps) => {
  const { groupBy, setGroupBy } = useDashboardFilters();

  const bobjectTypes = useEntity('bobjectTypes')?.all();

  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const mainFields = mainFieldsLogicRoles.map(useBobjectFieldByLogicRole);

  const otherFields = useAdvancedGroupByOptions(bobjectTypesToShow, mainFieldsLogicRoles);

  const groupByValue = [...mainFields, ...otherFields, { id: 'HISTORIC_ASSIGNED_TO' }]
    .filter(Boolean)
    .find(f => f.id === groupBy);

  const renderDisplayValue = (value: BobjectFieldOption | string | undefined) => {
    if (!value) {
      return '';
    }
    if (value === 'none') {
      return 'None';
    }
    if (search && isOpen) return search;
    const bobjectField = value as BobjectFieldOption;
    if (bobjectField.id === 'HISTORIC_ASSIGNED_TO') {
      return `Assigned To - Historic`;
    }
    return `${bobjectField?.name} - ${
      bobjectTypes.find(t => t.id === bobjectField?.bobjectType)?.name
    }`;
  };
  const isHistoricPage = useInHistoricDashboardPage();

  const showHistoric =
    isHistoricPage && (!search || 'Assign To'.toLowerCase().includes(search.toLowerCase()));

  function handleSelectValue() {
    if (isOpen) {
      if (search) {
        return search;
      } else {
        return '';
      }
    } else {
      return groupByValue;
    }
  }

  return (
    <Select
      placeholder="None"
      size="small"
      borderless={false}
      value={handleSelectValue()}
      defaultValue=""
      onSearch={setSearch}
      onClick={() => {
        setSearch('');
        setIsOpen(true);
      }}
      autocomplete
      onChange={value => {
        setIsOpen(false);
        setGroupBy(value === 'none' ? undefined : value.id);
      }}
      renderDisplayValue={renderDisplayValue}
    >
      <Item value="none">None</Item>
      <Section>Main fields</Section>
      {mainFields?.map(field => {
        if (!field?.name?.toLowerCase().includes(search.toLowerCase())) return;
        return (
          <Item key={field.id} value={field} className={styles.select_item}>
            {field.name}
            <Text htmlTag="span">{' - '}</Text>
            <Text htmlTag="span" size="xs" color="softPeanut">
              {bobjectTypes.find(bobj => bobj.id === field.bobjectType)?.name}
            </Text>
          </Item>
        );
      })}
      {showHistoric && <Section>Historical</Section>}
      {showHistoric && (
        <Item
          key="HISTORIC_ASSIGNED_TO_OPTION"
          value={{ id: 'HISTORIC_ASSIGNED_TO' }}
          className={styles.select_item}
        >
          Assigned To
        </Item>
      )}
      <Section>Other Fields</Section>
      {sortBy(otherFields, 'name')?.map(field => {
        if (!field?.name?.toLowerCase().includes(search.toLowerCase())) return;
        return (
          <Item key={field.id} value={field} className={styles.select_item}>
            {field.name}
            <Text htmlTag="span">{' - '}</Text>
            <Text htmlTag="span" size="xs" color="softPeanut">
              {bobjectTypes.find(bobj => bobj.id === field.bobjectType)?.name}
            </Text>
          </Item>
        );
      })}
    </Select>
  );
};

export default AdvancedGroupBy;
