import { ColorType, Icon, IconType } from '@bloobirds-it/flamingo-ui';
import { ACTIVITY_DIRECTION } from '@bloobirds-it/types';
import clsx from 'clsx';

import styles from './cardIcon.module.css';

interface CardProps {
  name: IconType;
  color: ColorType;
  direction?: ACTIVITY_DIRECTION;
  size?: 's' | 'xs' | 'xxs';
}

const CardIcon = ({ name, color, direction, size = 's' }: CardProps) => {
  const iconDirection = [ACTIVITY_DIRECTION.INCOMING, ACTIVITY_DIRECTION.MISSED].includes(direction)
    ? 'arrowDownLeft'
    : 'arrowTopRight';

  const sizes = {
    s: { size: 24, arrowSize: 16 },
    xs: { size: 16, arrowSize: 12 },
    xxs: { size: 16, arrowSize: 6 },
  };

  return (
    <div className={styles._icon}>
      <Icon name={name} color={color} size={sizes[size].size} />
      {direction && (
        <div
          className={clsx({
            [styles._icon_direction]: size === 's',
            [styles._icon_direction_xs]: size !== 's',
          })}
        >
          <Icon name={iconDirection} color={color} size={sizes[size].arrowSize} />
        </div>
      )}
    </div>
  );
};

export default CardIcon;
