import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import {
  Checkbox,
  IconButton,
  Text,
  Input,
  InputPicker,
  InputPickerOption,
  Select,
  Item,
  CheckItem,
  MultiSelect,
  DoubleInput,
  RelativeDatePicker,
  SortableList,
  Icon,
} from '@bloobirds-it/flamingo-ui';
import { formatDateAsText } from '@bloobirds-it/utils';
import classnames from 'clsx';

import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../constants/lead';
import { useEntity } from '../../../hooks';
import { asArray } from '../../../misc/utils';
import { getTextLabelFromPicklistValues } from '../../../utils/picklist.utils';
import { dateArrayToIntervalString, relativeDates } from '../../filter/RelativeDates';
import { MultiSelectInput } from '../../filter/field/multiSelectInput';
import {
  changeLogicRolesToIds,
  getShownBobjectFields,
  getToggleElementCallback,
} from '../context/bobjectTable.utils';
import {
  DATE_FIELD_TYPES,
  NUMBER_FIELD_TYPES,
  PICKLIST_FIELD_TYPES,
  TEXT_FIELD_TYPES,
  NUMBER_FIELD_FILTERS,
  NON_VALUE_SEARCH_MODES,
  RANGE_SEARCH_MODES,
  FIELD_FILTERS,
  USER_GLOBAL_PICKLIST,
  MULTIPICKLIST_FILTERS,
  RELATIVE_DATES_OPTIONS,
} from './viewEdition.constants';
import { isFiltersModal, isColumnsModal } from './viewEdition.selector';
import { wrapValues, renderDisplayValue } from './viewEdition.utils';

const hiddenFilterFields = [
  COMPANY_FIELDS_LOGIC_ROLE.STAGE,
  LEAD_FIELDS_LOGIC_ROLE.STAGE,
  'ACTIVITY__TABLE_VIEW_ITEM',
];

const isHiddenFilterField = field => hiddenFilterFields.includes(field.logicRole);

export const getTextFilterValues = ({ values, field, picklistFieldValues, fieldTypes }) => {
  let textValue = values;
  if (field) {
    // Display version 2 picklist values
    if (PICKLIST_FIELD_TYPES.includes(fieldTypes.get(field.fieldType).name)) {
      if (typeof textValue === 'object' && !Array.isArray(textValue)) {
        if (Array.isArray(textValue?.value)) {
          textValue = `${
            MULTIPICKLIST_FILTERS[textValue[0]?.type] || 'Is any of '
          } ${getTextLabelFromPicklistValues(textValue?.value, picklistFieldValues)}`;
        } else {
          textValue = `${FIELD_FILTERS[textValue?.type]} ${
            textValue?.value && `${picklistFieldValues.get(textValue?.value)?.value}`
          }`;
        }
      } else {
        // Display version 1 and 2 picklist values
        textValue = `${MULTIPICKLIST_FILTERS[textValue[0]?.type] || 'Is any of '} ${
          getTextLabelFromPicklistValues(
            values.every(value => typeof value === 'string')
              ? values
              : values.flatMap(value => value.value),
            picklistFieldValues,
          ) || ''
        }`;
      }
    }
    // Display version 1 dates values
    if (
      DATE_FIELD_TYPES.includes(fieldTypes.get(field.fieldType).name) &&
      !(
        textValue[0]?.type === 'RANGE__SEARCH__BETWEEN__DATES' ||
        textValue.type === 'RANGE__SEARCH__BETWEEN__DATES'
      )
    ) {
      if (NON_VALUE_SEARCH_MODES.includes(textValue[0]?.type || textValue?.type)) {
        textValue = `${FIELD_FILTERS[textValue[0]?.type] || FIELD_FILTERS[textValue?.type]}`;
      } else if (Array.isArray(values) && values.length === 1 && relativeDates[values[0]]) {
        textValue = relativeDates[values[0]];
      } else {
        textValue = dateArrayToIntervalString(values);
      }
    }
    // Display version 2 dates values
    if (
      textValue[0]?.type === 'RANGE__SEARCH__BETWEEN__DATES' ||
      textValue.type === 'RANGE__SEARCH__BETWEEN__DATES'
    ) {
      if (textValue[0]?.value.type === 'custom' || textValue?.value?.type === 'custom') {
        textValue = `Between ${formatDateAsText({
          text: textValue[0]?.value.start || textValue.value.start,
        })} and ${formatDateAsText({ text: textValue[0]?.value.end || textValue.value.end })}`;
      } else if (
        Object.keys(RELATIVE_DATES_OPTIONS).includes(
          textValue[0]?.value?.type || textValue[0]?.value || textValue?.value?.type,
        )
      ) {
        textValue =
          RELATIVE_DATES_OPTIONS[
            textValue[0]?.value?.type || textValue[0]?.value || textValue?.value?.type
          ];
      } else if (typeof textValue[0]?.value === 'string') {
        textValue = `Between ${formatDateAsText({
          text: textValue[0]?.value.split(',')[0],
        })} and ${formatDateAsText({ text: textValue[0]?.value.split(',')[1] })}`;
      }
    }
    // Display version 1 text field values
    if (
      Array.isArray(values) &&
      values.length === 1 &&
      Object.keys(FIELD_FILTERS).includes(textValue[0].type)
    ) {
      textValue = `${FIELD_FILTERS[textValue[0].type] || 'Contains:'} ${
        textValue[0]?.value !== undefined ? textValue[0].value : textValue
      }`;
    }
    // Display version 2 text field values
    if (
      Object.keys(FIELD_FILTERS).includes(textValue?.type) &&
      [...TEXT_FIELD_TYPES, 'Number'].includes(fieldTypes.get(field.fieldType).name)
    ) {
      textValue = `${FIELD_FILTERS[textValue.type]} ${textValue?.value && `${textValue.value}`}`;
    }
    // Display number values
    if (
      RANGE_SEARCH_MODES.includes(textValue[0]?.type) ||
      RANGE_SEARCH_MODES.includes(textValue?.type)
    ) {
      if (
        textValue[0]?.type === 'RANGE__SEARCH__BETWEEN' ||
        textValue?.type === 'RANGE__SEARCH__BETWEEN'
      ) {
        if (Array.isArray(textValue)) {
          const { start, end } = textValue[0]?.value || {};
          const switchPlaces = end - start < 0;
          textValue = `${NUMBER_FIELD_FILTERS[textValue[0]?.type]} ${
            switchPlaces ? end : start
          } and ${switchPlaces ? start : end}`;
        } else {
          textValue = `${NUMBER_FIELD_FILTERS[textValue?.type]} ${textValue.value.start} and ${
            textValue.value.end
          }`;
        }
      } else {
        textValue = `${
          typeof textValue[0]?.value === 'string'
            ? NUMBER_FIELD_FILTERS[textValue[0]?.type]
            : NUMBER_FIELD_FILTERS[textValue?.type]
        } ${textValue?.value && `${textValue.value}`}`;
      }
    }
    return textValue;
  } else {
    return null;
  }
};

