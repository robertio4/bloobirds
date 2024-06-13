import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router';

import { Button, IconButton, IconType, Spinner } from '@bloobirds-it/flamingo-ui';
import { useSelectAll } from '@bloobirds-it/hooks';
import { CustomUserHelperKeys, MainBobjectTypes, BobjectTypes } from '@bloobirds-it/types';
import clsx from 'clsx';

import { APP_TASKS_SALES } from '../../../app/_constants/routes';
import { StartTaskSettings } from '../../../components/startTaskSettings/startTaskSettings';
import UndoToast from '../../../components/undoToast/undoToast';
import { useDocumentTitle, useTaskNavigationStorage } from '../../../hooks';
import { useDeleteQuickFilterModal } from '../../../hooks/useDeleteQuickFilter';
import { useFullSalesEnabled, useSalesNurturingTab } from '../../../hooks/useFeatureFlags';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import SubhomeContent from '../../../layouts/subhomeLayout/subhomeContent/subhomeContent';
import SubhomeHeader from '../../../layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeHeader';
import SubhomeTab from '../../../layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeTabs/subhomeTab/subhomeTab';
import SubhomeTabs from '../../../layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeTabs/subhomeTabs';
import { ToggleStatsButton } from '../../../layouts/subhomeLayout/subhomeContent/subhomeStats/toggleStatsButton';
import SubhomeLayout from '../../../layouts/subhomeLayout/subhomeLayout';
import SubhomeSidebar from '../../../layouts/subhomeLayout/subhomeSidebar/subhomeSidebar';
import SubhomeSidebarHeader from '../../../layouts/subhomeLayout/subhomeSidebar/subhomeSidebarHeader/subhomeSidebarHeader';
import {
  SubhomeSidebarTab,
  SubhomeSidebarTabs,
} from '../../../layouts/subhomeLayout/subhomeSidebar/subhomeSidebarTab/subhomeSidebarTab';
import { SubhomeSections } from '../../../typings/params';
import { toTitleCase } from '../../../utils/strings.utils';
import { DeleteQuickFilterModal } from '../prospectingPage/deleteQuickFilterModal/deleteQuickFilterModal';
import { SubhomePageProvider } from '../subhomeContext';
import { SALES_SLUGS } from '../subhomes.constants';
import { getBobjectType, getTabKey } from '../subhomes.utils';
import { VIEW_MODE } from './allMyOpps/allMyOpps.constant';
import { AllMyOppsListContent } from './allMyOpps/allMyOppsContent';
import { useSalesAllMyOppsViewMode } from './allMyOpps/useSalesAllMyOpps';
import { AppointmentsContent } from './appointments/appointmentsContent';
import { useSalesAppointmentAggregation } from './appointments/useSalesAppointments';
import { CompaniesAndLeadsContent } from './companiesAndLeads/companiesAndLeadsContent';
import { useSalesCompaniesAndLeadsAggregation } from './companiesAndLeads/useSalesCompaniesAndLeads';
import { FollowUpContent } from './followUp/followUpContent';
import { useSalesFollowUpAggregation } from './followUp/useSalesFollowUp';
import { InactiveContent } from './inactive/inactiveContent';
import {
  useSalesAllInactiveAggregation,
  useSalesSumInactiveAggregation,
} from './inactive/useSalesInactiveAggregation';
import { InactiveOppsContent } from './inactiveOpps/inactiveOppsContent';
import { useSalesInactiveOppsAggregation } from './inactiveOpps/useSalesInactiveOpps';
import MeetingsContent from './meetings/meetingsContent';
import { useSalesMeetingsAggregation } from './meetings/useSalesMeetingsAggregation';
import { NurturingContent } from './nurturing/nurturingContent';
import { useSalesNurturingAggregation } from './nurturing/useSalesNurturing';
import styles from './salesPage.module.css';
import { SALES_PAGES } from './useSales.constants';

const TAB_NAME = Object.freeze({
  appointments: SALES_PAGES.APPOINTMENTS,
  followUp: SALES_PAGES.FOLLOW_UP,
  inactiveOpps: SALES_PAGES.INACTIVE,
  inactive: SALES_PAGES.INACTIVE,
  inactive_companies: SALES_PAGES.COMPANY_INACTIVE,
  inactive_leads: SALES_PAGES.LEAD_INACTIVE,
  inactive_opportunities: SALES_PAGES.OPPORTUNITY_INACTIVE,
  companiesAndLeads_companies: SALES_PAGES.COMPANY_COMPANIES_AND_LEADS,
  companiesAndLeads_leads: SALES_PAGES.LEAD_COMPANIES_AND_LEADS,
  allOpportunities: SALES_PAGES.ALL_MY_OPPORTUNITIES,
});

