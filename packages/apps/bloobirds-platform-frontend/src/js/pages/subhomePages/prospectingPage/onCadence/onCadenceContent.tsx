import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, Icon, Label, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { useCustomTasks } from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectTypes,
  FIELDS_LOGIC_ROLE,
  MainBobjectTypes,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  addHoursToStringDate,
  isToday,
  today,
  injectReferencesSearchProcess,
} from '@bloobirds-it/utils';
import clsx from 'clsx';
import { isBefore, startOfDay, subDays } from 'date-fns';
import mixpanel from 'mixpanel-browser';

import { STEPS } from '../../../../components/cadenceControlModal/cadenceControlModal.machine';
import { ProspectCardInfoTooltip } from '../../../../components/discoveryTooltips/prospectCardInfoTooltip';
import { useRescheduleCadenceTask } from '../../../../components/rescheduleTask/useRescheduleCadenceTask';
import RescheduleTaskModal from '../../../../components/rescheduleTaskModal/rescheduleTaskModal';
import StopCadenceModal from '../../../../components/stopCadenceModal/stopCadenceModal';
import { VirtualInifiniteScroll } from '../../../../components/virtualInfiniteScroll/virtualInfiniteScroll';
import WithTooltip from '../../../../components/withTooltip/withTooltip';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useCadenceControl, useTaskNavigationStorage } from '../../../../hooks';
import { useCadences } from '../../../../hooks/useCadences';
import { useSetCadenceEnabled } from '../../../../hooks/useFeatureFlags';
import useMarkAsDone from '../../../../hooks/useMarkAsDone';
import { useQuickStartEnabled } from '../../../../hooks/useQuickStartGuide';
import { useRescheduleTask } from '../../../../hooks/useRescheduleTask';
import useStopCadence from '../../../../hooks/useStopCadence';
import SubhomeEmptyContent from '../../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import SubhomeStats from '../../../../layouts/subhomeLayout/subhomeContent/subhomeStats/subhomeStats';
import { TaskDate } from '../../../../typings/tasks';
import {
  getFieldByLogicRole,
  getReferencedBobject,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../../utils/bobjects.utils';
import { addTaskDateGrouping, getButtonMarkAsDone } from '../../../../utils/tasks.utils';
import { useSubhomeContext } from '../../subhomeContext';
import { ProspectingSubhomeCard } from '../components/prospectingSubhomeCard';
import MarkAsDoneModal from '../markAsDoneModal/markAsDoneModal';
import { getMainBobjectFromSelectedItems } from '../prospectingPage.utils';
import styles from './onCadence.module.css';
import { OnCadenceFilters } from './onCadenceFilters/onCadenceFilters';
import OnCadenceFooter from './onCadenceFooter';
import {
  useProspectingOnCadenceAllItems,
  useProspectingOnCadencePage,
  useProspectingTasksOnCadence,
} from './useProspectingOnCadence';

export interface BobjectWithDate extends Bobject {
  taskDate: TaskDate;
}

export interface BobjectWithButtonInfo extends Bobject {
  reschedulable: boolean;
  disable: boolean;
}

const checkIsOverdue = (item: Bobject) => {
  const date = new Date(getValueFromLogicRole(item, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME));

  return startOfDay(new Date(date)) <= subDays(startOfDay(new Date()), 1);
};

const DateGroupHeader = ({ bobject }: { bobject: BobjectWithDate }) => (
  <header className={styles._header} id={bobject?.taskDate.hashDate}>
    <Icon className={styles._header_icon} name={'calendar'} color={'lightPeanut'} />
    <Text color="peanut" weight="medium" size="s" inline>
      {bobject.taskDate.prefix}
    </Text>
    <Text color="softPeanut" size="s" inline>
      {bobject.taskDate.formattedDate}
    </Text>
  </header>
);

const OnCadenceLists = () => {
  const hasQSGEnabled = useQuickStartEnabled();
  const { customTasks } = useCustomTasks({ disabled: true });

  const scrollRef = useRef();
  const {
    items: tasks,
    isLoading,
    totalMatching,
    haveFiltersBeenChanged,
  } = useProspectingTasksOnCadence();

  const { openRescheduleTaskModal, isOpen } = useRescheduleCadenceTask();
  const { addTasksToNavigation } = useTaskNavigationStorage();
  const {
    selectedItems,
    setSelectedItems,
    isSelectAllChecked,
    toggleSelectAll,
    parentRef,
  } = useSubhomeContext<BobjectWithButtonInfo>();

  const onSaveAction = () => {
    setSelectedItems([]);
    createToast({
      type: 'success',
      message:
        selectedItems?.length > 1
          ? `${selectedItems.length} cadences started successfully.`
          : 'Cadence started successfully',
    });
  };

  const { openMarkAsDoneModal } = useMarkAsDone();
  const { page, hasNextPage, loadNextPage, setHasNextPage } = useProspectingOnCadencePage();
  const { getAllItems } = useProspectingOnCadenceAllItems();
  const { isOpen: isOpenRescheduleModal } = useRescheduleTask();
  const { openStopCadenceModal } = useStopCadence();
  const { createToast } = useToasts();
  const [isSameTaskType, setIsSameTaskType] = useState<boolean>(false);
  const isSetCadenceEnabled = useSetCadenceEnabled();
  const { openCadenceControl } = useCadenceControl();
  const { t } = useTranslation();

  //TODO: all this logic related to the selection should not be in the render phase of the main component
  const { cadences: cadencesEntities } = useCadences([
    BobjectTypes.Company,
    BobjectTypes.Lead,
    BobjectTypes.Opportunity,
  ]);

  const filteredTasks = useMemo(
    () =>
      haveFiltersBeenChanged
        ? addTaskDateGrouping(tasks, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, checkIsOverdue, t)
        : tasks,
    [tasks, totalMatching],
  );
  const shouldShowTotalMatching =
    (hasNextPage && totalMatching !== undefined && !Number.isNaN(totalMatching)) ||
    (!hasNextPage && filteredTasks?.length === totalMatching);

  const handleSelectAll = () => {
    if (isSelectAllChecked) {
      setSelectedItems([]);
      toggleSelectAll(!isSelectAllChecked);
    } else {
      const markableTasks = tasks.map(task => {
        const cadenceId = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CADENCE);
        const cadenceEntity = cadencesEntities?.find(
          (cadenceElement: { id: string }) => cadenceElement?.id === cadenceId,
        );
        const referencedBobject = getReferencedBobject(task);
        const status = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
        const type = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole;
        const automated = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED)
          ?.valueLogicRole;
        const date = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
        const referencedBobjectLastAttemptDate = getValueFromLogicRole(
          referencedBobject,
          FIELDS_LOGIC_ROLE[referencedBobject?.id?.typeName].ATTEMPTS_LAST_DAY,
        );
        const disabled = getButtonMarkAsDone({
          taskType: type,
          taskStatus: status,
          bobjectLastAttemptDate: referencedBobjectLastAttemptDate,
          taskDateField: date,
          taskIsAutomated: automated,
        })?.disabled;
        const reschedulable = cadenceEntity?.reschedulableMode === 'RESCHEDULABLE';
        return {
          ...task,
          disabled,
          reschedulable,
        };
      });
      setSelectedItems(markableTasks);
      toggleSelectAll(!isSelectAllChecked);
    }
  };

  useEffect(() => {
    if (filteredTasks?.length < page * 25) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  }, [filteredTasks]);

  useEffect(() => {
    if (!isOpen) setSelectedItems([]);
  }, [isOpen]);

  useEffect(() => {
    const tasksToUse = selectedItems?.length > 0 ? selectedItems : filteredTasks;
    addTasksToNavigation(
      tasksToUse.filter(task => {
        const day = addHoursToStringDate(
          getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME),
        );
        const status = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
        const isBeforeEqualToday = isToday(new Date(day)) || isBefore(new Date(day), today());

        return (
          (status === TASK_STATUS_VALUE_LOGIC_ROLE.TODO && isBeforeEqualToday) ||
          status === TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE
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
    const types = selectedItems.map((task: Bobject) => getReferencedBobject(task)?.id?.typeName);
    setIsSameTaskType(types.every(v => v === types[0]));
  }, [selectedItems]);

  const handleSelectAllTasks = () => {
    getAllItems().then(allTasks => {
      const extendedTasks = injectReferencesSearchProcess(allTasks.data);
      const allMarkableTasks = extendedTasks.contents.map((task: Bobject) => {
        const referencedBobject = getReferencedBobject(task);
        const referencedBobjectType = referencedBobject?.id?.typeName;
        const cadenceId = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CADENCE);
        const date = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
        const type = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole;
        const status = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
        const referencedBobjectLastAttempt = getValueFromLogicRole(
          referencedBobject,
          FIELDS_LOGIC_ROLE[referencedBobjectType as MainBobjectTypes].ATTEMPTS_LAST_DAY,
        );
        const automated = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED)
          ?.valueLogicRole;
        const disabled = getButtonMarkAsDone({
          taskType: type,
          taskStatus: status,
          bobjectLastAttemptDate: referencedBobjectLastAttempt,
          taskDateField: date,
          taskIsAutomated: automated,
        })?.disabled;
        const reschedulable =
          cadencesEntities?.find(
            (cadenceElement: { id: string }) => cadenceElement?.id === cadenceId,
          )?.reschedulableMode === 'RESCHEDULABLE';
        return {
          ...task,
          disabled,
          reschedulable,
        };
      });
      toggleSelectAll(true);
      setSelectedItems(allMarkableTasks);
    });
  };

  const areReschedulable = !selectedItems?.some(task => task.reschedulable === false);

  if (!isLoading && filteredTasks?.length === 0) {
    return <SubhomeEmptyContent />;
  }

  return (
    <>
      <div className={styles._select_all}>
        <div>
          <Checkbox size="small" onClick={handleSelectAll} checked={isSelectAllChecked}>
            <Text size="s">Select all</Text>
          </Checkbox>
          {selectedItems?.length !== 0 && (
            <>
              {isSetCadenceEnabled && (
                <>
                  <div className={styles._button}>
                    <WithTooltip
                      isDisabled={!areReschedulable}
                      title="In order to be able to reschedule in bulk, all selected tasks must belong to a cadence with this option activated."
                    >
                      <Button
                        variant="clear"
                        iconLeft="clock"
                        uppercase={false}
                        disabled={!areReschedulable}
                        onClick={() => {
                          mixpanel.track(
                            MIXPANEL_EVENTS.RESCHEDULE_CADENCE_BULK_ACTION_CLICKED_ON_CADENCE_TAB,
                          );
                          openRescheduleTaskModal(
                            (selectedItems.length === 1
                              ? selectedItems[0]
                              : selectedItems) as Bobject,
                          );
                        }}
                      >
                        Reschedule
                      </Button>
                    </WithTooltip>
                  </div>
                  <div className={styles._button}>
                    <WithTooltip
                      isDisabled={!isSameTaskType}
                      title="In order to perform “Set cadence” in bulk, selected tasks have to belong to the same type of object"
                    >
                      <Button
                        variant="clear"
                        iconLeft="calendar"
                        uppercase={false}
                        disabled={!isSameTaskType}
                        onClick={() => {
                          mixpanel.track(
                            MIXPANEL_EVENTS.SET_CADENCE_BULK_ACTION_CLICKED_ON_CADENCE_TAB,
                          );
                          openCadenceControl({
                            bobjectToSet: getMainBobjectFromSelectedItems(selectedItems),
                            previousStep: false,
                            step: STEPS.CONFIGURE_CADENCE,
                            onSaveCallback: onSaveAction,
                          });
                        }}
                      >
                        Set cadence
                      </Button>
                    </WithTooltip>
                  </div>
                  <div className={styles._button}>
                    <WithTooltip
                      isDisabled={!isSameTaskType}
                      title="In order to perform “Stop cadence” in bulk, selected tasks have to belong to the same type of object"
                    >
                      <Button
                        variant="clear"
                        iconLeft="slash"
                        uppercase={false}
                        disabled={!isSameTaskType}
                        onClick={() => {
                          mixpanel.track(
                            MIXPANEL_EVENTS.STOP_CADENCE_BULK_ACTION_CLICKED_ON_CADENCE_TAB,
                          );
                          openStopCadenceModal({
                            bobjectToSet: selectedItems,
                            callback: () => setSelectedItems([]),
                          });
                        }}
                      >
                        Stop cadence
                      </Button>
                    </WithTooltip>
                  </div>
                </>
              )}
              <div className={styles._button}>
                <Button
                  variant="clear"
                  iconLeft="check"
                  uppercase={false}
                  onClick={() => {
                    mixpanel.track(MIXPANEL_EVENTS.MARK_AS_DONE_BULK_ACTION_CLICKED_ON_CADENCE_TAB);
                    openMarkAsDoneModal(selectedItems);
                  }}
                >
                  Mark as Done
                </Button>
              </div>
            </>
          )}
        </div>
        {shouldShowTotalMatching && <Label size="small">{`${totalMatching} results`}</Label>}
      </div>
      {isSelectAllChecked && (
        <div className={styles._message}>
          <Text size="s" inline>
            All <b>{selectedItems?.length}</b> tasks on this page are selected from a total of{' '}
            <b>{totalMatching}</b>.
          </Text>
          {selectedItems?.length < totalMatching && (
            <span className={styles._link} onClick={handleSelectAllTasks}>
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
        isFetchingData={isLoading && !customTasks}
        fetchNextPage={loadNextPage}
        hasNextItem={index =>
          !!filteredTasks[index + 1] && !filteredTasks[index + 1]?.taskDate?.isFirstOfDay
        }
        footer={scrollToTop => <OnCadenceFooter scrollToTop={scrollToTop} />}
      >
        {(data: Bobject, hasNext: boolean, index) => {
          return index === 0 && hasQSGEnabled ? (
            <Fragment key={data?.id?.objectId}>
              {data?.taskDate?.isFirstOfDay && <DateGroupHeader bobject={data} />}
              <ProspectCardInfoTooltip defaultTooltipVisible>
                <ProspectingSubhomeCard
                  key={data?.id?.objectId}
                  bobject={data}
                  hasNextCard={hasNext}
                  rectVirtualList={scrollRef?.current?.getBoundingClientRect()}
                  customTasks={customTasks}
                />
              </ProspectCardInfoTooltip>
            </Fragment>
          ) : (
            data?.id?.objectId && (
              <Fragment key={data?.id?.objectId}>
                {data?.taskDate?.isFirstOfDay && <DateGroupHeader bobject={data} />}
                <ProspectingSubhomeCard
                  key={data?.id?.objectId}
                  bobject={data}
                  hasNextCard={hasNext}
                  rectVirtualList={scrollRef?.current?.getBoundingClientRect()}
                  customTasks={customTasks}
                />
              </Fragment>
            )
          );
        }}
      </VirtualInifiniteScroll>

      {isOpenRescheduleModal && (
        <RescheduleTaskModal
          onSave={() => {
            createToast({
              type: 'success',
              message: 'Task rescheduled successfully',
            });
          }}
        />
      )}
    </>
  );
};

export function OnCadenceContent() {
  const { selectedItems, setSelectedItems } = useSubhomeContext();
  const { isOpen: isOpenMarkAsDoneModal } = useMarkAsDone();
  const { isOpen: isOpenStopCadenceModal, closeStopCadenceModal } = useStopCadence();

  return (
    <div className={styles._box}>
      {isOpenStopCadenceModal && <StopCadenceModal handleClose={closeStopCadenceModal} open />}
      <SubhomeStats tab={'prospectOnCadence'} thereAreItemsSelected={selectedItems.length > 0} />
      <div
        className={clsx({
          [styles._hidden]: selectedItems?.length > 0,
        })}
      >
        <OnCadenceFilters />
      </div>
      {isOpenMarkAsDoneModal && <MarkAsDoneModal onSave={() => setSelectedItems([])} />}
      <div
        className={clsx({
          [styles._list_virtual_container]: true,
          [styles._list_container]: selectedItems?.length > 0,
        })}
      >
        <OnCadenceLists />
      </div>
    </div>
  );
}
