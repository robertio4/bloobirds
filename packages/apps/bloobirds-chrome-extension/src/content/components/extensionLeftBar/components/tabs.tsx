import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useActiveUserSettings,
  useCadenceV2Enabled,
  useMediaQuery,
  useUserHelpers,
  useActiveAccountId,
  useHasNewTaskFeed,
} from '@bloobirds-it/hooks';
import {
  ExtensionHelperKeys,
  SalesforceTabs,
  SalesforceTabsIcon,
  UserPermission,
} from '@bloobirds-it/types';

import { LeftBarButton, LeftBarUserDropdown } from '../../leftBarFooter/leftBarFooter';
import TaskSidebar, { TaskTab } from '../../taskSidebar/taskSidebar';
import { redirectButtonsLeftBar } from '../extensionLeftBar.constants';
import { useExtensionLeftBarContext } from '../extensionLeftBarContext';
import { useInactiveGlobalAggregation } from './views/inactiveView/hooks/useInactiveTab';
import { useInboxAllGlobalAggregation } from './views/inboxView/hooks/useInboxTab';
import { useMeetingsGlobalAggregation } from './views/meetingsView/hooks/useMeetingsTab';
import { useTasksGlobalAggregation } from './views/newTasksView/hooks/useTasksTab';
import { useNurturingAllGlobalAggregation } from './views/nurturingView/hooks/useNurturingTab';
import { useOutboxAllGlobalAggregation } from './views/outboxView/hooks/useOutboxTab';
import { useTasksAggregation } from './views/tasksView/hooks/useTasksTab';
import { LeftBarTooltip, lBTVisibilityType } from './views/tooltip/leftBarTooltip';