const BOBJECT_SECTIONS = Object.freeze({
  COMPANIES: 'companies',
  LEADS: 'leads',
  OPPORTUNITIES: 'opportunities',
});

const hasTaskNavigation = () => {
  const { slug = 'followUp' } = useParams() as { slug: SALES_SLUGS };
  const taskBasedTabs = ['followUp', SALES_SLUGS.NURTURING];

  return taskBasedTabs.includes(slug);
};

const SalesSidebarHeader = () => {
  const hasNurturingTab = useSalesNurturingTab();
  const isSalesEnabled = useFullSalesEnabled();
  const followUpCounter = useSalesFollowUpAggregation();
  const nurturingCounter = useSalesNurturingAggregation();

  const getCounter = () => {
    let count = 0;
    if (isSalesEnabled) {
      count = count + followUpCounter;
    }
    if (hasNurturingTab) {
      count = count + nurturingCounter;
    }
    return count;
  };

  return (
    <SubhomeSidebarHeader
      icon="fileOpportunity"
      color="softPeanut"
      counter={getCounter()}
      active
      tooltipText={
        'Total number of tasks you have to complete today (this is the sum of all other pages in blue) Try to leave the counter at 0 at the end of the day!'
      }
    />
  );
};

const AppointmentsTab = () => {
  const counter = useSalesAppointmentAggregation();
  return (
    <SubhomeSidebarTab
      counter={counter}
      tabName="appointments"
      tabUrl={`${APP_TASKS_SALES}/appointments`}
      icon="calendar"
      active
    >
      Appointments
    </SubhomeSidebarTab>
  );
};

const FollowUpTab = () => {
  const counter = useSalesFollowUpAggregation();
  return (
    <SubhomeSidebarTab
      counter={counter}
      tabName="followUp"
      tabUrl={`${APP_TASKS_SALES}/followUp`}
      icon="cadence"
      active
      tooltipText="Number of tasks from opportunities, companies and/or leads in sales stage that you have to complete today! Overdue tasks also count. Try to leave the counter at 0 at the end of the day!"
    >
      Follow up
    </SubhomeSidebarTab>
  );
};

const NurturingTab = () => {
  const counter = useSalesNurturingAggregation();
  return (
    <SubhomeSidebarTab
      counter={counter}
      tabName="nurturing"
      tabUrl={`${APP_TASKS_SALES}/nurturing`}
      icon="refresh"
      active
      tooltipText="Number of cadences tasks on companies and/or leads in Nurturing that you have to complete today. Overdue also count! Try to leave the counter at 0 before the end of the day."
    >
      Nurturing
    </SubhomeSidebarTab>
  );
};

const InactiveTab = () => {
  const counter = useSalesSumInactiveAggregation();
  const { get } = useUserHelpers();
  const defaultBobject = get(CustomUserHelperKeys.INACTIVE_SALES_DEFAULT_TAB);

  return (
    <SubhomeSidebarTab
      counter={counter}
      tabName="inactive"
      tabUrl={`${APP_TASKS_SALES}/inactive${defaultBobject ? `/${defaultBobject}` : ''}`}
      icon="alertTriangle"
      tooltipText="Number of companies, leads and open opportunities you have with no future tasks. Try to review these objects so that you don't leave them forgotten!"
    >
      Inactive
    </SubhomeSidebarTab>
  );
};

const InactiveOppsTab = () => {
  const counter = useSalesInactiveOppsAggregation();
  return (
    <SubhomeSidebarTab
      counter={counter}
      tabName="inactiveOpps"
      tabUrl={`${APP_TASKS_SALES}/inactiveOpps`}
      icon="pauseOutlined"
      tooltipText="Number of open opportunities you have with no future tasks. Try to review these opportunities so that you don't leave them forgotten!"
    >
      Inactive opps
    </SubhomeSidebarTab>
  );
};

const CompaniesAndLeadsTab = () => {
  const counters = useSalesCompaniesAndLeadsAggregation();
  const { get } = useUserHelpers();
  const defaultBobject = get(CustomUserHelperKeys.COMPANIES_AND_LEADS_DEFAULT_TAB);

  return (
    <SubhomeSidebarTab
      counter={counters?.company + counters?.lead}
      tabName="companiesAndLeads"
      tabUrl={`${APP_TASKS_SALES}/companiesAndLeads${defaultBobject ? `/${defaultBobject}` : ''}`}
      icon="company"
      tooltipText="Number of companies and leads in the sales stage, assigned to you. Use this tab to organise them with quick filters and take bulk actions on them."
    >
      Companies & Leads
    </SubhomeSidebarTab>
  );
};

