import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Button, Collapsible, IconButton, Text } from '@bloobirds-it/flamingo-ui';
import { isEmpty } from 'lodash';
import { SearchColumns, SearchFilters } from '../../../../../assets/svg';
import { isFiltersModal } from '../viewEdition.selector';
import { useViewEditionContext } from '../viewEdition.context';
import SearchBar from '../../../searchBar';
import styles from './stepFields.module.css';
import { getToggleElementCallback } from '../../context/bobjectTable.utils';
import { useBobjectFields } from '../../../../hooks/useBobjectFields';
import { BobjectField } from '../../../../typings/bobjects';
import { BobjectTypes } from '@bloobirds-it/types';
import debounce from 'lodash/debounce';
import { useFiltersSettings } from '../../../../hooks/useFiltersModal';

interface SearchElementsInterface {
  sections: any;
  text?: string;
}

const StepFields = React.memo(
  ({
    goToStep,
    bobjectType,
    fromBobjectType,
  }: {
    goToStep: any;
    bobjectType: BobjectTypes;
    fromBobjectType: BobjectTypes;
  }) => {
    const {
      elements,
      handleOnChangeElement,
      modalType,
      renderFieldsStepList,
      shouldShowField,
      viewEditionFromDashboards,
    } = useViewEditionContext();
    const handleSearch = useState();
    const [hiddenValues, setHiddenValues] = useState(false);
    const { showHiddenValuesReports } = useFiltersSettings();

    useEffect(() => {
      setHiddenValues(showHiddenValuesReports);
    }, [showHiddenValuesReports]);
    const fieldSections = useBobjectFields(bobjectType, hiddenValues);
    const indexedSections = fieldSections?.sections
      ? fieldSections?.sections?.map(
          ({ fields, ...rest }: { fields: BobjectField[]; rest: any }) => ({
            ...rest,
            fields: fields.filter(field =>
              shouldShowField ? shouldShowField(field) : field.indexed,
            ),
          }),
        )
      : [];
    const entityTitle =
      bobjectType && fromBobjectType ? `${bobjectType} from ${fromBobjectType}` : bobjectType;
    const [searchElements, setSearchElements] = useState<SearchElementsInterface>();
    const isFilters = isFiltersModal(modalType);
    const [selectedElements, setSelectedElements] = useState(elements);
    const searchElementsFields = searchElements?.sections?.filter(
      section => section.fields.length > 0,
    );
    const hasSearchElementsFields = searchElementsFields?.length > 0;

    useEffect(() => {
      if (fieldSections && !isEmpty(fieldSections)) {
        if (isFilters) {
          setSearchElements({
            sections: indexedSections,
          });
        } else {
          setSearchElements(fieldSections);
        }
      }
    }, [fieldSections]);

    const goBack = () => {
      goToStep('categories');
    };

    const handleAcceptElements = () => {
      handleOnChangeElement(selectedElements);
      goToStep('categories');
    };

    const toggleElement = getToggleElementCallback(selectedElements, setSelectedElements);

    const onChangeFilter = useCallback(
      (field, value) => {
        const elementsToSet = { ...selectedElements, [field.name]: value };
        if (!value || value.length === 0) {
          delete elementsToSet[field.name];
        }
        setSelectedElements(elementsToSet);
      },
      [selectedElements, setSelectedElements],
    );

    return (
      <Fragment>
        <div className={styles._content}>
          <div className={styles._back_button}>
            <IconButton name="arrowLeft" onClick={goBack}>
              <span className={styles._back_button_text}>Back</span>
            </IconButton>
          </div>
          <div className={styles._search_input}>
            <SearchBar
              handleChange={debounce(value => {
                const filteredSections = fieldSections?.sections?.map(section => ({
                  ...section,
                  fields: section.fields.filter(field => {
                    const fieldLabel = field.label.toLowerCase();
                    const searchValue = value.toLowerCase();

                    const doesMatchSearch = fieldLabel.match(searchValue);
                    const shouldShow = shouldShowField ? shouldShowField(field) : true;

                    return doesMatchSearch && shouldShow && field.indexed;
                  }),
                }));
                setSearchElements({ sections: filteredSections, text: value || null });
              }, 200)}
              placeholder={`Find a ${modalType}`}
            />
          </div>
          <div className={styles._subtitle}>
            <Text htmlTag="h4" size="m">
              {entityTitle} fields
            </Text>
          </div>
          <div className={styles._field_sections_wrapper}>
            {searchElements && hasSearchElementsFields ? (
              searchElements?.sections
                ?.filter(fieldSection => {
                  const sectionName = fieldSection?.title;
                  if (typeof sectionName !== 'string') {
                    return false;
                  }
                  return sectionName !== 'Opportunity leads';
                })
                ?.map((fieldSection, i) => {
                  const sectionFieldCount = fieldSection.fields.length;
                  return (
                    fieldSection.fields.length > 0 && (
                      <Collapsible
                        title={
                          <Text size="regular" color="bloobirds" align="center">
                            {`${fieldSection.title} [${sectionFieldCount}]`}
                          </Text>
                        }
                        expanded={
                          i === 0 ||
                          (searchElements?.text &&
                            searchElements?.text !== '' &&
                            sectionFieldCount > 0)
                        }
                        key={`collapsible-${fieldSection.title}-${
                          searchElements?.text &&
                          searchElements?.text !== '' &&
                          sectionFieldCount > 0
                        }`}
                        dataTest={fieldSection.title}
                      >
                        {renderFieldsStepList(
                          selectedElements,
                          fieldSection.fields,
                          modalType === 'filter' ? onChangeFilter : toggleElement,
                          styles,
                          viewEditionFromDashboards,
                          handleSearch,
                        )}
                      </Collapsible>
                    )
                  );
                })
            ) : (
              <div className={styles._list_item_empty}>
                {isFilters ? (
                  <SearchFilters className={styles._list_item_empty_icon} />
                ) : (
                  <SearchColumns className={styles._list_item_empty_icon} height={48} width={48} />
                )}
                <div className={styles._list_item_empty_text}>
                  <Text color="softPeanut" size="s">
                    {isFilters ? 'No filters found' : 'No columns found'}
                  </Text>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles._footer}>
          <div className={styles._button_wrapper}>
            <Button uppercase onClick={handleAcceptElements}>
              Accept
            </Button>
          </div>
        </div>
      </Fragment>
    );
  },
);

export default StepFields;
