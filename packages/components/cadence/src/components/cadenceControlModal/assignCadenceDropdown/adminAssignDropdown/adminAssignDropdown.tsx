import React, { useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useClickAway } from 'react-use';

import { Button, Dropdown, Radio, RadioGroup, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { useUserSearch } from '@bloobirds-it/hooks';
import { FIELDS_LOGIC_ROLE, MainBobjectTypes } from '@bloobirds-it/types';
import { getValueFromLogicRole } from '@bloobirds-it/utils';

import {
  AdminAssignDropdownContentProps,
  AssignCadenceDropdownProps,
} from '../assignCadenceDropdown.types';
import styles from './adminAssignDropdown.module.css';
import { useAdminAssignBobjects } from './useAdminAssignBobjets';

export const DropdownContent = ({
  activeUserId: userId,
  activeBobject,
  setDropdownVisible,
  onUnmountDropdown,
  callback,
}: AdminAssignDropdownContentProps) => {
  const [assignType, setAssignType] = useState('assignToMe');
  const { t } = useTranslation('translation', {
    keyPrefix: 'cadence.cadenceControlModal.assignCadenceDropdown.admin',
  });
  const { t: bobjectTypeT } = useTranslation('translation', {
    keyPrefix: 'bobjectTypes',
  });
  const { assignBobjects } = useAdminAssignBobjects(userId);
  const bobjectType = activeBobject?.id?.typeName as MainBobjectTypes;
  const users = useUserSearch();
  const assignedToValue =
    'assignedTo' in activeBobject
      ? activeBobject?.assignedTo
      : getValueFromLogicRole(activeBobject, FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO);
  const assignee = users?.users?.find(user => user?.id === assignedToValue);

  const handleSubmit = event => {
    onUnmountDropdown?.();
    assignBobjects({
      activeBobject: activeBobject,
      mode: assignType,
      callback: () => {
        callback(event);
        setDropdownVisible(false);
      },
      event,
    });
  };

  return (
    <div className={styles._auto_assign_dropdown}>
      <Text size="s" weight="bold" className={styles._auto_assign_text}>
        {t('title', { bobjectType: bobjectTypeT(bobjectType.toLowerCase()).toLowerCase() })}
      </Text>
      <Text size="xs" color="softPeanut" className={styles._auto_assign_text}>
        {t('subtitle')}
      </Text>
      <div className={styles._radio_group}>
        <RadioGroup
          defaultValue="assignToMe"
          onChange={value => {
            setAssignType(value);
          }}
        >
          <Radio value="assignToMe" size="small" expand={true}>
            <Trans i18nKey="cadence.cadenceControlModal.assignCadenceDropdown.admin.assignToMe" />
          </Radio>
          <Radio value="startCadence" size="small" expand={true}>
            <Trans
              i18nKey="cadence.cadenceControlModal.assignCadenceDropdown.admin.startCadence"
              values={{ name: assignee?.name || '' }}
            />
          </Radio>
        </RadioGroup>
      </div>
      <Button onClick={event => handleSubmit(event)}>Continue</Button>
    </div>
  );
};

export const AdminAssignDropdown = ({
  activeUserId,
  callback,
  activeBobject,
  onRenderDropdown,
  onUnmountDropdown,
  children,
}: AssignCadenceDropdownProps) => {
  const { ref: dropdownRef, visible, setVisible } = useVisible();

  useClickAway(dropdownRef, () => {
    setVisible(false);
    onUnmountDropdown?.();
  });

  function handleOnClick() {
    onRenderDropdown?.();
    setVisible(!visible);
  }

  return (
    <div className={styles._button_wrapper} id="startCadenceButton">
      <Dropdown
        ref={dropdownRef}
        width="100%"
        visible={visible}
        arrow={true}
        anchor={React.cloneElement(children, { onClick: handleOnClick })}
      >
        <DropdownContent
          activeUserId={activeUserId}
          activeBobject={activeBobject}
          setDropdownVisible={setVisible}
          onUnmountDropdown={onUnmountDropdown}
          callback={callback}
        />
      </Dropdown>
    </div>
  );
};
