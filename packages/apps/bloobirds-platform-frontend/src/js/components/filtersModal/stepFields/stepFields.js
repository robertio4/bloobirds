import React, { useEffect, useState } from 'react';

import { Collapsible, IconButton, SearchInput, Text } from '@bloobirds-it/flamingo-ui';
import { isEmpty } from 'lodash';

import { SearchFilters } from '../../../../assets/svg';
import { useBobjectFields } from '../../../hooks/useBobjectFields';
import { useFiltersModal, useFiltersSettings } from '../../../hooks/useFiltersModal';
import FieldItem from './fieldItem';
import styles from './stepFields.module.css';

const StepFields = ({
  filterFieldsMethod = null,
  handleBack,
  onChangeFilter,
  picklistComponentType,
  selectedFilters,
}) => {
  const { closeFiltersModal, selectedBobjectType } = useFiltersModal();
  const [searchElements, setSearchElements] = useState();
  const entityTitle = selectedBobjectType;
  const [hiddenValues, setHiddenValues] = useState(false);

  const { showHiddenValuesDashboards } = useFiltersSettings();

  useEffect(() => {
    setHiddenValues(showHiddenValuesDashboards);
  }, [showHiddenValuesDashboards]);

  const fieldSections = useBobjectFields(selectedBobjectType, hiddenValues);
  const indexedSections = {
    sections: fieldSections?.sections
      ? fieldSections?.sections?.map(({ fields, ...rest }) => ({
          ...rest,
          fields: fields.filter(field => {
            const validField = field.indexed && field.type !== 'Reference';

            return filterFieldsMethod ? filterFieldsMethod(field) && validField : validField;
          }),
        }))
      : [],
  };

  const searchElementsFields = searchElements?.sections?.filter(
    section => section.fields.length > 0,
  );
  const hasSearchElementsFields = searchElementsFields?.length > 0;

  useEffect(() => {
    if (fieldSections && !isEmpty(fieldSections)) {
      setSearchElements(indexedSections);
    }
  }, [fieldSections]);

  return (
    <>
      <div className={styles._header_wrapper}>
        <IconButton name="arrowLeft" onClick={handleBack}>
          <Text size="s" color="bloobirds" uppercase>
            Back
          </Text>
        </IconButton>
        <IconButton name="cross" size={24} color="peanut" onClick={closeFiltersModal} />
      </div>
      <div className={styles._search_input}>
        <SearchInput
          width="100%"
          onChange={value => {
            const filteredSections = fieldSections?.sections?.map(section => ({
              ...section,
              fields: section.fields.filter(field => {
                const fieldLabel = field.label.toLowerCase();
                const searchValue = value.toLowerCase();
                const validField = field.indexed && field.type !== 'Reference';

                const doesMatchSearch = fieldLabel.match(searchValue);
                const shouldShow = filterFieldsMethod
                  ? filterFieldsMethod(field) && validField
                  : validField;
                return doesMatchSearch && shouldShow && field.indexed;
              }),
            }));
            setSearchElements({ sections: filteredSections });
          }}
          placeholder="Find a filter"
          color="softBloobirds"
        />
      </div>
      <div className={styles._subtitle}>
        <Text htmlTag="h4" size="m">
          {entityTitle} fields
        </Text>
      </div>
      <div className={styles._field_sections_wrapper}>
        {searchElements && hasSearchElementsFields ? (
          searchElements?.sections?.map((fieldSection, i) => {
            const sectionFieldCount = fieldSection.fields.length;

            return (
              fieldSection.fields.length > 0 && (
                <Collapsible
                  title={
                    <Text size="regular" color="bloobirds" align="center">
                      {`${fieldSection.title} [${sectionFieldCount}]`}
                    </Text>
                  }
                  expanded={i === 0}
                  key={`collapsible-${fieldSection.title}`}
                  dataTest={fieldSection.title}
                >
                  <ul className={styles._list}>
                    {fieldSection.fields.map(field => {
                      const value = selectedFilters && selectedFilters[field?.name];
                      return (
                        <li key={field.name} className={styles._list_item_input}>
                          <FieldItem
                            field={field}
                            picklistComponentType={picklistComponentType}
                            onChange={onChangeFilter}
                            value={value}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </Collapsible>
              )
            );
          })
        ) : (
          <div className={styles._list_item_empty}>
            <SearchFilters className={styles._list_item_empty_icon} />
            <div className={styles._list_item_empty_text}>
              <Text color="softPeanut" size="s">
                No filters found
              </Text>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StepFields;
