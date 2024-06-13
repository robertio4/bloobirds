import React, { useEffect, useState } from 'react';
import { Button, Portal } from '@bloobirds-it/flamingo-ui';
import { isPlainObject } from 'lodash';
import clsx from 'clsx';
import { useFiltersModal, useFiltersModalFilters } from '../../hooks/useFiltersModal';
import { useEntity } from '../../hooks';
import {
  NON_VALUE_SEARCH_MODES,
  RANGE_SEARCH_MODES,
  TEXT_PICKLIST_SEARCH_MODES,
} from '../../constants/filtersModal';
import { changeLogicRolesToIds, clearTypeKeysFromFilters } from '../../utils/bobjects.utils';
import StepCategories from './stepCategories/stepCategories';
import StepFields from './stepFields/stepFields';
import styles from './filtersModal.module.css';
import { rangeToQuery } from '../../utils/filtersModal.utils';
import { FiltersSettings } from './filtersSettings/filtersSettings';

const STEPS = {
  CATEGORIES: 'categories',
  FIELDS: 'fields',
};

const FiltersModal = ({ config = null, handleSave, values = null, bobjectTypes = null }) => {
  const [step, setStep] = useState(STEPS.CATEGORIES);
  const { filters, setFilters } = useFiltersModalFilters();
  const [selectedFilters, setSelectedFilters] = useState(filters);
  const {
    isOpen,
    closeFiltersModal,
    setBobjectTypes,
    resetBobjectTypes,
    displaySettings,
    closeSettings,
  } = useFiltersModal();
  const bobjectFields = useEntity('bobjectFields');
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');

  const setElements = (field, value) => {
    const elementsToSet = { ...selectedFilters, [field.name]: value };
    if (!value || value?.length === 0) {
      delete elementsToSet[field.name];
    }
    setSelectedFilters(elementsToSet);
  };

  const onChange = (field, value) => {
    if (value || value?.length > 0) {
      if (!NON_VALUE_SEARCH_MODES.includes(value.type)) {
        value?.type && value?.value ? setElements(field, value) : setElements(field, undefined);
      } else {
        setElements(field, value);
      }
    }
  };

  const saveFilters = () => {
    const parsedFilters = {};
    Object.keys(selectedFilters).forEach(filterId => {
      const filterValue = selectedFilters[filterId];
      if (isPlainObject(filterValue) && RANGE_SEARCH_MODES.includes(filterValue?.type)) {
        parsedFilters[filterId] = rangeToQuery(filterValue);
      } else if (isPlainObject(filterValue) && NON_VALUE_SEARCH_MODES.includes(filterValue?.type)) {
        parsedFilters[filterId] = filterValue?.type;
      } else if (
        isPlainObject(filterValue) &&
        TEXT_PICKLIST_SEARCH_MODES.includes(filterValue?.type)
      ) {
        parsedFilters[filterId] = [
          {
            query: filterValue?.value,
            searchMode: filterValue?.type,
          },
        ];
      } else {
        parsedFilters[filterId] = isPlainObject(filterValue) ? filterValue.value : filterValue;
      }
    });
    handleSave(parsedFilters);
    closeFiltersModal();
  };

  useEffect(() => {
    if (values) {
      const clearFilters = clearTypeKeysFromFilters(values);
      const parsedValues = changeLogicRolesToIds({
        query: clearFilters,
        bobjectFields,
        bobjectPicklistFieldValues,
      });
      const filtersToSet = filters ? { ...parsedValues, ...filters } : parsedValues; // TODO: to fix bug, start here
      setFilters(filtersToSet);
    }
  }, [values]);

  useEffect(() => {
    if (bobjectTypes) {
      setBobjectTypes(bobjectTypes);
    }
  }, [bobjectTypes]);

  useEffect(() => {
    if (filters) {
      setSelectedFilters(filters);
    }
  }, [filters]);

  useEffect(
    () => () => {
      resetBobjectTypes();
    },
    [],
  );

  return (
    isOpen && (
      <Portal>
        <div className={styles._overlay} />
        <div
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={styles._container}
        >
          {!displaySettings && (
            <>
              <div
                className={clsx({
                  [styles._categories_content]: step === STEPS.CATEGORIES,
                  [styles._fields_content]: step !== STEPS.CATEGORIES,
                })}
              >
                {step === STEPS.CATEGORIES ? (
                  <StepCategories
                    handleNext={() => setStep(STEPS.FIELDS)}
                    showRelationships={config?.showRelationships}
                  />
                ) : (
                  <StepFields
                    selectedFilters={selectedFilters}
                    handleBack={() => setStep(STEPS.CATEGORIES)}
                    filterFieldsMethod={config?.filterFieldsMethod}
                    picklistComponentType={config?.picklistComponentType}
                    onChangeFilter={(field, value) => onChange(field, value)}
                  />
                )}
              </div>
              <div className={styles._footer}>
                <div
                  className={clsx(styles._button_wrapper, {
                    [styles._single_button]: step === STEPS.FIELDS,
                  })}
                >
                  {step === STEPS.CATEGORIES && (
                    <Button uppercase variant="secondary" onClick={closeFiltersModal} expand>
                      Cancel
                    </Button>
                  )}
                  <Button
                    uppercase
                    expand={step === STEPS.CATEGORIES}
                    onClick={() => {
                      if (step === STEPS.CATEGORIES) {
                        saveFilters();
                      } else {
                        setFilters({ ...filters, ...selectedFilters });
                        setStep(STEPS.CATEGORIES);
                      }
                    }}
                  >
                    {step === STEPS.CATEGORIES ? 'Confirm' : 'Accept'}
                  </Button>
                </div>
              </div>
            </>
          )}
          {displaySettings && (
            <FiltersSettings onBack={closeSettings} onClose={closeFiltersModal} />
          )}
        </div>
      </Portal>
    )
  );
};

export default FiltersModal;