const MeetingsTab = () => {
  const counters = useSalesMeetingsAggregation();
  return (
    <SubhomeSidebarTab
      counter={counters}
      tabName="meetings"
      tabUrl={`${APP_TASKS_SALES}/meetings`}
      icon="calendar"
      tooltipText="Number of unreported meetings assigned to you.
Use this tab to get an overview of your meetings,
classify them with quick filters and take action on them."
    >
      Meetings
    </SubhomeSidebarTab>
  );
};

const AllMyOppsTab = () => (
  <SubhomeSidebarTab
    tabName="allOpportunities"
    tabUrl={`${APP_TASKS_SALES}/allOpportunities`}
    icon="fileOpportunity"
    tooltipText="No. of open opportunities you have with no future tasks. Try to review these opportunities so that you don't leave them forgotten!"
  >
    Opportunities
  </SubhomeSidebarTab>
);

const SalesContentWrapper = ({ parentRef }: { parentRef: React.RefObject<HTMLDivElement> }) => {
  const {
    startNavigation,
    setSalesNavigation,
    placeholderNavigableTasks,
  } = useTaskNavigationStorage();
  const hasTasks = placeholderNavigableTasks.length > 0;
  const [changingTaskNavigationSettings, setChangingTaskNavigationSettings] = useState(false);
  const extraProps = {
    iconLeft: changingTaskNavigationSettings || !hasTasks ? null : ('arrowRight' as IconType),
  };
  const {
    isOpen: isOpenDeleteQuickFilterModal,
    closeDeleteQuickFilter,
  } = useDeleteQuickFilterModal();
  const isSalesEnabled = useFullSalesEnabled();
  const { slug = isSalesEnabled ? 'followUp' : 'appointments', section } = useParams() as {
    slug: SALES_SLUGS;
    section: SubhomeSections;
  };
  const { get } = useUserHelpers();
  const key = getTabKey(slug, useLocation());
  const [pinnedBobjectTab, setPinnedBobjectTab] = useState<MainBobjectTypes>(
    getBobjectType(get(key)) as MainBobjectTypes,
  );

  const inactiveCounters = useSalesAllInactiveAggregation();
  const companiesAndLeadsCounters = useSalesCompaniesAndLeadsAggregation();

  const counters = ((): { company: any; lead: any; opportunity?: any } => {
    switch (slug) {
      case 'inactive':
        return inactiveCounters;
      case 'companiesAndLeads':
        return companiesAndLeadsCounters;
      default:
        return { company: undefined, lead: undefined, opportunity: undefined };
    }
  })();
  const isPageWithTabs = ['companiesAndLeads', 'inactive'].includes(slug);
  const [viewMode, setViewMode] = useSalesAllMyOppsViewMode();
  const isKanbanViewAvailable = slug === 'allOpportunities';
  const isPageWithForecast = slug === 'allOpportunities'; // add here the pages that will have the forecast
  const { resetSelectedItems, resetCheckSelectedAll } = useSelectAll();

  useEffect(() => {
    setSalesNavigation(true);
    setPinnedBobjectTab(getBobjectType(get(key)));
  }, [slug]);

  function startTasks() {
    startNavigation();
  }

  return (
    <>
      <SubhomeHeader>
        <div
          className={clsx(styles._header_right_content, {
            [styles._header_right_content_left_align]: isKanbanViewAvailable,
          })}
        >
          {isPageWithTabs && (
            <SubhomeTabs>
              <SubhomeTab
                icon="company"
                counter={counters?.company ?? undefined}
                active={section === BOBJECT_SECTIONS.COMPANIES || !section}
                url={`${APP_TASKS_SALES}/${slug}/companies`}
                bobjectType={BobjectTypes.Company}
                setPinnedTab={setPinnedBobjectTab}
                isPinned={pinnedBobjectTab === BobjectTypes.Company}
              >
                Companies
              </SubhomeTab>
              <SubhomeTab
                icon="person"
                active={section === BOBJECT_SECTIONS.LEADS}
                counter={counters?.lead ?? undefined}
                url={`${APP_TASKS_SALES}/${slug}/leads`}
                bobjectType={BobjectTypes.Lead}
                setPinnedTab={setPinnedBobjectTab}
                isPinned={pinnedBobjectTab === BobjectTypes.Lead}
              >
                Leads
              </SubhomeTab>
              {isSalesEnabled && slug === 'inactive' && (
                <SubhomeTab
                  icon="fileOpportunity"
                  active={section === BOBJECT_SECTIONS.OPPORTUNITIES}
                  counter={counters?.opportunity ?? undefined}
                  url={`${APP_TASKS_SALES}/${slug}/opportunities`}
                  bobjectType={BobjectTypes.Opportunity}
                  setPinnedTab={setPinnedBobjectTab}
                  isPinned={pinnedBobjectTab === BobjectTypes.Opportunity}
                >
                  Opportunities
                </SubhomeTab>
              )}
            </SubhomeTabs>
          )}
          {isKanbanViewAvailable && (
            <div>
              <IconButton
                name="kanban"
                size={20}
                onClick={() => {
                  resetSelectedItems();
                  resetCheckSelectedAll();
                  setViewMode(VIEW_MODE.KANBAN);
                }}
                color={viewMode === 'KANBAN' ? 'bloobirds' : 'softPeanut'}
              />
              <IconButton
                name="list"
                size={20}
                onClick={() => setViewMode(VIEW_MODE.LIST)}
                color={viewMode === 'LIST' ? 'bloobirds' : 'softPeanut'}
              />
            </div>
          )}
          {isPageWithForecast && <ToggleStatsButton label={'forecast'} />}
          <div className={styles._header_right_content__end}>
            {hasTaskNavigation() && (
              <Button
                dataTest="tasksStart"
                disabled={!hasTasks}
                size="small"
                onClick={!changingTaskNavigationSettings ? startTasks : undefined}
                color={
                  !hasTasks ? null : changingTaskNavigationSettings ? 'softBloobirds' : 'bloobirds'
                }
                {...extraProps}
              >
                {changingTaskNavigationSettings && (
                  <div className={styles._button_spinner}>
                    <Spinner color={'white'} name="loadingCircle" size={14} />
                  </div>
                )}
                {changingTaskNavigationSettings
                  ? ''
                  : `Start tasks ${
                      placeholderNavigableTasks ? `(${placeholderNavigableTasks?.length})` : ''
                    }`}
              </Button>
            )}
            {hasTaskNavigation() && (
              <div className={styles._startTaskSettings}>
                <StartTaskSettings
                  callingFromSalesPage={true}
                  updateLoading={setChangingTaskNavigationSettings}
                />
              </div>
            )}
          </div>
        </div>
      </SubhomeHeader>
      <SalesContent parentRef={parentRef} />
      <UndoToast />
      {isOpenDeleteQuickFilterModal && (
        <DeleteQuickFilterModal
          tabName={
            //@ts-ignore
            TAB_NAME[isPageWithTabs ? `${slug}${section ? `_${section}` : '_companies'}` : slug]
          }
          handleCloseModal={closeDeleteQuickFilter}
        />
      )}
    </>
  );
};

