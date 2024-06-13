import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LogCallModal, useDialerLauncher } from '@bloobirds-it/dialer';
import {
  CreateTasksTooltip,
  CustomTasksTooltip,
  EmailActionTooltip,
} from '@bloobirds-it/discovery-tooltips';
import {
  Button,
  Dropdown,
  Item,
  Section,
  Skeleton,
  Text,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import {
  useBaseSetEmailVariablesValues,
  useFullSalesEnabled,
  useMinimizableModals,
  useNewCadenceTableEnabled,
  useWhatsappEnabled,
  useWhatsappOpenNewPage,
  useUserSearch,
  useSyncBobjectStatus,
  useAircallPhoneLinkEnabled,
} from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  ContactViewSubTab,
  ExtensionBobject,
  ExtensionCompany,
  LinkedInLead,
  MessagesEvents,
} from '@bloobirds-it/types';
import { EMAIL_MODE, openPhoneOrDialer, openWhatsAppWeb } from '@bloobirds-it/utils';
import clsx from 'clsx';
import useSWR from 'swr';

import { useTargetMarkets } from '../../../../../hooks/useTargetMarkets';
import { ExtendedContextTypes } from '../../../../../types/extendedContext';
import { api } from '../../../../../utils/api';
import { COMPANY_STAGE_LOGIC_ROLE } from '../../../../../utils/company';
import { BubbleWindow } from '../../../bubbleWindow/bubbleWindow';
import { useExtensionContext } from '../../../context';
import { SalesforceNoCompanyPage } from '../../../salesforceNoCompanyPage/salesforceNoCompanyPage';
import { StageAndStatusLabel } from '../../../stageAndStatusLabel/stageAndStatusLabel';
import { ActivityFeedWrapper } from '../../components/activityFeed/activityFeedWrapper';
import { ClusteredTasksList } from '../../components/clusteredTaskFeed/components/taskList/tasksTabsList';
import {
  ContactViewAction,
  ContactViewActions,
  ContactViewDropdownAction,
} from '../../components/contactViewActions/contactViewActions';
import { ContactViewContent } from '../../components/contactViewContent/contactViewContent';
import { ContactViewDetails } from '../../components/contactViewDetails/contactViewDetails';
import {
  ContactViewFooter,
  ContactViewFooterTab,
} from '../../components/contactViewFooter/contactViewFooter';
import ContactViewHeader from '../../components/contactViewHeader/contactViewHeader';
import { ContactViewPlaybook } from '../../components/contactViewPlaybook/contactViewPlaybook';
import { LastActivityOverview } from '../../components/lastActivityOverview/lastActivityOverview';
import { LeadBriefCard } from '../../components/leadBriefCard/leadBriefCard';
import QuickLogCustomTask from '../../components/quickLogCustomTask/quickLogCustomTask';
import { RelationsFeed } from '../../components/relationsFeed/relationsFeed';
import { StageDivider } from '../../components/stageDivider/stageDivider';
import { TasksFeed } from '../../components/tasksFeed/tasksFeed';
import { WizardHelper } from '../../components/wizardHelper/wizardHelper';
import styles from '../../contactView.module.css';
import { useContactViewContext } from '../../context/contactViewContext';
import { useOpenNote } from '../../hooks/useOpenNote';
import { useSubscribeListeners } from '../../hooks/useSubscribeListeners';
import { PhoneDropdownContent } from '../components/phoneDropdownContent';
import { ContactButtons } from '../contactButtons/contactButtons';

export interface ContactCompanyPageProps {
  company: ExtensionCompany;
  leads: LinkedInLead[];
  loading: boolean;
  opportunities: Bobject[];
}

