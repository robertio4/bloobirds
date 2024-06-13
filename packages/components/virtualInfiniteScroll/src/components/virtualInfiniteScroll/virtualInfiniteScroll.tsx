import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Skeleton } from '@bloobirds-it/flamingo-ui';
import { recoverScrollOfBox, removeScrollOfBox } from '@bloobirds-it/utils';
import { useVirtualizer } from '@tanstack/react-virtual';

import Transition from '../transition/transition';

type VirtualInfiniteScrollProps = {
  rows: any[];
  totalRows: number;
  isFetchingData?: boolean;
  fetchNextPage?: () => void;
  children: (data: any, hasNext: boolean, isFirst: boolean, selected?: boolean) => any;
  hasNextItem?: (index: number) => boolean;
  parentRef: React.RefObject<HTMLDivElement>;
  footer?: (scrollToTop: () => void) => React.ReactNode;
  contentSkeleton?: () => React.ReactNode;
  loaderSkeleton?: () => React.ReactNode;
  estimateSize?: number;
  estimatedSkeletonHeight?: number;
  fixedHeight?: boolean;
  enabledArrowNavigation?: boolean;
  onNavigation?: (data: any, redirect: false) => void;
  enableSelectedBackground?: boolean;
  rowsLength?: number;
};

const VirtualInfiniteScroll = ({
  rows,
  totalRows,
  isFetchingData,
  fetchNextPage,
  children,
  hasNextItem,
  parentRef,
  footer,
  contentSkeleton,
  loaderSkeleton = () => (
    <Skeleton variant="rect" key={'skeletonItem'} width="100%" height="40px" />
  ),
  estimateSize = 40,
  estimatedSkeletonHeight = 40,
  fixedHeight = false,
  enabledArrowNavigation,
  onNavigation,
  enableSelectedBackground = false,
  rowsLength,
}: VirtualInfiniteScrollProps) => {
  const prevRows = useRef(rows?.length || 0);
  const [loading, setLoading] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  rowsLength = rowsLength ?? rows?.length;

  const hasNextPage = useMemo(() => {
    return !(rowsLength === totalRows);
  }, [rowsLength, totalRows]);
  const dataCount = hasNextPage ? rowsLength + 1 : rowsLength;

  const rowVirtualizer = useVirtualizer({
    count: dataCount,
    getScrollElement: () => parentRef?.current,
    estimateSize: () => estimateSize,
    overscan: 3,
  });

  function handleItemClick(index) {
    setSelectedItemIndex(index); // Actualiza el índice del elemento seleccionado
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp': {
        const targetIndex = Math.max(0, selectedItemIndex - 1);
        rowVirtualizer?.scrollToIndex(targetIndex ?? 0);
        setSelectedItemIndex(targetIndex);

        onNavigation?.(rows[targetIndex], false);
        break;
      }
      case 'ArrowDown': {
        // Determinar índice objetivo
        const virtualItems = rowVirtualizer.getVirtualItems();
        const currentIndex = virtualItems.findIndex(item => item.index === selectedItemIndex);
        const targetIndex =
          currentIndex < virtualItems.length - 1 ? virtualItems[currentIndex + 1].index : null;
        if (targetIndex !== null && targetIndex < dataCount) {
          rowVirtualizer.scrollToIndex((targetIndex ?? 0) + 1);
          setSelectedItemIndex(targetIndex);

          onNavigation?.(rows[targetIndex], false);
        }
        break;
      }
      default:
        break;
    }
  }

  useEffect(() => {
    if (enabledArrowNavigation && selectedItemIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      //removeScrollOfBox();
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      //recoverScrollOfBox();
    };
  }, [enabledArrowNavigation, selectedItemIndex]); // Asegúrate de volver a suscribir el evento cuando cambie el índice del elemento seleccionado

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();
    if (!lastItem) {
      return;
    }
    if (lastItem.index >= rows?.length - 1 && hasNextPage && !isFetchingData && !loading) {
      setLoading(true);
      fetchNextPage?.();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    rows?.length,
    isFetchingData,
    rowVirtualizer.getVirtualItems(),
    loading,
    totalRows,
  ]);

  useEffect(() => {
    if (rows?.length > prevRows?.current) {
      setLoading(false);
      prevRows.current = rows?.length;
    }
  }, [rows?.length]);

  const scrollHeight = parentRef?.current?.scrollHeight;
  if (contentSkeleton && (isFetchingData || scrollHeight === undefined || scrollHeight === 0)) {
    return (
      <Transition type="fade" visible={true}>
        {contentSkeleton()}
      </Transition>
    );
  }

  return (
    <div
      style={{
        height: rowVirtualizer.getTotalSize() + (loading ? estimatedSkeletonHeight || 100 : 0),
        width: '100%',
        position: 'relative',
      }}
      onMouseEnter={removeScrollOfBox}
      onMouseLeave={recoverScrollOfBox}
    >
      {rowVirtualizer.getVirtualItems().map(virtualItem => {
        const isLoaderRow = virtualItem.index > rows?.length - 1;
        const data = rows[virtualItem.index];
        const showNext =
          (hasNextItem && hasNextItem(virtualItem.index)) ?? !!rows[virtualItem.index + 1];

        return (
          <div
            key={virtualItem.key}
            data-index={virtualItem.index}
            ref={fixedHeight ? undefined : rowVirtualizer.measureElement}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: fixedHeight ? `${virtualItem.size}px` : undefined,
              transform: `translateY(${virtualItem.start}px)`,
              background:
                virtualItem.index === selectedItemIndex && enableSelectedBackground
                  ? 'var(--softGray)'
                  : 'transparent',
            }}
            onClick={() => handleItemClick(virtualItem.index)}
          >
            {isLoaderRow ? (
              hasNextPage ? (
                <div style={{ height: `${estimateSize}px` }}>
                  <Transition type="fade" visible={true}>
                    {loaderSkeleton()}
                  </Transition>
                </div>
              ) : (
                footer && (
                  <div style={{ height: `${estimateSize}px` }}>
                    {footer(() => rowVirtualizer.scrollToIndex(0))}
                  </div>
                )
              )
            ) : (
              children(
                data,
                showNext,
                virtualItem.index === 0,
                virtualItem.index === selectedItemIndex,
              )
            )}
          </div>
        );
      })}
    </div>
  );
};

export default VirtualInfiniteScroll;
