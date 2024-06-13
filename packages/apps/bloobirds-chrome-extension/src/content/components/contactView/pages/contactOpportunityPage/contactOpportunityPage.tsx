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
  useIsB2CAccount,
  useIsNoStatusPlanAccount,
  useMinimizableModals,
  useNewCadenceTableEnabled,
  useNoStatusOppSetting,
  useSyncBobjectStatus,
  useUserSearch,
  useWhatsappEnabled,
  useWhatsappOpenNewPage,
  useIsPersonAccountAsAccount,
  useB2CShowAccountPhonesSetting,
  useAircallPhoneLinkEnabled,
} from '@bloobirds-it/hooks';
import {
  BobjectId,
  BobjectTypes,
  ContactViewSubTab,
  ExtensionCompany,
  ExtensionOpportunity,
  LinkedInLead,
  MessagesEvents,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  EMAIL_MODE,
  getExtensionBobjectByIdFields,
  getLeadById,
  openPhoneOrDialer,
  openWhatsAppWeb,
} from '@bloobirds-it/utils';
import clsx from 'clsx';
import useSWR from 'swr';

import { api } from '../../../../../utils/api';
import { BubbleWindow } from '../../../bubbleWindow/bubbleWindow';
import { useExtensionContext } from '../../../context';
import { SalesforceStageLabel } from '../../../salesforceStageLabel/salesforceStageLabel';
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
import { TasksFeed } from '../../components/tasksFeed/tasksFeed';
import { WizardHelper } from '../../components/wizardHelper/wizardHelper';
import styles from '../../contactView.module.css';
import { useContactViewContext } from '../../context/contactViewContext';
import { useOpenNote } from '../../hooks/useOpenNote';
import { useSubscribeListeners } from '../../hooks/useSubscribeListeners';
import { PhoneDropdownContent } from '../components/phoneDropdownContent';
import { ContactButtons } from '../contactButtons/contactButtons';
import { LeadsList } from '../contactLeadsList/contactsLeadsList';

const contentToRender = (
  activeSubTab: ContactViewSubTab,
  opportunity: ExtensionOpportunity,
  leads: LinkedInLead[],
  companyId: BobjectId<BobjectTypes.Company>['value'],
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
            bobjectId={opportunity.id}
            touchesCount={opportunity.touchesCount}
            lastAttempt={opportunity.lastAttempt}
            lastTouch={opportunity.lastTouch}
            attemptsCount={opportunity.attemptsCount}
            leadsIds={opportunity.leads}
            companyId={companyId}
          />
          <ContactViewDetails bobject={opportunity} />
          <LeadsList leads={leads} withTitle />
        </div>
      );
    case ContactViewSubTab.ACTIVITIES:
      return <ActivityFeedWrapper parentRef={ref} bobject={opportunity} />;
    case ContactViewSubTab.TASKS:
      return <ClusteredTasksList mainBobject={opportunity} parentRef={ref} />;
    case ContactViewSubTab.RELATIONS:
      return <RelationsFeed />;
    case ContactViewSubTab.PLAYBOOK:
      return <ContactViewPlaybook />;
    default:
      return <>Under construction</>;
  }
};

