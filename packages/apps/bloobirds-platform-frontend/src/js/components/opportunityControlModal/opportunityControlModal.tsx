import React from 'react';

import { Modal } from '@bloobirds-it/flamingo-ui';
import { MIXPANEL_EVENTS } from '@bloobirds-it/types';
import { useWizardContext } from '@bloobirds-it/wizard-modal-context';
import mixpanel from 'mixpanel-browser';

import useOpportunityControl from '../../hooks/useOpportunityControl';
import OpportunityControl from '../contactFlowModal/opportunityControl/opportunityControl';

const OpportunityControlModal = () => {
  const { closeModal, leads, assignedTo } = useOpportunityControl();
  const { addMetaToWizardProperties, resetWizardProperties } = useWizardContext();
  const handleClose = () => {
    closeModal();
    resetWizardProperties('CONTACT_FLOW_APP');
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CLOSE_IN_WIZARD_STEP_ + 'CONTACT_FLOW_APP');
  };

  addMetaToWizardProperties('CONTACT_FLOW_APP', {
    handleClose,
  });

  return (
    <Modal open onClose={closeModal} title="Opportunities Control">
      <OpportunityControl
        wizardKey={'CONTACT_FLOW_APP'}
        handleClose={handleClose}
        leads={leads}
        assignedTo={assignedTo}
      />
    </Modal>
  );
};

export default OpportunityControlModal;
