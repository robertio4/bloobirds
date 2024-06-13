import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Text,
  createToast,
  ModalContent,
  ModalFooter,
  Spinner,
} from '@bloobirds-it/flamingo-ui';
import { ACTIVITY_FIELDS_LOGIC_ROLE, Bobject } from '@bloobirds-it/types';
import { api, injectReferencesGetProcess } from '@bloobirds-it/utils';
import { useWizardContext, DefaultWizardsModalParams } from '@bloobirds-it/wizard-modal-context';

import styles from './addLeadToActivity.module.css';
import SearchLeads from './components/searchLeads';

const AddLeadToActivity = ({
  handleBack,
  handleSkip,
  buttonsConfig,
  wizardKey,
  handleNext,
  send,
}: DefaultWizardsModalParams) => {
  const { getWizardProperties, accountId, addMetaToWizardProperties } = useWizardContext();
  const { bobject: activity } = getWizardProperties(wizardKey);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lead, setLead] = useState<Bobject>(null);

  const { t } = useTranslation('translation', {
    keyPrefix: 'wizards.steps.addLeadToActivityModal',
  });
  const { t: commonT } = useTranslation('translation', { keyPrefix: 'wizards.common' });

  const assignLead = () => {
    setIsSubmitting(true);
    api
      .patch(`/bobjects/${activity?.id?.value}/raw`, {
        contents: { [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: lead?.id?.value },
        params: {},
      })
      .then(() => {
        setIsSubmitting(false);
        if (lead) {
          createToast({
            message: t('toast.success'),
            type: 'success',
          });
        }
        api
          .get(`/bobjects/${activity?.id?.value}/form?injectReferences=true`, {})
          .then(updatedActivity => {
            if (updatedActivity?.data) {
              const activityBobjectUpdated = injectReferencesGetProcess(updatedActivity?.data);
              addMetaToWizardProperties(wizardKey, {
                referenceBobject: lead,
                bobject: activityBobjectUpdated,
              });
            }
            handleNext?.();
          });

        send?.('UPDATE_REFERENCE_BOBJECT', {
          referenceBobjectSelected: lead,
        });
      })
      .catch(() => {
        createToast({
          message: t('toast.error'),
          type: 'error',
        });
      });
  };

  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : false;
  const hasPreviousStep =
    buttonsConfig?.hasPreviousStep != undefined ? buttonsConfig?.hasPreviousStep : true;
  const openCadenceControlOnClose =
    buttonsConfig?.openCadenceOnSkip != undefined ? buttonsConfig?.openCadenceOnSkip : false;

  return (
    <>
      <ModalContent>
        <div className={styles._content__wraper}>
          <Text size="m" color="softPeanut">
            {t('subtitle')}
          </Text>
          <div className={styles._autocomplete__wrapper}>
            <SearchLeads accountId={accountId} onLeadIdChange={setLead} />
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        {hasPreviousStep && (
          <Button variant="clear" onClick={handleBack} className={styles.back_button}>
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
        <Button dataTest="Form-Save" onClick={assignLead}>
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

export default AddLeadToActivity;
