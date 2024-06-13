import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { useEntity } from '../../../../hooks';
import React, { useMemo } from 'react';
import { Item, Section, Select, Text } from '@bloobirds-it/flamingo-ui';
import styles from '../mappings.module.css';
import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';

export const FieldsSelector = ({
  onChange,
  disabled,
  showLeadFields,
  showActivityFields,
  showOpportunityFields,
  filter = x => x,
}) => {
  const salesFeatureEnabled = useFullSalesEnabled();
  const bobjectFields = useEntity('bobjectFields')?.all();
  const entityBobjectTypes = useBobjectTypes();
  const bobjectTypes = entityBobjectTypes?.all();

  const reducedBobjectFields = useMemo(
    () =>
      bobjectFields?.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.id]: {
            name: curr.name,
            bobjectType: curr.bobjectType,
            fieldType: curr.fieldType,
          },
        }),
        {},
      ),
    [bobjectFields],
  );

  const reducedBobjectTypes = useMemo(
    () =>
      bobjectTypes?.reduce(
        (acc, curr) => ({
          ...acc,
          [curr?.name]: curr?.id,
        }),
        {},
      ),
    [bobjectTypes],
  );

  const createItems = (field, sectionName, bobjectType) => {
    const bobjectField = field[1];
    const bobjectFieldId = field[0];
    return (
      <Item
        key={bobjectFieldId}
        label={bobjectField.name}
        value={{ bobjectFieldId, name: bobjectField.name, bobjectType }}
        section={sectionName}
      >
        {bobjectField.name}{' '}
        <Text htmlTag="span" size="xs" color="softPeanut" className={styles._bobject_text}>
          {entityBobjectTypes?.get(bobjectType)?.name}
        </Text>
      </Item>
    );
  };

  const bobjectFieldsByType = bobjectType =>
    useMemo(
      () =>
        Object.entries(reducedBobjectFields)
          ?.filter(bobjectField => bobjectField[1].bobjectType === bobjectType)
          .filter(filter)
          .sort((a, b) => (a[1].name > b[1].name ? 1 : -1))
          .map(bobjectField =>
            createItems(bobjectField, `${bobjectType.toLowerCase()}-fields`, bobjectType),
          ),
      [reducedBobjectFields],
    );

  const leadFields = bobjectFieldsByType(reducedBobjectTypes.Lead);
  const companyFields = bobjectFieldsByType(reducedBobjectTypes.Company);
  const activityFields = bobjectFieldsByType(reducedBobjectTypes.Activity);
  const opportunityFields =
    salesFeatureEnabled && bobjectFieldsByType(reducedBobjectTypes.Opportunity);

  return (
    reducedBobjectFields && (
      <Select
        width={260}
        size="small"
        borderless={false}
        placeholder="Bloobirds field"
        renderDisplayValue={value => `Bloobirds Field - ${value.name}`}
        defaultValue=""
        autocomplete
        onChange={onChange}
        disabled={disabled}
      >
        <Section id="company-fields">
          <div className={styles._section}>Company fields</div>
        </Section>
        {companyFields}
        <Section id="lead-fields">
          {showLeadFields && <div className={styles._section}>Lead fields</div>}
        </Section>
        {showLeadFields && leadFields}
        <Section id="activity-fields">
          {showActivityFields && <div className={styles._section}>Activity fields</div>}
        </Section>
        {showActivityFields && activityFields}
        <Section id="opportunity-fields">
          {showOpportunityFields && <div className={styles._section}>Opportunity fields</div>}
        </Section>
        {showOpportunityFields && opportunityFields}
      </Select>
    )
  );
};
