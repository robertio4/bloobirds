import { Fragment } from 'react';

import { BobjectWithDate } from '@bloobirds-it/types';
import { VirtualInfiniteScroll } from '@bloobirds-it/virtual-infinite-scroll';

import { DateGroupHeader } from '../../../../../dateGroupHeader/dateGroupHeader';
import SubhomeContentSkeleton from '../../../layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton';
import { NoFilterResults } from '../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import { OutboxCard } from '../card/outboxCard';
import { useOutboxTab } from '../hooks/useOutboxTab';

export const OutboxTabList = ({
  parentRef,
  isLoading,
}: {
  parentRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
}) => {
  const { items, isLoading: isValidating, fetchNextPage, totalMatching } = useOutboxTab();

  if (!(isValidating && isLoading) && items?.length === 0) {
    return <NoFilterResults />;
  }

  return (
    <>
      <VirtualInfiniteScroll
        parentRef={parentRef}
        rows={items}
        totalRows={totalMatching}
        isFetchingData={isValidating && isLoading}
        fetchNextPage={fetchNextPage}
        contentSkeleton={() => <SubhomeContentSkeleton visible />}
      >
        {(data: BobjectWithDate) =>
          data?.id?.objectId && (
            <Fragment key={data?.id?.objectId}>
              {data?.taskDate?.isFirstOfDay && <DateGroupHeader bobject={data} />}
              <OutboxCard key={data?.id?.objectId} bobject={data} />
            </Fragment>
          )
        }
      </VirtualInfiniteScroll>
    </>
  );
};