const SalesContent = ({ parentRef }: { parentRef: React.RefObject<HTMLDivElement> }) => {
  const { slug } = useParams() as { slug: SALES_SLUGS };
  const isSalesEnabled = useFullSalesEnabled();

  let content;
  switch (slug) {
    case 'allOpportunities':
      content = <AllMyOppsListContent />;
      break;
    case 'followUp':
      content = <FollowUpContent />;
      break;
    case 'nurturing':
      content = <NurturingContent />;
      break;
    case 'inactiveOpps':
      content = <InactiveOppsContent parentRef={parentRef} />;
      break;
    case 'inactive':
      content = <InactiveContent />;
      break;
    case 'companiesAndLeads':
      content = <CompaniesAndLeadsContent />;
      break;
    case 'meetings':
      content = <MeetingsContent />;
      break;
    case 'appointments':
    default:
      content = isSalesEnabled ? <FollowUpContent /> : <AppointmentsContent />;
  }
  return <SubhomePageProvider parentRef={parentRef}>{content}</SubhomePageProvider>;
};

const SalesPage = () => {
  const { slug } = useParams() as { slug: SALES_SLUGS };
  const tabTitle = slug ? ` - ${toTitleCase(slug)}` : '';
  const isSalesEnabled = useFullSalesEnabled();
  const isNurturingEnabled = useSalesNurturingTab();
  const isMeetingTabVisible = isSalesEnabled;
  useDocumentTitle(`Sales${tabTitle}`);
  const ref = useRef();

  return (
    <SubhomeLayout name="Sales" defaultTab={'allOpportunities'}>
      <>
        <SubhomeSidebar>
          <>
            <SalesSidebarHeader />
            <SubhomeSidebarTabs>
              <AllMyOppsTab />
              {isMeetingTabVisible && <MeetingsTab />}
              {isSalesEnabled ? <FollowUpTab /> : <AppointmentsTab />}
              {isNurturingEnabled && <NurturingTab />}
              {isSalesEnabled ? <InactiveTab /> : <InactiveOppsTab />}
              <CompaniesAndLeadsTab />
            </SubhomeSidebarTabs>
          </>
        </SubhomeSidebar>
        <SubhomeContent>
          <SalesContentWrapper parentRef={ref} />
        </SubhomeContent>
      </>
    </SubhomeLayout>
  );
};

export default SalesPage;
