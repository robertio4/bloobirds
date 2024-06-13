import React, { useState, useEffect, useMemo } from 'react';

import {
  ChipGroup,
  ModalContent,
  Text,
  Chip,
  Select,
  Item,
  Button,
  ModalFooter,
} from '@bloobirds-it/flamingo-ui';
import { Bobject } from "@bloobirds-it/types";
import mixpanel from 'mixpanel-browser';

import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../constants/opportunity';
import {
  useBobjectFormVisibility,
  useCadenceControl,
  useBobjectFormCreation,
} from '../../../hooks';
import { useActiveCompany } from '../../../hooks/useActiveCompany';
import { useActiveOpportunities } from '../../../hooks/useActiveOpportunities';
import { useSelectedLead } from '../../../hooks/useSelectedLead';
import { useSelectedOpportunity } from '../../../hooks/useSelectedOpportunity';
import { getValueFromLogicRole } from '../../../utils/bobjects.utils';
import OpportunityDetails from '../../opportunityDetails';
import styles from './opportunityControl.module.css';
import {DefaultWizardsModalParams, useWizardContext} from "@bloobirds-it/wizard-modal-context";

const CONTROL_MODES = Object.seal({
  NEW: 'NEW',
  EDIT: 'EDIT',
});

interface OpportunityControlProps extends DefaultWizardsModalParams {
  leads?: [];
  assignedTo?: any;
  handleClose?: () => void;
}

const OpportunityControl = ({
  handleBack,
  leads,
  assignedTo,
  handleSkip,
  buttonsConfig,
  wizardKey,
  handleClose,
}: OpportunityControlProps) => {
  const [controlMode, setControlMode] = useState(CONTROL_MODES.NEW);
  const [selectedOpportunityId, setSelectedOpportunity] = useState(null);
  const { openAddOpportunity } = useBobjectFormCreation();
  const { openEditModal } = useBobjectFormVisibility();
  const { activeOpportunities: opportunities } = useActiveOpportunities();
  const { selectedOpportunity: currentSelectedOpportunity } = useSelectedOpportunity();
  const { selectedLead: currentSelectedLead } = useSelectedLead();
  const { company } = useActiveCompany();
  const { openCadenceControl } = useCadenceControl();
  const firstLead = Array.isArray(leads) ? leads[0] : null;
  const mainLead = leads?.find(lead => lead.mainLead) || firstLead;
  const { getWizardProperties } = useWizardContext();
  const { handleClose: handleCloseWizard } = getWizardProperties(wizardKey);
  const selectedOpportunity = useMemo(
    () => opportunities?.find((opp: Bobject) => opp.id.value === selectedOpportunityId),
    [selectedOpportunityId],
  );

  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : true;
  const hasPreviousStep =
    buttonsConfig?.hasPreviousStep != undefined ? buttonsConfig?.hasPreviousStep : false;
  const openCadenceControlOnClose =
    buttonsConfig?.openCadenceOnSkip != undefined ? buttonsConfig?.openCadenceOnSkip : false;

  useEffect(() => {
    if (controlMode === CONTROL_MODES.NEW) {
      setSelectedOpportunity(null);
    }
  }, [controlMode]);

  useEffect(() => {
    if (currentSelectedOpportunity) {
      setControlMode(CONTROL_MODES.EDIT);
      setSelectedOpportunity(currentSelectedOpportunity?.id.value);
    }
  }, [currentSelectedOpportunity]);

  const handleContinue = () => {
    handleCloseWizard ? handleCloseWizard?.() : handleClose?.();
    selectedOpportunity
      ? openEditModal({ bobject: selectedOpportunity, onSuccess: openCadenceControl })
      : openAddOpportunity({
          bobject: company || currentSelectedLead,
          company,
          lead: mainLead,
          onSuccess: openCadenceControl,
          assignedTo: assignedTo,
        });
  };

  useEffect(() => {
    mixpanel.track('ENTERED_IN_CC_OPPORTUNITY_STEP_2_OPPORTUNITY_CONTROL');
  }, []);

  return (
    <>
      <ModalContent>
        <div className={styles._actionContainer}>
          <Text dataTest="Text-Modal-OpportunityControl" size="m" weight="medium">
            What do you want to do with your opportunities?
          </Text>
          <ChipGroup value={controlMode} onChange={setControlMode}>
            <Chip
              dataTest="contactFlowEditOpportunity"
              value={CONTROL_MODES.EDIT}
              disabled={opportunities?.length === 0}
            >
              Edit an existing one
            </Chip>
            <Chip value={CONTROL_MODES.NEW}>Create a new one</Chip>
          </ChipGroup>
        </div>
        <div className={styles._opportunityContainer}>
          <Text size="m" weight="medium">
            Choose from your active opportunities to continue
          </Text>
          <Select
            dataTest="opportunityDropdown"
            defaultValue={selectedOpportunityId}
            value={selectedOpportunityId}
            onChange={setSelectedOpportunity}
            disabled={opportunities?.length === 0 || controlMode === CONTROL_MODES.NEW}
            width="100%"
          >
            <Item value="">
              <em>None</em>
            </Item>
            {opportunities?.map((opportunity: Bobject) => (
              <Item
                dataTest="opportunityDropdownName"
                value={opportunity.id.value}
                key={`opportunity-${opportunity.id.value}`}
              >
                {getValueFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME)}
              </Item>
            ))}
          </Select>
          {selectedOpportunityId && (
            <div className={styles._selectedOpportunity__container}>
              <OpportunityDetails opportunity={selectedOpportunity} />
            </div>
          )}
        </div>
      </ModalContent>
      <ModalFooter>
        <div className={styles._buttons__wrapper}>
          {hasPreviousStep && (
            <Button className={styles.hideButton} variant="clear" onClick={handleBack}>
              {buttonsConfig?.previousButtonTitle || 'Back'}
            </Button>
          )}
          {showSkipButton && (
            <Button
              dataTest="Form-Skip"
              variant="secondary"
              onClick={() => {
                handleCloseWizard ? handleCloseWizard?.() : handleClose?.();
              }}
              className={styles.skip_button}
            >
              Skip
            </Button>
          )}
          <Button
            dataTest="formContinue"
            disabled={controlMode === CONTROL_MODES.EDIT && !selectedOpportunity}
            onClick={handleContinue}
          >
            {buttonsConfig?.nextButtonTitle || 'Continue'}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default OpportunityControl;
