import { Dispatch, SetStateAction } from 'react';

import { Radio, RadioGroup } from '@bloobirds-it/flamingo-ui';
import { BobjectTypes, MainBobjectTypes } from '@bloobirds-it/types';

import {
  INACTIVE_HANDLING_OPTIONS,
  modalAndActionText,
} from '../constants/inactiveHandling.constant';
import styles from './informationPanel.module.css';

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
          Create a next step
        </Radio>
        <Radio size="small" value={INACTIVE_HANDLING_OPTIONS.NEW_CADENCE}>
          Enroll in a new cadence
        </Radio>
        <Radio size="small" value={INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING}>
          Send to nurturing and set cadence
        </Radio>
        <Radio size="small" value={INACTIVE_HANDLING_OPTIONS.DISCARD}>
          {modalAndActionText[bobjectType]?.discardedRadioText}
        </Radio>
        {!isInSalesStage && bobjectType !== BobjectTypes.Opportunity ? (
          <Radio size="small" value={INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG}>
            Send back to backlog and unassign
          </Radio>
        ) : (
          <></>
        )}
        <Radio size="small" value={INACTIVE_HANDLING_OPTIONS.REASSIGN}>
          Reassign
        </Radio>
        {bobjectType !== BobjectTypes.Opportunity ? (
          <Radio size="small" value={INACTIVE_HANDLING_OPTIONS.ON_HOLD}>
            Send to on hold
          </Radio>
        ) : (
          <></>
        )}
      </RadioGroup>
    </div>
  );
};
