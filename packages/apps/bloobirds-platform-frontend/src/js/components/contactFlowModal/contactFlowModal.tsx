import React, { useEffect, useLayoutEffect, useMemo } from 'react';

import { Modal, ModalCloseIcon, ModalHeader, ModalTitle } from '@bloobirds-it/flamingo-ui';
import {
  useMinimizableModals,
  useActiveAccountId,
  useCustomWizards,
  useCustomWizardsEnabled,
} from '@bloobirds-it/hooks';
import { ButtonsStepConfig } from '@bloobirds-it/types';
import { useMachine } from '@xstate/react';

import { companyUrl, leadUrl } from '../../app/_constants/routes';
import { ACTIVITY_FIELDS_LOGIC_ROLE, ACTIVITY_MODE } from '../../constants/activity';
import { COMPANY_FIELDS_LOGIC_ROLE, COMPANY_STAGE_LOGIC_ROLE } from '../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_STAGE_LOGIC_ROLE } from '../../constants/lead';
import {
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_STATUS_LOGIC_ROLE,
} from '../../constants/opportunity';
import {
  useBobjectFormCreation,
  useCadenceControl,
  useCompany,
  useContactFlow,
  useLeads,
  useOpenContactFlow,
  useOpportunity,
  useRouter,
} from '../../hooks';
import { MinimizableModalType } from '../../hooks/emails/useMinimizableModals';
import { useFullSalesEnabled } from '../../hooks/useFeatureFlags';
import { useSelectedLead } from '../../hooks/useSelectedLead';
import { useSelectedOpportunity } from '../../hooks/useSelectedOpportunity';
import useSendToSales from '../../hooks/useSendToSales';
import { useContactBobjects } from '../../pages/contactPages/contactPageContext';
import { getFieldByLogicRole, getValueFromLogicRole, isCompany } from '../../utils/bobjects.utils';
import { isLeadPage, isOpportunityPage } from '../../utils/pages.utils';
import { toTitleCase } from '../../utils/strings.utils';
import { STEPS_PROPS } from './contactFlow.constants';
import {
  EVENTS,
  STEPS,
  stepsMachine,
  getCustomMachine,
  getButtonStepConfig,
} from './contactFlowModal.machine';
import { WizardModalContent } from './wizardComponents/wizardModalContent';

const customWizardFlagWrapper = (Component: any) => (props: any) => {
  const accountId = useActiveAccountId();
  const hasCustomWizardsEnabled = useCustomWizardsEnabled(accountId);
  const { open, handleClose } = props;
  const { availableCustomWizards: wizardsMap } = useCustomWizards(
    accountId,
    hasCustomWizardsEnabled,
  );

  return (
    <>
      {(!hasCustomWizardsEnabled || !!wizardsMap) && (
        <Component
          open={open}
          handleClose={handleClose}
          hasCustomWizardsEnabled={hasCustomWizardsEnabled}
          wizardsMap={wizardsMap}
        />
      )}
    </>
  );
};

const OPPORTUNITY_CLOSED_STATUSES = [
  OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_LOST,
  OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_WON,
];

interface ChangeStatusStep {
  companyStatus: string;
  leadStatus: string;
}

export const getStatusOfBobject = (
  bobject: Bobject,
  changeStatusStepData: ChangeStatusStep,
  company: Bobject,
) => {
  const status = isCompany(bobject)
    ? toTitleCase(changeStatusStepData?.companyStatus)
    : toTitleCase(changeStatusStepData?.leadStatus);
  return status ? status : getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.STATUS)?.text;
};

const checkOpenOpportunity = (opportunity: Bobject) => {
  let isClosed = false;
  if (opportunity) {
    const opportunityStatus = getFieldByLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS)
      ?.valueLogicRole;

    isClosed = opportunityStatus ? OPPORTUNITY_CLOSED_STATUSES.includes(opportunityStatus) : true;
  }

  return isClosed;
};

