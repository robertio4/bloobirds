import React, { FC, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Action, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useMinimizableModals } from '@bloobirds-it/hooks';
import { UserHelperKeys, BobjectTypes } from '@bloobirds-it/types';

import { companyUrl, leadUrl, opportunityUrl } from '../../../app/_constants/routes';
import { LeadTableActionsTooltip } from '../../../components/discoveryTooltips/leadTableActionsTooltip';
import { useBobjectPermissions, useUserSettings } from '../../../components/userPermissions/hooks';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../constants/company';
import { EMAIL_MODE } from '../../../constants/email';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../constants/lead';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../constants/opportunity';
import {
  useBobjectFormCreation,
  useCadenceControl,
  useContactView,
  useDialerVisibility,
  useQueryParams,
  useRouter,
} from '../../../hooks';
import { MinimizableModalType } from '../../../hooks/emails/useMinimizableModals';
import { useNewCadenceTableEnabled, useWhatsappEnabled } from '../../../hooks/useFeatureFlags';
import { useSelectedLead } from '../../../hooks/useSelectedLead';
import { useSelectedOpportunity } from '../../../hooks/useSelectedOpportunity';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import { Bobject, BobjectType } from '../../../typings/bobjects';
import { getFieldByLogicRole, getValueFromLogicRole } from '../../../utils/bobjects.utils';
import { useContactBobjects } from '../contactPageContext';
import { LeadTableCallAction } from './actionComponents/callAction';
import { LeadTableLinkedInAction } from './actionComponents/linkedInAction';
import { LeadTableMeetingAction } from './actionComponents/meetingAction';
import { LeadTableMoreActions } from './actionComponents/moreActions';
import { LeadTableOpportunityAction } from './actionComponents/opportunityAction';
import { QuickLogAction } from './actionComponents/quickLogAction';
import { LeadTableWhatsAppAction } from './actionComponents/whatsAppAction';
import styles from './leadTableActions.module.css';

interface LeadTableActionsProps {
  bobjectType: BobjectType;
  leads?: Bobject[];
}

