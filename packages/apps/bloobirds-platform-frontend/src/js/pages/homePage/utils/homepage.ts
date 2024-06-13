import {
  AvailableHomeSettings,
  ConfigType,
  UserHomeConfig,
  UserHomeSettings,
  Config,
} from '../typings/home';

export function getUserSettingConfigType(
  userConfig: UserHomeSettings,
  configType: ConfigType,
): UserHomeConfig[] {
  const configsByType = userConfig?.configTypes?.find(type => type.configType === configType);
  return configsByType && configsByType?.configs.length > 0 ? configsByType.configs : null;
}

export function getAvailableUserConfig(
  availableSettings: AvailableHomeSettings,
  configType: ConfigType,
): UserHomeConfig[] {
  const configs = availableSettings?.availableConfigs?.find(
    types => types.configType === configType,
  );
  return configs && configs?.availableConfigs?.length > 0 ? configs?.availableConfigs : null;
}

export function getDefaultHomeConfig(
  availableSettings: AvailableHomeSettings,
  config: Config,
): UserHomeConfig {
  const allConfigs = availableSettings?.availableConfigs?.flatMap(c => c.availableConfigs);
  return allConfigs?.find(conf => conf.enumName === config) || null;
}
