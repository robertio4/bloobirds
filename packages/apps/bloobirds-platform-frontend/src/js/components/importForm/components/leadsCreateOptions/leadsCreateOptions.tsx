import React, { useEffect, useState } from 'react';
import { Checkbox, Chip, ChipGroup, Item, Select, Text } from '@bloobirds-it/flamingo-ui';
import styles from './leadsCreateOptions.module.css';
import { useImportForm } from '../../hooks/useImportForm';
import { useEntity } from '../../../../hooks';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';

export const matchableFieldsLogicRole = [
  COMPANY_FIELDS_LOGIC_ROLE.NAME,
  COMPANY_FIELDS_LOGIC_ROLE.WEBSITE,
];

export const LeadsCreateOptions = () => {
  const {
    columnNames,
    uniqueMatchingFileColumn,
    uniqueMatchingField,
    shouldSkipLeadWithoutCompany,
    showCompanyMatchingOptions,
    setUniqueMatchingFileColumn,
    setUniqueMatchingField,
    setShouldSkipLeadWithoutCompany,
    setShowCompanyMatchingOptions,
    setCanBeImported,
  } = useImportForm();
  const bobjectFields = useEntity('bobjectFields');
  const matchableBobjectFields = bobjectFields
    ?.all()
    ?.filter(field =>
      matchableFieldsLogicRole.includes(field?.logicRole as COMPANY_FIELDS_LOGIC_ROLE),
    );

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <Text size="m">Do you want to match leads with current existing companies?</Text>
        <ChipGroup
          value={showCompanyMatchingOptions}
          onChange={(v: unknown) => setShowCompanyMatchingOptions(v as boolean)}
        >
          <Chip size="small" value={true}>
            Yes
          </Chip>
          <Chip size="small" value={false}>
            No
          </Chip>
        </ChipGroup>
      </div>
      {showCompanyMatchingOptions && (
        <>
          <div className={styles.section}>
            <Text size="s">
              Match company using the field{' '}
              <Select
                size="small"
                borderless={false}
                onChange={setUniqueMatchingField}
                value={uniqueMatchingField}
              >
                <Item value="companyId" key="companyId">
                  Company ID
                </Item>
                {matchableBobjectFields?.map(field => (
                  <Item value={field?.id} key={field?.id}>
                    {field?.name}
                  </Item>
                ))}
              </Select>
              {'  '}with the file column{' '}
              <Select
                size="small"
                borderless={false}
                onChange={setUniqueMatchingFileColumn}
                value={uniqueMatchingFileColumn}
              >
                {columnNames?.length > 0 ? (
                  columnNames?.map(column => (
                    <Item key={column.index} value={column.label}>
                      {column.label}
                    </Item>
                  ))
                ) : (
                  <Item disabled>No columns available</Item>
                )}
              </Select>
            </Text>
          </div>
          <div className={styles.section}>
            <Checkbox
              size="small"
              onClick={setShouldSkipLeadWithoutCompany}
              checked={shouldSkipLeadWithoutCompany}
            >
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              If company is not found, don't create the lead
            </Checkbox>
          </div>
        </>
      )}
    </div>
  );
};
