import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, Label, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { useCustomTasks } from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectTypes,
  MainBobjectTypes,
  FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import {injectReferencesSearchProcess} from '@bloobirds-it/utils';
import { addHoursToStringDate, isToday, today } from '@bloobirds-it/utils';
import clsx from 'clsx';
import { isBefore, isSameDay } from 'date-fns';
import { indexOf } from 'lodash';
import mixpanel from 'mixpanel-browser';

import { STEPS } from '../../../../components/cadenceControlModal/cadenceControlModal.machine';
import { useRescheduleCadenceTask } from '../../../../components/rescheduleTask/useRescheduleCadenceTask';
import RescheduleTaskModal from '../../../../components/rescheduleTaskModal/rescheduleTaskModal';
import StopCadenceModal from '../../../../components/stopCadenceModal/stopCadenceModal';
import { VirtualInifiniteScroll } from '../../../../components/virtualInfiniteScroll/virtualInfiniteScroll';
import WithTooltip from '../../../../components/withTooltip/withTooltip';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useCadenceControl, useTaskNavigationStorage } from '../../../../hooks';
import { useCadences } from '../../../../hooks/useCadences';
import { useFullSalesEnabled, useSetCadenceEnabled } from '../../../../hooks/useFeatureFlags';
import useMarkAsDone from '../../../../hooks/useMarkAsDone';
import { useRescheduleTask } from '../../../../hooks/useRescheduleTask';
import useStopCadence from '../../../../hooks/useStopCadence';
import useUserTimeZone from '../../../../hooks/useUserTimeZone';
import SubhomeEmptyContent from '../../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import { TaskDate } from '../../../../typings/tasks';
import {
  getFieldByLogicRole,
  getReferencedBobject,
  getRelatedBobjectTypeName,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../../utils/bobjects.utils';
import { getButtonMarkAsDone, isBeforeToday } from '../../../../utils/tasks.utils';
import { SalesSubhomeCard } from '../../components/subhomeCards/salesSubhomeCard';
import MarkAsDoneModal from '../../prospectingPage/markAsDoneModal/markAsDoneModal';
import { getMainBobjectFromSelectedItems } from '../../prospectingPage/prospectingPage.utils';
import { useSubhomeContext } from '../../subhomeContext';
import { addMixedTasksDateGrouping } from '../nurturing/nurturingContent';
import styles from './followUp.module.css';
import { FollowUpFilters } from './followUpFilters';
import {
  useSalesFollowUpAllItems,
  useSalesFollowUpPage,
  useSalesTasksFollowUp,
} from './useSalesFollowUp';

const checkIsOverdue = (item: Bobject, userTimeZone: string) => {
  const status = getFieldByLogicRole(item, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const scheduledDate = getFieldByLogicRole(item, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME)?.text;
  //@ts-ignore Remove when the overdue status is updated properly
  const passNotWorkingCorrectly = isBeforeToday(scheduledDate, userTimeZone);

  return status === TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE || passNotWorkingCorrectly;
};

interface DateExtendedTask extends Bobject {
  taskDate: TaskDate;
}

const DateGroupHeader = ({ bobject }: { bobject: DateExtendedTask }) => (
  <header className={styles._header} id={bobject.taskDate.hashDate}>
    <Text color="peanut" weight="medium" size="s" inline>
      {bobject.taskDate.prefix}
    </Text>
    <Text color="softPeanut" size="s" inline>
      {bobject.taskDate.formattedDate}
    </Text>
  </header>
);

const FollowUpList = () => {
  const scrollRef = useRef();
  const {
    items: tasks,
    isLoading,
    totalMatching,
    haveFiltersBeenChanged,
  } = useSalesTasksFollowUp();
  const { hasNextPage, loadNextPage, setHasNextPage } = useSalesFollowUpPage();
  const { addTasksToNavigation } = useTaskNavigationStorage();
  const { isOpen: isOpenMarkAsDoneModal, openMarkAsDoneModal } = useMarkAsDone();
  const {
    isOpen: isOpenRescheduleModal,
    openRescheduleModal: openRescheduleTaskModal,
  } = useRescheduleTask();
  const {
    openRescheduleTaskModal: openRescheduleCadenceTaskModal,
    isOpen: isOpenRescheduleCadenceTask,
  } = useRescheduleCadenceTask();
  const { createToast } = useToasts();
  const { openCadenceControl } = useCadenceControl();
  const { openStopCadenceModal } = useStopCadence();
  const hasSalesEnabled = useFullSalesEnabled();
  const isSetCadenceEnabled = useSetCadenceEnabled();
  const [isCadenceEditable, setIsCadenceEditable] = useState<boolean>(true);
  const { getAllItems } = useSalesFollowUpAllItems();
  const { cadences: companyCadences } = useCadences(BobjectTypes.Company);
  const { cadences: leadCadences } = useCadences(BobjectTypes.Lead);
  const { cadences: opportunityCadences } = useCadences(BobjectTypes.Opportunity);
  const { customTasks } = useCustomTasks({ disabled: true });
  function getRelatedBobjectCadenceEntity(task: Bobject) {
    const taskRelatedBobjectType = getRelatedBobjectTypeName(task);
    const cadenceId = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CADENCE);

    switch (taskRelatedBobjectType) {
      case 'Company':
        return companyCadences?.find(
          (cadenceElement: { id: string }) => cadenceElement?.id === cadenceId,
        );
      case 'Lead':
        return leadCadences?.find(
          (cadenceElement: { id: string }) => cadenceElement?.id === cadenceId,
        );
      case 'Opportunity':
        return opportunityCadences?.find(
          (cadenceElement: { id: string }) => cadenceElement?.id === cadenceId,
        );
    }
  }

  const displayOrder = [TASK_TYPE.NEXT_STEP, TASK_TYPE.MEETING, TASK_TYPE.PROSPECT_CADENCE];
  const testTasks = [...tasks];
  const userTimeZone = useUserTimeZone();
  const {
    setSelectedItems,
    selectedItems,
    isSelectAllChecked,
    toggleSelectAll,
    parentRef,
  } = useSubhomeContext();

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

  const parsedTasks = useMemo(() => {
    return testTasks
      .map(task => {
        const cadencesEntity = getRelatedBobjectCadenceEntity(task);
        const referencedBobject = getReferencedBobject(task);
        const referencedBobjectType = referencedBobject?.id?.typeName;
        const relatedBobjectLastAttempt =
          FIELDS_LOGIC_ROLE[referencedBobjectType as MainBobjectTypes]?.ATTEMPTS_LAST_DAY;
        const status = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
        const type = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole;
        const automated = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED)
          ?.valueLogicRole;
        const date = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
        const disabled = getButtonMarkAsDone({
          taskType: type,
          taskStatus: status,
          bobjectLastAttemptDate: relatedBobjectLastAttempt,
          taskDateField: date,
          taskIsAutomated: automated,
        })?.disabled;
        const reschedulable = cadencesEntity?.reschedulableMode === 'RESCHEDULABLE';

        return {
          ...task,
          disabled,
          reschedulable,
        };
      })
      .sort((a, b) => {
        const aDay = new Date(
          getFieldByLogicRole(a, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME)?.text,
        );
        const bDay = new Date(
          getFieldByLogicRole(b, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME)?.text,
        );
        const aTypeOrder = indexOf(
          displayOrder,
          getFieldByLogicRole(a, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole,
        );
        const bTypeOrder = indexOf(
          displayOrder,
          getFieldByLogicRole(b, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole,
        );
        /* if (checkIsOverdue(a, userTimeZone)) {
          if (checkIsOverdue(b, userTimeZone)) {
            return aTypeOrder - bTypeOrder;
          }
        } */
        if (isSameDay(aDay, bDay)) {
          return aTypeOrder - bTypeOrder;
        }
      });
  }, [tasks]);
  const { t } = useTranslation();

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
    const types = selectedItems.map((task: any) => getReferencedBobject(task)?.id?.typeName);
    setIsCadenceEditable(types.every(v => v === types[0]));
  }, [selectedItems]);

  const filteredTasks = useMemo(
    () =>
      haveFiltersBeenChanged && parsedTasks
        ? addMixedTasksDateGrouping(parsedTasks, userTimeZone, checkIsOverdue, t)
        : parsedTasks,
    [parsedTasks],
  );

  useEffect(() => {
    const tasksToUse = selectedItems?.length > 0 ? selectedItems : filteredTasks;
    if (tasksToUse)
      addTasksToNavigation(
        tasksToUse?.filter(task => {
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
    if (!isOpenRescheduleCadenceTask) setSelectedItems([]);
  }, [isOpenRescheduleCadenceTask]);

  useEffect(() => {
    if (filteredTasks?.length === totalMatching) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  }, [filteredTasks, totalMatching]);

  const handleSelectAll = () => {
    if (isSelectAllChecked) {
      setSelectedItems([]);
      toggleSelectAll(!isSelectAllChecked);
    } else {
      setSelectedItems(parsedTasks);
      toggleSelectAll(true);
    }
  };
  const handleSelectAllItems = () => {
    getAllItems().then(allTasks => {
      const extendedTasks = injectReferencesSearchProcess(allTasks.data);
      const allMarkableTasks = extendedTasks.contents.map((task: Bobject) => {
        // this functionality should be extracted
        const referencedBobject = getReferencedBobject(task);
        const referencedBobjectType = referencedBobject?.id?.typeName;
        const { cadences: cadencesEntities } = useCadences(referencedBobjectType);
        const date = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
        const type = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole;
        const status = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
        const automated = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.IS_AUTOMATED)
          ?.valueLogicRole;
        const referencedBobjectLastAttempt = getValueFromLogicRole(
          referencedBobject,
          FIELDS_LOGIC_ROLE[referencedBobjectType as MainBobjectTypes].ATTEMPTS_LAST_DAY,
        );
        const disabled = getButtonMarkAsDone({
          taskType: type,
          taskStatus: status,
          bobjectLastAttemptDate: referencedBobjectLastAttempt,
          taskDateField: date,
          taskIsAutomated: automated,
        })?.disabled;

        const cadenceId = getTextFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.CADENCE);
        const reschedulable =
          type === TASK_TYPE.PROSPECT_CADENCE &&
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

  const sameTypeTasksSelected = () => {
    let taskType: TASK_TYPE.NEXT_STEP | TASK_TYPE.PROSPECT_CADENCE | false;
    selectedItems?.forEach((task: Bobject<BobjectTypes.Task>) => {
      const parsedTaskType = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)
        ?.valueLogicRole as TASK_TYPE.NEXT_STEP | TASK_TYPE.PROSPECT_CADENCE;
      if (!taskType) taskType = parsedTaskType;
      if (taskType !== parsedTaskType) return (taskType = false);
    });
    return taskType;
  };
  const areReschedulable = sameTypeTasksSelected();

  if (!isLoading && filteredTasks?.length === 0) {
    return <SubhomeEmptyContent />;
  }

  return (
    <>
      {hasSalesEnabled && (
        <>
          <div className={styles._select_all_wrapper}>
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
                          title="To be able to reschedule in bulk all selected
tasks must be on cadence tasks and belong
to a cadence with this setting selected. "
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
                              areReschedulable === TASK_TYPE.PROSPECT_CADENCE
                                ? openRescheduleCadenceTaskModal(
                                    selectedItems.length === 1
                                      ? selectedItems[0]
                                      : (selectedItems as Bobject<BobjectTypes.Task>),
                                  )
                                : openRescheduleTaskModal({
                                    bobjectToSet: selectedItems,
                                  });
                            }}
                          >
                            Reschedule
                          </Button>
                        </WithTooltip>
                      </div>
                      <div className={styles._button_wrapper}>
                        <WithTooltip
                          isDisabled={!isCadenceEditable}
                          title="In order to perform “Set cadence” in bulk, selected tasks have to belong to the same type of object"
                        >
                          <Button
                            variant="clear"
                            iconLeft="calendar"
                            uppercase={false}
                            disabled={!isCadenceEditable}
                            onClick={() => {
                              mixpanel.track(
                                MIXPANEL_EVENTS.SET_CADENCE_BULK_ACTION_CLICKED_ON_FOLLOW_UP_TAB,
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
                      <div className={styles._button_wrapper}>
                        <WithTooltip
                          isDisabled={!isCadenceEditable}
                          title="In order to perform “Stop cadence” in bulk, selected tasks have to belong to the same type of object"
                        >
                          <Button
                            variant="clear"
                            iconLeft="slash"
                            uppercase={false}
                            disabled={!isCadenceEditable}
                            onClick={async () => {
                              mixpanel.track(
                                MIXPANEL_EVENTS.STOP_CADENCE_BULK_ACTION_CLICKED_ON_FOLLOW_UP_TAB,
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
                  <div className={styles._button_wrapper}>
                    <Button
                      variant="clear"
                      iconLeft="check"
                      uppercase={false}
                      onClick={() => {
                        mixpanel.track(
                          MIXPANEL_EVENTS.MARK_AS_DONE_BULK_ACTION_CLICKED_ON_FOLLOW_UP_TAB,
                        );
                        openMarkAsDoneModal(selectedItems);
                      }}
                    >
                      Mark as Done
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
                <span className={styles._link} onClick={handleSelectAllItems}>
                  <Text size="s" inline color="bloobirds" htmlTag="span">
                    {totalMatching > 1000
                      ? 'Continue with a maximum of 1000'
                      : `Select all ${totalMatching} tasks`}
                  </Text>
                </span>
              )}
            </div>
          )}
        </>
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
      >
        {(data: DateExtendedTask, hasNext: boolean) =>
          data?.id?.objectId && (
            <Fragment key={data?.id?.objectId}>
              {data.taskDate?.isFirstOfDay && <DateGroupHeader bobject={data} />}
              <SalesSubhomeCard
                bobject={data}
                hasNextCard={hasNext}
                rectVirtualList={scrollRef?.current?.getBoundingClientRect()}
                customTasks={customTasks}
              />
            </Fragment>
          )
        }
      </VirtualInifiniteScroll>
      {isOpenRescheduleModal && (
        <RescheduleTaskModal
          onSave={() => {
            createToast({
              type: 'success',
              message: 'Task rescheduled successfully',
            });
            setSelectedItems([]);
          }}
        />
      )}
      {isOpenMarkAsDoneModal && <MarkAsDoneModal onSave={() => setSelectedItems([])} />}
    </>
  );
};

export function FollowUpContent() {
  const { selectedItems } = useSubhomeContext();
  const { isOpen: isOpenStopCadenceModal, closeStopCadenceModal } = useStopCadence();

  return (
    <>
      {isOpenStopCadenceModal && <StopCadenceModal handleClose={closeStopCadenceModal} open />}
      <div
        className={clsx(styles._filter_container, {
          [styles._transition]: selectedItems?.length > 0,
        })}
      >
        <FollowUpFilters />
      </div>
      <FollowUpList />
    </>
  );
}
