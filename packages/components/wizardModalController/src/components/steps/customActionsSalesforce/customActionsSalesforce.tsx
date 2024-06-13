import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  createToast,
  Input,
  Item,
  ModalContent,
  ModalFooter,
  ModalSection,
  Radio,
  RadioGroup,
  Select,
  Spinner,
} from '@bloobirds-it/flamingo-ui';
import { useSalesforceDataModel } from '@bloobirds-it/hooks';
import { SalesforceDataModelResponse } from '@bloobirds-it/types';
import { api, getValueFromLogicRole } from '@bloobirds-it/utils';
import { DefaultWizardsModalParams, useWizardContext } from '@bloobirds-it/wizard-modal-context';

import { getSalesforceIdField } from '../../../utils/customWizards.utils';
import styles from './customActionsSalesforce.module.css';

const CustomActionsSalesforce = ({
  handleBack,
  handleNext,
  handleSkip,
  buttonsConfig,
  wizardKey,
  machineContext,
}: DefaultWizardsModalParams) => {
  const { getWizardProperties } = useWizardContext();
  const { referenceBobject } = getWizardProperties(wizardKey);
  const { t } = useTranslation('translation', {
    keyPrefix: 'wizards',
  });
  const sfdcDataModel: SalesforceDataModelResponse = useSalesforceDataModel();
  const [customActionSelected, setCustomActionSelected] = useState(null);
  const [formFields, setFormFields] = useState<Record<string, string>>({});
  const opportunityRelated = machineContext?.selectedOpportunityObject;
  const objectType = opportunityRelated ? 'Opportunity' : referenceBobject?.id?.typeName;
  const objectToUpdate = opportunityRelated || referenceBobject;

  const customActions = buttonsConfig?.customActions?.find(
    customAction => customAction.objectType == objectType,
  );

  const [isSubmitting, setIsSubmitting] = useState(null);

  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : false;
  const hasPreviousStep =
    buttonsConfig?.hasPreviousStep != undefined ? buttonsConfig?.hasPreviousStep : false;
  const openCadenceControlOnClose =
    buttonsConfig?.openCadenceOnSkip != undefined ? buttonsConfig?.openCadenceOnSkip : false;

  const handleFormFieldChange = (field: string, value: string) => {
    setFormFields(prevFields => ({ ...prevFields, [field]: value }));
  };

  const handleActionChange = (key: string) => {
    setCustomActionSelected(key);
    setFormFields({});
  };

  const isSaveButtonEnabled = () => {
    if (!customActionSelected) {
      return true;
    }

    const selectedActionObj = customActions?.objectCustomActions?.find(
      action => action.key === customActionSelected,
    );

    if (!selectedActionObj || !selectedActionObj.fields) {
      return true;
    }

    return selectedActionObj?.fields?.every(field => formFields[field]);
  };

  const buildDataToSend = () => {
    const { crmId, crmObject } = getSalesforceIdField(objectToUpdate);
    const systemMappings =
      customActionSelected &&
      customActions?.objectCustomActions?.find(action => action.key === customActionSelected)
        ?.systemMappings;

    return {
      fieldsToUpdateInCRM: systemMappings ? { ...formFields, ...systemMappings } : formFields,
      crmObjectType: crmObject,
      crmId: getValueFromLogicRole(objectToUpdate, crmId) || objectToUpdate?.salesforceId,
    };
  };

  const saveAndNext = () => {
    setIsSubmitting(true);
    const dataToSend = buildDataToSend();

    if (
      customActionSelected &&
      dataToSend?.fieldsToUpdateInCRM &&
      Object.keys(dataToSend?.fieldsToUpdateInCRM).length !== 0
    ) {
      api
        .post(`/utils/service/customWizard/updateCrmFields/`, dataToSend)
        .then(() => {
          createToast({
            message: t('steps.changeSalesforceStatus.toasts.success'),
            type: 'success',
          });
          setIsSubmitting(false);
          handleNext();
        })
        .catch(e => {
          createToast({
            message: t('steps.changeSalesforceStatus.toasts.errorUpdating', {
              error: e?.response?.data?.message ? `: ${e?.response?.data?.message}` : '.',
            }),
            type: 'error',
          });
          setIsSubmitting(false);
        });
    } else {
      handleNext();
    }
  };

  return (
    <>
      <ModalContent>
        <ModalSection size="l" title={customActions?.title || ''}>
          <div className={styles._radios_group}>
            <div className={styles._radios_list_status}>
              <RadioGroup
                value={customActionSelected}
                onChange={selectedAction => {
                  handleActionChange(selectedAction);
                }}
              >
                {customActions?.objectCustomActions?.map(action => (
                  <Radio size="medium" value={action?.key} key={action?.key}>
                    {action?.label}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
            {customActionSelected &&
              customActions?.objectCustomActions
                ?.find(action => action.key === customActionSelected)
                ?.fields?.map(field => {
                  const sfdcField = sfdcDataModel?.types?.[objectType.toLowerCase()]?.fields?.find(
                    datamodelField => datamodelField.name == field,
                  );
                  let formField = null;
                  switch (sfdcField?.type) {
                    case 'picklist':
                      formField = (
                        <div key={field} className={styles._formFields}>
                          <Select
                            width="100%"
                            placeholder={sfdcField.label}
                            onChange={selected => handleFormFieldChange(field, selected)}
                            defaultValue={''}
                            autocomplete={sfdcField?.picklistValues?.length > 6}
                          >
                            {sfdcField?.picklistValues?.map(answer => (
                              <Item
                                key={answer.value}
                                hidden={!answer.active}
                                value={answer.value}
                                label={answer.label}
                              >
                                {answer.label}
                              </Item>
                            ))}
                          </Select>
                        </div>
                      );
                      break;
                    case 'string':
                      formField = (
                        <Input
                          width="100%"
                          placeholder={sfdcField.label}
                          onChange={selected => handleFormFieldChange(field, selected)}
                          type={'text'}
                          defaultValue={''}
                        />
                      );
                      break;
                  }
                  return formField;
                })}
          </div>
        </ModalSection>
      </ModalContent>
      <ModalFooter>
        <div className={styles._buttons__wrapper}>
          {hasPreviousStep && (
            <Button variant="clear" onClick={handleBack} className={styles.back_button}>
              {buttonsConfig?.previousButtonTitle || t('common.back')}
            </Button>
          )}
          {showSkipButton && (
            <Button
              variant="secondary"
              onClick={() => handleSkip(openCadenceControlOnClose)}
              className={styles.skip_button}
            >
              {t('common.skipWizard')}
            </Button>
          )}
          <Button dataTest="Form-Save" onClick={saveAndNext} disabled={!isSaveButtonEnabled()}>
            {isSubmitting ? (
              <Spinner name="loadingCircle" color="white" />
            ) : (
              buttonsConfig?.nextButtonTitle || t('common.saveAndClose')
            )}
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

export default CustomActionsSalesforce;
