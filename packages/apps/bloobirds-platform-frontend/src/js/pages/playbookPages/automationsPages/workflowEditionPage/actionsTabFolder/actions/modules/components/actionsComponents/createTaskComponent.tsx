import React, { useEffect, useState } from 'react';
import {
  DateTimePicker,
  Input,
  InputPicker,
  InputPickerOption,
  Item,
  Radio,
  RadioGroup,
  Select,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { format as formatDate, parseISO } from 'date-fns';
import styles from '../../modules.module.css';
import { useWorkflow } from '../../../../../context/workflowsContext';
import { useGlobalPicklistValues } from '../../../../../../../../../hooks/usePicklistValues';
import RelativeDateModule from '../modules/relativeDateModule';
import { BloobirdsAction } from '../../../../../workflows.types';
import { WORKFLOWS_ACTIONS_TYPES_KEYS } from '../../actions.constants';

const getEditingValue = (timeValue: { fixedDate: string; days: number; time: number }) => {
  if (timeValue && timeValue.fixedDate) {
    return { type: 'exactDate', value: parseISO(timeValue.fixedDate) };
  }
  if (timeValue && timeValue.days === 0 && timeValue.time === 0) {
    return { type: 'date', value: timeValue };
  } else {
    return { type: 'relativeDate', value: timeValue };
  }
};

const CreateTaskModule = ({
  blockIndex,
  action,
}: {
  blockIndex: number;
  action: BloobirdsAction;
}) => {
  const { type } = action;
  const isNotification = type === WORKFLOWS_ACTIONS_TYPES_KEYS.CREATE_NOTIFICATION;
  const {
    updateAction,
    isMissingInfo: updateMissingInfo,
    state: { isEnabled, isMissingInfo, isSubmitting, isLocked },
  } = useWorkflow();
  const [enableSelect, setEnableSelect] = useState(!!action?.assignedTo);
  const [dateTime, setDateTime] = useState(getEditingValue(action?.relativeDate));
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  });

  const renderValue = (dateValue: { type?: string; value?: any }) => {
    if (!dateValue || (dateValue.type !== 'date' && !dateValue.value)) return '';
    if (
      dateValue.type === 'date' ||
      (dateValue.type === 'relativeDate' &&
        dateValue.value?.time == '0' &&
        dateValue.value?.days == '0')
    ) {
      return 'Immediately';
    } else if (dateValue.type === 'relativeDate') {
      return `${dateValue.value?.days} day(s) from trigger, at ${
        dateValue.value.time ? ('0' + dateValue.value?.time).slice(-2) : '00'
      }:00`;
    } else if (dateValue.type === 'exactDate') {
      return `on ${formatDate(dateValue.value, "MMMM do 'at' HH:mm")}`;
    } else {
      const hasMissingValues = !(dateValue.value?.timeValue && dateValue?.value?.Range);
      return hasMissingValues
        ? ''
        : `${dateValue?.value?.timeValue} ${dateValue?.value?.Range?.toLowerCase()} from trigger`;
    }
  };

  //TODO add unit test when this is refactored
  const updateTimeRange = timeValue => {
    const { type, value } = timeValue;
    switch (type) {
      case 'relativeDate':
        action.relativeDate = value;
        break;
      case 'date':
        action.relativeDate = { days: 0, time: 0 };
        break;
      default:
        action.relativeDate = {
          days: undefined,
          time: undefined,
          fixedDate: value && formatDate(value, "yyyy-MM-dd'T'HH:mm:ss"),
        };
        break;
    }
    updateAction(blockIndex, action);
  };

  const updateValue = (key: string, value: string) => {
    updateMissingInfo(false);
    action[key] = value;
    updateAction(blockIndex, action);
  };

  useEffect(() => {
    if (action?.title) updateMissingInfo(false);
  }, [action]);

  function handleChange(changedTimeValue) {
    setDateTime(changedTimeValue);
    updateTimeRange(changedTimeValue);
  }

  return (
    <>
      <div className={styles._content_wrapper}>
        <div className={styles._radio_modal_title}>
          <Input
            placeholder={isNotification ? 'Notification title*' : 'Title *'}
            size="small"
            width="100%"
            value={action.title}
            disabled={isEnabled || isLocked}
            helper={
              isNotification ? 'Notification name cannot be empty' : 'Task name cannot be empty'
            }
            warning={isMissingInfo && isSubmitting ? 'Missing required info' : ''}
            onChange={value => {
              updateValue('title', value);
            }}
          />
        </div>
        {!isNotification && (
          <div className={styles._input_picker_wrapper}>
            <InputPicker
              width="310px"
              value={dateTime}
              placeholder="Select type"
              disabled={isEnabled || isLocked}
              renderDisplayValue={() => {
                return !dateTime?.type ? '' : renderValue(dateTime);
              }}
              onChange={handleChange}
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
        )}
        <div className={styles._radio_modal_radio_group}>
          <Text size="s">Assign to</Text>
          <RadioGroup
            value={enableSelect}
            disabled={isEnabled || isLocked}
            onChange={value => {
              setEnableSelect(value);
              if (!value) updateValue('assignedTo', null);
            }}
          >
            <Radio color="purple" backgroundColor="verySoftPurple" value={false} size="small">
              <Text size="s">Leads existing owner</Text>
            </Radio>
            <Radio color="purple" backgroundColor="verySoftPurple" value={true} size="small">
              <Text size="s">Specific Person</Text>
            </Radio>
          </RadioGroup>
        </div>
        <div className={styles._radio_modal_select}>
          <Select
            borderless={false}
            width="260px"
            size="small"
            value={action?.assignedTo ? action.assignedTo : ''}
            placeholder="Choose person"
            disabled={!enableSelect || isEnabled || isLocked}
            onChange={value => updateValue('assignedTo', value)}
          >
            {users?.map(user => (
              <Item key={user?.id} value={user?.id}>
                {user?.value}
              </Item>
            ))}
          </Select>
        </div>
      </div>
    </>
  );
};

export default CreateTaskModule;
