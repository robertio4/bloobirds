import React from 'react';
import { useParams } from 'react-router';

import { APP_TASKS_INBOX } from '../../app/_constants/routes';
import { InboxSidebarTooltip } from '../../components/discoveryTooltips/inboxTourTooltips/inboxSidebarTooltip';
import { useQuickStartEnabled } from '../../hooks/useQuickStartGuide';
import SubhomeContent from '../../layouts/subhomeLayout/subhomeContent/subhomeContent';
import SubhomeHeader from '../../layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeHeader';
import SubhomeLayout from '../../layouts/subhomeLayout/subhomeLayout';
import SubhomeSidebar from '../../layouts/subhomeLayout/subhomeSidebar/subhomeSidebar';
import SubhomeSidebarHeader from '../../layouts/subhomeLayout/subhomeSidebar/subhomeSidebarHeader/subhomeSidebarHeader';
import {
  SubhomeSidebarTab,
  SubhomeSidebarTabs,
} from '../../layouts/subhomeLayout/subhomeSidebar/subhomeSidebarTab/subhomeSidebarTab';
import { SubhomePageProvider } from '../subhomePages/subhomeContext';
import { CallsContent } from './calls/callsContent';
import { EmailsContent } from './emails/emailsContent';
import { LinkedinContent } from './linkedin/linkedinContent';
import { useInboxGlobalAggregation } from './useInbox';

const InboxSidebarHeader = () => {
  const { globalCounter } = useInboxGlobalAggregation();
  return <SubhomeSidebarHeader counter={globalCounter} icon="inbox" color="softPeanut" />;
};

const CallsTab = () => {
  const { callsCounter } = useInboxGlobalAggregation();
  const hasQSGEnabled = useQuickStartEnabled();
  return (
    <>
      <SubhomeSidebarTab
        counter={callsCounter}
        tabName="calls"
        icon="phone"
        tabUrl={`${APP_TASKS_INBOX}/calls`}
      >
        Calls
      </SubhomeSidebarTab>
      {hasQSGEnabled && <InboxSidebarTooltip defaultTooltipVisible />}
    </>
  );
};

const EmailsTab = () => {
  const { emailCounter } = useInboxGlobalAggregation();
  return (
    <SubhomeSidebarTab
      counter={emailCounter}
      tabName="emails"
      icon="mail"
      tabUrl={`${APP_TASKS_INBOX}/emails`}
    >
      Emails
    </SubhomeSidebarTab>
  );
};

const LinkedinTab = () => {
  const { linkedInCounter } = useInboxGlobalAggregation();

  return (
    <SubhomeSidebarTab
      counter={linkedInCounter}
      tabName="linkedin"
      icon="linkedin"
      tabUrl={`${APP_TASKS_INBOX}/linkedin`}
    >
      Linkedin
    </SubhomeSidebarTab>
  );
};

const InboundTab = () => (
  <SubhomeSidebarTab
    disabled
    extra="Coming Soon"
    tabName="inbound"
    icon="inbox"
    tabUrl={`${APP_TASKS_INBOX}/inbound`}
  >
    Inbound
  </SubhomeSidebarTab>
);

const InboxContentWrapper = ({ parentRef }) => {
  return (
    <>
      <SubhomeHeader />
      <InboxContent parentRef={parentRef} />
    </>
  );
};

const InboxContent = () => {
  const { slug } = useParams();
  let component;
  switch (slug) {
    case 'emails':
      component = <EmailsContent />;
      break;
    case 'linkedin':
      component = <LinkedinContent />;
      break;
    case 'calls':
    default:
      component = <CallsContent />;
      break;
  }
  return <SubhomePageProvider>{component}</SubhomePageProvider>;
};

const InboxPage = () => (
  <SubhomeLayout name="Inbox" defaultTab="calls">
    <>
      <SubhomeSidebar>
        <InboxSidebarHeader />
        <SubhomeSidebarTabs>
          <CallsTab />
          <EmailsTab />
          <LinkedinTab />
          <InboundTab />
        </SubhomeSidebarTabs>
      </SubhomeSidebar>
      <SubhomeContent>
        <InboxContentWrapper />
      </SubhomeContent>
    </>
  </SubhomeLayout>
);

export default InboxPage;
