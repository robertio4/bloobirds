import React from 'react';
import { useDashboard } from '../../../../hooks';
import { Item, Section, Select } from '@bloobirds-it/flamingo-ui';
import { useCompanyGroupByOptions } from '../../../../hooks/useCompanyGroupByOptions';
import { useOpportunityGroupByOptions } from '../../../../hooks/useOpportunityGroupByOptions';
import { useBobjectFieldByLogicRole } from '../../../../hooks/useBobjectFieldByLogicRole';

const SalesSelectGroupBy = () => {
  const { groupBy, setGroupBy } = useDashboard();
  const companyFields = useCompanyGroupByOptions();
  const opportunityFields = useOpportunityGroupByOptions();
  const assignedToField = useBobjectFieldByLogicRole('COMPANY__ASSIGNED_TO');
  const icpField = useBobjectFieldByLogicRole('LEAD__ICP');
  const activityUser = useBobjectFieldByLogicRole('ACTIVITY__USER');

  return (
    <>
      <Select
        placeholder="None"
        size="small"
        borderless={false}
        autocomplete
        value={groupBy || 'none'}
        onChange={value => {
          setGroupBy(value === 'none' ? undefined : value);
        }}
      >
        <Item value="none">None</Item>
        <Section>Opportunity fields</Section>
        {opportunityFields.map(field => (
          <Item key={field.id} value={field.id}>
            {field.reportingName}
          </Item>
        ))}
        <Section>Company fields</Section>
        <Item value={assignedToField.id}>{assignedToField.reportingName}</Item>
        {companyFields.map(field => (
          <Item key={field.id} value={field.id}>
            {field.reportingName}
          </Item>
        ))}
        <Section>Other fields</Section>
        <Item value={icpField?.id}>{icpField?.reportingName}</Item>
        <Item value={activityUser?.id}>{activityUser?.reportingName}</Item>
      </Select>
    </>
  );
};

export default SalesSelectGroupBy;
