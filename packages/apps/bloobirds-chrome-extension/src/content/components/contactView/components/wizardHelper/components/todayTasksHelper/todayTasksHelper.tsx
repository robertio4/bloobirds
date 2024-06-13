import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Button, IconButton, Text } from '@bloobirds-it/flamingo-ui';
import { useCustomTasks, useTasksFeed, useQuickLogActivity } from '@bloobirds-it/hooks';
import { BobjectTypes } from '@bloobirds-it/types';
import clsx from 'clsx';

import { ContactViewSubTab } from '../../../../../../../types/contactView';
import { useExtensionContext } from '../../../../../context';
import { checkIsOverdue } from '../../../../../extensionLeftBar/extensionLeftBar.utils';
import { useContactViewContext } from '../../../../context/contactViewContext';
import { useActivityFeed } from '../../../../hooks/useActivityFeed';
import { useSubscribeListeners } from '../../../../hooks/useSubscribeListeners';
import { WizardMiniCard } from '../../../miniCard/miniCard';
import Arrow from '../../assets/Arrow.png?base64';
import styles from '../../wizardHelper.module.css';
import { CadenceManagementButton } from '../cadenceManagementButton/cadenceManagementButton';

export const TodayTasksHelper = ({
  hasCadenceTasks,
  isLoading,
  minimized,
  toggleCadenceControlVisibility,
}) => {
  const { actionsDisabled, setActiveSubTab } = useContactViewContext();
  const {
    useGetActiveBobject,
    useGetActiveBobjectContext,
    useGetTaskId,
    useGetSidePeekEnabled,
  } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const contextData = useGetActiveBobjectContext();
  const { tasks, mutate: tasksMutate } = useTasksFeed(
    activeBobject,
    contextData,
    useSubscribeListeners,
  );
  const { meetingActivities, mutateMeetingActivities: activityMutate } = useActivityFeed();
  useSubscribeListeners(BobjectTypes.Activity, tasksMutate);
  useSubscribeListeners(BobjectTypes.Activity, activityMutate);
  const taskId = useGetTaskId();

  const currentDate = new Date();
  // Show today tasks and tasks that are overdue in the previous 7 days
  const displayableTasks = tasks?.filter(task => {
    const taskDate = new Date(task?.taskDate?.day);
    const timeDifference = currentDate.getTime() - taskDate.getTime();
    const differenceInDays = timeDifference / (1000 * 60 * 60 * 24);
    return differenceInDays >= 0 && differenceInDays <= 7;
  });
  const wizardItems = [...(meetingActivities || []), ...(displayableTasks || [])];
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const hasTodayItems = wizardItems?.length > 0;
  const isFirstItem = selectedItemIndex === 0;
  const isLastItem = selectedItemIndex === wizardItems?.length - 1;
  const displayedItem = wizardItems?.[selectedItemIndex];
  const sidePeekEnabled = useGetSidePeekEnabled();
  const { logCustomActivity } = useQuickLogActivity();
  const { customTasks } = useCustomTasks({ disabled: false });
  const { t } = useTranslation();

  useEffect(() => {
    if (taskId) {
      const selectedTask = tasks.find(({ id }) => id.value === taskId);
      if (selectedTask) {
        const indexOfTasks = wizardItems.indexOf(selectedTask);
        setSelectedItemIndex(indexOfTasks >= 0 ? indexOfTasks : 0);
      }
    }
  }, [taskId, tasks?.length, wizardItems?.length]);

  useEffect(() => {
    if (!isLoading && !taskId) {
      setSelectedItemIndex(0);
    }
  }, [isLoading]);

  function updateIndexOnSave() {
    if (isLastItem) {
      setSelectedItemIndex(0);
    }
  }
  const titleClasses = clsx(styles.titleContainer, {
    [styles.wizard__title_sidePeek]: sidePeekEnabled,
    [styles.titleContainerMinimized]: minimized && hasTodayItems,
    [styles.titleContainerMinimizedNoTasks]: minimized && !hasTodayItems,
  });

  return (
    <>
      <div>
        <div className={titleClasses}>
          <Text size="xxs" color="verySoftBloobirds" className={styles.wizard__title} weight="bold">
            {t('sidePeek.overview.wizardHelper.todayTasks')}
          </Text>
          <CadenceManagementButton
            isActive={hasCadenceTasks}
            isDisabled={actionsDisabled}
            toggleCadenceControlVisibility={toggleCadenceControlVisibility}
            isProcessingTasks={isLoading}
          />
          <span
            className={clsx(styles.iconsContainer, {
              [styles.iconsContainerWithTasks]: wizardItems?.length > 1,
              [styles.iconsFirstTask]: isFirstItem && wizardItems?.length > 1,
              [styles.iconsLastTask]: isLastItem && wizardItems?.length > 1,
              [styles.iconsContainerSidePeek]: sidePeekEnabled,
            })}
          >
            {hasTodayItems && (
              <>
                <IconButton
                  color={isFirstItem ? 'verySoftBloobirds' : 'white'}
                  name="arrowLeft"
                  size={16}
                  onClick={() => !isFirstItem && setSelectedItemIndex(selectedItemIndex - 1)}
                />
                <IconButton
                  color={isLastItem ? 'verySoftBloobirds' : 'white'}
                  name="arrowRight"
                  size={16}
                  onClick={() => !isLastItem && setSelectedItemIndex(selectedItemIndex + 1)}
                />
              </>
            )}
            <Button
              size="small"
              uppercase={false}
              onClick={() => setActiveSubTab(ContactViewSubTab.TASKS)}
            >
              {t('sidePeek.overview.wizardHelper.allTasks')}
            </Button>
          </span>
        </div>
        {hasTodayItems ? (
          <WizardMiniCard
            bobject={displayedItem}
            isOverdue={displayedItem && checkIsOverdue(displayedItem)}
            updateIndexOnSave={updateIndexOnSave}
            minimized={minimized}
            customTasks={customTasks}
            logCustomActivity={logCustomActivity}
          />
        ) : (
          !minimized && <NoTasksForToday t={t} />
        )}
      </div>
    </>
  );
};

const NoTasksForToday = ({ t }) => {
  return (
    <div className={styles.noTasksBanner}>
      <img src={Arrow} alt="arrow-icon" />
      <Text align="center" size="xs" color="white" className={styles.noTasksBannerText}>
        {t('sidePeek.overview.wizardHelper.noTasksForToday')}
      </Text>
      <Text align="center" size="xs" color="white">
        <Trans i18nKey="sidePeek.overview.wizardHelper.clickToViewFutureTasks" />
      </Text>
    </div>
  );
};
