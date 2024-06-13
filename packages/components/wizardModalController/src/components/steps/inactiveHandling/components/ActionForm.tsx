import React, { Dispatch, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

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
  BobjectPicklistValueEntity,
  BobjectTypes,
  FIELDS_LOGIC_ROLE,
  MainBobjectTypes,
  UserPermission,
} from '@bloobirds-it/types';
import { getValueFromLogicRole } from '@bloobirds-it/utils';
import sortBy from 'lodash/sortBy';

import styles from '../css/informationPanel.module.css';
import { useInactiveHandlingModalInfo } from '../hooks/useInactiveHandlingModalData';
import { INACTIVE_HANDLING_OPTIONS } from '../types/inactiveHandling.constant';

interface InactiveModalInfo {
  users: BobjectPicklistValueEntity[];
  discardedReasons: any;
  closedLostReason: any;
  onHoldReasons: any;
  activeUserId: string;
}
const AddTaskComponent = ({
  handleData,
  inactiveModalInfo,
}: {
  handleData?: (data: any) => void;
  inactiveModalInfo?: InactiveModalInfo;
}) => {
  const { users, activeUserId } = inactiveModalInfo;
  const { t } = useTranslation('translation', {
    keyPrefix: 'wizards.steps.inactiveHandling.actionForm.addTask',
  });

  return (
    <div className={styles._add_task_module}>
      <Text size="m" weight="bold" align="center" className={styles._add_task_title}>
        {t('title')}
      </Text>
      <Input
        placeholder={t('placeholders.title')}
        width="552px"
        onChange={title => {
          handleData({ title });
        }}
      />
      <div className={styles._selects_wrapper}>
        <Select
          placeholder={t('placeholders.assignedTo')}
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
          placeholder={t('placeholders.scheduleTime')}
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
  inactiveModalInfo,
}: {
  bobject: Bobject;
  handleData?: (data: any) => void;
  inactiveModalInfo?: InactiveModalInfo;
}) => {
  const { discardedReasons, closedLostReason } = inactiveModalInfo;
  const { t } = useTranslation('translation', {
    keyPrefix: 'wizards.steps.inactiveHandling.actionForm.discard',
  });
  const { t: generalT } = useTranslation('translation', {
    keyPrefix: 'wizards.steps.inactiveHandling',
  });
  const isOpportunity = bobject?.id?.typeName === BobjectTypes.Opportunity;

  return (
    <div className={styles._add_task_module}>
      <Text size="m" weight="bold" align="center">
        {generalT(`${bobject?.id?.typeName?.toLowerCase()}.actionText`)}?
      </Text>
      <div className={styles._selects_wrapper}>
        <Select
          placeholder={isOpportunity ? t('titleOpp') : t('title')}
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

const OnHoldComponent = ({
  handleData,
  inactiveModalInfo,
}: {
  handleData?: (data: any) => void;
  inactiveModalInfo?: InactiveModalInfo;
}) => {
  const { onHoldReasons } = inactiveModalInfo;
  const { t } = useTranslation('translation', {
    keyPrefix: 'wizards.steps.inactiveHandling.actionForm.onHold',
  });
  return (
    <div className={styles._add_task_module}>
      <Text size="m" weight="bold" align="center">
        {t('title')}
      </Text>
      <div className={styles._selects_wrapper}>
        <Select
          placeholder={t('placeholder')}
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

const ReassignComponent = ({
  handleData,
  inactiveModalInfo,
}: {
  handleData?: (data: any) => void;
  inactiveModalInfo?: InactiveModalInfo;
}) => {
  const { users } = inactiveModalInfo;
  const { t } = useTranslation('translation', {
    keyPrefix: 'wizards.steps.inactiveHandling.actionForm.reassign',
  });
  return (
    <div className={styles._add_task_module}>
      <Text size="m" weight="bold" align="center">
        {t('title')}
      </Text>
      <div className={styles._reassign_selects_wrapper}>
        <Select
          placeholder={t('placeholder')}
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
  const { t } = useTranslation('translation', {
    keyPrefix: 'wizards.steps.inactiveHandling.actionForm.previousAssign',
  });
  const { t: bobjectT } = useTranslation('translation', {
    keyPrefix: 'bobjectTypes',
  });
  useEffect(() => {
    handleData({ previousAssign: assignMode });
  }, [assignMode]);

  return (
    <div className={styles._previous_assign_section_wrapper}>
      <Text size="m" weight="bold" align="center">
        {t('title')}
      </Text>
      <Text size="xs">
        <Trans
          i18nKey="wizards.steps.inactiveHandling.actionForm.previousAssign.subtitle"
          values={{ bobjectType: bobjectT(bobjectType?.toLowerCase()) }}
        />
      </Text>
      <div className={styles._previous_assign_radio_group}>
        <RadioGroup
          defaultValue="assignToMe"
          onChange={value => {
            setAssignMode(value);
          }}
        >
          <Radio value="assignToMe" size="small" expand defaultChecked>
            {t('assignToMe')}
          </Radio>
          <Radio value="keepOwner" size="small" expand>
            {t('keepOwner')}
          </Radio>
        </RadioGroup>
      </div>
    </div>
  );
};

const SetCadence = ({
  bobject,
  handleData,
  inactiveModalInfo,
}: {
  bobject: Bobject;
  handleData?: (data: any) => void;
  inactiveModalInfo?: InactiveModalInfo;
}) => {
  const bobjectType = bobject?.id?.typeName;
  const assignedTo =
    'assignedTo' in bobject
      ? bobject?.assignedTo
      : getValueFromLogicRole(
          bobject,
          FIELDS_LOGIC_ROLE[bobjectType as MainBobjectTypes].ASSIGNED_TO,
        );
  const { activeUserId } = inactiveModalInfo;
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
  const inactiveModalInfo = useInactiveHandlingModalInfo();

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
    inactiveModalInfo,
    handleData: (data: any) => {
      setSelectedOption({ ...selectedOption, data: { ...selectedOption.data, ...data } });
    },
  });
};

export default ActionForm;
