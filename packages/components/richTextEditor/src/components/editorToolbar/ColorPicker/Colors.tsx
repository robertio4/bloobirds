import React, { ReactNode } from 'react';

import { ColorButton } from './ColorButton';
import styles from './ColorPicker.module.css';
import { ColorType } from './ColorType';

type ColorsProps = {
  prefix?: string;
  color?: string;
  colors: ColorType[];
  selectedIcon: ReactNode;
  updateColor: (color: string) => void;
};

export const Colors = ({ prefix, color, colors, selectedIcon, updateColor }: ColorsProps) => {
  return (
    <div className={styles.colors}>
      {colors.map(({ name, value, isBrightColor }) => (
        <ColorButton
          key={prefix + (name || value)}
          name={name}
          value={value}
          isBrightColor={isBrightColor}
          isSelected={color === value}
          selectedIcon={selectedIcon}
          updateColor={updateColor}
        />
      ))}
    </div>
  );
};
