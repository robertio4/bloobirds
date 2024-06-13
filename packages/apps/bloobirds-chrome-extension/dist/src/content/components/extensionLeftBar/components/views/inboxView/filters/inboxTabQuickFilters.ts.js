import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { useActiveUserSettings, useWhatsappEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES,
  DATA_SOURCES,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  SearchType,
  DIRECTION_VALUES_LOGIC_ROLE,
  CUSTOM_TASK_TYPES
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
export const InboxTabQuickFilters = (dataModel) => {
  const { t } = useTranslation();
  const { settings } = useActiveUserSettings();
  const accountId = settings?.account?.id;
  const hasWhatsappEnabled = useWhatsappEnabled(accountId);
  const taskTypeLR = ACTIVITY_FIELDS_LOGIC_ROLE.TYPE;
  const taskTypeField = dataModel?.findFieldByLogicRole(taskTypeLR);
  const call = ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL;
  const callField = taskTypeField.values.find((a) => a.logicRole === call);
  const email = ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL;
  const emailField = taskTypeField.values.find((a) => a.logicRole === email);
  const linkedin = ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN;
  const linkedinField = taskTypeField.values.find((a) => a.logicRole === linkedin);
  const customTask = ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK;
  const customTaskField = taskTypeField.values.find((a) => a.logicRole === customTask);
  const customTaskType = ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK_TYPE;
  const customTaskTypeField = dataModel?.findFieldByLogicRole(customTaskType);
  const dataSourceLR = ACTIVITY_FIELDS_LOGIC_ROLE.DATA_SOURCE;
  const dataSourceField = dataModel?.findFieldByLogicRole(dataSourceLR);
  const chromeExt = DATA_SOURCES.CHROME_EXTENSION;
  const chromeExtField = dataSourceField.values.find((a) => a.logicRole === chromeExt);
  const directionLR = ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION;
  const directionField = dataModel?.findFieldByLogicRole(directionLR);
  const incoming = DIRECTION_VALUES_LOGIC_ROLE.INCOMING;
  const incomingField = directionField.values.find((a) => a.logicRole === incoming);
  const missed = DIRECTION_VALUES_LOGIC_ROLE.MISSED;
  const missedField = directionField.values.find((a) => a.logicRole === missed);
  const result = [
    {
      id: ACTIVITY_TYPES.CALL,
      name: t("leftBar.quickFilters.calls"),
      iconName: "phone",
      iconColor: "melon",
      color: "peanut",
      type: "ORs",
      filters: [
        {
          bobjectFieldId: taskTypeField?.id,
          values: [
            {
              bobjectPicklistValue: callField?.id,
              textValue: null,
              searchType: SearchType.EXACT
            }
          ]
        }
      ],
      defaultFilterDirection: [incomingField?.id, missedField?.id]
    },
    {
      id: ACTIVITY_TYPES.EMAIL,
      name: t("leftBar.quickFilters.emails"),
      iconName: "mail",
      iconColor: "tangerine",
      color: "peanut",
      type: "ORs",
      filters: [
        {
          bobjectFieldId: taskTypeField?.id,
          values: [
            {
              bobjectPicklistValue: emailField?.id,
              textValue: null,
              searchType: SearchType.EXACT
            }
          ]
        },
        {
          bobjectFieldId: directionField?.id,
          values: [
            {
              bobjectPicklistValue: incomingField?.id,
              textValue: null,
              searchType: SearchType.EXACT
            }
          ]
        }
      ],
      defaultFilterDirection: [incomingField?.id]
    },
    {
      id: ACTIVITY_TYPES.LINKEDIN,
      name: t("leftBar.quickFilters.linkedin"),
      iconName: "linkedin",
      iconColor: "darkBloobirds",
      color: "peanut",
      type: "ORs",
      filters: [
        {
          bobjectFieldId: taskTypeField?.id,
          values: [
            {
              bobjectPicklistValue: linkedinField?.id,
              textValue: null,
              searchType: SearchType.EXACT
            }
          ]
        },
        {
          bobjectFieldId: dataSourceField?.id,
          values: [
            {
              bobjectPicklistValue: chromeExtField?.id,
              textValue: null,
              searchType: SearchType.EXACT
            }
          ]
        }
      ],
      defaultFilterDirection: []
    }
  ];
  if (hasWhatsappEnabled) {
    result.push({
      id: ACTIVITY_TYPES.CUSTOM_TASK,
      name: t("leftBar.quickFilters.whatsapp"),
      color: "peanut",
      iconName: "waBusiness",
      iconColor: "whatsapp",
      type: "ORs",
      filters: [
        {
          bobjectFieldId: taskTypeField?.id,
          values: [
            {
              bobjectPicklistValue: customTaskField?.id,
              textValue: null,
              searchType: SearchType.EXACT
            }
          ]
        },
        {
          bobjectFieldId: directionField?.id,
          values: [
            {
              bobjectPicklistValue: incomingField?.id,
              textValue: null,
              searchType: SearchType.EXACT
            }
          ]
        },
        {
          bobjectFieldId: customTaskTypeField?.id,
          values: [
            {
              bobjectPicklistValue: null,
              textValue: CUSTOM_TASK_TYPES.WHATSAPP_BUSINESS,
              searchType: SearchType.EXACT
            }
          ]
        }
      ],
      defaultFilterDirection: []
    });
  }
  return result;
};
