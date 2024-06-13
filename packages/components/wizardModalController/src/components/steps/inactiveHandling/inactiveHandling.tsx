import { useTranslation } from 'react-i18next';

import { Button, ModalContent, ModalFooter, Tooltip } from '@bloobirds-it/flamingo-ui';
import { MainBobjectTypes } from '@bloobirds-it/types';
import { useWizardContext, DefaultWizardsModalParams } from '@bloobirds-it/wizard-modal-context';

import ActionForm from './components/ActionForm';
import { ActionSelector } from './components/ActionSelector';
import { InformationPanel } from './components/InformationPanel';
import styles from './css/inactiveHandling.module.css';
import { useInactiveHandlingModalData } from './hooks/useInactiveHandlingModalData';

export const InactiveHandling = ({
  handleNext,
  handleSkip,
  buttonsConfig,
  wizardKey,
}: DefaultWizardsModalParams) => {
  const {
    getIsMissingInfo,
    isInSalesStage,
    isSubmitting,
    selectedOptionData,
    setSelectedOptionData,
    handleSubmit,
  } = useInactiveHandlingModalData();
  const { resetWizardProperties, getWizardProperties } = useWizardContext();
  const { bobject } = getWizardProperties(wizardKey);
  const isMissingInfo = getIsMissingInfo({
    selectedOptionData,
    hasNeededNurturingInfo: true,
    hasOnHoldReasons: bobject?.id?.typeName !== 'Opportunity',
  });
  const { t } = useTranslation('translation', { keyPrefix: 'wizards.common' });
  const submitModal = () => {
    handleSubmit();
    const hasNextStep =
      buttonsConfig?.hasNextStep != undefined ? buttonsConfig?.hasNextStep : false;
    if (!hasNextStep) {
      resetWizardProperties(wizardKey);
    } else {
      if (handleNext) {
        handleNext();
      }
    }
  };

  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : true;
  const openCadenceControlOnClose =
    buttonsConfig?.openCadenceOnSkip != undefined ? buttonsConfig?.openCadenceOnSkip : false;

  return (
    <>
      <ModalContent className={styles._modal_content}>
        <div className={styles._sections_container}>
          <ActionSelector
            selectedOptionHandler={[selectedOptionData, setSelectedOptionData]}
            bobjectType={bobject?.id?.typeName as MainBobjectTypes}
            isInSalesStage={isInSalesStage}
          />
          <InformationPanel selectedOption={selectedOptionData} bobject={bobject} />
        </div>
        <ActionForm
          selectedOptionHandler={[selectedOptionData, setSelectedOptionData]}
          bobject={bobject}
          isSalesBobject={isInSalesStage}
        />
      </ModalContent>
      <ModalFooter className={styles._modal_footer}>
        <div>
          {showSkipButton && (
            <Button variant="clear" onClick={() => handleSkip(openCadenceControlOnClose)} uppercase>
              {t('cancel')}
            </Button>
          )}
        </div>
        <Tooltip title={isMissingInfo ? t('requiredMessage') : ''} position="top">
          <Button onClick={submitModal} disabled={isMissingInfo || isSubmitting} uppercase>
            {buttonsConfig?.nextButtonTitle || t('confirm')}
          </Button>
        </Tooltip>
      </ModalFooter>
    </>
  );
};
