import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LogCallModal, useDialerLauncher } from '@bloobirds-it/dialer';
import {
  CreateTasksTooltip,
  CustomTasksTooltip,
  EmailActionTooltip,
} from '@bloobirds-it/discovery-tooltips';
import { Button, Dropdown, Item, Section, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import {
  useBaseSetEmailVariablesValues,
  useFullSalesEnabled,
  useIsB2CAccount,
  useMinimizableModals,
  useNewCadenceTableEnabled,
  useSyncBobjectStatus,
  useUserSearch,
  useWhatsappEnabled,
  useWhatsappOpenNewPage,
  useIsPersonAccountAsAccount,
  useB2CShowAccountPhonesSetting,
  useAircallPhoneLinkEnabled,
} from '@bloobirds-it/hooks';
import {
  BobjectTypes,
  ContactViewSubTab,
  ExtensionOpportunity,
  LEAD_FIELDS_LOGIC_ROLE,
  LinkedInLead,
  MessagesEvents,
} from '@bloobirds-it/types';
import { EMAIL_MODE, openPhoneOrDialer, openWhatsAppWeb } from '@bloobirds-it/utils';
import clsx from 'clsx';
import useSWR from 'swr';

import { useBuyerPersonas } from '../../../../../hooks/useBuyerPersonas';
import { clickMessageButton } from '../../../../../injectors/linkedin/linkedinMessagesFromBBInjector';
import { ExtendedContextTypes } from '../../../../../types/extendedContext';
import { api } from '../../../../../utils/api';
import { LEAD_STAGE_LOGIC_ROLE } from '../../../../../utils/lead';
import { BubbleWindow } from '../../../bubbleWindow/bubbleWindow';
import { useExtensionContext } from '../../../context';
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
import QuickLogCustomTask from '../../components/quickLogCustomTask/quickLogCustomTask';
import { RelationsFeed } from '../../components/relationsFeed/relationsFeed';
import { StageDivider } from '../../components/stageDivider/stageDivider';
import { WizardHelper } from '../../components/wizardHelper/wizardHelper';
import styles from '../../contactView.module.css';
import { useContactViewContext } from '../../context/contactViewContext';
import { useOpenNote } from '../../hooks/useOpenNote';
import { useSubscribeListeners } from '../../hooks/useSubscribeListeners';
import { PhoneDropdownContent } from '../components/phoneDropdownContent';
import { ContactButtons } from '../contactButtons/contactButtons';
import { OpportunityList } from '../contactOpportunityList/contactOpportunityList';

export interface ContactLeadPageProps {
  lead: LinkedInLead;
  leads: LinkedInLead[];
}

const contentToRender = (
  activeSubTab: ContactViewSubTab,
  lead: LinkedInLead,
  opportunities: ExtensionOpportunity[],
  ref: React.RefObject<HTMLDivElement>,
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
            bobjectId={lead.id}
            touchesCount={lead.touchesCount}
            lastAttempt={lead.lastAttempt}
            lastTouch={lead.lastTouch}
            attemptsCount={lead.attemptsCount}
          />
          <ContactViewDetails bobject={lead} />
          <OpportunityList opportunities={opportunities} withTitle />
        </div>
      );
    case ContactViewSubTab.ACTIVITIES:
      return <ActivityFeedWrapper parentRef={ref} bobject={lead} />;
    case ContactViewSubTab.TASKS:
      return <ClusteredTasksList mainBobject={lead} parentRef={ref} />;
    case ContactViewSubTab.RELATIONS:
      return <RelationsFeed />;
    case ContactViewSubTab.PLAYBOOK:
      return <ContactViewPlaybook />;
    default:
      return <>Under construction</>;
  }
};