const RenderLeads = ({
  leads,
  loading,
  sidePeekEnabled,
}: {
  leads: LinkedInLead[];
  loading: boolean;
  sidePeekEnabled: boolean;
}) => {
  const leadsTitleClasses = clsx(styles.leadsTitle, {
    [styles.leadsTitleSidePeek]: sidePeekEnabled,
  });
  const { t } = useTranslation();

  return (
    <div>
      <Text className={leadsTitleClasses} size="xs" color="softPeanut" weight="bold">
        {t('sidePeek.overview.leads')}
      </Text>
      {leads?.length > 0 ? (
        <div className={styles.leadsList}>
          {leads?.map(lead => {
            return <LeadBriefCard lead={lead} key={lead?.id?.value} />;
          })}
        </div>
      ) : (
        <>
          {loading ? (
            <Skeleton height={96} width="100%" variant="rect" />
          ) : (
            <Text size="s" align="center" color="softPeanut">
              {t('sidePeek.overview.noBobjectInThisBobject', {
                bobject1: t('bobjectTypes.lead'),
                bobject2: t('bobjectTypes.company'),
              })}
            </Text>
          )}
        </>
      )}
    </div>
  );
};

const contentToRender = (
  activeSubTab: ContactViewSubTab,
  bobject: ExtensionBobject<BobjectTypes.Company>,
  leads: LinkedInLead[],
  ref: React.RefObject<HTMLDivElement>,
  loading: boolean,
) => {
  const { useGetSidePeekEnabled } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();

  const overviewContainerClasses = clsx(styles.overviewContainer, {
    [styles.overviewContainerSidePeek]: sidePeekEnabled,
  });

  switch (activeSubTab) {
    case ContactViewSubTab.OVERVIEW:
      return (
        <div className={overviewContainerClasses}>
          <LastActivityOverview
            bobjectId={bobject.id}
            touchesCount={bobject.touchesCount}
            lastAttempt={bobject.lastAttempt}
            lastTouch={bobject.lastTouch}
            attemptsCount={bobject.attemptsCount}
            leadsIds={leads?.map(l => l?.id?.value)}
          />
          <ContactViewDetails bobject={bobject} />
          <RenderLeads leads={leads} loading={loading} sidePeekEnabled={sidePeekEnabled} />
        </div>
      );
    case ContactViewSubTab.ACTIVITIES:
      return <ActivityFeedWrapper parentRef={ref} bobject={bobject} />;
    case ContactViewSubTab.TASKS:
      return <ClusteredTasksList mainBobject={bobject} parentRef={ref} />;
    case ContactViewSubTab.RELATIONS:
      return <RelationsFeed />;
    case ContactViewSubTab.PLAYBOOK:
      return <ContactViewPlaybook />;
    default:
      return <>Under construction</>;
  }
};

