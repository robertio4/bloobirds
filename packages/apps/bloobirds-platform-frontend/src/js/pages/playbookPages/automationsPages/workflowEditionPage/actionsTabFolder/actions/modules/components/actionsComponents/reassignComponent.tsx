import React, { useEffect, useState } from 'react';
import { CheckItem, Item, MultiSelect, Radio, Select, Text } from '@bloobirds-it/flamingo-ui';
import styles from '../../modules.module.css';
import { useWorkflow } from '../../../../../context/workflowsContext';
import { useGlobalPicklistValues } from '../../../../../../../../../hooks/usePicklistValues';
import { BloobirdsAction } from '../../../../../workflows.types';

const ReassignModule = ({
  blockIndex,
  action,
}: {
  blockIndex: number;
  action: BloobirdsAction;
}) => {
  const {
    updateAction,
    isMissingInfo: setMissingInfo,
    state: { isSubmitting, isMissingInfo, isEnabled, isLocked },
  } = useWorkflow();
  const [radioValue, setRadioValue] = useState(action?.users?.length > 1);
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  });
  useEffect(() => {
    if (action?.users?.length > 1) setRadioValue(true);
  }, []);
  useEffect(() => {
    if (action?.users?.length !== 0) setMissingInfo(false);
  }, [action?.users]);

  const updateValue = (key: string, value: string) => {
    if (typeof value === 'string') {
      action[key] = [value];
    } else action[key] = value;
    updateAction(blockIndex, action);
  };

  return (
    <div className={styles._content_wrapper}>
      <div className={styles._radio_modal_radio_group}>
        <Radio
          checked={!radioValue}
          value="Specific person"
          size="small"
          backgroundColor="verySoftPurple"
          disabled={isEnabled || isLocked}
          onClick={() => setRadioValue(false)}
          color="purple"
        >
          <Text size="s">Specific person</Text>
        </Radio>
        <div className={styles._radio_modal_select}>
          <Select
            borderless={false}
            width="260px"
            size="small"
            placeholder="Choose person"
            value={action?.users?.length === 1 ? action?.users[0] : ''}
            warning={isMissingInfo && isSubmitting ? 'Missing required information' : ''}
            disabled={radioValue || isEnabled || isLocked}
            onChange={value => updateValue('users', value)}
          >
            {users?.map(user => {
              if (user?.enabled)
                return (
                  <Item key={user?.id} value={user?.id}>
                    {user?.value}
                  </Item>
                );
            })}
          </Select>
        </div>
        <Radio
          color="purple"
          backgroundColor="verySoftPurple"
          value="Round robin"
          size="small"
          checked={radioValue}
          disabled={isEnabled || isLocked}
          onClick={() => setRadioValue(true)}
        >
          <Text size="s">Specific people by round robin</Text>
        </Radio>
        <div className={styles._radio_modal_select}>
          <MultiSelect
            borderless={false}
            width="260px"
            size="small"
            placeholder="Choose people"
            value={action?.users?.length !== 1 ? action?.users : ''}
            disabled={!radioValue || isEnabled || isLocked}
            onChange={value => updateValue('users', value)}
          >
            {users?.map(user => {
              if (user?.enabled)
                return (
                  <CheckItem key={user?.id} value={user?.id}>
                    {user?.value}
                  </CheckItem>
                );
            })}
          </MultiSelect>
        </div>
        <Text size="s" color="softPeanut">
          This action will rotate contacts to the user who was least recently assigned a contact in
          this action. Learn more about how this action works.
        </Text>
      </div>
    </div>
  );
};

export default ReassignModule;
