import React from 'react';

import { CustomUserHelperKeys } from '@bloobirds-it/types';

import {
  APP_TASKS_ADD_QC,
  APP_TASKS_ASSIGN_QC,
  APP_TASKS_INBOUND,
  APP_TASKS_INBOX,
  APP_TASKS_OUTBOX,
  APP_TASKS_PROSPECTING,
  APP_TASKS_SALES,
} from '../../app/_constants/routes';
import { useFullSalesEnabled, useSalesNurturingTab } from '../../hooks/useFeatureFlags';
import { useUserHelpers } from '../../hooks/useUserHelpers';
import { useInboundGlobalAggregation } from '../../pages/inboundPage/useInbound';
import { useInboxGlobalAggregation } from '../../pages/inboxPage/useInbox';
import { useOutboxGlobalAggregation } from '../../pages/outboxPages/useOutbox';
import { useProspectingNurturingAggregation } from '../../pages/subhomePages/prospectingPage/nurturing/useProspectNurturing';
import { useProspectingGlobalAggregation } from '../../pages/subhomePages/prospectingPage/useProspecting';
import { useSalesFollowUpAggregation } from '../../pages/subhomePages/salesPage/followUp/useSalesFollowUp';
import { useSalesNurturingAggregation } from '../../pages/subhomePages/salesPage/nurturing/useSalesNurturing';
import TaskSidebar, { TaskTab } from '../taskSidebar/taskSidebar';
import { useUserPermissions } from '../userPermissions/hooks';

function InboxTab() {
  const { globalCounter } = useInboxGlobalAggregation();
  const { inbox: inboxPermission } = useUserPermissions();

  return inboxPermission ? (
    <TaskTab
      icon="inbox"
      counter={globalCounter}
      route={APP_TASKS_INBOX}
      colors={{ basic: 'lightestGray', contrast: 'softPeanut' }}
      name="Button-Task-Inbox"
    >
      Inbox
    </TaskTab>
  ) : null;
}

function InboundTab() {
  const counter = useInboundGlobalAggregation();
  const { inbound: inboundPermission } = useUserPermissions();

  return inboundPermission ? (
    <TaskTab
      icon="arrowDownRight"
      counter={counter}
      route={APP_TASKS_INBOUND}
      colors={{ basic: 'lightestGray', contrast: 'softPeanut' }}
      name="Inbound"
    >
      Inbound
    </TaskTab>
  ) : null;
}

function AddQCTab() {
  const { addQC: addQCPermission } = useUserPermissions();
  return addQCPermission ? (
    <TaskTab
      icon="company"
      route={APP_TASKS_ADD_QC}
      colors={{ basic: 'lightestGray', contrast: 'softPeanut' }}
      name="Add Qc"
    >
      Add QC
    </TaskTab>
  ) : null;
}

function AssignTab() {
  const { assign: assignPermission } = useUserPermissions();

  return assignPermission ? (
    <TaskTab
      icon="send"
      route={APP_TASKS_ASSIGN_QC}
      colors={{ basic: 'verySoftTangerine', contrast: 'tangerine' }}
      name="Assign Tab"
    >
      Assign
    </TaskTab>
  ) : null;
}

function ProspectingTab() {
  const { get } = useUserHelpers();
  const nurturingCounter = useProspectingNurturingAggregation();
  const isNurturingTab = useSalesNurturingAggregation();
  let counter = useProspectingGlobalAggregation();
  const { prospect: prospectPermission } = useUserPermissions();
  if (isNurturingTab) counter += nurturingCounter;
  const defaultBobject = get(CustomUserHelperKeys.DELIVERED_DEFAULT_TAB);
  return prospectPermission ? (
    <TaskTab
      icon="phone"
      counter={counter}
      route={`${APP_TASKS_PROSPECTING}/delivered${defaultBobject ? `/${defaultBobject}` : ''}`}
      colors={{ basic: 'verySoftGrape', contrast: 'grape' }}
      name="Prospect"
    >
      Prospect
    </TaskTab>
  ) : null;
}

function SalesTab() {
  const { sales: salesPermission } = useUserPermissions();
  const isNuturingTab = useSalesNurturingTab();
  const hasSalesEnabled = useFullSalesEnabled();
  const followUpCounter = useSalesFollowUpAggregation();
  const nurturingCounter = useSalesNurturingAggregation();

  const getCounter = () => {
    let counter = 0;
    if (hasSalesEnabled) {
      counter += followUpCounter;
    }
    if (isNuturingTab) {
      return followUpCounter + nurturingCounter;
    }

    return counter;
  };

  return salesPermission ? (
    <TaskTab
      icon="fileOpportunity"
      counter={getCounter()}
      route={APP_TASKS_SALES + '/allOpportunities'}
      colors={{ basic: 'peanut', contrast: 'white', isDark: true }}
      name="Sales"
    >
      Sales
    </TaskTab>
  ) : null;
}

function OutboxTab() {
  const counter = useOutboxGlobalAggregation();
  const { outbox: outboxPermission } = useUserPermissions();

  return outboxPermission ? (
    <TaskTab
      icon="outbox"
      counter={counter}
      route={APP_TASKS_OUTBOX}
      colors={{ basic: 'lighterGray', contrast: 'peanut' }}
      name="Outbox"
    >
      Outbox
    </TaskTab>
  ) : null;
}

const AppSidebar = () => (
  <TaskSidebar>
    <InboxTab />
    <OutboxTab />
    <InboundTab />
    <AddQCTab />
    <AssignTab />
    <ProspectingTab />
    <SalesTab />
  </TaskSidebar>
);

export default AppSidebar;
