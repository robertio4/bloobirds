import {
  Bobject,
  BobjectField,
  BobjectType,
  BobjectTypes,
  PluralBobjectTypes,
  StrDict,
} from '@bloobirds-it/types';
import { isObject } from 'lodash';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

import { api } from '../../../../../../../utils/api';
import { UseAllItemsType } from '../../../../bulkActionsPanel';
import { getConditionedFields, isFieldConditioning } from './fieldConditions';
import {
  addedFieldsType,
  availableFieldsType,
  fields,
  fieldType,
  getAvailableFieldFromBobjectField,
  indexedFieldsType,
} from './utils';

/**
 * @description This structure saves all the info received from the server
 * @example
 * { <BobjectType>: { <fieldName>: <fieldInfoFromBE>, ...}, ...}
 */
const fieldsInfoAtom = atom({ key: 'initFieldsBobjects', default: undefined as fields });
/**
 * @description List of all fields with an available attribute that indicates if field can be selected to update
 * @example
 * [
 *  {
 *    type: 'Company',
 *    name: 'h74j8n3j8ehh7',
 *    label: 'Stage',
 *    required: false,
 *    blocking: false,
 *    blocked: false,
 *    available: true
 *    },
 *  ...
 * ]
 */
const availableFieldsAtom = atom({ key: 'availableFields', default: [] as availableFieldsType });
/**
 * @description Structure ready to send to server
 * @example
 * { <bobjectType>: { <fieldLR or fieldName>: <fieldValue>, ... }, ...}
 */
const addedFieldsAtom = atom({ key: 'addedFields', default: undefined as addedFieldsType });
/**
 * @description Used to disable add property button and update button
 */
const shouldDisableButtonAtom = atom({ key: 'shouldDisableButton', default: true });
/**
 * @description Saves selected field for every row. It is indexed by ids created with lastIndex
 * @example
 * { <select index>: {
 *    name: <field name>,
 *    type: <field bobject type>,
 *    label: <field label>,
 *    required: <true/false>
 *    blocking: <true/false>,
 *    blocked: <true/false>,
 *    error: <true/false>,
 *    },
 *  ...
 * }
 */
const indexedFieldsAtom = atom({
  key: 'indexedFields',
  default: { 1: undefined } as indexedFieldsType,
});
/**
 * @description Used to add indexes to indexedFields
 */
const lastIndexAtom = atom({ key: 'lastIndex', default: 1 });
const presetPropertyAtom = atom({ key: 'presetProperty', default: undefined as string });
const stageAtom = atom({ key: 'bulkStage', default: undefined as string });
const useAllItemsAtom = atom({ key: 'useAllItemsAtom', default: undefined });

/**
 * Hook to handle the selected properties, their values, and conditions between pages.
 */
