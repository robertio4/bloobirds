import { Fragment, useEffect } from 'react';

import { useQuickLogActivity } from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectTypes,
  BobjectWithDate,
  MessagesEvents,
  SalesforceTabs,
  TASK_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { VirtualInfiniteScroll } from '@bloobirds-it/virtual-infinite-scroll';

import { getFieldByLogicRole } from '../../../../../../../utils/bobjects.utils';
import { CustomCard } from '../../../../../card/card';
import { useExtensionContext } from '../../../../../context';
import { DateGroupHeader } from '../../../../../dateGroupHeader/dateGroupHeader';
import SubhomeContentSkeleton from '../../../layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton';
import { NoFilterResults } from '../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import { useTasksTab } from '../hooks/useTasksTab';

export const TasksTabList = ({
  parentRef,
  isLoading,
}: {
  parentRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
}) => {
  const {
    items: tasks,
    isLoading: isValidating,
    totalMatching,
    fetchNextPage,
    customTasks,
  } = useTasksTab();
  const { setCurrentTask, useGetCurrentTask, setContactViewBobjectId } = useExtensionContext();
  const currentTask = useGetCurrentTask();
  const { logCustomActivity } = useQuickLogActivity();

  useEffect(() => {
    if (currentTask && tasks) {
      const updatedTask = tasks.find(t => t.id.objectId === currentTask.id.objectId);
      const company = getFieldByLogicRole(updatedTask, TASK_FIELDS_LOGIC_ROLE.COMPANY)
        ?.referencedBobject;
      const lead = getFieldByLogicRole(updatedTask, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
      const opportunity = getFieldByLogicRole(updatedTask, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
        ?.referencedBobject;
      if (opportunity) {
        setContactViewBobjectId(opportunity?.id.value);
      } else if (lead) {
        setContactViewBobjectId(lead?.id.value);
      } else if (company) {
        setContactViewBobjectId(company?.id.value);
      } else {
        setCurrentTask(updatedTask);
      }
    }
  }, [tasks]);

  if (!(isValidating && isLoading) && tasks?.length === 0) {
    return <NoFilterResults />;
  }

  return (
    <VirtualInfiniteScroll
      parentRef={parentRef}
      rows={tasks}
      totalRows={totalMatching}
      isFetchingData={isValidating || isLoading || !customTasks}
      fetchNextPage={fetchNextPage}
      contentSkeleton={() => <SubhomeContentSkeleton visible />}
    >
      {(data: BobjectWithDate) =>
        data?.id?.objectId && (
          <Fragment key={data?.id?.objectId}>
            {data?.taskDate?.isFirstOfDay && <DateGroupHeader bobject={data} />}
            <CustomCard
              key={data?.id?.objectId}
              bobject={data as Bobject}
              mutate={() => {
                window.dispatchEvent(
                  new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                    detail: { type: BobjectTypes.Task },
                  }),
                );
              }}
              tabName={SalesforceTabs.TASKS}
              customTasks={customTasks}
              logCustomActivity={logCustomActivity}
            />
          </Fragment>
        )
      }
    </VirtualInfiniteScroll>
  );
};
