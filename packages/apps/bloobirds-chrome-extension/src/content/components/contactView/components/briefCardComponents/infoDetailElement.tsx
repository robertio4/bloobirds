import { MouseEventHandler } from 'react';

import { ColorType, FontSizeType, Icon, IconType, Text, Tooltip } from '@bloobirds-it/flamingo-ui';

import styles from './briefCardComponents.module.css';

interface InfoDetailElementProps {
  icon: IconType;
  iconColor?: ColorType;
  iconSize?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
  text: string;
  textSize?: FontSizeType;
}

export const InfoDetailElement = ({
  icon,
  iconColor = 'bloobirds',
  iconSize = 16,
  onClick,
  text,
  textSize = 'xxs',
}: InfoDetailElementProps) => {
  return (
    <Tooltip title={text} position="top">
      <div className={styles.infoDetailContainer} onClick={onClick}>
        <Icon name={icon} size={iconSize} color={iconColor} />
        <Text size={textSize} color="peanut" className={styles.text}>
          {text}
        </Text>
      </div>
    </Tooltip>
  );
};
