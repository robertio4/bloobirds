import React, { useMemo, useState } from 'react';

import { Icon } from '@bloobirds-it/flamingo-ui';
import { capitalize } from 'lodash';

import styles from './DataScope.module.css';

const ArrowButton = ({ onClick, disabled, direction }) => (
  <button type="button" className={styles.button} onClick={onClick} disabled={disabled}>
    <Icon
      size={16}
      name={`chevron${capitalize(direction)}`}
      color={disabled ? 'verySoftPeanut' : 'peanut'}
    />
  </button>
);

export const DataScope = ({ children, data, max = 10, sliceSize = 1 }) => {
  const [currentCursor, setCurrentCursor] = useState(0);

  const visibleData = useMemo(() => data.slice(currentCursor, currentCursor + max), [
    data,
    currentCursor,
  ]);

  const isFirst = currentCursor === 0;
  const isLast = currentCursor + max >= data.length;

  if (data.length <= max) {
    return children({ visibleData: data, isScoped: false });
  }

  const offset = isLast ? data.length - visibleData.length : 0;

  return (
    <>
      <div className={styles.content}>{children({ visibleData, isScoped: true, offset })}</div>
      <div className={styles.footer}>
        <ArrowButton
          direction="down"
          onClick={() => setCurrentCursor(currentCursor + sliceSize)}
          disabled={isLast}
        />
        <ArrowButton
          direction="up"
          onClick={() => setCurrentCursor(currentCursor - sliceSize)}
          disabled={isFirst}
        />
      </div>
    </>
  );
};
