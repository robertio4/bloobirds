import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CustomDateDialog } from '@bloobirds-it/bobjects';
import { Button, Radio, RadioGroup, Text } from '@bloobirds-it/flamingo-ui';
import { useUserHelpers, useUserTimeZone } from '@bloobirds-it/hooks';
import { getI18nSpacetimeLng } from '@bloobirds-it/internationalization';
import { UserHelperKeys } from '@bloobirds-it/types';

import { filterOptions } from '../recallSection';
import styles from '../recallSection.module.css';

export enum RecallDateOptions {
  In1Hours = 'IN_1_HOUR',
  In2Hours = 'IN_2_HOURS',
  In4Hours = 'IN_4_HOURS',
  TomorrowMorning = 'TOMORROW_MORNING',
  TomorrowAfternoon = 'TOMORROW_AFTERNOON',
  Custom = 'CUSTOM',
}

export const RecallDatePicker = ({
  activityDateTime,
  taskDate,
  taskDateOnChange,
  disabled = false,
  savedDefaultValue,
}: {
  activityDateTime: string;
  taskDate: Date;
  taskDateOnChange: (value: Date) => void;
  disabled?: boolean;
  savedDefaultValue?: RecallDateOptions;
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'wizards.steps.callResult.recall' });
  const { t: datesT, i18n } = useTranslation('translation', { keyPrefix: 'dates' });
  const lang = i18n.language;
  const userTimeZone = useUserTimeZone();
  const { saveCustom } = useUserHelpers();

  const [customDateVisible, setCustomDateVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<RecallDateOptions>(
    savedDefaultValue || RecallDateOptions.In2Hours,
  );

  const handleSave = (optionSelected: RecallDateOptions) => {
    if (disabled) {
      return;
    }
    saveCustom({ key: UserHelperKeys.WIZARDS_RECALL_DATETIME, data: optionSelected });
    setSelectedOption(optionSelected);
    taskDateOnChange(filterOptions(activityDateTime)[optionSelected]?.date);
  };

  const handleCustomSave = (date: Date) => {
    if (date) {
      taskDateOnChange(date);
    }
    setSelectedOption(RecallDateOptions.Custom);
  };

  useEffect(() => {
    taskDateOnChange(filterOptions(activityDateTime)[savedDefaultValue]?.date);
  }, [savedDefaultValue]);

  return (
    <>
      <div
        onClick={event => {
          event.stopPropagation();
          event.preventDefault();
        }}
        className={styles.radioGroup}
      >
        <RadioGroup value={selectedOption} onChange={handleSave} disabled={disabled}>
          {Object.keys(filterOptions(activityDateTime))
            .filter(key => key !== RecallDateOptions.Custom)
            .map((key: RecallDateOptions) => {
              const { label, date } = filterOptions(activityDateTime)[key];
              return (
                <Radio key={key} value={key} size="small" disabled={disabled}>
                  <div className={styles.button}>
                    <Text color="peanut" size="s">
                      {t(label)}
                    </Text>
                    <Text color="bloobirds" size="s">
                      {getI18nSpacetimeLng(lang, date)
                        .goto(userTimeZone)
                        .format(datesT('monthShortWithTime'))}
                    </Text>
                  </div>
                </Radio>
              );
            })}
        </RadioGroup>
        <Button
          className={styles.customButton}
          expand={true}
          variant={selectedOption === RecallDateOptions.Custom ? 'primary' : 'clear'}
          size="small"
          color={disabled ? 'softPeanut' : 'bloobirds'}
          uppercase={false}
          disabled={disabled}
          iconLeft="calendar"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setCustomDateVisible(true);
          }}
        >
          {selectedOption === RecallDateOptions.Custom && taskDate
            ? getI18nSpacetimeLng(lang, taskDate).format(datesT('monthShortWithTime'))
            : t(filterOptions(activityDateTime)?.[RecallDateOptions.Custom].label)}
        </Button>
      </div>
      {customDateVisible && (
        <CustomDateDialog
          onCancel={() => setCustomDateVisible(false)}
          onSubmit={date => {
            handleCustomSave(date);
            setCustomDateVisible(false);
          }}
          customButtonText={t('okButton')}
        />
      )}
    </>
  );
};