const renderCategoriesStepFiltersList = ({
  bobjectTypes,
  elements,
  fields,
  fieldTypes,
  handleRemoveElement,
  picklistFieldValues,
  styles,
}) =>
  picklistFieldValues &&
  fieldTypes &&
  elements &&
  Object.entries(elements).map(([fieldId, values]) => {
    const field = fields?.get(fieldId);
    const textValue = getTextFilterValues({
      values,
      field,
      picklistFieldValues,
      fieldTypes,
    });

    return (
      !isHiddenFilterField(field) &&
      field && (
        <div className={styles._fields_list_item} key={`field-${fieldId}`}>
          <div
            className={styles._fields_list_close_button}
            onClick={() => handleRemoveElement(fieldId)}
          >
            <IconButton name="cross" />
          </div>
          <div className={styles._fields_list_text}>
            <Text size="m" color="penaut">
              {`${field.name} (${bobjectTypes.get(field.bobjectType).name})`}
              {`: ${textValue || ''}`}
            </Text>
          </div>
        </div>
      )
    );
  });

const iconCategoryStepColumn = (field, handleRemoveElement, styles, currentBobjectTypeIds) => {
  if (field.requiredColumnInList && currentBobjectTypeIds.includes(field.bobjectType)) {
    return (
      <div className={styles._fields_list_close_button}>
        <IconButton name="lock" color="verySoftPeanut" />
      </div>
    );
  }
  return (
    <div className={styles._fields_list_close_button} onClick={() => handleRemoveElement(field.id)}>
      <IconButton name="cross" />
    </div>
  );
};

