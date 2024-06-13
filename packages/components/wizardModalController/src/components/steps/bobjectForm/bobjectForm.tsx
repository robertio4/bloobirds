import React, { useEffect, useState } from 'react';
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
import { useActiveUserId } from '@bloobirds-it/hooks';
import { BobjectTypes, LogicRoleType } from '@bloobirds-it/types';
import { api, getValueFromLogicRole, getFieldTextById } from '@bloobirds-it/utils';
import {
  CustomObjectModalConfig,
  useWizardContext,
  WizardsModalParams,
} from '@bloobirds-it/wizard-modal-context';

import { useActivityRelatedInfo } from '../../../hooks/useActivityRelatedInfo';
import styles from './bobjectForm.module.css';
import { BobjectFormField } from './bobjectFormField';

interface CustomObjectWizard extends WizardsModalParams {
  customObjectConfig: CustomObjectModalConfig;
  handleNext: (selectedOpportunityObject) => void;
  handleSkip?: (openCadenceControlOnClose: boolean) => void;
}
const BobjectForm = ({
  handleBack,
  handleSkip,
  buttonsConfig,
  wizardKey,
  handleNext,
  machineContext,
  customObjectConfig,
}: CustomObjectWizard) => {
  const { getWizardProperties, accountId } = useWizardContext();
  const { referenceBobject } = getWizardProperties(wizardKey);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOpportunityObject, setSelectedOpportunityObject] = useState(null);
  const { activityCompany } = useActivityRelatedInfo(wizardKey);
  const userId = useActiveUserId();
  const { t } = useTranslation('translation', { keyPrefix: 'wizards.steps.bobjectForm' });
  const { t: commonT } = useTranslation('translation', { keyPrefix: 'wizards.common' });

  useEffect(() => {
    if (machineContext?.selectedOpportunity) {
      const opportunityId = machineContext.selectedOpportunity.split('/')[2];
      api.get(`/bobjects/${accountId}/Opportunity/${opportunityId}/form`).then(opportunity => {
        console.log('[BOBJECT FORM] opportunityBobject', opportunity);
        setSelectedOpportunityObject(opportunity?.data);
      });
    }
  }, [machineContext?.selectedOpportunity]);

  const { control, handleSubmit } = useForm();

  const createOrUpdateBobject = formData => {
    setIsSubmitting(true);
    if (selectedOpportunityObject) {
      api
        .patch(
          `/bobjects/${accountId}/Opportunity/${selectedOpportunityObject?.id?.objectId}/raw`,
          formData,
        )
        .then(() => onComplete())
        .catch(e => {
          createToast({
            message: t('toasts.errorUpdating', {
              error: e?.response?.data?.message ? `: ${e?.response?.data?.message}` : '.',
            }),
            type: 'error',
          });
          setIsSubmitting(false);
        });
    } else {
      formData.OPPORTUNITY__AUTHOR = userId;
      formData.OPPORTUNITY__ASSIGNED_TO = userId;
      formData.OPPORTUNITY__LEAD_PRIMARY_CONTACT = referenceBobject?.id?.value;
      if (activityCompany) {
        formData.OPPORTUNITY__COMPANY = activityCompany?.id?.value;
      }
      api
        .post(`/bobjects/${accountId}/Opportunity`, {
          contents: formData,
          params: {
            duplicateValidation: true,
          },
        })
        .then(response => {
          if (response?.data?.objectId) {
            api
              .get(
                `/bobjects/${response?.data?.accountId}/Opportunity/${response?.data?.objectId}/form`,
              )
              .then(opportunity => {
                setSelectedOpportunityObject(opportunity?.data);
                onComplete(opportunity?.data);
              });
          } else {
            onComplete();
          }
        })
        .catch(e => {
          createToast({
            message: t('toasts.errorCreating', {
              error: e?.response?.data?.message ? `: ${e?.response?.data?.message}` : '.',
            }),
            type: 'error',
          });
          setIsSubmitting(false);
        });
    }
    function onComplete(oppObject = null) {
      setIsSubmitting(false);
      handleNext(oppObject || selectedOpportunityObject);
    }
  };

  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : false;
  const hasPreviousStep =
    buttonsConfig?.hasPreviousStep != undefined ? buttonsConfig?.hasPreviousStep : true;
  const openCadenceControlOnClose =
    buttonsConfig?.openCadenceOnSkip != undefined ? buttonsConfig?.openCadenceOnSkip : false;
  const columns = [[], []];
  customObjectConfig?.bloobirdsFields.forEach((field, index) => columns[index % 2].push(field));
  return (
    (!machineContext?.selectedOpportunity || selectedOpportunityObject) && (
      <>
        <ModalContent>
          <ModalSection
            size="m"
            title={
              customObjectConfig?.descriptionHeader || selectedOpportunityObject
                ? t('editTitle')
                : t('createTitle')
            }
          >
            <div className={styles._form__content}>
              {customObjectConfig?.bloobirdsFields.map((field, index) => {
                const defaultValue =
                  getValueFromLogicRole(
                    selectedOpportunityObject,
                    field.name as LogicRoleType<BobjectTypes>,
                  ) || getFieldTextById(selectedOpportunityObject, field.name);

                return (
                  <div key={index} className={styles._field__wrapper}>
                    <BobjectFormField
                      name={field.name}
                      label={field.label}
                      required={field.required}
                      defaultValue={defaultValue}
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
              onClick={handleBack}
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
          <Button dataTest="Form-Save" onClick={handleSubmit(createOrUpdateBobject)}>
            {isSubmitting ? (
              <Spinner color="white" size={14} name="loadingCircle" />
            ) : (
              buttonsConfig?.nextButtonTitle || commonT('next')
            )}
          </Button>
        </ModalFooter>
      </>
    )
  );
};

export default BobjectForm;
