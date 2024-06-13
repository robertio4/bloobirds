import React from 'react';

import { ColorType, Icon, IconType } from '@bloobirds-it/flamingo-ui';

import { ACTIVITY_DIRECTION } from '../../constants/activity';
import styles from './cardIcon.module.css';

interface CardProps {
  name: IconType;
  color: ColorType;
  direction?: typeof ACTIVITY_DIRECTION[keyof typeof ACTIVITY_DIRECTION];
}

const CardIcon = ({ name, color, direction }: CardProps) => {
  const iconDirection =
    direction === ACTIVITY_DIRECTION.INCOMING || direction === ACTIVITY_DIRECTION.MISSED
      ? 'arrowDownLeft'
      : 'arrowTopRight';
  return (
    <div className={styles._icon}>
      <Icon name={name} color={color} />
      {direction && (
        <div className={styles._icon_direction}>
          <Icon name={iconDirection} color={color} size={16} />
        </div>
      )}
    </div>
  );
};

export default CardIcon;
