import React from 'react';
import { useParams } from 'react-router-dom';

import {
  BOBJECT_TYPES,
  Bobject,
  FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  BobjectTypes, BobjectField, ACTIVITY_FIELDS_LOGIC_ROLE
} from "@bloobirds-it/types";

import { bobjectUrl } from '../../../../app/_constants/routes';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import {
  getBobjectFromLogicRole,
  getFieldByLogicRole,
  getTextFromLogicRole,
} from '../../../../utils/bobjects.utils';
import { formatDate, formatDistanceToNow } from '@bloobirds-it/utils';
import { getTaskReferenceBobject } from '../../../../utils/tasks.utils';

interface SubhomeCardConfig {
  fields: string[];
}

const cardElementsDictionary: { [key: string]: SubhomeCardConfig } = {
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
      LEAD_FIELDS_LOGIC_ROLE.COMPANY,
      LEAD_FIELDS_LOGIC_ROLE.SOURCE,
      LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
    ],
  },
  [BOBJECT_TYPES.OPPORTUNITY]: {
    fields: [
      OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT,
      OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME,
      OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY,
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
      TASK_FIELDS_LOGIC_ROLE.COMPANY,
      LEAD_FIELDS_LOGIC_ROLE.LINKEDIN_URL,
      LEAD_FIELDS_LOGIC_ROLE.SOURCE,
      LEAD_FIELDS_LOGIC_ROLE.NURTURING_REASONS,
      COMPANY_FIELDS_LOGIC_ROLE.SOURCE,
      COMPANY_FIELDS_LOGIC_ROLE.NURTURING_REASONS,
      COMPANY_FIELDS_LOGIC_ROLE.COUNTRY,
      TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
    ],
  },
};

const MULTI_INFO_BASED_FIELDS = [
  COMPANY_FIELDS_LOGIC_ROLE.NAME,
  LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME,
  TASK_FIELDS_LOGIC_ROLE.TITLE,
  COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
];
const REFERENCE_FIELDS = [
  LEAD_FIELDS_LOGIC_ROLE.COMPANY,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY,
  TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY,
  TASK_FIELDS_LOGIC_ROLE.COMPANY,
  TASK_FIELDS_LOGIC_ROLE.LEAD,
];

const BASE_REFERENCE_FIELDS = [COMPANY_FIELDS_LOGIC_ROLE.SOURCE, LEAD_FIELDS_LOGIC_ROLE.SOURCE];

export const generateBobjectBasedData = (bobject: Bobject, fieldArray?: Array<string>) => {
  const mainBobjectType = bobject?.id?.typeName;
  const { fields } = cardElementsDictionary[mainBobjectType] || {};

  const referencedBobjectId = bobject?.id?.objectId;
  const referenceBobject = getTaskReferenceBobject(bobject);
  const referencedBobjectUrl = bobjectUrl(referenceBobject || bobject);
  const translatedFields: { logicRole: string; value: string | BobjectField | Bobject }[] = [
    { logicRole: '', value: '' },
  ];

  const fieldsToParse = fieldArray || fields;
  fieldsToParse?.forEach(logicRole => {
    const referencedBobjectType = getBobjectFromLogicRole(logicRole);
    let value;
    if (MULTI_INFO_BASED_FIELDS.includes(logicRole)) {
      value = getFieldByLogicRole(bobject, logicRole);
    } else if (
      REFERENCE_FIELDS.includes(logicRole) ||
      (referencedBobjectType && mainBobjectType !== referencedBobjectType)
    ) {
      value = getFieldByLogicRole(bobject, logicRole)?.referencedBobject;
      if (referencedBobjectType && mainBobjectType !== referencedBobjectType) {
        let referencedBobject = getTaskReferenceBobject(bobject);
        if (!BASE_REFERENCE_FIELDS.includes(logicRole))
          referencedBobject = getFieldByLogicRole(
            bobject,
            TASK_FIELDS_LOGIC_ROLE[referencedBobjectType.toUpperCase()],
          )?.referencedBobject;
        value = getTextFromLogicRole(referencedBobject, logicRole);
      } else if (!logicRole.includes(referencedBobjectType.toUpperCase())) {
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
  });

  return {
    id: referencedBobjectId,
    url: referencedBobjectUrl,
    bobjectType: mainBobjectType,
    bobject,
    fields: translatedFields,
  };
};

export const getDisplayedDatetime = (bobject: Bobject) => {
  const { slug, section } = useParams();
  let date;
  let referencedBobject;
  let relatedBobjectType;

  switch (slug) {
    case 'delivered':
      date = getTextFromLogicRole(
        bobject,
        (FIELDS_LOGIC_ROLE[bobject?.id?.typeName] as BobjectTypes.Company | BobjectTypes.Lead)
          .ASSIGNED_DATE,
      );
      return date ? `Assigned ${formatDate(new Date(date), 'MMM d')}` : '';
    case 'allMyEntities':
      date = getTextFromLogicRole(
        bobject,
        (FIELDS_LOGIC_ROLE[bobject?.id?.typeName] as BobjectTypes.Company | BobjectTypes.Lead)
          .UPDATE_DATETIME,
      );
      return `Last update time ${formatDistanceToNow(new Date(date))} ago`;
    case 'inactive':
      if (section === 'leads' || section === 'companies') {
        date = getTextFromLogicRole(
          bobject,
          (FIELDS_LOGIC_ROLE[bobject?.id?.typeName] as BobjectTypes.Company | BobjectTypes.Lead)
            .ATTEMPTS_LAST_DAY,
        );
        return date ? `Last attempt ${formatDate(new Date(date), 'do, MMM')}` : 'Never attempted';
      }
      break;
    case 'onCadence':
      referencedBobject = getTaskReferenceBobject(bobject);
      relatedBobjectType = referencedBobject?.id?.typeName;
      date = getTextFromLogicRole(
        referencedBobject,
        (FIELDS_LOGIC_ROLE[relatedBobjectType] as BobjectTypes.Company | BobjectTypes.Lead)
          ?.ATTEMPTS_LAST_DAY,
      );
      return date ? `Last attempt ${formatDate(new Date(date), 'do, MMM')}` : '';
    default:
      return '';
  }
};
