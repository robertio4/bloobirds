import React, { useEffect } from 'react';
import { Card, ColorType, useDelayedHover } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';
import styles from './subhomeCard.module.css';

const VARIANT_STYLES = {
  error: {
    backgroundColor: '#fcdfe4',
    borderColor: 'verySoftTomato',
  },
  warning: {
    backgroundColor: '#fdeade',
    borderColor: 'verySoftBanana',
  },
  info: {
    backgroundColor: 'lighterGray',
    borderColor: 'veryLightBloobirds',
  },
};

export enum CardVariant {
  info,
  warning,
  error,
}

interface SubhomeCardProps {
  dataTest?: string;
  children: React.ReactNode;
  hasNextCard?: boolean;
  isCompleted?: boolean;
  onContextMenu?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  cardRef?: React.RefObject<HTMLDivElement>;
  variant?: keyof typeof CardVariant;
  onHover?: (hover: boolean) => void;
}

const SubhomeCard = ({
  dataTest,
  children,
  hasNextCard = false,
  isCompleted = false,
  onContextMenu,
  onClick,
  cardRef,
  variant,
  onHover,
}: SubhomeCardProps) => {
  const variantStyles = variant
    ? VARIANT_STYLES[variant]
    : { backgroundColor: undefined, borderColor: undefined };
  const [isHovering, hoverProps] = useDelayedHover();

  useEffect(() => {
    if (onHover) {
      onHover(isHovering);
    }
  }, [isHovering]);

  return (
    <div
      data-test={`Card-Subhome-${dataTest}`}
      className={clsx(styles._container, styles[variant])}
      onContextMenu={onContextMenu}
      ref={cardRef}
      {...hoverProps}
    >
      <Card
        expand
        completed={isCompleted}
        onClick={onClick}
        backgroundColor={variantStyles?.backgroundColor as ColorType}
        borderColor={variantStyles?.borderColor as ColorType}
      >
        {children}
      </Card>
      {hasNextCard && <div className={styles._dashed_line} />}
    </div>
  );
};

export default SubhomeCard;
