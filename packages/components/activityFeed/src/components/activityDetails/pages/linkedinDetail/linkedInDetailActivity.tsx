import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';

import { ActivityTimelineItem } from '@bloobirds-it/activity-timeline-item';
import { Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { useSyncBobjectStatus } from '@bloobirds-it/hooks';
import { InfoWarningSync } from '@bloobirds-it/misc';
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  DataModelResponse,
  GroupedLinkedInMessage,
} from '@bloobirds-it/types';
import { getTextFromLogicRole } from '@bloobirds-it/utils';
import clsx from 'clsx';

import styles from './linkedInDetail.module.css';

export interface DetailsActivityProps {
  activity: Bobject;
  dataModel: DataModelResponse;
  items: GroupedLinkedInMessage[];
  totalMatching: number;
  fetchNextPage: () => void;
  isLoading: boolean;
}

export const LinkedInDetailedActivity = ({
  activity,
  dataModel,
  items,
  totalMatching,
  fetchNextPage,
  isLoading,
}: DetailsActivityProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'linkedInDetail' });
  const ref = useRef();
  const { bobjectsSync } = useSyncBobjectStatus(items?.[0]?.id?.accountId, items);

  const hasNextPage = useMemo(() => {
    return !(items?.length === totalMatching);
  }, [items?.length, totalMatching]);

  if (!items || isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner name="loadingCircle" />
      </div>
    );
  }

  return (
    <>
      <ActivityTimelineItem
        activity={activity}
        key={activity?.id?.value}
        startDisplayDivider={false}
        endDisplayDivider={false}
        extended
        alternativeDescription
        activeHover={false}
        dataModel={dataModel}
      />
      <div className={styles._messages_wrapper} id="conversationContent" ref={ref}>
        <InfiniteScroll
          dataLength={items.length}
          hasMore={hasNextPage}
          next={fetchNextPage}
          inverse={true}
          height="100%"
          scrollThreshold={0.75}
          scrollableTarget="conversationContent"
          loader={
            <div className={styles.loading}>
              <Spinner name="dots" />
            </div>
          }
          style={{ display: 'flex', flexDirection: 'column-reverse' }}
        >
          <div key={`${activity?.id?.value}-list`} className={styles._conversation_wrapper}>
            {items.map((data: any) => {
              const messageText = getTextFromLogicRole(
                data,
                ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY,
              );
              const messageDirection = getTextFromLogicRole(
                data,
                ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION,
              );

              const syncStatus = bobjectsSync?.find(sync => sync?.bobjectId === data?.id?.objectId)
                ?.syncStatusOk;

              return (
                <div key={data?.id?.value}>
                  {data?.messageDate?.isFirstOfDay && (
                    <div className={styles._date_separator}>
                      <Text color="softPeanut" size="s" align="center">
                        {data?.messageDate?.formattedDate}
                      </Text>
                    </div>
                  )}
                  <div
                    className={clsx(styles._message, {
                      [styles._message_incoming]: messageDirection === ACTIVITY_DIRECTION.INCOMING,
                      [styles._message_outgoing]: messageDirection === ACTIVITY_DIRECTION.OUTGOING,
                    })}
                  >
                    <div className={styles._message_body}>
                      <div
                        className={clsx(styles._svg_wrapper, {
                          [styles._svg_incoming]: messageDirection === ACTIVITY_DIRECTION.INCOMING,
                          [styles._svg_outgoing]: messageDirection === ACTIVITY_DIRECTION.OUTGOING,
                        })}
                      >
                        {syncStatus !== undefined && !syncStatus && (
                          <InfoWarningSync type={'message'} id={data?.id} />
                        )}
                      </div>
                      <Text size="s" className={styles._message_body}>
                        {messageText === 'undefined' ? t('messageNotAvailable') : messageText}
                      </Text>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};
