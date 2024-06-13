import React, { Dispatch, useEffect, useState } from 'react';

import { ConfigureCadenceStep } from '@bloobirds-it/cadence';
import {
  DateTimePicker,
  Input,
  Item,
  Radio,
  RadioGroup,
  Select,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings } from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectTypes,
  FIELDS_LOGIC_ROLE,
  MainBobjectTypes,
  UserPermission,
} from '@bloobirds-it/types';
import { getValueFromLogicRole } from '@bloobirds-it/utils';
import sortBy from 'lodash/sortBy';

import {
  INACTIVE_HANDLING_OPTIONS,
  modalAndActionText,
} from '../constants/inactiveHandling.constant';
import { useInactiveHandlingModal } from './inactiveHandlingModal';
import styles from './informationPanel.module.css';

const AddTaskComponent = ({ handleData }: { handleData?: (data: any) => void }) => {
  const {
    activeUserId,
    fields: { users },
  } = useInactiveHandlingModal();

  return (
    <div className={styles._add_task_module}>
      <Text size="m" weight="bold" align="center" className={styles._add_task_title}>
        Add the task’s details
      </Text>
      <Input
        placeholder="Title *"
        width="552px"
        onChange={title => {
          handleData({ title });
        }}
      />
      <div className={styles._selects_wrapper}>
        <Select
          placeholder="Assigned To"
          width="270px"
          defaultValue={activeUserId}
          onChange={assignedTo => handleData({ assignedTo })}
        >
          {sortBy(users, 'value')?.map(item => (
            <Item key={item.id} value={item.id}>
              {item.value || item?.name}
            </Item>
          ))}
        </Select>
        <DateTimePicker
          placeholder="Schedule Datetime"
          defaultValue={new Date()}
          width="270px"
          onChange={date => handleData({ date })}
        />
      </div>
    </div>
  );
};

const DiscardComponent = ({
  bobject,
  handleData,
}: {
  bobject: Bobject;
  handleData?: (data: any) => void;
}) => {
  const {
    fields: { discardedReasons, closedLostReason },
  } = useInactiveHandlingModal();

  const isOpportunity = bobject?.id?.typeName === BobjectTypes.Opportunity;

  return (
    <div className={styles._add_task_module}>
      <Text size="m" weight="bold" align="center">
        {modalAndActionText[bobject?.id?.typeName as MainBobjectTypes]?.actionText}?
      </Text>
      <div className={styles._selects_wrapper}>
        <Select
          placeholder={isOpportunity ? 'Closed lost reason*' : 'Discarded Reason *'}
          width="557px"
          onChange={discardedValue => handleData({ discardedValue })}
        >
          {sortBy(isOpportunity ? closedLostReason : discardedReasons, 'value')?.map(item => (
            <Item key={item.id} value={item.id}>
              {item.value || item?.name}
            </Item>
          ))}
        </Select>
      </div>
    </div>
  );
};

const OnHoldComponent = ({ handleData }: { handleData?: (data: any) => void }) => {
  const {
    fields: { onHoldReasons },
  } = useInactiveHandlingModal();

  return (
    <div className={styles._add_task_module}>
      <Text size="m" weight="bold" align="center">
        What is the reason for sending to on hold?
      </Text>
      <div className={styles._selects_wrapper}>
        <Select
          placeholder={'On Hold Reason *'}
          width="557px"
          onChange={onHoldedValue => {
            handleData({ onHoldedValue });
          }}
        >
          {sortBy(onHoldReasons, 'value')?.map(item => (
            <Item key={item.id} value={item.id}>
              {item.name}
            </Item>
          ))}
        </Select>
      </div>
    </div>
  );
};

const ReassignComponent = ({ handleData }: { handleData?: (data: any) => void }) => {
  const {
    fields: { users },
  } = useInactiveHandlingModal();

  return (
    <div className={styles._add_task_module}>
      <Text size="m" weight="bold" align="center">
        Select a colleague to reassign
      </Text>
      <div className={styles._reassign_selects_wrapper}>
        <Select
          placeholder="Assigned To"
          width="557px"
          onChange={assignedTo => handleData({ assignedTo })}
        >
          {sortBy(users, 'value')?.map(item => (
            <Item key={item.id} value={item.id}>
              {item.value || item?.name}
            </Item>
          ))}
        </Select>
      </div>
    </div>
  );
};

