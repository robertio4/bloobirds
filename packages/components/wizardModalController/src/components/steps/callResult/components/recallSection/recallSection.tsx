import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox, Text } from '@bloobirds-it/flamingo-ui';
import { useUserHelpers } from '@bloobirds-it/hooks';
import { UserHelperKeys } from '@bloobirds-it/types';
import spacetime from 'spacetime';

import { CallResultStepInterface } from '../../../../../hooks/useCallResultStepData';
import { RecallDateOptions, RecallDatePicker } from './components/recallDatePicker';
import styles from './recallSection.module.css';

export enum RecallSectionModes {
  Required = 'required',
  Recommended = 'recommended',
  Optional = 'optional',
}

export const filterOptions: (
  date: Date | string,
) => Record<RecallDateOptions, { label: string; date: Date }> = date => ({
  [RecallDateOptions.In1Hours]: {
    label: 'options.in1Hour',
    date: spacetime(date ?? new Date())
      .add(1, 'hour')
      .toNativeDate(),
  },
  [RecallDateOptions.In2Hours]: {
    label: 'options.in2Hours',
    date: spacetime(date ?? new Date())
      .add(2, 'hour')
      .toNativeDate(),
  },
  [RecallDateOptions.In4Hours]: {
    label: 'options.in4Hours',
    date: spacetime(date ?? new Date())
      .add(4, 'hour')
      .toNativeDate(),
  },
  [RecallDateOptions.TomorrowMorning]: {
    label: 'options.tomorrowMorning',
    date: spacetime(date ?? new Date())
      .startOf('day')
      .add(1, 'day')
      .add(9, 'hour')
      .toNativeDate(),
  },
  [RecallDateOptions.TomorrowAfternoon]: {
    label: 'options.tomorrowAfternoon',
    date: spacetime(date ?? new Date())
      .startOf('day')
      .add(1, 'day')
      .add(15, 'hour')
      .toNativeDate(),
  },
  [RecallDateOptions.Custom]: {
    label: 'options.custom',
    dateString: undefined,
    date: undefined,
  },
});

const RecallSection = ({
  mode,
  recallRef,
  activityDateTime,
  callResultStepDataHandler,
}: {
  mode: RecallSectionModes;
  recallRef: React.MutableRefObject<HTMLDivElement>;
  activityDateTime: any;
  callResultStepDataHandler: [
    CallResultStepInterface,
    React.Dispatch<React.SetStateAction<CallResultStepInterface>>,
  ];
}) => {
  const [callResultStepData, setCallResultStepData] = callResultStepDataHandler;
  const { t } = useTranslation('translation', {
    keyPrefix: 'wizards.steps.callResult.recall',
  });
  const { get } = useUserHelpers();
  const savedDefaultValue = get(UserHelperKeys.WIZARDS_RECALL_DATETIME);
  const [checked, setChecked] = useState(mode !== RecallSectionModes.Optional);
  const options = filterOptions(activityDateTime);
  const [recallDate, setRecallDate] = useState(
    options[savedDefaultValue]?.date || spacetime(activityDateTime).add(1, 'hour').toNativeDate(),
  );

  const handleSetDate = (value: Date) => {
    setRecallDate(value);
    setCallResultStepData({
      ...callResultStepData,
      recall: {
        ...callResultStepData.recall,
        date: value,
      },
    });
  };

  useEffect(() => {
    setCallResultStepData({
      ...callResultStepData,
      recall: {
        ...callResultStepData.recall,
        date: options[savedDefaultValue]?.date || recallDate,
        checked: checked ?? mode !== RecallSectionModes.Optional,
      },
    });
  }, [recallDate, savedDefaultValue, checked]);

  useEffect(() => {
    setChecked(mode !== RecallSectionModes.Optional);
  }, [mode]);

  const renderComponent = (mode: RecallSectionModes) => {
    switch (mode) {
      case RecallSectionModes.Required:
        return (
          <div className={styles.container} ref={recallRef}>
            <Text size="m">{t('sectionText')}</Text>
            <RecallDatePicker
              activityDateTime={activityDateTime}
              taskDate={recallDate}
              taskDateOnChange={handleSetDate}
              savedDefaultValue={savedDefaultValue}
            />
          </div>
        );
      case RecallSectionModes.Recommended:
      case RecallSectionModes.Optional:
        return (
          <div className={styles.container} ref={recallRef}>
            <Checkbox
              checked={checked}
              onClick={() => {
                setCallResultStepData({
                  ...callResultStepData,
                  recall: {
                    ...callResultStepData.recall,
                    checked,
                  },
                });
                setChecked(!checked);
              }}
              size="small"
            >
              {t('sectionText')}
            </Checkbox>
            <RecallDatePicker
              activityDateTime={activityDateTime}
              taskDate={recallDate}
              taskDateOnChange={handleSetDate}
              disabled={!checked}
              savedDefaultValue={savedDefaultValue}
            />
          </div>
        );
      default:
        return <></>;
    }
  };

  return <div className={styles.wrapper}>{renderComponent(mode)}</div>;
};

export default RecallSection;