const renderCategoriesStepColumnsList = ({
  elements,
  fields,
  reorderElements,
  styles,
  currentBobjectTypes,
  handleRemoveElement,
  bobjectTypes,
}) => {
  const bobjectFieldsElements = elements && fields && getShownBobjectFields(elements, fields);
  return (
    <SortableList
      data={bobjectFieldsElements}
      keyExtractor={field => field?.id}
      onReorder={el => {
        reorderElements(el);
      }}
      renderItem={({ item: field, innerRef, containerProps, handleProps }) => {
        const currentBobjectTypeIds = currentBobjectTypes.map(({ id }) => id);
        const shouldShowFrom = !currentBobjectTypeIds.includes(field.bobjectType);
        return (
          <div
            className={styles._fields_list_item}
            key={`field-${field.id}`}
            ref={innerRef}
            {...containerProps}
            {...handleProps}
          >
            {iconCategoryStepColumn(field, handleRemoveElement, styles, currentBobjectTypeIds)}
            <div className={styles._fields_list_text}>
              <Text size="m" color="peanut">
                {field.name} {shouldShowFrom && `from ${bobjectTypes.get(field.bobjectType).name}`}
              </Text>
            </div>
            <div className={styles._fields_list_order_buttons}>
              <Icon name="dragAndDrop" />
            </div>
          </div>
        );
      }}
    />
  );
};

