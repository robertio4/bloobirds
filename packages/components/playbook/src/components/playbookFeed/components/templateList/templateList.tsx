import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';

import { Icon, Skeleton, Text } from '@bloobirds-it/flamingo-ui';
import { MessagingTemplate } from '@bloobirds-it/types';
import { recoverScrollOfBox, removeScrollOfBox } from '@bloobirds-it/utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import clsx from 'clsx';
import { range } from 'lodash';

import styles from '../../playbookFeed.module.css';
import { TemplateListProps } from '../../playbookFeed.types';
import { BlankPageTooltip } from '../blankPageTooltip/blankPageTooltip';

const ActivityCardSkeleton = () => (
  <div>
    <Skeleton variant="text" width="50%" height={24} />
    <Skeleton variant="text" width="50%" height={24} />
  </div>
);

const ActivityFeedSkeleton = () => (
  <>
    {range(8).map(number => (
      <Fragment key={number}>
        <ActivityCardSkeleton />
      </Fragment>
    ))}
  </>
);

const AddNewButton = ({ handleClick }: { handleClick: () => void }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.templateAddButton} onClick={handleClick}>
      <Icon color="purple" name="plus" size={18} />
      <Text size="xs" color="purple" weight="bold">
        {t('playbook.addNew')}
      </Text>
    </div>
  );
};

export function TemplateListDisplay({
  shouldShowTooltip,
  sidePeekEnabled,
  displayedTemplates,
  handleAddTemplateClick,
  isTeamTemplates = false,
  renderTemplate,
  isSmartEmail,
  parentRef,
}: TemplateListProps) {
  const { t } = useTranslation();

  return (
    <>
      <VirtualInfiniteScroll
        templatesInfo={displayedTemplates}
        parentRef={parentRef}
        enableSelectedBackground
        enabledArrowNavigation
        hasNextPage={false}
        isFetchingData={false}
        contentSkeleton={() => (
          <div className={styles.skeleton}>
            <ActivityFeedSkeleton />
          </div>
        )}
        loaderSkeleton={() => (
          <div className={styles.skeleton}>
            <ActivityFeedSkeleton />
          </div>
        )}
        estimateSize={45}
        estimatedSkeletonHeight={130}
      >
        {(data, hasNext, isFirst) => {
          return (
            <>
              {isFirst && (
                <div
                  className={clsx(styles.templateSection, {
                    [styles.smartTemplateSection]: isSmartEmail,
                    [styles.templateSectionSidePeek]: sidePeekEnabled,
                  })}
                >
                  <Icon color="softPeanut" name={playbookSections[isFirst]?.icon} size={20} />
                  <Text size={'xs'} color="softPeanut" weight="bold">
                    {t(playbookSections[isFirst]?.titleKey)}
                  </Text>
                  {shouldShowTooltip && <BlankPageTooltip />}
                  <AddNewButton handleClick={handleAddTemplateClick} />
                </div>
              )}
              {renderTemplate(data, !hasNext && !isTeamTemplates)}
            </>
          );
        }}
      </VirtualInfiniteScroll>
    </>
  );
}

const Transition = ({ children }) => (
  <CSSTransition
    appear
    in={true}
    unmountOnExit
    timeout={300}
    classNames={{
      appear: styles._fade_enter,
      appearActive: styles._fade_enter_active,
      enter: styles._fade_enter,
      enterActive: styles._fade_enter_active,
      exit: styles._fade_exit,
      exitActive: styles._fade_exit_active,
    }}
  >
    {children}
  </CSSTransition>
);

interface VirtualInfiniteScrollProps {
  hasNextPage: boolean;
  templatesInfo: any;
  isFetchingData?: boolean;
  fetchNextPage?: () => void;
  children: (data: MessagingTemplate, hasNext: boolean, isFirst: string) => any;
  hasNextItem?: (index: number) => boolean;
  parentRef: React.RefObject<HTMLDivElement>;
  footer?: (scrollToTop: () => void) => React.ReactNode;
  contentSkeleton?: () => React.ReactNode;
  loaderSkeleton?: () => React.ReactNode;
  estimateSize?: number;
  estimatedSkeletonHeight?: number;
  fixedHeight?: boolean;
  enabledArrowNavigation?: boolean;
  enableSelectedBackground?: boolean;
  rowsLength?: number;
}

const playbookSections = {
  suggestedTemplates: {
    icon: 'suggestions',
    titleKey: 'playbook.tabContent.suggestedTemplates',
  },
  myTemplates: {
    icon: 'person',
    titleKey: 'playbook.tabContent.myTemplates',
  },
  mySnippets: {
    icon: 'person',
    titleKey: 'playbook.tabContent.mySnippets',
  },
  teamTemplates: {
    icon: 'company',
    titleKey: 'playbook.tabContent.teamTemplates',
  },
};

const VirtualInfiniteScroll = ({
  hasNextPage,
  templatesInfo,
  isFetchingData,
  children,
  hasNextItem,
  parentRef,
  footer,
  contentSkeleton,
  loaderSkeleton = () => (
    <Skeleton variant="rect" key={'skeletonItem'} width="100%" height="40px" />
  ),
  estimateSize = 40,
  estimatedSkeletonHeight = 40,
  fixedHeight = false,
  rowsLength,
}: VirtualInfiniteScrollProps) => {
  const { firstOfEach, ...templates } = templatesInfo;
  const rows = templates && Object.values(templates).flat();
  rowsLength = rowsLength ?? rows?.length;

  const dataCount = hasNextPage ? rowsLength + 1 : rowsLength;

  const rowVirtualizer = useVirtualizer({
    count: dataCount,
    getScrollElement: () => parentRef?.current,
    estimateSize: () => estimateSize,
    overscan: 1,
  });

  const scrollHeight = parentRef?.current?.scrollHeight;
  if (
    contentSkeleton &&
    ((isFetchingData && !rows) || scrollHeight === undefined || scrollHeight === 0)
  ) {
    return <Transition>{contentSkeleton()}</Transition>;
  }

  return (
    <div
      style={{
        height:
          rowVirtualizer.getTotalSize() + (isFetchingData ? estimatedSkeletonHeight || 100 : 0),
        width: '100%',
        position: 'relative',
      }}
      onMouseEnter={removeScrollOfBox}
      onMouseLeave={recoverScrollOfBox}
    >
      {rowVirtualizer.getVirtualItems().map(virtualItem => {
        const isLoaderRow = virtualItem.index > rows?.length - 1;
        const data = rows[virtualItem.index] as MessagingTemplate;
        const showNext =
          (hasNextItem && hasNextItem(virtualItem.index)) ?? !!rows[virtualItem.index + 1];

        return (
          <div
            key={virtualItem.key}
            data-index={virtualItem.index}
            ref={fixedHeight ? undefined : rowVirtualizer.measureElement}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: fixedHeight ? `${virtualItem.size}px` : undefined,
              transform: `translateY(${virtualItem.start}px)`,
              background: 'transparent',
            }}
          >
            {isLoaderRow ? (
              hasNextPage ? (
                <div style={{ height: `${estimateSize}px` }}>
                  <Transition>{loaderSkeleton()}</Transition>
                </div>
              ) : (
                footer && (
                  <div style={{ height: `${estimateSize}px` }}>
                    {footer(() => rowVirtualizer.scrollToIndex(0))}
                  </div>
                )
              )
            ) : (
              children(data, showNext, firstOfEach[data?.id])
            )}
          </div>
        );
      })}
    </div>
  );
};
