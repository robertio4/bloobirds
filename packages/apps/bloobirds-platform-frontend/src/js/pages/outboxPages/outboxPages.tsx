import React, { RefObject } from 'react';
import { useParams } from 'react-router';
import SubhomeLayout from '../../layouts/subhomeLayout/subhomeLayout';
import SubhomeSidebar from '../../layouts/subhomeLayout/subhomeSidebar/subhomeSidebar';
import {
  SubhomeSidebarTab,
  SubhomeSidebarTabs,
} from '../../layouts/subhomeLayout/subhomeSidebar/subhomeSidebarTab/subhomeSidebarTab';
import SubhomeSidebarHeader from '../../layouts/subhomeLayout/subhomeSidebar/subhomeSidebarHeader/subhomeSidebarHeader';
import SubhomeContent from '../../layouts/subhomeLayout/subhomeContent/subhomeContent';
import { APP_TASKS_OUTBOX } from '../../app/_constants/routes';
import { useDocumentTitle } from '../../hooks';
import { toTitleCase } from '../../utils/strings.utils';
import { ScheduledContent } from './scheduled/scheduledContent';
import { AutomatedContent } from './automated/automatedContent';
import { useOutboxScheduledAggregation } from './scheduled/useOutboxScheduled';
import { useOutboxGlobalAggregation } from './useOutbox';
import SubhomeHeader from '../../layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeHeader';
import { EMAILING_TYPE } from './outbox.constants';
import { useOutboxAutomatedAggregation } from './automated/useOutboxAutomated';
import { SubhomePageProvider } from '../subhomePages/subhomeContext';
import { ScheduledTabTooltip } from '../../components/discoveryTooltips/outboxTourTooltips/scheduledTabTooltip';
import { useHasQueryParam } from '../../hooks/useHasQueryParam';
import { useQuickStartEnabled } from '../../hooks/useQuickStartGuide';
import { useIsOTOAccount } from "@bloobirds-it/hooks";
import NoPermissionsPage from "../noPermissionsPage";

const OutboxSidebarHeader = () => {
  const globalCounter = useOutboxGlobalAggregation();

  return <SubhomeSidebarHeader counter={globalCounter} active icon="deliver" color="peanut" />;
};

const ScheduledTab = () => {
  const counter = useOutboxScheduledAggregation();
  const hasQSGEnabled = useQuickStartEnabled();
  const isTour = !useHasQueryParam('fromGuide');

  return (
    <>
      <SubhomeSidebarTab
        counter={counter}
        tabName="scheduledEmails"
        tabUrl={`${APP_TASKS_OUTBOX}/scheduledEmails${isTour ? '?tour=true' : ''}`}
        icon="calendar"
        active
      >
        Scheduled
      </SubhomeSidebarTab>
      {hasQSGEnabled && <ScheduledTabTooltip />}
    </>
  );
};

const AutomatedTab = () => {
  const counter = useOutboxAutomatedAggregation();

  return (
    <SubhomeSidebarTab
      counter={counter}
      tabName="automatedEmails"
      tabUrl={`${APP_TASKS_OUTBOX}/automatedEmails`}
      icon="cadence"
      active
    >
      Automated
    </SubhomeSidebarTab>
  );
};

const OutboxContent = ({ parentRef }) => {
  const { slug } = useParams();

  switch (slug) {
    case EMAILING_TYPE.SCHEDULE:
      return (
        <SubhomePageProvider parentRef={parentRef}>
          <ScheduledContent />
        </SubhomePageProvider>
      );
    default:
      return (
        <SubhomePageProvider parentRef={parentRef}>
          <AutomatedContent />
        </SubhomePageProvider>
      );
  }
};

const OutboxContentWrapper = ({ parentRef }: { parentRef: RefObject<HTMLDivElement> }) => {
  return (
    <>
      <SubhomeHeader />
      <OutboxContent parentRef={parentRef} />
    </>
  );
};

const OutboxPages = () => {
  const { slug } = useParams();
  const tabTitle = slug ? ` - ${toTitleCase(slug)}` : '';

  useDocumentTitle(`Outbox${tabTitle}`);

  return (
    <SubhomeLayout name="Outbox" defaultTab={EMAILING_TYPE.AUTOMATED}>
      <>
        <SubhomeSidebar>
          <>
            <OutboxSidebarHeader />
            <SubhomeSidebarTabs>
              <AutomatedTab />
              <ScheduledTab />
            </SubhomeSidebarTabs>
          </>
        </SubhomeSidebar>
        <SubhomeContent>
          <OutboxContentWrapper />
        </SubhomeContent>
      </>
    </SubhomeLayout>
  );
};

export default OutboxPages;
