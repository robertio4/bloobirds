import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import { Radio, RadioGroup } from '@bloobirds-it/flamingo-ui';
import { BobjectTypes, MainBobjectTypes } from '@bloobirds-it/types';

import styles from '../css/informationPanel.module.css';
import { INACTIVE_HANDLING_OPTIONS } from '../types/inactiveHandling.constant';

export const ActionSelector = ({
  selectedOptionHandler,
  bobjectType,
  isInSalesStage,
}: {
  selectedOptionHandler: [
    { type: INACTIVE_HANDLING_OPTIONS; data: any },
    Dispatch<SetStateAction<{ type: INACTIVE_HANDLING_OPTIONS; data: any }>>,
  ];
  bobjectType: MainBobjectTypes;
  isInSalesStage: boolean;
}) => {
  const [selectedOption, setSelectedOption] = selectedOptionHandler;
  const { t } = useTranslation('translation', {
    keyPrefix: 'wizards.steps.inactiveHandling',
  });

  return (
    <div className={styles.actions_wrapper}>
      <RadioGroup
        value={selectedOption?.type}
        onChange={value =>
          setSelectedOption({
            type: (value as unknown) as INACTIVE_HANDLING_OPTIONS,
            data: undefined,
          })
        }
      >
        <Radio expand size="small" value={INACTIVE_HANDLING_OPTIONS.NEXT_STEP}>
          {t('actions.createNextStep')}
        </Radio>
        <Radio size="small" value={INACTIVE_HANDLING_OPTIONS.NEW_CADENCE}>
          {t('actions.enrollCadence')}
        </Radio>
        <Radio size="small" value={INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING}>
          {t('actions.sendToNurturing')}
        </Radio>
        <Radio size="small" value={INACTIVE_HANDLING_OPTIONS.DISCARD}>
          {t(`${bobjectType.toLowerCase()}.discardedRadioText`)}
        </Radio>
        {!isInSalesStage && bobjectType !== BobjectTypes.Opportunity ? (
          <Radio size="small" value={INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG}>
            {t('actions.backlogUnassign')}
          </Radio>
        ) : (
          <></>
        )}
        <Radio size="small" value={INACTIVE_HANDLING_OPTIONS.REASSIGN}>
          {t('actions.reassign')}
        </Radio>
        {bobjectType !== BobjectTypes.Opportunity ? (
          <Radio size="small" value={INACTIVE_HANDLING_OPTIONS.ON_HOLD}>
            {t('actions.sendToHold')}
          </Radio>
        ) : (
          <></>
        )}
      </RadioGroup>
    </div>
  );
};
