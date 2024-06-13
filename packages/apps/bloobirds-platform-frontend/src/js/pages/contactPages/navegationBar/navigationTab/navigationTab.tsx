import React from 'react';
import classNames from 'clsx';
import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import { AddButton } from './addButton/addButton';
import styles from './navigationTab.module.css';

interface NavigationTabProps {
  dataTest?: string;
  disabled?: boolean;
  empty?: boolean;
  active: boolean;
  numberOfItems?: number;
  onAddButtonClick: () => void;
  onClick: () => void;
  showAddButton: boolean;
  showChevron?: boolean;
  showTooltip?: boolean;
  tab: string;
}

function getColor(isActive: boolean, disabled: boolean) {
  if (disabled) {
    return 'softPeanut';
  }
  return isActive ? 'bloobirds' : 'peanut';
}

export function NavigationTab({
  dataTest,
  disabled = false, // disabled status
  empty = true, // there are not elements
  active,
  numberOfItems = 0,
  onAddButtonClick,
  onClick,
  showAddButton,
  showChevron = numberOfItems > 0,
  showTooltip = false,
  tab,
}: NavigationTabProps) {
  const classes = classNames(styles.tab, {
    [styles.active]: active,
    [styles.disabled]: empty,
    [styles.relatedCompanies]: tab === 'Related Companies',
  });

  const textClasses = classNames(styles.text, {
    [styles.disabled]: empty,
  });

  const color = getColor(active, empty);
  const handleOnClick = () => {
    if (!disabled || !empty) {
      onClick();
    }
  };

  return (
    <div data-test={dataTest} onClick={handleOnClick} className={classes}>
      <div className={styles.tabName}>
        <Text color={color} size="s" className={textClasses}>
          {numberOfItems > 0 ? `${tab} (${numberOfItems})` : tab}
        </Text>
        {showChevron && <Icon name="chevronDown" color={color} size={12} />}
      </div>
      {showAddButton && (
        <AddButton showTooltip={showTooltip} onClick={onAddButtonClick} disabled={disabled} />
      )}
    </div>
  );
}
