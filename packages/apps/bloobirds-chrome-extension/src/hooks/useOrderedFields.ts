import { useMemo } from 'react';

import {
  BobjectType,
  COMPANY_FIELDS_LOGIC_ROLE,
  ExtensionBobject,
  ExtensionCompany,
  LinkedInLead,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import spacetime from 'spacetime';
import useSWR from 'swr';

import { Source } from '../content/components/contactDetails/contactDetailSource/contactDetailSource';
import { useExtensionContext } from '../content/components/context';
import { FIELD_TYPES } from '../types/fields';
import { api } from '../utils/api';
import { LEAD_FIELDS_LOGIC_ROLE } from '../utils/lead';

export interface OrderedField {
  fieldId: string;
  name: string;
  ordering: number;
}
export interface OrderedFieldWithSource extends OrderedField {
  source: 'SALESFORCE' | 'BLOOBIRDS';
}

interface GetFieldValuesEnvProps {
  dataModel: any;
  bobject: ExtensionBobject;
  reducedBobjects: { company: ExtensionBobject; leads: ExtensionBobject[] };
}

export function useOrderedFields(source: Source, bobjectType: BobjectType) {
  const {
    data,
    mutate,
    isValidating,
  } = useSWR(
    `/linkedin/externalObject/SALESFORCE/${source.toUpperCase()}/${bobjectType.toUpperCase()}`,
    key => api.get(key).then(data => data?.data as OrderedFieldWithSource[]),
  );

  return { orderedFields: data as OrderedFieldWithSource[], mutate, isLoading: isValidating };
}

export function postNewOrder(
  order: { name: string; fieldId: string }[],
  source: Source,
  bobjectType: BobjectType,
) {
  const fields = order.map((field, index) => ({
    name: field?.name,
    fieldId: field?.fieldId,
    ordering: index,
  }));
  return api.post(
    `/linkedin/externalObject/SALESFORCE/${source.toUpperCase()}/${bobjectType.toUpperCase()}`,
    { fields },
  );
}

interface GetBloobirdsFieldsProps extends GetFieldValuesEnvProps {
  fieldId: string;
}

function getBloobirdsFieldValue({
  bobject,
  dataModel,
  reducedBobjects: { company, leads },
  fieldId,
}: GetBloobirdsFieldsProps): string {
  const dataModelField = dataModel?.findFieldById(fieldId);
  const fieldsToCheck = { ...bobject.rawBobject, ...bobject.otherFields };
  let value;
  if (dataModelField?.fieldType === FIELD_TYPES.REFERENCE && fieldsToCheck[fieldId]) {
    const fieldValue = fieldsToCheck[fieldId];
    value =
      dataModelField?.referencesTo === 'LEAD'
        ? (leads?.find(lead => lead.id.value === fieldValue) as LinkedInLead)?.fullName
        : dataModelField?.referencesTo === 'COMPANY'
        ? company?.name || (company as ExtensionCompany)?.website
        : '-';
  } else if (
    [FIELD_TYPES.PICKLIST, FIELD_TYPES.GLOBAL_PICKLIST].includes(dataModelField?.fieldType)
  ) {
    value = dataModelField?.values.find(value => {
      return value.id === fieldsToCheck[fieldId];
    })?.name;
  } else if (
    [FIELD_TYPES.DATE, FIELD_TYPES.DATETIME].includes(dataModelField?.fieldType) &&
    fieldsToCheck[fieldId]
  ) {
    value = spacetime(fieldsToCheck[fieldId])?.format('{date-ordinal} {month-short} {year}');
  } else {
    value = fieldsToCheck[fieldId];
  }

  return value || '-';
}

export function useBloobirdsFields(
  bobject: ExtensionBobject,
  hasHelper,
): { bloobirdsFields: OrderedField[]; bloobirdsOptions: OrderedField[]; isLoading: boolean } {
  const { useGetDataModel, useGetActiveBobjectContext } = useExtensionContext();
  const dataModel = useGetDataModel();
  const bobjectDataModelFields = dataModel.getFieldsByBobjectType(bobject?.id?.typeName);
  const { company, leads } = useGetActiveBobjectContext() || {};
  const { orderedFields: bloobirdsOrderedFields, isLoading } = useOrderedFields(
    Source.bloobirds,
    bobject?.id?.typeName,
  );
  const bloobirdsOptions = useMemo(() => {
    if (!bobject) return [];
    return bobjectDataModelFields?.reduce((acc, field) => {
      if (isBloobirdsExcludedField(field.logicRole)) {
        return acc;
      }
      return [
        ...acc,
        {
          name: field?.name,
          fieldId: field?.id,
        },
      ];
    }, []);
  }, [bobject?.id?.objectId]);

  const bloobirdsFields = useMemo(() => {
    if (!bobject) return [];
    if (hasHelper) {
      return bloobirdsOrderedFields?.reduce((acc: OrderedFieldWithSource[], orderedField) => {
        const dataModelField = dataModel.findFieldById(orderedField.fieldId);
        const value = getBloobirdsFieldValue({
          bobject,
          dataModel,
          reducedBobjects: {
            company,
            leads,
          },
          fieldId: orderedField.fieldId,
        });
        return [
          ...acc,
          {
            name: dataModelField?.name,
            fieldId: orderedField?.fieldId,
            value,
            ordering: orderedField?.ordering,
          },
        ];
      }, [] as OrderedFieldWithSource[]);
    } else {
      if (!bobject.otherFields) return [];
      return Object.keys(bobject.otherFields).reduce((acc, fieldId) => {
        const dataModelField = dataModel?.findFieldById(fieldId);
        if (isBloobirdsExcludedField(dataModelField?.logicRole)) {
          return acc;
        }
        const value = getBloobirdsFieldValue({
          bobject,
          dataModel,
          reducedBobjects: { company, leads },
          fieldId,
        });
        return [
          ...acc,
          {
            name: dataModelField?.name,
            value,
            fieldId,
          },
        ];
      }, []);
    }
  }, [bobject?.id?.objectId, bloobirdsOrderedFields, hasHelper, company, leads]);

  return { bloobirdsFields, bloobirdsOptions, isLoading };
}

function isBloobirdsExcludedField(fieldId: string) {
  const excludedFields: string[] = [
    COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_COUNT,
    COMPANY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY,
    COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
    COMPANY_FIELDS_LOGIC_ROLE.TOUCHES_COUNT,
    COMPANY_FIELDS_LOGIC_ROLE.TOUCHES_LAST_DAY,
    LEAD_FIELDS_LOGIC_ROLE.ATTEMPTS_COUNT,
    LEAD_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY,
    LEAD_FIELDS_LOGIC_ROLE.ICP,
    LEAD_FIELDS_LOGIC_ROLE.TOUCHES_COUNT,
    LEAD_FIELDS_LOGIC_ROLE.TOUCHES_LAST_DAY,
    OPPORTUNITY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY,
  ];
  return excludedFields.includes(fieldId);
}