export const ContactCompanyPage = ({
  company,
  leads,
  opportunities,
  loading = false,
}: ContactCompanyPageProps): JSX.Element => {
  const {
    openExtendedScreen,
    closeExtendedScreen,
    useGetExtendedContext,
    useGetSettings,
    useGetDataModel,
  } = useExtensionContext();
  const extendedContext = useGetExtendedContext();
  const settings = useGetSettings();
  const { t } = useTranslation('translation', { keyPrefix: 'sidePeek.contactViewActions' });
  const ref = useRef<HTMLDivElement>(null);
  const { activeSubTab, setActiveSubTab, actionsDisabled } = useContactViewContext();
  const targetMarkets = useTargetMarkets();
  const { visible, setVisible, ref: dropdownRef } = useVisible();
  const quickLogVisibilityProps = useVisible();
  const [minimized, setMinimized] = useState<boolean>(false);
  const [openLogCall, setOpenLogCall] = useState<boolean>();
  const { openMinimizableModal } = useMinimizableModals();
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const {
    visible: whatsAppPhonesVisible,
    setVisible: setWhatsAppPhonesVisible,
    ref: whatsAppPhonesRef,
  } = useVisible();
  const {
    visible: arePhoneNumbersVisible,
    setVisible: togglePhoneNumbersDropdown,
    ref: phoneNumbersRef,
  } = useVisible();
  const { openDialer } = useDialerLauncher();
  const { targetMarket, name, stage } = company;
  const tm = targetMarkets?.find(bp => bp?.id === targetMarket);
  const hasSalesEnabled = useFullSalesEnabled(company?.id.accountId);
  const hasCustomTaskEnabled = useNewCadenceTableEnabled(company?.id?.accountId);
  const dataModel = useGetDataModel();
  const hasWhatsappEnabled = useWhatsappEnabled(company?.id?.accountId);
  const forceWsOpenNewPage = useWhatsappOpenNewPage(company?.id?.accountId);
  const hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();
  const assigneeId = company?.assignedTo;
  const users = useUserSearch();
  const assigneeUser = users?.users?.find(user => user?.id === assigneeId);
  const mainNote = company?.mainNote;
  const { syncStatus } = useSyncBobjectStatus(company?.id?.accountId, [company]);

  const { data: mainNoteData, mutate } = useSWR(
    mainNote && `/contactViewMainNote/${mainNote}`,
    () => api.get(`/bobjects/${mainNote}/form`),
  );

  const noLeadNumbers = leads?.filter(l => l?.phoneNumbers?.length > 0).length === 0;
  const noCompanyNumbers = !company?.phoneNumbers || company?.phoneNumbers?.length === 0;
  const noLeads = !leads || leads?.length === 0;
  const noPhoneNumbers = (noLeads && noCompanyNumbers) || (noLeadNumbers && noCompanyNumbers);

  useSubscribeListeners(company?.id?.typeName as BobjectTypes, mutate);

  const { openNoteModal, openMainNoteModal } = useOpenNote(company, mainNoteData, setVisible);

  const isSalesStage =
    dataModel?.findValueById(stage)?.logicRole === COMPANY_STAGE_LOGIC_ROLE.SALES;
  const emailField = dataModel?.findFieldByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.EMAIL)?.id;

  const handleOpenModal = () => {
    setEmailVariablesValue({
      company: company?.rawBobject,
      lead: null,
      opportunity: null,
    });
    openMinimizableModal({
      type: 'email',
      title: t('newEmail'),
      data: {
        template: {
          content: '',
          subject: '',
          id: null,
          format: null,
          mediaFiles: null,
        },
        mode: EMAIL_MODE.SEND,
        isBlankEmail: true,
        company,
        leads,
        opportunities,
        pageBobjectType: BobjectTypes.Company,
        ...(company?.rawBobject?.[emailField]
          ? { defaultToEmail: [company?.rawBobject?.[emailField]] }
          : {}),
      },
      onSave: () => {
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Activity },
          }),
        );
      },
    });
  };

  function openMeetingModal() {
    openMinimizableModal({
      type: 'calendarMeeting',
      data: {
        company: company,
      },
      onSave: () => {
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Activity },
          }),
        );
      },
    });
  }

  function openBobjectDetail() {
    if (extendedContext?.type === ExtendedContextTypes.BOBJECT_DETAILS) {
      closeExtendedScreen();
    } else {
      openExtendedScreen({
        type: ExtendedContextTypes.BOBJECT_DETAILS,
        bobject: company,
      });
    }
  }

  function openTaskModal() {
    openMinimizableModal({
      type: 'task',
      data: {
        company: company,
        location: 'bubble',
      },
    });
  }

  function openLinkedInView() {
    const linkedInCompanyLink = company.linkedInUrl;
    const salesNavLink = company.salesNavigatorUrl;

    if (linkedInCompanyLink) {
      window.open(linkedInCompanyLink + '?bb-messaging-tab-open', '_blank');
    } else if (salesNavLink) {
      window.open(salesNavLink + '?bb-messaging-tab-open', '_blank');
    } else {
      window.open(
        'https://www.linkedin.com/messaging/thread/new/?bbFullName=' + company.name,
        '_blank',
      );
    }
  }

  const largeDropdownStyles = {
    maxHeight: '600px',
    overflowY: 'scroll',
    overflowX: 'hidden',
    marginTop: '4px',
  };

  if (!company) {
    return <SalesforceNoCompanyPage />;
  }

  const handleClickTab = (tab: ContactViewSubTab) => {
    setActiveSubTab(tab);
    closeExtendedScreen();
  };

  return (
    <BubbleWindow>
      <ContactViewHeader
        badgeColor={tm?.color}
        badgeContent={tm?.shortName}
        tooltip={tm && `${t('targetMarket')}: ${tm?.name}`}
        title={name}
        icon="company"
        subtitle={tm?.name}
        assigneeUser={assigneeUser}
        syncStatus={syncStatus}
        bobjectId={company.id}
        buttons={
          <ContactButtons
            bobject={company}
            mainNoteBobject={mainNoteData}
            isDisabled={actionsDisabled}
          />
        }
        labels={company ? <StageAndStatusLabel bobject={company} /> : null}
        bobject={company}
        minimizedView={minimized}
      />
      <ContactViewActions>
        <Dropdown
          ref={phoneNumbersRef}
          visible={arePhoneNumbersVisible}
          position="bottom"
          customStyles={leads?.length > 12 ? largeDropdownStyles : null}
          anchor={
            <ContactViewAction
              color="extraCall"
              icon="phone"
              onClick={() => {
                togglePhoneNumbersDropdown(true);
              }}
              isDisabled={actionsDisabled}
            />
          }
        >
          <PhoneDropdownContent
            bobject={company}
            callback={phone => {
              togglePhoneNumbersDropdown(false);
              openPhoneOrDialer(phone, settings, openDialer, company?.id?.value);
            }}
            closeDropdown={() => togglePhoneNumbersDropdown(false)}
          />
          {leads &&
            leads?.length > 0 &&
            leads?.map((lead: LinkedInLead, idx: number) => {
              return (
                <PhoneDropdownContent
                  key={idx + '_' + lead?.id?.value}
                  notShowIfEmpty
                  bobject={lead}
                  callback={phone => {
                    togglePhoneNumbersDropdown(false);
                    openPhoneOrDialer(phone, settings, openDialer, lead?.id?.value);
                  }}
                  closeDropdown={() => togglePhoneNumbersDropdown(false)}
                />
              );
            })}
          <Section id="logCallManually" icon="zap">
            {t('quickLog')}
          </Section>
          <Item
            onClick={() => {
              togglePhoneNumbersDropdown(false);
              setOpenLogCall(true);
            }}
          >
            {t('logCallManually')}
          </Item>
          {noPhoneNumbers && (
            <>
              <Section id="callManually" icon="zap">
                {t('callManually')}
              </Section>
              {hasAircallPhoneLinkEnabled ? (
                <a href={`callto:`} className={styles.openAircallDialer}>
                  <Item>{t('openDialer')}</Item>
                </a>
              ) : (
                <Item
                  onClick={() => {
                    openPhoneOrDialer('', settings, openDialer);
                  }}
                >
                  {t('openDialer')}
                </Item>
              )}
            </>
          )}
        </Dropdown>
        <div style={{ position: 'relative' }}>
          <ContactViewAction
            color="tangerine"
            icon="mail"
            onClick={handleOpenModal}
            isDisabled={actionsDisabled}
          />
          <EmailActionTooltip />
        </div>
        <ContactViewAction
          color="darkBloobirds"
          icon="linkedin"
          onClick={openLinkedInView}
          isDisabled={actionsDisabled}
        />
        {hasWhatsappEnabled && (
          <Dropdown
            ref={whatsAppPhonesRef}
            visible={whatsAppPhonesVisible}
            position="bottom"
            customStyles={leads?.length > 12 ? largeDropdownStyles : null}
            anchor={
              <ContactViewAction
                color="whatsapp"
                icon="whatsapp"
                onClick={() =>
                  company?.phoneNumbers?.length > 0
                    ? setWhatsAppPhonesVisible(true)
                    : openWhatsAppWeb(forceWsOpenNewPage)
                }
                isDisabled={actionsDisabled}
              />
            }
          >
            <PhoneDropdownContent
              bobject={company}
              callback={phone => {
                setWhatsAppPhonesVisible(false);
                openWhatsAppWeb(forceWsOpenNewPage, phone);
              }}
              isWhatsApp
            />
            {leads &&
              leads?.length > 0 &&
              leads?.map((lead: LinkedInLead, idx: number) => {
                return (
                  <PhoneDropdownContent
                    key={idx + '_' + lead?.id?.value}
                    notShowIfEmpty
                    bobject={lead}
                    callback={phone => {
                      setWhatsAppPhonesVisible(false);
                      openWhatsAppWeb(forceWsOpenNewPage, phone);
                    }}
                    isWhatsApp
                  />
                );
              })}
          </Dropdown>
        )}
        <div style={{ position: 'relative' }}>
          <ContactViewAction
            color="softBloobirds"
            icon="taskAction"
            onClick={openTaskModal}
            isDisabled={actionsDisabled}
          />
          <CreateTasksTooltip />
        </div>
        {mainNoteData ? (
          <ContactViewDropdownAction
            color="banana"
            icon="noteAction"
            visible={visible}
            setVisible={setVisible}
            ref={dropdownRef}
            isDisabled={actionsDisabled}
          >
            <div className={styles.noteDropdown}>
              <Text size="xs">{t('noteMessage')}</Text>
              <div className={styles.noteOptions}>
                <Button size="small" onClick={openNoteModal} variant="secondary" uppercase={false}>
                  {t('new')}
                </Button>
                <Button
                  size="small"
                  iconLeft="starChecked"
                  onClick={openMainNoteModal}
                  uppercase={false}
                >
                  {t('mainNote')}
                </Button>
              </div>
            </div>
          </ContactViewDropdownAction>
        ) : (
          <ContactViewAction
            color="banana"
            icon="noteAction"
            onClick={openNoteModal}
            isDisabled={actionsDisabled}
          />
        )}
        <ContactViewAction
          color="tomato"
          icon="calendar"
          onClick={openMeetingModal}
          isDisabled={actionsDisabled}
        />
        {hasCustomTaskEnabled && (
          <CustomTasksTooltip defaultTooltipVisible>
            <QuickLogCustomTask
              isDisabled={actionsDisabled}
              bobject={company}
              leads={leads}
              visibilityProps={quickLogVisibilityProps}
            />
          </CustomTasksTooltip>
        )}
        <ContactViewAction
          color="bloobirds"
          icon="agendaPerson"
          onClick={openBobjectDetail}
          isDisabled={actionsDisabled}
        />
      </ContactViewActions>
      {hasSalesEnabled && <StageDivider color={isSalesStage ? 'peanut' : 'softGrape'} />}
      {activeSubTab === ContactViewSubTab.OVERVIEW && (
        <WizardHelper bobject={company} minimized={minimized} />
      )}
      <ContactViewContent
        ref={ref}
        fullWidth={activeSubTab !== ContactViewSubTab.TASKS}
        onScroll={(top, canMinimize, canMaximize) => {
          if (top === 0 && minimized && canMaximize) {
            setMinimized(false);
          } else if (top >= 30 && !minimized && canMinimize) {
            setMinimized(true);
          }
        }}
      >
        {contentToRender(activeSubTab, company, leads, ref, loading)}
      </ContactViewContent>
      <ContactViewFooter>
        <ContactViewFooterTab
          name={ContactViewSubTab.OVERVIEW}
          icon={'assignBoard'}
          onClick={handleClickTab}
          selected={activeSubTab}
        />
        <ContactViewFooterTab
          name={ContactViewSubTab.ACTIVITIES}
          icon={'activity'}
          onClick={handleClickTab}
          selected={activeSubTab}
        />
        <ContactViewFooterTab
          name={ContactViewSubTab.TASKS}
          icon={'checkDouble'}
          onClick={handleClickTab}
          selected={activeSubTab}
        />
        <ContactViewFooterTab
          name={ContactViewSubTab.RELATIONS}
          icon={'share'}
          onClick={handleClickTab}
          selected={activeSubTab}
        />
        <ContactViewFooterTab
          name={ContactViewSubTab.PLAYBOOK}
          icon={'magic'}
          onClick={handleClickTab}
          selected={activeSubTab}
        />
      </ContactViewFooter>
      {openLogCall && (
        <LogCallModal
          companyId={company?.id?.value}
          dialedNumber={company?.phoneNumbers?.[0]}
          onClose={() => setOpenLogCall(false)}
          dataModel={dataModel}
          leadsPhoneNumbers={(company?.phoneNumbers || [])?.concat(
            leads?.reduce((acc, lead) => {
              if (Array.isArray(lead?.phoneNumbers)) {
                return acc.concat(lead?.phoneNumbers);
              }
              return acc;
            }, []),
          )}
        />
      )}
    </BubbleWindow>
  );
};
