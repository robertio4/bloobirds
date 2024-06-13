import {
  Checkbox,
  Dropdown,
  IconButton,
  Radio,
  RadioGroup,
  Text,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import React, { useState } from 'react';
import styles from './startTaskSettings.module.css';
import { ServiceApi } from '../../misc/api/service';
import {
  useUserSettings,
  useUserSettingsContext,
  useUserSettingsReload,
} from '../userPermissions/hooks';
import { api } from '../../utils/api';
import { useActiveUser } from '../../hooks';
import {useTranslation} from "react-i18next";

export const StartTaskSettings = ({
  callingFromSalesPage = false,
  updateLoading = (value: boolean): void => null,
}) => {
  const { ref: dropdownRef, visible, setVisible } = useVisible(false);
  const { activeUser } = useActiveUser();

  const settings = useUserSettings();
  const userSettingsReload = useUserSettingsReload();
  const { reloadUserSettings } = useUserSettingsContext();

  const defaultTaskNavigationMode = callingFromSalesPage
    ? settings?.user?.salesTaskNavigationMode
    : settings?.user?.prospectionTaskNavigationMode;
  const [taskNavigationMode, setTaskNavigationMode] = useState(defaultTaskNavigationMode);
  if (taskNavigationMode !== defaultTaskNavigationMode)
    setTaskNavigationMode(defaultTaskNavigationMode);

  const handleChange = (value: any) => {
    setTaskNavigationMode(value);
    updateLoading(true);
    ServiceApi.request({
      url: `/service/users/me/updateNavigationSettings`,
      method: 'PATCH',
      body: {
        stage: callingFromSalesPage ? 'SALES' : 'PROSPECT',
        navigationSetting: value,
      },
    })
      .then(payload => {
        userSettingsReload();
        updateLoading(false);
      })
      .catch(error => console.log('error', error));
  };

  const RadioSettings = (props: { children: any }) => {
    const { children } = { ...props };
    return (
      <Text size="s" className={styles._radio_text}>
        {children}
      </Text>
    );
  };

  return (
    <>
      <Dropdown
        ref={dropdownRef}
        visible={visible}
        dataTest={'StartTaskSettings'}
        anchor={
          <IconButton
            name="settings"
            onClick={event => {
              event.stopPropagation();
              setVisible(!visible);
            }}
          />
        }
      >
        <div className={styles._wrap}>
          <div className={styles._header_wrapper}>
            <Text color="peanut" size="m">
              Customise your navigation
            </Text>
          </div>
          <div className={styles._header_wrapper}>
            <Text color="softPeanut" size="s">
              Choose how you want to navigate between tasks according to your prospecting model to
              work faster. <b>Every click counts!</b>
            </Text>
          </div>
          <RadioGroup defaultValue={taskNavigationMode} onChange={handleChange}>
            <Radio size="small" value="TASK_OBJECT">
              <RadioSettings>Navigate by task object (company or lead)</RadioSettings>
            </Radio>
            <Radio size="small" value="TASK_COMPANY">
              <RadioSettings>Always navigate between companies (if exists)</RadioSettings>
            </Radio>
            <Radio size="small" value="TASK_LEAD">
              <RadioSettings>Always navigate between leads (if exists)</RadioSettings>
            </Radio>
            {callingFromSalesPage ? (
              <Radio size="small" value="TASK_OPPORTUNITY">
                <RadioSettings>Always navigate between opportunities (if exists)</RadioSettings>
              </Radio>
            ) : (
              <></>
            )}
          </RadioGroup>
        </div>
      </Dropdown>
    </>
  );
};
