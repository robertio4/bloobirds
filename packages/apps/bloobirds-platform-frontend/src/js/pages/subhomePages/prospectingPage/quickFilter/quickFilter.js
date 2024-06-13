import React, { useState } from 'react';
import {
  Chip,
  Dropdown,
  IconButton,
  Item,
  Tooltip,
  useToasts,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import styles from './quickFilter.module.css';
import { ellipsis } from '../../../../utils/strings.utils';
import { useQuickFilterModal } from '../../../../hooks/useQuickFilterModal';
import { useDeleteQuickFilterModal } from '../../../../hooks/useDeleteQuickFilter';

export const QuickFilter = ({
  quickFilter,
  setFilterGroup,
  setDefaultFilterGroup,
  resetAllFilters,
  blackListedField = null,
}) => {
  const { setEditName, setQuickFilter, openQuickFiltersModal } = useQuickFilterModal();
  const { openDeleteQuickFilter } = useDeleteQuickFilterModal();
  const { createToast } = useToasts();
  const hasBlackListedField =
    blackListedField &&
    quickFilter?.filters?.some(filter => filter?.bobjectFieldId === blackListedField?.id);

  const { ref, visible: isDropdownVisible, setVisible } = useVisible();
  const [showMenuButtons, setShowMenuButtons] = useState(false);

  const colorContextualMenuBackground = () => {
    if (quickFilter?.selected) {
      return 'var(--bloobirds)';
    }
    if (showMenuButtons) {
      return 'var(--lightBloobirds)';
    }
    return 'var(--lightestBloobirds)';
  };
  return (
    <div
      className={styles._quick_filter_wrapper}
      onMouseEnter={() => setShowMenuButtons(!hasBlackListedField)}
      onMouseLeave={() => setShowMenuButtons(false)}
    >
      <Tooltip
        title={
          !quickFilter?.selected &&
          hasBlackListedField &&
          `You cannot filter by ${blackListedField?.name} in this view`
        }
        position={!quickFilter?.selected && blackListedField && 'top'}
      >
        <Chip
          size="small"
          selected={quickFilter?.selected}
          disabled={!quickFilter?.selected && hasBlackListedField}
          onClick={status => {
            if (quickFilter?.selected || !hasBlackListedField) {
              setFilterGroup(quickFilter?.id);
              if (status) {
                setQuickFilter(quickFilter);
              } else {
                setQuickFilter({});
              }
            }
          }}
        >
          {ellipsis(quickFilter?.name, 40)}
          {(showMenuButtons || isDropdownVisible) && (
            <div
              className={styles._text_space}
              style={{ backgroundColor: colorContextualMenuBackground() }}
            />
          )}
        </Chip>
      </Tooltip>
      {(showMenuButtons || isDropdownVisible) && (
        <Dropdown
          ref={ref}
          visible={isDropdownVisible}
          position="bottom-end"
          arrow={false}
          anchor={
            <div
              className={styles.dropdown_menu}
              style={{ backgroundColor: colorContextualMenuBackground() }}
            >
              <IconButton
                size={16}
                onClick={() => setVisible(!isDropdownVisible)}
                color={quickFilter?.selected ? 'white' : 'bloobirds'}
                name="moreOpenholes"
              />
            </div>
          }
        >
          <Item
            onClick={() => {
              setQuickFilter(quickFilter);
              setEditName(true);
              resetAllFilters();
              openQuickFiltersModal();
              setVisible(false);
            }}
            icon="edit"
          >
            Edit name
          </Item>
          <Item
            onClick={async () => {
              await setDefaultFilterGroup(quickFilter.id);
              createToast({
                type: 'success',
                message: `Quick filter ${quickFilter?.name} is ${
                  quickFilter?.defaultGroup ? 'removed' : 'set'
                } by default`,
              });
              setVisible(false);
            }}
            icon={quickFilter?.defaultGroup ? 'starChecked' : 'starUnchecked'}
          >
            {quickFilter?.defaultGroup ? 'Remove as default' : 'Set as default'}
          </Item>
          <Item
            onClick={() => {
              openDeleteQuickFilter({ quickFilterToSet: quickFilter });
              resetAllFilters();
              setVisible(false);
            }}
            icon="trashFull"
          >
            Delete
          </Item>
        </Dropdown>
      )}
    </div>
  );
};
