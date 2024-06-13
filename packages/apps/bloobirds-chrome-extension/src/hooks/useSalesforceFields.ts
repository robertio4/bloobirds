import { useEffect, useMemo, useState } from 'react';

import { useSalesforceDataModel } from '@bloobirds-it/hooks';
import {
  BOBJECT_TYPES,
  BobjectType,
  ExtensionBobject,
  SalesforceDataModelResponse,
  StrDict,
  BobjectTypes,
} from '@bloobirds-it/types';
import { getSobjectTypeFromId } from '@bloobirds-it/utils';

import { Source } from '../content/components/contactDetails/contactDetailSource/contactDetailSource';
import { api } from '../utils/api';
import { OrderedField, useOrderedFields } from './useOrderedFields';

function getSalesforceQuery(
  salesforceType,
  salesforceId,
  orderedFields,
  salesforceDataModelFields,
) {
  if (!orderedFields) return undefined;
  const salesforceIds = orderedFields?.map(
    orderedField => orderedField?.fieldId || orderedField?.name,
  );

  const salesforceQueryFields = salesforceIds
    ?.reduce((acc, sffId) => {
      let value;
      if ([BobjectTypes.Company, BobjectTypes.Lead, BobjectTypes.Opportunity].includes(sffId)) {
        switch (sffId) {
          case BobjectTypes.Company:
            value = salesforceType === 'Contact' ? null : sffId;
        }
      } else {
        value =
          salesforceDataModelFields?.find(dmf => dmf?.name === sffId)?.picklistValues.length > 0
            ? `toLabel(${sffId})`
            : sffId;
      }
      if (!value) return acc;
      return [...acc, value];
    }, [])
    .join(',');

  return salesforceQueryFields
    ? `SELECT ${salesforceQueryFields} FROM ${salesforceType} WHERE Id = '${salesforceId}'`
    : undefined;
}

/**
 * Hook returns salesforce fields from data model
 * @param bobject
 * @param hasHelper
 */
export function useSalesforceFields(
  bobject: ExtensionBobject,
  hasHelper,
): {
  isLoading: boolean;
  salesforceOptions: OrderedField[];
  salesforceFields: OrderedField[];
  salesforceDefaultFields: OrderedField[];
} {
  const salesforceDataModel: SalesforceDataModelResponse = useSalesforceDataModel();
  const salesforceType = getSobjectTypeFromId(bobject.salesforceId);
  const salesforceDataModelFields =
    salesforceDataModel.types?.[salesforceType.toLowerCase()]?.fields;
  const sobjectFieldsNames = salesforceDataModelFields?.map(dmf => dmf?.name);
  const { orderedFields } = useOrderedFields(Source.salesforce, bobject.id.typeName);
  const parsedOrderedFields = orderedFields?.filter(of => sobjectFieldsNames?.includes(of.fieldId));
  const salesforceDefaultFields = salesforceDataModelFields?.reduce((acc, { label, name }) => {
    if (isSalesforceDefaultField(name, bobject.id.typeName)) {
      return [...acc, { fieldId: name, name: label }];
    } else return acc;
  }, []);
  const salesforceOptions = useMemo(() => {
    if (!salesforceDataModelFields) return [];
    return salesforceDataModelFields.reduce((acc, { label, name }) => {
      return [...acc, { fieldId: name, name: label }];
    }, []);
  }, [salesforceDataModelFields, bobject.id.typeName]);
  const salesforceFieldsToParse = hasHelper ? parsedOrderedFields : salesforceDefaultFields;
  const salesforceQuery = getSalesforceQuery(
    salesforceType,
    bobject.salesforceId,
    salesforceFieldsToParse,
    salesforceDataModelFields,
  );
  const [data, setData] = useState(null);

  useEffect(() => {
    if (salesforceQuery) {
      api
        .post<Array<StrDict>>(`/utils/service/salesforce/query?=${salesforceQuery}`, {
          query: salesforceQuery,
        })
        .then(res => {
          setData(res);
        });
    }
  }, [salesforceQuery]);

  // TODO: La que menos le gusta a Pablo
  const salesforceFields = useMemo(() => {
    if (data && salesforceFieldsToParse) {
      return salesforceFieldsToParse
        .sort((a, b) => (a.ordering < b.ordering ? -1 : 1))
        .reduce((acc, { name, fieldId }) => {
          const value = data.data?.[0][fieldId];
          return [...acc, { name, fieldId, value: value || '-' }];
        }, []);
    } else return null;
  }, [
    bobject.id.value,
    !!salesforceDataModel,
    data,
    orderedFields,
    salesforceFieldsToParse?.length,
  ]);

  return {
    salesforceFields,
    salesforceDefaultFields,
    salesforceOptions,
    isLoading: salesforceQuery && !data,
  };
}

const salesforceCompanyFields = {
  Name: 'Account Name',
  ParentId: 'Parent Account',
  AccountNumber: 'Account Number',
  Type: 'Type',
  Industry: 'Industry',
  AnnualRevenue: 'Annual Revenue',
  Rating: 'Rating',
  Phone: 'Phone',
  Fax: 'Fax',
  Website: 'Website',
  OwnerId: 'Owner',
  BillingStreet: 'Billing Street',
  BillingCity: 'Billing City',
  BillingState: 'Billing State/Province',
  BillingPostalCode: 'Billing Zip/Postal Code',
  BillingCountry: 'Billing Country',
  ShippingStreet: 'Shipping Street',
  ShippingCity: 'Shipping City',
  ShippingState: 'Shipping State/Province',
  ShippingPostalCode: 'Shipping Zip/Postal Code',
  ShippingCountry: 'Shipping Country',
};

const leadFields = {
  FirstName: 'First Name',
  LastName: 'Last Name',
  Company: 'Company',
  Email: 'Email',
  Phone: 'Phone',
  Website: 'Website',
  Industry: 'Industry',
  LeadSource: 'Lead Source',
  AnnualRevenue: 'Annual Revenue',
  Rating: 'Rating',
  NumberOfEmployees: 'Number of employees',
};

const opportunityFields = {
  Name: 'Opportunity Name',
  AccountId: 'Account',
  Amount: 'Amount',
  CloseDate: 'Close Date',
  StageName: 'Stage',
  Type: 'Type',
  Probability: 'Probability',
  LeadSource: 'Lead Source',
  NextStep: 'Next Step',
  Description: 'Description',
};

function isSalesforceDefaultField(fieldId: string, bobjectType: BobjectType) {
  switch (bobjectType) {
    case BOBJECT_TYPES.COMPANY:
      return !!salesforceCompanyFields[fieldId];
    case BOBJECT_TYPES.LEAD:
      return !!leadFields[fieldId];
    case BOBJECT_TYPES.OPPORTUNITY:
      return !!opportunityFields[fieldId];
    default:
      return false;
  }
}
