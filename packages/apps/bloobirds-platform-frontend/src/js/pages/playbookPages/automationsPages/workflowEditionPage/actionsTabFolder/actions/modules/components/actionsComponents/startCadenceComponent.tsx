import React, { useEffect, useState } from 'react';

import {
  DateTimePicker,
  InputPicker,
  InputPickerOption,
  Item,
  Radio,
  RadioGroup,
  Select,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { BobjectType, BobjectTypes } from '@bloobirds-it/types';
import { format as formatDate, parseISO } from 'date-fns';

import { useCadences } from '../../../../../../../../../hooks/useCadences';
import { CadenceObject } from '../../../../../../../../../typings/cadence';
import { useWorkflow } from '../../../../../context/workflowsContext';
import styles from '../../modules.module.css';
import { renderValue } from '../modules/fieldValueSelect';
import RelativeDateModule from '../modules/relativeDateModule';

interface moduleActions {
  startDate: any;
  cadenceId: string;
  assignedTo: string;
  bobjectType: BobjectType | 'Leads';
}

interface TimeValue {
  fixedDate: string;
  days: number;
  type: string;
  value: string;
}

const getEditingValue = (timeValue: TimeValue) => {
  if (timeValue.fixedDate) {
    return { type: 'exactDate', value: parseISO(timeValue.fixedDate) };
  }
  if (timeValue.days === 0) {
    return { type: 'date', value: timeValue };
  } else {
    return { type: 'relativeDate', value: timeValue };
  }
};

const StartCadenceModule = ({
  blockIndex,
  action,
}: {
  blockIndex: number;
  action: moduleActions;
}) => {
  const {
    updateAction,
    state: { isEnabled, isLocked },
  } = useWorkflow();

  const { cadences } = useCadences(
    action?.bobjectType === 'Leads' ? BobjectTypes.Lead : action?.bobjectType,
  );
  const defaultCadenceId = cadences?.find((cadence: CadenceObject) => cadence?.defaultCadence)?.id;
  const [isCadenceSelectorEnabled, setIsCadenceSelectorEnabled] = useState(
    action?.cadenceId && action?.cadenceId !== defaultCadenceId,
  );
  const [dateTime, setDateTime] = useState(
    action.startDate
      ? getEditingValue(action?.startDate)
      : {
          type: 'date',
          value: { days: '0', time: '0' },
        },
  );
  const updateCadenceSelected = (cadenceId: any) => {
    action.cadenceId = cadenceId;
    updateAction(blockIndex, action);
  };
  const updateTimeRange = (timeValue: TimeValue) => {
    const { type, value } = timeValue;
    switch (type) {
      case 'relativeDate':
        action.startDate = value;
        break;
      case 'date':
        action.startDate = { days: 0, time: 0 };
        break;
      default:
        if (!value) return;
        action.startDate = {
          days: undefined,
          time: undefined,
          fixedDate: formatDate(value, "yyyy-MM-dd'T'HH:mm:ss"),
        };
        break;
    }
    updateAction(blockIndex, action);
  };
  useEffect(() => {
    if (!action?.cadenceId) updateCadenceSelected(defaultCadenceId);
  }, []);

  return (
    <div className={styles._content_wrapper}>
      <div className={styles._radio_modal_radio_group}>
        <RadioGroup
          defaultValue={
            !action?.cadenceId || action?.cadenceId === defaultCadenceId ? 'default' : 'selected'
          }
          disabled={isEnabled || isLocked}
          onChange={value => {
            if (value === 'default') updateCadenceSelected(defaultCadenceId);
            setIsCadenceSelectorEnabled(value !== 'default');
          }}
        >
          <Radio color="purple" backgroundColor="verySoftPurple" value="default" size="small">
            <Text size="s">Default cadence</Text>
          </Radio>
          <Radio color="purple" backgroundColor="verySoftPurple" value="selected" size="small">
            <Text size="s">Specific Cadence</Text>
          </Radio>
        </RadioGroup>
      </div>
      <div className={styles._radio_modal_select}>
        <Select
          borderless={false}
          width="260px"
          size="small"
          value={action?.cadenceId}
          placeholder={`Select ${action?.bobjectType} cadence`}
          disabled={!isCadenceSelectorEnabled || isEnabled || isLocked}
          onChange={value => updateCadenceSelected(value)}
        >
          {cadences?.map(cadence => (
            <Item key={cadence?.id} value={cadence?.id}>
              {cadence?.name}
            </Item>
          ))}
        </Select>
      </div>
      <div className={styles._relative_date_picker}>
        <InputPicker
          width="310px"
          value={dateTime}
          placeholder="Select type"
          disabled={isEnabled || isLocked}
          renderDisplayValue={() => {
            return !dateTime?.type ? '' : renderValue(dateTime);
          }}
          onChange={timeRelative => {
            setDateTime(timeRelative);
            updateTimeRange(timeRelative);
          }}
        >
          <InputPickerOption title="Immediately" type="date" />
          <InputPickerOption title="Choose date" type="exactDate">
            <DateTimePicker
              size="small"
              placeholder="Select date"
              width="160px"
              className={styles._date_time_picker_wrapper}
            />
          </InputPickerOption>
          <InputPickerOption title="At a set date" type="relativeDate">
            <RelativeDateModule />
          </InputPickerOption>
        </InputPicker>
      </div>
    </div>
  );
};

export default StartCadenceModule;