const renderFieldsStepFiltersFieldList = (
  elements,
  fields,
  setElements,
  styles,
  viewEditionFromDashboards,
  handleSearch,
) => {
  const [search, setSearch] = handleSearch || [];
  const getValue = name => elements && elements[name];

  const isRelativeDate = date => Object.keys(RELATIVE_DATES_OPTIONS).includes(date);

  const getTextFieldValue = (name, isPicklist = false) => {
    if (elements && elements[name]) {
      if (
        elements[name][0]?.type === 'RANGE__SEARCH__BETWEEN__DATES' ||
        elements[name]?.type === 'RANGE__SEARCH__BETWEEN__DATES'
      ) {
        if (typeof elements[name]?.value === 'string') {
          return {
            type: elements[name]?.type,
            value: null,
          };
        }
        return {
          type: elements[name][0]?.type || elements[name]?.type,
          value: {
            type:
              elements[name][0]?.value?.type ||
              elements[name]?.value?.type ||
              (isRelativeDate(elements[name][0]?.value) ? elements[name][0]?.value : 'custom'),
            start:
              elements[name][0]?.value?.start ||
              elements[name]?.value?.start ||
              (!isRelativeDate(elements[name][0]?.value)
                ? new Date(elements[name][0]?.value?.split(',')[0])
                : ''),
            end:
              elements[name][0]?.value?.end ||
              elements[name]?.value?.end ||
              (!isRelativeDate(elements[name][0]?.value)
                ? new Date(elements[name][0]?.value?.split(',')[1])
                : ''),
          },
        };
      }
      if (elements[name][0]?.type === 'EXACT__SEARCH' || elements[name]?.type === 'EXACT__SEARCH') {
        return {
          type: elements[name][0]?.type || elements[name]?.type,
          value: wrapValues(elements[name][0]?.value || elements[name]?.value),
        };
      }
      if (elements[name][0]?.type || elements[name]?.type) {
        return {
          type: elements[name][0]?.type || elements[name]?.type,
          value: elements[name][0]?.value || elements[name]?.value,
        };
      }
      return {
        type: isPicklist ? 'EXACT__SEARCH' : 'AUTOCOMPLETE__SEARCH',
        value: elements[name].value || elements[name],
      };
    }
    return null;
  };

  const onChangeValue = (field, value) => {
    if (!NON_VALUE_SEARCH_MODES.includes(value?.type)) {
      value?.type && value?.value ? setElements(field, value) : setElements(field, undefined);
    } else {
      setElements(field, value);
    }
  };

  return (
    <ul className={styles._list}>
      {viewEditionFromDashboards &&
        fields
          .filter(field => PICKLIST_FIELD_TYPES.includes(field.type))
          .map(field => (
            <li key={field.name} className={styles._list_item_input}>
              <MultiSelectInput
                field={field}
                value={getValue(field.name)}
                variant="outlined"
                onChange={v => setElements(field, v)}
              />
            </li>
          ))}
      {!viewEditionFromDashboards &&
        fields
          .filter(field => PICKLIST_FIELD_TYPES.includes(field.type))
          .map(field => (
            <li key={field.name} className={styles._list_item_input}>
              <InputPicker
                size="medium"
                dataTest={field.logicRole}
                defaultValue={getTextFieldValue(field.name, true, field)}
                value={getTextFieldValue(field.name, true, field)}
                width={375}
                onChange={value => onChangeValue(field, value)}
                placeholder={field.label}
                openDefaultValue={elements[field.name] ? {} : { type: 'EXACT__SEARCH' }}
                renderDisplayValue={value => renderDisplayValue(value, field)}
              >
                <InputPickerOption title="Is any of" type="EXACT__SEARCH">
                  <MultiSelect
                    sortByChecked={field?.fieldValues?.length > 8}
                    width="100%"
                    dataTest={`menu-category-${field.label}`}
                    placeholder={field.label}
                    size="medium"
                    autocomplete={field?.fieldValues?.length > 8}
                  >
                    {USER_GLOBAL_PICKLIST.includes(field.logicRole) && (
                      <CheckItem dataTest="menu-item-me" value="__me__">
                        Me
                      </CheckItem>
                    )}
                    {field.fieldValues?.map(option => (
                      <CheckItem
                        value={option.value}
                        dataTest={`menu-item-${option.label}`}
                        key={`menu-item-${option.value}`}
                      >
                        {option.label}
                      </CheckItem>
                    ))}
                  </MultiSelect>
                </InputPickerOption>
                <InputPickerOption title="Is not" type="NOT__SEARCH">
                  <Select
                    field={field}
                    value={getValue(field.name)}
                    variant="outlined"
                    autocomplete={field?.fieldValues?.length > 8}
                    onSearch={value => setSearch(value)}
                  >
                    {field.fieldValues?.map(option => {
                      if (!search || option?.label?.toLowerCase().includes(search?.toLowerCase()))
                        return (
                          <Item key={option?.value} value={option?.value}>
                            {option?.label}
                          </Item>
                        );
                    })}
                  </Select>
                </InputPickerOption>
                <InputPickerOption title="It's not empty" type="__MATCH_FULL_ROWS__" />
                <InputPickerOption title="It's empty" type="__MATCH_EMPTY_ROWS__" />
              </InputPicker>
            </li>
          ))}
      {fields
        .filter(field => DATE_FIELD_TYPES.includes(field.type))
        .map(field => (
          <li key={field.name} className={styles._list_item_input}>
            <InputPicker
              size="medium"
              dataTest={field.logicRole}
              defaultValue={getTextFieldValue(field.name)}
              value={getTextFieldValue(field.name)}
              width={375}
              onChange={value => onChangeValue(field, value)}
              placeholder={field.label}
              renderDisplayValue={value => renderDisplayValue(value, field)}
            >
              <InputPickerOption title="Range date" type="RANGE__SEARCH__BETWEEN__DATES">
                <RelativeDatePicker />
              </InputPickerOption>
              <InputPickerOption title="It's not empty" type="__MATCH_FULL_ROWS__" />
              <InputPickerOption title="It's empty" type="__MATCH_EMPTY_ROWS__" />
            </InputPicker>
          </li>
        ))}
      {fields
        .filter(field => TEXT_FIELD_TYPES.includes(field.type))
        .map(field => (
          <li key={field.name} className={styles._list_item_input}>
            <InputPicker
              size="medium"
              dataTest={field.logicRole}
              defaultValue={getTextFieldValue(field.name)}
              value={getTextFieldValue(field.name)}
              width={375}
              onChange={value => onChangeValue(field, value)}
              placeholder={field.label}
            >
              <InputPickerOption title="Contains" type="AUTOCOMPLETE__SEARCH">
                <Input placeholder="Contains..." />
              </InputPickerOption>
              <InputPickerOption title="Contains exactly" type="EXACT__SEARCH">
                <Input placeholder="Contains exactly..." />
              </InputPickerOption>
              <InputPickerOption title="It's not empty" type="__MATCH_FULL_ROWS__" />
              <InputPickerOption title="It's empty" type="__MATCH_EMPTY_ROWS__" />
            </InputPicker>
          </li>
        ))}
      {fields
        .filter(field => NUMBER_FIELD_TYPES.includes(field.type))
        .map(field => (
          <li key={field.name} className={styles._list_item_input}>
            <InputPicker
              size="medium"
              dataTest={field.logicRole}
              defaultValue={getTextFieldValue(field.name)}
              value={getTextFieldValue(field.name)}
              width={375}
              onChange={value => onChangeValue(field, value)}
              placeholder={field.label}
            >
              <InputPickerOption title="Is greater than" type="RANGE__SEARCH__GT">
                <Input type="number" placeholder="Is greater than..." />
              </InputPickerOption>
              <InputPickerOption title="Is less than" type="RANGE__SEARCH__LT">
                <Input type="number" placeholder="Is less than..." />
              </InputPickerOption>
              <InputPickerOption title="Is greater or equal than" type="RANGE__SEARCH__GTE">
                <Input type="number" placeholder="Is greater or equal than..." />
              </InputPickerOption>
              <InputPickerOption title="Is less or equal than" type="RANGE__SEARCH__LTE">
                <Input type="number" placeholder="Is less or equal than..." />
              </InputPickerOption>
              <InputPickerOption title="Between" type="RANGE__SEARCH__BETWEEN">
                <DoubleInput type="number" placeholder="Between..." />
              </InputPickerOption>
              <InputPickerOption title="Contains exactly" type="EXACT__SEARCH">
                <Input type="number" placeholder="Contains exactly..." />
              </InputPickerOption>
              <InputPickerOption title="It's not empty" type="__MATCH_FULL_ROWS__" />
              <InputPickerOption title="It's empty" type="__MATCH_EMPTY_ROWS__" />
            </InputPicker>
          </li>
        ))}
    </ul>
  );
};

