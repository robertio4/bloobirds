import styles from '../../modules.module.css';
import { Button, IconButton, Item, Select, Text } from '@bloobirds-it/flamingo-ui';
import React, { useState } from 'react';
import { useWorkflow } from '../../../../../context/workflowsContext';

const ClearPropertySelect = ({
  index,
  value,
  onFieldUpdate,
  onFieldArrayExtension,
  onFieldDelete,
  availableFields,
  disableAddButton,
}) => {
  const {
    state: { isMissingInfo, isSubmitting, isLocked, isEnabled },
  } = useWorkflow();
  const [search, setSearch] = useState('');

  const getRenderValue = renderValue => {
    return `${renderValue?.bobjectType} - ${renderValue?.label}`;
  };

  return (
    <div className={styles._clear_properties_wraper}>
      <>
        <div className={styles._select_wrapper}>
          <div className={styles._select_container}>
            <Select
              placeholder="Property to clear"
              width="260px"
              borderless={false}
              disabled={isEnabled || isLocked}
              defaultValue=""
              autocomplete
              size="small"
              value={value}
              warning={
                isMissingInfo && isSubmitting && !value ? 'Missing required information' : ''
              }
              renderDisplayValue={displayValue => getRenderValue(displayValue)}
              onChange={selectValue => {
                onFieldUpdate(index, selectValue);
              }}
              onSearch={searchValue => setSearch(searchValue)}
            >
              {Object.keys(availableFields).map(bobjectType => {
                return availableFields[bobjectType]?.map(field => {
                  if (field.label.toLowerCase().includes(search.toLowerCase()))
                    return (
                      <Item
                        value={field?.name}
                        key={field?.name}
                        className={styles._conditions_selector_item}
                      >
                        {field?.label}
                        {' - '}
                        <Text htmlTag="span" size="xs" color="softPeanut">
                          {bobjectType}
                        </Text>
                      </Item>
                    );
                });
              })}
            </Select>
            {value && index !== 0 && (
              <IconButton
                name="cross"
                disabled={isLocked || isEnabled}
                color="purple"
                onClick={() => {
                  onFieldDelete(index);
                }}
              />
            )}
          </div>
        </div>
        {!disableAddButton && (
          <Button
            variant="clear"
            disabled={isLocked || isEnabled}
            color="purple"
            onClick={() => onFieldArrayExtension()}
          >
            + property
          </Button>
        )}
      </>
    </div>
  );
};

export default ClearPropertySelect;
