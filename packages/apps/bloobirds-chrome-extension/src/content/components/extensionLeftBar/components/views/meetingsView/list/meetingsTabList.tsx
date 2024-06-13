import { Fragment } from 'react';

import { BobjectWithDate } from '@bloobirds-it/types';
import { VirtualInfiniteScroll } from '@bloobirds-it/virtual-infinite-scroll';

import { DateGroupHeader } from '../../../../../dateGroupHeader/dateGroupHeader';
import { MeetingCard } from '../../../../../meetingCard/meetingCard';
import SubhomeContentSkeleton from '../../../layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton';
import { NoFilterResults } from '../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import { useMeetingsTab } from '../hooks/useMeetingsTab';

export const MeetingsTabList = ({
  parentRef,
  isLoading,
}: {
  parentRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
}) => {
  const {
    items: activities,
    isLoading: isValidating,
    totalMatching,
    fetchNextPage,
    mutate,
  } = useMeetingsTab();

  if (!(isValidating && isLoading) && activities?.length === 0) {
    return <NoFilterResults />;
  }

  return (
    <VirtualInfiniteScroll
      parentRef={parentRef}
      rows={activities}
      totalRows={totalMatching}
      isFetchingData={isLoading && isValidating}
      fetchNextPage={fetchNextPage}
      contentSkeleton={() => <SubhomeContentSkeleton visible />}
    >
      {(data: BobjectWithDate) =>
        data?.id?.objectId && (
          <Fragment key={data?.id?.objectId}>
            {data?.taskDate?.isFirstOfDay && <DateGroupHeader bobject={data} />}
            <MeetingCard key={data?.id?.objectId} activity={data} mutate={mutate} />
          </Fragment>
        )
      }
    </VirtualInfiniteScroll>
  );
};
