import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useVirtual } from 'react-virtual';

import { Skeleton } from '@bloobirds-it/flamingo-ui';

import SubhomeContentSkeleton from '../extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton';
import styles from './virtualInfiniteScroll.module.css';

type VirtualInfiniteScrollProps = {
  rows: any[];
  hasNextPage?: boolean;
  isFetchingData?: boolean;
  fetchNextPage?: () => void;
  children: (data: any, hasNext: boolean) => React.ReactNode;
  hasNextItem?: (index: number) => boolean;
  parentRef: React.RefObject<HTMLDivElement>;
  footer?: (scrollToTop: () => void) => React.ReactNode;
};

export const VirtualInfiniteScroll = ({
  rows,
  hasNextPage,
  isFetchingData,
  fetchNextPage,
  children,
  hasNextItem,
  parentRef,
  footer,
}: VirtualInfiniteScrollProps) => {
  const prevRows = useRef(rows?.length);
  const [loading, setLoading] = useState(false);

  //TODO When this bug is fixed migrate to useVirtualiluzer v3 (https://github.com/TanStack/virtual/pull/366)
  const rowVirtualizer = useVirtual({
    size: hasNextPage ? rows?.length + 1 : rows?.length,
    estimateSize: useCallback(() => 40, []),
    parentRef,
    overscan: 3,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.virtualItems].reverse();

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= rows?.length - 1 && hasNextPage && !isFetchingData && !loading) {
      setLoading(true);
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    rows?.length,
    isFetchingData,
    rowVirtualizer.virtualItems,
    loading,
  ]);

  useEffect(() => {
    if (rows?.length > prevRows?.current) {
      setLoading(false);
      prevRows.current = rows?.length;
    }
  }, [rows?.length]);

  if (isFetchingData) {
    return <SubhomeContentSkeleton visible />;
  }

  return (
    <div
      style={{
        height: `${rowVirtualizer.totalSize}px`,
        width: '100%',
        position: 'relative',
      }}
    >
      {rowVirtualizer.virtualItems.map(virtualItem => {
        const isLoaderRow = virtualItem.index > rows?.length - 1;
        const data = rows[virtualItem.index];
        const showNext =
          (hasNextItem && hasNextItem(virtualItem.index)) ?? !!rows[virtualItem.index + 1];
        return (
          <div
            key={virtualItem.index}
            ref={virtualItem.measureRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualItem.start}px)`,
            }}
            className={styles._row}
          >
            {isLoaderRow ? (
              hasNextPage ? (
                <div style={{ height: '40px' }}>
                  <Skeleton variant="rect" key={'skeletonlistsubhome'} width="100%" height="40px" />
                </div>
              ) : (
                footer && (
                  <div style={{ height: '40px' }}>
                    {footer(() => rowVirtualizer.scrollToIndex(0))}
                  </div>
                )
              )
            ) : (
              children(data, showNext)
            )}
          </div>
        );
      })}
    </div>
  );
};
