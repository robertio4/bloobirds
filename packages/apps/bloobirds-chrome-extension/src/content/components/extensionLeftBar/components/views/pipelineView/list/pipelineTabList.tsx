import { Bobject, BobjectTypes, SalesforceTabs, MessagesEvents } from '@bloobirds-it/types';
import { VirtualInfiniteScroll } from '@bloobirds-it/virtual-infinite-scroll';

import { CustomCard } from '../../../../../card/card';
import { useExtensionLeftBarContext } from '../../../../extensionLeftBarContext';
import SubhomeContentSkeleton from '../../../layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton';
import { NoFilterResults } from '../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';

interface ItemHandlingProps {
  items: Bobject[];
  isLoading: boolean;
  totalMatching: number;
  mutate: () => void;
  fetchNextPage: () => void;
}
export const PipelineTabList = ({
  parentRef,
  itemHandling,
  isLoading,
  bobjectType,
}: {
  parentRef: React.RefObject<HTMLDivElement>;
  itemHandling: ItemHandlingProps;
  isLoading: boolean;
  bobjectType: BobjectTypes;
}) => {
  const { pipelineLastVisitDates } = useExtensionLeftBarContext();
  const { items, isLoading: isValidating, totalMatching, fetchNextPage } = itemHandling;
  if (!(isValidating && isLoading) && items?.length === 0) {
    return <NoFilterResults />;
  }
  const isNewlyAssignedBobject = (bobject: Bobject, bobjectType) => {
    const lastVisitedTabDate = pipelineLastVisitDates[bobjectType];
    const bobjectAssignedDate = new Date(
      bobject?.fields?.find(field => field.logicRole.includes('LAST_ASSIGNED_DATE')).value,
    );
    return lastVisitedTabDate && bobjectAssignedDate && bobjectAssignedDate > lastVisitedTabDate;
  };

  return (
    <VirtualInfiniteScroll
      parentRef={parentRef}
      rows={items}
      totalRows={totalMatching}
      isFetchingData={isValidating && isLoading}
      fetchNextPage={fetchNextPage}
      contentSkeleton={() => <SubhomeContentSkeleton visible />}
    >
      {(data: Bobject) =>
        data?.id?.objectId && (
          <CustomCard
            key={data?.id?.objectId}
            bobject={data}
            mutate={() => {
              window.dispatchEvent(
                new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                  detail: { type: bobjectType },
                }),
              );
            }}
            showNew={isNewlyAssignedBobject(data, bobjectType)}
            tabName={SalesforceTabs.PIPELINE}
            isSelectable
          />
        )
      }
    </VirtualInfiniteScroll>
  );
};
