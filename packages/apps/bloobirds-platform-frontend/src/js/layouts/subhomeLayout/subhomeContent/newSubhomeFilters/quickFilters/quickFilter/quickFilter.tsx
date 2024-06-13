import React, { useState } from 'react';
import { Chip, Dropdown, IconButton, Item, useVisible } from '@bloobirds-it/flamingo-ui';
import styles from './quickFilter.module.css';
import WithTooltip from '../../../../../../components/withTooltip/withTooltip';
import { QuickFilter } from '../../../../../../typings/quickFilters';
import { BobjectField } from '../../../../../../typings/bobjects';

interface QuickFilterProps {
  quickFilter: QuickFilter;
  blackListedField?: BobjectField;
  isSelected: boolean;
  onApply: (quickFilter: QuickFilter, status: boolean) => void;
  onEditName: (quickFilter: QuickFilter) => void;
  onDelete: (quickFilter: QuickFilter) => void;
  onSetDefault: (quickFilterId: string) => void;
}

const CustomQuickFilter = ({
  onApply,
  onEditName,
  onDelete,
  onSetDefault,
  blackListedField,
  isSelected,
  quickFilter,
}: QuickFilterProps) => {
  const hasBlackListedField =
    blackListedField &&
    quickFilter?.filters?.some((filter: any) => filter?.bobjectFieldId === blackListedField?.id);

  const { ref, visible: isDropdownVisible, setVisible } = useVisible();
  const [showOptions, setShowOptions] = useState(false);

  const colorContextualMenuBackground = () => {
    if (showOptions) {
      return isSelected ? 'var(--bloobirds)' : 'var(--lightBloobirds)';
    }
    return 'var(--lightestBloobirds)';
  };
  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setShowOptions(!hasBlackListedField)}
      onMouseLeave={() => {
        setShowOptions(false);
        setVisible(false);
      }}
    >
      <WithTooltip
        title={`You cannot filter by ${blackListedField?.name} in this view`}
        isDisabled={!quickFilter.defaultGroup && hasBlackListedField}
      >
        <Chip
          size="small"
          selected={isSelected}
          disabled={!quickFilter?.defaultGroup && hasBlackListedField}
          onClick={status => {
            if (!hasBlackListedField) {
              onApply(quickFilter, status);
            }
          }}
        >
          {quickFilter?.name}
        </Chip>
      </WithTooltip>
      {showOptions && (
        <Dropdown
          ref={ref}
          visible={isDropdownVisible}
          position="bottom-end"
          arrow={false}
          anchor={
            <div
              className={styles.dropdownMenu}
              style={{ backgroundColor: colorContextualMenuBackground() }}
            >
              <IconButton
                size={16}
                onClick={() => setVisible(!isDropdownVisible)}
                color={isSelected ? 'white' : 'bloobirds'}
                name="moreOpenholes"
              />
            </div>
          }
        >
          <Item
            onClick={() => {
              setVisible(false);
              onEditName(quickFilter);
            }}
            icon="edit"
          >
            Edit name
          </Item>
          <Item
            onClick={async () => {
              setVisible(false);
              onSetDefault(quickFilter?.id);
            }}
            icon={quickFilter?.defaultGroup ? 'starChecked' : 'starUnchecked'}
          >
            {quickFilter?.defaultGroup ? 'Remove as default' : 'Set as default'}
          </Item>
          <Item
            onClick={() => {
              setVisible(false);
              onDelete(quickFilter);
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

export default CustomQuickFilter;
