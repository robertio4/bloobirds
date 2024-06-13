import { getBobjectFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useDataModel } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useDataModel.ts.js";
export const useFieldsData = () => {
  const dataModel = useDataModel();
  function getFieldValues(logicRole) {
    const bobjectType = getBobjectFromLogicRole(logicRole);
    const dataModelFields = dataModel?.getFieldsByBobjectType(bobjectType);
    return dataModelFields?.find((datamodelField) => datamodelField.logicRole === logicRole);
  }
  function getFieldValuesById(id, bobjectType) {
    const dataModelFields = dataModel?.getFieldsByBobjectType(bobjectType);
    return dataModelFields?.find((datamodelField) => datamodelField.id === id);
  }
  function getFieldValueByName(bobject, fieldName) {
    const field = bobject?.fields?.find(
      (bobjectField) => bobjectField?.label?.toLowerCase() === fieldName?.toLowerCase()
    );
    if (!field)
      throw new Error(`Field ${fieldName} not found`);
    const fieldType = field?.type;
    switch (fieldType) {
      case "TEXT":
        return field?.value;
      default:
        return field;
    }
  }
  return {
    getFieldValueByName,
    getFieldValues,
    getFieldValuesById
  };
};