const PreviousAssign = ({
  bobjectType,
  handleData,
}: {
  bobjectType: BobjectTypes;
  handleData?: (data: any) => void;
}) => {
  const [assignMode, setAssignMode] = useState('assignToMe');

  useEffect(() => {
    handleData({ previousAssign: assignMode });
  }, [assignMode]);

  return (
    <div className={styles._previous_assign_section_wrapper}>
      <Text size="m" weight="bold" align="center">
        Who do you want to assign it to?
      </Text>
      <Text size="xs">
        This {bobjectType?.toLowerCase()} is not assigned to you. <b>Cadence tasks</b> are always
        assigned to the <b>current owner</b>.
      </Text>
      <div className={styles._previous_assign_radio_group}>
        <RadioGroup
          defaultValue="assignToMe"
          onChange={value => {
            setAssignMode(value);
          }}
        >
          <Radio value="assignToMe" size="small" expand defaultChecked>
            Assign to me
          </Radio>
          <Radio value="keepOwner" size="small" expand>
            Keep the current owner
          </Radio>
        </RadioGroup>
      </div>
    </div>
  );
};

const SetCadence = ({
  bobject,
  handleData,
}: {
  bobject: Bobject;
  handleData?: (data: any) => void;
}) => {
  const bobjectType = bobject?.id?.typeName;
  const assignedTo =
    'assignedTo' in bobject
      ? bobject?.assignedTo
      : getValueFromLogicRole(
          bobject,
          FIELDS_LOGIC_ROLE[bobjectType as MainBobjectTypes].ASSIGNED_TO,
        );
  const { activeUserId } = useInactiveHandlingModal();
  const { settings } = useActiveUserSettings();
  const hasPermissions =
    settings?.user?.accountAdmin && settings?.user?.permissions?.includes(UserPermission.EDIT_ALL);

  return (
    <div className={styles._configure_cadence_wrapper}>
      {assignedTo !== activeUserId && hasPermissions && (
        <PreviousAssign bobjectType={bobjectType} handleData={handleData} />
      )}
      <ConfigureCadenceStep
        handleBack={() => {}}
        handleNext={null}
        //saveCadence={() => {}}
        previousStep={null}
        bobject={bobject}
        onCadenceChange={cadenceId => handleData({ cadenceId })}
        onDateChange={startCadence => handleData({ startCadenceDate: startCadence })}
      />
    </div>
  );
};

const ActionForm = ({
  selectedOptionHandler,
  bobject,
  isSalesBobject,
}: {
  selectedOptionHandler: [
    { type: INACTIVE_HANDLING_OPTIONS; data: any },
    Dispatch<React.SetStateAction<{ type: INACTIVE_HANDLING_OPTIONS; data: any }>>,
  ];
  bobject: Bobject;
  isSalesBobject: boolean;
}) => {
  const [selectedOption, setSelectedOption] = selectedOptionHandler;

  let component;

  switch (selectedOption?.type) {
    case INACTIVE_HANDLING_OPTIONS.NEXT_STEP:
      component = <AddTaskComponent />;
      break;
    case INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING:
    case INACTIVE_HANDLING_OPTIONS.NEW_CADENCE:
      component = <SetCadence bobject={bobject} />;
      break;
    case INACTIVE_HANDLING_OPTIONS.REASSIGN:
      component = <ReassignComponent />;
      break;
    case INACTIVE_HANDLING_OPTIONS.DISCARD:
      component = <DiscardComponent bobject={bobject} />;
      break;
    case INACTIVE_HANDLING_OPTIONS.ON_HOLD:
      component = isSalesBobject ? <></> : <OnHoldComponent />;
      break;
    case INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG:
    default:
      component = <></>;
      break;
  }

  return React.cloneElement(component, {
    handleData: (data: any) => {
      setSelectedOption({ ...selectedOption, data: { ...selectedOption.data, ...data } });
    },
  });
};

export default ActionForm;
