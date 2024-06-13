import React, { Fragment, useEffect, useMemo, useRef } from 'react';

import { Button, Checkbox, Icon, Label, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { useCustomTasks, useDataModel } from '@bloobirds-it/hooks';
import { TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import RescheduleTaskModal from '../../../../components/rescheduleTaskModal/rescheduleTaskModal';
import { VirtualInifiniteScroll } from '../../../../components/virtualInfiniteScroll/virtualInfiniteScroll';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useTaskNavigationStorage } from '../../../../hooks';
import useMarkAsDone from '../../../../hooks/useMarkAsDone';
import { useRescheduleTask } from '../../../../hooks/useRescheduleTask';
import SubhomeEmptyContent from '../../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import SubhomeStats from '../../../../layouts/subhomeLayout/subhomeContent/subhomeStats/subhomeStats';
import { Bobject } from '../../../../typings/bobjects';
import { TaskDate } from '../../../../typings/tasks';
import { getValueFromLogicRole } from '../../../../utils/bobjects.utils';
import { startOfDay, subDays } from '@bloobirds-it/utils';
import { addTaskDateGrouping } from '../../../../utils/tasks.utils';
import { useSubhomeContext } from '../../subhomeContext';
import { ProspectingSubhomeCard } from '../components/prospectingSubhomeCard';
import MarkAsDoneModal from '../markAsDoneModal/markAsDoneModal';
import styles from './scheduled.module.css';
import { ScheduledFilters } from './scheduledFilters';
import ScheduledFooter from './scheduledFooter';
import {
  useProspectingScheduledPage,
  useProspectingTasksScheduled,
} from './useProspectingScheduled';

const checkIsOverdue = (item: Bobject) => {
  const date = new Date(getValueFromLogicRole(item, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME));

  return startOfDay(new Date(date)) <= subDays(startOfDay(new Date()), 1);
};

interface DateExtendedTask extends Bobject {
  taskDate: TaskDate;
}

const DateGroupHeader = ({ bobject }: { bobject: DateExtendedTask }): JSX.Element => (
  <header className={styles._header} id={bobject.taskDate.hashDate}>
    <Icon className={styles._header_icon} name={'calendar'} color={'lightPeanut'} />
    <Text color="peanut" weight="medium" size="s" inline>
      {bobject.taskDate.prefix}
    </Text>
    <Text color="softPeanut" size="s" inline>
      {bobject.taskDate.formattedDate}
    </Text>
  </header>
);

const ScheduledLists = () => {
  const scrollRef = useRef();
  const { items: tasks, isLoading, totalMatching } = useProspectingTasksScheduled();
  const { customTasks } = useCustomTasks({ disabled: true });
  const { addTasksToNavigation } = useTaskNavigationStorage();
  const { hasNextPage, loadNextPage, setHasNextPage } = useProspectingScheduledPage();
  const {
    selectedItems,
    setSelectedItems,
    isSelectAllChecked,
    toggleSelectAll,
    parentRef,
  } = useSubhomeContext();
  const { openMarkAsDoneModal } = useMarkAsDone();
  const { openRescheduleModal } = useRescheduleTask();
  const dataModel = useDataModel();

  const filteredTasks = useMemo(
    () =>
      tasks?.length === totalMatching
        ? addTaskDateGrouping(tasks, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, checkIsOverdue)
        : tasks,
    [tasks, totalMatching],
  );

  useEffect(() => {
    if (filteredTasks?.length === totalMatching) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  }, [filteredTasks, totalMatching]);

  useEffect(() => {
    const tasksToUse = selectedItems?.length > 0 ? selectedItems : filteredTasks;
    addTasksToNavigation(tasksToUse);
  }, [filteredTasks, selectedItems]);

  useEffect(() => {
    if (
      selectedItems?.length !== 0 &&
      selectedItems?.length === tasks?.length &&
      !isSelectAllChecked
    ) {
      toggleSelectAll(true);
    } else if (isSelectAllChecked && selectedItems?.length < tasks?.length) {
      toggleSelectAll(false);
    }
  }, [selectedItems]);

  const handleSelectAll = () => {
    if (isSelectAllChecked) {
      setSelectedItems([]);
      toggleSelectAll(!isSelectAllChecked);
    } else {
      setSelectedItems(tasks);
      toggleSelectAll(true);
    }
  };

  if (!isLoading && filteredTasks?.length === 0) {
    return <SubhomeEmptyContent />;
  }

  return (
    <>
      <div className={styles._select_all_wrapper}>
        <div>
          <Checkbox size="small" onClick={handleSelectAll} checked={isSelectAllChecked}>
            <Text size="s">Select all</Text>
          </Checkbox>
          {selectedItems?.length !== 0 && (
            <>
              <div className={styles._button_wrapper}>
                <Button
                  variant="clear"
                  iconLeft="check"
                  uppercase={false}
                  onClick={() => {
                    mixpanel.track(
                      MIXPANEL_EVENTS.MARK_AS_DONE_BULK_ACTION_CLICKED_ON_SCHEDULED_TAB,
                    );
                    openMarkAsDoneModal(selectedItems);
                  }}
                >
                  Mark as Done
                </Button>
              </div>
              <div className={styles._button_wrapper}>
                <Button
                  variant="clear"
                  iconLeft="clock"
                  uppercase={false}
                  onClick={() => {
                    mixpanel.track(MIXPANEL_EVENTS.RESCHEDULE_BULK_ACTION_CLICKED_ON_SCHEDULED_TAB);
                    openRescheduleModal({ bobjectToSet: selectedItems });
                  }}
                >
                  Reschedule
                </Button>
              </div>
            </>
          )}
        </div>
        {totalMatching !== undefined && !Number.isNaN(totalMatching) && (
          <Label size="small">{`${totalMatching} results`}</Label>
        )}
      </div>
      {isSelectAllChecked && (
        <div className={styles._message}>
          <Text size="s" inline>
            All <b>{selectedItems?.length}</b> tasks on this page are selected from a total of{' '}
            <b>{totalMatching}</b>.
          </Text>{' '}
          {selectedItems?.length < totalMatching && (
            <span className={styles._link} onClick={() => setSelectedItems(tasks)}>
              <Text size="s" inline color="bloobirds" htmlTag="span">
                {totalMatching > 1000
                  ? 'Continue with a maximum of 1000'
                  : `Select all ${totalMatching} tasks`}
              </Text>
            </span>
          )}
        </div>
      )}
      <VirtualInifiniteScroll
        ref={scrollRef}
        parentRef={parentRef}
        rows={filteredTasks}
        hasNextPage={hasNextPage}
        isFetchingData={isLoading}
        fetchNextPage={loadNextPage}
        hasNextItem={index =>
          !!filteredTasks[index + 1] && !filteredTasks[index + 1]?.taskDate?.isFirstOfDay
        }
        footer={scrollToTop => <ScheduledFooter scrollToTop={scrollToTop} />}
      >
        {(data: DateExtendedTask, hasNext: boolean) =>
          data?.id?.objectId && (
            <Fragment key={data?.id?.objectId}>
              {data.taskDate?.isFirstOfDay && <DateGroupHeader bobject={data} />}
              <ProspectingSubhomeCard
                bobject={data}
                hasNextCard={hasNext}
                rectVirtualList={scrollRef?.current?.getBoundingClientRect()}
                customTasks={customTasks}
              />
            </Fragment>
          )
        }
      </VirtualInifiniteScroll>
    </>
  );
};

export function ScheduledContent() {
  const { setSelectedItems, selectedItems } = useSubhomeContext();
  const { isOpen: isOpenMarkAsDoneModal } = useMarkAsDone();
  const { isOpen: isOpenRescheduleModal } = useRescheduleTask();
  const { createToast } = useToasts();

  return (
    <>
      <SubhomeStats tab={'prospectScheduled'} thereAreItemsSelected={selectedItems?.length > 0} />
      <div
        className={clsx({
          [styles._hidden]: selectedItems?.length > 0,
        })}
      >
        <ScheduledFilters />
      </div>
      <div className={clsx({ [styles._list_container]: selectedItems?.length > 0 })}>
        <ScheduledLists />
      </div>
      {isOpenMarkAsDoneModal && <MarkAsDoneModal onSave={() => setSelectedItems([])} />}
      {isOpenRescheduleModal && (
        <RescheduleTaskModal
          onSave={
            selectedItems?.length > 0
              ? () => {
                  setSelectedItems([]);
                  createToast({
                    type: 'success',
                    message:
                      selectedItems?.length > 1
                        ? `${selectedItems?.length} tasks successfully rescheduled.`
                        : 'Tasks successfully rescheduled',
                  });
                }
              : () => {
                  createToast({
                    type: 'success',
                    message: 'Task rescheduled successfully',
                  });
                }
          }
        />
      )}
    </>
  );
}
