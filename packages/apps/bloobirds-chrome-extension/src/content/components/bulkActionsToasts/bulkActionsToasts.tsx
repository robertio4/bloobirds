import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton } from '@bloobirds-it/flamingo-ui';
import { useEventSubscription } from '@bloobirds-it/plover';
import clsx from 'clsx';
import { atom, useRecoilState } from 'recoil';

import { api } from '../../../utils/api';
import { useExtensionContext } from '../context';
import styles from './bulkActionsToasts.module.css';

export const inProgressBulkActionsState = atom({
  key: 'inProgressBulkActionsState',
  default: [],
});

const closedBulkActionsState = atom({
  key: 'closedBulkActionsState',
  default: [],
});

const stoppedBulkActionsState = atom({
  key: 'stoppedBulkActionsState',
  default: [],
});

export function BulkActionsToasts() {
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const { t } = useTranslation();

  const [inProgressBulkActions, setInProgressBulkActions] = useRecoilState<any[]>(
    inProgressBulkActionsState,
  );
  const [closedBulkActions, setClosedBulkActions] = useRecoilState<any[]>(closedBulkActionsState);
  const [stoppedActionIds, setStoppedActionIds] = useRecoilState<string[]>(stoppedBulkActionsState);
  const [bulkActionProgress, setBulkActionProgress] = useState({});

  useEventSubscription('bulkAction', data => {
    if (data.bulkHistoryId) {
      const hasFinished = data.percent === '100';
      const isStopped = stoppedActionIds.includes(data.bulkHistoryId);

      if (stoppedActionIds.includes(data.bulkHistoryId)) {
        return;
      }

      setInProgressBulkActions(actions => {
        const existingIndex = actions.findIndex(
          a =>
            (a.bulkHistoryId === data.bulkHistoryId &&
              a.uniqueNotificationId === data.uniqueNotificationId) ||
            (a.uniqueNotificationId === data.uniqueNotificationId && a.status === 'CREATING'),
        );

        const updatedActions = [...actions];

        if (existingIndex !== -1) {
          updatedActions.splice(existingIndex, 1);
        }

        updatedActions.splice(existingIndex, 0, {
          ...data,
          status: isStopped ? 'STOPPED' : hasFinished ? 'FINISHED' : 'IN_PROGRESS',
        });

        if (hasFinished) {
          setTimeout(() => {
            setInProgressBulkActions(actions =>
              actions.filter(
                a =>
                  a.bulkHistoryId !== data.bulkHistoryId ||
                  a.uniqueNotificationId !== data.uniqueNotificationId,
              ),
            );
          }, 30000);
        }

        setBulkActionProgress(prevProgress => {
          const updatedProgress = { ...prevProgress };
          updatedActions.forEach(ba => {
            updatedProgress[ba.bulkHistoryId] = Math.max(
              ba.percent,
              prevProgress[ba.bulkHistoryId] || 0,
            );
          });
          return updatedProgress;
        });

        return updatedActions;
      });
    }
  });

  const handleStopBulkAction = async bulkActionId => {
    setStoppedActionIds(ids => [...ids, bulkActionId]);
    const response = await api.get(`/bobjects/bulkAction/stopImport/${bulkActionId}`);
    if (response) {
      const finishedAction = inProgressBulkActions.find(a => a.bulkHistoryId === bulkActionId);
      setInProgressBulkActions(actions => [
        ...actions.filter(a => a.bulkHistoryId !== bulkActionId),
        { ...finishedAction, status: 'STOPPED' },
      ]);
    }
  };

  return (
    <div className={styles.floatingNotifications}>
      {inProgressBulkActions
        .filter(
          ba =>
            ba !== null &&
            ba.owner === settings?.user?.id &&
            (ba.bulkHistoryId !==
              closedBulkActions.find(ca => ca.bulkHistoryId === ba.bulkHistoryId)?.bulkHistoryId ||
              !ba.bulkHistoryId),
        )
        .map((bulkAction, idx) => {
          const progress = bulkActionProgress[bulkAction.bulkHistoryId] || 0;
          return (
            <div
              className={clsx(styles.floatingNotification)}
              key={`${bulkAction.bulkHistoryId}-${idx}`}
            >
              <div className={styles.floatingNotificationContent}>
                <div className={styles.floatingNotificationTitle}>
                  <span className={styles.floatingNotificationTitleText}>
                    {bulkAction.name}{' '}
                    {!/\d/.test(bulkAction.name) &&
                      bulkAction.name !== t('extension.bulkActionsToast.startingListBulk') &&
                      t('extension.bulkActionsToast.forNObjects', { count: bulkAction.total })}
                  </span>
                  <IconButton
                    className={styles.floatingNotificationClose}
                    name="cross"
                    size={20}
                    color="peanut"
                    onClick={() => {
                      setClosedBulkActions(closed => [...closed, bulkAction]);
                    }}
                  />
                </div>
                <div className={styles.floatingNotificationProgress}>
                  <div
                    className={clsx(styles.floatingNotificationProgressBar, {
                      [styles.completed]: bulkAction.status === 'FINISHED',
                      [styles.stopped]: bulkAction.status === 'STOPPED',
                      [styles.creating]: bulkAction.status === 'CREATING',
                    })}
                  >
                    <div
                      className={clsx(styles.floatingNotificationProgressBarFill, {
                        [styles.hideProgress]:
                          bulkAction.status === 'FINISHED' || bulkAction.status === 'CREATING',
                      })}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  {bulkAction.status === 'FINISHED' && (
                    <span className={styles.floatingNotificationProgressText}>
                      {t('extension.bulkActionsToast.completed')}
                    </span>
                  )}
                  {bulkAction.status === 'IN_PROGRESS' && (
                    <>
                      <span className={styles.floatingNotificationProgressText}>
                        {`${t('extension.bulkActionsToast.bulkAction')} ${progress}%`}
                      </span>
                      <div
                        className={styles.floatingNotificationProgressStopBox}
                        onClick={() => handleStopBulkAction(bulkAction.bulkHistoryId)}
                      >
                        <IconButton name="cross" size={16} color="white" />
                        <span className={styles.floatingNotificationProgressStop}>
                          {t('common.stop')}
                        </span>
                      </div>
                    </>
                  )}
                  {bulkAction.status === 'STOPPED' && (
                    <span className={styles.floatingNotificationProgressText}>
                      {t('common.stopped')}
                    </span>
                  )}
                  {bulkAction.status === 'CREATING' && (
                    <span className={styles.floatingNotificationProgressText}>
                      {t('common.retrieving')}...
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
