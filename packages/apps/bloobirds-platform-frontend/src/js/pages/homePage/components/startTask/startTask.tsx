import React, { useEffect, useState } from 'react';

import { Button, Icon, Spinner } from '@bloobirds-it/flamingo-ui';
import { useMediaQuery, useSelectAll } from '@bloobirds-it/hooks';
import { Bobject } from '@bloobirds-it/types';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import { StartTaskSettings } from '../../../../components/startTaskSettings/startTaskSettings';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useTaskNavigationStorage } from '../../../../hooks';
import styles from '../../homePage.module.css';

export const StartTask = ({
  isSales,
  disabled,
  withSales = false,
}: {
  isSales: boolean;
  disabled: boolean;
  withSales?: boolean;
}) => {
  // This is needed to correctly set the task navigation settings
  const [changingTaskNavigationSettings, setChangingTaskNavigationSettings] = useState(false);
  const { selectedItems, initialItems } = useSelectAll();
  const { startNavigation, setSalesNavigation } = useTaskNavigationStorage();
  const { isSmallDesktop } = useMediaQuery();

  // Set the task navigation settings
  useEffect(() => setSalesNavigation(isSales), [isSales]);

  return (
    <>
      <StartTaskSettings
        callingFromSalesPage={isSales}
        updateLoading={setChangingTaskNavigationSettings}
      />
      <div
        className={clsx(
          styles._start_button,
          (initialItems?.length === 0 || disabled) && styles.notAllowed,
        )}
      >
        <Button
          color={
            initialItems?.length !== 0 && !disabled
              ? changingTaskNavigationSettings
                ? 'softBloobirds'
                : 'bloobirds'
              : 'verySoftPeanut'
          }
          className={styles.startButton}
          size="small"
          onClick={() => {
            if (!changingTaskNavigationSettings) {
              mixpanel.track(MIXPANEL_EVENTS.HOME_STARTED_TASKS);
              const navigableTasks = selectedItems?.length > 0 ? selectedItems : initialItems;
              startNavigation(navigableTasks as Bobject[]);
            }
          }}
          disabled={initialItems?.length === 0 || disabled}
        >
          {changingTaskNavigationSettings && (
            <div className={styles._button_spinner}>
              <Spinner color={'white'} name="loadingCircle" size={14} />
            </div>
          )}
          {!changingTaskNavigationSettings ? (
            withSales || isSmallDesktop ? (
              <Icon name="play" size={16} color="white" />
            ) : (
              'Start '
            )
          ) : (
            ''
          )}
          {(selectedItems?.length || initialItems?.length) && !disabled
            ? changingTaskNavigationSettings
              ? ''
              : `(${selectedItems?.length || initialItems?.length})`
            : ''}
        </Button>
      </div>
    </>
  );
};
