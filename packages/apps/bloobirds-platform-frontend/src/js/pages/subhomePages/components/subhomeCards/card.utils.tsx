import {
  BobjectTypes,
  FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectField,
  LogicRoleType,
  MainBobjectTypes,
} from '@bloobirds-it/types';
import {
  getBobjectFromLogicRole,
  getFieldByLogicRole,
  getNameFieldLRFromBobjectType,
  getTextFromLogicRole,
} from '@bloobirds-it/utils';

import { bobjectUrl } from '../../../../app/_constants/routes';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import { getTaskReferenceBobject } from '../../../../utils/tasks.utils';

interface SubhomeCardConfig {
  fields: string[];
}

const cardElementsDictionary: { [key: string]: SubhomeCardConfig } = {
  [BobjectTypes.Company]: {
    fields: [
      COMPANY_FIELDS_LOGIC_ROLE.NAME,
      COMPANY_FIELDS_LOGIC_ROLE.NUMBER_OF_LEADS,
      COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
      COMPANY_FIELDS_LOGIC_ROLE.SOURCE,
      COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
    ],
  },
  [BobjectTypes.Lead]: {
    fields: [
      LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
      LEAD_FIELDS_LOGIC_ROLE.ICP,
      LEAD_FIELDS_LOGIC_ROLE.COMPANY,
      LEAD_FIELDS_LOGIC_ROLE.SOURCE,
      LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
    ],
  },
  [BobjectTypes.Opportunity]: {
    fields: [
      OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT,
      OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME,
      OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY,
      OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
    ],
  },
  [BobjectTypes.Task]: {
    fields: [
      TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME,
      TASK_FIELDS_LOGIC_ROLE.TITLE,
      'CUSTOM_TASK_TIMEZONE',
      TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY,
      TASK_FIELDS_LOGIC_ROLE.LEAD,
      TASK_FIELDS_LOGIC_ROLE.COMPANY,
      TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
      TASK_FIELDS_LOGIC_ROLE.CUSTOM_TASK,
    ],
  },
};

const MULTI_INFO_BASED_FIELDS = [
  COMPANY_FIELDS_LOGIC_ROLE.NAME,
  LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME,
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

export const generateBobjectBasedData = (bobject: Bobject, fieldArray?: Array<string>) => {
  const referencedBobjectType = bobject?.id?.typeName;
  const { fields } = cardElementsDictionary[referencedBobjectType] || {};
  const referencedBobjectId = bobject?.id?.objectId;
  const referencedBobjectUrl =
    bobject &&
    bobjectUrl(
      referencedBobjectType === BobjectTypes.Task ? getTaskReferenceBobject(bobject) : bobject,
    );

  const translatedFields: { logicRole: string; value: string | BobjectField | Bobject }[] = [
    { logicRole: '', value: '' },
  ];
  const fieldsToParse = fieldArray || fields;
  fieldsToParse?.forEach((logicRole: LogicRoleType) => {
    if (MULTI_INFO_BASED_FIELDS.includes(logicRole)) {
      translatedFields.push({ logicRole, value: getFieldByLogicRole(bobject, logicRole) });
    } else if (REFERENCE_FIELDS.includes(logicRole)) {
      translatedFields.push({
        logicRole,
        value: getFieldByLogicRole(bobject, logicRole)?.referencedBobject,
      });
    } else if (!logicRole.includes(referencedBobjectType.toUpperCase())) {
      const mainBobjectType = getBobjectFromLogicRole(logicRole);
      const mainBobject = getFieldByLogicRole(
        bobject,
        FIELDS_LOGIC_ROLE[referencedBobjectType][
          mainBobjectType.toUpperCase() as Exclude<MainBobjectTypes, typeof referencedBobjectType>
        ],
      )?.referencedBobject;
      translatedFields.push({
        logicRole,
        value: getTextFromLogicRole(mainBobject, logicRole),
      });
    } else {
      translatedFields.push({
        logicRole,
        value: getTextFromLogicRole(bobject, logicRole),
      });
    }
  });

  return {
    id: referencedBobjectId,
    url: referencedBobjectUrl,
    bobjectType: referencedBobjectType,
    bobject,
    fields: translatedFields,
  };
};

export const getNameComponentFields = (value: BobjectField | Bobject, bobject: Bobject) => {
  let name;
  let bobjectType;
  let bobjectToOpen: Bobject = bobject;
  if ('logicRole' in value && value?.logicRole) {
    bobjectType = getBobjectFromLogicRole(value?.logicRole);
    name = value?.text;
  } else {
    bobjectToOpen = value as Bobject;
    bobjectType = bobjectToOpen?.id?.typeName;
    name = getTextFromLogicRole(bobjectToOpen, getNameFieldLRFromBobjectType(bobjectType));
  }

  return { name, bobjectType, bobjectToOpen };
};
