import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useMemo = __vite__cjsImport0_react["useMemo"]; const useState = __vite__cjsImport0_react["useState"];
import { useSalesforceDataModel } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import {
  BOBJECT_TYPES,
  BobjectTypes
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, getSobjectTypeFromId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { Source } from "/src/content/components/contactDetails/contactDetailSource/contactDetailSource.tsx.js";
import { useOrderedFields } from "/src/hooks/useOrderedFields.ts.js";
function getSalesforceQuery(salesforceType, salesforceId, orderedFields, salesforceDataModelFields) {
  if (!orderedFields)
    return void 0;
  const salesforceIds = orderedFields?.map(
    (orderedField) => orderedField?.fieldId || orderedField?.name
  );
  const salesforceQueryFields = salesforceIds?.reduce((acc, sffId) => {
    let value;
    if ([BobjectTypes.Company, BobjectTypes.Lead, BobjectTypes.Opportunity].includes(sffId)) {
      switch (sffId) {
        case BobjectTypes.Company:
          value = salesforceType === "Contact" ? null : sffId;
      }
    } else {
      value = salesforceDataModelFields?.find((dmf) => dmf?.name === sffId)?.picklistValues.length > 0 ? `toLabel(${sffId})` : sffId;
    }
    if (!value)
      return acc;
    return [...acc, value];
  }, []).join(",");
  return salesforceQueryFields ? `SELECT ${salesforceQueryFields} FROM ${salesforceType} WHERE Id = '${salesforceId}'` : void 0;
}
export function useSalesforceFields(bobject, hasHelper) {
  const salesforceDataModel = useSalesforceDataModel();
  const salesforceType = getSobjectTypeFromId(bobject.salesforceId);
  const salesforceDataModelFields = salesforceDataModel.types?.[salesforceType.toLowerCase()]?.fields;
  const sobjectFieldsNames = salesforceDataModelFields?.map((dmf) => dmf?.name);
  const { orderedFields } = useOrderedFields(Source.salesforce, bobject.id.typeName);
  const parsedOrderedFields = orderedFields?.filter((of) => sobjectFieldsNames?.includes(of.fieldId));
  const salesforceDefaultFields = salesforceDataModelFields?.reduce((acc, { label, name }) => {
    if (isSalesforceDefaultField(name, bobject.id.typeName)) {
      return [...acc, { fieldId: name, name: label }];
    } else
      return acc;
  }, []);
  const salesforceOptions = useMemo(() => {
    if (!salesforceDataModelFields)
      return [];
    return salesforceDataModelFields.reduce((acc, { label, name }) => {
      return [...acc, { fieldId: name, name: label }];
    }, []);
  }, [salesforceDataModelFields, bobject.id.typeName]);
  const salesforceFieldsToParse = hasHelper ? parsedOrderedFields : salesforceDefaultFields;
  const salesforceQuery = getSalesforceQuery(
    salesforceType,
    bobject.salesforceId,
    salesforceFieldsToParse,
    salesforceDataModelFields
  );
  const [data, setData] = useState(null);
  useEffect(() => {
    if (salesforceQuery) {
      api.post(`/utils/service/salesforce/query?=${salesforceQuery}`, {
        query: salesforceQuery
      }).then((res) => {
        setData(res);
      });
    }
  }, [salesforceQuery]);
  const salesforceFields = useMemo(() => {
    if (data && salesforceFieldsToParse) {
      return salesforceFieldsToParse.sort((a, b) => a.ordering < b.ordering ? -1 : 1).reduce((acc, { name, fieldId }) => {
        const value = data.data?.[0][fieldId];
        return [...acc, { name, fieldId, value: value || "-" }];
      }, []);
    } else
      return null;
  }, [
    bobject.id.value,
    !!salesforceDataModel,
    data,
    orderedFields,
    salesforceFieldsToParse?.length
  ]);
  return {
    salesforceFields,
    salesforceDefaultFields,
    salesforceOptions,
    isLoading: salesforceQuery && !data
  };
}
const salesforceCompanyFields = {
  Name: "Account Name",
  ParentId: "Parent Account",
  AccountNumber: "Account Number",
  Type: "Type",
  Industry: "Industry",
  AnnualRevenue: "Annual Revenue",
  Rating: "Rating",
  Phone: "Phone",
  Fax: "Fax",
  Website: "Website",
  OwnerId: "Owner",
  BillingStreet: "Billing Street",
  BillingCity: "Billing City",
  BillingState: "Billing State/Province",
  BillingPostalCode: "Billing Zip/Postal Code",
  BillingCountry: "Billing Country",
  ShippingStreet: "Shipping Street",
  ShippingCity: "Shipping City",
  ShippingState: "Shipping State/Province",
  ShippingPostalCode: "Shipping Zip/Postal Code",
  ShippingCountry: "Shipping Country"
};
const leadFields = {
  FirstName: "First Name",
  LastName: "Last Name",
  Company: "Company",
  Email: "Email",
  Phone: "Phone",
  Website: "Website",
  Industry: "Industry",
  LeadSource: "Lead Source",
  AnnualRevenue: "Annual Revenue",
  Rating: "Rating",
  NumberOfEmployees: "Number of employees"
};
const opportunityFields = {
  Name: "Opportunity Name",
  AccountId: "Account",
  Amount: "Amount",
  CloseDate: "Close Date",
  StageName: "Stage",
  Type: "Type",
  Probability: "Probability",
  LeadSource: "Lead Source",
  NextStep: "Next Step",
  Description: "Description"
};
function isSalesforceDefaultField(fieldId, bobjectType) {
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
