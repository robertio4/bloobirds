import React, { Fragment, useEffect, useRef, useState } from 'react';
import Draggable, { DraggableEvent } from 'react-draggable';

import {
  Button,
  CheckItem,
  IconButton,
  Item,
  MultiSelect,
  Portal,
  Select,
  Spinner,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useIsNoStatusPlanAccount, useIsOTOAccount } from '@bloobirds-it/hooks';
import { TASK_FIELDS_LOGIC_ROLE, TASK_STATUS_VALUE_LOGIC_ROLE } from '@bloobirds-it/types';
import { formatDate } from '@bloobirds-it/utils';
import clsx from 'clsx';
import { isPast, isToday } from 'date-fns';
import { sortBy } from 'lodash';

import { SearchData } from '../../../assets/svg';
import { useActiveUser, useTaskNavigationStorage } from '../../hooks';
import useCalendar from '../../hooks/useCalendar';
import { useFullSalesEnabled } from '../../hooks/useFeatureFlags';
import { useIsAccountAdmin } from '../../hooks/usePermissions';
import { useGlobalPicklistValues } from '../../hooks/usePicklistValues';
import { useAppCalendarVisibility, useUserPausePeriods } from '../../hooks/useUserTasks';
import { FilterDropdown } from '../../pages/homePage/components/filterDropdown/filterDropdown';
import VirtualizedList from '../../pages/homePage/components/virtualizedList/virtualizedList';
import { getTimeMarkerPosition, Stages } from '../../pages/homePage/pages/leftContent/utils/utils';
import { UserHomeConfig } from '../../pages/homePage/typings/home';
import { UserObject } from '../../typings/user';
import { getFieldByLogicRole } from '../../utils/bobjects.utils';
import Calendar from '../calendar/calendar';
import styles from './appCalendar.module.css';
import TaskCard from './taskCard';
import { parseCalendarData } from './utils';

const DateGroupHeader = ({ text }: { text: string }) => (
  <header>
    <Text weight="medium" size="xs" inline>
      {text}
    </Text>
  </header>
);

