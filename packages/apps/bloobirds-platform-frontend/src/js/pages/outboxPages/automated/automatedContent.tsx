import React, { Fragment, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { ScheduleEmailModal } from '@bloobirds-it/email';
import { Button, Checkbox, Label, Text } from '@bloobirds-it/flamingo-ui';
import { Bobject, TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import CancelEmailModal from '../../../components/cancelEmailModal/cancelEmailModal';
import ConfirmSendAutomatedEmailModal from '../../../components/confirmSendAutomatedEmailModal/confirmSendAutomatedEmailModal';
import { AutomatedBulkActionsTooltip } from '../../../components/discoveryTooltips/outboxTourTooltips/automatedBulkActionsTooltip';
import { AutomatedEmailsTooltip } from '../../../components/discoveryTooltips/outboxTourTooltips/automatedEmailsTooltip';
import StopCadenceModal from '../../../components/stopCadenceModal/stopCadenceModal';
import WithTooltip from '../../../components/withTooltip/withTooltip';
import { MIXPANEL_EVENTS } from '../../../constants/mixpanel';
import useCancelEmail from '../../../hooks/useCancelEmail';
import { useSetCadenceEnabled } from '../../../hooks/useFeatureFlags';
import { useQuickStartEnabled } from '../../../hooks/useQuickStartGuide';
import useRescheduleAutomatedEmail from '../../../hooks/useRescheduleAutomatedEmail';
import useSendAutomatedEmail from '../../../hooks/useSendAutomatedEmail';
import useStopCadence from '../../../hooks/useStopCadence';
import SubhomeContentSkeleton from '../../../layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton';
import SubhomeEmptyContent from '../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import { getReferencedBobject } from '../../../utils/bobjects.utils';
import { addTaskDateGrouping } from '../../../utils/tasks.utils';
import { useSubhomeContext } from '../../subhomePages/subhomeContext';
import { checkIsOverdue } from './automated.utils';
import { AutomatedCard } from './automatedCard/automatedCard';
import styles from './automatedContent.module.css';
import { NewAutomatedFilters } from './automatedFilters/newAutomatedFilters';
import NewAutomatedFooter from './automatedFooter/newAutomatedFooter';
import {
  useOutboxAutomatedAllItems,
  useOutboxAutomatedFilters,
  useOutboxAutomatedPage,
  useOutboxAutomatedTasks,
} from './useOutboxAutomated';

interface TaskDate {
  isFirstOfDay: boolean;
  day: Date;
  formattedDate: string;
  prefix: string;
  hashDate: string;
}

interface BobjectWithHeading extends Bobject {
  taskDate: TaskDate;
}

const DateGroupHeader = ({ bobject }: { bobject: BobjectWithHeading }) => (
  <header className={styles._header} id={bobject.taskDate.hashDate}>
    <Text color="peanut" weight="medium" size="s" inline>
      {bobject.taskDate.prefix}
    </Text>{' '}
    <Text color="softPeanut" size="s" inline>
      {bobject.taskDate.formattedDate}
    </Text>
  </header>
);

const AutomatedLists = () => {
  const { items: tasks, isLoading, totalMatching } = useOutboxAutomatedTasks();
  const { usingDefaultFiltersExcludeDate } = useOutboxAutomatedFilters();
  const { hasNextPage, loadNextPage, setHasNextPage } = useOutboxAutomatedPage();
  const { openCancelEmailModal } = useCancelEmail();
  const { openStopCadenceModal } = useStopCadence();
  const { openConfirmSendEmailModal } = useSendAutomatedEmail();
  const { openRescheduleAutomatedEmailModal } = useRescheduleAutomatedEmail();
  const { getAllItems } = useOutboxAutomatedAllItems();
  const {
    selectedItems,
    setSelectedItems,
    toggleSelectAll,
    isSelectAllChecked,
  } = useSubhomeContext();

  const [isSameTaskType, setIsSameTaskType] = useState<boolean>(false);
  const isSetCadenceEnabled = useSetCadenceEnabled();
  const hasQSGEnabled = useQuickStartEnabled();

  const onCancelAction = () => {
    setSelectedItems([]);
  };

  const filteredTasks = useMemo(
    () =>
      usingDefaultFiltersExcludeDate
        ? addTaskDateGrouping(tasks, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, checkIsOverdue)
        : tasks,
    [tasks, usingDefaultFiltersExcludeDate],
  );

  const handleSelectAll = () => {
    if (isSelectAllChecked) {
      setSelectedItems([]);
      toggleSelectAll(!isSelectAllChecked);
    } else {
      setSelectedItems(tasks);
      toggleSelectAll(!isSelectAllChecked);
    }
  };

  const handleSelectAllTasks = () => {
    getAllItems()?.then((allTasks: any) => setSelectedItems(allTasks?.data?.contents));
  };

  useEffect(() => {
    if (filteredTasks?.length === totalMatching) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  }, [filteredTasks, totalMatching]);

  useEffect(() => {
    const types = selectedItems.map((task: any) => getReferencedBobject(task)?.id?.typeName);
    setIsSameTaskType(types.every(v => v === types[0]));
  }, [selectedItems]);

  useEffect(() => {
    if (
      selectedItems.length !== 0 &&
      selectedItems.length === tasks.length &&
      !isSelectAllChecked
    ) {
      toggleSelectAll(true);
    } else if (isSelectAllChecked && selectedItems.length < tasks.length) {
      toggleSelectAll(false);
    }
  }, [selectedItems]);

  return (
    <>
      {!isLoading && filteredTasks?.length === 0 ? (
        <>
          <SubhomeEmptyContent />
          {hasQSGEnabled && <AutomatedEmailsTooltip defaultTooltipVisible />}
        </>
      ) : (
        <>
          <div className={styles._select_all_wrapper}>
            <div>
              <div style={{ display: 'flex', marginBottom: '15px' }}>
                <Checkbox size="small" onClick={handleSelectAll} checked={isSelectAllChecked}>
                  <Text size="s">Select all</Text>
                </Checkbox>
                {hasQSGEnabled && <AutomatedBulkActionsTooltip defaultTooltipVisible />}
              </div>

              {selectedItems.length !== 0 && (
                <>
                  {isSetCadenceEnabled && (
                    <div className={styles._button_wrapper}>
                      <WithTooltip
                        isDisabled={!isSameTaskType}
                        title="In order to perform “Stop cadence” in bulk, selected tasks have to belong to the same type of object"
                      >
                        <Button
                          variant="clear"
                          iconLeft="slash"
                          uppercase={false}
                          disabled={!isSameTaskType}
                          onClick={async () => {
                            mixpanel.track(
                              MIXPANEL_EVENTS.OUTBOX_STOP_CADENCE_BULK_ACTION_CLICKED_ON_AUTOMATED_TAB,
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
                  )}
                  <div className={styles._button_wrapper}>
                    <Button
                      variant="clear"
                      iconLeft="clock"
                      uppercase={false}
                      onClick={async () => {
                        mixpanel.track(
                          MIXPANEL_EVENTS.OUTBOX_RESCHEDULE_BULK_ACTION_CLICKED_ON_AUTOMATED_TAB,
                        );
                        openRescheduleAutomatedEmailModal({ bobjectToSet: selectedItems });
                      }}
                    >
                      Reschedule
                    </Button>
                  </div>
                  <div className={styles._button_wrapper}>
                    <Button
                      variant="clear"
                      iconLeft="deliver"
                      uppercase={false}
                      onClick={() => {
                        mixpanel.track(
                          MIXPANEL_EVENTS.OUTBOX_SEND_NOW_BULK_ACTION_CLICKED_ON_AUTOMATED_TAB,
                        );
                        openConfirmSendEmailModal({
                          bobjectToSet: selectedItems,
                          type: 'RESEND',
                        });
                      }}
                    >
                      Send mails
                    </Button>
                  </div>
                  <div className={styles._button_wrapper}>
                    <Button
                      variant="clear"
                      iconLeft="cross"
                      uppercase={false}
                      color="tomato"
                      onClick={() => {
                        mixpanel.track(
                          MIXPANEL_EVENTS.OUTBOX_CANCEL_EMAIL_BULK_ACTION_CLICKED_ON_AUTOMATED_TAB,
                        );
                        openCancelEmailModal({
                          bobjectToSet: selectedItems,
                          onCancelCallback: onCancelAction,
                        });
                      }}
                    >
                      Cancel email
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
                All <b>{selectedItems.length}</b> emails on this page are selected from a total of{' '}
                <b>{totalMatching}</b>.
              </Text>{' '}
              {selectedItems.length < totalMatching && (
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
          <InfiniteScroll
            dataLength={filteredTasks?.length}
            hasMore={hasNextPage}
            className={styles._list_wrapper}
            next={loadNextPage}
            scrollThreshold={0.75}
            scrollableTarget="subhomeContent"
            loader={<SubhomeContentSkeleton visible />}
          >
            {hasQSGEnabled && <AutomatedEmailsTooltip defaultTooltipVisible />}

            {filteredTasks?.map((automated: BobjectWithHeading, index: number) => {
              const nextBobject = filteredTasks[index + 1];
              const showNextLine = nextBobject && !nextBobject?.taskDate?.isFirstOfDay;
              return (
                <Fragment key={automated.id.value}>
                  {automated.taskDate?.isFirstOfDay && <DateGroupHeader bobject={automated} />}
                  <AutomatedCard automated={automated} showNextLine={showNextLine} />
                </Fragment>
              );
            })}
          </InfiniteScroll>
          <NewAutomatedFooter />
        </>
      )}
    </>
  );
};

export function AutomatedContent() {
  const { isOpen: isOpenCancelEmailModal, closeCancelEmailModal } = useCancelEmail();
  const {
    isOpen: isOpenScheduledModal,
    closeRescheduleAutomatedEmailModal,
    rescheduleEmail,
  } = useRescheduleAutomatedEmail();
  const { isOpen: isOpenConfirmSendEmail } = useSendAutomatedEmail();
  const { isOpen: isOpenStopCadenceModal, closeStopCadenceModal } = useStopCadence();

  const { selectedItems, setSelectedItems } = useSubhomeContext();

  return (
    <>
      <div
        className={clsx(styles._automated_filters_container, {
          [styles._hidden]: selectedItems.length > 0,
          [styles._transition]: selectedItems.length > 0,
        })}
      >
        <NewAutomatedFilters />
      </div>
      <div>
        <AutomatedLists />
        {isOpenCancelEmailModal && <CancelEmailModal handleClose={closeCancelEmailModal} open />}
        {isOpenStopCadenceModal && <StopCadenceModal handleClose={closeStopCadenceModal} open />}
        {isOpenScheduledModal && (
          <ScheduleEmailModal
            emails={[]}
            onClose={closeRescheduleAutomatedEmailModal}
            onSubmit={async ({ date }) => {
              closeRescheduleAutomatedEmailModal();
              rescheduleEmail({ datetime: date });
            }}
          />
        )}
        {isOpenConfirmSendEmail && (
          <ConfirmSendAutomatedEmailModal
            onSubmit={() => {
              setSelectedItems([]);
            }}
          />
        )}
      </div>
    </>
  );
}
