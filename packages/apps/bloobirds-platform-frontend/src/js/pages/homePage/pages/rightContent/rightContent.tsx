import React, { useEffect, useState } from 'react';

import { Dropdown, Icon, IconButton, Item, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import mixpanel from 'mixpanel-browser';

import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useHasBeenVisible } from '../../../../hooks/useHasBeenVisible';
import { NotificationsTab } from '../../components/NotificationsTab/notificationsTab';
import { useUserHomepageSettings } from '../../hooks/useUserHomepageSettings';
import { Config, ConfigType, UserHomeConfig } from '../../typings/home';
import {
  getAvailableUserConfig,
  getDefaultHomeConfig,
  getUserSettingConfigType,
} from '../../utils/homepage';
import styles from './../../homePage.module.css';

export const RightContent = () => {
  const { availableSettings, userSettings, updateHomeSettings } = useUserHomepageSettings();
  const { ref, visible, setVisible } = useVisible();
  const hasBeenVisible = useHasBeenVisible(visible);

  // In these state we save the actual setting of the user
  const [userSelectorConfig, setUserSelectorConfig] = useState<UserHomeConfig | undefined>(
    undefined,
  );
  const [userFiltersConfig, setUserFiltersConfig] = useState<UserHomeConfig[] | undefined>(
    undefined,
  );
  const configTypeSelected = userSelectorConfig
    ? userSelectorConfig?.enumName === Config.LIVE_FEED
      ? ConfigType.ACTIVITY_SECTION_LIVE_FEED_FILTERS
      : ConfigType.ACTIVITY_SECTION_NOTIFICATIONS_FILTERS
    : null;

  // These are the settings available for every user
  const selectorAvailableConfigs = getAvailableUserConfig(
    availableSettings,
    ConfigType.ACTIVITY_SECTION_SELECTOR,
  );
  const defaultSelectorOption = getDefaultHomeConfig(availableSettings, Config.NOTIFICATIONS);
  const filtersAvailableConfigs = getAvailableUserConfig(availableSettings, configTypeSelected);

  // These are the possible settings that the user could have saved in db
  const userSavedSelectorConfig = getUserSettingConfigType(
    userSettings,
    ConfigType.ACTIVITY_SECTION_SELECTOR,
  );
  const defaultUserSelectorConfig = userSavedSelectorConfig?.find(conf => conf.enabled);
  const userFiltersDefaultConfig = getUserSettingConfigType(userSettings, configTypeSelected);

  // Here we define which is the setting the user actually has to add it in the state
  useEffect(() => {
    if (userFiltersDefaultConfig) {
      setUserFiltersConfig(userFiltersDefaultConfig);
    } else {
      setUserFiltersConfig(filtersAvailableConfigs);
    }
  }, [userSettings, filtersAvailableConfigs, userFiltersDefaultConfig]);

  useEffect(() => {
    if (defaultUserSelectorConfig || defaultSelectorOption) {
      setUserSelectorConfig(defaultUserSelectorConfig || defaultSelectorOption);
    }
  }, [defaultUserSelectorConfig, defaultSelectorOption, availableSettings]);

  // These are the request that we need to update both settings
  const updateSelector = (configToUpdate: UserHomeConfig) => {
    setUserSelectorConfig(configToUpdate);
    updateHomeSettings([configToUpdate], ConfigType.ACTIVITY_SECTION_SELECTOR);
  };
  const updateFiltersSettings = (configToUpdate: UserHomeConfig, enabled: boolean) => {
    if (userSelectorConfig?.enumName === Config.NOTIFICATIONS) {
      mixpanel.track(MIXPANEL_EVENTS.HOME_CHANGED_NOTIFICATION_FILTERS);
    }
    const hasThisConfig = userFiltersConfig?.some(config => config.id === configToUpdate.id);
    if (hasThisConfig) {
      const filtersToUpdate = userFiltersConfig?.map(config => {
        if (config.id === configToUpdate.id) {
          return {
            id: config.id,
            name: config.name,
            enumName: config.enumName,
            ordering: config.ordering,
            enabled: enabled,
            extraConfig: config.extraConfig,
          };
        } else {
          return config;
        }
      });
      setUserFiltersConfig(filtersToUpdate);
    } else {
      const filterToAdd = [
        ...userFiltersConfig,
        {
          id: configToUpdate.id,
          name: configToUpdate.name,
          enumName: configToUpdate.enumName,
          ordering: configToUpdate.ordering,
          enabled: enabled,
          extraConfig: configToUpdate.extraConfig,
        },
      ];
      setUserFiltersConfig(filterToAdd);
    }
  };

  // Only make the request when the dropdown is being closed
  useEffect(() => {
    if (hasBeenVisible && !visible) {
      updateHomeSettings(userFiltersConfig, configTypeSelected);
    }
  }, [visible, hasBeenVisible]);

  return (
    <div className={styles.rightContent__container}>
      <div className={styles.column__header}>
        <div className={styles.column__title}>
          <Text size="m" color="softPeanut">
            Activity
          </Text>
          <div>
            {/*<Select value={userSelectorConfig} size="small" onChange={updateSelector}>
              {selectorAvailableConfigs?.map(config => (
                <Item value={config} key={config?.id}>
                  {config?.name}
                </Item>
              ))}
            </Select>*/}
          </div>
          <div className={styles.sliderRotate}>
            <Dropdown
              ref={ref}
              visible={visible}
              position="bottom"
              anchor={
                <IconButton
                  size={20}
                  onClick={() => setVisible(!visible)}
                  name="sliders"
                  color="bloobirds"
                />
              }
            >
              <div className={styles.notifications_filters}>
                {filtersAvailableConfigs?.map((option: UserHomeConfig) => {
                  const configInUser = userFiltersConfig?.find(conf => conf.id === option.id);
                  return (
                    <Item
                      value={option.id}
                      key={option.id}
                      className={styles._tasks_item_big}
                      onClick={() => updateFiltersSettings(option, !configInUser?.enabled)}
                    >
                      <Text
                        size="s"
                        htmlTag="span"
                        color={configInUser?.enabled ? 'bloobirds' : 'softPeanut'}
                      >
                        {option.name}
                      </Text>
                      <Icon name={configInUser?.enabled ? 'eye' : 'eyeOff'} size={16} />
                    </Item>
                  );
                })}
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
      {userSelectorConfig && userFiltersConfig && (
        <div className={styles.notifications_list}>
          {userSelectorConfig?.enumName === Config.LIVE_FEED ? (
            <></>
          ) : (
            <>
              {userSelectorConfig?.enumName === Config.NOTIFICATIONS && (
                <NotificationsTab filters={userFiltersConfig} />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
