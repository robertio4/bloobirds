import { useTranslation } from 'react-i18next';

import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BOBJECT_TYPES,
  BobjectField,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  CustomTask,
  FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  LogicRoleType,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';

import {
  getBobjectFromLogicRole,
  getFieldByLogicRole,
  getNameFieldLRFromBobjectType,
  getTextFromLogicRole,
} from './bobjects.utils';
import { getTaskReferenceBobject, getTaskText, isScheduledTask } from './tasks.utils';

interface SubhomeCardConfig {
  fields: string[];
}

type PresentBobjectTypes = Exclude<BobjectTypes, BobjectTypes.Activity>;

const MULTI_INFO_BASED_FIELDS = [
  COMPANY_FIELDS_LOGIC_ROLE.NAME,
  LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME,
  TASK_FIELDS_LOGIC_ROLE.TITLE,
  COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  TASK_FIELDS_LOGIC_ROLE.PRIORITY,
];
const REFERENCE_FIELDS = [
  LEAD_FIELDS_LOGIC_ROLE.COMPANY,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY,
  TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY,
  TASK_FIELDS_LOGIC_ROLE.COMPANY,
  TASK_FIELDS_LOGIC_ROLE.LEAD,
];

const BASE_REFERENCE_FIELDS = [COMPANY_FIELDS_LOGIC_ROLE.SOURCE, LEAD_FIELDS_LOGIC_ROLE.SOURCE];

export const generateBobjectBasedData = (
  bobject: Bobject,
  fieldArray?: Array<string>,
  customTasks?: CustomTask[],
  isB2CAccount?: boolean,
) => {
  const cardElementsDictionary: Record<PresentBobjectTypes, SubhomeCardConfig> = {
    [BOBJECT_TYPES.COMPANY]: {
      fields: [
        COMPANY_FIELDS_LOGIC_ROLE.NAME,
        COMPANY_FIELDS_LOGIC_ROLE.NUMBER_OF_LEADS,
        COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
        COMPANY_FIELDS_LOGIC_ROLE.SOURCE,
        COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
      ],
    },
    [BOBJECT_TYPES.LEAD]: {
      fields: [
        LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
        LEAD_FIELDS_LOGIC_ROLE.ICP,
        ...(!isB2CAccount ? [LEAD_FIELDS_LOGIC_ROLE.COMPANY] : []),
        LEAD_FIELDS_LOGIC_ROLE.SOURCE,
        LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
      ],
    },
    [BOBJECT_TYPES.OPPORTUNITY]: {
      fields: [
        OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT,
        OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME,
        ...(!isB2CAccount ? [OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY] : []),
        OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
      ],
    },
    [BOBJECT_TYPES.TASK]: {
      fields: [
        TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
        TASK_FIELDS_LOGIC_ROLE.TITLE,
        ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
        'CUSTOM_TASK_TIMEZONE',
        TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY,
        TASK_FIELDS_LOGIC_ROLE.LEAD,
        ...(!isB2CAccount ? [TASK_FIELDS_LOGIC_ROLE.COMPANY] : []),
        LEAD_FIELDS_LOGIC_ROLE.LINKEDIN_URL,
        LEAD_FIELDS_LOGIC_ROLE.SOURCE,
        LEAD_FIELDS_LOGIC_ROLE.NURTURING_REASONS,
        COMPANY_FIELDS_LOGIC_ROLE.SOURCE,
        COMPANY_FIELDS_LOGIC_ROLE.NURTURING_REASONS,
        COMPANY_FIELDS_LOGIC_ROLE.COUNTRY,
      ],
    },
  };

  const mainBobjectType = bobject?.id?.typeName;
  const { fields } = cardElementsDictionary[mainBobjectType] || {};
  const isScheduled = isScheduledTask(bobject);
  const referencedBobjectId = bobject?.id?.objectId;
  const translatedFields: { logicRole: string; value: string | BobjectField | Bobject }[] = [
    { logicRole: '', value: '' },
  ];
  const { t } = useTranslation();

  const fieldsToParse = fieldArray || fields;
  fieldsToParse?.forEach(
    (logicRole: LogicRoleType<BobjectTypes.Company | BobjectTypes.Lead | BobjectTypes.Task>) => {
      const referencedBobjectType = getBobjectFromLogicRole(logicRole);
      let value;
      //@ts-ignore includes functionality clashes with typescript
      if (MULTI_INFO_BASED_FIELDS.includes(logicRole)) {
        value = getFieldByLogicRole(bobject, logicRole);
      } else if (logicRole === TASK_FIELDS_LOGIC_ROLE.DESCRIPTION) {
        value = getTaskText(bobject, 'Description', customTasks, !isScheduled, t);
      } else if (
        REFERENCE_FIELDS.includes(
          logicRole as
            | LEAD_FIELDS_LOGIC_ROLE.COMPANY
            | OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY
            | TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY
            | TASK_FIELDS_LOGIC_ROLE.COMPANY
            | TASK_FIELDS_LOGIC_ROLE.LEAD,
        ) ||
        (referencedBobjectType && mainBobjectType !== referencedBobjectType)
      ) {
        value = getFieldByLogicRole(bobject, logicRole)?.referencedBobject;
        if (referencedBobjectType && mainBobjectType !== referencedBobjectType) {
          let referencedBobject = getTaskReferenceBobject(bobject);
          //@ts-ignore includes functionality clashes with typescript
          if (!BASE_REFERENCE_FIELDS.includes(logicRole))
            referencedBobject = getFieldByLogicRole(
              bobject,
              TASK_FIELDS_LOGIC_ROLE[referencedBobjectType.toUpperCase()],
            )?.referencedBobject;
          value = getTextFromLogicRole(referencedBobject, logicRole);
        } else if (!logicRole?.includes(referencedBobjectType.toUpperCase())) {
          const mainBobjectType = getBobjectFromLogicRole(logicRole);
          const mainBobject = getFieldByLogicRole(
            bobject,
            FIELDS_LOGIC_ROLE[referencedBobjectType][mainBobjectType.toUpperCase()],
          )?.referencedBobject;
          translatedFields.push({
            logicRole,
            value: getTextFromLogicRole(mainBobject, logicRole),
          });
        }
      } else {
        value = getTextFromLogicRole(bobject, logicRole);
      }
      translatedFields.push({ logicRole, value });
    },
  );

  return {
    id: referencedBobjectId,
    //url: referencedBobjectUrl,
    bobjectType: mainBobjectType,
    bobject,
    fields: translatedFields,
  };
};

export const getNameComponentFields = (value: BobjectField | Bobject, bobject: Bobject) => {
  let name;
  let bobjectType;
  let bobjectToOpen: Bobject = bobject;
  if (value) {
    if ('logicRole' in value && value?.logicRole) {
      bobjectType = getBobjectFromLogicRole(value?.logicRole);
      name = value?.text;
    } else {
      bobjectToOpen = value as Bobject;
      bobjectType = bobjectToOpen?.id?.typeName;
      name = getTextFromLogicRole(bobjectToOpen, getNameFieldLRFromBobjectType(bobjectType));
    }
  }

  return { name, bobjectType, bobjectToOpen };
};