const LeadTableActions: FC<LeadTableActionsProps> = ({ bobjectType, leads }) => {
  const { setActiveTabs, setTab, scrollToContactTabs } = useContactView();
  const queryParams = useQueryParams();
  const { history, location } = useRouter();
  const {
    openAddActivity,
    openAddLead,
    openAddLeadWithOpportunity,
    openAddOpportunity,
  } = useBobjectFormCreation();
  const settings = useUserSettings();
  const redirectToActivity = settings?.user?.tabOnCall === 'ACTIVITIES';
  const { selectedLead, updateSelectedLead } = useSelectedLead();
  const { company } = useContactBobjects();
  const { selectedOpportunity } = useSelectedOpportunity();
  const { checkPermissions } = useBobjectPermissions();
  const { openCadenceControl } = useCadenceControl();
  const { openMinimizableModal } = useMinimizableModals();
  const { openDialer } = useDialerVisibility();
  const hasCustomTaskEnabled = useNewCadenceTableEnabled();
  const hasWhatsAppEnabled = useWhatsappEnabled();

  const handleOpenModal = (type: MinimizableModalType) => {
    const companyName = company
      ? getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME)
      : 'New something';
    openMinimizableModal({
      title: companyName && companyName !== '' ? companyName.slice(0, 10) : 'Untitled company',
      type,
      data: {
        company: company
          ? {
              id: company?.id,
              name: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME),
              url: companyUrl(company),
              data: company,
              stage: getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole,
            }
          : undefined,
        lead: selectedLead && {
          id: selectedLead?.id,
          name: getValueFromLogicRole(selectedLead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
          url: leadUrl(selectedLead),
          data: selectedLead,
          stage: getFieldByLogicRole(selectedLead, LEAD_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole,
        },
        opportunity: selectedOpportunity && {
          id: selectedOpportunity?.id,
          name: getValueFromLogicRole(selectedOpportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME),
          url: opportunityUrl(undefined, selectedOpportunity),
          data: selectedOpportunity,
        },
        leads,
      },
    });
  };

  const bobjectToUse = () => {
    switch (bobjectType) {
      case BobjectTypes.Company:
        return company;
      case BobjectTypes.Opportunity:
        return selectedOpportunity;
      case BobjectTypes.Lead:
        return selectedLead;
      default:
        return undefined;
    }
  };

  const hasPermissions = useMemo(() => {
    return checkPermissions(bobjectToUse());
  }, [company, selectedOpportunity, selectedLead]);

  useEffect(() => {
    if (!selectedLead) {
      if (queryParams.has('leadId')) {
        updateSelectedLead(queryParams.get('leadId'));
      }
    }
  }, [queryParams.toString()]);

  useEffect(() => {
    if (queryParams.has('action') && location.pathname.includes(bobjectToUse()?.id.objectId)) {
      switch (queryParams.get('action')) {
        case 'call':
          handleCallAction();
          handleOpenDialer();
          break;
        case 'email':
          handleMailAction();
          handleOpenMail();
          break;
        case 'linkedin':
          handleLinkedInAction();
          break;
        case 'meeting':
          handleMeetingAction();
          break;
      }
      history.push(location.pathname.split('?')[0]);
    }
  }, [
    queryParams.toString(),
    company?.id?.objectId,
    selectedOpportunity?.id?.objectId,
    selectedLead?.id?.objectId,
  ]);

  // Action functions:
  const handleOpenDialer = () => {
    openDialer({
      company,
      leads,
      selectedLeadId: selectedLead?.id?.value,
      opportunity: selectedOpportunity,
    });
  };

  const handleCallAction = () => {
    if (setTab) {
      setActiveTabs(
        redirectToActivity
          ? {
              tab: 'Activity',
              subtab: '',
            }
          : {
              tab: 'Messaging',
              subtab: 'Pitches & Snippets',
            },
      );
    }
    scrollToContactTabs();
  };

  const handleOpenMail = () => {
    openMinimizableModal({
      type: 'email',
      title: 'New Email',
      data: {
        template: {
          content: '',
          subject: '',
          id: undefined,
          format: '',
          mediaFiles: undefined,
        },
        mode: EMAIL_MODE.SEND,
        isBlankEmail: true,
        company,
        leads,
        lead: selectedLead,
        opportunity: selectedOpportunity,
        pageBobjectType: bobjectType,
      },
    });
  };

  const handleMailAction = () => {
    setActiveTabs({ tab: 'Messaging', subtab: 'Email Templates' });
    scrollToContactTabs();
  };

  const handleLinkedInAction = async () => {
    await setActiveTabs({ tab: 'Messaging', subtab: 'Linkedin Templates' });
    scrollToContactTabs();
  };

  const handleMeetingAction = () => {
    handleOpenModal('calendarMeeting');
  };

  const handleOpportunityAction = () => {
    openAddOpportunity({
      bobject: bobjectToUse(),
      company,
      onSuccess: openCadenceControl,
      lead: selectedLead,
      assignedTo: null,
    });
  };

  const handleLogActivity = () => {
    openAddActivity({
      lead: selectedLead,
      hasOneLead: leads?.length === 1,
      bobject: bobjectToUse(),
    });
  };

  const handleNewLead = () => {
    bobjectType === BobjectTypes.Opportunity
      ? openAddLeadWithOpportunity({ bobject: selectedOpportunity })
      : openAddLead({ bobject: company });
  };

  return (
    <div className={styles._actions__container}>
      {hasPermissions && (
        <>
          <LeadTableCallAction
            leads={leads}
            company={company}
            selectedLead={selectedLead}
            onClick={handleCallAction}
            onOpenDialerClick={handleOpenDialer}
          />
          <LeadTableMailAction onClick={handleMailAction} />
          <LeadTableLinkedInAction selectedLead={selectedLead} />
          {hasWhatsAppEnabled && bobjectType !== BobjectTypes.Opportunity && (
            <LeadTableWhatsAppAction selectedBobject={selectedLead} />
          )}
          <LeadTableTaskAction onClick={() => handleOpenModal('task')} />
          <LeadTableNoteAction onClick={() => handleOpenModal('note')} />
          <LeadTableMeetingAction
            company={company}
            lead={selectedLead}
            handleOpenModal={handleMeetingAction}
          />
          {bobjectType !== BobjectTypes.Opportunity && (
            <LeadTableOpportunityAction
              bobjectType={bobjectType}
              onAction={handleOpportunityAction}
            />
          )}
          {hasCustomTaskEnabled && <QuickLogAction leads={leads} selectedLead={selectedLead} />}
          <LeadTableMoreActions
            bobjectType={bobjectType}
            leads={leads}
            logActivity={handleLogActivity}
            newLead={handleNewLead}
          />
        </>
      )}
    </div>
  );
};

// SMALL LEAD-TABLE-ACTION COMPONENTS

const LeadTableMailAction = ({ onClick }: { onClick: () => void }) => {
  const { has } = useUserHelpers();
  const { t } = useTranslation();
  return (
    <Tooltip
      title={has(UserHelperKeys.SEND_YOUR_FIRST_EMAIL) ? t('common.email') : ''}
      position="top"
    >
      <LeadTableActionsTooltip helperKey={UserHelperKeys.SEND_YOUR_FIRST_EMAIL}>
        <Action icon="mail" color="tangerine" dataTest="mailButton" onClick={onClick} />
      </LeadTableActionsTooltip>
    </Tooltip>
  );
};

const LeadTableTaskAction = ({ onClick }: { onClick: () => void }) => {
  return (
    <Tooltip title="Task" position="top" trigger="hover">
      <Action icon="taskAction" color="softBloobirds" dataTest="taskButton" onClick={onClick} />
    </Tooltip>
  );
};

const LeadTableNoteAction = ({ onClick }: { onClick: () => void }) => {
  return (
    <Tooltip title="Note" position="top" trigger="hover">
      <Action icon="noteAction" color="banana" onClick={onClick} />
    </Tooltip>
  );
};

export default LeadTableActions;
