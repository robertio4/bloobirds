import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';

import { Button, Icon, IconType, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import {
  CustomUserHelperKeys,
  UserHelperTooltipsKeys,
  BOBJECT_TYPES,
  BobjectTypes,
} from '@bloobirds-it/types';
import clsx from 'clsx';

import { APP_CL_COMPANIES, APP_TASKS_PROSPECTING } from '../../../app/_constants/routes';
import AlertBanner from '../../../components/alertBanner';
import BuyerPersonasModal from '../../../components/buyerPersonasModal/buyerPersonasModal';
import { CreateBobjectTooltip } from '../../../components/discoveryTooltips/createBobjectTooltip';
import { EntityInfoTooltip } from '../../../components/discoveryTooltips/entityInfoTooltip';
import { CompanyLeadDivisionTooltip } from '../../../components/discoveryTooltips/prospectingTourTooltips/companyLeadDivisionTooltip';
import { OnCadenceTooltip } from '../../../components/discoveryTooltips/prospectingTourTooltips/onCadenceTooltip';
import { StartTasksTooltip } from '../../../components/discoveryTooltips/prospectingTourTooltips/startTasksTooltip';
import { StartToFinishTooltip } from '../../../components/discoveryTooltips/prospectingTourTooltips/startToFinishTooltip';
import { StartTaskSettings } from '../../../components/startTaskSettings/startTaskSettings';
import TargetMarketsModal from '../../../components/targetMarketsModal/targetMarketsModal';
import UndoToast from '../../../components/undoToast/undoToast';
import { COMPANY_FIELDS_LOGIC_ROLE, COMPANY_STATUS_LOGIC_ROLE } from '../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_STATUS_LOGIC_ROLE } from '../../../constants/lead';
import {
  useActiveUser,
  useBobjectFormVisibility,
  useDocumentTitle,
  useEntity,
  useRouter,
  useTaskNavigationStorage,
} from '../../../hooks';
import { useBuyerPersonasModal } from '../../../hooks/useBuyerPersonasModal';
import { useDeleteQuickFilterModal } from '../../../hooks/useDeleteQuickFilter';
import { useProspectingNurturingTab, useSalesNurturingTab } from '../../../hooks/useFeatureFlags';
import { useHasQueryParam } from '../../../hooks/useHasQueryParam';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { useQuickStartEnabled } from '../../../hooks/useQuickStartGuide';
import { useSidebar } from '../../../hooks/useSidebar';
import { useTargetMarketsModal } from '../../../hooks/useTargetMarketsModal';
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
import { MainBobjectTypes } from '../../../typings/bobjects';
import { toTitleCase } from '../../../utils/strings.utils';
import { SubhomePageProvider } from '../subhomeContext';
import { PROSPECTING_SLUGS } from '../subhomes.constants';
import { getBobjectType, getTabKey } from '../subhomes.utils';
import { AllMyEntitiesCompanyContent } from './allMyEntities/allMyEntitiesCompanyContent';
import { AllMyEntitiesLeadContent } from './allMyEntities/allMyEntitiesLead/allMyEntitiesLeadContent';
import { useProspectingAllMyLeadsAggregation } from './allMyEntities/allMyEntitiesLead/useProspectingMyEntitiesLead';
import { useProspectingAllMyCompaniesAggregation } from './allMyEntities/useProspectingMyEntitiesCompany';
import { CompanyDeliveredListContent } from './companyDelivered/companyDeliveredContent';
import { useProspectingCompanyDeliveredAggregation } from './companyDelivered/useProspectingCompanyDelivered';
import { PROSPECT_PAGES } from './constants/prospectPages';
import { DeleteQuickFilterModal } from './deleteQuickFilterModal/deleteQuickFilterModal';
import { InactiveCompanyContent } from './inactive/inactiveCompanyContent';
import { InactiveLeadContent } from './inactive/inactiveLead/inactiveLeadContent';
import { useProspectingLeadInactiveAggregation } from './inactive/inactiveLead/useProspectingInactiveLead';
import { useProspectingCompanyInactiveAggregation } from './inactive/useProspectingInactiveCompany';
import { LeadDeliveredListContent } from './leadDelivered/leadDeliveredContent';
import { useProspectingLeadDeliveredAggregation } from './leadDelivered/useProspectingLeadDelivered';
import { MeetingRemindersContent } from './meetingReminders/meetingRemindersContent';
import { useProspectingMeetingRemindersAggregation } from './meetingReminders/useProspectingMeetingReminders';
import { NurturingContent } from './nurturing/nurturingContent';
import { useProspectingNurturingAggregation } from './nurturing/useProspectNurturing';
import { OnCadenceContent } from './onCadence/onCadenceContent';
import { OnCadenceHeader } from './onCadence/onCadenceHeader';
import { useProspectingOnCadenceAggregation } from './onCadence/useProspectingOnCadence';
import styles from './prospectingPage.module.css';
import { hideBanner, shouldBeVisible } from './prospectingPage.utils';
import { ScheduledContent } from './scheduled/scheduledContent';
import { useProspectingScheduledAggregation } from './scheduled/useProspectingScheduled';
import {
  useProspectingGlobalAggregation,
  useReadyToProspectAndFindingLeadsCompanies,
} from './useProspecting';

const TABS_WITH_STATS = ['delivered', 'onCadence', 'meetingTasks', 'scheduled'];
const BOBJECT_SECTIONS = Object.freeze({
  COMPANIES: 'companies',
  LEADS: 'leads',
});

const TAB_NAME = Object.freeze({
  delivered: PROSPECT_PAGES.COMPANY_DELIVERED,
  onCadence: PROSPECT_PAGES.COMPANY_ON_CADENCE,
  scheduled: PROSPECT_PAGES.COMPANY_SCHEDULED,
  meetingTasks: PROSPECT_PAGES.COMPANY_MEETING_TASKS,
  nurturing: PROSPECT_PAGES.COMPANY_NURTURING,
  inactive: PROSPECT_PAGES.COMPANY_INACTIVE,
  all: PROSPECT_PAGES.COMPANY_ALL_MY_COMPANIES,
});

const getTabName = (slug, section) => {
  if (!section) {
    return TAB_NAME[slug];
  }

  switch (slug) {
    case 'delivered':
      return BOBJECT_SECTIONS.COMPANIES === section
        ? PROSPECT_PAGES.COMPANY_DELIVERED
        : PROSPECT_PAGES.LEAD_DELIVERED;
    case 'inactive':
      return BOBJECT_SECTIONS.COMPANIES === section
        ? PROSPECT_PAGES.COMPANY_INACTIVE
        : PROSPECT_PAGES.LEAD_INACTIVE;
    case 'all':
      return BOBJECT_SECTIONS.COMPANIES === section
        ? PROSPECT_PAGES.COMPANY_ALL_MY_COMPANIES
        : PROSPECT_PAGES.LEAD_ALL_MY_COMPANIES;
  }
};

const hasTaskNavigation = () => {
  const { slug } = useParams();
  return !['delivered', 'inactive', 'all'].includes(slug) && slug;
};

const ProspectingSidebarHeader = () => {
  let globalCounter = useProspectingGlobalAggregation();
  const hasNurturingTab = useSalesNurturingTab();
  const nurturingTabCounter = useProspectingNurturingAggregation();
  if (hasNurturingTab) globalCounter += nurturingTabCounter;
  return (
    <SubhomeSidebarHeader
      counter={globalCounter}
      active
      icon="phone"
      color="melon"
      tooltipText="Total number of tasks you have to complete today (this is the sum of all other tabs in blue) Try to leave the counter at 0 at the end of the day!"
    />
  );
};

const ProspectingContentHeader = () => {
  let { slug, section } = useParams();
  if (!slug) slug = 'delivered';
  const { get, has } = useUserHelpers();
  const key = getTabKey(slug, useLocation());
  const hasQSGEnabled = useQuickStartEnabled();
  const [pinnedBobjectTab, setPinnedBobjectTab] = useState<MainBobjectTypes>(
    getBobjectType(get(key)) as MainBobjectTypes,
  );
  const {
    startNavigation,
    tasks,
    setSalesNavigation,
    placeholderNavigableTasks,
  } = useTaskNavigationStorage();
  const [changingTaskNavigationSettings, setChangingTaskNavigationSettings] = useState(false);
  const extraProps = {
    iconLeft: (changingTaskNavigationSettings || tasks?.length === 0
      ? null
      : 'arrowRight') as IconType,
  };
  const isOnCadenceTab = slug === 'onCadence';
  const isDeliveredTab = slug === 'delivered' || !slug;
  const hasStats = !slug || TABS_WITH_STATS.includes(slug);
  const { openTargetMarketsModal } = useTargetMarketsModal();
  const { openBuyerPersonasModal } = useBuyerPersonasModal();
  const deliveredCompaniesCounter = useProspectingCompanyDeliveredAggregation();
  const deliveredLeadsCounter = useProspectingLeadDeliveredAggregation();
  const inactiveCompaniesCounter = useProspectingCompanyInactiveAggregation();
  const inactiveLeadsCounter = useProspectingLeadInactiveAggregation();
  const allCompaniesCounter = useProspectingAllMyCompaniesAggregation();
  const allLeadsCounter = useProspectingAllMyLeadsAggregation();
  const { openCreateModal } = useBobjectFormVisibility();
  const { activeUser } = useActiveUser();
  const { isSmallDesktop, windowDimensions } = useMediaQuery();
  const { isCollapsed } = useSidebar();
  const shouldShowStartTasksTooltip =
    (isOnCadenceTab &&
      hasQSGEnabled &&
      !has(UserHelperTooltipsKeys.START_TASKS) &&
      has(UserHelperTooltipsKeys.ON_CADENCE_FILTERS) &&
      !useHasQueryParam('fromGuide')) ||
    useHasQueryParam('fromGuide') === 'StartTasks';
  const picklistValues = useEntity('bobjectPicklistFieldValues');
  const hasTasks = placeholderNavigableTasks && placeholderNavigableTasks.length > 0;

  const COMPANY_DEFAULT_VALUES = {
    [COMPANY_FIELDS_LOGIC_ROLE.AUTHOR]: activeUser?.id,
    [COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: activeUser?.id,
    [COMPANY_FIELDS_LOGIC_ROLE.STATUS]: picklistValues?.findByLogicRole(
      COMPANY_STATUS_LOGIC_ROLE.DELIVERED,
    )?.id,
  };

  const LEAD_DEFAULT_VALUES = {
    [LEAD_FIELDS_LOGIC_ROLE.AUTHOR]: activeUser?.id,
    [LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: activeUser?.id,
    [LEAD_FIELDS_LOGIC_ROLE.STATUS]: picklistValues?.findByLogicRole(
      LEAD_STATUS_LOGIC_ROLE.DELIVERED,
    )?.id,
  };

  const handleOpenBobjectForm = () => {
    openCreateModal({
      bobjectType: section === BOBJECT_SECTIONS.LEADS ? BOBJECT_TYPES.LEAD : BOBJECT_TYPES.COMPANY,
      defaultValues:
        section === BOBJECT_SECTIONS.LEADS ? LEAD_DEFAULT_VALUES : COMPANY_DEFAULT_VALUES,
    });
  };

  const getCounters = () => {
    switch (slug) {
      case 'delivered':
        return { company: deliveredCompaniesCounter, lead: deliveredLeadsCounter };
      case 'inactive':
        return { company: inactiveCompaniesCounter, lead: inactiveLeadsCounter };
      default:
        return { company: allCompaniesCounter, lead: allLeadsCounter };
    }
  };
  const counters = getCounters();
  const isPageWithTabs = ['delivered', 'inactive', 'all'].includes(slug);

  // This is needed to correctly set the task navigation settings
  useEffect(() => {
    setSalesNavigation(false);
    setPinnedBobjectTab(getBobjectType(get(key)));
  }, [slug]);

  function startTasks() {
    startNavigation();
  }

  return (
    <SubhomeHeader>
      <div className={styles._header_right_content}>
        {isPageWithTabs && (
          <SubhomeTabs>
            <SubhomeTab
              icon="company"
              counter={counters?.company}
              active={section === BOBJECT_SECTIONS.COMPANIES || !section}
              url={`${APP_TASKS_PROSPECTING}/${slug}/companies`}
              bobjectType={BobjectTypes.Company}
              setPinnedTab={setPinnedBobjectTab}
              isPinned={pinnedBobjectTab === BobjectTypes.Company}
            >
              Companies
            </SubhomeTab>
            <SubhomeTab
              icon="person"
              active={section === BOBJECT_SECTIONS.LEADS}
              counter={counters?.lead}
              url={`${APP_TASKS_PROSPECTING}/${slug}/leads`}
              bobjectType={BobjectTypes.Lead}
              setPinnedTab={setPinnedBobjectTab}
              isPinned={pinnedBobjectTab === BobjectTypes.Lead}
            >
              Leads
            </SubhomeTab>
          </SubhomeTabs>
        )}
        {isDeliveredTab && hasQSGEnabled && <CompanyLeadDivisionTooltip defaultTooltipVisible />}
        <div className={styles._header_right_content__end}>
          {hasStats && <ToggleStatsButton />}
          {isOnCadenceTab && <OnCadenceHeader />}
          {isDeliveredTab && (
            <>
              <div className={styles._playbook_message} onClick={() => {}}>
                <Icon name="magic" color="purple" size={16} />
                <Text size="xs" color="purple" htmlTag="span">
                  Check
                </Text>
                {section === BOBJECT_SECTIONS.COMPANIES || !section ? (
                  <EntityInfoTooltip defaultTooltipVisible>
                    <Text
                      size="xs"
                      color="purple"
                      weight="bold"
                      htmlTag="span"
                      decoration="underline"
                    >
                      <span
                        className={styles._playbook_message_link}
                        onClick={openTargetMarketsModal}
                      >
                        {windowDimensions.width < 1343 && !isCollapsed ? 'TM' : 'Target Markets'}
                      </span>
                    </Text>
                  </EntityInfoTooltip>
                ) : (
                  <EntityInfoTooltip defaultTooltipVisible>
                    <Text
                      size="xs"
                      color="purple"
                      weight="bold"
                      htmlTag="span"
                      decoration="underline"
                    >
                      <span
                        className={styles._playbook_message_link}
                        onClick={openBuyerPersonasModal}
                      >
                        {windowDimensions.width < 1317 && !isCollapsed ? 'BP' : 'Buyer Personas'}
                      </span>
                    </Text>
                  </EntityInfoTooltip>
                )}
              </div>
              <div className={styles._create_bobject_button}>
                <CreateBobjectTooltip defaultTooltipVisible section={section}>
                  <Button size="small" onClick={handleOpenBobjectForm}>
                    Create{' '}
                    {!isSmallDesktop
                      ? section === BOBJECT_SECTIONS.LEADS
                        ? 'Lead'
                        : 'Company'
                      : ' '}
                  </Button>
                </CreateBobjectTooltip>
              </div>
            </>
          )}
          {hasTaskNavigation() && (
            <>
              {shouldShowStartTasksTooltip ? (
                <StartTasksTooltip defaultTooltipVisible>
                  <Button
                    dataTest="tasksStart"
                    disabled={!hasTasks}
                    size="small"
                    onClick={!changingTaskNavigationSettings ? startTasks : undefined}
                    color={
                      !hasTasks
                        ? null
                        : changingTaskNavigationSettings
                        ? 'softBloobirds'
                        : 'bloobirds'
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
                          placeholderNavigableTasks?.length > 0
                            ? `(${placeholderNavigableTasks?.length})`
                            : ''
                        }`}
                  </Button>
                </StartTasksTooltip>
              ) : (
                <Button
                  dataTest="tasksStart"
                  disabled={!hasTasks}
                  size="small"
                  onClick={!changingTaskNavigationSettings ? startTasks : undefined}
                  color={
                    !hasTasks
                      ? null
                      : changingTaskNavigationSettings
                      ? 'softBloobirds'
                      : 'bloobirds'
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

              <div className={styles._startTaskSettings}>
                <StartTaskSettings
                  callingFromSalesPage={false}
                  updateLoading={setChangingTaskNavigationSettings}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </SubhomeHeader>
  );
};

const DeliveredTab = () => {
  const companiesCounter = useProspectingCompanyDeliveredAggregation();
  const leadsCounter = useProspectingLeadDeliveredAggregation();
  const { get } = useUserHelpers();
  const defaultBobject = get(CustomUserHelperKeys.DELIVERED_DEFAULT_TAB);

  return (
    <div className={styles._tab_wrapper}>
      <SubhomeSidebarTab
        counter={companiesCounter + leadsCounter}
        tabName="delivered"
        tabUrl={`${APP_TASKS_PROSPECTING}/delivered${defaultBobject ? `/${defaultBobject}` : ''}`}
        icon="inbox"
        tooltipText="Number of companies and leads in delivered status assigned to you. Use quick actions and quick filters to prepare and organise your pipeline for start prospecting in bulk."
      >
        Delivered
      </SubhomeSidebarTab>
      <StartToFinishTooltip defaultTooltipVisible />
    </div>
  );
};

const OnCadenceTab = () => {
  const counter = useProspectingOnCadenceAggregation();
  const { save } = useUserHelpers();
  const hasQSGEnabled = useQuickStartEnabled();
  const isTour = !useHasQueryParam('fromGuide');
  return (
    <div
      className={styles._tab_wrapper}
      onClick={() => save(UserHelperTooltipsKeys.ON_CADENCE_DISCOVERY_TOOLTIP)}
    >
      <SubhomeSidebarTab
        counter={counter}
        tabName="onCadence"
        tabUrl={`${APP_TASKS_PROSPECTING}/onCadence${isTour ? '?tour=true' : ''}`}
        icon="cadence"
        active
        tooltipText="Number of cadence tasks on companies and/or leads that you have to complete today. Overdue tasks also count! Try to leave the counter at 0 before the end of the day!"
      >
        On cadence
      </SubhomeSidebarTab>
      {hasQSGEnabled && <OnCadenceTooltip />}
    </div>
  );
};

const ScheduledTab = () => {
  const counter = useProspectingScheduledAggregation();
  return (
    <SubhomeSidebarTab
      counter={counter}
      tabName="scheduled"
      tabUrl={`${APP_TASKS_PROSPECTING}/scheduled`}
      icon="clock"
      active
      tooltipText="Number of scheduled tasks on companies and/or leads that you have to complete today. Overdue tasks also count! Try to leave the counter at 0 before the end of the day!"
    >
      Scheduled
    </SubhomeSidebarTab>
  );
};

const MeetRemindersTab = () => {
  const counter = useProspectingMeetingRemindersAggregation();
  return (
    <SubhomeSidebarTab
      counter={counter}
      tabName="meetingTasks"
      tabUrl={`${APP_TASKS_PROSPECTING}/meetingTasks`}
      icon="calendar"
      active
      tooltipText="Number of meeting reminder tasks on companies and/or leads that you have to complete today. Overdue tasks also count! Try to leave the counter at 0 before the end of the day!"
    >
      Meeting tasks
    </SubhomeSidebarTab>
  );
};

const NurturingTab = () => {
  const counter = useProspectingNurturingAggregation();
  return (
    <SubhomeSidebarTab
      counter={counter}
      tabName="nurturing"
      tabUrl={`${APP_TASKS_PROSPECTING}/nurturing`}
      icon="refresh"
      active
      tooltipText="Number of tasks from companies and/or leads in nurturing status that you have to complete today! Overdue tasks also count. Try to leave the counter at 0 at the end of the day!"
    >
      Nurturing
    </SubhomeSidebarTab>
  );
};

const InactiveTab = () => {
  const companiesCounter = useProspectingCompanyInactiveAggregation();
  const leadsCounter = useProspectingLeadInactiveAggregation();
  const counter = companiesCounter + leadsCounter;
  const { get } = useUserHelpers();
  const defaultBobject = get(CustomUserHelperKeys.INACTIVE_DEFAULT_TAB);

  return (
    <SubhomeSidebarTab
      counter={counter}
      tabName="inactive"
      tabUrl={`${APP_TASKS_PROSPECTING}/inactive${defaultBobject ? `/${defaultBobject}` : ''}`}
      icon="alertTriangle"
      tooltipText="Number of active companies and leads you have with no future tasks. Try to check them periodically so that you don't leave them forgotten!"
    >
      Inactive
    </SubhomeSidebarTab>
  );
};

const AllMyEntities = () => {
  const { slug }: { slug: PROSPECTING_SLUGS } = useParams();
  const allCompaniesCounter = useProspectingAllMyCompaniesAggregation();
  const allLeadsCounter = useProspectingAllMyLeadsAggregation();
  const { get } = useUserHelpers();
  const defaultBobject = get(CustomUserHelperKeys.ALL_DEFAULT_TAB);

  return (
    <SubhomeSidebarTab
      tabName={'all'}
      counter={allCompaniesCounter + allLeadsCounter}
      tabUrl={`${APP_TASKS_PROSPECTING}/all${defaultBobject ? `/${defaultBobject}` : ''}`}
      icon="list"
      tooltipText="Number of companies and leads assigned to you. Use this tab to organise them with quick filters and take bulk actions on them."
    >
      <p
        className={clsx(styles._tab_text, {
          [styles._tab_text_selected]: slug === 'all',
        })}
      >
        All
      </p>
    </SubhomeSidebarTab>
  );
};

const DeliveredBanner = () => {
  const { history } = useRouter();
  const bobjectFields = useEntity('bobjectFields');
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');

  const goToFilteredCompanyList = () => {
    const assignedToFieldId = bobjectFields?.findByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO)
      ?.id;
    const statusFieldId = bobjectFields?.findByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.STATUS)?.id;
    const statusFindingLeadsId = bobjectPicklistFieldValues?.findByLogicRole(
      COMPANY_STATUS_LOGIC_ROLE.FINDING_LEADS,
    )?.id;
    const statusReadyToProspectId = bobjectPicklistFieldValues?.findByLogicRole(
      COMPANY_STATUS_LOGIC_ROLE.READY_TO_PROSPECT,
    )?.id;
    const query = {
      [assignedToFieldId]: [
        {
          type: 'EXACT__SEARCH',
          value: ['__me__'],
        },
      ],
      [statusFieldId]: {
        type: 'EXACT__SEARCH',
        value: [statusFindingLeadsId, statusReadyToProspectId],
      },
    };

    return history.push(`${APP_CL_COMPANIES}?query=${encodeURIComponent(JSON.stringify(query))}`);
  };

  return (
    <AlertBanner
      type="alert"
      onHide={hideBanner}
      message={
        <div className={styles._banner_container}>
          <div className={styles._banner_icon}>
            <Icon name="info" color="banana" />️
          </div>
          <Text size="s" inline align="center">
            You still have companies in status <b>Ready to prospect</b> and/or <b>Finding leads</b>.
            Those status are now outdated! Check{' '}
            <span className={styles._banner_link} onClick={goToFilteredCompanyList}>
              here
            </span>{' '}
            the full list to update them!
            <a
              className={styles._banner_link}
              href="https://support.bloobirds.com/hc/en-us/articles/4403728671122"
              target="_blank"
              rel="noreferrer"
            >
              {' '}
              Know more
            </a>{' '}
          </Text>
        </div>
      }
    />
  );
};

const ProspectingContentWrapper = ({ parentRef }) => {
  const { isOpen: isOpenTargetMarketsModal, closeTargetMarketsModal } = useTargetMarketsModal();
  const { isOpen: isOpenBuyerPersonasModal, closeBuyerPersonasModal } = useBuyerPersonasModal();
  const {
    isOpen: isOpenDeleteQuickFilterModal,
    closeDeleteQuickFilter,
  } = useDeleteQuickFilterModal();
  const { slug, section } = useParams();

  return (
    <>
      <ProspectingContentHeader />
      <ProspectingContent parentRef={parentRef} />
      <UndoToast />
      {isOpenTargetMarketsModal && (
        <TargetMarketsModal handleCloseModal={closeTargetMarketsModal} />
      )}
      {isOpenBuyerPersonasModal && (
        <BuyerPersonasModal handleCloseModal={closeBuyerPersonasModal} />
      )}
      {isOpenDeleteQuickFilterModal && (
        <DeleteQuickFilterModal
          tabName={getTabName(slug, section)}
          handleCloseModal={closeDeleteQuickFilter}
        />
      )}
    </>
  );
};

const ProspectingContent = ({ parentRef }: { parentRef: React.RefObject<HTMLDivElement> }) => {
  const { slug, section } = useParams<{
    slug: PROSPECTING_SLUGS;
    section: 'companies' | 'leads';
  }>();

  let component;
  switch (slug) {
    case PROSPECTING_SLUGS.ON_CADENCE:
      component = <OnCadenceContent />;
      break;
    case PROSPECTING_SLUGS.SCHEDULED:
      component = <ScheduledContent />;
      break;
    case PROSPECTING_SLUGS.MEETING:
      component = <MeetingRemindersContent />;
      break;
    case PROSPECTING_SLUGS.NURTURING:
      component = <NurturingContent />;
      break;
    case PROSPECTING_SLUGS.INACTIVE:
      if (section === BOBJECT_SECTIONS.LEADS) {
        component = <InactiveLeadContent />;
        break;
      }
      component = <InactiveCompanyContent />;
      break;
    case PROSPECTING_SLUGS.ALL:
    case PROSPECTING_SLUGS.ALL_MY_COMPANIES:
      if (section === BOBJECT_SECTIONS.LEADS) {
        component = <AllMyEntitiesLeadContent />;
        break;
      }
      component = <AllMyEntitiesCompanyContent />;
      break;
    case PROSPECTING_SLUGS.DELIVERED:
    default: {
      if (section === BOBJECT_SECTIONS.LEADS) {
        component = <LeadDeliveredListContent />;
        break;
      }
      component = <CompanyDeliveredListContent />;
      break;
    }
  }
  return <SubhomePageProvider parentRef={parentRef}>{component}</SubhomePageProvider>;
};

const ProspectingPage = () => {
  const { slug } = useParams();
  const isDeliveredTab = slug === 'delivered' || !slug;
  const oldStatusCompaniesCount = useReadyToProspectAndFindingLeadsCompanies();
  const hasOldCompanies = () => oldStatusCompaniesCount > 0;
  const hasNurturingTab = useProspectingNurturingTab();
  const showBanner = isDeliveredTab && shouldBeVisible() && hasOldCompanies();
  const tabTitle = slug ? ` - ${toTitleCase(slug)}` : '';

  useDocumentTitle(`Prospect${tabTitle}`);

  return (
    <SubhomeLayout name="Prospect" defaultTab="delivered">
      <>
        <SubhomeSidebar>
          <>
            <ProspectingSidebarHeader />
            <SubhomeSidebarTabs>
              <DeliveredTab />
              <OnCadenceTab />
              <ScheduledTab />
              <MeetRemindersTab />
              {hasNurturingTab && <NurturingTab />}
              <InactiveTab />
              <AllMyEntities />
            </SubhomeSidebarTabs>
          </>
        </SubhomeSidebar>
        <SubhomeContent banner={showBanner ? <DeliveredBanner /> : null}>
          <ProspectingContentWrapper />
        </SubhomeContent>
      </>
    </SubhomeLayout>
  );
};

export default ProspectingPage;
