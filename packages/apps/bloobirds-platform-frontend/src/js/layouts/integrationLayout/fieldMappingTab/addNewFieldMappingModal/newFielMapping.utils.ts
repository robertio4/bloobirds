import { CRM_DISPLAY_NAME } from '../../../../constants/integrations';

export const syncRules = (crm: keyof typeof CRM_DISPLAY_NAME, isHubspot?: boolean) => {
  return {
    BOTH: {
      title: 'Two-way',
      description: `Both Bloobirds and ${CRM_DISPLAY_NAME[crm]} will always use the most recent value available.`,
    },
    BLOOBIRDS: {
      title: 'Always use Bloobirds',
      description: `${CRM_DISPLAY_NAME[crm]} will always be updated with the most recent value from Bloobirds.`,
    },
    CRM: isHubspot
      ? {
          title: `Always use ${CRM_DISPLAY_NAME[crm]}`,
          description: `Bloobirds will always be updated with the most recent value from ${crm}.`,
        }
      : {
          title: `Use ${CRM_DISPLAY_NAME[crm]}`,
          description: `Bloobirds will always be updated with the most recent value from ${CRM_DISPLAY_NAME[crm]}.`,
          subTypes: {
            CRM: {
              title: `Always`,
              description: `The field will always be synced with the most recent value from Salesforce`,
            },
            CRM_BUT_BLOOBIRDS_CREATE: {
              title: `Bloobirds on Creation`,
              description: `The field will be filled with the value from Bloobirds when creating new
                objects on Salesforce otherwise it will use the Salesforce value.`,
            },
            CRM_BUT_BLOOBIRDS_UPDATE: {
              title: `Bloobirds on empty field`,
              description: ` The field will be filled with the value from Bloobirds only when it’s empty on
                Salesforce, otherwise it will use the Salesforce value.`,
            },
          },
        },

    NO_SYNC: {
      title: "Don't sync",
      description: `Changes to this field in either Bloobirds or ${CRM_DISPLAY_NAME[crm]} will not be updated in the other system.`,
    },
  };
};

export const checkRelatedMapping = (rule, selectedCRMField) => {
  if (!selectedCRMField?.crmIsFromRelatedObject) return false;
  return rule !== 'CRM';
};
