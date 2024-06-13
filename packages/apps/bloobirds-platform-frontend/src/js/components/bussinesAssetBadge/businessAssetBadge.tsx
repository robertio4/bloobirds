import React, { FC } from 'react';
import { CircularBadge, Skeleton, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useEntity } from '../../hooks/entities/useEntity';
import styles from './businessAssetBadge.module.css';
import { generateShortName, toTitleCase } from '../../utils/strings.utils';

type BadgeSize = 'xs' | 's' | 'm' | 'l' | 'xl';

interface BusinessAssetBadgeProps {
  entityId: string;
  entityType: string;
  size?: BadgeSize;
  color?: 'peanut' | 'purple';
  counter?: string;
}

type EntityType = {
  name: string;
  color: string;
  shortname: string;
};

const SKELETON_SIZE = {
  xs: 16,
  s: 21,
  m: 24,
  l: 40,
  xl: 48,
};

const BusinessAssetBadge: FC<BusinessAssetBadgeProps> = ({
  entityId,
  entityType,
  size,
  color,
  counter,
}) => {
  const entities = useEntity(entityType);
  const entity: EntityType = entities ? entities.get(entityId) : undefined;
  const isSizeNumber = size && !isNaN(size);

  if (!entityId) {
    return (
      <CircularBadge
        size={!isSizeNumber ? size : undefined}
        style={{
          backgroundColor: `var(--soft${toTitleCase(color)})`,
          color: 'var(--white)',
          fontSize: '20px',
        }}
      >
        ?
      </CircularBadge>
    );
  }

  return (
    <>
      {entity?.name ? (
        <Tooltip title={entity?.name} position="top">
          <div className={styles._container}>
            <CircularBadge
              size={!isSizeNumber ? size : undefined}
              style={{
                backgroundColor: entity?.color || 'var(--softPeanut)',
                color: 'var(--white)',
                borderColor: 'var(--white)',
                ...(isSizeNumber
                  ? {
                      width: isSizeNumber && size,
                      height: isSizeNumber && size,
                      fontSize: isSizeNumber && size && `${size / 2} px`,
                    }
                  : {}),
              }}
            >
              {entity?.shortname || generateShortName(entity?.name)}
            </CircularBadge>
            {counter && (
              <div className={styles._counter}>
                <CircularBadge
                  style={{
                    backgroundColor: 'var(--white)',
                    color: 'var(--bloobirds)',
                    borderColor: 'var(--white)',
                    width: '18px',
                    height: '18px',
                    fontSize: '12px',
                  }}
                >
                  {counter}
                </CircularBadge>
              </div>
            )}
          </div>
        </Tooltip>
      ) : (
        <Skeleton variant="circle" height={SKELETON_SIZE[size!]} width={SKELETON_SIZE[size!]} />
      )}
    </>
  );
};

BusinessAssetBadge.defaultProps = {
  size: 'xl',
  color: 'peanut',
};

export default BusinessAssetBadge;
