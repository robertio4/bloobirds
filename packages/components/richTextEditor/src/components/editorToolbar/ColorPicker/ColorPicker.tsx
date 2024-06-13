import React, { ReactNode } from 'react';

import styles from './ColorPicker.module.css';
import { ColorType } from './ColorType';
import { Colors } from './Colors';
import { CustomColors } from './CustomColors';

type ColorPickerProps = {
  color?: string;
  colors: ColorType[];
  customColors: ColorType[];
  selectedIcon: ReactNode;
  updateColor: (color: string) => void;
  updateCustomColor: (color: string) => void;
  clearColor: () => void;
  open?: boolean;
};

const ColorPickerInternal = ({
  color,
  colors,
  customColors,
  selectedIcon,
  updateColor,
  updateCustomColor,
  clearColor,
}: ColorPickerProps) => {
  return (
    <div data-testid="ColorPicker" className={styles.colorPicker}>
      <CustomColors
        color={color}
        customColors={customColors}
        selectedIcon={selectedIcon}
        updateColor={updateColor}
      />
      <div className={styles.divider} />
      <Colors color={color} colors={colors} selectedIcon={selectedIcon} updateColor={updateColor} />
      <button
        data-testid="ColorPickerClear"
        onClick={clearColor}
        disabled={!color}
        className={styles.clearButton}
      >
        Clear
      </button>
    </div>
  );
};

export const ColorPicker = React.memo(
  ColorPickerInternal,
  (prev, next) =>
    prev.color === next.color &&
    prev.colors === next.colors &&
    prev.customColors === next.customColors &&
    prev.open === next.open,
);
