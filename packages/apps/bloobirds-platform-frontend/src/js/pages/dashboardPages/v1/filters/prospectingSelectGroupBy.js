import React from 'react';
import { useDashboard } from '../../../../hooks';
import { Item, Section, Select } from '@bloobirds-it/flamingo-ui';
import { sortBy } from 'lodash';
import { useCompanyGroupByOptions } from '../../../../hooks/useCompanyGroupByOptions';
import { useBobjectFieldByLogicRole } from '../../../../hooks/useBobjectFieldByLogicRole';

export const ProspectingSelectGroupBy = () => {
  const { groupBy, setGroupBy } = useDashboard();
  const assignedToField = useBobjectFieldByLogicRole('COMPANY__ASSIGNED_TO');
  const targetMarketField = useBobjectFieldByLogicRole('COMPANY__TARGET_MARKET');
  const scenarioField = useBobjectFieldByLogicRole('COMPANY__SCENARIO');
  const sourceField = useBobjectFieldByLogicRole('COMPANY__SOURCE');
  const icpField = useBobjectFieldByLogicRole('LEAD__ICP');
  const activityUser = useBobjectFieldByLogicRole('ACTIVITY__USER');
  const numberLeads = useBobjectFieldByLogicRole('COMPANY__LEADS_COUNT');
  const companyFields = useCompanyGroupByOptions();

  return (
    <>
      <Select
        placeholder="None"
        size="small"
        borderless={false}
        value={groupBy || 'none'}
        onChange={value => {
          setGroupBy(value === 'none' ? undefined : value);
        }}
      >
        <Item value="none">None</Item>
        <Section>Main</Section>
        <Item value={assignedToField?.id}>{assignedToField?.reportingName}</Item>
        <Item value={targetMarketField?.id}>{targetMarketField?.reportingName}</Item>
        <Item value={icpField?.id}>{icpField?.reportingName}</Item>
        <Item value={scenarioField?.id}>{scenarioField?.reportingName}</Item>
        <Item value={sourceField?.id}>{sourceField?.reportingName}</Item>
        <Item value={activityUser?.id}>{activityUser?.reportingName}</Item>
        <Item value={numberLeads?.id}>{numberLeads?.reportingName}</Item>
        <Section>Other company fields</Section>
        {sortBy(companyFields, 'reportingName')?.map(field => (
          <Item key={field.id} value={field.id}>
            {field.reportingName}
          </Item>
        ))}
      </Select>
    </>
  );
};
