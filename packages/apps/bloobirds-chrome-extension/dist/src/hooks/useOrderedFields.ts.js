import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useMemo = __vite__cjsImport0_react["useMemo"];
import {
  COMPANY_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { Source } from "/src/content/components/contactDetails/contactDetailSource/contactDetailSource.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { FIELD_TYPES } from "/src/types/fields.ts.js";
import { LEAD_FIELDS_LOGIC_ROLE } from "/src/utils/lead.ts.js";
export function useOrderedFields(source, bobjectType) {
  const {
    data,
    mutate,
    isValidating
  } = useSWR(
    `/linkedin/externalObject/SALESFORCE/${source.toUpperCase()}/${bobjectType.toUpperCase()}`,
    (key) => api.get(key).then((data2) => data2?.data)
  );
  return { orderedFields: data, mutate, isLoading: isValidating };
}
export function postNewOrder(order, source, bobjectType) {
  const fields = order.map((field, index) => ({
    name: field?.name,
    fieldId: field?.fieldId,
    ordering: index
  }));
  return api.post(
    `/linkedin/externalObject/SALESFORCE/${source.toUpperCase()}/${bobjectType.toUpperCase()}`,
    { fields }
  );
}
function getBloobirdsFieldValue({
  bobject,
  dataModel,
  reducedBobjects: { company, leads },
  fieldId
}) {
  const dataModelField = dataModel?.findFieldById(fieldId);
  const fieldsToCheck = { ...bobject.rawBobject, ...bobject.otherFields };
  let value;
  if (dataModelField?.fieldType === FIELD_TYPES.REFERENCE && fieldsToCheck[fieldId]) {
    const fieldValue = fieldsToCheck[fieldId];
    value = dataModelField?.referencesTo === "LEAD" ? leads?.find((lead) => lead.id.value === fieldValue)?.fullName : dataModelField?.referencesTo === "COMPANY" ? company?.name || company?.website : "-";
  } else if ([FIELD_TYPES.PICKLIST, FIELD_TYPES.GLOBAL_PICKLIST].includes(dataModelField?.fieldType)) {
    value = dataModelField?.values.find((value2) => {
      return value2.id === fieldsToCheck[fieldId];
    })?.name;
  } else if ([FIELD_TYPES.DATE, FIELD_TYPES.DATETIME].includes(dataModelField?.fieldType) && fieldsToCheck[fieldId]) {
    value = spacetime(fieldsToCheck[fieldId])?.format("{date-ordinal} {month-short} {year}");
  } else {
    value = fieldsToCheck[fieldId];
  }
  return value || "-";
}
export function useBloobirdsFields(bobject, hasHelper) {
  const { useGetDataModel, useGetActiveBobjectContext } = useExtensionContext();
  const dataModel = useGetDataModel();
  const bobjectDataModelFields = dataModel.getFieldsByBobjectType(bobject?.id?.typeName);
  const { company, leads } = useGetActiveBobjectContext() || {};
  const { orderedFields: bloobirdsOrderedFields, isLoading } = useOrderedFields(
    Source.bloobirds,
    bobject?.id?.typeName
  );
  const bloobirdsOptions = useMemo(() => {
    if (!bobject)
      return [];
    return bobjectDataModelFields?.reduce((acc, field) => {
      if (isBloobirdsExcludedField(field.logicRole)) {
        return acc;
      }
      return [
        ...acc,
        {
          name: field?.name,
          fieldId: field?.id
        }
      ];
    }, []);
  }, [bobject?.id?.objectId]);
  const bloobirdsFields = useMemo(() => {
    if (!bobject)
      return [];
    if (hasHelper) {
      return bloobirdsOrderedFields?.reduce((acc, orderedField) => {
        const dataModelField = dataModel.findFieldById(orderedField.fieldId);
        const value = getBloobirdsFieldValue({
          bobject,
          dataModel,
          reducedBobjects: {
            company,
            leads
          },
          fieldId: orderedField.fieldId
        });
        return [
          ...acc,
          {
            name: dataModelField?.name,
            fieldId: orderedField?.fieldId,
            value,
            ordering: orderedField?.ordering
          }
        ];
      }, []);
    } else {
      if (!bobject.otherFields)
        return [];
      return Object.keys(bobject.otherFields).reduce((acc, fieldId) => {
        const dataModelField = dataModel?.findFieldById(fieldId);
        if (isBloobirdsExcludedField(dataModelField?.logicRole)) {
          return acc;
        }
        const value = getBloobirdsFieldValue({
          bobject,
          dataModel,
          reducedBobjects: { company, leads },
          fieldId
        });
        return [
          ...acc,
          {
            name: dataModelField?.name,
            value,
            fieldId
          }
        ];
      }, []);
    }
  }, [bobject?.id?.objectId, bloobirdsOrderedFields, hasHelper, company, leads]);
  return { bloobirdsFields, bloobirdsOptions, isLoading };
}
function isBloobirdsExcludedField(fieldId) {
  const excludedFields = [
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
    OPPORTUNITY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY
  ];
  return excludedFields.includes(fieldId);
}
