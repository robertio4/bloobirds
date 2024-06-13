import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
  Item,
  Select,
  TableCell,
  TableRow,
  Text,
  Button,
  MultiSelect,
  CheckItem,
  IconButton,
  Spinner,
  Input,
  Dropdown,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import styles from './newDependencyRow.module.css';
import React, { useCallback, useLayoutEffect, useMemo, useRef, useState, useEffect } from 'react';
import { useEntity } from '../../../../hooks';
import { getChildBobjects } from '../../../../utils/bobjects.utils';
import { pickBy, identity } from 'lodash';
import { useVirtual } from 'react-virtual';
import { useDependenciesFilters } from '../../../../hooks/useDependencies';
import { MUST_APPEAR_FIELDS } from './newDependencyRow.constants';
import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';

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

const NewDependencyRow = ({
  isValueDependency,
  handleCloseRow,
  saveDependency,
  isEdition,
  setIsEdition,
  editionOptions = {},
  removeDependency,
}) => {
  const parentRef = useRef();
  const methods = useForm({ defaultValues: { ...editionOptions } });
  const bobjectFields = useEntity('bobjectFields');
  const bobjectTypes = useBobjectTypes();
  const fieldTypes = useEntity('fieldTypes');
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const { filtersDefinition } = useDependenciesFilters(
    isValueDependency ? 'fieldValueConditions' : 'fieldConditions',
  );
  const picklistFieldType = fieldTypes
    ?.all()
    .filter(type => type?.enumName === 'GLOBAL_PICKLIST' || type?.enumName === 'PICKLIST');
  const parentField = methods.watch('requiredParentFieldId');

  // Parent fields
  const picklistBobjectFields = bobjectFields
    ?.all()
    .filter(field => picklistFieldType?.some(type => type.id === field.fieldType));
  const parentFields = picklistBobjectFields?.sort(sortAlphabeticallyByBobjectType);

  // Get current parent field selected in row
  const parentBobjectField = bobjectFields?.get(parentField);
  const parentBobjectType = bobjectTypes?.get(parentBobjectField?.bobjectType)?.name;
  const parentFieldPicklistType = picklistFieldType?.find(
    pickValue => parentBobjectField?.fieldType === pickValue?.id,
  );

  // Get child field selected in row --> Only for field value conditions
  const childField = methods.watch('childFieldId');
  const childBobjectField = bobjectFields?.get(childField);
  const childFieldPicklistType = picklistFieldType?.find(
    pickValue => childBobjectField?.fieldType === pickValue?.id,
  );
  const dependencyType = isValueDependency ? 'fieldValueConditions' : 'fieldConditions';
  const [isSubmitting, setIsSubmitting] = useState();
  const onSubmit = data => {
    setIsSubmitting(true);
    const dataToSave = {
      ...data,
      oldRequiredValueId: editionOptions?.requiredValueId,
      oldRequiredParentFieldId: editionOptions?.requiredParentFieldId,
      oldChildFieldId: editionOptions?.childFieldId,
    };
    saveDependency(dependencyType, dataToSave, () => {
      setIsSubmitting(false);
      handleCloseRow();
    });
  };
  const childBobjectTypes = getChildBobjects({
    bobjectType: parentBobjectType,
    includeSelf: true,
    bobjectFields,
    bobjectTypes,
    fieldTypes,
  });

  // Virtualize ParentField
  const [visible, setVisible] = useState(false);
  const handleClickOutside = event => {
    if (parentRef.current && !parentRef.current.contains(event.target)) {
      setVisible(false);
    }
  };
  useLayoutEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });
  const [list, setList] = useState(parentFields);
  const handleChange = (value, prop) =>
    parentFields.length > 0 &&
    parentFields?.filter(lt =>
      lt[prop]?.toString().toLowerCase().includes(value?.toString().toLowerCase()),
    );
  const [inputValue, setInputValue] = useState(
    handleChange(parentFields, 'id') ? handleChange(parentFields, 'id')[0]?.name : '',
  );
  useEffect(() => {
    if (isEdition && parentField) {
      setInputValue(handleChange(parentField, 'id')[0]?.name);
    }
  }, []);
  const onInputChange = value => {
    setVisible(true);
    setList(handleChange(value, 'name'));
    setInputValue(value);
  };
  const rowVirtualizer = useVirtual({
    size: list?.length,
    parentRef,
    estimateSize: useCallback(() => 35, []),
    overscan: 5,
  });

  // Check if all form is filled
  const isAllFilled = useMemo(() => {
    if (isValueDependency) {
      return Object.keys(pickBy(methods.getValues(), identity)).length === 4;
    }
    return Object.keys(pickBy(methods.getValues(), identity)).length === 3;
  }, [methods?.getValues(), methods.watch()]);

  // Handle render multiselect for field value dependencies
  const handleRenderDisplayValue = values => {
    if (values.length > 0) {
      const firstValueLabel = bobjectFields?.get(values[0]).name;
      return `${firstValueLabel} ${values.length > 1 ? `and ${values.length - 1} selected` : ''}`;
    }
    return '';
  };

  const valueMustBeDisabled = value =>
    !isEdition &&
    !isValueDependency &&
    filtersDefinition?.requiredValues?.some(v => v.name === value);

  return (
    <TableRow>
      <FormProvider {...methods}>
        <TableCell>
          <Controller
            name="requiredParentFieldId"
            render={({ onChange }) => (
              <Dropdown
                target={document.getElementById('portal')}
                anchor={
                  <div className={styles._input} onClick={() => setVisible(!visible)} id="portal">
                    <Input
                      placeholder="Parent field"
                      size="small"
                      width="100%"
                      onClick={() => setVisible(!visible)}
                      onChange={v => onInputChange(v)}
                      icon="chevronDown"
                      value={inputValue}
                    />
                  </div>
                }
                arrow={false}
                visible={visible}
                position="bottom-start"
                width="500px"
              >
                <div ref={parentRef} className={styles._container}>
                  <div
                    style={{
                      height: `${rowVirtualizer.totalSize}px`,
                    }}
                    className={styles._relative}
                  >
                    {rowVirtualizer.virtualItems.map(virtualRow => (
                      <div
                        key={virtualRow.index}
                        style={{
                          height: `${virtualRow.size}px`,
                          transform: `translateY(${virtualRow.start}px)`,
                        }}
                        className={styles._item}
                      >
                        <Item
                          value={list[virtualRow.index].id}
                          onClick={v => {
                            onChange(v);
                            setInputValue(handleChange(v, 'id')[0]?.name);
                            setVisible(false);
                          }}
                        >
                          {list[virtualRow.index].name}
                          <Text
                            htmlTag="span"
                            size="xs"
                            color="softPeanut"
                            className={styles.__bobject_text}
                          >
                            {`  ${bobjectTypes.get(list[virtualRow.index]?.bobjectType).name}`}
                          </Text>
                        </Item>
                      </div>
                    ))}
                  </div>
                </div>
              </Dropdown>
            )}
          />
        </TableCell>
        <TableCell>
          <Controller
            name="requiredValueId"
            render={({ onChange, value }) => (
              <Select
                width={200}
                onChange={onChange}
                disabled={!parentField}
                value={value}
                size="small"
                borderless={false}
                placeholder="Conditioning value"
              >
                {parentFieldPicklistType?.enumName === 'GLOBAL_PICKLIST'
                  ? bobjectPicklistFieldValues
                      ?.filterBy('bobjectGlobalPicklist')(parentBobjectField?.bobjectGlobalPicklist)
                      ?.filter(v => v.enabled)
                      .map(pickValue =>
                        valueMustBeDisabled(pickValue.id) ? (
                          <Item key={pickValue.id} value={pickValue.id} disabled>
                            <Tooltip title="This value has already a dependency" position="top">
                              {pickValue.value}
                            </Tooltip>
                          </Item>
                        ) : (
                          <Item key={pickValue.id} value={pickValue.id}>
                            {pickValue.value}
                          </Item>
                        ),
                      )
                  : bobjectPicklistFieldValues
                      ?.filterBy('bobjectField')(parentField)
                      ?.filter(v => v.enabled)
                      .map(pickValue =>
                        valueMustBeDisabled(pickValue.id) ? (
                          <Item key={pickValue.id} value={pickValue.id} disabled>
                            <Tooltip title="This value has already a dependency" position="top">
                              {pickValue.value}
                            </Tooltip>
                          </Item>
                        ) : (
                          <Item key={pickValue.id} value={pickValue.id}>
                            {pickValue.value}
                          </Item>
                        ),
                      )}
              </Select>
            )}
          />
        </TableCell>
        <TableCell>
          {isValueDependency ? (
            <Controller
              name="childFieldId"
              render={({ onChange, value }) => (
                <Select
                  width={200}
                  onChange={values => {
                    onChange(values);
                    methods.setValue('fieldValuesToDisplayId', []);
                  }}
                  value={value}
                  size="small"
                  disabled={!parentField}
                  borderless={false}
                  placeholder="Child field"
                >
                  {picklistBobjectFields
                    ?.filter(
                      field =>
                        field.id === value ||
                        (Object.values(MUST_APPEAR_FIELDS).includes(field.logicRole) &&
                          parentBobjectType === 'Company') ||
                        (field.bobjectFieldGroup &&
                          !field.layoutReadOnly &&
                          field?.id !== parentBobjectField?.id &&
                          childBobjectTypes?.some(childType => childType === field?.bobjectType)),
                    )
                    .sort(sortAlphabeticallyByBobjectType)
                    .map(field => (
                      <Item key={field.id} value={field.id}>
                        {field.name} -
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
            <Controller
              name="fieldsToDisplayId"
              render={({ onChange, value }) => (
                <MultiSelect
                  renderDisplayValue={handleRenderDisplayValue}
                  width={200}
                  onChange={onChange}
                  value={value}
                  size="small"
                  disabled={!parentField}
                  borderless={false}
                  placeholder="Child field"
                >
                  {bobjectFields
                    ?.all()
                    ?.filter(
                      field =>
                        value?.some(v => v === field.id) ||
                        (field.bobjectFieldGroup &&
                          !field.layoutReadOnly &&
                          field?.id !== parentBobjectField?.id &&
                          childBobjectTypes?.some(childType => childType === field?.bobjectType)),
                    )
                    .sort(sortAlphabeticallyByBobjectType)
                    .map(field => (
                      <CheckItem
                        key={field.id}
                        value={field.id}
                        className={styles.__checkItem__element}
                      >
                        {field.name} -{' '}
                        <Text
                          htmlTag="span"
                          align="left"
                          size="xs"
                          color="softPeanut"
                          className={styles.__bobject_text}
                        >
                          {bobjectTypes.get(field?.bobjectType).name}
                        </Text>
                      </CheckItem>
                    ))}
                </MultiSelect>
              )}
            />
          )}
        </TableCell>
        <TableCell>
          {!isValueDependency ? (
            <>
              <Button
                className={styles._save__button}
                size="small"
                variant="primary"
                onClick={methods.handleSubmit(onSubmit)}
                disabled={!isAllFilled}
              >
                {isSubmitting ? <Spinner name="loadingCircle" size={16} color="white" /> : 'SAVE'}
              </Button>
              <IconButton
                name="undoRevert"
                color="bloobirds"
                onClick={isEdition ? () => setIsEdition(false) : handleCloseRow}
              />
              {isEdition && (
                <IconButton
                  name="trashFull"
                  color="bloobirds"
                  onClick={() =>
                    removeDependency(dependencyType, methods.getValues(), () => setIsEdition(false))
                  }
                />
              )}
            </>
          ) : (
            <Controller
              name="fieldValuesToDisplayId"
              render={({ onChange, value }) => (
                <MultiSelect
                  selectAllOption
                  width={200}
                  onChange={onChange}
                  disabled={!childField}
                  value={value}
                  size="small"
                  borderless={false}
                  placeholder="Field Values to be displayed"
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
          )}
        </TableCell>
        {isValueDependency && (
          <TableCell>
            <div className={styles.actions}>
              <Button
                className={styles._save__button}
                size="small"
                variant="primary"
                onClick={methods.handleSubmit(onSubmit)}
                disabled={!isAllFilled}
              >
                {isSubmitting ? <Spinner name="loadingCircle" size={16} color="white" /> : 'SAVE'}
              </Button>
              <IconButton
                name="undoRevert"
                color="bloobirds"
                onClick={isEdition ? () => setIsEdition(false) : handleCloseRow}
              />
              {isEdition && (
                <IconButton
                  name="trashFull"
                  color="bloobirds"
                  onClick={() =>
                    removeDependency(dependencyType, methods.getValues(), () => setIsEdition(false))
                  }
                />
              )}
            </div>
          </TableCell>
        )}
      </FormProvider>
    </TableRow>
  );
};

export default NewDependencyRow;
