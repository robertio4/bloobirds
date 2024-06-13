import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useEntity } from '../../../../../../hooks';
import React, { useMemo, useState } from 'react';
import { identity, pickBy } from 'lodash';
import { useTagsModal } from '../../../../../../hooks/useTagsModal';
import {
  Button,
  CheckItem,
  IconButton,
  Item,
  MultiSelect,
  Select,
  Spinner,
  TableCell,
  TableRow,
  Tag,
  Text,
} from '@bloobirds-it/flamingo-ui';
import styles from '../../../businessAssetsPage.module.css';
import { useBobjectTypes } from '../../../../../../hooks/useBobjectTypes';

const sortAlphabeticallyByBobjectType = (a, b) => {
  if (a?.bobjectType < b?.bobjectType) {
    return -1;
  }
  if (a?.bobjectType > b?.bobjectType) {
    return 1;
  }
  if (a?.name < b?.name) {
    return -1;
  }
  return 1;
};

const sortAlphabeticallyByValue = (a, b) => {
  if (a?.value < b?.value) {
    return -1;
  }
  if (a?.value > b?.value) {
    return 1;
  }
  return 0;
};

export const SegmentationRow = ({
  isCreation,
  isEdition,
  setIsCreation,
  saveDependency,
  handleCloseRow,
  removeDependency,
  parentField,
  modalInfo,
  condition,
}) => {
  const methods = useForm();
  const bobjectFields = useEntity('bobjectFields');
  const fieldTypes = useEntity('fieldTypes');
  const bobjectTypes = useBobjectTypes();
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const picklistFieldType = fieldTypes
    ?.all()
    .filter(type => type?.enumName === 'GLOBAL_PICKLIST' || type?.enumName === 'PICKLIST');
  const referenceFieldType = fieldTypes?.all().filter(type => type?.enumName === 'REFERENCE');
  const picklistBobjectFields = bobjectFields
    ?.all()
    .filter(field => picklistFieldType?.some(type => type.id === field.fieldType));

  // Get child field selected in row --> Only for field value conditions
  const childField = methods.watch('childFieldId');
  const childBobjectField = bobjectFields?.get(childField);
  const childFieldPicklistType = picklistFieldType?.find(
    pickValue => childBobjectField?.fieldType === pickValue?.id,
  );
  const baseDependency = {
    requiredParentFieldId: parentField?.id,
    requiredValueId: modalInfo ? modalInfo[1]?.id : null,
  };
  const isAllFilled = useMemo(
    () => Object.keys(pickBy(methods.getValues(), identity)).length === 2,
    [methods?.getValues(), methods.watch()],
  );
  const [isSubmitting, setIsSubmitting] = useState();
  const onSubmit = data => {
    setIsSubmitting(true);
    const dependencyData = {
      ...data,
      ...baseDependency,
    };
    saveDependency('fieldValueConditions', dependencyData, () => {
      setIsSubmitting(false);
      handleCloseRow();
    });
  };
  const { handleOpenTagsModal } = useTagsModal();

  const parentBobjectType = bobjectTypes?.get(parentField?.bobjectType)?.id;

  return (
    <TableRow>
      <FormProvider {...methods}>
        <TableCell width="170px">
          {isCreation ? (
            <Controller
              name="childFieldId"
              render={({ onChange, value }) => (
                <Select
                  width={170}
                  onChange={onChange}
                  value={value}
                  size="small"
                  borderless={false}
                  placeholder="Child field"
                  color="purple"
                >
                  {picklistBobjectFields
                    ?.filter(
                      field =>
                        field.id === value ||
                        (field.bobjectFieldGroup &&
                          !field.layoutReadOnly &&
                          field?.id !== parentField?.id &&
                          field?.fieldType !== referenceFieldType?.id &&
                          field?.bobjectType === parentBobjectType),
                    )
                    .sort(sortAlphabeticallyByBobjectType)
                    .map(field => (
                      <Item key={field.id} value={field.id}>
                        {field.name} -{' '}
                        <Text
                          htmlTag="span"
                          size="xs"
                          color="softPeanut"
                          className={styles.__bobject_text}
                        >
                          {bobjectTypes.get(field?.bobjectType).name}
                        </Text>
                      </Item>
                    ))}
                </Select>
              )}
            />
          ) : (
            <> {condition?.childField.label}</>
          )}
        </TableCell>
        <TableCell width="170px">
          {isCreation ? (
            <Controller
              name="fieldValuesToDisplayId"
              render={({ onChange, value }) => (
                <MultiSelect
                  selectAllOption
                  width={170}
                  onChange={onChange}
                  disabled={!childField}
                  value={value}
                  size="small"
                  borderless={false}
                  placeholder="Field Values to be displayed"
                  color="purple"
                >
                  {childFieldPicklistType?.enumName === 'GLOBAL_PICKLIST'
                    ? bobjectPicklistFieldValues
                        ?.filterBy('bobjectGlobalPicklist')(
                          childBobjectField?.bobjectGlobalPicklist,
                        )
                        ?.filter(v => v.enabled || value?.includes(v.id))
                        ?.sort(sortAlphabeticallyByValue)
                        .map(pickValue => (
                          <CheckItem key={pickValue.id} value={pickValue.id}>
                            {pickValue.value}
                          </CheckItem>
                        ))
                    : bobjectPicklistFieldValues
                        ?.filterBy('bobjectField')(childField)
                        ?.filter(v => v.enabled || value?.includes(v.id))
                        ?.sort(sortAlphabeticallyByValue)
                        .map(pickValue => (
                          <CheckItem key={pickValue.id} value={pickValue.id}>
                            {pickValue.value}
                          </CheckItem>
                        ))}
                </MultiSelect>
              )}
            />
          ) : (
            <div className={styles.__tags_row__container}>
              {condition?.fieldValuesToDisplay?.slice(0, 2).map(fieldValue => (
                <span key={fieldValue.id} className={styles._value__tag}>
                  <Tag uppercase={false}>{fieldValue.label}</Tag>
                </span>
              ))}
              <span
                className={styles._number__tags}
                onClick={() => handleOpenTagsModal(condition?.fieldValuesToDisplay, true)}
              >
                {condition?.fieldValuesToDisplay.length > 2 &&
                  `+${condition?.fieldValuesToDisplay.length - 2}`}
              </span>
            </div>
          )}
        </TableCell>
        <TableCell width="150px">
          <div className={styles.actions}>
            {isCreation && (
              <>
                <Button
                  className={styles._save__button}
                  size="small"
                  onClick={methods.handleSubmit(onSubmit)}
                  {...(isAllFilled ? { color: 'purple' } : {})}
                  disabled={!isAllFilled}
                >
                  {isSubmitting ? <Spinner name="loadingCircle" size={16} color="white" /> : 'SAVE'}
                </Button>
                <IconButton
                  name="undoRevert"
                  color="purple"
                  onClick={isCreation ? () => setIsCreation(false) : handleCloseRow}
                />
              </>
            )}
            {isEdition && (
              <IconButton
                name="trashFull"
                color="purple"
                onClick={() =>
                  removeDependency(
                    'fieldValueConditions',
                    {
                      requiredParentFieldId: condition?.requiredParentField?.name,
                      requiredValueId: condition?.requiredValue?.name,
                      childFieldId: condition?.childField?.name,
                    },
                    () => {},
                  )
                }
              />
            )}
          </div>
        </TableCell>
      </FormProvider>
    </TableRow>
  );
};
