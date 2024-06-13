import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

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
import { useDataModel } from '@bloobirds-it/hooks';
import { Bobject, BobjectId, BobjectTypes } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import { EVENTS, useWizardContext, WizardsModalParams } from '@bloobirds-it/wizard-modal-context';

import styles from './opportunityControl.module.css';
import OpportunityDetails from './opportunityDetails.view';

const CONTROL_MODES = Object.seal({
  NEW: 'NEW',
  EDIT: 'EDIT',
});

interface OpportunityControlProps extends WizardsModalParams {
  leads?: [];
  assignedTo?: any;
  handleNext: (selectedOpportunity: string) => void;
  handleSkip?: (openCadenceControlOnClose: boolean) => void;
}

const OpportunityControlOTO = ({
  handleBack,
  buttonsConfig,
  wizardKey,
  handleNext,
  send,
}: OpportunityControlProps) => {
  const { getWizardProperties } = useWizardContext();
  const { referenceBobject } = getWizardProperties(wizardKey);

  const [controlMode, setControlMode] = useState(CONTROL_MODES.NEW);
  const [selectedOpportunityId, setSelectedOpportunity] = useState<
    BobjectId<BobjectTypes.Opportunity>['value']
  >(null);
  const [opportunitiesOfLead, setOpportunitiesOfLead] = useState([]);
  const dataModel = useDataModel();
  const { t } = useTranslation();

  useEffect(() => {
    const bobjectType = referenceBobject.id.typeName;
    const objectId = referenceBobject.id.objectId;
    api.get(`/linkedin/context/${bobjectType}/${objectId}`).then(response => {
      setOpportunitiesOfLead(response?.data?.opportunities);
    });
  }, [referenceBobject]);

  const selectedOpportunity = useMemo(
    () => opportunitiesOfLead?.find((opp: Bobject) => opp.id.value === selectedOpportunityId),
    [selectedOpportunityId],
  );
  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : true;
  const hasPreviousStep =
    buttonsConfig?.hasPreviousStep != undefined ? buttonsConfig?.hasPreviousStep : false;

  useEffect(() => {
    if (controlMode === CONTROL_MODES.NEW) {
      setSelectedOpportunity(null);
    }
  }, [controlMode]);
  const statusDataModelField = dataModel?.findFieldByLogicRole('OPPORTUNITY__STATUS');
  const finalOppStatus = statusDataModelField
    ? statusDataModelField?.values?.filter(
        field => field.name == 'Closed Lost' || field.name == 'Closed Won',
      )
    : null;

  return (
    <>
      <ModalContent>
        <div className={styles._actionContainer}>
          <Text dataTest="Text-Modal-OpportunityControl" size="m" weight="medium">
            {t('wizards.steps.opportunityControl.title')}
          </Text>
          <ChipGroup value={controlMode} onChange={setControlMode}>
            <Chip
              dataTest="contactFlowEditOpportunity"
              value={CONTROL_MODES.EDIT}
              disabled={!opportunitiesOfLead || opportunitiesOfLead?.length === 0}
            >
              {t('wizards.steps.opportunityControl.edit')}
            </Chip>
            <Chip value={CONTROL_MODES.NEW}>Create a new one</Chip>
          </ChipGroup>
        </div>
        <div className={styles._opportunityContainer}>
          <Text size="m" weight="medium">
            {t('wizards.steps.opportunityControl.choose')}
          </Text>
          <Select
            dataTest="opportunityDropdown"
            defaultValue={selectedOpportunityId}
            value={selectedOpportunityId}
            onChange={setSelectedOpportunity}
            disabled={opportunitiesOfLead?.length === 0 || controlMode === CONTROL_MODES.NEW}
            width="100%"
          >
            <Item value="">
              <em>{t('common.none')}</em>
            </Item>
            {opportunitiesOfLead
              ?.filter(opp => {
                return finalOppStatus
                  ? finalOppStatus.filter(status => status.id === opp.status)?.length == 0
                  : true;
              })
              .map(opportunity => (
                <Item
                  dataTest="opportunityDropdownName"
                  value={opportunity.id.value}
                  key={`opportunity-${opportunity.id.value}`}
                >
                  {opportunity.name}
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
            <Button className={styles.back_button} variant="clear" onClick={handleBack}>
              {buttonsConfig?.previousButtonTitle || t('wizards.common.back')}
            </Button>
          )}
          {showSkipButton && (
            <Button
              dataTest="Form-Skip"
              variant="secondary"
              onClick={() => send(EVENTS.SKIP)}
              className={styles.skip_button}
            >
              {t('wizards.steps.opportunityControl.continue')}
            </Button>
          )}
          <Button
            dataTest="formContinue"
            disabled={controlMode === CONTROL_MODES.EDIT && !selectedOpportunity}
            onClick={() => handleNext(selectedOpportunityId)}
          >
            {buttonsConfig?.nextButtonTitle || t('wizards.common.next')}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default OpportunityControlOTO;