export const ContactLeadPage = ({ lead, leads }: ContactLeadPageProps): JSX.Element => {
  const {
    openExtendedScreen,
    closeExtendedScreen,
    useGetExtendedContext,
    useGetSettings,
    setActiveBobject,
    useGetActiveBobject,
    useGetActiveBobjectContext,
    useGetCurrentPage,
    useGetDataModel,
  } = useExtensionContext();
  const settings = useGetSettings();
  const extendedContext = useGetExtendedContext();

  const ref = useRef<HTMLDivElement>(null);
  const { leadIcp, stage } = lead;
  const { activeSubTab, setActiveSubTab } = useContactViewContext();
  const { openMinimizableModal } = useMinimizableModals();
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const contextBobjects = useGetActiveBobjectContext();
  const currentPage = useGetCurrentPage();
  const [minimized, setMinimized] = useState<boolean>(false);
  const hasSalesEnabled = useFullSalesEnabled(lead?.id.accountId);
  const hasCustomTaskEnabled = useNewCadenceTableEnabled(lead?.id?.accountId);
  const dataModel = useGetDataModel();
  const hasWhatsappEnabled = useWhatsappEnabled(lead?.id?.accountId);
  const forceWsOpenNewPage = useWhatsappOpenNewPage(lead?.id?.accountId);
  const hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();
  const isSalesStage = dataModel?.findValueById(stage)?.logicRole === LEAD_STAGE_LOGIC_ROLE.SALES;
  const opportunityFieldId = dataModel?.findFieldByLogicRole(
    LEAD_FIELDS_LOGIC_ROLE.LEAD_OPPORTUNITIES,
  )?.id;
  const [openLogCall, setOpenLogCall] = useState<boolean>();
  const opportunitiesIds = lead?.rawBobject[opportunityFieldId]?.split('\u001E');
  const hasOpportunities = opportunitiesIds?.length > 0;
  const buyerPersonas = useBuyerPersonas();
  const icp = buyerPersonas?.find(bp => bp?.id === leadIcp);
  const assigneeId = lead?.assignedTo;
  const users = useUserSearch();
  const isB2CAccount = useIsB2CAccount();
  const isPersonAccountAsAccount = useIsPersonAccountAsAccount();
  const B2CShowAccountPhonesActive = useB2CShowAccountPhonesSetting();
  const activeBobject = useGetActiveBobject();
  const { syncStatus } = useSyncBobjectStatus(lead?.id?.accountId, [lead]);
  const { t } = useTranslation('translation', { keyPrefix: 'sidePeek.contactViewActions' });

  const assigneeUser = users?.users?.find(user => user?.id === assigneeId);
  const mainNote = lead?.mainNote;
  const { visible, setVisible, ref: dropdownRef } = useVisible();
  const {
    visible: arePhoneNumbersVisible,
    setVisible: togglePhoneNumbersDropdown,
    ref: phoneNumbersRef,
  } = useVisible();
  const {
    visible: whatsAppPhonesVisible,
    setVisible: setWhatsAppPhonesVisible,
    ref: whatsAppPhonesRef,
  } = useVisible();
  const quickLogVisibilityProps = useVisible();
  const { actionsDisabled } = useContactViewContext();
  const { openDialer } = useDialerLauncher();
  const { data: mainNoteData, mutate } = useSWR(
    mainNote && `/contactViewMainNote/${mainNote}`,
    () => api.get(`/bobjects/${mainNote}/form`),
  );

  const noLeadNumbers = !lead?.phoneNumbers || lead?.phoneNumbers?.length === 0;
  const noCompany = !contextBobjects?.company;
  const noCompanyNumbers =
    !contextBobjects?.company?.phoneNumbers || contextBobjects?.company?.phoneNumbers?.length === 0;
  const noPhoneNumbers = isB2CAccount
    ? noLeadNumbers
    : (noCompany && noLeadNumbers) || (noLeadNumbers && noCompanyNumbers);
  const showAccountPhones =
    contextBobjects?.company &&
    ((!isPersonAccountAsAccount && !isB2CAccount) || B2CShowAccountPhonesActive);

  useSubscribeListeners(lead?.id?.typeName as BobjectTypes, mutate);

  const { openNoteModal, openMainNoteModal } = useOpenNote(lead, mainNoteData, setVisible);

  function openEmailModal() {
    setEmailVariablesValue({
      company: contextBobjects?.company?.rawBobject,
      lead: lead?.rawBobject,
      opportunity: null,
    });
    openMinimizableModal({
      type: 'email',
      title: t('newEmail'),
      data: {
        template: {
          content: '',
          subject: '',
        },
        mode: EMAIL_MODE.SEND,
        activity: null,
        company: contextBobjects?.company,
        leads: leads,
        lead: lead,
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

  function openMeetingModal() {
    openMinimizableModal({
      type: 'calendarMeeting',
      data: {
        company: !isB2CAccount ? contextBobjects?.company : null,
        lead: lead,
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
      //@ts-ignore
      openExtendedScreen({
        type: ExtendedContextTypes.BOBJECT_DETAILS,
        bobject: lead,
      });
    }
  }

  function openTaskModal() {
    setVisible(false);
    openMinimizableModal({
      type: 'task',
      data: {
        lead: lead,
        location: 'bubble',
        companyContext: contextBobjects?.company,
      },
    });
  }

  function openLinkedInView() {
    const linkedInLeadLink = lead.linkedInUrl;
    const linkedinLeadName = linkedInLeadLink?.split('/')[4]?.split('?')[0];
    const salesNavLink = lead.salesNavigatorUrl;
    const isInLeadProfile = currentPage.includes(linkedinLeadName);

    if (linkedInLeadLink) {
      if (isInLeadProfile) {
        clickMessageButton();
      } else {
        window.open(linkedInLeadLink + '?bb-messaging-tab-open', '_blank');
      }
    } else if (salesNavLink) {
      window.open(salesNavLink + '?bb-messaging-tab-open', '_blank');
    } else {
      window.open(
        'https://www.linkedin.com/messaging/thread/new/?bbFullName=' + lead.fullName,
        '_blank',
      );
    }
  }

  useEffect(() => {
    if (!contextBobjects?.company && activeBobject?.id?.value !== lead?.id?.value) {
      setActiveBobject(lead);
    }
  }, [contextBobjects]);

  const defaultNumber =
    lead?.phoneNumbers?.length > 0
      ? lead?.phoneNumbers?.[0]
      : contextBobjects?.company?.phoneNumbers?.length > 0
      ? contextBobjects?.company?.phoneNumbers?.[0]
      : '';

  const handleClickTab = (tab: ContactViewSubTab) => {
    setActiveSubTab(tab);
    closeExtendedScreen();
  };

  return (
    <BubbleWindow>
      <ContactViewHeader
        badgeColor={icp?.color}
        badgeContent={icp?.shortName}
        tooltip={icp && `${t('buyerPersona')}: ${icp?.name}`}
        title={lead?.fullName}
        subtitle={lead?.jobTitle || lead?.email}
        assigneeUser={assigneeUser}
        labels={<StageAndStatusLabel bobject={lead} />}
        syncStatus={syncStatus}
        bobjectId={lead?.id}
        buttons={
          <ContactButtons
            bobject={lead}
            mainNoteBobject={mainNoteData}
            isDisabled={actionsDisabled}
            hasOpportunities={hasOpportunities}
          />
        }
        minimizedView={minimized}
        bobject={lead}
      />
      <ContactViewActions>
        <Dropdown
          ref={phoneNumbersRef}
          visible={arePhoneNumbersVisible}
          position="top"
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
            bobject={lead}
            callback={phone => {
              togglePhoneNumbersDropdown(false);
              openPhoneOrDialer(phone, settings, openDialer, lead?.id?.value);
            }}
            closeDropdown={() => togglePhoneNumbersDropdown(false)}
          />
          {showAccountPhones && (
            <PhoneDropdownContent
              bobject={contextBobjects?.company}
              callback={phone => {
                togglePhoneNumbersDropdown(false);
                openPhoneOrDialer(phone, settings, openDialer, contextBobjects?.company?.id?.value);
              }}
              closeDropdown={() => togglePhoneNumbersDropdown(false)}
            />
          )}
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
            onClick={openEmailModal}
            isDisabled={actionsDisabled}
          />
          <EmailActionTooltip />
        </div>
        {!isB2CAccount && (
          <ContactViewAction
            color="darkBloobirds"
            icon="linkedin"
            onClick={openLinkedInView}
            isDisabled={actionsDisabled}
          />
        )}
        {hasWhatsappEnabled && (
          <Dropdown
            ref={whatsAppPhonesRef}
            visible={whatsAppPhonesVisible}
            position="top"
            anchor={
              <ContactViewAction
                color="whatsapp"
                icon="whatsapp"
                onClick={() =>
                  lead?.phoneNumbers?.length > 0
                    ? setWhatsAppPhonesVisible(true)
                    : openWhatsAppWeb(forceWsOpenNewPage)
                }
                isDisabled={actionsDisabled}
              />
            }
          >
            <PhoneDropdownContent
              bobject={lead}
              callback={phone => {
                setWhatsAppPhonesVisible(false);
                openWhatsAppWeb(forceWsOpenNewPage, phone);
              }}
              isWhatsApp
            />
            {showAccountPhones && (
              <PhoneDropdownContent
                bobject={contextBobjects?.company}
                callback={phone => {
                  setWhatsAppPhonesVisible(false);
                  openWhatsAppWeb(forceWsOpenNewPage, phone);
                }}
                isWhatsApp
              />
            )}
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
              bobject={lead}
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
        <WizardHelper
          bobject={lead}
          relatedCompany={contextBobjects?.company}
          minimized={minimized}
        />
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
        {contentToRender(activeSubTab, lead, contextBobjects?.opportunities, ref)}
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
          leadId={lead?.id?.value}
          companyId={contextBobjects?.company?.id?.value}
          dialedNumber={defaultNumber}
          onClose={() => setOpenLogCall(false)}
          dataModel={dataModel}
          leadsPhoneNumbers={lead?.phoneNumbers}
        />
      )}
    </BubbleWindow>
  );
};
