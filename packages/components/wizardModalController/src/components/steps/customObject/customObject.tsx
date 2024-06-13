import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Button,
  createToast,
  ModalContent,
  ModalFooter,
  ModalSection,
  Spinner,
} from '@bloobirds-it/flamingo-ui';
import { BobjectTypes, LogicRoleType } from '@bloobirds-it/types';
import { api, getValueFromLogicRole } from '@bloobirds-it/utils';
import {
  CustomObjectModalConfig,
  DefaultWizardsModalParams,
  useWizardContext,
} from '@bloobirds-it/wizard-modal-context';

import { useActivityRelatedInfo } from '../../../hooks/useActivityRelatedInfo';
import styles from './customObject.module.css';
import { CustomObjectForm } from './customObjectForm';

interface CustomObjectWizard extends DefaultWizardsModalParams {
  customObjectConfig: CustomObjectModalConfig;
}
const CustomObject = ({
  handleBack,
  handleSkip,
  buttonsConfig,
  wizardKey,
  handleNext,
  machineContext,
  customObjectConfig,
}: CustomObjectWizard) => {
  const { getWizardProperties } = useWizardContext();
  const { bobject: activity } = getWizardProperties(wizardKey);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { activityCompany, activityLead, activityOpportunity } = useActivityRelatedInfo(wizardKey);
  const { t } = useTranslation('translation', { keyPrefix: 'wizards.steps.customObject' });
  const { t: commonT } = useTranslation('translation', { keyPrefix: 'wizards.common' });
  const { control, handleSubmit } = useForm();

  function getFieldDefaultValue(fieldtoMap: string) {
    if (fieldtoMap) {
      const fieldParts = fieldtoMap.split('.');
      if (fieldParts.length === 2) {
        switch (fieldParts[0]) {
          case 'COMPANY':
            return getValueFromLogicRole(
              activityCompany,
              fieldParts[1] as LogicRoleType<BobjectTypes.Company>,
            );
          case 'LEAD':
            return getValueFromLogicRole(
              activityLead,
              fieldParts[1] as LogicRoleType<BobjectTypes.Lead>,
            );
          case 'OPPORTUNITY':
            return getValueFromLogicRole(
              activityOpportunity,
              fieldParts[1] as LogicRoleType<BobjectTypes>,
            );
          case 'CONTEXT':
            return machineContext?.[fieldParts[1]];
        }
      }
    }
    return undefined;
  }

  const createCustomObject = formData => {
    setIsSubmitting(true);
    function onComplete() {
      setIsSubmitting(false);
      handleNext();
    }

    function getMainBobjectId(mainBobjectType: string) {
      if (mainBobjectType == 'Company') {
        return activityCompany?.referencedBobject
          ? activityCompany?.referencedBobject.id?.value
          : activityCompany?.id?.value;
      } else if (mainBobjectType == 'Lead') {
        return activityLead?.referencedBobject
          ? activityLead?.referencedBobject.id?.value
          : activityLead?.id?.value;
      } else if (mainBobjectType == 'Opportunity') {
        return activityOpportunity?.referencedBobject
          ? activityOpportunity?.referencedBobject.id?.value
          : activityOpportunity?.id?.value;
      } else {
        return activity?.id?.value;
      }
    }

    api
      .post('/utils/service/customWizard/createCustomObject', {
        customObjectName: customObjectConfig?.customObjectName,
        customObjectFormValues: formData,
        mainBobjectTypeRelated: customObjectConfig?.mainBobjectType,
        mainBobjectIdRelated: getMainBobjectId(customObjectConfig?.mainBobjectType),
        referenceBobjectIdRelated: activity?.id?.value,
        customObjectSystemMapping: customObjectConfig?.systemMapping,
      })
      .then(onComplete)
      .catch(e => {
        createToast({
          message: t('errorToast', {
            error: e?.response?.data?.message ? `: ${e?.response?.data?.message}` : '.',
          }),
          type: 'error',
        });
        setIsSubmitting(false);
      });
  };

  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : false;
  const hasPreviousStep =
    buttonsConfig?.hasPreviousStep != undefined ? buttonsConfig?.hasPreviousStep : true;
  const openCadenceControlOnClose =
    buttonsConfig?.openCadenceOnSkip != undefined ? buttonsConfig?.openCadenceOnSkip : false;
  const columns = [[], []];
  customObjectConfig?.fields.forEach((field, index) => columns[index % 2].push(field));
  return (
    <>
      <ModalContent>
        <ModalSection size="m" title={customObjectConfig?.descriptionHeader}>
          <div className={styles._form__content}>
            {customObjectConfig?.fields.map((field, index) => {
              return (
                <div key={index} className={styles._field__wrapper}>
                  <CustomObjectForm
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    required={field.required}
                    picklistValues={field.picklistValues}
                    defaultValue={getFieldDefaultValue(
                      customObjectConfig?.fieldsMapping?.[field.name],
                    )}
                    control={control}
                  />
                </div>
              );
            })}
          </div>
        </ModalSection>
      </ModalContent>
      <ModalFooter>
        {hasPreviousStep && (
          <Button
            variant="clear"
            onClick={() => {
              handleBack();
            }}
            className={styles.back_button}
          >
            {buttonsConfig?.previousButtonTitle || commonT('back')}
          </Button>
        )}
        {showSkipButton && (
          <Button
            variant="secondary"
            onClick={() => handleSkip(openCadenceControlOnClose)}
            className={styles.skip_button}
          >
            {commonT('skipWizard')}
          </Button>
        )}
        <Button dataTest="Form-Save" onClick={handleSubmit(createCustomObject)}>
          {isSubmitting ? (
            <Spinner color="white" size={14} name="loadingCircle" />
          ) : (
            buttonsConfig?.nextButtonTitle || commonT('next')
          )}
        </Button>
      </ModalFooter>
    </>
  );
};

export default CustomObject;
