import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Spinner } from '@bloobirds-it/flamingo-ui';
import { TASK_TYPE } from '@bloobirds-it/types';
import classNames from 'clsx';

import { useTasks, useTasksPage } from '../../../../../../hooks/useTasks';
import styles from './sidebarTasks.module.css';
import { AddLeadTaskCard } from './taskCard';

const SidebarTasks = ({ show }) => {
  const { tasks, isLoading, totalMatching } = useTasks(TASK_TYPE.ADD_LEADS_TO_QC);
  const { hasNextPage, loadNextPage, setHasNextPage } = useTasksPage();

  useEffect(() => {
    if (tasks?.length === totalMatching) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  }, [tasks, totalMatching]);

  return (
    <div
      id="sidebarTasks"
      className={classNames(styles.root, {
        [styles.transition]: !show,
      })}
    >
      {!isLoading && tasks.length === 0 ? (
        <div className={styles.emptyList}>
          <p>
            <span role="img" aria-label="Well done." className={styles.emptyListEmoji}>
              👏
            </span>
          </p>
          <p>All tasks in this category are completed</p>
        </div>
      ) : (
        <>
          <InfiniteScroll
            dataLength={tasks.length}
            hasMore={hasNextPage}
            className={styles._list_wrapper}
            next={loadNextPage}
            scrollThreshold={0.75}
            scrollableTarget="sidebarTasks"
            loader={
              <div className={styles.loaderWrapper}>
                <Spinner name="loadingCircle" />
              </div>
            }
          >
            {tasks !== undefined &&
              tasks.length > 0 &&
              tasks.map(bobject => (
                <AddLeadTaskCard bobject={bobject} key={`bobject-${bobject.id.objectId}`} />
              ))}
          </InfiniteScroll>
        </>
      )}
    </div>
  );
};

export default SidebarTasks;