const AppCalendarView = ({
  tasks,
  overdueTasks,
  isLoading,
  userFilter,
  stage,
  importantSelected,
  showOverdue,
  selectedDay,
  updateStage,
  updateFilters,
  setUserFilter,
  setDateFilter,
  setSelectedDay,
  setImportantSelected,
  calendarData,
}: {
  tasks: any;
  overdueTasks: any;
  isLoading: boolean;
  userFilter: string;
  stage: string;
  filters: any;
  showOverdue: boolean;
  selectedDay: Date;
  importantSelected: boolean;
  setUserFilter: (user: string) => void;
  updateStage?: (type: Stages) => void;
  updateFilters: (types: UserHomeConfig[]) => void;
  setDateFilter: (date: Date) => void;
  setSelectedDay: (day: Date) => void;
  setImportantSelected: (selected: boolean) => void;
  calendarData: any;
}) => {
  const { setSalesNavigation, startNavigation } = useTaskNavigationStorage();
  const { resetCalendar } = useCalendar();
  const [showCalendar, setShowCalendar] = useState(false);
  const [timeMarkerPosition, setTimeMarkerPosition] = useState<number>();
  const [isDragging, setIsDragging] = useState(false);
  const isAdminUser = useIsAccountAdmin();
  const activeUserId = useActiveUser()?.activeUser?.id;
  const { clientHeight: screenHeight } = document.body;
  const [height, setHeight] = useState(-(88 + 48));
  const { isOpen, closeCalendar, isExtended, setIsExtended } = useAppCalendarVisibility();

  const { periods } = useUserPausePeriods();

  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  })?.filter((user: UserObject) => user.enabled && user.id !== activeUserId);
  const [scrollMargin, setScrollMargin] = useState(0);
  const hasSalesEnabled = useFullSalesEnabled();

  const ref = useRef(null);
  const tasksListRef = useRef(null);
  const headerRef = useRef(null);

  const isOTOAccount = useIsOTOAccount();

  useEffect(() => {
    setSalesNavigation(stage === 'SALES');
  }, [stage]);

  useEffect(() => {
    setTimeMarkerPosition(getTimeMarkerPosition(tasks));
    const intervalId = setInterval(
      () => setTimeMarkerPosition(getTimeMarkerPosition(tasks)),
      60000,
    );

    return () => intervalId && clearInterval(intervalId);
  }, [tasks]);

  useEffect(() => {
    if (isExtended) {
      const offset = ref.current?.getBoundingClientRect().y;
      setHeight(screenHeight - offset);
    }
  }, [isExtended]);

  useEffect(() => {
    if (userFilter?.length === 0) setUserFilter(activeUserId);
  }, [userFilter]);

  useEffect(
    () => () => {
      resetCalendar();
    },
    [],
  );

  const handleStop = (event: DraggableEvent) => {
    const { screenY } = event as MouseEvent;
    const offset = screenY;

    if (isDragging) setIsDragging(false);
    if (!isExtended) {
      setHeight(screenHeight - offset);
    }
  };

  const handleDrag = () => {
    if (!isDragging) setIsDragging(true);
  };

  const isNoStatusAccount = useIsNoStatusPlanAccount();

  return (
    isOpen && (
      <Portal>
        <Draggable onStop={handleStop} onDrag={handleDrag} handle="#handle" bounds="parent">
          <div
            aria-labelledby="calendar-app-modal"
            aria-describedby="Modal to manage my tasks"
            className={clsx(styles._container, {
              [styles._extended]: isExtended,
              [styles._no_extended]: !isExtended,
            })}
            style={{ height: isExtended ? `${height}px` : '' }}
          >
            <div ref={ref} className={styles._content}>
              <div ref={headerRef}>
                <header className={styles._header}>
                  <div className={styles._buttons}>
                    {!isNoStatusAccount && hasSalesEnabled && (
                      <div className={styles._stage}>
                        <Select size="small" onChange={updateStage} value={stage}>
                          <Item value="ALL" key="home-left-stage-all">
                            All
                          </Item>
                          <Item value="PROSPECT" key="home-left-stage-prospecting">
                            Prospecting
                          </Item>
                          <Item value="SALES" key="home-left-stage-sales">
                            Sales
                          </Item>
                        </Select>
                      </div>
                    )}
                    <IconButton
                      size={20}
                      name={importantSelected ? 'flagFilled' : 'flag'}
                      color={importantSelected ? 'softTomato' : 'softPeanut'}
                      onClick={() => setImportantSelected(!importantSelected)}
                    />
                    <FilterDropdown
                      stage={stage}
                      updateFilters={updateFilters}
                      saveEnabled={false}
                      isInCalendar
                    />
                    <IconButton
                      name="calendar"
                      selected={showCalendar}
                      onClick={() => {
                        setShowCalendar(!showCalendar);
                      }}
                    />
                    <div className={styles._actions}>
                      <span
                        id="handle"
                        className={clsx(styles._handle_icon, { [styles._dragging]: isDragging })}
                      >
                        <IconButton name="dragAndDrop" />
                      </span>
                      <IconButton
                        name={isExtended ? 'chevronClose' : 'chevronOpen'}
                        onClick={() => setIsExtended(!isExtended)}
                      />
                      <IconButton name="cross" onClick={closeCalendar} />
                    </div>
                  </div>
                </header>
                {showCalendar && (
                  <div className={styles._calendar_wrapper}>
                    <Calendar
                      date={selectedDay}
                      onToday={() => {
                        setDateFilter(new Date());
                        setSelectedDay(new Date());
                      }}
                      onSelectedDay={date => {
                        setDateFilter(date);
                        setSelectedDay(new Date(date));
                      }}
                      onNextMonth={(month, year) => {
                        setDateFilter(new Date(year, month, 1));
                      }}
                      onPrevMonth={(month, year) => setDateFilter(new Date(year, month, 1))}
                      data={parseCalendarData(calendarData, showOverdue)}
                      markedDays={periods}
                    />
                  </div>
                )}
                <div className={styles._tasks_header}>
                  <Text size="m" color="softPeanut">
                    {formatDate(selectedDay, 'LLL do')}
                  </Text>
                  {!isOTOAccount && (isToday(selectedDay) || isPast(selectedDay)) && (
                    <Button
                      iconLeft="play"
                      dataTest="Calendar-Tasks-Start"
                      disabled={[...tasks, ...overdueTasks].length === 0}
                      size="small"
                      onClick={() => {
                        const tasksToUse = [...tasks, ...overdueTasks];
                        startNavigation(
                          tasksToUse.filter(task => {
                            const status = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.STATUS)
                              ?.valueLogicRole;

                            return (
                              status === TASK_STATUS_VALUE_LOGIC_ROLE.TODO ||
                              status === TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE
                            );
                          }),
                        );
                      }}
                    >
                      Start tasks ({[...tasks, ...overdueTasks]?.length})
                    </Button>
                  )}
                </div>
              </div>
              <div
                ref={tasksListRef}
                className={clsx(styles._tasks_list, {
                  [styles._tasks_list_calendar]: showCalendar,
                  [styles._no_extended]: !isExtended,
                })}
              >
                {isAdminUser && (
                  <div
                    className={clsx(styles.userSelect, { [styles.userSelectTasks]: !showOverdue })}
                  >
                    <MultiSelect
                      selectAllOption
                      size="small"
                      variant="filters"
                      className={styles.userSelect}
                      defaultValue={activeUserId}
                      value={userFilter}
                      onChange={setUserFilter}
                      dropdownProps={{ style: { maxHeight: '155px' } }}
                    >
                      {/* @ts-ignore */}
                      <CheckItem value={activeUserId}>Me</CheckItem>
                      {sortBy(users, 'value')?.map((user: { id: string; value: string }) => (
                        <CheckItem key={user.id} value={user.id}>
                          {user.value}
                        </CheckItem>
                      ))}
                    </MultiSelect>
                  </div>
                )}
                {isLoading && (
                  <div className={styles._isLoading}>
                    <Spinner name="loadingCircle" />
                  </div>
                )}
                {(tasks?.length > 0 || overdueTasks?.length > 0) && !isLoading && (
                  <>
                    {showOverdue && overdueTasks && (
                      <VirtualizedList
                        data={overdueTasks}
                        parentRef={tasksListRef}
                        setScrollMargin={setScrollMargin}
                        estimateSize={23}
                        headerHeight={33.5}
                      >
                        {(item, index) => (
                          <Fragment key={item?.id?.value}>
                            {index === 0 && (
                              <div className={styles.headerWrapper}>
                                <DateGroupHeader text="Overdue" />
                              </div>
                            )}
                            <TaskCard task={item} />
                          </Fragment>
                        )}
                      </VirtualizedList>
                    )}
                    {(scrollMargin > 0 || !overdueTasks || overdueTasks.length === 0) && tasks && (
                      <VirtualizedList
                        data={tasks}
                        parentRef={tasksListRef}
                        scrollMargin={scrollMargin}
                        estimateSize={23}
                        headerHeight={33.5}
                      >
                        {(item, index) => (
                          <Fragment key={item?.id?.value}>
                            {index === 0 && (
                              <div className={styles.headerWrapper}>
                                <DateGroupHeader text="Tasks for today" />
                              </div>
                            )}
                            <TaskCard task={item} />
                            {index === timeMarkerPosition && isToday(new Date(selectedDay)) && (
                              <div className={styles._time_marker}>
                                <span className={styles._time_marker_bullet} />
                                <span className={styles._time_marker_line} />
                              </div>
                            )}
                          </Fragment>
                        )}
                      </VirtualizedList>
                    )}
                  </>
                )}
                {!isLoading && tasks?.length === 0 && (!showOverdue || overdueTasks?.length === 0) && (
                  <>
                    <DateGroupHeader text="Tasks for today" />
                    <div className={styles._empty_list_container}>
                      <SearchData className={styles._empty_data__icon} />
                      <div className={styles._message_wrapper}>
                        <Text size="xs" align="center" color="softPeanut">
                          No tasks for today
                        </Text>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* <div style={{ height: '100%' }}>
              <App parentRef={tasksListRef}></App>
            </div> */}
        </Draggable>
      </Portal>
    )
  );
};

export default AppCalendarView;