const ContactFlow = ({
  open,
  handleClose,
  hasCustomWizardsEnabled,
  wizardsMap,
}: {
  open: boolean;
  handleClose: () => void;
  hasCustomWizardsEnabled: boolean;
  wizardsMap?: any;
}) => {
  const { activity: activityId, clear, step: contactFlowStep } = useOpenContactFlow();
  const { company } = useContactBobjects();
  const { selectedLead } = useSelectedLead();
  const { pathname } = useRouter();
  const { openAddActivity, openAddOpportunity } = useBobjectFormCreation();
  const hasSalesEnabled = useFullSalesEnabled();
  const { openCadenceControl } = useCadenceControl();
  const { updateSelectedOpportunity, resetSelectedOpportunity } = useSelectedOpportunity();
  const { openMinimizableModal } = useMinimizableModals();
  const { updateSingleLead, leads, resetLeads, isLoaded: isLeadsLoaded } = useLeads('contactFlow');
  const { opportunity, getOpportunityById } = useOpportunity('contactFlow');
  const { resetCompany } = useCompany('contactFlow');
  const { setData: setConvertData } = useSendToSales();

  const {
    activity,
    callResultStepData,
    changeStatusStepData,
    scheduleStepData,
    resetActivity,
    resetScheduleStepData,
    resetCallResultStepData,
    resetNoteStepData,
    resetChangeStatusStepData,
    setActivityId,
  } = useContactFlow();
  const lead = leads[0];
  const hasLeads = !!lead;
  const leadStage = lead && getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole;
  const isLeadInSalesStage = leadStage === LEAD_STAGE_LOGIC_ROLE.SALES;
  const leadCompanyStage =
    company && getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole;
  const isCompanyInSalesStage = leadCompanyStage === COMPANY_STAGE_LOGIC_ROLE.SALES;

  const closeModal = () => {
    clear();
    handleClose();
  };

  const handleOpenMinimizableModal = (type: MinimizableModalType) => {
    const companyName = company
      ? getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME)
      : '';
    openMinimizableModal({
      type,
      title: companyName && companyName !== '' ? companyName.slice(0, 10) : 'Untitled company',
      data: {
        mode: ACTIVITY_MODE.CREATE,
        company: {
          name: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME),
          url: companyUrl(company),
          data: company,
        },
        lead: selectedLead && {
          name: getValueFromLogicRole(selectedLead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
          url: leadUrl(selectedLead),
          data: selectedLead,
        },
      },
    });
  };

  const machineDefinition = hasCustomWizardsEnabled
    ? useMemo(() => getCustomMachine(wizardsMap), [wizardsMap])
    : stepsMachine;

  const [
    {
      value: step,
      context: { convertedLeads },
    },
    send,
    service,
  ] = useMachine(machineDefinition, {
    context: {
      hasSalesFeatureEnabled: hasSalesEnabled,
      handleClose: closeModal,
      handleOpenMinimizableModal,
      openAddActivity,
      openAddOpportunity,
      openCadenceControl,
      setConvertData,
      updateSelectedOpportunity,
      isCalendarEnabled,
    },
  });

  let buttonStepConfig: ButtonsStepConfig = null;
  if (hasCustomWizardsEnabled) {
    service.onTransition(state => {
      buttonStepConfig = getButtonStepConfig(state.meta);
      buttonStepConfig.hasPreviousStep = state.can(EVENTS.PREVIOUS);
    });
  }
  useEffect(() => {
    if (activity) {
      const leadId = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.split(
        '/',
      )[2];
      const opportunityId = getValueFromLogicRole(
        activity,
        ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY,
      )?.split('/')[2];
      if (leadId && leadId !== 'undefined') {
        updateSingleLead(leadId);
      }
      if (opportunityId && opportunityId !== 'undefined') {
        getOpportunityById(opportunityId);
      }

      if (!leadId) {
        send(STEPS.CALL_RESULTS);
      }
    }
  }, [activity]);

  useLayoutEffect(() => {
    if (contactFlowStep && send) {
      send(contactFlowStep);
    }
  }, [send, contactFlowStep]);

  useEffect(() => {
    if (lead && send) {
      const hasAnOpenOpportunity = checkOpenOpportunity(opportunity);

      if ((isLeadInSalesStage && isCompanyInSalesStage) || hasAnOpenOpportunity) {
        send(STEPS.CALL_RESULTS_OPP);
      } else {
        send(STEPS.CALL_RESULTS);
      }
    }

    if (company && !hasLeads && isLeadsLoaded) {
      send(STEPS.CALL_RESULTS);
    }
  }, [send, lead, opportunity, company]);

  useEffect(
    () => () => {
      resetScheduleStepData();
      resetCallResultStepData();
      resetNoteStepData();
      resetChangeStatusStepData();
      resetActivity();
      resetLeads();
      resetCompany();
      if (!isOpportunityPage(pathname)) {
        resetSelectedOpportunity();
      }
    },
    [],
  );

  useEffect(() => {
    if (activityId) {
      setActivityId(Array.isArray(activityId) ? activityId[0] : activityId);
    }
  }, [activityId]);

  let otherProps = STEPS_PROPS[step as keyof typeof STEPS_PROPS];

  const getMainBobject = () => {
    if (isLeadPage(pathname)) {
      return lead;
    }

    if (isOpportunityPage(pathname)) {
      return opportunity;
    }

    return company;
  };
  const mainBobject = getMainBobject();

  // TODO: Better way
  if (step === STEPS.SCHEDULE_NEXT_STEPS) {
    const status = getStatusOfBobject(mainBobject, changeStatusStepData, company);

    otherProps = {
      ...otherProps,
      title: `
      Schedule next step for ${status || ''} ${isCompany(mainBobject) ? 'company' : 'lead'}`,
    };
  }

  if (step === STEPS.SALES_CHANGE_STATUS) {
    const bobject = lead || company;

    otherProps = {
      ...otherProps,
      title: `${isCompany(bobject) ? 'Company' : 'Lead'} status`,
    };
  }

  return useMemo(
    () => (
      <Modal
        open={open}
        onClose={closeModal}
        width={otherProps && 'width' in otherProps && otherProps.width}
      >
        <ModalHeader>
          <ModalTitle>{otherProps && 'title' in otherProps && otherProps.title}</ModalTitle>
          <ModalCloseIcon onClick={closeModal} />
        </ModalHeader>
        <WizardModalContent
          step={step as keyof typeof STEPS}
          send={send}
          buttonsConfig={buttonStepConfig}
          closeModal={closeModal}
          mainBobject={mainBobject}
          convertedLeads={convertedLeads}
          isLeadInSalesStage={isLeadInSalesStage}
        />
      </Modal>
    ),
    [open, step, scheduleStepData, callResultStepData?.callResult, changeStatusStepData, hasLeads],
  );
};

//export default ContactFlowModal;
export const ContactFlowModal = customWizardFlagWrapper(React.memo(ContactFlow));
