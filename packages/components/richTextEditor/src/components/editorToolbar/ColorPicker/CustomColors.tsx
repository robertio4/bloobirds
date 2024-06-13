import React, { ReactNode } from 'react';

import { ColorType } from './ColorType';
import { Colors } from './Colors';

type CustomColorsProps = {
  color?: string;
  customColors: ColorType[];
  selectedIcon: ReactNode;
  updateColor: (color: string) => void;
};

export const CustomColors = ({
  color,
  customColors,
  selectedIcon,
  updateColor,
}: CustomColorsProps) => {
  return (
    <Colors
      prefix="custom"
      color={color}
      colors={customColors}
      selectedIcon={selectedIcon}
      updateColor={updateColor}
    />
  );
};