export const ContactOpportunityPage = ({ opportunity }: { opportunity: ExtensionOpportunity }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { openMinimizableModal } = useMinimizableModals();
  const [minimized, setMinimized] = useState<boolean>(false);
  const [openLogCall, setOpenLogCall] = useState<boolean>();
  const { t } = useTranslation('translation', { keyPrefix: 'sidePeek.contactViewActions' });

  const { activeSubTab, setActiveSubTab } = useContactViewContext();
  const {
    useGetDataModel,
    useGetActiveBobjectContext,
    useGetSettings,
    closeExtendedScreen,
  } = useExtensionContext();
  const settings = useGetSettings();
  const contextBobjects = useGetActiveBobjectContext();
  const dataModel = useGetDataModel();
  const hasWhatsappEnabled = useWhatsappEnabled(opportunity?.id?.accountId);
  const forceWsOpenNewPage = useWhatsappOpenNewPage(opportunity?.id?.accountId);
  const hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const hasCustomTaskEnabled = useNewCadenceTableEnabled(opportunity?.id?.accountId);
  const isNoStatusOppSetting = useNoStatusOppSetting();
  const statusLabel = dataModel?.findValueById(opportunity?.status);
  const primaryContactFieldId = dataModel?.findFieldByLogicRole(
    OPPORTUNITY_FIELDS_LOGIC_ROLE.PRIMARY_CONTACT,
  )?.id;
  const assigneeId = opportunity?.assignedTo;
  const mainNote = opportunity?.mainNote;
  const users = useUserSearch();
  const assigneeUser = users?.users?.find(user => user?.id === assigneeId);
  const { visible, setVisible, ref: dropdownRef } = useVisible();
  const isB2CAccount = useIsB2CAccount();
  const isPersonAccountAsAccount = useIsPersonAccountAsAccount();
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const B2CShowAccountPhonesActive = useB2CShowAccountPhonesSetting();
  const quickLogVisibilityProps = useVisible();
  const {
    visible: whatsAppPhonesVisible,
    setVisible: setWhatsAppPhonesVisible,
    ref: whatsAppPhonesRef,
  } = useVisible();
  const { data: mainNoteData, mutate } = useSWR(
    mainNote && `/contactViewMainNote/${mainNote}`,
    () => api.get(`/bobjects/${mainNote}/form`),
  );
  const { syncStatus } = useSyncBobjectStatus(opportunity?.id?.accountId, [opportunity]);
  const [opportunityLinkedInLeads, setOpportunityLinkedInLeads] = useState<LinkedInLead[]>([]);

  useSubscribeListeners(opportunity?.id?.typeName as BobjectTypes, mutate);

  const { openNoteModal, openMainNoteModal } = useOpenNote(opportunity, mainNoteData, setVisible);
  const companyId = (contextBobjects?.company as ExtensionCompany)?.id?.value;

  const { actionsDisabled } = useContactViewContext();
  const { openDialer } = useDialerLauncher();
  const {
    visible: arePhoneNumbersVisible,
    setVisible: togglePhoneNumbersDropdown,
    ref: phoneNumbersRef,
  } = useVisible();

  const opportunityLeads = contextBobjects?.leads?.filter(lead =>
    opportunity.leads.includes(lead?.id?.value),
  );

  let noLeadNumbers = false;
  const parsedOppLeads =
    opportunityLeads?.map(l => {
      if (!l.phoneNumbers || l.phoneNumbers?.length === 0) {
        noLeadNumbers = true;
      }

      return {
        phoneNumbers: l.phoneNumbers || [],
        fullName: l.fullName,
        id: l.id,
      };
    }) || [];
  const noCompanyPhoneNumbers =
    !contextBobjects?.company?.phoneNumbers || contextBobjects?.company?.phoneNumbers.length === 0;
  const noLeads = !parsedOppLeads || parsedOppLeads?.length === 0;
  const noCompany = !contextBobjects?.company;
  const showAccountPhones =
    !noCompany && ((!isPersonAccountAsAccount && !isB2CAccount) || B2CShowAccountPhonesActive);

  const noPhoneNumbers = isB2CAccount
    ? noLeadNumbers || noLeads
    : (noLeads && noCompanyPhoneNumbers) ||
      (noLeads && noCompany) ||
      (noCompany && noLeadNumbers) ||
      (noLeadNumbers && noCompanyPhoneNumbers);

  const leadIdValue = opportunity?.rawBobject[primaryContactFieldId] ?? opportunity?.leads?.[0];
  const emailField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.EMAIL)?.id;

  const { lead } = getLeadById(leadIdValue?.split('/')[2], opportunity?.id?.accountId);
  const uniqueLead = opportunityLeads?.length === 1 && opportunityLeads?.[0];

  useSubscribeListeners(opportunity?.id?.typeName as BobjectTypes, mutate);

  function openEmailModal() {
    setEmailVariablesValue({
      company: contextBobjects?.company?.rawBobject,
      lead: uniqueLead ? uniqueLead?.rawBobject : null,
      opportunity: opportunity?.rawBobject,
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
        ...(uniqueLead
          ? { lead: uniqueLead, defaultToEmail: [uniqueLead?.rawBobject?.[emailField]] }
          : {}),
        leads: contextBobjects?.leads || opportunityLeads || [lead],
        opportunity,
        pageBobjectType: BobjectTypes.Opportunity,
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

  function openTaskModal() {
    openMinimizableModal({
      type: 'task',
      data: {
        opportunity: opportunity,
        location: 'bubble',
        companyContext: contextBobjects?.company,
      },
    });
  }

  // @ts-ignore
  useEffect(async () => {
    const result = await Promise.all(
      opportunity?.leads?.map(o =>
        getExtensionBobjectByIdFields({
          typeName: BobjectTypes.Lead,
          objectId: o?.split('/')[2],
        }),
      ) || [],
    );
    setOpportunityLinkedInLeads(result?.map(r => r.data) || []);
  }, []);

  const handleClickTab = (tab: ContactViewSubTab) => {
    setActiveSubTab(tab);
    closeExtendedScreen();
  };

  if (!opportunity) {
    return <BubbleWindow>No opportunity found</BubbleWindow>;
  }

  return (
    <BubbleWindow>
      <ContactViewHeader
        subtitle={opportunity?.amount}
        title={opportunity?.name}
        icon="fileOpportunity"
        assigneeUser={assigneeUser}
        syncStatus={syncStatus}
        bobjectId={opportunity.id}
        labels={
          isNoStatusOppSetting ? (
            <SalesforceStageLabel bobject={opportunity} />
          ) : (
            (statusLabel || isNoStatusPlanAccount) && <StageAndStatusLabel bobject={opportunity} />
          )
        }
        buttons={
          <ContactButtons
            bobject={opportunity}
            mainNoteBobject={mainNoteData}
            isDisabled={actionsDisabled}
          />
        }
        bobject={opportunity}
        minimizedView={minimized}
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
          {parsedOppLeads?.length > 0 &&
            parsedOppLeads?.map((lead: LinkedInLead, idx: number) => (
              <PhoneDropdownContent
                key={idx + '_' + lead?.id?.value}
                bobject={lead}
                callback={phone => {
                  togglePhoneNumbersDropdown(false);
                  openPhoneOrDialer(phone, settings, openDialer, lead?.id?.value);
                }}
                closeDropdown={() => togglePhoneNumbersDropdown(false)}
              />
            ))}
          {showAccountPhones && (
            <PhoneDropdownContent
              bobject={contextBobjects?.company}
              callback={phone => {
                togglePhoneNumbersDropdown(false);
                openPhoneOrDialer(phone, settings, openDialer, companyId);
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
                  !noLeadNumbers
                    ? setWhatsAppPhonesVisible(true)
                    : openWhatsAppWeb(forceWsOpenNewPage)
                }
                isDisabled={actionsDisabled}
              />
            }
          >
            {parsedOppLeads?.length > 0 &&
              parsedOppLeads?.map((lead: LinkedInLead, idx: number) => {
                return (
                  <PhoneDropdownContent
                    key={idx + '_' + lead?.id?.value}
                    bobject={lead}
                    callback={phone => {
                      setWhatsAppPhonesVisible(false);
                      openWhatsAppWeb(forceWsOpenNewPage, phone);
                    }}
                    isWhatsApp
                  />
                );
              })}
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
              bobject={opportunity}
              leads={contextBobjects?.leads || opportunityLeads || [lead]}
              visibilityProps={quickLogVisibilityProps}
            />
          </CustomTasksTooltip>
        )}
      </ContactViewActions>
      <StageDivider color="peanut" />
      {activeSubTab === ContactViewSubTab.OVERVIEW && (
        <WizardHelper
          bobject={opportunity}
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
        {contentToRender(activeSubTab, opportunity, opportunityLinkedInLeads, companyId, ref)}
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
          leadId={opportunityLeads?.[0]?.id?.value}
          opportunityId={opportunity?.id?.value}
          companyId={contextBobjects?.company?.id?.value}
          onClose={() => setOpenLogCall(false)}
          dataModel={dataModel}
          leadsPhoneNumbers={opportunityLeads?.reduce((acc, lead) => {
            if (Array.isArray(lead.phoneNumbers)) {
              return acc.concat(lead.phoneNumbers);
            }
            return acc;
          }, [])}
        />
      )}
    </BubbleWindow>
  );
};
