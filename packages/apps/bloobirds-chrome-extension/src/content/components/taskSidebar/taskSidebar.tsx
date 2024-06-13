import React from 'react';

import { ColorType, Icon, IconType, Tooltip } from '@bloobirds-it/flamingo-ui';

import styles from './taskSidebar.module.css';

type Props = {
  icon: IconType;
  isHighlighted?: boolean;
  counter?: number;
  colors?: {
    basic?: ColorType;
    bgUnselected?: ColorType;
    contrast?: ColorType;
    iconColor?: ColorType;
    isDark?: boolean;
    opacity?: number;
  };
  onClick?: () => void;
  name: string;
  children?: React.ReactNode;
};

export const TaskTab = ({
  children,
  icon,
  counter,
  colors = { bgUnselected: 'verySoftBloobirds', iconColor: 'peanut', opacity: 1 },
  onClick,
  name,
  isHighlighted,
}: Props) => {
  const colorsToUse = { bgUnselected: 'verySoftBloobirds', iconColor: 'peanut', ...colors };
  return (
    <Tooltip title={children as string} position="right">
      <div
        className={styles.taskContainer}
        style={
          isHighlighted
            ? { backgroundColor: `var(--${colorsToUse.basic})`, opacity: colorsToUse?.opacity }
            : {
                backgroundColor: `var(--${colorsToUse.bgUnselected})`,
                opacity: colorsToUse?.opacity,
              }
        }
        onClick={onClick}
        //ref={ref}
        data-test={`Button-Task-${name}`}
      >
        <Icon size={24} name={icon} color={colorsToUse.iconColor} />
        {counter > 0 && <div className={styles.taskCounter}>{counter < 100 ? counter : '99+'}</div>}
      </div>
    </Tooltip>
  );
};

const TaskSidebar = ({ children }) => <div className={styles.container}>{children}</div>;

export default TaskSidebar;
