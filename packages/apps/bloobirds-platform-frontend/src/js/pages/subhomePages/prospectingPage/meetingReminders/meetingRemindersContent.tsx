import React, { Fragment, useEffect, useMemo, useRef } from 'react';

import { Button, Checkbox, Icon, Label, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { useDataModel } from '@bloobirds-it/hooks';
import { Bobject, TASK_FIELDS_LOGIC_ROLE, TASK_STATUS_VALUE_LOGIC_ROLE } from '@bloobirds-it/types';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import { STEPS } from '../../../../components/cadenceControlModal/cadenceControlModal.machine';
import { VirtualInifiniteScroll } from '../../../../components/virtualInfiniteScroll/virtualInfiniteScroll';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useCadenceControl, useTaskNavigationStorage } from '../../../../hooks';
import useMarkAsDone from '../../../../hooks/useMarkAsDone';
import SubhomeEmptyContent from '../../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import SubhomeStats from '../../../../layouts/subhomeLayout/subhomeContent/subhomeStats/subhomeStats';
import { TaskDate } from '../../../../typings/tasks';
import { getFieldByLogicRole, getValueFromLogicRole } from '../../../../utils/bobjects.utils';
import { isBeforeToday, isToday, startOfDay, subDays } from '@bloobirds-it/utils';
import { addTaskDateGrouping } from '../../../../utils/tasks.utils';
import { useSubhomeContext } from '../../subhomeContext';
import { ProspectingSubhomeCard } from '../components/prospectingSubhomeCard';
import MarkAsDoneModal from '../markAsDoneModal/markAsDoneModal';
import { meetingCardFieldsArray } from './meetingReminders.constant';
import styles from './meetingReminders.module.css';
import { MeetingRemindersFilters } from './meetingRemindersFilters';
import MeetingRemindersFooter from './meetingRemindersFooter';
import {
  useProspectingMeetingRemindersPage,
  useProspectingTasksMeetingReminders,
} from './useProspectingMeetingReminders';

export interface BobjectWithDate extends Bobject {
  taskDate: TaskDate;
}

const checkIsOverdue = item => {
  const date = new Date(getValueFromLogicRole(item, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME));

  return startOfDay(new Date(date)) <= subDays(startOfDay(new Date()), 1);
};

const DateGroupHeader = ({ bobject }) => (
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

const MeetingRemindersLists = () => {
  const scrollRef = useRef<HTMLDivElement>();
  const { items: tasks, isLoading, totalMatching } = useProspectingTasksMeetingReminders();
  const { addTasksToNavigation } = useTaskNavigationStorage();
  const { hasNextPage, loadNextPage, setHasNextPage } = useProspectingMeetingRemindersPage();
  const { openCadenceControl } = useCadenceControl();
  const dataModel = useDataModel();
  const {
    selectedItems,
    setSelectedItems,
    isSelectAllChecked,
    toggleSelectAll,
    parentRef,
  } = useSubhomeContext();
  const { openMarkAsDoneModal } = useMarkAsDone();
  const { createToast } = useToasts();

  const getCompaniesFromSelectedItems = (selectedTaks: Bobject[]) => {
    const companies = [] as Bobject[];
    selectedTaks.forEach(task => {
      const taskCompany = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.COMPANY)
        ?.referencedBobject;

      if (
        companies.find(company => taskCompany?.id.objectId !== company?.id.objectId) ||
        !companies.length
      ) {
        companies.push(taskCompany);
      }
    });
    return companies;
  };

  const onSaveAction = () => {
    setSelectedItems([]);
    const numOfCompanies = getCompaniesFromSelectedItems(selectedItems)?.length;

    createToast({
      type: 'success',
      message:
        numOfCompanies > 1
          ? `${numOfCompanies} companies updated successfully.`
          : 'Company updated successfully',
    });
  };

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
    addTasksToNavigation(
      tasksToUse.filter(task => {
        const day = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
        const status = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;

        return (
          status === TASK_STATUS_VALUE_LOGIC_ROLE.TODO &&
          (isToday(new Date(day)) || isBeforeToday(new Date(day)))
        );
      }),
    );
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
      toggleSelectAll(!isSelectAllChecked);
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
                    mixpanel.track(MIXPANEL_EVENTS.MARK_AS_DONE_BULK_ACTION_CLICKED_ON_MEETING_TAB);
                    openMarkAsDoneModal(selectedItems);
                  }}
                >
                  Mark as Done
                </Button>
              </div>
              <div className={styles._button_wrapper}>
                <Button
                  variant="clear"
                  iconLeft="calendar"
                  uppercase={false}
                  onClick={() => {
                    mixpanel.track(MIXPANEL_EVENTS.SET_CADENCE_BULK_ACTION_CLICKED_ON_MEETING_TAB);
                    openCadenceControl({
                      bobjectToSet: getCompaniesFromSelectedItems(selectedItems),
                      previousStep: false,
                      step: STEPS.CONFIGURE_CADENCE,
                      onSaveCallback: onSaveAction,
                    });
                  }}
                >
                  Set cadence
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
        footer={scrollToTop => <MeetingRemindersFooter scrollToTop={scrollToTop} />}
      >
        {(data: BobjectWithDate, hasNext: boolean) =>
          data?.id?.objectId && (
            <Fragment key={data?.id?.objectId}>
              {data.taskDate?.isFirstOfDay && <DateGroupHeader bobject={data} />}
              <ProspectingSubhomeCard
                bobject={data}
                hasNextCard={hasNext}
                rectVirtualList={scrollRef?.current?.getBoundingClientRect()}
                fieldsArray={meetingCardFieldsArray}
              />
            </Fragment>
          )
        }
      </VirtualInifiniteScroll>
    </>
  );
};

export function MeetingRemindersContent() {
  const { selectedItems, setSelectedItems } = useSubhomeContext();
  const { isOpen: isOpenMarkAsDoneModal } = useMarkAsDone();

  return (
    <>
      <SubhomeStats tab={'prospectMeetings'} thereAreItemsSelected={selectedItems?.length > 0} />
      <div
        className={clsx({
          [styles._hidden]: selectedItems?.length > 0,
        })}
      >
        <MeetingRemindersFilters />
      </div>
      {isOpenMarkAsDoneModal && <MarkAsDoneModal onSave={() => setSelectedItems([])} />}
      <div className={clsx({ [styles._list_container]: selectedItems?.length > 0 })}>
        <MeetingRemindersLists />
      </div>
    </>
  );
}