const renderFieldsStepColumnsFieldList = (elements, fields, onClickElement, styles) => (
  <ul className={styles._list}>
    {fields.map(field => {
      const isSelected = elements.includes(field.name);
      return (
        <li
          data-test={`Button-category${field.label}`}
          key={field.name}
          className={classnames(styles._list_item_checkbox, {
            [styles._list_item_checkbox_selected]: isSelected,
          })}
        >
          <Checkbox onClick={() => onClickElement(field.name)} checked={isSelected}>
            <Text size="s">{field.label}</Text>
          </Checkbox>
        </li>
      );
    })}
  </ul>
);

const ViewEditionContext = createContext();

export const ViewEditionContextProvider = ({
  children,
  query = '',
  columns = [],
  setColumns = () => {},
  setQuery = () => {},
  bobjectType,
  shouldShowField,
  showRelationships = true,
  viewEditionFromDashboards = false,
}) => {
  const [modalType, setModalType] = useState();
  const [selectedElements, setSelectedElements] = useState();
  const fields = useEntity('bobjectFields');
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  let addElementProps = {};
  const toggleColumn = getToggleElementCallback(selectedElements, setSelectedElements);
  const [displaySettings, setDisplaySettings] = useState(false);

  const removeFilter = useCallback(
    id => {
      const elements = { ...selectedElements };
      delete elements[id];
      setSelectedElements(elements);
    },
    [selectedElements, setSelectedElements],
  );

  const reorderElements = elements => {
    const elementsToOrder = elements?.map(el => el?.id);
    setSelectedElements(elementsToOrder);
  };

  useEffect(() => {
    let initialSelectedElements;

    if (isFiltersModal(modalType)) {
      initialSelectedElements = changeLogicRolesToIds({
        query,
        bobjectFields: fields,
        bobjectPicklistFieldValues,
      });
    } else if (isColumnsModal(modalType)) {
      const bobjectFieldsOfElements = getShownBobjectFields(columns, fields);
      initialSelectedElements = bobjectFieldsOfElements?.map(element => element.id);
    }
    setSelectedElements(initialSelectedElements);
  }, [modalType]);

  const addFilterModalProps = {
    elements: selectedElements,
    handleRemoveElement: removeFilter,
    handleOnChangeElement: setSelectedElements,
    setElements: newQuery => setQuery(newQuery),
    renderCategoriesStepList: useCallback(renderCategoriesStepFiltersList, []),
    renderFieldsStepList: useCallback(renderFieldsStepFiltersFieldList, []),
  };

  const addColumnModalProps = {
    elements: selectedElements,
    handleRemoveElement: toggleColumn,
    handleOnChangeElement: setSelectedElements,
    reorderElements,
    setElements: selectedColumns => setColumns(selectedColumns),
    renderCategoriesStepList: useCallback(renderCategoriesStepColumnsList, []),
    renderFieldsStepList: useCallback(renderFieldsStepColumnsFieldList, []),
  };

  if (modalType) {
    if (isFiltersModal(modalType)) {
      addElementProps = { ...addFilterModalProps };
    } else {
      addElementProps = { ...addColumnModalProps };
    }
  }

  return (
    <ViewEditionContext.Provider
      value={{
        ...addElementProps,
        shouldShowField,
        modalType,
        setModalType,
        reorderElements,
        bobjectTypeList: asArray(bobjectType),
        showRelationships,
        viewEditionFromDashboards,
        displaySettings,
        setDisplaySettings,
      }}
    >
      {children}
    </ViewEditionContext.Provider>
  );
};

export const useViewEditionContext = () => useContext(ViewEditionContext);
