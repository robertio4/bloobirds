import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { defaultRangeExtractor, useVirtual } from 'react-virtual';

import { usePausePeriods } from '@bloobirds-it/hooks';

import { CadenceTableContext, CadenceTableImmutableContext } from '../../CadenceTable';
import {
  CadenceBobject,
  CadenceResponse,
  cadenceResponseDefault,
  TIME_WINDOW,
} from '../../cadenceTable.type';
import styles from '../timeTable.module.css';
import { getCenterFromFirstDate, getDateIndex, getDateList } from './centerContent.utils';
import { Column } from './column/Column';

const NUM_OF_RENDERED_COLUMNS = 7;

export const CenterContent = ({
  response,
  bobject,
}: {
  response?: CadenceResponse;
  bobject: CadenceBobject;
}) => {
  const { setIsFullFunctional } = useContext(CadenceTableImmutableContext);
  const [columnSize, setColumnSize] = useState<number>();
  const [firstScroll, setFirstScroll] = useState<boolean>(false);
  const parentRef = useRef();
  const [mouseDown, setMouseDown] = useState(false);

  // @ts-ignore
  if (parentRef && parentRef.current && parentRef.current.clientWidth && !columnSize) {
    setColumnSize(columnSize =>
      columnSize
        ? columnSize
        : // @ts-ignore
          Math.floor(parentRef.current.clientWidth / NUM_OF_RENDERED_COLUMNS) + 1,
    );
  }

  const setFullContent = () => {
    if (firstScroll) {
      setIsFullFunctional(isFunctional => (isFunctional ? isFunctional : true));
    } else {
      setFirstScroll(true);
    }
  };

  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    // @ts-ignore
    if (parentRef && parentRef.current) {
      setMouseDown(true);
      // @ts-ignore
      parentRef.current.startX = e.pageX - parentRef.current.offsetLeft;
      // @ts-ignore
      parentRef.current.currentScrollLeft = parentRef.current.scrollLeft;
    }
  };

  const dragging = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (parentRef && parentRef.current) {
      if (!mouseDown) {
        return;
      }
      // @ts-ignore
      const x = e.pageX - parentRef.current.offsetLeft;
      // @ts-ignore
      const scroll = x - parentRef.current.startX;
      // @ts-ignore
      parentRef.current.scrollLeft = parentRef.current.currentScrollLeft - scroll;
    }
  };

  const stopDragging = () => {
    if (parentRef && parentRef.current) {
      setMouseDown(false);
    }
  };

  const { periods } = usePausePeriods({ userId: bobject.assignedTo });
  const pausedCadenceDays = periods?.uniqueDates;

  return (
    <div
      className={styles.center_container}
      ref={parentRef}
      onScroll={setFullContent}
      onMouseDown={startDragging}
      onMouseLeave={stopDragging}
      onMouseUp={stopDragging}
      onMouseMove={dragging}
    >
      {columnSize && ( // Columns is a different component because we need to wait for the div to render to get its width and pass it to the virtualizer
        <Columns
          response={response}
          pausedCadenceDays={pausedCadenceDays}
          parentRef={parentRef}
          columnSize={columnSize}
        ></Columns>
      )}
    </div>
  );
};

interface ColumnsProps {
  response?: CadenceResponse;
  pausedCadenceDays: any;
  parentRef: React.RefObject<HTMLDivElement>;
  columnSize?: number;
}

const Columns = (props: ColumnsProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { response, pausedCadenceDays, parentRef, columnSize } = props;
  const { tasks, firstTaskDate, firstActivityDate, lastTaskDate, lastActivityDate } =
    response ?? cadenceResponseDefault;
  const { timeWindow, scrollTo } = useContext(CadenceTableContext);
  const { setTimeWindow, setScrollTo, isLeftPageDisabled, isRightPageDisabled } = useContext(
    CadenceTableImmutableContext,
  );
  const [currentDate, setCurrentDate] = useState<string>();
  const [dateList, setDateList] = useState<string[]>();

  const rangeRef = useRef(null);

  //const scrollAlign = timeWindow === TIME_WINDOW.DAILY ? 'start' : 'center';

  // TODO: To change to v3 when it's released
  const columnVirtualizer = useVirtual({
    horizontal: true,
    size: dateList?.length || 0,
    parentRef,
    estimateSize: useCallback(
      () => 110, //(columnSize > 80 ? (columnSize < 110 ? columnSize : 110) : 80),
      [],
    ),
    rangeExtractor: useCallback(range => {
      rangeRef.current = range;
      return defaultRangeExtractor(range);
    }, []),
    overscan: 2,
  });

  useEffect(() => {
    setDateList(getDateList(timeWindow));
  }, [timeWindow, currentDate]);

  useEffect(() => {
    scrollToDate(currentDate);
  }, [dateList]);

  const setTimeWindowWithDate = (timeWindow: TIME_WINDOW, date: string) => {
    if (timeWindow === TIME_WINDOW.WEEKLY) {
      setCurrentDate(getCenterFromFirstDate(date));
    } else {
      setCurrentDate(date);
    }
    setTimeWindow(timeWindow);
  };

  const scrollToDate = (date?: string) => {
    if (dateList) {
      const dateToScrollTo = getDateIndex(timeWindow, date ? new Date(date) : new Date());
      const dateIndex = dateList.findIndex(item => item === dateToScrollTo);
      if (dateIndex !== -1) {
        columnVirtualizer.scrollToIndex(dateIndex, { align: 'center' });
      }
    }
  };

  useEffect(() => {
    switch (scrollTo) {
      case 'today':
        scrollToDate();
        break;
      case 'pageBack': {
        const { start } = rangeRef.current;
        const isFirstPage = start - 2 <= 0;
        scrollToDate(dateList[isFirstPage ? 0 : start - 2]);
        if (isRightPageDisabled.current === true) {
          isRightPageDisabled.current = false;
        }
        if (isLeftPageDisabled.current === false) {
          isLeftPageDisabled.current = isFirstPage;
        }
        break;
      }
      case 'pageForward': {
        const { end } = rangeRef.current;
        const isLastPage = end + 1 > dateList?.length - 1;
        scrollToDate(dateList[isLastPage ? dateList?.length - 1 : end + 1]);
        if (isLeftPageDisabled.current === true) {
          isLeftPageDisabled.current = false;
        }
        if (isRightPageDisabled.current === false) {
          isRightPageDisabled.current = isLastPage;
        }
        break;
      }
      case 'firstTask': {
        scrollToDate(firstTaskDate);
        break;
      }
      case 'lastTask': {
        scrollToDate(lastTaskDate);
        break;
      }
      case 'firstActivity': {
        scrollToDate(firstActivityDate);
        break;
      }
      case 'lastActivity': {
        scrollToDate(lastActivityDate);
        break;
      }
    }
    if (scrollTo) {
      setScrollTo('');
    }
  }, [scrollTo]);

  return (
    <div style={{ width: `${columnVirtualizer.totalSize}px`, position: 'relative' }}>
      {columnVirtualizer.virtualItems.map(virtualColumn => {
        const date = dateList[virtualColumn.index];
        return (
          <Column
            key={virtualColumn.index}
            dayTasks={tasks && tasks[date]}
            timeWindow={timeWindow}
            virtualColumn={virtualColumn}
            date={date}
            setTimeWindowWithDate={setTimeWindowWithDate}
            isPausedDay={pausedCadenceDays?.has(date)}
          />
        );
      })}
    </div>
  );
};