export const useInternalUpdateProperty = () => {
  const [fieldsInfo, setFieldsInfo] = useRecoilState(fieldsInfoAtom);
  const [availableFields, setAvailableFields] = useRecoilState(availableFieldsAtom);
  const [addedFields, setAddedFields] = useRecoilState(addedFieldsAtom);
  const [shouldDisableButton, setShouldDisableButton] = useRecoilState(shouldDisableButtonAtom);
  const [indexedFields, setIndexedFields] = useRecoilState(indexedFieldsAtom);
  const [lastIndex, setLastIndex] = useRecoilState(lastIndexAtom);
  const [presetProperty, setPresetProperty] = useRecoilState(presetPropertyAtom);
  const [stage, setStage] = useRecoilState(stageAtom);
  const [useAllItems, setUseAllItems] = useRecoilState<UseAllItemsType>(useAllItemsAtom);
  const isAllItems = isObject(useAllItems);

  const resetFieldsInfo = useResetRecoilState(fieldsInfoAtom);
  const resetAvailableFields = useResetRecoilState(availableFieldsAtom);
  const resetAddedFields = useResetRecoilState(addedFieldsAtom);
  const resetIndexes = useResetRecoilState(indexedFieldsAtom);
  const resetLastIndex = useResetRecoilState(lastIndexAtom);
  const resetPresetProperty = useResetRecoilState(presetPropertyAtom);
  const resetStage = useResetRecoilState(stageAtom);

  /******* INIT FIELDS INFO *******/
  const defaultBobjectTypes: BobjectType[] = ['Company', 'Lead', 'Opportunity', 'Task'];
  /**
   * Initialize internal structures: fieldsInfo, availableFields, addedFields
   * @param bobjectFieldsBack list of fields from BE
   * @param bobjectTypes list of bobject types
   */
  const initBobjectFields = (
    bobjectFieldsBack: any,
    bobjectTypes: BobjectType[] = defaultBobjectTypes,
  ) => {
    const fields: any = {};
    const available: availableFieldsType = [];
    let added: { [key: string]: { [key: string]: string } } = {};
    let presetField: fieldType;
    bobjectTypes.forEach(bobjectType => {
      added = { ...added, [bobjectType]: {} as { [key: string]: string } };
      fields[bobjectType] = bobjectFieldsBack?.sections?.reduce(
        (acc: { [key: string]: any }, section: { fields: Array<BobjectField> }) => {
          section?.fields?.forEach(field => {
            if (!field.duplicateValidation && !field.readOnly) {
              if (presetProperty && presetProperty === field?.logicRole) {
                presetField = getAvailableFieldFromBobjectField(stage, bobjectType, field);
                presetField.blocked = true;
              }
              acc = { ...acc, [field?.logicRole ?? field?.name]: field };
              available.push(getAvailableFieldFromBobjectField(stage, bobjectType, field));
            }
          });
          return { ...acc };
        },
        {},
      );
    });
    setFieldsInfo(fields);
    setAvailableFields(available);
    setAddedFields(added);
    if (presetField) {
      setIndexedFields({ 1: presetField });
      setAddedFields({ [presetField.type]: { [presetField.name]: undefined } });
    }
  };

  /**
   * Get field info as BobjectField from BE
   * @param field fieldType (internal field info)
   */
  function getFieldInfo(field: fieldType) {
    if (!fieldsInfo || !field || !Object.keys(fieldsInfo).includes(field.type)) return undefined;
    return fieldsInfo[field.type as BobjectType][field.logicRole];
  }

  /******* CHECK DISABLE BUTTONS *******/

  /**
   * Check if there is any field not filled or filled with errors
   * @param indexed
   * @param added
   */
  function hasAnyFieldInvalidValue(indexed: indexedFieldsType, added: addedFieldsType) {
    const anyInvalidValue = Object.keys(added).some(bobjectType =>
      Object.values(added[bobjectType]).some(fieldValue => fieldValue === undefined),
    );
    const anyFieldError = Object.values(indexed).some(field => !field || field.error);
    return anyInvalidValue || anyFieldError;
  }

  function disableDeleteRowButton(): boolean {
    return Object.keys(indexedFields).length === 1 && !Object.values(indexedFields)[0];
  }

  /******* ADD A ROW *******/

  /**
   * Add a row, by adding a new index to the indexedFields
   * @param fieldLR string (logic role)
   */
  function addSelectField(fieldLR: string = undefined) {
    setIndexedFields({ ...indexedFields, [lastIndex + 1]: undefined });
    setShouldDisableButton(true);
    if (fieldLR) {
      const field = availableFields.find(f => f.logicRole === fieldLR);
      changeSelectedProperty(lastIndex + 1, field);
    }
    setLastIndex(lastIndex + 1);
  }

  /**
   * Should be called when user selects a property and value that needs an additional mandatory field.
   * @param type BobjectType
   * @param fieldLR string (logic role)
   * @param index number (index of the row)
   */
  function addBlockedSelectField(type: BobjectTypes, fieldLR: string, index: number) {
    let bobjectType: BobjectType;
    if (Object.values(BobjectTypes).includes(type)) {
      bobjectType = type as BobjectType;
    } else return;
    // get conditioned field
    const field = getAvailableFieldFromBobjectField(
      stage,
      bobjectType as BobjectType,
      fieldsInfo[bobjectType][fieldLR],
    );
    // add conditioned field as blocked in indexedFields
    field.blocked = true;
    setIndexedFields({
      ...indexedFields,
      [index + 1]: {
        type: field.type,
        name: field.name,
        label: field.label,
        logicRole: field.logicRole,
        required: field.required,
        blocking: false,
        blocked: true,
        error: false,
      },
    });
    // other updates
    setShouldDisableButton(true);

    if (lastIndex === index) setLastIndex(lastIndex + 1);
  }

  /******* CHANGE FIELD IN ROW *******/

  /**
   * Change the selected property of a row
   * @param index number (index of the row)
   * @param field fieldType (internal field info)
   */
  function changeSelectedProperty(index: number, field: fieldType) {
    if (!Object.keys(addedFields[field.type])?.includes(field.name)) {
      // update added fields
      let addedFieldsCopy = { ...addedFields };
      if (indexedFields[index] !== undefined) {
        const oldField = indexedFields[index];
        const { [oldField.name]: _, ...added } = addedFieldsCopy[oldField.type];
        addedFieldsCopy = { ...addedFieldsCopy, [oldField.type]: added };
      }
      addedFieldsCopy = {
        ...addedFieldsCopy,
        [field.type]: { ...addedFieldsCopy[field.type], [field.name]: undefined },
      };
      setAddedFields(addedFieldsCopy);
      // update available fields
      const availableFieldsCopy = availableFields.map(avaField => {
        if (indexedFields[index] !== undefined && avaField.name === indexedFields[index].name)
          return { ...avaField, available: true };
        if (avaField.name === field.name) return { ...avaField, available: false };
        else return avaField;
      });
      setAvailableFields(availableFieldsCopy);
      // update other
      setIndexedFields({
        ...indexedFields,
        [index]: {
          type: field.type,
          name: field.name,
          label: field.label,
          logicRole: field.logicRole,
          required: field.required,
          blocking: isFieldConditioning(field.logicRole),
          blocked: false,
          error: false,
        },
      });
    }
  }

  /******* CHANGE VALUE IN ROW *******/

  /**
   * Change the value of a row and controls whether the add and update buttons should be disabled or not
   * @param index number (index of the row)
   * @param value string (new value for the field)
   * @param error Optional: in case of input, if the value is invalid
   */
  function changeSelectedValue(index: number, value: string | string[], error?: boolean) {
    const field = indexedFields[index];
    if (field === undefined) {
      setShouldDisableButton(false);
      return;
    }
    let disableAddButton =
      value === undefined || (Array.isArray(value) && value.length === 0 && field.required);

    if (value && isFieldConditioning(field.logicRole)) {
      // TODO: conditional fields for multi picklists
      const valueLR = fieldsInfo[field.type as BobjectType][field.logicRole]?.fieldValues.filter(
        field => field.value === value,
      )[0]?.logicRole;
      const conditionedFields = getConditionedFields(field.logicRole, valueLR);
      if (conditionedFields) {
        conditionedFields.forEach(conditionedField =>
          addBlockedSelectField(field.type, conditionedField, index),
        );
        disableAddButton = true;
      } else {
        // if conditioning field had previous value, remove conditioned row
        if (addedFields[field.type][field.name]) deleteARow(index + 1);
        setLastIndex(lastIndex + 1);
      }
    }
    const added = {
      ...addedFields,
      [field.type]: { ...addedFields[field.type], [field.name]: value },
    };
    setAddedFields(added);
    if (error !== undefined) {
      const indexed = { ...indexedFields, [index]: { ...indexedFields[index], error: error } };
      setIndexedFields(indexed);
      if (hasAnyFieldInvalidValue(indexed, added)) {
        disableAddButton = true;
      }
    }
    setShouldDisableButton(disableAddButton);
  }

  /******* DELETE A ROW AND DEPENDENT ROWS *******/

  /**
   * Delete a row and all the rows that depend on it
   * @param index number (index of the row)
   */
  function deleteRow(index: number) {
    Object.keys(indexedFields).length > 1 ? deleteARow(Number(index)) : resetField(Number(index));
  }

  /**
   * Delete a row and all the rows that depend on it
   * Recursive call for dependent rows
   * @param index number (index of the row)
   * @param indexedFields passed by parameter to avoid race condition on recoil
   * @param addedFields passed by parameter to avoid race condition on recoil
   */
  function deleteRowRecursive(
    index: number,
    indexedFields: { [key: number]: any },
    addedFields: { [key: string]: any },
  ) {
    let { [index]: deletedField, ...newIndexes } = indexedFields;
    // update added fields
    const { [deletedField.name]: _, ...restAdded } = addedFields[deletedField.type];
    let newAdded = { ...addedFields, [deletedField.type]: restAdded };

    const isBlockedAdded = Object.keys(addedFields[deletedField.type]).includes(deletedField.name);
    if (isFieldConditioning(deletedField.logicRole) && isBlockedAdded) {
      const newData = deleteRowRecursive(index + 1, newIndexes, newAdded);
      newIndexes = newData.newIndexes;
      newAdded = newData.newAdded;
    } else if (!hasAnyFieldInvalidValue(newIndexes, newAdded)) {
      setShouldDisableButton(false);
    }
    return { newIndexes, newAdded };
  }

  /**
   * Delete a row and all the rows that depend on it.
   * Delegates logic to deleteRowRecursive, but the setting of the recoil variables is done here.
   * @param index number (index of the row)
   */
  function deleteARow(index: number) {
    const { [index]: deletedField, ...rest } = indexedFields;
    if (deletedField === undefined) {
      setShouldDisableButton(false);
      setIndexedFields(rest);
    } else {
      const { newIndexes, newAdded } = deleteRowRecursive(index, indexedFields, addedFields);
      if (Object.keys(newIndexes).length < 1) {
        resetSelectField();
      } else {
        setIndexedFields(newIndexes);
      }
      setAddedFields(newAdded);

      restoreDeletedFieldAsAvailable(deletedField.name);
    }
  }

  /**
   * Update available fields after deleting a row
   * @param fieldName string (field id)
   */
  function restoreDeletedFieldAsAvailable(fieldName: string) {
    const newAvailable = availableFields.map(availableField => {
      if (availableField.name === fieldName) {
        return { ...availableField, available: true };
      } else return availableField;
    });
    setAvailableFields(newAvailable);
  }

  /**
   * Sets indexed fields to a clean state. Meant for when the user deletes last row.
   */
  function resetSelectField() {
    setIndexedFields({ [lastIndex + 1]: undefined });
    setShouldDisableButton(true);
    setLastIndex(lastIndex + 1);
  }

  /**
   * Sets internal structures to a clean state. Meant for when the user deletes last row.
   * @param index
   */
  function resetField(index: number) {
    const deletedField = indexedFields[index];
    if (deletedField !== undefined) {
      const added = { ...addedFields, [deletedField.type]: {} };
      setAddedFields(added);
      restoreDeletedFieldAsAvailable(deletedField.name);
    }
    resetSelectField();
  }

  /******* RESET CONTENT *******/
  /**
   * Reset the content of the modal. Meant for closing the modal.
   */
  function resetModalContent() {
    resetIndexes();
    resetFieldsInfo();
    resetAvailableFields();
    resetAddedFields();
    resetLastIndex();
    setShouldDisableButton(true);
    resetPresetProperty();
    resetStage();
  }

  /******* SEND TO BE *******/
  /**
   * Sends to server the data to be updated
   * @param bobjectType
   * @param bobjects
   */
  function sendPropertiesToBE(bobjectType: BobjectType, bobjects: Bobject[]) {
    let name = 'Update';
    let first = true;
    Object.values(indexedFields).forEach(field => {
      if (field && field.label) name += `${!first ? ',' : ''} ${field.label}`;
      if (!first) first = false;
    });
    name += ' in ' + `${isAllItems ? useAllItems?.totalItems : bobjects.length}` + ' ';
    name += bobjects.length > 1 ? PluralBobjectTypes[bobjectType] : bobjectType;

    const contents = Object.keys(addedFields[bobjectType]).reduce(
      (accumulator: StrDict, field: string) => {
        const value = addedFields[bobjectType][field];
        return { ...accumulator, [field]: Array.isArray(value) ? value.join(';') : value };
      },
      {},
    );

    const body = {
      importName: name,
      actionType: 'UPDATE',
      bobjectType: bobjectType,
      ...(isAllItems
        ? { query: { query: useAllItems.query } }
        : { bobjectIds: bobjects.map(bobject => bobject.id.objectId) }),
      contents,
    };
    api.post(`/bobjects/bulkAction/createBulk${isAllItems ? 'ByQuery' : ''}`, body);
  }

  /*** RETURN ***/
  return {
    setStage,
    setPresetProperty,
    setUseAllItems,
    useAllItems,
    initBobjectFields,
    availableFields,
    addedFields,
    shouldDisableButton,
    indexedFields,
    setAddedFields,
    setAvailableFields,
    addSelectField,
    changeSelectedProperty,
    changeSelectedValue,
    deleteRow,
    disableDeleteRowButton,
    getFieldInfo,
    resetModalContent,
    sendPropertiesToBE,
  };
};
