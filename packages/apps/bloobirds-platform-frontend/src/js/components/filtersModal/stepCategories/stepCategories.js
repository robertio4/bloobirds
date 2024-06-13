import React from 'react';
import { Button, IconButton, Text } from '@bloobirds-it/flamingo-ui';
import { NoFiltersSvg } from '../../../../assets/svg';
import {
  useFiltersModal,
  useFiltersModalFilters,
  useFiltersModalRealtionships,
} from '../../../hooks/useFiltersModal';
import styles from './stepCategories.module.css';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { useBobjectTypes } from '../../../hooks/useBobjectTypes';

const StepCategories = ({ handleNext, showRelationships = true }) => {
  const {
    bobjectTypes,
    closeFiltersModal,
    setSelectedBobjectType,
    openSettings,
  } = useFiltersModal();
  const { relationships } = useFiltersModalRealtionships();
  const { parsedFilters: filters, removeFilter } = useFiltersModalFilters();
  const hasFilters = filters.length;
  const bobjectTypesEntities = useBobjectTypes();

  return (
    <>
      <div className={styles._header_wrapper}>
        <Text htmlTag="h3">Filters</Text>
        <div className={styles._header_icons}>
          <IconButton name="settings" size={24} color="bloobirds" onClick={openSettings} />
          <IconButton name="cross" size={24} color="peanut" onClick={closeFiltersModal} />
        </div>
      </div>
      <div className={styles._description}>
        <Text size="s">Add filters to narrow down your data.</Text>
      </div>
      <div className={styles._subtitle}>
        <Text htmlTag="h4" size="m">
          Add filters from:
        </Text>
      </div>
      <ul className={styles._categories_list}>
        {bobjectTypes?.map(bobjectType => (
          <li className={styles._categories_list_item} key={`item-${bobjectType}`}>
            <Button
              dataTest={`category${bobjectType}`}
              onClick={() => {
                setSelectedBobjectType(bobjectType);
                handleNext();
              }}
              variant="alternative"
              iconLeft="add"
              textAlign="left"
              expand
            >
              {bobjectType}
            </Button>
          </li>
        ))}
        {showRelationships &&
          relationships.map(({ relationship, fromBobjectType }) => {
            if (fromBobjectType === BOBJECT_TYPES.LEAD && relationship?.label === 'Opportunity') {
              return null;
            } else {
              return (
                <li
                  className={styles._categories_list_item}
                  key={`relationship-${relationship.label}`}
                >
                  <Button
                    dataTest={`category${relationship.label}`}
                    onClick={() => {
                      setSelectedBobjectType(relationship.referencedBobjectType);
                      handleNext();
                    }}
                    variant="alternative"
                    iconLeft="add"
                    textAlign="left"
                    expand
                  >
                    {relationship.label} from {fromBobjectType}
                  </Button>
                </li>
              );
            }
          })}
      </ul>
      <div className={styles._subtitle}>
        <Text htmlTag="h4" size="m">
          Filters already added:
        </Text>
      </div>
      {hasFilters ? (
        <div className={styles._fields_list}>
          {filters.map(filter => {
            const { field, textValue } = filter || {};
            return (
              <div className={styles._fields_list_item} key={`field-${field?.id}`}>
                <div
                  className={styles._fields_list_close_button}
                  onClick={() => removeFilter(field?.id)}
                >
                  <IconButton name="cross" />
                </div>
                <div className={styles._fields_list_text}>
                  <Text size="s">
                    {`${field?.name} (${bobjectTypesEntities.get(field?.bobjectType)?.name})`}
                    {`: ${typeof textValue === 'string' ? textValue : ''}`}
                  </Text>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles._fields_list_empty}>
          <NoFiltersSvg className={styles._fields_list_empty_icon} />
          <div className={styles._fields_list_empty_text}>
            <Text color="softPeanut" size="s">
              No filters added
            </Text>
          </div>
        </div>
      )}
    </>
  );
};

export default StepCategories;
