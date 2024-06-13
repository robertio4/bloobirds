import React, { useState } from 'react';

import { ColorType, Dropdown, IconButton, IconType, useVisible } from '@bloobirds-it/flamingo-ui';

import styles from './iconPicker.module.css';

export interface PickableIcon {
  name: IconType;
  color?: ColorType;
}

export interface IconPickerProps {
  selectedIcon: PickableIcon;
  pickableIcons: PickableIcon[];
  onSelectIcon: (icon: PickableIcon) => void;
  hasError: boolean;
  borderless?: boolean;
  disabled?: boolean;
}

export const IconPicker = ({
  selectedIcon: icon,
  pickableIcons,
  onSelectIcon,
  hasError,
  borderless = false,
  disabled = false,
}: IconPickerProps) => {
  const [selectedIcon, setSelectedIcon] = useState<PickableIcon>(icon);
  const { ref, visible, setVisible } = useVisible(false);

  const handleSelected = (iconPick: PickableIcon) => {
    setSelectedIcon(iconPick);
    if (onSelectIcon) {
      onSelectIcon(iconPick);
    }
    setVisible(false);
  };

  return (
    <Dropdown
      ref={ref}
      visible={visible}
      anchor={
        <div
          className={
            disabled ? null : borderless ? styles.iconPickerButtonHover : styles.iconPickerButton
          }
          style={hasError ? { border: '1px solid var(--tomato)' } : undefined}
        >
          <IconButton
            disabled={disabled}
            name={selectedIcon?.name ?? 'questionCircle'}
            color={selectedIcon?.color ?? 'bloobirds'}
            onClick={() => setVisible(true)}
            size={24}
          />
        </div>
      }
    >
      <div className={styles.iconPicker}>
        {pickableIcons.map(pic => (
          <IconButton
            name={pic.name}
            color={pic.color}
            key={pic.name}
            onClick={() => {
              handleSelected({ ...pic });
            }}
          />
        ))}
      </div>
    </Dropdown>
  );
};
