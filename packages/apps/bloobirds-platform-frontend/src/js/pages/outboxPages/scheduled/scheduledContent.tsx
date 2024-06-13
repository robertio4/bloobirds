import React, { Fragment, useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Label, Text } from '@bloobirds-it/flamingo-ui';
import { TASK_FIELDS_LOGIC_ROLE, Bobject, BobjectTypes } from '@bloobirds-it/types';

import ConfirmSendAutomatedEmailModal from '../../../components/confirmSendAutomatedEmailModal/confirmSendAutomatedEmailModal';
import { NoScheduledEmailsTooltip } from '../../../components/discoveryTooltips/outboxTourTooltips/noScheduledEmailsTooltip';
import { ScheduledActionsTooltip } from '../../../components/discoveryTooltips/outboxTourTooltips/scheduledActionsTooltip';
import { ScheduledEmailsTooltip } from '../../../components/discoveryTooltips/outboxTourTooltips/scheduledEmailsTooltip';
import { useQuickStartEnabled } from '../../../hooks/useQuickStartGuide';
import useSendAutomatedEmail from '../../../hooks/useSendAutomatedEmail';
import SubhomeContentSkeleton from '../../../layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton';
import SubhomeEmptyContent from '../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import { addTaskDateGrouping } from '../../../utils/tasks.utils';
import { checkIsOverdue } from './scheduled.utils';
import { ScheduledCard } from './scheduledCard/scheduledCard';
import styles from './scheduledContent.module.css';
import { NewScheduledFilters } from './scheduledFilters/newScheduledFilters';
import { ScheduledFilters } from './scheduledFilters/scheduledFilters';
import NewScheduledFooter from './scheduledFooter/newScheduledFooter';
import ScheduledFooter from './scheduledFooter/scheduledFooter';
import {
  useOutboxScheduledFilters,
  useOutboxScheduledPage,
  useOutboxScheduledTasks,
} from './useOutboxScheduled';

interface TaskDate {
  isFirstOfDay: boolean;
  day: Date;
  formattedDate: string;
  prefix: string;
  hashDate: string;
}

interface BobjectWithHeading extends Bobject<BobjectTypes.Task> {
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

const ScheduledLists = () => {
  const { items: tasks, isLoading, totalMatching, resetItems } = useOutboxScheduledTasks();
  const { usingDefaultFiltersExcludeDate } = useOutboxScheduledFilters();
  const { hasNextPage, loadNextPage, setHasNextPage } = useOutboxScheduledPage();
  const hasQSGEnabled = useQuickStartEnabled();
  const filteredTasks = useMemo(
    () =>
      usingDefaultFiltersExcludeDate
        ? addTaskDateGrouping(tasks, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, checkIsOverdue)
        : tasks,
    [tasks, usingDefaultFiltersExcludeDate],
  );

  useEffect(() => {
    if (filteredTasks?.length === totalMatching) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  }, [filteredTasks, totalMatching]);

  useEffect(
    () => () => {
      resetItems();
    },
    [],
  );

  return (
    <>
      {!isLoading && filteredTasks?.length === 0 ? (
        <>
          <SubhomeEmptyContent />
          <NoScheduledEmailsTooltip />
        </>
      ) : (
        <>
          <div className={styles._number_of_elements}>
            {hasQSGEnabled && <ScheduledActionsTooltip defaultTooltipVisible />}
            {totalMatching !== undefined && !Number.isNaN(totalMatching) && (
              <Label size="small">{`${totalMatching} results`}</Label>
            )}
          </div>
          <InfiniteScroll
            dataLength={filteredTasks?.length}
            hasMore={hasNextPage}
            className={styles._list_wrapper}
            next={loadNextPage}
            scrollThreshold={0.75}
            scrollableTarget="subhomeContent"
            loader={<SubhomeContentSkeleton visible />}
          >
            {hasQSGEnabled && <ScheduledEmailsTooltip defaultTooltipVisible />}
            {filteredTasks?.map((schedule: BobjectWithHeading, index: number) => {
              const nextBobject = filteredTasks[index + 1];
              const showNextLine = nextBobject && !nextBobject?.taskDate?.isFirstOfDay;
              return (
                <Fragment key={schedule.id.value}>
                  {schedule.taskDate?.isFirstOfDay && <DateGroupHeader bobject={schedule} />}
                  <ScheduledCard schedule={schedule} showNextLine={showNextLine} />
                </Fragment>
              );
            })}
          </InfiniteScroll>
          <NewScheduledFooter />
        </>
      )}
    </>
  );
};

export function ScheduledContent() {
  const { isOpen: isOpenConfirmSendEmail } = useSendAutomatedEmail();

  return (
    <>
      <div>
        <NewScheduledFilters />
      </div>
      <div>
        <ScheduledLists />
        {isOpenConfirmSendEmail && <ConfirmSendAutomatedEmailModal />}
      </div>
    </>
  );
}
