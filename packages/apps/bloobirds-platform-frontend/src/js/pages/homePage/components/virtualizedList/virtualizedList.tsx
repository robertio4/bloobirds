import React, { useEffect } from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';

const VirtualizedList = ({
  data,
  parentRef,
  children,
  scrollMargin = 0,
  setScrollMargin,
  estimateSize = 41,
  headerHeight = 24,
}: {
  data: any;
  parentRef: any;
  children: (item: any, index: number) => React.ReactNode;
  scrollMargin?: number;
  setScrollMargin?: (value: number) => void;
  estimateSize?: number;
  headerHeight?: number;
}) => {
  const virtualizer = useVirtualizer({
    count: data?.length,
    estimateSize: () => estimateSize,
    getScrollElement: () => parentRef.current,
    overscan: 3,
    scrollMargin,
  });

  const items = virtualizer.getVirtualItems();

  useEffect(() => {
    if (setScrollMargin) {
      setScrollMargin(virtualizer.getTotalSize());
    }
  }, [virtualizer.getTotalSize()]);

  const totalSize = virtualizer.getTotalSize();

  return (
    <div
      style={{
        height: totalSize + headerHeight,
        width: '100%',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          transform: `translateY(${items[0]?.start - virtualizer.options.scrollMargin}px)`,
        }}
      >
        {items?.map(virtualRow => {
          const task = data[virtualRow.index];
          return children(task, virtualRow.index);
        })}
      </div>
    </div>
  );
};

export default VirtualizedList;
