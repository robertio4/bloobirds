import { Fragment } from 'react';

import { BobjectTypes, BobjectWithDate, SalesforceTabs, MessagesEvents } from '@bloobirds-it/types';
import { VirtualInfiniteScroll } from '@bloobirds-it/virtual-infinite-scroll';

import { CustomCard } from '../../../../../card/card';
import { DateGroupHeader } from '../../../../../dateGroupHeader/dateGroupHeader';
import SubhomeContentSkeleton from '../../../layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton';
import {
  EmptyTaskList,
  NoFilterResults,
} from '../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import { useSubhomeContext } from '../../../layouts/subhomeLayout/subhomeLayout';
import { useNurturingTab } from '../hooks/useNurturingTab';

export const NurturingTabList = ({
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
  } = useNurturingTab();

  const { haveFiltersBeenChanged } = useSubhomeContext();

  if (!(isValidating && isLoading) && tasks?.length === 0) {
    return haveFiltersBeenChanged ? <NoFilterResults /> : <EmptyTaskList />;
  }

  return (
    <VirtualInfiniteScroll
      parentRef={parentRef}
      rows={tasks}
      totalRows={totalMatching}
      isFetchingData={isLoading && isValidating}
      fetchNextPage={fetchNextPage}
      contentSkeleton={() => <SubhomeContentSkeleton visible />}
    >
      {(data: BobjectWithDate) =>
        data?.id?.objectId && (
          <Fragment key={data?.id?.objectId}>
            {data?.taskDate?.isFirstOfDay && <DateGroupHeader bobject={data} />}
            <CustomCard
              key={data?.id?.objectId}
              bobject={data}
              mutate={() => {
                window.dispatchEvent(
                  new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                    detail: { type: BobjectTypes.Task },
                  }),
                );
              }}
              tabName={SalesforceTabs.NURTURING}
              customTasks={customTasks}
            />
          </Fragment>
        )
      }
    </VirtualInfiniteScroll>
  );
};
