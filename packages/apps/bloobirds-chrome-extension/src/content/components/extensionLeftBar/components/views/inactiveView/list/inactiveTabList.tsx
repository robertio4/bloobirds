import { Bobject, SalesforceTabs, MessagesEvents } from '@bloobirds-it/types';
import { VirtualInfiniteScroll } from '@bloobirds-it/virtual-infinite-scroll';

import { CustomCard } from '../../../../../card/card';
import SubhomeContentSkeleton from '../../../layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton';
import { NoFilterResults } from '../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import { useSubhomeContext } from '../../../layouts/subhomeLayout/subhomeLayout';
import { useInactiveItems } from '../hooks/useInactiveTab';

export const InactiveTabList = ({
  parentRef,
  isLoading,
}: {
  parentRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
}) => {
  const { tabBobject } = useSubhomeContext();

  const { items, isLoading: isValidating, totalMatching, fetchNextPage } = useInactiveItems(
    tabBobject,
  );

  if (!(isValidating && isLoading) && items?.length === 0) {
    return <NoFilterResults />;
  }

  return (
    <>
      <VirtualInfiniteScroll
        parentRef={parentRef}
        rows={items}
        totalRows={totalMatching}
        isFetchingData={isLoading && isValidating}
        fetchNextPage={fetchNextPage}
        contentSkeleton={() => <SubhomeContentSkeleton visible />}
      >
        {(data: Bobject) =>
          data?.id?.objectId && (
            <CustomCard
              key={data?.id?.objectId}
              bobject={data}
              tabName={SalesforceTabs.INACTIVE}
              mutate={() => {
                window.dispatchEvent(
                  new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                    detail: { type: tabBobject },
                  }),
                );
              }}
              isSelectable
            />
          )
        }
      </VirtualInfiniteScroll>
    </>
  );
};
