import React from 'react';

import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';

import { ChangeStatusWizard } from './modals/changeStatusModal/changeStatusModal';
import { ContactFlowModal } from './modals/contactFlowModal/contactFlowModal';
import { InactiveModal } from './modals/inactiveHandlingModal/inactiveHandlingModal';
import { MeetingReportResultWizard } from './modals/meetingReportResult/meetingReportResultModal';

export const WizardModalFactory = props => {
  const { wizardsMap } = useWizardContext();
  const { children } = props;
  const wizardComponents: React.ReactNode[] = [];
  let wizardComponent = null;
  for (const key in wizardsMap) {
    wizardComponent = null;
    let matchingChild = null;
    switch (key as WIZARD_MODALS) {
      case WIZARD_MODALS.NEXT_STEP:
        wizardComponent = <InactiveModal />;
        break;
      case WIZARD_MODALS.MEETING_RESULT:
        wizardComponent = <MeetingReportResultWizard />;
        break;
      case WIZARD_MODALS.CONTACT_FLOW_OTO:
      case WIZARD_MODALS.CONTACT_FLOW_APP:
        wizardComponent = <ContactFlowModal />;
        break;
      case WIZARD_MODALS.CHANGE_STATUS:
        wizardComponent = <ChangeStatusWizard />;
        break;
      default:
        break;
    }
    if (children) {
      if (Array.isArray(children)) {
        matchingChild = children.find(child => child.key === key);
      } else if (children.key === key) {
        matchingChild = children;
      }
    }

    if (wizardComponent) {
      wizardComponents.push(
        React.cloneElement(
          wizardComponent,
          {
            wizardKey: wizardComponent?.props?.wizardKey ? wizardComponent?.props?.wizardKey : key,
            key: key,
          },
          matchingChild?.props.children,
        ),
      );
    }
  }

  return <>{wizardComponents}</>;
};
