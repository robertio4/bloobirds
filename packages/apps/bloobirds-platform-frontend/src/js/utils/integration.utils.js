import { api } from '@bloobirds-it/utils';

export const saveTriggerSetting = (triggerName, config, crm, direction = 'OUTBOUND') => {
  const req = Object.entries(config).reduce(
    (prev, curr) => ({
      ...prev,
      [curr[0]]: JSON.stringify(curr[1]),
    }),
    {},
  );
  api.post(`/integrations/settings/${crm}/${triggerName}/${direction}/`, { values: req });
};

export const changeActiveTrigger = (triggerName, active) => {
  return api.patch(`/integrations/settings/${triggerName}/${active ? 'activate' : 'deactivate'}`);
};