export const LeftBarFooter = () => {
  const { settings } = useActiveUserSettings();
  const canSeeDashboards = settings?.user?.permissions?.includes(
    UserPermission.VIEW_DASHBOARDS_TAB,
  );
  const { isSmallDesktop } = useMediaQuery();
  const hasCadencePermission = settings?.user?.permissions?.includes(UserPermission.VIEW_CADENCES);
  const cadenceV2Enabled = useCadenceV2Enabled(settings?.account?.id);
  const { t } = useTranslation();

  const [hideButtons, setHideButtons] = useState(window.innerHeight < 820);

  useEffect(() => {
    const handleResize = () => {
      setHideButtons(window.innerHeight < 820);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const userEmail = settings?.user?.email;

  return (
    <div style={{ marginBottom: '30%' }}>
      {!hideButtons &&
        redirectButtonsLeftBar(userEmail).map(({ iconName, label, url, externalUrl }, idx) => {
          if (label === 'Cadences' && (!cadenceV2Enabled || !hasCadencePermission)) {
            return <></>;
          }
          if (label === 'Dashboards' && !canSeeDashboards) {
            return <></>;
          }
          return (
            <LeftBarButton
              key={label + '-' + idx}
              iconName={iconName}
              url={url}
              externalUrl={externalUrl}
            >
              {t(label)}
            </LeftBarButton>
          );
        })}
      <LeftBarUserDropdown size={isSmallDesktop ? 'small' : 'medium'} hideButtons={hideButtons} />
    </div>
  );
};

function TasksTab() {
  const { t } = useTranslation();
  const { setCurrentTab, currentTab } = useExtensionLeftBarContext();
  const counter = useTasksAggregation();

  return (
    <TaskTab
      icon={SalesforceTabsIcon.TASKS}
      counter={counter}
      colors={{ basic: 'softGrape', contrast: 'softPeanut' }}
      name={SalesforceTabs.TASKS}
      onClick={() => {
        setCurrentTab(currentTab === SalesforceTabs.TASKS ? null : SalesforceTabs.TASKS);
      }}
      isHighlighted={currentTab === SalesforceTabs.TASKS}
    >
      {t('leftBar.tasks')}
    </TaskTab>
  );
}

function NewTasksTab() {
  const { t } = useTranslation();
  const { setCurrentTab, currentTab } = useExtensionLeftBarContext();

  const counter = useTasksGlobalAggregation();

  return (
    <TaskTab
      icon={SalesforceTabsIcon.TASKS}
      counter={counter}
      colors={{ basic: 'softGrape', contrast: 'softPeanut' }}
      name={SalesforceTabs.TASKS}
      onClick={() => {
        setCurrentTab(currentTab === SalesforceTabs.TASKS ? null : SalesforceTabs.TASKS);
      }}
      isHighlighted={currentTab === SalesforceTabs.TASKS}
    >
      {t('leftBar.tasks')}
    </TaskTab>
  );
}

function InboxTab() {
  const { t } = useTranslation();
  const { setCurrentTab, currentTab } = useExtensionLeftBarContext();
  const { items } = useInboxAllGlobalAggregation();

  return (
    <TaskTab
      icon={SalesforceTabsIcon.INBOX}
      counter={items?.length}
      colors={{ basic: 'lightPeanut', contrast: 'peanut' }}
      name={SalesforceTabs.INBOX}
      onClick={() => {
        setCurrentTab(currentTab === SalesforceTabs.INBOX ? null : SalesforceTabs.INBOX);
      }}
      isHighlighted={currentTab === SalesforceTabs.INBOX}
    >
      {t('leftBar.inbox')}
    </TaskTab>
  );
}

function OutboxTab() {
  const { t } = useTranslation();
  const { setCurrentTab, currentTab } = useExtensionLeftBarContext();
  const counter = useOutboxAllGlobalAggregation();

  return (
    <TaskTab
      icon={SalesforceTabsIcon.OUTBOX}
      counter={counter}
      colors={{ basic: 'lightPeanut', contrast: 'peanut' }}
      name={SalesforceTabs.OUTBOX}
      onClick={() => {
        setCurrentTab(currentTab === SalesforceTabs.OUTBOX ? null : SalesforceTabs.OUTBOX);
      }}
      isHighlighted={currentTab === SalesforceTabs.OUTBOX}
    >
      {t('leftBar.outbox')}
    </TaskTab>
  );
}

function MeetingsTab() {
  const { t } = useTranslation();
  const { setCurrentTab, currentTab } = useExtensionLeftBarContext();
  const counter = useMeetingsGlobalAggregation();

  return (
    <TaskTab
      icon={SalesforceTabsIcon.MEETINGS}
      counter={counter}
      colors={{ basic: 'verySoftTomato', contrast: 'softPeanut' }}
      name={SalesforceTabs.MEETINGS}
      onClick={() => {
        setCurrentTab(currentTab === SalesforceTabs.MEETINGS ? null : SalesforceTabs.MEETINGS);
      }}
      isHighlighted={currentTab === SalesforceTabs.MEETINGS}
    >
      {t('leftBar.meetings')}
    </TaskTab>
  );
}

function NurturingTab() {
  const { t } = useTranslation();
  const { setCurrentTab, currentTab } = useExtensionLeftBarContext();
  const counter = useNurturingAllGlobalAggregation();

  return (
    <TaskTab
      icon={SalesforceTabsIcon.NURTURING}
      counter={counter}
      colors={{ basic: 'verySoftTangerine', contrast: 'softPeanut' }}
      name={SalesforceTabs.NURTURING}
      onClick={() => {
        setCurrentTab(currentTab === SalesforceTabs.NURTURING ? null : SalesforceTabs.NURTURING);
      }}
      isHighlighted={currentTab === SalesforceTabs.NURTURING}
    >
      {t('leftBar.nurturing')}
    </TaskTab>
  );
}

function InactiveTab() {
  const { t } = useTranslation();
  const { setCurrentTab, currentTab } = useExtensionLeftBarContext();
  const counter = useInactiveGlobalAggregation();

  return (
    <TaskTab
      icon={SalesforceTabsIcon.INACTIVE}
      counter={counter}
      colors={{ basic: 'lightPeanut', contrast: 'softPeanut' }}
      name={SalesforceTabs.INACTIVE}
      onClick={() => {
        setCurrentTab(currentTab === SalesforceTabs.INACTIVE ? null : SalesforceTabs.INACTIVE);
      }}
      isHighlighted={currentTab === SalesforceTabs.INACTIVE}
    >
      {t('leftBar.inactive')}
    </TaskTab>
  );
}

function PipelineTab() {
  const { t } = useTranslation();
  const { setCurrentTab, currentTab, pipelineCounters } = useExtensionLeftBarContext();
  const counter = Object.keys(pipelineCounters).reduce(
    (acc, curr) => (pipelineCounters[curr] ? acc + pipelineCounters[curr] : acc),
    0,
  );
  return (
    <TaskTab
      icon={SalesforceTabsIcon.PIPELINE}
      counter={counter}
      colors={{ basic: 'verySoftBanana', contrast: 'softPeanut' }}
      name={SalesforceTabs.PIPELINE}
      onClick={() => {
        setCurrentTab(currentTab === SalesforceTabs.PIPELINE ? null : SalesforceTabs.PIPELINE);
      }}
      isHighlighted={currentTab === SalesforceTabs.PIPELINE}
    >
      {t('leftBar.pipeline')}
    </TaskTab>
  );
}

const Tabs = () => {
  const { has } = useUserHelpers();
  const [leftBarTooltipVisibility, setLeftBarTooltipVisibility] = useState<lBTVisibilityType>(
    has(ExtensionHelperKeys.LEFT_BAR_TOOLTIP) ? lBTVisibilityType.Bottom : lBTVisibilityType.Hidden,
  );
  const accountId = useActiveAccountId();
  const hasNewTaskFeed = useHasNewTaskFeed(accountId);

  useEffect(() => {
    setTimeout(() => {
      if (
        !has(ExtensionHelperKeys.LEFT_BAR_TOOLTIP) &&
        leftBarTooltipVisibility === lBTVisibilityType.Hidden
      ) {
        setLeftBarTooltipVisibility(lBTVisibilityType.Top);
      }
      if (has(ExtensionHelperKeys.LEFT_BAR_TOOLTIP)) {
        setLeftBarTooltipVisibility(lBTVisibilityType.Bottom);
      }
    }, 1000);
  }, [has(ExtensionHelperKeys.LEFT_BAR_TOOLTIP)]);

  return (
    <TaskSidebar>
      {leftBarTooltipVisibility === lBTVisibilityType.Top && <LeftBarTooltip />}
      {hasNewTaskFeed ? <NewTasksTab /> : <TasksTab />}
      <InboxTab />
      <OutboxTab />
      <MeetingsTab />
      <NurturingTab />
      <InactiveTab />
      <PipelineTab />
      {leftBarTooltipVisibility === lBTVisibilityType.Bottom && <LeftBarTooltip />}
    </TaskSidebar>
  );
};

export default Tabs;
